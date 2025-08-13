import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Brain, 
  Zap, 
  Shield, 
  Globe, 
  Lock, 
  BarChart3, 
  Cpu,
  Database,
  Network,
  Rocket,
  Target,
  Users,
  Clock,
  Star,
  TrendingUp,
  Award
} from 'lucide-react';

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: Brain,
      title: 'Quantum AI Processing',
      description: 'Next-generation quantum computing power for complex problem solving and optimization.',
      benefits: ['1000x faster processing', 'Quantum advantage', 'Complex optimization']
    },
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: 'Enterprise-level security protocols ensuring your data and AI models remain protected.',
      benefits: ['End-to-end encryption', 'SOC 2 compliance', 'Zero-trust architecture']
    },
    {
      icon: Globe,
      title: 'Global AI Network',
      description: 'Distributed AI infrastructure providing worldwide coverage and redundancy.',
      benefits: ['99.99% uptime', 'Global edge nodes', 'Automatic failover']
    },
    {
      icon: BarChart3,
      title: 'Predictive Analytics',
      description: 'Advanced machine learning models for accurate forecasting and strategic insights.',
      benefits: ['95% accuracy', 'Real-time insights', 'Custom algorithms']
    },
    {
      icon: Users,
      title: 'Elite Support Team',
      description: 'Dedicated AI strategists and engineers available 24/7 for your success.',
      benefits: ['24/7 availability', 'Expert strategists', 'Priority response']
    },
    {
      icon: Rocket,
      title: 'Rapid Deployment',
      description: 'Quick implementation of AI solutions with minimal disruption to your operations.',
      benefits: ['30-day deployment', 'Zero downtime', 'Seamless integration']
    },
    {
      icon: Target,
      title: 'Precision Targeting',
      description: 'Laser-focused AI models designed for your specific industry and use case.',
      benefits: ['Industry-specific', 'Custom training', 'Optimized performance']
    },
    {
      icon: TrendingUp,
      title: 'Scalable Growth',
      description: 'AI infrastructure that grows with your business, from startup to enterprise.',
      benefits: ['Auto-scaling', 'Performance monitoring', 'Cost optimization']
    }
  ];

  const stats = [
    { number: '99.9%', label: 'Uptime Guarantee', icon: Clock },
    { number: '1000x', label: 'Faster Processing', icon: Zap },
    { number: '24/7', label: 'Expert Support', icon: Users },
    { number: '95%', label: 'Accuracy Rate', icon: Target }
  ];

  const FeatureCard = ({ feature, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8 hover:border-luxury-gold/40 transition-all duration-300 group"
    >
      <div className="w-16 h-16 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <feature.icon className="w-8 h-8 text-black" />
      </div>
      
      <h3 className="text-2xl font-display font-bold text-luxury-light mb-4">
        {feature.title}
      </h3>
      
      <p className="text-luxury-gray mb-6 leading-relaxed">
        {feature.description}
      </p>
      
      <ul className="space-y-2">
        {feature.benefits.map((benefit, benefitIndex) => (
          <li key={benefitIndex} className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-luxury-gold flex-shrink-0" />
            <span className="text-luxury-gray text-sm">{benefit}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  const StatCard = ({ stat, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <stat.icon className="w-10 h-10 text-black" />
      </div>
      <div className="text-3xl font-display font-bold text-luxury-gold mb-2">
        {stat.number}
      </div>
      <div className="text-luxury-gray font-medium">
        {stat.label}
      </div>
    </motion.div>
  );

  return (
    <section id="features" className="py-20 bg-luxury-gradient relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_50%,rgba(255,215,0,0.05),transparent)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-luxury-light mb-6">
            Elite <span className="text-luxury-gold">AI Features</span>
          </h2>
          <p className="text-xl text-luxury-gray max-w-3xl mx-auto">
            Cutting-edge AI capabilities designed for maximum performance, security, and scalability. 
            Experience the future of artificial intelligence.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-display font-bold text-luxury-light mb-4">
              Advanced Technology Stack
            </h3>
            <p className="text-luxury-gray max-w-2xl mx-auto">
              Built on the latest AI and quantum computing technologies for unparalleled performance.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'TensorFlow', 'PyTorch', 'Quantum Circuits', 'Neural Networks',
              'Machine Learning', 'Deep Learning', 'Natural Language Processing',
              'Computer Vision', 'Reinforcement Learning', 'Federated Learning',
              'Edge Computing', 'Cloud AI'
            ].map((tech, index) => (
              <div
                key={tech}
                className="bg-luxury-darker border border-luxury-gold/20 rounded-xl p-4 text-center hover:border-luxury-gold/40 transition-colors duration-300"
              >
                <div className="text-luxury-gold font-semibold text-sm">{tech}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-16"
        >
          <div className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-3xl font-display font-bold text-luxury-light mb-4">
              Experience Elite AI Performance
            </h3>
            <p className="text-luxury-gray mb-8 max-w-2xl mx-auto">
              Join the elite ranks of organizations leveraging cutting-edge AI technology. 
              Our platform delivers results that exceed expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const pricingSection = document.getElementById('pricing');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-luxury-gold to-yellow-500 text-black rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-300"
              >
                View Pricing
              </button>
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 border border-luxury-gold/30 text-luxury-gold rounded-xl font-bold text-lg hover:bg-luxury-gold/10 transition-colors duration-300"
              >
                Request Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

