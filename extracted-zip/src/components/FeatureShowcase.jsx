import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Brain,
  Shield,
  DollarSign,
  BarChart3,
  Sparkles,
  Zap,
  Users,
  Target,
  Star,
  CheckCircle,
  ArrowRight,
  Rocket,
  Activity,
  Cpu,
  FileText,
  MessageSquare,
  CreditCard,
} from 'lucide-react';

const FeatureShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const features = [
    {
      id: 'ai-analytics',
      name: 'AI Analytics Dashboard',
      description: 'Real-time analytics with AI-powered insights and predictive analytics',
      category: 'analytics',
      icon: BarChart3,
      color: 'blue',
      path: '/analytics',
      tags: ['AI', 'Analytics', 'Real-time'],
      status: 'live',
    },
    {
      id: 'security-center',
      name: 'Advanced Security Center',
      description: 'Enterprise-grade security monitoring with threat detection and compliance',
      category: 'security',
      icon: Shield,
      color: 'green',
      path: '/security',
      tags: ['Security', 'Threat Detection', 'Compliance'],
      status: 'live',
    },
    {
      id: 'ai-content-generator',
      name: 'AI Content Generator 2.0',
      description: 'Advanced content creation with GPT-4 integration and multi-language support',
      category: 'ai',
      icon: Sparkles,
      color: 'purple',
      path: '/ai-generator',
      tags: ['AI', 'Content Creation', 'GPT-4'],
      status: 'live',
    },
    {
      id: 'quantum-assistant',
      name: 'Quantum AI Assistant',
      description: 'Advanced AI assistant with quantum computing capabilities and voice interaction',
      category: 'ai',
      icon: Brain,
      color: 'indigo',
      path: '/quantum-assistant',
      tags: ['AI', 'Quantum', 'Voice'],
      status: 'live',
    },
    {
      id: 'payment-system',
      name: 'Advanced Payment System',
      description: 'Comprehensive payment management with subscription handling and analytics',
      category: 'payments',
      icon: DollarSign,
      color: 'green',
      path: '/payment-system',
      tags: ['Payments', 'Subscriptions', 'Analytics'],
      status: 'live',
    },
    {
      id: 'performance-dashboard',
      name: 'Performance Dashboard',
      description: 'Real-time system performance monitoring and optimization',
      category: 'monitoring',
      icon: Activity,
      color: 'orange',
      path: '/performance',
      tags: ['Performance', 'Monitoring', 'Real-time'],
      status: 'live',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Features', icon: Star, count: features.length },
    { id: 'ai', name: 'AI & ML', icon: Brain, count: features.filter(f => f.category === 'ai').length },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, count: features.filter(f => f.category === 'analytics').length },
    { id: 'security', name: 'Security', icon: Shield, count: features.filter(f => f.category === 'security').length },
    { id: 'payments', name: 'Payments', icon: DollarSign, count: features.filter(f => f.category === 'payments').length },
    { id: 'monitoring', name: 'Monitoring', icon: Activity, count: features.filter(f => f.category === 'monitoring').length },
  ];

  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === selectedCategory);

  const FeatureCard = ({ feature }) => {
    const Icon = feature.icon;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-${feature.color}-100`}>
            <Icon className={`w-6 h-6 text-${feature.color}-600`} />
          </div>
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            Live
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {feature.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Link
          to={feature.path}
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          <span>Explore Feature</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center space-x-3 mb-4">
              <Rocket className="w-10 h-10 text-blue-600" />
              <span>Feature Showcase</span>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">All Systems Live</span>
              </div>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive suite of advanced features powered by AI, quantum computing, and cutting-edge technology
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total Features</h3>
              <Star className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-2">{features.length}</div>
            <p className="text-blue-100 text-sm">Advanced capabilities</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Live Systems</h3>
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-2">{features.length}</div>
            <p className="text-green-100 text-sm">Production ready</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">AI Powered</h3>
              <Brain className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-2">{features.filter(f => f.tags.includes('AI')).length}</div>
            <p className="text-purple-100 text-sm">Intelligent features</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-orange-600 to-red-700 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Categories</h3>
              <Target className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-2">{categories.length - 1}</div>
            <p className="text-orange-100 text-sm">Feature categories</p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  <span className="font-medium">{category.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isActive ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Features' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-gray-600">
              {filteredFeatures.length} feature{filteredFeatures.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeatures.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl shadow-lg p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Experience the Future?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Explore our comprehensive suite of advanced features and discover how AI, quantum computing, and cutting-edge technology can transform your workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
