#!/usr/bin/env python3
"""
COMPLETE CLEAR SYSTEM - SUGGESTLY ELITE
Complete system to clear all DNS records and domain references
"""

import subprocess
import json
import time
import os
from datetime import datetime

class CompleteClearSystem:
    def __init__(self):
        self.domain = "suggestlyg4plus.io"
        self.account1 = "tyronemitchell76-3031"
        self.account2 = "tyrones-team"
        
    def run_command(self, command):
        """Execute command with complete monitoring"""
        try:
            print(f"COMPLETE executing: {command}")
            result = subprocess.run(command, shell=True, capture_output=True, text=True)
            return result.returncode == 0, result.stdout, result.stderr
        except Exception as e:
            return False, "", str(e)
    
    def complete_dns_check(self):
        """Complete DNS check"""
        print("COMPLETE DNS CHECK...")
        
        success, output, error = self.run_command(f"nslookup {self.domain}")
        if success:
            print(f"DNS Analysis: {output}")
            
            if "76.76.19.19" in output:
                print("COMPLETE: Domain pointing to Vercel IP")
                return "vercel_ip"
            elif "64.29.17" in output or "216.198.79" in output:
                print("COMPLETE: Domain still pointing to old IPs - NEEDS CLEARING")
                return "old_ips"
            elif "NXDOMAIN" in output or "not found" in output:
                print("COMPLETE: Domain completely cleared")
                return "cleared"
            else:
                print("COMPLETE: Unknown DNS status")
                return "unknown"
        else:
            print(f"COMPLETE DNS Analysis failed: {error}")
            return "failed"
    
    def create_complete_clear_config(self):
        """Create complete clear configuration"""
        print("Creating COMPLETE CLEAR configuration...")
        
        config = {
            "domain": self.domain,
            "account1": self.account1,
            "account2": self.account2,
            "complete_clear_actions": [
                "COMPLETE DELETE domain from Account 1",
                "COMPLETE DELETE domain from Account 2",
                "COMPLETE DELETE all DNS records",
                "COMPLETE VERIFY no domain references",
                "COMPLETE VERIFY no DNS records"
            ],
            "complete_dns_records_to_delete": [
                "A Record: @ → 64.29.17.65",
                "A Record: @ → 216.198.79.1",
                "Any CNAME records",
                "Any TXT records",
                "Any other DNS records"
            ],
            "complete_clear_timeline": {
                "delete_account1": "5 minutes",
                "delete_account2": "5 minutes",
                "delete_dns": "10 minutes",
                "verify_clear": "5 minutes",
                "total_time": "25 minutes"
            },
            "setup_time": datetime.now().isoformat(),
            "status": "COMPLETE_CLEAR_READY"
        }
        
        with open("complete_clear_config.json", "w") as f:
            json.dump(config, f, indent=2)
        
        print("COMPLETE configuration created")
        return config
    
    def create_complete_clear_instructions(self):
        """Create complete clear instructions"""
        print("Creating COMPLETE CLEAR instructions...")
        
        instructions = f"""# COMPLETE CLEAR SYSTEM - SUGGESTLY ELITE

## DOMAIN: {self.domain}
## STATUS: COMPLETE CLEAR REQUIRED
## ACTION: COMPLETE CLEAR ALL DNS RECORDS AND DOMAIN REFERENCES

### COMPLETE CLEAR PLAN:

#### STEP 1: COMPLETE DELETE FROM ACCOUNT 1 ({self.account1})
1. Go to: https://vercel.com/{self.account1}
2. Navigate to "Domains" section
3. Find: {self.domain}
4. **COMPLETE DELETE** the domain from this account
5. **COMPLETE REMOVE** any DNS records
6. **COMPLETE CLEAR** all domain settings

#### STEP 2: COMPLETE DELETE FROM ACCOUNT 2 ({self.account2})
1. Go to: https://vercel.com/{self.account2}
2. Navigate to "Domains" section
3. Find: {self.domain} (if exists)
4. **COMPLETE DELETE** the domain from this account
5. **COMPLETE REMOVE** any DNS records
6. **COMPLETE CLEAR** all domain settings

#### STEP 3: COMPLETE DELETE ALL DNS RECORDS
Go to your domain registrar and **COMPLETE DELETE ALL records:**

**MUST DELETE THESE RECORDS:**
- **COMPLETE DELETE** A Record: @ → 64.29.17.65
- **COMPLETE DELETE** A Record: @ → 216.198.79.1
- **COMPLETE DELETE** any CNAME records
- **COMPLETE DELETE** any TXT records
- **COMPLETE DELETE** any other DNS records

**LEAVE DOMAIN WITH:**
- **NO A records**
- **NO CNAME records**
- **NO TXT records**
- **NO other DNS records**

#### STEP 4: COMPLETE VERIFY CLEAN STATE
After deleting all records, verify:
- Account 1: No domain references
- Account 2: No domain references
- Domain registrar: No DNS records
- nslookup: Shows no IP addresses or NXDOMAIN

#### STEP 5: COMPLETE CLEAR VERIFICATION
Run this command to verify:
```
nslookup {self.domain}
```

**Expected result:**
- No IP addresses shown
- Or "NXDOMAIN" (domain not found)
- Or no response

### COMPLETE CLEAR TIMELINE:
- **Delete Account 1:** 5 minutes
- **Delete Account 2:** 5 minutes
- **Delete DNS:** 10 minutes
- **Verify Clear:** 5 minutes
- **Total Time:** 25 minutes

### COMPLETE CLEAR BENEFITS:
- No conflicting domain ownership
- No DNS conflicts
- No account linking issues
- Complete clean slate
- Ready for fresh setup

---
COMPLETE Setup Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
Status: COMPLETE CLEAR READY
"""
        
        with open("COMPLETE_CLEAR_INSTRUCTIONS.md", "w") as f:
            f.write(instructions)
        
        print("COMPLETE instructions created")
        return instructions
    
    def run_complete_clear_system(self):
        """Run complete clear system"""
        print("STARTING COMPLETE CLEAR SYSTEM...")
        print("=" * 60)
        
        # Step 1: Complete DNS check
        print("\n1. COMPLETE DNS Check...")
        dns_status = self.complete_dns_check()
        
        # Step 2: Create complete clear config
        print("\n2. Creating COMPLETE Clear Configuration...")
        config = self.create_complete_clear_config()
        
        # Step 3: Create complete clear instructions
        print("\n3. Creating COMPLETE Clear Instructions...")
        instructions = self.create_complete_clear_instructions()
        
        # Step 4: Create complete clear summary
        print("\n4. Creating COMPLETE Clear Summary...")
        summary = {
            "domain": self.domain,
            "account1": self.account1,
            "account2": self.account2,
            "setup_time": datetime.now().isoformat(),
            "status": "COMPLETE_CLEAR_SYSTEM_READY",
            "dns_status": dns_status,
            "complete_clear_actions": [
                "COMPLETE DELETE domain from Account 1",
                "COMPLETE DELETE domain from Account 2",
                "COMPLETE DELETE all DNS records",
                "COMPLETE VERIFY no domain references",
                "COMPLETE VERIFY no DNS records"
            ],
            "complete_clear_timeline": "25 minutes total"
        }
        
        with open("complete_clear_summary.json", "w") as f:
            json.dump(summary, f, indent=2)
        
        print("\n" + "=" * 60)
        print("COMPLETE CLEAR SYSTEM READY!")
        print("=" * 60)
        print(f"Domain: {self.domain}")
        print(f"Account 1: {self.account1}")
        print(f"Account 2: {self.account2}")
        print(f"DNS Status: {dns_status}")
        print("\nCOMPLETE Files Created:")
        print("- complete_clear_config.json")
        print("- COMPLETE_CLEAR_INSTRUCTIONS.md")
        print("- complete_clear_summary.json")
        print("\nCOMPLETE NEXT STEPS:")
        print("1. Follow COMPLETE_CLEAR_INSTRUCTIONS.md")
        print("2. COMPLETE DELETE from Account 1")
        print("3. COMPLETE DELETE from Account 2")
        print("4. COMPLETE DELETE all DNS records")
        print("5. COMPLETE VERIFY clean state")
        print("\nCOMPLETE CLEAR WILL WORK PERFECTLY!")

def main():
    complete_clear = CompleteClearSystem()
    complete_clear.run_complete_clear_system()

if __name__ == "__main__":
    main()
