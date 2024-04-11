import React, { useState, useEffect, useRef, useReducer } from "react";
import { ThemeProvider } from "@mui/material/styles";
import io from "socket.io-client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Container,
  Typography,
} from "@mui/material";
import theme from "./theme.js";
import Bar from "./Bar.jsx";
import ChatMsg from "./chatmsg.jsx";
import "../App.css";
import MessageIcon from "@mui/icons-material/Message";

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
    //For getUsersData
    dialogData: {
      users: [],
      rooms: [],
      colors: [],
    },
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const effectRan = useRef(false);
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

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
    socket.on("updateuserlist", updateUsersList);

    console.log(state.dialogData);
    setState({ socket: socket });
  };

  const updateUsersList = (props) => {
    let data = {
      users: props.users.map((user) => user.user),
      rooms: props.users.map((user) => user.room),
      colors: props.users.map((user) => user.color),
    };
    setState({ dialogData: data });
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
    console.log(state.messages);
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
      {state.showjoinfields ? (
        <Container maxWidth="xs" sx={{ marginTop: "120px" }}>
          <Bar />
          <MessageIcon style={{ color: "blue", height: 75, width: 90 }} />
          <Typography color="primary" style={{ fontSize: 40 }}>
            Sign in:
          </Typography>
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
          <Typography
            color="primary"
            style={{ marginTop: 10, fontSize: 16, textAlign: "center" }}
          >
            Join existing or enter Room Name
          </Typography>
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
        <Container maxWidth="xs" sx={{ marginTop: "120px" }}>
          <Bar showDialogIcon={true} viewDialog={handleOpenDialog} />
          <Dialog
            open={open}
            onClose={handleCloseDialog}
            style={{ margin: 20 }}
          >
            <DialogTitle style={{ textAlign: "center" }}>Who's on</DialogTitle>
            <DialogContent>
              {state.dialogData.users.length > 0 ? (
                state.dialogData.users.map((user, index) => (
                  <p key={index}>
                    {state.dialogData.colors[index]}: {user} is in room{" "}
                    {state.dialogData.rooms[index]}
                  </p>
                ))
              ) : (
                <Typography>No users online.</Typography>
              )}
            </DialogContent>
          </Dialog>
          <h3 style={{ textAlign: "center" }}>Lab 18 - Scenario Enhanced</h3>
          {/* <h3 style={{ textAlign: "center" }}>{state.dialoggData}</h3> */}
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
            Messages in {state.roomName}
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
