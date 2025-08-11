# 🚀 AWS Setup Guide for SuggestlyG4Plus Domain

## Prerequisites

### 1. AWS Account Setup
- [ ] Create AWS account at https://aws.amazon.com
- [ ] Enable billing alerts
- [ ] Create IAM user with admin permissions

### 2. Required AWS Services
- [ ] Route53 (DNS Management)
- [ ] ACM (SSL Certificates)
- [ ] CloudFront (CDN)
- [ ] S3 (Static Hosting)
- [ ] ECS (Container Orchestration)
- [ ] VPC (Networking)
- [ ] IAM (Security)

## Step-by-Step Setup

### Step 1: Configure AWS CLI

```bash
# Install AWS CLI (if not already installed)
# Windows: Download from https://aws.amazon.com/cli/
# macOS: brew install awscli
# Linux: sudo apt install awscli

# Configure AWS credentials
aws configure
```

**Enter the following when prompted:**
- AWS Access Key ID: `YOUR_ACCESS_KEY`
- AWS Secret Access Key: `YOUR_SECRET_KEY`
- Default region: `eu-west-2`
- Default output format: `json`

### Step 2: Get Your AWS Credentials

1. **Login to AWS Console**
2. **Go to IAM → Users → Your User**
3. **Security credentials tab**
4. **Create access key**
5. **Download the CSV file**

### Step 3: Domain Configuration

**Current Status:** Domain `suggestlyg4plus.io` is pointing to Vercel

**To switch to AWS:**
1. **Option A:** Update nameservers to AWS Route53
2. **Option B:** Update DNS records to point to AWS CloudFront

### Step 4: Deploy Infrastructure

```bash
# Navigate to project directory
cd suggestlyg4plus-aws/scripts

# Run the automated setup
./auto-domain-setup.sh
```

### Step 5: Verify Deployment

```bash
# Run domain monitoring
./ai-domain-monitor.sh once
```

## AWS Resources That Will Be Created

### Infrastructure Components
- ✅ **VPC** with public/private subnets
- ✅ **Route53 Hosted Zone** for DNS management
- ✅ **ACM Certificate** for SSL/TLS
- ✅ **CloudFront Distribution** for CDN
- ✅ **S3 Bucket** for static files
- ✅ **ECS Cluster** for container orchestration
- ✅ **Application Load Balancer** for traffic distribution
- ✅ **Security Groups** for network security

### Estimated Costs (Monthly)
- Route53: ~$0.50
- CloudFront: ~$1-5 (depending on traffic)
- S3: ~$0.50
- ECS: ~$10-20 (depending on usage)
- **Total: ~$12-26/month**

## Troubleshooting

### Common Issues

**1. AWS Credentials Error**
```bash
# Reconfigure AWS CLI
aws configure
```

**2. Permission Denied**
- Ensure IAM user has required permissions
- Check if user is in admin group

**3. Domain Not Resolving**
- Wait for DNS propagation (up to 48 hours)
- Check Route53 hosted zone configuration

**4. SSL Certificate Issues**
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

## Next Steps After Deployment

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

**Ready to proceed?** Run the setup script once AWS credentials are configured!
