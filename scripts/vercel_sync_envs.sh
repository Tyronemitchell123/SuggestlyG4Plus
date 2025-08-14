#!/bin/bash

# Vercel Environment Variables Sync Script
# This script syncs GitHub Secrets to Vercel environment variables
# Usage: ./vercel_sync_envs.sh [environment] [project_id]

set -e  # Exit on any error

# Configuration
ENVIRONMENT="${1:-production}"
PROJECT_ID="${2:-$VERCEL_PROJECT_ID}"
DRY_RUN="${DRY_RUN:-false}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Environment variables to sync (if present in GitHub secrets)
ENV_VARS=(
    "STRIPE_SECRET_KEY"
    "STRIPE_WEBHOOK_SECRET"
    "ALPHA_VANTAGE_API_KEY"
    "FINNHUB_API_KEY"
    "POLYGON_API_KEY"
    "COINGECKO_API_KEY"
    "TWILIO_API_KEY"
    "SENDGRID_API_KEY"
    "HUBSPOT_PRIVATE_APP_TOKEN"
    "HUBSPOT_API_KEY"
    "CALENDLY_SCHEDULING_LINK"
    "BUSINESS_SUCCESS_URL"
    "BUSINESS_CANCEL_URL"
    "OPENAI_API_KEY"
)

# Validate required tools and credentials
validate_requirements() {
    log_info "Validating requirements..."
    
    # Check if Vercel CLI is available
    if ! command -v vercel &> /dev/null; then
        log_error "Vercel CLI not found. Please install it: npm i -g @vercel/cli"
        exit 1
    fi
    
    # Check required environment variables
    if [[ -z "$VERCEL_TOKEN" ]]; then
        log_error "VERCEL_TOKEN is required but not set"
        exit 1
    fi
    
    if [[ -z "$VERCEL_ORG_ID" ]]; then
        log_error "VERCEL_ORG_ID is required but not set"
        exit 1
    fi
    
    if [[ -z "$PROJECT_ID" ]]; then
        log_error "VERCEL_PROJECT_ID is required but not set"
        exit 1
    fi
    
    log_success "All requirements validated"
}

# Setup Vercel CLI with token
setup_vercel() {
    log_info "Setting up Vercel CLI..."
    
    # Link to the project using the token
    if [[ "$DRY_RUN" == "true" ]]; then
        log_info "DRY RUN: Would set up Vercel CLI with token"
        return 0
    fi
    
    # Verify authentication works
    if ! vercel whoami --token "$VERCEL_TOKEN" &> /dev/null; then
        log_error "Failed to authenticate with Vercel using provided token"
        exit 1
    fi
    
    log_success "Vercel CLI setup complete"
}

# Check if environment variable exists in Vercel
env_exists() {
    local var_name="$1"
    local env_type="$2"
    
    if [[ "$DRY_RUN" == "true" ]]; then
        return 1  # Assume doesn't exist in dry run
    fi
    
    # Use vercel env ls to check if variable exists
    if vercel env ls --token "$VERCEL_TOKEN" | grep -q "^$var_name[[:space:]]"; then
        return 0  # exists
    else
        return 1  # doesn't exist
    fi
}

# Remove environment variable if it exists
remove_env_var() {
    local var_name="$1"
    local env_type="$2"
    
    log_info "Removing existing $var_name from $env_type..."
    
    if [[ "$DRY_RUN" == "true" ]]; then
        log_info "DRY RUN: Would remove $var_name from $env_type"
        return 0
    fi
    
    if vercel env rm "$var_name" "$env_type" --yes --token "$VERCEL_TOKEN" 2>/dev/null; then
        log_success "Removed existing $var_name"
    else
        log_warning "Could not remove $var_name (might not exist)"
    fi
}

