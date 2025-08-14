import ReactGA from 'react-ga4';

export const analyticsService = {
  // Initialize Google Analytics
  initialize() {
    try {
      const trackingId = process.env.REACT_APP_GA_TRACKING_ID;
      if (trackingId) {
        ReactGA.initialize(trackingId);
        console.log('Google Analytics initialized');
        return { success: true };
      } else {
        console.warn('Google Analytics tracking ID not found');
        return { success: false, error: 'Tracking ID not configured' };
      }
    } catch (error) {
      console.error('Analytics initialization error:', error);
      return { success: false, error: error.message };
    }
  },

  // Track page views
  trackPageView(page) {
    try {
      ReactGA.send({ hitType: "pageview", page });
      console.log('Page view tracked:', page);
      return { success: true };
    } catch (error) {
      console.error('Page view tracking error:', error);
      return { success: false, error: error.message };
    }
  },

  // Track custom events
  trackEvent(category, action, label = null, value = null) {
    try {
      ReactGA.event({
        category,
        action,
        label,
        value
      });
      console.log('Event tracked:', { category, action, label, value });
      return { success: true };
    } catch (error) {
      console.error('Event tracking error:', error);
      return { success: false, error: error.message };
    }
  },

  // Track consultation requests
  trackConsultationRequest(clientData, plan = null) {
    return this.trackEvent(
      'Consultation',
      'Request Submitted',
      plan ? plan.title : 'Custom Solution',
      plan ? parseFloat(plan.price.replace(/[^0-9.]/g, '')) : null
    );
  },

  // Track payment events
  trackPayment(plan, amount, status) {
    return this.trackEvent(
      'Payment',
      status === 'completed' ? 'Payment Completed' : 'Payment Attempted',
      plan.title,
      amount
    );
  },

  // Track feature usage
  trackFeatureUsage(feature, action) {
    return this.trackEvent('Feature', action, feature);
  },

  // Track user engagement
  trackEngagement(action, details = {}) {
    return this.trackEvent('Engagement', action, JSON.stringify(details));
  },

  // Track conversion funnel
  trackConversionFunnel(step, data = {}) {
    return this.trackEvent('Conversion', step, JSON.stringify(data));
  },

  // Track AI interactions
  trackAIInteraction(type, model, tokens = null) {
    return this.trackEvent(
      'AI',
      type,
      model,
      tokens
    );
  },

  // Track business metrics
  trackBusinessMetric(metric, value, category = 'Business') {
    return this.trackEvent(category, metric, null, value);
  },

  // Track user demographics (anonymized)
  trackUserDemographics(demographics) {
    const { revenue, industry, companySize } = demographics;
    return this.trackEvent(
      'Demographics',
      'User Profile',
      `${industry}-${companySize}`,
      revenue
    );
  },

  // Track performance metrics
  trackPerformance(metric, value) {
    return this.trackEvent('Performance', metric, null, value);
  },

  // Track error events
  trackError(error, context = {}) {
    return this.trackEvent(
      'Error',
      error.type || 'Unknown',
      error.message,
      null
    );
  },

  // Track social interactions
  trackSocialInteraction(network, action) {
    return this.trackEvent('Social', action, network);
  },

  // Track email interactions
  trackEmailInteraction(action, emailType) {
    return this.trackEvent('Email', action, emailType);
  },

  // Track form submissions
  trackFormSubmission(formName, success = true) {
    return this.trackEvent(
      'Form',
      success ? 'Submission Success' : 'Submission Failed',
      formName
    );
  },

  // Track button clicks
  trackButtonClick(buttonName, location) {
    return this.trackEvent('Button', 'Click', `${location}-${buttonName}`);
  },

  // Track scroll depth
  trackScrollDepth(depth) {
    return this.trackEvent('Scroll', 'Depth', null, depth);
  },

  // Track time on page
  trackTimeOnPage(page, timeSpent) {
    return this.trackEvent('Time', 'Page View', page, timeSpent);
  },

  // Track search queries
  trackSearch(query, results = 0) {
    return this.trackEvent('Search', 'Query', query, results);
  },

  // Track video interactions
  trackVideoInteraction(action, videoName) {
    return this.trackEvent('Video', action, videoName);
  },

  // Track download events
  trackDownload(fileName, fileType) {
    return this.trackEvent('Download', fileType, fileName);
  },

  // Track external link clicks
  trackExternalLink(url, linkText) {
    return this.trackEvent('External Link', 'Click', `${linkText}-${url}`);
  },

  // Track internal navigation
  trackNavigation(from, to) {
    return this.trackEvent('Navigation', 'Internal', `${from}-${to}`);
  },

  // Track user preferences
  trackUserPreference(preference, value) {
    return this.trackEvent('Preference', preference, value);
  },

  // Track subscription events
  trackSubscription(action, plan, status) {
    return this.trackEvent(
      'Subscription',
      action,
      `${plan}-${status}`
    );
  },

  // Track support interactions
  trackSupportInteraction(type, topic) {
    return this.trackEvent('Support', type, topic);
  },

  // Track onboarding progress
  trackOnboarding(step, completed = true) {
    return this.trackEvent(
      'Onboarding',
      completed ? 'Step Completed' : 'Step Started',
      step
    );
  },

  // Track feature adoption
  trackFeatureAdoption(feature, adoptionType) {
    return this.trackEvent('Adoption', adoptionType, feature);
  },

  // Track user satisfaction
  trackSatisfaction(score, feedback = '') {
    return this.trackEvent('Satisfaction', 'Score', feedback, score);
  },

  // Track business impact
  trackBusinessImpact(metric, value, timeframe = 'monthly') {
    return this.trackEvent(
      'Business Impact',
      metric,
      timeframe,
      value
    );
  },

  // Track AI model performance
  trackAIModelPerformance(model, metric, value) {
    return this.trackEvent(
      'AI Model',
      metric,
      model,
      value
    );
  },

  // Track security events
  trackSecurityEvent(event, severity) {
    return this.trackEvent('Security', event, severity);
  },

  // Track compliance events
  trackComplianceEvent(regulation, action) {
    return this.trackEvent('Compliance', action, regulation);
  },

  // Track API usage
  trackAPIUsage(endpoint, method, responseTime) {
    return this.trackEvent(
      'API',
      method,
      endpoint,
      responseTime
    );
  },

  // Track mobile vs desktop usage
  trackDeviceUsage(deviceType, action) {
    return this.trackEvent('Device', action, deviceType);
  },

  // Track browser usage
  trackBrowserUsage(browser, version) {
    return this.trackEvent('Browser', 'Usage', `${browser}-${version}`);
  },

  // Track geographic data
  trackGeographicData(country, region) {
    return this.trackEvent('Geographic', 'Location', `${country}-${region}`);
  },

  // Track accessibility usage
  trackAccessibilityUsage(feature) {
    return this.trackEvent('Accessibility', 'Feature Used', feature);
  },

  // Track dark mode usage
  trackDarkModeUsage(enabled) {
    return this.trackEvent('Theme', 'Dark Mode', enabled ? 'Enabled' : 'Disabled');
  },

  // Track language preferences
  trackLanguagePreference(language) {
    return this.trackEvent('Language', 'Preference', language);
  },

  // Track notification interactions
  trackNotificationInteraction(action, type) {
    return this.trackEvent('Notification', action, type);
  },

  // Track data export events
  trackDataExport(format, recordCount) {
    return this.trackEvent('Data Export', format, null, recordCount);
  },

  // Track backup events
  trackBackupEvent(action, success) {
    return this.trackEvent('Backup', action, success ? 'Success' : 'Failed');
  },

  // Track integration events
  trackIntegrationEvent(service, action) {
    return this.trackEvent('Integration', action, service);
  },

  // Track training events
  trackTrainingEvent(type, duration) {
    return this.trackEvent('Training', type, null, duration);
  },

  // Track deployment events
  trackDeploymentEvent(environment, status) {
    return this.trackEvent('Deployment', status, environment);
  },

  // Track maintenance events
  trackMaintenanceEvent(type, duration) {
    return this.trackEvent('Maintenance', type, null, duration);
  }
};
