// File: AurumPreview.tsx
// Why: Framework‑free React version (no Next.js) to preview in canvas. Tailwind + Framer Motion only.

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OFFERINGS = [
  {
    key: "capital",
    name: "Private Capital & Dealflow",
    tagline: "Off‑market access. Faster diligence. Better terms.",
    price: "£100,000 / month",
    features: [
      "Proprietary dealflow before it hits market",
      "AI‑assisted diligence & risk modelling (48h sprints)",
      "Direct principal introductions, no gatekeepers",
      "Co‑invest rights & preferred allocations",
      "Secure data rooms & red‑team reviews",
      "Weekly investment committee briefings",
    ],
    kpis: [
      { label: "Avg. Cycle Compression", value: "34%" },
      { label: "Preferential Access", value: "+19 deals/qtr" },
      { label: "Negotiated Savings", value: "£4.2M" },
    ],
  },
  {
    key: "command",
    name: "Executive Command Center",
    tagline: "24/7 ops desk for crises and opportunities.",
    price: "£100,000 / month",
    features: [
      "Geopolitical, market & reputational intel in real time",
      "Global incident response (PR, legal, cyber)",
      "Travel, security & logistics tasking across timezones",
      "Stakeholder mapping & rapid comms playbooks",
      "War‑room dashboard with secure comms",
      "Quarterly resilience simulations",
    ],
    kpis: [
      { label: "Critical Response SLA", value: "< 15m" },
      { label: "Incident Contained", value: "92%" },
      { label: "Downtime Avoided", value: "+188 hrs/qtr" },
    ],
  },
  {
    key: "lifestyle",
    name: "Elite Lifestyle OS",
    tagline: "Network, access, and execution without friction.",
    price: "£100,000 / month",
    features: [
      "500+ verified high‑status contacts worldwide",
      "Impossible bookings & private event access",
      "Asset, travel & estate orchestration",
      "Private identity & alias bookings",
      "24/7 human + AI concierge (median 17m)",
      "On‑the‑ground fixers in 14 cities",
    ],
    kpis: [
      { label: "Time Returned", value: "+90 hrs/mo" },
      { label: "Priority Conversions", value: "97%" },
      { label: "City Coverage", value: "14 hubs" },
    ],
  },
  {
    key: "rnd",
    name: "Private R&D Lab",
    tagline: "From thesis to patent to prototype — privately.",
    price: "£100,000 / month",
    features: [
      "Dedicated research pod (PM + Eng + Sci)",
      "Custom prototypes & technical due diligence",
      "Market simulations & TAM stress‑tests",
      "Patent strategy & filings with counsel",
      "Vendor & partner NDAs pre‑negotiated",
      "Monthly demo days & artifacts",
    ],
    kpis: [
      { label: "Concept→Prototype", value: "≤ 6 wks" },
      { label: "Filed IP", value: "+3/quarter" },
      { label: "Pilot Wins", value: "+5/quarter" },
    ],
  },
] as const;

type OfferingKey = typeof OFFERINGS[number]["key"];

export default function AurumPreview() {
  const [active, setActive] = useState<OfferingKey>("capital");
  const [openApply, setOpenApply] = useState(false);
  const current = useMemo(() => OFFERINGS.find(o => o.key === active)!, [active]);

  const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    alert("(Preview) Submitted — connect real API in Next.js build.");
    setOpenApply(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated backdrop */}
      <div aria-hidden className="fixed inset-0 -z-10">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(255,215,0,0.12),rgba(0,0,0,0)_60%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(135deg, #0a0a0b 0%, #0f0f12 40%, #1a1a1e 100%)"
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/60 bg-black/50 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-yellow-500 to-yellow-200" />
            <span className="font-semibold tracking-wide text-zinc-100">AURUM PRIVATE</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            {OFFERINGS.map((o) => (
              <button
                key={o.key}
                onClick={() => setActive(o.key)}
                className={`rounded-full px-3 py-1 text-sm transition ${
                  active === o.key
                    ? "bg-yellow-500 text-black"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800"
                }`}
                aria-pressed={active === o.key}
              >
                {o.name.split(" ")[0]}
              </button>
            ))}
            <button
              onClick={() => setOpenApply(true)}
              className="ml-2 rounded-full bg-yellow-500 px-4 py-1.5 text-sm font-medium text-black"
            >
              Apply
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-6xl px-4">
        <section className="py-16 sm:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-200">
                <span>Invite‑only • 12 seats per track</span>
              </div>
              <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-6xl">
                £100,000/mo{" "}
                <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                  Executive Suite
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-zinc-300">
                Select a track. We deliver outcomes with bank‑grade security, measurable KPIs, and a director on speed‑dial.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {OFFERINGS.map((o) => (
                  <button
                    key={o.key}
                    onClick={() => setActive(o.key)}
                    className={`rounded-full border px-3 py-1 text-sm transition ${
                      active === o.key
                        ? "border-yellow-500 bg-yellow-500 text-black"
                        : "border-zinc-700 text-zinc-200 hover:border-zinc-500"
                    }`}
                    aria-pressed={active === o.key}
                  >
                    {o.name}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <div className="text-sm text-zinc-400">Current Track</div>
              <div className="mt-2 text-2xl font-semibold text-white">{current.name}</div>
              <div className="mt-1 text-zinc-300">{current.tagline}</div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {current.features.map((f) => (
                  <div key={f} className="rounded-xl border border-zinc-800/80 p-3 text-sm text-zinc-300">
                    {f}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between rounded-xl border border-zinc-800 p-4">
                <div>
                  <div className="text-xs uppercase tracking-wide text-zinc-400">Subscription</div>
                  <div className="text-2xl font-semibold text-white">{current.price}</div>
                </div>
                <button
                  onClick={() => setOpenApply(true)}
                  className="rounded-full bg-yellow-500 px-4 py-2 font-medium text-black"
                >
                  Request Invitation
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* KPIs */}
        <section className="pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 sm:grid-cols-3"
            >
              {current.kpis.map((k) => (
                <div key={k.label} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                  <div className="text-sm text-zinc-400">{k.label}</div>
                  <div className="mt-2 text-4xl font-semibold text-white">{k.value}</div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      {/* APPLY MODAL */}
      <AnimatePresence>
        {openApply && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              <div className="mb-4 text-sm text-zinc-400">Applying for</div>
              <div className="mb-6 text-2xl font-semibold text-white">
                {current.name} — {current.price}
              </div>
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-zinc-300" htmlFor="name">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full rounded border border-zinc-800 bg-zinc-950 p-3 text-white outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-300" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    className="w-full rounded border border-zinc-800 bg-zinc-950 p-3 text-white outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-zinc-300" htmlFor="mandate">
                    Mandate / objective
                  </label>
                  <textarea
                    id="mandate"
                    name="message"
                    rows={5}
                    required
                    className="w-full rounded border border-zinc-800 bg-zinc-950 p-3 text-white outline-none focus:border-yellow-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-zinc-400">Your data is encrypted and stored in the UK/EU.</p>
                  <button type="submit" className="rounded-full bg-yellow-500 px-4 py-2 font-medium text-black">
                    Submit
                  </button>
                </div>
              </form>
              <button
                onClick={() => setOpenApply(false)}
                className="mt-4 text-sm text-zinc-400 underline-offset-2 hover:underline"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <div className="text-zinc-400">© {new Date().getFullYear()} Aurum Private Ltd — All rights reserved.</div>
          <div className="text-zinc-500">London • Dubai • Singapore</div>
        </div>
      </footer>
    </div>
  );
}

