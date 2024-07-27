"use strict";
const common_vendor = require("../common/vendor.js");
const pages_calendar_config = require("../pages/calendar/config.js");
const useCalendarStore = common_vendor.defineStore("calendar", function() {
  let startDateTime = common_vendor.ref(["", ""]);
  let endDateTime = common_vendor.ref(["", ""]);
  let totalDayHour = common_vendor.ref([]);
  function setAllDayTime(startDateTime_, endDateTime_, totalDayHour_) {
    startDateTime.value = startDateTime_;
    endDateTime.value = endDateTime_;
    totalDayHour.value = totalDayHour_;
  }
  function init() {
    startDateTime.value[0] = common_vendor.dayjs().format("YYYY-MM-DD");
    startDateTime.value[1] = "10:00";
    endDateTime.value[0] = common_vendor.dayjs().add(2, "day").format("YYYY-MM-DD");
    endDateTime.value[1] = "10:00";
    totalDayHour.value[0] = 2;
    totalDayHour.value[1] = 0;
  }
  init();
  return {
    startDateTime,
    endDateTime,
    totalDayHour,
    setAllDayTime,
    weekDay: pages_calendar_config.weekDay
  };
});
exports.useCalendarStore = useCalendarStore;
