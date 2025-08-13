# SuggestlyG4Plus v2.0 AI-Powered Feedback Platform

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Dependencies
- Python dependencies: `pip install -r requirements.txt` -- takes 1.5 minutes. NEVER CANCEL. Set timeout to 3+ minutes.
- Node.js dependencies: `npm install` -- takes 2 minutes. NEVER CANCEL. Set timeout to 4+ minutes.
- Security note: One critical npm vulnerability exists in Next.js 14.0.0 - document but do not fix unless required by task.

### Build Commands
- Next.js frontend: `npm run build` -- takes 19 seconds. NEVER CANCEL. Set timeout to 2+ minutes.
- Python linting: `flake8 . --count --max-line-length=120 --exclude=.git,__pycache__,.next,node_modules` -- completes with 3000+ style issues (expected).
- Next.js linting: `npm run lint` -- requires interactive setup on first run. Use default "Strict" option.

### Development and Production Servers
- Next.js dev server: `npm run dev` -- starts on http://localhost:3000 in ~1.5 seconds.
- Next.js production: `npm run build && npm run start` -- build takes 19 seconds, start takes 0.3 seconds.
- Python backend test: `python test_server.py` -- validates FastAPI with 7 AI agents on http://127.0.0.1:8000.
- Main backend: `python src/main_ultra_secure.py` -- initializes multi-agent system and database.

### Deployment and Infrastructure  
- Quick deployment: `bash instant_deploy.sh` -- takes 45 seconds but requires AWS credentials configuration.
- AWS deployment: `python aws_deployment_system.py` and `python deploy_to_aws.py` -- require AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables.
- Infrastructure deployment: Uses Terraform, AWS services (EC2, Lambda, RDS, S3), and multiple platforms (Vercel, Render, Railway, Netlify).

## Validation

- ALWAYS test the Next.js build after making changes: `npm run build`
- ALWAYS test the backend startup after Python changes: `python test_server.py`
- ALWAYS run through complete user scenarios: Start dev server, verify homepage loads, test API endpoints.
- Run linting before commits: `npm run lint` and `flake8 .` (expect many existing style issues - only fix new ones).
- Always test both development and production builds to ensure compatibility.

## Critical Technical Details

### Dependencies and Versions
- Python: 3.12.3 (compatible with all packages)
- Node.js: 20.19.4, npm: 10.8.2
- FastAPI: 0.115.6 with Uvicorn server
- Next.js: 14.0.0 with React 18
- Key Python packages: pandas, numpy, scikit-learn, yfinance, stripe, playwright

### Required Configuration Files
- `lib/stripe.ts` -- Must exist with Stripe API configuration (created during validation)
- `.env` files for environment variables (AWS keys, Stripe keys, etc.)
- No Google Fonts in _app.tsx due to network restrictions

### Build Timeouts and Performance
- NEVER CANCEL: Python pip install takes 1.5 minutes. Set timeout to 4+ minutes.
- NEVER CANCEL: Node.js npm install takes 2 minutes. Set timeout to 5+ minutes.
- NEVER CANCEL: Next.js build takes 19 seconds. Set timeout to 3+ minutes.
- NEVER CANCEL: Instant deployment takes 45 seconds. Set timeout to 10+ minutes.
- NEVER CANCEL: Any AWS deployment commands take 2-5 minutes. Set timeout to 15+ minutes.

## Common Tasks

### Repository Structure Overview
- `src/main_ultra_secure.py` -- Main FastAPI backend (1791+ lines) with 7 AI agents
- `pages/` -- Next.js frontend pages and API routes
- `lib/stripe.ts` -- Stripe payment integration
- `.github/workflows/` -- 18 automated CI/CD workflows
- `requirements.txt` -- 23 Python dependencies
- `package.json` -- Next.js/React dependencies
- `instant_deploy.sh` -- One-click deployment script

### AI Agents System
The backend runs 7 specialized AI agents:
- ANALYST: Financial data analysis and stock research
- INTEL: Market intelligence and sentiment analysis  
- RESEARCH: Text analysis and research processing
- RISK: Risk assessment and portfolio analysis
- DATA: Statistical analysis and data processing
- MONITOR: System monitoring and performance analysis
- STRATEGY: Strategic planning and business analysis

### GitHub Actions Workflows
18 workflows handle:
- CI/CD for backend and frontend
- Multi-platform deployment (AWS, Vercel, Netlify, Railway, Render)
- Security scanning and code quality
- Terraform infrastructure automation
- Health monitoring and rollback capabilities
- Total deployment time: 6-10 minutes across all platforms

### Manual Validation Scenarios
After making changes, ALWAYS test:
1. Backend startup: `python test_server.py` should show "✅ Real agents imported: 7 agents"
2. Frontend build: `npm run build` should complete without errors
3. Development server: `npm run dev` should start on localhost:3000
4. API functionality: Backend should initialize database and all 7 AI agents
5. Payment integration: Stripe API routes should be accessible (requires valid API keys)

### Known Issues and Workarounds
- Google Fonts removed from _app.tsx due to network restrictions -- this is correct
- Next.js has critical security vulnerabilities -- document but don't fix unless task-specific
- Flake8 reports 3000+ style issues -- this is expected, only fix new violations
- AWS deployment requires manual credential configuration
- Some deployment scripts may timeout due to network limitations -- use longer timeouts

### Environment Setup
- Python virtual environment recommended but not required
- AWS CLI installation handled by deployment scripts
- Playwright browsers: `playwright install` if needed for testing
- All major dependencies are pinned to specific versions in requirements.txt

## Project Context
SuggestlyG4Plus is a comprehensive AI-powered feedback platform with:
- Multi-agent AI system for financial analysis and recommendations
- Real-time WebSocket communication
- Stripe payment integration
- Advanced security features
- Multi-platform deployment automation
- Revenue-generating capabilities targeting enterprise customers

Total project size: 180+ files with 50 Python files and 47,000+ JavaScript/TypeScript files, representing a comprehensive full-stack application.