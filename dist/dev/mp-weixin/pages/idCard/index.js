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
  const _easycom_tm_image2 = common_vendor.resolveComponent("tm-image");
  const _easycom_tm_divider2 = common_vendor.resolveComponent("tm-divider");
  const _easycom_tm_input2 = common_vendor.resolveComponent("tm-input");
  const _easycom_tm_form_item2 = common_vendor.resolveComponent("tm-form-item");
  const _easycom_tm_radio2 = common_vendor.resolveComponent("tm-radio");
  const _easycom_tm_radio_group2 = common_vendor.resolveComponent("tm-radio-group");
  const _easycom_tm_form2 = common_vendor.resolveComponent("tm-form");
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  const _easycom_tm_time_between2 = common_vendor.resolveComponent("tm-time-between");
  const _easycom_tm_drawer2 = common_vendor.resolveComponent("tm-drawer");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_cell2 + _easycom_tm_image2 + _easycom_tm_divider2 + _easycom_tm_input2 + _easycom_tm_form_item2 + _easycom_tm_radio2 + _easycom_tm_radio_group2 + _easycom_tm_form2 + _easycom_tm_button2 + _easycom_tm_time_between2 + _easycom_tm_drawer2 + _easycom_tm_app2)();
}
const _easycom_tm_cell = () => "../../tmui/components/tm-cell/tm-cell.js";
const _easycom_tm_image = () => "../../tmui/components/tm-image/tm-image.js";
const _easycom_tm_divider = () => "../../tmui/components/tm-divider/tm-divider.js";
const _easycom_tm_input = () => "../../tmui/components/tm-input/tm-input.js";
const _easycom_tm_form_item = () => "../../tmui/components/tm-form-item/tm-form-item.js";
const _easycom_tm_radio = () => "../../tmui/components/tm-radio/tm-radio.js";
const _easycom_tm_radio_group = () => "../../tmui/components/tm-radio-group/tm-radio-group.js";
const _easycom_tm_form = () => "../../tmui/components/tm-form/tm-form.js";
const _easycom_tm_button = () => "../../tmui/components/tm-button/tm-button.js";
const _easycom_tm_time_between = () => "../../tmui/components/tm-time-between/tm-time-between.js";
const _easycom_tm_drawer = () => "../../tmui/components/tm-drawer/tm-drawer.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_cell + _easycom_tm_image + _easycom_tm_divider + _easycom_tm_input + _easycom_tm_form_item + _easycom_tm_radio + _easycom_tm_radio_group + _easycom_tm_form + _easycom_tm_button + _easycom_tm_time_between + _easycom_tm_drawer + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    let idCard = common_vendor.reactive({
      frontSrc: "",
      backSrc: "",
      name: "",
      idCardNum: "",
      sex: "",
      licence: "",
      startDate: void 0,
      endDate: void 0
    });
    let showDate = common_vendor.ref(false);
    function upLoad(type) {
      return __async(this, null, function* () {
        const imgs = yield util_util.upLoadImg();
        if (imgs && Array.isArray(imgs)) {
          if (type === "font") {
            idCard.frontSrc = imgs[0];
          } else {
            idCard.backSrc = imgs[0];
          }
        }
        yield common_vendor.nextTick$1();
      });
    }
    function handleDateConfirm(rang) {
      idCard.startDate = rang[0];
      idCard.endDate = rang[1];
      showDate.value = false;
    }
    function confirm() {
      common_vendor.index.showModal({
        title: "确认提交吗?"
      });
    }
    common_vendor.onMounted(() => __async(this, null, function* () {
    }));
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          margin: [0, 0],
          padding: [0, 15],
          titleFontSize: 30,
          title: "身份证",
          rightIcon: ""
        }),
        b: common_vendor.p({
          width: 320,
          height: 250,
          src: common_vendor.unref(idCard).frontSrc,
          showLoad: false,
          border: 1
        }),
        c: common_vendor.o(($event) => upLoad("font")),
        d: common_vendor.o(($event) => upLoad("back")),
        e: common_vendor.p({
          width: 320,
          height: 250,
          src: common_vendor.unref(idCard).backSrc,
          showLoad: false,
          border: 1
        }),
        f: common_vendor.o(($event) => upLoad("back")),
        g: common_vendor.p({
          color: "#efefef",
          margin: [0, 24]
        }),
        h: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(idCard).name = $event, {
          lazy: true
        }, true)),
        i: common_vendor.p({
          inputPadding: [0, 0],
          transprent: true,
          showBottomBotder: false,
          placeholder: "请输入 姓名",
          modelValue: common_vendor.unref(idCard).name
        }),
        j: common_vendor.p({
          label: "姓名",
          field: "name",
          rules: []
        }),
        k: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(idCard).idCardNum = $event, {
          lazy: true
        }, true)),
        l: common_vendor.p({
          inputPadding: [0, 0],
          transprent: true,
          showBottomBotder: false,
          placeholder: "请输入 身份证号码",
          modelValue: common_vendor.unref(idCard).idCardNum
        }),
        m: common_vendor.p({
          label: "身份证号码",
          field: "idCardNum",
          rules: []
        }),
        n: common_vendor.p({
          label: "男",
          value: "male"
        }),
        o: common_vendor.p({
          label: "女",
          value: "female"
        }),
        p: common_vendor.o(($event) => common_vendor.unref(idCard).radio = $event),
        q: common_vendor.p({
          modelValue: common_vendor.unref(idCard).radio
        }),
        r: common_vendor.p({
          label: "性别",
          field: "radio",
          rules: []
        }),
        s: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(idCard).licence = $event, {
          lazy: true
        }, true)),
        t: common_vendor.p({
          inputPadding: [0, 0],
          transprent: true,
          showBottomBotder: false,
          placeholder: "请输入 发证机关",
          modelValue: common_vendor.unref(idCard).licence
        }),
        v: common_vendor.p({
          label: "发证机关",
          field: "licence",
          rules: []
        }),
        w: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(idCard).licence = $event, {
          lazy: true
        }, true)),
        x: common_vendor.p({
          inputPadding: [0, 0],
          transprent: true,
          showBottomBotder: false,
          placeholder: "请输入 发证机关",
          modelValue: common_vendor.unref(idCard).licence
        }),
        y: common_vendor.p({
          label: "发证机关",
          field: "licence",
          rules: []
        }),
        z: common_vendor.t(!common_vendor.unref(idCard).startDate ? "开始时间" : common_vendor.unref(common_vendor.dayjs)(common_vendor.unref(idCard).startDate).format("YYYY-MM-DD")),
        A: common_vendor.t(!common_vendor.unref(idCard).endDate ? "结束时间" : common_vendor.unref(common_vendor.dayjs)(common_vendor.unref(idCard).endDate).format("YYYY-MM-DD")),
        B: common_vendor.o(($event) => common_vendor.isRef(showDate) ? showDate.value = true : showDate = true),
        C: common_vendor.p({
          label: "有效期",
          field: "startDate",
          rules: []
        }),
        D: common_vendor.sr(idCard, "612e0067-5,612e0067-0", {
          "k": "idCard"
        }),
        E: common_vendor.p({
          ["label-width"]: 190,
          margin: [0, 0]
        }),
        F: common_vendor.o(confirm),
        G: common_vendor.p({
          ["font-color"]: "#fff",
          margin: [25, 20],
          round: 10,
          width: 600
        }),
        H: common_vendor.o(handleDateConfirm),
        I: common_vendor.p({
          asyncModel: false,
          quickBtn: [],
          start: /* @__PURE__ */ new Date("2000/01/01"),
          end: /* @__PURE__ */ new Date("2050/12/31")
        }),
        J: common_vendor.o(($event) => common_vendor.isRef(showDate) ? showDate.value = $event : showDate = $event),
        K: common_vendor.p({
          height: 600,
          hideHeader: true,
          show: common_vendor.unref(showDate)
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-612e0067"], ["__file", "D:/zhidianUniapp/src/pages/idCard/index.vue"]]);
wx.createPage(MiniProgramPage);
