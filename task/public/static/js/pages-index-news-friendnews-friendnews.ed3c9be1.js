(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-news-friendnews-friendnews"],{"078a":function(t,e,n){"use strict";n.r(e);var i=n("29c4"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=a.a},"29c4":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{arry:[],page:1,type:""}},onPullDownRefresh:function(){this.page,this.arry=[],this.getData()},onLoad:function(t){if("reg"==t.type){var e="好友动态";this.type=1}else if("money"==t.type){e="余额动态";this.type=3}else if("task"==t.type){e="任务动态";this.type=2}uni.setNavigationBarTitle({title:e})},onShow:function(){this.page=1,this.arry=[],this.getData()},onReachBottom:function(){t("log","到底部"," at pages/index/news/friendnews/friendnews.vue:52"),this.page++,this.getData()},methods:{getData:function(){var t=this,e={page:this.page,type:this.type},n=function(e){if(e.length>0)for(var n=0;n<e.length;n++)t.arry.push(e[n]);else uni.showToast({title:"后面已经没有了~",icon:"none",duration:2e3});uni.stopPullDownRefresh()};this.http("index/messageList",e,n)},time:function(t){return this.base.toDate(t)},todetail:function(t){uni.navigateTo({url:"../newsdetail/newsdetail?id="+t})}}};e.default=n}).call(this,n("0de9")["log"])},"2cdd":function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"friendnews"},t._l(t.arry,(function(e,i){return n("v-uni-view",{key:i,staticClass:"news_item",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.todetail(e.id)}}},[n("v-uni-view",{staticClass:"news_item_center2"},[t._v(t._s(e.content))]),n("v-uni-view",{staticClass:"news_item_bottom"},[t._v(t._s(t.time(e.createtime)))]),0==e.status?n("v-uni-image",{staticClass:"dian",attrs:{src:"/static/img/dian.png",mode:""}}):t._e()],1)})),1)},s=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}))},3240:function(t,e,n){"use strict";n.r(e);var i=n("2cdd"),a=n("078a");for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);n("561d");var o,r=n("f0c5"),d=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"387d99db",null,!1,i["a"],o);e["default"]=d.exports},"4e81":function(t,e,n){var i=n("b879");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("f52a9a12",i,!0,{sourceMap:!1,shadowMode:!1})},"561d":function(t,e,n){"use strict";var i=n("4e81"),a=n.n(i);a.a},b879:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".friendnews .news_item[data-v-387d99db]{box-sizing:border-box;background-color:#fff;padding:%?10?% %?30?% %?20?%;width:%?700?%;margin:%?20?% auto;border-radius:%?10?%;box-shadow:0 0 8px #aeaeae;position:relative}.friendnews .news_item .news_item_center2[data-v-387d99db]{line-height:%?80?%;font-size:14px;height:%?80?%;width:%?500?%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.friendnews .news_item .news_item_bottom[data-v-387d99db]{color:#626262;text-align:right;font-size:12px}.friendnews .news_item .dian[data-v-387d99db]{width:%?20?%;height:%?20?%;position:absolute;right:%?30?%;top:%?40?%}",""]),t.exports=e}}]);