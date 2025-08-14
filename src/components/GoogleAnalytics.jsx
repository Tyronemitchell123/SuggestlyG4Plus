import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const GoogleAnalytics = ({ trackingId = 'G-XXXXXXXXXX' }) => {
  useEffect(() => {
    // Load Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', trackingId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [trackingId]);

  return (
    <Helmet>
      {/* Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}');
        `}
      </script>

      {/* SEO Meta Tags */}
      <title>SUGGESTLY ELITE - Advanced AI Platform for UHNWIs</title>
      <meta name="description" content="Elite AI advisory platform for ultra-high-net-worth individuals. Advanced wealth management, luxury lifestyle optimization, and exclusive investment opportunities." />
      <meta name="keywords" content="AI advisory, UHNWI, wealth management, luxury lifestyle, investment opportunities, elite services" />
      <meta name="author" content="SUGGESTLY ELITE" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content="SUGGESTLY ELITE - Advanced AI Platform for UHNWIs" />
      <meta property="og:description" content="Elite AI advisory platform for ultra-high-net-worth individuals. Advanced wealth management and luxury lifestyle optimization." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://suggestlyelite.com" />
      <meta property="og:image" content="https://suggestlyelite.com/og-image.jpg" />
      <meta property="og:site_name" content="SUGGESTLY ELITE" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="SUGGESTLY ELITE - Advanced AI Platform for UHNWIs" />
      <meta name="twitter:description" content="Elite AI advisory platform for ultra-high-net-worth individuals." />
      <meta name="twitter:image" content="https://suggestlyelite.com/twitter-image.jpg" />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://suggestlyelite.com" />
    </Helmet>
  );
};

export default GoogleAnalytics;
