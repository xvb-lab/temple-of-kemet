// ── COSTI FISSI PER BET E LINEE ──
let activeLines = 5;
const BET_COSTS_MAP = {
  50: [0,  10,  50, 100, 250, 500],
  25: [0,   5,  25,  50, 125, 250],
  10: [0,   3,  12,  25,  60, 125],
   5: [0,   1,   5,  12,  30,  70],
};
function getBetCost() { return (BET_COSTS_MAP[activeLines] || BET_COSTS_MAP[50])[currentBet] || 1; }
function setActiveLines(n) {
  activeLines = n;
  document.querySelectorAll(".lines-btn").forEach(b => {
    b.style.background = parseInt(b.dataset.lines) === n ? "#c4881a" : "none";
    b.style.color      = parseInt(b.dataset.lines) === n ? "#fff"    : "#fff";
  });
  updateLineNumbers();
  updateUI();
}
// ── LEADERBOARD API ──────────────────────────────────────
const LEADERBOARD_API = "https://temple-of-kemet.jonalinux-uk.workers.dev";

// Record mondiale — aggiornato al caricamento e dopo ogni game over
let worldRecord = { name: "—", score: 0 };
let _recordBeaten = false; // true se il giocatore ha già battuto il record in questa partita

async function fetchWorldRecord() {
  try {
    const res = await fetch(LEADERBOARD_API + "/leaderboard");
    const scores = await res.json();
    if (scores && scores.length > 0) {
      worldRecord = { name: scores[0].name, score: scores[0].score };
      updateTickerRecord();
    }
  } catch(e) {}
}

function updateTickerRecord() {
  const el = document.getElementById("ft-record");
  if (el) el.textContent = `Record: ${worldRecord.name} — ${worldRecord.score.toLocaleString()} Grano`;
}

function checkWorldRecord() {
  if (_recordBeaten) return;
  if (totalScore > worldRecord.score && worldRecord.score > 0) {
    _recordBeaten = true;
    logMessage(`Hai battuto il record mondiale di ${worldRecord.name}!`, "story-unlock");
    playSound("level");
    // Aggiungi stellina al nome
    const nd = document.getElementById("playerNameDisplay");
    if (nd && !nd.textContent.includes("★")) nd.textContent = "★ " + playerName;
  }
}
// ─────────────────────────────────────────────────────────











// ═══════════════════════════════════════════════════════════════════
// TEMPLE OF KEMET — SBLOCCO SIMBOLI PER LIVELLO (NARRATIVA)
//
//  Lv 1  (Schiavo)      → 13 simboli  — polvere, fame e sopravvivenza
//  Lv 2  (Contadino)    → 17 simboli  — il fiume e i suoi doni
//  Lv 3  (Artigiano)    → 21 simboli  — le mani che costruiscono
//  Lv 4  (Commerciante) → 24 simboli  — i templi si aprono
//  Lv 5  (Soldato)      → 27 simboli  — geroglifici e guerra
//  Lv 6  (Scriba)       → 30 simboli  — la sapienza del Nilo
//  Lv 7  (Sacerdote)    → 34 simboli  — i segreti del tempio
//  Lv 8  (Nobile)       → 38 simboli  — oro, sfinge e potere
//  Lv 9  (Visir)        → 41 simboli  — le divinità supreme
//  Lv10  (Faraone/Dio)  → 46 simboli  — jackpot e leggende
// ═══════════════════════════════════════════════════════════════════

const masterAllSymbols = [

  // ── FISSI ────────────────────────────────────────────────────────
  { file: "ouroboros.png",     name: "ouroboros",     weight: 6,  minLevel: 1 },
  { file: "pschent.png",       name: "pschent",       weight: 2,  minLevel: 1 },

  // ── GEMME (1 attiva per livello, ciclo 2 livelli) ────────────────
  { file: "copper.png",        name: "copper",        weight: 30, minLevel: 1  },
  { file: "onyx.png",          name: "onyx",          weight: 28, minLevel: 3  },
  { file: "ruby.png",          name: "ruby",          weight: 26, minLevel: 5  },
  { file: "sapphire.png",      name: "sapphire",      weight: 24, minLevel: 7  },
  { file: "amethyst.png",      name: "amethyst",      weight: 22, minLevel: 9  },
  { file: "emerald.png",       name: "emerald",       weight: 20, minLevel: 11 },
  { file: "topaz.png",         name: "topaz",         weight: 18, minLevel: 13 },
  { file: "diamond.png",       name: "diamond",       weight: 16, minLevel: 15 },
  { file: "gold.png",          name: "gold",          weight: 14, minLevel: 17 },
  { file: "meteorite.png",     name: "meteorite",     weight: 12, minLevel: 19 },

  // ── PERSONAGGI (ciclo 1 per livello, 23 totali) ──────────────────
  { file: "bes.png",           name: "bes",           weight: 15, minLevel: 1 },
  { file: "taweret.png",       name: "taweret",       weight: 15, minLevel: 1 },
  { file: "khnum.png",         name: "khnum",         weight: 14, minLevel: 1 },
  { file: "sobek.png",         name: "sobek",         weight: 14, minLevel: 1 },
  { file: "neith.png",         name: "neith",         weight: 13, minLevel: 1 },
  { file: "sekhmet.png",       name: "sekhmet",       weight: 13, minLevel: 1 },
  { file: "ptah.png",          name: "ptah",          weight: 12, minLevel: 1 },
  { file: "nut.png",           name: "nut",           weight: 12, minLevel: 1 },
  { file: "amon.png",          name: "amon",          weight: 11, minLevel: 1 },
  { file: "khonsu.png",        name: "khonsu",        weight: 11, minLevel: 1 },
  { file: "cleopatra.png",     name: "cleopatra",     weight: 10, minLevel: 1 },
  { file: "ra.png",            name: "ra",            weight: 10, minLevel: 1 },
  { file: "osiris.png",        name: "osiris",        weight: 9,  minLevel: 1 },
  { file: "isis.png",          name: "isis",          weight: 9,  minLevel: 1 },
  { file: "horus.png",         name: "horus",         weight: 8,  minLevel: 1 },
  { file: "anubis.png",        name: "anubis",        weight: 8,  minLevel: 1 },
  { file: "thoth.png",         name: "thoth",         weight: 7,  minLevel: 1 },
  { file: "hathor.png",        name: "hathor",        weight: 7,  minLevel: 1 },
  { file: "seth.png",          name: "seth",          weight: 6,  minLevel: 1 },
  { file: "bastet.png",        name: "bastet",        weight: 6,  minLevel: 1 },
  { file: "udjat.png",         name: "udjat",         weight: 5,  minLevel: 1 },
  { file: "pharaoh.png",       name: "pharaoh",       weight: 5,  minLevel: 1 },
  { file: "nefertiti.png",     name: "nefertiti",     weight: 4,  minLevel: 1 },

  // ── PENALITÀ (ciclo 4 tipi ogni 4 livelli) ───────────────────────
  { file: "skull.png",         name: "skull",         weight: 4,  minLevel: 1 },
  { file: "curse.png",         name: "curse",         weight: 4,  minLevel: 1 },
  { file: "spirit.png",        name: "spirit",        weight: 4,  minLevel: 1 },
  { file: "mummy.png",         name: "mummy",         weight: 4,  minLevel: 1 },

  // ── MINIGIOCHI (per range livello) ───────────────────────────────
  { file: "market.png",        name: "market",        weight: 10, minLevel: 1 },
  { file: "scale.png",         name: "scale",         weight: 8,  minLevel: 1 },
  { file: "sphinx.png",        name: "sphinx",        weight: 6,  minLevel: 1 },
  { file: "papyrus.png",       name: "papyrus",       weight: 4,  minLevel: 1 },

  // ── MOLTIPLICATORI (ciclo ogni 6 livelli) ────────────────────────
  { file: "scarab.png",        name: "scarab",        weight: 8,  minLevel: 1 },
  { file: "coin.png",          name: "coin",          weight: 6,  minLevel: 1 },

  // ── NORMALI per classe sociale ───────────────────────────────────
  // Schiavo (Lv1-2)
  { file: "wheat.png",         name: "wheat",         weight: 80, minLevel: 1 },
  { file: "bread.png",         name: "bread",         weight: 78, minLevel: 1 },
  { file: "onion.png",         name: "onion",         weight: 76, minLevel: 1 },
  { file: "oil-lamp.png",      name: "oillamp",       weight: 74, minLevel: 1 },
  { file: "bowl-wood.png",     name: "bowl_wood",     weight: 72, minLevel: 1 },
  { file: "cloth-rough.png",   name: "cloth_rough",   weight: 70, minLevel: 1 },
  // Servo del Tempio (Lv3-4)
  { file: "reed.png",          name: "reed",          weight: 68, minLevel: 1 },
  { file: "fish.png",          name: "fish",          weight: 66, minLevel: 1 },
  { file: "dates.png",         name: "dates",         weight: 64, minLevel: 1 },
  { file: "basket.png",        name: "basket",        weight: 62, minLevel: 1 },
  { file: "sandal_papyrus.png",name: "sandal_papyrus",weight: 60, minLevel: 1 },
  { file: "drink-water.png",   name: "drink_water",   weight: 58, minLevel: 1 },
  // Bracciante (Lv5-6)
  { file: "sickle.png",        name: "sickle",        weight: 58, minLevel: 1 },
  { file: "rope.png",          name: "rope",          weight: 56, minLevel: 1 },
  { file: "fig.png",           name: "fig",           weight: 54, minLevel: 1 },
  { file: "goose.png",         name: "goose",         weight: 52, minLevel: 1 },
  { file: "sandal_leather.png",name: "sandal_leather",weight: 50, minLevel: 1 },
  { file: "bowl-ceramic.png",  name: "bowl_ceramic",  weight: 48, minLevel: 1 },
  // Pescatore (Lv7-8)
  { file: "boat.png",          name: "boat",          weight: 48, minLevel: 1 },
  { file: "dromedary.png",     name: "dromedary",     weight: 46, minLevel: 1 },
  // Contadino (Lv9-10)
  { file: "cat.png",           name: "cat",           weight: 46, minLevel: 1 },
  { file: "drink-beer.png",    name: "drink_beer",    weight: 44, minLevel: 1 },
  // Pastore (Lv11-12)
  { file: "cloth_linen.png",   name: "cloth_linen",   weight: 42, minLevel: 1 },
  // Artigiano (Lv13-14)
  { file: "chisel.png",        name: "chisel",        weight: 40, minLevel: 1 },
  { file: "brick.png",         name: "brick",         weight: 38, minLevel: 1 },
  { file: "amulet.png",        name: "amulet",        weight: 36, minLevel: 1 },
  // Vasaio (Lv15-16)
  { file: "canopic-jar.png",   name: "canopic_jar",   weight: 34, minLevel: 1 },
  // Carpentiere (Lv17-18)
  { file: "fan.png",           name: "fan",           weight: 32, minLevel: 1 },
  { file: "sandal_fine.png",   name: "sandal_fine",   weight: 30, minLevel: 1 },
  // Commerciante (Lv19-20)
  { file: "grape.png",         name: "grape",         weight: 28, minLevel: 1 },
  { file: "pistachio.png",     name: "pistachio",     weight: 26, minLevel: 1 },
  { file: "necklace.png",      name: "necklace",      weight: 24, minLevel: 1 },
  { file: "drink-wine.png",    name: "drink_wine",    weight: 22, minLevel: 1 },
  { file: "cloth_fine.png",    name: "cloth_fine",    weight: 20, minLevel: 1 },
  // Soldato (Lv21-22)
  { file: "dagger.png",        name: "dagger",        weight: 20, minLevel: 1 },
  { file: "scorpion.png",      name: "scorpion",      weight: 18, minLevel: 1 },
  { file: "cobra.png",         name: "cobra",         weight: 16, minLevel: 1 },
  { file: "ankh.png",          name: "ankh",          weight: 14, minLevel: 1 },
  { file: "beetle.png",        name: "beetle",        weight: 12, minLevel: 1 },
  // Scriba Minore (Lv23-24)
  { file: "park.png",          name: "ibis",          weight: 12, minLevel: 1 },
  // Scriba Reale (Lv25-26)
  { file: "sarcophagus.png",   name: "sarcophagus",   weight: 10, minLevel: 1 },
  { file: "bird.png",          name: "bird",          weight: 10, minLevel: 1 },
  { file: "tool-scribe.png",   name: "tool_scribe",   weight: 8,  minLevel: 1 },
  // Sacerdote (Lv29-30)
  { file: "djed.png",          name: "djed",          weight: 8,  minLevel: 1 },
  { file: "bowl-alabaster.png",name: "bowl_alabaster",weight: 6,  minLevel: 1 },
  { file: "cloth-royal.png",   name: "cloth_royal",   weight: 6,  minLevel: 1 },
  // Gran Sacerdote (Lv31-32)
  { file: "bread-ritual.png",  name: "bread_ritual",  weight: 6,  minLevel: 1 },
  { file: "sandal_gold.png",   name: "sandal_gold",   weight: 4,  minLevel: 1 },
  // Nobile (Lv33-34)
  { file: "pyramid.png",       name: "pyramid",       weight: 4,  minLevel: 1 },
  { file: "scepter.png",       name: "scepter",       weight: 4,  minLevel: 1 },
  { file: "drink-nectar.png",  name: "drink_nectar",  weight: 4,  minLevel: 1 },
  // Visir (Lv35-36)
  { file: "obelisk.png",       name: "obelisk",       weight: 4,  minLevel: 1 },
  { file: "bowl-gold.png",     name: "bowl_gold",     weight: 4,  minLevel: 1 },
  // Dio (Lv41-42)
  { file: "jewelry-gold.png",  name: "jewelry_gold",  weight: 4,  minLevel: 1 },

];

// Pietre preziose guadagnate per combo di gemme (base ×3, scala con count)
const GEM_POINTS_TABLE = {
  copper:4, onyx:8, ruby:14, sapphire:20, amethyst:28,
  emerald:38, topaz:50, diamond:65, gold:85, meteorite:110
};

const payoutTable = {
  // ── Fissi ──
  ouroboros:     { 3:  0, 4:  0, 5:   0, 6:    0 }, // Wild, no payout diretto
  pschent:       { 3:2000,4:5000,5:12000,6:50000 }, // Jackpot

  // ── Gemme (danno Pietre Preziose, no deben) ──
  copper:        { 3:  0, 4:  0, 5:   0, 6:    0 },
  onyx:          { 3:  0, 4:  0, 5:   0, 6:    0 },
  ruby:          { 3:  0, 4:  0, 5:   0, 6:    0 },
  sapphire:      { 3:  0, 4:  0, 5:   0, 6:    0 },
  amethyst:      { 3:  0, 4:  0, 5:   0, 6:    0 },
  emerald:       { 3:  0, 4:  0, 5:   0, 6:    0 },
  topaz:         { 3:  0, 4:  0, 5:   0, 6:    0 },
  diamond:       { 3:  0, 4:  0, 5:   0, 6:    0 },
  gold:          { 3:  0, 4:  0, 5:   0, 6:    0 },
  meteorite:     { 3:  0, 4:  0, 5:   0, 6:    0 },

  // ── Personaggi (payout crescente per rarità nel ciclo) ──
  bes:           { 3: 30, 4: 55, 5:  90, 6:  150 },
  taweret:       { 3: 35, 4: 65, 5: 105, 6:  175 },
  khnum:         { 3: 40, 4: 75, 5: 120, 6:  200 },
  sobek:         { 3: 50, 4: 90, 5: 145, 6:  240 },
  neith:         { 3: 60, 4:110, 5: 175, 6:  290 },
  sekhmet:       { 3: 75, 4:140, 5: 220, 6:  365 },
  ptah:          { 3: 90, 4:170, 5: 270, 6:  450 },
  nut:           { 3:110, 4:205, 5: 325, 6:  540 },
  amon:          { 3:135, 4:255, 5: 405, 6:  675 },
  khonsu:        { 3:160, 4:300, 5: 480, 6:  800 },
  cleopatra:     { 3:200, 4:375, 5: 600, 6: 1000 },
  ra:            { 3:120, 4:240, 5: 360, 6:  720 },
  osiris:        { 3:150, 4:300, 5: 450, 6:  900 },
  isis:          { 3:170, 4:340, 5: 510, 6: 1020 },
  horus:         { 3:180, 4:360, 5: 540, 6: 1080 },
  anubis:        { 3:220, 4:440, 5: 660, 6: 1320 },
  thoth:         { 3:190, 4:380, 5: 570, 6: 1140 },
  hathor:        { 3:210, 4:420, 5: 630, 6: 1260 },
  seth:          { 3:200, 4:400, 5: 600, 6: 1200 },
  bastet:        { 3:240, 4:480, 5: 720, 6: 1440 },
  udjat:         { 3:250, 4:500, 5: 750, 6: 1500 },
  pharaoh:       { 3:260, 4:520, 5: 780, 6: 1560 },
  nefertiti:     { 3:280, 4:560, 5: 840, 6: 1680 },

  // ── Penalità (payout 0, effetto negativo) ──
  skull:         { 3:  0, 4:  0, 5:   0, 6:    0 },
  curse:         { 3:  0, 4:  0, 5:   0, 6:    0 },
  spirit:        { 3:  0, 4:  0, 5:   0, 6:    0 },
  mummy:         { 3:  0, 4:  0, 5:   0, 6:    0 },

  // ── Minigiochi (payout 0, triggerano gioco) ──
  market:        { 3:  0, 4:  0, 5:   0, 6:    0 },
  scale:         { 3:  0, 4:  0, 5:   0, 6:    0 },
  sphinx:        { 3:  0, 4:  0, 5:   0, 6:    0 },
  papyrus:       { 3:  0, 4:  0, 5:   0, 6:    0 },

  // ── Moltiplicatori ──
  scarab:        { 3:  0, 4:  0, 5:   0, 6:    0 }, // ×2 sulle linee
  coin:          { 3:  0, 4:  0, 5:   0, 6:    0 }, // ×10 sulle linee

  // ── Normali — Schiavo (Lv1-2) ──
  wheat:         { 3: 15, 4: 25, 5:  40, 6:   60 },
  bread:         { 3: 18, 4: 30, 5:  45, 6:   70 },
  onion:         { 3: 15, 4: 25, 5:  38, 6:   58 },
  oillamp:       { 3: 18, 4: 30, 5:  46, 6:   68 },
  bowl_wood:     { 3: 16, 4: 26, 5:  40, 6:   60 },
  cloth_rough:   { 3: 16, 4: 26, 5:  40, 6:   60 },

  // ── Normali — Servo del Tempio (Lv3-4) ──
  reed:          { 3: 20, 4: 33, 5:  50, 6:   75 },
  fish:          { 3: 22, 4: 36, 5:  54, 6:   80 },
  dates:         { 3: 25, 4: 40, 5:  60, 6:   90 },
  basket:        { 3: 22, 4: 36, 5:  54, 6:   80 },
  sandal_papyrus:{ 3: 20, 4: 33, 5:  50, 6:   75 },
  drink_water:   { 3: 18, 4: 30, 5:  45, 6:   68 },

  // ── Normali — Bracciante (Lv5-6) ──
  sickle:        { 3: 28, 4: 45, 5:  68, 6:  100 },
  rope:          { 3: 25, 4: 40, 5:  62, 6:   92 },
  fig:           { 3: 28, 4: 46, 5:  70, 6:  104 },
  goose:         { 3: 32, 4: 52, 5:  78, 6:  116 },
  sandal_leather:{ 3: 30, 4: 48, 5:  72, 6:  108 },
  bowl_ceramic:  { 3: 30, 4: 48, 5:  72, 6:  108 },

  // ── Normali — Pescatore (Lv7-8) ──
  boat:          { 3: 35, 4: 58, 5:  88, 6:  130 },
  dromedary:     { 3: 38, 4: 62, 5:  94, 6:  140 },

  // ── Normali — Contadino (Lv9-10) ──
  cat:           { 3: 42, 4: 70, 5: 105, 6:  156 },
  drink_beer:    { 3: 40, 4: 66, 5:  98, 6:  146 },

  // ── Normali — Pastore (Lv11-12) ──
  cloth_linen:   { 3: 48, 4: 78, 5: 118, 6:  176 },

  // ── Normali — Artigiano (Lv13-14) ──
  chisel:        { 3: 55, 4: 90, 5: 136, 6:  202 },
  brick:         { 3: 52, 4: 85, 5: 128, 6:  190 },
  amulet:        { 3: 58, 4: 95, 5: 144, 6:  214 },

  // ── Normali — Vasaio (Lv15-16) ──
  canopic_jar:   { 3: 65, 4:106, 5: 160, 6:  238 },

  // ── Normali — Carpentiere (Lv17-18) ──
  fan:           { 3: 72, 4:118, 5: 178, 6:  264 },
  sandal_fine:   { 3: 70, 4:115, 5: 174, 6:  258 },

  // ── Normali — Commerciante (Lv19-20) ──
  grape:         { 3: 80, 4:130, 5: 196, 6:  292 },
  pistachio:     { 3: 82, 4:134, 5: 202, 6:  300 },
  necklace:      { 3: 88, 4:144, 5: 218, 6:  324 },
  drink_wine:    { 3: 85, 4:138, 5: 208, 6:  310 },
  cloth_fine:    { 3: 84, 4:136, 5: 206, 6:  306 },

  // ── Normali — Soldato (Lv21-22) ──
  dagger:        { 3: 95, 4:155, 5: 235, 6:  348 },
  scorpion:      { 3: 98, 4:160, 5: 242, 6:  360 },
  cobra:         { 3:105, 4:172, 5: 260, 6:  386 },
  ankh:          { 3:110, 4:180, 5: 272, 6:  404 },
  beetle:        { 3: 92, 4:150, 5: 226, 6:  336 },

  // ── Normali — Scriba Minore (Lv23-24) ──
  ibis:          { 3:120, 4:196, 5: 296, 6:  440 },

  // ── Normali — Scriba Reale (Lv25-26) ──
  sarcophagus:   { 3:135, 4:220, 5: 332, 6:  494 },
  bird:          { 3:130, 4:212, 5: 320, 6:  476 },
  tool_scribe:   { 3:128, 4:208, 5: 314, 6:  466 },

  // ── Normali — Sacerdote (Lv29-30) ──
  djed:          { 3:155, 4:252, 5: 382, 6:  568 },
  bowl_alabaster:{ 3:150, 4:244, 5: 368, 6:  548 },
  cloth_royal:   { 3:152, 4:248, 5: 374, 6:  556 },

  // ── Normali — Gran Sacerdote (Lv31-32) ──
  bread_ritual:  { 3:175, 4:285, 5: 430, 6:  640 },
  sandal_gold:   { 3:180, 4:292, 5: 442, 6:  656 },

  // ── Normali — Nobile (Lv33-34) ──
  pyramid:       { 3:200, 4:325, 5: 492, 6:  730 },
  scepter:       { 3:195, 4:318, 5: 480, 6:  714 },
  drink_nectar:  { 3:190, 4:310, 5: 468, 6:  696 },

  // ── Normali — Visir (Lv35-36) ──
  obelisk:       { 3:220, 4:358, 5: 542, 6:  804 },
  bowl_gold:     { 3:225, 4:366, 5: 554, 6:  822 },

  // ── Normali — Dio (Lv41-42) ──
  jewelry_gold:  { 3:280, 4:456, 5: 690, 6: 1024 },
};




