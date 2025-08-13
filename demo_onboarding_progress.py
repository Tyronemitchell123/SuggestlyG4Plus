#!/usr/bin/env python3
"""
Integration Demo: Progress Meter with Client Onboarding System
"""

import asyncio
import json
from client_onboarding_system import UHNWIClientOnboarding

async def demo_onboarding_with_progress():
    """Demonstrate progress meter integration with onboarding system"""
    print("🚀 Client Onboarding Progress Meter Integration Demo\n")
    
    # Initialize onboarding system
    onboarding_system = UHNWIClientOnboarding()
    
    # Demo client data
    client_data = {
        "name": "Alexandra Morrison",
        "email": "alexandra.morrison@example.com",
        "tier": "ultra_premium",
        "estimated_net_worth": 50000000,
        "investment_experience": "expert",
        "risk_tolerance": "moderate",
        "citizenship": "US",
        "documents": {
            "passport": "verified",
            "wealth_statement": "submitted",
            "source_of_funds": "pending"
        }
    }
    
    print("👤 Initiating onboarding for UHNWI client...")
    onboarding_result = await onboarding_system.initiate_onboarding(
        client_data=client_data,
        tier="ultra_premium"
    )
    
    onboarding_id = onboarding_result["onboarding_id"]
    print(f"✅ Onboarding ID: {onboarding_id}")
    print(f"📋 Relationship Manager: {onboarding_result['relationship_manager']['name']}")
    
    print("\n📊 Generating progress report with premium meters...")
    
    # Generate onboarding report with progress meters
    report = await onboarding_system.generate_onboarding_report(onboarding_id)
    
    print(f"📈 Overall Progress: {report['completion_percentage']}%")
    print(f"⏱️  Estimated Completion: {report['estimated_completion']}")
    
    # Display verification status
    print("\n🔍 Verification Status:")
    for verification, details in report['verification_status'].items():
        status_emoji = "✅" if details['status'] == 'completed' else "🔄" if details['status'] == 'in_progress' else "⏳"
        print(f"  {status_emoji} {verification.replace('_', ' ').title()}: {details['status']}")
    
    # Save HTML report with progress meters
    if 'progress_meter_html' in report:
        html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Client Onboarding Progress - {client_data['name']}</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
            <style>
                body {{
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    background: linear-gradient(135deg, #0A0A23 0%, #1A1A3A 100%);
                    color: #F8F9FA;
                    margin: 0;
                    padding: 2rem;
                    min-height: 100vh;
                }}
                
                .container {{
                    max-width: 1000px;
                    margin: 0 auto;
                }}
                
                .onboarding-progress-report {{
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 1rem;
                    padding: 2rem;
                    backdrop-filter: blur(10px);
                }}
                
                .onboarding-progress-report h2 {{
                    color: #D4AF37;
                    font-size: 1.8rem;
                    margin-bottom: 2rem;
                    text-align: center;
                }}
                
                .onboarding-progress-report h3 {{
                    color: #FFD700;
                    font-size: 1.3rem;
                    margin: 2rem 0 1rem 0;
                }}
                
                .client-info {{
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                }}
                
                .client-info h3 {{
                    margin-top: 0;
                }}
                
                .info-grid {{
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1rem;
                    margin-top: 1rem;
                }}
                
                .info-item {{
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }}
                
                .info-label {{
                    color: #9CA3AF;
                    font-weight: 500;
                }}
                
                .info-value {{
                    color: #F8F9FA;
                    font-weight: 600;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="client-info">
                    <h3>Client Information</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Name:</span>
                            <span class="info-value">{client_data['name']}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Tier:</span>
                            <span class="info-value">{client_data['tier'].replace('_', ' ').title()}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Net Worth:</span>
                            <span class="info-value">${client_data['estimated_net_worth']:,}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Experience:</span>
                            <span class="info-value">{client_data['investment_experience'].title()}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Onboarding ID:</span>
                            <span class="info-value">{onboarding_id}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Relationship Manager:</span>
                            <span class="info-value">{onboarding_result['relationship_manager']['name']}</span>
                        </div>
                    </div>
                </div>
                
                {report['progress_meter_html']}
            </div>
        </body>
        </html>
        """
        
        with open('onboarding_progress_report.html', 'w') as f:
            f.write(html_content)
        
        print(f"\n📄 HTML Progress Report Generated: onboarding_progress_report.html")
        print(f"🌐 Open the file in a browser to see the premium progress meters")
    
    print(f"\n🎯 Demo completed successfully!")
    print(f"📈 Progress Meter Integration: {'✅ Active' if 'progress_meter_html' in report else '❌ Not Available'}")

if __name__ == "__main__":
    asyncio.run(demo_onboarding_with_progress())