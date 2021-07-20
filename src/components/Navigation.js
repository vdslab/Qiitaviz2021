import "bulma/css/bulma.css";
import { Link } from "react-router-dom";

const Navigation = () => {
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
            <Link className="dropdown-item" to="/">
              ホーム
            </Link>
            <Link className="dropdown-item" to="/usage">
              使い方
            </Link>
            <Link className="dropdown-item" to="/description">
              このサイトでできること
            </Link>
            <Link className="dropdown-item" to="/references">
              参考文献
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
