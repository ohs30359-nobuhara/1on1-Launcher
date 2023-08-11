import ReactDOM from "react-dom";
import React from "react";
import {MainTemplate} from "./template/main";
import OneOnOnePage from "./page/1on1";
import MembersPage from "./page/membersPage";
import {BacklogPage} from "./page/backlog";

const App: React.FC = () => {
  return (
    <MainTemplate>
      <BacklogPage></BacklogPage>
    </MainTemplate>
  )
}

window.addEventListener("load", () => {
  ReactDOM.render(<App/>, document.querySelector('#app'));
});
