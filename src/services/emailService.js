import axios from 'axios';

// Note: In production, this should be handled by a backend service
// This is a simplified frontend implementation
export const emailService = {
  // Send consultation request email
  async sendConsultationRequest(clientData, plan = null) {
    try {
      const emailData = {
        to: 'tyrone.mitchell76@hotmail.com',
        from: 'noreply@suggestlyg4plus.io',
        subject: `🌟 SUGGESTLY ELITE Consultation Request - ${plan?.title || 'Custom Solution'}`,
        html: this.generateConsultationEmailHTML(clientData, plan),
        text: this.generateConsultationEmailText(clientData, plan)
      };

      // In production, this would call your backend API
      // For now, we'll simulate the email sending
      console.log('Email would be sent:', emailData);
      
      return {
        success: true,
        messageId: 'simulated_email_id',
        emailData
      };
    } catch (error) {
      console.error('Email Service Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Send welcome email to new clients
  async sendWelcomeEmail(clientData) {
    try {
      const emailData = {
        to: clientData.email,
        from: 'welcome@suggestlyg4plus.io',
        subject: '🎉 Welcome to SUGGESTLY ELITE - Your AI Journey Begins',
        html: this.generateWelcomeEmailHTML(clientData),
        text: this.generateWelcomeEmailText(clientData)
      };

      console.log('Welcome email would be sent:', emailData);
      
      return {
        success: true,
        messageId: 'simulated_welcome_email_id',
        emailData
      };
    } catch (error) {
      console.error('Email Service Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Send payment confirmation email
  async sendPaymentConfirmation(clientData, paymentDetails) {
    try {
      const emailData = {
        to: clientData.email,
        from: 'payments@suggestlyg4plus.io',
        subject: '✅ Payment Confirmed - Welcome to SUGGESTLY ELITE',
        html: this.generatePaymentEmailHTML(clientData, paymentDetails),
        text: this.generatePaymentEmailText(clientData, paymentDetails)
      };

      console.log('Payment confirmation email would be sent:', emailData);
      
      return {
        success: true,
        messageId: 'simulated_payment_email_id',
        emailData
      };
    } catch (error) {
      console.error('Email Service Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Generate consultation email HTML
  generateConsultationEmailHTML(clientData, plan) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #1a1a1a, #2d2d2d); color: #ffd700; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .highlight { background-color: #f8f9fa; padding: 15px; border-left: 4px solid #ffd700; margin: 10px 0; }
          .footer { background-color: #1a1a1a; color: #fff; padding: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🌟 SUGGESTLY ELITE</h1>
          <p>Advanced AI Platform Consultation Request</p>
        </div>
        
        <div class="content">
          <h2>New Consultation Request</h2>
          
          <div class="highlight">
            <h3>Client Information</h3>
            <p><strong>Name:</strong> ${clientData.firstName} ${clientData.lastName}</p>
            <p><strong>Email:</strong> ${clientData.email}</p>
            <p><strong>Phone:</strong> ${clientData.phone}</p>
            <p><strong>Company:</strong> ${clientData.company}</p>
            <p><strong>Position:</strong> ${clientData.position}</p>
            <p><strong>Annual Revenue:</strong> ${clientData.revenue}</p>
          </div>
          
          ${plan ? `
          <div class="highlight">
            <h3>Selected Plan</h3>
            <p><strong>Plan:</strong> ${plan.title}</p>
            <p><strong>Price:</strong> ${plan.price}</p>
          </div>
          ` : ''}
          
          <div class="highlight">
            <h3>Business Requirements</h3>
            <p>${clientData.requirements}</p>
          </div>
          
          <div class="highlight">
            <h3>Additional Information</h3>
            <p>${clientData.additionalInfo || 'No additional information provided.'}</p>
          </div>
        </div>
        
        <div class="footer">
          <p>SUGGESTLY ELITE - Advanced AI Platform</p>
          <p>Contact: tyrone.mitchell76@hotmail.com</p>
        </div>
      </body>
      </html>
    `;
  },

  // Generate consultation email text
  generateConsultationEmailText(clientData, plan) {
    return `
🌟 SUGGESTLY ELITE - New Consultation Request

CLIENT INFORMATION:
Name: ${clientData.firstName} ${clientData.lastName}
Email: ${clientData.email}
Phone: ${clientData.phone}
Company: ${clientData.company}
Position: ${clientData.position}
Annual Revenue: ${clientData.revenue}

${plan ? `
SELECTED PLAN:
Plan: ${plan.title}
Price: ${plan.price}
` : ''}

BUSINESS REQUIREMENTS:
${clientData.requirements}

ADDITIONAL INFORMATION:
${clientData.additionalInfo || 'No additional information provided.'}

---
SUGGESTLY ELITE - Advanced AI Platform
Contact: tyrone.mitchell76@hotmail.com
    `;
  },

  // Generate welcome email HTML
  generateWelcomeEmailHTML(clientData) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #1a1a1a, #2d2d2d); color: #ffd700; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .cta { background-color: #ffd700; color: #1a1a1a; padding: 15px; text-align: center; margin: 20px 0; }
          .footer { background-color: #1a1a1a; color: #fff; padding: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎉 Welcome to SUGGESTLY ELITE</h1>
          <p>Your AI Journey Begins</p>
        </div>
        
        <div class="content">
          <h2>Dear ${clientData.firstName},</h2>
          
          <p>Welcome to the future of AI-powered business solutions. You've just joined an exclusive community of forward-thinking organizations leveraging cutting-edge artificial intelligence.</p>
          
          <div class="cta">
            <h3>🚀 Next Steps</h3>
            <p>Our AI strategists will contact you within 24 hours to begin your personalized consultation.</p>
          </div>
          
          <p>In the meantime, explore our platform and discover how AI can transform your business operations.</p>
        </div>
        
        <div class="footer">
          <p>SUGGESTLY ELITE - Advanced AI Platform</p>
          <p>Contact: tyrone.mitchell76@hotmail.com</p>
        </div>
      </body>
      </html>
    `;
  },

  // Generate welcome email text
  generateWelcomeEmailText(clientData) {
    return `
🎉 Welcome to SUGGESTLY ELITE

Dear ${clientData.firstName},

Welcome to the future of AI-powered business solutions. You've just joined an exclusive community of forward-thinking organizations leveraging cutting-edge artificial intelligence.

🚀 Next Steps:
Our AI strategists will contact you within 24 hours to begin your personalized consultation.

In the meantime, explore our platform and discover how AI can transform your business operations.

---
SUGGESTLY ELITE - Advanced AI Platform
Contact: tyrone.mitchell76@hotmail.com
    `;
  },

  // Generate payment confirmation email HTML
  generatePaymentEmailHTML(clientData, paymentDetails) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #1a1a1a, #2d2d2d); color: #ffd700; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .payment-details { background-color: #f8f9fa; padding: 15px; border-left: 4px solid #28a745; margin: 10px 0; }
          .footer { background-color: #1a1a1a; color: #fff; padding: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>✅ Payment Confirmed</h1>
          <p>Welcome to SUGGESTLY ELITE</p>
        </div>
        
        <div class="content">
          <h2>Dear ${clientData.firstName},</h2>
          
          <p>Thank you for choosing SUGGESTLY ELITE. Your payment has been successfully processed and your account is now active.</p>
          
          <div class="payment-details">
            <h3>Payment Details</h3>
            <p><strong>Transaction ID:</strong> ${paymentDetails.transactionId}</p>
            <p><strong>Amount:</strong> ${paymentDetails.amount}</p>
            <p><strong>Plan:</strong> ${paymentDetails.plan}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p>Your dedicated AI strategist will contact you within the next 24 hours to begin your personalized implementation.</p>
        </div>
        
        <div class="footer">
          <p>SUGGESTLY ELITE - Advanced AI Platform</p>
          <p>Contact: tyrone.mitchell76@hotmail.com</p>
        </div>
      </body>
      </html>
    `;
  },

  // Generate payment confirmation email text
  generatePaymentEmailText(clientData, paymentDetails) {
    return `
✅ Payment Confirmed - Welcome to SUGGESTLY ELITE

Dear ${clientData.firstName},

Thank you for choosing SUGGESTLY ELITE. Your payment has been successfully processed and your account is now active.

PAYMENT DETAILS:
Transaction ID: ${paymentDetails.transactionId}
Amount: ${paymentDetails.amount}
Plan: ${paymentDetails.plan}
Date: ${new Date().toLocaleDateString()}

Your dedicated AI strategist will contact you within the next 24 hours to begin your personalized implementation.

---
SUGGESTLY ELITE - Advanced AI Platform
Contact: tyrone.mitchell76@hotmail.com
    `;
  }
};
