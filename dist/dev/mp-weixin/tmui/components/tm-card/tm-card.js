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
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
if (!Math) {
  (tmText + tmDivider + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmDivider = () => "../tm-divider/tm-divider.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-card",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    shadow: {
      type: [Number],
      default: 2
    },
    round: {
      type: [Number],
      default: 6
    },
    border: {
      type: [Number],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [32, 0, 32, 24]
    },
    padding: {
      type: Array,
      default: () => [24, 0]
    },
    transprent: {
      type: [Boolean],
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    width: {
      type: [Number],
      default: 0
    },
    height: {
      type: [Number],
      default: 0
    },
    title: {
      type: [String],
      default: ""
    },
    status: {
      type: [String],
      default: ""
    },
    statusColor: {
      type: [String],
      default: "primary"
    },
    content: {
      type: [String],
      default: ""
    }
  }),
  setup(__props) {
    const props = __props;
    const customCSSStyle = common_vendor.computed(() => tmui_tool_lib_minxs.computedStyle(props));
    const customClass = common_vendor.computed(() => tmui_tool_lib_minxs.computedClass(props));
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["font-size"]: 28,
          _class: "text-weight-b",
          label: props.title
        }),
        b: common_vendor.p({
          followTheme: false,
          color: props.statusColor,
          ["font-size"]: 26,
          label: props.status
        }),
        c: common_vendor.p({
          ["font-size"]: 26,
          _class: "wrap",
          label: props.content
        }),
        d: common_vendor.p({
          color: props.color,
          _class: [common_vendor.unref(customClass), "flex-col"],
          _style: [common_vendor.unref(customCSSStyle)],
          followTheme: props.followTheme,
          dark: props.dark,
          round: props.round,
          shadow: props.shadow,
          outlined: props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          text: props.text,
          transprent: props.transprent,
          linear: props.linear,
          linearDeep: props.linearDeep,
          width: props.width,
          height: props.height,
          margin: props.margin,
          padding: props.padding
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/zhidianUniapp/src/tmui/components/tm-card/tm-card.vue"]]);
wx.createComponent(Component);
