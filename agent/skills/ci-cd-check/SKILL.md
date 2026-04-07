---
name: ci-cd-check
description: Checks for CI/CD pipeline configuration and test setup
allowed-tools: Read Bash
---

# CI/CD Check

1. CI config (WARNING if none): .github/workflows, .gitlab-ci.yml, Jenkinsfile
2. If CI exists, check for test step, build step, lint check (INFO if missing)
3. Test files (WARNING if none): test/, *.test.js, test_*.py
4. Deployment config (INFO if missing): Dockerfile, vercel.json, fly.toml
