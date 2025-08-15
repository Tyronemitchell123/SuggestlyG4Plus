import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Crown, Menu, X, ChevronDown, User, Shield, Zap } from 'lucide-react';
import UltraPremiumLogo from './UltraPremiumLogo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isQuantumDropdownOpen, setIsQuantumDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Features', href: '/features' },
    { name: 'Certifications', href: '/certifications' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Site Manager', href: '/admin' },
    { name: 'Performance', href: '/performance' },
    { name: 'External View', href: '/external' },
  ];

  const quantumFeatures = [
    { name: 'Audio EQ', href: '/audio-eq' },
    { name: 'G4 EQ', href: '/g4-eq' },
    { name: 'DAW Connector', href: '/daw-connector' },
    { name: 'Quantum DAW', href: '/quantum-daw' },
    { name: 'AI Studio', href: '/ai-studio' },
    { name: 'Video Suite', href: '/video-suite' },
    { name: 'Quantum Hub', href: '/quantum-hub' },
    { name: 'Quantum Bots', href: '/quantum-bots' },
    { name: 'Executive Dashboard', href: '/dashboard' },
    { name: 'Performance Dashboard', href: '/performance' },
    { name: 'External Content Loader', href: '/external' },
  ];

  const services = [
    { name: 'AI Strategy', href: '/services#ai-strategy', icon: Crown },
    { name: 'Quantum Computing', href: '/services#quantum', icon: Zap },
    { name: 'Neural Networks', href: '/services#neural', icon: Shield },
    { name: 'Custom Development', href: '/services#custom', icon: User },
  ];

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleDashboardClick = () => {
    window.open('/dashboard', '_blank');
    setIsMobileMenuOpen(false);
  };

  const handleNavigationClick = href => {
    if (href === '/certifications' && location.pathname === '/') {
      // If we're on homepage and clicking certifications, scroll to section
      const certificationsSection = document.getElementById('certifications');
      if (certificationsSection) {
        certificationsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-luxury-darker/95 backdrop-blur-md border-b border-luxury-gold/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Ultra Premium Animated Logo */}
          <Link to="/" className="group">
            <UltraPremiumLogo
              size="default"
              animated={true}
              showText={true}
              className="group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map(item => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => handleNavigationClick(item.href)}
                className={`text-luxury-light hover:text-luxury-gold transition-colors duration-300 font-medium ${
                  location.pathname === item.href ? 'text-luxury-gold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 text-luxury-light hover:text-luxury-gold transition-colors duration-300 font-medium"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-luxury-darker border border-luxury-gold/20 rounded-xl shadow-xl backdrop-blur-md"
                  >
                    <div className="p-2">
                      {services.map(service => (
                        <Link
                          key={service.name}
                          to={service.href}
                          className="flex items-center space-x-3 p-3 rounded-lg text-luxury-gray hover:text-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <service.icon className="w-5 h-5" />
                          <span>{service.name}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quantum Features Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsQuantumDropdownOpen(!isQuantumDropdownOpen)}
                className="flex items-center space-x-1 text-luxury-light hover:text-luxury-gold transition-colors duration-300 font-medium"
              >
                <span>Quantum Features</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${isQuantumDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isQuantumDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-luxury-darker border border-luxury-gold/20 rounded-xl shadow-xl backdrop-blur-md"
                  >
                    <div className="p-2">
                      {quantumFeatures.map(feature => (
                        <Link
                          key={feature.name}
                          to={feature.href}
                          className="flex items-center space-x-3 p-3 rounded-lg text-luxury-gray hover:text-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300"
                          onClick={() => setIsQuantumDropdownOpen(false)}
                        >
                          <Zap className="w-5 h-5" />
                          <span>{feature.name}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={handleDashboardClick}
              className="px-4 py-2 border border-luxury-gold/30 text-luxury-gold rounded-xl font-medium hover:bg-luxury-gold/10 transition-colors duration-300"
            >
              Dashboard
            </button>
            <button
              onClick={handleContactClick}
              className="px-6 py-2 bg-gradient-to-r from-luxury-gold to-yellow-500 text-black rounded-xl font-bold hover:scale-105 transition-transform duration-300"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-luxury-gold hover:bg-luxury-gold/10 rounded-lg transition-colors duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-luxury-darker border-t border-luxury-gold/20 backdrop-blur-md"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map(item => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block py-3 text-lg font-medium transition-colors duration-300 ${
                    location.pathname === item.href
                      ? 'text-luxury-gold'
                      : 'text-luxury-light hover:text-luxury-gold'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Services */}
              <div className="border-t border-luxury-gold/20 pt-4">
                <h4 className="text-luxury-gold font-semibold mb-3">
                  Services
                </h4>
                <div className="space-y-2">
                  {services.map(service => (
                    <Link
                      key={service.name}
                      to={service.href}
                      className="flex items-center space-x-3 py-2 text-luxury-gray hover:text-luxury-gold transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <service.icon className="w-5 h-5" />
                      <span>{service.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile CTA Buttons */}
              <div className="border-t border-luxury-gold/20 pt-4 space-y-3">
                <button
                  onClick={handleDashboardClick}
                  className="w-full px-4 py-3 border border-luxury-gold/30 text-luxury-gold rounded-xl font-medium hover:bg-luxury-gold/10 transition-colors duration-300"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleContactClick}
                  className="w-full px-6 py-3 bg-gradient-to-r from-luxury-gold to-yellow-500 text-black rounded-xl font-bold hover:scale-105 transition-transform duration-300"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
