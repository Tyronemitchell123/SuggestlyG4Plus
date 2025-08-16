/**
 * @fileoverview Payment Processing Service
 * @author Tyron Mitchell
 * @version 2.0.0
 * @created 2025-01-27
 * @lastModified 2025-01-27
 * @description Comprehensive Stripe payment processing and subscription management
 * @copyright © 2025 SuggestlyG4Plus. All rights reserved.
 * @license MIT
 */

import { loadStripe } from "@stripe/stripe-js";

// Stripe configuration
const STRIPE_PUBLISHABLE_KEY =
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "pk_test_your_stripe_key";
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// Elite Subscription Tiers Configuration
const ELITE_SUBSCRIPTION_TIERS = {
  starter: {
    name: "Starter Elite",
    price: 49,
    priceId: "price_starter_elite",
    features: [
      "10 File Uploads",
      "2 Deployment Services",
      "Advanced Analytics",
      "Email Support",
      "100 Deployment Credits",
    ],
    credits: 100,
    revenueShare: 0,
  },
  professional: {
    name: "Professional Elite",
    price: 199,
    priceId: "price_professional_elite",
    features: [
      "100 File Uploads",
      "All 6 Deployment Services",
      "Premium Analytics",
      "Priority Support",
      "AI Optimization",
      "500 Deployment Credits",
    ],
    credits: 500,
    revenueShare: 10,
  },
  enterprise: {
    name: "Enterprise Elite",
    price: 599,
    priceId: "price_enterprise_elite",
    features: [
      "Unlimited Uploads",
      "All Deployment Services + Priority",
      "Ultimate Analytics Dashboard",
      "24/7 Support",
      "Custom Development",
      "1000 Deployment Credits",
    ],
    credits: 1000,
    revenueShare: 25,
  },
  ultimate: {
    name: "Ultimate Elite",
    price: 1999,
    priceId: "price_ultimate_elite",
    features: [
      "Unlimited Everything",
      "All Services + Elite Priority",
      "Ultimate Analytics + AI Insights",
      "Personal Elite Manager",
      "50% Revenue Sharing",
      "White-label Platform",
      "Unlimited Deployment Credits",
    ],
    credits: "Unlimited",
    revenueShare: 50,
  },
};

// Elite Deployment Services Pricing
const ELITE_DEPLOYMENT_SERVICES = {
  vercel: { name: "Vercel Elite", price: 50, credits: 1 },
  netlify: { name: "Netlify Elite", price: 49, credits: 1 },
  firebase: { name: "Firebase Elite", price: 75, credits: 2 },
  railway: { name: "Railway Elite", price: 60, credits: 1 },
  aws: { name: "AWS Elite", price: 150, credits: 2 },
  digitalocean: { name: "DigitalOcean Elite", price: 40, credits: 1 },
};

class ElitePaymentService {
  constructor() {
    this.stripe = null;
    this.currentUser = null;
    this.userTier = "starter";
    this.deploymentCredits = ELITE_SUBSCRIPTION_TIERS.starter.credits;
    this.revenueShare = ELITE_SUBSCRIPTION_TIERS.starter.revenueShare;
    this.paymentHistory = [];
    this.revenueHistory = [];
  }

  // Initialize Elite payment service
  async init() {
    try {
      this.stripe = await stripePromise;
      if (!this.stripe) {
        throw new Error("Stripe failed to load");
      }
      return { success: true, message: "Elite Payment Service initialized" };
    } catch (error) {
      console.error("Elite Payment Service init error:", error);
      return { success: false, error: error.message };
    }
  }

  // Set current user and tier
  setUser(user, tier = "starter") {
    this.currentUser = user;
    this.userTier = tier;
    this.deploymentCredits = ELITE_SUBSCRIPTION_TIERS[tier].credits;
    this.revenueShare = ELITE_SUBSCRIPTION_TIERS[tier].revenueShare;
  }

  // Get Elite subscription tiers
  getEliteTiers() {
    return ELITE_SUBSCRIPTION_TIERS;
  }

  // Get Elite deployment services
  getEliteDeploymentServices() {
    return ELITE_DEPLOYMENT_SERVICES;
  }

