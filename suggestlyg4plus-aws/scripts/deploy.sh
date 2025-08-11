#!/usr/bin/env bash
set -euo pipefail

PROJECT=${PROJECT:-suggestlyg4plusv2}
AWS_REGION=${AWS_REGION:-eu-west-2}

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# 1) Build frontend
echo "==> Building frontend"
pushd "$ROOT_DIR/app/frontend" >/dev/null
npm ci || npm install
npm run build
popd >/dev/null

# 2) Terraform apply
echo "==> Provisioning AWS via Terraform"
pushd "$ROOT_DIR/infra/terraform" >/dev/null
terraform init -upgrade
terraform apply -auto-approve
ECR_REPO=$(terraform output -raw ecr_repo)
FRONTEND_BUCKET=$(terraform output -raw frontend_bucket)
CLOUDFRONT_DOMAIN=$(terraform output -raw cloudfront_domain)
ALB_DNS=$(terraform output -raw alb_dns)
popd >/dev/null

# 3) Sync frontend to S3
echo "==> Syncing frontend build to S3"
aws s3 sync "$ROOT_DIR/app/frontend/build" "s3://$FRONTEND_BUCKET" --delete

# 4) Build + push backend image
echo "==> Building and pushing backend image to ECR"
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

pushd "$ROOT_DIR/app/backend" >/dev/null
docker build -t "${ECR_REPO}:latest" .
docker push "${ECR_REPO}:latest"
popd >/dev/null

# 5) Force new deployment (ECS picks latest)
echo "==> Forcing ECS deployment"
CLUSTER="${PROJECT}-cluster"
SERVICE="${PROJECT}-svc"
aws ecs update-service --cluster "$CLUSTER" --service "$SERVICE" --force-new-deployment >/dev/null

echo ""
echo "✅ DONE"
echo "API (ALB):        http://${ALB_DNS}"
echo "Frontend (CDN):   https://${CLOUDFRONT_DOMAIN}"



