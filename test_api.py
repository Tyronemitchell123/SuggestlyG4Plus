#!/usr/bin/env python3
"""
SuggestlyG4Plus v2.0 Ultra Premium API Test Suite
Tests all endpoints including new ultra premium features
"""

import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    print("\nTesting health endpoint...")
    response = requests.get(f"{BASE_URL}/health")
    if response.status_code == 200:
        data = response.json()
        print(f"Health check passed: {data['status']}")
        print(f"   Version: {data['version']}")
        print(f"   Agents active: {data['agents_active']}/{data['total_agents']}")
        print(f"   Bluetooth available: {data.get('bluetooth_available', False)}")
        print(f"   Ultra Premium: {data.get('ultra_premium_features', False)}")
        return True
    else:
        print(f"Health check failed: {response.status_code}")
        return False

def test_demo():
    """Test demo endpoint"""
    print("\nTesting demo endpoint...")
    response = requests.get(f"{BASE_URL}/demo")
    if response.status_code == 200:
        data = response.json()
        print(f"Demo endpoint working: {data['message']}")
        print(f"   Agents available: {data['agents_available']}")
        print(f"   Ultra Premium: {data.get('ultra_premium', False)}")
        return True
    else:
        print(f"Demo endpoint failed: {response.status_code}")
        return False

def test_landing_page():
    """Test main landing page"""
    print("\nTesting landing page...")
    response = requests.get(f"{BASE_URL}/")
    if response.status_code == 200:
        print("Landing page loaded successfully")
        return True
    else:
        print(f"Landing page failed: {response.status_code}")
        return False

def test_agents_portal():
    """Test agents portal"""
    print("\nTesting agents portal...")
    response = requests.get(f"{BASE_URL}/agents")
    if response.status_code == 200:
        print("Agents portal loaded successfully")
        return True
    else:
        print(f"Agents portal failed: {response.status_code}")
        return False

def test_registration():
    """Test user registration"""
    print("\nTesting user registration...")
    params = {
        "username": "testuser_premium",
        "email": "test_premium@example.com",
        "password": "testpassword123",
        "subscription_tier": "ultra_premium"
    }
    response = requests.post(f"{BASE_URL}/auth/register", params=params)
    if response.status_code == 200:
        result = response.json()
        print("User registration successful")
        print(f"   Message: {result['message']}")
        return "registration_successful"
    else:
        print(f"Registration failed: {response.status_code}")
        print(f"   Response: {response.text}")
        return None

def test_login():
    """Test user login"""
    print("\nTesting user login...")
    params = {
        "username": "testuser",
        "password": "testpassword123"
    }
    response = requests.post(f"{BASE_URL}/auth/login", params=params)
    if response.status_code == 200:
        result = response.json()
        print("User login successful")
        print(f"   Subscription tier: {result['user']['subscription_tier']}")
        return result['access_token']
    else:
        print(f"Login failed: {response.status_code}")
        return None

def test_agent_status(token):
    """Test agent status endpoint"""
    print("\nTesting agent status...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/api/agents/status", headers=headers)
    if response.status_code == 200:
        data = response.json()
        print("Agent status retrieved successfully")
        print(f"   System status: {data['system_status']}")
        print(f"   Active agents: {data['active_agents']}/{data['total_agents']}")
        print(f"   Ultra Premium: {data.get('ultra_premium', False)}")
        return True
    else:
        print(f"Agent status failed: {response.status_code}")
        return False

def test_agent_chat(token):
    """Test agent chat functionality"""
    print("\nTesting agent chat...")
    headers = {"Authorization": f"Bearer {token}"}
    params = {
        "agent_name": "ANALYST",
        "message": "Hello, can you analyze the current market trends?",
        "premium_mode": False
    }
    response = requests.post(f"{BASE_URL}/api/agents/chat", headers=headers, params=params)
    if response.status_code == 200:
        result = response.json()
        print("Agent chat working")
        print(f"   Agent: {result['agent']}")
        print(f"   Response: {result['response'][:100]}...")
        print(f"   Premium mode: {result.get('premium_mode', False)}")
        return True
    else:
        print(f"Agent chat failed: {response.status_code}")
        return False

def test_premium_agent_chat(token):
    """Test ultra premium agent chat functionality"""
    print("\nTesting ultra premium agent chat...")
    headers = {"Authorization": f"Bearer {token}"}
    params = {
        "agent_name": "ANALYST",
        "message": "Hello, can you analyze the current market trends with quantum computing?",
        "premium_mode": True
    }
    response = requests.post(f"{BASE_URL}/api/agents/chat", headers=headers, params=params)
    if response.status_code == 200:
        result = response.json()
        print("Ultra premium agent chat working")
        print(f"   Agent: {result['agent']}")
        print(f"   Response: {result['response'][:100]}...")
        print(f"   Premium mode: {result.get('premium_mode', False)}")
        return True
    else:
        print(f"Ultra premium agent chat failed: {response.status_code}")
        print(f"   Response: {response.text}")
        return False

