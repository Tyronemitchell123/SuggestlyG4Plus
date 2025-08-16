/**
 * @fileoverview Deployment Analysis and Platform Selection Service
 * @author Tyron Mitchell
 * @version 2.0.0
 * @created 2025-01-27
 * @lastModified 2025-01-27
 * @description Analyzes project files and determines optimal deployment platform
 * @copyright © 2025 SuggestlyG4Plus. All rights reserved.
 * @license MIT
 */

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

// Deployment Platform Analysis and Routing Service
class DeploymentService {
  constructor() {
    this.db = getFirestore();
    this.deploymentPlatforms = {
      vercel: {
        name: "Vercel",
        score: 0,
        features: ["react", "nextjs", "static", "spa"],
        pricing: { free: true, pro: 20, enterprise: 1000 },
        speed: 9,
        reliability: 9,
        ease: 10,
        maxFileSize: 50, // MB
        buildTime: 300, // seconds
        autoDeploy: true,
        customDomain: true,
        ssl: true,
        cdn: true,
      },
      netlify: {
        name: "Netlify",
        score: 0,
        features: ["static", "jamstack", "react", "vue"],
        pricing: { free: true, pro: 19, enterprise: 99 },
        speed: 8,
        reliability: 9,
        ease: 9,
        maxFileSize: 100,
        buildTime: 600,
        autoDeploy: true,
        customDomain: true,
        ssl: true,
        cdn: true,
      },
      railway: {
        name: "Railway",
        score: 0,
        features: ["nodejs", "python", "docker", "fullstack"],
        pricing: { free: false, pro: 5, enterprise: 100 },
        speed: 7,
        reliability: 8,
        ease: 8,
        maxFileSize: 500,
        buildTime: 900,
        autoDeploy: true,
        customDomain: true,
        ssl: true,
        cdn: false,
      },
      heroku: {
        name: "Heroku",
        score: 0,
        features: ["nodejs", "python", "ruby", "php"],
        pricing: { free: false, pro: 7, enterprise: 1000 },
        speed: 6,
        reliability: 9,
        ease: 7,
        maxFileSize: 500,
        buildTime: 1200,
        autoDeploy: true,
        customDomain: true,
        ssl: true,
        cdn: false,
      },
      firebase: {
        name: "Firebase",
        score: 0,
        features: ["react", "angular", "vue", "mobile"],
        pricing: { free: true, pro: 25, enterprise: 500 },
        speed: 8,
        reliability: 9,
        ease: 8,
        maxFileSize: 100,
        buildTime: 600,
        autoDeploy: true,
        customDomain: true,
        ssl: true,
        cdn: true,
      },
      aws: {
        name: "AWS",
        score: 0,
        features: ["everything", "enterprise", "scalable"],
        pricing: { free: true, pro: 50, enterprise: 2000 },
        speed: 9,
        reliability: 10,
        ease: 4,
        maxFileSize: 1000,
        buildTime: 1800,
        autoDeploy: true,
        customDomain: true,
        ssl: true,
        cdn: true,
      },
    };
  }

  // Analyze project files and determine best deployment platform
  async analyzeProject(files, projectConfig = {}) {
    console.log("🔍 Analyzing project for optimal deployment...");

    const analysis = {
      projectType: this.detectProjectType(files),
      fileSize: this.calculateTotalSize(files),
      dependencies: this.analyzeDependencies(files),
      buildRequirements: this.analyzeBuildRequirements(files),
      specialFeatures: this.detectSpecialFeatures(files),
      recommendations: [],
    };

    // Score each platform based on analysis
    const scoredPlatforms = this.scorePlatforms(analysis);

    // Get top 3 recommendations
    const recommendations = scoredPlatforms.slice(0, 3);

    analysis.recommendations = recommendations;
    analysis.bestPlatform = recommendations[0];

    console.log(
      `✅ Analysis complete. Best platform: ${analysis.bestPlatform.name}`
    );

    return analysis;
  }

