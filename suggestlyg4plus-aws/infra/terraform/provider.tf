terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket = var.tf_state_bucket
    key    = "${var.project}/terraform.tfstate"
    region = var.region
    encrypt = true
    dynamodb_table = var.tf_lock_table
  }
}

provider "aws" {
  region = var.region
}

# Provider for ACM certificates (must be in us-east-1)
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
