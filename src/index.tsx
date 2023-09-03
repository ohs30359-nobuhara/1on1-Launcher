import ReactDOM from "react-dom";
import React from "react";
import {MainTemplate} from "./template/main";
import OneOnOnePage from "./page/1on1";
import Members from "./page/members";
import {BacklogPage} from "./page/backlog";
import {PageOption} from "./pageManager";
import {Enum} from "./enum";
import {RiTeamLine} from 'react-icons/ri';
import {GiTalk} from 'react-icons/gi';
import {TbNotes} from 'react-icons/tb';
import {AiOutlinePlusCircle} from "react-icons/ai";
import {EditMember} from "./page/editMember";
import {MinutesPage} from "./page/minutes";
import {PersonnelPage} from "./page/personnelPage";


const pages: PageOption[] = [
  {
    component: (<Members/>),
    key: Enum.Members,
    menu: {
      menuIcon: (<RiTeamLine className="menu-icon" />),
      menuTitle: "Members",
    }
  },
  {
    component: (<OneOnOnePage/>),
    key: Enum.OneOnOne,
    menu: {
      menuIcon: (<GiTalk className="menu-icon" />),
      menuTitle: "1on1",
    }
  },
  {
    component: (<BacklogPage/>),
    key: Enum.Backlog,
    menu: {
      menuIcon: (<TbNotes className="menu-icon" />),
      menuTitle: "Backlog",
    }
  },
  {
    component: (<EditMember/>),
    key: Enum.AddMember,
    menu: {
      menuIcon: (<AiOutlinePlusCircle className="menu-icon" />),
      menuTitle: "Add Member",
    }
  },
  {
    component: (<MinutesPage/>),
    key: Enum.Minutes,
  },
  {
    component: (<PersonnelPage/>),
    key: Enum.Personnel
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
