const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");
const http = require("http");
const api = require("./api");
const multer = require("multer");
const upload = multer();
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: "*",
});

app.use(helmet());
app.use(upload.array());
app.use(cors({
  origin:"*"
}));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);

app.use(errorHandler.notFound);
app.use(errorHandler.errorHandler);

global.onlineUsers = new Map();

io.on("connection", async (socket) => {
  socket.on("join-room", (data) => {
    data.map((room) => socket.join(room._id));
  });

  socket.on("self-room", (data) => {
    socket.join(data.room);
  });

  socket.on("send-message", (data) => {
    socket.broadcast.to(data.room).emit("receive-message", data);
  });

  socket.on("notifications", (data) => {
    socket.broadcast.to(data.room).emit("receive-notify", {
      id: new mongoose.Types.ObjectId(),
      user: data.user,
      readStatus: false,
      content: data.content,
      type: data.type,
      timeStamp: Date.now,
    });
  });
});

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);

  process.exit();
});

module.exports = { app };
