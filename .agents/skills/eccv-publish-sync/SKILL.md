# ECCV Publish Synchronization Skill

Use this skill after an authoring update is built and the sibling `ECCV2026-publish` clone must receive the source and production site.

## Command

From the authoring directory:

```powershell
.\scripts\sync-publish.ps1
```

The default destination is the sibling directory `..\ECCV2026-publish`. Use `-PublishPath` for another location. The script builds unless `-SkipBuild` is supplied, verifies the destination is a Git checkout, copies source/configuration/documentation and reusable skills, then copies `dist/` contents into the destination root for GitHub Pages.

For a complete publish preparation, use `scripts/publish-update.ps1`. It creates a branch when starting from `main`, runs synchronization, stages only intended website paths, and prints the staged diff:

```powershell
.\scripts\publish-update.ps1 -BranchName website/update-description -AllowDirtyPublish
```

After reviewing the staged diff, commit and push explicitly:

```powershell
.\scripts\publish-update.ps1 -BranchName website/update-description -AllowDirtyPublish -Commit -Push
```

The script refuses direct commits to `main`, requires `-Commit` with `-Push`, excludes the private tutorial and dependencies, and uses `git push -u origin HEAD`. A 403 response remains an account-permission or credential-manager issue.

## Safety

The script refuses a dirty publishing clone unless `-AllowDirtyPublish` is supplied. That switch permits synchronization over existing changes but never discards, commits, or pushes them. Pull `main` and create a branch before a normal publishing session.

Use this order before staging:

```powershell
git switch main
git pull --ff-only origin main
git switch -c website/update-description
git branch --show-current
```

After committing, use `git push -u origin HEAD`. This prevents a refspec error when an example branch name does not match the current local branch.

The script excludes `PRIVATE_WEBSITE_UPDATE_TUTORIAL.md`, `node_modules/`, and `.DS_Store` files. It must not receive credentials through parameters or environment files.

## Review

After synchronization, run in the publishing clone:

```powershell
git status
git diff --stat
git diff -- src/data/workshopData.js src/styles.css README.md
```

Only a human should decide whether to commit, push, open a pull request, or merge.
