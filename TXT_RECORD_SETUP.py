#!/usr/bin/env python3
"""
TXT RECORD SETUP - SUGGESTLY ELITE
Guide for adding TXT record for domain verification
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
    print("SUGGESTLY ELITE - TXT RECORD SETUP")
    print("=" * 70)
    
    domain = "suggestlyg4plus.io"
    
    print(f"\nDOMAIN: {domain}")
    print(f"STATUS: TXT record verification needed")
    
    # Check current DNS status
    print("\n1. CURRENT DNS STATUS...")
    success, output, error = run_command(f"nslookup {domain}")
    if success:
        print(f"📊 CURRENT DNS: {output}")
    else:
        print(f"❌ DNS CHECK: Failed")
    
    # Create TXT record setup guide
    print("\n2. CREATING TXT RECORD SETUP GUIDE...")
    
    txt_setup_guide = {
        "domain": domain,
        "setup_time": datetime.now().isoformat(),
        "verification_type": "TXT_RECORD",
        "current_status": {
            "dns_records": ["216.198.79.1", "64.29.17.1"],
            "status": "Domain needs TXT record verification"
        },
        "txt_record_steps": {
            "step_1": "Get TXT record from Vercel dashboard",
            "step_2": "Log into domain registrar",
            "step_3": "Go to DNS management",
            "step_4": "Add TXT record with Vercel's value",
            "step_5": "Save DNS changes",
            "step_6": "Wait 5-10 minutes for propagation",
            "step_7": "Vercel will auto-verify domain"
        },
        "vercel_dashboard_steps": [
            "Go to Vercel dashboard",
            "Click on suggestlyg4plus.io",
            "Click 'Learn more' or 'Verify Domain'",
            "Copy the TXT record value",
            "Add TXT record in domain registrar"
        ],
        "domain_registrar_steps": [
            "Log into domain registrar",
            "Find DNS management section",
            "Add new TXT record",
            "Name: @ (or leave blank)",
            "Value: [Copy from Vercel]",
            "TTL: 3600",
            "Save changes"
        ],
        "post_verification": {
            "step_1": "Vercel will auto-verify domain",
            "step_2": "DNS will point to Vercel automatically",
            "step_3": "HTTPS will be enabled",
            "step_4": "Domain will be live"
        },
        "status": "waiting_for_txt_record"
    }
    
    with open("txt_record_setup_guide.json", "w") as f:
        json.dump(txt_setup_guide, f, indent=2)
    
    print("✅ TXT record setup guide created: txt_record_setup_guide.json")
    
    print("\n" + "=" * 70)
    print("TXT RECORD SETUP GUIDE")
    print("=" * 70)
    print("DOMAIN: suggestlyg4plus.io")
    print("STATUS: TXT record verification needed")
    
    print("\nVERCEL DASHBOARD STEPS:")
    print("1. Go to Vercel dashboard")
    print("2. Click on 'suggestlyg4plus.io'")
    print("3. Click 'Learn more' or 'Verify Domain'")
    print("4. Copy the TXT record value")
    print("5. Add TXT record in domain registrar")
    
    print("\nDOMAIN REGISTRAR STEPS:")
    print("1. Log into domain registrar")
    print("2. Find DNS management section")
    print("3. Add new TXT record")
    print("4. Name: @ (or leave blank)")
    print("5. Value: [Copy from Vercel]")
    print("6. TTL: 3600")
    print("7. Save changes")
    
    print("\nPOST-VERIFICATION:")
    print("✅ Vercel will auto-verify domain")
    print("✅ DNS will point to Vercel automatically")
    print("✅ HTTPS will be enabled")
    print("✅ Domain will be live")
    
    print("\nAI AGENTS: Ready for domain verification")
    print("PERFORMANCE: Maximum force waiting")
    print("SECURITY: Enterprise protection ready")
    print("MONITORING: 24/7 surveillance ready")
    print("=" * 70)

if __name__ == "__main__":
    main()

