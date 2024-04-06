const handleJoin = async (io, socket, clientData) => {
  socket.name = clientData.chatName;
  socket.room = clientData.roomName;

  console.log("chatName: " + socket.name);
  console.log("roomName: " + socket.room);
//   console.log(io);

  // Fetch sockets in the specified room
  const sockets = await io.in(clientData.roomName).fetchSockets();
  console.log("SOCKETS: ", sockets);
  console.log("Number of sockets in room:", sockets.length);

  const isNameTaken = nameExists(clientData.name, sockets);

  if (isNameTaken) {
    // Name is already taken
    console.log("NAME IS TAKEN");
    socket.emit("nameexists", "Name is already taken.");
  } else {
    console.log("NAME IS NOT TAKEN");
    // Emit welcome message to the joining client
    socket.join(clientData.chatname);
    socket.name = clientData.chatName;

      const sockets = await io.in(clientData.roomName).fetchSockets();
      console.log("AFTER SOCKETS: "+sockets);
      console.log("AFTER Number of sockets in room:", sockets.length);
    
//   console.log("SOCKETS: ", sockets);
//   console.log("Number of sockets in room:", sockets.length);

    socket.emit("welcome", { message: `Welcome ${socket.name}` });


    // Emit a message to all other clients in the room
    socket.to(socket.room).emit("someonejoined", { message: `${socket.name} joined the room.` });
  }
};

function handleDisconnect(socket) {
  console.log("handleDisconnect: Not implemented yet");
  // handle disconnect logic here
}

const nameExists = (name, sockets) => {
  // Check if the name already exists in any of the sockets
  for (const currentSocket of sockets) {
    if (currentSocket.name === name) {
      return true; // Name exists
    }
  }
  return false; // Name doesn't exist
};

export { handleJoin, handleDisconnect };

