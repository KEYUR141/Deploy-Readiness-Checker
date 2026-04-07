---
name: api-security-check
description: Checks API security hygiene before deployment
allowed-tools: Read Bash
---

# API Security Check

When checking API security:

1. Authentication (BLOCKER if missing):
   - Is there an auth mechanism? (JWT, OAuth, API keys, sessions)
   - Are protected routes actually protected?
   - Is there a middleware or decorator handling auth globally?

2. Input Validation (WARNING if missing):
   - Is user input validated/sanitized before use?
   - Are there protections against SQL injection or NoSQL injection?
   - Is request body size limited?

3. Rate Limiting (WARNING if missing):
   - Is there rate limiting on public endpoints?
   - Is there protection against brute force on auth endpoints?

4. CORS Configuration (WARNING if misconfigured):
   - Is CORS configured? If yes, is it wildcard (*) in production? (BLOCKER if so)
   - Are allowed origins explicitly whitelisted?

5. Sensitive Data Exposure (BLOCKER if found):
   - Do API responses expose passwords, tokens, or internal IDs unnecessarily?
   - Are stack traces or internal errors returned to the client?
   - Is there any debug mode or verbose logging enabled that would ship to prod?

6. HTTPS enforcement (WARNING if missing):
   - Is there any redirect from HTTP to HTTPS?
   - Are secure/httpOnly flags set on cookies?
