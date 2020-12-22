import React, { useState, useEffect } from "react";
import GameLayout from "../../../hoc/GameLayout";
import { useGamesContext } from "../../../context/GamesContextProvider";
import { useSocket } from "../../../context/SocketProvider";
import ConnectFourCell from "./ConnectFourCell";
import useUserId from "../../../hooks/useUserId";
import Setting from "../../Setting";

const init = () =>
  new Array(42).fill().map((_, index) => {
    return {
      id: index,
      taken: false,
      color: "",
    };
  });

const ConnectFour = () => {
  const [grid, setGrid] = useState(init());
  const [nextColor, setNextColor] = useState("GREEN");
  const [gravitation, setGravitation] = useState(true);
  const { socket } = useSocket();
  const { currentRoom, playerTurn, players } = useGamesContext();
  const userId = useUserId();

  useEffect(() => {
    if (socket) {
      socket.on("changeGravitation", ({ value }) => {
        setGravitation(value);
      });

      socket.on("restart", () => {
        setGrid(init());
      });
      socket.on("ConnectFourCellTaken", ({ id }) => {
        console.log(id);
        setGrid((c) =>
          c.map((cell) => {
            if (cell.id === id) {
              const updatedCell = { ...cell, taken: true, color: nextColor };
              setNextColor(nextColor === "GREEN" ? "RED" : "GREEN");
              return updatedCell;
            } else {
              return cell;
            }
          })
        );
      });
    }
    return () => {
      if (socket) socket.removeListener("ConnectFourCellTaken");
    };
  }, [socket, nextColor]);

  const gridClickedHandler = (e) => {
    const cellId = +e.target.id;
    if (socket && userId === playerTurn.id && !grid[cellId].taken) {
      socket.emit("ConnectFourCellTaken", {
        room: currentRoom,
        grid: grid,
        cellId: cellId,
        userId: userId,
        players: players,
        color: nextColor,
        gravitation: gravitation,
      });
    }
  };

  const changeGravitation = (value) => {
    socket.emit("changeGravitation", { room: currentRoom, value: value });
  };

  const gravitationBtn = (
    <div className="setting-toggle">
      <span
        onClick={() => changeGravitation(true)}
        className={`${gravitation && "active"}`}
      >
        TRUE
      </span>
      <span
        onClick={() => changeGravitation(false)}
        className={`${!gravitation && "active"}`}
      >
        FALSE
      </span>
    </div>
  );

  return (
    <GameLayout>
      <div className="connectFour" nextcolor={nextColor}
        onClick={gridClickedHandler}>
        {grid.map((cell) =>(<ConnectFourCell key={cell.id} cell={cell} />))}
      </div>
      <Setting name="Gravitation: " btn={gravitationBtn} />
    </GameLayout>
  );
};

export default ConnectFour;
