import React, { useState, useEffect } from "react";
import Display from "./Display";
import { useSocket } from "../../context/SocketProvider";
import useUserId from "../../hooks/useUserId";
import useUserNick from "../../hooks/useUserNick";
import { useGamesContext } from "../../context/GamesContextProvider";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const {currentRoom} = useGamesContext();
  const userId = useUserId();
  const [nick ] = useUserNick();


  const {socket } = useSocket();
  useEffect(() => {
    if (socket && currentRoom) {
      socket.on(`getMessage/${currentRoom}`, ({msg}) => {
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
        authorId: userId,
        authorNick : nick,
        id: new Date().getTime(),
      };
      socket.emit("sendMessage", {msg:msgObj, room:currentRoom});
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
