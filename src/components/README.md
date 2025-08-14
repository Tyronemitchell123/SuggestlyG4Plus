# SuggestlyG4Plus Animated Logo Component

## Overview
This directory contains the animated SVG logo component for the SuggestlyG4Plus project, featuring an elegant letter "S" with premium gradients and smooth animations.

## Files
- `Logo.tsx` - Main React component with TypeScript support
- `Logo.module.css` - CSS Module with animations and responsive styles
- `index.ts` - Export helper for clean imports

## Component Features

### Visual Design
- **SVG Letter "S"**: Clean, elegant design representing the SuggestlyG4Plus brand
- **Premium Gradients**: Uses aurum gold (#fde047, #fbbf24, #f59e0b) and suggestly colors (#7877c6, #ff77c6, #78dbff)
- **Multiple Layers**: Background glow, main stroke, and subtle fill effects
- **Responsive Scaling**: Maintains crisp appearance at any size

### Animations
- **Floating Effect**: Subtle 6-second floating animation with gentle rotation
- **Glow Pulse**: Background glow that pulses every 4 seconds
- **Stroke Effects**: Dynamic stroke width and shimmer effects
- **Hover Interactions**: Enhanced effects on mouse hover

### Accessibility
- **Reduced Motion Support**: Respects `prefers-reduced-motion` CSS setting
- **Focus States**: Proper keyboard navigation support
- **ARIA Labels**: Screen reader accessible
- **High Contrast**: Supports high contrast mode

### Technical Features
- **TypeScript**: Full type safety with proper prop interfaces
- **CSS Modules**: Scoped styling to prevent conflicts
- **Performance**: Optimized animations for smooth 60fps performance
- **Mobile Optimized**: Battery-friendly animations on mobile devices

## Usage

### Basic Usage
```tsx
import Logo from '../src/components';

// Default logo (120px, animated)
<Logo />
```

### Advanced Usage
```tsx
// Custom size
<Logo size={160} />

// Disable animations (for reduced motion users)
<Logo animate={false} />

// With custom CSS classes
<Logo className="my-custom-class" size={150} />

// Combined props
<Logo 
  size={120} 
  className="header-logo" 
  animate={true} 
/>
```

### Props Interface
```tsx
interface LogoProps {
  size?: number;        // Logo size in pixels (default: 120)
  className?: string;   // Additional CSS classes
  animate?: boolean;    // Enable/disable animations (default: true)
}
```

## Integration Examples

### Homepage Header
```tsx
import Logo from '../src/components';
import { useReducedMotion } from 'framer-motion';

function HomePage() {
  const reduceMotion = useReducedMotion();
  
  return (
    <header>
      <Logo size={160} animate={!reduceMotion} />
      <h1>SuggestlyG4Plus</h1>
    </header>
  );
}
```

### Navigation Bar
```tsx
<nav className="navbar">
  <Logo size={80} className="navbar-logo" />
  <ul>...</ul>
</nav>
```

### Loading Screen
```tsx
<div className="loading-screen">
  <Logo size={200} />
  <p>Loading...</p>
</div>
```

## Browser Support
- **Modern Browsers**: Full support with animations
- **Older Browsers**: Graceful fallback without animations
- **Mobile**: Optimized performance and battery usage
- **Print**: Static version for print media

## Performance Notes
- Uses CSS animations instead of JavaScript for optimal performance
- GPU-accelerated transforms for smooth animations
- Optimized for 60fps on all supported devices
- Minimal bundle size impact

## Maintenance
- Color values can be updated in the CSS Module gradients
- Animation timing can be adjusted in keyframes
- SVG paths can be modified for design changes
- All changes maintain backward compatibility

## Color Scheme
The logo uses the official SuggestlyG4Plus color palette:

### Aurum Gold Gradient
- `#fde047` (Light Gold)
- `#fbbf24` (Medium Gold) 
- `#f59e0b` (Dark Gold)

### Suggestly Accent Gradient
- `#7877c6` (Purple)
- `#ff77c6` (Pink)
- `#78dbff` (Blue)

## File Structure
```
src/components/
├── Logo.tsx              # Main component
├── Logo.module.css       # Scoped styles
└── index.ts             # Export helper
```

This component is production-ready and fully integrated into the SuggestlyG4Plus application.