(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-lyfk-lyfk"],{"1b40":function(t,i,n){var e=n("3281");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var a=n("4f06").default;a("41bb240f",e,!0,{sourceMap:!1,shadowMode:!1})},2967:function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e={data:function(){return{inp1:"",inp2:"",inp3:""}},methods:{fkbtn:function(){var t={content:this.inp1,mobile:this.inp2},i=function(){};this.http("index/feedBack",t,i)}}};i.default=e},3281:function(t,i,n){var e=n("24fb");i=e(!1),i.push([t.i,".lyfk[data-v-0c2d8e1f]{padding:%?10?% %?30?%}.lyfk .title[data-v-0c2d8e1f]{line-height:%?80?%;height:%?80?%;font-weight:550;font-size:15px}.lyfk uni-input[data-v-0c2d8e1f],\n.lyfk uni-textarea[data-v-0c2d8e1f]{background-color:#fff;border-radius:%?10?%;width:100%;padding:%?20?% %?20?%;box-sizing:border-box;font-size:14px;box-shadow:0 0 6px #999}.lyfk .inp2[data-v-0c2d8e1f],\n.lyfk .inp3[data-v-0c2d8e1f]{line-height:%?80?%;height:%?80?%}.lyfk .yzm_wrap[data-v-0c2d8e1f]{display:-webkit-box;display:-webkit-flex;display:flex}.lyfk .yzm_wrap .inp3[data-v-0c2d8e1f]{width:%?400?%}.lyfk .yzm_wrap .yzm[data-v-0c2d8e1f]{width:%?240?%;height:%?80?%;margin-left:%?20?%}.lyfk .lyfk_btn[data-v-0c2d8e1f]{background-image:-webkit-linear-gradient(#f69697,#f16e64);background-image:linear-gradient(#f69697,#f16e64);width:%?490?%;height:%?70?%;margin:%?100?% auto;color:#fff;font-size:16px;line-height:%?70?%;text-align:center;border-radius:%?10?%;box-shadow:0 0 6px #999}",""]),t.exports=i},"77e1":function(t,i,n){"use strict";var e,a=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-uni-view",{staticClass:"lyfk"},[n("v-uni-view",{staticClass:"title"},[t._v("反馈内容")]),n("v-uni-textarea",{staticClass:"inp1",attrs:{placeholder:"请输入您要反馈的内容"},model:{value:t.inp1,callback:function(i){t.inp1=i},expression:"inp1"}}),n("v-uni-view",{staticClass:"title"},[t._v("联系方式")]),n("v-uni-input",{staticClass:"inp2",attrs:{type:"number",placeholder:"请输入您的手机号"},model:{value:t.inp2,callback:function(i){t.inp2=i},expression:"inp2"}}),n("v-uni-view",{staticClass:"title"},[t._v("验证码")]),n("v-uni-view",{staticClass:"yzm_wrap"},[n("v-uni-input",{staticClass:"inp3",attrs:{type:"text",placeholder:"请输入验证码"},model:{value:t.inp3,callback:function(i){t.inp3=i},expression:"inp3"}}),n("v-uni-image",{staticClass:"yzm",attrs:{src:"/static/img/banner.png",mode:""}})],1),n("v-uni-view",{staticClass:"lyfk_btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.fkbtn.apply(void 0,arguments)}}},[t._v("提交反馈")])],1)},f=[];n.d(i,"b",(function(){return a})),n.d(i,"c",(function(){return f})),n.d(i,"a",(function(){return e}))},8639:function(t,i,n){"use strict";n.r(i);var e=n("77e1"),a=n("d9f3");for(var f in a)"default"!==f&&function(t){n.d(i,t,(function(){return a[t]}))}(f);n("cf6f");var l,c=n("f0c5"),r=Object(c["a"])(a["default"],e["b"],e["c"],!1,null,"0c2d8e1f",null,!1,e["a"],l);i["default"]=r.exports},cf6f:function(t,i,n){"use strict";var e=n("1b40"),a=n.n(e);a.a},d9f3:function(t,i,n){"use strict";n.r(i);var e=n("2967"),a=n.n(e);for(var f in e)"default"!==f&&function(t){n.d(i,t,(function(){return e[t]}))}(f);i["default"]=a.a}}]);