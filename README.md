# ECCV 2026 Workshop Website

Website source for the **Safe World Models for Trustworthy Embodied AI** workshop at ECCV 2026.

Live website: <https://trustworthy-world-models.github.io/ECCV2026/>

## Project Layout

This project has an authoring copy and a separate publishing clone:

| Location | Purpose |
| --- | --- |
| `eccv_ws_web` | Edit content, preview locally, and create the production build. |
| `ECCV2026-publish` | Git checkout containing source plus the compiled GitHub Pages site. |

The authoring copy is the source of truth. Do not edit compiled files in the publishing clone and do not use its root `index.html` as the next authoring entry point.

## Technology

- Vue 3
- Vite
- npm or pnpm
- GitHub Pages deployment from the repository root

Install dependencies and start the local site:

```powershell
npm install
npm run dev
```

Create a production build:

```powershell
npm run build
npm run preview
```

The build writes to `dist/`. The publishing repository receives the contents of `dist/` at its root, where GitHub Pages serves `index.html` and `assets/`.

## Updating Workshop Information

Most content updates belong in [`src/data/workshopData.js`](src/data/workshopData.js). It contains:

- workshop title, venue, date, and contact information;
- important dates and submission links;
- call-for-papers topics and submission rules;
- workshop and venue schedules;
- speakers, organizers, committee members, competition details, and FAQs.

Use the existing Vue components when changing layout or behavior. Put speaker and organizer portraits in the matching directory under `src/assets/`; the image filename should match the person name.

Before publishing, check desktop and mobile layouts, dates and time zones, image loading, external links, and the absence of private information.

## Publish Synchronization

From the authoring directory, run:

```powershell
.\scripts\sync-publish.ps1
```

The script:

1. verifies that `dist/` can be built;
2. checks that `ECCV2026-publish` is a Git checkout;
3. refuses a dirty publishing clone by default;
4. copies `src/`, `public/`, package/configuration files, public documentation, and reusable skills;
5. copies the production `dist/` contents to the publishing repository root;
6. removes copied `.DS_Store` metadata;
7. prints the final Git review commands without committing or pushing.

The default sibling path is:

```text
..\ECCV2026-publish
```

Use an explicit clone path when necessary:

```powershell
.\scripts\sync-publish.ps1 -PublishPath "C:\path\to\ECCV2026-publish"
```

If the publishing clone already contains reviewed work, inspect it first. To intentionally synchronize over an existing dirty checkout, use `-AllowDirtyPublish`; this does not discard changes, commit, or push anything:

```powershell
.\scripts\sync-publish.ps1 -AllowDirtyPublish
```

The publishing clone should be updated from GitHub before a normal release:

```powershell
Set-Location ..\ECCV2026-publish
git switch main
git pull --ff-only origin main
git switch -c website/update-description
git branch --show-current
```

After synchronization, review the result:

```powershell
git status
git diff --stat
git diff -- src/data/workshopData.js src/styles.css README.md
```

Commit and push only after the diff and the live-site preview are acceptable. The automation never performs `git commit` or `git push` automatically.

Push the branch that is actually checked out:

```powershell
git push -u origin HEAD
```

Using `HEAD` avoids `src refspec ... does not match any` when a copied example branch name was not created locally. Create the branch before synchronizing and staging files.

## Agent Guidance and Reusable Skills

- [`agent.md`](agent.md) defines the local operating rules for future coding agents.
- [`.agents/skills/eccv-content-update/SKILL.md`](.agents/skills/eccv-content-update/SKILL.md) explains how to make content changes safely.
- [`.agents/skills/eccv-publish-sync/SKILL.md`](.agents/skills/eccv-publish-sync/SKILL.md) explains how to synchronize and review the publishing clone.
- [`PRIVATE_WEBSITE_UPDATE_TUTORIAL.md`](PRIVATE_WEBSITE_UPDATE_TUTORIAL.md) remains local-only and must not be published.

## Security

Never place passwords, access tokens, recovery codes, private keys, or personal credentials in this repository. Authenticate Git through Git Credential Manager, SSH, or another supported secure method. The private tutorial is excluded from Git by design.
