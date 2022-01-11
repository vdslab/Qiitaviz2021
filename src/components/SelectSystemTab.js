import "bulma/css/bulma.css";
import { cluster } from "d3";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  clusterDataUrlState,
  selectClusterFileState,
  selectClusterState,
  selectSystemState,
} from "../atom";

function SelectedSystemTab() {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [selectSystem, setSelectSystem] = useRecoilState(selectSystemState);
  const [clusterDataUrl, setClusterDataUrl] =
    useRecoilState(clusterDataUrlState);
  const [selectCluster, setSelectCluster] = useRecoilState(selectClusterState);
  const [selectClusterFile, setSelectClusterFile] = useRecoilState(
    selectClusterFileState
  );

  const setDataUrl = (selectedSystemNumber) => {
    setSelectSystem("手法" + selectedSystemNumber);
    setClusterDataUrl(
      process.env.PUBLIC_URL +
        "/data/system" +
        selectedSystemNumber +
        selectClusterFile
    );
  };
  const columnNum = selectCluster === "領域を選択" ? "3" : "2";
  return (
    <div className={"column is-" + columnNum}>
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
            <a className="dropdown-item" onClick={() => setDataUrl("1")}>
              手法1
            </a>
            <a className="dropdown-item" onClick={() => setDataUrl("2")}>
              手法2
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedSystemTab;
