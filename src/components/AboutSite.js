import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";
import "./style.css";

const About = () => {
  return (
    <div class="container is-max-desktop">
      <div align="left">
        <br />
        <p>
          <Link to="/">QiitaViz-legends</Link> ▶︎ このサイトについて
        </p>
        <section className="modal-card-body has-text-grey-dark">
          <h1>このサイトについて</h1>
          <br />
          <br />
          <h2 className="title has-text-grey-dark is-size-4 mt-2 mb-2">
            Qiitaのタグの繋がりを可視化したサービスです
          </h2>
          <p>
            本サービスは、Qiita特有の『タグ』に注目して、タグごとの人気度やタグ同士の関係性を算出しマップを作成しています。
            タグに着目することで、プログラミング初学者が学びたい分野と他分野の関係性がわかり、効率よく学べる支援になると思います。
            また、学習内容とマッチするQiita記事にも遷移できるのも本サービスの特徴です
          </p>
          <br />
          <br />
          <h2 className="title has-text-grey-dark is-size-4 mt-2 mb-2">
            サービス構築に用いた参考文献
          </h2>
          <div class="content is-normal">
            <ul>
              <li>
                <span>
                  大川英樹,関亜紀子,技術解説記事の難易度分類による検索支援
                </span>
              </li>
              <p>
                日本大学生産工学部学術講演会講演概要(CD-ROM),2018,51st,p-13.(online),
                <br />
                <a href="http://www.cit.nihon-u.ac.jp/laboratorydata/kenkyu/kouennkai/reference/No.51/pdf/P-13.pdf">
                  http://www.cit.nihon-u.ac.jp/laboratorydata/kenkyu/kouennkai/reference/No.51/pdf/P-13.pdf
                </a>
              </p>
              <li>
                <span>
                  山河絵利奈,田島 敬史,ウィキペディアを利用した単語の難易度推定
                </span>
              </li>
              <p>
                DEIMフォーラム2021,2021,F25-2.(online),
                <br />
                <a href="https://proceedings-of-deim.github.io/DEIM2021/papers/F25-2.pdf">
                  https://proceedings-of-deim.github.io/DEIM2021/papers/F25-2.pdf
                </a>
              </p>
              <li>
                <span>
                  西原 陽子,砂山 渡,谷内田
                  正彦,Webページの難易度と学習順序に基づく情報理解支援システム
                </span>
              </li>
              <p>
                電子情報通信学会論文誌. D,情報・システム/
                電子情報通信学会,2006,編89(9) (通号 417),p.1963-1975.(online),
                <br />
                <a href="https://www.panda.sys.t.u-tokyo.ac.jp/nishihara/pdf/singaku06.pdf">
                  https://www.panda.sys.t.u-tokyo.ac.jp/nishihara/pdf/singaku06.pdf
                </a>
              </p>
            </ul>
          </div>
          <br />
        </section>
      </div>
    </div>
  );
};
export default About;
