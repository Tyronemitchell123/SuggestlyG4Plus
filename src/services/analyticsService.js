// Enterprise Analytics Service for SUGGESTLY ELITE
// Tracks leads, conversions, user behavior, and business intelligence

class AnalyticsService {
  constructor() {
    this.isInitialized = false;
    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();
    this.events = [];
    this.leadData = {};
  }

  // Initialize analytics
  async initialize() {
    if (this.isInitialized) return;

    try {
      // Initialize Google Analytics
      if (window.gtag) {
        window.gtag('config', process.env.REACT_APP_GA_MEASUREMENT_ID, {
          page_title: 'SUGGESTLY ELITE',
          page_location: window.location.href,
          custom_map: {
            custom_parameter_1: 'lead_score',
            custom_parameter_2: 'inquiry_type',
            custom_parameter_3: 'revenue_range',
          },
        });
      }

      // Initialize other analytics providers
      await this.initializeProviders();

      this.isInitialized = true;
      console.log('Analytics service initialized');
    } catch (error) {
      console.error('Analytics initialization failed:', error);
    }
  }

  // Track page views
  trackPageView(pageName, customData = {}) {
    const eventData = {
      event: 'page_view',
      page_name: pageName,
      page_url: window.location.href,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId,
      user_id: this.userId,
      ...customData,
    };

    this.trackEvent(eventData);
  }

  // Track lead generation
  trackLeadGeneration(leadData) {
    const eventData = {
      event: 'lead_generation',
      lead_id: leadData.leadId,
      lead_score: leadData.leadScore,
      inquiry_type: leadData.inquiryType,
      revenue_range: leadData.revenue,
      priority: leadData.priority,
      timeline: leadData.timeline,
      source: leadData.source,
      campaign: leadData.campaign,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId,
      user_id: this.userId,
      utm_params: leadData.utmParams,
      user_agent: leadData.userAgent,
      ip_address: leadData.ipAddress,
    };

    this.trackEvent(eventData);
    this.storeLeadData(leadData);
  }

  // Track form interactions
  trackFormInteraction(formName, action, fieldData = {}) {
    const eventData = {
      event: 'form_interaction',
      form_name: formName,
      action: action, // 'start', 'field_change', 'validation_error', 'submit'
      field_data: fieldData,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId,
      user_id: this.userId,
    };

    this.trackEvent(eventData);
  }

  // Track lead scoring
  trackLeadScoreChange(oldScore, newScore, factors) {
    const eventData = {
      event: 'lead_score_change',
      old_score: oldScore,
      new_score: newScore,
      score_change: newScore - oldScore,
      factors: factors,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId,
      user_id: this.userId,
    };

    this.trackEvent(eventData);
  }

  // Track email interactions
  trackEmailInteraction(emailType, recipient, status, metadata = {}) {
    const eventData = {
      event: 'email_interaction',
      email_type: emailType, // 'consultation_request', 'auto_response', 'trial_credentials'
      recipient: recipient,
      status: status, // 'sent', 'delivered', 'opened', 'clicked', 'bounced'
      metadata: metadata,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId,
      user_id: this.userId,
    };

    this.trackEvent(eventData);
  }

  // Track SMS notifications
  trackSMSNotification(recipient, message, status) {
    const eventData = {
      event: 'sms_notification',
      recipient: recipient,
      message_length: message.length,
      status: status, // 'sent', 'delivered', 'failed'
      timestamp: new Date().toISOString(),
      session_id: this.sessionId,
      user_id: this.userId,
    };

    this.trackEvent(eventData);
  }

  // Track user engagement
  trackEngagement(action, duration = null, metadata = {}) {
    const eventData = {
      event: 'user_engagement',
      action: action, // 'scroll', 'click', 'hover', 'time_on_page'
      duration: duration,
      metadata: metadata,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId,
      user_id: this.userId,
    };

    this.trackEvent(eventData);
  }

  // Track conversion funnel
  trackConversionFunnel(stage, data = {}) {
    const eventData = {
      event: 'conversion_funnel',
      stage: stage, // 'awareness', 'interest', 'consideration', 'intent', 'purchase'
      data: data,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId,
      user_id: this.userId,
    };

    this.trackEvent(eventData);
  }

  // Track business intelligence
  trackBusinessIntelligence(metric, value, context = {}) {
    const eventData = {
      event: 'business_intelligence',
      metric: metric, // 'lead_quality', 'conversion_rate', 'revenue_potential'
      value: value,
      context: context,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId,
      user_id: this.userId,
    };

    this.trackEvent(eventData);
  }

  // Track error events
  trackError(error, context = {}) {
    const eventData = {
      event: 'error',
      error_message: error.message,
      error_stack: error.stack,
      context: context,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId,
      user_id: this.userId,
    };

    this.trackEvent(eventData);
  }

