#!/bin/bash

echo "🚀 Deploying SUGGESTLY ELITE to Render..."

# Check if render CLI is installed
if ! command -v render &> /dev/null; then
    echo "❌ Render CLI not found. Installing..."
    curl -sL https://render.com/download-cli/linux | bash
    export PATH="$HOME/.render:$PATH"
fi

# Login to Render (if not already logged in)
echo "🔐 Logging into Render..."
render login

# Deploy to Render
echo "📦 Deploying application..."
render deploy

echo "✅ Render deployment initiated!"
echo "🌐 Check your Render dashboard for deployment status"
echo "📊 Monitor logs: render logs --service suggestly-elite-business-platform"
