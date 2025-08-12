#!/usr/bin/env python3
"""
DOMAIN CONFIGURATION CHECKER
Comprehensive domain verification and functionality testing
"""

import os
import json
import requests
import dns.resolver
import socket
import ssl
from datetime import datetime
from typing import Dict, List, Any

class DomainConfigurationChecker:
    def __init__(self):
        self.domain = "suggestlyg4plus.io"
        self.www_domain = "www.suggestlyg4plus.io"
        self.vercel_domain = "suggestlyg4plus.vercel.app"
        self.check_results = {}
        
    def print_domain_banner(self):
        print("🌐 DOMAIN CONFIGURATION CHECKER")
        print("=" * 70)
        print("🔍 COMPREHENSIVE DOMAIN VERIFICATION & FUNCTIONALITY TESTING")
        print("🎯 Primary Domain: suggestlyg4plus.io")
        print("🌐 WWW Domain: www.suggestlyg4plus.io")
        print("🚀 Vercel Domain: suggestlyg4plus.vercel.app")
        print("=" * 70)
        
    def check_dns_records(self):
        """Check DNS records for the domain"""
        print("\n🔍 CHECKING DNS RECORDS...")
        
        dns_results = {
            "domain": self.domain,
            "www_domain": self.www_domain,
            "vercel_domain": self.vercel_domain,
            "records": {}
        }
        
        # Check A records
        try:
            a_records = dns.resolver.resolve(self.domain, 'A')
            dns_results["records"]["A"] = [str(record) for record in a_records]
            print(f"✅ A Records for {self.domain}: {dns_results['records']['A']}")
        except Exception as e:
            dns_results["records"]["A"] = f"Error: {str(e)}"
            print(f"❌ A Records for {self.domain}: {str(e)}")
            
        # Check CNAME records
        try:
            cname_records = dns.resolver.resolve(self.domain, 'CNAME')
            dns_results["records"]["CNAME"] = [str(record) for record in cname_records]
            print(f"✅ CNAME Records for {self.domain}: {dns_results['records']['CNAME']}")
        except Exception as e:
            dns_results["records"]["CNAME"] = f"Error: {str(e)}"
            print(f"❌ CNAME Records for {self.domain}: {str(e)}")
            
        # Check MX records
        try:
            mx_records = dns.resolver.resolve(self.domain, 'MX')
            dns_results["records"]["MX"] = [str(record) for record in mx_records]
            print(f"✅ MX Records for {self.domain}: {dns_results['records']['MX']}")
        except Exception as e:
            dns_results["records"]["MX"] = f"Error: {str(e)}"
            print(f"❌ MX Records for {self.domain}: {str(e)}")
            
        # Check TXT records
        try:
            txt_records = dns.resolver.resolve(self.domain, 'TXT')
            dns_results["records"]["TXT"] = [str(record) for record in txt_records]
            print(f"✅ TXT Records for {self.domain}: {dns_results['records']['TXT']}")
        except Exception as e:
            dns_results["records"]["TXT"] = f"Error: {str(e)}"
            print(f"❌ TXT Records for {self.domain}: {str(e)}")
            
        self.check_results["dns"] = dns_results
        return dns_results
        
    def check_ssl_certificate(self, domain: str):
        """Check SSL certificate for a domain"""
        try:
            context = ssl.create_default_context()
            with socket.create_connection((domain, 443), timeout=10) as sock:
                with context.wrap_socket(sock, server_hostname=domain) as ssock:
                    cert = ssock.getpeercert()
                    return {
                        "valid": True,
                        "issuer": dict(x[0] for x in cert['issuer']),
                        "subject": dict(x[0] for x in cert['subject']),
                        "expiry": cert['notAfter'],
                        "version": cert['version']
                    }
        except Exception as e:
            return {
                "valid": False,
                "error": str(e)
            }
            
    def check_ssl_certificates(self):
        """Check SSL certificates for all domains"""
        print("\n🔒 CHECKING SSL CERTIFICATES...")
        
        ssl_results = {
            "primary_domain": self.check_ssl_certificate(self.domain),
            "www_domain": self.check_ssl_certificate(self.www_domain),
            "vercel_domain": self.check_ssl_certificate(self.vercel_domain)
        }
        
        for domain_name, cert_info in ssl_results.items():
            if cert_info["valid"]:
                print(f"✅ SSL Certificate for {domain_name}: VALID")
                print(f"   Issuer: {cert_info['issuer'].get('commonName', 'Unknown')}")
                print(f"   Expires: {cert_info['expiry']}")
            else:
                print(f"❌ SSL Certificate for {domain_name}: INVALID - {cert_info['error']}")
                
        self.check_results["ssl"] = ssl_results
        return ssl_results
        
    def check_http_responses(self):
        """Check HTTP responses for all domains"""
        print("\n🌐 CHECKING HTTP RESPONSES...")
        
        http_results = {}
        domains_to_check = [
            (f"https://{self.domain}", "Primary Domain (HTTPS)"),
            (f"http://{self.domain}", "Primary Domain (HTTP)"),
            (f"https://{self.www_domain}", "WWW Domain (HTTPS)"),
            (f"http://{self.www_domain}", "WWW Domain (HTTP)"),
            (f"https://{self.vercel_domain}", "Vercel Domain (HTTPS)"),
            (f"http://{self.vercel_domain}", "Vercel Domain (HTTP)")
        ]
        
        for url, description in domains_to_check:
            try:
                response = requests.get(url, timeout=10, allow_redirects=True)
                http_results[url] = {
                    "status_code": response.status_code,
                    "final_url": response.url,
                    "headers": dict(response.headers),
                    "content_length": len(response.content),
                    "response_time": response.elapsed.total_seconds()
                }
                
                status_icon = "✅" if response.status_code == 200 else "⚠️" if response.status_code < 400 else "❌"
                print(f"{status_icon} {description}: {response.status_code} - {response.url}")
                
            except Exception as e:
                http_results[url] = {
                    "error": str(e),
                    "status_code": None
                }
                print(f"❌ {description}: ERROR - {str(e)}")
                
        self.check_results["http"] = http_results
        return http_results
        
    def check_domain_functionality(self):
        """Check if domain is fully functional"""
        print("\n🚀 CHECKING DOMAIN FUNCTIONALITY...")
        
        functionality_results = {
            "dns_resolution": False,
            "ssl_working": False,
            "http_accessible": False,
            "redirects_working": False,
            "vercel_integration": False
        }
        
        # Check DNS resolution
        try:
            socket.gethostbyname(self.domain)
            functionality_results["dns_resolution"] = True
            print("✅ DNS Resolution: WORKING")
        except Exception as e:
            print(f"❌ DNS Resolution: FAILED - {str(e)}")
            
        # Check SSL functionality
        ssl_check = self.check_ssl_certificate(self.domain)
        if ssl_check["valid"]:
            functionality_results["ssl_working"] = True
            print("✅ SSL Certificate: WORKING")
        else:
            print(f"❌ SSL Certificate: FAILED - {ssl_check['error']}")
            
        # Check HTTP accessibility
        try:
            response = requests.get(f"https://{self.domain}", timeout=10)
            if response.status_code == 200:
                functionality_results["http_accessible"] = True
                print("✅ HTTP Accessibility: WORKING")
            else:
                print(f"⚠️ HTTP Accessibility: PARTIAL - Status {response.status_code}")
        except Exception as e:
            print(f"❌ HTTP Accessibility: FAILED - {str(e)}")
            
        # Check redirects
        try:
            http_response = requests.get(f"http://{self.domain}", timeout=10, allow_redirects=False)
            if http_response.status_code in [301, 302, 307, 308]:
                functionality_results["redirects_working"] = True
                print("✅ HTTP to HTTPS Redirect: WORKING")
            else:
                print(f"⚠️ HTTP to HTTPS Redirect: PARTIAL - Status {http_response.status_code}")
        except Exception as e:
            print(f"❌ HTTP to HTTPS Redirect: FAILED - {str(e)}")
            
        # Check Vercel integration
        try:
            vercel_response = requests.get(f"https://{self.vercel_domain}", timeout=10)
            if vercel_response.status_code == 200:
                functionality_results["vercel_integration"] = True
                print("✅ Vercel Integration: WORKING")
            else:
                print(f"⚠️ Vercel Integration: PARTIAL - Status {vercel_response.status_code}")
        except Exception as e:
            print(f"❌ Vercel Integration: FAILED - {str(e)}")
            
        self.check_results["functionality"] = functionality_results
        return functionality_results
        
    def create_domain_configuration_report(self):
        """Create comprehensive domain configuration report"""
        print("\n📊 CREATING DOMAIN CONFIGURATION REPORT...")
        
        # Run all checks
        dns_results = self.check_dns_records()
        ssl_results = self.check_ssl_certificates()
        http_results = self.check_http_responses()
        functionality_results = self.check_domain_functionality()
        
        # Calculate overall status
        working_checks = sum(functionality_results.values())
        total_checks = len(functionality_results)
        overall_status = "FULLY FUNCTIONAL" if working_checks == total_checks else "PARTIALLY FUNCTIONAL" if working_checks > 0 else "NOT FUNCTIONAL"
        
        report = {
            "domain_configuration_report": {
                "title": "Domain Configuration Status Report",
                "timestamp": datetime.now().isoformat(),
                "domain": self.domain,
                "overall_status": overall_status,
                "functionality_score": f"{working_checks}/{total_checks}",
                "checks": {
                    "dns_records": dns_results,
                    "ssl_certificates": ssl_results,
                    "http_responses": http_results,
                    "functionality": functionality_results
                },
                "recommendations": []
            }
        }
        
        # Add recommendations based on check results
        if not functionality_results["dns_resolution"]:
            report["domain_configuration_report"]["recommendations"].append("Configure DNS A records to point to Vercel")
            
        if not functionality_results["ssl_working"]:
            report["domain_configuration_report"]["recommendations"].append("Verify SSL certificate configuration in Vercel")
            
        if not functionality_results["http_accessible"]:
            report["domain_configuration_report"]["recommendations"].append("Check if the domain is properly deployed on Vercel")
            
        if not functionality_results["redirects_working"]:
            report["domain_configuration_report"]["recommendations"].append("Configure HTTP to HTTPS redirects in Vercel")
            
        if not functionality_results["vercel_integration"]:
            report["domain_configuration_report"]["recommendations"].append("Verify Vercel project deployment and domain configuration")
            
        # Save report
        with open("domain_configuration_report.json", "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2)
            
        print("✅ Domain configuration report created")
        return report
        
    def run_domain_check(self):
        """Run complete domain configuration check"""
        self.print_domain_banner()
        
        print("\n🔍 INITIATING DOMAIN CONFIGURATION CHECK...")
        
        # Create comprehensive report
        report = self.create_domain_configuration_report()
        
        # Display summary
        overall_status = report["domain_configuration_report"]["overall_status"]
        functionality_score = report["domain_configuration_report"]["functionality_score"]
        
        print("\n🎯 DOMAIN CONFIGURATION SUMMARY:")
        print("=" * 70)
        print(f"🌐 Domain: {self.domain}")
        print(f"📊 Overall Status: {overall_status}")
        print(f"🎯 Functionality Score: {functionality_score}")
        print("=" * 70)
        
        if overall_status == "FULLY FUNCTIONAL":
            print("✅ Your domain is FULLY FUNCTIONAL and ready for production!")
        elif overall_status == "PARTIALLY FUNCTIONAL":
            print("⚠️ Your domain is PARTIALLY FUNCTIONAL - some features may not work")
        else:
            print("❌ Your domain is NOT FUNCTIONAL - requires configuration")
            
        print(f"\n📋 Recommendations:")
        for recommendation in report["domain_configuration_report"]["recommendations"]:
            print(f"• {recommendation}")
            
        print(f"\n📊 Detailed report saved to: domain_configuration_report.json")
        
        return report

def main():
    """Main execution function for domain configuration check"""
    try:
        # Initialize domain configuration checker
        domain_checker = DomainConfigurationChecker()
        
        # Run complete domain check
        report = domain_checker.run_domain_check()
        
        print("\n🎯 DOMAIN CONFIGURATION CHECK COMPLETE!")
        
    except Exception as e:
        print(f"❌ Error in domain configuration check: {e}")
        return False
        
    return True

if __name__ == "__main__":
    main()









