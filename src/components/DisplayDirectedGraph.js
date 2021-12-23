import * as d3 from "d3";
import "bulma/css/bulma.css";
import ZoomableSVG from "./ZoomableSVG";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  displayArticleState,
  nodesState,
  linkssState,
  articleDataState,
  preClickNodeState,
  selectTagDataState,
  edgeWeightDataState,
  selectParentNodeState,
  highlightNodesState,
} from "../atom";
import { useState } from "react";

function D3DirectedGraph() {
  const [preClickNode, setPreClickNode] = useRecoilState(preClickNodeState);
  const [articleData, setArticleData] = useRecoilState(articleDataState);
  const [highlightNodes, setHighlightNodes] =
    useRecoilState(highlightNodesState);
  const [edgeWeight, setEdgeWeight] = useRecoilState(edgeWeightDataState);
  const [nodes, setNodes] = useRecoilState(nodesState);
  const [links, setLinks] = useRecoilState(linkssState);

  const [displayArticle, setDisplayArticle] =
    useRecoilState(displayArticleState);

  const [clickCount, setClickCount] = useState(0);
  // デバイスの横幅を取得
  const { innerWidth: deviceWidth, innerHeight: deviceHeight } = window;
  const svgWidth = deviceWidth > 768 ? deviceWidth * 0.66 : deviceWidth * 0.9;
  const svgHeight = deviceWidth > 768 ? deviceHeight * 0.7 : deviceHeight * 0.3;
  // 星の色にしてほしい
  const starColorList = [
    "rgb(255, 255, 255)",
    "rgb(170, 255, 195)",
    "rgb(5, 165, 95)",
  ];
  const nodeColorList = [
    "rgb(255, 240, 130)",
    "rgb(255, 215, 0)",
    "rgb(255, 165, 0)",
    "rgb(255, 106, 0)",
    "rgb(240, 60, 25)",
  ];
  const wordsData = JSON.parse(localStorage["wordsData"]);
  const [selectTagData, setSelectTagData] = useRecoilState(selectTagDataState);

  // これを参考に星をクリックしたときに色を変えられるようにしてほしい
  function clickNode(selectedNode) {
    const target = selectedNode.label;
    setSelectTagData([target, selectedNode.url]);
    const data = articleData.filter((item) => item.type === target);
    setDisplayArticle(data);
    const highlightNodes = selectedNode.childNodes.slice();
    highlightNodes.push(selectedNode.id);
    setHighlightNodes(highlightNodes.concat(selectedNode["parentNode"]));
    localStorage["wordsData"] = JSON.stringify(wordsData);
  }
  function clickStar(selectedNode) {
    const target = selectedNode.label;

    setClickCount(wordsData[target]["clickCount"]);
    if (preClickNode !== target) {
      setPreClickNode(target);
      wordsData[target]["clickFlag"];
    } else {
      // 同じ星を二回以上連続でクリックしたときに色を変える
      wordsData[target]["clickCount"] =
        parseInt(wordsData[target]["clickCount"]) + 1;
      setClickCount(wordsData[target]["clickCount"]);
    }

    localStorage["wordsData"] = JSON.stringify(wordsData);
  }
  const arrowEdgeX = -10;
  const arrowEdgeY = -5;
  const arrowHeight = 15;
  const arrowWidth = 15;
  const arrowEdgeEnd = 0;
  return (
    <ZoomableSVG width={svgWidth} height={svgHeight}>
      <defs>
        <marker
          id="arrowhead"
          viewBox={`${arrowEdgeX} ${arrowEdgeY} ${arrowWidth} ${arrowHeight}`}
          refX="0"
          refY="0"
          orient="auto"
          markerWidth="15"
          markerHeight="15"
          xoverflow="visible"
          markerUnits="userSpaceOnUse"
        >
          <path
            d={`M -10 -5 L 0 0 L -10 ${
              -1 * -5
            }`}
            fill="#999"
            style={{ stroke: "none" }}
          ></path>
        </marker>
      </defs>

      

      <g className="nodes">
        {nodes.map((node) => {
          const positionX = (32 / 35) * node.r + node.x;
          const positionY = node.y - node.r;
          return (
            <g className="nodes" key={node.id}>
              <circle
                className="node"
                r={node.r}
                fill={nodeColorList[node.colorGroup]}
                cx={node.x}
                cy={node.y}
                data-url={node.url}
                data-name={node.label}
                stroke={
                  highlightNodes.includes(node.id)
                    ? "rgb(0, 148, 255)"
                    : "rgb(50,55,50)"
                }
                strokeWidth="2.5"
                onClick={() => clickNode(node)}
              ></circle>
              <g>
                <polygon
                  className="star"
                  strokeWidth="1"
                  points={
                    positionX +
                    10 +
                    "," +
                    (positionY + 10) +
                    " " +
                    (positionX + 12) +
                    "," +
                    (positionY + 15) +
                    " " +
                    (positionX + 17) +
                    "," +
                    (positionY + 15) +
                    " " +
                    (positionX + 14) +
                    "," +
                    (positionY + 18) +
                    " " +
                    (positionX + 15) +
                    "," +
                    (positionY + 24) +
                    " " +
                    (positionX + 10) +
                    "," +
                    (positionY + 21) +
                    " " +
                    (positionX + 5) +
                    "," +
                    (positionY + 24) +
                    " " +
                    (positionX + 6) +
                    "," +
                    (positionY + 18) +
                    " " +
                    (positionX + 3) +
                    "," +
                    (positionY + 15) +
                    " " +
                    (positionX + 8) +
                    "," +
                    (positionY + 15)
                  }
                  fill={
                    starColorList[
                      parseInt(wordsData[node.label]["clickCount"]) % 3
                    ]
                  }
                  stroke="black"
                  onClick={() => clickStar(node)}
                />
              </g>
              <text
                className="node-label"
                textAnchor="middle"
                fill="black"
                fontSize={"15px"}
                x={node.x}
                y={node.y + 4}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </g>
      <g className="links">
        {links.map((link) => {
          return (
            <line
              key={link.source.id + "-" + link.target.id}
              stroke={"#999"}
              strokeWidth={edgeWeight[link.source.label][link.target.label] * 2}
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
    </ZoomableSVG>
  );
}
export default D3DirectedGraph;
