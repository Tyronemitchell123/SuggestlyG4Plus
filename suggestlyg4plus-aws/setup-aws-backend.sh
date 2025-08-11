#!/usr/bin/env bash
set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Setting up AWS Backend for SuggestlyG4Plus v2.0${NC}"
echo ""

# Get user input
read -p "Enter your Terraform state bucket name: " TF_STATE_BUCKET
read -p "Enter your Terraform lock table name: " TF_LOCK_TABLE
read -p "Enter AWS region (default: eu-west-2): " AWS_REGION
AWS_REGION=${AWS_REGION:-eu-west-2}

echo ""
echo -e "${YELLOW}Creating S3 bucket for Terraform state...${NC}"
aws s3api create-bucket \
  --bucket "$TF_STATE_BUCKET" \
  --region "$AWS_REGION" \
  --create-bucket-configuration LocationConstraint="$AWS_REGION" \
  || echo -e "${RED}Bucket creation failed (might already exist)${NC}"

echo -e "${YELLOW}Enabling versioning on S3 bucket...${NC}"
aws s3api put-bucket-versioning \
  --bucket "$TF_STATE_BUCKET" \
  --versioning-configuration Status=Enabled

echo -e "${YELLOW}Creating DynamoDB table for state locking...${NC}"
aws dynamodb create-table \
  --table-name "$TF_LOCK_TABLE" \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  || echo -e "${RED}Table creation failed (might already exist)${NC}"

echo ""
echo -e "${GREEN}✅ AWS Backend setup complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Copy terraform.tfvars.example to terraform.tfvars"
echo "2. Update terraform.tfvars with your values:"
echo "   - tf_state_bucket = \"$TF_STATE_BUCKET\""
echo "   - tf_lock_table = \"$TF_LOCK_TABLE\""
echo "3. Run: ./scripts/deploy.sh"
echo ""
echo -e "${GREEN}Happy deploying! 🚀${NC}"



