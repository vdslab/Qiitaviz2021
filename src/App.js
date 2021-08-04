import D3DirectedGraph from "./components/D3DirectedGraph";
import "bulma/css/bulma.css";
import Header from "./components/Header";
import { useState } from "react";
import Footer from "./components/Footer";
const App = () => {
  const [clusterDataUrl, setClusterDataUrl] = useState(
    process.env.PUBLIC_URL + "/data/cluster1_graph_data.json"
  );

  return (
    <div>
      <Header />
      <section style={{ minHeight: "90vh" }}>
        <D3DirectedGraph />
      </section>
      <Footer />
    </div>
  );
};

export default App;
