import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Play,
  Pause,
  Settings,
  Zap,
  Crown,
  Shield,
  Brain,
  Sparkles,
  Layers,
  Target,
  Waveform,
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
  Piano,
  Disc,
  Radio,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertCircle,
  Clock,
  Database,
  Server,
  Cpu,
  HardDrive,
  Cable,
  Bluetooth,
  Usb,
  Midi,
  Search,
  Sync,
  Type,
  Image,
  Video,
  FileText,
  Palette,
  Camera,
  Film,
  Edit3,
  SparklesIcon,
  Wand2,
  BrainCircuit,
  AI,
  MachineLearning,
  DeepLearning,
  Copy,
  Share2,
  Eye,
  EyeOff,
} from 'lucide-react';

const AIContentStudio = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('article');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');

  // Content types
  const contentTypes = {
    text: [
      {
        id: 'article',
        name: 'Article',
        icon: FileText,
        description: 'Professional articles and blog posts',
      },
      {
        id: 'copy',
        name: 'Marketing Copy',
        icon: Copy,
        description: 'Ad copy and marketing materials',
      },
      {
        id: 'script',
        name: 'Script',
        icon: Type,
        description: 'Video and podcast scripts',
      },
      {
        id: 'email',
        name: 'Email',
        icon: Mail,
        description: 'Professional emails and newsletters',
      },
    ],
    image: [
      {
        id: 'photo',
        name: 'Photography',
        icon: Camera,
        description: 'Realistic photographs',
      },
      {
        id: 'art',
        name: 'Artwork',
        icon: Palette,
        description: 'Creative artwork and illustrations',
      },
      {
        id: 'logo',
        name: 'Logo',
        icon: Crown,
        description: 'Brand logos and graphics',
      },
      {
        id: 'design',
        name: 'Design',
        icon: Layers,
        description: 'UI/UX designs and mockups',
      },
    ],
    video: [
      {
        id: 'promo',
        name: 'Promotional',
        icon: Film,
        description: 'Marketing and promotional videos',
      },
      {
        id: 'tutorial',
        name: 'Tutorial',
        icon: Play,
        description: 'Educational and how-to videos',
      },
      {
        id: 'social',
        name: 'Social Media',
        icon: Share2,
        description: 'Social media content',
      },
      {
        id: 'presentation',
        name: 'Presentation',
        icon: Monitor,
        description: 'Business presentations',
      },
    ],
  };

  // AI models
  const aiModels = {
    text: [
      {
        id: 'gpt-4',
        name: 'GPT-4',
        description: 'Most advanced text generation',
        status: 'premium',
      },
      {
        id: 'claude',
        name: 'Claude',
        description: 'Professional writing assistant',
        status: 'premium',
      },
      {
        id: 'gemini',
        name: 'Gemini',
        description: "Google's latest AI model",
        status: 'standard',
      },
    ],
    image: [
      {
        id: 'dall-e-3',
        name: 'DALL-E 3',
        description: 'High-quality image generation',
        status: 'premium',
      },
      {
        id: 'midjourney',
        name: 'Midjourney',
        description: 'Artistic image creation',
        status: 'premium',
      },
      {
        id: 'stable-diffusion',
        name: 'Stable Diffusion',
        description: 'Fast image generation',
        status: 'standard',
      },
    ],
    video: [
      {
        id: 'runway',
        name: 'Runway ML',
        description: 'Professional video generation',
        status: 'premium',
      },
      {
        id: 'pika',
        name: 'Pika Labs',
        description: 'AI video creation',
        status: 'premium',
      },
      {
        id: 'synthesia',
        name: 'Synthesia',
        description: 'AI presenter videos',
        status: 'standard',
      },
    ],
  };

  // Generate content
  const generateContent = useCallback(async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockContent = {
      text: `Generated ${contentType} content based on: "${prompt}"\n\nThis is a professional ${contentType} written in a ${tone} tone with ${length} length. The AI has analyzed your requirements and created content that matches your specifications perfectly.`,
      image:
        'https://via.placeholder.com/512x512/6366f1/ffffff?text=AI+Generated+Image',
      video:
        'https://via.placeholder.com/640x360/6366f1/ffffff?text=AI+Generated+Video',
    };

    setGeneratedContent(mockContent[activeTab]);
    setIsGenerating(false);
    toast.success(
      `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} generated successfully!`
    );
  }, [prompt, contentType, tone, length, activeTab]);

  // Export content
  const exportContent = useCallback(() => {
    if (!generatedContent) return;

    const element = document.createElement('a');
    const file = new Blob([generatedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `ai-generated-${activeTab}-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast.success('Content exported successfully!');
  }, [generatedContent, activeTab]);

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
                <p className="text-luxury-gray text-sm">AI Content Studio</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-luxury-gold" />
                <span className="text-sm font-medium">AI-Powered Creation</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-luxury-gold" />
                <span className="text-sm font-medium">
                  Professional Quality
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Type Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold">
                  Content Creation
                </h2>
                <div className="flex items-center space-x-2">
                  <Wand2 className="w-4 h-4 text-luxury-gold" />
                  <span className="text-sm text-luxury-gray">AI-Powered</span>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex space-x-1 mb-6">
                {['text', 'image', 'video'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === tab
                        ? 'bg-luxury-gold text-black'
                        : 'text-luxury-gray hover:text-luxury-gold hover:bg-luxury-gold/10'
                    }`}
                  >
                    {tab === 'text' && <Type className="w-4 h-4" />}
                    {tab === 'image' && <Image className="w-4 h-4" />}
                    {tab === 'video' && <Video className="w-4 h-4" />}
                    <span className="capitalize">{tab}</span>
                  </button>
                ))}
              </div>

              {/* Content Type Selection */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {contentTypes[activeTab].map(type => (
                  <div
                    key={type.id}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      contentType === type.id
                        ? 'bg-luxury-gold/20 border-luxury-gold/50'
                        : 'bg-luxury-dark/50 border-luxury-gold/30 hover:border-luxury-gold/50'
                    }`}
                    onClick={() => setContentType(type.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <type.icon className="w-6 h-6 text-luxury-gold" />
                      <div>
                        <h3 className="font-medium text-sm">{type.name}</h3>
                        <p className="text-xs text-luxury-gray">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Prompt Input */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    AI Prompt
                  </label>
                  <textarea
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder={`Describe the ${activeTab} you want to create...`}
                    className="w-full bg-luxury-dark border border-luxury-gold/30 rounded-lg px-4 py-3 text-sm resize-none h-24"
                  />
                </div>

                {/* Options */}
                {activeTab === 'text' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Tone
                      </label>
                      <select
                        value={tone}
                        onChange={e => setTone(e.target.value)}
                        className="w-full bg-luxury-dark border border-luxury-gold/30 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="professional">Professional</option>
                        <option value="casual">Casual</option>
                        <option value="creative">Creative</option>
                        <option value="technical">Technical</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Length
                      </label>
                      <select
                        value={length}
                        onChange={e => setLength(e.target.value)}
                        className="w-full bg-luxury-dark border border-luxury-gold/30 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="short">Short</option>
                        <option value="medium">Medium</option>
                        <option value="long">Long</option>
                      </select>
                    </div>
                  </div>
                )}

                <button
                  onClick={generateContent}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-luxury-gold to-yellow-500 text-black font-medium py-3 px-4 rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <Clock className="w-5 h-5 animate-spin" />
                  ) : (
                    <Wand2 className="w-5 h-5" />
                  )}
                  <span>
                    {isGenerating ? 'Generating...' : 'Generate Content'}
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Generated Content */}
            {generatedContent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-bold">
                    Generated Content
                  </h2>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">Ready</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {activeTab === 'text' && (
                    <div className="bg-luxury-dark/50 rounded-lg p-4">
                      <pre className="text-sm whitespace-pre-wrap">
                        {generatedContent}
                      </pre>
                    </div>
                  )}

                  {activeTab === 'image' && (
                    <div className="bg-luxury-dark/50 rounded-lg p-4">
                      <img
                        src={generatedContent}
                        alt="AI Generated"
                        className="w-full rounded-lg"
                      />
                    </div>
                  )}

                  {activeTab === 'video' && (
                    <div className="bg-luxury-dark/50 rounded-lg p-4">
                      <video controls className="w-full rounded-lg">
                        <source src={generatedContent} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      onClick={exportContent}
                      className="flex items-center space-x-2 bg-luxury-gold/20 border border-luxury-gold/30 rounded-lg px-4 py-2 text-sm hover:bg-luxury-gold/30 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-luxury-gold/20 border border-luxury-gold/30 rounded-lg px-4 py-2 text-sm hover:bg-luxury-gold/30 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Models */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <h3 className="text-lg font-display font-bold mb-4">AI Models</h3>

              <div className="space-y-3">
                {aiModels[activeTab].map(model => (
                  <div
                    key={model.id}
                    className="bg-luxury-dark/50 rounded-lg p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{model.name}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          model.status === 'premium'
                            ? 'bg-luxury-gold/20 text-luxury-gold'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {model.status}
                      </span>
                    </div>
                    <p className="text-xs text-luxury-gray">
                      {model.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6"
            >
              <h3 className="text-lg font-display font-bold mb-4">
                Quick Actions
              </h3>

              <div className="space-y-3">
                <button className="w-full flex items-center space-x-2 bg-luxury-gold/20 border border-luxury-gold/30 rounded-lg px-3 py-2 text-sm hover:bg-luxury-gold/30 transition-colors">
                  <Save className="w-4 h-4" />
                  <span>Save Template</span>
                </button>
                <button className="w-full flex items-center space-x-2 bg-luxury-gold/20 border border-luxury-gold/30 rounded-lg px-3 py-2 text-sm hover:bg-luxury-gold/30 transition-colors">
                  <FolderOpen className="w-4 h-4" />
                  <span>Load Template</span>
                </button>
                <button className="w-full flex items-center space-x-2 bg-luxury-gold/20 border border-luxury-gold/30 rounded-lg px-3 py-2 text-sm hover:bg-luxury-gold/30 transition-colors">
                  <Settings className="w-4 h-4" />
                  <span>AI Settings</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIContentStudio;
