import { atom } from "recoil";

export const clusterDataUrlState = atom({
  key: "clusterDataUrlState",
  default: process.env.PUBLIC_URL + "/data/clusters/cluster1_graph_data.json",
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

export const highlightNodesState = atom({
  key: "highlightNodesState",
  default: [],
});

export const searchTagState = atom({
  key: "searchTagState",
  default: "",
});

export const selectClusterState = atom({
  key: "selectClusterState",
  default: "領域を選択",
});

export const displayArticleState = atom({
  key: "displayArticleState",
  default: [],
});

export const preClickNodeState = atom({
  key: "preClickNodeState",
  default: "",
});
export const selectClusterFileState = atom({
  key: "selectClusterFileState",
  default: "/cluster1_graph_data.json",
});

export const selectTagDataState = atom({
  key: "selectTagDataState",
  default: [],
});

export const edgeWeightDataState = atom({
  key: "edgeWeightDataState",
  default: [],
});

export const errorMessageState = atom({
  key: "errorMessageState",
  default: "　",
});

export const inputTagState = atom({
  key: "inputTagState",
  default: "",
});
