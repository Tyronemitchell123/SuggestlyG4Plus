import Stripe from 'stripe';

function isProd() {
  const env = (process.env.NODE_ENV || process.env.VERCEL_ENV || process.env.ENV || '').toLowerCase();
  return env === 'production';
}

function isPlaceholder(v?: string | null) {
  if (!v) return true;
  const val = v.trim().toLowerCase();
  return val === '' || val === 'sk_test_xxx' || val === 'whsec_xxx' || val === 'placeholder' || val === 'your-key-here';
}

const secret = process.env.STRIPE_SECRET_KEY || '';

// Provide a safe fallback for dev mode
let stripe: Stripe;
if (!secret || isPlaceholder(secret)) {
  if (isProd()) {
    throw new Error('Missing or placeholder Stripe secret key in production. Set a real secret in environment.');
  }
  // Create a stub for dev mode with placeholders
  stripe = new Stripe('sk_test_xxx', { apiVersion: '2024-06-20' });
} else {
  stripe = new Stripe(secret, { apiVersion: '2024-06-20' });
}

export { stripe };