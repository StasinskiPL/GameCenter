import React, { useState, useEffect } from "react";
import Display from "./Display";
import { useSocket } from "../../context/SocketProvider";
import { useGamesContext } from "../../context/GamesContextProvider";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const {currentRoom} = useGamesContext();


  const { sendMessage, socket } = useSocket();
  useEffect(() => {
    if (socket && currentRoom) {
      socket.on(`getMessage/${currentRoom}`, ({msg}) => {
        console.log(msg)
        setMessages(items=>items.concat(msg))
      });
    }
    return ()=>{
      if(socket){
        socket.removeListener(`getMessage/${currentRoom}`)
      }
    } 
   
  }, [socket,currentRoom]);

  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (msg.trim() !== "") {
      const msgObj = {
        text: msg,
        author: "You",
        id: Math.random(),
      };
      sendMessage(msgObj);
      setMsg("");
    }
  };

  return (
    <div className="chat">
      <Display messages={messages} />
      <form className="chat__bottom" onSubmit={sendMessageHandler}>
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

export default React.memo(Chat);
