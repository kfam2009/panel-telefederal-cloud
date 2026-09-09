const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const WebSocket = require("ws");

const PORT = Number(process.env.PORT || 3000);
const VMIX_HOST = process.env.VMIX_HOST || "127.0.0.1";
const VMIX_PORT = Number(process.env.VMIX_PORT || 8088);
const BRIDGE_SECRET = process.env.BRIDGE_SECRET || "";
const LOCAL_MONITOR_BASE = process.env.LOCAL_MONITOR_BASE || "http://127.0.0.1:3005";
const IS_REMOTE_VMIX = !["127.0.0.1", "localhost", "::1"].includes(VMIX_HOST.toLowerCase());
const PUBLIC_DIR = path.join(__dirname, "public");
const FFMPEG_PATH = resolveFfmpegPath();
const PREVIEW_SNAPSHOT_PATH = path.join(__dirname, "preview-live.jpg");
const PROGRAM_SNAPSHOT_PATH = path.join(__dirname, "program-live.jpg");
const PROGRAM_OUTPUT_SNAPSHOT_PATH = path.join(__dirname, "program-output-live.jpg");
const INPUT_SNAPSHOT_DIR = path.join(__dirname, "input-snapshots");
const GENERATED_DIR = path.join(PUBLIC_DIR, "generated");
const FLAP_CLOCK_IMAGE_PATH = path.join(GENERATED_DIR, "flap-hora-temperatura-live.png");
let bahiaWeatherCache = { at: 0, data: null };
const MONITOR_DEVICES = {
  program: process.env.PANEL_PROGRAM_DEVICE || process.env.VMIX_PROGRAM_DEVICE || "vMix Video",
  preview: process.env.PANEL_PREVIEW_DEVICE || process.env.VMIX_PREVIEW_DEVICE || "vMix Video External 2"
};
const ENABLE_MONITORS = process.env.ENABLE_PANEL_MONITORS !== "0";
const USE_VMIX_EXTERNAL = process.env.PANEL_MONITOR_SOURCE === "vmix-external";
const monitorStreams = new Map();
const bridgeClients = new Set();
const bridgeRequests = new Map();
const bridgeMonitorStreams = new Map();

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

function resolveFfmpegPath() {
  const candidates = [
    process.env.FFMPEG_PATH,
    path.join(__dirname, "runtime", "ffmpeg.exe"),
    path.join(__dirname, "tools", "ffmpeg.exe"),
    path.join(__dirname, "tools", "ffmpeg", "ffmpeg.exe"),
    "C:\\Users\\TodoTerreno\\Videos\\BAHIA FULL TALENT\\PANEL BAHIA FULL TALENT\\tools\\ffmpeg\\ffmpeg.exe",
    "C:\\Program Files\\DownloadHelper CoApp\\ffmpeg.exe",
    "ffmpeg.exe"
  ].filter(Boolean);

  return candidates.find((candidate) => {
    if (candidate === "ffmpeg.exe") {
      return true;
    }

    return fs.existsSync(candidate);
  }) || "ffmpeg.exe";
}

