import React, { useState } from "react";
import Display from "./Display";
import {messagesPlaceholder} from "./Placeholder";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState(messagesPlaceholder);

  const sendMessage = (e) => {
    e.preventDefault();
    if (msg.trim() !== "") {
      const msgObj = {
        text: msg,
        author: "You",
        id: Math.random(),
      };
      setMessages((items) => items.concat(msgObj));
      setMsg("");
    }
  };



  return (
    <div className="chat">
      <Display messages={messages}/>
        <form className="chat__bottom" onSubmit={sendMessage}>
          <input
            value={msg}
            placeholder="Send a Message"
            onChange={(e) => setMsg(e.target.value)}
            type="text"
          />
          <button type="submit" className="btn">
            Send
          </button>
        </form>
      </div>
  );
};



export default Chat;
