(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-news-news"],{"290d":function(t,e,n){var i=n("e4a9");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("51b5f326",i,!0,{sourceMap:!1,shadowMode:!1})},"378e":function(t,e,n){"use strict";var i=n("290d"),a=n.n(i);a.a},"6df6":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{array:[]}},onShow:function(){this.getData()},methods:{getData:function(){var t=this,e=function(e){t.array=e};this.http("index/messageCate",{},e)},time:function(t){return this.base.toDate(t)},tofriend:function(t){uni.navigateTo({url:"friendnews/friendnews?type="+t})}}};e.default=i},"78f2":function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"news"},t._l(t.array,(function(e,i){return n("v-uni-view",{key:i,staticClass:"news_item",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.tofriend(e.type)}}},[n("v-uni-view",{staticClass:"news_item_top"},[t._v("消息类型:"),"reg"==e.type?n("v-uni-text",[t._v("好友动态")]):t._e(),"money"==e.type?n("v-uni-text",[t._v("余额动态")]):t._e(),"task"==e.type?n("v-uni-text",[t._v("任务动态")]):t._e(),0==e.status?n("v-uni-image",{staticClass:"dian",attrs:{src:"/static/img/dian.png",mode:""}}):t._e()],1),n("v-uni-view",{staticClass:"news_item_center"},[t._v(t._s(e.content))]),n("v-uni-view",{staticClass:"news_item_bottom"},[t._v(t._s(t.time(e.createtime)))])],1)})),1)},s=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}))},8329:function(t,e,n){"use strict";n.r(e);var i=n("78f2"),a=n("84d6");for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);n("378e");var o,r=n("f0c5"),u=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"68fb5c4e",null,!1,i["a"],o);e["default"]=u.exports},"84d6":function(t,e,n){"use strict";n.r(e);var i=n("6df6"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=a.a},e4a9:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".news .news_item[data-v-68fb5c4e]{box-sizing:border-box;background-color:#fff;padding:%?10?% %?30?% %?40?%;width:%?700?%;margin:%?20?% auto;border-radius:%?10?%;box-shadow:0 0 8px #aeaeae}.news .news_item .news_item_top[data-v-68fb5c4e]{height:%?80?%;line-height:%?80?%;border-bottom:1px solid #ababab;font-size:16px;font-weight:600}.news .news_item .news_item_top .dian[data-v-68fb5c4e]{width:%?20?%;height:%?20?%;margin-top:%?30?%;float:right}.news .news_item .news_item_center[data-v-68fb5c4e]{padding:%?20?% 0 0;line-height:%?40?%;font-size:14px;height:%?120?%;overflow:hidden;text-overflow:ellipsis;box-sizing:border-box}.news .news_item .news_item_bottom[data-v-68fb5c4e]{color:#626262;text-align:right;font-size:12px}",""]),t.exports=e}}]);