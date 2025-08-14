import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Crown, 
  Zap, 
  Shield, 
  Brain, 
  BarChart3, 
  Cpu
} from 'lucide-react';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const services = [
    {
      id: 'ai-strategy',
      icon: Crown,
      title: 'AI Strategy Consulting',
      description: 'Comprehensive AI transformation strategies for enterprise-level organizations.',
      features: [
        'Strategic AI Roadmap Development',
        'Technology Stack Assessment',
        'ROI Analysis & Forecasting',
        'Change Management Planning',
        'Competitive Intelligence Analysis',
        'Executive Advisory Services'
      ],
      color: 'from-luxury-gold to-yellow-500'
    },
    {
      id: 'quantum',
      icon: Zap,
      title: 'Quantum Computing Solutions',
      description: 'Next-generation quantum computing integration for complex problem solving.',
      features: [
        'Quantum Algorithm Development',
        'Quantum-Classical Hybrid Systems',
        'Quantum Security Protocols',
        'Quantum Machine Learning',
        'Quantum Optimization',
        'Quantum Simulation'
      ],
      color: 'from-purple-600 to-pink-500'
    },
    {
      id: 'neural',
      icon: Brain,
      title: 'Advanced Neural Networks',
      description: 'Custom neural network architectures for specific business applications.',
      features: [
        'Deep Learning Model Development',
        'Neural Architecture Search',
        'Transfer Learning Implementation',
        'Model Optimization & Compression',
        'Real-time Inference Systems',
        'Neural Network Security'
      ],
      color: 'from-blue-600 to-cyan-500'
    },
    {
      id: 'custom',
      icon: Cpu,
      title: 'Custom AI Development',
      description: 'Bespoke AI solutions tailored to your unique business requirements.',
      features: [
        'Custom AI Model Development',
        'API Integration & Development',
        'Data Pipeline Architecture',
        'Scalable AI Infrastructure',
        'Performance Optimization',
        'Continuous Learning Systems'
      ],
      color: 'from-green-600 to-emerald-500'
    },
    {
      id: 'analytics',
      icon: BarChart3,
      title: 'Predictive Analytics',
      description: 'Advanced analytics and predictive modeling for strategic decision making.',
      features: [
        'Predictive Modeling',
        'Time Series Analysis',
        'Risk Assessment Models',
        'Market Trend Analysis',
        'Customer Behavior Prediction',
        'Performance Forecasting'
      ],
      color: 'from-red-600 to-orange-500'
    },
    {
      id: 'security',
      icon: Shield,
      title: 'AI Security & Compliance',
      description: 'Enterprise-grade security and compliance for AI systems.',
      features: [
        'AI Model Security',
        'Data Privacy Protection',
        'Compliance Framework Implementation',
        'Threat Detection & Response',
        'Audit Trail Management',
        'Security Training Programs'
      ],
      color: 'from-indigo-600 to-purple-500'
    }
  ];

  const ServiceCard = ({ service, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8 hover:border-luxury-gold/40 transition-all duration-300 group hover:shadow-luxury"
    >
      <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <service.icon className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-2xl font-display font-bold text-luxury-light mb-4">
        {service.title}
      </h3>
      
      <p className="text-luxury-gray mb-6 leading-relaxed">
        {service.description}
      </p>
      
      <ul className="space-y-3">
        {service.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-luxury-gold rounded-full mt-2 flex-shrink-0" />
            <span className="text-luxury-gray text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-8">
        <button
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="w-full py-3 px-6 bg-gradient-to-r from-luxury-gold to-yellow-500 text-black rounded-xl font-bold hover:scale-105 transition-transform duration-300"
        >
          Request Consultation
        </button>
      </div>
    </motion.div>
  );

  return (
    <section id="services" className="py-20 bg-luxury-gradient relative overflow-hidden">
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
            Elite <span className="text-luxury-gold">AI Services</span>
          </h2>
          <p className="text-xl text-luxury-gray max-w-3xl mx-auto">
            Comprehensive AI solutions designed for UHNWI and global enterprises. 
            From strategic consulting to custom development, we deliver quantum-level results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              Our AI strategists are ready to help you achieve quantum-level results. 
              Schedule a confidential consultation to discuss your specific requirements.
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

