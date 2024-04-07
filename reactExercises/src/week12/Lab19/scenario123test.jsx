import React, { useState, useEffect, useRef, useReducer } from "react";
import { ThemeProvider } from "@mui/material/styles";
import io from "socket.io-client";
import { TextField, Button, Container, Typography } from "@mui/material";
import theme from "./theme.js";
import Bar from "./Bar.jsx";

const Scenario123Test = () => {
  const initialState = {
    chatName: "",
    roomName: "",
    socket: {},
    messages: [],
    showjoinfields: true,
    status: "",
    isTyping: false,
    typingMsg: "",
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
    socket.on("someoneistyping", onTyping);

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

  const onTyping = (msg) => {
    if (msg.from !== state.chatName) {
      setState({
        typingMsg: msg.text,
      });
    }
  };

  // keypress handler for message TextField
  const onMessageChange = (e) => {
    setState({ message: e.target.value });
    if (state.isTyping === false) {
      state.socket.emit("typing", { from: state.chatName }, (err) => {});
      setState({ isTyping: true }); // flag first byte only
    }
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
          <h3 style={{ textAlign: "center" }}>Lab 18 - Scenario 1,2,3 Tests</h3>
          <TextField
            onChange={onMessageChange}
            placeholder="type something here"
            autoFocus={true}
            required
          />
          <h4 style={{marginTop: 40}}>Current Messages</h4>
          {state.messages.map((message, index) => (
            <Typography style={{ marginLeft: "5vw" }} key={index}>
              {message.text}
            </Typography>
          ))}
          <div style={{marginTop: 20, color: "black"}}>
            <Typography color="primary">{state.typingMsg}</Typography>
          </div>
        </Container>
      ) : null}
    </ThemeProvider>
  );
};

export default Scenario123Test;
