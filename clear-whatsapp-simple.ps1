# WhatsApp Desktop Backup Cleanup Script
Write-Host "WhatsApp Desktop Backup Cleanup Tool" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Define WhatsApp Desktop paths
$whatsappPath = "$env:USERPROFILE\AppData\Local\Packages\5319275A.WhatsAppDesktop_cv1g1gvanyjgm"
$sharedPath = "$whatsappPath\LocalState\shared"
$tempPath = "$whatsappPath\LocalState\tmp"
$tempStatePath = "$whatsappPath\TempState"

# Check if WhatsApp Desktop is installed
if (-not (Test-Path $whatsappPath)) {
    Write-Host "WhatsApp Desktop not found at: $whatsappPath" -ForegroundColor Red
    exit 1
}

Write-Host "WhatsApp Desktop found at: $whatsappPath" -ForegroundColor Green

# Calculate current storage usage
Write-Host "`nCurrent Storage Usage:" -ForegroundColor Yellow
$sharedSize = if (Test-Path $sharedPath) { (Get-ChildItem $sharedPath -Recurse | Measure-Object -Property Length -Sum).Sum } else { 0 }
$tempSize = if (Test-Path $tempPath) { (Get-ChildItem $tempPath -Recurse | Measure-Object -Property Length -Sum).Sum } else { 0 }
$tempStateSize = if (Test-Path $tempStatePath) { (Get-ChildItem $tempStatePath -Recurse | Measure-Object -Property Length -Sum).Sum } else { 0 }

$totalSize = $sharedSize + $tempSize + $tempStateSize
$totalSizeMB = [math]::Round($totalSize / 1MB, 2)
$totalSizeGB = [math]::Round($totalSize / 1GB, 2)

Write-Host "   Shared folder: $([math]::Round($sharedSize / 1MB, 2)) MB" -ForegroundColor White
Write-Host "   Temp folder: $([math]::Round($tempSize / 1MB, 2)) MB" -ForegroundColor White
Write-Host "   TempState folder: $([math]::Round($tempStateSize / 1MB, 2)) MB" -ForegroundColor White
Write-Host "   Total: $totalSizeMB MB ($totalSizeGB GB)" -ForegroundColor Yellow

# Ask for confirmation
Write-Host "`nWARNING: This will delete WhatsApp Desktop backup data!" -ForegroundColor Red
Write-Host "   - Media files (images, videos, documents)" -ForegroundColor Red
Write-Host "   - Temporary files" -ForegroundColor Red
Write-Host "   - Cache files" -ForegroundColor Red
Write-Host "   - This will NOT affect your WhatsApp account or messages" -ForegroundColor Green

$confirmation = Read-Host "`nDo you want to proceed? (y/N)"
if ($confirmation -ne "y" -and $confirmation -ne "Y") {
    Write-Host "Operation cancelled." -ForegroundColor Red
    exit 0
}

# Close WhatsApp Desktop if running
Write-Host "`nClosing WhatsApp Desktop if running..." -ForegroundColor Yellow
$whatsappProcesses = Get-Process -Name "WhatsApp" -ErrorAction SilentlyContinue
if ($whatsappProcesses) {
    $whatsappProcesses | Stop-Process -Force
    Start-Sleep -Seconds 2
    Write-Host "WhatsApp Desktop closed." -ForegroundColor Green
} else {
    Write-Host "WhatsApp Desktop is not running." -ForegroundColor Blue
}

# Function to safely delete files
function Remove-WhatsAppFiles {
    param(
        [string]$Path,
        [string]$Description
    )
    
    if (Test-Path $Path) {
        try {
            Write-Host "Clearing $Description..." -ForegroundColor Yellow
            $files = Get-ChildItem $Path -Recurse -Force
            $fileCount = $files.Count
            $size = ($files | Measure-Object -Property Length -Sum).Sum
            $sizeMB = [math]::Round($size / 1MB, 2)
            
            Remove-Item $Path -Recurse -Force
            Write-Host "Cleared $fileCount files ($sizeMB MB) from $Description" -ForegroundColor Green
            return $size
        }
        catch {
            Write-Host "Error clearing $Description : $($_.Exception.Message)" -ForegroundColor Red
            return 0
        }
    } else {
        Write-Host "$Description not found." -ForegroundColor Blue
        return 0
    }
}

# Clear different types of data
Write-Host "`nStarting cleanup process..." -ForegroundColor Cyan

$clearedSize = 0

# Clear temporary files
$clearedSize += Remove-WhatsAppFiles -Path $tempPath -Description "temporary files"

# Clear TempState files
$clearedSize += Remove-WhatsAppFiles -Path $tempStatePath -Description "TempState files"

# Clear shared media files (but keep essential files)
if (Test-Path $sharedPath) {
    Write-Host "Clearing media files from shared folder..." -ForegroundColor Yellow
    try {
        # Get all files in shared folder
        $sharedFiles = Get-ChildItem $sharedPath -Recurse -Force -File
        
        # Filter out essential files (keep settings, databases, etc.)
        $mediaFiles = $sharedFiles | Where-Object {
            $_.Extension -match '\.(jpg|jpeg|png|gif|bmp|mp4|avi|mov|wmv|flv|mkv|webm|mp3|wav|ogg|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|zip|rar|7z)$'
        }
        
        $mediaFileCount = $mediaFiles.Count
        $mediaSize = ($mediaFiles | Measure-Object -Property Length -Sum).Sum
        $mediaSizeMB = [math]::Round($mediaSize / 1MB, 2)
        
        if ($mediaFiles) {
            $mediaFiles | Remove-Item -Force
            Write-Host "Cleared $mediaFileCount media files ($mediaSizeMB MB)" -ForegroundColor Green
            $clearedSize += $mediaSize
        } else {
            Write-Host "No media files found to clear." -ForegroundColor Blue
        }
    }
    catch {
        Write-Host "Error clearing media files: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Summary
$clearedSizeMB = [math]::Round($clearedSize / 1MB, 2)
$clearedSizeGB = [math]::Round($clearedSize / 1GB, 2)

Write-Host "`nCleanup completed!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Storage freed: $clearedSizeMB MB ($clearedSizeGB GB)" -ForegroundColor Green

# Calculate remaining space
$remainingSize = $totalSize - $clearedSize
$remainingSizeMB = [math]::Round($remainingSize / 1MB, 2)
Write-Host "Remaining WhatsApp data: $remainingSizeMB MB" -ForegroundColor Yellow

Write-Host "`nTips:" -ForegroundColor Cyan
Write-Host "   - WhatsApp will recreate necessary files when you restart it" -ForegroundColor White
Write-Host "   - Your messages and contacts are safe (stored on WhatsApp servers)" -ForegroundColor White
Write-Host "   - Run this script periodically to keep storage usage low" -ForegroundColor White

Write-Host "`nYou can now restart WhatsApp Desktop!" -ForegroundColor Green



