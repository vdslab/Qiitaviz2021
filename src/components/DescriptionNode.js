import React, { useEffect, useState } from "react";
import "bulma/css/bulma.css";
const DescriptionNode = () => {
  return (
    <div>
      <h2 className="title has-text-grey-dark is-size-4">ノードの色について</h2>
      <p>
        ノードの色は、タグの難易度を表していています。5段階にグルーピングしており,
        赤みが強いほど難易度が高いことを表しています。
      </p>
      <svg width={"400"} height={"81"}>
        <g>
          <circle
            r={22}
            fill="rgb(255, 240, 130)"
            cx={40}
            cy={50}
            stroke="rgb(80,80,80)"
            strokeWidth="1"
          ></circle>
          <circle
            r={22}
            fill="rgb(255, 215, 0)"
            cx={105}
            cy={50}
            stroke="rgb(80,80,80)"
            strokeWidth="1"
          ></circle>
          <circle
            r={22}
            fill="rgb(255, 165, 0)"
            cx={170}
            cy={50}
            stroke="rgb(80,80,80)"
            strokeWidth="1"
          ></circle>
          <circle
            r={22}
            fill="rgb(255, 106, 0)"
            cx={235}
            cy={50}
            stroke="rgb(80,80,80)"
            strokeWidth="1"
          ></circle>
          <circle
            r={22}
            fill="rgb(240, 60, 25)"
            cx={300}
            cy={50}
            stroke="rgb(80,80,80)"
            strokeWidth="1"
          ></circle>
          <text
            textAnchor="middle"
            fill="black"
            fontSize={"13px"}
            x={40}
            y={15}
          >
            1
          </text>
          <text
            textAnchor="middle"
            fill="black"
            fontSize={"13px"}
            x={300}
            y={15}
          >
            5
          </text>
        </g>
      </svg>

      <h2 className="title has-text-grey-dark is-size-4">
        ノードの大きさについて
      </h2>
      <p>
        ノードの大きさは、ノードが表すタグが付与された記事の投稿数を表しており、ノードが大きいほど記事の数も多くなります。
      </p>
      <svg width={"400"} height={"81"}>
        <g>
          <circle
            r={Math.sqrt(666 / Math.PI) * 0.2 + 4}
            fill="rgb(255, 240, 130)"
            cx={40}
            cy={50}
            stroke="rgb(80,80,80)"
            strokeWidth="1"
          ></circle>
          <circle
            r={Math.sqrt(13300 / Math.PI) * 0.2 + 4}
            fill="rgb(255, 240, 130)"
            cx={105}
            cy={50}
            stroke="rgb(80,80,80)"
            strokeWidth="1"
          ></circle>
          <circle
            r={Math.sqrt(25934 / Math.PI) * 0.2 + 4}
            fill="rgb(255, 240, 130)"
            cx={170}
            cy={50}
            stroke="rgb(80,80,80)"
            strokeWidth="1"
          ></circle>
          <circle
            r={Math.sqrt(38568 / Math.PI) * 0.2 + 4}
            fill="rgb(255, 240, 130)"
            cx={235}
            cy={50}
            stroke="rgb(80,80,80)"
            strokeWidth="1"
          ></circle>
          <circle
            r={Math.sqrt(51203 / Math.PI) * 0.2 + 4}
            fill="rgb(255, 240, 130)"
            cx={300}
            cy={50}
            stroke="rgb(80,80,80)"
            strokeWidth="1"
          ></circle>
          <text
            textAnchor="middle"
            fill="black"
            fontSize={"13px"}
            x={40}
            y={15}
          >
            666
          </text>
          <text
            textAnchor="middle"
            fill="black"
            fontSize={"13px"}
            x={300}
            y={15}
          >
            51203
          </text>
        </g>
      </svg>
    </div>
  );
};
export default DescriptionNode;
