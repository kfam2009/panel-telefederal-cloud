function telefederalPlay() {
  try {
    app.enableQE();
    var sequence = qe.project.getActiveSequence();
    if (!sequence || !sequence.player) {
      return "ERROR: No hay secuencia activa en Premiere.";
    }
    sequence.player.play(1);
    return "Premiere Play ejecutado desde panel interno.";
  } catch (error) {
    return "ERROR: " + error.toString();
  }
}

function telefederalStop() {
  try {
    app.enableQE();
    var sequence = qe.project.getActiveSequence();
    if (!sequence || !sequence.player) {
      return "ERROR: No hay secuencia activa en Premiere.";
    }
    if (sequence.player.stop) {
      sequence.player.stop();
    } else {
      sequence.player.play(0);
    }
    return "Premiere Stop ejecutado desde panel interno.";
  } catch (error) {
    return "ERROR: " + error.toString();
  }
}
