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
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
const tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
const tmui_tool_useFun_useTheme = require("../../tool/useFun/useTheme.js");
const tmui_tool_useFun_useWindowInfo = require("../../tool/useFun/useWindowInfo.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-app",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    /**
     * 是否透明背景
     */
    transprent: {
      type: [Boolean, String],
      default: false
    },
    /**
     * 是否透明背景,等同transprent,因单词拼写错误，现在写一个正确的。
     */
    transparent: {
      type: [Boolean, String],
      default: false
    },
    //整体的主题色调同全局色一样。
    /**暂时不可用 */
    theme: {
      type: String,
      default: "grey-5"
    },
    bgImg: {
      type: String,
      default: ""
    },
    /** 背景层div的样式 */
    bgStyle: {
      type: String,
      default: ""
    },
    //应用的背景颜色。
    color: {
      type: String,
      default: "grey-4"
    },
    /**自定义暗黑的背景，你也可以通过全局配置 */
    darkColor: {
      type: String,
      default: "#050505"
    },
    /**是否模糊背景，暂时不可用 */
    blur: {
      type: [Boolean, String],
      default: false
    },
    /**这是一个淘汰的属性，请在pages.json中配置即可，会自动读取。而不需要在这里设置 */
    navbar: {
      type: Object,
      default: () => {
        return {
          background: "",
          fontColor: ""
        };
      }
    },
    /**是否自动修改系统自带的navbar的主题。 */
    navbarDarkAuto: {
      type: Boolean,
      default: true
    }
  }),
  setup(__props, { expose }) {
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const tmcfg = common_vendor.computed(() => store.tmStore);
    const isSetThemeOk = common_vendor.ref(false);
    const {
      dark,
      isNvue,
      customCSSStyle,
      customClass,
      parentClass,
      transparent,
      _props,
      proxy,
      blur,
      round,
      margin,
      padding,
      theme
    } = tmui_tool_useFun_useTheme.useTheme(common_vendor.computed(() => props), tmcfg);
    const tmcomputed = theme();
    let isTabbarPage = false;
    let nowPage = getCurrentPages().pop();
    const _bgStyle = common_vendor.computed(() => props.bgStyle);
    let winSize = tmui_tool_useFun_useWindowInfo.useWindowInfo();
    let appConfig = common_vendor.ref({
      width: winSize.width,
      height: winSize.height,
      theme: tmcomputed.value.backgroundColor,
      bgImg: props.bgImg,
      dark: dark.value
    });
    common_vendor.onLoad((opts) => {
      var _a, _b;
      try {
        (_b = store.tmuiConfig.router) == null ? void 0 : _b.useTmRouterAfter({
          path: (_a = nowPage == null ? void 0 : nowPage.route) != null ? _a : "",
          opts,
          context: proxy != null ? proxy : null
        });
      } catch (error) {
      }
    });
    common_vendor.onMounted(() => {
      _onInit();
    });
    function _onInit() {
      var _a, _b;
      let barLit = (_b = (_a = common_vendor.index.$tm.tabBar) == null ? void 0 : _a.list) != null ? _b : [];
      for (let i = 0; i < barLit.length; i++) {
        if ((nowPage == null ? void 0 : nowPage.route) == barLit[i].pagePath) {
          isTabbarPage = true;
          break;
        }
      }
      if (store.tmuiConfig.autoDark) {
        osChangeTheme(common_vendor.index.getSystemInfoSync().osTheme);
      } else {
        setAppStyle();
      }
    }
    common_vendor.watch([() => tmcfg.value.color, dark], () => {
      isSetThemeOk.value = false;
      setAppStyle();
    });
    common_vendor.watch([() => props.color], () => {
      appConfig.value.theme = tmcomputed.value.backgroundColor;
    });
    function setAppStyle() {
      var _a, _b, _c;
      if (dark.value) {
        appConfig.value.theme = ((_c = (_b = (_a = store.tmuiConfig) == null ? void 0 : _a.themeConfig) == null ? void 0 : _b.dark) == null ? void 0 : _c.bodyColor) || props.darkColor;
      } else {
        appConfig.value.theme = tmcomputed.value.backgroundColor;
      }
      common_vendor.index.setBackgroundColor({
        backgroundColor: appConfig.value.theme,
        backgroundColorBottom: appConfig.value.theme,
        backgroundColorTop: appConfig.value.theme
      }).catch((error) => {
      });
      if (dark.value) {
        try {
          if (!common_vendor.index.$tm.isOpenDarkModel && props.navbarDarkAuto) {
            common_vendor.index.setNavigationBarColor({
              backgroundColor: "#000000",
              frontColor: "#ffffff"
            }).catch((error) => {
            });
          }
        } catch (error) {
        }
        if (isTabbarPage) {
          if (common_vendor.index.$tm.tabBar.selectedColor.indexOf("@") == -1) {
            common_vendor.index.setTabBarStyle({
              backgroundColor: "#141415",
              borderStyle: "black",
              color: "#ffffff",
              selectedColor: common_vendor.index.$tm.tabBar.selectedColor || tmcomputed.value.textColor
            }).catch((error) => {
            });
          }
        }
      } else {
        try {
          let nowPageConfigs = common_vendor.index.$tm.pages.filter((el) => el.path == (nowPage == null ? void 0 : nowPage.route));
          if (nowPageConfigs.length > 0 && !props.navbar.background) {
            if (nowPageConfigs[0].navigationBarTextStyle.indexOf("@") > -1)
              return;
            let tcolor = nowPageConfigs[0].navigationBarTextStyle;
            tcolor = tcolor.toLocaleLowerCase();
            tcolor = tcolor == "black" ? "#000000" : tcolor;
            tcolor = tcolor == "white" ? "#ffffff" : tcolor;
            if (props.navbarDarkAuto) {
              common_vendor.index.setNavigationBarColor({
                backgroundColor: nowPageConfigs[0].navigationBarBackgroundColor,
                frontColor: tcolor
              }).catch((error) => {
              });
            }
            common_vendor.index.setStorageSync(
              "tmuiNavStyle",
              JSON.stringify({
                navbarBackground: nowPageConfigs[0].navigationBarBackgroundColor,
                navbarFontColor: tcolor
              })
            );
          } else if (!common_vendor.index.$tm.isOpenDarkModel) {
            if (props.navbarDarkAuto) {
              common_vendor.index.setNavigationBarColor({
                backgroundColor: props.navbar.background,
                frontColor: props.navbar.fontColor
              }).catch((error) => {
              });
            }
            common_vendor.index.setStorageSync(
              "tmuiNavStyle",
              JSON.stringify({
                navbarBackground: props.navbar.background,
                navbarFontColor: props.navbar.fontColor
              })
            );
          }
        } catch (error) {
        }
        try {
          if (isTabbarPage && !common_vendor.index.$tm.isOpenDarkModel) {
            common_vendor.index.setTabBarStyle({
              backgroundColor: common_vendor.index.$tm.tabBar.backgroundColor || props.navbar.background,
              borderStyle: common_vendor.index.$tm.tabBar.borderStyle || "white",
              color: common_vendor.index.$tm.tabBar.color || props.navbar.fontColor,
              selectedColor: common_vendor.index.$tm.tabBar.selectedColor || tmcomputed.value.textColor
            }).catch((error) => {
            });
          }
        } catch (error) {
        }
      }
      isSetThemeOk.value = true;
    }
    function setTheme(colorName) {
      store.setTmVuetifyTheme(colorName);
    }
    function setDark(darks) {
      let maindark = !dark.value;
      if (typeof darks !== "undefined" && typeof darks == "boolean") {
        maindark = darks;
      }
      appConfig.value.dark = maindark;
      store.setTmVuetifyDark(maindark);
      setAppStyle();
    }
    try {
      common_vendor.index.onThemeChange((ev) => {
        osChangeTheme(ev.theme);
      });
    } catch (error) {
      console.warn("没有主题切换功能：", error);
    }
    function osChangeTheme(ev) {
      if (!store.tmuiConfig.autoDark)
        return;
      if (ev === "light") {
        setDark(false);
      } else if (ev === "dark") {
        setDark(true);
      }
    }
    common_vendor.provide(
      "appTextColor",
      common_vendor.computed(() => tmcomputed.value.textColor)
    );
    common_vendor.provide("custom_space_size", [0, 0]);
    expose({
      setTheme,
      setDark
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s(common_vendor.unref(appConfig).theme ? {
          background: common_vendor.unref(transparent) ? "" : common_vendor.unref(appConfig).theme
        } : ""),
        b: common_vendor.s(common_vendor.unref(_props).bgImg ? {
          backgroundImage: `url(${common_vendor.unref(_props).bgImg})`
        } : ""),
        c: common_vendor.s(common_vendor.unref(_bgStyle))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-690d8382"], ["__file", "D:/zhidianUniapp/src/tmui/components/tm-app/tm-app.vue"]]);
wx.createComponent(Component);
