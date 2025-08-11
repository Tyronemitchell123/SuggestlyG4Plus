# 🚀 Complete Domain Setup Guide for SuggestlyG4Plus

## Prerequisites Installation

### 1. Install Terraform
**Windows:**
1. Download from: https://www.terraform.io/downloads.html
2. Extract to a folder (e.g., `C:\terraform`)
3. Add to PATH: `C:\terraform`

**Or use Chocolatey:**
```powershell
choco install terraform
```

### 2. Install AWS CLI (if not already installed)
**Windows:**
1. Download from: https://aws.amazon.com/cli/
2. Run the installer
3. Verify installation: `aws --version`

## AWS Account Setup

### 1. Create AWS Account
1. Go to: https://aws.amazon.com
2. Click "Create an AWS Account"
3. Follow the signup process
4. **Important:** Add a credit card for billing

### 2. Create IAM User
1. Go to AWS Console → IAM
2. Click "Users" → "Add user"
3. Username: `suggestlyg4plus-admin`
4. Access type: "Programmatic access"
5. Attach policies: "AdministratorAccess"
6. Create user and download credentials

### 3. Configure AWS CLI
```bash
aws configure
```
Enter:
- **AWS Access Key ID:** From the downloaded CSV
- **AWS Secret Access Key:** From the downloaded CSV
- **Default region:** `eu-west-2`
- **Default output format:** `json`

## Domain Configuration Options

### Option 1: Full AWS Migration (Recommended)
**Steps:**
1. Deploy AWS infrastructure
2. Update domain nameservers to AWS Route53
3. Wait for DNS propagation

### Option 2: Subdomain Testing
**Steps:**
1. Deploy AWS infrastructure
2. Create subdomain (e.g., `aws.suggestlyg4plus.io`)
3. Point subdomain to AWS CloudFront
4. Test both environments

### Option 3: DNS Record Update
**Steps:**
1. Deploy AWS infrastructure
2. Update existing DNS records to point to AWS
3. Keep current nameservers

## Deployment Process

### Step 1: Verify Prerequisites
```bash
# Check AWS CLI
aws --version

# Check Terraform
terraform --version

# Check AWS credentials
aws sts get-caller-identity
```

### Step 2: Deploy Infrastructure
```bash
# Navigate to project
cd suggestlyg4plus-aws/scripts

# Run automated setup
./auto-domain-setup.sh
```

### Step 3: Verify Deployment
```bash
# Run monitoring
./ai-domain-monitor.sh once
```

## What Gets Deployed

### Infrastructure Components
- ✅ **VPC** with public/private subnets
- ✅ **Route53 Hosted Zone** for DNS management
- ✅ **ACM Certificate** for SSL/TLS
- ✅ **CloudFront Distribution** for CDN
- ✅ **S3 Bucket** for static files
- ✅ **ECS Cluster** for container orchestration
- ✅ **Application Load Balancer** for traffic distribution
- ✅ **Security Groups** for network security

### Estimated Costs
- **Route53:** ~$0.50/month
- **CloudFront:** ~$1-5/month
- **S3:** ~$0.50/month
- **ECS:** ~$10-20/month
- **Total:** ~$12-26/month

## Troubleshooting

### Common Issues

**1. Terraform not found**
```bash
# Install Terraform
# Download from: https://www.terraform.io/downloads.html
```

**2. AWS credentials error**
```bash
# Reconfigure AWS CLI
aws configure
```

**3. Permission denied**
- Ensure IAM user has admin permissions
- Check if user is in admin group

**4. Domain not resolving**
- Wait for DNS propagation (up to 48 hours)
- Check Route53 hosted zone configuration

**5. SSL certificate issues**
- Ensure domain is properly configured in Route53
- Wait for certificate validation (can take 30 minutes)

## Security Best Practices

### IAM Permissions
- Use least privilege principle
- Create specific IAM policies
- Enable MFA for root account

### Network Security
- Use private subnets for ECS tasks
- Configure security groups properly
- Enable VPC flow logs

### Monitoring
- Set up CloudWatch alarms
- Enable CloudTrail logging
- Monitor costs with billing alerts

## Post-Deployment Steps

1. **Test the application**
2. **Set up monitoring**
3. **Configure backups**
4. **Set up CI/CD pipeline**
5. **Monitor costs**

## Support

If you encounter issues:
1. Check AWS CloudWatch logs
2. Review Terraform outputs
3. Run the monitoring script
4. Check AWS documentation

---

## Quick Start Commands

```bash
# 1. Install Terraform (if not installed)
# Download from: https://www.terraform.io/downloads.html

# 2. Configure AWS CLI
aws configure

# 3. Deploy infrastructure
cd suggestlyg4plus-aws/scripts
./auto-domain-setup.sh

# 4. Test deployment
./ai-domain-monitor.sh once
```

**Ready to get started? Follow the steps above and your domain will be fully configured!** 🎯
