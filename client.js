const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.tabIndex = 0;

const screens = {
  mainMenu: document.getElementById("mainMenu"),
  modeScreen: document.getElementById("modeScreen"),
  characterScreen: document.getElementById("characterScreen"),
  battleScreen: document.getElementById("battleScreen"),
  endScreen: document.getElementById("endScreen"),
};

const ui = {
  quickLocalButton: document.getElementById("quickLocalButton"),
  quickBotButton: document.getElementById("quickBotButton"),
  modeBackButton: document.getElementById("modeBackButton"),
  modeCards: [...document.querySelectorAll(".mode-card")],
  botDifficultyPanel: document.getElementById("botDifficultyPanel"),
  difficultyCards: [...document.querySelectorAll(".difficulty-card")],
  difficultyConfirmButton: document.getElementById("difficultyConfirmButton"),
  difficultyBackButton: document.getElementById("difficultyBackButton"),
  setupPanel: document.getElementById("setupPanel"),
  setupSubtitle: document.getElementById("setupSubtitle"),
  continueToCharactersButton: document.getElementById("continueToCharactersButton"),
  controllerStatus0: document.getElementById("controllerStatus0"),
  controllerStatus1: document.getElementById("controllerStatus1"),
  controllerWarningText: document.getElementById("controllerWarningText"),
  controllerDebugPanel: document.getElementById("controllerDebugPanel"),
  controllerDebug0: document.getElementById("controllerDebug0"),
  controllerDebug1: document.getElementById("controllerDebug1"),
  setupErrorText: document.getElementById("setupErrorText"),
  inputOptionButtons: [...document.querySelectorAll(".input-option-button")],
  player2AssignmentCard: document.getElementById("player2AssignmentCard"),
  player2AssignmentLabel: document.getElementById("player2AssignmentLabel"),
  player2AssignmentTitle: document.getElementById("player2AssignmentTitle"),
  player2AssignmentCopy: document.getElementById("player2AssignmentCopy"),
  player2InputOptions: document.getElementById("player2InputOptions"),
  characterGrid: document.getElementById("characterGrid"),
  selectionStep: document.getElementById("selectionStep"),
  selectionTitle: document.getElementById("selectionTitle"),
  selectionSubtitle: document.getElementById("selectionSubtitle"),
  confirmCharacterTopButton: document.getElementById("confirmCharacterTopButton"),
  characterBackButton: document.getElementById("characterBackButton"),
  detailBadge: document.getElementById("detailBadge"),
  detailName: document.getElementById("detailName"),
  detailDescription: document.getElementById("detailDescription"),
  detailDesign: document.getElementById("detailDesign"),
  detailNormalName: document.getElementById("detailNormalName"),
  detailNormalDescription: document.getElementById("detailNormalDescription"),
  detailSpecialName: document.getElementById("detailSpecialName"),
  detailSpecialDescription: document.getElementById("detailSpecialDescription"),
  detailAbilityName: document.getElementById("detailAbilityName"),
  detailAbilityDescription: document.getElementById("detailAbilityDescription"),
  detailAbilityCooldown: document.getElementById("detailAbilityCooldown"),
  detailKeyboardControls: document.getElementById("detailKeyboardControls"),
  detailControllerControls: document.getElementById("detailControllerControls"),
  detailPros: document.getElementById("detailPros"),
  detailCons: document.getElementById("detailCons"),
  detailStats: document.getElementById("detailStats"),
  confirmCharacterButton: document.getElementById("confirmCharacterButton"),
  p1GuideTitle: document.getElementById("p1GuideTitle"),
  p1GuideMove: document.getElementById("p1GuideMove"),
  p1GuideAttack: document.getElementById("p1GuideAttack"),
  p1GuideAbility: document.getElementById("p1GuideAbility"),
  p2GuideTitle: document.getElementById("p2GuideTitle"),
  p2GuideMove: document.getElementById("p2GuideMove"),
  p2GuideAttack: document.getElementById("p2GuideAttack"),
  p2GuideAbility: document.getElementById("p2GuideAbility"),
  p1Label: document.getElementById("p1Label"),
  p1Character: document.getElementById("p1Character"),
  p1InputTag: document.getElementById("p1InputTag"),
  p1Lives: document.getElementById("p1Lives"),
  p1CooldownFill: document.getElementById("p1CooldownFill"),
  p1AbilityFill: document.getElementById("p1AbilityFill"),
  p1DamageCard: document.getElementById("p1DamageCard"),
  p1DamageMeta: document.getElementById("p1DamageMeta"),
  p1DamageValue: document.getElementById("p1DamageValue"),
  p1DamageFill: document.getElementById("p1DamageFill"),
  p2Label: document.getElementById("p2Label"),
  p2Character: document.getElementById("p2Character"),
  p2InputTag: document.getElementById("p2InputTag"),
  p2Lives: document.getElementById("p2Lives"),
  p2CooldownFill: document.getElementById("p2CooldownFill"),
  p2AbilityFill: document.getElementById("p2AbilityFill"),
  p2DamageCard: document.getElementById("p2DamageCard"),
  p2DamageMeta: document.getElementById("p2DamageMeta"),
  p2DamageValue: document.getElementById("p2DamageValue"),
  p2DamageFill: document.getElementById("p2DamageFill"),
  modeBadge: document.getElementById("modeBadge"),
  countdownOverlay: document.getElementById("countdownOverlay"),
  pauseOverlay: document.getElementById("pauseOverlay"),
  pauseEyebrow: document.getElementById("pauseEyebrow"),
  pauseTitle: document.getElementById("pauseTitle"),
  pauseMessage: document.getElementById("pauseMessage"),
  resumeButton: document.getElementById("resumeButton"),
  pauseMenuButton: document.getElementById("pauseMenuButton"),
  touchControls: document.getElementById("touchControls"),
  touchStatusLabel: document.getElementById("touchStatusLabel"),
  touchPanelP1: document.getElementById("touchPanelP1"),
  touchPanelP2: document.getElementById("touchPanelP2"),
  touchButtons: [...document.querySelectorAll("[data-touch-player][data-touch-action]")],
  inputTestAction: document.getElementById("inputTestAction"),
  inputTestSource: document.getElementById("inputTestSource"),
  endPanel: document.getElementById("endPanel"),
  endEyebrow: document.getElementById("endEyebrow"),
  endTitle: document.getElementById("endTitle"),
  endSubtitle: document.getElementById("endSubtitle"),
  playAgainButton: document.getElementById("playAgainButton"),
  backToMenuButton: document.getElementById("backToMenuButton"),
};

const GAME = {
  width: canvas.width,
  height: canvas.height,
  gravity: 1980,
  stockLives: 3,
  ringMargin: 130,
  roundStartCountdown: 3.7,
  respawnPause: 1.12,
  platform: {
    x: 220,
    y: 520,
    width: 840,
    height: 28,
    snapDepth: 34,
    edgeInset: 12,
  },
};

const GAME_LOOP = {
  fixedStep: 1 / 60,
};

const INPUT_LABELS = {
  keyboard: "Tastatur",
  touch: "Handy Touch",
  controller0: "Controller 1",
  controller1: "Controller 2",
  controller0ps: "Ps Controller 1",
  controller1ps: "Ps Controller 2",
  controller0xbox: "Xbox Controller 1",
  controller1xbox: "Xbox Controller 2",
  bot: "Bot-KI",
};

const KEYBOARD_LAYOUTS = {
  player1: {
    left: "KeyA",
    right: "KeyD",
    jump: "KeyW",
    block: "KeyS",
    attack: "KeyF",
    special: "KeyG",
    ability: ["KeyH"],
    pause: ["Escape"],
  },
  player2: {
    left: "ArrowLeft",
    right: "ArrowRight",
    jump: "ArrowUp",
    block: "ArrowDown",
    attack: "KeyK",
    special: "KeyL",
    ability: ["KeyM", "Semicolon"],
    pause: ["Escape"],
  },
};

const PS_CONTROLLER_HELP_TEXT = "Linker Stick oder D-Pad links/rechts bewegen, X springen, Kreis normaler Angriff, Quadrat Spezial, Dreieck neue Faehigkeit, L1 blocken, Options pausieren";
const XBOX_CONTROLLER_HELP_TEXT = "Linker Stick oder Steuerkreuz links/rechts bewegen, A springen, B normaler Angriff, X Spezial, Y neue Faehigkeit, LB blocken, Menu pausieren";
const GENERIC_CONTROLLER_HELP_TEXT = "Linker Stick oder D-Pad links/rechts bewegen, untere Taste springen, rechte Taste normaler Angriff, linke Taste Spezial, obere Taste Faehigkeit, linke Schultertaste blocken, Start/Menu pausieren";
const TOUCH_HELP_TEXT = "On-Screen-Buttons: Links/Rechts bewegen, Sprung, Block, Angriff, Spezial, Faehigkeit und Pause direkt auf dem Handy-Bildschirm. Im lokalen Touch-Duell bekommt jeder Spieler ein eigenes Pad.";
const ACTION_LABELS = {
  left: "Links",
  right: "Rechts",
  jump: "Sprung",
  block: "Block",
  attack: "Normaler Angriff",
  special: "Spezialangriff",
  ability: "Faehigkeit",
  pause: "Pause",
};
const GAMEPAD_ACTION_BUTTONS = {
  0: "jump",
  1: "attack",
  2: "special",
  3: "ability",
  4: "block",
  9: "pause",
  14: "left",
  15: "right",
};
const GAMEPAD_AXIS_THRESHOLD = 0.35;
const PLAYSTATION_ID_HINTS = ["dualsense", "dualshock", "wireless controller", "playstation", "sony", "054c", "ps5", "ps4"];
const INPUT_BUFFER_WINDOW = 0.12;
const BUFFERED_ACTION_NAMES = ["jump", "attack", "special", "ability"];
const DEFAULT_CONTROLLER_CALIBRATION = {
  jump: 0,
  attack: 1,
  special: 2,
  ability: 3,
  block: 4,
  pause: 9,
  left: 14,
  right: 15,
};

const BOT_DIFFICULTIES = {
  easy: {
    label: "Leicht",
    ai: {
      decisionMin: 0.2,
      decisionMax: 0.34,
      hesitationChance: 0.45,
      hesitationMin: 0.7,
      hesitationMax: 1.4,
      mistakeMoveChance: 0.26,
      edgeRecoveryChance: 0.6,
      closeDistance: 120,
      verticalTolerance: 92,
      attackChance: 0.3,
      specialChance: 0.06,
      finishSpecialChance: 0.1,
      longSpecialChance: 0.03,
      rangedAttackChance: 0.22,
      blockChance: 0.12,
      jumpChance: 0.42,
      panicJumpChance: 0.28,
      panicDistance: 100,
      panicMin: 0.65,
      panicMax: 1.05,
      airJumpChance: 0.15,
      specialDistance: 165,
      rangedDistance: 228,
      finishDamageThreshold: 120,
      abilityChance: 0.08,
      finishAbilityChance: 0.12,
    },
  },
  medium: {
    label: "Mittel",
    ai: {
      decisionMin: 0.11,
      decisionMax: 0.22,
      hesitationChance: 0.24,
      hesitationMin: 0.75,
      hesitationMax: 1.25,
      mistakeMoveChance: 0.11,
      edgeRecoveryChance: 0.76,
      closeDistance: 128,
      verticalTolerance: 100,
      attackChance: 0.54,
      specialChance: 0.17,
      finishSpecialChance: 0.24,
      longSpecialChance: 0.1,
      rangedAttackChance: 0.42,
      blockChance: 0.34,
      jumpChance: 0.7,
      panicJumpChance: 0.52,
      panicDistance: 108,
      panicMin: 0.46,
      panicMax: 0.84,
      airJumpChance: 0.24,
      specialDistance: 180,
      rangedDistance: 240,
      finishDamageThreshold: 98,
      abilityChance: 0.18,
      finishAbilityChance: 0.2,
    },
  },
  hard: {
    label: "Schwer",
    ai: {
      decisionMin: 0.06,
      decisionMax: 0.13,
      hesitationChance: 0.11,
      hesitationMin: 0.7,
      hesitationMax: 1.05,
      mistakeMoveChance: 0.04,
      edgeRecoveryChance: 0.92,
      closeDistance: 138,
      verticalTolerance: 108,
      attackChance: 0.72,
      specialChance: 0.24,
      finishSpecialChance: 0.34,
      longSpecialChance: 0.15,
      rangedAttackChance: 0.58,
      blockChance: 0.56,
      jumpChance: 0.8,
      panicJumpChance: 0.72,
      panicDistance: 116,
      panicMin: 0.3,
      panicMax: 0.56,
      airJumpChance: 0.38,
      specialDistance: 194,
      rangedDistance: 260,
      finishDamageThreshold: 84,
      abilityChance: 0.32,
      finishAbilityChance: 0.36,
    },
  },
  impossible: {
    label: "Unmoeglich",
    ai: {
      decisionMin: 0.04,
      decisionMax: 0.09,
      hesitationChance: 0.06,
      hesitationMin: 0.66,
      hesitationMax: 0.98,
      mistakeMoveChance: 0.018,
      edgeRecoveryChance: 0.97,
      closeDistance: 148,
      verticalTolerance: 116,
      attackChance: 0.82,
      specialChance: 0.29,
      finishSpecialChance: 0.41,
      longSpecialChance: 0.2,
      rangedAttackChance: 0.7,
      blockChance: 0.7,
      jumpChance: 0.87,
      panicJumpChance: 0.82,
      panicDistance: 124,
      panicMin: 0.24,
      panicMax: 0.42,
      airJumpChance: 0.5,
      specialDistance: 208,
      rangedDistance: 280,
      finishDamageThreshold: 74,
      abilityChance: 0.42,
      finishAbilityChance: 0.46,
    },
  },
};

