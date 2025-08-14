/**
 * SuggestlyG4Plus Animated Logo Component
 * 
 * A React component featuring an animated SVG "S" letter logo with gradient effects
 * and smooth Framer Motion animations. This logo is designed to be the visual
 * centerpiece of the SuggestlyG4Plus brand identity.
 * 
 * Features:
 * - Animated SVG "S" letter with gradient fill
 * - Hover effects with scale and rotation animations
 * - Consistent with the project's purple/pink color scheme
 * - Responsive sizing and accessible design
 * - TypeScript support with proper prop typing
 * 
 * Usage Examples:
 * 
 * // Basic usage with default size
 * <Logo />
 * 
 * // Custom size
 * <Logo size={80} />
 * 
 * // With custom class names
 * <Logo className="my-custom-styles" />
 * 
 * // Clickable logo (e.g., for navigation)
 * <Logo onClick={() => router.push('/')} clickable />
 * 
 * // Small logo for navigation bar
 * <Logo size={40} className="cursor-pointer" />
 * 
 * // Large hero logo
 * <Logo size={120} className="mx-auto" />
 * 
 * Integration with existing project:
 * - Uses Framer Motion (already installed)
 * - Follows Tailwind CSS patterns
 * - Matches purple/pink gradient theme
 * - Compatible with existing build system
 */

import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  /** Size of the logo in pixels */
  size?: number;
  /** Additional CSS classes */
  className?: string;
  /** Click handler for interactive logos */
  onClick?: () => void;
  /** Whether the logo should have hover effects */
  clickable?: boolean;
  /** Animation variant */
  variant?: 'default' | 'pulse' | 'glow';
}

export type { LogoProps };

/**
 * Animated SVG Logo Component for SuggestlyG4Plus
 * 
 * This component renders an animated "S" letter logo using SVG and Framer Motion.
 * The logo features gradient colors that match the project's design system
 * and includes smooth hover animations for interactive elements.
 */
export const Logo: React.FC<LogoProps> = ({
  size = 60,
  className = '',
  onClick,
  clickable = false,
  variant = 'default'
}) => {
  // Animation variants for different logo states
  const logoVariants = {
    default: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    hover: {
      scale: clickable ? 1.1 : 1.05,
      rotate: clickable ? 5 : 2,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  // Gradient animation variants
  const gradientVariants = {
    default: {
      opacity: 1,
      transition: { duration: 2, repeat: Infinity, repeatType: "reverse" as const }
    },
    pulse: {
      opacity: [0.8, 1, 0.8],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    glow: {
      opacity: [0.6, 1, 0.6],
      scale: [1, 1.02, 1],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const baseClasses = `logo-container ${clickable ? 'cursor-pointer' : ''} ${className}`;

  return (
    <motion.div
      className={baseClasses}
      variants={logoVariants}
      initial="default"
      whileHover="hover"
      whileTap={clickable ? "tap" : undefined}
      onClick={onClick}
      style={{ width: size, height: size }}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="logo-svg"
        variants={gradientVariants}
        animate={variant}
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7877c6" stopOpacity="1">
              <animate 
                attributeName="stop-color" 
                values="#7877c6;#a855f7;#7877c6" 
                dur="4s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="50%" stopColor="#a855f7" stopOpacity="1">
              <animate 
                attributeName="stop-color" 
                values="#a855f7;#ec4899;#a855f7" 
                dur="4s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="100%" stopColor="#ff77c6" stopOpacity="1">
              <animate 
                attributeName="stop-color" 
                values="#ff77c6;#78dbff;#ff77c6" 
                dur="4s" 
                repeatCount="indefinite" 
              />
            </stop>
          </linearGradient>

          {/* Glow effect gradient */}
          <linearGradient id="logoGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7877c6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ff77c6" stopOpacity="0.3" />
          </linearGradient>

          {/* Drop shadow filter */}
          <filter id="logoShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#7877c6" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Background glow effect */}
        {variant === 'glow' && (
          <motion.path
            d="M25 15 C25 10, 30 5, 40 5 L60 5 C70 5, 75 10, 75 15 C75 20, 70 25, 60 25 L50 25 C45 25, 40 30, 40 35 C40 40, 45 45, 50 45 L55 45 C60 45, 65 50, 65 55 C65 60, 60 65, 55 65 L40 65 C30 65, 25 60, 25 50 C25 45, 30 40, 40 40 L50 40 C55 40, 60 35, 60 30 C60 25, 55 20, 50 20 L45 20 C35 20, 25 25, 25 35 L25 15 Z"
            fill="url(#logoGlow)"
            className="logo-glow"
          />
        )}

        {/* Main "S" letter path */}
        <motion.path
          d="M25 15 C25 10, 30 5, 40 5 L60 5 C70 5, 75 10, 75 15 C75 20, 70 25, 60 25 L50 25 C45 25, 40 30, 40 35 C40 40, 45 45, 50 45 L55 45 C60 45, 65 50, 65 55 C65 60, 60 65, 55 65 L40 65 C30 65, 25 60, 25 50 C25 45, 30 40, 40 40 L50 40 C55 40, 60 35, 60 30 C60 25, 55 20, 50 20 L45 20 C35 20, 25 25, 25 35 L25 15 Z"
          fill="url(#logoGradient)"
          filter="url(#logoShadow)"
          className="logo-letter"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Accent highlight on the "S" */}
        <motion.circle
          cx="65"
          cy="20"
          r="3"
          fill="url(#logoGradient)"
          opacity="0.8"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 1.5, duration: 0.6 }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default Logo;