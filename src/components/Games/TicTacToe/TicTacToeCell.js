import React from "react";
import { useSocket } from "../../../context/SocketProvider";
import { useGamesContext } from "../../../context/GamesContextProvider";
import useUserId from "../../../hooks/useUserId";

const TicTacToeCell = ({ cell, grid }) => {
  const { id, taken, symbol } = cell;
  const userId = useUserId();
  const { socket } = useSocket();
  const { currentRoom, playerTurn, players } = useGamesContext();

  const cellClickHandler = () => {
    if (!taken && socket && userId === playerTurn.id) {
      socket.emit("TicTacToeCellTaken", {
        room: currentRoom,
        userId: userId,
        grid: grid,
        id: id,
        players: players,
      });
    }
  };
  const classes = taken ? "tictactoe__cell  taken " : "tictactoe__cell";
  const renderSymbol = symbol ? symbol : null;
  return (
    <div onClick={cellClickHandler} key={Math.random()} className={classes}>
      {renderSymbol}
    </div>
  );
};

export default React.memo(TicTacToeCell);
