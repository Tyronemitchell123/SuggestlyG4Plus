# VERCEL DOMAIN SETUP GUIDE - SUGGESTLY ELITE

## 🎯 **AUTOMATIC DOMAIN CONFIGURATION**

This script will automatically configure your domain `suggestlyg4plus.io` to work with Vercel.

## 📋 **PREREQUISITES**

### **Required Tools:**
- `jq` (JSON processor)
- `dig` (DNS lookup)
- `curl` (HTTP client)

### **Required Information:**
- Vercel API Token
- Project ID or Project Name

## 🔧 **SETUP STEPS**

### **1. Get Vercel API Token:**
1. Go to: https://vercel.com/account/tokens
2. Click "Create Token"
3. Give it a name (e.g., "Domain Setup")
4. Copy the token

### **2. Get Project ID:**
1. Go to: https://vercel.com/tyrones-team/suggestlyg4plus/settings
2. Look for "Project ID" in the settings
3. Copy the Project ID (starts with `prj_`)

### **3. Set Environment Variables:**

```bash
# Set your Vercel token
export VERCEL_TOKEN="your_vercel_token_here"

# Set your project ID
export PROJECT_ID="prj_your_project_id_here"

# Optional: Set project name if you don't have PROJECT_ID
export PROJECT_NAME="suggestlyg4plus"

# Optional: Set team scope if needed
export VERCEL_SCOPE="tyrones-team"
```

### **4. Run the Setup Script:**

```bash
# Make script executable
chmod +x vercel_domain_setup.sh

# Run the script
./vercel_domain_setup.sh
```

## 🚀 **WHAT THE SCRIPT DOES**

### **1. Domain Verification:**
- ✅ Ensures domain exists in Vercel account
- ✅ Verifies nameservers are correct

### **2. DNS Configuration:**
- ✅ Sets A record: `@` → `76.76.21.21`
- ✅ Sets CNAME record: `www` → `cname.vercel-dns.com`
- ✅ Sets wildcard CNAME: `*` → `cname.vercel-dns.com`

### **3. Domain Assignment:**
- ✅ Assigns domain to your project
- ✅ Configures www redirect to apex
- ✅ Sets up wildcard subdomain support

### **4. Verification:**
- ✅ Waits for DNS propagation
- ✅ Verifies HTTPS certificates
- ✅ Confirms domain is live

## ⚡ **MAXIMUM FORCE FEATURES**

Once configured, your domain will have:
- **HTTPS:** A+ grade SSL certificate
- **CDN:** Global edge network
- **Security:** Enterprise-grade headers
- **Performance:** Maximum force optimization
- **Analytics:** Full tracking ready
- **Mobile:** Responsive optimization

## 🎯 **EXPECTED OUTPUT**

The script will show:
```
✔ Using PROJECT_ID: prj_abc123
✔ Domain is present in your Vercel account.
✔ Upserted A @.suggestlyg4plus.io -> 76.76.21.21
✔ Upserted CNAME www.suggestlyg4plus.io -> cname.vercel-dns.com
✔ Assigned suggestlyg4plus.io
✔ suggestlyg4plus.io resolved: 76.76.21.21
✔ HTTPS ready on https://suggestlyg4plus.io (HTTP 200)
✔ ALL DONE: suggestlyg4plus.io is live on Vercel DNS
```

## 🔄 **AFTER SETUP**

Once the script completes:
1. **Test domain:** https://suggestlyg4plus.io
2. **Verify features:** All website functionality
3. **Check mobile:** Responsive design
4. **Start promotion:** Begin client acquisition

## 🚨 **TROUBLESHOOTING**

### **If script fails:**
1. **Check Vercel token:** Ensure it's valid and has domain permissions
2. **Verify project ID:** Make sure it matches your project
3. **Check domain ownership:** Ensure domain is in your Vercel account
4. **Wait for propagation:** DNS changes can take 5-10 minutes

### **Manual fallback:**
If script doesn't work, use Vercel dashboard:
1. Go to: https://vercel.com/tyrones-team/suggestlyg4plus/settings/domains
2. Click "Add Domain"
3. Enter: `suggestlyg4plus.io`
4. Follow verification process

## 🎉 **SUCCESS**

Once configured, your SUGGESTLY ELITE platform will be live with maximum force optimization!

**Ready to generate enterprise revenue!** 🚀
