import "bulma/css/bulma.css";
import { useState, useEffect } from "react";

function Header() {
  const [modalActive, setModalActive] = useState(false);
  const showModalHandle = () => {
    setModalActive(true);
  };
  const hideModalHandle = () => {
    console.log("aa");
    setModalActive(false);
  };
  return (
    <div className="hero is-small is-primary" style={{ height: "10%" }}>
      <section className="section hero-body">
        <div className="container">
          <div className="columns">
            <div className="column">
              <h1 className="title is-size-3 has-text-centered">
                QiitaViz-legends
              </h1>
              <div>
                <button class="button" onClick={showModalHandle}>
                  このサイトについて
                </button>
              </div>
              <div class={modalActive ? "modal is-active" : "modal"}>
                <div class="modal-background" onClick={hideModalHandle}></div>
                <div class="modal-card">
                  <header class="modal-card-head">
                    <p class="modal-card-title">このサイトについて</p>
                  </header>
                  <section class="modal-card-body" style={{ color: "black" }}>
                    <p>このサイトでできること</p>
                    <p>Qiitaのタグを用いていることの説明を入れる</p>
                    <p>
                      プログラミング初学者の学習支援（とっかかり）
                      プログラミング初学者が学ぶべき順番がマップを見ることではっきりする
                      学びたいタグと他のタグとの関係性がわかる
                      学習内容とマッチするQiitaの記事に移行できる
                    </p>
                  </section>
                  <footer class="modal-card-foot">
                    <button
                      class="button"
                      onClick={hideModalHandle}
                      style={{ marginLeft: "auto" }}
                    >
                      閉じる
                    </button>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
