import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Initialize analytics and payment systems
const initializeApp = () => {
  // Google Analytics initialization
  if (typeof window !== 'undefined') {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-TEST123456';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-TEST123456', {
      page_title: 'SUGGESTLY ELITE - Advanced AI Platform',
      page_location: window.location.href,
      custom_map: {
        'custom_parameter_1': 'service_tier',
        'custom_parameter_2': 'lead_quality',
        'custom_parameter_3': 'user_type'
      }
    });
  }
};

// Initialize the app
initializeApp();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