// ═══════════════════════════════════════════════════════════════
// SISTEMA SBLOCCO STORIE
// Ogni simbolo ha una soglia punti per sbloccare ogni storia.
// I punti si accumulano dalle vincite con quel simbolo (payout + bonus combo).
// I progressi non si resettano al cambio livello.
// ═══════════════════════════════════════════════════════════════

// Soglia base per sbloccare UNA storia — varia per classe sociale del simbolo
const STORY_THRESHOLDS = {
  // Schiavo (simboli umilissimi, soglia bassa)
  wheat:200, bread:200, onion:200, oillamp:210, bowl_wood:205, cloth_rough:205,
  // Servo del Tempio
  reed:240, fish:250, dates:260, basket:245, sandal_papyrus:235, drink_water:225,
  // Bracciante
  sickle:280, rope:270, fig:285, goose:300, sandal_leather:290, bowl_ceramic:290,
  // Pescatore
  boat:320, dromedary:335,
  // Contadino
  cat:360, drink_beer:350,
  // Pastore
  cloth_linen:390,
  // Artigiano
  chisel:420, brick:410, amulet:430,
  // Vasaio
  canopic_jar:460,
  // Carpentiere
  fan:490, sandal_fine:480,
  // Commerciante
  grape:520, pistachio:530, necklace:550, drink_wine:535, cloth_fine:525,
  // Soldato
  dagger:560, scorpion:570, cobra:590, ankh:600, beetle:555,
  // Scriba Minore
  ibis:630,
  // Scriba Reale
  sarcophagus:660, bird:650, tool_scribe:645,
  // Sacerdote
  djed:700, bowl_alabaster:690, cloth_royal:695,
  // Gran Sacerdote
  bread_ritual:730, sandal_gold:740,
  // Nobile
  pyramid:770, scepter:760, drink_nectar:755,
  // Visir
  obelisk:800, bowl_gold:810,
  // Dio
  jewelry_gold:900,
  // Personaggi (soglia crescente per rarità)
  bes:300, taweret:320, khnum:340, sobek:360, neith:380,
  sekhmet:400, ptah:420, nut:440, amon:460, khonsu:480,
  cleopatra:500, ra:470, osiris:510, isis:530, horus:550,
  anubis:580, thoth:560, hathor:570, seth:565, bastet:600,
  udjat:650, pharaoh:680, nefertiti:720,
  // Gemme (soglia media — non hanno payout diretto)
  copper:250, onyx:300, ruby:370, sapphire:440, amethyst:500,
  emerald:560, topaz:620, diamond:700, gold:780, meteorite:900,
  // Speciali — soglia basata su attivazioni/presenza (non payout)
  // Wild e Jackpot: appaiono spesso, soglia media
  ouroboros:350, pschent:800,
  // Penalità: si attivano per combo, soglia bassa (punti contati da effectPoints)
  skull:300, curse:300, spirit:320, mummy:380,
  // Minigiochi: attivano premi, soglia media
  market:280, scale:400, sphinx:500, papyrus:420,
  // Moltiplicatori: appaiono sulla linea, soglia bassa
  scarab:250, coin:350,
  // jar e hieroglyphs (usati nel JSON come "bowl" e "hieroglyphs")
  jar:300, hieroglyphs:400,
};

// Stato persistente: punti accumulati e storie sbloccate per simbolo
const symbolStoryPoints   = {}; // { symbolName: puntiAccumulati }
const symbolStoriesUnlocked = {}; // { symbolName: numeroStoriesSbloccate }

function getStoryThreshold(symbolName) {
  return STORY_THRESHOLDS[symbolName] || 500;
}

function getStoryProgress(symbolName) {
  const unlocked = symbolStoriesUnlocked[symbolName] || 0;
  const points   = symbolStoryPoints[symbolName] || 0;
  const threshold = getStoryThreshold(symbolName);
  // Punti nella finestra corrente (dopo l'ultimo sblocco)
  const pointsInWindow = points % threshold;
  return { unlocked, points, threshold, pointsInWindow, pct: Math.min(100, Math.floor(pointsInWindow / threshold * 100)) };
}

// Frasi disponibili per un simbolo dal JSON
function getHintsForSymbol(symbolName) {
  return (mysteriousHints || []).filter(h => h.symbol === symbolName);
}

// Aggiunge punti a un simbolo e controlla se sblocca una nuova storia
function addSymbolStoryPoints(symbolName, pts) {
  if (!pts || pts <= 0) return null;
  const frasi = getHintsForSymbol(symbolName);
  if (!frasi.length) return null;
  const threshold = getStoryThreshold(symbolName);
  if (threshold >= 9999) return null;

  const prevPoints  = symbolStoryPoints[symbolName] || 0;
  const prevUnlocked = symbolStoriesUnlocked[symbolName] || 0;

  symbolStoryPoints[symbolName] = prevPoints + pts;
  const newUnlocked = Math.min(Math.floor(symbolStoryPoints[symbolName] / threshold), frasi.length);
  symbolStoriesUnlocked[symbolName] = newUnlocked;

  // Ritorna la storia appena sbloccata (se c'è)
  if (newUnlocked > prevUnlocked) {
    return frasi[newUnlocked - 1] || null;
  }
  return null;
}

// Calcola punti story da una vincita: payout + bonus combo
function calcStoryPoints(payout, matchCount) {
  const bonus = matchCount >= 6 ? 40 : matchCount >= 5 ? 25 : matchCount >= 4 ? 12 : 0;
  return payout + bonus;
}

const allAvailablePaylines = [
  // --- GRUPPO 1: LINEE ORIZZONTALI BASE (4 payline) ---
  // Queste sono le linee più semplici e dirette, fondamentali per ogni slot.
  [0, 0, 0, 0, 0, 0], // Linea superiore
  [1, 1, 1, 1, 1, 1], // Linea seconda dall'alto
  [2, 2, 2, 2, 2, 2], // Linea terza dall'alto
  [3, 3, 3, 3, 3, 3], // Linea inferiore

  // --- GRUPPO 2: LINEE DIAGONALI SEMPLICI (4 payline) ---
  // Percorsi lineari in diagonale.
  [0, 1, 2, 3, 3, 3], // Diagonale discendente da sinistra a destra (parte alta)
  [3, 2, 1, 0, 0, 0], // Diagonale ascendente da sinistra a destra (parte bassa)
  [0, 0, 1, 2, 3, 3], // Diagonale ascendente da sinistra a destra (inizia bassa)
  [3, 3, 2, 1, 0, 0], // Diagonale discendente da sinistra a destra (inizia alta)

  // --- GRUPPO 3: LINEE A V E A INVERTITE (4 payline) ---
  // Percorsi a forma di "V" o "A" che scendono e risalgono.
  [0, 1, 2, 1, 0, 1], // V dalla cima
  [3, 2, 1, 2, 3, 2], // V rovesciata dal basso
  [1, 2, 3, 2, 1, 0], // V "serpente" discendente
  [2, 1, 0, 1, 2, 3], // V "serpente" ascendente

  // --- GRUPPO 4: ZIGZAG STRETTI (4 payline) ---
  // Alternano tra due righe adiacenti, creando un pattern "serrato".
  [0, 1, 0, 1, 0, 1], // Zigzag alto/medio-alto
  [1, 2, 1, 2, 1, 2], // Zigzag medio-alto/medio-basso
  [2, 1, 2, 1, 2, 1], // Zigzag medio-basso/medio-alto (inverso)
  [3, 2, 3, 2, 3, 2], // Zigzag basso/medio-basso (inverso)

  // --- GRUPPO 5: ZIGZAG LARGHI / ONDE (4 payline) ---
  // Alternano tra righe più distanti, creando "onde" o percorsi ampi.
  [0, 2, 0, 2, 0, 2], // Zigzag ampio, alternando riga 0 e 2
  [3, 1, 3, 1, 3, 1], // Zigzag ampio, alternando riga 3 e 1
  [0, 3, 0, 3, 0, 3], // Zigzag molto ampio (alternando riga 0 e 3)
  [3, 0, 3, 0, 3, 0], // Zigzag molto ampio (alternando riga 3 e 0)

  // --- GRUPPO 6: CURVE E ONDE MORBIDE (4 payline) ---
  // Linee che cambiano riga gradualmente.
  [0, 1, 1, 2, 2, 3], // Curva graduale verso il basso
  [3, 2, 2, 1, 1, 0], // Curva graduale verso l'alto
  [1, 1, 2, 3, 3, 2], // Curva che sale e poi scende leggermente
  [2, 2, 1, 0, 0, 1], // Curva che scende e poi risale leggermente

  // --- GRUPPO 7: SCALE E GRADINI (4 payline) ---
  // Movimenti orizzontali e poi un cambio di riga.
  [0, 0, 1, 1, 2, 2], // Scala che sale gradualmente
  [3, 3, 2, 2, 1, 1], // Scala che scende gradualmente
  [0, 1, 1, 1, 2, 2], // Piccoli gradini
  [3, 2, 2, 2, 1, 1], // Piccoli gradini inversi

  // --- GRUPPO 8: LINEE SPEZZATE CENTRALI (4 payline) ---
  // Focus su movimenti nella parte centrale della griglia.
  [1, 2, 1, 0, 1, 2], // Spezzata centrale discendente
  [2, 1, 2, 3, 2, 1], // Spezzata centrale ascendente
  [1, 0, 1, 2, 1, 0], // Curva interna superiore
  [2, 3, 2, 1, 2, 3], // Curva interna inferiore

  // --- GRUPPO 9: PERCORSI ESTREMI (4 payline) ---
  // Linee che toccano i bordi esterni della griglia.
  [0, 1, 2, 3, 0, 1], // Esterno alto-basso-alto
  [3, 2, 1, 0, 3, 2], // Esterno basso-alto-basso
  [0, 0, 2, 2, 0, 0], // Doppio zigzag sulle estremità
  [3, 3, 1, 1, 3, 3], // Doppio zigzag sulle estremità (inverso)

  // --- GRUPPO 10: LINEE INCROCIATE / VERTICALI MODIFICATE (4 payline) ---
  // Linee con elementi di incrocio o movimenti verticali non lineari.
  [0, 1, 3, 2, 0, 1], // Incrocio dall'alto
  [3, 2, 0, 1, 3, 2], // Incrocio dal basso
  [1, 0, 2, 3, 1, 0], // Movimento verticale irregolare
  [2, 3, 1, 0, 2, 3], // Movimento verticale irregolare (inverso)

  // --- GRUPPO 11: W-SHAPES & Complex Diagonals (10 new paylines) ---
  // These add more intricate multi-peak and trough patterns, or diagonal shifts.
  [0, 1, 0, 1, 2, 1], // W-shape (high start)
  [3, 2, 3, 2, 1, 2], // M-shape (low start)
  [0, 2, 1, 3, 2, 0], // Extended wide zigzag
  [3, 1, 2, 0, 1, 3], // Extended wide zigzag (inverse)
  [1, 0, 2, 1, 3, 2], // Central zigzag with outward shifts
  [2, 3, 1, 2, 0, 1], // Central zigzag with inward shifts
  [0, 1, 3, 1, 0, 2], // Drop-rise-drop
  [3, 2, 0, 2, 3, 1], // Rise-drop-rise
  [1, 3, 0, 2, 1, 3], // Jumping diagonal
  [2, 0, 3, 1, 2, 0] // Jumping diagonal (inverse)

];

// ═══════════════════════════════════════════════════════════════
// SUGGERIMENTI NARRATIVI — filtrati per livello
// Ogni simbolo ha più frasi: la prima appare ai livelli bassi,
// le altre si sbloccano man mano che il giocatore sale.
// Fonti: Libro dei Morti, Testi delle Piramidi, Testi dei Sarcofagi,
//        Papiro di Ani, papiri di Leiden, iscrizioni di Karnak e Abydos.
// ═══════════════════════════════════════════════════════════════
let mysteriousHints = [];

// Stato sequenza frasi — 1 frase per simbolo, ruota sui simboli attivi
// Struttura: _hintSymIdx = quale simbolo attivo stiamo mostrando
//            _hintFraseIdx[sym] = quale frase di quel simbolo mostrare dopo
// Mappa colori neon linee vincenti — aggiornata da drawPaylinesSVG
const winningLineColors = new Map();

const NO_HINTS_SYMS = new Set(['ouroboros','pschent','scarab','coin','skull','curse',
                                'spirit','mummy','market','scale','sphinx','papyrus','jar']);
let _hintSymIdx = 0;          // indice sul simbolo corrente
let _hintFraseIdx = {};       // per ogni simbolo, la prossima frase da mostrare

function _getActiveHintSyms() {
  return getSymbolsForCurrentLevel()
    .map(s => s.name)
    .filter(n => mysteriousHints.some(h => h.symbol === n));
}

function _getNextHint() {
  const syms = _getActiveHintSyms();
  if (!syms.length) return null;

  // Avanza il simbolo corrente ciclicamente
  if (_hintSymIdx >= syms.length) _hintSymIdx = 0;
  const sym = syms[_hintSymIdx];
  _hintSymIdx++;

  // Prende le frasi di questo simbolo
  const frasi = mysteriousHints.filter(h => h.symbol === sym);
  if (!frasi.length) return _getNextHint(); // salta se nessuna frase

  // Prende la prossima frase del simbolo (ciclica)
  if (!_hintFraseIdx[sym]) _hintFraseIdx[sym] = 0;
  const hint = frasi[_hintFraseIdx[sym] % frasi.length];
  _hintFraseIdx[sym]++;

  return hint;
}

function _buildHintQueue() { /* non più usata, mantenuta per compatibilità */ }
function _appendNewSymbolHints() { /* non più usata, mantenuta per compatibilità */ }
async function loadHints(lang = "it") {
  try {
    const res = await fetch(`lang/${lang}.json`);
    const data = await res.json();
    mysteriousHints = data.hints || [];
    window._gameoverQuotes = data.gameover || [];
    window._socialClasses = data.socialClasses || [];
    window._ui = data.ui || {};
    window._welcomeMessages = data.welcomeMessages || [];
    window._noWinMessages = data.noWinMessages || [];
  } catch(e) {
    console.warn("Hints non caricati:", e);
    mysteriousHints = [];
    window._gameoverQuotes = [];
    window._socialClasses = [];
    window._ui = {};
    window._welcomeMessages = [];
    window._noWinMessages = [];
  }
}




document.addEventListener('DOMContentLoaded', function() {
  // Carica il JSON delle storie
  loadHints("it");
});



