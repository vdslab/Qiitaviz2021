import { useEffect, useState } from "react";
import * as d3 from 'd3';
function App() {
  const r = 20;
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("dummy_data.json")
      const d = await response.json();
      setData(d);
    }
    )()
  }, [])

  const nodes = [];
  let i = 1;
  Object.keys(data).forEach((key) => {
    nodes.push({
      id: data[key].ID,
      label: data[key].nodeName,
      childNodes: data[key].childNodes,
      x: (i > 3) ? Math.random() * 180 + 10 : Math.random() * 150 + 200,
      y: Math.random() * 380 + 10,
      r: r
    })
    i++;
  })

  return (
    <div>
      <svg width="400" height="400" viewBox="0 0 400 400">
        <marker id="arrow" viewBox="-30 -20 30 40" orient="auto">
          <polygon points="-30 -20 0,0 -30,20" fill="black" stroke="none" />
        </marker>
        {
          nodes.map((node) => {
            const x = node.x,
              y = node.y,
              r = node.r,
              label = node.label;
            return (
              <g key={node.id}>
                <circle cx={x} cy={y} r={r} fill="white" stroke="black" />
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="12"
                >
                  {label}
                </text>
              </g>
            )
          })
        }
        {

          nodes.map((node) => {
            return (
              node.childNodes.map(child => {
                const target = nodes.find((n) => child === n.id);
                const x1 = node.x,
                  y1 = node.y,
                  r1 = node.r,
                  x2 = target.x,
                  y2 = target.y,
                  r2 = target.r,
                  angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI),
                  d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) - (r1 + r2);
                return (
                  <g key={node.id} transform={`rotate(${angle}, ${x1}, ${y1}) translate(${r1} , 0)`}>
                    <line x1={x1} y1={y1} x2={x1 + d} y2={y1}
                      stroke="#000" markerEnd="url(#arrow)" stroke-width="2"
                    ></line>
                  </g>
                )
              })
            )
          })
        }
      </svg>
    </div >
  )
}
export default App;