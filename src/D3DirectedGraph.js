import * as d3 from "d3";
import "bulma/css/bulma.css";
import { useState, useEffect } from "react";
import { union } from "d3";

class Edge {
  from;
  to;
  cost;

  constructor(from, to, cost) {
    this.from = from;
    this.to = to;
    this.cost = cost;
  }

}


class UnionFind {
  parent = [];

  constructor(n) {
    for(let i = 0; i < n; i++) {
      this.parent.push(i);
    }
  }

  root(x) {
    if(this.parent[x] === x) return x;
    this.parent[x] = this.root(this.parent[x]);
    return this.parent[x];
  }

  unite(x, y) {
    let rx = this.root(x);
    let ry = this.root(y);
    if(rx === ry) return 0;
    this.parent[rx] = ry;
  }

  same(x, y) {
    let rx = this.root(x);
    let ry = this.root(y);

    if(rx === ry) {
      return true;
    } else {
      return false;
    }
  }

}

function D3DirectedGraph() {
  const MOBILE_BORDER_SIZE = 599;

  const [loading, setLoading] = useState(true);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const hues = [];
  // デバイスの横、縦幅を取得
  const { innerWidth: deviceWidth, innerHeight: deviceHeight } = window;
  const svgWidth = 800;
  const svgHeight = deviceWidth <= MOBILE_BORDER_SIZE ? 1500 : 1100;

  const nodeClickHandle = (e) => {
    window.open(
      e.currentTarget.dataset.url,
      "sampleWin",
      "width=800,height=800,scrollbars=no,status=no,toolbar=no,location=no,menubar=no,resizable=yes"
    );
  };

  useEffect(() => {
    for(let i = 0; i < 100; i++) {
      hues.push(360*Math.random());
    }
    const startSimulation = (nodes, links) => {
      const linkLen = deviceWidth <= MOBILE_BORDER_SIZE ? 750 : 150;
      const simulation = d3
        .forceSimulation()
        .force(
          "collide",
          d3
            .forceCollide()
            .radius(function (d) {
              return d.r;
            })
            .iterations(10)
        ) //衝突値の設定
        .force(
          "link",
          d3
            .forceLink()
            .distance((d) => linkLen)
            .id((d) => d.id)
        ) //stength:linkの強さ（元に戻る力 distance: linkの長さ
        .force("charge", d3.forceManyBody().strength(-700)) //引き合う力を設定。
        .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2)) //描画するときの中心を設定
        .force(
          "x",
          d3
            .forceX()
            .x(svgWidth / 2)
            .strength(0.03)
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
        const response = await fetch("data/jaccard_data_100.json");
        const data = await response.json();
        const res = await fetch("data/difficulty_data_100.json");
        const diff = await res.json();
     
        const es = [];
        const uf = new UnionFind(100);
        const nodes = Array();
        const links = Array();
        
        const r = 15; 
        //deviceWidth <= MOBILE_BORDER_SIZE ? 70 : 35;

        for(let i = 0; i < 100; i++) {
          for(let j=0; j < 100; j++) {
            if(i != j) {
              es.push(new Edge(i, j, data[i]["jaccard"][j]))
            }
          }
        }

        es.sort((a, b) => {
          return b.cost - a.cost;
        })

        console.log(es);

        let ID = 1;
        for (const item of data) {
          nodes.push({
            id: ID, //nodeのindexを標準設定から変更
            label: item.tag,
            col: `hsl(${hues[ID-1]}, 100%, 70%)`,
            //url: item.url,
            r,
          });
          ID++;
        }


        for(const item of es) {
          if(uf.same(item.to, item.from) === false) {
            uf.unite(item.to, item.from);
            if(diff[item.to]['difficulty'] <= diff[item.from]['difficulty']) {
              links.push({
              source:item.to+1,
              target:item.from+1
            });
            } else {
              links.push({
                source:item.from+1,
                target:item.to+1
            });
          }
      
        }
      }

        console.log(links);

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
    <div className="container">
      <svg
        className="graph has-background-white"
        style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
        width={deviceWidth <= MOBILE_BORDER_SIZE ? "100%" : svgWidth}
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
                style={{ fill:node.col}}
                cx={node.x}
                cy={node.y}
                data-url={node.url}
                onClick={nodeClickHandle}
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
              fontSize={deviceWidth <= MOBILE_BORDER_SIZE ? "30px" : "15px"}
              x={node.x}
              y={node.y}
            >
              {node.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
export default D3DirectedGraph;
