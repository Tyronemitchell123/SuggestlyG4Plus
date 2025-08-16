import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Mail,
  Phone,
  Shield,
  Send,
  CheckCircle,
  Crown,
  TrendingUp,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { sendContactEmail } from '../services/emailService';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const watchedValues = watch();

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Consultation',
      description: 'Direct access to our AI strategists',
      contact: 'tyrone.mitchell76@hotmail.com',
      response: 'Within 2 hours',
      color: 'from-blue-600 to-cyan-500',
      features: ['24/7 Support', 'Priority Response', 'Custom Solutions'],
    },
    {
      icon: Phone,
      title: 'Priority Hotline',
      description: '24/7 executive support line',
      contact: '+1 (555) ELITE-AI',
      response: 'Immediate',
      color: 'from-green-600 to-emerald-500',
      features: ['Direct Access', 'Emergency Support', 'VIP Treatment'],
    },
    {
      icon: Shield,
      title: 'Secure Portal',
      description: 'Confidential client portal access',
      contact: 'portal.suggestlyelite.io',
      response: 'Real-time',
      color: 'from-purple-600 to-pink-500',
      features: [
        'Bank-Grade Security',
        'Real-time Updates',
        'Document Sharing',
      ],
    },
  ];

  // Calculate real-time lead score
  const calculateLiveLeadScore = () => {
    let score = 0;

    // Revenue scoring
    const revenueMap = {
      'under-100k': 10,
      '100k-500k': 25,
      '500k-1m': 50,
      '1m-10m': 75,
      '10m-50m': 90,
      '50m+': 100,
    };
    score += revenueMap[watchedValues.revenue] || 0;

    // Priority scoring
    const priorityMap = {
      low: 10,
      medium: 30,
      high: 60,
      urgent: 100,
    };
    score += priorityMap[watchedValues.priority] || 0;

    // Timeline scoring
    const timelineMap = {
      immediate: 100,
      'within-1-month': 80,
      'within-3-months': 60,
      'within-6-months': 40,
      exploring: 20,
    };
    score += timelineMap[watchedValues.timeline] || 0;

    // Inquiry type scoring
    const inquiryMap = {
      'enterprise-ai': 100,
      'multi-site-hosting': 90,
      'quantum-computing': 95,
      'ai-automation': 85,
      consultation: 70,
      general: 50,
    };
    score += inquiryMap[watchedValues.inquiryType] || 0;

    return Math.min(score, 100);
  };

  const liveLeadScore = calculateLiveLeadScore();

  const onSubmit = async data => {
    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      // Add analytics data
      const enhancedData = {
        ...data,
        source: 'website',
        campaign: 'organic',
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
      };

      const result = await sendContactEmail(enhancedData);

      setSubmissionResult(result);

      if (result.success) {
        toast.success('🎯 Elite consultation request submitted successfully!', {
          duration: 5000,
          icon: '🌟',
        });

        // Reset form
        reset();

        // Track conversion
        if (window.gtag) {
          window.gtag('event', 'consultation_request', {
            event_category: 'lead_generation',
            event_label: data.inquiryType,
            value: liveLeadScore,
          });
        }
      } else {
        toast.error(
          'Submission failed. Please try again or contact us directly.'
        );
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLeadScoreColor = score => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getLeadScoreLabel = score => {
    if (score >= 80) return 'Premium Lead';
    if (score >= 60) return 'High-Value Lead';
    if (score >= 40) return 'Qualified Lead';
    return 'Basic Lead';
  };

  return (
    <section
      id="contact"
      className="py-20 bg-luxury-gradient relative overflow-hidden"
    >
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
            Elite <span className="text-luxury-gold">Consultation</span>
          </h2>
          <p className="text-xl text-luxury-gray max-w-3xl mx-auto">
            Connect with our AI strategists for confidential consultations.
            Every interaction is protected by bank-grade security protocols.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8 hover:border-luxury-gold/40 transition-all duration-300 group"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <method.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-luxury-light mb-2">
                {method.title}
              </h3>
              <p className="text-luxury-gray mb-4">{method.description}</p>
              <div className="space-y-2 mb-4">
                <p className="text-luxury-gold font-semibold">
                  {method.contact}
                </p>
                <p className="text-luxury-gray text-sm">
                  Response: {method.response}
                </p>
              </div>
              <div className="space-y-1">
                {method.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 text-sm text-luxury-gray"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lead Score Indicator */}
        {Object.keys(watchedValues).length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto mb-8"
          >
            <div className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <TrendingUp className="w-5 h-5 text-luxury-gold" />
                <span className="text-luxury-gray font-medium">Lead Score</span>
              </div>
              <div
                className={`text-3xl font-display font-bold ${getLeadScoreColor(liveLeadScore)} mb-2`}
              >
                {liveLeadScore}/100
              </div>
              <div className="text-sm text-luxury-gray">
                {getLeadScoreLabel(liveLeadScore)}
              </div>
              <div className="w-full bg-luxury-dark/50 rounded-full h-2 mt-3">
                <div
                  className={`h-full bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-full transition-all duration-500`}
                  style={{ width: `${liveLeadScore}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-3xl font-display font-bold text-luxury-light mb-2">
                Request Elite Consultation
              </h3>
              <p className="text-luxury-gray">
                Complete the form below for a confidential consultation with our
                AI strategists
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    First Name *
                  </label>
                  <input
                    {...register('firstName', {
                      required: 'First name is required',
                    })}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Last Name *
                  </label>
                  <input
                    {...register('lastName', {
                      required: 'Last name is required',
                    })}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    type="email"
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="your.email@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    {...register('phone', {
                      required: 'Phone number is required',
                    })}
                    type="tel"
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Company Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Company Name *
                  </label>
                  <input
                    {...register('company', {
                      required: 'Company name is required',
                    })}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="Your Company Inc."
                  />
                  {errors.company && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.company.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Position/Title *
                  </label>
                  <input
                    {...register('position', {
                      required: 'Position is required',
                    })}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="CEO, CTO, Director, etc."
                  />
                  {errors.position && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.position.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Business Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Annual Revenue *
                  </label>
                  <select
                    {...register('revenue', {
                      required: 'Revenue range is required',
                    })}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light focus:border-luxury-gold focus:outline-none transition-colors"
                  >
                    <option value="">Select revenue range</option>
                    <option value="under-100k">Under $100K</option>
                    <option value="100k-500k">$100K - $500K</option>
                    <option value="500k-1m">$500K - $1M</option>
                    <option value="1m-10m">$1M - $10M</option>
                    <option value="10m-50m">$10M - $50M</option>
                    <option value="50m+">$50M+</option>
                  </select>
                  {errors.revenue && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.revenue.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    {...register('inquiryType', {
                      required: 'Inquiry type is required',
                    })}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light focus:border-luxury-gold focus:outline-none transition-colors"
                  >
                    <option value="">Select inquiry type</option>
                    <option value="enterprise-ai">
                      Enterprise AI Solutions
                    </option>
                    <option value="multi-site-hosting">
                      Multi-Site Hosting
                    </option>
                    <option value="quantum-computing">Quantum Computing</option>
                    <option value="ai-automation">AI Automation</option>
                    <option value="consultation">General Consultation</option>
                    <option value="general">Other</option>
                  </select>
                  {errors.inquiryType && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.inquiryType.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Priority Level *
                  </label>
                  <select
                    {...register('priority', {
                      required: 'Priority level is required',
                    })}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light focus:border-luxury-gold focus:outline-none transition-colors"
                  >
                    <option value="">Select priority</option>
                    <option value="urgent">Urgent (Same day)</option>
                    <option value="high">High (Within 24 hours)</option>
                    <option value="medium">Medium (Within 48 hours)</option>
                    <option value="low">Low (Within 1 week)</option>
                  </select>
                  {errors.priority && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.priority.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-luxury-light font-semibold mb-2">
                  Timeline *
                </label>
                <select
                  {...register('timeline', {
                    required: 'Timeline is required',
                  })}
                  className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light focus:border-luxury-gold focus:outline-none transition-colors"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (This week)</option>
                  <option value="within-1-month">Within 1 month</option>
                  <option value="within-3-months">Within 3 months</option>
                  <option value="within-6-months">Within 6 months</option>
                  <option value="exploring">Just exploring options</option>
                </select>
                {errors.timeline && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.timeline.message}
                  </p>
                )}
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-luxury-light font-semibold mb-2">
                  Business Requirements *
                </label>
                <textarea
                  {...register('requirements', {
                    required: 'Business requirements are required',
                    minLength: {
                      value: 20,
                      message: 'Please provide at least 20 characters',
                    },
                  })}
                  rows={4}
                  className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors resize-none"
                  placeholder="Describe your business requirements, challenges, and goals..."
                />
                {errors.requirements && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.requirements.message}
                  </p>
                )}
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-luxury-light font-semibold mb-2">
                  Additional Information
                </label>
                <textarea
                  {...register('additionalInfo')}
                  rows={3}
                  className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors resize-none"
                  placeholder="Any additional information, specific questions, or special requirements..."
                />
              </div>

              {/* Marketing Opt-in */}
              <div className="flex items-center space-x-3">
                <input
                  {...register('marketing')}
                  type="checkbox"
                  id="marketing"
                  className="w-5 h-5 text-luxury-gold bg-luxury-darker border-luxury-gold/30 rounded focus:ring-luxury-gold focus:ring-2"
                />
                <label htmlFor="marketing" className="text-luxury-gray text-sm">
                  I would like to receive updates about SUGGESTLY ELITE services
                  and industry insights
                </label>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 mx-auto ${
                    isSubmitting || !isValid
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-luxury-gold to-yellow-500 text-black hover:scale-105 hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Elite Consultation Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Submission Result */}
            {submissionResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-green-500/10 border border-green-500/30 rounded-xl"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h4 className="text-lg font-semibold text-luxury-light">
                    Request Submitted Successfully!
                  </h4>
                </div>
                <div className="space-y-2 text-sm text-luxury-gray">
                  <p>
                    <strong>Lead ID:</strong> {submissionResult.leadId}
                  </p>
                  <p>
                    <strong>Lead Score:</strong> {submissionResult.leadScore}
                    /100
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold text-luxury-light mb-2">
                      Next Steps:
                    </p>
                    <ul className="space-y-1">
                      {submissionResult.nextSteps?.map((step, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-luxury-gold rounded-full" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
