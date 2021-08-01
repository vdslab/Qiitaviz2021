import "bulma/css/bulma.css";
import { useState } from "react";
import DisplayRecommendArticles from "./DisplayRecommendArticles";
import SubViewData from "./SubViewData";

const DisplaySubview = ({ displayArticle }) => {
  const [active, setActive] = useState("usage");
  return (
    <div
      className="column is-4-desktop is-6-mobile box"
      style={{
        marginLeft: "10px",
        paddingLeft: "40px",
        paddingRight: "40px",
        height: "84vh",
        overflowY: "scroll",
      }}
    >
      <div className="">
        <h2>おすすめ記事</h2>
      </div>
      <div className="content">
        <SubViewData displayArticle={displayArticle} />
      </div>
    </div>
  );
};

export default DisplaySubview;
