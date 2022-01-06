import "bulma/css/bulma.css";
import { useState, useEffect } from "react";
function Header({ setClusterDataUrl }) {
  const [modalActive, setModalActive] = useState(false);
  const { innerHeight: deviceHeight } = window;
  const showModalHandle = () => {
    setModalActive(true);
  };
  const hideModalHandle = () => {
    setModalActive(false);
  };
  return (
    <div
      className="hero is-small is-primary"
      style={{ height: deviceHeight * 0.1 }}
    >
      <section className="section hero-body">
        <div className="container">
          <div className="columns is-mobile is-centered ">
            <div className="column is-5">
              <div className="title is-size-3-desktop is-size-5-mobile has-text-centered">
                QiitaViz-legends
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
