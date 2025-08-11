#!/bin/bash

# AI-Powered Domain Monitoring Script
# Continuously monitors domain health, performance, and security

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="suggestlyg4plus.io"
REGION="eu-west-2"
PROJECT="suggestlyg4plusv2"
LOG_FILE="/tmp/domain-monitor.log"
ALERT_EMAIL="admin@suggestlyg4plus.io"

# Function to log messages
log_message() {
    local level=$1
    local message=$2
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "[${timestamp}] [${level}] ${message}" | tee -a ${LOG_FILE}
}

# Function to check domain availability
check_domain_availability() {
    log_message "INFO" "🔍 Checking domain availability for ${DOMAIN}..."
    
    # Check root domain
    local root_status=$(curl -s -o /dev/null -w "%{http_code}" https://${DOMAIN} --max-time 10)
    if [[ $root_status -eq 200 || $root_status -eq 301 || $root_status -eq 302 ]]; then
        log_message "SUCCESS" "✅ Root domain (${DOMAIN}) is accessible (HTTP ${root_status})"
    else
        log_message "ERROR" "❌ Root domain (${DOMAIN}) is not accessible (HTTP ${root_status})"
        return 1
    fi
    
    # Check www subdomain
    local www_status=$(curl -s -o /dev/null -w "%{http_code}" https://www.${DOMAIN} --max-time 10)
    if [[ $www_status -eq 200 || $www_status -eq 301 || $www_status -eq 302 ]]; then
        log_message "SUCCESS" "✅ WWW subdomain (www.${DOMAIN}) is accessible (HTTP ${www_status})"
    else
        log_message "ERROR" "❌ WWW subdomain (www.${DOMAIN}) is not accessible (HTTP ${www_status})"
        return 1
    fi
}

# Function to check SSL certificate
check_ssl_certificate() {
    log_message "INFO" "🔒 Checking SSL certificate for ${DOMAIN}..."
    
    # Check certificate expiration
    local cert_expiry=$(echo | openssl s_client -servername ${DOMAIN} -connect ${DOMAIN}:443 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d= -f2)
    local expiry_date=$(date -d "$cert_expiry" +%s)
    local current_date=$(date +%s)
    local days_until_expiry=$(( (expiry_date - current_date) / 86400 ))
    
    if [[ $days_until_expiry -gt 30 ]]; then
        log_message "SUCCESS" "✅ SSL certificate is valid for ${days_until_expiry} more days"
    elif [[ $days_until_expiry -gt 7 ]]; then
        log_message "WARNING" "⚠️  SSL certificate expires in ${days_until_expiry} days"
    else
        log_message "ERROR" "❌ SSL certificate expires in ${days_until_expiry} days - URGENT!"
        return 1
    fi
    
    # Check certificate chain
    local chain_check=$(echo | openssl s_client -servername ${DOMAIN} -connect ${DOMAIN}:443 2>/dev/null | openssl x509 -noout -text | grep -c "Verify return code: 0")
    if [[ $chain_check -gt 0 ]]; then
        log_message "SUCCESS" "✅ SSL certificate chain is valid"
    else
        log_message "ERROR" "❌ SSL certificate chain validation failed"
        return 1
    fi
}

# Function to check DNS propagation
check_dns_propagation() {
    log_message "INFO" "🌐 Checking DNS propagation for ${DOMAIN}..."
    
    # List of public DNS servers to check
    local dns_servers=("8.8.8.8" "1.1.1.1" "208.67.222.222" "9.9.9.9")
    local all_resolved=true
    
    for dns_server in "${dns_servers[@]}"; do
        local resolved_ip=$(dig +short ${DOMAIN} @${dns_server} | head -1)
        if [[ -n "$resolved_ip" ]]; then
            log_message "SUCCESS" "✅ DNS resolved via ${dns_server}: ${resolved_ip}"
        else
            log_message "ERROR" "❌ DNS resolution failed via ${dns_server}"
            all_resolved=false
        fi
    done
    
    if [[ "$all_resolved" == false ]]; then
        return 1
    fi
}

# Function to check CloudFront distribution
check_cloudfront_distribution() {
    log_message "INFO" "☁️  Checking CloudFront distribution..."
    
    # Get CloudFront distribution status
    local distribution_status=$(aws cloudfront list-distributions \
        --query "DistributionList.Items[?Aliases.Items[?contains(@, '${DOMAIN}')]].Status" \
        --output text 2>/dev/null)
    
    if [[ "$distribution_status" == "Deployed" ]]; then
        log_message "SUCCESS" "✅ CloudFront distribution is deployed"
    else
        log_message "ERROR" "❌ CloudFront distribution status: ${distribution_status}"
        return 1
    fi
    
    # Check CloudFront metrics
    local distribution_id=$(aws cloudfront list-distributions \
        --query "DistributionList.Items[?Aliases.Items[?contains(@, '${DOMAIN}')]].Id" \
        --output text 2>/dev/null)
    
    if [[ -n "$distribution_id" ]]; then
        log_message "SUCCESS" "✅ CloudFront distribution ID: ${distribution_id}"
    fi
}

# Function to check ECS service health
check_ecs_service_health() {
    log_message "INFO" "🐳 Checking ECS service health..."
    
    # Get ECS service status
    local service_status=$(aws ecs describe-services \
        --cluster ${PROJECT}-cluster \
        --services ${PROJECT}-service \
        --query 'services[0].status' \
        --output text 2>/dev/null)
    
    if [[ "$service_status" == "ACTIVE" ]]; then
        log_message "SUCCESS" "✅ ECS service is active"
        
        # Check running tasks
        local running_tasks=$(aws ecs describe-services \
            --cluster ${PROJECT}-cluster \
            --services ${PROJECT}-service \
            --query 'services[0].runningCount' \
            --output text 2>/dev/null)
        
        local desired_tasks=$(aws ecs describe-services \
            --cluster ${PROJECT}-cluster \
            --services ${PROJECT}-service \
            --query 'services[0].desiredCount' \
            --output text 2>/dev/null)
        
        if [[ $running_tasks -eq $desired_tasks ]]; then
            log_message "SUCCESS" "✅ ECS tasks: ${running_tasks}/${desired_tasks} running"
        else
            log_message "WARNING" "⚠️  ECS tasks: ${running_tasks}/${desired_tasks} running"
        fi
    else
        log_message "ERROR" "❌ ECS service status: ${service_status}"
        return 1
    fi
}

# Function to check load balancer health
check_load_balancer_health() {
    log_message "INFO" "⚖️  Checking load balancer health..."
    
    # Get ALB status
    local alb_status=$(aws elbv2 describe-load-balancers \
        --names ${PROJECT}-alb \
        --query 'LoadBalancers[0].State.Code' \
        --output text 2>/dev/null)
    
    if [[ "$alb_status" == "active" ]]; then
        log_message "SUCCESS" "✅ Load balancer is active"
        
        # Check target group health
        local target_group_arn=$(aws elbv2 describe-load-balancers \
            --names ${PROJECT}-alb \
            --query 'LoadBalancers[0].LoadBalancerArn' \
            --output text 2>/dev/null)
        
        local target_groups=$(aws elbv2 describe-target-groups \
            --load-balancer-arn ${target_group_arn} \
            --query 'TargetGroups[0].TargetGroupArn' \
            --output text 2>/dev/null)
        
        local healthy_targets=$(aws elbv2 describe-target-health \
            --target-group-arn ${target_groups} \
            --query 'TargetHealthDescriptions[?TargetHealth.State==`healthy`] | length(@)' \
            --output text 2>/dev/null)
        
        if [[ $healthy_targets -gt 0 ]]; then
            log_message "SUCCESS" "✅ Load balancer has ${healthy_targets} healthy targets"
        else
            log_message "ERROR" "❌ Load balancer has no healthy targets"
            return 1
        fi
    else
        log_message "ERROR" "❌ Load balancer status: ${alb_status}"
        return 1
    fi
}

# Function to check application performance
check_application_performance() {
    log_message "INFO" "⚡ Checking application performance..."
    
    # Measure response time
    local start_time=$(date +%s%N)
    local response=$(curl -s -o /dev/null -w "%{http_code}" https://${DOMAIN} --max-time 10)
    local end_time=$(date +%s%N)
    local response_time=$(( (end_time - start_time) / 1000000 )) # Convert to milliseconds
    
    if [[ $response -eq 200 ]]; then
        if [[ $response_time -lt 1000 ]]; then
            log_message "SUCCESS" "✅ Application response time: ${response_time}ms (Excellent)"
        elif [[ $response_time -lt 3000 ]]; then
            log_message "SUCCESS" "✅ Application response time: ${response_time}ms (Good)"
        else
            log_message "WARNING" "⚠️  Application response time: ${response_time}ms (Slow)"
        fi
    else
        log_message "ERROR" "❌ Application returned HTTP ${response} in ${response_time}ms"
        return 1
    fi
}

# Function to check security headers
check_security_headers() {
    log_message "INFO" "🔐 Checking security headers..."
    
    local headers=$(curl -s -I https://${DOMAIN} --max-time 10)
    local security_score=0
    
    # Check for HTTPS
    if echo "$headers" | grep -q "HTTP/.*200\|HTTP/.*301\|HTTP/.*302"; then
        ((security_score++))
        log_message "SUCCESS" "✅ HTTPS is enabled"
    else
        log_message "ERROR" "❌ HTTPS is not properly configured"
    fi
    
    # Check for HSTS
    if echo "$headers" | grep -qi "Strict-Transport-Security"; then
        ((security_score++))
        log_message "SUCCESS" "✅ HSTS header is present"
    else
        log_message "WARNING" "⚠️  HSTS header is missing"
    fi
    
    # Check for Content Security Policy
    if echo "$headers" | grep -qi "Content-Security-Policy"; then
        ((security_score++))
        log_message "SUCCESS" "✅ CSP header is present"
    else
        log_message "WARNING" "⚠️  CSP header is missing"
    fi
    
    # Check for X-Frame-Options
    if echo "$headers" | grep -qi "X-Frame-Options"; then
        ((security_score++))
        log_message "SUCCESS" "✅ X-Frame-Options header is present"
    else
        log_message "WARNING" "⚠️  X-Frame-Options header is missing"
    fi
    
    log_message "INFO" "🔐 Security score: ${security_score}/4"
}

# Function to generate AI insights
generate_ai_insights() {
    log_message "INFO" "🤖 Generating AI insights..."
    
    # Analyze log patterns
    local error_count=$(grep -c "ERROR" ${LOG_FILE} 2>/dev/null || echo "0")
    local warning_count=$(grep -c "WARNING" ${LOG_FILE} 2>/dev/null || echo "0")
    local success_count=$(grep -c "SUCCESS" ${LOG_FILE} 2>/dev/null || echo "0")
    
    # Calculate health score
    local total_checks=$((error_count + warning_count + success_count))
    local health_score=0
    
    if [[ $total_checks -gt 0 ]]; then
        health_score=$(( (success_count * 100) / total_checks ))
    fi
    
    # Generate insights based on patterns
    if [[ $health_score -ge 90 ]]; then
        log_message "SUCCESS" "🎯 AI Insight: Excellent domain health (${health_score}%)"
    elif [[ $health_score -ge 75 ]]; then
        log_message "SUCCESS" "🎯 AI Insight: Good domain health (${health_score}%)"
    elif [[ $health_score -ge 50 ]]; then
        log_message "WARNING" "🎯 AI Insight: Domain health needs attention (${health_score}%)"
    else
        log_message "ERROR" "🎯 AI Insight: Critical domain health issues (${health_score}%)"
    fi
    
    # Performance recommendations
    if [[ $error_count -gt 0 ]]; then
        log_message "INFO" "💡 AI Recommendation: Address ${error_count} error(s) to improve reliability"
    fi
    
    if [[ $warning_count -gt 0 ]]; then
        log_message "INFO" "💡 AI Recommendation: Review ${warning_count} warning(s) for optimization"
    fi
}

# Function to send alerts
send_alert() {
    local alert_type=$1
    local message=$2
    
    log_message "ALERT" "🚨 ${alert_type}: ${message}"
    
    # Send email alert (if configured)
    if [[ -n "$ALERT_EMAIL" ]]; then
        echo "Subject: Domain Alert - ${alert_type}" | mail -s "Domain Alert" ${ALERT_EMAIL} 2>/dev/null || true
    fi
}

# Main monitoring function
main_monitoring() {
    log_message "INFO" "🚀 Starting AI-powered domain monitoring..."
    
    local overall_status=0
    
    # Run all checks
    check_domain_availability || overall_status=1
    check_ssl_certificate || overall_status=1
    check_dns_propagation || overall_status=1
    check_cloudfront_distribution || overall_status=1
    check_ecs_service_health || overall_status=1
    check_load_balancer_health || overall_status=1
    check_application_performance || overall_status=1
    check_security_headers
    
    # Generate AI insights
    generate_ai_insights
    
    # Final status
    if [[ $overall_status -eq 0 ]]; then
        log_message "SUCCESS" "🎉 All domain checks passed successfully!"
    else
        log_message "ERROR" "❌ Some domain checks failed - review logs for details"
        send_alert "Domain Health" "Some domain checks failed - immediate attention required"
    fi
    
    return $overall_status
}

# Continuous monitoring mode
continuous_monitoring() {
    log_message "INFO" "🔄 Starting continuous monitoring (checking every 5 minutes)..."
    
    while true; do
        main_monitoring
        sleep 300  # Wait 5 minutes
    done
}

# Parse command line arguments
case "${1:-}" in
    "continuous"|"loop")
        continuous_monitoring
        ;;
    "once"|"")
        main_monitoring
        ;;
    *)
        echo "Usage: $0 [continuous|once]"
        echo "  continuous: Run monitoring continuously (every 5 minutes)"
        echo "  once: Run monitoring once (default)"
        exit 1
        ;;
esac

