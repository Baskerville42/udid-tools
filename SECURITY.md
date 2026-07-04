# Security Policy

UDID Tools handles a narrow iOS developer workflow: retrieving device attributes
returned by Apple's configuration profile flow and showing them to the user in a
browser result page.

Security reports are welcome. Please use responsible disclosure so issues can be
validated and fixed before details are public.

## Supported Versions

Security fixes target the current `main` branch and the production deployment at
[https://www.udid.tools](https://www.udid.tools).

## Reporting A Vulnerability

Please do not open a public issue with exploit details, private identifiers,
logs, or proof-of-concept payloads.

Preferred options:

1. Use GitHub's private vulnerability reporting feature if it is available for
   this repository.
2. Contact the maintainer privately using the email listed on the GitHub profile.

If you must open a public issue, keep it high level and avoid sensitive details.

## What To Include

When possible, include:

- A clear summary of the issue.
- Steps to reproduce.
- Affected URL or flow.
- Expected and actual behavior.
- Impact assessment.
- Browser, device, iOS version, and Node.js version if relevant.
- Logs or proof-of-concept details sent privately.

## Scope

Useful reports include:

- Problems in configuration profile generation or signing.
- Result-page privacy leaks.
- Incorrect indexing of private result URLs.
- Cross-site scripting or injection issues.
- Exposure of secrets, certificates, or sensitive environment variables.
- Vulnerabilities in dependencies that affect this project.

Out of scope:

- Social engineering.
- Automated noisy scans without a working impact explanation.
- Denial-of-service testing against production.
- Reports that depend on a compromised user device or browser extension.

## Response Expectations

The project aims to:

1. Acknowledge valid reports within 48 hours.
2. Validate reproducible issues within 5-10 days.
3. Prioritize fixes based on user impact.
4. Credit reporters when appropriate and requested.

## Research Rules

Please:

- Avoid destructive testing.
- Do not access or retain other users' data.
- Do not publicly disclose details before a fix is available.
- Keep testing limited to accounts, devices, and data you control.

Thank you for helping keep UDID Tools safe and trustworthy.
