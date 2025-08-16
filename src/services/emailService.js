/**
 * @fileoverview Email and Communication Service
 * @author Tyron Mitchell
 * @version 2.0.0
 * @created 2025-01-27
 * @lastModified 2025-01-27
 * @description Comprehensive email service for transactional and marketing communications
 * @copyright © 2025 SuggestlyG4Plus. All rights reserved.
 * @license MIT
 */

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  increment,
} from "firebase/firestore";

class EmailService {
  constructor() {
    this.db = getFirestore();
    this.emailTemplates = {
      welcome: {
        subject: "Welcome to Suggestly Elite!",
        template: "welcome-email-template",
      },
      newsletter: {
        subject: "Suggestly Elite Newsletter",
        template: "newsletter-template",
      },
      passwordReset: {
        subject: "Reset Your Password",
        template: "password-reset-template",
      },
      support: {
        subject: "Support Ticket Update",
        template: "support-template",
      },
    };
  }

  // Initialize email service
  async init() {
    try {
      // Check email configuration
      const emailConfig = {
        apiKey: process.env.REACT_APP_EMAIL_API_KEY,
        domain: process.env.REACT_APP_EMAIL_DOMAIN,
        fromEmail: process.env.REACT_APP_FROM_EMAIL,
      };

      if (!emailConfig.apiKey || !emailConfig.domain) {
        console.warn("Email service not fully configured");
        return { success: false, error: "Email configuration missing" };
      }

      return { success: true };
    } catch (error) {
      console.error("Email service initialization error:", error);
      return { success: false, error: error.message };
    }
  }

  // Send email
  async sendEmail(to, template, data = {}) {
    try {
      const emailData = {
        to,
        template,
        data,
        status: "pending",
        createdAt: new Date(),
      };

      // Save email record
      const emailRef = await addDoc(collection(this.db, "emails"), emailData);

      // Send via API
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: emailRef.id,
          ...emailData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      // Update status
      await updateDoc(doc(this.db, "emails", emailRef.id), {
        status: "sent",
        sentAt: new Date(),
      });

      return { success: true, emailId: emailRef.id };
    } catch (error) {
      console.error("Send email error:", error);

      // Update status to failed
      if (emailRef) {
        await updateDoc(doc(this.db, "emails", emailRef.id), {
          status: "failed",
          error: error.message,
        });
      }

      return { success: false, error: error.message };
    }
  }

