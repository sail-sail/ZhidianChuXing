(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["node-modules/uview-ui/components/u-count-down/u-count-down"],{

/***/ 592:
/*!*******************************************************************************!*\
  !*** D:/质电小程序/node_modules/uview-ui/components/u-count-down/u-count-down.vue ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _u_count_down_vue_vue_type_template_id_072523e7_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./u-count-down.vue?vue&type=template&id=072523e7&scoped=true& */ 593);
/* harmony import */ var _u_count_down_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./u-count-down.vue?vue&type=script&lang=js& */ 595);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _u_count_down_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _u_count_down_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _u_count_down_vue_vue_type_style_index_0_id_072523e7_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./u-count-down.vue?vue&type=style&index=0&id=072523e7&lang=scss&scoped=true& */ 599);
/* harmony import */ var _C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _u_count_down_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _u_count_down_vue_vue_type_template_id_072523e7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _u_count_down_vue_vue_type_template_id_072523e7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "072523e7",
  null,
  false,
  _u_count_down_vue_vue_type_template_id_072523e7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "node_modules/uview-ui/components/u-count-down/u-count-down.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 593:
/*!**************************************************************************************************************************!*\
  !*** D:/质电小程序/node_modules/uview-ui/components/u-count-down/u-count-down.vue?vue&type=template&id=072523e7&scoped=true& ***!
  \**************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_u_count_down_vue_vue_type_template_id_072523e7_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./u-count-down.vue?vue&type=template&id=072523e7&scoped=true& */ 594);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_u_count_down_vue_vue_type_template_id_072523e7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_u_count_down_vue_vue_type_template_id_072523e7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_u_count_down_vue_vue_type_template_id_072523e7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_u_count_down_vue_vue_type_template_id_072523e7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 594:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/质电小程序/node_modules/uview-ui/components/u-count-down/u-count-down.vue?vue&type=template&id=072523e7&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 595:
/*!********************************************************************************************************!*\
  !*** D:/质电小程序/node_modules/uview-ui/components/u-count-down/u-count-down.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_u_count_down_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./u-count-down.vue?vue&type=script&lang=js& */ 596);
/* harmony import */ var _C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_u_count_down_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_u_count_down_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_u_count_down_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_u_count_down_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_u_count_down_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 596:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/质电小程序/node_modules/uview-ui/components/u-count-down/u-count-down.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _props = _interopRequireDefault(__webpack_require__(/*! ./props.js */ 597));
var _utils = __webpack_require__(/*! ./utils */ 598);
//
//
//
//
//
//
//
//
/**
 * u-count-down 倒计时
 * @description 该组件一般使用于某个活动的截止时间上，通过数字的变化，给用户明确的时间感受，提示用户进行某一个行为操作。
 * @tutorial https://uviewui.com/components/countDown.html
 * @property {String | Number}	time		倒计时时长，单位ms （默认 0 ）
 * @property {String}			format		时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒  （默认 'HH:mm:ss' ）
 * @property {Boolean}			autoStart	是否自动开始倒计时 （默认 true ）
 * @property {Boolean}			millisecond	是否展示毫秒倒计时 （默认 false ）
 * @event {Function} finish 倒计时结束时触发 
 * @event {Function} change 倒计时变化时触发 
 * @event {Function} start	开始倒计时
 * @event {Function} pause	暂停倒计时 
 * @event {Function} reset	重设倒计时，若 auto-start 为 true，重设后会自动开始倒计时 
 * @example <u-count-down :time="time"></u-count-down>
 */
