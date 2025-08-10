import type { NextApiRequest, NextApiResponse } from 'next';

type ApplicationData = {
  name: string;
  email: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message }: ApplicationData = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, message' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Here you would typically:
    // 1. Store in database
    // 2. Send email notifications
    // 3. Log the application
    // 4. Integrate with CRM

    // For now, we'll simulate a successful submission
    console.log('Aurum Private Application:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      source: 'Aurum Private Website'
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return success response
    res.status(200).json({ 
      success: true,
      message: 'Application submitted successfully',
      applicationId: `AP-${Date.now()}`
    });

  } catch (error) {
    console.error('Error processing Aurum Private application:', error);
    res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
}
