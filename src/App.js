import D3DirectedGraph from "./D3DirectedGraph";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bulma/css/bulma.css";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Main />
      </div>
    </Router>
  );
}

function Main() {
  return (
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
  );
}

function AreaTab() {
  return (
    <div className="column is-one-fifth">
      <div className="dropdown is-hoverable">
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>領域を選択</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <a href="#" className="dropdown-item">
              Web
            </a>
            <a href="#" className="dropdown-item">
              IOS
            </a>
            <a href="#" className="dropdown-item">
              Android
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="column is-one-fifth">
      <div className="field has-addons" style={{ marginLeft: "0" }}>
        <div className="control">
          <input
            className="input"
            type="text"
            name="search"
            placeholder="タグを検索"
          />
        </div>
        <div className="control">
          <a className="button is-success">
            <i className="fa fa-search"></i>検索
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
