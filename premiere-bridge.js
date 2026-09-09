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
using System.Collections.Generic;
using System.Runtime.InteropServices;
public class NativeWindow {
  public delegate bool EnumWindowProc(IntPtr hWnd, IntPtr lParam);
  [DllImport("user32.dll")]
  public static extern bool EnumChildWindows(IntPtr hWndParent, EnumWindowProc lpEnumFunc, IntPtr lParam);
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
$downLParam = [IntPtr]0x00390001
$upLParam = [IntPtr]0xC0390001
$targets = New-Object 'System.Collections.Generic.List[IntPtr]'
$targets.Add($premiere.MainWindowHandle)
$callback = [NativeWindow+EnumWindowProc]{
  param([IntPtr]$hWnd, [IntPtr]$lParam)
  $targets.Add($hWnd)
  return $true
}
[NativeWindow]::EnumChildWindows($premiere.MainWindowHandle, $callback, [IntPtr]::Zero) | Out-Null
foreach ($target in $targets) {
  [NativeWindow]::PostMessage($target, $wmKeyDown, [IntPtr]$vkSpace, $downLParam) | Out-Null
}
Start-Sleep -Milliseconds 80
foreach ($target in $targets) {
  [NativeWindow]::PostMessage($target, $wmKeyUp, [IntPtr]$vkSpace, $upLParam) | Out-Null
}
'Play/Pause enviado sin enfocar a ' + $targets.Count + ' ventanas de Premiere: ' + $premiere.MainWindowTitle
`;
  return runPowerShell(script);
}

async function playToggleFocus() {
  const script = `
$ErrorActionPreference = 'Stop'
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class NativeWindow {
  [DllImport("user32.dll")]
  public static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")]
  public static extern bool SetForegroundWindow(IntPtr hWnd);
}
"@
$premiere = Get-Process | Where-Object {
  $_.MainWindowHandle -ne 0 -and ($_.MainWindowTitle -match 'Premiere Pro' -or $_.ProcessName -match 'Adobe Premiere')
} | Select-Object -First 1
if (-not $premiere) { throw 'No encuentro una ventana abierta de Adobe Premiere Pro.' }
$previous = [NativeWindow]::GetForegroundWindow()
$shell = New-Object -ComObject WScript.Shell
$shell.AppActivate($premiere.Id) | Out-Null
[NativeWindow]::SetForegroundWindow($premiere.MainWindowHandle) | Out-Null
Start-Sleep -Milliseconds 180
$shell.SendKeys('+3')
Start-Sleep -Milliseconds 120
$shell.SendKeys('{SPACE}')
Start-Sleep -Milliseconds 120
if ($previous -ne [IntPtr]::Zero -and $previous -ne $premiere.MainWindowHandle) {
  [NativeWindow]::SetForegroundWindow($previous) | Out-Null
}
'Play/Pause enviado enfocando momentaneamente Premiere: ' + $premiere.MainWindowTitle
`;
  return runPowerShell(script);
}

async function playForwardFocus() {
  const script = `
$ErrorActionPreference = 'Stop'
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class NativeWindow {
  [DllImport("user32.dll")]
  public static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")]
  public static extern bool SetForegroundWindow(IntPtr hWnd);
}
"@
$premiere = Get-Process | Where-Object {
  $_.MainWindowHandle -ne 0 -and ($_.MainWindowTitle -match 'Premiere Pro' -or $_.ProcessName -match 'Adobe Premiere')
} | Select-Object -First 1
if (-not $premiere) { throw 'No encuentro una ventana abierta de Adobe Premiere Pro.' }
$previous = [NativeWindow]::GetForegroundWindow()
$shell = New-Object -ComObject WScript.Shell
$shell.AppActivate($premiere.Id) | Out-Null
[NativeWindow]::SetForegroundWindow($premiere.MainWindowHandle) | Out-Null
Start-Sleep -Milliseconds 180
$shell.SendKeys('+3')
Start-Sleep -Milliseconds 120
$shell.SendKeys('k')
Start-Sleep -Milliseconds 70
$shell.SendKeys('l')
Start-Sleep -Milliseconds 120
if ($previous -ne [IntPtr]::Zero -and $previous -ne $premiere.MainWindowHandle) {
  [NativeWindow]::SetForegroundWindow($previous) | Out-Null
}
'Play enviado enfocando momentaneamente Timeline de Premiere: ' + $premiere.MainWindowTitle
`;
  return runPowerShell(script);
}

async function stopFocus() {
  const script = `
$ErrorActionPreference = 'Stop'
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class NativeWindow {
  [DllImport("user32.dll")]
  public static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")]
  public static extern bool SetForegroundWindow(IntPtr hWnd);
}
"@
$premiere = Get-Process | Where-Object {
  $_.MainWindowHandle -ne 0 -and ($_.MainWindowTitle -match 'Premiere Pro' -or $_.ProcessName -match 'Adobe Premiere')
} | Select-Object -First 1
if (-not $premiere) { throw 'No encuentro una ventana abierta de Adobe Premiere Pro.' }
$previous = [NativeWindow]::GetForegroundWindow()
$shell = New-Object -ComObject WScript.Shell
$shell.AppActivate($premiere.Id) | Out-Null
[NativeWindow]::SetForegroundWindow($premiere.MainWindowHandle) | Out-Null
Start-Sleep -Milliseconds 180
$shell.SendKeys('+3')
Start-Sleep -Milliseconds 120
$shell.SendKeys('k')
Start-Sleep -Milliseconds 120
if ($previous -ne [IntPtr]::Zero -and $previous -ne $premiere.MainWindowHandle) {
  [NativeWindow]::SetForegroundWindow($previous) | Out-Null
}
'Stop enviado enfocando momentaneamente Timeline de Premiere: ' + $premiere.MainWindowTitle
`;
  return runPowerShell(script);
}

function connect(baseUrl) {
  const socket = new WebSocket(wsUrl(baseUrl));

  socket.addEventListener("open", () => {
    console.log(`Bridge Premiere conectado a ${baseUrl}`);
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
      : message.command === "playToggleFocus"
        ? await playToggleFocus()
        : message.command === "playForwardFocus"
          ? await playForwardFocus()
          : message.command === "stopFocus"
            ? await stopFocus()
            : { ok: false, error: `Comando no soportado: ${message.command}` };

    const stamp = new Date().toISOString();
    console.log(`${stamp} Premiere ${result.ok ? result.message : result.error}`);
    send(socket, { type: "premiere-response", id: message.id, ...result });
  });

  socket.addEventListener("close", () => {
    console.log(`Bridge Premiere desconectado de ${baseUrl}. Reintentando...`);
    setTimeout(() => connect(baseUrl), RECONNECT_MS);
  });

  socket.addEventListener("error", () => {
    console.error("Bridge Premiere error.");
  });
}

PREMIERE_URLS.forEach(connect);
