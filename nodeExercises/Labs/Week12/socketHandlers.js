const users = [];

const handleJoin = async (socket, clientData) => {
    const room = clientData.roomName;
    const name = clientData.chatName;
    
    console.log("chatname: " + room);
    console.log("roomname: " + name);
    // check if name is already in use

    const isNameTaken = await users.find((user) => user.name === clientData.chatName);
    console.log(users);
    console.log("IS NAME TAKEN: " + isNameTaken);

    if (isNameTaken) {
        // name has to be unique 
        socket.emit('nameexists', {message: 'Name is already taken.'});
    } else {
        // emit welcome message to the joining client
        socket.emit('welcome', { message: `Welcome ${name}.` });

        users.push({ name });

        await socket.join(room);

        // must emit this to all other clients except for the one who is joining
        await socket.to(room).emit('someonejoined', { message: `${name} joined the room.` });
    }
}

function handleDisconnect(socket){
    const {chatname, roomname} = clientdata;
    console.log("handledisconnect: not implemented yet")
    return;
}



export { handleJoin, handleDisconnect };