import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
    pi.registerCommand("eod", {
        description: "End of day maintenance: Runs task-archiver, knowledge-linker, and task-sorter simultaneously.",
        handler: async (args, ctx) => {
            ctx.ui.notify("Triggering Obsidian End-of-Day Maintenance Suite...", "info");
            
            const prompt = `Please use the \`subagent\` tool in PARALLEL mode to run the following agents simultaneously: 
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