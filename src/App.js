import D3DirectedGraph from "./D3DirectedGraph";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bulma/css/bulma.css";
import Header from "./components/Header";
import AreaTab from "./components/AreaTab";
import Search from "./components/Search";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <section>
          <Switch>
            <Route path="/" exact>
              <div className="section has-background-white-bis">
                <div className="columns is-centered">
                  <AreaTab />
                  <Search />
                </div>
              </div>
              <D3DirectedGraph />
            </Route>
            <Route path="/usage">
              <div>使い方だよ！</div>
            </Route>
            <Route path="/description">
              <div>このサイトでできることだよ！</div>
            </Route>
            <Route path="/references">
              <div>参考文献だよ！</div>
            </Route>
          </Switch>
        </section>
      </div>
    </Router>
  );
};

export default App;
