import { port } from "./config.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const streetLights = [
  { streetName: "Garen", green: 12, red: 7.5, yellow: 3 },
  { streetName: "Ikezian", green: 15, red: 10, yellow: 5 },
  { streetName: "info3139", green: 10, red: 5, yellow: 3 },
];

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("new connection established");

  socket.on("join", (client) => {
    socket.streetName = client.streetName;
    socket.join(client.streetName); // Using streetName as room to join
    console.log(`${socket.streetName} is passed to the socket`);

    // Send a welcome message to the client with the street data
    const streetData = turnLampOn(socket.streetName);
    socket.emit("welcome", `Status: ${streetData}`);

    // Send a message to the rest of the room
    // socket.to(socket.streetName).emit("newclient", `${socket.streetName} has joined this room`);
  });
});

const turnLampOn = (streetNameP) => {
  const streetData = streetLights.find(({ streetName }) => streetNameP === streetName);
  console.log("I'M IN turnLampOn() FROM THE SERVER!");
  console.log(`Green: ${streetData.green}s, Red: ${streetData.red}s, Yellow: ${streetData.yellow}s`);
  if (streetData) {
    const lampData = {
      green: streetData.green,
      red: streetData.red,
      yellow: streetData.yellow,
    };
    return lampData;
  } else {
    return null;
  }
};

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

