import React from "react";
import GameCard from "../GameCard";

const gamesList = [
  {
    title: "ConnectFour",
    img: "https://upload.wikimedia.org/wikipedia/en/a/a4/Connect_four_game.svg",
  },
  {
    title: "TicTacToe",
    img: "https://www.sztucznainteligencja.org.pl/wp-content/uploads/2019/08/tic-toe.png",
  },
  {
    title: "Checkers",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Chess.board.fabric.png/300px-Chess.board.fabric.png",
  },
];

const Games = () => {
  const gameCarts = gamesList.map((game, index) => <GameCard key={index} game={game} />);

  return (
    <section className="games">
      <div className="games__center">
        {gameCarts}
      </div>
    </section>
  );
};

export default Games;