// Helper per testi UI dal JSON
function ui(key, vars) {
  const t = (window._ui && window._ui[key]) || key;
  if (!vars) return t;
  return t.replace(/\{(\w+)\}/g, (_, k) => vars[k] !== undefined ? vars[k] : _);
}
function symName(sym) {
  const NOMI_IT = {
    // Fissi
    ouroboros:"Ouroboros (Wild)", pschent:"Pschent (Jackpot)",
    // Gemme
    copper:"Rame", onyx:"Onice", ruby:"Rubino", sapphire:"Zaffiro",
    amethyst:"Ametista", emerald:"Smeraldo", topaz:"Topazio",
    diamond:"Diamante", gold:"Oro", meteorite:"Meteorite",
    // Divinità
    bes:"Bes", taweret:"Taweret", khnum:"Khnum", sobek:"Sobek",
    neith:"Neith", sekhmet:"Sekhmet", ptah:"Ptah", nut:"Nut",
    amon:"Amon", khonsu:"Khonsu", cleopatra:"Cleopatra", ra:"Ra",
    osiris:"Osiride", isis:"Iside", horus:"Horus", anubis:"Anubi",
    thoth:"Thoth", hathor:"Hathor", seth:"Seth", bastet:"Bastet",
    udjat:"Udjat", pharaoh:"Faraone", nefertiti:"Nefertiti",
    // Penalità
    skull:"Teschio", curse:"Maledizione", spirit:"Spirito Maligno", mummy:"Mummia",
    // Minigiochi
    market:"Mercato del Nilo", scale:"Bilancia di Ma'at",
    sphinx:"Sfinge", papyrus:"Papiro Sacro", jar:"Vaso Antico",
    // Moltiplicatori
    scarab:"Scarabeo", coin:"Moneta d'Oro",
    // Normali — Schiavo
    wheat:"Grano", bread:"Pane", onion:"Cipolla",
    oillamp:"Lampada a Olio", bowl_wood:"Ciotola di Legno", cloth_rough:"Tunica Grezza",
    // Normali — Servo del Tempio
    reed:"Canna", fish:"Pesce", dates:"Datteri", basket:"Cesto",
    sandal_papyrus:"Sandalo di Papiro", drink_water:"Giara d'Acqua",
    // Normali — Bracciante
    sickle:"Falce", rope:"Corda", fig:"Fico", goose:"Oca",
    sandal_leather:"Sandalo di Cuoio", bowl_ceramic:"Ciotola di Ceramica",
    // Normali — Pescatore
    boat:"Barca del Nilo", dromedary:"Dromedario",
    // Normali — Contadino
    cat:"Gatto Sacro", drink_beer:"Boccale di Birra",
    // Normali — Pastore
    cloth_linen:"Tunica di Lino",
    // Normali — Artigiano
    chisel:"Scalpello", brick:"Mattone", amulet:"Amuleto",
    // Normali — Vasaio
    canopic_jar:"Vaso Canopo",
    // Normali — Carpentiere
    fan:"Ventaglio", sandal_fine:"Sandalo Lavorato",
    // Normali — Commerciante
    grape:"Uva", pistachio:"Pistacchio", necklace:"Collana",
    drink_wine:"Calice di Vino", cloth_fine:"Tunica Pregiata",
    // Normali — Soldato
    dagger:"Pugnale", scorpion:"Scorpione", cobra:"Cobra",
    ankh:"Ankh", beetle:"Scarabeo Comune",
    // Normali — Scriba Minore
    ibis:"Ibis Sacro",
    // Normali — Scriba Reale
    sarcophagus:"Sarcofago", bird:"Uccello Sacro", tool_scribe:"Calamo da Scriba",
    // Normali — Sacerdote
    djed:"Pilastro Djed", bowl_alabaster:"Ciotola di Alabastro", cloth_royal:"Veste Reale",
    // Normali — Gran Sacerdote
    bread_ritual:"Pane Rituale", sandal_gold:"Sandalo Dorato",
    // Normali — Nobile
    pyramid:"Piramide", scepter:"Scettro", drink_nectar:"Calice d'Oro",
    // Normali — Visir
    obelisk:"Obelisco", bowl_gold:"Ciotola d'Oro",
    // Normali — Dio
    jewelry_gold:"Gioiello d'Oro",
  };
  return NOMI_IT[sym] || sym;
}

// === CONFIG ===
const reelsCount = 6;
const rowsCount = 4;
const linesCount = 50;
const minBet = 1;
const initialCredits = 250;
const pointsPerLevel = 2000;
const GEM_BONUS_THRESHOLD = 100;
const GEM_BONUS_AMOUNT = 500;
let currentCredits = initialCredits;
let currentBet = 1;
let currentLevel = 1;
let totalScore = 0;
let levelXP = 0;
let isSpinning = false;
let freeSpinsRemaining = 0;
let playerName = "";
let gemPoints = 0;

const spinDurationBase = 3000;

const messageArea = document.getElementById("winMessage");
const spinButton = document.getElementById("spinButton");
const betPlus = document.getElementById("betPlus");
const betMinus = document.getElementById("betMinus");
const betDisplay = document.getElementById("currentBet");
const scoreDisplay = document.getElementById("totalScore");
const levelDisplay = document.getElementById("currentLevel");
const levelBar = document.getElementById("levelProgressFill");
const levelText = document.getElementById("levelPoints");
// playerNameInput rimosso dall'header — nome gestito da playerNameDisplay
const slotContainer = document.getElementById("slotContainer");


// === FUNZIONI BASE ===
function getSocialStatus(level) {
  const status = (window._socialClasses && window._socialClasses.length > 0)
    ? window._socialClasses
    : ["Schiavo","Servo del Tempio","Bracciante","Pescatore","Contadino","Pastore","Artigiano","Vasaio","Carpentiere","Commerciante","Soldato","Scriba Minore","Scriba Reale","Medico","Sacerdote","Gran Sacerdote","Nobile","Visir","Faraone","Figlio di Ra","Dio"];
  return status[Math.min(Math.floor((level - 1) / 2), status.length - 1)];
}

function logMessage(html, type = "info") {
  const msgBox = document.getElementById("winMessage");
  const p = document.createElement("p");
  p.className = `log-entry ${type}`;
  p.innerHTML = html;
  msgBox.appendChild(p);
  msgBox.scrollTop = 0;
}


function playSound(id) {
  const audio = document.getElementById(id);
  if (!audio) return;
  try {
    const clone = audio.cloneNode();
    clone.volume = audio.volume || 1;
    clone.play().catch(() => {});
    clone.addEventListener("ended", () => clone.remove(), { once: true });
  } catch(e) {}
}


function updateUI() {
  animateNumberChange("totalScore", totalScore);
  animateNumberChange("currentCredits", currentCredits);
  animateNumberChange("gemPoints", gemPoints);
  animateNumberChange("activeLines", getBetCost());
  const linesEl = document.getElementById("activeLinesCount");
  if (linesEl) linesEl.textContent = activeLines;
  const multEl = document.getElementById("betMultiplier");
  if (multEl) multEl.textContent = `×${currentBet}`;
  betDisplay.textContent = `×${currentBet}`;
  if (levelDisplay) levelDisplay.textContent = currentLevel;
  levelBar.style.width = `${(levelXP / pointsPerLevel) * 100}%`;
  if (levelText) levelText.textContent = `${levelXP}`;

  document.getElementById("socialStatusDisplay").textContent = getSocialStatus(currentLevel);
  const lb = document.getElementById("levelBadge");
  if (lb) lb.textContent = `Lv ${currentLevel}`;

  // ── Footer stats ──
  const ftSym   = document.getElementById("ft-symbols");
  const ftFrasi = document.getElementById("ft-frasi");
  const ftXp    = document.getElementById("ft-xp");
  const ftClass = document.getElementById("ft-class");

  // Conta simboli visti: simula pool per ogni livello con le nuove funzioni
  const seenSymbols = new Set();
  const _savedLevel = currentLevel;
  for (let lv = 1; lv <= _savedLevel; lv++) {
    // Usa le funzioni di livello simulando currentLevel = lv
    currentLevel = lv;
    getSymbolsForCurrentLevel().forEach(s => seenSymbols.add(s.name));
  }
  currentLevel = _savedLevel;

  // Totale simboli possibili nel gioco (unici)
  const symTotal = new Set(masterAllSymbols.map(s => s.name)).size;
  const activeSymNames = getSymbolsForCurrentLevel().map(s => s.name);
  const fraseLearned = activeSymNames.reduce((tot, sym) => tot + (symbolStoriesUnlocked[sym] || 0), 0);
  const frasiTotal   = mysteriousHints.length;

  if (ftSym) ftSym.textContent = `Simboli: ${seenSymbols.size} / ${symTotal}`;
  if (ftFrasi) ftFrasi.textContent = `Storie: ${fraseLearned} / ${frasiTotal}`;
  const totalXPEarned = (currentLevel - 1) * pointsPerLevel + levelXP;
  const totalXPNeeded = currentLevel * pointsPerLevel;
  if (ftXp)    ftXp.textContent    = `XP: ${totalXPEarned.toLocaleString()} / ${totalXPNeeded.toLocaleString()} al Lv${currentLevel + 1}`;

  // Cambia traccia musicale se necessario
  if (bgMusicStarted) {
    const neededTrack = getMusicTrackForLevel(currentLevel);
    switchMusicTrack(neededTrack);
  }

  // Aggiorna lista simboli sinistra
  updateSymbolList();
  // Aggiorna numeri linee visibili
  updateLineNumbers();

  // Disabilita spin se crediti insufficienti anche al minimo assoluto
  if (!isSpinning && freeSpinsRemaining === 0) {
    const minCost = (BET_COSTS_MAP[5] || BET_COSTS_MAP[50])[1] || 1;
    if (currentCredits < minCost) {
      spinButton.disabled = true;
      spinButton.title = "Deben insufficienti";
    } else if (currentCredits < getBetCost()) {
      // Ha crediti ma non abbastanza per la combo corrente — auto-adjust silenzioso
      adjustBet();
    }
  }
}

function updateSymbolList() {
  const list = document.getElementById("symbolList");
  if (!list) return;
  list.innerHTML = "";

  const symbols = getSymbolsForCurrentLevel();
  const newSyms = symbols.filter(s => s.minLevel === currentLevel);
  const oldSyms = symbols.filter(s => s.minLevel < currentLevel);
  [...newSyms, ...oldSyms].forEach(s => {
    const isNew = s.minLevel === currentLevel && currentLevel > 1;
    const item = document.createElement("div");
    item.className = "sym-list-item" + (isNew ? " sym-new" : "");

    const prog = getStoryProgress(s.name);
    const hasStories = getHintsForSymbol(s.name).length > 0 && getStoryThreshold(s.name) < 9999;
    const allUnlocked = hasStories && prog.unlocked >= getHintsForSymbol(s.name).length;

    const progressBar = hasStories ? `
      <div class="sym-story-bar-wrap">
        <div class="sym-story-bar-fill" style="width:${allUnlocked ? 100 : prog.pct}%"></div>
      </div>
      <span class="sym-story-pct">${allUnlocked ? '<span style="color:#ffa700">✓</span>' : prog.pct + '%'}</span>
    ` : '';

    item.innerHTML = `
      <img src="assets/img/symbols/${s.file}" alt="${s.name}">
      <div class="sym-list-info">
        <span class="sym-list-name">${symName(s.name)}</span>
        ${hasStories ? `<div class="sym-story-progress">${progressBar}</div>` : ''}
      </div>
      ${isNew ? '<span class="sym-new-badge">NEW</span>' : ""}
    `;
    list.appendChild(item);
  });
}


function adjustBet() {
  // Prima abbassa il bet mantenendo le linee
  while (currentBet > 1 && getBetCost() > currentCredits) currentBet--;

  // Se ancora non basta, scala anche le linee alla configurazione più economica
  if (getBetCost() > currentCredits) {
    const lineOptions = [5, 10, 25, 50];
    for (const lines of lineOptions) {
      activeLines = lines;
      currentBet = 1;
      if (getBetCost() <= currentCredits) break;
    }
  }

  // Se nemmeno 5 linee ×1 basta → disabilita spin
  if (getBetCost() > currentCredits && freeSpinsRemaining === 0) {
    spinButton.disabled = true;
    spinButton.title = "Deben insufficienti";
  } else {
    spinButton.disabled = false;
    spinButton.title = "";
  }

  updateLineNumbers();
  updateUI();
}


function getActiveCyclingGem() {
  const gems = ["copper","onyx","ruby","sapphire","amethyst","emerald","topaz","diamond","gold","meteorite"];
  const idx = Math.min(Math.floor((currentLevel - 1) / 2), gems.length - 1);
  return gems[idx];
}

function getActiveCyclingDivine() {
  const cycle = ["bes","taweret","khnum","sobek","neith","sekhmet","ptah","nut","amon","khonsu","cleopatra",
                 "ra","osiris","isis","horus","anubis","thoth","hathor","seth","bastet","udjat","pharaoh","nefertiti"];
  return cycle[(currentLevel - 1) % cycle.length];
}

function getActivePenalty() {
  const cycle = ["skull","curse","spirit","mummy"];
  return cycle[Math.floor((currentLevel - 1) / 4) % cycle.length];
}

function getActiveMiniGame() {
  if (currentLevel <= 4)  return "market";
  if (currentLevel <= 9)  return "scale";
  return "sphinx";
}

function getActiveMultiplier() {
  const cycle = ["scarab","scarab","scarab","scarab","scarab","scarab",
                 "coin","coin","coin","coin","coin","coin"];
  return cycle[(currentLevel - 1) % cycle.length];
}

function getNormalsForLevel() {
  const classes = [
    ["wheat","bread","onion","oillamp","bowl_wood","cloth_rough"],       // Schiavo       Lv1-2
    ["reed","fish","dates","basket","sandal_papyrus","drink_water"],     // Servo Tempio  Lv3-4
    ["sickle","rope","fig","goose","sandal_leather","bowl_ceramic"],     // Bracciante    Lv5-6
    ["fish","boat","reed","dates","basket","dromedary"],                 // Pescatore     Lv7-8
    ["wheat","bread","fig","sickle","cat","drink_beer"],                 // Contadino     Lv9-10
    ["goose","dromedary","dates","cloth_linen","basket","fish"],         // Pastore       Lv11-12
    ["chisel","brick","amulet","bowl_ceramic","obelisk","cloth_linen"],  // Artigiano     Lv13-14
    ["canopic_jar","bowl_ceramic","brick","chisel","amulet","cloth_linen"], // Vasaio     Lv15-16
    ["fan","boat","chisel","sandal_fine","brick","dromedary"],           // Carpentiere   Lv17-18
    ["grape","pistachio","necklace","drink_wine","cloth_fine","fan"],    // Commerciante  Lv19-20
    ["dagger","scorpion","cobra","ankh","beetle","sandal_fine"],         // Soldato       Lv21-22
    ["ibis","reed","ankh","cloth_fine","drink_wine","basket"],           // Scriba Minore Lv23-24
    ["ibis","ankh","djed","sarcophagus","bird","tool_scribe"],           // Scriba Reale  Lv25-26
    ["cobra","scorpion","ibis","canopic_jar","ankh","drink_wine"],       // Medico        Lv27-28
    ["ankh","djed","ibis","sarcophagus","bowl_alabaster","cloth_royal"], // Sacerdote     Lv29-30
    ["djed","sarcophagus","udjat","ibis","bread_ritual","sandal_gold"], // Gran Sacerdote Lv31-32
    ["pyramid","scepter","necklace","grape","drink_nectar","cloth_royal"], // Nobile      Lv33-34
    ["pyramid","scepter","obelisk","djed","bowl_gold","cloth_royal"],   // Visir         Lv35-36
    ["pyramid","scepter","ankh","udjat","sandal_gold","bowl_gold"],     // Faraone       Lv37-38
    ["pyramid","scepter","udjat","ankh","djed","bowl_gold"],            // Figlio di Ra  Lv39-40
    ["pyramid","scepter","udjat","ankh","djed","jewelry_gold"],         // Dio           Lv41-42
  ];
  const idx = Math.min(Math.floor((currentLevel - 1) / 2), classes.length - 1);
  return classes[idx];
}

function getSymbolsForCurrentLevel() {
  const gem      = getActiveCyclingGem();
  const divine   = getActiveCyclingDivine();
  const penalty  = getActivePenalty();
  const minigame = getActiveMiniGame();
  const mult     = getActiveMultiplier();
  const normals  = new Set(getNormalsForLevel());

  return masterAllSymbols.filter(s => {
    if (s.name === "ouroboros") return true;  // Wild sempre
    if (s.name === "pschent")   return true;  // Jackpot sempre
    if (s.name === gem)         return true;  // Gemma attiva
    if (s.name === divine)      return true;  // Personaggio attivo
    if (s.name === penalty)     return true;  // Penalità attiva
    if (s.name === minigame)    return true;  // Minigioco attivo
    if (s.name === mult)        return true;  // Moltiplicatore attivo
    if (normals.has(s.name))    return true;  // Normali della classe
    return false;
  });
}

function getWeightedSymbolPool() {
  const pool = [];
  getSymbolsForCurrentLevel().forEach(symbol => {
    for (let i = 0; i < symbol.weight; i++) pool.push(symbol);
  });
  return pool;
}

function generateReels() {
  slotContainer.innerHTML = "";
  const pool = getWeightedSymbolPool().filter(s => s.name !== "hieroglyphs");
  for (let i = 0; i < reelsCount; i++) {
    const reel = document.createElement("div");
    reel.className = "reel";
    for (let j = 0; j < rowsCount; j++) {
      const symbol = pool[Math.floor(Math.random() * pool.length)];
      const cell = document.createElement("div");
      cell.className = "symbol";
      cell.dataset.symbol = symbol.name;
      const img = document.createElement("img");
      img.src = `assets/img/symbols/${symbol.file}`;
      img.alt = symbol.name;
      cell.appendChild(img);
      reel.appendChild(cell);
    }
    slotContainer.appendChild(reel);
  }
}

function getGridSymbols() {
  const grid = [];
  const reels = document.querySelectorAll(".reel");
  reels.forEach(reel => {
    const symbols = [];
    reel.querySelectorAll(".symbol").forEach(cell => {
      symbols.push(cell.dataset.symbol);
    });
    grid.push(symbols);
  });
  return grid;
}

function playRandomLoseSound() {
  const index = Math.floor(Math.random() * 10) + 1;
  playSound(`audioLose${index}`);
}

// === LOGICA LINEE ===
function calculateLineScore(symbol, count) {
  const payout = payoutTable[symbol];
  return payout && payout[count] !== undefined ? payout[count] : 0;
}


