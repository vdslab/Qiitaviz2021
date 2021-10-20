const ColorLabel = () => {
  return (
    <svg width={"84"} height={"55"}>
      <g>
        <circle
          r={4}
          cx={10}
          cy={17}
          style={{ fill: "rgb(128, 255, 191)" }}
          stroke="black"
        />
        <circle
          r={4}
          cx={10}
          cy={32}
          style={{ fill: "rgb(255, 255, 205)" }}
          stroke="black"
        />
        <circle
          r={4}
          cx={10}
          cy={47}
          style={{ fill: "rgb(255, 255, 255)" }}
          stroke="black"
        />

        <text textAnchor="middle" fill="black" fontSize={"10px"} x={35} y={21}>
          マスター
        </text>
        <text textAnchor="middle" fill="black" fontSize={"10px"} x={49} y={36}>
          そこそこできる
        </text>
        <text textAnchor="middle" fill="black" fontSize={"10px"} x={45} y={50}>
          全然できない
        </text>
      </g>
    </svg>
  );
};

export default ColorLabel;
