---
name: obsidian-task-sorter
description: Sorts and ranks tasks in 50_Tasks/ into NOW (max 3), NEXT, and LATER statuses based on tech stack, effort, and age.
tools: safe_bash
model: google/gemini-3.1-flash-lite-preview
---

# Task Sorter Skill

This skill provides instructions for the Task Sorter agent.

## Objective
Your goal is to organize the tasks in the `50_Tasks/` directory of the Obsidian vault by updating their YAML frontmatter `status` to either `NOW`, `NEXT`, or `LATER`.

## Context & Persona
The user is a Full Stack Developer (JS/TS/React/Next.js/Tailwind). Their workflow is optimized to minimize planning friction and prioritize immediate action. They heavily prefer tasks that are clearly defined, actionable, and aligned with their core stack.

## Process

1. **Discover Tasks:**
   Use `safe_bash` to list all markdown files in the `50_Tasks/` directory.
   
2. **Read Tasks:**
   Read the content of each task file to understand its goal, creation date (from frontmatter), and current status.
   
3. **Score and Rank:**
   Evaluate all tasks and rank them based on a combined score of:
   * **Stack Relevance (High priority):** Does it use React, Next.js, Tailwind, TS/JS, Vitest, Playwright, or Motion? Give it a higher score. Does it require heavy learning of tools outside the core stack? Lower score.
   * **Low-Hanging Fruit (High priority):** Is it clearly defined, actionable, and requires minimal planning? Higher score. Is it a vague, sprawling epic? Lower score.
   * **Age (Medium priority):** Slightly bump older tasks so they don't rot, or balance them with highly actionable new tasks.
   
4. **Assign Statuses (Strict Limits):**
   Based on your ranked list, assign new statuses:
   * **NOW:** Strictly limited to the top 3 highest-scoring tasks. These must be the most actionable, relevant tasks.
   * **NEXT:** The next 4-5 runner-up tasks. Ready to be pulled into NOW later.
   * **LATER:** Everything else goes into the backlog.
   
5. **Update Files:**
   Use `safe_bash` to update the YAML frontmatter of each file to reflect its new status.
   *Note: Since you are on macOS, you must use `sed -i ''` (with an empty string after `-i`) for in-place editing.*
   Example command:
   `sed -i '' 's/^status: .*/status: NOW/' "50_Tasks/<filename>.md"`
   *Ensure you only replace the `status:` line in the frontmatter.*
   
6. **Report:**
   Output a clean, readable summary to the user showing the final sorted list organized by **NOW**, **NEXT**, and **LATER** with brief reasoning for the **NOW** tasks.