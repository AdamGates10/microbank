(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-75967c3f"],{2909:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function a(t){if(Array.isArray(t))return r(t)}n.d(e,"a",(function(){return f}));n("a4d3"),n("e01a"),n("d3b7"),n("d28b"),n("3ca3"),n("ddb0"),n("a630");function i(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}n("fb6a"),n("b0c0"),n("ac1f"),n("00b4");function o(t,e){if(t){if("string"===typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function f(t){return a(t)||i(t)||o(t)||s()}},"4df4":function(t,e,n){"use strict";var r=n("da84"),a=n("0366"),i=n("c65b"),o=n("7b0b"),s=n("9bdd"),f=n("e95a"),c=n("68ee"),u=n("07fa"),d=n("8418"),l=n("9a1f"),v=n("35a1"),b=r.Array;t.exports=function(t){var e=o(t),n=c(this),r=arguments.length,h=r>1?arguments[1]:void 0,p=void 0!==h;p&&(h=a(h,r>2?arguments[2]:void 0));var g,m,y,x,S,w,_=v(e),k=0;if(!_||this==b&&f(_))for(g=u(e),m=n?new this(g):b(g);g>k;k++)w=p?h(e[k],k):e[k],d(m,k,w);else for(x=l(e,_),S=x.next,m=n?new this:[];!(y=i(S,x)).done;k++)w=p?s(x,h,[y.value,k],!0):y.value,d(m,k,w);return m.length=k,m}},6062:function(t,e,n){"use strict";var r=n("6d61"),a=n("6566");r("Set",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),a)},6566:function(t,e,n){"use strict";var r=n("9bf2").f,a=n("7c73"),i=n("e2cc"),o=n("0366"),s=n("19aa"),f=n("2266"),c=n("7dd0"),u=n("2626"),d=n("83ab"),l=n("f183").fastKey,v=n("69f3"),b=v.set,h=v.getterFor;t.exports={getConstructor:function(t,e,n,c){var u=t((function(t,r){s(t,v),b(t,{type:e,index:a(null),first:void 0,last:void 0,size:0}),d||(t.size=0),void 0!=r&&f(r,t[c],{that:t,AS_ENTRIES:n})})),v=u.prototype,p=h(e),g=function(t,e,n){var r,a,i=p(t),o=m(t,e);return o?o.value=n:(i.last=o={index:a=l(e,!0),key:e,value:n,previous:r=i.last,next:void 0,removed:!1},i.first||(i.first=o),r&&(r.next=o),d?i.size++:t.size++,"F"!==a&&(i.index[a]=o)),t},m=function(t,e){var n,r=p(t),a=l(e);if("F"!==a)return r.index[a];for(n=r.first;n;n=n.next)if(n.key==e)return n};return i(v,{clear:function(){var t=this,e=p(t),n=e.index,r=e.first;while(r)r.removed=!0,r.previous&&(r.previous=r.previous.next=void 0),delete n[r.index],r=r.next;e.first=e.last=void 0,d?e.size=0:t.size=0},delete:function(t){var e=this,n=p(e),r=m(e,t);if(r){var a=r.next,i=r.previous;delete n.index[r.index],r.removed=!0,i&&(i.next=a),a&&(a.previous=i),n.first==r&&(n.first=a),n.last==r&&(n.last=i),d?n.size--:e.size--}return!!r},forEach:function(t){var e,n=p(this),r=o(t,arguments.length>1?arguments[1]:void 0);while(e=e?e.next:n.first){r(e.value,e.key,this);while(e&&e.removed)e=e.previous}},has:function(t){return!!m(this,t)}}),i(v,n?{get:function(t){var e=m(this,t);return e&&e.value},set:function(t,e){return g(this,0===t?0:t,e)}}:{add:function(t){return g(this,t=0===t?0:t,t)}}),d&&r(v,"size",{get:function(){return p(this).size}}),u},setStrong:function(t,e,n){var r=e+" Iterator",a=h(e),i=h(r);c(t,e,(function(t,e){b(this,{type:r,target:t,state:a(t),kind:e,last:void 0})}),(function(){var t=i(this),e=t.kind,n=t.last;while(n&&n.removed)n=n.previous;return t.target&&(t.last=n=n?n.next:t.state.first)?"keys"==e?{value:n.key,done:!1}:"values"==e?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),n?"entries":"values",!n,!0),u(e)}}},6724:function(t,e,n){},"6d61":function(t,e,n){"use strict";var r=n("23e7"),a=n("da84"),i=n("e330"),o=n("94ca"),s=n("6eeb"),f=n("f183"),c=n("2266"),u=n("19aa"),d=n("1626"),l=n("861d"),v=n("d039"),b=n("1c7e"),h=n("d44e"),p=n("7156");t.exports=function(t,e,n){var g=-1!==t.indexOf("Map"),m=-1!==t.indexOf("Weak"),y=g?"set":"add",x=a[t],S=x&&x.prototype,w=x,_={},k=function(t){var e=i(S[t]);s(S,t,"add"==t?function(t){return e(this,0===t?0:t),this}:"delete"==t?function(t){return!(m&&!l(t))&&e(this,0===t?0:t)}:"get"==t?function(t){return m&&!l(t)?void 0:e(this,0===t?0:t)}:"has"==t?function(t){return!(m&&!l(t))&&e(this,0===t?0:t)}:function(t,n){return e(this,0===t?0:t,n),this})},j=o(t,!d(x)||!(m||S.forEach&&!v((function(){(new x).entries().next()}))));if(j)w=n.getConstructor(e,t,g,y),f.enable();else if(o(t,!0)){var A=new w,O=A[y](m?{}:-0,1)!=A,E=v((function(){A.has(1)})),I=b((function(t){new x(t)})),C=!m&&v((function(){var t=new x,e=5;while(e--)t[y](e,e);return!t.has(-0)}));I||(w=e((function(t,e){u(t,S);var n=p(new x,t,w);return void 0!=e&&c(e,n[y],{that:n,AS_ENTRIES:g}),n})),w.prototype=S,S.constructor=w),(E||C)&&(k("delete"),k("has"),g&&k("get")),(C||O)&&k(y),m&&S.clear&&delete S.clear}return _[t]=w,r({global:!0,forced:w!=x},_),h(w,t),m||n.setStrong(w,t,g),w}},"99af":function(t,e,n){"use strict";var r=n("23e7"),a=n("da84"),i=n("d039"),o=n("e8b5"),s=n("861d"),f=n("7b0b"),c=n("07fa"),u=n("8418"),d=n("65f0"),l=n("1dde"),v=n("b622"),b=n("2d00"),h=v("isConcatSpreadable"),p=9007199254740991,g="Maximum allowed index exceeded",m=a.TypeError,y=b>=51||!i((function(){var t=[];return t[h]=!1,t.concat()[0]!==t})),x=l("concat"),S=function(t){if(!s(t))return!1;var e=t[h];return void 0!==e?!!e:o(t)},w=!y||!x;r({target:"Array",proto:!0,forced:w},{concat:function(t){var e,n,r,a,i,o=f(this),s=d(o,0),l=0;for(e=-1,r=arguments.length;e<r;e++)if(i=-1===e?o:arguments[e],S(i)){if(a=c(i),l+a>p)throw m(g);for(n=0;n<a;n++,l++)n in i&&u(s,l,i[n])}else{if(l>=p)throw m(g);u(s,l++,i)}return s.length=l,s}})},"9bdd":function(t,e,n){var r=n("825a"),a=n("2a62");t.exports=function(t,e,n,i){try{return i?e(r(n)[0],n[1]):e(n)}catch(o){a(t,"throw",o)}}},a630:function(t,e,n){var r=n("23e7"),a=n("4df4"),i=n("1c7e"),o=!i((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:o},{from:a})},b2cf:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"text-uppercase grey--text"},[t._t("header"),t._v(" "),t._t("default")],2)},a=[],i=n("2877"),o={},s=Object(i["a"])(o,r,a,!1,null,null,null);e["a"]=s.exports},bb2f:function(t,e,n){var r=n("d039");t.exports=!r((function(){return Object.isExtensible(Object.preventExtensions({}))}))},d28b:function(t,e,n){var r=n("746f");r("iterator")},d5f5:function(t,e,n){"use strict";n("6724")},dd11:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{fluid:""}},[n("PageHeader",[n("span",{staticClass:"font-weight-bold",attrs:{slot:"header"},slot:"header"},[t._v("STAFF ")]),t._v(" LIST ")]),n("v-row",[n("v-col",[n("v-btn",{staticClass:"ma-2 font-weight-bold",attrs:{color:"primary"},on:{click:t.addStaffBtn}},[t._v(" CREATE NEW STAFF ")])],1)],1),n("v-row",[n("v-col",[n("v-data-table",{staticClass:"elevation-2",attrs:{"fixed-header":"",headers:t.headers,items:t.items,loading:t.isLoaded,"item-key":"id","disable-pagination":"","hide-default-footer":""},scopedSlots:t._u([{key:"no-data",fn:function(){return[n("span",{staticClass:"subheading font-weight-bold"},[t._v("Not available")])]},proxy:!0},{key:"item.contact",fn:function(e){var r=e.item;return[t._v(" "+t._s(r.mobile_number_1)+" "),r.mobile_number_2?n("span",[t._v(" "+t._s(r.mobile_number_2)+" ")]):t._e()]}}])}),t.getters_staff.length?n("v-card",{directives:[{name:"intersect",rawName:"v-intersect",value:t.intersected,expression:"intersected"}]},[t.loadingScroll?n("v-progress-linear",{attrs:{indeterminate:!0}}):t._e()],1):t._e()],1)],1),n("v-navigation-drawer",{staticClass:"shadow",attrs:{clipped:"","overlay-color":"black",fixed:"",permanent:t.addStaff,right:"",width:"40%"},model:{value:t.addStaff,callback:function(e){t.addStaff=e},expression:"addStaff"}},[n("div",{staticClass:"mt-15 d-flex justify-space-between"},[n("v-spacer"),n("v-btn",{staticClass:"ma-2",attrs:{icon:"",to:"/user_management/stafflist"},on:{click:function(e){t.addStaff=!t.addStaff}}},[n("v-icon",[t._v("mdi-close-circle")])],1)],1),t.addStaff?n("AddStaff"):t._e()],1)],1)},a=[],i=n("5530"),o=n("2909"),s=(n("d3b7"),n("b0c0"),n("6062"),n("3ca3"),n("ddb0"),n("99af"),n("ac1f"),n("5319"),n("b2cf")),f=n("b53c"),c=n("ed09"),u=n("8d7e"),d={components:{PageHeader:s["a"],AddStaff:f["default"]},setup:function(t,e){var n=Object(c["h"])({openStaff:!1,addStaff:!1,isIntersecting:!1,items:[],isLoaded:!0,headers:[{text:"STAFF",value:"name",sortable:!0},{text:"EMAIL",value:"email",sortable:!0},{text:"MOBILE NUMBER(S)",value:"contact",sortable:!0}],page:1,loadingScroll:!1}),r=Object(u["a"])(["staffList"]),a=r.staffList,s=Object(u["b"])(["getters_staff","getters_staff_meta"]),f=s.getters_staff,d=s.getters_staff_meta,l=Object(c["j"])(n),v=l.page,b=l.isIntersecting,h=l.loadingScroll,p=l.isLoaded,g=l.items,m=l.addStaff,y=l.openStaff;a(v.value).then((function(){switch(p.value=!1,g.value=f.value,e.root.$route.name){case"AddStaff":y.value=!0;break;default:break}})).finally((function(){setTimeout((function(){switch(e.root.$route.name){case"AddStaff":m.value=!0;break;default:break}}))}));var x=function(t){b.value=t[0].isIntersecting,b.value?d.value.current_page>=d.value.last_page?h.value=!1:(v.value++,a(v.value).then((function(){h.value=!1,g.value=Object(o["a"])(new Set([].concat(Object(o["a"])(f.value),Object(o["a"])(g.value))))}))):h.value=!0},S=function(){m.value=!0,e.root._router.replace({path:"/user_management/stafflist/:/addstaff"})};return Object(i["a"])(Object(i["a"])({},Object(c["j"])(n)),{},{intersected:x,getters_staff:f,items:g,addStaffBtn:S})}},l=d,v=(n("d5f5"),n("2877")),b=Object(v["a"])(l,r,a,!1,null,"408cdce9",null);e["default"]=b.exports},e01a:function(t,e,n){"use strict";var r=n("23e7"),a=n("83ab"),i=n("da84"),o=n("e330"),s=n("1a2d"),f=n("1626"),c=n("3a9b"),u=n("577e"),d=n("9bf2").f,l=n("e893"),v=i.Symbol,b=v&&v.prototype;if(a&&f(v)&&(!("description"in b)||void 0!==v().description)){var h={},p=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:u(arguments[0]),e=c(b,this)?new v(t):void 0===t?v():v(t);return""===t&&(h[e]=!0),e};l(p,v),p.prototype=b,b.constructor=p;var g="Symbol(test)"==String(v("test")),m=o(b.toString),y=o(b.valueOf),x=/^Symbol\((.*)\)[^)]+$/,S=o("".replace),w=o("".slice);d(b,"description",{configurable:!0,get:function(){var t=y(this),e=m(t);if(s(h,t))return"";var n=g?w(e,7,-1):S(e,x,"$1");return""===n?void 0:n}}),r({global:!0,forced:!0},{Symbol:p})}},f183:function(t,e,n){var r=n("23e7"),a=n("e330"),i=n("d012"),o=n("861d"),s=n("1a2d"),f=n("9bf2").f,c=n("241c"),u=n("057f"),d=n("90e3"),l=n("bb2f"),v=!1,b=d("meta"),h=0,p=Object.isExtensible||function(){return!0},g=function(t){f(t,b,{value:{objectID:"O"+h++,weakData:{}}})},m=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!s(t,b)){if(!p(t))return"F";if(!e)return"E";g(t)}return t[b].objectID},y=function(t,e){if(!s(t,b)){if(!p(t))return!0;if(!e)return!1;g(t)}return t[b].weakData},x=function(t){return l&&v&&p(t)&&!s(t,b)&&g(t),t},S=function(){w.enable=function(){},v=!0;var t=c.f,e=a([].splice),n={};n[b]=1,t(n).length&&(c.f=function(n){for(var r=t(n),a=0,i=r.length;a<i;a++)if(r[a]===b){e(r,a,1);break}return r},r({target:"Object",stat:!0,forced:!0},{getOwnPropertyNames:u.f}))},w=t.exports={enable:S,fastKey:m,getWeakData:y,onFreeze:x};i[b]=!0},fb6a:function(t,e,n){"use strict";var r=n("23e7"),a=n("da84"),i=n("e8b5"),o=n("68ee"),s=n("861d"),f=n("23cb"),c=n("07fa"),u=n("fc6a"),d=n("8418"),l=n("b622"),v=n("1dde"),b=n("f36a"),h=v("slice"),p=l("species"),g=a.Array,m=Math.max;r({target:"Array",proto:!0,forced:!h},{slice:function(t,e){var n,r,a,l=u(this),v=c(l),h=f(t,v),y=f(void 0===e?v:e,v);if(i(l)&&(n=l.constructor,o(n)&&(n===g||i(n.prototype))?n=void 0:s(n)&&(n=n[p],null===n&&(n=void 0)),n===g||void 0===n))return b(l,h,y);for(r=new(void 0===n?g:n)(m(y-h,0)),a=0;h<y;h++,a++)h in l&&d(r,a,l[h]);return r.length=a,r}})}}]);
//# sourceMappingURL=chunk-75967c3f.bae3d418.js.map