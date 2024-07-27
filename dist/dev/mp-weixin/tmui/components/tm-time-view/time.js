"use strict";
const tmui_components_tmTimeView_interface = require("./interface.js");
const tmui_tool_dayjs_esm_index = require("../../tool/dayjs/esm/index.js");
const tmui_tool_dayjs_esm_plugin_isSameOrBefore_index = require("../../tool/dayjs/esm/plugin/isSameOrBefore/index.js");
const tmui_tool_dayjs_esm_plugin_isSameOrAfter_index = require("../../tool/dayjs/esm/plugin/isSameOrAfter/index.js");
const tmui_tool_dayjs_esm_plugin_isBetween_index = require("../../tool/dayjs/esm/plugin/isBetween/index.js");
const DayJs = tmui_tool_dayjs_esm_index.dayjs;
DayJs.extend(tmui_tool_dayjs_esm_plugin_isBetween_index.isBetween);
DayJs.extend(tmui_tool_dayjs_esm_plugin_isSameOrBefore_index.isSameOrBefore);
DayJs.extend(tmui_tool_dayjs_esm_plugin_isSameOrAfter_index.isSameOrAfter);
function rangeTimeArray(dateStr, start, end, detail) {
  let startDayjs = DayJs(start);
  let endDayjs = DayJs(end);
  let dateDayjs = DayJs(dateStr);
  let dateArray = {
    year: [],
    month: [],
    date: [],
    hour: [],
    minute: [],
    second: []
  };
  let startYear = startDayjs.year();
  let endYear = endDayjs.year();
  for (let year = startYear; year <= endYear; year++) {
    dateArray.year.push(year);
  }
  let startMonth = dateDayjs.isSame(startDayjs, "year") ? startDayjs.month() : 0;
  let endMonth = dateDayjs.isSame(endDayjs, "year") ? endDayjs.month() : 11;
  for (let month = startMonth; month <= endMonth; month++) {
    dateArray.month.push(month);
  }
  let startDate = dateDayjs.isSame(startDayjs, "month") ? startDayjs.date() : 1;
  let endDate = dateDayjs.isSame(endDayjs, "month") ? endDayjs.date() : dateDayjs.daysInMonth();
  for (let date = startDate; date <= endDate; date++) {
    dateArray.date.push(date);
  }
  let startHour = dateDayjs.isSame(startDayjs, "date") ? startDayjs.hour() : 0;
  let endHour = dateDayjs.isSame(endDayjs, "date") ? endDayjs.hour() : 23;
  for (let hour = startHour; hour <= endHour; hour++) {
    dateArray.hour.push(hour);
  }
  let startMinute = dateDayjs.isSame(startDayjs, "hour") ? startDayjs.minute() : 0;
  let endMinute = dateDayjs.isSame(endDayjs, "hour") ? endDayjs.minute() : 59;
  for (let minute = startMinute; minute <= endMinute; minute++) {
    dateArray.minute.push(minute);
  }
  let startSecond = dateDayjs.isSame(startDayjs, "minute") ? startDayjs.second() : 0;
  let endSecond = dateDayjs.isSame(endDayjs, "minute") ? endDayjs.second() : 59;
  for (let second = startSecond; second <= endSecond; second++) {
    dateArray.second.push(second);
  }
  return dateArray;
}
function getIndexNowbydate(tmArray, nowtime, detail) {
  const d = DayJs(nowtime);
  [
    [tmui_components_tmTimeView_interface.timeDetailType.year, detail.year],
    [tmui_components_tmTimeView_interface.timeDetailType.month, detail.month],
    [tmui_components_tmTimeView_interface.timeDetailType.day, detail.day],
    [tmui_components_tmTimeView_interface.timeDetailType.hour, detail.hour],
    [tmui_components_tmTimeView_interface.timeDetailType.minute, detail.minute],
    [tmui_components_tmTimeView_interface.timeDetailType.second, detail.second]
  ];
  const order_str = ["year", "month", "date", "hour", "minute", "second"];
  let order = [];
  for (const key of order_str) {
    let keys = key == "date" ? "day" : key;
    if (detail[keys]) {
      order.push(key);
    }
  }
  let idx = [];
  for (let i = 0; i < order.length; i++) {
    let index = tmArray[order[i]].findIndex((n) => n === d.get(order[i]));
    idx.push(index === -1 ? 0 : index);
  }
  return [
    ...idx,
    ...[0, 0, 0, 0, 0, 0]
  ].slice(0, 6);
}
function getNowbyIndex(tmArray, nowIndex, detail, start, end) {
  [
    [tmui_components_tmTimeView_interface.timeDetailType.year, detail.year],
    [tmui_components_tmTimeView_interface.timeDetailType.month, detail.month],
    [tmui_components_tmTimeView_interface.timeDetailType.day, detail.day],
    [tmui_components_tmTimeView_interface.timeDetailType.hour, detail.hour],
    [tmui_components_tmTimeView_interface.timeDetailType.minute, detail.minute],
    [tmui_components_tmTimeView_interface.timeDetailType.second, detail.second]
  ];
  const order_str = ["year", "month", "date", "hour", "minute", "second"];
  let order = [];
  for (const key of order_str) {
    let keys = key == "date" ? "day" : key;
    if (detail[keys]) {
      order.push({
        type: key,
        index: nowIndex[order_str.indexOf(key)]
      });
    }
  }
  for (let i = 0; i < order.length; i++) {
    order[i].index = nowIndex[i];
  }
  function getValue(type) {
    const index = order.findIndex((m) => m.type === type);
    if (index > -1) {
      return tmArray[type][order[index].index];
    }
    return tmArray[type][0];
  }
  let s = DayJs(start);
  let year = detail.year ? getValue(tmui_components_tmTimeView_interface.timeDetailType.year) : s.year();
  let month = detail.month ? getValue(tmui_components_tmTimeView_interface.timeDetailType.month) : s.month();
  let date = detail.day ? getValue(tmui_components_tmTimeView_interface.timeDetailType.day) : s.date();
  let hour = detail.hour ? getValue(tmui_components_tmTimeView_interface.timeDetailType.hour) : s.hour();
  let minute = detail.minute ? getValue(tmui_components_tmTimeView_interface.timeDetailType.minute) : s.minute();
  let second = detail.second ? getValue(tmui_components_tmTimeView_interface.timeDetailType.second) : s.second();
  let str = year + "/" + (month + 1) + "/" + date + " " + hour + ":" + minute + ":" + second;
  return DayJs(str).format("YYYY/MM/DD HH:mm:ss");
}
function checkNowDateisBetween(nowdate, start, end) {
  nowdate = DayJs(nowdate).isValid() ? DayJs(nowdate) : DayJs();
  start = DayJs(start);
  end = DayJs(end);
  if (nowdate.isSameOrBefore(start)) {
    return start.format("YYYY/MM/DD HH:mm:ss");
  }
  if (nowdate.isSameOrAfter(end)) {
    return end.format("YYYY/MM/DD HH:mm:ss");
  }
  return nowdate.format("YYYY/MM/DD HH:mm:ss");
}
exports.checkNowDateisBetween = checkNowDateisBetween;
exports.getIndexNowbydate = getIndexNowbydate;
exports.getNowbyIndex = getNowbyIndex;
exports.rangeTimeArray = rangeTimeArray;
