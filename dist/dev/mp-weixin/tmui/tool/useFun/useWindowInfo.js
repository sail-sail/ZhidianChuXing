"use strict";
const common_vendor = require("../../../common/vendor.js");
const useWindowInfo = () => {
  let winSize = common_vendor.reactive({
    top: 0,
    topSafe: 0,
    width: common_vendor.index.upx2px(750),
    height: common_vendor.index.upx2px(750),
    statusBar: 24,
    navigatorBar: 44,
    bottomSafe: 0,
    nvue: false,
    // 是否存在系统自带的状态栏，针对h5优化。
    h5IsSystemBar: true
  });
  function init() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let sysinfo = common_vendor.index.getSystemInfoSync();
    winSize.topSafe = ((_a = sysinfo == null ? void 0 : sysinfo.statusBarHeight) != null ? _a : 24) + ((_b = sysinfo == null ? void 0 : sysinfo.navigationBarHeight) != null ? _b : 44);
    winSize.width = (_c = sysinfo == null ? void 0 : sysinfo.windowWidth) != null ? _c : common_vendor.index.upx2px(750);
    winSize.height = (_d = sysinfo == null ? void 0 : sysinfo.windowHeight) != null ? _d : common_vendor.index.upx2px(750);
    winSize.statusBar = (_e = sysinfo == null ? void 0 : sysinfo.statusBarHeight) != null ? _e : 24;
    winSize.navigatorBar = (_f = sysinfo == null ? void 0 : sysinfo.navigationBarHeight) != null ? _f : 44;
    winSize.bottomSafe = (_h = (_g = sysinfo.safeAreaInsets) == null ? void 0 : _g.bottom) != null ? _h : 0;
  }
  init();
  common_vendor.onMounted(() => {
    setTimeout(() => {
      init();
    }, 0);
  });
  return winSize;
};
exports.useWindowInfo = useWindowInfo;
