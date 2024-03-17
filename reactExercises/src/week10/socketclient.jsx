import React, { useState, useEffect, Fragment, useRef } from "react";
import io from "socket.io-client";
const SocketClient = () => {
  const [msg, setMsg] = useState("");
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
      });
      socket.on("connect", () =>
        setMsg(`Is this client is connected? - ${socket.connected}`)
      );
    } catch (err) {
      setMsg("client connection failed");
    }
  };
  return (
    <Fragment>
      <div>{msg}</div>
    </Fragment>
  );
};
export default SocketClient;
