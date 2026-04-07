---
name: readiness-report
description: Aggregates all check results into a final scored readiness report
allowed-tools: Read
---

# Readiness Report

Scoring: start at 100, -20 per BLOCKER, -10 per WARNING, -2 per INFO.
Status: 90-100 READY, 70-89 CAUTION, 50-69 NOT RECOMMENDED, 0-49 DO NOT DEPLOY.

Sections: Score, BLOCKERS with fixes, WARNINGS with fixes, INFO items, PASSED checks, top 3 summary.
