# Deployment Secrets

Add these GitHub repository secrets for automated deploys. Choose ONE path:

Option A — tokens (full control):
- VERCEL_TOKEN: Vercel personal token
- VERCEL_ORG_ID: Vercel organization ID
- VERCEL_PROJECT_ID_FRONTEND: Vercel project ID for the `suggestly-ai-platform` site
- RENDER_API_KEY: Render API key
- RENDER_SERVICE_ID: Render service ID for the `suggestlyg4plus-api` web service

Option B — zero-token hooks (easiest):
- VERCEL_DEPLOY_HOOK_URL: Project → Settings → Deploy Hooks → Production
- RENDER_DEPLOY_HOOK_URL: Service → Settings → Deploy Hook

After adding, pushes to `main` will:
- Run CI
- Deploy frontend to Vercel
- Trigger Render deploy for backend


