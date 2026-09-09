const http = require("http");

const CLOUD_URL = process.env.PANEL_CLOUD_URL;
const BRIDGE_SECRET = process.env.BRIDGE_SECRET;
const VMIX_HOST = process.env.VMIX_HOST || "127.0.0.1";
const VMIX_PORT = Number(process.env.VMIX_PORT || 8088);
const LOCAL_PANEL_HOST = process.env.LOCAL_PANEL_HOST || "127.0.0.1";
const LOCAL_PANEL_PORT = Number(process.env.LOCAL_PANEL_PORT || 3005);
const MONITOR_RELAY_FPS = Number(process.env.MONITOR_RELAY_FPS || 12);
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

function bridgeUrl(role) {
  const url = new URL(CLOUD_URL);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = "/bridge";
  url.search = `?token=${encodeURIComponent(BRIDGE_SECRET)}&role=${encodeURIComponent(role)}`;
  return url.toString();
}

function sendMonitorPacket(socket, type, id, payload = Buffer.alloc(0)) {
  const idBuffer = Buffer.from(id, "utf8");
  if (idBuffer.length > 65535) return;

  const header = Buffer.alloc(3);
  header[0] = type;
  header.writeUInt16BE(idBuffer.length, 1);
  socket.send(Buffer.concat([header, idBuffer, payload]));
}

function requestLocalFrame(framePath) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: LOCAL_PANEL_HOST,
        port: LOCAL_PANEL_PORT,
        method: "GET",
        path: framePath,
        timeout: 1000
      },
      (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          if ((res.statusCode || 500) >= 400) {
            reject(new Error(`HTTP ${res.statusCode}`));
            return;
          }
          resolve(Buffer.concat(chunks));
        });
      }
    );

    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Timeout"));
    });
    req.on("error", reject);
    req.end();
  });
}

function startMonitorStream(socket, id, streamPath) {
  if (MONITOR_RELAY_FPS <= 0) return;
  const framePath = streamPath.replace(/\.mjpg(?:\?.*)?$/, "-frame.jpg");
  const delay = Math.max(33, Math.round(1000 / Math.max(1, MONITOR_RELAY_FPS)));
  const relay = { interval: null, inFlight: false, stopped: false };

  const sendFrame = async () => {
    if (relay.stopped || relay.inFlight || socket.readyState !== WebSocket.OPEN) return;
    if (socket.bufferedAmount > 512 * 1024) return;

    relay.inFlight = true;
    try {
      const jpeg = await requestLocalFrame(framePath);
      const header = Buffer.from(
        `--ffmpeg\r\nContent-Type: image/jpeg\r\nContent-Length: ${jpeg.length}\r\n\r\n`,
        "utf8"
      );
      sendMonitorPacket(socket, 1, id, Buffer.concat([header, jpeg, Buffer.from("\r\n")]));
    } catch {
    } finally {
      relay.inFlight = false;
    }
  };

  relay.interval = setInterval(sendFrame, delay);
  monitorRequests.set(id, {
    destroy() {
      relay.stopped = true;
      clearInterval(relay.interval);
    }
  });
  sendFrame();
}

function connect(role) {
  const socket = new WebSocket(bridgeUrl(role));

  socket.addEventListener("open", () => {
    console.log(`Bridge TELEFEDERAL ${role} conectado a ${CLOUD_URL}`);
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
    console.log(`Bridge ${role} desconectado. Reintentando...`);
    setTimeout(() => connect(role), 2500);
  });

  socket.addEventListener("error", () => {
    console.error(`Bridge ${role} error.`);
  });
}

connect("control");
if (MONITOR_RELAY_FPS > 0) connect("monitor");
