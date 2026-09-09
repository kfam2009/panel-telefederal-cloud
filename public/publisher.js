const params = new URLSearchParams(location.search);
const cloudUrl = params.get("cloud") || "https://panel-telefederal-cloud.onrender.com";
const token = params.get("token") || params.get("secret") || "";
const rtcFps = Number(params.get("fps") || 25);
const previewDeviceName = params.get("previewDevice") || "vMix Video External 2";
const programDeviceName = params.get("programDevice") || "vMix Video";
const iceServers = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" }
];
const peers = new Map();
const tracks = {};
window.TF_RTC_PUBLISHER = { peers, tracks };
let captureReady = false;
const els = {
  status: document.querySelector("#publisherStatus"),
  log: document.querySelector("#publisherLog"),
  previewSource: document.querySelector("#previewSource"),
  programSource: document.querySelector("#programSource"),
  previewVideo: document.querySelector("#previewVideo"),
  programVideo: document.querySelector("#programVideo"),
  previewCanvas: document.querySelector("#previewCanvas"),
  programCanvas: document.querySelector("#programCanvas"),
  previewStats: document.querySelector("#previewStats"),
  programStats: document.querySelector("#programStats")
};

function setStatus(online, message) {
  els.status.textContent = message;
  els.status.classList.toggle("online", online);
  els.status.classList.toggle("offline", !online);
}

function setLog(message) {
  els.log.textContent = message;
}

function drawLoop(img, canvas, stats) {
  const context = canvas.getContext("2d", { alpha: false });
  let frames = 0;
  let lastSecond = performance.now();

  const draw = () => {
    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      frames += 1;
    }

    const now = performance.now();
    if (now - lastSecond >= 1000) {
      stats.textContent = `${frames} fps`;
      frames = 0;
      lastSecond = now;
    }

    setTimeout(draw, Math.max(10, Math.round(1000 / rtcFps)));
  };

  draw();
}

function matchDevice(devices, requestedName, usedDeviceIds = new Set()) {
  const videoDevices = devices.filter((device) => device.kind === "videoinput");
  const normalized = requestedName.trim().toLowerCase();
  const exact = videoDevices.find((device) => !usedDeviceIds.has(device.deviceId) && device.label.trim().toLowerCase() === normalized);
  if (exact) return exact;
  const partial = videoDevices.find((device) => !usedDeviceIds.has(device.deviceId) && device.label.toLowerCase().includes(normalized));
  if (partial) return partial;
  return videoDevices.find((device) => !usedDeviceIds.has(device.deviceId)) || videoDevices[0];
}

async function unlockDeviceLabels() {
  if (!navigator.mediaDevices?.getUserMedia || !navigator.mediaDevices?.enumerateDevices) return;
  const devices = await navigator.mediaDevices.enumerateDevices();
  if (devices.some((device) => device.kind === "videoinput" && device.label)) return;

  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  stream.getTracks().forEach((track) => track.stop());
}

function updateVideoStats(video, stats, label) {
  let frames = 0;
  let lastSecond = performance.now();
  const tick = () => {
    frames += 1;
    const now = performance.now();
    if (now - lastSecond >= 1000) {
      stats.textContent = `${label}: ${frames} fps`;
      frames = 0;
      lastSecond = now;
    }
    if (video.requestVideoFrameCallback) {
      video.requestVideoFrameCallback(tick);
    }
  };

  if (video.requestVideoFrameCallback) {
    video.requestVideoFrameCallback(tick);
  } else {
    setInterval(() => {
      stats.textContent = `${label}: video`;
    }, 1000);
  }
}

async function captureVirtualCamera(kind, requestedName, video, stats, usedDeviceIds) {
  await unlockDeviceLabels();
  const devices = await navigator.mediaDevices.enumerateDevices();
  const device = matchDevice(devices, requestedName, usedDeviceIds);
  if (!device) throw new Error(`No encuentro camara para ${kind}.`);
  usedDeviceIds.add(device.deviceId);

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      deviceId: { exact: device.deviceId },
      width: { ideal: 640 },
      height: { ideal: 360 },
      frameRate: { ideal: rtcFps, max: Math.max(rtcFps, 30) }
    }
  });
  video.srcObject = stream;
  video.hidden = false;
  await video.play().catch(() => {});
  updateVideoStats(video, stats, device.label || requestedName);
  setLog(`${kind}: ${device.label || requestedName}`);
  return stream.getVideoTracks()[0];
}

