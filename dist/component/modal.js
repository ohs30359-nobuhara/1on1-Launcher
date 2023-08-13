"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentsModal = void 0;
var react_1 = __importDefault(require("react"));
var react_bootstrap_1 = require("react-bootstrap");
var ContentsModal = function (props) {
    return (<react_bootstrap_1.Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <react_bootstrap_1.Modal.Header closeButton>
        <react_bootstrap_1.Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </react_bootstrap_1.Modal.Title>
      </react_bootstrap_1.Modal.Header>
      <react_bootstrap_1.Modal.Body>
        {props.children}
      </react_bootstrap_1.Modal.Body>
      <react_bootstrap_1.Modal.Footer>
        <react_bootstrap_1.Button onClick={props.onHide}>Close</react_bootstrap_1.Button>
      </react_bootstrap_1.Modal.Footer>
    </react_bootstrap_1.Modal>);
};
exports.ContentsModal = ContentsModal;
//# sourceMappingURL=modal.js.map