#!/bin/bash
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
