(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-poster-poster"],{"0cb6":function(t,e,a){var i=a("6135");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("37e73ca2",i,!0,{sourceMap:!1,shadowMode:!1})},"1de5":function(t,e,a){"use strict";t.exports=function(t,e){return e||(e={}),t=t&&t.__esModule?t.default:t,"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},"3bd6":function(t,e,a){t.exports=a.p+"static/img/pbj3.4f5e8d04.png"},6135:function(t,e,a){var i=a("24fb"),n=a("1de5"),c=a("7764"),o=a("3bd6");e=i(!1);var s=n(c),r=n(o);e.push([t.i,"uni-page-body[data-v-ace20a8a]{background-color:#fff}uni-page-body .poster .poster_top[data-v-ace20a8a]{height:%?270?%;background-image:url("+s+");background-size:100% 100%}uni-page-body .poster .poster_center[data-v-ace20a8a]{padding:%?20?%}uni-page-body .poster .poster_center .center_top[data-v-ace20a8a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}uni-page-body .poster .poster_center .center_top .top_item[data-v-ace20a8a]{width:%?330?%;height:%?180?%;background:url(/static/img/pbj1.png);background-size:100% 100%;color:#fff;text-align:center}uni-page-body .poster .poster_center .center_top .top_item .top_item_top[data-v-ace20a8a]{height:%?100?%;line-height:%?130?%;font-size:20px}uni-page-body .poster .poster_center .center_top .top_item .top_item_top uni-text[data-v-ace20a8a]{font-size:14px}uni-page-body .poster .poster_center .center_top .top_item .top_item_bottom[data-v-ace20a8a]{font-size:14px}uni-page-body .poster .poster_center .center_top .top_item2[data-v-ace20a8a]{background:url(/static/img/pbj2.png);background-size:100% 100%}uni-page-body .poster .poster_center .center_center[data-v-ace20a8a]{margin-top:%?20?%;background-image:url("+r+");background-size:100% 100%;color:#fff;padding:%?40?% %?30?% %?50?%;font-size:12px;text-align:center}uni-page-body .poster .poster_center .center_center .cc_top[data-v-ace20a8a]{display:-webkit-box;display:-webkit-flex;display:flex}uni-page-body .poster .poster_center .center_center .cc_top .cc_top_item[data-v-ace20a8a]{-webkit-box-flex:1;-webkit-flex:1;flex:1}uni-page-body .poster .poster_center .center_center .cc_top .cc_top_item p[data-v-ace20a8a]{line-height:%?50?%;height:%?50?%}uni-page-body .poster .poster_center .center_center .cc_top .cc_top_item .cc_top_item_p[data-v-ace20a8a]{height:%?60?%;line-height:%?60?%;font-size:16px}uni-page-body .poster .poster_center .center_center .cc_top .cc_top_item uni-text[data-v-ace20a8a]{font-weight:700}uni-page-body .poster .poster_center .center_center .cc_top .xian[data-v-ace20a8a]{width:1px;height:%?80?%;border-left:1px solid #fff;margin-top:%?20?%}uni-page-body .poster .poster_center .center_center .cc_center[data-v-ace20a8a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin:%?60?% 0 %?40?%}uni-page-body .poster .poster_center .center_center .cc_center .cc_zt[data-v-ace20a8a]{width:%?250?%;height:%?40?%}uni-page-body .poster .poster_center .center_center .cc_center uni-text[data-v-ace20a8a]{height:%?40?%;line-height:%?40?%;color:#5b68d1;font-size:20px;font-weight:550;margin-left:%?20?%}uni-page-body .poster .poster_center .center_center .cc_bottom[data-v-ace20a8a]{height:%?40?%;line-height:%?40?%}uni-page-body .poster .poster_tit[data-v-ace20a8a]{height:%?115?%;line-height:%?115?%;text-align:center;font-size:15px}uni-page-body .poster .poster_tit2 P[data-v-ace20a8a]{line-height:%?50?%;height:%?50?%;color:#656565;font-size:13px;padding:0 %?20?%}body.?%PAGE?%[data-v-ace20a8a]{background-color:#fff}",""]),t.exports=e},7764:function(t,e,a){t.exports=a.p+"static/img/poster.29432360.png"},"9c1e":function(t,e,a){"use strict";a.r(e);var i=a("c8ed"),n=a("ef56");for(var c in n)"default"!==c&&function(t){a.d(e,t,(function(){return n[t]}))}(c);a("e336");var o,s=a("f0c5"),r=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"ace20a8a",null,!1,i["a"],o);e["default"]=r.exports},b09f:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{status:0,yfh:"",dqfh:"",jrfhrs:"",taskNum:"",finishNum:"",finishOrder:"",equal:"",content:""}},onShow:function(){this.getData()},methods:{getData:function(){var t=this,e=function(e){t.yfh=e.dayBonus.num,t.dqfh=e.dayBonus.addnum,t.content=e.bonusConfig.content,t.jrfhrs=e.bonusConfig.num,t.taskNum=e.bonusConfig.taskNum,t.finishNum=e.finishNum,t.finishOrder=e.finishOrder,t.equal=e.equal,t.finishOrder>=t.taskNum&&(t.status=1)};this.http("index/bonusInfo",{},e)}}};e.default=i},c8ed:function(t,e,a){"use strict";var i,n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"poster"},[a("v-uni-view",{staticClass:"poster_top"}),a("v-uni-view",{staticClass:"poster_center"},[a("v-uni-view",{staticClass:"center_top"},[a("v-uni-view",{staticClass:"top_item"},[a("v-uni-view",{staticClass:"top_item_top"},[t._v(t._s(t.dqfh)),a("v-uni-text",[t._v("￥")])],1),a("v-uni-view",{staticClass:"top_item_bottom"},[t._v("当前分红")])],1),a("v-uni-view",{staticClass:"top_item top_item2"},[a("v-uni-view",{staticClass:"top_item_top"},[t._v(t._s(t.yfh)),a("v-uni-text",[t._v("￥")])],1),a("v-uni-view",{staticClass:"top_item_bottom"},[t._v("今日预计分红")])],1)],1),a("v-uni-view",{staticClass:"center_center"},[a("v-uni-view",{staticClass:"cc_top"},[a("v-uni-view",{staticClass:"cc_top_item"},[t.finishNum>=t.jrfhrs?a("p",{staticClass:"cc_top_item_p"},[a("v-uni-text",[t._v("已分红人数 :")]),t._v("满员")],1):a("p",{staticClass:"cc_top_item_p"},[a("v-uni-text",[t._v("已分红人数 :")]),t._v(t._s(t.finishNum)+"人")],1),a("p",[a("v-uni-text",[t._v("今日分红人数 :")]),t._v(t._s(t.jrfhrs)+"人")],1)]),a("v-uni-view",{staticClass:"xian"}),a("v-uni-view",{staticClass:"cc_top_item"},[0==t.status?a("p",[t._v("您还未获得分红名额")]):a("p",[t._v("您已获得分红名额")]),a("p",[t._v("完成"+t._s(t.taskNum)+"个任务可参与分红")]),a("p",[t._v("当前已完成任务"+t._s(t.finishOrder)+"个")])])],1),a("v-uni-view",{staticClass:"cc_center"},[a("v-uni-image",{staticClass:"cc_zt",attrs:{src:"/static/img/zt.png",mode:""}}),a("v-uni-text",{},[t._v(t._s(t.equal)+"￥")])],1),a("p",{staticClass:"cc_bottom"},[t._v("广告分红是根据盈利给予用户的提成")]),a("p",{staticClass:"cc_bottom"},[t._v("数据每30分钟更新一次,真实有效")])],1),a("v-uni-view",{staticClass:"poster_tit"},[t._v("分红规则介绍")]),a("v-uni-view",{staticClass:"poster_tit2"},[a("p",[t._v("开始时间：0点至23点")]),a("p",[t._v("规则介绍："+t._s(t.content))])])],1)],1)},c=[];a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return c})),a.d(e,"a",(function(){return i}))},e336:function(t,e,a){"use strict";var i=a("0cb6"),n=a.n(i);n.a},ef56:function(t,e,a){"use strict";a.r(e);var i=a("b09f"),n=a.n(i);for(var c in i)"default"!==c&&function(t){a.d(e,t,(function(){return i[t]}))}(c);e["default"]=n.a}}]);