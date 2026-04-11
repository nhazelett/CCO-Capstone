# ============================================================================
#  CCO Capstone — first push to GitHub
#  Run this ONCE from inside the CCO Capstone folder on Windows.
#  After the first push, use normal git commands (git add / commit / push).
# ============================================================================

$ErrorActionPreference = "Stop"

# ---- EDIT THESE TWO LINES BEFORE RUNNING ----------------------------------
$GITHUB_USER = "nickhazelett"          # <-- your GitHub username
$REPO_NAME   = "cco-capstone"          # <-- the repo name you created on github.com
# ---------------------------------------------------------------------------

Write-Host ""
Write-Host "==> CCO Capstone first push" -ForegroundColor Cyan
Write-Host "    user: $GITHUB_USER"
Write-Host "    repo: $REPO_NAME"
Write-Host ""

# 1. Check we're in the right folder
if (-not (Test-Path "index.html") -or -not (Test-Path "js/engine.js")) {
    Write-Host "ERROR: run this from inside the CCO Capstone folder (where index.html lives)." -ForegroundColor Red
    exit 1
}

# 2. Nuke any broken .git folder left over from the sandbox
if (Test-Path ".git") {
    Write-Host "==> Removing old .git folder (sandbox leftover)..." -ForegroundColor Yellow
    # -Force recurses and handles read-only hooks/.git files that OneDrive flagged
    Remove-Item -Recurse -Force ".git"
}

# 3. Fresh init
Write-Host "==> git init" -ForegroundColor Cyan
git init -b main | Out-Null

# 4. Identity (local to this repo — won't touch your global config)
git config user.name  "Nick Hazelett"
git config user.email "nickhazelett@gmail.com"

# 5. Tell OneDrive to stop touching .git (best-effort, reduces sync drama)
try {
    attrib +H ".git" 2>$null
} catch {}

# 6. Stage everything (the .gitignore will exclude cruft)
Write-Host "==> git add ." -ForegroundColor Cyan
git add .

# 7. First commit
Write-Host "==> git commit" -ForegroundColor Cyan
$commitMessage = @"
Initial commit: CCO Capstone prototype v0.2.5

Browser-based training prototype for Air Force Contingency Contracting
Officer capstone exercise. Runs from file:// — no server, no install.

Features:
- Four views sharing one engine (index, startex, trainer, student, mobile PWA)
- Cross-window state sync via localStorage
- Inline content bundle (works from file:// without fetch())
- Theme split: trainer = AF blue/silver institutional,
  student = deployed-terminal amber, mobile stays neutral
- Mobile debug drawer for diagnosing sync/state issues

Scenario: Operation Iron Meridian, FOS Eagle Crest, Republic of Tarkana,
455 AEW (P). Six-contact phone roster, two scripted injects, one phone script.

Prototype intended for AFICC/KQ developer handoff — not production-ready.
"@

git commit -m $commitMessage | Out-Null

# 8. Wire up the remote
$remoteUrl = "https://github.com/$GITHUB_USER/$REPO_NAME.git"
Write-Host "==> git remote add origin $remoteUrl" -ForegroundColor Cyan
git remote add origin $remoteUrl

# 9. Push
Write-Host "==> git push -u origin main" -ForegroundColor Cyan
Write-Host "    (If this is your first push from this machine, you may be"
Write-Host "     prompted to log in to GitHub in a browser window.)"
Write-Host ""
git push -u origin main

Write-Host ""
Write-Host "==> Done. View your repo at: https://github.com/$GITHUB_USER/$REPO_NAME" -ForegroundColor Green
Write-Host ""
