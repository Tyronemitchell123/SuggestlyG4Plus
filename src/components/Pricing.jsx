import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Crown, Zap, Shield, Star, Check, ArrowRight } from "lucide-react";
import ConsultationModal from "./ConsultationModal";

const plans = [
  {
    id: "premium-ai",
    title: "Premium AI Services",
    price: "$1,800",
    period: "/month",
    tagline: "Advanced AI agents for growing enterprises",
    features: [
      "Advanced AI Agents & Automation",
      "Neural Network Optimization",
      "Predictive Analytics Dashboard",
      "24/7 Technical Support",
      "Custom AI Model Training",
      "API Integration Services",
      "Monthly Performance Reports",
      "Dedicated Success Manager"
    ],
    trial: "7-day free trial",
    popular: false,
    icon: Zap,
    color: "from-blue-600 to-purple-600"
  },
  {
    id: "elite-platform",
    title: "Elite AI Platform",
    price: "$5,000",
    period: "/month",
    tagline: "Quantum AI development for executives",
    features: [
      "Quantum AI Development Suite",
      "Custom Neural Networks",
      "Enterprise Integration",
      "Dedicated AI Strategist",
      "Advanced ML Models",
      "Real-time Analytics",
      "Priority Support (2hr response)",
      "Custom Dashboard Development",
      "AI Strategy Consulting",
      "Monthly Executive Briefings"
    ],
    trial: "14-day free trial",
    popular: true,
    icon: Crown,
    color: "from-luxury-gold to-yellow-500"
  },
  {
    id: "quantum-ai",
    title: "Quantum AI Development",
    price: "$15,000",
    period: "/month",
    tagline: "Full AI transformation for UHNWI",
    features: [
      "Quantum Computing Integration",
      "Advanced ML Model Development",
      "Custom AI Solutions",
      "Executive Consultation",
      "Full AI Transformation",
      "Custom Development",
      "Priority Support (1hr response)",
      "Dedicated AI Team",
      "Strategic AI Roadmap",
      "Weekly Executive Meetings",
      "Custom AI Training Programs",
      "Advanced Security Protocols"
    ],
    trial: "30-day free trial",
    popular: false,
    icon: Star,
    color: "from-purple-600 to-pink-600"
  },
  {
    id: "ultimate-elite",
    title: "Ultimate Elite Package",
    price: "$50,000",
    period: "/month",
    tagline: "Complete AI mastery for billionaires",
    features: [
      "Full AI Transformation",
      "Custom Development",
      "Priority Support (30min response)",
      "Executive Team Access",
      "Quantum AI Research",
      "Custom AI Infrastructure",
      "Dedicated AI Scientists",
      "Strategic AI Investments",
      "Exclusive AI Events",
      "Personal AI Assistant",
      "Custom AI Training",
      "Advanced Security",
      "AI Portfolio Management",
      "24/7 Executive Support"
    ],
    trial: "30-day elite trial",
    popular: false,
    icon: Shield,
    color: "from-red-600 to-orange-600"
  }
];

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="pricing" className="py-20 px-4 relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-luxury-gold rounded-full opacity-20 animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={cardVariants}
            className="text-5xl md:text-6xl font-display font-bold text-luxury-gold mb-6"
          >
            Elite AI Solutions
          </motion.h2>
          <motion.p 
            variants={cardVariants}
            className="text-xl md:text-2xl text-luxury-gray max-w-3xl mx-auto leading-relaxed"
          >
            Choose your path to AI mastery. From advanced automation to quantum computing, 
            we provide the tools and expertise to transform your business.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className={`relative group ${
                plan.popular 
                  ? 'lg:col-span-2 lg:row-span-2 order-first lg:order-none' 
                  : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-luxury-gold to-yellow-500 text-black px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className={`
                relative h-full bg-glass backdrop-blur-md border border-luxury-gold/20 
                rounded-2xl p-8 transition-all duration-300 group-hover:border-luxury-gold/40
                group-hover:shadow-luxury ${plan.popular ? 'lg:p-12' : ''}
              `}>
                {/* Plan Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${plan.color} 
                  flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>

                {/* Plan Title */}
                <h3 className={`font-display font-bold text-luxury-gold mb-2 ${
                  plan.popular ? 'text-3xl' : 'text-2xl'
                }`}>
                  {plan.title}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className={`font-display font-bold text-luxury-light ${
                      plan.popular ? 'text-4xl' : 'text-3xl'
                    }`}>
                      {plan.price}
                    </span>
                    <span className="text-luxury-gray ml-1">{plan.period}</span>
                  </div>
                  <p className="text-luxury-gray italic mt-2">{plan.tagline}</p>
                </div>

                {/* Trial Period */}
                <div className="mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-700/20 text-green-400 border border-green-700/30">
                    <Check className="w-4 h-4 mr-1" />
                    {plan.trial}
                  </span>
                </div>

                {/* Features */}
                <ul className={`space-y-3 mb-8 ${plan.popular ? 'text-lg' : 'text-base'}`}>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-luxury-gold mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-luxury-gray">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => setSelectedPlan(plan)}
                  className={`
                    w-full group relative overflow-hidden rounded-xl px-6 py-4 font-bold 
                    transition-all duration-300 transform hover:scale-105
                    ${plan.popular 
                      ? 'bg-gradient-to-r from-luxury-gold to-yellow-500 text-black text-lg py-5' 
                      : 'bg-gradient-to-r from-luxury-gold/20 to-luxury-gold/10 text-luxury-gold border border-luxury-gold/30 hover:bg-gradient-to-r hover:from-luxury-gold/30 hover:to-luxury-gold/20'
                    }
                  `}
                >
                  <span className="flex items-center justify-center">
                    Request Consultation
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <div className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-display font-bold text-luxury-gold mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-luxury-gray mb-6">
              Our AI strategists can design a bespoke solution tailored to your specific needs. 
              Contact us for a confidential consultation.
            </p>
            <button
              onClick={() => setSelectedPlan({ title: "Custom Solution", price: "Custom" })}
              className="bg-gradient-to-r from-luxury-gold to-yellow-500 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform duration-300"
            >
              Schedule Elite Consultation
            </button>
          </div>
        </motion.div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        plan={selectedPlan}
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
      />
    </section>
  );
};

export default Pricing;
