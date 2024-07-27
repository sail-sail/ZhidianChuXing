"use strict";
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
if (!Math) {
  TmText();
}
const TmText = () => "../tm-text/tm-text.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "picker-panel",
  props: {
    followTheme: {
      type: [Boolean],
      default: true
    },
    col: {
      type: Number,
      default: 0
    },
    //禁用的部分日期，禁用的日期将不会被选中，就算滑到了该位置，也会回弹到之前的时间。
    disabled: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 600
    },
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    //当columns项目中的data数据为对象时的key取值字段。
    dataKey: {
      type: String,
      default: "text"
    },
    //当columns项目中的data数据为对象时的key取值字段。兼容上方dataKey,因为微信dataKey与本字段重名，无法设置。
    mapKey: {
      type: String,
      default: "text"
    },
    immediateChange: {
      type: Boolean,
      default: true
    }
  },
  emits: ["change", "end", "start"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const isDark = common_vendor.computed(() => store.tmStore.dark);
    const _data = common_vendor.computed(() => props.data);
    const colIndex = common_vendor.ref(0);
    const showDom = common_vendor.ref(false);
    common_vendor.computed(() => {
      return (common_vendor.index.upx2px(props.height) - 34) / 2;
    });
    common_vendor.ref(0);
    const maskStyle = common_vendor.computed(() => {
      let str_white = "background-image:linear-gradient(rgba(255,255,255,0.95),rgba(255,255,255,0.6)),linear-gradient(rgba(255,255,255,0.6),rgba(255,255,255,0.95))";
      let str_black = "background-image:linear-gradient(rgba(17, 17, 17, 1.0),rgba(106, 106, 106, 0.2)),linear-gradient(rgba(106, 106, 106, 0.2),rgba(17, 17, 17, 1.0))";
      if (!isDark.value) {
        return str_white;
      }
      return str_black;
    });
    common_vendor.computed(() => {
      let str_white = "background:linear-gradient(rgba(255,255,255,0.95),rgba(255,255,255,0.6))";
      let str_black = "background:linear-gradient(0deg,rgba(0,0,0,0.4),rgba(0,0,0,0),rgba(0,0,0,0.4))";
      return isDark ? str_black : str_white;
    });
    common_vendor.onMounted(() => {
      showDom.value = true;
      nvuegetClientRect();
      setTimeout(function() {
        colIndex.value = props.col;
      }, 50);
    });
    common_vendor.onUpdated(() => nvuegetClientRect());
    common_vendor.watch(
      () => props.col,
      () => {
        common_vendor.nextTick$1(() => {
          colIndex.value = props.col;
        });
      }
    );
    function colchange(e) {
      colIndex.value = e.detail.value[0];
      emits("change", colIndex.value);
    }
    function nvuegetClientRect() {
      common_vendor.nextTick$1(function() {
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showDom.value
      }, showDom.value ? {
        b: common_vendor.f(common_vendor.unref(_data), (item, index, i0) => {
          return common_vendor.e({
            a: typeof item == "string"
          }, typeof item == "string" ? {
            b: "7611fada-0-" + i0,
            c: common_vendor.p({
              _class: "text-align-center",
              ["font-size"]: item.length > 7 ? 24 : 30,
              dark: common_vendor.unref(isDark),
              label: item
            })
          } : {}, {
            d: typeof item == "object"
          }, typeof item == "object" ? {
            e: "7611fada-1-" + i0,
            f: common_vendor.p({
              _class: "text-align-center",
              ["font-size"]: item[props.mapKey || props.dataKey].length > 7 ? 24 : 30,
              dark: common_vendor.unref(isDark),
              label: item[props.mapKey || props.dataKey] || ""
            })
          } : {}, {
            g: index,
            h: common_vendor.n(index == colIndex.value ? "" : "UnitemSelected"),
            i: common_vendor.n(item["disabled"] ? "opacity-5" : "")
          });
        }),
        c: common_vendor.o(($event) => emits("end")),
        d: common_vendor.o(($event) => emits("start")),
        e: [colIndex.value],
        f: common_vendor.o(colchange),
        g: common_vendor.s({
          height: props.height + "rpx"
        }),
        h: common_vendor.unref(maskStyle),
        i: props.immediateChange
      } : {}, {
        j: props.height + "rpx"
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7611fada"], ["__file", "D:/zhidianUniapp/src/tmui/components/tm-picker-view/picker-panel.vue"]]);
wx.createComponent(Component);
