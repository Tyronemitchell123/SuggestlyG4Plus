#!/usr/bin/env python3
"""
DEPLOYMENT STATUS CHECKER
Real-time monitoring of deployment progress with MAXIMUM FORCE
"""

import requests
import json
import time
from datetime import datetime
import webbrowser
import os

class DeploymentStatusChecker:
    def __init__(self):
        self.domain = "suggestlyg4plus.io"
        self.vercel_domain = "suggestlyg4plus.vercel.app"  # Default Vercel domain
        self.status = {}
        
    def check_vercel_deployment(self):
        """Check if Vercel deployment is accessible"""
        try:
            # Check default Vercel domain
            response = requests.get(f"https://{self.vercel_domain}", timeout=10)
            return {
                "status": "🔥 ONLINE" if response.status_code == 200 else "❌ OFFLINE",
                "status_code": response.status_code,
                "response_time": response.elapsed.total_seconds(),
                "url": f"https://{self.vercel_domain}"
            }
        except Exception as e:
            return {
                "status": "❌ OFFLINE",
                "error": str(e),
                "url": f"https://{self.vercel_domain}"
            }
    
    def check_custom_domain(self):
        """Check if custom domain is accessible"""
        try:
            response = requests.get(f"https://{self.domain}", timeout=10)
            return {
                "status": "🔥 ONLINE" if response.status_code == 200 else "❌ OFFLINE",
                "status_code": response.status_code,
                "response_time": response.elapsed.total_seconds(),
                "url": f"https://{self.domain}"
            }
        except Exception as e:
            return {
                "status": "❌ OFFLINE",
                "error": str(e),
                "url": f"https://{self.domain}"
            }
    
    def check_ssl_certificate(self, domain):
        """Check SSL certificate status"""
        try:
            response = requests.get(f"https://{domain}", timeout=10)
            return "🔥 VALID" if response.url.startswith("https") else "❌ INVALID"
        except:
            return "❌ INVALID"
    
    def run_status_check(self):
        """Run comprehensive status check"""
        print("🔍 DEPLOYMENT STATUS CHECK WITH MAXIMUM FORCE")
        print("=" * 60)
        
        # Check Vercel deployment
        print("\n📊 Checking Vercel Deployment...")
        vercel_status = self.check_vercel_deployment()
        print(f"   Vercel Domain: {vercel_status['status']} ({vercel_status['url']})")
        if 'response_time' in vercel_status:
            print(f"   Response Time: {vercel_status['response_time']:.3f}s")
        
        # Check custom domain
        print("\n🌐 Checking Custom Domain...")
        custom_status = self.check_custom_domain()
        print(f"   Custom Domain: {custom_status['status']} ({custom_status['url']})")
        if 'response_time' in custom_status:
            print(f"   Response Time: {custom_status['response_time']:.3f}s")
        
        # Check SSL certificates
        print("\n🔒 Checking SSL Certificates...")
        vercel_ssl = self.check_ssl_certificate(self.vercel_domain)
        custom_ssl = self.check_ssl_certificate(self.domain)
        print(f"   Vercel SSL: {vercel_ssl}")
        print(f"   Custom Domain SSL: {custom_ssl}")
        
        # Overall status
        print("\n📈 OVERALL DEPLOYMENT STATUS:")
        if vercel_status['status'] == "🔥 ONLINE":
            print("   ✅ Vercel Deployment: SUCCESS")
        else:
            print("   ❌ Vercel Deployment: PENDING")
            
        if custom_status['status'] == "🔥 ONLINE":
            print("   ✅ Custom Domain: SUCCESS")
        else:
            print("   ⏳ Custom Domain: PENDING (DNS propagation may take 5-10 minutes)")
            
        if vercel_ssl == "🔥 VALID" and custom_ssl == "🔥 VALID":
            print("   ✅ SSL Certificates: SUCCESS")
        else:
            print("   ⏳ SSL Certificates: PENDING")
        
        # Save status
        status_data = {
            "timestamp": datetime.now().isoformat(),
            "vercel_deployment": vercel_status,
            "custom_domain": custom_status,
            "ssl_certificates": {
                "vercel": vercel_ssl,
                "custom": custom_ssl
            },
            "force_level": "MAXIMUM"
        }
        
        with open("deployment_status.json", "w", encoding="utf-8") as f:
            json.dump(status_data, f, indent=2)
            
        print(f"\n📊 Status saved to: deployment_status.json")
        
        return status_data
    
    def continuous_monitoring(self, interval=30):
        """Continuous monitoring with specified interval"""
        print(f"🔄 Starting continuous monitoring (checking every {interval} seconds)...")
        print("Press Ctrl+C to stop monitoring")
        
        try:
            while True:
                self.run_status_check()
                print(f"\n⏰ Next check in {interval} seconds...")
                time.sleep(interval)
                print("\n" + "="*60)
        except KeyboardInterrupt:
            print("\n🛑 Monitoring stopped by user")

def main():
    checker = DeploymentStatusChecker()
    
    print("🚀 DEPLOYMENT STATUS CHECKER WITH MAXIMUM FORCE")
    print("Choose an option:")
    print("1. Single status check")
    print("2. Continuous monitoring (every 30 seconds)")
    print("3. Open Vercel Dashboard")
    print("4. Open deployment guide")
    
    choice = input("\nEnter your choice (1-4): ").strip()
    
    if choice == "1":
        checker.run_status_check()
    elif choice == "2":
        checker.continuous_monitoring()
    elif choice == "3":
        webbrowser.open("https://vercel.com/dashboard")
        webbrowser.open("https://vercel.com/new")
        print("🌐 Vercel Dashboard opened!")
    elif choice == "4":
        webbrowser.open("file://" + os.path.abspath("DEPLOYMENT_COMPLETION_GUIDE.md"))
        print("📖 Deployment guide opened!")
    else:
        print("Invalid choice. Running single status check...")
        checker.run_status_check()

if __name__ == "__main__":
    main()