const CHARACTER_DATA = [
  {
    id: "ninja",
    name: "Ninja",
    role: "Shadow Duelist",
    color: "#161922",
    accent: "#ff4d61",
    accentSecondary: "#f5f7ff",
    description: "Extrem schnell, schwer zu treffen und perfekt fuer aggressive Ringout-Setups.",
    designDescription: "Schwarzes Strichmaennchen mit rotem Schal, dunkler Maske und leuchtenden Augen. Beim Sprinten bleiben Schattenbilder und Rauch zurueck.",
    normalAttackName: "Katana-Hieb",
    normalAttackDescription: "Ein blitzschneller Frontschnitt mit roter Schnittspur und kurzer Rauchwolke.",
    specialName: "Schatten-Dash",
    specialDescription: "Der Ninja schiesst mit einem roten Dash-Effekt durch den Gegner und reisst ihn mit einer dunklen Stoerwelle mit.",
    abilityName: "Teleport-Ausweichen",
    abilityDescription: "Teleportiert kurz hinter den Gegner oder einige Schritte nach vorne und macht den Ninja fuer einen Moment schwer greifbar.",
    pros: "Hohes Tempo, gutes Mixup, starke Kantenkontrolle.",
    cons: "Weniger Rohkraft und leichter zu weit wegzuschlagen.",
    statsText: ["Tempo: Sehr hoch", "Gewicht: Leicht", "Reichweite: Kurz", "Trickreich: Sehr hoch"],
    gameplay: {
      moveSpeed: 418,
      airSpeed: 360,
      acceleration: 2760,
      airAcceleration: 1760,
      friction: 2500,
      airDrag: 520,
      jumpForce: 790,
      resistance: 0.92,
      attackCooldown: 0.25,
      specialCooldown: 3.1,
      abilityCooldown: 5.8,
      attackKnockback: 470,
      attackLift: 185,
      jumps: 1,
      blockMultiplier: 0.44,
    },
    normalDamage: 6,
    specialDamage: 12,
  },
  {
    id: "boxer",
    name: "Boxer",
    role: "Pressure Bruiser",
    color: "#ff4b62",
    accent: "#ffd66a",
    accentSecondary: "#ffc2ca",
    description: "Treibt Gegner mit schnellen Vorwaertsbewegungen und brachialen Impact-Treffern in die Ecke.",
    designDescription: "Rotes Strichmaennchen mit gelben Boxhandschuhen, Stirnband und leuchtender Kampfhaltung. Im Wut-Modus glimmt eine rote Aura um ihn herum.",
    normalAttackName: "Jab",
    normalAttackDescription: "Ein kurzer, schneller Schlag mit gelbem Impact-Kreis direkt an der Faust.",
    specialName: "Power-Punch",
    specialDescription: "Ein schwerer, aufgeladener Treffer mit fettem Bildschirm-Impact und massiver Rueckstosswelle.",
    abilityName: "Wut-Modus",
    abilityDescription: "Verleiht dem Boxer fuer kurze Zeit mehr Knockback, eine heisse rote Aura und aggressivere Trefferfenster.",
    pros: "Starke Nahkampftreffer, hoher Druck, starkes Finishing.",
    cons: "Kurze Reichweite und auf Distanz leichter auszuspielen.",
    statsText: ["Tempo: Hoch", "Gewicht: Mittel", "Reichweite: Kurz", "Impact: Sehr hoch"],
    gameplay: {
      moveSpeed: 368,
      airSpeed: 320,
      acceleration: 2600,
      airAcceleration: 1680,
      friction: 2380,
      airDrag: 510,
      jumpForce: 752,
      resistance: 1.02,
      attackCooldown: 0.3,
      specialCooldown: 3.4,
      abilityCooldown: 9.1,
      abilityDuration: 4.1,
      attackKnockback: 640,
      attackLift: 255,
      jumps: 1,
      blockMultiplier: 0.42,
    },
    normalDamage: 8,
    specialDamage: 18,
  },
  {
    id: "magier",
    name: "Magier",
    role: "Arcane Controller",
    color: "#7079ff",
    accent: "#59dfff",
    accentSecondary: "#d28cff",
    description: "Kontrolliert Raum mit Energieprojektilen, Runen und defensiven Schutzfenstern.",
    designDescription: "Blau-violettes Strichmaennchen mit Kapuze, leuchtender Zauberkugel und magischen Runen um die Haende. Der Schutzschild baut eine helle Kugel um ihn herum auf.",
    normalAttackName: "Energieprojektil",
    normalAttackDescription: "Ein kleines, leuchtendes Projektil mit violett-blauer Spur, das aus der Hand geschossen wird.",
    specialName: "Magische Druckwelle",
    specialDescription: "Eine grosse Runenwelle breitet sich um den Magier aus und wirft Gegner mit einer hellen Impulszone zurueck.",
    abilityName: "Schutzschild",
    abilityDescription: "Erzeugt eine schimmernde Kugel, die fuer kurze Zeit Rueckstoss stark reduziert und Treffer optisch absorbiert.",
    pros: "Starke Distanzkontrolle, sichere Zonierung, solide Defensive.",
    cons: "Leicht, fragil und ohne Raum schnell unter Druck.",
    statsText: ["Tempo: Mittel", "Gewicht: Sehr leicht", "Reichweite: Sehr hoch", "Kontrolle: Hoch"],
    gameplay: {
      moveSpeed: 324,
      airSpeed: 292,
      acceleration: 2220,
      airAcceleration: 1520,
      friction: 2250,
      airDrag: 500,
      jumpForce: 738,
      resistance: 0.82,
      attackCooldown: 0.38,
      specialCooldown: 4.8,
      abilityCooldown: 9.4,
      abilityDuration: 3.2,
      attackKnockback: 560,
      attackLift: 220,
      jumps: 1,
      blockMultiplier: 0.54,
    },
    normalDamage: 7,
    specialDamage: 15,
  },
  {
    id: "tank",
    name: "Tank",
    role: "Heavy Anchor",
    color: "#9099ab",
    accent: "#ffd86a",
    accentSecondary: "#dfe7f4",
    description: "Langsam, aber brutal stabil. Kontrolliert den Boden mit Gewicht, Schockwellen und purem Widerstand.",
    designDescription: "Grosses, gepanzertes Strichmaennchen mit grauer Ruestung, breiten Armen und schweren Schultern. Seine Spezialeffekte erzeugen Staub, Risse und schwere Schockringe.",
    normalAttackName: "Schwerer Schlag",
    normalAttackDescription: "Ein voller Frontschlag mit grauem Staub-Impact und massiver Trefferzone.",
    specialName: "Bodenstampfer",
    specialDescription: "Ein schwerer Stampfer sendet eine grosse Schockwelle ueber die Plattform und laesst kurz Bodenrisse aufleuchten.",
    abilityName: "Unaufhaltsam",
    abilityDescription: "Der Tank wird fuer kurze Zeit fast unverschiebbar. Er ist langsamer, aber eingehender Rueckstoss wird extrem reduziert.",
    pros: "Sehr schwer wegzukicken, starke Ground-Hits, gute Anti-Air-Schockwellen.",
    cons: "Langsame Mobilitaet und anfaellig gegen gute Kiter.",
    statsText: ["Tempo: Niedrig", "Gewicht: Sehr hoch", "Reichweite: Mittel", "Standfest: Maximal"],
    gameplay: {
      moveSpeed: 272,
      airSpeed: 228,
      acceleration: 1820,
      airAcceleration: 1200,
      friction: 2080,
      airDrag: 460,
      jumpForce: 694,
      resistance: 1.25,
      attackCooldown: 0.42,
      specialCooldown: 4.3,
      abilityCooldown: 10.2,
      abilityDuration: 4.0,
      attackKnockback: 700,
      attackLift: 290,
      jumps: 1,
      blockMultiplier: 0.34,
    },
    normalDamage: 9,
    specialDamage: 16,
  },
  {
    id: "springer",
    name: "Springer",
    role: "Aerial Skirmisher",
    color: "#3ff6a8",
    accent: "#aeffe1",
    accentSecondary: "#7cc8ff",
    description: "Luftig, explosiv und unberechenbar. Arbeitet mit hohen Boegen, Windspuren und schnellen Luftstuerzen.",
    designDescription: "Gruenes Strichmaennchen mit leichten Stiefeln, Federdetails und hellen Windspuren bei Spruengen. Seine Spezialeffekte erzeugen Luftwirbel und gruen-blaue Streifen.",
    normalAttackName: "Luft-Kick",
    normalAttackDescription: "Ein schneller Vorwaertskick mit gruener Windkante an der Fussspitze.",
    specialName: "Luft-Sturzangriff",
    specialDescription: "Springer steigt kurz an und donnert dann mit einem wirbelnden Sturzangriff nach unten in die Arena.",
    abilityName: "Feder-Sprung",
    abilityDescription: "Ein extremer Boost-Sprung mit Windpartikeln. Oeffnet zusaetzlich ein weiteres Luftsprung-Fenster fuer kurze Zeit.",
    pros: "Beste Vertikalitaet, starke Luftkontrolle, gutes Edge-Play.",
    cons: "Fehler werden schnell bestraft und Landungen brauchen Gefuehl.",
    statsText: ["Tempo: Mittel", "Gewicht: Leicht", "Reichweite: Mittel", "Luftspiel: Sehr hoch"],
    gameplay: {
      moveSpeed: 348,
      airSpeed: 358,
      acceleration: 2320,
      airAcceleration: 1820,
      friction: 2200,
      airDrag: 450,
      jumpForce: 848,
      resistance: 0.9,
      attackCooldown: 0.3,
      specialCooldown: 3.9,
      abilityCooldown: 6.4,
      abilityDuration: 3.6,
      attackKnockback: 545,
      attackLift: 328,
      jumps: 2,
      blockMultiplier: 0.5,
    },
    normalDamage: 7,
    specialDamage: 14,
  },
  {
    id: "samurai",
    name: "Samurai",
    role: "Steel Countermaster",
    color: "#1d2f74",
    accent: "#6db4ff",
    accentSecondary: "#d8ecff",
    description: "Kontrolliert den Raum mit praezisen Klingenwinkeln und einem gefaehrlichen Gegenangriff.",
    designDescription: "Dunkelblaues Strichmaennchen mit Katana, Schulterruestung und wehender Kopfbinde. Seine Angriffe ziehen kuehle blaue Schnittspuren durch die Luft.",
    normalAttackName: "Praeziser Schwertschnitt",
    normalAttackDescription: "Ein sauberer Katana-Schnitt mit schmaler, weit reichender Schneidspur.",
    specialName: "Klingensturm",
    specialDescription: "Ein wirbelnder Angriff mit mehreren blauen Schnittboegen, der Gegner in der Naehe zerlegt und wegschleudert.",
    abilityName: "Gegenangriff",
    abilityDescription: "Oeffnet kurz eine Konterhaltung. Ein eingehender Treffer wird abgefangen und mit einem automatischen Gegenschnitt beantwortet.",
    pros: "Hoher Schaden, starke Reichweite, gefaehrliche Punishes.",
    cons: "Nur mittleres Tempo und lebt von gutem Timing.",
    statsText: ["Tempo: Mittel", "Gewicht: Mittel", "Reichweite: Hoch", "Konterspiel: Sehr hoch"],
    gameplay: {
      moveSpeed: 336,
      airSpeed: 300,
      acceleration: 2360,
      airAcceleration: 1540,
      friction: 2300,
      airDrag: 500,
      jumpForce: 760,
      resistance: 1.08,
      attackCooldown: 0.32,
      specialCooldown: 4.2,
      abilityCooldown: 6.8,
      abilityDuration: 0.55,
      attackKnockback: 620,
      attackLift: 260,
      jumps: 1,
      blockMultiplier: 0.4,
    },
    normalDamage: 8,
    specialDamage: 17,
  },
  {
    id: "assassine",
    name: "Assassine",
    role: "Phantom Striker",
    color: "#37214f",
    accent: "#74ff8c",
    accentSecondary: "#d7ffe1",
    description: "Blitzschnell, schwer zu lesen und auf kurze Burst-Fenster spezialisiert.",
    designDescription: "Dunkelviolettes Strichmaennchen mit Kapuze, gruener Augenlinie und duennen Dolchklingen. Bewegungen hinterlassen geisterhafte Schattenbilder.",
    normalAttackName: "Dolchstoss",
    normalAttackDescription: "Ein schneller Vorwaertsstoss mit gruener Splitterspur.",
    specialName: "Mehrfacher Schattenangriff",
    specialDescription: "Mehrere kurze Schattenhiebe blitzen nacheinander auf und treffen aus leicht versetzten Winkeln.",
    abilityName: "Unsichtbarkeit",
    abilityDescription: "Wird fuer kurze Zeit durchsichtig, schwerer zu treffen und gleitet mit kalten Schattenpartikeln ueber die Arena.",
    pros: "Extrem schnell, starkes Mixup, gute Ringout-Chancen.",
    cons: "Sehr leicht und bei Fehlern schnell aus der Arena.",
    statsText: ["Tempo: Extrem hoch", "Gewicht: Sehr leicht", "Reichweite: Kurz", "Trickreich: Maximal"],
    gameplay: {
      moveSpeed: 432,
      airSpeed: 374,
      acceleration: 2820,
      airAcceleration: 1860,
      friction: 2480,
      airDrag: 520,
      jumpForce: 804,
      resistance: 0.86,
      attackCooldown: 0.24,
      specialCooldown: 4.1,
      abilityCooldown: 7.4,
      abilityDuration: 2.7,
      attackKnockback: 500,
      attackLift: 190,
      jumps: 1,
      blockMultiplier: 0.48,
    },
    normalDamage: 6,
    specialDamage: 13,
  },
  {
    id: "blitzkaempfer",
    name: "Blitzkaempfer",
    role: "Storm Runner",
    color: "#f9d53a",
    accent: "#fff59d",
    accentSecondary: "#ffffff",
    description: "Explosiv schnell und mit elektrischen Vorstoessen kaum zu fassen.",
    designDescription: "Gelbes Strichmaennchen mit flackernder Stromaura, hellen Funken und kurzen elektrischen Nachbildern an Armen und Beinen.",
    normalAttackName: "Elektrischer Schlag",
    normalAttackDescription: "Ein schneller Stoss mit zackiger Stromspur und grellem Funkenblitz.",
    specialName: "Kettenblitz",
    specialDescription: "Ein heftiger elektrischer Ausbruch schiesst nach vorne und knistert in mehreren Schlangenlinien durch den Raum.",
    abilityName: "Blitzsprung",
    abilityDescription: "Ein sofortiger Sprint mit elektrischem Nachbild, der Positionen wechselt und Gegner beim Durchbruch streifen kann.",
    pros: "Maximales Tempo, starke Vorstoesse, guter Edge-Recovery.",
    cons: "Wenig Kontrolle und leichte Uebersteuerung in hektischen Situationen.",
    statsText: ["Tempo: Maximal", "Gewicht: Leicht", "Reichweite: Mittel", "Kontrolle: Niedrig"],
    gameplay: {
      moveSpeed: 446,
      airSpeed: 382,
      acceleration: 2900,
      airAcceleration: 1900,
      friction: 2520,
      airDrag: 500,
      jumpForce: 780,
      resistance: 0.88,
      attackCooldown: 0.26,
      specialCooldown: 4.5,
      abilityCooldown: 6.2,
      abilityDuration: 0.28,
      attackKnockback: 560,
      attackLift: 210,
      jumps: 1,
      blockMultiplier: 0.46,
    },
    normalDamage: 7,
    specialDamage: 14,
  },
  {
    id: "eiswaechter",
    name: "Eiswaechter",
    role: "Frost Sentinel",
    color: "#9fe2ff",
    accent: "#e8f7ff",
    accentSecondary: "#69b8ff",
    description: "Verlangsamt das Matchtempo mit Frostfeldern, Kontrolle und sicherer Distanz.",
    designDescription: "Hellblaues Strichmaennchen mit Frostpartikeln, kleinen Eiskristallen an Schultern und kaltem Atemschimmer.",
    normalAttackName: "Froststoss",
    normalAttackDescription: "Ein kalter Stoss mit hellblauer Splitterspur und kurzem Frostnebel.",
    specialName: "Eisexplosion",
    specialDescription: "Eine gefrorene Druckwelle platzt auf und wirft Gegner mit Kristallringen und Frostsplittern zurueck.",
    abilityName: "Einfrieren",
    abilityDescription: "Belegt den Gegner mit eisiger Laehmung und verlangsamt ihn fuer kurze Zeit stark.",
    pros: "Sehr gute Kontrolle, starke Defensive und sichere Spezialzonen.",
    cons: "Langsamere Startups und weniger Druck im Nahkampf.",
    statsText: ["Tempo: Niedrig", "Gewicht: Mittel", "Reichweite: Mittel", "Kontrolle: Sehr hoch"],
    gameplay: {
      moveSpeed: 304,
      airSpeed: 272,
      acceleration: 2140,
      airAcceleration: 1420,
      friction: 2260,
      airDrag: 490,
      jumpForce: 730,
      resistance: 1.04,
      attackCooldown: 0.39,
      specialCooldown: 5.1,
      abilityCooldown: 8.3,
      abilityDuration: 2.4,
      attackKnockback: 590,
      attackLift: 240,
      jumps: 1,
      blockMultiplier: 0.48,
    },
    normalDamage: 7,
    specialDamage: 15,
  },
  {
    id: "feuerlord",
    name: "Feuerlord",
    role: "Inferno Monarch",
    color: "#ff7d2a",
    accent: "#ffd268",
    accentSecondary: "#fff2c8",
    description: "Lebt von grossen Spezialmomenten, Flammenaura und heissen Finishern.",
    designDescription: "Orange-rotes Strichmaennchen mit lodernder Flammenaura, funkelnden Aschepartikeln und heissen Glutlinien entlang der Arme.",
    normalAttackName: "Flammenschlag",
    normalAttackDescription: "Ein vorwaerts gezogener Flammenhieb mit glimmender Schlagkante.",
    specialName: "Feuersturm",
    specialDescription: "Ein grosser Flammenausbruch walzt nach vorne und umhuellt den Trefferbereich in rot-orange Wirbel.",
    abilityName: "Brennende Aura",
    abilityDescription: "Entfacht eine aggressive Aura, die fuer kurze Zeit Schaden und Rueckstoss seiner Treffer erhoeht.",
    pros: "Sehr starke Spezialhits, gute Finisher und druckvolle Auren.",
    cons: "Nur mittlere Defensive und anfaellig gegen schnelle Konter.",
    statsText: ["Tempo: Mittel", "Gewicht: Mittel", "Reichweite: Mittel", "Spezialkraft: Sehr hoch"],
    gameplay: {
      moveSpeed: 352,
      airSpeed: 318,
      acceleration: 2380,
      airAcceleration: 1600,
      friction: 2290,
      airDrag: 495,
      jumpForce: 760,
      resistance: 0.98,
      attackCooldown: 0.31,
      specialCooldown: 4.6,
      abilityCooldown: 8.7,
      abilityDuration: 3.9,
      attackKnockback: 630,
      attackLift: 250,
      jumps: 1,
      blockMultiplier: 0.43,
    },
    normalDamage: 8,
    specialDamage: 18,
  },
  {
    id: "schattenkrieger",
    name: "Schattenkrieger",
    role: "Void Mirage",
    color: "#0f101a",
    accent: "#a46dff",
    accentSecondary: "#d6c8ff",
    description: "Arbeitet mit Nebel, Illusionen und mobilen Burst-Fenstern aus dem Dunkel.",
    designDescription: "Schwarzes Strichmaennchen mit violettem Nebel, dunklen Klingenarmen und geisterhaften Nachbildern bei Faehigkeiten.",
    normalAttackName: "Dunkelklinge",
    normalAttackDescription: "Ein kurzer dunkler Schnitt mit violetter Nebelspur.",
    specialName: "Schattenexplosion",
    specialDescription: "Ein dichter Schattenball verdichtet sich und detoniert mit violettem Impulsring.",
    abilityName: "Dunkle Kopie",
    abilityDescription: "Beschwoert eine kurzlebige Illusion, die seine Silhouette spiegelt und Treffer schwerer lesbar macht.",
    pros: "Starke Taeuschung, gutes Movement, flexible Angriffsfenster.",
    cons: "Nur mittlere Rohkraft und braucht gutes Stellungsspiel.",
    statsText: ["Tempo: Hoch", "Gewicht: Leicht", "Reichweite: Mittel", "Taeuschung: Sehr hoch"],
    gameplay: {
      moveSpeed: 390,
      airSpeed: 338,
      acceleration: 2560,
      airAcceleration: 1700,
      friction: 2400,
      airDrag: 500,
      jumpForce: 778,
      resistance: 0.94,
      attackCooldown: 0.29,
      specialCooldown: 4.4,
      abilityCooldown: 7.9,
      abilityDuration: 2.7,
      attackKnockback: 540,
      attackLift: 215,
      jumps: 1,
      blockMultiplier: 0.46,
    },
    normalDamage: 7,
    specialDamage: 14,
  },
  {
    id: "cyborg",
    name: "Cyborg",
    role: "Augment Vanguard",
    color: "#aab6c9",
    accent: "#ff546e",
    accentSecondary: "#ffe1e7",
    description: "Ausgewogen, technisch und mit kurzer Ueberladung auf starke Power-Spikes ausgelegt.",
    designDescription: "Silbernes Strichmaennchen mit roten Sensoren, mechanischen Gelenklinien und leuchtenden Kernsegmenten im Oberkoerper.",
    normalAttackName: "Metallschlag",
    normalAttackDescription: "Ein harter Metalltreffer mit rotem Sensorschein und Funkenring.",
    specialName: "Raketenstoss",
    specialDescription: "Ein brutaler Vorwaertsstoss mit Raketenflamme und rotem Schubnachbild.",
    abilityName: "Energieueberladung",
    abilityDescription: "Laedt die Systeme kurz auf und erhoeht Geschwindigkeit, Schaden und Druckfenster fuer eine Weile.",
    pros: "Sehr ausgeglichen, sauberer Allrounder und gut fuer fast jede Distanz.",
    cons: "Lange Cooldowns und ohne Overload etwas geradlinig.",
    statsText: ["Tempo: Mittel", "Gewicht: Mittel", "Reichweite: Mittel", "Allround: Sehr hoch"],
    gameplay: {
      moveSpeed: 342,
      airSpeed: 306,
      acceleration: 2300,
      airAcceleration: 1500,
      friction: 2280,
      airDrag: 490,
      jumpForce: 748,
      resistance: 1.08,
      attackCooldown: 0.33,
      specialCooldown: 5.2,
      abilityCooldown: 9.8,
      abilityDuration: 3.5,
      attackKnockback: 610,
      attackLift: 250,
      jumps: 1,
      blockMultiplier: 0.41,
    },
    normalDamage: 8,
    specialDamage: 16,
  },
  {
    id: "berserker",
    name: "Berserker",
    role: "Bloodstorm",
    color: "#6a1017",
    accent: "#ff5766",
    accentSecondary: "#ffd0d5",
    description: "Will den Schlagabtausch eskalieren und wird im verletzten Zustand immer gefaehrlicher.",
    designDescription: "Dunkelrotes Strichmaennchen mit rauer Aura, schwerer Axtsilhouette und wilden, rissigen Linien an Armen und Schultern.",
    normalAttackName: "Axtschlag",
    normalAttackDescription: "Ein schwerer Hieb mit rot aufplatzender Schneidspur.",
    specialName: "Rasender Wirbel",
    specialDescription: "Ein aggressiver Drehangriff, der mit rohen Blutrausch-Ringen durch den Nahbereich schneidet.",
    abilityName: "Blutrausch",
    abilityDescription: "Entfacht einen Kampfrausch. Je weniger Leben uebrig sind, desto staerker werden Schaden und Knockback waehrend der Dauer.",
    pros: "Sehr hoher Knockback, starke Finisher, eskaliert im Spaetspiel.",
    cons: "Wenig Verteidigung und kann bei Fehlschlaegen schnell bestraft werden.",
    statsText: ["Tempo: Mittel", "Gewicht: Leicht", "Reichweite: Mittel", "Knockback: Extrem hoch"],
    gameplay: {
      moveSpeed: 360,
      airSpeed: 322,
      acceleration: 2420,
      airAcceleration: 1600,
      friction: 2260,
      airDrag: 490,
      jumpForce: 760,
      resistance: 0.9,
      attackCooldown: 0.31,
      specialCooldown: 4.3,
      abilityCooldown: 8.1,
      abilityDuration: 4.4,
      attackKnockback: 680,
      attackLift: 280,
      jumps: 1,
      blockMultiplier: 0.5,
    },
    normalDamage: 8,
    specialDamage: 17,
  },
  {
    id: "windlaeufer",
    name: "Windlaeufer",
    role: "Sky Dancer",
    color: "#54e6e2",
    accent: "#ddfff6",
    accentSecondary: "#88f6ff",
    description: "Leichter Luftrupler mit viel Kontrolle in der Vertikalen und konstantem Drift.",
    designDescription: "Tuerkises Strichmaennchen mit Windspiralen, hellen Luftbaendern an den Fuessen und fliessenden Bewegungsstreifen.",
    normalAttackName: "Windkick",
    normalAttackDescription: "Ein luftiger Kick mit halbmondfoermiger Windkante.",
    specialName: "Tornadostoss",
    specialDescription: "Ein wirbelnder Luftschub schiebt Gegner mit mehreren Spiralboegen vom Mittelpunkt weg.",
    abilityName: "Luftgleiten",
    abilityDescription: "Verlangsamt den Fall deutlich und gibt fuer kurze Zeit sehr viel Luftkontrolle ueber der Plattformkante.",
    pros: "Hohe Beweglichkeit, starke Erholung, gutes Edge-Spiel.",
    cons: "Leicht und mit geringerer Stabilitaet unter Druck.",
    statsText: ["Tempo: Hoch", "Gewicht: Leicht", "Reichweite: Mittel", "Luftkontrolle: Maximal"],
    gameplay: {
      moveSpeed: 402,
      airSpeed: 376,
      acceleration: 2660,
      airAcceleration: 1880,
      friction: 2360,
      airDrag: 430,
      jumpForce: 826,
      resistance: 0.88,
      attackCooldown: 0.27,
      specialCooldown: 3.8,
      abilityCooldown: 6.6,
      abilityDuration: 3.4,
      attackKnockback: 520,
      attackLift: 300,
      jumps: 2,
      blockMultiplier: 0.49,
    },
    normalDamage: 6,
    specialDamage: 13,
  },
  {
    id: "titan",
    name: "Titan",
    role: "Bronze Colossus",
    color: "#8f6639",
    accent: "#ffcf84",
    accentSecondary: "#fff0ce",
    description: "Ein massiver Koloss mit maximaler Standfestigkeit, schwersten Treffern und brutaler Zonenpraesenz.",
    designDescription: "Riesiges bronzefarbenes Strichmaennchen mit massiver Panzerung, breiten Schultern und schwerer Kernplatte im Oberkoerper.",
    normalAttackName: "Titanenschlag",
    normalAttackDescription: "Ein extrem schwerer Frontschlag mit bronzenem Impact-Ring und Staubfontaene.",
    specialName: "Erdbeben",
    specialDescription: "Ein massiver Bodenschock reisst in einer weiten Stosswelle durch die Arena und zerbricht optisch den Boden unter ihm.",
    abilityName: "Standfestigkeit",
    abilityDescription: "Wird fuer kurze Zeit praktisch unverschiebbar, bleibt aber dabei deutlich traeger als sonst.",
    pros: "Maximale Defensive, enorme Knockback-Werte und starke Kontrolle der Plattformmitte.",
    cons: "Sehr langsam und leicht ausspielbar, wenn er daneben liegt.",
    statsText: ["Tempo: Sehr niedrig", "Gewicht: Maximal", "Reichweite: Hoch", "Defensive: Maximal"],
    gameplay: {
      moveSpeed: 238,
      airSpeed: 204,
      acceleration: 1680,
      airAcceleration: 1120,
      friction: 1980,
      airDrag: 450,
      jumpForce: 666,
      resistance: 1.38,
      attackCooldown: 0.46,
      specialCooldown: 5.4,
      abilityCooldown: 10.8,
      abilityDuration: 4.4,
      attackKnockback: 760,
      attackLift: 320,
      jumps: 1,
      blockMultiplier: 0.32,
    },
    normalDamage: 10,
    specialDamage: 19,
  },
];

const CHARACTER_MAP = Object.fromEntries(CHARACTER_DATA.map((character) => [character.id, character]));
const HEAVY_CHARACTER_IDS = new Set(["tank", "titan"]);
const RANGED_ATTACKER_IDS = new Set(["magier", "blitzkaempfer", "eiswaechter", "feuerlord"]);

const ACTION_NAMES = ["left", "right", "jump", "block", "attack", "special", "ability", "pause"];
const CONTINUOUS_ACTION_NAMES = new Set(["left", "right", "block"]);
const PRESSED_ACTION_NAMES = new Set(["jump", "attack", "special", "ability", "pause"]);

function createActionFlags() {
  return {
    left: false,
    right: false,
    jump: false,
    block: false,
    attack: false,
    special: false,
    ability: false,
    pause: false,
  };
}

function createInputBufferState() {
  return {
    jump: 0,
    attack: 0,
    special: 0,
    ability: 0,
  };
}

function syncActionBooleans(action) {
  action.left = Boolean(action.heldActions.left);
  action.right = Boolean(action.heldActions.right);
  action.jump = Boolean(action.pressedActions.jump);
  action.block = Boolean(action.heldActions.block);
  action.attack = Boolean(action.pressedActions.attack);
  action.special = Boolean(action.pressedActions.special);
  action.ability = Boolean(action.pressedActions.ability);
  action.pause = Boolean(action.pressedActions.pause);
  action.jumpPressed = action.jump;
  action.attackPressed = action.attack;
  action.specialPressed = action.special;
  action.abilityPressed = action.ability;
  action.pausePressed = action.pause;
  return action;
}

function DEFAULT_ACTION() {
  return syncActionBooleans({
    heldActions: createActionFlags(),
    pressedActions: createActionFlags(),
    releasedActions: createActionFlags(),
    left: false,
    right: false,
    jump: false,
    block: false,
    attack: false,
    special: false,
    ability: false,
    pause: false,
    jumpPressed: false,
    attackPressed: false,
    specialPressed: false,
    abilityPressed: false,
    pausePressed: false,
  });
}

function mergeActionStates(...actions) {
  const merged = DEFAULT_ACTION();

  for (const action of actions) {
    if (!action) {
      continue;
    }

    const normalized = cloneAction(action);
    for (const actionName of ACTION_NAMES) {
      merged.heldActions[actionName] = merged.heldActions[actionName] || normalized.heldActions[actionName];
      merged.pressedActions[actionName] = merged.pressedActions[actionName] || normalized.pressedActions[actionName];
      merged.releasedActions[actionName] = merged.releasedActions[actionName] || normalized.releasedActions[actionName];
    }
  }

  return syncActionBooleans(merged);
}

