"use strict";
const tmui_tool_dayjs_esm_constant = require("../../constant.js");
var isoWeekPrettyUnit = "isoweek";
const isoWeek = function(o, c, d) {
  var getYearFirstThursday = function getYearFirstThursday2(year, isUtc) {
    var yearFirstDay = (isUtc ? d.utc : d)().year(year).startOf(tmui_tool_dayjs_esm_constant.Y);
    var addDiffDays = 4 - yearFirstDay.isoWeekday();
    if (yearFirstDay.isoWeekday() > 4) {
      addDiffDays += 7;
    }
    return yearFirstDay.add(addDiffDays, tmui_tool_dayjs_esm_constant.D);
  };
  var getCurrentWeekThursday = function getCurrentWeekThursday2(ins) {
    return ins.add(4 - ins.isoWeekday(), tmui_tool_dayjs_esm_constant.D);
  };
  var proto = c.prototype;
  proto.isoWeekYear = function() {
    var nowWeekThursday = getCurrentWeekThursday(this);
    return nowWeekThursday.year();
  };
  proto.isoWeek = function(week) {
    if (!this.$utils().u(week)) {
      return this.add((week - this.isoWeek()) * 7, tmui_tool_dayjs_esm_constant.D);
    }
    var nowWeekThursday = getCurrentWeekThursday(this);
    var diffWeekThursday = getYearFirstThursday(this.isoWeekYear(), this.$u);
    return nowWeekThursday.diff(diffWeekThursday, tmui_tool_dayjs_esm_constant.W) + 1;
  };
  proto.isoWeekday = function(week) {
    if (!this.$utils().u(week)) {
      return this.day(this.day() % 7 ? week : week - 7);
    }
    return this.day() || 7;
  };
  var oldStartOf = proto.startOf;
  proto.startOf = function(units, startOf) {
    var utils = this.$utils();
    var isStartOf = !utils.u(startOf) ? startOf : true;
    var unit = utils.p(units);
    if (unit === isoWeekPrettyUnit) {
      return isStartOf ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day");
    }
    return oldStartOf.bind(this)(units, startOf);
  };
};
exports.isoWeek = isoWeek;
