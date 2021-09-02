import { render } from "react-dom";
import App from "./App";
import { RecoilRoot } from "recoil";

render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.querySelector("#content")
);
