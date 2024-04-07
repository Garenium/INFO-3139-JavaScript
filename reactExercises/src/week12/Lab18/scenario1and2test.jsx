import React, { useState, useEffect, useRef, useReducer } from "react";
import { ThemeProvider } from "@mui/material/styles";
import io from "socket.io-client";
import { TextField, Button, Container, Typography } from "@mui/material";
import theme from "./theme.js";
import Bar from "./Bar.jsx";

const Scenario1And2Test = () => {
  const initialState = {
    chatName: "",
    roomName: "",
    socket: {},
    messages: [],
    showjoinfields: true,
    status: "",
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return; // React 18 Strictmode runs useEffects twice in development`
    serverConnect();
    effectRan.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const serverConnect = () => {
    const socket = io.connect("localhost:5000", {
      forceNew: true,
      transports: ["websocket"],
      autoConnect: true,
      reconnection: false,
      connect_timeout: 5000,
      timeout: 5000,
    });

    socket.on("nameexists", onExists);
    socket.on("welcome", addMessageToList);
    socket.on("someonejoined", addMessageToList);
    socket.on("someoneleft", addMessageToList); // Registering event handler for 'someoneleft'
    // socket.on("someoneleft", () => {
    //     console.log("I'M INSIDE 'ON SOMEONELEFT'")
    //  handleDisconnect(); // Call handleDisconnect and pass the socket object
    // });


    setState({ socket: socket });
  };

  const addMessageToList = (msg) => {
    let messages = state.messages;
    messages.push(msg);
    setState({
      messages: messages,
      showjoinfields: false,
    });
  };

  const onExists = (msg) => {
    setState({ status: msg });
  };

  const onNameChange = (e) => {
    setState({ chatName: e.target.value, status: "" });
  };

  const onRoomChange = (e) => {
    setState({ roomName: e.target.value, status: "" });
  };

  const handleJoin = () => {
    state.socket.emit("join", {
      chatName: state.chatName,
      roomName: state.roomName,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Bar />
      {state.showjoinfields ? (
        <Container maxWidth="xs" sx={{ marginTop: "64px" }}>
          <TextField
            onChange={onNameChange}
            placeholder="Enter unique name"
            autoFocus={true}
            required
            value={state.chatName}
            error={state.status !== ""}
            fullWidth
            margin="normal"
            helperText={state.status}
          />
          <TextField
            onChange={onRoomChange}
            placeholder="Enter a room"
            autoFocus={true}
            required
            value={state.roomName}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleJoin()}
            disabled={state.chatName === "" || state.roomName === ""}
            fullWidth
            sx={{ marginTop: "16px" }}
          >
            Join
          </Button>
        </Container>
      ) : null}
      {!state.showjoinfields ? (
        <Container maxWidth="xs" sx={{ marginTop: "80px" }}>
          <h3 style={{ textAlign: "center" }}>
            Lab 18 - Scenarios 1 and 2 Test
          </h3>
          {state.messages.map((message, index) => (
            <Typography style={{ marginLeft: "5vw" }} key={index}>
              {message.text}
            </Typography>
          ))}
        </Container>
      ) : null}
    </ThemeProvider>
  );
};

export default Scenario1And2Test;
