import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Users, 
  Settings, 
  Command,
  Mic,
  Eye,
  MousePointer,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

// Ultra-Premium UX Component
const UltraPremiumUX = () => {
  const [activeTheme, setActiveTheme] = useState('luxury');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [voiceNavigation, setVoiceNavigation] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [liveData, setLiveData] = useState({});
  const [accessibilityMode, setAccessibilityMode] = useState('standard');
  
  const parallaxRef = useRef(null);
  const commandPaletteRef = useRef(null);

  // Micro-interactions and animations
  const microInteractions = {
    button: {
      hover: { scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" },
      tap: { scale: 0.95 },
      transition: { type: "spring", stiffness: 400, damping: 17 }
    },
    card: {
      hover: { y: -10, rotateY: 5 },
      transition: { duration: 0.3 }
    },
    gradient: {
      animate: {
        background: [
          "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
          "linear-gradient(45deg, #f093fb 0%, #f5576c 100%)",
          "linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)",
          "linear-gradient(45deg, #667eea 0%, #764ba2 100%)"
        ]
      },
      transition: { duration: 8, repeat: Infinity, ease: "linear" }
    }
  };

  // AI-Powered Suggestions System
  useEffect(() => {
    const generateAISuggestions = () => {
      const suggestions = [
        { id: 1, type: 'optimization', message: 'Portfolio rebalancing recommended based on market trends', priority: 'high' },
        { id: 2, type: 'insight', message: 'New investment opportunity detected in emerging markets', priority: 'medium' },
        { id: 3, type: 'alert', message: 'Risk assessment update available for your holdings', priority: 'low' }
      ];
      setAiSuggestions(suggestions);
    };

    generateAISuggestions();
    const interval = setInterval(generateAISuggestions, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Live Data Integration with Predictive Analytics
  useEffect(() => {
    const fetchLiveData = () => {
      const mockLiveData = {
        portfolioValue: 12500000,
        dailyChange: 2.3,
        trendDirection: 'up',
        anomalies: [
          { asset: 'AAPL', change: 5.2, type: 'positive' },
          { asset: 'TSLA', change: -2.1, type: 'negative' }
        ],
        predictions: [
          { timeframe: '1d', confidence: 0.87, direction: 'up' },
          { timeframe: '1w', confidence: 0.73, direction: 'up' },
          { timeframe: '1m', confidence: 0.65, direction: 'sideways' }
        ]
      };
      setLiveData(mockLiveData);
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 5000); // Real-time updates
    return () => clearInterval(interval);
  }, []);

  // Responsive Design Detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1920) setScreenSize('ultra-wide');
      else if (width >= 1200) setScreenSize('desktop');
      else if (width >= 768) setScreenSize('tablet');
      else setScreenSize('mobile');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Command Palette System
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Voice Navigation System
  useEffect(() => {
    if (voiceNavigation) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        // Process voice commands
        if (transcript.includes('navigate')) {
          // Handle navigation commands
        }
        if (transcript.includes('analyze')) {
          // Handle analysis commands
        }
      };

      recognition.start();
      return () => recognition.stop();
    }
  }, [voiceNavigation]);

  // Parallax Effect
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Accessibility Enhancements
  const accessibilityFeatures = {
    aaa: {
      contrastRatio: 7.0,
      keyboardNavigation: true,
      screenReaderOptimized: true,
      voiceCommands: true,
      highContrastMode: true
    },
    standard: {
      contrastRatio: 4.5,
      keyboardNavigation: true,
      screenReaderOptimized: false,
      voiceCommands: false,
      highContrastMode: false
    }
  };

  return (
    <div className="ultra-premium-ux">
      {/* Multi-Layer Parallax Background */}
      <div ref={parallaxRef} className="parallax-layers">
        <motion.div 
          className="gradient-layer"
          animate={microInteractions.gradient.animate}
          transition={microInteractions.gradient.transition}
        />
        <div className="particle-layer">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>

      {/* AI-Powered Suggestions Panel */}
      <AnimatePresence>
        {aiSuggestions.length > 0 && (
          <motion.div
            className="ai-suggestions-panel"
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="panel-header">
              <Sparkles className="ai-icon" />
              <h3>AI Insights</h3>
            </div>
            {aiSuggestions.map(suggestion => (
              <motion.div
                key={suggestion.id}
                className={`suggestion-item ${suggestion.priority}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="suggestion-content">
                  <span className="suggestion-type">{suggestion.type}</span>
                  <p>{suggestion.message}</p>
                </div>
                <motion.button
                  className="action-button"
                  whileHover={microInteractions.button.hover}
                  whileTap={microInteractions.button.tap}
                  transition={microInteractions.button.transition}
                >
                  <Zap size={16} />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Data Dashboard */}
      <motion.div 
        className="live-data-dashboard"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="dashboard-header">
          <h2>Live Portfolio Analytics</h2>
          <div className="real-time-indicator">
            <motion.div
              className="pulse-dot"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span>Live</span>
          </div>
        </div>

        <div className="data-grid">
          <motion.div 
            className="data-card portfolio-value"
            whileHover={microInteractions.card.hover}
            transition={microInteractions.card.transition}
          >
            <h3>Portfolio Value</h3>
            <motion.div 
              className="value"
              key={liveData.portfolioValue}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              ${liveData.portfolioValue?.toLocaleString()}
            </motion.div>
            <div className={`change ${liveData.trendDirection}`}>
              {liveData.dailyChange > 0 ? '+' : ''}{liveData.dailyChange}%
            </div>
          </motion.div>

          <motion.div 
            className="data-card predictions"
            whileHover={microInteractions.card.hover}
            transition={microInteractions.card.transition}
          >
            <h3>AI Predictions</h3>
            {liveData.predictions?.map((pred, index) => (
              <div key={index} className="prediction-item">
                <span className="timeframe">{pred.timeframe}</span>
                <span className={`confidence ${pred.direction}`}>
                  {Math.round(pred.confidence * 100)}%
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Command Palette */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <motion.div
            className="command-palette-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCommandPaletteOpen(false)}
          >
            <motion.div
              ref={commandPaletteRef}
              className="command-palette"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="palette-header">
                <Command size={20} />
                <input 
                  type="text" 
                  placeholder="Search commands, navigate, or ask AI..."
                  autoFocus
                />
              </div>
              <div className="command-suggestions">
                <div className="command-group">
                  <h4>Navigation</h4>
                  <div className="command-item">Dashboard</div>
                  <div className="command-item">Portfolio</div>
                  <div className="command-item">Analytics</div>
                </div>
                <div className="command-group">
                  <h4>Actions</h4>
                  <div className="command-item">Rebalance Portfolio</div>
                  <div className="command-item">Generate Report</div>
                  <div className="command-item">AI Analysis</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessibility Controls */}
      <motion.div 
        className="accessibility-controls"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          className={`control-button ${voiceNavigation ? 'active' : ''}`}
          onClick={() => setVoiceNavigation(!voiceNavigation)}
          whileHover={microInteractions.button.hover}
          whileTap={microInteractions.button.tap}
          transition={microInteractions.button.transition}
          title="Voice Navigation"
        >
          <Mic size={20} />
        </motion.button>
        
        <motion.button
          className="control-button"
          onClick={() => setAccessibilityMode(accessibilityMode === 'aaa' ? 'standard' : 'aaa')}
          whileHover={microInteractions.button.hover}
          whileTap={microInteractions.button.tap}
          transition={microInteractions.button.transition}
          title="Accessibility Mode"
        >
          <Eye size={20} />
        </motion.button>

        <motion.button
          className="control-button"
          onClick={() => setIsCommandPaletteOpen(true)}
          whileHover={microInteractions.button.hover}
          whileTap={microInteractions.button.tap}
          transition={microInteractions.button.transition}
          title="Command Palette (Ctrl+K)"
        >
          <Command size={20} />
        </motion.button>
      </motion.div>

      {/* Device-Aware Layout Indicators */}
      <div className="device-indicators">
        <div className={`indicator ${screenSize === 'ultra-wide' ? 'active' : ''}`}>
          <Monitor size={16} />
          <span>Ultra-Wide</span>
        </div>
        <div className={`indicator ${screenSize === 'desktop' ? 'active' : ''}`}>
          <Monitor size={16} />
          <span>Desktop</span>
        </div>
        <div className={`indicator ${screenSize === 'tablet' ? 'active' : ''}`}>
          <Tablet size={16} />
          <span>Tablet</span>
        </div>
        <div className={`indicator ${screenSize === 'mobile' ? 'active' : ''}`}>
          <Smartphone size={16} />
          <span>Mobile</span>
        </div>
      </div>

      {/* Contextual Tooltips */}
      <div className="contextual-tooltips">
        <motion.div
          className="tooltip"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <MousePointer size={16} />
          <span>Hover for micro-interactions</span>
        </motion.div>
      </div>
    </div>
  );
};

export default UltraPremiumUX;
