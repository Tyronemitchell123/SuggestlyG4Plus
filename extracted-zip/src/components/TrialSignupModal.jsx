import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  User,
  Building,
  Phone,
  Globe,
  Shield,
  CheckCircle,
} from 'lucide-react';
import {
  sendTrialSignupEmail,
  sendTrialCredentialsEmail,
} from '../services/emailService';

const TrialSignupModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    website: '',
    industry: '',
    companySize: '',
    useCase: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send trial signup email
      const signupResult = await sendTrialSignupEmail(formData);

      if (signupResult.success) {
        // Send trial credentials email
        const credentialsResult = await sendTrialCredentialsEmail(
          formData.email,
          signupResult.credentials
        );

        if (credentialsResult.success) {
          // Call the onSubmit prop with form data
          if (onSubmit) {
            onSubmit(formData);
          }

          // Show success and close modal
          setStep(3);
          setTimeout(() => {
            onClose();
            setStep(1);
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              company: '',
              phone: '',
              website: '',
              industry: '',
              companySize: '',
              useCase: '',
            });
          }, 3000);
        } else {
          throw new Error('Failed to send trial credentials');
        }
      } else {
        throw new Error('Failed to process trial signup');
      }
    } catch (error) {
      console.error('Trial signup error:', error);
      // You could show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (
      step === 1 &&
      formData.firstName &&
      formData.lastName &&
      formData.email
    ) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const isStep1Valid =
    formData.firstName && formData.lastName && formData.email;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-luxury-darker border border-luxury-gold/20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-luxury-light">
                    Start Your Free Trial
                  </h2>
                  <p className="text-luxury-gray text-sm">
                    No credit card required • 7-day full access
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-luxury-gray hover:text-luxury-gold transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center space-x-2 ${step >= 1 ? 'text-luxury-gold' : 'text-luxury-gray'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step >= 1
                        ? 'bg-luxury-gold text-black'
                        : 'bg-luxury-gray/20 text-luxury-gray'
                    }`}
                  >
                    1
                  </div>
                  <span className="text-sm font-medium">Basic Info</span>
                </div>
                <div
                  className={`w-8 h-1 ${step >= 2 ? 'bg-luxury-gold' : 'bg-luxury-gray/20'}`}
                ></div>
                <div
                  className={`flex items-center space-x-2 ${step >= 2 ? 'text-luxury-gold' : 'text-luxury-gray'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step >= 2
                        ? 'bg-luxury-gold text-black'
                        : 'bg-luxury-gray/20 text-luxury-gray'
                    }`}
                  >
                    2
                  </div>
                  <span className="text-sm font-medium">Company Details</span>
                </div>
              </div>
            </div>

            {/* Step 1: Basic Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-display font-bold text-luxury-light mb-2">
                    Tell us about yourself
                  </h3>
                  <p className="text-luxury-gray">
                    We'll use this information to personalize your trial
                    experience.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-luxury-light font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/20 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold/40 focus:outline-none transition-colors duration-300"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-luxury-light font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/20 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold/40 focus:outline-none transition-colors duration-300"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-luxury-light font-medium mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-gray" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-luxury-darker border border-luxury-gold/20 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold/40 focus:outline-none transition-colors duration-300"
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>
                  <p className="text-luxury-gray text-sm mt-2">
                    We'll send your trial access credentials to this email.
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={nextStep}
                    disabled={!isStep1Valid}
                    className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                      isStep1Valid
                        ? 'bg-gradient-to-r from-luxury-gold to-yellow-500 text-black hover:scale-105'
                        : 'bg-luxury-gray/20 text-luxury-gray cursor-not-allowed'
                    }`}
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Company Details */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-display font-bold text-luxury-light mb-2">
                    Company Information
                  </h3>
                  <p className="text-luxury-gray">
                    Help us customize your trial experience for your business
                    needs.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-luxury-light font-medium mb-2">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-gray" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-luxury-darker border border-luxury-gold/20 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold/40 focus:outline-none transition-colors duration-300"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-luxury-light font-medium mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-gray" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 bg-luxury-darker border border-luxury-gold/20 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold/40 focus:outline-none transition-colors duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-luxury-light font-medium mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luxury-gray" />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-luxury-darker border border-luxury-gold/20 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold/40 focus:outline-none transition-colors duration-300"
                      placeholder="https://yourcompany.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-luxury-light font-medium mb-2">
                      Industry
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/20 rounded-xl text-luxury-light focus:border-luxury-gold/40 focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="consulting">Consulting</option>
                      <option value="education">Education</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-luxury-light font-medium mb-2">
                      Company Size
                    </label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/20 rounded-xl text-luxury-light focus:border-luxury-gold/40 focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-luxury-light font-medium mb-2">
                    Primary Use Case
                  </label>
                  <select
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/20 rounded-xl text-luxury-light focus:border-luxury-gold/40 focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select primary use case</option>
                    <option value="content-generation">
                      AI Content Generation
                    </option>
                    <option value="data-analytics">Data Analytics</option>
                    <option value="automation">Process Automation</option>
                    <option value="customer-support">Customer Support</option>
                    <option value="research">Research & Development</option>
                    <option value="marketing">Marketing & Sales</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={prevStep}
                    className="px-8 py-3 border border-luxury-gold/30 text-luxury-gold rounded-xl font-bold hover:bg-luxury-gold/10 transition-colors duration-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2 ${
                      isSubmitting
                        ? 'bg-luxury-gray/20 text-luxury-gray cursor-not-allowed'
                        : 'bg-gradient-to-r from-luxury-gold to-yellow-500 text-black hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        <span>Start Free Trial</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-luxury-light mb-4">
                  Trial Activated Successfully!
                </h3>
                <p className="text-luxury-gray mb-6">
                  We've sent your trial access credentials to{' '}
                  <strong>{formData.email}</strong>. Check your inbox and spam
                  folder for login details.
                </p>
                <div className="bg-luxury-gold/10 border border-luxury-gold/20 rounded-xl p-4 mb-6">
                  <h4 className="text-luxury-gold font-semibold mb-2">
                    What's Next?
                  </h4>
                  <ul className="text-luxury-gray text-sm space-y-1 text-left">
                    <li>• Check your email for login credentials</li>
                    <li>• Access your 7-day free trial immediately</li>
                    <li>• Explore all premium features</li>
                    <li>• Schedule a demo with our team</li>
                  </ul>
                </div>
                <p className="text-luxury-gray text-sm">
                  This modal will close automatically in a few seconds...
                </p>
              </motion.div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-luxury-gold/10">
              <div className="flex items-center justify-center space-x-6 text-sm text-luxury-gray">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Instant Access</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrialSignupModal;
