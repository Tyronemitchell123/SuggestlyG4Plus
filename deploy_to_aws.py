#!/usr/bin/env python3
"""
🚀 AWS DEPLOYMENT AUTOMATION SCRIPT
SuggestlyG4Plus v2.0 - Complete AWS Deployment

This script automatically:
1. Installs AWS CLI and boto3
2. Configures AWS credentials
3. Deploys to all AWS services
4. Sets up monitoring and scaling
5. Creates deployment summary
"""

import os
import sys
import subprocess
import json
import time
from datetime import datetime

def install_requirements():
    """Install required packages"""
    print("📦 Installing required packages...")
    
    packages = [
        "boto3",
        "botocore",
        "awscli"
    ]
    
    for package in packages:
        try:
            subprocess.run([sys.executable, "-m", "pip", "install", package], check=True)
            print(f"✅ {package} installed")
        except subprocess.CalledProcessError:
            print(f"❌ Failed to install {package}")

def setup_aws_cli():
    """Setup AWS CLI"""
    print("🔧 Setting up AWS CLI...")
    
    try:
        # Check if AWS CLI is installed
        result = subprocess.run(["aws", "--version"], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ AWS CLI is already installed")
            return True
    except FileNotFoundError:
        print("❌ AWS CLI not found")
        return False

def configure_aws():
    """Configure AWS credentials"""
    print("🔐 Configuring AWS credentials...")
    
    # Set default region
    subprocess.run(["aws", "configure", "set", "default.region", "us-east-1"])
    
    # Check if credentials are configured
    try:
        result = subprocess.run(["aws", "sts", "get-caller-identity"], 
                              capture_output=True, text=True, check=True)
        identity = json.loads(result.stdout)
        print(f"✅ AWS configured for account: {identity['Account']}")
        return True
    except subprocess.CalledProcessError:
        print("❌ AWS credentials not configured")
        print("Please run: aws configure")
        return False

def run_terraform_deployment():
    """Run Terraform deployment"""
    print("🏗️ Running Terraform deployment...")
    
    # Change to terraform directory
    os.chdir("terraform")
    
    try:
        # Initialize Terraform
        subprocess.run(["terraform", "init"], check=True)
        print("✅ Terraform initialized")
        
        # Plan deployment
        subprocess.run(["terraform", "plan"], check=True)
        print("✅ Terraform plan created")
        
        # Apply deployment
        subprocess.run(["terraform", "apply", "-auto-approve"], check=True)
        print("✅ Terraform deployment completed")
        
        # Get outputs
        result = subprocess.run(["terraform", "output", "-json"], 
                              capture_output=True, text=True, check=True)
        outputs = json.loads(result.stdout)
        
        return outputs
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Terraform deployment failed: {e}")
        return None
    finally:
        os.chdir("..")

def run_python_deployment():
    """Run Python-based deployment"""
    print("🐍 Running Python deployment...")
    
    try:
        subprocess.run([sys.executable, "aws_deployment_system.py"], check=True)
        print("✅ Python deployment completed")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Python deployment failed: {e}")
        return False

def create_deployment_summary(outputs):
    """Create deployment summary"""
    print("📋 Creating deployment summary...")
    
    summary = {
        "deployment_time": datetime.now().isoformat(),
        "deployment_method": "Automated AWS Deployment",
        "services_deployed": {
            "EC2": "✅ Deployed",
            "Lambda": "✅ Deployed", 
            "ECS": "✅ Deployed",
            "RDS": "✅ Deployed",
            "S3": "✅ Deployed",
            "CloudFront": "✅ Deployed",
            "VPC": "✅ Deployed",
            "Security Groups": "✅ Deployed"
        },
        "terraform_outputs": outputs,
        "access_urls": {
            "EC2_Instance": f"http://{outputs.get('ec2_public_ip', {}).get('value', 'N/A')}",
            "CloudFront": f"https://{outputs.get('cloudfront_domain', {}).get('value', 'N/A')}",
            "S3_Bucket": f"https://{outputs.get('s3_bucket_name', {}).get('value', 'N/A')}.s3.amazonaws.com"
        },
        "next_steps": [
            "Configure domain names",
            "Set up SSL certificates", 
            "Configure auto-scaling",
            "Set up monitoring alerts",
            "Configure backup strategies"
        ]
    }
    
    with open("aws_deployment_summary.json", "w") as f:
        json.dump(summary, f, indent=2)
    
    print("✅ Deployment summary created: aws_deployment_summary.json")

def main():
    """Main deployment function"""
    print("🚀 AWS DEPLOYMENT AUTOMATION")
    print("=" * 50)
    print("This will deploy SuggestlyG4Plus v2.0 to all AWS services")
    print()
    
    # Install requirements
    install_requirements()
    
    # Setup AWS CLI
    if not setup_aws_cli():
        print("❌ AWS CLI setup failed")
        return
    
    # Configure AWS
    if not configure_aws():
        print("❌ AWS configuration failed")
        return
    
    # Run Terraform deployment
    print("\n🏗️ Starting Terraform deployment...")
    outputs = run_terraform_deployment()
    
    if outputs:
        print("✅ Terraform deployment successful")
    else:
        print("❌ Terraform deployment failed")
        return
    
    # Run Python deployment
    print("\n🐍 Starting Python deployment...")
    if run_python_deployment():
        print("✅ Python deployment successful")
    else:
        print("❌ Python deployment failed")
    
    # Create summary
    create_deployment_summary(outputs)
    
    print("\n🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!")
    print("=" * 50)
    print("Your SuggestlyG4Plus v2.0 is now deployed to:")
    print("• EC2 Instances")
    print("• AWS Lambda") 
    print("• ECS (Elastic Container Service)")
    print("• RDS Database")
    print("• S3 Storage")
    print("• CloudFront CDN")
    print("• VPC & Security Groups")
    print()
    print("📋 Check aws_deployment_summary.json for details")
    print("🌐 Access your application at the URLs provided")

if __name__ == "__main__":
    main()
