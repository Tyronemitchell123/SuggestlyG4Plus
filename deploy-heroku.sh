#!/bin/bash

echo "🚀 Deploying SUGGESTLY ELITE to Heroku..."

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI not found. Please install from: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Check if logged in to Heroku
if ! heroku auth:whoami &> /dev/null; then
    echo "🔐 Logging into Heroku..."
    heroku login
fi

# Get app name from user or use default
APP_NAME=${1:-suggestly-elite-business-platform}

echo "📦 Creating/updating Heroku app: $APP_NAME"

# Create app if it doesn't exist
if ! heroku apps:info --app $APP_NAME &> /dev/null; then
    echo "🆕 Creating new Heroku app..."
    heroku create $APP_NAME
else
    echo "✅ App already exists"
fi

# Set environment variables
echo "⚙️ Setting environment variables..."
heroku config:set NODE_ENV=production --app $APP_NAME

# Deploy to Heroku
echo "📤 Deploying to Heroku..."
git push heroku main

# Open the app
echo "🌐 Opening deployed app..."
heroku open --app $APP_NAME

echo "✅ Heroku deployment completed!"
echo "📊 View logs: heroku logs --tail --app $APP_NAME"
echo "🔧 Manage app: https://dashboard.heroku.com/apps/$APP_NAME"
