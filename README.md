# Aurum Private - Elite Investment Platform

[![Deploy Backend to Render](https://github.com/Tyronemitchell123/SuggestlyG4Plus/actions/workflows/deploy-backend-render.yml/badge.svg)](https://github.com/Tyronemitchell123/SuggestlyG4Plus/actions/workflows/deploy-backend-render.yml)
[![Manual Render Deploy](https://github.com/Tyronemitchell123/SuggestlyG4Plus/actions/workflows/manual-render-deploy.yml/badge.svg)](https://github.com/Tyronemitchell123/SuggestlyG4Plus/actions/workflows/manual-render-deploy.yml)

## 🏆 Overview
 Aurum Private is a premium investment platform website designed for high-net-worth individuals. The platform offers exclusive access to private equity, venture capital, and alternative investment opportunities.

## 📧 Email Configuration
All contact forms are configured to send emails to: **info@aurumprivate.com**

### Email Addresses:
- **General Inquiries:** info@aurumprivate.com
- **Membership Applications:** info@aurumprivate.com  
- **Investment Opportunities:** info@aurumprivate.com

## 🚀 Quick Setup

### Option 1: Free Hosting (Recommended)
1. **Upload to free hosting service:**
   - [000webhost.com](https://000webhost.com) (Free PHP hosting)
   - [InfinityFree.net](https://infinityfree.net) (Free hosting with email)
   - [AwardSpace.com](https://awardspace.com) (Free hosting)

2. **Upload all files to your hosting directory**

3. **Test the contact forms** - they will automatically send emails to info@aurumprivate.com

### Option 2: Local Development
1. **Install XAMPP or WAMP** for local PHP server
2. **Place files in htdocs/www directory**
3. **Start Apache server**
4. **Access via localhost**

## 📁 File Structure
```
aurum-private/
├── index.html              # Main homepage
├── about.html              # About page
├── services.html           # Services page
├── portfolio.html          # Portfolio page
├── contact.html            # Contact page
├── send_email.php          # Email handler (sends to info@aurumprivate.com)
├── .htaccess               # Server configuration
├── email_log.txt           # Email submission log (auto-created)
└── README.md               # This file
```

## 🔧 Email System Features

### ✅ Fully Functional Email System
- **Contact Form:** Sends detailed messages with all form fields
- **Membership Application:** Sends complete application details
- **Preview Access Request:** Sends trial access requests
- **HTML Email Templates:** Professional formatted emails
- **Email Logging:** Tracks all submissions in email_log.txt

### 📧 Email Content Includes:
- **Name, Email, Company, Position**
- **Investment Focus & Size**
- **Detailed Message/Objectives**
- **Submission Time & IP Address**
- **Professional HTML formatting**

### 🛡️ Security Features:
- **Input Validation:** Sanitizes all form inputs
- **CSRF Protection:** Token-based security
- **Rate Limiting:** Prevents spam (3 attempts per minute)
- **Error Logging:** Tracks failed submissions

## 🎯 Website Features

### 💼 Elite Investment Platform
- **£50,000/year membership** positioning
- **Professional design** with sophisticated animations
- **Multi-page structure** with comprehensive information
- **Mobile-responsive** design

### 📱 Pages Included:
1. **Homepage** - Hero section with application form
2. **About** - Company information and team
3. **Services** - Detailed service offerings
4. **Portfolio** - Investment track record
5. **Contact** - Contact information and form

### ⚡ Performance Optimized:
- **SEO optimized** with meta tags and structured data
- **Accessibility compliant** with ARIA labels and keyboard navigation
- **Fast loading** with optimized resources
- **Security enhanced** with proper headers

## 📊 Testing the Email System

### Test Contact Forms:
1. **Homepage Application Form** - Submit membership application
2. **Preview Access Button** - Request demo access
3. **Contact Page Form** - Send general inquiry

### Expected Results:
- **Immediate email delivery** to info@aurumprivate.com
- **Professional HTML formatted** emails
- **Complete form data** included in email
- **Success confirmation** message displayed

## 🔍 Troubleshooting

### Email Not Sending?
1. **Check hosting provider** supports PHP mail()
2. **Verify .htaccess** file is uploaded
3. **Check email_log.txt** for error messages
4. **Test with different hosting** if needed

### Forms Not Working?
1. **Ensure PHP is enabled** on hosting
2. **Check browser console** for JavaScript errors
3. **Verify file permissions** (644 for files, 755 for directories)

## 📈 Analytics & Monitoring

### Email Tracking:
- **email_log.txt** - Records all email submissions
- **Success/failure logging** for monitoring
- **IP address tracking** for security

### Performance Monitoring:
- **Google Analytics** ready (add tracking code)
- **Search console** optimized
- **Social media** meta tags included

## 🎨 Customization

### Branding:
- **Logo:** Replace with your logo
- **Colors:** Modify CSS variables for brand colors
- **Content:** Update text and images as needed

### Email Templates:
- **send_email.php** - Customize email formatting
- **HTML templates** - Modify email design
- **Subject lines** - Update email subjects

## 📞 Support

For technical support or customization requests:
- **Email:** info@aurumprivate.com
- **Response Time:** Within 24 hours

## 🏆 Ready for Production

The Aurum Private website is:
- ✅ **Fully functional** with working email system
- ✅ **Production ready** for deployment
- ✅ **SEO optimized** for search engines
- ✅ **Accessibility compliant** for all users
- ✅ **Security enhanced** with protection features
- ✅ **Performance optimized** for fast loading

**Deploy and start receiving elite investment inquiries immediately!** 🚀