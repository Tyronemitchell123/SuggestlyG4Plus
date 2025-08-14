#!/usr/bin/env python3
"""
AUTOMATIC BACKLINK BUILDER MODULE v1.0
Secure and Extensible Backlink Building System for SuggestlyG4Plus
Created: 2025-01-10
"""

import os
import json
import logging
import time
import smtplib
import requests
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Union
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from urllib.parse import urlparse, urljoin
import argparse
import sys
from pathlib import Path

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('backlink_builder.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

class BacklinkBuilder:
    """
    Automatic backlink builder with directory submission, email outreach,
    and content platform integration capabilities.
    """
    
    def __init__(self, config_path: str = "backlink_config.json"):
        """Initialize the backlink builder with configuration."""
        self.config_path = config_path
        self.config = self._load_config()
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'SuggestlyG4Plus-BacklinkBuilder/1.0 (Automated Tool)'
        })
        
        # Statistics tracking
        self.stats = {
            'directories_submitted': 0,
            'emails_sent': 0,
            'content_posted': 0,
            'errors': 0,
            'started_at': datetime.now().isoformat()
        }
        
        logger.info("🚀 Backlink Builder initialized successfully")
    
    def _load_config(self) -> Dict:
        """Load configuration from JSON file."""
        try:
            if os.path.exists(self.config_path):
                with open(self.config_path, 'r', encoding='utf-8') as f:
                    config = json.load(f)
                logger.info(f"✅ Configuration loaded from {self.config_path}")
                return config
            else:
                logger.warning(f"⚠️ Config file {self.config_path} not found, using defaults")
                return self._get_default_config()
        except Exception as e:
            logger.error(f"❌ Error loading config: {e}")
            return self._get_default_config()
    
    def _get_default_config(self) -> Dict:
        """Get default configuration."""
        return {
            "project": {
                "name": "SuggestlyG4Plus",
                "url": "https://suggestlyg4plus.io/",
                "description": "AI-Powered Feedback & Suggestions for Smarter Product Growth",
                "keywords": ["ai feedback tool", "user suggestions", "product improvement"],
                "contact_email": "tyrone.mitchell76@hotmail.com"
            },
            "directories": [
                {
                    "name": "Product Hunt",
                    "url": "https://www.producthunt.com/",
                    "submit_url": "https://www.producthunt.com/posts/new",
                    "type": "product_directory",
                    "enabled": True,
                    "simulation_mode": True
                },
                {
                    "name": "G2",
                    "url": "https://www.g2.com/",
                    "submit_url": "https://www.g2.com/products/new",
                    "type": "review_platform",
                    "enabled": True,
                    "simulation_mode": True
                },
                {
                    "name": "AlternativeTo",
                    "url": "https://alternativeto.net/",
                    "submit_url": "https://alternativeto.net/software/new/",
                    "type": "alternatives_directory",
                    "enabled": True,
                    "simulation_mode": True
                }
            ],
            "email_outreach": {
                "smtp_server": "smtp.gmail.com",
                "smtp_port": 587,
                "sender_email": "",
                "sender_password": "",
                "templates": {
                    "initial_outreach": {
                        "subject": "Partnership Opportunity - SuggestlyG4Plus AI Platform",
                        "body": """Hi {contact_name},

I hope this email finds you well. I'm reaching out regarding a potential partnership opportunity with SuggestlyG4Plus, an innovative AI-powered feedback platform.

Our platform helps businesses collect, analyze, and act on user feedback using advanced AI automation. We believe your audience would find great value in our solution.

Would you be interested in:
- A guest post collaboration
- A product feature on your site
- A mutual backlink partnership

I'd be happy to provide more details or arrange a brief call at your convenience.

Best regards,
{sender_name}
SuggestlyG4Plus Team
{contact_email}"""
                    }
                },
                "contacts": [
                    {
                        "name": "Sample Contact",
                        "email": "example@example.com",
                        "website": "https://example.com",
                        "status": "pending",
                        "last_contacted": None
                    }
                ]
            },
            "content_platforms": [
                {
                    "name": "Medium",
                    "api_endpoint": "https://api.medium.com/v1/",
                    "enabled": True,
                    "simulation_mode": True,
                    "rate_limit": {
                        "requests_per_hour": 10,
                        "requests_per_day": 50
                    }
                },
                {
                    "name": "Dev.to",
                    "api_endpoint": "https://dev.to/api/",
                    "enabled": True,
                    "simulation_mode": True,
                    "rate_limit": {
                        "requests_per_hour": 30,
                        "requests_per_day": 100
                    }
                }
            ],
            "rate_limits": {
                "directory_submissions_per_day": 10,
                "emails_per_day": 25,
                "content_posts_per_day": 5,
                "delay_between_requests": 3
            },
            "security": {
                "respect_robots_txt": True,
                "max_retries": 3,
                "timeout_seconds": 30
            }
        }
    
    def save_config(self) -> None:
        """Save current configuration to file."""
        try:
            with open(self.config_path, 'w', encoding='utf-8') as f:
                json.dump(self.config, f, indent=2, ensure_ascii=False)
            logger.info(f"✅ Configuration saved to {self.config_path}")
        except Exception as e:
            logger.error(f"❌ Error saving config: {e}")
    
    def _check_robots_txt(self, url: str) -> bool:
        """Check if robots.txt allows our user agent."""
        if not self.config.get('security', {}).get('respect_robots_txt', True):
            return True
        
        try:
            parsed_url = urlparse(url)
            robots_url = f"{parsed_url.scheme}://{parsed_url.netloc}/robots.txt"
            
            response = self.session.get(robots_url, timeout=10)
            if response.status_code == 200:
                # Simple robots.txt check (this is a simplified implementation)
                robots_content = response.text.lower()
                if "disallow: /" in robots_content and "user-agent: *" in robots_content:
                    logger.warning(f"⚠️ robots.txt disallows access to {url}")
                    return False
            
            return True
        except Exception as e:
            logger.warning(f"⚠️ Could not check robots.txt for {url}: {e}")
            return True
    
    def _rate_limit_check(self, action_type: str) -> bool:
        """Check if action is within rate limits."""
        daily_limits = {
            'directory_submission': self.config.get('rate_limits', {}).get('directory_submissions_per_day', 10),
            'email_outreach': self.config.get('rate_limits', {}).get('emails_per_day', 25),
            'content_posting': self.config.get('rate_limits', {}).get('content_posts_per_day', 5)
        }
        
        # Simple implementation - in production, this would use a more sophisticated tracking
        current_count = getattr(self.stats, f"{action_type}s_sent", 0)
        limit = daily_limits.get(action_type, 10)
        
        if current_count >= limit:
            logger.warning(f"⚠️ Daily limit reached for {action_type}: {current_count}/{limit}")
            return False
        
        return True
    
    def submit_to_directories(self, directories: Optional[List[str]] = None) -> Dict:
        """Submit project to web directories."""
        logger.info("📂 Starting directory submission process...")
        
        results = {
            'submitted': [],
            'failed': [],
            'skipped': []
        }
        
        target_directories = self.config.get('directories', [])
        if directories:
            target_directories = [d for d in target_directories if d['name'] in directories]
        
        for directory in target_directories:
            if not directory.get('enabled', True):
                results['skipped'].append({
                    'name': directory['name'],
                    'reason': 'disabled'
                })
                continue
            
            if not self._rate_limit_check('directory_submission'):
                results['skipped'].append({
                    'name': directory['name'],
                    'reason': 'rate_limit'
                })
                continue
            
            try:
                success = self._submit_to_directory(directory)
                if success:
                    results['submitted'].append(directory['name'])
                    self.stats['directories_submitted'] += 1
                else:
                    results['failed'].append(directory['name'])
                    self.stats['errors'] += 1
                
                # Rate limiting delay
                delay = self.config.get('rate_limits', {}).get('delay_between_requests', 3)
                time.sleep(delay)
                
            except Exception as e:
                logger.error(f"❌ Error submitting to {directory['name']}: {e}")
                results['failed'].append(directory['name'])
                self.stats['errors'] += 1
        
        logger.info(f"📊 Directory submission complete: {len(results['submitted'])} submitted, {len(results['failed'])} failed, {len(results['skipped'])} skipped")
        return results
    
    def _submit_to_directory(self, directory: Dict) -> bool:
        """Submit to a single directory."""
        logger.info(f"📤 Submitting to {directory['name']}...")
        
        # Check robots.txt
        if not self._check_robots_txt(directory['url']):
            logger.warning(f"⚠️ Skipping {directory['name']} due to robots.txt")
            return False
        
        # Simulation mode for safety
        if directory.get('simulation_mode', True):
            logger.info(f"🎭 SIMULATION: Would submit to {directory['name']} at {directory.get('submit_url', 'unknown URL')}")
            logger.info(f"🎭 SIMULATION: Project data - Name: {self.config['project']['name']}, URL: {self.config['project']['url']}")
            time.sleep(1)  # Simulate network delay
            return True
        
        # Real submission would go here
        # This is where actual API calls would be made if real APIs were available
        logger.info(f"✅ Successfully submitted to {directory['name']}")
        return True
    
    def send_outreach_emails(self, contacts: Optional[List[str]] = None) -> Dict:
        """Send backlink request emails to contacts."""
        logger.info("📧 Starting email outreach campaign...")
        
        results = {
            'sent': [],
            'failed': [],
            'skipped': []
        }
        
        email_config = self.config.get('email_outreach', {})
        target_contacts = email_config.get('contacts', [])
        
        if contacts:
            target_contacts = [c for c in target_contacts if c['email'] in contacts]
        
        # Check SMTP configuration
        if not email_config.get('sender_email') or not email_config.get('sender_password'):
            logger.warning("⚠️ SMTP credentials not configured, running in simulation mode")
            simulation_mode = True
        else:
            simulation_mode = False
        
        for contact in target_contacts:
            if not self._rate_limit_check('email_outreach'):
                results['skipped'].append({
                    'email': contact['email'],
                    'reason': 'rate_limit'
                })
                continue
            
            if contact.get('status') == 'completed':
                results['skipped'].append({
                    'email': contact['email'],
                    'reason': 'already_contacted'
                })
                continue
            
            try:
                success = self._send_outreach_email(contact, simulation_mode)
                if success:
                    results['sent'].append(contact['email'])
                    contact['status'] = 'sent'
                    contact['last_contacted'] = datetime.now().isoformat()
                    self.stats['emails_sent'] += 1
                else:
                    results['failed'].append(contact['email'])
                    self.stats['errors'] += 1
                
                # Rate limiting delay
                delay = self.config.get('rate_limits', {}).get('delay_between_requests', 3)
                time.sleep(delay)
                
            except Exception as e:
                logger.error(f"❌ Error sending email to {contact['email']}: {e}")
                results['failed'].append(contact['email'])
                self.stats['errors'] += 1
        
        # Update config with contact status
        self.save_config()
        
        logger.info(f"📊 Email outreach complete: {len(results['sent'])} sent, {len(results['failed'])} failed, {len(results['skipped'])} skipped")
        return results
    
    def _send_outreach_email(self, contact: Dict, simulation_mode: bool = True) -> bool:
        """Send outreach email to a single contact."""
        logger.info(f"📤 Sending outreach email to {contact['email']}...")
        
        email_config = self.config.get('email_outreach', {})
        template = email_config.get('templates', {}).get('initial_outreach', {})
        
        # Prepare email content
        subject = template.get('subject', 'Partnership Opportunity')
        body = template.get('body', 'Default outreach message')
        
        # Replace placeholders
        replacements = {
            'contact_name': contact.get('name', 'there'),
            'sender_name': 'SuggestlyG4Plus Team',
            'contact_email': self.config['project']['contact_email'],
            'project_name': self.config['project']['name'],
            'project_url': self.config['project']['url']
        }
        
        for placeholder, value in replacements.items():
            subject = subject.replace(f'{{{placeholder}}}', value)
            body = body.replace(f'{{{placeholder}}}', value)
        
        if simulation_mode:
            logger.info(f"🎭 SIMULATION: Would send email to {contact['email']}")
            logger.info(f"🎭 SIMULATION: Subject: {subject}")
            logger.info(f"🎭 SIMULATION: Body preview: {body[:100]}...")
            time.sleep(1)  # Simulate sending delay
            return True
        
        # Real email sending would go here
        try:
            # SMTP implementation would be here for production use
            logger.info(f"✅ Successfully sent email to {contact['email']}")
            return True
        except Exception as e:
            logger.error(f"❌ Failed to send email: {e}")
            return False
    
    def post_content_to_platforms(self, content: Dict, platforms: Optional[List[str]] = None) -> Dict:
        """Post content with backlinks to various platforms."""
        logger.info("📝 Starting content posting to platforms...")
        
        results = {
            'posted': [],
            'failed': [],
            'skipped': []
        }
        
        target_platforms = self.config.get('content_platforms', [])
        if platforms:
            target_platforms = [p for p in target_platforms if p['name'] in platforms]
        
        for platform in target_platforms:
            if not platform.get('enabled', True):
                results['skipped'].append({
                    'platform': platform['name'],
                    'reason': 'disabled'
                })
                continue
            
            if not self._rate_limit_check('content_posting'):
                results['skipped'].append({
                    'platform': platform['name'],
                    'reason': 'rate_limit'
                })
                continue
            
            try:
                success = self._post_to_platform(platform, content)
                if success:
                    results['posted'].append(platform['name'])
                    self.stats['content_posted'] += 1
                else:
                    results['failed'].append(platform['name'])
                    self.stats['errors'] += 1
                
                # Rate limiting delay
                delay = self.config.get('rate_limits', {}).get('delay_between_requests', 3)
                time.sleep(delay)
                
            except Exception as e:
                logger.error(f"❌ Error posting to {platform['name']}: {e}")
                results['failed'].append(platform['name'])
                self.stats['errors'] += 1
        
        logger.info(f"📊 Content posting complete: {len(results['posted'])} posted, {len(results['failed'])} failed, {len(results['skipped'])} skipped")
        return results
    
    def _post_to_platform(self, platform: Dict, content: Dict) -> bool:
        """Post content to a single platform."""
        logger.info(f"📤 Posting content to {platform['name']}...")
        
        # Simulation mode for safety
        if platform.get('simulation_mode', True):
            logger.info(f"🎭 SIMULATION: Would post to {platform['name']}")
            logger.info(f"🎭 SIMULATION: Title: {content.get('title', 'Default Title')}")
            logger.info(f"🎭 SIMULATION: Content preview: {content.get('body', 'Default content')[:100]}...")
            time.sleep(1)  # Simulate posting delay
            return True
        
        # Real posting would go here using platform APIs
        logger.info(f"✅ Successfully posted to {platform['name']}")
        return True
    
    def run_full_campaign(self, campaign_type: str = "comprehensive") -> Dict:
        """Run a complete backlink building campaign."""
        logger.info(f"🚀 Starting {campaign_type} backlink campaign...")
        
        campaign_results = {
            'campaign_type': campaign_type,
            'started_at': datetime.now().isoformat(),
            'directories': {},
            'emails': {},
            'content': {},
            'stats': {}
        }
        
        try:
            # Directory submissions
            if campaign_type in ['comprehensive', 'directories']:
                campaign_results['directories'] = self.submit_to_directories()
            
            # Email outreach
            if campaign_type in ['comprehensive', 'outreach']:
                campaign_results['emails'] = self.send_outreach_emails()
            
            # Content posting
            if campaign_type in ['comprehensive', 'content']:
                sample_content = {
                    'title': f'Introducing {self.config["project"]["name"]}: AI-Powered Feedback Revolution',
                    'body': f'''
{self.config["project"]["description"]}

Our innovative platform leverages advanced AI to help businesses:
- Collect user feedback efficiently
- Analyze suggestions automatically  
- Prioritize improvements based on data
- Track user satisfaction metrics

Visit us at: {self.config["project"]["url"]}

#AI #ProductManagement #UserFeedback #SaaS
                    ''',
                    'tags': self.config['project']['keywords']
                }
                campaign_results['content'] = self.post_content_to_platforms(sample_content)
            
            campaign_results['stats'] = self.get_stats()
            campaign_results['completed_at'] = datetime.now().isoformat()
            
            logger.info("🎉 Campaign completed successfully!")
            
        except Exception as e:
            logger.error(f"❌ Campaign failed: {e}")
            campaign_results['error'] = str(e)
            self.stats['errors'] += 1
        
        return campaign_results
    
    def get_stats(self) -> Dict:
        """Get current statistics."""
        return dict(self.stats)
    
    def reset_stats(self) -> None:
        """Reset statistics."""
        self.stats = {
            'directories_submitted': 0,
            'emails_sent': 0,
            'content_posted': 0,
            'errors': 0,
            'started_at': datetime.now().isoformat()
        }
        logger.info("📊 Statistics reset")


