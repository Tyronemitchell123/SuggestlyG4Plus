import React from "react";
import Head from "next/head";
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
        <title>Aurum Private – £500,000/yr Elite Membership</title>
        <meta name="description" content="Private infrastructure for the ultra‑high‑impact. By invitation only." />
        <meta property="og:title" content="Aurum Private – £500,000/yr Elite Membership" />
        <meta property="og:description" content="Private infrastructure for the ultra‑high‑impact. By invitation only." />
        <meta property="og:type" content="website" />
      </Head>
      <main className="bg-black text-white font-sans">
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
            £500,000/year membership. Guaranteed access, certainty, and execution for the ultra‑high‑impact.
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
        </section>
      </main>
    </>
  );
}
