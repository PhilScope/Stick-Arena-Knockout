const path = require("path");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const PORT = Number(process.env.PORT || 3000);
const ROOM_CODE_LENGTH = 6;
const MAX_CHAT_MESSAGES = 40;
const MAX_CHAT_LENGTH = 160;
const CHARACTER_IDS = new Set([
  "ninja",
  "tank",
  "magier",
  "boxer",
  "springer",
  "samurai",
  "assassine",
  "blitzkaempfer",
  "eiswaechter",
  "feuerlord",
  "schattenkrieger",
  "cyborg",
  "berserker",
  "windlaeufer",
  "titan",
]);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.static(__dirname));
app.get("/", (_request, response) => {
  response.sendFile(path.join(__dirname, "index.html"));
});

const rooms = new Map();

function createSystemMessage(text) {
  return {
    author: "System",
    text,
    type: "system",
    timestamp: Date.now(),
  };
}

function createPlayerMessage(author, text) {
  return {
    author,
    text,
    type: "player",
    timestamp: Date.now(),
  };
}

function trimChat(room) {
  if (room.chat.length > MAX_CHAT_MESSAGES) {
    room.chat = room.chat.slice(-MAX_CHAT_MESSAGES);
  }
}

function normalizeRoomCode(value = "") {
  return String(value).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, ROOM_CODE_LENGTH);
}

function generateRoomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";

  do {
    code = "";
    for (let index = 0; index < ROOM_CODE_LENGTH; index += 1) {
      code += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  } while (rooms.has(code));

  return code;
}

function getRoomForSocket(socket) {
  const roomCode = socket.data.roomCode;
  return roomCode ? rooms.get(roomCode) ?? null : null;
}

function getRoomPlayer(room, socketId) {
  return room.players.get(socketId) ?? null;
}

function getPlayerBySlot(room, slot) {
  for (const player of room.players.values()) {
    if (player.slot === slot) {
      return player;
    }
  }
  return null;
}

function serializeRoomState(room, extraMessage = "") {
  return {
    roomCode: room.code,
    phase: room.phase,
    roomReady: room.players.size === 2,
    hostSocketId: room.hostSocketId,
    players: [1, 2].map((slot) => {
      const player = getPlayerBySlot(room, slot);
      return {
        slot,
        connected: Boolean(player),
        characterId: player?.characterId ?? null,
        locked: Boolean(player?.locked),
      };
    }),
    chatMessages: room.chat,
    message: extraMessage,
  };
}

function broadcastRoomState(room, extraMessage = "") {
  io.to(room.code).emit("room-state", serializeRoomState(room, extraMessage));
}

function sanitizeActionPayload(action) {
  const source = action && typeof action === "object" ? action : {};
  return {
    left: Boolean(source.left),
    right: Boolean(source.right),
    jumpPressed: Boolean(source.jumpPressed),
    block: Boolean(source.block),
    attackPressed: Boolean(source.attackPressed),
    specialPressed: Boolean(source.specialPressed),
    abilityPressed: Boolean(source.abilityPressed),
    pausePressed: Boolean(source.pausePressed),
  };
}

function leaveCurrentRoom(socket, reason = "left") {
  const room = getRoomForSocket(socket);
  if (!room) {
    socket.data.roomCode = null;
    socket.data.slot = null;
    return;
  }

  const player = getRoomPlayer(room, socket.id);
  const wasBattle = room.phase === "battle";

  room.players.delete(socket.id);
  socket.leave(room.code);
  socket.data.roomCode = null;
  socket.data.slot = null;

  if (room.players.size === 0) {
    rooms.delete(room.code);
    return;
  }

  if (room.hostSocketId === socket.id) {
    room.hostSocketId = room.players.keys().next().value;
  }

  if (wasBattle) {
    const remainingPlayer = [...room.players.values()][0];
    room.phase = "lobby";
    for (const entry of room.players.values()) {
      entry.characterId = null;
      entry.locked = false;
    }
    room.chat.push(createSystemMessage(`Spieler ${player?.slot ?? "?"} hat die Verbindung verloren.`));
    trimChat(room);
    io.to(room.code).emit("opponent-disconnected", {
      winnerSlot: remainingPlayer.slot,
    });
    broadcastRoomState(room);
    return;
  }

  if (reason === "disconnect") {
    room.chat.push(createSystemMessage(`Spieler ${player?.slot ?? "?"} wurde getrennt.`));
  } else {
    room.chat.push(createSystemMessage(`Spieler ${player?.slot ?? "?"} hat den Raum verlassen.`));
  }
  trimChat(room);
  broadcastRoomState(room);
}

