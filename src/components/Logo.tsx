/**
 * Logo Component - Animated SVG "S" Letter for SuggestlyG4Plus
 * 
 * Features:
 * - Animated SVG "S" letter with smooth gradient transitions
 * - Responsive design that scales based on size prop
 * - Integrates with existing Framer Motion setup
 * - Uses brand colors (purple-400 to pink-400 gradient)
 * - Smooth hover animations and pulse effect
 * - TypeScript support with proper prop types
 * - Accessibility features with ARIA labels
 * 
 * Usage:
 * ```tsx
 * import Logo from '@/components/Logo';
 * 
 * // Basic usage
 * <Logo />
 * 
 * // With custom size
 * <Logo size="lg" />
 * 
 * // With custom className
 * <Logo className="custom-styles" />
 * 
 * // Disable animations (for performance)
 * <Logo animated={false} />
 * ```
 * 
 * Props:
 * - size: "sm" | "md" | "lg" | "xl" - Controls the logo size
 * - className: string - Additional CSS classes
 * - animated: boolean - Enable/disable animations (default: true)
 * - onClick: () => void - Optional click handler
 */

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Logo.module.css';

// Type definitions for Logo component props
export interface LogoProps {
  /** Size variant for the logo */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Additional CSS classes */
  className?: string;
  /** Enable/disable animations */
  animated?: boolean;
  /** Optional click handler */
  onClick?: () => void;
  /** Accessible label for screen readers */
  ariaLabel?: string;
}

// Size mappings for consistent sizing
const sizeMap = {
  sm: { width: 32, height: 32, fontSize: 'text-xl' },
  md: { width: 48, height: 48, fontSize: 'text-2xl' },
  lg: { width: 64, height: 64, fontSize: 'text-3xl' },
  xl: { width: 80, height: 80, fontSize: 'text-4xl' }
};

/**
 * Logo Component with Animated SVG "S" Letter
 */
export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
  animated = true,
  onClick,
  ariaLabel = 'SuggestlyG4Plus Logo'
}) => {
  const { width, height } = sizeMap[size];

  // Animation variants for the logo container
  const containerVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      rotate: -10
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.1
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  // Animation variants for the SVG paths
  const pathVariants = {
    initial: { 
      pathLength: 0,
      opacity: 0
    },
    animate: { 
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut'
      }
    }
  };

  // Pulse animation for continuous subtle effect
  const pulseVariants = {
    initial: { opacity: 1 },
    animate: {
      opacity: [1, 0.7, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div
      className={`${styles.logoContainer} cursor-pointer ${className}`}
      style={{ width, height }}
      variants={animated ? containerVariants : undefined}
      initial={animated ? 'initial' : undefined}
      animate={animated ? 'animate' : undefined}
      whileHover={animated ? 'hover' : undefined}
      whileTap={animated && onClick ? 'tap' : undefined}
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      aria-label={ariaLabel}
      tabIndex={onClick ? 0 : undefined}
    >
      <motion.svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        className={styles.logoSvg}
        xmlns="http://www.w3.org/2000/svg"
        variants={animated ? pulseVariants : undefined}
        animate={animated ? 'animate' : undefined}
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className={styles.logoGradientStart} />
            <stop offset="50%" className={styles.logoGradientMiddle} />
            <stop offset="100%" className={styles.logoGradientEnd} />
          </linearGradient>
          
          <linearGradient id="logoGradientHover" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className={styles.logoGradientHoverStart} />
            <stop offset="50%" className={styles.logoGradientHoverMiddle} />
            <stop offset="100%" className={styles.logoGradientHoverEnd} />
          </linearGradient>

          {/* Glow effect filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Animated "S" letter path */}
        <motion.path
          d="M 70 25
             C 80 20, 85 25, 85 35
             C 85 45, 75 50, 65 50
             L 35 50
             C 25 50, 15 55, 15 65
             C 15 75, 20 80, 30 75
             L 25 85
             C 10 90, 5 80, 5 70
             C 5 55, 20 40, 35 40
             L 65 40
             C 75 40, 85 35, 85 25
             C 85 15, 80 10, 70 15
             Z"
          fill="url(#logoGradient)"
          stroke="none"
          strokeWidth="0"
          className={styles.logoPath}
          variants={animated ? pathVariants : undefined}
          filter="url(#glow)"
        />

        {/* Inner highlight for depth */}
        <motion.path
          d="M 70 30
             C 75 28, 78 30, 78 35
             C 78 42, 72 45, 65 45
             L 35 45
             C 28 45, 22 48, 22 55
             C 22 62, 25 65, 30 63"
          fill="none"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={animated ? pathVariants : undefined}
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated ? { 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 2, delay: 0.5 }
          } : undefined}
        />
      </motion.svg>

      {/* Background glow effect */}
      <div className={styles.logoGlow} />
    </motion.div>
  );
};

export default Logo;