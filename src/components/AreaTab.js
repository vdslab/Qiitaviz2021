import "bulma/css/bulma.css";
import { useState } from "react";
function AreaTab() {
  const [dropdownActive, setDropdownActive] = useState(false);
  return (
    <div className="column is-2">
      <div
        className={dropdownActive ? "dropdown is-active" : "dropdown"}
        onClick={() => {
          setDropdownActive(true);
        }}
      >
        <div
          className="dropdown-trigger"
          onBlur={() => {
            setDropdownActive(false);
          }}
        >
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

export default AreaTab;
