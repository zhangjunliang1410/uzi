(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-fbdrw-fbdrw"],{5272:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{tabtype:1,page:1,height2:"",flag:!1,array:[],list:["A","b","C"],list2:["A"],list3:["A"],list4:["A"],list5:["A"],list6:["A"]}},onShow:function(){var t=uni.getSystemInfoSync();this.height2=t.windowHeight-70+"px",this.array=this.list},methods:{changetab:function(t){switch(this.tabtype=t,t){case 1:this.array=this.list;break;case 2:this.array=this.list2;break;case 3:this.array=this.list3;break;case 4:this.array=this.list4;break;case 5:this.array=this.list5;break;case 6:this.array=this.list6;break}},getData:function(){this.page},todetail:function(t){uni.navigateTo({url:"fbrwdetail/fbrwdetail?tabtype="+t})},pushArry:function(){t("log","到底部"," at pages/my/fbdrw/fbdrw.vue:216"),this.page++,this.getData()},refresh:function(){var e=this;t("log","下拉"," at pages/my/fbdrw/fbdrw.vue:221"),this.flag=!0,setTimeout((function(){e.flag=!1}),1e3),this.page=1,this.getData()}}};e.default=i}).call(this,i("0de9")["log"])},"9fd4":function(t,e,i){var a=i("bc28");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("e097287e",a,!0,{sourceMap:!1,shadowMode:!1})},a26a:function(t,e,i){"use strict";i.r(e);var a=i("b687"),n=i("ee38");for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("aa27");var s,c=i("f0c5"),o=Object(c["a"])(n["default"],a["b"],a["c"],!1,null,"aa4653aa",null,!1,a["a"],s);e["default"]=o.exports},aa27:function(t,e,i){"use strict";var a=i("9fd4"),n=i.n(a);n.a},b687:function(t,e,i){"use strict";var a,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"fbdrw"},[i("v-uni-view",{staticClass:"project_tab"},[i("v-uni-view",{staticClass:"prtab_item",class:[1==t.tabtype?"prtab_pink":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changetab(1)}}},[t._v("全部")]),i("v-uni-view",{staticClass:"prtab_item",class:[2==t.tabtype?"prtab_pink":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changetab(2)}}},[t._v("待支付")]),i("v-uni-view",{staticClass:"prtab_item",class:[3==t.tabtype?"prtab_pink":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changetab(3)}}},[t._v("待发布")]),i("v-uni-view",{staticClass:"prtab_item",class:[4==t.tabtype?"prtab_pink":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changetab(4)}}},[t._v("进行中")]),i("v-uni-view",{staticClass:"prtab_item",class:[5==t.tabtype?"prtab_pink":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changetab(5)}}},[t._v("待审核")]),i("v-uni-view",{staticClass:"prtab_item",class:[6==t.tabtype?"prtab_pink":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changetab(6)}}},[t._v("已审核")])],1),i("v-uni-scroll-view",{staticClass:"project_content",style:{height:t.height2},attrs:{"scroll-y":"true","refresher-enabled":!0,"refresher-triggered":t.flag},on:{scrolltolower:function(e){arguments[0]=e=t.$handleEvent(e),t.pushArry.apply(void 0,arguments)},refresherrefresh:function(e){arguments[0]=e=t.$handleEvent(e),t.refresh.apply(void 0,arguments)}}},[t._l(t.array,(function(e,a){return i("v-uni-view",{key:a,staticClass:"prc_item"},[i("v-uni-view",{staticClass:"prc_item_top"},[i("v-uni-view",{staticClass:"prc_item_top1"},[t._v("任务类型:点赞+关注"),i("v-uni-image",{attrs:{src:"/static/img/zan.png",mode:""}}),i("v-uni-image",{attrs:{src:"/static/img/zhu.png",mode:""}})],1),i("v-uni-view",{staticClass:"prc_item_top2"},[t._v("审核未通过")])],1),i("v-uni-view",{staticClass:"prc_item_center"},[i("v-uni-view",{staticClass:"prc_item_center1"},[i("v-uni-view",[t._v("新人赚钱指导")]),i("v-uni-view",{staticClass:"prc_item_center1_right"},[t._v("100"),i("v-uni-text",[t._v("元")])],1)],1),i("v-uni-view",{staticClass:"prc_item_center2"},[i("v-uni-view",[t._v("2020-06-06 12:00 2020-08-08 12:00")]),i("v-uni-view",[t._v("任务奖励")])],1),i("v-uni-view",{staticClass:"prc_item_center3"},[i("v-uni-view",{staticClass:"pro_btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.todetail(t.tabtype)}}},[t._v("查看详情")])],1)],1)],1)})),i("v-uni-view",{staticClass:"prc_item"},[i("v-uni-view",{staticClass:"prc_item_top"},[i("v-uni-view",{staticClass:"prc_item_top1"},[t._v("任务类型:综合任务"),i("v-uni-image",{attrs:{src:"/static/img/wu.png",mode:""}})],1),i("v-uni-view",{staticClass:"prc_item_top2"},[t._v("审核未通过")])],1),i("v-uni-view",{staticClass:"prc_item_center"},[i("v-uni-view",{staticClass:"prc_item_center1"},[i("v-uni-view",[t._v("新人赚钱指导")]),i("v-uni-view",{staticClass:"prc_item_center1_right"},[t._v("100"),i("v-uni-text",[t._v("元")])],1)],1),i("v-uni-view",{staticClass:"prc_item_center2"},[i("v-uni-view",[t._v("2020-06-06 12:00 2020-08-08 12:00")]),i("v-uni-view",[t._v("任务奖励")])],1),i("v-uni-view",{staticClass:"prc_item_center3"},[i("v-uni-view",{staticClass:"pro_btn"},[t._v("查看详情")])],1)],1)],1),i("v-uni-view",{staticClass:"prc_item"},[i("v-uni-view",{staticClass:"prc_item_top"},[i("v-uni-view",{staticClass:"prc_item_top1"},[t._v("任务类型:视频转发"),i("v-uni-image",{attrs:{src:"/static/img/fa.png",mode:""}})],1),i("v-uni-view",{staticClass:"prc_item_top2"},[t._v("待支付")])],1),i("v-uni-view",{staticClass:"prc_item_center"},[i("v-uni-view",{staticClass:"prc_item_center1"},[i("v-uni-view",[t._v("新人赚钱指导")]),i("v-uni-view",{staticClass:"prc_item_center1_right"},[t._v("100"),i("v-uni-text",[t._v("元")])],1)],1),i("v-uni-view",{staticClass:"prc_item_center2"},[i("v-uni-view",[t._v("2020-06-06 12:00 2020-08-08 12:00")]),i("v-uni-view",[t._v("任务奖励")])],1),i("v-uni-view",{staticClass:"prc_item_center3"},[i("v-uni-view",{staticClass:"pro_btn"},[t._v("查看详情")])],1)],1)],1)],2)],1)},r=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return a}))},bc28:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".fbdrw[data-v-aa4653aa]{overflow:hidden}.fbdrw .project_tab[data-v-aa4653aa]{height:%?105?%;background-color:#fff;margin-top:%?6?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;color:#636363;font-size:14px}.fbdrw .project_tab .prtab_item[data-v-aa4653aa]{height:%?90?%;line-height:%?90?%}.fbdrw .project_tab .prtab_pink[data-v-aa4653aa]{border-bottom:2px solid #f16f62;color:#f16f62;font-size:16px}.fbdrw .project_content[data-v-aa4653aa]{padding-bottom:%?50?%}.fbdrw .project_content .prc_item[data-v-aa4653aa]{background-color:#fff;width:%?700?%;box-sizing:border-box;margin:%?30?% auto 0;padding:%?20?% %?30?%;border-radius:%?15?%;box-shadow:0 0 4px #c3bfbf}.fbdrw .project_content .prc_item .prc_item_top[data-v-aa4653aa]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:15px;font-weight:550;padding:%?20?% 0;border-bottom:1px solid #e5e5e5}.fbdrw .project_content .prc_item .prc_item_top .prc_item_top1[data-v-aa4653aa]{display:-webkit-box;display:-webkit-flex;display:flex}.fbdrw .project_content .prc_item .prc_item_top .prc_item_top1 uni-image[data-v-aa4653aa]{width:%?40?%;height:%?40?%;margin-left:%?20?%}.fbdrw .project_content .prc_item .prc_item_top .prc_item_top2[data-v-aa4653aa]{color:#ed6d62}.fbdrw .project_content .prc_item .prc_item_center1[data-v-aa4653aa]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:15px;font-weight:550;height:%?100?%;line-height:%?100?%}.fbdrw .project_content .prc_item .prc_item_center1 .prc_item_center1_right[data-v-aa4653aa]{font-size:18px;color:#ed6d62}.fbdrw .project_content .prc_item .prc_item_center1 .prc_item_center1_right uni-text[data-v-aa4653aa]{font-size:12px;margin-left:%?10?%}.fbdrw .project_content .prc_item .prc_item_center2[data-v-aa4653aa]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:11px;height:%?70?%;line-height:%?40?%;color:#b5b1b2}.fbdrw .project_content .prc_item .prc_item_center3[data-v-aa4653aa]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-webkit-flex-direction:row-reverse;flex-direction:row-reverse}.fbdrw .project_content .prc_item .prc_item_center3 .pro_btn[data-v-aa4653aa]{width:%?180?%;height:%?60?%;line-height:%?60?%;text-align:center;color:#fff;background-image:-webkit-linear-gradient(#f99595,#f06d65);background-image:linear-gradient(#f99595,#f06d65);font-size:14px;border-radius:%?10?%;box-shadow:0 0 %?10?% #e2a7a3}",""]),t.exports=e},ee38:function(t,e,i){"use strict";i.r(e);var a=i("5272"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a}}]);