import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';

export const config = { api: { bodyParser: false } };

function isProd() {
  const env = (process.env.NODE_ENV || process.env.VERCEL_ENV || process.env.ENV || '').toLowerCase();
  return env === 'production';
}

function isPlaceholder(v?: string | null) {
  if (!v) return true;
  const val = v.trim().toLowerCase();
  return val === '' || val === 'sk_test_xxx' || val === 'whsec_xxx' || val === 'placeholder' || val === 'your-key-here';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const secret = process.env.STRIPE_SECRET_KEY || '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  const devMode = !isProd();
  if (devMode && (isPlaceholder(secret) || isPlaceholder(webhookSecret))) {
    // Graceful no-op in dev
    return res.status(200).json({ received: true, dev: true, reason: 'Stripe secrets missing/placeholders' });
  }

  if (!secret || !webhookSecret) {
    // In prod, reject missing config
    return res.status(400).send('Missing Stripe configuration');
  }

  const stripe = new Stripe(secret, { apiVersion: '2024-06-20' });

  const sig = req.headers['stripe-signature'];
  if (!sig) return res.status(400).send('Missing Stripe signature header');

  let event: Stripe.Event;
  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig as string, webhookSecret);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      // TODO: Handle success
      break;
    default:
      break;
  }

  return res.status(200).json({ received: true });
}


