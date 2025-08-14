import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Crown, 
  Zap, 
  ArrowRight, 
  Play, 
  Star,
  Users,
  TrendingUp,
  Award,
  Brain,
  Shield,
  Globe,
  Sparkles
} from 'lucide-react';
import HologramCard from './HologramCard';

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // const [isVideoPlaying] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const stats = [
    { number: '500+', label: 'Global Clients', icon: Users, color: 'text-blue-400' },
    { number: '$2.5B+', label: 'Revenue Generated', icon: TrendingUp, color: 'text-green-400' },
    { number: '99.9%', label: 'Success Rate', icon: Award, color: 'text-purple-400' },
    { number: '24/7', label: 'Elite Support', icon: Crown, color: 'text-luxury-gold' }
  ];

  // Auto-rotate stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  const handleGetStarted = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchDemo = () => {
    // setIsVideoPlaying(true);
    // In a real implementation, this would open a video modal
    alert('Demo video would play here. Contact us for a live demonstration.');
  };

  const handleViewDashboard = () => {
    window.open('/dashboard', '_blank');
  };

  const handleFreeTrial = () => {
    // Navigate to pricing section with trial focus
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-luxury-gradient">
      {/* Enhanced Background Effects */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_50%,rgba(255,215,0,0.08),transparent)]" 
      />
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 300], [0, -50]) }}
        className="absolute inset-0 bg-[radial-gradient(800px_400px_at_20%_80%,rgba(255,215,0,0.05),transparent)]" 
      />
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 300], [0, 50]) }}
        className="absolute inset-0 bg-[radial-gradient(600px_300px_at_80%_20%,rgba(255,215,0,0.05),transparent)]" 
      />
      
      {/* Enhanced Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-luxury-gold rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * window.innerWidth],
              y: [0, Math.random() * window.innerHeight],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Enhanced Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Enhanced Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-luxury-gold/10 border border-luxury-gold/20 rounded-full px-4 py-2 mb-6 hover:bg-luxury-gold/20 transition-colors duration-300"
            >
              <Sparkles className="w-4 h-4 text-luxury-gold animate-pulse" />
              <span className="text-luxury-gold font-semibold text-sm">ELITE AI PLATFORM</span>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-luxury-gold rounded-full"
              />
            </motion.div>

            {/* Enhanced Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-luxury-light mb-6 leading-tight"
            >
              Quantum <span className="text-luxury-gold bg-gradient-to-r from-luxury-gold to-yellow-400 bg-clip-text text-transparent">AI</span> for
              <br />
              <span className="text-luxury-gold bg-gradient-to-r from-luxury-gold to-yellow-400 bg-clip-text text-transparent">Elite</span> Executives
            </motion.h1>

            {/* Enhanced Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-luxury-gray mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Advanced artificial intelligence solutions designed for UHNWI and global enterprises. 
              Experience quantum-level performance with our cutting-edge AI platform that transforms 
              business operations and decision-making.
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-luxury-gold to-yellow-500 text-black rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:shadow-luxury-gold/25"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFreeTrial}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Star className="w-5 h-5" />
                <span>Free Trial</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWatchDemo}
                className="px-8 py-4 border border-luxury-gold/30 text-luxury-gold rounded-xl font-bold text-lg hover:bg-luxury-gold/10 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>

            {/* Enhanced Stats with Auto-rotation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label} 
                  className="text-center cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setCurrentStat(index)}
                >
                  <div className={`flex items-center justify-center space-x-2 mb-2 transition-colors duration-300 ${currentStat === index ? 'text-luxury-gold' : ''}`}>
                    <stat.icon className={`w-5 h-5 ${currentStat === index ? 'text-luxury-gold' : stat.color} group-hover:text-luxury-gold transition-colors duration-300`} />
                    <div className={`text-2xl font-display font-bold ${currentStat === index ? 'text-luxury-gold' : 'text-luxury-light'} group-hover:text-luxury-gold transition-colors duration-300`}>
                      {stat.number}
                    </div>
                  </div>
                  <div className="text-luxury-gray text-sm font-medium group-hover:text-luxury-gold transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* New Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-3 p-3 bg-glass rounded-lg border border-luxury-gold/10">
                <Brain className="w-5 h-5 text-luxury-gold" />
                <span className="text-sm text-luxury-light">Quantum AI</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-glass rounded-lg border border-luxury-gold/10">
                <Shield className="w-5 h-5 text-luxury-gold" />
                <span className="text-sm text-luxury-light">Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-glass rounded-lg border border-luxury-gold/10">
                <Globe className="w-5 h-5 text-luxury-gold" />
                <span className="text-sm text-luxury-light">Global Scale</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Enhanced 3D Hologram */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px] w-full">
              <HologramCard />
              
              {/* Enhanced Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-xl p-4 hover:bg-luxury-gold/10 transition-colors duration-300"
              >
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-luxury-gold" />
                  <span className="text-luxury-light text-sm font-medium">Quantum Processing</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 left-10 bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-xl p-4 hover:bg-luxury-gold/10 transition-colors duration-300"
              >
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-luxury-gold" />
                  <span className="text-luxury-light text-sm font-medium">AI Intelligence</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [-5, 15, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -left-5 bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-xl p-4 hover:bg-luxury-gold/10 transition-colors duration-300"
              >
                <div className="flex items-center space-x-2">
                  <Crown className="w-4 h-4 text-luxury-gold" />
                  <span className="text-luxury-light text-sm font-medium">Elite Status</span>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Quick Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewDashboard}
                className="px-6 py-3 bg-luxury-darker border border-luxury-gold/30 text-luxury-gold rounded-xl font-medium hover:bg-luxury-gold/10 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Crown className="w-4 h-4" />
                <span>View Dashboard</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const pricingSection = document.getElementById('pricing');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3 bg-luxury-darker border border-luxury-gold/30 text-luxury-gold rounded-xl font-medium hover:bg-luxury-gold/10 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <TrendingUp className="w-4 h-4" />
                <span>View Pricing</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-luxury-gold/30 rounded-full flex justify-center cursor-pointer hover:border-luxury-gold/60 transition-colors duration-300"
            onClick={() => {
              const servicesSection = document.getElementById('services');
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-luxury-gold rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
