// Motion Wrapper - Safe framer-motion handling
// This utility prevents initialization errors with framer-motion

import React from 'react';

// Safe motion import with fallback
let motion = null;
let AnimatePresence = null;

try {
  const framerMotion = require('framer-motion');
  motion = framerMotion.motion;
  AnimatePresence = framerMotion.AnimatePresence;
} catch (error) {
  console.warn('Framer Motion not available, using fallback components');

  // Fallback motion component
  motion = {
    div: React.forwardRef((props, ref) => {
      const { initial, animate, transition, ...rest } = props;
      return <div ref={ref} {...rest} />;
    }),
    span: React.forwardRef((props, ref) => {
      const { initial, animate, transition, ...rest } = props;
      return <span ref={ref} {...rest} />;
    }),
    button: React.forwardRef((props, ref) => {
      const { initial, animate, transition, ...rest } = props;
      return <button ref={ref} {...rest} />;
    }),
    img: React.forwardRef((props, ref) => {
      const { initial, animate, transition, ...rest } = props;
      return <img ref={ref} {...rest} />;
    }),
    svg: React.forwardRef((props, ref) => {
      const { initial, animate, transition, ...rest } = props;
      return <svg ref={ref} {...rest} />;
    }),
    path: React.forwardRef((props, ref) => {
      const { initial, animate, transition, ...rest } = props;
      return <path ref={ref} {...rest} />;
    }),
    circle: React.forwardRef((props, ref) => {
      const { initial, animate, transition, ...rest } = props;
      return <circle ref={ref} {...rest} />;
    }),
    rect: React.forwardRef((props, ref) => {
      const { initial, animate, transition, ...rest } = props;
      return <rect ref={ref} {...rest} />;
    }),
    g: React.forwardRef((props, ref) => {
      const { initial, animate, transition, ...rest } = props;
      return <g ref={ref} {...rest} />;
    }),
    // Add more elements as needed
  };

  // Fallback AnimatePresence
  AnimatePresence = ({ children }) => <>{children}</>;
}

// Safe motion hook
export const useSafeMotion = () => {
  return {
    motion,
    AnimatePresence,
    isAvailable: motion !== null,
  };
};

// Safe motion component wrapper
export const SafeMotion = ({ children, fallback = null }) => {
  if (!motion) {
    return fallback || children;
  }
  return children;
};

// Export motion and AnimatePresence for direct use
export { motion, AnimatePresence };

// Default export
export default {
  motion,
  AnimatePresence,
  useSafeMotion,
  SafeMotion,
};

