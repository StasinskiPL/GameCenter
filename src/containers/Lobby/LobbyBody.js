import Chat from "../../components/Chat/Chat";
import PlayersList from "../../components/PlayersList";

const LobbyBody = () => {
    return (
        <div className="lobby__body">  
            <PlayersList/>  
            <Chat />
          </div>
    )
}

export default LobbyBody
