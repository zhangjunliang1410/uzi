(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-project-project"],{"0101":function(t,e,i){var a=i("8041");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("06a54d84",a,!0,{sourceMap:!1,shadowMode:!1})},"2af1":function(t,e,i){"use strict";i.r(e);var a=i("b480"),n=i("94b0");for(var c in n)"default"!==c&&function(t){i.d(e,t,(function(){return n[t]}))}(c);i("6488");var r,o=i("f0c5"),s=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"e2459478",null,!1,a["a"],r);e["default"]=s.exports},6488:function(t,e,i){"use strict";var a=i("0101"),n=i.n(a);n.a},8041:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".project[data-v-e2459478]{background-image:url(/static/img/rwbj.png);background-repeat:no-repeat;background-size:contain;margin-top:0}.project .status_bar[data-v-e2459478]{height:0;width:100%}.project .project_title[data-v-e2459478]{text-align:center;line-height:%?80?%;height:%?80?%;font-size:16px;color:#000}.project .project_tab[data-v-e2459478]{height:%?105?%;background-color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;color:#636363;font-size:14px;border-bottom:%?1?% solid #c8c7cc}.project .project_tab .prtab_item[data-v-e2459478]{height:%?90?%;line-height:%?90?%}.project .project_tab .prtab_pink[data-v-e2459478]{border-bottom:2px solid #f16f62;color:#f16f62}.project .project_content[data-v-e2459478]{padding-bottom:%?50?%}.project .project_content .prc_item[data-v-e2459478]{background-color:#fff;width:%?700?%;box-sizing:border-box;margin:%?30?% auto 0;padding:%?20?% %?30?%;border-radius:%?15?%;box-shadow:0 0 4px #c3bfbf}.project .project_content .prc_item .prc_item_top[data-v-e2459478]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:15px;font-weight:550;height:%?70?%;line-height:%?70?%;border-bottom:1px solid #e5e5e5}.project .project_content .prc_item .prc_item_top .prc_item_top2[data-v-e2459478]{display:-webkit-box;display:-webkit-flex;display:flex}.project .project_content .prc_item .prc_item_top .prc_item_top2 uni-image[data-v-e2459478]{width:%?40?%;height:%?40?%;margin-right:%?20?%}.project .project_content .prc_item .prc_item_center1[data-v-e2459478]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:15px;font-weight:550;height:%?100?%;line-height:%?100?%}.project .project_content .prc_item .prc_item_center1 .prc_item_center1_right[data-v-e2459478]{font-size:18px;color:#ed6d62}.project .project_content .prc_item .prc_item_center1 .prc_item_center1_right uni-text[data-v-e2459478]{font-size:12px;margin-left:%?10?%}.project .project_content .prc_item .prc_item_center2[data-v-e2459478]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:11px;height:%?70?%;line-height:%?40?%;color:#b5b1b2}.project .project_content .prc_item .prc_item_center3[data-v-e2459478]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-webkit-flex-direction:row-reverse;flex-direction:row-reverse}.project .project_content .prc_item .prc_item_center3 .pro_btn[data-v-e2459478]{width:%?180?%;height:%?60?%;line-height:%?60?%;text-align:center;color:#fff;background-image:-webkit-linear-gradient(#f99595,#f06d65);background-image:linear-gradient(#f99595,#f06d65);font-size:14px;border-radius:%?10?%;box-shadow:0 0 %?10?% #e2a7a3}",""]),t.exports=e},"94b0":function(t,e,i){"use strict";i.r(e);var a=i("f566"),n=i.n(a);for(var c in a)"default"!==c&&function(t){i.d(e,t,(function(){return a[t]}))}(c);e["default"]=n.a},b480:function(t,e,i){"use strict";var a,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"project"},[i("v-uni-view",{staticClass:"status_bar"}),i("v-uni-view",{staticClass:"project_title"},[t._v("任务中心")]),i("v-uni-view",{staticClass:"project_tab"},[i("v-uni-view",{staticClass:"prtab_item",class:[1==t.tabtype?"prtab_pink":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changetab(1)}}},[t._v("点赞任务")]),i("v-uni-view",{staticClass:"prtab_item",class:[2==t.tabtype?"prtab_pink":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changetab(2)}}},[t._v("转发任务")]),i("v-uni-view",{staticClass:"prtab_item",class:[3==t.tabtype?"prtab_pink":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changetab(3)}}},[t._v("综合任务")])],1),3==t.tabtype?i("v-uni-view",{staticClass:"project_tab",staticStyle:{border:"none"}},[i("v-uni-view",{staticClass:"prtab_item",class:[0==t.mealtype?"prtab_pink":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changetab2(0)}}},[t._v("青铜会员")]),i("v-uni-view",{staticClass:"prtab_item",class:[1==t.mealtype?"prtab_pink":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changetab2(1)}}},[t._v("黄金会员")]),i("v-uni-view",{staticClass:"prtab_item",class:[2==t.mealtype?"prtab_pink":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changetab2(2)}}},[t._v("白金会员")]),i("v-uni-view",{staticClass:"prtab_item",class:[3==t.mealtype?"prtab_pink":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changetab2(3)}}},[t._v("钻石会员")]),i("v-uni-view",{staticClass:"prtab_item",class:[4==t.mealtype?"prtab_pink":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changetab2(4)}}},[t._v("至尊会员")])],1):t._e(),i("v-uni-scroll-view",{staticClass:"project_content",style:{height:t.height2},attrs:{"scroll-top":0,"scroll-y":"true"},on:{scrolltolower:function(e){arguments[0]=e=t.$handleEvent(e),t.pushArry.apply(void 0,arguments)}}},t._l(t.array,(function(e,a){return i("v-uni-view",{staticClass:"prc_item"},[i("v-uni-view",{staticClass:"prc_item_top"},[1==t.tabtype?i("v-uni-view",{staticClass:"prc_item_top1"},[t._v("任务类型:点赞+关注")]):t._e(),2==t.tabtype?i("v-uni-view",{staticClass:"prc_item_top1"},[t._v("任务类型:视频转发")]):t._e(),3==t.tabtype?i("v-uni-view",{staticClass:"prc_item_top1"},[t._v("任务类型:综合任务")]):t._e(),1==t.tabtype?i("v-uni-view",{staticClass:"prc_item_top2"},[i("v-uni-image",{attrs:{src:"/static/img/zan.png",mode:""}}),i("v-uni-image",{attrs:{src:"/static/img/zhu.png",mode:""}})],1):t._e(),2==t.tabtype?i("v-uni-view",{staticClass:"prc_item_top2"},[i("v-uni-image",{attrs:{src:"/static/img/fa.png",mode:""}})],1):t._e(),3==t.tabtype?i("v-uni-view",{staticClass:"prc_item_top2"},[i("v-uni-image",{attrs:{src:"/static/img/wu.png",mode:""}})],1):t._e()],1),i("v-uni-view",{staticClass:"prc_item_center"},[i("v-uni-view",{staticClass:"prc_item_center1"},[i("v-uni-view",[t._v(t._s(e.title))]),i("v-uni-view",{staticClass:"prc_item_center1_right"},[t._v(t._s(e.price)),i("v-uni-text",[t._v("元")])],1)],1),i("v-uni-view",{staticClass:"prc_item_center2"},[i("v-uni-view",[t._v(t._s(t.time(e.createtime))+" "+t._s(t.time(e.endtime)))]),i("v-uni-view",[t._v("任务奖励")])],1),i("v-uni-view",{staticClass:"prc_item_center3"},[1==t.tabtype?i("v-uni-view",{staticClass:"pro_btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.todetail(e.id)}}},[t._v("立即前往")]):t._e(),2==t.tabtype?i("v-uni-view",{staticClass:"pro_btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.todetail(e.id)}}},[t._v("立即前往")]):t._e(),3==t.tabtype?i("v-uni-view",{staticClass:"pro_btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.todetail(e.id)}}},[t._v("立即前往")]):t._e()],1)],1)],1)})),1)],1)},c=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return c})),i.d(e,"a",(function(){return a}))},f566:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{tabtype:1,mealtype:0,page:1,height:0,height1:"",height2:"",array:[]}},onShow:function(){this.page=1,this.array=[],this.getData(),this.height=uni.getSystemInfoSync().windowHeight,this.height2=this.height-90+"px"},onPullDownRefresh:function(){this.page=1,this.array=[],this.getData()},methods:{changetab:function(t){this.tabtype=t,this.page=1,this.array=[],this.height2=3==t?this.height-100+"px":this.height-90+"px",this.getData()},changetab2:function(t){this.mealtype=t,this.page=1,this.array=[],this.getData()},pushArry:function(){t("log","到底部"," at pages/project/project.vue:143"),this.page++,this.getData()},todetail:function(t){uni.navigateTo({url:"projectdetail/projectdetail?id="+t})},time:function(t){return this.base.toDate(t)},getData:function(){var t=this,e={page:this.page,tasktype:this.tabtype};3==this.tabtype&&(e.mealtype=this.mealtype);var i=function(e){if(uni.stopPullDownRefresh(),e.length>0)for(var i=0;i<e.length;i++)t.array.push(e[i])};this.http("index/taskList",e,i)}}};e.default=i}).call(this,i("0de9")["log"])}}]);