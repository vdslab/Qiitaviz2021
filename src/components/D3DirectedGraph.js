import * as d3 from "d3";
import "bulma/css/bulma.css";
import { useState, useEffect } from "react";
import DisplayDirectedGraph from "./DisplayDirectedGraph";
import DisplaySubView from "./DisplaySubview";
import AreaTab from "./AreaTab";
import Search from "./Search";
import ColorLabel from "./ColorLabel";
import DescriptionModal from "./DescriptionModal";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  articleDataState,
  clusterDataUrlState,
  displayArticleState,
  edgeWeightDataState,
  highlightNodesState,
  linkssState,
  nodesState,
  preClickNodeState,
  searchTagState,
  selectClusterState,
  selectSystemState,
  tagListDataState,
} from "../atom";

function D3DirectedGraph() {
  const [articleData, setArticleData] = useRecoilState(articleDataState);
  const [highlightNodes, setHighlightNodes] =
    useRecoilState(highlightNodesState);
  const [loadMessage, setLoadMessage] =
    useState("調べたい領域を選択してください。");
  const [selectCluster, setSelectCluster] = useRecoilState(selectClusterState);
  const [edgeWeight, setEdgeWeight] = useRecoilState(edgeWeightDataState);
  const [preClickNode, setPreClickNode] = useRecoilState(preClickNodeState);
  const [loading, setLoading] = useState(true);

  const [nodes, setNodes] = useRecoilState(nodesState);
  const [links, setLinks] = useRecoilState(linkssState);
  const [searchTag, setSearchTag] = useRecoilState(searchTagState);
  const [tagListData, setTagListData] = useRecoilState(tagListDataState);
  const [clusterDataUrl, setClusterDataUrl] =
    useRecoilState(clusterDataUrlState);
  const [displayArticle, setDisplayArticle] =
    useRecoilState(displayArticleState);

  // デバイスの横幅を取得
  const { innerWidth: deviceWidth, innerHeight: deviceHeight } = window;
  const svgWidth = deviceWidth > 768 ? deviceWidth * 0.66 : deviceWidth * 0.9;
  const svgHeight = deviceWidth > 768 ? deviceHeight * 0.7 : deviceHeight * 0.3;

  function searchNode(selectedNode) {
    const target = selectedNode.label;
    const data = articleData.filter((item) => item.type === target);
    setDisplayArticle(data);
    const highlightNodes = selectedNode.childNodes.slice();
    highlightNodes.push(selectedNode.id);
    setHighlightNodes(highlightNodes.concat(selectedNode["parentNode"]));
  }
  useEffect(() => {
    setLoading(true);
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
        .force("charge", d3.forceManyBody().strength(-150)) //引き合う力を設定。
        .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2)) //描画するときの中心を設定
        .force(
          "y",
          d3
            .forceY()
            .y((d) => (d.level + 1) * 175 + (d.colorGroup + 1) * 100)
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
      nodes.map((node) => {
        if (node.label === searchTag) {
          searchNode(node);
        }
      });
    };
    const startSetGraphData = async () => {
      if (selectCluster !== "領域を選択") {
        setLoading(true);
        const [nodes, links] = await (async () => {
          setLoadMessage("グラフ描画中...");
          const clusterResponse = await fetch(clusterDataUrl);
          const clusterData = await clusterResponse.json();

          const edgeDataUrl = clusterDataUrl.replace("graph", "edge");
          const edgeResponse = await fetch(edgeDataUrl);
          const edgeData = await edgeResponse.json();
          setEdgeWeight(edgeData);

          const tagResponse = await fetch(
            process.env.PUBLIC_URL + "/data/tag_list_data.json"
          );
          const tagData = await tagResponse.json();
          setTagListData(tagData);

          const wordsData =
            localStorage["wordsData"] === undefined
              ? {}
              : JSON.parse(localStorage["wordsData"]);
          tagData.map((tags) => {
            tags.map((tag) => {
              wordsData[tag] =
                wordsData[tag] !== undefined
                  ? wordsData[tag]
                  : { clickCount: 0, clickFlag: false };
            });
          });

          localStorage["wordsData"] = JSON.stringify(wordsData);

          const nodes = Array();
          const links = Array();

          const r = 35;

          let nodeSize = Array(clusterData.length);
          clusterData.map((item) => {
            nodeSize[item.ID - 1] = Math.log(item.articleCount) * 4;
          });

          clusterData.map((item) => {
            nodes.push({
              id: item.ID, //nodeのindexを標準設定から変更
              label: item.nodeName,
              url: item.url,
              articleCount: item.articleCount,
              r: Math.log(item.articleCount) * 4,
              level: item.level,
              diff: item.diff,
              childNodes: item.childNode,
              colorGroup: item.color_group,
              parentNode: item.parentNode,
            });
            for (const child of item.childNode) {
              links.push({
                source: item.ID,
                target: child,
                r: nodeSize[child - 1],
              });
            }
          });
          setArticleData(
            await (async () => {
              const articleResponse = await fetch(
                process.env.PUBLIC_URL + "/data/recommend_data.json"
              );
              const articleData = await articleResponse.json();
              return articleData;
            })()
          );
          return [nodes, links];
        })();
        console.log(edgeWeight);
        startSimulation(nodes, links);
        setLoading(false);
      }
    };
    startSetGraphData();
    setHighlightNodes([]);
    setSearchTag("");
    setPreClickNode("");
  }, [clusterDataUrl, searchTag, selectCluster]);
  console.log(clusterDataUrl);
  return (
    <div
      className="tile is-ancestor"
      style={{
        marginRight: "20px",
        marginLeft: "20px",
        marginTop: "20px",
      }}
    >
      <div
        className="tile is-8 is-parent"
        style={deviceWidth > 768 ? { height: "106.5vh" } : { height: "60vh" }}
      >
        <div className="tile is-child box" style={{ position: "relative" }}>
          <div className="columns mt-2 is-centered is-variable is-3">
            <DescriptionModal />
            <div className="columns is-multiline ">
              <AreaTab />
              <Search />
              <ColorLabel />
            </div>
          </div>
          <div
            style={{
              height:
                deviceWidth > 768 ? deviceHeight * 0.87 : deviceHeight * 0.4,
            }}
          >
            {loading ? (
              <p
                style={{
                  textAlign: "center",
                  color: "rgb(100, 100, 100)",
                }}
              >
                {loadMessage}
              </p>
            ) : (
              <DisplayDirectedGraph />
            )}
          </div>
        </div>
      </div>
      <div className="tile is-4 is-vertical">
        <DisplaySubView />
      </div>
    </div>
  );
}
export default D3DirectedGraph;
