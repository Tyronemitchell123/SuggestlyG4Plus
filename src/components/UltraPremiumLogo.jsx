import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Crown, Sparkles, Zap, Star, Shield } from 'lucide-react';

const UltraPremiumLogo = ({
  size = 'default',
  animated = true,
  showText = true,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const controls = useAnimation();

  // Auto-animation cycle
  useEffect(() => {
    if (animated) {
      const cycleAnimation = async () => {
        while (true) {
          await controls.start({
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
            transition: { duration: 4, ease: 'easeInOut' },
          });
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      };
      cycleAnimation();
    }
  }, [animated, controls]);

  // Glow effect cycle
  useEffect(() => {
    if (animated) {
      const glowInterval = setInterval(() => {
        setIsGlowing(prev => !prev);
      }, 3000);
      return () => clearInterval(glowInterval);
    }
  }, [animated]);

  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-12 h-12',
    large: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const iconSizes = {
    small: 'w-4 h-4',
    default: 'w-6 h-6',
    large: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  const textSizes = {
    small: 'text-sm',
    default: 'text-xl',
    large: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <motion.div
      className={`flex items-center space-x-3 group cursor-pointer ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={controls}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Main Logo Container */}
      <div className="relative">
        {/* Outer Glow Ring */}
        <motion.div
          className={`absolute inset-0 rounded-2xl ${
            isGlowing
              ? 'bg-gradient-to-r from-luxury-gold via-yellow-400 to-luxury-gold'
              : 'bg-gradient-to-r from-luxury-gold/20 to-yellow-400/20'
          } blur-md`}
          animate={{
            scale: isGlowing ? [1, 1.2, 1] : 1,
            opacity: isGlowing ? [0.5, 0.8, 0.5] : 0.3,
          }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />

        {/* Main Logo Background */}
        <motion.div
          className={`${sizeClasses[size]} bg-gradient-to-br from-luxury-gold via-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl`}
          animate={{
            boxShadow: isGlowing
              ? [
                  '0 0 20px rgba(255, 215, 0, 0.5)',
                  '0 0 40px rgba(255, 215, 0, 0.8)',
                  '0 0 20px rgba(255, 215, 0, 0.5)',
                ]
              : '0 10px 30px rgba(255, 215, 0, 0.3)',
          }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          {/* Crown Icon */}
          <motion.div
            className="relative z-10"
            animate={{
              y: isHovered ? [-2, 2, -2] : 0,
              rotate: isHovered ? [-5, 5, -5] : 0,
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <Crown className={`${iconSizes[size]} text-black`} />
          </motion.div>

          {/* Floating Sparkles */}
          {animated && (
            <>
              <motion.div
                className="absolute top-1 right-1"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0,
                }}
              >
                <Sparkles className="w-2 h-2 text-white" />
              </motion.div>
              <motion.div
                className="absolute bottom-1 left-1"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, -180, -360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1,
                }}
              >
                <Star className="w-2 h-2 text-white" />
              </motion.div>
              <motion.div
                className="absolute top-1/2 -right-1"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 90, 180],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              >
                <Zap className="w-2 h-2 text-white" />
              </motion.div>
            </>
          )}

          {/* Premium Badge */}
          <motion.div
            className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full p-1"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              rotate: isHovered ? [0, 360] : 0,
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <Shield className="w-2 h-2 text-white" />
          </motion.div>
        </motion.div>

        {/* Particle Effects */}
        {animated && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-luxury-gold rounded-full"
                animate={{
                  x: [0, Math.random() * 20 - 10],
                  y: [0, Math.random() * 20 - 10],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeInOut',
                }}
                style={{
                  left: `${20 + i * 10}%`,
                  top: `${20 + i * 10}%`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Text Logo */}
      {showText && (
        <motion.div
          className="flex flex-col"
          animate={{
            x: isHovered ? [0, 5, 0] : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <motion.span
            className={`${textSizes[size]} font-display font-bold bg-gradient-to-r from-luxury-gold via-yellow-400 to-orange-500 bg-clip-text text-transparent`}
            animate={{
              backgroundPosition: isHovered
                ? ['0% 50%', '100% 50%', '0% 50%']
                : '0% 50%',
            }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          >
            SUGGESTLY
          </motion.span>
          <motion.span
            className={`${textSizes[size]} font-display font-bold text-luxury-gold`}
            animate={{
              opacity: isHovered ? [1, 0.8, 1] : 1,
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            ELITE
          </motion.span>
        </motion.div>
      )}

      {/* Hover Effects */}
      {isHovered && animated && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-gold/10 to-yellow-400/10 rounded-2xl blur-sm" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default UltraPremiumLogo;


