import { port } from "./config.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import * as socketHandlers from "./socketHandlers.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("new connection established");

  //Scenario 1 - client connects to the server
  socket.on("join", (clientData) => {
    socketHandlers.handleJoin(socket, clientData);
  });

  // scenario 2 - client disconnects from server
  socket.on("disconnect", () => {
    socketHandlers.handleDisconnect(socket);
  });

  //scenario 3 - client sends notification that user started typing
  socket.on("typing", (clientData) => {
    socketHandlers.handleTyping(socket, clientData);
  });

  // scenario 4 - client sends message to room including self
  socket.on("message", (clientData) => {
    socketHandlers.handleMessage(io, socket, clientData);
  });
});

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
