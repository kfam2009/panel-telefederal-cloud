const COMMON_CAMERAS = [
  { input: "1", label: "Cam 1" },
  { input: "2", label: "Cam 2" },
  { input: "3", label: "Cam 3" },
  { input: "4", label: "Cam 4" },
  { input: "5", label: "Cam 5" },
  { input: "6", label: "Cam 6" },
  { input: "71", label: "Zowitek" }
];

const UTC_ZOCALO_PRESETS = {
  bahia: [
    { id: "utc-bft-z1-top-01", type: "bft-zocalo-1", line: "top", text: "21 hs Comienza el streaming" },
    { id: "utc-bft-z1-top-02", type: "bft-zocalo-1", line: "top", text: "Dejanos tu mensaje" },
    { id: "utc-bft-z1-top-03", type: "bft-zocalo-1", line: "top", text: "Mandá tus preguntas en vivo" },
    { id: "utc-bft-z1-top-04", type: "bft-zocalo-1", line: "top", text: "" },
    { id: "utc-bft-z1-top-05", type: "bft-zocalo-1", line: "top", text: "Román Igartua - Conducción" },
    { id: "utc-bft-z1-top-06", type: "bft-zocalo-1", line: "top", text: "Santino Domenichini - Conducción" },
    { id: "utc-bft-z1-top-07", type: "bft-zocalo-1", line: "top", text: "Hernán Lavezzi - Conducción" },
    { id: "utc-bft-z1-top-08", type: "bft-zocalo-1", line: "top", text: "Maribel Atler - Conducción" },
    { id: "utc-bft-z1-top-09", type: "bft-zocalo-1", line: "top", text: "Mónica Bochile - Coordinadora general" },
    { id: "utc-bft-z1-top-10", type: "bft-zocalo-1", line: "top", text: "Allegra Norero Bochile - Producción" },
    { id: "utc-bft-z1-top-11", type: "bft-zocalo-1", line: "top", text: "" },
    { id: "utc-bft-z1-top-12", type: "bft-zocalo-1", line: "top", text: "Aldana Araque - Tarotista" },
    { id: "utc-bft-z1-top-13", type: "bft-zocalo-1", line: "top", text: "Micaela Mardones - Astróloga" },
    { id: "utc-bft-z1-top-14", type: "bft-zocalo-1", line: "top", text: "" },
    { id: "utc-bft-z1-top-15", type: "bft-zocalo-1", line: "top", text: "ANÁLISIS DE LEO MESSI" },
    { id: "utc-bft-z1-top-16", type: "bft-zocalo-1", line: "top", text: "" },
    { id: "utc-bft-z1-top-17", type: "bft-zocalo-1", line: "top", text: "TAROT EN VIVO" },
    { id: "utc-bft-z1-top-18", type: "bft-zocalo-1", line: "top", text: "ASTROLOGÍA EN VIVO" },
    { id: "utc-bft-z1-top-19", type: "bft-zocalo-1", line: "top", text: "REVOLUCIÓN SOLAR DE LEO MESSI" },
    { id: "utc-bft-z1-top-20", type: "bft-zocalo-1", line: "top", text: "" },
    { id: "utc-bft-z1-top-21", type: "bft-zocalo-1", line: "top", text: "" },
    { id: "utc-bft-z1-top-22", type: "bft-zocalo-1", line: "top", text: "" },
    { id: "utc-bft-z1-top-23", type: "bft-zocalo-1", line: "top", text: "" },
    { id: "utc-bft-z1-top-24", type: "bft-zocalo-1", line: "top", text: "" },
    { id: "utc-bft-z1-top-25", type: "bft-zocalo-1", line: "top", text: "YA VOLVEMOS! NO TE VAYAS!!" },
    { id: "utc-bft-z1-bottom-01", type: "bft-zocalo-1", line: "bottom", text: "Dejanos tu mensaje - 291 467 8003" },
    { id: "utc-bft-z1-bottom-02", type: "bft-zocalo-1", line: "bottom", text: "Enterate de todo en nuestras redes" },
    { id: "utc-bft-z1-bottom-03", type: "bft-zocalo-1", line: "bottom", text: "Seguinos y enterate de todos los concursos" },
    { id: "utc-bft-z1-bottom-04", type: "bft-zocalo-1", line: "bottom", text: "Participá de nuestros concursos y ganá premios increíbles" },
    { id: "utc-bft-z1-bottom-05", type: "bft-zocalo-1", line: "bottom", text: "" },
    { id: "utc-bft-z1-bottom-06", type: "bft-zocalo-1", line: "bottom", text: "PODÉS HACER TU CONSULTA EN VIVO EN LAS REDES" },
    { id: "utc-bft-z1-bottom-07", type: "bft-zocalo-1", line: "bottom", text: "Whatsapp - 291 467 8003" },
    { id: "utc-bft-z1-bottom-08", type: "bft-zocalo-1", line: "bottom", text: "" },
    { id: "utc-bft-z1-bottom-09", type: "bft-zocalo-1", line: "bottom", text: "Instagram: @metabolomonline" },
    { id: "utc-bft-z1-bottom-10", type: "bft-zocalo-1", line: "bottom", text: "" },
    { id: "utc-bft-z1-bottom-11", type: "bft-zocalo-1", line: "bottom", text: "Javier de la Torre  - Productor / Emanuel Augot - Actor" },
    { id: "utc-bft-z1-bottom-12", type: "bft-zocalo-1", line: "bottom", text: "" },
    { id: "utc-bft-z1-bottom-13", type: "bft-zocalo-1", line: "bottom", text: "" },
    { id: "utc-bft-z1-bottom-14", type: "bft-zocalo-1", line: "bottom", text: "" },
    { id: "utc-bft-z1-bottom-15", type: "bft-zocalo-1", line: "bottom", text: "" },
    { id: "utc-bft-z2-top-01", type: "bft-zocalo-2", line: "top", text: "Instagram: @bahiafulltalent" }
  ],
  aula: [
    { id: "utc-aula-z1-top-01", type: "aula-zocalo-1", line: "top", text: "Miguel Donadío - Romina Tiecher" },
    { id: "utc-aula-z1-top-02", type: "aula-zocalo-1", line: "top", text: "Miguel Donadío" },
    { id: "utc-aula-z1-top-03", type: "aula-zocalo-1", line: "top", text: "Romina Tiecher" },
    { id: "utc-aula-z1-top-04", type: "aula-zocalo-1", line: "top", text: "" },
    { id: "utc-aula-z1-top-05", type: "aula-zocalo-1", line: "top", text: "Seguinos en las redes!" },
    { id: "utc-aula-z1-top-06", type: "aula-zocalo-1", line: "top", text: "Instagram:  educacion360.aula_abierta" },
    { id: "utc-aula-z1-top-07", type: "aula-zocalo-1", line: "top", text: "Youtube: AulaAbierta-Educación360" },
    { id: "utc-aula-z1-top-08", type: "aula-zocalo-1", line: "top", text: "" },
    { id: "utc-aula-z1-top-09", type: "aula-zocalo-1", line: "top", text: "HASTA LA PRÓXIMA SEMANA!" },
    { id: "utc-aula-z1-top-10", type: "aula-zocalo-1", line: "top", text: "" },
    { id: "utc-aula-z1-top-11", type: "aula-zocalo-1", line: "top", text: "Dr. Pablo López - Psicólogo, Docente e Investigador" },
    { id: "utc-aula-z1-top-12", type: "aula-zocalo-1", line: "top", text: "" },
    { id: "utc-aula-z1-top-13", type: "aula-zocalo-1", line: "top", text: "¿LA UNIVERSIDAD ENSEÑA PARA EL FUTURO?" },
    { id: "utc-aula-z1-top-14", type: "aula-zocalo-1", line: "top", text: "EDUCACIÓN DEL SIGLO XIX, ALUMNOS DEL SIGLO XXI" },
    { id: "utc-aula-z1-top-15", type: "aula-zocalo-1", line: "top", text: "¿HAY QUE REINVENTAR LA ESCUELA?" },
    { id: "utc-aula-z1-top-16", type: "aula-zocalo-1", line: "top", text: "LA CIENCIA PIDE CAMBIOS EN EL AULA" },
    { id: "utc-aula-z1-top-17", type: "aula-zocalo-1", line: "top", text: "EL CEREBRO TAMBIÉN APRENDE DURMIENDO" },
    { id: "utc-aula-z1-top-18", type: "aula-zocalo-1", line: "top", text: "DORMIR BIEN ES ESTUDIAR MEJOR" },
    { id: "utc-aula-z1-top-19", type: "aula-zocalo-1", line: "top", text: "¿CUÁNTO AFECTA LA FALTA DE SUEÑO?" },
    { id: "utc-aula-z1-top-20", type: "aula-zocalo-1", line: "top", text: "EL SUEÑO DEFINE EL RENDIMIENTO ESCOLAR" },
    { id: "utc-aula-z1-top-21", type: "aula-zocalo-1", line: "top", text: "PASAR DE LARGO: ¿SIRVE O PERJUDICA?" },
    { id: "utc-aula-z1-top-22", type: "aula-zocalo-1", line: "top", text: "ESTUDIAR TODA LA NOCHE PUEDE SER UN ERROR" },
    { id: "utc-aula-z1-top-23", type: "aula-zocalo-1", line: "top", text: "MENOS SUEÑO, PEOR MEMORIA" },
    { id: "utc-aula-z1-top-24", type: "aula-zocalo-1", line: "top", text: "EL CEREBRO NECESITA DESCANSO" },
    { id: "utc-aula-z1-top-25", type: "aula-zocalo-1", line: "top", text: "¿LAS CLASES EMPIEZAN DEMASIADO TEMPRANO?" },
    { id: "utc-aula-z1-top-26", type: "aula-zocalo-1", line: "top", text: "ESCUELA VS. RELOJ BIOLÓGICO" },
    { id: "utc-aula-z1-top-27", type: "aula-zocalo-1", line: "top", text: "¿LA SIESTA AYUDA A APRENDER?" },
    { id: "utc-aula-z1-top-28", type: "aula-zocalo-1", line: "top", text: "MALAS NOTAS O FALTA DE DESCANSO" },
    { id: "utc-aula-z1-top-29", type: "aula-zocalo-1", line: "top", text: "¿VAGANCIA O PRIVACIÓN DE SUEÑO?" },
    { id: "utc-aula-z1-top-30", type: "aula-zocalo-1", line: "top", text: "CLAVES PARA DORMIR MEJOR EN EXÁMENES" },
    { id: "utc-aula-z1-top-31", type: "aula-zocalo-1", line: "top", text: "HIGIENE DEL SUEÑO: TRES HÁBITOS CLAVE" },
    { id: "utc-aula-z1-top-32", type: "aula-zocalo-1", line: "top", text: "PANTALLAS, LUZ AZUL Y BAJO RENDIMIENTO" },
    { id: "utc-aula-z1-top-33", type: "aula-zocalo-1", line: "top", text: "EL CELULAR PUEDE QUITARTE EL SUEÑO" },
    { id: "utc-aula-z1-top-34", type: "aula-zocalo-1", line: "top", text: "MELATONINA: LA HORMONA DEL DESCANSO" },
    { id: "utc-aula-z1-top-35", type: "aula-zocalo-1", line: "top", text: "BEBIDAS ENERGÉTICAS: EL COSTO DE MANTENERSE DESPIERTO" },
    { id: "utc-aula-z1-top-36", type: "aula-zocalo-1", line: "top", text: "CAFÉ, ESTRÉS Y MAL APRENDIZAJE" },
    { id: "utc-aula-z1-top-37", type: "aula-zocalo-1", line: "top", text: "¿CÓMO DORMIR ANTES DE UN FINAL?" },
    { id: "utc-aula-z1-top-38", type: "aula-zocalo-1", line: "top", text: "ESTRÉS ACADÉMICO Y FALTA DE SUEÑO" },
    { id: "utc-aula-z1-top-39", type: "aula-zocalo-1", line: "top", text: "DOCENTES AGOTADOS, ALUMNOS AFECTADOS" },
    { id: "utc-aula-z1-top-40", type: "aula-zocalo-1", line: "top", text: "LA SALUD MENTAL TAMBIÉN ENSEÑA" },
    { id: "utc-aula-z1-top-41", type: "aula-zocalo-1", line: "top", text: "APRENDER MEJOR EMPIEZA POR DORMIR" },
    { id: "utc-aula-z1-top-42", type: "aula-zocalo-1", line: "top", text: "EL DESCANSO ES PARTE DEL APRENDIZAJE" }
  ],
  rugby: [
    { id: "utc-rugby-z1-top-01", type: "rugby-zocalo-1", line: "top", text: "Alejandro Sieli - Raul Rivas" },
    { id: "utc-rugby-z1-top-02", type: "rugby-zocalo-1", line: "top", text: "" },
    { id: "utc-rugby-z1-top-03", type: "rugby-zocalo-1", line: "top", text: "Nicolas Nouviale - Jugador de UNS" },
    { id: "utc-rugby-z1-top-04", type: "rugby-zocalo-1", line: "top", text: "Octavio Visciglia - Jugador de UNS" },
    { id: "utc-rugby-z1-top-05", type: "rugby-zocalo-1", line: "top", text: "" },
    { id: "utc-rugby-z1-top-06", type: "rugby-zocalo-1", line: "top", text: "Juan Cruz Rodriguez Marsili - Club El Nacional" },
    { id: "utc-rugby-z1-top-07", type: "rugby-zocalo-1", line: "top", text: "Tobias Longobardi Miranda - Club El Nacional" },
    { id: "utc-rugby-z1-top-08", type: "rugby-zocalo-1", line: "top", text: "Juan Cruz Rodriguez Marsili - Tobias Longobardi Miranda - Club el Nacional" },
    { id: "utc-rugby-z1-top-09", type: "rugby-zocalo-1", line: "top", text: "Union de rugby vs Mar del Plata M16" },
    { id: "utc-rugby-z1-top-10", type: "rugby-zocalo-1", line: "top", text: "" },
    { id: "utc-rugby-z1-top-11", type: "rugby-zocalo-1", line: "top", text: "" },
    { id: "utc-rugby-z1-top-12", type: "rugby-zocalo-1", line: "top", text: "Fede" },
    { id: "utc-rugby-z1-top-13", type: "rugby-zocalo-1", line: "top", text: "Tom" },
    { id: "utc-rugby-z1-top-14", type: "rugby-zocalo-1", line: "top", text: "" },
    { id: "utc-rugby-z1-top-15", type: "rugby-zocalo-1", line: "top", text: "" },
    { id: "utc-rugby-z1-top-16", type: "rugby-zocalo-1", line: "top", text: "" },
    { id: "utc-rugby-z1-top-17", type: "rugby-zocalo-1", line: "top", text: "" },
    { id: "utc-rugby-z1-top-18", type: "rugby-zocalo-1", line: "top", text: "Insta: @rugby.report" },
    { id: "utc-rugby-z1-top-19", type: "rugby-zocalo-1", line: "top", text: "X: @inforugbyreport" },
    { id: "utc-rugby-z1-top-20", type: "rugby-zocalo-1", line: "top", text: "Youtube: @rugbyreport1248" }
  ],
  telefederal: [
    { id: "utc-telefederal-z1-top-01", type: "telefederal-zocalo-1", line: "top", text: "¡Arrancamos un nuevo TeleFederal!" },
    { id: "utc-telefederal-z1-top-02", type: "telefederal-zocalo-1", line: "top", text: "TeleFederal, un espacio de fútbol local" },
    { id: "utc-telefederal-z1-top-03", type: "telefederal-zocalo-1", line: "top", text: "Luciano Delgado - Román Igartua" },
    { id: "utc-telefederal-z1-top-04", type: "telefederal-zocalo-1", line: "top", text: "Luciano Delgado - Román Igartua - Felipe Nougues" },
    { id: "utc-telefederal-z1-top-05", type: "telefederal-zocalo-1", line: "top", text: "Seguinos en nuestro IG: @telefederalbahia" },
    { id: "utc-telefederal-z1-top-06", type: "telefederal-zocalo-1", line: "top", text: "" },
    { id: "utc-telefederal-z1-top-07", type: "telefederal-zocalo-1", line: "top", text: "Olimpo recibe a Kimberley y Villa Mitre va a Tandil" },
    { id: "utc-telefederal-z1-top-08", type: "telefederal-zocalo-1", line: "top", text: "Olimpo buscará volver al triunfo en el Carminatt" },
    { id: "utc-telefederal-z1-top-09", type: "telefederal-zocalo-1", line: "top", text: "Villa Mitre, necesitado de ganar en Tandil" },
    { id: "utc-telefederal-z1-top-10", type: "telefederal-zocalo-1", line: "top", text: "Habla Diego Cochas, DT de Villa Mitre" },
    { id: "utc-telefederal-z1-top-11", type: "telefederal-zocalo-1", line: "top", text: "Cochas: \"Los rivales no nos han hecho sufrir\"" },
    { id: "utc-telefederal-z1-top-12", type: "telefederal-zocalo-1", line: "top", text: "Cochas: \"Soy el responsable de este momento deportivo\"" },
    { id: "utc-telefederal-z1-top-13", type: "telefederal-zocalo-1", line: "top", text: "Cochas: \"Está en su derecho de estar enojada la gente\"" },
    { id: "utc-telefederal-z1-top-14", type: "telefederal-zocalo-1", line: "top", text: "Cochas: \"Hablé con Fernández, respeté su decisión pero no la compartí\"" },
    { id: "utc-telefederal-z1-top-15", type: "telefederal-zocalo-1", line: "top", text: "Invitado en piso: Mario \"Pelusa\" Martínez, Pte. de San Francisco" },
    { id: "utc-telefederal-z1-top-16", type: "telefederal-zocalo-1", line: "top", text: "" },
    { id: "utc-telefederal-z1-top-17", type: "telefederal-zocalo-1", line: "top", text: "Felipe Nougues" },
    { id: "utc-telefederal-z1-top-18", type: "telefederal-zocalo-1", line: "top", text: "" },
    { id: "utc-telefederal-z1-top-19", type: "telefederal-zocalo-1", line: "top", text: "" },
    { id: "utc-telefederal-z1-top-20", type: "telefederal-zocalo-1", line: "top", text: "" },
    { id: "utc-telefederal-z1-top-21", type: "telefederal-zocalo-1", line: "top", text: "" }
  ],
  flap: [
    { id: "utc-flap-z1-top-01", type: "flap-zocalo-1", line: "top", text: "Bienvenidos a FLAP" },
    { id: "utc-flap-z1-top-02", type: "flap-zocalo-1", line: "top", text: "Seguinos en nuestras redes" },
    { id: "utc-flap-z1-top-03", type: "flap-zocalo-1", line: "top", text: "" }
  ]
};

