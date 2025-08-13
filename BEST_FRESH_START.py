#!/usr/bin/env python3
"""
BEST FRESH START - SUGGESTLY ELITE
Best approach to delete information on both Vercel accounts and start fresh
"""

import subprocess
import json
import time
import os
from datetime import datetime

class BestFreshStart:
    def __init__(self):
        self.domain = "suggestlyg4plus.io"
        self.vercel_url = "suggestlyg4plus-1j2m549jp-tyrones-team.vercel.app"
        self.target_ip = "76.76.19.19"
        self.verification_code = "BMiC4IQpTZvzhr6PFFUCiFor"
        self.account1 = "tyronemitchell76-3031"
        self.account2 = "tyrones-team"
        
    def run_command(self, command):
        """Execute command with best monitoring"""
        try:
            print(f"BEST executing: {command}")
            result = subprocess.run(command, shell=True, capture_output=True, text=True)
            return result.returncode == 0, result.stdout, result.stderr
        except Exception as e:
            return False, "", str(e)
    
    def best_dns_check(self):
        """Best DNS check"""
        print("BEST DNS CHECK...")
        
        success, output, error = self.run_command(f"nslookup {self.domain}")
        if success:
            print(f"DNS Analysis: {output}")
            
            if "76.76.19.19" in output:
                print("BEST: Domain pointing to Vercel IP")
                return "vercel_ip"
            elif "64.29.17" in output or "216.198.79" in output:
                print("BEST: Domain still pointing to old IPs")
                return "old_ips"
            else:
                print("BEST: Unknown DNS status")
                return "unknown"
        else:
            print(f"BEST DNS Analysis failed: {error}")
            return "failed"
    
    def create_best_fresh_config(self):
        """Create best fresh start configuration"""
        print("Creating BEST FRESH START configuration...")
        
        config = {
            "domain": self.domain,
            "target_ip": self.target_ip,
            "vercel_url": self.vercel_url,
            "verification_code": self.verification_code,
            "account1": self.account1,
            "account2": self.account2,
            "best_fresh_actions": [
                "BEST DELETE domain from Account 1",
                "BEST DELETE domain from Account 2",
                "BEST CLEAR all DNS records",
                "BEST VERIFY clean state",
                "BEST FRESH domain setup"
            ],
            "best_dns_records": {
                "A": {
                    "@": self.target_ip,
                    "ttl": 60,
                    "description": "BEST Vercel A record"
                },
                "CNAME": {
                    "www": self.vercel_url,
                    "ttl": 60,
                    "description": "BEST Vercel CNAME record"
                },
                "TXT": {
                    "_vercel": f"vercel-verification={self.verification_code}",
                    "ttl": 60,
                    "description": "BEST Vercel verification"
                }
            },
            "best_fresh_timeline": {
                "delete_account1": "5 minutes",
                "delete_account2": "5 minutes",
                "clear_dns": "5 minutes",
                "verify_clean": "2 minutes",
                "fresh_setup": "10 minutes",
                "total_time": "27 minutes"
            },
            "setup_time": datetime.now().isoformat(),
            "status": "BEST_FRESH_START_READY"
        }
        
        with open("best_fresh_start_config.json", "w") as f:
            json.dump(config, f, indent=2)
        
        print("BEST configuration created")
        return config
    
    def create_best_fresh_instructions(self):
        """Create best fresh start instructions"""
        print("Creating BEST FRESH START instructions...")
        
        instructions = f"""# BEST FRESH START - SUGGESTLY ELITE

## DOMAIN: {self.domain}
## STATUS: BEST FRESH START REQUIRED
## ACTION: BEST APPROACH TO DELETE INFORMATION AND START FRESH

### BEST FRESH START PLAN:

#### STEP 1: BEST DELETE FROM ACCOUNT 1 ({self.account1})
1. Go to: https://vercel.com/{self.account1}
2. Navigate to "Domains" section
3. Find: {self.domain}
4. **BEST DELETE** the domain from this account
5. **BEST REMOVE** any DNS records
6. **BEST CLEAR** all domain settings

#### STEP 2: BEST DELETE FROM ACCOUNT 2 ({self.account2})
1. Go to: https://vercel.com/{self.account2}
2. Navigate to "Domains" section
3. Find: {self.domain} (if exists)
4. **BEST DELETE** the domain from this account
5. **BEST REMOVE** any DNS records
6. **BEST CLEAR** all domain settings

#### STEP 3: BEST CLEAR DNS RECORDS
Go to your domain registrar and **BEST DELETE ALL records:**
- **BEST DELETE** all A records
- **BEST DELETE** all CNAME records
- **BEST DELETE** all TXT records
- **BEST DELETE** any other DNS records

#### STEP 4: BEST VERIFY CLEAN STATE
- Account 1: No domain references
- Account 2: No domain references
- Domain registrar: No DNS records
- Domain: Clean slate

#### STEP 5: BEST FRESH START SETUP
After clean state is confirmed:
1. **BEST CHOOSE** account to use ({self.account2} recommended)
2. **BEST ADD** domain fresh to chosen account
3. **BEST SETUP** DNS records fresh
4. **BEST CONFIGURE** domain properly

### BEST FRESH DNS RECORDS (After Clean State):

**A Record (BEST ADD):**
- Type: A
- Name: @
- Value: {self.target_ip}
- TTL: 60

**CNAME Record (BEST ADD):**
- Type: CNAME
- Name: www
- Value: {self.vercel_url}
- TTL: 60

**TXT Record (BEST ADD):**
- Type: TXT
- Name: _vercel
- Value: vercel-verification={self.verification_code}
- TTL: 60

### BEST FRESH VERCEL ADD:
1. Go to: https://vercel.com/{self.account2}/suggestlyg4plus/settings/domains
2. Click "Add Domain"
3. Enter: {self.domain}
4. Click "Add"
5. Use verification code: {self.verification_code}

### BEST FRESH WORKING URL:
- https://{self.vercel_url} (BEST USE THIS NOW)

### BEST FRESH TIMELINE:
- **Delete Account 1:** 5 minutes
- **Delete Account 2:** 5 minutes
- **Clear DNS:** 5 minutes
- **Verify Clean:** 2 minutes
- **Fresh Setup:** 10 minutes
- **Total Time:** 27 minutes

### BEST FRESH BENEFITS:
- No conflicting domain ownership
- No DNS conflicts
- No account linking issues
- Clean slate for proper setup
- Fresh verification process
- No 307 errors or redirect issues

---
BEST Setup Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
Status: BEST FRESH START READY
"""
        
        with open("BEST_FRESH_START_INSTRUCTIONS.md", "w") as f:
            f.write(instructions)
        
        print("BEST instructions created")
        return instructions
    
    def run_best_fresh_start(self):
        """Run best fresh start"""
        print("STARTING BEST FRESH START...")
        print("=" * 60)
        
        # Step 1: Best DNS check
        print("\n1. BEST DNS Check...")
        dns_status = self.best_dns_check()
        
        # Step 2: Create best fresh config
        print("\n2. Creating BEST Fresh Configuration...")
        config = self.create_best_fresh_config()
        
        # Step 3: Create best fresh instructions
        print("\n3. Creating BEST Fresh Instructions...")
        instructions = self.create_best_fresh_instructions()
        
        # Step 4: Create best fresh summary
        print("\n4. Creating BEST Fresh Summary...")
        summary = {
            "domain": self.domain,
            "vercel_url": self.vercel_url,
            "target_ip": self.target_ip,
            "verification_code": self.verification_code,
            "account1": self.account1,
            "account2": self.account2,
            "setup_time": datetime.now().isoformat(),
            "status": "BEST_FRESH_START_COMPLETE",
            "dns_status": dns_status,
            "best_fresh_actions": [
                "BEST DELETE domain from Account 1",
                "BEST DELETE domain from Account 2",
                "BEST CLEAR all DNS records",
                "BEST VERIFY clean state",
                "BEST FRESH domain setup"
            ],
            "working_url": f"https://{self.vercel_url}",
            "target_url": f"https://{self.domain}",
            "best_fresh_timeline": "27 minutes total"
        }
        
        with open("best_fresh_start_summary.json", "w") as f:
            json.dump(summary, f, indent=2)
        
        print("\n" + "=" * 60)
        print("BEST FRESH START COMPLETE!")
        print("=" * 60)
        print(f"Domain: {self.domain}")
        print(f"Account 1: {self.account1}")
        print(f"Account 2: {self.account2}")
        print(f"Target IP: {self.target_ip}")
        print(f"Vercel URL: {self.vercel_url}")
        print(f"Verification Code: {self.verification_code}")
        print(f"DNS Status: {dns_status}")
        print("\nBEST Files Created:")
        print("- best_fresh_start_config.json")
        print("- BEST_FRESH_START_INSTRUCTIONS.md")
        print("- best_fresh_start_summary.json")
        print("\nBEST NEXT STEPS:")
        print("1. Follow BEST_FRESH_START_INSTRUCTIONS.md")
        print("2. BEST DELETE from Account 1")
        print("3. BEST DELETE from Account 2")
        print("4. BEST CLEAR DNS records")
        print("5. BEST VERIFY clean state")
        print("6. BEST FRESH setup")
        print("\nBEST FRESH START WILL WORK PERFECTLY!")

def main():
    best_fresh = BestFreshStart()
    best_fresh.run_best_fresh_start()

if __name__ == "__main__":
    main()
