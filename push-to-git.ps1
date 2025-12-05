# Push main branch to GitHub

Write-Host "=== Pushing to GitHub ===" -ForegroundColor Cyan
Write-Host ""

# Check if we're on main
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "Current branch: $currentBranch" -ForegroundColor Yellow

if ($currentBranch -ne "main") {
    Write-Host "Switching to main branch..." -ForegroundColor Yellow
    git checkout main
}

# Check remote
Write-Host ""
Write-Host "Checking remote configuration..." -ForegroundColor Yellow
$remote = git remote get-url origin 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "No remote 'origin' found!" -ForegroundColor Red
    Write-Host "Please add your GitHub remote:" -ForegroundColor Yellow
    Write-Host "  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git" -ForegroundColor White
    exit 1
} else {
    Write-Host "Remote origin: $remote" -ForegroundColor Green
}

# Check if there are commits to push
Write-Host ""
Write-Host "Checking for commits to push..." -ForegroundColor Yellow
git fetch origin 2>&1 | Out-Null
$commitsAhead = git rev-list --count origin/main..HEAD 2>&1

if ($commitsAhead -match "fatal" -or $commitsAhead -eq "0") {
    Write-Host "No commits to push (or remote branch doesn't exist yet)" -ForegroundColor Yellow
} else {
    Write-Host "Commits ahead of origin/main: $commitsAhead" -ForegroundColor Yellow
}

# Push to remote
Write-Host ""
Write-Host "Pushing to origin/main..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Vercel should auto-deploy if connected to your GitHub repo." -ForegroundColor Cyan
    Write-Host "Check your Vercel dashboard: https://vercel.com" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ Push failed. Check the error above." -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "1. Not authenticated with GitHub (use: git push -u origin main)" -ForegroundColor White
    Write-Host "2. Remote doesn't exist (add with: git remote add origin <url>)" -ForegroundColor White
    Write-Host "3. Need to pull first (use: git pull origin main --rebase)" -ForegroundColor White
}
