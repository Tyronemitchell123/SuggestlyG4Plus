/**
 * @fileoverview One-Push Deployment Service
 * @author Tyron Mitchell
 * @version 2.0.0
 * @created 2025-01-27
 * @lastModified 2025-01-27
 * @description Main orchestrator service for one-push deployment system
 * @copyright © 2025 SuggestlyG4Plus. All rights reserved.
 * @license MIT
 */

import DeploymentService from "./deploymentService.js";
import DeploymentPaymentService from "./deploymentPaymentService.js";
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

// One-Push Deployment Orchestrator Service
class OnePushDeploymentService {
  constructor() {
    this.db = getFirestore();
    this.deploymentService = new DeploymentService();
    this.paymentService = new DeploymentPaymentService();
  }

  // Main one-push deployment method
  async deployOnePush(
    userId,
    projectFiles,
    projectConfig = {},
    paymentMethod = null
  ) {
    console.log("🚀 Starting One-Push Deployment Process...");

    try {
      // Step 1: Analyze project files
      console.log("📊 Step 1: Analyzing project files...");
      const analysis = await this.deploymentService.analyzeProject(
        projectFiles,
        projectConfig
      );

      // Step 2: Check user's deployment eligibility
      console.log("🔍 Step 2: Checking deployment eligibility...");
      const canDeploy = await this.paymentService.canUserDeploy(userId);

      if (!canDeploy) {
        // Suggest one-time package or subscription upgrade
        const recommendations =
          this.paymentService.getDeploymentPricingRecommendations(analysis);
        return {
          success: false,
          error: "deployment_limit_reached",
          message:
            "You have reached your deployment limit. Please upgrade your plan or purchase a one-time deployment package.",
          recommendations,
          analysis,
        };
      }

      // Step 3: Get pricing recommendations
      console.log("💰 Step 3: Getting pricing recommendations...");
      const pricingRecommendations =
        this.paymentService.getDeploymentPricingRecommendations(analysis);

      // Step 4: Execute deployment
      console.log("🚀 Step 4: Executing deployment...");
      const deploymentResult =
        await this.deploymentService.deployToBestPlatform(
          projectFiles,
          analysis,
          projectConfig
        );

      // Step 5: Update usage and save deployment record
      console.log("💾 Step 5: Updating usage and saving records...");
      await this.paymentService.incrementDeploymentUsage(userId);
      await this.saveOnePushDeploymentRecord(
        userId,
        deploymentResult,
        analysis,
        projectConfig
      );

      // Step 6: Send notifications
      console.log("📧 Step 6: Sending notifications...");
      await this.sendDeploymentNotifications(
        userId,
        deploymentResult,
        analysis
      );

      console.log("✅ One-Push Deployment completed successfully!");

      return {
        success: true,
        deployment: deploymentResult,
        analysis,
        pricingRecommendations,
        message: "Deployment completed successfully!",
      };
    } catch (error) {
      console.error("❌ One-Push Deployment failed:", error);

      // Save failed deployment record
      await this.saveFailedDeploymentRecord(userId, error, projectConfig);

      return {
        success: false,
        error: error.message,
        message: "Deployment failed. Please try again or contact support.",
        analysis: null,
      };
    }
  }

  // One-time deployment with payment
  async deployOneTimeWithPayment(
    userId,
    packageId,
    projectFiles,
    projectConfig = {},
    paymentMethodId
  ) {
    console.log("💳 Starting One-Time Deployment with Payment...");

    try {
      // Step 1: Analyze project files
      console.log("📊 Step 1: Analyzing project files...");
      const analysis = await this.deploymentService.analyzeProject(
        projectFiles,
        projectConfig
      );

      // Step 2: Purchase one-time package
      console.log("💳 Step 2: Processing payment...");
      const paymentResult = await this.paymentService.purchaseOneTimeDeployment(
        userId,
        packageId,
        projectFiles,
        projectConfig
      );

      if (!paymentResult.success) {
        return {
          success: false,
          error: "payment_failed",
          message: "Payment processing failed. Please try again.",
          analysis,
        };
      }

      // Step 3: Execute deployment
      console.log("🚀 Step 3: Executing deployment...");
      const deploymentResult =
        await this.deploymentService.deployToBestPlatform(
          projectFiles,
          analysis,
          projectConfig
        );

      // Step 4: Update deployment record with success
      console.log("💾 Step 4: Updating deployment record...");
      await this.updateDeploymentRecord(paymentResult.deploymentId, {
        status: "success",
        deployment: deploymentResult,
        analysis,
        completedAt: new Date().toISOString(),
      });

      // Step 5: Send notifications
      console.log("📧 Step 5: Sending notifications...");
      await this.sendDeploymentNotifications(
        userId,
        deploymentResult,
        analysis,
        packageId
      );

      console.log(
        "✅ One-Time Deployment with Payment completed successfully!"
      );

      return {
        success: true,
        deployment: deploymentResult,
        analysis,
        payment: paymentResult,
        message: "One-time deployment completed successfully!",
      };
    } catch (error) {
      console.error("❌ One-Time Deployment failed:", error);

      // Update deployment record with failure
      if (paymentResult?.deploymentId) {
        await this.updateDeploymentRecord(paymentResult.deploymentId, {
          status: "failed",
          error: error.message,
          failedAt: new Date().toISOString(),
        });
      }

      return {
        success: false,
        error: error.message,
        message:
          "One-time deployment failed. Please try again or contact support.",
        analysis: null,
      };
    }
  }