function calculateWinnings(grid) {
  let totalWin = 0;
  let linesWon = 0;
  let effects = [];
  let winningSymbols = [];
  let winningLines = [];
  let totalGemPointsThisSpin = 0;

  // Penalità accumulate per tipo — applicate una sola volta a fine spin
  let skullPenaltyLines  = [];   // linee dove skull dimezza (solo se c'è vincita)
  let mummyMaxRate       = 0;    // percentuale più alta trovata tra tutte le linee mummy
  let mummyTriggered     = false;
  let curseTriggered     = false;
  let spiritTriggered    = false;

  const PENALTY_SYMS = ["skull", "curse", "spirit", "mummy"];
  // Simboli speciali che attivano mini-giochi o effetti (NON penalità)
  const SPECIALS = ["jar", "hieroglyphs", "sphinx", "pschent", "papyrus", "market", "scale"];
  const GEM_SYMBOLS = ["copper","onyx","ruby","sapphire","amethyst","emerald","topaz","diamond","gold","meteorite"];
  const WILD_PAYOUT = { 3: 50, 4: 120, 5: 250, 6: 500 };

  allAvailablePaylines.slice(0, activeLines).forEach((line, lineIndex) => {
    const symbolsOnLine = line.map((row, col) => grid[col][row]);

    for (let start = 0; start <= symbolsOnLine.length - 3; start++) {

      // ── Fase 1: raccogli wild iniziali ──
      let i = start;
      let wildCount = 0;
      let matchedPositions = [];

      while (i < symbolsOnLine.length && symbolsOnLine[i] === "ouroboros") {
        matchedPositions.push({ col: i, row: line[i] });
        wildCount++;
        i++;
      }

      // ── Fase 2: identifica simbolo base o combo tutti wild ──
      const isAllWild = (i >= symbolsOnLine.length || wildCount >= symbolsOnLine.length - start);
      const baseSymbol = isAllWild ? "ouroboros" : symbolsOnLine[i];

      if (!isAllWild) {
        // Salta se simbolo non valido (né payout, né speciale, né penalità)
        const isKnown = payoutTable[baseSymbol] || SPECIALS.includes(baseSymbol) || PENALTY_SYMS.includes(baseSymbol);
        if (!isKnown) continue;
        matchedPositions.push({ col: i, row: line[i] });
        i++;
      }

      // ── Fase 3: estendi con simboli identici ──
      while (i < symbolsOnLine.length && symbolsOnLine[i] === baseSymbol && !isAllWild) {
        matchedPositions.push({ col: i, row: line[i] });
        i++;
      }

      const currentCount = matchedPositions.length;
      const realMatches  = currentCount - wildCount;
      const hasWild      = wildCount > 0;

      // ── Validazione minima ──
      if (currentCount < 3) continue;
      if (!isAllWild && realMatches < 1) continue;

      // ── Penalità come simbolo BASE (3+ simboli identici di penalità) ──
      if (PENALTY_SYMS.includes(baseSymbol) && !hasWild) {
        matchedPositions.forEach(p => winningSymbols.push(p));
        winningLines.push({
          lineIndex,
          positions: matchedPositions.map(p => [p.row, p.col]),
          isGemWin: false, isSpecialEffect: false,
          isPenalty: true,
          hasWild: false,
          hasScarabMultiplier: false, hasCoinMultiplier: false,
          symbol: baseSymbol,
          matchCount: currentCount
        });

        switch (baseSymbol) {
          case "skull":
            // 3× skull = dimezza i crediti attuali (non una linea, ma lo stack)
            skullPenaltyLines.push({ lineIndex, isBase: true, count: currentCount });
            break;
          case "curse":
            // 3× curse = sottrae deben fissi scalati per count e bet
            curseTriggered = true;
            effects.push({ type: "curse_penalty", count: currentCount });
            break;
          case "spirit":
            // 3× spirit = azzera i free spin
            spiritTriggered = true;
            effects.push({ type: "spirit_penalty" });
            break;
          case "mummy":
            // Prende la percentuale più alta tra tutte le combo mummy dello spin
            const rate = [0,0,0,0.10,0.20,0.30,0.50][Math.min(currentCount,6)] || 0.50;
            if (rate > mummyMaxRate) { mummyMaxRate = rate; mummyTriggered = true; }
            break;
        }
        break;
      }

      // ── Blocca wild+moltiplicatore (combo non valida) ──
      const lineHasScarab = line.some((r, c) => grid[c][r] === "scarab");
      const lineHasCoin   = line.some((r, c) => grid[c][r] === "coin");
      if (hasWild && (lineHasScarab || lineHasCoin)) continue;
      if (baseSymbol === "papyrus" && (hasWild || lineHasScarab || lineHasCoin)) continue;

      // ── Calcola payout ──
      const isGem = GEM_SYMBOLS.includes(baseSymbol);
      let linePayoutAmount = 0;

      if (isAllWild || baseSymbol === "ouroboros") {
        linePayoutAmount = WILD_PAYOUT[Math.min(currentCount, 6)] || 0;
      } else if (payoutTable[baseSymbol]) {
        linePayoutAmount = payoutTable[baseSymbol][Math.min(currentCount, 6)] || 0;
      }

      // ── Skull come PRESENZA sulla linea (dimezza la vincita della linea) ──
      // Solo sui simboli matchati (non sull'intera linea) e solo se c'è vincita
      const skullInMatch = matchedPositions.some(p => grid[p.col][p.row] === "skull");
      if (skullInMatch && !isGem && linePayoutAmount > 0) {
        linePayoutAmount = Math.floor(linePayoutAmount / 2);
        skullPenaltyLines.push({ lineIndex, isBase: false });
      }

      // ── Moltiplicatori ──
      let lineMultiplier = 1;
      let coinApplied = false;
      line.forEach((r, c) => {
        const sym = grid[c][r];
        if (sym === "scarab") lineMultiplier *= 2;
        if (sym === "coin" && !coinApplied) { lineMultiplier *= 10; coinApplied = true; }
      });
      linePayoutAmount *= lineMultiplier;

      // ── Gemme: accumula solo nel risultato, non su gemPoints direttamente ──
      if (isGem) {
        const baseGemVal = GEM_POINTS_TABLE[baseSymbol] || 4;
        // Scala con il numero di simboli matchati (3×=base, 4×=×1.6, 5×=×2.4, 6×=×3.5)
        const countMult = [0,0,0,1,1.6,2.4,3.5][Math.min(currentCount,6)] || 1;
        const gemEarned = Math.round(baseGemVal * countMult * currentBet);
        totalGemPointsThisSpin += gemEarned;
      }

      // ── Effetti speciali mini-giochi ──
      if (baseSymbol === "jar"        && !effects.includes("jar"))    effects.push("jar");
      if (baseSymbol === "sphinx"     && !effects.includes("sphinx")) effects.push("sphinx");
      if (baseSymbol === "market"     && !effects.includes("market")) effects.push("market");
      if (baseSymbol === "scale"      && !effects.includes("scale"))  effects.push("scale");
      if (baseSymbol === "papyrus")   effects.push({ type: "papyrus_bonus" });
      if (baseSymbol === "hieroglyphs") {
        const hPos = matchedPositions.filter(p => grid[p.col][p.row] === "hieroglyphs");
        if (hPos.length > 0) effects.push({ type: "transform", positions: hPos });
      }

      const isSpecial = SPECIALS.includes(baseSymbol);
      const isLineEligible = linePayoutAmount > 0 || isGem || isSpecial;

      if (isLineEligible) {
        if (!isGem) totalWin += linePayoutAmount * currentBet;
        linesWon++;
        winningSymbols.push(...matchedPositions);
        winningLines.push({
          lineIndex,
          positions: matchedPositions.map(p => [p.row, p.col]),
          isGemWin: isGem,
          isSpecialEffect: isSpecial,
          isPenalty: false,
          hasWild,
          hasScarabMultiplier: lineHasScarab,
          hasCoinMultiplier: lineHasCoin,
          symbol: baseSymbol,
          matchCount: currentCount
        });
      }

      break;
    }
  });

  // ── Consolida penalità mummy (una sola, la più grave) ──
  if (mummyTriggered) {
    effects.push({ type: "mummy_penalty", rate: mummyMaxRate });
  }

  // ── Skull base (combo 3×skull): dimezza crediti correnti ──
  const skullBasePenalties = skullPenaltyLines.filter(s => s.isBase);
  if (skullBasePenalties.length > 0) {
    effects.push({ type: "skull_base_penalty", count: skullBasePenalties[0].count });
  }

  // ── Skull presenza: già dimezzato nel payout, logga solo le linee ──
  const skullPresencePenalties = skullPenaltyLines.filter(s => !s.isBase);
  skullPresencePenalties.forEach(s => {
    effects.push({ type: "skull_penalty", lineIndex: s.lineIndex });
  });

  return { totalWin, linesWon, effects, winningSymbols, winningLines, totalGemPointsThisSpin };
}



// === NUOVE FUNZIONI PER LINEE VINCENTI ===

// === CREATE LINE NUMBER ELEMENTS (ONCE) ===
function createLineNumbers() {
  updateLineNumbers();
}

function updateLineNumbers() {
  const left = document.getElementById("lineNumbersLeft");
  const right = document.getElementById("lineNumbersRight");

  // Preserva i numeri vincenti già accesi prima di ricostruire
  const activeNums = new Set();
  left.querySelectorAll(".line-number.active").forEach(el => activeNums.add(parseInt(el.textContent)));
  right.querySelectorAll(".line-number.active").forEach(el => activeNums.add(parseInt(el.textContent)));

  left.innerHTML = "";
  right.innerHTML = "";

  for (let i = 1; i <= 25; i++) {
    const num = document.createElement("div");
    num.className = "line-number";
    num.textContent = i;
    if (i <= activeLines) { num.classList.add("selected"); num.style.opacity = "1"; }
    else { num.style.opacity = "0.15"; }
    if (activeNums.has(i)) {
      num.classList.add("active");
      num.style.opacity = "1";
      const neonColor = winningLineColors.get(i);
      if (neonColor) {
        num.style.color = neonColor;
        num.style.textShadow = `0 0 4px ${neonColor}`;
      }
    }
    num.style.pointerEvents = i <= activeLines ? "auto" : "none";
    left.appendChild(num);
  }

  for (let i = 26; i <= 50; i++) {
    const num = document.createElement("div");
    num.className = "line-number";
    num.textContent = i;
    if (i <= activeLines) { num.classList.add("selected"); num.style.opacity = "1"; }
    else { num.style.opacity = "0.15"; }
    if (activeNums.has(i)) {
      num.classList.add("active");
      num.style.opacity = "1";
      const neonColor = winningLineColors.get(i);
      if (neonColor) {
        num.style.color = neonColor;
        num.style.textShadow = `0 0 4px ${neonColor}`;
      }
    }
    num.style.pointerEvents = i <= activeLines ? "auto" : "none";
    right.appendChild(num);
  }
}

// === NEON PAYLINE COLORS ===
const PAYLINE_COLORS = [
  "#ff003c","#ff6600","#ffcc00","#00ff88","#00ccff",
  "#aa44ff","#ff44cc","#00ffff","#ff4444","#44ff44",
  "#ff9900","#00ff44","#4488ff","#ff00aa","#88ff00",
  "#ff5500","#00ffcc","#ff0088","#66ff00","#0088ff",
  "#ffaa00","#00ff66","#ff2244","#44ffaa","#aa00ff",
  "#ff6644","#00ccff","#ffee00","#ff00ff","#00ff00",
  "#ff3300","#0044ff","#ffcc44","#44ff88","#cc00ff",
  "#ff8800","#00ff55","#ff1166","#55ffcc","#8800ff",
  "#ffbb00","#00ffaa","#ff3388","#aaff00","#0055ff",
  "#ff4400","#44ccff","#ff99cc","#ccff44","#4400ff",
];

function drawPaylinesSVG(winningLines) {
  const svg = document.getElementById("paylineOverlay");
  if (!svg) return;
  svg.innerHTML = "";

  const container = document.getElementById("slotContainer");
  if (!container) return;

  // Allinea SVG esattamente sopra slotContainer usando le posizioni reali
  const containerRect = container.getBoundingClientRect();
  const wrapperRect = container.parentElement.getBoundingClientRect();
  const W = containerRect.width;
  const H = containerRect.height;
  const offsetLeft = containerRect.left - wrapperRect.left;
  const offsetTop  = containerRect.top  - wrapperRect.top;
  svg.style.left   = offsetLeft + "px";
  svg.style.top    = offsetTop  + "px";
  svg.style.width  = W + "px";
  svg.style.height = H + "px";
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

  const COLS = 6;
  const ROWS = 4;
  const cellW = W / COLS;
  const cellH = H / ROWS;

  const cx = (col) => col * cellW + cellW / 2;
  const cy = (row) => row * cellH + cellH / 2;

  winningLines.forEach((lineObj) => {
    const color = PAYLINE_COLORS[lineObj.lineIndex % PAYLINE_COLORS.length];
    const linePath = allAvailablePaylines[lineObj.lineIndex];
    const points = linePath.map((row, col) => `${cx(col).toFixed(1)},${cy(row).toFixed(1)}`).join(" ");

    // Glow esterno
    const glowLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    glowLine.setAttribute("points", points);
    glowLine.setAttribute("fill", "none");
    glowLine.setAttribute("stroke", color);
    glowLine.setAttribute("stroke-width", "5");
    glowLine.setAttribute("stroke-opacity", "0.22");
    glowLine.setAttribute("stroke-linecap", "round");
    glowLine.setAttribute("stroke-linejoin", "round");
    svg.appendChild(glowLine);

    // Linea neon principale
    const mainLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    mainLine.setAttribute("points", points);
    mainLine.setAttribute("fill", "none");
    mainLine.setAttribute("stroke", color);
    mainLine.setAttribute("stroke-width", "1.5");
    mainLine.setAttribute("stroke-opacity", "1");
    mainLine.setAttribute("stroke-linecap", "round");
    mainLine.setAttribute("stroke-linejoin", "round");
    svg.appendChild(mainLine);

    // Salva colore nella Map — verrà applicato da updateLineNumbers
    winningLineColors.set(lineObj.lineIndex + 1, color);
  });
}

function clearPaylinesSVG() {
  const svg = document.getElementById("paylineOverlay");
  if (svg) svg.innerHTML = "";
  winningLineColors.clear();
}

// === HIGHLIGHT WINNING LINES ===
function highlightWinningLines(winningLines) {
  clearLineHighlights();

  if (winningLines.length > 0) {
    document.getElementById("slotContainer").classList.add("has-winners");
  }

  const grid = getGridSymbols();

  winningLines.forEach(lineObj => {
    const lineIndex = lineObj.lineIndex + 1;
    const positions = lineObj.positions; // [row, col][]
    const linePath = allAvailablePaylines[lineObj.lineIndex];

    let scarabCount = 0;
    let coinCount = 0;
    linePath.forEach((row, col) => {
      const sym = grid[col][row];
      if (sym === "scarab") scarabCount++;
      if (sym === "coin")   coinCount++;
    });

    linePath.forEach((row, col) => {
      const reel = document.querySelectorAll(".reel")[col];
      const cell = reel.children[row];
      const symbol = cell.dataset.symbol;
      const isMatched = positions.some(([r, c]) => r === row && c === col);

      if (isMatched) {
        cell.classList.add("pulse");
        // Penalità: classe visiva dedicata (colore rosso dal CSS)
        if (lineObj.isPenalty) {
          cell.classList.add("symbol-penalty");
        }
      }

      // Badge moltiplicatori
      if (symbol === "scarab" && scarabCount > 0) {
        cell.classList.add("symbol-multiplier", "pulse");
        cell.setAttribute("data-mult", `x${scarabCount * 2}`);
      }
      if (symbol === "coin" && !cell.classList.contains("symbol-multiplier")) {
        cell.classList.add("symbol-multiplier", "pulse");
        cell.setAttribute("data-mult", `x10`);
        coinCount = 0;
      }
      if (symbol === "papyrus" && isMatched) {
        cell.classList.add("symbol-multiplier");
        cell.setAttribute("data-mult", `?`);
      }
    });

    // Highlight numero linea
    const lineNumberEl = lineIndex <= 25
      ? document.querySelector(`#lineNumbersLeft .line-number:nth-child(${lineIndex})`)
      : document.querySelector(`#lineNumbersRight .line-number:nth-child(${lineIndex - 25})`);

    if (lineNumberEl) {
      lineNumberEl.classList.add("active");
      lineNumberEl.style.opacity = "1";
    }
  });

  // Disegna linee neon SVG
  drawPaylinesSVG(winningLines);
}


// === CLEAR LINE HIGHLIGHTS ===
function clearLineHighlights() {
  clearPaylinesSVG();
  document.querySelectorAll(".symbol.pulse").forEach(el => el.classList.remove("pulse"));
  document.querySelectorAll(".symbol.symbol-penalty").forEach(el => el.classList.remove("symbol-penalty"));
  document.getElementById("slotContainer").classList.remove("has-winners");
  document.querySelectorAll(".line-number.active").forEach(el => {
    el.classList.remove("active");
    el.style.color = "";
    el.style.textShadow = "";
  });
  document.querySelectorAll(".symbol-multiplier").forEach(el => {
    el.classList.remove("symbol-multiplier");
    el.removeAttribute("data-mult");
  });
}


// === FUNZIONE PER IL MINI-GIOCO DELLA SFINGE (LOGICA COMPLETA) ===
function playSphinxGame(initialPrize = 100) {
  const modal = document.getElementById("sphinxModal");
  const content = document.getElementById("sphinxModalContent");

  if (!modal || !content) {
      console.error("ERRORE: Elementi HTML per la modale della Sfinge non trovati! Assicurati che 'sphinxModal' e 'sphinxModalContent' esistano nel tuo HTML.");
      return;
  }

  // Disabilita i controlli del gioco principale
  spinButton.disabled = true;
  betPlus.disabled = true;
  betMinus.disabled = true;

  const cardFiles = [
    "2C", "2D", "2H", "2S", "3C", "3D", "3H", "3S", "4C", "4D", "4H", "4S",
    "5C", "5D", "5H", "5S", "6C", "6D", "6H", "6S", "7C", "7D", "7H", "7S",
    "8C", "8D", "8H", "8S", "9C", "9D", "9H", "9S", "10C", "10D", "10H", "10S",
    "JC", "JD", "JH", "JS", "QC", "QD", "QH", "QS", "KC", "KD", "KH", "KS",
    "AC", "AD", "AH", "AS"
  ];

  const getValue = (code) => {
    const rank = code.replace(/[^0-9AJQK]/g, "");
    if (rank === "A") return 14;
    if (rank === "K") return 13;
    if (rank === "Q") return 12;
    if (rank === "J") return 11;
    return parseInt(rank);
  };

  let prize = initialPrize;
  let rounds = 0;
  let sphinxCard = "";

  function askToPlay() {
    const backs = ["back.png", "back2.png"];
    content.innerHTML = `
      <div class="sphinx-casino">
        <img src="assets/img/symbols/sphinx.png" style="width:180px;height:180px;object-fit:contain;margin-bottom:12px;">
        <div class="sphinx-header-title">La Sfinge ti sfida</div>
        <div class="sphinx-header-sub">scegli la carta più alta</div>
        <div class="card-row" style="margin-bottom: 10px">
          ${Array.from({ length: 4 }).map(() =>
            `<div class="card-choice" style="pointer-events: none;">𓂀<br>𓆣<br>𓇳</div>`
          ).join("")}
        </div>
        <div class="sphinx-question">
          La Sfinge ti offre <strong>${prize}</strong> Deben di rame.<br>
          Vuoi giocare per raddoppiare o accettare la vincita?
        </div>
        <div class="sphinx-buttons">
          <button id="acceptPrize">Accetta il premio</button>
          <button id="challengeSphinx">Sfida la Sfinge</button>
        </div>
      </div>
    `;
    modal.classList.remove("hidden");
    modal.style.display = "flex"; // Assicura che display sia 'flex' per centrare

    document.getElementById("acceptPrize").onclick = () => {
      currentCredits += prize;
      totalScore += prize;
      levelXP += prize;
      modal.classList.add("hidden");
      modal.style.display = "none"; // Imposta display a 'none'
      logMessage(`Sfinge: +${prize} Deben accettati`, "bonus");
      playSound("sphinxwin");
      updateUI();
      spinButton.disabled = false;
      betPlus.disabled = false;
      betMinus.disabled = false;
    };

    document.getElementById("challengeSphinx").onclick = showGame;
  }

  function showGame() {
    sphinxCard = cardFiles[Math.floor(Math.random() * cardFiles.length)];

    content.innerHTML = `
      <div class="sphinx-casino">
        <img src="assets/img/symbols/sphinx.png" style="width:140px;height:140px;object-fit:contain;margin-bottom:8px;">
        <div class="sphinx-header-title">Carta della Sfinge</div>
        <img id="sphinxCard" class="sphinx-card" src="assets/img/cards/${sphinxCard}.png" alt="Carta Sfinge">
        <div class="sphinx-header-sub" style="margin-top:16px;">Scegli una carta coperta</div>
        <div class="card-row" id="playerChoices"></div>
        <div id="sphinxResultText" class="sphinx-result-text"></div>
        <div class="sphinx-buttons" id="afterResultButtons" style="display: none;">
          <button id="takePrize">Incassa</button>
          <button id="doublePrize">Raddoppia</button>
        </div>
      </div>
    `;

    const backs = ["back.png", "back2.png"];
    const choicesRow = document.getElementById("playerChoices");
    const result = document.getElementById("sphinxResultText");
    const afterResult = document.getElementById("afterResultButtons");

    for (let i = 0; i < 4; i++) {
      const img = document.createElement("div");
      img.className = "card-choice";
      img.style.cursor = "pointer";
      img.innerHTML = "𓂀<br>𓆣<br>𓇳";

      img.onclick = (event) => {
        const playerCard = cardFiles[Math.floor(Math.random() * cardFiles.length)];
        img.innerHTML = `<img src="assets/img/cards/${playerCard}.png" style="width:90px;height:130px;object-fit:contain;border-radius:8px;">`; 
        document.querySelectorAll(".card-choice").forEach(c => c.onclick = null); // Disabilita i click sulle altre carte

        const win = getValue(playerCard) > getValue(sphinxCard);

        if (win) {
          result.innerHTML = `✅ Hai vinto! Premio attuale: <strong>${prize}</strong> crediti`;
          afterResult.innerHTML = `
            <button id="takePrize">Incassa</button>
            ${rounds < 2 ? '<button id="doublePrize">Raddoppia</button>' : ''}
          `;
          afterResult.style.display = "flex";

          document.getElementById("takePrize").onclick = () => {
            currentCredits += prize;
            totalScore += prize;
            levelXP += prize;
            modal.classList.add("hidden");
            modal.style.display = "none";
            logMessage(`Sfinge: +${prize} Deben vinti`, "bonus");
            playSound("sphinxwin");
            updateUI();
            spinButton.disabled = false;
            betPlus.disabled = false;
            betMinus.disabled = false;
          };

          const doubleBtn = document.getElementById("doublePrize");
          if (doubleBtn) {
            doubleBtn.onclick = () => {
              prize *= 2;
              rounds++;
              showGame();
            };
          }

        } else {
          result.innerHTML = `❌ Hai perso contro la Sfinge!`;
          afterResult.innerHTML = `<button id="closeSphinx">Chiudi</button>`;
          afterResult.style.display = "flex";

          document.getElementById("closeSphinx").onclick = () => {
            modal.classList.add("hidden");
            modal.style.display = "none";
            logMessage(`Sfinge: Sconfitta. Nessun premio.`, "curse");
            playSound("sphinxlose");
            updateUI();
            spinButton.disabled = false;
            betPlus.disabled = false;
            betMinus.disabled = false;
          };
        }
      };
      choicesRow.appendChild(img);
    }
  }

  askToPlay();
}