  // Subscribe to Elite tier
  async subscribeToEliteTier(tier, customerId = null) {
    try {
      const tierConfig = ELITE_SUBSCRIPTION_TIERS[tier];
      if (!tierConfig) {
        throw new Error("Invalid tier selected");
      }

      // Create or retrieve customer
      const customer = customerId || (await this.createCustomer());

      // Create subscription
      const subscription = await this.createSubscription(
        customer.id,
        tierConfig.priceId
      );

      // Update user tier
      this.userTier = tier;
      this.deploymentCredits = tierConfig.credits;
      this.revenueShare = tierConfig.revenueShare;

      // Record payment
      this.recordPayment({
        type: "subscription",
        tier: tier,
        amount: tierConfig.price,
        customerId: customer.id,
        subscriptionId: subscription.id,
        timestamp: new Date(),
      });

      return {
        success: true,
        subscription: subscription,
        tier: tier,
        credits: this.deploymentCredits,
        revenueShare: this.revenueShare,
        features: tierConfig.features,
      };
    } catch (error) {
      console.error("Elite subscription error:", error);
      return { success: false, error: error.message };
    }
  }

  // Create customer
  async createCustomer() {
    try {
      const response = await fetch("/api/create-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.currentUser?.email || "user@example.com",
          name: this.currentUser?.name || "Elite User",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create customer");
      }

      const customer = await response.json();
      return customer;
    } catch (error) {
      console.error("Create customer error:", error);
      throw error;
    }
  }

  // Create subscription
  async createSubscription(customerId, priceId) {
    try {
      const response = await fetch("/api/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: customerId,
          priceId: priceId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create subscription");
      }

      const subscription = await response.json();
      return subscription;
    } catch (error) {
      console.error("Create subscription error:", error);
      throw error;
    }
  }

  // Process Elite deployment payment
  async processEliteDeployment(deploymentService, additionalCredits = 0) {
    try {
      const service = ELITE_DEPLOYMENT_SERVICES[deploymentService];
      if (!service) {
        throw new Error("Invalid deployment service");
      }

      // Check if user has enough credits
      if (
        this.deploymentCredits !== "Unlimited" &&
        this.deploymentCredits < service.credits
      ) {
        // Purchase additional credits
        const creditPurchase = await this.purchaseAdditionalCredits(
          additionalCredits
        );
        if (!creditPurchase.success) {
          throw new Error("Insufficient credits and credit purchase failed");
        }
      }

      // Deduct credits
      if (this.deploymentCredits !== "Unlimited") {
        this.deploymentCredits -= service.credits;
      }

      // Process payment
      const payment = await this.processPayment({
        amount: service.price,
        description: `${service.name} Deployment`,
        metadata: {
          service: deploymentService,
          credits: service.credits,
          tier: this.userTier,
        },
      });

      return {
        success: true,
        payment: payment,
        creditsRemaining: this.deploymentCredits,
        service: service.name,
      };
    } catch (error) {
      console.error("Elite deployment payment error:", error);
      return { success: false, error: error.message };
    }
  }

  // Purchase additional deployment credits
  async purchaseAdditionalCredits(credits) {
    try {
      const creditPrice = this.getCreditPrice();
      const totalAmount = credits * creditPrice;

      const payment = await this.processPayment({
        amount: totalAmount,
        description: `${credits} Additional Deployment Credits`,
        metadata: {
          credits: credits,
          tier: this.userTier,
        },
      });

      // Add credits
      if (this.deploymentCredits !== "Unlimited") {
        this.deploymentCredits += credits;
      }

      return {
        success: true,
        payment: payment,
        credits: credits,
        totalAmount: totalAmount,
        creditsRemaining: this.deploymentCredits,
      };
    } catch (error) {
      console.error("Credit purchase error:", error);
      return { success: false, error: error.message };
    }
  }

  // Get credit price based on tier
  getCreditPrice() {
    const prices = {
      starter: 5,
      professional: 3,
      enterprise: 2,
      ultimate: 0, // Unlimited credits
    };
    return prices[this.userTier] || 5;
  }

