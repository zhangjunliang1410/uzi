(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-regist-regist"],{"0430":function(t,i,n){var e=n("be83");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var o=n("4f06").default;o("2c337c84",e,!0,{sourceMap:!1,shadowMode:!1})},2905:function(t,i,n){"use strict";var e=n("0430"),o=n.n(e);o.a},"30a2":function(t,i,n){"use strict";n.r(i);var e=n("b707"),o=n("54b4");for(var a in o)"default"!==a&&function(t){n.d(i,t,(function(){return o[t]}))}(a);n("2905");var s,l=n("f0c5"),c=Object(l["a"])(o["default"],e["b"],e["c"],!1,null,"50b4f868",null,!1,e["a"],s);i["default"]=c.exports},"54b4":function(t,i,n){"use strict";n.r(i);var e=n("f098"),o=n.n(e);for(var a in e)"default"!==a&&function(t){n.d(i,t,(function(){return e[t]}))}(a);i["default"]=o.a},b707:function(t,i,n){"use strict";var e,o=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-uni-view",{staticClass:"login"},[n("v-uni-view",{staticClass:"logo"},[n("v-uni-image",{staticClass:"logo_img",attrs:{src:"/static/img/logo.png",mode:""}})],1),n("v-uni-view",{staticClass:"login_content"},[n("v-uni-view",{staticClass:"login_txt"},[t._v("输入手机号")]),n("v-uni-input",{staticClass:"inp",attrs:{type:"text",value:""},model:{value:t.mobil,callback:function(i){t.mobil=i},expression:"mobil"}}),n("v-uni-view",{staticClass:"login_txt"},[t._v("填写手机验证码")]),n("v-uni-view",{staticClass:"code_box"},[n("v-uni-input",{staticClass:"inp",attrs:{type:"text",value:""},model:{value:t.code,callback:function(i){t.code=i},expression:"code"}}),t.send?n("v-uni-view",{staticClass:"code",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.sendcode.apply(void 0,arguments)}}},[t._v("获取验证码")]):n("v-uni-view",{staticClass:"code num"},[t._v(t._s(t.times)+"s后发送")])],1),n("v-uni-view",{staticClass:"login_txt"},[t._v("填写邀请码")]),n("v-uni-input",{staticClass:"inp",attrs:{type:"text",value:""},model:{value:t.yqm,callback:function(i){t.yqm=i},expression:"yqm"}}),n("v-uni-view",{staticClass:"login_txt"},[t._v("设置登录密码")]),n("v-uni-input",{staticClass:"inp",attrs:{type:"password",value:""},model:{value:t.pass,callback:function(i){t.pass=i},expression:"pass"}}),n("v-uni-view",{staticClass:"login_txt"},[t._v("再次确认密码")]),n("v-uni-input",{staticClass:"inp",attrs:{type:"password",value:""},model:{value:t.pass2,callback:function(i){t.pass2=i},expression:"pass2"}}),n("v-uni-view",{staticClass:"login_btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.regist.apply(void 0,arguments)}}},[t._v("注册")]),n("v-uni-view",{staticClass:"login_txt2",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.login.apply(void 0,arguments)}}},[t._v("去登录")])],1)],1)},a=[];n.d(i,"b",(function(){return o})),n.d(i,"c",(function(){return a})),n.d(i,"a",(function(){return e}))},be83:function(t,i,n){var e=n("24fb");i=e(!1),i.push([t.i,".login[data-v-50b4f868]{position:absolute;left:0;right:0;top:0;bottom:0;background-image:url(/static/img/login.jpg);background-size:cover;overflow-y:scroll;padding-bottom:%?50?%}.login .logo[data-v-50b4f868]{height:%?200?%;width:100%;margin-top:%?130?%;z-index:3}.login .logo .logo_img[data-v-50b4f868]{width:%?180?%;height:%?180?%;position:absolute;z-index:2;left:%?285?%;border-radius:%?30?%;box-shadow:0 0 6px #999}.login .login_content[data-v-50b4f868]{background-color:#fff;width:%?650?%;border-radius:%?10?%;font-size:15px;font-weight:550;margin:0 auto;padding:%?60?% %?40?% 0;box-sizing:border-box;box-shadow:0 0 6px #ddd}.login .login_content .login_txt[data-v-50b4f868]{height:%?70?%;line-height:%?100?%;font-weight:700}.login .login_content .inp[data-v-50b4f868]{width:100%;border-bottom:1px solid #aaa;height:%?60?%;margin-top:%?10?%;font-weight:500}.login .login_content .text_tip[data-v-50b4f868]{text-align:right;color:#e7928f;font-size:12px;line-height:%?90?%;height:%?90?%}.login .login_content .login_btn[data-v-50b4f868]{width:100%;text-align:center;height:%?90?%;background-color:#e98f87;color:#fff;line-height:%?90?%;border-radius:%?10?%;margin-top:%?80?%;box-shadow:3px 3px 6px #aca6a8}.login .login_content .login_txt2[data-v-50b4f868]{font-size:19px;color:#e98f87;text-align:center;height:%?170?%;line-height:%?170?%;font-weight:700}.login .login_content .code_box[data-v-50b4f868]{display:-webkit-box;display:-webkit-flex;display:flex}.login .login_content .code_box .inp[data-v-50b4f868]{-webkit-box-flex:2;-webkit-flex:2;flex:2}.login .login_content .code_box .code[data-v-50b4f868]{-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#f08a7e;text-align:center;margin-top:%?10?%}.login .login_content .code_box .num[data-v-50b4f868]{color:#fcddda}",""]),t.exports=i},f098:function(t,i,n){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={data:function(){return{mobil:"",code:"",yqm:"",pass:"",pass2:"",send:!0,times:30}},methods:{sendcode:function(){var t=this,i={type:"sendSms",mobile:this.mobil},n=function(i){if(0==i.code){t.send=!1;var n=setInterval((function(){t.times=t.times-1,t.times<=0&&(t.send=!0,t.times=30,clearInterval(n))}),1e3)}};this.log("user/register",i,n)},login:function(){uni.navigateTo({url:"../login/login"})},regist:function(){var i=this,n={mobile:this.mobil,code:this.code,suid:this.yqm,password:this.pass,repassword:this.pass2};t("log",n," at pages/regist/regist.vue:93");var e=function(t){0==t.code&&(uni.setStorageSync("dzacount",i.mobil),uni.setStorageSync("dzpass",i.pass),uni.switchTab({url:"../index/index"}))};this.log("user/register",n,e)}}};i.default=n}).call(this,n("0de9")["log"])}}]);