import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function EliteMembershipSite() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network error");
      alert("Application submitted. A director will contact you.");
      e.currentTarget.reset();
    } catch (err) {
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Aurum Private – £50,000/yr Elite Membership</title>
        <meta name="description" content="Private infrastructure for the ultra‑high‑impact. By invitation only." />
        <meta property="og:title" content="Aurum Private – £50,000/yr Elite Membership" />
        <meta property="og:description" content="Private infrastructure for the ultra‑high‑impact. By invitation only." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black text-white font-sans">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-yellow-500/20 p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="text-yellow-400 font-bold text-xl">Aurum Private</div>
            <Link href="/certificates" className="text-zinc-300 hover:text-yellow-400 transition-colors duration-200">
              Certificates & Compliance
            </Link>
          </div>
        </nav>
        
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-yellow-900 via-black to-zinc-900"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          />

          {/* Animated logo / title */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative text-6xl font-bold text-yellow-400 mb-6 text-center drop-shadow-lg tracking-wide"
          >
            Aurum Private
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative max-w-xl text-center text-zinc-300 mb-10 text-lg leading-relaxed"
          >
            £50,000/year membership. Guaranteed access, certainty, and execution for the ultra‑high‑impact.
          </motion.p>

          {/* Animated form */}
          <motion.form
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onSubmit={handleSubmit}
            className="relative bg-zinc-800 p-8 rounded-xl w-full max-w-lg space-y-6 shadow-2xl border border-yellow-500/30 backdrop-blur-sm"
          >
            <input
              name="name"
              placeholder="Full Name"
              className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
              required
            />
            <textarea
              name="message"
              placeholder="Mandate / Objective"
              rows={5}
              className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-full transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Request Invitation"}
            </button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="relative mt-6 text-xs text-zinc-400 max-w-sm text-center leading-relaxed"
          >
            All submissions are encrypted and stored securely. Your details will only be accessed by an Aurum Private director.
          </motion.p>

          {/* Subscription Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="relative mt-12 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">Investment Tiers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Premium Tier */}
              <div className="bg-zinc-800/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Premium</h3>
                <div className="text-2xl font-bold text-yellow-400 mb-2">£50,000</div>
                <div className="text-zinc-400 text-sm mb-4">per year</div>
                <ul className="text-sm text-zinc-300 space-y-2 mb-6 text-left">
                  <li>• Private equity access</li>
                  <li>• Quarterly networking events</li>
                  <li>• Market intelligence reports</li>
                  <li>• Dedicated relationship manager</li>
                </ul>
                <button className="w-full py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/30 transition-colors">
                  Apply for Premium
                </button>
              </div>

              {/* Elite Tier */}
              <div className="bg-zinc-800/50 backdrop-blur-sm border-2 border-yellow-500 rounded-xl p-6 text-center relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
                  ELITE
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Elite</h3>
                                    <div className="text-2xl font-bold text-yellow-400 mb-2">£50,000</div>
                <div className="text-zinc-400 text-sm mb-4">per year</div>
                <ul className="text-sm text-zinc-300 space-y-2 mb-6 text-left">
                  <li>• Everything in Premium</li>
                  <li>• Exclusive deal flow</li>
                  <li>• Direct access to founders</li>
                  <li>• Custom investment vehicles</li>
                  <li>• 24/7 concierge service</li>
                </ul>
                <button className="w-full py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors">
                  Request Invitation
                </button>
              </div>

              {/* Ultra Tier */}
              <div className="bg-zinc-800/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Ultra</h3>
                <div className="text-2xl font-bold text-yellow-400 mb-2">£2,000,000</div>
                <div className="text-zinc-400 text-sm mb-4">per year</div>
                <ul className="text-sm text-zinc-300 space-y-2 mb-6 text-left">
                  <li>• Everything in Elite</li>
                  <li>• Co-investment opportunities</li>
                  <li>• Board seat access</li>
                  <li>• Private jet networking</li>
                  <li>• Family office services</li>
                </ul>
                <button className="w-full py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/30 transition-colors">
                  Contact Director
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
