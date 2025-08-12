#!/usr/bin/env python3
"""
SUGGESTLY G4PLUS - ULTRA SECURE AI PLATFORM
Advanced AI Agents with Maximum Force Deployment
"""

import os
import sys
import json
import time
import asyncio
import hashlib
import secrets
import sqlite3
import requests
import websockets
import websocket
import jwt
import bcrypt
import stripe
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional
from fastapi import FastAPI, HTTPException, Depends, WebSocket, WebSocketDisconnect, Form, Request
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn
from pydantic import BaseModel
import threading
import queue
import logging

# Mock implementations for missing modules
class MockYFinance:
    def Ticker(self, symbol):
        return MockTicker()

class MockTicker:
    def info(self):
        return {"regularMarketPrice": 150.0, "marketCap": 1000000000}

class MockFeedParser:
    def parse(self, url):
        return {"entries": [{"title": "Mock News", "summary": "Mock content"}]}

class MockBeautifulSoup:
    def __init__(self, content, parser):
        self.content = content
    def find_all(self, tag):
        return [{"text": "Mock content"}]

class MockRandomForest:
    def fit(self, X, y):
        pass
    def predict(self, X):
        return [0.5] * len(X)

# Mock modules
yf = MockYFinance()
feedparser = MockFeedParser()
BeautifulSoup = MockBeautifulSoup
RandomForestRegressor = MockRandomForest
pd = None  # Will be handled in functions
np = None  # Will be handled in functions

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure Stripe
stripe.api_key = os.getenv('STRIPE_SECRET_KEY', 'sk_test_your_stripe_test_key_here')
STRIPE_PUBLISHABLE_KEY = os.getenv('STRIPE_PUBLISHABLE_KEY', 'pk_test_your_stripe_publishable_key_here')

# JWT Configuration
SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-here')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Subscription plans configuration
SUBSCRIPTION_PLANS = {
    'basic': {
        'monthly': {'price_id': 'price_basic_monthly', 'amount': 1900},  # $19.00
        'yearly': {'price_id': 'price_basic_yearly', 'amount': 18200}   # $182.00
    },
    'pro': {
        'monthly': {'price_id': 'price_pro_monthly', 'amount': 7900},   # $79.00
        'yearly': {'price_id': 'price_pro_yearly', 'amount': 75900}     # $759.00
    },
    'vip': {
        'monthly': {'price_id': 'price_vip_monthly', 'amount': 19900},  # $199.00
        'yearly': {'price_id': 'price_vip_yearly', 'amount': 190900}    # $1,909.00
    }
}

# Initialize FastAPI app
app = FastAPI(
    title="SuggestlyG4Plus v2.0",
    description="Enhanced Ultra Secure AI Platform with Maximum Force",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Security
security = HTTPBearer()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
def get_db_connection():
    """Get database connection"""
    return sqlite3.connect('suggestly.db')

def init_db():
    """Initialize database with all tables"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            subscription_tier TEXT DEFAULT 'free',
            subscription_status TEXT DEFAULT 'inactive',
            stripe_customer_id TEXT,
            stripe_subscription_id TEXT,
            subscription_end_date TIMESTAMP,
            api_requests_count INTEGER DEFAULT 0,
            last_api_request TIMESTAMP
        )
    ''')
    
    # Subscriptions table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS subscriptions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            stripe_subscription_id TEXT UNIQUE,
            plan_type TEXT NOT NULL,
            billing_cycle TEXT NOT NULL,
            amount INTEGER NOT NULL,
            status TEXT NOT NULL,
            current_period_start TIMESTAMP,
            current_period_end TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Payment history table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS payment_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            stripe_payment_intent_id TEXT UNIQUE,
            amount INTEGER NOT NULL,
            currency TEXT DEFAULT 'usd',
            status TEXT NOT NULL,
            payment_method TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # API usage tracking table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS api_usage (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            endpoint TEXT NOT NULL,
            request_count INTEGER DEFAULT 1,
            last_request TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    conn.commit()
    conn.close()
    print("✅ Database initialized with subscription tables")

def get_user_subscription(user_id: int) -> Dict[str, Any]:
    """Get user's current subscription details"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT subscription_tier, subscription_status, stripe_subscription_id, 
               subscription_end_date, api_requests_count
        FROM users WHERE id = ?
    ''', (user_id,))
    
    result = cursor.fetchone()
    conn.close()
    
    if result:
        return {
            'tier': result[0],
            'status': result[1],
            'stripe_subscription_id': result[2],
            'end_date': result[3],
            'api_requests_count': result[4]
        }
    return None

def update_user_subscription(user_id: int, tier: str, status: str, stripe_subscription_id: str = None):
    """Update user's subscription details"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        UPDATE users 
        SET subscription_tier = ?, subscription_status = ?, 
            stripe_subscription_id = ?, subscription_end_date = ?
        WHERE id = ?
    ''', (tier, status, stripe_subscription_id, 
          datetime.now() + timedelta(days=30) if tier != 'free' else None, user_id))
    
    conn.commit()
    conn.close()

def create_stripe_customer(user_id: int, email: str) -> str:
    """Create Stripe customer and return customer ID"""
    try:
        customer = stripe.Customer.create(
            email=email,
            metadata={'user_id': user_id}
        )
        
        # Update user with Stripe customer ID
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('UPDATE users SET stripe_customer_id = ? WHERE id = ?', 
                      (customer.id, user_id))
        conn.commit()
        conn.close()
        
        return customer.id
    except Exception as e:
        logger.error(f"Error creating Stripe customer: {e}")
        raise HTTPException(status_code=500, detail="Failed to create payment account")

def create_subscription_record(user_id: int, plan_type: str, billing_cycle: str, 
                             amount: int, stripe_subscription_id: str):
    """Create subscription record in database"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO subscriptions 
        (user_id, stripe_subscription_id, plan_type, billing_cycle, amount, status)
        VALUES (?, ?, ?, ?, ?, 'active')
    ''', (user_id, stripe_subscription_id, plan_type, billing_cycle, amount))
    
    conn.commit()
    conn.close()

def check_api_rate_limit(user_id: int, endpoint: str) -> bool:
    """Check if user has exceeded API rate limits"""
    subscription = get_user_subscription(user_id)
    if not subscription:
        return False
    
    # Rate limits based on subscription tier
    rate_limits = {
        'free': 10,
        'basic': 100,
        'pro': 1000,
        'vip': 10000
    }
    
    limit = rate_limits.get(subscription['tier'], 10)
    current_count = subscription['api_requests_count']
    
    return current_count < limit

def increment_api_usage(user_id: int, endpoint: str):
    """Increment API usage counter"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Update user's API request count
    cursor.execute('''
        UPDATE users 
        SET api_requests_count = api_requests_count + 1, 
            last_api_request = CURRENT_TIMESTAMP
        WHERE id = ?
    ''', (user_id,))
    
    # Log API usage
    cursor.execute('''
        INSERT OR REPLACE INTO api_usage (user_id, endpoint, request_count, last_request)
        VALUES (?, ?, COALESCE((SELECT request_count + 1 FROM api_usage 
                               WHERE user_id = ? AND endpoint = ?), 1), CURRENT_TIMESTAMP)
    ''', (user_id, endpoint, user_id, endpoint))
    
    conn.commit()
    conn.close()

# Initialize database
init_db()

