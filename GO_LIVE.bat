@echo off
echo.
echo ==========================================
echo   SUGGESTLY ELITE - GO LIVE SCRIPT
echo ==========================================
echo.
echo This will deploy your homepage to the internet!
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed!
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed
echo.

REM Install dependencies if needed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    echo ✅ Dependencies installed
    echo.
)

REM Run the deployment script
echo 🚀 Starting deployment...
node deploy-live.js

echo.
echo Press any key to exit...
pause >nul




















