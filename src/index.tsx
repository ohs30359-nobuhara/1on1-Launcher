import ReactDOM from "react-dom";
import React from "react";
import {MainTemplate} from "./template/main";
import OneOnOnePage from "./page/1on1";
import Members from "./page/members";

const App: React.FC = () => {
  return (
    <MainTemplate>
      <Members></Members>
    </MainTemplate>
  )
}

window.addEventListener("load", () => {
  ReactDOM.render(<App/>, document.querySelector('#app'));
});
