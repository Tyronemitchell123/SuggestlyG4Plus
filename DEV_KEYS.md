# Development API Keys and Free-Tier Setup

This repository never commits real API keys. Use the placeholders in `.env.example` for local dev, and add real secrets in your local `.env` (ignored), Vercel Project Settings, or GitHub Actions/Org secrets.

Important: Do not use placeholders in production. See guardrails below.

## Quick links
- Alpha Vantage (demo key): https://www.alphavantage.co/support/#api-key
  - "demo" works for symbols like AAPL in dev.
- Coingecko (public): https://www.coingecko.com/en/api/documentation
  - Many endpoints require no key. Leave `COINGECKO_API_KEY` empty.
- Finnhub (free tier): https://finnhub.io/register
- Polygon (starter tier): https://polygon.io/pricing
- Stripe (test keys): https://dashboard.stripe.com/apikeys
  - Use `sk_test_...` and webhook secret `whsec_...` for local dev.
- Twilio (trial): https://www.twilio.com/try-twilio
- SendGrid (free): https://signup.sendgrid.com/
- OpenAI (account): https://platform.openai.com/
  - No free API keys guaranteed. Use your own paid key; leave empty to skip in dev.

## How to use locally
1. Copy `.env.example` to `.env` and fill any keys you have.
2. Run the app. Features without keys will log a warning and be skipped in dev.

## Production guardrails
- The app will fail fast in production if placeholder keys are detected (e.g., `sk_test_xxx`, `whsec_xxx`, `demo`). Configure real secrets via environment variables in your hosting provider.