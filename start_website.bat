@echo off
echo 🚀 Starting Suggestly Website...
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Python found - starting local server...
    echo 🌐 Website will be available at: http://localhost:8000
    echo 📁 Serving files from current directory
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
) else (
    echo ❌ Python not found
    echo.
    echo Alternative options:
    echo 1. Install Python from https://python.org
    echo 2. Use a local web server like XAMPP or WAMP
    echo 3. Open index.html directly in your browser
    echo.
    pause
)


