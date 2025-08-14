# 🔑 Free Developer Keys Setup Guide

This guide provides step-by-step instructions for obtaining free developer API keys and test credentials for all services used in SuggestlyG4Plus.

## 🚀 Quick Start

1. **Local Development**: Copy `.env.local.example` to `.env.local` and fill in your keys
2. **Production**: Set environment variables in your deployment platform (Vercel) or GitHub Secrets
3. **Never commit real secrets**: Always use `.env.local` for local development (already in `.gitignore`)

## 📋 Services Overview

| Service | Free Tier | Usage Limits | Required For |
|---------|-----------|--------------|--------------|
| Stripe | ✅ Test Mode | Unlimited test transactions | Payment processing |
| Alpha Vantage | ✅ Free | 25 requests/day | Stock market data |
| Finnhub | ✅ Free | 60 calls/minute | Financial data |
| Polygon | ✅ Free | 5 calls/minute | Market data |
| CoinGecko | ✅ Free | 50 calls/minute | Crypto data |
| Twilio | ✅ Trial | $15 credit | SMS/voice |
| SendGrid | ✅ Free | 100 emails/day | Email delivery |
| HubSpot | ✅ Free | Basic CRM features | Customer management |
| Calendly | ✅ Free | Basic scheduling | Meeting scheduling |
| OpenAI | ❌ Paid | Pay-per-use | AI features (optional) |

---

## 🏦 Payment Processing

### Stripe (Test Keys & Webhook Secret)

**Free Tier**: Unlimited test transactions, no real money processed

