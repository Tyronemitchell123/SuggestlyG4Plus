#!/usr/bin/env node

/**
 * SUGGESTLY ELITE - Live Deployment Script
 * Automates deployment to multiple platforms
 * Version: 2.0.0
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Configuration
const CONFIG = {
  projectName: "suggestly-elite",
  version: "2.0.0",
  platforms: {
    vercel: {
      name: "Vercel",
      url: "https://vercel.com/new",
      command: "vercel --prod",
      configFile: "vercel.json",
    },
    netlify: {
      name: "Netlify",
      url: "https://app.netlify.com/drop",
      configFile: "netlify.toml",
    },
    firebase: {
      name: "Firebase",
      url: "https://console.firebase.google.com/",
      command: "firebase deploy",
      configFile: "firebase.json",
    },
    railway: {
      name: "Railway",
      url: "https://railway.app/",
      configFile: "railway.json",
    },
  },
};

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

// Utility functions
function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, "green");
}

function logError(message) {
  log(`❌ ${message}`, "red");
}

function logWarning(message) {
  log(`⚠️ ${message}`, "yellow");
}

function logInfo(message) {
  log(`ℹ️ ${message}`, "blue");
}

function logHeader(message) {
  log(`\n${colors.bright}${colors.cyan}${"=".repeat(60)}${colors.reset}`);
  log(`${colors.bright}${colors.cyan}${message}${colors.reset}`);
  log(`${colors.bright}${colors.cyan}${"=".repeat(60)}${colors.reset}\n`);
}

// Check if file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Create vercel.json configuration
function createVercelConfig() {
  const vercelConfig = {
    version: 2,
    name: "suggestly-elite-ultra-premium",
    builds: [
      {
        src: "*.html",
        use: "@vercel/static",
      },
      {
        src: "pages/*.html",
        use: "@vercel/static",
      },
      {
        src: "src/**/*",
        use: "@vercel/node",
      },
    ],
    routes: [
      {
        src: "/",
        dest: "/suggestly-elite-complete-website.html",
      },
      {
        src: "/home",
        dest: "/suggestly-elite-complete-website.html",
      },
      {
        src: "/ai-control",
        dest: "/suggestly-elite-complete-website.html",
      },
      {
        src: "/dashboard",
        dest: "/suggestly-elite-complete-website.html",
      },
      {
        src: "/quantum",
        dest: "/suggestly-elite-complete-website.html",
      },
      {
        src: "/live-data",
        dest: "/suggestly-elite-complete-website.html",
      },
      {
        src: "/complete",
        dest: "/suggestly-elite-complete-website.html",
      },
      {
        src: "/deploy",
        dest: "/live-deployment-setup.html",
      },
      {
        src: "/(.*)",
        dest: "/$1",
      },
    ],
    headers: [
      {
        source: "**/*.html",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ],
    functions: {
      "api/**/*.js": {
        runtime: "nodejs18.x",
      },
    },
  };

  fs.writeFileSync("vercel.json", JSON.stringify(vercelConfig, null, 2));
  logSuccess("Created vercel.json configuration");
}

// Create netlify.toml configuration
function createNetlifyConfig() {
  const netlifyConfig = `[build]
  publish = "."
  command = "echo 'No build command needed'"

[[redirects]]
  from = "/"
  to = "/suggestly-elite-complete-website.html"
  status = 200

[[redirects]]
  from = "/home"
  to = "/suggestly-elite-complete-website.html"
  status = 200

[[redirects]]
  from = "/ai-control"
  to = "/suggestly-elite-complete-website.html"
  status = 200

[[redirects]]
  from = "/dashboard"
  to = "/suggestly-elite-complete-website.html"
  status = 200

[[redirects]]
  from = "/quantum"
  to = "/suggestly-elite-complete-website.html"
  status = 200

[[redirects]]
  from = "/live-data"
  to = "/suggestly-elite-complete-website.html"
  status = 200

[[redirects]]
  from = "/complete"
  to = "/suggestly-elite-complete-website.html"
  status = 200

[[redirects]]
  from = "/deploy"
  to = "/live-deployment-setup.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "**/*.html"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
`;

  fs.writeFileSync("netlify.toml", netlifyConfig);
  logSuccess("Created netlify.toml configuration");
}

