---
name: create-skill
description: Use this skill to create, update, or plan new skills for the AI agent. Triggers when the user asks to "create a skill", "add a new skill", "how to make a skill", or "teach you a new skill".
---

# Create Skill

This skill provides the standard operating procedure for creating new skills for the AI agent. It ensures all new skills are properly formatted and correctly registered by the system without errors.

## Core Requirements

Every skill MUST be an individual directory containing a `SKILL.md` file at this path: `~/.pi/agent/skills/<skill-name>/SKILL.md`

### 1. Mandatory YAML Frontmatter
The `SKILL.md` file **MUST** start with YAML frontmatter containing `name` and `description`. If this is missing, the system will crash with a "[Skill conflicts] description is required" error.

```yaml
---
name: skill-name-in-kebab-case
description: Extremely descriptive explanation of exactly WHEN this skill should be used. Include specific trigger phrases like "Use when the user asks for X" or "Triggers on: Y, Z". The system relies on this description to know when to pull the skill into context.
---
```

### 2. Body Structure
Below the frontmatter, the markdown file should have clear sections guiding the agent on how to execute the skill:

- **# Title**: A human-readable title.
- **## Context / When to Use**: Additional context about the skill.
- **## Instructions / Rules**: Strict rules the agent must follow.
- **## Execution Steps**: A step-by-step checklist of how to perform the task (e.g., Verify first, Execute, Confirm).

## Execution Steps for Creating a New Skill

When the user asks you to create a new skill:
1. **Determine the Name & Description**: Ask the user (or deduce) the core purpose. The `name` must be `kebab-case` and directory-safe. The `description` must be rich with trigger keywords.
2. **Create the Directory**: Run `mkdir -p ~/.pi/agent/skills/<skill-name>`
3. **Write the SKILL.md**: Use the `default_api:write` or `bash` tool to write the complete `SKILL.md` file, strictly including the YAML frontmatter.
4. **Verify**: Check that the file was written and starts with `---`.
5. **Confirm**: Let the user know the skill was successfully added.
