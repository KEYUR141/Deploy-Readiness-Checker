---
name: secret-scan
description: Scans for hardcoded secrets and credentials
allowed-tools: Read Bash
---

# Secret Scan

1. BLOCKER patterns: api_key=, sk-, AKIA, password=, BEGIN RSA PRIVATE KEY, postgres://user:pass@
2. Ignore placeholders like your-api-key-here or process.env.X
3. Check .env is in .gitignore (BLOCKER if not)
4. Report file and line number but NEVER log the actual secret value.
