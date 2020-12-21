import React, { useContext, useState } from "react";

const GamesContext = React.createContext();

const GamesContextProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);

  const [currentRoom, setCurrentRoom] = useState("");
  const [playerTurn, setPlayerTurn] = useState("");
  const [numbersOfPlayers, setNumbersOfPlayers] = useState(1);

  return (
    <GamesContext.Provider
      value={{
        currentRoom,
        setCurrentRoom,
        playerTurn,
        setPlayerTurn,
        players,
        setPlayers,
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
