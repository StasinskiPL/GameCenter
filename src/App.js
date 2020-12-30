import React from "react";
import { Route, Switch } from "react-router-dom";
import useUserNick from "./hooks/useUserNick";
import Navbar from "./components/Navbar";
import Games from "./components/Games/Games";
import SetNick from "./Ui/Modals/SetNick";

const Lobby = React.lazy(() => import("./containers/Lobby/Lobby"));
const TicTacToe = React.lazy(() => import("./components/Games/TicTacToe/TicTacToe"));
const ConnectFour = React.lazy(() => import("./components/Games/ConnectFour/ConnectFour"));
const Checkers = React.lazy(() => import("./components/Games/Checkers/Checkers"));

function App() {
  const [nick] = useUserNick();

  if (!nick) {
    return (
      <main>
        <SetNick />
        <Navbar />
        <Games />
      </main>
    );
  }
  return (
    <main>
      <SetNick />
      <Navbar />
      <React.Suspense fallback={<span>Loading...</span>}>
      <Switch>
        <Route path="/" exact component={Games} />
        <Route path="/TicTacToe" render={(props) => <TicTacToe {...props} />} />
        <Route path="/ConnectFour" render={(props) => <ConnectFour {...props} />} />
        <Route path="/Checkers" render={(props) => <Checkers {...props} />} />
        <Route path="/lobby/:game" render={(props) => <Lobby {...props} />} />
      </Switch>
      </React.Suspense>
    </main>
  );
}

export default App;
