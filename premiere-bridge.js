const { execFile } = require("child_process");

const CLOUD_URL = process.env.PANEL_CLOUD_URL;
const BRIDGE_SECRET = process.env.BRIDGE_SECRET;
const RECONNECT_MS = 2500;

if (!CLOUD_URL || !BRIDGE_SECRET) {
  console.error("Faltan PANEL_CLOUD_URL o BRIDGE_SECRET.");
  process.exit(1);
}

function wsUrl() {
  const url = new URL(CLOUD_URL);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = "/premiere";
  url.search = `?token=${encodeURIComponent(BRIDGE_SECRET)}`;
  return url.toString();
}

function send(socket, message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
}

function runPowerShell(script) {
  return new Promise((resolve) => {
    execFile(
      "powershell.exe",
      ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", script],
      { windowsHide: true, timeout: 5000 },
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

async function playToggle() {
  const script = `
$ErrorActionPreference = 'Stop'
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class NativeWindow {
  [DllImport("user32.dll")]
  public static extern bool PostMessage(IntPtr hWnd, uint Msg, IntPtr wParam, IntPtr lParam);
}
"@
$premiere = Get-Process | Where-Object {
  $_.MainWindowHandle -ne 0 -and ($_.MainWindowTitle -match 'Premiere Pro' -or $_.ProcessName -match 'Adobe Premiere')
} | Select-Object -First 1
if (-not $premiere) { throw 'No encuentro una ventana abierta de Adobe Premiere Pro.' }
$wmKeyDown = 0x0100
$wmKeyUp = 0x0101
$vkSpace = 0x20
[NativeWindow]::PostMessage($premiere.MainWindowHandle, $wmKeyDown, [IntPtr]$vkSpace, [IntPtr]0) | Out-Null
Start-Sleep -Milliseconds 60
[NativeWindow]::PostMessage($premiere.MainWindowHandle, $wmKeyUp, [IntPtr]$vkSpace, [IntPtr]0) | Out-Null
'Play/Pause enviado sin enfocar: ' + $premiere.MainWindowTitle
`;
  return runPowerShell(script);
}

function connect() {
  const socket = new WebSocket(wsUrl());

  socket.addEventListener("open", () => {
    console.log(`Bridge Premiere conectado a ${CLOUD_URL}`);
  });

  socket.addEventListener("message", async (event) => {
    let message;
    try {
      message = JSON.parse(event.data.toString("utf8"));
    } catch {
      return;
    }

    if (message.type !== "premiere-command") return;

    const result = message.command === "playToggle"
      ? await playToggle()
      : { ok: false, error: `Comando no soportado: ${message.command}` };

    send(socket, { type: "premiere-response", id: message.id, ...result });
  });

  socket.addEventListener("close", () => {
    console.log("Bridge Premiere desconectado. Reintentando...");
    setTimeout(connect, RECONNECT_MS);
  });

  socket.addEventListener("error", () => {
    console.error("Bridge Premiere error.");
  });
}

connect();
