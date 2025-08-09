#!/usr/bin/env bash
# filepath: scripts/clear-caches.sh
set -euo pipefail
IFS=$'\n\t'

# Defaults
DO_BROWSERS=false
DO_APPS=false
DO_SERVERS=false
DRY_RUN=false
ASSUME_YES=false
DJANGO_PATH=""
KILL_PROCESSES=false
CHECK=false

# If no explicit groups are chosen, do all.
DEFAULT_ALL=true

usage() {
  cat <<'USAGE'
Usage: clear-caches.sh [options]

Groups:
  --browsers            Clear Chrome/Edge/Firefox caches
  --apps                Clear VS Code, npm, pip caches
  --servers             Clear Redis (optional) and Django cache

Targets (optional fine-grained):
  --chrome --edge --firefox --vscode --npm --pip
  --redis               Include Redis FLUSHALL (dangerous)
  --django-path <dir>   Path to Django project containing manage.py

Safety:
  --dry-run             Show actions without deleting
  -y, --yes             Assume yes for confirmations
  -h, --help            Show help

Examples:
  ./clear-caches.sh --browsers --apps
  ./clear-caches.sh --servers --redis -y
  ./clear-caches.sh --servers --django-path ./mysite
USAGE
}

# Target toggles (derived from groups)
DO_CHROME=false; DO_EDGE=false; DO_FIREFOX=false; DO_VSCODE=false; DO_NPM=false; DO_PIP=false; DO_REDIS=false; DO_DJANGO=false

# Parse args
while [[ ${1-} ]]; do
  case "$1" in
    --browsers) DO_BROWSERS=true; DEFAULT_ALL=false;;
    --apps) DO_APPS=true; DEFAULT_ALL=false;;
    --servers) DO_SERVERS=true; DEFAULT_ALL=false;;
    --chrome) DO_CHROME=true; DEFAULT_ALL=false;;
    --edge) DO_EDGE=true; DEFAULT_ALL=false;;
    --firefox) DO_FIREFOX=true; DEFAULT_ALL=false;;
    --vscode) DO_VSCODE=true; DEFAULT_ALL=false;;
    --npm) DO_NPM=true; DEFAULT_ALL=false;;
    --pip) DO_PIP=true; DEFAULT_ALL=false;;
    --redis) DO_REDIS=true; DEFAULT_ALL=false;;
    --django-path) DO_DJANGO=true; DEFAULT_ALL=false; shift; DJANGO_PATH=${1-""};;
    --dry-run) DRY_RUN=true;;
    --kill-processes) KILL_PROCESSES=true;;
    --check) CHECK=true;;
    -y|--yes) ASSUME_YES=true;;
    -h|--help) usage; exit 0;;
    *) echo "Unknown option: $1" >&2; usage; exit 1;;
  esac
  shift || true
done

if $DEFAULT_ALL; then
  DO_BROWSERS=true; DO_APPS=true; DO_SERVERS=true
fi

# Expand groups into targets
$DO_BROWSERS && { DO_CHROME=true; DO_EDGE=true; DO_FIREFOX=true; }
$DO_APPS && { DO_VSCODE=true; DO_NPM=true; DO_PIP=true; }
$DO_SERVERS && { DO_REDIS=${DO_REDIS}; DO_DJANGO=${DO_DJANGO}; }

log() { printf "[clear] %s\n" "$*"; }
run() { if $DRY_RUN; then log "DRY: $*"; else eval "$*"; fi }
confirm() { $ASSUME_YES && return 0; read -r -p "$1 [y/N]: " ans; [[ "$ans" =~ ^[Yy]$ ]]; }

unameOut="$(uname -s)"; OS="linux"
case "$unameOut" in
  Darwin*) OS="mac";;
  Linux*) OS="linux";;
  *) log "Unsupported OS: $unameOut"; exit 1;;
 esac

rm_safe() {
  for target in "$@"; do
    [[ -z "$target" ]] && continue
    if compgen -G "$target" > /dev/null 2>&1 || [[ -e "$target" ]]; then
      log "Removing: $target"
      run "rm -rf -- \"$target\""
    else
      log "Skip (missing): $target"
    fi
  done
}

# Optional: stop running apps to avoid file locks
kill_processes() {
  $KILL_PROCESSES || return 0
  log "Killing running apps to avoid file locks"
  # macOS app names vs Linux process names
  local names=(
    "Google Chrome" "Microsoft Edge" "firefox" "Code"
    "chrome" "google-chrome" "msedge" "code"
  )
  for n in "${names[@]}"; do
    if command -v pkill >/dev/null 2>&1; then
      if $DRY_RUN; then log "DRY: pkill -f -- '$n' || true"; else pkill -f -- "$n" 2>/dev/null || true; fi
    else
      if [[ "$OS" == "mac" ]]; then
        if $DRY_RUN; then log "DRY: killall '$n' || true"; else killall "$n" 2>/dev/null || true; fi
      else
        if $DRY_RUN; then log "DRY: killall '$n' || true"; else killall "$n" 2>/dev/null || true; fi
      fi
    fi
  done
}