var _default = {
  name: 'u-count-down',
  mixins: [uni.$u.mpMixin, uni.$u.mixin, _props.default],
  data: function data() {
    return {
      timer: null,
      // 各单位(天，时，分等)剩余时间
      timeData: (0, _utils.parseTimeData)(0),
      // 格式化后的时间，如"03:23:21"
      formattedTime: '0',
      // 倒计时是否正在进行中
      runing: false,
      endTime: 0,
      // 结束的毫秒时间戳
      remainTime: 0 // 剩余的毫秒时间
    };
  },

  watch: {
    time: function time(n) {
      this.reset();
    }
  },
  mounted: function mounted() {
    this.init();
  },
  methods: {
    init: function init() {
      this.reset();
    },
    // 开始倒计时
    start: function start() {
      if (this.runing) return;
      // 标识为进行中
      this.runing = true;
      // 结束时间戳 = 此刻时间戳 + 剩余的时间
      this.endTime = Date.now() + this.remainTime;
      this.toTick();
    },
    // 根据是否展示毫秒，执行不同操作函数
    toTick: function toTick() {
      if (this.millisecond) {
        this.microTick();
      } else {
        this.macroTick();
      }
    },
    macroTick: function macroTick() {
      var _this = this;
      this.clearTimeout();
      // 每隔一定时间，更新一遍定时器的值
      // 同时此定时器的作用也能带来毫秒级的更新
      this.timer = setTimeout(function () {
        // 获取剩余时间
        var remain = _this.getRemainTime();
        // 重设剩余时间
        if (!(0, _utils.isSameSecond)(remain, _this.remainTime) || remain === 0) {
          _this.setRemainTime(remain);
        }
        // 如果剩余时间不为0，则继续检查更新倒计时
        if (_this.remainTime !== 0) {
          _this.macroTick();
        }
      }, 30);
    },
    microTick: function microTick() {
      var _this2 = this;
      this.clearTimeout();
      this.timer = setTimeout(function () {
        _this2.setRemainTime(_this2.getRemainTime());
        if (_this2.remainTime !== 0) {
          _this2.microTick();
        }
      }, 50);
    },
    // 获取剩余的时间
    getRemainTime: function getRemainTime() {
      // 取最大值，防止出现小于0的剩余时间值
      return Math.max(this.endTime - Date.now(), 0);
    },
    // 设置剩余的时间
    setRemainTime: function setRemainTime(remain) {
      this.remainTime = remain;
      // 根据剩余的毫秒时间，得出该有天，小时，分钟等的值，返回一个对象
      var timeData = (0, _utils.parseTimeData)(remain);
      this.$emit('change', timeData);
      // 得出格式化后的时间
      this.formattedTime = (0, _utils.parseFormat)(this.format, timeData);
      // 如果时间已到，停止倒计时
      if (remain <= 0) {
        this.pause();
        this.$emit('finish');
      }
    },
    // 重置倒计时
    reset: function reset() {
      this.pause();
      this.remainTime = this.time;
      this.setRemainTime(this.remainTime);
      if (this.autoStart) {
        this.start();
      }
    },
    // 暂停倒计时
    pause: function pause() {
      this.runing = false;
      this.clearTimeout();
    },
    // 清空定时器
    clearTimeout: function (_clearTimeout) {
      function clearTimeout() {
        return _clearTimeout.apply(this, arguments);
      }
      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };
      return clearTimeout;
    }(function () {
      clearTimeout(this.timer);
      this.timer = null;
    })
  },
  beforeDestroy: function beforeDestroy() {
    this.clearTimeout();
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 599:
/*!*****************************************************************************************************************************************!*\
  !*** D:/质电小程序/node_modules/uview-ui/components/u-count-down/u-count-down.vue?vue&type=style&index=0&id=072523e7&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_u_count_down_vue_vue_type_style_index_0_id_072523e7_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./u-count-down.vue?vue&type=style&index=0&id=072523e7&lang=scss&scoped=true& */ 600);
/* harmony import */ var _C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_u_count_down_vue_vue_type_style_index_0_id_072523e7_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_u_count_down_vue_vue_type_style_index_0_id_072523e7_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_u_count_down_vue_vue_type_style_index_0_id_072523e7_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_u_count_down_vue_vue_type_style_index_0_id_072523e7_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_10787_Downloads_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_u_count_down_vue_vue_type_style_index_0_id_072523e7_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 600:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/质电小程序/node_modules/uview-ui/components/u-count-down/u-count-down.vue?vue&type=style&index=0&id=072523e7&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/node-modules/uview-ui/components/u-count-down/u-count-down.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'node-modules/uview-ui/components/u-count-down/u-count-down-create-component',
    {
        'node-modules/uview-ui/components/u-count-down/u-count-down-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(592))
        })
    },
    [['node-modules/uview-ui/components/u-count-down/u-count-down-create-component']]
]);
