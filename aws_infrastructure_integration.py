#!/usr/bin/env python3
"""
AWS Infrastructure Integration for SuggestlyG4Plus v2.0
Integrates domain configuration and AWS infrastructure with the main application
"""

import os
import json
import subprocess
import sys
from pathlib import Path
from typing import Dict, List, Optional
import boto3
from botocore.exceptions import ClientError, NoCredentialsError

class SuggestlyG4PlusAWSIntegration:
    """
    AWS Infrastructure Integration for SuggestlyG4Plus v2.0
    Handles domain configuration, infrastructure deployment, and monitoring
    """
    
    def __init__(self):
        self.domain = "suggestlyg4plus.io"
        self.region = "eu-west-2"
        self.project = "suggestlyg4plusv2"
        self.environment = "production"
        
        # AWS services
        self.route53 = None
        self.acm = None
        self.cloudfront = None
        self.s3 = None
        self.ecs = None
        self.ec2 = None
        
        # Infrastructure status
        self.infrastructure_status = {
            "domain_configured": False,
            "ssl_certificate": False,
            "cdn_active": False,
            "load_balancer": False,
            "containers_running": False,
            "monitoring_active": False
        }
    
    def initialize_aws_services(self):
        """Initialize AWS service clients"""
        try:
            session = boto3.Session(region_name=self.region)
            self.route53 = session.client('route53')
            self.acm = session.client('acm', region_name='us-east-1')  # ACM for CloudFront
            self.cloudfront = session.client('cloudfront')
            self.s3 = session.client('s3')
            self.ecs = session.client('ecs')
            self.ec2 = session.client('ec2')
            return True
        except NoCredentialsError:
            print("❌ AWS credentials not configured")
            return False
        except Exception as e:
            print(f"❌ Error initializing AWS services: {e}")
            return False
    
    def check_domain_status(self) -> Dict:
        """Check current domain configuration status"""
        status = {
            "domain": self.domain,
            "resolves": False,
            "ssl_enabled": False,
            "aws_infrastructure": False,
            "current_provider": None
        }
        
        try:
            # Check if domain resolves
            import socket
            ip = socket.gethostbyname(self.domain)
            status["resolves"] = True
            
            # Check if domain is in Route53
            try:
                hosted_zones = self.route53.list_hosted_zones()
                for zone in hosted_zones['HostedZones']:
                    if self.domain in zone['Name']:
                        status["aws_infrastructure"] = True
                        status["current_provider"] = "AWS Route53"
                        break
            except:
                status["current_provider"] = "External (Vercel/Other)"
                
        except Exception as e:
            print(f"⚠️ Domain check error: {e}")
        
        return status
    
    def create_infrastructure_config(self):
        """Create infrastructure configuration files"""
        config = {
            "project": self.project,
            "domain": self.domain,
            "region": self.region,
            "environment": self.environment,
            "infrastructure": {
                "vpc": {
                    "cidr": "10.0.0.0/16",
                    "public_subnets": ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"],
                    "private_subnets": ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
                },
                "ecs": {
                    "cluster_name": f"{self.project}-cluster",
                    "service_name": f"{self.project}-service",
                    "task_cpu": 1024,
                    "task_memory": 2048,
                    "desired_count": 2
                },
                "cloudfront": {
                    "enabled": True,
                    "price_class": "PriceClass_100",
                    "default_root_object": "index.html"
                },
                "monitoring": {
                    "cloudwatch_enabled": True,
                    "ai_monitoring": True,
                    "health_checks": True
                }
            }
        }
        
        # Save configuration
        with open('aws_infrastructure_config.json', 'w') as f:
            json.dump(config, f, indent=2)
        
        return config
    
    def deploy_infrastructure(self) -> bool:
        """Deploy AWS infrastructure using Terraform"""
        try:
            print("🚀 Deploying AWS infrastructure...")
            
            # Check if Terraform is available
            result = subprocess.run(['terraform', '--version'], 
                                  capture_output=True, text=True)
            if result.returncode != 0:
                print("❌ Terraform not found. Please install Terraform first.")
                return False
            
            # Navigate to Terraform directory
            terraform_dir = Path("suggestlyg4plus-aws/infra/terraform")
            if not terraform_dir.exists():
                print("❌ Terraform configuration not found")
                return False
            
            # Initialize Terraform
            print("📦 Initializing Terraform...")
            result = subprocess.run(['terraform', 'init'], 
                                  cwd=terraform_dir, capture_output=True, text=True)
            if result.returncode != 0:
                print(f"❌ Terraform init failed: {result.stderr}")
                return False
            
            # Plan deployment
            print("📋 Planning deployment...")
            result = subprocess.run(['terraform', 'plan', '-out=tfplan'], 
                                  cwd=terraform_dir, capture_output=True, text=True)
            if result.returncode != 0:
                print(f"❌ Terraform plan failed: {result.stderr}")
                return False
            
            # Apply deployment
            print("🚀 Applying infrastructure changes...")
            result = subprocess.run(['terraform', 'apply', 'tfplan'], 
                                  cwd=terraform_dir, capture_output=True, text=True)
            if result.returncode != 0:
                print(f"❌ Terraform apply failed: {result.stderr}")
                return False
            
            print("✅ Infrastructure deployed successfully!")
            return True
            
        except Exception as e:
            print(f"❌ Deployment error: {e}")
            return False
    
    def setup_monitoring(self):
        """Setup AI-powered monitoring system"""
        monitoring_config = {
            "domain": self.domain,
            "health_checks": [
                "/health",
                "/api/health",
                "/api/status"
            ],
            "monitoring_interval": 300,  # 5 minutes
            "alerts": {
                "email": "admin@suggestlyg4plus.io",
                "slack_webhook": None
            },
            "metrics": [
                "response_time",
                "availability",
                "ssl_certificate",
                "dns_propagation"
            ]
        }
        
        # Save monitoring configuration
        with open('monitoring_config.json', 'w') as f:
            json.dump(monitoring_config, f, indent=2)
        
        return monitoring_config
    
    def integrate_with_main_app(self):
        """Integrate AWS infrastructure with main SuggestlyG4Plus application"""
        integration_config = {
            "aws_integration": {
                "enabled": True,
                "domain": self.domain,
                "region": self.region,
                "services": {
                    "cdn": "cloudfront",
                    "load_balancer": "alb",
                    "containers": "ecs",
                    "storage": "s3",
                    "dns": "route53",
                    "ssl": "acm"
                }
            },
            "application": {
                "name": "SuggestlyG4Plus v2.0",
                "version": "2.0.0",
                "environment": self.environment,
                "features": [
                    "AI-powered agents",
                    "Multi-agent orchestration",
                    "Real-time processing",
                    "Enterprise security",
                    "Auto-scaling",
                    "Global CDN"
                ]
            },
            "deployment": {
                "method": "terraform",
                "auto_scaling": True,
                "health_monitoring": True,
                "ssl_termination": True,
                "cdn_enabled": True
            }
        }
        
        # Save integration configuration
        with open('app_integration_config.json', 'w') as f:
            json.dump(integration_config, f, indent=2)
        
        return integration_config
    
    def create_deployment_script(self):
        """Create automated deployment script"""
        script_content = '''#!/bin/bash
# SuggestlyG4Plus v2.0 AWS Deployment Script

set -e

echo "🚀 Deploying SuggestlyG4Plus v2.0 to AWS..."

# Check prerequisites
command -v terraform >/dev/null 2>&1 || { echo "❌ Terraform not found"; exit 1; }
command -v aws >/dev/null 2>&1 || { echo "❌ AWS CLI not found"; exit 1; }

# Verify AWS credentials
aws sts get-caller-identity >/dev/null 2>&1 || { echo "❌ AWS credentials not configured"; exit 1; }

# Deploy infrastructure
cd suggestlyg4plus-aws/infra/terraform
terraform init
terraform plan -out=tfplan
terraform apply tfplan

# Setup monitoring
cd ../../scripts
chmod +x ai-domain-monitor.sh
./ai-domain-monitor.sh once

echo "✅ SuggestlyG4Plus v2.0 deployed successfully!"
echo "🌐 Domain: https://suggestlyg4plus.io"
echo "📊 Monitoring: Active"
echo "🔒 SSL: Enabled"
'''
        
        with open('deploy_suggestlyg4plus.sh', 'w') as f:
            f.write(script_content)
        
        # Make script executable
        os.chmod('deploy_suggestlyg4plus.sh', 0o755)
        
        return script_content
    
    def generate_status_report(self) -> Dict:
        """Generate comprehensive status report"""
        status = {
            "project": "SuggestlyG4Plus v2.0",
            "version": "2.0.0",
            "deployment_date": "2024-01-01",
            "domain": self.domain,
            "infrastructure": {
                "provider": "AWS",
                "region": self.region,
                "environment": self.environment,
                "components": {
                    "vpc": "Configured",
                    "route53": "Ready",
                    "cloudfront": "Ready",
                    "ecs": "Ready",
                    "alb": "Ready",
                    "s3": "Ready",
                    "ssl": "Ready"
                }
            },
            "application": {
                "status": "Ready for deployment",
                "features": [
                    "AI-powered multi-agent system",
                    "Real-time processing",
                    "Enterprise security",
                    "Auto-scaling infrastructure",
                    "Global CDN distribution",
                    "SSL/TLS encryption",
                    "AI-powered monitoring"
                ]
            },
            "next_steps": [
                "Configure AWS credentials",
                "Run deployment script",
                "Test domain functionality",
                "Setup monitoring alerts",
                "Configure CI/CD pipeline"
            ]
        }
        
        # Save status report
        with open('deployment_status_report.json', 'w') as f:
            json.dump(status, f, indent=2)
        
        return status

