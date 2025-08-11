# SuggestlyG4Plus v2.0 - AWS Deployment

Complete AWS infrastructure deployment for SuggestlyG4Plus v2.0 using Terraform, ECS, and CloudFront.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CloudFront    │    │   S3 Bucket     │    │   Route53       │
│   (CDN)         │◄──►│   (Frontend)    │    │   (DNS)         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                                              │
         ▼                                              │
┌─────────────────┐    ┌─────────────────┐             │
│   ALB           │    │   ECS Cluster   │             │
│   (Load Bal)    │◄──►│   (Backend)     │             │
└─────────────────┘    └─────────────────┘             │
         │                                              │
         ▼                                              │
┌─────────────────┐                                    │
│   ECR           │                                    │
│   (Container)   │                                    │
└─────────────────┘                                    │
                                                       │
┌─────────────────┐    ┌─────────────────┐             │
│   VPC           │    │   CloudWatch    │             │
│   (Network)     │    │   (Logs)        │             │
└─────────────────┘    └─────────────────┘             │
                                                       │
┌─────────────────┐    ┌─────────────────┐             │
│   S3            │    │   DynamoDB      │             │
│   (State)       │    │   (Locks)       │             │
└─────────────────┘    └─────────────────┘             │
                                                       │
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │   ACM           │
                                              │   (SSL Cert)    │
                                              └─────────────────┘
```

## 🚀 Quick Start

### 1. Prerequisites

- AWS CLI configured with appropriate permissions
- Terraform >= 1.5.0
- Docker
- Node.js 20+
- Git

### 2. Setup Terraform Backend

Create the S3 bucket and DynamoDB table for Terraform state:

```bash
# Replace with your bucket name
aws s3api create-bucket \
  --bucket YOUR-TF-STATE-BUCKET \
  --region eu-west-2 \
  --create-bucket-configuration LocationConstraint=eu-west-2

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket YOUR-TF-STATE-BUCKET \
  --versioning-configuration Status=Enabled

# Create DynamoDB table for state locking
aws dynamodb create-table \
  --table-name YOUR-TF-LOCK-TABLE \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
```

### 3. Configure Variables

Copy and edit the terraform variables:

```bash
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` with your values:

```hcl
project         = "suggestlyg4plusv2"
region          = "eu-west-2"
tf_state_bucket = "YOUR-TF-STATE-BUCKET"
tf_lock_table   = "YOUR-TF-LOCK-TABLE"
# domain        = "suggestlyg4plus.io"  # Optional
# hosted_zone_id= "ZXXXXXXXXXXXX"       # Optional
```

### 4. Deploy

#### Option A: Local Deployment
```bash
./scripts/deploy.sh
```

#### Option B: Manual Steps
```bash
# 1. Build frontend
cd app/frontend
npm ci
npm run build

# 2. Deploy infrastructure
cd ../../infra/terraform
terraform init
terraform apply

# 3. Deploy application
cd ../../scripts
./deploy.sh
```

#### Option C: GitHub Actions
Push to the `main` branch to trigger automatic deployment.

## 🔧 Configuration

### Environment Variables

Set these environment variables for deployment:

```bash
export PROJECT=suggestlyg4plusv2
export AWS_REGION=eu-west-2
```

### GitHub Secrets

For GitHub Actions deployment, set these secrets:

- `AWS_ROLE_ARN`: IAM role ARN for GitHub Actions
- `AWS_REGION`: AWS region (e.g., eu-west-2)
- `TF_STATE_BUCKET`: S3 bucket name for Terraform state
- `TF_LOCK_TABLE`: DynamoDB table name for state locking

### Custom Domain Setup

1. Create a Route53 hosted zone for your domain
2. Update `terraform.tfvars`:
   ```hcl
   domain = "yourdomain.com"
   hosted_zone_id = "ZXXXXXXXXXXXX"
   ```
3. Deploy to create SSL certificate
4. Update your domain's nameservers to point to Route53

## 📁 Project Structure

```
suggestlyg4plus-aws/
├── app/
│   ├── frontend/           # React frontend
│   │   ├── Dockerfile      # Frontend container
│   │   └── build/          # Built files (created by npm run build)
│   └── backend/            # FastAPI backend
│       ├── Dockerfile      # Backend container
│       └── main.py         # FastAPI application
├── infra/
│   └── terraform/          # Infrastructure as Code
│       ├── provider.tf     # AWS provider configuration
│       ├── variables.tf    # Input variables
│       ├── main.tf         # Main infrastructure
│       ├── outputs.tf      # Output values
│       └── terraform.tfvars.example
├── scripts/
│   └── deploy.sh           # Deployment script
└── .github/
    └── workflows/
        └── aws-autodeploy.yml  # GitHub Actions workflow
```

## 🛠️ Infrastructure Components

### Compute
- **ECS Fargate**: Serverless container orchestration
- **ECR**: Container registry for Docker images
- **ALB**: Application Load Balancer for traffic distribution

### Storage & CDN
- **S3**: Static frontend hosting
- **CloudFront**: Global CDN for frontend and API caching
- **DynamoDB**: State locking for Terraform

### Networking
- **VPC**: Isolated network environment
- **Route53**: DNS management
- **ACM**: SSL certificate management

### Monitoring
- **CloudWatch**: Logs and metrics
- **ECS Service Discovery**: Service-to-service communication

## 🔒 Security

- VPC with public/private subnets
- Security groups with minimal required access
- HTTPS enforcement via CloudFront
- IAM roles with least privilege
- Container security scanning

## 📊 Monitoring

### CloudWatch Logs
- Application logs: `/ecs/suggestlyg4plusv2`
- Container logs with structured format

### Metrics
- ECS service metrics (CPU, Memory)
- ALB metrics (requests, latency)
- CloudFront metrics (cache hit ratio)

## 🚨 Troubleshooting

### Common Issues

1. **Terraform state locked**
   ```bash
   terraform force-unlock LOCK_ID
   ```

2. **ECS service not starting**
   ```bash
   aws ecs describe-services --cluster suggestlyg4plusv2-cluster --services suggestlyg4plusv2-svc
   ```

3. **Container health check failing**
   - Check application logs in CloudWatch
   - Verify health endpoint responds at `/health`

4. **CloudFront cache issues**
   - Invalidate cache: `aws cloudfront create-invalidation --distribution-id DIST_ID --paths "/*"`

### Debug Commands

```bash
# Check ECS service status
aws ecs describe-services --cluster suggestlyg4plusv2-cluster --services suggestlyg4plusv2-svc

# View application logs
aws logs tail /ecs/suggestlyg4plusv2 --follow

# Test ALB health
curl http://ALB_DNS/health

# Check CloudFront distribution
aws cloudfront get-distribution --id DIST_ID
```

## 💰 Cost Optimization

- Use Fargate Spot for non-production workloads
- Configure CloudFront caching appropriately
- Monitor and adjust container resources
- Use S3 lifecycle policies for old logs

## 🔄 Updates & Maintenance

### Application Updates
```bash
# Update backend
cd app/backend
docker build -t ECR_REPO:latest .
docker push ECR_REPO:latest

# Force ECS deployment
aws ecs update-service --cluster suggestlyg4plusv2-cluster --service suggestlyg4plusv2-svc --force-new-deployment
```

### Infrastructure Updates
```bash
cd infra/terraform
terraform plan
terraform apply
```

## 📞 Support

For issues or questions:
1. Check CloudWatch logs
2. Review ECS service events
3. Verify Terraform state
4. Check security group rules

---

**Version**: 2.0.0 | **Last Updated**: 2025-01-27