  // Send welcome email
  async sendWelcomeEmail(userEmail, userData = {}) {
    try {
      const template = this.emailTemplates.welcome;
      const data = {
        userName: userData.displayName || "User",
        loginUrl: `${window.location.origin}/login`,
        supportEmail: "support@suggestly.com",
      };

      return await this.sendEmail(userEmail, template.template, data);
    } catch (error) {
      console.error("Send welcome email error:", error);
      return { success: false, error: error.message };
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(userEmail, resetToken) {
    try {
      const template = this.emailTemplates.passwordReset;
      const resetUrl = `${window.location.origin}/reset-password?token=${resetToken}`;

      const data = {
        resetUrl,
        expiryTime: "1 hour",
      };

      return await this.sendEmail(userEmail, template.template, data);
    } catch (error) {
      console.error("Send password reset email error:", error);
      return { success: false, error: error.message };
    }
  }

  // Send newsletter
  async sendNewsletter(subscribers, newsletterData) {
    try {
      const template = this.emailTemplates.newsletter;
      const results = [];

      for (const subscriber of subscribers) {
        const data = {
          subscriberName: subscriber.name || "Subscriber",
          unsubscribeUrl: `${window.location.origin}/unsubscribe?email=${subscriber.email}`,
          ...newsletterData,
        };

        const result = await this.sendEmail(
          subscriber.email,
          template.template,
          data
        );
        results.push({ email: subscriber.email, ...result });
      }

      return { success: true, results };
    } catch (error) {
      console.error("Send newsletter error:", error);
      return { success: false, error: error.message };
    }
  }

  // Subscribe to newsletter
  async subscribeToNewsletter(email, name = null) {
    try {
      // Check if already subscribed
      const existingQuery = query(
        collection(this.db, "newsletter_subscribers"),
        where("email", "==", email)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (!existingSnapshot.empty) {
        return { success: false, error: "Already subscribed" };
      }

      // Add subscriber
      const subscriberData = {
        email,
        name,
        subscribedAt: new Date(),
        status: "active",
        source: "website",
      };

      const subscriberRef = await addDoc(
        collection(this.db, "newsletter_subscribers"),
        subscriberData
      );

      // Send welcome email
      await this.sendEmail(email, "newsletter-welcome", {
        subscriberName: name || "Subscriber",
      });

      return { success: true, subscriberId: subscriberRef.id };
    } catch (error) {
      console.error("Subscribe to newsletter error:", error);
      return { success: false, error: error.message };
    }
  }

  // Unsubscribe from newsletter
  async unsubscribeFromNewsletter(email) {
    try {
      const subscriberQuery = query(
        collection(this.db, "newsletter_subscribers"),
        where("email", "==", email)
      );
      const subscriberSnapshot = await getDocs(subscriberQuery);

      if (subscriberSnapshot.empty) {
        return { success: false, error: "Subscriber not found" };
      }

      const subscriberDoc = subscriberSnapshot.docs[0];
      await updateDoc(subscriberDoc.ref, {
        status: "unsubscribed",
        unsubscribedAt: new Date(),
      });

      return { success: true };
    } catch (error) {
      console.error("Unsubscribe from newsletter error:", error);
      return { success: false, error: error.message };
    }
  }

  // Get newsletter subscribers
  async getNewsletterSubscribers(status = "active", limit = 100) {
    try {
      const subscribersQuery = query(
        collection(this.db, "newsletter_subscribers"),
        where("status", "==", status),
        orderBy("subscribedAt", "desc"),
        limit(limit)
      );

      const querySnapshot = await getDocs(subscribersQuery);
      const subscribers = [];

      querySnapshot.forEach((doc) => {
        subscribers.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return { success: true, subscribers };
    } catch (error) {
      console.error("Get newsletter subscribers error:", error);
      return { success: false, error: error.message };
    }
  }

  // Submit contact form
  async submitContactForm(formData) {
    try {
      const contactData = {
        ...formData,
        status: "new",
        createdAt: new Date(),
      };

      const contactRef = await addDoc(
        collection(this.db, "contact_forms"),
        contactData
      );

      // Send notification email
      await this.sendEmail(
        "support@suggestly.com",
        "contact-form-notification",
        {
          ...formData,
          contactId: contactRef.id,
        }
      );

      // Send confirmation email
      if (formData.email) {
        await this.sendEmail(formData.email, "contact-form-confirmation", {
          name: formData.name || "User",
          message: formData.message,
        });
      }

      return { success: true, contactId: contactRef.id };
    } catch (error) {
      console.error("Submit contact form error:", error);
      return { success: false, error: error.message };
    }
  }

  // Create support ticket
  async createSupportTicket(ticketData) {
    try {
      const ticket = {
        ...ticketData,
        status: "open",
        priority: ticketData.priority || "medium",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const ticketRef = await addDoc(
        collection(this.db, "support_tickets"),
        ticket
      );

      // Send notification email
      await this.sendEmail(
        "support@suggestly.com",
        "support-ticket-notification",
        {
          ...ticketData,
          ticketId: ticketRef.id,
        }
      );

      // Send confirmation email
      if (ticketData.userEmail) {
        await this.sendEmail(
          ticketData.userEmail,
          "support-ticket-confirmation",
          {
            name: ticketData.userName || "User",
            ticketId: ticketRef.id,
            subject: ticketData.subject,
          }
        );
      }

      return { success: true, ticketId: ticketRef.id };
    } catch (error) {
      console.error("Create support ticket error:", error);
      return { success: false, error: error.message };
    }
  }

  // Update support ticket
  async updateSupportTicket(ticketId, updates) {
    try {
      await updateDoc(doc(this.db, "support_tickets", ticketId), {
        ...updates,
        updatedAt: new Date(),
      });

      // Send update notification if status changed
      if (updates.status) {
        const ticketDoc = await getDoc(
          doc(this.db, "support_tickets", ticketId)
        );
        if (ticketDoc.exists()) {
          const ticket = ticketDoc.data();
          if (ticket.userEmail) {
            await this.sendEmail(ticket.userEmail, "support-ticket-update", {
              name: ticket.userName || "User",
              ticketId,
              status: updates.status,
              message: updates.message || "",
            });
          }
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Update support ticket error:", error);
      return { success: false, error: error.message };
    }
  }

  // Get support tickets
  async getSupportTickets(userId = null, status = null, limit = 50) {
    try {
      let ticketsQuery = collection(this.db, "support_tickets");

      if (userId) {
        ticketsQuery = query(ticketsQuery, where("userId", "==", userId));
      }

      if (status) {
        ticketsQuery = query(ticketsQuery, where("status", "==", status));
      }

      ticketsQuery = query(
        ticketsQuery,
        orderBy("createdAt", "desc"),
        limit(limit)
      );

      const querySnapshot = await getDocs(ticketsQuery);
      const tickets = [];

      querySnapshot.forEach((doc) => {
        tickets.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return { success: true, tickets };
    } catch (error) {
      console.error("Get support tickets error:", error);
      return { success: false, error: error.message };
    }
  }

  // Send automated email campaign
  async sendEmailCampaign(campaignData) {
    try {
      const { recipients, template, data, subject } = campaignData;

      const campaign = {
        ...campaignData,
        status: "sending",
        createdAt: new Date(),
        sentCount: 0,
        failedCount: 0,
      };

      const campaignRef = await addDoc(
        collection(this.db, "email_campaigns"),
        campaign
      );

      const results = [];

      for (const recipient of recipients) {
        try {
          const emailData = {
            ...data,
            recipientName: recipient.name || "User",
            unsubscribeUrl: `${window.location.origin}/unsubscribe?email=${recipient.email}&campaign=${campaignRef.id}`,
          };

          const result = await this.sendEmail(
            recipient.email,
            template,
            emailData
          );
          results.push({ email: recipient.email, ...result });

          if (result.success) {
            await updateDoc(doc(this.db, "email_campaigns", campaignRef.id), {
              sentCount: increment(1),
            });
          } else {
            await updateDoc(doc(this.db, "email_campaigns", campaignRef.id), {
              failedCount: increment(1),
            });
          }
        } catch (error) {
          console.error(`Failed to send email to ${recipient.email}:`, error);
          results.push({
            email: recipient.email,
            success: false,
            error: error.message,
          });

          await updateDoc(doc(this.db, "email_campaigns", campaignRef.id), {
            failedCount: increment(1),
          });
        }
      }

      // Update campaign status
      await updateDoc(doc(this.db, "email_campaigns", campaignRef.id), {
        status: "completed",
        completedAt: new Date(),
      });

      return { success: true, campaignId: campaignRef.id, results };
    } catch (error) {
      console.error("Send email campaign error:", error);
      return { success: false, error: error.message };
    }
  }

  // Get email campaigns
  async getEmailCampaigns(status = null, limit = 20) {
    try {
      let campaignsQuery = collection(this.db, "email_campaigns");

      if (status) {
        campaignsQuery = query(campaignsQuery, where("status", "==", status));
      }

      campaignsQuery = query(
        campaignsQuery,
        orderBy("createdAt", "desc"),
        limit(limit)
      );

      const querySnapshot = await getDocs(campaignsQuery);
      const campaigns = [];

      querySnapshot.forEach((doc) => {
        campaigns.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return { success: true, campaigns };
    } catch (error) {
      console.error("Get email campaigns error:", error);
      return { success: false, error: error.message };
    }
  }

  // Get email statistics
  async getEmailStats(period = "30d") {
    try {
      const startDate = new Date();
      if (period === "7d") {
        startDate.setDate(startDate.getDate() - 7);
      } else if (period === "30d") {
        startDate.setDate(startDate.getDate() - 30);
      } else if (period === "90d") {
        startDate.setDate(startDate.getDate() - 90);
      }

      const emailsQuery = query(
        collection(this.db, "emails"),
        where("createdAt", ">=", startDate)
      );

      const querySnapshot = await getDocs(emailsQuery);
      let sentCount = 0;
      let failedCount = 0;

      querySnapshot.forEach((doc) => {
        const email = doc.data();
        if (email.status === "sent") {
          sentCount++;
        } else if (email.status === "failed") {
          failedCount++;
        }
      });

      const totalCount = querySnapshot.size;
      const successRate = totalCount > 0 ? (sentCount / totalCount) * 100 : 0;

      return {
        success: true,
        stats: {
          total: totalCount,
          sent: sentCount,
          failed: failedCount,
          successRate,
          period,
        },
      };
    } catch (error) {
      console.error("Get email stats error:", error);
      return { success: false, error: error.message };
    }
  }

  // Create email template
  async createEmailTemplate(templateData) {
    try {
      const template = {
        ...templateData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const templateRef = await addDoc(
        collection(this.db, "email_templates"),
        template
      );
      return { success: true, templateId: templateRef.id };
    } catch (error) {
      console.error("Create email template error:", error);
      return { success: false, error: error.message };
    }
  }

  // Get email templates
  async getEmailTemplates() {
    try {
      const templatesQuery = query(
        collection(this.db, "email_templates"),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(templatesQuery);
      const templates = [];

      querySnapshot.forEach((doc) => {
        templates.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return { success: true, templates };
    } catch (error) {
      console.error("Get email templates error:", error);
      return { success: false, error: error.message };
    }
  }
}

// Create singleton instance
const emailService = new EmailService();

export default emailService;