function send(res, statusCode, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function serveStatic(req, res) {
  const requestPath = new URL(req.url, `http://${req.headers.host}`).pathname;
  const relativePath = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
  const safePath = path.normalize(relativePath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(PUBLIC_DIR, safePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    send(res, 403, "Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 404, "Not found");
      return;
    }

    const ext = path.extname(filePath);
    send(res, 200, data, MIME_TYPES[ext] || "application/octet-stream");
  });
}

function servePanelConfig(res) {
  send(
    res,
    200,
    `window.PANEL_CONFIG = ${JSON.stringify({ monitorBase: BRIDGE_SECRET ? "" : LOCAL_MONITOR_BASE })};`,
    "text/javascript; charset=utf-8"
  );
}

function proxyVmix(req, res) {
  const incomingUrl = new URL(req.url, `http://${req.headers.host}`);
  const vmixPath = `/api/${incomingUrl.search}`;
  let didRespond = false;

  const sendOnce = (statusCode, body, contentType) => {
    if (didRespond || res.headersSent || res.writableEnded) {
      return;
    }

    didRespond = true;
    send(res, statusCode, body, contentType);
  };

  const proxyReq = http.request(
    {
      host: VMIX_HOST,
      port: VMIX_PORT,
      method: "GET",
      path: vmixPath,
      timeout: 5000
    },
    (proxyRes) => {
      const chunks = [];
      proxyRes.on("data", (chunk) => chunks.push(chunk));
      proxyRes.on("end", () => {
        if (didRespond || res.headersSent || res.writableEnded) {
          return;
        }

        didRespond = true;
        const body = Buffer.concat(chunks);
        res.writeHead(proxyRes.statusCode || 200, {
          "Content-Type": proxyRes.headers["content-type"] || "text/xml; charset=utf-8",
          "Cache-Control": "no-store"
        });
        res.end(body);
      });
    }
  );

  proxyReq.on("timeout", () => {
    proxyReq.destroy();
    sendOnce(504, "vMix API timeout");
  });

  proxyReq.on("error", () => {
    sendOnce(
      502,
      JSON.stringify({
        error: "No pude conectar con vMix.",
        host: VMIX_HOST,
        port: VMIX_PORT,
        hint: "Verifica que vMix este abierto y que Web Controller / API este activo."
      }),
      "application/json; charset=utf-8"
    );
  });

  proxyReq.end();
}

function proxyVmixViaBridge(req, res) {
  const bridge = getBridgeClient("control");

  if (!bridge || bridge.readyState !== WebSocket.OPEN) {
    send(
      res,
      502,
      JSON.stringify({
        error: "No hay bridge local conectado.",
        hint: "Abrir el Bridge TELEFEDERAL en la PC donde corre vMix."
      }),
      "application/json; charset=utf-8"
    );
    return;
  }

  const requestId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const timeout = setTimeout(() => {
    bridgeRequests.delete(requestId);
    send(res, 504, "Timeout esperando respuesta del bridge local.");
  }, 7000);

  bridgeRequests.set(requestId, { res, timeout });
  bridge.send(JSON.stringify({ type: "vmix", id: requestId, url: req.url }));
}

function completeBridgeRequest(message) {
  const pending = bridgeRequests.get(message.id);
  if (!pending) return;

  bridgeRequests.delete(message.id);
  clearTimeout(pending.timeout);

  if (message.error) {
    send(pending.res, 502, message.error);
    return;
  }

  const body = Buffer.from(message.body || "", "base64");
  send(pending.res, message.statusCode || 200, body, message.contentType || "text/plain; charset=utf-8");
}

function streamMonitorViaBridge(req, res, monitorName) {
  const bridge = getBridgeClient("monitor");

  if (!bridge || bridge.readyState !== WebSocket.OPEN) {
    send(res, 502, "No hay bridge local conectado para monitores.");
    return;
  }

  const requestId = `monitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  res.writeHead(200, {
    "Content-Type": "multipart/x-mixed-replace; boundary=ffmpeg",
    "Cache-Control": "no-store",
    "Connection": "close"
  });

  bridgeMonitorStreams.set(requestId, res);
  bridge.send(JSON.stringify({ type: "monitor", id: requestId, path: `/monitor/${monitorName}.mjpg` }));

  const close = () => {
    bridgeMonitorStreams.delete(requestId);
    if (bridge.readyState === WebSocket.OPEN) {
      bridge.send(JSON.stringify({ type: "monitor-cancel", id: requestId }));
    }
  };

  req.on("close", close);
  res.on("close", close);
}

function getBridgeClient(role) {
  for (const socket of bridgeClients) {
    if (socket.readyState === WebSocket.OPEN && socket.bridgeRole === role) {
      return socket;
    }
  }

  for (const socket of bridgeClients) {
    if (socket.readyState === WebSocket.OPEN) {
      return socket;
    }
  }

  return null;
}

function handleBridgeMonitorMessage(message) {
  const res = bridgeMonitorStreams.get(message.id);
  if (!res || res.destroyed) return;

  if (message.type === "monitor-chunk") {
    res.write(Buffer.from(message.body || "", "base64"));
    return;
  }

  if (message.type === "monitor-end") {
    bridgeMonitorStreams.delete(message.id);
    res.end();
  }
}

function handleBridgeBinaryMessage(data) {
  const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
  if (buffer.length < 3) return;

  const type = buffer[0];
  const idLength = buffer.readUInt16BE(1);
  const payloadOffset = 3 + idLength;
  if (buffer.length < payloadOffset) return;

  const id = buffer.subarray(3, payloadOffset).toString("utf8");
  const res = bridgeMonitorStreams.get(id);
  if (!res || res.destroyed) return;

  if (type === 1) {
    res.write(buffer.subarray(payloadOffset));
    return;
  }

  if (type === 2) {
    bridgeMonitorStreams.delete(id);
    res.end();
  }
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { timeout: 7000 }, (response) => {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`HTTP ${response.statusCode}`));
          return;
        }

        try {
          resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
        } catch (error) {
          reject(error);
        }
      });
    });

    request.on("timeout", () => {
      request.destroy();
      reject(new Error("Weather timeout"));
    });
    request.on("error", reject);
  });
}

async function serveBahiaWeather(res) {
  const now = Date.now();
  if (bahiaWeatherCache.data && now - bahiaWeatherCache.at < 180000) {
    send(res, 200, JSON.stringify(bahiaWeatherCache.data), "application/json; charset=utf-8");
    return;
  }

  try {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=-38.7196&longitude=-62.2724&current=temperature_2m,weather_code&timezone=America%2FArgentina%2FBuenos_Aires";
    const weather = await getJson(url);
    const data = {
      temperature: Number(weather.current?.temperature_2m),
      weatherCode: Number(weather.current?.weather_code),
      unit: weather.current_units?.temperature_2m || "°C",
      observedAt: weather.current?.time || ""
    };

    if (!Number.isFinite(data.temperature)) {
      throw new Error("Temperatura invalida");
    }

    bahiaWeatherCache = { at: now, data };
    send(res, 200, JSON.stringify(data), "application/json; charset=utf-8");
  } catch (error) {
    if (bahiaWeatherCache.data) {
      send(res, 200, JSON.stringify({ ...bahiaWeatherCache.data, stale: true }), "application/json; charset=utf-8");
      return;
    }

    send(res, 502, JSON.stringify({ error: "No pude obtener temperatura de Bahia Blanca." }), "application/json; charset=utf-8");
  }
}

function saveFlapClockImage(req, res) {
  const chunks = [];
  let total = 0;

  req.on("data", (chunk) => {
    total += chunk.length;
    if (total > 2_000_000) {
      req.destroy();
      return;
    }
    chunks.push(chunk);
  });

  req.on("end", async () => {
    try {
      const image = Buffer.concat(chunks);
      if (image.length < 8 || image[0] !== 0x89 || image[1] !== 0x50 || image[2] !== 0x4e || image[3] !== 0x47) {
        send(res, 400, "PNG invalido");
        return;
      }

      await fs.promises.mkdir(GENERATED_DIR, { recursive: true });
      await fs.promises.writeFile(FLAP_CLOCK_IMAGE_PATH, image);
      send(res, 200, JSON.stringify({ path: FLAP_CLOCK_IMAGE_PATH }), "application/json; charset=utf-8");
    } catch (error) {
      send(res, 500, "No pude guardar hora y temperatura.");
    }
  });

  req.on("error", () => send(res, 500, "No pude recibir hora y temperatura."));
}

function getVmixXml() {
  return new Promise((resolve, reject) => {
    const apiReq = http.request(
      {
        host: VMIX_HOST,
        port: VMIX_PORT,
        method: "GET",
        path: "/api/",
        timeout: 5000
      },
      (apiRes) => {
        const chunks = [];
        apiRes.on("data", (chunk) => chunks.push(chunk));
        apiRes.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      }
    );

    apiReq.on("timeout", () => {
      apiReq.destroy();
      reject(new Error("vMix API timeout"));
    });
    apiReq.on("error", reject);
    apiReq.end();
  });
}

function callVmixApi(apiPath) {
  return new Promise((resolve, reject) => {
    const apiReq = http.request(
      {
        host: VMIX_HOST,
        port: VMIX_PORT,
        method: "GET",
        path: apiPath,
        timeout: 5000
      },
      (apiRes) => {
        apiRes.resume();
        apiRes.on("end", resolve);
      }
    );

    apiReq.on("timeout", () => {
      apiReq.destroy();
      reject(new Error("vMix API timeout"));
    });
    apiReq.on("error", reject);
    apiReq.end();
  });
}

async function readFileWithRetry(filePath, retries = 8) {
  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      return await fs.promises.readFile(filePath);
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
  }

  return fs.promises.readFile(filePath);
}

async function servePreviewSnapshot(res) {
  try {
    const xml = await getVmixXml();
    const preview = xml.match(/<preview>([^<]+)<\/preview>/)?.[1];

    if (!preview) {
      send(res, 404, "Preview not found");
      return;
    }

    await callVmixApi(`/api/?Function=SnapshotInput&Input=${encodeURIComponent(preview)}&Value=${encodeURIComponent(PREVIEW_SNAPSHOT_PATH)}`);
    const image = await readFileWithRetry(PREVIEW_SNAPSHOT_PATH, 12);

    send(res, 200, image, "image/jpeg");
  } catch (error) {
    send(res, 502, "No pude generar snapshot de Preview");
  }
}

async function serveProgramSnapshot(res) {
  try {
    await callVmixApi(`/api/?Function=Snapshot&Value=${encodeURIComponent(PROGRAM_OUTPUT_SNAPSHOT_PATH)}`);
    const image = await readFileWithRetry(PROGRAM_OUTPUT_SNAPSHOT_PATH, 12);

    send(res, 200, image, "image/jpeg");
  } catch (error) {
    send(res, 502, "No pude generar snapshot de Program");
  }
}

async function serveInputSnapshot(req, res) {
  try {
    const requestPath = new URL(req.url, `http://${req.headers.host}`).pathname;
    const inputNumber = requestPath.match(/^\/snapshot\/input\/(\d+)\.jpg$/)?.[1];

    if (!inputNumber) {
      send(res, 404, "Input snapshot not found");
      return;
    }

    await fs.promises.mkdir(INPUT_SNAPSHOT_DIR, { recursive: true });

    const snapshotPath = path.join(INPUT_SNAPSHOT_DIR, `input-${inputNumber}.jpg`);

    await callVmixApi(`/api/?Function=SnapshotInput&Input=${encodeURIComponent(inputNumber)}&Value=${encodeURIComponent(snapshotPath)}`);
    const image = await readFileWithRetry(snapshotPath, 8);

    send(res, 200, image, "image/jpeg");
  } catch (error) {
    send(res, 502, "No pude generar snapshot del input");
  }
}

