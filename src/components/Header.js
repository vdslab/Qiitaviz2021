import "bulma/css/bulma.css";
import Navigation from "./Navigation";

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

export default Header;
