#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 SUGGESTLY ELITE - DigitalOcean App Platform Deployment');
console.log('=======================================================\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
    console.log('❌ Error: package.json not found. Please run this script from the project root.');
    process.exit(1);
}

// Create DigitalOcean app configuration
const appConfig = `name: suggestly-elite
services:
- name: web
  source_dir: /
  github:
    repo: Tyronemitchell123/SuggestlyG4Plus
    branch: main
  build_command: npm install && npm run build
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  routes:
  - path: /
  envs:
  - key: NODE_ENV
    value: production
  - key: FIREBASE_API_KEY
    value: your_firebase_api_key
  - key: FIREBASE_AUTH_DOMAIN
    value: your_firebase_auth_domain
  - key: FIREBASE_PROJECT_ID
    value: your_firebase_project_id
  - key: STRIPE_PUBLISHABLE_KEY
    value: your_stripe_publishable_key
  - key: STRIPE_SECRET_KEY
    value: your_stripe_secret_key
  - key: OPENAI_API_KEY
    value: your_openai_api_key
  - key: EMAIL_SERVICE_API_KEY
    value: your_email_service_key`;

// Write app.yaml configuration
fs.writeFileSync('app.yaml', appConfig);
console.log('✅ Created app.yaml configuration file');

// Check if doctl CLI is installed
try {
    execSync('doctl version', { stdio: 'ignore' });
    console.log('✅ DigitalOcean CLI (doctl) is installed');
} catch (error) {
    console.log('📦 Installing DigitalOcean CLI...');
    console.log('Please install doctl manually:');
    console.log('   Windows: https://docs.digitalocean.com/reference/doctl/how-to/install/');
    console.log('   macOS: brew install doctl');
    console.log('   Linux: snap install doctl');
    console.log('');
}

console.log('📋 DigitalOcean App Platform Deployment Steps:');
console.log('=============================================\n');

console.log('1️⃣  Create DigitalOcean Account:');
console.log('   - Go to https://cloud.digitalocean.com');
console.log('   - Sign up for an account');
console.log('   - Add payment method (required)');
console.log('   - Get $200 free credit for new users\n');

console.log('2️⃣  Install DigitalOcean CLI (doctl):');
console.log('   Windows: Download from https://docs.digitalocean.com/reference/doctl/how-to/install/');
console.log('   macOS: brew install doctl');
console.log('   Linux: snap install doctl\n');

console.log('3️⃣  Authenticate with DigitalOcean:');
console.log('   - Go to https://cloud.digitalocean.com/account/api/tokens');
console.log('   - Generate a new API token');
console.log('   - Run: doctl auth init');
console.log('   - Enter your API token when prompted\n');

console.log('4️⃣  Prepare Your Repository:');
console.log('   - Ensure your code is pushed to GitHub');
console.log('   - Update the app.yaml file with your GitHub repo details');
console.log('   - Set your environment variables in the app.yaml file\n');

console.log('5️⃣  Deploy to DigitalOcean:');
console.log('   Option A - Using CLI:');
console.log('     doctl apps create --spec app.yaml');
console.log('');
console.log('   Option B - Using Dashboard:');
console.log('     - Go to https://cloud.digitalocean.com/apps');
console.log('     - Click "Create App"');
console.log('     - Connect your GitHub repository');
console.log('     - Use the generated app.yaml configuration');
console.log('     - Click "Create Resources"\n');

console.log('6️⃣  Configure Custom Domain (Optional):');
console.log('   - In your app settings, go to "Settings" tab');
console.log('   - Click "Edit" next to "Domains"');
console.log('   - Add your custom domain');
console.log('   - Configure DNS records as instructed');
console.log('   - SSL certificate will be provided automatically\n');

console.log('7️⃣  Monitor Your App:');
console.log('   - Check "Overview" tab for app status');
console.log('   - View "Logs" tab for application logs');
console.log('   - Monitor "Metrics" tab for performance data');
console.log('   - Set up alerts in "Settings" tab\n');

// Check if git repository exists
if (!fs.existsSync('.git')) {
    console.log('⚠️  Git repository not found. Please initialize git:');
    console.log('   git init');
    console.log('   git add .');
    console.log('   git commit -m "Initial commit"');
    console.log('   git remote add origin <your-github-repo-url>');
    console.log('   git push -u origin main\n');
} else {
    console.log('✅ Git repository found');
    
    // Check if there are uncommitted changes
    try {
        const status = execSync('git status --porcelain', { encoding: 'utf8' });
        if (status.trim()) {
            console.log('⚠️  You have uncommitted changes. Please commit them first:');
            console.log('   git add .');
            console.log('   git commit -m "Ready for DigitalOcean deployment"');
            console.log('   git push\n');
        } else {
            console.log('✅ All changes are committed');
        }
    } catch (error) {
        console.log('⚠️  Could not check git status');
    }
}

// Check package.json scripts
if (fs.existsSync('package.json')) {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const scripts = packageJson.scripts || {};
    
    console.log('📋 Current Package.json Scripts:');
    console.log('================================\n');
    
    if (scripts.start) {
        console.log(`✅ Start script: ${scripts.start}`);
    } else {
        console.log('❌ No start script found. Add to package.json:');
        console.log('   "start": "node server.js" or "start": "npm run serve"');
    }
    
    if (scripts.build) {
        console.log(`✅ Build script: ${scripts.build}`);
    } else {
        console.log('⚠️  No build script found. This is optional for static sites.');
    }
    
    console.log('');
}

console.log('💰 Pricing Information:');
console.log('=======================');
console.log('• Basic XS: $5/month (512MB RAM, 1 vCPU)');
console.log('• Basic S: $12/month (1GB RAM, 1 vCPU)');
console.log('• Basic M: $24/month (2GB RAM, 1 vCPU)');
console.log('• Free tier: Not available for App Platform');
console.log('• New users get $200 free credit\n');

console.log('🚀 Ready to deploy? Follow the steps above!');
console.log('📞 Need help? Check DigitalOcean docs: https://docs.digitalocean.com/products/app-platform/');
console.log('💬 Support: https://www.digitalocean.com/support/');

console.log('\n🎯 Quick Commands:');
console.log('==================');
console.log('git add . && git commit -m "Ready for DigitalOcean deployment" && git push');
console.log('Then follow steps 2-5 above to complete deployment.');

console.log('\n🎉 Benefits of DigitalOcean App Platform:');
console.log('========================================');
console.log('✅ No restrictions on deployment services');
console.log('✅ 99.99% uptime guarantee');
console.log('✅ Automatic SSL certificates');
console.log('✅ Global CDN included');
console.log('✅ Auto-scaling capabilities');
console.log('✅ Built-in monitoring and logs');
console.log('✅ 24/7 expert support');
console.log('✅ Predictable pricing');

