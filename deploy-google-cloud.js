#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 SUGGESTLY ELITE - Google Cloud Run Deployment");
console.log("==============================================\n");

// Check if we're in the right directory
if (!fs.existsSync("package.json")) {
  console.log(
    "❌ Error: package.json not found. Please run this script from the project root."
  );
  process.exit(1);
}

console.log("📋 Google Cloud Run Deployment Steps:");
console.log("====================================\n");

console.log("1️⃣  Create Google Cloud Account:");
console.log("   - Go to https://cloud.google.com");
console.log('   - Click "Get started for free"');
console.log("   - Enter your details and payment info");
console.log("   - Get $300 free credit for new users\n");

console.log("2️⃣  Install Google Cloud CLI:");
console.log(
  "   Windows: Download from https://cloud.google.com/sdk/docs/install"
);
console.log("   macOS: brew install google-cloud-sdk");
console.log("   Linux: curl https://sdk.cloud.google.com | bash\n");

console.log("3️⃣  Authenticate and Setup:");
console.log("   gcloud auth login");
console.log("   gcloud config set project YOUR_PROJECT_ID");
console.log("   gcloud services enable run.googleapis.com\n");

console.log("4️⃣  Deploy to Cloud Run:");
console.log("   gcloud run deploy suggestly-elite \\");
console.log("     --source . \\");
console.log("     --platform managed \\");
console.log("     --region us-central1 \\");
console.log("     --allow-unauthenticated \\");
console.log("     --set-env-vars NODE_ENV=production\n");

console.log("5️⃣  Environment Variables:");
console.log("   Add these to your deployment command:");
console.log("   --set-env-vars FIREBASE_API_KEY=your_key \\");
console.log("   --set-env-vars FIREBASE_AUTH_DOMAIN=your_domain \\");
console.log("   --set-env-vars STRIPE_PUBLISHABLE_KEY=your_key \\");
console.log("   --set-env-vars OPENAI_API_KEY=your_key\n");

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
      console.log('   git commit -m "Ready for Google Cloud deployment"');
      console.log("   git push\n");
    } else {
      console.log("✅ All changes are committed");
    }
  } catch (error) {
    console.log("⚠️  Could not check git status");
  }
}

// Check if Google Cloud CLI is installed
try {
  execSync("gcloud --version", { stdio: "ignore" });
  console.log("✅ Google Cloud CLI is installed");
} catch (error) {
  console.log("❌ Google Cloud CLI is not installed");
  console.log("Please install Google Cloud CLI first:");
  console.log("   https://cloud.google.com/sdk/docs/install\n");
}

console.log("💰 Google Cloud Pricing:");
console.log("=======================");
console.log("• Free Tier:");
console.log("  - 2 million requests/month");
console.log("  - 360,000 vCPU-seconds/month");
console.log("  - 180,000 GiB-seconds/month");
console.log("• Pay-per-use after free tier");
console.log("• Only pay when handling requests\n");

console.log("🎯 Complete Deployment Command:");
console.log("==============================");
console.log("gcloud run deploy suggestly-elite \\");
console.log("  --source . \\");
console.log("  --platform managed \\");
console.log("  --region us-central1 \\");
console.log("  --allow-unauthenticated \\");
console.log("  --set-env-vars NODE_ENV=production \\");
console.log("  --set-env-vars FIREBASE_API_KEY=your_firebase_api_key \\");
console.log(
  "  --set-env-vars FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain \\"
);
console.log(
  "  --set-env-vars STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key \\"
);
console.log("  --set-env-vars OPENAI_API_KEY=your_openai_api_key\n");

console.log("🌐 Custom Domain Setup:");
console.log("======================");
console.log("1. Map custom domain in Cloud Run console");
console.log("2. Verify domain ownership");
console.log("3. Update DNS records");
console.log("4. SSL certificate is automatic\n");

console.log("📊 Monitoring:");
console.log("==============");
console.log("• Cloud Run console for metrics");
console.log("• Cloud Logging for logs");
console.log("• Cloud Monitoring for alerts");
console.log("• Performance insights\n");

console.log("🚀 Ready to deploy? Follow the steps above!");
console.log(
  "📞 Need help? Check Google Cloud docs: https://cloud.google.com/run/docs"
);
console.log("💬 Support: https://cloud.google.com/support/");

console.log("\n🎉 Benefits of Google Cloud Run:");
console.log("==============================");
console.log("✅ No restrictions on service types");
console.log("✅ Auto-scaling to zero (pay only for usage)");
console.log("✅ Global deployment options");
console.log("✅ Built-in security");
console.log("✅ Automatic HTTPS");
console.log("✅ Container-based deployment");
console.log("✅ Integration with Google Cloud services");
console.log("✅ Generous free tier");
console.log("✅ Pay-per-use pricing");
