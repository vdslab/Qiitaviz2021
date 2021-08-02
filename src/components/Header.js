import "bulma/css/bulma.css";
import { useState, useEffect } from "react";
function Header() {
  const [modalActive, setModalActive] = useState(false);
  const { innerHeight: deviceHeight } = window;
  const showModalHandle = () => {
    setModalActive(true);
  };
  const hideModalHandle = () => {
    setModalActive(false);
  };
  return (
    <div
      className="hero is-small is-primary"
      style={{ height: deviceHeight * 0.1 }}
    >
      <section className="section hero-body">
        <div className="container">
          <div className="columns is-mobile is-centered ">
            <div className="column is-5">
              <h1 className="title is-size-3-desktop is-size-5-mobile has-text-centered">
                QiitaViz-legends
              </h1>
            </div>
            <div className="column is-narrow">
              <a className="button is-small" onClick={showModalHandle}>
                このサイトについて
              </a>
            </div>
          </div>
          <div className={modalActive ? "modal is-active" : "modal"}>
            <div className="modal-background" onClick={hideModalHandle}></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">このサイトについて</p>
              </header>
              <section className="modal-card-body" style={{ color: "black" }}>
                <h2 className="title is-4" style={{ color: "black" }}>
                  このサイトでできること
                </h2>
                <p>Qiitaのタグを用いていることの説明を入れる</p>
                <p>
                  プログラミング初学者の学習支援（とっかかり）
                  プログラミング初学者が学ぶべき順番がマップを見ることではっきりする
                  学びたいタグと他のタグとの関係性がわかる
                  学習内容とマッチするQiitaの記事に移行できる
                </p>
                <h2 className="title is-4" style={{ color: "black" }}>
                  参考文献
                </h2>
                <p>
                  大川英樹,関亜紀子,技術解説記事の難易度分類による検索支援,
                  日本大学生産工学部学術講演会講演概要(CD-ROM),2018,51st
                  ,ROMBUNNO.P-13.(online),
                  <a href="http://www.cit.nihon-u.ac.jp/laboratorydata/kenkyu/kouennkai/reference/No.51/pdf/P-13.pdf">
                    http://www.cit.nihon-u.ac.jp/laboratorydata/kenkyu/kouennkai/reference/No.51/pdf/P-13.pdf
                  </a>
                </p>

                <p>
                  山河絵利奈,田島敬史,ウィキペディアを利用した単語の難易度推定,DEIMフォーラム2021,2021,F25-2.(online),
                  <a href="https://proceedings-of-deim.github.io/DEIM2021/papers/F25-2.pdf">
                    https://proceedings-of-deim.github.io/DEIM2021/papers/F25-2.pdf
                  </a>
                </p>
                <p>
                  西原 陽子,砂山 渡,谷内田 正彦,Web
                  ページの難易度と学習順序に基づく情報理解支援システム,掲載誌
                  電子情報通信学会論文誌. D, 情報・システム = The IEICE
                  transactions on information and systems /
                  電子情報通信学会,2006, 編 89(9) (通号
                  417),p.1963-1975.(online),
                  <a href="https://www.panda.sys.t.u-tokyo.ac.jp/nishihara/pdf/singaku06.pdf">
                    https://www.panda.sys.t.u-tokyo.ac.jp/nishihara/pdf/singaku06.pdf
                  </a>
                </p>
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
      </section>
    </div>
  );
}

export default Header;
