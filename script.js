const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const screens = {
  mainMenu: document.getElementById("mainMenu"),
  modeScreen: document.getElementById("modeScreen"),
  characterScreen: document.getElementById("characterScreen"),
  battleScreen: document.getElementById("battleScreen"),
  endScreen: document.getElementById("endScreen"),
};

const ui = {
  startButton: document.getElementById("startButton"),
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

const INPUT_LABELS = {
  keyboard: "Tastatur",
  controller0: "PS5 Controller 1",
  controller1: "PS5 Controller 2",
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

const CONTROLLER_HELP_TEXT = "Linker Stick oder D-Pad links/rechts bewegen, X springen, Kreis normaler Angriff, Quadrat Spezial, Dreieck neue Faehigkeit, L1 blocken, Options pausieren";

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
];

const CHARACTER_MAP = Object.fromEntries(CHARACTER_DATA.map((character) => [character.id, character]));

const DEFAULT_ACTION = () => ({
  left: false,
  right: false,
  jumpPressed: false,
  block: false,
  attackPressed: false,
  specialPressed: false,
  abilityPressed: false,
  pausePressed: false,
});

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
  return INPUT_LABELS[choice] ?? "Unbekannt";
}

function getBotDifficultyConfig(key) {
  return BOT_DIFFICULTIES[key] ?? BOT_DIFFICULTIES.medium;
}

