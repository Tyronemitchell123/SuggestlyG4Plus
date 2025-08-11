#!/bin/bash
# Railway Deployment Script for SuggestlyG4Plus v2.0

echo "🚄 Railway Deployment for SuggestlyG4Plus v2.0"
echo "=============================================="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "Logging in to Railway..."
railway login

# Initialize project
echo "Initializing Railway project..."
railway init

# Deploy to Railway
echo "Deploying to Railway..."
railway up

echo "✅ Deployment completed!"
echo "🌐 Check your Railway dashboard for the deployment URL"
echo "🔗 Add custom domain: suggestlyg4plus.io"
