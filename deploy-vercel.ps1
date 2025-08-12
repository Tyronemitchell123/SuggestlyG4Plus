# ====== CONFIGURATION ======
$PROJECT_NAME = "suggestlyg4plus"
$DOMAIN_NAME = "suggestlyg4plus.io"
$ZIP_FILE = "suggestlyg4plus-live.zip"
$VERCEL_TEAM = ""  # Optional: add your Vercel team slug if needed

# ====== CHECK VERCEL CLI ======
Write-Host "🔍 Checking Vercel CLI..." -ForegroundColor Cyan
if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# ====== LOGIN ======
Write-Host "🔑 Logging in to Vercel..." -ForegroundColor Cyan
vercel login

# ====== DEPLOY PROJECT ======
Write-Host "🚀 Deploying project..." -ForegroundColor Cyan
if (Test-Path $ZIP_FILE) {
    Write-Host "📦 Extracting $ZIP_FILE..." -ForegroundColor Green
    Expand-Archive -Path $ZIP_FILE -DestinationPath $PROJECT_NAME -Force
    Set-Location $PROJECT_NAME
} else {
    Write-Host "❌ Zip file $ZIP_FILE not found!" -ForegroundColor Red
    exit 1
}

Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Green
if ($VERCEL_TEAM) {
    vercel --prod --confirm --name $PROJECT_NAME --scope $VERCEL_TEAM
} else {
    vercel --prod --confirm --name $PROJECT_NAME
}

# ====== ADD DOMAIN ======
Write-Host "🌐 Adding domain $DOMAIN_NAME to project..." -ForegroundColor Cyan
if ($VERCEL_TEAM) {
    vercel domains add $DOMAIN_NAME --scope $VERCEL_TEAM
    vercel domains rm $DOMAIN_NAME --scope $VERCEL_TEAM --yes 2>$null
    vercel domains add $DOMAIN_NAME --scope $VERCEL_TEAM
} else {
    vercel domains add $DOMAIN_NAME
    vercel domains rm $DOMAIN_NAME --yes 2>$null
    vercel domains add $DOMAIN_NAME
}

# ====== FORCE DOMAIN ASSIGNMENT ======
Write-Host "🔗 Assigning domain to project..." -ForegroundColor Cyan
if ($VERCEL_TEAM) {
    vercel alias $PROJECT_NAME $DOMAIN_NAME --scope $VERCEL_TEAM
} else {
    vercel alias $PROJECT_NAME $DOMAIN_NAME
}

# ====== DNS CHECK ======
Write-Host "🔍 Verifying DNS..." -ForegroundColor Cyan
nslookup $DOMAIN_NAME

Write-Host "✅ Done! $DOMAIN_NAME should now point to your live Vercel deployment." -ForegroundColor Green

