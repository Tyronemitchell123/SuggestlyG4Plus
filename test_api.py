#!/usr/bin/env python3
"""
Test script for SuggestlyG4Plus API endpoints
"""

import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_health_check():
    """Test health check endpoint"""
    print("\nTesting health check...")
    response = requests.get(f"{BASE_URL}/health")
    if response.status_code == 200:
        print("✅ Health check passed")
        return True
    else:
        print(f"❌ Health check failed: {response.status_code}")
        return False

def test_system_status():
    """Test system status endpoint"""
    print("\nTesting system status...")
    response = requests.get(f"{BASE_URL}/api/status")
    if response.status_code == 200:
        result = response.json()
        print("✅ System status retrieved successfully")
        print(f"   Platform: {result['platform']}")
        print(f"   AI Agents: {result['ai_agents']}")
        print(f"   Force Level: {result['force_level']}")
        return True
    else:
        print(f"❌ System status failed: {response.status_code}")
        return False

def test_ai_agents():
    """Test AI agents endpoint"""
    print("\nTesting AI agents...")
    response = requests.get(f"{BASE_URL}/api/agents")
    if response.status_code == 200:
        result = response.json()
        print("✅ AI agents retrieved successfully")
        print(f"   Total agents: {len(result['agents'])}")
        for agent in result['agents']:
            print(f"   - {agent['name']}: {agent['status']}")
        return True
    else:
        print(f"❌ AI agents failed: {response.status_code}")
        return False

def test_live_feeds():
    """Test live feeds endpoint"""
    print("\nTesting live feeds...")
    response = requests.get(f"{BASE_URL}/api/feeds")
    if response.status_code == 200:
        result = response.json()
        print("✅ Live feeds retrieved successfully")
        print(f"   Total feeds: {len(result['feeds'])}")
        return True
    else:
        print(f"❌ Live feeds failed: {response.status_code}")
        return False

def test_user_registration():
    """Test user registration"""
    print("\nTesting user registration...")
    data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpassword123"
    }
    response = requests.post(f"{BASE_URL}/api/register", data=data)
    if response.status_code == 200:
        print("✅ User registration successful")
        return True
    else:
        print(f"❌ User registration failed: {response.status_code}")
        print(f"   Response: {response.text}")
        return False

def test_user_login():
    """Test user login"""
    print("\nTesting user login...")
    data = {
        "username": "testuser",
        "password": "testpassword123"
    }
    response = requests.post(f"{BASE_URL}/api/login", data=data)
    if response.status_code == 200:
        result = response.json()
        print("✅ User login successful")
        print(f"   Username: {result['user']['username']}")
        print(f"   Token type: {result['token_type']}")
        return result['access_token']
    else:
        print(f"❌ User login failed: {response.status_code}")
        print(f"   Response: {response.text}")
        return None

def test_subscription_plans():
    """Test subscription plans endpoint"""
    print("\nTesting subscription plans...")
    response = requests.get(f"{BASE_URL}/api/subscription/plans")
    if response.status_code == 200:
        result = response.json()
        print("✅ Subscription plans retrieved successfully")
        print(f"   Available plans: {list(result['plans'].keys())}")
        print(f"   Billing cycles: {result['billing_cycles']}")
        return True
    else:
        print(f"❌ Subscription plans failed: {response.status_code}")
        return False

def test_subscription_status(token):
    """Test subscription status endpoint"""
    print("\nTesting subscription status...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/api/subscription/status", headers=headers)
    if response.status_code == 200:
        result = response.json()
        print("✅ Subscription status retrieved successfully")
        print(f"   Tier: {result['tier']}")
        print(f"   Status: {result['status']}")
        print(f"   API requests used: {result['api_requests_used']}")
        print(f"   API requests limit: {result['api_requests_limit']}")
        return True
    else:
        print(f"❌ Subscription status failed: {response.status_code}")
        return False

def test_vip_section(token):
    """Test VIP section access"""
    print("\nTesting VIP section access...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/api/vip", headers=headers)
    if response.status_code == 200:
        result = response.json()
        print("✅ VIP section access successful")
        print(f"   Message: {result['message']}")
        print(f"   Features: {len(result['features'])}")
        return True
    elif response.status_code == 403:
        print("⚠️ VIP section access denied (expected for free tier)")
        return True
    else:
        print(f"❌ VIP section failed: {response.status_code}")
        return False

def test_deployment_status():
    """Test deployment status endpoint"""
    print("\nTesting deployment status...")
    response = requests.get(f"{BASE_URL}/api/deployment/status")
    if response.status_code == 200:
        result = response.json()
        print("✅ Deployment status retrieved successfully")
        print(f"   Status: {result['status']}")
        print(f"   Domain: {result['domain']}")
        print(f"   Platform: {result['platform']}")
        return True
    else:
        print(f"❌ Deployment status failed: {response.status_code}")
        return False

def test_pricing_page():
    """Test pricing page accessibility"""
    print("\nTesting pricing page...")
    response = requests.get(f"{BASE_URL}/pricing")
    if response.status_code == 200:
        print("✅ Pricing page accessible")
        return True
    else:
        print(f"❌ Pricing page failed: {response.status_code}")
        return False

def main():
    """Run all tests"""
    print("🚀 SUGGESTLY G4PLUS API TESTING")
    print("=" * 50)
    
    # Test basic endpoints
    health_ok = test_health_check()
    status_ok = test_system_status()
    agents_ok = test_ai_agents()
    feeds_ok = test_live_feeds()
    deployment_ok = test_deployment_status()
    pricing_ok = test_pricing_page()
    
    # Test subscription endpoints
    plans_ok = test_subscription_plans()
    
    # Test user authentication
    registration_ok = test_user_registration()
    token = test_user_login() if registration_ok else None
    
    if token:
        subscription_ok = test_subscription_status(token)
        vip_ok = test_vip_section(token)
    else:
        subscription_ok = False
        vip_ok = False
    
    # Summary
    print("\n" + "=" * 50)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 50)
    print(f"Health Check: {'✅ PASS' if health_ok else '❌ FAIL'}")
    print(f"System Status: {'✅ PASS' if status_ok else '❌ FAIL'}")
    print(f"AI Agents: {'✅ PASS' if agents_ok else '❌ FAIL'}")
    print(f"Live Feeds: {'✅ PASS' if feeds_ok else '❌ FAIL'}")
    print(f"Deployment Status: {'✅ PASS' if deployment_ok else '❌ FAIL'}")
    print(f"Pricing Page: {'✅ PASS' if pricing_ok else '❌ FAIL'}")
    print(f"Subscription Plans: {'✅ PASS' if plans_ok else '❌ FAIL'}")
    print(f"User Registration: {'✅ PASS' if registration_ok else '❌ FAIL'}")
    print(f"User Login: {'✅ PASS' if token else '❌ FAIL'}")
    print(f"Subscription Status: {'✅ PASS' if subscription_ok else '❌ FAIL'}")
    print(f"VIP Section: {'✅ PASS' if vip_ok else '❌ FAIL'}")
    
    total_tests = 11
    passed_tests = sum([health_ok, status_ok, agents_ok, feeds_ok, deployment_ok, 
                       pricing_ok, plans_ok, registration_ok, bool(token), subscription_ok, vip_ok])
    
    print(f"\n🎯 Overall: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 All tests passed! The subscription system is working correctly.")
    else:
        print("⚠️ Some tests failed. Check the implementation.")

if __name__ == "__main__":
    main() 