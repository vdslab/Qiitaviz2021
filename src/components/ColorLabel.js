const ColorLabel = () => {
  return (
    <svg width={"84"} height={"55"}>
      <g>
        <polygon
          className="star"
          strokeWidth="1"
          points="8,10 10,15 15,15 12,18
                  13,24 8,21 3,24 4,18
                  1,15 6,15"
          fill="rgb(5, 165, 95)"
          stroke="black"
        />
        <polygon
          className="star"
          strokeWidth="1"
          points="8,25 10,30 15,30 12,33
                  13,39 8,36 3,39 4,33
                  1,30 6,30"
          fill="rgb(170, 255, 195)"
          stroke="black"
        />
        <polygon
          className="star"
          strokeWidth="1"
          points="8,40 10,45 15,45 12,48
          13,54 8,51 3,54 4,48
          1,45 6,45"
          fill="rgb(255, 255, 255)"
          stroke="black"
        />
        <text textAnchor="middle" fill="black" fontSize={"10px"} x={36} y={21}>
          マスター
        </text>
        <text textAnchor="middle" fill="black" fontSize={"10px"} x={50} y={37}>
          そこそこできる
        </text>
        <text textAnchor="middle" fill="black" fontSize={"10px"} x={46} y={52}>
          全然できない
        </text>
      </g>
    </svg>
  );
};

export default ColorLabel;
