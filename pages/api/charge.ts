import type { NextApiRequest, NextApiResponse } from 'next';
// import { stripe } from '../../lib/stripe'; // Commented out until stripe is properly configured

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  // Stripe functionality temporarily disabled
  return res.status(503).json({ error: 'Payment processing temporarily unavailable' });

  // try {
  //   const { amount, currency = 'gbp' } = req.body as { amount?: number; currency?: string };
  //   if (!amount || amount < 1) {
  //     return res.status(400).json({ error: 'Invalid amount' });
  //   }

  //   const paymentIntent = await stripe.paymentIntents.create({ amount, currency });
  //   return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  // } catch (err: any) {
  //   return res.status(500).json({ error: err.message || 'Stripe error' });
  // }
}


