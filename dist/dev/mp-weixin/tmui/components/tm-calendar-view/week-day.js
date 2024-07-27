"use strict";
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_dayjs_esm_index = require("../../tool/dayjs/esm/index.js");
const tmui_tool_dayjs_esm_plugin_isoWeek_index = require("../../tool/dayjs/esm/plugin/isoWeek/index.js");
const tmui_tool_dayjs_esm_plugin_isSameOrBefore_index = require("../../tool/dayjs/esm/plugin/isSameOrBefore/index.js");
const tmui_tool_dayjs_esm_plugin_isSameOrAfter_index = require("../../tool/dayjs/esm/plugin/isSameOrAfter/index.js");
const tmui_tool_dayjs_esm_plugin_isBetween_index = require("../../tool/dayjs/esm/plugin/isBetween/index.js");
const tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
require("../../tool/dayjs/esm/constant.js");
require("../../tool/dayjs/esm/locale/en.js");
require("../../tool/dayjs/esm/utils.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
if (!Math) {
  (tmIcon + tmText + tmSheet + tmButton)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmText = () => "../tm-text/tm-text.js";
const tmButton = () => "../tm-button/tm-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "week-day",
  props: {
    followTheme: {
      type: Boolean,
      default: true
    },
    //默认显示的日期，自动转换为当前的周次。只会取第一个时间判断当前周次。
    defaultValue: {
      type: Array,
      default: () => []
    },
    //当前的周时间段，本年度周一至周日的时间范围段。
    modelValue: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: "primary"
    },
    linear: {
      type: String,
      default: ""
    },
    linearDeep: {
      type: String,
      default: "light"
    },
    //指的是：有效的可选时间，小于此时间，不允许选中。
    start: {
      type: [String, Number, Date],
      default: ""
    },
    //指的是：有效的可选时间，大于此时间，不允许选中。
    end: {
      type: [String, Number, Date],
      default: ""
    },
    //隐藏头部操作栏
    hideTool: {
      type: Boolean,
      default: false
    },
    //隐藏底部确认按钮
    hideButton: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: "确认"
    },
    //周次，本日、本季、本年、本月、本周的文字请按顺序提供文本，方便定义其它语言。
    textUnit: {
      type: Array,
      default: ["周次", "一", "二", "三", "四", "五", "六", "日", "本日", "本周", "本月", "本季度", "本年", "月", "第${x}季度", "年"]
    }
  },
  emits: ["update:modelValue", "confirm", "click-week", "change"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const _color = common_vendor.computed(() => {
      if (props.followTheme && store.tmStore.color)
        return store.tmStore.color;
      return props.color;
    });
    const _confirmText = common_vendor.computed(() => props.confirmText);
    const DayJs = tmui_tool_dayjs_esm_index.dayjs;
    DayJs.extend(tmui_tool_dayjs_esm_plugin_isoWeek_index.isoWeek);
    DayJs.extend(tmui_tool_dayjs_esm_plugin_isSameOrBefore_index.isSameOrBefore);
    DayJs.extend(tmui_tool_dayjs_esm_plugin_isSameOrAfter_index.isSameOrAfter);
    DayJs.extend(tmui_tool_dayjs_esm_plugin_isBetween_index.isBetween);
    const _value = common_vendor.ref(DayJs(props.defaultValue[0]).isValid() ? DayJs(props.defaultValue[0]) : DayJs());
    const _weekNum = common_vendor.ref(getNowWeek(_value.value));
    const weekStr = props.textUnit.slice(0, 8);
    const _data = common_vendor.ref([]);
    const _dataWeek = common_vendor.ref([]);
    const _start_date = common_vendor.computed(() => {
      let isv = DayJs(props.start).isValid();
      return isv ? DayJs(props.start) : DayJs("1980-1-1");
    });
    const _end_date = common_vendor.computed(() => {
      let isv = DayJs(props.end).isValid();
      return isv ? DayJs(props.end) : DayJs("2450-1-1");
    });
    const _nowDate = common_vendor.computed(() => {
      return _value.value.format("YYYY-MM");
    });
    _data.value = getWeekOfMonthArray();
    common_vendor.watch(
      () => props.modelValue,
      () => {
        var _a;
        if (!Array.isArray(props.modelValue))
          return;
        let date_str = (_a = props.modelValue[0]) != null ? _a : "";
        _value.value = DayJs(date_str).isValid() ? DayJs(date_str) : DayJs();
        _weekNum.value = getNowWeek(_value.value);
        _data.value = getWeekOfMonthArray();
      },
      { deep: true }
    );
    function getNowWeek(str = "") {
      if (DayJs(str).isValid()) {
        return DayJs(str).isoWeek();
      } else {
        return DayJs().isoWeek();
      }
    }
    function nowWeekClick() {
      _value.value = DayJs();
      _data.value = getWeekOfMonthArray();
      let wk = getNowWeek(_value.value);
      if (!canSelected(wk)) {
        common_vendor.index.showToast({ title: "无法选中", icon: "none" });
        return;
      }
      _weekNum.value = wk;
      updateTimes();
    }
    function clickWeek(wk) {
      if (!canSelected(wk)) {
        common_vendor.index.showToast({ title: "无法选中", icon: "none" });
        return;
      }
      _weekNum.value = wk;
      updateTimes();
    }
    function canSelected(num) {
      let index = _dataWeek.value.findIndex((el) => el == num);
      let item = _data.value[index];
      let ar = item.filter((el) => !el.isVaild);
      return ar.length > 0;
    }
    function nextYear() {
      _value.value = _value.value.add(1, "year");
      _data.value = getWeekOfMonthArray();
      emits("change", _value.value.format("YYYY/MM/DD"));
    }
    function nextMonth() {
      _value.value = _value.value.add(1, "month");
      _data.value = getWeekOfMonthArray();
      emits("change", _value.value.format("YYYY/MM/DD"));
    }
    function prevMonth() {
      _value.value = _value.value.subtract(1, "month");
      _data.value = getWeekOfMonthArray();
      emits("change", _value.value.format("YYYY/MM/DD"));
    }
    function prevYear() {
      _value.value = _value.value.subtract(1, "year");
      _data.value = getWeekOfMonthArray();
      emits("change", _value.value.format("YYYY/MM/DD"));
    }
    function setDefault(data = []) {
      let date_str = data[0];
      _value.value = DayJs(date_str).isValid() ? DayJs(date_str) : DayJs();
      _weekNum.value = getNowWeek(_value.value);
      _data.value = getWeekOfMonthArray();
    }
    function getWeekOfMonthArray() {
      let nowMonth = DayJs(_value.value);
      let startStatickDay = nowMonth.startOf("month").format("YYYY/MM/DD");
      let endStatickDay = nowMonth.endOf("month").format("YYYY/MM/DD");
      let startd = DayJs(startStatickDay);
      let arOfmonth = [];
      let ar = [];
      while (startd.isSameOrBefore(endStatickDay)) {
        ar.push({
          dateStr: startd.format("YYYY/MM/DD"),
          date: startd.date() < 10 ? "0" + startd.date() : startd.date(),
          week: startd.isoWeek(),
          day: startd.isoWeekday(),
          isNowIn: isInNowMonth(nowMonth, startd),
          isVaild: !startd.isBetween(_start_date.value, _end_date.value, "day", "[]")
        });
        arOfmonth.push(startd.isoWeek());
        startd = startd.add(1, "day");
      }
      arOfmonth = [...new Set(arOfmonth)];
      _dataWeek.value = arOfmonth;
      let dArray = [];
      let index = 0;
      dArray.push([]);
      ar.forEach((el) => {
        if (el.week == arOfmonth[index]) {
          dArray[index].push(el);
        } else {
          index += 1;
          dArray.push([]);
          dArray[index].push(el);
        }
      });
      if (dArray[0].length !== 7) {
        let item = dArray[0][dArray[0].length - 1];
        let start_of = DayJs(item.dateStr).isoWeek(item.week).subtract(6, "day");
        let end_of = DayJs(item.dateStr).isoWeek(item.week);
        let pr = [];
        let startd2 = DayJs(start_of);
        while (startd2.isSameOrBefore(end_of)) {
          pr.push({
            dateStr: startd2.format("YYYY/MM/DD"),
            date: startd2.date() < 10 ? "0" + startd2.date() : startd2.date(),
            week: startd2.isoWeek(),
            day: startd2.isoWeekday(),
            isNowIn: isInNowMonth(nowMonth, startd2),
            isVaild: !startd2.isBetween(_start_date.value, _end_date.value, "day", "[]")
          });
          startd2 = startd2.add(1, "day");
        }
        dArray[0] = pr;
      }
      if (dArray[dArray.length - 1].length !== 7) {
        let item = dArray[dArray.length - 1][0];
        let start_of = DayJs(item.dateStr).isoWeek(item.week);
        let end_of = DayJs(item.dateStr).isoWeek(item.week).add(6, "day");
        let pr = [];
        let startd2 = DayJs(start_of);
        while (startd2.isSameOrBefore(end_of)) {
          pr.push({
            dateStr: startd2.format("YYYY/MM/DD"),
            date: startd2.date() < 10 ? "0" + startd2.date() : startd2.date(),
            week: startd2.isoWeek(),
            day: startd2.isoWeekday(),
            isNowIn: isInNowMonth(nowMonth, startd2),
            isVaild: !startd2.isBetween(_start_date.value, _end_date.value, "day", "[]")
          });
          startd2 = startd2.add(1, "day");
        }
        dArray[dArray.length - 1] = pr;
      }
      return dArray;
    }
    function isInNowMonth(date = "", now = "") {
      let startStatickDay = DayJs(date).startOf("month").format("YYYY/MM/DD");
      let endStatickDay = DayJs(date).endOf("month").format("YYYY/MM/DD");
      return DayJs(now).isBetween(startStatickDay, endStatickDay, "day", "[]");
    }
    function updateTimes() {
      let index = _dataWeek.value.findIndex((el) => el == _weekNum.value);
      let item = _data.value[index];
      let start = item[0].dateStr;
      let end = item[item.length - 1].dateStr;
      emits("click-week", [start, end]);
    }
    function confirm() {
      let index = _dataWeek.value.findIndex((el) => el == _weekNum.value);
      let item = [..._data.value[index]];
      let start = item[0].dateStr;
      for (let i = 0; i < item.length; i++) {
        if (DayJs(item[i].dateStr).isSameOrAfter(props.start, "date")) {
          start = item[i].dateStr;
          break;
        }
      }
      let end = item[item.length - 1].dateStr;
      item = item.reverse();
      console.log(item);
      for (let i = 0; i < item.length; i++) {
        if (DayJs(item[i].dateStr).isSameOrBefore(props.end, "date")) {
          end = item[i].dateStr;
          break;
        }
      }
      emits("update:modelValue", [start, end]);
      emits("confirm", [start, end]);
    }
    expose({
      setDefault,
      nextYear,
      nextMonth,
      prevYear,
      prevMonth
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !props.hideTool
      }, !props.hideTool ? {
        b: common_vendor.p({
          userInteractionEnabled: false,
          ["font-size"]: 22,
          name: "tmicon-angle-double-left"
        }),
        c: common_vendor.o(prevYear),
        d: common_vendor.p({
          userInteractionEnabled: false,
          ["font-size"]: 22,
          name: "tmicon-angle-left"
        }),
        e: common_vendor.o(prevMonth),
        f: common_vendor.p({
          userInteractionEnabled: false,
          _class: "text-weight-b",
          ["font-size"]: 32,
          label: common_vendor.unref(_nowDate)
        }),
        g: common_vendor.p({
          userInteractionEnabled: false,
          ["font-size"]: 22,
          name: "tmicon-angle-right"
        }),
        h: common_vendor.o(nextMonth),
        i: common_vendor.p({
          userInteractionEnabled: false,
          ["font-size"]: 22,
          name: "tmicon-angle-double-right"
        }),
        j: common_vendor.o(nextYear),
        k: common_vendor.p({
          userInteractionEnabled: false,
          color: "grey",
          _class: "text-align-center",
          ["font-size"]: 28,
          label: props.textUnit[9]
        }),
        l: common_vendor.o(nowWeekClick),
        m: common_vendor.p({
          shadow: 0,
          round: 0,
          height: 88,
          margin: [0, 0],
          padding: [0, 0],
          _class: "flex flex-col"
        })
      } : {}, {
        n: common_vendor.f(common_vendor.unref(weekStr), (item, index, i0) => {
          return {
            a: "7e4d8bf4-7-" + i0,
            b: common_vendor.p({
              ["font-size"]: 24,
              label: item
            }),
            c: index
          };
        }),
        o: common_vendor.s({
          height: "74rpx"
        }),
        p: common_vendor.f(_dataWeek.value, (item, index, i0) => {
          return {
            a: "7e4d8bf4-8-" + i0,
            b: common_vendor.p({
              ["font-size"]: 24,
              label: item
            }),
            c: common_vendor.f(_data.value[index], (item2, index2, i1) => {
              return {
                a: "7e4d8bf4-10-" + i0 + "-" + i1 + "," + ("7e4d8bf4-9-" + i0),
                b: common_vendor.p({
                  ["font-size"]: 28,
                  label: item2.date
                }),
                c: common_vendor.s({
                  opacity: item2.isVaild ? "0.3" : "1"
                }),
                d: common_vendor.n(item2.isNowIn ? "" : "opacity-5"),
                e: index2
              };
            }),
            d: common_vendor.o(($event) => clickWeek(item), index),
            e: "7e4d8bf4-9-" + i0,
            f: common_vendor.p({
              ["no-level"]: true,
              height: 66,
              shadow: 0,
              round: 10,
              _class: "flex-row",
              ["paren-class"]: "flex-6",
              text: _weekNum.value == item,
              color: _weekNum.value == item ? common_vendor.unref(_color) : "grey-4",
              margin: [0, 4],
              padding: [0, 0]
            }),
            g: index
          };
        }),
        q: common_vendor.s({
          height: "74rpx"
        }),
        r: !props.hideButton
      }, !props.hideButton ? {
        s: common_vendor.o(confirm),
        t: common_vendor.p({
          linear: props.linear,
          ["linear-deep"]: props.linearDeep,
          color: props.color,
          block: true,
          label: common_vendor.unref(_confirmText),
          margin: [0, 16]
        })
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/zhidianUniapp/src/tmui/components/tm-calendar-view/week-day.vue"]]);
wx.createComponent(Component);
