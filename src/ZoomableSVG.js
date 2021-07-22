import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

function ZoomableSVG({ children, width, height }) {
  const svgRef = useRef();
  const [k, setK] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    const zoom = d3.zoom().on("zoom", (event) => {
      const { x, y, k } = event.transform;
      setK(k);
      setX(x);
      setY(y);
    });
    zoom.scaleExtent([0.5, 2]);
    d3.select(svgRef.current).call(zoom);
  }, []);
  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
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
