import React from "react";
import GameCard from "../../components/GameCard";

const gamesList = [
  {
    title: "ConnectFour",
    img: "https://upload.wikimedia.org/wikipedia/en/a/a4/Connect_four_game.svg",
  },
  {
    title: "TicTacToe",
    img: "https://upload.wikimedia.org/wikipedia/en/a/a4/Connect_four_game.svg",
  },
  {
    title: "War",
    img: "https://upload.wikimedia.org/wikipedia/en/a/a4/Connect_four_game.svg",
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
