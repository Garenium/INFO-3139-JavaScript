import React, { useState, useEffect, useRef, useReducer } from "react";
import { Snackbar } from "@mui/material";
import io from "socket.io-client";

const SocketClient = (props) => {
  const initialState = { msg: "", roomMsg: "", showMsg: false, socket: {} };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to track Snackbar visibility
  const effectRan = useRef(false);


  const snackbarClose = () => {
    setSnackbarOpen(false); // Close the Snackbar
  };

  const onJoinClicked = () => {
    state.socket.io._readyState !== "closed"
      ? state.socket.emit(
          "join",
          { name: props.name, room: props.room },
          (err) => {}
        )
      : setState({
          msg: "can't get connection - try later!",
          showMsg: true,
        });
  };

  useEffect(() => {
    if (effectRan.current) return; // React 18 Strictmode runs useEffects twice in development
    console.log("IN SOCKETCLIENT.JSX");
    serverConnect();
    effectRan.current = true;

    console.log(state.roomMsg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Update Snackbar visibility when state.showMsg changes
    setSnackbarOpen(state.showMsg);
  }, [state.showMsg]);

  const serverConnect = () => {
    try {
      setState({ showMsg: true });
      // connect to server locally
      const socket = io.connect("localhost:5000", {
        forceNew: true,
        transports: ["websocket"],
        autoConnect: true,
        reconnection: false,
        timeout: 5000,
      });

      state.socket = socket;

      socket.on("connect", () => {
        if (socket.io._readyState === "opening")
          setState({ msg: "trying to get connection..." });
      });


      onJoinClicked();

      socket.on("welcome", onWelcome);
      socket.on("newclient", newClientJoined);
      setState({ socket: socket });

      // Call onJoinClicked after setting up event listeners
      onJoinClicked();
    } catch (err) {
      console.log(err);
      setState({ msg: "some other problem occurred" });
    }
  };

  const onWelcome = (welcomeMsgFromServer) => {
    setState({ msg: welcomeMsgFromServer });
  };

  const newClientJoined = (joinMsgFromServer) => {
    setState({ ...state, roomMsg: joinMsgFromServer });
  };

  return (
    <div style={{ margin: 10 }}>
      <Snackbar
        open={snackbarOpen} // Use snackbarOpen to control Snackbar visibility
        message={state.msg}
        autoHideDuration={4000}
        onClose={snackbarClose}
      />
      {/* Render roomMsg if it exists and Snackbar is closed */}
      {state.roomMsg && !snackbarOpen && <div>{state.roomMsg}</div>}
    </div>
  );
};

export default SocketClient;
