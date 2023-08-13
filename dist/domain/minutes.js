"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Minutes = void 0;
var file_1 = require("../utils/file");
var dateformat_1 = require("../utils/dateformat");
var Minutes = /** @class */ (function () {
    function Minutes(date, body) {
        this.date = date;
        this.body = body;
    }
    Minutes.prototype.save = function () {
        var dtStr = (0, dateformat_1.formatDate)(new Date(), "YYYY-MM-DD");
        (0, file_1.write)(this.body, "".concat(dtStr, ".json"), "./backlog");
    };
    /**
     * 当日日付で作成する
     * @param body
     * @constructor
     */
    Minutes.createTodayMinutes = function (body) {
        var dtStr = (0, dateformat_1.formatDate)(new Date(), "YYYY-MM-DD");
        return new Minutes(dtStr, body);
    };
    return Minutes;
}());
exports.Minutes = Minutes;
//# sourceMappingURL=minutes.js.map