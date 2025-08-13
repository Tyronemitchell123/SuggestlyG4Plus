# Security Policy

We maintain the latest `main` and active `release/*` branches.

## Reporting a Vulnerability
Please email security@suggestlyg4plus.io with details. We aim to respond within 48 hours.

## Best Practices
- Use environment variables for secrets
- Rotate API keys regularly
- Enforce least privilege IAM roles
- Keep dependencies updated (Dependabot enabled)

## Automated Security Monitoring

### Bot Activity Monitoring
We have automated monitoring for security-related bot activity:

- **Dependabot PRs**: Daily monitoring for stale or failed dependency updates
- **CodeQL Alerts**: Continuous monitoring for security vulnerabilities
- **Security Advisories**: Automated detection of new vulnerability reports

### Alert Management
- Critical security issues trigger immediate alerts
- Stale security PRs are escalated after 7 days
- Security advisories create high-priority issues automatically

### Response Times
- **Critical vulnerabilities**: Response within 24 hours
- **High severity issues**: Response within 48 hours
- **Medium/Low issues**: Response within 1 week

## Biannual Security Reviews
Our automated periodic review process includes:
- Security policy updates
- Access control verification
- Dependency audit
- Vulnerability assessment
- Documentation updates

For more details, see our [Branch Protection Guidelines](./docs/BRANCH_PROTECTION.md)
