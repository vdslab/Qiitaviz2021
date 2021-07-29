import D3DirectedGraph from "./components/D3DirectedGraph";
import "bulma/css/bulma.css";
import Header from "./components/Header";
import { useState } from "react";
const App = () => {
  const [clusterDataUrl, setClusterDataUrl] = useState(
    process.env.PUBLIC_URL + "/data/cluster1_graph_data.json"
  );

  return (
    <div>
      <Header setClusterDataUrl={setClusterDataUrl} />
      <section>
        <D3DirectedGraph clusterDataUrl={clusterDataUrl} />
      </section>
    </div>
  );
};

export default App;
