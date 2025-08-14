import type { NextApiRequest, NextApiResponse } from 'next';
// import { stripe } from '../../lib/stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  // Temporarily disabled for development
  return res.status(501).json({ error: 'Meter events temporarily disabled' });

  /*
  try {
    const {
      eventName,
      customerId,
      value = 1,
      timestamp, // optional seconds since epoch
    } = req.body as {
      eventName: string;
      customerId: string;
      value?: number;
      timestamp?: number;
    };

    if (!eventName || !customerId) {
      return res.status(400).json({ error: 'Missing eventName or customerId' });
    }

    const ts = typeof timestamp === 'number' ? timestamp : Math.floor(Date.now() / 1000);

    const created = await stripe.billing.meterEvents.create({
      event_name: eventName,
      timestamp: ts,
      payload: {
        stripe_customer_id: customerId,
        value: String(value),
      },
    });

    return res.status(200).json({ created });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Stripe meter event error' });
  }
  */
}