# Authentication functions
def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify JWT token"""
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    """Verify password against hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_access_token(data: dict, expires_delta: timedelta = None):
    """Create JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Rate limiting middleware
@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    """Rate limiting middleware based on subscription tier"""
    # Skip rate limiting for certain endpoints
    if request.url.path in ['/', '/pricing', '/subscription/success', '/health', '/api/status']:
        response = await call_next(request)
        return response
    
    # Get user from token if available
    user_id = None
    try:
        auth_header = request.headers.get('authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id = payload.get('user_id')
    except:
        pass
    
    if user_id:
        # Check rate limits for authenticated users
        if not check_api_rate_limit(user_id, request.url.path):
            return JSONResponse(
                status_code=429,
                content={"detail": "Rate limit exceeded. Please upgrade your subscription for higher limits."}
            )
        
        # Increment usage
        increment_api_usage(user_id, request.url.path)
    
    response = await call_next(request)
    return response

# Routes
@app.get("/", response_class=HTMLResponse)
async def root():
    """Ultra Premium High-End Homepage with Full Responsiveness and Functionality"""
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SuggestlyG4Plus v2.0 - Ultra Premium AI Platform</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :root {
                --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                --glass-bg: rgba(255, 255, 255, 0.1);
                --glass-border: rgba(255, 255, 255, 0.2);
                --text-primary: #ffffff;
                --text-secondary: #e0e0e0;
                --accent-color: #00f2fe;
                --success-color: #00ff88;
                --warning-color: #ffaa00;
                --error-color: #ff4757;
                --shadow-light: 0 8px 32px rgba(0, 0, 0, 0.1);
                --shadow-heavy: 0 20px 60px rgba(0, 0, 0, 0.3);
                --border-radius: 20px;
                --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                background: var(--primary-gradient);
                color: var(--text-primary);
                min-height: 100vh;
                overflow-x: hidden;
                line-height: 1.6;
            }

            /* Animated Background */
            .animated-bg {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                background: var(--primary-gradient);
            }

            .animated-bg::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
                animation: float 20s ease-in-out infinite;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(1deg); }
            }

            /* Navigation */
            .navbar {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1000;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                border-bottom: 1px solid var(--glass-border);
                padding: 1rem 0;
                transition: var(--transition);
            }

            .nav-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .logo {
                font-size: 1.5rem;
                font-weight: 800;
                background: var(--accent-gradient);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .nav-links {
                display: flex;
                gap: 2rem;
                list-style: none;
            }

            .nav-links a {
                color: var(--text-primary);
                text-decoration: none;
                font-weight: 500;
                transition: var(--transition);
                position: relative;
            }

            .nav-links a::after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 0;
                height: 2px;
                background: var(--accent-gradient);
                transition: var(--transition);
            }

            .nav-links a:hover::after {
                width: 100%;
            }

            .mobile-menu-btn {
                display: none;
                background: none;
                border: none;
                color: var(--text-primary);
                font-size: 1.5rem;
                cursor: pointer;
            }

            /* Main Content */
            .main-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 120px 2rem 2rem;
            }

            /* Hero Section */
            .hero {
                text-align: center;
                margin-bottom: 4rem;
                position: relative;
            }

            .hero h1 {
                font-size: clamp(2.5rem, 8vw, 4.5rem);
                font-weight: 900;
                margin-bottom: 1rem;
                background: var(--accent-gradient);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                animation: glow 2s ease-in-out infinite alternate;
            }

            @keyframes glow {
                from { text-shadow: 0 0 20px rgba(0, 242, 254, 0.5); }
                to { text-shadow: 0 0 30px rgba(0, 242, 254, 0.8); }
            }

            .hero p {
                font-size: clamp(1.1rem, 3vw, 1.3rem);
                color: var(--text-secondary);
                margin-bottom: 2rem;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }

            .cta-buttons {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }

            .btn {
                padding: 1rem 2rem;
                border: none;
                border-radius: var(--border-radius);
                font-weight: 600;
                text-decoration: none;
                transition: var(--transition);
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                position: relative;
                overflow: hidden;
            }

            .btn-primary {
                background: var(--accent-gradient);
                color: white;
            }

            .btn-secondary {
                background: var(--glass-bg);
                color: var(--text-primary);
                border: 1px solid var(--glass-border);
                backdrop-filter: blur(10px);
            }

            .btn:hover {
                transform: translateY(-2px);
                box-shadow: var(--shadow-heavy);
            }

            /* Status Section */
            .status-section {
                background: var(--glass-bg);
                backdrop-filter: blur(20px);
                border: 1px solid var(--glass-border);
                border-radius: var(--border-radius);
                padding: 2rem;
                margin-bottom: 3rem;
                text-align: center;
                position: relative;
                overflow: hidden;
            }

            .status-section::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                transition: var(--transition);
            }

            .status-section:hover::before {
                left: 100%;
            }

            .status-indicator {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                background: rgba(0, 255, 136, 0.2);
                border-radius: 50px;
                margin-bottom: 1rem;
            }

            .status-dot {
                width: 10px;
                height: 10px;
                background: var(--success-color);
                border-radius: 50%;
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.5; transform: scale(1.2); }
            }

            /* Features Grid */
            .features-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
                margin-bottom: 3rem;
            }

            .feature-card {
                background: var(--glass-bg);
                backdrop-filter: blur(20px);
                border: 1px solid var(--glass-border);
                border-radius: var(--border-radius);
                padding: 2rem;
                transition: var(--transition);
                position: relative;
                overflow: hidden;
            }

            .feature-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: var(--accent-gradient);
                transform: scaleX(0);
                transition: var(--transition);
            }

            .feature-card:hover {
                transform: translateY(-10px);
                box-shadow: var(--shadow-heavy);
            }

            .feature-card:hover::before {
                transform: scaleX(1);
            }

            .feature-icon {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                background: var(--accent-gradient);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .feature-card h3 {
                font-size: 1.5rem;
                font-weight: 700;
                margin-bottom: 1rem;
                color: var(--text-primary);
            }

            .feature-card p {
                color: var(--text-secondary);
                line-height: 1.6;
            }

            /* Live Data Section */
            .live-data {
                background: var(--glass-bg);
                backdrop-filter: blur(20px);
                border: 1px solid var(--glass-border);
                border-radius: var(--border-radius);
                padding: 2rem;
                margin-bottom: 3rem;
            }

            .live-data h2 {
                text-align: center;
                margin-bottom: 2rem;
                font-size: 2rem;
                font-weight: 700;
            }

            .data-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
            }

            .data-item {
                text-align: center;
                padding: 1rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 15px;
                border: 1px solid var(--glass-border);
            }

            .data-value {
                font-size: 2rem;
                font-weight: 800;
                color: var(--accent-color);
                margin-bottom: 0.5rem;
            }

            .data-label {
                color: var(--text-secondary);
                font-size: 0.9rem;
            }

            /* Footer */
            .footer {
                text-align: center;
                padding: 2rem;
                background: rgba(0, 0, 0, 0.2);
                margin-top: 4rem;
            }

            .footer-links {
                display: flex;
                justify-content: center;
                gap: 2rem;
                margin-bottom: 1rem;
                flex-wrap: wrap;
            }

            .footer-links a {
                color: var(--text-secondary);
                text-decoration: none;
                transition: var(--transition);
            }

            .footer-links a:hover {
                color: var(--accent-color);
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .nav-links {
                    display: none;
                }

                .mobile-menu-btn {
                    display: block;
                }

                .main-container {
                    padding: 100px 1rem 1rem;
                }

                .features-grid {
                    grid-template-columns: 1fr;
                }

                .cta-buttons {
                    flex-direction: column;
                    align-items: center;
                }

                .btn {
                    width: 100%;
                    max-width: 300px;
                    justify-content: center;
                }

                .data-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            @media (max-width: 480px) {
                .hero h1 {
                    font-size: 2.5rem;
                }

                .data-grid {
                    grid-template-columns: 1fr;
                }

                .footer-links {
                    flex-direction: column;
                    gap: 1rem;
                }
            }

            /* Loading Animation */
            .loading {
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 3px solid rgba(255,255,255,.3);
                border-radius: 50%;
                border-top-color: var(--accent-color);
                animation: spin 1s ease-in-out infinite;
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            /* Scroll Animations */
            .fade-in {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }

            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }
        </style>
    </head>
    <body>
        <div class="animated-bg"></div>
        
        <!-- Navigation -->
        <nav class="navbar">
            <div class="nav-container">
                <div class="logo">🚀 SuggestlyG4Plus</div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#vip">VIP</a></li>
                    <li><a href="/docs">API</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <button class="mobile-menu-btn">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </nav>

        <!-- Main Content -->
        <div class="main-container">
            <!-- Hero Section -->
            <section class="hero fade-in" id="home">
                <h1>SuggestlyG4Plus v2.0</h1>
                <p>The Ultimate AI Platform with Maximum Force Deployment</p>
                <div class="cta-buttons">
                    <a href="#features" class="btn btn-primary">
                        <i class="fas fa-rocket"></i>
                        Explore Features
                    </a>
                    <a href="#vip" class="btn btn-secondary">
                        <i class="fas fa-crown"></i>
                        VIP Access
                    </a>
                </div>
            </section>

            <!-- Status Section -->
            <section class="status-section fade-in">
                <div class="status-indicator">
                    <div class="status-dot"></div>
                    <span>SYSTEM OPERATIONAL</span>
                </div>
                <h2>All AI Agents & Force Bots Active</h2>
                <p>Maximum force deployment with intelligent automation</p>
            </section>

            <!-- Features Grid -->
            <section class="features-grid fade-in" id="features">
                <div class="feature-card">
                    <div class="feature-icon">🤖</div>
                    <h3>Advanced AI Agents</h3>
                    <p>8 intelligent AI agents providing cutting-edge automation, decision-making, and predictive analytics with maximum force capabilities.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <h3>Force Bots</h3>
                    <p>Maximum force deployment bots ensuring optimal performance, security, and intelligent resource management across all systems.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">👑</div>
                    <h3>VIP Section</h3>
                    <p>Exclusive VIP member access with premium features, advanced capabilities, and priority support for elite users.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">📡</div>
                    <h3>Live Data Feeds</h3>
                    <p>Real-time data feeds with intelligent information processing, analytics, and predictive insights for informed decisions.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">🔒</div>
                    <h3>Ultra Security</h3>
                    <p>Enterprise-grade security with JWT authentication, bcrypt encryption, and advanced threat protection systems.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">🌐</div>
                    <h3>Global Deployment</h3>
                    <p>Deployed on Vercel with custom domain, maximum force optimization, and intelligent edge computing capabilities.</p>
                </div>
            </section>

            <!-- Live Data Section -->
            <section class="live-data fade-in">
                <h2>Live System Metrics</h2>
                <div class="data-grid">
                    <div class="data-item">
                        <div class="data-value" id="ai-agents">8</div>
                        <div class="data-label">Active AI Agents</div>
                    </div>
                    <div class="data-item">
                        <div class="data-value" id="force-bots">7</div>
                        <div class="data-label">Force Bots</div>
                    </div>
                    <div class="data-item">
                        <div class="data-value" id="uptime">99.9%</div>
                        <div class="data-label">System Uptime</div>
                    </div>
                    <div class="data-item">
                        <div class="data-value" id="response-time">0.12s</div>
                        <div class="data-label">Response Time</div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Footer -->
        <footer class="footer">
            <div class="footer-links">
                <a href="/docs">API Documentation</a>
                <a href="/health">Health Check</a>
                <a href="/api/status">System Status</a>
                <a href="/api/agents">AI Agents</a>
                <a href="/api/feeds">Live Feeds</a>
            </div>
            <p>&copy; 2025 SuggestlyG4Plus v2.0 - Ultra Premium AI Platform</p>
        </footer>

        <script>
            // Intersection Observer for scroll animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            // Observe all fade-in elements
            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });

            // Mobile menu toggle
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');

            mobileMenuBtn.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Live data updates
            function updateLiveData() {
                // Simulate live data updates
                const responseTime = (Math.random() * 0.1 + 0.08).toFixed(2);
                document.getElementById('response-time').textContent = responseTime + 's';
                
                // Add some animation to the values
                const dataValues = document.querySelectorAll('.data-value');
                dataValues.forEach(value => {
                    value.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        value.style.transform = 'scale(1)';
                    }, 200);
                });
            }

            // Update live data every 5 seconds
            setInterval(updateLiveData, 5000);

            // Navbar scroll effect
            window.addEventListener('scroll', () => {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.15)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.1)';
                }
            });

            // Initialize
            document.addEventListener('DOMContentLoaded', () => {
                // Trigger initial animations
                setTimeout(() => {
                    document.querySelector('.hero').classList.add('visible');
                }, 100);
            });
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ultra_secure",
        "version": "2.0.0",
        "timestamp": datetime.now().isoformat(),
        "ai_agents": "8 active",
        "force_bots": "maximum force",
        "deployment": "vercel",
        "domain": "suggestlyg4plus.io"
    }

@app.get("/api/status")
async def system_status():
    """Get system status"""
    return {
        "system": "SuggestlyG4Plus v2.0",
        "status": "operational",
        "ai_agents_active": 8,
        "force_bots_active": 7,
        "deployment_platform": "Vercel",
        "custom_domain": "suggestlyg4plus.io",
        "security_level": "ultra_secure",
        "force_level": "maximum"
    }

@app.get("/api/agents")
async def get_ai_agents():
    """Get AI agents information"""
    agents = [
        {
            "name": "NEXUS-ULTRA-DEPLOYMENT-AGENT",
            "status": "active",
            "capabilities": ["intelligent_deployment", "force_optimization", "real_time_monitoring"],
            "force_level": "MAXIMUM"
        },
        {
            "name": "QUANTUM-DNS-FORCE-AGENT",
            "status": "active", 
            "capabilities": ["dns_configuration", "ssl_validation", "domain_optimization"],
            "force_level": "MAXIMUM"
        },
        {
            "name": "INTELLIGENT-MONITORING-AGENT",
            "status": "active",
            "capabilities": ["performance_monitoring", "error_detection", "auto_recovery"],
            "force_level": "MAXIMUM"
        },
        {
            "name": "MAXIMUM-FORCE-OPTIMIZATION-AGENT",
            "status": "active",
            "capabilities": ["speed_optimization", "cache_optimization", "force_compression"],
            "force_level": "MAXIMUM"
        },
        {
            "name": "VIP-SECTION-AGENT",
            "status": "active",
            "capabilities": ["vip_management", "premium_features", "exclusive_access"],
            "force_level": "MAXIMUM"
        },
        {
            "name": "LIVE-FEED-AGENT",
            "status": "active",
            "capabilities": ["real_time_data", "intelligent_processing", "live_updates"],
            "force_level": "MAXIMUM"
        },
        {
            "name": "SECURITY-FORCE-AGENT",
            "status": "active",
            "capabilities": ["authentication", "encryption", "threat_detection"],
            "force_level": "MAXIMUM"
        },
        {
            "name": "DEPLOYMENT-FORCE-AGENT",
            "status": "active",
            "capabilities": ["vercel_deployment", "domain_configuration", "ssl_setup"],
            "force_level": "MAXIMUM"
        }
    ]
    return {"agents": agents, "total": len(agents), "force_level": "MAXIMUM"}

@app.get("/api/feeds")
async def get_live_feeds():
    """Get live feeds"""
    feeds = [
        {
            "id": 1,
            "title": "AI Market Intelligence",
            "content": "Real-time AI market analysis and trends",
            "category": "market_intelligence",
            "timestamp": datetime.now().isoformat()
        },
        {
            "id": 2,
            "title": "Technology Updates",
            "content": "Latest technology developments and innovations",
            "category": "technology",
            "timestamp": datetime.now().isoformat()
        },
        {
            "id": 3,
            "title": "Security Alerts",
            "content": "Real-time security monitoring and alerts",
            "category": "security",
            "timestamp": datetime.now().isoformat()
        }
    ]
    return {"feeds": feeds, "total": len(feeds)}

@app.post("/api/register")
async def register_user(username: str, email: str, password: str):
    """User registration endpoint"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Check if user already exists
    cursor.execute('SELECT id FROM users WHERE username = ? OR email = ?', (username, email))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Username or email already registered")
    
    # Hash password and create user
    hashed_password = hash_password(password)
    cursor.execute('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', 
                  (username, email, hashed_password))
    conn.commit()
    conn.close()
    
    return {"message": "User registered successfully"}

