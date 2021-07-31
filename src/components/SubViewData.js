import "bulma/css/bulma.css";
import DisplayRecommendArticles from "./DisplayRecommendArticles";
function SubViewData({ req, displayArticle }) {
  if (req === "article") {
    return <DisplayRecommendArticles displayArticle={displayArticle} />;
  } else if (req === "usage") {
    return (
      <div>
        <div>
          <p>領域を選択できる機能</p>
          ユーザーが気になる領域を選択したら、その領域についてのマップが表示されます
          フロント バック iOS
          <p>タグの検索機能</p>
          タグを検索してそのタグが含まれる領域のマップに遷移します
          <p>ノードをマウスホバーしたら、Qiitaの記事に飛べる</p>
          ユーザーのレベルに合わせたタグの記事が表示されます
          <p>マップ部分</p>
          マウスでマップの拡大縮小ができる
          マウスでドラックするとマップを自由に移動できる
        </div>
      </div>
    );
  } else if (req === "reference") {
    return (
      <div>
        <div>参考文献だよ！</div>
      </div>
    );
  }
}
export default SubViewData;
