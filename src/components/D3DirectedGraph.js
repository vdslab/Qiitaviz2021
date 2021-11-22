import * as d3 from "d3";
import "bulma/css/bulma.css";
import { useState, useEffect } from "react";
import DisplayDirectedGraph from "./DisplayDirectedGraph";
import DisplaySubView from "./DisplaySubview";
import AreaTab from "./AreaTab";
import Search from "./Search";
import ColorLabel from "./ColorLabel";
import DescriptionModal from "./DescriptionModal";
import SelectedSystemTab from "./SelectSystemTab";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  articleDataState,
  clusterDataUrlState,
  displayArticleState,
  linkssState,
  nodesState,
  preClickNodeState,
  searchTagState,
  selectedChildNodesState,
  selectSystemState,
  tagListDataState,
} from "../atom";

function D3DirectedGraph() {
  const [articleData, setArticleData] = useRecoilState(articleDataState);
  const [selectChildNodes, setSelectChildNodes] = useRecoilState(
    selectedChildNodesState
  );
  const [selectSystem, setSelectSystem] = useRecoilState(selectSystemState);
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
      nodes.map((node) => {
        if (node.label === searchTag) {
          searchNode(node);
        }
      });
    };
    const startSetGraphData = async () => {
      const [nodes, links] = await (async () => {
        const clusterResponse = await fetch(clusterDataUrl);
        const clusterData = await clusterResponse.json();

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
        clusterData.map((item) => {
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
            const articleResponse = await fetch(
              process.env.PUBLIC_URL + "/data/recommend_data.json"
            );
            const articleData = await articleResponse.json();
            return articleData;
          })()
        );
        return [nodes, links];
      })();
      startSimulation(nodes, links);
      setLoading(false);
    };
    startSetGraphData();
    setDisplayArticle([]);
    setSelectChildNodes([]);
    setSearchTag("");
    setPreClickNode("");
  }, [clusterDataUrl, searchTag, selectSystem]);

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
              <SelectedSystemTab />
              <AreaTab />
              <Search />
              <ColorLabel />
            </div>
          </div>
        </div>
        <div
          style={{
            height:
              deviceWidth > 768 ? deviceHeight * 0.687 : deviceHeight * 0.4,
          }}
        >
          <DisplayDirectedGraph />
        </div>
      </div>
      <DisplaySubView />
    </div>
  );
}
export default D3DirectedGraph;
