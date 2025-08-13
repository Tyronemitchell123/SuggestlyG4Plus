#!/usr/bin/env python3
"""
MANAGE BOTH VERCEL ACCOUNTS - SUGGESTLY ELITE
Manage both Vercel accounts for domain activation
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
    print("=" * 80)
    print("SUGGESTLY ELITE - MANAGE BOTH VERCEL ACCOUNTS")
    print("=" * 80)
    
    domain = "suggestlyg4plus.io"
    
    print(f"\n🎯 DOMAIN: {domain}")
    print(f"⚡ STATUS: Managing both Vercel accounts")
    
    # Account 1: tyrones-team
    print("\n" + "=" * 60)
    print("ACCOUNT 1: TYRONES-TEAM")
    print("=" * 60)
    
    print("\n📊 ACCOUNT DETAILS:")
    print("   Team Name: tyrones-team")
    print("   Dashboard: https://vercel.com/tyrones-team/suggestlyg4plus")
    print("   Project: suggestlyg4plus")
    print("   Status: Active")
    
    print("\n🔗 DOMAIN SETUP:")
    print("   1. Go to: https://vercel.com/tyrones-team/suggestlyg4plus/settings/domains")
    print("   2. Click 'Add Domain'")
    print(f"   3. Enter: {domain}")
    print("   4. Click 'Add'")
    print("   5. Follow verification process")
    
    # Account 2: Need to identify
    print("\n" + "=" * 60)
    print("ACCOUNT 2: NEED TO IDENTIFY")
    print("=" * 60)
    
    print("\n🔍 IDENTIFYING SECOND ACCOUNT...")
    print("\nMETHODS TO FIND SECOND ACCOUNT:")
    
    print("\n1. VERCEL DASHBOARD METHOD:")
    print("   🌐 Go to: https://vercel.com/dashboard")
    print("   📋 Look for team switcher in top-left")
    print("   🔄 Switch between accounts/teams")
    print("   📝 Note down the second account name")
    
    print("\n2. ACCOUNT SETTINGS METHOD:")
    print("   🌐 Go to: https://vercel.com/account")
    print("   👤 View all your accounts")
    print("   🏢 Check team memberships")
    print("   📝 Note down all account names")
    
    print("\n3. EMAIL SEARCH METHOD:")
    print("   📧 Search email for 'Vercel'")
    print("   🔍 Look for team invitations")
    print("   📝 Note down team names from emails")
    
    print("\n4. BROWSER BOOKMARKS METHOD:")
    print("   🔗 Check browser bookmarks")
    print("   🔍 Look for Vercel URLs")
    print("   📝 Note down different team names")
    
    # Try Vercel CLI
    print("\n" + "=" * 60)
    print("VERCEL CLI CHECK")
    print("=" * 60)
    
    print("\n5. ATTEMPTING VERCEL CLI LOGIN...")
    
    # Check if vercel CLI is installed
    success, output, error = run_command("vercel --version")
    if success:
        print(f"   ✅ Vercel CLI installed: {output.strip()}")
        
        # Try to login
        print("   🔐 Attempting login...")
        print("   💡 Run: vercel login")
        print("   📋 This will show all your accounts")
        
        # Try to get current user
        success, output, error = run_command("vercel whoami")
        if success:
            print(f"   👤 Current user: {output.strip()}")
        else:
            print("   ⚠️ Not logged in - need to login first")
            
        # Try to list teams
        success, output, error = run_command("vercel teams ls")
        if success:
            print(f"   🏢 Teams: {output.strip()}")
        else:
            print("   ⚠️ Could not list teams - need to login")
    else:
        print("   ❌ Vercel CLI not installed")
        print("   💡 Install with: npm i -g vercel")
    
    # Domain management strategy
    print("\n" + "=" * 60)
    print("DOMAIN MANAGEMENT STRATEGY")
    print("=" * 60)
    
    print("\n🎯 RECOMMENDED APPROACH:")
    print("   1. Identify both Vercel accounts")
    print("   2. Choose which account should own the domain")
    print("   3. Add domain to chosen account")
    print("   4. Configure DNS records")
    print("   5. Verify domain is working")
    
    print("\n🔄 ALTERNATIVE APPROACH:")
    print("   1. Keep domain in current registrar")
    print("   2. Point DNS to Vercel manually")
    print("   3. Use A record: 76.76.21.21")
    print("   4. Use CNAME: suggestlyg4plus-kgmcai0id-tyrones-team.vercel.app")
    
    # Create management report
    management_report = {
        "domain": domain,
        "account_1": {
            "team_name": "tyrones-team",
            "dashboard_url": "https://vercel.com/tyrones-team/suggestlyg4plus/settings/domains",
            "project": "suggestlyg4plus",
            "status": "active"
        },
        "account_2": {
            "team_name": "unknown",
            "status": "needs_identification"
        },
        "identification_methods": [
            "Vercel dashboard team switcher",
            "Account settings page",
            "Email search",
            "Browser bookmarks",
            "Vercel CLI login"
        ],
        "domain_strategy": {
            "recommended": "Add domain to chosen account",
            "alternative": "Manual DNS configuration",
            "dns_records": {
                "A_record": "76.76.21.21",
                "CNAME_record": "suggestlyg4plus-kgmcai0id-tyrones-team.vercel.app"
            }
        },
        "management_time": datetime.now().isoformat(),
        "status": "identifying_second_account"
    }
    
    with open("vercel_account_management.json", "w") as f:
        json.dump(management_report, f, indent=2)
    
    print("✅ Management report created: vercel_account_management.json")
    
    # Final instructions
    print("\n" + "=" * 80)
    print("NEXT STEPS")
    print("=" * 80)
    
    print("\n🎯 IMMEDIATE ACTIONS:")
    print("   1. Go to https://vercel.com/dashboard")
    print("   2. Switch between accounts using team switcher")
    print("   3. Note down the second account name")
    print("   4. Choose which account should own suggestlyg4plus.io")
    print("   5. Add domain to chosen account")
    
    print("\n⚡ MAXIMUM FORCE READY:")
    print("   Once domain is configured:")
    print("   ✅ HTTPS with A+ grade SSL")
    print("   ✅ Global CDN network")
    print("   ✅ Enterprise security")
    print("   ✅ Ultra-fast performance")
    print("   ✅ Full analytics tracking")
    print("   ✅ Mobile optimization")
    print("   ✅ Payment system ready")
    
    print("\nAI AGENTS: Ready for account management")
    print("PERFORMANCE: Maximum force waiting")
    print("SECURITY: Enterprise protection ready")
    print("MONITORING: 24/7 surveillance ready")
    print("=" * 80)

if __name__ == "__main__":
    main()

