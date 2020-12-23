import React, { useEffect, useState } from "react";
import { useGamesContext } from "../../../context/GamesContextProvider";
import { useSocket } from "../../../context/SocketProvider";
import GameLayout from "../../../hoc/GameLayout";
import useUserId from "../../../hooks/useUserId";
import CheckersCell from "./CheckersCell";
import { initGrid, movePawn } from "./CheckersLogic";
import Setting from "../../Setting";

const Checkers = () => {
  const [grid, setGrid] = useState(initGrid());
  // const [showPosibbleMove, setShowPosibbleMove] = useState(false);
  const [currentPawn, setCurrentPawn] = useState(null);
  const [dragCurrentCell, setDragCurrentCell] = useState(null);
  const { socket } = useSocket();
  const userId = useUserId();
  const { currentRoom, playerTurn, players } = useGamesContext();
  const userIndex = players.findIndex((p) => p.id === userId);

  useEffect(() => {
    if (socket) {
      socket.on("updateGrid", ({ updatedGrid }) => {
        setGrid(updatedGrid);
      });
      socket.on("restart", () => {
        setGrid(initGrid());
      });
    }
    return () => {
      if (socket) {
        socket.removeListener("checkersCellTaken");
        socket.removeListener("restart");
      }
    };
  }, [socket]);

  const gridClickedHandler = (e) => {
    const index = +e.target.closest("div").dataset.index;
    const cell = grid[index];

    if (
      cell &&
      cell.pawn &&
      ((cell.pawn === "PAWN_WHITE" && userIndex === 0) ||
        (cell.pawn === "PAWN_BLACK" && userIndex === 1))
    ) {
      setCurrentPawn(cell);
      return;
    }
    if (
      playerTurn.id === userId &&
      currentPawn &&
      cell &&
      cell.cellColor === "CELL_BROWN" &&
      !cell.pawn
    ) {
      const updatedGrid = movePawn(currentPawn, cell, grid);
      if (updatedGrid && socket) {
        socket.emit("updateGrid", {
          room: currentRoom,
          updatedGrid,
          userId,
          players,
        });
      }
    }
    setCurrentPawn(null);
  };

  const gridDragStart = (e) => {
    const index = +e.target.closest("div").dataset.index;
    const cell = grid[index];
    if (
      cell &&
      cell.pawn &&
      ((cell.pawn === "PAWN_WHITE" && userIndex === 0) ||
        (cell.pawn === "PAWN_BLACK" && userIndex === 1))
    ) {
      setCurrentPawn(cell);
    }
  };

  const gridDragEnterHandler = (e) => {
    if (currentPawn) {
      const index = +e.target.closest("div").dataset.index;
      const cell = grid[index];
      if (
        !dragCurrentCell ||
        (dragCurrentCell && index !== dragCurrentCell.index)
      ) {
        setDragCurrentCell(cell);
      }
    }
  };

  const gridDragEnd = () => {
    if (
      playerTurn.id === userId &&
      currentPawn &&
      dragCurrentCell &&
      dragCurrentCell.cellColor === "CELL_BROWN" &&
      !dragCurrentCell.pawn
    ) {
      const updatedGrid = movePawn(currentPawn, dragCurrentCell, grid);
      if (updatedGrid && socket) {
        socket.emit("updateGrid", {
          room: currentRoom,
          updatedGrid,
          userId,
          players,
        });
      }
    }
    setCurrentPawn(null);
    setDragCurrentCell(null);
  };

  const restCheckers = () => {
    socket.emit("restart", { room: currentRoom });
  };

  const resetBtn = (
    <button onClick={restCheckers} className="setting-btn">
      Reset
    </button>
  );

  return (
    <GameLayout>
      <div className="checkers">
        <div className="checkers__center">
          <div
            className={`checkers__grid ${userIndex === 1 && "reversed"}`}
            onMouseDown={(e) => gridDragStart(e)}
            onMouseUp={() => gridDragEnd()}
            onMouseOver={(e) => gridDragEnterHandler(e)}
            onClick={gridClickedHandler}
          >
            {grid.map((cell) => (
              <CheckersCell
                currentPawn={currentPawn ? currentPawn.id : ""}
                dragCurrentCell={dragCurrentCell ? dragCurrentCell.id : ""}
                cell={cell}
                key={cell.id}
                reversed={userIndex === 1}
              />
            ))}
          </div>
        </div>
        <Setting name="reset:" btn={resetBtn} />
      </div>
    </GameLayout>
  );
};

export default Checkers;
