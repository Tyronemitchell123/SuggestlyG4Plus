#!/usr/bin/env python3
"""
Local Web Server for Aurum Private & SuggestlyG4Plus Websites
This script starts a local server to view the websites immediately.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

def create_index_redirect():
    """Create a main index page that redirects to both websites"""
    html_content = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website Selection - Aurum Private & SuggestlyG4Plus</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #000000 0%, #111827 50%, #1f2937 100%);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .container {
            text-align: center;
            max-width: 800px;
            padding: 2rem;
        }
        
        .title {
            font-size: 3rem;
            font-weight: 900;
            margin-bottom: 2rem;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .subtitle {
            font-size: 1.25rem;
            color: #d1d5db;
            margin-bottom: 3rem;
        }
        
        .website-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .website-card {
            background: rgba(31, 41, 55, 0.8);
            border: 2px solid rgba(251, 191, 36, 0.3);
            border-radius: 15px;
            padding: 2rem;
            transition: all 0.3s ease;
            text-decoration: none;
            color: inherit;
        }
        
        .website-card:hover {
            transform: translateY(-5px);
            border-color: #fbbf24;
            box-shadow: 0 10px 30px rgba(251, 191, 36, 0.3);
        }
        
        .website-card.aurum {
            border-color: rgba(251, 191, 36, 0.3);
        }
        
        .website-card.suggestly {
            border-color: rgba(120, 119, 198, 0.3);
        }
        
        .website-card.aurum:hover {
            border-color: #fbbf24;
        }
        
        .website-card.suggestly:hover {
            border-color: #7877c6;
        }
        
        .website-name {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        
        .website-card.aurum .website-name {
            color: #fbbf24;
        }
        
        .website-card.suggestly .website-name {
            color: #7877c6;
        }
        
        .website-description {
            color: #9ca3af;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        
        .website-features {
            list-style: none;
            text-align: left;
            margin-bottom: 1.5rem;
        }
        
        .website-features li {
            padding: 0.25rem 0;
            color: #d1d5db;
            position: relative;
            padding-left: 1.5rem;
        }
        
        .website-features li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
        }
        
        .view-button {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.3s ease;
            width: 100%;
        }
        
        .website-card.aurum .view-button {
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: #000000;
        }
        
        .website-card.suggestly .view-button {
            background: linear-gradient(135deg, #7877c6, #ff77c6);
            color: #ffffff;
        }
        
        .view-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        .server-info {
            background: rgba(31, 41, 55, 0.8);
            border: 1px solid rgba(251, 191, 36, 0.2);
            border-radius: 10px;
            padding: 1.5rem;
            margin-top: 2rem;
        }
        
        .server-info h3 {
            color: #fbbf24;
            margin-bottom: 1rem;
        }
        
        .server-info p {
            color: #d1d5db;
            margin-bottom: 0.5rem;
        }
        
        .server-info code {
            background: rgba(0, 0, 0, 0.3);
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            color: #fbbf24;
        }
        
        @media (max-width: 768px) {
            .title {
                font-size: 2rem;
            }
            
            .website-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="title">Website Selection</h1>
        <p class="subtitle">Choose which website to view:</p>
        
        <div class="website-grid">
            <a href="/aurum-private" class="website-card aurum">
                <div class="website-name">Aurum Private</div>
                <div class="website-description">Elite AI-Powered Investment Platform</div>
                <ul class="website-features">
                                         <li>Executive Suite from £75K/month</li>
                    <li>Four premium investment tiers</li>
                    <li>100% AI automation</li>
                    <li>Ultra-high-net-worth focus</li>
                </ul>
                <div class="view-button">View Aurum Private</div>
            </a>
            
            <a href="/suggestly-ai-platform" class="website-card suggestly">
                <div class="website-name">SuggestlyG4Plus</div>
                <div class="website-description">Fully Automated AI Platform</div>
                <ul class="website-features">
                    <li>Multi-agent intelligence</li>
                    <li>IoT & blockchain integration</li>
                    <li>Voice AI & computer vision</li>
                    <li>Advanced subscription tiers</li>
                </ul>
                <div class="view-button">View SuggestlyG4Plus</div>
            </a>
        </div>
        
        <div class="server-info">
            <h3>Server Information</h3>
            <p><strong>Local Server:</strong> <code>http://localhost:8000</code></p>
            <p><strong>Aurum Private:</strong> <code>http://localhost:8000/aurum-private</code></p>
            <p><strong>SuggestlyG4Plus:</strong> <code>http://localhost:8000/suggestly-ai-platform</code></p>
            <p><strong>Capital Tier Page:</strong> <code>http://localhost:8000/capital-tier.html</code></p>
        </div>
    </div>
</body>
</html>
    """
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html_content)

def create_directory_structure():
    """Create the necessary directory structure"""
    # Create aurum-private directory
    aurum_dir = Path('aurum-private')
    aurum_dir.mkdir(exist_ok=True)
    
    # Create suggestly-ai-platform directory if it doesn't exist
    suggestly_dir = Path('suggestly-ai-platform')
    suggestly_dir.mkdir(exist_ok=True)
    
    # Copy main index.html to aurum-private directory
    if Path('index.html').exists():
        import shutil
        shutil.copy('index.html', aurum_dir / 'index.html')
    
    # Copy logo files to serve them
    if Path('aurum-logo.svg').exists():
        shutil.copy('aurum-logo.svg', aurum_dir / 'aurum-logo.svg')
    if Path('suggestly-logo.svg').exists():
        shutil.copy('suggestly-logo.svg', suggestly_dir / 'suggestly-logo.svg')

def start_server(port=8000):
    """Start the local web server"""
    try:
        # Create directory structure
        create_directory_structure()
        
        # Create main index page
        create_index_redirect()
        
        # Change to the current directory
        os.chdir('.')
        
        # Create and start the server
        with socketserver.TCPServer(("", port), http.server.SimpleHTTPRequestHandler) as httpd:
            print(f"🚀 Starting local web server...")
            print(f"📱 Server running at: http://localhost:{port}")
            print(f"🌐 Aurum Private: http://localhost:{port}/aurum-private")
            print(f"🤖 SuggestlyG4Plus: http://localhost:{port}/suggestly-ai-platform")
            print(f"💰 Capital Tier: http://localhost:{port}/capital-tier.html")
            print(f"\n✨ Opening browser automatically...")
            print(f"⏹️  Press Ctrl+C to stop the server")
            
            # Open browser automatically
            webbrowser.open(f'http://localhost:{port}')
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print(f"\n🛑 Server stopped by user")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {port} is already in use. Trying port {port + 1}...")
            start_server(port + 1)
        else:
            print(f"❌ Error starting server: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    print("🎯 Aurum Private & SuggestlyG4Plus Local Server")
    print("=" * 50)
    start_server()
