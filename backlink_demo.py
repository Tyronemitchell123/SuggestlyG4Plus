#!/usr/bin/env python3
"""
Sample Usage Script for SuggestlyG4Plus Backlink Builder
Demonstrates various ways to use the automated backlink building system
"""

import sys
import os
import time

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from backlink_builder import BacklinkBuilder

def demo_basic_usage():
    """Demonstrate basic backlink builder usage."""
    print("🚀 Demo: Basic Backlink Builder Usage")
    print("=" * 50)
    
    # Initialize the builder
    builder = BacklinkBuilder()
    
    # Show current configuration
    print(f"📋 Project: {builder.config['project']['name']}")
    print(f"🌐 URL: {builder.config['project']['url']}")
    print(f"📧 Contact: {builder.config['project']['contact_email']}")
    print()
    
    # Show available directories
    print("📂 Available Directories:")
    for directory in builder.config['directories']:
        status = "✅ Enabled" if directory.get('enabled', True) else "❌ Disabled"
        mode = "🎭 Simulation" if directory.get('simulation_mode', True) else "🔴 Live"
        print(f"  - {directory['name']}: {status} ({mode})")
    print()
    
    # Show available platforms
    print("📝 Available Content Platforms:")
    for platform in builder.config['content_platforms']:
        status = "✅ Enabled" if platform.get('enabled', True) else "❌ Disabled"
        mode = "🎭 Simulation" if platform.get('simulation_mode', True) else "🔴 Live"
        print(f"  - {platform['name']}: {status} ({mode})")
    print()

def demo_directory_submission():
    """Demonstrate directory submission."""
    print("📂 Demo: Directory Submission")
    print("=" * 30)
    
    builder = BacklinkBuilder()
    
    # Submit to specific directories
    print("Submitting to Product Hunt and G2...")
    results = builder.submit_to_directories(['Product Hunt', 'G2'])
    
    print(f"✅ Submitted: {results['submitted']}")
    print(f"❌ Failed: {results['failed']}")
    print(f"⏭️  Skipped: {results['skipped']}")
    print()

def demo_email_outreach():
    """Demonstrate email outreach."""
    print("📧 Demo: Email Outreach")
    print("=" * 25)
    
    builder = BacklinkBuilder()
    
    print("Sending outreach emails...")
    results = builder.send_outreach_emails()
    
    print(f"✅ Sent: {results['sent']}")
    print(f"❌ Failed: {results['failed']}")
    print(f"⏭️  Skipped: {results['skipped']}")
    print()

def demo_content_publishing():
    """Demonstrate content publishing."""
    print("📝 Demo: Content Publishing")
    print("=" * 28)
    
    builder = BacklinkBuilder()
    
    # Create sample content
    content = {
        'title': 'How AI is Transforming User Feedback Collection',
        'body': '''
# How AI is Transforming User Feedback Collection

User feedback is crucial for product success, but traditional methods are time-consuming and often miss important insights. AI-powered feedback systems are changing the game.

## Key Benefits:
- Automated categorization and prioritization
- Real-time sentiment analysis
- Predictive user behavior insights
- Scalable processing for growing businesses

## Learn More
Check out SuggestlyG4Plus at https://suggestlyg4plus.io/ for advanced AI-powered feedback solutions.

#AI #ProductManagement #UserFeedback #SaaS
        ''',
        'tags': ['ai', 'feedback', 'product-management']
    }
    
    print("Publishing content to platforms...")
    results = builder.post_content_to_platforms(content)
    
    print(f"✅ Posted: {results['posted']}")
    print(f"❌ Failed: {results['failed']}")
    print(f"⏭️  Skipped: {results['skipped']}")
    print()

def demo_comprehensive_campaign():
    """Demonstrate a comprehensive backlink campaign."""
    print("🎯 Demo: Comprehensive Campaign")
    print("=" * 32)
    
    builder = BacklinkBuilder()
    
    print("Running comprehensive backlink campaign...")
    print("This includes directory submission, email outreach, and content publishing.")
    print()
    
    results = builder.run_full_campaign('comprehensive')
    
    print("📊 Campaign Results:")
    print(f"  📂 Directories: {len(results['directories']['submitted'])} submitted")
    print(f"  📧 Emails: {len(results['emails']['sent'])} sent")
    print(f"  📝 Content: {len(results['content']['posted'])} posted")
    print(f"  ⏱️  Duration: {results['completed_at']}")
    print()

def demo_statistics():
    """Demonstrate statistics tracking."""
    print("📊 Demo: Statistics Tracking")
    print("=" * 29)
    
    builder = BacklinkBuilder()
    
    # Run a quick campaign to generate some stats
    builder.submit_to_directories(['Product Hunt'])
    
    # Show statistics
    stats = builder.get_stats()
    print("Current Statistics:")
    for key, value in stats.items():
        print(f"  {key}: {value}")
    print()

def demo_custom_configuration():
    """Demonstrate custom configuration usage."""
    print("⚙️  Demo: Custom Configuration")
    print("=" * 31)
    
    # Create a builder with custom config
    custom_config = "custom_backlink_config.json"
    
    print(f"Creating custom configuration: {custom_config}")
    builder = BacklinkBuilder(custom_config)
    
    # Customize project details
    builder.config['project']['name'] = 'My Custom Project'
    builder.config['project']['url'] = 'https://mycustomproject.com'
    builder.config['project']['description'] = 'A revolutionary new platform'
    
    # Save the custom config
    builder.save_config()
    print(f"✅ Custom configuration saved to {custom_config}")
    
    # Clean up
    if os.path.exists(custom_config):
        os.remove(custom_config)
        print(f"🧹 Cleaned up {custom_config}")
    print()

def main():
    """Run all demonstrations."""
    print("🔗 SuggestlyG4Plus Backlink Builder - Usage Demonstrations")
    print("=" * 60)
    print()
    
    demos = [
        demo_basic_usage,
        demo_directory_submission,
        demo_email_outreach,
        demo_content_publishing,
        demo_comprehensive_campaign,
        demo_statistics,
        demo_custom_configuration
    ]
    
    for i, demo in enumerate(demos, 1):
        print(f"Demo {i}/{len(demos)}:")
        try:
            demo()
            print("✅ Demo completed successfully!")
        except Exception as e:
            print(f"❌ Demo failed: {e}")
        
        print()
        if i < len(demos):
            print("⏳ Waiting 3 seconds before next demo...")
            time.sleep(3)
            print()
    
    print("🎉 All demonstrations completed!")
    print()
    print("💡 Quick Start Commands:")
    print("  python3 backlink_builder.py --help")
    print("  python3 backlink_builder.py --create-config")
    print("  python3 backlink_builder.py --campaign comprehensive")
    print("  python3 backlink_builder.py --stats")

if __name__ == "__main__":
    main()