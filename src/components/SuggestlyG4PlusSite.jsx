import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Activity,
  Bell,
  CheckCircle2,
  Globe2,
  HeartPulse,
  LineChart as LineChartIcon,
  Loader2,
  Moon,
  Play,
  RefreshCcw,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Sun,
  Wifi,
  Zap,
  Mic,
  Eye,
  MousePointer,
  Smartphone,
  Monitor,
  Tablet,
  Command,
  TrendingUp,
  Users,
} from "lucide-react";
import "../styles/UltraPremiumUX.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// ---------- Ultra‑Premium UX Helpers ----------
const cn = (...args) => args.filter(Boolean).join(" ");

function useDarkMode() {
  const [theme, setTheme] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("sg4_theme") || "dark"
      : "dark"
  );
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("sg4_theme", theme);
    }
  }, [theme]);
  return { theme, setTheme };
}

// Ultra-Premium UX State Management
function useUltraPremiumUX() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [voiceNavigation, setVoiceNavigation] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [accessibilityMode, setAccessibilityMode] = useState('standard');
  
  const parallaxRef = useRef(null);
  const commandPaletteRef = useRef(null);

  // Micro-interactions and animations
  const microInteractions = {
    button: {
      hover: { scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" },
      tap: { scale: 0.95 },
      transition: { type: "spring", stiffness: 400, damping: 17 }
    },
    card: {
      hover: { y: -10, rotateY: 5 },
      transition: { duration: 0.3 }
    },
    gradient: {
      animate: {
        background: [
          "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
          "linear-gradient(45deg, #f093fb 0%, #f5576c 100%)",
          "linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)",
          "linear-gradient(45deg, #667eea 0%, #764ba2 100%)"
        ]
      },
      transition: { duration: 8, repeat: Infinity, ease: "linear" }
    }
  };

  // AI-Powered Suggestions System
  useEffect(() => {
    const generateAISuggestions = () => {
      const suggestions = [
        { id: 1, type: 'optimization', message: 'Portfolio rebalancing recommended based on market trends', priority: 'high' },
        { id: 2, type: 'insight', message: 'New investment opportunity detected in emerging markets', priority: 'medium' },
        { id: 3, type: 'alert', message: 'Risk assessment update available for your holdings', priority: 'low' }
      ];
      setAiSuggestions(suggestions);
    };

    generateAISuggestions();
    const interval = setInterval(generateAISuggestions, 30000);
    return () => clearInterval(interval);
  }, []);

  // Responsive Design Detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1920) setScreenSize('ultra-wide');
      else if (width >= 1200) setScreenSize('desktop');
      else if (width >= 768) setScreenSize('tablet');
      else setScreenSize('mobile');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Command Palette System
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Voice Navigation System
  useEffect(() => {
    if (voiceNavigation) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        if (transcript.includes('navigate')) {
          // Handle navigation commands
        }
        if (transcript.includes('analyze')) {
          // Handle analysis commands
        }
      };

      recognition.start();
      return () => recognition.stop();
    }
  }, [voiceNavigation]);

  // Parallax Effect
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    voiceNavigation,
    setVoiceNavigation,
    screenSize,
    aiSuggestions,
    accessibilityMode,
    setAccessibilityMode,
    parallaxRef,
    commandPaletteRef,
    microInteractions
  };
}

