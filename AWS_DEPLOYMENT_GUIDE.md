# 🚀 AWS DEPLOYMENT GUIDE
## SuggestlyG4Plus v2.0 - Complete AWS Infrastructure

---

## 📋 **PREREQUISITES**

### **Required Tools:**
- ✅ Python 3.8+
- ✅ AWS CLI
- ✅ Terraform (optional)
- ✅ Git

### **AWS Account Setup:**
1. **Create AWS Account** at https://aws.amazon.com
2. **Create IAM User** with admin permissions
3. **Generate Access Keys** for programmatic access
4. **Configure AWS CLI** with your credentials

---

## 🚀 **QUICK DEPLOYMENT (5 MINUTES)**

### **Option 1: Automated Deployment**
```bash
# Run the automated deployment script
python deploy_to_aws.py
```

### **Option 2: Manual Deployment**
```bash
# 1. Install AWS CLI
pip install awscli boto3

# 2. Configure AWS credentials
aws configure

# 3. Run Python deployment
python aws_deployment_system.py

# 4. Run Terraform deployment (optional)
cd terraform
terraform init
terraform apply
```

---

## 🏗️ **INFRASTRUCTURE COMPONENTS**

### **Compute Services:**
- **EC2** - Virtual servers for web applications
- **Lambda** - Serverless functions for APIs
- **ECS** - Container orchestration
- **App Runner** - Fully managed application hosting

### **Storage Services:**
- **S3** - Object storage for files and assets
- **RDS** - Managed relational database
- **DynamoDB** - NoSQL database (optional)

### **Networking:**
- **VPC** - Virtual private cloud
- **Security Groups** - Firewall rules
- **CloudFront** - Content delivery network
- **API Gateway** - API management (optional)

### **Monitoring:**
- **CloudWatch** - Logs and metrics
- **CloudTrail** - API activity logging

---

## 🔧 **DETAILED SETUP INSTRUCTIONS**

### **Step 1: AWS CLI Installation**
```bash
# Windows
curl "https://awscli.amazonaws.com/awscli-exe-windows-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# macOS
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### **Step 2: AWS Credentials Configuration**
```bash
aws configure
# Enter your:
# - AWS Access Key ID
# - AWS Secret Access Key
# - Default region (us-east-1)
# - Default output format (json)
```

### **Step 3: Python Dependencies**
```bash
pip install boto3 botocore awscli
```

---

## 🎯 **DEPLOYMENT OPTIONS**

### **Option A: Complete Infrastructure (Recommended)**
```bash
python deploy_to_aws.py
```
**Deploys to:**
- ✅ EC2 Instances
- ✅ Lambda Functions
- ✅ ECS Clusters
- ✅ RDS Database
- ✅ S3 Buckets
- ✅ CloudFront CDN
- ✅ VPC & Security Groups

### **Option B: Serverless Only**
```bash
python aws_deployment_system.py --serverless
```
**Deploys to:**
- ✅ Lambda Functions
- ✅ API Gateway
- ✅ S3 Buckets
- ✅ CloudFront CDN

### **Option C: Container Only**
```bash
python aws_deployment_system.py --containers
```
**Deploys to:**
- ✅ ECS Clusters
- ✅ App Runner
- ✅ RDS Database
- ✅ Load Balancers

---

## 📊 **COST ESTIMATION**

### **Free Tier (12 months):**
- **EC2**: 750 hours/month (t3.micro)
- **Lambda**: 1M requests/month
- **S3**: 5GB storage
- **RDS**: 750 hours/month (db.t3.micro)
- **CloudFront**: 1TB data transfer

### **Production Costs (estimated):**
- **EC2**: $8-15/month
- **Lambda**: $1-5/month
- **RDS**: $15-25/month
- **S3**: $0.50-2/month
- **CloudFront**: $1-5/month
- **Total**: ~$25-50/month

---

## 🔐 **SECURITY CONFIGURATION**

### **IAM Roles & Policies:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:*",
        "lambda:*",
        "s3:*",
        "rds:*",
        "cloudfront:*"
      ],
      "Resource": "*"
    }
  ]
}
```

### **Security Groups:**
- **Web Servers**: Ports 80, 443, 22
- **Database**: Port 5432 (PostgreSQL)
- **Application**: Port 8000 (FastAPI)

### **VPC Configuration:**
- **Public Subnets**: For web servers
- **Private Subnets**: For databases
- **NAT Gateway**: For private subnet internet access

---

## 📈 **SCALING CONFIGURATION**

### **Auto Scaling Groups:**
```bash
# EC2 Auto Scaling
aws autoscaling create-auto-scaling-group \
  --auto-scaling-group-name SuggestlyG4Plus-ASG \
  --min-size 1 \
  --max-size 10 \
  --desired-capacity 2
```

