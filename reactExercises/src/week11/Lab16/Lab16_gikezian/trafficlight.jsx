import React, { useState, useEffect, useRef, useReducer } from "react";
import io from "socket.io-client";
import "./theme.css";

const TrafficLight = (props) => {
  const initialState = { streetName: "" };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const [color, setColor] = useState("red");
  const [serverConnected, setServerConnected] = useState(true); // Flag to track server connection
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return; // React 18 Strictmode runs useEffects twice in development`
    serverConnect();
    effectRan.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const serverConnect = () => {
    try {
      const socket = io.connect("localhost:5000", {
        forceNew: true,
        transports: ["websocket"],
        autoConnect: true,
        reconnection: false,
        timeout: 5000,
      });

      const lampData = socket.emit("join", { streetName: props.street }, (err) => {});
      socket.on("welcome", handleTurnLampOn(lampData, socket));
      socket.on("disconnect", () => {
        setServerConnected(false); // If server is not available, set the lamp to remain red 
      });

      setState({ socket: socket });
      if (socket.io._readyState === "opening")
        setState({ msg: "trying to get connection..." });
    } catch (err) {
      console.log(err);
      setState({ msg: "some other problem occurred" });
    }
  };

  const handleTurnLampOn = (lampData, socket) => {
    // socket.disconnect(); 
    return async () => {
      while (true) {
        if (!serverConnected) {
          // If server is disconnected, keep the light red
          setColor("red");
          return;
        }
        console.log(`Green: ${lampData.green}s, Red: ${lampData.red}s, Yellow: ${lampData.yellow}s`)
        await waitSomeSeconds(lampData.red, "green");
        await waitSomeSeconds(lampData.green, "yellow");
        await waitSomeSeconds(lampData.yellow, "red");
      }
    };
  };

  const waitSomeSeconds = (waitTime, nextColorToIlluminate) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setColor(nextColorToIlluminate);
        resolve();
      }, waitTime * 10000);
    });
  };

  const getStateColor = (c) => (color === c ? color : "white");

  return (
    <div className="light">
      <div className="lamp" style={{ backgroundColor: getStateColor("red"), margin: ".5rem" }} />
      <div className="lamp" style={{ backgroundColor: getStateColor("yellow"), margin: ".5rem" }} />
      <div className="lamp" style={{ backgroundColor: getStateColor("green"), margin: ".5rem" }} />
      <div style={{ textAlign: "center", fontName: "Helvetica" }}>{props.street}</div>
    </div>
  );
};

export default TrafficLight;