// ---------- Live Feed Hook (WebSocket + Fallback) ----------
function useLiveFeed({ url, topic = "suggestly/stream", simulate = true }) {
  const [connected, setConnected] = useState(false);
  const [events, setEvents] = useState([]);
  const wsRef = useRef(null);
  const idRef = useRef(1);

  useEffect(() => {
    let interval;

    if (url) {
      try {
        const ws = new WebSocket(url);
        wsRef.current = ws;
        ws.addEventListener("open", () => setConnected(true));
        ws.addEventListener("close", () => setConnected(false));
        ws.addEventListener("error", () => setConnected(false));
        ws.addEventListener("message", (e) => {
          try {
            const data = JSON.parse(e.data);
            setEvents((prev) =>
              [
                {
                  id: data.id ?? idRef.current++,
                  ts: data.ts ?? Date.now(),
                  kind: data.kind ?? "update",
                  message: data.message ?? "New event",
                  value: data.value ?? Math.random() * 100,
                },
                ...prev,
              ].slice(0, 150)
            );
          } catch {
            // Non‑JSON payloads
            setEvents((prev) =>
              [
                {
                  id: idRef.current++,
                  ts: Date.now(),
                  kind: "raw",
                  message: String(e.data).slice(0, 200),
                  value: Math.random() * 100,
                },
                ...prev,
              ].slice(0, 150)
            );
          }
        });
      } catch {
        /* if browser blocks WS, fallback to simulation */
      }
    }

    if (simulate && !url) {
      interval = setInterval(() => {
        const kinds = ["ingest", "score", "deploy", "notify", "heartbeat"];
        const kind = kinds[Math.floor(Math.random() * kinds.length)];
        setEvents((prev) =>
          [
            {
              id: idRef.current++,
              ts: Date.now(),
              kind,
              message:
                kind === "deploy"
                  ? "CI/CD: SuggestlyG4+ rolled out to edge."
                  : kind === "score"
                  ? `Model score ${(80 + Math.random() * 20).toFixed(2)}%`
                  : kind === "ingest"
                  ? "Data pipeline ingested 10k rows."
                  : kind === "heartbeat"
                  ? "Service heartbeat"
                  : "User notification broadcast",
              value: 70 + Math.random() * 30,
            },
            ...prev,
          ].slice(0, 150)
        );
      }, 1500);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (wsRef.current) wsRef.current.close();
    };
  }, [url, simulate]);

  const series = useMemo(() => {
    // Build a last‑N chart series (latest first → reverse for chart)
    const last = [...events]
      .slice(0, 50)
      .reverse()
      .map((e) => ({ t: new Date(e.ts).toLocaleTimeString(), v: e.value }));
    return last;
  }, [events]);

  return { connected, events, series };
}

