#!/usr/bin/env python3
"""
🚄 RAILWAY DEPLOYMENT SCRIPT
SuggestlyG4Plus v2.0 - Alternative to Vercel

This script helps deploy to Railway when Vercel authentication fails.
"""

import os
import json
import webbrowser
import subprocess
from datetime import datetime

def create_railway_config():
    """Create Railway configuration files"""
    print("📝 Creating Railway configuration...")
    
    # Create railway.json
    railway_config = {
        "build": {
            "builder": "nixpacks"
        },
        "deploy": {
            "startCommand": "uvicorn src.main_ultra_secure:app --host 0.0.0.0 --port $PORT",
            "restartPolicyType": "ON_FAILURE",
            "restartPolicyMaxRetries": 10
        }
    }
    
    with open("railway.json", "w") as f:
        json.dump(railway_config, f, indent=2)
    
    # Create Procfile for Railway
    procfile_content = "web: uvicorn src.main_ultra_secure:app --host 0.0.0.0 --port $PORT"
    with open("Procfile", "w") as f:
        f.write(procfile_content)
    
    print("✅ Railway configuration created")

def create_deployment_instructions():
    """Create Railway deployment instructions"""
    print("📋 Creating Railway deployment instructions...")
    
    instructions = {
        "deployment_time": datetime.now().isoformat(),
        "platform": "Railway",
        "domain": "suggestlyg4plus.io",
        "repository": "tyronemitchell123-group/extracted",
        
        "step_by_step_instructions": [
            {
                "step": 1,
                "title": "Install Railway CLI",
                "command": "npm install -g @railway/cli",
                "description": "Install Railway CLI globally"
            },
            {
                "step": 2,
                "title": "Login to Railway",
                "command": "railway login",
                "description": "Authenticate with Railway"
            },
            {
                "step": 3,
                "title": "Initialize Project",
                "command": "railway init",
                "description": "Initialize Railway project"
            },
            {
                "step": 4,
                "title": "Deploy to Railway",
                "command": "railway up",
                "description": "Deploy the application"
            },
            {
                "step": 5,
                "title": "Add Custom Domain",
                "action": "Go to Railway dashboard > Domains",
                "description": "Add suggestlyg4plus.io domain"
            }
        ],
        
        "environment_variables": {
            "PORT": "8000",
            "PYTHONPATH": ".",
            "LIGHT_MODE": "1"
        },
        
        "expected_urls": {
            "railway_app": "https://suggestlyg4plus-production.up.railway.app",
            "custom_domain": "https://suggestlyg4plus.io",
            "railway_dashboard": "https://railway.app/dashboard"
        }
    }
    
    with open("railway_deployment_instructions.json", "w") as f:
        json.dump(instructions, f, indent=2)
    
    print("✅ Railway deployment instructions created")

def open_railway_resources():
    """Open Railway resources in browser"""
    print("🌐 Opening Railway resources...")
    
    urls = [
        "https://railway.app",
        "https://railway.app/dashboard",
        "https://railway.app/docs",
        "https://railway.app/docs/deploy/deployments"
    ]
    
    for url in urls:
        try:
            webbrowser.open(url)
        except Exception as e:
            print(f"⚠️ Could not open {url}: {e}")

def create_railway_deploy_script():
    """Create a Railway deployment script"""
    print("⚡ Creating Railway deployment script...")
    
    script_content = """#!/bin/bash
# Railway Deployment Script for SuggestlyG4Plus v2.0

echo "🚄 Railway Deployment for SuggestlyG4Plus v2.0"
echo "=============================================="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "Logging in to Railway..."
railway login

# Initialize project
echo "Initializing Railway project..."
railway init

# Deploy to Railway
echo "Deploying to Railway..."
railway up

echo "✅ Deployment completed!"
echo "🌐 Check your Railway dashboard for the deployment URL"
echo "🔗 Add custom domain: suggestlyg4plus.io"
"""
    
    with open("deploy_railway.sh", "w", encoding='utf-8') as f:
        f.write(script_content)
    
    # Make executable on Unix systems
    try:
        os.chmod("deploy_railway.sh", 0o755)
    except:
        pass
    
    print("✅ Railway deployment script created: deploy_railway.sh")

def main():
    """Main Railway deployment function"""
    print("🚄 RAILWAY DEPLOYMENT SETUP")
    print("=" * 50)
    print("Platform: Railway")
    print("Domain: suggestlyg4plus.io")
    print("Repository: tyronemitchell123-group/extracted")
    print("=" * 50)
    
    # Create Railway configuration
    create_railway_config()
    
    # Create deployment instructions
    create_deployment_instructions()
    
    # Create deployment script
    create_railway_deploy_script()
    
    # Open Railway resources
    open_railway_resources()
    
    print("\n🎉 RAILWAY DEPLOYMENT SETUP COMPLETED!")
    print("=" * 50)
    print("✅ Railway configuration created")
    print("✅ Deployment instructions created")
    print("✅ Deployment script created")
    print("✅ Railway resources opened in browser")
    print()
    print("📋 NEXT STEPS:")
    print("1. Railway dashboard opened in browser")
    print("2. Run: npm install -g @railway/cli")
    print("3. Run: railway login")
    print("4. Run: railway init")
    print("5. Run: railway up")
    print("6. Add custom domain: suggestlyg4plus.io")
    print()
    print("🌐 Your site will be available at:")
    print("   • Railway URL: https://suggestlyg4plus-production.up.railway.app")
    print("   • Custom Domain: https://suggestlyg4plus.io")
    print()
    print("📊 Check railway_deployment_instructions.json for complete details")

if __name__ == "__main__":
    main()
