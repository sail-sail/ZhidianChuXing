(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["otherpages/noticeDetail/noticeDetail"],{"287e":function(t,e,n){"use strict";(function(t){n("1cde");u(n("66fd"));var e=u(n("718e"));function u(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},3511:function(t,e,n){"use strict";var u=n("35e0"),i=n.n(u);i.a},"35e0":function(t,e,n){},"4fb8":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=i(n("fc8f"));function i(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{content:"",id:"",detail:""}},onLoad:function(t){this.id=t.id,this.getDetail()},methods:{getDetail:function(){var t=this;this.$api.sendRequest({url:"/api/index.index/noticeDetail",data:{id:this.id},success:function(e){if(1==e.code){var n=e.data;t.detail=e.data,n.content&&(t.content=(0,u.default)(n.content))}}})}}};e.default=o},"718e":function(t,e,n){"use strict";n.r(e);var u=n("b5f5"),i=n("bb2e");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("3511");var a,c=n("f0c5"),r=Object(c["a"])(i["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],a);e["default"]=r.exports},b5f5:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return u}));var u={"u-Text":function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u--text/u--text")]).then(n.bind(null,"097d"))}},i=function(){var t=this,e=t.$createElement;t._self._c},o=[]},bb2e:function(t,e,n){"use strict";n.r(e);var u=n("4fb8"),i=n.n(u);for(var o in u)"default"!==o&&function(t){n.d(e,t,(function(){return u[t]}))}(o);e["default"]=i.a}},[["287e","common/runtime","common/vendor"]]]);