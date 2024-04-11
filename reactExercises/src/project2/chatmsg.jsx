import React from "react";
import "../App.css";

const ChatMsg = (props) => {
  return (
    <div
      className="scenario-message"
      style={{
        backgroundColor: props.msg.color,
        fontFamily: "Arial",
        padding: "10px",
        borderRadius: "5px",
        marginBottom: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        maxWidth: "80%",
        wordWrap: "break-word",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <span style={{ marginBottom: "15px", fontSize: "12px" }}>{props.msg.authortime}</span>
      <span>{props.msg.text}</span>
    </div>
  );
};
export default ChatMsg;