  // Smart deployment with automatic plan selection
  async smartDeploy(userId, projectFiles, projectConfig = {}) {
    console.log("🧠 Starting Smart Deployment...");

    try {
      // Step 1: Analyze project
      const analysis = await this.deploymentService.analyzeProject(
        projectFiles,
        projectConfig
      );

      // Step 2: Get user's current subscription
      const userSubscription =
        await this.paymentService.getUserDeploymentSubscription(userId);

      // Step 3: Determine if user needs to upgrade
      const needsUpgrade = this.determineIfUpgradeNeeded(
        analysis,
        userSubscription
      );

      if (needsUpgrade) {
        // Suggest upgrade or one-time package
        const recommendations = this.getSmartRecommendations(
          analysis,
          userSubscription
        );
        return {
          success: false,
          needsUpgrade: true,
          recommendations,
          analysis,
          currentPlan: userSubscription.plan,
          message:
            "Your current plan may not be optimal for this project. Consider upgrading for better performance.",
        };
      }

      // Step 4: Proceed with deployment
      return await this.deployOnePush(userId, projectFiles, projectConfig);
    } catch (error) {
      console.error("❌ Smart Deployment failed:", error);
      return {
        success: false,
        error: error.message,
        message: "Smart deployment failed. Please try again.",
      };
    }
  }

  // Determine if user needs to upgrade based on project analysis
  determineIfUpgradeNeeded(analysis, userSubscription) {
    const plan = userSubscription.planDetails;

    // Check file size limits
    const sizeInMB = analysis.fileSize / (1024 * 1024);
    if (sizeInMB > 50 && plan.maxDeployments === 1) {
      return true; // Free plan with large project
    }

    // Check for advanced features
    if (
      (analysis.specialFeatures.api || analysis.specialFeatures.database) &&
      !plan.autoScaling
    ) {
      return true; // Complex project needs better plan
    }

    // Check deployment limits
    if (userSubscription.deploymentsRemaining === 0) {
      return true; // No deployments left
    }

    return false;
  }

  // Get smart recommendations based on analysis
  getSmartRecommendations(analysis, userSubscription) {
    const recommendations = [];

    // Based on project complexity
    if (analysis.specialFeatures.api || analysis.specialFeatures.database) {
      recommendations.push({
        type: "upgrade",
        plan: "pro",
        reason:
          "Full-stack application detected. Pro plan recommended for optimal performance.",
        priority: "high",
      });
    }

    // Based on file size
    const sizeInMB = analysis.fileSize / (1024 * 1024);
    if (sizeInMB > 100) {
      recommendations.push({
        type: "upgrade",
        plan: "pro",
        reason:
          "Large project detected. Pro plan provides better build times and performance.",
        priority: "medium",
      });
    }

    // Based on deployment limits
    if (userSubscription.deploymentsRemaining === 0) {
      recommendations.push({
        type: "one_time",
        package: "premium",
        reason:
          "No deployments remaining. Purchase a one-time deployment package.",
        priority: "high",
      });
    }

    return recommendations;
  }

