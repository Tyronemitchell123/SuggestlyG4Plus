#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 SUGGESTLY ELITE - Netlify Deployment");
console.log("======================================\n");

// Check if we're in the right directory
if (!fs.existsSync("package.json")) {
  console.log(
    "❌ Error: package.json not found. Please run this script from the project root."
  );
  process.exit(1);
}

console.log("📋 Netlify Deployment Steps:");
console.log("============================\n");

console.log("1️⃣  Create Netlify Account:");
console.log("   - Go to https://netlify.com");
console.log('   - Click "Sign up"');
console.log("   - Use GitHub, GitLab, or email");
console.log("   - Verify your email address\n");

console.log("2️⃣  Deploy via Dashboard (Recommended):");
console.log("   - Login to Netlify dashboard");
console.log('   - Click "New site from Git"');
console.log('   - Choose "GitHub"');
console.log("   - Authorize Netlify to access GitHub");
console.log("   - Select repository: Tyronemitchell123/SuggestlyG4Plus");
console.log("   - Select branch: main\n");

console.log("3️⃣  Configure Build Settings:");
console.log("   - Build command: npm run build");
console.log("   - Publish directory: . (or dist if you have a build folder)");
console.log('   - Click "Deploy site"\n');

console.log("4️⃣  Environment Variables (Optional):");
console.log("   - Go to Site settings > Environment variables");
console.log("   - Add your API keys:");
console.log("     FIREBASE_API_KEY=your_firebase_api_key");
console.log("     FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain");
console.log("     STRIPE_PUBLISHABLE_KEY=your_stripe_key");
console.log("     OPENAI_API_KEY=your_openai_key\n");

console.log("5️⃣  Custom Domain (Optional):");
console.log("   - Go to Site settings > Domain management");
console.log('   - Click "Add custom domain"');
console.log("   - Follow DNS configuration instructions");
console.log("   - SSL certificate is automatic\n");

// Check if git repository exists
if (!fs.existsSync(".git")) {
  console.log("⚠️  Git repository not found. Please initialize git:");
  console.log("   git init");
  console.log("   git add .");
  console.log('   git commit -m "Initial commit"');
  console.log("   git remote add origin <your-github-repo-url>");
  console.log("   git push -u origin main\n");
} else {
  console.log("✅ Git repository found");

  // Check if there are uncommitted changes
  try {
    const status = execSync("git status --porcelain", { encoding: "utf8" });
    if (status.trim()) {
      console.log(
        "⚠️  You have uncommitted changes. Please commit them first:"
      );
      console.log("   git add .");
      console.log('   git commit -m "Ready for Netlify deployment"');
      console.log("   git push\n");
    } else {
      console.log("✅ All changes are committed");
    }
  } catch (error) {
    console.log("⚠️  Could not check git status");
  }
}

// Check if Netlify CLI is installed
try {
  execSync("netlify --version", { stdio: "ignore" });
  console.log("✅ Netlify CLI is installed");
} catch (error) {
  console.log("❌ Netlify CLI is not installed");
  console.log("To install Netlify CLI:");
  console.log("   npm install -g netlify-cli\n");
}

console.log("💰 Netlify Pricing:");
console.log("==================");
console.log("• Free Tier:");
console.log("  - 100GB bandwidth/month");
console.log("  - 300 build minutes/month");
console.log("  - Form submissions: 100/month");
console.log("  - Function invocations: 125K/month");
console.log("• Pro Plan: $19/month");
console.log("• Business Plan: $99/month\n");

console.log("🎯 Quick Deploy Commands:");
console.log("========================");
console.log("Option 1 - Dashboard (Recommended):");
console.log("1. Go to https://netlify.com");
console.log('2. Click "New site from Git"');
console.log("3. Connect your GitHub repository");
console.log("4. Deploy automatically\n");

console.log("Option 2 - CLI:");
console.log("1. Install Netlify CLI: npm install -g netlify-cli");
console.log("2. Login: netlify login");
console.log("3. Deploy: netlify deploy --prod\n");

console.log("🚀 Ready to deploy? Follow the steps above!");
console.log("📞 Need help? Check Netlify docs: https://docs.netlify.com/");
console.log("💬 Support: https://www.netlify.com/support/");

console.log("\n🎉 Benefits of Netlify:");
console.log("=====================");
console.log("✅ Generous free tier");
console.log("✅ Easy deployment");
console.log("✅ Automatic HTTPS");
console.log("✅ Global CDN");
console.log("✅ Form handling");
console.log("✅ Serverless functions");
console.log("✅ Git-based deployments");
console.log("✅ Preview deployments");
console.log("✅ Easy custom domains");
