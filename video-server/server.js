// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

// Allow all cross-origin requests (for hotspot/local use)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));

// Create HTTP + WebSocket server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket.IO event handling
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // Join room
  socket.on("join-room", (roomId, userId) => {
    console.log(`📩 ${socket.id} joined room: ${roomId}`);
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);
  });

  // Offer (WebRTC)
  socket.on("offer", ({ offer, targetId }) => {
    console.log(`📤 Offer from ${socket.id} to ${targetId}`);
    socket.to(targetId).emit("offer", { offer, senderId: socket.id });
  });

  // Answer (WebRTC)
  socket.on("answer", ({ answer, targetId }) => {
    console.log(`📥 Answer from ${socket.id} to ${targetId}`);
    socket.to(targetId).emit("answer", { answer, senderId: socket.id });
  });

  // ICE Candidate
  socket.on("ice-candidate", ({ candidate, targetId }) => {
    console.log(`🧊 ICE candidate from ${socket.id} to ${targetId}`);
    socket.to(targetId).emit("ice-candidate", { candidate, senderId: socket.id });
  });

  // Transcription/translation messages
  socket.on("transcription-message", ({ transcript, translation, targetId }) => {
    console.log(`💬 Transcription from ${socket.id}`);
    socket.to(targetId).emit("transcription-message", { transcript, translation });
  });

  // Mic status
  socket.on("mic-status", ({ micOn, senderId, targetId }) => {
    console.log(`🎙️ Mic ${micOn ? "on" : "off"} from ${senderId}`);
    socket.broadcast.emit("mic-status", { micOn, senderId });
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    socket.broadcast.emit("user-disconnected", socket.id);
  });
});

// Server listen
const PORT = 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log("✅ Server is running and accessible on:");
  console.log(`   http://localhost:${PORT}  (this PC)`);
  console.log(`   http://192.168.137.1:${PORT}  (for hotspot clients)`);
});
