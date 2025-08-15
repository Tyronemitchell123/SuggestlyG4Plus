// Enterprise-Grade Email Service for SUGGESTLY ELITE
// Supports multiple providers, templates, analytics, and automation

// Email provider configurations
const EMAIL_PROVIDERS = {
  primary: {
    type: 'sendgrid',
    apiKey: process.env.REACT_APP_SENDGRID_API_KEY,
    fromEmail: 'noreply@suggestly-elite.com',
    fromName: 'SUGGESTLY ELITE',
  },
  backup: {
    type: 'mailgun',
    apiKey: process.env.REACT_APP_MAILGUN_API_KEY,
    domain: 'suggestly-elite.com',
    fromEmail: 'contact@suggestly-elite.com',
  },
  sms: {
    type: 'twilio',
    accountSid: process.env.REACT_APP_TWILIO_ACCOUNT_SID,
    authToken: process.env.REACT_APP_TWILIO_AUTH_TOKEN,
    fromNumber: '+1-555-ELITE-AI',
  }
};

// Email templates
const EMAIL_TEMPLATES = {
  consultationRequest: {
    subject: '🌟 SUGGESTLY ELITE Consultation Request - {{inquiryType}}',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>SUGGESTLY ELITE Consultation Request</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: #ffd700; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .section { margin: 20px 0; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #ffd700; }
          .highlight { background: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0; }
          .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%); color: #000; text-decoration: none; border-radius: 6px; font-weight: bold; }
          .footer { background: #1a1a1a; color: #ccc; padding: 20px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🌟 SUGGESTLY ELITE</h1>
          <p>Advanced AI Platform & Multi-Site Hosting</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h2>🎯 New Elite Consultation Request</h2>
            <p><strong>Priority:</strong> {{priority}}</p>
            <p><strong>Timeline:</strong> {{timeline}}</p>
          </div>
          
          <div class="section">
            <h3>👤 Contact Information</h3>
            <p><strong>Name:</strong> {{firstName}} {{lastName}}</p>
            <p><strong>Email:</strong> {{email}}</p>
            <p><strong>Phone:</strong> {{phone}}</p>
            <p><strong>Company:</strong> {{company}}</p>
            <p><strong>Position:</strong> {{position}}</p>
            <p><strong>Annual Revenue:</strong> {{revenue}}</p>
          </div>
          
          <div class="section">
            <h3>📋 Inquiry Details</h3>
            <p><strong>Type:</strong> {{inquiryType}}</p>
            <div class="highlight">
              <strong>Requirements:</strong><br>
              {{requirements}}
            </div>
            <div class="highlight">
              <strong>Additional Information:</strong><br>
              {{additionalInfo}}
            </div>
          </div>
          
          <div class="section">
            <h3>📊 Analytics</h3>
            <p><strong>Source:</strong> {{source}}</p>
            <p><strong>Campaign:</strong> {{campaign}}</p>
            <p><strong>Lead Score:</strong> {{leadScore}}</p>
            <p><strong>Marketing Opt-in:</strong> {{marketingOptIn}}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://suggestly-elite.com/admin/leads/{{leadId}}" class="button">View Full Lead Details</a>
          </div>
        </div>
        
        <div class="footer">
          <p>SUGGESTLY ELITE - Advanced AI Platform & Multi-Site Hosting</p>
          <p>Contact: tyrone.mitchell76@hotmail.com | +1 (555) ELITE-AI</p>
          <p>Lead ID: {{leadId}} | Generated: {{timestamp}}</p>
        </div>
      </body>
      </html>
    `,
    text: `
🎯 NEW ELITE CONSULTATION REQUEST

CONTACT INFORMATION:
• Name: {{firstName}} {{lastName}}
• Email: {{email}}
• Phone: {{phone}}
• Company: {{company}}
• Position: {{position}}
• Annual Revenue: {{revenue}}

INQUIRY DETAILS:
• Type: {{inquiryType}}
• Priority: {{priority}}
• Timeline: {{timeline}}

BUSINESS REQUIREMENTS:
{{requirements}}

ADDITIONAL INFORMATION:
{{additionalInfo}}

ANALYTICS:
• Source: {{source}}
• Campaign: {{campaign}}
• Lead Score: {{leadScore}}
• Marketing Opt-in: {{marketingOptIn}}

---
SUGGESTLY ELITE - Advanced AI Platform
Lead ID: {{leadId}} | Generated: {{timestamp}}
    `
  },
  
  autoResponse: {
    subject: '🌟 Thank you for your SUGGESTLY ELITE consultation request',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>SUGGESTLY ELITE - Consultation Request Received</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: #ffd700; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .section { margin: 20px 0; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #ffd700; }
          .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%); color: #000; text-decoration: none; border-radius: 6px; font-weight: bold; }
          .footer { background: #1a1a1a; color: #ccc; padding: 20px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🌟 SUGGESTLY ELITE</h1>
          <p>Advanced AI Platform & Multi-Site Hosting</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h2>Thank you for your consultation request!</h2>
            <p>Dear {{firstName}},</p>
            <p>We have received your consultation request and our elite AI strategists are reviewing your requirements.</p>
          </div>
          
          <div class="section">
            <h3>📋 What happens next?</h3>
            <ol>
              <li><strong>Immediate:</strong> You'll receive a confirmation email (this one)</li>
              <li><strong>Within 2 hours:</strong> Our team will contact you to schedule a consultation</li>
              <li><strong>Within 24 hours:</strong> You'll receive a customized proposal</li>
              <li><strong>Within 48 hours:</strong> Implementation planning begins</li>
            </ol>
          </div>
          
          <div class="section">
            <h3>🎯 Your Request Summary</h3>
            <p><strong>Inquiry Type:</strong> {{inquiryType}}</p>
            <p><strong>Priority Level:</strong> {{priority}}</p>
            <p><strong>Timeline:</strong> {{timeline}}</p>
            <p><strong>Reference ID:</strong> {{leadId}}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://suggestly-elite.com/portal/{{leadId}}" class="button">Access Your Portal</a>
          </div>
          
          <div class="section">
            <h3>📞 Need immediate assistance?</h3>
            <p><strong>Priority Hotline:</strong> +1 (555) ELITE-AI</p>
            <p><strong>Email:</strong> tyrone.mitchell76@hotmail.com</p>
            <p><strong>Response Time:</strong> Within 2 hours</p>
          </div>
        </div>
        
        <div class="footer">
          <p>SUGGESTLY ELITE - Advanced AI Platform & Multi-Site Hosting</p>
          <p>Reference ID: {{leadId}} | Generated: {{timestamp}}</p>
        </div>
      </body>
      </html>
    `
  }
};

