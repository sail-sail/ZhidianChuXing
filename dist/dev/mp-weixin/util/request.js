"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const common_vendor = require("../common/vendor.js");
const util_config = require("./config.js");
const httpInterceptor = {
  // 拦截前触发
  invoke(options) {
    if (!options.url.startsWith("http")) {
      options.url = util_config.config.baseUrl + options.url;
    }
    options.timeout = 5e3;
    options.header = __spreadProps(__spreadValues({}, options.header), {
      "source-client": "miniapp",
      "content-type": "application/x-www-form-urlencoded;application/json"
    });
    options.header.Authorization = util_config.config.token;
    options.dataType = "json";
  },
  success(args) {
  },
  fail(err) {
  },
  complete(res) {
  }
};
common_vendor.index.addInterceptor("request", httpInterceptor);
common_vendor.index.addInterceptor("uploadFile", httpInterceptor);
const request = (options) => new Promise((resolve, reject) => {
  common_vendor.index.request(__spreadProps(__spreadValues({}, options), {
    // 响应成功
    success(res) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        resolve(res.data);
      } else if (res.statusCode === 401) {
        reject(res);
      } else {
        reject(res);
      }
    },
    // 响应失败
    fail(err) {
      common_vendor.index.showToast({
        icon: "none",
        title: "网络错误，换个网络试试"
      });
      reject(err);
    }
  }));
});
exports.request = request;
