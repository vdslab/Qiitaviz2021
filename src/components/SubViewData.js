import "bulma/css/bulma.css";

function SubViewData({ req }) {
  if (req === "usage") {
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
          <p>このサイトでできること</p>
          <p>Qiitaのタグを用いていることの説明を入れる</p>
          プログラミング初学者の学習支援（とっかかり）
          プログラミング初学者が学ぶべき順番がマップを見ることではっきりする
          学びたいタグと他のタグとの関係性がわかる
          学習内容とマッチするQiitaの記事に移行できる
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
  /*
  else {
    return <ShowRecommendArticles displayArticle={displayArticle} />;
  }
  */
}
export default SubViewData;