// Layer numbers are vMix API layers. Video and background layers are intentionally excluded.
const PROJECTS = {
  bahia: {
    name: "BAHIA FULL TALENT",
    help: "Multiviews de Bahia Full Talent. Los layers de video quedan fijos.",
    defaultLayout: "69",
    defaultPtz: "26",
    zowitekInput: "71",
    cameras: [...COMMON_CAMERAS, { input: "26", label: "PTZ" }, { input: "44", label: "Call" }],
    layouts: [
      { input: "12", label: "2 Camaras", layers: ["2", "3"] },
      { input: "13", label: "3 Camaras", layers: ["2", "3", "4"] },
      { input: "14", label: "4 Camaras", layers: ["2", "3", "4", "5"] },
      { input: "36", label: "2 Camaras + Video", layers: ["2", "3"], hasVideo: true },
      { input: "31", label: "3 Camaras + Video", layers: ["2", "3", "4"], hasVideo: true },
      { input: "34", label: "4 Camaras + Video", layers: ["2", "3", "4", "5"], hasVideo: true },
      { input: "67", label: "5 Camaras", layers: ["2", "3", "4", "5", "6"] },
      { input: "66", label: "5 Camaras + Video", layers: ["2", "3", "4", "5", "6"], hasVideo: true },
      { input: "69", label: "6 Camaras", layers: ["2", "3", "4", "5", "6", "7"] },
      { input: "68", label: "6 Camaras + Video", layers: ["2", "3", "4", "5", "6", "7"], hasVideo: true }
    ],
    ptz: [
      { input: "26", label: "PTZ 26" },
      { input: "6", label: "PTZ 6" }
    ],
    zocalos: [
      { id: "bft-zocalo-1", input: "24", label: "Zocalo 1", lines: 2, fields: ["TEXTO ARRIBA.Text", "TEXTO ABAJO.Text"], fieldLabels: ["RENGLON ZOCALO 1", "RENGLON ZOCALO 2"], overlay: "1" },
      { id: "bft-zocalo-2", input: "32", label: "Zocalo 2", lines: 1, fields: ["TextBlock1.Text"], fieldLabels: ["RENGLON 1 ZOCALO 2", "Sin segundo renglon"], overlay: "3" }
    ]
  },
  aula: {
    name: "AULA",
    help: "Multiviews de Aula. El video queda fijo y la Call 41 se puede elegir como camara.",
    defaultLayout: "12",
    defaultPtz: "26",
    zowitekInput: "49",
    videoSources: [
      { input: "15", label: "Video" },
      { input: "50", label: "Video2" }
    ],
    cameras: [
      { input: "1", label: "Cam 1" },
      { input: "2", label: "Cam 2" },
      { input: "3", label: "Cam 3" },
      { input: "4", label: "Cam 4" },
      { input: "5", label: "Cam 5" },
      { input: "6", label: "Cam 6" },
      { input: "49", label: "Zowitek" },
      { input: "26", label: "PTZ" },
      { input: "41", label: "Call" }
    ],
    layouts: [
      { input: "12", label: "2 Camaras", layers: ["2", "3"] },
      { input: "13", label: "3 Camaras", layers: ["2", "3", "4"] },
      { input: "14", label: "4 Camaras", layers: ["2", "3", "4", "5"] },
      { input: "43", label: "2 Camaras B", displayLabel: "2 Camaras B", layers: ["2", "3"] },
      { input: "44", label: "3 Camaras B", displayLabel: "3 Camaras B", layers: ["2", "3", "4"] },
      { input: "36", label: "2 Camaras + Video", layers: ["2", "3"], hasVideo: true, videoLayer: "4" },
      { input: "31", label: "3 Camaras + Video", layers: ["2", "3", "4"], hasVideo: true, videoLayer: "5" },
      { input: "34", label: "4 Camaras + Video", layers: ["2", "3", "4", "5"], hasVideo: true, videoLayer: "6" },
      { input: "47", label: "5 Camaras", layers: ["2", "3", "4", "5", "6"] },
      { input: "48", label: "5 Camaras + Video", layers: ["2", "3", "4", "5", "6"], hasVideo: true, videoLayer: "7" }
    ],
    ptz: [
      { input: "26", label: "PTZ Master 26" },
      { input: "6", label: "PTZ Camara 6" }
    ],
    audio: [
      { input: "4", label: "Camara 4" },
      { input: "8", label: "Audio Línea de entrada" },
      { input: "15", label: "NDI DESKTOP-PNCTKA2" },
      { input: "23", label: "Apertura Aula" },
      { input: "25", label: "LOGO - BFT" },
      { input: "26", label: "PTZ MASTER - ORIGINAL" },
      { input: "37", label: "YA COMIENZA" },
      { input: "38", label: "HASTA LA PROXIMA" },
      { input: "41", label: "Call" },
      { input: "42", label: "Audio Micrófono" }
    ],
    zocalos: [
      { id: "aula-zocalo-1", input: "40", label: "Zocalo 1", lines: 2, fields: ["TEXTO ARRIBA.Text", "TEXTO ABAJO.Text"], fieldLabels: ["RENGLON ZOCALO 1", "RENGLON ZOCALO 2"], overlay: "1" }
    ]
  },
  rugby: {
    name: "RUGBY",
    help: "Camaras 1-6, PTZ Master 26 y Call 1/2. Los layers de video quedan fijos.",
    defaultLayout: "12",
    defaultPtz: "6",
    zowitekInput: "60",
    cameras: [
      { input: "1", label: "C1" },
      { input: "2", label: "C2" },
      { input: "3", label: "C3" },
      { input: "4", label: "C4" },
      { input: "5", label: "C5" },
      { input: "6", label: "C6" },
      { input: "60", label: "Zowitek" },
      { input: "41", label: "Call 1" },
      { input: "59", label: "Call 2" },
      { input: "26", label: "PTZ" }
    ],
    layouts: [
      { input: "12", label: "2 Camaras", layers: ["2", "3"] },
      { input: "13", label: "3 Camaras", layers: ["2", "3", "4"] },
      { input: "14", label: "4 Camaras", layers: ["2", "3", "4", "5"] },
      { input: "36", label: "2 Camaras + Video", layers: ["2", "3"], hasVideo: true, videoLayer: "4" },
      { input: "31", label: "3 Camaras + Video", layers: ["2", "3", "4"], hasVideo: true, videoLayer: "5" },
      { input: "34", label: "4 Camaras + Video", layers: ["2", "3", "4", "5"], hasVideo: true, videoLayer: "6" },
      { input: "45", label: "3 Camaras + Call", layers: ["2", "3", "4"] },
      { input: "46", label: "4 Camaras A", layers: ["2", "3", "4", "5"] },
      { input: "47", label: "4 Camaras B", layers: ["2", "3", "4", "5"] },
      { input: "48", label: "4 Camaras + Video A", layers: ["2", "3", "4", "5"], hasVideo: true, videoLayer: "6" },
      { input: "49", label: "4 Camaras + Video B", layers: ["2", "3", "4", "5"], hasVideo: true, videoLayer: "6" }
    ],
    ptz: [
      { input: "6", label: "PTZ 1 - Camara 6" },
      { input: "26", label: "PTZ 2 - Master 26" }
    ],
    audio: [
      { input: "8", label: "Audio Línea de entrada" },
      { input: "15", label: "NDI DESKTOP-PNCTKA2" },
      { input: "23", label: "APERTURA BFT" },
      { input: "26", label: "PTZ MASTER - ORIGINAL" },
      { input: "37", label: "YA COMIENZA" },
      { input: "38", label: "HASTA LA PROXIMA" },
      { input: "41", label: "Call 1" },
      { input: "43", label: "Publicidades" },
      { input: "44", label: "Zocalos Publicitarios" },
      { input: "50", label: "Imperial" },
      { input: "51", label: "Separador" },
      { input: "52", label: "Separador 1" },
      { input: "53", label: "Carniceria" },
      { input: "54", label: "Casabella" },
      { input: "55", label: "Centro Optico" },
      { input: "56", label: "Comercial Dietrich" },
      { input: "57", label: "Publi Vox" },
      { input: "58", label: "Panda Group Broker Seguros" },
      { input: "59", label: "Call 2" }
    ],
    zocalos: [
      { id: "rugby-zocalo-1", input: "40", label: "Zocalo 1", lines: 1, fields: ["TextBlock1.Text"], fieldLabels: ["RENGLON ZOCALO 1", "Sin segundo renglon"], overlay: "1" }
    ]
  },
  telefederal: {
    name: "TELEFEDERAL",
    help: "Multiviews de TeleFederal. El video queda fijo y la Call 60 se puede elegir como camara.",
    defaultLayout: "12",
    defaultPtz: "26",
    zowitekInput: "68",
    cameras: [
      { input: "1", label: "C1" },
      { input: "2", label: "C2" },
      { input: "3", label: "C3" },
      { input: "4", label: "C4" },
      { input: "5", label: "C5" },
      { input: "6", label: "C6" },
      { input: "68", label: "Zowitek" },
      { input: "26", label: "PTZ" },
      { input: "60", label: "Call" }
    ],
    layouts: [
      { input: "12", label: "2 Camaras", layers: ["2", "3"] },
      { input: "13", label: "3 Camaras", layers: ["2", "3", "4"] },
      { input: "14", label: "4 Camaras", layers: ["2", "3", "4", "5"] },
      { input: "36", label: "2 Camaras + Video", layers: ["2", "3"], hasVideo: true, videoLayer: "4" },
      { input: "31", label: "3 Camaras + Video", layers: ["2", "3", "4"], hasVideo: true, videoLayer: "5" },
      { input: "34", label: "4 Camaras + Video", layers: ["2", "3", "4", "5"], hasVideo: true, videoLayer: "6" },
      { input: "67", label: "5 Camaras", layers: ["2", "3", "4", "5", "6"] },
      { input: "66", label: "5 Camaras + Video", layers: ["2", "3", "4", "5", "6"], hasVideo: true, videoLayer: "7" }
    ],
    ptz: [
      { input: "26", label: "PTZ Master 26" },
      { input: "6", label: "PTZ Camara 6" }
    ],
    audio: [
      { input: "8", label: "Audio Línea de entrada" },
      { input: "15", label: "NDI DESKTOP-PNCTKA2" },
      { input: "23", label: "APERTURA BFT" },
      { input: "25", label: "LOGO - BFT" },
      { input: "26", label: "PTZ MASTER - ORIGINAL" },
      { input: "37", label: "YA COMIENZA" },
      { input: "38", label: "HASTA LA PROXIMA" },
      { input: "41", label: "TFL - STINGER" },
      { input: "42", label: "CGPBB - CAMARON Y LANGOSTINO" },
      { input: "43", label: "CGPBB - RONDA DE NEGOCIOS" },
      { input: "51", label: "PNT CATA REFRIGERACIÓN" },
      { input: "52", label: "PNT COLCHONES ESTE" },
      { input: "53", label: "PNT ESTAMPAS BAHIA" },
      { input: "54", label: "PNT FARMACIA" },
      { input: "55", label: "PNT FILIPPONE" },
      { input: "56", label: "PNT FINANCIERA FENIX" },
      { input: "57", label: "TANDA 2" },
      { input: "58", label: "TANDA 1" },
      { input: "59", label: "PNT MECANIZADOS SR" },
      { input: "60", label: "Call" },
      { input: "61", label: "PNT LUBRICENTRO" },
      { input: "62", label: "Audio Micrófono" },
      { input: "63", label: "PNT ESTILORAK" }
    ],
    zocalos: [
      { id: "telefederal-zocalo-1", input: "40", label: "Zocalo 1", lines: 1, fields: ["TextBlock1.Text"], fieldLabels: ["RENGLON ZOCALO 1", "Sin segundo renglon"], overlay: "1" }
    ]
  },
  flap: {
    name: "FLAP",
    help: "Multiviews de FLAP. El video queda fijo y Zowitek se puede usar como fuente alternativa.",
    defaultLayout: "12",
    defaultPtz: "26",
    zowitekInput: "48",
    videoInput: "56",
    videoLabel: "Video Solo",
    cameras: [
      { input: "1", label: "C1" },
      { input: "2", label: "C2" },
      { input: "3", label: "C3" },
      { input: "4", label: "C4" },
      { input: "5", label: "C5" },
      { input: "6", label: "C6 PTZ" },
      { input: "48", label: "Zowitek" },
      { input: "26", label: "PTZ" },
      { input: "42", label: "Call" }
    ],
    layouts: [
      { input: "12", label: "2 Camaras", layers: ["2", "3"] },
      { input: "13", label: "3 Camaras", layers: ["2", "3", "4"] },
      { input: "14", label: "4 Camaras", layers: ["2", "3", "4", "5"] },
      { input: "36", label: "2 Camaras + Video", layers: ["2", "3"], hasVideo: true, videoLayer: "4" },
      { input: "31", label: "3 Camaras + Video", layers: ["2", "3", "4"], hasVideo: true, videoLayer: "5" },
      { input: "34", label: "4 Camaras + Video", layers: ["2", "3", "4", "5"], hasVideo: true, videoLayer: "6" },
      { input: "47", label: "5 Camaras", layers: ["2", "3", "4", "5", "6"] },
      { input: "46", label: "5 Camaras + Video", layers: ["2", "3", "4", "5", "6"], hasVideo: true, videoLayer: "7" }
    ],
    ptz: [
      { input: "26", label: "PTZ Master 26" },
      { input: "6", label: "Camara 6 PTZ" }
    ],
    audio: [
      { input: "8", label: "Audio Linea de entrada" },
      { input: "23", label: "Apertura FLAP" },
      { input: "25", label: "Logo FLAP" },
      { input: "26", label: "PTZ Master" },
      { input: "37", label: "Ya Comienza" },
      { input: "38", label: "Hasta la Proxima" },
      { input: "41", label: "Stinger" },
      { input: "42", label: "Call" },
      { input: "43", label: "Audio Microfono" },
      { input: "48", label: "Zowitek" }
    ],
    zocalos: [
      { id: "flap-zocalo-1", input: "40", label: "Zocalo 1", lines: 1, fields: ["TextBlock1.Text"], fieldLabels: ["RENGLON ZOCALO 1", "Sin segundo renglon"], overlay: "1" }
    ]
  }
};