# Check report: show which targets exist
check_report() {
  log "Check: inspecting targets"
  if [[ "$OS" == "mac" ]]; then
    local chrome=(
      "$HOME/Library/Caches/Google/Chrome/*"
      "$HOME/Library/Application Support/Google/Chrome/*/Code Cache"
      "$HOME/Library/Application Support/Google/Chrome/*/GPUCache"
    )
    local edge=(
      "$HOME/Library/Caches/Microsoft Edge/*"
      "$HOME/Library/Application Support/Microsoft Edge/*/Code Cache"
      "$HOME/Library/Application Support/Microsoft Edge/*/GPUCache"
    )
    local firefox=("$HOME/Library/Caches/Firefox/Profiles/*/cache2/*")
    local vscode=(
      "$HOME/Library/Application Support/Code/Cache"
      "$HOME/Library/Application Support/Code/CachedData"
    )
  else
    local chrome=(
      "$HOME/.cache/google-chrome/*"
      "$HOME/.config/google-chrome/*/Code Cache"
      "$HOME/.config/google-chrome/*/GPUCache"
    )
    local edge=(
      "$HOME/.cache/microsoft-edge/*"
      "$HOME/.config/microsoft-edge/*/Code Cache"
      "$HOME/.config/microsoft-edge/*/GPUCache"
    )
    local firefox=("$HOME/.cache/mozilla/firefox/*/cache2/*")
    local vscode=("$HOME/.config/Code/Cache" "$HOME/.config/Code/CachedData")
  fi

  for p in "${chrome[@]}" "${edge[@]}" "${firefox[@]}" "${vscode[@]}"; do
    if compgen -G "$p" >/dev/null 2>&1 || [[ -e "$p" ]]; then
      log "FOUND: $p"
    else
      log "MISS : $p"
    fi
  done
  if command -v npm >/dev/null 2>&1; then log "FOUND: npm"; else log "MISS : npm"; fi
  if command -v pip >/dev/null 2>&1; then log "FOUND: pip"; else log "MISS : pip"; fi
  if command -v redis-cli >/dev/null 2>&1; then log "FOUND: redis-cli"; else log "MISS : redis-cli"; fi
}

# Browsers
clear_chrome() {
  if [[ "$OS" == "mac" ]]; then
    rm_safe "$HOME/Library/Caches/Google/Chrome/*" \
            "$HOME/Library/Application Support/Google/Chrome/*/Code Cache" \
            "$HOME/Library/Application Support/Google/Chrome/*/GPUCache"
  else
    rm_safe "$HOME/.cache/google-chrome/*" \
            "$HOME/.config/google-chrome/*/Code Cache" \
            "$HOME/.config/google-chrome/*/GPUCache"
  fi
}
clear_edge() {
  if [[ "$OS" == "mac" ]]; then
    rm_safe "$HOME/Library/Caches/Microsoft Edge/*" \
            "$HOME/Library/Application Support/Microsoft Edge/*/Code Cache" \
            "$HOME/Library/Application Support/Microsoft Edge/*/GPUCache"
  else
    rm_safe "$HOME/.cache/microsoft-edge/*" \
            "$HOME/.config/microsoft-edge/*/Code Cache" \
            "$HOME/.config/microsoft-edge/*/GPUCache"
  fi
}
clear_firefox() {
  if [[ "$OS" == "mac" ]]; then
    rm_safe "$HOME/Library/Caches/Firefox/Profiles/*/cache2/*"
  else
    rm_safe "$HOME/.cache/mozilla/firefox/*/cache2/*"
  fi
}

# Apps
clear_vscode() {
  if [[ "$OS" == "mac" ]]; then
    rm_safe "$HOME/Library/Application Support/Code/Cache" \
            "$HOME/Library/Application Support/Code/CachedData"
  else
    rm_safe "$HOME/.config/Code/Cache" \
            "$HOME/.config/Code/CachedData"
  fi
}
clear_npm() {
  if command -v npm >/dev/null 2>&1; then
    log "npm cache clean --force"; $DRY_RUN || npm cache clean --force
    log "npm cache verify";      $DRY_RUN || npm cache verify || true
  else
    log "Skip npm (not installed)"
  fi
}
clear_pip() {
  if command -v pip >/dev/null 2>&1; then
    if $DRY_RUN; then log "DRY: pip cache purge"; else pip cache purge || true; fi
  else
    # fallback: delete default cache locations
    if [[ "$OS" == "mac" ]]; then
      rm_safe "$HOME/Library/Caches/pip" "$HOME/Library/Caches/pip/http" "$HOME/Library/Caches/pip/wheels"
    else
      rm_safe "$HOME/.cache/pip" "$HOME/.cache/pip/http" "$HOME/.cache/pip/wheels"
    fi
  fi
}

# Servers
clear_redis() {
  if ! command -v redis-cli >/dev/null 2>&1; then
    log "Skip Redis (redis-cli not found)"; return
  fi
  if confirm "About to run 'redis-cli FLUSHALL' (all DBs). Continue?"; then
    log "Flushing Redis (all DBs)"; $DRY_RUN || redis-cli FLUSHALL
  else
    log "Redis flush cancelled"
  fi
}
clear_django() {
  local path=${1-}
  if [[ -z "$path" ]]; then log "Skip Django (no --django-path)"; return; fi
  if [[ ! -f "$path/manage.py" ]]; then log "manage.py not found at: $path"; return 1; fi
  ( cd "$path" && {
      if $DRY_RUN; then
        log "DRY: python manage.py shell -c 'from django.core.cache import cache; cache.clear()'"
      else
        python manage.py shell -c 'from django.core.cache import cache; cache.clear(); print("Django cache cleared")'
      fi
    } )
}

# Execute
kill_processes

if $CHECK; then
  check_report
  log "Check complete."
  exit 0
fi

$DO_CHROME  && { log "Chrome";  clear_chrome; }
$DO_EDGE    && { log "Edge";    clear_edge; }
$DO_FIREFOX && { log "Firefox"; clear_firefox; }
$DO_VSCODE  && { log "VS Code"; clear_vscode; }
$DO_NPM     && { log "npm";     clear_npm; }
$DO_PIP     && { log "pip";     clear_pip; }
$DO_REDIS   && { log "Redis";   clear_redis; }
$DO_DJANGO  && { log "Django";  clear_django "$DJANGO_PATH"; }

log "Done."