def test_bluetooth_agent(token):
    """Test Bluetooth agent functionality"""
    print("\nTesting Bluetooth agent...")
    headers = {"Authorization": f"Bearer {token}"}
    params = {
        "agent_name": "BLUETOOTH",
        "message": "Scan for nearby IoT devices",
        "premium_mode": True
    }
    response = requests.post(f"{BASE_URL}/api/agents/chat", headers=headers, params=params)
    if response.status_code == 200:
        result = response.json()
        print("Bluetooth agent working")
        print(f"   Agent: {result['agent']}")
        print(f"   Response: {result['response'][:100]}...")
        print(f"   Premium mode: {result.get('premium_mode', False)}")
        return True
    else:
        print(f"Bluetooth agent failed: {response.status_code}")
        print(f"   Response: {response.text}")
        return False

def test_system_status(token):
    """Test system status endpoint"""
    print("\nTesting system status...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/api/system/status", headers=headers)
    if response.status_code == 200:
        data = response.json()
        print("System status retrieved successfully")
        print(f"   System status: {data['system_status']}")
        print(f"   Total users: {data['total_users']}")
        print(f"   Total interactions: {data['total_interactions']}")
        print(f"   Bluetooth available: {data.get('bluetooth_available', False)}")
        print(f"   Ultra Premium: {data.get('ultra_premium', False)}")
        return True
    else:
        print(f"System status failed: {response.status_code}")
        return False

def test_subscription_tiers():
    """Test subscription tiers endpoint"""
    print("\nTesting subscription tiers...")
    response = requests.get(f"{BASE_URL}/api/premium/subscription-tiers")
    if response.status_code == 200:
        data = response.json()
        print("Subscription tiers retrieved successfully")
        print(f"   Available tiers: {list(data['tiers'].keys())}")
        print(f"   Ultra Premium: {data.get('ultra_premium', False)}")
        return True
    else:
        print(f"Subscription tiers failed: {response.status_code}")
        return False

def test_upgrade_subscription(token):
    """Test subscription upgrade"""
    print("\nTesting subscription upgrade...")
    headers = {"Authorization": f"Bearer {token}"}
    params = {
        "tier": "ultra_premium"
    }
    response = requests.get(f"{BASE_URL}/api/premium/upgrade", headers=headers, params=params)
    if response.status_code == 200:
        result = response.json()
        print("Subscription upgrade successful")
        print(f"   New tier: {result['new_tier']}")
        print(f"   Features: {len(result['features'])} features")
        return True
    else:
        print(f"Subscription upgrade failed: {response.status_code}")
        print(f"   Response: {response.text}")
        return False

def main():
    """Run all tests"""
    print("Starting SuggestlyG4Plus v2.0 Ultra Premium API Tests")
    print("=" * 60)
    
    # Test basic endpoints
    health_ok = test_health()
    demo_ok = test_demo()
    landing_ok = test_landing_page()
    agents_portal_ok = test_agents_portal()
    
    # Test subscription tiers
    tiers_ok = test_subscription_tiers()
    
    # Test authentication
    token = test_login()
    if not token:
        print("Skipping authenticated tests due to login failure")
        auth_ok = False
        agent_status_ok = False
        agent_chat_ok = False
        premium_chat_ok = False
        bluetooth_ok = False
        system_status_ok = False
        upgrade_ok = False
    else:
        auth_ok = True
        agent_status_ok = test_agent_status(token)
        agent_chat_ok = test_agent_chat(token)
        premium_chat_ok = test_premium_agent_chat(token)
        bluetooth_ok = test_bluetooth_agent(token)
        system_status_ok = test_system_status(token)
        upgrade_ok = test_upgrade_subscription(token)
    
    # Print summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    print(f"Health Check: {'PASS' if health_ok else 'FAIL'}")
    print(f"Demo Endpoint: {'PASS' if demo_ok else 'FAIL'}")
    print(f"Landing Page: {'PASS' if landing_ok else 'FAIL'}")
    print(f"Agents Portal: {'PASS' if agents_portal_ok else 'FAIL'}")
    print(f"Subscription Tiers: {'PASS' if tiers_ok else 'FAIL'}")
    print(f"Authentication: {'PASS' if auth_ok else 'FAIL'}")
    print(f"Agent Status: {'PASS' if agent_status_ok else 'FAIL'}")
    print(f"Agent Chat: {'PASS' if agent_chat_ok else 'FAIL'}")
    print(f"Ultra Premium Chat: {'PASS' if premium_chat_ok else 'FAIL'}")
    print(f"Bluetooth Agent: {'PASS' if bluetooth_ok else 'FAIL'}")
    print(f"System Status: {'PASS' if system_status_ok else 'FAIL'}")
    print(f"Subscription Upgrade: {'PASS' if upgrade_ok else 'FAIL'}")
    
    all_tests_passed = all([
        health_ok, demo_ok, landing_ok, agents_portal_ok, tiers_ok,
        auth_ok, agent_status_ok, agent_chat_ok, premium_chat_ok,
        bluetooth_ok, system_status_ok, upgrade_ok
    ])
    
    print("\n" + "=" * 60)
    if all_tests_passed:
        print("Overall Result: ALL TESTS PASSED")
        print("\nSuggestlyG4Plus v2.0 Ultra Premium is working perfectly!")
        print("   You can now access the application at: http://localhost:8000")
        print("   API documentation at: http://localhost:8000/docs")
        print("   Ultra Premium features are fully operational!")
    else:
        print("Overall Result: SOME TESTS FAILED")
        print("Please check the errors above and fix any issues.")

if __name__ == "__main__":
    main() 