"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageManager = void 0;
var PageManager = /** @class */ (function () {
    function PageManager() {
        this.pages = new Map();
        this.changeHandler = function () { };
    }
    PageManager.prototype.setOption = function (pages, changeHandler) {
        var _this = this;
        pages.forEach(function (p) { return _this.pages.set(p.key, p); });
        this.changeHandler = changeHandler;
    };
    PageManager.prototype.change = function (key) {
        var op = this.pages.get(key);
        if (!op) {
            console.error("".concat(key, " is not found"));
            return;
        }
        this.changeHandler(op);
    };
    PageManager.prototype.getPage = function () {
        return Array.from(this.pages.values());
    };
    return PageManager;
}());
exports.pageManager = new PageManager();
//# sourceMappingURL=pageManager.js.map