(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-bangding-bangding"],{"0b47":function(t,e,n){(function(t){n("a4d3"),n("e01a"),n("b636"),n("d28b"),n("944a"),n("4de4"),n("7db0"),n("4160"),n("c975"),n("d81d"),n("26e9"),n("fb6a"),n("45fc"),n("a434"),n("0c47"),n("23dc"),n("a9e3"),n("dca8"),n("3410"),n("b64b"),n("131a"),n("d3b7"),n("4d63"),n("ac1f"),n("25f0"),n("3ca3"),n("466d"),n("1276"),n("159b"),n("ddb0"),function(t,n){n(e)}(0,(function(e){"use strict";function n(t,e){return e={exports:{}},t(e,e.exports),e.exports}var r=n((function(t){var e=function(t){var e,n=Object.prototype,r=n.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",o=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function c(t,e,n,r){var i=e&&e.prototype instanceof g?e:g,a=Object.create(i.prototype),o=new C(r||[]);return a._invoke=x(t,n,o),a}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(r){return{type:"throw",arg:r}}}t.wrap=c;var l="suspendedStart",d="suspendedYield",p="executing",f="completed",h={};function g(){}function v(){}function b(){}var m={};m[a]=function(){return this};var y=Object.getPrototypeOf,w=y&&y(y(J([])));w&&w!==n&&r.call(w,a)&&(m=w);var _=b.prototype=g.prototype=Object.create(m);function k(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function S(t,e){function n(i,a,o,s){var c=u(t[i],t,a);if("throw"!==c.type){var l=c.arg,d=l.value;return d&&"object"===typeof d&&r.call(d,"__await")?e.resolve(d.__await).then((function(t){n("next",t,o,s)}),(function(t){n("throw",t,o,s)})):e.resolve(d).then((function(t){l.value=t,o(l)}),(function(t){return n("throw",t,o,s)}))}s(c.arg)}var i;function a(t,r){function a(){return new e((function(e,i){n(t,r,e,i)}))}return i=i?i.then(a,a):a()}this._invoke=a}function x(t,e,n){var r=l;return function(i,a){if(r===p)throw new Error("Generator is already running");if(r===f){if("throw"===i)throw a;return O()}n.method=i,n.arg=a;while(1){var o=n.delegate;if(o){var s=M(o,n);if(s){if(s===h)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=f,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=p;var c=u(t,e,n);if("normal"===c.type){if(r=n.done?f:d,c.arg===h)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=f,n.method="throw",n.arg=c.arg)}}}function M(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,M(t,n),"throw"===n.method))return h;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var i=u(r,t.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,h;var a=i.arg;return a?a.done?(n[t.resultName]=a.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,h):a:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,h)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function C(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function J(t){if(t){var n=t[a];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var i=-1,o=function n(){while(++i<t.length)if(r.call(t,i))return n.value=t[i],n.done=!1,n;return n.value=e,n.done=!0,n};return o.next=o}}return{next:O}}function O(){return{value:e,done:!0}}return v.prototype=_.constructor=b,b.constructor=v,b[s]=v.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},k(S.prototype),S.prototype[o]=function(){return this},t.AsyncIterator=S,t.async=function(e,n,r,i,a){void 0===a&&(a=Promise);var o=new S(c(e,n,r,i),a);return t.isGeneratorFunction(n)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},k(_),_[s]="Generator",_[a]=function(){return this},_.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=J,C.prototype={constructor:C,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function i(r,i){return s.type="throw",s.arg=t,n.next=r,i&&(n.method="next",n.arg=e),!!i}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],s=o.completion;if("root"===o.tryLoc)return i("end");if(o.tryLoc<=this.prev){var c=r.call(o,"catchLoc"),u=r.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return i(o.catchLoc,!0);if(this.prev<o.finallyLoc)return i(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return i(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return i(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var a=i;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=t,o.arg=e,a?(this.method="next",this.next=a.finallyLoc,h):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),j(n),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;j(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:J(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),h}},t}(t.exports);try{regeneratorRuntime=e}catch(n){Function("r","regeneratorRuntime = r")(e)}})),i=r;function a(t,e,n,r,i,a,o){try{var s=t[a](o),c=s.value}catch(X){return void n(X)}s.done?e(c):Promise.resolve(c).then(r,i)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(r,i){var o=t.apply(e,n);function s(t){a(o,r,i,s,c,"next",t)}function c(t){a(o,r,i,s,c,"throw",t)}s(void 0)}))}}var s=o,c=function(t,e){return c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},c(t,e)};
/*!
  * @bridge/bytedance v1.0.0-alpha.18
  * (c) 2020 
  */