  // Process payment with Stripe
  async processPayment(paymentData) {
    try {
      const { amount, description, metadata } = paymentData;

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
          description: description,
          metadata: metadata,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret } = await response.json();

      // Confirm payment with Stripe
      const { error, paymentIntent } = await this.stripe.confirmCardPayment(
        clientSecret
      );

      if (error) {
        throw new Error(error.message);
      }

      // Record payment
      this.recordPayment({
        type: "deployment",
        amount: amount,
        description: description,
        paymentIntentId: paymentIntent.id,
        metadata: metadata,
        timestamp: new Date(),
      });

      return paymentIntent;
    } catch (error) {
      console.error("Payment processing error:", error);
      throw error;
    }
  }

  // Calculate and distribute revenue sharing
  async calculateRevenueSharing(transactionAmount) {
    try {
      if (this.revenueShare <= 0) {
        return { success: true, revenueShare: 0 };
      }

      const revenueShareAmount = transactionAmount * (this.revenueShare / 100);

      // Record revenue sharing
      this.recordRevenue({
        type: "revenue_sharing",
        amount: revenueShareAmount,
        percentage: this.revenueShare,
        tier: this.userTier,
        timestamp: new Date(),
      });

      // Process revenue sharing payment
      const payment = await this.processRevenueSharingPayment(
        revenueShareAmount
      );

      return {
        success: true,
        revenueShare: revenueShareAmount,
        percentage: this.revenueShare,
        payment: payment,
      };
    } catch (error) {
      console.error("Revenue sharing error:", error);
      return { success: false, error: error.message };
    }
  }

  // Process revenue sharing payment
  async processRevenueSharingPayment(amount) {
    try {
      // Simulate revenue sharing payment
      const payment = {
        id: `rev_${Date.now()}`,
        amount: amount,
        status: "succeeded",
        type: "revenue_sharing",
        timestamp: new Date(),
      };

      return payment;
    } catch (error) {
      console.error("Revenue sharing payment error:", error);
      throw error;
    }
  }

  // Record payment
  recordPayment(payment) {
    this.paymentHistory.push(payment);

    // Keep only last 100 payments
    if (this.paymentHistory.length > 100) {
      this.paymentHistory = this.paymentHistory.slice(-100);
    }
  }

  // Record revenue
  recordRevenue(revenue) {
    this.revenueHistory.push(revenue);

    // Keep only last 100 revenue records
    if (this.revenueHistory.length > 100) {
      this.revenueHistory = this.revenueHistory.slice(-100);
    }
  }

  // Get payment history
  getPaymentHistory() {
    return this.paymentHistory;
  }

  // Get revenue history
  getRevenueHistory() {
    return this.revenueHistory;
  }

  // Get Elite analytics
  getEliteAnalytics() {
    const totalPayments = this.paymentHistory.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
    const totalRevenue = this.revenueHistory.reduce(
      (sum, revenue) => sum + revenue.amount,
      0
    );
    const subscriptionPayments = this.paymentHistory.filter(
      (p) => p.type === "subscription"
    );
    const deploymentPayments = this.paymentHistory.filter(
      (p) => p.type === "deployment"
    );

    return {
      tier: this.userTier,
      creditsRemaining: this.deploymentCredits,
      revenueShare: this.revenueShare,
      totalPayments: totalPayments,
      totalRevenue: totalRevenue,
      subscriptionCount: subscriptionPayments.length,
      deploymentCount: deploymentPayments.length,
      averagePayment: totalPayments / this.paymentHistory.length || 0,
    };
  }

  // Upgrade tier
  upgradeTier(newTier) {
    const tierConfig = ELITE_SUBSCRIPTION_TIERS[newTier];
    if (!tierConfig) {
      return { success: false, error: "Invalid tier" };
    }

    this.userTier = newTier;
    this.deploymentCredits = tierConfig.credits;
    this.revenueShare = tierConfig.revenueShare;

    return {
      success: true,
      tier: newTier,
      credits: this.deploymentCredits,
      revenueShare: this.revenueShare,
      features: tierConfig.features,
    };
  }

  // Cancel subscription
  async cancelSubscription(subscriptionId) {
    try {
      const response = await fetch("/api/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId: subscriptionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to cancel subscription");
      }

      // Reset to starter tier
      this.userTier = "starter";
      this.deploymentCredits = ELITE_SUBSCRIPTION_TIERS.starter.credits;
      this.revenueShare = ELITE_SUBSCRIPTION_TIERS.starter.revenueShare;

      return { success: true, message: "Subscription cancelled successfully" };
    } catch (error) {
      console.error("Cancel subscription error:", error);
      return { success: false, error: error.message };
    }
  }
}

// Export Elite Payment Service
export default ElitePaymentService;
