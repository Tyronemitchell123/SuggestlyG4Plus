import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network error");
      setStatusMessage("Message sent successfully. We'll respond within 24 hours.");
      setIsError(false);
      e.currentTarget.reset();
    } catch (err) {
      setStatusMessage("Error sending message. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - Aurum Private</title>
        <meta name="description" content="Contact Aurum Private for elite investment opportunities and AI-powered wealth management services." />
        <meta property="og:title" content="Contact Us - Aurum Private" />
        <meta property="og:description" content="Contact Aurum Private for elite investment opportunities." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main id="main" className="bg-black text-white font-sans min-h-screen">
        {/* Navigation */}
        <header>
          <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-yellow-500/20 p-4" aria-label="Main navigation">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-yellow-400 font-bold text-xl">Aurum Private</Link>
            <div className="flex space-x-6">
              <Link href="/premium-tier" className="text-zinc-300 hover:text-yellow-400 transition-colors duration-200">
                Premium Tier
              </Link>
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
              <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-8">
                Ready to experience elite AI-powered investment management? 
                Get in touch with our team for personalized consultation and exclusive opportunities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="relative py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              <div className="bg-zinc-800 p-8 rounded-xl border border-yellow-500/30 text-center">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Email</h3>
                <p className="text-zinc-300 mb-4">info@aurumprivate.com</p>
                <p className="text-zinc-400 text-sm">Primary contact for all inquiries</p>
                <p className="text-zinc-400 text-sm mt-2">Response time: 24 hours</p>
              </div>
              
              <div className="bg-zinc-800 p-8 rounded-xl border border-yellow-500/30 text-center">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Website</h3>
                <p className="text-zinc-300 mb-4">www.aurumprivate.com</p>
                <p className="text-zinc-400 text-sm">Full platform access</p>
                <p className="text-zinc-400 text-sm mt-2">24/7 AI system availability</p>
              </div>
              
              <div className="bg-zinc-800 p-8 rounded-xl border border-yellow-500/30 text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">AI Support</h3>
                <p className="text-zinc-300 mb-4">24/7 AI Concierge</p>
                <p className="text-zinc-400 text-sm">Instant responses for members</p>
                <p className="text-zinc-400 text-sm mt-2">Available on all tiers</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="relative py-16 px-4 bg-zinc-900/50">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 id="contact-form-title" className="text-3xl font-bold text-yellow-400 mb-8 text-center">
                Send Us a Message
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
              
              <form onSubmit={handleSubmit} className="bg-zinc-800 p-8 rounded-xl border border-yellow-500/30 space-y-6" aria-labelledby="contact-form-title">
                <div>
                  <label htmlFor="contact-name" className="block text-yellow-400 font-semibold mb-2">Full Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact-email" className="block text-yellow-400 font-semibold mb-2">Email Address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact-company" className="block text-yellow-400 font-semibold mb-2">Company</label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact-subject" className="block text-yellow-400 font-semibold mb-2">Subject</label>
                  <select
                    id="contact-subject"
                    name="subject"
                    required
                    className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="premium">Premium Tier Information</option>
                    <option value="elite">Elite Tier Information</option>
                    <option value="ultimate">Ultimate Tier Information</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="technical">Technical Support</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="contact-message" className="block text-yellow-400 font-semibold mb-2">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    className="w-full p-3 rounded bg-zinc-900 text-white border border-yellow-500/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50 outline-none transition duration-200"
                    placeholder="Tell us about your investment objectives and how we can help..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Response Times */}
        <section className="relative py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-yellow-400 mb-12">Response Times</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">24 Hours</div>
                  <div className="text-zinc-400">General Inquiries</div>
                  <div className="text-zinc-500 text-sm mt-2">Standard response time</div>
                </div>
                
                <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">12 Hours</div>
                  <div className="text-zinc-400">Elite Tier</div>
                  <div className="text-zinc-500 text-sm mt-2">Priority response</div>
                </div>
                
                <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">6 Hours</div>
                  <div className="text-zinc-400">Ultimate Tier</div>
                  <div className="text-zinc-500 text-sm mt-2">VIP response</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Security Notice */}
        <section className="relative py-16 px-4 bg-zinc-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-yellow-400 mb-8">Security & Privacy</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                  <div className="text-3xl mb-4">🔒</div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">Encrypted Communications</h3>
                  <p className="text-zinc-300">All communications are encrypted using bank-level security protocols</p>
                </div>
                
                <div className="bg-zinc-800 p-6 rounded-xl border border-yellow-500/30">
                  <div className="text-3xl mb-4">🛡️</div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">Data Protection</h3>
                  <p className="text-zinc-300">Your information is protected by GDPR and SOC 2 compliance standards</p>
                </div>
              </div>
              
              <div className="mt-8 text-zinc-400">
                <p>All communications are confidential and secure</p>
                <p>We never share your information with third parties</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
