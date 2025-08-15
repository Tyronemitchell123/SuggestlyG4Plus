#!/usr/bin/env python3
"""
QUICK DOMAIN SETUP - SUGGESTLY ELITE
Simple domain configuration script
"""

import json
import subprocess
from datetime import datetime

def run_command(command):
    """Execute command and return result"""
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        return result.returncode == 0, result.stdout, result.stderr
    except Exception as e:
        return False, "", str(e)

def main():
    print("=" * 60)
    print("SUGGESTLY ELITE - QUICK DOMAIN SETUP")
    print("=" * 60)
    
    domain = "suggestlyg4plus.io"
    vercel_url = "suggestlyg4plus-afvs63tia-tyrones-team.vercel.app"
    
    print(f"\nDomain: {domain}")
    print(f"Vercel URL: {vercel_url}")
    print(f"Setup Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Check current DNS
    print("\n1. Checking current DNS records...")
    success, output, error = run_command(f"nslookup {domain}")
    if success:
        print(f"✅ DNS records found for {domain}")
        print(output)
    else:
        print(f"❌ No DNS records found for {domain}")
    
    # Check Vercel deployment
    print("\n2. Verifying Vercel deployment...")
    success, output, error = run_command(f"curl -I https://{vercel_url}")
    if success and "200" in output:
        print(f"✅ Vercel deployment active: {vercel_url}")
    else:
        print(f"❌ Vercel deployment not responding: {vercel_url}")
    
    # Create setup summary
    setup_summary = {
        "domain": domain,
        "vercel_url": vercel_url,
        "setup_time": datetime.now().isoformat(),
        "status": "ready_for_domain_setup",
        "next_steps": [
            "1. Go to Vercel dashboard: https://vercel.com/tyrones-team/suggestlyg4plus/settings/domains",
            "2. Click 'Add Domain'",
            "3. Enter: suggestlyg4plus.io",
            "4. Click 'Add'",
            "5. Wait 5-10 minutes for DNS propagation",
            "6. Test: https://suggestlyg4plus.io"
        ]
    }
    
    with open("domain_setup_summary.json", "w") as f:
        json.dump(setup_summary, f, indent=2)
    
    print("\n3. Setup summary created: domain_setup_summary.json")
    
    print("\n" + "=" * 60)
    print("NEXT STEPS TO MAKE DOMAIN LIVE:")
    print("=" * 60)
    print("1. Go to: https://vercel.com/tyrones-team/suggestlyg4plus/settings/domains")
    print("2. Click 'Add Domain'")
    print("3. Enter: suggestlyg4plus.io")
    print("4. Click 'Add'")
    print("5. Wait 5-10 minutes for DNS propagation")
    print("6. Test: https://suggestlyg4plus.io")
    print("\nDomain will be live within 5-10 minutes!")
    print("=" * 60)

if __name__ == "__main__":
    main()