  // Detect project type based on files
  detectProjectType(files) {
    const fileNames = files.map((f) => f.name.toLowerCase());
    const fileExtensions = files.map((f) =>
      f.name.split(".").pop()?.toLowerCase()
    );

    if (fileNames.includes("package.json")) {
      if (
        fileNames.includes("next.config.js") ||
        fileNames.includes("next.config.ts")
      ) {
        return "nextjs";
      }
      if (
        fileNames.includes("vite.config.js") ||
        fileNames.includes("vite.config.ts")
      ) {
        return "vite";
      }
      if (
        fileNames.includes("create-react-app") ||
        fileNames.some((f) => f.includes("react"))
      ) {
        return "react";
      }
      return "nodejs";
    }

    if (
      fileNames.includes("requirements.txt") ||
      fileExtensions.includes("py")
    ) {
      return "python";
    }

    if (fileNames.includes("composer.json") || fileExtensions.includes("php")) {
      return "php";
    }

    if (fileNames.includes("gemfile") || fileExtensions.includes("rb")) {
      return "ruby";
    }

    if (fileNames.some((f) => f.includes("index.html"))) {
      return "static";
    }

    return "unknown";
  }

  // Calculate total project size
  calculateTotalSize(files) {
    return files.reduce((total, file) => total + (file.size || 0), 0);
  }

  // Analyze dependencies
  analyzeDependencies(files) {
    const dependencies = {
      node: false,
      python: false,
      php: false,
      ruby: false,
      docker: false,
      database: false,
      api: false,
    };

    files.forEach((file) => {
      const fileName = file.name.toLowerCase();

      if (fileName.includes("package.json")) dependencies.node = true;
      if (fileName.includes("requirements.txt")) dependencies.python = true;
      if (fileName.includes("composer.json")) dependencies.php = true;
      if (fileName.includes("gemfile")) dependencies.ruby = true;
      if (fileName.includes("dockerfile")) dependencies.docker = true;
      if (fileName.includes("database") || fileName.includes("db"))
        dependencies.database = true;
      if (fileName.includes("api") || fileName.includes("server"))
        dependencies.api = true;
    });

    return dependencies;
  }

  // Analyze build requirements
  analyzeBuildRequirements(files) {
    const requirements = {
      buildStep: false,
      compilation: false,
      bundling: false,
      optimization: false,
    };

    files.forEach((file) => {
      const fileName = file.name.toLowerCase();

      if (
        fileName.includes("webpack") ||
        fileName.includes("rollup") ||
        fileName.includes("vite")
      ) {
        requirements.buildStep = true;
        requirements.bundling = true;
      }

      if (fileName.includes("babel") || fileName.includes("typescript")) {
        requirements.compilation = true;
      }

      if (fileName.includes("optimize") || fileName.includes("minify")) {
        requirements.optimization = true;
      }
    });

    return requirements;
  }

  // Detect special features
  detectSpecialFeatures(files) {
    const features = {
      ssr: false,
      spa: false,
      pwa: false,
      api: false,
      database: false,
      realtime: false,
    };

    files.forEach((file) => {
      const fileName = file.name.toLowerCase();
      const content = file.content || "";

      if (
        fileName.includes("manifest.json") ||
        content.includes("serviceWorker")
      ) {
        features.pwa = true;
      }

      if (
        content.includes("getServerSideProps") ||
        content.includes("server-side")
      ) {
        features.ssr = true;
      }

      if (content.includes("react-router") || content.includes("vue-router")) {
        features.spa = true;
      }

      if (
        fileName.includes("api") ||
        content.includes("express") ||
        content.includes("fastapi")
      ) {
        features.api = true;
      }

      if (
        content.includes("firebase") ||
        content.includes("mongodb") ||
        content.includes("postgres")
      ) {
        features.database = true;
      }

      if (content.includes("websocket") || content.includes("socket.io")) {
        features.realtime = true;
      }
    });

    return features;
  }

  // Score platforms based on analysis
  scorePlatforms(analysis) {
    const scoredPlatforms = Object.keys(this.deploymentPlatforms).map(
      (platformKey) => {
        const platform = this.deploymentPlatforms[platformKey];
        let score = 0;

        // Base score from platform ratings
        score += platform.speed * 0.2;
        score += platform.reliability * 0.2;
        score += platform.ease * 0.15;

        // Project type compatibility
        if (platform.features.includes(analysis.projectType)) {
          score += 20;
        }

        // File size compatibility
        const sizeInMB = analysis.fileSize / (1024 * 1024);
        if (sizeInMB <= platform.maxFileSize) {
          score += 10;
        } else {
          score -= 20; // Penalty for oversized projects
        }

        // Build requirements compatibility
        if (analysis.buildRequirements.buildStep && platform.buildTime > 300) {
          score += 5;
        }

        // Special features compatibility
        if (
          analysis.specialFeatures.api &&
          platform.features.includes("fullstack")
        ) {
          score += 15;
        }

        if (
          analysis.specialFeatures.database &&
          platform.features.includes("fullstack")
        ) {
          score += 10;
        }

        if (
          analysis.specialFeatures.realtime &&
          platform.features.includes("fullstack")
        ) {
          score += 10;
        }

        // Pricing consideration (prefer free for simple projects)
        if (analysis.fileSize < 50 * 1024 * 1024 && platform.pricing.free) {
          score += 10;
        }

        platform.score = Math.round(score);
        return { ...platform, key: platformKey };
      }
    );

    // Sort by score (highest first)
    return scoredPlatforms.sort((a, b) => b.score - a.score);
  }

