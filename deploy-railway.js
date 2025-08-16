#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 SUGGESTLY ELITE - Railway Deployment');
console.log('=====================================\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
    console.log('❌ Error: package.json not found. Please run this script from the project root.');
    process.exit(1);
}

// Check if Railway CLI is installed
try {
    execSync('railway --version', { stdio: 'ignore' });
    console.log('✅ Railway CLI is installed');
} catch (error) {
    console.log('📦 Installing Railway CLI...');
    try {
        execSync('npm install -g @railway/cli', { stdio: 'inherit' });
        console.log('✅ Railway CLI installed successfully');
    } catch (installError) {
        console.log('❌ Failed to install Railway CLI. Please install manually:');
        console.log('   npm install -g @railway/cli');
        process.exit(1);
    }
}

// Check if user is logged in to Railway
try {
    execSync('railway whoami', { stdio: 'ignore' });
    console.log('✅ Logged in to Railway');
} catch (error) {
    console.log('🔐 Please log in to Railway...');
    try {
        execSync('railway login', { stdio: 'inherit' });
        console.log('✅ Login successful');
    } catch (loginError) {
        console.log('❌ Login failed. Please try again.');
        process.exit(1);
    }
}

// Check if project is initialized
if (!fs.existsSync('.railway')) {
    console.log('🔧 Initializing Railway project...');
    try {
        execSync('railway init', { stdio: 'inherit' });
        console.log('✅ Project initialized');
    } catch (initError) {
        console.log('❌ Failed to initialize project');
        process.exit(1);
    }
}

// Install dependencies if needed
if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing dependencies...');
    try {
        execSync('npm install', { stdio: 'inherit' });
        console.log('✅ Dependencies installed');
    } catch (installError) {
        console.log('❌ Failed to install dependencies');
        process.exit(1);
    }
}

// Build the project if needed
if (fs.existsSync('package.json')) {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (packageJson.scripts && packageJson.scripts.build) {
        console.log('🔨 Building project...');
        try {
            execSync('npm run build', { stdio: 'inherit' });
            console.log('✅ Build completed');
        } catch (buildError) {
            console.log('❌ Build failed');
            process.exit(1);
        }
    }
}

// Deploy to Railway
console.log('🚀 Deploying to Railway...');
try {
    execSync('railway up', { stdio: 'inherit' });
    console.log('✅ Deployment completed successfully!');
    
    // Get the deployment URL
    try {
        const url = execSync('railway domain', { encoding: 'utf8' }).trim();
        console.log(`🌐 Your app is live at: ${url}`);
    } catch (urlError) {
        console.log('📋 Check your Railway dashboard for the deployment URL');
    }
    
} catch (deployError) {
    console.log('❌ Deployment failed');
    console.log('💡 Try running: railway up --debug');
    process.exit(1);
}

console.log('\n🎉 SUGGESTLY ELITE is now live on Railway!');
console.log('📊 Check your Railway dashboard for monitoring and logs');
console.log('🔧 To update your app, just run: railway up');

