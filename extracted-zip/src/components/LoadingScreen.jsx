import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Zap, Shield } from 'lucide-react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingSteps = [
    { text: 'Initializing Elite Platform', icon: Crown },
    { text: 'Loading Quantum AI Systems', icon: Sparkles },
    { text: 'Establishing Secure Connections', icon: Shield },
    { text: 'Optimizing Performance', icon: Zap },
    { text: 'Ready for Elite Experience', icon: Crown },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [loadingSteps.length]);

  if (isComplete) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-luxury-gradient flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="w-20 h-20 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Crown className="w-10 h-10 text-black" />
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-display font-bold text-luxury-light mb-2"
            >
              Welcome to SUGGESTLY ELITE
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-luxury-gold font-medium"
            >
              Your elite experience is ready
            </motion.p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="fixed inset-0 bg-luxury-gradient flex items-center justify-center z-50">
      <div className="max-w-md w-full mx-auto px-6">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-24 h-24 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Crown className="w-12 h-12 text-black" />
          </motion.div>

          <h1 className="text-3xl font-display font-bold text-luxury-light mb-2">
            SUGGESTLY ELITE
          </h1>
          <p className="text-luxury-gray">
            Advanced AI Platform & Multi-Site Hosting
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-luxury-gray">Loading...</span>
            <span className="text-sm text-luxury-gold font-medium">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="w-full bg-luxury-dark/50 rounded-full h-2 border border-luxury-gold/20">
            <motion.div
              className="h-full bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Loading Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-3"
        >
          {loadingSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isActive || isCompleted ? 1 : 0.5,
                  x: 0,
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-luxury-gold/20 border border-luxury-gold/30'
                    : isCompleted
                      ? 'bg-green-500/10 border border-green-500/20'
                      : 'bg-luxury-dark/30 border border-luxury-gold/10'
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    isActive
                      ? 'bg-luxury-gold text-black'
                      : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-luxury-dark/50 text-luxury-gray'
                  }`}
                >
                  <StepIcon className="w-4 h-4" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    isActive
                      ? 'text-luxury-gold'
                      : isCompleted
                        ? 'text-green-400'
                        : 'text-luxury-gray'
                  }`}
                >
                  {step.text}
                </span>
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto"
                  >
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-8"
        >
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
              scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full mx-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
