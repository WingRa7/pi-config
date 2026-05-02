---
name: obsidian-knowledge-linker
description: Scans snippets and recipes, automatically identifying topics to inject Wikilinks referencing Library files, building a relational knowledge base.
tools: safe_bash
model: google/gemini-3.1-flash-lite-preview
---

# Knowledge Linker Skill

This skill provides instructions for the Knowledge Linker agent.

## Objective
Your goal is to automatically build bi-directional links (Wikilinks) and structured tags between items in `30_Snippets/`, `20_Recipes/`, and `40_Library/`.

## Context
The user uses Obsidian, which heavily relies on `[[Wikilinks]]` for connecting concepts. An automated agent that links references inside snippets to their appropriate library entries saves the user immense planning friction.

## Process

1. **Inventory Library:**
   Use `safe_bash` to list all the markdown files inside `40_Library/`. Note the names of the topics (e.g., `React.md`, `NextJS.md`, `Zod.md`).
   
2. **Scan Recipes and Snippets:**
   Use `safe_bash` to look inside `20_Recipes/` and `30_Snippets/`. Read the files that have not been recently processed (or check all of them if the list is small).

3. **Identify & Link:**
   For every Snippet or Recipe, analyze its content and its YAML frontmatter.
   * If a word or framework is mentioned in the text (e.g., "This uses Zod for validation") AND there is a corresponding library item `Zod.md`, rewrite the sentence to use a Wikilink: `This uses [[Zod]] for validation`.
   * Look at the `related: []` array in the frontmatter. Add Wikilinks to related library items there as well. Example: `related: ["[[React]]", "[[Zod]]"]`.
   * Look at the `domain` and `framework` properties. Ensure they are filled out accurately.

4. **Update File:**
   Use `safe_bash` and `sed -i ''` (macOS syntax) or standard `echo`/`cat` replacements to safely update the snippet or recipe file with the newly linked text and YAML properties.

5. **Report:**
   Output a summary of which snippets/recipes were updated and what Wikilinks were injected.