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
  __name: "month-day",
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
    //是否允许多选。
    multiple: {
      type: Boolean,
      default: false
    },
    //设定单个日期的样式。
    dateStyle: {
      type: Array,
      default: () => []
    },
    //当multiple=true时，可以选择的最大日期数量。
    max: {
      type: Number,
      default: 999
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
      let fr = _value.value.filter((el) => DayJs(el).isSame(item));
      if (!props.multiple) {
        _value.value = [DayJs(item).format("YYYY/MM/DD")];
        return;
      }
      if (fr.length > 0) {
        _value.value = _value.value.filter((el) => !DayJs(el).isSame(item));
      } else {
        if (_value.value.length >= props.max) {
          common_vendor.index.showToast({ title: "只可选择" + props.max + "天", icon: "none" });
          return;
        }
        _value.value.push(DayJs(item).format("YYYY/MM/DD"));
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
      _value.value = data.length > 0 ? data : props.modelValue;
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
              text: false,
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
        if (DayJs(item).isSame(valdate)) {
          isds = true;
          break;
        }
      }
      return isds;
    }
    function isSelected(date = "") {
      let fr = _value.value.filter((el) => DayJs(el).isSame(date));
      return fr.length > 0;
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
            a: "6df8ec6e-7-" + i0,
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
                a: "6df8ec6e-9-" + i0 + "-" + i1 + "," + ("6df8ec6e-8-" + i0 + "-" + i1),
                b: common_vendor.p({
                  ["font-size"]: 28,
                  label: item2.date
                }),
                c: item2.extra.extra
              }, item2.extra.extra ? {
                d: "6df8ec6e-10-" + i0 + "-" + i1 + "," + ("6df8ec6e-8-" + i0 + "-" + i1),
                e: common_vendor.p({
                  _class: "flex-center",
                  ["font-size"]: 22,
                  label: item2.extra.extra
                })
              } : {}, {
                f: common_vendor.s({
                  opacity: item2.disabled ? "0.3" : "1"
                }),
                g: common_vendor.n(!item2.isNowIn ? "opacity-6" : ""),
                h: "6df8ec6e-8-" + i0 + "-" + i1,
                i: common_vendor.p({
                  userInteractionEnabled: false,
                  height: 90,
                  width: 90,
                  shadow: 0,
                  round: 24,
                  border: item2.extra.color && isSelected(item2.dateStr) ? 1 : 0,
                  _class: "flex-row",
                  transprent: item2.extra.color || !isSelected(item2.dateStr),
                  color: item2.extra.color ? item2.extra.color : isSelected(item2.dateStr) ? common_vendor.unref(_color) : "white",
                  margin: [0, 0],
                  padding: [0, 0]
                }),
                j: common_vendor.o(($event) => clickWeek(item2), index2),
                k: index2
              });
            }),
            b: index
          };
        }),
        q: common_vendor.s({
          height: "94rpx"
        }),
        r: !props.hideButton
      }, !props.hideButton ? {
        s: common_vendor.o(confirm),
        t: common_vendor.p({
          followTheme: props.followTheme,
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/zhidianUniapp/src/tmui/components/tm-calendar-view/month-day.vue"]]);
wx.createComponent(Component);
