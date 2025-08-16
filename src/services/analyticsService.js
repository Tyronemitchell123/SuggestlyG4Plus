/**
 * @fileoverview Analytics and Monitoring Service
 * @author Tyron Mitchell
 * @version 2.0.0
 * @created 2025-01-27
 * @lastModified 2025-01-27
 * @description Google Analytics 4 integration and comprehensive tracking system
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
  increment,
} from "firebase/firestore";

class AnalyticsService {
  constructor() {
    this.db = getFirestore();
    this.ga = null;
    this.events = [];
    this.userProperties = {};
    this.sessionId = this.generateSessionId();
    this.isInitialized = false;
  }

  // Initialize analytics service
  async init() {
    try {
      // Initialize Google Analytics
      await this.initGoogleAnalytics();

      // Initialize Firebase Analytics
      await this.initFirebaseAnalytics();

      // Track page view
      this.trackPageView(window.location.pathname);

      // Track session start
      this.trackEvent("session_start", {
        session_id: this.sessionId,
        timestamp: Date.now(),
      });

      this.isInitialized = true;
      return { success: true };
    } catch (error) {
      console.error("Analytics initialization error:", error);
      return { success: false, error: error.message };
    }
  }

  // Initialize Google Analytics
  async initGoogleAnalytics() {
    try {
      const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;

      if (!GA_TRACKING_ID) {
        console.warn("Google Analytics tracking ID not configured");
        return;
      }

      // Load Google Analytics script
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", GA_TRACKING_ID);

      this.ga = gtag;
      console.log("Google Analytics initialized");
    } catch (error) {
      console.error("Google Analytics initialization error:", error);
    }
  }

  // Initialize Firebase Analytics
  async initFirebaseAnalytics() {
    try {
      // Firebase Analytics is automatically initialized with Firebase
      console.log("Firebase Analytics initialized");
    } catch (error) {
      console.error("Firebase Analytics initialization error:", error);
    }
  }

  // Track page view
  trackPageView(page, title = null) {
    try {
      const pageData = {
        page,
        title: title || document.title,
        timestamp: Date.now(),
        sessionId: this.sessionId,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      };

      // Track with Google Analytics
      if (this.ga) {
        this.ga("config", process.env.REACT_APP_GA_TRACKING_ID, {
          page_path: page,
          page_title: pageData.title,
        });
      }

      // Save to database
      this.savePageView(pageData);

      // Add to events array
      this.events.push({
        type: "page_view",
        data: pageData,
        timestamp: Date.now(),
      });

      return { success: true };
    } catch (error) {
      console.error("Track page view error:", error);
      return { success: false, error: error.message };
    }
  }

  // Track custom event
  trackEvent(eventName, eventData = {}) {
    try {
      const event = {
        name: eventName,
        data: {
          ...eventData,
          timestamp: Date.now(),
          sessionId: this.sessionId,
          page: window.location.pathname,
        },
      };

      // Track with Google Analytics
      if (this.ga) {
        this.ga("event", eventName, eventData);
      }

      // Save to database
      this.saveEvent(event);

      // Add to events array
      this.events.push({
        type: "custom_event",
        data: event,
        timestamp: Date.now(),
      });

      return { success: true };
    } catch (error) {
      console.error("Track event error:", error);
      return { success: false, error: error.message };
    }
  }

  // Track user properties
  setUserProperties(properties) {
    try {
      this.userProperties = { ...this.userProperties, ...properties };

      // Track with Google Analytics
      if (this.ga) {
        this.ga("config", process.env.REACT_APP_GA_TRACKING_ID, {
          custom_map: properties,
        });
      }

      // Save to database
      this.saveUserProperties(properties);

      return { success: true };
    } catch (error) {
      console.error("Set user properties error:", error);
      return { success: false, error: error.message };
    }
  }

  // Track conversion
  trackConversion(conversionData) {
    try {
      const conversion = {
        ...conversionData,
        timestamp: Date.now(),
        sessionId: this.sessionId,
        page: window.location.pathname,
      };

      // Track with Google Analytics
      if (this.ga) {
        this.ga("event", "conversion", conversion);
      }

      // Save to database
      this.saveConversion(conversion);

      return { success: true };
    } catch (error) {
      console.error("Track conversion error:", error);
      return { success: false, error: error.message };
    }
  }

  // Track performance metrics
  trackPerformance(metrics) {
    try {
      const performanceData = {
        ...metrics,
        timestamp: Date.now(),
        sessionId: this.sessionId,
        page: window.location.pathname,
      };

      // Track with Google Analytics
      if (this.ga) {
        this.ga("event", "performance", performanceData);
      }

      // Save to database
      this.savePerformance(performanceData);

      return { success: true };
    } catch (error) {
      console.error("Track performance error:", error);
      return { success: false, error: error.message };
    }
  }

  // Track error
  trackError(error, context = {}) {
    try {
      const errorData = {
        message: error.message,
        stack: error.stack,
        context,
        timestamp: Date.now(),
        sessionId: this.sessionId,
        page: window.location.pathname,
      };

      // Track with Google Analytics
      if (this.ga) {
        this.ga("event", "exception", {
          description: error.message,
          fatal: false,
        });
      }

      // Save to database
      this.saveError(errorData);

      return { success: true };
    } catch (err) {
      console.error("Track error error:", err);
      return { success: false, error: err.message };
    }
  }

  // A/B Testing
  async createABTest(testData) {
    try {
      const test = {
        ...testData,
        status: "active",
        createdAt: new Date(),
        participants: 0,
        conversions: 0,
      };

      const testRef = await addDoc(collection(this.db, "ab_tests"), test);
      return { success: true, testId: testRef.id };
    } catch (error) {
      console.error("Create A/B test error:", error);
      return { success: false, error: error.message };
    }
  }

  // Assign user to A/B test variant
  async assignABTestVariant(testId, userId) {
    try {
      const testDoc = await getDoc(doc(this.db, "ab_tests", testId));
      if (!testDoc.exists()) {
        return { success: false, error: "Test not found" };
      }

      const test = testDoc.data();
      const variants = test.variants || ["A", "B"];
      const variant = variants[Math.floor(Math.random() * variants.length)];

      // Save assignment
      await setDoc(doc(this.db, "ab_test_assignments", `${userId}_${testId}`), {
        userId,
        testId,
        variant,
        assignedAt: new Date(),
      });

      // Increment participant count
      await updateDoc(doc(this.db, "ab_tests", testId), {
        participants: increment(1),
      });

      return { success: true, variant };
    } catch (error) {
      console.error("Assign A/B test variant error:", error);
      return { success: false, error: error.message };
    }
  }

  // Track A/B test conversion
  async trackABTestConversion(testId, userId, conversionData = {}) {
    try {
      const assignmentDoc = await getDoc(
        doc(this.db, "ab_test_assignments", `${userId}_${testId}`)
      );
      if (!assignmentDoc.exists()) {
        return { success: false, error: "No assignment found" };
      }

      const assignment = assignmentDoc.data();
      const conversion = {
        testId,
        userId,
        variant: assignment.variant,
        ...conversionData,
        timestamp: Date.now(),
      };

      // Save conversion
      await addDoc(collection(this.db, "ab_test_conversions"), conversion);

      // Increment conversion count
      await updateDoc(doc(this.db, "ab_tests", testId), {
        conversions: increment(1),
      });

      return { success: true };
    } catch (error) {
      console.error("Track A/B test conversion error:", error);
      return { success: false, error: error.message };
    }
  }

  // Get A/B test results
  async getABTestResults(testId) {
    try {
      const testDoc = await getDoc(doc(this.db, "ab_tests", testId));
      if (!testDoc.exists()) {
        return { success: false, error: "Test not found" };
      }

      const test = testDoc.data();

      // Get conversions by variant
      const conversionsQuery = query(
        collection(this.db, "ab_test_conversions"),
        where("testId", "==", testId)
      );

      const conversionsSnapshot = await getDocs(conversionsQuery);
      const conversions = {};

      conversionsSnapshot.forEach((doc) => {
        const conversion = doc.data();
        if (!conversions[conversion.variant]) {
          conversions[conversion.variant] = 0;
        }
        conversions[conversion.variant]++;
      });

      // Calculate conversion rates
      const results = {};
      Object.keys(conversions).forEach((variant) => {
        const variantParticipants = test.participants / test.variants.length; // Simplified
        results[variant] = {
          participants: variantParticipants,
          conversions: conversions[variant],
          conversionRate: (conversions[variant] / variantParticipants) * 100,
        };
      });

      return { success: true, results };
    } catch (error) {
      console.error("Get A/B test results error:", error);
      return { success: false, error: error.message };
    }
  }

  // Save page view to database
  async savePageView(pageData) {
    try {
      await addDoc(collection(this.db, "page_views"), {
        ...pageData,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Save page view error:", error);
    }
  }

  // Save event to database
  async saveEvent(event) {
    try {
      await addDoc(collection(this.db, "events"), {
        ...event,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Save event error:", error);
    }
  }

  // Save user properties to database
  async saveUserProperties(properties) {
    try {
      await addDoc(collection(this.db, "user_properties"), {
        properties,
        sessionId: this.sessionId,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Save user properties error:", error);
    }
  }

  // Save conversion to database
  async saveConversion(conversion) {
    try {
      await addDoc(collection(this.db, "conversions"), {
        ...conversion,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Save conversion error:", error);
    }
  }

  // Save performance data to database
  async savePerformance(performanceData) {
    try {
      await addDoc(collection(this.db, "performance"), {
        ...performanceData,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Save performance error:", error);
    }
  }

  // Save error to database
  async saveError(errorData) {
    try {
      await addDoc(collection(this.db, "errors"), {
        ...errorData,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Save error error:", error);
    }
  }

  // Get analytics data
  async getAnalyticsData(period = "7d", userId = null) {
    try {
      const startDate = new Date();
      if (period === "1d") {
        startDate.setDate(startDate.getDate() - 1);
      } else if (period === "7d") {
        startDate.setDate(startDate.getDate() - 7);
      } else if (period === "30d") {
        startDate.setDate(startDate.getDate() - 30);
      } else if (period === "90d") {
        startDate.setDate(startDate.getDate() - 90);
      }

      const data = {};

      // Get page views
      const pageViewsQuery = query(
        collection(this.db, "page_views"),
        where("timestamp", ">=", startDate.getTime())
      );
      const pageViewsSnapshot = await getDocs(pageViewsQuery);
      data.pageViews = pageViewsSnapshot.size;

      // Get events
      const eventsQuery = query(
        collection(this.db, "events"),
        where("timestamp", ">=", startDate.getTime())
      );
      const eventsSnapshot = await getDocs(eventsQuery);
      data.events = eventsSnapshot.size;

      // Get conversions
      const conversionsQuery = query(
        collection(this.db, "conversions"),
        where("timestamp", ">=", startDate.getTime())
      );
      const conversionsSnapshot = await getDocs(conversionsQuery);
      data.conversions = conversionsSnapshot.size;

      // Get unique users
      const uniqueUsers = new Set();
      pageViewsSnapshot.forEach((doc) => {
        uniqueUsers.add(doc.data().sessionId);
      });
      data.uniqueUsers = uniqueUsers.size;

      // Calculate conversion rate
      data.conversionRate =
        data.uniqueUsers > 0 ? (data.conversions / data.uniqueUsers) * 100 : 0;

      return { success: true, data };
    } catch (error) {
      console.error("Get analytics data error:", error);
      return { success: false, error: error.message };
    }
  }

  // Generate session ID
  generateSessionId() {
    return (
      "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
    );
  }

  // Get session ID
  getSessionId() {
    return this.sessionId;
  }

  // Get events
  getEvents() {
    return this.events;
  }

  // Clear events
  clearEvents() {
    this.events = [];
  }

  // Get user properties
  getUserProperties() {
    return this.userProperties;
  }

  // Check if initialized
  isReady() {
    return this.isInitialized;
  }
}

// Create singleton instance
const analyticsService = new AnalyticsService();

export default analyticsService;
