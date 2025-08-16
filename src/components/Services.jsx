import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Code,
  Palette,
  Zap,
  Shield,
  Music,
  Video,
  Brain,
  ShoppingCart,
  Users,
  Building,
  Rocket,
  Crown,
  Star,
  CheckCircle,
  ArrowRight,
  DollarSign,
  TrendingUp,
  Award,
  Target,
  Lightbulb,
  Cpu,
  Database,
  Lock,
  Wifi,
  Smartphone,
  Monitor,
  Server,
  Cloud,
  Atom,
  Bot,
  Sparkles,
  Layers,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  Settings,
  Tool,
  Briefcase,
  GraduationCap,
  Home,
  Factory,
  Car,
  Camera,
  Headphones,
  Mic,
  FileText,
  Image,
  Film,
  Gamepad2,
  Vr,
  Bluetooth,
  WifiOff,
  HardDrive,
  Cable,
  Usb,
  Search,
  Edit3,
  Scissors,
  RotateCw,
  Volume2,
  VolumeX,
  EyeOff,
  Sliders,
  Type,
  Wand2,
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
  RotateCcw,
  Cog,
  Wrench,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Timer,
  CalendarDays,
  Clock,
  Code as CodeIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: Star },
    { id: 'web', name: 'Web Services', icon: Globe },
    { id: 'ai', name: 'AI & Technology', icon: Brain },
    { id: 'business', name: 'Business Solutions', icon: Building },
    { id: 'creative', name: 'Creative Services', icon: Palette },
    { id: 'enterprise', name: 'Enterprise', icon: Crown },
    { id: 'emerging', name: 'Emerging Tech', icon: Rocket },
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
      status: 'ready'
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
      status: 'ready'
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
      status: 'ready'
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
      status: 'ready'
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
      status: 'ready'
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
      status: 'ready'
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
      status: 'ready'
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
      status: 'ready'
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
      status: 'ready'
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
      status: 'ready'
    },
    {
      id: 'digital-transformation',
      name: 'Digital Transformation Consulting',
      category: 'enterprise',
      price: '$2,000-10,000/day',
      description: 'Strategy, implementation, training',
      icon: TrendingUp,
      features: ['Strategy planning', 'Implementation', 'Training', 'Ongoing support'],
      target: 'Traditional businesses going digital',
      priority: 'premium',
      status: 'ready'
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
      status: 'ready'
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
      status: 'ready'
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
      status: 'ready'
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
      status: 'ready'
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
      status: 'ready'
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
      status: 'ready'
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
      status: 'ready'
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
      status: 'ready'
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? allServices 
    : allServices.filter(service => service.category === activeCategory);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-green-500';
      case 'premium': return 'text-purple-500';
      case 'medium': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'beta': return 'bg-yellow-100 text-yellow-800';
      case 'coming-soon': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Complete Service Ecosystem
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From basic websites to enterprise solutions, we offer everything you need for digital success
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <category.icon className="w-5 h-5" />
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              {/* Service Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                    <p className={`text-sm font-medium ${getPriorityColor(service.priority)}`}>
                      {service.priority.toUpperCase()} PRIORITY
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                  {service.status.toUpperCase()}
                </span>
              </div>

              {/* Service Description */}
              <p className="text-gray-300 mb-4">{service.description}</p>

              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className="text-2xl font-bold text-green-400">{service.price}</span>
              </div>

              {/* Target Market */}
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-1">Target Market:</p>
                <p className="text-sm text-white">{service.target}</p>
              </div>

              {/* Features Preview */}
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Key Features:</p>
                <div className="flex flex-wrap gap-1">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                    >
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 3 && (
                    <span className="px-2 py-1 bg-purple-500/20 rounded-full text-xs text-purple-300">
                      +{service.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Service Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">{allServices.length}</div>
            <div className="text-gray-300">Total Services</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">
              {allServices.filter(s => s.status === 'ready').length}
            </div>
            <div className="text-gray-300">Ready to Deploy</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">
              {allServices.filter(s => s.priority === 'premium').length}
            </div>
            <div className="text-gray-300">Premium Services</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">$50K+</div>
            <div className="text-gray-300">Monthly Revenue Potential</div>
          </div>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Target Market</h4>
                <p className="text-gray-300">{selectedService.target}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Pricing</h4>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-green-400" />
                  <span className="text-3xl font-bold text-green-400">{selectedService.price}</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                Start This Service
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Services;
