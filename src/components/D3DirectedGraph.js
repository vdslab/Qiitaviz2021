import * as d3 from "d3";
import "bulma/css/bulma.css";
import { useState, useEffect } from "react";
import ZoomableSVG from "./ZoomableSVG";
import DisplaySubView from "./DisplaySubview";
import AreaTab from "./AreaTab";
import Search from "./Search";
import DescriptionModal from "./DescriptionModal";

function D3DirectedGraph() {
  const [articleData, setArticleData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [selectChildNodes, setSelectChildNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [clusterDataUrl, setClusterDataUrl] = useState(
    process.env.PUBLIC_URL + "/data/cluster1_graph_data.json"
  );
  // おすすめ記事
  const [displayArticle, setDisplayArticle] = useState([]);

  // デバイスの横幅を取得
  const { innerWidth: deviceWidth, innerHeight: deviceHeight } = window;
  const svgWidth = deviceWidth > 768 ? deviceWidth * 0.66 : deviceWidth * 0.9;
  const svgHeight = deviceWidth > 768 ? deviceHeight * 0.7 : deviceHeight * 0.3;

  function clickNode(e, selectedNode) {
    const target = e.currentTarget.dataset.name;
    const data = articleData.filter((item) => {
      return item.type == target;
    });
    setDisplayArticle(data);
    const childNodes = selectedNode.childNodes.slice();
    childNodes.push(selectedNode.id);
    setSelectChildNodes(childNodes);
  }

  useEffect(() => {
    const startSimulation = (nodes, links) => {
      const linkLen = 20;
      const simulation = d3
        .forceSimulation()
        .force(
          "collide",
          d3
            .forceCollide()
            .radius(function (d) {
              return d.r * 1.5;
            })
            .iterations(64)
        ) //衝突値の設定
        .force(
          "link",
          d3
            .forceLink()
            .id((d) => d.id)
            .distance(linkLen)
        ) //stength:linkの強さ（元に戻る力 distance: linkの長さ
        .force("charge", d3.forceManyBody().strength(-100)) //引き合う力を設定。
        .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2)) //描画するときの中心を設定
        .force(
          "y",
          d3
            .forceY()
            .y((d) => 225 * (d.level + 1))
            .strength(1.7)
        ); //y方向に戻る力

      simulation
        // forceSimulationの影響下にnodesを置く
        .nodes(nodes);

      // linkデータをセット
      simulation.force("link").links(links);
      simulation.tick(300).stop();
      setNodes(nodes);
      setLinks(links);
    };
    const startSetGraphData = async () => {
      const [nodes, links] = await (async () => {
        const response = await fetch(clusterDataUrl);
        const data = await response.json();
        setGraphData(data);
        setDisplayArticle([]);
        setSelectChildNodes([]);

        const nodes = Array();
        const links = Array();

        const r = 35;
        data.map((item) => {
          nodes.push({
            id: item.ID, //nodeのindexを標準設定から変更
            label: item.nodeName,
            url: item.url,
            r,
            level: item.level,
            diff: item.diff,
            childNodes: item.childNode,
          });
          for (const child of item.childNode) {
            links.push({
              source: item.ID,
              target: child,
            });
          }
        });
        setArticleData(
          await (async () => {
            const response = await fetch(
              process.env.PUBLIC_URL + "/data/recommend_data.json"
            );
            const data = await response.json();
            return data;
          })()
        );
        return [nodes, links];
      })();
      startSimulation(nodes, links);
      setLoading(false);
    };
    startSetGraphData();
  }, [clusterDataUrl]);

  if (loading) {
    return <div>loading...</div>;
  }

  const arrowEdgeX = -35;
  const arrowEdgeY = -5;
  const arrowHeight = 10;
  const arrowWidth = 14;
  const arrowEdgeEnd = -25;

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
        style={
          deviceWidth > 768
            ? { height: "84vh", position: "relative" }
            : { height: "60vh", position: "relative" }
        }
      >
        <div className="columns mt-2" style={{ marginBottom: "0" }}>
          <div className="column">
            <DescriptionModal />
            <div className="columns is-centered is-multiline">
              <AreaTab setClusterDataUrl={setClusterDataUrl} />
              <Search />
            </div>
          </div>
        </div>
        <div
          style={{
            height:
              deviceWidth > 768 ? deviceHeight * 0.73 : deviceHeight * 0.4,
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
                    stroke={"black"}
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
                      stroke={
                        selectChildNodes.includes(node.id)
                          ? "red"
                          : "rgb(128, 255, 191)"
                      }
                      strokeWidth="2"
                      onClick={(e) => clickNode(e, node)}
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
