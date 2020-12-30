import React from "react";
import GameCard from "../GameCard";
import ConnectFourImg from "./images/Connect_four.svg"
import ChessBoardImg from "./images/chess.webp"
import TicTacToeImg from "./images/tic-toe.webp"


const gamesList = [
  {
    title: "ConnectFour",
    img:ConnectFourImg,
  },
  {
    title: "TicTacToe",
    img:TicTacToeImg,
  },
  {
    title: "Checkers",
    img:ChessBoardImg,
  },
];

const Games = () => {
  const gameCarts = gamesList.map((game, index) => (
    <GameCard key={index} game={game} />
  ));

  return (
    <section className="games">
      <div className="games__center">{gameCarts}</div>
    </section>
  );
};

export default Games;
