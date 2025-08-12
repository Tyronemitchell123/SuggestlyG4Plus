# PowerShell script for Windows deployment directory setup
# Run as Administrator

Write-Host "🔧 SETTING UP DEPLOYMENT DIRECTORY FOR WINDOWS" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green

# Check if running as Administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "❌ This script must be run as Administrator" -ForegroundColor Red
    exit 1
}

# Create deploy user if it doesn't exist
Write-Host "👤 Checking/creating deploy user..." -ForegroundColor Yellow
try {
    $password = ConvertTo-SecureString "Deploy123!" -AsPlainText -Force
    New-LocalUser -Name "deploy" -Password $password -Description "Deployment user for SuggestlyG4Plus" -AccountNeverExpires
    Write-Host "✅ Deploy user created successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Deploy user may already exist: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Add deploy user to Docker Users group
Write-Host "🐳 Adding deploy user to Docker Users group..." -ForegroundColor Yellow
try {
    Add-LocalGroupMember -Group "Docker Users" -Member "deploy"
    Write-Host "✅ Added to Docker Users group" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Docker Users group may not exist or user already in group" -ForegroundColor Yellow
}

# Create deployment directory
Write-Host "📁 Creating deployment directory..." -ForegroundColor Yellow
$deployPath = "C:\deploy\suggestlyg4plus"
New-Item -ItemType Directory -Path $deployPath -Force | Out-Null

# Set permissions for deploy user
Write-Host "🔐 Setting permissions..." -ForegroundColor Yellow
$acl = Get-Acl $deployPath
$accessRule = New-Object System.Security.AccessControl.FileSystemAccessRule("deploy", "FullControl", "ContainerInherit,ObjectInherit", "None", "Allow")
$acl.SetAccessRule($accessRule)
Set-Acl -Path $deployPath -AclObject $acl

# Clone repository
Write-Host "📋 Cloning repository..." -ForegroundColor Yellow
$repoUrl = "https://github.com/Tyronemitchell123/v2.git"
$branch = "suggestlyg4plus-v2.0"

try {
    # Check if git is available
    git --version | Out-Null
    
    # Clone the repository
    Set-Location $deployPath
    git clone -b $branch $repoUrl .
    Write-Host "✅ Repository cloned successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Git clone failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "📋 Manual steps:" -ForegroundColor Yellow
    Write-Host "1. Install Git for Windows" -ForegroundColor White
    Write-Host "2. Run: git clone -b $branch $repoUrl $deployPath" -ForegroundColor White
}

# Create deployment script for Windows
Write-Host "📝 Creating deployment script..." -ForegroundColor Yellow
$deployScript = @"
# PowerShell deployment script for SuggestlyG4Plus
Write-Host "🚀 DEPLOYING SUGGESTLY G4 PLUS ON WINDOWS" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

# Navigate to project directory
Set-Location "$deployPath"

# Pull latest changes
Write-Host "📥 Pulling latest changes..." -ForegroundColor Yellow
try {
    git pull origin $branch
    Write-Host "✅ Repository updated" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Could not pull latest changes: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Check if Docker Desktop is running
try {
    docker version | Out-Null
    Write-Host "✅ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not running. Please start Docker Desktop" -ForegroundColor Red
    exit 1
}

# Stop existing containers
Write-Host "🛑 Stopping existing containers..." -ForegroundColor Yellow
docker-compose down

# Build and start services
Write-Host "🔧 Building and starting services..." -ForegroundColor Yellow
docker-compose up --build -d

# Wait for services to be ready
Write-Host "⏳ Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# Check service status
Write-Host "🔍 Checking service status..." -ForegroundColor Yellow
docker-compose ps

# Test the application
Write-Host "🧪 Testing the application..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri "http://localhost:80" -Method Head
    Write-Host "✅ Application is responding" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Application may still be starting up" -ForegroundColor Yellow
}

Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "🌐 Your application is running at:" -ForegroundColor Cyan
Write-Host "   • Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   • Backend API: http://localhost:8080" -ForegroundColor White
Write-Host "   • Nginx Proxy: http://localhost:80" -ForegroundColor White
Write-Host "   • Custom Domain: https://suggestlyg4plus.io" -ForegroundColor White
"@

$deployScript | Out-File -FilePath "$deployPath\deploy.ps1" -Encoding UTF8

# Create batch file for easy execution
$batchContent = @"
@echo off
powershell -ExecutionPolicy Bypass -File "%~dp0deploy.ps1"
pause
"@

$batchContent | Out-File -FilePath "$deployPath\deploy.bat" -Encoding ASCII

# Create Windows Task Scheduler task for auto-start
Write-Host "⚙️ Creating Windows Task Scheduler task..." -ForegroundColor Yellow
$taskName = "SuggestlyG4Plus-Deploy"
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-ExecutionPolicy Bypass -File `"$deployPath\deploy.ps1`""
$trigger = New-ScheduledTaskTrigger -AtStartup
$principal = New-ScheduledTaskPrincipal -UserId "deploy" -LogonType Password -RunLevel Highest
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries

try {
    Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Principal $principal -Settings $settings -Force
    Write-Host "✅ Scheduled task created" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Could not create scheduled task: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "✅ DEPLOYMENT DIRECTORY SETUP COMPLETE!" -ForegroundColor Green
Write-Host "👤 Deploy user: deploy" -ForegroundColor Cyan
Write-Host "📁 Project location: $deployPath" -ForegroundColor Cyan
Write-Host "🚀 Deployment script: $deployPath\deploy.ps1" -ForegroundColor Cyan
Write-Host "⚙️ Windows Task: $taskName" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Switch to deploy user or run as deploy user" -ForegroundColor White
Write-Host "2. Navigate to project: cd $deployPath" -ForegroundColor White
Write-Host "3. Run deployment: .\deploy.ps1" -ForegroundColor White
Write-Host "4. Or double-click: deploy.bat" -ForegroundColor White
Write-Host "5. Or start task: schtasks /run /tn `"$taskName`"" -ForegroundColor White
Write-Host ""
Write-Host "🔑 Deploy user password: Deploy123!" -ForegroundColor Red
Write-Host "⚠️ Change this password after first login!" -ForegroundColor Red
Write-Host ""
Write-Host "🔗 Repository: $repoUrl" -ForegroundColor Cyan
Write-Host "🌿 Branch: $branch" -ForegroundColor Cyan


