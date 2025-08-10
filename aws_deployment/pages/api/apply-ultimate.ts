import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, company, netWorth, experience, objectives } = req.body;

    // Validate required fields
    if (!name || !email || !netWorth || !experience || !objectives) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create email content
    const emailContent = `
New Ultimate Tier Application

Name: ${name}
Email: ${email}
Company: ${company || 'Not specified'}
Net Worth Range: ${netWorth}
Investment Experience: ${experience} years

Investment Objectives:
${objectives}

Tier: Ultimate (£100,000/year)
Submission Time: ${new Date().toISOString()}
IP Address: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}
    `;

    // In a real implementation, you would send this email
    // For now, we'll just log it and return success
    console.log('Ultimate Application:', emailContent);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.status(200).json({ 
      message: 'Application submitted successfully',
      tier: 'Ultimate',
      responseTime: '6 hours'
    });

  } catch (error) {
    console.error('Ultimate application error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
