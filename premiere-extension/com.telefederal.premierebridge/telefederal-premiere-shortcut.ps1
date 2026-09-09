param(
  [ValidateSet("play", "stop")]
  [string]$Action = "play"
)

$ErrorActionPreference = "Stop"

Add-Type @"
using System;
using System.Runtime.InteropServices;
public class TeleFederalNativeWindow {
  [DllImport("user32.dll")]
  public static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")]
  public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")]
  public static extern void keybd_event(byte bVk, byte bScan, UInt32 dwFlags, UIntPtr dwExtraInfo);
}
"@

function Send-Key([byte]$vk, [byte]$scan, [int]$holdMs = 90) {
  [TeleFederalNativeWindow]::keybd_event($vk, $scan, 0, [UIntPtr]::Zero)
  Start-Sleep -Milliseconds $holdMs
  [TeleFederalNativeWindow]::keybd_event($vk, $scan, 0x0002, [UIntPtr]::Zero)
}

function Send-ShiftKey([byte]$vk, [byte]$scan) {
  [TeleFederalNativeWindow]::keybd_event(0x10, 0x2A, 0, [UIntPtr]::Zero)
  Start-Sleep -Milliseconds 70
  Send-Key $vk $scan
  Start-Sleep -Milliseconds 70
  [TeleFederalNativeWindow]::keybd_event(0x10, 0x2A, 0x0002, [UIntPtr]::Zero)
}

$premiere = Get-Process | Where-Object {
  $_.MainWindowHandle -ne 0 -and ($_.MainWindowTitle -match "Premiere Pro" -or $_.ProcessName -match "Adobe Premiere")
} | Select-Object -First 1

if (-not $premiere) {
  throw "No encuentro una ventana abierta de Adobe Premiere Pro."
}

$previous = [TeleFederalNativeWindow]::GetForegroundWindow()
$shell = New-Object -ComObject WScript.Shell
$shell.AppActivate($premiere.Id) | Out-Null
[TeleFederalNativeWindow]::SetForegroundWindow($premiere.MainWindowHandle) | Out-Null
Start-Sleep -Milliseconds 550

Send-ShiftKey 0x33 0x04
Start-Sleep -Milliseconds 260

if ($Action -eq "stop") {
  Send-Key 0x4B 0x25
  $message = "Premiere Stop enviado por atajo K."
} else {
  Send-Key 0x4C 0x26
  $message = "Premiere Play enviado por atajo L."
}

Start-Sleep -Milliseconds 180
if ($previous -ne [IntPtr]::Zero -and $previous -ne $premiere.MainWindowHandle) {
  [TeleFederalNativeWindow]::SetForegroundWindow($previous) | Out-Null
}

$message
