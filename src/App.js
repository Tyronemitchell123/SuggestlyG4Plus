import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

// Core Components (eagerly loaded)
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// Lazy-loaded Components (cutting-edge code splitting)
const Hero = lazy(() => import('./components/Hero'));
const Services = lazy(() => import('./components/Services'));
const Features = lazy(() => import('./components/Features'));
const Pricing = lazy(() => import('./components/Pricing'));
const Contact = lazy(() => import('./components/Contact'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const SiteManager = lazy(() => import('./components/SiteManager'));
const SiteViewer = lazy(() => import('./components/SiteViewer'));

// Audio Production Suite (lazy loaded)
const AudioEqualizer = lazy(() => import('./components/AudioEqualizer'));
const AudioEQLanding = lazy(() => import('./components/AudioEQLanding'));
const G4AudioEqualizer = lazy(() => import('./components/G4AudioEqualizer'));

// DAW Connector (lazy loaded)
const DAWConnector = lazy(() => import('./components/DAWConnector'));
const QuantumDAWConnector = lazy(() => import('./components/QuantumDAWConnector'));

// AI Content Studio (lazy loaded)
const AIContentStudio = lazy(() => import('./components/AIContentStudio'));

// Video Production Suite (lazy loaded)
const VideoProductionSuite = lazy(() => import('./components/VideoProductionSuite'));

// Quantum Computing Hub (lazy loaded)
const QuantumComputingHub = lazy(() => import('./components/QuantumComputingHub'));
const QuantumBotAutomation = lazy(() => import('./components/QuantumBotAutomation'));

// Hooks
import { useAnalytics } from './hooks/useAnalytics';
import { usePaymentSystem } from './hooks/usePaymentSystem';
import { useSiteManager } from './hooks/useSiteManager';

// Modern Loading Component with Suspense
const SuspenseFallback = () => (
  <div className="min-h-screen bg-luxury-gradient flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-luxury-gold font-medium">Loading Elite Experience...</p>
    </div>
  </div>
);

function App() {
  const { initializeAnalytics } = useAnalytics();
  const { initializePaymentSystem } = usePaymentSystem();
  const { currentSite, isLoading } = useSiteManager();

  React.useEffect(() => {
    // Initialize all systems with error boundaries
    try {
      initializeAnalytics();
      initializePaymentSystem();
    } catch (error) {
      console.error('System initialization error:', error);
    }
  }, [initializeAnalytics, initializePaymentSystem]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // If we have a current site and we're not on admin routes, show the hosted site
  if (currentSite && !window.location.pathname.startsWith('/admin')) {
    return (
      <Suspense fallback={<SuspenseFallback />}>
        <SiteViewer site={currentSite} />
      </Suspense>
    );
  }

  // Main platform (original SuggestlyG4Plus) with modern React 18 features
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
          
          {/* Fonts with preload for performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
          
          {/* PWA Manifest */}
          <link rel="manifest" href="/manifest.json" />
          
          {/* Google Analytics with modern loading */}
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
            <Suspense fallback={<SuspenseFallback />}>
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
            </Suspense>
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