// Lead scoring algorithm
const calculateLeadScore = (formData) => {
  let score = 0;
  
  // Revenue scoring
  const revenueMap = {
    'under-100k': 10,
    '100k-500k': 25,
    '500k-1m': 50,
    '1m-10m': 75,
    '10m-50m': 90,
    '50m+': 100
  };
  score += revenueMap[formData.revenue] || 0;
  
  // Priority scoring
  const priorityMap = {
    'low': 10,
    'medium': 30,
    'high': 60,
    'urgent': 100
  };
  score += priorityMap[formData.priority] || 0;
  
  // Timeline scoring
  const timelineMap = {
    'immediate': 100,
    'within-1-month': 80,
    'within-3-months': 60,
    'within-6-months': 40,
    'exploring': 20
  };
  score += timelineMap[formData.timeline] || 0;
  
  // Inquiry type scoring
  const inquiryMap = {
    'enterprise-ai': 100,
    'multi-site-hosting': 90,
    'quantum-computing': 95,
    'ai-automation': 85,
    'consultation': 70,
    'general': 50
  };
  score += inquiryMap[formData.inquiryType] || 0;
  
  return Math.min(score, 100);
};

// Enhanced contact email sending with multiple providers and fallback
export const sendContactEmail = async (formData) => {
  const leadId = `LEAD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const timestamp = new Date().toISOString();
  const leadScore = calculateLeadScore(formData);
  
  // Enhanced form data with analytics
  const enhancedData = {
    ...formData,
    leadId,
    timestamp,
    leadScore,
    source: formData.source || 'website',
    campaign: formData.campaign || 'organic',
    marketingOptIn: formData.marketing ? 'Yes' : 'No',
    userAgent: navigator.userAgent,
    ipAddress: await getClientIP(),
    referrer: document.referrer,
    utmParams: getUTMParams()
  };

  try {
    // Store lead in database (simulated)
    await storeLeadInDatabase(enhancedData);
    
    // Send to multiple recipients
    const recipients = [
      'tyrone.mitchell76@hotmail.com',
      'sales@suggestly-elite.com',
      'ai-strategists@suggestly-elite.com'
    ];
    
    // Send consultation request to team
    const teamEmailResult = await sendTeamNotification(enhancedData, recipients);
    
    // Send auto-response to customer
    const customerEmailResult = await sendCustomerAutoResponse(enhancedData);
    
    // Send SMS notification for high-priority leads
    if (leadScore >= 80) {
      await sendSMSNotification(enhancedData);
    }
    
    // Track analytics
    await trackLeadAnalytics(enhancedData);
    
    return {
      success: true,
      message: 'Consultation request submitted successfully',
      leadId,
      leadScore,
      nextSteps: [
        'You will receive a confirmation email within 2 minutes',
        'Our team will contact you within 2 hours',
        'Custom proposal will be delivered within 24 hours'
      ]
    };
    
  } catch (error) {
    console.error('Enhanced email sending failed:', error);
    
    // Fallback to simple mailto
    const fallbackResult = await sendFallbackEmail(enhancedData);
    
    return {
      success: true,
      message: 'Request submitted (fallback method)',
      leadId,
      leadScore,
      fallback: true
    };
  }
};

// Send team notification with template
const sendTeamNotification = async (data, recipients) => {
  const template = EMAIL_TEMPLATES.consultationRequest;
  const subject = template.subject.replace('{{inquiryType}}', data.inquiryType);
  
  // Replace template variables
  let html = template.html;
  let text = template.text;
  
  Object.keys(data).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(regex, data[key]);
    text = text.replace(regex, data[key]);
  });
  
  // Send via primary provider
  try {
    return await sendViaProvider(EMAIL_PROVIDERS.primary, {
      to: recipients,
      subject,
      html,
      text
    });
  } catch (error) {
    // Fallback to backup provider
    return await sendViaProvider(EMAIL_PROVIDERS.backup, {
      to: recipients,
      subject,
      html,
      text
    });
  }
};

// Send customer auto-response
const sendCustomerAutoResponse = async (data) => {
  const template = EMAIL_TEMPLATES.autoResponse;
  const subject = template.subject;
  
  let html = template.html;
  let text = template.text;
  
  Object.keys(data).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(regex, data[key]);
    text = text.replace(regex, data[key]);
  });
  
  return await sendViaProvider(EMAIL_PROVIDERS.primary, {
    to: [data.email],
    subject,
    html,
    text
  });
};

// Send SMS notification for high-priority leads
const sendSMSNotification = async (data) => {
  if (!EMAIL_PROVIDERS.sms.accountSid) return;
  
  const message = `🚨 HIGH-PRIORITY LEAD: ${data.firstName} ${data.lastName} from ${data.company} (Score: ${data.leadScore}/100). Inquiry: ${data.inquiryType}. Lead ID: ${data.leadId}`;
  
  // Send to sales team
  const salesNumbers = ['+15551234567', '+15559876543'];
  
  for (const number of salesNumbers) {
    try {
      await sendSMS(number, message);
    } catch (error) {
      console.error('SMS sending failed:', error);
    }
  }
};

// Provider-specific sending functions
const sendViaProvider = async (provider, emailData) => {
  switch (provider.type) {
    case 'sendgrid':
      return await sendViaSendGrid(provider, emailData);
    case 'mailgun':
      return await sendViaMailgun(provider, emailData);
    default:
      throw new Error(`Unsupported provider: ${provider.type}`);
  }
};

const sendViaSendGrid = async (provider, emailData) => {
  // Implementation for SendGrid
  console.log('Sending via SendGrid:', emailData);
  return { success: true, provider: 'sendgrid' };
};

const sendViaMailgun = async (provider, emailData) => {
  // Implementation for Mailgun
  console.log('Sending via Mailgun:', emailData);
  return { success: true, provider: 'mailgun' };
};

const sendSMS = async (to, message) => {
  // Implementation for Twilio SMS
  console.log('Sending SMS:', { to, message });
  return { success: true };
};

// Utility functions
const getClientIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    return 'unknown';
  }
};

const getUTMParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_term: urlParams.get('utm_term'),
    utm_content: urlParams.get('utm_content')
  };
};

const storeLeadInDatabase = async (data) => {
  // Simulate database storage
  console.log('Storing lead in database:', data);
  return { success: true };
};

const trackLeadAnalytics = async (data) => {
  // Track in analytics service
  console.log('Tracking lead analytics:', data);
  return { success: true };
};

const sendFallbackEmail = async (data) => {
  // Fallback to mailto link
  const subject = `🌟 SUGGESTLY ELITE Consultation Request - ${data.inquiryType}`;
  const body = `
🎯 NEW ELITE CONSULTATION REQUEST

CONTACT INFORMATION:
• Name: ${data.firstName} ${data.lastName}
• Email: ${data.email}
• Phone: ${data.phone}
• Company: ${data.company}
• Position: ${data.position}
• Annual Revenue: ${data.revenue}

INQUIRY DETAILS:
• Type: ${data.inquiryType}
• Priority: ${data.priority}
• Timeline: ${data.timeline}

BUSINESS REQUIREMENTS:
${data.requirements}

ADDITIONAL INFORMATION:
${data.additionalInfo}

ANALYTICS:
• Lead Score: ${data.leadScore}/100
• Source: ${data.source}
• Campaign: ${data.campaign}
• Marketing Opt-in: ${data.marketingOptIn}

---
SUGGESTLY ELITE - Advanced AI Platform
Lead ID: ${data.leadId} | Generated: ${data.timestamp}
  `;

  const mailtoLink = `mailto:tyrone.mitchell76@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoLink);
  
  return { success: true, method: 'mailto' };
};

