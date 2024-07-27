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
const store_tabBar = require("../../store/tabBar.js");
if (!Array) {
  const _easycom_tm_tabbar_item2 = common_vendor.resolveComponent("tm-tabbar-item");
  const _easycom_tm_tabbar2 = common_vendor.resolveComponent("tm-tabbar");
  (_easycom_tm_tabbar_item2 + _easycom_tm_tabbar2)();
}
const _easycom_tm_tabbar_item = () => "../../tmui/components/tm-tabbar-item/tm-tabbar-item.js";
const _easycom_tm_tabbar = () => "../../tmui/components/tm-tabbar/tm-tabbar.js";
if (!Math) {
  (_easycom_tm_tabbar_item + _easycom_tm_tabbar)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tabBar",
  setup(__props) {
    const tabBarStore = store_tabBar.useTabBarStore();
    let activeIndex = common_vendor.computed(() => tabBarStore.activeIndex);
    function setActiveIndex(index) {
      return __async(this, null, function* () {
        if (activeIndex.value !== index) {
          if (index === 0) {
            common_vendor.index.navigateTo({
              url: "/pages/index/index"
            });
          } else {
            common_vendor.index.navigateTo({
              url: "/pages/my/index"
            });
          }
        }
        tabBarStore.setActiveIndex(index);
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => setActiveIndex(0)),
        b: common_vendor.p({
          activeColor: "blue",
          text: "首页",
          icon: "tmicon-home"
        }),
        c: common_vendor.o(($event) => setActiveIndex(1)),
        d: common_vendor.p({
          activeColor: "blue",
          text: "我的",
          icon: "tmicon-account"
        }),
        e: common_vendor.o(($event) => common_vendor.isRef(activeIndex) ? activeIndex.value = $event : activeIndex = $event),
        f: common_vendor.p({
          autoSelect: false,
          width: 0,
          active: common_vendor.unref(activeIndex)
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/zhidianUniapp/src/pages/tabBar/tabBar.vue"]]);
wx.createComponent(Component);
