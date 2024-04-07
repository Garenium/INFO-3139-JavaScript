const users = [];

const handleJoin = async (socket, clientData) => {
  const room = clientData.roomName;
  const name = clientData.chatName;

  console.log("chatname: " + name);
  console.log("roomname: " + room);

  // check if name is already in use
  console.log(users);
  const isNameTaken = users.some((user) => user.name === name);
  console.log("DOES NAME EXIST IN ARRAY?: " + isNameTaken);

  if (isNameTaken) {
    // name has to be unique
    console.log(`NAME IS TAKEN: ${name}`);
    socket.emit("nameexists", `${name} is already taken.`);
  } else {
    // emit welcome message to the joining client
    // emit welcome message to the joining client
    console.log("NAME DOES NOT EXIST. ADDING NAME");
    socket.emit("welcome", { text: `Welcome ${name}.` });

    users.push({ socketId: socket.id, name: name, room: room });
    console.log("CURRENT ARRAY: " + users);

    await socket.join(room);

    // must emit this to all other clients except for the one who is joining
    await socket
      .to(room)
      .emit("someonejoined", { text: `${name} has joined the ${room} room.` });
  }
};

const handleDisconnect = async (socket) => {
  let disconnectedUser;

  users.forEach((user) => {
    if (socket.id === user.socketId) {
      disconnectedUser = user;
    }
  });

  console.log(disconnectedUser);

  if (disconnectedUser) {
    const userRoom = disconnectedUser.room;

    const index = users.findIndex(
      (user) => user.name === disconnectedUser.name
    );
    if (index !== -1) {
      users.splice(index, 1);
      console.log(
        `ENDING handleDiscconect(): ${disconnectedUser.name} HAS LEFT THE ROOM ${disconnectedUser.room}`
      );
      console.log("CURRENT ARRAY: " + users);
    }

    socket
      .to(userRoom)
      .emit("someoneleft", {
        text: `${disconnectedUser.name} has left the room ${disconnectedUser.room}.`,
      });
  } else {
    console.log(`disconnecting user failed`);
  }
};

export { handleJoin, handleDisconnect };