  // Save one-push deployment record
  async saveOnePushDeploymentRecord(
    userId,
    deploymentResult,
    analysis,
    projectConfig
  ) {
    try {
      const deploymentRecord = {
        userId,
        type: "one_push",
        deployment: deploymentResult,
        analysis,
        projectConfig,
        status: "success",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addDoc(collection(this.db, "onePushDeployments"), deploymentRecord);
      console.log("💾 One-push deployment record saved");
    } catch (error) {
      console.error("❌ Failed to save one-push deployment record:", error);
    }
  }

  // Save failed deployment record
  async saveFailedDeploymentRecord(userId, error, projectConfig) {
    try {
      const failedRecord = {
        userId,
        type: "one_push",
        error: error.message,
        projectConfig,
        status: "failed",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addDoc(collection(this.db, "failedDeployments"), failedRecord);
      console.log("💾 Failed deployment record saved");
    } catch (error) {
      console.error("❌ Failed to save failed deployment record:", error);
    }
  }

  // Update deployment record
  async updateDeploymentRecord(deploymentId, updates) {
    try {
      await updateDoc(doc(this.db, "deployments", deploymentId), {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
      console.log("💾 Deployment record updated");
    } catch (error) {
      console.error("❌ Failed to update deployment record:", error);
    }
  }

  // Send deployment notifications
  async sendDeploymentNotifications(
    userId,
    deploymentResult,
    analysis,
    packageId = null
  ) {
    try {
      // Get user details
      const userDoc = await getDoc(doc(this.db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Send email notification
        await this.sendDeploymentEmail(
          userData.email,
          deploymentResult,
          analysis,
          packageId
        );

        // Send in-app notification
        await this.sendInAppNotification(userId, deploymentResult, analysis);

        console.log("📧 Deployment notifications sent");
      }
    } catch (error) {
      console.error("❌ Failed to send deployment notifications:", error);
    }
  }

  // Send deployment email
  async sendDeploymentEmail(email, deploymentResult, analysis, packageId) {
    try {
      const emailData = {
        to: email,
        subject: "🚀 Your deployment is live!",
        template: "deployment-success",
        data: {
          deploymentUrl: deploymentResult.url,
          platform: deploymentResult.platform,
          projectType: analysis.projectType,
          packageId,
          deploymentId: deploymentResult.deploymentId,
        },
      };

      // This would integrate with your email service
      console.log("📧 Deployment email prepared:", emailData);
    } catch (error) {
      console.error("❌ Failed to send deployment email:", error);
    }
  }

  // Send in-app notification
  async sendInAppNotification(userId, deploymentResult, analysis) {
    try {
      const notification = {
        userId,
        type: "deployment_success",
        title: "Deployment Successful! 🚀",
        message: `Your project has been deployed to ${deploymentResult.platform}`,
        data: {
          deploymentUrl: deploymentResult.url,
          platform: deploymentResult.platform,
          deploymentId: deploymentResult.deploymentId,
        },
        read: false,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(this.db, "notifications"), notification);
      console.log("📱 In-app notification sent");
    } catch (error) {
      console.error("❌ Failed to send in-app notification:", error);
    }
  }

  // Get deployment history for user
  async getDeploymentHistory(userId, limit = 20) {
    try {
      const q = query(
        collection(this.db, "onePushDeployments"),
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

  // Get deployment analytics for user
  async getDeploymentAnalytics(userId) {
    try {
      const deployments = await this.getDeploymentHistory(userId, 100);

      const analytics = {
        totalDeployments: deployments.length,
        successfulDeployments: deployments.filter((d) => d.status === "success")
          .length,
        failedDeployments: deployments.filter((d) => d.status === "failed")
          .length,
        platformsUsed: [
          ...new Set(
            deployments.map((d) => d.deployment?.platform).filter(Boolean)
          ),
        ],
        projectTypes: [
          ...new Set(
            deployments.map((d) => d.analysis?.projectType).filter(Boolean)
          ),
        ],
        averageDeploymentTime: this.calculateAverageDeploymentTime(deployments),
        monthlyDeployments: this.groupDeploymentsByMonth(deployments),
        mostUsedPlatform: this.getMostUsedPlatform(deployments),
      };

      return analytics;
    } catch (error) {
      console.error("❌ Failed to get deployment analytics:", error);
      return null;
    }
  }

  // Calculate average deployment time
  calculateAverageDeploymentTime(deployments) {
    const successfulDeployments = deployments.filter(
      (d) => d.deployment?.deploymentTime && d.status === "success"
    );
    if (successfulDeployments.length === 0) return 0;

    const totalTime = successfulDeployments.reduce(
      (sum, d) => sum + (d.deployment.deploymentTime || 0),
      0
    );
    return Math.round(totalTime / successfulDeployments.length);
  }

  // Group deployments by month
  groupDeploymentsByMonth(deployments) {
    const monthlyData = {};

    deployments.forEach((deployment) => {
      const date = new Date(deployment.createdAt);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = 0;
      }
      monthlyData[monthKey]++;
    });

    return monthlyData;
  }

  // Get most used platform
  getMostUsedPlatform(deployments) {
    const platformCounts = {};

    deployments.forEach((deployment) => {
      const platform = deployment.deployment?.platform;
      if (platform) {
        platformCounts[platform] = (platformCounts[platform] || 0) + 1;
      }
    });

    return Object.keys(platformCounts).reduce(
      (a, b) => (platformCounts[a] > platformCounts[b] ? a : b),
      null
    );
  }

  // Get deployment status
  async getDeploymentStatus(deploymentId) {
    try {
      const deploymentDoc = await getDoc(
        doc(this.db, "onePushDeployments", deploymentId)
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

export default OnePushDeploymentService;
