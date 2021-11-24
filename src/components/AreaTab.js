import "bulma/css/bulma.css";
import { cluster } from "d3-hierarchy";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  clusterDataUrlState,
  selectClusterState,
  selectSystemState,
} from "../atom";

function AreaTab() {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [selectCluster, setSelectCluster] = useRecoilState(selectClusterState);
  const [clusterDataUrl, setClusterDataUrl] =
    useRecoilState(clusterDataUrlState);
  const [selectSystem, setSelecteSystem] = useRecoilState(selectSystemState);

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
        onMouseLeave={() => setDropdownActive(false)}
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
                  process.env.PUBLIC_URL +
                    "/data/" +
                    selectSystem +
                    "/cluster1_graph_data.json",
                  "アプリケーション開発"
                )
              }
            >
              アプリケーション開発
            </a>
            <a
              className="dropdown-item"
              onClick={() =>
                setDataUrl(
                  process.env.PUBLIC_URL +
                    "/data/" +
                    selectSystem +
                    "/cluster2_graph_data.json",
                  "フロントエンド"
                )
              }
            >
              フロントエンド
            </a>
            <a
              className="dropdown-item"
              onClick={() =>
                setDataUrl(
                  process.env.PUBLIC_URL +
                    "/data/" +
                    selectSystem +
                    "/cluster3_graph_data.json",
                  "データサイエンス"
                )
              }
            >
              データサイエンス
            </a>
            <a
              className="dropdown-item"
              onClick={() =>
                setDataUrl(
                  process.env.PUBLIC_URL +
                    "/data/" +
                    selectSystem +
                    "/cluster4_graph_data.json",
                  "開発環境"
                )
              }
            >
              開発環境
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AreaTab;
