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
const util_util = require("../../util/util.js");
if (!Array) {
  const _easycom_tm_cell2 = common_vendor.resolveComponent("tm-cell");
  const _easycom_tm_avatar2 = common_vendor.resolveComponent("tm-avatar");
  const _easycom_tm_card2 = common_vendor.resolveComponent("tm-card");
  const _easycom_tm_image2 = common_vendor.resolveComponent("tm-image");
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_cell2 + _easycom_tm_avatar2 + _easycom_tm_card2 + _easycom_tm_image2 + _easycom_tm_button2 + _easycom_tm_app2)();
}
const _easycom_tm_cell = () => "../../tmui/components/tm-cell/tm-cell.js";
const _easycom_tm_avatar = () => "../../tmui/components/tm-avatar/tm-avatar.js";
const _easycom_tm_card = () => "../../tmui/components/tm-card/tm-card.js";
const _easycom_tm_image = () => "../../tmui/components/tm-image/tm-image.js";
const _easycom_tm_button = () => "../../tmui/components/tm-button/tm-button.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_cell + _easycom_tm_avatar + _easycom_tm_card + _easycom_tm_image + _easycom_tm_button + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let base = common_vendor.ref({
      nickname: "中国移动",
      avatar: "https://picsum.photos/200/300",
      phone: "13800138000",
      emergencyContact: ""
    });
    function upload() {
      return __async(this, null, function* () {
        const imgs = yield util_util.upLoadImg();
        if (imgs && Array.isArray(imgs)) {
          base.value.avatar = imgs[0];
        }
      });
    }
    function certificate(type) {
      if (type === "idCard") {
        common_vendor.index.navigateTo({
          url: "/pages/idCard/index"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/driverCard/index"
        });
      }
    }
    common_vendor.onMounted(() => __async(this, null, function* () {
    }));
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(base).nickname),
        b: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30,
          title: "昵称"
        }),
        c: common_vendor.p({
          img: common_vendor.unref(base).avatar,
          round: 12,
          size: 65
        }),
        d: common_vendor.o(upload),
        e: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30,
          title: "个人头像"
        }),
        f: common_vendor.t(common_vendor.unref(base).phone),
        g: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30,
          title: "手机号"
        }),
        h: common_vendor.t(common_vendor.unref(base).emergencyContact === "" ? "去添加" : common_vendor.unref(base).emergencyContact),
        i: common_vendor.p({
          margin: [0, 0],
          titleFontSize: 30,
          title: "紧急联系人"
        }),
        j: common_vendor.p({
          title: "基本信息"
        }),
        k: common_vendor.p({
          margin: [0, 0],
          padding: [0, 15],
          titleFontSize: 30,
          title: "身份证",
          rightIcon: ""
        }),
        l: common_vendor.o(($event) => certificate("idCard")),
        m: common_vendor.p({
          width: 650,
          height: 230,
          src: "https://store.tmui.design/api_v2/public/random_picture"
        }),
        n: common_vendor.p({
          margin: [0, 0],
          padding: [0, 15],
          titleFontSize: 30,
          title: "驾驶证",
          rightIcon: ""
        }),
        o: common_vendor.o(($event) => certificate("driverCard")),
        p: common_vendor.p({
          width: 650,
          height: 230,
          src: "https://store.tmui.design/api_v2/public/random_picture"
        }),
        q: common_vendor.p({
          title: "证照信息"
        }),
        r: common_vendor.p({
          ["font-color"]: "#fff",
          margin: [70, 20],
          round: 10,
          width: 600
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e1b7d84a"], ["__file", "D:/zhidianUniapp/src/pages/baseInfo/index.vue"]]);
wx.createPage(MiniProgramPage);
