#!/bin/sh
# Reads args from stdin as JSON
INPUT=$(cat)
REPO_URL=$(echo "$INPUT" | node -e "const d=require('fs').readFileSync('/dev/stdin','utf8'); console.log(JSON.parse(d).repo_url || '')")
PATH_IN_REPO=$(echo "$INPUT" | node -e "const d=require('fs').readFileSync('/dev/stdin','utf8'); console.log(JSON.parse(d).path || '')")

# Convert https://github.com/owner/repo → owner/repo
REPO=$(echo "$REPO_URL" | sed 's|https://github.com/||')

# Fetch via GitHub API
curl -s "https://api.github.com/repos/$REPO/contents/$PATH_IN_REPO"