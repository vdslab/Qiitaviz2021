import "bulma/css/bulma.css";
import { displayArticleState, selectTagDataState } from "../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import SubViewData from "./SubViewData";
import DescriptionNode from "./DescriptionNode";

const DisplaySubview = () => {
  const [displayArticle, setDisplayArticle] =
    useRecoilState(displayArticleState);
  const [selectTagData, setSelectTagData] = useRecoilState(selectTagDataState);
  const { innerWidth: deviceWidth, innerHeight: deviceHeight } = window;
  console.log(displayArticle);
  return (
    <div>
      <div className="tile is-parent">
        <div
          className="tile is-child box"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <DescriptionNode />
        </div>
      </div>
      <div className="tile is-parent">
        <div
          className="tile is-child box"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            height: deviceWidth > 768 ? "42vh" : "22vh",
            // height: deviceWidth > 768 ? "84vh" : "84vh",
            overflowY: "scroll",
          }}
        >
          <div>
            {selectTagData.length ? (
              <h2 className="title has-text-grey-dark is-size-4">
                <a href={selectTagData[1]}>{selectTagData[0]}</a>
                のおすすめ記事
              </h2>
            ) : (
              <h2 className="title has-text-grey-dark is-size-4">
                おすすめ記事
              </h2>
            )}
            <div className="content">
              <SubViewData displayArticle={displayArticle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplaySubview;
