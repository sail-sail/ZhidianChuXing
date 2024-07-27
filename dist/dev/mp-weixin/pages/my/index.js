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
  const _easycom_tm_avatar2 = common_vendor.resolveComponent("tm-avatar");
  const _easycom_tm_icon2 = common_vendor.resolveComponent("tm-icon");
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_grid_item2 = common_vendor.resolveComponent("tm-grid-item");
  const _easycom_tm_grid2 = common_vendor.resolveComponent("tm-grid");
  const _easycom_tm_card2 = common_vendor.resolveComponent("tm-card");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_avatar2 + _easycom_tm_icon2 + _easycom_tm_text2 + _easycom_tm_grid_item2 + _easycom_tm_grid2 + _easycom_tm_card2 + _easycom_tm_app2)();
}
const _easycom_tm_avatar = () => "../../tmui/components/tm-avatar/tm-avatar.js";
const _easycom_tm_icon = () => "../../tmui/components/tm-icon/tm-icon.js";
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_grid_item = () => "../../tmui/components/tm-grid-item/tm-grid-item.js";
const _easycom_tm_grid = () => "../../tmui/components/tm-grid/tm-grid.js";
const _easycom_tm_card = () => "../../tmui/components/tm-card/tm-card.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_avatar + _easycom_tm_icon + _easycom_tm_text + _easycom_tm_grid_item + _easycom_tm_grid + _easycom_tm_card + Tabbar + _easycom_tm_app)();
}
const Tabbar = () => "../tabBar/tabBar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    function baseInfo() {
      common_vendor.index.navigateTo({
        url: "/pages/baseInfo/index"
      });
    }
    function orderList() {
      common_vendor.index.navigateTo({
        url: "/pages/orderList/index"
      });
    }
    common_vendor.onMounted(() => __async(this, null, function* () {
    }));
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          img: "https://picsum.photos/200/300",
          round: 12,
          size: 150
        }),
        b: common_vendor.o(baseInfo),
        c: common_vendor.p({
          name: "tmicon-layergroup-fill",
          ["font-size"]: 42
        }),
        d: common_vendor.p({
          ["font-size"]: 22,
          label: "待付款"
        }),
        e: common_vendor.o(orderList),
        f: common_vendor.p({
          name: "tmicon-layergroup-fill",
          ["font-size"]: 42
        }),
        g: common_vendor.p({
          ["font-size"]: 22,
          label: "进行中"
        }),
        h: common_vendor.o(orderList),
        i: common_vendor.p({
          name: "tmicon-layergroup-fill",
          ["font-size"]: 42
        }),
        j: common_vendor.p({
          ["font-size"]: 22,
          label: "已完成"
        }),
        k: common_vendor.o(orderList),
        l: common_vendor.p({
          name: "tmicon-layergroup-fill",
          ["font-size"]: 42
        }),
        m: common_vendor.p({
          ["font-size"]: 22,
          label: "已取消"
        }),
        n: common_vendor.o(orderList),
        o: common_vendor.p({
          width: 650,
          col: 4
        }),
        p: common_vendor.p({
          title: "我的订单"
        }),
        q: common_vendor.p({
          name: "tmicon-layergroup-fill",
          ["font-size"]: 42
        }),
        r: common_vendor.p({
          ["font-size"]: 22,
          label: "收藏车辆"
        }),
        s: common_vendor.p({
          name: "tmicon-layergroup-fill",
          ["font-size"]: 42
        }),
        t: common_vendor.p({
          ["font-size"]: 22,
          label: "优惠卷"
        }),
        v: common_vendor.p({
          name: "tmicon-layergroup-fill",
          ["font-size"]: 42
        }),
        w: common_vendor.p({
          ["font-size"]: 22,
          label: "团购订单"
        }),
        x: common_vendor.p({
          name: "tmicon-layergroup-fill",
          ["font-size"]: 42
        }),
        y: common_vendor.p({
          ["font-size"]: 22,
          label: "客服"
        }),
        z: common_vendor.p({
          name: "tmicon-layergroup-fill",
          ["font-size"]: 42
        }),
        A: common_vendor.p({
          ["font-size"]: 22,
          label: "意见反馈"
        }),
        B: common_vendor.p({
          name: "tmicon-layergroup-fill",
          ["font-size"]: 42
        }),
        C: common_vendor.p({
          ["font-size"]: 22,
          label: "关于我们"
        }),
        D: common_vendor.p({
          name: "tmicon-layergroup-fill",
          ["font-size"]: 42
        }),
        E: common_vendor.p({
          ["font-size"]: 22,
          label: "后台管理"
        }),
        F: common_vendor.p({
          width: 650,
          col: 4
        }),
        G: common_vendor.p({
          title: "更多"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-276ac604"], ["__file", "D:/zhidianUniapp/src/pages/my/index.vue"]]);
wx.createPage(MiniProgramPage);
