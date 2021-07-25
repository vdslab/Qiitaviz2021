import "bulma/css/bulma.css";
import { useState } from "react";
import DisplayRecommendArticles from "./DisplayRecommendArticles";
import SubViewData from "./SubViewData";

const DisplaySubview = ({ displayArticle }) => {
  const [active, setActive] = useState("usage");
  return (
    <div
      className="column is-4 box"
      style={{
        overflowY: "scroll",
        float: "left",
      }}
    >
      <div className="card">
        <div className="card-content">
          <div className="content">
            <footer className="card-footer">
              <a
                className="card-footer-item"
                onClick={() => setActive("usage")}
              >
                使い方
              </a>

              <a
                className="card-footer-item"
                onClick={() => setActive("reference")}
              >
                参考文献
              </a>
            </footer>
          </div>
          <div className="card-content">
            <div className="content">
              <SubViewData req={active} />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="content">
              <DisplayRecommendArticles displayArticle={displayArticle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplaySubview;
