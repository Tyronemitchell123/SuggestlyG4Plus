# SUGGESTLY ELITE - VERCEL ENVIRONMENT SETUP
# Setup environment variables for Vercel deployment

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "SUGGESTLY ELITE - VERCEL ENVIRONMENT SETUP" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

Write-Host "🔧 Setting up environment variables for Vercel deployment..." -ForegroundColor Yellow

# Get Vercel Token
Write-Host "`n🔐 VERCEL TOKEN SETUP:" -ForegroundColor Green
Write-Host "1. Go to https://vercel.com/account/tokens" -ForegroundColor White
Write-Host "2. Create a new token with 'Full Account' scope" -ForegroundColor White
Write-Host "3. Copy the token" -ForegroundColor White

$vercelToken = Read-Host "Enter your Vercel token"

if ($vercelToken) {
    $env:VERCEL_TOKEN = $vercelToken
    Write-Host "✅ VERCEL_TOKEN set" -ForegroundColor Green
} else {
    Write-Host "❌ VERCEL_TOKEN not provided" -ForegroundColor Red
    exit 1
}

# Get Project ID or Name
Write-Host "`n📁 PROJECT SETUP:" -ForegroundColor Green
Write-Host "You can use either PROJECT_ID or PROJECT_NAME" -ForegroundColor White
Write-Host "1. Go to your Vercel project dashboard" -ForegroundColor White
Write-Host "2. Find your project ID (starts with 'prj_') or use project name" -ForegroundColor White

$useProjectId = Read-Host "Use PROJECT_ID? (y/n)"

if ($useProjectId -eq "y" -or $useProjectId -eq "Y") {
    $projectId = Read-Host "Enter your PROJECT_ID (e.g., prj_xxxxx)"
    if ($projectId) {
        $env:PROJECT_ID = $projectId
        Write-Host "✅ PROJECT_ID set: $projectId" -ForegroundColor Green
    }
} else {
    $projectName = Read-Host "Enter your PROJECT_NAME"
    if ($projectName) {
        $env:PROJECT_NAME = $projectName
        Write-Host "✅ PROJECT_NAME set: $projectName" -ForegroundColor Green
    }
}

# Get Team Scope (optional)
Write-Host "`n👥 TEAM SCOPE (Optional):" -ForegroundColor Green
Write-Host "If you're using a team, enter your team slug" -ForegroundColor White
Write-Host "Leave blank if using personal account" -ForegroundColor White

$teamScope = Read-Host "Enter team slug (or press Enter to skip)"

if ($teamScope) {
    $env:VERCEL_SCOPE = $teamScope
    Write-Host "✅ VERCEL_SCOPE set: $teamScope" -ForegroundColor Green
}

# Set Domain (default)
$env:DOMAIN = "suggestlyg4plus.io"
Write-Host "✅ DOMAIN set: suggestlyg4plus.io" -ForegroundColor Green

# Set Redirect Mode
Write-Host "`n🔄 REDIRECT MODE:" -ForegroundColor Green
Write-Host "1. www_to_apex: www.suggestlyg4plus.io -> suggestlyg4plus.io" -ForegroundColor White
Write-Host "2. apex_to_www: suggestlyg4plus.io -> www.suggestlyg4plus.io" -ForegroundColor White

$redirectMode = Read-Host "Choose redirect mode (1 or 2, default: 1)"

if ($redirectMode -eq "2") {
    $env:REDIRECT_MODE = "apex_to_www"
    Write-Host "✅ REDIRECT_MODE set: apex_to_www" -ForegroundColor Green
} else {
    $env:REDIRECT_MODE = "www_to_apex"
    Write-Host "✅ REDIRECT_MODE set: www_to_apex" -ForegroundColor Green
}

# Save to file for future use
$envContent = @"
# SUGGESTLY ELITE - VERCEL ENVIRONMENT VARIABLES
# Generated on $(Get-Date)

`$env:VERCEL_TOKEN = "$vercelToken"
"@

if ($env:PROJECT_ID) {
    $envContent += "`n`$env:PROJECT_ID = `"$($env:PROJECT_ID)`""
} elseif ($env:PROJECT_NAME) {
    $envContent += "`n`$env:PROJECT_NAME = `"$($env:PROJECT_NAME)`""
}

if ($env:VERCEL_SCOPE) {
    $envContent += "`n`$env:VERCEL_SCOPE = `"$($env:VERCEL_SCOPE)`""
}

$envContent += @"

`$env:DOMAIN = "suggestlyg4plus.io"
`$env:REDIRECT_MODE = "$($env:REDIRECT_MODE)"

# To load these variables in future sessions, run:
# . .\vercel_env.ps1
"@

$envContent | Out-File -FilePath "vercel_env.ps1" -Encoding UTF8

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "SUGGESTLY ELITE - SETUP COMPLETE" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

Write-Host "✅ Environment variables configured" -ForegroundColor Green
Write-Host "✅ Configuration saved to: vercel_env.ps1" -ForegroundColor Green

Write-Host "`n🚀 READY TO DEPLOY:" -ForegroundColor Yellow
Write-Host "Run: .\vercel_force_dns.ps1" -ForegroundColor White

Write-Host "`n📋 CURRENT CONFIGURATION:" -ForegroundColor Green
Write-Host "Domain: $($env:DOMAIN)" -ForegroundColor White
Write-Host "Redirect Mode: $($env:REDIRECT_MODE)" -ForegroundColor White
if ($env:PROJECT_ID) {
    Write-Host "Project ID: $($env:PROJECT_ID)" -ForegroundColor White
} elseif ($env:PROJECT_NAME) {
    Write-Host "Project Name: $($env:PROJECT_NAME)" -ForegroundColor White
}
if ($env:VERCEL_SCOPE) {
    Write-Host "Team Scope: $($env:VERCEL_SCOPE)" -ForegroundColor White
}

Write-Host "`nAI AGENTS: Ready for domain takeover" -ForegroundColor Magenta
Write-Host "PERFORMANCE: Maximum force waiting" -ForegroundColor Magenta
Write-Host "SECURITY: Enterprise protection ready" -ForegroundColor Magenta
Write-Host "MONITORING: 24/7 surveillance ready" -ForegroundColor Magenta
Write-Host "==========================================" -ForegroundColor Cyan

