(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/agree/agree"],{4689:function(t,e,n){"use strict";var a=n("df7d"),u=n.n(a);u.a},"568c":function(t,e,n){"use strict";n.r(e);var a=n("7c19"),u=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);e["default"]=u.a},"746e":function(t,e,n){"use strict";(function(t){n("1cde");a(n("66fd"));var e=a(n("ca77"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"7c19":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=u(n("fc8f"));function u(t){return t&&t.__esModule?t:{default:t}}var c={data:function(){return{detail:"",type:1}},onLoad:function(e){var n="";n=1==e.type?"隐私协议":2==e.type?"服务协议":3==e.type?"用户协议":4==e.type?"用户充值协议":5==e.type?"规则说明":"限行政策",this.type=e.type,t.setNavigationBarTitle({title:n}),this.getDetail()},methods:{getDetail:function(){var t=this;this.$api.sendRequest({url:"/api/index.index/agreementDetail",data:{type:this.type},success:function(e){if(1==e.code){var n=e.data;n.content&&(t.detail=(0,a.default)(n.content))}}})}}};e.default=c}).call(this,n("543d")["default"])},ca77:function(t,e,n){"use strict";n.r(e);var a=n("eaae"),u=n("568c");for(var c in u)"default"!==c&&function(t){n.d(e,t,(function(){return u[t]}))}(c);n("4689");var i,r=n("f0c5"),f=Object(r["a"])(u["default"],a["b"],a["c"],!1,null,"fbe86978",null,!1,a["a"],i);e["default"]=f.exports},df7d:function(t,e,n){},eaae:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return a}));var u=function(){var t=this,e=t.$createElement;t._self._c},c=[]}},[["746e","common/runtime","common/vendor"]]]);