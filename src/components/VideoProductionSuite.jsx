import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Play,
  Pause,
  Settings,
  Crown,
  Shield,
  Zap,
  Brain,
  Sparkles,
  Layers,
  Target,
  BarChart3,
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
  Music,
  Disc,
  Radio,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertCircle,
  Database,
  Server,
  Cpu,
  HardDrive,
  Cable,
  Bluetooth,
  Usb,
  Search,
  Video,
  Film,
  Edit3,
  Scissors,
  RotateCw,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Sliders,
  Palette,
  Type,
  Image,
  Camera,
  Wand2,
  BrainCircuit,
  Bot,
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
  Atom,
  Network,
  Globe,
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
  Lock,
  Key,
  AlertTriangle,
  XCircle,
  CheckCircle as CheckCircleIcon,
  StopCircle,
  RotateCcw,
  Cog,
  Wrench,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Timer,
  CalendarDays,
  Sun,
  Contrast,
  ArrowRight,
  Clock,
} from 'lucide-react';

const VideoProductionSuite = () => {
  const [activeTab, setActiveTab] = useState('timeline');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedClip, setSelectedClip] = useState(null);
  const [effects, setEffects] = useState([]);
  const [transitions, setTransitions] = useState([]);
  const [textOverlays, setTextOverlays] = useState([]);
  const [isRendering, setIsRendering] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Video effects
  const availableEffects = [
    { id: 'brightness', name: 'Brightness', icon: Sun, category: 'color' },
    { id: 'contrast', name: 'Contrast', icon: Contrast, category: 'color' },
    { id: 'saturation', name: 'Saturation', icon: Palette, category: 'color' },
    { id: 'blur', name: 'Blur', icon: EyeOff, category: 'filter' },
    { id: 'sharpen', name: 'Sharpen', icon: Target, category: 'filter' },
    { id: 'vintage', name: 'Vintage', icon: Camera, category: 'style' },
    { id: 'cinematic', name: 'Cinematic', icon: Film, category: 'style' },
    { id: 'neon', name: 'Neon', icon: Zap, category: 'style' },
  ];

  // Transitions
  const availableTransitions = [
    { id: 'fade', name: 'Fade', icon: Eye, duration: 1000 },
    { id: 'slide', name: 'Slide', icon: ArrowRight, duration: 800 },
    { id: 'zoom', name: 'Zoom', icon: Maximize, duration: 600 },
    { id: 'dissolve', name: 'Dissolve', icon: Scissors, duration: 1200 },
    { id: 'wipe', name: 'Wipe', icon: Square, duration: 900 },
    { id: 'morph', name: 'Morph', icon: Circle, duration: 1500 },
  ];

  // Text overlay templates
  const textTemplates = [
    { id: 'title', name: 'Title', style: 'large-bold' },
    { id: 'subtitle', name: 'Subtitle', style: 'medium-italic' },
    { id: 'caption', name: 'Caption', style: 'small-clean' },
    { id: 'callout', name: 'Callout', style: 'highlight-box' },
    { id: 'lower-third', name: 'Lower Third', style: 'news-style' },
    { id: 'watermark', name: 'Watermark', style: 'subtle-overlay' },
  ];

  // Handle video upload
  const handleVideoUpload = useCallback(event => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      if (videoRef.current) {
        videoRef.current.src = url;
        videoRef.current.load();
      }
      toast.success('Video uploaded successfully!');
    } else {
      toast.error('Please select a valid video file');
    }
  }, []);

  // Video controls
  const togglePlayback = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  const handleSeek = useCallback(
    e => {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * duration;

      if (videoRef.current) {
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    },
    [duration]
  );

  // Add effect
  const addEffect = useCallback(effect => {
    setEffects(prev => [...prev, { ...effect, id: Date.now(), enabled: true }]);
    toast.success(`${effect.name} effect added`);
  }, []);

  // Add transition
  const addTransition = useCallback(transition => {
    setTransitions(prev => [
      ...prev,
      { ...transition, id: Date.now(), enabled: true },
    ]);
    toast.success(`${transition.name} transition added`);
  }, []);

  // Add text overlay
  const addTextOverlay = useCallback(template => {
    const newOverlay = {
      id: Date.now(),
      text: 'Edit this text',
      template: template,
      position: { x: 50, y: 50 },
      enabled: true,
    };
    setTextOverlays(prev => [...prev, newOverlay]);
    toast.success(`${template.name} text overlay added`);
  }, []);

  // Render video
  const renderVideo = useCallback(async () => {
    setIsRendering(true);

    // Simulate rendering process
    await new Promise(resolve => setTimeout(resolve, 5000));

    setIsRendering(false);
    toast.success('Video rendered successfully!');
  }, []);

  // Format time
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-darker via-luxury-dark to-luxury-darker text-luxury-light">
      {/* Header */}
      <div className="bg-glass backdrop-blur-md border-b border-luxury-gold/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-xl flex items-center justify-center">
                <Film className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold">
                  SUGGESTLY ELITE
                </h1>
                <p className="text-luxury-gray text-sm">
                  Video Production Suite
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-luxury-gold" />
                <span className="text-sm font-medium">
                  Professional Editing
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-luxury-gold" />
                <span className="text-sm font-medium">4K Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Video Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold">
                  Video Preview
                </h2>
                <div className="flex items-center space-x-2">
                  <Upload className="w-4 h-4 text-luxury-gold" />
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="text-sm text-luxury-gold cursor-pointer hover:underline"
                  >
                    Upload Video
                  </label>
                </div>
              </div>

              <div className="relative bg-black rounded-xl overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-96 object-contain"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={togglePlayback}
                      className="w-10 h-10 bg-luxury-gold/20 rounded-full flex items-center justify-center hover:bg-luxury-gold/30 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div
                        className="w-full h-2 bg-gray-600 rounded-full cursor-pointer"
                        onClick={handleSeek}
                      >
                        <div
                          className="h-full bg-luxury-gold rounded-full transition-all"
                          style={{
                            width: `${(currentTime / duration) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="w-8 h-8 bg-luxury-gold/20 rounded flex items-center justify-center hover:bg-luxury-gold/30 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={e => setVolume(e.target.value)}
                        className="w-20"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold">Timeline</h2>
                <div className="flex items-center space-x-2">
                  <Scissors className="w-4 h-4 text-luxury-gold" />
                  <span className="text-sm text-luxury-gray">
                    Professional Editing
                  </span>
                </div>
              </div>

              <div className="bg-luxury-dark/50 rounded-lg p-4 h-32 overflow-x-auto">
                <div className="flex space-x-2 min-w-max">
                  {/* Timeline tracks would go here */}
                  <div className="w-64 h-20 bg-luxury-gold/20 rounded border border-luxury-gold/30 flex items-center justify-center">
                    <span className="text-sm text-luxury-gray">
                      Video Track
                    </span>
                  </div>
                  <div className="w-64 h-20 bg-luxury-gold/20 rounded border border-luxury-gold/30 flex items-center justify-center">
                    <span className="text-sm text-luxury-gray">
                      Audio Track
                    </span>
                  </div>
                  <div className="w-64 h-20 bg-luxury-gold/20 rounded border border-luxury-gold/30 flex items-center justify-center">
                    <span className="text-sm text-luxury-gray">
                      Effects Track
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Render Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold">
                  Export & Render
                </h2>
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4 text-luxury-gold" />
                  <span className="text-sm text-luxury-gray">
                    High Quality Export
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Quality
                  </label>
                  <select className="w-full bg-luxury-dark border border-luxury-gold/30 rounded-lg px-3 py-2 text-sm">
                    <option value="4k">4K Ultra HD</option>
                    <option value="1080p">1080p Full HD</option>
                    <option value="720p">720p HD</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Format
                  </label>
                  <select className="w-full bg-luxury-dark border border-luxury-gold/30 rounded-lg px-3 py-2 text-sm">
                    <option value="mp4">MP4</option>
                    <option value="mov">MOV</option>
                    <option value="avi">AVI</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Codec
                  </label>
                  <select className="w-full bg-luxury-dark border border-luxury-gold/30 rounded-lg px-3 py-2 text-sm">
                    <option value="h264">H.264</option>
                    <option value="h265">H.265</option>
                    <option value="prores">ProRes</option>
                  </select>
                </div>
              </div>

              <button
                onClick={renderVideo}
                disabled={isRendering}
                className="w-full mt-4 flex items-center justify-center space-x-2 bg-gradient-to-r from-luxury-gold to-yellow-500 text-black font-medium py-3 px-4 rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRendering ? (
                  <Clock className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                <span>{isRendering ? 'Rendering...' : 'Render Video'}</span>
              </button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Effects Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <h3 className="text-lg font-display font-bold mb-4">
                Video Effects
              </h3>

              <div className="space-y-3">
                {availableEffects.map(effect => (
                  <div
                    key={effect.id}
                    className="bg-luxury-dark/50 rounded-lg p-3 cursor-pointer hover:bg-luxury-gold/10 transition-colors"
                    onClick={() => addEffect(effect)}
                  >
                    <div className="flex items-center space-x-3">
                      <effect.icon className="w-5 h-5 text-luxury-gold" />
                      <div>
                        <h4 className="font-medium text-sm">{effect.name}</h4>
                        <p className="text-xs text-luxury-gray capitalize">
                          {effect.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Transitions Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <h3 className="text-lg font-display font-bold mb-4">
                Transitions
              </h3>

              <div className="space-y-3">
                {availableTransitions.map(transition => (
                  <div
                    key={transition.id}
                    className="bg-luxury-dark/50 rounded-lg p-3 cursor-pointer hover:bg-luxury-gold/10 transition-colors"
                    onClick={() => addTransition(transition)}
                  >
                    <div className="flex items-center space-x-3">
                      <transition.icon className="w-5 h-5 text-luxury-gold" />
                      <div>
                        <h4 className="font-medium text-sm">
                          {transition.name}
                        </h4>
                        <p className="text-xs text-luxury-gray">
                          {transition.duration}ms
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Text Overlays Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <h3 className="text-lg font-display font-bold mb-4">
                Text Overlays
              </h3>

              <div className="space-y-3">
                {textTemplates.map(template => (
                  <div
                    key={template.id}
                    className="bg-luxury-dark/50 rounded-lg p-3 cursor-pointer hover:bg-luxury-gold/10 transition-colors"
                    onClick={() => addTextOverlay(template)}
                  >
                    <div className="flex items-center space-x-3">
                      <Type className="w-5 h-5 text-luxury-gold" />
                      <div>
                        <h4 className="font-medium text-sm">{template.name}</h4>
                        <p className="text-xs text-luxury-gray">
                          {template.style}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoProductionSuite;