const QUICK_ACTIONS = {
  bahia: [
    { label: "Camara 1", fn: "CutDirect", input: "1" },
    { label: "Camara 2", fn: "CutDirect", input: "2" },
    { label: "Camara 3", fn: "CutDirect", input: "3" },
    { label: "Camara 4", fn: "CutDirect", input: "4" },
    { label: "Camara 5", fn: "CutDirect", input: "5" },
    { label: "Camara 6", fn: "CutDirect", input: "6" },
    { label: "Zowitek", fn: "CutDirect", input: "71" },
    { label: "PTZ desde Previo", fn: "CutDirect", input: "0" },
    { label: "Video", fn: "CutDirect", input: "15" },
    { label: "Call", fn: "CutDirect", input: "44" },
    { label: "Dos Camaras", fn: "CutDirect", input: "12" },
    { label: "Tres Camaras", fn: "CutDirect", input: "13" },
    { label: "Cuatro Camaras", fn: "CutDirect", input: "14" },
    { label: "Dos Cam y Video", fn: "CutDirect", input: "36" },
    { label: "Tres Cam y Video", fn: "CutDirect", input: "31" },
    { label: "Cuatro Cam y Video", fn: "CutDirect", input: "34" },
    { label: "5 Camaras", fn: "CutDirect", input: "67" },
    { label: "5 Cam y Video", fn: "CutDirect", input: "66" },
    { label: "6 Camaras", fn: "CutDirect", input: "69" },
    { label: "6 Cam y Video", fn: "CutDirect", input: "68" },
    { label: "Posicion 1", fn: "PreviewInput", input: "27", kind: "preview" },
    { label: "Posicion 2", fn: "PreviewInput", input: "28", kind: "preview" },
    { label: "Posicion 3", fn: "PreviewInput", input: "29", kind: "preview" },
    { label: "Ya Comienza", fn: "CutDirect", input: "37" },
    { label: "Hasta la Proxima", fn: "CutDirect", input: "38" },
    { label: "Apertura BFT", fn: "CutDirect", input: "23" },
    { label: "LOGO", fn: "OverlayInput4", input: "25", kind: "overlay" }
  ],
  aula: [
    { label: "Camara 1", fn: "CutDirect", input: "1" },
    { label: "Camara 2", fn: "CutDirect", input: "2" },
    { label: "Camara 3", fn: "CutDirect", input: "3" },
    { label: "Camara 4", fn: "CutDirect", input: "4" },
    { label: "Camara 5", fn: "CutDirect", input: "5" },
    { label: "Camara 6", fn: "CutDirect", input: "6" },
    { label: "Zowitek", fn: "CutDirect", input: "49" },
    { label: "PTZ desde Previo", fn: "CutDirect", input: "0" },
    { label: "Video", fn: "CutDirect", input: "15" },
    { label: "Video2", fn: "CutDirect", input: "50" },
    { label: "Call", fn: "CutDirect", input: "41" },
    { label: "Dos Camaras", fn: "CutDirect", input: "12" },
    { label: "Tres Camaras", fn: "CutDirect", input: "13" },
    { label: "Cuatro Camaras", fn: "CutDirect", input: "14" },
    { label: "Dos Cam y Video", fn: "CutDirect", input: "36" },
    { label: "Tres Cam y Video", fn: "CutDirect", input: "31" },
    { label: "Cuatro Cam y Video", fn: "CutDirect", input: "34" },
    { label: "5 Camaras", fn: "CutDirect", input: "47" },
    { label: "5 Cam y Video", fn: "CutDirect", input: "48" },
    { label: "Posicion 1", fn: "PreviewInput", input: "27", kind: "preview" },
    { label: "Posicion 2", fn: "PreviewInput", input: "28", kind: "preview" },
    { label: "Posicion 3", fn: "PreviewInput", input: "29", kind: "preview" },
    { label: "Ya Comienza", fn: "CutDirect", input: "37" },
    { label: "Hasta la Proxima", fn: "CutDirect", input: "38" },
    { label: "Apertura Aula", fn: "CutDirect", input: "23" },
    { label: "LOGO", fn: "OverlayInput4", input: "25", kind: "overlay" }
  ],
  rugby: [
    { label: "Camara 1", fn: "CutDirect", input: "1" },
    { label: "Camara 2", fn: "CutDirect", input: "2" },
    { label: "Camara 3", fn: "CutDirect", input: "3" },
    { label: "Camara 4", fn: "CutDirect", input: "4" },
    { label: "Camara 5", fn: "CutDirect", input: "5" },
    { label: "Camara 6", fn: "CutDirect", input: "6" },
    { label: "Zowitek", fn: "CutDirect", input: "60" },
    { label: "PTZ desde Previo", fn: "CutDirect", input: "0" },
    { label: "Video", fn: "CutDirect", input: "15" },
    { label: "Call 1", fn: "CutDirect", input: "41" },
    { label: "Call 2", fn: "CutDirect", input: "59" },
    { label: "Dos Camaras", fn: "CutDirect", input: "12" },
    { label: "Tres Camaras", fn: "CutDirect", input: "13" },
    { label: "Cuatro Camaras", fn: "CutDirect", input: "14" },
    { label: "Dos Cam y Video", fn: "CutDirect", input: "36" },
    { label: "Tres Cam y Video", fn: "CutDirect", input: "31" },
    { label: "Cuatro Cam y Video", fn: "CutDirect", input: "34" },
    { label: "Publicidad", fn: "StartPlayList", kind: "playlist" },
    { label: "Zocalos", fn: "OverlayInput1In", input: "44", kind: "overlay", overlay: "1", restart: true, autoOverlayOut: true },
    { label: "Ya Comienza", fn: "CutDirect", input: "37" },
    { label: "Hasta la Proxima", fn: "CutDirect", input: "38" },
    { label: "Apertura Rugby", fn: "CutDirect", input: "23" },
    { label: "LOGO", fn: "OverlayInput4", input: "25", kind: "overlay" }
  ],
  telefederal: [
    { label: "Camara 1", fn: "CutDirect", input: "1" },
    { label: "Camara 2", fn: "CutDirect", input: "2" },
    { label: "Camara 3", fn: "CutDirect", input: "3" },
    { label: "Camara 4", fn: "CutDirect", input: "4" },
    { label: "Camara 5", fn: "CutDirect", input: "5" },
    { label: "Camara 6", fn: "CutDirect", input: "6" },
    { label: "Zowitek", fn: "CutDirect", input: "68" },
    { label: "PTZ desde Previo", fn: "CutDirect", input: "0" },
    { label: "Video", fn: "CutDirect", input: "15" },
    { label: "Call", fn: "CutDirect", input: "60" },
    { label: "Dos Camaras", fn: "CutDirect", input: "12" },
    { label: "Tres Camaras", fn: "CutDirect", input: "13" },
    { label: "Cuatro Camaras", fn: "CutDirect", input: "14" },
    { label: "Dos Cam y Video", fn: "CutDirect", input: "36" },
    { label: "Tres Cam y Video", fn: "CutDirect", input: "31" },
    { label: "Cuatro Cam y Video", fn: "CutDirect", input: "34" },
    { label: "5 Camaras", fn: "CutDirect", input: "67" },
    { label: "5 Cam y Video", fn: "CutDirect", input: "66" },
    { label: "Posicion 1", fn: "PreviewInput", input: "27", kind: "preview" },
    { label: "Posicion 2", fn: "PreviewInput", input: "28", kind: "preview" },
    { label: "Posicion 3", fn: "PreviewInput", input: "29", kind: "preview" },
    { label: "Ya Comienza", fn: "CutDirect", input: "37" },
    { label: "Hasta la Proxima", fn: "CutDirect", input: "38" },
    { label: "Apertura Tele", fn: "CutDirect", input: "23" },
    { label: "LOGO", fn: "OverlayInput4", input: "25", kind: "overlay" }
  ],
  flap: [
    { label: "Camara 1", fn: "CutDirect", input: "1" },
    { label: "Camara 2", fn: "CutDirect", input: "2" },
    { label: "Camara 3", fn: "CutDirect", input: "3" },
    { label: "Camara 4", fn: "CutDirect", input: "4" },
    { label: "Camara 5", fn: "CutDirect", input: "5" },
    { label: "Camara 6", fn: "CutDirect", input: "6" },
    { label: "Zowitek", fn: "CutDirect", input: "48" },
    { label: "PTZ desde Previo", fn: "CutDirect", input: "0" },
    { label: "Video Solo", fn: "CutDirect", input: "56" },
    { label: "Call", fn: "CutDirect", input: "42" },
    { label: "Dos Camaras", fn: "CutDirect", input: "12" },
    { label: "Tres Camaras", fn: "CutDirect", input: "13" },
    { label: "Cuatro Camaras", fn: "CutDirect", input: "14" },
    { label: "Dos Cam y Video", fn: "CutDirect", input: "36" },
    { label: "Tres Cam y Video", fn: "CutDirect", input: "31" },
    { label: "Cuatro Cam y Video", fn: "CutDirect", input: "34" },
    { label: "5 Camaras", fn: "CutDirect", input: "47" },
    { label: "5 Cam y Video", fn: "CutDirect", input: "46" },
    { label: "Posicion 1", fn: "PreviewInput", input: "27", kind: "preview" },
    { label: "Posicion 2", fn: "PreviewInput", input: "28", kind: "preview" },
    { label: "Posicion 3", fn: "PreviewInput", input: "29", kind: "preview" },
    { label: "Ya Comienza", fn: "CutDirect", input: "37" },
    { label: "Hasta la Proxima", fn: "CutDirect", input: "38" },
    { label: "Apertura FLAP", fn: "CutDirect", input: "23" },
    { label: "Hora / Temp", fn: "OverlayInput8", input: "59", kind: "overlay", overlay: "8" },
    { label: "LOGO", fn: "OverlayInput4", input: "25", kind: "overlay" },
    { label: "REDES", fn: "OverlayInput7", input: "58", kind: "overlay", overlay: "7" }
  ]
};

const GLOBAL_QUICK_ACTIONS = [];

const PUBLICIDAD_ACTIONS = {
  telefederal: [
    {
      title: "PNTS",
      actions: [
        { label: "CATA REFRIGERACION", fn: "CutDirect", input: "51" },
        { label: "COLCHONES ESTE", fn: "CutDirect", input: "52" },
        { label: "ESTAMPAS BAHIA", fn: "CutDirect", input: "53" },
        { label: "FARMACIA TAVERNA", fn: "CutDirect", input: "54" },
        { label: "FILIPPONE", fn: "CutDirect", input: "55" },
        { label: "FINANCIERA FENIX", fn: "CutDirect", input: "56" },
        { label: "MECANIZADOS SR", fn: "CutDirect", input: "59" },
        { label: "LOCOS POR LA CERVEZA", fn: "CutDirect", input: "69", resetOnComplete: true },
        { label: "LUBRICENTRO", fn: "CutDirect", input: "61" },
        { label: "ESTILORAK", fn: "CutDirect", input: "63" }
      ]
    },
    {
      title: "PLACAS CON AUDIO",
      actions: [
        { label: "LANGOSTINO Y CAMARON", fn: "CutDirect", input: "42" },
        { label: "RONDA DE NEGOCIOS", fn: "CutDirect", input: "43" }
      ]
    },
    {
      title: "CORTES",
      actions: [
        { label: "TANDA 1", fn: "CutDirect", input: "58" },
        { label: "TANDA 2", fn: "CutDirect", input: "57" },
        { label: "SELECT PLAY LIST ZOCALOS", fn: "SelectPlayList", value: "ZOCALOS", kind: "playlist" },
        { label: "START PLAYLIST", fn: "StartPlayList", kind: "playlist" },
        { label: "ZOCALO TELEFEDERAL", fn: "OverlayInput1", input: "40", kind: "overlay" },
        { label: "LOGO TELEFEDERAL", fn: "OverlayInput4", input: "25", kind: "overlay" }
      ]
    }
  ],
  flap: [
    {
      title: "CORTES",
      actions: [
        { label: "STINGER", fn: "CutDirect", input: "41" },
        { label: "YA COMIENZA", fn: "CutDirect", input: "37" },
        { label: "HASTA LA PROXIMA", fn: "CutDirect", input: "38" }
      ]
    },
    {
      title: "OVERLAYS",
      actions: [
        { label: "ZOCALO FLAP", fn: "OverlayInput1", input: "40", kind: "overlay" },
        { label: "HORA / TEMP", fn: "OverlayInput8", input: "59", kind: "overlay", overlay: "8" },
        { label: "LOGO FLAP", fn: "OverlayInput4", input: "25", kind: "overlay" },
        { label: "REDES", fn: "OverlayInput7", input: "58", kind: "overlay", overlay: "7" }
      ]
    }
  ]
};

const state = {
  inputs: [],
  active: "",
  preview: "",
  masterMeterL: 0,
  masterMeterR: 0,
  activeProject: "telefederal",
  userSelectedProject: false,
  preset: "",
  detectedPreset: "",
  selectedByProject: {},
  selectedPtzByProject: {},
  activePanel: "multiview",
  activePtzHold: "",
  refreshing: false,
  selectedZocaloType: "bft-zocalo-1",
  selectedZocaloId: "",
  selectedZocaloLineIds: { top: "", bottom: "" },
  activeZocaloLine: "top",
  skipNextZocaloClick: false,
  zocaloSearches: {},
  zocaloDrafts: {},
  zocaloNewTexts: {},
  zocaloLibrary: [],
  zocaloDirty: false,
  aulaZocaloPanels: {},
  zocaloOverlaySlots: {},
  overlayWatchers: {}
};
const rtcMonitors = {
  enabled: false,
  started: false,
  fallback: false,
  fallbackTimer: null,
  reconnectTimer: null,
  socket: null,
  pc: null,
  reconnect: null,
  lastFrameAt: Date.now(),
  watchdogStarted: false,
  viewerId: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  streamMap: {},
  videos: {}
};
window.TF_RTC = rtcMonitors;
const localCameraMonitors = {
  started: false,
  starting: false,
  streams: {}
};
window.TF_LOCAL_MONITORS = localCameraMonitors;
const els = {
  status: document.querySelector("#connectionStatus"),
  masterMeterL: document.querySelector("#masterMeterL"),
  masterMeterR: document.querySelector("#masterMeterR"),
  masterPeakL: document.querySelector("#masterPeakL"),
  masterPeakR: document.querySelector("#masterPeakR"),
  masterDbL: document.querySelector("#masterDbL"),
  masterDbR: document.querySelector("#masterDbR"),
  premiereControls: document.querySelector("#premiereControls"),
  premiereStatus: document.querySelector("#premiereStatus"),
  quickActions: document.querySelector("#quickActions"),
  formatGrid: document.querySelector("#formatGrid"),
  formatGrids: [...document.querySelectorAll("[data-format-grid]")],
  cameraGrid: document.querySelector("#cameraGrid"),
  editorTitle: document.querySelector("#editorTitle"),
  editorState: document.querySelector("#editorState"),
  editorAirButton: document.querySelector("#editorAirButton"),
  previewName: document.querySelector("#previewName"),
  programName: document.querySelector("#programName"),
  previewImage: document.querySelector("#previewImage"),
  programImage: document.querySelector("#programImage"),
  ptzPreviewName: document.querySelector("#ptzPreviewName"),
  ptzProgramName: document.querySelector("#ptzProgramName"),
  ptzPreviewImage: document.querySelector("#ptzPreviewImage"),
  ptzProgramImage: document.querySelector("#ptzProgramImage"),
  projectTabs: [...document.querySelectorAll("[data-project-tab]")],
  projectTitle: document.querySelector("#projectTitle"),
  projectHelp: document.querySelector("#projectHelp"),
  ptzSwitcher: document.querySelector("#ptzSwitcher"),
  ptzControls: document.querySelector("#ptzControls"),
  ptzSelectedName: document.querySelector("#ptzSelectedName"),
  ptzPreviewButton: document.querySelector("#ptzPreviewButton"),
  ptzAirButton: document.querySelector("#ptzAirButton"),
  zocaloSubtabs: document.querySelector("#zocaloSubtabs"),
  zocaloBoard: document.querySelector("#zocaloBoard"),
  zocaloPreviewName: document.querySelector("#zocaloPreviewName"),
  zocaloProgramName: document.querySelector("#zocaloProgramName"),
  zocaloPreviewImage: document.querySelector("#zocaloPreviewImage"),
  zocaloProgramImage: document.querySelector("#zocaloProgramImage"),
  audioBoard: document.querySelector("#audioBoard"),
  publicidadesBoard: document.querySelector("#publicidadesBoard"),
  publicidadesPreviewName: document.querySelector("#publicidadesPreviewName"),
  publicidadesProgramName: document.querySelector("#publicidadesProgramName"),
  publicidadesPreviewImage: document.querySelector("#publicidadesPreviewImage"),
  publicidadesProgramImage: document.querySelector("#publicidadesProgramImage"),
  panelTabs: [...document.querySelectorAll("[data-panel-tab]")],
  panels: [...document.querySelectorAll("[data-panel]")],
  log: document.querySelector("#logLine")
};

function currentProject() { return PROJECTS[state.activeProject] || PROJECTS.telefederal; }
function currentLayouts() { return currentProject().layouts; }
function currentCameras() { return currentProject().cameras; }
function currentPtzSources() { return currentProject().ptz; }
function currentZocaloTypes() { return currentProject().zocalos || []; }
function hasPublicidades() { return Boolean((PUBLICIDAD_ACTIONS[state.activeProject] || []).length); }
function usesCompactZocalos() {
  const types = currentZocaloTypes();
  return ["aula", "rugby", "bahia", "telefederal", "flap"].includes(state.activeProject) && types.length > 0;
}
function selectedLayout() {
  const layouts = currentLayouts();
  const selected = state.selectedByProject[state.activeProject] || currentProject().defaultLayout;
  return layouts.find((layout) => layout.input === selected) || layouts[0];
}
function orderedLayoutsForDisplay(layouts) {
  return [...layouts].sort((a, b) => {
    const countDiff = a.layers.length - b.layers.length;
    if (countDiff !== 0) return countDiff;
    const videoDiff = Number(Boolean(a.hasVideo)) - Number(Boolean(b.hasVideo));
    if (videoDiff !== 0) return videoDiff;
    return 0;
  });
}
function compactLayoutLabel(layout) {
  const original = layout.displayLabel || layout.label || "";
  const suffix = original.match(/\b([AB])$/i)?.[1];
  const hasCall = /call/i.test(original);
  let label = `${layout.layers.length} Cam`;
  if (hasCall) label += " + Call";
  else if (layout.hasVideo) label += " + Video";
  if (suffix && !hasCall) label += ` ${suffix.toUpperCase()}`;
  return label;
}
function selectedPtzInput() {
  return state.selectedPtzByProject[state.activeProject] || currentProject().defaultPtz || currentPtzSources()[0]?.input || "";
}
function getInput(inputNumber) { return state.inputs.find((input) => input.number === String(inputNumber)); }
function inputTitle(inputNumber) { return getInput(inputNumber)?.title || `Input ${inputNumber}`; }
function isOfflineInput(inputNumber) {
  const input = getInput(inputNumber);
  if (!input) return false;
  return input.type === "Placeholder" || /^offline\b/i.test(input.title.trim());
}
function assertPlayableInput(inputNumber, actionLabel = "Accion") {
  if (!isOfflineInput(inputNumber)) return;
  throw new Error(`${actionLabel}: ${inputTitle(inputNumber)} esta offline en vMix.`);
}
function setLog(message) { els.log.textContent = message; }
function setStatus(online, message) { els.status.textContent = message; els.status.classList.toggle("online", online); els.status.classList.toggle("offline", !online); }
function selectedZocaloType() {
  const types = currentZocaloTypes();
  return types.find((type) => type.id === state.selectedZocaloType) || types[0];
}
function zocaloStorageKey() { return `todoTerreno.zocalos.${state.activeProject}`; }
function defaultZocaloLibrary() {
  return (UTC_ZOCALO_PRESETS[state.activeProject] || []).map((item) => ({ ...item }));
}

function fixTextEncoding(value = "") {
  const win1252 = new Map([
    [0x20ac, 0x80], [0x201a, 0x82], [0x0192, 0x83], [0x201e, 0x84], [0x2026, 0x85], [0x2020, 0x86], [0x2021, 0x87], [0x02c6, 0x88], [0x2030, 0x89], [0x0160, 0x8a], [0x2039, 0x8b], [0x0152, 0x8c], [0x017d, 0x8e],
    [0x2018, 0x91], [0x2019, 0x92], [0x201c, 0x93], [0x201d, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97], [0x02dc, 0x98], [0x2122, 0x99], [0x0161, 0x9a], [0x203a, 0x9b], [0x0153, 0x9c], [0x017e, 0x9e], [0x0178, 0x9f]
  ]);
  const byteOf = (char) => {
    const code = char.codePointAt(0);
    if (code <= 0xff) return code;
    return win1252.get(code);
  };
  let fixed = "";
  for (let index = 0; index < String(value).length; index += 1) {
    const first = byteOf(value[index]);
    const second = index + 1 < value.length ? byteOf(value[index + 1]) : undefined;
    if ((first === 0xc2 || first === 0xc3) && second >= 0x80 && second <= 0xbf) {
      fixed += new TextDecoder().decode(new Uint8Array([first, second]));
      index += 1;
    } else {
      fixed += value[index];
    }
  }
  return fixed
    .replace(/compart\?í/g, "compartí")
    .replace(/Miguel Donad\?o/g, "Miguel Donadío");
}

const TELEFEDERAL_NORMAL_CASE = {
  "¡ARRANCAMOS UN NUEVO TELEFEDERAL!": "¡Arrancamos un nuevo TeleFederal!",
  "TELEFEDERAL, UN ESPACIO DE FÚTBOL LOCAL": "TeleFederal, un espacio de fútbol local",
  "LUCIANO DELGADO - ROMÁN IGARTUA": "Luciano Delgado - Román Igartua",
  "LUCIANO DELGADO - ROMÁN IGARTUA - FELIPE NOUGUES": "Luciano Delgado - Román Igartua - Felipe Nougues",
  "SEGUÍNOS EN NUESTRO IG: @TELEFEDERALBAHIA": "Seguinos en nuestro IG: @telefederalbahia",
  "OLIMPO RECIBE A KIMBERLEY Y VILLA MITRE VA A TANDIL": "Olimpo recibe a Kimberley y Villa Mitre va a Tandil",
  "OLIMPO BUSCARÁ VOLVER AL TRIUNFO EN EL CARMINATT": "Olimpo buscará volver al triunfo en el Carminatt",
  "VILLA MITRE, NECESITADO DE GANAR EN TANDIL": "Villa Mitre, necesitado de ganar en Tandil",
  "HABLA DIEGO COCHAS, DT DE VILLA MITRE": "Habla Diego Cochas, DT de Villa Mitre",
  "COCHAS: \"LOS RIVALES NO NOS HAN HECHO SUFRIR\"": "Cochas: \"Los rivales no nos han hecho sufrir\"",
  "COCHAS: \"SOY EL RESPONSABLE DE ESTE MOMENTO DEPORTIVO\"": "Cochas: \"Soy el responsable de este momento deportivo\"",
  "COCHAS: \"ESTÁ EN SU DERECHO DE ESTAR ENOJADA LA GENTE\"": "Cochas: \"Está en su derecho de estar enojada la gente\"",
  "COCHAS: \"HABLÉ CON FERNÁNDEZ, RESPETÉ SU DECISIÓN PERO NO LA COMPARTÍ\"": "Cochas: \"Hablé con Fernández, respeté su decisión pero no la compartí\"",
  "INVITADO EN PISO: MARIO \"PELUSA\" MARTÍNEZ, PTE. DE SAN FRANCISCO": "Invitado en piso: Mario \"Pelusa\" Martínez, Pte. de San Francisco",
  "FELIPE NOUGUES": "Felipe Nougues"
};

