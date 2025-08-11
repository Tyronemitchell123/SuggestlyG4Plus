import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Suggestly - Choose Your Platform</title>
        <meta name="description" content="Choose between Aurum Private elite membership or SuggestlyG4Plus AI platform." />
        <meta property="og:title" content="Suggestly - Choose Your Platform" />
        <meta property="og:description" content="Choose between Aurum Private elite membership or SuggestlyG4Plus AI platform." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-slate-950 text-white font-sans overflow-hidden">
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 md:py-24">
          {/* Gradient beams background */}
          <div className="beams" />

          {/* Floating gradient orbs */}
          <motion.div
            className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 blur-3xl hidden sm:block"
            animate={{ x: [0, 20, -10, 0], y: [0, -10, 10, 0], opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-3xl hidden sm:block"
            animate={{ x: [0, -15, 10, 0], y: [0, 15, -10, 0], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 text-center max-w-6xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-fuchsia-300 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,.35)]"
            >
              Suggestly
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-300 mb-10 md:mb-16 max-w-3xl mx-auto leading-relaxed"
            >
              Choose your platform for the future of technology and investment
            </motion.p>

            {/* Premium mirror code preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mx-auto max-w-5xl mb-16"
            >
              <div className="relative glass rounded-2xl gradient-border overflow-hidden">
                <div className="p-4 md:p-8">
                  <div className="flex items-center space-x-2 mb-4 opacity-70">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80" />
                    <span className="ml-3 text-xs text-gray-400">Live Preview</span>
                  </div>
                  <pre className="text-left text-xs sm:text-sm md:text-base leading-relaxed text-purple-100/90 overflow-auto">
{`const platform = new SuggestlyG4Plus({
  agents: ['Analyst', 'Strategist', 'Optimizer'],
  security: 'Enterprise',
  effects: 'Ultra-Premium Motion'
})`}
                  </pre>
                </div>
              </div>
              <div className="relative mt-2 hidden md:block">
                <div className="reflection glass rounded-2xl">
                  <div className="p-5 md:p-8 opacity-50">
                    <pre className="text-left text-sm md:text-base text-purple-100/40 overflow-auto">
{`const platform = new SuggestlyG4Plus({ ... })`}
                    </pre>
                  </div>
                </div>
                <div className="fade-overlay rounded-2xl" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
              {/* Aurum Private Card */}
              <motion.div
                whileHover={{ scale: 1.03, rotateX: 2, rotateY: -2 }}
                transition={{ type: 'spring', stiffness: 120, damping: 12 }}
                className="glass rounded-2xl p-8 border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-500"
              >
                <div className="text-4xl font-bold text-yellow-400 mb-4">Aurum Private</div>
                <h3 className="text-2xl font-bold mb-4 text-white">Elite Investment Platform</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  £50,000/year membership for ultra-high-net-worth individuals.
                  Private infrastructure, exclusive networking, and guaranteed access
                  to the world's most sophisticated investment opportunities.
                </p>
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center text-gray-300">
                    <span className="text-yellow-400 mr-3">✓</span>
                    Private equity access
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-yellow-400 mr-3">✓</span>
                    Exclusive networking
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-yellow-400 mr-3">✓</span>
                    Global market intelligence
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-yellow-400 mr-3">✓</span>
                    Secure infrastructure
                  </div>
                </div>
                <Link href="/aurum-private">
                  <button className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-full transition-colors duration-200">
                    Request Invitation
                  </button>
                </Link>
              </motion.div>

              {/* SuggestlyG4Plus Card */}
              <motion.div
                whileHover={{ scale: 1.03, rotateX: -2, rotateY: 2 }}
                transition={{ type: 'spring', stiffness: 120, damping: 12 }}
                className="glass rounded-2xl p-8 border-purple-500/20 hover:border-purple-400/40 transition-all duration-500"
              >
                <div className="text-4xl font-bold text-purple-400 mb-4">SuggestlyG4Plus</div>
                <h3 className="text-2xl font-bold mb-4 text-white">Advanced AI Platform</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Next-generation AI platform with multi-agent intelligence,
                  IoT integration, voice AI, and computer vision capabilities.
                  Perfect for businesses and developers.
                </p>
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center text-gray-300">
                    <span className="text-purple-400 mr-3">✓</span>
                    Multi-agent AI system
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-purple-400 mr-3">✓</span>
                    IoT & Bluetooth integration
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-purple-400 mr-3">✓</span>
                    Voice AI & computer vision
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-purple-400 mr-3">✓</span>
                    Enterprise security
                  </div>
                </div>
                <Link href="/suggestly-ai">
                  <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-full transition-all duration-200">
                    Get Started
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-12 text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Both platforms are powered by cutting-edge technology and designed for
              the highest levels of performance, security, and user experience.
            </motion.p>
          </div>
        </div>
      </main>
    </>
  );
}
