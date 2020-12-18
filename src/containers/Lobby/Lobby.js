import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import { useGamesContext } from "../../context/GamesContextProvider";

const Lobby = ({ location}) => {
  const { game: title } = useParams();
  const [isEnemy, setIsEnemy] = useState(false);
  const { currentRoom, setCurrentRoom } = useGamesContext();
  const room = new URLSearchParams(location.search).get("room");


  useEffect(() => {
    if(currentRoom !== room){
      setCurrentRoom(room);
    }
  }, [room,setCurrentRoom,currentRoom]);

  const copyHandler = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <section className="lobby">
      <div className="lobby__center">
        <div className="lobby-header">
          {" "}
          <h1> {title}</h1>
          <button className={`lobby-btn ${!isEnemy && "disable"} `}>
            {"Start Game ->"}
          </button>
        </div>
        <div className="lobby__link">
          <div className="lobby__link-box">
            <h1>Invite a friend</h1>
          </div>{" "}
          <p>{window.location.href}</p>{" "}
          <button onClick={copyHandler}>Copy Link</button>
        </div>
        <div className="lobby__body">
          {/* rules */}
          <div></div>
          <Chat />
        </div>
      </div>
    </section>
  );
};

export default Lobby;