function captureMjpegFallback(kind, img, canvas, stats, path) {
  img.hidden = false;
  canvas.hidden = false;
  img.src = `${path}?v=${Date.now()}`;
  drawLoop(img, canvas, stats);
  setLog(`${kind}: MJPEG de emergencia`);
  return canvas.captureStream(rtcFps).getVideoTracks()[0];
}

function wsUrl() {
  const url = new URL(cloudUrl);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = "/rtc";
  url.search = `?role=publisher&token=${encodeURIComponent(token)}`;
  return url.toString();
}

function send(socket, message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
}

function closePeer(viewerId) {
  const pc = peers.get(viewerId);
  if (!pc) return;
  pc.onconnectionstatechange = null;
  pc.onicecandidate = null;
  try { pc.close(); } catch {}
  peers.delete(viewerId);
}

async function createPeer(socket, viewerId) {
  if (!tracks.preview || !tracks.program) return;
  closePeer(viewerId);

  const pc = new RTCPeerConnection({ iceServers });
  peers.set(viewerId, pc);
  pc.addTrack(tracks.preview, new MediaStream([tracks.preview]));
  pc.addTrack(tracks.program, new MediaStream([tracks.program]));

  pc.onicecandidate = (event) => {
    if (event.candidate) send(socket, { type: "ice-candidate", viewerId, candidate: event.candidate });
  };
  pc.onconnectionstatechange = () => {
    if (["failed", "closed", "disconnected"].includes(pc.connectionState)) {
      if (peers.get(viewerId) === pc) peers.delete(viewerId);
    }
    setLog(`Paneles conectados: ${peers.size}`);
  };

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  send(socket, {
    type: "publisher-offer",
    viewerId,
    offer,
    streams: [
      { mid: pc.getTransceivers()[0]?.mid, name: "preview" },
      { mid: pc.getTransceivers()[1]?.mid, name: "program" }
    ]
  });
}

async function ensureCaptureTracks() {
  if (captureReady && tracks.preview?.readyState === "live" && tracks.program?.readyState === "live") return;
  captureReady = false;
  const usedDeviceIds = new Set();
  try {
    tracks.preview = await captureVirtualCamera("Preview", previewDeviceName, els.previewVideo, els.previewStats, usedDeviceIds);
  } catch (error) {
    tracks.preview = captureMjpegFallback("Preview", els.previewSource, els.previewCanvas, els.previewStats, "/monitor/preview.mjpg");
    setLog(`Preview sin camara virtual: ${error.message}`);
  }
  try {
    tracks.program = await captureVirtualCamera("Aire", programDeviceName, els.programVideo, els.programStats, usedDeviceIds);
  } catch (error) {
    tracks.program = captureMjpegFallback("Aire", els.programSource, els.programCanvas, els.programStats, "/monitor/program.mjpg");
    setLog(`Aire sin camara virtual: ${error.message}`);
  }
  captureReady = true;
}

async function start() {
  if (!token) {
    setStatus(false, "Falta token");
    setLog("Abrir con ?cloud=URL_RENDER&token=BRIDGE_SECRET");
    return;
  }

  await ensureCaptureTracks();

  const socket = new WebSocket(wsUrl());
  socket.addEventListener("open", () => setStatus(true, "Publicando"));
  socket.addEventListener("close", () => {
    setStatus(false, "Desconectado");
    [...peers.keys()].forEach(closePeer);
    setTimeout(start, 2500);
  });
  socket.addEventListener("error", () => setStatus(false, "Error WebRTC"));
  socket.addEventListener("message", async (event) => {
    let message;
    try {
      message = JSON.parse(event.data);
    } catch {
      return;
    }

    if (message.type === "viewer-ready") {
      await createPeer(socket, message.viewerId);
    }
    if (message.type === "viewer-answer" && peers.has(message.viewerId)) {
      await peers.get(message.viewerId).setRemoteDescription(message.answer);
    }
    if (message.type === "ice-candidate" && peers.has(message.viewerId)) {
      await peers.get(message.viewerId).addIceCandidate(message.candidate).catch(() => {});
    }
    if (message.type === "viewer-left" && peers.has(message.viewerId)) {
      closePeer(message.viewerId);
    }
  });
}

window.addEventListener("load", start);
