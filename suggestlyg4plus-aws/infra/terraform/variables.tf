variable "project" {
  type = string
}

variable "region" {
  type    = string
  default = "eu-west-2" # London
}

variable "domain" {
  type    = string
  default = "" # optional (e.g. suggestlyg4plus.io)
}

variable "hosted_zone_id" {
  type    = string
  default = "" # optional Route53 zone
}

variable "frontend_bucket" {
  type    = string
  default = "" # leave empty to auto-name
}

variable "tf_state_bucket" {
  type = string # precreated state bucket
}

variable "tf_lock_table" {
  type = string # precreated DynamoDB lock table
}

variable "container_cpu" {
  type    = number
  default = 512
}

variable "container_mem" {
  type    = number
  default = 1024
}

variable "desired_count" {
  type    = number
  default = 1
}

variable "container_port" {
  type    = number
  default = 8080
}

# Additional variables for the application
variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "suggestlyg4plus"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnets" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnets" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "health_check_path" {
  description = "Health check path for the load balancer"
  type        = string
  default     = "/health"
}
