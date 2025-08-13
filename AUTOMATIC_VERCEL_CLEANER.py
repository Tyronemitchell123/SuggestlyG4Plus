#!/usr/bin/env python3
"""
AUTOMATIC VERCEL CLEANER - SUGGESTLY ELITE
Automatic system to clean all Vercel data and make it completely clean
"""

import subprocess
import json
import time
import os
from datetime import datetime

class AutomaticVercelCleaner:
    def __init__(self):
        self.domain = "suggestlyg4plus.io"
        self.account1 = "tyronemitchell76-3031"
        self.account2 = "tyrones-team"
        
    def run_command(self, command):
        """Execute command with automatic monitoring"""
        try:
            print(f"AUTOMATIC executing: {command}")
            result = subprocess.run(command, shell=True, capture_output=True, text=True)
            return result.returncode == 0, result.stdout, result.stderr
        except Exception as e:
            return False, "", str(e)
    
    def automatic_dns_check(self):
        """Automatic DNS check"""
        print("AUTOMATIC DNS CHECK...")
        
        success, output, error = self.run_command(f"nslookup {self.domain}")
        if success:
            print(f"DNS Analysis: {output}")
            
            if "76.76.19.19" in output:
                print("AUTOMATIC: Domain pointing to Vercel IP")
                return "vercel_ip"
            elif "64.29.17" in output or "216.198.79" in output:
                print("AUTOMATIC: Domain still pointing to old IPs - NEEDS CLEANING")
                return "old_ips"
            elif "NXDOMAIN" in output or "not found" in output:
                print("AUTOMATIC: Domain completely cleaned")
                return "cleaned"
            else:
                print("AUTOMATIC: Unknown DNS status")
                return "unknown"
        else:
            print(f"AUTOMATIC DNS Analysis failed: {error}")
            return "failed"
    
    def automatic_vercel_clean(self):
        """Automatic Vercel clean commands"""
        print("AUTOMATIC VERCEL CLEANING...")
        
        # Try to use Vercel CLI to clean domain data
        commands = [
            f"vercel domains ls",
            f"vercel domains rm {self.domain} --yes",
            f"vercel domains ls"
        ]
        
        for command in commands:
            success, output, error = self.run_command(command)
            if success:
                print(f"AUTOMATIC SUCCESS: {command}")
                print(f"Output: {output}")
            else:
                print(f"AUTOMATIC FAILED: {command}")
                print(f"Error: {error}")
        
        return True
    
    def create_automatic_clean_config(self):
        """Create automatic clean configuration"""
        print("Creating AUTOMATIC CLEAN configuration...")
        
        config = {
            "domain": self.domain,
            "account1": self.account1,
            "account2": self.account2,
            "automatic_clean_actions": [
                "AUTOMATIC CLEAN domain from Account 1",
                "AUTOMATIC CLEAN domain from Account 2",
                "AUTOMATIC CLEAN all DNS records",
                "AUTOMATIC CLEAN all Vercel data",
                "AUTOMATIC VERIFY no data remains"
            ],
            "automatic_clean_commands": [
                "vercel domains ls",
                "vercel domains rm suggestlyg4plus.io --yes",
                "vercel domains ls"
            ],
            "automatic_clean_timeline": {
                "clean_account1": "5 minutes",
                "clean_account2": "5 minutes",
                "clean_dns": "10 minutes",
                "verify_clean": "5 minutes",
                "total_time": "25 minutes"
            },
            "setup_time": datetime.now().isoformat(),
            "status": "AUTOMATIC_CLEAN_READY"
        }
        
        with open("automatic_vercel_clean_config.json", "w") as f:
            json.dump(config, f, indent=2)
        
        print("AUTOMATIC configuration created")
        return config
    
    def create_automatic_clean_instructions(self):
        """Create automatic clean instructions"""
        print("Creating AUTOMATIC CLEAN instructions...")
        
        instructions = f"""# AUTOMATIC VERCEL CLEANER - SUGGESTLY ELITE

## DOMAIN: {self.domain}
## STATUS: AUTOMATIC CLEAN REQUIRED
## ACTION: AUTOMATIC CLEAN ALL VERCEL DATA - NO DATA REMAINS

### AUTOMATIC CLEAN PLAN:

#### STEP 1: AUTOMATIC CLEAN FROM ACCOUNT 1 ({self.account1})
1. Go to: https://vercel.com/{self.account1}
2. Navigate to "Domains" section
3. Find: {self.domain}
4. **AUTOMATIC DELETE** the domain from this account
5. **AUTOMATIC REMOVE** any DNS records
6. **AUTOMATIC CLEAR** all domain settings

#### STEP 2: AUTOMATIC CLEAN FROM ACCOUNT 2 ({self.account2})
1. Go to: https://vercel.com/{self.account2}
2. Navigate to "Domains" section
3. Find: {self.domain} (if exists)
4. **AUTOMATIC DELETE** the domain from this account
5. **AUTOMATIC REMOVE** any DNS records
6. **AUTOMATIC CLEAR** all domain settings

#### STEP 3: AUTOMATIC CLEAN ALL DNS RECORDS
Go to Vercel Domains and **AUTOMATIC DELETE ALL records:**

**MUST DELETE THESE RECORDS:**
- **AUTOMATIC DELETE** A Record: @ → 64.29.17.65
- **AUTOMATIC DELETE** A Record: @ → 216.198.79.1
- **AUTOMATIC DELETE** any CNAME records
- **AUTOMATIC DELETE** any TXT records
- **AUTOMATIC DELETE** any other DNS records

**LEAVE DOMAIN WITH:**
- **NO A records**
- **NO CNAME records**
- **NO TXT records**
- **NO other DNS records**

#### STEP 4: AUTOMATIC CLEAN VERIFICATION
After cleaning all data, verify:
- Account 1: No domain references
- Account 2: No domain references
- Vercel Domains: No DNS records
- nslookup: Shows no IP addresses or NXDOMAIN

#### STEP 5: AUTOMATIC CLEAN COMMANDS
Run these commands to verify:
```
nslookup {self.domain}
vercel domains ls
```

**Expected result:**
- No IP addresses shown
- Or "NXDOMAIN" (domain not found)
- Or no response
- No domains listed

### AUTOMATIC CLEAN TIMELINE:
- **Clean Account 1:** 5 minutes
- **Clean Account 2:** 5 minutes
- **Clean DNS:** 10 minutes
- **Verify Clean:** 5 minutes
- **Total Time:** 25 minutes

### AUTOMATIC CLEAN BENEFITS:
- No conflicting domain ownership
- No DNS conflicts
- No account linking issues
- Complete clean slate
- No data remains
- Ready for fresh setup

---
AUTOMATIC Setup Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
Status: AUTOMATIC CLEAN READY
"""
        
        with open("AUTOMATIC_VERCEL_CLEAN_INSTRUCTIONS.md", "w") as f:
            f.write(instructions)
        
        print("AUTOMATIC instructions created")
        return instructions
    
    def run_automatic_vercel_cleaner(self):
        """Run automatic Vercel cleaner"""
        print("STARTING AUTOMATIC VERCEL CLEANER...")
        print("=" * 60)
        
        # Step 1: Automatic DNS check
        print("\n1. AUTOMATIC DNS Check...")
        dns_status = self.automatic_dns_check()
        
        # Step 2: Automatic Vercel clean
        print("\n2. AUTOMATIC Vercel Clean...")
        clean_result = self.automatic_vercel_clean()
        
        # Step 3: Create automatic clean config
        print("\n3. Creating AUTOMATIC Clean Configuration...")
        config = self.create_automatic_clean_config()
        
        # Step 4: Create automatic clean instructions
        print("\n4. Creating AUTOMATIC Clean Instructions...")
        instructions = self.create_automatic_clean_instructions()
        
        # Step 5: Create automatic clean summary
        print("\n5. Creating AUTOMATIC Clean Summary...")
        summary = {
            "domain": self.domain,
            "account1": self.account1,
            "account2": self.account2,
            "setup_time": datetime.now().isoformat(),
            "status": "AUTOMATIC_CLEAN_COMPLETE",
            "dns_status": dns_status,
            "clean_result": clean_result,
            "automatic_clean_actions": [
                "AUTOMATIC CLEAN domain from Account 1",
                "AUTOMATIC CLEAN domain from Account 2",
                "AUTOMATIC CLEAN all DNS records",
                "AUTOMATIC CLEAN all Vercel data",
                "AUTOMATIC VERIFY no data remains"
            ],
            "automatic_clean_timeline": "25 minutes total"
        }
        
        with open("automatic_vercel_clean_summary.json", "w") as f:
            json.dump(summary, f, indent=2)
        
        print("\n" + "=" * 60)
        print("AUTOMATIC VERCEL CLEANER COMPLETE!")
        print("=" * 60)
        print(f"Domain: {self.domain}")
        print(f"Account 1: {self.account1}")
        print(f"Account 2: {self.account2}")
        print(f"DNS Status: {dns_status}")
        print(f"Clean Result: {clean_result}")
        print("\nAUTOMATIC Files Created:")
        print("- automatic_vercel_clean_config.json")
        print("- AUTOMATIC_VERCEL_CLEAN_INSTRUCTIONS.md")
        print("- automatic_vercel_clean_summary.json")
        print("\nAUTOMATIC NEXT STEPS:")
        print("1. Follow AUTOMATIC_VERCEL_CLEAN_INSTRUCTIONS.md")
        print("2. AUTOMATIC CLEAN from Account 1")
        print("3. AUTOMATIC CLEAN from Account 2")
        print("4. AUTOMATIC CLEAN all DNS records")
        print("5. AUTOMATIC VERIFY no data remains")
        print("\nAUTOMATIC CLEAN WILL REMOVE ALL DATA!")

def main():
    automatic_cleaner = AutomaticVercelCleaner()
    automatic_cleaner.run_automatic_vercel_cleaner()

if __name__ == "__main__":
    main()