function animateWinningSymbols(symbols) {
  const reels = document.querySelectorAll(".reel");
  const sc = document.getElementById("slotContainer");
  if (symbols && symbols.length > 0) {
    sc.classList.add("has-winners");
    symbols.forEach(({ col, row }) => {
      const reel = reels[col];
      if (reel && reel.children[row]) {
        reel.children[row].classList.add("pulse");
      }
    });
  }
}


// === SPIN ===
function calculateWinningsAndEffects(spinBet, spinLines, spinCost) {
  const grid = getGridSymbols();
  const result = calculateWinnings(grid);
  applyResult(result, spinBet, spinLines, spinCost);
}


function handleSpin() {
  if (isSpinning) return;

  // Cambia l'immagine del pulsante in "premuto"



  playSound("spinSound"); // 🔊 suono di spin

  // Verifica se puoi scommettere (escluse free spin)
  if (freeSpinsRemaining === 0 && currentCredits < getBetCost()) {
    // Prova auto-adjust prima di arrendersi
    adjustBet();
    if (currentCredits < getBetCost()) {
      logMessage(ui("insufficientFunds"), "error");
      return;
    }
  }

  // Salva i valori della puntata PRIMA di scalare i crediti — immutabili per questo spin
  const spinBet       = currentBet;
  const spinLines     = activeLines;
  const spinCostSnap  = getBetCost();

  // Scala credito o free spin
  if (freeSpinsRemaining > 0) {
    freeSpinsRemaining--;
    logMessage(`Giro gratuito — rimasti: <span class="log-count">${freeSpinsRemaining}</span>`, "info");
  } else {
    currentCredits -= spinCostSnap;
    // Auto-adjust DOPO lo spin, non ora — viene fatto in applyResult
  }

  updateUI();
  clearLineHighlights();

  isSpinning = true;
  spinButton.disabled = true;
  betPlus.disabled = true; // Disabilita anche i pulsanti di puntata durante lo spin
  betMinus.disabled = true;

  const pool = getWeightedSymbolPool();

  for (let i = 0; i < reelsCount; i++) {
    const reel = slotContainer.children[i];
    const spinInterval = setInterval(() => {
      for (let j = 0; j < rowsCount; j++) {
        const symbol = pool[Math.floor(Math.random() * pool.length)];
        const cell = reel.children[j];
        const img = cell.querySelector("img");
        cell.dataset.symbol = symbol.name;
        img.src = `assets/img/symbols/${symbol.file}`;
        img.alt = symbol.name;
      }
    }, 50);

    setTimeout(() => {
      clearInterval(spinInterval);
      // Assicurati che i simboli finali siano generati correttamente dopo lo stop
      for (let j = 0; j < rowsCount; j++) {
        const symbol = pool[Math.floor(Math.random() * pool.length)];
        const cell = reel.children[j];
        const img = cell.querySelector("img");
        cell.dataset.symbol = symbol.name;
        img.src = `assets/img/symbols/${symbol.file}`;
        img.alt = symbol.name;
      }

      if (i === reelsCount - 1) {
        setTimeout(() => {
          calculateWinningsAndEffects(spinBet, spinLines, spinCostSnap);

          spinButton.disabled = false;
          betPlus.disabled = false;
          betMinus.disabled = false;
          isSpinning = false;
        }, 300);
      }
    }, i * 300 + spinDurationBase);
  }
}



// ── MUSICA A LIVELLI ──
// Lv 1-4 → 1.mp3 | Lv 5+ → 2.mp3
let bgMusicStarted = false;
let currentMusicTrack = 0; // 0 = nessuna, 1 = 1.mp3, 2 = 2.mp3

const MUSIC_TRACKS = 3; // quante tracce hai (1.mp3, 2.mp3, ...)
function getMusicTrackForLevel(level) {
  // Lv1→1.mp3, Lv2→2.mp3, Lv3→1.mp3, Lv4→2.mp3 ... (ciclico)
  return ((level - 1) % MUSIC_TRACKS) + 1;
}

function switchMusicTrack(trackNum) {
  if (trackNum === currentMusicTrack) return;
  // Ferma la traccia corrente
  for (let i = 1; i <= 2; i++) {
    const el = document.getElementById("bgMusic" + i);
    if (el) { el.pause(); el.currentTime = 0; }
  }
  currentMusicTrack = trackNum;
  const newTrack = document.getElementById("bgMusic" + trackNum);
  if (!newTrack) return;
  newTrack.loop = true;
  newTrack.volume = _masterVolume;
  newTrack.play().catch(e => console.warn("Music:", e));
}

function startBgMusic() {
  if (bgMusicStarted) return;
  bgMusicStarted = true;
  const track = getMusicTrackForLevel(currentLevel);
  switchMusicTrack(track);
}

// ── VOLUME ──
let _masterVolume = 0.70;
let _isMuted = false;
let _volBeforeMute = 0.70;

function setMasterVolume(val) {
  _masterVolume = val / 100;
  _isMuted = (_masterVolume === 0);
  applyVolume();
  // Aggiorna gradiente slider
  const slider = document.getElementById("volMaster");
  if (slider) slider.style.background =
    `linear-gradient(to right, #c4881a 0%, #c4881a ${val}%, rgba(90,40,0,0.15) ${val}%)`;
  // Icona
  const icon = document.querySelector("#volumeBtn .material-icons");
  if (icon) icon.textContent = _isMuted ? "volume_off" : val < 40 ? "volume_down" : "volume_up";
}

function applyVolume() {
  const v = _isMuted ? 0 : _masterVolume;
  document.querySelectorAll("audio").forEach(a => { a.volume = v; a.muted = false; });
}

function toggleMute() {
  if (_isMuted) {
    _isMuted = false;
    _masterVolume = _volBeforeMute || 0.70;
  } else {
    _volBeforeMute = _masterVolume;
    _isMuted = true;
  }
  const slider = document.getElementById("volMaster");
  if (slider) {
    const v = _isMuted ? 0 : Math.round(_masterVolume * 100);
    slider.value = v;
    setMasterVolume(v);
  } else {
    applyVolume();
    const icon = document.querySelector("#volumeBtn .material-icons");
    if (icon) icon.textContent = _isMuted ? "volume_off" : "volume_up";
  }
}



// ── DARK / LIGHT MODE ──
let _isDark = false;
function toggleDark() {
  _isDark = !_isDark;
  document.body.classList.toggle("dark", _isDark);
  const icon = document.querySelector("#darkBtn .material-icons");
  if (icon) icon.textContent = _isDark ? "light_mode" : "dark_mode";
}

// ── FULLSCREEN ──
function toggleFullscreen() {
  const btn = document.getElementById("fullscreenBtn");
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
    if (btn) btn.querySelector(".material-icons").textContent = "fullscreen_exit";
  } else {
    document.exitFullscreen().catch(() => {});
    if (btn) btn.querySelector(".material-icons").textContent = "fullscreen";
  }
}
document.addEventListener("fullscreenchange", () => {
  const btn = document.getElementById("fullscreenBtn");
  if (btn) btn.querySelector(".material-icons").textContent =
    document.fullscreenElement ? "fullscreen_exit" : "fullscreen";
});

// Preload
[1, 2, 3].forEach(i => {
  const el = document.getElementById("bgMusic" + i);
  if (el) { el.loop = true; el.volume = _masterVolume; el.preload = "auto"; }
});

// Autoplay al primo click
document.addEventListener("click",      startBgMusic, { once: true });
document.addEventListener("keydown",    startBgMusic, { once: true });
document.addEventListener("touchstart", startBgMusic, { once: true });




// === EVENTI ===
spinButton.addEventListener("click", handleSpin);
betPlus.addEventListener("click", () => {
  currentBet = Math.min(currentBet + 1, 5);

  playSound("betSound"); // Suono ogni volta che aumenti
  adjustBet();
});
betMinus.addEventListener("click", () => {
  currentBet = Math.max(minBet, currentBet - 1);
  playSound("betSound");
  adjustBet();
});
// Nome bloccato in partita — impostato solo dalla schermata intro
// playerInput rimosso dall'header, playerName viene settato da startGame()
document.addEventListener("keydown", (e) => {
  if (e.key === " ") { e.preventDefault(); handleSpin(); }
  else if (e.key === "+" || e.key === "=") { currentBet = Math.min(currentBet + 1, 5); playSound("betSound"); adjustBet(); }
  else if (e.key === "-" || e.key === "_") { currentBet = Math.max(minBet, currentBet - 1); playSound("betSound"); adjustBet(); }
});

window.addEventListener("load", () => {
  updateUI();
  generateReels();
  createLineNumbers();

  // Ticker rotante sotto la barra XP
  let tickerIdx = 0;
  function rotateTicker() {
    const el = document.getElementById("headerTickerText");
    if (!el) return;
    const syms   = document.getElementById("ft-symbols")?.textContent || "";
    const frasi  = document.getElementById("ft-frasi")?.textContent || "";
    const xp     = document.getElementById("ft-xp")?.textContent || "";
    const record = document.getElementById("ft-record")?.textContent || "";
    const items  = [syms, frasi, xp, record].filter(Boolean);
    if (!items.length) return;

    el.classList.add("fading");
    setTimeout(() => {
      el.textContent = items[tickerIdx % items.length];
      tickerIdx++;
      el.classList.remove("fading");
    }, 400);
  }
  rotateTicker();
  setInterval(rotateTicker, 3000);

  // Fetch record mondiale
  fetchWorldRecord();

  // Bottone clear console
  const clearBtn = document.getElementById("consoleClear");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      const msg = document.getElementById("winMessage");
      if (msg) msg.innerHTML = "";
    });
  }

  // Fade in intro
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const intro = document.getElementById("introScreen");
      if (intro) intro.classList.add("visible");
    });
  });
});


function applyResult(result, spinBet, spinLines, spinCost) {
  // Fade out contenuto vecchio, poi scrivi tutto insieme
  messageArea.classList.add("fading");
  setTimeout(() => {
    messageArea.innerHTML = "";
    void messageArea.offsetHeight;
    messageArea.classList.remove("fading");
    _applyResultContent(result, spinBet, spinLines, spinCost);
  }, 400);
}

