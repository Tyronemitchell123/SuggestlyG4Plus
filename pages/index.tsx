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
      <main className="min-h-screen bg-black text-white font-sans overflow-hidden">
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 md:py-24">
          {/* Luxury gold beams background */}
          <div className="gold-beams" />

          <div className="relative z-10 text-center max-w-6xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(234,179,8,.25)]"
            >
              Suggestly Private
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl text-zinc-300 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Elite technology and investment infrastructure. Private access only.
            </motion.p>
            {/* Minimal luxury CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mx-auto max-w-xl mb-14"
            >
              <div className="glass rounded-2xl border-yellow-500/20">
                <div className="p-6 md:p-8 text-center">
                  <p className="text-zinc-300 mb-6">Access by invitation only</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/aurum-private">
                      <button className="w-full py-4 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-colors">
                        Request Invitation
                      </button>
                    </Link>
                    <Link href="/suggestly-ai">
                      <button className="w-full py-4 border border-yellow-500/40 text-yellow-300 font-semibold rounded-full hover:bg-yellow-500/10 transition-colors">
                        Explore Platform
                      </button>
                    </Link>
                  </div>
                </div>
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
                whileHover={{ scale: 1.02 }}
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
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 120, damping: 12 }}
                className="glass rounded-2xl p-8 border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-500"
              >
                <div className="text-4xl font-bold text-yellow-300 mb-4">SuggestlyG4Plus</div>
                <h3 className="text-2xl font-bold mb-4 text-white">Advanced AI Platform</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Next-generation AI platform with multi-agent intelligence,
                  IoT integration, voice AI, and computer vision capabilities.
                  Perfect for businesses and developers.
                </p>
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center text-gray-300">
                    <span className="text-yellow-400 mr-3">✓</span>
                    Multi-agent AI system
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-yellow-400 mr-3">✓</span>
                    IoT & Bluetooth integration
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-yellow-400 mr-3">✓</span>
                    Voice AI & computer vision
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-yellow-400 mr-3">✓</span>
                    Enterprise security
                  </div>
                </div>
                <Link href="/suggestly-ai">
                  <button className="w-full py-4 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-colors">
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
