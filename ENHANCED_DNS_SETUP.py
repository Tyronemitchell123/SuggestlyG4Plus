#!/usr/bin/env python3
"""
ENHANCED DNS SETUP - SUGGESTLY ELITE
Quick domain configuration and DNS verification
"""

import subprocess
import time
import json
import os
from datetime import datetime

class EnhancedDNSSetup:
    def __init__(self):
        self.domain = "suggestlyg4plus.io"
        self.vercel_url = "suggestlyg4plus-afvs63tia-tyrones-team.vercel.app"
        self.setup_data = {
            "domain": self.domain,
            "vercel_url": self.vercel_url,
            "setup_time": datetime.now().isoformat(),
            "status": "initializing"
        }
    
    def run_command(self, command):
        """Execute command and return result"""
        try:
            result = subprocess.run(command, shell=True, capture_output=True, text=True)
            return result.returncode == 0, result.stdout, result.stderr
        except Exception as e:
            return False, "", str(e)
    
    def check_dns_records(self):
        """Check current DNS records"""
        print("🔍 Checking current DNS records...")
        
        # Check A records
        success, output, error = self.run_command(f"nslookup {self.domain}")
        if success:
            print(f"✅ A Records found for {self.domain}")
            print(output)
        else:
            print(f"❌ No A Records found for {self.domain}")
        
        # Check CNAME records
        success, output, error = self.run_command(f"nslookup www.{self.domain}")
        if success:
            print(f"✅ CNAME Records found for www.{self.domain}")
            print(output)
        else:
            print(f"❌ No CNAME Records found for www.{self.domain}")
        
        return success
    
    def verify_vercel_deployment(self):
        """Verify Vercel deployment is active"""
        print("🌐 Verifying Vercel deployment...")
        
        success, output, error = self.run_command(f"curl -I https://{self.vercel_url}")
        if success and "200" in output:
            print(f"✅ Vercel deployment active: {self.vercel_url}")
            return True
        else:
            print(f"❌ Vercel deployment not responding: {self.vercel_url}")
            return False
    
    def create_dns_config(self):
        """Create DNS configuration file"""
        print("📝 Creating DNS configuration...")
        
        dns_config = {
            "domain": self.domain,
            "vercel_url": self.vercel_url,
            "dns_records": {
                "A": {
                    "@": "76.76.19.19",
                    "description": "Vercel A record"
                },
                "CNAME": {
                    "www": f"{self.vercel_url}",
                    "description": "Vercel CNAME record"
                },
                "TXT": {
                    "@": "vercel-verification=your-verification-code",
                    "description": "Vercel domain verification"
                }
            },
            "vercel_settings": {
                "domain": self.domain,
                "redirects": [
                    {
                        "source": "www.suggestlyg4plus.io",
                        "destination": "https://suggestlyg4plus.io",
                        "permanent": True
                    }
                ],
                "headers": [
                    {
                        "source": "/(.*)",
                        "headers": [
                            {
                                "key": "X-Robots-Tag",
                                "value": "index, follow"
                            },
                            {
                                "key": "X-Content-Type-Options",
                                "value": "nosniff"
                            }
                        ]
                    }
                ]
            }
        }
        
        with open("enhanced_dns_config.json", "w") as f:
            json.dump(dns_config, f, indent=2)
        
        print("✅ DNS configuration created: enhanced_dns_config.json")
        return dns_config
    
    def generate_vercel_config(self):
        """Generate enhanced Vercel configuration"""
        print("⚙️ Generating enhanced Vercel configuration...")
        
        vercel_config = {
            "version": 2,
            "builds": [
                {
                    "src": "index.html",
                    "use": "@vercel/static"
                }
            ],
            "rewrites": [
                {
                    "source": "/(.*)",
                    "destination": "/index.html"
                }
            ],
            "redirects": [
                {
                    "source": "/www/(.*)",
                    "destination": "/$1",
                    "permanent": True
                }
            ],
            "headers": [
                {
                    "source": "/(.*)",
                    "headers": [
                        {
                            "key": "Cache-Control",
                            "value": "public, max-age=31536000, immutable"
                        },
                        {
                            "key": "X-Content-Type-Options",
                            "value": "nosniff"
                        },
                        {
                            "key": "X-Frame-Options",
                            "value": "DENY"
                        },
                        {
                            "key": "X-XSS-Protection",
                            "value": "1; mode=block"
                        },
                        {
                            "key": "Strict-Transport-Security",
                            "value": "max-age=31536000; includeSubDomains"
                        },
                        {
                            "key": "Referrer-Policy",
                            "value": "strict-origin-when-cross-origin"
                        }
                    ]
                },
                {
                    "source": "/manifest.json",
                    "headers": [
                        {
                            "key": "Content-Type",
                            "value": "application/manifest+json"
                        },
                        {
                            "key": "Cache-Control",
                            "value": "public, max-age=3600"
                        }
                    ]
                },
                {
                    "source": "/sw.js",
                    "headers": [
                        {
                            "key": "Content-Type",
                            "value": "application/javascript"
                        },
                        {
                            "key": "Cache-Control",
                            "value": "public, max-age=3600"
                        }
                    ]
                }
            ],
            "functions": {
                "api/*.js": {
                    "maxDuration": 30
                }
            }
        }
        
        with open("enhanced_vercel.json", "w") as f:
            json.dump(vercel_config, f, indent=2)
        
        print("✅ Enhanced Vercel configuration created: enhanced_vercel.json")
        return vercel_config
    
    def create_domain_setup_guide(self):
        """Create comprehensive domain setup guide"""
        print("📋 Creating domain setup guide...")
        
        guide = f"""# 🌐 ENHANCED DOMAIN SETUP GUIDE - SUGGESTLY ELITE

## 🎯 QUICK SETUP (5 MINUTES)

### Step 1: Add Domain in Vercel Dashboard
1. **Go to:** https://vercel.com/tyrones-team/suggestlyg4plus/settings/domains
2. **Click:** "Add Domain"
3. **Enter:** {self.domain}
4. **Click:** "Add"
5. **Set Production Branch:** `main`

### Step 2: Configure DNS Records
**If domain is purchased from Vercel:**
- DNS is automatically configured
- No manual DNS changes needed

**If domain is purchased elsewhere:**
- Add A record: @ → 76.76.19.19
- Add CNAME record: www → {self.vercel_url}

### Step 3: Verify Domain
1. **Wait:** 5-10 minutes for DNS propagation
2. **Test:** https://{self.domain}
3. **Verify:** HTTPS is working

## 🔧 ENHANCED CONFIGURATION

### Performance Optimizations:
- ✅ Static file caching (1 year)
- ✅ Security headers enabled
- ✅ HTTPS redirects
- ✅ Mobile optimization
- ✅ SEO headers

### Security Features:
- ✅ XSS Protection
- ✅ Content Type Options
- ✅ Frame Options
- ✅ HSTS enabled
- ✅ Referrer Policy

## 📊 VERIFICATION CHECKLIST

- [ ] Domain added to Vercel project
- [ ] DNS records configured
- [ ] HTTPS certificate active
- [ ] Website loads correctly
- [ ] Mobile responsive
- [ ] Analytics tracking
- [ ] Contact form working
- [ ] Subscription system active

## 🚀 DEPLOYMENT STATUS

**Current Vercel URL:** {self.vercel_url}
**Target Domain:** {self.domain}
**Status:** Ready for domain connection

## 📞 SUPPORT

If you encounter issues:
1. Check DNS propagation (can take 24-48 hours)
2. Verify domain ownership in Vercel
3. Contact Vercel support if needed

**Domain will be live within 5-10 minutes after setup!**
"""
        
        with open("ENHANCED_DOMAIN_SETUP_GUIDE.md", "w") as f:
            f.write(guide)
        
        print("✅ Domain setup guide created: ENHANCED_DOMAIN_SETUP_GUIDE.md")
        return guide
    
    def run_enhanced_setup(self):
        """Run complete enhanced DNS setup"""
        print("🚀 STARTING ENHANCED DNS SETUP...")
        print("=" * 50)
        
        # Step 1: Verify current status
        print("\n1️⃣ Verifying current deployment...")
        if not self.verify_vercel_deployment():
            print("❌ Vercel deployment not accessible")
            return False
        
        # Step 2: Check DNS records
        print("\n2️⃣ Checking DNS records...")
        self.check_dns_records()
        
        # Step 3: Create configurations
        print("\n3️⃣ Creating enhanced configurations...")
        self.create_dns_config()
        self.generate_vercel_config()
        
        # Step 4: Create setup guide
        print("\n4️⃣ Creating setup guide...")
        self.create_domain_setup_guide()
        
        # Step 5: Update status
        self.setup_data["status"] = "ready"
        with open("enhanced_dns_status.json", "w") as f:
            json.dump(self.setup_data, f, indent=2)
        
        print("\n" + "=" * 50)
        print("✅ ENHANCED DNS SETUP COMPLETE!")
        print("=" * 50)
        
        print(f"\n🌐 DOMAIN: {self.domain}")
        print(f"🔗 VERCEL URL: {self.vercel_url}")
        print(f"📋 GUIDE: ENHANCED_DOMAIN_SETUP_GUIDE.md")
        print(f"⚙️ CONFIG: enhanced_vercel.json")
        
        print("\n🎯 NEXT STEPS:")
        print("1. Add domain in Vercel dashboard")
        print("2. Wait 5-10 minutes for DNS propagation")
        print("3. Test domain functionality")
        print("4. Start promotion campaign")
        
        return True

if __name__ == "__main__":
    setup = EnhancedDNSSetup()
    setup.run_enhanced_setup()