function _applyResultContent(result, spinBet = currentBet, spinLines = activeLines, spinCost = getBetCost()) {
  const messageArea = document.getElementById("winMessage");

  const gemSymbols = ["diamond", "ruby", "topaz", "emerald", "sapphire", "amethyst"];

  const totalCoinsThisSpin = result.totalWin;
  const totalGemPointsThisSpin = result.totalGemPointsThisSpin;

  currentCredits += totalCoinsThisSpin;
  totalScore += totalCoinsThisSpin;
  levelXP += totalCoinsThisSpin;

  const hasCoinWin = totalCoinsThisSpin > 0;
  const hasGemWin = totalGemPointsThisSpin > 0;
  const hasPapyrus = result.effects.some(e => typeof e === "object" && e.type === "papyrus_bonus");
  const hasJar = result.effects.includes("jar");
  const hasSphinx = result.effects.includes("sphinx");
  const hasTransform = result.effects.some(e => typeof e === "object" && e.type === "transform");



  if (hasCoinWin || hasGemWin || hasPapyrus || hasJar || hasSphinx || hasTransform) {
    if (hasCoinWin) {
      if (totalCoinsThisSpin >= 1000)     playSound("win3");
      else if (totalCoinsThisSpin >= 300) playSound("win2");
      else                                playSound("win");
    } else {
      playSound("win");
    }

    // ── Riga riepilogo spin (valori snapshot al momento della puntata) ──
    const spinInfo = `<span class="log-spininfo">${spinLines} linee  ×${spinBet}  Puntata: ${spinCost} Deben</span>`;
    logMessage(spinInfo, "spininfo");

    if (hasCoinWin) {
      let winClass = "win-small";
      let title = "Vincita";
      if (totalCoinsThisSpin >= 1500) { title = "Enorme Vincita"; winClass = "win-huge"; }
      else if (totalCoinsThisSpin >= 1000) { title = "MEGA Vincita"; winClass = "win-mega"; }
      else if (totalCoinsThisSpin >= 300)  { title = "Grande Vincita"; winClass = "win-big"; }

      logMessage(`${title} &nbsp;+${totalCoinsThisSpin} Deben`, winClass);

      // Dettaglio linee — compatto su una riga ciascuna
      const unlockedThisSpin = []; // storie sbloccate in questo spin
      result.winningLines.forEach(line => {
        if (line.isGemWin || line.isSpecialEffect || line.isPenalty) return;
        const nome = symName(line.symbol);
        const prefix = line.hasWild ? `<span class='log-wild'>Wild</span> + ` : "";
        const mult = line.hasCoinMultiplier
          ? ` moltiplicato <span class='log-mult'>×10</span>`
          : line.hasScarabMultiplier
          ? ` moltiplicato <span class='log-mult'>×2</span>`
          : "";
        const payout = payoutTable[line.symbol] ? payoutTable[line.symbol][Math.min(line.matchCount,6)] * spinBet : 0;
        if (payout > 0) {
          logMessage(`<span class='log-line-num'>#${line.lineIndex+1}</span> ${prefix}${nome} <span class='log-count'>×${line.matchCount}</span>${mult} — vinci <span class='log-payout'>+${payout}</span>`, "info");
          // Accumula punti story per questo simbolo
          const storyPts = calcStoryPoints(payout, line.matchCount);
          const newStory = addSymbolStoryPoints(line.symbol, storyPts);
          if (newStory && !unlockedThisSpin.find(u => u.symbol === line.symbol && u.text === newStory.text)) {
            unlockedThisSpin.push({ symbol: line.symbol, hint: newStory });
          }
        }
      });
      // Mostra storie sbloccate sopra il log
      unlockedThisSpin.forEach(u => {
        const FILE_MAP = { oillamp:"oil-lamp", canopic_jar:"canopic-jar",
          cloth_fine:"cloth_fine", cloth_linen:"cloth_linen", cloth_rough:"cloth-rough", cloth_royal:"cloth-royal",
          sandal_fine:"sandal_fine", sandal_gold:"sandal_gold", sandal_leather:"sandal_leather", sandal_papyrus:"sandal_papyrus",
          bowl_wood:"bowl-wood", bowl_ceramic:"bowl-ceramic", bowl_alabaster:"bowl-alabaster", bowl_gold:"bowl-gold",
          drink_water:"drink-water", drink_beer:"drink-beer", drink_wine:"drink-wine", drink_nectar:"drink-nectar",
          bread_ritual:"bread-ritual", tool_scribe:"tool-scribe", jewelry_gold:"jewelry-gold" };
        const iconFile = FILE_MAP[u.hint.symbol] || u.hint.symbol;
        const unlockNum = symbolStoriesUnlocked[u.symbol] || 1;
        const total = getHintsForSymbol(u.symbol).length;
        logMessage(`<span class='log-story-unlock'>Storia sbloccata — ${symName(u.symbol)} (${unlockNum}/${total})</span>`, "story-unlock");
        
        playSound("level");
      });
      // Aggiorna la colonna simboli dopo aver modificato i contatori
      if (unlockedThisSpin.length > 0) updateSymbolList();

      // Punti story per scarab e ouroboros presenti sulle linee vincenti
      const specialPresence = new Set();
      result.winningLines.forEach(line => {
        if (line.hasWild) specialPresence.add("ouroboros");
        if (line.hasScarabMultiplier) specialPresence.add("scarab");
        if (line.hasCoinMultiplier) specialPresence.add("coin");
        if (line.symbol === "pschent") specialPresence.add("pschent");
      });
      specialPresence.forEach(sym => {
        const pts = sym === "pschent" ? 200 : sym === "coin" ? 60 : 40;
        const ns = addSymbolStoryPoints(sym, pts);
        if (ns) {
          logMessage(`<span class="log-story-unlock">Storia sbloccata — ${symName(sym)} (${symbolStoriesUnlocked[sym]}/${getHintsForSymbol(sym).length})</span>`, "story-unlock");
          playSound("level");
          updateSymbolList();
        }
      });
    } else if (hasGemWin) {
      logMessage(`Pietre preziose raccolte`, "bonus");
    }
  } else {
    playRandomLoseSound();
    logMessage(`<span class="log-spininfo">${spinLines} linee  ×${spinBet}  Puntata: ${spinCost} Deben</span>`, "spininfo");

    // Frase ironica dal JSON — usa {name} qualche volta
    const noWinPool = window._noWinMessages || [];
    if (noWinPool.length > 0) {
      const raw = noWinPool[Math.floor(Math.random() * noWinPool.length)];
      const msg = raw.replace(/\{name\}/g, playerName || "mortale");
      logMessage(msg, "lose");
    } else {
      logMessage(`Nessuna vincita`, "lose");
    }
  }

  // Effetti speciali
  result.winningLines.forEach(line => {
    if (line.isSpecialEffect) {
      switch (line.symbol) {
        case "jar":         logMessage(`Vaso Antico: attivato`, "bonus"); break;
        case "hieroglyphs": logMessage(`Geroglifici: trasformazione in corso`, "bonus"); break;
        case "sphinx":      logMessage(`Sfinge: mini-gioco avviato`, "bonus"); break;
        case "pschent":     logMessage(`Pschent: <span class="log-payout">JACKPOT</span>`, "win"); break;
        case "papyrus":     logMessage(`Papiro Sacro: rivelazione in corso`, "bonus"); break;
      }
    }
  });

  if (totalGemPointsThisSpin > 0) {
    gemPoints += totalGemPointsThisSpin; // accumulo gemme qui, non dentro calculateWinnings
    totalScore += totalGemPointsThisSpin; // le pietre contano anche per la classifica
    logMessage(`Pietre raccolte: <span class="log-payout">+${totalGemPointsThisSpin}</span> (totale: ${gemPoints}/100)`, "level");
  }
  // Nota: checkGemBonus() viene chiamato alla fine di applyResult
  // dopo TUTTI gli effetti (jar/papyrus possono aggiungere gemme)

  result.effects.forEach(effect => {
    if (effect === "jar") {
  playJarGame();
}

    if (typeof effect === "object" && effect.type === "transform") {
      setTimeout(() => {
        // Escludi hieroglyphs dal pool per evitare loop ricorsivi
        const pool = getWeightedSymbolPool().filter(s =>
          s.name !== "hieroglyphs" && s.name !== "sphinx" && s.name !== "papyrus"
        );
        const reels = document.querySelectorAll(".reel");
        effect.positions.forEach(({ row, col }) => {
          const symbol = pool[Math.floor(Math.random() * pool.length)];
          const cell = reels[col].children[row];
          cell.dataset.symbol = symbol.name;
          cell.querySelector("img").src = `assets/img/symbols/${symbol.file}`;
          cell.querySelector("img").alt = symbol.name;
        });

        playSound("transform");
        logMessage(ui("hieroglyphsTransformed"), "mystic");

        // Ricalcola vincite post-trasformazione (senza effetti speciali ricorsivi)
        const newGrid = getGridSymbols();
        const newResult = calculateWinnings(newGrid);
        // Applica solo le vincite in monete, non altri effetti speciali
        if (newResult.totalWin > 0) {
          currentCredits += newResult.totalWin;
          totalScore += newResult.totalWin;
          levelXP += newResult.totalWin;
          if (newResult.totalGemPointsThisSpin > 0) gemPoints += newResult.totalGemPointsThisSpin;
          logMessage(`Geroglifici: <span class="log-payout">+${newResult.totalWin} Deben</span>`, "bonus");
          animateWinningSymbols(newResult.winningSymbols);
          highlightWinningLines(newResult.winningLines);
          updateUI();
        } else {
          logMessage(ui("hieroglyphsEmpty"), "info");
        }
      }, 3000);
    }

    if (effect === "sphinx") {
      setTimeout(() => playSphinxGame(), 1000);
      { const ns = addSymbolStoryPoints("sphinx", 60); if (ns) { logMessage(`<span class="log-story-unlock">Storia sbloccata — ${symName("sphinx")} (${symbolStoriesUnlocked["sphinx"]}/${getHintsForSymbol("sphinx").length})</span>`, "story-unlock"); playSound("level"); updateSymbolList(); } }
    }

    if (effect === "market") {
      const prize = 80 + Math.floor(Math.random() * 170);
      setTimeout(() => playMarketGame(prize), 800);
      playSound("bonus");
      { const ns = addSymbolStoryPoints("market", 50); if (ns) { logMessage(`<span class="log-story-unlock">Storia sbloccata — ${symName("market")} (${symbolStoriesUnlocked["market"]}/${getHintsForSymbol("market").length})</span>`, "story-unlock"); playSound("level"); updateSymbolList(); } }
    }

    if (effect === "scale") {
      const prize = 200 + Math.floor(Math.random() * 300);
      setTimeout(() => playAnubiGame(prize), 800);
      { const ns = addSymbolStoryPoints("scale", 60); if (ns) { logMessage(`<span class="log-story-unlock">Storia sbloccata — ${symName("scale")} (${symbolStoriesUnlocked["scale"]}/${getHintsForSymbol("scale").length})</span>`, "story-unlock"); playSound("level"); updateSymbolList(); } }
    }

    if (typeof effect === "object" && effect.type === "papyrus_bonus") {
      const choice = Math.floor(Math.random() * 3);
      if (choice === 0) {
        const coins = 50 + Math.floor(Math.random() * 151);
        currentCredits += coins;
        logMessage(`Papiro: +${coins} Deben`, "bonus");
        playSound("bonus");
      } else if (choice === 1) {
        const gems = 10 + Math.floor(Math.random() * 291);
        gemPoints += gems;
        logMessage(`Papiro: +${gems} Pietre Preziose`, "bonus");
        playSound("bonus");
      } else {
        const consolation = 10 + Math.floor(Math.random() * 30);
        gemPoints += consolation;
        logMessage(`Papiro: oscuro. +${consolation} Pietre come conforto`, "bonus");
        playSound("bonus");
      }
    }

    // ── PENALITÀ ROBUSTE ──

    // Mummy: una sola penalità percentuale (la più alta trovata nello spin)
    if (typeof effect === "object" && effect.type === "mummy_penalty") {
      const amount = Math.floor(currentCredits * effect.rate);
      currentCredits = Math.max(0, currentCredits - amount);
      logMessage(`Mummia: <span class="log-penalty">-${amount} Deben</span> (${Math.round(effect.rate*100)}% dei crediti)`, "curse");
      playSound("ghost");
      { const ns = addSymbolStoryPoints("mummy", 80); if (ns) { logMessage(`<span class="log-story-unlock">Storia sbloccata — ${symName("mummy")} (${symbolStoriesUnlocked["mummy"]}/${getHintsForSymbol("mummy").length})</span>`, "story-unlock"); playSound("level"); updateSymbolList(); } }
    }

    // Skull come simbolo base (3×skull): dimezza i crediti correnti
    if (typeof effect === "object" && effect.type === "skull_base_penalty") {
      const amount = Math.floor(currentCredits / 2);
      currentCredits = Math.max(0, currentCredits - amount);
      logMessage(`Teschio: Deben dimezzati — <span class="log-penalty">-${amount} Deben</span>`, "curse");
      playSound("ghost");
      { const ns = addSymbolStoryPoints("skull", 80); if (ns) { logMessage(`<span class="log-story-unlock">Storia sbloccata — ${symName("skull")} (${symbolStoriesUnlocked["skull"]}/${getHintsForSymbol("skull").length})</span>`, "story-unlock"); playSound("level"); updateSymbolList(); } }
    }

    // Skull come presenza su linea vincente (già dimezzato nel payout)
    if (typeof effect === "object" && effect.type === "skull_penalty") {
      logMessage(`Teschio (linea ${effect.lineIndex + 1}): premio <span class="log-penalty">dimezzato</span>`, "curse");
      playSound("scrapper");
    }

    // Curse: sottrae deben fissi, scala con count e bet
    if (typeof effect === "object" && effect.type === "curse_penalty") {
      const base = [0, 0, 0, 30, 70, 140, 280][Math.min(effect.count, 6)];
      const amount = base * currentBet;
      currentCredits = Math.max(0, currentCredits - amount);
      logMessage(`Maledizione: <span class="log-penalty">-${amount} Deben</span>`, "curse");
      playSound("ghost");
      { const ns = addSymbolStoryPoints("curse", 80); if (ns) { logMessage(`<span class="log-story-unlock">Storia sbloccata — ${symName("curse")} (${symbolStoriesUnlocked["curse"]}/${getHintsForSymbol("curse").length})</span>`, "story-unlock"); playSound("level"); updateSymbolList(); } }
    }

    // Spirit: azzera i free spin
    if (typeof effect === "object" && effect.type === "spirit_penalty") {
      const lost = freeSpinsRemaining;
      freeSpinsRemaining = 0;
      if (lost > 0) {
        logMessage(`Spirito Maligno: <span class="log-penalty">${lost} giri gratuiti persi</span>`, "curse");
      } else {
        logMessage(`Spirito Maligno: nessun giro da sottrarre`, "curse");
      }
      playSound("ghost");
      { const ns = addSymbolStoryPoints("spirit", 80); if (ns) { logMessage(`<span class="log-story-unlock">Storia sbloccata — ${symName("spirit")} (${symbolStoriesUnlocked["spirit"]}/${getHintsForSymbol("spirit").length})</span>`, "story-unlock"); playSound("level"); updateSymbolList(); } }
    }
  });

  const levelsGained = Math.floor(levelXP / pointsPerLevel);
  if (levelsGained > 0) {
    currentLevel += levelsGained;
    levelXP = levelXP % pointsPerLevel;
    const newClass = getSocialStatus(currentLevel);
    logMessage(
      `<span class="log-levelup">LIVELLO ${currentLevel}</span><span class="log-levelup-class">${newClass}</span>`,
      "levelup"
    );
    playSound("level");
  }

  if (currentCredits <= 0) {
    playSound("gameover");
    spinButton.disabled = true;
    betPlus.disabled  = true;
    betMinus.disabled = true;
    setTimeout(() => showGameOver(), 1200);
  }

  // Controlla bonus gemme DOPO tutti gli effetti
  checkGemBonus();

  animateWinningSymbols(result.winningSymbols);
  highlightWinningLines(result.winningLines);

  // Auto-adjust bet SOLO ora, dopo che la vincita è stata applicata
  if (currentBet > 1 && getBetCost() > currentCredits) {
    while (currentBet > 1 && getBetCost() > currentCredits) currentBet--;
  }

  // Controlla record mondiale
  checkWorldRecord();

  updateUI();
}

function checkGemBonus() {
  if (gemPoints >= GEM_BONUS_THRESHOLD) {
    const stacks = Math.floor(gemPoints / GEM_BONUS_THRESHOLD);
    const bonus = stacks * GEM_BONUS_AMOUNT;
    currentCredits += bonus;
    gemPoints %= GEM_BONUS_THRESHOLD;
    logMessage(`Tesoro del Tempio: <span class="log-payout">+${bonus} Deben</span> dalle pietre`, "bonus");
    playSound("bonus");
  }
}


function animateNumberChange(id, newValue) {
  const el = document.getElementById(id);
  const oldValue = parseInt(el.textContent) || 0;
  const diff = newValue - oldValue;
  if (diff === 0) return;

  el.classList.remove('number-animated'); // reset in caso di rapid update
  void el.offsetWidth; // forzatura repaint per riattivare l’animazione

  let current = oldValue;
  const steps = 20;
  const increment = diff / steps;
  let step = 0;

  const interval = setInterval(() => {
    step++;
    current += increment;
    el.textContent = Math.round(current);
    if (step >= steps) {
      clearInterval(interval);
      el.textContent = newValue;
    }
  }, 20);

  el.classList.add('number-animated');
}







// ═══════════════════════════════════════════════════════
// INTRO SCREEN
// ═══════════════════════════════════════════════════════
(function() {
  const introScreen  = document.getElementById("introScreen");
  const introInput   = document.getElementById("introNameInput");
  const introBtn     = document.getElementById("introStartBtn");

  introInput.addEventListener("input", () => {
    introBtn.disabled = introInput.value.trim().length < 2;
  });

  introInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !introBtn.disabled) startGame();
  });

  introBtn.addEventListener("click", startGame);

  function startGame() {
    const name = introInput.value.trim();
    if (name.length < 2) return;
    playerName = name;
    const nameDisplay = document.getElementById("playerNameDisplay");
    if (nameDisplay) nameDisplay.textContent = name;
    const devTools = document.getElementById("devTools");
    if (devTools) {
      devTools.style.display = name.toLowerCase().startsWith("developer") ? "flex" : "none";
    }
    const gameInput = document.getElementById("playerNameInput");
    if (gameInput) gameInput.value = name;
    introScreen.classList.remove("visible");
    setTimeout(() => { introScreen.classList.add("hidden"); }, 700);
    startBgMusic();

    // Messaggi di benvenuto — dal JSON, con {name}, {recordName}, {recordScore}
    const welcomePool = (window._welcomeMessages && window._welcomeMessages.length > 0)
      ? window._welcomeMessages
      : [["Il Nilo ti ha scelto.", "Il tempio attende.", "Inizia a giocare."]];

    const rawPicked = welcomePool[Math.floor(Math.random() * welcomePool.length)];
    const recName  = worldRecord.score > 0 ? worldRecord.name  : "nessuno ancora";
    const recScore = worldRecord.score > 0 ? worldRecord.score.toLocaleString() : "0";
    const picked = rawPicked.map(line =>
      line
        .replace(/\{name\}/g, `<strong>${name}</strong>`)
        .replace(/\{recordName\}/g, `<strong>${recName}</strong>`)
        .replace(/\{recordScore\}/g, `<strong>${recScore}</strong>`)
    );

    setTimeout(() => {
      const msgBox = document.getElementById("winMessage");
      if (!msgBox) return;
      msgBox.innerHTML = "";
      picked.forEach((line, i) => {
        setTimeout(() => {
          const p = document.createElement("p");
          p.className = "log-entry mystic";
          p.style.opacity = "0";
          p.style.transition = "opacity 0.6s ease";
          p.innerHTML = line;
          msgBox.appendChild(p);
          requestAnimationFrame(() => requestAnimationFrame(() => { p.style.opacity = "1"; }));
        }, i * 600);
      });
    }, 800);
  }
})();


// ═══════════════════════════════════════════════════════
// PAPIRO DELLE STORIE
// ═══════════════════════════════════════════════════════
let _papyrusActiveFilter = null;

function openPapyrusBook() {
  const modal = document.getElementById('papyrusBookModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  _buildPapyrusBook();
}

function closePapyrusBook() {
  document.getElementById('papyrusBookModal').classList.add('hidden');
}

function _buildPapyrusBook() {
  const inner = document.getElementById('papyrusBookInner');
  if (!inner) return;

  const FILE_MAP = { oillamp:"oil-lamp", canopic_jar:"canopic-jar",
      cloth_fine:"cloth_fine", cloth_linen:"cloth_linen", cloth_rough:"cloth-rough", cloth_royal:"cloth-royal",
      sandal_fine:"sandal_fine", sandal_gold:"sandal_gold", sandal_leather:"sandal_leather", sandal_papyrus:"sandal_papyrus",
      bowl_wood:"bowl-wood", bowl_ceramic:"bowl-ceramic", bowl_alabaster:"bowl-alabaster", bowl_gold:"bowl-gold",
      drink_water:"drink-water", drink_beer:"drink-beer", drink_wine:"drink-wine", drink_nectar:"drink-nectar",
      bread_ritual:"bread-ritual", tool_scribe:"tool-scribe", jewelry_gold:"jewelry-gold" };

  // Simboli attivi — solo storie sbloccate
  const activeSyms = getSymbolsForCurrentLevel().map(s => s.name);
  const bySymbol = {};
  activeSyms.forEach(sym => {
    const tutteFragasi = mysteriousHints.filter(h => h.symbol === sym);
    const numUnlocked = symbolStoriesUnlocked[sym] || 0;
    const frasi = tutteFragasi.slice(0, numUnlocked);
    if (frasi.length > 0) bySymbol[sym] = frasi;
  });
  const symsWithStories = Object.keys(bySymbol);
  const totalUnlocked = Object.values(symbolStoriesUnlocked).reduce((a, b) => a + b, 0);
  const totalAll = mysteriousHints.length;

  if (!_papyrusActiveFilter || !bySymbol[_papyrusActiveFilter]) {
    _papyrusActiveFilter = symsWithStories[0] || null;
  }

  inner.innerHTML = '';

  // Contatore
  const ctr = document.createElement('div');
  ctr.style.cssText = `font-family:"Syne Mono",monospace;font-size:13px;color:${document.body.classList.contains('dark') ? 'rgba(255,255,255,0.5)' : '#9a7040'};margin-bottom:28px;`;
  ctr.textContent = totalUnlocked + ' storie sbloccate su ' + totalAll;
  inner.appendChild(ctr);

  const layout = document.createElement('div');
  layout.style.cssText = 'display:flex;gap:32px;align-items:flex-start;';

  // ── SIDEBAR ──
  const sidebar = document.createElement('div');
  sidebar.style.cssText = 'min-width:190px;max-width:200px;position:sticky;top:20px;display:flex;flex-direction:column;gap:4px;flex-shrink:0;';

  const sideTitle = document.createElement('div');
  sideTitle.style.cssText = `font-family:Cinzel,serif;font-size:11px;color:${document.body.classList.contains('dark') ? 'rgba(255,255,255,0.5)' : '#9a7040'};letter-spacing:0.12em;margin-bottom:8px;text-transform:uppercase;`;
  sideTitle.textContent = 'Capitoli';
  sidebar.appendChild(sideTitle);

  symsWithStories.forEach(sym => {
    const isActive = sym === _papyrusActiveFilter;
    const iconFile = FILE_MAP[sym] || sym;
    const btn = document.createElement('button');
    btn.style.cssText = 'display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:6px;border:1px solid ' + (isActive ? '#c4881a' : '#d4b87055') + ';background:' + (isActive ? '#c4881a' : 'transparent') + ';cursor:pointer;text-align:left;width:100%;transition:all 0.15s;';
    btn.innerHTML = `<img src="assets/img/symbols/${iconFile}.png" style="width:22px;height:22px;object-fit:contain;flex-shrink:0;"><span style="font-family:Cinzel,serif;font-size:11px;color:${isActive ? '#fff' : (document.body.classList.contains('dark') ? 'rgba(255,255,255,0.75)' : '#5a2800')};line-height:1.2;">${symName(sym)}</span>`;
    btn.onclick = () => { _papyrusActiveFilter = sym; _buildPapyrusBook(); };
    sidebar.appendChild(btn);
  });

  // ── PAGINA BIANCA ──
  const page = document.createElement('div');
  page.style.cssText = `flex:1;background:${document.body.classList.contains('dark') ? 'rgb(33,39,58)' : '#ffffff'};border-radius:4px;box-shadow:0 4px 24px rgba(0,0,0,0.2);padding:52px 56px;min-height:600px;`;

  if (!_papyrusActiveFilter || !bySymbol[_papyrusActiveFilter]) {
    page.innerHTML = '<p style="color:#9a7040;font-style:italic;">Nessuna storia disponibile.</p>';
  } else {
    const frasi = bySymbol[_papyrusActiveFilter];
    const iconFile2 = FILE_MAP[_papyrusActiveFilter] || _papyrusActiveFilter;

    // Titolo capitolo
    const titleDiv = document.createElement('div');
    titleDiv.style.cssText = 'display:flex;align-items:center;gap:18px;margin-bottom:36px;padding-bottom:20px;border-bottom:2px solid #c4a55a;';
    titleDiv.innerHTML = `<img src="assets/img/symbols/${iconFile2}.png" style="width:60px;height:60px;object-fit:contain;"><div><div style="font-family:Cinzel,serif;font-size:26px;color:${document.body.classList.contains('dark') ? '#e8e0d0' : '#3d1a00'};font-weight:700;">${symName(_papyrusActiveFilter)}</div><div style="font-family:Syne Mono,monospace;font-size:12px;color:${document.body.classList.contains('dark') ? 'rgba(255,255,255,0.45)' : '#9a7040'};margin-top:4px;">${frasi.length} ${frasi.length === 1 ? 'storia' : 'storie'}</div></div>`;
    page.appendChild(titleDiv);

    // Frasi
    frasi.forEach((h, i) => {
      const p = document.createElement('div');
      p.style.cssText = 'margin-bottom:32px;';
      p.innerHTML = `<div style="font-family:Syne Mono,monospace;font-size:11px;color:${document.body.classList.contains('dark') ? 'rgba(196,165,90,0.7)' : '#c4a55a'};letter-spacing:0.12em;margin-bottom:8px;">§ ${i+1}</div><div style="font-family:Syne Mono,monospace;font-size:17px;color:${document.body.classList.contains('dark') ? '#e8e0d0' : '#1a0a00'};line-height:1.85;">${h.text}</div>`;
      page.appendChild(p);
    });
  }

  layout.appendChild(sidebar);
  layout.appendChild(page);
  inner.appendChild(layout);
}

// ═══════════════════════════════════════════════════════
// GAME OVER SCREEN
// ═══════════════════════════════════════════════════════
function showGameOver() {
  const screen = document.getElementById("gameOverScreen");
  screen.style.opacity = "0";
  screen.classList.remove("hidden");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      screen.style.opacity = "1";
    });
  });

  document.getElementById("go-name").textContent  = playerName || ui("anonymous");
  document.getElementById("go-score").textContent = totalScore.toLocaleString();
  document.getElementById("go-level").textContent = currentLevel;
  document.getElementById("go-class").textContent = getSocialStatus(currentLevel);
  document.getElementById("go-gems").textContent  = gemPoints;

  // Quote gameover — caricate dal JSON
  if (window._gameoverQuotes && window._gameoverQuotes.length > 0) {
    const q = window._gameoverQuotes[Math.floor(Math.random() * window._gameoverQuotes.length)];
    document.getElementById("go-quote").textContent = q;
  }

  // Salva e mostra leaderboard
  async function saveAndShowLeaderboard() {
    const list = document.getElementById("go-lb-list");
    list.innerHTML = "<div style='color:#9a7040;font-size:13px;text-align:center;padding:10px;'>Caricamento...</div>";

    const entry = {
      name: playerName || ui("anonymous"),
      score: totalScore,
      level: currentLevel,
      socialClass: getSocialStatus(currentLevel),
    };

    // Developer non va in classifica
    if (playerName.toLowerCase().startsWith("developer")) {
      renderLeaderboard([]);
      return;
    }

    try {
      await fetch(LEADERBOARD_API + "/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      const res = await fetch(LEADERBOARD_API + "/leaderboard");
      const scores = await res.json();
      // Aggiorna record mondiale con i dati freschi
      if (scores && scores.length > 0) {
        worldRecord = { name: scores[0].name, score: scores[0].score };
        updateTickerRecord();
      }
      renderLeaderboard(scores.slice(0, 10));
    } catch(e) {
      list.innerHTML = "<div style='color:#9a7040;font-size:13px;text-align:center;padding:10px;'>Leaderboard non disponibile.</div>";
    }
  }

  function renderLeaderboard(top10) {
    const list = document.getElementById("go-lb-list");
    list.innerHTML = "";
    const medals = ["gold","silver","bronze"];
    top10.forEach((entry, i) => {
      const row = document.createElement("div");
      row.className = "go-lb-row";
      const rankClass = medals[i] || "";
      row.innerHTML = `
        <span class="go-lb-rank ${rankClass}">${i === 0 ? '<span class="material-icons" style="font-size:18px;color:#ffd11d">military_tech</span>' : i + 1}</span>
        <span class="go-lb-name">${entry.name}</span>
        <span class="go-lb-score"><span class="material-icons" style="font-size:14px;vertical-align:middle;color:#fbd06a">grain</span> ${entry.score.toLocaleString()}</span>
        <span class="go-lb-level"><span class="material-icons" style="font-size:13px;vertical-align:middle;opacity:0.7">military_tech</span> ${entry.socialClass || ""} Lv${entry.level}</span>
      `;
      list.appendChild(row);
    });
  }

  saveAndShowLeaderboard();
}

