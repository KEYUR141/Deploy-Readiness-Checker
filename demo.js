import { query } from "gitclaw";
import "dotenv/config";
const REPO_TO_CHECK = process.argv[2] || "https://github.com/expressjs/express";

console.log(`\n🔍 Deploy Readiness Agent`);
console.log(`Checking: ${REPO_TO_CHECK}`);
console.log("─".repeat(50));

for await (const msg of query({
  prompt: `
    You are a deployment readiness inspector.
    Analyze this GitHub repository: ${REPO_TO_CHECK}

    Run through all your skills in this order:
    1. repo-structure-check — check for README, .gitignore, lockfile, .env.example, Dockerfile
    2. secret-scan — check for hardcoded secrets or credentials
    3. ci-cd-check — check for CI/CD config and test setup
    4. readiness-report — produce the final scored report

    Use the github-fetch tool to inspect the repo contents.
    Be thorough and produce the full readiness report at the end.
  `,
  dir: "./agent",
  model: "anthropic:claude-sonnet-4-5-20250929",
})) {
  if (msg.type === "delta") process.stdout.write(msg.content);
  if (msg.type === "tool_use") console.log(`\n⚙️  [${msg.toolName}]`);
  if (msg.type === "system" && msg.subtype === "error") console.error(`\n❌ ${msg.content}`);
}

console.log("\n" + "─".repeat(50));
console.log("✅ Analysis complete.");