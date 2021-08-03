import { useState } from "react";
function DescriptionModal() {
  const [modalActive, setModalActive] = useState(false);
  const showModalHandle = () => {
    setModalActive(true);
  };
  const hideModalHandle = () => {
    setModalActive(false);
  };
  return (
    <div style={{ position: "absolute", top: "0", right: "0" }}>
      <div>
        <div
          className="button is-primary is-inverted"
          onClick={showModalHandle}
        >
          <i
            className="far  fa-question-circle"
            style={{ color: "#bfbfbf" }}
          ></i>
        </div>
      </div>
      <div className={modalActive ? "modal is-active" : "modal"}>
        <div className="modal-background" onClick={hideModalHandle}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">マップの使い方</p>
          </header>
          <section className="modal-card-body" style={{ color: "black" }}>
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
          </section>
          <footer className="modal-card-foot">
            <button
              className="button"
              onClick={hideModalHandle}
              style={{ marginLeft: "auto" }}
            >
              閉じる
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
export default DescriptionModal;