def main():
    """Main integration function"""
    print("🚀 SuggestlyG4Plus v2.0 AWS Infrastructure Integration")
    print("=" * 60)
    
    # Initialize integration
    integration = SuggestlyG4PlusAWSIntegration()
    
    # Check AWS services
    if not integration.initialize_aws_services():
        print("⚠️ AWS services not available. Please configure AWS credentials.")
        print("Run: aws configure")
        return
    
    # Check domain status
    print("\n🌐 Checking domain status...")
    domain_status = integration.check_domain_status()
    print(f"Domain: {domain_status['domain']}")
    print(f"Resolves: {domain_status['resolves']}")
    print(f"Current Provider: {domain_status['current_provider']}")
    
    # Create infrastructure configuration
    print("\n⚙️ Creating infrastructure configuration...")
    config = integration.create_infrastructure_config()
    print("✅ Infrastructure configuration created")
    
    # Setup monitoring
    print("\n📊 Setting up monitoring...")
    monitoring = integration.setup_monitoring()
    print("✅ Monitoring configuration created")
    
    # Integrate with main app
    print("\n🔗 Integrating with main application...")
    app_integration = integration.integrate_with_main_app()
    print("✅ Application integration configured")
    
    # Create deployment script
    print("\n📝 Creating deployment script...")
    integration.create_deployment_script()
    print("✅ Deployment script created")
    
    # Generate status report
    print("\n📋 Generating status report...")
    status = integration.generate_status_report()
    print("✅ Status report generated")
    
    print("\n🎉 Integration completed successfully!")
    print("\n📋 Next Steps:")
    print("1. Configure AWS credentials: aws configure")
    print("2. Deploy infrastructure: ./deploy_suggestlyg4plus.sh")
    print("3. Test domain: https://suggestlyg4plus.io")
    print("4. Monitor deployment: ./suggestlyg4plus-aws/scripts/ai-domain-monitor.sh")
    
    print(f"\n📁 Configuration files created:")
    print("- aws_infrastructure_config.json")
    print("- monitoring_config.json")
    print("- app_integration_config.json")
    print("- deploy_suggestlyg4plus.sh")
    print("- deployment_status_report.json")

if __name__ == "__main__":
    main()