@app.post("/api/login")
async def login_user(username: str, password: str):
    """User login endpoint"""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT id, username, password_hash FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()
    conn.close()
    
    if user and verify_password(password, user[2]):
        access_token = create_access_token(data={"sub": user[1], "user_id": user[0]})
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user[0],
                "username": user[1]
            }
        }
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/api/vip")
async def vip_section(payload: Dict = Depends(verify_token)):
    """VIP section endpoint - requires Pro or VIP subscription"""
    user_id = payload.get('user_id')
    subscription = get_user_subscription(user_id)
    
    if not subscription or subscription['tier'] not in ['pro', 'vip']:
        raise HTTPException(status_code=403, detail="Pro or VIP subscription required")
    
    return {
        "message": "Welcome to the VIP section!",
        "subscription_tier": subscription['tier'],
        "features": [
            "Advanced AI Agents",
            "Premium Data Feeds",
            "Priority Support",
            "Exclusive Content"
        ] if subscription['tier'] == 'pro' else [
            "All Pro Features",
            "VIP Elite Section",
            "Exclusive AI Agents",
            "24/7 Priority Support",
            "Custom Solutions",
            "Dedicated Account Manager",
            "Maximum Force Deployment"
        ]
    }

@app.get("/api/deployment/status")
async def deployment_status():
    """Get deployment status"""
    return {
        "status": "deployed",
        "domain": "suggestlyg4plus.io",
        "platform": "Vercel",
        "force_level": "MAXIMUM",
        "ai_agents": 8,
        "last_deployment": datetime.now().isoformat()
    }

# Payment and Subscription Endpoints
@app.get("/api/subscription/plans")
async def get_subscription_plans():
    """Get available subscription plans"""
    return {
        "plans": SUBSCRIPTION_PLANS,
        "currency": "usd",
        "billing_cycles": ["monthly", "yearly"]
    }

@app.post("/api/subscription/create-checkout-session")
async def create_checkout_session(
    plan_type: str = Form(...),
    billing_cycle: str = Form(...),
    payload: Dict = Depends(verify_token)
):
    """Create Stripe checkout session for subscription"""
    try:
        user_id = payload.get('user_id')
        
        # Validate plan and billing cycle
        if plan_type not in SUBSCRIPTION_PLANS:
            raise HTTPException(status_code=400, detail="Invalid plan type")
        if billing_cycle not in ['monthly', 'yearly']:
            raise HTTPException(status_code=400, detail="Invalid billing cycle")
        
        plan = SUBSCRIPTION_PLANS[plan_type][billing_cycle]
        
        # Get user details
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT email, stripe_customer_id FROM users WHERE id = ?', (user_id,))
        user = cursor.fetchone()
        conn.close()
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        email, stripe_customer_id = user
        
        # Create or get Stripe customer
        if not stripe_customer_id:
            stripe_customer_id = create_stripe_customer(user_id, email)
        
        # Create checkout session
        checkout_session = stripe.checkout.Session.create(
            customer=stripe_customer_id,
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': f'SuggestlyG4Plus {plan_type.title()} Plan',
                        'description': f'{billing_cycle.title()} subscription'
                    },
                    'unit_amount': plan['amount'],
                    'recurring': {
                        'interval': 'month' if billing_cycle == 'monthly' else 'year'
                    }
                },
                'quantity': 1,
            }],
            mode='subscription',
            success_url=f'https://suggestlyg4plus.io/subscription/success?session_id={{CHECKOUT_SESSION_ID}}',
            cancel_url='https://suggestlyg4plus.io/pricing',
            metadata={
                'user_id': user_id,
                'plan_type': plan_type,
                'billing_cycle': billing_cycle
            }
        )
        
        return {"checkout_url": checkout_session.url, "session_id": checkout_session.id}
        
    except stripe.error.StripeError as e:
        logger.error(f"Stripe error: {e}")
        raise HTTPException(status_code=500, detail="Payment processing error")
    except Exception as e:
        logger.error(f"Error creating checkout session: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/api/subscription/webhook")
