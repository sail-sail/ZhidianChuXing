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
  tmSheet();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-grid",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    round: {
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 750
    },
    //一行放置几个。
    col: {
      type: Number,
      default: 5
    },
    //是否显示边线。
    showBorder: {
      type: Boolean,
      default: false
    },
    // 背景
    color: {
      type: String,
      default: "white"
    },
    //是否透明背景
    transprent: {
      type: Boolean,
      default: false
    }
  }),
  setup(__props, { expose }) {
    const props = __props;
    let _cachList = common_vendor.ref([]);
    const _colWidth = common_vendor.computed(() => {
      return Math.ceil(props.width / props.col - 1);
    });
    common_vendor.provide("tmGridItemWidth", _colWidth.value + (props.showBorder ? 1 : 0));
    common_vendor.provide(
      "tmGridshowBorder",
      common_vendor.computed(() => props.showBorder)
    );
    common_vendor.provide(
      "tmGridshowCachList",
      common_vendor.computed(() => _cachList.value)
    );
    function pushKey(e) {
      let index = _cachList.value.findIndex((el) => el.id == e.id);
      if (index == -1) {
        _cachList.value.push(e);
      } else {
        _cachList.value.splice(index, 1, e);
      }
      setIndexType();
    }
    function delKey(e) {
      _cachList.value.findIndex((el) => el.id == e.id);
      setIndexType();
    }
    function setIndexType() {
      let totallen = _cachList.value.length;
      _cachList.value = _cachList.value.map((el, index) => {
        let aIndex = index + 1;
        if (aIndex <= props.col) {
          el.type = 4;
          if (aIndex == totallen && totallen == 1 || aIndex == 1) {
            el.type = 1;
          }
        } else {
          if (aIndex % props.col == 1) {
            el.type = 3;
          } else {
            el.type = 2;
          }
        }
        return el;
      });
    }
    expose({
      pushKey,
      delKey,
      keyName: "tmGrid"
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          round: props.round,
          width: props.width,
          transprent: props.transprent,
          color: props.color,
          margin: [0, 0],
          padding: [0, 0],
          _class: "flex flex-row flex-row-top-start",
          contStyle: "flex-wrap:wrap;"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/zhidianUniapp/src/tmui/components/tm-grid/tm-grid.vue"]]);
wx.createComponent(Component);
