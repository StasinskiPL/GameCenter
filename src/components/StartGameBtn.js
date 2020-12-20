import { useGamesContext } from '../context/GamesContextProvider'

const StartGameBtn = ({match,location}) => {
  const {numbersOfPlayers} = useGamesContext();
  
    return (
        <button className={`lobby-btn ${numbersOfPlayers <2 && "disable"} `}>
        {"Start Game ->"}
      </button>
    )
}

export default StartGameBtn
