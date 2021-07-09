import * as d3 from "d3";
import "bulma/css/bulma.css";
import { useState, useEffect } from "react";
function D3DirectedGraph() {
  // 仮の記事データ
  const articleData = [
    {
      type: "JavaScript",
      title: "【JavaScript】JavaScriptにおけるクロージャーとは",
      url: "https://qiita.com/sho_U/items/1d58d5fb7cb11030f24b",
    },
    {
      type: "JavaScript",
      title: "【JavaScript】javascriptの基本",
      url: "https://qiita.com/smkhkc/items/5e3729cffab6591f34c6",
    },
    {
      type: "JavaScript",
      title: "【JavaScript】JavaScriptの 「this」とは 1",
      url: "https://qiita.com/sho_U/items/edb7c897a2bab0f86345",
    },
    {
      type: "JavaScript",
      title: "【JavaScript】JavaScriptにおける変数の参照について",
      url: "https://qiita.com/sho_U/items/3d64d23fe31ed09e9dcb",
    },
    {
      type: "iOS",
      title: "iOS概論",
      url: "https://qiita.com/zousaaan3/items/16de2103aa4efb07e6fd",
    },
    {
      type: "iOS",
      title: "iOS概論",
      url: "https://qiita.com/zousaaan3/items/16de2103aa4efb07e6fd",
    },
    {
      type: "iOS",
      title: "iOS概論",
      url: "https://qiita.com/zousaaan3/items/16de2103aa4efb07e6fd",
    },
    {
      type: "iOS",
      title: "iOS概論",
      url: "https://qiita.com/zousaaan3/items/16de2103aa4efb07e6fd",
    },
    {
      type: "Docker",
      title: "【Docker】Dockerとは",
      url: "https://qiita.com/y-hira18/items/b259f5a2a870478a5453",
    },
    {
      type: "Docker",
      title: "【Docker】Dockerとは",
      url: "https://qiita.com/y-hira18/items/b259f5a2a870478a5453",
    },
    {
      type: "Docker",
      title: "【Docker】Dockerとは",
      url: "https://qiita.com/y-hira18/items/b259f5a2a870478a5453",
    },
    {
      type: "Docker",
      title: "【Docker】Dockerとは",
      url: "https://qiita.com/y-hira18/items/b259f5a2a870478a5453",
    },
    {
      type: "CSS",
      title: "CSS　～CSSとは何か～",
      url: "https://qiita.com/stroke/items/19123fc34db3e3483c01",
    },
    {
      type: "CSS",
      title: "CSS　～CSSとは何か～",
      url: "https://qiita.com/stroke/items/19123fc34db3e3483c01",
    },
    {
      type: "CSS",
      title: "CSS　～CSSとは何か～",
      url: "https://qiita.com/stroke/items/19123fc34db3e3483c01",
    },
    {
      type: "CSS",
      title: "CSS　～CSSとは何か～",
      url: "https://qiita.com/stroke/items/19123fc34db3e3483c01",
    },
    {
      type: "PHP",
      title: "PHPでデータベースに接続するときのまとめ",
      url: "https://qiita.com/mpyw/items/b00b72c5c95aac573b71",
    },
    {
      type: "PHP",
      title: "PHPでデータベースに接続するときのまとめ",
      url: "https://qiita.com/mpyw/items/b00b72c5c95aac573b71",
    },
    {
      type: "PHP",
      title: "PHPでデータベースに接続するときのまとめ",
      url: "https://qiita.com/mpyw/items/b00b72c5c95aac573b71",
    },
    {
      type: "PHP",
      title: "PHPでデータベースに接続するときのまとめ",
      url: "https://qiita.com/mpyw/items/b00b72c5c95aac573b71",
    },
    {
      type: "AWS",
      title: "javascriptからAWS S3へのアップロード",
      url: "https://qiita.com/taaachezi/items/ed331ba66ed4fc0f838b",
    },
    {
      type: "AWS",
      title: "javascriptからAWS S3へのアップロード",
      url: "https://qiita.com/taaachezi/items/ed331ba66ed4fc0f838b",
    },
    {
      type: "AWS",
      title: "javascriptからAWS S3へのアップロード",
      url: "https://qiita.com/taaachezi/items/ed331ba66ed4fc0f838b",
    },
    {
      type: "AWS",
      title: "javascriptからAWS S3へのアップロード",
      url: "https://qiita.com/taaachezi/items/ed331ba66ed4fc0f838b",
    },
    {
      type: "Vue.js",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "Vue.js",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "Vue.js",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "Vue.js",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "Node.js",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "Node.js",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "Node.js",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "Node.js",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "HTML",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "HTML",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "HTML",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "HTML",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "Rails",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "Rails",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "Rails",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "Rails",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "React",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "React",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "React",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "React",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "Ruby",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "Ruby",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "Ruby",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
    {
      type: "Ruby",
      title: "サンプルテキスト",
      url: "サンプルテキスト",
    },
  ];
  const MOBILE_BORDER_SIZE = 599;

  const [loading, setLoading] = useState(true);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  // おすすめ記事
  const [displayArticle, setDisplayArticle] = useState([]);
  const [mousePosition, setMousePosition] = useState([]);

  // デバイスの横、縦幅を取得
  const { innerWidth: deviceWidth, innerHeight: deviceHeight } = window;
  // const svgWidth = 800;
  const svgWidth =
    deviceWidth <= MOBILE_BORDER_SIZE ? deviceWidth * 0.9 : deviceWidth * 0.8;
  const svgHeight = deviceWidth <= MOBILE_BORDER_SIZE ? 1500 : 1100;
  const nodeClickHandle = (e) => {
    window.open(
      e.currentTarget.dataset.url,
      "sampleWin",
      "width=800,height=800,scrollbars=no,status=no,toolbar=no,location=no,menubar=no,resizable=yes"
    );
  };
  function overHandle(e) {
    const target = e.currentTarget.dataset.name;
    const data = articleData.filter((item) => {
      return item.type == target;
    });
    setDisplayArticle(data);
    setMousePosition([e.pageX, e.pageY]);
  }
  function outHandle(e) {
    setDisplayArticle([]);
  }
  useEffect(() => {
    const startSimulation = (nodes, links) => {
      const linkLen = deviceWidth <= MOBILE_BORDER_SIZE ? 150 : 150;
      const simulation = d3
        .forceSimulation()
        .force(
          "collide",
          d3
            .forceCollide()
            .radius(function (d) {
              return d.r;
            })
            .iterations(16)
        ) //衝突値の設定
        .force(
          "link",
          d3
            .forceLink()
            .distance((d) => linkLen)
            .id((d) => d.id)
        ) //stength:linkの強さ（元に戻る力 distance: linkの長さ
        .force("charge", d3.forceManyBody().strength(-500)) //引き合う力を設定。
        .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2)) //描画するときの中心を設定
        .force(
          "x",
          d3
            .forceX()
            .x(svgWidth / 2)
            .strength(0.1)
        ); //x方向に戻る力
      // .force(
      //   "r",
      //   d3
      //     .forceRadial()
      //     .radius(svgHeight * 0.35)
      //     .x(svgWidth / 2)
      //     .y(svgHeight / 2)
      //     .strength(0.5)
      // );
      // .force(
      //   "y",
      //   d3
      //     .forceY()
      //     .y(svgHeight / 2)
      //     .strength(0.2)
      // ); //y方向に戻る力
      simulation
        // forceSimulationの影響下に  desを置く
        .nodes(nodes)
        // 時間経過で動かす
        .on("tick", ticked);
      // linkデータをセット
      simulation.force("link").links(links);

      function ticked() {
        setNodes(nodes.slice());
        setLinks(links.slice());
      }
    };

    const startLineChart = async () => {
      const [nodes, links] = await (async () => {
        const response = await fetch("ordered_data.json");
        const data = await response.json();
        const nodes = Array();
        const links = Array();
        const r = deviceWidth <= MOBILE_BORDER_SIZE ? 35 : 35;

        for (const item of data) {
          nodes.push({
            id: item.ID, //nodeのindexを標準設定から変更
            label: item.nodeName,
            url: item.url,
            r,
          });

          for (const child of item.childNode) {
            links.push({
              source: item.ID,
              target: child,
            });
          }
        }
        return [nodes, links];
      })();

      startSimulation(nodes, links);
      setLoading(false);
    };
    startLineChart();
    // １度だけuseEffect()を実行する
  }, []);

  const arrowEdgeX = -35;
  const arrowEdgeY = -5;
  const arrowHeight = 10;
  const arrowWidth = 14;
  const arrowEdgeEnd = -25;

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="">
      <svg
        className="has-background-white"
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          // padding: "0",
        }}
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      >
        <defs>
          <marker
            id="arrowhead"
            // viewBox="-35 -5 10 10"
            viewBox={`${arrowEdgeX} ${arrowEdgeY} ${arrowWidth} ${arrowHeight}`}
            refX="13"
            refY="0"
            orient="auto"
            markerWidth="13"
            markerHeight="13"
            xoverflow="visible"
          >
            <path
              // d="M -35,-5 L -25 ,0 L -35,5"
              d={`M ${arrowEdgeX} ${arrowEdgeY} L ${arrowEdgeEnd} 0 L ${arrowEdgeX} ${
                -1 * arrowEdgeY
              }`}
              fill="#999"
              style={{ stroke: "none" }}
            ></path>
          </marker>
        </defs>

        <g className="links">
          {links.map((link) => {
            return (
              <line
                key={link.source.id + "-" + link.target.id}
                stroke="black"
                strokeWidth="1"
                className="link"
                markerEnd="url(#arrowhead)"
                id="edgepath0"
                x1={link.source.x}
                y1={link.source.y}
                x2={link.target.x}
                y2={link.target.y}
              ></line>
            );
          })}
        </g>

        <g className="nodes">
          {nodes.map((node) => {
            return (
              <circle
                className="node"
                key={node.id}
                r={node.r}
                style={{ fill: "rgb(128, 255, 191)" }}
                cx={node.x}
                cy={node.y}
                data-url={node.url}
                data-name={node.label}
                onClick={nodeClickHandle}
                onMouseEnter={overHandle}
              ></circle>
            );
          })}
        </g>

        {nodes.map((node) => {
          return (
            <text
              className="node-label"
              key={node.id}
              textAnchor="middle"
              fill="black"
              fontSize={deviceWidth <= MOBILE_BORDER_SIZE ? "15px" : "15px"}
              x={node.x}
              y={node.y}
            >
              {node.label}
            </text>
          );
        })}
      </svg>
      <div
        className={displayArticle.length > 0 ? "card show popup" : "card popup"}
        style={{
          position: "absolute",
          left: mousePosition[0],
          top: mousePosition[1],
        }}
        onMouseLeave={outHandle}
      >
        <div className="card-content">
          <div className="content">
            <p>おすすめの記事</p>
            {displayArticle.map((item, i) => {
              return (
                <p key={i}>
                  <a href={item.url} target="_blank">
                    {item.title}
                  </a>
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default D3DirectedGraph;
