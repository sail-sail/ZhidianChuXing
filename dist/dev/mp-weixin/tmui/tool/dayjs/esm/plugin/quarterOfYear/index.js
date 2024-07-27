"use strict";
const tmui_tool_dayjs_esm_constant = require("../../constant.js");
const QuarterOfYear = function(o, c) {
  var proto = c.prototype;
  proto.quarter = function(quarter) {
    if (!this.$utils().u(quarter)) {
      return this.month(this.month() % 3 + (quarter - 1) * 3);
    }
    return Math.ceil((this.month() + 1) / 3);
  };
  var oldAdd = proto.add;
  proto.add = function(number, units) {
    number = Number(number);
    var unit = this.$utils().p(units);
    if (unit === tmui_tool_dayjs_esm_constant.Q) {
      return this.add(number * 3, tmui_tool_dayjs_esm_constant.M);
    }
    return oldAdd.bind(this)(number, units);
  };
  var oldStartOf = proto.startOf;
  proto.startOf = function(units, startOf) {
    var utils = this.$utils();
    var isStartOf = !utils.u(startOf) ? startOf : true;
    var unit = utils.p(units);
    if (unit === tmui_tool_dayjs_esm_constant.Q) {
      var quarter = this.quarter() - 1;
      return isStartOf ? this.month(quarter * 3).startOf(tmui_tool_dayjs_esm_constant.M).startOf(tmui_tool_dayjs_esm_constant.D) : this.month(quarter * 3 + 2).endOf(tmui_tool_dayjs_esm_constant.M).endOf(tmui_tool_dayjs_esm_constant.D);
    }
    return oldStartOf.bind(this)(units, startOf);
  };
};
exports.QuarterOfYear = QuarterOfYear;
