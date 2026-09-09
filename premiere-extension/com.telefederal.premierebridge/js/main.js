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

  function runCommand(command, callback) {
    var script = command === "stop"
      ? "telefederalStop()"
      : "telefederalPlay()";

    evalPremiere(script, function (result) {
      callback(result || "Sin respuesta de Premiere");
    });
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

  TARGETS.forEach(connect);
  updateStatus();
}());
