# Merge to main and prepare for Vercel deployment

Write-Host "=== Ghost Hunt - Merge to Main & Deploy ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check current branch
Write-Host "Step 1: Checking current branch..." -ForegroundColor Yellow
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "Current branch: $currentBranch" -ForegroundColor Green

# Step 2: Check for uncommitted changes
Write-Host ""
Write-Host "Step 2: Checking for uncommitted changes..." -ForegroundColor Yellow
$status = git status --porcelain
if ($status) {
    Write-Host "Found uncommitted changes. Staging all changes..." -ForegroundColor Yellow
    git add -A
    $commitMessage = Read-Host "Enter commit message (or press Enter for default)"
    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        $commitMessage = "Update before merge to main"
    }
    git commit -m $commitMessage
    Write-Host "Changes committed." -ForegroundColor Green
} else {
    Write-Host "No uncommitted changes." -ForegroundColor Green
}

# Step 3: Switch to main branch
Write-Host ""
Write-Host "Step 3: Switching to main branch..." -ForegroundColor Yellow
git checkout main 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Main branch doesn't exist. Creating it..." -ForegroundColor Yellow
    git checkout -b main
}
Write-Host "On main branch." -ForegroundColor Green

# Step 4: Merge the previous branch (if not already on main)
if ($currentBranch -ne "main") {
    Write-Host ""
    Write-Host "Step 4: Merging $currentBranch into main..." -ForegroundColor Yellow
    git merge $currentBranch --no-edit
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Merge successful!" -ForegroundColor Green
    } else {
        Write-Host "Merge conflict detected! Please resolve manually." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host ""
    Write-Host "Step 4: Already on main branch, skipping merge." -ForegroundColor Yellow
}

# Step 5: Push to remote
Write-Host ""
Write-Host "Step 5: Pushing to remote..." -ForegroundColor Yellow
$pushRemote = Read-Host "Push to remote? (y/n, default: y)"
if ($pushRemote -ne "n") {
    git push origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Pushed to remote successfully!" -ForegroundColor Green
    } else {
        Write-Host "Push failed. You may need to set upstream: git push -u origin main" -ForegroundColor Yellow
    }
} else {
    Write-Host "Skipping push to remote." -ForegroundColor Yellow
}

# Step 6: Vercel deployment info
Write-Host ""
Write-Host "=== Vercel Deployment ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "If Vercel is connected to your GitHub repo, it will auto-deploy from main branch." -ForegroundColor Green
Write-Host ""
Write-Host "To manually trigger a deployment:" -ForegroundColor Yellow
Write-Host "1. Go to https://vercel.com" -ForegroundColor White
Write-Host "2. Select your project" -ForegroundColor White
Write-Host "3. Click 'Redeploy' or wait for auto-deploy" -ForegroundColor White
Write-Host ""
Write-Host "Or use Vercel CLI:" -ForegroundColor Yellow
Write-Host "  cd ghost-hunt" -ForegroundColor White
Write-Host "  vercel --prod" -ForegroundColor White
Write-Host ""

Write-Host "=== Done! ===" -ForegroundColor Cyan
