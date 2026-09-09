Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"

Add-Type @"
using System;
using System.Runtime.InteropServices;
public class TeleFederalControlWindow {
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
  [TeleFederalControlWindow]::keybd_event($vk, $scan, 0, [UIntPtr]::Zero)
  Start-Sleep -Milliseconds $holdMs
  [TeleFederalControlWindow]::keybd_event($vk, $scan, 0x0002, [UIntPtr]::Zero)
}

function Send-ShiftKey([byte]$vk, [byte]$scan) {
  [TeleFederalControlWindow]::keybd_event(0x10, 0x2A, 0, [UIntPtr]::Zero)
  Start-Sleep -Milliseconds 70
  Send-Key $vk $scan
  Start-Sleep -Milliseconds 70
  [TeleFederalControlWindow]::keybd_event(0x10, 0x2A, 0x0002, [UIntPtr]::Zero)
}

function Invoke-PremiereTransport([string]$action) {
  $premiere = Get-Process | Where-Object {
    $_.MainWindowHandle -ne 0 -and ($_.MainWindowTitle -match "Premiere Pro" -or $_.ProcessName -match "Adobe Premiere")
  } | Select-Object -First 1

  if (-not $premiere) {
    throw "No encuentro Premiere abierto."
  }

  [TeleFederalControlWindow]::ShowWindow($premiere.MainWindowHandle, 9) | Out-Null
  Start-Sleep -Milliseconds 100
  [TeleFederalControlWindow]::BringWindowToTop($premiere.MainWindowHandle) | Out-Null
  [TeleFederalControlWindow]::SetActiveWindow($premiere.MainWindowHandle) | Out-Null
  [TeleFederalControlWindow]::SetFocus($premiere.MainWindowHandle) | Out-Null
  [TeleFederalControlWindow]::SetForegroundWindow($premiere.MainWindowHandle) | Out-Null
  Start-Sleep -Milliseconds 500

  Send-ShiftKey 0x33 0x04
  Start-Sleep -Milliseconds 250

  if ($action -eq "stop") {
    Send-Key 0x4B 0x25
  } else {
    Send-Key 0x4B 0x25
    Start-Sleep -Milliseconds 200
    Send-Key 0x4C 0x26
  }
}

$form = New-Object System.Windows.Forms.Form
$form.Text = "Premiere TELEFEDERAL"
$form.Size = New-Object System.Drawing.Size(280, 116)
$form.StartPosition = "Manual"
$form.Location = New-Object System.Drawing.Point(40, 80)
$form.TopMost = $true
$form.BackColor = [System.Drawing.Color]::FromArgb(17, 23, 34)
$form.ForeColor = [System.Drawing.Color]::White
$form.FormBorderStyle = "FixedToolWindow"

$status = New-Object System.Windows.Forms.Label
$status.Text = "Control nativo Premiere"
$status.Location = New-Object System.Drawing.Point(12, 10)
$status.Size = New-Object System.Drawing.Size(250, 18)
$status.ForeColor = [System.Drawing.Color]::FromArgb(207, 199, 255)
$form.Controls.Add($status)

$play = New-Object System.Windows.Forms.Button
$play.Text = "Play"
$play.Location = New-Object System.Drawing.Point(12, 36)
$play.Size = New-Object System.Drawing.Size(118, 34)
$play.BackColor = [System.Drawing.Color]::FromArgb(52, 48, 71)
$play.ForeColor = [System.Drawing.Color]::White
$play.FlatStyle = "Flat"
$play.Add_Click({
  try {
    $status.Text = "Enviando Play..."
    Invoke-PremiereTransport "play"
    $status.Text = "Play enviado"
  } catch {
    $status.Text = $_.Exception.Message
  }
})
$form.Controls.Add($play)

$stop = New-Object System.Windows.Forms.Button
$stop.Text = "Stop"
$stop.Location = New-Object System.Drawing.Point(142, 36)
$stop.Size = New-Object System.Drawing.Size(118, 34)
$stop.BackColor = [System.Drawing.Color]::FromArgb(90, 38, 55)
$stop.ForeColor = [System.Drawing.Color]::White
$stop.FlatStyle = "Flat"
$stop.Add_Click({
  try {
    $status.Text = "Enviando Stop..."
    Invoke-PremiereTransport "stop"
    $status.Text = "Stop enviado"
  } catch {
    $status.Text = $_.Exception.Message
  }
})
$form.Controls.Add($stop)

[void]$form.ShowDialog()
