import "bulma/css/bulma.css";

function Header() {
  return (
    <div className="hero is-small is-primary" style={{ height: "10%" }}>
      <section className="section hero-body">
        <div className="container">
          <div className="columns">
            <div className="column">
              <h1 className="title is-size-3 has-text-centered">
                QiitaViz-legends
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
