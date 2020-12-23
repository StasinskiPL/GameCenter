import React from "react";
import useUserId from "../hooks/useUserId";

const Player = ({ player }) => {
  const { nick, id } = player;
  const userId = useUserId();

  const you = userId === id ? <span className="player-you">(You)</span> : null;
  return (
    <div className="player">
      <h1 className="player-nick">
        {nick}
        {you}
      </h1>
    </div>
  );
};

export default React.memo(Player);
