import { useEffect,useState, useCallback } from "react";
import Chat from "../components/Chat/Chat";
import CurrentPlayer from "../components/CurrentPlayer";
import { useSocket } from "../context/SocketProvider";
import { useGamesContext } from "../context/GamesContextProvider";




const GameLayout = ({ children}) => {
 
  const { socket } = useSocket();
  const {currentRoom,redirectToHome} = useGamesContext();


 useEffect(() => {
   if(!currentRoom){
    redirectToHome()
   }     
 }, [currentRoom,redirectToHome])

  const[gameResult, setGameResult] = useState(null);

  const startNewGame = useCallback(() => {
    socket.emit("restart", {room:currentRoom})

  },[socket,currentRoom]);


  useEffect(() => {
    if (socket) {
      socket.on("restart", ()=>{
        setGameResult(null);
      })
      socket.on("gameResult", ({ result, winner }) => {
        if (result === "DRAW") {
            setGameResult(
            <div className="game__result">
              <h1>DRAW</h1>
              <button onClick={startNewGame} className="game__result-btn">
                Start New Game
              </button>
            </div>
          );
        } else if (result === "FINISHED") {
            setGameResult(
            <div className="game__result">
              <h1>{winner.nick} WON</h1>
              <button onClick={startNewGame} className="game__result-btn">
                Start New Game
              </button>
            </div>
          );
        }else if (result === "OPPONENTLEFT"){
          setGameResult(
            <div className="game__result">
              <h1>{"Your Opponent Left :("}</h1>
              <button onClick={redirectToHome} className="game__result-btn">
                Back to home
              </button>
            </div>
          )
        }
      });
      return () => {
        if (socket) {
          socket.removeListener("gameResult");
        }
      };
    }
  }, [socket, startNewGame,redirectToHome]);

  return (
    <section className="game">
      <div className="game__center">
        <div className="game__content">
        <CurrentPlayer />
          {gameResult}
          {children}
        </div>
        <Chat />
      </div>
    </section>
  );
};

export default GameLayout;
