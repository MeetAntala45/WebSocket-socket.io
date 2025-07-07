const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(9000, () => console.log(`Server Started at PORT:9000`));




// ✅ io.on("connection", (socket) => { ... });

// Purpose: Listen for a new client connection.
// io is the global server-side Socket.IO instance.
// "connection" is a built-in event that is emitted when a client connects.
// The callback gets a socket object, which represents that specific client.
// ⚠️ Every connected client has its own socket instance.
// 🧠 Think of this as:
// "Hey, whenever a user connects to my server, I want to run this function for that user."



// ✅ socket.on("user-message", (message) => { ... });

// This listens for a custom event called "user-message" from that client.
// When the client sends a message like this:
// socket.emit("user-message", "Hello from client");
// It will trigger the server-side listener.
// The message parameter is the data sent by the client.
// 🧠 Think of this as:
// "When this particular client sends a user-message, I want to receive and handle it."



// ✅ io.emit("message", message);

// This broadcasts the received message to all connected clients, including the one that sent it.
// io.emit means broadcast to everyone — all sockets.
// ✅ If there are 100 clients connected, all 100 will receive the message.
// 🧠 Think of this as:
// "Now that I got a message from one client, I want to send it to everyone connected."
