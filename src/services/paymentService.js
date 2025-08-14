import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export const paymentService = {
  // Initialize payment system
  async initializePayment() {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }
      return { success: true, stripe };
    } catch (error) {
      console.error('Payment initialization error:', error);
      return { success: false, error: error.message };
    }
  },

  // Create payment intent for a plan
  async createPaymentIntent(plan, clientData) {
    try {
      // In production, this would call your backend API
      // For now, we'll simulate the payment intent creation
      const paymentIntent = {
        id: 'pi_' + Math.random().toString(36).substr(2, 9),
        client_secret: 'pi_' + Math.random().toString(36).substr(2, 9) + '_secret_' + Math.random().toString(36).substr(2, 9),
        amount: this.calculateAmount(plan.price),
        currency: 'usd',
        status: 'requires_payment_method'
      };

      return {
        success: true,
        paymentIntent
      };
    } catch (error) {
      console.error('Payment intent creation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Process payment with Stripe
  async processPayment(paymentMethod, paymentIntent, clientData) {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe not initialized');
      }

      // Confirm the payment
      const { error, paymentIntent: confirmedIntent } = await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      // Simulate successful payment processing
      const transaction = {
        id: confirmedIntent.id,
        amount: confirmedIntent.amount / 100, // Convert from cents
        currency: confirmedIntent.currency,
        status: confirmedIntent.status,
        paymentMethod: paymentMethod.type,
        clientData,
        timestamp: new Date().toISOString()
      };

      return {
        success: true,
        transaction,
        paymentIntent: confirmedIntent
      };
    } catch (error) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Create subscription
  async createSubscription(plan, clientData, paymentMethod) {
    try {
      // In production, this would call your backend API
      const subscription = {
        id: 'sub_' + Math.random().toString(36).substr(2, 9),
        status: 'active',
        plan: plan.title,
        amount: plan.price,
        currency: 'usd',
        interval: 'month',
        clientData,
        paymentMethod,
        createdAt: new Date().toISOString(),
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      };

      return {
        success: true,
        subscription
      };
    } catch (error) {
      console.error('Subscription creation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Calculate amount in cents
  calculateAmount(price) {
    // Remove currency symbols and convert to cents
    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
    return Math.round(numericPrice * 100);
  },

  // Validate payment method
  validatePaymentMethod(paymentMethod) {
    const errors = [];

    if (!paymentMethod.cardNumber || paymentMethod.cardNumber.length < 13) {
      errors.push('Invalid card number');
    }

    if (!paymentMethod.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentMethod.expiryDate)) {
      errors.push('Invalid expiry date (MM/YY format)');
    }

    if (!paymentMethod.cvv || paymentMethod.cvv.length < 3) {
      errors.push('Invalid CVV');
    }

    if (!paymentMethod.cardholderName) {
      errors.push('Cardholder name is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Format card number for display
  formatCardNumber(cardNumber) {
    const v = cardNumber.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
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
  },

  // Format expiry date
  formatExpiryDate(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  },

  // Get card type from number
  getCardType(cardNumber) {
    const number = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(number)) return 'visa';
    if (/^5[1-5]/.test(number)) return 'mastercard';
    if (/^3[47]/.test(number)) return 'amex';
    if (/^6/.test(number)) return 'discover';
    
    return 'unknown';
  },

  // Generate test payment methods for development
  generateTestPaymentMethod() {
    return {
      cardNumber: '4242 4242 4242 4242',
      expiryDate: '12/25',
      cvv: '123',
      cardholderName: 'Test User',
      type: 'visa'
    };
  },

  // Simulate payment processing for development
  async simulatePayment(plan, clientData) {
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const transaction = {
        id: 'TXN_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        amount: parseFloat(plan.price.replace(/[^0-9.]/g, '')),
        currency: 'USD',
        status: 'completed',
        paymentMethod: 'card',
        plan: plan.title,
        clientData,
        timestamp: new Date().toISOString()
      };

      return {
        success: true,
        transaction
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};
