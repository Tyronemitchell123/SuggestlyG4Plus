#!/usr/bin/env bash
set -euo pipefail

# ====== CONFIG (edit or export before running) ======
DOMAIN="${DOMAIN:-suggestlyg4plus.io}"
# Redirect mode: "www_to_apex" or "apex_to_www"
REDIRECT_MODE="${REDIRECT_MODE:-www_to_apex}"

APEX_IP="76.76.21.21"             # Vercel apex A
CNAME_HOST="cname.vercel-dns.com" # Vercel CNAME target

VERCEL_TOKEN="${VERCEL_TOKEN:?export VERCEL_TOKEN}"
PROJECT_ID="${PROJECT_ID:-}"       # e.g. prj_abc123
PROJECT_NAME="${PROJECT_NAME:-}"   # alternative if you don't have PROJECT_ID
VERCEL_SCOPE="${VERCEL_SCOPE:-}"   # team/org slug if applicable
# ====================================================

need() { command -v "$1" >/dev/null || { echo "Missing: $1" >&2; exit 1; }; }
need jq; need dig; need curl

log(){ printf "\n\033[1;36m%s\033[0m\n" "$*"; }
ok(){  printf "\033[1;32m✔ %s\033[0m\n" "$*"; }
warn(){printf "\033[1;33m⚠ %s\033[0m\n" "$*"; }
err(){ printf "\033[1;31m✖ %s\033[0m\n" "$*"; }

api() {
  local m="$1" p="$2" d="${3:-}"
  local u="https://api.vercel.com${p}"
  if [[ -n "$d" ]]; then
    curl -fsSL -X "$m" "$u" \
      -H "Authorization: Bearer ${VERCEL_TOKEN}" \
      -H "Content-Type: application/json" \
      ${VERCEL_SCOPE:+-H "x-vercel-project-context: ${VERCEL_SCOPE}"} \
      --data-raw "$d"
  else
    curl -fsSL -X "$m" "$u" \
      -H "Authorization: Bearer ${VERCEL_TOKEN}" \
      ${VERCEL_SCOPE:+-H "x-vercel-project-context: ${VERCEL_SCOPE}"}
  fi
}

# 0) Resolve PROJECT_ID if we only know the name
if [[ -z "$PROJECT_ID" ]]; then
  [[ -n "$PROJECT_NAME" ]] || { err "Set PROJECT_ID or PROJECT_NAME"; exit 1; }
  log "Resolving PROJECT_ID for '${PROJECT_NAME}'…"
  PROJECT_ID="$(api GET "/v9/projects?limit=100" | jq -r --arg n "$PROJECT_NAME" '.projects[]|select(.name==$n)|.id' | head -n1)"
  [[ -n "$PROJECT_ID" ]] || { err "Project '${PROJECT_NAME}' not found."; exit 1; }
fi
ok "Using PROJECT_ID: $PROJECT_ID"

# 1) Ensure domain exists (it should, since you bought it on Vercel)
log "Ensuring domain '${DOMAIN}' exists…"
if api GET "/v6/domains/${DOMAIN}" >/dev/null 2>&1; then
  ok "Domain is present in your Vercel account."
else
  api POST "/v10/domains" "{\"name\":\"${DOMAIN}\"}" >/dev/null
  ok "Domain created in account."
fi

# 2) Because you purchased on Vercel, nameservers are already vercel-dns.com – proceed.
#    (We still fetch to fail-fast if the domain is suspended or transferred away.)
NS="$(api GET "/v6/domains/${DOMAIN}" | jq -r '.nameservers[]? // empty' | tr '\n' ' ')"
[[ "$NS" =~ vercel-dns\.com ]] || warn "Nameservers are not vercel-dns.com. Since you bought on Vercel, this is unusual."