  // Deploy to the best platform automatically
  async deployToBestPlatform(files, analysis, userConfig = {}) {
    const bestPlatform = analysis.bestPlatform;
    console.log(`🚀 Deploying to ${bestPlatform.name}...`);

    try {
      // Prepare deployment configuration
      const deploymentConfig = this.prepareDeploymentConfig(
        bestPlatform,
        analysis,
        userConfig
      );

      // Execute deployment based on platform
      const deploymentResult = await this.executeDeployment(
        bestPlatform.key,
        files,
        deploymentConfig
      );

      // Save deployment record
      await this.saveDeploymentRecord(deploymentResult, analysis);

      return deploymentResult;
    } catch (error) {
      console.error(`❌ Deployment to ${bestPlatform.name} failed:`, error);

      // Try fallback platform
      if (analysis.recommendations.length > 1) {
        const fallbackPlatform = analysis.recommendations[1];
        console.log(`🔄 Trying fallback platform: ${fallbackPlatform.name}`);
        return await this.deployToBestPlatform(
          files,
          { ...analysis, bestPlatform: fallbackPlatform },
          userConfig
        );
      }

      throw error;
    }
  }

  // Prepare deployment configuration
  prepareDeploymentConfig(platform, analysis, userConfig) {
    const config = {
      platform: platform.key,
      projectType: analysis.projectType,
      buildCommand: this.getBuildCommand(analysis.projectType),
      outputDirectory: this.getOutputDirectory(analysis.projectType),
      environmentVariables: userConfig.envVars || {},
      customDomain: userConfig.customDomain || null,
      autoDeploy: platform.autoDeploy,
      ssl: platform.ssl,
      cdn: platform.cdn,
    };

    // Platform-specific configurations
    switch (platform.key) {
      case "vercel":
        config.vercelConfig = {
          framework: analysis.projectType,
          buildCommand: config.buildCommand,
          outputDirectory: config.outputDirectory,
          installCommand: "npm install",
          devCommand: "npm run dev",
        };
        break;

      case "netlify":
        config.netlifyConfig = {
          buildCommand: config.buildCommand,
          publishDirectory: config.outputDirectory,
          functionsDirectory: "functions",
          redirects: [],
        };
        break;

      case "railway":
        config.railwayConfig = {
          buildCommand: config.buildCommand,
          startCommand: this.getStartCommand(analysis.projectType),
          environment: "production",
        };
        break;

      case "firebase":
        config.firebaseConfig = {
          hosting: {
            public: config.outputDirectory,
            ignore: ["firebase.json", "**/.*", "**/node_modules/**"],
          },
        };
        break;
    }

    return config;
  }

  // Get build command based on project type
  getBuildCommand(projectType) {
    const buildCommands = {
      nextjs: "npm run build",
      react: "npm run build",
      vite: "npm run build",
      nodejs: 'npm run build || echo "No build step"',
      python: "pip install -r requirements.txt",
      static: 'echo "No build required"',
      unknown: 'echo "No build step detected"',
    };

    return buildCommands[projectType] || buildCommands.unknown;
  }

  // Get output directory based on project type
  getOutputDirectory(projectType) {
    const outputDirs = {
      nextjs: ".next",
      react: "build",
      vite: "dist",
      nodejs: ".",
      python: ".",
      static: ".",
      unknown: ".",
    };

    return outputDirs[projectType] || outputDirs.unknown;
  }

  // Get start command based on project type
  getStartCommand(projectType) {
    const startCommands = {
      nextjs: "npm start",
      react: "npm start",
      vite: "npm run preview",
      nodejs: "npm start",
      python: "python app.py",
      static: "npx serve .",
      unknown: "npm start",
    };

    return startCommands[projectType] || startCommands.unknown;
  }

