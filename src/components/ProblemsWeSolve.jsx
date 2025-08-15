import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  AlertTriangle,
  Shield,
  BarChart3,
  Clock,
  Globe,
  Cpu,
  Lock
} from 'lucide-react';

const ProblemsWeSolve = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const problems = [
    {
      icon: Clock,
      title: 'Slow Decision Cycles',
      description:
        'Fragmented data and manual processes delay critical decisions across teams.',
      outcomes: [
        'Days-to-decisions instead of minutes',
        'Missed opportunities and slow responses',
        'Operational drag and bottlenecks'
      ]
    },
    {
      icon: BarChart3,
      title: 'Unreliable Forecasting',
      description:
        'Static models fail under shifting conditions and new market signals.',
      outcomes: [
        'Volatile accuracy and blind spots',
        'Over/under-stock and burned budgets',
        'Reactive planning instead of proactive'
      ]
    },
    {
      icon: Shield,
      title: 'Compliance & Risk Exposure',
      description:
        'Regulatory requirements evolve faster than internal controls and audits.',
      outcomes: [
        'Gaps in audit trails and model governance',
        'Data residency and privacy challenges',
        'Unclear ownership and accountability'
      ]
    },
    {
      icon: Cpu,
      title: 'Limited AI Adoption',
      description:
        'Pilots never scale due to tooling debt, infrastructure friction, and skills gaps.',
      outcomes: [
        'Proof-of-concepts that stall at 20% adoption',
        'Shadow tooling and vendor sprawl',
        'Siloed stacks that don’t interoperate'
      ]
    },
    {
      icon: Globe,
      title: 'Data Silos Across Regions',
      description:
        'Global teams operate on divergent datasets and standards.',
      outcomes: [
        'Inconsistent truths and duplicated effort',
        'Latency and sync challenges worldwide',
        'Security risk from uncontrolled data flows'
      ]
    },
    {
      icon: Lock,
      title: 'Model Security Gaps',
      description:
        'Models exposed to prompt injection, data leakage, and adversarial inputs.',
      outcomes: [
        'Untrusted outputs and reputational risk',
        'Unmonitored drift and regressions',
        'Unpatched threats in the model lifecycle'
      ]
    }
  ];

  const ProblemCard = ({ problem, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8 hover:border-luxury-gold/40 transition-all duration-300 group"
    >
      <div className="w-16 h-16 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <problem.icon className="w-8 h-8 text-black" />
      </div>

      <h3 className="text-2xl font-display font-bold text-luxury-light mb-3">
        {problem.title}
      </h3>

      <p className="text-luxury-gray mb-5 leading-relaxed">
        {problem.description}
      </p>

      <ul className="space-y-2">
        {problem.outcomes.map((item, i) => (
          <li key={i} className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-luxury-gold rounded-full" />
            <span className="text-luxury-gray text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <section id="problems" className="py-20 bg-luxury-gradient relative overflow-hidden">
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
            Problems <span className="text-luxury-gold">We Solve</span>
          </h2>
          <p className="text-xl text-luxury-gray max-w-3xl mx-auto">
            We eliminate decision delays, data silos, and security gaps with a production-grade AI platform
            engineered for scale, speed, and governance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((p, index) => (
            <ProblemCard key={p.title} problem={p} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-3xl font-display font-bold text-luxury-light mb-4">
              Ready to remove these blockers?
            </h3>
            <p className="text-luxury-gray mb-8 max-w-2xl mx-auto">
              Our AI strategists will map your top constraints to quick wins and a scalable roadmap.
            </p>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-luxury-gold to-yellow-500 text-black rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-300"
            >
              Schedule a Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemsWeSolve;