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
const pages_index_Api = require("./Api.js");
const store_calendar = require("../../store/calendar.js");
require("../../util/request.js");
require("../../util/config.js");
require("../../util/common.js");
require("../calendar/config.js");
if (!Array) {
  const _easycom_tm_carousel2 = common_vendor.resolveComponent("tm-carousel");
  const _easycom_tm_divider2 = common_vendor.resolveComponent("tm-divider");
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  const _easycom_tm_icon2 = common_vendor.resolveComponent("tm-icon");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_carousel2 + _easycom_tm_divider2 + _easycom_tm_button2 + _easycom_tm_icon2 + _easycom_tm_app2)();
}
const _easycom_tm_carousel = () => "../../tmui/components/tm-carousel/tm-carousel.js";
const _easycom_tm_divider = () => "../../tmui/components/tm-divider/tm-divider.js";
const _easycom_tm_button = () => "../../tmui/components/tm-button/tm-button.js";
const _easycom_tm_icon = () => "../../tmui/components/tm-icon/tm-icon.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_carousel + _easycom_tm_divider + _easycom_tm_button + _easycom_tm_icon + Tabbar + _easycom_tm_app)();
}
const Tabbar = () => "../tabBar/tabBar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const calendarStore = store_calendar.useCalendarStore();
    let bannerList = common_vendor.ref([]);
    let address = common_vendor.ref("质电出行(虹桥客运站店)");
    let startDateTime = common_vendor.computed(() => calendarStore.startDateTime);
    let endDateTime = common_vendor.computed(() => calendarStore.endDateTime);
    let totalDayHour = common_vendor.computed(() => calendarStore.totalDayHour);
    let startWeekDay = common_vendor.computed(() => {
      const temp = common_vendor.dayjs(startDateTime.value[0]).format("dddd");
      const weekDay = calendarStore.weekDay[temp];
      return weekDay;
    });
    let endWeekDay = common_vendor.computed(() => {
      const temp = common_vendor.dayjs(endDateTime.value[0]).format("dddd");
      const weekDay = calendarStore.weekDay[temp];
      return weekDay;
    });
    function goCalendar() {
      common_vendor.index.navigateTo({
        url: "/pages/calendar/index"
      });
    }
    function callPhone() {
      common_vendor.index.makePhoneCall({
        phoneNumber: "400-1234-1234"
      });
    }
    function startNavigation() {
      common_vendor.index.openLocation({
        latitude: 31.194283,
        // 纬度，浮点数，范围为90 ~ -90
        longitude: 121.317207,
        // 经度，浮点数，范围为180 ~ -180。
        name: "质电出行(虹桥客运站店)",
        // 位置名
        address: "上海市闵行区申虹路298号"
        // 地址详情说明
      });
    }
    common_vendor.onMounted(() => __async(this, null, function* () {
      const res = yield pages_index_Api.getBannerList();
      if (res && res.banner) {
        bannerList.value = res.banner.map((i) => i.image);
      }
    }));
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          autoplay: true,
          margin: [0, 10],
          round: 0,
          width: 750,
          height: 380,
          list: common_vendor.unref(bannerList)
        }),
        b: common_vendor.t(common_vendor.unref(address)),
        c: common_vendor.p({
          color: "#efefef",
          margin: [0, 0]
        }),
        d: common_vendor.t(common_vendor.unref(startWeekDay)),
        e: common_vendor.t(common_vendor.unref(startDateTime)[1]),
        f: common_vendor.t(common_vendor.unref(startDateTime)[0]),
        g: common_vendor.o(goCalendar),
        h: common_vendor.t(common_vendor.unref(totalDayHour)[0] ? common_vendor.unref(totalDayHour)[0] + "天" : null),
        i: common_vendor.t(common_vendor.unref(totalDayHour)[1] ? common_vendor.unref(totalDayHour)[1] + "时" : null),
        j: common_vendor.t(common_vendor.unref(endWeekDay)),
        k: common_vendor.t(common_vendor.unref(endDateTime)[1]),
        l: common_vendor.t(common_vendor.unref(endDateTime)[0]),
        m: common_vendor.o(goCalendar),
        n: common_vendor.p({
          ["font-color"]: "#fff",
          margin: [100, 20],
          round: 10,
          width: 550
        }),
        o: common_vendor.p({
          color: "blue",
          ["font-size"]: 32,
          name: "tmicon-phone-fill"
        }),
        p: common_vendor.o(callPhone),
        q: common_vendor.p({
          color: "blue",
          ["font-size"]: 32,
          name: "tmicon-paperplane-fill"
        }),
        r: common_vendor.o(startNavigation)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"], ["__file", "D:/zhidianUniapp/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
