import {Route, Switch} from "react-router-dom";
import useUserNick from "./hooks/useUserNick"
import Navbar from "./components/Navbar";
import Games from "./containers/Games/Games";
import Lobby from "./containers/Lobby/Lobby";
import SetNick from "./Ui/Modals/SetNick";


function App() {
  const [nick] = useUserNick();


  if(!nick){
return (
  <main>
      <SetNick/>
      <Navbar />
      <Games/>
    </main>
)
  }
  return (
    <main>
      <SetNick/>
      <Navbar />
      <Switch>
      <Route path="/" exact component={Games}/>
      <Route path="/lobby/:game" component={Lobby}/>
      </Switch>
    </main>
  );
}

export default App;
