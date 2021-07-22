import D3DirectedGraph from "./D3DirectedGraph";
import "bulma/css/bulma.css";
import Header from "./components/Header";
const App = () => {
  return (
    <div>
      <Header />
      <section>
        <D3DirectedGraph />
      </section>
    </div>
  );
};

export default App;