function normalizeTeleFederalZocalos(items) {
  if (state.activeProject !== "telefederal") return items;
  return items.map((item) => {
    const text = item.text || "";
    return { ...item, text: TELEFEDERAL_NORMAL_CASE[text.trim()] || text };
  });
}

function normalizeZocaloItems(items) {
  const normalized = [];
  items.forEach((item, index) => {
    if (item.line) {
      normalized.push({ ...item, text: fixTextEncoding(item.text || "") });
      return;
    }
    if ((item.id || "").startsWith("utc-bft-")) return;
    if ("top" in item) {
      normalized.push({
        id: `${item.id || `legacy-${index}`}-top`,
        type: item.type,
        line: "top",
        text: fixTextEncoding(item.top || "")
      });
    }
    if ("bottom" in item) {
      normalized.push({
        id: `${item.id || `legacy-${index}`}-bottom`,
        type: item.type,
        line: "bottom",
        text: fixTextEncoding(item.bottom || "")
      });
    }
  });
  return normalized;
}

function loadZocaloLibrary() {
  try {
    const saved = JSON.parse(localStorage.getItem(zocaloStorageKey()) || "[]");
    const savedItems = normalizeZocaloItems(Array.isArray(saved) ? saved : []);
    const defaults = defaultZocaloLibrary();
    const savedIds = new Set(savedItems.map((item) => item.id));
    state.zocaloLibrary = [...savedItems, ...defaults.filter((item) => !savedIds.has(item.id))];
  } catch {
    state.zocaloLibrary = defaultZocaloLibrary();
  }
  state.zocaloLibrary = normalizeTeleFederalZocalos(state.zocaloLibrary);
  saveZocaloLibrary();
}

function saveZocaloLibrary() {
  localStorage.setItem(zocaloStorageKey(), JSON.stringify(state.zocaloLibrary));
}

function textForInput(inputNumber, fieldName) {
  const input = getInput(inputNumber);
  return input?.texts?.find((text) => text.name === fieldName)?.value || "";
}

function zocaloTitle(item) {
  const main = item.text || item.top || item.bottom || "";
  return main.length > 42 ? `${main.slice(0, 42)}...` : main;
}

function zocaloKey(typeId, line) {
  return `${typeId}:${line}`;
}

function zocaloLines(type) {
  return type.lines > 1 ? ["top", "bottom"] : ["top"];
}

function zocaloLineLabel(type, line) {
  if (line === "bottom") return type.fieldLabels?.[1] || "Renglon 2";
  return type.fieldLabels?.[0] || "Renglon 1";
}

function zocaloDraft(type) {
  if (!state.zocaloDrafts[type.id]) {
    state.zocaloDrafts[type.id] = {
      top: textForInput(type.input, type.fields[0]),
      bottom: type.lines > 1 ? textForInput(type.input, type.fields[1]) : ""
    };
  }
  return state.zocaloDrafts[type.id];
}

function selectedZocaloLineId(typeId, line) {
  return state.selectedZocaloLineIds[zocaloKey(typeId, line)] || "";
}

function setSelectedZocaloLineId(typeId, line, id) {
  state.selectedZocaloLineIds[zocaloKey(typeId, line)] = id;
}

function zocaloLineItems(type, line, includeLive = true) {
  const liveText = line === "bottom" ? textForInput(type.input, type.fields[1]) : textForInput(type.input, type.fields[0]);
  const liveItems = includeLive ? [{ id: `live-${type.id}-${line}`, type: type.id, line, text: liveText, live: true }] : [];
  return [...liveItems, ...state.zocaloLibrary.filter((item) => item.type === type.id && item.line === line)];
}

function zocaloOverlaySlot(type) {
  return state.zocaloOverlaySlots[type.id] || type.overlay || "1";
}

function setZocaloOverlaySlot(typeId, slot) {
  state.zocaloOverlaySlots[typeId] = String(slot || "1");
  try {
    localStorage.setItem("todoTerreno.zocaloOverlaySlots", JSON.stringify(state.zocaloOverlaySlots));
  } catch {}
}

function loadZocaloOverlaySlots() {
  try {
    state.zocaloOverlaySlots = JSON.parse(localStorage.getItem("todoTerreno.zocaloOverlaySlots") || "{}") || {};
  } catch {
    state.zocaloOverlaySlots = {};
  }
}

function renderAulaZocalos() {
  const types = currentZocaloTypes();
  if (!types.some((item) => item.id === state.selectedZocaloType)) state.selectedZocaloType = types[0]?.id || "";
  const type = types.find((item) => item.id === state.selectedZocaloType) || types[0];
  if (!type) return false;
  state.selectedZocaloType = type.id;
  els.zocaloSubtabs.innerHTML = "";
  els.zocaloBoard.innerHTML = "";

  zocaloLines(type).forEach((line) => {
    const currentItems = zocaloLineItems(type, line, false);
    const currentSelectedId = selectedZocaloLineId(type.id, line);
    if ((!currentSelectedId || !currentItems.some((item) => item.id === currentSelectedId)) && currentItems.length) {
      setSelectedZocaloLineId(type.id, line, currentItems[0].id);
      zocaloDraft(type)[line] = currentItems[0].text || "";
    }
  });

  const input = getInput(type.input);
  const card = document.createElement("article");
  card.className = "aula-zocalo-box";
  card.classList.toggle("is-missing", !input);

  if (types.length > 1) {
    const compactTabs = document.createElement("div");
    compactTabs.className = "aula-zocalo-tabs";
    types.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "zocalo-subtab";
      button.classList.toggle("is-active", item.id === type.id);
      button.dataset.zocaloTab = item.id;
      button.textContent = item.label;
      compactTabs.appendChild(button);
    });
    card.appendChild(compactTabs);
  }

  const head = document.createElement("div");
  head.className = "aula-zocalo-head";
  const titleBox = document.createElement("div");
  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = `Input ${type.input}`;
  const title = document.createElement("h3");
  title.textContent = input?.title?.replace(/^Offline - /, "") || type.label;
  titleBox.append(eyebrow, title);
  const slotSelect = document.createElement("select");
  slotSelect.dataset.aulaZocaloSlot = type.id;
  for (let slot = 1; slot <= 8; slot += 1) {
    const option = document.createElement("option");
    option.value = String(slot);
    option.textContent = `Overlay ${slot}`;
    slotSelect.appendChild(option);
  }
  slotSelect.value = zocaloOverlaySlot(type);
  const headControls = document.createElement("div");
  headControls.className = "aula-head-controls";
  headControls.appendChild(slotSelect);
  headControls.insertAdjacentHTML("beforeend", `
    <button type="button" class="preview-button" data-send-zocalo="${type.id}">IN</button>
    <button type="button" class="select-format" data-off-zocalo="${type.id}">OUT</button>
    <button type="button" class="air-button" data-clear-zocalo="${type.id}">Quitar</button>
  `);
  head.append(titleBox, headControls);

  const linesWrap = document.createElement("div");
  linesWrap.className = "aula-lines-wrap";
  linesWrap.classList.toggle("is-two-lines", type.lines > 1);
  zocaloLines(type).forEach((line) => {
    const currentItems = zocaloLineItems(type, line, false);
    const selectedId = selectedZocaloLineId(type.id, line);
    const selectedItem = currentItems.find((item) => item.id === selectedId);
    const selectedText = selectedItem ? selectedItem.text || "" : zocaloDraft(type)[line] || "Seleccionar titulo";
    const panelKey = zocaloKey(type.id, line);

    const lineBox = document.createElement("section");
    lineBox.className = "aula-line-box";
    const label = document.createElement("p");
    label.className = "field-label";
    label.textContent = zocaloLineLabel(type, line);

    const shell = document.createElement("div");
    shell.className = "aula-select-shell";
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "aula-selected-title";
    toggle.dataset.aulaZocaloToggle = type.id;
    toggle.dataset.aulaZocaloLine = line;
    const selectedLabel = document.createElement("span");
    selectedLabel.textContent = selectedText;
    const chevron = document.createElement("span");
    chevron.className = "chevron";
    chevron.textContent = "v";
    toggle.append(selectedLabel, chevron);
    const panel = document.createElement("div");
    panel.className = "aula-list-panel";
    panel.hidden = !state.aulaZocaloPanels[panelKey];
    const list = document.createElement("div");
    list.className = "aula-editable-list";
    if (!currentItems.length) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = "Sin textos guardados.";
      list.appendChild(empty);
    }
    currentItems.forEach((item, index) => {
      const row = document.createElement("input");
      row.type = "text";
      row.className = "aula-row-input";
      row.classList.toggle("is-selected", item.id === selectedId);
      row.value = item.text || "";
      row.dataset.aulaZocaloRow = type.id;
      row.dataset.aulaZocaloLine = line;
      row.dataset.aulaZocaloId = item.id;
      row.dataset.aulaZocaloIndex = String(index);
      list.appendChild(row);
    });
    const add = document.createElement("button");
    add.type = "button";
    add.className = "aula-add-button";
    add.dataset.aulaZocaloAdd = type.id;
    add.dataset.aulaZocaloLine = line;
    add.textContent = "+";
    panel.append(list, add);
    shell.append(toggle, panel);
    lineBox.append(label, shell);
    linesWrap.appendChild(lineBox);
  });

  card.append(head, linesWrap);
  els.zocaloBoard.appendChild(card);
  return true;
}

function captureZocaloFocus() {
  const active = document.activeElement;
  if (!active || !els.zocaloBoard.contains(active)) return null;
  const kinds = [
    ["search", "zocaloSearchType", "zocaloSearchLine"],
    ["edit", "zocaloEditType", "zocaloEditLine"],
    ["new", "zocaloNewType", "zocaloNewLine"],
    ["inline", "zocaloInlineType", "zocaloInlineLine"]
  ];
  const match = kinds.find(([, typeKey, lineKey]) => active.dataset[typeKey] && active.dataset[lineKey]);
  if (!match) return null;
  return {
    kind: match[0],
    type: active.dataset[match[1]],
    line: active.dataset[match[2]],
    id: active.dataset.zocaloInlineId || "",
    start: active.selectionStart,
    end: active.selectionEnd
  };
}

function restoreZocaloFocus(snapshot) {
  if (!snapshot) return;
  const attr = snapshot.kind === "search" ? "zocalo-search" : snapshot.kind === "edit" ? "zocalo-edit" : snapshot.kind === "inline" ? "zocalo-inline" : "zocalo-new";
  const idSelector = snapshot.kind === "inline" && snapshot.id ? `[data-zocalo-inline-id="${snapshot.id}"]` : "";
  const input = els.zocaloBoard.querySelector(`[data-${attr}-type="${snapshot.type}"][data-${attr}-line="${snapshot.line}"]${idSelector}`);
  if (!input) return;
  input.focus();
  if (typeof input.setSelectionRange === "function" && snapshot.start !== null) {
    input.setSelectionRange(snapshot.start, snapshot.end);
  }
}

function setActivePanel(panel) {
  if (panel === "publicidades" && !hasPublicidades()) panel = "multiview";
  state.activePanel = panel;
  els.panelTabs.forEach((button) => button.classList.toggle("is-active", button.dataset.panelTab === panel));
  els.panels.forEach((section) => { section.hidden = section.dataset.panel !== panel; });
  if (panel === "zocalos") renderZocalos();
  if (panel === "publicidades") renderPublicidades();
}

function setActiveProject(project) {
  syncFocusedAulaZocaloRow();
  saveZocaloLibrary();
  state.activeProject = PROJECTS[project] ? project : "telefederal";
  const config = currentProject();
  if (!state.selectedByProject[state.activeProject] && config.defaultLayout) state.selectedByProject[state.activeProject] = config.defaultLayout;
  if (!state.selectedPtzByProject[state.activeProject] && config.defaultPtz) state.selectedPtzByProject[state.activeProject] = config.defaultPtz;
  state.selectedZocaloType = currentZocaloTypes()[0]?.id || "";
  state.selectedZocaloId = "";
  state.selectedZocaloLineIds = { top: "", bottom: "" };
  state.activeZocaloLine = "top";
  state.zocaloSearches = {};
  state.zocaloDrafts = {};
  state.zocaloNewTexts = {};
  state.zocaloDirty = false;
  if (!hasPublicidades() && state.activePanel === "publicidades") state.activePanel = "multiview";
  loadZocaloLibrary();
  els.projectTabs.forEach((button) => button.classList.toggle("is-active", button.dataset.projectTab === state.activeProject));
  els.projectTitle.textContent = config.name;
  els.projectHelp.textContent = config.help;
  render();
  if (state.activePanel === "zocalos") renderZocalos();
}

function detectProjectFromPreset() {
  return "telefederal";
}

async function callVmix(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = query ? `/vmix?${query}` : "/vmix";
  return requestText(url);
}

async function callPremiere(action = "play") {
  if (action === "play" || action === "stop") {
    window.location.href = `telefederal-premiere://${action}`;
    return { message: `Premiere ${action === "stop" ? "Stop" : "Play"} enviado por protocolo local.` };
  }

  const response = await fetch(`/premiere/${encodeURIComponent(action)}`, {
    method: "POST",
    cache: "no-store"
  });
  const text = await response.text();
  let payload = {};
  try {
    payload = JSON.parse(text);
  } catch {
    payload = { error: text };
  }
  if (!response.ok) throw new Error(payload.error || text || "No pude controlar Premiere.");
  return payload;
}

function setPremiereStatus(connected, text) {
  if (!els.premiereControls || !els.premiereStatus) return;
  els.premiereControls.classList.toggle("is-online", connected);
  els.premiereControls.classList.toggle("is-offline", !connected);
  els.premiereStatus.textContent = text;
}

async function refreshPremiereStatus() {
  try {
    const response = await fetch("/premiere/status", { cache: "no-store" });
    const payload = await response.json();
    setPremiereStatus(!!payload.connected, payload.connected ? "Premiere OK" : "Sin Premiere");
  } catch {
    setPremiereStatus(false, "Sin Premiere");
  }
}

async function runPremierePanelAction(action) {
  const isStop = action === "stop";
  setLog(`Enviando ${isStop ? "Stop" : "Play"} a Premiere...`);
  const result = await callPremiere(isStop ? "stop" : "play");
  setLog(`Premiere: ${result.message || "comando enviado."}`);
  refreshPremiereStatus();
}

async function requestText(url) {
  if (typeof fetch === "function") {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error((await response.text()) || `HTTP ${response.status}`);
    return response.text();
  }

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader("Cache-Control", "no-store");
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) resolve(request.responseText);
      else reject(new Error(request.responseText || `HTTP ${request.status}`));
    };
    request.onerror = () => reject(new Error("No pude conectar con vMix."));
    request.ontimeout = () => reject(new Error("Timeout conectando con vMix."));
    request.timeout = 10000;
    request.send();
  });
}

function bahiaTimeText() {
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date());
}

async function bahiaTemperatureText() {
  let weather = null;
  try {
    const response = await fetch("/weather/bahia", { cache: "no-store" });
    if (response.ok) weather = await response.json();
  } catch {}

  if (!weather) {
    const direct = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-38.7196&longitude=-62.2724&current=temperature_2m,weather_code&timezone=America%2FArgentina%2FBuenos_Aires", { cache: "no-store" });
    if (!direct.ok) throw new Error("No pude leer temperatura de Bahia Blanca.");
    const data = await direct.json();
    weather = {
      temperature: data.current?.temperature_2m,
      weatherCode: data.current?.weather_code
    };
  }

  return {
    text: `${Math.round(Number(weather.temperature))} °C`,
    code: Number(weather.weatherCode)
  };
}

function drawSun(ctx, x, y, partlyHidden = false) {
  ctx.save();
  ctx.strokeStyle = "#ffd43b";
  ctx.fillStyle = "#ffd43b";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  const radius = partlyHidden ? 9 : 11;
  for (let index = 0; index < 8; index += 1) {
    const angle = index * Math.PI / 4;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(angle) * (radius + 5), y + Math.sin(angle) * (radius + 5));
    ctx.lineTo(x + Math.cos(angle) * (radius + 10), y + Math.sin(angle) * (radius + 10));
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawCloud(ctx, x, y) {
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "rgba(45, 63, 110, 0.55)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x - 11, y + 2, 10, Math.PI, 0);
  ctx.arc(x + 1, y - 4, 14, Math.PI, 0);
  ctx.arc(x + 15, y + 2, 10, Math.PI, 0);
  ctx.lineTo(x + 25, y + 11);
  ctx.lineTo(x - 21, y + 11);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawWeatherIcon(ctx, code, x, y) {
  if (code === 0) {
    drawSun(ctx, x, y);
    return;
  }
  if (code === 1 || code === 2) {
    drawSun(ctx, x - 9, y - 7, true);
    drawCloud(ctx, x + 5, y + 3);
    return;
  }

  drawCloud(ctx, x, y - 4);
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineWidth = 4;
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    ctx.strokeStyle = "#55d6ff";
    [-12, 0, 12].forEach((offset) => {
      ctx.beginPath();
      ctx.moveTo(x + offset + 3, y + 13);
      ctx.lineTo(x + offset - 2, y + 22);
      ctx.stroke();
    });
  } else if (code >= 71 && code <= 77) {
    ctx.strokeStyle = "#dff7ff";
    ctx.lineWidth = 3;
    [-10, 10].forEach((offset) => {
      ctx.beginPath();
      ctx.moveTo(x + offset - 4, y + 18);
      ctx.lineTo(x + offset + 4, y + 18);
      ctx.moveTo(x + offset, y + 14);
      ctx.lineTo(x + offset, y + 22);
      ctx.stroke();
    });
  } else if (code >= 95) {
    ctx.fillStyle = "#ffd43b";
    ctx.beginPath();
    ctx.moveTo(x + 3, y + 11);
    ctx.lineTo(x - 5, y + 25);
    ctx.lineTo(x + 2, y + 23);
    ctx.lineTo(x - 2, y + 34);
    ctx.lineTo(x + 12, y + 17);
    ctx.lineTo(x + 5, y + 18);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

async function renderFlapClockImage() {
  const time = bahiaTimeText();
  let weather = { text: "-- °C", code: NaN };
  try {
    weather = await bahiaTemperatureText();
  } catch {}

  const canvas = document.createElement("canvas");
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(42, 99, 238, 0.92)";
  ctx.fillRect(1546, 18, 160, 70);
  ctx.fillStyle = "rgba(151, 174, 242, 0.92)";
  ctx.fillRect(1706, 18, 210, 70);
  ctx.shadowColor = "rgba(0,0,0,0.45)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 2;
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 38px Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(time, 1558, 55);

  drawWeatherIcon(ctx, weather.code, 1740, 51);

  ctx.font = "900 38px Arial, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(weather.text, 1882, 55);
  ctx.shadowColor = "transparent";

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("No pude generar imagen.")), "image/png");
  });
}

