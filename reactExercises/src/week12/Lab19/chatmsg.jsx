import React from "react";
import "../../App.css";

const ChatMsg = (props) => {
  return (
    <div
      className="scenario-message"
      style={{ backgroundColor: props.msg.color }}
    >
      {console.log(props)}
      {console.log(props.msg.color)}
      {console.log(props.msg.text)}
      {props.msg.text}
    </div>
  );
};
export default ChatMsg;