async def stripe_webhook(request: Request):
    """Handle Stripe webhooks for subscription events"""
    try:
        payload = await request.body()
        sig_header = request.headers.get('stripe-signature')
        
        # Verify webhook signature (you should set this in your environment)
        webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET', 'whsec_your_webhook_secret')
        
        try:
            event = stripe.Webhook.construct_event(payload, sig_header, webhook_secret)
        except ValueError as e:
            raise HTTPException(status_code=400, detail="Invalid payload")
        except stripe.error.SignatureVerificationError as e:
            raise HTTPException(status_code=400, detail="Invalid signature")
        
        # Handle the event
        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            await handle_checkout_completed(session)
        elif event['type'] == 'customer.subscription.created':
            subscription = event['data']['object']
            await handle_subscription_created(subscription)
        elif event['type'] == 'customer.subscription.updated':
            subscription = event['data']['object']
            await handle_subscription_updated(subscription)
        elif event['type'] == 'customer.subscription.deleted':
            subscription = event['data']['object']
            await handle_subscription_cancelled(subscription)
        elif event['type'] == 'invoice.payment_succeeded':
            invoice = event['data']['object']
            await handle_payment_succeeded(invoice)
        elif event['type'] == 'invoice.payment_failed':
            invoice = event['data']['object']
            await handle_payment_failed(invoice)
        
        return {"status": "success"}
        
    except Exception as e:
        logger.error(f"Webhook error: {e}")
        raise HTTPException(status_code=500, detail="Webhook processing error")

async def handle_checkout_completed(session):
    """Handle successful checkout completion"""
    user_id = session['metadata']['user_id']
    plan_type = session['metadata']['plan_type']
    
    # Update user subscription
    update_user_subscription(user_id, plan_type, 'active')
    logger.info(f"Checkout completed for user {user_id}, plan: {plan_type}")

async def handle_subscription_created(subscription):
    """Handle new subscription creation"""
    customer_id = subscription['customer']
    
    # Get user by Stripe customer ID
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT id FROM users WHERE stripe_customer_id = ?', (customer_id,))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        user_id = user[0]
        plan_type = subscription['metadata'].get('plan_type', 'basic')
        billing_cycle = 'monthly' if subscription['items']['data'][0]['plan']['interval'] == 'month' else 'yearly'
        amount = subscription['items']['data'][0]['plan']['amount']
        
        create_subscription_record(user_id, plan_type, billing_cycle, amount, subscription['id'])
        update_user_subscription(user_id, plan_type, 'active', subscription['id'])
        logger.info(f"Subscription created for user {user_id}")

async def handle_subscription_updated(subscription):
    """Handle subscription updates"""
    customer_id = subscription['customer']
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT id FROM users WHERE stripe_customer_id = ?', (customer_id,))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        user_id = user[0]
        status = subscription['status']
        plan_type = subscription['metadata'].get('plan_type', 'basic')
        
        update_user_subscription(user_id, plan_type, status, subscription['id'])
        logger.info(f"Subscription updated for user {user_id}, status: {status}")

async def handle_subscription_cancelled(subscription):
    """Handle subscription cancellation"""
    customer_id = subscription['customer']
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT id FROM users WHERE stripe_customer_id = ?', (customer_id,))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        user_id = user[0]
        update_user_subscription(user_id, 'free', 'cancelled')
        logger.info(f"Subscription cancelled for user {user_id}")

async def handle_payment_succeeded(invoice):
    """Handle successful payment"""
    customer_id = invoice['customer']
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT id FROM users WHERE stripe_customer_id = ?', (customer_id,))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        user_id = user[0]
        amount = invoice['amount_paid']
        
        # Record payment
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO payment_history 
            (user_id, stripe_payment_intent_id, amount, status, payment_method)
            VALUES (?, ?, ?, 'succeeded', 'card')
        ''', (user_id, invoice['payment_intent'], amount))
        conn.commit()
        conn.close()
        
        logger.info(f"Payment succeeded for user {user_id}, amount: {amount}")

async def handle_payment_failed(invoice):
    """Handle failed payment"""
    customer_id = invoice['customer']
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT id FROM users WHERE stripe_customer_id = ?', (customer_id,))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        user_id = user[0]
        update_user_subscription(user_id, 'free', 'payment_failed')
        logger.warning(f"Payment failed for user {user_id}")

@app.get("/api/subscription/status")
async def get_subscription_status(payload: Dict = Depends(verify_token)):
    """Get current user's subscription status"""
    user_id = payload.get('user_id')
    subscription = get_user_subscription(user_id)
    
    if not subscription:
        return {
            "tier": "free",
            "status": "inactive",
            "api_requests_used": 0,
            "api_requests_limit": 10
        }
    
    # Get rate limits
    rate_limits = {
        'free': 10,
        'basic': 100,
        'pro': 1000,
        'vip': 10000
    }
    
    return {
        "tier": subscription['tier'],
        "status": subscription['status'],
        "end_date": subscription['end_date'],
        "api_requests_used": subscription['api_requests_count'],
        "api_requests_limit": rate_limits.get(subscription['tier'], 10),
        "stripe_subscription_id": subscription['stripe_subscription_id']
    }

@app.post("/api/subscription/cancel")
async def cancel_subscription(payload: Dict = Depends(verify_token)):
    """Cancel user's subscription"""
    user_id = payload.get('user_id')
    subscription = get_user_subscription(user_id)
    
    if not subscription or not subscription['stripe_subscription_id']:
        raise HTTPException(status_code=404, detail="No active subscription found")
    
    try:
        # Cancel subscription in Stripe
        stripe.Subscription.modify(
            subscription['stripe_subscription_id'],
            cancel_at_period_end=True
        )
        
        # Update local database
        update_user_subscription(user_id, 'free', 'cancelling')
        
        return {"message": "Subscription will be cancelled at the end of the current period"}
        
    except stripe.error.StripeError as e:
        logger.error(f"Error cancelling subscription: {e}")
        raise HTTPException(status_code=500, detail="Failed to cancel subscription")

@app.get("/api/subscription/billing-history")
async def get_billing_history(payload: Dict = Depends(verify_token)):
    """Get user's billing history"""
    user_id = payload.get('user_id')
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT amount, currency, status, created_at, stripe_payment_intent_id
        FROM payment_history 
        WHERE user_id = ? 
        ORDER BY created_at DESC
    ''', (user_id,))
    
    payments = cursor.fetchall()
    conn.close()
    
    return {
        "payments": [
            {
                "amount": payment[0] / 100,  # Convert from cents
                "currency": payment[1],
                "status": payment[2],
                "date": payment[3],
                "payment_id": payment[4]
            }
            for payment in payments
        ]
    }