  // Core tracking function
  trackEvent(eventData) {
    // Add to local events array
    this.events.push(eventData);

    // Send to Google Analytics
    if (window.gtag) {
      window.gtag('event', eventData.event, {
        event_category: 'suggestly_elite',
        event_label: eventData.event,
        custom_parameter_1: eventData.lead_score,
        custom_parameter_2: eventData.inquiry_type,
        custom_parameter_3: eventData.revenue_range,
        value: eventData.value || 1,
      });
    }

    // Send to internal analytics
    this.sendToInternalAnalytics(eventData);

    // Send to external services
    this.sendToExternalServices(eventData);

    console.log('Analytics event tracked:', eventData);
  }

  // Send to internal analytics
  async sendToInternalAnalytics(eventData) {
    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to send analytics data');
      }
    } catch (error) {
      console.error('Failed to send analytics to internal service:', error);
    }
  }

  // Send to external services
  async sendToExternalServices(eventData) {
    // Send to Mixpanel
    if (window.mixpanel) {
      window.mixpanel.track(eventData.event, eventData);
    }

    // Send to Amplitude
    if (window.amplitude) {
      window.amplitude.getInstance().logEvent(eventData.event, eventData);
    }

    // Send to Segment
    if (window.analytics) {
      window.analytics.track(eventData.event, eventData);
    }
  }

  // Store lead data locally
  storeLeadData(leadData) {
    this.leadData[leadData.leadId] = {
      ...leadData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Store in localStorage for persistence
    try {
      const storedLeads = JSON.parse(
        localStorage.getItem('suggestly_leads') || '{}'
      );
      storedLeads[leadData.leadId] = this.leadData[leadData.leadId];
      localStorage.setItem('suggestly_leads', JSON.stringify(storedLeads));
    } catch (error) {
      console.error('Failed to store lead data:', error);
    }
  }

  // Get analytics dashboard data
  getDashboardData() {
    const events = this.events;
    const leads = Object.values(this.leadData);

    return {
      totalEvents: events.length,
      totalLeads: leads.length,
      leadScoreDistribution: this.calculateLeadScoreDistribution(leads),
      inquiryTypeDistribution: this.calculateInquiryTypeDistribution(leads),
      conversionRate: this.calculateConversionRate(leads),
      averageLeadScore: this.calculateAverageLeadScore(leads),
      topSources: this.calculateTopSources(leads),
      recentActivity: events.slice(-10),
      performanceMetrics: this.calculatePerformanceMetrics(events, leads),
    };
  }

  // Calculate lead score distribution
  calculateLeadScoreDistribution(leads) {
    const distribution = {
      '0-20': 0,
      '21-40': 0,
      '41-60': 0,
      '61-80': 0,
      '81-100': 0,
    };

    leads.forEach(lead => {
      const score = lead.leadScore || 0;
      if (score <= 20) distribution['0-20']++;
      else if (score <= 40) distribution['21-40']++;
      else if (score <= 60) distribution['41-60']++;
      else if (score <= 80) distribution['61-80']++;
      else distribution['81-100']++;
    });

    return distribution;
  }

  // Calculate inquiry type distribution
  calculateInquiryTypeDistribution(leads) {
    const distribution = {};

    leads.forEach(lead => {
      const type = lead.inquiryType || 'unknown';
      distribution[type] = (distribution[type] || 0) + 1;
    });

    return distribution;
  }

  // Calculate conversion rate
  calculateConversionRate(leads) {
    const totalLeads = leads.length;
    const convertedLeads = leads.filter(
      lead => lead.status === 'converted'
    ).length;

    return totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
  }

  // Calculate average lead score
  calculateAverageLeadScore(leads) {
    if (leads.length === 0) return 0;

    const totalScore = leads.reduce(
      (sum, lead) => sum + (lead.leadScore || 0),
      0
    );
    return Math.round(totalScore / leads.length);
  }

  // Calculate top sources
  calculateTopSources(leads) {
    const sources = {};

    leads.forEach(lead => {
      const source = lead.source || 'unknown';
      sources[source] = (sources[source] || 0) + 1;
    });

    return Object.entries(sources)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([source, count]) => ({ source, count }));
  }

  // Calculate performance metrics
  calculatePerformanceMetrics(events, leads) {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const recentEvents = events.filter(
      event => new Date(event.timestamp) > last24Hours
    );
    const recentLeads = leads.filter(
      lead => new Date(lead.created_at) > last24Hours
    );

    return {
      eventsLast24Hours: recentEvents.length,
      leadsLast24Hours: recentLeads.length,
      averageResponseTime: this.calculateAverageResponseTime(leads),
      leadQualityScore: this.calculateLeadQualityScore(leads),
      revenuePotential: this.calculateRevenuePotential(leads),
    };
  }

  // Calculate average response time
  calculateAverageResponseTime(leads) {
    const responseTimes = leads
      .filter(lead => lead.firstResponseTime)
      .map(lead => {
        const created = new Date(lead.created_at);
        const responded = new Date(lead.firstResponseTime);
        return responded.getTime() - created.getTime();
      });

    if (responseTimes.length === 0) return 0;

    const averageMs =
      responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
    return Math.round(averageMs / (1000 * 60)); // Convert to minutes
  }

  // Calculate lead quality score
  calculateLeadQualityScore(leads) {
    if (leads.length === 0) return 0;

    const qualityScores = leads.map(lead => {
      let score = 0;

      // Revenue scoring
      const revenueScore =
        {
          'under-100k': 10,
          '100k-500k': 25,
          '500k-1m': 50,
          '1m-10m': 75,
          '10m-50m': 90,
          '50m+': 100,
        }[lead.revenue] || 0;

      // Priority scoring
      const priorityScore =
        {
          low: 10,
          medium: 30,
          high: 60,
          urgent: 100,
        }[lead.priority] || 0;

      score = (revenueScore + priorityScore) / 2;
      return score;
    });

    const totalScore = qualityScores.reduce((sum, score) => sum + score, 0);
    return Math.round(totalScore / qualityScores.length);
  }

  // Calculate revenue potential
  calculateRevenuePotential(leads) {
    const revenueMap = {
      'under-100k': 50000,
      '100k-500k': 300000,
      '500k-1m': 750000,
      '1m-10m': 5500000,
      '10m-50m': 30000000,
      '50m+': 100000000,
    };

    const totalPotential = leads.reduce((sum, lead) => {
      const baseRevenue = revenueMap[lead.revenue] || 0;
      const multiplier = (lead.leadScore || 50) / 100;
      return sum + baseRevenue * multiplier;
    }, 0);

    return Math.round(totalPotential);
  }

  // Initialize external providers
  async initializeProviders() {
    try {
      // Initialize Mixpanel
      if (window.mixpanel && typeof window.mixpanel.init === 'function') {
        window.mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN);
      }

      // Initialize Amplitude
      if (
        window.amplitude &&
        window.amplitude.getInstance &&
        typeof window.amplitude.getInstance().init === 'function'
      ) {
        window.amplitude
          .getInstance()
          .init(process.env.REACT_APP_AMPLITUDE_API_KEY);
      }

      // Initialize Segment
      if (window.analytics && typeof window.analytics.load === 'function') {
        window.analytics.load(process.env.REACT_APP_SEGMENT_WRITE_KEY);
      }
    } catch (error) {
      console.warn('Analytics provider initialization failed:', error);
    }
  }

  // Utility functions
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getUserId() {
    let userId = localStorage.getItem('suggestly_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('suggestly_user_id', userId);
    }
    return userId;
  }

  // Export analytics data
  exportAnalyticsData() {
    return {
      events: this.events,
      leads: this.leadData,
      dashboard: this.getDashboardData(),
      session: {
        sessionId: this.sessionId,
        userId: this.userId,
        initialized: this.isInitialized,
      },
    };
  }

  // Clear analytics data
  clearAnalyticsData() {
    this.events = [];
    this.leadData = {};
    localStorage.removeItem('suggestly_leads');
    localStorage.removeItem('suggestly_user_id');
  }
}

