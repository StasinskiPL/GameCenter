import { useEffect } from "react";
import { useGamesContext } from "../context/GamesContextProvider";
import { useSocket } from "../context/SocketProvider";
import useUserNick from "../hooks/useUserNick";
import useUserId from "../hooks/useUserId";
import Player from "./Player";

const PlayersList = () => {
  const { socket } = useSocket();
  const [nick] = useUserNick();
  const id = useUserId();
  const { currentRoom, setNumbersOfPlayers,setPlayers,players } = useGamesContext();

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
  }, [socket, id, nick,setPlayers, currentRoom, players.length, setNumbersOfPlayers]);

  useEffect(() => {
    if(socket){
      socket.on("userLeave", ({userId})=>{
        setPlayers(state => state.filter(p => p.id !== userId))
      })
    }
    return () => {
      if(socket){
        socket.removeListener("userLeave")   
      }
    }
  }, [socket,id,setPlayers])

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
    </div>
  );
};

export default (PlayersList);
