import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DocumentationPage() {
  const docSections = [
    {
      title: "Getting Started",
      description: "Quick start guide and basic setup",
      items: [
        { name: "Installation Guide", href: "#installation" },
        { name: "First Steps", href: "#first-steps" },
        { name: "Configuration", href: "#configuration" },
        { name: "Quick Examples", href: "#examples" }
      ]
    },
    {
      title: "AI Agents",
      description: "Complete guide to our AI agent system",
      items: [
        { name: "ANALYST Agent", href: "#analyst" },
        { name: "INTEL Agent", href: "#intel" },
        { name: "STRATEGIST Agent", href: "#strategist" },
        { name: "CREATOR Agent", href: "#creator" },
        { name: "OPTIMIZER Agent", href: "#optimizer" },
        { name: "SECURITY Agent", href: "#security" },
        { name: "NEXUS-ULTRA Agent", href: "#nexus-ultra" }
      ]
    },
    {
      title: "IoT Integration",
      description: "Connect and manage IoT devices",
      items: [
        { name: "Bluetooth Setup", href: "#bluetooth" },
        { name: "Device Pairing", href: "#pairing" },
        { name: "Data Collection", href: "#data-collection" },
        { name: "Smart Home Integration", href: "#smart-home" }
      ]
    },
    {
      title: "Voice AI",
      description: "Speech recognition and synthesis",
      items: [
        { name: "Voice Commands", href: "#voice-commands" },
        { name: "Text-to-Speech", href: "#tts" },
        { name: "Emotion Detection", href: "#emotion" },
        { name: "Multi-language Support", href: "#multilang" }
      ]
    },
    {
      title: "Computer Vision",
      description: "Image and video processing",
      items: [
        { name: "Object Detection", href: "#object-detection" },
        { name: "Facial Recognition", href: "#facial-recognition" },
        { name: "OCR Capabilities", href: "#ocr" },
        { name: "Augmented Reality", href: "#ar" }
      ]
    },
    {
      title: "API Reference",
      description: "Complete API documentation",
      items: [
        { name: "Authentication", href: "#auth" },
        { name: "Endpoints", href: "#endpoints" },
        { name: "Rate Limits", href: "#rate-limits" },
        { name: "Error Handling", href: "#errors" }
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Documentation - SuggestlyG4Plus</title>
        <meta name="description" content="Complete documentation for SuggestlyG4Plus AI platform including API reference, guides, and examples." />
        <meta property="og:title" content="Documentation - SuggestlyG4Plus" />
        <meta property="og:description" content="Complete documentation for SuggestlyG4Plus AI platform." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/suggestly-ai" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SuggestlyG4Plus
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/suggestly-ai" className="text-gray-300 hover:text-purple-400 transition-colors">Home</Link>
                <Link href="/suggestly-ai/docs" className="text-purple-400">Docs</Link>
                <Link href="/suggestly-ai/api" className="text-gray-300 hover:text-purple-400 transition-colors">API</Link>
                <Link href="/suggestly-ai/examples" className="text-gray-300 hover:text-purple-400 transition-colors">Examples</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Documentation
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Everything you need to build powerful AI applications with SuggestlyG4Plus
            </motion.p>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full p-4 pl-12 bg-slate-800/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {docSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/40 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold mb-3 text-white">{section.title}</h3>
                  <p className="text-gray-300 mb-6">{section.description}</p>
                  
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-purple-400 hover:text-purple-300 transition-colors flex items-center"
                        >
                          <span className="mr-2">→</span>
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start Guide */}
        <section className="py-16 px-4 bg-slate-800/30">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Quick Start Guide
              </h2>
              <p className="text-xl text-gray-300">
                Get up and running with SuggestlyG4Plus in minutes
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8"
            >
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Install the SDK</h3>
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                      <span className="text-green-400">npm install</span> suggestlyg4plus-sdk
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Initialize the Platform</h3>
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                      <span className="text-blue-400">import</span> <span className="text-yellow-400">{'{'}</span> SuggestlyG4Plus <span className="text-yellow-400">{'}'}</span> <span className="text-blue-400">from</span> <span className="text-green-400">'suggestlyg4plus-sdk'</span>;<br/>
                      <br/>
                      <span className="text-blue-400">const</span> suggestly = <span className="text-blue-400">new</span> SuggestlyG4Plus(<span className="text-green-400">'your-api-key'</span>);
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Start Using AI Agents</h3>
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                      <span className="text-blue-400">const</span> result = <span className="text-blue-400">await</span> suggestly.analyst.analyze(<span className="text-green-400">'Your data here'</span>);<br/>
                      <span className="text-blue-400">console</span>.<span className="text-yellow-400">log</span>(result);
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-purple-500/20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              SuggestlyG4Plus
            </div>
            <p className="text-gray-400 mb-6">
              © 2024 SuggestlyG4Plus. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/suggestly-ai" className="text-gray-400 hover:text-purple-400 transition-colors">Home</Link>
              <Link href="/suggestly-ai/docs" className="text-purple-400">Documentation</Link>
              <Link href="/suggestly-ai/api" className="text-gray-400 hover:text-purple-400 transition-colors">API</Link>
              <Link href="/suggestly-ai/examples" className="text-gray-400 hover:text-purple-400 transition-colors">Examples</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
