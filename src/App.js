import {Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
import Games from "./containers/Games/Games";
import Lobby from "./containers/Lobby/Lobby";

function App() {
  return (
    <main>
      <Navbar />
      <Switch>
      <Route path="/" exact component={Games}/>
      <Route path="/lobby/:game" component={Lobby}/>
      </Switch>
    </main>
  );
}

export default App;
