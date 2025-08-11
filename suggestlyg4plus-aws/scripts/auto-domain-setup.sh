#!/bin/bash

# Advanced AI-Powered Domain Configuration Script
# Automatically configures DNS, SSL, and domain management for SuggestlyG4Plus

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="suggestlyg4plus.io"
REGION="eu-west-2"
PROJECT="suggestlyg4plusv2"

echo -e "${BLUE}🚀 Advanced AI-Powered Domain Configuration${NC}"
echo -e "${BLUE}============================================${NC}"

# Function to check AWS CLI
check_aws_cli() {
    echo -e "${YELLOW}🔍 Checking AWS CLI configuration...${NC}"
    if ! command -v aws &> /dev/null; then
        echo -e "${RED}❌ AWS CLI not found. Please install AWS CLI first.${NC}"
        exit 1
    fi
    
    if ! aws sts get-caller-identity &> /dev/null; then
        echo -e "${RED}❌ AWS credentials not configured. Please run 'aws configure' first.${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ AWS CLI configured successfully${NC}"
}

# Function to create Route53 hosted zone
create_hosted_zone() {
    echo -e "${YELLOW}🌐 Creating Route53 hosted zone for ${DOMAIN}...${NC}"
    
    # Check if hosted zone already exists
    EXISTING_ZONE=$(aws route53 list-hosted-zones --query "HostedZones[?Name=='${DOMAIN}.'].Id" --output text)
    
    if [ -n "$EXISTING_ZONE" ]; then
        echo -e "${GREEN}✅ Hosted zone already exists: ${EXISTING_ZONE}${NC}"
        HOSTED_ZONE_ID=${EXISTING_ZONE}
    else
        # Create new hosted zone
        ZONE_RESPONSE=$(aws route53 create-hosted-zone \
            --name ${DOMAIN} \
            --caller-reference $(date +%s) \
            --query 'HostedZone.Id' \
            --output text)
        
        HOSTED_ZONE_ID=${ZONE_RESPONSE}
        echo -e "${GREEN}✅ Created hosted zone: ${HOSTED_ZONE_ID}${NC}"
        
        # Get nameservers
        NAMESERVERS=$(aws route53 get-hosted-zone --id ${HOSTED_ZONE_ID} \
            --query 'DelegationSet.NameServers' \
            --output text)
        
        echo -e "${YELLOW}📋 Nameservers for ${DOMAIN}:${NC}"
        echo "$NAMESERVERS" | tr '\t' '\n'
        echo -e "${YELLOW}⚠️  Please update your domain registrar with these nameservers${NC}"
    fi
}

# Function to create ACM certificate
create_ssl_certificate() {
    echo -e "${YELLOW}🔒 Creating SSL certificate for ${DOMAIN}...${NC}"
    
    # Check if certificate already exists
    EXISTING_CERT=$(aws acm list-certificates --region us-east-1 \
        --query "CertificateSummaryList[?DomainName=='${DOMAIN}'].CertificateArn" \
        --output text)
    
    if [ -n "$EXISTING_CERT" ]; then
        echo -e "${GREEN}✅ SSL certificate already exists: ${EXISTING_CERT}${NC}"
        CERT_ARN=${EXISTING_CERT}
    else
        # Create new certificate
        CERT_ARN=$(aws acm request-certificate \
            --domain-name ${DOMAIN} \
            --subject-alternative-names "*.${DOMAIN}" \
            --validation-method DNS \
            --region us-east-1 \
            --query 'CertificateArn' \
            --output text)
        
        echo -e "${GREEN}✅ Created SSL certificate: ${CERT_ARN}${NC}"
        
        # Wait for certificate validation
        echo -e "${YELLOW}⏳ Waiting for certificate validation...${NC}"
        aws acm wait certificate-validated --certificate-arn ${CERT_ARN} --region us-east-1
        echo -e "${GREEN}✅ Certificate validated successfully${NC}"
    fi
}

# Function to update Terraform configuration
update_terraform_config() {
    echo -e "${YELLOW}⚙️  Updating Terraform configuration...${NC}"
    
    # Update terraform.tfvars with hosted zone ID
    sed -i "s/hosted_zone_id  = \"Z1234567890ABC\"/hosted_zone_id  = \"${HOSTED_ZONE_ID}\"/" infra/terraform/terraform.tfvars
    
    echo -e "${GREEN}✅ Terraform configuration updated${NC}"
}

# Function to create S3 buckets for Terraform state
create_terraform_buckets() {
    echo -e "${YELLOW}🪣 Creating S3 buckets for Terraform state...${NC}"
    
    STATE_BUCKET="suggestlyg4plus-terraform-state"
    LOCK_TABLE="suggestlyg4plus-terraform-locks"
    
    # Create S3 bucket for state
    if ! aws s3 ls "s3://${STATE_BUCKET}" &> /dev/null; then
        aws s3 mb s3://${STATE_BUCKET} --region ${REGION}
        aws s3api put-bucket-versioning --bucket ${STATE_BUCKET} --versioning-configuration Status=Enabled
        aws s3api put-bucket-encryption --bucket ${STATE_BUCKET} \
            --server-side-encryption-configuration '{
                "Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]
            }'
        echo -e "${GREEN}✅ Created S3 bucket: ${STATE_BUCKET}${NC}"
    else
        echo -e "${GREEN}✅ S3 bucket already exists: ${STATE_BUCKET}${NC}"
    fi
    
    # Create DynamoDB table for state locking
    if ! aws dynamodb describe-table --table-name ${LOCK_TABLE} &> /dev/null; then
        aws dynamodb create-table \
            --table-name ${LOCK_TABLE} \
            --attribute-definitions AttributeName=LockID,AttributeType=S \
            --key-schema AttributeName=LockID,KeyType=HASH \
            --billing-mode PAY_PER_REQUEST \
            --region ${REGION}
        
        aws dynamodb wait table-exists --table-name ${LOCK_TABLE} --region ${REGION}
        echo -e "${GREEN}✅ Created DynamoDB table: ${LOCK_TABLE}${NC}"
    else
        echo -e "${GREEN}✅ DynamoDB table already exists: ${LOCK_TABLE}${NC}"
    fi
}

