import "bulma/css/bulma.css";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { clusterDataUrlState, selectClusterState } from "../atom";

function AreaTab() {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [selectCluster, setSelectCluster] = useRecoilState(selectClusterState);
  const [clusterDataUrl, setClusterDataUrl] =
    useRecoilState(clusterDataUrlState);

  const setDataUrl = (url, selectedCluster) => {
    setClusterDataUrl(url);
    setSelectCluster(selectedCluster);
  };
  return (
    <div className="column is-2">
      <div
        className={dropdownActive ? "dropdown is-active" : "dropdown"}
        onClick={() => {
          setDropdownActive(dropdownActive ^ true);
        }}
      >
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>{selectCluster}</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <a
              className="dropdown-item"
              onClick={() =>
                setDataUrl(
                  process.env.PUBLIC_URL + "/data/cluster1_graph_data.json",
                  "cluster1"
                )
              }
            >
              cluster1
            </a>
            <a
              className="dropdown-item"
              onClick={() =>
                setDataUrl(
                  process.env.PUBLIC_URL + "/data/cluster2_graph_data.json",
                  "cluster2"
                )
              }
            >
              cluster2
            </a>
            <a
              className="dropdown-item"
              onClick={() =>
                setDataUrl(
                  process.env.PUBLIC_URL + "/data/cluster3_graph_data.json",
                  "cluster3"
                )
              }
            >
              cluster3
            </a>
            <a
              className="dropdown-item"
              onClick={() =>
                setDataUrl(
                  process.env.PUBLIC_URL + "/data/cluster4_graph_data.json",
                  "cluster4"
                )
              }
            >
              cluster4
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AreaTab;
