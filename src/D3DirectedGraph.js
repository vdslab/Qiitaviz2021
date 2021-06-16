import React, { Component } from 'react'
import * as d3 from 'd3';
class D3DirectedGraph extends Component {
  constructor(props) {
    // console.log("コンストラクタを実行");
    super(props)
    this.createDirectedGraph = this.createDirectedGraph.bind(this)
    this.state = { //state初期化
      isLoaded: false,
      items: []
    };

  }
  componentDidMount() {
    // コンポーネントがマウントされた直後に実行
    fetch("dummy_data.json")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        });
      });

  }
  componentDidUpdate() {
    // コンポーネントを更新したときに実行したい処理を書く場所
  }
  componentWillUnmount() {
    // このコンポーネントをアンマウントした後の処理
  }
  createDirectedGraph() {
    // console.log("createDirectedGraph開始");
    let { items, isLoaded } = this.state;
    if (!isLoaded) {
      return (
        <div>...Loading</div>
      )
    }
    // console.log("isload" + isLoaded);
    // console.log("items" + JSON.stringify(items));
    let nodes = Array();
    let links = Array();
    Object.keys(items).forEach((k) => {
      nodes.push({
        id: items[k].ID,//nodeのindexを標準設定から変更
        label: items[k].nodeName,
        r: 50
      }
      )
      if (items[k].childNodes.length > 0) {
        for (let i = 0; i < items[k].childNodes.length; i++) {
          links.push({
            source: items[k].ID,
            target: items[k].childNodes[i]
          }
          )
        }
      }

    });
    // console.log("nodes:" + JSON.stringify(nodes));
    // console.log("links" + JSON.stringify(links));
    const node_d3 = this.node;
    var width = 1000;
    var height = 1000;
    var svgheight = 1000,
      svgwidth = 1000;
    var simulation = d3.forceSimulation()
      .force("collide", d3.forceCollide().radius(function (d) { return d.r; }).iterations(16)) //衝突値の設定 よくわかってない
      .force("link", d3.forceLink().distance((d) => 500).id((d) => d.id))//stength:linkの強さ（元に戻る力 distance: linkの長さ
      .force("charge", d3.forceManyBody().strength(-200))  //引き合う力を設定。
      .force("center", d3.forceCenter(svgwidth / 2, svgheight / 2))  //描画するときの中心を設定
      .force("x", d3.forceX().x(svgwidth / 2).strength(0.2))  //x方向に戻る力
      .force("y", d3.forceY().y(svgheight / 2).strength(0.2)) //y方向に戻る力   
      ;
    var svg = d3.select(node_d3)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", "0 0 1000 1000");
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-35 -5 10 10')
      .attr('refX', 13)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 13)
      .attr('markerHeight', 13)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M -35,-5 L -25 ,0 L -35,5')
      .attr('fill', '#999')
      .style('stroke', 'none');
    var link = svg.append("g")
      .attr("class", "links  ")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("class", "link")
      .attr('marker-end', 'url(#arrowhead)')
      .attr("id", function (d, i) { return "edgepath" + i });

    var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")//nodeはcircleで描画する
      .data(nodes)//nodeの配列
      .enter()//dataの内容を確定
      .append("circle")
      .attr("r", function (d) { return d.r; }) //nodeの大きさ(半径)を指定する
      .style(
        "fill", "	#80ffbf"
      )
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));



    // nodeのラベル周りの設定
    var label = svg.selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px")
      .text(function (data) { return data.label });

    // tickイベント
    simulation
      // forceSimulationの影響下にnodesを置く
      .nodes(nodes)
      // 時間経過で動かす
      .on("tick", ticked);
    // linkデータをセット
    simulation.force("link")
      .links(links);

    function ticked() {
      link
        // forceSimulationで計算された座標をsvgのlinkオブジェクトへ対応させていく
        .attr("x1", function (data) { return data.source.x })
        .attr("y1", function (data) { return data.source.y })
        .attr("x2", function (data) { return data.target.x })
        .attr("y2", function (data) { return data.target.y });
      node
        // forcesimulationで計算したd.x, d.yをそのまま使う
        .attr("cx", function (data) { return data.x })
        .attr("cy", function (data) { return data.y });

      label
        .attr("x", function (data) { return data.x })
        .attr("y", function (data) { return data.y });
    }
    // console.log(JSON.stringify(nodes));
    function dragstarted(event, d) {  //ドラッグ開始時の関数
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = event.x;
      d.fy = event.y;
    }
    function dragged(event, d) {  //ドラッグ中の関数
      d.fx = event.x;
      d.fy = event.y;
    }
    function dragended(event, d) { //ドラッグ終了時の関数
      if (!event.active) simulation.alphaTarget(.03);
      d.fx = null;
      d.fy = null;
    }


  }
  render() {
    this.createDirectedGraph();
    return <svg class="graph" ref={node => this.node = node}>
    </svg>
  }
}
export default D3DirectedGraph;
