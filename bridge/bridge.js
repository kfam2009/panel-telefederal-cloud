const http = require("http");

const CLOUD_URL = process.env.PANEL_CLOUD_URL;
const BRIDGE_SECRET = process.env.BRIDGE_SECRET;
const VMIX_HOST = process.env.VMIX_HOST || "127.0.0.1";
const VMIX_PORT = Number(process.env.VMIX_PORT || 8088);

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

function connect() {
  const socket = new WebSocket(bridgeUrl());

  socket.on("open", () => {
    console.log(`Bridge TELEFEDERAL conectado a ${CLOUD_URL}`);
  });

  socket.on("message", async (data) => {
    let message;
    try {
      message = JSON.parse(data.toString("utf8"));
    } catch (error) {
      return;
    }

    if (message.type !== "vmix") return;
    const result = await vmixRequest(message.url);
    socket.send(JSON.stringify({ type: "vmix-response", id: message.id, ...result }));
  });

  socket.on("close", () => {
    console.log("Bridge desconectado. Reintentando...");
    setTimeout(connect, 2500);
  });

  socket.on("error", (error) => {
    console.error(`Bridge error: ${error.message}`);
  });
}

connect();
