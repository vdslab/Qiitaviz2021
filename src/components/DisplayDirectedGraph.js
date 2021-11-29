import * as d3 from "d3";
import "bulma/css/bulma.css";
import ZoomableSVG from "./ZoomableSVG";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  displayArticleState,
  nodesState,
  linkssState,
  articleDataState,
  selectedChildNodesState,
  preClickNodeState,
  selectTagDataState,
  edgeWeightDataState,
} from "../atom";
import { useState } from "react";

function D3DirectedGraph() {
  const [preClickNode, setPreClickNode] = useRecoilState(preClickNodeState);
  const [articleData, setArticleData] = useRecoilState(articleDataState);
  const [selectChildNodes, setSelectChildNodes] = useRecoilState(
    selectedChildNodesState
  );
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
    "rgb(255, 255, 205)",
    "rgb(255, 255, 0)",
  ];
  const nodeColorList = [
    "rgb(173, 255, 47)",
    "rgb(124, 252, 0)",
    "rgb(152, 251, 152)",
    "rgb(60, 179, 113)",
    "rgb(0, 128, 0)",
  ];
  const wordsData = JSON.parse(localStorage["wordsData"]);
  const [selectTagData, setSelectTagData] = useRecoilState(selectTagDataState);

  // これを参考に星をクリックしたときに色を変えられるようにしてほしい
  function clickNode(selectedNode) {
    const target = selectedNode.label;
    setSelectTagData([target, selectedNode.url]);
    const data = articleData.filter((item) => item.type === target);
    setDisplayArticle(data);
    const childNodes = selectedNode.childNodes.slice();
    childNodes.push(selectedNode.id);
    setSelectChildNodes(childNodes);
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
  const arrowEdgeX = -35;
  const arrowEdgeY = -5;
  const arrowHeight = 10;
  const arrowWidth = 14;
  const arrowEdgeEnd = -25;
  console.log(edgeWeight);
  return (
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
          markerUnits="userSpaceOnUse"
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

      <g className="nodes">
        {nodes.map((node) => {
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
                stroke={selectChildNodes.includes(node.id) ? "red" : "black"}
                strokeWidth="2"
                onClick={() => clickNode(node)}
              ></circle>
              <g>
                <polygon
                  className="star"
                  strokeWidth="1"
                  points={
                    node.x +
                    42 +
                    "," +
                    (node.y - 25) +
                    " " +
                    (node.x + 44) +
                    "," +
                    (node.y - 20) +
                    " " +
                    (node.x + 49) +
                    "," +
                    (node.y - 20) +
                    " " +
                    (node.x + 46) +
                    "," +
                    (node.y - 17) +
                    " " +
                    (node.x + 47) +
                    "," +
                    (node.y - 11) +
                    " " +
                    (node.x + 42) +
                    "," +
                    (node.y - 14) +
                    " " +
                    (node.x + 37) +
                    "," +
                    (node.y - 11) +
                    " " +
                    (node.x + 38) +
                    "," +
                    (node.y - 17) +
                    " " +
                    (node.x + 35) +
                    "," +
                    (node.y - 20) +
                    " " +
                    (node.x + 40) +
                    "," +
                    (node.y - 20)
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
                y={node.y}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </g>
    </ZoomableSVG>
  );
}
export default D3DirectedGraph;