// Create firebase.json configuration
function createFirebaseConfig() {
  const firebaseConfig = {
    hosting: {
      public: ".",
      ignore: ["firebase.json", "**/.*", "**/node_modules/**"],
      rewrites: [
        {
          source: "/",
          destination: "/suggestly-elite-complete-website.html",
        },
        {
          source: "/home",
          destination: "/suggestly-elite-complete-website.html",
        },
        {
          source: "/ai-control",
          destination: "/suggestly-elite-complete-website.html",
        },
        {
          source: "/dashboard",
          destination: "/suggestly-elite-complete-website.html",
        },
        {
          source: "/quantum",
          destination: "/suggestly-elite-complete-website.html",
        },
        {
          source: "/live-data",
          destination: "/suggestly-elite-complete-website.html",
        },
        {
          source: "/complete",
          destination: "/suggestly-elite-complete-website.html",
        },
        {
          source: "/deploy",
          destination: "/live-deployment-setup.html",
        },
      ],
      headers: [
        {
          source: "**/*.html",
          headers: [
            {
              key: "X-Frame-Options",
              value: "DENY",
            },
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin",
            },
          ],
        },
      ],
    },
  };

  fs.writeFileSync("firebase.json", JSON.stringify(firebaseConfig, null, 2));
  logSuccess("Created firebase.json configuration");
}

// Create railway.json configuration
function createRailwayConfig() {
  const railwayConfig = {
    $schema: "https://railway.app/railway.schema.json",
    build: {
      builder: "NIXPACKS",
    },
    deploy: {
      startCommand: "npx http-server -p $PORT -o",
      healthcheckPath: "/",
      healthcheckTimeout: 100,
      restartPolicyType: "ON_FAILURE",
      restartPolicyMaxRetries: 10,
    },
  };

  fs.writeFileSync("railway.json", JSON.stringify(railwayConfig, null, 2));
  logSuccess("Created railway.json configuration");
}

// Check dependencies
function checkDependencies() {
  logHeader("Checking Dependencies");

  const requiredFiles = [
    "suggestly-elite-complete-website.html",
    "suggestly-elite-master-script.js",
    "live-deployment-setup.html",
  ];

  let allFilesExist = true;

  requiredFiles.forEach((file) => {
    if (fileExists(file)) {
      logSuccess(`Found ${file}`);
    } else {
      logError(`Missing ${file}`);
      allFilesExist = false;
    }
  });

  if (!allFilesExist) {
    logError(
      "Some required files are missing. Please ensure all files are present."
    );
    process.exit(1);
  }

  logSuccess("All required files found!");
}

// Install Vercel CLI
function installVercelCLI() {
  logHeader("Installing Vercel CLI");

  try {
    logInfo("Installing Vercel CLI globally...");
    execSync("npm install -g vercel", { stdio: "inherit" });
    logSuccess("Vercel CLI installed successfully");
  } catch (error) {
    logWarning(
      "Failed to install Vercel CLI globally. You may need to run: npm install -g vercel"
    );
  }
}

// Deploy to Vercel
function deployToVercel() {
  logHeader("Deploying to Vercel");

  try {
    logInfo("Creating Vercel configuration...");
    createVercelConfig();

    logInfo("Deploying to Vercel...");
    execSync("vercel --prod", { stdio: "inherit" });

    logSuccess("Deployment to Vercel completed successfully!");
    logInfo(
      "Your platform is now live at: https://suggestly-elite.vercel.app/"
    );
  } catch (error) {
    logError("Failed to deploy to Vercel");
    logInfo("You can manually deploy by running: vercel --prod");
  }
}

