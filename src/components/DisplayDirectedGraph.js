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
} from "../atom";
import { useState } from "react";

function D3DirectedGraph() {
  const [preClickNode, setPreClickNode] = useRecoilState(preClickNodeState);
  const [articleData, setArticleData] = useRecoilState(articleDataState);
  const [selectChildNodes, setSelectChildNodes] = useRecoilState(
    selectedChildNodesState
  );

  const [nodes, setNodes] = useRecoilState(nodesState);
  const [links, setLinks] = useRecoilState(linkssState);

  const [displayArticle, setDisplayArticle] =
    useRecoilState(displayArticleState);

  const [clickCount, setClickCount] = useState(0);
  // デバイスの横幅を取得
  const { innerWidth: deviceWidth, innerHeight: deviceHeight } = window;
  const svgWidth = deviceWidth > 768 ? deviceWidth * 0.66 : deviceWidth * 0.9;
  const svgHeight = deviceWidth > 768 ? deviceHeight * 0.7 : deviceHeight * 0.3;
  const colorList = [
    "rgb(255, 255, 255)",
    "rgb(255, 255, 205)",
    "rgb(128, 255, 191)",
  ];
  const wordsData = JSON.parse(localStorage["wordsData"]);

  function clickNode(selectedNode) {
    const target = selectedNode.label;
    const data = articleData.filter((item) => item.type === target);
    setDisplayArticle(data);
    const childNodes = selectedNode.childNodes.slice();
    childNodes.push(selectedNode.id);
    setSelectChildNodes(childNodes);
    setClickCount(wordsData[target]["clickCount"]);
    // 直前にクリックしたノードと同じか判定
    if (preClickNode !== target) {
      if (preClickNode !== "") {
        wordsData[preClickNode]["clickFlag"] = false;
      }
      setPreClickNode(target);
      wordsData[target]["clickFlag"] = true;
    } else {
      // 同じノードを二回以上連続でクリックしたときに色を変える
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
                style={{
                  fill: colorList[
                    parseInt(wordsData[node.label]["clickCount"]) % 3
                  ],
                }}
                cx={node.x}
                cy={node.y}
                data-url={node.url}
                data-name={node.label}
                stroke={selectChildNodes.includes(node.id) ? "red" : "black"}
                strokeWidth="2"
                onClick={() => clickNode(node)}
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
  );
}
export default D3DirectedGraph;
