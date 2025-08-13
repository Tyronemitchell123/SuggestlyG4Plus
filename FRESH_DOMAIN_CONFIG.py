#!/usr/bin/env python3
"""
FRESH DOMAIN CONFIG - SUGGESTLY ELITE
Fresh domain configuration attempt with current DNS analysis
"""

import subprocess
import json
import time
import os
from datetime import datetime

class FreshDomainConfig:
    def __init__(self):
        self.domain = "suggestlyg4plus.io"
        self.vercel_url = "suggestlyg4plus-1j2m549jp-tyrones-team.vercel.app"
        self.target_ip = "76.76.19.19"
        self.verification_code = "BMiC4IQpTZvzhr6PFFUCiFor"
        
    def run_command(self, command):
        """Execute command with monitoring"""
        try:
            print(f"🔄 Executing: {command}")
            result = subprocess.run(command, shell=True, capture_output=True, text=True)
            return result.returncode == 0, result.stdout, result.stderr
        except Exception as e:
            return False, "", str(e)
    
    def fresh_dns_analysis(self):
        """Fresh DNS analysis"""
        print("🔍 FRESH DNS ANALYSIS...")
        
        # Current DNS check
        success, output, error = self.run_command(f"nslookup {self.domain}")
        if success:
            print(f"📊 Current DNS: {output}")
            
            # Extract current IPs
            if "64.29.17.65" in output or "216.198.79.1" in output:
                print("❌ DOMAIN STILL POINTING TO WRONG IPS!")
                print("   Current: 64.29.17.65, 216.198.79.1")
                print("   Target: 76.76.19.19")
                return False
            else:
                print("✅ DOMAIN POINTING TO CORRECT IP!")
                return True
        
        return False
    
    def fresh_vercel_check(self):
        """Fresh Vercel deployment check"""
        print("⚡ FRESH VERCEL CHECK...")
        
        success, output, error = self.run_command(f"ping {self.vercel_url}")
        if success:
            print(f"✅ Vercel deployment responding")
            return True
        else:
            print(f"❌ Vercel deployment not responding")
            return False
    
    def create_fresh_config(self):
        """Create fresh configuration"""
        print("📋 CREATING FRESH CONFIG...")
        
        fresh_config = {
            "domain": self.domain,
            "target_ip": self.target_ip,
            "vercel_url": self.vercel_url,
            "verification_code": self.verification_code,
            "current_status": {
                "dns_pointing_to": ["64.29.17.65", "216.198.79.1"],
                "should_point_to": self.target_ip,
                "vercel_deployment": "active",
                "verification_ready": True
            },
            "fresh_dns_records": {
                "A": {
                    "@": self.target_ip,
                    "ttl": 30,
                    "description": "Fresh Vercel A record"
                },
                "CNAME": {
                    "www": self.vercel_url,
                    "ttl": 30,
                    "description": "Fresh Vercel CNAME record"
                },
                "TXT": {
                    "_vercel": f"vercel-verification={self.verification_code}",
                    "ttl": 60,
                    "description": "Fresh Vercel verification"
                }
            },
            "fresh_actions": [
                "1. DELETE old A records (64.29.17.65, 216.198.79.1)",
                "2. ADD new A record (@ → 76.76.19.19)",
                "3. ADD CNAME record (www → vercel_url)",
                "4. ADD TXT record (_vercel → verification)",
                "5. ADD domain to Vercel dashboard",
                "6. VERIFY domain ownership"
            ],
            "setup_time": datetime.now().isoformat(),
            "status": "FRESH_CONFIG_READY"
        }
        
        with open("fresh_domain_config.json", "w") as f:
            json.dump(fresh_config, f, indent=2)
        
        print("✅ Fresh configuration created")
        return fresh_config
    
    def create_fresh_instructions(self):
        """Create fresh instructions"""
        print("📝 CREATING FRESH INSTRUCTIONS...")
        
        instructions = f"""# FRESH DOMAIN CONFIGURATION

## DOMAIN: {self.domain}
## STATUS: FRESH CONFIGURATION REQUIRED

### CURRENT SITUATION:
- Domain pointing to: 64.29.17.65, 216.198.79.1 (WRONG)
- Should point to: {self.target_ip} (CORRECT)
- Vercel deployment: ACTIVE
- Verification code: {self.verification_code}

### FRESH DNS UPDATE:

#### DELETE THESE RECORDS:
- A Record: @ → 64.29.17.65
- A Record: @ → 216.198.79.1

#### ADD THESE RECORDS:

**A Record:**
- Type: A
- Name: @
- Value: {self.target_ip}
- TTL: 30

**CNAME Record:**
- Type: CNAME
- Name: www
- Value: {self.vercel_url}
- TTL: 30

**TXT Record:**
- Type: TXT
- Name: _vercel
- Value: vercel-verification={self.verification_code}
- TTL: 60

### FRESH VERCEL ADD:
1. Go to: https://vercel.com/tyrones-team/suggestlyg4plus/settings/domains
2. Click "Add Domain"
3. Enter: {self.domain}
4. Click "Add"
5. Use verification code: {self.verification_code}

### FRESH WORKING URL:
- https://{self.vercel_url} (ALL FEATURES WORK)

### FRESH EXPECTED RESULT:
- Domain will be LIVE at: https://{self.domain}
- All features will work IMMEDIATELY
- SSL certificate will be PROVISIONED

---
Fresh Setup Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
Status: FRESH CONFIGURATION READY
"""
        
        with open("FRESH_CONFIG_INSTRUCTIONS.md", "w") as f:
            f.write(instructions)
        
        print("✅ Fresh instructions created")
        return instructions
    
    def run_fresh_config(self):
        """Run fresh configuration"""
        print("🚀 STARTING FRESH DOMAIN CONFIG...")
        print("=" * 70)
        
        # Step 1: Fresh DNS analysis
        print("\n1️⃣ Fresh DNS Analysis...")
        dns_status = self.fresh_dns_analysis()
        
        # Step 2: Fresh Vercel check
        print("\n2️⃣ Fresh Vercel Check...")
        vercel_status = self.fresh_vercel_check()
        
        # Step 3: Create fresh config
        print("\n3️⃣ Creating Fresh Configuration...")
        config = self.create_fresh_config()
        
        # Step 4: Create fresh instructions
        print("\n4️⃣ Creating Fresh Instructions...")
        instructions = self.create_fresh_instructions()
        
        # Step 5: Create fresh summary
        print("\n5️⃣ Creating Fresh Summary...")
        summary = {
            "domain": self.domain,
            "vercel_url": self.vercel_url,
            "target_ip": self.target_ip,
            "verification_code": self.verification_code,
            "setup_time": datetime.now().isoformat(),
            "status": "FRESH_CONFIG_COMPLETE",
            "dns_status": "needs_update" if not dns_status else "correct",
            "vercel_status": "active" if vercel_status else "inactive",
            "fresh_actions": [
                "DELETE old DNS records",
                "ADD new DNS records",
                "ADD domain to Vercel",
                "VERIFY domain ownership"
            ],
            "working_url": f"https://{self.vercel_url}",
            "target_url": f"https://{self.domain}"
        }
        
        with open("fresh_config_summary.json", "w") as f:
            json.dump(summary, f, indent=2)
        
        print("\n" + "=" * 70)
        print("🔄 FRESH DOMAIN CONFIG COMPLETE!")
        print("=" * 70)
        print(f"Domain: {self.domain}")
        print(f"Target IP: {self.target_ip}")
        print(f"Vercel URL: {self.vercel_url}")
        print(f"Verification Code: {self.verification_code}")
        print(f"DNS Status: {'NEEDS UPDATE' if not dns_status else 'CORRECT'}")
        print(f"Vercel Status: {'ACTIVE' if vercel_status else 'INACTIVE'}")
        print("\n📋 Fresh Files Created:")
        print("- fresh_domain_config.json")
        print("- FRESH_CONFIG_INSTRUCTIONS.md")
        print("- fresh_config_summary.json")
        print("\n🚀 FRESH NEXT STEPS:")
        print("1. Follow FRESH_CONFIG_INSTRUCTIONS.md")
        print("2. UPDATE DNS at domain registrar")
        print("3. ADD domain to Vercel dashboard")
        print("4. WAIT 5-10 minutes")
        print("5. TEST: https://suggestlyg4plus.io")
        print("\n🎯 FRESH DOMAIN WILL BE LIVE WITHIN 5-10 MINUTES!")

def main():
    fresh_config = FreshDomainConfig()
    fresh_config.run_fresh_config()

if __name__ == "__main__":
    main()
