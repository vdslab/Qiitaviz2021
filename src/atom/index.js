import { atom } from "recoil";

export const clusterDataUrlState = atom({
  key: "clusterDataUrlState",
  default: process.env.PUBLIC_URL + "/data/cluster1_graph_data.json",
});

export const tagListDataState = atom({
  key: "tagListDataState",
  default: [],
});

export const nodesState = atom({
  key: "nodesState",
  default: [],
});

export const linkssState = atom({
  key: "linksState",
  default: [],
});

export const articleDataState = atom({
  key: "articleDataState",
  default: [],
});

export const selectedChildNodesState = atom({
  key: "selectedChildNodesState",
  default: "",
});

export const searchTagState = atom({
  key: "searchTagState",
  default: "",
});

export const selectClusterState = atom({
  key: "selectClusterState",
  default: "cluster1",
});

export const displayArticleState = atom({
  key: "displayArticleState",
  default: [],
});

export const mousePositionState = atom({
  key: "mousePositionState",
  default: [0, 0],
});

export const showSelectedSkilledCardState = atom({
  key: "showSelectedSkilledCardState",
  default: false,
});

export const selectedNodeNameState = atom({
  key: "selectedNodeNameState",
  default: "",
});
