(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-773a9cd6"],{"126e":function(e,t,a){"use strict";var r=void 0,n=function(e){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;return function(){for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];clearTimeout(t),t=setTimeout((function(){e.apply(r,i)}),a)}};t["a"]=n},"2b6f":function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-snackbar",{attrs:{bottom:"",absolute:"",transition:"slide-y-transition",elevation:"1",color:e.color,width:"440"},scopedSlots:e._u([{key:"action",fn:function(t){var r=t.attrs;return[a("v-btn",e._b({attrs:{icon:""},on:{click:function(t){e.response=!1}}},"v-btn",r,!1),[a("v-icon",[e._v("mdi-close-circle")])],1)]}}]),model:{value:e.response,callback:function(t){e.response=t},expression:"response"}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{staticClass:"d-flex justify-center px-0",attrs:{cols:"2"}},[a("v-icon",{attrs:{"x-large":""}},[e._t("icon")],2)],1),a("v-col",[a("div",{staticClass:"title"},[a("strong",[e._t("header")],2)]),a("div",{staticClass:"body-2"},[e._t("body")],2),a("div",{staticClass:"body-2"},[e._t("body1")],2)])],1)],1)},n=[],i=a("ed09"),s=Object(i["c"])({setup:function(){var e=Object(i["i"])(!0),t=Object(i["e"])("color");return{response:e,color:t}}}),l=s,o=a("2877"),u=Object(o["a"])(l,r,n,!1,null,null,null);t["a"]=u.exports},4724:function(e,t,a){"use strict";a("cabe")},"4c93":function(e,t,a){"use strict";a.d(t,"a",(function(){return u})),a.d(t,"b",(function(){return v})),a.d(t,"c",(function(){return b})),a.d(t,"d",(function(){return _})),a.d(t,"e",(function(){return y})),a.d(t,"f",(function(){return O})),a.d(t,"g",(function(){return Z})),a.d(t,"h",(function(){return S})),a.d(t,"i",(function(){return E})),a.d(t,"j",(function(){return P})),a.d(t,"k",(function(){return z})),a.d(t,"l",(function(){return U}));
/**
  * vee-validate v3.4.13
  * (c) 2021 Abdelrahman Awad
  * @license MIT
  */
var r={en:/^[A-Z]*$/i,cs:/^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]*$/i,da:/^[A-ZÆØÅ]*$/i,de:/^[A-ZÄÖÜß]*$/i,es:/^[A-ZÁÉÍÑÓÚÜ]*$/i,fa:/^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰپژگچکی]*$/,fr:/^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]*$/i,it:/^[A-Z\xC0-\xFF]*$/i,lt:/^[A-ZĄČĘĖĮŠŲŪŽ]*$/i,nl:/^[A-ZÉËÏÓÖÜ]*$/i,hu:/^[A-ZÁÉÍÓÖŐÚÜŰ]*$/i,pl:/^[A-ZĄĆĘŚŁŃÓŻŹ]*$/i,pt:/^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]*$/i,ro:/^[A-ZĂÂÎŞŢ]*$/i,ru:/^[А-ЯЁ]*$/i,sk:/^[A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ]*$/i,sr:/^[A-ZČĆŽŠĐ]*$/i,sv:/^[A-ZÅÄÖ]*$/i,tr:/^[A-ZÇĞİıÖŞÜ]*$/i,uk:/^[А-ЩЬЮЯЄІЇҐ]*$/i,ar:/^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]*$/,az:/^[A-ZÇƏĞİıÖŞÜ]*$/i,el:/^[Α-ώ]*$/i,ja:/^[A-Z\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF]*$/i,he:/^[A-Z\u05D0-\u05EA']*$/i},n={en:/^[A-Z\s]*$/i,cs:/^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ\s]*$/i,da:/^[A-ZÆØÅ\s]*$/i,de:/^[A-ZÄÖÜß\s]*$/i,es:/^[A-ZÁÉÍÑÓÚÜ\s]*$/i,fa:/^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰپژگچکی]*$/,fr:/^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ\s]*$/i,it:/^[A-Z\xC0-\xFF\s]*$/i,lt:/^[A-ZĄČĘĖĮŠŲŪŽ\s]*$/i,nl:/^[A-ZÉËÏÓÖÜ\s]*$/i,hu:/^[A-ZÁÉÍÓÖŐÚÜŰ\s]*$/i,pl:/^[A-ZĄĆĘŚŁŃÓŻŹ\s]*$/i,pt:/^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ\s]*$/i,ro:/^[A-ZĂÂÎŞŢ\s]*$/i,ru:/^[А-ЯЁ\s]*$/i,sk:/^[A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ\s]*$/i,sr:/^[A-ZČĆŽŠĐ\s]*$/i,sv:/^[A-ZÅÄÖ\s]*$/i,tr:/^[A-ZÇĞİıÖŞÜ\s]*$/i,uk:/^[А-ЩЬЮЯЄІЇҐ\s]*$/i,ar:/^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ\s]*$/,az:/^[A-ZÇƏĞİıÖŞÜ\s]*$/i,el:/^[Α-ώ\s]*$/i,ja:/^[A-Z\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF\s]*$/i,he:/^[A-Z\u05D0-\u05EA'\s]*$/i},i={en:/^[0-9A-Z]*$/i,cs:/^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]*$/i,da:/^[0-9A-ZÆØÅ]$/i,de:/^[0-9A-ZÄÖÜß]*$/i,es:/^[0-9A-ZÁÉÍÑÓÚÜ]*$/i,fa:/^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰپژگچکی]*$/,fr:/^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]*$/i,it:/^[0-9A-Z\xC0-\xFF]*$/i,lt:/^[0-9A-ZĄČĘĖĮŠŲŪŽ]*$/i,hu:/^[0-9A-ZÁÉÍÓÖŐÚÜŰ]*$/i,nl:/^[0-9A-ZÉËÏÓÖÜ]*$/i,pl:/^[0-9A-ZĄĆĘŚŁŃÓŻŹ]*$/i,pt:/^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]*$/i,ro:/^[0-9A-ZĂÂÎŞŢ]*$/i,ru:/^[0-9А-ЯЁ]*$/i,sk:/^[0-9A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ]*$/i,sr:/^[0-9A-ZČĆŽŠĐ]*$/i,sv:/^[0-9A-ZÅÄÖ]*$/i,tr:/^[0-9A-ZÇĞİıÖŞÜ]*$/i,uk:/^[0-9А-ЩЬЮЯЄІЇҐ]*$/i,ar:/^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]*$/,az:/^[0-9A-ZÇƏĞİıÖŞÜ]*$/i,el:/^[0-9Α-ώ]*$/i,ja:/^[0-9A-Z\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF]*$/i,he:/^[0-9A-Z\u05D0-\u05EA']*$/i},s={en:/^[0-9A-Z_-]*$/i,cs:/^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ_-]*$/i,da:/^[0-9A-ZÆØÅ_-]*$/i,de:/^[0-9A-ZÄÖÜß_-]*$/i,es:/^[0-9A-ZÁÉÍÑÓÚÜ_-]*$/i,fa:/^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰپژگچکی]*$/,fr:/^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ_-]*$/i,it:/^[0-9A-Z\xC0-\xFF_-]*$/i,lt:/^[0-9A-ZĄČĘĖĮŠŲŪŽ_-]*$/i,nl:/^[0-9A-ZÉËÏÓÖÜ_-]*$/i,hu:/^[0-9A-ZÁÉÍÓÖŐÚÜŰ_-]*$/i,pl:/^[0-9A-ZĄĆĘŚŁŃÓŻŹ_-]*$/i,pt:/^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ_-]*$/i,ro:/^[0-9A-ZĂÂÎŞŢ_-]*$/i,ru:/^[0-9А-ЯЁ_-]*$/i,sk:/^[0-9A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ_-]*$/i,sr:/^[0-9A-ZČĆŽŠĐ_-]*$/i,sv:/^[0-9A-ZÅÄÖ_-]*$/i,tr:/^[0-9A-ZÇĞİıÖŞÜ_-]*$/i,uk:/^[0-9А-ЩЬЮЯЄІЇҐ_-]*$/i,ar:/^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ_-]*$/,az:/^[0-9A-ZÇƏĞİıÖŞÜ_-]*$/i,el:/^[0-9Α-ώ_-]*$/i,ja:/^[0-9A-Z\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF_-]*$/i,he:/^[0-9A-Z\u05D0-\u05EA'_-]*$/i},l=function(e,t){var a=(void 0===t?{}:t).locale,n=void 0===a?"":a;return Array.isArray(e)?e.every((function(e){return l(e,{locale:n})})):n?(r[n]||r.en).test(e):Object.keys(r).some((function(t){return r[t].test(e)}))},o=[{name:"locale"}],u={validate:l,params:o},c=function(e,t){var a=(void 0===t?{}:t).locale,r=void 0===a?"":a;return Array.isArray(e)?e.every((function(e){return c(e,{locale:r})})):r?(s[r]||s.en).test(e):Object.keys(s).some((function(t){return s[t].test(e)}))},d=[{name:"locale"}],v={validate:c,params:d},f=function(e,t){var a=(void 0===t?{}:t).locale,r=void 0===a?"":a;return Array.isArray(e)?e.every((function(e){return f(e,{locale:r})})):r?(i[r]||i.en).test(e):Object.keys(i).some((function(t){return i[t].test(e)}))},m=[{name:"locale"}],b={validate:f,params:m},p=function(e,t){var a=(void 0===t?{}:t).locale,r=void 0===a?"":a;return Array.isArray(e)?e.every((function(e){return p(e,{locale:r})})):r?(n[r]||n.en).test(e):Object.keys(n).some((function(t){return n[t].test(e)}))},g=[{name:"locale"}],_={validate:p,params:g},h=function(e,t){var a=t.length;if(Array.isArray(e))return e.every((function(e){return h(e,{length:a})}));var r=String(e);return/^[0-9]*$/.test(r)&&r.length===a},k=[{name:"length",cast:function(e){return Number(e)}}],y={validate:h,params:k},A=function(e,t){var a=(void 0===t?{}:t).multiple,r=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return a&&!Array.isArray(e)&&(e=String(e).split(",").map((function(e){return e.trim()}))),Array.isArray(e)?e.every((function(e){return r.test(String(e))})):r.test(String(e))},j=[{name:"multiple",default:!1}],O={validate:A,params:j};function x(e){return null===e||void 0===e}function $(e){return Array.isArray(e)&&0===e.length}var w=function(e,t){var a=new RegExp(".("+t.join("|")+")$","i");return Array.isArray(e)?e.every((function(e){return a.test(e.name)})):a.test(e.name)},Z={validate:w},F=function(e,t){var a=t.length;return!x(e)&&(Array.isArray(e)?e.every((function(e){return F(e,{length:a})})):String(e).length>=a)},N=[{name:"length",cast:function(e){return Number(e)}}],S={validate:F,params:N},D=function(e,t){var a=t.min;return!x(e)&&""!==e&&(Array.isArray(e)?e.length>0&&e.every((function(e){return D(e,{min:a})})):Number(e)>=a)},C=[{name:"min",cast:function(e){return Number(e)}}],E={validate:D,params:C},R=/^[٠١٢٣٤٥٦٧٨٩]+$/,q=/^[0-9]+$/,M=function(e){var t=function(e){var t=String(e);return q.test(t)||R.test(t)};return Array.isArray(e)?e.every(t):t(e)},P={validate:M},I=function(e,t){var a=t.regex;return Array.isArray(e)?e.every((function(e){return I(e,{regex:a})})):a.test(String(e))},L=[{name:"regex",cast:function(e){return"string"===typeof e?new RegExp(e):e}}],z={validate:I,params:L},K=function(e,t){var a=(void 0===t?{allowFalse:!0}:t).allowFalse,r={valid:!1,required:!0};return x(e)||$(e)?r:!1!==e||a?(r.valid=!!String(e).trim().length,r):r},B=!0,T=[{name:"allowFalse",default:!0}],U={validate:K,params:T,computesRequired:B}},5103:function(e,t,a){},"68fa":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{fluid:""}},[a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12",lg:"3"}},[a("div",{staticStyle:{position:"sticky",top:"65px"}},[a("v-item-group",{staticClass:"shrink",attrs:{mandatory:"",tag:"v-flex"},model:{value:e.curr,callback:function(t){e.curr=t},expression:"curr"}},e._l(e.steps,(function(t,r){return a("v-item",{key:r,scopedSlots:e._u([{key:"default",fn:function(n){var i=n.active,s=n.toggle;return[a("div",[a("v-btn",{staticClass:"mb-3 white--text d-flex justify-space-between",class:{"font-weight-bold":i,red:i&&!t.valid,grey:e.curr===r&&t.valid,success:e.curr>r},staticStyle:{width:"100%"},attrs:{depressed:"",disabled:e.curr<r},on:{click:s}},[a("div",[e._v(e._s(t.name))]),a("v-scroll-x-transition",[e.curr>r?a("v-icon",[e._v(" mdi-check ")]):i&&!t.valid?a("v-icon",[e._v(" mdi-alert-decagram-outline ")]):e._e()],1)],1)],1)]}}],null,!0)})})),1)],1)]),a("v-col",{attrs:{cols:"12",lg:"9"}},[a("v-window",{attrs:{flat:""},model:{value:e.curr,callback:function(t){e.curr=t},expression:"curr"}},[e._l(e.steps,(function(t,r){return[a("v-window-item",{key:r+"content",attrs:{step:r}},[a("keep-alive",[a(t.componentname,{key:e.reset,tag:"component",on:{page:e.data,goto:e.goto,send:e.send}})],1),a("span",[e.curr>0?a("v-btn",{staticClass:"ml-4",attrs:{text:""},on:{click:function(t){e.curr=r-1}}},[e._v(" Back ")]):e._e()],1)],1)]}))],2)],1)],1),a("v-row",[a("v-col",[a("v-overlay",{attrs:{absolute:!e.absolute,value:e.overlay}},[a("v-progress-circular",{attrs:{value:e.progress,rotate:360,size:100,width:15}},[e._v(" "+e._s(e.progress+"%")+" ")])],1)],1)],1),e.actionResponse?a("Response",{scopedSlots:e._u([{key:"header",fn:function(){return[e._v(e._s(e.msgHeader))]},proxy:!0},{key:"body",fn:function(){return[e._v(e._s(e.msgBody))]},proxy:!0},{key:"icon",fn:function(){return[e._v(e._s(e.msgIcon))]},proxy:!0}],null,!1,916177833)}):e._e()],1)},n=[],i=a("5530"),s=(a("b0c0"),a("e9c4"),a("d3b7"),a("159b"),a("b2cf")),l=a("ed09"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",{staticClass:"pa-4",attrs:{outlined:""}},[a("validation-observer",{ref:"observer"},[a("v-form",{ref:"form1",on:{submit:function(e){e.preventDefault()}}},[a("v-row",[a("v-col",{attrs:{cols:"12",lg:"6"}},[a("v-hover",{staticStyle:{cursor:"pointer !important"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.hover;return[a("v-card",{staticClass:"mt-0",class:{"on-hover":r,shake:e.invalidImage},attrs:{elevation:r?4:1},on:{click:e.triggerUpload}},[a("input",{ref:"uploader",staticClass:"d-none",attrs:{type:"file",accept:"image/*"},on:{change:e.uploadImage}}),a("v-img",{attrs:{"aspect-ratio":"1.23",contain:"",src:e.image}},[a("v-row",{staticClass:"fill-height flex-column",attrs:{align:"center",justify:"center"}},[e.image?e._e():a("p",{staticClass:"title text-center px-4 text-wrap",class:{"show-btns":r}},[e._v(" CLICK TO ADD PROFILE PICTURE ")])])],1)],1)]}}])})],1),a("v-col",{attrs:{cols:"12",lg:"6"}},[a("v-row",[a("v-col",{attrs:{cols:"12",lg:"12"}},[a("validation-provider",{attrs:{name:"Agent Name",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("v-autocomplete",{attrs:{"hide-details":"auto",label:"Agent Name",outlined:"",items:e.getters_single_staff,"item-text":"name",loading:e.isLoaded,"item-value":"id","error-messages":r,required:""},on:{keyup:e.searchStaffBtn},model:{value:e.staffId,callback:function(t){e.staffId=t},expression:"staffId"}})]}}])})],1),a("v-col",{attrs:{cols:"12",lg:"12"}},[a("validation-provider",{attrs:{name:"Other Names",rules:"required|alpha_spaces"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("v-text-field",{attrs:{"hide-details":"auto",label:"Other Names",outlined:"","error-messages":r,required:""},model:{value:e.othernames,callback:function(t){e.othernames=t},expression:"othernames"}})]}}])})],1),a("v-col",{attrs:{cols:"12",lg:"12"}},[a("validation-provider",{attrs:{name:"Last Names  ",rules:{required:!0,regex:/[a-zA-Z]([\w\W -]*[a-zA-Z])?$/}},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("v-text-field",{attrs:{"hide-details":"auto",label:"Last Name","error-messages":r,required:"",outlined:""},model:{value:e.lastname,callback:function(t){e.lastname=t},expression:"lastname"}})]}}])})],1),a("v-col",{attrs:{cols:"12",lg:"12"}},[a("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,n=t.attrs;return[a("validation-provider",{attrs:{name:"Date of birth",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.errors;return[a("v-text-field",e._g(e._b({attrs:{label:"Date of Birth",readonly:"",outlined:"","hide-details":"auto","error-messages":i},model:{value:e.dob,callback:function(t){e.dob=t},expression:"dob"}},"v-text-field",n,!1),r))]}}],null,!0)})]}}]),model:{value:e.menu,callback:function(t){e.menu=t},expression:"menu"}},[a("v-date-picker",{on:{input:function(t){e.menu=!1}},model:{value:e.dob,callback:function(t){e.dob=t},expression:"dob"}})],1)],1),a("v-col",[a("validation-provider",{attrs:{name:"Address",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("v-text-field",{attrs:{label:"Personal Postal Address",outlined:"","error-messages":r,"hide-details":"auto"},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}})]}}])})],1),a("v-col",{attrs:{cols:"12",lg:"12"}},[a("validation-provider",{attrs:{name:"Personal Email",rules:"required|email"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("v-text-field",{attrs:{"hide-details":"auto",label:"Personal Email","error-messages":r,outlined:""},model:{value:e.personEmail,callback:function(t){e.personEmail=t},expression:"personEmail"}})]}}])})],1),a("v-col",{attrs:{cols:"12",lg:"12"}},[a("validation-provider",{attrs:{name:"Mobile number",rules:{required:!0,digits:10,regex:"^(0)\\d{9}$"}},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("v-text-field",{attrs:{"hide-details":"auto",outlined:"",label:"Mobile Number","error-messages":r,required:""},model:{value:e.mobileNumber,callback:function(t){e.mobileNumber=t},expression:"mobileNumber"}})]}}])})],1),a("v-col",{attrs:{cols:"12",lg:"12"}},[a("validation-provider",{attrs:{name:"Mobile number 2",rules:{regex:e.mobileNumber2?"^(0)\\d{9}$":""}},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("v-text-field",{attrs:{"hide-details":"auto",label:"Mobile number 2 (optional)","error-messages":r,outlined:""},model:{value:e.mobileNumber2,callback:function(t){e.mobileNumber2=t},expression:"mobileNumber2"}})]}}])})],1)],1)],1)],1),a("v-row",{staticClass:"mt-3"},[a("v-col",[a("v-btn",{attrs:{type:"submit",color:"primary"},on:{click:e.sendData}},[e._v(" Continue ")])],1)],1)],1)],1)],1)},u=[],c=a("1da1"),d=(a("96cf"),a("ac1f"),a("466d"),a("4c93")),v=a("7bb1"),f=a("8d7e"),m=a("126e");Object(v["d"])("eager"),Object(v["c"])("digits",Object(i["a"])(Object(i["a"])({},d["e"]),{},{message:"{_field_} needs to be {length} digits starting with zero(0). "})),Object(v["c"])("required",Object(i["a"])(Object(i["a"])({},d["l"]),{},{message:"{_field_} can not be empty"})),Object(v["c"])("email",Object(i["a"])(Object(i["a"])({},d["f"]),{},{message:"{_field_} is not valid"})),Object(v["c"])("alpha",Object(i["a"])(Object(i["a"])({},d["a"]),{},{message:"{_field_} can only accepts alphabets"})),Object(v["c"])("alpha_spaces",Object(i["a"])(Object(i["a"])({},d["d"]),{},{message:"{_field_} can only accepts alphabets"})),Object(v["c"])("regex",Object(i["a"])(Object(i["a"])({},d["k"]),{},{message:"{_field_}  not a valid name"}));var b=Object(l["c"])({setup:function(e,t){var a=Object(f["a"])(["searchStaff"]),r=a.searchStaff,n=Object(f["b"])(["getters_single_staff"]),s=n.getters_single_staff,o=Object(l["h"])({observer:null,othernames:null,lastname:null,personEmail:null,title:null,mobileNumber:null,mobileNumber2:null,select:null,address:null,gender:null,titleArray:["Mr.","Mrs.","Miss.","Dr.","Prof."],genderArray:["Male","Female"],hometown:null,dob:null,valid:!0,nationality:"",transparent:"rgba(255, 255, 255, 0)",image:null,uploader:null,menu:!1,profilePicture:null,error:!1,sheet:!1,invalidImage:!1,staffId:null,isLoaded:!1}),u=Object(l["j"])(o),d=u.staffId,v=u.isLoaded,b=u.invalidImage,p=u.observer,g=u.uploader,_=u.image,h=u.title,k=u.gender,y=u.othernames,A=u.lastname,j=u.dob,O=u.profilePicture,x=u.error,$=u.personEmail,w=u.mobileNumber,Z=u.mobileNumber2,F=u.address;Object(l["k"])((function(){return h.value}),(function(e){switch(e){case"Miss.":k.value="Female";break;case"Mr.":k.value="Male";break;case"Mrs.":k.value="Female";break;default:k.value=null;break}}));var N=function(e){if(b.value=!1,O.value=e.target.files[0],!O.value.type.match("image/*"))return _.value=null,setTimeout((function(){return b.value=!0}),100);var t=new FileReader;t.readAsDataURL(O.value),t.onload=function(e){_.value=e.target.result}},S=function(){g.value.click()},D=function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return null==_.value&&(b.value=!0),e.next=3,p.value.validate("form1").then((function(e){if(e&&!b.value){var a={othernames:y.value,lastname:A.value,dob:j.value,pic:O.value,personEmail:$.value,mobileNumber:w.value,mobileNumber2:Z.value,address:F.value,user_id:d.value};t.emit("page",{bool:!0,page:0,data:a,name:"general"})}if(!1===e)return t.emit("page",{bool:!1,page:0}),void(x.value=!0)}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),C=Object(m["a"])((function(e){v.value=!0,r(e.target.value).finally((function(){return v.value=!1}))}));return Object(i["a"])(Object(i["a"])({},Object(l["j"])(o)),{},{sendData:D,uploadImage:N,triggerUpload:S,getters_single_staff:s,searchStaffBtn:C})}}),p=b,g=(a("f09c"),a("2877")),_=Object(g["a"])(p,o,u,!1,null,"fe53b5bc",null),h=_.exports,k=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",{attrs:{flat:""}},[a("v-card-title",{directives:[{name:"show",rawName:"v-show",value:e.props.user_id,expression:"props.user_id"}],attrs:{"primary-title":""}},[e._v(" Next Of Kin ")]),a("v-card-text",{staticClass:"px-0"},[a("validation-observer",{ref:"observer"},[a("v-form",{on:{submit:function(e){e.preventDefault()}}},[a("v-container",{staticClass:"px-0",attrs:{fluid:""}},[a("v-card",{staticClass:"pa-4",attrs:{outlined:""}},[a("v-row",[a("v-col",{attrs:{cols:"12",lg:"6"}},[a("validation-provider",{attrs:{name:"Name",rules:{required:!0}},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("v-text-field",{attrs:{"hide-details":"auto",label:"Next of Kin's name","error-messages":r,outlined:""},model:{value:e.kinName,callback:function(t){e.kinName=t},expression:"kinName"}})]}}])})],1),a("v-col",{attrs:{cols:"12",lg:"6"}},[a("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,n=t.attrs;return[a("validation-provider",{attrs:{name:"Date of birth",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.errors;return[a("v-text-field",e._g(e._b({attrs:{label:"Date of birth",readonly:"",outlined:"","hide-details":"auto","error-messages":i},model:{value:e.kinDob,callback:function(t){e.kinDob=t},expression:"kinDob"}},"v-text-field",n,!1),r))]}}],null,!0)})]}}]),model:{value:e.menuDob,callback:function(t){e.menuDob=t},expression:"menuDob"}},[a("v-date-picker",{on:{input:function(t){e.menuDob=!1}},model:{value:e.kinDob,callback:function(t){e.kinDob=t},expression:"kinDob"}})],1)],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",lg:"6"}},[a("validation-provider",{attrs:{name:"Mobile number 1",rules:{required:!0,digits:10,regex:"^(0)\\d{9}$"}},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("v-text-field",{attrs:{"hide-details":"auto",label:"Mobile number 1","error-messages":r,outlined:""},model:{value:e.kinNumber1,callback:function(t){e.kinNumber1=t},expression:"kinNumber1"}})]}}])})],1),a("v-col",{attrs:{cols:"12",lg:"6"}},[a("validation-provider",{attrs:{name:"Mobile number 2",rules:{regex:e.kinNumber2?"^(0)\\d{9}$":""}},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("v-text-field",{attrs:{"hide-details":"auto",label:"Mobile number 2 (optional)","error-messages":r,outlined:""},model:{value:e.kinNumber2,callback:function(t){e.kinNumber2=t},expression:"kinNumber2"}})]}}])})],1)],1),a("v-row",[a("v-col",[a("validation-provider",{attrs:{name:"Address",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("v-textarea",{attrs:{"hide-details":"auto",outlined:"",label:"Address","error-messages":r},model:{value:e.kinAddress,callback:function(t){e.kinAddress=t},expression:"kinAddress"}})]}}])})],1)],1)],1)],1),a("v-row",{staticClass:"mt-3"},[a("v-col",[e.props.user_id?a("v-btn",{attrs:{color:"success"},on:{click:e.addNewKin}},[e._v(" save changes ")]):a("v-btn",{attrs:{color:"primary"},on:{click:e.sendData}},[e._v(" Continue ")])],1)],1)],1)],1)],1)],1)},y=[];Object(v["d"])("eager"),Object(v["c"])("regex",Object(i["a"])(Object(i["a"])({},d["k"]),{},{message:"{_field_}  must be ten digits starting with zero(0)"})),Object(v["c"])("required",Object(i["a"])(Object(i["a"])({},d["l"]),{},{message:"{_field_} can not be empty"})),Object(v["c"])("min",Object(i["a"])(Object(i["a"])({},d["h"]),{},{message:"{_field_} can not be empty"})),Object(v["c"])("alpha_dash",Object(i["a"])(Object(i["a"])({},d["b"]),{},{message:"{_field_} can only accepts alphabets"})),Object(v["c"])("alpha",Object(i["a"])(Object(i["a"])({},d["a"]),{},{message:"{_field_} can only accepts alphabets"})),Object(v["c"])("alpha_num",Object(i["a"])(Object(i["a"])({},d["c"]),{},{message:"{_field_} can only accepts alphabets and numbers"})),Object(v["c"])("alpha_spaces",Object(i["a"])(Object(i["a"])({},d["d"]),{},{message:"{_field_} can only accepts alphabets"}));var A=Object(l["c"])({props:["user_id"],setup:function(e,t){var a=Object(f["a"])(["userKin"]),r=a.userKin,n=Object(l["h"])({observer:null,valid:!0,kinName:"",kinDob:"",kinAddress:"",kinNumber1:"",kinNumber2:"",menuDob:!1,kinNumberError:""}),s=Object(l["j"])(n),o=s.observer,u=s.kinName,d=s.kinDob,v=s.kinAddress,m=s.kinNumber1,b=s.kinNumber2,p=function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.value.validate().then((function(e){if(e){var a={kin_name:u.value,kin_dob:d.value,kin_address:v.value,kin_number1:m.value,kin_number2:b.value};t.emit("page",{bool:!0,page:1,data:a,name:"nextofkin"})}else t.emit("page",{bool:!1,page:1})}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o.value.validate().then((function(t){if(t){var a={kin_name:u.value,kin_dob:d.value,kin_address:v.value,kin_number1:m.value,kin_number2:b.value,user_id:e.user_id};r(a)}}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(i["a"])(Object(i["a"])({},Object(l["j"])(n)),{},{sendData:p,addNewKin:g,props:e})}}),j=A,O=Object(g["a"])(j,k,y,!1,null,null,null),x=O.exports,$=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",{attrs:{flat:""}},[a("validation-observer",{ref:"observer"},[a("v-form",{ref:"accountForm",on:{submit:function(e){e.preventDefault()}}},[a("v-card",{attrs:{outlined:""}},[a("v-card-text",[a("v-slide-y-transition",{attrs:{group:""}},[e._l(e.accounts,(function(t,r){return[a("v-row",{key:r,attrs:{justify:"center",align:"center"}},[a("v-col",{attrs:{cols:"12",lg:"4"}},[a("validation-provider",{attrs:{name:"Account",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(n){var i=n.errors;return[a("v-select",{attrs:{"hide-selected":"",items:e.getters_accounts,"item-value":"id","item-text":"account_name",outlined:"","hide-details":"auto",label:"Account Name",placeholder:"Account Name","error-messages":i},on:{change:function(t){return e.getBalance(t,r)}},model:{value:t.id,callback:function(a){e.$set(t,"id",a)},expression:"account.id"}})]}}],null,!0)})],1),a("v-col",{attrs:{cols:"12",lg:"4"}},[a("validation-provider",{attrs:{name:"Credit",rules:"required|numeric|password:@confirm"},scopedSlots:e._u([{key:"default",fn:function(r){var n=r.errors;return[a("v-text-field",{attrs:{"hide-details":"auto",label:"Credit","error-messages":n,outlined:""},model:{value:t.credit,callback:function(a){e.$set(t,"credit",e._n(a))},expression:"account.credit"}})]}}],null,!0)})],1),a("v-col",{attrs:{cols:"12",lg:"2"}},[a("validation-provider",{attrs:{name:"confirm",rules:"required|numeric"},scopedSlots:e._u([{key:"default",fn:function(r){var n=r.errors;return[a("v-text-field",{attrs:{disabled:"","hide-details":"auto",label:"Min Bal","error-messages":n,outlined:""},model:{value:t.balance,callback:function(a){e.$set(t,"balance",a)},expression:"account.balance"}})]}}],null,!0)})],1),a("v-col",{staticClass:"text-center",attrs:{cols:"12",lg:"2"}},[a("v-slide-y-reverse-transition",[r+1===e.accounts.length?a("v-btn",{attrs:{icon:"",dark:"",color:"success",disabled:!e.valid},on:{click:function(t){return e.newRow()}}},[a("v-icon",{attrs:{dark:""}},[e._v("mdi-plus-circle")])],1):e._e()],1),a("v-slide-y-reverse-transition",[r+1>=2?a("v-btn",{attrs:{dark:"",icon:"",color:"red"},on:{click:function(t){return e.removeRow(r)}}},[a("v-icon",{attrs:{dark:""}},[e._v(" mdi-delete-outline ")])],1):e._e()],1)],1)],1)]}))],2)],1)],1)],1)],1),a("v-card-actions",{staticClass:"ml-2"},[e.props.user_id?a("v-btn",{attrs:{color:"success"},on:{click:e.addNewSpouseChildren}},[e._v(" save changes ")]):a("v-btn",{attrs:{color:"primary"},on:{click:e.sendData}},[e._v(" Continue ")])],1)],1)},w=[];a("d81d"),a("a434");Object(v["d"])("eager"),Object(v["c"])("password",{params:["target"],validate:function(e,t){var a=t.target;return e>=a},message:"Credit should be greater than minimum balance"}),Object(v["c"])("required",Object(i["a"])(Object(i["a"])({},d["l"]),{},{message:"{_field_} can not be empty"})),Object(v["c"])("numeric",Object(i["a"])(Object(i["a"])({},d["j"]),{},{message:"{_field_} can not be empty"}));var Z=Object(l["c"])({props:["user_id"],setup:function(e,t){var a=Object(f["a"])(["accountList"]),r=a.accountList,n=Object(f["b"])(["getters_accounts"]),s=n.getters_accounts;r();var o=Object(l["h"])({observer:null,valid:!0,accounts:[{id:null,credit:0,balance:0}],accountForm:null}),u=Object(l["j"])(o),d=u.accounts,v=u.observer,m=function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,v.value.validate().then((function(e){if(e){var a={accounts:d.value};t.emit("page",{bool:!0,page:3,data:a,name:"accounts"})}else t.emit("page",{bool:!1,page:3})}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),b=function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,v.value.validate().then((function(e){e&&d.value.push({id:null,credit:0,balance:0})}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),p=function(e,t){s.value.map((function(a){return a.id===e?d.value[t].balance=a.min_balance:null}))},g=function(e){d.value.splice(e,1)};return Object(i["a"])(Object(i["a"])({},Object(l["j"])(o)),{},{sendData:m,newRow:b,removeRow:g,props:e,getters_accounts:s,getBalance:p})}}),F=Z,N=Object(g["a"])(F,$,w,!1,null,null,null),S=N.exports,D=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{fluid:""}},[a("ValidationObserver",{ref:"observer",scopedSlots:e._u([{key:"default",fn:function(t){var r=t.invalid;return[a("v-form",{on:{submit:function(e){e.preventDefault()}}},[a("v-card",{staticClass:"mb-2",attrs:{color:"teal lighten-2",dark:""}},[a("v-card-title",{attrs:{"primary-title":""}},[e._v(" Services ")]),a("v-card-text",[a("v-row",[a("v-col",[a("v-checkbox",{attrs:{label:"SMS Alert",color:"white","hide-details":""},model:{value:e.sms,callback:function(t){e.sms=t},expression:"sms"}})],1)],1)],1)],1),a("v-card",{staticClass:"mb-2",attrs:{color:"teal",dark:""}},[a("v-card-title",[e._v(" Proof of Residential and Postal Address (any of the following): ")]),a("v-card-text",[a("ValidationProvider",{scopedSlots:e._u([{key:"default",fn:function(t){var r=t.errors;return[a("v-row",{attrs:{align:"center"}},e._l(e.ex4,(function(t,r){return a("v-col",{key:r},[a("v-checkbox",{attrs:{value:t,label:t.label,color:"white","hide-details":""},model:{value:e.files,callback:function(t){e.files=t},expression:"files"}})],1)})),1),r.length>0?a("div",[e._v(" "+e._s(r)+" ")]):e._e()]}}],null,!0)})],1)],1),e.files.length>0?a("v-slide-y-transition",[a("v-card",{attrs:{outlined:""}},[a("v-card-text",e._l(e.files,(function(t,r){return a("v-row",{key:r,attrs:{align:"center"}},[a("v-col",{attrs:{cols:"12"}},[a("ValidationProvider",{attrs:{rules:"required|ext:pdf,jpeg,jpg,png"},scopedSlots:e._u([{key:"default",fn:function(r){var n=r.errors;return[a("v-file-input",{attrs:{"show-size":"",outlined:"",label:t.label,"hide-details":"auto","error-messages":n,hint:"File extensions. jpg, jpeg, png are required"},scopedSlots:e._u([{key:"selection",fn:function(t){var r=t.index,n=t.text;return[r<2?a("v-chip",{attrs:{color:"info accent-4",dark:"",label:""}},[e._v(" "+e._s(n)+" ")]):e._e()]}}],null,!0),model:{value:t.file,callback:function(a){e.$set(t,"file",a)},expression:"file.file"}})]}}],null,!0)})],1)],1)})),1)],1)],1):e._e(),a("v-row",{staticClass:"mt-3"},[a("v-col",[a("v-btn",{attrs:{color:"primary",disabled:r},on:{click:e.validate}},[e._v(" Continue ")])],1)],1)],1)]}}])})],1)},C=[];Object(v["d"])("eager"),Object(v["c"])("exact_length",{params:["length","message"],validate:function(e,t){var a=t.length,r=t.message;return 0!==e.length||(null!==r&&void 0!==r?r:"Tick At Least "+a+" item")}}),Object(v["c"])("required",Object(i["a"])(Object(i["a"])({},d["l"]),{},{message:"Field is required"})),Object(v["c"])("ext",Object(i["a"])(Object(i["a"])({},d["g"]),{},{message:"File extensions. pdf, jpg, jpeg, png are required"}));var E=Object(l["c"])({setup:function(e,t){var a=Object(l["h"])({ex4:[{label:"Utility Bill",file:null},{label:"Tenancy Agreement",file:null},{label:'Employer"s Reference Letter',file:null}],files:[],observer:null,sms:!1}),r=Object(l["j"])(a),n=r.files,s=r.observer,o=r.sms,u=function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.value.validate().then((function(e){if(e){var a={files:n.value,sms:o.value};t.emit("page",{bool:!0,page:2,data:a,name:"files"})}else t.emit("page",{bool:!1,page:2})}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(i["a"])({validate:u},Object(l["j"])(a))}}),R=E,q=(a("4724"),Object(g["a"])(R,D,C,!1,null,"012f034e",null)),M=q.exports,P=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{fluid:""}},[a("v-card",{staticClass:"mx-auto",attrs:{outlined:"","min-width":"500"}},[a("v-card-title",{staticClass:"primary--text text-uppercase",attrs:{"primary-title":""}},[e._v(" Review and Save New User ")]),a("v-divider"),a("v-virtual-scroll",{attrs:{bench:e.benched,items:e.name,height:"390","item-height":"50"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.item;return[a("v-list-item",{key:r.page},[a("v-list-item-content",{staticClass:"body-1"},[a("v-list-item-title",[e._v(" "+e._s(r.name)+" ")])],1),a("v-list-item-action",[a("v-btn",{attrs:{depressed:"",small:""},on:{click:function(t){return e.viewSteppter(r.page)}}},[e._v(" View Details "),a("v-icon",{attrs:{color:"primary",right:""}},[e._v(" mdi-open-in-new ")])],1)],1)],1),a("v-divider")]}}])})],1),a("v-container",{attrs:{fluid:""}},[a("v-btn",{staticClass:"font-weight-bold",attrs:{color:"success"},on:{click:e.send}},[e._v(" Save User ")])],1)],1)},I=[],L=Object(l["c"])({components:{Files:M,PersonalDetails:h,AccountDetails:S,NextOfKin:x,Results:B},setup:function(e,t){var a=Object(l["h"])({name:[{name:"Personal Details",page:0},{name:"Next Of Kin",page:1},{name:"Files",page:2},{name:"Account Details",page:3}],benched:1,tab:null}),r=function(e){return t.emit("goto",e)},n=function(){return t.emit("send",!0)};return Object(i["a"])(Object(i["a"])({},Object(l["j"])(a)),{},{viewSteppter:r,send:n})}}),z=L,K=Object(g["a"])(z,P,I,!1,null,null,null),B=K.exports,T=a("4a4a"),U=a("2b6f"),J={components:{PageHeader:s["a"],Files:M,PersonalDetails:h,AccountDetails:S,NextOfKin:x,Results:B,Response:U["a"]},setup:function(e,t){var a=Object(l["h"])({valid:!0,stepForm:[],curr:0,steps:[{name:"Personal Details",componentname:"PersonalDetails",valid:!0},{name:"Next Of Kin",componentname:"NextOfKin",valid:!0},{name:"Files",componentname:"Files",valid:!0},{name:"Account Details",componentname:"AccountDetails",valid:!0},{name:"Results",componentname:"results",valid:!0}],formData:new FormData,progress:0,overlay:!1,msgHeader:null,msgBody:null,msgIcon:null,actionResponse:!1,color:null,absolute:!0,reset:0}),r=t.root.$store,n=Object(l["j"])(a),s=n.reset,o=n.curr,u=n.steps,c=n.formData,d=n.progress,v=n.overlay,f=n.msgHeader,m=n.msgBody,b=n.msgIcon,p=n.actionResponse,g=n.color,_=function(e){var t=e.bool,a=e.page,r=e.data,n=e.name;if(t)return u.value[a].valid=!0,o.value=a+1,void(r.pic?(c.value.append("file",r.pic),delete r.pic,c.value.append(n,JSON.stringify(r))):r.files?(r.files.forEach((function(e,t){c.value.append("documents["+t+"]",e.file)})),c.value.append("sms",JSON.stringify(r.sms))):c.value.append(n,JSON.stringify(r)));u.value[a].valid=!1},h=function(e){e&&(d.value=0,v.value=!0,p.value=!1,Object(T["a"])().post("/new_user",c.value,{onUploadProgress:function(e){d.value=Math.round(100*e.loaded/e.total)}}).then((function(e){r.commit("SET_NEW_CUSTOMER",e.data.data),f.value="Success",m.value="New Customer Is Created Successfully",b.value="mdi-check-circle",g.value="success",v.value=!1,p.value=!0,s.value++,o.value=0})).catch((function(e){console.log(e),f.value="Error",m.value="Try Again Later or Call the System Administrator",b.value="mdi-close-circle",g.value="error",p.value=!0})))},k=function(e){return o.value>e};Object(l["g"])("color",g);var y=function(e){return o.value=e};return Object(i["a"])(Object(i["a"])({},Object(l["j"])(a)),{},{stepComplete:k,data:_,send:h,goto:y})}},H=J,V=(a("7be4"),Object(g["a"])(H,r,n,!1,null,"579708ca",null));t["default"]=V.exports},"7be4":function(e,t,a){"use strict";a("5103")},b2cf:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",{staticClass:"text-uppercase grey--text"},[e._t("header"),e._v(" "),e._t("default")],2)},n=[],i=a("2877"),s={},l=Object(i["a"])(s,r,n,!1,null,null,null);t["a"]=l.exports},bf34:function(e,t,a){},cabe:function(e,t,a){},f09c:function(e,t,a){"use strict";a("bf34")}}]);
//# sourceMappingURL=chunk-773a9cd6.afb822e5.js.map