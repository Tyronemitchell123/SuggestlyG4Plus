import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Crown,
  Zap,
  Shield,
  Brain,
  BarChart3,
  Cpu,
  Wrench,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [serviceStatus, setServiceStatus] = useState({
    'ai-strategy': 'operational',
    quantum: 'operational',
    neural: 'operational',
    custom: 'operational',
  });

  const [isFixing, setIsFixing] = useState(false);

  const handleServiceFix = async serviceId => {
    setIsFixing(true);

    try {
      // Simulate service fix process
      toast.loading(`🔧 Fixing ${serviceId} service...`, { duration: 2000 });

      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update service status
      setServiceStatus(prev => ({
        ...prev,
        [serviceId]: 'operational',
      }));

      toast.success(`✅ ${serviceId} service fixed successfully!`);
    } catch (error) {
      toast.error(`❌ Failed to fix ${serviceId} service. Please try again.`);
    } finally {
      setIsFixing(false);
    }
  };

  const getServiceStatusIcon = status => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'maintenance':
        return <Wrench className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getServiceStatusText = status => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'maintenance':
        return 'Maintenance';
      case 'error':
        return 'Error';
      default:
        return 'Operational';
    }
  };

  const services = [
    {
      id: 'ai-strategy',
      icon: Crown,
      title: 'AI Strategy Consulting',
      description:
        'Comprehensive AI transformation strategies for enterprise-level organizations.',
      features: [
        'Strategic AI Roadmap Development',
        'Technology Stack Assessment',
        'ROI Analysis & Forecasting',
        'Change Management Planning',
        'Competitive Intelligence Analysis',
        'Executive Advisory Services',
      ],
      color: 'from-luxury-gold to-yellow-500',
    },
    {
      id: 'quantum',
      icon: Zap,
      title: 'Quantum Computing Solutions',
      description:
        'Next-generation quantum computing integration for complex problem solving.',
      features: [
        'Quantum Algorithm Development',
        'Quantum-Classical Hybrid Systems',
        'Quantum Security Protocols',
        'Quantum Machine Learning',
        'Quantum Optimization',
        'Quantum Simulation',
      ],
      color: 'from-purple-600 to-pink-500',
    },
    {
      id: 'neural',
      icon: Brain,
      title: 'Advanced Neural Networks',
      description:
        'Custom neural network architectures for specific business applications.',
      features: [
        'Deep Learning Model Development',
        'Neural Architecture Search',
        'Transfer Learning Implementation',
        'Model Optimization & Compression',
        'Real-time Inference Systems',
        'Neural Network Security',
      ],
      color: 'from-blue-600 to-cyan-500',
    },
    {
      id: 'custom',
      icon: Cpu,
      title: 'Custom Development',
      description:
        'Tailored software solutions and custom AI implementations for unique business needs.',
      features: [
        'Custom AI Model Development',
        'Enterprise Software Solutions',
        'API Integration & Development',
        'Cloud Infrastructure Setup',
        'DevOps & CI/CD Implementation',
        '24/7 Technical Support',
      ],
      color: 'from-indigo-600 to-purple-500',
    },
  ];

  const ServiceCard = ({ service, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8 hover:border-luxury-gold/40 transition-all duration-300 group hover:shadow-luxury"
    >
      <div className="flex items-center justify-between mb-6">
        <div
          className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <service.icon className="w-8 h-8 text-white" />
        </div>
        <div className="flex items-center space-x-2">
          {getServiceStatusIcon(serviceStatus[service.id])}
          <span className="text-sm text-luxury-gray">
            {getServiceStatusText(serviceStatus[service.id])}
          </span>
        </div>
      </div>

      <h3 className="text-2xl font-display font-bold text-luxury-light mb-4">
        {service.title}
      </h3>

      <p className="text-luxury-gray mb-6 leading-relaxed">
        {service.description}
      </p>

      <ul className="space-y-3 mb-6">
        {service.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-luxury-gold rounded-full mt-2 flex-shrink-0" />
            <span className="text-luxury-gray text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex space-x-3">
        <button
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-luxury-gold to-yellow-500 text-black rounded-xl font-bold hover:scale-105 transition-transform duration-300"
        >
          Request Consultation
        </button>

        {serviceStatus[service.id] !== 'operational' && (
          <button
            onClick={() => handleServiceFix(service.id)}
            disabled={isFixing}
            className="py-3 px-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Wrench className="w-4 h-4" />
            <span>Fix</span>
          </button>
        )}
      </div>
    </motion.div>
  );

  return (
    <section
      id="services"
      className="py-20 bg-luxury-gradient relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_50%,rgba(255,215,0,0.05),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-luxury-light mb-6">
            Elite Services
          </h2>
          <p className="text-xl text-luxury-gray max-w-3xl mx-auto">
            Comprehensive AI solutions designed for UHNWI and global
            enterprises. From strategic consulting to custom development, we
            deliver quantum-level results.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-display font-bold text-luxury-light mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-luxury-gray mb-8 max-w-2xl mx-auto">
              Our AI strategists are ready to help you achieve quantum-level
              results. Schedule a confidential consultation to discuss your
              specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-luxury-gold to-yellow-500 text-black rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-300"
              >
                Schedule Consultation
              </button>
              <button
                onClick={() => window.open('/dashboard', '_blank')}
                className="px-8 py-4 border border-luxury-gold/30 text-luxury-gold rounded-xl font-bold text-lg hover:bg-luxury-gold/10 transition-colors duration-300"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