function ensureVmixExternal() {
  const requests = [
    "/api/?Function=StartExternal",
    "/api/?Function=SetOutput2&Value=Preview"
  ];

  requests.forEach((requestPath) => {
    const req = http.request(
      {
        host: VMIX_HOST,
        port: VMIX_PORT,
        method: "GET",
        path: requestPath,
        timeout: 2000
      },
      (apiRes) => apiRes.resume()
    );

    req.on("error", () => {});
    req.on("timeout", () => req.destroy());
    req.end();
  });
}

function streamMonitor(req, res, monitorName) {
  if (!ENABLE_MONITORS) {
    send(res, 204, "");
    return;
  }

  const device = MONITOR_DEVICES[monitorName];

  if (!device) {
    send(res, 404, "Monitor not found");
    return;
  }

  if (USE_VMIX_EXTERNAL) {
    ensureVmixExternal();
  }

  res.writeHead(200, {
    "Content-Type": "multipart/x-mixed-replace; boundary=ffmpeg",
    "Cache-Control": "no-store",
    "Connection": "close"
  });

  const stream = getSharedMonitorStream(monitorName, device);
  stream.clients.add(res);

  if (stream.lastChunk) {
    res.write(stream.lastChunk);
  }

  const removeClient = () => {
    stream.clients.delete(res);
  };

  req.on("close", removeClient);
  res.on("close", removeClient);
}

