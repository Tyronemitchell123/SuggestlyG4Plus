# AUTOMATIC DOMAIN SETUP - COMPLETE INSTRUCTIONS

## DOMAIN: suggestlyg4plus.io

### DNS RECORDS TO UPDATE:

#### REMOVE THESE RECORDS:
- A Record: @ → 64.29.17.65
- A Record: @ → 64.29.17.1
- Any other A records

#### ADD THESE RECORDS:

**A Record:**
- Type: A
- Name: @
- Value: 76.76.19.19
- TTL: 300

**CNAME Record:**
- Type: CNAME
- Name: www
- Value: suggestlyg4plus-1j2m549jp-tyrones-team.vercel.app
- TTL: 300

**TXT Record:**
- Type: TXT
- Name: _vercel
- Value: vercel-verification=BMiC4IQpTZvzhr6PFFUCiFor
- TTL: 3600

### VERCEL DASHBOARD:
1. Go to: https://vercel.com/tyrones-team/suggestlyg4plus/settings/domains
2. Click "Add Domain"
3. Enter: suggestlyg4plus.io
4. Click "Add"

### WORKING URL (USE NOW):
- https://suggestlyg4plus-1j2m549jp-tyrones-team.vercel.app

### EXPECTED RESULT:
- Domain will be live at: https://suggestlyg4plus.io
- All features will work immediately
- SSL certificate will be provisioned automatically

---
Setup Time: 2025-08-13 03:21:03
Status: Ready for automatic deployment