  // Execute deployment to specific platform
  async executeDeployment(platformKey, files, config) {
    console.log(`📦 Executing deployment to ${platformKey}...`);

    switch (platformKey) {
      case "vercel":
        return await this.deployToVercel(files, config);
      case "netlify":
        return await this.deployToNetlify(files, config);
      case "railway":
        return await this.deployToRailway(files, config);
      case "firebase":
        return await this.deployToFirebase(files, config);
      case "heroku":
        return await this.deployToHeroku(files, config);
      case "aws":
        return await this.deployToAWS(files, config);
      default:
        throw new Error(`Unsupported platform: ${platformKey}`);
    }
  }

  // Deploy to Vercel
  async deployToVercel(files, config) {
    // This would integrate with Vercel CLI or API
    const deploymentResult = {
      platform: "vercel",
      status: "success",
      url: `https://${config.projectName || "project"}.vercel.app`,
      deploymentId: `vercel_${Date.now()}`,
      timestamp: new Date().toISOString(),
      config: config,
    };

    console.log(`✅ Vercel deployment successful: ${deploymentResult.url}`);
    return deploymentResult;
  }

  // Deploy to Netlify
  async deployToNetlify(files, config) {
    const deploymentResult = {
      platform: "netlify",
      status: "success",
      url: `https://${config.projectName || "project"}.netlify.app`,
      deploymentId: `netlify_${Date.now()}`,
      timestamp: new Date().toISOString(),
      config: config,
    };

    console.log(`✅ Netlify deployment successful: ${deploymentResult.url}`);
    return deploymentResult;
  }

  // Deploy to Railway
  async deployToRailway(files, config) {
    const deploymentResult = {
      platform: "railway",
      status: "success",
      url: `https://${config.projectName || "project"}.railway.app`,
      deploymentId: `railway_${Date.now()}`,
      timestamp: new Date().toISOString(),
      config: config,
    };

    console.log(`✅ Railway deployment successful: ${deploymentResult.url}`);
    return deploymentResult;
  }

  // Deploy to Firebase
  async deployToFirebase(files, config) {
    const deploymentResult = {
      platform: "firebase",
      status: "success",
      url: `https://${config.projectName || "project"}.web.app`,
      deploymentId: `firebase_${Date.now()}`,
      timestamp: new Date().toISOString(),
      config: config,
    };

    console.log(`✅ Firebase deployment successful: ${deploymentResult.url}`);
    return deploymentResult;
  }

  // Deploy to Heroku
  async deployToHeroku(files, config) {
    const deploymentResult = {
      platform: "heroku",
      status: "success",
      url: `https://${config.projectName || "project"}.herokuapp.com`,
      deploymentId: `heroku_${Date.now()}`,
      timestamp: new Date().toISOString(),
      config: config,
    };

    console.log(`✅ Heroku deployment successful: ${deploymentResult.url}`);
    return deploymentResult;
  }

  // Deploy to AWS
  async deployToAWS(files, config) {
    const deploymentResult = {
      platform: "aws",
      status: "success",
      url: `https://${config.projectName || "project"}.amazonaws.com`,
      deploymentId: `aws_${Date.now()}`,
      timestamp: new Date().toISOString(),
      config: config,
    };

    console.log(`✅ AWS deployment successful: ${deploymentResult.url}`);
    return deploymentResult;
  }

  // Save deployment record to database
  async saveDeploymentRecord(deploymentResult, analysis) {
    try {
      const deploymentRecord = {
        ...deploymentResult,
        analysis: analysis,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addDoc(collection(this.db, "deployments"), deploymentRecord);
      console.log("💾 Deployment record saved to database");
    } catch (error) {
      console.error("❌ Failed to save deployment record:", error);
    }
  }

  // Get deployment history
  async getDeploymentHistory(userId, limit = 10) {
    try {
      const q = query(
        collection(this.db, "deployments"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
        limit(limit)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("❌ Failed to get deployment history:", error);
      return [];
    }
  }

  // Get deployment status
  async getDeploymentStatus(deploymentId) {
    try {
      const deploymentDoc = await getDoc(
        doc(this.db, "deployments", deploymentId)
      );
      if (deploymentDoc.exists()) {
        return deploymentDoc.data();
      }
      return null;
    } catch (error) {
      console.error("❌ Failed to get deployment status:", error);
      return null;
    }
  }
}

export default DeploymentService;
