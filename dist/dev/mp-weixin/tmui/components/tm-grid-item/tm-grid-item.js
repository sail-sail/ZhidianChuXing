"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
const tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
if (!Math) {
  (tmBadge + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmBadge = () => "../tm-badge/tm-badge.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-grid-item",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    //项目的高度。如果提供为0，就表示自动高度。
    height: {
      type: Number,
      default: 100
    },
    transprent: {
      type: Boolean,
      default: true
    },
    dot: {
      type: [Boolean, String],
      default: false
    },
    icon: {
      type: [String],
      default: ""
    },
    //如果count为数字时，显示数字角标，如果为string是显示文本角标。
    count: {
      type: [Number, String],
      default: 0
    },
    maxCount: {
      type: [Number, String],
      default: 999
    },
    bgColor: {
      type: String,
      default: "white"
    },
    // dot的主题色
    color: {
      type: String,
      default: "red"
    },
    //如果提供了链接，当点击项目时自动跳转页面。
    url: {
      type: String,
      default: ""
    }
  }),
  emits: ["click"],
  setup(__props, { emit: emits }) {
    var _a, _b, _c;
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const proxy = (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const tmcfg = common_vendor.computed(() => store.tmStore);
    const isDark = common_vendor.computed(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const tmcomputed = common_vendor.computed(() => {
      return tmui_tool_lib_minxs.computedTheme(__spreadProps(__spreadValues({}, props), { color: props.bgColor }), isDark.value, tmcfg.value);
    });
    const _colWidth = common_vendor.inject("tmGridItemWidth", 0);
    const _tmGridshowBorder = common_vendor.inject(
      "tmGridshowBorder",
      common_vendor.computed(() => false)
    );
    const tmGridshowCachList = common_vendor.inject(
      "tmGridshowCachList",
      common_vendor.computed(() => [])
    );
    const uid = common_vendor.ref({
      id: common_vendor.index.$tm.u.getUid(1),
      type: ""
    });
    let parentFormItem = proxy == null ? void 0 : proxy.$parent;
    while (parentFormItem) {
      if ((parentFormItem == null ? void 0 : parentFormItem.keyName) == "tmGrid" || !parentFormItem) {
        break;
      } else {
        parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
      }
    }
    common_vendor.onMounted(() => {
      if (parentFormItem == null ? void 0 : parentFormItem.pushKey) {
        parentFormItem.pushKey(uid.value);
      }
    }), common_vendor.onBeforeUnmount(() => {
      parentFormItem.delKey(uid.value);
    });
    let wkStyle = common_vendor.ref(`width:${_colWidth}'rpx'`);
    common_vendor.watch(
      [tmGridshowCachList, _tmGridshowBorder],
      () => {
        common_vendor.nextTick$1(() => setStyleFun());
      },
      { deep: true }
    );
    function setStyleFun() {
      let ar = tmGridshowCachList.value.filter((el) => el.id == uid.value.id);
      if (ar.length == 1) {
        uid.value = ar[0];
      }
      if (!_tmGridshowBorder.value) {
        wkStyle.value = `box-sizing: border-box;border:0rpx solid rgba(0,0,0,0);width:${_colWidth}rpx`;
        return;
      }
      if (uid.value.type == 1) {
        wkStyle.value = `box-sizing: border-box;border:1rpx solid ${tmcomputed.value.border};width:${_colWidth - 1}rpx`;
      }
      if (uid.value.type == 2) {
        wkStyle.value = `box-sizing: border-box;border-bottom:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};border-left:1rpx solid rgba(0,0,0,0);border-top:1rpx solid rgba(0,0,0,0);width:${_colWidth - 1}rpx`;
      }
      if (uid.value.type == 3) {
        wkStyle.value = `box-sizing: border-box;border-top:1rpx solid rgba(0,0,0,0);border-bottom:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};border-left:1rpx solid ${tmcomputed.value.border};width:${_colWidth - 1}rpx`;
      }
      if (uid.value.type == 4) {
        wkStyle.value = `box-sizing: border-box;border-left:1rpx solid rgba(0,0,0,0);border-bottom:1rpx solid ${tmcomputed.value.border};border-top:1rpx solid ${tmcomputed.value.border};border-right:1rpx solid ${tmcomputed.value.border};width:${_colWidth - 1}rpx`;
      }
    }
    function onClick(e) {
      emits("click", e);
      if (props.url !== "") {
        try {
          common_vendor.index.navigateTo({
            url: props.url
          });
        } catch (e2) {
        }
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(props.dot ? "" : "py-5 "),
        b: common_vendor.p({
          top: 0,
          userInteractionEnabled: true,
          fontSize: 20,
          dot: props.dot,
          count: props.count,
          ["max-count"]: props.maxCount,
          icon: props.icon,
          color: props.color
        }),
        c: common_vendor.o(onClick),
        d: common_vendor.p({
          color: props.bgColor,
          text: props.text,
          border: 0,
          ["hover-class"]: "opacity-6",
          transprent: props.transprent,
          height: props.height,
          width: common_vendor.unref(_colWidth) - 0.5,
          margin: [0, 0],
          padding: [0, 0],
          _class: "flex-col flex"
        }),
        e: common_vendor.s(common_vendor.unref(wkStyle))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/zhidianUniapp/src/tmui/components/tm-grid-item/tm-grid-item.vue"]]);
wx.createComponent(Component);