async function updateFlapClockWeather() {
  const liveInput = getInput("59") ? "59" : getInput("57") ? "57" : "";
  if (!liveInput) return;
  const image = await renderFlapClockImage();
  const saveResponse = await fetch("/flap-clock-image", {
    method: "POST",
    headers: { "Content-Type": "image/png" },
    body: image
  });
  if (!saveResponse.ok) throw new Error(await saveResponse.text());
  const saved = await saveResponse.json();
  await callVmix({ Function: "SetImage", Input: liveInput, Value: saved.path });
  setLog(`Hora y temperatura Bahia Blanca actualizadas: ${bahiaTimeText()}`);
}

async function refreshFlapClockWeather() {
  if (state.activeProject !== "flap" && !state.preset.toLowerCase().includes("flap")) return;
  try {
    await updateFlapClockWeather();
  } catch (error) {
    setLog(error.message || "No pude actualizar hora y temperatura.");
  }
}

function parseState(xmlText) {
  const xml = new DOMParser().parseFromString(xmlText, "text/xml");
  const vmix = xml.querySelector("vmix");
  if (!vmix) throw new Error("Respuesta invalida de vMix.");
  state.preset = vmix.querySelector("preset")?.textContent.trim() || "";
  state.active = vmix.querySelector("active")?.textContent.trim() || "";
  state.preview = vmix.querySelector("preview")?.textContent.trim() || "";
  const master = vmix.querySelector("audio > master");
  state.masterMeterL = Number(master?.getAttribute("meterF1") || 0);
  state.masterMeterR = Number(master?.getAttribute("meterF2") || 0);
  state.inputs = [...xml.querySelectorAll("inputs > input")].map((input) => ({
    number: input.getAttribute("number"),
    key: input.getAttribute("key"),
    title: input.getAttribute("title") || `Input ${input.getAttribute("number")}`,
    state: input.getAttribute("state") || "",
    position: Number(input.getAttribute("position") || 0),
    duration: Number(input.getAttribute("duration") || 0),
    type: input.getAttribute("type") || "",
    muted: input.getAttribute("muted") || "",
    volume: input.getAttribute("volume") || "",
    balance: input.getAttribute("balance") || "",
    solo: input.getAttribute("solo") || "",
    audioBusses: input.getAttribute("audiobusses") || "",
    meterF1: Number(input.getAttribute("meterF1") || 0),
    meterF2: Number(input.getAttribute("meterF2") || 0),
    gainDb: input.getAttribute("gainDb") || "",
    overlays: [...input.querySelectorAll("overlay")].map((overlay) => ({ index: overlay.getAttribute("index"), key: overlay.getAttribute("key") })),
    texts: [...input.querySelectorAll("text")].map((text) => ({ index: text.getAttribute("index"), name: text.getAttribute("name"), value: text.textContent || "" }))
  }));
}

function renderMasterMeter() {
  const toDb = (value) => {
    const linear = Math.max(0.000001, Math.min(1, Number(value) || 0));
    return 20 * Math.log10(linear);
  };
  const toDbLevel = (value) => {
    const db = toDb(value);
    return Math.max(0, Math.min(1, (db + 60) / 60));
  };
  const formatDb = (value) => {
    const db = toDb(value);
    if (db <= -59.5) return "-inf";
    return `${Math.round(db)}dB`;
  };
  const l = toDbLevel(state.masterMeterL);
  const r = toDbLevel(state.masterMeterR);
  state.masterPeakL = Math.max(l, (state.masterPeakL || 0) * 0.94);
  state.masterPeakR = Math.max(r, (state.masterPeakR || 0) * 0.94);
  els.masterMeterL?.style.setProperty("--level", l);
  els.masterMeterR?.style.setProperty("--level", r);
  els.masterPeakL?.style.setProperty("--peak", state.masterPeakL);
  els.masterPeakR?.style.setProperty("--peak", state.masterPeakR);
  if (els.masterDbL) els.masterDbL.textContent = formatDb(state.masterMeterL);
  if (els.masterDbR) els.masterDbR.textContent = formatDb(state.masterMeterR);
}

function renderQuickActions() {
  const actions = [...GLOBAL_QUICK_ACTIONS, ...(QUICK_ACTIONS[state.activeProject] || [])]
    .map((action, quickIndex) => ({ ...action, quickIndex }));
  if (!els.quickActions) return;
  els.quickActions.hidden = actions.length === 0;
  els.quickActions.innerHTML = "";
  actions.forEach((action, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `quick-action ${action.kind === "preview" ? "is-preview" : action.kind === "premiere" ? "is-premiere" : "is-air"}`;
    button.textContent = action.label;
    button.dataset.quickAction = String(action.quickIndex);
    els.quickActions.appendChild(button);
  });
}

function renderPanelTabs() {
  if (!hasPublicidades() && state.activePanel === "publicidades") state.activePanel = "multiview";
  els.panelTabs.forEach((button) => {
    const isProjectOnly = button.dataset.panelTab === "publicidades";
    button.hidden = isProjectOnly && !hasPublicidades();
    button.classList.toggle("is-active", button.dataset.panelTab === state.activePanel);
  });
  els.panels.forEach((section) => { section.hidden = section.dataset.panel !== state.activePanel; });
}

function renderPublicidades() {
  if (!els.publicidadesBoard) return;
  const scrollPositions = {};
  els.publicidadesBoard.querySelectorAll(".publicidad-actions").forEach((list) => {
    const key = list.dataset.publicidadColumn;
    if (key) scrollPositions[key] = list.scrollTop;
  });
  const columns = PUBLICIDAD_ACTIONS[state.activeProject] || [];
  if (!columns.length) {
    els.publicidadesBoard.innerHTML = '<p class="empty">Esta pestana por ahora no tiene publicidades cargadas.</p>';
    return;
  }
  els.publicidadesBoard.innerHTML = "";
  columns.forEach((column) => {
    const section = document.createElement("section");
    section.className = "publicidad-column";
    const title = document.createElement("h3");
    title.textContent = column.title;
    const list = document.createElement("div");
    list.className = "publicidad-actions";
    list.dataset.publicidadColumn = column.title;
    column.actions.forEach((action, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "publicidad-button";
      button.classList.toggle("is-overlay", action.kind === "overlay");
      button.classList.toggle("is-playlist", action.kind === "playlist");
      button.dataset.publicidadColumn = column.title;
      button.dataset.publicidadIndex = String(index);
      button.disabled = Boolean(action.input) && !getInput(action.input);
      button.textContent = action.label;
      list.appendChild(button);
    });
    const tail = document.createElement("span");
    tail.className = "publicidad-scroll-tail";
    tail.setAttribute("aria-hidden", "true");
    list.appendChild(tail);
    section.append(title, list);
    els.publicidadesBoard.appendChild(section);
    if (scrollPositions[column.title]) list.scrollTop = scrollPositions[column.title];
  });
}

function audioInputs() {
  const configured = currentProject().audio || [];
  if (configured.length) {
    return configured
      .map((channel) => {
        const input = getInput(channel.input);
        return input ? { ...input, audioLabel: channel.label } : null;
      })
      .filter(Boolean);
  }
  return state.inputs.filter((input) => input.volume !== "" || input.muted !== "" || input.audioBusses);
}

function meterLevel(value) {
  const linear = Math.max(0.000001, Math.min(1, Number(value) || 0));
  const db = 20 * Math.log10(linear);
  return Math.max(0, Math.min(1, (db + 60) / 60));
}

function formatAudioDb(value) {
  const linear = Math.max(0.000001, Math.min(1, Number(value) || 0));
  const db = 20 * Math.log10(linear);
  if (db <= -59.5) return "-inf";
  return `${Math.round(db)}dB`;
}

function renderAudio() {
  if (!els.audioBoard) return;
  if (document.activeElement?.matches?.("[data-audio-volume]")) return;
  const channels = audioInputs();
  if (!channels.length) {
    els.audioBoard.innerHTML = '<p class="empty">No encuentro canales de audio en el proyecto abierto.</p>';
    return;
  }
  els.audioBoard.innerHTML = "";
  channels.forEach((input) => {
    const channel = document.createElement("article");
    channel.className = "audio-channel";
    channel.classList.toggle("is-muted", input.muted === "True");
    const title = document.createElement("div");
    title.className = "audio-title";
    title.innerHTML = `<strong>${input.number}. ${input.audioLabel || input.title}</strong><span>${input.type}${input.audioBusses ? ` · Bus ${input.audioBusses}` : ""}</span>`;

    const meters = document.createElement("div");
    meters.className = "audio-meters";
    ["L", "R"].forEach((side, index) => {
      const value = index === 0 ? input.meterF1 : input.meterF2;
      const row = document.createElement("label");
      row.innerHTML = `<b>${side}</b><i style="--level:${meterLevel(value)}"></i><strong>${formatAudioDb(value)}</strong>`;
      meters.appendChild(row);
    });

    const controls = document.createElement("div");
    controls.className = "audio-controls";
    const mute = document.createElement("button");
    mute.type = "button";
    mute.className = input.muted === "True" ? "preview-button" : "air-button";
    mute.textContent = input.muted === "True" ? "Activar" : "Mute";
    mute.dataset.audioMute = input.number;
    mute.dataset.audioMuted = input.muted === "True" ? "true" : "false";
    const volume = document.createElement("input");
    volume.type = "range";
    volume.min = "0";
    volume.max = "100";
    volume.step = "1";
    volume.value = String(Math.round(Number(input.volume || 0)));
    volume.dataset.audioVolume = input.number;
    const volumeText = document.createElement("span");
    volumeText.textContent = `${volume.value}%`;
    controls.append(mute, volume, volumeText);

    channel.append(title, meters, controls);
    els.audioBoard.appendChild(channel);
  });
}

async function refreshAudioMeter() {
  try {
    parseState(await callVmix());
    renderMasterMeter();
    if (state.activePanel === "audio") renderAudio();
  } catch {
    state.masterMeterL = 0;
    state.masterMeterR = 0;
    renderMasterMeter();
  }
}

function sourceForLayer(layout, layer) {
  const overlay = getInput(layout.input)?.overlays.find((item) => item.index === String(Number(layer) - 1));
  return state.inputs.find((input) => input.key === overlay?.key);
}

function videoLayerForLayout(layout) {
  if (layout.videoLayer) return layout.videoLayer;
  return String(Math.max(...layout.layers.map((layer) => Number(layer))) + 1);
}

function videoSourceOptions() {
  const project = currentProject();
  const zowitekInput = project.zowitekInput || "71";
  const videos = project.videoSources || [{ input: project.videoInput || "15", label: project.videoLabel || "Video" }];
  return [
    ...videos.map((source) => ({ ...source, kind: "video" })),
    { input: zowitekInput, label: "Zowitek", kind: "zowitek" }
  ];
}

function sourceOptionsForLayout(layout) {
  const sources = [...currentCameras()];
  if (!layout.hasVideo && layout.layers.length === 2) {
    videoSourceOptions()
      .filter((source) => source.kind === "video")
      .forEach((video) => {
        if (!sources.some((source) => source.input === video.input)) sources.push(video);
      });
  }
  return sources;
}

function renderFormats() {
  const grids = els.formatGrids.length ? els.formatGrids : [els.formatGrid].filter(Boolean);
  const layouts = orderedLayoutsForDisplay(currentLayouts());
  if (!layouts.length) {
    grids.forEach((grid) => {
      grid.innerHTML = '<p class="empty">Esta pestana queda lista para adaptar cuando carguemos este proyecto en vMix.</p>';
    });
    return;
  }
  const selected = selectedLayout();
  grids.forEach((grid) => {
    const isMainFormatGrid = grid.id === "formatGrid";
    grid.innerHTML = "";
    layouts.forEach((layout) => {
      const input = getInput(layout.input);
      const card = document.createElement("article");
      card.className = "format-card";
      card.classList.toggle("is-selected", layout.input === selected?.input);
      const name = document.createElement("div"); name.className = "format-name"; name.textContent = compactLayoutLabel(layout);
      const meta = document.createElement("div"); meta.className = "format-meta"; meta.textContent = `${layout.layers.length} camaras${layout.hasVideo ? " + video/zowitek" : ""}`;
      const actions = document.createElement("div"); actions.className = "format-actions";
      const select = document.createElement("button"); select.type = "button"; select.className = "select-format"; select.dataset.selectLayout = layout.input; select.textContent = "Editar";
      const preview = document.createElement("button"); preview.type = "button"; preview.className = "preview-button"; preview.dataset.previewLayout = layout.input; preview.textContent = "Preview";
      const air = document.createElement("button"); air.type = "button"; air.className = "air-button"; air.dataset.airLayout = layout.input; air.textContent = "Aire";
      if (isMainFormatGrid) actions.append(select);
      actions.append(preview, air); card.append(name, meta, actions); grid.appendChild(card);
    });
  });
}

function renderEditor() {
  const layout = selectedLayout();
  if (!layout) {
    els.editorTitle.textContent = currentProject().name;
    els.editorState.textContent = "-";
    els.editorAirButton.disabled = true;
    els.editorAirButton.textContent = "Mandar este formato al aire";
    els.cameraGrid.innerHTML = '<p class="empty">Cargamos el proyecto y completamos aca sus formatos.</p>';
    return;
  }
  const target = getInput(layout.input);
  els.editorTitle.textContent = target?.title || layout.label;
  els.editorState.textContent = state.preview === layout.input ? "En Preview" : state.active === layout.input ? "Al aire" : "Edicion";
  els.editorAirButton.disabled = !target;
  els.editorAirButton.dataset.editorAirLayout = layout.input;
  els.editorAirButton.textContent = `Mandar al aire: ${target?.title || layout.label}`;
  els.cameraGrid.innerHTML = "";
  if (!target) { els.cameraGrid.innerHTML = '<p class="empty">No encuentro este multiview en vMix.</p>'; return; }
  layout.layers.forEach((layer, index) => {
    const row = document.createElement("div"); row.className = "camera-row";
    const label = document.createElement("label"); label.textContent = `Posicion ${index + 1}`;
    const current = sourceForLayer(layout, layer);
    const info = document.createElement("small"); info.textContent = current ? `Actual: ${current.title}` : "Sin asignar"; label.appendChild(info);
    const choices = document.createElement("div"); choices.className = "camera-choice-grid";
    const cameras = sourceOptionsForLayout(layout);
    choices.style.gridTemplateColumns = `repeat(${cameras.length}, minmax(0, 1fr))`;
    cameras.forEach((source) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "camera-choice";
      button.classList.toggle("is-selected", source.input === current?.number);
      button.classList.toggle("is-ptz", source.input === "6" || source.input === "26");
      button.dataset.assignCamera = source.input;
      button.dataset.layoutInput = layout.input;
      button.dataset.layoutLayer = layer;
      button.disabled = !getInput(source.input) || !target;
      button.textContent = source.label;
      choices.appendChild(button);
    });
    row.append(label, choices); els.cameraGrid.appendChild(row);
  });
  if (layout.hasVideo) {
    const videoLayer = videoLayerForLayout(layout);
    const current = sourceForLayer(layout, videoLayer);
    const row = document.createElement("div");
    row.className = "camera-row is-video-source";
    const label = document.createElement("label");
    label.textContent = "Video";
    const info = document.createElement("small");
    info.textContent = current ? `Actual: ${current.title}` : "Sin asignar";
    label.appendChild(info);
    const choices = document.createElement("div");
    choices.className = "camera-choice-grid";
    const sources = videoSourceOptions();
    choices.style.gridTemplateColumns = `repeat(${sources.length}, minmax(0, 1fr))`;
    sources.forEach((source) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "camera-choice is-video-choice";
      button.classList.toggle("is-selected", source.input === current?.number);
      button.dataset.assignCamera = source.input;
      button.dataset.layoutInput = layout.input;
      button.dataset.layoutLayer = videoLayer;
      button.disabled = !getInput(source.input) || !target;
      button.textContent = source.label;
      choices.appendChild(button);
    });
    row.append(label, choices);
    els.cameraGrid.appendChild(row);
  }
}

function renderPtz() {
  const sources = currentPtzSources();
  const selectedInput = selectedPtzInput();
  const selected = sources.find((source) => source.input === selectedInput) || sources[0];
  if (!selected) {
    els.ptzSelectedName.textContent = "Sin PTZ configurada para este proyecto";
    els.ptzSwitcher.innerHTML = "";
    els.ptzControls.innerHTML = '<p class="empty">Cuando carguemos este proyecto, agregamos aca sus PTZ.</p>';
    els.ptzPreviewButton.disabled = true;
    els.ptzPreviewButton.textContent = "Mandar PTZ al previo";
    els.ptzAirButton.disabled = true;
    els.ptzAirButton.textContent = "Mandar PTZ al aire";
    return;
  }
  const input = getInput(selected.input);
  els.ptzSelectedName.textContent = input?.title || selected.label;
  els.ptzPreviewButton.disabled = !input;
  els.ptzPreviewButton.dataset.ptzPreviewInput = selected.input;
  els.ptzPreviewButton.textContent = `Mandar al previo: ${input?.title || selected.label}`;
  els.ptzAirButton.disabled = !input;
  els.ptzAirButton.dataset.ptzAirInput = selected.input;
  els.ptzAirButton.textContent = `Mandar al aire: ${input?.title || selected.label}`;
  els.ptzSwitcher.innerHTML = "";
  sources.forEach((source) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ptz-select-button";
    button.classList.toggle("is-selected", source.input === selectedInput);
    button.dataset.selectPtz = source.input;
    button.disabled = !getInput(source.input);
    button.textContent = getInput(source.input)?.title || source.label;
    els.ptzSwitcher.appendChild(button);
  });

  els.ptzControls.innerHTML = "";
  const pad = document.createElement("div"); pad.className = "ptz-pad";
  [["\u2196", "PTZMoveUpLeft"], ["\u2191", "PTZMoveUp"], ["\u2197", "PTZMoveUpRight"], ["\u2190", "PTZMoveLeft"], ["Home", "PTZHome", true], ["\u2192", "PTZMoveRight"], ["\u2199", "PTZMoveDownLeft"], ["\u2193", "PTZMoveDown"], ["\u2198", "PTZMoveDownRight"]].forEach(([label, command, click]) => {
    const button = document.createElement("button");
    button.type = "button"; button.className = "ptz-pad-button"; button.textContent = label; button.disabled = !input;
    if (click) button.dataset.ptzCommand = command;
    else { button.dataset.ptzHold = command; button.dataset.ptzStop = "PTZMoveStop"; }
    pad.appendChild(button);
  });
  const lens = document.createElement("div"); lens.className = "ptz-lens";
  [["Zoom -", "PTZZoomOut", "PTZZoomStop"], ["Zoom +", "PTZZoomIn", "PTZZoomStop"], ["Foco -", "PTZFocusNear", "PTZFocusStop"], ["Foco +", "PTZFocusFar", "PTZFocusStop"], ["Auto foco", "PTZFocusAuto", "", true]].forEach(([label, command, stop, click]) => {
    const button = document.createElement("button");
    button.type = "button"; button.className = "ptz-lens-button"; button.textContent = label; button.disabled = !input;
    if (click) button.dataset.ptzCommand = command;
    else { button.dataset.ptzHold = command; button.dataset.ptzStop = stop; }
    lens.appendChild(button);
  });
  els.ptzControls.append(pad, lens);
}