function joinRoom(socket, room, slot) {
  room.players.set(socket.id, {
    socketId: socket.id,
    slot,
    characterId: null,
    locked: false,
  });
  socket.join(room.code);
  socket.data.roomCode = room.code;
  socket.data.slot = slot;
}

io.on("connection", (socket) => {
  socket.data.roomCode = null;
  socket.data.slot = null;

  socket.on("create-room", () => {
    leaveCurrentRoom(socket);

    const roomCode = generateRoomCode();
    const room = {
      code: roomCode,
      hostSocketId: socket.id,
      phase: "lobby",
      players: new Map(),
      chat: [createSystemMessage(`Raum ${roomCode} wurde erstellt.`)],
    };
    rooms.set(roomCode, room);
    joinRoom(socket, room, 1);
    socket.emit("room-joined", {
      roomCode,
      localSlot: 1,
      isHost: true,
      phase: room.phase,
    });
    broadcastRoomState(room);
  });

  socket.on("join-room", (payload) => {
    leaveCurrentRoom(socket);

    const roomCode = normalizeRoomCode(payload?.roomCode);
    const room = rooms.get(roomCode);
    if (!room) {
      socket.emit("room-error", { message: "Der Raumcode wurde nicht gefunden." });
      return;
    }

    if (room.players.size >= 2) {
      socket.emit("room-error", { message: "Dieser Raum ist bereits voll." });
      return;
    }

    if (room.phase === "battle") {
      socket.emit("room-error", { message: "Dieser Raum befindet sich bereits im Kampf." });
      return;
    }

    joinRoom(socket, room, 2);
    room.chat.push(createSystemMessage("Spieler 2 ist dem Raum beigetreten."));
    trimChat(room);
    socket.emit("room-joined", {
      roomCode,
      localSlot: 2,
      isHost: false,
      phase: room.phase,
    });
    broadcastRoomState(room);
  });

  socket.on("leave-room", () => {
    leaveCurrentRoom(socket);
  });

  socket.on("chat-message", (payload) => {
    const room = getRoomForSocket(socket);
    if (!room || room.phase === "battle") {
      return;
    }

    const player = getRoomPlayer(room, socket.id);
    const text = String(payload?.text ?? "").replace(/\s+/g, " ").trim().slice(0, MAX_CHAT_LENGTH);
    if (!player || !text) {
      return;
    }

    const message = createPlayerMessage(`Spieler ${player.slot}`, text);
    room.chat.push(message);
    trimChat(room);
    io.to(room.code).emit("chat-message", message);
  });

  socket.on("select-character", (payload) => {
    const room = getRoomForSocket(socket);
    const player = room ? getRoomPlayer(room, socket.id) : null;
    const characterId = String(payload?.characterId ?? "");

    if (!room || !player || room.phase === "battle" || !CHARACTER_IDS.has(characterId)) {
      return;
    }

    player.characterId = characterId;
    player.locked = true;
    broadcastRoomState(room);
  });

  socket.on("start-match", () => {
    const room = getRoomForSocket(socket);
    if (!room || room.hostSocketId !== socket.id) {
      return;
    }

    const player1 = getPlayerBySlot(room, 1);
    const player2 = getPlayerBySlot(room, 2);
    if (!player1 || !player2 || !player1.locked || !player2.locked || !player1.characterId || !player2.characterId) {
      socket.emit("room-error", { message: "Beide Spieler muessen erst Charaktere bestaetigen." });
      return;
    }

    room.phase = "battle";
    io.to(room.code).emit("match-start", {
      roomCode: room.code,
      selections: {
        player1: player1.characterId,
        player2: player2.characterId,
      },
    });
  });

  socket.on("input-update", (payload) => {
    const room = getRoomForSocket(socket);
    const player = room ? getRoomPlayer(room, socket.id) : null;
    if (!room || !player || room.phase !== "battle") {
      return;
    }

    socket.to(room.code).emit("remote-input", {
      slot: player.slot,
      action: sanitizeActionPayload(payload?.action),
    });
  });

  socket.on("ping-check", (payload) => {
    const sentAt = Number(payload?.sentAt);
    socket.emit("pong-check", {
      sentAt: Number.isFinite(sentAt) ? sentAt : Date.now(),
    });
  });

  socket.on("disconnect", () => {
    leaveCurrentRoom(socket, "disconnect");
  });
});

server.listen(PORT, () => {
  console.log(`Stick Arena Knockout Server laeuft auf http://localhost:${PORT}`);
});
