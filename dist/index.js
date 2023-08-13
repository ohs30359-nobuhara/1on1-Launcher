"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_dom_1 = __importDefault(require("react-dom"));
var react_1 = __importDefault(require("react"));
var main_1 = require("./template/main");
var _1on1_1 = __importDefault(require("./page/1on1"));
var members_1 = __importDefault(require("./page/members"));
var backlog_1 = require("./page/backlog");
var pageKey_1 = require("./pageKey");
var ri_1 = require("react-icons/ri");
var gi_1 = require("react-icons/gi");
var tb_1 = require("react-icons/tb");
var pages = [
    {
        menuIcon: (<ri_1.RiTeamLine className="menu-icon"/>),
        menuTitle: "Members",
        component: (<members_1.default />),
        key: pageKey_1.PageKey.Members
    },
    {
        menuIcon: (<gi_1.GiTalk className="menu-icon"/>),
        menuTitle: "1on1",
        component: (<_1on1_1.default />),
        key: pageKey_1.PageKey.OneOnOne
    },
    {
        menuIcon: (<tb_1.TbNotes className="menu-icon"/>),
        menuTitle: "Backlog",
        component: (<backlog_1.BacklogPage />),
        key: pageKey_1.PageKey.Backlog
    }
];
var App = function () {
    return (<main_1.MainTemplate pages={pages}/>);
};
window.addEventListener("load", function () {
    react_dom_1.default.render(<App />, document.querySelector('#app'));
});
//# sourceMappingURL=index.js.map