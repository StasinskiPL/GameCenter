import React from 'react'
import { useParams} from "react-router-dom";
import StartGameBtn from "../../components/StartGameBtn"


const LobbyHeader = () => {
  const { game: gameTitle } = useParams();

    return (
        <div className="lobby-header">
        <h1> {gameTitle}</h1>
        <span className="lobby-header-btnWrapper">
          <StartGameBtn/>
      </span> 
      </div>
    )
}

export default LobbyHeader
