import React, { useState } from "react";
import Chat  from "../../components/Chat/Chat";
import { useParams } from "react-router-dom";

const Lobby = ({ location}) => {
  const { game: title } = useParams();
  const [isEnemy, setIsEnemy] = useState(false);

  const room = new URLSearchParams(location.search).get("room");

  const copyHandler = () =>{
      navigator.clipboard.writeText(window.location.href)
  }

  // backEnd Logic

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
          <div className="lobby__link-box"><h1>Invite a friend</h1></div> <p>{window.location.href}</p>{" "}
          <button onClick={copyHandler}>Copy Link</button>
        </div>
        <div className="lobby__body">
            {/* rules */}
            <div></div>
            <Chat/>
        </div>
      </div>
    </section>
  );
};

export default Lobby;
