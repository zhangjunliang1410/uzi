(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-bangding-bangding"],{"213c":function(t,n,i){var a=i("24fb");n=a(!1),n.push([t.i,".bangding[data-v-81305b4e]{padding-top:%?20?%}.bangding .bd_item_wrap[data-v-81305b4e]{background-color:#fff;box-shadow:0 0 10px #999;border-radius:%?10?%;width:%?710?%;margin:%?30?% auto}.bangding .bd_item[data-v-81305b4e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;height:%?160?%;box-sizing:border-box}.bangding .bd_item .text[data-v-81305b4e]{display:-webkit-box;display:-webkit-flex;display:flex;line-height:%?160?%;font-size:16px;font-weight:550}.bangding .bd_item .text .img1[data-v-81305b4e]{width:%?75?%;height:%?75?%;margin:%?40?% %?50?%}.bangding .bd_item .img2[data-v-81305b4e]{height:%?160?%;width:%?170?%;border-radius:0 %?10?%}.bangding .bd_end[data-v-81305b4e]{border-top:2px solid #999;width:%?670?%;padding:%?15?%;box-sizing:border-box;margin:0 auto;display:-webkit-box;display:-webkit-flex;display:flex;color:grey;font-size:16px;line-height:%?60?%}.bangding .bd_end uni-image[data-v-81305b4e]{width:%?60?%;height:%?60?%;border-radius:%?30?%;box-shadow:0 0 10px #999;margin-right:%?20?%}.bangding .bd_end .text[data-v-81305b4e]{margin-left:%?30?%}",""]),t.exports=n},"7c50":function(t,n,i){"use strict";i.r(n);var a=i("bb2d"),e=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(n,t,(function(){return a[t]}))}(s);n["default"]=e.a},a151:function(t,n,i){var a=i("213c");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var e=i("4f06").default;e("156ee1d4",a,!0,{sourceMap:!1,shadowMode:!1})},bb2d:function(t,n,i){"use strict";(function(t){i("4d63"),i("ac1f"),i("25f0"),i("466d"),i("841c"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{bankStatus:"",bankInfo:{},dyInfo:{},dyStatus:"",wxInfo:{},wxStatus:"",bufen:""}},onShow:function(){var n=this;t("log","hh1",this.getQuery("code")," at pages/my/bangding/bangding.vue:61"),t("log","hh2",this.getquery2()," at pages/my/bangding/bangding.vue:62"),this.getData(),this.getquery2();var i=this.getQuery("code");if(i){t("log","aaaa"," at pages/my/bangding/bangding.vue:68");var a={code:i},e=function(i){t("log",i," at pages/my/bangding/bangding.vue:73"),n.getData()};this.http("index/douyin",a,e)}},onLoad:function(n){t("log","绑定",n," at pages/my/bangding/bangding.vue:81")},methods:{getData:function(){var t=this,n=function(n){t.bankStatus=n.bankStatus,t.bufen=n.bankInfo.bankcard.substr(n.bankInfo.bankcard.length-6),t.bankInfo=n.bankInfo,t.dyInfo=n.dyInfo,t.dyStatus=n.dyStatus,t.wxInfo=n.wxInfo,t.wxStatus=n.wxStatus};this.http("index/bindInfo",{},n)},bdbank:function(){0==this.bankStatus&&uni.navigateTo({url:"bdbank/bdbank"})},getQuery:function(t){var n=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),i=window.location.search.substr(1).match(n);return null!=i?decodeURIComponent(i[2]):null},getquery2:function(){var n=this,i=getCurrentPages(),a=i[i.length-1],e=a.options||a.$route.query;if("{}"!=JSON.stringify(e)){t("log","chuan"," at pages/my/bangding/bangding.vue:124");var s={code:e},d=function(i){t("log",i," at pages/my/bangding/bangding.vue:129"),n.getData()};this.http("index/douyin",s,d)}return e},dybd:function(){if(1==getApp().globalData.uatype){var n=uni.requireNativePlugin("DouYin-SdkWX"),i="aw25wjzjh2um5pdh";n.initWithKey(i),n.isAppSupportAuthorization((function(i){1==i&&n.authorize({scope:"user_info",state:""},(function(n){t("log",n," at pages/my/bangding/bangding.vue:150")}))}))}else{var a="http%3A%2F%2Fdz.zz0510.top%2Fh5%2Findex.html%23%2Fpages%2Fmy%2Fbangding%2Fbangding",e="https://open.douyin.com/platform/oauth/connect/?client_key=aw25wjzjh2um5pdh&response_type=code&state=1&scope=user_info&redirect_uri="+a;window.location.href=e}},weixin:function(){var n=this;1==getApp().globalData.uatype&&uni.login({provider:"weixin",success:function(i){t("log",i.authResult," at pages/my/bangding/bangding.vue:194"),uni.getUserInfo({provider:"weixin",success:function(i){t("log","用户"+i.userInfo.nickName,i.userInfo.avatarUrl,JSON.stringify(i.userInfo)," at pages/my/bangding/bangding.vue:199");var a={avatar:i.userInfo.avatarUrl,openid:i.userInfo.openId,nickname:i.userInfo.nickName},e=function(t){n.getData()};n.http("index/wechat",a,e)}})}})}}};n.default=a}).call(this,i("0de9")["log"])},c949:function(t,n,i){"use strict";var a=i("a151"),e=i.n(a);e.a},e94c:function(t,n,i){"use strict";var a,e=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-view",{staticClass:"bangding"},[i("v-uni-view",{staticClass:"bd_item_wrap"},[i("v-uni-view",{staticClass:"bd_item",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.dybd.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"text"},[i("v-uni-image",{staticClass:"img1",attrs:{src:"/static/img/douyin.png",mode:""}}),t._v("绑定抖音")],1),i("v-uni-image",{staticClass:"img2",attrs:{src:"/static/img/dybig.png",mode:""}})],1),1==t.dyStatus?i("v-uni-view",{staticClass:"bd_end"},[i("v-uni-image",{attrs:{src:"/static/img/xx.png",mode:""}}),i("v-uni-text",[t._v("大师兄的沙师弟")])],1):t._e()],1),i("v-uni-view",{staticClass:"bd_item_wrap",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.weixin.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"bd_item"},[i("v-uni-view",{staticClass:"text"},[i("v-uni-image",{staticClass:"img1",attrs:{src:"/static/img/weixin.png",mode:""}}),t._v("绑定微信")],1),i("v-uni-image",{staticClass:"img2",attrs:{src:"/static/img/wxbig.png",mode:""}})],1),1==t.wxStatus?i("v-uni-view",{staticClass:"bd_end"},[i("v-uni-image",{attrs:{src:t.wxInfo.image,mode:""}}),i("v-uni-text",[t._v(t._s(t.wxInfo.nickname))])],1):t._e()],1),i("v-uni-view",{staticClass:"bd_item_wrap",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.bdbank.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"bd_item"},[i("v-uni-view",{staticClass:"text"},[i("v-uni-image",{staticClass:"img1",attrs:{src:"/static/img/bank.png",mode:""}}),t._v("绑定银行卡")],1),i("v-uni-image",{staticClass:"img2",attrs:{src:"/static/img/bbig.png",mode:""}})],1),1==t.bankStatus?i("v-uni-view",{staticClass:"bd_end"},[i("v-uni-image",{attrs:{src:"/static/img/bank.png",mode:""}}),i("v-uni-text",[t._v(t._s(t.bankInfo.bankname))]),i("v-uni-text",{staticClass:"text"},[t._v("尾号"+t._s(t.bufen))])],1):t._e()],1)],1)},s=[];i.d(n,"b",(function(){return e})),i.d(n,"c",(function(){return s})),i.d(n,"a",(function(){return a}))},ed8e:function(t,n,i){"use strict";i.r(n);var a=i("e94c"),e=i("7c50");for(var s in e)"default"!==s&&function(t){i.d(n,t,(function(){return e[t]}))}(s);i("c949");var d,o=i("f0c5"),g=Object(o["a"])(e["default"],a["b"],a["c"],!1,null,"81305b4e",null,!1,a["a"],d);n["default"]=g.exports}}]);