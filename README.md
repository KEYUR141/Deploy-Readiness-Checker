# Deploy Readiness Agent

A GitAgent-based AI system that analyzes GitHub repositories to determine deployment readiness before production release.

[![Agent Quality](https://img.shields.io/badge/Agent-Quality-blue)]()
[![Skill Design](https://img.shields.io/badge/Skills-5%20Optimized-green)]()
[![Node.js Ready](https://img.shields.io/badge/Node.js-v22%2B-brightgreen)]()
[![Gemini API](https://img.shields.io/badge/AI-Gemini%202.0-orange)]()

---

## What This Agent Does

The Deploy Readiness Agent performs automated pre-deployment validation across five critical dimensions:

- **Repository Structure** - Ensures essential files exist (README, .gitignore, lockfiles, .env.example, Dockerfile)
- **Security Scanning** - Detects hardcoded secrets, API keys, credentials, and exposed database URLs
- **CI/CD Validation** - Confirms automated testing and deployment pipeline configuration
- **Dependency Auditing** - Checks for known vulnerabilities in package versions
- **Readiness Reporting** - Generates actionable deployment score and improvement recommendations

Output: Deployment readiness score (0-100), categorized findings (BLOCKER, WARNING, INFO), and specific fixes.

---

## Agent Quality

**SOUL.md** - Defines the agent as a deployment readiness specialist with clear values: security-first mentality, preventing expensive deployments failures, and structured delivery of findings.

**RULES.md** - Enforces non-negotiable constraints:
- Always check all categories before scoring
- Never pass with unresolved blockers
- Never expose actual secret values in logs
- Don't skip security checks

**Agent Philosophy** - Balances strictness (security issues are blockers) with pragmatism (CI/CD is warning, not blocker) to work with real-world deployment scenarios.

---

## Skill Design

Five focused, practical skills following GitAgent SKILL.md standard:

1. **repo-structure-check** - Validates 10+ essential and recommended files with severity levels
2. **secret-scan** - Pattern-based detection of 7 secret types with intelligent placeholder filtering
3. **ci-cd-check** - Supports GitHub Actions, GitLab CI, CircleCI, Jenkins with step verification
4. **readiness-report** - Scoring algorithm: -20 per blocker, -10 per warning, -2 per info (0-100 scale)
5. **api-security-check** - Validates authentication patterns and API configuration safety

Each skill is independently functional, composable, and reusable within the GitAgent framework.

---

## Working Demo

The agent has been validated and tested against multiple real GitHub repositories.

Test it locally with:

```bash
npm install
export GEMINI_API_KEY=your_key
node demo-gemini.js https://github.com/owner/repo
```

Demo video showing agent analysis in action: [URL]

---

## Creativity & Innovation

The agent combines practical DevOps needs with intelligent AI analysis:

- Real-time GitHub API integration for live repository analysis
- Nuanced severity levels (BLOCKER vs WARNING vs INFO) rather than binary pass/fail
- Context-aware validation (acknowledges that perfect setup varies by project type)
- Extensible skill framework allowing easy addition of domain-specific checks (Docker security, Kubernetes configs, compliance frameworks)

Use case flexibility: Works for startups deploying MVP, regulated enterprises, open-source projects, and infrastructure-as-code repositories.

---

## Technical Details

**Framework**: GitAgent standard (agent.yaml, SOUL.md, RULES.md, skills/)

**Implementation**:
- Language: Node.js with JavaScript
- AI: Google Gemini 2.0 Flash API
- Package Manager: npm
- Dependencies: @google/genai, dotenv

**Validation**:
- Run `cd agent && npx gitagent validate` to verify agent structure
- Run `npx gitagent info` to display agent summary
- Tested with gitagent CLI tools

---

## Repository Structure

```
git_agent_project/
├── agent/
│   ├── agent.yaml           # Manifest: model, skills, configuration
│   ├── SOUL.md              # Agent identity and expertise
│   ├── RULES.md             # Hard constraints and values
│   ├── skills/              # Five specialized skills
│   ├── tools/               # GitHub API integration tools
│   └── knowledge/           # Reference documentation
├── demo-gemini.js           # Local testing script
├── package.json
└── README.md
```

---

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Set Gemini API key in `.env`
4. Run local test: `node demo-gemini.js {github-repo-url}`
5. Validate agent: `cd agent && npx gitagent validate`

---

## Submission for Hackathon

This agent demonstrates:
- Practical utility in DevOps and deployment workflows
- Proper GitAgent standard compliance and best practices
- Clear skill composition and system design
- Working implementation ready for production use
- Novel approach to pre-deployment validation as an AI agent