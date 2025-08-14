import { useCallback, useEffect, useState } from 'react';

export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    pageViews: 0,
    interactions: 0,
    conversions: 0,
    revenue: 0,
    leads: []
  });

  const trackPageView = useCallback(() => {
    setAnalyticsData(prev => ({
      ...prev,
      pageViews: prev.pageViews + 1
    }));

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }, [setAnalyticsData]);

  const initializeAnalytics = useCallback(() => {
    // Initialize Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-TEST123456', {
        page_title: 'SUGGESTLY ELITE - Advanced AI Platform',
        page_location: window.location.href,
        custom_map: {
          'custom_parameter_1': 'service_tier',
          'custom_parameter_2': 'lead_quality',
          'custom_parameter_3': 'user_type'
        }
      });
    }

    // Track page view
    trackPageView();
  }, [trackPageView]);

  const trackEvent = useCallback((eventName, parameters = {}) => {
    setAnalyticsData(prev => ({
      ...prev,
      interactions: prev.interactions + 1
    }));

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        ...parameters,
        timestamp: new Date().toISOString()
      });
    }
  }, []);

  const trackConversion = useCallback((conversionData) => {
    setAnalyticsData(prev => ({
      ...prev,
      conversions: prev.conversions + 1,
      revenue: prev.revenue + (conversionData.amount || 0),
      leads: [...prev.leads, {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...conversionData
      }]
    }));

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        value: conversionData.amount,
        currency: 'USD',
        transaction_id: conversionData.transactionId,
        ...conversionData
      });
    }
  }, []);

  const trackLead = useCallback((leadData) => {
    setAnalyticsData(prev => ({
      ...prev,
      leads: [...prev.leads, {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        quality: calculateLeadQuality(leadData),
        ...leadData
      }]
    }));

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'generate_lead', {
        value: leadData.estimatedValue || 0,
        currency: 'USD',
        ...leadData
      });
    }
  }, []);

  const calculateLeadQuality = (leadData) => {
    let score = 0;
    
    // Company size scoring
    if (leadData.companySize === 'enterprise') score += 30;
    else if (leadData.companySize === 'large') score += 20;
    else if (leadData.companySize === 'medium') score += 10;

    // Budget scoring
    if (leadData.budget === 'high') score += 25;
    else if (leadData.budget === 'medium') score += 15;
    else if (leadData.budget === 'low') score += 5;

    // Timeline scoring
    if (leadData.timeline === 'immediate') score += 20;
    else if (leadData.timeline === 'quarter') score += 15;
    else if (leadData.timeline === 'year') score += 10;

    // Role scoring
    if (leadData.role === 'executive') score += 25;
    else if (leadData.role === 'manager') score += 15;
    else if (leadData.role === 'individual') score += 5;

    return Math.min(score, 100);
  };

  const getAnalyticsSummary = useCallback(() => {
    const totalLeads = analyticsData.leads.length;
    const highQualityLeads = analyticsData.leads.filter(lead => lead.quality >= 70).length;
    const conversionRate = totalLeads > 0 ? (analyticsData.conversions / totalLeads) * 100 : 0;
    const averageLeadValue = totalLeads > 0 ? analyticsData.revenue / totalLeads : 0;

    return {
      totalLeads,
      highQualityLeads,
      conversionRate: conversionRate.toFixed(2),
      averageLeadValue: averageLeadValue.toFixed(2),
      totalRevenue: analyticsData.revenue.toFixed(2),
      pageViews: analyticsData.pageViews,
      interactions: analyticsData.interactions
    };
  }, [analyticsData]);

  // Track page views on route changes
  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  return {
    analyticsData,
    initializeAnalytics,
    trackPageView,
    trackEvent,
    trackConversion,
    trackLead,
    getAnalyticsSummary
  };
};
