"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-radio-group",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: [String, Number, Boolean, null],
      default: ""
    },
    modelValue: {
      type: [String, Number, Boolean, null],
      default: ""
    },
    direction: {
      type: String,
      default: "row"
      //row横排，col为竖排。
    },
    align: {
      type: String,
      default: "left"
    },
    //模式
    /**
     * radio:正常的单选样式。
     * button:按钮单选模式
     */
    model: {
      type: String,
      default: "radio"
      // radio,button
    }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b;
    const props = __props;
    (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    let _cacheBoxList = [];
    const _mValue = common_vendor.ref(props.defaultValue || props.modelValue);
    const _align = common_vendor.computed(() => {
      let list = {
        left: "flex-row-center-start",
        center: "flex-row-center-center",
        right: "flex-row-center-end"
      };
      let listCol = {
        left: "flex-col-center-start",
        center: "flex-col-center-center",
        right: "flex-col-center-end"
      };
      return props.direction == "row" ? list[props.align] : listCol[props.align];
    });
    const checkBoxkeyId = "tmRadioBoxGroup";
    common_vendor.watch(
      () => props.modelValue,
      () => {
        _mValue.value = props.modelValue;
      },
      { deep: true }
    );
    function pushKey(key) {
      _cacheBoxList.push(key);
    }
    common_vendor.nextTick$1(() => {
      const _filter_key = _cacheBoxList.filter((el) => el == _mValue.value);
      if (_filter_key.length > 0) {
        _mValue.value = _filter_key[0];
      }
      emits("update:modelValue", _mValue.value);
    });
    function addKey(key) {
      _mValue.value = key;
      emits("update:modelValue", _mValue.value);
      common_vendor.nextTick$1(() => {
        emits("change", _mValue.value);
      });
    }
    common_vendor.provide(
      "tmRadioBoxDisabled",
      common_vendor.computed(() => props.disabled)
    );
    common_vendor.provide("tmRadioBoxVal", _mValue);
    common_vendor.provide(
      "tmRadioBoxModel",
      common_vendor.computed(() => props.model == "radio")
    );
    common_vendor.provide("tmCheckedBoxDir", props.direction);
    expose({ pushKey, addKey, checkBoxkeyId });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(props.direction == "row" ? "flex-row" : "flex-col"),
        b: common_vendor.n(props.direction == "customCol" ? "" : common_vendor.unref(_align)),
        c: props.direction == "customCol" ? "nowrap" : "wrap"
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/zhidianUniapp/src/tmui/components/tm-radio-group/tm-radio-group.vue"]]);
wx.createComponent(Component);