function openClassifica() {
  const modal = document.getElementById("classificaModal");
  modal.classList.add("visible");
  const list = document.getElementById("cl-list");
  list.innerHTML = "<div class='cl-empty'>Caricamento...</div>";
  fetch(LEADERBOARD_API + "/leaderboard")
    .then(r => r.json())
    .then(scores => {
      if (!scores.length) {
        list.innerHTML = "<div class='cl-empty'>Nessun faraone ancora registrato.</div>";
        return;
      }
      list.innerHTML = "";
      const medals = ["gold","silver","bronze"];
      scores.slice(0,10).forEach((e, i) => {
        const row = document.createElement("div");
        row.className = "cl-row";
        row.innerHTML = `
          <span class="cl-rank ${medals[i]||''}">${i===0?'<span class="material-icons" style="font-size:18px;color:#ffd11d">military_tech</span>':i+1}</span>
          <span class="cl-name">${e.name}</span>
          <span class="cl-score"><span class="material-icons" style="font-size:14px;vertical-align:middle;color:#fbd06a">grain</span> ${e.score.toLocaleString()}</span>
          <span class="cl-class"><span class="material-icons" style="font-size:13px;vertical-align:middle;opacity:0.7">military_tech</span> ${e.socialClass||""} Lv${e.level}</span>
        `;
        list.appendChild(row);
      });
    })
    .catch(() => {
      list.innerHTML = "<div class='cl-empty'>Classifica non disponibile.</div>";
    });
}

function closeClassifica() {
  document.getElementById("classificaModal").classList.remove("visible");
}


// ════════════════════════════════════════════════════
// MERCATO DEL NILO — Lv1+ 
// Scegli tra 3 bancarelle: grano, pesce o vaso vuoto
// ════════════════════════════════════════════════════
function playMarketGame(prize) {
  const modal = document.getElementById("marketModal");
  const stalls = document.getElementById("marketStalls");
  const result = document.getElementById("marketResult");
  const desc   = document.getElementById("marketDesc");
  const btns   = document.getElementById("marketButtons");

  spinButton.disabled = true;
  betPlus.disabled = true;
  betMinus.disabled = true;

  const rewards = [
    { type: "grano",  icon: "wheat.png",      label: "Grano",      value: prize,           msg: `🌾 Hai trovato Grano! +${prize} Deben` },
    { type: "pesce",  icon: "fish.png",        label: "Pesce",      value: Math.floor(prize*0.5), msg: `🐟 Hai trovato Pesce. +${Math.floor(prize*0.5)} Deben` },
    { type: "vuoto",  icon: "canopic-jar.png", label: "Vaso vuoto", value: 0,               msg: `🏺 Il vaso è vuoto... nessuna ricompensa.` },
  ];

  // Scegli 3 simboli normali del livello
  
  const allGems_m2 = ["copper","onyx","ruby","sapphire","amethyst","emerald","topaz","diamond","gold","meteorite"];
  const allDiv_m2  = ["ra","osiris","isis","horus","anubis","thoth","hathor","seth","bastet","udjat","pharaoh","nefertiti","bes","taweret","khnum","sobek","neith","sekhmet","ptah","nut","amon","khonsu","cleopatra"];
  const allSpc_m2  = ["skull","scarab","ouroboros","jar","hieroglyphs","mummy","coin","sphinx","papyrus","pschent","market","scale"];
  const normPool = getSymbolsForCurrentLevel().filter(s =>
    !allGems_m2.includes(s.name) && !allDiv_m2.includes(s.name) && !allSpc_m2.includes(s.name)
  ).sort(() => Math.random() - 0.5).slice(0, 3);

  // Usa payout x3 come valore di riferimento
  const stallRewards = normPool.map(s => {
    const val = (payoutTable[s.name] && payoutTable[s.name][3]) ? payoutTable[s.name][3] * currentBet : 20;
    return { icon: s.file, name: s.name, label: symName(s.name) || s.name, value: val };
  });

  desc.textContent = ui("marketDesc");
  result.textContent = "";
  btns.innerHTML = "";
  stalls.innerHTML = "";
  modal.classList.remove("hidden");

  stallRewards.forEach((item, i) => {
    const stall = document.createElement("div");
    stall.className = "market-stall";
    stall.innerHTML = `
      <img src="assets/img/symbols/basket.png" alt="cesto" id="stall-img-${i}">
      <span class="market-stall-label">Cesto ${i+1}</span>
    `;
    stall.onclick = () => {
      // Rivela tutti i cesti con simbolo e valore
      stallRewards.forEach((r, j) => {
        const img = document.getElementById(`stall-img-${j}`);
        if (img) img.src = `assets/img/symbols/${r.icon}`;
        const s = stalls.children[j];
        // Aggiungi etichetta valore
        const valLabel = document.createElement("span");
        valLabel.style.cssText = "font-size:13px;font-weight:bold;color:" + (j===i?"#2a6030":"#8a6030") + ";";
        valLabel.textContent = "+" + r.value + " Deben";
        s.appendChild(valLabel);
        if (j === i) s.classList.add("win-stall");
        else s.classList.add("revealed");
      });

      const chosen = stallRewards[i];
      currentCredits += chosen.value;
      totalScore += chosen.value;
      levelXP += chosen.value;
      playSound("bonus");
      result.textContent = `${chosen.label}! +${chosen.value} Deben`;
      updateUI();
      btns.innerHTML = `<button class="market-btn" onclick="closeMarket()">Continua</button>`;
    };
    stalls.appendChild(stall);
  });
}


// ════════════════════════════════════════════════════
// VASO ANTICO — Scegli 3 vasi su 5
// ════════════════════════════════════════════════════
function playJarGame() {
  const modal   = document.getElementById("jarModal");
  const vasesEl = document.getElementById("jarVases");
  const totalEl = document.getElementById("jarTotal");
  const contBtn = document.getElementById("jarContinueBtn");
  const revealEl = document.getElementById("jarReveal");

  spinButton.disabled = true;
  betPlus.disabled = true;
  betMinus.disabled = true;

  // Genera 5 premi casuali
  const allPrizes = [
    { type:"deben",  value: 50  + Math.floor(Math.random()*200), label:"Deben",          cls:"bonus-vase",   icon:"wheat.png" },
    { type:"deben",  value: 20  + Math.floor(Math.random()*80),  label:"Deben",          cls:"bonus-vase",   icon:"copper.png" },
    { type:"spins",  value: 1   + Math.floor(Math.random()*4),   label:"Giri del Destino", cls:"neutral-vase", icon:"ouroboros.png" },
    { type:"gems",   value: 15  + Math.floor(Math.random()*60),  label:"Pietre Preziose", cls:"bonus-vase",   icon:"onyx.png" },
    { type:"curse",  value: 50, label:"Maledizione", cls:"curse-vase", icon:"maledizione.png" },
  ].sort(() => Math.random() - 0.5);

  let chosen = 0;
  let totalDeben = 0;
  let totalGems  = 0;
  let totalSpins = 0;
  let totalCurse = 0;

  vasesEl.innerHTML = "";
  totalEl.textContent = "";
  revealEl.style.display = "none";
  contBtn.classList.add("hidden");
  modal.classList.remove("hidden");
  playSound("jar");

  allPrizes.forEach((prize, i) => {
    const vase = document.createElement("div");
    vase.className = "jar-vase";
    vase.innerHTML = `
      <img src="assets/img/symbols/jar.png" alt="vaso">
      <span class="jar-vase-label">Vaso ${i+1}</span>
    `;
    vase.onclick = () => {
      if (chosen >= 3) return;
      chosen++;

      // Anima apertura
      vase.classList.add("opened", prize.cls);
      vase.querySelector("img").src = `assets/img/symbols/${prize.icon}`;
      const valSpan = document.createElement("span");
      valSpan.className = "jar-vase-value";

      // Applica effetto
      if (prize.type === "deben") {
        currentCredits += prize.value;
        totalScore += prize.value;
        levelXP += prize.value;
        totalDeben += prize.value;
        valSpan.textContent = `+${prize.value} Deben`;
        valSpan.style.color = "#2a6030";
        playSound("win");
      } else if (prize.type === "spins") {
        freeSpinsRemaining += prize.value;
        totalSpins += prize.value;
        valSpan.textContent = `+${prize.value} Giri`;
        valSpan.style.color = "#1a3a7a";
        playSound("bonus");
      } else if (prize.type === "gems") {
        gemPoints += prize.value;
        totalGems += prize.value;
        valSpan.textContent = `+${prize.value} Pietre`;
        valSpan.style.color = "#1a7a3a";
        playSound("bonus");
      } else if (prize.type === "curse") {
        currentCredits = Math.max(0, currentCredits - prize.value);
        totalCurse += prize.value;
        valSpan.innerHTML = `<span style="font-size:11px;display:block;color:#8b2010;">Maledizione</span>-${prize.value} Deben`;
        valSpan.style.color = "#8b2010";
        playSound("audioLose2");
      }

      vase.appendChild(valSpan);
      updateUI();

      // Aggiorna totale
      const JAR_INTROS = [
        "Il Nilo ha depositato i suoi doni ai tuoi piedi.",
        "Gli dei hanno ascoltato la tua offerta.",
        "Il destino ti sorride questa volta, mortale.",
        "Le acque sacre del Nilo ti rivelano i loro segreti.",
        "Osiride ha giudicato il tuo cuore degno.",
      ];
      const JAR_CURSE = [
        "Ma un vaso custodiva l'ira degli dei — la maledizione ti ha sfiorato.",
        "Eppure Seth ha lasciato il suo segno — un vaso era avvelenato.",
        "Non tutto il Nilo è benedetto — un vaso portava la maledizione di Apep.",
        "Gli dei danno e gli dei tolgono — un vaso era oscuro.",
      ];
      const JAR_ONLY_CURSE = [
        "La maledizione di Seth ti ha colpito. Impara dalla caduta.",
        "Apep si nascondeva nei vasi. Il deserto non è sempre generoso.",
        "Gli dei ti mettono alla prova. Questa volta hai perso.",
      ];

      if (chosen < 3) {
        totalEl.textContent = chosen === 2
          ? "Un ultimo vaso da aprire..."
          : `Scegli ancora ${3 - chosen} vasi tra i misteri del Nilo...`;
      } else {
        let msg = "";
        let hasPrize = totalDeben > 0 || totalSpins > 0 || totalGems > 0;
        let prizes = [];
        if (totalDeben > 0) prizes.push(`${totalDeben} Deben di rame`);
        if (totalSpins > 0) prizes.push(`${totalSpins} Giri del Destino`);
        if (totalGems  > 0) prizes.push(`${totalGems} Pietre Preziose del Nilo`);

        if (hasPrize && totalCurse > 0) {
          msg = JAR_INTROS[Math.floor(Math.random()*JAR_INTROS.length)];
          msg += ` ${prizes.join(", ")}. `;
          msg += JAR_CURSE[Math.floor(Math.random()*JAR_CURSE.length)];
          msg += ` -${totalCurse} Deben.`;
        } else if (hasPrize) {
          msg = JAR_INTROS[Math.floor(Math.random()*JAR_INTROS.length)];
          msg += ` ${prizes.join(", ")}.`;
        } else {
          msg = JAR_ONLY_CURSE[Math.floor(Math.random()*JAR_ONLY_CURSE.length)];
          msg += ` -${totalCurse} Deben.`;
        }
        totalEl.textContent = msg;
      }

      // Dopo 3 scelte mostra pulsante continua
      if (chosen >= 3) {
        // Rivela i 2 rimasti
        document.querySelectorAll(".jar-vase:not(.opened)").forEach(v => {
          v.classList.add("opened", "neutral-vase");
          v.style.opacity = "0.4";
        });
        contBtn.classList.remove("hidden");
        checkGemBonus();
      }
    };
    vasesEl.appendChild(vase);
  });

  totalEl.textContent = ui("chooseJar");
}

function closeJar() {
  document.getElementById("jarModal").classList.add("hidden");
  spinButton.disabled = false;
  betPlus.disabled = false;
  betMinus.disabled = false;
}

function closeMarket() {
  document.getElementById("marketModal").classList.add("hidden");
  spinButton.disabled = false;
  betPlus.disabled = false;
  betMinus.disabled = false;
}

// ════════════════════════════════════════════════════
// GIUDIZIO DI ANUBI — Lv5+
// Scegli il simbolo con il valore più alto
// ════════════════════════════════════════════════════
function playAnubiGame(prize) {
  const modal = document.getElementById("anubiModal");
  const cards  = document.getElementById("anubiCards");
  const result = document.getElementById("anubiResult");
  const desc   = document.getElementById("anubiDesc");
  const btns   = document.getElementById("anubiButtons");

  spinButton.disabled = true;
  betPlus.disabled = true;
  betMinus.disabled = true;

  // Pool solo divinità e faraoni — il Giudizio è riservato ai potenti
  const pool = [
    { name:"Amon",      file:"amon.png",       value:12 },
    { name:"Ra",        file:"ra.png",         value:11 },
    { name:"Osiride",   file:"osiris.png",      value:11 },
    { name:"Iside",     file:"isis.png",        value:10 },
    { name:"Horus",     file:"horus.png",       value: 9 },
    { name:"Anubi",     file:"anubis.png",      value: 8 },
    { name:"Thoth",     file:"thoth.png",       value: 7 },
    { name:"Hathor",    file:"hathor.png",      value: 6 },
    { name:"Bastet",    file:"bastet.png",      value: 5 },
    { name:"Seth",      file:"seth.png",        value: 4 },
    { name:"Udjat",     file:"udjat.png",       value: 3 },
    { name:"Faraone",   file:"pharaoh.png",     value: 2 },
    { name:"Nefertiti", file:"nefertiti.png",   value: 2 },
    { name:"Cleopatra", file:"cleopatra.png",   value: 1 },
  ];

  // Pesca 3 simboli casuali distinti
  const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
  const maxVal = Math.max(...shuffled.map(s => s.value));
  const winner = shuffled.find(s => s.value === maxVal);

  desc.textContent = ui("anubiDesc");
  result.textContent = "";
  btns.innerHTML = "";
  cards.innerHTML = "";
  modal.classList.remove("hidden");

  shuffled.forEach((sym, i) => {
    const card = document.createElement("div");
    card.className = "anubi-card";
    card.innerHTML = `
      <img src="assets/img/symbols/${sym.file}" alt="${sym.name}">
      <span class="anubi-card-name">${sym.name}</span>
    `;
    card.onclick = () => {
      // Rivela valori
      shuffled.forEach((s, j) => {
        const c = cards.children[j];
        c.classList.add("revealed");
        c.innerHTML += `<span class="anubi-card-value">${s.value}</span>`;
        if (s.value === maxVal) c.classList.add("win-card");
        else c.classList.add("lose-card");
      });

      const chosen = shuffled[i];
      const win = chosen.value === maxVal;

      if (win) {
        currentCredits += prize;
        totalScore += prize;
        levelXP += prize;
        result.textContent = `✅ La bilancia pende dalla tua parte! +${prize} Deben`;
        if (prize >= 400)      playSound("win3");
        else if (prize >= 250) playSound("win2");
        else                   playSound("win");
      } else {
        result.textContent = `❌ Anubi non approva. Nessun premio questa volta.`;
        playSound("sphinxlose");
      }

      updateUI();
      btns.innerHTML = `<button class="anubi-btn" onclick="closeAnubi()">Il destino è compiuto</button>`;
    };
    cards.appendChild(card);
  });
}

function closeAnubi() {
  document.getElementById("anubiModal").classList.add("hidden");
  spinButton.disabled = false;
  betPlus.disabled = false;
  betMinus.disabled = false;
}

function restartGame() {
  // Reset stato
  currentCredits = 250;
  totalScore     = 0;
  gemPoints      = 0;
  currentBet     = 1;
  currentLevel   = 1;
  levelXP        = 0;
  freeSpinsRemaining = 0;
  isSpinning     = false;
  _recordBeaten  = false;

  document.getElementById("gameOverScreen").classList.add("hidden");
  document.getElementById("winMessage").innerHTML = "";
  // Resetta display nome
  const nd = document.getElementById("playerNameDisplay");
  if (nd) nd.textContent = "—";
  playerName = "";
  spinButton.disabled = false;
  betPlus.disabled  = false;
  betMinus.disabled = false;

  generateReels();
  updateUI();

  // Mostra di nuovo l'intro per inserire nome
  const introScreen = document.getElementById("introScreen");
  introScreen.classList.remove("hidden", "visible");
  // Reset campo nome
  const introInput = document.getElementById("introNameInput");
  if (introInput) { introInput.value = ""; }
  const introBtn = document.getElementById("introStartBtn");
  if (introBtn) introBtn.disabled = true;
  // Fade in pulito dopo un frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      introScreen.classList.add("visible");
    });
  });
}


