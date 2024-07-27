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
const tmui_tool_useFun_useWindowInfo = require("../../tool/useFun/useWindowInfo.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
if (!Math) {
  (tmPickerView + tmButton + tmDrawer)();
}
const tmDrawer = () => "../tm-drawer/tm-drawer.js";
const tmPickerView = () => "../tm-picker-view/tm-picker-view.js";
const tmButton = () => "../tm-button/tm-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-picker",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    //可v-model,每一列选中的索引值
    modelValue: {
      type: Array,
      default: () => []
    },
    /**
     * 注意：这里是单向输出显示的value值，而不是modelValue的index索引值。
     * 这里主要是为了方便表单上页面的显示。如果真要保存到数据库，你应该保存modelValue的值。
     */
    modelStr: {
      type: [String],
      default: ""
    },
    //默认选中的索引值。
    defaultValue: {
      type: Array,
      default: () => []
    },
    //赋值和选值方式
    //name:名称模式赋值和选择
    //id:id模式赋值和选择
    //index:索引模式赋值和选择
    selectedModel: {
      type: String,
      default: "index"
    },
    //数据。
    columns: {
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
    //当前改变index项时，改变时执行的函数。如果返回false，将会阻止本次改变,可以是Promise
    //提供了即将改变的数据和将要改变到目标的数据
    //结构 为 from:{itemindex,levelIndex,data},to:{itemindex,levelIndex,data}。
    beforeChange: {
      type: [Boolean, Function],
      default: () => false
    },
    //v-model:show来双向绑定显示和隐藏选择器。
    show: {
      type: [Boolean],
      default: false
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
    btnRound: {
      type: Number,
      default: 0
    },
    round: {
      type: Number,
      default: 12
    },
    height: {
      type: Number,
      default: 700
    },
    immediateChange: {
      type: Boolean,
      default: false
    },
    /** 是否嵌入弹层，开启后将在它的父组件内执行弹层。 */
    inContent: {
      type: Boolean,
      default: false
    },
    /**禁用时，通过插槽点击时，不会触发显示本组件，适合表单 */
    disabled: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: [Number, String],
      default: 999
    },
    //弹出的动画时间单位ms.
    duration: {
      type: Number,
      default: 300
    }
  }),
  emits: ["update:show", "update:modelValue", "update:modelStr", "confirm", "cancel", "close", "open"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    const drawer = common_vendor.ref(null);
    (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const showCity = common_vendor.ref(true);
    const _colIndex = common_vendor.ref([]);
    const _data = common_vendor.computed(() => props.columns);
    const _colStr = common_vendor.ref(props.modelStr);
    const aniover = common_vendor.ref(true);
    const sysinfo = tmui_tool_useFun_useWindowInfo.useWindowInfo();
    let tmid = NaN;
    common_vendor.watchEffect(() => {
      showCity.value = props.show;
    });
    common_vendor.watch(
      [() => props.columns, () => props.modelValue],
      () => {
        clearTimeout(tmid);
        tmid = setTimeout(function() {
          getIndexBymodel(_data.value, props.selectedModel, 0, props.modelValue);
          defaultModerStrGet();
        }, 500);
      },
      { deep: true }
    );
    function closeDrawer(e) {
      showCity.value = e;
      emits("update:show", showCity.value);
      getIndexBymodel(_data.value, props.selectedModel, 0, props.modelValue);
      emits("close");
    }
    function drawerOpen() {
      emits("open");
    }
    common_vendor.onMounted(() => {
      if (props.defaultValue.length > 0) {
        getIndexBymodel(_data.value, props.selectedModel, 0, props.defaultValue);
        defaultModerStrGet();
      }
    });
    function confirm() {
      if (_colIndex.value.length == 0) {
        getIndexBymodelByEmptyOnConfirm(_data.value, props.selectedModel, 0, props.defaultValue);
      }
      setVal();
      common_vendor.nextTick$1(() => {
        var _a2;
        emits("confirm", common_vendor.toRaw(_colIndex.value));
        (_a2 = drawer.value) == null ? void 0 : _a2.close();
      });
    }
    function cancel() {
      if (!aniover.value)
        return;
      emits("cancel");
    }
    function setVal() {
      var _a2;
      let val = [];
      if (props.selectedModel == "name") {
        val = (_a2 = _colStr.value.split("/")) != null ? _a2 : [];
      } else if (props.selectedModel == "id") {
        val = getRouterId(_data.value, 0);
      } else {
        val = [..._colIndex.value];
      }
      emits("update:modelValue", val);
      emits("update:modelStr", _colStr.value);
    }
    function defaultModerStrGet() {
      clearTimeout(tmid);
      tmid = setTimeout(function() {
        if (!_colStr.value && _colIndex.value.length > 0) {
          let text = getRouterText(_data.value, 0);
          let str = text.join("/");
          emits("update:modelStr", str);
        }
        if (_colIndex.value.length == 0) {
          emits("update:modelStr", "");
        }
      }, 100);
    }
    function getIndexBymodel(vdata = [], model = "name", parentIndex = 0, value = []) {
      if (value.length == 0) {
        _colIndex.value = [];
        return [];
      }
      let p_colIndex = [..._colIndex.value];
      _colIndex.value = [];
      if (model == "name") {
        let item = vdata.filter((el) => value[parentIndex] == el["text"]);
        if (item.length == 0)
          ;
        else {
          item = item[0];
          if (item) {
            p_colIndex[parentIndex] = vdata.findIndex((el) => el["text"] == item["text"]);
            if (item["children"]) {
              getIndexBymodel(item["children"], model, parentIndex + 1, value);
            }
          }
        }
      } else if (model == "id") {
        let item = vdata.filter((el) => value[parentIndex] == el["id"]);
        if (item.length == 0)
          ;
        else {
          item = item[0];
          if (item) {
            p_colIndex[parentIndex] = vdata.findIndex((el) => el["id"] == item["id"]);
            if (item["children"]) {
              getIndexBymodel(item["children"], model, parentIndex + 1, value);
            }
          }
        }
      } else {
        p_colIndex = [...value];
      }
      _colIndex.value = [...p_colIndex];
      return _colIndex.value;
    }
    function getIndexBymodelByEmptyOnConfirm(vdata = [], model = "name", parentIndex = 0, value = []) {
      let p_colIndex = [..._colIndex.value];
      _colIndex.value = [];
      if (model == "name") {
        let item = vdata.filter((el) => value[parentIndex] == el[props.mapKey]);
        if (item.length == 0) {
          item = vdata[0];
          if (item) {
            value[parentIndex] = item[props.mapKey];
            p_colIndex[parentIndex] = 0;
            if (item["children"]) {
              getIndexBymodel(item["children"], model, parentIndex + 1, value);
            }
          }
        } else {
          item = item[0];
          if (item) {
            p_colIndex[parentIndex] = vdata.findIndex((el) => el[props.mapKey] == item[props.mapKey]);
            if (item["children"]) {
              getIndexBymodel(item["children"], model, parentIndex + 1, value);
            }
          }
        }
      } else if (model == "id") {
        let item = vdata.filter((el) => value[parentIndex] == el["id"]);
        if (item.length == 0) {
          item = vdata[0];
          if (item) {
            value[parentIndex] = item["id"];
            p_colIndex[parentIndex] = 0;
            if (item["children"]) {
              getIndexBymodel(item["children"], model, parentIndex + 1, value);
            }
          }
        } else {
          item = item[0];
          if (item) {
            p_colIndex[parentIndex] = vdata.findIndex((el) => el["id"] == item["id"]);
            if (item["children"]) {
              getIndexBymodel(item["children"], model, parentIndex + 1, value);
            }
          }
        }
      } else {
        p_colIndex = [...value];
      }
      _colIndex.value = [...p_colIndex];
      return _colIndex.value;
    }
    function getRouterId(list = [], parentIndex = 0) {
      let p = [];
      for (let i = 0; i < list.length; i++) {
        if (i == _colIndex.value[parentIndex]) {
          p.push(list[i]["id"]);
          if (typeof _colIndex.value[parentIndex] != "undefined") {
            let c = getRouterId(list[i]["children"], parentIndex + 1);
            p = [...p, ...c];
          }
          break;
        }
      }
      return p;
    }
    function getRouterText(list = [], parentIndex = 0) {
      let p = [];
      for (let i = 0; i < list.length; i++) {
        if (i == _colIndex.value[parentIndex]) {
          p.push(list[i][props.mapKey || "text"]);
          if (typeof _colIndex.value[parentIndex] != "undefined") {
            let c = getRouterText(list[i]["children"], parentIndex + 1);
            p = [...p, ...c];
          }
          break;
        }
      }
      return p;
    }
    const dHeight = common_vendor.computed(() => {
      return props.height + sysinfo.bottomSafe + 80;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showCity.value
      }, showCity.value ? {
        b: common_vendor.o(($event) => aniover.value = true),
        c: common_vendor.o(($event) => aniover.value = false),
        d: common_vendor.o(($event) => _colIndex.value = $event),
        e: common_vendor.o(($event) => _colStr.value = $event),
        f: common_vendor.p({
          dataKey: props.mapKey || props.dataKey,
          ["map-key"]: props.mapKey || props.dataKey,
          height: common_vendor.unref(dHeight) - 230,
          modelValue: _colIndex.value,
          ["model-str"]: _colStr.value,
          ["default-value"]: _colIndex.value,
          beforeChange: props.beforeChange,
          immediateChange: props.immediateChange,
          columns: common_vendor.unref(_data)
        })
      } : {}, {
        g: common_vendor.o(confirm),
        h: common_vendor.p({
          label: "确认选择",
          block: true,
          margin: [32, 12],
          color: props.color,
          linear: props.linear,
          ["linear-deep"]: props.linearDeep,
          round: props.btnRound
        }),
        i: common_vendor.unref(sysinfo).bottomSafe + "px",
        j: common_vendor.sr(drawer, "838a1e12-0", {
          "k": "drawer"
        }),
        k: common_vendor.o(drawerOpen),
        l: common_vendor.o(cancel),
        m: common_vendor.o(confirm),
        n: common_vendor.o(closeDrawer),
        o: common_vendor.p({
          zIndex: props.zIndex,
          inContent: props.inContent,
          disabbleScroll: true,
          round: props.round,
          height: common_vendor.unref(dHeight),
          closeable: true,
          overlayClick: aniover.value,
          show: showCity.value,
          title: "请选择",
          ["ok-text"]: "确认"
        }),
        p: common_vendor.o(($event) => showCity.value = !props.disabled ? !showCity.value : false)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/zhidianUniapp/src/tmui/components/tm-picker/tm-picker.vue"]]);
wx.createComponent(Component);
