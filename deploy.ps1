# AIToolGuide.tech Auto Deploy Script
# This script automatically pushes code to GitHub using GitHub API

# GitHub Configuration
$GITHUB_TOKEN = "ghp_xxxxxxxxxxxxxxxxxxxx"  # Placeholder - will use alternative method
$GITHUB_OWNER = "qyang0163-ship-it"
$GITHUB_REPO = "aitoolguide.tech"
$GITHUB_BRANCH = "master"

# File paths to update
$files = @(
    @{ Path = "src/pages/index.astro"; LocalPath = "C:/Users/Administrator/Documents/GitHub/aitoolguide.tech/aitoolguide.tech-master/src/pages/index.astro" },
    @{ Path = "src/layouts/Layout.astro"; LocalPath = "C:/Users/Administrator/Documents/GitHub/aitoolguide.tech/aitoolguide.tech-master/src/layouts/Layout.astro" },
    @{ Path = "src/pages/tool/[tool].astro"; LocalPath = "C:/Users/Administrator/Documents/GitHub/aitoolguide.tech/aitoolguide.tech-master/src/pages/tool/[tool].astro" },
    @{ Path = "public/favicon.svg"; LocalPath = "C:/Users/Administrator/Documents/GitHub/aitoolguide.tech/aitoolguide.tech-master/public/favicon.svg" }
)

Write-Host "🚀 Starting AIToolGuide.tech deployment..." -ForegroundColor Green
Write-Host ""

# Function to encode file to base64
function Get-FileBase64($filePath) {
    $content = [System.IO.File]::ReadAllBytes($filePath)
    return [Convert]::ToBase64String($content)
}

# Function to get file SHA from GitHub
function Get-FileSHA($filePath) {
    $uri = "https://api.github.com/repos/$GITHUB_OWNER/$GITHUB_REPO/contents/$filePath`?ref=$GITHUB_BRANCH"
    try {
        $response = Invoke-RestMethod -Uri $uri -Method GET -Headers @{
            "User-Agent" = "AIToolGuide-Deploy"
            "Accept" = "application/vnd.github.v3+json"
        }
        return $response.sha
    } catch {
        return $null
    }
}

# Function to update file on GitHub
function Update-GitHubFile($filePath, $localPath, $message) {
    Write-Host "📄 Processing: $filePath" -ForegroundColor Cyan
    
    # Read file content
    $content = Get-FileBase64 $localPath
    if (-not $content) {
        Write-Host "⚠️  Skipping $filePath - file not found" -ForegroundColor Yellow
        return
    }
    
    # Get existing file SHA
    $sha = Get-FileSHA $filePath
    
    # Prepare API request
    $uri = "https://api.github.com/repos/$GITHUB_OWNER/$GITHUB_REPO/contents/$filePath"
    $body = @{
        message = $message
        content = $content
        branch = $GITHUB_BRANCH
    }
    
    if ($sha) {
        $body.sha = $sha
    }
    
    $jsonBody = $body | ConvertTo-Json
    
    try {
        $headers = @{
            "User-Agent" = "AIToolGuide-Deploy"
            "Accept" = "application/vnd.github.v3+json"
            "Content-Type" = "application/json"
        }
        
        if ($GITHUB_TOKEN -ne "ghp_xxxxxxxxxxxxxxxxxxxx") {
            $headers["Authorization"] = "token $GITHUB_TOKEN"
        }
        
        $response = Invoke-RestMethod -Uri $uri -Method PUT -Headers $headers -Body $jsonBody
        Write-Host "✅ Successfully updated: $filePath" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to update ${filePath}: $_" -ForegroundColor Red
    }
}

# Main execution
$commitMessage = "Day 1: 商业化首页改造 - 赚钱导向设计"

foreach ($file in $files) {
    Update-GitHubFile $file.Path $file.LocalPath $commitMessage
}

Write-Host ""
Write-Host "✨ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Check your site at: https://aitoolguide-tech.vercel.app" -ForegroundColor Blue
