/**
 * Logo Test Page
 * 
 * This page demonstrates the Logo component functionality and animations.
 * It shows different sizes, with and without animations, and integration with Framer Motion.
 */

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Logo from '../src/components/Logo';

export default function LogoTestPage() {
  const handleLogoClick = () => {
    console.log('Logo clicked!');
  };

  return (
    <>
      <Head>
        <title>Logo Component Test - SuggestlyG4Plus</title>
        <meta name="description" content="Test page for the animated SVG Logo component" />
      </Head>
      
      <main className="min-h-screen bg-black text-white">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
        
        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Logo Component Test
            </h1>
            <p className="text-gray-300 text-lg">
              Testing the animated SVG Logo component with different configurations
            </p>
          </motion.div>

          {/* Logo Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            
            {/* Small Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 text-center"
            >
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Small</h3>
              <div className="flex justify-center mb-4">
                <Logo size="sm" onClick={handleLogoClick} />
              </div>
              <p className="text-sm text-gray-400">32x32px</p>
            </motion.div>

            {/* Medium Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 text-center"
            >
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Medium</h3>
              <div className="flex justify-center mb-4">
                <Logo size="md" onClick={handleLogoClick} />
              </div>
              <p className="text-sm text-gray-400">48x48px (default)</p>
            </motion.div>

            {/* Large Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 text-center"
            >
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Large</h3>
              <div className="flex justify-center mb-4">
                <Logo size="lg" onClick={handleLogoClick} />
              </div>
              <p className="text-sm text-gray-400">64x64px</p>
            </motion.div>

            {/* Extra Large Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 text-center"
            >
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Extra Large</h3>
              <div className="flex justify-center mb-4">
                <Logo size="xl" onClick={handleLogoClick} />
              </div>
              <p className="text-sm text-gray-400">80x80px</p>
            </motion.div>
          </div>

          {/* Special Configurations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            
            {/* Non-animated Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 text-center"
            >
              <h3 className="text-xl font-semibold mb-4 text-purple-300">Static (No Animation)</h3>
              <div className="flex justify-center mb-4">
                <Logo size="lg" animated={false} />
              </div>
              <p className="text-sm text-gray-400">For performance-critical scenarios</p>
            </motion.div>

            {/* Custom Styled Logo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 text-center"
            >
              <h3 className="text-xl font-semibold mb-4 text-purple-300">Custom Styling</h3>
              <div className="flex justify-center mb-4">
                <Logo 
                  size="lg" 
                  className="border-2 border-pink-400/30 rounded-full p-2" 
                  onClick={handleLogoClick}
                />
              </div>
              <p className="text-sm text-gray-400">With custom className</p>
            </motion.div>
          </div>

          {/* Integration Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8"
          >
            <h3 className="text-2xl font-semibold mb-6 text-purple-300">Integration Examples</h3>
            
            {/* Navigation Bar Example */}
            <div className="mb-8">
              <h4 className="text-lg font-medium mb-4 text-white">Navigation Bar</h4>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Logo size="md" onClick={handleLogoClick} />
                  <span className="text-xl font-bold text-white">SuggestlyG4Plus</span>
                </div>
                <nav className="hidden md:flex space-x-6">
                  <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Features</a>
                  <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Pricing</a>
                  <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">Contact</a>
                </nav>
              </div>
            </div>

            {/* Hero Section Example */}
            <div className="mb-8">
              <h4 className="text-lg font-medium mb-4 text-white">Hero Section</h4>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
                <div className="flex justify-center mb-6">
                  <Logo size="xl" onClick={handleLogoClick} />
                </div>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Welcome to SuggestlyG4Plus
                </h2>
                <p className="text-gray-300">
                  Advanced AI platform with multi-agent intelligence
                </p>
              </div>
            </div>

            {/* Footer Example */}
            <div>
              <h4 className="text-lg font-medium mb-4 text-white">Footer</h4>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Logo size="sm" />
                  <span className="text-lg font-semibold text-white">SuggestlyG4Plus</span>
                </div>
                <p className="text-center text-gray-400 text-sm">
                  © 2024 SuggestlyG4Plus. All rights reserved.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Usage Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8"
          >
            <h3 className="text-2xl font-semibold mb-6 text-purple-300">Usage Instructions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium mb-3 text-white">Basic Import</h4>
                <pre className="bg-gray-800 border border-gray-700 rounded p-4 text-sm text-green-400 overflow-x-auto">
{`import Logo from '@/components/Logo';

// Basic usage
<Logo />

// With size
<Logo size="lg" />

// With click handler
<Logo onClick={() => handleClick()} />`}
                </pre>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-3 text-white">Advanced Usage</h4>
                <pre className="bg-gray-800 border border-gray-700 rounded p-4 text-sm text-green-400 overflow-x-auto">
{`// Custom styling
<Logo 
  size="xl" 
  className="custom-class"
  animated={false}
  ariaLabel="Custom label"
/>

// Integration with Framer Motion
<motion.div
  whileHover={{ scale: 1.1 }}
>
  <Logo size="md" />
</motion.div>`}
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}