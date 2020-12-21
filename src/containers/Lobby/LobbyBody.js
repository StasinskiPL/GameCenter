import Chat from "../../components/Chat/Chat";
import PlayersList from "../../components/PlayersList";
import StartGameBtn from "../../components/StartGameBtn";

const LobbyBody = () => {
  return (
    <div className="lobby__body">
      <div className="lobby__players">
        <PlayersList />
        <StartGameBtn />
      </div>
      <Chat />
    </div>
  );
};

export default LobbyBody;
