import "bulma/css/bulma.css";
import { useState } from "react";

function Search({ tagListData, setClusterDataUrl, setSelectCluster }) {
  const handleChange = (e) => {
    setInputTag(e.target.value);
  };
  const handleClick = (inputTag) => {
    tagListData.map((data, i) => {
      if (data.includes(inputTag)) {
        setClusterDataUrl(
          process.env.PUBLIC_URL +
            "/data/cluster" +
            (i + 1) +
            "_graph_data.json"
        );
        setSelectCluster("cluster" + (i + 1));
      }
    });
    setInputTag("");
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
    </div>
  );
}

export default Search;
