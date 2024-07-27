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
const tmui_tool_function_util = require("../function/util.js");
const tmui_tool_theme_theme = require("../theme/theme.js");
const useTheme = (props, store) => {
  var _a, _b;
  let dark = common_vendor.ref(false);
  let isNvue = common_vendor.ref(false);
  let customCSSStyle = common_vendor.ref({});
  let parentClass = common_vendor.ref("");
  let transparent = common_vendor.ref(false);
  let blur = common_vendor.ref(false);
  let customClass = common_vendor.ref("");
  let margin = common_vendor.ref([]);
  let padding = common_vendor.ref([]);
  let round = common_vendor.ref("");
  let theme = common_vendor.ref(computedTheme(props.value, dark.value, store.value));
  let customThemeConfig = {};
  common_vendor.watchEffect(() => {
    var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    const followDark = props.value.followDark;
    let lsdark = props.value.dark;
    if (followDark) {
      lsdark = store.value.dark;
    }
    dark.value = lsdark;
    if (store.value.os == "android" && isNvue.value) {
      blur.value = false;
    } else {
      blur.value = (_b2 = (_a2 = props.value) == null ? void 0 : _a2.blur) != null ? _b2 : false;
    }
    customCSSStyle.value = computedStyle((_c = props.value) == null ? void 0 : _c._style);
    parentClass.value = ((_d = props.value) == null ? void 0 : _d.parenClass) || ((_e = props.value) == null ? void 0 : _e.parentClass) || "";
    transparent.value = ((_h = (_f = props.value) == null ? void 0 : _f.transprent) != null ? _h : (_g = props.value) == null ? void 0 : _g.transparent) || false;
    customClass.value = computedClas((_j = (_i = props.value) == null ? void 0 : _i._class) != null ? _j : "");
    margin.value = tmui_tool_function_util.valToMarginAr((_l = (_k = props.value) == null ? void 0 : _k.margin) != null ? _l : null);
    padding.value = tmui_tool_function_util.valToMarginAr((_n = (_m = props.value) == null ? void 0 : _m.padding) != null ? _n : null);
    round.value = tmui_tool_function_util.valToRoundStrClass((_p = (_o = props.value) == null ? void 0 : _o.round) != null ? _p : "");
    theme.value = computedTheme(__spreadValues(__spreadValues({}, props.value), customThemeConfig), dark.value, store.value);
  });
  return {
    dark,
    isNvue,
    round,
    padding,
    margin,
    customCSSStyle,
    theme: (config = {}) => {
      for (let key in config) {
        if (config[key] !== null) {
          customThemeConfig[key] = config[key];
        }
      }
      return theme;
    },
    customClass,
    parentClass,
    transparent,
    _props: props,
    proxy: (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null,
    blur
  };
};
function computedStyle(_style) {
  if (typeof _style == "string") {
    let p = _style.split(";");
    let k = p.map((el) => {
      el = el.replace(";", "");
      let node = {};
      let idx = el.split(":");
      node[idx[0]] = idx[1];
      return node;
    });
    let kl = {};
    k.forEach((el) => {
      kl = __spreadValues(__spreadValues({}, kl), el);
    });
    return kl;
  }
  if (typeof _style == "object" && !Array.isArray(_style)) {
    return _style;
  }
  if (typeof _style == "object" && Array.isArray(_style)) {
    let kl = {};
    _style.forEach((el) => {
      kl = __spreadValues(__spreadValues({}, kl), el);
    });
    return kl;
  }
  return {};
}
function computedClas(_class) {
  if (typeof _class == "string") {
    return _class;
  }
  if (Array.isArray(_class)) {
    return _class.join(" ");
  }
  return "";
}
function computedTheme(props, dark, store) {
  var _a;
  const color = props.color;
  const border = props.border;
  const shadow = props.shadow;
  const round = props.round;
  const outlined = props.outlined;
  const text = props.text;
  const borderStyle = props.borderStyle;
  const borderDirection = props.borderDirection;
  const linear = props.linear;
  const linearDeep2 = props.linearDeep;
  const blur = props.blur;
  var borderColor = (_a = props == null ? void 0 : props.borderColor) != null ? _a : "";
  var theme = new tmui_tool_theme_theme.theme.themeColors(store.colorList);
  if (tmui_tool_theme_theme.theme.isCssColor(color) && !theme.hasColors(color)) {
    theme = new tmui_tool_theme_theme.theme.themeColors(theme.add(color, color));
  }
  let defaultColorName = color || "primary";
  if ((props == null ? void 0 : props.followTheme) == true && store.color) {
    defaultColorName = store.color;
    borderColor = "";
  }
  let c = theme.getTheme({
    colorname: defaultColorName,
    dark,
    borderWidth: border,
    shadow: parseInt(String(shadow)),
    round: parseInt(String(round)),
    outlined,
    text,
    borderStyle,
    borderDirection,
    linearDirection: linear,
    linearDeep: linearDeep2,
    blur,
    borderColor
  });
  return c;
}
exports.useTheme = useTheme;
