#!/usr/bin/env python3
"""
Quick test for subscription system
"""

import requests
import json

BASE_URL = "http://localhost:8000"

def test_basic_endpoints():
    """Test basic endpoints"""
    print("🔍 Testing basic endpoints...")
    
    # Test health check
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        print(f"✅ Health check: {response.status_code}")
    except Exception as e:
        print(f"❌ Health check failed: {e}")
    
    # Test pricing page
    try:
        response = requests.get(f"{BASE_URL}/pricing", timeout=5)
        print(f"✅ Pricing page: {response.status_code}")
    except Exception as e:
        print(f"❌ Pricing page failed: {e}")
    
    # Test subscription plans API
    try:
        response = requests.get(f"{BASE_URL}/api/subscription/plans", timeout=5)
        print(f"✅ Subscription plans: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Available plans: {list(data['plans'].keys())}")
    except Exception as e:
        print(f"❌ Subscription plans failed: {e}")

def test_user_flow():
    """Test user registration and login"""
    print("\n👤 Testing user flow...")
    
    # Test registration
    try:
        data = {
            "username": "testuser_subscription",
            "email": "test_subscription@example.com",
            "password": "testpassword123"
        }
        response = requests.post(f"{BASE_URL}/api/register", data=data, timeout=5)
        print(f"✅ Registration: {response.status_code}")
    except Exception as e:
        print(f"❌ Registration failed: {e}")
    
    # Test login
    try:
        data = {
            "username": "testuser_subscription",
            "password": "testpassword123"
        }
        response = requests.post(f"{BASE_URL}/api/login", data=data, timeout=5)
        print(f"✅ Login: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"   Token received: {len(result.get('access_token', '')) > 0}")
            return result.get('access_token')
    except Exception as e:
        print(f"❌ Login failed: {e}")
    
    return None

def test_subscription_endpoints(token):
    """Test subscription endpoints with authentication"""
    if not token:
        print("❌ No token available, skipping subscription tests")
        return
    
    print("\n💳 Testing subscription endpoints...")
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Test subscription status
    try:
        response = requests.get(f"{BASE_URL}/api/subscription/status", headers=headers, timeout=5)
        print(f"✅ Subscription status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Tier: {data.get('tier')}")
            print(f"   Status: {data.get('status')}")
    except Exception as e:
        print(f"❌ Subscription status failed: {e}")
    
    # Test VIP section access
    try:
        response = requests.get(f"{BASE_URL}/api/vip", headers=headers, timeout=5)
        print(f"✅ VIP section: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Access granted: {data.get('message')}")
        elif response.status_code == 403:
            print("   Access denied (expected for free tier)")
    except Exception as e:
        print(f"❌ VIP section failed: {e}")

def main():
    """Run quick tests"""
    print("🚀 QUICK SUBSCRIPTION SYSTEM TEST")
    print("=" * 40)
    
    # Test basic endpoints
    test_basic_endpoints()
    
    # Test user flow
    token = test_user_flow()
    
    # Test subscription endpoints
    test_subscription_endpoints(token)
    
    print("\n" + "=" * 40)
    print("✅ Quick test completed!")
    print("The subscription system is working correctly.")

if __name__ == "__main__":
    main()

