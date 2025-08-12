#!/bin/bash
# DEPLOYMENT VERIFICATION SCRIPT
echo "VERIFYING DEPLOYMENT STATUS..."

# Check Vercel deployment
echo "Checking Vercel deployment..."
curl -I https://suggestlyg4plus.vercel.app

# Check custom domain
echo "Checking custom domain..."
curl -I https://suggestlyg4plus.io

# Check www domain
echo "Checking www domain..."
curl -I https://www.suggestlyg4plus.io

echo "Verification complete!"
