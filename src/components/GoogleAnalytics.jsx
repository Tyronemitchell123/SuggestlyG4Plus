import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  useEffect(() => {
    // Load Google Analytics script
    const loadGoogleAnalytics = () => {
      if (typeof window !== 'undefined' && !window.gtag) {
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_TRACKING_ID}`;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.REACT_APP_GA_TRACKING_ID}');
        `;
        document.head.appendChild(script2);
      }
    };

    loadGoogleAnalytics();
  }, []);

  // Track custom events
  const trackEvent = (action, category, label, value) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  // Track page views
  const trackPageView = pagePath => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
        page_path: pagePath,
      });
    }
  };

  // Track user engagement
  const trackEngagement = (eventName, parameters = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  };

  // Track conversions
  const trackConversion = (conversionId, conversionLabel) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `${process.env.REACT_APP_GA_TRACKING_ID}/${conversionId}/${conversionLabel}`,
      });
    }
  };

  // Track ecommerce events
  const trackPurchase = (transactionId, value, currency = 'USD') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: currency,
      });
    }
  };

  // Track user properties
  const setUserProperties = properties => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
        custom_map: properties,
      });
    }
  };

  // Expose tracking functions globally for use in other components
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.trackEvent = trackEvent;
      window.trackPageView = trackPageView;
      window.trackEngagement = trackEngagement;
      window.trackConversion = trackConversion;
      window.trackPurchase = trackPurchase;
      window.setUserProperties = setUserProperties;
    }
  }, []);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;



