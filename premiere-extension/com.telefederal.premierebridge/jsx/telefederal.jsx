function telefederalGetPlayer() {
  try {
    app.enableQE();
    var sequence = qe.project.getActiveSequence();
    if (!sequence || !sequence.player) {
      return null;
    }
    return sequence.player;
  } catch (error) {
    return null;
  }
}

function telefederalIsPlaying(player) {
  try {
    if (!player) return false;
    if (typeof player.isPlaying === "function") return !!player.isPlaying();
    if (typeof player.isPlaying !== "undefined") return !!player.isPlaying;
  } catch (error) {
  }
  return false;
}

function telefederalRunMenuCandidates(names) {
  var executed = [];
  for (var i = 0; i < names.length; i += 1) {
    try {
      var commandId = app.findMenuCommandId(names[i]);
      if (commandId) {
        app.executeCommand(commandId);
        executed.push(names[i] + ":" + commandId);
        $.sleep(120);
        break;
      }
    } catch (error) {
    }
  }
  return executed.join(", ");
}

function telefederalPlay() {
  try {
    var player = telefederalGetPlayer();
    if (!player) return "ERROR: No hay secuencia activa en Premiere.";

    try { player.play(1); } catch (errorA) {}
    $.sleep(160);
    if (telefederalIsPlaying(player)) return "Premiere Play OK por QE.";

    try { player.play(); } catch (errorB) {}
    $.sleep(160);
    if (telefederalIsPlaying(player)) return "Premiere Play OK por QE alternativo.";

    var menu = telefederalRunMenuCandidates([
      "Play",
      "Play-Stop Toggle",
      "Play/Stop Toggle",
      "Toggle Play",
      "Reproducir",
      "Reproducir/detener",
      "Reproducir/Detener"
    ]);
    $.sleep(160);
    if (telefederalIsPlaying(player)) return "Premiere Play OK por menu " + menu + ".";

    return "ERROR: Premiere recibio Play pero no inicio reproduccion. Probar el boton Play dentro de TELEFEDERAL Bridge.";
  } catch (error) {
    return "ERROR: " + error.toString();
  }
}

function telefederalStop() {
  try {
    var player = telefederalGetPlayer();
    if (!player) return "ERROR: No hay secuencia activa en Premiere.";

    try {
      if (player.stop) player.stop();
      else player.play(0);
    } catch (errorA) {}
    $.sleep(160);
    if (!telefederalIsPlaying(player)) return "Premiere Stop OK por QE.";

    try { player.play(0); } catch (errorB) {}
    $.sleep(160);
    if (!telefederalIsPlaying(player)) return "Premiere Stop OK por QE alternativo.";

    var menu = telefederalRunMenuCandidates([
      "Stop",
      "Play-Stop Toggle",
      "Play/Stop Toggle",
      "Toggle Play",
      "Detener",
      "Reproducir/detener",
      "Reproducir/Detener"
    ]);
    $.sleep(160);
    if (!telefederalIsPlaying(player)) return "Premiere Stop OK por menu " + menu + ".";

    return "ERROR: Premiere recibio Stop pero siguio reproduciendo. Probar el boton Stop dentro de TELEFEDERAL Bridge.";
  } catch (error) {
    return "ERROR: " + error.toString();
  }
}
