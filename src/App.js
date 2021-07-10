import D3DirectedGraph from "./D3DirectedGraph";
import "bulma/css/bulma.css";
function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
function Main() {
  return (
    <section className="section has-background-white-bis">
      <div className="">
        <div className="columns is-centered">
          <AreaTab />
          <Search />
        </div>
        <D3DirectedGraph />
      </div>
    </section>
  );
}
function Header() {
  return (
    <div className="hero is-small is-primary">
      <section className="section hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third is-offset-one-third">
              <h1 className="title is-3 has-text-centered">
                2021QiitaViz-legends
              </h1>
            </div>
            <Navigation />
          </div>
        </div>
      </section>
    </div>
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
            <a href="#" className="dropdown-item">
              CS
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
function Navigation() {
  return (
    <div className="column">
      <div className={`dropdown is-hoverable`}>
        <div className="dropdown-trigger">
          <button
            className="button is-primary"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span className="has-text-weight-bold">メニュー</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <a href="#" className="dropdown-item">
              ホーム
            </a>
            <a href="#" className="dropdown-item">
              使い方
            </a>
            <a href="#" className="dropdown-item">
              このサイトでできること
            </a>
            <a href="#" className="dropdown-item">
              参考文献
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
function Footer() {
  return (
    <footer className="footer has-background-white-ter">
      <div className="content has-text-centered">
        <p>2021 QiitaViz</p>
      </div>
    </footer>
  );
}
export default App;
