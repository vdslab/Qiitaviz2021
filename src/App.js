import React, { useEffect, useState } from "react";

const Hero = () => {
  return (
    <section class="hero is-link is-medium">
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand"></div>
            <div id="navbarMenuHeroA" class="navbar-menu">
              <div class="navbar-end">
                <a class="navbar-item is-active">Home</a>
                <a class="navbar-item">Examples</a>
                <a class="navbar-item">Documentation</a>
                <span class="navbar-item">
                  <a class="button is-primary is-inverted">
                    <span class="icon">
                      <i class="fab fa-github"></i>
                    </span>
                    <span>Download</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};
const Graph = () => {
  const [data, setData] = useState(null);
  const dataUrl = `${process.env.PUBLIC_URL}/data/dummy_data.json`;
  console.log(dataUrl)
  useEffect(() => {
    async function fetchData(dataUrl) {
      const res = await fetch(dataUrl);
      const json = await res.json();
      //const data = json.data;
      setData(json);
    }
    fetchData(dataUrl);
  }, []);
  const width = 900;
  const height = 900;
  console.log(data)
  return (
    <svg width={width} height={height}>
      <g>
        {Object.keys(data[0]).map((key) => {
          {console.log(key)}
          const x = data[0][key]["ID"] * 70;
          const y = data[0][key]["ID"] * 70;

          let r = 15;
          let color = "red";
          return (
            <g>
              <circle
                cx={x}
                cy={y}
                r={r}
                fill={color}
                opacity="0.8"
                key={item["nodeName"]}
              />
              <text x = {x} y={y} fontSize="20">
              data.item["nodeName"]
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>&copy; 2021 Qiita-legends</p>
      </div>
      <div className="level-item">
        <a href="https://github.com/vdslab/Qiitaviz2021">
          <span className="icon is-small has-text-link">
            <i class="fab fa-github "></i>
          </span>
        </a>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div>
      <Hero />
      <Graph />
      <Footer />
    </div>
  );
};

export default App;
