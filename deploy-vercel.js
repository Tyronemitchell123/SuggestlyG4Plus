#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 SUGGESTLY ELITE - Vercel Deployment Script');
console.log('==============================================');

// Check if we're in a GitHub Actions environment
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

if (isGitHubActions) {
  console.log('✅ Running in GitHub Actions environment');
  
  // Set up Vercel token from secrets
  const vercelToken = process.env.VERCEL_TOKEN;
  const orgId = process.env.ORG_ID;
  const projectId = process.env.PROJECT_ID;
  
  if (!vercelToken) {
    console.error('❌ VERCEL_TOKEN not found in environment variables');
    process.exit(1);
  }
  
  console.log('🔧 Setting up Vercel deployment...');
  
  try {
    // Install dependencies
    console.log('📦 Installing dependencies...');
    execSync('npm ci --legacy-peer-deps', { stdio: 'inherit' });
    
    // Build the project
    console.log('🔨 Building project...');
    execSync('npm run build:simple', { stdio: 'inherit' });
    
    // Deploy to Vercel
    console.log('🚀 Deploying to Vercel...');
    execSync(`npx vercel --token ${vercelToken} --prod --yes`, { stdio: 'inherit' });
    
    console.log('✅ Deployment completed successfully!');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
  
} else {
  console.log('🖥️  Running locally - use "npx vercel" to deploy');
  console.log('📝 Or push to GitHub to trigger automatic deployment');
}

console.log('🎉 SUGGESTLY ELITE deployment script completed!');
