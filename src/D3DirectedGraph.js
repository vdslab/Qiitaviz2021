import * as d3 from "d3";
import "bulma/css/bulma.css";
import { useState, useEffect } from "react";
import ZoomableSVG from "./ZoomableSVG";
import DisplaySubView from "./components/DisplaySubview";
import AreaTab from "./components/AreaTab";
import Search from "./components/Search";
import DescriptionModal from "./components/DescriptionModal";

function D3DirectedGraph() {
  const [articleData, setArticleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  // おすすめ記事
  const [displayArticle, setDisplayArticle] = useState([]);

  // デバイスの横幅を取得
  const { innerWidth: deviceWidth, innerHeight: deviceHeight } = window;
  const svgWidth = deviceWidth > 768 ? deviceWidth * 0.66 : deviceWidth * 0.9;
  const svgHeight = deviceWidth > 768 ? deviceHeight * 0.7 : deviceHeight * 0.3;

  function clickNode(e) {
    const target = e.currentTarget.dataset.name;
    const data = articleData.filter((item) => {
      return item.type == target;
    });
    setDisplayArticle(data);
  }

  useEffect(() => {
    const startSimulation = (nodes, links) => {
      const linkLen = 150;
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

      simulation
        // forceSimulationの影響下にnodesを置く
        .nodes(nodes);

      // linkデータをセット
      simulation.force("link").links(links);
      simulation.tick(300).stop();

      setNodes(nodes.slice());
      setLinks(links.slice());
    };

    const startLineChart = async () => {
      const [nodes, links] = await (async () => {
        const response = await fetch("./data/new_data.json");
        const data = await response.json();
        const nodes = Array();
        const links = Array();

        const r = 35;
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
      setArticleData(
        await (async () => {
          const response = await fetch("article_data.json");
          const data = await response.json();
          return data;
        })()
      );
      startSimulation(nodes, links);
      setLoading(false);
    };
    startLineChart();
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
    <div
      className="columns is-mobile is-multiline"
      style={{
        marginRight: "20px",
        marginLeft: "20px",
        marginTop: "20px",
      }}
    >
      <div
        className="column is-8-desktop is-12-mobile box"
        // className="column is-8-desktop is-8-mobile box"
        style={
          deviceWidth > 768
            ? { height: "84vh", position: "relative" }
            : { height: "60vh", position: "relative" }
          // ?  { height: "84vh", position: "relative" }
          // : { height: "84vh", position: "relative" }
        }
      >
        <div className="columns mt-2" style={{ marginBottom: "0" }}>
          <div className="column">
            <DescriptionModal />
            <div className="columns is-centered is-multiline">
              <AreaTab />
              <Search />
            </div>
          </div>
        </div>
        <div
          style={{
            height:
              deviceWidth > 768 ? deviceHeight * 0.73 : deviceHeight * 0.4,
            // deviceWidth > 768 ? deviceHeight * 0.73 : deviceHeight * 0.6,
          }}
        >
          <ZoomableSVG width={svgWidth} height={svgHeight}>
            <defs>
              <marker
                id="arrowhead"
                viewBox={`${arrowEdgeX} ${arrowEdgeY} ${arrowWidth} ${arrowHeight}`}
                refX="13"
                refY="0"
                orient="auto"
                markerWidth="13"
                markerHeight="13"
                xoverflow="visible"
              >
                <path
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
                  <g className="nodes" key={node.id}>
                    <circle
                      className="node"
                      r={node.r}
                      style={{ fill: "rgb(128, 255, 191)" }}
                      cx={node.x}
                      cy={node.y}
                      data-url={node.url}
                      data-name={node.label}
                      onClick={clickNode}
                    ></circle>

                    <text
                      className="node-label"
                      textAnchor="middle"
                      fill="black"
                      fontSize={"15px"}
                      x={node.x}
                      y={node.y}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </ZoomableSVG>
        </div>
      </div>
      <DisplaySubView displayArticle={displayArticle} />
    </div>
  );
}
export default D3DirectedGraph;