const appState = {
  screen: "mainMenu",
  mode: null,
  botDifficulty: "medium",
  inputSelections: {
    player1: "keyboard",
    player2: "keyboard",
  },
  selectingSlot: 1,
  selectedCharacterId: CHARACTER_DATA[0].id,
  selections: {
    player1: null,
    player2: null,
  },
  lastSelections: {
    player1: CHARACTER_DATA[0].id,
    player2: CHARACTER_DATA[1].id,
  },
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function approach(current, target, amount) {
  if (current < target) {
    return Math.min(current + amount, target);
  }
  return Math.max(current - amount, target);
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function chance(value) {
  return Math.random() < value;
}

function getInputChoiceLabel(choice, slot) {
  if (choice === "keyboard") {
    return slot === 2 ? "Tastatur P2" : "Tastatur P1";
  }
  if (choice === "touch") {
    return slot === 2 ? "Handy Touch P2" : "Handy Touch P1";
  }
  return INPUT_LABELS[choice] ?? "Unbekannt";
}

function getBotDifficultyConfig(key) {
  return BOT_DIFFICULTIES[key] ?? BOT_DIFFICULTIES.medium;
}

function getControllerSlotFromChoice(choice) {
  if (choice === "controller0" || choice === "controller0ps" || choice === "controller0xbox") {
    return 0;
  }
  if (choice === "controller1" || choice === "controller1ps" || choice === "controller1xbox") {
    return 1;
  }
  return null;
}

function isControllerChoice(choice) {
  return getControllerSlotFromChoice(choice) !== null;
}

function getControllerSchemeFromChoice(choice) {
  if (choice?.endsWith("xbox")) {
    return "xbox";
  }
  if (choice?.endsWith("ps")) {
    return "ps";
  }
  return "generic";
}

function detectControllerFamilyFromId(id = "") {
  const lowered = id.toLowerCase();
  if (lowered.includes("xbox") || lowered.includes("xinput")) {
    return "xbox";
  }
  if (PLAYSTATION_ID_HINTS.some((hint) => lowered.includes(hint))) {
    return "ps";
  }
  return "generic";
}

function getControllerHelpTextForScheme(scheme) {
  if (scheme === "ps") {
    return PS_CONTROLLER_HELP_TEXT;
  }
  if (scheme === "xbox") {
    return XBOX_CONTROLLER_HELP_TEXT;
  }
  return GENERIC_CONTROLLER_HELP_TEXT;
}

function showScreen(screenName) {
  appState.screen = screenName;
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[screenName].classList.add("active");
}

function formatKeyCode(code) {
  const map = {
    KeyA: "A",
    KeyD: "D",
    KeyW: "W",
    KeyS: "S",
    KeyF: "F",
    KeyG: "G",
    KeyH: "H",
    ArrowLeft: "Links",
    ArrowRight: "Rechts",
    ArrowUp: "Hoch",
    ArrowDown: "Runter",
    KeyK: "K",
    KeyL: "L",
    KeyM: "M",
    Semicolon: "Oe",
    Escape: "ESC",
  };
  return map[code] ?? code;
}

function getKeyboardControlTextForSlot(slot, botSlot = false) {
  if (botSlot) {
    return "Im Bot-Modus steuert die KI den Slot. Lokal: Pfeile links/rechts bewegen, Pfeil hoch springen, Pfeil runter blocken, K normal, L Spezial, M oder Oe Faehigkeit.";
  }

  if (slot === 1) {
    return "A/D bewegen, W springen, S blocken, F normaler Angriff, G Spezialangriff, H neue Faehigkeit.";
  }

  return "Pfeile links/rechts bewegen, Pfeil hoch springen, Pfeil runter blocken, K normaler Angriff, L Spezialangriff, M oder Oe neue Faehigkeit.";
}

function getControllerControlText(botSlot = false, scheme = "generic") {
  if (botSlot) {
    return "Im Bot-Modus uebernimmt die KI den Slot. Lokal oder gegen einen Menschen funktionieren Ps-, Xbox- und andere kompatible Controller ueber die Standard-Gamepad-Steuerung.";
  }

  if (scheme === "generic") {
    return `${PS_CONTROLLER_HELP_TEXT}. Xbox: ${XBOX_CONTROLLER_HELP_TEXT}.`;
  }

  return `${getControllerHelpTextForScheme(scheme)}.`;
}

function getTouchControlText() {
  return TOUCH_HELP_TEXT;
}

function getActionLabel(actionKey) {
  return ACTION_LABELS[actionKey] ?? actionKey;
}

function getControllerFamilyLabel(family) {
  if (family === "ps") {
    return "Ps";
  }
  if (family === "xbox") {
    return "Xbox";
  }
  return "Controller";
}

function getControllerStateForSlot(slot) {
  if (typeof inputManager === "undefined") {
    return null;
  }
  return inputManager.gamepads[slot] ?? null;
}

function getConnectedControllerFamily(slot) {
  const state = getControllerStateForSlot(slot);
  if (!state || !state.connected) {
    return null;
  }
  return detectControllerFamilyFromId(state.id);
}

function getResolvedControllerScheme(choice) {
  const slot = getControllerSlotFromChoice(choice);
  if (slot === null) {
    return getControllerSchemeFromChoice(choice);
  }

  const detectedFamily = getConnectedControllerFamily(slot);
  if (detectedFamily && detectedFamily !== "generic") {
    return detectedFamily;
  }

  return getControllerSchemeFromChoice(choice);
}

function isControllerChoiceCompatible(choice) {
  const slot = getControllerSlotFromChoice(choice);
  if (slot === null) {
    return true;
  }

  const state = getControllerStateForSlot(slot);
  if (!state || !state.connected) {
    return false;
  }

  const expectedFamily = getControllerSchemeFromChoice(choice);
  if (expectedFamily === "generic") {
    return true;
  }

  const detectedFamily = detectControllerFamilyFromId(state.id);
  return detectedFamily === expectedFamily || detectedFamily === "generic";
}

function getControllerSourceLabel(slot, id = "") {
  const family = detectControllerFamilyFromId(id);
  const familyLabel = getControllerFamilyLabel(family);
  return family === "generic" ? `Controller ${slot + 1}` : `${familyLabel} Controller ${slot + 1}`;
}

function formatAxisValue(value) {
  return Number.isFinite(value) ? value.toFixed(2) : "0.00";
}

function getPressedButtonIndices(state) {
  if (!state?.buttonsDown) {
    return [];
  }

  const indices = [];
  for (let index = 0; index < state.buttonsDown.length; index += 1) {
    if (state.buttonsDown[index]) {
      indices.push(index);
    }
  }
  return indices;
}

function getControllerActionLabels(state) {
  if (!state?.connected) {
    return [];
  }

  const labels = [];
  const axisX = Math.abs(state.axes?.[0] ?? 0) > GAMEPAD_AXIS_THRESHOLD ? state.axes[0] : 0;

  if (axisX < -GAMEPAD_AXIS_THRESHOLD || state.buttonsDown[14]) {
    labels.push("Left");
  }
  if (axisX > GAMEPAD_AXIS_THRESHOLD || state.buttonsDown[15]) {
    labels.push("Right");
  }
  if (state.buttonsDown[0]) {
    labels.push("Jump");
  }
  if (state.buttonsDown[1]) {
    labels.push("Attack");
  }
  if (state.buttonsDown[2]) {
    labels.push("Special");
  }
  if (state.buttonsDown[3]) {
    labels.push("Ability");
  }
  if (state.buttonsDown[4]) {
    labels.push("Block");
  }
  if (state.buttonsDown[9]) {
    labels.push("Pause");
  }

  return labels;
}

function reportInputTest(source, actionKey, detail = "") {
  if (!ui.inputTestAction || !ui.inputTestSource) {
    return;
  }

  ui.inputTestAction.textContent = getActionLabel(actionKey);
  ui.inputTestSource.textContent = detail ? `${source} - ${detail}` : source;
}

function getKeyboardTestInfo(code) {
  const layouts = [
    { source: "Tastatur P1", mapping: KEYBOARD_LAYOUTS.player1 },
    { source: "Tastatur P2", mapping: KEYBOARD_LAYOUTS.player2 },
  ];

  for (const layout of layouts) {
    const { source, mapping } = layout;
    if (code === mapping.left) {
      return { source, action: "left" };
    }
    if (code === mapping.right) {
      return { source, action: "right" };
    }
    if (code === mapping.jump) {
      return { source, action: "jump" };
    }
    if (code === mapping.block) {
      return { source, action: "block" };
    }
    if (code === mapping.attack) {
      return { source, action: "attack" };
    }
    if (code === mapping.special) {
      return { source, action: "special" };
    }
    if (mapping.ability.includes(code)) {
      return { source, action: "ability" };
    }
    if (mapping.pause.includes(code)) {
      return { source, action: "pause" };
    }
  }

  return null;
}

function cloneAction(action = DEFAULT_ACTION()) {
  const cloned = DEFAULT_ACTION();

  for (const actionName of ACTION_NAMES) {
    cloned.heldActions[actionName] = Boolean(
      action.heldActions?.[actionName] ??
      (CONTINUOUS_ACTION_NAMES.has(actionName) ? action[actionName] : false),
    );
    cloned.pressedActions[actionName] = Boolean(
      action.pressedActions?.[actionName] ??
      (PRESSED_ACTION_NAMES.has(actionName) ? (action[actionName] ?? action[`${actionName}Pressed`]) : false),
    );
    cloned.releasedActions[actionName] = Boolean(action.releasedActions?.[actionName]);
  }

  return syncActionBooleans(cloned);
}

function focusBattleCanvas() {
  if (typeof canvas.focus === "function") {
    canvas.focus({ preventScroll: true });
  }
}

class SoundManager {
  constructor() {
    this.context = null;
    this.unlocked = false;
  }

  unlock() {
    if (!window.AudioContext && !window.webkitAudioContext) {
      return;
    }

    if (!this.context) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.context = new AudioContextClass();
    }

    if (this.context.state === "suspended") {
      this.context.resume();
    }

    this.unlocked = true;
  }

  beep({ frequency, duration, type = "sine", volume = 0.03, frequencyEnd = null }) {
    if (!this.unlocked || !this.context) {
      return;
    }

    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const now = this.context.currentTime;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);

    if (frequencyEnd !== null) {
      oscillator.frequency.exponentialRampToValueAtTime(Math.max(40, frequencyEnd), now + duration);
    }

    gainNode.gain.setValueAtTime(volume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  play(name) {
    switch (name) {
      case "jump":
        this.beep({ frequency: 390, duration: 0.08, type: "triangle", volume: 0.03, frequencyEnd: 560 });
        break;
      case "attack":
        this.beep({ frequency: 210, duration: 0.08, type: "sawtooth", volume: 0.03, frequencyEnd: 150 });
        break;
      case "hit":
        this.beep({ frequency: 165, duration: 0.11, type: "square", volume: 0.04, frequencyEnd: 90 });
        break;
      case "block":
        this.beep({ frequency: 720, duration: 0.06, type: "triangle", volume: 0.024, frequencyEnd: 520 });
        break;
      case "special":
        this.beep({ frequency: 580, duration: 0.16, type: "sawtooth", volume: 0.045, frequencyEnd: 240 });
        break;
      case "ability":
        this.beep({ frequency: 490, duration: 0.14, type: "triangle", volume: 0.038, frequencyEnd: 820 });
        break;
      case "ringout":
        this.beep({ frequency: 150, duration: 0.24, type: "square", volume: 0.05, frequencyEnd: 60 });
        break;
      case "victory":
        this.beep({ frequency: 520, duration: 0.18, type: "triangle", volume: 0.04, frequencyEnd: 760 });
        setTimeout(() => {
          this.beep({ frequency: 760, duration: 0.18, type: "triangle", volume: 0.035, frequencyEnd: 960 });
        }, 100);
        break;
      default:
        break;
    }
  }
}

class Particle {
  constructor(x, y, options = {}) {
    this.x = x;
    this.y = y;
    this.vx = options.vx ?? randomRange(-120, 120);
    this.vy = options.vy ?? randomRange(-140, 40);
    this.gravity = options.gravity ?? 420;
    this.drag = options.drag ?? 0.98;
    this.life = options.life ?? 0.35;
    this.maxLife = this.life;
    this.size = options.size ?? randomRange(2, 5);
    this.color = options.color ?? "#48f3ff";
    this.shape = options.shape ?? "dot";
    this.rotation = options.rotation ?? randomRange(0, Math.PI * 2);
    this.spin = options.spin ?? randomRange(-6, 6);
  }

  update(dt) {
    this.vx *= this.drag;
    this.vy = this.vy * this.drag + this.gravity * dt;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.rotation += this.spin * dt;
    this.life -= dt;
  }

  draw(context) {
    const alpha = clamp(this.life / this.maxLife, 0, 1);
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.globalAlpha = alpha;
    context.shadowBlur = this.shape === "smoke" ? 18 : 12;
    context.shadowColor = this.color;
    context.strokeStyle = this.color;
    context.fillStyle = this.color;

    switch (this.shape) {
      case "smoke":
        context.globalAlpha = alpha * 0.45;
        context.beginPath();
        context.arc(0, 0, this.size * 1.8, 0, Math.PI * 2);
        context.fill();
        break;
      case "streak":
        context.lineWidth = Math.max(2, this.size * 0.7);
        context.beginPath();
        context.moveTo(-this.size * 2.2, 0);
        context.lineTo(this.size * 2.2, 0);
        context.stroke();
        break;
      case "rune":
        context.lineWidth = 1.8;
        context.strokeRect(-this.size, -this.size, this.size * 2, this.size * 2);
        context.beginPath();
        context.moveTo(-this.size, 0);
        context.lineTo(this.size, 0);
        context.moveTo(0, -this.size);
        context.lineTo(0, this.size);
        context.stroke();
        break;
      case "dust":
        context.globalAlpha = alpha * 0.4;
        context.beginPath();
        context.arc(0, 0, this.size * 1.4, 0, Math.PI * 2);
        context.fill();
        break;
      case "ring":
        context.lineWidth = 2;
        context.beginPath();
        context.arc(0, 0, this.size * 1.6, 0, Math.PI * 2);
        context.stroke();
        break;
      default:
        context.beginPath();
        context.arc(0, 0, this.size, 0, Math.PI * 2);
        context.fill();
        break;
    }

    context.restore();
  }
}

class AttackEntity {
  constructor(options) {
    this.owner = options.owner;
    this.type = options.type ?? "box";
    this.visual = options.visual ?? "impact";
    this.color = options.color ?? this.owner.character.accent;
    this.secondaryColor = options.secondaryColor ?? this.owner.character.accentSecondary;
    this.x = options.x ?? this.owner.x;
    this.y = options.y ?? this.owner.y;
    this.width = options.width ?? 80;
    this.height = options.height ?? 50;
    this.radius = options.radius ?? 34;
    this.maxRadius = options.maxRadius ?? this.radius;
    this.expansion = options.expansion ?? 0;
    this.offsetX = options.offsetX ?? 0;
    this.offsetY = options.offsetY ?? 0;
    this.followOwner = Boolean(options.followOwner);
    this.vx = options.vx ?? 0;
    this.vy = options.vy ?? 0;
    this.ttl = options.ttl ?? 0.18;
    this.maxLife = this.ttl;
    this.knockbackX = options.knockbackX ?? 520;
    this.knockbackY = options.knockbackY ?? 220;
    this.damage = options.damage ?? 8;
    this.flash = Boolean(options.flash);
    this.alreadyHit = new Set();
  }

  update(dt) {
    this.ttl -= dt;

    if (this.followOwner) {
      this.x = this.owner.x + this.offsetX * this.owner.facing;
      this.y = this.owner.y + this.offsetY;
    } else {
      this.x += this.vx * dt;
      this.y += this.vy * dt;
    }

    if (this.expansion > 0) {
      this.radius = Math.min(this.maxRadius, this.radius + this.expansion * dt);
    }
  }

  collidesWith(player) {
    if (player === this.owner || this.alreadyHit.has(player.id) || player.invulnerableTimer > 0) {
      return false;
    }

    if (this.type === "circle" || this.type === "projectile") {
      const dx = player.x - this.x;
      const dy = player.y - 26 - this.y;
      return Math.hypot(dx, dy) <= player.collisionRadius + this.radius;
    }

    const halfW = this.width / 2;
    const halfH = this.height / 2;
    const nearestX = clamp(player.x, this.x - halfW, this.x + halfW);
    const nearestY = clamp(player.y - 26, this.y - halfH, this.y + halfH);
    const dx = player.x - nearestX;
    const dy = player.y - 26 - nearestY;
    return dx * dx + dy * dy <= player.collisionRadius * player.collisionRadius;
  }

  draw(context) {
    const alpha = clamp(this.ttl / this.maxLife, 0, 1);
    context.save();
    context.globalAlpha = alpha * 0.9;
    context.shadowBlur = this.flash ? 24 : 16;
    context.shadowColor = this.color;

    switch (this.visual) {
      case "slash":
        context.strokeStyle = this.color;
        context.lineWidth = 8;
        context.beginPath();
        context.moveTo(this.x - this.width * 0.4, this.y + this.height * 0.25);
        context.lineTo(this.x + this.width * 0.42, this.y - this.height * 0.28);
        context.stroke();
        context.strokeStyle = this.secondaryColor;
        context.lineWidth = 2.5;
        context.beginPath();
        context.moveTo(this.x - this.width * 0.2, this.y + this.height * 0.3);
        context.lineTo(this.x + this.width * 0.35, this.y - this.height * 0.12);
        context.stroke();
        break;
      case "dash":
        context.fillStyle = this.color;
        context.beginPath();
        context.ellipse(this.x, this.y, this.width * 0.55, this.height * 0.35, 0, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = alpha * 0.4;
        context.fillStyle = this.secondaryColor;
        context.beginPath();
        context.ellipse(this.x - this.owner.facing * 18, this.y, this.width * 0.35, this.height * 0.18, 0, 0, Math.PI * 2);
        context.fill();
        break;
      case "shockwave":
      case "rune-wave":
        context.strokeStyle = this.color;
        context.lineWidth = 4;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.stroke();
        if (this.visual === "rune-wave") {
          context.strokeStyle = this.secondaryColor;
          context.lineWidth = 2;
          for (let index = 0; index < 6; index += 1) {
            const angle = (Math.PI * 2 * index) / 6;
            const px = this.x + Math.cos(angle) * this.radius * 0.82;
            const py = this.y + Math.sin(angle) * this.radius * 0.82;
            context.strokeRect(px - 5, py - 5, 10, 10);
          }
        }
        break;
      case "projectile":
        {
          const gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
          gradient.addColorStop(0, "#ffffff");
          gradient.addColorStop(0.45, this.secondaryColor);
          gradient.addColorStop(1, this.color);
          context.fillStyle = gradient;
          context.beginPath();
          context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          context.fill();
        }
        break;
      case "impact":
        context.fillStyle = this.color;
        context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        context.strokeStyle = this.secondaryColor;
        context.lineWidth = 3;
        context.beginPath();
        context.arc(this.x, this.y, Math.max(this.width, this.height) * 0.28, 0, Math.PI * 2);
        context.stroke();
        break;
      case "electric":
        context.strokeStyle = this.color;
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(this.x - this.radius, this.y + this.height * 0.1);
        context.lineTo(this.x - this.radius * 0.4, this.y - this.height * 0.2);
        context.lineTo(this.x, this.y + this.height * 0.15);
        context.lineTo(this.x + this.radius * 0.34, this.y - this.height * 0.18);
        context.lineTo(this.x + this.radius, this.y + this.height * 0.08);
        context.stroke();
        context.strokeStyle = this.secondaryColor;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(this.x - this.radius * 0.72, this.y - 2);
        context.lineTo(this.x - this.radius * 0.1, this.y - this.height * 0.3);
        context.lineTo(this.x + this.radius * 0.38, this.y - 2);
        context.stroke();
        break;
      case "frost":
        context.strokeStyle = this.secondaryColor;
        context.lineWidth = 3;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.stroke();
        context.strokeStyle = this.color;
        context.lineWidth = 2;
        for (let index = 0; index < 6; index += 1) {
          const angle = (Math.PI * 2 * index) / 6;
          context.beginPath();
          context.moveTo(this.x, this.y);
          context.lineTo(this.x + Math.cos(angle) * this.radius, this.y + Math.sin(angle) * this.radius);
          context.stroke();
        }
        break;
      case "flame":
        context.fillStyle = this.color;
        context.beginPath();
        context.moveTo(this.x - this.radius * 0.85, this.y + this.radius * 0.5);
        context.quadraticCurveTo(this.x - this.radius * 0.35, this.y - this.radius * 1.2, this.x, this.y - this.radius * 0.25);
        context.quadraticCurveTo(this.x + this.radius * 0.28, this.y - this.radius * 1.35, this.x + this.radius * 0.85, this.y + this.radius * 0.36);
        context.closePath();
        context.fill();
        context.fillStyle = this.secondaryColor;
        context.globalAlpha = alpha * 0.65;
        context.beginPath();
        context.moveTo(this.x - this.radius * 0.34, this.y + this.radius * 0.24);
        context.quadraticCurveTo(this.x, this.y - this.radius * 0.84, this.x + this.radius * 0.32, this.y + this.radius * 0.12);
        context.closePath();
        context.fill();
        break;
      case "shadow-burst":
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.strokeStyle = this.secondaryColor;
        context.lineWidth = 3;
        context.beginPath();
        context.arc(this.x, this.y, this.radius * 0.64, 0, Math.PI * 2);
        context.stroke();
        break;
      case "rocket":
        context.fillStyle = this.color;
        context.beginPath();
        context.moveTo(this.x - this.width * 0.42, this.y + this.height * 0.18);
        context.lineTo(this.x + this.width * 0.18, this.y + this.height * 0.18);
        context.lineTo(this.x + this.width * 0.44, this.y);
        context.lineTo(this.x + this.width * 0.18, this.y - this.height * 0.18);
        context.lineTo(this.x - this.width * 0.42, this.y - this.height * 0.18);
        context.closePath();
        context.fill();
        context.strokeStyle = this.secondaryColor;
        context.lineWidth = 2.5;
        context.beginPath();
        context.moveTo(this.x - this.width * 0.48, this.y);
        context.lineTo(this.x - this.width * 0.74, this.y - this.height * 0.18);
        context.moveTo(this.x - this.width * 0.48, this.y);
        context.lineTo(this.x - this.width * 0.74, this.y + this.height * 0.18);
        context.stroke();
        break;
      case "tornado":
        context.strokeStyle = this.color;
        context.lineWidth = 4;
        for (let ring = 0; ring < 3; ring += 1) {
          const radius = this.radius * (0.48 + ring * 0.24);
          context.beginPath();
          context.ellipse(this.x, this.y - ring * 6, radius, radius * 0.42, 0, 0, Math.PI * 2);
          context.stroke();
        }
        context.strokeStyle = this.secondaryColor;
        context.lineWidth = 2;
        context.beginPath();
        context.arc(this.x, this.y, this.radius * 0.55, -1.4, 1.2);
        context.stroke();
        break;
      case "quake":
        context.strokeStyle = this.color;
        context.lineWidth = 5;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.stroke();
        context.strokeStyle = this.secondaryColor;
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(this.x - this.radius * 0.82, this.y);
        context.lineTo(this.x - this.radius * 0.36, this.y - 8);
        context.lineTo(this.x - this.radius * 0.08, this.y + 10);
        context.lineTo(this.x + this.radius * 0.28, this.y - 7);
        context.lineTo(this.x + this.radius * 0.74, this.y + 4);
        context.stroke();
        break;
      case "multi-slash":
        context.strokeStyle = this.color;
        context.lineWidth = 5;
        for (let sweep = -1; sweep <= 1; sweep += 1) {
          context.beginPath();
          context.arc(this.x + sweep * 6, this.y, this.radius * (0.72 + Math.abs(sweep) * 0.12), -1.1 + sweep * 0.28, 1 + sweep * 0.28);
          context.stroke();
        }
        context.strokeStyle = this.secondaryColor;
        context.lineWidth = 2;
        context.beginPath();
        context.arc(this.x, this.y, this.radius * 0.56, -1.4, 1.2);
        context.stroke();
        break;
      case "wind":
      case "dive":
        context.strokeStyle = this.color;
        context.lineWidth = 4;
        context.beginPath();
        context.ellipse(this.x, this.y, this.radius, this.radius * 0.55, 0, 0, Math.PI * 2);
        context.stroke();
        context.strokeStyle = this.secondaryColor;
        context.lineWidth = 2;
        context.beginPath();
        context.arc(this.x, this.y, this.radius * 0.64, -1.6, 1.3);
        context.stroke();
        break;
      default:
        if (this.type === "circle" || this.type === "projectile") {
          context.fillStyle = this.color;
          context.beginPath();
          context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          context.fill();
        } else {
          context.fillStyle = this.color;
          context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        }
        break;
    }

    context.restore();
  }
}

class InputManager {
  constructor() {
    this.keyboardDown = new Set();
    this.keyboardPressed = new Set();
    this.keyboardReleased = new Set();
    this.touchDown = {
      1: new Set(),
      2: new Set(),
    };
    this.touchPressed = {
      1: new Set(),
      2: new Set(),
    };
    this.touchReleased = {
      1: new Set(),
      2: new Set(),
    };
    this.touchPointers = {
      1: new Map(),
      2: new Map(),
    };
    this.gamepads = [this.createGamepadSlot(0), this.createGamepadSlot(1)];
    this.connectedCount = 0;
    this.preventedKeys = new Set([
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "KeyA",
      "KeyD",
      "KeyW",
      "KeyS",
      "KeyF",
      "KeyG",
      "KeyH",
      "KeyK",
      "KeyL",
      "KeyM",
      "Semicolon",
      "Escape",
    ]);

    document.addEventListener("keydown", (event) => this.onKeyDown(event));
    document.addEventListener("keyup", (event) => this.onKeyUp(event));
    window.addEventListener("gamepadconnected", () => this.pollGamepads());
    window.addEventListener("gamepaddisconnected", () => this.pollGamepads());
    this.bindTouchButtons(ui.touchButtons);
  }

  createGamepadSlot(slot) {
    return {
      slot,
      connected: false,
      physicalIndex: -1,
      id: "",
      axes: [0, 0],
      digitalDown: {
        left: false,
        right: false,
      },
      digitalPressed: {
        left: false,
        right: false,
      },
      digitalReleased: {
        left: false,
        right: false,
      },
      previousAxes: [0, 0],
      previousButtons: Array(18).fill(false),
      buttonsDown: Array(18).fill(false),
      buttonsPressed: Array(18).fill(false),
      buttonsReleased: Array(18).fill(false),
      calibrationMapping: { ...DEFAULT_CONTROLLER_CALIBRATION },
    };
  }

  onKeyDown(event) {
    if (this.preventedKeys.has(event.code)) {
      event.preventDefault();
    }

    this.keyboardReleased.delete(event.code);
    if (!this.keyboardDown.has(event.code)) {
      this.keyboardPressed.add(event.code);
    }
    this.keyboardDown.add(event.code);

    const keyboardTest = getKeyboardTestInfo(event.code);
    if (keyboardTest) {
      reportInputTest(keyboardTest.source, keyboardTest.action);
    }
  }

  onKeyUp(event) {
    if (this.preventedKeys.has(event.code)) {
      event.preventDefault();
    }
    if (this.keyboardDown.has(event.code)) {
      this.keyboardReleased.add(event.code);
    }
    this.keyboardDown.delete(event.code);
  }

  bindTouchButtons(buttons) {
    buttons.forEach((button) => {
      const actionName = button.dataset.touchAction;
      const touchPlayer = Number(button.dataset.touchPlayer || "1");
      if (!actionName || !this.touchDown[touchPlayer] || !this.touchPressed[touchPlayer]) {
        return;
      }

      const pointerRegistry = this.touchPointers[touchPlayer];
      if (!pointerRegistry.has(actionName)) {
        pointerRegistry.set(actionName, new Set());
      }
      const activePointers = pointerRegistry.get(actionName);

      const release = (event) => {
        if (event) {
          event.preventDefault();
        }
        if (event && activePointers.has(event.pointerId)) {
          activePointers.delete(event.pointerId);
        }
        if (activePointers.size === 0) {
          if (this.touchDown[touchPlayer].delete(actionName)) {
            this.touchReleased[touchPlayer].add(actionName);
          }
          button.classList.remove("active");
        }
      };

      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        const wasActive = this.touchDown[touchPlayer].has(actionName);
        this.touchReleased[touchPlayer].delete(actionName);
        activePointers.add(event.pointerId);
        if (!wasActive) {
          this.touchPressed[touchPlayer].add(actionName);
        }
        this.touchDown[touchPlayer].add(actionName);
        button.classList.add("active");
        if (button.setPointerCapture) {
          button.setPointerCapture(event.pointerId);
        }
      });

      button.addEventListener("pointerup", release);
      button.addEventListener("pointercancel", release);
      button.addEventListener("lostpointercapture", release);
      button.addEventListener("contextmenu", (event) => event.preventDefault());
    });
  }

  pollGamepads() {
    const rawPads = navigator.getGamepads ? Array.from(navigator.getGamepads()) : [];
    const connectedPads = rawPads
      .filter((pad) => pad && pad.connected)
      .sort((left, right) => (left.index ?? 0) - (right.index ?? 0));
    this.connectedCount = connectedPads.length;

    const assignedPads = Array(this.gamepads.length).fill(null);
    const usedPhysicalIndices = new Set();

    for (let slot = 0; slot < this.gamepads.length; slot += 1) {
      const state = this.gamepads[slot];
      if (state.physicalIndex < 0) {
        continue;
      }

      const matchingPad = connectedPads.find((pad) => pad.index === state.physicalIndex);
      if (matchingPad) {
        assignedPads[slot] = matchingPad;
        usedPhysicalIndices.add(matchingPad.index);
      }
    }

    for (let slot = 0; slot < this.gamepads.length; slot += 1) {
      if (assignedPads[slot]) {
        continue;
      }

      const fallbackPad = connectedPads.find((pad) => !usedPhysicalIndices.has(pad.index)) ?? null;
      if (fallbackPad) {
        assignedPads[slot] = fallbackPad;
        usedPhysicalIndices.add(fallbackPad.index);
      }
    }

    for (let slot = 0; slot < this.gamepads.length; slot += 1) {
      const state = this.gamepads[slot];
      const rawPad = assignedPads[slot];

      if (rawPad && rawPad.connected) {
        state.connected = true;
        state.physicalIndex = rawPad.index ?? slot;
        state.id = rawPad.id || `Controller ${slot + 1}`;
        state.axes = [rawPad.axes[0] ?? 0, rawPad.axes[1] ?? 0];
        const buttonCount = Math.max(rawPad.buttons?.length ?? 0, state.buttonsDown.length, 18);
        const nextButtonsDown = Array(buttonCount).fill(false);
        const nextButtonsPressed = Array(buttonCount).fill(false);
        const nextButtonsReleased = Array(buttonCount).fill(false);
        let reportedAction = null;

        for (let index = 0; index < nextButtonsDown.length; index += 1) {
          const button = rawPad.buttons[index];
          const isDown = Boolean(button && (button.pressed || button.value > 0.5));
          nextButtonsDown[index] = isDown;
          nextButtonsPressed[index] = isDown && !state.previousButtons[index];
          nextButtonsReleased[index] = !isDown && state.previousButtons[index];
          if (!reportedAction && nextButtonsPressed[index] && GAMEPAD_ACTION_BUTTONS[index]) {
            reportedAction = GAMEPAD_ACTION_BUTTONS[index];
          }
        }

        state.buttonsDown = nextButtonsDown;
        state.buttonsPressed = nextButtonsPressed;
        state.buttonsReleased = nextButtonsReleased;

        const axisX = Math.abs(state.axes[0]) > GAMEPAD_AXIS_THRESHOLD ? state.axes[0] : 0;
        const leftDown = axisX < -GAMEPAD_AXIS_THRESHOLD || state.buttonsDown[14];
        const rightDown = axisX > GAMEPAD_AXIS_THRESHOLD || state.buttonsDown[15];
        const leftPressed = leftDown && !state.digitalDown.left;
        const rightPressed = rightDown && !state.digitalDown.right;
        const leftReleased = !leftDown && state.digitalDown.left;
        const rightReleased = !rightDown && state.digitalDown.right;
        state.digitalPressed.left = leftPressed;
        state.digitalPressed.right = rightPressed;
        state.digitalReleased.left = leftReleased;
        state.digitalReleased.right = rightReleased;
        state.digitalDown.left = leftDown;
        state.digitalDown.right = rightDown;

        if (!reportedAction && leftPressed) {
          reportedAction = "left";
        }
        if (!reportedAction && rightPressed) {
          reportedAction = "right";
        }

        state.previousButtons = nextButtonsDown.slice();
        state.previousAxes = state.axes.slice();

        if (reportedAction) {
          reportInputTest(getControllerSourceLabel(slot, state.id), reportedAction, state.id);
        }
      } else {
        state.connected = false;
        state.physicalIndex = -1;
        state.id = "";
        state.axes = [0, 0];
        state.digitalDown.left = false;
        state.digitalDown.right = false;
        state.digitalPressed.left = false;
        state.digitalPressed.right = false;
        state.digitalReleased.left = false;
        state.digitalReleased.right = false;
        state.previousAxes = [0, 0];
        state.previousButtons = Array(state.previousButtons.length).fill(false);
        state.buttonsDown = Array(state.buttonsDown.length).fill(false);
        state.buttonsPressed = Array(state.buttonsPressed.length).fill(false);
        state.buttonsReleased = Array(state.buttonsReleased.length).fill(false);
      }
    }
  }

  hasController(slot) {
    return Boolean(this.gamepads[slot] && this.gamepads[slot].connected);
  }

  clearTouchSlot(slot) {
    if (!this.touchDown[slot] || !this.touchPressed[slot] || !this.touchReleased[slot] || !this.touchPointers[slot]) {
      return;
    }
    this.touchDown[slot].clear();
    this.touchPressed[slot].clear();
    this.touchReleased[slot].clear();
    this.touchPointers[slot].forEach((pointerSet) => pointerSet.clear());
  }

  isCodeDown(code) {
    return this.keyboardDown.has(code);
  }

  isCodePressed(code) {
    return this.keyboardPressed.has(code);
  }

  isAnyCodePressed(codes) {
    return codes.some((code) => this.keyboardPressed.has(code));
  }

  getGamepadAction(slot) {
    const pad = this.gamepads[slot];
    const action = DEFAULT_ACTION();

    if (!pad || !pad.connected) {
      return action;
    }

    const axisX = Math.abs(pad.axes[0]) > GAMEPAD_AXIS_THRESHOLD ? pad.axes[0] : 0;
    const mapping = pad.calibrationMapping ?? DEFAULT_CONTROLLER_CALIBRATION;
    action.heldActions.left = axisX < -GAMEPAD_AXIS_THRESHOLD || pad.buttonsDown[mapping.left];
    action.heldActions.right = axisX > GAMEPAD_AXIS_THRESHOLD || pad.buttonsDown[mapping.right];
    action.heldActions.jump = pad.buttonsDown[mapping.jump];
    action.heldActions.block = pad.buttonsDown[mapping.block];
    action.heldActions.attack = pad.buttonsDown[mapping.attack];
    action.heldActions.special = pad.buttonsDown[mapping.special];
    action.heldActions.ability = pad.buttonsDown[mapping.ability];
    action.heldActions.pause = pad.buttonsDown[mapping.pause];
    action.pressedActions.left = pad.digitalPressed.left;
    action.pressedActions.right = pad.digitalPressed.right;
    action.pressedActions.jump = pad.buttonsPressed[mapping.jump];
    action.pressedActions.block = pad.buttonsPressed[mapping.block];
    action.pressedActions.attack = pad.buttonsPressed[mapping.attack];
    action.pressedActions.special = pad.buttonsPressed[mapping.special];
    action.pressedActions.ability = pad.buttonsPressed[mapping.ability];
    action.pressedActions.pause = pad.buttonsPressed[mapping.pause];
    action.releasedActions.left = pad.digitalReleased.left;
    action.releasedActions.right = pad.digitalReleased.right;
    action.releasedActions.jump = pad.buttonsReleased[mapping.jump];
    action.releasedActions.block = pad.buttonsReleased[mapping.block];
    action.releasedActions.attack = pad.buttonsReleased[mapping.attack];
    action.releasedActions.special = pad.buttonsReleased[mapping.special];
    action.releasedActions.ability = pad.buttonsReleased[mapping.ability];
    action.releasedActions.pause = pad.buttonsReleased[mapping.pause];
    return syncActionBooleans(action);
  }

  getKeyboardAction(slot) {
    const mapping = slot === 2 ? KEYBOARD_LAYOUTS.player2 : KEYBOARD_LAYOUTS.player1;
    const action = DEFAULT_ACTION();
    action.heldActions.left = this.isCodeDown(mapping.left);
    action.heldActions.right = this.isCodeDown(mapping.right);
    action.heldActions.jump = this.isCodeDown(mapping.jump);
    action.heldActions.block = this.isCodeDown(mapping.block);
    action.heldActions.attack = this.isCodeDown(mapping.attack);
    action.heldActions.special = this.isCodeDown(mapping.special);
    action.heldActions.ability = mapping.ability.some((code) => this.isCodeDown(code));
    action.heldActions.pause = mapping.pause.some((code) => this.isCodeDown(code));
    action.pressedActions.left = this.isCodePressed(mapping.left);
    action.pressedActions.right = this.isCodePressed(mapping.right);
    action.pressedActions.jump = this.isCodePressed(mapping.jump);
    action.pressedActions.block = this.isCodePressed(mapping.block);
    action.pressedActions.attack = this.isCodePressed(mapping.attack);
    action.pressedActions.special = this.isCodePressed(mapping.special);
    action.pressedActions.ability = this.isAnyCodePressed(mapping.ability);
    action.pressedActions.pause = this.isAnyCodePressed(mapping.pause);
    action.releasedActions.left = this.keyboardReleased.has(mapping.left);
    action.releasedActions.right = this.keyboardReleased.has(mapping.right);
    action.releasedActions.jump = this.keyboardReleased.has(mapping.jump);
    action.releasedActions.block = this.keyboardReleased.has(mapping.block);
    action.releasedActions.attack = this.keyboardReleased.has(mapping.attack);
    action.releasedActions.special = this.keyboardReleased.has(mapping.special);
    action.releasedActions.ability = mapping.ability.some((code) => this.keyboardReleased.has(code));
    action.releasedActions.pause = mapping.pause.some((code) => this.keyboardReleased.has(code));
    return syncActionBooleans(action);
  }

  getTouchAction(slot) {
    if (appState.mode === "bot" && slot === 2) {
      return DEFAULT_ACTION();
    }

    const touchDown = this.touchDown[slot] ?? this.touchDown[1];
    const touchPressed = this.touchPressed[slot] ?? this.touchPressed[1];
    const touchReleased = this.touchReleased[slot] ?? this.touchReleased[1];
    const action = DEFAULT_ACTION();
    for (const actionName of ACTION_NAMES) {
      action.heldActions[actionName] = touchDown.has(actionName);
      action.pressedActions[actionName] = touchPressed.has(actionName);
      action.releasedActions[actionName] = touchReleased.has(actionName);
    }
    return syncActionBooleans(action);
  }

  getActionForChoice(choice, slot) {
    const actionSources = [];

    if (choice === "keyboard") {
      actionSources.push(this.getKeyboardAction(slot));
    }
    if (choice === "touch") {
      actionSources.push(this.getTouchAction(slot));
    }

    const controllerSlot = getControllerSlotFromChoice(choice);
    if (controllerSlot !== null) {
      actionSources.push(this.getGamepadAction(controllerSlot));
    }

    return actionSources.length > 0 ? mergeActionStates(...actionSources) : DEFAULT_ACTION();
  }

  getPausePressedForBattle(players) {
    if (this.isCodePressed("Escape")) {
      return true;
    }

    return players.some((player) => {
      if (player.isBot) {
        return false;
      }

      return this.getActionForChoice(player.inputChoice, player.slot).pause;
    });
  }

  endFrame() {
    this.keyboardPressed.clear();
    this.keyboardReleased.clear();
    this.touchPressed[1].clear();
    this.touchPressed[2].clear();
    this.touchReleased[1].clear();
    this.touchReleased[2].clear();
    for (const pad of this.gamepads) {
      pad.buttonsPressed.fill(false);
      pad.buttonsReleased.fill(false);
      pad.digitalPressed.left = false;
      pad.digitalPressed.right = false;
      pad.digitalReleased.left = false;
      pad.digitalReleased.right = false;
    }
  }
}

function createBotMemory(profile) {
  return {
    move: 0,
    block: false,
    attackQueued: false,
    specialQueued: false,
    abilityQueued: false,
    jumpQueued: false,
    nextDecisionIn: randomRange(profile.decisionMin, profile.decisionMax),
    hesitationIn: randomRange(profile.hesitationMin, profile.hesitationMax),
    panicIn: randomRange(profile.panicMin, profile.panicMax),
  };
}

class Player {
  constructor(slot, character, inputChoice, isBot = false, botDifficultyKey = "medium") {
    this.slot = slot;
    this.id = `player-${slot}`;
    this.label = isBot ? "Bot" : `Spieler ${slot}`;
    this.character = character;
    this.inputChoice = inputChoice;
    this.isBot = isBot;
    this.botDifficulty = getBotDifficultyConfig(botDifficultyKey);
    this.stats = character.gameplay;
    this.color = character.color;
    this.accent = character.accent;
    this.secondary = character.accentSecondary;
    this.collisionRadius = slot === 1 ? 26 : 27;
    this.botMemory = createBotMemory(this.botDifficulty.ai);
    this.resetForMatch();
  }

  resetForMatch() {
    this.lives = GAME.stockLives;
    this.specialCooldown = 0;
    this.abilityCooldown = 0;
    this.inputState = DEFAULT_ACTION();
    this.inputBuffer = createInputBufferState();
    this.resetStockState();
  }

  resetStockState() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.facing = this.slot === 1 ? 1 : -1;
    this.onGround = false;
    this.jumpsUsed = 0;
    this.bonusJumpsAvailable = 0;
    this.attackCooldown = 0;
    this.damagePercent = 0;
    this.blocking = false;
    this.attackPoseTimer = 0;
    this.lockTimer = 0;
    this.hitTimer = 0;
    this.invulnerableTimer = 0.5;
    this.spawnFlash = 0.3;
    this.effectTimer = 0;
    this.specialDiveTimer = 0;
    this.rageTimer = 0;
    this.shieldTimer = 0;
    this.unstoppableTimer = 0;
    this.featherWindowTimer = 0;
    this.counterWindowTimer = 0;
    this.invisibleTimer = 0;
    this.surgeTrailTimer = 0;
    this.frozenTimer = 0;
    this.burnAuraTimer = 0;
    this.illusionTimer = 0;
    this.overloadTimer = 0;
    this.bloodrushTimer = 0;
    this.glideTimer = 0;
    this.standfastTimer = 0;
    this.inputBuffer = createInputBufferState();
  }

  spawn(x, y, facing) {
    this.resetStockState();
    this.x = x;
    this.y = y;
    this.facing = facing;
  }

  getMissingLives() {
    return Math.max(0, GAME.stockLives - this.lives);
  }

  getBerserkerBoost() {
    if (this.character.id !== "berserker" || this.bloodrushTimer <= 0) {
      return 1;
    }

    const missingLivesBoost = this.getMissingLives() * 0.13;
    const damageBoost = Math.min(this.damagePercent, 180) * 0.0011;
    return 1 + missingLivesBoost + damageBoost;
  }

  getMoveSpeed() {
    let speed = this.stats.moveSpeed;

    if (this.character.id === "tank" && this.unstoppableTimer > 0) {
      speed *= 0.78;
    }
    if (this.character.id === "titan" && this.standfastTimer > 0) {
      speed *= 0.62;
    }
    if (this.character.id === "cyborg" && this.overloadTimer > 0) {
      speed *= 1.2;
    }
    if (this.character.id === "assassine" && this.invisibleTimer > 0) {
      speed *= 1.08;
    }
    if (this.frozenTimer > 0) {
      speed *= 0.58;
    }

    return speed;
  }

  getAirSpeed() {
    let speed = this.stats.airSpeed;

    if (this.character.id === "tank" && this.unstoppableTimer > 0) {
      speed *= 0.8;
    }
    if (this.character.id === "titan" && this.standfastTimer > 0) {
      speed *= 0.64;
    }
    if (this.character.id === "cyborg" && this.overloadTimer > 0) {
      speed *= 1.15;
    }
    if (this.character.id === "windlaeufer" && this.glideTimer > 0) {
      speed *= 1.15;
    }
    if (this.frozenTimer > 0) {
      speed *= 0.6;
    }

    return speed;
  }

  getOutgoingKnockbackMultiplier() {
    if (this.character.id === "boxer" && this.rageTimer > 0) {
      return 1.34;
    }
    if (this.character.id === "feuerlord" && this.burnAuraTimer > 0) {
      return 1.28;
    }
    if (this.character.id === "cyborg" && this.overloadTimer > 0) {
      return 1.18;
    }
    if (this.character.id === "berserker") {
      return this.getBerserkerBoost();
    }
    return 1;
  }

  getOutgoingDamageMultiplier() {
    if (this.character.id === "boxer" && this.rageTimer > 0) {
      return 1.15;
    }
    if (this.character.id === "feuerlord" && this.burnAuraTimer > 0) {
      return 1.12;
    }
    if (this.character.id === "cyborg" && this.overloadTimer > 0) {
      return 1.14;
    }
    if (this.character.id === "berserker") {
      return 1 + (this.getBerserkerBoost() - 1) * 0.72;
    }
    return 1;
  }

  getGravityScale() {
    if (this.character.id === "windlaeufer" && this.glideTimer > 0 && this.vy > 0) {
      return 0.42;
    }
    return 1;
  }

  tickInputBuffer(dt) {
    for (const actionName of BUFFERED_ACTION_NAMES) {
      this.inputBuffer[actionName] = Math.max(0, (this.inputBuffer[actionName] ?? 0) - dt);
    }
  }

  bufferInput(actionInput) {
    this.inputState = cloneAction(actionInput);
    for (const actionName of BUFFERED_ACTION_NAMES) {
      if (actionInput.pressedActions[actionName]) {
        this.inputBuffer[actionName] = INPUT_BUFFER_WINDOW;
      }
    }
  }

  hasBufferedAction(actionName) {
    return (this.inputBuffer[actionName] ?? 0) > 0;
  }

  consumeBufferedAction(actionName) {
    if (!this.hasBufferedAction(actionName)) {
      return false;
    }
    this.inputBuffer[actionName] = 0;
    return true;
  }

  canUseJump() {
    const standardJumpAvailable = this.onGround || this.jumpsUsed < this.stats.jumps;
    const bonusJumpAvailable = !standardJumpAvailable && this.bonusJumpsAvailable > 0;
    return standardJumpAvailable || bonusJumpAvailable;
  }

  getInputLabel() {
    if (this.isBot) {
      return `Bot-KI - ${this.botDifficulty.label}`;
    }
    return getInputChoiceLabel(this.inputChoice, this.slot);
  }

  emitHitbox(game, options) {
    const damageMultiplier = this.getOutgoingDamageMultiplier();
    const knockbackMultiplier = this.getOutgoingKnockbackMultiplier();
    return game.spawnHitbox({
      owner: this,
      color: options.color ?? this.accent,
      secondaryColor: options.secondaryColor ?? this.secondary,
      damage: (options.damage ?? this.character.normalDamage) * damageMultiplier,
      knockbackX: (options.knockbackX ?? this.stats.attackKnockback) * knockbackMultiplier,
      knockbackY: (options.knockbackY ?? this.stats.attackLift) * knockbackMultiplier,
      ...options,
    });
  }

  update(dt, game, actionInput) {
    this.attackCooldown = Math.max(0, this.attackCooldown - dt);
    this.specialCooldown = Math.max(0, this.specialCooldown - dt);
    this.abilityCooldown = Math.max(0, this.abilityCooldown - dt);
    this.lockTimer = Math.max(0, this.lockTimer - dt);
    this.attackPoseTimer = Math.max(0, this.attackPoseTimer - dt);
    this.hitTimer = Math.max(0, this.hitTimer - dt);
    this.invulnerableTimer = Math.max(0, this.invulnerableTimer - dt);
    this.spawnFlash = Math.max(0, this.spawnFlash - dt);
    this.specialDiveTimer = Math.max(0, this.specialDiveTimer - dt);
    this.rageTimer = Math.max(0, this.rageTimer - dt);
    this.shieldTimer = Math.max(0, this.shieldTimer - dt);
    this.unstoppableTimer = Math.max(0, this.unstoppableTimer - dt);
    this.featherWindowTimer = Math.max(0, this.featherWindowTimer - dt);
    this.counterWindowTimer = Math.max(0, this.counterWindowTimer - dt);
    this.invisibleTimer = Math.max(0, this.invisibleTimer - dt);
    this.surgeTrailTimer = Math.max(0, this.surgeTrailTimer - dt);
    this.frozenTimer = Math.max(0, this.frozenTimer - dt);
    this.burnAuraTimer = Math.max(0, this.burnAuraTimer - dt);
    this.illusionTimer = Math.max(0, this.illusionTimer - dt);
    this.overloadTimer = Math.max(0, this.overloadTimer - dt);
    this.bloodrushTimer = Math.max(0, this.bloodrushTimer - dt);
    this.glideTimer = Math.max(0, this.glideTimer - dt);
    this.standfastTimer = Math.max(0, this.standfastTimer - dt);
    this.effectTimer = Math.max(0, this.effectTimer - dt);
    this.tickInputBuffer(dt);
    this.bufferInput(actionInput);

    const canControl = game.controlsEnabled && this.lockTimer <= 0 && this.hitTimer <= 0;
    const moveInput = canControl ? ((actionInput.left ? -1 : 0) + (actionInput.right ? 1 : 0)) : 0;
    this.blocking = Boolean(canControl && actionInput.block && this.onGround && this.shieldTimer <= 0);
    if (this.character.id === "samurai" && this.counterWindowTimer > 0) {
      this.blocking = true;
    }

    if (moveInput !== 0 && !this.blocking) {
      this.facing = moveInput;
      const targetVelocity = moveInput * (this.onGround ? this.getMoveSpeed() : this.getAirSpeed());
      const acceleration = this.onGround ? this.stats.acceleration : this.stats.airAcceleration;
      this.vx = approach(this.vx, targetVelocity, acceleration * dt);
    } else {
      const drag = this.onGround ? this.stats.friction : this.stats.airDrag;
      this.vx = approach(this.vx, 0, drag * dt);
    }

    if (canControl && this.canUseJump() && this.consumeBufferedAction("jump")) {
      this.tryJump(game);
    }

    if (canControl && this.attackCooldown <= 0 && this.consumeBufferedAction("attack")) {
      this.performNormalAttack(game);
    }

    if (canControl && this.specialCooldown <= 0 && this.consumeBufferedAction("special")) {
      this.performSpecialAttack(game);
    }

    if (canControl && this.abilityCooldown <= 0 && this.consumeBufferedAction("ability")) {
      this.performAbility(game);
    }

    if (this.character.id === "ninja" && Math.abs(this.vx) > 250 && this.effectTimer <= 0) {
      this.effectTimer = 0.05;
      game.spawnParticleBurst(this.x - this.facing * 12, this.y - 26, this.accent, 3, {
        speed: 70,
        life: 0.22,
        size: 4,
        shape: "smoke",
        gravity: 0,
      });
    }

    if (this.character.id === "boxer" && this.rageTimer > 0 && this.effectTimer <= 0) {
      this.effectTimer = 0.08;
      game.spawnParticleBurst(this.x, this.y - 20, this.accent, 3, {
        speed: 70,
        life: 0.24,
        size: 3,
        shape: "ring",
        gravity: 0,
      });
    }

    if (this.character.id === "magier" && this.shieldTimer > 0 && this.effectTimer <= 0) {
      this.effectTimer = 0.11;
      game.spawnParticleBurst(this.x, this.y - 30, this.secondary, 4, {
        speed: 40,
        life: 0.26,
        size: 4,
        shape: "rune",
        gravity: 0,
      });
    }

    if (this.character.id === "tank" && this.unstoppableTimer > 0 && this.effectTimer <= 0) {
      this.effectTimer = 0.1;
      game.spawnParticleBurst(this.x, this.y + 10, this.accent, 4, {
        speed: 75,
        life: 0.3,
        size: 4,
        shape: "dust",
      });
    }

    if (this.character.id === "springer" && this.featherWindowTimer > 0 && this.effectTimer <= 0) {
      this.effectTimer = 0.05;
      game.spawnParticleBurst(this.x, this.y - 16, this.color, 3, {
        speed: 90,
        life: 0.24,
        size: 3,
        shape: "streak",
        gravity: 0,
      });
    }

    if (this.character.id === "samurai" && this.counterWindowTimer > 0 && this.effectTimer <= 0) {
      this.effectTimer = 0.08;
      game.spawnParticleBurst(this.x + this.facing * 16, this.y - 28, this.accent, 3, {
        speed: 84,
        life: 0.18,
        size: 3,
        shape: "streak",
        gravity: 0,
      });
    }

    if (this.character.id === "assassine" && this.invisibleTimer > 0 && this.effectTimer <= 0) {
      this.effectTimer = 0.06;
      game.spawnParticleBurst(this.x, this.y - 22, this.accent, 3, {
        speed: 82,
        life: 0.18,
        size: 3,
        shape: "smoke",
        gravity: 0,
      });
    }

    if (this.character.id === "blitzkaempfer" && this.surgeTrailTimer > 0 && this.effectTimer <= 0) {
      this.effectTimer = 0.04;
      game.spawnParticleBurst(this.x - this.facing * 10, this.y - 24, this.accent, 5, {
        speed: 120,
        life: 0.14,
        size: 2.6,
        shape: "streak",
        gravity: 0,
      });
    }

    if (this.frozenTimer > 0 && this.effectTimer <= 0) {
      this.effectTimer = 0.12;
      game.spawnParticleBurst(this.x, this.y - 24, "#e9f9ff", 4, {
        speed: 44,
        life: 0.24,
        size: 3.2,
        shape: "dot",
        gravity: 0,
      });
    }

    if (this.character.id === "feuerlord" && this.burnAuraTimer > 0 && this.effectTimer <= 0) {
      this.effectTimer = 0.06;
      game.spawnParticleBurst(this.x, this.y - 18, this.accent, 4, {
        speed: 98,
        life: 0.2,
        size: 3.2,
        shape: "streak",
        gravity: 0,
      });
    }

    if (this.character.id === "schattenkrieger" && this.illusionTimer > 0 && this.effectTimer <= 0) {
      this.effectTimer = 0.07;
      game.spawnParticleBurst(this.x - this.facing * 18, this.y - 24, this.accent, 4, {
        speed: 86,
        life: 0.2,
        size: 3.2,
        shape: "smoke",
        gravity: 0,
      });
    }

    if (this.character.id === "cyborg" && this.overloadTimer > 0 && this.effectTimer <= 0) {
      this.effectTimer = 0.06;
      game.spawnParticleBurst(this.x, this.y - 22, this.accent, 4, {
        speed: 96,
        life: 0.18,
        size: 2.8,
        shape: "ring",
        gravity: 0,
      });
    }

    if (this.character.id === "berserker" && this.bloodrushTimer > 0 && this.effectTimer <= 0) {
      this.effectTimer = 0.07;
      game.spawnParticleBurst(this.x, this.y - 20, this.accent, 4, {
        speed: 94,
        life: 0.22,
        size: 3,
        shape: "ring",
        gravity: 0,
      });
    }

    if (this.character.id === "windlaeufer" && this.glideTimer > 0 && this.effectTimer <= 0) {
      this.effectTimer = 0.05;
      game.spawnParticleBurst(this.x, this.y - 12, this.secondary, 3, {
        speed: 108,
        life: 0.18,
        size: 2.8,
        shape: "streak",
        gravity: 0,
      });
    }

    if (this.character.id === "titan" && this.standfastTimer > 0 && this.effectTimer <= 0) {
      this.effectTimer = 0.08;
      game.spawnParticleBurst(this.x, this.y + 2, this.accent, 4, {
        speed: 86,
        life: 0.24,
        size: 3.6,
        shape: "dust",
      });
    }

    this.vy += GAME.gravity * this.getGravityScale() * dt;

    const previousY = this.y;
    const previousOnGround = this.onGround;
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    this.handlePlatformCollision(previousY, previousOnGround, game.platform);
  }

  handlePlatformCollision(previousY, previousOnGround, platform) {
    const top = platform.y;
    const left = platform.x + platform.edgeInset;
    const right = platform.x + platform.width - platform.edgeInset;
    const bottomNow = this.y + this.collisionRadius;
    const bottomPrevious = previousY + this.collisionRadius;
    const withinPlatformWidth = this.x >= left - this.collisionRadius * 0.4 && this.x <= right + this.collisionRadius * 0.4;
    const crossedTop = bottomPrevious <= top && bottomNow >= top;
    const shallowPenetration = bottomNow >= top && bottomNow <= top + platform.snapDepth && bottomPrevious <= top + platform.snapDepth + 3;
    const groundedRecovery = previousOnGround && bottomNow >= top && bottomNow <= top + platform.snapDepth * 1.35;

    if (withinPlatformWidth && this.vy >= 0 && (crossedTop || shallowPenetration || groundedRecovery)) {
      this.y = top - this.collisionRadius;
      this.vy = 0;
      this.onGround = true;
      this.jumpsUsed = 0;
      if (this.character.id === "springer" && this.featherWindowTimer > 0) {
        this.bonusJumpsAvailable = Math.max(this.bonusJumpsAvailable, 1);
      }
      return;
    }

    this.onGround = false;
  }

  tryJump(game) {
    const standardJumpAvailable = this.onGround || this.jumpsUsed < this.stats.jumps;
    const bonusJumpAvailable = !standardJumpAvailable && this.bonusJumpsAvailable > 0;

    if (!standardJumpAvailable && !bonusJumpAvailable) {
      return;
    }

    if (bonusJumpAvailable) {
      this.bonusJumpsAvailable -= 1;
    } else {
      this.jumpsUsed += 1;
    }

    this.onGround = false;
    this.vy = -this.stats.jumpForce;

    if (this.character.id === "springer" && (this.jumpsUsed > 1 || bonusJumpAvailable)) {
      game.spawnParticleBurst(this.x, this.y - 14, this.accent, 12, {
        speed: 160,
        life: 0.34,
        size: 3.2,
        shape: "streak",
        gravity: 0,
      });
    }

    game.sound.play("jump");
  }

  performNormalAttack(game) {
    if (this.attackCooldown > 0) {
      return;
    }

    this.attackCooldown = this.stats.attackCooldown;
    this.attackPoseTimer = 0.18;
    game.sound.play("attack");

    switch (this.character.id) {
      case "ninja":
        this.emitHitbox(game, {
          type: "box",
          visual: "slash",
          followOwner: true,
          offsetX: 60,
          offsetY: -20,
          width: 100,
          height: 56,
          ttl: 0.12,
          damage: this.character.normalDamage,
          knockbackX: 435,
          knockbackY: 170,
          color: this.accent,
        });
        game.spawnParticleBurst(this.x + this.facing * 34, this.y - 30, this.accent, 8, {
          speed: 180,
          life: 0.18,
          size: 3,
          shape: "streak",
          gravity: 0,
        });
        break;
      case "boxer":
        this.emitHitbox(game, {
          type: "box",
          visual: "impact",
          followOwner: true,
          offsetX: 68,
          offsetY: -18,
          width: 104,
          height: 52,
          ttl: 0.12,
          damage: this.character.normalDamage,
          knockbackX: this.stats.attackKnockback,
          knockbackY: this.stats.attackLift,
          color: this.accent,
        });
        game.spawnParticleBurst(this.x + this.facing * 54, this.y - 24, this.accent, 8, {
          speed: 150,
          life: 0.2,
          size: 3.4,
          shape: "ring",
          gravity: 0,
        });
        break;
      case "magier":
        this.emitHitbox(game, {
          type: "projectile",
          visual: "projectile",
          x: this.x + this.facing * 48,
          y: this.y - 28,
          radius: 16,
          ttl: 1.15,
          vx: this.facing * 620,
          vy: 0,
          damage: this.character.normalDamage,
          knockbackX: this.stats.attackKnockback,
          knockbackY: this.stats.attackLift,
          color: this.accent,
          secondaryColor: this.secondary,
          flash: true,
        });
        break;
      case "tank":
        this.emitHitbox(game, {
          type: "box",
          visual: "impact",
          followOwner: true,
          offsetX: 64,
          offsetY: -14,
          width: 104,
          height: 66,
          ttl: 0.16,
          damage: this.character.normalDamage,
          knockbackX: this.stats.attackKnockback,
          knockbackY: this.stats.attackLift,
          color: this.color,
          secondaryColor: this.accent,
        });
        game.spawnParticleBurst(this.x + this.facing * 46, this.y - 8, "#c7d0dd", 8, {
          speed: 110,
          life: 0.26,
          size: 4,
          shape: "dust",
        });
        break;
      case "springer":
        this.emitHitbox(game, {
          type: "box",
          visual: "wind",
          followOwner: true,
          offsetX: 62,
          offsetY: -14,
          width: 96,
          height: 62,
          ttl: 0.14,
          damage: this.character.normalDamage,
          knockbackX: this.stats.attackKnockback,
          knockbackY: this.stats.attackLift,
          color: this.color,
          secondaryColor: this.accent,
        });
        game.spawnParticleBurst(this.x + this.facing * 50, this.y - 18, this.color, 8, {
          speed: 160,
          life: 0.22,
          size: 3,
          shape: "streak",
          gravity: 0,
        });
        break;
      case "samurai":
        this.emitHitbox(game, {
          type: "box",
          visual: "slash",
          followOwner: true,
          offsetX: 72,
          offsetY: -22,
          width: 122,
          height: 50,
          ttl: 0.12,
          damage: this.character.normalDamage,
          knockbackX: 610,
          knockbackY: 220,
          color: this.accent,
          secondaryColor: this.secondary,
        });
        game.spawnParticleBurst(this.x + this.facing * 52, this.y - 28, this.accent, 10, {
          speed: 175,
          life: 0.18,
          size: 3,
          shape: "streak",
          gravity: 0,
        });
        break;
      case "assassine":
        this.emitHitbox(game, {
          type: "box",
          visual: "slash",
          followOwner: true,
          offsetX: 58,
          offsetY: -18,
          width: 84,
          height: 46,
          ttl: 0.1,
          damage: this.character.normalDamage,
          knockbackX: 490,
          knockbackY: 180,
          color: this.accent,
          secondaryColor: "#effff2",
        });
        game.spawnParticleBurst(this.x + this.facing * 36, this.y - 24, this.accent, 8, {
          speed: 165,
          life: 0.16,
          size: 2.8,
          shape: "smoke",
          gravity: 0,
        });
        break;
      case "blitzkaempfer":
        this.emitHitbox(game, {
          type: "box",
          visual: "electric",
          followOwner: true,
          offsetX: 64,
          offsetY: -20,
          width: 106,
          height: 52,
          ttl: 0.11,
          damage: this.character.normalDamage,
          knockbackX: 560,
          knockbackY: 210,
          color: this.color,
          secondaryColor: this.secondary,
          flash: true,
        });
        game.spawnParticleBurst(this.x + this.facing * 46, this.y - 24, this.color, 10, {
          speed: 180,
          life: 0.16,
          size: 2.6,
          shape: "streak",
          gravity: 0,
        });
        break;
      case "eiswaechter":
        this.emitHitbox(game, {
          type: "box",
          visual: "frost",
          followOwner: true,
          offsetX: 62,
          offsetY: -18,
          width: 96,
          height: 52,
          ttl: 0.14,
          damage: this.character.normalDamage,
          knockbackX: 580,
          knockbackY: 230,
          color: this.color,
          secondaryColor: this.secondary,
        });
        game.spawnParticleBurst(this.x + this.facing * 46, this.y - 20, this.accent, 9, {
          speed: 140,
          life: 0.2,
          size: 3.2,
          shape: "dot",
          gravity: 0,
        });
        break;
      case "feuerlord":
        this.emitHitbox(game, {
          type: "box",
          visual: "flame",
          followOwner: true,
          offsetX: 66,
          offsetY: -18,
          width: 108,
          height: 58,
          ttl: 0.13,
          damage: this.character.normalDamage,
          knockbackX: 630,
          knockbackY: 240,
          color: this.color,
          secondaryColor: this.accent,
          flash: true,
        });
        game.spawnParticleBurst(this.x + this.facing * 48, this.y - 22, this.accent, 10, {
          speed: 165,
          life: 0.2,
          size: 3,
          shape: "streak",
          gravity: 0,
        });
        break;
      case "schattenkrieger":
        this.emitHitbox(game, {
          type: "box",
          visual: "slash",
          followOwner: true,
          offsetX: 62,
          offsetY: -18,
          width: 98,
          height: 52,
          ttl: 0.12,
          damage: this.character.normalDamage,
          knockbackX: 540,
          knockbackY: 205,
          color: this.accent,
          secondaryColor: this.secondary,
        });
        game.spawnParticleBurst(this.x + this.facing * 44, this.y - 24, this.accent, 10, {
          speed: 155,
          life: 0.18,
          size: 3,
          shape: "smoke",
          gravity: 0,
        });
        break;
      case "cyborg":
        this.emitHitbox(game, {
          type: "box",
          visual: "impact",
          followOwner: true,
          offsetX: 66,
          offsetY: -18,
          width: 110,
          height: 56,
          ttl: 0.13,
          damage: this.character.normalDamage,
          knockbackX: 610,
          knockbackY: 248,
          color: this.color,
          secondaryColor: this.accent,
          flash: true,
        });
        game.spawnParticleBurst(this.x + this.facing * 52, this.y - 22, this.accent, 8, {
          speed: 145,
          life: 0.18,
          size: 3,
          shape: "ring",
          gravity: 0,
        });
        break;
      case "berserker":
        this.emitHitbox(game, {
          type: "box",
          visual: "slash",
          followOwner: true,
          offsetX: 70,
          offsetY: -18,
          width: 114,
          height: 58,
          ttl: 0.14,
          damage: this.character.normalDamage,
          knockbackX: 675,
          knockbackY: 280,
          color: this.accent,
          secondaryColor: this.secondary,
        });
        game.spawnParticleBurst(this.x + this.facing * 52, this.y - 18, this.accent, 12, {
          speed: 170,
          life: 0.2,
          size: 3.2,
          shape: "ring",
          gravity: 0,
        });
        break;
      case "windlaeufer":
        this.emitHitbox(game, {
          type: "box",
          visual: "wind",
          followOwner: true,
          offsetX: 66,
          offsetY: -16,
          width: 102,
          height: 58,
          ttl: 0.12,
          damage: this.character.normalDamage,
          knockbackX: 520,
          knockbackY: 310,
          color: this.color,
          secondaryColor: this.secondary,
        });
        game.spawnParticleBurst(this.x + this.facing * 48, this.y - 16, this.color, 9, {
          speed: 175,
          life: 0.18,
          size: 3,
          shape: "streak",
          gravity: 0,
        });
        break;
      case "titan":
        this.emitHitbox(game, {
          type: "box",
          visual: "impact",
          followOwner: true,
          offsetX: 74,
          offsetY: -14,
          width: 126,
          height: 74,
          ttl: 0.18,
          damage: this.character.normalDamage,
          knockbackX: 760,
          knockbackY: 320,
          color: this.color,
          secondaryColor: this.accent,
          flash: true,
        });
        game.spawnParticleBurst(this.x + this.facing * 58, this.y - 6, this.accent, 12, {
          speed: 120,
          life: 0.24,
          size: 4,
          shape: "dust",
        });
        break;
      default:
        break;
    }
  }

  performSpecialAttack(game) {
    if (this.specialCooldown > 0) {
      return;
    }

    switch (this.character.id) {
      case "ninja":
        this.specialCooldown = this.stats.specialCooldown;
        this.attackPoseTimer = 0.24;
        this.lockTimer = 0.12;
        this.invulnerableTimer = Math.max(this.invulnerableTimer, 0.18);
        this.vx = this.facing * 930;
        this.emitHitbox(game, {
          type: "box",
          visual: "dash",
          followOwner: true,
          offsetX: 46,
          offsetY: -20,
          width: 132,
          height: 70,
          ttl: 0.18,
          damage: this.character.specialDamage,
          knockbackX: 740,
          knockbackY: 210,
          color: this.accent,
          secondaryColor: "#ffffff",
          flash: true,
        });
        game.spawnParticleBurst(this.x, this.y - 26, this.accent, 16, {
          speed: 180,
          life: 0.28,
          size: 3.4,
          shape: "smoke",
          gravity: 0,
        });
        game.shake(5, 0.16);
        game.sound.play("special");
        break;
      case "boxer":
        this.specialCooldown = this.stats.specialCooldown;
        this.lockTimer = 0.2;
        this.attackPoseTimer = 0.36;
        game.schedule(0.12, () => {
          this.emitHitbox(game, {
            type: "box",
            visual: "impact",
            followOwner: true,
            offsetX: 76,
            offsetY: -18,
            width: 126,
            height: 72,
            ttl: 0.15,
            damage: this.character.specialDamage,
            knockbackX: 980,
            knockbackY: 360,
            color: this.accent,
            secondaryColor: "#ffffff",
            flash: true,
          });
          game.spawnParticleBurst(this.x + this.facing * 64, this.y - 18, this.accent, 20, {
            speed: 220,
            life: 0.3,
            size: 4,
            shape: "ring",
            gravity: 0,
          });
          game.shake(9, 0.22);
          game.sound.play("special");
        });
        break;
      case "magier":
        this.specialCooldown = this.stats.specialCooldown;
        this.lockTimer = 0.22;
        this.attackPoseTimer = 0.34;
        game.schedule(0.14, () => {
          this.emitHitbox(game, {
            type: "circle",
            visual: "rune-wave",
            x: this.x,
            y: this.y - 24,
            radius: 38,
            maxRadius: 192,
            expansion: 560,
            ttl: 0.38,
            damage: this.character.specialDamage,
            knockbackX: 880,
            knockbackY: 280,
            color: this.accent,
            secondaryColor: this.secondary,
            flash: true,
          });
          game.spawnParticleBurst(this.x, this.y - 26, this.secondary, 22, {
            speed: 230,
            life: 0.34,
            size: 4,
            shape: "rune",
            gravity: 0,
          });
          game.shake(7, 0.2);
          game.sound.play("special");
        });
        break;
      case "tank":
        if (!this.onGround) {
          return;
        }
        this.specialCooldown = this.stats.specialCooldown;
        this.lockTimer = 0.26;
        this.attackPoseTimer = 0.36;
        game.schedule(0.13, () => {
          this.emitHitbox(game, {
            type: "circle",
            visual: "shockwave",
            x: this.x,
            y: GAME.platform.y - 4,
            radius: 48,
            maxRadius: 176,
            expansion: 520,
            ttl: 0.34,
            damage: this.character.specialDamage,
            knockbackX: 880,
            knockbackY: 390,
            color: this.accent,
            secondaryColor: this.secondary,
            flash: true,
          });
          game.spawnParticleBurst(this.x, GAME.platform.y - 8, "#d0d6e1", 18, {
            speed: 210,
            life: 0.4,
            size: 4,
            shape: "dust",
          });
          for (let index = 0; index < 8; index += 1) {
            game.spawnParticleBurst(this.x + randomRange(-120, 120), GAME.platform.y + 8, this.accent, 1, {
              speed: 20,
              life: 0.32,
              size: 8,
              shape: "streak",
              gravity: 0,
            });
          }
          game.shake(8, 0.24);
          game.sound.play("special");
        });
        break;
      case "springer":
        this.specialCooldown = this.stats.specialCooldown;
        this.attackPoseTimer = 0.44;
        this.specialDiveTimer = 0.42;
        this.onGround = false;
        this.vy = Math.min(this.vy, -260);
        this.emitHitbox(game, {
          type: "circle",
          visual: "dive",
          followOwner: true,
          offsetX: 0,
          offsetY: -6,
          radius: 42,
          maxRadius: 58,
          ttl: 0.4,
          damage: this.character.specialDamage,
          knockbackX: 780,
          knockbackY: 470,
          color: this.color,
          secondaryColor: this.accent,
          flash: true,
        });
        game.schedule(0.16, () => {
          if (this.specialDiveTimer > 0) {
            this.vy = 940;
          }
        });
        game.spawnParticleBurst(this.x, this.y - 10, this.color, 16, {
          speed: 170,
          life: 0.28,
          size: 3.4,
          shape: "streak",
          gravity: 0,
        });
        game.shake(6, 0.18);
        game.sound.play("special");
        break;
      case "samurai":
        this.specialCooldown = this.stats.specialCooldown;
        this.lockTimer = 0.24;
        this.attackPoseTimer = 0.34;
        game.schedule(0.1, () => {
          this.emitHitbox(game, {
            type: "circle",
            visual: "multi-slash",
            x: this.x + this.facing * 10,
            y: this.y - 24,
            radius: 58,
            maxRadius: 104,
            expansion: 260,
            ttl: 0.28,
            damage: this.character.specialDamage,
            knockbackX: 820,
            knockbackY: 310,
            color: this.accent,
            secondaryColor: this.secondary,
            flash: true,
          });
          game.spawnParticleBurst(this.x, this.y - 26, this.accent, 18, {
            speed: 210,
            life: 0.24,
            size: 3,
            shape: "streak",
            gravity: 0,
          });
          game.shake(7, 0.18);
          game.sound.play("special");
        });
        break;
      case "assassine":
        this.specialCooldown = this.stats.specialCooldown;
        this.lockTimer = 0.18;
        this.attackPoseTimer = 0.3;
        for (let hitIndex = 0; hitIndex < 3; hitIndex += 1) {
          game.schedule(0.06 * hitIndex, () => {
            this.emitHitbox(game, {
              type: "box",
              visual: "slash",
              followOwner: true,
              offsetX: 54 + hitIndex * 10,
              offsetY: -20 + (hitIndex % 2 === 0 ? -4 : 4),
              width: 100,
              height: 48,
              ttl: 0.1,
              damage: this.character.specialDamage * 0.48,
              knockbackX: 360 + hitIndex * 80,
              knockbackY: 160 + hitIndex * 25,
              color: this.accent,
              secondaryColor: "#effff0",
              flash: true,
            });
            game.spawnParticleBurst(this.x + this.facing * 36, this.y - 24, this.accent, 8, {
              speed: 180,
              life: 0.16,
              size: 2.8,
              shape: "smoke",
              gravity: 0,
            });
          });
        }
        game.shake(5, 0.16);
        game.sound.play("special");
        break;
      case "blitzkaempfer":
        this.specialCooldown = this.stats.specialCooldown;
        this.lockTimer = 0.18;
        this.attackPoseTimer = 0.28;
        this.emitHitbox(game, {
          type: "projectile",
          visual: "electric",
          x: this.x + this.facing * 48,
          y: this.y - 26,
          radius: 28,
          ttl: 0.56,
          vx: this.facing * 760,
          vy: 0,
          damage: this.character.specialDamage,
          knockbackX: 860,
          knockbackY: 260,
          color: this.color,
          secondaryColor: this.secondary,
          flash: true,
        });
        game.spawnParticleBurst(this.x + this.facing * 26, this.y - 24, this.color, 16, {
          speed: 210,
          life: 0.2,
          size: 2.8,
          shape: "streak",
          gravity: 0,
        });
        game.shake(7, 0.18);
        game.sound.play("special");
        break;
      case "eiswaechter":
        this.specialCooldown = this.stats.specialCooldown;
        this.lockTimer = 0.24;
        this.attackPoseTimer = 0.34;
        game.schedule(0.12, () => {
          this.emitHitbox(game, {
            type: "circle",
            visual: "frost",
            x: this.x,
            y: this.y - 22,
            radius: 42,
            maxRadius: 170,
            expansion: 500,
            ttl: 0.36,
            damage: this.character.specialDamage,
            knockbackX: 790,
            knockbackY: 260,
            color: this.color,
            secondaryColor: this.secondary,
            flash: true,
          });
          game.spawnParticleBurst(this.x, this.y - 24, this.accent, 20, {
            speed: 150,
            life: 0.28,
            size: 3.4,
            shape: "dot",
            gravity: 0,
          });
          game.shake(6, 0.18);
          game.sound.play("special");
        });
        break;
      case "feuerlord":
        this.specialCooldown = this.stats.specialCooldown;
        this.lockTimer = 0.24;
        this.attackPoseTimer = 0.34;
        game.schedule(0.1, () => {
          this.emitHitbox(game, {
            type: "circle",
            visual: "flame",
            x: this.x + this.facing * 40,
            y: this.y - 22,
            radius: 44,
            maxRadius: 132,
            expansion: 380,
            ttl: 0.34,
            damage: this.character.specialDamage,
            knockbackX: 900,
            knockbackY: 320,
            color: this.color,
            secondaryColor: this.accent,
            flash: true,
          });
          game.spawnParticleBurst(this.x + this.facing * 32, this.y - 22, this.accent, 20, {
            speed: 205,
            life: 0.26,
            size: 3.2,
            shape: "streak",
            gravity: 0,
          });
          game.shake(8, 0.2);
          game.sound.play("special");
        });
        break;
      case "schattenkrieger":
        this.specialCooldown = this.stats.specialCooldown;
        this.lockTimer = 0.2;
        this.attackPoseTimer = 0.32;
        game.schedule(0.1, () => {
          this.emitHitbox(game, {
            type: "circle",
            visual: "shadow-burst",
            x: this.x + this.facing * 26,
            y: this.y - 24,
            radius: 34,
            maxRadius: 136,
            expansion: 420,
            ttl: 0.32,
            damage: this.character.specialDamage,
            knockbackX: 790,
            knockbackY: 260,
            color: this.accent,
            secondaryColor: this.secondary,
            flash: true,
          });
          game.spawnParticleBurst(this.x + this.facing * 22, this.y - 24, this.accent, 18, {
            speed: 170,
            life: 0.24,
            size: 3.2,
            shape: "smoke",
            gravity: 0,
          });
          game.shake(7, 0.18);
          game.sound.play("special");
        });
        break;
      case "cyborg":
        this.specialCooldown = this.stats.specialCooldown;
        this.attackPoseTimer = 0.34;
        this.lockTimer = 0.16;
        this.vx = this.facing * 840;
        this.emitHitbox(game, {
          type: "box",
          visual: "rocket",
          followOwner: true,
          offsetX: 58,
          offsetY: -18,
          width: 132,
          height: 64,
          ttl: 0.18,
          damage: this.character.specialDamage,
          knockbackX: 920,
          knockbackY: 300,
          color: this.accent,
          secondaryColor: this.secondary,
          flash: true,
        });
        game.spawnParticleBurst(this.x - this.facing * 18, this.y - 18, this.accent, 16, {
          speed: 190,
          life: 0.2,
          size: 3.2,
          shape: "streak",
          gravity: 0,
        });
        game.shake(8, 0.18);
        game.sound.play("special");
        break;
      case "berserker":
        this.specialCooldown = this.stats.specialCooldown;
        this.lockTimer = 0.24;
        this.attackPoseTimer = 0.36;
        this.emitHitbox(game, {
          type: "circle",
          visual: "multi-slash",
          followOwner: true,
          offsetX: 0,
          offsetY: -18,
          radius: 52,
          maxRadius: 78,
          ttl: 0.34,
          damage: this.character.specialDamage,
          knockbackX: 940,
          knockbackY: 350,
          color: this.accent,
          secondaryColor: this.secondary,
          flash: true,
        });
        game.spawnParticleBurst(this.x, this.y - 18, this.accent, 18, {
          speed: 200,
          life: 0.24,
          size: 3.2,
          shape: "ring",
          gravity: 0,
        });
        game.shake(8, 0.2);
        game.sound.play("special");
        break;
      case "windlaeufer":
        this.specialCooldown = this.stats.specialCooldown;
        this.lockTimer = 0.18;
        this.attackPoseTimer = 0.3;
        this.emitHitbox(game, {
          type: "circle",
          visual: "tornado",
          x: this.x + this.facing * 36,
          y: this.y - 18,
          radius: 46,
          maxRadius: 110,
          expansion: 280,
          ttl: 0.32,
          damage: this.character.specialDamage,
          knockbackX: 760,
          knockbackY: 390,
          color: this.color,
          secondaryColor: this.secondary,
          flash: true,
        });
        game.spawnParticleBurst(this.x + this.facing * 26, this.y - 16, this.secondary, 18, {
          speed: 180,
          life: 0.22,
          size: 3,
          shape: "streak",
          gravity: 0,
        });
        game.shake(6, 0.18);
        game.sound.play("special");
        break;
      case "titan":
        if (!this.onGround) {
          return;
        }
        this.specialCooldown = this.stats.specialCooldown;
        this.lockTimer = 0.28;
        this.attackPoseTimer = 0.4;
        game.schedule(0.12, () => {
          this.emitHitbox(game, {
            type: "circle",
            visual: "quake",
            x: this.x,
            y: GAME.platform.y - 2,
            radius: 60,
            maxRadius: 210,
            expansion: 560,
            ttl: 0.4,
            damage: this.character.specialDamage,
            knockbackX: 1020,
            knockbackY: 420,
            color: this.accent,
            secondaryColor: this.secondary,
            flash: true,
          });
          game.spawnParticleBurst(this.x, GAME.platform.y - 8, this.accent, 24, {
            speed: 215,
            life: 0.32,
            size: 4,
            shape: "dust",
          });
          game.shake(10, 0.24);
          game.sound.play("special");
        });
        break;
      default:
        break;
    }
  }

  performAbility(game) {
    if (this.abilityCooldown > 0) {
      return;
    }

    switch (this.character.id) {
      case "ninja": {
        this.abilityCooldown = this.stats.abilityCooldown;
        const target = game.getOpponent(this);
        const fromX = this.x;
        const fromY = this.y;
        let targetX = this.x + this.facing * 120;
        if (target) {
          targetX = target.x - target.facing * 74;
        }
        const leftLimit = game.platform.x + 70;
        const rightLimit = game.platform.x + game.platform.width - 70;
        this.x = clamp(targetX, leftLimit, rightLimit);
        this.y = Math.min(this.y, game.platform.y - this.collisionRadius);
        this.facing = target ? (target.x >= this.x ? 1 : -1) : this.facing;
        this.invulnerableTimer = Math.max(this.invulnerableTimer, 0.24);
        this.lockTimer = 0.05;
        game.spawnParticleBurst(fromX, fromY - 24, "#3b4153", 14, {
          speed: 170,
          life: 0.32,
          size: 4.4,
          shape: "smoke",
          gravity: 0,
        });
        game.spawnParticleBurst(this.x, this.y - 24, this.accent, 14, {
          speed: 170,
          life: 0.28,
          size: 3.6,
          shape: "smoke",
          gravity: 0,
        });
        game.sound.play("ability");
        break;
      }
      case "boxer":
        this.abilityCooldown = this.stats.abilityCooldown;
        this.rageTimer = this.stats.abilityDuration;
        game.spawnParticleBurst(this.x, this.y - 24, this.color, 18, {
          speed: 150,
          life: 0.3,
          size: 3.6,
          shape: "ring",
          gravity: 0,
        });
        game.sound.play("ability");
        break;
      case "magier":
        this.abilityCooldown = this.stats.abilityCooldown;
        this.shieldTimer = this.stats.abilityDuration;
        game.spawnParticleBurst(this.x, this.y - 26, this.secondary, 20, {
          speed: 120,
          life: 0.34,
          size: 4.2,
          shape: "rune",
          gravity: 0,
        });
        game.sound.play("ability");
        break;
      case "tank":
        this.abilityCooldown = this.stats.abilityCooldown;
        this.unstoppableTimer = this.stats.abilityDuration;
        game.spawnParticleBurst(this.x, this.y - 6, this.accent, 18, {
          speed: 120,
          life: 0.32,
          size: 4.4,
          shape: "dust",
        });
        game.sound.play("ability");
        break;
      case "springer":
        this.abilityCooldown = this.stats.abilityCooldown;
        this.featherWindowTimer = this.stats.abilityDuration;
        this.bonusJumpsAvailable = Math.max(this.bonusJumpsAvailable, 1);
        this.onGround = false;
        this.vy = -1120;
        this.jumpsUsed = Math.max(0, this.jumpsUsed - 1);
        game.spawnParticleBurst(this.x, this.y - 18, this.color, 20, {
          speed: 210,
          life: 0.34,
          size: 3.4,
          shape: "streak",
          gravity: 0,
        });
        game.sound.play("ability");
        break;
      case "samurai":
        this.abilityCooldown = this.stats.abilityCooldown;
        this.counterWindowTimer = this.stats.abilityDuration;
        this.lockTimer = 0.06;
        game.spawnParticleBurst(this.x + this.facing * 18, this.y - 28, this.accent, 14, {
          speed: 140,
          life: 0.22,
          size: 3,
          shape: "streak",
          gravity: 0,
        });
        game.sound.play("ability");
        break;
      case "assassine":
        this.abilityCooldown = this.stats.abilityCooldown;
        this.invisibleTimer = this.stats.abilityDuration;
        this.invulnerableTimer = Math.max(this.invulnerableTimer, 0.16);
        game.spawnParticleBurst(this.x, this.y - 22, this.accent, 16, {
          speed: 150,
          life: 0.24,
          size: 3,
          shape: "smoke",
          gravity: 0,
        });
        game.sound.play("ability");
        break;
      case "blitzkaempfer":
        this.abilityCooldown = this.stats.abilityCooldown;
        this.surgeTrailTimer = this.stats.abilityDuration;
        this.lockTimer = 0.05;
        this.invulnerableTimer = Math.max(this.invulnerableTimer, 0.18);
        this.vx = this.facing * 980;
        this.emitHitbox(game, {
          type: "box",
          visual: "dash",
          followOwner: true,
          offsetX: 46,
          offsetY: -20,
          width: 112,
          height: 54,
          ttl: 0.14,
          damage: 5,
          knockbackX: 410,
          knockbackY: 160,
          color: this.color,
          secondaryColor: this.secondary,
          flash: true,
        });
        game.spawnParticleBurst(this.x, this.y - 22, this.color, 18, {
          speed: 180,
          life: 0.18,
          size: 2.8,
          shape: "streak",
          gravity: 0,
        });
        game.sound.play("ability");
        break;
      case "eiswaechter": {
        this.abilityCooldown = this.stats.abilityCooldown;
        const target = game.getOpponent(this);
        if (target && Math.abs(target.x - this.x) < 250 && Math.abs(target.y - this.y) < 140) {
          target.frozenTimer = Math.max(target.frozenTimer, this.stats.abilityDuration);
          game.spawnParticleBurst(target.x, target.y - 24, this.accent, 18, {
            speed: 90,
            life: 0.26,
            size: 3.2,
            shape: "dot",
            gravity: 0,
          });
        }
        game.spawnParticleBurst(this.x, this.y - 22, this.secondary, 16, {
          speed: 120,
          life: 0.24,
          size: 3.2,
          shape: "ring",
          gravity: 0,
        });
        game.sound.play("ability");
        break;
      }
      case "feuerlord":
        this.abilityCooldown = this.stats.abilityCooldown;
        this.burnAuraTimer = this.stats.abilityDuration;
        game.spawnParticleBurst(this.x, this.y - 20, this.accent, 20, {
          speed: 160,
          life: 0.24,
          size: 3.2,
          shape: "streak",
          gravity: 0,
        });
        game.sound.play("ability");
        break;
      case "schattenkrieger": {
        this.abilityCooldown = this.stats.abilityCooldown;
        this.illusionTimer = this.stats.abilityDuration;
        this.invulnerableTimer = Math.max(this.invulnerableTimer, 0.14);
        const cloneX = this.x - this.facing * 36;
        game.spawnParticleBurst(cloneX, this.y - 22, this.accent, 18, {
          speed: 130,
          life: 0.24,
          size: 3.2,
          shape: "smoke",
          gravity: 0,
        });
        game.schedule(0.12, () => {
          this.emitHitbox(game, {
            type: "box",
            visual: "slash",
            x: cloneX + this.facing * 28,
            y: this.y - 26,
            width: 104,
            height: 48,
            ttl: 0.12,
            damage: 8,
            knockbackX: 510,
            knockbackY: 190,
            color: this.accent,
            secondaryColor: this.secondary,
          });
        });
        game.sound.play("ability");
        break;
      }
      case "cyborg":
        this.abilityCooldown = this.stats.abilityCooldown;
        this.overloadTimer = this.stats.abilityDuration;
        game.spawnParticleBurst(this.x, this.y - 20, this.accent, 18, {
          speed: 140,
          life: 0.22,
          size: 3,
          shape: "ring",
          gravity: 0,
        });
        game.sound.play("ability");
        break;
      case "berserker":
        this.abilityCooldown = this.stats.abilityCooldown;
        this.bloodrushTimer = this.stats.abilityDuration;
        game.spawnParticleBurst(this.x, this.y - 18, this.accent, 20, {
          speed: 150,
          life: 0.24,
          size: 3.2,
          shape: "ring",
          gravity: 0,
        });
        game.sound.play("ability");
        break;
      case "windlaeufer":
        this.abilityCooldown = this.stats.abilityCooldown;
        this.glideTimer = this.stats.abilityDuration;
        this.bonusJumpsAvailable = Math.max(this.bonusJumpsAvailable, 1);
        if (this.vy > -160) {
          this.vy = -160;
        }
        game.spawnParticleBurst(this.x, this.y - 16, this.secondary, 18, {
          speed: 170,
          life: 0.22,
          size: 2.8,
          shape: "streak",
          gravity: 0,
        });
        game.sound.play("ability");
        break;
      case "titan":
        this.abilityCooldown = this.stats.abilityCooldown;
        this.standfastTimer = this.stats.abilityDuration;
        game.spawnParticleBurst(this.x, this.y - 6, this.accent, 20, {
          speed: 110,
          life: 0.26,
          size: 4,
          shape: "dust",
        });
        game.sound.play("ability");
        break;
      default:
        break;
    }
  }

  applyHit(source, game) {
    if (this.character.id === "samurai" && this.counterWindowTimer > 0) {
      this.counterWindowTimer = 0;
      this.lockTimer = 0.1;
      this.hitTimer = 0;
      this.invulnerableTimer = Math.max(this.invulnerableTimer, 0.16);
      game.sound.play("block");
      game.spawnParticleBurst(this.x + this.facing * 18, this.y - 26, this.secondary, 14, {
        speed: 150,
        life: 0.22,
        size: 3,
        shape: "streak",
        gravity: 0,
      });
      this.emitHitbox(game, {
        type: "box",
        visual: "slash",
        followOwner: true,
        offsetX: 78,
        offsetY: -22,
        width: 122,
        height: 54,
        ttl: 0.12,
        damage: this.character.specialDamage * 0.85,
        knockbackX: 820,
        knockbackY: 260,
        color: this.accent,
        secondaryColor: this.secondary,
        flash: true,
      });
      game.shake(6, 0.12);
      return;
    }

    const direction = Math.sign(this.x - source.owner.x) || source.owner.facing || 1;
    let blockFactor = this.blocking ? this.stats.blockMultiplier : 1;
    let damageFactor = this.blocking ? 0.45 : 1;
    let resistance = this.stats.resistance;

    if (this.character.id === "magier" && this.shieldTimer > 0) {
      blockFactor *= 0.34;
      damageFactor *= 0.38;
      resistance *= 2.35;
    }

    if (this.character.id === "tank" && this.unstoppableTimer > 0) {
      blockFactor *= 0.24;
      damageFactor *= 0.72;
      resistance *= 3.3;
    }

    if (this.character.id === "titan" && this.standfastTimer > 0) {
      blockFactor *= 0.18;
      damageFactor *= 0.68;
      resistance *= 3.8;
    }

    if (this.character.id === "assassine" && this.invisibleTimer > 0) {
      blockFactor *= 0.82;
      damageFactor *= 0.72;
      resistance *= 1.42;
    }

    if (this.character.id === "schattenkrieger" && this.illusionTimer > 0) {
      blockFactor *= 0.8;
      damageFactor *= 0.78;
      resistance *= 1.24;
    }

    const damageGain = (source.damage ?? 8) * damageFactor;
    this.damagePercent = clamp(this.damagePercent + damageGain, 0, 999);
    const knockbackScale = 1 + Math.min(this.damagePercent, 280) * 0.0088;
    const verticalScale = 0.92 + (knockbackScale - 1) * 0.72;
    const horizontalForce = (source.knockbackX * knockbackScale / resistance) * direction * blockFactor;
    const verticalForce = (source.knockbackY * verticalScale / resistance) * blockFactor;

    this.vx += horizontalForce;
    this.vy = Math.min(this.vy, -verticalForce);
    this.hitTimer = this.blocking || this.shieldTimer > 0 ? 0.08 : 0.14;
    this.attackPoseTimer = 0;

    if (this.blocking || this.shieldTimer > 0) {
      game.sound.play("block");
      game.spawnParticleBurst(this.x + direction * 18, this.y - 26, this.shieldTimer > 0 ? this.secondary : "#dffbff", 10, {
        speed: 130,
        life: 0.24,
        size: 2.8,
        shape: this.shieldTimer > 0 ? "rune" : "ring",
        gravity: 0,
      });
    } else {
      game.sound.play("hit");
      game.spawnParticleBurst(this.x, this.y - 26, source.color, 14, {
        speed: 220,
        life: 0.32,
        size: 3.2,
        shape: "streak",
        gravity: 0,
      });
      game.shake(source.knockbackX > 780 ? 7 : 4, 0.12);
    }
  }

  draw(context, elapsed) {
    const walkCycle = Math.sin(elapsed * 0.016 * Math.max(1, Math.abs(this.vx) * 0.018));
    const isAttacking = this.attackPoseTimer > 0;
    const isHit = this.hitTimer > 0;
    const stealthAlpha = this.character.id === "assassine" && this.invisibleTimer > 0
      ? 0.38 + Math.sin(elapsed * 0.03) * 0.08
      : 1;
    const alpha = (this.invulnerableTimer > 0 ? 0.82 + Math.sin(elapsed * 0.03) * 0.14 : 1) * stealthAlpha;
    const bodyColor = isHit ? "#ffffff" : this.color;
    const accent = this.accent;
    const crouchOffset = this.blocking ? 10 : 0;
    const headY = -62 + crouchOffset;
    const shoulderY = -40 + crouchOffset;
    const hipY = -2 + crouchOffset;
    const step = this.onGround && Math.abs(this.vx) > 35 ? walkCycle * 12 : 0;
    const armFrontY = isAttacking ? -24 : this.blocking ? -34 : shoulderY + step;
    const armBackY = this.blocking ? -12 : shoulderY - step;
    const handFrontX = isAttacking ? 42 : this.blocking ? 20 : 24;
    const handFrontY = isAttacking ? -30 : armFrontY + 22;
    const handBackX = this.blocking ? 8 : -22;
    const handBackY = this.blocking ? -42 : armBackY + 18;
    const footFrontX = 18 + step * 0.8;
    const footBackX = -18 - step * 0.8;
    const footFrontY = 42 - Math.abs(step) * 0.18;
    const footBackY = 42 - Math.abs(step * 0.14);

    context.save();
    context.translate(this.x, this.y);
    context.scale(this.facing, 1);
    context.globalAlpha = alpha;
    context.lineCap = "round";
    context.lineJoin = "round";

    if (this.character.id === "schattenkrieger" && this.illusionTimer > 0) {
      context.save();
      context.translate(-this.facing * 34, -2);
      context.globalAlpha = 0.18;
      context.strokeStyle = this.accent;
      context.lineWidth = 5;
      context.beginPath();
      context.arc(0, headY, 15, 0, Math.PI * 2);
      context.stroke();
      context.beginPath();
      context.moveTo(0, headY + 16);
      context.lineTo(0, hipY);
      context.moveTo(0, shoulderY);
      context.lineTo(handFrontX, handFrontY);
      context.moveTo(0, shoulderY);
      context.lineTo(handBackX, handBackY);
      context.moveTo(0, hipY);
      context.lineTo(footFrontX, footFrontY);
      context.moveTo(0, hipY);
      context.lineTo(footBackX, footBackY);
      context.stroke();
      context.restore();
    }

    if (this.character.id === "boxer" && this.rageTimer > 0) {
      context.save();
      context.globalAlpha = 0.25;
      context.fillStyle = this.accent;
      context.beginPath();
      context.arc(0, -18, 48, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }

    if (this.character.id === "magier" && this.shieldTimer > 0) {
      context.save();
      context.globalAlpha = 0.28;
      context.strokeStyle = this.secondary;
      context.lineWidth = 4;
      context.shadowBlur = 18;
      context.shadowColor = this.secondary;
      context.beginPath();
      context.arc(0, -20, 46, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    }

    if (this.character.id === "tank" && this.unstoppableTimer > 0) {
      context.save();
      context.globalAlpha = 0.22;
      context.strokeStyle = this.accent;
      context.lineWidth = 6;
      context.beginPath();
      context.arc(0, -18, 50, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    }

    if (this.character.id === "feuerlord" && this.burnAuraTimer > 0) {
      context.save();
      context.globalAlpha = 0.24;
      context.fillStyle = this.accent;
      context.beginPath();
      context.arc(0, -20, 48, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }

    if (this.character.id === "cyborg" && this.overloadTimer > 0) {
      context.save();
      context.globalAlpha = 0.2;
      context.strokeStyle = this.accent;
      context.lineWidth = 4;
      context.beginPath();
      context.arc(0, -20, 44, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    }

    if (this.character.id === "berserker" && this.bloodrushTimer > 0) {
      context.save();
      context.globalAlpha = 0.2;
      context.fillStyle = this.accent;
      context.beginPath();
      context.arc(0, -18, 46, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }

    if (this.character.id === "windlaeufer" && this.glideTimer > 0) {
      context.save();
      context.globalAlpha = 0.16;
      context.strokeStyle = this.secondary;
      context.lineWidth = 3;
      context.beginPath();
      context.arc(0, -18, 44, -1.2, 1.2);
      context.stroke();
      context.restore();
    }

    if (this.character.id === "titan" && this.standfastTimer > 0) {
      context.save();
      context.globalAlpha = 0.22;
      context.strokeStyle = this.accent;
      context.lineWidth = 6;
      context.beginPath();
      context.arc(0, -16, 54, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    }

    context.strokeStyle = bodyColor;
    context.lineWidth = HEAVY_CHARACTER_IDS.has(this.character.id) ? 7 : 6;
    context.shadowBlur = 16;
    context.shadowColor = accent;

    context.beginPath();
    context.arc(0, headY, 15, 0, Math.PI * 2);
    context.stroke();

    context.beginPath();
    context.moveTo(0, headY + 16);
    context.lineTo(0, hipY);
    context.stroke();

    context.beginPath();
    context.moveTo(0, shoulderY);
    context.lineTo(handFrontX, handFrontY);
    context.moveTo(0, shoulderY);
    context.lineTo(handBackX, handBackY);
    context.stroke();

    context.beginPath();
    context.moveTo(0, hipY);
    context.lineTo(footFrontX, footFrontY);
    context.moveTo(0, hipY);
    context.lineTo(footBackX, footBackY);
    context.stroke();

    context.strokeStyle = accent;
    context.fillStyle = accent;
    context.lineWidth = 3;

    switch (this.character.id) {
      case "ninja":
        context.beginPath();
        context.moveTo(-14, headY - 2);
        context.lineTo(14, headY - 4);
        context.stroke();
        context.fillRect(-12, headY + 6, 24, 4);
        context.fillStyle = "#ffdde2";
        context.beginPath();
        context.arc(-6, headY - 1, 1.8, 0, Math.PI * 2);
        context.arc(6, headY - 1, 1.8, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = accent;
        context.beginPath();
        context.moveTo(-4, shoulderY + 6);
        context.lineTo(22, shoulderY + 12);
        context.lineTo(6, shoulderY + 22);
        context.closePath();
        context.fill();
        break;
      case "boxer":
        context.beginPath();
        context.moveTo(-14, headY - 16);
        context.lineTo(12, headY - 12);
        context.stroke();
        context.beginPath();
        context.arc(handFrontX, handFrontY, 6.5, 0, Math.PI * 2);
        context.arc(handBackX, handBackY, 6.5, 0, Math.PI * 2);
        context.fill();
        break;
      case "magier":
        context.beginPath();
        context.moveTo(-12, headY - 16);
        context.lineTo(0, headY - 30);
        context.lineTo(12, headY - 16);
        context.stroke();
        context.beginPath();
        context.moveTo(-8, shoulderY + 6);
        context.lineTo(-26, handBackY + 10);
        context.stroke();
        context.fillStyle = this.secondary;
        context.beginPath();
        context.arc(-28, handBackY + 10, 5, 0, Math.PI * 2);
        context.fill();
        break;
      case "tank":
        context.strokeRect(-18, shoulderY - 4, 36, 18);
        context.strokeRect(-20, shoulderY - 16, 12, 10);
        context.strokeRect(8, shoulderY - 16, 12, 10);
        break;
      case "springer":
        context.beginPath();
        context.moveTo(footFrontX - 4, footFrontY);
        context.lineTo(footFrontX + 10, footFrontY + 2);
        context.moveTo(footBackX - 4, footBackY);
        context.lineTo(footBackX + 10, footBackY + 2);
        context.stroke();
        context.beginPath();
        context.moveTo(-8, shoulderY + 6);
        context.lineTo(12, shoulderY + 20);
        context.stroke();
        break;
      case "samurai":
        context.beginPath();
        context.moveTo(-12, headY - 16);
        context.lineTo(12, headY - 14);
        context.stroke();
        context.strokeRect(-14, shoulderY - 6, 12, 10);
        context.beginPath();
        context.moveTo(12, handFrontY - 6);
        context.lineTo(40, handFrontY - 18);
        context.stroke();
        break;
      case "assassine":
        context.beginPath();
        context.moveTo(-12, headY - 12);
        context.lineTo(0, headY - 24);
        context.lineTo(10, headY - 12);
        context.stroke();
        context.fillStyle = this.accent;
        context.beginPath();
        context.arc(-5, headY - 2, 1.8, 0, Math.PI * 2);
        context.arc(5, headY - 2, 1.8, 0, Math.PI * 2);
        context.fill();
        break;
      case "blitzkaempfer":
        context.beginPath();
        context.moveTo(-12, headY - 14);
        context.lineTo(-2, headY - 26);
        context.lineTo(8, headY - 16);
        context.lineTo(16, headY - 28);
        context.stroke();
        break;
      case "eiswaechter":
        context.beginPath();
        context.moveTo(-10, headY - 16);
        context.lineTo(-3, headY - 26);
        context.lineTo(4, headY - 18);
        context.lineTo(12, headY - 28);
        context.stroke();
        context.beginPath();
        context.arc(-18, shoulderY + 2, 3, 0, Math.PI * 2);
        context.arc(18, shoulderY + 2, 3, 0, Math.PI * 2);
        context.fill();
        break;
      case "feuerlord":
        context.beginPath();
        context.moveTo(-10, headY - 18);
        context.lineTo(-2, headY - 28);
        context.lineTo(6, headY - 16);
        context.lineTo(14, headY - 26);
        context.stroke();
        break;
      case "schattenkrieger":
        context.beginPath();
        context.moveTo(-12, headY - 2);
        context.lineTo(12, headY - 4);
        context.stroke();
        context.beginPath();
        context.moveTo(-10, shoulderY + 10);
        context.lineTo(-24, handBackY + 10);
        context.moveTo(12, shoulderY + 6);
        context.lineTo(28, handFrontY + 4);
        context.stroke();
        break;
      case "cyborg":
        context.strokeRect(-12, shoulderY - 10, 24, 18);
        context.fillStyle = this.accent;
        context.beginPath();
        context.arc(0, shoulderY - 2, 3.5, 0, Math.PI * 2);
        context.fill();
        break;
      case "berserker":
        context.beginPath();
        context.moveTo(-12, headY - 16);
        context.lineTo(12, headY - 12);
        context.stroke();
        context.beginPath();
        context.moveTo(16, handFrontY - 4);
        context.lineTo(36, handFrontY - 18);
        context.lineTo(42, handFrontY - 2);
        context.closePath();
        context.stroke();
        break;
      case "windlaeufer":
        context.beginPath();
        context.moveTo(footFrontX - 4, footFrontY);
        context.lineTo(footFrontX + 12, footFrontY - 2);
        context.moveTo(footBackX - 4, footBackY);
        context.lineTo(footBackX + 12, footBackY - 2);
        context.stroke();
        context.beginPath();
        context.arc(0, shoulderY - 8, 8, 0.2, 2.6);
        context.stroke();
        break;
      case "titan":
        context.strokeRect(-22, shoulderY - 8, 44, 24);
        context.strokeRect(-18, shoulderY - 22, 14, 12);
        context.strokeRect(4, shoulderY - 22, 14, 12);
        context.strokeRect(-8, shoulderY - 2, 16, 16);
        break;
      default:
        break;
    }

    if (this.spawnFlash > 0) {
      context.save();
      context.globalAlpha = this.spawnFlash * 0.8;
      context.fillStyle = this.secondary;
      context.beginPath();
      context.arc(0, -20, 42, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }

    context.restore();
  }
}

class ArenaGame {
  constructor() {
    this.sound = new SoundManager();
    this.platform = GAME.platform;
    this.players = [];
    this.hitboxes = [];
    this.particles = [];
    this.scheduledEvents = [];
    this.active = false;
    this.controlsEnabled = false;
    this.pauseRequested = false;
    this.matchOver = false;
    this.countdownTimer = 0;
    this.stockPauseTimer = 0;
    this.elapsed = 0;
    this.shakeTime = 0;
    this.shakeMagnitude = 0;
    this.currentMode = "bot";
    this.currentBotDifficulty = getBotDifficultyConfig("medium");
    this.pauseKind = "manual";
  }

  startMatch(mode, selectionIds, inputSelections, botDifficultyKey) {
    this.currentMode = mode;
    this.currentBotDifficulty = getBotDifficultyConfig(botDifficultyKey);
    this.players = [
      new Player(1, CHARACTER_MAP[selectionIds.player1], inputSelections.player1, false, botDifficultyKey),
      new Player(2, CHARACTER_MAP[selectionIds.player2], mode === "bot" ? "bot" : inputSelections.player2, mode === "bot", botDifficultyKey),
    ];
    this.players[1].label = mode === "bot" ? "Bot" : "Spieler 2";

    this.hitboxes = [];
    this.particles = [];
    this.scheduledEvents = [];
    this.active = true;
    this.matchOver = false;
    this.controlsEnabled = false;
    this.pauseRequested = false;
    this.pauseKind = "manual";
    this.countdownTimer = GAME.roundStartCountdown;
    this.stockPauseTimer = 0;
    this.elapsed = 0;
    this.shakeTime = 0;
    this.shakeMagnitude = 0;
    if (mode === "bot") {
      inputManager.clearTouchSlot(2);
    }
    this.spawnPlayers();
    this.updateHud(true);
    this.setCountdownLabel("3");
    showScreen("battleScreen");
    focusBattleCanvas();
    hidePauseOverlay();
    updateTouchControlsVisibility(this.players);
  }

  stopMatch() {
    this.active = false;
    this.pauseRequested = false;
    this.matchOver = false;
    this.players = [];
    this.hitboxes = [];
    this.particles = [];
    this.scheduledEvents = [];
    this.setCountdownLabel("");
    updateTouchControlsVisibility([]);
  }

  spawnPlayers() {
    const y = this.platform.y - 26;
    this.players[0].spawn(this.platform.x + this.platform.width * 0.28, y, 1);
    this.players[1].spawn(this.platform.x + this.platform.width * 0.72, y, -1);
    updateTouchControlsVisibility(this.players);
  }

  schedule(delay, callback) {
    this.scheduledEvents.push({ delay, callback });
  }

  update(dt) {
    if (!this.active) {
      return;
    }

    this.elapsed += dt * 1000;
    this.updateCountdowns(dt);
    this.updateScheduledEvents(dt);
    this.updateBot(dt);

    const actions = this.players.map((player) => this.getActionInput(player));
    for (let index = 0; index < this.players.length; index += 1) {
      this.players[index].update(dt, this, actions[index]);
    }

    this.resolvePlayerOverlap();
    this.updateHitboxes(dt);
    this.updateParticles(dt);
    this.checkRingOuts();
    this.updateShake(dt);
    this.updateHud();
  }

  updateCountdowns(dt) {
    if (this.stockPauseTimer > 0) {
      this.stockPauseTimer = Math.max(0, this.stockPauseTimer - dt);
      this.controlsEnabled = false;

      if (this.stockPauseTimer === 0) {
        this.spawnPlayers();
        this.players.forEach((player) => {
          player.attackCooldown = 0;
          player.invulnerableTimer = 0.48;
        });
        this.setCountdownLabel("Fight!");
        this.schedule(0.42, () => {
          if (!this.matchOver && appState.screen === "battleScreen") {
            this.setCountdownLabel("");
          }
        });
        this.controlsEnabled = true;
      }
      return;
    }

    if (this.countdownTimer > 0) {
      this.countdownTimer = Math.max(0, this.countdownTimer - dt);
      this.controlsEnabled = false;
      const displayNumber = Math.ceil(this.countdownTimer);

      if (this.countdownTimer > 0.8) {
        this.setCountdownLabel(String(clamp(displayNumber - 1, 1, 3)));
      } else if (this.countdownTimer > 0) {
        this.setCountdownLabel("Fight!");
      } else {
        this.setCountdownLabel("");
        this.controlsEnabled = true;
      }
      return;
    }

    this.controlsEnabled = true;
  }

  updateScheduledEvents(dt) {
    for (const event of this.scheduledEvents) {
      event.delay -= dt;
    }

    const ready = this.scheduledEvents.filter((event) => event.delay <= 0);
    this.scheduledEvents = this.scheduledEvents.filter((event) => event.delay > 0);

    for (const event of ready) {
      event.callback();
    }
  }

  getOpponent(player) {
    return this.players.find((candidate) => candidate !== player) || null;
  }

  updateBot(dt) {
    const bot = this.players.find((player) => player.isBot);
    const target = this.players.find((player) => !player.isBot);
    if (!bot || !target || !this.controlsEnabled || bot.hitTimer > 0 || bot.lockTimer > 0) {
      return;
    }

    const profile = bot.botDifficulty.ai;
    const memory = bot.botMemory;
    memory.nextDecisionIn -= dt;
    memory.hesitationIn -= dt;
    memory.panicIn -= dt;

    if (memory.nextDecisionIn > 0) {
      return;
    }

    memory.nextDecisionIn = randomRange(profile.decisionMin, profile.decisionMax);
    const dx = target.x - bot.x;
    const dy = target.y - bot.y;
    const distance = Math.abs(dx);
    const nearPlatformEdge = bot.x < this.platform.x + 80 || bot.x > this.platform.x + this.platform.width - 80;
    const targetNearPlatformEdge = target.x < this.platform.x + 110 || target.x > this.platform.x + this.platform.width - 110;
    const finishWindow = targetNearPlatformEdge || target.damagePercent >= profile.finishDamageThreshold;

    memory.move = 0;
    memory.block = false;
    memory.attackQueued = false;
    memory.specialQueued = false;
    memory.abilityQueued = false;
    memory.jumpQueued = false;

    if (nearPlatformEdge && chance(profile.edgeRecoveryChance)) {
      memory.move = bot.x < GAME.width / 2 ? 1 : -1;
    } else if (distance > profile.closeDistance) {
      memory.move = dx > 0 ? 1 : -1;
      if (memory.hesitationIn <= 0 && chance(profile.hesitationChance)) {
        memory.move *= -1;
        memory.hesitationIn = randomRange(profile.hesitationMin, profile.hesitationMax);
      }
    }

    if (chance(profile.mistakeMoveChance)) {
      memory.move = memory.move === 0 ? (chance(0.5) ? -1 : 1) : -memory.move;
    }

    if ((dy < -80 || nearPlatformEdge) && (bot.onGround || chance(profile.airJumpChance))) {
      memory.jumpQueued = chance(profile.jumpChance);
    }

    if (distance < profile.closeDistance && Math.abs(dy) < profile.verticalTolerance) {
      if (target.attackPoseTimer > 0 && chance(profile.blockChance)) {
        memory.block = true;
      }
      if (chance(profile.attackChance)) {
        memory.attackQueued = true;
      }
      if (bot.specialCooldown <= 0 && chance(finishWindow ? profile.finishSpecialChance : profile.specialChance)) {
        memory.specialQueued = true;
      }
    } else if (distance < profile.rangedDistance && RANGED_ATTACKER_IDS.has(bot.character.id) && chance(profile.rangedAttackChance)) {
      memory.attackQueued = true;
    } else if (distance < profile.specialDistance && bot.specialCooldown <= 0 && chance(profile.longSpecialChance)) {
      memory.specialQueued = true;
    }

    if (bot.abilityCooldown <= 0) {
      switch (bot.character.id) {
        case "ninja":
          if (distance < 170 && (target.attackPoseTimer > 0 || chance(profile.abilityChance))) {
            memory.abilityQueued = true;
          }
          break;
        case "boxer":
          if (distance < 160 && (finishWindow || chance(profile.abilityChance))) {
            memory.abilityQueued = true;
          }
          break;
        case "magier":
          if (distance < 150 && target.attackPoseTimer > 0 && chance(profile.finishAbilityChance)) {
            memory.abilityQueued = true;
          }
          break;
        case "tank":
          if (distance < 180 && (targetNearPlatformEdge || target.damagePercent > 60) && chance(profile.finishAbilityChance)) {
            memory.abilityQueued = true;
          }
          break;
        case "springer":
          if ((dy < -40 || nearPlatformEdge || chance(0.18)) && chance(profile.abilityChance)) {
            memory.abilityQueued = true;
          }
          break;
        case "samurai":
          if (distance < 170 && target.attackPoseTimer > 0 && chance(profile.finishAbilityChance)) {
            memory.abilityQueued = true;
          }
          break;
        case "assassine":
          if ((distance < 180 || nearPlatformEdge) && chance(profile.abilityChance)) {
            memory.abilityQueued = true;
          }
          break;
        case "blitzkaempfer":
          if ((distance > 120 || nearPlatformEdge) && chance(profile.abilityChance)) {
            memory.abilityQueued = true;
          }
          break;
        case "eiswaechter":
          if (distance < 230 && (target.attackPoseTimer > 0 || target.damagePercent > 45) && chance(profile.finishAbilityChance)) {
            memory.abilityQueued = true;
          }
          break;
        case "feuerlord":
          if (distance < 180 && (finishWindow || chance(profile.abilityChance))) {
            memory.abilityQueued = true;
          }
          break;
        case "schattenkrieger":
          if (distance < 180 && (target.attackPoseTimer > 0 || chance(profile.abilityChance))) {
            memory.abilityQueued = true;
          }
          break;
        case "cyborg":
          if (distance < 190 && (finishWindow || chance(profile.abilityChance))) {
            memory.abilityQueued = true;
          }
          break;
        case "berserker":
          if ((bot.lives < GAME.stockLives || finishWindow || bot.damagePercent > 60) && chance(profile.finishAbilityChance)) {
            memory.abilityQueued = true;
          }
          break;
        case "windlaeufer":
          if ((!bot.onGround || nearPlatformEdge || dy < -20) && chance(profile.abilityChance)) {
            memory.abilityQueued = true;
          }
          break;
        case "titan":
          if (distance < 190 && (targetNearPlatformEdge || target.damagePercent > 70) && chance(profile.finishAbilityChance)) {
            memory.abilityQueued = true;
          }
          break;
        default:
          break;
      }
    }

    if (memory.panicIn <= 0 && target.attackPoseTimer > 0 && distance < profile.panicDistance && chance(profile.panicJumpChance)) {
      memory.jumpQueued = true;
      memory.panicIn = randomRange(profile.panicMin, profile.panicMax);
    }
  }

  getActionInput(player) {
    if (player.isBot) {
      const memory = player.botMemory;
      const action = DEFAULT_ACTION();
      action.heldActions.left = memory.move < 0;
      action.heldActions.right = memory.move > 0;
      action.heldActions.block = memory.block;
      action.pressedActions.jump = memory.jumpQueued;
      action.pressedActions.attack = memory.attackQueued;
      action.pressedActions.special = memory.specialQueued;
      action.pressedActions.ability = memory.abilityQueued;

      memory.jumpQueued = false;
      memory.attackQueued = false;
      memory.specialQueued = false;
      memory.abilityQueued = false;
      return syncActionBooleans(action);
    }

    return inputManager.getActionForChoice(player.inputChoice, player.slot);
  }

  resolvePlayerOverlap() {
    if (this.players.length < 2) {
      return;
    }

    const [player1, player2] = this.players;
    const dx = player2.x - player1.x;
    const dy = player2.y - player1.y;
    const distance = Math.hypot(dx, dy);
    const minDistance = player1.collisionRadius + player2.collisionRadius - 4;

    if (distance === 0 || distance >= minDistance) {
      return;
    }

    const overlap = minDistance - distance;
    const nx = dx / distance;
    const ny = dy / distance;
    player1.x -= nx * overlap * 0.5;
    player1.y -= ny * overlap * 0.5;
    player2.x += nx * overlap * 0.5;
    player2.y += ny * overlap * 0.5;
  }

  updateHitboxes(dt) {
    for (const hitbox of this.hitboxes) {
      hitbox.update(dt);
    }

    for (const hitbox of this.hitboxes) {
      for (const target of this.players) {
        if (!hitbox.collidesWith(target)) {
          continue;
        }
        hitbox.alreadyHit.add(target.id);
        target.applyHit(hitbox, this);
      }
    }

    this.hitboxes = this.hitboxes.filter((hitbox) => hitbox.ttl > 0);
  }

  updateParticles(dt) {
    for (const particle of this.particles) {
      particle.update(dt);
    }
    this.particles = this.particles.filter((particle) => particle.life > 0);
  }

  updateShake(dt) {
    this.shakeTime = Math.max(0, this.shakeTime - dt);
    if (this.shakeTime === 0) {
      this.shakeMagnitude = approach(this.shakeMagnitude, 0, 20 * dt);
    }
  }

  shake(magnitude, duration) {
    this.shakeMagnitude = Math.max(this.shakeMagnitude, magnitude);
    this.shakeTime = Math.max(this.shakeTime, duration);
  }

  spawnHitbox(options) {
    const entity = new AttackEntity(options);
    this.hitboxes.push(entity);
    return entity;
  }

  spawnParticleBurst(x, y, color, amount, options = {}) {
    const speed = options.speed ?? 180;
    for (let index = 0; index < amount; index += 1) {
      const angle = randomRange(0, Math.PI * 2);
      const magnitude = randomRange(speed * 0.45, speed);
      this.particles.push(
        new Particle(x, y, {
          vx: Math.cos(angle) * magnitude,
          vy: Math.sin(angle) * magnitude - 40,
          life: options.life ?? randomRange(0.24, 0.42),
          size: options.size ?? randomRange(2, 4.8),
          color,
          gravity: options.gravity ?? 440,
          shape: options.shape ?? "dot",
          drag: options.drag ?? 0.98,
        }),
      );
    }
  }

  checkRingOuts() {
    if (this.stockPauseTimer > 0 || this.matchOver) {
      return;
    }

    for (const player of this.players) {
      const isOut =
        player.y > GAME.height + GAME.ringMargin ||
        player.x < -GAME.ringMargin ||
        player.x > GAME.width + GAME.ringMargin;

      if (!isOut) {
        continue;
      }

      this.handleStockLoss(player);
      break;
    }
  }

  handleStockLoss(loser) {
    this.sound.play("ringout");
    this.spawnParticleBurst(loser.x, clamp(loser.y, 0, GAME.height), loser.accent, 22, {
      speed: 250,
      life: 0.46,
      size: 4.5,
      shape: "streak",
      gravity: 0,
    });

    loser.lives = Math.max(0, loser.lives - 1);
    this.updateHud(true);

    if (loser.lives <= 0) {
      const winner = this.players.find((player) => player !== loser);
      this.finishMatch(winner, loser);
      return;
    }

    this.hitboxes = [];
    this.scheduledEvents = [];
    this.stockPauseTimer = GAME.respawnPause;
    this.controlsEnabled = false;
    this.players.forEach((player) => {
      player.vx = 0;
      player.vy = 0;
      player.attackPoseTimer = 0;
      player.hitTimer = 0;
    });
    this.setCountdownLabel(`${loser.label} verliert 1 Leben`);
    this.schedule(0.8, () => {
      if (!this.matchOver && this.stockPauseTimer > 0) {
        this.setCountdownLabel("Respawn");
      }
    });
  }

  finishMatch(winner, loser) {
    this.matchOver = true;
    this.controlsEnabled = false;
    this.hitboxes = [];
    this.scheduledEvents = [];
    this.setCountdownLabel("");
    this.sound.play("victory");

    const result = this.currentMode === "local"
      ? {
          eyebrow: "Match vorbei",
          title: `${winner.label} gewinnt!`,
          subtitle: `${loser.label} hat keine Leben mehr und wurde aus der Arena gedrueckt.`,
          tone: "duel",
        }
      : winner.slot === 1
        ? {
            eyebrow: "Victory",
            title: "Spieler 1 gewinnt!",
            subtitle: `Du hast ${loser.character.name} aus der Arena geworfen und den Bot auf ${this.currentBotDifficulty.label} besiegt.`,
            tone: "win",
          }
        : {
            eyebrow: "Defeat",
            title: "Spieler 1 verliert!",
            subtitle: `Der Bot mit ${winner.character.name} auf ${this.currentBotDifficulty.label} hat die Kontrolle ueber die Plattform behalten.`,
            tone: "lose",
          };

    showEndScreen(result);
  }

  setCountdownLabel(text) {
    ui.countdownOverlay.textContent = text;
    ui.countdownOverlay.classList.toggle("hidden", !text);
  }

  updateHud(forceLives = false) {
    const [player1, player2] = this.players;
    if (!player1 || !player2) {
      return;
    }

    ui.p1Label.textContent = player1.label;
    ui.p1Character.textContent = player1.character.name;
    ui.p1InputTag.textContent = player1.getInputLabel();
    ui.p2Label.textContent = player2.label;
    ui.p2Character.textContent = player2.character.name;
    ui.p2InputTag.textContent = player2.getInputLabel();
    ui.modeBadge.textContent = this.currentMode === "local"
      ? "2 Spieler lokal"
      : `Bot - ${this.currentBotDifficulty.label}`;

    if (forceLives) {
      renderLives(ui.p1Lives, player1.lives);
      renderLives(ui.p2Lives, player2.lives);
    }

    updateGuidePanel(player1, ui.p1GuideTitle, ui.p1GuideMove, ui.p1GuideAttack, ui.p1GuideAbility);
    updateGuidePanel(player2, ui.p2GuideTitle, ui.p2GuideMove, ui.p2GuideAttack, ui.p2GuideAbility);
    updateDamagePanel(player1, ui.p1DamageCard, ui.p1DamageMeta, ui.p1DamageValue, ui.p1DamageFill);
    updateDamagePanel(player2, ui.p2DamageCard, ui.p2DamageMeta, ui.p2DamageValue, ui.p2DamageFill);

    const p1SpecialFill = (1 - player1.specialCooldown / player1.stats.specialCooldown) * 100;
    const p2SpecialFill = (1 - player2.specialCooldown / player2.stats.specialCooldown) * 100;
    const p1AbilityFill = (1 - player1.abilityCooldown / player1.stats.abilityCooldown) * 100;
    const p2AbilityFill = (1 - player2.abilityCooldown / player2.stats.abilityCooldown) * 100;
    ui.p1CooldownFill.style.width = `${clamp(p1SpecialFill, 0, 100)}%`;
    ui.p2CooldownFill.style.width = `${clamp(p2SpecialFill, 0, 100)}%`;
    ui.p1AbilityFill.style.width = `${clamp(p1AbilityFill, 0, 100)}%`;
    ui.p2AbilityFill.style.width = `${clamp(p2AbilityFill, 0, 100)}%`;
  }

  render() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    this.drawArenaBackground();

    ctx.save();
    if (this.shakeTime > 0 && this.shakeMagnitude > 0) {
      ctx.translate(randomRange(-this.shakeMagnitude, this.shakeMagnitude), randomRange(-this.shakeMagnitude, this.shakeMagnitude));
    }

    this.drawArena();
    for (const particle of this.particles) {
      particle.draw(ctx);
    }
    for (const hitbox of this.hitboxes) {
      hitbox.draw(ctx);
    }
    for (const player of this.players) {
      player.draw(ctx, this.elapsed);
    }
    ctx.restore();
  }

  drawArenaBackground() {
    const sky = ctx.createLinearGradient(0, 0, 0, GAME.height);
    sky.addColorStop(0, "#071025");
    sky.addColorStop(0.5, "#050917");
    sky.addColorStop(1, "#02040d");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, GAME.width, GAME.height);

    const cyanGlow = ctx.createRadialGradient(GAME.width * 0.5, 140, 30, GAME.width * 0.5, 140, 420);
    cyanGlow.addColorStop(0, "rgba(72, 243, 255, 0.22)");
    cyanGlow.addColorStop(1, "rgba(72, 243, 255, 0)");
    ctx.fillStyle = cyanGlow;
    ctx.fillRect(0, 0, GAME.width, GAME.height);

    const redGlow = ctx.createRadialGradient(GAME.width * 0.82, 180, 10, GAME.width * 0.82, 180, 240);
    redGlow.addColorStop(0, "rgba(255, 95, 117, 0.18)");
    redGlow.addColorStop(1, "rgba(255, 95, 117, 0)");
    ctx.fillStyle = redGlow;
    ctx.fillRect(0, 0, GAME.width, GAME.height);

    ctx.strokeStyle = "rgba(72, 243, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let y = 420; y <= GAME.height + 40; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(GAME.width, y);
      ctx.stroke();
    }

    for (let x = 80; x < GAME.width; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 410);
      ctx.lineTo(GAME.width / 2 + (x - GAME.width / 2) * 1.8, GAME.height);
      ctx.stroke();
    }
  }

  drawArena() {
    const platform = this.platform;
    const topGradient = ctx.createLinearGradient(platform.x, platform.y, platform.x, platform.y + platform.height);
    topGradient.addColorStop(0, "#163263");
    topGradient.addColorStop(1, "#081120");

    ctx.save();
    ctx.shadowBlur = 28;
    ctx.shadowColor = "rgba(72, 243, 255, 0.34)";
    ctx.fillStyle = topGradient;
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    ctx.restore();

    ctx.fillStyle = "rgba(10, 18, 35, 0.98)";
    ctx.fillRect(platform.x + 28, platform.y + platform.height, platform.width - 56, 44);

    ctx.strokeStyle = "rgba(72, 243, 255, 0.42)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(platform.x, platform.y);
    ctx.lineTo(platform.x + platform.width, platform.y);
    ctx.stroke();

    ctx.fillStyle = "rgba(18, 35, 70, 0.88)";
    ctx.fillRect(platform.x + 110, platform.y + 70, 34, 106);
    ctx.fillRect(platform.x + platform.width - 144, platform.y + 70, 34, 106);

    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    ctx.fillRect(platform.x + 24, platform.y + 8, platform.width - 48, 5);

    const arenaGlow = ctx.createRadialGradient(GAME.width / 2, platform.y - 60, 10, GAME.width / 2, platform.y - 60, 380);
    arenaGlow.addColorStop(0, "rgba(255, 216, 106, 0.08)");
    arenaGlow.addColorStop(1, "rgba(255, 216, 106, 0)");
    ctx.fillStyle = arenaGlow;
    ctx.fillRect(0, platform.y - 220, GAME.width, 340);
  }

  getMissingAssignedControllerLabels() {
    if (!this.active) {
      return [];
    }

    const missing = [];
    for (const player of this.players) {
      if (player.isBot) {
        continue;
      }
      const controllerSlot = getControllerSlotFromChoice(player.inputChoice);
      if (controllerSlot !== null && !inputManager.hasController(controllerSlot)) {
        missing.push(getInputChoiceLabel(player.inputChoice, player.slot));
      }
    }
    return missing;
  }
}

const inputManager = new InputManager();
const game = new ArenaGame();

function renderLives(container, lives) {
  container.innerHTML = "";
  for (let index = 0; index < GAME.stockLives; index += 1) {
    const heart = document.createElement("span");
    heart.className = `life-heart ${index < lives ? "" : "empty"}`.trim();
    container.appendChild(heart);
  }
}

function getDamageColor(percent) {
  if (percent >= 160) {
    return "#ff5f75";
  }
  if (percent >= 110) {
    return "#ff9c50";
  }
  if (percent >= 60) {
    return "#ffd86a";
  }
  return "#48f3ff";
}

function updateDamagePanel(player, cardElement, metaElement, valueElement, fillElement) {
  const percent = Math.round(player.damagePercent);
  const color = getDamageColor(percent);
  cardElement.style.setProperty("--damage-color", color);
  metaElement.textContent = `${player.label} - ${player.character.name}`;
  valueElement.textContent = `${percent}%`;
  fillElement.style.width = `${clamp((percent / 240) * 100, 0, 100)}%`;
}

function updateGuidePanel(player, titleElement, moveElement, attackElement, abilityElement) {
  if (player.isBot) {
    titleElement.textContent = `${player.label} - ${player.character.name}`;
    moveElement.textContent = `KI ${player.botDifficulty.label}: laeuft, springt, blockt und sucht aktiv Kantenkontrolle.`;
    attackElement.textContent = `Auto: ${player.character.normalAttackName} | Spezial: ${player.character.specialName}`;
    abilityElement.textContent = `Faehigkeit: ${player.character.abilityName}`;
    return;
  }

  const inputLabel = getInputChoiceLabel(player.inputChoice, player.slot);
  titleElement.textContent = `${player.label} - ${player.character.name}`;

  if (player.inputChoice === "keyboard") {
    const mapping = player.slot === 2 ? KEYBOARD_LAYOUTS.player2 : KEYBOARD_LAYOUTS.player1;
    moveElement.textContent = `${inputLabel}: ${formatKeyCode(mapping.left)}/${formatKeyCode(mapping.right)} bewegen | ${formatKeyCode(mapping.jump)} springen | ${formatKeyCode(mapping.block)} blocken`;
    attackElement.textContent = `${formatKeyCode(mapping.attack)} ${player.character.normalAttackName} | ${formatKeyCode(mapping.special)} ${player.character.specialName}`;
    abilityElement.textContent = `${formatKeyCode(mapping.ability[0])} ${player.character.abilityName} | ${formatKeyCode(mapping.pause[0])} Pause`;
  } else if (player.inputChoice === "touch") {
    moveElement.textContent = `${inputLabel}: eigenes Touch-Pad | Links/Rechts | Sprung-Button | Block-Button`;
    attackElement.textContent = `Angriff ${player.character.normalAttackName} | Spezial ${player.character.specialName}`;
    abilityElement.textContent = `Faehigkeit ${player.character.abilityName} | Pause-Button`;
  } else {
    const scheme = getResolvedControllerScheme(player.inputChoice);
    if (scheme === "xbox") {
      moveElement.textContent = `${inputLabel}: Stick oder Steuerkreuz bewegen | A springen | LB blocken`;
      attackElement.textContent = `B ${player.character.normalAttackName} | X ${player.character.specialName}`;
      abilityElement.textContent = `Y ${player.character.abilityName} | Menu Pause`;
    } else {
      moveElement.textContent = `${inputLabel}: Stick oder D-Pad bewegen | X springen | L1 blocken`;
      attackElement.textContent = `Kreis ${player.character.normalAttackName} | Quadrat ${player.character.specialName}`;
      abilityElement.textContent = `Dreieck ${player.character.abilityName} | Options Pause`;
    }
  }
}

function getHumanDetailKeyboardText(slot) {
  if (slot === 1) {
    return "A/D bewegen, W springen, S blocken, F normaler Angriff, G Spezialangriff, H neue Faehigkeit.";
  }
  return "Pfeile links/rechts bewegen, Pfeil hoch springen, Pfeil runter blocken, K normaler Angriff, L Spezialangriff, M oder Oe neue Faehigkeit.";
}

function getCharacterRatings(character) {
  const stats = character.gameplay;
  return [
    { label: "Tempo", value: clamp(Math.round((stats.moveSpeed - 250) / 45), 1, 5) },
    { label: "Sprung", value: clamp(Math.round((stats.jumpForce - 670) / 42), 1, 5) },
    { label: "Defensive", value: clamp(Math.round((stats.resistance - 0.78) * 6.6), 1, 5) },
    { label: "Power", value: clamp(Math.round((stats.attackKnockback - 430) / 85 + (character.normalDamage - 6) * 0.5), 1, 5) },
    { label: "Spezial", value: clamp(Math.round((character.specialDamage - 8) / 2.1), 1, 5) },
  ];
}

function updateCharacterDetail() {
  const character = CHARACTER_MAP[appState.selectedCharacterId];
  if (!character) {
    return;
  }

  const isBotSlot = appState.mode === "bot" && appState.selectingSlot === 2;

  ui.detailBadge.textContent = character.role;
  ui.detailName.textContent = character.name;
  ui.detailDescription.textContent = character.description;
  ui.detailDesign.textContent = character.designDescription;
  ui.detailNormalName.textContent = character.normalAttackName;
  ui.detailNormalDescription.textContent = character.normalAttackDescription;
  ui.detailSpecialName.textContent = character.specialName;
  ui.detailSpecialDescription.textContent = character.specialDescription;
  ui.detailAbilityName.textContent = character.abilityName;
  ui.detailAbilityDescription.textContent = character.abilityDescription;
  ui.detailAbilityCooldown.textContent = `Cooldown: ${character.gameplay.abilityCooldown.toFixed(1)} s`;
  const selectedChoice = isBotSlot
    ? "bot"
    : appState.selectingSlot === 2
      ? appState.inputSelections.player2
      : appState.inputSelections.player1;
  ui.detailKeyboardControls.textContent = isBotSlot
    ? getKeyboardControlTextForSlot(2, true)
    : getHumanDetailKeyboardText(appState.selectingSlot);
  if (!isBotSlot && selectedChoice === "touch") {
    ui.detailControllerControls.textContent = getTouchControlText();
  } else {
    ui.detailControllerControls.textContent = isBotSlot
      ? getControllerControlText(true)
      : getControllerControlText(false, getResolvedControllerScheme(selectedChoice));
  }
  ui.detailPros.textContent = character.pros;
  ui.detailCons.textContent = character.cons;

  ui.detailStats.innerHTML = "";
  for (const stat of character.statsText) {
    const chip = document.createElement("span");
    chip.className = "stat-chip";
    chip.textContent = stat;
    ui.detailStats.appendChild(chip);
  }

  const ratingGrid = document.createElement("div");
  ratingGrid.className = "rating-grid";
  for (const rating of getCharacterRatings(character)) {
    const row = document.createElement("div");
    row.className = "rating-row";
    row.innerHTML = `
      <span class="rating-label">${rating.label}</span>
      <span class="rating-track"><span class="rating-fill" style="width:${(rating.value / 5) * 100}%"></span></span>
      <span class="rating-value">${rating.value}/5</span>
    `;
    ratingGrid.appendChild(row);
  }
  ui.detailStats.appendChild(ratingGrid);

  let selectedCard = null;
  [...ui.characterGrid.children].forEach((card) => {
    const isSelected = card.dataset.characterId === character.id;
    card.classList.toggle("selected", isSelected);
    if (isSelected) {
      selectedCard = card;
    }
  });

  if (selectedCard && appState.screen === "characterScreen") {
    selectedCard.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
}

function renderCharacterCards() {
  ui.characterGrid.innerHTML = "";

  for (const character of CHARACTER_DATA) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "character-card";
    card.dataset.characterId = character.id;
    card.style.setProperty("--card-color", character.accent);
    card.innerHTML = `
      <div class="card-accent"></div>
      <div class="character-role">${character.role}</div>
      <h4>${character.name}</h4>
      <p>${character.designDescription}</p>
      <div class="card-traits">
        <span>${character.normalAttackName}</span>
        <span>${character.specialName}</span>
        <span>${character.abilityName}</span>
      </div>
    `;
    card.addEventListener("click", () => {
      appState.selectedCharacterId = character.id;
      updateCharacterDetail();
    });
    ui.characterGrid.appendChild(card);
  }
}

function getSelectionInputSummary(slot) {
  if (appState.mode === "bot" && slot === 2) {
    return `Bot-KI - ${getBotDifficultyConfig(appState.botDifficulty).label}`;
  }

  const choice = slot === 2 ? appState.inputSelections.player2 : appState.inputSelections.player1;
  return getInputChoiceLabel(choice, slot);
}

function updateSelectionHeader() {
  const isBotSelection = appState.mode === "bot" && appState.selectingSlot === 2;
  const label = appState.selectingSlot === 1 ? "Spieler 1" : isBotSelection ? "Bot-Gegner" : "Spieler 2";
  const confirmLabel = appState.selectingSlot === 1 ? "Spieler 1 bestaetigen" : `${label} bestaetigen`;
  const sourceLabel = getSelectionInputSummary(appState.selectingSlot);
  const difficultyLabel = getBotDifficultyConfig(appState.botDifficulty).label;

  ui.selectionStep.textContent = `Schritt 2 - Auswahl ${appState.selectingSlot}/2`;
  ui.selectionTitle.textContent = `${label} waehlt`;
  ui.selectionSubtitle.textContent = isBotSelection
    ? `Waehle den Gegner-Charakter fuer die Bot-KI auf ${difficultyLabel}. Slot-Quelle: ${sourceLabel}.`
    : `Waehle ein Strichmaennchen. Aktueller Input fuer ${label}: ${sourceLabel}.`;
  ui.confirmCharacterTopButton.textContent = confirmLabel;
  ui.confirmCharacterButton.textContent = confirmLabel;
}

function validateSetup() {
  if (!appState.mode) {
    return { ok: false, message: "Waehle zuerst einen Kampfmodus." };
  }

  if (appState.mode === "local") {
    const p1 = appState.inputSelections.player1;
    const p2 = appState.inputSelections.player2;
    if (isControllerChoice(p1) && isControllerChoice(p2) && getControllerSlotFromChoice(p1) === getControllerSlotFromChoice(p2)) {
      return { ok: false, message: "Spieler 1 und Spieler 2 duerfen nicht denselben Controller benutzen." };
    }
  }

  const choices = appState.mode === "bot"
    ? [appState.inputSelections.player1]
    : [appState.inputSelections.player1, appState.inputSelections.player2];

  for (const choice of choices) {
    const controllerSlot = getControllerSlotFromChoice(choice);
    if (controllerSlot !== null && !inputManager.hasController(controllerSlot)) {
      return {
        ok: false,
        message: `${INPUT_LABELS[choice]} ist aktuell nicht verbunden. Bitte Ps- oder Xbox-Controller verbinden und eine Taste druecken.`,
      };
    }
    if (controllerSlot !== null && !isControllerChoiceCompatible(choice)) {
      const detectedFamily = getConnectedControllerFamily(controllerSlot);
      const detectedLabel = detectedFamily && detectedFamily !== "generic"
        ? `${getControllerFamilyLabel(detectedFamily)}-Controller`
        : "anderen Controller";
      return {
        ok: false,
        message: `${INPUT_LABELS[choice]} passt nicht zum verbundenen Geraet. Controller ${controllerSlot + 1} wurde als ${detectedLabel} erkannt.`,
      };
    }
  }

  return { ok: true, message: "" };
}

function updateControllerStatusCard(cardElement, slot, state) {
  const title = cardElement.querySelector(".controller-status-value");
  const copy = cardElement.querySelector(".controller-status-copy");
  cardElement.classList.toggle("connected", state.connected);
  cardElement.classList.toggle("missing", !state.connected);
  const family = detectControllerFamilyFromId(state.id);
  title.textContent = state.connected
    ? family === "xbox"
      ? "Xbox verbunden"
      : family === "ps"
        ? "Ps verbunden"
        : "Controller verbunden"
    : "Nicht verbunden";
  copy.textContent = state.connected
    ? (state.id.length > 62 ? `${state.id.slice(0, 62)}...` : state.id)
    : "Kein Gamepad erkannt.";
  const label = cardElement.querySelector(".controller-slot-label");
  label.textContent = `Controller ${slot + 1}`;
}

function updateControllerDebugCard(cardElement, slot, state) {
  if (!cardElement) {
    return;
  }

  const title = cardElement.querySelector(".controller-debug-title");
  const nameValue = cardElement.querySelector("[data-debug-name]");
  const indexValue = cardElement.querySelector("[data-debug-index]");
  const buttonsValue = cardElement.querySelector("[data-debug-buttons]");
  const axesValue = cardElement.querySelector("[data-debug-axes]");
  const actionsValue = cardElement.querySelector("[data-debug-actions]");
  const label = cardElement.querySelector(".controller-slot-label");
  const family = detectControllerFamilyFromId(state.id);
  const familyLabel = getControllerFamilyLabel(family);

  cardElement.classList.toggle("connected", Boolean(state.connected));
  label.textContent = `Debug Controller ${slot + 1}`;

  if (!state.connected) {
    title.textContent = "Kein Controller aktiv";
    nameValue.textContent = "-";
    indexValue.textContent = "-";
    buttonsValue.textContent = "Keine";
    axesValue.textContent = "x: 0.00 | y: 0.00";
    actionsValue.textContent = "Keine Aktion";
    return;
  }

  const buttonIndices = getPressedButtonIndices(state);
  const actionLabels = getControllerActionLabels(state);
  title.textContent = family === "generic" ? "Controller aktiv" : `${familyLabel} Controller aktiv`;
  nameValue.textContent = state.id || `Controller ${slot + 1}`;
  indexValue.textContent = `${state.physicalIndex}`;
  buttonsValue.textContent = buttonIndices.length > 0 ? buttonIndices.map((index) => `#${index}`).join(", ") : "Keine";
  axesValue.textContent = `x: ${formatAxisValue(state.axes?.[0] ?? 0)} | y: ${formatAxisValue(state.axes?.[1] ?? 0)}`;
  actionsValue.textContent = actionLabels.length > 0 ? actionLabels.join(", ") : "Keine Aktion";
}

function refreshModeScreen() {
  ui.modeCards.forEach((card) => {
    card.classList.toggle("selected", card.dataset.mode === appState.mode);
  });

  ui.botDifficultyPanel.hidden = appState.mode !== "bot";
  ui.setupPanel.hidden = !appState.mode;
  ui.difficultyCards.forEach((card) => {
    card.classList.toggle("selected", card.dataset.difficulty === appState.botDifficulty);
  });

  updateControllerStatusCard(ui.controllerStatus0, 0, inputManager.gamepads[0]);
  updateControllerStatusCard(ui.controllerStatus1, 1, inputManager.gamepads[1]);
  updateControllerDebugCard(ui.controllerDebug0, 0, inputManager.gamepads[0]);
  updateControllerDebugCard(ui.controllerDebug1, 1, inputManager.gamepads[1]);
  const relevantChoices = appState.mode === "bot"
    ? [appState.inputSelections.player1]
    : [appState.inputSelections.player1, appState.inputSelections.player2];
  const expectsController = relevantChoices.some((choice) => isControllerChoice(choice));
  ui.controllerWarningText.hidden = !expectsController || inputManager.connectedCount > 0;

  if (appState.mode === "bot") {
    ui.setupSubtitle.textContent = `Lege nur fuer Spieler 1 fest, ob du mit Tastatur, Handy Touch, Ps- oder Xbox-Controller spielst. Slot 2 wird von der Bot-KI auf ${getBotDifficultyConfig(appState.botDifficulty).label} uebernommen und kann nicht per Touch gesteuert werden.`;
    ui.player2AssignmentLabel.textContent = "Spieler 2";
    ui.player2AssignmentTitle.textContent = "Bot-KI";
    ui.player2AssignmentCopy.textContent = `Der Bot uebernimmt Slot 2 automatisch. Schwierigkeit: ${getBotDifficultyConfig(appState.botDifficulty).label}.`;
  } else {
    ui.setupSubtitle.textContent = "Waehle fuer beide Spieler ein eigenes Input-Profil. Tastatur, Handy Touch sowie Ps- und Xbox-Controller koennen gemischt werden. Zwei Touch-Spieler teilen sich getrennte On-Screen-Pads.";
    ui.player2AssignmentLabel.textContent = "Spieler 2";
    ui.player2AssignmentTitle.textContent = "Input-Profil";
    ui.player2AssignmentCopy.textContent = "Waehle ein separates Profil. Derselbe Controller kann nicht beiden Spielern gleichzeitig zugewiesen werden, zwei Touch-Profile dagegen schon.";
  }

  ui.player2AssignmentCard.hidden = appState.mode === "bot";
  ui.player2InputOptions.hidden = appState.mode === "bot";
  ui.player2AssignmentCard.parentElement.classList.toggle("single-player", appState.mode === "bot");

  ui.inputOptionButtons.forEach((button) => {
    const playerKey = button.dataset.player === "1" ? "player1" : "player2";
    const selected = appState.inputSelections[playerKey] === button.dataset.input;
    const controllerSlot = getControllerSlotFromChoice(button.dataset.input);
    const otherPlayerKey = playerKey === "player1" ? "player2" : "player1";
    const otherChoice = appState.inputSelections[otherPlayerKey];
    const otherControllerSlot = getControllerSlotFromChoice(otherChoice);
    const unavailable =
      (controllerSlot !== null && !inputManager.hasController(controllerSlot)) ||
      (controllerSlot !== null && inputManager.hasController(controllerSlot) && !isControllerChoiceCompatible(button.dataset.input)) ||
      (appState.mode === "local" && controllerSlot !== null && otherControllerSlot !== null && controllerSlot === otherControllerSlot && !selected);
    button.classList.toggle("selected", selected);
    button.classList.toggle("unavailable", unavailable);
  });

  const validation = validateSetup();
  ui.setupErrorText.hidden = validation.ok || !appState.mode;
  ui.setupErrorText.textContent = validation.message;
  ui.continueToCharactersButton.disabled = !validation.ok;
  updateTouchControlsVisibility();
}

function openCharacterSelection() {
  appState.selectingSlot = 1;
  appState.selections.player1 = null;
  appState.selections.player2 = null;
  appState.selectedCharacterId = appState.lastSelections.player1 || CHARACTER_DATA[0].id;
  showScreen("characterScreen");
  updateSelectionHeader();
  updateCharacterDetail();
}

function continueFromSetup() {
  const validation = validateSetup();
  if (!validation.ok) {
    refreshModeScreen();
    return;
  }
  openCharacterSelection();
}

function confirmBotDifficultySelection() {
  refreshModeScreen();
  ui.setupPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function confirmCharacterSelection() {
  const selectedId = appState.selectedCharacterId;
  if (appState.selectingSlot === 1) {
    appState.selections.player1 = selectedId;
    appState.selectingSlot = 2;
    appState.selectedCharacterId = appState.lastSelections.player2 || CHARACTER_DATA[1].id;
    updateSelectionHeader();
    updateCharacterDetail();
    return;
  }

  appState.selections.player2 = selectedId;
  appState.lastSelections = { ...appState.selections };
  game.sound.unlock();
  game.startMatch(
    appState.mode,
    appState.selections,
    { ...appState.inputSelections },
    appState.botDifficulty,
  );
}

function showEndScreen(result) {
  ui.endPanel.classList.remove("win", "lose", "duel");
  ui.endPanel.classList.add(result.tone);
  ui.endEyebrow.textContent = result.eyebrow;
  ui.endTitle.textContent = result.title;
  ui.endSubtitle.textContent = result.subtitle;
  ui.playAgainButton.textContent = "Nochmal spielen";
  showScreen("endScreen");
}

function showPauseOverlay(eyebrow, title, message) {
  ui.pauseEyebrow.textContent = eyebrow;
  ui.pauseTitle.textContent = title;
  ui.pauseMessage.textContent = message;
  ui.pauseOverlay.classList.remove("hidden");
}

function hidePauseOverlay() {
  ui.pauseOverlay.classList.add("hidden");
}

function updateTouchControlsVisibility(players = game.players) {
  const inBattle = appState.screen === "battleScreen" && game.active;
  const currentMode = game.active ? game.currentMode : appState.mode;
  let touchPlayer1 = null;
  let touchPlayer2 = null;

  if (inBattle) {
    if (currentMode === "bot") {
      touchPlayer1 = players.find((player) => !player.isBot && player.slot === 1 && player.inputChoice === "touch") ?? null;
    } else {
      touchPlayer1 = players.find((player) => !player.isBot && player.slot === 1 && player.inputChoice === "touch") ?? null;
      touchPlayer2 = players.find((player) => !player.isBot && player.slot === 2 && player.inputChoice === "touch") ?? null;
    }
  }

  const shouldShowControls = Boolean(touchPlayer1 || touchPlayer2);
  document.body.classList.toggle("mobile-touch-ui", shouldShowControls);
  ui.touchControls.hidden = !shouldShowControls;
  ui.touchControls.classList.toggle("dual-touch", Boolean(touchPlayer1 && touchPlayer2));
  ui.touchPanelP1.hidden = !touchPlayer1;
  ui.touchPanelP2.hidden = !touchPlayer2;

  if (!touchPlayer1) {
    inputManager.clearTouchSlot(1);
  }
  if (!touchPlayer2) {
    inputManager.clearTouchSlot(2);
  }

  ui.touchButtons.forEach((button) => {
    const touchPlayer = Number(button.dataset.touchPlayer || "1");
    const shouldShowButton = touchPlayer === 1 ? Boolean(touchPlayer1) : Boolean(touchPlayer2);
    const activeSet = inputManager.touchDown[touchPlayer] ?? inputManager.touchDown[1];
    button.classList.toggle("active", shouldShowButton && activeSet.has(button.dataset.touchAction));
  });

  if (!shouldShowControls) {
    ui.touchStatusLabel.textContent = "Handy Touch inaktiv";
    return;
  }

  if (touchPlayer1) {
    const label = ui.touchPanelP1.querySelector(".touch-panel-label");
    if (label) {
      label.textContent = `${touchPlayer1.label} Touch`;
    }
  }

  if (touchPlayer2) {
    const label = ui.touchPanelP2.querySelector(".touch-panel-label");
    if (label) {
      label.textContent = `${touchPlayer2.label} Touch`;
    }
  }

  const labels = [];
  if (touchPlayer1) {
    labels.push(touchPlayer1.label);
  }
  if (touchPlayer2) {
    labels.push(touchPlayer2.label);
  }
  ui.touchStatusLabel.textContent = `Handy Touch aktiv - ${labels.join(" + ")}`;
}

function refreshTouchControls(players = game.players) {
  updateTouchControlsVisibility(players);
}

function pauseMatch(kind, eyebrow, title, message) {
  if (!game.active || game.matchOver) {
    return;
  }
  game.pauseRequested = true;
  game.pauseKind = kind;
  showPauseOverlay(eyebrow, title, message);
}

function resumeMatch() {
  if (!game.active || game.matchOver) {
    return;
  }

  const missing = game.getMissingAssignedControllerLabels();
  if (missing.length > 0) {
    pauseMatch(
      "controller",
      "Controller fehlt",
      "Verbindung unterbrochen",
      `${missing.join(" und ")} fehlt gerade. Bitte Ps- oder Xbox-Controller verbinden und eine Taste druecken.`,
    );
    return;
  }

  game.pauseRequested = false;
  game.pauseKind = "manual";
  hidePauseOverlay();
}

function togglePause() {
  if (!game.active || game.matchOver) {
    return;
  }

  if (game.pauseRequested) {
    resumeMatch();
    return;
  }

  pauseMatch("manual", "Pause", "Runde angehalten", "Druecke ESC oder Options oder nutze die Buttons, um fortzufahren.");
}

function handleCharacterBack() {
  if (appState.selectingSlot === 2) {
    appState.selectingSlot = 1;
    appState.selectedCharacterId = appState.selections.player1 || appState.lastSelections.player1 || CHARACTER_DATA[0].id;
    updateSelectionHeader();
    updateCharacterDetail();
    return;
  }

  showScreen("modeScreen");
}

function resetToMenu() {
  game.stopMatch();
  hidePauseOverlay();
  appState.mode = null;
  ui.touchControls.hidden = true;
  ui.touchControls.classList.remove("dual-touch");
  ui.touchPanelP1.hidden = true;
  ui.touchPanelP2.hidden = true;
  updateTouchControlsVisibility([]);
  showScreen("mainMenu");
}

function refreshLiveBattleWarnings() {
  if (!game.active || appState.screen !== "battleScreen" || game.matchOver) {
    return;
  }

  const missing = game.getMissingAssignedControllerLabels();
  if (missing.length > 0) {
    pauseMatch(
      "controller",
      "Controller fehlt",
      "Verbindung unterbrochen",
      `${missing.join(" und ")} wurde getrennt. Bitte Ps- oder Xbox-Controller verbinden und eine Taste druecken.`,
    );
  }
}

function handleBattlePauseInput() {
  if (!game.active || appState.screen !== "battleScreen") {
    return;
  }

  if (inputManager.getPausePressedForBattle(game.players)) {
    togglePause();
  }
}

function assignInputChoice(playerKey, inputChoice) {
  appState.inputSelections[playerKey] = inputChoice;
  refreshModeScreen();
  updateTouchControlsVisibility();
}

function activateMode(mode) {
  game.sound.unlock();
  appState.mode = mode;
  if (!appState.inputSelections.player1) {
    appState.inputSelections.player1 = "keyboard";
  }
  if (mode === "local" && !appState.inputSelections.player2) {
    appState.inputSelections.player2 = "keyboard";
  }
  showScreen("modeScreen");
  refreshModeScreen();
  updateTouchControlsVisibility();
}

ui.quickLocalButton?.addEventListener("click", () => activateMode("local"));
ui.quickBotButton?.addEventListener("click", () => activateMode("bot"));

ui.modeBackButton.addEventListener("click", () => {
  appState.mode = null;
  showScreen("mainMenu");
  updateTouchControlsVisibility([]);
});

ui.modeCards.forEach((card) => {
  card.addEventListener("click", () => {
    activateMode(card.dataset.mode);
  });
});

ui.difficultyCards.forEach((card) => {
  card.addEventListener("click", () => {
    appState.botDifficulty = card.dataset.difficulty;
    refreshModeScreen();
  });
});

ui.inputOptionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerKey = button.dataset.player === "1" ? "player1" : "player2";
    assignInputChoice(playerKey, button.dataset.input);
  });
});

ui.difficultyConfirmButton.addEventListener("click", confirmBotDifficultySelection);
ui.difficultyBackButton.addEventListener("click", () => {
  appState.mode = null;
  refreshModeScreen();
});
ui.continueToCharactersButton.addEventListener("click", continueFromSetup);

ui.characterBackButton.addEventListener("click", handleCharacterBack);
ui.confirmCharacterTopButton.addEventListener("click", confirmCharacterSelection);
ui.confirmCharacterButton.addEventListener("click", confirmCharacterSelection);
ui.resumeButton.addEventListener("click", resumeMatch);
ui.pauseMenuButton.addEventListener("click", resetToMenu);
ui.playAgainButton.addEventListener("click", () => {
  openCharacterSelection();
});
ui.backToMenuButton.addEventListener("click", resetToMenu);

renderCharacterCards();
renderLives(ui.p1Lives, GAME.stockLives);
renderLives(ui.p2Lives, GAME.stockLives);
updateCharacterDetail();
updateSelectionHeader();
refreshModeScreen();

let lastTimestamp = 0;
let accumulator = 0;

function appTick(timestamp) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }

  const dt = clamp((timestamp - lastTimestamp) / 1000, 0, 0.05);
  lastTimestamp = timestamp;
  accumulator += dt;

  inputManager.pollGamepads();
  refreshTouchControls();

  if (appState.screen === "modeScreen") {
    refreshModeScreen();
  }

  handleBattlePauseInput();
  refreshLiveBattleWarnings();

  while (accumulator >= GAME_LOOP.fixedStep) {
    if (appState.screen === "battleScreen" && game.active) {
      if (!game.pauseRequested && !game.matchOver) {
        game.update(GAME_LOOP.fixedStep);
      }
      inputManager.endFrame();
    } else {
      inputManager.endFrame();
    }
    accumulator -= GAME_LOOP.fixedStep;
  }

  if (appState.screen === "battleScreen" && game.active) {
    game.render();
  }

  requestAnimationFrame(appTick);
}

requestAnimationFrame(appTick);
