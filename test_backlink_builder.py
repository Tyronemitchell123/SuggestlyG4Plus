#!/usr/bin/env python3
"""
Test script for the Backlink Builder Module
Validates core functionality and configuration
"""

import sys
import os
import json
import tempfile
from pathlib import Path

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from backlink_builder import BacklinkBuilder
    print("✅ Successfully imported BacklinkBuilder")
except ImportError as e:
    print(f"❌ Failed to import BacklinkBuilder: {e}")
    sys.exit(1)

def test_configuration():
    """Test configuration loading and saving."""
    print("\n🔧 Testing Configuration...")
    
    # Test with temporary config file
    import tempfile
    temp_config = tempfile.mktemp(suffix='.json')
    
    try:
        # Test default config creation
        builder = BacklinkBuilder(temp_config)
        print("✅ Default configuration created successfully")
        
        # Test config saving
        builder.save_config()
        print("✅ Configuration saved successfully")
        
        # Test config loading
        if os.path.exists(temp_config):
            with open(temp_config, 'r') as f:
                config = json.load(f)
            print(f"✅ Configuration loaded: {len(config)} sections")
        
        # Cleanup
        if os.path.exists(temp_config):
            os.unlink(temp_config)
        
    except Exception as e:
        print(f"❌ Configuration test failed: {e}")
        if os.path.exists(temp_config):
            os.unlink(temp_config)
        return False
    
    return True

def test_directory_submission():
    """Test directory submission functionality."""
    print("\n📂 Testing Directory Submission...")
    
    try:
        builder = BacklinkBuilder()
        
        # Test submission to specific directories
        results = builder.submit_to_directories(['Product Hunt', 'G2'])
        
        if 'submitted' in results and len(results['submitted']) > 0:
            print(f"✅ Directory submission test passed: {len(results['submitted'])} submissions")
            return True
        else:
            print("❌ No directories were submitted")
            return False
            
    except Exception as e:
        print(f"❌ Directory submission test failed: {e}")
        return False

def test_email_outreach():
    """Test email outreach functionality."""
    print("\n📧 Testing Email Outreach...")
    
    try:
        builder = BacklinkBuilder()
        
        # Test email outreach (simulation mode)
        results = builder.send_outreach_emails()
        
        if 'sent' in results:
            print(f"✅ Email outreach test passed: {len(results['sent'])} emails sent (simulation)")
            return True
        else:
            print("❌ Email outreach test failed")
            return False
            
    except Exception as e:
        print(f"❌ Email outreach test failed: {e}")
        return False

def test_content_posting():
    """Test content posting functionality."""
    print("\n📝 Testing Content Posting...")
    
    try:
        builder = BacklinkBuilder()
        
        # Test content posting
        sample_content = {
            'title': 'Test Article',
            'body': 'This is a test article for the backlink builder.',
            'tags': ['test', 'automation']
        }
        
        results = builder.post_content_to_platforms(sample_content)
        
        if 'posted' in results:
            print(f"✅ Content posting test passed: {len(results['posted'])} posts (simulation)")
            return True
        else:
            print("❌ Content posting test failed")
            return False
            
    except Exception as e:
        print(f"❌ Content posting test failed: {e}")
        return False

def test_comprehensive_campaign():
    """Test comprehensive campaign functionality."""
    print("\n🚀 Testing Comprehensive Campaign...")
    
    try:
        builder = BacklinkBuilder()
        
        # Test comprehensive campaign
        results = builder.run_full_campaign('comprehensive')
        
        required_sections = ['directories', 'emails', 'content', 'stats']
        if all(section in results for section in required_sections):
            print("✅ Comprehensive campaign test passed")
            print(f"   📊 Stats: {results['stats']}")
            return True
        else:
            print("❌ Comprehensive campaign test failed - missing sections")
            return False
            
    except Exception as e:
        print(f"❌ Comprehensive campaign test failed: {e}")
        return False

def test_statistics():
    """Test statistics functionality."""
    print("\n📊 Testing Statistics...")
    
    try:
        builder = BacklinkBuilder()
        
        # Get initial stats
        stats = builder.get_stats()
        
        if isinstance(stats, dict) and 'started_at' in stats:
            print("✅ Statistics test passed")
            print(f"   📈 Current stats: {stats}")
            return True
        else:
            print("❌ Statistics test failed")
            return False
            
    except Exception as e:
        print(f"❌ Statistics test failed: {e}")
        return False

def main():
    """Run all tests."""
    print("🧪 Starting Backlink Builder Tests...")
    print("=" * 50)
    
    tests = [
        test_configuration,
        test_directory_submission,
        test_email_outreach,
        test_content_posting,
        test_comprehensive_campaign,
        test_statistics
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        try:
            if test():
                passed += 1
        except Exception as e:
            print(f"❌ Test {test.__name__} crashed: {e}")
    
    print("\n" + "=" * 50)
    print(f"🎯 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Backlink Builder is ready to use.")
        return True
    else:
        print("⚠️  Some tests failed. Please check the issues above.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)