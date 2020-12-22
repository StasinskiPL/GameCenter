import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

const GamesContext = React.createContext();

const GamesContextProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [playerTurn, setPlayerTurn] = useState("");
  const [numbersOfPlayers, setNumbersOfPlayers] = useState(1);
  const history = useHistory();

  const redirectToHome = () =>{
    history.push("/");
    setCurrentRoom(null)
    setPlayerTurn("")
    setPlayers([])
    setNumbersOfPlayers(1)
    window.location.reload();

    
  }

  return (
    <GamesContext.Provider
      value={{
        currentRoom,
        setCurrentRoom,
        playerTurn,
        setPlayerTurn,
        players,
        setPlayers,
        redirectToHome,
        setNumbersOfPlayers,
        numbersOfPlayers,
       
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export const useGamesContext = () => useContext(GamesContext);

export default GamesContextProvider;
