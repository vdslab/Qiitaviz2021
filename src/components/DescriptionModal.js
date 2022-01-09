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
                <h3><span>01</span>
                  領域選択　
                </h3>
                <p>
                  学びたい分野の領域を選択することができます。選択後、その領域のマップに遷移します。
                </p>
                <br/>
                <h3><span>02</span>
                  検索機能　
                </h3>
                <p>
                  Qiitaタグを検索することができます。検索すると、そのタグが含まれる領域のマップに遷移します。
                </p>
                <br/>
                <h3><span>03</span>
                  ノード　　
                </h3>
                <p>
                  ノードをクリックしたら、タグと関連性の高いQiitaの記事が表示されます。
                </p>
                <br/>
                <h3><span>04</span>
                  マップ部分
                </h3>
                <p>
                  マウスでマップの拡大縮小ができます。マウスでドラックするとマップ内を自由に移動できます。
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
