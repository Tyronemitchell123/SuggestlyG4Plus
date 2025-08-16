import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Sparkles,
  Type,
  Image as ImageIcon,
  Video,
  Music,
  Globe,
  Download,
  Share2,
  Copy,
  RefreshCw,
  Settings,
  Zap,
  Crown,
  Star,
  Award,
  Trophy,
  Target,
  Eye,
  EyeOff,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Palette,
  Wand2,
  Magic,
  Lightbulb,
  BookOpen,
  FileText,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Calendar,
  Clock,
  User,
  Users,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Flag,
  MoreHorizontal,
  Edit,
  Trash2,
  Save,
  FolderOpen,
  Upload,
  Camera,
  Mic,
  Headphones,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Server,
  Database,
  Cloud,
  Wifi,
  Bluetooth,
  Usb,
  HardDrive,
  Memory,
  Cpu,
  Gpu,
  Motherboard,
  Power,
  Battery,
  BatteryCharging,
  Plug,
  Wrench,
  Cog,
  Tool,
  Hammer,
  Screwdriver,
  Ruler,
  Scissors,
  Paperclip,
  Link,
  Unlink,
  Lock,
  Unlock,
  Key,
  Shield,
  AlertCircle,
  Info,
  HelpCircle,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Home,
  Menu,
  X,
  Check,
  Plus as PlusIcon,
  Minus as MinusIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  Filter as FilterIcon,
  Search as SearchIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  User as UserIcon,
  Users as UsersIcon,
  Heart as HeartIcon,
  ThumbsUp as ThumbsUpIcon,
  ThumbsDown as ThumbsDownIcon,
  Bookmark as BookmarkIcon,
  Flag as FlagIcon,
  MoreHorizontal as MoreHorizontalIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  Save as SaveIcon,
  FolderOpen as FolderOpenIcon,
  Upload as UploadIcon,
  Camera as CameraIcon,
  Mic as MicIcon,
  Headphones as HeadphonesIcon,
  Monitor as MonitorIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  Laptop as LaptopIcon,
  Desktop as DesktopIcon,
  Server as ServerIcon,
  Database as DatabaseIcon,
  Cloud as CloudIcon,
  Wifi as WifiIcon,
  Bluetooth as BluetoothIcon,
  Usb as UsbIcon,
  HardDrive as HardDriveIcon,
  Memory as MemoryIcon,
  Cpu as CpuIcon,
  Gpu as GpuIcon,
  Motherboard as MotherboardIcon,
  Power as PowerIcon,
  Battery as BatteryIcon,
  BatteryCharging as BatteryChargingIcon,
  Plug as PlugIcon,
  Wrench as WrenchIcon,
  Cog as CogIcon,
  Tool as ToolIcon,
  Hammer as HammerIcon,
  Screwdriver as ScrewdriverIcon,
  Ruler as RulerIcon,
  Scissors as ScissorsIcon,
  Paperclip as PaperclipIcon,
  Link as LinkIcon,
  Unlink as UnlinkIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Key as KeyIcon,
  Shield as ShieldIcon,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  HelpCircle as HelpCircleIcon,
  ExternalLink as ExternalLinkIcon,
  ArrowRight as ArrowRightIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  X as XIcon,
  Check as CheckIcon,
  Mail,
} from 'lucide-react';
import toast from 'react-hot-toast';

