import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { autoType } from "d3";

function ZoomableSVG({ children, width, height }) {
  const svgRef = useRef();
  const [k, setK] = useState(0.4);
  const [x, setX] = useState(200);
  const [y, setY] = useState(150);
  useEffect(() => {
    const zoom = d3.zoom().on("zoom", (event) => {
      const { x, y, k } = event.transform;
      setK(0.4 + k - 1);
      setX(200 + x);
      setY(150 + y);
    });
    zoom.scaleExtent([0.8, 2.6]);
    d3.select(svgRef.current).call(zoom);
  }, []);
  return (
    <svg
      ref={svgRef}
      width={"100%"}
      height={"100%"}
      className="has-background-white"
      style={{
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <g transform={`translate(${x}, ${y})scale(${k})`}>{children}</g>
    </svg>
  );
}

export default ZoomableSVG;
