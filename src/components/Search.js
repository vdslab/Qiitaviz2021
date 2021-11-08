import "bulma/css/bulma.css";
import { cluster } from "d3-hierarchy";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  clusterDataUrlState,
  searchTagState,
  selectClusterState,
  tagListDataState,
} from "../atom";

const Search = () => {
  const [selectCluster, setSelectCluster] = useRecoilState(selectClusterState);
  const [tagListData, setTagListData] = useRecoilState(tagListDataState);
  const [clusterDataUrl, setClusterDataUrl] =
    useRecoilState(clusterDataUrlState);
  const [searchTag, setSearchTag] = useRecoilState(searchTagState);
  const [clusterCandidates, setClusterCandidates] = useState([]);
  const [panelFlag, setPanelFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState("　");
  const handleChange = (e) => {
    setClusterCandidates([]);
    setPanelFlag(false);
    setErrorMessage("　");
    setInputTag(e.target.value);
  };
  const clickClusterInfomation = (data) => {
    setPanelFlag(false);
    setClusterCandidates([]);
    setSelectCluster(data[0]);
    setClusterDataUrl(data[1]);
  };
  const handleClick = (inputTag) => {
    tagListData.map((data, i) => {
      if (data.includes(inputTag)) {
        clusterCandidates.push([
          "cluster" + (i + 1),
          process.env.PUBLIC_URL +
            "/data/cluster" +
            (i + 1) +
            "_graph_data.json",
        ]);
      }
    });
    setClusterDataUrl(clusterCandidates);
    setSearchTag(inputTag);
    if (clusterCandidates.length) {
      setInputTag("");
      setPanelFlag(true);
    } else {
      setErrorMessage("該当なし");
    }
  };
  console.log(errorMessage, errorMessage !== "");
  const [inputTag, setInputTag] = useState("");
  return (
    <div className="column is-4">
      <div className="field has-addons">
        <input
          className="input"
          type="text"
          name="search"
          placeholder="タグを検索"
          value={inputTag}
          onChange={(e) => handleChange(e)}
        />
        <a
          className="button is-success has-dropdown"
          list="search"
          onClick={() => handleClick(inputTag)}
        >
          <i className="fa fa-search"></i>検索
        </a>
      </div>
      <p
        className="help is-danger"
        style={{
          visibility: errorMessage === "　" ? "hidden" : "visible",
        }}
      >
        {errorMessage}
      </p>
      <div className={"dropdown is-active"}>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          {clusterCandidates.length >= 1 && (
            <div className="dropdown-content">
              {clusterCandidates.map((data) => {
                return (
                  <a
                    className="dropdown-item"
                    onClick={() => clickClusterInfomation(data)}
                  >
                    {data[0]}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