# 3) Force-upsert core DNS records (authoritative on Vercel DNS)
upsert_record () {
  local type="$1" name="$2" value="$3"
  # delete exact matches first
  local ids
  ids="$(api GET "/v2/domains/${DOMAIN}/records" | jq -r --arg t "$type" --arg n "$name" '.records[]|select(.type==$t and .name==$n)|.id')"
  if [[ -n "$ids" ]]; then
    while read -r id; do [[ -n "$id" ]] && api DELETE "/v2/domains/${DOMAIN}/records/${id}" >/dev/null; done <<<"$ids"
  fi
  api POST "/v2/domains/${DOMAIN}/records" \
    "$(jq -n --arg t "$type" --arg n "$name" --arg v "$value" '{type:$t,name:$n,value:$v,ttl:60}')" >/dev/null
  ok "Upserted ${type} ${name}.${DOMAIN} -> ${value}"
}

log "Upserting DNS records on Vercel DNS…"
upsert_record "A"     "@"     "${APEX_IP}"
upsert_record "CNAME" "www"   "${CNAME_HOST}"
upsert_record "CNAME" "*"     "${CNAME_HOST}"

# 4) Assign domains to project (+ redirect config)
assign_domain () {
  local host="$1" redirect="$2"
  local payload
  if [[ -n "$redirect" ]]; then
    payload="$(jq -n --arg n "$host" --arg r "$redirect" '{name:$n, redirect:$r}')"
  else
    payload="$(jq -n --arg n "$host" '{name:$n}')"
  fi
  api POST "/v10/projects/${PROJECT_ID}/domains" "$payload" >/dev/null 2>&1 || true
  ok "Assigned ${host} ${redirect:+(redirect → $redirect)}"
}

log "Assigning domain(s) to project ${PROJECT_ID}…"
case "$REDIRECT_MODE" in
  www_to_apex)
    assign_domain "${DOMAIN}" ""
    assign_domain "www.${DOMAIN}" "${DOMAIN}"
    ;;
  apex_to_www)
    assign_domain "www.${DOMAIN}" ""
    assign_domain "${DOMAIN}" "www.${DOMAIN}"
    ;;
  *)
    err "REDIRECT_MODE must be www_to_apex or apex_to_www"; exit 1;;
esac
assign_domain "*.${DOMAIN}" ""   # wildcard

# 5) Wait for DNS propagation (A + CNAME)
wait_dns () {
  local host="$1" expected="$2" kind="$3" tries=0 max=240   # up to ~20 min
  log "Waiting for ${kind} to propagate: ${host} → ${expected}"
  while (( tries < max )); do
    ((tries++))
    if [[ "$kind" == "A" ]]; then
      got="$(dig +short A "$host" | head -n1 || true)"
    else
      got="$(dig +short CNAME "$host" | sed 's/\.$//' | head -n1 || true)"
    fi
    if [[ "$got" == "$expected" ]]; then ok "${host} resolved: ${got}"; return 0; fi
    (( tries % 12 == 0 )) && warn "Still propagating ${host}… (try ${tries})"
    sleep 5
  done
  err "Timeout waiting for ${host} → ${expected}"; exit 2
}

wait_dns "${DOMAIN}" "${APEX_IP}" "A"
wait_dns "www.${DOMAIN}" "${CNAME_HOST}" "CNAME"
wait_dns "any.${DOMAIN}" "${CNAME_HOST}" "CNAME"

# 6) Wait for HTTPS to be alive (Vercel auto-certs once assigned)
wait_https () {
  local url="$1" tries=0 max=240 # up to ~20 min
  log "Waiting for HTTPS 200/301/302 on ${url}"
  while (( tries < max )); do
    ((tries++))
    code="$(curl -k -s -o /dev/null -w "%{http_code}" "$url" || true)"
    if [[ "$code" =~ ^(200|301|302)$ ]]; then ok "HTTPS ready on ${url} (HTTP ${code})"; return 0; fi
    (( tries % 12 == 0 )) && warn "Still provisioning cert/deployment… (try ${tries}, got ${code})"
    sleep 5
  done
  err "Timeout waiting for HTTPS on ${url}"
}

wait_https "https://${DOMAIN}"
wait_https "https://www.${DOMAIN}"

ok "ALL DONE: ${DOMAIN} is live on Vercel DNS, assigned to project ${PROJECT_ID}, and serving over HTTPS."