// ---------- Ultra-Premium Parallax Background ----------
function UltraPremiumBackground({ parallaxRef, microInteractions }) {
  return (
    <div ref={parallaxRef} className="parallax-layers">
      <motion.div 
        className="gradient-layer"
        animate={microInteractions.gradient.animate}
        transition={microInteractions.gradient.transition}
      />
      <div className="particle-layer">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- AI-Powered Suggestions Panel ----------
function AISuggestionsPanel({ aiSuggestions, microInteractions }) {
  return (
    <AnimatePresence>
      {aiSuggestions.length > 0 && (
        <motion.div
          className="ai-suggestions-panel"
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="panel-header">
            <Sparkles className="ai-icon" />
            <h3>AI Insights</h3>
          </div>
          {aiSuggestions.map(suggestion => (
            <motion.div
              key={suggestion.id}
              className={`suggestion-item ${suggestion.priority}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="suggestion-content">
                <span className="suggestion-type">{suggestion.type}</span>
                <p>{suggestion.message}</p>
              </div>
              <motion.button
                className="action-button"
                whileHover={microInteractions.button.hover}
                whileTap={microInteractions.button.tap}
                transition={microInteractions.button.transition}
              >
                <Zap size={16} />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- Command Palette ----------
function CommandPalette({ isCommandPaletteOpen, setIsCommandPaletteOpen, commandPaletteRef }) {
  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <motion.div
          className="command-palette-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCommandPaletteOpen(false)}
        >
          <motion.div
            ref={commandPaletteRef}
            className="command-palette"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="palette-header">
              <Command size={20} />
              <input 
                type="text" 
                placeholder="Search commands, navigate, or ask AI..."
                autoFocus
              />
            </div>
            <div className="command-suggestions">
              <div className="command-group">
                <h4>Navigation</h4>
                <div className="command-item">Dashboard</div>
                <div className="command-item">Portfolio</div>
                <div className="command-item">Analytics</div>
              </div>
              <div className="command-group">
                <h4>Actions</h4>
                <div className="command-item">Rebalance Portfolio</div>
                <div className="command-item">Generate Report</div>
                <div className="command-item">AI Analysis</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- Accessibility Controls ----------
function AccessibilityControls({ voiceNavigation, setVoiceNavigation, accessibilityMode, setAccessibilityMode, setIsCommandPaletteOpen, microInteractions }) {
  return (
    <motion.div 
      className="accessibility-controls"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <motion.button
        className={`control-button ${voiceNavigation ? 'active' : ''}`}
        onClick={() => setVoiceNavigation(!voiceNavigation)}
        whileHover={microInteractions.button.hover}
        whileTap={microInteractions.button.tap}
        transition={microInteractions.button.transition}
        title="Voice Navigation"
      >
        <Mic size={20} />
      </motion.button>
      
      <motion.button
        className="control-button"
        onClick={() => setAccessibilityMode(accessibilityMode === 'aaa' ? 'standard' : 'aaa')}
        whileHover={microInteractions.button.hover}
        whileTap={microInteractions.button.tap}
        transition={microInteractions.button.transition}
        title="Accessibility Mode"
      >
        <Eye size={20} />
      </motion.button>

      <motion.button
        className="control-button"
        onClick={() => setIsCommandPaletteOpen(true)}
        whileHover={microInteractions.button.hover}
        whileTap={microInteractions.button.tap}
        transition={microInteractions.button.transition}
        title="Command Palette (Ctrl+K)"
      >
        <Command size={20} />
      </motion.button>
    </motion.div>
  );
}

// ---------- Device Indicators ----------
function DeviceIndicators({ screenSize }) {
  return (
    <div className="device-indicators">
      <div className={`indicator ${screenSize === 'ultra-wide' ? 'active' : ''}`}>
        <Monitor size={16} />
        <span>Ultra-Wide</span>
      </div>
      <div className={`indicator ${screenSize === 'desktop' ? 'active' : ''}`}>
        <Monitor size={16} />
        <span>Desktop</span>
      </div>
      <div className={`indicator ${screenSize === 'tablet' ? 'active' : ''}`}>
        <Tablet size={16} />
        <span>Tablet</span>
      </div>
      <div className={`indicator ${screenSize === 'mobile' ? 'active' : ''}`}>
        <Smartphone size={16} />
        <span>Mobile</span>
      </div>
    </div>
  );
}

// ---------- Contextual Tooltips ----------
function ContextualTooltips() {
  return (
    <div className="contextual-tooltips">
      <motion.div
        className="tooltip"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <MousePointer size={16} />
        <span>Hover for micro-interactions</span>
      </motion.div>
    </div>
  );
}

// ---------- Layout ----------
export default function SuggestlyG4PlusSite() {
  const { theme, setTheme } = useDarkMode();
  const LIVE_FEED_URL = import.meta?.env?.VITE_LIVE_FEED_URL || ""; // set to wss://your-feed
  const { connected, events, series } = useLiveFeed({
    url: LIVE_FEED_URL,
    simulate: !LIVE_FEED_URL,
  });

  // Ultra-Premium UX Integration
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    voiceNavigation,
    setVoiceNavigation,
    screenSize,
    aiSuggestions,
    accessibilityMode,
    setAccessibilityMode,
    parallaxRef,
    commandPaletteRef,
    microInteractions
  } = useUltraPremiumUX();

  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Ultra-Premium Background */}
      <UltraPremiumBackground parallaxRef={parallaxRef} microInteractions={microInteractions} />
      
      {/* AI-Powered Suggestions Panel */}
      <AISuggestionsPanel aiSuggestions={aiSuggestions} microInteractions={microInteractions} />
      
      {/* Command Palette */}
      <CommandPalette 
        isCommandPaletteOpen={isCommandPaletteOpen} 
        setIsCommandPaletteOpen={setIsCommandPaletteOpen} 
        commandPaletteRef={commandPaletteRef} 
      />
      
      {/* Accessibility Controls */}
      <AccessibilityControls 
        voiceNavigation={voiceNavigation}
        setVoiceNavigation={setVoiceNavigation}
        accessibilityMode={accessibilityMode}
        setAccessibilityMode={setAccessibilityMode}
        setIsCommandPaletteOpen={setIsCommandPaletteOpen}
        microInteractions={microInteractions}
      />
      
      {/* Device Indicators */}
      <DeviceIndicators screenSize={screenSize} />
      
      {/* Contextual Tooltips */}
      <ContextualTooltips />
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-zinc-950/50 border-b border-zinc-200/50 dark:border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-md">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="font-semibold tracking-tight">SuggestlyG4+</div>
              <Badge className="ml-2 rounded-full" variant="secondary">
                Ultra • Live
              </Badge>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                <Input
                  placeholder="Search features, streams, docs…"
                  className="pl-9 w-64"
                />
              </div>
              <motion.button
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                onClick={() => setIsCommandPaletteOpen(true)}
                whileHover={microInteractions.button.hover}
                whileTap={microInteractions.button.tap}
                transition={microInteractions.button.transition}
                title="Command Palette (Ctrl+K)"
              >
                <Command className="h-4 w-4" />
              </motion.button>
              <Button
                variant="ghost"
                className="gap-2"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span className="hidden lg:inline">Theme</span>
              </Button>
              <motion.div
                whileHover={microInteractions.button.hover}
                whileTap={microInteractions.button.tap}
                transition={microInteractions.button.transition}
              >
                <Button className="gap-2">
                  <Play className="h-4 w-4" />
                  Launch
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl"
              >
                Ultra‑responsive. Real‑time.{" "}
                <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500 bg-clip-text text-transparent">
                  Production‑ready
                </span>
                .
              </motion.h1>
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
                SuggestlyG4+ is a live, event‑driven experience. Stream data in,
                visualize instantly, and deploy to the edge in minutes.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <motion.div
                  whileHover={microInteractions.button.hover}
                  whileTap={microInteractions.button.tap}
                  transition={microInteractions.button.transition}
                >
                  <Button className="h-11 gap-2 text-base">
                    <Globe2 className="h-4 w-4" /> Explore Console
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={microInteractions.button.hover}
                  whileTap={microInteractions.button.tap}
                  transition={microInteractions.button.transition}
                >
                  <Button variant="secondary" className="h-11 gap-2 text-base">
                    <ShieldCheck className="h-4 w-4" /> Secure Demo
                  </Button>
                </motion.div>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4" /> Live feed{" "}
                  {connected ? (
                    <span className="text-emerald-500">connected</span>
                  ) : (
                    <span className="text-zinc-400">simulated</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <HeartPulse className="h-4 w-4" /> 99.99% target uptime
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> ISO‑style controls
                </div>
              </div>
            </div>

            {/* Chart Card */}
            <motion.div
              whileHover={microInteractions.card.hover}
              transition={microInteractions.card.transition}
            >
              <Card className="border-0 bg-gradient-to-br from-zinc-50 to-white shadow-xl ring-1 ring-black/5 dark:from-zinc-900 dark:to-zinc-900/60 dark:ring-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5" /> Live Metrics
                </CardTitle>
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <RefreshCcw
                    className={cn(
                      "h-4 w-4",
                      connected ? "animate-spin-slow" : ""
                    )}
                  />
                  {connected ? "realtime" : "simulated"}
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={series}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="currentColor"
                            stopOpacity={0.35}
                          />
                          <stop
                            offset="95%"
                            stopColor="currentColor"
                            stopOpacity={0.02}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                      <XAxis dataKey="t" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} domain={[0, 110]} />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(0 0% 100% / 0.9)",
                          borderRadius: 12,
                          border: "1px solid hsl(240 5% 84%)",
                        }}
                        labelStyle={{ fontWeight: 600 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke="currentColor"
                        fillOpacity={1}
                        fill="url(#g)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-zinc-600 dark:text-zinc-300 sm:grid-cols-4">
                  <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                    <div className="text-xs">Latency</div>
                    <div className="text-lg font-semibold">
                      {(Math.random() * 40 + 20).toFixed(0)} ms
                    </div>
                  </div>
                  <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                    <div className="text-xs">Throughput</div>
                    <div className="text-lg font-semibold">
                      {(Math.random() * 500 + 500).toFixed(0)}/s
                    </div>
                  </div>
                  <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                    <div className="text-xs">Users</div>
                    <div className="text-lg font-semibold">
                      {(Math.random() * 900 + 100).toFixed(0)}
                    </div>
                  </div>
                  <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                    <div className="text-xs">Model score</div>
                    <div className="text-lg font-semibold">
                      {(80 + Math.random() * 20).toFixed(2)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="observability" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="observability" className="gap-2">
                <Activity className="h-4 w-4" /> Observability
              </TabsTrigger>
              <TabsTrigger value="alerts" className="gap-2">
                <Bell className="h-4 w-4" /> Alerts
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <ShieldCheck className="h-4 w-4" /> Security
              </TabsTrigger>
              <TabsTrigger value="optimize" className="gap-2">
                <Settings2 className="h-4 w-4" /> Optimize
              </TabsTrigger>
            </TabsList>
            <TabsContent value="observability" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: <LineChartIcon className="h-5 w-5" />,
                    title: "Live Dashboards",
                    text: "Stream metrics via WebSocket or SSE. Auto‑retries, graceful degradation, and offline‑safe UI state.",
                  },
                  {
                    icon: <Wifi className="h-5 w-5" />,
                    title: "Edge‑first",
                    text: "Optimized for CDN caching, prefetch hints, and HTTP/3. Deploy anywhere with zero‑config.",
                  },
                  {
                    icon: <Sparkles className="h-5 w-5" />,
                    title: "A11y & Perf",
                    text: "Semantic landmarks, reduced‑motion support, and Lighthouse 95+ targets.",
                  },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    whileHover={microInteractions.card.hover}
                    transition={microInteractions.card.transition}
                  >
                    <Card
                      className="border-0 shadow-lg ring-1 ring-black/5 dark:ring-white/10"
                    >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {f.icon}
                        {f.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-zinc-600 dark:text-zinc-300">
                      {f.text}
                    </CardContent>
                  </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="alerts" className="mt-6">
              <Card className="border-0 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="max-w-xl">
                      <div className="text-lg font-semibold">
                        Set threshold alerts in real time
                      </div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">
                        Notify Slack, email, or webhooks when live metrics
                        breach SLOs.
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" className="gap-2">
                        <Bell className="h-4 w-4" /> Create Alert
                      </Button>
                      <Button className="gap-2">
                        <CheckCircle2 className="h-4 w-4" /> Acknowledge
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="security" className="mt-6">
              <Card className="border-0 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                <CardContent className="p-6 text-zinc-600 dark:text-zinc-300">
                  Runtime config via env‑vars, Content Security Policy (CSP)
                  starter, and secure WebSocket scheme.
                  <pre className="mt-4 overflow-auto rounded-xl bg-zinc-100 p-3 text-xs dark:bg-zinc-900">
                    {`# .env
VITE_LIVE_FEED_URL=wss://your-live-endpoint.example/ws
VITE_API_ORIGIN=https://api.suggestlyg4plus.io
`}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="optimize" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-0 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                  <CardHeader>
                    <CardTitle>Runtime Hydration Budget</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={240}>
                      <LineChart
                        data={series}
                        margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                        <XAxis dataKey="t" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} domain={[0, 110]} />
                        <Tooltip
                          contentStyle={{
                            background: "hsl(0 0% 100% / 0.9)",
                            borderRadius: 12,
                            border: "1px solid hsl(240 5% 84%)",
                          }}
                          labelStyle={{ fontWeight: 600 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="v"
                          stroke="currentColor"
                          dot={false}
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                  <CardHeader>
                    <CardTitle>Edge Cache Hints</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-zinc-600 dark:text-zinc-300">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Immutable assets with{" "}
                        <code>
                          Cache‑Control: public, max‑age=31536000, immutable
                        </code>
                      </li>
                      <li>Prefetch critical fonts and routes</li>
                      <li>Lazy‑load non‑critical charts & images</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Live Event Stream */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Live Feed</h2>
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="hidden sm:inline">{events.length} events</span>
              {connected ? (
                <Badge className="bg-emerald-600 hover:bg-emerald-600">
                  Connected
                </Badge>
              ) : (
                <Badge variant="outline">Simulated</Badge>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 9).map((ev) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                whileHover={microInteractions.card.hover}
                transition={microInteractions.card.transition}
              >
                <Card className="border-0 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <span className="inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                      {ev.kind}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm text-zinc-600 dark:text-zinc-300">
                      {ev.message}
                    </div>
                    <div className="text-xs text-zinc-400">
                      {new Date(ev.ts).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Stream Controls */}
          <div className="mt-6 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              Set <code>VITE_LIVE_FEED_URL</code> to your WebSocket for real
              production data.
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Auto‑refresh
              </Button>
              <Button className="gap-2">
                <RefreshCcw className="h-4 w-4" />
                Manual refresh
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200/60 py-10 dark:border-zinc-800/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-lg font-semibold">SuggestlyG4+</div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Live, responsive, and secure by design.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold">Product</div>
              <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                <li>Console</li>
                <li>Docs</li>
                <li>Changelog</li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold">Company</div>
              <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                <li>About</li>
                <li>Security</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold">Status</div>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> All
                systems normal
              </div>
            </div>
          </div>
          <div className="mt-8 text-xs text-zinc-400">
            © {new Date().getFullYear()} SuggestlyG4+. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---------- Additional Styles (Tailwind utilities already available) ----------
// Add to your tailwind.config if desired:
// theme: { extend: { animation: { 'spin-slow': 'spin 3s linear infinite' } } }
