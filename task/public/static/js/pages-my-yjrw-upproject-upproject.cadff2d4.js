(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-yjrw-upproject-upproject"],{"030d":function(i,t,a){"use strict";a.r(t);var e=a("033a"),n=a("1110");for(var o in n)"default"!==o&&function(i){a.d(t,i,(function(){return n[i]}))}(o);a("15d2");var s,c=a("f0c5"),u=Object(c["a"])(n["default"],e["b"],e["c"],!1,null,"a81fb10a",null,!1,e["a"],s);t["default"]=u.exports},"033a":function(i,t,a){"use strict";var e,n=function(){var i=this,t=i.$createElement,a=i._self._c||t;return a("v-uni-view",{staticClass:"upproject"},[1==i.iscollect?a("v-uni-view",{staticClass:"pd_h"},[i._v("收集信息 :")]):i._e(),1==i.iscollect?a("v-uni-input",{staticClass:"up_inp",attrs:{"placeholder-class":"up_inp_pla",type:"text",placeholder:"填写用户昵称或者账户"},model:{value:i.xinxi,callback:function(t){i.xinxi=t},expression:"xinxi"}}):i._e(),1==i.isimg?a("v-uni-view",{staticClass:"pd_h"},[i._v("上传截图 :")]):i._e(),1==i.isimg?a("v-uni-view",{staticClass:"img_box"},[i._l(i.imglist,(function(t,e){return a("v-uni-view",[a("v-uni-image",{staticClass:"img_item",attrs:{src:t}}),a("v-uni-image",{staticClass:"guanbi",attrs:{src:"/static/img/guanbi.png"},on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.remove(e)}}})],1)})),a("v-uni-image",{staticClass:"img_item",attrs:{src:"/static/img/addimg2.png"},on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.thatImage.apply(void 0,arguments)}}})],2):i._e(),a("v-uni-view",{staticClass:"pd_btn2"},[a("v-uni-view",{staticStyle:{"background-color":"#e98f87"},on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.uppro.apply(void 0,arguments)}}},[i._v("提交")])],1)],1)},o=[];a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return e}))},1110:function(i,t,a){"use strict";a.r(t);var e=a("fc14"),n=a.n(e);for(var o in e)"default"!==o&&function(i){a.d(t,i,(function(){return e[i]}))}(o);t["default"]=n.a},"15d2":function(i,t,a){"use strict";var e=a("54f7"),n=a.n(e);n.a},"54f7":function(i,t,a){var e=a("b3a9");"string"===typeof e&&(e=[[i.i,e,""]]),e.locals&&(i.exports=e.locals);var n=a("4f06").default;n("7f1ff18a",e,!0,{sourceMap:!1,shadowMode:!1})},b3a9:function(i,t,a){var e=a("24fb");t=e(!1),t.push([i.i,"uni-page-body[data-v-a81fb10a]{background-color:#fff}uni-page-body .upproject[data-v-a81fb10a]{border-top:%?5?% solid #f2f2f2;padding:%?30?%}uni-page-body .upproject .pd_h[data-v-a81fb10a]{height:%?50?%;line-height:%?50?%;font-weight:600;font-size:15px}uni-page-body .upproject .up_inp[data-v-a81fb10a]{text-indent:%?20?%;font-size:14px;box-shadow:0 0 3px #a6a0a3;height:%?70?%;line-height:%?70?%;margin:%?20?% 0;border-radius:%?10?%}uni-page-body .upproject .img_box uni-view[data-v-a81fb10a]{display:inline-block;position:relative}uni-page-body .upproject .img_box .img_item[data-v-a81fb10a]{width:%?180?%;height:%?180?%;margin:%?20?%}uni-page-body .upproject .img_box .guanbi[data-v-a81fb10a]{position:absolute;right:%?-5?%;width:%?40?%;height:%?40?%}uni-page-body .upproject .pd_btn2 uni-view[data-v-a81fb10a]{float:right;width:%?200?%;height:%?88?%;line-height:%?88?%;color:#fff;font-size:15px;text-align:center;border-radius:%?10?%;margin:%?20?%}body.?%PAGE?%[data-v-a81fb10a]{background-color:#fff}",""]),i.exports=t},fc14:function(i,t,a){"use strict";a("a434"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{xinxi:"",imglist:[],images:[],isimg:"",iscollect:"",taskOrderId:""}},onLoad:function(i){this.isimg=i.isimg,this.iscollect=i.iscollect,this.taskOrderId=i.taskOrderId},methods:{uppro:function(){var i=uni.getSystemInfoSync(),t={id:this.taskOrderId,images:this.images,collect:this.xinxi,mobilemodel:i.model,platform:i.platform},a=function(){uni.navigateBack({delta:1})};this.http("index/finish",t,a)},thatImage:function(){var i=this;uni.chooseImage({count:1,sizeType:["compressed"],success:function(t){var a=t.tempFilePaths,e=function(t){i.imglist.push(getApp().globalData.url+t.data),i.images.push(t.data)};i.post("image",a,e)}})},remove:function(i){this.imglist.splice(i,1),this.images.splice(i,1)}}};t.default=e}}]);