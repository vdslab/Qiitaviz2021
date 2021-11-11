import "bulma/css/bulma.css";
import { displayArticleState, selectTagDataState } from "../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import SubViewData from "./SubViewData";

const DisplaySubview = () => {
  const [displayArticle, setDisplayArticle] =
    useRecoilState(displayArticleState);
  const [selectTagData, setSelectTagData] = useRecoilState(selectTagDataState);
  const { innerWidth: deviceWidth, innerHeight: deviceHeight } = window;
  console.log;
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
        {selectTagData.length ? (
          <h2 className="title is-5 has-text-grey">
            <a href={selectTagData[1]}>{selectTagData[0]}</a>
            のおすすめ記事
          </h2>
        ) : (
          <h2 className="title is-5 has-text-grey">おすすめ記事</h2>
        )}
      </div>
      <div className="content">
        <SubViewData displayArticle={displayArticle} />
      </div>
    </div>
  );
};

export default DisplaySubview;
