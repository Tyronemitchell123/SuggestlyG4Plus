import React from "react";
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "../src/components/Logo";

export default function SuggestlyG4PlusSite() {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network error");
      alert("Message sent successfully. We'll get back to you soon!");
      e.currentTarget.reset();
    } catch (err) {
      alert("Error sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: "AI",
      title: "Multi-Agent AI System",
      description: "Seven specialized AI agents working in harmony: ANALYST, INTEL, STRATEGIST, CREATOR, OPTIMIZER, SECURITY, and NEXUS-ULTRA."
    },
    {
      icon: "IOT",
      title: "IoT & Bluetooth Integration",
      description: "Seamless connectivity with smart devices, wearables, and IoT sensors. Real-time data collection and smart home automation."
    },
    {
      icon: "VOICE",
      title: "Voice AI & Speech Recognition",
      description: "Multi-language speech recognition, natural text-to-speech synthesis, and emotion detection from voice patterns."
    },
    {
      icon: "VISION",
      title: "Computer Vision",
      description: "Real-time object detection, facial recognition, OCR capabilities, and augmented reality features."
    },
    {
      icon: "SPEED",
      title: "Performance Optimization",
      description: "Parallel processing, intelligent caching, memory optimization, and auto-scaling capabilities."
    },
    {
      icon: "SECURITY",
      title: "Enterprise Security",
      description: "Military-grade security protocols, biometric authentication, and comprehensive audit trails."
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "£29",
      period: "per month",
      description: "Perfect for individuals and small projects",
      features: [
        "Basic AI features",
        "2 AI agents (ANALYST, INTEL)",
        "Basic IoT integration",
        "Community support",
        "1GB data storage",
        "Email support",
        "Basic analytics"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Professional",
      price: "£99",
      period: "per month",
      description: "Ideal for growing businesses and teams",
      features: [
        "Full AI suite",
        "All 7 AI agents",
        "Complete IoT integration",
        "Voice AI capabilities",
        "Computer vision",
        "Priority support",
        "10GB data storage",
        "Advanced analytics",
        "API access (limited)",
        "Custom integrations"
      ],
      popular: true,
      cta: "Get Started"
    },
    {
      name: "Enterprise",
      price: "£499",
      period: "per month",
      description: "For large organizations with custom needs",
      features: [
        "Everything in Professional",
        "Custom deployment",
        "White-label options",
        "Full API access",
        "Dedicated support",
        "Unlimited storage",
        "SLA guarantee",
        "Custom AI training",
        "On-premise options",
        "24/7 phone support"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  return (
    <>
      <Head>
        <title>SuggestlyG4Plus - Advanced AI Platform</title>
        <meta name="description" content="Next-generation AI platform with multi-agent intelligence, IoT integration, voice AI, and computer vision capabilities." />
        <meta property="og:title" content="SuggestlyG4Plus - Advanced AI Platform" />
        <meta property="og:description" content="Next-generation AI platform with multi-agent intelligence, IoT integration, voice AI, and computer vision capabilities." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <Logo size={36} clickable />
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SuggestlyG4Plus
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden md:flex space-x-8"
              >
                <a href="#features" className="text-gray-300 hover:text-purple-400 transition-colors">Features</a>
                <a href="#pricing" className="text-gray-300 hover:text-purple-400 transition-colors">Pricing</a>
                <a href="#contact" className="text-gray-300 hover:text-purple-400 transition-colors">Contact</a>
              </motion.div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"
            animate={{ 
              backgroundPosition: ["0% 0%", "100% 100%"],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          />
          
          <div className="relative text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            >
              SuggestlyG4Plus
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              The next-generation AI platform that combines multi-agent intelligence, 
              IoT integration, voice AI, and computer vision to create a truly 
              intelligent ecosystem for modern businesses and developers.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#pricing"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
              >
                Get Started
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border-2 border-purple-400 text-purple-400 font-semibold rounded-full hover:bg-purple-400 hover:text-white transition-all duration-200"
              >
                Contact Us
              </a>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Advanced AI Capabilities
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Everything you need to build the future of AI applications
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="text-4xl font-bold text-purple-400 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 bg-slate-800/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Choose Your Plan
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Flexible pricing for every stage of your AI journey
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative bg-slate-800/50 backdrop-blur-sm border-2 rounded-2xl p-8 text-center ${
                    plan.popular 
                      ? 'border-pink-500 scale-105' 
                      : 'border-purple-500/20 hover:border-purple-400/40'
                  } transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{plan.description}</p>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {plan.price}
                  </div>
                  <div className="text-gray-400 mb-8">{plan.period}</div>
                  
                  <ul className="space-y-3 mb-8 text-left">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-300 text-sm">
                        <span className="text-purple-400 mr-3">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => setSelectedPlan(plan.name)}
                    className={`w-full py-3 rounded-full font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                        : 'border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Pricing Comparison Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-white">Feature Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-purple-500/20">
                      <th className="text-left py-3 text-gray-300">Feature</th>
                      <th className="text-center py-3 text-gray-300">Starter</th>
                      <th className="text-center py-3 text-gray-300">Professional</th>
                      <th className="text-center py-3 text-gray-300">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-purple-500/10">
                      <td className="py-3 text-gray-300">AI Agents</td>
                      <td className="text-center py-3 text-gray-300">2</td>
                      <td className="text-center py-3 text-purple-400">7</td>
                      <td className="text-center py-3 text-purple-400">7 + Custom</td>
                    </tr>
                    <tr className="border-b border-purple-500/10">
                      <td className="py-3 text-gray-300">Storage</td>
                      <td className="text-center py-3 text-gray-300">1GB</td>
                      <td className="text-center py-3 text-purple-400">10GB</td>
                      <td className="text-center py-3 text-purple-400">Unlimited</td>
                    </tr>
                    <tr className="border-b border-purple-500/10">
                      <td className="py-3 text-gray-300">Support</td>
                      <td className="text-center py-3 text-gray-300">Community</td>
                      <td className="text-center py-3 text-purple-400">Priority</td>
                      <td className="text-center py-3 text-purple-400">24/7 Dedicated</td>
                    </tr>
                    <tr className="border-b border-purple-500/10">
                      <td className="py-3 text-gray-300">API Access</td>
                      <td className="text-center py-3 text-gray-300">✗</td>
                      <td className="text-center py-3 text-purple-400">Limited</td>
                      <td className="text-center py-3 text-purple-400">Full</td>
                    </tr>
                    <tr className="border-b border-purple-500/10">
                      <td className="py-3 text-gray-300">Custom Training</td>
                      <td className="text-center py-3 text-gray-300">✗</td>
                      <td className="text-center py-3 text-gray-300">✗</td>
                      <td className="text-center py-3 text-purple-400">✓</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-gray-300">SLA Guarantee</td>
                      <td className="text-center py-3 text-gray-300">✗</td>
                      <td className="text-center py-3 text-gray-300">✗</td>
                      <td className="text-center py-3 text-purple-400">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <p className="text-xl text-gray-300">
                Ready to transform your business with AI? Let's talk.
              </p>
            </motion.div>
            
            <motion.form
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="name"
                  placeholder="Full Name"
                  className="w-full p-4 rounded-lg bg-slate-900 text-white border border-purple-500/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition duration-200"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full p-4 rounded-lg bg-slate-900 text-white border border-purple-500/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition duration-200"
                  required
                />
              </div>
              
              <textarea
                name="message"
                placeholder="Tell us about your AI needs..."
                rows={5}
                className="w-full p-4 rounded-lg bg-slate-900 text-white border border-purple-500/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition duration-200"
                required
              />
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </motion.form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-purple-500/20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Logo size={32} />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SuggestlyG4Plus
              </span>
            </div>
            <p className="text-gray-400">
              © 2024 SuggestlyG4Plus. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
