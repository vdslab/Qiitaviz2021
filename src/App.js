import D3DirectedGraph from "./components/D3DirectedGraph";
import "bulma/css/bulma.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
const App = () => {
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