function renderZocalos() {
  const focusSnapshot = captureZocaloFocus();
  const types = currentZocaloTypes();
  const grid = els.zocaloBoard.closest(".zocalos-grid");
  grid?.classList.toggle("is-aula-zocalos", usesCompactZocalos());
  grid?.classList.toggle("is-side-zocalos", state.activeProject === "telefederal" || state.activeProject === "flap");
  if (!types.length) {
    els.zocaloSubtabs.innerHTML = "";
    els.zocaloBoard.innerHTML = '<p class="empty">Esta pestana por ahora esta armada para Bahia Full Talent.</p>';
    return;
  }
  if (usesCompactZocalos() && renderAulaZocalos()) {
    return;
  }

  if (!types.some((type) => type.id === state.selectedZocaloType)) state.selectedZocaloType = types[0].id;
  const activeType = types.find((type) => type.id === state.selectedZocaloType) || types[0];

  els.zocaloSubtabs.innerHTML = "";
  types.forEach((type) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "zocalo-subtab";
    button.classList.toggle("is-active", type.id === activeType.id);
    button.dataset.zocaloTab = type.id;
    button.textContent = type.label;
    els.zocaloSubtabs.appendChild(button);
  });

  els.zocaloBoard.innerHTML = "";
  [activeType].forEach((type) => {
    const input = getInput(type.input);
    const draft = zocaloDraft(type);
    const card = document.createElement("article");
    card.className = "zocalo-card";
    card.classList.toggle("is-two-lines", type.lines > 1);

    const head = document.createElement("div");
    head.className = "zocalo-card-head";
    const titleBox = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = input?.title || type.label;
    const meta = document.createElement("p");
    meta.textContent = `Input ${type.input}`;
    titleBox.append(title, meta);
    const overlay = document.createElement("select");
    overlay.disabled = true;
    const option = document.createElement("option");
    option.textContent = `Overlay ${type.overlay}`;
    overlay.appendChild(option);
    head.append(titleBox, overlay);
    card.appendChild(head);

    const lineWrap = document.createElement("div");
    lineWrap.className = "zocalo-lines-wrap";
    zocaloLines(type).forEach((line) => {
      const key = zocaloKey(type.id, line);
      const lineBlock = document.createElement("section");
      lineBlock.className = "zocalo-line-block";

      const label = document.createElement("p");
      label.className = "field-label";
      label.textContent = zocaloLineLabel(type, line);

      const search = document.createElement("input");
      search.className = "zocalo-search";
      search.type = "search";
      search.placeholder = "Escribir primeras letras";
      search.value = state.zocaloSearches[key] || "";
      search.dataset.zocaloSearchType = type.id;
      search.dataset.zocaloSearchLine = line;

      const query = search.value.trim().toLowerCase();
      const allItems = zocaloLineItems(type, line).filter((item) => !query || (item.text || "").toLowerCase().includes(query));
      const count = document.createElement("p");
      count.className = "zocalo-count";
      count.textContent = `${allItems.length} textos armados en este listado`;

      const useInlineList = true;
      const list = document.createElement("div");
      list.className = "zocalo-list";
      allItems.forEach((item) => {
        if (useInlineList) {
          const row = document.createElement("div");
          row.className = "zocalo-item-row";
          row.classList.toggle("is-blank", !(item.text || ""));
          row.classList.toggle("is-selected", selectedZocaloLineId(type.id, line) === item.id);
          row.classList.toggle("is-live", Boolean(item.live));

          const inline = document.createElement("input");
          inline.className = "zocalo-row-input";
          inline.value = item.text || "";
          inline.placeholder = item.live ? "Texto actual en vMix" : "";
          inline.readOnly = Boolean(item.live);
          inline.dataset.zocaloInlineType = type.id;
          inline.dataset.zocaloInlineLine = line;
          inline.dataset.zocaloInlineId = item.id;

          const use = document.createElement("button");
          use.type = "button";
          use.className = "select-format";
          use.textContent = item.live ? "Actual" : "Usar";
          use.dataset.loadZocaloLine = item.id;
          use.dataset.zocaloType = type.id;
          use.dataset.zocaloLine = line;

          const saveInline = document.createElement("button");
          saveInline.type = "button";
          saveInline.className = "preview-button";
          saveInline.textContent = "Guardar";
          saveInline.disabled = Boolean(item.live);
          saveInline.dataset.saveInlineZocalo = item.id;
          saveInline.dataset.zocaloType = type.id;
          saveInline.dataset.zocaloLine = line;

          row.append(inline, use, saveInline);
          list.appendChild(row);
          return;
        }

        const button = document.createElement("button");
        button.type = "button";
        button.className = "zocalo-item";
        button.classList.toggle("is-blank", !(item.text || ""));
        button.classList.toggle("is-selected", selectedZocaloLineId(type.id, line) === item.id);
        button.dataset.loadZocaloLine = item.id;
        button.dataset.zocaloType = type.id;
        button.dataset.zocaloLine = line;
        const text = document.createElement("strong");
        text.textContent = item.text ? `${item.live ? "Actual: " : ""}${zocaloTitle(item)}` : "";
        button.appendChild(text);
        list.appendChild(button);
      });

      let editLabel;
      let editRow;
      if (!useInlineList) {
        editLabel = document.createElement("p");
        editLabel.className = "field-label";
        editLabel.textContent = "Editar texto seleccionado";
        editRow = document.createElement("div");
        editRow.className = "zocalo-inline-row";
        const edit = document.createElement("input");
        edit.className = "zocalo-text-input";
        edit.value = draft[line] || "";
        edit.dataset.zocaloEditType = type.id;
        edit.dataset.zocaloEditLine = line;
        const save = document.createElement("button");
        save.type = "button";
        save.className = "preview-button";
        save.textContent = state.zocaloLibrary.some((item) => item.id === selectedZocaloLineId(type.id, line)) ? "Guardar" : "Agregar";
        save.dataset.saveZocaloLine = line;
        save.dataset.zocaloType = type.id;
        editRow.append(edit, save);
      }

      const addLabel = document.createElement("p");
      addLabel.className = "field-label";
      addLabel.textContent = "Agregar texto nuevo";
      const addRow = document.createElement("div");
      addRow.className = "zocalo-inline-row";
      const add = document.createElement("input");
      add.className = "zocalo-text-input";
      add.placeholder = "Nuevo texto";
      add.value = state.zocaloNewTexts[key] || "";
      add.dataset.zocaloNewType = type.id;
      add.dataset.zocaloNewLine = line;
      const addButton = document.createElement("button");
      addButton.type = "button";
      addButton.className = "preview-button";
      addButton.textContent = "Agregar";
      addButton.dataset.addZocaloLine = line;
      addButton.dataset.zocaloType = type.id;
      addRow.append(add, addButton);

      lineBlock.append(label, search, count, list);
      if (editLabel && editRow) lineBlock.append(editLabel, editRow);
      lineBlock.append(addLabel, addRow);
      lineWrap.appendChild(lineBlock);
    });
    card.appendChild(lineWrap);

    const actions = document.createElement("div");
    actions.className = "zocalo-actions";
    actions.innerHTML = `
      <button type="button" class="preview-button" data-send-zocalo="${type.id}">ON</button>
      <button type="button" class="select-format" data-off-zocalo="${type.id}">OFF</button>
      <button type="button" class="air-button" data-clear-zocalo="${type.id}">Quitar texto</button>
    `;
    card.appendChild(actions);
    els.zocaloBoard.appendChild(card);
  });
  restoreZocaloFocus(focusSnapshot);
}

function loadZocaloLineItem(typeId, line, id, overrideText) {
  const type = currentZocaloTypes().find((item) => item.id === typeId);
  if (!type) return;
  const item = zocaloLineItems(type, line).find((entry) => entry.id === id);
  if (!item) return;
  const text = overrideText ?? item.text ?? "";
  state.selectedZocaloId = "";
  setSelectedZocaloLineId(type.id, line, id);
  state.activeZocaloLine = line;
  state.selectedZocaloType = item.type;
  zocaloDraft(type)[line] = text;
  state.zocaloDirty = true;
  renderZocalos();
}

function addZocaloLine(typeId, line, text) {
  const type = currentZocaloTypes().find((item) => item.id === typeId);
  if (!type) return;
  const item = {
    id: `z-${Date.now()}-${line}-${Math.random().toString(16).slice(2)}`,
    type: type.id,
    line,
    text: text || ""
  };
  state.zocaloLibrary.unshift(item);
  setSelectedZocaloLineId(type.id, line, item.id);
  zocaloDraft(type)[line] = item.text;
  saveZocaloLibrary();
  renderZocalos();
  setLog(item.text ? "Renglon agregado a la lista." : "Renglon vacio agregado a la lista.");
}

function addAulaZocaloLine(typeId, line = "top") {
  const type = currentZocaloTypes().find((item) => item.id === typeId);
  if (!type) return;
  const selectedId = selectedZocaloLineId(type.id, line);
  const selectedIndex = state.zocaloLibrary.findIndex((entry) => entry.id === selectedId && entry.type === type.id && entry.line === line);
  const firstTypeIndex = state.zocaloLibrary.findIndex((entry) => entry.type === type.id && entry.line === line);
  const insertIndex = selectedIndex >= 0 ? selectedIndex + 1 : firstTypeIndex >= 0 ? firstTypeIndex : state.zocaloLibrary.length;
  const item = {
    id: `z-${Date.now()}-${line}-${Math.random().toString(16).slice(2)}`,
    type: type.id,
    line,
    text: ""
  };
  state.zocaloLibrary.splice(insertIndex, 0, item);
  setSelectedZocaloLineId(type.id, line, item.id);
  zocaloDraft(type)[line] = "";
  state.activeZocaloLine = line;
  state.aulaZocaloPanels[zocaloKey(type.id, line)] = true;
  saveZocaloLibrary();
  renderZocalos();
  requestAnimationFrame(() => {
    const row = els.zocaloBoard.querySelector(`[data-aula-zocalo-id="${item.id}"]`);
    row?.focus();
  });
  setLog("Renglon vacio agregado debajo del seleccionado.");
}

function updateZocaloLine(typeId, line, id, text) {
  const type = currentZocaloTypes().find((item) => item.id === typeId);
  if (!type || id.startsWith("live-")) return;
  const existingIndex = state.zocaloLibrary.findIndex((entry) => entry.id === id && entry.type === type.id && entry.line === line);
  if (existingIndex < 0) {
    addZocaloLine(typeId, line, text);
    return;
  }
  state.zocaloLibrary[existingIndex] = { ...state.zocaloLibrary[existingIndex], text: text || "" };
  setSelectedZocaloLineId(type.id, line, id);
  zocaloDraft(type)[line] = text || "";
  saveZocaloLibrary();
  renderZocalos();
  setLog(text ? "Renglon actualizado en la lista." : "Renglon guardado vacio.");
}

function updateInlineZocaloText(typeId, line, id, text) {
  const type = currentZocaloTypes().find((item) => item.id === typeId);
  if (!type || id.startsWith("live-")) return;
  const existingIndex = state.zocaloLibrary.findIndex((entry) => entry.id === id && entry.type === type.id && entry.line === line);
  if (existingIndex < 0) return;
  state.zocaloLibrary[existingIndex] = { ...state.zocaloLibrary[existingIndex], text: text || "" };
  if (selectedZocaloLineId(type.id, line) === id) zocaloDraft(type)[line] = text || "";
  saveZocaloLibrary();
}

function syncFocusedAulaZocaloRow() {
  const row = document.activeElement?.closest?.("[data-aula-zocalo-row]");
  if (!row) return;
  updateInlineZocaloText(row.dataset.aulaZocaloRow, row.dataset.aulaZocaloLine, row.dataset.aulaZocaloId, row.value);
  if (row.classList.contains("is-selected")) {
    markAulaZocaloSelection(row.dataset.aulaZocaloRow, row.dataset.aulaZocaloId, row.value);
  }
}

function selectedZocaloText(type, line) {
  const selectedId = selectedZocaloLineId(type.id, line);
  if (!selectedId) return zocaloDraft(type)[line] || "";
  const item = zocaloLineItems(type, line).find((entry) => entry.id === selectedId);
  return item ? item.text || "" : zocaloDraft(type)[line] || "";
}

function selectInlineZocalo(typeId, line, id, text) {
  const type = currentZocaloTypes().find((item) => item.id === typeId);
  if (!type) return;
  setSelectedZocaloLineId(type.id, line, id);
  state.activeZocaloLine = line;
  state.selectedZocaloType = type.id;
  zocaloDraft(type)[line] = text || "";
  state.zocaloDirty = true;
}

function markAulaZocaloSelection(typeId, id, text) {
  const selectedRow = els.zocaloBoard.querySelector(`[data-aula-zocalo-id="${id}"]`);
  const line = selectedRow?.dataset.aulaZocaloLine || state.activeZocaloLine || "top";
  els.zocaloBoard.querySelectorAll(`[data-aula-zocalo-row="${typeId}"][data-aula-zocalo-line="${line}"]`).forEach((row) => {
    row.classList.toggle("is-selected", row.dataset.aulaZocaloId === id);
  });
  const title = els.zocaloBoard.querySelector(`[data-aula-zocalo-toggle="${typeId}"][data-aula-zocalo-line="${line}"] span:first-child`);
  if (title) title.textContent = text || "";
}

function moveAulaZocaloSelection(row, direction) {
  const rows = [...els.zocaloBoard.querySelectorAll(`[data-aula-zocalo-row="${row.dataset.aulaZocaloRow}"][data-aula-zocalo-line="${row.dataset.aulaZocaloLine}"]`)];
  const index = rows.indexOf(row);
  if (index < 0) return false;
  const next = rows[index + direction];
  if (!next) return false;
  next.focus();
  selectInlineZocalo(next.dataset.aulaZocaloRow, next.dataset.aulaZocaloLine, next.dataset.aulaZocaloId, next.value);
  markAulaZocaloSelection(next.dataset.aulaZocaloRow, next.dataset.aulaZocaloId, next.value);
  next.scrollIntoView({ block: "nearest" });
  return true;
}

function clearSelectedAulaZocaloLine(type) {
  const focusedRow = document.activeElement?.closest?.("[data-aula-zocalo-row]");
  const line = focusedRow?.dataset.aulaZocaloLine || state.activeZocaloLine || "top";
  const selectedId = selectedZocaloLineId(type.id, line);
  const existingIndex = state.zocaloLibrary.findIndex((entry) => entry.id === selectedId && entry.type === type.id && entry.line === line);
  const currentItems = zocaloLineItems(type, line, false);
  const currentIndex = currentItems.findIndex((entry) => entry.id === selectedId);
  const selectedText = existingIndex >= 0 ? state.zocaloLibrary[existingIndex].text || "" : "";
  if (existingIndex >= 0) {
    if (selectedText) {
      state.zocaloLibrary[existingIndex] = { ...state.zocaloLibrary[existingIndex], text: "" };
    } else {
      state.zocaloLibrary.splice(existingIndex, 1);
      const remainingItems = currentItems.filter((entry) => entry.id !== selectedId);
      const nextItem = remainingItems[currentIndex] || remainingItems[currentIndex - 1] || remainingItems[0];
      setSelectedZocaloLineId(type.id, line, nextItem?.id || "");
      zocaloDraft(type)[line] = nextItem?.text || "";
      saveZocaloLibrary();
      renderZocalos();
      requestAnimationFrame(() => {
        const row = nextItem ? els.zocaloBoard.querySelector(`[data-aula-zocalo-id="${nextItem.id}"]`) : null;
        row?.focus();
        row?.scrollIntoView({ block: "nearest" });
      });
      return;
    }
    saveZocaloLibrary();
  }
  zocaloDraft(type)[line] = "";
  const row = els.zocaloBoard.querySelector(`[data-aula-zocalo-id="${selectedId}"]`);
  if (row) {
    row.value = "";
    row.focus();
    markAulaZocaloSelection(type.id, selectedId, "");
    row.scrollIntoView({ block: "nearest" });
  }
}

function saveZocaloLine(typeId, line, text) {
  const type = currentZocaloTypes().find((item) => item.id === typeId);
  if (!type) return;
  const selectedId = selectedZocaloLineId(type.id, line);
  const existingIndex = state.zocaloLibrary.findIndex((entry) => entry.id === selectedId && entry.type === type.id && entry.line === line);
  if (existingIndex >= 0) updateZocaloLine(type.id, line, selectedId, text);
  else addZocaloLine(type.id, line, text);
}

async function sendZocalo(typeId) {
  const type = currentZocaloTypes().find((item) => item.id === typeId);
  if (!type) throw new Error("No hay zocalo seleccionado.");
  const input = getInput(type.input);
  if (!input) throw new Error("No encuentro ese zocalo en vMix.");
  syncFocusedAulaZocaloRow();
  saveZocaloLibrary();
  const topText = selectedZocaloText(type, "top");
  const bottomText = selectedZocaloText(type, "bottom");
  await callVmix({ Function: "SetText", Input: type.input, SelectedName: type.fields[0], Value: topText });
  if (type.lines > 1) {
    await callVmix({ Function: "SetText", Input: type.input, SelectedName: type.fields[1], Value: bottomText });
  }
  const overlay = zocaloOverlaySlot(type);
  if (overlay) {
    await callVmix({ Function: `OverlayInput${overlay}In`, Input: type.input });
  }
  setLog(`Zocalo enviado: ${input.title}`);
  refreshState(false);
}

