#!/bin/bash
# VERCEL DEPLOYMENT SCRIPT
echo "DEPLOYING TO VERCEL WITH DOMAIN CONFIGURATION"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel@latest
fi

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod --force --yes

# Wait for deployment
echo "Waiting for deployment to complete..."
sleep 30

# Verify deployment
echo "Verifying deployment..."
curl -I https://suggestlyg4plus.vercel.app

echo "DEPLOYMENT COMPLETE!"
echo "Your site is live at: https://suggestlyg4plus.vercel.app"
echo "Next: Add custom domain in Vercel dashboard"
echo "Custom domain will be: https://suggestlyg4plus.io"
