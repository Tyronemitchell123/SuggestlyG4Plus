import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Clock, Send, Shield, Crown, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Consultation",
      description: "Direct access to our AI strategists",
      contact: "tyrone.mitchell76@hotmail.com",
      response: "Within 2 hours",
      color: "from-blue-600 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Priority Hotline",
      description: "24/7 executive support line",
      contact: "+1 (555) ELITE-AI",
      response: "Immediate",
      color: "from-green-600 to-emerald-500"
    },
    {
      icon: MessageSquare,
      title: "Secure Portal",
      description: "Confidential client portal access",
      contact: "portal.suggestlyelite.io",
      response: "Real-time",
      color: "from-purple-600 to-pink-500"
    }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Create email content
      const subject = `🌟 SUGGESTLY ELITE Consultation Request - ${data.inquiryType}`;
      const body = `
🎯 NEW ELITE CONSULTATION REQUEST

CONTACT INFORMATION:
• Name: ${data.firstName} ${data.lastName}
• Email: ${data.email}
• Phone: ${data.phone}
• Company: ${data.company}
• Position: ${data.position}
• Annual Revenue: ${data.revenue}

INQUIRY DETAILS:
• Type: ${data.inquiryType}
• Priority: ${data.priority}
• Timeline: ${data.timeline}

BUSINESS REQUIREMENTS:
${data.requirements}

ADDITIONAL INFORMATION:
${data.additionalInfo}

MARKETING OPT-IN: ${data.marketing ? 'Yes' : 'No'}

---
SUGGESTLY ELITE - Advanced AI Platform
Contact: tyrone.mitchell76@hotmail.com
      `;

      // Create mailto link
      const mailtoLink = `mailto:tyrone.mitchell76@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Show success message
      toast.success('Consultation request submitted successfully! Opening email client...');

      // Open email client
      setTimeout(() => {
        window.open(mailtoLink);
      }, 1000);

      // Reset form
      reset();

    } catch (error) {
      toast.error('Error submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-luxury-gradient relative overflow-hidden">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8 hover:border-luxury-gold/40 transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mb-6`}>
                <method.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-luxury-light mb-2">
                {method.title}
              </h3>
              <p className="text-luxury-gray mb-4">
                {method.description}
              </p>
              <div className="space-y-2">
                <p className="text-luxury-gold font-semibold">
                  {method.contact}
                </p>
                <p className="text-luxury-gray text-sm">
                  Response: {method.response}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

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
                Complete the form below for a confidential consultation with our AI strategists
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    First Name *
                  </label>
                  <input
                    {...register('firstName', { required: 'First name is required' })}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Last Name *
                  </label>
                  <input
                    {...register('lastName', { required: 'Last name is required' })}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

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
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="your.email@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Company *
                  </label>
                  <input
                    {...register('company', { required: 'Company is required' })}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="Your company name"
                  />
                  {errors.company && (
                    <p className="text-red-400 text-sm mt-1">{errors.company.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Position *
                  </label>
                  <input
                    {...register('position', { required: 'Position is required' })}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="Your position/title"
                  />
                  {errors.position && (
                    <p className="text-red-400 text-sm mt-1">{errors.position.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    {...register('inquiryType', { required: 'Inquiry type is required' })}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light focus:border-luxury-gold focus:outline-none transition-colors"
                  >
                    <option value="">Select inquiry type</option>
                    <option value="AI Strategy Consultation">AI Strategy Consultation</option>
                    <option value="Custom AI Development">Custom AI Development</option>
                    <option value="Enterprise Integration">Enterprise Integration</option>
                    <option value="Quantum AI Solutions">Quantum AI Solutions</option>
                    <option value="Executive Advisory">Executive Advisory</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.inquiryType && (
                    <p className="text-red-400 text-sm mt-1">{errors.inquiryType.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Priority Level
                  </label>
                  <select
                    {...register('priority')}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light focus:border-luxury-gold focus:outline-none transition-colors"
                  >
                    <option value="Standard">Standard</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Timeline
                  </label>
                  <select
                    {...register('timeline')}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light focus:border-luxury-gold focus:outline-none transition-colors"
                  >
                    <option value="Flexible">Flexible</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6+ months">6+ months</option>
                    <option value="ASAP">ASAP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-luxury-light font-semibold mb-2">
                  Annual Revenue
                </label>
                <select
                  {...register('revenue')}
                  className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light focus:border-luxury-gold focus:outline-none transition-colors"
                >
                  <option value="">Select revenue range</option>
                  <option value="Under $1M">Under $1M</option>
                  <option value="$1M - $10M">$1M - $10M</option>
                  <option value="$10M - $100M">$10M - $100M</option>
                  <option value="$100M - $1B">$100M - $1B</option>
                  <option value="$1B+">$1B+</option>
                </select>
              </div>

              <div>
                <label className="block text-luxury-light font-semibold mb-2">
                  Business Requirements *
                </label>
                <textarea
                  {...register('requirements', { required: 'Business requirements are required' })}
                  rows={4}
                  className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors resize-none"
                  placeholder="Describe your business requirements and objectives..."
                />
                {errors.requirements && (
                  <p className="text-red-400 text-sm mt-1">{errors.requirements.message}</p>
                )}
              </div>

              <div>
                <label className="block text-luxury-light font-semibold mb-2">
                  Additional Information
                </label>
                <textarea
                  {...register('additionalInfo')}
                  rows={3}
                  className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors resize-none"
                  placeholder="Any additional information or specific questions..."
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  {...register('marketing')}
                  type="checkbox"
                  id="marketing"
                  className="w-4 h-4 text-luxury-gold bg-luxury-darker border-luxury-gold/30 rounded focus:ring-luxury-gold focus:ring-2"
                />
                <label htmlFor="marketing" className="text-luxury-gray text-sm">
                  I would like to receive updates about SUGGESTLY ELITE services and innovations
                </label>
              </div>

              <div className="flex items-center justify-center space-x-4 pt-6">
                <Shield className="w-5 h-5 text-luxury-gold" />
                <span className="text-luxury-gray text-sm">
                  All information is encrypted and protected by bank-grade security protocols
                </span>
              </div>

              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-luxury-gold to-yellow-500 text-black px-12 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Request Elite Consultation
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
