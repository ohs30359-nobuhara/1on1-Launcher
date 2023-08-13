import ReactDOM from "react-dom";
import React from "react";
import {MainTemplate} from "./template/main";
import OneOnOnePage from "./page/1on1";
import Members from "./page/members";
import {BacklogPage} from "./page/backlog";
import {PageOption} from "./pageManager";
import {Enum} from "./enum";
import { RiTeamLine } from 'react-icons/ri';
import { GiTalk } from 'react-icons/gi';
import { TbNotes } from 'react-icons/tb';


const pages: PageOption[] = [
  {
    menuIcon: (<RiTeamLine className="menu-icon" />),
    menuTitle: "Members",
    component: (<Members/>),
    key: Enum.Members
  },
  {
    menuIcon: (<GiTalk className="menu-icon" />),
    menuTitle: "1on1",
    component: (<OneOnOnePage/>),
    key: Enum.OneOnOne
  },
  {
    menuIcon: (<TbNotes className="menu-icon" />),
    menuTitle: "Backlog",
    component: (<BacklogPage/>),
    key: Enum.Backlog
  }
]


const App: React.FC = () => {
  return (
    <MainTemplate pages={pages} />
  )
}

window.addEventListener("load", () => {
  ReactDOM.render(<App/>, document.querySelector('#app'));
});
