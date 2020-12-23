import React from "react";
import { useGamesContext } from "../context/GamesContextProvider";

const Navbar = () => {
  const { redirectToHome } = useGamesContext();

  return (
    <nav className="navbar">
      <div className="navbar__center">
        <button onClick={redirectToHome}>GamesCenter</button>
      </div>
    </nav>
  );
};

export default Navbar;
