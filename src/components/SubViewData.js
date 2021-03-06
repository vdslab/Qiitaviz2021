import "bulma/css/bulma.css";
import { displayArticleState } from "../atom";
import DisplayRecommendArticles from "./DisplayRecommendArticles";
import { useRecoilState, useRecoilValue } from "recoil";

function SubViewData() {
  const [displayArticle, setDisplayArticle] =
    useRecoilState(displayArticleState);
  if (displayArticle.length) {
    return (
      <div>
        <div>
          {displayArticle.map((item, i) => {
            return item.url.map((url, j) => {
              return (
                <p key={j}>
                  <a href={url} target="_blank">
                    {item["title"][j]}
                  </a>
                  <br />
                  投稿日:{item["created_at"][j]}
                </p>
              );
            });
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <p
            style={{
              visibility: "hidden",
            }}
          >
            　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
          </p>
        </div>
      </div>
    );
  }
}
export default SubViewData;
