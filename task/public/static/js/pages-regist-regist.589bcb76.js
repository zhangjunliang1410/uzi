(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-regist-regist"],{"0973":function(t,i,e){var n=e("24fb");i=n(!1),i.push([t.i,".login[data-v-03e4df32]{position:absolute;left:0;right:0;top:0;bottom:0;background-image:url(/static/img/login.jpg);background-size:cover;overflow-y:scroll;padding-bottom:%?50?%}.login .logo[data-v-03e4df32]{height:%?200?%;width:100%;margin-top:%?130?%;z-index:3}.login .logo .logo_img[data-v-03e4df32]{width:%?180?%;height:%?180?%;position:absolute;z-index:2;left:%?285?%;border-radius:%?30?%;box-shadow:0 0 6px #999}.login .login_content[data-v-03e4df32]{background-color:#fff;width:%?650?%;border-radius:%?10?%;font-size:15px;font-weight:550;margin:0 auto;padding:%?60?% %?40?% 0;box-sizing:border-box;box-shadow:0 0 6px #ddd}.login .login_content .login_txt[data-v-03e4df32]{height:%?70?%;line-height:%?100?%}.login .login_content .inp[data-v-03e4df32]{width:100%;border-bottom:1px solid #aaa;height:%?60?%;font-weight:500}.login .login_content .text_tip[data-v-03e4df32]{text-align:right;color:#e7928f;font-size:12px;line-height:%?90?%;height:%?90?%}.login .login_content .login_btn[data-v-03e4df32]{width:100%;text-align:center;height:%?90?%;background-color:#e98f87;color:#fff;line-height:%?90?%;border-radius:%?10?%;margin-top:%?80?%;box-shadow:3px 3px 6px #aca6a8}.login .login_content .login_txt2[data-v-03e4df32]{font-size:17px;color:#e98f87;text-align:center;height:%?170?%;line-height:%?170?%}.login .login_content .code_box[data-v-03e4df32]{display:-webkit-box;display:-webkit-flex;display:flex}.login .login_content .code_box .inp[data-v-03e4df32]{-webkit-box-flex:2;-webkit-flex:2;flex:2}.login .login_content .code_box .code[data-v-03e4df32]{-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#f08a7e;text-align:center}.login .login_content .code_box .num[data-v-03e4df32]{color:#fcddda}",""]),t.exports=i},"1fd9":function(t,i,e){"use strict";var n=e("68c5"),o=e.n(n);o.a},"30a2":function(t,i,e){"use strict";e.r(i);var n=e("85f0"),o=e("54b4");for(var a in o)"default"!==a&&function(t){e.d(i,t,(function(){return o[t]}))}(a);e("1fd9");var s,l=e("f0c5"),c=Object(l["a"])(o["default"],n["b"],n["c"],!1,null,"03e4df32",null,!1,n["a"],s);i["default"]=c.exports},"54b4":function(t,i,e){"use strict";e.r(i);var n=e("f098"),o=e.n(n);for(var a in n)"default"!==a&&function(t){e.d(i,t,(function(){return n[t]}))}(a);i["default"]=o.a},"68c5":function(t,i,e){var n=e("0973");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=e("4f06").default;o("5fff10d6",n,!0,{sourceMap:!1,shadowMode:!1})},"85f0":function(t,i,e){"use strict";var n,o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"login"},[e("v-uni-view",{staticClass:"logo"},[e("v-uni-image",{staticClass:"logo_img",attrs:{src:"/static/img/logo.png",mode:""}})],1),e("v-uni-view",{staticClass:"login_content"},[e("v-uni-view",{staticClass:"login_txt"},[t._v("输入手机号")]),e("v-uni-input",{staticClass:"inp",attrs:{type:"text",value:""},model:{value:t.mobil,callback:function(i){t.mobil=i},expression:"mobil"}}),e("v-uni-view",{staticClass:"login_txt"},[t._v("填写手机验证码")]),e("v-uni-view",{staticClass:"code_box"},[e("v-uni-input",{staticClass:"inp",attrs:{type:"text",value:""},model:{value:t.code,callback:function(i){t.code=i},expression:"code"}}),t.send?e("v-uni-view",{staticClass:"code",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.sendcode.apply(void 0,arguments)}}},[t._v("获取验证码")]):e("v-uni-view",{staticClass:"code num"},[t._v(t._s(t.times)+"s后发送")])],1),e("v-uni-view",{staticClass:"login_txt"},[t._v("填写邀请码")]),e("v-uni-input",{staticClass:"inp",attrs:{type:"text",value:""},model:{value:t.yqm,callback:function(i){t.yqm=i},expression:"yqm"}}),e("v-uni-view",{staticClass:"login_txt"},[t._v("设置登录密码")]),e("v-uni-input",{staticClass:"inp",attrs:{type:"password",value:""},model:{value:t.pass,callback:function(i){t.pass=i},expression:"pass"}}),e("v-uni-view",{staticClass:"login_txt"},[t._v("再次确认密码")]),e("v-uni-input",{staticClass:"inp",attrs:{type:"password",value:""},model:{value:t.pass2,callback:function(i){t.pass2=i},expression:"pass2"}}),e("v-uni-view",{staticClass:"login_btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.regist.apply(void 0,arguments)}}},[t._v("注册")]),e("v-uni-view",{staticClass:"login_txt2",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.login.apply(void 0,arguments)}}},[t._v("去登录")])],1)],1)},a=[];e.d(i,"b",(function(){return o})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){return n}))},f098:function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e={data:function(){return{mobil:"",code:"",yqm:"",pass:"",pass2:"",send:!0,times:30}},methods:{sendcode:function(){var t=this,i={type:"sendSms",mobile:this.mobil},e=function(i){if(0==i.code){t.send=!1;var e=setInterval((function(){t.times=t.times-1,t.times<=0&&(t.send=!0,t.times=30,clearInterval(e))}),1e3)}};this.log("user/register",i,e)},login:function(){uni.navigateTo({url:"../login/login"})},regist:function(){var i=this,e={mobile:this.mobil,code:this.code,suid:this.yqm,password:this.pass,repassword:this.pass2};t("log",e," at pages/regist/regist.vue:93");var n=function(t){0==t.code&&(uni.setStorageSync("dzacount",i.mobil),uni.setStorageSync("dzpass",i.pass),uni.switchTab({url:"../index/index"}))};this.log("user/register",e,n)}}};i.default=e}).call(this,e("0de9")["log"])}}]);