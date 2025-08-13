import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

export const usePaymentSystem = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    transactions: [],
    subscriptions: [],
    revenue: 0
  });

  const initializePaymentSystem = useCallback(() => {
    // Initialize Stripe if available
    if (typeof window !== 'undefined' && window.Stripe) {
      // Stripe initialization would go here
      console.log('Payment system initialized');
    }
  }, []);

  const processPayment = useCallback(async (paymentDetails) => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const transaction = {
        id: 'TXN_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        amount: paymentDetails.amount,
        currency: paymentDetails.currency || 'USD',
        status: 'completed',
        timestamp: new Date().toISOString(),
        method: paymentDetails.method,
        plan: paymentDetails.plan,
        customer: paymentDetails.customer
      };

      setPaymentData(prev => ({
        ...prev,
        transactions: [...prev.transactions, transaction],
        revenue: prev.revenue + paymentDetails.amount
      }));

      toast.success('Payment processed successfully! Welcome to SUGGESTLY ELITE.');
      
      return { success: true, transaction };
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const createSubscription = useCallback(async (subscriptionDetails) => {
    setIsProcessing(true);
    
    try {
      // Simulate subscription creation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const subscription = {
        id: 'SUB_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        plan: subscriptionDetails.plan,
        amount: subscriptionDetails.amount,
        interval: subscriptionDetails.interval || 'monthly',
        status: 'active',
        startDate: new Date().toISOString(),
        customer: subscriptionDetails.customer,
        features: subscriptionDetails.features || []
      };

      setPaymentData(prev => ({
        ...prev,
        subscriptions: [...prev.subscriptions, subscription]
      }));

      toast.success('Subscription created successfully!');
      
      return { success: true, subscription };
    } catch (error) {
      toast.error('Subscription creation failed. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const cancelSubscription = useCallback(async (subscriptionId) => {
    try {
      // Simulate subscription cancellation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPaymentData(prev => ({
        ...prev,
        subscriptions: prev.subscriptions.map(sub => 
          sub.id === subscriptionId 
            ? { ...sub, status: 'cancelled', endDate: new Date().toISOString() }
            : sub
        )
      }));

      toast.success('Subscription cancelled successfully.');
      return { success: true };
    } catch (error) {
      toast.error('Failed to cancel subscription.');
      return { success: false, error: error.message };
    }
  }, []);

  const getPaymentSummary = useCallback(() => {
    const totalTransactions = paymentData.transactions.length;
    const totalRevenue = paymentData.revenue;
    const activeSubscriptions = paymentData.subscriptions.filter(sub => sub.status === 'active').length;
    const monthlyRecurringRevenue = paymentData.subscriptions
      .filter(sub => sub.status === 'active' && sub.interval === 'monthly')
      .reduce((sum, sub) => sum + sub.amount, 0);

    return {
      totalTransactions,
      totalRevenue: totalRevenue.toFixed(2),
      activeSubscriptions,
      monthlyRecurringRevenue: monthlyRecurringRevenue.toFixed(2)
    };
  }, [paymentData]);

  const validatePaymentMethod = useCallback((paymentMethod) => {
    const errors = [];

    if (paymentMethod.type === 'card') {
      if (!paymentMethod.cardNumber || paymentMethod.cardNumber.replace(/\s/g, '').length < 13) {
        errors.push('Invalid card number');
      }
      if (!paymentMethod.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentMethod.expiryDate)) {
        errors.push('Invalid expiry date (MM/YY)');
      }
      if (!paymentMethod.cvv || paymentMethod.cvv.length < 3) {
        errors.push('Invalid CVV');
      }
      if (!paymentMethod.cardholderName) {
        errors.push('Cardholder name is required');
      }
    }

    if (paymentMethod.type === 'wire') {
      if (!paymentMethod.companyName) {
        errors.push('Company name is required for wire transfer');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }, []);

  const formatCardNumber = useCallback((value) => {
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
  }, []);

  const formatExpiryDate = useCallback((value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  }, []);

  return {
    isProcessing,
    paymentData,
    initializePaymentSystem,
    processPayment,
    createSubscription,
    cancelSubscription,
    getPaymentSummary,
    validatePaymentMethod,
    formatCardNumber,
    formatExpiryDate
  };
};
