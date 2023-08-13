"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainTemplate = void 0;
var react_1 = __importStar(require("react"));
var react_bootstrap_1 = require("react-bootstrap");
var pageManager_1 = require("../pageManager");
var MainMenu = function () {
    var _a = (0, react_1.useState)(window.innerHeight), menuHeight = _a[0], setMenuHeight = _a[1];
    var updateMenuHeight = function () {
        setMenuHeight(window.innerHeight);
    };
    // メニューの高さをリサイズに合わせてbrowserの高さに揃える
    (0, react_1.useEffect)(function () {
        window.addEventListener('resize', updateMenuHeight);
        return function () {
            window.removeEventListener('resize', updateMenuHeight);
        };
    }, []);
    var fontStyle = {
        fontSize: "20px",
        color: "white"
    };
    var spanStyle = {
        marginLeft: "20px"
    };
    var menuContainerStyle = {
        height: "".concat(menuHeight, "px"),
        overflowY: 'auto', // メニューがブラウジングエリアを超えた場合にスクロールを有効にする
    };
    return (<div style={menuContainerStyle}>
       <react_bootstrap_1.Nav className="flex-column">
         {pageManager_1.pageManager.getPage().map(function (page) {
            return (<react_bootstrap_1.Nav.Link eventKey="link" className="d-flex align-items-center" style={fontStyle} onClick={function () { return pageManager_1.pageManager.change(page.key); }}>
                 {page.menuIcon}
                 <span className="ml-2" style={spanStyle}>{page.menuTitle}</span>
               </react_bootstrap_1.Nav.Link>);
        })}
      </react_bootstrap_1.Nav>
    </div>);
};
var MainTemplate = function (props) {
    var _a = (0, react_1.useState)(null), page = _a[0], setPage = _a[1];
    // ページマネージャーにページ一覧と更新用のメソッドを登録
    pageManager_1.pageManager.setOption(props.pages, function (page) { return setPage(page.component); });
    return (<react_bootstrap_1.Container fluid className="p-0">
      <react_bootstrap_1.Row>
        <react_bootstrap_1.Col sm={3} style={{ paddingTop: 30, backgroundColor: "#343A40", maxWidth: "250px" }}>
          <MainMenu />
        </react_bootstrap_1.Col>
        <react_bootstrap_1.Col sm={9} className="p-4">
          {page}
        </react_bootstrap_1.Col>
      </react_bootstrap_1.Row>
    </react_bootstrap_1.Container>);
};
exports.MainTemplate = MainTemplate;
//# sourceMappingURL=main.js.map