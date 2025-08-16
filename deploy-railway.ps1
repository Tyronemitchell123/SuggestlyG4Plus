Write-Host "🚀 Deploying SUGGESTLY ELITE to Railway..." -ForegroundColor Green

# Check if Railway CLI is installed
try {
    $railwayVersion = railway --version
    Write-Host "✅ Railway CLI found: $railwayVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Railway CLI not found. Installing..." -ForegroundColor Yellow
    Write-Host "📥 Installing Railway CLI..." -ForegroundColor Cyan
    npm install -g @railway/cli
}

# Check if logged in to Railway
try {
    $user = railway whoami
    Write-Host "✅ Logged in as: $user" -ForegroundColor Green
} catch {
    Write-Host "🔐 Logging into Railway..." -ForegroundColor Yellow
    railway login
}

# Check if project exists
try {
    $project = railway status
    Write-Host "✅ Connected to project: $project" -ForegroundColor Green
} catch {
    Write-Host "📦 Initializing Railway project..." -ForegroundColor Yellow
    railway init
}

# Deploy to Railway
Write-Host "📤 Deploying to Railway..." -ForegroundColor Yellow
railway up

# Get the deployment URL
Write-Host "🌐 Getting deployment URL..." -ForegroundColor Yellow
$url = railway domain
Write-Host "✅ Deployed to: $url" -ForegroundColor Green

# Open the deployed app
Write-Host "🔗 Opening deployed application..." -ForegroundColor Yellow
Start-Process $url

Write-Host "✅ Railway deployment completed!" -ForegroundColor Green
Write-Host "📊 View logs: railway logs" -ForegroundColor Cyan
Write-Host "🔧 Manage project: https://railway.app/dashboard" -ForegroundColor Cyan
Write-Host "🌐 Live URL: $url" -ForegroundColor Cyan
