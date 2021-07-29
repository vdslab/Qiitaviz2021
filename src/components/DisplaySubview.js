import "bulma/css/bulma.css";
import { useState } from "react";
import DisplayRecommendArticles from "./DisplayRecommendArticles";
import SubViewData from "./SubViewData";

const DisplaySubview = ({ displayArticle }) => {
  const [active, setActive] = useState("usage");
  return (
    <div
      className="column is-4 box"
      style={{ paddingLeft: "40px", paddingRight: "40px" }}
    >
      <div className="tabs">
        <ul>
          <li className={active === "article" ? "is-active" : ""}>
            <a
              onClick={() => {
                setActive("article");
              }}
            >
              おすすめ記事
            </a>
          </li>
          <li className={active === "usage" ? "is-active" : ""}>
            <a
              onClick={() => {
                setActive("usage");
              }}
            >
              使い方
            </a>
          </li>
          <li className={active === "reference" ? "is-active" : ""}>
            <a
              onClick={() => {
                setActive("reference");
              }}
            >
              参考文献
            </a>
          </li>
        </ul>
      </div>
      <div className="content">
        <SubViewData req={active} displayArticle={displayArticle} />
      </div>
    </div>
  );
};

export default DisplaySubview;
