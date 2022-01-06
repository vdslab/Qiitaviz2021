import D3DirectedGraph from "./components/D3DirectedGraph";
import "bulma/css/bulma.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/AboutSite";
import Footer from "./components/Footer";
const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <section style={{ minHeight: "90vh" }}>
          <Switch>
            <Route exact path="/">
              <D3DirectedGraph />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </section>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
