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
using System.Collections.Generic;
using System.Runtime.InteropServices;
public class TeleFederalNativeWindow {
  public delegate bool EnumWindowProc(IntPtr hWnd, IntPtr lParam);
  [StructLayout(LayoutKind.Sequential)]
  public struct INPUT {
    public UInt32 type;
    public KEYBDINPUT ki;
  }
  [StructLayout(LayoutKind.Sequential)]
  public struct KEYBDINPUT {
    public UInt16 wVk;
    public UInt16 wScan;
    public UInt32 dwFlags;
    public UInt32 time;
    public IntPtr dwExtraInfo;
  }
  [DllImport("user32.dll")]
  public static extern bool EnumChildWindows(IntPtr hWndParent, EnumWindowProc lpEnumFunc, IntPtr lParam);
  [DllImport("user32.dll")]
  public static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")]
  public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")]
  public static extern bool BringWindowToTop(IntPtr hWnd);
  [DllImport("user32.dll")]
  public static extern IntPtr SetActiveWindow(IntPtr hWnd);
  [DllImport("user32.dll")]
  public static extern IntPtr SetFocus(IntPtr hWnd);
  [DllImport("user32.dll")]
  public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")]
  public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);
  [DllImport("kernel32.dll")]
  public static extern uint GetCurrentThreadId();
  [DllImport("user32.dll")]
  public static extern bool AttachThreadInput(uint idAttach, uint idAttachTo, bool fAttach);
  [DllImport("user32.dll")]
  public static extern void keybd_event(byte bVk, byte bScan, UInt32 dwFlags, UIntPtr dwExtraInfo);
  [DllImport("user32.dll", SetLastError=true)]
  public static extern UInt32 SendInput(UInt32 nInputs, INPUT[] pInputs, Int32 cbSize);
  [DllImport("user32.dll")]
  public static extern bool PostMessage(IntPtr hWnd, uint Msg, IntPtr wParam, IntPtr lParam);
}
"@

function Send-KeyLegacy([byte]$vk, [byte]$scan, [int]$holdMs = 90) {
  [TeleFederalNativeWindow]::keybd_event($vk, $scan, 0, [UIntPtr]::Zero)
  Start-Sleep -Milliseconds $holdMs
  [TeleFederalNativeWindow]::keybd_event($vk, $scan, 0x0002, [UIntPtr]::Zero)
}

function Send-KeyInput([UInt16]$vk) {
  $down = New-Object TeleFederalNativeWindow+INPUT
  $down.type = 1
  $down.ki.wVk = $vk
  $down.ki.wScan = 0
  $down.ki.dwFlags = 0
  $down.ki.time = 0
  $down.ki.dwExtraInfo = [IntPtr]::Zero
  $up = New-Object TeleFederalNativeWindow+INPUT
  $up.type = 1
  $up.ki.wVk = $vk
  $up.ki.wScan = 0
  $up.ki.dwFlags = 2
  $up.ki.time = 0
  $up.ki.dwExtraInfo = [IntPtr]::Zero
  [TeleFederalNativeWindow+INPUT[]]$inputs = @($down, $up)
  [TeleFederalNativeWindow]::SendInput(2, $inputs, [Runtime.InteropServices.Marshal]::SizeOf([type][TeleFederalNativeWindow+INPUT])) | Out-Null
}

function Send-ShiftKey([byte]$vk, [byte]$scan) {
  [TeleFederalNativeWindow]::keybd_event(0x10, 0x2A, 0, [UIntPtr]::Zero)
  Start-Sleep -Milliseconds 70
  Send-KeyLegacy $vk $scan
  Start-Sleep -Milliseconds 70
  [TeleFederalNativeWindow]::keybd_event(0x10, 0x2A, 0x0002, [UIntPtr]::Zero)
}

function Send-PostKey([IntPtr]$hWnd, [int]$vk, [int]$scan) {
  $wmKeyDown = 0x0100
  $wmKeyUp = 0x0101
  $down = [IntPtr](1 -bor ($scan -shl 16))
  $up = [IntPtr](1 -bor ($scan -shl 16) -bor (0xC0 -shl 24))
  [TeleFederalNativeWindow]::PostMessage($hWnd, $wmKeyDown, [IntPtr]$vk, $down) | Out-Null
  Start-Sleep -Milliseconds 70
  [TeleFederalNativeWindow]::PostMessage($hWnd, $wmKeyUp, [IntPtr]$vk, $up) | Out-Null
}

function Send-PostKeyBatch($targets, [int]$vk, [int]$scan) {
  $wmKeyDown = 0x0100
  $wmKeyUp = 0x0101
  $down = [IntPtr](1 -bor ($scan -shl 16))
  $up = [IntPtr](1 -bor ($scan -shl 16) -bor (0xC0 -shl 24))
  foreach ($target in $targets) {
    [TeleFederalNativeWindow]::PostMessage($target, $wmKeyDown, [IntPtr]$vk, $down) | Out-Null
  }
  Start-Sleep -Milliseconds 70
  foreach ($target in $targets) {
    [TeleFederalNativeWindow]::PostMessage($target, $wmKeyUp, [IntPtr]$vk, $up) | Out-Null
  }
}

function Get-PremiereTargets([IntPtr]$mainWindow) {
  $targets = New-Object 'System.Collections.Generic.List[IntPtr]'
  $targets.Add($mainWindow)
  $callback = [TeleFederalNativeWindow+EnumWindowProc]{
    param([IntPtr]$hWnd, [IntPtr]$lParam)
    $targets.Add($hWnd)
    return $true
  }
  [TeleFederalNativeWindow]::EnumChildWindows($mainWindow, $callback, [IntPtr]::Zero) | Out-Null
  return $targets
}

function Test-ForegroundPremiere([IntPtr]$hWnd) {
  [uint32]$foregroundPid = 0
  $foreground = [TeleFederalNativeWindow]::GetForegroundWindow()
  [TeleFederalNativeWindow]::GetWindowThreadProcessId($foreground, [ref]$foregroundPid) | Out-Null
  return ($foregroundPid -eq $premiere.Id)
}

$premiere = Get-Process | Where-Object {
  $_.MainWindowHandle -ne 0 -and ($_.MainWindowTitle -match 'Premiere Pro' -or $_.ProcessName -match 'Adobe Premiere')
} | Select-Object -First 1
if (-not $premiere) { throw 'No encuentro una ventana abierta de Adobe Premiere Pro.' }
$foregroundOk = Test-ForegroundPremiere $premiere.MainWindowHandle
$targets = Get-PremiereTargets $premiere.MainWindowHandle
Send-PostKeyBatch $targets 0x4B 0x25
Start-Sleep -Milliseconds 180
${isStop ? "Send-PostKeyBatch $targets 0x4B 0x25" : "Send-PostKeyBatch $targets 0x4C 0x26"}
Start-Sleep -Milliseconds 250
'Premiere ${isStop ? "Stop" : "Play"} enviado sin foco a ' + $targets.Count + ' ventanas. ForegroundPremiere=' + $foregroundOk + '. Ventana=' + $premiere.MainWindowTitle
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
