import { port } from "./config.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("new connection established");

  socket.on("join", (client) => {
    socket.name = client.name;
    socket.room = client.room;
    socket.join(client.room);
    console.log(`${socket.name} has joined ${socket.room}`);

    // Send a welcome message to the client
    socket.emit(
      "welcome",
      `Welcome ${socket.name}, currently there are ${getNumberOfUsersInRoom(socket.room)} client(s) in the ${socket.room} room`
    );

    // Send a message to the rest of the room
    socket.to(socket.room).emit("newclient", `${socket.name} has joined this room`);
  });
});

const getNumberOfUsersInRoom = (roomName) => io.sockets.adapter.rooms.get(roomName)?.size || 0;

// Handle 404 errors
app.use((req, res, next) => {
  const error = new Error("No such route found");
  error.status = 404;
  next(error);
});

// Error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

httpServer.listen(port, () => {
  console.log(`listening on port ${port}`);
});

