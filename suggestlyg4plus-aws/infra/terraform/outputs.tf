# CloudFront Distribution Outputs
output "cloudfront_domain" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.frontend.domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.frontend.id
}

output "cloudfront_distribution_arn" {
  description = "CloudFront distribution ARN"
  value       = aws_cloudfront_distribution.frontend.arn
}

# S3 Bucket Outputs
output "frontend_bucket_name" {
  description = "S3 bucket name for frontend"
  value       = aws_s3_bucket.frontend.bucket
}

output "frontend_bucket_arn" {
  description = "S3 bucket ARN for frontend"
  value       = aws_s3_bucket.frontend.arn
}

output "frontend_website_endpoint" {
  description = "S3 website endpoint"
  value       = aws_s3_bucket_website_configuration.frontend.website_endpoint
}

# Load Balancer Outputs
output "alb_domain" {
  description = "Application Load Balancer domain name"
  value       = aws_lb.main.dns_name
}

output "alb_arn" {
  description = "Application Load Balancer ARN"
  value       = aws_lb.main.arn
}

output "alb_zone_id" {
  description = "Application Load Balancer zone ID"
  value       = aws_lb.main.zone_id
}

# ECS Outputs
output "ecs_cluster_name" {
  description = "ECS cluster name"
  value       = aws_ecs_cluster.main.name
}

output "ecs_cluster_arn" {
  description = "ECS cluster ARN"
  value       = aws_ecs_cluster.main.arn
}

output "ecs_service_name" {
  description = "ECS service name"
  value       = aws_ecs_service.main.name
}

# VPC Outputs
output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "vpc_cidr" {
  description = "VPC CIDR block"
  value       = module.vpc.vpc_cidr_block
}

output "public_subnets" {
  description = "Public subnet IDs"
  value       = module.vpc.public_subnets
}

output "private_subnets" {
  description = "Private subnet IDs"
  value       = module.vpc.private_subnets
}

# ECR Outputs
output "ecr_repository_url" {
  description = "ECR repository URL"
  value       = aws_ecr_repository.app.repository_url
}

output "ecr_repository_arn" {
  description = "ECR repository ARN"
  value       = aws_ecr_repository.app.arn
}

# Domain Configuration Outputs
output "domain_name" {
  description = "Custom domain name"
  value       = var.domain != "" ? var.domain : null
}

output "www_domain_name" {
  description = "WWW subdomain name"
  value       = var.domain != "" ? "www.${var.domain}" : null
}

output "ssl_certificate_arn" {
  description = "SSL certificate ARN"
  value       = var.domain != "" ? aws_acm_certificate.main[0].arn : null
}

# Security Group Outputs
output "alb_security_group_id" {
  description = "ALB security group ID"
  value       = aws_security_group.alb.id
}

output "ecs_security_group_id" {
  description = "ECS security group ID"
  value       = aws_security_group.ecs.id
}

# IAM Role Outputs
output "ecs_execution_role_arn" {
  description = "ECS execution role ARN"
  value       = aws_iam_role.ecs_execution_role.arn
}

output "ecs_task_role_arn" {
  description = "ECS task role ARN"
  value       = aws_iam_role.ecs_task_role.arn
}

# CloudWatch Outputs
output "cloudwatch_log_group_name" {
  description = "CloudWatch log group name"
  value       = aws_cloudwatch_log_group.main.name
}

output "cloudwatch_log_group_arn" {
  description = "CloudWatch log group ARN"
  value       = aws_cloudwatch_log_group.main.arn
}

# Application URLs
output "frontend_url" {
  description = "Frontend application URL"
  value       = var.domain != "" ? "https://${var.domain}" : "https://${aws_cloudfront_distribution.frontend.domain_name}"
}

output "www_frontend_url" {
  description = "WWW frontend application URL"
  value       = var.domain != "" ? "https://www.${var.domain}" : null
}

output "backend_url" {
  description = "Backend API URL"
  value       = "http://${aws_lb.main.dns_name}"
}

# Infrastructure Summary
output "infrastructure_summary" {
  description = "Complete infrastructure summary"
  value = {
    project_name    = var.project
    environment     = var.environment
    region          = var.region
    domain          = var.domain != "" ? var.domain : "No custom domain"
    frontend_url    = var.domain != "" ? "https://${var.domain}" : "https://${aws_cloudfront_distribution.frontend.domain_name}"
    backend_url     = "http://${aws_lb.main.dns_name}"
    vpc_id          = module.vpc.vpc_id
    cluster_name    = aws_ecs_cluster.main.name
    service_name    = aws_ecs_service.main.name
    container_count = aws_ecs_service.main.desired_count
    ssl_enabled     = var.domain != "" ? "Yes" : "No"
    cdn_enabled     = "Yes"
    auto_scaling    = "Yes"
  }
}


