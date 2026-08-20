[CmdletBinding()]
param(
    [string]$PublishPath = (Join-Path (Split-Path $PSScriptRoot -Parent) '..\ECCV2026-publish'),
    [switch]$SkipBuild,
    [switch]$AllowDirtyPublish
)

$ErrorActionPreference = 'Stop'
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
    $dirtyFiles = @(git status --porcelain)
    if ($dirtyFiles.Count -gt 0 -and -not $AllowDirtyPublish) {
        throw 'Publish clone has uncommitted changes. Review them or rerun with -AllowDirtyPublish.'
    }
}
finally {
    Pop-Location
}

$sourceDirectories = @('src', 'public', 'scripts', '.agents')
$sourceFiles = @('.gitignore', 'README.md', 'agent.md', 'package.json', 'package-lock.json', 'pnpm-lock.yaml', 'vite.config.js')

foreach ($directory in $sourceDirectories) {
    Copy-Item -LiteralPath (Join-Path $AuthoringPath $directory) -Destination $PublishPath -Recurse -Force
}

foreach ($file in $sourceFiles) {
    Copy-Item -LiteralPath (Join-Path $AuthoringPath $file) -Destination $PublishPath -Force
}

Copy-Item -Path (Join-Path $AuthoringPath 'dist\*') -Destination $PublishPath -Recurse -Force

Get-ChildItem -Path $PublishPath -Filter '.DS_Store' -Recurse -Force -ErrorAction SilentlyContinue | Remove-Item -Force

Write-Host "Synchronized authoring copy to $PublishPath"
Write-Host 'Review the publish clone with git status and git diff.'
Write-Host 'No commit or push was performed.'
