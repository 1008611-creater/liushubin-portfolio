# ============================================================
# Resume Website One-Click Start Script v1.0
# ============================================================
# Usage:
#   Method 1: Right-click script -> Run with PowerShell
#   Method 2: In PowerShell: .\resumestart.ps1
#   Method 3: powershell -ExecutionPolicy Bypass -File .\resumestart.ps1
# ============================================================

param(
    [int]$Port = 8080
)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Resume Website Start Script v1.0" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "[1/3] Checking port availability..." -ForegroundColor Green

function Test-PortInUse {
    param([int]$Port)
    $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    return ($null -ne $connections)
}

function Find-AvailablePort {
    param([int]$StartPort)
    $port = $StartPort
    while ($port -lt 65535) {
        if (-not (Test-PortInUse -Port $port)) {
            return $port
        }
        Write-Host "  Port $port is in use, trying next..." -ForegroundColor Yellow
        $port++
    }
    throw "Cannot find available port"
}

$availablePort = Find-AvailablePort -StartPort $Port
Write-Host "  Found available port: $availablePort" -ForegroundColor Green

Write-Host ""
Write-Host "[2/3] Starting local HTTP server..." -ForegroundColor Green

$pythonCmd = $null
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonCmd = "python"
} elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
    $pythonCmd = "python3"
} elseif (Get-Command py -ErrorAction SilentlyContinue) {
    $pythonCmd = "py"
}

$url = "http://localhost:$availablePort"

if ($pythonCmd) {
    Write-Host "  Using Python HTTP server" -ForegroundColor Green
    Write-Host "  Server URL: $url" -ForegroundColor Cyan
    
    Write-Host ""
    Write-Host "[3/3] Opening browser..." -ForegroundColor Green
    Start-Sleep -Seconds 1
    
    Start-Process $url
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  Server started!" -ForegroundColor Green
    Write-Host "  URL: $url" -ForegroundColor Yellow
    Write-Host "  Press Ctrl+C to stop" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    
    & $pythonCmd -m http.server $availablePort
} else {
    Write-Host "  Python not found, trying npx serve..." -ForegroundColor Yellow
    
    $npxCmd = Get-Command npx -ErrorAction SilentlyContinue
    
    if ($npxCmd) {
        Write-Host "  Using npx serve" -ForegroundColor Green
        Write-Host "  Server URL: $url" -ForegroundColor Cyan
        
        Write-Host ""
        Write-Host "[3/3] Opening browser..." -ForegroundColor Green
        Start-Sleep -Seconds 1
        
        Start-Process $url
        
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "  Server started!" -ForegroundColor Green
        Write-Host "  URL: $url" -ForegroundColor Yellow
        Write-Host "  Press Ctrl+C to stop" -ForegroundColor Yellow
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        
        & npx serve -l $availablePort
    } else {
        Write-Host "  ERROR: Python or npx not found!" -ForegroundColor Red
        Write-Host "  Please install Python or Node.js and try again." -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
}
