import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Lock,
  Shield,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';

const PaymentProcessor = ({
  amount,
  currency = 'USD',
  onSuccess,
  onError,
  onCancel,
  showCardDetails = true,
  showSecurityInfo = true,
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('card');

  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal', icon: CreditCard },
    { id: 'crypto', name: 'Cryptocurrency', icon: CreditCard },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }

    if (!cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!cardholderName.trim()) {
      newErrors.cardholderName = 'Please enter the cardholder name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = value => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
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

  const formatExpiryDate = value => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setErrors({});

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate success (90% success rate)
      if (Math.random() > 0.1) {
        onSuccess &&
          onSuccess({
            transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
            amount,
            currency,
            timestamp: new Date().toISOString(),
          });
      } else {
        throw new Error('Payment failed. Please try again.');
      }
    } catch (error) {
      setErrors({ general: error.message });
      onError && onError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    onCancel && onCancel();
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Secure Payment</h2>
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-white/80" />
            <Shield className="w-5 h-5 text-white/80" />
          </div>
        </div>
        <p className="text-white/80 text-sm mt-1">
          Your payment information is encrypted and secure
        </p>
      </div>

      {/* Payment Method Selection */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Payment Method
        </h3>
        <div className="space-y-2">
          {paymentMethods.map(method => {
            const Icon = method.icon;
            return (
              <motion.button
                key={method.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-200 ${
                  paymentMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    paymentMethod === method.id
                      ? 'text-blue-500'
                      : 'text-gray-400'
                  }`}
                />
                <span
                  className={`font-medium ${
                    paymentMethod === method.id
                      ? 'text-blue-600'
                      : 'text-gray-700'
                  }`}
                >
                  {method.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="p-6">
        {paymentMethod === 'card' && showCardDetails && (
          <div className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={e =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
                  placeholder="1234 5678 9012 3456"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  maxLength="19"
                />
                <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.cardNumber}
                </p>
              )}
            </div>

            {/* Cardholder Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                value={cardholderName}
                onChange={e => setCardholderName(e.target.value)}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.cardholderName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.cardholderName && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.cardholderName}
                </p>
              )}
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={e =>
                    setExpiryDate(formatExpiryDate(e.target.value))
                  }
                  placeholder="MM/YY"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  maxLength="5"
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.expiryDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <div className="relative">
                  <input
                    type={showCvv ? 'text' : 'password'}
                    value={cvv}
                    onChange={e => setCvv(e.target.value.replace(/\D/g, ''))}
                    placeholder="123"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.cvv ? 'border-red-500' : 'border-gray-300'
                    }`}
                    maxLength="4"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCvv(!showCvv)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showCvv ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.cvv}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Amount Display */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Amount:</span>
            <span className="text-2xl font-bold text-gray-800">
              {currency} {amount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {errors.general}
            </p>
          </div>
        )}

        {/* Security Info */}
        {showSecurityInfo && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-blue-800 text-sm font-medium">
                  Secure Payment
                </p>
                <p className="text-blue-600 text-xs">
                  Your payment is protected by SSL encryption and PCI DSS
                  compliance
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <motion.button
            type="submit"
            disabled={isProcessing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Pay {currency} {amount.toFixed(2)}
              </>
            )}
          </motion.button>

          <motion.button
            type="button"
            onClick={handleCancel}
            disabled={isProcessing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default PaymentProcessor;
