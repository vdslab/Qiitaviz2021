import "bulma/css/bulma.css";
import { displayArticleState } from "../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import SubViewData from "./SubViewData";

const DisplaySubview = () => {
  const [displayArticle, setDisplayArticle] =
    useRecoilState(displayArticleState);
  const { innerWidth: deviceWidth, innerHeight: deviceHeight } = window;

  return (
    <div
      className="column is-3.5-desktop is-12-mobile box"
      // className="column is-3.5-desktop is-4-mobile box"
      style={{
        paddingLeft: "20px",
        paddingRight: "20px",
        height: deviceWidth > 768 ? "84vh" : "22vh",
        // height: deviceWidth > 768 ? "84vh" : "84vh",
        overflowY: "scroll",
      }}
    >
      <div className="pb-3 pt-3">
        <h2 className="title is-5 has-text-grey">おすすめ記事</h2>
      </div>
      <div className="content">
        <SubViewData displayArticle={displayArticle} />
      </div>
    </div>
  );
};

export default DisplaySubview;
