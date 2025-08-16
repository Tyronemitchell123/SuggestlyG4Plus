/**
 * @fileoverview Application Service React Hook
 * @author Tyron Mitchell
 * @version 2.0.0
 * @created 2025-01-27
 * @lastModified 2025-01-27
 * @description React hook providing access to all application services
 * @copyright © 2025 SuggestlyG4Plus. All rights reserved.
 * @license MIT
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import appService from "../services/appService.js";

/**
 * React Hook for App Service
 * Provides easy access to all app features
 */
export const useAppService = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [appStats, setAppStats] = useState(null);

  // Initialize app service
  useEffect(() => {
    const initApp = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get environment config
        const config = {
          firebase: {
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId:
              process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_FIREBASE_APP_ID,
          },
          stripe: {
            publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
          },
          openai: {
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
          },
          websocket: {
            url:
              process.env.REACT_APP_WEBSOCKET_URL ||
              "wss://your-websocket-server.com",
          },
          analytics: {
            measurementId: process.env.REACT_APP_GA_MEASUREMENT_ID,
          },
          email: {
            apiKey: process.env.REACT_APP_EMAIL_API_KEY,
            fromEmail: process.env.REACT_APP_FROM_EMAIL,
          },
        };

        await appService.init(config);
        setIsInitialized(true);

        // Set up auth state listener
        const unsubscribe = appService.auth.onAuthStateChanged((user) => {
          setUser(user);
          if (user) {
            loadUserData(user.uid);
          } else {
            setSubscription(null);
            setAppStats(null);
          }
        });

        return unsubscribe;
      } catch (err) {
        console.error("Failed to initialize app service:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initApp();
  }, []);

  // Load user data when user changes
  const loadUserData = useCallback(async (userId) => {
    try {
      const [subStatus, stats] = await Promise.all([
        appService.getSubscriptionStatus(),
        appService.getAppStats(),
      ]);

      setSubscription(subStatus);
      setAppStats(stats);
    } catch (err) {
      console.error("Failed to load user data:", err);
    }
  }, []);

  // Authentication methods
  const auth = useMemo(
    () => ({
      login: async (email, password) => {
        try {
          setError(null);
          return await appService.auth.login(email, password);
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      loginWithGoogle: async () => {
        try {
          setError(null);
          return await appService.auth.loginWithGoogle();
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      register: async (email, password, displayName) => {
        try {
          setError(null);
          return await appService.auth.register(email, password, displayName);
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      logout: async () => {
        try {
          setError(null);
          await appService.auth.logout();
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      resetPassword: async (email) => {
        try {
          setError(null);
          return await appService.auth.resetPassword(email);
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      updateProfile: async (updates) => {
        try {
          setError(null);
          return await appService.auth.updateUserProfile(updates);
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },
    }),
    []
  );

  // AI methods
  const ai = useMemo(
    () => ({
      generateText: async (prompt, options = {}) => {
        try {
          setError(null);
          return await appService.generateContent(prompt, options);
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      generateImage: async (prompt, options = {}) => {
        try {
          setError(null);
          return await appService.ai.generateImage(prompt, options);
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      chat: async (message, options = {}) => {
        try {
          setError(null);
          return await appService.ai.chat(message, options);
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      analyzeContent: async (content, type = "seo") => {
        try {
          setError(null);
          return await appService.ai.analyzeContent(content, type);
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      getConversationHistory: async () => {
        try {
          setError(null);
          return await appService.ai.getConversationHistory();
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      clearHistory: async () => {
        try {
          setError(null);
          return await appService.ai.clearHistory();
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },
    }),
    []
  );

  // Payment methods
  const payment = useMemo(
    () => ({
      getPlans: async () => {
        try {
          setError(null);
          return await appService.payment.getSubscriptionPlans();
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      subscribe: async (planId, options = {}) => {
        try {
          setError(null);
          return await appService.processPayment(planId, options);
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      manageSubscription: async () => {
        try {
          setError(null);
          return await appService.payment.createCustomerPortalSession();
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      getPaymentHistory: async () => {
        try {
          setError(null);
          return await appService.payment.getPaymentHistory();
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      cancelSubscription: async () => {
        try {
          setError(null);
          return await appService.payment.cancelSubscription();
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },
    }),
    []
  );

  // Real-time methods
  const realtime = useMemo(
    () => ({
      sendMessage: async (message, roomId) => {
        try {
          setError(null);
          return await appService.realtime.sendChatMessage(message, roomId);
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      joinChat: async (roomId) => {
        try {
          setError(null);
          return await appService.realtime.joinChat(roomId);
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      getChatMessages: async (roomId) => {
        try {
          setError(null);
          return await appService.realtime.getChatMessages(roomId);
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      getNotifications: async () => {
        try {
          setError(null);
          return await appService.realtime.getUserNotifications();
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      markNotificationRead: async (notificationId) => {
        try {
          setError(null);
          return await appService.realtime.markNotificationAsRead(
            notificationId
          );
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },
    }),
    []
  );

  // Analytics methods
  const analytics = useMemo(
    () => ({
      trackEvent: (eventName, data = {}) => {
        appService.trackEvent(eventName, data);
      },

      trackPageView: (pageName) => {
        appService.analytics.trackPageView(pageName);
      },

      trackConversion: (goalName, value = 0) => {
        appService.analytics.trackConversion(goalName, value);
      },
    }),
    []
  );

  // Email methods
  const email = useMemo(
    () => ({
      sendContactForm: async (formData) => {
        try {
          setError(null);
          return await appService.email.sendContactForm(formData);
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      sendNewsletter: async (email) => {
        try {
          setError(null);
          return await appService.email.sendNewsletter(email);
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },

      unsubscribe: async (email) => {
        try {
          setError(null);
          return await appService.email.unsubscribe(email);
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },
    }),
    []
  );

  // Utility methods
  const utils = useMemo(
    () => ({
      refreshUserData: () => {
        if (user) {
          loadUserData(user.uid);
        }
      },

      clearError: () => {
        setError(null);
      },

      healthCheck: async () => {
        try {
          return await appService.healthCheck();
        } catch (err) {
          setError(err.message);
          throw err;
        }
      },
    }),
    [user, loadUserData]
  );

  return {
    // State
    isInitialized,
    isLoading,
    error,
    user,
    subscription,
    appStats,

    // Services
    auth,
    ai,
    payment,
    realtime,
    analytics,
    email,
    utils,

    // Direct service access
    appService: isInitialized ? appService : null,
  };
};

export default useAppService;