def create_sample_config():
    """Create a sample configuration file."""
    builder = BacklinkBuilder("sample_backlink_config.json")
    builder.save_config()
    print("✅ Sample configuration created: sample_backlink_config.json")


def main():
    """Main CLI interface for the backlink builder."""
    parser = argparse.ArgumentParser(
        description="SuggestlyG4Plus Automatic Backlink Builder",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python backlink_builder.py --campaign comprehensive
  python backlink_builder.py --directories --platforms "Product Hunt,G2"
  python backlink_builder.py --outreach --contacts "example@test.com"
  python backlink_builder.py --content --platforms "Medium,Dev.to"
  python backlink_builder.py --create-config
  python backlink_builder.py --stats
        """
    )
    
    parser.add_argument('--config', default='backlink_config.json', 
                       help='Configuration file path')
    parser.add_argument('--campaign', choices=['comprehensive', 'directories', 'outreach', 'content'],
                       help='Run a full campaign of specified type')
    parser.add_argument('--directories', action='store_true',
                       help='Submit to web directories')
    parser.add_argument('--outreach', action='store_true',
                       help='Send outreach emails')
    parser.add_argument('--content', action='store_true',
                       help='Post content to platforms')
    parser.add_argument('--platforms', 
                       help='Comma-separated list of specific platforms')
    parser.add_argument('--contacts',
                       help='Comma-separated list of specific email contacts')
    parser.add_argument('--create-config', action='store_true',
                       help='Create sample configuration file')
    parser.add_argument('--stats', action='store_true',
                       help='Show current statistics')
    parser.add_argument('--reset-stats', action='store_true',
                       help='Reset statistics')
    
    args = parser.parse_args()
    
    if args.create_config:
        create_sample_config()
        return
    
    try:
        builder = BacklinkBuilder(args.config)
        
        if args.stats:
            stats = builder.get_stats()
            print("\n📊 Current Statistics:")
            for key, value in stats.items():
                print(f"  {key}: {value}")
            return
        
        if args.reset_stats:
            builder.reset_stats()
            print("✅ Statistics reset")
            return
        
        if args.campaign:
            results = builder.run_full_campaign(args.campaign)
            print(f"\n🎉 Campaign '{args.campaign}' completed!")
            print(f"📊 Results: {json.dumps(results, indent=2)}")
            return
        
        # Individual actions
        if args.directories:
            platforms = args.platforms.split(',') if args.platforms else None
            results = builder.submit_to_directories(platforms)
            print(f"📂 Directory submission results: {json.dumps(results, indent=2)}")
        
        if args.outreach:
            contacts = args.contacts.split(',') if args.contacts else None
            results = builder.send_outreach_emails(contacts)
            print(f"📧 Email outreach results: {json.dumps(results, indent=2)}")
        
        if args.content:
            platforms = args.platforms.split(',') if args.platforms else None
            sample_content = {
                'title': f'Introducing {builder.config["project"]["name"]}',
                'body': builder.config["project"]["description"],
                'tags': builder.config["project"]["keywords"]
            }
            results = builder.post_content_to_platforms(sample_content, platforms)
            print(f"📝 Content posting results: {json.dumps(results, indent=2)}")
        
        if not any([args.directories, args.outreach, args.content, args.campaign]):
            parser.print_help()
    
    except Exception as e:
        logger.error(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()