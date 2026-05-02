---
name: obsidian-task-archiver
description: Finds all DONE tasks in 50_Tasks/, appends a completion date, and moves them to 60_Archive/ to keep the active folder clean.
tools: safe_bash
model: google/gemini-3.1-flash-lite-preview
---

# Task Archiver Skill

This skill provides instructions for the Task Archiver agent.

## Objective
Your goal is to act as a janitor for the `50_Tasks/` directory, moving completed tasks out of the active folder into an archive to reduce visual fatigue for the user.

## Process

1. **Setup Archive:**
   Check if the `60_Archive/` directory exists in the vault. If not, use `safe_bash` to create it: `mkdir -p 60_Archive`

2. **Find Completed Tasks:**
   Use `safe_bash` (e.g., `grep`) to search the `50_Tasks/` folder for any markdown files where the YAML frontmatter contains `status: DONE` (or `Done`, `done`).
   
3. **Process Each Task:**
   For every completed task found:
   * Read the file to verify it's a completed task.
   * Check if it has a `completed:` field in the YAML frontmatter. If it does not, use `sed -i ''` (macOS syntax) to inject the current date (YYYY-MM-DD) into the frontmatter.
     Example: `sed -i '' '/^status:/a \
completed: YYYY-MM-DD
' "50_Tasks/<filename>.md"`
   * Use `mv` to move the file from `50_Tasks/<filename>.md` to `60_Archive/<filename>.md`.
   
4. **Report:**
   Output a list of all the tasks that were successfully archived. If no tasks were marked as DONE, simply report that the active task folder is clean.