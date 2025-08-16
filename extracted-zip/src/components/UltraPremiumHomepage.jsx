import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
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
  Crown,
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
  Brain,
  Cpu,
  Database,
  Network,
  Shield,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Atom,
  Bot,
  BrainCircuit,
  Wand2,
  Camera,
  Wallet,
  KeyRound,
  Ticket,
  CalendarDays,
  Gift,
  Users2,
  GalleryHorizontal,
  Rocket,
  MapPin,
  ArrowRight,
  Star,
  Clock,
  Award,
  Target,
  Globe,
  CheckCircle,
  Star,
  Eye,
  MousePointer,
  Smartphone,
  Monitor,
  Tablet,
  Command,
  AlertCircle,
  TrendingDown,
  Settings,
  HelpCircle,
  MessageSquare,
  Download,
  Upload,
  RotateCcw,
  Maximize2,
  Minimize2,
  X,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  Filter,
  SortAsc,
  SortDesc,
  Mic,
  Eye,
  MousePointer,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Import services
import liveDataService from "../services/LiveDataService.js";
import aiService from "../services/AIService.js";
import quantumService from "../services/quantumService.js";
import advancedAIService from "../services/advancedAIService.js";
import commandPaletteService from "../services/CommandPaletteService.js";

// Import components
import QuantumComputingHub from "./QuantumComputingHub.jsx";
import QuantumBotAutomation from "./QuantumBotAutomation.jsx";
import QuantumDAWConnector from "./QuantumDAWConnector.jsx";
import AIAnalyticsDashboard from "./AIAnalyticsDashboard.jsx";
import AdvancedPaymentSystem from "./AdvancedPaymentSystem.jsx";
import AdvancedSecurityCenter from "./AdvancedSecurityCenter.jsx";
import AIContentStudio from "./AIContentStudio.jsx";
import VideoProductionSuite from "./VideoProductionSuite.jsx";
import AudioEqualizer from "./AudioEqualizer.jsx";
import UltraPremiumLogo from "./UltraPremiumLogo.jsx";

// Ultra-Premium UX Helpers
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

// Runtime Config
function useRuntimeConfig() {
  const [cfg, setCfg] = useState({
    wsUrl: "",
    apiOrigin: "",
    heroVideo: "",
    heroPoster: "",
  });
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/runtime-config.json", { cache: "no-store" });
        if (res.ok) {
          const j = await res.json();
          setCfg({
            wsUrl: j.wsUrl || j.VITE_LIVE_FEED_URL || "",
            apiOrigin: j.apiOrigin || j.VITE_API_ORIGIN || "",
            heroVideo: j.heroVideo || "",
            heroPoster: j.heroPoster || "",
          });
          return;
        }
      } catch {}
      setCfg({
        wsUrl: import.meta?.env?.VITE_LIVE_FEED_URL || "",
        apiOrigin: import.meta?.env?.VITE_API_ORIGIN || "",
        heroVideo: "",
        heroPoster: "",
      });
    };
    load();
  }, []);
  return cfg;
}

// Live Feed Hook
function useLiveFeed({ url, simulate = true }) {
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
              ].slice(0, 200)
            );
          } catch {
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
              ].slice(0, 200)
            );
          }
        });
      } catch {}
    }

    if (simulate && !url) {
      interval = setInterval(() => {
        const kinds = [
          "quantum",
          "ai",
          "neural",
          "security",
          "analytics",
          "deploy",
          "notify",
        ];
        const kind = kinds[Math.floor(Math.random() * kinds.length)];
        setEvents((prev) =>
          [
            {
              id: idRef.current++,
              ts: Date.now(),
              kind,
              message:
                kind === "quantum"
                  ? "Quantum circuit optimization complete"
                  : kind === "ai"
                  ? "AI model accuracy improved to 99.8%"
                  : kind === "neural"
                  ? "Neural network training phase 3 complete"
                  : kind === "security"
                  ? "Quantum encryption protocol activated"
                  : kind === "analytics"
                  ? "Real-time analytics dashboard updated"
                  : kind === "deploy"
                  ? "CI/CD: Edge deployment successful"
                  : "System notification broadcast",
              value: 70 + Math.random() * 30,
            },
            ...prev,
          ].slice(0, 200)
        );
      }, 1400);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (wsRef.current) wsRef.current.close();
    };
  }, [url, simulate]);

  const series = useMemo(() => {
    const last = [...events]
      .slice(0, 50)
      .reverse()
      .map((e) => ({ t: new Date(e.ts).toLocaleTimeString(), v: e.value }));
    return last;
  }, [events]);

  return { connected, events, series };
}

