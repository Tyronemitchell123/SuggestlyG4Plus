import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Brain,
  Atom,
  Crown,
  Shield,
  Zap,
  Settings,
  User,
  BarChart3,
  MessageSquare,
  FileText,
  Video,
  Music,
  Camera,
  Palette,
  Globe,
  Database,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Lock,
  Key,
  Star,
  Award,
  Trophy,
  Diamond,
  Infinity,
  Lightning,
  Cloud,
  Chip,
  Microchip,
  Memory,
  Storage,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Bot,
  Wand2,
  Sparkles,
  Layers,
  Target,
  Mic,
  Headphones,
  Monitor,
  Smartphone,
  Link,
  Unlink,
  Download,
  Upload,
  Save,
  FolderOpen,
  Disc,
  Radio,
  CheckCircle,
  AlertCircle,
  Cable,
  Bluetooth,
  Usb,
  Search,
  Film,
  Edit3,
  Scissors,
  RotateCw,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Sliders,
  Type,
  Image,
  Camera as CameraIcon,
  BrainCircuit,
  MachineLearning,
  DeepLearning,
  Copy,
  Share2,
  Grid,
  List,
  Maximize,
  Minimize,
  Square,
  Circle,
  Triangle,
  Network,
  Star as StarIcon,
  Calendar,
  Timer,
  CalendarDays,
  Mail,
  Phone,
  Cog,
  Code,
  Users,
  GraduationCap,
  Wrench,
  MessageSquare as MessageIcon,
} from 'lucide-react';

