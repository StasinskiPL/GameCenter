import React from "react";
import { FaChessPawn, FaChessQueen } from "react-icons/fa";

const CheckersCell = ({ cell, currentPawn, dragCurrentCell, reversed }) => {
  const { quenn, cellColor, pawn, index, id } = cell;

  const classes = ["checkersCell"];
  classes.push(cellColor);
  if (currentPawn === id) {
    classes.push("current");
  }
  if (dragCurrentCell === id) {
    classes.push("focused");
  }
  const renderPawn = quenn ? (
    <FaChessQueen className={[pawn, reversed && "reversed"].join(" ")} />
  ) : pawn ? (
    <FaChessPawn className={[pawn, reversed && "reversed"].join(" ")} />
  ) : null;

  return (
    <div data-index={index} className={classes.join(" ")}>
      {renderPawn}
    </div>
  );
};

export default React.memo(CheckersCell);
