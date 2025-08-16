import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Star,
  Crown,
  Zap,
  Shield,
  Globe,
  Code,
  Brain,
  Building,
  Palette,
  Rocket,
  DollarSign,
  TrendingUp,
  Award,
  Target,
  Users,
  Server,
  Cloud,
  Lock,
  Activity,
  BarChart3,
  PieChart,
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
  ShoppingCart,
  Music,
  Video,
  Atom,
  Server as ServerIcon,
  Copy as CopyIcon,
  FileText as FileTextIcon,
  Shield as ShieldIcon,
  Code as CodeIcon2,
  TrendingUp as TrendingUpIcon,
  Cloud as CloudIcon,
  Network as NetworkIcon,
  Vr as VrIcon,
  Activity as ActivityIcon,
  Palette as PaletteIcon,
  Search as SearchIcon,
  Edit3 as Edit3Icon,
  Server as ServerIcon2,
} from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const pricingTiers = [
    {
      name: 'Starter',
      icon: Star,
      price: { monthly: 49, yearly: 39 },
      description: 'Perfect for small businesses and startups',
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Basic website design',
        'SEO optimization',
        'Content creation (5 articles/month)',
        'Email support',
        'Basic analytics',
        'Mobile responsive design',
        'Contact form integration',
        'Social media setup'
      ],
      services: [
        { name: 'Website Design', icon: Palette, included: true },
        { name: 'SEO Services', icon: Search, included: true },
        { name: 'Content Creation', icon: Edit3, included: true },
        { name: 'Hosting & Maintenance', icon: ServerIcon2, included: false },
        { name: 'AI Content Studio', icon: FileTextIcon, included: false },
        { name: 'Multi-Site Platform', icon: CopyIcon, included: false },
        { name: 'Quantum Computing', icon: Atom, included: false },
        { name: 'Enterprise Security', icon: ShieldIcon, included: false }
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Professional',
      icon: Crown,
      price: { monthly: 199, yearly: 159 },
      description: 'Ideal for growing businesses and agencies',
      color: 'from-purple-500 to-pink-500',
      features: [
        'Advanced website design',
        'Comprehensive SEO strategy',
        'Content creation (20 articles/month)',
        'Priority support',
        'Advanced analytics',
        'Custom branding',
        'E-commerce integration',
        'Social media management',
        'AI content generation',
        'Multi-site hosting (up to 5 sites)',
        'White-label solutions',
        'API access'
      ],
      services: [
        { name: 'Website Design', icon: Palette, included: true },
        { name: 'SEO Services', icon: Search, included: true },
        { name: 'Content Creation', icon: Edit3, included: true },
        { name: 'Hosting & Maintenance', icon: ServerIcon2, included: true },
        { name: 'AI Content Studio', icon: FileTextIcon, included: true },
        { name: 'Multi-Site Platform', icon: CopyIcon, included: true },
        { name: 'Quantum Computing', icon: Atom, included: false },
        { name: 'Enterprise Security', icon: ShieldIcon, included: false }
      ],
      cta: 'Start Professional',
      popular: true
    },
    {
      name: 'Enterprise',
      icon: Zap,
      price: { monthly: 499, yearly: 399 },
      description: 'For large corporations and enterprises',
      color: 'from-orange-500 to-red-500',
      features: [
        'Custom enterprise solutions',
        'Advanced AI integration',
        'Unlimited content creation',
        '24/7 dedicated support',
        'Custom analytics dashboard',
        'Enterprise security',
        'Custom integrations',
        'Dedicated account manager',
        'Quantum computing access',
        'Unlimited multi-site hosting',
        'Custom software development',
        'Digital transformation consulting',
        'Compliance & security audits',
        'Performance optimization',
        'Disaster recovery',
        'Custom training programs'
      ],
      services: [
        { name: 'Website Design', icon: Palette, included: true },
        { name: 'SEO Services', icon: Search, included: true },
        { name: 'Content Creation', icon: Edit3, included: true },
        { name: 'Hosting & Maintenance', icon: ServerIcon2, included: true },
        { name: 'AI Content Studio', icon: FileTextIcon, included: true },
        { name: 'Multi-Site Platform', icon: CopyIcon, included: true },
        { name: 'Quantum Computing', icon: Atom, included: true },
        { name: 'Enterprise Security', icon: ShieldIcon, included: true }
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const serviceCategories = [
    {
      name: 'Web Services',
      services: [
        { name: 'Website Design & Development', price: '$2,000-5,000/site', icon: Palette },
        { name: 'SEO Services', price: '$500-2,000/month', icon: Search },
        { name: 'Multi-Site Hosting Platform', price: '$299-999/month', icon: ServerIcon },
        { name: 'E-commerce Platform', price: '$399-1,999/month', icon: ShoppingCart },
        { name: 'Website Hosting & Maintenance', price: '$199-499/month', icon: ServerIcon2 }
      ]
    },
    {
      name: 'AI & Technology',
      services: [
        { name: 'AI-Powered Website Builder', price: '$199-499/month', icon: Wand2 },
        { name: 'Quantum Computing Integration', price: '$1,000-5,000/month', icon: Atom },
        { name: 'AI Content Studio', price: '$199-599/month', icon: FileTextIcon },
        { name: 'Custom Software Development', price: '$5,000-50,000/project', icon: CodeIcon2 }
      ]
    },
    {
      name: 'Business Solutions',
      services: [
        { name: 'Digital Agency Services', price: '$2,000-10,000/month', icon: Briefcase },
        { name: 'White-Label Solutions', price: '$500-2,000/month', icon: CopyIcon },
        { name: 'Digital Transformation Consulting', price: '$2,000-10,000/day', icon: TrendingUpIcon },
        { name: 'SaaS Platform Development', price: '$10,000-100,000/project', icon: CloudIcon }
      ]
    },
    {
      name: 'Creative Services',
      services: [
        { name: 'Audio/Video Production Suite', price: '$299-799/month', icon: Music },
        { name: 'Content Creation', price: '$1,000-3,000/month', icon: Edit3 },
        { name: 'AR/VR Experiences', price: '$5,000-25,000/project', icon: VrIcon }
      ]
    },
    {
      name: 'Enterprise & Emerging Tech',
      services: [
        { name: 'Enterprise Security Solutions', price: '$1,500-5,000/month', icon: ShieldIcon },
        { name: 'Web3/Blockchain Integration', price: '$3,000-15,000/project', icon: NetworkIcon },
        { name: 'IoT Dashboard Development', price: '$2,000-10,000/project', icon: ActivityIcon }
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Complete Pricing Solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business needs, from startup to enterprise
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-lg ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-8 w-16 items-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 transition-colors"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
              Yearly
              <span className="ml-2 text-sm text-green-400">(Save 20%)</span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border transition-all duration-300 hover:transform hover:scale-105 ${
                tier.popular
                  ? 'border-purple-500/50 shadow-2xl shadow-purple-500/25'
                  : 'border-white/10 hover:border-purple-500/30'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${tier.color} mb-4`}>
                  <tier.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-300">{tier.description}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-2">
                  <DollarSign className="w-8 h-8 text-green-400" />
                  <span className="text-5xl font-bold text-white">
                    {billingCycle === 'yearly' ? tier.price.yearly : tier.price.monthly}
                  </span>
                  <span className="text-gray-400">/{billingCycle === 'yearly' ? 'mo' : 'mo'}</span>
                </div>
                {billingCycle === 'yearly' && (
                  <p className="text-green-400 text-sm mt-2">Billed annually</p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Service Coverage */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Service Coverage</h4>
                <div className="space-y-3">
                  {tier.services.map((service, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <service.icon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{service.name}</span>
                      </div>
                      {service.included ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Service Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Individual Service Pricing
            </h3>
            <p className="text-gray-300">
              Choose specific services that fit your exact needs
            </p>
          </div>

          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            >
              <h4 className="text-2xl font-bold text-white mb-6">{category.name}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIndex) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (categoryIndex * 0.1) + (serviceIndex * 0.05) }}
                    className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                        <service.icon className="w-5 h-5 text-white" />
                      </div>
                      <h5 className="text-lg font-semibold text-white">{service.name}</h5>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      <span className="text-xl font-bold text-green-400">{service.price}</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                      Get Started
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Revenue Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/30"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Revenue Potential Calculator
            </h3>
            <p className="text-gray-300">
              See how much you can earn with our complete service ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10</div>
              <div className="text-gray-300">Clients</div>
              <div className="text-green-400 text-sm">$5,000-10,000/month</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">25</div>
              <div className="text-gray-300">Clients</div>
              <div className="text-green-400 text-sm">$12,500-25,000/month</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50</div>
              <div className="text-gray-300">Clients</div>
              <div className="text-green-400 text-sm">$25,000-50,000/month</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-gray-300">Clients</div>
              <div className="text-green-400 text-sm">$50,000-100,000/month</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
