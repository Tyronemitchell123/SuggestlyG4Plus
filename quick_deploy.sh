#!/bin/bash
# Quick Vercel Deployment Script
# Run this after initial setup

echo "Quick Vercel Deployment"
echo "======================="

# Check if vercel CLI is available
if command -v vercel &> /dev/null; then
    echo "Vercel CLI found"
    
    # Deploy to production
    vercel --prod --yes
    
    echo "Deployment completed!"
    echo "Check: https://suggestlyg4plus.io"
else
    echo "Vercel CLI not found"
    echo "Please use Vercel Dashboard: https://vercel.com/dashboard"
fi