async function offZocalo(typeId) {
  syncFocusedAulaZocaloRow();
  saveZocaloLibrary();
  const type = currentZocaloTypes().find((item) => item.id === typeId);
  const overlay = type ? zocaloOverlaySlot(type) : "";
  if (!type || !overlay) return;
  await callVmix({ Function: `OverlayInput${overlay}Out`, Input: type.input });
  setLog(`${type.label}: zocalo fuera del aire.`);
  refreshState(false);
}

async function clearZocalo(typeId) {
  syncFocusedAulaZocaloRow();
  saveZocaloLibrary();
  const type = currentZocaloTypes().find((item) => item.id === typeId);
  if (!type) return;
  const keepListPosition = usesCompactZocalos();
  const overlay = zocaloOverlaySlot(type);
  if (keepListPosition) clearSelectedAulaZocaloLine(type);
  state.zocaloDrafts[type.id] = { top: "", bottom: "" };
  await callVmix({ Function: "SetText", Input: type.input, SelectedName: type.fields[0], Value: "" });
  if (type.lines > 1) {
    await callVmix({ Function: "SetText", Input: type.input, SelectedName: type.fields[1], Value: "" });
  }
  if (overlay) {
    await callVmix({ Function: `OverlayInput${overlay}Out`, Input: type.input });
  }
  setLog(`${type.label}: texto quitado.`);
  if (!keepListPosition) renderZocalos();
  refreshState(false);
}

function applyLocalAssignment(layoutInput, layer, cameraInput) {
  const target = getInput(layoutInput);
  const camera = getInput(cameraInput);
  if (!target || !camera) return;
  const index = String(Number(layer) - 1);
  const overlay = target.overlays.find((item) => item.index === index);
  if (overlay) overlay.key = camera.key;
  else target.overlays.push({ index, key: camera.key });
}

function monitorUrl(path) {
  const base = window.PANEL_CONFIG?.monitorBase || "";
  return `${base}${path}?v=${Date.now()}`;
}

function rtcUrl() {
  const url = new URL(window.PANEL_CONFIG?.rtcPath || "/rtc", window.location.href);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.search = `?role=viewer&viewerId=${encodeURIComponent(rtcMonitors.viewerId)}`;
  return url.toString();
}

function createMonitorVideo(image, name) {
  const video = document.createElement("video");
  video.className = "monitor-video";
  video.autoplay = true;
  video.muted = true;
  video.playsInline = true;
  video.dataset.monitorStream = name;
  image.insertAdjacentElement("afterend", video);
  image.hidden = true;
  watchRtcVideo(video);
  return video;
}

function isLocalCameraMonitorMode() {
  return window.PANEL_CONFIG?.monitorMode === "localcam";
}

function watchRtcVideo(video) {
  const onFrame = () => {
    rtcMonitors.lastFrameAt = Date.now();
    if (video.requestVideoFrameCallback) {
      video.requestVideoFrameCallback(onFrame);
    }
  };

  video.addEventListener("playing", () => {
    rtcMonitors.lastFrameAt = Date.now();
  });
  video.addEventListener("timeupdate", () => {
    rtcMonitors.lastFrameAt = Date.now();
  });

  if (video.requestVideoFrameCallback) {
    video.requestVideoFrameCallback(onFrame);
  }
}

function ensureRtcVideos() {
  const pairs = [
    [els.previewImage, "preview"],
    [els.programImage, "program"]
  ];

  pairs.forEach(([image, name]) => {
    if (!image || rtcMonitors.videos[image.id]) return;
    rtcMonitors.videos[image.id] = createMonitorVideo(image, name);
  });
}

function setRtcStreams(previewStream, programStream) {
  Object.values(rtcMonitors.videos).forEach((video) => {
    video.srcObject = video.dataset.monitorStream === "preview" ? previewStream : programStream;
  });
}

function matchVideoDevice(devices, requestedName, usedDeviceIds = new Set()) {
  const videoDevices = devices.filter((device) => device.kind === "videoinput");
  const normalized = (requestedName || "").trim().toLowerCase();
  const exact = videoDevices.find((device) => !usedDeviceIds.has(device.deviceId) && device.label.trim().toLowerCase() === normalized);
  if (exact) return exact;
  const partial = videoDevices.find((device) => !usedDeviceIds.has(device.deviceId) && normalized && device.label.toLowerCase().includes(normalized));
  if (partial) return partial;
  return videoDevices.find((device) => !usedDeviceIds.has(device.deviceId)) || videoDevices[0];
}

async function unlockVideoDeviceLabels() {
  if (!navigator.mediaDevices?.getUserMedia || !navigator.mediaDevices?.enumerateDevices) return;
  const devices = await navigator.mediaDevices.enumerateDevices();
  if (devices.some((device) => device.kind === "videoinput" && device.label)) return;
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  stream.getTracks().forEach((track) => track.stop());
}

async function captureLocalMonitor(kind, requestedName, usedDeviceIds) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const device = matchVideoDevice(devices, requestedName, usedDeviceIds);
  if (!device) throw new Error(`No encuentro camara virtual para ${kind}.`);
  usedDeviceIds.add(device.deviceId);
  return navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      deviceId: { exact: device.deviceId },
      width: { ideal: window.PANEL_CONFIG?.monitorWidth || 640 },
      height: { ideal: window.PANEL_CONFIG?.monitorHeight || 360 },
      frameRate: { ideal: window.PANEL_CONFIG?.monitorFps || 25, max: 30 }
    }
  });
}

async function startLocalCameraMonitors() {
  if (!isLocalCameraMonitorMode() || localCameraMonitors.started || localCameraMonitors.starting) return;
  if (!navigator.mediaDevices?.getUserMedia || !navigator.mediaDevices?.enumerateDevices) {
    setLog("Monitores: este navegador no permite tomar las camaras virtuales.");
    return;
  }

  localCameraMonitors.starting = true;
  ensureRtcVideos();
  useMonitorImages(false);
  try {
    await unlockVideoDeviceLabels();
    const usedDeviceIds = new Set();
    const devices = window.PANEL_CONFIG?.monitorDevices || {};
    const previewStream = await captureLocalMonitor("Preview", devices.preview || "vMix Video External 2", usedDeviceIds);
    const programStream = await captureLocalMonitor("Aire", devices.program || "vMix Video", usedDeviceIds);
    localCameraMonitors.streams.preview = previewStream;
    localCameraMonitors.streams.program = programStream;
    setRtcStreams(previewStream, programStream);
    localCameraMonitors.started = true;
    setLog("Monitores locales directos desde vMix activos.");
  } catch (error) {
    useMonitorImages(true);
    setLog(`Monitores locales: ${error.message}`);
  } finally {
    localCameraMonitors.starting = false;
  }
}

function clearRtcStreams() {
  rtcMonitors.previewStream = null;
  rtcMonitors.programStream = null;
  setRtcStreams(null, null);
}

function useMonitorImages(useImages) {
  Object.values(rtcMonitors.videos).forEach((video) => {
    video.hidden = useImages;
    if (useImages) video.srcObject = null;
  });
  [
    els.previewImage,
    els.programImage,
    els.ptzPreviewImage,
    els.ptzProgramImage,
    els.zocaloPreviewImage,
    els.zocaloProgramImage,
    els.publicidadesPreviewImage,
    els.publicidadesProgramImage
  ].forEach((image) => {
    if (image) image.hidden = !useImages;
  });
}

function activateMonitorFallback() {
  if (isLocalCameraMonitorMode()) {
    rtcMonitors.fallback = false;
    rtcMonitors.enabled = false;
    useMonitorImages(false);
    return;
  }
  if (window.PANEL_CONFIG?.monitorMode === "webrtc" && !window.PANEL_CONFIG?.monitorBase) {
    rtcMonitors.fallback = false;
    rtcMonitors.enabled = false;
    clearRtcStreams();
    useMonitorImages(false);
    return;
  }
  rtcMonitors.fallback = true;
  rtcMonitors.enabled = false;
  useMonitorImages(true);
  renderMonitors();
}

function startRtcMonitors() {
  if (isLocalCameraMonitorMode()) {
    startLocalCameraMonitors();
    return;
  }
  if (rtcMonitors.started || window.PANEL_CONFIG?.monitorMode !== "webrtc") return;
  rtcMonitors.started = true;
  rtcMonitors.enabled = true;
  rtcMonitors.fallback = false;
  ensureRtcVideos();
  useMonitorImages(false);
  if (!rtcMonitors.watchdogStarted) {
    rtcMonitors.watchdogStarted = true;
    setInterval(() => {
      if (document.hidden || !rtcMonitors.started || rtcMonitors.fallback) return;
      if (!rtcMonitors.pc || rtcMonitors.pc.connectionState !== "connected") return;
      if (Date.now() - rtcMonitors.lastFrameAt < 9000) return;
      rtcMonitors.reconnect?.(500);
    }, 3000);
  }

  const closeCurrentRtc = () => {
    if (rtcMonitors.fallbackTimer) {
      clearTimeout(rtcMonitors.fallbackTimer);
      rtcMonitors.fallbackTimer = null;
    }
    if (rtcMonitors.socket) {
      rtcMonitors.socket.onclose = null;
      try { rtcMonitors.socket.close(); } catch {}
    }
    if (rtcMonitors.pc) {
      rtcMonitors.pc.onconnectionstatechange = null;
      rtcMonitors.pc.onicecandidate = null;
      rtcMonitors.pc.ontrack = null;
      try { rtcMonitors.pc.close(); } catch {}
    }
    rtcMonitors.socket = null;
    rtcMonitors.pc = null;
  };

  const connect = () => {
    closeCurrentRtc();
    rtcMonitors.enabled = true;
    rtcMonitors.fallback = false;
    useMonitorImages(false);
    const socket = new WebSocket(rtcUrl());
    rtcMonitors.socket = socket;
    rtcMonitors.streamMap = {};
    let gotPreviewTrack = false;
    let gotProgramTrack = false;

    const pc = new RTCPeerConnection({ iceServers: window.PANEL_CONFIG?.iceServers || [] });
    rtcMonitors.pc = pc;

    const cancelReconnect = () => {
      if (!rtcMonitors.reconnectTimer) return;
      clearTimeout(rtcMonitors.reconnectTimer);
      rtcMonitors.reconnectTimer = null;
    };

    const scheduleReconnect = (delay = 1800, closeNow = true) => {
      if (rtcMonitors.reconnectTimer) return;
      rtcMonitors.enabled = false;
      rtcMonitors.fallback = false;
      useMonitorImages(false);
      rtcMonitors.reconnectTimer = setTimeout(() => {
        rtcMonitors.reconnectTimer = null;
        if (!closeNow) closeCurrentRtc();
        connect();
      }, delay);
      if (closeNow) closeCurrentRtc();
    };
    rtcMonitors.reconnect = scheduleReconnect;

    pc.ontrack = (event) => {
      const name = rtcMonitors.streamMap[event.transceiver?.mid] || (Object.keys(rtcMonitors.streamMap).length ? "program" : "preview");
      const stream = event.streams[0] || new MediaStream([event.track]);
      if (name === "preview") {
        gotPreviewTrack = true;
        rtcMonitors.previewStream = stream;
      }
      if (name === "program") {
        gotProgramTrack = true;
        rtcMonitors.programStream = stream;
      }
      rtcMonitors.fallback = false;
      rtcMonitors.lastFrameAt = Date.now();
      useMonitorImages(false);
      setRtcStreams(rtcMonitors.previewStream, rtcMonitors.programStream);
      if (gotPreviewTrack && gotProgramTrack && rtcMonitors.fallbackTimer) {
        clearTimeout(rtcMonitors.fallbackTimer);
        rtcMonitors.fallbackTimer = null;
      }
    };
    pc.onicecandidate = (event) => {
      if (event.candidate && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "ice-candidate", candidate: event.candidate }));
      }
    };
    pc.onconnectionstatechange = () => {
      if (["failed", "closed"].includes(pc.connectionState)) {
        scheduleReconnect();
      } else if (pc.connectionState === "disconnected") {
        scheduleReconnect(6500, false);
      } else if (pc.connectionState === "connected") {
        cancelReconnect();
        rtcMonitors.enabled = true;
        rtcMonitors.fallback = false;
        useMonitorImages(false);
      }
    };

    socket.addEventListener("open", () => {
      socket.send(JSON.stringify({ type: "viewer-ready" }));
      rtcMonitors.fallbackTimer = setTimeout(() => {
        if (!gotPreviewTrack || !gotProgramTrack) scheduleReconnect();
      }, 15000);
    });
    socket.addEventListener("message", async (event) => {
      let message;
      try {
        message = JSON.parse(event.data);
      } catch {
        return;
      }

      if (message.type === "publisher-offer") {
        rtcMonitors.streamMap = Object.fromEntries((message.streams || []).map((item) => [item.mid, item.name]));
        if (pc.remoteDescription) {
          scheduleReconnect(100);
          return;
        }
        try {
          await pc.setRemoteDescription(message.offer);
        } catch {
          scheduleReconnect(100);
          return;
        }
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.send(JSON.stringify({ type: "viewer-answer", answer }));
        return;
      }

      if (message.type === "ice-candidate") {
        await pc.addIceCandidate(message.candidate).catch(() => {});
        return;
      }

      if (message.type === "publisher-offline") {
        scheduleReconnect();
      }
    });
    socket.addEventListener("close", () => {
      scheduleReconnect(2500);
    });
  };

  connect();
}

function renderMonitors() {
  startRtcMonitors();
  els.previewName.textContent = inputTitle(state.preview);
  els.programName.textContent = inputTitle(state.active);
  els.ptzPreviewName.textContent = inputTitle(state.preview);
  els.ptzProgramName.textContent = inputTitle(state.active);
  els.zocaloPreviewName.textContent = inputTitle(state.preview);
  els.zocaloProgramName.textContent = inputTitle(state.active);

  const allMonitorImages = [
    els.previewImage,
    els.programImage,
    els.ptzPreviewImage,
    els.ptzProgramImage,
    els.zocaloPreviewImage,
    els.zocaloProgramImage,
    els.publicidadesPreviewImage,
    els.publicidadesProgramImage
  ].filter(Boolean);

  const monitorPairs = {
    multiview: [els.previewImage, els.programImage],
    ptz: [els.ptzPreviewImage, els.ptzProgramImage],
    zocalos: [els.zocaloPreviewImage, els.zocaloProgramImage],
    publicidades: [els.publicidadesPreviewImage, els.publicidadesProgramImage]
  };
  const activePair = monitorPairs.multiview;
  if (rtcMonitors.started && window.PANEL_CONFIG?.monitorMode === "webrtc") {
    allMonitorImages.forEach((image) => {
      image.removeAttribute("src");
      delete image.dataset.monitorStream;
    });
    return;
  }

  Object.values(monitorPairs).forEach(([previewImage, programImage]) => {
    if (previewImage === activePair[0] && programImage === activePair[1]) {
      if (previewImage.dataset.monitorStream !== "preview") {
        previewImage.onerror = () => { delete previewImage.dataset.monitorStream; };
        previewImage.src = monitorUrl("/monitor/preview.mjpg");
        previewImage.dataset.monitorStream = "preview";
      }
      if (programImage.dataset.monitorStream !== "program") {
        programImage.onerror = () => { delete programImage.dataset.monitorStream; };
        programImage.src = monitorUrl("/monitor/program.mjpg");
        programImage.dataset.monitorStream = "program";
      }
      return;
    }

    previewImage.removeAttribute("src");
    programImage.removeAttribute("src");
    delete previewImage.dataset.monitorStream;
    delete programImage.dataset.monitorStream;
  });
}

function render(includeMonitors = false, includeZocalos = false) {
  renderPanelTabs();
  renderQuickActions();
  renderFormats();
  renderEditor();
  renderPtz();
  renderAudio();
  renderPublicidades();
  renderMasterMeter();
  if (includeZocalos) renderZocalos();
  if (includeMonitors) renderMonitors();
}

async function refreshState(includeMonitors = false) {
  if (state.refreshing) return;
  state.refreshing = true;
  try {
    parseState(await callVmix());
    const detectedProject = detectProjectFromPreset();
    const presetChanged = state.preset && state.preset !== state.detectedPreset;
    if (detectedProject && (!state.userSelectedProject || presetChanged) && detectedProject !== state.activeProject) {
      syncFocusedAulaZocaloRow();
      saveZocaloLibrary();
      state.activeProject = detectedProject;
      const config = currentProject();
      if (!state.selectedByProject[state.activeProject] && config.defaultLayout) state.selectedByProject[state.activeProject] = config.defaultLayout;
      if (!state.selectedPtzByProject[state.activeProject] && config.defaultPtz) state.selectedPtzByProject[state.activeProject] = config.defaultPtz;
      state.selectedZocaloType = currentZocaloTypes()[0]?.id || "";
      state.selectedZocaloId = "";
      state.selectedZocaloLineIds = { top: "", bottom: "" };
      state.activeZocaloLine = "top";
      state.zocaloSearches = {};
      state.zocaloDrafts = {};
      state.zocaloNewTexts = {};
      state.zocaloDirty = false;
      if (!hasPublicidades() && state.activePanel === "publicidades") state.activePanel = "multiview";
      loadZocaloLibrary();
      els.projectTabs.forEach((button) => button.classList.toggle("is-active", button.dataset.projectTab === state.activeProject));
      els.projectTitle.textContent = config.name;
      els.projectHelp.textContent = config.help;
      state.userSelectedProject = false;
    }
    state.detectedPreset = state.preset;
    setStatus(true, "vMix conectado");
    render(includeMonitors);
  }
  catch (error) { setStatus(false, "Sin conexion con vMix"); setLog(error.message); }
  finally { state.refreshing = false; }
}

async function setLayoutPreview(inputNumber) {
  assertPlayableInput(inputNumber, "Preview");
  setLog(`Enviando a Preview: ${inputTitle(inputNumber)}...`);
  await callVmix({ Function: "PreviewInput", Input: inputNumber });
  state.preview = String(inputNumber);
  renderFormats(); renderEditor(); renderMonitors();
  setLog(`Preview: ${inputTitle(inputNumber)}`);
  refreshState(false);
}

async function setLayoutAir(inputNumber) {
  assertPlayableInput(inputNumber, "Aire");
  setLog(`Enviando al aire: ${inputTitle(inputNumber)}...`);
  await callVmix({ Function: "CutDirect", Input: inputNumber });
  state.active = String(inputNumber);
  renderFormats(); renderEditor(); renderMonitors();
  setLog(`Al aire: ${inputTitle(inputNumber)}`);
  refreshState(false);
}

async function toggleAudioMute(inputNumber, isMuted) {
  const fn = isMuted ? "AudioOn" : "AudioOff";
  await callVmix({ Function: fn, Input: inputNumber });
  setLog(`${inputTitle(inputNumber)}: ${isMuted ? "audio activo" : "mute"}.`);
  refreshState(false);
}

