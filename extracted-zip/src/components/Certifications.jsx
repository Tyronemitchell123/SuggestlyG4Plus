import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Award,
  Shield,
  CheckCircle,
  Star,
  Crown,
  Zap,
  Brain,
  Globe,
  Lock,
  Users,
  TrendingUp,
  Target,
} from 'lucide-react';

const Certifications = React.memo(() => {
  const certifications = useMemo(() => [
    {
      id: 1,
      name: 'ISO 27001',
      issuer: 'International Organization for Standardization',
      description: 'Information Security Management System',
      category: 'Security',
      icon: Shield,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/30',
    },
    {
      id: 2,
      name: 'SOC 2 Type II',
      issuer: 'AICPA',
      description: 'Service Organization Control 2 Compliance',
      category: 'Compliance',
      icon: Lock,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/30',
    },
    {
      id: 3,
      name: 'AWS Advanced Consulting Partner',
      issuer: 'Amazon Web Services',
      description: 'Cloud Infrastructure & AI Solutions',
      category: 'Technology',
      icon: Globe,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      borderColor: 'border-orange-400/30',
    },
    {
      id: 4,
      name: 'Microsoft Gold Partner',
      issuer: 'Microsoft Corporation',
      description: 'AI & Cloud Solutions Provider',
      category: 'Technology',
      icon: Crown,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      borderColor: 'border-purple-400/30',
    },
    {
      id: 5,
      name: 'Google Cloud Partner',
      issuer: 'Google Cloud',
      description: 'AI & Machine Learning Solutions',
      category: 'Technology',
      icon: Brain,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      borderColor: 'border-red-400/30',
    },
    {
      id: 6,
      name: 'Forrester Wave Leader',
      issuer: 'Forrester Research',
      description: 'AI & Analytics Services',
      category: 'Recognition',
      icon: Star,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/30',
    },
  ], []);

  const achievements = useMemo(() => [
    {
      number: '500+',
      label: 'Enterprise Clients',
      icon: Users,
      color: 'text-blue-400',
    },
    {
      number: '99.9%',
      label: 'Uptime SLA',
      icon: CheckCircle,
      color: 'text-green-400',
    },
    {
      number: '24/7',
      label: 'Elite Support',
      icon: Zap,
      color: 'text-luxury-gold',
    },
    {
      number: '50+',
      label: 'Industry Awards',
      icon: Award,
      color: 'text-purple-400',
    },
  ], []);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SUGGESTLY ELITE",
    "description": "Advanced AI Platform & Multi-Site Hosting for UHNWI & Business Executives",
    "url": "https://suggestly-elite.com",
    "award": [
      "ISO 27001 Certification",
      "SOC 2 Type II Compliance",
      "AWS Advanced Consulting Partner",
      "Microsoft Gold Partner",
      "Google Cloud Partner",
      "Forrester Wave Leader"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Professional Certifications",
      "itemListElement": certifications.map(cert => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "EducationalCredential",
          "name": cert.name,
          "description": cert.description,
          "educationalLevel": "Professional",
          "credentialCategory": cert.category
        }
      }))
    }
  };

  return (
    <>
      <Helmet>
        <title>Professional Certifications - SUGGESTLY ELITE</title>
        <meta name="description" content="Trusted by Fortune 500 companies worldwide. Our elite certifications and industry recognition demonstrate our commitment to excellence, security, and innovation." />
        <meta name="keywords" content="ISO 27001, SOC 2, AWS Partner, Microsoft Gold Partner, Google Cloud Partner, Forrester Wave, enterprise certifications, security compliance" />
        <meta property="og:title" content="Professional Certifications - SUGGESTLY ELITE" />
        <meta property="og:description" content="Trusted by Fortune 500 companies worldwide. Our elite certifications and industry recognition demonstrate our commitment to excellence, security, and innovation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://suggestly-elite.com/certifications" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <section 
        id="certifications" 
        className="py-20 bg-gradient-to-br from-luxury-darker via-luxury-dark to-luxury-darker"
        aria-labelledby="certifications-heading"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Award className="w-8 h-8 text-luxury-gold" aria-hidden="true" />
              <h1 id="certifications-heading" className="text-4xl font-display font-bold text-luxury-light">
                Professional Certifications
              </h1>
            </div>
            <p className="text-xl text-luxury-gray max-w-3xl mx-auto">
              Trusted by Fortune 500 companies worldwide. Our elite certifications and 
              industry recognition demonstrate our commitment to excellence, security, and innovation.
            </p>
          </motion.header>

          {/* Certifications Grid */}
          <motion.main
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            role="region"
            aria-labelledby="certifications-heading"
          >
            {certifications.map((cert, index) => (
              <motion.article
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`p-6 rounded-2xl border ${cert.borderColor} ${cert.bgColor} backdrop-blur-sm hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-luxury-gold focus-within:ring-opacity-50`}
                tabIndex={0}
                role="article"
                aria-labelledby={`cert-${cert.id}-title`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${cert.bgColor}`}>
                    <cert.icon className={`w-6 h-6 ${cert.color}`} aria-hidden="true" />
                  </div>
                  <span className="text-xs font-medium text-luxury-gray bg-luxury-dark/50 px-2 py-1 rounded-full">
                    {cert.category}
                  </span>
                </div>
                
                <h2 id={`cert-${cert.id}-title`} className="text-xl font-display font-bold text-luxury-light mb-2">
                  {cert.name}
                </h2>
                <p className="text-luxury-gray text-sm mb-3">
                  {cert.description}
                </p>
                <p className="text-xs text-luxury-gold font-medium">
                  Issued by: {cert.issuer}
                </p>
              </motion.article>
            ))}
          </motion.main>

          {/* Achievements */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8"
            aria-labelledby="achievements-heading"
          >
            <header className="text-center mb-8">
              <h2 id="achievements-heading" className="text-2xl font-display font-bold text-luxury-light mb-2">
                Elite Achievements
              </h2>
              <p className="text-luxury-gray">
                Proven track record of excellence and innovation
              </p>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6" role="list" aria-label="Achievement statistics">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                  role="listitem"
                  tabIndex={0}
                >
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <achievement.icon 
                      className={`w-6 h-6 ${achievement.color} group-hover:scale-110 transition-transform duration-300`} 
                      aria-hidden="true" 
                    />
                    <div className="text-3xl font-display font-bold text-luxury-light group-hover:text-luxury-gold transition-colors duration-300">
                      {achievement.number}
                    </div>
                  </div>
                  <div className="text-sm text-luxury-gray group-hover:text-luxury-gold transition-colors duration-300">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Trust Indicators */}
          <motion.footer
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center"
            aria-label="Trust indicators and credentials"
          >
            <div className="flex items-center justify-center space-x-8 flex-wrap" role="list">
              <div className="flex items-center space-x-2" role="listitem">
                <Target className="w-5 h-5 text-luxury-gold" aria-hidden="true" />
                <span className="text-luxury-gray">Fortune 500 Trusted</span>
              </div>
              <div className="flex items-center space-x-2" role="listitem">
                <TrendingUp className="w-5 h-5 text-luxury-gold" aria-hidden="true" />
                <span className="text-luxury-gray">Industry Leader</span>
              </div>
              <div className="flex items-center space-x-2" role="listitem">
                <Shield className="w-5 h-5 text-luxury-gold" aria-hidden="true" />
                <span className="text-luxury-gray">Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2" role="listitem">
                <Crown className="w-5 h-5 text-luxury-gold" aria-hidden="true" />
                <span className="text-luxury-gray">Elite Service</span>
              </div>
            </div>
          </motion.footer>
        </div>
      </section>
    </>
  );
});

Certifications.displayName = 'Certifications';

export default Certifications;

