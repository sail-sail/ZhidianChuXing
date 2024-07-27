"use strict";
const common_vendor = require("../common/vendor.js");
const useTabBarStore = common_vendor.defineStore("tarBar", function() {
  let activeIndex = common_vendor.ref(0);
  function setActiveIndex(currentIndex) {
    activeIndex.value = currentIndex;
  }
  return {
    activeIndex,
    setActiveIndex
  };
});
exports.useTabBarStore = useTabBarStore;
