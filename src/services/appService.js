/**
 * @fileoverview Main Application Service
 * @author Tyron Mitchell
 * @version 2.0.0
 * @created 2025-01-27
 * @lastModified 2025-01-27
 * @description Central service that coordinates all application functionalities
 * @copyright © 2025 SuggestlyG4Plus. All rights reserved.
 * @license MIT
 */

import { AuthService } from './authService.js';
import { PaymentService } from './paymentService.js';
import { AIService } from './aiService.js';
import { RealtimeService } from './realtimeService.js';
import { AnalyticsService } from './analyticsService.js';
import { EmailService } from './emailService.js';

/**
 * Main Application Service
 * Coordinates all services and provides unified interface
 */
class AppService {
  constructor() {
    this.auth = null;
    this.payment = null;
    this.ai = null;
    this.realtime = null;
    this.analytics = null;
    this.email = null;
    this.isInitialized = false;
    this.initPromise = null;
  }

  /**
   * Initialize all services
   */
  async init(config = {}) {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this._initializeServices(config);
    return this.initPromise;
  }

  async _initializeServices(config) {
    try {
      console.log('🚀 Initializing Suggestly G4 Plus Application...');

      // Initialize Firebase Auth
      this.auth = new AuthService();
      await this.auth.init(config.firebase);

      // Initialize Payment Service
      this.payment = new PaymentService();
      await this.payment.init(config.stripe);

      // Initialize AI Service
      this.ai = new AIService();
      await this.ai.init(config.openai);

      // Initialize Real-time Service
      this.realtime = new RealtimeService();
      await this.realtime.init(config.websocket);

      // Initialize Analytics Service
      this.analytics = new AnalyticsService();
      await this.analytics.init(config.analytics);

      // Initialize Email Service
      this.email = new EmailService();
      await this.email.init(config.email);

      this.isInitialized = true;
      console.log('✅ All services initialized successfully!');

      // Set up service interconnections
      this._setupServiceConnections();

      return {
        success: true,
        services: {
          auth: this.auth,
          payment: this.payment,
          ai: this.ai,
          realtime: this.realtime,
          analytics: this.analytics,
          email: this.email
        }
      };

    } catch (error) {
      console.error('❌ Failed to initialize services:', error);
      throw error;
    }
  }

  /**
   * Set up connections between services
   */
  _setupServiceConnections() {
    // Auth state changes trigger analytics events
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.analytics.trackUserLogin(user.uid);
        this.realtime.connectUser(user.uid);
      } else {
        this.analytics.trackUserLogout();
        this.realtime.disconnectUser();
      }
    });

    // Payment events trigger notifications
    this.payment.on('payment.success', (data) => {
      this.email.sendPaymentConfirmation(data);
      this.analytics.trackPaymentSuccess(data);
      this.realtime.sendNotification(data.userId, 'Payment successful!');
    });

    // AI usage triggers analytics
    this.ai.on('usage.update', (data) => {
      this.analytics.trackAIUsage(data);
    });

    // Real-time events trigger analytics
    this.realtime.on('user.activity', (data) => {
      this.analytics.trackUserActivity(data);
    });
  }

  /**
   * Get service instance
   */
  getService(serviceName) {
    if (!this.isInitialized) {
      throw new Error('AppService not initialized. Call init() first.');
    }

    const services = {
      auth: this.auth,
      payment: this.payment,
      ai: this.ai,
      realtime: this.realtime,
      analytics: this.analytics,
      email: this.email
    };

    return services[serviceName];
  }

  /**
   * Get current user
   */
  getCurrentUser() {
    return this.auth.getCurrentUser();
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  /**
   * Get user subscription status
   */
  async getSubscriptionStatus() {
    const user = this.getCurrentUser();
    if (!user) return null;

    return await this.auth.getSubscriptionStatus(user.uid);
  }

  /**
   * Generate AI content
   */
  async generateContent(prompt, options = {}) {
    const user = this.getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to use AI features');
    }

    const subscription = await this.getSubscriptionStatus();
    if (!subscription || subscription.status !== 'active') {
      throw new Error('Active subscription required for AI features');
    }

    return await this.ai.generateText(prompt, options);
  }

  /**
   * Process payment
   */
  async processPayment(planId, options = {}) {
    const user = this.getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to make payments');
    }

    return await this.payment.createCheckoutSession(planId, {
      customerEmail: user.email,
      ...options
    });
  }

  /**
   * Send notification
   */
  async sendNotification(userId, message, type = 'info') {
    await this.realtime.sendNotification(userId, message, type);
    await this.email.sendNotification(userId, message, type);
  }

  /**
   * Track user event
   */
  trackEvent(eventName, data = {}) {
    this.analytics.trackEvent(eventName, data);
  }

  /**
   * Get app statistics
   */
  async getAppStats() {
    const user = this.getCurrentUser();
    if (!user) return null;

    const [subscription, aiUsage, paymentHistory] = await Promise.all([
      this.getSubscriptionStatus(),
      this.ai.getUsageStats(user.uid),
      this.payment.getPaymentHistory(user.uid)
    ]);

    return {
      user: {
        id: user.uid,
        email: user.email,
        displayName: user.displayName
      },
      subscription,
      aiUsage,
      paymentHistory: paymentHistory.slice(0, 5), // Last 5 payments
      lastLogin: user.metadata?.lastSignInTime
    };
  }

  /**
   * Cleanup and disconnect
   */
  async cleanup() {
    console.log('🧹 Cleaning up application services...');

    const cleanupPromises = [
      this.auth?.cleanup?.(),
      this.payment?.cleanup?.(),
      this.ai?.cleanup?.(),
      this.realtime?.cleanup?.(),
      this.analytics?.cleanup?.(),
      this.email?.cleanup?.()
    ].filter(Boolean);

    await Promise.all(cleanupPromises);
    this.isInitialized = false;
    this.initPromise = null;

    console.log('✅ Application cleanup completed');
  }

  /**
   * Health check
   */
  async healthCheck() {
    if (!this.isInitialized) {
      return { status: 'not_initialized' };
    }

    const checks = {
      auth: this.auth?.isInitialized || false,
      payment: this.payment?.isInitialized || false,
      ai: this.ai?.isInitialized || false,
      realtime: this.realtime?.isConnected || false,
      analytics: this.analytics?.isInitialized || false,
      email: this.email?.isInitialized || false
    };

    const allHealthy = Object.values(checks).every(Boolean);

    return {
      status: allHealthy ? 'healthy' : 'degraded',
      services: checks,
      timestamp: new Date().toISOString()
    };
  }
}

// Create singleton instance
const appService = new AppService();

// Export singleton and class
export { appService as default, AppService };
export default appService;




