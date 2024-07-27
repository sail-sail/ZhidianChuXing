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
const util_request = require("../../util/request.js");
const util_common = require("../../util/common.js");
function getBannerList() {
  return __async(this, null, function* () {
    const res = yield util_request.request({
      url: "/api/index.index/bannerList"
    });
    if (res.code === 1) {
      const banner = res.data.banner;
      if (banner && Array.isArray(banner)) {
        banner.forEach((i) => {
          i.image = util_common.common.getImgUrl(i.image);
        });
      }
      return res.data;
    } else {
      common_vendor.index.showToast({
        icon: "none",
        title: res.msg
      });
    }
  });
}
exports.getBannerList = getBannerList;
