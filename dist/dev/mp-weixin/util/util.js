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
const common_vendor = require("../common/vendor.js");
function upLoadImg() {
  return __async(this, null, function* () {
    const imgs = common_vendor.ref([]);
    return new Promise((resolve, reject) => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"],
        //从相册或者拍照
        success: function(res) {
          const tempFilePaths = res.tempFilePaths;
          console.log(tempFilePaths, "tempFilePaths");
          imgs.value.push(tempFilePaths[0]);
          resolve(imgs.value);
        }
      });
    });
  });
}
exports.upLoadImg = upLoadImg;
