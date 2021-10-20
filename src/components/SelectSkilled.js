import "bulma/css/bulma.css";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  mousePositionState,
  selectedNodeNameState,
  showSelectedSkilledCardState,
} from "../atom";

const SelectSkilled = () => {
  const [mousePosition, setMousePosition] = useRecoilState(mousePositionState);
  const [showSelectedSkilledCard, setShowSelectedSkilledCard] = useRecoilState(
    showSelectedSkilledCardState
  );
  const [selectedNodeName, setSelectedNodeName] = useRecoilState(
    selectedNodeNameState
  );
  const [level, setLevel] = useState(localStorage[selectedNodeName]);
  function outHandle() {
    setShowSelectedSkilledCard(false);
    setMousePosition([]);
  }
  function onLevelChange(e) {
    localStorage[selectedNodeName] = e.target.value;
    setLevel(e.target.value);
    setShowSelectedSkilledCard(false);
  }
  return (
    <div
      className="card"
      style={{
        position: "absolute",
        left: mousePosition[0] - 30,
        top: mousePosition[1] - 90,
      }}
      onMouseLeave={() => outHandle()}
    >
      <div className="card-content">
        <div className="content">
          習熟度を選択
          <div className="control">
            <label className="radio">
              {level === "3" ? (
                <input
                  type="radio"
                  name="level"
                  value="3"
                  onChange={(e) => onLevelChange(e)}
                  checked
                />
              ) : (
                <input
                  type="radio"
                  name="level"
                  value="3"
                  onChange={(e) => onLevelChange(e)}
                />
              )}
              かなりできる
            </label>
            <br />
            <label className="radio">
              {level === "2" ? (
                <input
                  type="radio"
                  name="level"
                  value="2"
                  onChange={(e) => onLevelChange(e)}
                  checked
                />
              ) : (
                <input
                  type="radio"
                  name="level"
                  value="2"
                  onChange={(e) => onLevelChange(e)}
                />
              )}
              そこそこできる
            </label>
            <br />
            <label className="radio">
              {level === "1" ? (
                <input
                  type="radio"
                  name="level"
                  value="1"
                  onChange={(e) => onLevelChange(e)}
                  checked
                />
              ) : (
                <input
                  type="radio"
                  name="level"
                  value="1"
                  onChange={(e) => onLevelChange(e)}
                />
              )}
              全然できない
            </label>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSkilled;
