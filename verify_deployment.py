#!/usr/bin/env python3
"""
🔍 VERCEL DEPLOYMENT VERIFICATION
SuggestlyG4Plus v2.0 - Custom Domain: suggestlyg4plus.io

This script verifies the deployment status and checks domain functionality.
"""

import urllib.request
import socket
import json
import webbrowser
from datetime import datetime

def check_dns_propagation():
    """Check DNS propagation for the domain"""
    print("🔍 Checking DNS propagation...")
    
    domains = [
        "suggestlyg4plus.io",
        "www.suggestlyg4plus.io"
    ]
    
    for domain in domains:
        try:
            ip = socket.gethostbyname(domain)
            print(f"✅ {domain} -> {ip}")
        except socket.gaierror:
            print(f"❌ {domain} - DNS not propagated yet")
        except Exception as e:
            print(f"⚠️ {domain} - Error: {e}")

def check_website_accessibility():
    """Check if the website is accessible"""
    print("\n🌐 Checking website accessibility...")
    
    urls = [
        "https://suggestlyg4plus.io",
        "https://www.suggestlyg4plus.io"
    ]
    
    for url in urls:
        try:
            response = urllib.request.urlopen(url, timeout=10)
            status = response.getcode()
            if status == 200:
                print(f"✅ {url} - Status: {status} (OK)")
            else:
                print(f"⚠️ {url} - Status: {status}")
        except Exception as e:
            print(f"❌ {url} - Not accessible: {e}")

def check_ssl_certificate():
    """Check SSL certificate status"""
    print("\n🔒 Checking SSL certificates...")
    
    urls = [
        "https://suggestlyg4plus.io",
        "https://www.suggestlyg4plus.io"
    ]
    
    for url in domains:
        try:
            response = urllib.request.urlopen(url, timeout=10)
            if response.url.startswith('https'):
                print(f"✅ {url} - SSL certificate active")
            else:
                print(f"⚠️ {url} - Redirected to HTTP")
        except Exception as e:
            print(f"❌ {url} - SSL check failed: {e}")

def open_vercel_dashboard():
    """Open Vercel dashboard for manual verification"""
    print("\n📊 Opening Vercel dashboard...")
    webbrowser.open("https://vercel.com/dashboard")
    webbrowser.open("https://vercel.com/dashboard/projects/suggestlyg4plus")

def create_verification_report():
    """Create a verification report"""
    print("\n📋 Creating verification report...")
    
    report = {
        "verification_time": datetime.now().isoformat(),
        "domain": "suggestlyg4plus.io",
        "deployment_platform": "Vercel",
        "checks_performed": [
            "DNS propagation",
            "Website accessibility",
            "SSL certificate",
            "Vercel dashboard"
        ],
        "expected_urls": {
            "main_domain": "https://suggestlyg4plus.io",
            "www_domain": "https://www.suggestlyg4plus.io",
            "vercel_dashboard": "https://vercel.com/dashboard"
        },
        "next_steps": [
            "Monitor DNS propagation (24-48 hours)",
            "Test all application features",
            "Configure monitoring alerts",
            "Set up analytics tracking"
        ]
    }
    
    with open("deployment_verification_report.json", "w") as f:
        json.dump(report, f, indent=2)
    
    print("✅ Verification report created: deployment_verification_report.json")

def main():
    """Main verification function"""
    print("🔍 VERCEL DEPLOYMENT VERIFICATION")
    print("=" * 50)
    print("Domain: suggestlyg4plus.io")
    print("Platform: Vercel")
    print("=" * 50)
    
    # Perform verification checks
    check_dns_propagation()
    check_website_accessibility()
    check_ssl_certificate()
    
    # Open Vercel dashboard
    open_vercel_dashboard()
    
    # Create verification report
    create_verification_report()
    
    print("\n🎉 VERIFICATION COMPLETED!")
    print("=" * 50)
    print("📊 Check deployment_verification_report.json for details")
    print("🌐 Vercel dashboard opened for manual verification")
    print()
    print("📋 If deployment is not working:")
    print("1. Check Vercel dashboard for build logs")
    print("2. Verify DNS records in your domain registrar")
    print("3. Wait for DNS propagation (24-48 hours)")
    print("4. Contact Vercel support if needed")

if __name__ == "__main__":
    main()

