import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Crown, Shield, Star, Check, ArrowRight, Diamond, Globe, Lock } from "lucide-react";
import ConsultationModal from "./ConsultationModal";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const plans = [
    {
      name: "ELITE FOUNDATION",
      price: "$2,500",
      period: "/month",
      description: "Essential AI intelligence for emerging enterprises",
      features: [
        "Advanced AI Analytics Dashboard",
        "24/7 Priority Support",
        "Custom AI Model Training",
        "Data Security & Compliance",
        "Monthly Strategy Sessions",
        "Performance Optimization",
        "Basic Integration Support",
        "Quarterly ROI Reports"
      ],
      icon: Shield,
      color: "from-blue-600 to-cyan-500",
      popular: false
    },
    {
      name: "EXECUTIVE SUITE",
      price: "$8,500",
      period: "/month",
      description: "Comprehensive AI platform for established corporations",
      features: [
        "Everything in Elite Foundation",
        "Quantum AI Processing",
        "Dedicated AI Strategist",
        "Custom Neural Networks",
        "Real-time Market Intelligence",
        "Advanced Predictive Analytics",
        "Multi-platform Integration",
        "Weekly Performance Reviews",
        "Priority Feature Development",
        "Executive Dashboard Access"
      ],
      icon: Crown,
      color: "from-purple-600 to-pink-500",
      popular: true
    },
    {
      name: "QUANTUM ELITE",
      price: "$25,000",
      period: "/month",
      description: "Ultimate AI supremacy for global enterprises",
      features: [
        "Everything in Executive Suite",
        "Quantum Computing Access",
        "Custom AI Architecture",
        "Global Market Domination",
        "Exclusive AI Algorithms",
        "24/7 Dedicated Team",
        "White-label Solutions",
        "Advanced Security Protocols",
        "Real-time Global Intelligence",
        "Unlimited Custom Development",
        "Priority Support Hotline",
        "Quarterly Innovation Labs"
      ],
      icon: Diamond,
      color: "from-yellow-500 to-orange-500",
      popular: false
    },
    {
      name: "SUPREME SOVEREIGN",
      price: "$75,000",
      period: "/month",
      description: "Absolute AI dominance for UHNWI and sovereign entities",
      features: [
        "Everything in Quantum Elite",
        "Sovereign AI Infrastructure",
        "Custom Quantum Networks",
        "Global Intelligence Network",
        "Exclusive Market Access",
        "Sovereign Security Protocols",
        "Unlimited AI Development",
        "Global Strategic Advisory",
        "Exclusive Innovation Labs",
        "Sovereign Data Centers",
        "24/7 Sovereign Support",
        "Annual Strategic Summit"
      ],
      icon: Globe,
      color: "from-red-600 to-pink-600",
      popular: false
    }
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  return (
    <section id="pricing" className="py-20 bg-luxury-gradient relative overflow-hidden">
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
            Elite <span className="text-luxury-gold">Investment</span> Tiers
          </h2>
          <p className="text-xl text-luxury-gray max-w-3xl mx-auto">
            Choose your path to AI supremacy. Each tier represents a quantum leap in capability, 
            designed for those who demand nothing less than absolute excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative group ${
                plan.popular ? 'lg:scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-luxury-gold to-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className="relative h-full bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8 hover:border-luxury-gold/40 transition-all duration-300 group-hover:shadow-luxury">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-luxury-light mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-luxury-gray text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-display font-bold text-luxury-gold">
                      {plan.price}
                    </span>
                    <span className="text-luxury-gray">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <span className="text-luxury-gray text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-luxury-gold to-yellow-500 text-black hover:scale-105'
                      : 'border border-luxury-gold/30 text-luxury-gold hover:bg-luxury-gold/10'
                  }`}
                >
                  <span className="flex items-center justify-center">
                    Select {plan.name}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8">
            <h3 className="text-2xl font-display font-bold text-luxury-light mb-4">
              Enterprise Custom Solutions
            </h3>
            <p className="text-luxury-gray mb-6 max-w-2xl mx-auto">
              For organizations requiring bespoke AI infrastructure and sovereign-level capabilities, 
              we offer custom solutions tailored to your specific requirements.
            </p>
            <button
              onClick={() => handlePlanSelect({ name: "CUSTOM ENTERPRISE", price: "Custom", period: "" })}
              className="bg-gradient-to-r from-luxury-gold to-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-300 flex items-center mx-auto"
            >
              <Lock className="w-5 h-5 mr-2" />
              Request Custom Quote
            </button>
          </div>
        </motion.div>
      </div>

      {/* Consultation Modal */}
      {showModal && (
        <ConsultationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          selectedPlan={selectedPlan}
        />
      )}
    </section>
  );
};

export default Pricing;
