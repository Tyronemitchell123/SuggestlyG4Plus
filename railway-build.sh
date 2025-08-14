#!/bin/bash

# Railway Build Script for React App
echo "🚀 Starting Railway build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Build the app
echo "🔨 Building the app..."
npm run build

# Check if build was successful
if [ -d "build" ]; then
    echo "✅ Build successful! Build directory created."
    ls -la build/
else
    echo "❌ Build failed! Build directory not found."
    exit 1
fi

echo "🎉 Railway build process completed!"
