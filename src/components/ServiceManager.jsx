import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Globe,
  Palette,
  FileText,
  ArrowLeft,
  Save,
  X,
  Settings,
  Search,
  Filter,
  Grid,
  List,
  DollarSign,
  TrendingUp,
  Users,
  Star,
  Crown,
  Zap,
  Shield,
  Code,
  Brain,
  Building,
  Rocket,
  ShoppingCart,
  Music,
  Video,
  Atom,
  Server,
  Copy,
  Wand2,
  Briefcase,
  TrendingUp as TrendingUpIcon,
  Cloud,
  Network,
  Vr,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Calendar,
  Target,
  Award,
  Trophy,
  Diamond,
  Infinity,
  Lightning,
  Chip,
  Microchip,
  Memory,
  Storage,
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
  Edit3,
  Scissors,
  RotateCw,
  Volume2,
  VolumeX,
  EyeOff,
  Sliders,
  Type,
  BrainCircuit,
  MachineLearning,
  DeepLearning,
  Share2,
  Maximize,
  Minimize,
  Square,
  Circle,
  Triangle,
  Star as StarIcon,
  Lock,
  Key,
  StopCircle,
  RotateCcw,
  Cog,
  Wrench,
  MessageSquare,
  Mail,
  Phone,
  Timer,
  CalendarDays,
  Code as CodeIcon,
} from 'lucide-react';