function getControllerSlotFromChoice(choice) {
  if (choice === "controller0") {
    return 0;
  }
  if (choice === "controller1") {
    return 1;
  }
  return null;
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

function getControllerControlText(botSlot = false) {
  if (botSlot) {
    return "Im Bot-Modus uebernimmt die KI den Slot. Lokal oder gegen einen Menschen gilt die PS5-Steuerung mit Stick, X, Kreis, Quadrat, Dreieck, L1 und Options.";
  }

  return CONTROLLER_HELP_TEXT + ".";
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
  }

  createGamepadSlot(slot) {
    return {
      slot,
      connected: false,
      id: "",
      axes: [0, 0],
      buttonsDown: Array(18).fill(false),
      buttonsPressed: Array(18).fill(false),
    };
  }

  onKeyDown(event) {
    if (this.preventedKeys.has(event.code)) {
      event.preventDefault();
    }

    if (!this.keyboardDown.has(event.code)) {
      this.keyboardPressed.add(event.code);
    }
    this.keyboardDown.add(event.code);
  }

  onKeyUp(event) {
    if (this.preventedKeys.has(event.code)) {
      event.preventDefault();
    }
    this.keyboardDown.delete(event.code);
  }

  pollGamepads() {
    const rawPads = navigator.getGamepads ? navigator.getGamepads() : [];
    this.connectedCount = 0;

    for (let slot = 0; slot < this.gamepads.length; slot += 1) {
      const state = this.gamepads[slot];
      const rawPad = rawPads[slot];
      const previousButtons = state.buttonsDown.slice();

      if (rawPad && rawPad.connected) {
        this.connectedCount += 1;
        state.connected = true;
        state.id = rawPad.id || `PS5 Controller ${slot + 1}`;
        state.axes = [rawPad.axes[0] ?? 0, rawPad.axes[1] ?? 0];
        state.buttonsPressed = Array(state.buttonsDown.length).fill(false);

        for (let index = 0; index < state.buttonsDown.length; index += 1) {
          const button = rawPad.buttons[index];
          const isDown = Boolean(button && (button.pressed || button.value > 0.5));
          state.buttonsDown[index] = isDown;
          state.buttonsPressed[index] = isDown && !previousButtons[index];
        }
      } else {
        state.connected = false;
        state.id = "";
        state.axes = [0, 0];
        state.buttonsDown = Array(state.buttonsDown.length).fill(false);
        state.buttonsPressed = Array(state.buttonsPressed.length).fill(false);
      }
    }
  }

  hasController(slot) {
    return Boolean(this.gamepads[slot] && this.gamepads[slot].connected);
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

    const axisX = Math.abs(pad.axes[0]) > 0.34 ? pad.axes[0] : 0;
    const leftPressed = axisX < -0.34 || pad.buttonsDown[14];
    const rightPressed = axisX > 0.34 || pad.buttonsDown[15];

    action.left = leftPressed;
    action.right = rightPressed;
    action.jumpPressed = pad.buttonsPressed[0];
    action.attackPressed = pad.buttonsPressed[1];
    action.specialPressed = pad.buttonsPressed[2];
    action.abilityPressed = pad.buttonsPressed[3];
    action.block = pad.buttonsDown[4];
    action.pausePressed = pad.buttonsPressed[9];
    return action;
  }

  getKeyboardAction(slot) {
    const mapping = slot === 2 ? KEYBOARD_LAYOUTS.player2 : KEYBOARD_LAYOUTS.player1;
    const action = DEFAULT_ACTION();
    action.left = this.isCodeDown(mapping.left);
    action.right = this.isCodeDown(mapping.right);
    action.jumpPressed = this.isCodePressed(mapping.jump);
    action.attackPressed = this.isCodePressed(mapping.attack);
    action.specialPressed = this.isCodePressed(mapping.special);
    action.abilityPressed = this.isAnyCodePressed(mapping.ability);
    action.block = this.isCodeDown(mapping.block);
    action.pausePressed = this.isAnyCodePressed(mapping.pause);
    return action;
  }

  getActionForChoice(choice, slot) {
    if (choice === "keyboard") {
      return this.getKeyboardAction(slot);
    }

    const controllerSlot = getControllerSlotFromChoice(choice);
    if (controllerSlot !== null) {
      return this.getGamepadAction(controllerSlot);
    }

    return DEFAULT_ACTION();
  }

  getPausePressedForBattle(players) {
    if (this.isCodePressed("Escape")) {
      return true;
    }

    return players.some((player) => {
      if (player.isBot) {
        return false;
      }
      return this.getActionForChoice(player.inputChoice, player.slot).pausePressed;
    });
  }

  endFrame() {
    this.keyboardPressed.clear();
    for (const pad of this.gamepads) {
      pad.buttonsPressed.fill(false);
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
  }

  spawn(x, y, facing) {
    this.resetStockState();
    this.x = x;
    this.y = y;
    this.facing = facing;
  }

  getMoveSpeed() {
    if (this.character.id === "tank" && this.unstoppableTimer > 0) {
      return this.stats.moveSpeed * 0.78;
    }
    return this.stats.moveSpeed;
  }

  getAirSpeed() {
    if (this.character.id === "tank" && this.unstoppableTimer > 0) {
      return this.stats.airSpeed * 0.8;
    }
    return this.stats.airSpeed;
  }

  getOutgoingKnockbackMultiplier() {
    if (this.character.id === "boxer" && this.rageTimer > 0) {
      return 1.34;
    }
    return 1;
  }

  getOutgoingDamageMultiplier() {
    if (this.character.id === "boxer" && this.rageTimer > 0) {
      return 1.15;
    }
    return 1;
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
    this.effectTimer = Math.max(0, this.effectTimer - dt);

    const canControl = game.controlsEnabled && this.lockTimer <= 0 && this.hitTimer <= 0;
    const moveInput = canControl ? ((actionInput.left ? -1 : 0) + (actionInput.right ? 1 : 0)) : 0;
    this.blocking = Boolean(canControl && actionInput.block && this.onGround && this.shieldTimer <= 0);

    if (moveInput !== 0 && !this.blocking) {
      this.facing = moveInput;
      const targetVelocity = moveInput * (this.onGround ? this.getMoveSpeed() : this.getAirSpeed());
      const acceleration = this.onGround ? this.stats.acceleration : this.stats.airAcceleration;
      this.vx = approach(this.vx, targetVelocity, acceleration * dt);
    } else {
      const drag = this.onGround ? this.stats.friction : this.stats.airDrag;
      this.vx = approach(this.vx, 0, drag * dt);
    }

    if (canControl && actionInput.jumpPressed) {
      this.tryJump(game);
    }

    if (canControl && actionInput.attackPressed) {
      this.performNormalAttack(game);
    }

    if (canControl && actionInput.specialPressed) {
      this.performSpecialAttack(game);
    }

    if (canControl && actionInput.abilityPressed) {
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

    this.vy += GAME.gravity * dt;

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
      default:
        break;
    }
  }

  applyHit(source, game) {
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
    const alpha = this.invulnerableTimer > 0 ? 0.82 + Math.sin(elapsed * 0.03) * 0.14 : 1;
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

    context.strokeStyle = bodyColor;
    context.lineWidth = this.character.id === "tank" ? 7 : 6;
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
    this.spawnPlayers();
    this.updateHud(true);
    this.setCountdownLabel("3");
    showScreen("battleScreen");
    hidePauseOverlay();
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
  }

  spawnPlayers() {
    const y = this.platform.y - 26;
    this.players[0].spawn(this.platform.x + this.platform.width * 0.28, y, 1);
    this.players[1].spawn(this.platform.x + this.platform.width * 0.72, y, -1);
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
    } else if (distance < profile.rangedDistance && bot.character.id === "magier" && chance(profile.rangedAttackChance)) {
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
      const action = {
        left: memory.move < 0,
        right: memory.move > 0,
        jumpPressed: memory.jumpQueued,
        block: memory.block,
        attackPressed: memory.attackQueued,
        specialPressed: memory.specialQueued,
        abilityPressed: memory.abilityQueued,
        pausePressed: false,
      };

      memory.jumpQueued = false;
      memory.attackQueued = false;
      memory.specialQueued = false;
      memory.abilityQueued = false;
      return action;
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
  } else {
    moveElement.textContent = `${inputLabel}: Stick oder D-Pad bewegen | X springen | L1 blocken`;
    attackElement.textContent = `Kreis ${player.character.normalAttackName} | Quadrat ${player.character.specialName}`;
    abilityElement.textContent = `Dreieck ${player.character.abilityName} | Options Pause`;
  }
}

function getHumanDetailKeyboardText(slot) {
  if (slot === 1) {
    return "A/D bewegen, W springen, S blocken, F normaler Angriff, G Spezialangriff, H neue Faehigkeit.";
  }
  return "Pfeile links/rechts bewegen, Pfeil hoch springen, Pfeil runter blocken, K normaler Angriff, L Spezialangriff, M oder Oe neue Faehigkeit.";
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
  ui.detailKeyboardControls.textContent = isBotSlot
    ? getKeyboardControlTextForSlot(2, true)
    : getHumanDetailKeyboardText(appState.selectingSlot);
  ui.detailControllerControls.textContent = isBotSlot
    ? getControllerControlText(true)
    : getControllerControlText(false);
  ui.detailPros.textContent = character.pros;
  ui.detailCons.textContent = character.cons;

  ui.detailStats.innerHTML = "";
  for (const stat of character.statsText) {
    const chip = document.createElement("span");
    chip.className = "stat-chip";
    chip.textContent = stat;
    ui.detailStats.appendChild(chip);
  }

  [...ui.characterGrid.children].forEach((card) => {
    card.classList.toggle("selected", card.dataset.characterId === character.id);
  });
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
    if (p1.startsWith("controller") && p1 === p2) {
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
        message: `${INPUT_LABELS[choice]} ist aktuell nicht verbunden. Bitte PS5-Controller verbinden und eine Taste druecken.`,
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
  title.textContent = state.connected ? "Verbunden" : "Nicht verbunden";
  copy.textContent = state.connected
    ? (state.id.length > 62 ? `${state.id.slice(0, 62)}...` : state.id)
    : "Kein Gamepad erkannt.";
  const label = cardElement.querySelector(".controller-slot-label");
  label.textContent = `Controller ${slot + 1}`;
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
  ui.controllerWarningText.hidden = inputManager.connectedCount > 0;

  if (appState.mode === "bot") {
    ui.setupSubtitle.textContent = `Lege nur fuer Spieler 1 fest, ob du mit Tastatur, PS5 Controller 1 oder PS5 Controller 2 spielst. Slot 2 wird von der Bot-KI auf ${getBotDifficultyConfig(appState.botDifficulty).label} uebernommen.`;
    ui.player2AssignmentLabel.textContent = "Spieler 2";
    ui.player2AssignmentTitle.textContent = "Bot-KI";
    ui.player2AssignmentCopy.textContent = `Der Bot uebernimmt Slot 2 automatisch. Schwierigkeit: ${getBotDifficultyConfig(appState.botDifficulty).label}.`;
  } else {
    ui.setupSubtitle.textContent = "Waehle fuer beide Spieler ein eigenes Input-Profil. Tastatur und Controller koennen gemischt werden.";
    ui.player2AssignmentLabel.textContent = "Spieler 2";
    ui.player2AssignmentTitle.textContent = "Input-Profil";
    ui.player2AssignmentCopy.textContent = "Waehle ein separates Profil. Derselbe Controller kann nicht beiden Spielern gleichzeitig zugewiesen werden.";
  }

  ui.player2AssignmentCard.hidden = appState.mode === "bot";
  ui.player2InputOptions.hidden = appState.mode === "bot";
  ui.player2AssignmentCard.parentElement.classList.toggle("single-player", appState.mode === "bot");

  ui.inputOptionButtons.forEach((button) => {
    const playerKey = button.dataset.player === "1" ? "player1" : "player2";
    const selected = appState.inputSelections[playerKey] === button.dataset.input;
    const controllerSlot = getControllerSlotFromChoice(button.dataset.input);
    const unavailable = controllerSlot !== null && !inputManager.hasController(controllerSlot);
    button.classList.toggle("selected", selected);
    button.classList.toggle("unavailable", unavailable);
  });

  const validation = validateSetup();
  ui.setupErrorText.hidden = validation.ok || !appState.mode;
  ui.setupErrorText.textContent = validation.message;
  ui.continueToCharactersButton.disabled = !validation.ok;
}

function openCharacterSelection() {
  appState.selectingSlot = 1;
  appState.selections.player1 = null;
  appState.selections.player2 = null;
  appState.selectedCharacterId = appState.lastSelections.player1 || CHARACTER_DATA[0].id;
  updateSelectionHeader();
  updateCharacterDetail();
  showScreen("characterScreen");
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
      `${missing.join(" und ")} fehlt gerade. Bitte PS5-Controller verbinden und eine Taste druecken.`,
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
      `${missing.join(" und ")} wurde getrennt. Bitte PS5-Controller verbinden und eine Taste druecken.`,
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
}

ui.startButton.addEventListener("click", () => {
  game.sound.unlock();
  appState.mode = null;
  showScreen("modeScreen");
  refreshModeScreen();
});

ui.modeBackButton.addEventListener("click", () => {
  appState.mode = null;
  showScreen("mainMenu");
});

ui.modeCards.forEach((card) => {
  card.addEventListener("click", () => {
    appState.mode = card.dataset.mode;
    if (appState.mode === "local") {
      appState.inputSelections.player1 = appState.inputSelections.player1 || "keyboard";
      appState.inputSelections.player2 = appState.inputSelections.player2 || "keyboard";
    }
    refreshModeScreen();
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

function appTick(timestamp) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }

  const dt = clamp((timestamp - lastTimestamp) / 1000, 0, 0.033);
  lastTimestamp = timestamp;

  inputManager.pollGamepads();

  if (appState.screen === "modeScreen") {
    refreshModeScreen();
  }

  handleBattlePauseInput();
  refreshLiveBattleWarnings();

  if (appState.screen === "battleScreen" && game.active) {
    if (!game.pauseRequested && !game.matchOver) {
      game.update(dt);
    }
    game.render();
  }

  inputManager.endFrame();
  requestAnimationFrame(appTick);
}

requestAnimationFrame(appTick);
