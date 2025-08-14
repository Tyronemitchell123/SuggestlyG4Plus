import React from 'react';
import styles from './Logo.module.css';

interface LogoProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

/**
 * Animated SVG Logo Component for SuggestlyG4Plus
 * 
 * Usage Examples:
 * 
 * 1. Basic usage with default size and animation:
 *    <Logo />
 * 
 * 2. Custom size (default is 120px):
 *    <Logo size={80} />
 * 
 * 3. With custom CSS classes:
 *    <Logo className="my-custom-class" />
 * 
 * 4. Disable animation for reduced motion users:
 *    <Logo animate={false} />
 * 
 * 5. Combination of props:
 *    <Logo size={150} className="header-logo" animate={true} />
 * 
 * Features:
 * - Responsive SVG that scales cleanly
 * - Gradient colors matching the SuggestlyG4Plus brand (aurum gold + suggestly colors)
 * - Smooth CSS animations with proper reduced motion support
 * - TypeScript support with proper prop types
 * - Accessible with proper ARIA labels
 */
const Logo: React.FC<LogoProps> = ({ 
  size = 120, 
  className = '', 
  animate = true 
}) => {
  const logoClasses = `
    suggestly-logo 
    ${animate ? 'animate' : 'no-animate'} 
    ${className}
  `.trim();

  return (
    <div className={logoClasses} style={{ width: size, height: size }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="SuggestlyG4Plus Logo"
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7877c6" />
            <stop offset="50%" stopColor="#ff77c6" />
            <stop offset="100%" stopColor="#78dbff" />
          </linearGradient>
          
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background Glow Circle */}
        <circle
          cx="60"
          cy="60"
          r="55"
          fill="url(#glowGradient)"
          className="logo-glow"
        />

        {/* Main "S" Letter Path */}
        <path
          d="M 35 25 
             C 25 25, 20 30, 20 40
             C 20 50, 25 55, 35 55
             L 65 55
             C 75 55, 80 60, 80 70
             C 80 80, 75 85, 65 85
             L 45 85
             C 40 85, 35 82, 35 77
             
             M 35 95
             C 45 95, 50 90, 50 80
             C 50 70, 45 65, 35 65
             L 85 65
             C 95 65, 100 60, 100 50
             C 100 40, 95 35, 85 35
             L 65 35
             C 60 35, 55 38, 55 43"
          stroke="url(#goldGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="logo-stroke"
        />

        {/* Enhanced "S" Letter with Fill */}
        <path
          d="M 30 30
             Q 25 25, 35 25
             L 75 25
             Q 85 25, 85 35
             Q 85 45, 75 45
             L 45 45
             Q 35 45, 35 55
             Q 35 65, 45 65
             L 75 65
             Q 85 65, 85 75
             Q 85 85, 75 85
             L 35 85
             Q 25 85, 25 95
             Q 25 75, 35 75
             L 65 75
             Q 75 75, 75 65
             Q 75 55, 65 55
             L 35 55
             Q 25 55, 25 45
             Q 25 35, 35 35
             L 65 35
             Q 75 35, 75 25"
          fill="url(#purpleGradient)"
          className="logo-fill"
          opacity="0.1"
        />

        {/* Simplified Premium "S" */}
        <path
          d="M 85 35
             C 85 25, 75 20, 65 20
             L 40 20
             C 30 20, 25 25, 25 35
             C 25 45, 30 50, 40 50
             L 65 50
             C 70 50, 75 55, 75 60
             C 75 65, 70 70, 65 70
             L 50 70
             
             M 35 85
             C 35 95, 45 100, 55 100
             L 80 100
             C 90 100, 95 95, 95 85
             C 95 75, 90 70, 80 70
             L 55 70
             C 50 70, 45 65, 45 60
             C 45 55, 50 50, 55 50
             L 70 50"
          stroke="url(#goldGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className={styles.logoMain}
        />
      </svg>
    </div>
  );
};

export default Logo;