# Add environment variable to Vercel
add_env_var() {
    local var_name="$1"
    local var_value="$2"
    local env_type="$3"
    
    if [[ "$DRY_RUN" == "true" ]]; then
        log_info "DRY RUN: Would add $var_name to $env_type"
        return 0
    fi
    
    # Use echo to pipe the value to avoid shell expansion issues
    if echo "$var_value" | vercel env add "$var_name" "$env_type" --token "$VERCEL_TOKEN" &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# Sync a single environment variable
sync_env_var() {
    local var_name="$1"
    local var_value="${!var_name}"  # Get value from environment
    
    # Skip if environment variable is not set or empty
    if [[ -z "$var_value" ]]; then
        log_warning "Skipping $var_name (not set or empty)"
        return 0
    fi
    
    log_info "Syncing $var_name to $ENVIRONMENT..."
    
    # For idempotence, remove existing variable first, then add
    # This ensures we can update existing values
    if env_exists "$var_name" "$ENVIRONMENT"; then
        remove_env_var "$var_name" "$ENVIRONMENT"
    fi
    
    # Add the new value
    if add_env_var "$var_name" "$var_value" "$ENVIRONMENT"; then
        log_success "✅ Synced $var_name"
    else
        log_error "❌ Failed to sync $var_name"
        return 1
    fi
}

# Main sync function
sync_all_vars() {
    log_info "Starting environment variable sync to $ENVIRONMENT..."
    
    local success_count=0
    local skip_count=0
    local error_count=0
    
    for var_name in "${ENV_VARS[@]}"; do
        if sync_env_var "$var_name"; then
            if [[ -n "${!var_name}" ]]; then
                ((success_count++))
            else
                ((skip_count++))
            fi
        else
            ((error_count++))
        fi
    done
    
    log_info "Sync completed:"
    log_success "  ✅ Synced: $success_count variables"
    log_warning "  ⏭️  Skipped: $skip_count variables (not set)"
    
    if [[ $error_count -gt 0 ]]; then
        log_error "  ❌ Failed: $error_count variables"
        return 1
    else
        log_success "🎉 All environment variables synced successfully!"
        return 0
    fi
}

# Print usage information
print_usage() {
    echo "Usage: $0 [environment] [project_id]"
    echo ""
    echo "Arguments:"
    echo "  environment   Target environment (default: production)"
    echo "                Options: production, preview, development"
    echo "  project_id    Vercel project ID (default: \$VERCEL_PROJECT_ID)"
    echo ""
    echo "Environment Variables Required:"
    echo "  VERCEL_TOKEN      Vercel API token"
    echo "  VERCEL_ORG_ID     Vercel organization ID"
    echo "  VERCEL_PROJECT_ID Vercel project ID (or pass as argument)"
    echo ""
    echo "Environment Variables to Sync (if set):"
    for var in "${ENV_VARS[@]}"; do
        echo "  $var"
    done
    echo ""
    echo "Options:"
    echo "  DRY_RUN=true      Simulate the sync without making changes"
    echo ""
    echo "Examples:"
    echo "  $0                          # Sync to production"
    echo "  $0 preview                  # Sync to preview environment"
    echo "  DRY_RUN=true $0             # Dry run simulation"
}

# Main execution
main() {
    # Handle help flag
    if [[ "$1" == "-h" || "$1" == "--help" ]]; then
        print_usage
        exit 0
    fi
    
    log_info "🚀 Vercel Environment Variables Sync Script"
    log_info "Target Environment: $ENVIRONMENT"
    log_info "Project ID: $PROJECT_ID"
    
    if [[ "$DRY_RUN" == "true" ]]; then
        log_warning "🧪 DRY RUN MODE - No changes will be made"
    fi
    
    validate_requirements
    setup_vercel
    
    if sync_all_vars; then
        log_success "🎉 Environment sync completed successfully!"
        exit 0
    else
        log_error "💥 Environment sync failed!"
        exit 1
    fi
}

# Only run main if script is executed directly (not sourced)
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi