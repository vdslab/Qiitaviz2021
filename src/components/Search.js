import "bulma/css/bulma.css";
import { cluster } from "d3-hierarchy";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  clusterDataUrlState,
  errorMessageState,
  searchTagState,
  selectClusterState,
  selectTagDataState,
  tagListDataState,
} from "../atom";

const Search = () => {
  const [selectCluster, setSelectCluster] = useRecoilState(selectClusterState);
  const [tagListData, setTagListData] = useRecoilState(tagListDataState);
  const [clusterDataUrl, setClusterDataUrl] =
    useRecoilState(clusterDataUrlState);
  const [selectTagData, setSelectTagData] = useRecoilState(selectTagDataState);
  const [searchTag, setSearchTag] = useRecoilState(searchTagState);
  const [clusterCandidates, setClusterCandidates] = useState([]);
  const [panelFlag, setPanelFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
  const [inputTag, setInputTag] = useState("");

  const handleChange = (e) => {
    setClusterCandidates([]);
    setPanelFlag(false);
    setErrorMessage("　");
    setInputTag(e.target.value);
  };

  const clickClusterInfomation = (data) => {
    const tagUrl =
      inputTag[0] === "#"
        ? "https://qiita.com/tags/%23" + inputTag.substr(1).toLowerCase()
        : "https://qiita.com/tags/" + inputTag.toLowerCase();
    setPanelFlag(false);
    setClusterCandidates([]);
    setSelectCluster(data[0]);
    setClusterDataUrl(data[1]);
    setSelectTagData([inputTag, tagUrl]);
    setSearchTag(inputTag);
  };
  const areaName = [
    "アプリケーション開発",
    "フロントエンド",
    "データサイエンス",
    "開発環境",
  ];
  const handleClick = (inputTag) => {
    const newClusterCandidates = [];
    tagListData.map((data, i) => {
      if (data.includes(inputTag) && Object.isExtensible(clusterCandidates)) {
        newClusterCandidates.push([
          areaName[i],
          process.env.PUBLIC_URL +
            "/data/cluster" +
            "/cluster" +
            (i + 1) +
            "_graph_data.json",
        ]);
      }
    });
    setClusterCandidates(newClusterCandidates);
    if (newClusterCandidates.length) {
      setPanelFlag(true);
    } else {
      setErrorMessage("該当なし");
    }
  };
  return (
    <div className="column is-5">
      <div className="field is-grouped">
        <p className="control is-expanded">
          <input
            className="input"
            type="text"
            name="search"
            placeholder="タグを検索"
            value={inputTag}
            onChange={(e) => handleChange(e)}
          />
        </p>
        <p className="control">
          <a
            className="button is-success"
            list="search"
            onClick={() => handleClick(inputTag)}
          >
            <i className="fa fa-search"></i>検索
          </a>
        </p>
      </div>
      <div className="dropdown is-active">
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          {clusterCandidates.length >= 1 && (
            <div className="dropdown-content">
              <div className="dropdown-item">
                "{inputTag}"は{clusterCandidates.length}つの領域に含まれています
              </div>
              {clusterCandidates.map((data) => {
                return (
                  <a
                    className="dropdown-item"
                    onClick={() => clickClusterInfomation(data)}
                    key={data[0]}
                  >
                    {data[0]}
                  </a>
                );
              })}
            </div>
          )}
          <p
            className="help is-danger"
            style={{
              visibility: errorMessage === "　" ? "hidden" : "visible",
            }}
          >
            {errorMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Search;
