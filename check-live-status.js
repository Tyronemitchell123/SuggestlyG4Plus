#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

console.log("🔍 SUGGESTLY ELITE - LIVE STATUS CHECKER");
console.log("========================================\n");

// Check if vercel.json exists (indicates Vercel setup)
if (fs.existsSync("vercel.json")) {
  console.log("✅ Vercel configuration found");
} else {
  console.log("❌ No Vercel configuration found");
}

// Check if netlify.toml exists (indicates Netlify setup)
if (fs.existsSync("netlify.toml")) {
  console.log("✅ Netlify configuration found");
} else {
  console.log("❌ No Netlify configuration found");
}

// Check if .vercel directory exists (indicates previous deployment)
if (fs.existsSync(".vercel")) {
  console.log("✅ Previous Vercel deployment detected");

  try {
    // Try to get project info
    const projectInfo = execSync("vercel ls --json", { encoding: "utf8" });
    console.log("📊 Found Vercel projects:");
    console.log(projectInfo);
  } catch (error) {
    console.log('ℹ️  Run "vercel login" to see your projects');
  }
} else {
  console.log("❌ No previous Vercel deployment found");
}

// Check for common live URLs
const commonUrls = [
  "https://suggestly-elite-ultra-premium.vercel.app",
  "https://suggestly-g4-plus.vercel.app",
  "https://suggestly-elite.netlify.app",
];

console.log("\n🌐 Checking common live URLs...");
commonUrls.forEach((url) => {
  console.log(`🔗 ${url}`);
});

console.log("\n📋 DEPLOYMENT STATUS:");
console.log("====================");

if (fs.existsSync(".vercel")) {
  console.log("✅ Project is configured for Vercel deployment");
  console.log("🚀 To deploy: npm run deploy");
} else if (fs.existsSync("netlify.toml")) {
  console.log("✅ Project is configured for Netlify deployment");
  console.log("🚀 To deploy: npm run deploy:netlify");
} else {
  console.log("❌ No deployment configuration found");
  console.log("🚀 To deploy: npm run deploy");
}

console.log("\n🎯 QUICK ACTIONS:");
console.log("================");
console.log("1. Go live now: npm run go-live");
console.log("2. Deploy to Vercel: npm run deploy:vercel");
console.log("3. Deploy to Netlify: npm run deploy:netlify");
console.log("4. View deployment guide: LIVE_DEPLOYMENT_GUIDE.md");

console.log("\n💡 TIP: Double-click GO_LIVE.bat for one-click deployment!");




