### **Load Balancers:**
```bash
# Application Load Balancer
aws elbv2 create-load-balancer \
  --name SuggestlyG4Plus-ALB \
  --subnets subnet-12345678 subnet-87654321
```

### **Database Scaling:**
- **Read Replicas**: For read-heavy workloads
- **Multi-AZ**: For high availability
- **Storage Auto Scaling**: Automatic storage increase

---

## 🔍 **MONITORING & LOGGING**

### **CloudWatch Metrics:**
- **CPU Utilization**: Target < 70%
- **Memory Usage**: Target < 80%
- **Disk I/O**: Monitor for bottlenecks
- **Network**: Track bandwidth usage

### **CloudWatch Alarms:**
```bash
# Create CPU alarm
aws cloudwatch put-metric-alarm \
  --alarm-name HighCPU \
  --metric-name CPUUtilization \
  --threshold 70 \
  --comparison-operator GreaterThanThreshold
```

### **Log Management:**
- **Application Logs**: CloudWatch Logs
- **Access Logs**: S3 + CloudFront
- **Database Logs**: RDS logs to CloudWatch

---

## 🚨 **TROUBLESHOOTING**

### **Common Issues:**

#### **1. AWS Credentials Error**
```bash
# Solution: Reconfigure credentials
aws configure
```

#### **2. VPC Creation Failed**
```bash
# Solution: Check region limits
aws ec2 describe-vpcs --region us-east-1
```

#### **3. Security Group Rules**
```bash
# Solution: Verify security group rules
aws ec2 describe-security-groups --group-ids sg-12345678
```

#### **4. Database Connection Issues**
```bash
# Solution: Check security group and subnet
aws rds describe-db-instances --db-instance-identifier suggestly-g4plus-db
```

---

## 📋 **POST-DEPLOYMENT CHECKLIST**

### **✅ Infrastructure:**
- [ ] VPC and subnets created
- [ ] Security groups configured
- [ ] EC2 instances running
- [ ] RDS database accessible
- [ ] S3 buckets created
- [ ] CloudFront distribution active

### **✅ Application:**
- [ ] Application deployed successfully
- [ ] Health checks passing
- [ ] SSL certificates configured
- [ ] Domain names pointing correctly
- [ ] Monitoring alerts set up

### **✅ Security:**
- [ ] IAM roles properly configured
- [ ] Security groups locked down
- [ ] Database encryption enabled
- [ ] Access logs enabled
- [ ] Backup strategy implemented

---

## 🌐 **ACCESSING YOUR APPLICATION**

### **URLs:**
- **EC2 Instance**: `http://[EC2-PUBLIC-IP]`
- **CloudFront**: `https://[CLOUDFRONT-DOMAIN]`
- **S3 Bucket**: `https://[BUCKET-NAME].s3.amazonaws.com`
- **RDS Endpoint**: `[DB-ENDPOINT]:5432`

### **SSH Access:**
```bash
ssh -i suggestly-key.pem ec2-user@[EC2-PUBLIC-IP]
```

### **Database Access:**
```bash
psql -h [RDS-ENDPOINT] -U admin -d suggestly_db
```

---

## 🔄 **UPDATES & MAINTENANCE**

### **Application Updates:**
```bash
# Deploy new version
python deploy_to_aws.py --update

# Rollback if needed
python deploy_to_aws.py --rollback
```

### **Infrastructure Updates:**
```bash
# Update Terraform
cd terraform
terraform plan
terraform apply
```

### **Monitoring:**
- **Daily**: Check CloudWatch metrics
- **Weekly**: Review security groups
- **Monthly**: Update SSL certificates
- **Quarterly**: Review IAM permissions

---

## 📞 **SUPPORT**

### **AWS Support:**
- **Basic**: Community forums
- **Developer**: $29/month
- **Business**: $100/month
- **Enterprise**: Custom pricing

### **Documentation:**
- **AWS Documentation**: https://docs.aws.amazon.com
- **Terraform Docs**: https://www.terraform.io/docs
- **Boto3 Docs**: https://boto3.amazonaws.com

---

## 🎯 **NEXT STEPS**

1. **Configure Domain**: Point your domain to CloudFront
2. **SSL Certificate**: Request SSL certificate from AWS Certificate Manager
3. **Monitoring**: Set up detailed monitoring and alerting
4. **Backup**: Implement automated backup strategies
5. **Scaling**: Configure auto-scaling based on traffic patterns

---

**Your SuggestlyG4Plus v2.0 is now ready for production on AWS!** 🚀