// Quantum AI Status
function useQuantumAIStatus() {
  const [quantumStatus, setQuantumStatus] = useState({
    quantumSupremacy: true,
    aiModels: 247,
    activeCircuits: 156,
    quantumAccuracy: 99.8,
    neuralNetworks: 89,
    securityProtocols: 100,
    uptime: 99.99,
    totalOperations: 1547892,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumStatus((prev) => ({
        ...prev,
        aiModels: prev.aiModels + Math.floor(Math.random() * 3),
        activeCircuits: prev.activeCircuits + Math.floor(Math.random() * 2),
        quantumAccuracy: Math.min(
          100,
          prev.quantumAccuracy + (Math.random() - 0.5) * 0.1
        ),
        totalOperations:
          prev.totalOperations + Math.floor(Math.random() * 1000),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return quantumStatus;
}

// Decorative Gradients
function Gradients() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/20 to-emerald-500/20 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-500/15 via-pink-500/15 to-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 h-[280px] w-[280px] rounded-full bg-gradient-to-br from-emerald-500/15 via-teal-500/15 to-blue-500/15 blur-3xl" />
      </div>
    </>
  );
}

// Main Homepage Component
export default function UltraPremiumHomepage() {
  const { theme, setTheme } = useDarkMode();
  const cfg = useRuntimeConfig();
  const LIVE_FEED_URL = cfg.wsUrl;
  const { connected, events, series } = useLiveFeed({
    url: LIVE_FEED_URL,
    simulate: !LIVE_FEED_URL,
  });
  const quantumStatus = useQuantumAIStatus();

  const [activeTab, setActiveTab] = useState("overview");
  const [showQuantumHub, setShowQuantumHub] = useState(false);
  const [showAIAnalytics, setShowAIAnalytics] = useState(false);
  const [showSecurityCenter, setShowSecurityCenter] = useState(false);

  // Real-time data for charts
  const performanceData = useMemo(
    () => [
      { name: "AI Processing", value: 98.5, color: "#3b82f6" },
      { name: "Quantum Circuits", value: 99.2, color: "#8b5cf6" },
      { name: "Neural Networks", value: 97.8, color: "#06b6d4" },
      { name: "Security Protocols", value: 100, color: "#10b981" },
      { name: "Analytics Engine", value: 96.3, color: "#f59e0b" },
    ],
    []
  );

  const systemMetrics = useMemo(
    () => [
      { name: "00:00", ai: 85, quantum: 92, neural: 88, security: 95 },
      { name: "04:00", ai: 87, quantum: 94, neural: 90, security: 96 },
      { name: "08:00", ai: 89, quantum: 96, neural: 92, security: 97 },
      { name: "12:00", ai: 91, quantum: 98, neural: 94, security: 98 },
      { name: "16:00", ai: 93, quantum: 99, neural: 96, security: 99 },
      { name: "20:00", ai: 95, quantum: 99, neural: 98, security: 100 },
      { name: "24:00", ai: 97, quantum: 99, neural: 99, security: 100 },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white antialiased">
      <Gradients />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/20 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
                <Atom className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-xl tracking-tight">
                  SUGGESTLY ELITE
                </div>
                <div className="text-sm text-gray-400">Quantum AI Platform</div>
              </div>
              <Badge className="ml-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                Ultra Premium
              </Badge>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search quantum features..."
                  className="pl-9 w-64 bg-black/20 border-white/10 text-white"
                />
              </div>
              <Button
                variant="ghost"
                className="gap-2"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500">
                <Play className="h-4 w-4" />
                Launch Platform
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="mb-6 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                  <Atom className="h-3 w-3 mr-2" />
                  Quantum AI Revolution
                </Badge>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                  Next-Generation{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    Quantum AI
                  </span>{" "}
                  Platform
                </h1>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Experience the future of artificial intelligence with quantum
                  computing, neural networks, and advanced analytics. Built for
                  enterprise-scale performance and security.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button className="h-12 gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-lg">
                    <Rocket className="h-5 w-5" />
                    Start Free Trial
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 gap-2 border-white/20 text-lg"
                  >
                    <Play className="h-5 w-5" />
                    Watch Demo
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-green-400" />
                    Live feed{" "}
                    {connected ? (
                      <span className="text-green-400">connected</span>
                    ) : (
                      <span className="text-gray-500">simulated</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <HeartPulse className="h-4 w-4 text-green-400" />
                    99.99% uptime
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-green-400" />
                    Quantum encryption
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Live Metrics Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="border-0 bg-gradient-to-br from-black/40 to-purple-900/20 shadow-2xl ring-1 ring-white/10">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <LineChartIcon className="h-5 w-5" />
                    Live Quantum Metrics
                  </CardTitle>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <RefreshCcw
                      className={cn("h-4 w-4", connected ? "animate-spin" : "")}
                    />
                    {connected ? "realtime" : "simulated"}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={series}>
                        <defs>
                          <linearGradient
                            id="gradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#8b5cf6"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="#8b5cf6"
                              stopOpacity={0.02}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                          dataKey="t"
                          tick={{ fontSize: 12, fill: "#9ca3af" }}
                        />
                        <YAxis
                          tick={{ fontSize: 12, fill: "#9ca3af" }}
                          domain={[0, 110]}
                        />
                        <ReTooltip
                          contentStyle={{
                            background: "rgba(0,0,0,0.9)",
                            borderRadius: 12,
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                          labelStyle={{ color: "#fff", fontWeight: 600 }}
                        />
                        <Area
                          type="monotone"
                          dataKey="v"
                          stroke="#8b5cf6"
                          fill="url(#gradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="rounded-xl border border-white/10 p-4 bg-black/20">
                      <div className="text-xs text-gray-400 mb-1">
                        AI Models
                      </div>
                      <div className="text-2xl font-bold text-purple-400">
                        {quantumStatus.aiModels}
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/10 p-4 bg-black/20">
                      <div className="text-xs text-gray-400 mb-1">Accuracy</div>
                      <div className="text-2xl font-bold text-green-400">
                        {quantumStatus.quantumAccuracy.toFixed(1)}%
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/10 p-4 bg-black/20">
                      <div className="text-xs text-gray-400 mb-1">Circuits</div>
                      <div className="text-2xl font-bold text-cyan-400">
                        {quantumStatus.activeCircuits}
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/10 p-4 bg-black/20">
                      <div className="text-xs text-gray-400 mb-1">
                        Operations
                      </div>
                      <div className="text-2xl font-bold text-pink-400">
                        {(quantumStatus.totalOperations / 1000000).toFixed(1)}M
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Tabs */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-6 bg-black/20 border border-white/10">
              <TabsTrigger value="overview" className="gap-2">
                <Activity className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="quantum" className="gap-2">
                <Atom className="h-4 w-4" />
                Quantum AI
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="automation" className="gap-2">
                <Bot className="h-4 w-4" />
                Automation
              </TabsTrigger>
              <TabsTrigger value="live" className="gap-2">
                <Wifi className="h-4 w-4" />
                Live Data
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-8">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: <Brain className="h-8 w-8" />,
                    title: "Quantum Neural Networks",
                    description:
                      "Advanced neural networks powered by quantum computing for unprecedented processing speed.",
                    stats: "1000x faster",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: <Shield className="h-8 w-8" />,
                    title: "Quantum Security",
                    description:
                      "Unbreakable quantum encryption and advanced threat detection systems.",
                    stats: "99.99% secure",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    icon: <BarChart3 className="h-8 w-8" />,
                    title: "Real-time Analytics",
                    description:
                      "Live data processing and predictive analytics with quantum optimization.",
                    stats: "Real-time",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: <Bot className="h-8 w-8" />,
                    title: "AI Automation",
                    description:
                      "Intelligent automation systems with quantum decision-making capabilities.",
                    stats: "247 AI models",
                    color: "from-orange-500 to-red-500",
                  },
                  {
                    icon: <Globe className="h-8 w-8" />,
                    title: "Global Network",
                    description:
                      "Distributed quantum computing network with worldwide coverage.",
                    stats: "Global edge",
                    color: "from-indigo-500 to-purple-500",
                  },
                  {
                    icon: <Target className="h-8 w-8" />,
                    title: "Precision Targeting",
                    description:
                      "Quantum-enhanced targeting and optimization for maximum efficiency.",
                    stats: "99.8% accuracy",
                    color: "from-pink-500 to-rose-500",
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <Card className="border-0 bg-gradient-to-br from-black/40 to-purple-900/20 shadow-xl ring-1 ring-white/10 hover:ring-purple-500/30 transition-all duration-300">
                      <CardHeader>
                        <div
                          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} mb-4`}
                        >
                          {feature.icon}
                        </div>
                        <CardTitle className="text-xl">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 mb-4">
                          {feature.description}
                        </p>
                        <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                          {feature.stats}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Quantum AI Tab */}
            <TabsContent value="quantum" className="mt-8">
              <div className="grid gap-8 lg:grid-cols-2">
                <Card className="border-0 bg-gradient-to-br from-black/40 to-purple-900/20 shadow-xl ring-1 ring-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Atom className="h-5 w-5" />
                      Quantum Computing Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "IBM Quantum",
                          qubits: "433+",
                          status: "active",
                          fidelity: "99.9%",
                        },
                        {
                          name: "Google Sycamore",
                          qubits: "53+",
                          status: "active",
                          fidelity: "99.8%",
                        },
                        {
                          name: "Microsoft Azure",
                          qubits: "1000+",
                          status: "active",
                          fidelity: "99.7%",
                        },
                        {
                          name: "Amazon Braket",
                          qubits: "1000+",
                          status: "active",
                          fidelity: "99.6%",
                        },
                      ].map((provider) => (
                        <div
                          key={provider.name}
                          className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-black/20"
                        >
                          <div>
                            <div className="font-semibold">{provider.name}</div>
                            <div className="text-sm text-gray-400">
                              {provider.qubits} qubits
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              {provider.status}
                            </Badge>
                            <div className="text-sm text-gray-400 mt-1">
                              {provider.fidelity} fidelity
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-black/40 to-purple-900/20 shadow-xl ring-1 ring-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      AI Model Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={performanceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {performanceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ReTooltip
                            contentStyle={{
                              background: "rgba(0,0,0,0.9)",
                              borderRadius: 12,
                              border: "1px solid rgba(255,255,255,0.1)",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {performanceData.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center gap-2"
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm">{item.name}</span>
                          <span className="text-sm font-semibold ml-auto">
                            {item.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-8">
              <Card className="border-0 bg-gradient-to-br from-black/40 to-purple-900/20 shadow-xl ring-1 ring-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    System Performance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={systemMetrics}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 12, fill: "#9ca3af" }}
                        />
                        <YAxis
                          tick={{ fontSize: 12, fill: "#9ca3af" }}
                          domain={[80, 100]}
                        />
                        <ReTooltip
                          contentStyle={{
                            background: "rgba(0,0,0,0.9)",
                            borderRadius: 12,
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="ai"
                          stroke="#3b82f6"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="quantum"
                          stroke="#8b5cf6"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="neural"
                          stroke="#06b6d4"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="security"
                          stroke="#10b981"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="mt-8">
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="border-0 bg-gradient-to-br from-black/40 to-purple-900/20 shadow-xl ring-1 ring-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Protocols
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "Quantum Encryption",
                          status: "active",
                          level: "Maximum",
                        },
                        {
                          name: "Neural Firewall",
                          status: "active",
                          level: "Advanced",
                        },
                        {
                          name: "AI Threat Detection",
                          status: "active",
                          level: "Real-time",
                        },
                        {
                          name: "Zero Trust Architecture",
                          status: "active",
                          level: "Enabled",
                        },
                        {
                          name: "Quantum Key Distribution",
                          status: "active",
                          level: "Secure",
                        },
                      ].map((protocol) => (
                        <div
                          key={protocol.name}
                          className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-black/20"
                        >
                          <div>
                            <div className="font-semibold">{protocol.name}</div>
                            <div className="text-sm text-gray-400">
                              {protocol.level}
                            </div>
                          </div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            {protocol.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-to-br from-black/40 to-purple-900/20 shadow-xl ring-1 ring-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Live Security Feed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 overflow-auto space-y-2">
                      {events.slice(0, 10).map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-black/20"
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              event.kind === "security"
                                ? "bg-green-400"
                                : event.kind === "error"
                                ? "bg-red-400"
                                : "bg-blue-400"
                            }`}
                          ></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">
                              {event.message}
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(event.ts).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Automation Tab */}
            <TabsContent value="automation" className="mt-8">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Quantum Trading Bot",
                    description: "AI-powered trading with quantum optimization",
                    status: "active",
                    accuracy: "98.5%",
                    icon: <TrendingUp className="h-6 w-6" />,
                  },
                  {
                    name: "Content Generation AI",
                    description: "Quantum-enhanced content creation",
                    status: "active",
                    accuracy: "99.2%",
                    icon: <Bot className="h-6 w-6" />,
                  },
                  {
                    name: "Security Monitoring",
                    description: "Real-time threat detection and response",
                    status: "active",
                    accuracy: "99.9%",
                    icon: <Shield className="h-6 w-6" />,
                  },
                  {
                    name: "Data Analytics",
                    description: "Quantum-powered data processing",
                    status: "active",
                    accuracy: "97.8%",
                    icon: <BarChart3 className="h-6 w-6" />,
                  },
                  {
                    name: "Customer Support AI",
                    description: "Intelligent customer interaction",
                    status: "active",
                    accuracy: "96.3%",
                    icon: <MessageSquare className="h-6 w-6" />,
                  },
                  {
                    name: "Process Optimization",
                    description: "Quantum workflow optimization",
                    status: "active",
                    accuracy: "98.7%",
                    icon: <Settings className="h-6 w-6" />,
                  },
                ].map((bot) => (
                  <Card
                    key={bot.name}
                    className="border-0 bg-gradient-to-br from-black/40 to-purple-900/20 shadow-xl ring-1 ring-white/10"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                          {bot.icon}
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {bot.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{bot.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">{bot.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Accuracy</span>
                        <span className="text-sm font-semibold text-green-400">
                          {bot.accuracy}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Live Data Tab */}
            <TabsContent value="live" className="mt-8">
              <Card className="border-0 bg-gradient-to-br from-black/40 to-purple-900/20 shadow-xl ring-1 ring-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wifi className="h-5 w-5" />
                    Live System Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 overflow-auto space-y-2">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-black/20"
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            event.kind === "quantum"
                              ? "bg-purple-400"
                              : event.kind === "ai"
                              ? "bg-blue-400"
                              : event.kind === "neural"
                              ? "bg-cyan-400"
                              : event.kind === "security"
                              ? "bg-green-400"
                              : event.kind === "error"
                              ? "bg-red-400"
                              : "bg-gray-400"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {event.message}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(event.ts).toLocaleTimeString()} •{" "}
                            {event.kind}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">
                          {event.value.toFixed(1)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Experience the{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Future of AI?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of enterprises already leveraging quantum AI
              technology. Start your transformation today with our cutting-edge
              platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="h-14 gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-lg px-8">
                <Rocket className="h-5 w-5" />
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="h-14 gap-3 border-white/20 text-lg px-8"
              >
                <MessageSquare className="h-5 w-5" />
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <Atom className="h-5 w-5" />
                </div>
                <div className="font-bold text-xl">SUGGESTLY ELITE</div>
              </div>
              <p className="text-gray-400">
                The future of quantum AI is here. Experience unprecedented
                performance, security, and innovation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Quantum AI</li>
                <li>Neural Networks</li>
                <li>Analytics</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Enterprise AI</li>
                <li>Quantum Computing</li>
                <li>Automation</li>
                <li>Consulting</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Community</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 SUGGESTLY ELITE. All rights reserved. Quantum AI
              Platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
