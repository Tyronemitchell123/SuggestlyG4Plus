#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 SUGGESTLY ELITE - AWS Amplify Deployment');
console.log('==========================================\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
    console.log('❌ Error: package.json not found. Please run this script from the project root.');
    process.exit(1);
}

console.log('📋 AWS Amplify Deployment Steps:');
console.log('================================\n');

console.log('1️⃣  Set Up AWS Account:');
console.log('   - Go to https://aws.amazon.com');
console.log('   - Create an AWS account');
console.log('   - Add payment method (required)');
console.log('   - Get free tier benefits for new users\n');

console.log('2️⃣  Install AWS CLI:');
console.log('   Windows: Download from https://aws.amazon.com/cli/');
console.log('   macOS: brew install awscli');
console.log('   Linux: sudo apt-get install awscli\n');

console.log('3️⃣  Install Amplify CLI:');
console.log('   npm install -g @aws-amplify/cli\n');

console.log('4️⃣  Configure AWS:');
console.log('   aws configure');
console.log('   - Enter your AWS Access Key ID');
console.log('   - Enter your AWS Secret Access Key');
console.log('   - Enter your default region (e.g., us-east-1)');
console.log('   - Enter your output format (json)\n');

console.log('5️⃣  Initialize Amplify Project:');
console.log('   amplify init');
console.log('   - Enter a name for the project: suggestly-elite');
console.log('   - Enter a name for the environment: dev');
console.log('   - Choose your default editor');
console.log('   - Choose JavaScript');
console.log('   - Choose React');
console.log('   - Choose npm\n');

console.log('6️⃣  Add Hosting:');
console.log('   amplify add hosting');
console.log('   - Choose "Amazon CloudFront and S3"');
console.log('   - Choose "Yes" for custom domain');
console.log('   - Enter your domain name (optional)\n');

console.log('7️⃣  Configure Environment Variables:');
console.log('   amplify env add');
console.log('   - Enter environment name: production');
console.log('   - Choose your default editor\n');

console.log('8️⃣  Deploy to AWS:');
console.log('   amplify publish\n');

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
            console.log('   git commit -m "Ready for AWS Amplify deployment"');
            console.log('   git push\n');
        } else {
            console.log('✅ All changes are committed');
        }
    } catch (error) {
        console.log('⚠️  Could not check git status');
    }
}

// Check if AWS CLI is installed
try {
    execSync('aws --version', { stdio: 'ignore' });
    console.log('✅ AWS CLI is installed');
} catch (error) {
    console.log('❌ AWS CLI is not installed');
    console.log('Please install AWS CLI first:');
    console.log('   Windows: https://aws.amazon.com/cli/');
    console.log('   macOS: brew install awscli');
    console.log('   Linux: sudo apt-get install awscli\n');
}

// Check if Amplify CLI is installed
try {
    execSync('amplify --version', { stdio: 'ignore' });
    console.log('✅ Amplify CLI is installed');
} catch (error) {
    console.log('❌ Amplify CLI is not installed');
    console.log('Please install Amplify CLI:');
    console.log('   npm install -g @aws-amplify/cli\n');
}

console.log('💰 AWS Pricing Information:');
console.log('===========================');
console.log('• Free Tier: 12 months free');
console.log('• S3 Storage: $0.023 per GB/month');
console.log('• CloudFront: $0.085 per GB');
console.log('• Lambda: $0.20 per 1M requests');
console.log('• Pay only for what you use\n');

console.log('🔒 Environment Variables Setup:');
console.log('===============================');
console.log('After running amplify init, add these environment variables:');
console.log('');
console.log('amplify env add');
console.log('Then add these variables:');
console.log('FIREBASE_API_KEY=your_firebase_api_key');
console.log('FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain');
console.log('FIREBASE_PROJECT_ID=your_firebase_project_id');
console.log('STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key');
console.log('STRIPE_SECRET_KEY=your_stripe_secret_key');
console.log('OPENAI_API_KEY=your_openai_api_key');
console.log('EMAIL_SERVICE_API_KEY=your_email_service_key\n');

console.log('🌐 Custom Domain Setup:');
console.log('======================');
console.log('1. Purchase domain from Route 53 or external provider');
console.log('2. Add domain to Amplify console');
console.log('3. Configure DNS records as instructed');
console.log('4. SSL certificate will be provided automatically\n');

console.log('📊 Monitoring & Analytics:');
console.log('==========================');
console.log('• AWS CloudWatch for monitoring');
console.log('• Amplify Console for app management');
console.log('• Real-time logs and metrics');
console.log('• Performance insights\n');

console.log('🚀 Ready to deploy? Follow the steps above!');
console.log('📞 Need help? Check AWS docs: https://docs.amplify.aws/');
console.log('💬 Support: https://aws.amazon.com/support/');

console.log('\n🎯 Quick Commands:');
console.log('==================');
console.log('git add . && git commit -m "Ready for AWS Amplify deployment" && git push');
console.log('Then run: amplify init && amplify add hosting && amplify publish');

console.log('\n🎉 Benefits of AWS Amplify:');
console.log('==========================');
console.log('✅ No restrictions on deployment services');
console.log('✅ Global CDN with CloudFront');
console.log('✅ Automatic SSL certificates');
console.log('✅ Built-in CI/CD pipeline');
console.log('✅ Serverless functions support');
console.log('✅ Real-time collaboration');
console.log('✅ Advanced security features');
console.log('✅ Pay-as-you-go pricing');
console.log('✅ Enterprise-grade reliability');

