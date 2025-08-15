import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Building, User, MessageSquare, Send, Crown } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ConsultationModal = ({ plan, isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Create email content
      const subject = `🌟 SUGGESTLY ELITE Consultation Request - ${plan?.title || 'Custom Solution'}`;
      const body = `
🎯 NEW ELITE CONSULTATION REQUEST

PLAN DETAILS:
• Plan: ${plan?.title || 'Custom Solution'}
• Price: ${plan?.price || 'Custom Pricing'}

CONTACT INFORMATION:
• Name: ${data.firstName} ${data.lastName}
• Email: ${data.email}
• Phone: ${data.phone}
• Company: ${data.company}
• Position: ${data.position}
• Annual Revenue: ${data.revenue}

BUSINESS REQUIREMENTS:
${data.requirements}

MARKETING OPT-IN: ${data.marketing ? 'Yes' : 'No'}

---
SUGGESTLY ELITE - Advanced AI Platform
Contact: tyrone.mitchell76@hotmail.com
      `;

      // Create mailto link
      const mailtoLink = `mailto:tyrone.mitchell76@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open email client
      window.open(mailtoLink);
      
      // Show success message
      toast.success('🎉 Consultation request submitted! Our AI strategists will contact you within 24 hours.');
      
      // Reset form and close modal
      reset();
      onClose();
      
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-luxury-darker border border-luxury-gold/30 rounded-2xl shadow-luxury max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-8 border-b border-luxury-gold/20">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-luxury-gray hover:text-luxury-gold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-3xl font-display font-bold text-luxury-gold mb-2">
                Request Elite Consultation
              </h2>
              <p className="text-luxury-gray">
                Interested in the <span className="font-bold text-luxury-gold">{plan?.title || 'Custom Solution'}</span> plan? 
                Our AI strategists will contact you within 24 hours.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-luxury-gray text-sm font-medium mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  First Name *
                </label>
                <input
                  {...register("firstName", { required: "First name is required" })}
                  className="w-full px-4 py-3 bg-luxury-dark border border-luxury-gold/20 rounded-lg text-luxury-light placeholder-luxury-gray focus:outline-none focus:border-luxury-gold/50 transition-colors"
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-luxury-gray text-sm font-medium mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Last Name *
                </label>
                <input
                  {...register("lastName", { required: "Last name is required" })}
                  className="w-full px-4 py-3 bg-luxury-dark border border-luxury-gold/20 rounded-lg text-luxury-light placeholder-luxury-gray focus:outline-none focus:border-luxury-gold/50 transition-colors"
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-luxury-gray text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address *
                </label>
                <input
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  type="email"
                  className="w-full px-4 py-3 bg-luxury-dark border border-luxury-gold/20 rounded-lg text-luxury-light placeholder-luxury-gray focus:outline-none focus:border-luxury-gold/50 transition-colors"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-luxury-gray text-sm font-medium mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  {...register("phone", { required: "Phone number is required" })}
                  type="tel"
                  className="w-full px-4 py-3 bg-luxury-dark border border-luxury-gold/20 rounded-lg text-luxury-light placeholder-luxury-gray focus:outline-none focus:border-luxury-gold/50 transition-colors"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Company Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-luxury-gray text-sm font-medium mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Company Name *
                </label>
                <input
                  {...register("company", { required: "Company name is required" })}
                  className="w-full px-4 py-3 bg-luxury-dark border border-luxury-gold/20 rounded-lg text-luxury-light placeholder-luxury-gray focus:outline-none focus:border-luxury-gold/50 transition-colors"
                  placeholder="Enter your company name"
                />
                {errors.company && (
                  <p className="text-red-400 text-sm mt-1">{errors.company.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-luxury-gray text-sm font-medium mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Position *
                </label>
                <input
                  {...register("position", { required: "Position is required" })}
                  className="w-full px-4 py-3 bg-luxury-dark border border-luxury-gold/20 rounded-lg text-luxury-light placeholder-luxury-gray focus:outline-none focus:border-luxury-gold/50 transition-colors"
                  placeholder="Enter your position"
                />
                {errors.position && (
                  <p className="text-red-400 text-sm mt-1">{errors.position.message}</p>
                )}
              </div>
            </div>

            {/* Revenue */}
            <div>
              <label className="block text-luxury-gray text-sm font-medium mb-2">
                Annual Revenue *
              </label>
              <select
                {...register("revenue", { required: "Revenue range is required" })}
                className="w-full px-4 py-3 bg-luxury-dark border border-luxury-gold/20 rounded-lg text-luxury-light focus:outline-none focus:border-luxury-gold/50 transition-colors"
              >
                <option value="">Select Revenue Range</option>
                <option value="Under $1M">Under $1M</option>
                <option value="$1M - $10M">$1M - $10M</option>
                <option value="$10M - $50M">$10M - $50M</option>
                <option value="$50M - $100M">$50M - $100M</option>
                <option value="$100M - $500M">$100M - $500M</option>
                <option value="$500M - $1B">$500M - $1B</option>
                <option value="Over $1B">Over $1B</option>
              </select>
              {errors.revenue && (
                <p className="text-red-400 text-sm mt-1">{errors.revenue.message}</p>
              )}
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-luxury-gray text-sm font-medium mb-2">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Business Requirements *
              </label>
              <textarea
                {...register("requirements", { required: "Business requirements are required" })}
                rows={4}
                className="w-full px-4 py-3 bg-luxury-dark border border-luxury-gold/20 rounded-lg text-luxury-light placeholder-luxury-gray focus:outline-none focus:border-luxury-gold/50 transition-colors resize-none"
                placeholder="Describe your AI transformation goals and specific requirements..."
              />
              {errors.requirements && (
                <p className="text-red-400 text-sm mt-1">{errors.requirements.message}</p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  {...register("terms", { required: "You must agree to the terms" })}
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-luxury-gold bg-luxury-dark border-luxury-gold/20 rounded focus:ring-luxury-gold/50"
                />
                <span className="text-luxury-gray text-sm">
                  I agree to the <span className="text-luxury-gold hover:underline cursor-pointer">Terms of Service</span> and <span className="text-luxury-gold hover:underline cursor-pointer">Privacy Policy</span> *
                </span>
              </label>
              {errors.terms && (
                <p className="text-red-400 text-sm">{errors.terms.message}</p>
              )}

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  {...register("marketing")}
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-luxury-gold bg-luxury-dark border-luxury-gold/20 rounded focus:ring-luxury-gold/50"
                />
                <span className="text-luxury-gray text-sm">
                  I would like to receive updates about new AI features and exclusive offers
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-luxury-gold to-yellow-500 text-black font-bold py-4 px-6 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Send className="w-5 h-5 mr-2" />
                  Submit Consultation Request
                </span>
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConsultationModal;
