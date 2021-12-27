import "bulma/css/bulma.css";
import { useState, useEffect } from "react";
function Header({ setClusterDataUrl }) {
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
        </div>

        <div className={modalActive ? "modal is-active" : "modal"}>
          <div className="modal-background" onClick={hideModalHandle}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">このサイトについて</p>
            </header>
            <section className="modal-card-body has-text-grey-dark">
              <h2 className="title has-text-grey-dark is-size-4 mt-2 mb-2">
                Qiitaのタグの繋がりを可視化したサービスです
              </h2>
              <p>
                本サービスは、Qiita特有の『タグ』に注目して、タグごとの人気度やタグ同士の関係性を算出しマップを作成しています。
                タグに着目することで、プログラミング初学者が学びたい分野と他分野の関係性がわかり、効率よく学べる支援になると思います。
                また、学習内容とマッチするQiita記事にも遷移できるのも本サービスの特徴です
              </p>
              <h2 className="title has-text-grey-dark is-size-4 mt-2 mb-2">
                ノードの色について
              </h2>
              <p>ノードの色は、難易度を表していて以下の通りです。</p>
              <svg width={"500"} height={"100"}>
                <g>
                  <circle
                    className="node"
                    r={30}
                    fill="rgb(255, 240, 130)"
                    cx={40}
                    cy={50}
                    stroke="rgb(80,80,80)"
                    strokeWidth="1"
                  ></circle>
                  <circle
                    className="node"
                    r={30}
                    fill="rgb(255, 215, 0)"
                    cx={105}
                    cy={50}
                    stroke="rgb(80,80,80)"
                    strokeWidth="1"
                  ></circle>
                  <circle
                    className="node"
                    r={30}
                    fill="rgb(255, 165, 0)"
                    cx={170}
                    cy={50}
                    stroke="rgb(80,80,80)"
                    strokeWidth="1"
                  ></circle>
                  <circle
                    className="node"
                    r={30}
                    fill="rgb(255, 106, 0)"
                    cx={235}
                    cy={50}
                    stroke="rgb(80,80,80)"
                    strokeWidth="1"
                  ></circle>
                  <circle
                    className="node"
                    r={30}
                    fill="rgb(240, 60, 25)"
                    cx={300}
                    cy={50}
                    stroke="rgb(80,80,80)"
                    strokeWidth="1"
                  ></circle>
                  <text
                    textAnchor="middle"
                    fill="black"
                    fontSize={"13px"}
                    x={40}
                    y={15}
                  >
                    低い
                  </text>
                  <text
                    textAnchor="middle"
                    fill="black"
                    fontSize={"13px"}
                    x={300}
                    y={15}
                  >
                    高い
                  </text>
                </g>
              </svg>
              <h2 className="title has-text-grey-dark is-size-4 mt-2 mb-2">
                サービス構築に用いた参考文献
              </h2>
              <h3 className="subtitle has-text-grey-dark is-size-5 mt-2 mb-2">
                大川英樹,関亜紀子,技術解説記事の難易度分類による検索支援
              </h3>
              <p>
                日本大学生産工学部学術講演会講演概要(CD-ROM),2018,51st,p-13.(online),
                <br />
                http://www.cit.nihon-u.ac.jp/laboratorydata/kenkyu/kouennkai/reference/No.51/pdf/P-13.pdf
              </p>
              <h3 className="subtitle has-text-grey-dark is-size-5 mt-2 mb-2">
                山河絵利奈,田島 敬史,ウィキペディアを利用した単語の難易度推定
              </h3>
              <p>
                DEIMフォーラム2021,2021,F25-2.(online),
                <br />
                https://proceedings-of-deim.github.io/DEIM2021/papers/F25-2.pdf
              </p>
              <h3 className="subtitle has-text-grey-dark is-size-5 mt-2 mb-2">
                西原 陽子,砂山 渡,谷内田 正彦,Web
                ページの難易度と学習順序に基づく情報理解支援システム
              </h3>
              <p>
                電子情報通信学会論文誌. D,情報・システム/
                電子情報通信学会,2006,編89(9) (通号 417),p.1963-1975.(online),
                <br />
                https://www.panda.sys.t.u-tokyo.ac.jp/nishihara/pdf/singaku06.pdf
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
      </section>
    </div>
  );
}

export default Header;
