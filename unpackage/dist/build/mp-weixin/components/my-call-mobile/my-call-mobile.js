(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/my-call-mobile/my-call-mobile"],{"080b":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={name:"my-call-mobile",props:{show:{type:Boolean,default:!1}},data:function(){return{mobile:"400-1234-1234"}},created:function(){this.getSetting()},methods:{close:function(){this.$emit("close")},callPhone:function(){e.makePhoneCall({phoneNumber:this.mobile})},getSetting:function(){var e=this;this.$api.sendRequest({url:"/api/index.index/setting",data:{},success:function(n){1==n.code&&(e.mobile=n.data.mobile)}})}}};n.default=t}).call(this,t("543d")["default"])},"09d4":function(e,n,t){},"173b":function(e,n,t){"use strict";t.r(n);var o=t("080b"),u=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);n["default"]=u.a},2163:function(e,n,t){"use strict";t.d(n,"b",(function(){return u})),t.d(n,"c",(function(){return i})),t.d(n,"a",(function(){return o}));var o={uPopup:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-popup/u-popup")]).then(t.bind(null,"349e"))}},u=function(){var e=this,n=e.$createElement;e._self._c},i=[]},e25a:function(e,n,t){"use strict";t.r(n);var o=t("2163"),u=t("173b");for(var i in u)"default"!==i&&function(e){t.d(n,e,(function(){return u[e]}))}(i);t("e9ce");var a,c=t("f0c5"),l=Object(c["a"])(u["default"],o["b"],o["c"],!1,null,"06dbaa04",null,!1,o["a"],a);n["default"]=l.exports},e9ce:function(e,n,t){"use strict";var o=t("09d4"),u=t.n(o);u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/my-call-mobile/my-call-mobile-create-component',
    {
        'components/my-call-mobile/my-call-mobile-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e25a"))
        })
    },
    [['components/my-call-mobile/my-call-mobile-create-component']]
]);