// Create singleton instance
const analyticsService = new AnalyticsService();

// Export functions
export const initializeAnalytics = () => analyticsService.initialize();
export const trackPageView = (pageName, customData) =>
  analyticsService.trackPageView(pageName, customData);
export const trackLeadGeneration = leadData =>
  analyticsService.trackLeadGeneration(leadData);
export const trackFormInteraction = (formName, action, fieldData) =>
  analyticsService.trackFormInteraction(formName, action, fieldData);
export const trackLeadScoreChange = (oldScore, newScore, factors) =>
  analyticsService.trackLeadScoreChange(oldScore, newScore, factors);
export const trackEmailInteraction = (emailType, recipient, status, metadata) =>
  analyticsService.trackEmailInteraction(
    emailType,
    recipient,
    status,
    metadata
  );
export const trackSMSNotification = (recipient, message, status) =>
  analyticsService.trackSMSNotification(recipient, message, status);
export const trackEngagement = (action, duration, metadata) =>
  analyticsService.trackEngagement(action, duration, metadata);
export const trackConversionFunnel = (stage, data) =>
  analyticsService.trackConversionFunnel(stage, data);
export const trackBusinessIntelligence = (metric, value, context) =>
  analyticsService.trackBusinessIntelligence(metric, value, context);
export const trackError = (error, context) =>
  analyticsService.trackError(error, context);
export const getDashboardData = () => analyticsService.getDashboardData();
export const exportAnalyticsData = () => analyticsService.exportAnalyticsData();
export const clearAnalyticsData = () => analyticsService.clearAnalyticsData();

export default analyticsService;
