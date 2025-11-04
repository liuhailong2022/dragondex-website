# Sync all changes from theme folder to source folder

Write-Host "Syncing HTML files..." -ForegroundColor Cyan
$htmlFiles = Get-ChildItem -Path "theme" -Filter "*.html"
foreach ($file in $htmlFiles) {
    Copy-Item -Path $file.FullName -Destination "source\$($file.Name)" -Force
    Write-Host "  Copied: $($file.Name)" -ForegroundColor Green
}

Write-Host "`nSyncing JS directory..." -ForegroundColor Cyan
if (Test-Path "theme\js") {
    Copy-Item -Path "theme\js\*" -Destination "source\js\" -Recurse -Force
    Write-Host "  JS files synced" -ForegroundColor Green
}

Write-Host "`nSyncing images directory..." -ForegroundColor Cyan
if (Test-Path "theme\images") {
    Copy-Item -Path "theme\images\*" -Destination "source\images\" -Recurse -Force
    Write-Host "  Images synced" -ForegroundColor Green
}

Write-Host "`nSyncing plugins directory..." -ForegroundColor Cyan
if (Test-Path "theme\plugins") {
    Copy-Item -Path "theme\plugins\*" -Destination "source\plugins\" -Recurse -Force
    Write-Host "  Plugins synced" -ForegroundColor Green
}

Write-Host "`n✅ Sync complete! All changes from theme folder have been synced to source folder." -ForegroundColor Green

