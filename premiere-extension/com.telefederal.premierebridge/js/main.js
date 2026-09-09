(function () {
  "use strict";

  var SECRET = "tf-6pv5xj4n54oawhaekt81g8mtub2wk1";
  var TARGETS = [
    "ws://127.0.0.1:3005/premiere?token=" + encodeURIComponent(SECRET),
    "wss://panel-telefederal-cloud.onrender.com/premiere?token=" + encodeURIComponent(SECRET)
  ];
  var sockets = [];
  var statusEl = document.getElementById("status");
  var logEl = document.getElementById("log");
  var jsxLoaded = false;

  function log(message) {
    var line = new Date().toLocaleTimeString() + " " + message;
    logEl.textContent = line + "\n" + logEl.textContent;
  }

  function updateStatus() {
    var connected = sockets.some(function (socket) {
      return socket.readyState === WebSocket.OPEN;
    });
    statusEl.textContent = connected ? "Conectado al panel" : "Sin conexion con el panel";
    statusEl.className = connected ? "online" : "offline";
  }

  function evalPremiere(script, callback) {
    if (!window.__adobe_cep__ || !window.__adobe_cep__.evalScript) {
      callback("ERROR: Este panel debe correr dentro de Premiere.");
      return;
    }
    window.__adobe_cep__.evalScript(script, callback);
  }

  function extensionRoot() {
    var path = decodeURI(window.location.pathname || "");
    path = path.replace(/^\/([A-Za-z]:\/)/, "$1");
    path = path.replace(/\/index\.html$/i, "");
    return path;
  }

  function jsxPath() {
    return extensionRoot().replace(/\//g, "\\\\") + "\\\\jsx\\\\telefederal.jsx";
  }

  function loadJsx(callback) {
    var path = jsxPath().replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
    evalPremiere("$.evalFile(\"" + path + "\")", function (result) {
      jsxLoaded = true;
      if (callback) callback(result);
    });
  }

  function runCommand(command, callback) {
    var script = command === "stop"
      ? "telefederalStop()"
      : "telefederalPlay()";

    function execute() {
      evalPremiere(script, function (result) {
        result = result || "Sin respuesta de Premiere";
        if (result.indexOf("ERROR: Premiere recibio") === 0) {
          runShortcutFallback(command, function (fallbackResult) {
            callback(fallbackResult || result);
          });
          return;
        }
        callback(result);
      });
    }

    if (!jsxLoaded) loadJsx(execute);
    else execute();
  }

  function encodePowerShell(script) {
    var buffer = [];
    for (var i = 0; i < script.length; i += 1) {
      var code = script.charCodeAt(i);
      buffer.push(code & 0xff, code >> 8);
    }
    var binary = "";
    for (var j = 0; j < buffer.length; j += 1) binary += String.fromCharCode(buffer[j]);
    return btoa(binary);
  }

  function runShortcutFallback(command, callback) {
    if (typeof require !== "function") {
      callback("ERROR: Premiere recibio " + command + " pero no inicio reproduccion. Fallback de atajo no disponible.");
      return;
    }

    var childProcess = require("child_process");
    var key = command === "stop" ? "K" : "L";
    var script = [
      "$ErrorActionPreference = 'Stop'",
      "Add-Type @\"",
      "using System;",
      "using System.Runtime.InteropServices;",
      "public class NativeWindow {",
      "  [DllImport(\"user32.dll\")] public static extern IntPtr GetForegroundWindow();",
      "  [DllImport(\"user32.dll\")] public static extern bool SetForegroundWindow(IntPtr hWnd);",
      "  [DllImport(\"user32.dll\")] public static extern void keybd_event(byte bVk, byte bScan, UInt32 dwFlags, UIntPtr dwExtraInfo);",
      "}",
      "\"@",
      "function Send-Key([byte]$vk, [byte]$scan, [int]$holdMs = 90) {",
      "  [NativeWindow]::keybd_event($vk, $scan, 0, [UIntPtr]::Zero)",
      "  Start-Sleep -Milliseconds $holdMs",
      "  [NativeWindow]::keybd_event($vk, $scan, 0x0002, [UIntPtr]::Zero)",
      "}",
      "function Send-ShiftKey([byte]$vk, [byte]$scan) {",
      "  [NativeWindow]::keybd_event(0x10, 0x2A, 0, [UIntPtr]::Zero)",
      "  Start-Sleep -Milliseconds 60",
      "  Send-Key $vk $scan",
      "  Start-Sleep -Milliseconds 60",
      "  [NativeWindow]::keybd_event(0x10, 0x2A, 0x0002, [UIntPtr]::Zero)",
      "}",
      "$premiere = Get-Process | Where-Object { $_.MainWindowHandle -ne 0 -and ($_.MainWindowTitle -match 'Premiere Pro' -or $_.ProcessName -match 'Adobe Premiere') } | Select-Object -First 1",
      "if (-not $premiere) { throw 'No encuentro una ventana abierta de Adobe Premiere Pro.' }",
      "$previous = [NativeWindow]::GetForegroundWindow()",
      "$shell = New-Object -ComObject WScript.Shell",
      "$shell.AppActivate($premiere.Id) | Out-Null",
      "[NativeWindow]::SetForegroundWindow($premiere.MainWindowHandle) | Out-Null",
      "Start-Sleep -Milliseconds 450",
      "Send-ShiftKey 0x33 0x04",
      "Start-Sleep -Milliseconds 220",
      key === "K" ? "Send-Key 0x4B 0x25" : "Send-Key 0x4C 0x26",
      "Start-Sleep -Milliseconds 160",
      "if ($previous -ne [IntPtr]::Zero -and $previous -ne $premiere.MainWindowHandle) { [NativeWindow]::SetForegroundWindow($previous) | Out-Null }",
      "'" + (key === "K" ? "Premiere Stop enviado por atajo K." : "Premiere Play enviado por atajo L.") + "'"
    ].join("\\r\\n");

    childProcess.execFile(
      "powershell.exe",
      ["-NoProfile", "-ExecutionPolicy", "Bypass", "-EncodedCommand", encodePowerShell(script)],
      { windowsHide: true, timeout: 5000 },
      function (error, stdout, stderr) {
        if (error) {
          callback("ERROR: " + (stderr || error.message || String(error)).trim());
          return;
        }
        callback((stdout || "").trim() || "Premiere comando enviado por atajo.");
      }
    );
  }

  function normalizeCommand(command) {
    if (command === "stopFocus" || command === "stopBackground") return "stop";
    return "play";
  }

  function connect(url) {
    var socket = new WebSocket(url);
    sockets.push(socket);

    socket.onopen = function () {
      log("Conectado: " + url.replace(/\?.+$/, ""));
      updateStatus();
    };

    socket.onclose = function () {
      sockets = sockets.filter(function (item) { return item !== socket; });
      updateStatus();
      setTimeout(function () { connect(url); }, 2500);
    };

    socket.onerror = function () {
      updateStatus();
    };

    socket.onmessage = function (event) {
      var message;
      try {
        message = JSON.parse(event.data);
      } catch (error) {
        return;
      }

      if (message.type !== "premiere-command") return;

      runCommand(normalizeCommand(message.command), function (result) {
        var ok = result.indexOf("ERROR:") !== 0;
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({
            type: "premiere-response",
            id: message.id,
            ok: ok,
            message: ok ? result : undefined,
            error: ok ? undefined : result
          }));
        }
        log(result);
      });
    };
  }

  document.getElementById("playButton").onclick = function () {
    runCommand("play", log);
  };
  document.getElementById("stopButton").onclick = function () {
    runCommand("stop", log);
  };

  loadJsx(function (result) {
    log("JSX cargado: " + (result || "OK"));
  });
  TARGETS.forEach(connect);
  updateStatus();
}());
