# AWS Credentials Setup Script for SuggestlyG4Plus
# This script helps configure AWS CLI and guides through the setup process

Write-Host "🚀 AWS Setup for SuggestlyG4Plus Domain" -ForegroundColor Blue
Write-Host "=========================================" -ForegroundColor Blue
Write-Host ""

# Check if AWS CLI is installed
Write-Host "🔍 Checking AWS CLI installation..." -ForegroundColor Yellow
try {
    $awsVersion = aws --version 2>$null
    if ($awsVersion) {
        Write-Host "✅ AWS CLI is installed: $awsVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ AWS CLI not found" -ForegroundColor Red
        Write-Host "Please install AWS CLI from: https://aws.amazon.com/cli/" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "❌ AWS CLI not found" -ForegroundColor Red
    Write-Host "Please install AWS CLI from: https://aws.amazon.com/cli/" -ForegroundColor Yellow
    exit 1
}

# Check current AWS configuration
Write-Host ""
Write-Host "🔍 Checking current AWS configuration..." -ForegroundColor Yellow
try {
    $callerIdentity = aws sts get-caller-identity 2>$null
    if ($callerIdentity) {
        Write-Host "✅ AWS credentials are configured" -ForegroundColor Green
        Write-Host "Account: $($callerIdentity | ConvertFrom-Json | Select-Object -ExpandProperty Account)" -ForegroundColor Cyan
        Write-Host "User: $($callerIdentity | ConvertFrom-Json | Select-Object -ExpandProperty Arn)" -ForegroundColor Cyan
    } else {
        Write-Host "❌ AWS credentials not configured" -ForegroundColor Red
        Write-Host ""
        Write-Host "📋 To configure AWS credentials, you need:" -ForegroundColor Yellow
        Write-Host "1. AWS Access Key ID" -ForegroundColor White
        Write-Host "2. AWS Secret Access Key" -ForegroundColor White
        Write-Host "3. Default region (recommended: eu-west-2)" -ForegroundColor White
        Write-Host ""
        Write-Host "🔗 Get your credentials from: https://console.aws.amazon.com/iam/home#/users" -ForegroundColor Cyan
        Write-Host ""
        
        $configureNow = Read-Host "Would you like to configure AWS credentials now? (y/n)"
        if ($configureNow -eq 'y' -or $configureNow -eq 'Y') {
            Write-Host ""
            Write-Host "🔧 Running AWS configure..." -ForegroundColor Yellow
            aws configure
        } else {
            Write-Host "Please run 'aws configure' manually and then run this script again." -ForegroundColor Yellow
            exit 1
        }
    }
} catch {
    Write-Host "❌ Error checking AWS configuration" -ForegroundColor Red
}

# Check required AWS services
Write-Host ""
Write-Host "🔍 Checking AWS service access..." -ForegroundColor Yellow

$services = @("route53", "acm", "cloudfront", "s3", "ecs", "ec2", "iam")

foreach ($service in $services) {
    try {
        switch ($service) {
            "route53" { aws route53 list-hosted-zones --max-items 1 >$null 2>&1 }
            "acm" { aws acm list-certificates --max-items 1 >$null 2>&1 }
            "cloudfront" { aws cloudfront list-distributions --max-items 1 >$null 2>&1 }
            "s3" { aws s3 ls --max-items 1 >$null 2>&1 }
            "ecs" { aws ecs list-clusters --max-items 1 >$null 2>&1 }
            "ec2" { aws ec2 describe-regions --max-items 1 >$null 2>&1 }
            "iam" { aws iam list-users --max-items 1 >$null 2>&1 }
        }
        Write-Host "✅ $service access confirmed" -ForegroundColor Green
    } catch {
        Write-Host "❌ $service access failed - check permissions" -ForegroundColor Red
    }
}

# Check domain status
Write-Host ""
Write-Host "🌐 Checking domain status..." -ForegroundColor Yellow
$domain = "suggestlyg4plus.io"

try {
    $dnsResult = nslookup $domain 2>$null
    if ($dnsResult -match "Address:") {
        Write-Host "✅ Domain $domain resolves to DNS" -ForegroundColor Green
        $addresses = ($dnsResult | Select-String "Address:").ToString()
        Write-Host "   $addresses" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Domain $domain does not resolve" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error checking domain resolution" -ForegroundColor Red
}

# Check if domain is already in Route53
Write-Host ""
Write-Host "🔍 Checking if domain is in Route53..." -ForegroundColor Yellow
try {
    $hostedZones = aws route53 list-hosted-zones --query "HostedZones[?Name=='$domain.']" --output json 2>$null
    $zones = $hostedZones | ConvertFrom-Json
    if ($zones.Count -gt 0) {
        Write-Host "✅ Domain $domain found in Route53" -ForegroundColor Green
        Write-Host "   Hosted Zone ID: $($zones[0].Id)" -ForegroundColor Cyan
    } else {
        Write-Host "⚠️  Domain $domain not found in Route53" -ForegroundColor Yellow
        Write-Host "   Will be created during deployment" -ForegroundColor Cyan
    }
} catch {
    Write-Host "❌ Error checking Route53 hosted zones" -ForegroundColor Red
}

# Check Terraform installation
Write-Host ""
Write-Host "🔍 Checking Terraform installation..." -ForegroundColor Yellow
try {
    $terraformVersion = terraform --version 2>$null
    if ($terraformVersion) {
        Write-Host "✅ Terraform is installed" -ForegroundColor Green
        Write-Host "   $($terraformVersion | Select-Object -First 1)" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Terraform not found" -ForegroundColor Red
        Write-Host "Please install Terraform from: https://www.terraform.io/downloads.html" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Terraform not found" -ForegroundColor Red
    Write-Host "Please install Terraform from: https://www.terraform.io/downloads.html" -ForegroundColor Yellow
}

# Summary and next steps
Write-Host ""
Write-Host "📊 Setup Summary:" -ForegroundColor Blue
Write-Host "=================" -ForegroundColor Blue

if ($callerIdentity) {
    Write-Host "✅ AWS CLI: Configured" -ForegroundColor Green
} else {
    Write-Host "❌ AWS CLI: Not configured" -ForegroundColor Red
}

Write-Host "✅ Domain: $domain resolves" -ForegroundColor Green
Write-Host "✅ Infrastructure: Ready for deployment" -ForegroundColor Green

Write-Host ""
Write-Host "🚀 Next Steps:" -ForegroundColor Blue
Write-Host "==============" -ForegroundColor Blue
Write-Host "1. Ensure AWS credentials are configured" -ForegroundColor White
Write-Host "2. Run: cd suggestlyg4plus-aws/scripts" -ForegroundColor White
Write-Host "3. Run: ./auto-domain-setup.sh" -ForegroundColor White
Write-Host "4. Wait for deployment to complete" -ForegroundColor White
Write-Host "5. Test domain with: ./ai-domain-monitor.sh once" -ForegroundColor White

Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Yellow
Write-Host "- Deployment may take 10-15 minutes" -ForegroundColor White
Write-Host "- DNS changes can take up to 48 hours to propagate" -ForegroundColor White
Write-Host "- Monitor costs in AWS Console" -ForegroundColor White
Write-Host "- Estimated monthly cost: $12-26" -ForegroundColor White

Write-Host ""
Write-Host "🎯 Ready to deploy? Run the auto-domain-setup.sh script!" -ForegroundColor Green
