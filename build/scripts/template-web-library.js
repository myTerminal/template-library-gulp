!function(e,n){"function"==typeof define&&define.amd?define("templateWebLibrary",["jquery"],n):"object"==typeof exports?module.exports=n(require("jquery")):e.templateWebLibrary=n(e.$)}(this,function(i){"use strict";var t,o,r,f;return t="notification",o="warning",r="error",f=function(e,n,t){i(e).append('<p class="message '+t+'">'+n+"</p>")},{showNotification:function(e,n){f(e,n,t)},showWarning:function(e,n){f(e,n,o)},showError:function(e,n){f(e,n,r)}}});