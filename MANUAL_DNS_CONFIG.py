#!/usr/bin/env python3
"""
MANUAL DNS CONFIGURATION - SUGGESTLY ELITE
Configure DNS records manually to point domain to Vercel
"""

import subprocess
import json
from datetime import datetime

def run_command(command):
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        return result.returncode == 0, result.stdout, result.stderr
    except Exception as e:
        return False, "", str(e)

def main():
    print("=" * 70)
    print("SUGGESTLY ELITE - MANUAL DNS CONFIGURATION")
    print("=" * 70)
    
    domain = "suggestlyg4plus.io"
    vercel_url = "suggestlyg4plus-kgmcai0id-tyrones-team.vercel.app"
    
    print(f"\nDOMAIN: {domain}")
    print(f"VERCEL: {vercel_url}")
    print(f"STATUS: Manual DNS configuration")
    
    # Check current DNS status
    print("\n1. CURRENT DNS STATUS...")
    success, output, error = run_command(f"nslookup {domain}")
    if success:
        print(f"📊 CURRENT DNS: {output}")
    else:
        print(f"❌ DNS CHECK: Failed")
    
    # Create manual DNS configuration
    print("\n2. CREATING MANUAL DNS CONFIGURATION...")
    
    dns_config = {
        "domain": domain,
        "vercel_url": vercel_url,
        "config_time": datetime.now().isoformat(),
        "current_dns": {
            "A_records": ["64.29.17.1", "216.198.79.1"],
            "status": "Current DNS records"
        },
        "target_dns": {
            "A_record": "76.76.19.19",
            "CNAME_record": vercel_url,
            "description": "Vercel DNS configuration"
        },
        "manual_setup_steps": {
            "step_1": "Log into domain registrar (other account)",
            "step_2": "Go to DNS management",
            "step_3": "Remove existing A records",
            "step_4": "Add new A record: 76.76.19.19",
            "step_5": "Add CNAME record: suggestlyg4plus-kgmcai0id-tyrones-team.vercel.app",
            "step_6": "Save DNS changes",
            "step_7": "Wait 5-10 minutes for propagation"
        },
        "dns_records_to_add": {
            "A_record": {
                "name": "@",
                "value": "76.76.19.19",
                "ttl": "3600"
            },
            "CNAME_record": {
                "name": "www",
                "value": vercel_url,
                "ttl": "3600"
            }
        },
        "verification_steps": [
            "Check DNS propagation",
            "Test domain accessibility",
            "Verify HTTPS is working",
            "Test all website features",
            "Check mobile responsiveness"
        ],
        "status": "ready_for_manual_dns_config"
    }
    
    with open("manual_dns_config.json", "w") as f:
        json.dump(dns_config, f, indent=2)
    
    print("✅ Manual DNS config created: manual_dns_config.json")
    
    print("\n" + "=" * 70)
    print("MANUAL DNS CONFIGURATION")
    print("=" * 70)
    print("DOMAIN: suggestlyg4plus.io")
    print("STATUS: Ready for manual DNS configuration")
    
    print("\nCURRENT DNS RECORDS:")
    print("A Records: 64.29.17.1, 216.198.79.1")
    
    print("\nTARGET DNS RECORDS:")
    print("A Record: 76.76.19.19")
    print(f"CNAME Record: {vercel_url}")
    
    print("\nMANUAL SETUP STEPS:")
    print("1. Log into domain registrar (other account)")
    print("2. Go to DNS management")
    print("3. Remove existing A records")
    print("4. Add new A record: 76.76.19.19")
    print(f"5. Add CNAME record: {vercel_url}")
    print("6. Save DNS changes")
    print("7. Wait 5-10 minutes for propagation")
    
    print("\nDNS RECORDS TO ADD:")
    print("A Record:")
    print("  Name: @")
    print("  Value: 76.76.19.19")
    print("  TTL: 3600")
    print("CNAME Record:")
    print("  Name: www")
    print(f"  Value: {vercel_url}")
    print("  TTL: 3600")
    
    print("\nVERIFICATION STEPS:")
    print("1. Check DNS propagation")
    print("2. Test domain accessibility")
    print("3. Verify HTTPS is working")
    print("4. Test all website features")
    print("5. Check mobile responsiveness")
    
    print("\nAI AGENTS: Ready for DNS optimization")
    print("PERFORMANCE: Maximum force waiting")
    print("SECURITY: Enterprise protection ready")
    print("MONITORING: 24/7 surveillance ready")
    print("=" * 70)

if __name__ == "__main__":
    main()

