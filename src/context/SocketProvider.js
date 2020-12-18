import React, { useState, useEffect, useContext } from "react";
import {useGamesContext} from "./GamesContextProvider"
import { io } from "socket.io-client";

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const {currentRoom} = useGamesContext();

  const sendMessage = (msg) => {
    socket.emit("sendMessage", {msg, room:currentRoom});
  };

  useEffect(() => {
    const createSocket = io("http://localhost:5050",{
    query:{
        id: Math.random(),
    }
    });
    setSocket(createSocket);
    return ()=> createSocket.close();
    
  }, []);
  return (
    <SocketContext.Provider value={{ socket, sendMessage,  }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
