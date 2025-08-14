import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Services from './components/Services';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import LoadingScreen from './components/LoadingScreen';
import SiteManager from './components/SiteManager';
import SiteViewer from './components/SiteViewer';
import AudioEqualizer from './components/AudioEqualizer';
import AudioEQLanding from './components/AudioEQLanding';
import G4AudioEqualizer from './components/G4AudioEqualizer';
import DAWConnector from './components/DAWConnector';
import QuantumDAWConnector from './components/QuantumDAWConnector';
import AIContentStudio from './components/AIContentStudio';
import VideoProductionSuite from './components/VideoProductionSuite';
import QuantumComputingHub from './components/QuantumComputingHub';
import QuantumBotAutomation from './components/QuantumBotAutomation';

// Hooks
import { useAnalytics } from './hooks/useAnalytics';
import { usePaymentSystem } from './hooks/usePaymentSystem';
import { useSiteManager } from './hooks/useSiteManager';

function App() {
  const { initializeAnalytics } = useAnalytics();
  const { initializePaymentSystem } = usePaymentSystem();
  const { currentSite, isLoading } = useSiteManager();

  React.useEffect(() => {
    // Initialize all systems
    initializeAnalytics();
    initializePaymentSystem();
  }, [initializeAnalytics, initializePaymentSystem]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // If we have a current site and we're not on admin routes, show the hosted site
  if (currentSite && !window.location.pathname.startsWith('/admin')) {
    return <SiteViewer site={currentSite} />;
  }

  // Main platform (original SuggestlyG4Plus)
  return (
    <Router>
      <div className="App">
        <Helmet>
          <title>SUGGESTLY ELITE - Multi-Site Hosting Platform</title>
          <meta name="description" content="SUGGESTLY ELITE - Advanced AI Platform & Multi-Site Hosting for UHNWI & Business Executives. Host multiple websites with our enterprise-grade platform." />
          <meta name="keywords" content="AI, artificial intelligence, quantum AI, neural networks, enterprise AI, business automation, UHNWI, executives, machine learning, predictive analytics, web hosting, multi-site" />
          <meta name="author" content="SUGGESTLY ELITE" />
          <meta name="robots" content="index, follow" />
          
          {/* Open Graph */}
          <meta property="og:title" content="SUGGESTLY ELITE - Multi-Site Hosting Platform" />
          <meta property="og:description" content="Advanced AI Platform & Multi-Site Hosting for UHNWI & Business Executives" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://suggestlyg4plus.io" />
          <meta property="og:image" content="https://suggestlyg4plus.io/og-image.jpg" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="SUGGESTLY ELITE - Multi-Site Hosting Platform" />
          <meta name="twitter:description" content="Advanced AI Platform & Multi-Site Hosting for UHNWI & Business Executives" />
          <meta name="twitter:image" content="https://suggestlyg4plus.io/twitter-image.jpg" />
          
          {/* Favicon */}
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          
          {/* Fonts */}
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
          
          {/* PWA Manifest */}
          <link rel="manifest" href="/manifest.json" />
          
          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-TEST123456"></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TEST123456', {
                page_title: 'SUGGESTLY ELITE - Multi-Site Hosting Platform',
                page_location: window.location.href,
                custom_map: {
                  'custom_parameter_1': 'service_tier',
                  'custom_parameter_2': 'lead_quality',
                  'custom_parameter_3': 'user_type'
                }
              });
            `}
          </script>
        </Helmet>

        <LoadingScreen />
        
        <div className="min-h-screen bg-luxury-gradient text-luxury-light">
          <Header />
          
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Services />
                  <Features />
                  <Pricing />
                  <Contact />
                </>
              } />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<SiteManager />} />
              <Route path="/admin/*" element={<SiteManager />} />
              <Route path="/services" element={<Services />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Audio Production Suite */}
              <Route path="/audio-eq" element={<AudioEqualizer />} />
              <Route path="/eq" element={<AudioEqualizer />} />
              <Route path="/audio-eq-landing" element={<AudioEQLanding />} />
              <Route path="/g4-eq" element={<G4AudioEqualizer />} />
              <Route path="/g4" element={<G4AudioEqualizer />} />
              
              {/* DAW Connector */}
              <Route path="/daw-connector" element={<DAWConnector />} />
              <Route path="/daw" element={<DAWConnector />} />
              <Route path="/quantum-daw" element={<QuantumDAWConnector />} />
              <Route path="/quantum" element={<QuantumDAWConnector />} />
              
              {/* AI Content Studio */}
              <Route path="/ai-studio" element={<AIContentStudio />} />
              <Route path="/ai" element={<AIContentStudio />} />
              
              {/* Video Production Suite */}
              <Route path="/video-suite" element={<VideoProductionSuite />} />
              <Route path="/video" element={<VideoProductionSuite />} />
              
              {/* Quantum Computing Hub */}
              <Route path="/quantum-hub" element={<QuantumComputingHub />} />
              <Route path="/quantum-computing" element={<QuantumComputingHub />} />
              
              {/* Quantum Bot Automation */}
              <Route path="/quantum-bots" element={<QuantumBotAutomation />} />
              <Route path="/bots" element={<QuantumBotAutomation />} />
            </Routes>
          </main>
          
          <Footer />
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a1a',
              color: '#ffffff',
              border: '1px solid #ffd700',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