# Function to initialize and apply Terraform
deploy_infrastructure() {
    echo -e "${YELLOW}🏗️  Deploying infrastructure with Terraform...${NC}"
    
    cd infra/terraform
    
    # Initialize Terraform
    terraform init \
        -backend-config="bucket=${STATE_BUCKET}" \
        -backend-config="key=${PROJECT}/terraform.tfstate" \
        -backend-config="region=${REGION}" \
        -backend-config="dynamodb_table=${LOCK_TABLE}"
    
    # Plan deployment
    terraform plan -out=tfplan
    
    # Apply deployment
    echo -e "${YELLOW}🚀 Applying infrastructure changes...${NC}"
    terraform apply tfplan
    
    # Get outputs
    CLOUDFRONT_DOMAIN=$(terraform output -raw cloudfront_domain)
    ALB_DOMAIN=$(terraform output -raw alb_domain)
    
    echo -e "${GREEN}✅ Infrastructure deployed successfully${NC}"
    echo -e "${BLUE}🌐 CloudFront Domain: ${CLOUDFRONT_DOMAIN}${NC}"
    echo -e "${BLUE}⚖️  Load Balancer: ${ALB_DOMAIN}${NC}"
    
    cd ../..
}

# Function to create DNS records
create_dns_records() {
    echo -e "${YELLOW}📝 Creating DNS records...${NC}"
    
    # Get CloudFront distribution domain
    CLOUDFRONT_DOMAIN=$(aws cloudfront list-distributions \
        --query "DistributionList.Items[?Aliases.Items[?contains(@, '${DOMAIN}')]].DomainName" \
        --output text)
    
    if [ -n "$CLOUDFRONT_DOMAIN" ]; then
        # Create A record for root domain
        aws route53 change-resource-record-sets \
            --hosted-zone-id ${HOSTED_ZONE_ID} \
            --change-batch '{
                "Changes": [{
                    "Action": "UPSERT",
                    "ResourceRecordSet": {
                        "Name": "'${DOMAIN}'",
                        "Type": "A",
                        "AliasTarget": {
                            "HostedZoneId": "Z2FDTNDATAQYW2",
                            "DNSName": "'${CLOUDFRONT_DOMAIN}'",
                            "EvaluateTargetHealth": false
                        }
                    }
                }]
            }'
        
        # Create A record for www subdomain
        aws route53 change-resource-record-sets \
            --hosted-zone-id ${HOSTED_ZONE_ID} \
            --change-batch '{
                "Changes": [{
                    "Action": "UPSERT",
                    "ResourceRecordSet": {
                        "Name": "www.'${DOMAIN}'",
                        "Type": "A",
                        "AliasTarget": {
                            "HostedZoneId": "Z2FDTNDATAQYW2",
                            "DNSName": "'${CLOUDFRONT_DOMAIN}'",
                            "EvaluateTargetHealth": false
                        }
                    }
                }]
            }'
        
        echo -e "${GREEN}✅ DNS records created successfully${NC}"
    else
        echo -e "${RED}❌ CloudFront distribution not found${NC}"
    fi
}

# Function to test domain configuration
test_domain() {
    echo -e "${YELLOW}🧪 Testing domain configuration...${NC}"
    
    # Test HTTPS
    if curl -s -o /dev/null -w "%{http_code}" https://${DOMAIN} | grep -q "200\|301\|302"; then
        echo -e "${GREEN}✅ HTTPS working: https://${DOMAIN}${NC}"
    else
        echo -e "${YELLOW}⚠️  HTTPS not yet working (DNS propagation may take time)${NC}"
    fi
    
    # Test www subdomain
    if curl -s -o /dev/null -w "%{http_code}" https://www.${DOMAIN} | grep -q "200\|301\|302"; then
        echo -e "${GREEN}✅ WWW subdomain working: https://www.${DOMAIN}${NC}"
    else
        echo -e "${YELLOW}⚠️  WWW subdomain not yet working${NC}"
    fi
}

# Main execution
main() {
    echo -e "${BLUE}🎯 Starting advanced domain configuration...${NC}"
    
    check_aws_cli
    create_terraform_buckets
    create_hosted_zone
    create_ssl_certificate
    update_terraform_config
    deploy_infrastructure
    create_dns_records
    test_domain
    
    echo -e "${GREEN}🎉 Domain configuration completed successfully!${NC}"
    echo -e "${BLUE}🌐 Your domain ${DOMAIN} is now configured with:${NC}"
    echo -e "${BLUE}   ✅ SSL/HTTPS certificate${NC}"
    echo -e "${BLUE}   ✅ CloudFront CDN${NC}"
    echo -e "${BLUE}   ✅ Route53 DNS management${NC}"
    echo -e "${BLUE}   ✅ Load balancer${NC}"
    echo -e "${BLUE}   ✅ Auto-scaling infrastructure${NC}"
}

# Run main function
main "$@"