const AIContentGenerator2 = () => {
  const [contentType, setContentType] = useState('text');
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [generatedImages, setGeneratedImages] = useState([]);
  const [generatedVideos, setGeneratedVideos] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const contentTypes = [
    { id: 'text', name: 'Text Content', icon: Type, description: 'Articles, blogs, social media posts' },
    { id: 'image', name: 'Image Generation', icon: ImageIcon, description: 'AI-generated images and graphics' },
    { id: 'video', name: 'Video Content', icon: Video, description: 'Short videos and animations' },
    { id: 'audio', name: 'Audio Content', icon: Music, description: 'Voice-overs and podcasts' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  ];

  const tones = [
    { id: 'professional', name: 'Professional', description: 'Formal and business-like' },
    { id: 'casual', name: 'Casual', description: 'Friendly and relaxed' },
    { id: 'creative', name: 'Creative', description: 'Imaginative and artistic' },
    { id: 'technical', name: 'Technical', description: 'Detailed and precise' },
    { id: 'persuasive', name: 'Persuasive', description: 'Convincing and compelling' },
  ];

  const templates = [
    {
      id: 'blog-post',
      name: 'Blog Post',
      description: 'Engaging blog article with SEO optimization',
      icon: FileText,
      prompt: 'Write a comprehensive blog post about [topic] that includes an introduction, main points, and conclusion.',
    },
    {
      id: 'social-media',
      name: 'Social Media Post',
      description: 'Captivating social media content',
      icon: Share2,
      prompt: 'Create an engaging social media post about [topic] that encourages interaction and sharing.',
    },
    {
      id: 'email',
      name: 'Email Campaign',
      description: 'Professional email marketing content',
      icon: Mail,
      prompt: 'Write a compelling email about [topic] that drives action and engagement.',
    },
    {
      id: 'product-description',
      name: 'Product Description',
      description: 'Persuasive product marketing copy',
      icon: Target,
      prompt: 'Create a compelling product description for [product] that highlights benefits and features.',
    },
  ];

  const generateContent = useCallback(async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    toast.loading('Generating content with AI...');

    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 3000));

      let content = '';
      if (contentType === 'text') {
        content = `Generated ${tone} content in ${languages.find(l => l.code === selectedLanguage)?.name}:

${prompt}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Key points:
• Point 1: Important information
• Point 2: Additional details
• Point 3: Supporting evidence

This content has been optimized for ${tone} tone and ${length} length.`;
      } else if (contentType === 'image') {
        const newImage = {
          id: Date.now(),
          url: `https://picsum.photos/400/300?random=${Date.now()}`,
          prompt: prompt,
          timestamp: new Date(),
        };
        setGeneratedImages(prev => [newImage, ...prev]);
        content = 'Image generated successfully!';
      } else if (contentType === 'video') {
        const newVideo = {
          id: Date.now(),
          url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          prompt: prompt,
          timestamp: new Date(),
        };
        setGeneratedVideos(prev => [newVideo, ...prev]);
        content = 'Video generated successfully!';
      }

      setGeneratedContent(content);
      
      // Add to history
      const historyItem = {
        id: Date.now(),
        type: contentType,
        prompt: prompt,
        content: content,
        timestamp: new Date(),
        language: selectedLanguage,
        tone: tone,
      };
      setHistory(prev => [historyItem, ...prev]);

      toast.success('Content generated successfully!');
    } catch (error) {
      toast.error('Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, contentType, selectedLanguage, tone, length]);

  const handleTemplateSelect = useCallback((template) => {
    setSelectedTemplate(template);
    setPrompt(template.prompt);
  }, []);

  const handleCopyContent = useCallback(() => {
    navigator.clipboard.writeText(generatedContent);
    toast.success('Content copied to clipboard!');
  }, [generatedContent]);

  const handleSaveContent = useCallback(() => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-generated-content-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Content saved successfully!');
  }, [generatedContent]);

  const ContentTypeCard = ({ type }) => {
    const Icon = type.icon;
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setContentType(type.id)}
        className={`p-6 rounded-xl border-2 transition-all duration-200 ${
          contentType === type.id
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${
            contentType === type.id ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
            <Icon className={`w-6 h-6 ${
              contentType === type.id ? 'text-blue-600' : 'text-gray-600'
            }`} />
          </div>
          <div className="text-left">
            <h3 className={`font-semibold ${
              contentType === type.id ? 'text-blue-900' : 'text-gray-900'
            }`}>
              {type.name}
            </h3>
            <p className={`text-sm ${
              contentType === type.id ? 'text-blue-700' : 'text-gray-600'
            }`}>
              {type.description}
            </p>
          </div>
        </div>
      </motion.button>
    );
  };

  const TemplateCard = ({ template }) => {
    const Icon = template.icon;
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleTemplateSelect(template)}
        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
          selectedTemplate?.id === template.id
            ? 'border-purple-500 bg-purple-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className="flex items-center space-x-3">
          <Icon className={`w-5 h-5 ${
            selectedTemplate?.id === template.id ? 'text-purple-600' : 'text-gray-600'
          }`} />
          <div className="text-left">
            <h4 className={`font-medium ${
              selectedTemplate?.id === template.id ? 'text-purple-900' : 'text-gray-900'
            }`}>
              {template.name}
            </h4>
            <p className={`text-xs ${
              selectedTemplate?.id === template.id ? 'text-purple-700' : 'text-gray-600'
            }`}>
              {template.description}
            </p>
          </div>
        </div>
      </motion.button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <Brain className="w-8 h-8 text-purple-600" />
                <span>AI Content Generator 2.0</span>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-yellow-600 font-medium">Powered by GPT-4</span>
                </div>
              </h1>
              <p className="text-gray-600 mt-1">
                Advanced AI-powered content creation with multi-language support
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCopyContent}
                disabled={!generatedContent}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
              
              <button
                onClick={handleSaveContent}
                disabled={!generatedContent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Content Type Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Type</h3>
              <div className="space-y-3">
                {contentTypes.map((type) => (
                  <ContentTypeCard key={type.id} type={type} />
                ))}
              </div>
            </div>

            {/* Templates */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Templates</h3>
              <div className="space-y-3">
                {templates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
              
              {/* Language */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tone */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {tones.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Length */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Panel - Content Generation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prompt Input */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Prompt</h3>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to generate..."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {prompt.length} characters
                </span>
                
                <button
                  onClick={generateContent}
                  disabled={isGenerating || !prompt.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
                >
                  {isGenerating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Zap className="w-4 h-4" />
                  )}
                  <span>{isGenerating ? 'Generating...' : 'Generate Content'}</span>
                </button>
              </div>
            </div>

            {/* Generated Content */}
            {generatedContent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Generated Content</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCopyContent}
                      className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleSaveContent}
                      className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  {contentType === 'text' ? (
                    <pre className="whitespace-pre-wrap text-gray-900 font-sans">{generatedContent}</pre>
                  ) : (
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <p className="text-gray-900">{generatedContent}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Generated Images */}
            {contentType === 'image' && generatedImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url}
                        alt={image.prompt}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                          <button className="p-2 bg-white rounded-lg">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-white rounded-lg">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Generated Videos */}
            {contentType === 'video' && generatedVideos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Videos</h3>
                <div className="space-y-4">
                  {generatedVideos.map((video) => (
                    <div key={video.id} className="relative">
                      <video
                        src={video.url}
                        controls
                        className="w-full rounded-lg"
                      />
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm text-gray-600">{video.prompt}</span>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* History */}
            {history.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Generation History</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {history.slice(0, 10).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.prompt}</p>
                        <p className="text-xs text-gray-600">
                          {item.type} • {item.language} • {item.tone} • {item.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIContentGenerator2;


