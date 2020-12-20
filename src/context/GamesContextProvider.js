import React, { useContext, useState } from "react";

const GamesContext = React.createContext();

const GamesContextProvider = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState("");
  const [numbersOfPlayers, setNumbersOfPlayers] = useState(1);

  return (
    <GamesContext.Provider
      value={{ currentRoom, setCurrentRoom, setNumbersOfPlayers, numbersOfPlayers }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export const useGamesContext = () => useContext(GamesContext);

export default GamesContextProvider;
