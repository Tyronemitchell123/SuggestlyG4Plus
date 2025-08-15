#!/bin/bash

echo "🚀 SUGGESTLY ELITE - Vercel Deployment Script"
echo "=============================================="

# Check if we're in a GitHub Actions environment
if [ "$GITHUB_ACTIONS" = "true" ]; then
    echo "✅ Running in GitHub Actions environment"
    
    # Set up Vercel token from secrets
    VERCEL_TOKEN=$VERCEL_TOKEN
    ORG_ID=$ORG_ID
    PROJECT_ID=$PROJECT_ID
    
    if [ -z "$VERCEL_TOKEN" ]; then
        echo "❌ VERCEL_TOKEN not found in environment variables"
        exit 1
    fi
    
    echo "🔧 Setting up Vercel deployment..."
    
    # Install dependencies
    echo "📦 Installing dependencies..."
    npm ci --legacy-peer-deps
    
    # Build the project
    echo "🔨 Building project..."
    CI=false npm run build
    
    # Deploy to Vercel
    echo "🚀 Deploying to Vercel..."
    npx vercel --token $VERCEL_TOKEN --prod --yes
    
    echo "✅ Deployment completed successfully!"
    
else
    echo "🖥️  Running locally - use 'npx vercel' to deploy"
    echo "📝 Or push to GitHub to trigger automatic deployment"
fi

echo "🎉 SUGGESTLY ELITE deployment script completed!"