const EliteSidebar = ({ isOpen, onToggle }) => {
  const [expandedSections, setExpandedSections] = useState({
    quantum: false,
    ai: false,
    services: false,
    tools: false,
    analytics: false,
    support: false,
  });

  const [userTier] = useState('quantum-elite');

  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const quantumServices = [
    { name: 'Quantum Computing Hub', icon: Atom, status: 'active' },
    { name: 'Quantum AI Assistant', icon: BrainCircuit, status: 'active' },
    { name: 'Quantum Bot Automation', icon: Bot, status: 'active' },
    { name: 'Quantum DAW Connector', icon: Music, status: 'active' },
    { name: 'Quantum Analytics', icon: BarChart3, status: 'active' },
    { name: 'Quantum Security', icon: Shield, status: 'active' },
  ];

  const aiServices = [
    { name: 'AI Content Generator', icon: FileText, status: 'active' },
    { name: 'AI Content Studio', icon: Palette, status: 'active' },
    { name: 'AI Analytics Dashboard', icon: BarChart3, status: 'active' },
    { name: 'Neural Networks', icon: Brain, status: 'active' },
    { name: 'Machine Learning', icon: MachineLearning, status: 'active' },
    { name: 'Deep Learning', icon: DeepLearning, status: 'active' },
    { name: 'Predictive AI', icon: TrendingUp, status: 'active' },
  ];

  const premiumServices = [
    { name: 'Advanced Payment System', icon: DollarSign, status: 'active' },
    { name: 'Advanced Security Center', icon: Lock, status: 'active' },
    { name: 'Video Production Suite', icon: Video, status: 'active' },
    { name: 'Audio Equalizer', icon: Headphones, status: 'active' },
    { name: 'Hologram Cards', icon: Eye, status: 'active' },
    { name: 'Performance Dashboard', icon: TrendingUp, status: 'active' },
    { name: 'Site Manager', icon: Globe, status: 'active' },
    { name: 'Settings Panel', icon: Settings, status: 'active' },
  ];

  const tools = [
    { name: 'File Upload', icon: Upload, status: 'active' },
    { name: 'Image Processing', icon: Image, status: 'active' },
    { name: 'Audio Processing', icon: Volume2, status: 'active' },
    { name: 'Video Editing', icon: Scissors, status: 'active' },
    { name: 'Data Analysis', icon: PieChart, status: 'active' },
    { name: 'System Monitoring', icon: Monitor, status: 'active' },
  ];

  const analytics = [
    { name: 'Performance Metrics', icon: BarChart3, status: 'active' },
    { name: 'User Analytics', icon: User, status: 'active' },
    { name: 'System Health', icon: CheckCircle, status: 'active' },
    { name: 'Quantum Metrics', icon: Atom, status: 'active' },
    { name: 'AI Insights', icon: Brain, status: 'active' },
  ];

  const support = [
    { name: 'Elite Support', icon: Crown, status: 'active' },
    { name: 'Documentation', icon: FileText, status: 'active' },
    { name: 'API Reference', icon: Code, status: 'active' },
    { name: 'Community', icon: Users, status: 'active' },
    { name: 'Training', icon: GraduationCap, status: 'active' },
  ];

  const getTierColor = tier => {
    switch (tier) {
      case 'quantum-elite':
        return 'text-purple-400 bg-purple-400/20 border-purple-400/50';
      case 'premium':
        return 'text-blue-400 bg-blue-400/20 border-blue-400/50';
      case 'professional':
        return 'text-green-400 bg-green-400/20 border-green-400/50';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/50';
    }
  };

  const getTierIcon = tier => {
    switch (tier) {
      case 'quantum-elite':
        return Diamond;
      case 'premium':
        return Crown;
      case 'professional':
        return Star;
      default:
        return User;
    }
  };

  const TierIcon = getTierIcon(userTier);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed left-0 top-0 h-full w-96 bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-900 border-r border-purple-400/30 backdrop-blur-xl z-50 shadow-2xl shadow-purple-500/20"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-purple-400/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-400/50">
                <Atom className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  SUGGESTLY ELITE
                </h2>
                <p className="text-xs text-purple-300">Quantum Platform</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg bg-purple-800/50 hover:bg-purple-700/50 transition-colors"
            >
              <X className="w-5 h-5 text-purple-300" />
            </button>
          </div>

          {/* User Tier Display */}
          <div
            className={`p-4 mx-4 mt-4 rounded-xl border ${getTierColor(userTier)}`}
          >
            <div className="flex items-center space-x-3">
              <TierIcon className="w-6 h-6" />
              <div>
                <p className="font-semibold capitalize">
                  {userTier.replace('-', ' ')}
                </p>
                <p className="text-xs opacity-80">Ultra Premium Access</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {/* Home */}
            <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-purple-800/30 hover:bg-purple-700/30 transition-colors text-left">
              <Home className="w-5 h-5 text-purple-300" />
              <span className="text-purple-200 font-medium">Dashboard</span>
            </button>

            {/* Quantum Services */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('quantum')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-purple-800/30 hover:bg-purple-700/30 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <Atom className="w-5 h-5 text-purple-300" />
                  <span className="text-purple-200 font-medium">
                    Quantum Services
                  </span>
                </div>
                {expandedSections.quantum ? (
                  <ChevronDown className="w-4 h-4 text-purple-300" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-purple-300" />
                )}
              </button>

              <AnimatePresence>
                {expandedSections.quantum && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-8 space-y-1">
                      {quantumServices.map((service, index) => (
                        <motion.button
                          key={service.name}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-700/20 transition-colors text-left"
                        >
                          <service.icon className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-purple-300">
                            {service.name}
                          </span>
                          <div className="w-2 h-2 bg-green-400 rounded-full ml-auto"></div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* AI Services */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('ai')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-purple-800/30 hover:bg-purple-700/30 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <Brain className="w-5 h-5 text-purple-300" />
                  <span className="text-purple-200 font-medium">
                    AI Services
                  </span>
                </div>
                {expandedSections.ai ? (
                  <ChevronDown className="w-4 h-4 text-purple-300" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-purple-300" />
                )}
              </button>

              <AnimatePresence>
                {expandedSections.ai && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-8 space-y-1">
                      {aiServices.map((service, index) => (
                        <motion.button
                          key={service.name}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-700/20 transition-colors text-left"
                        >
                          <service.icon className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-purple-300">
                            {service.name}
                          </span>
                          <div className="w-2 h-2 bg-green-400 rounded-full ml-auto"></div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Premium Services */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('services')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-purple-800/30 hover:bg-purple-700/30 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <Crown className="w-5 h-5 text-purple-300" />
                  <span className="text-purple-200 font-medium">
                    Premium Services
                  </span>
                </div>
                {expandedSections.services ? (
                  <ChevronDown className="w-4 h-4 text-purple-300" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-purple-300" />
                )}
              </button>

              <AnimatePresence>
                {expandedSections.services && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-8 space-y-1">
                      {premiumServices.map((service, index) => (
                        <motion.button
                          key={service.name}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-700/20 transition-colors text-left"
                        >
                          <service.icon className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-purple-300">
                            {service.name}
                          </span>
                          <div className="w-2 h-2 bg-green-400 rounded-full ml-auto"></div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tools */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('tools')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-purple-800/30 hover:bg-purple-700/30 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <Wrench className="w-5 h-5 text-purple-300" />
                  <span className="text-purple-200 font-medium">Tools</span>
                </div>
                {expandedSections.tools ? (
                  <ChevronDown className="w-4 h-4 text-purple-300" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-purple-300" />
                )}
              </button>

              <AnimatePresence>
                {expandedSections.tools && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-8 space-y-1">
                      {tools.map((tool, index) => (
                        <motion.button
                          key={tool.name}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-700/20 transition-colors text-left"
                        >
                          <tool.icon className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-purple-300">
                            {tool.name}
                          </span>
                          <div className="w-2 h-2 bg-green-400 rounded-full ml-auto"></div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Analytics */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('analytics')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-purple-800/30 hover:bg-purple-700/30 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-purple-300" />
                  <span className="text-purple-200 font-medium">Analytics</span>
                </div>
                {expandedSections.analytics ? (
                  <ChevronDown className="w-4 h-4 text-purple-300" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-purple-300" />
                )}
              </button>

              <AnimatePresence>
                {expandedSections.analytics && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-8 space-y-1">
                      {analytics.map((item, index) => (
                        <motion.button
                          key={item.name}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-700/20 transition-colors text-left"
                        >
                          <item.icon className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-purple-300">
                            {item.name}
                          </span>
                          <div className="w-2 h-2 bg-green-400 rounded-full ml-auto"></div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Support */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('support')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-purple-800/30 hover:bg-purple-700/30 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <MessageIcon className="w-5 h-5 text-purple-300" />
                  <span className="text-purple-200 font-medium">Support</span>
                </div>
                {expandedSections.support ? (
                  <ChevronDown className="w-4 h-4 text-purple-300" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-purple-300" />
                )}
              </button>

              <AnimatePresence>
                {expandedSections.support && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-8 space-y-1">
                      {support.map((item, index) => (
                        <motion.button
                          key={item.name}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-700/20 transition-colors text-left"
                        >
                          <item.icon className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-purple-300">
                            {item.name}
                          </span>
                          <div className="w-2 h-2 bg-green-400 rounded-full ml-auto"></div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-purple-400/30">
            <div className="flex items-center justify-between text-xs text-purple-300">
              <span>Quantum Elite v2.0</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EliteSidebar;