// ═══════════════════════════════════════════════════════
// PAYTABLE
// ═══════════════════════════════════════════════════════
function buildPaytable() {
  const container = document.getElementById("paytableInner");
  if (!container) return;
  container.innerHTML = "";

  

  // Categorie simboli aggiornate
  const GEM_SYMBOLS    = ["copper","onyx","ruby","sapphire","amethyst","emerald","topaz","diamond","gold","meteorite"];
  const DIVINE         = ["bes","taweret","khnum","sobek","neith","sekhmet","ptah","nut","amon","khonsu","cleopatra","ra","osiris","isis","horus","anubis","thoth","hathor","seth","bastet","udjat","pharaoh","nefertiti"];
  const PENALTIES      = ["skull","curse","spirit","mummy"];
  const MINIGAMES      = ["market","scale","sphinx","papyrus"];
  const MULTIPLIERS    = ["scarab","coin"];
  const FIXED          = ["ouroboros","pschent"];
  const SPECIALS_LIST  = [...FIXED, ...PENALTIES, ...MINIGAMES, ...MULTIPLIERS];

  const SPECIAL_DESC = {
    ouroboros:  "<em>Wild — Ouroboros</em> — Sostituisce qualsiasi simbolo normale. Può completare o estendere qualsiasi combinazione vincente. Non si combina con Scarabeo o Moneta.",
    pschent:    "<em>Jackpot — Pschent</em> — La Doppia Corona del Faraone. 3×: 2.000 · 4×: 5.000 · 5×: 12.000 · 6×: 50.000 Deben. Il premio più alto del tempio.",
    scarab:     "<em>Moltiplicatore ×2 — Scarabeo</em> — Ogni scarabeo sulla linea raddoppia il premio. Due scarabei = ×4. Non si combina con Wild o Moneta.",
    coin:       "<em>Moltiplicatore ×10 — Moneta</em> — Moltiplica per 10 il premio della linea. Non si combina con Wild o Scarabeo.",
    skull:      "<em>Penalità — Teschio</em> — Se appare sulla tua linea vincente: dimezza il premio di quella linea. Se esce in combo 3×: dimezza tutti i tuoi Deben attuali.",
    curse:      "<em>Penalità — Maledizione</em> — Combo 3×: -30×Bet · 4×: -70×Bet · 5×: -140×Bet · 6×: -280×Bet. Gli dei sottraggono i Deben direttamente.",
    spirit:     "<em>Penalità — Spirito Maligno</em> — Combo 3×: azzera tutti i giri gratuiti accumulati. Se non ne hai, il tempio rimane silenzioso.",
    mummy:      "<em>Penalità — Mummia</em> — Combo 3×: -10% dei crediti · 4×: -20% · 5×: -30% · 6×: -50%. Se escono più combo nello stesso spin, si applica solo la penalità più grave.",
    market:     "<em>Mini-gioco — Mercato del Nilo</em> — Attivo ai livelli bassi. Scegli 1 cesto su 3: ogni cesto nasconde simboli del livello con premi diversi.",
    scale:      "<em>Mini-gioco — Bilancia di Ma'at</em> — Attivo ai livelli medi. Scegli la divinità più potente tra tre: se indovini, vinci il premio.",
    sphinx:     "<em>Mini-gioco — Sfinge</em> — Attivo dai livelli alti. La Sfinge rivela una carta: scegli la tua e prova a batterla. Puoi raddoppiare il premio fino a 3 volte.",
    papyrus:    "<em>Mini-gioco — Papiro Sacro</em> — Rivela un tesoro nascosto: Deben, Pietre Preziose o un piccolo conforto dal Nilo.",
    jar:        "<em>Mini-gioco — Vaso Antico</em> — Scegli 3 vasi su 5. Ogni vaso nasconde: Deben, Giri Gratuiti, Pietre Preziose o una Maledizione.",
  };

  // (filtri per livello spostati sotto, nella sezione paytable completa)

  const GEM_POINTS = {
    copper:4, onyx:8, ruby:14, sapphire:20, amethyst:28,
    emerald:38, topaz:50, diamond:65, gold:85, meteorite:110
  };

  function makeGrid(symbols) {
    const grid = document.createElement("div");
    grid.className = "pt-grid";
    symbols.forEach(s => {
      const isActive = activeNames.has(s.name);
      const payout = payoutTable[s.name];
      const row = document.createElement("div");
      row.className = "pt-row";
      row.style.opacity = isActive ? "1" : "0.4";
      const payStr = payout && payout[3] > 0
        ? "3x <span>" + payout[3] + "</span> &nbsp; 4x <span>" + payout[4] + "</span> &nbsp; 5x <span>" + payout[5] + "</span> &nbsp; 6x <span>" + payout[6] + "</span>"
        : GEM_SYMBOLS.includes(s.name)
          ? "3x <span style='color:#8b2010;font-weight:bold;'>" + GEM_POINTS[s.name] + "</span> &nbsp; 4x <span style='color:#8b2010;font-weight:bold;'>" + Math.round(GEM_POINTS[s.name]*1.6) + "</span> &nbsp; 5x <span style='color:#8b2010;font-weight:bold;'>" + Math.round(GEM_POINTS[s.name]*2.4) + "</span> &nbsp; 6x <span style='color:#8b2010;font-weight:bold;'>" + Math.round(GEM_POINTS[s.name]*3.5) + "</span>"
          : "<span style='color:#8a6030;font-style:italic;'>effetto speciale</span>";
      const activeBadge = isActive ? "<span style='color:#c4a55a;font-size:10px;margin-left:6px;'>● attivo</span>" : "";
      row.innerHTML =
        "<img class='pt-sym-img' src='assets/img/symbols/" + s.file + "' alt='" + s.name + "'>" +
        "<div class='pt-sym-info'>" +
        "<div class='pt-sym-name'>" + symName(s.name) + activeBadge + "</div>" +
        "<div class='pt-sym-payout'>" + payStr + "</div>" +
        "</div>";
      grid.appendChild(row);
    });
    return grid;
  }

  function makeSection(title, symbols) {
    if (!symbols.length) return;
    const t = document.createElement("div");
    t.className = "pt-section-title";
    t.textContent = title;
    container.appendChild(t);
    container.appendChild(makeGrid(symbols));
  }

  // Nota introduttiva come si gioca
  const intro = document.createElement("div");
  intro.style.cssText = `background:${document.body.classList.contains("dark") ? "rgb(33,39,58)" : "#fdfdfd8f"};border-radius:10px;padding:18px 20px;margin-bottom:20px;font-size:16px;color:${document.body.classList.contains("dark") ? "#e8e0d0" : "#5a3010"};line-height:1.8;`;
  intro.innerHTML = `
    <div style="font-family:'Cinzel',serif;font-size:20px;color:#3d1a00;font-weight:bold;margin-bottom:20px;">☥ Come si gioca</div>

    <div style="font-family:'Cinzel',serif;font-size:13px;color:#8a4510;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px;">Le Basi</div>
    <p style="margin-bottom:8px;">Premi <strong>SPIN</strong> per far girare i 6 rulli. Le combinazioni vincenti si formano da <strong>sinistra a destra</strong> su una delle payline attive.</p>
    <p style="margin-bottom:16px;">Servono almeno <strong>3 simboli identici consecutivi</strong> partendo dal primo rullo. Più simboli = premio più alto.</p>

    <div style="font-family:'Cinzel',serif;font-size:13px;color:#8a4510;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px;">Bet e Linee</div>
    <p style="margin-bottom:8px;">Scegli il <strong>Bet</strong> (×1 → ×5) e il numero di <strong>linee attive</strong> (5, 10, 25, 50). Il costo dello spin è mostrato in tempo reale come <em>Costo Spin</em>.</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;font-size:13px;">
      <tr style="background:#c4a55a22;">
        <th style="padding:6px 8px;text-align:left;font-family:'Cinzel',serif;color:#5a2800;border-bottom:1px solid #c4a55a;">Linee</th>
        <th style="padding:6px 8px;text-align:center;font-family:'Cinzel',serif;color:#5a2800;border-bottom:1px solid #c4a55a;">×1</th>
        <th style="padding:6px 8px;text-align:center;font-family:'Cinzel',serif;color:#5a2800;border-bottom:1px solid #c4a55a;">×2</th>
        <th style="padding:6px 8px;text-align:center;font-family:'Cinzel',serif;color:#5a2800;border-bottom:1px solid #c4a55a;">×3</th>
        <th style="padding:6px 8px;text-align:center;font-family:'Cinzel',serif;color:#5a2800;border-bottom:1px solid #c4a55a;">×4</th>
        <th style="padding:6px 8px;text-align:center;font-family:'Cinzel',serif;color:#5a2800;border-bottom:1px solid #c4a55a;">×5</th>
      </tr>
      <tr><td style="padding:5px 8px;border-bottom:1px solid #d4b87033;font-weight:bold;">50 linee</td><td style="padding:5px 8px;text-align:center;border-bottom:1px solid #d4b87033;">10</td><td style="padding:5px 8px;text-align:center;border-bottom:1px solid #d4b87033;">50</td><td style="padding:5px 8px;text-align:center;border-bottom:1px solid #d4b87033;">100</td><td style="padding:5px 8px;text-align:center;border-bottom:1px solid #d4b87033;">250</td><td style="padding:5px 8px;text-align:center;border-bottom:1px solid #d4b87033;">500</td></tr>
      <tr style="background:#c4a55a11;"><td style="padding:5px 8px;border-bottom:1px solid #d4b87033;font-weight:bold;">25 linee</td><td style="padding:5px 8px;text-align:center;border-bottom:1px solid #d4b87033;">5</td><td style="padding:5px 8px;text-align:center;border-bottom:1px solid #d4b87033;">25</td><td style="padding:5px 8px;text-align:center;border-bottom:1px solid #d4b87033;">50</td><td style="padding:5px 8px;text-align:center;border-bottom:1px solid #d4b87033;">125</td><td style="padding:5px 8px;text-align:center;border-bottom:1px solid #d4b87033;">250</td></tr>
      <tr><td style="padding:5px 8px;border-bottom:1px solid #d4b87033;font-weight:bold;">10 linee</td><td style="padding:5px 8px;text-align:center;border-bottom:1px solid #d4b87033;">3</td><td style="padding:5px 8px;text-align:center;border-bottom:1px solid #d4b87033;">12</td><td style="padding:5px 8px;text-align:center;border-bottom:1px solid #d4b87033;">25</td><td style="padding:5px 8px;text-align:center;border-bottom:1px solid #d4b87033;">60</td><td style="padding:5px 8px;text-align:center;border-bottom:1px solid #d4b87033;">125</td></tr>
      <tr style="background:#c4a55a11;"><td style="padding:5px 8px;font-weight:bold;">5 linee</td><td style="padding:5px 8px;text-align:center;">1</td><td style="padding:5px 8px;text-align:center;">5</td><td style="padding:5px 8px;text-align:center;">12</td><td style="padding:5px 8px;text-align:center;">30</td><td style="padding:5px 8px;text-align:center;">70</td></tr>
    </table>
    <p style="margin-bottom:16px;font-size:13px;color:#9a7040;font-style:italic;">Il Bet moltiplica sia il costo che i premi. Esempio: 25 linee × Bet ×3 = 50 Deben di costo, vincite triple.</p>

    <div style="font-family:'Cinzel',serif;font-size:13px;color:#8a4510;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px;">Wild — Ouroboros</div>
    <p style="margin-bottom:16px;">Il serpente che si morde la coda sostituisce qualsiasi simbolo normale. Può completare o estendere una combo vincente. Non si combina con Scarabeo o Moneta d'Oro.</p>

    <div style="font-family:'Cinzel',serif;font-size:13px;color:#8a4510;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px;">Moltiplicatori</div>
    <p style="margin-bottom:8px;"><strong>Scarabeo</strong> — Se appare sulla linea vincente, il premio viene raddoppiato. Due scarabei = ×4. Non si combina con Wild o Moneta.</p>
    <p style="margin-bottom:16px;"><strong>Moneta d'Oro</strong> — Moltiplica il premio per 10. Non si combina con Wild o Scarabeo.</p>

    <div style="font-family:'Cinzel',serif;font-size:13px;color:#8a4510;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px;">Penalità</div>
    <p style="margin-bottom:6px;"><strong>Teschio</strong> — Dimezza il premio della linea (presenza) o tutti i Deben (combo 3×).</p>
    <p style="margin-bottom:6px;"><strong>Maledizione</strong> — Combo 3×-6×: sottrae Deben proporzionali al Bet.</p>
    <p style="margin-bottom:6px;"><strong>Spirito Maligno</strong> — Combo 3×: azzera i giri gratuiti.</p>
    <p style="margin-bottom:16px;"><strong>Mummia</strong> — Combo 3×-6×: sottrae una percentuale (10%-50%) dei crediti attuali. Una sola penalità per spin.</p>

    <div style="font-family:'Cinzel',serif;font-size:13px;color:#8a4510;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px;">Mini-giochi</div>
    <p style="margin-bottom:6px;"><strong>Mercato del Nilo</strong> — Scegli 1 cesto su 3, ognuno con un simbolo e un premio nascosto.</p>
    <p style="margin-bottom:6px;"><strong>Bilancia di Ma'at</strong> — Scegli la divinità più potente tra tre per vincere il premio.</p>
    <p style="margin-bottom:6px;"><strong>Sfinge</strong> — Sfida la Sfinge a chi ha la carta più alta. Puoi raddoppiare fino a 3 volte.</p>
    <p style="margin-bottom:6px;"><strong>Vaso Antico</strong> — Scegli 3 vasi su 5: Deben, Giri Gratuiti, Pietre Preziose o Maledizione.</p>
    <p style="margin-bottom:16px;"><strong>Papiro Sacro</strong> — Rivela un tesoro casuale: Deben o Pietre Preziose.</p>

    <div style="font-family:'Cinzel',serif;font-size:13px;color:#8a4510;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px;">Progressione e XP</div>
    <p style="margin-bottom:8px;">Ogni Deben vinto aggiunge <strong>XP</strong>. Ogni 2.000 XP sali di livello e di rango sociale — da Schiavo fino a Dio. Ad ogni livello nuovi simboli entrano nel pool.</p>
    <p style="margin-bottom:16px;">Il <strong>Grano</strong> è il tuo punteggio totale — non si spende mai. Viene usato per la classifica globale.</p>

    <div style="font-family:'Cinzel',serif;font-size:13px;color:#8a4510;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px;">Pietre Preziose e Gemme</div>
    <p style="margin-bottom:8px;">Le gemme non pagano in Deben ma accumulano <strong>Pietre Preziose</strong>. Ogni 100 Pietre ricevi automaticamente <strong>+500 Deben</strong>. Le gemme cambiano ogni 2 livelli, diventando sempre più preziose.</p>

    <div style="font-family:'Cinzel',serif;font-size:13px;color:#8a4510;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px;">Storie dei Simboli</div>
    <p style="margin-bottom:8px;">Ogni simbolo nasconde fino a <strong>10 storie</strong> tratte da testi egiziani antichi. Si sbloccano accumulando punti vincendo con quel simbolo — la barra di avanzamento è visibile nella colonna sinistra.</p>
    <p style="margin-bottom:16px;">Le storie sbloccate si leggono nel <strong>Papiro</strong>. Il tempio custodisce 1.030 frasi in totale.</p>

    <div style="font-family:'Cinzel',serif;font-size:13px;color:#8a4510;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px;">L'economia dell'antico Egitto</div>
    <p style="margin-bottom:8px;"><strong>Deben</strong> — Un peso in rame di 91 grammi, prima unità di valore dell'Egitto. Non era una moneta ma una misura: tutto si pesava in Deben.</p>
    <p style="margin-bottom:8px;"><strong>Grano</strong> — La vera valuta del popolo. I lavoratori delle piramidi venivano pagati in grano, pane e birra. Chi controllava i granai controllava l'Egitto.</p>
    <p style="margin-bottom:0;"><strong>Pietre Preziose</strong> — Custodite nei templi come tesoro divino. Non circolavano tra il popolo: erano offerte agli dei o sepolte con i faraoni per l'eternità.</p>
  `;
  container.appendChild(intro);

  // Paytable completa — tutti i simboli del gioco
  // Normali: tutti unici da masterAllSymbols (senza gemme, divini, speciali)
  const tuttiNormali  = masterAllSymbols.filter((s,i,a) => a.findIndex(x=>x.name===s.name)===i && !GEM_SYMBOLS.includes(s.name) && !DIVINE.includes(s.name) && !SPECIALS_LIST.includes(s.name));
  const tutteGemme    = masterAllSymbols.filter((s,i,a) => a.findIndex(x=>x.name===s.name)===i && GEM_SYMBOLS.includes(s.name));
  const tuttiDivini   = masterAllSymbols.filter((s,i,a) => a.findIndex(x=>x.name===s.name)===i && DIVINE.includes(s.name));
  const tutteSpeciali = masterAllSymbols.filter((s,i,a) => a.findIndex(x=>x.name===s.name)===i && SPECIALS_LIST.includes(s.name));

  // Evidenzia attivi col livello corrente
  const activeNames = new Set(getSymbolsForCurrentLevel().map(s => s.name));

  function makeSection(title, symbols) {
    if (!symbols.length) return;
    const t = document.createElement("div");
    t.className = "pt-section-title";
    t.textContent = title;
    container.appendChild(t);
    container.appendChild(makeGrid(symbols));
  }

  function makeSpecialSection(title, symbols) {
    if (!symbols.length) return;
    const t = document.createElement("div");
    t.className = "pt-section-title";
    t.textContent = title;
    container.appendChild(t);
    symbols.forEach(s => {
      const isActive = activeNames.has(s.name);
      const row = document.createElement("div");
      row.className = "pt-special-row";
      row.style.opacity = isActive ? "1" : "0.45";
      row.innerHTML =
        "<img src='assets/img/symbols/" + s.file + "' alt='" + s.name + "' style='width:56px;height:56px;object-fit:contain;flex-shrink:0;'>" +
        "<div class='pt-special-text'>" +
        "<div class='pt-special-name'>" + symName(s.name) + (isActive ? " <span style='color:#c4a55a;font-size:10px;margin-left:6px;'>● attivo</span>" : "") + "</div>" +
        "<div class='pt-special-desc'>" + (SPECIAL_DESC[s.name] || "Effetto speciale") + "</div>" +
        "</div>";
      container.appendChild(row);
    });
  }

  makeSection("Simboli Normali", tuttiNormali);
  makeSection("Pietre Preziose", tutteGemme);
  makeSection("Divinità e Personaggi", tuttiDivini);
  makeSpecialSection("Wild & Jackpot", tutteSpeciali.filter(s => FIXED.includes(s.name)));
  makeSpecialSection("Moltiplicatori", tutteSpeciali.filter(s => MULTIPLIERS.includes(s.name)));
  makeSpecialSection("Mini-giochi", tutteSpeciali.filter(s => MINIGAMES.includes(s.name)));
  makeSpecialSection("Penalità", tutteSpeciali.filter(s => PENALTIES.includes(s.name)));
}

// Nascondi loading screen
window.addEventListener("load", () => {
  setTimeout(() => {
    const ls = document.getElementById("loadingScreen");
    if (ls) {
      ls.classList.add("fade-out");
      setTimeout(() => ls.remove(), 500);
    }
  }, 600);
});