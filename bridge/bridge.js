const http = require("http");

const CLOUD_URL = process.env.PANEL_CLOUD_URL;
const BRIDGE_SECRET = process.env.BRIDGE_SECRET;
const VMIX_HOST = process.env.VMIX_HOST || "127.0.0.1";
const VMIX_PORT = Number(process.env.VMIX_PORT || 8088);
const LOCAL_PANEL_HOST = process.env.LOCAL_PANEL_HOST || "127.0.0.1";
const LOCAL_PANEL_PORT = Number(process.env.LOCAL_PANEL_PORT || 3005);
const monitorRequests = new Map();

if (!CLOUD_URL || !BRIDGE_SECRET) {
  console.error("Faltan PANEL_CLOUD_URL o BRIDGE_SECRET.");
  process.exit(1);
}

function vmixRequest(url) {
  return new Promise((resolve) => {
    const incomingUrl = new URL(url, "http://panel.local");
    const vmixPath = `/api/${incomingUrl.search}`;
    const req = http.request(
      {
        host: VMIX_HOST,
        port: VMIX_PORT,
        method: "GET",
        path: vmixPath,
        timeout: 7000
      },
      (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode || 200,
            contentType: res.headers["content-type"] || "text/plain; charset=utf-8",
            body: Buffer.concat(chunks).toString("base64")
          });
        });
      }
    );

    req.on("timeout", () => {
      req.destroy();
      resolve({ error: "Timeout conectando con vMix local." });
    });
    req.on("error", (error) => {
      resolve({ error: `No pude conectar con vMix local: ${error.message}` });
    });
    req.end();
  });
}

function bridgeUrl() {
  const url = new URL(CLOUD_URL);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = "/bridge";
  url.search = `?token=${encodeURIComponent(BRIDGE_SECRET)}`;
  return url.toString();
}

function startMonitorStream(socket, id, streamPath) {
  const req = http.request(
    {
      host: LOCAL_PANEL_HOST,
      port: LOCAL_PANEL_PORT,
      method: "GET",
      path: streamPath,
      timeout: 7000
    },
    (res) => {
      res.on("data", (chunk) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: "monitor-chunk", id, body: chunk.toString("base64") }));
        }
      });
      res.on("end", () => {
        monitorRequests.delete(id);
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: "monitor-end", id }));
        }
      });
    }
  );

  monitorRequests.set(id, req);
  req.on("timeout", () => req.destroy());
  req.on("error", () => {
    monitorRequests.delete(id);
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "monitor-end", id }));
    }
  });
  req.end();
}

function connect() {
  const socket = new WebSocket(bridgeUrl());

  socket.addEventListener("open", () => {
    console.log(`Bridge TELEFEDERAL conectado a ${CLOUD_URL}`);
  });

  socket.addEventListener("message", async (event) => {
    let message;
    try {
      message = JSON.parse(event.data.toString("utf8"));
    } catch (error) {
      return;
    }

    if (message.type === "vmix") {
      const result = await vmixRequest(message.url);
      socket.send(JSON.stringify({ type: "vmix-response", id: message.id, ...result }));
    }
    if (message.type === "monitor") {
      startMonitorStream(socket, message.id, message.path);
    }
    if (message.type === "monitor-cancel") {
      const request = monitorRequests.get(message.id);
      if (request) request.destroy();
      monitorRequests.delete(message.id);
    }
  });

  socket.addEventListener("close", () => {
    monitorRequests.forEach((request) => request.destroy());
    monitorRequests.clear();
    console.log("Bridge desconectado. Reintentando...");
    setTimeout(connect, 2500);
  });

  socket.addEventListener("error", () => {
    console.error("Bridge error.");
  });
}

connect();
