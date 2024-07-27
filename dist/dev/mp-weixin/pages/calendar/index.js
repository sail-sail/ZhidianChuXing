"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_calendar_config = require("./config.js");
const store_calendar = require("../../store/calendar.js");
if (!Array) {
  const _easycom_tm_calendar_view2 = common_vendor.resolveComponent("tm-calendar-view");
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  const _easycom_tm_drawer2 = common_vendor.resolveComponent("tm-drawer");
  (_easycom_tm_calendar_view2 + _easycom_tm_button2 + _easycom_tm_drawer2)();
}
const _easycom_tm_calendar_view = () => "../../tmui/components/tm-calendar-view/tm-calendar-view.js";
const _easycom_tm_button = () => "../../tmui/components/tm-button/tm-button.js";
const _easycom_tm_drawer = () => "../../tmui/components/tm-drawer/tm-drawer.js";
if (!Math) {
  (_easycom_tm_calendar_view + _easycom_tm_button + _easycom_tm_drawer)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const calendarStore = store_calendar.useCalendarStore();
    let startDateTime = common_vendor.ref(calendarStore.startDateTime);
    let endDateTime = common_vendor.ref(calendarStore.endDateTime);
    let totalDayHour = common_vendor.ref(calendarStore.totalDayHour);
    let calendarValue = common_vendor.ref([]);
    let showWin = common_vendor.ref(false);
    let activeIndex = common_vendor.ref();
    let type = common_vendor.ref(void 0);
    let disabledIndex = common_vendor.ref();
    function handleClick(e) {
      if (typeof e === "string") {
        if (startDateTime.value[0] === "") {
          startDateTime.value[0] = e;
          calendarValue.value[0] = e;
          endDateTime.value[0] = "";
          endDateTime.value[1] = "";
          totalDayHour.value = [];
          activeIndex.value = void 0;
          getDisabledIndex("start");
          type.value = "start";
          showWin.value = true;
        } else if (endDateTime.value[0] !== "") {
          if (calendarValue.value[1])
            calendarValue.value.pop();
          startDateTime.value[0] = e;
          calendarValue.value[0] = e;
          endDateTime.value[0] = "";
          endDateTime.value[1] = "";
          totalDayHour.value = [];
          activeIndex.value = void 0;
          getDisabledIndex("start");
          type.value = "start";
          showWin.value = true;
        } else {
          if (common_vendor.dayjs(e).unix() > common_vendor.dayjs(startDateTime.value[0]).unix()) {
            endDateTime.value[0] = e;
            calendarValue.value[1] = e;
            activeIndex.value = void 0;
            getDisabledIndex("end");
            type.value = "end";
            showWin.value = true;
          } else {
            startDateTime.value[0] = "";
            startDateTime.value[1] = "";
            endDateTime.value[0] = "";
            endDateTime.value[1] = "";
            totalDayHour.value = [];
            calendarValue.value = [];
            activeIndex.value = void 0;
            type.value = void 0;
            showWin.value = false;
          }
        }
        if (startDateTime.value[0] && startDateTime.value[0] !== "" && endDateTime.value[0] && endDateTime.value[0] !== "") {
          let day = common_vendor.dayjs(endDateTime.value[0]).diff(common_vendor.dayjs(startDateTime.value[0]), "day");
          totalDayHour.value[0] = day;
        }
        calendarStore.setAllDayTime(startDateTime.value, endDateTime.value, totalDayHour.value);
      }
    }
    function getDisabledIndex(type2) {
      if (type2 === "start") {
        if (common_vendor.dayjs(startDateTime.value[0]).format("YYYY-MM-DD") === common_vendor.dayjs().format("YYYY-MM-DD")) {
          let tempStr = common_vendor.dayjs().hour() < 10 ? `0${String(common_vendor.dayjs().hour())}` : `${String(common_vendor.dayjs().hour())}`;
          let lastIndex = pages_calendar_config.timeArray.findLastIndex((item) => item.includes(tempStr));
          disabledIndex.value = lastIndex + 1 <= 47 ? lastIndex + 1 : lastIndex;
        }
      } else {
        disabledIndex.value = void 0;
      }
    }
    function chooseTime(index) {
      activeIndex.value = index;
    }
    function handleOk() {
      if (!activeIndex.value)
        return;
      const chooseTimeItem = pages_calendar_config.timeArray[activeIndex.value];
      if (type.value === "start") {
        startDateTime.value[1] = chooseTimeItem;
      } else if (type.value === "end") {
        endDateTime.value[1] = chooseTimeItem;
      }
      if (startDateTime.value[1] && startDateTime.value[1] !== "" && endDateTime.value[1] && endDateTime.value[0] !== "") {
        let hour = pages_calendar_config.timeObj[endDateTime.value[1]] - pages_calendar_config.timeObj[startDateTime.value[1]];
        if (hour > 0) {
          totalDayHour.value[1] = hour;
        } else {
          totalDayHour.value[0] = totalDayHour.value[0] - 1;
          totalDayHour.value[1] = hour + 24;
        }
      }
      calendarStore.setAllDayTime(startDateTime.value, endDateTime.value, totalDayHour.value);
    }
    function goBack() {
      common_vendor.index.navigateBack();
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleClick),
        b: common_vendor.o(($event) => common_vendor.isRef(calendarValue) ? calendarValue.value = $event : calendarValue = $event),
        c: common_vendor.p({
          color: "green",
          model: "rang",
          hideButton: true,
          start: /* @__PURE__ */ new Date(),
          modelValue: common_vendor.unref(calendarValue)
        }),
        d: common_vendor.t(common_vendor.unref(startDateTime)[0]),
        e: common_vendor.t(common_vendor.unref(startDateTime)[1]),
        f: common_vendor.t(common_vendor.unref(totalDayHour)[0] ? common_vendor.unref(totalDayHour)[0] + "天" : null),
        g: common_vendor.t(common_vendor.unref(totalDayHour)[1] ? common_vendor.unref(totalDayHour)[1] + "时" : null),
        h: common_vendor.t(common_vendor.unref(endDateTime)[0]),
        i: common_vendor.t(common_vendor.unref(endDateTime)[1]),
        j: common_vendor.p({
          color: "rgb(100,200,36)",
          ["font-color"]: "white",
          block: true
        }),
        k: common_vendor.o(goBack),
        l: common_vendor.p({
          ["font-color"]: "#000",
          block: true
        }),
        m: common_vendor.f(common_vendor.unref(pages_calendar_config.timeArray), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: item,
            c: common_vendor.o(($event) => chooseTime(index), item),
            d: "03f4b073-4-" + i0 + ",03f4b073-3",
            e: common_vendor.p({
              transprent: common_vendor.unref(activeIndex) === index ? true : false,
              color: "green",
              fontColor: "#000",
              disabled: common_vendor.unref(disabledIndex) ? index < common_vendor.unref(disabledIndex) : false,
              width: 125
            })
          };
        }),
        n: common_vendor.o(handleOk),
        o: common_vendor.o(($event) => common_vendor.isRef(showWin) ? showWin.value = $event : showWin = $event),
        p: common_vendor.p({
          height: 1300,
          placement: "bottom",
          hideCancel: true,
          overlayClick: false,
          show: common_vendor.unref(showWin)
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-03f4b073"], ["__file", "D:/zhidianUniapp/src/pages/calendar/index.vue"]]);
wx.createPage(MiniProgramPage);
