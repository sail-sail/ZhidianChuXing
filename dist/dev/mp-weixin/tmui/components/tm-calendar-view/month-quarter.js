"use strict";
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_dayjs_esm_index = require("../../tool/dayjs/esm/index.js");
const tmui_tool_dayjs_esm_plugin_isoWeek_index = require("../../tool/dayjs/esm/plugin/isoWeek/index.js");
const tmui_tool_dayjs_esm_plugin_isSameOrBefore_index = require("../../tool/dayjs/esm/plugin/isSameOrBefore/index.js");
const tmui_tool_dayjs_esm_plugin_isBetween_index = require("../../tool/dayjs/esm/plugin/isBetween/index.js");
const tmui_tool_dayjs_esm_plugin_quarterOfYear_index = require("../../tool/dayjs/esm/plugin/quarterOfYear/index.js");
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
  __name: "month-quarter",
  props: {
    followTheme: {
      type: Boolean,
      default: true
    },
    //默认显示的日期，自动转换为当前的周次。
    defaultValue: {
      type: Array,
      default: () => []
    },
    //当前时间
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
  emits: ["update:modelValue", "confirm", "click-month", "change"],
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
    DayJs.extend(tmui_tool_dayjs_esm_plugin_quarterOfYear_index.QuarterOfYear);
    const _value = common_vendor.ref(DayJs(props.defaultValue[0]).isValid() ? DayJs(props.defaultValue[0]) : DayJs());
    const _start_date = common_vendor.computed(() => {
      let isv = DayJs(props.start).isValid();
      return isv ? DayJs(props.start) : DayJs("1980-1-1");
    });
    const _end_date = common_vendor.computed(() => {
      let isv = DayJs(props.end).isValid();
      return isv ? DayJs(props.end) : DayJs("2023-1-1");
    });
    const _data = common_vendor.ref(getDataArray());
    const _nowDate = common_vendor.computed(() => {
      return _value.value.format("YYYY-MM");
    });
    const _nowMonth = common_vendor.computed(() => {
      return _value.value.quarter();
    });
    common_vendor.computed(() => {
      return _value.value.year();
    });
    common_vendor.watch(
      [() => props.modelValue, () => props.start, () => props.end],
      () => {
        _value.value = DayJs(props.modelValue[0]);
        _data.value = getDataArray();
      },
      { deep: true }
    );
    function nowWeekClick() {
      let startQuery = DayJs(_start_date.value).quarter();
      let endQuery = DayJs(_end_date.value).quarter();
      let nowQuery = DayJs().quarter();
      if (DayJs().isBetween(_start_date.value, _end_date.value, "year", "[]") == false) {
        common_vendor.index.showToast({ title: "无法选中", icon: "none" });
        return;
      }
      if (nowQuery < startQuery && nowQuery > endQuery) {
        common_vendor.index.showToast({ title: "无法选中", icon: "none" });
        return;
      }
      _value.value = DayJs();
      _data.value = getDataArray();
      updateTimes();
    }
    function clickWeek(wk) {
      if (wk.isVaild) {
        common_vendor.index.showToast({ title: "无法选中", icon: "none" });
        return;
      }
      _value.value = _value.value.quarter(wk.month);
      updateTimes();
    }
    function setDefault(data = []) {
      _value.value = data ? DayJs(data[0]) : DayJs(props.modelValue[0]);
      _data.value = getDataArray();
    }
    function getDataArray() {
      let nowMonth = DayJs("2000-1-1").year(_value.value.year());
      let ar = [];
      const strreplace = props.textUnit[14];
      let str = [strreplace.replace("${x}", 1), strreplace.replace("${x}", 2), strreplace.replace("${x}", 3), strreplace.replace("${x}", 4)];
      let str2 = ["1/1~3/31", "4/1~6/30", "7/1~9/30", "10/1~12/31"];
      for (let i = 1; i < 5; i++) {
        ar.push({
          dateStr: str[i - 1],
          dateStr2: str2[i - 1],
          month: i,
          year: nowMonth.year(),
          isVaild: isVaildQ(i)
        });
      }
      return common_vendor.index.$tm.u.splitData(ar, 2);
    }
    function isVaildQ(q) {
      let startQuery = DayJs(_start_date.value).quarter();
      let endQuery = DayJs(_end_date.value).quarter();
      let nowQuery = DayJs(_value.value).quarter(q);
      if (DayJs(nowQuery).isBetween(_start_date.value, _end_date.value, "month", "[]") == false) {
        return true;
      }
      if (q < startQuery && q > endQuery) {
        return true;
      }
      return false;
    }
    function nextYear() {
      _value.value = _value.value.add(1, "year");
      _data.value = getDataArray();
      emits("change", _value.value.format("YYYY/MM/DD"));
    }
    function prevYear() {
      _value.value = _value.value.subtract(1, "year");
      _data.value = getDataArray();
      emits("change", _value.value.format("YYYY/MM/DD"));
    }
    function updateTimes() {
      emits("click-month", getNowQDateRange());
    }
    function confirm() {
      emits("update:modelValue", getNowQDateRange());
      emits("confirm", getNowQDateRange());
    }
    function getNowQDateRange() {
      let start = _value.value.format("YYYY/MM") + "/01";
      let ls = _value.value.add(2, "month");
      let end = ls.format("YYYY/MM/") + ls.daysInMonth();
      return [start, end];
    }
    expose({
      setDefault,
      nextYear,
      prevYear
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
          _class: "text-weight-b",
          ["font-size"]: 32,
          label: common_vendor.unref(_nowDate)
        }),
        e: common_vendor.p({
          userInteractionEnabled: false,
          ["font-size"]: 22,
          name: "tmicon-angle-double-right"
        }),
        f: common_vendor.o(nextYear),
        g: common_vendor.p({
          userInteractionEnabled: false,
          color: "grey",
          _class: "text-align-center",
          ["font-size"]: 28,
          label: props.textUnit[11]
        }),
        h: common_vendor.o(nowWeekClick),
        i: common_vendor.p({
          shadow: 0,
          round: 0,
          height: 88,
          margin: [0, 0],
          padding: [0, 0],
          _class: "flex flex-col"
        })
      } : {}, {
        j: common_vendor.f(_data.value, (item2, index2, i0) => {
          return {
            a: common_vendor.f(item2, (item, index, i1) => {
              return {
                a: "efb75304-6-" + i0 + "-" + i1 + "," + ("efb75304-5-" + i0 + "-" + i1),
                b: common_vendor.p({
                  ["font-size"]: 30,
                  label: item.dateStr
                }),
                c: "efb75304-7-" + i0 + "-" + i1 + "," + ("efb75304-5-" + i0 + "-" + i1),
                d: common_vendor.p({
                  ["font-size"]: 24,
                  label: item.dateStr2
                }),
                e: common_vendor.s({
                  opacity: item.isVaild ? "0.3" : "1"
                }),
                f: common_vendor.o(($event) => clickWeek(item), index),
                g: index,
                h: "efb75304-5-" + i0 + "-" + i1,
                i: common_vendor.p({
                  height: 112,
                  shadow: 0,
                  round: 4,
                  _class: "flex-row flex-center",
                  ["paren-class"]: "flex-3",
                  text: common_vendor.unref(_nowMonth) == item.month,
                  color: common_vendor.unref(_nowMonth) == item.month ? common_vendor.unref(_color) : "grey-4",
                  margin: [4, 4],
                  padding: [0, 0]
                })
              };
            }),
            b: index2
          };
        }),
        k: common_vendor.s({
          height: "120rpx",
          flexWrap: "wrap"
        }),
        l: !props.hideButton
      }, !props.hideButton ? {
        m: common_vendor.o(confirm),
        n: common_vendor.p({
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/zhidianUniapp/src/tmui/components/tm-calendar-view/month-quarter.vue"]]);
wx.createComponent(Component);
