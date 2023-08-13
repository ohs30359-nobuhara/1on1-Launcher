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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_bootstrap_1 = require("react-bootstrap");
var bs_1 = require("react-icons/bs");
var ci_1 = require("react-icons/ci");
var modal_1 = require("../component/modal");
var overture_1 = require("../component/overture");
var OneOnOnePage = function () {
    var _a = (0, react_1.useState)(''), previousNotes = _a[0], setPreviousNotes = _a[1];
    var _b = (0, react_1.useState)(''), currentMeeting = _b[0], setCurrentMeeting = _b[1];
    var _c = (0, react_1.useState)(''), nextAction = _c[0], setNextAction = _c[1];
    var _d = (0, react_1.useState)([]), nextActionsList = _d[0], setNextActionsList = _d[1];
    var _e = react_1.default.useState(false), overtureModalShow = _e[0], setOvertureModalShow = _e[1];
    var _f = react_1.default.useState(false), backlogModalShow = _f[0], setBacklogModalShow = _f[1];
    var handleSave = function () {
    };
    var handleAddNextAction = function () {
        if (nextAction.trim() !== '') {
            setNextActionsList(__spreadArray(__spreadArray([], nextActionsList, true), [nextAction], false));
            setNextAction('');
        }
    };
    var handleDeleteNextAction = function (index) {
        var updatedActions = nextActionsList.filter(function (_, i) { return i !== index; });
        setNextActionsList(updatedActions);
    };
    return (<react_bootstrap_1.Container className="my-4">
      <react_bootstrap_1.Row className="mt-1">
        <react_bootstrap_1.Col>
          <h3>議事録</h3>
          <div className="textarea-toolbox">
            <react_bootstrap_1.ButtonToolbar>
              <react_bootstrap_1.Button variant="link" className="mr-3" onClick={function () { return setOvertureModalShow(true); }}>
                <bs_1.BsLightbulb className="menu-icon textarea-toolbox-item"/>
              </react_bootstrap_1.Button>
              <react_bootstrap_1.Button variant="link" onClick={function () { return setBacklogModalShow(true); }}>
                <ci_1.CiStickyNote className="menu-icon textarea-toolbox-item"/>
              </react_bootstrap_1.Button>
              {/* 他の編集ツールのボタンを追加 */}
            </react_bootstrap_1.ButtonToolbar>
          </div>
          <react_bootstrap_1.Form>
            <react_bootstrap_1.Form.Group controlId="currentMeeting">
              <react_bootstrap_1.Form.Control as="textarea" rows={8} value={currentMeeting} onChange={function (e) { return setCurrentMeeting(e.target.value); }} style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0' }}/>
            </react_bootstrap_1.Form.Group>
          </react_bootstrap_1.Form>
        </react_bootstrap_1.Col>
      </react_bootstrap_1.Row>
      <react_bootstrap_1.Row className="mt-5">
        <react_bootstrap_1.Col>
          <div className="next-action">
            <h2>アクションアイテム</h2>
            <react_bootstrap_1.Form>
              <react_bootstrap_1.InputGroup className="mb-3">
                <react_bootstrap_1.Form.Control type="text" value={nextAction} onChange={function (e) { return setNextAction(e.target.value); }}/>
                <react_bootstrap_1.Button variant="success" onClick={handleAddNextAction}>追加</react_bootstrap_1.Button>
              </react_bootstrap_1.InputGroup>
            </react_bootstrap_1.Form>
          </div>
        </react_bootstrap_1.Col>
      </react_bootstrap_1.Row>
      <react_bootstrap_1.Row className="mt-2">
        <react_bootstrap_1.Col>
          <div className="next-action-list">
            <react_bootstrap_1.ListGroup>
              {nextActionsList.map(function (action, index) { return (<react_bootstrap_1.ListGroup.Item key={index} className="d-flex align-items-center">
                  <span className="flex-grow-1">{action}</span>
                  <react_bootstrap_1.CloseButton onClick={function () { return handleDeleteNextAction(index); }}/>
                </react_bootstrap_1.ListGroup.Item>); })}
            </react_bootstrap_1.ListGroup>
          </div>
        </react_bootstrap_1.Col>
      </react_bootstrap_1.Row>
      <react_bootstrap_1.Row className="mt-4">
        <react_bootstrap_1.Col>
          <div className="d-grid gap-2">
            <react_bootstrap_1.Button variant="primary" onClick={handleSave} className="save-button">
              保存する
            </react_bootstrap_1.Button>
          </div>
        </react_bootstrap_1.Col>
      </react_bootstrap_1.Row>

      <modal_1.ContentsModal show={overtureModalShow} onHide={function () { return setOvertureModalShow(false); }} title={"話したい議題を選んでください"}>
        <overture_1.Overture />
      </modal_1.ContentsModal>

      <modal_1.ContentsModal show={backlogModalShow} onHide={function () { return setBacklogModalShow(false); }} title={"前回の1on1"}>
        <div></div>
      </modal_1.ContentsModal>

    </react_bootstrap_1.Container>);
};
exports.default = OneOnOnePage;
//# sourceMappingURL=1on1.js.map