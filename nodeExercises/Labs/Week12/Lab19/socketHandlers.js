import matColours from "./matdes100colours.json" assert { type: "json" };
const users = [];
import adminColor from "./app.js";
import moment from "moment";

const handleJoin = async (socket, clientData) => {
  const room = clientData.roomName;
  const name = clientData.chatName;

  const isNameTaken = users.some((user) => user.name === name);

  if (isNameTaken) {
    await socket.emit("nameexists", `${name} is already taken.`);
  } else {
    //Set the color for the user
    let coloridx = Math.floor(Math.random() * matColours.colours.length);
    let color = matColours.colours[coloridx];

    users.push({ socketId: socket.id, name: name, room: room, color: color });

    await socket.emit("welcome", {
      text: ` Welcome ${name}.`,
      authortime: `Admin Says @${moment().format("h:mm:ss a")}`,
      color: adminColor,
    });

    await socket.join(room);

    await socket.to(room).emit("someonejoined", {
      text: `${name} has joined the \"${room}\" room.`,
      authortime: `Admin Says @${moment().format("h:mm:ss a")}`,
      color: adminColor,
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
        `ENDING handleDisconnect(): ${disconnectedUser.name} HAS LEFT THE ROOM ${disconnectedUser.room}`
      );
    }

    await socket.to(userRoom).emit("someoneleft", {
      text: `${disconnectedUser.name} has left the room ${disconnectedUser.room}.`,
      authortime: `Admin Says @${moment().format("h:mm:ss a")}`,
      color: adminColor,
    });
  } else {
    console.log(`disconnecting user failed`);
  }
};

const handleTyping = async (socket, clientData) => {
  console.log("IN handleTyping()");
  const name = clientData.from;
  const index = users.findIndex((user) => user.name === name);
  const room = users[index].room;

  await socket.to(room).emit("someoneistyping", { text: `${name} is typing...` });
};

const handleMessage = async (io, socket, clientData) => {
  console.log("IN handleMessage():");
  const name = clientData.from;
  const index = users.findIndex((user) => user.name === name);
  const room = users[index].room;

  const msg = clientData.text;
  const authortime = `${name} Says @${moment().format("h:mm:ss a")}`;
  console.log(`MESSAGE: ${msg}`);

  //set color
  let color = users.find((user) => user.name === name).color;
  // console.log(`COLOUR: ${color}`);

  // let coloridx = Math.floor(Math.random() * matColours.colours.length);
  // let color = matColours.colours[coloridx];

  await io.in(room).emit("newmessage", {
    text: msg,
    authortime: authortime,
    color: color,
  });
};

const handleGetRoomsAndUsers = async (io) => {
  console.log("GETTING DATA");

  let returnUsersData = [];

  for (const user of users) {
    returnUsersData.push({ user: user.name, room: user.room, color: user.color });
  }

  await io.emit("updateuserlist", {users: returnUsersData});
}
export { handleJoin, handleDisconnect, handleTyping, handleMessage, handleGetRoomsAndUsers };
