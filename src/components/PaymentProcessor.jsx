import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Crown, 
  Zap, 
  Shield, 
  CreditCard, 
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';

const PaymentProcessor = ({ plan, onSuccess, onCancel }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    companyName: '',
    billingAddress: '',
    city: '',
    country: '',
    zipCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simulate successful payment
      toast.success('Payment processed successfully! Welcome to SUGGESTLY ELITE.');
      
      if (onSuccess) {
        onSuccess({
          plan: plan.name,
          amount: plan.price,
          transactionId: 'TXN_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const securityFeatures = [
    { icon: Shield, text: 'Bank-Grade Encryption' },
    { icon: Lock, text: 'PCI DSS Compliant' },
    { icon: Crown, text: 'Elite Security Protocols' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-luxury-darker border border-luxury-gold/20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-luxury-gold to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-3xl font-display font-bold text-luxury-light mb-2">
            Elite Payment Processing
          </h2>
          <p className="text-luxury-gray">
            Secure payment for {plan.name} - {plan.price}/month
          </p>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-center">
              <feature.icon className="w-5 h-5 text-luxury-gold" />
              <span className="text-luxury-gray text-sm">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Method Selection */}
          <div>
            <label className="block text-luxury-light font-semibold mb-3">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  paymentMethod === 'card'
                    ? 'border-luxury-gold bg-luxury-gold/10'
                    : 'border-luxury-gold/30 hover:border-luxury-gold/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-luxury-gold" />
                  <span className="text-luxury-light font-medium">Credit Card</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('wire')}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  paymentMethod === 'wire'
                    ? 'border-luxury-gold bg-luxury-gold/10'
                    : 'border-luxury-gold/30 hover:border-luxury-gold/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-luxury-gold" />
                  <span className="text-luxury-light font-medium">Wire Transfer</span>
                </div>
              </button>
            </div>
          </div>

          {paymentMethod === 'card' && (
            <>
              {/* Card Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      cardNumber: formatCardNumber(e.target.value)
                    }))}
                    maxLength="19"
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      expiryDate: formatExpiryDate(e.target.value)
                    }))}
                    maxLength="5"
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength="4"
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="123"
                    required
                  />
                </div>
                <div>
                  <label className="block text-luxury-light font-semibold mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <label className="block text-luxury-light font-semibold mb-2">
                  Billing Address
                </label>
                <input
                  type="text"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors mb-4"
                  placeholder="123 Business Street"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="Country"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-luxury-darker border border-luxury-gold/30 rounded-xl text-luxury-light placeholder-luxury-gray focus:border-luxury-gold focus:outline-none transition-colors"
                    placeholder="ZIP Code"
                  />
                </div>
              </div>
            </>
          )}

          {paymentMethod === 'wire' && (
            <div className="bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-xl p-6">
              <h3 className="text-xl font-display font-bold text-luxury-light mb-4">
                Wire Transfer Details
              </h3>
              <div className="space-y-3 text-luxury-gray">
                <p><strong className="text-luxury-light">Bank:</strong> Elite International Bank</p>
                <p><strong className="text-luxury-light">Account:</strong> SUGGESTLY ELITE LLC</p>
                <p><strong className="text-luxury-light">Routing:</strong> 021000021</p>
                <p><strong className="text-luxury-light">Account #:</strong> 9876543210</p>
                <p><strong className="text-luxury-light">SWIFT:</strong> EIBBUS33</p>
                <p><strong className="text-luxury-light">Amount:</strong> {plan.price}</p>
              </div>
              <p className="text-sm text-luxury-gray mt-4">
                Please include your company name as reference. Processing takes 1-3 business days.
              </p>
            </div>
          )}

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              required
              className="w-4 h-4 text-luxury-gold bg-luxury-darker border-luxury-gold/30 rounded focus:ring-luxury-gold focus:ring-2 mt-1"
            />
            <label htmlFor="terms" className="text-luxury-gray text-sm">
              I agree to the <span className="text-luxury-gold cursor-pointer hover:underline">Terms of Service</span> and{' '}
              <span className="text-luxury-gold cursor-pointer hover:underline">Privacy Policy</span>. 
              I authorize SUGGESTLY ELITE to charge my payment method for the selected plan.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-4 border border-luxury-gold/30 text-luxury-gold rounded-xl font-bold hover:bg-luxury-gold/10 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-luxury-gold to-yellow-500 text-black rounded-xl font-bold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <DollarSign className="w-5 h-5 mr-2" />
                  Complete Payment
                </>
              )}
            </button>
          </div>
        </form>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-luxury-gray text-sm">
            <Lock className="w-4 h-4" />
            <span>All payments are encrypted and secure</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentProcessor;
