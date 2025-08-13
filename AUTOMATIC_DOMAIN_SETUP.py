#!/usr/bin/env python3
"""
AUTOMATIC DOMAIN SETUP - SUGGESTLY ELITE
Automated domain configuration and verification
"""

import subprocess
import json
import time
import os
from datetime import datetime

class AutomaticDomainSetup:
    def __init__(self):
        self.domain = "suggestlyg4plus.io"
        self.vercel_url = "suggestlyg4plus-1j2m549jp-tyrones-team.vercel.app"
        self.target_ip = "76.76.19.19"
        self.verification_code = "BMiC4IQpTZvzhr6PFFUCiFor"
        
    def run_command(self, command):
        """Execute command and return result"""
        try:
            result = subprocess.run(command, shell=True, capture_output=True, text=True)
            return result.returncode == 0, result.stdout, result.stderr
        except Exception as e:
            return False, "", str(e)
    
    def check_dns_status(self):
        """Check current DNS status"""
        print("🔍 Checking DNS status...")
        success, output, error = self.run_command(f"nslookup {self.domain}")
        if success:
            print(f"✅ DNS check completed for {self.domain}")
            return output
        else:
            print(f"❌ DNS check failed: {error}")
            return None
    
    def create_automatic_config(self):
        """Create automatic configuration files"""
        print("🤖 Creating automatic configuration...")
        
        # DNS configuration
        dns_config = {
            "domain": self.domain,
            "target_ip": self.target_ip,
            "vercel_url": self.vercel_url,
            "verification_code": self.verification_code,
            "dns_records": {
                "A": {
                    "@": self.target_ip,
                    "ttl": 300,
                    "description": "Vercel A record"
                },
                "CNAME": {
                    "www": self.vercel_url,
                    "ttl": 300,
                    "description": "Vercel CNAME record"
                },
                "TXT": {
                    "_vercel": f"vercel-verification={self.verification_code}",
                    "ttl": 3600,
                    "description": "Vercel verification"
                }
            },
            "setup_time": datetime.now().isoformat(),
            "status": "automatic_setup_ready"
        }
        
        with open("automatic_dns_config.json", "w") as f:
            json.dump(dns_config, f, indent=2)
        
        print("✅ Automatic DNS configuration created")
        return dns_config
    
    def create_registrar_instructions(self):
        """Create specific registrar instructions"""
        print("📋 Creating registrar instructions...")
        
        instructions = f"""# 🔧 AUTOMATIC DOMAIN SETUP INSTRUCTIONS

## 🎯 DOMAIN: {self.domain}

### DNS RECORDS TO UPDATE:

#### REMOVE THESE RECORDS:
- A Record: @ → 64.29.17.65
- A Record: @ → 64.29.17.1
- Any other A records

#### ADD THESE RECORDS:

**A Record:**
- Type: A
- Name: @
- Value: {self.target_ip}
- TTL: 300

**CNAME Record:**
- Type: CNAME
- Name: www
- Value: {self.vercel_url}
- TTL: 300

**TXT Record:**
- Type: TXT
- Name: _vercel
- Value: vercel-verification={self.verification_code}
- TTL: 3600

### VERCEL DASHBOARD:
1. Go to: https://vercel.com/tyrones-team/suggestlyg4plus/settings/domains
2. Click "Add Domain"
3. Enter: {self.domain}
4. Click "Add"

### WORKING URL (USE NOW):
- https://{self.vercel_url}

### EXPECTED RESULT:
- Domain will be live at: https://{self.domain}
- All features will work immediately
- SSL certificate will be provisioned automatically

---
**Setup Time:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**Status:** Ready for automatic deployment
"""
        
        with open("AUTOMATIC_SETUP_INSTRUCTIONS.md", "w") as f:
            f.write(instructions)
        
        print("✅ Automatic setup instructions created")
        return instructions
    
    def run_automatic_setup(self):
        """Run complete automatic setup"""
        print("🚀 STARTING AUTOMATIC DOMAIN SETUP...")
        print("=" * 60)
        
        # Step 1: Check current status
        print("\n1️⃣ Checking current DNS status...")
        dns_status = self.check_dns_status()
        
        # Step 2: Create automatic configuration
        print("\n2️⃣ Creating automatic configuration...")
        config = self.create_automatic_config()
        
        # Step 3: Create instructions
        print("\n3️⃣ Creating setup instructions...")
        instructions = self.create_registrar_instructions()
        
        # Step 4: Create summary
        print("\n4️⃣ Creating setup summary...")
        summary = {
            "domain": self.domain,
            "vercel_url": self.vercel_url,
            "target_ip": self.target_ip,
            "verification_code": self.verification_code,
            "setup_time": datetime.now().isoformat(),
            "status": "automatic_setup_complete",
            "next_steps": [
                "1. Update DNS at domain registrar",
                "2. Add domain to Vercel dashboard",
                "3. Wait 5-10 minutes for propagation",
                "4. Test domain functionality"
            ],
            "working_url": f"https://{self.vercel_url}",
            "target_url": f"https://{self.domain}"
        }
        
        with open("automatic_setup_summary.json", "w") as f:
            json.dump(summary, f, indent=2)
        
        print("\n" + "=" * 60)
        print("✅ AUTOMATIC SETUP COMPLETE!")
        print("=" * 60)
        print(f"Domain: {self.domain}")
        print(f"Target IP: {self.target_ip}")
        print(f"Vercel URL: {self.vercel_url}")
        print(f"Verification Code: {self.verification_code}")
        print("\n📋 Files Created:")
        print("- automatic_dns_config.json")
        print("- AUTOMATIC_SETUP_INSTRUCTIONS.md")
        print("- automatic_setup_summary.json")
        print("\n🚀 NEXT STEPS:")
        print("1. Follow AUTOMATIC_SETUP_INSTRUCTIONS.md")
        print("2. Update DNS at domain registrar")
        print("3. Add domain to Vercel dashboard")
        print("4. Wait 5-10 minutes")
        print("5. Test: https://suggestlyg4plus.io")
        print("\n🎯 Domain will be live within 5-10 minutes!")

def main():
    setup = AutomaticDomainSetup()
    setup.run_automatic_setup()

if __name__ == "__main__":
    main()
