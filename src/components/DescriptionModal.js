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
          <section className="modal-card-body has-text-grey-dark">
            <div>
              <div>
                <h2 className="title has-text-grey-dark is-size-4 mt-2 mb-2">
                  ①領域選択
                </h2>
                <p>
                  学びたい分野の領域が選択でき、その領域についてのマップに遷移します
                </p>
                <h2 className="title has-text-grey-dark is-size-4 mt-2 mb-2">
                  ②検索機能
                </h2>
                <p>
                  Qiitaタグを検索し、そのタグが含まれる領域のマップに遷移します
                </p>
                <h2 className="title has-text-grey-dark is-size-4 mt-2 mb-2">
                  ③ノード
                </h2>
                <p>
                  ノードをクリックしたら、タグと関連性の高いQiitaの記事が表示されます
                </p>
                <h2 className="title has-text-grey-dark is-size-4 mt-2 mb-2">
                  ④マップ部分{" "}
                </h2>
                <p>
                  マウスでマップの拡大縮小ができます
                  マウスでドラックするとマップ内を自由に移動できます
                </p>
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
