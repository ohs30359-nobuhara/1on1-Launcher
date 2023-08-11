import ReactDOM from "react-dom";
import React from "react";
import {MainTemplate} from "./template/main";
import OneOnOnePage from "./page/1on1";

const App: React.FC = () => {
  return (
    <MainTemplate>
      <OneOnOnePage/>
    </MainTemplate>
  )
}

window.addEventListener("load", () => {
  ReactDOM.render(<App/>, document.querySelector('#app'));
});
