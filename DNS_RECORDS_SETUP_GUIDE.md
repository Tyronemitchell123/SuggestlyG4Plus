# DNS RECORDS SETUP GUIDE - SUGGESTLY ELITE

## DOMAIN: suggestlyg4plus.io
## STATUS: DNS UPDATE REQUIRED
## CURRENT ISSUE: 307 ERROR - Domain pointing to old IPs

### CURRENT DNS STATUS:
- Domain pointing to: 64.29.17.65, 216.198.79.1 (WRONG)
- Should point to: 76.76.19.19 (Vercel IP)

---

## STEP 1: DELETE OLD DNS RECORDS

### Go to your domain registrar (where you bought suggestlyg4plus.io) and DELETE these records:

**DELETE A Records:**
- A Record: @ → 64.29.17.65 (DELETE THIS)
- A Record: @ → 216.198.79.1 (DELETE THIS)
- Any other A records for @ (DELETE ALL)

---

## STEP 2: ADD NEW DNS RECORDS

### ADD these exact records at your domain registrar:

### 1. A RECORD (Root Domain)
- **Type:** A
- **Name:** @ (or leave blank)
- **Value:** 76.76.19.19
- **TTL:** 60 (or 300 if 60 not available)

### 2. CNAME RECORD (WWW Subdomain)
- **Type:** CNAME
- **Name:** www
- **Value:** suggestlyg4plus-1j2m549jp-tyrones-team.vercel.app
- **TTL:** 60 (or 300 if 60 not available)

### 3. TXT RECORD (Vercel Verification)
- **Type:** TXT
- **Name:** _vercel
- **Value:** vercel-verification=BMiC4IQpTZvzhr6PFFUCiFor
- **TTL:** 60 (or 300 if 60 not available)

---

## STEP 3: VERIFY DNS UPDATE

### After adding the records, wait 2-5 minutes and check:

**Command to verify:**
```
nslookup suggestlyg4plus.io
```

**Expected result:**
```
Name: suggestlyg4plus.io
Address: 76.76.19.19
```

---

## STEP 4: ADD DOMAIN TO VERCEL

### Go to Vercel Dashboard:
1. Visit: https://vercel.com/tyrones-team/suggestlyg4plus/settings/domains
2. Click "Add Domain"
3. Enter: suggestlyg4plus.io
4. Click "Add"
5. Use verification code: BMiC4IQpTZvzhr6PFFUCiFor

---

## STEP 5: TEST THE DOMAIN

### Working URLs:
- **Immediate:** https://suggestlyg4plus-1j2m549jp-tyrones-team.vercel.app
- **After DNS update:** https://suggestlyg4plus.io

---

## COMMON DOMAIN REGISTRARS:

### If using GoDaddy:
1. Go to Domain Management
2. Click "DNS" or "Manage DNS"
3. Delete old A records
4. Add new records as specified above

### If using Namecheap:
1. Go to Domain List
2. Click "Manage" → "Advanced DNS"
3. Delete old A records
4. Add new records as specified above

### If using Google Domains:
1. Go to Domain Settings
2. Click "DNS" → "Manage Custom Records"
3. Delete old A records
4. Add new records as specified above

### If using Vercel Domains:
1. Go to Vercel Dashboard
2. Click "Domains"
3. Find suggestlyg4plus.io
4. Click "DNS Records"
5. Update records as specified above

---

## EXPECTED TIMELINE:
- **DNS Update:** 2-5 minutes
- **307 Error Fix:** Immediate after DNS update
- **Domain Live:** Within 5 minutes

---

## TROUBLESHOOTING:

### If still getting 307 error:
1. Wait 5-10 minutes for DNS propagation
2. Clear browser cache
3. Try incognito/private browsing
4. Check if all 3 records are added correctly

### If domain not working:
1. Verify all 3 DNS records are added
2. Check TTL values (should be 60 or 300)
3. Wait for DNS propagation
4. Use the working Vercel URL as backup

---

## SUCCESS INDICATORS:
- nslookup shows 76.76.19.19
- No more 307 error
- Domain loads SUGGESTLY ELITE website
- SSL certificate is active

---
**Setup Time:** 2025-08-13 04:15:00
**Status:** DNS UPDATE READY
