import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripePayment = ({ plan, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const plans = {
    basic: {
      name: 'Basic Elite',
      price: 99,
      features: [
        'AI Wealth Analysis',
        'Portfolio Optimization',
        'Monthly Reports',
        'Email Support',
      ],
    },
    professional: {
      name: 'Professional Elite',
      price: 299,
      features: [
        'Everything in Basic',
        'Real-time AI Advisory',
        'Custom Investment Strategies',
        'Priority Support',
        'Quarterly Consultations',
      ],
    },
    enterprise: {
      name: 'Enterprise Elite',
      price: 'Custom',
      features: [
        'Everything in Professional',
        'Dedicated AI Advisor',
        'Custom AI Models',
        '24/7 Support',
        'Weekly Consultations',
        'Exclusive Investment Opportunities',
      ],
    },
  };

  const handleSubscribe = async planType => {
    setLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: planType,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/pricing`,
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (err) {
      setError(err.message);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Elite Plan
        </h2>
        <p className="text-xl text-gray-600">
          Unlock the power of AI-driven wealth management
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {Object.entries(plans).map(([key, planData]) => (
          <motion.div
            key={key}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 relative"
          >
            {key === 'professional' && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {planData.name}
              </h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                ${planData.price}
                {typeof planData.price === 'number' && (
                  <span className="text-lg text-gray-500">/month</span>
                )}
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {planData.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(key)}
              disabled={loading}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                key === 'professional'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading
                ? 'Processing...'
                : key === 'enterprise'
                  ? 'Contact Sales'
                  : 'Subscribe Now'}
            </button>
          </motion.div>
        ))}
      </div>

      {error && (
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-gray-600">
          All plans include a 30-day money-back guarantee
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Need help choosing? Contact our elite advisors
        </p>
      </div>
    </div>
  );
};

export default StripePayment;
