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
const LU2_PUBLIC_DIR = path.join(PUBLIC_DIR, "lu2exteriores");
const LU2_ZOCALO_DATA_PATH = path.join(__dirname, "lu2-zocalos-data.json");
const LU2_ZOCALO_BACKUP_PATH = path.join(__dirname, "lu2-zocalos-data.backup.json");
const LU2_CLOCK_WEATHER_INPUT = "59";
const LU2_CLOCK_WEATHER_OVERLAY_SLOT = "3";
const LU2_CLOCK_WEATHER_FIELD = "TextBlock1.Text";
const LU2_CLOCK_WEATHER_EXTRA_FIELD = "TextBlock2.Text";
const LU2_CLOCK_WEATHER_INTERVAL_MS = 3000;
const LU2_PROGRAM_NAME_FIELDS = ["TextBlock1.Text", "TextBlock2.Text"];
const LU2_PROGRAM_NAME_DEFAULTS = {
  "60": "PANORAMA",
  "61": "ESTÁ TODO\nINVENTADO",
  "62": "TODO CAMPO",
  "63": "A LAS CHAPAS",
  "64": "ALLICA Y PRIETA",
  "65": "CIAO ITALIA",
  "66": "DUPLEX",
  "67": "ENTRETIEMPO",
  "68": "HERENCIA CRIOLLA",
  "69": "MÚSICA",
  "70": "NOCHE A NOCHE",
  "71": "NOTICIAS EN COMPAÑÍA",
  "72": "RADIOVISIÓN\nDEPORTIVA",
  "73": "LECTURA\nLA NUEVA",
  "74": "EL EXPRESO",
  "75": "LU2 AM FM",
  "76": "LA VOZ DEL CAMPO",
  "77": "INFORME DOS"
};
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
const MONITOR_WIDTH = Number(process.env.PANEL_MONITOR_WIDTH || 640);
const MONITOR_HEIGHT = Number(process.env.PANEL_MONITOR_HEIGHT || 360);
const MONITOR_FPS = Number(process.env.PANEL_MONITOR_FPS || 20);
const MONITOR_QUALITY = Number(process.env.PANEL_MONITOR_QUALITY || 10);
const ENABLE_MONITORS = process.env.ENABLE_PANEL_MONITORS !== "0";
const USE_VMIX_EXTERNAL = process.env.PANEL_MONITOR_SOURCE === "vmix-external";
const monitorStreams = new Map();
const bridgeClients = new Set();
const bridgeRequests = new Map();
const bridgeMonitorStreams = new Map();
const rtcViewers = new Map();
let rtcPublisher = null;
const premiereClients = new Set();
const premiereRequests = new Map();
let lu2BridgeCommandId = 0;
let lu2BridgeLastSeenAt = 0;
const lu2BridgeQueue = [];
const lu2BridgePollers = [];
const lu2BridgePending = new Map();
let lu2LastClockWeatherTemperature = "";
let lu2LastSentClockText = "";
let lu2LastSentTemperatureText = "";

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
  const panelRoutes = new Set([
    "/telefederal",
    "/telefederal/"
  ]);
  const relativePath = requestPath === "/" || panelRoutes.has(requestPath)
    ? "index.html"
    : requestPath.replace(/^\/+/, "");
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

function requestPathname(req) {
  return new URL(req.url, `http://${req.headers.host}`).pathname;
}

function lu2Pathname(req) {
  const pathname = requestPathname(req);
  if (pathname === "/lu2exteriores") return "/";
  if (pathname.startsWith("/lu2exteriores/")) return pathname.slice("/lu2exteriores".length) || "/";
  return pathname;
}

function serveLu2Static(req, res) {
  const requestPath = lu2Pathname(req);
  const relativePath = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
  const safePath = path.normalize(relativePath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(LU2_PUBLIC_DIR, safePath);

  if (!filePath.startsWith(LU2_PUBLIC_DIR)) {
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

function readJsonBody(req, maxBytes = 2 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > maxBytes) {
        reject(new Error("El contenido es demasiado grande."));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"));
      } catch {
        reject(new Error("JSON invalido."));
      }
    });
    req.on("error", reject);
  });
}