const ServiceManager = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: Grid, count: 0 },
    { id: 'web', name: 'Web Services', icon: Globe, count: 0 },
    { id: 'ai', name: 'AI & Technology', icon: Brain, count: 0 },
    { id: 'business', name: 'Business Solutions', icon: Building, count: 0 },
    { id: 'creative', name: 'Creative Services', icon: Palette, count: 0 },
    { id: 'enterprise', name: 'Enterprise', icon: Crown, count: 0 },
    { id: 'emerging', name: 'Emerging Tech', icon: Rocket, count: 0 },
  ];

  const allServices = [
    // Web Services
    {
      id: 'multi-site-hosting',
      name: 'Multi-Site Hosting Platform',
      category: 'web',
      price: '$299-999/month',
      description: 'Unlimited websites, custom domains, admin panel',
      icon: Server,
      features: ['Unlimited websites', 'Custom domains', 'Admin panel', 'Analytics', 'Backup system'],
      target: 'Agencies, businesses with multiple brands',
      priority: 'high',
      status: 'ready',
      revenue: 15000,
      clients: 25,
      rating: 4.8
    },
    {
      id: 'ai-website-builder',
      name: 'AI-Powered Website Builder',
      category: 'ai',
      price: '$199-499/month',
      description: 'AI content generation, automatic SEO, design suggestions',
      icon: Wand2,
      features: ['AI content generation', 'Automatic SEO', 'Design suggestions', 'Templates', 'Customization'],
      target: 'Small businesses, entrepreneurs',
      priority: 'high',
      status: 'ready',
      revenue: 8500,
      clients: 42,
      rating: 4.6
    },
    {
      id: 'quantum-computing',
      name: 'Quantum Computing Integration',
      category: 'ai',
      price: '$1,000-5,000/month',
      description: 'Quantum algorithms, AI optimization, advanced analytics',
      icon: Atom,
      features: ['Quantum algorithms', 'AI optimization', 'Advanced analytics', 'Real-time processing'],
      target: 'Tech companies, research institutions',
      priority: 'premium',
      status: 'ready',
      revenue: 45000,
      clients: 8,
      rating: 4.9
    },
    {
      id: 'digital-agency',
      name: 'Digital Agency Services',
      category: 'business',
      price: '$2,000-10,000/month',
      description: 'Website design, SEO, content marketing, social media',
      icon: Briefcase,
      features: ['Website design', 'SEO optimization', 'Content marketing', 'Social media management'],
      target: 'Medium to large businesses',
      priority: 'high',
      status: 'ready',
      revenue: 25000,
      clients: 12,
      rating: 4.7
    },
    {
      id: 'white-label',
      name: 'White-Label Solutions',
      category: 'business',
      price: '$500-2,000/month',
      description: 'Custom branding, reseller dashboard, commission structure',
      icon: Copy,
      features: ['Custom branding', 'Reseller dashboard', 'Commission structure', 'API access'],
      target: 'Marketing agencies, web designers',
      priority: 'high',
      status: 'ready',
      revenue: 12000,
      clients: 18,
      rating: 4.5
    },
    {
      id: 'ecommerce-platform',
      name: 'E-commerce Platform',
      category: 'web',
      price: '$399-1,999/month',
      description: 'Payment processing, inventory management, analytics',
      icon: ShoppingCart,
      features: ['Payment processing', 'Inventory management', 'Analytics', 'Multi-store support'],
      target: 'Online stores, retail businesses',
      priority: 'high',
      status: 'ready',
      revenue: 18000,
      clients: 15,
      rating: 4.4
    },
    {
      id: 'audio-video-suite',
      name: 'Audio/Video Production Suite',
      category: 'creative',
      price: '$299-799/month',
      description: 'Audio equalizer, DAW connector, video editing tools',
      icon: Music,
      features: ['Audio equalizer', 'DAW connector', 'Video editing', 'Streaming integration'],
      target: 'Musicians, podcasters, content creators',
      priority: 'medium',
      status: 'ready',
      revenue: 6500,
      clients: 22,
      rating: 4.3
    },
    {
      id: 'ai-content-studio',
      name: 'AI Content Studio',
      category: 'ai',
      price: '$199-599/month',
      description: 'AI writing, image generation, content optimization',
      icon: FileText,
      features: ['AI writing', 'Image generation', 'Content optimization', 'SEO tools'],
      target: 'Content creators, marketers, businesses',
      priority: 'high',
      status: 'ready',
      revenue: 9500,
      clients: 35,
      rating: 4.6
    },
    {
      id: 'enterprise-security',
      name: 'Enterprise Security Solutions',
      category: 'enterprise',
      price: '$1,500-5,000/month',
      description: 'Advanced security, compliance, monitoring',
      icon: Shield,
      features: ['Advanced security', 'Compliance', 'Monitoring', '24/7 support'],
      target: 'Large corporations, financial institutions',
      priority: 'premium',
      status: 'ready',
      revenue: 35000,
      clients: 6,
      rating: 4.8
    },
    {
      id: 'custom-software',
      name: 'Custom Software Development',
      category: 'enterprise',
      price: '$5,000-50,000/project',
      description: 'Custom applications, integrations, automation',
      icon: Code,
      features: ['Custom applications', 'Integrations', 'Automation', 'Maintenance'],
      target: 'Startups, enterprises',
      priority: 'premium',
      status: 'ready',
      revenue: 75000,
      clients: 4,
      rating: 4.9
    },
    {
      id: 'digital-transformation',
      name: 'Digital Transformation Consulting',
      category: 'enterprise',
      price: '$2,000-10,000/day',
      description: 'Strategy, implementation, training',
      icon: TrendingUpIcon,
      features: ['Strategy planning', 'Implementation', 'Training', 'Ongoing support'],
      target: 'Traditional businesses going digital',
      priority: 'premium',
      status: 'ready',
      revenue: 120000,
      clients: 3,
      rating: 4.9
    },
    {
      id: 'saas-platform',
      name: 'SaaS Platform Development',
      category: 'enterprise',
      price: '$10,000-100,000/project',
      description: 'Custom SaaS platforms, subscription management',
      icon: Cloud,
      features: ['Custom SaaS platforms', 'Subscription management', 'API development', 'Scalability'],
      target: 'Entrepreneurs, businesses',
      priority: 'premium',
      status: 'ready',
      revenue: 200000,
      clients: 2,
      rating: 5.0
    },
    {
      id: 'web3-blockchain',
      name: 'Web3/Blockchain Integration',
      category: 'emerging',
      price: '$3,000-15,000/project',
      description: 'Smart contracts, wallet integration, DeFi tools',
      icon: Network,
      features: ['Smart contracts', 'Wallet integration', 'DeFi tools', 'NFT platforms'],
      target: 'Crypto companies, NFT platforms',
      priority: 'medium',
      status: 'ready',
      revenue: 28000,
      clients: 7,
      rating: 4.4
    },
    {
      id: 'ar-vr-experiences',
      name: 'AR/VR Experiences',
      category: 'emerging',
      price: '$5,000-25,000/project',
      description: 'Virtual tours, interactive experiences',
      icon: Vr,
      features: ['Virtual tours', 'Interactive experiences', '3D modeling', 'Cross-platform'],
      target: 'Real estate, education, entertainment',
      priority: 'medium',
      status: 'ready',
      revenue: 15000,
      clients: 5,
      rating: 4.2
    },
    {
      id: 'iot-dashboard',
      name: 'IoT Dashboard Development',
      category: 'emerging',
      price: '$2,000-10,000/project',
      description: 'Real-time monitoring, data visualization',
      icon: Activity,
      features: ['Real-time monitoring', 'Data visualization', 'Device management', 'Analytics'],
      target: 'Manufacturing, smart home companies',
      priority: 'medium',
      status: 'ready',
      revenue: 12000,
      clients: 8,
      rating: 4.3
    },
    {
      id: 'website-design',
      name: 'Website Design & Development',
      category: 'web',
      price: '$2,000-5,000/site',
      description: 'Custom website design and development',
      icon: Palette,
      features: ['Custom design', 'Responsive development', 'SEO optimization', 'Content management'],
      target: 'Small to medium businesses',
      priority: 'high',
      status: 'ready',
      revenue: 22000,
      clients: 28,
      rating: 4.7
    },
    {
      id: 'seo-services',
      name: 'SEO Services',
      category: 'web',
      price: '$500-2,000/month',
      description: 'Search engine optimization and digital marketing',
      icon: Search,
      features: ['Keyword research', 'On-page SEO', 'Link building', 'Analytics reporting'],
      target: 'Businesses wanting online visibility',
      priority: 'high',
      status: 'ready',
      revenue: 16000,
      clients: 32,
      rating: 4.5
    },
    {
      id: 'content-creation',
      name: 'Content Creation',
      category: 'creative',
      price: '$1,000-3,000/month',
      description: 'Professional content creation and management',
      icon: Edit3,
      features: ['Blog writing', 'Social media content', 'Video content', 'Email marketing'],
      target: 'Businesses needing content',
      priority: 'medium',
      status: 'ready',
      revenue: 14000,
      clients: 25,
      rating: 4.4
    },
    {
      id: 'hosting-maintenance',
      name: 'Website Hosting & Maintenance',
      category: 'web',
      price: '$199-499/month',
      description: 'Reliable hosting and ongoing maintenance',
      icon: Server,
      features: ['Reliable hosting', 'Security updates', 'Backup management', 'Performance optimization'],
      target: 'Businesses with existing websites',
      priority: 'high',
      status: 'ready',
      revenue: 11000,
      clients: 45,
      rating: 4.6
    }
  ];

  // Calculate category counts
  useEffect(() => {
    serviceCategories.forEach(category => {
      if (category.id === 'all') {
        category.count = allServices.length;
      } else {
        category.count = allServices.filter(service => service.category === category.id).length;
      }
    });
  }, []);

  const filteredServices = allServices.filter(service => {
    const matchesCategory = activeTab === 'all' || service.category === activeTab;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-green-500 bg-green-500/10';
      case 'premium': return 'text-purple-500 bg-purple-500/10';
      case 'medium': return 'text-blue-500 bg-blue-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready': return 'text-green-500 bg-green-500/10';
      case 'beta': return 'text-yellow-500 bg-yellow-500/10';
      case 'coming-soon': return 'text-blue-500 bg-blue-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const totalRevenue = allServices.reduce((sum, service) => sum + service.revenue, 0);
  const totalClients = allServices.reduce((sum, service) => sum + service.clients, 0);
  const averageRating = allServices.reduce((sum, service) => sum + service.rating, 0) / allServices.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Service Manager</h1>
            <p className="text-gray-300">Manage all your services and track performance</p>
          </div>
          <button
            onClick={() => setIsAddingService(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Service
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-gray-300 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-gray-300 text-sm">Total Clients</p>
                <p className="text-2xl font-bold text-white">{totalClients}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-gray-300 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold text-white">{averageRating.toFixed(1)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-gray-300 text-sm">Active Services</p>
                <p className="text-2xl font-bold text-white">{allServices.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {serviceCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search and View Toggle */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-all duration-300 ${
                    viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-all duration-300 ${
                    viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                {/* Service Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                      <p className="text-sm text-gray-300">{service.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(service.priority)}`}>
                      {service.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </div>
                </div>

                {/* Service Description */}
                <p className="text-gray-300 text-sm mb-4">{service.description}</p>

                {/* Price and Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-lg font-bold text-green-400">{service.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-white">{service.rating}</span>
                  </div>
                </div>

                {/* Revenue and Clients */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Revenue</p>
                    <p className="text-sm font-semibold text-white">${service.revenue.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Clients</p>
                    <p className="text-sm font-semibold text-white">{service.clients}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                  >
                    View Details
                  </button>
                  <button className="p-2 bg-white/10 text-gray-300 hover:text-white rounded-lg transition-all duration-300">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                      <p className="text-sm text-gray-300">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-400">{service.price}</p>
                      <p className="text-sm text-gray-400">${service.revenue.toLocaleString()} revenue</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(service.priority)}`}>
                        {service.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                        {service.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white/10 text-gray-300 hover:text-white rounded-lg transition-all duration-300">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Service Detail Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                    <selectedService.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedService.name}</h3>
                    <p className="text-gray-300">{selectedService.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Service Details</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">Price</p>
                      <p className="text-xl font-bold text-green-400">{selectedService.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Target Market</p>
                      <p className="text-white">{selectedService.target}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Category</p>
                      <p className="text-white capitalize">{selectedService.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Priority</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedService.priority)}`}>
                        {selectedService.priority}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Status</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedService.status)}`}>
                        {selectedService.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Performance Metrics</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="text-sm text-gray-400">Revenue</p>
                        <p className="text-xl font-bold text-green-400">${selectedService.revenue.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <p className="text-sm text-gray-400">Clients</p>
                        <p className="text-xl font-bold text-blue-400">{selectedService.clients}</p>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-sm text-gray-400">Rating</p>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="text-xl font-bold text-white">{selectedService.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                  Edit Service
                </button>
                <button className="flex-1 bg-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
                  View Analytics
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceManager;












