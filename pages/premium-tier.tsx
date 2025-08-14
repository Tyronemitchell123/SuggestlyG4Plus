import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PremiumTierPage() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");
    setIsError(false);
    
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/apply-premium", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network error");
      setStatusMessage("Premium tier application submitted successfully. A director will contact you within 24 hours.");
      setIsError(false);
      e.currentTarget.reset();
    } catch (err) {
      setStatusMessage("Error submitting application. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Premium Tier - £25,000/year | Aurum Private</title>
        <meta name="description" content="Premium investment tier with AI-curated deals, automated networking, and 12-18% target returns. £25,000/year membership." />
        <meta property="og:title" content="Premium Tier - £25,000/year | Aurum Private" />
        <meta property="og:description" content="Premium investment tier with AI-curated deals and automated networking." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main id="main" className="bg-black text-white font-sans min-h-screen">
      <div className="min-h-screen">
        {/* Navigation */}
        <header>
          <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-yellow-500/20 p-4" aria-label="Main navigation">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <Link href="/" className="text-yellow-400 font-bold text-xl">Aurum Private</Link>
              <div className="flex space-x-6" role="navigation" aria-label="Secondary navigation">
                <Link href="/elite-tier" className="text-zinc-300 hover:text-yellow-400 transition-colors duration-200">
                  Elite Tier
                </Link>
                <Link href="/ultimate-tier" className="text-zinc-300 hover:text-yellow-400 transition-colors duration-200">
                  Ultimate Tier
                </Link>
                <Link href="/certificates" className="text-zinc-300 hover:text-yellow-400 transition-colors duration-200">
                  Certificates
                </Link>
              </div>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-4">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-yellow-900 via-black to-zinc-900"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          />
          
          <div className="relative max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <div className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-6 py-2 rounded-full font-semibold mb-6">
                Premium Tier
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6">
                £25,000/year
              </h1>
              <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-8">
                AI-curated premium deals with automated networking and relationship management. 
                Target returns of 12-18% annually with sophisticated AI-driven portfolio optimization.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">AI-Curated Premium Deals</h3>
                <p className="text-zinc-300">Advanced AI algorithms identify and curate exclusive investment opportunities specifically tailored to your risk profile and investment objectives.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">🌐</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Automated Quarterly Networking</h3>
                <p className="text-zinc-300">AI-powered networking events and introductions to high-value connections in the investment community, scheduled automatically.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">AI Relationship Management</h3>
                <p className="text-zinc-300">Intelligent relationship tracking and management systems ensure optimal engagement with key investment partners and opportunities.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">📈</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Automated Market Insights</h3>
                <p className="text-zinc-300">Real-time market analysis and insights delivered automatically, keeping you informed of opportunities and market movements.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">AI-Powered Priority Support</h3>
                <p className="text-zinc-300">Dedicated AI support system with priority response times and intelligent issue resolution for all your investment needs.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Automated Portfolio Tracking</h3>
                <p className="text-zinc-300">Comprehensive portfolio monitoring and reporting with automated alerts and performance analytics.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="relative py-16 px-4 bg-zinc-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-yellow-400 mb-12">Performance Metrics</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">12-18%</div>
                  <div className="text-zinc-400">Target Annual Returns</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
                  <div className="text-zinc-400">AI Monitoring</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">100%</div>
                  <div className="text-zinc-400">Automated</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Application Form */}
        <section className="relative py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 id="premium-form-title" className="text-3xl font-bold text-yellow-400 mb-8 text-center">
                Apply for Premium Tier
              </h2>
              
              {/* Status message for screen readers */}
              <div 
                aria-live={isError ? "assertive" : "polite"}
                aria-atomic="true"
                className={`mb-6 p-4 rounded-lg text-center ${
                  statusMessage 
                    ? isError 
                      ? 'bg-red-900/50 text-red-200 border border-red-700/50' 
                      : 'bg-green-900/50 text-green-200 border border-green-700/50'
                    : 'sr-only'
                }`}
                role={isError ? "alert" : "status"}
              >
                {statusMessage && statusMessage}
              </div>
              
              <form onSubmit={handleSubmit} className="bg-zinc-800 p-8 rounded-xl border border-yellow-500/30 space-y-6" aria-labelledby="premium-form-title">
                <div>
                  <label htmlFor="premium-name" className="block text-yellow-400 font-semibold mb-2">Full Name</label>
                  <input
                    id="premium-name"
                    name="name"
                    type="text"
                    required
                    className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="premium-email" className="block text-yellow-400 font-semibold mb-2">Email Address</label>
                  <input
                    id="premium-email"
                    name="email"
                    type="email"
                    required
                    className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="premium-company" className="block text-yellow-400 font-semibold mb-2">Company</label>
                  <input
                    id="premium-company"
                    name="company"
                    type="text"
                    className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="premium-objectives" className="block text-yellow-400 font-semibold mb-2">Investment Objectives</label>
                  <textarea
                    id="premium-objectives"
                    name="objectives"
                    rows={4}
                    required
                    className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
                    placeholder="Describe your investment goals and risk tolerance..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit Premium Application"}
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="relative py-16 px-4 bg-zinc-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-yellow-400 mb-8">Contact Information</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                  <div className="text-3xl mb-4">📧</div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">Email</h3>
                  <p className="text-zinc-300">info@aurumprivate.com</p>
                  <p className="text-zinc-400 text-sm mt-2">Primary contact for all inquiries</p>
                </div>
                
                <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                  <div className="text-3xl mb-4">🌐</div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">Website</h3>
                  <p className="text-zinc-300">www.aurumprivate.com</p>
                  <p className="text-zinc-400 text-sm mt-2">Full platform access</p>
                </div>
              </div>
              
              <div className="mt-8 text-zinc-400">
                <p>Response time: Within 24 hours for all Premium tier inquiries</p>
                <p>All communications are encrypted and secure</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      </main>
    </>
  );
}
