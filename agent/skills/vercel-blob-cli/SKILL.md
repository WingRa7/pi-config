# Vercel Blob CLI (`vercel-blob-cli`)

This skill allows Pi to interact directly with Vercel Blob storage from the command line using the `vercel blob` CLI. It supports uploading, listing, deleting, and copying files.

**Important Distinction:** This skill is strictly for CLI execution. If the user asks you to *write code* using `@vercel/blob`, do not use this skill; rely on your standard Next.js knowledge base instead.

## Triggers
Use this skill when the user asks to "upload this file to vercel blob", "put this in my blob storage", "list files in my blob", or "delete that blob url".

## General Workflow (Uploads)
When asked to upload a file (`put`):
1. **Verify File:** Check if the local file exists (`ls -lh <file>`).
2. **Interactive Routing:** Use the `ask_user_question` tool to ask the user:
   * *"What destination path should this be uploaded to? (e.g., `assets/images/hero.jpg` or leave empty to use the current filename)"*
3. **Execute:** Run the `vercel blob put` command (defaulting to `--access public` and `--add-random-suffix` unless told otherwise).
4. **Report:** Extract the returned Blob URL and present it to the user formatted as a Markdown link/image so they can immediately use it in their code.

*(Note: This skill synergizes perfectly with the `media-optimizer` skill. You can compress a file first, then use this skill to upload the compressed version.)*

## Command Reference

### Upload (Put)
Uploads a local file to Vercel Blob.
```bash
vercel blob put [path-to-local-file] --access public --add-random-suffix
```
*Optional Flags:*
- `--pathname <string>`: Specify the destination path in the blob (e.g., `images/hero.jpg`).
- `--access private`: Make the file private (requires token to read).

### List (Ls)
Lists files currently in the Blob store.
```bash
vercel blob list
```
*Optional Flags:*
- `--prefix <string>`: Filter blobs by a specific folder/prefix (e.g., `images/`).
- `--limit <number>`: Limit results (default 10, max 1000).

### Delete (Del)
Deletes a file from the Blob store.
```bash
vercel blob del [url-or-pathname]
```

### Copy (Cp)
Copies an existing blob to a new location within the store.
```bash
vercel blob copy [from-url-or-pathname] [to-pathname] --access public
```

## Important Notes
- The CLI automatically authenticates using the `BLOB_READ_WRITE_TOKEN` found in the local `.env` or `.env.local` file of the current Vercel project directory. 
- Ensure you are running these commands in the root of the linked Vercel project directory.
