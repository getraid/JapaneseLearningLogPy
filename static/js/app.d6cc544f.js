(function(t){function e(e){for(var r,s,l=e[0],i=e[1],u=e[2],f=0,p=[];f<l.length;f++)s=l[f],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&p.push(o[s][0]),o[s]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);c&&c(e);while(p.length)p.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,l=1;l<n.length;l++){var i=n[l];0!==o[i]&&(r=!1)}r&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},o={app:0},a=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],i=l.push.bind(l);l.push=e,l=l.slice();for(var u=0;u<l.length;u++)e(l[u]);var c=i;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"56d7":function(t,e,n){"use strict";n.r(e);n("e623"),n("e379"),n("5dc8"),n("37e1");var r=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"defaultFont",attrs:{id:"app"}},[n("StartPage"),t._l(t.output,(function(e,r){return n("div",{key:r},[n("p",[t._v(t._s(e))])])}))],2)},a=[],s=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},l=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("nav",{staticClass:" flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-jlOrange shadow sm:items-baseline w-full"},[r("div",{staticClass:"mb-2 sm:mb-0 flex flex-row"},[r("div",{staticClass:"h-12 w-12 self-center mr-2"},[r("img",{staticClass:"h-12 w-12 self-center",attrs:{src:n("9b19")}})]),r("div",[r("a",{staticClass:"text-2xl no-underline text-jLDark hover:text-blue-dark font-extrabold leading-snug",attrs:{href:"/"}},[t._v("JAPANESE LOG")]),r("p",{staticClass:"text-sm text-grey-dark font-bold"},[t._v(" YOUR PERSONAL DAILY TRACKER ")])])]),r("div",{staticClass:"sm:mb-0 self-center"})]),r("div",{staticClass:"flex flex-row"},[r("p",{staticClass:"description"},[t._v("Hello World")])])])}],i={},u=i,c=n("2877"),f=Object(c["a"])(u,s,l,!1,null,null,null),p=f.exports,d={name:"App",components:{StartPage:p},data:function(){return{output:""}},mounted:function(){var t=this;this.axios.get("/logs").then((function(e){console.log(e.data),t.output=e.data}))}},v=d,b=(n("034f"),Object(c["a"])(v,o,a,!1,null,null,null)),m=b.exports,h=n("bc3a"),x=n.n(h),g=n("2106"),y=n.n(g);n("def6");r["a"].config.productionTip=!1,r["a"].use(y.a,x.a),new r["a"]({render:function(t){return t(m)}}).$mount("#app")},"85ec":function(t,e,n){},"9b19":function(t,e,n){t.exports=n.p+"img/logo.1a32955a.svg"},def6:function(t,e,n){}});
//# sourceMappingURL=app.d6cc544f.js.map