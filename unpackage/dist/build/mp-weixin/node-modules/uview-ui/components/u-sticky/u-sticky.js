(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["node-modules/uview-ui/components/u-sticky/u-sticky"],{"481a":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return c})),i.d(e,"a",(function(){return n}));var s=function(){var t=this,e=t.$createElement,i=(t._self._c,t.__get_style([t.style])),n=t.__get_style([t.stickyContent]);t.$mp.data=Object.assign({},{$root:{s0:i,s1:n}})},c=[]},b3c8:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=c(i("a34a")),s=c(i("8432"));function c(t){return t&&t.__esModule?t:{default:t}}function o(t,e,i,n,s,c,o){try{var u=t[c](o),r=u.value}catch(a){return void i(a)}u.done?e(r):Promise.resolve(r).then(n,s)}function u(t){return function(){var e=this,i=arguments;return new Promise((function(n,s){var c=t.apply(e,i);function u(t){o(c,n,s,u,r,"next",t)}function r(t){o(c,n,s,u,r,"throw",t)}u(void 0)}))}}var r={name:"u-sticky",mixins:[t.$u.mpMixin,t.$u.mixin,s.default],data:function(){return{cssSticky:!1,stickyTop:0,elId:t.$u.guid(),left:0,width:"auto",height:"auto",fixed:!1}},computed:{style:function(){var e={};return this.disabled?e.position="static":this.cssSticky?(e.position="sticky",e.zIndex=this.uZindex,e.top=t.$u.addUnit(this.stickyTop)):e.height=this.fixed?this.height+"px":"auto",e.backgroundColor=this.bgColor,t.$u.deepMerge(t.$u.addStyle(this.customStyle),e)},stickyContent:function(){var t={};return this.cssSticky||(t.position=this.fixed?"fixed":"static",t.top=this.stickyTop+"px",t.left=this.left+"px",t.width="auto"==this.width?"auto":this.width+"px",t.zIndex=this.uZindex),t},uZindex:function(){return this.zIndex?this.zIndex:t.$u.zIndex.sticky}},mounted:function(){this.init()},methods:{init:function(){this.getStickyTop(),this.checkSupportCssSticky(),this.cssSticky||!this.disabled&&this.initObserveContent()},initObserveContent:function(){var t=this;this.$uGetRect("#"+this.elId).then((function(e){t.height=e.height,t.left=e.left,t.width=e.width,t.$nextTick((function(){t.observeContent()}))}))},observeContent:function(){var e=this;this.disconnectObserver("contentObserver");var i=t.createIntersectionObserver({thresholds:[.95,.98,1]});i.relativeToViewport({top:-this.stickyTop}),i.observe("#".concat(this.elId),(function(t){e.setFixed(t.boundingClientRect.top)})),this.contentObserver=i},setFixed:function(t){var e=t<=this.stickyTop;this.fixed=e},disconnectObserver:function(t){var e=this[t];e&&e.disconnect()},getStickyTop:function(){this.stickyTop=t.$u.getPx(this.offsetTop)+t.$u.getPx(this.customNavHeight)},checkSupportCssSticky:function(){var e=this;return u(n.default.mark((function i(){return n.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return"android"===t.$u.os()&&Number(t.$u.sys().system)>8&&(e.cssSticky=!0),i.next=3,e.checkComputedStyle();case 3:e.cssSticky=i.sent,"ios"===t.$u.os()&&(e.cssSticky=!0);case 5:case"end":return i.stop()}}),i)})))()},checkComputedStyle:function(){var e=this;return new Promise((function(i){t.createSelectorQuery().in(e).select(".u-sticky").fields({computedStyle:["position"]}).exec((function(t){i("sticky"===t[0].position)}))}))},checkCssStickyForH5:function(){}},beforeDestroy:function(){this.disconnectObserver("contentObserver")}};e.default=r}).call(this,i("543d")["default"])},cc4a:function(t,e,i){"use strict";i.r(e);var n=i("b3c8"),s=i.n(n);for(var c in n)"default"!==c&&function(t){i.d(e,t,(function(){return n[t]}))}(c);e["default"]=s.a},e0b8:function(t,e,i){"use strict";var n=i("e4f6"),s=i.n(n);s.a},e4f6:function(t,e,i){},fafc:function(t,e,i){"use strict";i.r(e);var n=i("481a"),s=i("cc4a");for(var c in s)"default"!==c&&function(t){i.d(e,t,(function(){return s[t]}))}(c);i("e0b8");var o,u=i("f0c5"),r=Object(u["a"])(s["default"],n["b"],n["c"],!1,null,"098d796b",null,!1,n["a"],o);e["default"]=r.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'node-modules/uview-ui/components/u-sticky/u-sticky-create-component',
    {
        'node-modules/uview-ui/components/u-sticky/u-sticky-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("fafc"))
        })
    },
    [['node-modules/uview-ui/components/u-sticky/u-sticky-create-component']]
]);
