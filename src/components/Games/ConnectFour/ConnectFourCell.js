import React from "react";
import { useGamesContext } from "../../../context/GamesContextProvider";
import useUserId from "../../../hooks/useUserId";

const ConnectFourCell = ({ cell }) => {
  const userId = useUserId();
  const { players } = useGamesContext();
  const { taken, color, id } = cell;
  const nextColorClass = players[0].id === userId ? "nextGreen" : "nextRed";
  const classes = taken
    ? `connectFourCell ${color}`
    : `connectFourCell notTaken ${nextColorClass}`;
  return <div id={id} className={classes}></div>;
};

export default React.memo(ConnectFourCell);
