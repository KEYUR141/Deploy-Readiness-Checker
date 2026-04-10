#!/usr/bin/env node

/**
 * Deploy Readiness Agent Demo
 * Uses Google Gemini API directly to analyze GitHub repos
 */

import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const REPO_URL = process.argv[2] || "https://github.com/expressjs/express";
const AGENT_DIR = "./agent";

// Initialize Gemini
const ai = new GoogleGenAI({});

// Load agent identity
function loadAgent() {
  const soulPath = path.join(AGENT_DIR, "SOUL.md");
  const rulesPath = path.join(AGENT_DIR, "RULES.md");
  
  const soul = fs.readFileSync(soulPath, "utf8");
  const rules = fs.readFileSync(rulesPath, "utf8");
  
  return { soul, rules };
}

// Build system prompt from agent definition
function buildSystemPrompt(agent) {
  return `${agent.soul}

${agent.rules}

You are analyzing a GitHub repository for deployment readiness.
Be thorough and check:
1. Repository structure (README, .gitignore, lockfiles, .env.example, Dockerfile)
2. Hardcoded secrets or credentials
3. CI/CD pipeline configuration
4. Test setup and coverage
5. Documentation

Provide a final readiness score out of 100 and clear recommendations.`;
}

async function analyzeRepo() {
  console.log("\n🔍 Deploy Readiness Agent");
  console.log(`Checking: ${REPO_URL}`);
  console.log("─".repeat(50));

  try {
    const agent = loadAgent();
    const systemPrompt = buildSystemPrompt(agent);

    const userPrompt = `Analyze this GitHub repository for deployment readiness: ${REPO_URL}

Provide:
1. A readiness score (0-100)
2. List of BLOCKERS (critical issues)
3. List of WARNINGS (should fix)
4. List of INFO (nice to have)
5. Specific recommendations to improve readiness`;

    console.log("\n📝 Analyzing with Gemini...\n");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemPrompt}\n\n${userPrompt}`
            }
          ]
        }
      ]
    });

    // Handle response - could be text() method or direct text property
    let result;
    if (typeof response.text === 'function') {
      result = response.text();
    } else if (response.text) {
      result = response.text;
    } else if (response.candidates && response.candidates[0] && response.candidates[0].content) {
      result = response.candidates[0].content.parts[0].text;
    } else {
      result = JSON.stringify(response, null, 2);
    }
    
    console.log(result);

    console.log("\n" + "─".repeat(50));
    console.log("✅ Analysis complete.");
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    if (error.message.includes("API_KEY")) {
      console.error("\nℹ️  Make sure GEMINI_API_KEY is set in .env");
    }
    process.exit(1);
  }
}

analyzeRepo();
