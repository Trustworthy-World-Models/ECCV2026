[CmdletBinding()]
param(
    [string]$PublishPath = (Join-Path (Split-Path $PSScriptRoot -Parent) '..\ECCV2026-publish'),
    [string]$BranchName = "website/update-$(Get-Date -Format 'yyyyMMdd-HHmm')",
    [string]$CommitMessage = 'Update ECCV website',
    [switch]$AllowDirtyPublish,
    [switch]$SkipBuild,
    [switch]$Commit,
    [switch]$Push
)

$ErrorActionPreference = 'Stop'
if ($Push -and -not $Commit) {
    throw 'Use -Commit together with -Push.'
}

$AuthoringPath = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$PublishPath = (Resolve-Path $PublishPath -ErrorAction Stop).Path

if (-not (Test-Path (Join-Path $PublishPath '.git'))) {
    throw "Publish path is not a Git checkout: $PublishPath"
}

if (-not $SkipBuild) {
    Push-Location $AuthoringPath
    try {
        npm run build
        if ($LASTEXITCODE -ne 0) {
            throw 'The authoring build failed; publishing was stopped.'
        }
    }
    finally {
        Pop-Location
    }
}

Push-Location $PublishPath
try {
    $currentBranch = (git branch --show-current).Trim()
    if ($currentBranch -eq 'main') {
        $existingBranch = git branch --list $BranchName
        if ($existingBranch) {
            git switch $BranchName
        }
        else {
            git switch -c $BranchName
        }
        $currentBranch = (git branch --show-current).Trim()
    }

    if (($Commit -or $Push) -and [string]::IsNullOrWhiteSpace($currentBranch)) {
        throw 'The publish clone is in detached HEAD state.'
    }

    if (($Commit -or $Push) -and $currentBranch -eq 'main') {
        throw 'Refusing to commit or push directly from main. Use -BranchName to create a publishing branch.'
    }

    $dirtyFiles = @(git status --porcelain)
    if ($dirtyFiles.Count -gt 0 -and -not $AllowDirtyPublish) {
        throw 'Publish clone has uncommitted changes. Review them or rerun with -AllowDirtyPublish.'
    }
}
finally {
    Pop-Location
}

& (Join-Path $PSScriptRoot 'sync-publish.ps1') -PublishPath $PublishPath -SkipBuild -AllowDirtyPublish

Push-Location $PublishPath
try {
    $stagePaths = @(
        '.gitignore', 'README.md', 'agent.md', '.agents',
        'src', 'public', 'scripts',
        'index.html', 'assets', 'bg.png', 'favicon.svg',
        'social-preview.png', 'social-preview.svg', 'sponsor.png',
        'package.json', 'package-lock.json', 'pnpm-lock.yaml', 'vite.config.js'
    )
    git add -A -- $stagePaths

    Write-Host "Prepared branch: $(git branch --show-current)"
    Write-Host '--- staged review ---'
    git status --short
    git diff --cached --check

    if (-not $Commit) {
        Write-Host 'Review the staged diff. No commit or push was performed.'
        return
    }

    git commit -m $CommitMessage
    if ($LASTEXITCODE -ne 0) {
        throw 'Commit failed.'
    }

    if ($Push) {
        git push -u origin HEAD
        if ($LASTEXITCODE -ne 0) {
            throw 'Push failed. Check GitHub write access and Git Credential Manager authentication.'
        }
        Write-Host 'Publish push completed.'
    }
    else {
        Write-Host 'Commit completed. No push was requested.'
    }
}
finally {
    Pop-Location
}
