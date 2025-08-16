#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 SUGGESTLY ELITE - Automatic Deployment Setup');
console.log('===============================================');
console.log('');

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setupDeployment() {
  try {
    // Check if git is initialized
    if (!fs.existsSync('.git')) {
      console.log('❌ Git repository not found. Please initialize git first:');
      console.log('   git init');
      console.log('   git add .');
      console.log('   git commit -m "Initial commit"');
      console.log('   git remote add origin https://github.com/yourusername/suggestly-elite.git');
      console.log('');
      return;
    }

    // Check if GitHub remote exists
    const gitConfig = fs.readFileSync('.git/config', 'utf8');
    if (!gitConfig.includes('github.com')) {
      console.log('⚠️  GitHub remote not found. Please add your GitHub repository:');
      console.log('   git remote add origin https://github.com/yourusername/suggestly-elite.git');
      console.log('');
    }

    console.log('📋 Deployment Service Setup');
    console.log('============================');
    console.log('');

    const services = [
      { name: 'Vercel', config: 'vercel.json', setup: 'vercel setup' },
      { name: 'Netlify', config: 'netlify.toml', setup: 'netlify setup' },
      { name: 'Firebase', config: 'firebase.json', setup: 'firebase init hosting' },
      { name: 'Railway', config: 'railway.json', setup: 'railway login' },
      { name: 'Render', config: 'render.yaml', setup: 'render setup' }
    ];

    console.log('🔧 Available Services:');
    services.forEach((service, index) => {
      const status = fs.existsSync(service.config) ? '✅' : '❌';
      console.log(`   ${index + 1}. ${status} ${service.name}`);
    });

    console.log('');
    console.log('📝 Setup Instructions:');
    console.log('======================');
    console.log('');

    services.forEach(service => {
      if (!fs.existsSync(service.config)) {
        console.log(`🔧 ${service.name}:`);
        console.log(`   Run: ${service.setup}`);
        console.log('');
      }
    });

    console.log('🔐 GitHub Secrets Required:');
    console.log('============================');
    console.log('');
    console.log('Go to your GitHub repository → Settings → Secrets and variables → Actions');
    console.log('Add these secrets:');
    console.log('');

    const secrets = [
      { name: 'VERCEL_TOKEN', description: 'Vercel API token from dashboard' },
      { name: 'VERCEL_ORG_ID', description: 'Vercel organization ID' },
      { name: 'VERCEL_PROJECT_ID', description: 'Vercel project ID' },
      { name: 'NETLIFY_AUTH_TOKEN', description: 'Netlify personal access token' },
      { name: 'NETLIFY_SITE_ID', description: 'Netlify site ID' },
      { name: 'RAILWAY_TOKEN', description: 'Railway API token' },
      { name: 'RAILWAY_SERVICE', description: 'Railway service name' },
      { name: 'FIREBASE_SERVICE_ACCOUNT', description: 'Firebase service account JSON (base64 encoded)' },
      { name: 'FIREBASE_PROJECT_ID', description: 'Firebase project ID' },
      { name: 'RENDER_SERVICE_ID', description: 'Render service ID' },
      { name: 'RENDER_API_KEY', description: 'Render API key' }
    ];

    secrets.forEach(secret => {
      console.log(`   ${secret.name}: ${secret.description}`);
    });

    console.log('');
    console.log('🚀 Quick Start Commands:');
    console.log('=========================');
    console.log('');

    const commands = [
      'npm run build',
      'git add .',
      'git commit -m "Setup automatic deployment"',
      'git push origin main'
    ];

    commands.forEach(cmd => {
      console.log(`   ${cmd}`);
    });

    console.log('');
    console.log('📊 After Setup:');
    console.log('===============');
    console.log('');
    console.log('1. Push to main branch');
    console.log('2. Check GitHub Actions tab');
    console.log('3. Monitor deployment status');
    console.log('4. Visit your deployed sites');

    // Create .env.example
    const envExample = `# Environment Variables for SUGGESTLY ELITE
# Copy this to .env and fill in your values

# Vercel
VITE_LIVE_FEED_URL=wss://live.suggestlyelite.com/ws
VITE_API_ORIGIN=https://api.suggestlyelite.com

# Firebase
FIREBASE_PROJECT_ID=your-firebase-project-id

# Railway
RAILWAY_SERVICE=your-railway-service

# Render
RENDER_SERVICE_ID=your-render-service-id

# Custom Domain (optional)
CUSTOM_DOMAIN=suggestlyelite.com
`;

    fs.writeFileSync('.env.example', envExample);
    console.log('');
    console.log('✅ Created .env.example file');
    console.log('');

    // Create deployment status script
    const statusScript = `#!/bin/bash
echo "🚀 SUGGESTLY ELITE Deployment Status"
echo "===================================="
echo ""

# Check GitHub Actions
echo "📊 GitHub Actions:"
echo "   https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\\([^/]*\\/[^/]*\\)\\.git.*/\\1/')/actions"
echo ""

# Check if services are configured
echo "🔧 Service Configuration:"
[ -f "vercel.json" ] && echo "   ✅ Vercel configured" || echo "   ❌ Vercel not configured"
[ -f "netlify.toml" ] && echo "   ✅ Netlify configured" || echo "   ❌ Netlify not configured"
[ -f "firebase.json" ] && echo "   ✅ Firebase configured" || echo "   ❌ Firebase not configured"
[ -f "railway.json" ] && echo "   ✅ Railway configured" || echo "   ❌ Railway not configured"
echo ""

echo "🌐 Deployment URLs:"
echo "   Vercel: https://your-project.vercel.app"
echo "   Netlify: https://your-site.netlify.app"
echo "   Firebase: https://your-project.web.app"
echo "   Railway: https://your-app.railway.app"
echo "   GitHub Pages: https://yourusername.github.io/repo-name"
echo "   Render: https://your-app.onrender.com"
echo ""

echo "📝 Next Steps:"
echo "   1. Configure deployment services"
echo "   2. Add GitHub secrets"
echo "   3. Push to main branch"
echo "   4. Monitor deployments"
`;

    fs.writeFileSync('check-deployment-status.sh', statusScript);
    fs.chmodSync('check-deployment-status.sh', '755');
    console.log('✅ Created check-deployment-status.sh script');
    console.log('');

    console.log('🎉 Setup Complete!');
    console.log('==================');
    console.log('');
    console.log('Next steps:');
    console.log('1. Configure each deployment service');
    console.log('2. Add GitHub secrets');
    console.log('3. Push your code to trigger automatic deployment');
    console.log('');
    console.log('📚 For detailed instructions, see: AUTOMATIC_DEPLOYMENT_SETUP.md');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

setupDeployment();




