Write-Host "🚀 Deploying SUGGESTLY ELITE to Render..." -ForegroundColor Green

# Check if render CLI is installed
try {
    $renderVersion = render --version
    Write-Host "✅ Render CLI found: $renderVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Render CLI not found. Please install from: https://render.com/docs/install-cli" -ForegroundColor Red
    Write-Host "📥 Download and install the Render CLI for Windows" -ForegroundColor Yellow
    exit 1
}

# Login to Render (if not already logged in)
Write-Host "🔐 Logging into Render..." -ForegroundColor Yellow
render login

# Deploy to Render
Write-Host "📦 Deploying application..." -ForegroundColor Yellow
render deploy

Write-Host "✅ Render deployment initiated!" -ForegroundColor Green
Write-Host "🌐 Check your Render dashboard for deployment status" -ForegroundColor Cyan
Write-Host "📊 Monitor logs: render logs --service suggestly-elite-business-platform" -ForegroundColor Cyan
