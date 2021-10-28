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
  const [applicableFlag, setApplicableFlag] = useState(false);
  const handleChange = (e) => {
    setClusterCandidates([]);
    setPanelFlag(false);
    setApplicableFlag(false);
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
      console.log(clusterCandidates.length);
      setInputTag("");
      setPanelFlag(true);
    } else {
      setApplicableFlag(true);
    }
  };
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
        <a className="button is-success" onClick={() => handleClick(inputTag)}>
          <i className="fa fa-search"></i>検索
        </a>
      </div>
      {applicableFlag && ( //該当するクラスターがなかった場合
        <p class="help is-danger">該当なし</p>
      )}
      <a className={"dropdown is-active"}>
        <a className="dropdown-menu" id="dropdown-menu" role="menu">
          {clusterCandidates.map((data) => {
            return (
              <div className="dropdown-content">
                <a
                  className="dropdown-item"
                  onClick={() => clickClusterInfomation(data)}
                >
                  {data[0]}
                </a>
              </div>
            );
          })}
        </a>
      </a>
      {/*
      <nav className="panel">
        <p className="panel-heading ">検索結果</p>
        {clusterCandidates.map((data) => {
          return (
            <a
              className="panel-block is-active"
              onClick={() => clickClusterInfomation(data)}
              key={data}
            >
              {data[0]}
            </a>
          );
        })}
      </nav>
      */}
    </div>
  );
};

export default Search;
