import React, { useState, useEffect } from "react";
import GameLayout from "../../../hoc/GameLayout";
import { useSocket } from "../../../context/SocketProvider";
import TicTacToeCell from "./TicTacToeCell";

const initArr = new Array(9).fill().map((_, index) => {
  return {
    id: index,
    taken: false,
    Symbol: null,
  };
});

const TicTacToe = () => {
  const [cells, setCells] = useState(initArr);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("restart", ()=>{
        setCells(initArr)
      })
      socket.on("TicTacToeCellTaken", ({ id, symbol}) => {
        setCells((c) =>
          c.map((cell) => {
            if (cell.id === id) {
              return { ...cell, taken: true, symbol:symbol };
            } else {
              return cell;
            }
          })
        );
      });
    }
    return () => {
      if (socket) socket.removeListener("TicTacToeCellTaken");
    };
  }, [socket]);


  

  return (
    <GameLayout>
      <div className="tictactoe">
        <div className="tictactoe__center">
            <div className="tictactoe__grid">
            {cells.map((cell) => (
            <TicTacToeCell cell={cell} grid={cells} key={cell.id} />
          ))}
            </div>
       
        </div>
      </div>
    </GameLayout>
  );
};



 

export default TicTacToe;
