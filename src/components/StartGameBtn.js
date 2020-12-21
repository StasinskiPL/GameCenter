import {memo, useEffect} from "react"
import { useGamesContext } from '../context/GamesContextProvider'
import { useSocket } from '../context/SocketProvider'
import {useParams, useHistory} from "react-router-dom"

const StartGameBtn = () => {


  const {numbersOfPlayers, currentRoom, players} = useGamesContext();
  const {game} = useParams()
  const {socket} = useSocket();
  let history = useHistory();


  useEffect(()=>{

    if(socket){
      socket.on("gameStarted", ()=>{
      history.push(`/${game}?room=${currentRoom}`)
      })
    } 
    return ()=>{
      if(socket){
        socket.removeListener("gameStarted")
      }
    }
  },[socket,history,game,currentRoom])

  const startGameHandler = () =>{
    if(numbersOfPlayers >1 && currentRoom){
     socket.emit("gameStarted", {room:currentRoom,players:players })
    }
  }
  
    return (
        <button onClick={startGameHandler} className={`lobby-btn ${numbersOfPlayers <2 && "disable"} `}>
        {"Start Game ->"}
      </button>
    )
}

export default memo(StartGameBtn)
