/**
 * Logo Component Demo Page
 * 
 * This page demonstrates the Logo component in various configurations
 * and serves as both a testing ground and showcase for the implementation.
 */

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Logo } from '../src/components/Logo';

export default function LogoDemo() {
  return (
    <>
      <Head>
        <title>Logo Component Demo - SuggestlyG4Plus</title>
        <meta name="description" content="Demonstration of the animated SuggestlyG4Plus logo component" />
      </Head>

      <main className="min-h-screen bg-slate-900 text-white">
        {/* Header */}
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Logo size={40} clickable />
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Logo Component Demo
                </h1>
              </div>
              <nav>
                <a href="/suggestly-ai" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Back to Main Site
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          
          {/* Hero Section */}
          <motion.section 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Logo size={120} variant="glow" className="mx-auto mb-8" />
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              SuggestlyG4Plus Logo
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              An animated SVG logo component built with React, TypeScript, and Framer Motion.
              Features gradient animations and interactive hover effects.
            </p>
          </motion.section>

          {/* Size Variants */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Size Variants</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              <div className="text-center">
                <Logo size={32} />
                <p className="mt-2 text-sm text-gray-400">Small (32px)</p>
              </div>
              <div className="text-center">
                <Logo size={48} />
                <p className="mt-2 text-sm text-gray-400">Medium (48px)</p>
              </div>
              <div className="text-center">
                <Logo size={64} />
                <p className="mt-2 text-sm text-gray-400">Default (64px)</p>
              </div>
              <div className="text-center">
                <Logo size={80} />
                <p className="mt-2 text-sm text-gray-400">Large (80px)</p>
              </div>
            </div>
          </motion.section>

          {/* Animation Variants */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Animation Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
              <div className="text-center">
                <Logo size={80} variant="default" />
                <p className="mt-2 text-sm text-gray-400">Default</p>
              </div>
              <div className="text-center">
                <Logo size={80} variant="pulse" />
                <p className="mt-2 text-sm text-gray-400">Pulse</p>
              </div>
              <div className="text-center">
                <Logo size={80} variant="glow" />
                <p className="mt-2 text-sm text-gray-400">Glow</p>
              </div>
            </div>
          </motion.section>

          {/* Interactive Examples */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Interactive Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center">
              <div className="text-center">
                <Logo size={80} clickable onClick={() => alert('Logo clicked!')} />
                <p className="mt-2 text-sm text-gray-400">Clickable Logo</p>
                <p className="text-xs text-gray-500">Click to test interaction</p>
              </div>
              <div className="text-center">
                <div className="flex items-center space-x-2 justify-center">
                  <Logo size={24} />
                  <span className="text-lg">Inline with text</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">Inline Usage</p>
              </div>
            </div>
          </motion.section>

          {/* Usage Examples */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Code Examples</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 text-purple-400">Basic Usage</h4>
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`// Basic logo
<Logo />

// Custom size
<Logo size={80} />

// With animation
<Logo variant="glow" />`}
                </pre>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 text-purple-400">Advanced Usage</h4>
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`// Clickable logo
<Logo 
  clickable 
  onClick={() => router.push('/')} 
/>

// Navigation logo
<Logo 
  size={40} 
  className="cursor-pointer" 
/>`}
                </pre>
              </div>
            </div>
          </motion.section>

          {/* Integration Examples */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Real-world Integration</h3>
            
            {/* Mock Navigation Bar */}
            <div className="bg-slate-800/30 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-semibold mb-4 text-purple-400">Navigation Bar Example</h4>
              <div className="bg-slate-800/50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Logo size={36} clickable />
                  <span className="font-semibold">SuggestlyG4Plus</span>
                </div>
                <nav className="flex space-x-6">
                  <a href="#" className="text-gray-300 hover:text-purple-400">Features</a>
                  <a href="#" className="text-gray-300 hover:text-purple-400">Pricing</a>
                  <a href="#" className="text-gray-300 hover:text-purple-400">Contact</a>
                </nav>
              </div>
            </div>

            {/* Mock Footer */}
            <div className="bg-slate-800/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-4 text-purple-400">Footer Example</h4>
              <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                <Logo size={40} className="mx-auto mb-4" />
                <p className="text-gray-400">© 2024 SuggestlyG4Plus. All rights reserved.</p>
              </div>
            </div>
          </motion.section>

        </div>
      </main>
    </>
  );
}