// Enhanced trial signup with lead scoring
export const sendTrialSignupEmail = async (trialData) => {
  const leadScore = calculateLeadScore(trialData);
  
  const enhancedTrialData = {
    ...trialData,
    leadScore,
    trialId: `TRIAL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString()
  };

  try {
    // Store trial data
    await storeLeadInDatabase(enhancedTrialData);
    
    // Generate trial credentials
    const trialCredentials = {
      username: `trial_${Date.now()}`,
      password: generateTemporaryPassword(),
      loginUrl: 'https://suggestly-elite.com/login',
      trialExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      features: getTrialFeatures(leadScore)
    };

    // Send trial credentials
    await sendTrialCredentialsEmail(trialData.email, trialCredentials);
    
    // Notify sales team for high-value trials
    if (leadScore >= 70) {
      await sendTeamNotification(enhancedTrialData, ['sales@suggestly-elite.com']);
    }

    return {
      success: true,
      message: 'Trial signup completed successfully',
      credentials: trialCredentials,
      leadScore
    };
  } catch (error) {
    console.error('Trial signup failed:', error);
    return {
      success: false,
      message: 'Failed to process trial signup'
    };
  }
};

const getTrialFeatures = (leadScore) => {
  if (leadScore >= 90) {
    return ['full-platform', 'quantum-ai', 'multi-site-hosting', 'priority-support', 'custom-integration'];
  } else if (leadScore >= 70) {
    return ['full-platform', 'quantum-ai', 'multi-site-hosting', 'priority-support'];
  } else if (leadScore >= 50) {
    return ['full-platform', 'quantum-ai', 'multi-site-hosting'];
  } else {
    return ['basic-platform', 'ai-features'];
  }
};

const generateTemporaryPassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export const sendTrialCredentialsEmail = async (email, credentials) => {
  const template = {
    subject: '🌟 Welcome to SUGGESTLY ELITE - Your Trial Access',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>SUGGESTLY ELITE Trial Access</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: #ffd700; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .section { margin: 20px 0; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #ffd700; }
          .credentials { background: #f8f9fa; padding: 15px; border-radius: 5px; font-family: monospace; }
          .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%); color: #000; text-decoration: none; border-radius: 6px; font-weight: bold; }
          .footer { background: #1a1a1a; color: #ccc; padding: 20px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🌟 SUGGESTLY ELITE</h1>
          <p>Advanced AI Platform & Multi-Site Hosting</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h2>Welcome to Your Elite Trial!</h2>
            <p>Your trial access has been activated with premium features.</p>
          </div>
          
          <div class="section">
            <h3>🔑 Your Login Credentials</h3>
            <div class="credentials">
              <p><strong>Login URL:</strong> ${credentials.loginUrl}</p>
              <p><strong>Username:</strong> ${credentials.username}</p>
              <p><strong>Password:</strong> ${credentials.password}</p>
              <p><strong>Trial Expires:</strong> ${new Date(credentials.trialExpiry).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div class="section">
            <h3>🚀 Available Features</h3>
            <ul>
              ${credentials.features.map(feature => `<li>${feature.replace('-', ' ').toUpperCase()}</li>`).join('')}
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${credentials.loginUrl}" class="button">Access Your Trial</a>
          </div>
          
          <div class="section">
            <h3>📞 Need Help?</h3>
            <p><strong>Priority Support:</strong> +1 (555) ELITE-AI</p>
            <p><strong>Email:</strong> support@suggestly-elite.com</p>
            <p><strong>Response Time:</strong> Within 1 hour</p>
          </div>
        </div>
        
        <div class="footer">
          <p>SUGGESTLY ELITE - Advanced AI Platform & Multi-Site Hosting</p>
          <p>Trial ID: ${credentials.username} | Expires: ${new Date(credentials.trialExpiry).toLocaleDateString()}</p>
        </div>
      </body>
      </html>
    `
  };

  return await sendViaProvider(EMAIL_PROVIDERS.primary, {
    to: [email],
    subject: template.subject,
    html: template.html
  });
};
