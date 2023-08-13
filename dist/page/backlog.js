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
exports.BacklogPage = void 0;
var react_1 = __importStar(require("react"));
var react_bootstrap_1 = require("react-bootstrap");
var ai_1 = require("react-icons/ai");
var BacklogPage = function (props) {
    var _a = (0, react_1.useState)(''), selectedDate = _a[0], setSelectedDate = _a[1];
    var _b = (0, react_1.useState)(''), selectedOption = _b[0], setSelectedOption = _b[1];
    var handleDateChange = function (event) {
        setSelectedDate(event.target.value);
    };
    var handleSearch = function () {
        // 検索ボタンが押されたときの処理
        console.log('Selected Date:', selectedDate);
        console.log('Selected Option:', selectedOption);
    };
    return (<react_bootstrap_1.Container>
      <div className="card" style={{ padding: 20 }}>
        <div className="d-flex align-items-center" style={{ padding: 20 }}>
          <div className="mr-3">
            <react_bootstrap_1.Form.Control type="date" value={selectedDate} onChange={handleDateChange}/>
          </div>
          <div className="mr-3">
            <react_bootstrap_1.Form.Control as="select" value={selectedOption}>
              <option value="">選択してください</option>
              <option value="option1">オプション1</option>
              <option value="option2">オプション2</option>
              <option value="option3">オプション3</option>
            </react_bootstrap_1.Form.Control>
          </div>
          <react_bootstrap_1.Button variant="primary" size="sm" onClick={handleSearch}>検索</react_bootstrap_1.Button>
        </div>
        <table className="table">
          <thead>
          <tr>
            <th>実施日</th>
            <th>対象者</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>2023/11/11</td>
            <td>suzuki</td>
            <td>
              <react_bootstrap_1.Button variant="primary" size="sm" className="save-button" style={{ marginRight: 10 }}> 確認 <ai_1.AiOutlineSearch className="menu-icon"/> </react_bootstrap_1.Button>
              <react_bootstrap_1.Button variant="danger" size="sm" className="save-button">  削除 <ai_1.AiOutlineDelete className="menu-icon"/> </react_bootstrap_1.Button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </react_bootstrap_1.Container>);
};
exports.BacklogPage = BacklogPage;
//# sourceMappingURL=backlog.js.map