function serveMonitorFrame(res, monitorName) {
  if (!ENABLE_MONITORS) {
    send(res, 204, "");
    return;
  }

  const device = MONITOR_DEVICES[monitorName];

  if (!device) {
    send(res, 404, "Monitor not found");
    return;
  }

  if (USE_VMIX_EXTERNAL) {
    ensureVmixExternal();
  }
  const stream = getSharedMonitorStream(monitorName, device);

  if (!stream.lastJpeg) {
    send(res, 204, "");
    return;
  }

  send(res, 200, stream.lastJpeg, "image/jpeg");
}

function extractJpeg(chunk) {
  const start = chunk.indexOf(Buffer.from([0xff, 0xd8]));
  const end = chunk.lastIndexOf(Buffer.from([0xff, 0xd9]));

  return start >= 0 && end > start ? chunk.subarray(start, end + 2) : null;
}

function getSharedMonitorStream(monitorName, device) {
  const existing = monitorStreams.get(monitorName);

  if (existing && !existing.process.killed) {
    return existing;
  }

  const stream = {
    clients: new Set(),
    lastChunk: null,
    lastJpeg: null,
    process: spawn(FFMPEG_PATH, [
      "-hide_banner",
      "-loglevel",
      "error",
      "-f",
      "dshow",
      "-rtbufsize",
      "128M",
      "-i",
      `video=${device}`,
      "-an",
      "-vf",
      "scale=854:480,fps=25",
      "-c:v",
      "mjpeg",
      "-q:v",
      "7",
      "-f",
      "mpjpeg",
      "pipe:1"
    ])
  };

  stream.process.stdout.on("data", (chunk) => {
    stream.lastChunk = chunk;
    const jpeg = extractJpeg(chunk);
    if (jpeg) {
      stream.lastJpeg = jpeg;
    }
    stream.clients.forEach((client) => {
      if (!client.destroyed) {
        client.write(chunk);
      }
    });
  });

  stream.process.stderr.on("data", (chunk) => {
    console.error(`[${monitorName}] ${chunk}`);
  });

  stream.process.on("error", (error) => {
    monitorStreams.delete(monitorName);
    stream.clients.forEach((client) => {
      if (!client.destroyed) {
        client.end(`No pude iniciar monitor ${monitorName}: ${error.message}`);
      }
    });
  });

  stream.process.on("exit", () => {
    monitorStreams.delete(monitorName);
    stream.clients.forEach((client) => {
      if (!client.destroyed) {
        client.end();
      }
    });
  });

  monitorStreams.set(monitorName, stream);
  return stream;
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/panel-config.js")) {
    servePanelConfig(res);
    return;
  }

  if (BRIDGE_SECRET && req.url.startsWith("/monitor/program.mjpg")) {
    streamMonitorViaBridge(req, res, "program");
    return;
  }

  if (BRIDGE_SECRET && req.url.startsWith("/monitor/preview.mjpg")) {
    streamMonitorViaBridge(req, res, "preview");
    return;
  }

  if (IS_REMOTE_VMIX && req.url.startsWith("/monitor/")) {
    send(res, 204, "");
    return;
  }

  if (req.url.startsWith("/monitor/program.mjpg")) {
    streamMonitor(req, res, "program");
    return;
  }

  if (req.url.startsWith("/monitor/program-frame.jpg")) {
    serveMonitorFrame(res, "program");
    return;
  }

  if (req.url.startsWith("/monitor/program.jpg")) {
    serveProgramSnapshot(res);
    return;
  }

  if (req.url.startsWith("/monitor/preview.jpg")) {
    servePreviewSnapshot(res);
    return;
  }

  if (req.url.startsWith("/monitor/preview.mjpg")) {
    streamMonitor(req, res, "preview");
    return;
  }

  if (req.url.startsWith("/monitor/preview-frame.jpg")) {
    serveMonitorFrame(res, "preview");
    return;
  }

  if (req.url.startsWith("/snapshot/input/")) {
    serveInputSnapshot(req, res);
    return;
  }

  if (req.url.startsWith("/weather/bahia")) {
    serveBahiaWeather(res);
    return;
  }

  if (req.method === "POST" && req.url.startsWith("/flap-clock-image")) {
    saveFlapClockImage(req, res);
    return;
  }

  if (req.url.startsWith("/vmix")) {
    if (BRIDGE_SECRET) {
      proxyVmixViaBridge(req, res);
    } else {
      proxyVmix(req, res);
    }
    return;
  }

  serveStatic(req, res);
});

