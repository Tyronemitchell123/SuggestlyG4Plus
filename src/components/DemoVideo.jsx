import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  RotateCcw,
  Settings,
  Download,
  Share2,
  Heart,
  MessageCircle,
  Eye,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Globe,
  Brain,
  Palette,
  Server,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  Zap,
  Crown,
  Rocket,
  Atom,
  Wand2,
  Briefcase,
  Shield,
  Code,
  Music,
  Video,
  FileText,
  Search,
  Edit3,
  Copy,
  Network,
  Vr,
  Activity,
  Cloud,
  Lock,
  BarChart3,
  PieChart,
  Eye as EyeIcon,
  Settings as SettingsIcon,
  Tool,
  GraduationCap,
  Home,
  Factory,
  Car,
  Camera,
  Headphones,
  Mic,
  Image,
  Film,
  Gamepad2,
  Bluetooth,
  WifiOff,
  HardDrive,
  Cable,
  Usb,
  Scissors,
  RotateCw,
  VolumeX as VolumeXIcon,
  EyeOff,
  Sliders,
  Type,
  BrainCircuit,
  MachineLearning,
  DeepLearning,
  Share2 as Share2Icon,
  Grid,
  List,
  Maximize as MaximizeIcon,
  Minimize as MinimizeIcon,
  Square,
  Circle,
  Triangle,
  Star as StarIcon,
  Trophy,
  Diamond,
  Infinity,
  Lightning,
  Chip,
  Microchip,
  Memory,
  Storage,
  TrendingDown,
  PieChart as PieChartIcon,
  Key,
  AlertTriangle,
  XCircle,
  StopCircle,
  RotateCcw as RotateCcwIcon,
  Cog,
  Wrench,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Timer,
  CalendarDays,
  Clock as ClockIcon,
  Code as CodeIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';

const DemoVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120); // 2 minutes in seconds
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [activeFeature, setActiveFeature] = useState(null);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Demo video timeline with features to highlight
  const videoTimeline = [
    {
      time: 0,
      title: "Welcome to Suggestly",
      description: "The ultimate all-in-one digital platform",
      icon: Globe,
      color: "from-blue-500 to-cyan-500"
    },
    {
      time: 15,
      title: "AI-Powered Website Builder",
      description: "Create stunning websites in minutes with AI",
      icon: Wand2,
      color: "from-purple-500 to-pink-500"
    },
    {
      time: 30,
      title: "Multi-Site Hosting Platform",
      description: "Manage unlimited websites from one dashboard",
      icon: Server,
      color: "from-green-500 to-emerald-500"
    },
    {
      time: 45,
      title: "Quantum Computing Integration",
      description: "Cutting-edge technology for advanced analytics",
      icon: Atom,
      color: "from-orange-500 to-red-500"
    },
    {
      time: 60,
      title: "Digital Agency Services",
      description: "Complete business solutions for growth",
      icon: Briefcase,
      color: "from-indigo-500 to-purple-500"
    },
    {
      time: 75,
      title: "White-Label Solutions",
      description: "Resell our services under your brand",
      icon: Copy,
      color: "from-yellow-500 to-orange-500"
    },
    {
      time: 90,
      title: "Enterprise Security",
      description: "Bank-level security for your business",
      icon: Shield,
      color: "from-red-500 to-pink-500"
    },
    {
      time: 105,
      title: "Revenue Potential",
      description: "Earn $50K+ monthly with our ecosystem",
      icon: DollarSign,
      color: "from-green-500 to-blue-500"
    }
  ];

  // Service highlights for the demo
  const serviceHighlights = [
    {
      name: "Website Design",
      price: "$2,000-5,000/site",
      icon: Palette,
      features: ["Custom Design", "SEO Optimized", "Mobile Responsive"]
    },
    {
      name: "AI Content Studio",
      price: "$199-599/month",
      icon: FileText,
      features: ["AI Writing", "Image Generation", "Content Optimization"]
    },
    {
      name: "Multi-Site Platform",
      price: "$299-999/month",
      icon: Server,
      features: ["Unlimited Sites", "Custom Domains", "Admin Panel"]
    },
    {
      name: "Quantum Computing",
      price: "$1,000-5,000/month",
      icon: Atom,
      features: ["Advanced Analytics", "AI Optimization", "Real-time Processing"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && currentTime < duration) {
        setCurrentTime(prev => prev + 1);
        
        // Check for timeline events
        const currentEvent = videoTimeline.find(event => 
          Math.abs(event.time - currentTime) <= 1
        );
        if (currentEvent) {
          setActiveFeature(currentEvent);
          toast.success(`Now showing: ${currentEvent.title}`, {
            duration: 2000,
            position: 'top-right'
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration, videoTimeline]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const skipTime = (seconds) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = (e) => {
    const newTime = e.target.currentTime;
    setCurrentTime(newTime);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            See Suggestly in Action
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch our 2-minute demo to discover how our complete service ecosystem can transform your business
          </p>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-black rounded-2xl overflow-hidden shadow-2xl"
          ref={containerRef}
        >
          {/* Video Container */}
          <div className="relative aspect-video bg-gradient-to-br from-purple-900 to-blue-900">
            {/* Demo Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <Play className="w-16 h-16 text-white ml-2" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Suggestly Demo Video</h3>
                <p className="text-gray-300">2 minutes • HD Quality</p>
              </div>
            </div>

            {/* Feature Overlay */}
            {activeFeature && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${activeFeature.color}`}>
                    <activeFeature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{activeFeature.title}</h4>
                    <p className="text-gray-300 text-sm">{activeFeature.description}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              {/* Progress Bar */}
              <div 
                className="w-full h-2 bg-white/20 rounded-full cursor-pointer mb-4"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => skipTime(-10)}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300"
                  >
                    <SkipBack className="w-5 h-5 text-white" />
                  </button>
                  
                  <button
                    onClick={() => skipTime(10)}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300"
                  >
                    <SkipForward className="w-5 h-5 text-white" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>

                  <div className="flex items-center gap-2 text-white text-sm">
                    <span>{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300"
                  >
                    {isFullscreen ? (
                      <Minimize className="w-5 h-5 text-white" />
                    ) : (
                      <Maximize className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6">Demo Timeline</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {videoTimeline.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                  Math.abs(event.time - currentTime) <= 5
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/10 bg-white/5 hover:border-purple-500/30'
                }`}
                onClick={() => {
                  setCurrentTime(event.time);
                  setActiveFeature(event);
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${event.color}`}>
                    <event.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-400">{formatTime(event.time)}</span>
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">{event.title}</h4>
                <p className="text-gray-300 text-xs">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Service Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {serviceHighlights.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{service.name}</h4>
                  <p className="text-green-400 text-sm font-bold">{service.price}</p>
                </div>
              </div>
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/30">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using Suggestly to scale their operations and increase revenue
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                Schedule Demo
                <Calendar className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">2:00</div>
            <div className="text-gray-300">Demo Duration</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">18+</div>
            <div className="text-gray-300">Services Showcased</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">$50K+</div>
            <div className="text-gray-300">Monthly Revenue Potential</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
            <div className="text-gray-300">Ready to Deploy</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoVideo;