async function setAudioVolume(inputNumber, value) {
  await callVmix({ Function: "SetVolume", Input: inputNumber, Value: value });
  const input = getInput(inputNumber);
  if (input) input.volume = String(value);
  setLog(`${inputTitle(inputNumber)}: volumen ${value}%.`);
}
async function updateCamera(layoutInput, layer, cameraInput) {
  assertPlayableInput(layoutInput, "Formato");
  assertPlayableInput(cameraInput, "Camara");
  await callVmix({ Function: "SetMultiViewOverlay", Input: layoutInput, Value: `${layer},${cameraInput}` });
  applyLocalAssignment(layoutInput, layer, cameraInput);
  if (state.preview !== String(layoutInput)) {
    await callVmix({ Function: "PreviewInput", Input: layoutInput });
    state.preview = String(layoutInput);
  }
  renderFormats(); renderEditor(); renderMonitors();
  setLog(`${inputTitle(layoutInput)}: posicion actualizada con ${inputTitle(cameraInput)} en Preview`);
  refreshState(false);
}

async function runPtzCommand(command, value = "") {
  const input = getInput(selectedPtzInput());
  if (!input) throw new Error("No encuentro la PTZ seleccionada en vMix.");
  const params = { Function: command, Input: input.number };
  if (value) params.Value = value;
  await callVmix(params);
  setLog(`${input.title}: ${command}`);
}

async function runQuickAction(index) {
  const action = [...GLOBAL_QUICK_ACTIONS, ...(QUICK_ACTIONS[state.activeProject] || [])][Number(index)];
  if (!action) return;
  if (action.kind === "premiere") {
    const isStop = action.command === "stop";
    setLog(`Enviando ${isStop ? "Stop" : "Play"} a Premiere...`);
    const result = await callPremiere(action.command);
    setLog(`Premiere: ${result.message || "comando enviado."}`);
    return;
  }
  if (["CutDirect", "PreviewInput"].includes(action.fn) && action.input && action.input !== "0") {
    assertPlayableInput(action.input, action.label);
  }
  if (action.restart && action.input) await callVmix({ Function: "Restart", Input: action.input });
  const params = { Function: action.fn };
  if (action.input) params.Input = action.input;
  if (action.value) params.Value = action.value;
  await callVmix(params);
  if (action.autoOverlayOut) startOverlayAutoOut(action);
  if (action.fn === "CutDirect") state.active = String(action.input);
  if (action.fn === "PreviewInput") state.preview = String(action.input);
  renderMonitors();
  const destination = action.kind === "overlay" ? "en overlay" : action.fn === "PreviewInput" ? "en previo" : "al aire";
  setLog(`${action.label}: ${destination}.`);
  refreshState(false);
}

function startOverlayAutoOut(action) {
  const input = String(action.input || "");
  const overlay = String(action.overlay || "1");
  if (!input) return;
  const key = `${overlay}:${input}`;
  if (state.overlayWatchers[key]) clearInterval(state.overlayWatchers[key]);
  let ticks = 0;
  state.overlayWatchers[key] = setInterval(async () => {
    ticks += 1;
    try {
      const xml = new DOMParser().parseFromString(await callVmix(), "text/xml");
      const item = xml.querySelector(`inputs > input[number="${input}"]`);
      const inputState = item?.getAttribute("state") || "";
      const position = Number(item?.getAttribute("position") || 0);
      const duration = Number(item?.getAttribute("duration") || 0);
      const isFinished = inputState === "Completed" || (duration > 0 && position >= duration - 250);
      if (isFinished) {
        clearInterval(state.overlayWatchers[key]);
        delete state.overlayWatchers[key];
        await callVmix({ Function: `OverlayInput${overlay}Out`, Input: input });
        setLog(`${action.label}: overlay fuera al terminar el video.`);
        refreshState(false);
      }
    } catch (error) {
      if (ticks > 6) {
        clearInterval(state.overlayWatchers[key]);
        delete state.overlayWatchers[key];
      }
    }
  }, 500);
}

function startInputResetOnComplete(action) {
  const input = String(action.input || "");
  if (!input) return;
  const key = `reset:${input}`;
  if (state.overlayWatchers[key]) clearInterval(state.overlayWatchers[key]);
  let ticks = 0;
  state.overlayWatchers[key] = setInterval(async () => {
    ticks += 1;
    try {
      const xml = new DOMParser().parseFromString(await callVmix(), "text/xml");
      const item = xml.querySelector(`inputs > input[number="${input}"]`);
      const inputState = item?.getAttribute("state") || "";
      const position = Number(item?.getAttribute("position") || 0);
      const duration = Number(item?.getAttribute("duration") || 0);
      const isFinished = inputState === "Completed" || (duration > 0 && position >= duration - 250);
      if (isFinished) {
        clearInterval(state.overlayWatchers[key]);
        delete state.overlayWatchers[key];
        await callVmix({ Function: "SetPosition", Input: input, Value: "0" });
        setLog(`${action.label}: listo para volver a disparar.`);
        refreshState(false);
      }
    } catch (error) {
      if (ticks > 8) {
        clearInterval(state.overlayWatchers[key]);
        delete state.overlayWatchers[key];
      }
    }
  }, 500);
}

async function runPublicidadAction(columnTitle, index) {
  const column = (PUBLICIDAD_ACTIONS[state.activeProject] || []).find((item) => item.title === columnTitle);
  const action = column?.actions[Number(index)];
  if (!action) return;
  const params = { Function: action.fn };
  if (action.input) params.Input = action.input;
  if (action.value) params.Value = action.value;
  await callVmix(params);
  if (action.resetOnComplete) startInputResetOnComplete(action);
  if (action.fn === "CutDirect") state.active = String(action.input);
  renderMonitors();
  setLog(`${action.label}: enviado desde Publicidades.`);
  refreshState(false);
}

async function handleZocaloAction(target) {
  const aulaToggle = target.closest("[data-aula-zocalo-toggle]");
  if (aulaToggle) {
    const key = zocaloKey(aulaToggle.dataset.aulaZocaloToggle, aulaToggle.dataset.aulaZocaloLine || "top");
    state.aulaZocaloPanels[key] = !state.aulaZocaloPanels[key];
    renderZocalos();
    return true;
  }
  const aulaAdd = target.closest("[data-aula-zocalo-add]");
  if (aulaAdd) {
    addAulaZocaloLine(aulaAdd.dataset.aulaZocaloAdd, aulaAdd.dataset.aulaZocaloLine || "top");
    return true;
  }
  const zocaloTab = target.closest("[data-zocalo-tab]");
  if (zocaloTab) {
    state.selectedZocaloType = zocaloTab.dataset.zocaloTab;
    renderZocalos();
    return true;
  }
  const loadZocaloLine = target.closest("[data-load-zocalo-line]");
  if (loadZocaloLine) {
    const rowValue = loadZocaloLine.closest(".zocalo-item-row")?.querySelector("[data-zocalo-inline-id]")?.value;
    loadZocaloLineItem(loadZocaloLine.dataset.zocaloType, loadZocaloLine.dataset.zocaloLine, loadZocaloLine.dataset.loadZocaloLine, rowValue);
    return true;
  }
  const saveInlineZocalo = target.closest("[data-save-inline-zocalo]");
  if (saveInlineZocalo) {
    const value = saveInlineZocalo.closest(".zocalo-item-row")?.querySelector("[data-zocalo-inline-id]")?.value || "";
    updateZocaloLine(saveInlineZocalo.dataset.zocaloType, saveInlineZocalo.dataset.zocaloLine, saveInlineZocalo.dataset.saveInlineZocalo, value);
    return true;
  }
  const saveZocalo = target.closest("[data-save-zocalo-line]");
  if (saveZocalo) {
    const type = currentZocaloTypes().find((item) => item.id === saveZocalo.dataset.zocaloType);
    if (type) saveZocaloLine(type.id, saveZocalo.dataset.saveZocaloLine, zocaloDraft(type)[saveZocalo.dataset.saveZocaloLine]);
    return true;
  }
  const addZocalo = target.closest("[data-add-zocalo-line]");
  if (addZocalo) {
    const key = zocaloKey(addZocalo.dataset.zocaloType, addZocalo.dataset.addZocaloLine);
    const newValue = addZocalo.parentElement.querySelector("[data-zocalo-new-type]")?.value || "";
    state.zocaloNewTexts[key] = "";
    addZocaloLine(addZocalo.dataset.zocaloType, addZocalo.dataset.addZocaloLine, newValue);
    return true;
  }
  const clearZocaloButton = target.closest("[data-clear-zocalo]");
  if (clearZocaloButton) {
    clearZocaloButton.disabled = true;
    try { await clearZocalo(clearZocaloButton.dataset.clearZocalo); }
    catch (error) { setLog(error.message); }
    finally { clearZocaloButton.disabled = false; }
    return true;
  }
  const offButton = target.closest("[data-off-zocalo]");
  if (offButton) {
    offButton.disabled = true;
    try { await offZocalo(offButton.dataset.offZocalo); }
    catch (error) { setLog(error.message); }
    finally { offButton.disabled = false; }
    return true;
  }
  const zocaloSend = target.closest("[data-send-zocalo]");
  if (zocaloSend) {
    zocaloSend.disabled = true;
    try { await sendZocalo(zocaloSend.dataset.sendZocalo); }
    catch (error) { setLog(error.message); }
    finally { zocaloSend.disabled = false; }
    return true;
  }
  return false;
}

function isZocaloActionTarget(target) {
  return !!target.closest("[data-aula-zocalo-toggle], [data-aula-zocalo-add], [data-zocalo-tab], [data-load-zocalo-line], [data-save-inline-zocalo], [data-save-zocalo-line], [data-add-zocalo-line], [data-clear-zocalo], [data-off-zocalo], [data-send-zocalo]");
}

document.addEventListener("click", async (event) => {
  if (state.skipNextZocaloClick && isZocaloActionTarget(event.target)) {
    state.skipNextZocaloClick = false;
    return;
  }
  const projectTab = event.target.closest("[data-project-tab]");
  if (projectTab) { state.userSelectedProject = true; setActiveProject(projectTab.dataset.projectTab); return; }
  const panelTab = event.target.closest("[data-panel-tab]");
  if (panelTab) { setActivePanel(panelTab.dataset.panelTab); return; }
  const quickAction = event.target.closest("[data-quick-action]");
  if (quickAction) {
    quickAction.disabled = true;
    try { await runQuickAction(quickAction.dataset.quickAction); }
    catch (error) { setLog(error.message); }
    finally { quickAction.disabled = false; }
    return;
  }
  const publicidadAction = event.target.closest("[data-publicidad-index]");
  if (publicidadAction) {
    publicidadAction.disabled = true;
    try { await runPublicidadAction(publicidadAction.dataset.publicidadColumn, publicidadAction.dataset.publicidadIndex); }
    catch (error) { setLog(error.message); }
    finally { publicidadAction.disabled = false; }
    return;
  }
  const audioMute = event.target.closest("[data-audio-mute]");
  if (audioMute) {
    audioMute.disabled = true;
    try { await toggleAudioMute(audioMute.dataset.audioMute, audioMute.dataset.audioMuted === "true"); }
    catch (error) { setLog(error.message); }
    finally { audioMute.disabled = false; }
    return;
  }
  if (await handleZocaloAction(event.target)) return;
  const selectPtz = event.target.closest("[data-select-ptz]");
  if (selectPtz) { state.selectedPtzByProject[state.activeProject] = selectPtz.dataset.selectPtz; renderPtz(); return; }
  const select = event.target.closest("[data-select-layout]");
  if (select) { state.selectedByProject[state.activeProject] = select.dataset.selectLayout; render(); return; }
  const preview = event.target.closest("[data-preview-layout]");
  if (preview) { preview.disabled = true; try { await setLayoutPreview(preview.dataset.previewLayout); } catch (error) { setLog(error.message); } finally { preview.disabled = false; } return; }
  const air = event.target.closest("[data-air-layout]");
  if (air) { air.disabled = true; try { await setLayoutAir(air.dataset.airLayout); } catch (error) { setLog(error.message); } finally { air.disabled = false; } }
  const editorAir = event.target.closest("[data-editor-air-layout]");
  if (editorAir) { editorAir.disabled = true; try { await setLayoutAir(editorAir.dataset.editorAirLayout); } catch (error) { setLog(error.message); } finally { editorAir.disabled = false; } return; }
  const ptzPreview = event.target.closest("[data-ptz-preview-input]");
  if (ptzPreview) { ptzPreview.disabled = true; try { await setLayoutPreview(ptzPreview.dataset.ptzPreviewInput); } catch (error) { setLog(error.message); } finally { ptzPreview.disabled = false; } return; }
  const ptzAir = event.target.closest("[data-ptz-air-input]");
  if (ptzAir) { ptzAir.disabled = true; try { await setLayoutAir(ptzAir.dataset.ptzAirInput); } catch (error) { setLog(error.message); } finally { ptzAir.disabled = false; } return; }
  const camera = event.target.closest("[data-assign-camera]");
  if (camera) {
    camera.disabled = true;
    try { await updateCamera(camera.dataset.layoutInput, camera.dataset.layoutLayer, camera.dataset.assignCamera); }
    catch (error) { setLog(error.message); }
    finally { camera.disabled = false; }
    return;
  }
  const ptzCommand = event.target.closest("[data-ptz-command]");
  if (ptzCommand) { ptzCommand.disabled = true; try { await runPtzCommand(ptzCommand.dataset.ptzCommand); } catch (error) { setLog(error.message); } finally { ptzCommand.disabled = false; } }
});

document.addEventListener("pointerdown", async (event) => {
  if (isZocaloActionTarget(event.target)) {
    event.preventDefault();
    state.skipNextZocaloClick = true;
    await handleZocaloAction(event.target);
    return;
  }
  const hold = event.target.closest("[data-ptz-hold]");
  if (!hold) return;
  state.activePtzHold = hold.dataset.ptzStop || "PTZMoveStop";
  hold.setPointerCapture?.(event.pointerId);
  try { await runPtzCommand(hold.dataset.ptzHold, "0.45"); } catch (error) { setLog(error.message); }
});

document.addEventListener("pointerup", async (event) => {
  if (!state.activePtzHold) return;
  const stop = state.activePtzHold; state.activePtzHold = "";
  try { await runPtzCommand(stop); } catch (error) { setLog(error.message); }
});

document.addEventListener("pointercancel", async (event) => {
  if (!state.activePtzHold) return;
  const stop = state.activePtzHold; state.activePtzHold = "";
  try { await runPtzCommand(stop); } catch (error) { setLog(error.message); }
});

document.addEventListener("keydown", (event) => {
  const aulaRow = event.target.closest("[data-aula-zocalo-row]");
  if (!aulaRow || !["ArrowDown", "ArrowUp"].includes(event.key)) return;
  const moved = moveAulaZocaloSelection(aulaRow, event.key === "ArrowDown" ? 1 : -1);
  if (moved) event.preventDefault();
});

document.addEventListener("input", (event) => {
  const audioVolume = event.target.closest("[data-audio-volume]");
  if (audioVolume) {
    const label = audioVolume.parentElement?.querySelector("span");
    if (label) label.textContent = `${audioVolume.value}%`;
    return;
  }
  const aulaRow = event.target.closest("[data-aula-zocalo-row]");
  if (aulaRow) {
    updateInlineZocaloText(aulaRow.dataset.aulaZocaloRow, aulaRow.dataset.aulaZocaloLine, aulaRow.dataset.aulaZocaloId, aulaRow.value);
    if (aulaRow.classList.contains("is-selected")) {
      markAulaZocaloSelection(aulaRow.dataset.aulaZocaloRow, aulaRow.dataset.aulaZocaloId, aulaRow.value);
    }
    return;
  }
  const search = event.target.closest("[data-zocalo-search-type]");
  if (search) {
    state.zocaloSearches[zocaloKey(search.dataset.zocaloSearchType, search.dataset.zocaloSearchLine)] = search.value;
    renderZocalos();
    return;
  }
  const edit = event.target.closest("[data-zocalo-edit-type]");
  if (edit) {
    const type = currentZocaloTypes().find((item) => item.id === edit.dataset.zocaloEditType);
    if (!type) return;
    zocaloDraft(type)[edit.dataset.zocaloEditLine] = edit.value;
    state.selectedZocaloId = "";
    setSelectedZocaloLineId(type.id, edit.dataset.zocaloEditLine, "");
    state.zocaloDirty = true;
    return;
  }
  const newText = event.target.closest("[data-zocalo-new-type]");
  if (newText) {
    state.zocaloNewTexts[zocaloKey(newText.dataset.zocaloNewType, newText.dataset.zocaloNewLine)] = newText.value;
    return;
  }
  const inline = event.target.closest("[data-zocalo-inline-type]");
  if (inline) {
    updateInlineZocaloText(inline.dataset.zocaloInlineType, inline.dataset.zocaloInlineLine, inline.dataset.zocaloInlineId, inline.value);
  }
});

document.addEventListener("change", async (event) => {
  const aulaSlot = event.target.closest("[data-aula-zocalo-slot]");
  if (aulaSlot) {
    setZocaloOverlaySlot(aulaSlot.dataset.aulaZocaloSlot, aulaSlot.value);
    renderZocalos();
    return;
  }
  const audioVolume = event.target.closest("[data-audio-volume]");
  if (!audioVolume) return;
  audioVolume.disabled = true;
  try { await setAudioVolume(audioVolume.dataset.audioVolume, audioVolume.value); }
  catch (error) { setLog(error.message); }
  finally {
    audioVolume.disabled = false;
    refreshState(false);
  }
});

document.addEventListener("focusin", (event) => {
  const aulaRow = event.target.closest("[data-aula-zocalo-row]");
  if (aulaRow) {
    selectInlineZocalo(aulaRow.dataset.aulaZocaloRow, aulaRow.dataset.aulaZocaloLine, aulaRow.dataset.aulaZocaloId, aulaRow.value);
    markAulaZocaloSelection(aulaRow.dataset.aulaZocaloRow, aulaRow.dataset.aulaZocaloId, aulaRow.value);
    return;
  }
  const inline = event.target.closest("[data-zocalo-inline-type]");
  if (!inline || inline.readOnly) return;
  selectInlineZocalo(inline.dataset.zocaloInlineType, inline.dataset.zocaloInlineLine, inline.dataset.zocaloInlineId, inline.value);
});

loadZocaloLibrary();
loadZocaloOverlaySlots();
refreshState(true);
refreshPremiereStatus();
setTimeout(refreshFlapClockWeather, 2000);
setInterval(() => refreshState(false), 3500);
setInterval(refreshPremiereStatus, 4000);
setInterval(refreshAudioMeter, 500);
setInterval(renderMonitors, 6000);
setInterval(refreshFlapClockWeather, 60000);





