import * as d3 from 'd3';
import { useState, useEffect, useRef } from "react";

function D3DirectedGraph() {
  const svgWidth = 1500;
  const svgHeight = 800;


  let isload = useRef(false);

  const [nodes_p, setNodes] = useState([]);
  const [links_p, setLinks] = useState([]);


  useEffect(() => {
    let nodes_d3, links_d3;
    async function fetchData() {
      const response = await fetch("data/dummy_data.json");
      const data = await response.json();
      let nodes = Array();
      let links = Array();
      Object.keys(data).forEach((k) => {
        nodes.push({
          id: data[k].ID,//nodeのindexを標準設定から変更
          label: data[k].nodeName,
          r: 50
        }
        )
        if (data[k].childNodes.length > 0) {
          for (let i = 0; i < data[k].childNodes.length; i++) {
            links.push({
              source: data[k].ID,
              target: data[k].childNodes[i]
            }
            )
          }
        }
      })
      return [nodes.slice(), links.slice()];
    }


    function startSimulation() {
      const simulation = d3.forceSimulation()
        .force("collide", d3.forceCollide().radius(function (d) { return d.r; }).iterations(16)) //衝突値の設定 よくわかってない
        .force("link", d3.forceLink().distance((d) => 500).id((d) => d.id))//stength:linkの強さ（元に戻る力 distance: linkの長さ
        .force("charge", d3.forceManyBody().strength(-200))  //引き合う力を設定。
        .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2))  //描画するときの中心を設定
        .force("x", d3.forceX().x(svgWidth / 2).strength(0.2))  //x方向に戻る力
        .force("y", d3.forceY().y(svgHeight / 2).strength(0.2)) //y方向に戻る力   
        ;

      simulation
        // forceSimulationの影響下にnodesを置く
        .nodes(nodes_d3)
        // 時間経過で動かす
        .on("tick", ticked);
      // linkデータをセット
      simulation.force("link")
        .links(links_d3);
      // setInterval(() => {

      function ticked() {
        isload.current = true;
        setNodes(nodes_d3.slice())
        setLinks(links_d3.slice())
      }

    }
    async function startLineChart() {
      [nodes_d3, links_d3] = await fetchData();
      startSimulation();
    }
    startLineChart();
    // １度だけuseEffect()を実行する
  }, [])

  if (isload.current === false) {
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
    <svg class="graph" width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
      <defs>
        <marker id="arrowhead" viewBox="-35 -5 10 10" refX="13" refY="0" orient="auto" markerWidth="13" markerHeight="13" xoverflow="visible">
          <path d="M -35,-5 L -25 ,0 L -35,5" fill="#999" style={{ stroke: "none" }}>
          </path>
        </marker>
      </defs>

      <g class="links">
        {
          links_p.map((link) => {
            return (
              <line key={link.source.id + "-" + link.target.id} stroke="black" stroke-width="1" class="link" marker-end="url(#arrowhead)" id="edgepath0"
                x1={link.source.x} y1={link.source.y} x2={link.target.x} y2={link.target.y}></line>
            )
          })
        }
      </g>

      <g class="nodes">
        {
          nodes_p.map((node) => {
            return (
              <circle r={node.r} style={{ fill: "rgb(128, 255, 191)" }}
                cx={node.x} cy={node.y}></circle>
            )
          })
        }
      </g>
      {
        nodes_p.map((node) => {
          return (
            <text key={node.id} text-anchor="middle" fill="black" font-size="12px"
              x={node.x} y={node.y}>{node.label}</text>
          )
        })
      }
    </svg >
  )
}
export default D3DirectedGraph;