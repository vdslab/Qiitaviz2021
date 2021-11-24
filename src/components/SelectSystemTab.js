import "bulma/css/bulma.css";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  clusterDataUrlState,
  selectClusterFileState,
  selectSystemState,
} from "../atom";

function SelectedSystemTab() {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [selectSystem, setSelectSystem] = useRecoilState(selectSystemState);
  const [clusterDataUrl, setClusterDataUrl] =
    useRecoilState(clusterDataUrlState);
  const [selectClusterFile, setSelectClusterFile] = useRecoilState(
    selectClusterFileState
  );

  const setDataUrl = (selectedSystem) => {
    setSelectSystem(selectedSystem);
    setClusterDataUrl(
      process.env.PUBLIC_URL + "/data/" + selectedSystem + selectClusterFile
    );
  };
  return (
    <div className="column is-2">
      <div
        className={dropdownActive ? "dropdown is-active" : "dropdown"}
        onClick={() => {
          setDropdownActive(dropdownActive ^ true);
        }}
        onMouseLeave={() => setDropdownActive(false)}
      >
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>{selectSystem}</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <a className="dropdown-item" onClick={() => setDataUrl("system1")}>
              システム1
            </a>
            <a className="dropdown-item" onClick={() => setDataUrl("system2")}>
              システム2
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedSystemTab;
