import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Crown,
  TrendingUp,
  Play,
  ArrowRight,
  Star,
  Shield,
  Zap,
  Users,
  CheckCircle,
} from 'lucide-react';
import TrialSignupModal from './TrialSignupModal';
import toast from 'react-hot-toast';

const Hero = React.memo(() => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  const handleGetStarted = useCallback(() => {
    setIsTrialModalOpen(true);
  }, []);

  const handleWatchDemo = useCallback(() => {
    toast.success('🎬 Demo video starting...');
    // Simulate video play
    setTimeout(() => {}, 3000);
  }, []);

  const handleViewDashboard = useCallback(() => {
    window.open('/dashboard', '_blank');
  }, []);

  const handleTrialSubmit = useCallback(async formData => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('🎉 Trial account created! Welcome to SUGGESTLY ELITE.');
      setIsTrialModalOpen(false);

      // Redirect to dashboard after successful signup
      setTimeout(() => {
        window.open('/dashboard', '_blank');
      }, 1000);
    } catch (error) {
      toast.error('Failed to create trial account. Please try again.');
    }
  }, []);

  const stats = [
    { label: 'Active Users', value: '15,847', icon: Users, change: '+12.5%' },
    {
      label: 'Revenue Generated',
      value: '$2.4M',
      icon: TrendingUp,
      change: '+8.2%',
    },
    { label: 'AI Models Deployed', value: '247', icon: Zap, change: '+15.3%' },
    {
      label: 'Success Rate',
      value: '99.9%',
      icon: CheckCircle,
      change: '+0.1%',
    },
  ];

  return (
    <section className="relative min-h-screen bg-luxury-gradient flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_50%,rgba(255,215,0,0.05),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_80%_20%,rgba(255,215,0,0.03),transparent)]" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-luxury-gold/5 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-luxury-gold/5 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-luxury-gold/10 border border-luxury-gold/20 rounded-full px-4 py-2 mb-8"
          >
            <Crown className="w-4 h-4 text-luxury-gold" />
            <span className="text-luxury-gold font-medium text-sm">
              Elite AI Platform for UHNWI
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-display font-bold text-luxury-light mb-6 leading-tight"
          >
            Advanced <span className="text-gradient-gold">AI Platform</span>
            <br />
            for Global Enterprises
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-luxury-gray max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            Quantum-inspired AI solutions designed for ultra-high-net-worth
            individuals and enterprise organizations. Experience the future of
            artificial intelligence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-luxury-gold to-yellow-500 text-black rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Crown className="w-5 h-5" />
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWatchDemo}
              className="px-8 py-4 bg-luxury-darker border border-luxury-gold/30 text-luxury-gold rounded-xl font-bold text-lg hover:bg-luxury-gold/10 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-xl p-4"
              >
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-luxury-gold" />
                </div>
                <div className="text-2xl font-bold text-luxury-light mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-luxury-gray mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-green-400">{stat.change}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8"
          >
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-luxury-gold" />
              <span className="text-luxury-gray">Bank-Grade Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-luxury-gold" />
              <span className="text-luxury-gray">99.9% Uptime</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-luxury-gold" />
              <span className="text-luxury-gray">24/7 Support</span>
            </div>
          </motion.div>

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

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
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
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-3 bg-luxury-gold rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Trial Signup Modal */}
      <TrialSignupModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        onSubmit={handleTrialSubmit}
      />
    </section>
  );
});

export default Hero;
