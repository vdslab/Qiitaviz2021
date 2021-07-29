import "bulma/css/bulma.css";
import AreaTab from "./AreaTab";
import Search from "./Search";
function Header() {
  return (
    <div className="hero is-small is-primary" style={{ height: "10vh" }}>
      <section className="section hero-body">
        <div className="container">
          <div className="columns is-mobile">
            <div className="column is-3-mobile">
              <h1 className="title is-size-3-desktop is-size-7-mobile has-text-centered">
                QiitaViz-legends
              </h1>
            </div>
            <AreaTab />
            <Search />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
