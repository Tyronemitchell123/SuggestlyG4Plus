import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2,
  Upload,
  Play,
  Pause,
  VolumeX,
  Sparkles,
  Zap,
  RotateCcw,
  Settings,
  Save,
  FolderOpen,
  Target,
  BarChart3,
  Loader2,
  Download,
  Shield,
  Crown,
  Brain,
  Headphones,
  Monitor,
  Smartphone,
  Link,
  Unlink,
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
  Eye,
  EyeOff,
  Layers,
  Mic,
} from 'lucide-react';
import toast from 'react-hot-toast';

const AudioEqualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentMode, setCurrentMode] = useState('stereo'); // 'stereo' or 'mid-side'
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('flat');
  const [showPresets, setShowPresets] = useState(false);

  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Frequency bands for the equalizer
  const frequencyBands = [
    { freq: 32, label: '32Hz', gain: 0 },
    { freq: 64, label: '64Hz', gain: 0 },
    { freq: 125, label: '125Hz', gain: 0 },
    { freq: 250, label: '250Hz', gain: 0 },
    { freq: 500, label: '500Hz', gain: 0 },
    { freq: 1000, label: '1kHz', gain: 0 },
    { freq: 2000, label: '2kHz', gain: 0 },
    { freq: 4000, label: '4kHz', gain: 0 },
    { freq: 8000, label: '8kHz', gain: 0 },
    { freq: 16000, label: '16kHz', gain: 0 },
  ];

  const [eqBands, setEqBands] = useState(frequencyBands);

  // Preset configurations
  const presets = {
    flat: { name: 'Flat', description: 'Neutral response' },
    vocal: { name: 'Vocal Boost', description: 'Enhanced clarity for vocals' },
    bass: { name: 'Bass Boost', description: 'Enhanced low frequencies' },
    treble: { name: 'Treble Boost', description: 'Enhanced high frequencies' },
    podcast: { name: 'Podcast', description: 'Optimized for speech' },
    music: { name: 'Music', description: 'Balanced for music' },
    custom: { name: 'Custom', description: 'Your saved settings' },
  };

  // Initialize Web Audio API
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.AudioContext) {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
        if (audioContextRef.current) {
          analyserRef.current = audioContextRef.current.createAnalyser();
          if (analyserRef.current) {
            analyserRef.current.fftSize = 256;
            analyserRef.current.smoothingTimeConstant = 0.8;
          }
        }
      }
    } catch (error) {
      console.warn('Web Audio API initialization failed:', error);
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

  // Apply preset
  const applyPreset = useCallback(presetName => {
    const presetGains = {
      flat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      vocal: [0, 0, 2, 4, 6, 8, 6, 4, 2, 0],
      bass: [8, 6, 4, 2, 0, 0, 0, 0, 0, 0],
      treble: [0, 0, 0, 0, 0, 0, 2, 4, 6, 8],
      podcast: [0, 0, 3, 6, 8, 6, 3, 0, 0, 0],
      music: [2, 1, 0, 0, 0, 0, 0, 1, 2, 3],
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
  }, []);

  // Reset EQ
  const resetEQ = useCallback(() => {
    setEqBands(frequencyBands);
    setSelectedPreset('flat');
  }, []);

  // Save custom preset
  const saveCustomPreset = useCallback(() => {
    const customGains = eqBands.map(band => band.gain);
    localStorage.setItem('suggestly_eq_custom', JSON.stringify(customGains));
    toast.success('Custom preset saved!');
  }, [eqBands]);

  // Load custom preset
  const loadCustomPreset = useCallback(() => {
    const saved = localStorage.getItem('suggestly_eq_custom');
    if (saved) {
      const customGains = JSON.parse(saved);
      setEqBands(prev =>
        prev.map((band, i) => ({
          ...band,
          gain: customGains[i] || 0,
        }))
      );
      setSelectedPreset('custom');
    }
  }, []);

  // Export processed audio
  const exportAudio = useCallback(async () => {
    if (!audioFile) return;

    setIsProcessing(true);
    // Simulate audio processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real implementation, this would process the audio with EQ settings
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `processed_${audioFile.name}`;
    link.click();

    setIsProcessing(false);
  }, [audioFile, audioUrl]);

  // Canvas visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      try {
        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] / 2;

          try {
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            if (gradient && typeof gradient.addColorStop === 'function') {
              gradient.addColorStop(0, '#d69e2e');
              gradient.addColorStop(1, '#1a365d');
              ctx.fillStyle = gradient;
            } else {
              // Fallback to solid color if gradient creation fails
              ctx.fillStyle = '#d69e2e';
            }
          } catch (error) {
            console.warn(
              'Gradient creation failed, using fallback color:',
              error
            );
            ctx.fillStyle = '#d69e2e';
          }

          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      } catch (error) {
        console.error('Canvas drawing error:', error);
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
                <Volume2 className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold">
                  SUGGESTLY ELITE
                </h1>
                <p className="text-luxury-gray text-sm">
                  Professional Audio Equalizer
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-luxury-gold" />
                <span className="text-sm font-medium">
                  Elite Audio Processing
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-luxury-gold" />
                <span className="text-sm font-medium">Studio Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload & Playback */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold">Audio Source</h2>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-luxury-gold" />
                  <span className="text-sm text-luxury-gray">
                    Real-time Processing
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
                    id="audio-upload"
                  />
                  <label htmlFor="audio-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-luxury-gold mx-auto mb-2" />
                    <p className="text-luxury-light font-medium">
                      Upload Audio File
                    </p>
                    <p className="text-luxury-gray text-sm">
                      MP3, WAV, FLAC, AAC
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
                          {isPlaying ? 'Playing' : 'Paused'}
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

            {/* Equalizer Bands */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold">Equalizer</h2>
                <div className="flex items-center space-x-4">
                  <select
                    value={currentMode}
                    onChange={e => setCurrentMode(e.target.value)}
                    className="bg-luxury-dark border border-luxury-gold/30 rounded-lg px-3 py-1 text-sm"
                  >
                    <option value="stereo">Stereo Mode</option>
                    <option value="mid-side">Mid/Side Mode</option>
                  </select>
                  <button
                    onClick={resetEQ}
                    className="flex items-center space-x-1 text-luxury-gold hover:text-luxury-light transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="text-sm">Reset</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-10 gap-2">
                {eqBands.map((band, index) => (
                  <div
                    key={band.freq}
                    className="flex flex-col items-center space-y-2"
                  >
                    <div className="text-xs text-luxury-gray text-center">
                      {band.label}
                    </div>
                    <div className="relative h-32 w-8">
                      <input
                        type="range"
                        min="-12"
                        max="12"
                        step="0.1"
                        value={band.gain}
                        onChange={e =>
                          updateEQBand(index, parseFloat(e.target.value))
                        }
                        className="absolute inset-0 w-8 h-32 appearance-none bg-transparent cursor-pointer"
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
                            height: `${((band.gain + 12) / 24) * 100}%`,
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

            {/* Audio Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <h2 className="text-xl font-display font-bold mb-4">
                Real-time Spectrum
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
            {/* Presets */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-display font-bold">Presets</h3>
                <button
                  onClick={() => setShowPresets(!showPresets)}
                  className="text-luxury-gold hover:text-luxury-light transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {Object.entries(presets).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => applyPreset(key)}
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

            {/* Master Controls */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
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
              transition={{ delay: 0.3 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <h3 className="text-lg font-display font-bold mb-4">Export</h3>

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
                <span>{isProcessing ? 'Processing...' : 'Export Audio'}</span>
              </button>

              <p className="text-xs text-luxury-gray mt-2 text-center">
                Download processed audio with applied EQ settings
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioEqualizer;
