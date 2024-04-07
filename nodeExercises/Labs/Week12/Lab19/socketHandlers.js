import matColours from "./matdes100colours.json" assert { type: "json" };
const users = [];

const handleJoin = async (socket, clientData) => {
  const room = clientData.roomName;
  const name = clientData.chatName;

  // console.log("chatname: " + name);
  // console.log("roomname: " + room);

  // check if name is already in use
  console.log(users);
  const isNameTaken = users.some((user) => user.name === name);
  // console.log("DOES NAME EXIST IN ARRAY?: " + isNameTaken);

  if (isNameTaken) {
    // name has to be unique
    // console.log(`NAME IS TAKEN: ${name}`);
    socket.emit("nameexists", `${name} is already taken.`);
  } else {
    // emit welcome message to the joining client
    // console.log("NAME DOES NOT EXIST. ADDING NAME");

    let coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
    let color = matColours.colours[coloridx];
    console.log(`COLOUR: ${color}`);
    socket.emit("welcome", { text: `Admin - Welcome ${name}.`, color: color });

    users.push({ socketId: socket.id, name: name, room: room });
    console.log("CURRENT ARRAY: " + users);

    await socket.join(room);

    // must emit this to all other clients except for the one who is joining
    await socket
      .to(room)
      .emit("someonejoined", {
        text: `Admin - ${name} has joined the ${room} room.`,
        color: color,
      });
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
      // console.log("CURRENT ARRAY: " + users);
    }

    let coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
    let color = matColours.colours[coloridx];
    console.log(`COLOUR: ${color}`);

    socket.to(userRoom).emit("someoneleft", {
      text: `Admin - ${disconnectedUser.name} has left the room ${disconnectedUser.room}.`,
      color: color,
    });
  } else {
    console.log(`disconnecting user failed`);
  }
};

const handleTyping = (socket, clientData) => {
  console.log("IN handleTyping()");
  //Set the name
  const name = clientData.from;
  console.log(`NAME: ${name}`);

  //Set the room by finding the user's (argument) room.
  const index = users.findIndex((user) => user.name === name);
  const room = users[index].room;
  console.log(`ROOM: ${room}`);

  socket
    .to(room)
    .emit("someoneistyping", { text: `User ${name} is typing...` });
};

const handleMessage = (io, socket, clientData) => {
  console.log("IN handleMessage():");
  //Set the name
  const name = clientData.from;
  console.log(`NAME: ${name}`);

  //Set the room
  const index = users.findIndex((user) => user.name === name);
  const room = users[index].room;
  console.log(`ROOM: ${room}`);

  //Set the message
  const msg = clientData.text;
  console.log(`MESSAGE: ${msg}`);

  //set colour
  let coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
  let color = matColours.colours[coloridx];
  console.log(`COLOUR: ${color}`);

  // send to everyone in the same room including sender
  io.in(room).emit("newmessage", { text: msg, color: color });
};

export { handleJoin, handleDisconnect, handleTyping, handleMessage };
