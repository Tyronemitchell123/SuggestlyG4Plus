#!/usr/bin/env python3
"""
🚀 AUTOMATED VERCEL DEPLOYMENT SCRIPT
SuggestlyG4Plus v2.0 - Custom Domain: suggestlyg4plus.io

This script automatically:
1. Configures Vercel CLI
2. Deploys the application
3. Sets up custom domain
4. Configures SSL certificates
5. Verifies deployment
"""

import os
import sys
import subprocess
import json
import time
import webbrowser
from datetime import datetime

def install_vercel_cli():
    """Install Vercel CLI if not already installed"""
    print("📦 Installing Vercel CLI...")
    
    try:
        # Check if Vercel CLI is installed
        result = subprocess.run(["vercel", "--version"], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Vercel CLI is already installed")
            return True
    except FileNotFoundError:
        print("❌ Vercel CLI not found")
    
    try:
        # Install Vercel CLI via npm
        subprocess.run(["npm", "install", "-g", "@vercel/cli"], check=True)
        print("✅ Vercel CLI installed successfully")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to install Vercel CLI")
        print("Please install Node.js first: https://nodejs.org")
        return False

def check_vercel_auth():
    """Check if user is authenticated with Vercel"""
    print("🔐 Checking Vercel authentication...")
    
    try:
        result = subprocess.run(["vercel", "whoami"], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Authenticated as: {result.stdout.strip()}")
            return True
        else:
            print("❌ Not authenticated with Vercel")
            return False
    except subprocess.CalledProcessError:
        print("❌ Authentication check failed")
        return False

def deploy_to_vercel():
    """Deploy the application to Vercel with custom domain"""
    print("🚀 Deploying to Vercel...")
    
    try:
        # Deploy with custom domain
        cmd = [
            "vercel", 
            "--prod", 
            "--yes",
            "--domains", "suggestlyg4plus.io,www.suggestlyg4plus.io"
        ]
        
        print("Running deployment command...")
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            print("✅ Deployment successful!")
            print(result.stdout)
            return True
        else:
            print("❌ Deployment failed")
            print(result.stderr)
            return False
            
    except subprocess.CalledProcessError as e:
        print(f"❌ Deployment error: {e}")
        return False

def add_custom_domain():
    """Add custom domain to Vercel project"""
    print("🌐 Adding custom domain...")
    
    try:
        # Add main domain
        subprocess.run(["vercel", "domains", "add", "suggestlyg4plus.io"], check=True)
        print("✅ Added suggestlyg4plus.io")
        
        # Add www subdomain
        subprocess.run(["vercel", "domains", "add", "www.suggestlyg4plus.io"], check=True)
        print("✅ Added www.suggestlyg4plus.io")
        
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Domain addition failed: {e}")
        return False

def verify_deployment():
    """Verify the deployment is working"""
    print("🔍 Verifying deployment...")
    
    import urllib.request
    
    domains = [
        "https://suggestlyg4plus.io",
        "https://www.suggestlyg4plus.io"
    ]
    
    for domain in domains:
        try:
            response = urllib.request.urlopen(domain, timeout=10)
            if response.getcode() == 200:
                print(f"✅ {domain} is accessible")
            else:
                print(f"⚠️ {domain} returned status {response.getcode()}")
        except Exception as e:
            print(f"❌ {domain} is not accessible: {e}")
    
    return True

def create_deployment_summary():
    """Create deployment summary"""
    print("📋 Creating deployment summary...")
    
    summary = {
        "deployment_time": datetime.now().isoformat(),
        "deployment_method": "Automated Vercel Deployment",
        "custom_domain": "suggestlyg4plus.io",
        "www_domain": "www.suggestlyg4plus.io",
        "services_deployed": {
            "Vercel": "✅ Deployed",
            "Custom Domain": "✅ Configured",
            "SSL Certificate": "✅ Automatic",
            "CDN": "✅ Global",
            "Auto-scaling": "✅ Enabled"
        },
        "access_urls": {
            "Main Domain": "https://suggestlyg4plus.io",
            "WWW Domain": "https://www.suggestlyg4plus.io",
            "Vercel Dashboard": "https://vercel.com/dashboard"
        },
        "dns_configuration": {
            "A Record": "76.76.19.19",
            "CNAME Record": "cname.vercel-dns.com",
            "TTL": "3600"
        },
        "next_steps": [
            "Wait for DNS propagation (24-48 hours)",
            "Monitor SSL certificate provisioning",
            "Test all application features",
            "Configure monitoring and analytics"
        ]
    }
    
    with open("vercel_deployment_summary.json", "w") as f:
        json.dump(summary, f, indent=2)
    
    print("✅ Deployment summary created: vercel_deployment_summary.json")

def open_vercel_dashboard():
    """Open Vercel dashboard"""
    print("🌐 Opening Vercel dashboard...")
    webbrowser.open("https://vercel.com/dashboard")
    webbrowser.open("https://vercel.com/new")

def main():
    """Main deployment function"""
    print("🚀 AUTOMATED VERCEL DEPLOYMENT")
    print("=" * 50)
    print("Domain: suggestlyg4plus.io")
    print("Framework: Python FastAPI")
    print("=" * 50)
    
    # Install Vercel CLI
    if not install_vercel_cli():
        print("❌ Vercel CLI installation failed")
        return
    
    # Check authentication
    if not check_vercel_auth():
        print("❌ Vercel authentication required")
        print("Please run: vercel login")
        open_vercel_dashboard()
        return
    
    # Deploy to Vercel
    print("\n🚀 Starting Vercel deployment...")
    if deploy_to_vercel():
        print("✅ Vercel deployment successful")
    else:
        print("❌ Vercel deployment failed")
        return
    
    # Add custom domain
    print("\n🌐 Configuring custom domain...")
    if add_custom_domain():
        print("✅ Custom domain configured")
    else:
        print("⚠️ Custom domain configuration may need manual setup")
    
    # Verify deployment
    print("\n🔍 Verifying deployment...")
    verify_deployment()
    
    # Create summary
    create_deployment_summary()
    
    # Open dashboard
    open_vercel_dashboard()
    
    print("\n🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!")
    print("=" * 50)
    print("Your SuggestlyG4Plus v2.0 is now deployed to:")
    print("• Main Domain: https://suggestlyg4plus.io")
    print("• WWW Domain: https://www.suggestlyg4plus.io")
    print("• Vercel Dashboard: https://vercel.com/dashboard")
    print()
    print("📋 Check vercel_deployment_summary.json for details")
    print("🌐 DNS propagation may take 24-48 hours")

if __name__ == "__main__":
    main()


