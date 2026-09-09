param(
  [string]$Url = "telefederal-premiere://play"
)

$ErrorActionPreference = "Stop"

$action = "play"
if ($Url -match "stop") {
  $action = "stop"
}

Add-Type @"
using System;
using System.Runtime.InteropServices;
public class TeleFederalProtocolWindow {
  [DllImport("user32.dll")]
  public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")]
  public static extern bool BringWindowToTop(IntPtr hWnd);
  [DllImport("user32.dll")]
  public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")]
  public static extern IntPtr SetActiveWindow(IntPtr hWnd);
  [DllImport("user32.dll")]
  public static extern IntPtr SetFocus(IntPtr hWnd);
  [DllImport("user32.dll")]
  public static extern void keybd_event(byte bVk, byte bScan, UInt32 dwFlags, UIntPtr dwExtraInfo);
}
"@

function Send-Key([byte]$vk, [byte]$scan, [int]$holdMs = 100) {
  [TeleFederalProtocolWindow]::keybd_event($vk, $scan, 0, [UIntPtr]::Zero)
  Start-Sleep -Milliseconds $holdMs
  [TeleFederalProtocolWindow]::keybd_event($vk, $scan, 0x0002, [UIntPtr]::Zero)
}

function Send-ShiftKey([byte]$vk, [byte]$scan) {
  [TeleFederalProtocolWindow]::keybd_event(0x10, 0x2A, 0, [UIntPtr]::Zero)
  Start-Sleep -Milliseconds 70
  Send-Key $vk $scan
  Start-Sleep -Milliseconds 70
  [TeleFederalProtocolWindow]::keybd_event(0x10, 0x2A, 0x0002, [UIntPtr]::Zero)
}

$premiere = Get-Process | Where-Object {
  $_.MainWindowHandle -ne 0 -and ($_.MainWindowTitle -match "Premiere Pro" -or $_.ProcessName -match "Adobe Premiere")
} | Select-Object -First 1

if (-not $premiere) {
  throw "No encuentro una ventana abierta de Adobe Premiere Pro."
}

[TeleFederalProtocolWindow]::ShowWindow($premiere.MainWindowHandle, 9) | Out-Null
Start-Sleep -Milliseconds 120
[TeleFederalProtocolWindow]::BringWindowToTop($premiere.MainWindowHandle) | Out-Null
[TeleFederalProtocolWindow]::SetActiveWindow($premiere.MainWindowHandle) | Out-Null
[TeleFederalProtocolWindow]::SetFocus($premiere.MainWindowHandle) | Out-Null
[TeleFederalProtocolWindow]::SetForegroundWindow($premiere.MainWindowHandle) | Out-Null
Start-Sleep -Milliseconds 550

Send-ShiftKey 0x33 0x04
Start-Sleep -Milliseconds 300

if ($action -eq "stop") {
  Send-Key 0x4B 0x25
  "Premiere Stop enviado por protocolo TELEFEDERAL."
} else {
  Send-Key 0x4B 0x25
  Start-Sleep -Milliseconds 220
  Send-Key 0x4C 0x26
  "Premiere Play enviado por protocolo TELEFEDERAL."
}
