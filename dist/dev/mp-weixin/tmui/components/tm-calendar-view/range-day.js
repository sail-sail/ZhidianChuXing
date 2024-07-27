"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_dayjs_esm_index = require("../../tool/dayjs/esm/index.js");
const tmui_tool_dayjs_esm_plugin_isoWeek_index = require("../../tool/dayjs/esm/plugin/isoWeek/index.js");
const tmui_tool_dayjs_esm_plugin_isSameOrBefore_index = require("../../tool/dayjs/esm/plugin/isSameOrBefore/index.js");
const tmui_tool_dayjs_esm_plugin_isBetween_index = require("../../tool/dayjs/esm/plugin/isBetween/index.js");
const tmui_tool_dayjs_esm_plugin_minMax_index = require("../../tool/dayjs/esm/plugin/minMax/index.js");
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
  __name: "range-day",
  props: {
    followTheme: {
      type: Boolean,
      default: true
    },
    //默认显示的日期
    defaultValue: {
      type: Array,
      default: () => []
    },
    //当前的周时间段
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
    //被禁用的日期数组。如果["2022-1-1","2022-5-1"]
    //被禁用的日期将无法选中。
    disabledDate: {
      type: Array,
      default: () => []
    },
    //设定单个日期的样式。
    dateStyle: {
      type: Array,
      default: () => []
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
  emits: ["update:modelValue", "confirm", "click-day", "change"],
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
    DayJs.extend(tmui_tool_dayjs_esm_plugin_isBetween_index.isBetween);
    DayJs.extend(tmui_tool_dayjs_esm_plugin_minMax_index.minMax);
    const _value = common_vendor.ref(props.defaultValue);
    const weekStr = props.textUnit.slice(1, 8);
    const showOpenDate = common_vendor.ref(setShowopenDate());
    const _data = common_vendor.ref([]);
    const _start_date = common_vendor.computed(() => {
      let isv = DayJs(props.start).isValid();
      return isv ? DayJs(props.start) : DayJs("1980-1-1");
    });
    const _end_date = common_vendor.computed(() => {
      let isv = DayJs(props.end).isValid();
      return isv ? DayJs(props.end) : DayJs("2450-1-1");
    });
    const _nowDate = common_vendor.computed(() => {
      return showOpenDate.value.format("YYYY-MM");
    });
    _data.value = getWeekOfMonthArray();
    common_vendor.watch(
      [() => props.modelValue, () => props.dateStyle, () => props.disabledDate, () => props.start, () => props.end],
      () => {
        _value.value = props.modelValue;
        showOpenDate.value = setShowopenDate();
        _data.value = getWeekOfMonthArray();
      },
      { deep: true }
    );
    function setShowopenDate() {
      if (_value.value.length == 0) {
        return DayJs();
      }
      let n = _value.value[0] || DayJs();
      n = typeof n == "undefined" || n == null ? DayJs() : n;
      return DayJs(n);
    }
    function nowWeekClick() {
      if (isDisabledDate(DayJs())) {
        common_vendor.index.showToast({ title: "无法选中", icon: "none" });
        return;
      }
      selected(DayJs().format("YYYY/MM/DD"));
      showOpenDate.value = DayJs();
      _data.value = getWeekOfMonthArray();
      emits("click-day", DayJs().format("YYYY/MM/DD"));
    }
    function clickWeek(wk) {
      if (wk.disabled) {
        common_vendor.index.showToast({ title: "无法选中", icon: "none" });
        return;
      }
      selected(wk.dateStr);
      emits("click-day", wk.dateStr);
    }
    function selected(item) {
      let nowvalue = [...common_vendor.toRaw(_value.value)];
      if (nowvalue.length < 2) {
        nowvalue.push(DayJs(item).format("YYYY/MM/DD"));
      } else {
        nowvalue = [DayJs(item).format("YYYY/MM/DD")];
      }
      if (nowvalue.length == 2) {
        let dToDayjs = [DayJs(nowvalue[0]), DayJs(nowvalue[1])];
        _value.value = [DayJs.min(dToDayjs), DayJs.max(dToDayjs).format("YYYY/MM/DD")];
      } else {
        _value.value = nowvalue;
      }
    }
    function nextYear() {
      showOpenDate.value = showOpenDate.value.add(1, "year");
      let dys = getWeekOfMonthArray();
      emits("change", showOpenDate.value.format("YYYY/MM/DD"));
      common_vendor.nextTick$1(() => {
        _data.value = [...dys];
      });
    }
    function nextMonth() {
      showOpenDate.value = showOpenDate.value.add(1, "month");
      let dys = getWeekOfMonthArray();
      emits("change", showOpenDate.value.format("YYYY/MM/DD"));
      common_vendor.nextTick$1(() => {
        _data.value = [...dys];
      });
    }
    function prevMonth() {
      showOpenDate.value = showOpenDate.value.subtract(1, "month");
      let dys = getWeekOfMonthArray();
      emits("change", showOpenDate.value.format("YYYY/MM/DD"));
      common_vendor.nextTick$1(() => {
        _data.value = [...dys];
      });
    }
    function prevYear() {
      showOpenDate.value = showOpenDate.value.subtract(1, "year");
      let dys = getWeekOfMonthArray();
      emits("change", showOpenDate.value.format("YYYY/MM/DD"));
      common_vendor.nextTick$1(() => {
        _data.value = [...dys];
      });
    }
    function setDefault(data = []) {
      _value.value = props.modelValue;
      showOpenDate.value = setShowopenDate();
      _data.value = getWeekOfMonthArray();
    }
    function getWeekOfMonthArray() {
      let nowMonth = showOpenDate.value.date(1);
      let startStatickDay = nowMonth.startOf("month");
      let endStatickDay = nowMonth.endOf("month");
      let nowMonthDayNum = nowMonth.daysInMonth();
      let startOfday = startStatickDay.isoWeekday() - 1;
      startStatickDay = nowMonth.subtract(Math.abs(startOfday), "day");
      let endOfday = 7 - endStatickDay.isoWeekday();
      if (endOfday > 0) {
        endStatickDay = nowMonth.date(nowMonthDayNum).add(Math.abs(endOfday), "day");
      }
      let startd = DayJs(startStatickDay);
      let arOfmonth = [];
      let ar = [];
      function setAr() {
        let dy = props.dateStyle.map((el) => {
          el.date = DayJs(el.date).format("YYYY/MM/DD");
          return el;
        });
        let dyObj = {};
        dy.forEach((el) => {
          dyObj[el.date] = el;
        });
        let dySet = Object.keys(dyObj);
        while (startd.isSameOrBefore(endStatickDay)) {
          let idate = startd.format("YYYY/MM/DD");
          let ext = dySet.includes(idate) ? dyObj[idate] : {};
          ar.push({
            dateStr: idate,
            date: startd.date() < 10 ? "0" + startd.date() : startd.date(),
            day: startd.isoWeekday(),
            week: startd.isoWeek(),
            isNowIn: isInNowMonth(nowMonth, startd),
            disabled: isDisabledDate(startd),
            extra: __spreadValues({
              date: idate,
              text: null,
              color: "",
              extra: ""
            }, ext)
          });
          arOfmonth.push(startd.isoWeek());
          startd = startd.add(1, "day");
        }
      }
      setAr();
      if (ar.length < 42) {
        let chaJi = 42 - ar.length;
        endStatickDay = endStatickDay.add(chaJi, "day");
        setAr();
      }
      arOfmonth = [...new Set(arOfmonth)];
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
      return dArray;
    }
    function isInNowMonth(date = "", now = "") {
      let startStatickDay = DayJs(date).startOf("month").format("YYYY/MM/DD");
      let endStatickDay = DayJs(date).endOf("month").format("YYYY/MM/DD");
      return DayJs(now).isBetween(startStatickDay, endStatickDay, "day", "[]");
    }
    function isDisabledDate(date = "") {
      let valdate = DayJs(date);
      let isds = false;
      isds = !valdate.isBetween(_start_date.value, _end_date.value, "day", "[]");
      for (let i = 0; i < props.disabledDate.length; i++) {
        let item = props.disabledDate[i];
        if (DayJs(item).isSame(valdate, "day")) {
          isds = true;
          break;
        }
      }
      return isds;
    }
    function isSelected(date = "") {
      let isSelected2 = false;
      let fr = _value.value.filter((el) => DayJs(el).isSame(date));
      isSelected2 = fr.length > 0 ? true : false;
      if (_value.value.length == 2) {
        isSelected2 = DayJs(date).isBetween(_value.value[0], _value.value[1], "day", "[]");
      }
      return isSelected2;
    }
    function startOrAnd(date = "") {
      if (_value.value.length == 1) {
        if (DayJs(date).isSame(_value.value[0], "day")) {
          return 1;
        }
      } else if (_value.value.length == 2) {
        if (DayJs(_value.value[1]).isSame(_value.value[0], "day") && DayJs(date).isSame(_value.value[0], "day")) {
          return 3;
        }
        if (DayJs(date).isSame(_value.value[0], "day")) {
          return 1;
        }
        if (DayJs(date).isSame(_value.value[1], "day")) {
          return 2;
        }
        if (DayJs(date).isBetween(_value.value[0], _value.value[1], "day", "()")) {
          return 4;
        }
      }
      return 0;
    }
    function confirm() {
      let ar = _value.value.map((el) => DayJs(el).format("YYYY/MM/DD"));
      emits("update:modelValue", ar);
      emits("confirm", ar);
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
          label: props.textUnit[8]
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
            a: "f36e13aa-7-" + i0,
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
        p: common_vendor.f(_data.value, (item, index, i0) => {
          return {
            a: common_vendor.f(item, (item2, index2, i1) => {
              return common_vendor.e({
                a: "f36e13aa-9-" + i0 + "-" + i1 + "," + ("f36e13aa-8-" + i0 + "-" + i1),
                b: common_vendor.p({
                  ["font-size"]: 28,
                  label: item2.date
                }),
                c: (startOrAnd(item2.dateStr) == 0 || startOrAnd(item2.dateStr) == 4) && item2.extra.extra
              }, (startOrAnd(item2.dateStr) == 0 || startOrAnd(item2.dateStr) == 4) && item2.extra.extra ? {
                d: "f36e13aa-10-" + i0 + "-" + i1 + "," + ("f36e13aa-8-" + i0 + "-" + i1),
                e: common_vendor.p({
                  _class: "flex-center",
                  ["font-size"]: 22,
                  label: item2.extra.extra
                })
              } : {}, {
                f: startOrAnd(item2.dateStr) == 1
              }, startOrAnd(item2.dateStr) == 1 ? {
                g: "f36e13aa-11-" + i0 + "-" + i1 + "," + ("f36e13aa-8-" + i0 + "-" + i1),
                h: common_vendor.p({
                  _class: "flex-center",
                  ["font-size"]: 22,
                  label: "开始"
                })
              } : {}, {
                i: startOrAnd(item2.dateStr) == 2
              }, startOrAnd(item2.dateStr) == 2 ? {
                j: "f36e13aa-12-" + i0 + "-" + i1 + "," + ("f36e13aa-8-" + i0 + "-" + i1),
                k: common_vendor.p({
                  _class: "flex-center",
                  ["font-size"]: 22,
                  label: "结束"
                })
              } : {}, {
                l: startOrAnd(item2.dateStr) == 3
              }, startOrAnd(item2.dateStr) == 3 ? {
                m: "f36e13aa-13-" + i0 + "-" + i1 + "," + ("f36e13aa-8-" + i0 + "-" + i1),
                n: common_vendor.p({
                  _class: "flex-center",
                  ["font-size"]: 20,
                  label: "始/止"
                })
              } : {}, {
                o: common_vendor.s({
                  opacity: item2.disabled ? "0.3" : "1"
                }),
                p: common_vendor.n(!item2.isNowIn ? "opacity-6" : ""),
                q: "f36e13aa-8-" + i0 + "-" + i1,
                r: common_vendor.p({
                  height: 90,
                  shadow: 0,
                  round: 0,
                  border: item2.extra.color && isSelected(item2.dateStr) ? 1 : 0,
                  _class: "flex-row",
                  isDisabledRoundAndriod: true,
                  ["paren-class"]: (startOrAnd(item2.dateStr) == 1 ? "round-l-24" : "") + (startOrAnd(item2.dateStr) == 2 ? "round-r-24" : "") + (startOrAnd(item2.dateStr) == 3 ? "round-24" : ""),
                  text: startOrAnd(item2.dateStr) == 1 || startOrAnd(item2.dateStr) == 2 || startOrAnd(item2.dateStr) == 3 ? false : item2.extra.text !== null ? item2.extra.text : isSelected(item2.dateStr),
                  color: item2.extra.color ? item2.extra.color : isSelected(item2.dateStr) ? common_vendor.unref(_color) : "white",
                  margin: [0, 0],
                  padding: [0, 0]
                }),
                s: common_vendor.n(startOrAnd(item2.dateStr) == 1 ? "round-l-24" : ""),
                t: common_vendor.n(startOrAnd(item2.dateStr) == 2 ? "round-r-24" : ""),
                v: common_vendor.n(startOrAnd(item2.dateStr) == 3 ? "round-24" : ""),
                w: common_vendor.n(!startOrAnd(item2.dateStr) ? "round-24" : ""),
                x: common_vendor.o(($event) => clickWeek(item2), index2),
                y: index2
              });
            }),
            b: index
          };
        }),
        q: common_vendor.s({
          height: "90rpx"
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
          margin: [32, 16]
        })
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/zhidianUniapp/src/tmui/components/tm-calendar-view/range-day.vue"]]);
wx.createComponent(Component);