/*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  	See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */function u(t,e){function n(){this.constructor=t}c(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}
/*!
  * @bridge/base v1.0.0-alpha.10
  * (c) 2020 
  */var l,d="1.0.0-alpha.10";(function(t){t[t["Failure"]=0]="Failure",t[t["Success"]=1]="Success",t[t["Unauthorized"]=-1]="Unauthorized",t[t["NotExist"]=-2]="NotExist"})(l||(l={}));var p="__JSBridgeIframe__",f="__JSBridgeIframe_SetResult__",h=1023,g=d,v="nativeapp://",b="dispatch_message/",m="private/setresult/SCENE_FETCHQUEUE",y=function(){function t(t){this.version=t.version||g,this.nativeMethodInvoker=t.nativeMethodInvoker,this.nativeEventListener=t.nativeEventListener,this.scheme=t.scheme||v,this.dispatchMessagePath=t.dispatchMessagePath||b,this.setResultPath=t.setResultPath||m,this.listenNativeEvent=!0===t.listenNativeEvent,this.callbackId=h,this.callbackMap={},this.eventMap={},this.javascriptMessageQueue=[],"undefined"!==typeof window&&this.tryCreateIFrames()}return t.prototype.call=function(t,e,n,r){void 0===r&&(r=this.version);var i,a=this.version;if(t&&"string"===typeof t){"object"!==typeof e&&(e={}),"string"===typeof r?a=r||this.version:"object"===typeof r&&(i=r.namespace,a=r.sdkVersion||this.version);var o={func:t,params:e,JSSDK:a,__msg_type:"call",namespace:i};if("function"===typeof n){var s=this.registerCallback(n);o.__callback_id=s}window.parent!==window&&(o.__iframe_url=window.location.href),this.sendMessageToNative(o)}},t.prototype.on=function(t,e,n){if(void 0===n&&(n=!1),t&&"string"===typeof t&&"function"===typeof e){var r=this.registerCallback(e);if(this.eventMap[t]=this.eventMap[t]||{},this.eventMap[t][r]={once:n},this.listenNativeEvent)if(this.nativeEventListener)this.nativeEventListener(t);else{var i={func:t,params:{},JSSDK:this.version,__msg_type:"event",__callback_id:t};this.sendMessageToNative(i)}return r}},t.prototype.once=function(t,e){return this.on(t,e,!0)},t.prototype.off=function(t,e){if(!t||"string"!==typeof t)return!0;var n=this.eventMap[t];return!n||"object"!==typeof n||!n.hasOwnProperty(e)||(this.deregisterCallback(e),delete n[e],!0)},t.prototype.trigger=function(t,e){return this.handleMessageFromNative({__msg_type:"event",__params:e,__event_id:t})},t.prototype.handleMessageFromNative=function(t){var e=this,n=t.__params,r=String(t.__callback_id),i=String(t.__event_id||""),a=t.__msg_type;this.callbackMap[r]?a="callback":this.eventMap[r]&&(a="event",i=i||r);var o={__err_code:"cb404"};switch(a){case"callback":var s=this.callbackMap[r];"function"===typeof s&&(o=s(n)),this.deregisterCallback(r);break;case"event":var c=this.eventMap[i];c&&"object"===typeof c&&Object.keys(c).forEach((function(t){var r=e.callbackMap[t],i=c[t];"function"===typeof r&&(o=r(n)),i&&i.once&&(e.deregisterCallback(t),delete c[t])}));break}return o},t.prototype.fetchJavaScriptMessageQueue=function(){var t=JSON.stringify(this.javascriptMessageQueue);this.javascriptMessageQueue.splice(0,this.javascriptMessageQueue.length);var e=btoa(unescape(encodeURIComponent(t)));return this.setResultIFrame&&(this.setResultIFrame.src=""+this.scheme+this.setResultPath+"&"+e),t},t.prototype.sendMessageToNative=function(t){if(t.JSSDK&&this.nativeMethodInvoker){var e=this.nativeMethodInvoker(t);if(e){var n=JSON.parse(e);this.handleMessageFromNative(n)}}else{if(this.javascriptMessageQueue.push(t),!this.dispatchMessageIFrame)return void this.tryCreateIFrames();this.dispatchMessageIFrame.src=""+this.scheme+this.dispatchMessagePath}},t.prototype.registerCallback=function(t){var e=String(this.callbackId++);return this.callbackMap[e]=t,e},t.prototype.deregisterCallback=function(t){delete this.callbackMap[t]},t.prototype.tryCreateIFrames=function(){var t=this;if("complete"===document.readyState)return this.dispatchMessageIFrame=this.createIFrame(p),this.setResultIFrame=this.createIFrame(f),void(this.javascriptMessageQueue.length>0&&(this.dispatchMessageIFrame.src=""+this.scheme+this.dispatchMessagePath));document.addEventListener("readystatechange",(function(){"complete"===document.readyState&&t.tryCreateIFrames()}))},t.prototype.createIFrame=function(t){var e=document.getElementById(t);return e&&"IFRAME"===e.tagName||(e=document.createElement("iframe"),e.style.display="none",e.id=t,document.documentElement.appendChild(e)),e},t}(),w="1.0.0-alpha.18",_="undefined"!==typeof window?window:{},k=function(t){function e(){var e=t.call(this,{version:w,scheme:"bytedance://",listenNativeEvent:!0})||this;return e.publicApi={call:e.call.bind(e),on:e.on.bind(e),once:e.once.bind(e),off:e.off.bind(e),trigger:e.trigger.bind(e),_fetchQueue:e.fetchJavaScriptMessageQueue.bind(e),_handleMessageFromToutiao:e.handleMessageFromNative.bind(e)},e}return u(e,t),e.prototype.exposePublicApiToGlobal=function(){_.ToutiaoJSBridge=Object.assign(_.ToutiaoJSBridge||{},this.publicApi)},e}(y),S="undefined"!==typeof window?window.navigator.userAgent:"",x=!!S.match(/(newsarticle|videoarticle|lv|faceu|ulike|beauty_me_|faceu-os|ulike-os|beauty_me_oversea_|retouch)\/([\d.]+)/i)||/super|automobile/gi.test(S),M=!!S.match(/(faceu)\/([\d.]+)/i),E=!!S.match(/ttad\/0/i),j="undefined"!==typeof window?window:{};function C(){var t;return j.JS2NativeBridge&&j.JS2NativeBridge._invokeMethod?t=function(t){return j.JS2NativeBridge._invokeMethod(JSON.stringify(t))}:j.ToutiaoJSBridge&&j.ToutiaoJSBridge.invokeMethod?t=function(t){return j.ToutiaoJSBridge.invokeMethod(JSON.stringify(t))}:j.JS2NativeBridge&&j.JS2NativeBridge.call?t=function(t){return j.JS2NativeBridge.call(t.func,JSON.stringify(t))}:j.webkit&&j.webkit.messageHandlers&&j.webkit.messageHandlers.callMethodParams?t=function(t){return j.webkit.messageHandlers.callMethodParams.postMessage(t)}:j.callMethodParams&&(t=function(t){return j.callMethodParams(t.func,t)}),t}function J(){var t;if(x)return j.JSBridge&&j.JSBridge.on?t=j.JSBridge.on:j.JS2NativeBridge&&j.JS2NativeBridge.on?t=function(t){var e={JSSDK:w,__msg_type:"event",__callback_id:t,func:t};j.JS2NativeBridge.on(t,JSON.stringify(e))}:j.webkit&&j.webkit.messageHandlers&&j.webkit.messageHandlers.onMethodParams?t=function(t){var e={JSSDK:w,__msg_type:"event",__callback_id:t,func:t};j.webkit.messageHandlers.onMethodParams.postMessage(e)}:j.onMethodParams&&(t=function(t){var e={JSSDK:w,__msg_type:"event",__callback_id:t,func:t};return j.onMethodParams(t,e)}),t}function O(){return x?"nativeapp://":j.JSBridge&&j.JSBridge._invokeMethod?"nativeapp://":"bytedance://"}var I=function(t){function e(e){var n=t.call(this,{version:w,nativeMethodInvoker:C(),nativeEventListener:J(),scheme:O(),listenNativeEvent:x})||this;return n.toutiaoLegacyJSB=e,n.publicApi={call:n.call.bind(n),on:n.on.bind(n),once:n.once.bind(n),off:n.off.bind(n),trigger:n.trigger.bind(n),_fetchQueue:n.fetchJavaScriptMessageQueue.bind(n),_handleMessageFromApp:n.handleMessageFromNative.bind(n),_handleMessageFromToutiao:n.handleMessageFromNative.bind(n)},n}return u(e,t),e.prototype.call=function(e,n,r,i){void 0===i&&(i=w),this.isLegacyCall(e)?this.toutiaoLegacyJSB.call(e,n,r,i):t.prototype.call.call(this,e,n,r,i)},e.prototype.on=function(e,n,r){return void 0===r&&(r=!1),this.isLegacyCall(e)?this.toutiaoLegacyJSB.on(e,n,r):t.prototype.on.call(this,e,n,r)},e.prototype.once=function(e,n){return this.isLegacyCall(e)?this.toutiaoLegacyJSB.once(e,n):t.prototype.once.call(this,e,n)},e.prototype.off=function(e,n){return this.isLegacyCall(e)?this.toutiaoLegacyJSB.off(e,n):t.prototype.off.call(this,e,n)},e.prototype.trigger=function(e,n){return this.isLegacyCall(e)?this.toutiaoLegacyJSB.trigger(e,n):t.prototype.trigger.call(this,e,n)},e.prototype.exposePublicApiToGlobal=function(){j.JSBridge=Object.assign(j.JSBridge||{},this.publicApi),j.Native2JSBridge=Object.assign(j.Native2JSBridge||{},this.publicApi),x&&this.toutiaoLegacyJSB?this.toutiaoLegacyJSB.exposePublicApiToGlobal():j.ToutiaoJSBridge=Object.assign(j.ToutiaoJSBridge||{},this.publicApi),Object.defineProperties(j,{JSBridge:{writable:!1},Native2JSBridge:{writable:!1},ToutiaoJSBridge:{writable:!1}}),Object.freeze(j.JSBridge),Object.freeze(j.Native2JSBridge),Object.freeze(j.ToutiaoJSBridge)},e.prototype.isLegacyCall=function(t){return!(!t||"string"!==typeof t||!this.toutiaoLegacyJSB)&&(!!E||!M&&(x&&t.indexOf(".")<0))},e}(y),L=new k,N=new I(L);try{N.exposePublicApiToGlobal()}catch(X){t("warn",X.message," at static/douyin/douyin.js:1583")}var B=N.publicApi;function F(e,n){if("undefined"===typeof window)return{};var r=navigator.userAgent.toLowerCase(),i=e.os,a={android:new RegExp("app_version/","i"),ios:new RegExp("aweme_","i")};try{var o=r.split(a[i])[1];if(!o||"string"!==typeof o)throw new Error;o=o.split(" ")[0],n(null,{appid:990003,version:o})}catch(s){t("log","鏈幏鍙栧埌鎶栭煶瀹㈡埛绔俊鎭�"," at static/douyin/douyin.js:1617")}}var P=Object.prototype,A=P.hasOwnProperty,T=P.toString,R={hasOwnProp:function(t,e){return!!this.isObject(t)&&A.call(t,e)},isEmpty:function(t){return null==t||0===this.getProLen(t)},getType:function(t){return T.call(t).match(/\[object (\w+)\]/)[1]},getProLen:function(t){var e=0;return this.isObject(t)&&(e=Object.keys(t).length),e},verCompare:function(t,e){if(t===e)return 0;var n=t.toString().split("."),r=e.toString().split(".");while(n.length<r.length)n.push("0");while(r.length<n.length)r.push("0");var i=0;while(i<n.length){var a=Number(n[i]),o=Number(r[i]);if(o>a)return-1;if(o<a)return 1;if(o<a)return 0;i+=1}return 0},warn:function(e){t("warn","[via]: "+e," at static/douyin/douyin.js:1687")},error:function(e){t("error","[via]: "+e," at static/douyin/douyin.js:1690")}};function z(t,e){if(void 0===e||"*"===e)return!0;var n=String(e).split("|").map((function(t){var e=t.split("-"),n="";switch(e.length){case 1:n=e[0];break;case 2:n={min:e[0],max:e[1]};break}return n})).filter((function(t){return t}));return n.some((function(e){if(R.isString(e))return e===t;if(R.isObject(e)){var n=e.min,r=e.max,i=!0;return n&&(i=i&&-1!==R.verCompare(t,n)),r&&(i=i&&1!==R.verCompare(t,r)),i}return!1}))}function D(t,e){var n=t.appid,r=t.container,i=t.os,a=t.version;return Array.isArray(e)?e.some((function(e){return D(t,e)})):("*"===e.appid||e.appid===n)&&(("*"===e.container||e.container===r)&&(("*"===e.os||e.os===i)&&!("*"!==e.version&&!z(a,e.version))))}["Number","Date","Object","String","Function","Boolean","Null","Undefined","Array"].forEach((function(t){R["is"+t]=function(e){var n=T.call(e)==="[object "+t+"]";return n}}));var Q="undefined"!==typeof window,G=function(){function e(){this.bridge=window.JSBridge}var n=e.prototype;return n.init=function(){var t=this;this.getEnv=new Promise((function(e,n){var r=Q?window.navigator.userAgent:"",i=/(Android);?\s+([\d.]+)?/i.test(r),a=i?"android":"ios",o={container:"web",os:a};Q?F({jsb:t.bridge,container:"web",os:a},(function(t,r){t?n(t):e(Object.assign(o,r))})):e(o)}))},n.getRuleForMethod=function(t,e,n){return n.find((function(e){return D(t,e.target)}))||{}},n.transformConfig=function(){var e=s(i.mark((function e(n,r,a){var o,s,c,u;return i.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getEnv;case 2:return o=e.sent,s=this.getRuleForMethod(o,n,a),s||t("warn","no matching rules found"," at static/douyin/douyin.js:1841"),c=s.map&&s.map.method||n,t("info","call real method: "+c," at static/douyin/douyin.js:1847"),u=s.preprocess?s.preprocess(r,{env:o,bridge:this.bridge}):r,e.abrupt("return",{realMethod:c,realParams:u,rule:s,env:o});case 9:case"end":return e.stop()}}),e,this)})));function n(t,n,r){return e.apply(this,arguments)}return n}(),n.addInternalBridge=function(t){for(var e in t)this[e]=t[e]},n.register=function(t,e){var n=this;void 0===e&&(e={});var r=String(t).match(/^(\w+)\.(\w+)$/);if(!r)throw new Error("[bridge]: invalid method id '"+t+"'");var a=r[1],o=r[2],c=e,u=c.rules,l=void 0===u?[]:u,d=c.type,p=void 0===d?"call":d;return this[a]=this[a]||{},this[a][o]="call"===p?function(t,e){return n.pipeCall({method:o,params:t,callback:e,rules:l})}:function(){var t=s(i.mark((function t(e,r){return i.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",n.pipeEvent({event:o,callback:e,rules:l,once:r}));case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),this},n.pipeCall=function(){var t=s(i.mark((function t(e,n){var r,a,o,s,c,u,l,d,p,f=this;return i.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.method,a=e.params,o=e.callback,s=e.rules,void 0===n&&(n=!0),t.next=4,this.transformConfig(r,a,s);case 4:if(c=t.sent,u=c.realMethod,l=c.realParams,d=c.rule,p=c.env,!n){t.next=13;break}return t.abrupt("return",new Promise((function(t){f.bridge.call(u,l,(function(e){var n=e;d.postprocess&&"function"===typeof d.postprocess&&(n=d.postprocess(e,{params:a,env:p})),"function"===typeof o&&o(n),t(n)}))})));case 13:return t.abrupt("return",this.bridge.call(u,l,(function(t){d.postprocess&&"function"===typeof d.postprocess&&d.postprocess(t,{params:a,env:p})})));case 14:case"end":return t.stop()}}),t,this)})));function e(e,n){return t.apply(this,arguments)}return e}(),n.pipeEvent=function(t){var e=this,n=t.event,r=t.callback,i=t.rules,a=t.once,o=this.transformConfig(n,null,i),s=o.then((function(t){var n=t.realMethod,i=t.rule,o=t.env;function s(t){var e=i.postprocess?i.postprocess(t,o):t;i.postprocess?null!==e&&r(e):r(e)}var c=e.bridge.on(n,s,a);return{realMethod:n,callbackId:c}}));return{remove:function(){var t=this;s.then((function(e){var n=e.realMethod,r=e.callbackId;t.bridge.off(n,r)}))},listener:r}},e}(),U=new G;U.init();var K=[{target:[{hostId:990003,appid:990003,os:"*",version:"0.0.0-",container:"web"}],map:{method:"openConfig"},preprocess:function(t,e){function n(t,e){if(t===e)return 0;var n=t.toString().split("."),r=e.toString().split(".");while(n.length<r.length)n.push("0");while(r.length<n.length)r.push("0");var i=0;while(i<n.length){var a=Number(n[i]),o=Number(r[i]);if(o>a)return-1;if(o<a)return 1;if(o<a)return 0;i+=1}return 0}var r=e||{},i=r.bridge,a=r.env,o=a.version;if(n(o,"10.4.0")<0)return i.trigger("openConfigError",{status_code:-1,status_msg:"涓嶆敮鎸佺殑鎶栭煶瀹㈡埛绔増鏈�"}),{};var s="{}";try{s=JSON.stringify(t.params)}catch(c){}return{config_json:s}}}];function H(t,e){return U.pipeCall({method:"config",params:t,callback:e,rules:K},!0)}var $=[{target:[{hostId:990003,appid:990003,os:"*",version:"10.2.0-",container:"web"}],map:{method:"jumpOpenAuthPage"},preprocess:function(t,e){var n=t.params;return n},postprocess:function(t,e){t=t.data||t;var n=e.params,r=n.success,i=n.error,a=t,o=a.response,s=a.errorCode,c=a.errorMsg,u=o||{},l=u.ticket;l?"function"===typeof r&&r({code:0,msg:"success",ticket:l}):"function"===typeof i&&i({code:s,msg:c,res:t})}}];function q(t,e){return U.pipeCall({method:"jumpOpenAuth",params:t,callback:e,rules:$},!0)}var W=[{target:[{hostId:990003,appid:990003,os:"*",version:"0.0.0-",container:"web"}],map:{method:"openConfigSuccess"}}];function Y(t,e){return U.pipeEvent({event:"ready",callback:t,rules:W,once:e})}var V=[{target:[{hostId:990003,appid:990003,os:"*",version:"0.0.0-",container:"web"}],map:{method:"openConfigError"}}];function X(t,e){return U.pipeEvent({event:"error",callback:t,rules:V,once:e})}var Z=[{target:[{hostId:990003,appid:990003,os:"*",version:"10.8.0-",container:"web"}],map:{method:"showOpenAuth"},preprocess:function(t,e){var n=t.params;return n},postprocess:function(t,e){t=t.data||t;var n=e.params,r=n.success,i=n.error,a=t,o=a.response,s=a.errorCode,c=a.errorMsg,u=o||{},l=u.ticket;l?"function"===typeof r&&r({code:0,msg:"success",ticket:l,response:o}):"function"===typeof i&&i({code:s,msg:c,res:t})}}];function tt(t,e){return U.pipeCall({method:"showOpenAuth",params:t,callback:e,rules:Z},!0)}U.addInternalBridge({config:H,jumpOpenAuth:q,ready:Y,error:X,showOpenAuth:tt});var et=U.register.bind(U),nt={config:H,jumpOpenAuth:q,ready:Y,error:X,showOpenAuth:tt,register:et};e.bridge=B,e.config=H,e.default=nt,e.error=X,e.jumpOpenAuth=q,e.ready=Y,e.register=et,e.showOpenAuth=tt,Object.defineProperty(e,"__esModule",{value:!0})}))}).call(this,n("0de9")["log"])},1545:function(t,e,n){"use strict";var r,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"bangding"},[n("v-uni-view",{staticClass:"bd_item_wrap"},[n("v-uni-view",{staticClass:"bd_item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.dybd.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"text"},[n("v-uni-image",{staticClass:"img1",attrs:{src:"/static/img/douyin.png",mode:""}}),t._v("绑定抖音")],1),n("v-uni-image",{staticClass:"img2",attrs:{src:"/static/img/dybig.png",mode:""}})],1),1==t.dyStatus?n("v-uni-view",{staticClass:"bd_end"},[n("v-uni-image",{attrs:{src:"/static/img/xx.png",mode:""}}),n("v-uni-text",[t._v("大师兄的沙师弟")])],1):t._e()],1),n("v-uni-view",{staticClass:"bd_item_wrap"},[n("v-uni-view",{staticClass:"bd_item"},[n("v-uni-view",{staticClass:"text"},[n("v-uni-image",{staticClass:"img1",attrs:{src:"/static/img/weixin.png",mode:""}}),t._v("绑定微信")],1),n("v-uni-image",{staticClass:"img2",attrs:{src:"/static/img/wxbig.png",mode:""}})],1),1==t.wxStatus?n("v-uni-view",{staticClass:"bd_end"},[n("v-uni-image",{attrs:{src:"/static/img/xx.png",mode:""}}),n("v-uni-text",[t._v("大师兄的沙师弟")])],1):t._e()],1),n("v-uni-view",{staticClass:"bd_item_wrap",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.bdbank.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"bd_item"},[n("v-uni-view",{staticClass:"text"},[n("v-uni-image",{staticClass:"img1",attrs:{src:"/static/img/bank.png",mode:""}}),t._v("绑定银行卡")],1),n("v-uni-image",{staticClass:"img2",attrs:{src:"/static/img/bbig.png",mode:""}})],1),1==t.bankStatus?n("v-uni-view",{staticClass:"bd_end"},[n("v-uni-image",{attrs:{src:"/static/img/bank.png",mode:""}}),n("v-uni-text",[t._v(t._s(t.bankInfo.bankname))]),n("v-uni-text",{staticClass:"text"},[t._v("尾号"+t._s(t.bufen))])],1):t._e()],1)],1)},a=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}))},"291f":function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,".bangding[data-v-191c9816]{padding-top:%?20?%}.bangding .bd_item_wrap[data-v-191c9816]{background-color:#fff;box-shadow:0 0 10px #999;border-radius:%?10?%;width:%?710?%;margin:%?30?% auto}.bangding .bd_item[data-v-191c9816]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;height:%?160?%;box-sizing:border-box}.bangding .bd_item .text[data-v-191c9816]{display:-webkit-box;display:-webkit-flex;display:flex;line-height:%?160?%;font-size:16px;font-weight:550}.bangding .bd_item .text .img1[data-v-191c9816]{width:%?75?%;height:%?75?%;margin:%?40?% %?50?%}.bangding .bd_item .img2[data-v-191c9816]{height:%?160?%;width:%?170?%;border-radius:0 %?10?%}.bangding .bd_end[data-v-191c9816]{border-top:2px solid #999;width:%?670?%;padding:%?15?%;box-sizing:border-box;margin:0 auto;display:-webkit-box;display:-webkit-flex;display:flex;color:grey;font-size:16px;line-height:%?60?%}.bangding .bd_end uni-image[data-v-191c9816]{width:%?60?%;height:%?60?%;border-radius:%?30?%;box-shadow:0 0 10px #999;margin-right:%?20?%}.bangding .bd_end .text[data-v-191c9816]{margin-left:%?30?%}",""]),t.exports=e},34105:function(t,e,n){"use strict";var r=n("5c5e"),i=n.n(r);i.a},"5c5e":function(t,e,n){var r=n("291f");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("4f06").default;i("4e09766a",r,!0,{sourceMap:!1,shadowMode:!1})},"7c50":function(t,e,n){"use strict";n.r(e);var r=n("bb2d"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},b636:function(t,e,n){var r=n("746f");r("asyncIterator")},bb2d:function(t,e,n){"use strict";(function(t){var r=n("ee27");n("4d63"),n("ac1f"),n("25f0"),n("466d"),n("841c"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;r(n("0b47"));var i={data:function(){return{bankStatus:"",bankInfo:{},dyInfo:{},dyStatus:"",wxInfo:{},wxStatus:"",bufen:""}},onShow:function(){t("log",this.getQuery("code")," at pages/my/bangding/bangding.vue:61"),t("log",this.getquery2()," at pages/my/bangding/bangding.vue:62"),this.getData()},onLoad:function(e){t("log","绑定",e.code," at pages/my/bangding/bangding.vue:68")},methods:{getData:function(){var t=this,e=function(e){t.bankStatus=e.bankStatus,t.bufen=e.bankInfo.bankcard.substr(e.bankInfo.bankcard.length-6),t.bankInfo=e.bankInfo,t.dyInfo=e.dyInfo,t.dyStatus=e.dyStatus,t.wxInfo=e.wxInfo,t.wxStatus=e.wxStatus};this.http("index/bindInfo",{},e)},bdbank:function(){0==this.bankStatus&&uni.navigateTo({url:"bdbank/bdbank"})},getQuery:function(e){t("log","getttttttt"," at pages/my/bangding/bangding.vue:94");var n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),r=window.location.search.substr(1).match(n);return null!=r?decodeURIComponent(r[2]):null},getquery2:function(){t("log","2222"," at pages/my/bangding/bangding.vue:106");var e=getCurrentPages(),n=e[e.length-1],r=n.options||n.$route.query;return t("log",r," at pages/my/bangding/bangding.vue:110"),r},dybd:function(){if(1==getApp().globalData.uatype){var e=uni.requireNativePlugin("DouYin-SdkWX"),n="aw25wjzjh2um5pdh";e.initWithKey(n),e.isAppSupportAuthorization((function(n){1==n&&e.authorize({scope:"user_info",state:""},(function(e){t("log",e," at pages/my/bangding/bangding.vue:127")}))}))}else{t("log",r," at pages/my/bangding/bangding.vue:141");var r="http%3A%2F%2Fdz.zz0510.top%2Fh5%2Findex.html%23%2Fpages%2Fmy%2Fbangding%2Fbangding",i="https://open.douyin.com/platform/oauth/connect/?client_key=aw25wjzjh2um5pdh&response_type=code&state=1&scope=user_info&redirect_uri="+r;window.location.href=i}}}};e.default=i}).call(this,n("0de9")["log"])},bb2f:function(t,e,n){var r=n("d039");t.exports=!r((function(){return Object.isExtensible(Object.preventExtensions({}))}))},dca8:function(t,e,n){var r=n("23e7"),i=n("bb2f"),a=n("d039"),o=n("861d"),s=n("f183").onFreeze,c=Object.freeze,u=a((function(){c(1)}));r({target:"Object",stat:!0,forced:u,sham:!i},{freeze:function(t){return c&&o(t)?c(s(t)):t}})},ed8e:function(t,e,n){"use strict";n.r(e);var r=n("1545"),i=n("7c50");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("34105");var o,s=n("f0c5"),c=Object(s["a"])(i["default"],r["b"],r["c"],!1,null,"191c9816",null,!1,r["a"],o);e["default"]=c.exports},f183:function(t,e,n){var r=n("d012"),i=n("861d"),a=n("5135"),o=n("9bf2").f,s=n("90e3"),c=n("bb2f"),u=s("meta"),l=0,d=Object.isExtensible||function(){return!0},p=function(t){o(t,u,{value:{objectID:"O"+ ++l,weakData:{}}})},f=function(t,e){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!a(t,u)){if(!d(t))return"F";if(!e)return"E";p(t)}return t[u].objectID},h=function(t,e){if(!a(t,u)){if(!d(t))return!0;if(!e)return!1;p(t)}return t[u].weakData},g=function(t){return c&&v.REQUIRED&&d(t)&&!a(t,u)&&p(t),t},v=t.exports={REQUIRED:!1,fastKey:f,getWeakData:h,onFreeze:g};r[u]=!0}}]);