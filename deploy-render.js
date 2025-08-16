#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 SUGGESTLY ELITE - Render Deployment Guide');
console.log('==========================================\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
    console.log('❌ Error: package.json not found. Please run this script from the project root.');
    process.exit(1);
}

console.log('📋 Render Deployment Instructions:');
console.log('==================================\n');

console.log('1️⃣  Prepare Your Repository:');
console.log('   - Ensure your code is pushed to GitHub');
console.log('   - Make sure all dependencies are in package.json');
console.log('   - Verify your build and start scripts\n');

// Check if git repository exists
if (!fs.existsSync('.git')) {
    console.log('❌ Git repository not found. Please initialize git:');
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
            console.log('   git commit -m "Ready for deployment"');
            console.log('   git push\n');
        } else {
            console.log('✅ All changes are committed');
        }
    } catch (error) {
        console.log('⚠️  Could not check git status');
    }
}

console.log('2️⃣  Set Up Render Account:');
console.log('   - Go to https://render.com');
console.log('   - Sign up with your GitHub account');
console.log('   - Verify your email address\n');

console.log('3️⃣  Create New Web Service:');
console.log('   - Click "New +" in your Render dashboard');
console.log('   - Select "Web Service"');
console.log('   - Connect your GitHub repository');
console.log('   - Choose the repository containing SUGGESTLY ELITE\n');

console.log('4️⃣  Configure Your Service:');
console.log('   - Name: suggestly-elite (or your preferred name)');
console.log('   - Environment: Node');
console.log('   - Region: Choose closest to your users');
console.log('   - Branch: main (or your default branch)');
console.log('   - Root Directory: . (leave empty if root)');
console.log('   - Build Command: npm install && npm run build');
console.log('   - Start Command: npm start\n');

console.log('5️⃣  Environment Variables:');
console.log('   Add these environment variables in Render dashboard:\n');

const envVars = [
    'NODE_ENV=production',
    'FIREBASE_API_KEY=your_firebase_api_key',
    'FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain',
    'FIREBASE_PROJECT_ID=your_firebase_project_id',
    'STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key',
    'STRIPE_SECRET_KEY=your_stripe_secret_key',
    'OPENAI_API_KEY=your_openai_api_key',
    'EMAIL_SERVICE_API_KEY=your_email_service_key'
];

envVars.forEach(var_ => {
    console.log(`   ${var_}`);
});

console.log('\n6️⃣  Deploy:');
console.log('   - Click "Create Web Service"');
console.log('   - Render will automatically build and deploy your app');
console.log('   - Monitor the build logs for any issues');
console.log('   - Your app will be available at: https://your-app-name.onrender.com\n');

console.log('7️⃣  Custom Domain (Optional):');
console.log('   - In your service settings, go to "Custom Domains"');
console.log('   - Add your domain and configure DNS');
console.log('   - Render will provide SSL certificate automatically\n');

console.log('8️⃣  Monitoring:');
console.log('   - Check "Logs" tab for application logs');
console.log('   - Monitor "Metrics" for performance data');
console.log('   - Set up alerts for downtime\n');

// Check if package.json has the right scripts
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
    
    if (scripts.dev) {
        console.log(`✅ Dev script: ${scripts.dev}`);
    }
    
    console.log('');
}

console.log('🚀 Ready to deploy? Follow the steps above!');
console.log('📞 Need help? Check Render docs: https://render.com/docs');
console.log('💬 Support: https://render.com/support');

console.log('\n🎯 Quick Commands:');
console.log('==================');
console.log('git add . && git commit -m "Ready for Render deployment" && git push');
console.log('Then follow steps 2-6 above to complete deployment on Render dashboard.');

