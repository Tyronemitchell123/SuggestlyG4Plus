# Branch Protection Guidelines

This document outlines the recommended branch protection settings for the SuggestlyG4Plus repository to maintain code quality, security, and collaboration standards.

## 🛡️ Recommended Branch Protection Rules

### Main Branch Protection

The `main` branch should have the following protections enabled:

#### Required Status Checks
- [x] **Require status checks to pass before merging**
- [x] **Require branches to be up to date before merging**

**Required Checks:**
- `CI / test (3.9)` - Python 3.9 CI tests
- `CI / test (3.10)` - Python 3.10 CI tests  
- `CI / test (3.11)` - Python 3.11 CI tests
- `CodeQL / Analyze` - Security analysis
- Any additional deployment or integration tests

#### Pull Request Requirements
- [x] **Require a pull request before merging**
- [x] **Require approvals: 1** (minimum)
- [x] **Dismiss stale PR approvals when new commits are pushed**
- [x] **Require review from CODEOWNERS**

#### Additional Restrictions
- [x] **Restrict pushes that create new files**
- [x] **Do not allow bypassing the above settings**
- [x] **Allow force pushes: false**
- [x] **Allow deletions: false**

### Release Branch Protection

For `release/*` branches:

#### Required Status Checks
- [x] **Require status checks to pass before merging**
- [x] **Require branches to be up to date before merging**

**Required Checks:**
- All CI tests
- Security scans
- Performance tests (if applicable)

#### Pull Request Requirements
- [x] **Require a pull request before merging**
- [x] **Require approvals: 2** (higher for releases)
- [x] **Dismiss stale PR approvals when new commits are pushed**
- [x] **Require review from CODEOWNERS**

## 🔧 Implementation Steps

### Via GitHub Web Interface

1. **Navigate to Repository Settings**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Select "Branches" from the left sidebar

2. **Add Branch Protection Rule**
   - Click "Add rule"
   - Enter branch name pattern: `main`
   - Configure protection settings as outlined above

3. **Configure Status Checks**
   - Enable "Require status checks to pass before merging"
   - Add each required check from the list above
   - Enable "Require branches to be up to date before merging"

4. **Set Pull Request Requirements**
   - Enable "Require a pull request before merging"
   - Set required number of approving reviews
   - Enable "Dismiss stale PR approvals when new commits are pushed"
   - Enable "Require review from CODEOWNERS"

### Via GitHub CLI

```bash
# Install GitHub CLI if not already installed
# https://cli.github.com/

# Create branch protection rule for main
gh api repos/Tyronemitchell123/SuggestlyG4Plus/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["CI / test (3.9)","CI / test (3.10)","CI / test (3.11)","CodeQL / Analyze"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true,"require_code_owner_reviews":true}' \
  --field restrictions=null
```

### Via Terraform (Infrastructure as Code)

```hcl
resource "github_branch_protection" "main" {
  repository_id = "SuggestlyG4Plus"
  pattern       = "main"

  required_status_checks {
    strict = true
    contexts = [
      "CI / test (3.9)",
      "CI / test (3.10)", 
      "CI / test (3.11)",
      "CodeQL / Analyze"
    ]
  }

  required_pull_request_reviews {
    required_approving_review_count = 1
    dismiss_stale_reviews          = true
    require_code_owner_reviews     = true
  }

  enforce_admins = true
  
  allows_deletions    = false
  allows_force_pushes = false
}

resource "github_branch_protection" "release" {
  repository_id = "SuggestlyG4Plus"
  pattern       = "release/*"

  required_status_checks {
    strict = true
    contexts = [
      "CI / test (3.9)",
      "CI / test (3.10)",
      "CI / test (3.11)", 
      "CodeQL / Analyze"
    ]
  }

  required_pull_request_reviews {
    required_approving_review_count = 2
    dismiss_stale_reviews          = true
    require_code_owner_reviews     = true
  }

  enforce_admins = true
  
  allows_deletions    = false
  allows_force_pushes = false
}
```

## 🎯 Benefits of Branch Protection

### Code Quality
- **Prevents direct pushes** to main branch
- **Ensures code review** before merge
- **Requires passing tests** before merge
- **Maintains consistent quality** standards

### Security
- **Prevents accidental** or malicious changes
- **Requires security scans** to pass
- **Enforces CODEOWNERS** review for sensitive areas
- **Tracks all changes** through PR history

### Collaboration
- **Encourages discussion** through PRs
- **Documents change rationale** in PR descriptions
- **Enables knowledge sharing** through reviews
- **Maintains project history** and context

### Reliability
- **Prevents broken builds** in main branch
- **Ensures compatibility** across environments
- **Requires up-to-date branches** before merge
- **Maintains deployment readiness**

## 🚨 Emergency Procedures

### Hotfix Process

For critical production issues:

1. **Create hotfix branch** from main:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/critical-issue-description
   ```

2. **Make minimal changes** to fix the issue

3. **Create PR** with emergency label:
   - Use `[HOTFIX]` prefix in title
   - Add `priority:critical` label
   - Request expedited review

4. **Fast-track approval**:
   - Notify maintainers via multiple channels
   - Get required reviews quickly
   - Ensure all checks pass

5. **Monitor post-deployment**:
   - Watch for any issues
   - Be ready to rollback if needed

### Temporary Rule Bypass

In extreme emergencies, repository administrators can:

1. **Temporarily disable** branch protection
2. **Make emergency changes** directly
3. **Re-enable protection** immediately after
4. **Create follow-up PR** to document changes
5. **Conduct post-incident review**

## 📊 Monitoring and Metrics

### Protection Effectiveness

Monitor these metrics to assess branch protection effectiveness:

- **PR merge rate** vs. direct pushes (should be 100% PRs)
- **Average time** from PR creation to merge
- **Number of failed** status checks caught
- **Review participation** rates
- **Security issue** prevention count

### Regular Reviews

- **Monthly**: Review protection rules effectiveness
- **Quarterly**: Update required status checks
- **Biannually**: Comprehensive rules review (automated via periodic-review workflow)
- **As needed**: Adjust based on team growth or process changes

## 🔗 Related Documentation

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contributor guidelines
- [SECURITY.md](./SECURITY.md) - Security policy
- [CODEOWNERS](./.github/CODEOWNERS) - Code ownership assignments
- [GitHub Actions Workflows](./.github/workflows/) - Automated checks

## 📞 Support

If you encounter issues with branch protection:

1. **Check workflow status** in GitHub Actions
2. **Review error messages** in failed checks
3. **Contact maintainers** via GitHub issues
4. **Refer to GitHub documentation** for advanced configuration

---

**Implementation Priority:** High  
**Next Review Date:** As part of biannual repository review  
**Owner:** Repository maintainers  

*This document should be reviewed and updated whenever branch protection rules are modified.*