import React from "react";
import { Link } from "react-router-dom";

const GameCard = ({ game }) => {
  const { title, img } = game;
  return (
    <div className="gameCard">
      <Link
        to={{
          pathname: `/lobby/${title}`,
          search: `?room=${new Date().getTime()}`,
        }}
      >
        <div className="gameCard__img-container">
          <img src={img} alt="" />
        </div>
        <div className="gameCard__info">
          <h1 className="gameCard__info-title">{title}</h1>
          <h2>{"Play Now ->"}</h2>
        </div>
      </Link>
    </div>
  );
};

export default GameCard;
