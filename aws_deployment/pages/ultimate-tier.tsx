import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function UltimateTierPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/apply-ultimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network error");
      alert("Ultimate tier application submitted. A director will contact you within 6 hours.");
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
        <title>Ultimate Tier - £100,000/year | Aurum Private</title>
        <meta name="description" content="Ultimate investment tier with AI co-investment opportunities, board seat access, and 18-30% target returns. £100,000/year membership." />
        <meta property="og:title" content="Ultimate Tier - £100,000/year | Aurum Private" />
        <meta property="og:description" content="Ultimate investment tier with AI co-investment opportunities and board seat access." />
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
              <Link href="/elite-tier" className="text-zinc-300 hover:text-yellow-400 transition-colors duration-200">
                Elite Tier
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
                Ultimate Tier
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6">
                £100,000/year
              </h1>
              <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-8">
                The pinnacle of AI-powered investing with co-investment opportunities, board seat access, 
                and custom investment vehicles. Target returns of 18-30% annually with complete automation suite.
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
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">All Elite Benefits</h3>
                <p className="text-zinc-300">Complete access to all Elite tier features including founder access, 24/7 AI concierge, and family office services.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">AI Co-Investment Opportunities</h3>
                <p className="text-zinc-300">Direct co-investment opportunities alongside Aurum Private's AI systems in exclusive deals and ventures.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">🪑</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Automated Board Seat Access</h3>
                <p className="text-zinc-300">AI-facilitated board seat opportunities in portfolio companies and strategic advisory positions.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">🏗️</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">AI Custom Investment Vehicles</h3>
                <p className="text-zinc-300">Tailored investment structures and vehicles designed specifically for your unique investment objectives.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Automated Global Network Access</h3>
                <p className="text-zinc-300">Unrestricted access to our global network of ultra-high-net-worth individuals, institutions, and exclusive opportunities.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">AI-Driven Exclusive Events</h3>
                <p className="text-zinc-300">Invitation-only events, summits, and exclusive gatherings with the world's most influential investors and entrepreneurs.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Complete Automation Suite</h3>
                <p className="text-zinc-300">Full automation of all investment processes with advanced AI systems handling every aspect of your portfolio.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">🔮</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Predictive AI Insights</h3>
                <p className="text-zinc-300">Advanced predictive analytics and market insights using cutting-edge AI models and proprietary algorithms.</p>
              </div>
              
              <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                <div className="text-3xl mb-4">🎪</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">VIP Treatment</h3>
                <p className="text-zinc-300">Ultimate VIP treatment with priority access, dedicated AI assistants, and white-glove service for all your needs.</p>
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
                  <div className="text-4xl font-bold text-yellow-400 mb-2">18-30%</div>
                  <div className="text-zinc-400">Target Annual Returns</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
                  <div className="text-zinc-400">VIP Support</div>
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
                Apply for Ultimate Tier
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
                    <option value="10-25m">£10M - £25M</option>
                    <option value="25-50m">£25M - £50M</option>
                    <option value="50-100m">£50M - £100M</option>
                    <option value="100m+">£100M+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-yellow-400 font-semibold mb-2">Investment Experience</label>
                  <select
                    name="experience"
                    required
                    className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
                  >
                    <option value="">Select experience level</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10-20">10-20 years</option>
                    <option value="20+">20+ years</option>
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
                  {loading ? "Submitting..." : "Submit Ultimate Application"}
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
                <p>Response time: Within 6 hours for all Ultimate tier inquiries</p>
                <p>All communications are encrypted and secure</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
