"use strict";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_tm_segtab2 = common_vendor.resolveComponent("tm-segtab");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_segtab2 + _easycom_tm_app2)();
}
const _easycom_tm_segtab = () => "../../tmui/components/tm-segtab/tm-segtab.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_segtab + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let list = common_vendor.ref([
      { text: "已预订", id: "1" },
      { text: "进行中", id: "2" },
      { text: "已完成", id: "3" },
      { text: "已取消", id: "4" }
    ]);
    common_vendor.onMounted(() => __async(this, null, function* () {
    }));
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          width: 750,
          list: common_vendor.unref(list),
          defaultValue: "2"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-37f2245a"], ["__file", "D:/zhidianUniapp/src/pages/orderList/index.vue"]]);
wx.createPage(MiniProgramPage);
