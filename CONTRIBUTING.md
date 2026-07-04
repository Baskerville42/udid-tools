# Contributing To UDID Tools

Thanks for helping improve UDID Tools. This project is intentionally focused: it
helps people retrieve an iPhone or iPad UDID through Safari for development,
beta testing, QA, and device registration workflows.

Good contributions make that flow clearer, safer, faster, or easier to trust.

## Useful Contribution Areas

- Improve UDID, iOS provisioning, beta testing, and device identifier guides.
- Improve accessibility and responsive behavior.
- Improve metadata, sitemap behavior, structured content, and SEO correctness.
- Improve privacy, security, and result-page handling.
- Improve error states around the iOS configuration profile flow.
- Add focused tests for important logic.
- Clarify setup, certificates, and local development documentation.

## Before Opening A Pull Request

Please keep changes focused. A small pull request that solves one clear problem
is much easier to review than a broad rewrite.

Before submitting:

1. Check existing issues and pull requests for related work.
2. Create a branch with a descriptive name.
3. Follow the current project structure and TypeScript style.
4. Update documentation when behavior or setup changes.
5. Run the relevant checks locally.

## Local Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The full UDID retrieval flow requires valid Apple certificates for signing the
configuration profile. See the README for the required environment variables.

## Checks

Run linting before opening a pull request:

```bash
npm run lint
```

Run a production build when you change routing, metadata, sitemap behavior,
profile generation, or other user-facing flows:

```bash
npm run build
```

Format files before committing:

```bash
npm run format
```

## Pull Request Guidelines

Use a clear title and include:

- What changed.
- Why the change is useful.
- How you tested it.
- Screenshots or recordings for visible UI changes.
- Notes about privacy, security, or SEO impact when relevant.

## Content Guidelines

UDID Tools should be accurate and calm. Avoid overclaiming security guarantees,
traffic numbers, or Apple affiliation. Prefer practical explanations that help
developers and testers solve the specific UDID problem.

When editing guides:

- Use plain language.
- Keep the answer close to the search intent.
- Explain when Safari is required.
- Make clear that a UDID should only be shared with trusted developers or teams.
- Do not imply that UDID Tools is an official Apple service.

## Code Of Conduct

By participating, you agree to follow the
[Code of Conduct](CODE_OF_CONDUCT.md).

## Security Reports

Do not include sensitive vulnerability details in public issues. See
[SECURITY.md](SECURITY.md) for responsible disclosure guidance.
