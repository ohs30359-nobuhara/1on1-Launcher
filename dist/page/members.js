"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_bootstrap_1 = require("react-bootstrap");
/**
 * MemberProfile Component
 * @constructor
 */
var MemberProfile = function (props) {
    // "YYYY/MM/DD"形式の日付文字列を受け取り、現在の日付との差を計算
    function calculateDaysAgo(targetDateStr) {
        var targetDate = new Date(targetDateStr);
        var currentDate = new Date();
        var timeDifference = currentDate.getTime() - targetDate.getTime();
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }
    return (<react_bootstrap_1.Card className="mb-4">
      <div className="d-flex align-items-start p-3">
        <div className="flex-grow-1">
          <div className="d-flex align-items-center">
            <h3 className="mb-0 mr-2">{props.name}</h3>
            <span className="text-muted">·</span>
            <span className="text-muted ml-2">assign {props.assignDate}</span>
          </div>
          <div className="d-flex align-items-center mt-2">
            <span className="text-muted">Last 1on1 was {calculateDaysAgo(props.last1on1Date)} days ago</span>
          </div>
        </div>
        <react_bootstrap_1.Button variant="outline-primary" className="ml-3">詳細</react_bootstrap_1.Button>
      </div>
    </react_bootstrap_1.Card>);
};
var Members = function () {
    var memberStatus = [
        { name: "suzuki", last1on1Date: "2022/11/01", assignDate: "2023/08/03" },
        { name: "tanaka", last1on1Date: "2023/01/01", assignDate: "2023/08/01" },
    ];
    return (<react_bootstrap_1.Container>
      {memberStatus.map(function (m, i) {
            return (<MemberProfile key={i} name={m.name} assignDate={m.assignDate} last1on1Date={m.last1on1Date}/>);
        })}
    </react_bootstrap_1.Container>);
};
exports.default = Members;
//# sourceMappingURL=members.js.map