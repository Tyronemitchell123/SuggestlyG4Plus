#!/usr/bin/env python3
"""
FIND VERCEL ACCOUNTS - SUGGESTLY ELITE
Help identify all Vercel accounts
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
    print("SUGGESTLY ELITE - FIND VERCEL ACCOUNTS")
    print("=" * 70)
    
    print("\n🎯 KNOWN VERCEL ACCOUNT:")
    print("   Team Name: tyrones-team")
    print("   Dashboard: https://vercel.com/tyrones-team/suggestlyg4plus")
    print("   Project: suggestlyg4plus")
    
    print("\n🔍 TO FIND YOUR SECOND ACCOUNT:")
    print("\n1. CHECK VERCEL DASHBOARD:")
    print("   🌐 Go to: https://vercel.com/dashboard")
    print("   📋 Look for team switcher in top-left")
    print("   🔄 Switch between accounts/teams")
    
    print("\n2. CHECK ACCOUNT SETTINGS:")
    print("   🌐 Go to: https://vercel.com/account")
    print("   👤 View all your accounts")
    print("   🏢 Check team memberships")
    
    print("\n3. CHECK VERCEL CLI:")
    print("   💻 Run: vercel whoami")
    print("   📋 Run: vercel teams ls")
    print("   🔍 Run: vercel projects ls")
    
    # Try to get Vercel CLI info
    print("\n4. ATTEMPTING VERCEL CLI CHECK...")
    
    # Check if vercel CLI is installed
    success, output, error = run_command("vercel --version")
    if success:
        print(f"   ✅ Vercel CLI installed: {output.strip()}")
        
        # Try to get current user
        success, output, error = run_command("vercel whoami")
        if success:
            print(f"   👤 Current user: {output.strip()}")
        else:
            print("   ⚠️ Not logged in to Vercel CLI")
            
        # Try to list teams
        success, output, error = run_command("vercel teams ls")
        if success:
            print(f"   🏢 Teams: {output.strip()}")
        else:
            print("   ⚠️ Could not list teams")
    else:
        print("   ❌ Vercel CLI not installed")
        print("   💡 Install with: npm i -g vercel")
    
    print("\n5. MANUAL CHECK METHODS:")
    print("   📧 Check your email for Vercel invitations")
    print("   🔗 Check browser bookmarks for Vercel URLs")
    print("   📱 Check mobile Vercel app")
    print("   💼 Check work/personal email accounts")
    
    # Create account discovery report
    discovery_report = {
        "known_account": {
            "team_name": "tyrones-team",
            "dashboard_url": "https://vercel.com/tyrones-team/suggestlyg4plus",
            "project": "suggestlyg4plus"
        },
        "discovery_methods": [
            "Vercel dashboard team switcher",
            "Account settings page",
            "Vercel CLI commands",
            "Email invitations",
            "Browser bookmarks",
            "Mobile app"
        ],
        "vercel_cli_commands": [
            "vercel whoami",
            "vercel teams ls", 
            "vercel projects ls"
        ],
        "discovery_time": datetime.now().isoformat(),
        "status": "searching_for_second_account"
    }
    
    with open("vercel_account_discovery.json", "w") as f:
        json.dump(discovery_report, f, indent=2)
    
    print("✅ Discovery report created: vercel_account_discovery.json")
    
    print("\n" + "=" * 70)
    print("ACCOUNT DISCOVERY COMPLETE!")
    print("=" * 70)
    print("KNOWN ACCOUNT: tyrones-team")
    print("STATUS: Searching for second account")
    print("=" * 70)

if __name__ == "__main__":
    main()