function readLu2ZocaloData() {
  if (!fs.existsSync(LU2_ZOCALO_DATA_PATH)) return null;
  const data = JSON.parse(fs.readFileSync(LU2_ZOCALO_DATA_PATH, "utf8"));
  return data && data.profiles && typeof data.profiles === "object" ? data : null;
}

function writeLu2ZocaloData(data) {
  const temporaryPath = `${LU2_ZOCALO_DATA_PATH}.tmp`;
  if (fs.existsSync(LU2_ZOCALO_DATA_PATH)) {
    fs.copyFileSync(LU2_ZOCALO_DATA_PATH, LU2_ZOCALO_BACKUP_PATH);
  }
  fs.writeFileSync(temporaryPath, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(temporaryPath, LU2_ZOCALO_DATA_PATH);
}

async function serveLu2Zocalos(req, res) {
  try {
    if (req.method === "GET") {
      const data = readLu2ZocaloData();
      send(res, data ? 200 : 404, JSON.stringify(data || { error: "Sin datos centrales" }), "application/json; charset=utf-8");
      return;
    }

    if (req.method !== "PUT") {
      send(res, 405, JSON.stringify({ error: "Metodo no permitido" }), "application/json; charset=utf-8");
      return;
    }

    const body = await readJsonBody(req);
    const allowedProfiles = ["general", "panorama", "inventado", "duplex", "noticias"];
    if (!allowedProfiles.includes(body.profile) || !Array.isArray(body.items)) {
      send(res, 400, JSON.stringify({ error: "Perfil o lista invalida" }), "application/json; charset=utf-8");
      return;
    }

    const cleanItems = body.items
      .filter((item) => item && typeof item === "object" && item.id && item.type && item.line)
      .map((item) => ({ id: String(item.id), type: String(item.type), line: String(item.line), text: String(item.text || "") }));
    let data = readLu2ZocaloData();
    if (!data) {
      data = { version: 1, profiles: {} };
      allowedProfiles.forEach((profile) => {
        data.profiles[profile] = cleanItems.map((item) => ({ ...item }));
      });
    }
    data.profiles[body.profile] = cleanItems;
    data.updatedAt = new Date().toISOString();
    writeLu2ZocaloData(data);
    send(res, 200, JSON.stringify(data), "application/json; charset=utf-8");
  } catch (error) {
    send(res, 500, JSON.stringify({ error: "No pude guardar los zocalos" }), "application/json; charset=utf-8");
  }
}

function lu2BridgeStatusPayload() {
  return {
    mode: "bridge",
    connected: Boolean(lu2BridgeLastSeenAt && Date.now() - lu2BridgeLastSeenAt < 45000),
    lastSeenAt: lu2BridgeLastSeenAt ? new Date(lu2BridgeLastSeenAt).toISOString() : null,
    queued: lu2BridgeQueue.length,
    pending: lu2BridgePending.size
  };
}

function dispatchLu2BridgeCommands() {
  while (lu2BridgeQueue.length && lu2BridgePollers.length) {
    const command = lu2BridgeQueue.shift();
    const poller = lu2BridgePollers.shift();
    clearTimeout(poller.timer);
    send(poller.res, 200, JSON.stringify(command), "application/json; charset=utf-8");
  }
}

function enqueueLu2BridgeCommand(pathname) {
  return new Promise((resolve, reject) => {
    const id = String(++lu2BridgeCommandId);
    const timeout = setTimeout(() => {
      lu2BridgePending.delete(id);
      reject(new Error("Bridge vMix timeout"));
    }, 12000);

    lu2BridgePending.set(id, { resolve, reject, timeout });
    lu2BridgeQueue.push({ id, path: pathname });
    dispatchLu2BridgeCommands();
  });
}

async function callLu2BridgeApi(apiPath) {
  await enqueueLu2BridgeCommand(apiPath);
}

async function getLu2VmixXml() {
  const result = await enqueueLu2BridgeCommand("/api/");
  return result.body.toString("utf8");
}

function decodeXmlText(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function textFieldFromInputXml(inputXml, fieldName) {
  const escapedName = fieldName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const fieldPattern = new RegExp(`<text[^>]*name=["']${escapedName}["'][^>]*>([\\s\\S]*?)<\\/text>`);
  return decodeXmlText(inputXml.match(fieldPattern)?.[1] || "").trim();
}

function isLu2ClockOrTemperatureText(value = "") {
  const normalized = value.trim();
  return /^\d{1,2}:\d{2}(?::\d{2})?$/.test(normalized)
    || /^-?\d+(?:[.,]\d+)?\s*°\s*C$/i.test(normalized)
    || /^\d{1,2}:\d{2}\s+-?\d+(?:[.,]\d+)?\s*°\s*C$/i.test(normalized);
}

function bahiaTimeText() {
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date());
}

async function getLu2BahiaWeatherData() {
  const now = Date.now();
  if (bahiaWeatherCache.data && now - bahiaWeatherCache.at < 180000) {
    return bahiaWeatherCache.data;
  }

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
  return data;
}

async function refreshLu2ClockWeatherInput() {
  if (!lu2BridgeLastSeenAt || Date.now() - lu2BridgeLastSeenAt > 45000) return;

  let temperature = lu2LastClockWeatherTemperature;

  try {
    const weather = await getLu2BahiaWeatherData();
    const roundedTemperature = Math.round(Number(weather.temperature) * 10) / 10;
    const temperatureText = Number.isInteger(roundedTemperature)
      ? String(roundedTemperature)
      : roundedTemperature.toFixed(1);
    temperature = `${temperatureText} °C`;
    lu2LastClockWeatherTemperature = temperature;
  } catch {}

  const clockText = bahiaTimeText();

  try {
    if (clockText !== lu2LastSentClockText) {
      await callLu2BridgeApi(`/api/?Function=SetText&Input=${LU2_CLOCK_WEATHER_INPUT}&SelectedName=${encodeURIComponent(LU2_CLOCK_WEATHER_FIELD)}&Value=${encodeURIComponent(clockText)}`);
      lu2LastSentClockText = clockText;
    }

    if (temperature && temperature !== lu2LastSentTemperatureText) {
      await callLu2BridgeApi(`/api/?Function=SetText&Input=${LU2_CLOCK_WEATHER_INPUT}&SelectedName=${encodeURIComponent(LU2_CLOCK_WEATHER_EXTRA_FIELD)}&Value=${encodeURIComponent(temperature)}`);
      lu2LastSentTemperatureText = temperature;
    }

    const vmixXml = await getLu2VmixXml();
    const overlayPattern = new RegExp(`<overlay\\s+number=["']${LU2_CLOCK_WEATHER_OVERLAY_SLOT}["'][^>]*>([^<]*)<\\/overlay>`);
    const currentOverlayInput = vmixXml.match(overlayPattern)?.[1]?.trim() || "";

    if (currentOverlayInput !== LU2_CLOCK_WEATHER_INPUT) {
      await callLu2BridgeApi(`/api/?Function=OverlayInput${LU2_CLOCK_WEATHER_OVERLAY_SLOT}In&Input=${LU2_CLOCK_WEATHER_INPUT}`);
    }
  } catch {}
}

async function enforceLu2ClockWeatherFields() {
  if (!lu2BridgeLastSeenAt || Date.now() - lu2BridgeLastSeenAt > 45000) return;

  try {
    const vmixXml = await getLu2VmixXml();
    const inputPattern = new RegExp(`<input[^>]*number=["']${LU2_CLOCK_WEATHER_INPUT}["'][^>]*>([\\s\\S]*?)<\\/input>`);
    const inputXml = vmixXml.match(inputPattern)?.[0] || "";

    if (inputXml) {
      const currentClock = textFieldFromInputXml(inputXml, LU2_CLOCK_WEATHER_FIELD);
      const currentTemperature = textFieldFromInputXml(inputXml, LU2_CLOCK_WEATHER_EXTRA_FIELD);
      const recoveredTemperature =
        currentTemperature.match(/-?\d+(?:[.,]\d+)?\s*°C/)?.[0] ||
        currentClock.match(/-?\d+(?:[.,]\d+)?\s*°C/)?.[0] ||
        lu2LastClockWeatherTemperature;
      const expectedClock = bahiaTimeText();

      if (recoveredTemperature) {
        lu2LastClockWeatherTemperature = recoveredTemperature;
      }

      if (currentClock !== expectedClock) {
        await callLu2BridgeApi(`/api/?Function=SetText&Input=${LU2_CLOCK_WEATHER_INPUT}&SelectedName=${encodeURIComponent(LU2_CLOCK_WEATHER_FIELD)}&Value=${encodeURIComponent(expectedClock)}`);
        lu2LastSentClockText = expectedClock;
      }

      if (lu2LastClockWeatherTemperature && currentTemperature !== lu2LastClockWeatherTemperature) {
        await callLu2BridgeApi(`/api/?Function=SetText&Input=${LU2_CLOCK_WEATHER_INPUT}&SelectedName=${encodeURIComponent(LU2_CLOCK_WEATHER_EXTRA_FIELD)}&Value=${encodeURIComponent(lu2LastClockWeatherTemperature)}`);
        lu2LastSentTemperatureText = lu2LastClockWeatherTemperature;
      }
    }

    for (const [programInput, expectedName] of Object.entries(LU2_PROGRAM_NAME_DEFAULTS)) {
      const programPattern = new RegExp(`<input[^>]*number=["']${programInput}["'][^>]*>([\\s\\S]*?)<\\/input>`);
      const programXml = vmixXml.match(programPattern)?.[0] || "";

      if (!programXml) continue;

      for (const fieldName of LU2_PROGRAM_NAME_FIELDS) {
        const currentValue = textFieldFromInputXml(programXml, fieldName);

        if (isLu2ClockOrTemperatureText(currentValue)) {
          await callLu2BridgeApi(`/api/?Function=SetText&Input=${programInput}&SelectedName=${encodeURIComponent(fieldName)}&Value=${encodeURIComponent(expectedName)}`);
        }
      }
    }
  } catch {}
}

function serveLu2BridgePoll(req, res) {
  lu2BridgeLastSeenAt = Date.now();

  if (lu2BridgeQueue.length) {
    const command = lu2BridgeQueue.shift();
    send(res, 200, JSON.stringify(command), "application/json; charset=utf-8");
    return;
  }

  const poller = {
    res,
    timer: setTimeout(() => {
      const index = lu2BridgePollers.indexOf(poller);
      if (index >= 0) lu2BridgePollers.splice(index, 1);
      send(res, 204, "");
    }, 25000)
  };

  lu2BridgePollers.push(poller);
  req.on("close", () => {
    const index = lu2BridgePollers.indexOf(poller);
    if (index >= 0) {
      clearTimeout(poller.timer);
      lu2BridgePollers.splice(index, 1);
    }
  });
}

async function serveLu2BridgeResult(req, res) {
  lu2BridgeLastSeenAt = Date.now();

  try {
    const body = await readJsonBody(req);
    const pending = lu2BridgePending.get(String(body.id || ""));

    if (!pending) {
      send(res, 404, JSON.stringify({ error: "Comando no encontrado" }), "application/json; charset=utf-8");
      return;
    }

    lu2BridgePending.delete(String(body.id));
    clearTimeout(pending.timeout);

    if (body.error) {
      pending.reject(new Error(String(body.error)));
    } else {
      pending.resolve({
        statusCode: Number(body.statusCode || 200),
        contentType: String(body.contentType || "text/xml; charset=utf-8"),
        body: Buffer.from(String(body.bodyBase64 || ""), "base64")
      });
    }

    send(res, 200, JSON.stringify({ ok: true }), "application/json; charset=utf-8");
  } catch (error) {
    send(res, 400, JSON.stringify({ error: error.message }), "application/json; charset=utf-8");
  }
}

function serveLu2BridgeStatus(req, res) {
  send(res, 200, JSON.stringify(lu2BridgeStatusPayload()), "application/json; charset=utf-8");
}

function proxyLu2Vmix(req, res) {
  const incomingUrl = new URL(req.url, `http://${req.headers.host}`);
  const query = incomingUrl.searchParams;
  const functionName = query.get("Function");
  const inputNumber = query.get("Input");
  const selectedName = query.get("SelectedName");
  const value = query.get("Value") || "";

  const isLegacyClockUpdate =
    functionName === "SetText" &&
    (inputNumber === LU2_CLOCK_WEATHER_INPUT || inputNumber === "60") &&
    (selectedName === LU2_CLOCK_WEATHER_FIELD || selectedName === LU2_CLOCK_WEATHER_EXTRA_FIELD) &&
    (/^\d{1,2}:\d{2}(\s+\d+\s*°C)?$/.test(value) || /^\d+\s*°C$/.test(value) || value === "");

  if (isLegacyClockUpdate) {
    send(res, 200, "");
    return;
  }

  if (
    functionName === "SetText" &&
    inputNumber === "60" &&
    (selectedName === "TextBlock1.Text" || selectedName === "TextBlock2.Text") &&
    (/^\d{1,2}:\d{2}(\s+\d+\s*°C)?$/.test(value) || /^\d+\s*°C$/.test(value) || value === "")
  ) {
    query.set("Input", LU2_CLOCK_WEATHER_INPUT);
  }

  const vmixPath = `/api/?${query.toString()}`;

  enqueueLu2BridgeCommand(vmixPath)
    .then((result) => {
      res.writeHead(result.statusCode, {
        "Content-Type": result.contentType,
        "Cache-Control": "no-store"
      });
      res.end(result.body);
    })
    .catch((error) => {
      send(res, 503, JSON.stringify({
        error: "Bridge vMix no disponible.",
        detail: error.message,
        bridge: lu2BridgeStatusPayload()
      }), "application/json; charset=utf-8");
    });
}

function serveLu2Route(req, res) {
  const pathname = lu2Pathname(req);

  if (pathname === "/data/zocalos") {
    serveLu2Zocalos(req, res);
    return;
  }

  if (pathname === "/bridge/poll") {
    serveLu2BridgePoll(req, res);
    return;
  }

  if (pathname === "/bridge/result") {
    serveLu2BridgeResult(req, res);
    return;
  }

  if (pathname === "/bridge/status") {
    serveLu2BridgeStatus(req, res);
    return;
  }

  if (pathname.startsWith("/vmix")) {
    proxyLu2Vmix(req, res);
    return;
  }

  if (pathname.startsWith("/weather/bahia")) {
    serveBahiaWeather(res);
    return;
  }

  if (pathname.startsWith("/monitor/") || pathname.startsWith("/snapshot/input/")) {
    send(res, 204, "");
    return;
  }

  serveLu2Static(req, res);
}

function isLocalRequest(req) {
  const host = (req.headers.host || "").split(":")[0].toLowerCase();
  return ["127.0.0.1", "localhost", "::1", "[::1]"].includes(host);
}

function servePanelConfig(req, res) {
  const iceServers = [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" }
  ];
  const localPanel = isLocalRequest(req);

  send(
    res,
    200,
    `window.PANEL_CONFIG = ${JSON.stringify({
      monitorBase: BRIDGE_SECRET || localPanel ? "" : LOCAL_MONITOR_BASE,
      monitorMode: localPanel ? "localcam" : BRIDGE_SECRET ? "webrtc" : "mjpg",
      monitorDevices: MONITOR_DEVICES,
      monitorFps: MONITOR_FPS,
      monitorWidth: MONITOR_WIDTH,
      monitorHeight: MONITOR_HEIGHT,
      rtcPath: "/rtc",
      iceServers
    })};`,
    "text/javascript; charset=utf-8"
  );
}

function getPremiereClient() {
  for (const socket of premiereClients) {
    if (socket.readyState === WebSocket.OPEN && socket.premiereClientKind === "system") return socket;
  }

  for (const socket of premiereClients) {
    if (socket.readyState === WebSocket.OPEN) return socket;
  }

  return null;
}

function premiereStatus(res) {
  send(
    res,
    200,
    JSON.stringify({ connected: !!getPremiereClient(), clients: premiereClients.size }),
    "application/json; charset=utf-8"
  );
}

function sendPremiereCommand(req, res) {
  if (req.method !== "POST") {
    send(res, 405, "Metodo no permitido.");
    return;
  }

  const premiere = getPremiereClient();
  if (!premiere) {
    send(
      res,
      502,
      JSON.stringify({
        error: "No hay bridge de Premiere conectado.",
        hint: "Abrir el Bridge Premiere TELEFEDERAL en la PC donde corre Adobe Premiere Pro."
      }),
      "application/json; charset=utf-8"
    );
    return;
  }

  const requestId = `premiere-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const timeout = setTimeout(() => {
    premiereRequests.delete(requestId);
    send(res, 504, "Timeout esperando respuesta del bridge de Premiere.");
  }, 5000);

  premiereRequests.set(requestId, { res, timeout });
  const requestPath = new URL(req.url, `http://${req.headers.host}`).pathname;
  const command = requestPath.includes("stop") ? "stop" : "play";
  premiere.send(JSON.stringify({ type: "premiere-command", id: requestId, command }));
}

function completePremiereRequest(message) {
  const pending = premiereRequests.get(message.id);
  if (!pending) return;

  premiereRequests.delete(message.id);
  clearTimeout(pending.timeout);

  if (message.ok) {
    send(pending.res, 200, JSON.stringify(message), "application/json; charset=utf-8");
    return;
  }

  send(
    pending.res,
    502,
    JSON.stringify({ error: message.error || "No pude ejecutar el comando en Premiere." }),
    "application/json; charset=utf-8"
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
      "-fflags",
      "nobuffer",
      "-flags",
      "low_delay",
      "-probesize",
      "32",
      "-analyzeduration",
      "0",
      "-f",
      "dshow",
      "-rtbufsize",
      "16M",
      "-i",
      `video=${device}`,
      "-an",
      "-vf",
      `scale=${MONITOR_WIDTH}:${MONITOR_HEIGHT},fps=${MONITOR_FPS}`,
      "-c:v",
      "mjpeg",
      "-q:v",
      String(MONITOR_QUALITY),
      "-flush_packets",
      "1",
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
  const localRequest = isLocalRequest(req);
  const pathname = requestPathname(req);

  if (pathname === "/lu2exteriores" || pathname.startsWith("/lu2exteriores/")) {
    serveLu2Route(req, res);
    return;
  }

  if (req.url.startsWith("/panel-config.js")) {
    servePanelConfig(req, res);
    return;
  }

  if (BRIDGE_SECRET && !localRequest && req.url.startsWith("/monitor/program.mjpg")) {
    streamMonitorViaBridge(req, res, "program");
    return;
  }

  if (BRIDGE_SECRET && !localRequest && req.url.startsWith("/monitor/preview.mjpg")) {
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

  if (req.url.startsWith("/premiere/status")) {
    premiereStatus(res);
    return;
  }

  if (req.url.startsWith("/premiere/play") || req.url.startsWith("/premiere/stop")) {
    sendPremiereCommand(req, res);
    return;
  }

  if (req.url.startsWith("/vmix")) {
    if (BRIDGE_SECRET && !localRequest) {
      proxyVmixViaBridge(req, res);
    } else {
      proxyVmix(req, res);
    }
    return;
  }

  serveStatic(req, res);
});

const wss = new WebSocket.Server({ noServer: true });

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

const rtcWss = new WebSocket.Server({ noServer: true });

function sendSocket(socket, message) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
}

function forwardToPublisher(message) {
  sendSocket(rtcPublisher, message);
}

function forwardToViewer(viewerId, message) {
  sendSocket(rtcViewers.get(viewerId), message);
}

rtcWss.on("connection", (socket, req) => {
  const rtcUrl = new URL(req.url, `http://${req.headers.host}`);
  const role = rtcUrl.searchParams.get("role") || "viewer";
  const token = rtcUrl.searchParams.get("token") || "";
  const viewerId = rtcUrl.searchParams.get("viewerId") || `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  if (role === "publisher") {
    if (!BRIDGE_SECRET || token !== BRIDGE_SECRET) {
      socket.close(1008, "Token invalido");
      return;
    }

    if (rtcPublisher && rtcPublisher.readyState === WebSocket.OPEN) {
      rtcPublisher.close(1012, "Publisher reemplazado");
    }

    rtcPublisher = socket;
    sendSocket(socket, { type: "publisher-ready" });
    rtcViewers.forEach((_, id) => sendSocket(socket, { type: "viewer-ready", viewerId: id }));
  } else {
    rtcViewers.set(viewerId, socket);
    sendSocket(socket, { type: "viewer-id", viewerId, hasPublisher: !!rtcPublisher });
  }

  socket.on("message", (data) => {
    let message;
    try {
      message = JSON.parse(data.toString("utf8"));
    } catch {
      return;
    }

    if (role === "publisher") {
      forwardToViewer(message.viewerId, message);
      return;
    }

    forwardToPublisher({ ...message, viewerId });
  });

  socket.on("close", () => {
    if (role === "publisher" && rtcPublisher === socket) {
      rtcPublisher = null;
      rtcViewers.forEach((viewer) => sendSocket(viewer, { type: "publisher-offline" }));
      return;
    }

    if (role !== "publisher") {
      rtcViewers.delete(viewerId);
      forwardToPublisher({ type: "viewer-left", viewerId });
    }
  });
});

const premiereWss = new WebSocket.Server({ noServer: true });

premiereWss.on("connection", (socket, req) => {
  const premiereUrl = new URL(req.url, `http://${req.headers.host}`);
  const token = premiereUrl.searchParams.get("token") || "";

  if (!BRIDGE_SECRET || token !== BRIDGE_SECRET) {
    socket.close(1008, "Token invalido");
    return;
  }

  socket.premiereClientKind = premiereUrl.searchParams.get("client") || "cep";
  premiereClients.add(socket);

  socket.on("message", (data) => {
    let message;
    try {
      message = JSON.parse(data.toString("utf8"));
    } catch {
      return;
    }

    if (message.type === "premiere-response") completePremiereRequest(message);
  });

  socket.on("close", () => {
    premiereClients.delete(socket);
  });
});

server.on("upgrade", (req, socket, head) => {
  const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
  const target = pathname === "/bridge" ? wss : pathname === "/rtc" ? rtcWss : pathname === "/premiere" ? premiereWss : null;

  if (!target) {
    socket.destroy();
    return;
  }

  target.handleUpgrade(req, socket, head, (ws) => {
    target.emit("connection", ws, req);
  });
});

server.listen(PORT, () => {
  console.log(`Panel vMix: http://localhost:${PORT}`);
  console.log(`API vMix: http://${VMIX_HOST}:${VMIX_PORT}/api/`);
  setTimeout(enforceLu2ClockWeatherFields, 500);
  setInterval(enforceLu2ClockWeatherFields, 1000);
  setInterval(refreshLu2ClockWeatherInput, LU2_CLOCK_WEATHER_INTERVAL_MS);
});
