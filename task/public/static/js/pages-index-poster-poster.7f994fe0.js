(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-poster-poster"],{"1d00":function(t,e,i){"use strict";var n,o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"poster"},[i("v-uni-view",{staticClass:"poster_top"}),i("v-uni-view",{staticClass:"poster_center"},[i("v-uni-view",{staticClass:"center_top"},[i("v-uni-view",{staticClass:"top_item"},[i("v-uni-view",{staticClass:"top_item_top"},[t._v(t._s(t.dqfh)),i("v-uni-text",[t._v("￥")])],1),i("v-uni-view",{staticClass:"top_item_bottom"},[t._v("当前分红")])],1),i("v-uni-view",{staticClass:"top_item top_item2"},[i("v-uni-view",{staticClass:"top_item_top"},[t._v(t._s(t.yfh)),i("v-uni-text",[t._v("￥")])],1),i("v-uni-view",{staticClass:"top_item_bottom"},[t._v("今日预计分红")])],1)],1),i("v-uni-view",{staticClass:"center_center"},[i("v-uni-view",{staticClass:"cc_top"},[i("v-uni-view",{staticClass:"cc_top_item"},[i("p",{staticClass:"cc_top_item_p"},[i("v-uni-text",[t._v("已分红人数 :")]),t._v(t._s(t.finishNum)+"人")],1),i("p",[i("v-uni-text",[t._v("今日分红人数 :")]),t._v(t._s(t.jrfhrs)+"人")],1)]),i("v-uni-view",{staticClass:"xian"}),i("v-uni-view",{staticClass:"cc_top_item"},[0==t.status?i("p",[t._v("您还未获得分红名额")]):i("p",[t._v("您已获得分红名额")]),i("p",[t._v("完成"+t._s(t.taskNum)+"个任务可参与分红")]),i("p",[t._v("当前已完成任务"+t._s(t.finishOrder)+"个")])])],1),i("v-uni-view",{staticClass:"cc_center"},[i("v-uni-image",{staticClass:"cc_zt",attrs:{src:"/static/img/zt.png",mode:""}}),i("v-uni-text",{},[t._v(t._s(t.equal)+"￥")])],1),i("p",{staticClass:"cc_bottom"},[t._v("广告分红是根据盈利给予用户的提成")]),i("p",{staticClass:"cc_bottom"},[t._v("数据每30分钟更新一次,真实有效")])],1),i("v-uni-view",{staticClass:"poster_tit"},[t._v("分红规则介绍")]),i("v-uni-view",{staticClass:"poster_tit2"},[i("p",[t._v("开始时间：0点至23点")]),i("p",[t._v("规则介绍："+t._s(t.content))])])],1)],1)},s=[];i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}))},"1de5":function(t,e,i){"use strict";t.exports=function(t,e){return e||(e={}),t=t&&t.__esModule?t.default:t,"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},"4fed":function(t,e,i){t.exports=i.p+"static/img/poster.29432360.png"},"629e":function(t,e,i){"use strict";i.r(e);var n=i("75dd"),o=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=o.a},"6d39":function(t,e,i){"use strict";i.r(e);var n=i("1d00"),o=i("629e");for(var s in o)"default"!==s&&function(t){i.d(e,t,(function(){return o[t]}))}(s);i("e716");var a,c=i("f0c5"),r=Object(c["a"])(o["default"],n["b"],n["c"],!1,null,"2411b735",null,!1,n["a"],a);e["default"]=r.exports},"75dd":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{status:0,yfh:"",dqfh:"",jrfhrs:"",taskNum:"",finishNum:"",finishOrder:"",equal:"",content:""}},onShow:function(){this.getData()},methods:{getData:function(){var t=this,e=function(e){t.yfh=e.dayBonus.num,t.dqfh=e.dayBonus.addnum,t.content=e.bonusConfig.content,t.jrfhrs=e.bonusConfig.num,t.taskNum=e.bonusConfig.taskNum,t.finishNum=e.finishNum,t.finishOrder=e.finishOrder,t.equal=e.equal,t.finishOrder>=t.taskNum&&(t.status=1)};this.http("index/bonusInfo",{},e)}}};e.default=n},9557:function(t,e,i){var n=i("24fb"),o=i("1de5"),s=i("4fed"),a=i("b292");e=n(!1);var c=o(s),r=o(a);e.push([t.i,"uni-page-body[data-v-2411b735]{background-color:#fff}uni-page-body .poster .poster_top[data-v-2411b735]{height:%?270?%;background-image:url("+c+");background-size:100% 100%}uni-page-body .poster .poster_center[data-v-2411b735]{padding:%?20?%}uni-page-body .poster .poster_center .center_top[data-v-2411b735]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}uni-page-body .poster .poster_center .center_top .top_item[data-v-2411b735]{width:%?330?%;height:%?180?%;background:url(/static/img/pbj1.png);background-size:100% 100%;color:#fff;text-align:center}uni-page-body .poster .poster_center .center_top .top_item .top_item_top[data-v-2411b735]{height:%?100?%;line-height:%?130?%;font-size:20px}uni-page-body .poster .poster_center .center_top .top_item .top_item_top uni-text[data-v-2411b735]{font-size:14px}uni-page-body .poster .poster_center .center_top .top_item .top_item_bottom[data-v-2411b735]{font-size:14px}uni-page-body .poster .poster_center .center_top .top_item2[data-v-2411b735]{background:url(/static/img/pbj2.png);background-size:100% 100%}uni-page-body .poster .poster_center .center_center[data-v-2411b735]{margin-top:%?20?%;background-image:url("+r+");background-size:100% 100%;color:#fff;padding:%?40?% %?30?% %?50?%;font-size:12px;text-align:center}uni-page-body .poster .poster_center .center_center .cc_top[data-v-2411b735]{display:-webkit-box;display:-webkit-flex;display:flex}uni-page-body .poster .poster_center .center_center .cc_top .cc_top_item[data-v-2411b735]{-webkit-box-flex:1;-webkit-flex:1;flex:1}uni-page-body .poster .poster_center .center_center .cc_top .cc_top_item p[data-v-2411b735]{line-height:%?50?%;height:%?50?%}uni-page-body .poster .poster_center .center_center .cc_top .cc_top_item .cc_top_item_p[data-v-2411b735]{height:%?60?%;line-height:%?60?%;font-size:16px}uni-page-body .poster .poster_center .center_center .cc_top .cc_top_item uni-text[data-v-2411b735]{font-weight:700}uni-page-body .poster .poster_center .center_center .cc_top .xian[data-v-2411b735]{width:1px;height:%?80?%;border-left:1px solid #fff;margin-top:%?20?%}uni-page-body .poster .poster_center .center_center .cc_center[data-v-2411b735]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin:%?60?% 0 %?40?%}uni-page-body .poster .poster_center .center_center .cc_center .cc_zt[data-v-2411b735]{width:%?250?%;height:%?40?%}uni-page-body .poster .poster_center .center_center .cc_center uni-text[data-v-2411b735]{height:%?40?%;line-height:%?40?%;color:#5b68d1;font-size:20px;font-weight:550;margin-left:%?20?%}uni-page-body .poster .poster_center .center_center .cc_bottom[data-v-2411b735]{height:%?40?%;line-height:%?40?%}uni-page-body .poster .poster_tit[data-v-2411b735]{height:%?115?%;line-height:%?115?%;text-align:center;font-size:15px}uni-page-body .poster .poster_tit2 P[data-v-2411b735]{line-height:%?50?%;height:%?50?%;color:#656565;font-size:13px;padding:0 %?20?%}body.?%PAGE?%[data-v-2411b735]{background-color:#fff}",""]),t.exports=e},b292:function(t,e,i){t.exports=i.p+"static/img/pbj3.4f5e8d04.png"},e123:function(t,e,i){var n=i("9557");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("64c1d908",n,!0,{sourceMap:!1,shadowMode:!1})},e716:function(t,e,i){"use strict";var n=i("e123"),o=i.n(n);o.a}}]);