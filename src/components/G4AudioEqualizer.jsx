import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Play,
  Pause,
  Upload,
  Download,
  Settings,
  Volume2,
  VolumeX,
  RotateCcw,
  Save,
  Loader2,
  Zap,
  Crown,
  Shield,
  FolderOpen,
  Brain,
  Sparkles,
  Layers,
  Target,
  Waveform,
  Mic,
  Headphones,
  Monitor,
  Smartphone,
} from 'lucide-react';

const G4AudioEqualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentMode, setCurrentMode] = useState('g4-dual'); // 'g4-dual', 'stereo', 'mid-side', 'ai-enhanced'
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('g4-flat');
  const [showPresets, setShowPresets] = useState(false);
  const [aiEnhancement, setAiEnhancement] = useState(false);
  const [adaptiveMode, setAdaptiveMode] = useState(false);
  const [phaseCorrection, setPhaseCorrection] = useState(true);
  const [harmonicEnhancement, setHarmonicEnhancement] = useState(false);

  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // G4 Enhanced frequency bands with dual processing
  const g4FrequencyBands = [
    { freq: 20, label: '20Hz', gain: 0, q: 1.0, phase: 0 },
    { freq: 40, label: '40Hz', gain: 0, q: 1.0, phase: 0 },
    { freq: 80, label: '80Hz', gain: 0, q: 1.0, phase: 0 },
    { freq: 160, label: '160Hz', gain: 0, q: 1.0, phase: 0 },
    { freq: 315, label: '315Hz', gain: 0, q: 1.0, phase: 0 },
    { freq: 630, label: '630Hz', gain: 0, q: 1.0, phase: 0 },
    { freq: 1250, label: '1.25kHz', gain: 0, q: 1.0, phase: 0 },
    { freq: 2500, label: '2.5kHz', gain: 0, q: 1.0, phase: 0 },
    { freq: 5000, label: '5kHz', gain: 0, q: 1.0, phase: 0 },
    { freq: 10000, label: '10kHz', gain: 0, q: 1.0, phase: 0 },
    { freq: 16000, label: '16kHz', gain: 0, q: 1.0, phase: 0 },
    { freq: 20000, label: '20kHz', gain: 0, q: 1.0, phase: 0 },
  ];

  const [eqBands, setEqBands] = useState(g4FrequencyBands);

  // G4 Advanced Preset configurations
  const g4Presets = {
    'g4-flat': {
      name: 'G4 Flat',
      description: 'Neutral response with phase correction',
    },
    'g4-vocal': { name: 'G4 Vocal', description: 'AI-enhanced vocal clarity' },
    'g4-bass': {
      name: 'G4 Bass',
      description: 'Enhanced low frequencies with harmonics',
    },
    'g4-treble': {
      name: 'G4 Treble',
      description: 'Crystal clear high frequencies',
    },
    'g4-podcast': {
      name: 'G4 Podcast',
      description: 'Professional speech optimization',
    },
    'g4-music': {
      name: 'G4 Music',
      description: 'Balanced for all music genres',
    },
    'g4-studio': {
      name: 'G4 Studio',
      description: 'Professional studio mastering',
    },
    'g4-live': {
      name: 'G4 Live',
      description: 'Optimized for live performance',
    },
    'g4-mobile': {
      name: 'G4 Mobile',
      description: 'Enhanced for mobile devices',
    },
    'g4-custom': { name: 'G4 Custom', description: 'Your saved settings' },
  };

  // Processing modes
  const processingModes = [
    {
      id: 'g4-dual',
      name: 'G4 Dual Mode',
      description: 'Advanced dual-channel processing',
      icon: Layers,
    },
    {
      id: 'stereo',
      name: 'Stereo Mode',
      description: 'Traditional stereo processing',
      icon: Headphones,
    },
    {
      id: 'mid-side',
      name: 'Mid/Side Mode',
      description: 'Center and stereo width control',
      icon: Target,
    },
    {
      id: 'ai-enhanced',
      name: 'AI Enhanced',
      description: 'AI-powered adaptive processing',
      icon: Brain,
    },
  ];

  // Initialize Web Audio API
  useEffect(() => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 512; // Higher resolution for G4
      analyserRef.current.smoothingTimeConstant = 0.8;
    }
  }, []);

  // Handle file upload
  const handleFileUpload = useCallback(event => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setIsPlaying(false);
      toast.success('Audio file loaded successfully!');
    }
  }, []);

  // Play/pause audio
  const togglePlayback = useCallback(async () => {
    if (!audioUrl) return;

    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [audioUrl, isPlaying]);

  // Update EQ band
  const updateEQBand = useCallback((index, gain) => {
    setEqBands(prev =>
      prev.map((band, i) => (i === index ? { ...band, gain } : band))
    );
  }, []);

  // Apply G4 preset
  const applyG4Preset = useCallback(presetName => {
    const presetGains = {
      'g4-flat': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      'g4-vocal': [0, 0, 0, 2, 4, 6, 8, 10, 8, 6, 4, 2],
      'g4-bass': [8, 6, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      'g4-treble': [0, 0, 0, 0, 0, 0, 0, 2, 4, 6, 8, 10],
      'g4-podcast': [0, 0, 2, 4, 6, 8, 10, 8, 6, 4, 2, 0],
      'g4-music': [2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4],
      'g4-studio': [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3],
      'g4-live': [3, 2, 1, 0, 0, 0, 0, 1, 2, 3, 4, 5],
      'g4-mobile': [0, 0, 2, 4, 6, 8, 6, 4, 2, 0, 0, 0],
    };

    if (presetGains[presetName]) {
      setEqBands(prev =>
        prev.map((band, i) => ({
          ...band,
          gain: presetGains[presetName][i] || 0,
        }))
      );
    }
    setSelectedPreset(presetName);
    toast.success(`Applied ${g4Presets[presetName].name} preset`);
  }, []);

  // Reset EQ
  const resetEQ = useCallback(() => {
    setEqBands(g4FrequencyBands);
    setSelectedPreset('g4-flat');
    toast.success('EQ reset to G4 Flat');
  }, []);

  // Save custom preset
  const saveCustomPreset = useCallback(() => {
    const customGains = eqBands.map(band => band.gain);
    localStorage.setItem('suggestly_g4_eq_custom', JSON.stringify(customGains));
    toast.success('G4 Custom preset saved!');
  }, [eqBands]);

  // Load custom preset
  const loadCustomPreset = useCallback(() => {
    const saved = localStorage.getItem('suggestly_g4_eq_custom');
    if (saved) {
      const customGains = JSON.parse(saved);
      setEqBands(prev =>
        prev.map((band, i) => ({
          ...band,
          gain: customGains[i] || 0,
        }))
      );
      setSelectedPreset('g4-custom');
      toast.success('G4 Custom preset loaded!');
    }
  }, []);

  // Export processed audio
  const exportAudio = useCallback(async () => {
    if (!audioFile) return;

    setIsProcessing(true);
    // Simulate G4 audio processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // In a real implementation, this would process the audio with G4 EQ settings
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `g4_processed_${audioFile.name}`;
    link.click();

    setIsProcessing(false);
    toast.success('G4 processed audio exported!');
  }, [audioFile, audioUrl]);

  // AI Enhancement toggle
  const toggleAIEnhancement = useCallback(() => {
    setAiEnhancement(!aiEnhancement);
    toast.success(
      aiEnhancement ? 'AI Enhancement disabled' : 'AI Enhancement enabled'
    );
  }, [aiEnhancement]);

  // Adaptive mode toggle
  const toggleAdaptiveMode = useCallback(() => {
    setAdaptiveMode(!adaptiveMode);
    toast.success(
      adaptiveMode ? 'Adaptive mode disabled' : 'Adaptive mode enabled'
    );
  }, [adaptiveMode]);

  // Canvas visualization with G4 enhancements
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current) return;

    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        // G4 enhanced gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#d69e2e');
        gradient.addColorStop(0.5, '#ffd700');
        gradient.addColorStop(1, '#1a365d');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        // Add sparkle effect for G4
        if (Math.random() > 0.95) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(
            x + barWidth / 2 - 1,
            canvas.height - barHeight - 2,
            2,
            2
          );
        }

        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-darker via-luxury-dark to-luxury-darker text-luxury-light">
      {/* Header */}
      <div className="bg-glass backdrop-blur-md border-b border-luxury-gold/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold">
                  SUGGESTLY ELITE
                </h1>
                <p className="text-luxury-gray text-sm">
                  G4 Advanced Audio Equalizer
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-luxury-gold" />
                <span className="text-sm font-medium">G4 Dual Mode</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-luxury-gold" />
                <span className="text-sm font-medium">AI Enhanced</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Controls */}
          <div className="lg:col-span-3 space-y-6">
            {/* File Upload & Playback */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold">
                  G4 Audio Source
                </h2>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-luxury-gold" />
                  <span className="text-sm text-luxury-gray">
                    G4 Real-time Processing
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {/* File Upload */}
                <div className="border-2 border-dashed border-luxury-gold/30 rounded-xl p-6 text-center hover:border-luxury-gold/50 transition-colors">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="g4-audio-upload"
                  />
                  <label htmlFor="g4-audio-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-luxury-gold mx-auto mb-2" />
                    <p className="text-luxury-light font-medium">
                      Upload Audio File
                    </p>
                    <p className="text-luxury-gray text-sm">
                      MP3, WAV, FLAC, AAC - G4 Enhanced
                    </p>
                  </label>
                </div>

                {/* Audio Player */}
                {audioUrl && (
                  <div className="flex items-center justify-between bg-luxury-dark/50 rounded-xl p-4">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={togglePlayback}
                        className="w-12 h-12 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-xl flex items-center justify-center hover:scale-105 transition-transform"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 text-black" />
                        ) : (
                          <Play className="w-5 h-5 text-black ml-1" />
                        )}
                      </button>
                      <div>
                        <p className="font-medium">
                          {audioFile?.name || 'Audio File'}
                        </p>
                        <p className="text-luxury-gray text-sm">
                          {isPlaying ? 'Playing' : 'Paused'} - G4 Processing
                          Active
                        </p>
                      </div>
                    </div>

                    <audio
                      ref={audioRef}
                      src={audioUrl}
                      onEnded={() => setIsPlaying(false)}
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* G4 Processing Mode Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold">
                  G4 Processing Mode
                </h2>
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-luxury-gold" />
                  <span className="text-sm text-luxury-gray">
                    Advanced Processing
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {processingModes.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setCurrentMode(mode.id)}
                    className={`p-4 rounded-xl border transition-all ${
                      currentMode === mode.id
                        ? 'bg-luxury-gold/20 border-luxury-gold/50'
                        : 'bg-luxury-dark/50 border-luxury-gold/30 hover:border-luxury-gold/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <mode.icon className="w-4 h-4 text-luxury-gold" />
                      <span className="text-sm font-medium">{mode.name}</span>
                    </div>
                    <p className="text-xs text-luxury-gray">
                      {mode.description}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* G4 Equalizer Bands */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold">G4 Equalizer</h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={resetEQ}
                    className="flex items-center space-x-1 text-luxury-gold hover:text-luxury-light transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="text-sm">Reset</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-1">
                {eqBands.map((band, index) => (
                  <div
                    key={band.freq}
                    className="flex flex-col items-center space-y-2"
                  >
                    <div className="text-xs text-luxury-gray text-center">
                      {band.label}
                    </div>
                    <div className="relative h-32 w-6">
                      <input
                        type="range"
                        min="-15"
                        max="15"
                        step="0.1"
                        value={band.gain}
                        onChange={e =>
                          updateEQBand(index, parseFloat(e.target.value))
                        }
                        className="absolute inset-0 w-6 h-32 appearance-none bg-transparent cursor-pointer"
                        style={{
                          writingMode: 'bt-lr',
                          transform: 'rotate(270deg) translateX(-50%)',
                          transformOrigin: 'center',
                        }}
                      />
                      <div className="absolute inset-0 bg-luxury-dark rounded-full">
                        <div
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-t from-luxury-gold to-yellow-500 rounded-full w-2 transition-all duration-200"
                          style={{
                            height: `${((band.gain + 15) / 30) * 100}%`,
                            minHeight: '4px',
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-xs font-mono">
                      {band.gain > 0 ? '+' : ''}
                      {band.gain.toFixed(1)}dB
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* G4 Audio Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <h2 className="text-xl font-display font-bold mb-4">
                G4 Real-time Spectrum
              </h2>
              <canvas
                ref={canvasRef}
                width={800}
                height={200}
                className="w-full h-48 bg-luxury-dark rounded-xl"
              />
            </motion.div>
          </div>

          {/* Sidebar Controls */}
          <div className="space-y-6">
            {/* G4 Presets */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-display font-bold">G4 Presets</h3>
                <button
                  onClick={() => setShowPresets(!showPresets)}
                  className="text-luxury-gold hover:text-luxury-light transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {Object.entries(g4Presets).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => applyG4Preset(key)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedPreset === key
                        ? 'bg-luxury-gold/20 border border-luxury-gold/50'
                        : 'bg-luxury-dark/50 hover:bg-luxury-dark/70'
                    }`}
                  >
                    <div className="font-medium">{preset.name}</div>
                    <div className="text-xs text-luxury-gray">
                      {preset.description}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={saveCustomPreset}
                  className="flex-1 flex items-center justify-center space-x-1 bg-luxury-gold/20 border border-luxury-gold/30 rounded-lg px-3 py-2 text-sm hover:bg-luxury-gold/30 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={loadCustomPreset}
                  className="flex-1 flex items-center justify-center space-x-1 bg-luxury-gold/20 border border-luxury-gold/30 rounded-lg px-3 py-2 text-sm hover:bg-luxury-gold/30 transition-colors"
                >
                  <FolderOpen className="w-4 h-4" />
                  <span>Load</span>
                </button>
              </div>
            </motion.div>

            {/* G4 Advanced Controls */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <h3 className="text-lg font-display font-bold mb-4">
                G4 Advanced Controls
              </h3>

              <div className="space-y-4">
                {/* AI Enhancement */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4 text-luxury-gold" />
                    <span className="text-sm font-medium">AI Enhancement</span>
                  </div>
                  <button
                    onClick={toggleAIEnhancement}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      aiEnhancement ? 'bg-luxury-gold' : 'bg-luxury-dark'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        aiEnhancement
                          ? 'transform translate-x-6'
                          : 'transform translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Adaptive Mode */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-luxury-gold" />
                    <span className="text-sm font-medium">Adaptive Mode</span>
                  </div>
                  <button
                    onClick={toggleAdaptiveMode}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      adaptiveMode ? 'bg-luxury-gold' : 'bg-luxury-dark'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        adaptiveMode
                          ? 'transform translate-x-6'
                          : 'transform translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Phase Correction */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Waveform className="w-4 h-4 text-luxury-gold" />
                    <span className="text-sm font-medium">
                      Phase Correction
                    </span>
                  </div>
                  <button
                    onClick={() => setPhaseCorrection(!phaseCorrection)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      phaseCorrection ? 'bg-luxury-gold' : 'bg-luxury-dark'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        phaseCorrection
                          ? 'transform translate-x-6'
                          : 'transform translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Harmonic Enhancement */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-luxury-gold" />
                    <span className="text-sm font-medium">
                      Harmonic Enhancement
                    </span>
                  </div>
                  <button
                    onClick={() => setHarmonicEnhancement(!harmonicEnhancement)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      harmonicEnhancement ? 'bg-luxury-gold' : 'bg-luxury-dark'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        harmonicEnhancement
                          ? 'transform translate-x-6'
                          : 'transform translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Master Controls */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <h3 className="text-lg font-display font-bold mb-4">
                Master Controls
              </h3>

              <div className="space-y-4">
                {/* Volume Control */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Master Volume</span>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-luxury-gold hover:text-luxury-light transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={masterVolume}
                    onChange={e => setMasterVolume(parseFloat(e.target.value))}
                    disabled={isMuted}
                    className="w-full h-2 bg-luxury-dark rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="text-xs text-luxury-gray mt-1">
                    {Math.round(masterVolume * 100)}%
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Export */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <h3 className="text-lg font-display font-bold mb-4">G4 Export</h3>

              <button
                onClick={exportAudio}
                disabled={!audioFile || isProcessing}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-luxury-gold to-yellow-500 text-black font-medium py-3 px-4 rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
                <span>
                  {isProcessing ? 'G4 Processing...' : 'Export G4 Audio'}
                </span>
              </button>

              <p className="text-xs text-luxury-gray mt-2 text-center">
                Download G4 processed audio with advanced EQ settings
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default G4AudioEqualizer;
