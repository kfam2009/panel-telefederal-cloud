const params = new URLSearchParams(location.search);
const cloudUrl = params.get("cloud") || "https://panel-telefederal-cloud.onrender.com";
const token = params.get("token") || params.get("secret") || "";
const rtcFps = Number(params.get("fps") || 25);
const iceServers = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" }
];
const peers = new Map();
const tracks = {};
window.TF_RTC_PUBLISHER = { peers, tracks };
const els = {
  status: document.querySelector("#publisherStatus"),
  log: document.querySelector("#publisherLog"),
  previewSource: document.querySelector("#previewSource"),
  programSource: document.querySelector("#programSource"),
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

async function createPeer(socket, viewerId) {
  if (!tracks.preview || !tracks.program) return;
  if (peers.has(viewerId)) peers.get(viewerId).close();

  const pc = new RTCPeerConnection({ iceServers });
  peers.set(viewerId, pc);
  pc.addTrack(tracks.preview, new MediaStream([tracks.preview]));
  pc.addTrack(tracks.program, new MediaStream([tracks.program]));

  pc.onicecandidate = (event) => {
    if (event.candidate) send(socket, { type: "ice-candidate", viewerId, candidate: event.candidate });
  };
  pc.onconnectionstatechange = () => {
    if (["failed", "closed", "disconnected"].includes(pc.connectionState)) {
      peers.delete(viewerId);
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

async function start() {
  if (!token) {
    setStatus(false, "Falta token");
    setLog("Abrir con ?cloud=URL_RENDER&token=BRIDGE_SECRET");
    return;
  }

  drawLoop(els.previewSource, els.previewCanvas, els.previewStats);
  drawLoop(els.programSource, els.programCanvas, els.programStats);
  tracks.preview = els.previewCanvas.captureStream(rtcFps).getVideoTracks()[0];
  tracks.program = els.programCanvas.captureStream(rtcFps).getVideoTracks()[0];

  const socket = new WebSocket(wsUrl());
  socket.addEventListener("open", () => setStatus(true, "Publicando"));
  socket.addEventListener("close", () => {
    setStatus(false, "Desconectado");
    peers.forEach((pc) => pc.close());
    peers.clear();
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
      peers.get(message.viewerId).close();
      peers.delete(message.viewerId);
    }
  });
}

start();
