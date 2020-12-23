import React, { useEffect } from "react";
import { useGamesContext } from "../../context/GamesContextProvider";
import { useSocket } from "../../context/SocketProvider";
import useUserNick from "../../hooks/useUserNick";
import useUserId from "../../hooks/useUserId";
import LobbyLink from "./LobbyLink";
import LobbyBody from "./LobbyBody";
import LobbyHeader from "./LobbyHeader";

const Lobby = ({ location }) => {
  const [nick] = useUserNick();
  const { currentRoom, setCurrentRoom } = useGamesContext();
  const room = new URLSearchParams(location.search).get("room");
  const id = useUserId();
  const { socket } = useSocket();

  useEffect(() => {
    if (currentRoom !== room) {
      setCurrentRoom(room);
    }
    if (socket && nick && nick.trim() !== "") {
      socket.emit("createRoom", { room: currentRoom, player: { nick, id } });
    }
  }, [room, setCurrentRoom, currentRoom, socket, nick, id]);

  return (
    <>
      <section className="lobby">
        <div className="lobby__center">
          <LobbyHeader />
          <LobbyLink />
          <LobbyBody />
        </div>
      </section>
    </>
  );
};

export default Lobby;
