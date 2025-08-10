import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function EliteTierPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/apply-elite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network error");
      alert("Elite tier application submitted. A director will contact you within 12 hours.");
      e.currentTarget.reset();
    } catch (err) {
      alert("Error submitting application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Elite Tier - £50,000/year | Aurum Private</title>
        <meta name="description" content="Elite investment tier with AI-driven founder access, 24/7 AI concierge, and 15-25% target returns. £50,000/year membership." />
        <meta property="og:title" content="Elite Tier - £50,000/year | Aurum Private" />
        <meta property="og:description" content="Elite investment tier with AI-driven founder access and 24/7 AI concierge service." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="bg-black text-white font-sans min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-yellow-500/20 p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-yellow-400 font-bold text-xl">Aurum Private</Link>
            <div className="flex space-x-6">
              <Link href="/premium-tier" className="text-zinc-300 hover:text-yellow-400 transition-colors duration-200">
                Premium Tier
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
                Elite Tier
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6">
                £50,000/year
              </h1>
              <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-8">
                Complete AI automation with founder access, private networking, and family office services. 
                Target returns of 15-25% annually with exclusive global opportunities.
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
                <div className="text-3xl mb-4">👑</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">All Premium Benefits</h3>
                <p className="text-zinc-300">Complete access to all Premium tier features including AI-curated deals, automated networking, and portfolio management.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">AI-Driven Founder Access</h3>
                <p className="text-zinc-300">Direct access to startup founders and entrepreneurs through AI-powered introductions and exclusive networking events.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">🌐</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Automated Private Networking</h3>
                <p className="text-zinc-300">Exclusive private networking events and introductions to ultra-high-net-worth individuals and institutional investors.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">24/7 AI Concierge Service</h3>
                <p className="text-zinc-300">Round-the-clock AI concierge service for all your investment needs, inquiries, and portfolio management requests.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">💎</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Automated Exclusive Deal Flow</h3>
                <p className="text-zinc-300">Priority access to exclusive investment opportunities before they become available to other investors.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">🏢</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">AI Family Office Services</h3>
                <p className="text-zinc-300">Comprehensive family office services including wealth management, estate planning, and multi-generational wealth preservation.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Automated Global Opportunities</h3>
                <p className="text-zinc-300">Access to international investment opportunities across all major markets and emerging economies.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Complete AI Automation</h3>
                <p className="text-zinc-300">Full automation of all investment processes, from deal sourcing to execution and portfolio management.</p>
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
                  <div className="text-4xl font-bold text-yellow-400 mb-2">15-25%</div>
                  <div className="text-zinc-400">Target Annual Returns</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
                  <div className="text-zinc-400">AI Concierge</div>
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
              <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
                Apply for Elite Tier
              </h2>
              
              <form onSubmit={handleSubmit} className="bg-zinc-800 p-8 rounded-xl border border-yellow-500/30 space-y-6">
                <div>
                  <label className="block text-yellow-400 font-semibold mb-2">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-yellow-400 font-semibold mb-2">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-yellow-400 font-semibold mb-2">Company</label>
                  <input
                    name="company"
                    type="text"
                    className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-yellow-400 font-semibold mb-2">Net Worth Range</label>
                  <select
                    name="netWorth"
                    required
                    className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
                  >
                    <option value="">Select net worth range</option>
                    <option value="1-5m">£1M - £5M</option>
                    <option value="5-10m">£5M - £10M</option>
                    <option value="10-25m">£10M - £25M</option>
                    <option value="25-50m">£25M - £50M</option>
                    <option value="50m+">£50M+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-yellow-400 font-semibold mb-2">Investment Objectives</label>
                  <textarea
                    name="objectives"
                    rows={4}
                    required
                    className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
                    placeholder="Describe your investment goals, risk tolerance, and specific areas of interest..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit Elite Application"}
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
                <p>Response time: Within 12 hours for all Elite tier inquiries</p>
                <p>All communications are encrypted and secure</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
