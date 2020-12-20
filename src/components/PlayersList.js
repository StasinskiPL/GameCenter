import { useEffect, useState } from "react";
import { useGamesContext } from "../context/GamesContextProvider";
import { useSocket } from "../context/SocketProvider";
import useUserNick from "../hooks/useUserNick";
import useUserId from "../hooks/useUserId";
import Player from "./Player";
import StartGameBtn from "./StartGameBtn";

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const { socket } = useSocket();
  const [nick] = useUserNick();
  const id = useUserId();
  const { currentRoom, setNumbersOfPlayers } = useGamesContext();

  useEffect(() => {
    if (socket && currentRoom && nick && id) {
      socket.on("getPlayers", ({ player }) => {
        setPlayers((state) => {
          const exist = state.find((p) => p.id === player.id);
          if (exist) {
            return state;
          } else {
            if(player.id !== id)
            socket.emit("createRoom",{room: currentRoom,player: { nick, id }});
            return state.concat(player);
          }
        });
      });
      setNumbersOfPlayers(players.length);
    }
    return () => {
      if (socket) {
        socket.removeListener("getPlayers");
      }
    };
  }, [socket, id, nick, currentRoom, players.length, setNumbersOfPlayers]);

  return (
    <div className="players">
      <div className="players__header">
        <h1>Players:</h1>
      </div>
      <ul className="players__list">
        {players.map((player) => (
          <Player key={player.id} player={player} />
        ))}
      </ul>
      <StartGameBtn />
    </div>
  );
};

export default PlayersList;
