"use strict";
var __defProp = Object.defineProperty;
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
const common_vendor = require("../../../common/vendor.js");
const tmui_components_tmCarousel_interface = require("./interface.js");
if (!Math) {
  (tmImage + tmSheet)();
}
const tmImage = () => "../tm-image/tm-image.js";
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-carousel",
  props: {
    imgModel: {
      type: String,
      default: "scaleToFill"
    },
    followTheme: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "primary"
    },
    indicatorColor: {
      type: String,
      default: "white"
    },
    width: {
      type: Number,
      default: 750
    },
    height: {
      type: Number,
      default: 500
    },
    round: {
      type: Number,
      default: 0
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    /**
     * 轮播图的数据列表
     * 可以是图片地址数组，也可以是对象数组（需要提供rangKey字段，默认url）
     */
    list: {
      type: Array,
      default: () => []
    },
    /**
     * 当list为对象时，需要提供key名称以获取图片地址。
     */
    rangKey: {
      type: String,
      default: "url"
    },
    defaultValue: {
      type: Number,
      default: 0
    },
    /**
     * 指示点的位置
     * top,left,right,bottom
     */
    dotPosition: {
      type: String,
      default: "bottom"
    },
    /**
     * 内容居对齐，左，中，右
     * left,center,right
     **/
    align: {
      type: String,
      default: "center"
    },
    /**
     * 指示点类型 dot,number,rect
     */
    model: {
      type: String,
      default: "number"
    },
    /**间隔时间 */
    interval: {
      type: Number,
      default: 5e3
    },
    /**动画时间 */
    duration: {
      type: Number,
      default: 500
    },
    circular: {
      type: Boolean,
      default: true
    },
    /**是否垂直轮播 */
    vertical: {
      type: Boolean,
      default: false
    },
    acceleration: {
      type: Boolean,
      default: false
    },
    disableProgrammaticAnimation: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    displayMultipleItems: {
      type: Number,
      default: 1
    },
    skipHiddenItemLayout: {
      type: Boolean,
      default: false
    },
    disableTouch: {
      type: Boolean,
      default: false
    },
    touchable: {
      type: Boolean,
      default: false
    },
    indicatorDots: {
      type: Boolean,
      default: true
    },
    //是否显示加载动画
    showLoad: {
      type: Boolean,
      default: true
    }
  },
  emits: ["change", "click"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const _list = common_vendor.computed(() => {
      let l = [];
      props.list.forEach((el) => {
        var _a2, _b2, _c;
        if (typeof el == "string") {
          l.push({
            url: el,
            type: tmui_components_tmCarousel_interface.listItemType.img,
            text: ""
          });
        } else if (typeof el === "object") {
          l.push(__spreadValues({
            url: el[props.rangKey],
            type: (_a2 = el == null ? void 0 : el.type) != null ? _a2 : tmui_components_tmCarousel_interface.listItemType.img,
            text: (_b2 = el == null ? void 0 : el.text) != null ? _b2 : "",
            img: (_c = el == null ? void 0 : el.img) != null ? _c : ""
          }, el));
        }
      });
      return l;
    });
    const _current = common_vendor.ref(props.defaultValue || 0);
    const _currentActive = common_vendor.ref(props.defaultValue || 0);
    const _model = common_vendor.computed(() => props.model);
    const _dotPosition = common_vendor.computed(() => props.dotPosition);
    const _align = common_vendor.computed(() => props.align);
    const _autoplay = common_vendor.computed(() => props.autoplay);
    function sliderChange(e) {
      var _a2, _b2;
      if (!_autoplay.value) {
        _current.value = (_a2 = e == null ? void 0 : e.detail) == null ? void 0 : _a2.current;
      }
      _currentActive.value = (_b2 = e == null ? void 0 : e.detail) == null ? void 0 : _b2.current;
      common_vendor.nextTick$1(() => {
        emits("change", _currentActive.value);
      });
    }
    function dotClick(index) {
      _currentActive.value = index;
      if (!_autoplay.value) {
        _current.value = index;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(_list), (item, index, i0) => {
          return common_vendor.e({
            a: item.type == common_vendor.unref(tmui_components_tmCarousel_interface.listItemType).img
          }, item.type == common_vendor.unref(tmui_components_tmCarousel_interface.listItemType).img ? {
            b: "32d5bddb-0-" + i0,
            c: common_vendor.p({
              model: props.imgModel,
              round: props.round,
              userInteractionEnabled: false,
              showLoad: props.showLoad,
              src: item.url,
              width: props.width,
              height: props.height
            })
          } : {}, {
            d: item.type == common_vendor.unref(tmui_components_tmCarousel_interface.listItemType).video && item.img && _currentActive.value != index
          }, item.type == common_vendor.unref(tmui_components_tmCarousel_interface.listItemType).video && item.img && _currentActive.value != index ? {
            e: "32d5bddb-1-" + i0,
            f: common_vendor.p({
              round: props.round,
              userInteractionEnabled: false,
              showLoad: props.showLoad,
              src: item.img,
              width: props.width,
              height: props.height
            })
          } : {}, {
            g: item.type == common_vendor.unref(tmui_components_tmCarousel_interface.listItemType).video && _currentActive.value === index
          }, item.type == common_vendor.unref(tmui_components_tmCarousel_interface.listItemType).video && _currentActive.value === index ? {
            h: item.url,
            i: common_vendor.s({
              width: `${props.width}rpx`,
              height: `${props.height}rpx`
            }),
            j: _currentActive.value === index,
            k: common_vendor.n(`round-${props.round}`)
          } : {}, {
            l: item == null ? void 0 : item.text
          }, (item == null ? void 0 : item.text) ? {
            m: common_vendor.t(item.text),
            n: common_vendor.s({
              width: `${props.width}rpx`,
              height: `64rpx`,
              background: "rgba(0,0,0,0.4)",
              "box-sizing": " border-box"
            })
          } : {}, {
            o: common_vendor.o(($event) => emits("click", index), index),
            p: index
          });
        }),
        b: common_vendor.n(`round-${props.round} overflow `),
        c: common_vendor.s({
          width: `${props.width}rpx`,
          height: `${props.height}rpx`
        }),
        d: props.interval,
        e: props.duration,
        f: props.circular,
        g: props.vertical,
        h: props.acceleration,
        i: props.disableProgrammaticAnimation,
        j: common_vendor.unref(_autoplay),
        k: props.displayMultipleItems,
        l: props.skipHiddenItemLayout,
        m: props.disableTouch,
        n: props.touchable,
        o: common_vendor.o(sliderChange),
        p: common_vendor.n(`round-${props.round} overflow`),
        q: _current.value,
        r: common_vendor.s({
          width: `${props.width}rpx`,
          height: `${props.height}rpx`
        }),
        s: common_vendor.unref(_model) == "dot" && props.indicatorDots
      }, common_vendor.unref(_model) == "dot" && props.indicatorDots ? {
        t: common_vendor.f(common_vendor.unref(_list), (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => dotClick(index), index),
            b: index,
            c: "32d5bddb-2-" + i0,
            d: common_vendor.p({
              margin: [10, 10],
              ["follow-theme"]: _currentActive.value == index ? props.followTheme : false,
              padding: [0, 0],
              round: 10,
              color: _currentActive.value == index ? props.color : "white",
              width: 18,
              height: 18
            })
          };
        }),
        v: common_vendor.n(common_vendor.unref(_dotPosition) == "bottom" || common_vendor.unref(_dotPosition) == "top" ? "flex flex-row " : ""),
        w: common_vendor.n(common_vendor.unref(_dotPosition) == "left" || common_vendor.unref(_dotPosition) == "right" ? "flex flex-col " : ""),
        x: common_vendor.n(common_vendor.unref(_align) == "center" ? "flex-center" : ""),
        y: common_vendor.n(common_vendor.unref(_align) == "left" ? "flex-row-center-start " : ""),
        z: common_vendor.n(common_vendor.unref(_align) == "right" ? "flex-row-center-end " : ""),
        A: common_vendor.n(common_vendor.unref(_dotPosition) == "left" && common_vendor.unref(_align) == "left" ? "ml-12 mt-24" : ""),
        B: common_vendor.n(common_vendor.unref(_dotPosition) == "left" && common_vendor.unref(_align) == "right" ? "ml-12 pb-24" : ""),
        C: common_vendor.n(common_vendor.unref(_dotPosition) == "right" && common_vendor.unref(_align) == "left" ? "pr-12 mt-24" : ""),
        D: common_vendor.n(common_vendor.unref(_dotPosition) == "right" && common_vendor.unref(_align) == "right" ? "pr-12 pb-24" : ""),
        E: common_vendor.n(common_vendor.unref(_dotPosition) == "bottom" && common_vendor.unref(_align) == "left" ? "ml-12 mb-0" : ""),
        F: common_vendor.n(common_vendor.unref(_dotPosition) == "bottom" && common_vendor.unref(_align) == "right" ? "pr-12 mb-0" : ""),
        G: common_vendor.n(common_vendor.unref(_dotPosition) == "top" && common_vendor.unref(_align) == "left" ? "ml-12 " : ""),
        H: common_vendor.n(common_vendor.unref(_dotPosition) == "top" && common_vendor.unref(_align) == "right" ? "pr-12 " : ""),
        I: common_vendor.s(common_vendor.unref(_dotPosition) == "bottom" ? {
          left: "0px",
          bottom: "0px",
          width: `${props.width}rpx`,
          height: `${60}rpx`
        } : ""),
        J: common_vendor.s(common_vendor.unref(_dotPosition) == "top" ? {
          left: "0px",
          top: "0px",
          width: `${props.width}rpx`,
          height: `${60}rpx`
        } : ""),
        K: common_vendor.s(common_vendor.unref(_dotPosition) == "left" ? {
          left: "0px",
          top: "0px",
          width: `${60}rpx`,
          height: `${props.height}rpx`
        } : ""),
        L: common_vendor.s(common_vendor.unref(_dotPosition) == "right" ? {
          right: "0px",
          top: "0px",
          width: `${60}rpx`,
          height: `${props.height}rpx`
        } : "")
      } : {}, {
        M: common_vendor.unref(_model) == "rect" && props.indicatorDots
      }, common_vendor.unref(_model) == "rect" && props.indicatorDots ? {
        N: common_vendor.f(common_vendor.unref(_list), (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => dotClick(index), index),
            b: index,
            c: "32d5bddb-3-" + i0,
            d: common_vendor.p({
              round: index == 0 || index == common_vendor.unref(_list).length - 1 ? 10 : 0,
              margin: common_vendor.unref(_dotPosition) == "left" || common_vendor.unref(_dotPosition) == "right" ? [10, 0] : [0, 10],
              padding: [0, 0],
              ["follow-theme"]: _currentActive.value == index ? props.followTheme : false,
              color: _currentActive.value == index ? props.color : props.indicatorColor,
              width: common_vendor.unref(_dotPosition) == "left" || common_vendor.unref(_dotPosition) == "right" ? 6 : 36,
              height: common_vendor.unref(_dotPosition) == "left" || common_vendor.unref(_dotPosition) == "right" ? 36 : 6
            })
          };
        }),
        O: common_vendor.n(common_vendor.unref(_dotPosition) == "bottom" || common_vendor.unref(_dotPosition) == "top" ? "flex flex-row " : ""),
        P: common_vendor.n(common_vendor.unref(_dotPosition) == "left" || common_vendor.unref(_dotPosition) == "right" ? "flex flex-col " : ""),
        Q: common_vendor.n(common_vendor.unref(_align) == "center" ? "flex-center" : ""),
        R: common_vendor.n(common_vendor.unref(_align) == "left" ? "flex-row-center-start " : ""),
        S: common_vendor.n(common_vendor.unref(_align) == "right" ? "flex-row-center-end " : ""),
        T: common_vendor.n(common_vendor.unref(_dotPosition) == "left" && common_vendor.unref(_align) == "left" ? "ml-12 mt-24" : ""),
        U: common_vendor.n(common_vendor.unref(_dotPosition) == "left" && common_vendor.unref(_align) == "right" ? "ml-12 pb-24" : ""),
        V: common_vendor.n(common_vendor.unref(_dotPosition) == "right" && common_vendor.unref(_align) == "left" ? "pr-12 mt-24" : ""),
        W: common_vendor.n(common_vendor.unref(_dotPosition) == "right" && common_vendor.unref(_align) == "right" ? "pr-12 pb-24" : ""),
        X: common_vendor.n(common_vendor.unref(_dotPosition) == "bottom" && common_vendor.unref(_align) == "left" ? "ml-12 mb-0" : ""),
        Y: common_vendor.n(common_vendor.unref(_dotPosition) == "bottom" && common_vendor.unref(_align) == "right" ? "pr-12 mb-0" : ""),
        Z: common_vendor.n(common_vendor.unref(_dotPosition) == "top" && common_vendor.unref(_align) == "left" ? "ml-12 " : ""),
        aa: common_vendor.n(common_vendor.unref(_dotPosition) == "top" && common_vendor.unref(_align) == "right" ? "pr-12 " : ""),
        ab: common_vendor.s(common_vendor.unref(_dotPosition) == "bottom" ? {
          left: "0px",
          bottom: "0px",
          width: `${props.width}rpx`,
          height: `${60}rpx`
        } : ""),
        ac: common_vendor.s(common_vendor.unref(_dotPosition) == "top" ? {
          left: "0px",
          top: "0px",
          width: `${props.width}rpx`,
          height: `${60}rpx`
        } : ""),
        ad: common_vendor.s(common_vendor.unref(_dotPosition) == "left" ? {
          left: "0px",
          top: "0px",
          width: `${60}rpx`,
          height: `${props.height}rpx`
        } : ""),
        ae: common_vendor.s(common_vendor.unref(_dotPosition) == "right" ? {
          right: "0px",
          top: "0px",
          width: `${60}rpx`,
          height: `${props.height}rpx`
        } : "")
      } : {}, {
        af: common_vendor.unref(_model) == "number" && props.indicatorDots
      }, common_vendor.unref(_model) == "number" && props.indicatorDots ? {
        ag: common_vendor.t(_currentActive.value + 1),
        ah: common_vendor.t(common_vendor.unref(_list).length),
        ai: common_vendor.n(common_vendor.unref(_dotPosition) == "left" || common_vendor.unref(_dotPosition) == "right" ? "px-5 py-24 " : ""),
        aj: common_vendor.n(common_vendor.unref(_dotPosition) == "bottom" || common_vendor.unref(_dotPosition) == "top" ? "px-24 py-5 mx-32" : ""),
        ak: common_vendor.n(common_vendor.unref(_dotPosition) == "bottom" || common_vendor.unref(_dotPosition) == "top" ? "flex flex-row " : ""),
        al: common_vendor.n(common_vendor.unref(_dotPosition) == "left" || common_vendor.unref(_dotPosition) == "right" ? "flex flex-col " : ""),
        am: common_vendor.n(common_vendor.unref(_align) == "center" ? "flex-center" : ""),
        an: common_vendor.n(common_vendor.unref(_align) == "left" ? "flex-row-center-start " : ""),
        ao: common_vendor.n(common_vendor.unref(_align) == "right" ? " flex-row-center-end " : ""),
        ap: common_vendor.n(common_vendor.unref(_dotPosition) == "left" && common_vendor.unref(_align) == "left" ? "ml-12 mt-24" : ""),
        aq: common_vendor.n(common_vendor.unref(_dotPosition) == "left" && common_vendor.unref(_align) == "right" ? "ml-12 pb-24" : ""),
        ar: common_vendor.n(common_vendor.unref(_dotPosition) == "right" && common_vendor.unref(_align) == "left" ? "pr-12 mt-24" : ""),
        as: common_vendor.n(common_vendor.unref(_dotPosition) == "right" && common_vendor.unref(_align) == "right" ? "pr-12 pb-24" : ""),
        at: common_vendor.n(common_vendor.unref(_dotPosition) == "bottom" && common_vendor.unref(_align) == "left" ? "ml-12 mb-0" : ""),
        av: common_vendor.n(common_vendor.unref(_dotPosition) == "bottom" && common_vendor.unref(_align) == "right" ? "pr-12 mb-0 " : ""),
        aw: common_vendor.n(common_vendor.unref(_dotPosition) == "top" && common_vendor.unref(_align) == "left" ? "ml-12 " : ""),
        ax: common_vendor.n(common_vendor.unref(_dotPosition) == "top" && common_vendor.unref(_align) == "right" ? "pr-12 " : ""),
        ay: common_vendor.s(common_vendor.unref(_dotPosition) == "bottom" ? {
          left: "0px",
          bottom: "0px",
          width: `${props.width}rpx`,
          height: `${60}rpx`
        } : ""),
        az: common_vendor.s(common_vendor.unref(_dotPosition) == "top" ? {
          left: "0px",
          top: "0px",
          width: `${props.width}rpx`,
          height: `${60}rpx`
        } : ""),
        aA: common_vendor.s(common_vendor.unref(_dotPosition) == "left" ? {
          left: "0px",
          top: "0px",
          width: `${60}rpx`,
          height: `${props.height}rpx`
        } : ""),
        aB: common_vendor.s(common_vendor.unref(_dotPosition) == "right" ? {
          right: "0px",
          top: "0px",
          width: `${60}rpx`,
          height: `${props.height}rpx`
        } : "")
      } : {}, {
        aC: common_vendor.n(`round-${props.round} mx-${props.margin[0]} my-${props.margin[1]}`),
        aD: common_vendor.s({
          width: `${props.width}rpx`,
          height: `${props.height}rpx`
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/zhidianUniapp/src/tmui/components/tm-carousel/tm-carousel.vue"]]);
wx.createComponent(Component);
