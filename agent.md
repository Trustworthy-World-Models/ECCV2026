# ECCV Website Agent Instructions

## Source of Truth

- Treat this directory as the editable authoring copy.
- Treat the sibling `ECCV2026-publish` directory as the deployment clone.
- Make website content changes here first, especially in `src/data/workshopData.js`.
- Never use the compiled publishing root `index.html` as an authoring source.
- Never edit generated files in `dist/` by hand.

## Update Workflow

1. Inspect the relevant data field, component, or asset before editing.
2. Keep content-only changes in `src/data/workshopData.js` whenever possible.
3. Run `npm run build` in this authoring copy after edits.
4. Run `scripts/sync-publish.ps1` to update the publishing clone.
5. Review the publishing clone with `git status` and `git diff`.
6. Do not commit or push unless the user explicitly requests it.
Before staging a publish update, create and verify a branch in the publish clone:

```powershell
git switch main
git pull --ff-only origin main
git switch -c website/update-description
git branch --show-current
```

After committing, push with `git push -u origin HEAD` so the command targets the branch that is actually checked out.

The sync script builds first, copies source and documentation, places compiled output at the publishing repository root, and removes copied macOS metadata. It does not pull, commit, push, or delete user changes. A dirty publish clone requires explicit `-AllowDirtyPublish`.

## Content Rules

- Preserve existing Vue and data structures unless the request requires a change.
- Keep dates and times explicit and verify the intended time zone.
- Match portrait filenames to the corresponding person name.
- Use complete `https://` URLs for external links.
- Do not invent unconfirmed speakers, talks, deadlines, venues, or submission policies.
- Keep public documentation free of credentials and private operational details.

## Validation

At minimum, run:

```powershell
npm run build
.\scripts\sync-publish.ps1
```

Then review the publish clone. When dependencies are unavailable, report that fact rather than claiming validation succeeded. For visual changes, check desktop and narrow mobile layouts, image loading, links, and horizontal overflow.

## Protected Files

- Do not publish `PRIVATE_WEBSITE_UPDATE_TUTORIAL.md`.
- Do not copy `node_modules/`.
- Do not use destructive Git commands.
- Do not reset, clean, or overwrite unrelated user changes.
- Do not expose or request passwords, tokens, recovery codes, or private keys.
