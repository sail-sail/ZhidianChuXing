"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const tmui_index = require("./tmui/index.js");
require("./tmui/tool/lib/fetch.js");
require("./tmui/tool/function/util.js");
require("./tmui/tool/function/preview.js");
require("./tmui/tool/lib/language.js");
require("./tmui/tool/lib/share.js");
require("./tmui/tool/router/index.js");
require("./tmui/tool/lib/tmuiconfigDefault.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/baseInfo/index.js";
  "./pages/my/index.js";
  "./pages/idCard/index.js";
  "./pages/driverCard/index.js";
  "./pages/orderList/index.js";
  "./pages/calendar/index.js";
}
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/zhidianUniapp/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(tmui_index.tmui, { shareDisable: false });
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
