(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-upproject-queren-queren"],{"46de":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{num:"20",paytype:1,id:"",taskConfig:"",mealtype:""}},onLoad:function(t){this.id=t.id,this.getData()},methods:{chpaytype:function(t){1==t?this.paytype=t:uni.showToast({icon:"none",title:"暂未开放"})},topay:function(){uni.navigateTo({url:"../fukuan/fukuan?id="+this.id})},back:function(){var t={id:this.id},e=function(t){0==t.code&&setTimeout((function(){uni.switchTab({url:"../upproject"})}),1e3)};this.http("index/delTask",t,e)},getData:function(){var e=this,i={id:this.id},a=function(i){e.taskConfig=i.taskConfig;i.order.mealtype;e.mealtype=i.order.mealtype,getApp().globalData.payma2={alipay:i.alipay,wechat:i.wechat},t("log",i.taskConfig[0]," at pages/upproject/queren/queren.vue:130")};this.http("index/payTask",i,a)}}};e.default=i}).call(this,i("0de9")["log"])},"486c":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,"uni-page-body[data-v-8b70e3c2]{background-color:#fff}uni-page-body .queren[data-v-8b70e3c2]{border-top:3px solid #f2f2f2}uni-page-body .queren .queren_title[data-v-8b70e3c2]{text-indent:%?30?%;height:%?150?%;line-height:%?150?%;font-size:16px;font-weight:550}uni-page-body .queren .queren_je[data-v-8b70e3c2]{text-align:center;font-size:28px;font-weight:550;color:#f16c63}uni-page-body .queren .queren_ts[data-v-8b70e3c2]{text-align:center;font-size:14px;color:#333}uni-page-body .queren .bottom_item[data-v-8b70e3c2]{width:%?610?%;height:%?50?%;line-height:%?50?%;padding:%?30?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;border:1px solid #a0a0a0;box-shadow:2px 2px 3px #a0a0a0;margin:0 auto %?20?%;border-radius:%?8?%;font-size:16px}uni-page-body .queren .bottom_item .bottom_item_left[data-v-8b70e3c2]{display:-webkit-box;display:-webkit-flex;display:flex}uni-page-body .queren .bottom_item .bottom_item_left .type_img[data-v-8b70e3c2]{width:%?55?%;height:%?55?%;margin-right:%?20?%}uni-page-body .queren .bottom_item .vip_radio[data-v-8b70e3c2]{width:%?50?%;height:%?50?%}uni-page-body .queren .btn_wrap[data-v-8b70e3c2]{display:-webkit-box;display:-webkit-flex;display:flex}uni-page-body .queren .btn_wrap .vip_btn[data-v-8b70e3c2]{width:%?180?%;height:%?70?%;text-align:center;line-height:%?70?%;font-size:15px;background-color:#f76b5a;color:#fff;margin:%?100?% auto 0;border-radius:%?10?%;box-shadow:0 0 3px #8f8f94}uni-page-body .queren .btn_wrap .vip_btn1[data-v-8b70e3c2]{width:%?180?%;height:%?70?%;text-align:center;line-height:%?70?%;font-size:15px;margin:%?100?% auto 0;border-radius:%?10?%;box-shadow:0 0 3px #8f8f94}body.?%PAGE?%[data-v-8b70e3c2]{background-color:#fff}",""]),t.exports=e},"8b0f":function(t,e,i){"use strict";var a,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"queren"},[i("v-uni-view",{staticClass:"queren_title"},[t._v("总金额:")]),i("v-uni-view",{staticClass:"queren_je"},[t._v(t._s(t.taskConfig[t.mealtype].price)+"元")]),i("v-uni-view",{staticClass:"queren_ts"},[0==t.mealtype?i("v-uni-text",[t._v("青铜套餐")]):t._e(),1==t.mealtype?i("v-uni-text",[t._v("白银套餐")]):t._e(),2==t.mealtype?i("v-uni-text",[t._v("黄金套餐")]):t._e(),3==t.mealtype?i("v-uni-text",[t._v("钻石套餐")]):t._e(),t._v(t._s(t.taskConfig[t.mealtype].num)+"单")],1),i("v-uni-view",{staticClass:"queren_title"},[t._v("支付方式:")]),i("v-uni-view",{staticClass:"upvip_bottom"},[i("v-uni-view",{staticClass:"bottom_item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.chpaytype("1")}}},[i("v-uni-view",{staticClass:"bottom_item_left"},[i("v-uni-image",{staticClass:"type_img",attrs:{src:"/static/img/ma.png",mode:""}}),i("v-uni-view",{},[t._v("扫码充值")])],1),i("v-uni-view",{},[1==t.paytype?i("v-uni-image",{staticClass:"vip_radio",attrs:{src:"/static/img/checked.png",mode:""}}):i("v-uni-image",{staticClass:"vip_radio",attrs:{src:"/static/img/uncheck.png",mode:""}})],1)],1),i("v-uni-view",{staticClass:"bottom_item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.chpaytype("2")}}},[i("v-uni-view",{staticClass:"bottom_item_left"},[i("v-uni-image",{staticClass:"type_img",attrs:{src:"/static/img/wx.png",mode:""}}),i("v-uni-view",{staticStyle:{color:"#198122"}},[t._v("微信充值")])],1),i("v-uni-view",{},[2==t.paytype?i("v-uni-image",{staticClass:"vip_radio",attrs:{src:"/static/img/checked.png",mode:""}}):i("v-uni-image",{staticClass:"vip_radio",attrs:{src:"/static/img/uncheck.png",mode:""}})],1)],1),i("v-uni-view",{staticClass:"bottom_item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.chpaytype("3")}}},[i("v-uni-view",{staticClass:"bottom_item_left"},[i("v-uni-image",{staticClass:"type_img",attrs:{src:"/static/img/zf.png",mode:""}}),i("v-uni-view",{staticStyle:{color:"#1e6fc8"}},[t._v("支付宝充值")])],1),i("v-uni-view",{},[3==t.paytype?i("v-uni-image",{staticClass:"vip_radio",attrs:{src:"/static/img/checked.png",mode:""}}):i("v-uni-image",{staticClass:"vip_radio",attrs:{src:"/static/img/uncheck.png",mode:""}})],1)],1)],1),i("v-uni-view",{staticClass:"btn_wrap"},[i("v-uni-view",{staticClass:"vip_btn1",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.back.apply(void 0,arguments)}}},[t._v("取消")]),i("v-uni-view",{staticClass:"vip_btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.topay.apply(void 0,arguments)}}},[t._v("立即支付")])],1)],1)},o=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}))},"962d":function(t,e,i){"use strict";i.r(e);var a=i("46de"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},ad7b:function(t,e,i){"use strict";i.r(e);var a=i("8b0f"),n=i("962d");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("ef16");var s,c=i("f0c5"),u=Object(c["a"])(n["default"],a["b"],a["c"],!1,null,"8b70e3c2",null,!1,a["a"],s);e["default"]=u.exports},e73c:function(t,e,i){var a=i("486c");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("fb7072cc",a,!0,{sourceMap:!1,shadowMode:!1})},ef16:function(t,e,i){"use strict";var a=i("e73c"),n=i.n(a);n.a}}]);