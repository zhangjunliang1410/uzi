(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-tixian-tixian"],{"56fb":function(t,i,a){var e=a("24fb");i=e(!1),i.push([t.i,".tixian .status_bar[data-v-4d242364]{height:0;width:100%}.tixian .tixian_top[data-v-4d242364]{height:%?340?%;background-image:url(/static/img/txbj.png);background-size:100% 100%;text-align:center;color:#fff;font-size:15px}.tixian .tixian_top .project_title[data-v-4d242364]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;line-height:%?80?%;height:%?80?%;font-size:16px;color:#fff}.tixian .tixian_top .project_title uni-image[data-v-4d242364]{width:%?50?%;height:%?50?%;margin:%?10?% %?40?%}.tixian .tixian_top .project_title .txjl[data-v-4d242364]{padding-right:%?20?%}.tixian .tixian_top .tixian2[data-v-4d242364]{margin-top:%?80?%}.tixian .tixian_top .tixian2 uni-text[data-v-4d242364]{font-size:20px}.tixian .tixian_top .tixian3[data-v-4d242364]{line-height:%?80?%}.tixian .title[data-v-4d242364]{height:%?100?%;line-height:%?100?%;font-size:16px;font-weight:550}.tixian .txfs[data-v-4d242364]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap}.tixian .txfs .txfs_item[data-v-4d242364]{display:-webkit-box;display:-webkit-flex;display:flex;width:%?200?%;border-radius:%?10?%;background-color:#fff;padding:%?10?% 0;margin-right:%?20?%;line-height:%?50?%;font-size:16px;border:1px solid #fff;box-shadow:0 0 4px #999}.tixian .txfs .txfs_item uni-image[data-v-4d242364]{width:%?50?%;height:%?50?%;margin:0 %?20?% 0 %?30?%}.tixian .txfs .check[data-v-4d242364]{border:1px solid #ef6c62}.tixian .money_wrap[data-v-4d242364]{text-align:center;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.tixian .money_wrap .money_item[data-v-4d242364]{width:%?200?%;height:%?110?%;line-height:%?110?%;border:1px solid #ef6c62;color:#ef6c62;border-radius:%?10?%;margin-bottom:%?20?%}.tixian .money_wrap .money_item uni-text[data-v-4d242364]{font-size:14px;margin-left:%?8?%}.tixian .money_wrap .itemc[data-v-4d242364]{background-image:-webkit-linear-gradient(#df876f,#e45a50);background-image:linear-gradient(#df876f,#e45a50);color:#fff;border:1px solid #df876f;box-shadow:0 0 4px #999}.tixian .tx_btn[data-v-4d242364]{width:%?480?%;height:%?75?%;text-align:center;line-height:%?75?%;color:#fff;font-size:15px;background-image:-webkit-linear-gradient(#df876f,#e45a50);background-image:linear-gradient(#df876f,#e45a50);box-shadow:0 0 4px #999;border-radius:%?10?%;margin:%?100?% auto 0}",""]),t.exports=i},6310:function(t,i,a){"use strict";a.r(i);var e=a("daad"),n=a("67fb");for(var c in n)"default"!==c&&function(t){a.d(i,t,(function(){return n[t]}))}(c);a("ac67");var s,o=a("f0c5"),l=Object(o["a"])(n["default"],e["b"],e["c"],!1,null,"4d242364",null,!1,e["a"],s);i["default"]=l.exports},"67fb":function(t,i,a){"use strict";a.r(i);var e=a("c41b"),n=a.n(e);for(var c in e)"default"!==c&&function(t){a.d(i,t,(function(){return e[t]}))}(c);i["default"]=n.a},a886:function(t,i,a){var e=a("56fb");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=a("4f06").default;n("483fc314",e,!0,{sourceMap:!1,shadowMode:!1})},ac67:function(t,i,a){"use strict";var e=a("a886"),n=a.n(e);n.a},c41b:function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e={data:function(){return{cflag:1,mflag:1}},onShow:function(){},methods:{back:function(){uni.navigateBack({delta:1})},getData:function(){},check:function(t){this.mflag=t},tohistory:function(){}}};i.default=e},daad:function(t,i,a){"use strict";var e,n=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",{staticClass:"tixian"},[a("v-uni-view",{staticClass:"status_bar"}),a("v-uni-view",{staticClass:"tixian_top"},[a("v-uni-view",{staticClass:"project_title"},[a("v-uni-image",{attrs:{src:"/static/img/back.png"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.back.apply(void 0,arguments)}}}),a("v-uni-view",{},[t._v("零钱提现")]),a("v-uni-view",{staticClass:"txjl",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.tohistory.apply(void 0,arguments)}}},[t._v("提现记录")])],1),a("v-uni-view",{staticClass:"tixian2"},[a("v-uni-text",[t._v("1000.00")]),t._v("￥")],1),a("v-uni-view",{staticClass:"tixian3"},[t._v("当前余额")])],1),a("v-uni-view",{staticStyle:{padding:"0 40rpx"}},[a("v-uni-view",{staticClass:"title"},[t._v("提现方式")]),a("v-uni-view",{staticClass:"txfs"},[a("v-uni-view",{staticClass:"txfs_item",class:["1"==t.cflag?"check":""]},[a("v-uni-image",{attrs:{src:"/static/img/wx.png"}}),t._v("微信")],1)],1),a("v-uni-view",{staticClass:"title"},[t._v("提现金额")]),a("v-uni-view",{staticClass:"money_wrap"},[a("v-uni-view",{staticClass:"money_item ",class:["1"==t.mflag?"itemc":""],on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.check("1")}}},[t._v("30"),a("v-uni-text",[t._v("元")])],1),a("v-uni-view",{staticClass:"money_item",class:["2"==t.mflag?"itemc":""],on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.check("2")}}},[t._v("50"),a("v-uni-text",[t._v("元")])],1),a("v-uni-view",{staticClass:"money_item",class:["3"==t.mflag?"itemc":""],on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.check("3")}}},[t._v("80"),a("v-uni-text",[t._v("元")])],1),a("v-uni-view",{staticClass:"money_item",class:["4"==t.mflag?"itemc":""],on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.check("4")}}},[t._v("100"),a("v-uni-text",[t._v("元")])],1),a("v-uni-view",{staticClass:"money_item",class:["5"==t.mflag?"itemc":""],on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.check("5")}}},[t._v("120"),a("v-uni-text",[t._v("元")])],1),a("v-uni-view",{staticClass:"money_item",class:["6"==t.mflag?"itemc":""],on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.check("6")}}},[t._v("150"),a("v-uni-text",[t._v("元")])],1)],1),a("v-uni-view",{staticClass:"tx_btn"},[t._v("提现")])],1)],1)},c=[];a.d(i,"b",(function(){return n})),a.d(i,"c",(function(){return c})),a.d(i,"a",(function(){return e}))}}]);