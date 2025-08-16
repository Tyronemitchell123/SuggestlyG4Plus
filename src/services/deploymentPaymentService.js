/**
 * @fileoverview Deployment Payment Processing Service
 * @author Tyron Mitchell
 * @version 2.0.0
 * @created 2025-01-27
 * @lastModified 2025-01-27
 * @description Manages deployment-specific payment plans and Stripe integration
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
import { loadStripe } from "@stripe/stripe-js";

// Deployment Payment Plans and Processing Service
class DeploymentPaymentService {
  constructor() {
    this.db = getFirestore();
    this.stripe = null;

    // Deployment-specific subscription plans
    this.deploymentPlans = {
      free: {
        name: "Free Deployment",
        price: 0,
        features: [
          "1 deployment per month",
          "Basic project analysis",
          "Vercel/Netlify deployment",
          "Community support",
          "Standard build time",
          "Basic analytics",
        ],
        limitations: [
          "No custom domains",
          "No priority support",
          "No advanced features",
          "Limited file size (50MB)",
        ],
        maxProjects: 1,
        maxDeployments: 1,
        priority: false,
        customDomain: false,
        advancedAnalytics: false,
        autoScaling: false,
      },

      starter: {
        name: "Starter Deployment",
        price: 9.99,
        features: [
          "10 deployments per month",
          "Advanced project analysis",
          "All deployment platforms",
          "Priority support",
          "Custom domains",
          "Basic analytics",
          "Auto-deployment",
          "Build optimization",
        ],
        limitations: [
          "No advanced scaling",
          "Limited custom domains (1)",
          "Standard support hours",
        ],
        maxProjects: 5,
        maxDeployments: 10,
        priority: true,
        customDomain: true,
        advancedAnalytics: false,
        autoScaling: false,
      },

      pro: {
        name: "Pro Deployment",
        price: 29.99,
        features: [
          "Unlimited deployments",
          "Advanced project analysis",
          "All deployment platforms",
          "Priority support 24/7",
          "Unlimited custom domains",
          "Advanced analytics",
          "Auto-deployment",
          "Build optimization",
          "Performance monitoring",
          "Auto-scaling",
          "Team collaboration",
        ],
        limitations: ["No enterprise features", "Limited team members (5)"],
        maxProjects: 25,
        maxDeployments: -1, // Unlimited
        priority: true,
        customDomain: true,
        advancedAnalytics: true,
        autoScaling: true,
      },

      enterprise: {
        name: "Enterprise Deployment",
        price: 99.99,
        features: [
          "Unlimited everything",
          "Advanced project analysis",
          "All deployment platforms",
          "Dedicated support",
          "Unlimited custom domains",
          "Advanced analytics",
          "Auto-deployment",
          "Build optimization",
          "Performance monitoring",
          "Auto-scaling",
          "Team collaboration",
          "White-label deployment",
          "Custom integrations",
          "SLA guarantees",
          "Advanced security",
        ],
        limitations: [],
        maxProjects: -1, // Unlimited
        maxDeployments: -1, // Unlimited
        priority: true,
        customDomain: true,
        advancedAnalytics: true,
        autoScaling: true,
      },
    };

    // One-time deployment packages
    this.oneTimePackages = {
      basic: {
        name: "Basic One-Push",
        price: 4.99,
        features: [
          "Single deployment",
          "Project analysis",
          "Best platform selection",
          "Basic support",
          "Standard build time",
        ],
        includes: [
          "Automatic platform detection",
          "Basic optimization",
          "Deployment URL",
          "Email notification",
        ],
      },

      premium: {
        name: "Premium One-Push",
        price: 14.99,
        features: [
          "Single deployment",
          "Advanced project analysis",
          "Best platform selection",
          "Priority support",
          "Custom domain setup",
          "Performance optimization",
          "SEO optimization",
        ],
        includes: [
          "Automatic platform detection",
          "Advanced optimization",
          "Custom domain configuration",
          "Performance monitoring",
          "SEO analysis",
          "Priority support",
          "Detailed deployment report",
        ],
      },

      enterprise: {
        name: "Enterprise One-Push",
        price: 49.99,
        features: [
          "Single deployment",
          "Advanced project analysis",
          "Best platform selection",
          "Dedicated support",
          "Custom domain setup",
          "Performance optimization",
          "SEO optimization",
          "Security audit",
          "Load testing",
          "Custom integrations",
        ],
        includes: [
          "Automatic platform detection",
          "Maximum optimization",
          "Custom domain configuration",
          "Performance monitoring",
          "SEO analysis",
          "Security audit",
          "Load testing",
          "Custom integrations",
          "Dedicated support",
          "Comprehensive deployment report",
        ],
      },
    };
  }

  // Initialize Stripe
  async initStripe() {
    if (!this.stripe) {
      this.stripe = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
      );
    }
    return this.stripe;
  }

  // Get deployment plan details
  getDeploymentPlan(planId) {
    return this.deploymentPlans[planId] || null;
  }

  // Get one-time package details
  getOneTimePackage(packageId) {
    return this.oneTimePackages[packageId] || null;
  }

  // Get all deployment plans
  getAllDeploymentPlans() {
    return Object.keys(this.deploymentPlans).map((key) => ({
      id: key,
      ...this.deploymentPlans[key],
    }));
  }

  // Get all one-time packages
  getAllOneTimePackages() {
    return Object.keys(this.oneTimePackages).map((key) => ({
      id: key,
      ...this.oneTimePackages[key],
    }));
  }

  // Check user's deployment subscription
  async getUserDeploymentSubscription(userId) {
    try {
      const userDoc = await getDoc(doc(this.db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          plan: userData.deploymentPlan || "free",
          planDetails: this.getDeploymentPlan(
            userData.deploymentPlan || "free"
          ),
          deploymentsUsed: userData.deploymentsUsed || 0,
          deploymentsRemaining: this.getDeploymentsRemaining(
            userData.deploymentPlan || "free",
            userData.deploymentsUsed || 0
          ),
          nextBillingDate: userData.nextBillingDate,
          status: userData.deploymentStatus || "active",
        };
      }
      return null;
    } catch (error) {
      console.error("Error getting user deployment subscription:", error);
      return null;
    }
  }

  // Get remaining deployments for user
  getDeploymentsRemaining(planId, used) {
    const plan = this.getDeploymentPlan(planId);
    if (!plan) return 0;

    if (plan.maxDeployments === -1) return -1; // Unlimited
    return Math.max(0, plan.maxDeployments - used);
  }

  // Subscribe to deployment plan
  async subscribeToDeploymentPlan(userId, planId, paymentMethodId = null) {
    try {
      const plan = this.getDeploymentPlan(planId);
      if (!plan) {
        throw new Error("Invalid deployment plan");
      }

      // If free plan, just update user record
      if (planId === "free") {
        await updateDoc(doc(this.db, "users", userId), {
          deploymentPlan: planId,
          deploymentsUsed: 0,
          deploymentStatus: "active",
          updatedAt: new Date().toISOString(),
        });

        return {
          success: true,
          plan: planId,
          message: "Successfully subscribed to free deployment plan",
        };
      }

      // For paid plans, process payment
      const stripe = await this.initStripe();
      if (!stripe) {
        throw new Error("Stripe not initialized");
      }

      // Create subscription
      const subscriptionResult = await this.createDeploymentSubscription(
        userId,
        planId,
        paymentMethodId
      );

      if (subscriptionResult.success) {
        // Update user record
        await updateDoc(doc(this.db, "users", userId), {
          deploymentPlan: planId,
          deploymentSubscriptionId: subscriptionResult.subscriptionId,
          deploymentsUsed: 0,
          deploymentStatus: "active",
          nextBillingDate: subscriptionResult.nextBillingDate,
          updatedAt: new Date().toISOString(),
        });
      }

      return subscriptionResult;
    } catch (error) {
      console.error("Error subscribing to deployment plan:", error);
      throw error;
    }
  }

  // Create deployment subscription in Stripe
  async createDeploymentSubscription(userId, planId, paymentMethodId) {
    try {
      // This would integrate with your backend API
      const response = await fetch("/api/create-deployment-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          planId,
          paymentMethodId,
        }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error creating deployment subscription:", error);
      throw error;
    }
  }

  // Purchase one-time deployment package
  async purchaseOneTimeDeployment(
    userId,
    packageId,
    projectFiles,
    projectConfig = {}
  ) {
    try {
      const packageDetails = this.getOneTimePackage(packageId);
      if (!packageDetails) {
        throw new Error("Invalid deployment package");
      }

      // Process payment
      const paymentResult = await this.processOneTimePayment(
        userId,
        packageId,
        packageDetails.price
      );

      if (paymentResult.success) {
        // Create deployment record
        const deploymentRecord = {
          userId,
          packageId,
          packageDetails,
          projectFiles: projectFiles.length,
          projectConfig,
          paymentId: paymentResult.paymentId,
          status: "pending",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const deploymentDoc = await addDoc(
          collection(this.db, "deployments"),
          deploymentRecord
        );

        return {
          success: true,
          deploymentId: deploymentDoc.id,
          paymentId: paymentResult.paymentId,
          message: "One-time deployment package purchased successfully",
        };
      }

      return paymentResult;
    } catch (error) {
      console.error("Error purchasing one-time deployment:", error);
      throw error;
    }
  }

  // Process one-time payment
  async processOneTimePayment(userId, packageId, amount) {
    try {
      const stripe = await this.initStripe();
      if (!stripe) {
        throw new Error("Stripe not initialized");
      }

      // Create payment intent
      const response = await fetch("/api/create-deployment-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          packageId,
          amount,
        }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error processing one-time payment:", error);
      throw error;
    }
  }

  // Check if user can deploy (based on subscription)
  async canUserDeploy(userId) {
    try {
      const subscription = await this.getUserDeploymentSubscription(userId);
      if (!subscription) return false;

      // Free plan check
      if (subscription.plan === "free") {
        return subscription.deploymentsRemaining > 0;
      }

      // Paid plan check
      if (subscription.status === "active") {
        return (
          subscription.deploymentsRemaining === -1 ||
          subscription.deploymentsRemaining > 0
        );
      }

      return false;
    } catch (error) {
      console.error("Error checking deployment eligibility:", error);
      return false;
    }
  }

  // Increment deployment usage
  async incrementDeploymentUsage(userId) {
    try {
      const userDoc = await getDoc(doc(this.db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const currentUsage = userData.deploymentsUsed || 0;

        await updateDoc(doc(this.db, "users", userId), {
          deploymentsUsed: currentUsage + 1,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error incrementing deployment usage:", error);
    }
  }

  // Cancel deployment subscription
  async cancelDeploymentSubscription(userId) {
    try {
      const userDoc = await getDoc(doc(this.db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.deploymentSubscriptionId) {
          // Cancel subscription in Stripe
          await this.cancelStripeSubscription(
            userData.deploymentSubscriptionId
          );
        }

        // Update user record
        await updateDoc(doc(this.db, "users", userId), {
          deploymentPlan: "free",
          deploymentStatus: "cancelled",
          updatedAt: new Date().toISOString(),
        });

        return {
          success: true,
          message: "Deployment subscription cancelled successfully",
        };
      }
    } catch (error) {
      console.error("Error cancelling deployment subscription:", error);
      throw error;
    }
  }

  // Cancel Stripe subscription
  async cancelStripeSubscription(subscriptionId) {
    try {
      const response = await fetch("/api/cancel-deployment-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId,
        }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error cancelling Stripe subscription:", error);
      throw error;
    }
  }

  // Get deployment usage analytics
  async getDeploymentAnalytics(userId) {
    try {
      const q = query(
        collection(this.db, "deployments"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const deployments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const analytics = {
        totalDeployments: deployments.length,
        successfulDeployments: deployments.filter((d) => d.status === "success")
          .length,
        failedDeployments: deployments.filter((d) => d.status === "failed")
          .length,
        platformsUsed: [...new Set(deployments.map((d) => d.platform))],
        averageDeploymentTime: this.calculateAverageDeploymentTime(deployments),
        monthlyDeployments: this.groupDeploymentsByMonth(deployments),
        mostUsedPlatform: this.getMostUsedPlatform(deployments),
      };

      return analytics;
    } catch (error) {
      console.error("Error getting deployment analytics:", error);
      return null;
    }
  }

  // Calculate average deployment time
  calculateAverageDeploymentTime(deployments) {
    const successfulDeployments = deployments.filter(
      (d) => d.deploymentTime && d.status === "success"
    );
    if (successfulDeployments.length === 0) return 0;

    const totalTime = successfulDeployments.reduce(
      (sum, d) => sum + d.deploymentTime,
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
      if (deployment.platform) {
        platformCounts[deployment.platform] =
          (platformCounts[deployment.platform] || 0) + 1;
      }
    });

    return Object.keys(platformCounts).reduce(
      (a, b) => (platformCounts[a] > platformCounts[b] ? a : b),
      null
    );
  }

  // Get deployment pricing recommendations
  getDeploymentPricingRecommendations(projectAnalysis) {
    const recommendations = [];

    // Based on project complexity
    if (projectAnalysis.fileSize > 100 * 1024 * 1024) {
      // > 100MB
      recommendations.push({
        type: "size",
        message:
          "Large project detected. Consider Pro plan for better performance.",
        recommendedPlan: "pro",
      });
    }

    if (
      projectAnalysis.specialFeatures.api ||
      projectAnalysis.specialFeatures.database
    ) {
      recommendations.push({
        type: "complexity",
        message:
          "Full-stack application detected. Pro plan recommended for optimal deployment.",
        recommendedPlan: "pro",
      });
    }

    if (projectAnalysis.buildRequirements.buildStep) {
      recommendations.push({
        type: "build",
        message:
          "Complex build process detected. Consider Pro plan for faster builds.",
        recommendedPlan: "pro",
      });
    }

    return recommendations;
  }
}

export default DeploymentPaymentService;
