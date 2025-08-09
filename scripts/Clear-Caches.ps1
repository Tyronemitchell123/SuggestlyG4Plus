[CmdletBinding()]
param(
  [switch]$Browsers,
  [switch]$Apps,
  [switch]$Servers,
  [switch]$Chrome,
  [switch]$Edge,
  [switch]$Firefox,
  [switch]$VSCode,
  [switch]$Npm,
  [switch]$Pip,
  [switch]$Redis,
  [string]$DjangoPath,
  [switch]$DryRun,
  [switch]$Check,
  [switch]$KillProcesses,
  [switch]$Yes
)

function Write-Log { param([string]$Msg) Write-Host "[clear] $Msg" }
function Remove-PathSafe {
  param([Parameter(ValueFromRemainingArguments=$true)][string[]]$Targets)
  foreach ($t in $Targets) {
    if ([string]::IsNullOrWhiteSpace($t)) { continue }
    $exists = Test-Path -LiteralPath $t -ErrorAction SilentlyContinue
    if (-not $exists) {
      $glob = Get-ChildItem -Path $t -ErrorAction SilentlyContinue
      if (-not $glob) { Write-Log "Skip (missing): $t"; continue }
      foreach ($g in $glob) { if (-not $DryRun) { Remove-Item -Recurse -Force -LiteralPath $g.FullName } ; Write-Log "Removed: $($g.FullName)" }
    } else {
      if (-not $DryRun) { Remove-Item -Recurse -Force -LiteralPath $t }
      Write-Log "Removed: $t"
    }
  }
}
function Confirm-Action { param([string]$Prompt)
  if ($Yes) { return $true }
  $r = Read-Host "$Prompt [y/N]"
  return $r -match '^[Yy]$'
}

if (-not ($Browsers -or $Apps -or $Servers -or $Chrome -or $Edge -or $Firefox -or $VSCode -or $Npm -or $Pip -or $Redis -or $DjangoPath)) {
  $Browsers = $true; $Apps = $true; $Servers = $true
}

if ($Browsers) { $Chrome=$true; $Edge=$true; $Firefox=$true }
if ($Apps) { $VSCode=$true; $Npm=$true; $Pip=$true }

function Stop-RunningProcesses {
  if (-not $KillProcesses) { return }
  Write-Log 'Killing running apps to avoid file locks'
  foreach ($n in 'chrome','msedge','firefox','Code') {
    Get-Process -Name $n -ErrorAction SilentlyContinue | ForEach-Object {
      if ($DryRun) { Write-Log "DRY: Stop-Process -Id $($_.Id)" } else { Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue }
    }
  }
}

# Browsers
function Clear-Chrome {
  $base = Join-Path $env:LOCALAPPDATA 'Google\Chrome\User Data'
  Remove-PathSafe "$base\*\Cache*" "$base\*\Code Cache*" "$base\*\GPUCache*"
}
function Clear-Edge {
  $base = Join-Path $env:LOCALAPPDATA 'Microsoft\Edge\User Data'
  Remove-PathSafe "$base\*\Cache*" "$base\*\Code Cache*" "$base\*\GPUCache*"
}
function Clear-Firefox {
  $profiles = Join-Path $env:APPDATA 'Mozilla\Firefox\Profiles\*\cache2\*'
  Remove-PathSafe $profiles
}

# Apps
function Clear-VSCode {
  Remove-PathSafe "$env:APPDATA\Code\Cache" "$env:APPDATA\Code\CachedData"
}
function Clear-Npm {
  if (Get-Command npm -ErrorAction SilentlyContinue) {
    Write-Log 'npm cache clean --force'; if (-not $DryRun) { npm cache clean --force | Out-Null }
    Write-Log 'npm cache verify'; if (-not $DryRun) { npm cache verify | Out-Null }
  } else { Write-Log 'Skip npm (not installed)' }
}
function Clear-Pip {
  if (Get-Command pip -ErrorAction SilentlyContinue) {
    if ($DryRun) { Write-Log 'DRY: pip cache purge' } else { pip cache purge | Out-Null }
  } else {
    Remove-PathSafe "$env:LOCALAPPDATA\pip\Cache" "$env:USERPROFILE\AppData\Local\pip\Cache"
  }
}

# Servers
function Clear-Redis {
  if (-not (Get-Command redis-cli -ErrorAction SilentlyContinue)) { Write-Log 'Skip Redis (redis-cli not found)'; return }
  if (Confirm-Action "About to run 'redis-cli FLUSHALL' (all DBs). Continue?") {
    Write-Log 'Flushing Redis (all DBs)'; if (-not $DryRun) { redis-cli FLUSHALL | Out-Null }
  } else { Write-Log 'Redis flush cancelled' }
}
function Clear-Django {
  param([string]$Path)
  if (-not $Path) { Write-Log 'Skip Django (no -DjangoPath)'; return }
  if (-not (Test-Path -LiteralPath (Join-Path $Path 'manage.py'))) { Write-Log "manage.py not found at: $Path"; return }
  Push-Location $Path
  try {
    if ($DryRun) { Write-Log "DRY: python manage.py shell -c 'from django.core.cache import cache; cache.clear()'" }
    else { python manage.py shell -c "from django.core.cache import cache; cache.clear(); print('Django cache cleared')" | Out-Null }
  } finally { Pop-Location }
}

function Test-CacheTargets {
  Write-Log 'Check: inspecting targets'
  $chromeBase = Join-Path $env:LOCALAPPDATA 'Google\Chrome\User Data'
  $edgeBase   = Join-Path $env:LOCALAPPDATA 'Microsoft\Edge\User Data'
  $ffCache    = Join-Path $env:APPDATA 'Mozilla\Firefox\Profiles\*\cache2\*'
  foreach ($p in "$chromeBase\*\Cache*","$edgeBase\*\Cache*","$ffCache","$env:APPDATA\Code\Cache","$env:APPDATA\Code\CachedData") {
    if (Get-ChildItem -Path $p -ErrorAction SilentlyContinue) { Write-Log "FOUND: $p" } else { Write-Log "MISS : $p" }
  }
  if (Get-Command npm -ErrorAction SilentlyContinue) { Write-Log 'FOUND: npm' } else { Write-Log 'MISS : npm' }
  if (Get-Command pip -ErrorAction SilentlyContinue) { Write-Log 'FOUND: pip' } else { Write-Log 'MISS : pip' }
  if (Get-Command redis-cli -ErrorAction SilentlyContinue) { Write-Log 'FOUND: redis-cli' } else { Write-Log 'MISS : redis-cli' }
}

Stop-RunningProcesses
if ($Check -or $DryRun -and $Check) { Test-CacheTargets; Write-Log 'Check complete.'; if ($Check) { return } }

if ($Chrome)  { Write-Log 'Chrome';  Clear-Chrome }
if ($Edge)    { Write-Log 'Edge';    Clear-Edge }
if ($Firefox) { Write-Log 'Firefox'; Clear-Firefox }
if ($VSCode)  { Write-Log 'VS Code'; Clear-VSCode }
if ($Npm)     { Write-Log 'npm';     Clear-Npm }
if ($Pip)     { Write-Log 'pip';     Clear-Pip }
if ($Redis -or $Servers) { if ($Redis) { Write-Log 'Redis'; Clear-Redis } }
if ($DjangoPath) { Write-Log 'Django'; Clear-Django -Path $DjangoPath }

Write-Log 'Done.'


