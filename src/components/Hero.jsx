import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Crown, ArrowRight, Sparkles } from 'lucide-react';
import HologramCard from './HologramCard';

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-luxury-gradient">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-luxury-gold rounded-full opacity-20 animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(255,215,0,0.08),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Side - Content */}
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            {/* Logo */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-2xl flex items-center justify-center mr-4 animate-glow">
                <Crown className="w-8 h-8 text-black" />
              </div>
              <h1 className="text-3xl font-display font-bold text-luxury-gold">
                SUGGESTLY ELITE
              </h1>
            </motion.div>

            {/* Main Title */}
            <motion.h2 
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-luxury-light mb-6 leading-tight"
            >
              Power. Precision.{' '}
              <span className="text-luxury-gold">Privacy.</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-luxury-gray mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Executive-grade intelligence and concierge solutions for UHNWIs and global leaders.
            </motion.p>

            {/* Features */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              {[
                { icon: Crown, text: 'Elite Advisory' },
                { icon: Sparkles, text: 'Quantum AI' },
                { icon: ArrowRight, text: 'Global Reach' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-center lg:justify-start space-x-2 text-luxury-gray">
                  <feature.icon className="w-5 h-5 text-luxury-gold" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button className="bg-gradient-to-r from-luxury-gold to-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <span>Request Private Demo</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="border border-luxury-gold/30 text-luxury-gold px-8 py-4 rounded-xl font-bold text-lg hover:bg-luxury-gold/10 transition-colors duration-300">
                Speak to Concierge
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-luxury-gray text-sm"
            >
              <span>✓ Bank-Grade Security</span>
              <span>✓ 24/7 Support</span>
              <span>✓ Global Coverage</span>
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Hologram */}
          <motion.div 
            variants={itemVariants}
            className="relative h-[500px] lg:h-[600px]"
          >
            <div className="absolute inset-0 bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-4">
              <HologramCard />
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-xs text-luxury-gray bg-luxury-darker px-3 py-1 rounded-full border border-luxury-gold/20">
                Interactive 3D AI Core • Live Hologram
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-luxury-gold/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-luxury-gold rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
