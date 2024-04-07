import React, { useState, useEffect, useRef, useReducer } from "react";
import { ThemeProvider } from "@mui/material/styles";
import io from "socket.io-client";
import { TextField, Button, Container, Typography } from "@mui/material";
import theme from "./theme.js";
import Bar from "./Bar.jsx";
import ChatMsg from "./chatmsg.jsx";
import "../../App.css";

const ScenariosEnhanced = () => {
  const initialState = {
    chatName: "",
    roomName: "",
    socket: {},
    messages: [],
    showjoinfields: true,
    status: "",
    isTyping: false,
    typingMsg: "",
    message: "",
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
    socket.on("newmessage", onNewMessage);

    setState({ socket: socket });
  };

  const onNewMessage = (msg) => {
    addMessageToList(msg);
    setState({ typingMsg: "" });
  };

  const onTyping = (msg) => {
    if (msg.from !== state.chatName) {
      setState({
        typingMsg: msg.text,
      });
    }
  };

  const addMessageToList = (msg) => {
    let messages = state.messages;
    messages.push(msg);
    setState({
      messages: messages,
      showjoinfields: false,
    });
  };

  // keypress handler for message TextField
  const onMessageChange = (e) => {
    setState({ message: e.target.value });
    if (state.isTyping === false) {
      state.socket.emit("typing", { from: state.chatName }, (err) => {});
      setState({ isTyping: true }); // flag first byte only
    }
  };

  // enter key handler to send message
  const handleSendMessage = (e) => {
    if (state.message !== "") {
      state.socket.emit(
        "message",
        { from: state.chatName, text: state.message },
        (err) => {}
      );
      setState({ isTyping: false, message: "" });
      console.log("IN handleSendMessage(): " + state.message);
    }
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
          <h3 style={{ textAlign: "center" }}>Lab 18 - Scenario Enhanced</h3>
          <TextField
            onChange={onMessageChange}
            placeholder="type something here"
            autoFocus={true}
            value={state.message}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
                e.target.blur();
              }
            }}
          />
          <h4 style={{ marginTop: 40 }}>Current Messages</h4>
          <div className="scenario-container">
            Messages
            {state.messages.map((message, index) => (
              <ChatMsg msg={message} key={index} />
            ))}
          </div>
          <div style={{ marginTop: 20, color: "black" }}>
            <Typography color="primary">{state.typingMsg}</Typography>
          </div>
        </Container>
      ) : null}
    </ThemeProvider>
  );
};

export default ScenariosEnhanced;
