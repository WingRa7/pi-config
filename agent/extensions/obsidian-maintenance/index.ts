import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import fs from 'fs';
import path from 'path';

export default function (pi: ExtensionAPI) {
    pi.registerCommand("eod", {
        description: "End of day maintenance: Runs task-archiver, knowledge-linker, and task-sorter simultaneously.",
        handler: async (args, ctx) => {
            ctx.ui.notify("Triggering Obsidian End-of-Day Maintenance Suite...", "info");
            
            let vaultPath = "/Users/raine/Obsidian/RaineTech"; // Fallback default
            try {
                const configPath = path.join(__dirname, 'config.json');
                if (fs.existsSync(configPath)) {
                    const configData = fs.readFileSync(configPath, 'utf8');
                    const config = JSON.parse(configData);
                    if (config.vaultPath) {
                        vaultPath = config.vaultPath;
                    }
                }
            } catch (err) {
                ctx.ui.notify("Error reading config.json, using default vault path.", "error");
            }
            
            const prompt = `Please use the \`subagent\` tool in PARALLEL mode to run the following agents simultaneously. IMPORTANT: You must explicitly set the \`cwd\` parameter for all three tasks to \`${vaultPath}\` so they run in the correct vault directory, regardless of my current terminal location.
1. \`obsidian-task-archiver\` (Task: Find all DONE tasks in 50_Tasks/, append a completion date to the YAML, and move them to 60_Archive/ to keep the active folder clean.)
2. \`obsidian-knowledge-linker\` (Task: Scan snippets and recipes in 30_Snippets/ and 20_Recipes/ to inject Wikilinks referencing Library files in 40_Library/.)
3. \`obsidian-task-sorter\` (Task: Analyze markdown files in 50_Tasks/, rank them based on stack relevance, actionability, and age, and update their frontmatter status to NOW (max 3), NEXT, or LATER. Output a summary report.)`;

            if ('sendUserMessage' in pi) {
                await pi.sendUserMessage(prompt);
            } else if ('sendUserMessage' in ctx) {
                await (ctx as any).sendUserMessage(prompt);
            }
        }
    });
}