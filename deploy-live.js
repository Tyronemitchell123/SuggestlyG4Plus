#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 SUGGESTLY ELITE - LIVE DEPLOYMENT SCRIPT");
console.log("==========================================\n");

// Check if we're in the right directory
if (!fs.existsSync("package.json")) {
  console.error(
    "❌ Error: package.json not found. Please run this script from the project root."
  );
  process.exit(1);
}

// Check if Vercel CLI is installed
try {
  execSync("vercel --version", { stdio: "pipe" });
  console.log("✅ Vercel CLI is installed");
} catch (error) {
  console.log("📦 Installing Vercel CLI...");
  try {
    execSync("npm install -g vercel", { stdio: "inherit" });
    console.log("✅ Vercel CLI installed successfully");
  } catch (installError) {
    console.error(
      "❌ Failed to install Vercel CLI. Please install manually: npm install -g vercel"
    );
    process.exit(1);
  }
}

// Check if user is logged in to Vercel
try {
  execSync("vercel whoami", { stdio: "pipe" });
  console.log("✅ Already logged in to Vercel");
} catch (error) {
  console.log("🔐 Please log in to Vercel...");
  console.log(
    '   This will open your browser. Choose "Continue with GitHub" for easiest setup.'
  );
  try {
    execSync("vercel login", { stdio: "inherit" });
  } catch (loginError) {
    console.error("❌ Login failed. Please try again.");
    process.exit(1);
  }
}

// Deploy to production
console.log("\n🚀 Deploying to production...");
console.log("   This will make your site live on the internet!");

try {
  execSync("vercel --prod --yes", { stdio: "inherit" });
  console.log("\n🎉 DEPLOYMENT SUCCESSFUL!");
  console.log("==========================================");
  console.log("Your Suggestly Elite homepage is now LIVE on the internet!");
  console.log("\n📋 Next steps:");
  console.log("1. Test your live site");
  console.log("2. Share the URL with others");
  console.log("3. Set up a custom domain (optional)");
  console.log("4. Add analytics and monitoring");
} catch (deployError) {
  console.error(
    "\n❌ Deployment failed. Please check the error above and try again."
  );
  console.log("\n💡 Alternative deployment options:");
  console.log("1. Try Netlify: https://netlify.com");
  console.log("2. Try GitHub Pages");
  console.log("3. Check the LIVE_DEPLOYMENT_GUIDE.md for manual steps");
  process.exit(1);
}

console.log("\n🎯 Your site is now live! Share it with the world! 🌍");



















