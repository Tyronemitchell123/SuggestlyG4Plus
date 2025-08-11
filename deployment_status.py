#!/usr/bin/env python3
"""
📊 VERCEL DEPLOYMENT STATUS MONITOR
SuggestlyG4Plus v2.0 - Custom Domain: suggestlyg4plus.io

This script monitors the deployment status and provides real-time updates.
"""

import urllib.request
import socket
import json
import webbrowser
import time
from datetime import datetime

class DeploymentMonitor:
    def __init__(self):
        self.domain = "suggestlyg4plus.io"
        self.www_domain = "www.suggestlyg4plus.io"
        self.vercel_dashboard = "https://vercel.com/dashboard"
        self.status = {
            "dns_propagation": False,
            "website_accessible": False,
            "ssl_active": False,
            "vercel_deployed": False
        }
    
    def check_dns(self):
        """Check DNS propagation status"""
        print("🔍 Checking DNS propagation...")
        
        domains = [self.domain, self.www_domain]
        dns_ok = True
        
        for domain in domains:
            try:
                ip = socket.gethostbyname(domain)
                print(f"✅ {domain} -> {ip}")
                if "76.76.19" in ip or "vercel" in ip.lower():
                    print(f"   ✅ {domain} points to Vercel")
                else:
                    print(f"   ⚠️ {domain} may not be configured for Vercel")
            except socket.gaierror:
                print(f"❌ {domain} - DNS not propagated yet")
                dns_ok = False
            except Exception as e:
                print(f"⚠️ {domain} - Error: {e}")
                dns_ok = False
        
        self.status["dns_propagation"] = dns_ok
        return dns_ok
    
    def check_website(self):
        """Check website accessibility"""
        print("\n🌐 Checking website accessibility...")
        
        urls = [
            f"https://{self.domain}",
            f"https://{self.www_domain}"
        ]
        
        website_ok = True
        
        for url in urls:
            try:
                response = urllib.request.urlopen(url, timeout=10)
                status = response.getcode()
                if status == 200:
                    print(f"✅ {url} - Status: {status} (OK)")
                else:
                    print(f"⚠️ {url} - Status: {status}")
                    website_ok = False
            except Exception as e:
                print(f"❌ {url} - Not accessible: {e}")
                website_ok = False
        
        self.status["website_accessible"] = website_ok
        return website_ok
    
    def check_ssl(self):
        """Check SSL certificate status"""
        print("\n🔒 Checking SSL certificates...")
        
        urls = [
            f"https://{self.domain}",
            f"https://{self.www_domain}"
        ]
        
        ssl_ok = True
        
        for url in urls:
            try:
                response = urllib.request.urlopen(url, timeout=10)
                if response.url.startswith('https'):
                    print(f"✅ {url} - SSL certificate active")
                else:
                    print(f"⚠️ {url} - Redirected to HTTP")
                    ssl_ok = False
            except Exception as e:
                print(f"❌ {url} - SSL check failed: {e}")
                ssl_ok = False
        
        self.status["ssl_active"] = ssl_ok
        return ssl_ok
    
    def check_vercel_deployment(self):
        """Check Vercel deployment status"""
        print("\n🚀 Checking Vercel deployment status...")
        
        # Try to access the main domain
        try:
            response = urllib.request.urlopen(f"https://{self.domain}", timeout=10)
            content = response.read().decode('utf-8', errors='ignore')
            
            # Check for Vercel indicators
            if "vercel" in content.lower() or "suggestly" in content.lower():
                print(f"✅ {self.domain} - Vercel deployment detected")
                self.status["vercel_deployed"] = True
                return True
            else:
                print(f"⚠️ {self.domain} - Content doesn't match expected")
                return False
        except Exception as e:
            print(f"❌ {self.domain} - Deployment check failed: {e}")
            return False
    
    def generate_status_report(self):
        """Generate comprehensive status report"""
        print("\n📊 Generating deployment status report...")
        
        report = {
            "timestamp": datetime.now().isoformat(),
            "domain": self.domain,
            "deployment_platform": "Vercel",
            "status_summary": {
                "dns_propagation": self.status["dns_propagation"],
                "website_accessible": self.status["website_accessible"],
                "ssl_active": self.status["ssl_active"],
                "vercel_deployed": self.status["vercel_deployed"]
            },
            "overall_status": all(self.status.values()),
            "urls": {
                "main_domain": f"https://{self.domain}",
                "www_domain": f"https://{self.www_domain}",
                "vercel_dashboard": self.vercel_dashboard
            },
            "next_actions": []
        }
        
        # Add next actions based on status
        if not self.status["dns_propagation"]:
            report["next_actions"].append("Configure DNS records in domain registrar")
            report["next_actions"].append("Wait for DNS propagation (24-48 hours)")
        
        if not self.status["website_accessible"]:
            report["next_actions"].append("Check Vercel dashboard for deployment status")
            report["next_actions"].append("Verify project configuration in Vercel")
        
        if not self.status["ssl_active"]:
            report["next_actions"].append("SSL certificates may take 24-48 hours to provision")
        
        if not self.status["vercel_deployed"]:
            report["next_actions"].append("Deploy project to Vercel")
            report["next_actions"].append("Check build logs in Vercel dashboard")
        
        if all(self.status.values()):
            report["next_actions"].append("✅ Deployment successful! Test all features")
            report["next_actions"].append("Configure monitoring and analytics")
        
        with open("deployment_status_report.json", "w") as f:
            json.dump(report, f, indent=2)
        
        print("✅ Status report created: deployment_status_report.json")
        return report
    
    def display_summary(self):
        """Display deployment summary"""
        print("\n" + "="*60)
        print("📊 DEPLOYMENT STATUS SUMMARY")
        print("="*60)
        
        total_checks = len(self.status)
        passed_checks = sum(self.status.values())
        
        print(f"Domain: {self.domain}")
        print(f"Platform: Vercel")
        print(f"Status: {passed_checks}/{total_checks} checks passed")
        print()
        
        for check, status in self.status.items():
            icon = "✅" if status else "❌"
            print(f"{icon} {check.replace('_', ' ').title()}")
        
        print()
        
        if all(self.status.values()):
            print("🎉 DEPLOYMENT SUCCESSFUL!")
            print(f"🌐 Your site is live at: https://{self.domain}")
        else:
            print("⚠️ DEPLOYMENT IN PROGRESS")
            print("📋 Check the status report for next steps")
        
        print("="*60)
    
    def run_full_check(self):
        """Run complete deployment check"""
        print("🚀 VERCEL DEPLOYMENT STATUS MONITOR")
        print("="*60)
        print(f"Domain: {self.domain}")
        print(f"Platform: Vercel")
        print("="*60)
        
        # Run all checks
        self.check_dns()
        self.check_website()
        self.check_ssl()
        self.check_vercel_deployment()
        
        # Generate report
        report = self.generate_status_report()
        
        # Display summary
        self.display_summary()
        
        # Open Vercel dashboard
        print("\n📊 Opening Vercel dashboard...")
        webbrowser.open(self.vercel_dashboard)
        
        return report

def main():
    """Main function"""
    monitor = DeploymentMonitor()
    report = monitor.run_full_check()
    
    print("\n📋 Quick Actions:")
    print("1. Check Vercel dashboard for detailed logs")
    print("2. Review deployment_status_report.json")
    print("3. Run this script again to monitor progress")
    print("4. Contact support if issues persist")

if __name__ == "__main__":
    main()