// Deploy to Netlify
function deployToNetlify() {
  logHeader("Setting up Netlify Deployment");

  try {
    logInfo("Creating Netlify configuration...");
    createNetlifyConfig();

    logSuccess("Netlify configuration created!");
    logInfo("To deploy to Netlify:");
    logInfo("1. Go to https://app.netlify.com/drop");
    logInfo("2. Drag and drop your project folder");
    logInfo("3. Your site will be deployed automatically");
  } catch (error) {
    logError("Failed to create Netlify configuration");
  }
}

// Deploy to Firebase
function deployToFirebase() {
  logHeader("Setting up Firebase Deployment");

  try {
    logInfo("Creating Firebase configuration...");
    createFirebaseConfig();

    logSuccess("Firebase configuration created!");
    logInfo("To deploy to Firebase:");
    logInfo("1. Install Firebase CLI: npm install -g firebase-tools");
    logInfo("2. Login: firebase login");
    logInfo("3. Initialize: firebase init hosting");
    logInfo("4. Deploy: firebase deploy");
  } catch (error) {
    logError("Failed to create Firebase configuration");
  }
}

// Deploy to Railway
function deployToRailway() {
  logHeader("Setting up Railway Deployment");

  try {
    logInfo("Creating Railway configuration...");
    createRailwayConfig();

    logSuccess("Railway configuration created!");
    logInfo("To deploy to Railway:");
    logInfo("1. Go to https://railway.app/");
    logInfo("2. Connect your GitHub repository");
    logInfo("3. Railway will automatically deploy your app");
  } catch (error) {
    logError("Failed to create Railway configuration");
  }
}

// Show deployment URLs
function showDeploymentUrls() {
  logHeader("Live Deployment URLs");

  const urls = {
    "Main Platform": "https://suggestly-elite.vercel.app/",
    "AI Control Center": "https://suggestly-elite.vercel.app/ai-control",
    Dashboard: "https://suggestly-elite.vercel.app/dashboard",
    "Quantum Systems": "https://suggestly-elite.vercel.app/quantum",
    "Live Data Stream": "https://suggestly-elite.vercel.app/live-data",
    "Complete Platform": "https://suggestly-elite.vercel.app/complete",
    "Deployment Setup": "https://suggestly-elite.vercel.app/deploy",
  };

  Object.entries(urls).forEach(([name, url]) => {
    log(
      `${colors.cyan}${name}:${colors.reset} ${colors.green}${url}${colors.reset}`
    );
  });
}

// Main deployment function
function main() {
  logHeader("SUGGESTLY ELITE - Live Deployment Setup");
  logInfo(`Version: ${CONFIG.version}`);
  logInfo(`Project: ${CONFIG.projectName}`);

  // Check dependencies
  checkDependencies();

  // Install Vercel CLI
  installVercelCLI();

  // Create configurations for all platforms
  logHeader("Creating Deployment Configurations");
  createVercelConfig();
  createNetlifyConfig();
  createFirebaseConfig();
  createRailwayConfig();

  // Deploy to Vercel (automatic)
  deployToVercel();

  // Setup other platforms
  deployToNetlify();
  deployToFirebase();
  deployToRailway();

  // Show URLs
  showDeploymentUrls();

  logHeader("Deployment Setup Complete!");
  logSuccess("Your SUGGESTLY ELITE platform is ready for live deployment!");
  logInfo("All configuration files have been created.");
  logInfo("You can now deploy to any of the supported platforms.");
}

// Run the deployment
if (require.main === module) {
  main();
}

module.exports = {
  CONFIG,
  createVercelConfig,
  createNetlifyConfig,
  createFirebaseConfig,
  createRailwayConfig,
  deployToVercel,
  deployToNetlify,
  deployToFirebase,
  deployToRailway,
};



















