"use strict";angular.module("directive.g+signin",[]).directive("googlePlusSignin",function(){var e=/\.apps\.googleusercontent\.com$/;return{restrict:"E",template:'<span class="g-signin"></span>',replace:!0,link:function(t,n,o){o.clientid+=e.test(o.clientid)?"":".apps.googleusercontent.com",o.$set("data-clientid",o.clientid);var i={callback:"signinCallback",cookiepolicy:"single_host_origin",requestvisibleactions:"http://schemas.google.com/AddActivity",scope:"https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar https://www.google.com/m8/feeds",width:"wide"};angular.forEach(Object.getOwnPropertyNames(i),function(e){o.hasOwnProperty(e)||o.$set("data-"+e,i[e])}),o.$observe("language",function(e){window.___gcfg={lang:e?e:"en"}}),function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://apis.google.com/js/client:plusone.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}()}}}).run(["$window","$rootScope",function(e,t){e.signinCallback=function(e){e&&e.access_token?t.$broadcast("event:google-plus-signin-success",e):t.$broadcast("event:google-plus-signin-failure",e)}}]);