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
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans">
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"
            animate={{ 
              backgroundPosition: ["0% 0%", "100% 100%"],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            >
              Suggestly
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed"
            >
              Choose your platform for the future of technology and investment
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {/* Aurum Private Card */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-yellow-900/50 to-black/50 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-8 hover:border-yellow-400/50 transition-all duration-300"
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
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300"
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
