import React, { useState, useEffect, useRef, useReducer } from "react";
import io from "socket.io-client";
import { TextField } from "@mui/material";

const App = () => {
  const initialState = {
    name: "",
    room: "",
    nameError: "",
    socket: {},
  };
  const reducer = (state, newState) => ({...state, ...newState});
  const [state, setState] = useReducer(reducer, initialState);

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return; // React 18 Strictmode runs useEffects twice in development`
    serverConnect();
    effectRan.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const serverConnect = () => {
    setState({
        socket: io.connect("localhost:5000", {
          forceNew: true,
          transports: ["websocket"],
          autoConnect: true,
          reconnection: false,
          timeout: 5000,
        }),
      });
  };

  const onExists = (msg) => {
    setState({nameError: msg});
  };

  const handleNameChange = (e) => {
    setState({ name: e.target.value, status: "" });
  };

  const handleRoomChange = (e) => {
   setState({ room: e.target.value, status: "" });
  };

  const handleJoin = () => {
    state.socket.emit("join", { chatName: state.name, roomName: state.room });
    console.log("STATUS BEFORE: "+state.nameError);
    state.socket.on("nameexists", onExists);
    console.log("STATUS AFTER: "+state.nameError);
  }

  return (
    <div>
      <TextField
        label="Name"
        value={state.name}
        onChange={handleNameChange}
        error={state.nameError !== ""}
        helperText={state.nameError}
      />
      <TextField label="Room" value={state.room} onChange={handleRoomChange} />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
};

export default App;