const wss = new WebSocket.Server({ server, path: "/bridge" });

wss.on("connection", (socket, req) => {
  const bridgeUrl = new URL(req.url, `http://${req.headers.host}`);
  const token = bridgeUrl.searchParams.get("token") || "";

  if (!BRIDGE_SECRET || token !== BRIDGE_SECRET) {
    socket.close(1008, "Token invalido");
    return;
  }

  socket.bridgeRole = bridgeUrl.searchParams.get("role") || "control";
  bridgeClients.add(socket);

  socket.on("message", (data, isBinary) => {
    if (isBinary) {
      handleBridgeBinaryMessage(data);
      return;
    }

    try {
      const message = JSON.parse(data.toString("utf8"));
      if (message.type === "vmix-response") completeBridgeRequest(message);
      if (message.type === "monitor-chunk" || message.type === "monitor-end") handleBridgeMonitorMessage(message);
    } catch (error) {
      console.error(`Bridge message invalido: ${error.message}`);
    }
  });

  socket.on("close", () => {
    bridgeClients.delete(socket);
    bridgeMonitorStreams.forEach((res) => {
      if (!res.destroyed) res.end();
    });
    bridgeMonitorStreams.clear();
  });
});

server.listen(PORT, () => {
  console.log(`Panel vMix: http://localhost:${PORT}`);
  console.log(`API vMix: http://${VMIX_HOST}:${VMIX_PORT}/api/`);
});
