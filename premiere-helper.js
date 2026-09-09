const { execFile } = require("child_process");

const CLOUD_URL = process.env.PANEL_CLOUD_URL;
const PREMIERE_URLS = (process.env.PANEL_PREMIERE_URLS || CLOUD_URL || "")
  .split(/[;,]/)
  .map((item) => item.trim())
  .filter(Boolean);
const BRIDGE_SECRET = process.env.BRIDGE_SECRET;
const RECONNECT_MS = 2500;

if (!PREMIERE_URLS.length || !BRIDGE_SECRET) {
  console.error("Faltan PANEL_CLOUD_URL/PANEL_PREMIERE_URLS o BRIDGE_SECRET.");
  process.exit(1);
}

function wsUrl(baseUrl) {
  const url = new URL(baseUrl);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = "/premiere";
  url.search = `?token=${encodeURIComponent(BRIDGE_SECRET)}&client=system`;
  return url.toString();
}

function send(socket, message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
}

function encodePowerShell(script) {
  return Buffer.from(script, "utf16le").toString("base64");
}

function runPowerShell(script) {
  return new Promise((resolve) => {
    execFile(
      "powershell.exe",
      ["-NoProfile", "-ExecutionPolicy", "Bypass", "-EncodedCommand", encodePowerShell(script)],
      { windowsHide: true, timeout: 6000 },
      (error, stdout, stderr) => {
        if (error) {
          resolve({ ok: false, error: (stderr || stdout || error.message).trim() });
          return;
        }

        resolve({ ok: true, message: (stdout || "OK").trim() });
      }
    );
  });
}

function shortcutScript(action) {
  const isStop = action === "stop";
  return `
$ErrorActionPreference = 'Stop'
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
  $_.MainWindowHandle -ne 0 -and ($_.MainWindowTitle -match 'Premiere Pro' -or $_.ProcessName -match 'Adobe Premiere')
} | Select-Object -First 1
if (-not $premiere) { throw 'No encuentro una ventana abierta de Adobe Premiere Pro.' }
$previous = [TeleFederalNativeWindow]::GetForegroundWindow()
$shell = New-Object -ComObject WScript.Shell
$shell.AppActivate($premiere.Id) | Out-Null
[TeleFederalNativeWindow]::SetForegroundWindow($premiere.MainWindowHandle) | Out-Null
Start-Sleep -Milliseconds 550
Send-ShiftKey 0x33 0x04
Start-Sleep -Milliseconds 260
${isStop ? "Send-Key 0x4B 0x25" : "Send-Key 0x4C 0x26"}
Start-Sleep -Milliseconds 180
if ($previous -ne [IntPtr]::Zero -and $previous -ne $premiere.MainWindowHandle) {
  [TeleFederalNativeWindow]::SetForegroundWindow($previous) | Out-Null
}
'Premiere ${isStop ? "Stop enviado por helper local K" : "Play enviado por helper local L"}.'
`;
}

async function runCommand(command) {
  return runPowerShell(shortcutScript(command === "stop" ? "stop" : "play"));
}

function connect(baseUrl) {
  const socket = new WebSocket(wsUrl(baseUrl));

  socket.addEventListener("open", () => {
    console.log(`Helper Premiere conectado a ${baseUrl}`);
  });

  socket.addEventListener("message", async (event) => {
    let message;
    try {
      message = JSON.parse(event.data.toString("utf8"));
    } catch {
      return;
    }

    if (message.type !== "premiere-command") return;

    const result = await runCommand(message.command);
    const stamp = new Date().toISOString();
    console.log(`${stamp} Premiere ${result.ok ? result.message : result.error}`);
    send(socket, { type: "premiere-response", id: message.id, ...result });
  });

  socket.addEventListener("close", () => {
    console.log(`Helper Premiere desconectado de ${baseUrl}. Reintentando...`);
    setTimeout(() => connect(baseUrl), RECONNECT_MS);
  });

  socket.addEventListener("error", () => {
    console.error("Helper Premiere error.");
  });
}

PREMIERE_URLS.forEach(connect);