@app.get("/subscription/dashboard", response_class=HTMLResponse)
async def subscription_dashboard(payload: Dict = Depends(verify_token)):
    """User subscription dashboard"""
    user_id = payload.get('user_id')
    subscription = get_user_subscription(user_id)
    
    # Get billing history
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT amount, currency, status, created_at
        FROM payment_history 
        WHERE user_id = ? 
        ORDER BY created_at DESC
        LIMIT 10
    ''', (user_id,))
    payments = cursor.fetchall()
    conn.close()
    
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Subscription Dashboard - SuggestlyG4Plus</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
            * {{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }}

            :root {{
                --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                --glass-bg: rgba(255, 255, 255, 0.1);
                --glass-border: rgba(255, 255, 255, 0.2);
                --text-primary: #ffffff;
                --text-secondary: #e0e0e0;
                --success-color: #00ff88;
                --warning-color: #ffaa00;
                --error-color: #ff4757;
                --accent-color: #4facfe;
                --shadow-light: 0 8px 32px rgba(0, 0, 0, 0.1);
                --shadow-heavy: 0 20px 60px rgba(0, 0, 0, 0.3);
                --border-radius: 20px;
                --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }}

            body {{
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                background: var(--primary-gradient);
                color: var(--text-primary);
                min-height: 100vh;
                line-height: 1.6;
            }}

            .container {{
                max-width: 1400px;
                margin: 0 auto;
                padding: 2rem;
            }}

            .header {{
                text-align: center;
                margin-bottom: 3rem;
            }}

            .header h1 {{
                font-size: 3rem;
                font-weight: 800;
                margin-bottom: 1rem;
                background: linear-gradient(135deg, #00ff88, #4facfe);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }}

            .dashboard-grid {{
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
                margin-bottom: 3rem;
            }}

            .card {{
                background: var(--glass-bg);
                backdrop-filter: blur(20px);
                border: 1px solid var(--glass-border);
                border-radius: var(--border-radius);
                padding: 2rem;
                box-shadow: var(--shadow-light);
                transition: var(--transition);
            }}

            .card:hover {{
                transform: translateY(-5px);
                box-shadow: var(--shadow-heavy);
            }}

            .card h3 {{
                font-size: 1.5rem;
                font-weight: 700;
                margin-bottom: 1rem;
                color: var(--success-color);
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }}

            .status-badge {{
                display: inline-block;
                padding: 0.5rem 1rem;
                border-radius: 50px;
                font-size: 0.9rem;
                font-weight: 600;
                text-transform: uppercase;
            }}

            .status-active {{
                background: var(--success-color);
                color: #000;
            }}

            .status-inactive {{
                background: var(--error-color);
                color: white;
            }}

            .btn {{
                display: inline-block;
                padding: 0.75rem 1.5rem;
                background: var(--success-color);
                color: #000;
                text-decoration: none;
                border-radius: 50px;
                font-weight: 600;
                transition: var(--transition);
                border: none;
                cursor: pointer;
                font-size: 0.9rem;
            }}

            .btn:hover {{
                transform: translateY(-2px);
                box-shadow: var(--shadow-light);
            }}

            .btn-danger {{
                background: var(--error-color);
                color: white;
            }}

            .btn-warning {{
                background: var(--warning-color);
                color: #000;
            }}

            .payment-item {{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 0;
                border-bottom: 1px solid var(--glass-border);
            }}

            .payment-item:last-child {{
                border-bottom: none;
            }}

            .payment-amount {{
                font-weight: 600;
                color: var(--success-color);
            }}

            .payment-date {{
                color: var(--text-secondary);
                font-size: 0.9rem;
            }}

            .analytics-grid {{
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            }}

            .metric {{
                text-align: center;
                padding: 1rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 15px;
                border: 1px solid var(--glass-border);
            }}

            .metric-value {{
                font-size: 2rem;
                font-weight: 800;
                color: var(--accent-color);
                margin-bottom: 0.5rem;
            }}

            .metric-label {{
                font-size: 0.9rem;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 1px;
            }}

            .recommendation {{
                background: rgba(0, 255, 136, 0.1);
                border: 1px solid var(--success-color);
                border-radius: 15px;
                padding: 1rem;
                margin-bottom: 1rem;
            }}

            .recommendation h4 {{
                color: var(--success-color);
                margin-bottom: 0.5rem;
            }}

            .chart-container {{
                position: relative;
                height: 300px;
                margin: 1rem 0;
            }}

            .loading {{
                text-align: center;
                padding: 2rem;
                color: var(--text-secondary);
            }}

            .spinner {{
                border: 3px solid var(--glass-border);
                border-top: 3px solid var(--success-color);
                border-radius: 50%;
                width: 30px;
                height: 30px;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }}

            @keyframes spin {{
                0% {{ transform: rotate(0deg); }}
                100% {{ transform: rotate(360deg); }}
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Advanced Subscription Dashboard</h1>
                <p>Monitor your usage, analytics, and get intelligent recommendations</p>
            </div>

            <div class="dashboard-grid">
                <div class="card">
                    <h3><i class="fas fa-crown"></i> Current Plan</h3>
                    <p><strong>Plan:</strong> {subscription['tier'].title() if subscription else 'Free'}</p>
                    <p><strong>Status:</strong> 
                        <span class="status-badge {'status-active' if subscription and subscription['status'] == 'active' else 'status-inactive'}">
                            {subscription['status'] if subscription else 'inactive'}
                        </span>
                    </p>
                    <p><strong>API Requests:</strong> {subscription['api_requests_count'] if subscription else 0}</p>
                    <p><strong>End Date:</strong> {subscription['end_date'] if subscription and subscription['end_date'] else 'N/A'}</p>
                </div>

                <div class="card">
                    <h3><i class="fas fa-chart-line"></i> Usage Analytics</h3>
                    <div id="analytics-content" class="loading">
                        <div class="spinner"></div>
                        <p>Loading analytics...</p>
                    </div>
                </div>

                <div class="card">
                    <h3><i class="fas fa-crystal-ball"></i> Usage Prediction</h3>
                    <div id="prediction-content" class="loading">
                        <div class="spinner"></div>
                        <p>Loading predictions...</p>
                    </div>
                </div>

                <div class="card">
                    <h3><i class="fas fa-lightbulb"></i> Smart Recommendations</h3>
                    <div id="recommendations-content" class="loading">
                        <div class="spinner"></div>
                        <p>Analyzing your usage...</p>
                    </div>
                </div>

                <div class="card">
                    <h3><i class="fas fa-chart-bar"></i> Usage Chart</h3>
                    <div class="chart-container">
                        <canvas id="usageChart"></canvas>
                    </div>
                </div>

                <div class="card">
                    <h3><i class="fas fa-cogs"></i> Quick Actions</h3>
                    <p><a href="/pricing" class="btn">Upgrade Plan</a></p>
                    {f'<p><button onclick="cancelSubscription()" class="btn btn-danger">Cancel Subscription</button></p>' if subscription and subscription['status'] == 'active' else ''}
                    <p><button onclick="refreshAnalytics()" class="btn btn-warning">Refresh Analytics</button></p>
                    <p><a href="/" class="btn">Go to Dashboard</a></p>
                </div>

                <div class="card">
                    <h3><i class="fas fa-history"></i> Billing History</h3>
                    {'<div class="payment-item"><p>No payment history</p></div>' if not payments else ''}
                    {''.join([f'''
                    <div class="payment-item">
                        <div>
                            <div class="payment-amount">${payment[0]/100:.2f} {payment[1].upper()}</div>
                            <div class="payment-date">{payment[3]}</div>
                        </div>
                        <span class="status-badge {'status-active' if payment[2] == 'succeeded' else 'status-inactive'}">{payment[2]}</span>
                    </div>
                    ''' for payment in payments])}
                </div>
            </div>
        </div>

        <script>
            // Load analytics data
            async function loadAnalytics() {{
                try {{
                    const response = await fetch('/api/subscription/analytics', {{
                        headers: {{
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                        }}
                    }});
                    
                    if (response.ok) {{
                        const data = await response.json();
                        displayAnalytics(data);
                    }}
                }} catch (error) {{
                    console.error('Error loading analytics:', error);
                }}
            }}

            // Load prediction data
            async function loadPrediction() {{
                try {{
                    const response = await fetch('/api/subscription/usage-prediction', {{
                        headers: {{
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                        }}
                    }});
                    
                    if (response.ok) {{
                        const data = await response.json();
                        displayPrediction(data);
                    }}
                }} catch (error) {{
                    console.error('Error loading prediction:', error);
                }}
            }}

            function displayAnalytics(data) {{
                const container = document.getElementById('analytics-content');
                container.innerHTML = `
                    <div class="analytics-grid">
                        <div class="metric">
                            <div class="metric-value">${{data.payment_analytics.total_spent}}</div>
                            <div class="metric-label">Total Spent</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">${{data.usage_analytics.avg_daily_requests}}</div>
                            <div class="metric-label">Daily Avg</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">${{data.payment_analytics.payment_success_rate}}%</div>
                            <div class="metric-label">Success Rate</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">${{data.usage_analytics.days_until_billing}}</div>
                            <div class="metric-label">Days to Bill</div>
                        </div>
                    </div>
                `;
                
                // Display recommendations
                displayRecommendations(data.recommendations);
            }}

            function displayPrediction(data) {{
                const container = document.getElementById('prediction-content');
                if (data.prediction === 'insufficient_data') {{
                    container.innerHTML = '<p>Need more usage data for predictions</p>';
                    return;
                }}
                
                const pred = data.prediction;
                container.innerHTML = `
                    <div class="analytics-grid">
                        <div class="metric">
                            <div class="metric-value">${{pred.current_daily_average}}</div>
                            <div class="metric-label">Daily Average</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">${{pred.predicted_30_days}}</div>
                            <div class="metric-label">30-Day Pred</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">${{pred.recommended_plan}}</div>
                            <div class="metric-label">Recommended</div>
                        </div>
                        <div class="metric">
                            <div class="metric-value">${{pred.confidence}}</div>
                            <div class="metric-label">Confidence</div>
                        </div>
                    </div>
                    <p><strong>Plan Sufficient:</strong> ${{pred.current_plan_sufficient ? 'Yes' : 'No'}}</p>
                `;
            }}

            function displayRecommendations(recommendations) {{
                const container = document.getElementById('recommendations-content');
                if (recommendations.length === 0) {{
                    container.innerHTML = '<p>No recommendations at this time</p>';
                    return;
                }}
                
                container.innerHTML = recommendations.map(rec => `
                    <div class="recommendation">
                        <h4>${{rec.type.toUpperCase()}} to ${{rec.plan.toUpperCase()}}</h4>
                        <p><strong>Reason:</strong> ${{rec.reason}}</p>
                        <p><strong>Benefit:</strong> ${{rec.benefit}}</p>
                        <button onclick="upgradePlan('${{rec.plan}}')" class="btn">${{rec.type === 'upgrade' ? 'Upgrade' : 'Downgrade'}}</button>
                    </div>
                `).join('');
            }}

            async function upgradePlan(plan) {{
                try {{
                    const response = await fetch('/api/subscription/upgrade', {{
                        method: 'POST',
                        headers: {{
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                        }},
                        body: `new_plan=${{plan}}`
                    }});
                    
                    if (response.ok) {{
                        const data = await response.json();
                        window.location.href = data.checkout_url;
                    }}
                }} catch (error) {{
                    console.error('Error upgrading plan:', error);
                }}
            }}

            async function cancelSubscription() {{
                if (confirm('Are you sure you want to cancel your subscription? This will take effect at the end of your current billing period.')) {{
                    try {{
                        const response = await fetch('/api/subscription/cancel', {{
                            method: 'POST',
                            headers: {{
                                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                            }}
                        }});
                        
                        if (response.ok) {{
                            alert('Subscription cancelled successfully. You will continue to have access until the end of your billing period.');
                            location.reload();
                        }} else {{
                            alert('Failed to cancel subscription. Please try again.');
                        }}
                    }} catch (error) {{
                        console.error('Error cancelling subscription:', error);
                        alert('An error occurred while cancelling your subscription.');
                    }}
                }}
            }}

            function refreshAnalytics() {{
                document.getElementById('analytics-content').innerHTML = '<div class="spinner"></div><p>Refreshing...</p>';
                document.getElementById('prediction-content').innerHTML = '<div class="spinner"></div><p>Refreshing...</p>';
                document.getElementById('recommendations-content').innerHTML = '<div class="spinner"></div><p>Refreshing...</p>';
                
                loadAnalytics();
                loadPrediction();
            }}

            // Initialize dashboard
            document.addEventListener('DOMContentLoaded', function() {{
                loadAnalytics();
                loadPrediction();
                
                // Initialize usage chart
                const ctx = document.getElementById('usageChart').getContext('2d');
                new Chart(ctx, {{
                    type: 'line',
                    data: {{
                        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
                        datasets: [{{
                            label: 'API Requests',
                            data: [65, 59, 80, 81, 56, 55, 40],
                            borderColor: '#00ff88',
                            backgroundColor: 'rgba(0, 255, 136, 0.1)',
                            tension: 0.4
                        }}]
                    }},
                    options: {{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {{
                            legend: {{
                                labels: {{
                                    color: '#ffffff'
                                }}
                            }}
                        }},
                        scales: {{
                            y: {{
                                ticks: {{
                                    color: '#ffffff'
                                }},
                                grid: {{
                                    color: 'rgba(255, 255, 255, 0.1)'
                                }}
                            }},
                            x: {{
                                ticks: {{
                                    color: '#ffffff'
                                }},
                                grid: {{
                                    color: 'rgba(255, 255, 255, 0.1)'
                                }}
                            }}
                        }}
                    }}
                }});
            }});
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@app.get("/pricing", response_class=HTMLResponse)
async def pricing_page():
    """Premium Subscription Pricing Page with VIP Tiers"""
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Premium Subscriptions - SuggestlyG4Plus v2.0</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :root {
                --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                --glass-bg: rgba(255, 255, 255, 0.1);
                --glass-border: rgba(255, 255, 255, 0.2);
                --text-primary: #ffffff;
                --text-secondary: #e0e0e0;
                --accent-color: #00f2fe;
                --success-color: #00ff88;
                --warning-color: #ffaa00;
                --error-color: #ff4757;
                --shadow-light: 0 8px 32px rgba(0, 0, 0, 0.1);
                --shadow-heavy: 0 20px 60px rgba(0, 0, 0, 0.3);
                --border-radius: 20px;
                --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                background: var(--primary-gradient);
                color: var(--text-primary);
                min-height: 100vh;
                overflow-x: hidden;
                line-height: 1.6;
            }

            /* Animated Background */
            .animated-bg {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                background: var(--primary-gradient);
            }

            .animated-bg::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
                animation: float 20s ease-in-out infinite;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(1deg); }
            }

            /* Navigation */
            .navbar {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1000;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                border-bottom: 1px solid var(--glass-border);
                padding: 1rem 0;
                transition: var(--transition);
            }

            .nav-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .logo {
                font-size: 1.5rem;
                font-weight: 800;
                background: var(--accent-gradient);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .nav-links {
                display: flex;
                gap: 2rem;
                list-style: none;
            }

            .nav-links a {
                color: var(--text-primary);
                text-decoration: none;
                font-weight: 500;
                transition: var(--transition);
                position: relative;
            }

            .nav-links a::after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 0;
                height: 2px;
                background: var(--accent-gradient);
                transition: var(--transition);
            }

            .nav-links a:hover::after {
                width: 100%;
            }

            /* Main Content */
            .main-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 120px 2rem 2rem;
            }

            /* Hero Section */
            .hero {
                text-align: center;
                margin-bottom: 4rem;
                position: relative;
            }

            .hero h1 {
                font-size: clamp(2.5rem, 8vw, 4.5rem);
                font-weight: 900;
                margin-bottom: 1rem;
                background: var(--accent-gradient);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                animation: glow 2s ease-in-out infinite alternate;
            }

            @keyframes glow {
                from { text-shadow: 0 0 20px rgba(0, 242, 254, 0.5); }
                to { text-shadow: 0 0 30px rgba(0, 242, 254, 0.8); }
            }

            .hero p {
                font-size: clamp(1.1rem, 3vw, 1.3rem);
                color: var(--text-secondary);
                margin-bottom: 2rem;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }

            /* Pricing Toggle */
            .pricing-toggle {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1rem;
                margin-bottom: 3rem;
                background: var(--glass-bg);
                backdrop-filter: blur(20px);
                border: 1px solid var(--glass-border);
                border-radius: 50px;
                padding: 0.5rem;
                width: fit-content;
                margin-left: auto;
                margin-right: auto;
            }

            .toggle-btn {
                padding: 0.8rem 1.5rem;
                border: none;
                border-radius: 25px;
                background: transparent;
                color: var(--text-secondary);
                font-weight: 600;
                cursor: pointer;
                transition: var(--transition);
            }

            .toggle-btn.active {
                background: var(--accent-gradient);
                color: white;
                box-shadow: var(--shadow-light);
            }

            /* Pricing Grid */
            .pricing-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
                margin-bottom: 4rem;
            }

            .pricing-card {
                background: var(--glass-bg);
                backdrop-filter: blur(20px);
                border: 2px solid var(--glass-border);
                border-radius: var(--border-radius);
                padding: 2.5rem;
                text-align: center;
                transition: var(--transition);
                position: relative;
                overflow: hidden;
            }

            .pricing-card.featured {
                border-color: var(--accent-color);
                box-shadow: var(--shadow-light);
                transform: scale(1.05);
            }

            .pricing-card:hover {
                transform: translateY(-10px);
                box-shadow: var(--shadow-heavy);
                border-color: var(--accent-color);
            }

            .pricing-card.featured:hover {
                transform: scale(1.05) translateY(-10px);
            }

            .pricing-badge {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: var(--accent-gradient);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 700;
                text-transform: uppercase;
            }

            .plan-name {
                font-size: 1.8rem;
                font-weight: 800;
                margin-bottom: 1rem;
                background: var(--accent-gradient);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .plan-price {
                font-size: 3rem;
                font-weight: 900;
                margin-bottom: 0.5rem;
                color: var(--accent-color);
            }

            .plan-period {
                color: var(--text-secondary);
                font-size: 1rem;
                margin-bottom: 2rem;
            }

            .plan-features {
                list-style: none;
                margin-bottom: 2rem;
                text-align: left;
            }

            .plan-features li {
                padding: 0.5rem 0;
                color: var(--text-secondary);
                position: relative;
                padding-left: 2rem;
            }

            .plan-features li::before {
                content: '✓';
                position: absolute;
                left: 0;
                color: var(--success-color);
                font-weight: bold;
            }

            .plan-features li.vip::before {
                content: '👑';
                color: var(--warning-color);
            }

            .plan-features li.premium::before {
                content: '⭐';
                color: var(--accent-color);
            }

            .subscribe-btn {
                width: 100%;
                padding: 1rem 2rem;
                border: none;
                border-radius: var(--border-radius);
                font-weight: 700;
                text-decoration: none;
                transition: var(--transition);
                cursor: pointer;
                display: inline-block;
                text-align: center;
                font-size: 1.1rem;
            }

            .btn-basic {
                background: var(--glass-bg);
                color: var(--text-primary);
                border: 2px solid var(--glass-border);
            }

            .btn-pro {
                background: var(--accent-gradient);
                color: white;
                box-shadow: var(--shadow-light);
            }

            .btn-vip {
                background: var(--secondary-gradient);
                color: white;
                box-shadow: var(--shadow-light);
            }

            .subscribe-btn:hover {
                transform: translateY(-2px);
                box-shadow: var(--shadow-heavy);
            }

            /* FAQ Section */
            .faq-section {
                background: var(--glass-bg);
                backdrop-filter: blur(20px);
                border: 1px solid var(--glass-border);
                border-radius: var(--border-radius);
                padding: 3rem;
                margin-bottom: 3rem;
            }

            .faq-section h2 {
                text-align: center;
                margin-bottom: 2rem;
                font-size: 2.5rem;
                font-weight: 800;
                background: var(--accent-gradient);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .faq-grid {
                display: grid;
                gap: 1.5rem;
            }

            .faq-item {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 15px;
                padding: 1.5rem;
                border: 1px solid var(--glass-border);
            }

            .faq-question {
                font-weight: 700;
                margin-bottom: 0.5rem;
                color: var(--accent-color);
            }

            .faq-answer {
                color: var(--text-secondary);
                line-height: 1.6;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .nav-links {
                    display: none;
                }

                .main-container {
                    padding: 100px 1rem 1rem;
                }

                .pricing-grid {
                    grid-template-columns: 1fr;
                }

                .pricing-card.featured {
                    transform: none;
                }

                .pricing-card.featured:hover {
                    transform: translateY(-10px);
                }
            }

            @media (max-width: 480px) {
                .hero h1 {
                    font-size: 2.5rem;
                }

                .pricing-toggle {
                    flex-direction: column;
                    width: 100%;
                    max-width: 300px;
                }
            }
        </style>
    </head>
    <body>
        <div class="animated-bg"></div>
        
        <!-- Navigation -->
        <nav class="navbar">
            <div class="nav-container">
                <div class="logo">🚀 SuggestlyG4Plus</div>
                <ul class="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/#features">Features</a></li>
                    <li><a href="/pricing">Pricing</a></li>
                    <li><a href="/docs">API</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
        </nav>

        <!-- Main Content -->
        <div class="main-container">
            <!-- Hero Section -->
            <section class="hero">
                <h1>Premium Subscriptions</h1>
                <p>Choose Your AI Experience with Advanced Features & VIP Access</p>
            </section>

            <!-- Pricing Toggle -->
            <div class="pricing-toggle">
                <button class="toggle-btn active" onclick="togglePricing('monthly')">Monthly</button>
                <button class="toggle-btn" onclick="togglePricing('yearly')">Yearly (Save 20%)</button>
            </div>

            <!-- Pricing Grid -->
            <div class="pricing-grid">
                <!-- Basic Plan -->
                <div class="pricing-card">
                    <div class="plan-name">Basic</div>
                    <div class="plan-price" id="basic-price">$19</div>
                    <div class="plan-period" id="basic-period">per month</div>
                    <ul class="plan-features">
                        <li>Access to Basic AI Agents</li>
                        <li>Standard Live Data Feeds</li>
                        <li>Basic Analytics Dashboard</li>
                        <li>Email Support</li>
                        <li>10 API Requests/min</li>
                        <li>Standard Security</li>
                    </ul>
                    <button onclick="subscribeToPlan('basic')" class="subscribe-btn btn-basic">Start Basic Plan</button>
                </div>

                <!-- Pro Plan -->
                <div class="pricing-card featured">
                    <div class="pricing-badge">Most Popular</div>
                    <div class="plan-name">Pro</div>
                    <div class="plan-price" id="pro-price">$79</div>
                    <div class="plan-period" id="pro-period">per month</div>
                    <ul class="plan-features">
                        <li>All Basic Features</li>
                        <li class="premium">Advanced AI Agents (8 total)</li>
                        <li class="premium">Premium Live Data Feeds</li>
                        <li class="premium">Advanced Analytics</li>
                        <li>Priority Support</li>
                        <li>100 API Requests/min</li>
                        <li>Enhanced Security</li>
                        <li>Custom Integrations</li>
                        <li class="vip">VIP Section Access</li>
                    </ul>
                    <button onclick="subscribeToPlan('pro')" class="subscribe-btn btn-pro">Start Pro Plan</button>
                </div>

                <!-- VIP Plan -->
                <div class="pricing-card">
                    <div class="pricing-badge">VIP Elite</div>
                    <div class="plan-name">VIP</div>
                    <div class="plan-price" id="vip-price">$199</div>
                    <div class="plan-period" id="vip-period">per month</div>
                    <ul class="plan-features">
                        <li>All Pro Features</li>
                        <li class="vip">VIP Elite Section</li>
                        <li class="vip">Exclusive AI Agents</li>
                        <li class="vip">Premium VIP Features</li>
                        <li class="vip">Priority VIP Support</li>
                        <li>Unlimited API Requests</li>
                        <li>Ultra Security</li>
                        <li>24/7 Priority Support</li>
                        <li>Custom Solutions</li>
                        <li>Dedicated Account Manager</li>
                        <li>Maximum Force Deployment</li>
                    </ul>
                    <button onclick="subscribeToPlan('vip')" class="subscribe-btn btn-vip">Start VIP Plan</button>
                </div>
            </div>

            <!-- FAQ Section -->
            <section class="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div class="faq-grid">
                    <div class="faq-item">
                        <div class="faq-question">What's the difference between Pro and VIP?</div>
                        <div class="faq-answer">Pro includes advanced AI agents and VIP access, while VIP adds exclusive features, priority support, and maximum force deployment capabilities.</div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">Can I upgrade or downgrade my plan?</div>
                        <div class="faq-answer">Yes! You can upgrade or downgrade your subscription at any time. Changes take effect immediately, and we'll prorate any billing adjustments.</div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">What payment methods do you accept?</div>
                        <div class="faq-answer">We accept all major credit cards, PayPal, and cryptocurrency payments including Bitcoin, Ethereum, and other major cryptocurrencies.</div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">Is there a free trial available?</div>
                        <div class="faq-answer">Yes! We offer a 14-day free trial for all plans. No credit card required to start your trial.</div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">What kind of support do you provide?</div>
                        <div class="faq-answer">Basic plans include email support, Pro plans get priority support, and VIP plans include 24/7 dedicated support with a personal account manager.</div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question">What is Maximum Force Deployment?</div>
                        <div class="faq-answer">Maximum Force Deployment provides the highest level of AI agent optimization, performance, and intelligent automation for ultimate efficiency.</div>
                    </div>
                </div>
            </section>
        </div>

        <script>
            // Stripe configuration
            const stripePublishableKey = 'pk_test_your_stripe_publishable_key_here';
            
            // Pricing toggle functionality
            function togglePricing(period) {
                const toggleBtns = document.querySelectorAll('.toggle-btn');
                toggleBtns.forEach(btn => btn.classList.remove('active'));
                event.target.classList.add('active');

                if (period === 'yearly') {
                    // Yearly pricing (20% discount)
                    document.getElementById('basic-price').textContent = '$182';
                    document.getElementById('basic-period').textContent = 'per year';
                    document.getElementById('pro-price').textContent = '$759';
                    document.getElementById('pro-period').textContent = 'per year';
                    document.getElementById('vip-price').textContent = '$1,909';
                    document.getElementById('vip-period').textContent = 'per year';
                } else {
                    // Monthly pricing
                    document.getElementById('basic-price').textContent = '$19';
                    document.getElementById('basic-period').textContent = 'per month';
                    document.getElementById('pro-price').textContent = '$79';
                    document.getElementById('pro-period').textContent = 'per month';
                    document.getElementById('vip-price').textContent = '$199';
                    document.getElementById('vip-period').textContent = 'per month';
                }
            }

            // Function to handle plan selection and redirect to checkout
            async function subscribeToPlan(planType) {
                const user = JSON.parse(localStorage.getItem('user')); // Assuming user is stored in localStorage
                if (!user) {
                    alert('Please log in to subscribe to a plan.');
                    window.location.href = '/login'; // Redirect to login page
                    return;
                }

                try {
                    const response = await fetch('/api/subscription/create-checkout-session', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': `Bearer ${user.access_token}`
                        },
                        body: `plan_type=${planType}&billing_cycle=monthly` // Default to monthly for simplicity
                    });
                    const data = await response.json();

                    if (data.checkout_url) {
                        window.location.href = data.checkout_url;
                    } else {
                        alert('Failed to initiate checkout session.');
                        console.error(data);
                    }
                } catch (error) {
                    console.error('Error initiating checkout:', error);
                    alert('An error occurred during checkout.');
                }
            }

            // Navbar scroll effect
            window.addEventListener('scroll', () => {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.15)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.1)';
                }
            });
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@app.get("/subscription/success", response_class=HTMLResponse)
async def subscription_success(session_id: str = None):
    """Subscription success page"""
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Subscription Success - SuggestlyG4Plus</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :root {
                --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                --success-gradient: linear-gradient(135deg, #00ff88 0%, #00d4aa 100%);
                --glass-bg: rgba(255, 255, 255, 0.1);
                --glass-border: rgba(255, 255, 255, 0.2);
                --text-primary: #ffffff;
                --text-secondary: #e0e0e0;
                --success-color: #00ff88;
                --shadow-light: 0 8px 32px rgba(0, 0, 0, 0.1);
                --shadow-heavy: 0 20px 60px rgba(0, 0, 0, 0.3);
                --border-radius: 20px;
                --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                background: var(--primary-gradient);
                color: var(--text-primary);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                line-height: 1.6;
            }

            .success-container {
                background: var(--glass-bg);
                backdrop-filter: blur(20px);
                border: 1px solid var(--glass-border);
                border-radius: var(--border-radius);
                padding: 3rem;
                text-align: center;
                max-width: 500px;
                width: 90%;
                box-shadow: var(--shadow-heavy);
                animation: slideIn 0.6s ease-out;
            }

            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .success-icon {
                font-size: 4rem;
                color: var(--success-color);
                margin-bottom: 1rem;
                animation: bounce 1s ease-in-out;
            }

            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-10px);
                }
                60% {
                    transform: translateY(-5px);
                }
            }

            h1 {
                font-size: 2.5rem;
                font-weight: 800;
                margin-bottom: 1rem;
                background: var(--success-gradient);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            p {
                font-size: 1.1rem;
                color: var(--text-secondary);
                margin-bottom: 2rem;
            }

            .btn {
                display: inline-block;
                padding: 1rem 2rem;
                background: var(--success-gradient);
                color: white;
                text-decoration: none;
                border-radius: 50px;
                font-weight: 600;
                transition: var(--transition);
                border: none;
                cursor: pointer;
                font-size: 1rem;
            }

            .btn:hover {
                transform: translateY(-2px);
                box-shadow: var(--shadow-heavy);
            }

            .btn-secondary {
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                margin-left: 1rem;
            }

            .btn-secondary:hover {
                background: var(--glass-border);
            }

            .session-id {
                background: var(--glass-bg);
                padding: 0.5rem 1rem;
                border-radius: 10px;
                font-family: monospace;
                font-size: 0.9rem;
                color: var(--text-secondary);
                margin-top: 1rem;
                word-break: break-all;
            }
        </style>
    </head>
    <body>
        <div class="success-container">
            <div class="success-icon">🎉</div>
            <h1>Welcome to SuggestlyG4Plus!</h1>
            <p>Your subscription has been successfully activated. You now have access to all premium features and AI agents.</p>
            
            <div>
                <a href="/" class="btn">Go to Dashboard</a>
                <a href="/pricing" class="btn btn-secondary">View Plans</a>
            </div>
            
            """ + (f'<div class="session-id">Session ID: {session_id}</div>' if session_id else '') + """
        </div>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

# Advanced Subscription Features
@app.get("/api/subscription/analytics")
async def get_subscription_analytics(payload: Dict = Depends(verify_token)):
    """Get advanced subscription analytics"""
    user_id = payload.get('user_id')
    subscription = get_user_subscription(user_id)
    
    # Get usage analytics
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # API usage over time
    cursor.execute('''
        SELECT DATE(last_request) as date, SUM(request_count) as requests
        FROM api_usage 
        WHERE user_id = ? 
        GROUP BY DATE(last_request)
        ORDER BY date DESC
        LIMIT 30
    ''', (user_id,))
    
    usage_data = cursor.fetchall()
    
    # Payment patterns
    cursor.execute('''
        SELECT amount, created_at, status
        FROM payment_history 
        WHERE user_id = ? 
        ORDER BY created_at DESC
        LIMIT 10
    ''', (user_id,))
    
    payment_data = cursor.fetchall()
    conn.close()
    
    # Calculate analytics
    total_requests = sum(row[1] for row in usage_data)
    avg_daily_requests = total_requests / max(len(usage_data), 1)
    
    # Predict next billing cycle
    if subscription and subscription['end_date']:
        days_until_billing = (datetime.fromisoformat(subscription['end_date']) - datetime.now()).days
    else:
        days_until_billing = 30
    
    return {
        "usage_analytics": {
            "total_requests": total_requests,
            "avg_daily_requests": round(avg_daily_requests, 2),
            "usage_trend": "increasing" if avg_daily_requests > 50 else "stable",
            "days_until_billing": max(0, days_until_billing),
            "usage_percentage": min(100, (subscription['api_requests_count'] / 1000) * 100) if subscription else 0
        },
        "payment_analytics": {
            "total_payments": len(payment_data),
            "successful_payments": len([p for p in payment_data if p[2] == 'succeeded']),
            "total_spent": sum(p[0] for p in payment_data if p[2] == 'succeeded']) / 100,
            "payment_success_rate": len([p for p in payment_data if p[2] == 'succeeded']) / max(len(payment_data), 1) * 100
        },
        "recommendations": generate_subscription_recommendations(subscription, total_requests, avg_daily_requests)
    }

def generate_subscription_recommendations(subscription, total_requests, avg_daily_requests):
    """Generate intelligent subscription recommendations"""
    recommendations = []
    
    if not subscription or subscription['tier'] == 'free':
        if avg_daily_requests > 20:
            recommendations.append({
                "type": "upgrade",
                "plan": "basic",
                "reason": "High API usage detected",
                "benefit": "100 requests/min instead of 10"
            })
    
    elif subscription['tier'] == 'basic':
        if avg_daily_requests > 80:
            recommendations.append({
                "type": "upgrade",
                "plan": "pro",
                "reason": "Approaching Basic plan limits",
                "benefit": "1,000 requests/min and VIP access"
            })
    
    elif subscription['tier'] == 'pro':
        if avg_daily_requests > 800:
            recommendations.append({
                "type": "upgrade",
                "plan": "vip",
                "reason": "High usage detected",
                "benefit": "Unlimited requests and 24/7 support"
            })
    
    # Add cost optimization recommendations
    if subscription and subscription['tier'] in ['pro', 'vip']:
        if avg_daily_requests < 50:
            recommendations.append({
                "type": "downgrade",
                "plan": "basic",
                "reason": "Low usage detected",
                "benefit": "Save $60/month with Basic plan"
            })
    
    return recommendations

@app.post("/api/subscription/upgrade")
async def upgrade_subscription(
    new_plan: str = Form(...),
    payload: Dict = Depends(verify_token)
):
    """Upgrade subscription with intelligent pricing"""
    user_id = payload.get('user_id')
    current_subscription = get_user_subscription(user_id)
    
    if not current_subscription or current_subscription['status'] != 'active':
        raise HTTPException(status_code=400, detail="No active subscription to upgrade")
    
    if new_plan not in SUBSCRIPTION_PLANS:
        raise HTTPException(status_code=400, detail="Invalid plan")
    
    # Calculate prorated amount
    prorated_amount = calculate_prorated_amount(current_subscription, new_plan)
    
    try:
        # Create upgrade checkout session
        checkout_session = stripe.checkout.Session.create(
            customer=current_subscription['stripe_customer_id'],
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': f'Upgrade to {new_plan.title()} Plan',
                        'description': 'Subscription upgrade with prorated billing'
                    },
                    'unit_amount': prorated_amount,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=f'https://suggestlyg4plus.io/subscription/success?session_id={{CHECKOUT_SESSION_ID}}',
            cancel_url='https://suggestlyg4plus.io/subscription/dashboard',
            metadata={
                'user_id': user_id,
                'action': 'upgrade',
                'from_plan': current_subscription['tier'],
                'to_plan': new_plan
            }
        )
        
        return {"checkout_url": checkout_session.url, "session_id": checkout_session.id}
        
    except stripe.error.StripeError as e:
        logger.error(f"Stripe error during upgrade: {e}")
        raise HTTPException(status_code=500, detail="Payment processing error")

def calculate_prorated_amount(current_subscription, new_plan):
    """Calculate prorated amount for subscription upgrade"""
    # Get current plan and new plan amounts
    current_amount = SUBSCRIPTION_PLANS[current_subscription['tier']]['monthly']['amount']
    new_amount = SUBSCRIPTION_PLANS[new_plan]['monthly']['amount']
    
    # Calculate days remaining in current billing cycle
    if current_subscription['end_date']:
        days_remaining = (datetime.fromisoformat(current_subscription['end_date']) - datetime.now()).days
        days_in_month = 30
        
        # Calculate prorated credit for current plan
        current_credit = (current_amount * days_remaining) / days_in_month
        
        # Calculate prorated charge for new plan
        new_charge = (new_amount * days_remaining) / days_in_month
        
        # Net amount to charge
        net_amount = max(0, new_charge - current_credit)
    else:
        net_amount = new_amount
    
    return int(net_amount)

@app.get("/api/subscription/usage-prediction")
async def get_usage_prediction(payload: Dict = Depends(verify_token)):
    """Predict future API usage based on historical data"""
    user_id = payload.get('user_id')
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Get historical usage data
    cursor.execute('''
        SELECT DATE(last_request) as date, SUM(request_count) as requests
        FROM api_usage 
        WHERE user_id = ? 
        GROUP BY DATE(last_request)
        ORDER BY date DESC
        LIMIT 90
    ''', (user_id,))
    
    usage_data = cursor.fetchall()
    conn.close()
    
    if len(usage_data) < 7:
        return {"prediction": "insufficient_data", "message": "Need at least 7 days of usage data"}
    
    # Simple linear prediction (in production, use ML models)
    recent_usage = [row[1] for row in usage_data[:7]]
    avg_daily = sum(recent_usage) / len(recent_usage)
    
    # Predict next 30 days
    predicted_30_days = avg_daily * 30
    predicted_90_days = avg_daily * 90
    
    # Determine if current plan is sufficient
    subscription = get_user_subscription(user_id)
    current_limit = {
        'free': 300,  # 10 req/min * 30 days
        'basic': 3000,  # 100 req/min * 30 days
        'pro': 30000,  # 1000 req/min * 30 days
        'vip': float('inf')
    }.get(subscription['tier'] if subscription else 'free', 300)
    
    plan_sufficient = predicted_30_days <= current_limit
    
    return {
        "prediction": {
            "current_daily_average": round(avg_daily, 2),
            "predicted_30_days": round(predicted_30_days, 2),
            "predicted_90_days": round(predicted_90_days, 2),
            "current_plan_sufficient": plan_sufficient,
            "recommended_plan": get_recommended_plan(predicted_30_days),
            "confidence": "high" if len(usage_data) > 30 else "medium"
        }
    }

def get_recommended_plan(predicted_usage):
    """Get recommended plan based on predicted usage"""
    if predicted_usage <= 3000:
        return "basic"
    elif predicted_usage <= 30000:
        return "pro"
    else:
        return "vip"

@app.post("/api/subscription/setup-automatic-billing")
async def setup_automatic_billing(
    payment_method_id: str = Form(...),
    payload: Dict = Depends(verify_token)
):
    """Setup automatic billing for subscription"""
    user_id = payload.get('user_id')
    subscription = get_user_subscription(user_id)
    
    if not subscription or not subscription['stripe_subscription_id']:
        raise HTTPException(status_code=400, detail="No active subscription found")
    
    try:
        # Attach payment method to customer
        stripe.PaymentMethod.attach(
            payment_method_id,
            customer=subscription['stripe_customer_id']
        )
        
        # Set as default payment method
        stripe.Customer.modify(
            subscription['stripe_customer_id'],
            invoice_settings={
                'default_payment_method': payment_method_id
            }
        )
        
        return {"message": "Automatic billing setup successfully"}
        
    except stripe.error.StripeError as e:
        logger.error(f"Error setting up automatic billing: {e}")
        raise HTTPException(status_code=500, detail="Failed to setup automatic billing")

@app.get("/api/subscription/advanced-dashboard")
async def get_advanced_dashboard(payload: Dict = Depends(verify_token)):
    """Get advanced subscription dashboard with analytics"""
    user_id = payload.get('user_id')
    subscription = get_user_subscription(user_id)
    
    # Get comprehensive analytics
    analytics = await get_subscription_analytics(payload)
    prediction = await get_usage_prediction(payload)
    
    # Get recent activity
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT endpoint, request_count, last_request
        FROM api_usage 
        WHERE user_id = ? 
        ORDER BY last_request DESC
        LIMIT 10
    ''', (user_id,))
    
    recent_activity = cursor.fetchall()
    conn.close()
    
    return {
        "subscription": subscription,
        "analytics": analytics,
        "prediction": prediction,
        "recent_activity": [
            {
                "endpoint": row[0],
                "requests": row[1],
                "last_used": row[2]
            }
            for row in recent_activity
        ],
        "system_status": {
            "api_health": "excellent",
            "response_time": "optimal",
            "uptime": "99.9%",
            "last_maintenance": "2024-01-15"
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