**Step 1: Get Test API Keys**
1. Visit [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Sign up for a free account
3. Navigate to **Developers > API Keys**
4. Copy **Publishable key** and **Secret key** (both start with `pk_test_` and `sk_test_`)

**Step 2: Get Webhook Secret**
1. Go to **Developers > Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Set endpoint URL: `https://yourdomain.com/api/webhook`
4. Select events: `payment_intent.succeeded`
5. Copy the **Signing secret** (starts with `whsec_`)

**Environment Variables**:
```bash
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_API_KEY=sk_test_your_secret_key_here  # Same as above
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**Where to place**:
- **Local**: `.env.local` file
- **Vercel**: Project Settings > Environment Variables
- **GitHub**: Repository Settings > Secrets and Variables > Actions

---

## 📊 Financial Data APIs

### Alpha Vantage (Stock Market Data)

**Free Tier**: 25 API requests per day

**Setup**:
1. Visit [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Enter your email address
3. API key sent to your email instantly

**Environment Variable**:
```bash
ALPHA_VANTAGE_API_KEY=your_api_key_here
```

### Finnhub (Financial Data)

**Free Tier**: 60 API calls per minute

**Setup**:
1. Visit [Finnhub Registration](https://finnhub.io/register)
2. Sign up with email
3. API key available immediately in dashboard

**Environment Variable**:
```bash
FINNHUB_API_KEY=your_api_key_here
```

### Polygon (Market Data)

**Free Tier**: 5 API calls per minute

**Setup**:
1. Visit [Polygon.io](https://polygon.io/stocks)
2. Click **Get Free API Key**
3. Sign up and verify email
4. API key available in dashboard

**Environment Variable**:
```bash
POLYGON_API_KEY=your_api_key_here
```

### CoinGecko (Cryptocurrency Data)

**Free Tier**: 50 API calls per minute (no key required for basic tier)

**Setup**:
1. Visit [CoinGecko API](https://www.coingecko.com/en/api/pricing)
2. For free tier: No API key needed
3. For higher limits: Sign up for free account and get API key

**Environment Variable**:
```bash
COINGECKO_API_KEY=your_api_key_here  # Optional for free tier
```

---

## 🤖 AI Services

### OpenAI (AI/GPT Features)

**⚠️ Note**: OpenAI requires a paid account for API access. Free ChatGPT accounts don't include API access.

**Setup** (Optional):
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add payment method (required)
3. Create API key
4. Monitor usage to control costs

**Environment Variable**:
```bash
OPENAI_API_KEY=sk-your_api_key_here  # Optional - features will be disabled if not provided
```

---

## 📱 Communication Services

### Twilio (SMS/Voice)

**Free Tier**: $15 trial credit

**Setup**:
1. Visit [Twilio](https://www.twilio.com/try-twilio)
2. Sign up for free trial
3. Complete phone verification
4. Get **Account SID** and **Auth Token** from dashboard
5. For API Key: Go to **Settings > API Keys** and create new key

**Environment Variable**:
```bash
TWILIO_API_KEY=your_api_key_here
```

### SendGrid (Email Delivery)

**Free Tier**: 100 emails per day forever

**Setup**:
1. Visit [SendGrid](https://app.sendgrid.com/settings/api_keys)
2. Sign up for free account
3. Go to **Settings > API Keys**
4. Click **Create API Key**
5. Choose **Restricted Access** and select permissions
6. Copy the generated key (starts with `SG.`)

**Environment Variable**:
```bash
SENDGRID_API_KEY=SG.your_api_key_here
```

---

## 🎯 CRM & Scheduling

### HubSpot (Customer Management)

**Free Tier**: Free CRM with basic features

**Setup**:
1. Visit [HubSpot](https://app.hubspot.com/signup)
2. Sign up for free CRM
3. Go to **Settings > Integrations > Private Apps**
4. Click **Create a private app**
5. Configure scopes (CRM read/write)
6. Generate access token

**Environment Variables**:
```bash
HUBSPOT_PRIVATE_APP_TOKEN=pat-na1-your_token_here
HUBSPOT_API_KEY=your_api_key_here  # Legacy, use private app token instead
```

### Calendly (Meeting Scheduling)

**Free Tier**: Basic scheduling features

**Setup**:
1. Visit [Calendly](https://calendly.com/signup)
2. Sign up for free account
3. Create your first event type
4. Copy your scheduling link from **Scheduled Events**

**Environment Variable**:
```bash
CALENDLY_SCHEDULING_LINK=https://calendly.com/your-username/meeting
```

---

## 🏢 Business Configuration

### Success/Cancel URLs

**Setup**:
Set these to your actual domain URLs for payment flow redirects

**Environment Variables**:
```bash
BUSINESS_SUCCESS_URL=https://yourdomain.com/success
BUSINESS_CANCEL_URL=https://yourdomain.com/cancel
```

**Local Development**:
```bash
BUSINESS_SUCCESS_URL=http://localhost:3000/success
BUSINESS_CANCEL_URL=http://localhost:3000/cancel
```

---

## 🚀 Deployment Configuration

### For Local Development

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your API keys in `.env.local`

3. For Python scripts, export environment variables:
   ```bash
   export $(cat .env.local | xargs)
   python real_world_integration.py
   ```

### For Vercel Deployment

**Option 1: Via Vercel Dashboard**
1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings > Environment Variables**
3. Add each variable with appropriate environment (Production/Preview/Development)

**Option 2: Via GitHub Secrets (Automated)**
1. Go to your GitHub repository
2. Navigate to **Settings > Secrets and Variables > Actions**
3. Add each secret with the format: `SECRET_NAME`
4. The workflow will automatically sync these to Vercel

### For GitHub Actions

1. Go to **Repository Settings > Secrets and Variables > Actions**
2. Add secrets for all environment variables
3. The deployment workflow will use these automatically

**Required GitHub Secrets**:
```
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
ALPHA_VANTAGE_API_KEY
FINNHUB_API_KEY
POLYGON_API_KEY
COINGECKO_API_KEY
TWILIO_API_KEY
SENDGRID_API_KEY
HUBSPOT_PRIVATE_APP_TOKEN
HUBSPOT_API_KEY
CALENDLY_SCHEDULING_LINK
BUSINESS_SUCCESS_URL
BUSINESS_CANCEL_URL
OPENAI_API_KEY
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

---

## 🔒 Security Best Practices

### ⚠️ Critical Security Rules

1. **Never commit secrets to version control**
   - Use `.env.local` for local development
   - `.env.local` is already in `.gitignore`
   - Use deployment platform environment variables for production

2. **Use test/development keys when available**
   - Always use Stripe test keys (`sk_test_` prefix)
   - Use sandbox/test endpoints for other services

3. **Rotate keys regularly**
   - Generate new API keys monthly
   - Immediately revoke compromised keys

4. **Monitor usage**
   - Set up alerts for unusual API usage
   - Monitor free tier limits to avoid service interruption

5. **Least privilege principle**
   - Only grant necessary permissions for API keys
   - Use restricted API keys when possible

### Environment Variable Validation

The application will gracefully handle missing environment variables:
- Missing optional keys will disable related features
- Missing required keys will show helpful error messages
- No secrets will be logged to console or error messages

---

## 🔍 Troubleshooting

### Common Issues

1. **"Invalid API Key" errors**
   - Verify the key is correctly copied (no extra spaces)
   - Check if the key has expired or been revoked
   - Ensure you're using the correct environment (test vs production)

2. **Rate limit exceeded**
   - Check your usage against free tier limits
   - Implement exponential backoff in your code
   - Consider upgrading to a paid tier if needed

3. **Webhook delivery failures**
   - Verify webhook URL is publicly accessible
   - Check webhook secret matches exactly
   - Ensure proper HTTPS certificate

### Getting Help

- **Stripe**: [Stripe Support](https://support.stripe.com/)
- **Vercel**: [Vercel Support](https://vercel.com/help)
- **GitHub**: [GitHub Support](https://support.github.com/)
- **API Provider Documentation**: Check individual service documentation

---

## 📝 Quick Reference

**Copy and fill this checklist for setup**:

- [ ] Stripe test keys and webhook secret
- [ ] Alpha Vantage API key
- [ ] Finnhub API key  
- [ ] Polygon API key
- [ ] CoinGecko API key (optional)
- [ ] Twilio trial credentials
- [ ] SendGrid API key
- [ ] HubSpot private app token
- [ ] Calendly scheduling link
- [ ] Business success/cancel URLs
- [ ] OpenAI API key (optional)
- [ ] Vercel deployment tokens
- [ ] GitHub secrets configured
- [ ] Local `.env.local` file created
- [ ] Test deployment successful

**Environment file locations**:
- **Local development**: `.env.local` (create from `.env.local.example`)
- **Python scripts**: Export from `.env.local` or set manually
- **Vercel production**: Project Settings > Environment Variables
- **GitHub Actions**: Repository Settings > Secrets and Variables