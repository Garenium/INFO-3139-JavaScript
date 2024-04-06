import React, { useState, useEffect, useRef, useReducer } from "react";
import { ThemeProvider } from "@mui/material/styles";
import io from "socket.io-client";
import {
  TextField,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import theme from "./theme.js";
import Bar from "./Bar.jsx";

const Scenario1Test = () => {
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
    setState({
      socket: io.connect("localhost:5000", {
        forceNew: true,
        transports: ["websocket"],
        autoConnect: true,
        reconnection: false,
        timeout: 5000,
      }),
    });

    // const socket = io.connect("localhost:5000", {
    //     forceNew: true,
    //     transports: ["websocket"],
    //     autoConnect: true,
    //     reconnection: false,
    //     timeout: 5000,
    // });
    // state.socket.on("nameexists", onExists);
    // console.log(state.status);
    // state.socket.on("welcome", addMessageToList);
    // state.socket.on("someonejoined", addMessageToList);
    // return () => {
    //   socket.disconnect(); //no need anymore?
    // };
  };

  const addMessageToList = (msg) => {
    setState((prevState) => ({
      messages: [...prevState.messages, msg],
    }));
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
    //check if the username already exists
    console.log(state.chatName);
    console.log(state.roomName);
    state.socket.emit("join", {
      chatName: state.chatName,
      roomName: state.roomName,
    });
    // state.socket.on("nameexists", onExists);
    // console.log(state.messages);
    // state.socket.on("welcome", addMessageToList);
    // state.socket.on("someonejoined", addMessageToList);
    // setState({ showjoinfields: false });
    

    //TODO: FIX THIS
  //    state.socket.on("nameexists", (message) => {
  //   if (message) {
  //     console.log("Name exists");
  //     setState({ showjoinfields: true, status: message }); // Update status as well
  //   } else {
  //     setState({ showjoinfields: false, status: "" }); // Reset status
  //     state.socket.on("welcome", addMessageToList);
  //     state.socket.on("someonejoined", addMessageToList);
  //   }
  // });
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
            data-testid="submit"
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
        <div>
          {state.messages.map((message, index) => (
            <Typography style={{ marginLeft: "5vw" }} key={index}>
              {message.text}
            </Typography>
          ))}
        </div>
      ) : null}
    </ThemeProvider>
  );
};

export default Scenario1Test;
