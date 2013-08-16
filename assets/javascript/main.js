// Bundled with Fusion v0.1



/*
 * File: host_map.js
 */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  WARNING: Moovweb auto-generated file. Any changes you make here will *
 *  be overwritten.                                                      *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

(function(){

var mapProxyToOrigin = {"http://mlocal.s197forum.com":"http://www.s197forum.com","https://mlocal.s197forum.com":"https://www.s197forum.com"};
var mapOriginToProxy = {"http://s197forum.com":"http://mlocal.s197forum.com","http://www.s197forum.com":"http://mlocal.s197forum.com","https://s197forum.com":"https://mlocal.s197forum.com","https://www.s197forum.com":"https://mlocal.s197forum.com"};

if (typeof(mw) == "undefined") {
	window.mw = {};
}

if(typeof(mw.catch_all_domain) == "undefined") {
	mw.catch_all_domain = ".moovapp.com";
} else {
  if (mw.catch_all_domain[0] != ".") {
  	console.log("Bad catch all domain");
  }
}


function detect_catch_all(url) {
	var found_index = url.host.indexOf(mw.catch_all_domain);
	var length = url.host.length;

	if (found_index != -1 && (found_index + mw.catch_all_domain.length) == length) {
		return true;
	}
	return false;
}

function strip_catch_all(url) {
	var found_index = url.host.indexOf(mw.catch_all_domain);
	var length = url.host.length;

	url.host = url.host.slice(0, found_index);
	return url;
}

function add_catch_all(url) {
	url.host = url.host + mw.catch_all_domain;
	return url;	
}

function getParsedURL(url) {
	var elem = document.createElement("a")
	elem.href = url;
	return elem;
}

function getSchemeAndHostname(url) {
	var result = {};
	result.scheme = url.protocol;
	result.host = url.host;
	return result;
}

function getKey(url) {
	var components = getSchemeAndHostname(url);
	return components.scheme + "//" + components.host;
}

function fetch(url, map) {
	var key = getKey(url);
	var result = map[key];
	
	if (result === undefined) {
		if (typeof(mw) != 'undefined' && mw.debug == true) {
			console.log("Warning. No rule to modify host (" + key + ").")
		}
		return url.href;
	}
	
	return result + url.pathname + url.search + url.hash;
}

function detect(rawURL) {
  var properties = {
    "secure": false,
    "schema_relative": false,
    "relative": false
  };  
  properties.raw = rawURL;
  
  if (rawURL.indexOf("https://") != -1) {
    properties.secure = true;
  } else if(rawURL.indexOf("http://") == -1) {
    if (rawURL.indexOf("//") == 0) {
      properties.schema_relative = true;
    } else {
      properties.relative = true;
    }
  }
  
  return properties;
}

function denormalize(url, properties) {
  url = getParsedURL(url);
  if (properties.relative) {    
    return url.pathname + url.search + url.hash;
  } else {
    if (properties.secure) {
      return url.href.replace("http://","https://");
    } 
    if (properties.schema_relative) {
      return url.href.replace(/^https*:/, "");
    }
    
  }
  return url.href;
}

mw.proxyURLToOrigin = function(rawURL){	

	var properties = detect(rawURL);

	// Make sure it includes the host, or it will still be proxied!
	properties.relative = false;

	var url = getParsedURL(rawURL);
	var catch_all = detect_catch_all(url);

  if (catch_all) {    
	  url = strip_catch_all(url);
  }
	
	url = fetch(url, mapProxyToOrigin);
	url = denormalize(url, properties);

	return url;
}

mw.originURLToProxy = function(rawURL){

	var properties = detect(rawURL);
	var url = getParsedURL(rawURL);
	var catch_all = detect_catch_all(url);

  if (catch_all) {    
	  url = strip_catch_all(url);
  }

  url = getParsedURL(fetch(url, mapOriginToProxy));
  var globalLocation = getParsedURL(window.location.href);
  if (detect_catch_all(globalLocation)) {
      url = add_catch_all(url);
  }

	url = denormalize(url.href, properties);
	
	return url;
}

}());



/*
 * File: http://code.jquery.com/jquery-1.9.1.min.js
 */
/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery.min.map
*/(function(e,t){var n,r,i=typeof t,o=e.document,a=e.location,s=e.jQuery,u=e.$,l={},c=[],p="1.9.1",f=c.concat,d=c.push,h=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,b=function(e,t){return new b.fn.init(e,t,r)},x=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^[\],:{}\s]*$/,E=/(?:^|:|,)(?:\s*\[)+/g,S=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,A=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,j=/^-ms-/,D=/-([\da-z])/gi,L=function(e,t){return t.toUpperCase()},H=function(e){(o.addEventListener||"load"===e.type||"complete"===o.readyState)&&(q(),b.ready())},q=function(){o.addEventListener?(o.removeEventListener("DOMContentLoaded",H,!1),e.removeEventListener("load",H,!1)):(o.detachEvent("onreadystatechange",H),e.detachEvent("onload",H))};b.fn=b.prototype={jquery:p,constructor:b,init:function(e,n,r){var i,a;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof b?n[0]:n,b.merge(this,b.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:o,!0)),C.test(i[1])&&b.isPlainObject(n))for(i in n)b.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(a=o.getElementById(i[2]),a&&a.parentNode){if(a.id!==i[2])return r.find(e);this.length=1,this[0]=a}return this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):b.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),b.makeArray(e,this))},selector:"",length:0,size:function(){return this.length},toArray:function(){return h.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=b.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return b.each(this,e,t)},ready:function(e){return b.ready.promise().done(e),this},slice:function(){return this.pushStack(h.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(b.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:d,sort:[].sort,splice:[].splice},b.fn.init.prototype=b.fn,b.extend=b.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||b.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(o=arguments[u]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(b.isPlainObject(r)||(n=b.isArray(r)))?(n?(n=!1,a=e&&b.isArray(e)?e:[]):a=e&&b.isPlainObject(e)?e:{},s[i]=b.extend(c,a,r)):r!==t&&(s[i]=r));return s},b.extend({noConflict:function(t){return e.$===b&&(e.$=u),t&&e.jQuery===b&&(e.jQuery=s),b},isReady:!1,readyWait:1,holdReady:function(e){e?b.readyWait++:b.ready(!0)},ready:function(e){if(e===!0?!--b.readyWait:!b.isReady){if(!o.body)return setTimeout(b.ready);b.isReady=!0,e!==!0&&--b.readyWait>0||(n.resolveWith(o,[b]),b.fn.trigger&&b(o).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===b.type(e)},isArray:Array.isArray||function(e){return"array"===b.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if(!e||"object"!==b.type(e)||e.nodeType||b.isWindow(e))return!1;try{if(e.constructor&&!y.call(e,"constructor")&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||y.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=b.buildFragment([e],t,i),i&&b(i).remove(),b.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=b.trim(n),n&&k.test(n.replace(S,"@").replace(A,"]").replace(E,"")))?Function("return "+n)():(b.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||b.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&b.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(j,"ms-").replace(D,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:v&&!v.call("\ufeff\u00a0")?function(e){return null==e?"":v.call(e)}:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?b.merge(n,"string"==typeof e?[e]:e):d.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(g)return g.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return f.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),b.isFunction(e)?(r=h.call(arguments,2),i=function(){return e.apply(n||this,r.concat(h.call(arguments)))},i.guid=e.guid=e.guid||b.guid++,i):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if("object"===b.type(r)){o=!0;for(u in r)b.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,b.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(b(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()}}),b.ready.promise=function(t){if(!n)if(n=b.Deferred(),"complete"===o.readyState)setTimeout(b.ready);else if(o.addEventListener)o.addEventListener("DOMContentLoaded",H,!1),e.addEventListener("load",H,!1);else{o.attachEvent("onreadystatechange",H),e.attachEvent("onload",H);var r=!1;try{r=null==e.frameElement&&o.documentElement}catch(i){}r&&r.doScroll&&function a(){if(!b.isReady){try{r.doScroll("left")}catch(e){return setTimeout(a,50)}q(),b.ready()}}()}return n.promise(t)},b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=b.type(e);return b.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=b(o);var _={};function F(e){var t=_[e]={};return b.each(e.match(w)||[],function(e,n){t[n]=!0}),t}b.Callbacks=function(e){e="string"==typeof e?_[e]||F(e):b.extend({},e);var n,r,i,o,a,s,u=[],l=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=u.length,n=!0;u&&o>a;a++)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,u&&(l?l.length&&c(l.shift()):r?u=[]:p.disable())},p={add:function(){if(u){var t=u.length;(function i(t){b.each(t,function(t,n){var r=b.type(n);"function"===r?e.unique&&p.has(n)||u.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=u.length:r&&(s=t,c(r))}return this},remove:function(){return u&&b.each(arguments,function(e,t){var r;while((r=b.inArray(t,u,r))>-1)u.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?b.inArray(e,u)>-1:!(!u||!u.length)},empty:function(){return u=[],this},disable:function(){return u=l=r=t,this},disabled:function(){return!u},lock:function(){return l=t,r||p.disable(),this},locked:function(){return!l},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!u||i&&!l||(n?l.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},b.extend({Deferred:function(e){var t=[["resolve","done",b.Callbacks("once memory"),"resolved"],["reject","fail",b.Callbacks("once memory"),"rejected"],["notify","progress",b.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return b.Deferred(function(n){b.each(t,function(t,o){var a=o[0],s=b.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&b.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?b.extend(e,r):r}},i={};return r.pipe=r.then,b.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=h.call(arguments),r=n.length,i=1!==r||e&&b.isFunction(e.promise)?r:0,o=1===i?e:b.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?h.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,u,l;if(r>1)for(s=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&b.isFunction(n[t].promise)?n[t].promise().done(a(t,l,n)).fail(o.reject).progress(a(t,u,s)):--i;return i||o.resolveWith(l,n),o.promise()}}),b.support=function(){var t,n,r,a,s,u,l,c,p,f,d=o.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*"),r=d.getElementsByTagName("a")[0],!n||!r||!n.length)return{};s=o.createElement("select"),l=s.appendChild(o.createElement("option")),a=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={getSetAttribute:"t"!==d.className,leadingWhitespace:3===d.firstChild.nodeType,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:"/a"===r.getAttribute("href"),opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:!!a.value,optSelected:l.selected,enctype:!!o.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==o.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===o.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},a.checked=!0,t.noCloneChecked=a.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!l.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}a=o.createElement("input"),a.setAttribute("value",""),t.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),t.radioValue="t"===a.value,a.setAttribute("checked","t"),a.setAttribute("name","t"),u=o.createDocumentFragment(),u.appendChild(a),t.appendChecked=a.checked,t.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;return d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip,b(function(){var n,r,a,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",u=o.getElementsByTagName("body")[0];u&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",u.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",a=d.getElementsByTagName("td"),a[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===a[0].offsetHeight,a[0].style.display="",a[1].style.display="none",t.reliableHiddenOffsets=p&&0===a[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=4===d.offsetWidth,t.doesNotIncludeMarginInBodyOffset=1!==u.offsetTop,e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(o.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(u.style.zoom=1)),u.removeChild(n),n=d=a=r=null)}),n=s=u=l=r=a=null,t}();var O=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,B=/([A-Z])/g;function P(e,n,r,i){if(b.acceptData(e)){var o,a,s=b.expando,u="string"==typeof n,l=e.nodeType,p=l?b.cache:e,f=l?e[s]:e[s]&&s;if(f&&p[f]&&(i||p[f].data)||!u||r!==t)return f||(l?e[s]=f=c.pop()||b.guid++:f=s),p[f]||(p[f]={},l||(p[f].toJSON=b.noop)),("object"==typeof n||"function"==typeof n)&&(i?p[f]=b.extend(p[f],n):p[f].data=b.extend(p[f].data,n)),o=p[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[b.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[b.camelCase(n)])):a=o,a}}function R(e,t,n){if(b.acceptData(e)){var r,i,o,a=e.nodeType,s=a?b.cache:e,u=a?e[b.expando]:b.expando;if(s[u]){if(t&&(o=n?s[u]:s[u].data)){b.isArray(t)?t=t.concat(b.map(t,b.camelCase)):t in o?t=[t]:(t=b.camelCase(t),t=t in o?[t]:t.split(" "));for(r=0,i=t.length;i>r;r++)delete o[t[r]];if(!(n?$:b.isEmptyObject)(o))return}(n||(delete s[u].data,$(s[u])))&&(a?b.cleanData([e],!0):b.support.deleteExpando||s!=s.window?delete s[u]:s[u]=null)}}}b.extend({cache:{},expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?b.cache[e[b.expando]]:e[b.expando],!!e&&!$(e)},data:function(e,t,n){return P(e,t,n)},removeData:function(e,t){return R(e,t)},_data:function(e,t,n){return P(e,t,n,!0)},_removeData:function(e,t){return R(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&b.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),b.fn.extend({data:function(e,n){var r,i,o=this[0],a=0,s=null;if(e===t){if(this.length&&(s=b.data(o),1===o.nodeType&&!b._data(o,"parsedAttrs"))){for(r=o.attributes;r.length>a;a++)i=r[a].name,i.indexOf("data-")||(i=b.camelCase(i.slice(5)),W(o,i,s[i]));b._data(o,"parsedAttrs",!0)}return s}return"object"==typeof e?this.each(function(){b.data(this,e)}):b.access(this,function(n){return n===t?o?W(o,e,b.data(o,e)):null:(this.each(function(){b.data(this,e,n)}),t)},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){b.removeData(this,e)})}});function W(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(B,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:O.test(r)?b.parseJSON(r):r}catch(o){}b.data(e,n,r)}else r=t}return r}function $(e){var t;for(t in e)if(("data"!==t||!b.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}b.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=b._data(e,n),r&&(!i||b.isArray(r)?i=b._data(e,n,b.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=b.queue(e,t),r=n.length,i=n.shift(),o=b._queueHooks(e,t),a=function(){b.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return b._data(e,n)||b._data(e,n,{empty:b.Callbacks("once memory").add(function(){b._removeData(e,t+"queue"),b._removeData(e,n)})})}}),b.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?b.queue(this[0],e):n===t?this:this.each(function(){var t=b.queue(this,e,n);b._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&b.dequeue(this,e)})},dequeue:function(e){return this.each(function(){b.dequeue(this,e)})},delay:function(e,t){return e=b.fx?b.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=b.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=b._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var I,z,X=/[\t\r\n]/g,U=/\r/g,V=/^(?:input|select|textarea|button|object)$/i,Y=/^(?:a|area)$/i,J=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,G=/^(?:checked|selected)$/i,Q=b.support.getSetAttribute,K=b.support.input;b.fn.extend({attr:function(e,t){return b.access(this,b.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){b.removeAttr(this,e)})},prop:function(e,t){return b.access(this,b.prop,e,t,arguments.length>1)},removeProp:function(e){return e=b.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=b.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?b.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return b.isFunction(e)?this.each(function(n){b(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,a=0,s=b(this),u=t,l=e.match(w)||[];while(o=l[a++])u=r?u:!s.hasClass(o),s[u?"addClass":"removeClass"](o)}else(n===i||"boolean"===n)&&(this.className&&b._data(this,"__className__",this.className),this.className=this.className||e===!1?"":b._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(X," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=b.isFunction(e),this.each(function(n){var o,a=b(this);1===this.nodeType&&(o=i?e.call(this,n,a.val()):e,null==o?o="":"number"==typeof o?o+="":b.isArray(o)&&(o=b.map(o,function(e){return null==e?"":e+""})),r=b.valHooks[this.type]||b.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=b.valHooks[o.type]||b.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(U,""):null==n?"":n)}}}),b.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;for(;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(b.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&b.nodeName(n.parentNode,"optgroup"))){if(t=b(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n=b.makeArray(t);return b(e).find("option").each(function(){this.selected=b.inArray(b(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var o,a,s,u=e.nodeType;if(e&&3!==u&&8!==u&&2!==u)return typeof e.getAttribute===i?b.prop(e,n,r):(a=1!==u||!b.isXMLDoc(e),a&&(n=n.toLowerCase(),o=b.attrHooks[n]||(J.test(n)?z:I)),r===t?o&&a&&"get"in o&&null!==(s=o.get(e,n))?s:(typeof e.getAttribute!==i&&(s=e.getAttribute(n)),null==s?t:s):null!==r?o&&a&&"set"in o&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r):(b.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=b.propFix[n]||n,J.test(n)?!Q&&G.test(n)?e[b.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:b.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!b.support.radioValue&&"radio"===t&&b.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!b.isXMLDoc(e),a&&(n=b.propFix[n]||n,o=b.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):V.test(e.nodeName)||Y.test(e.nodeName)&&e.href?0:t}}}}),z={get:function(e,n){var r=b.prop(e,n),i="boolean"==typeof r&&e.getAttribute(n),o="boolean"==typeof r?K&&Q?null!=i:G.test(n)?e[b.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);return o&&o.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?b.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&b.propFix[n]||n,n):e[b.camelCase("default-"+n)]=e[n]=!0,n}},K&&Q||(b.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return b.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t},set:function(e,n,r){return b.nodeName(e,"input")?(e.defaultValue=n,t):I&&I.set(e,n,r)}}),Q||(I=b.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&("id"===n||"name"===n||"coords"===n?""!==r.value:r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},b.attrHooks.contenteditable={get:I.get,set:function(e,t,n){I.set(e,""===t?!1:t,n)}},b.each(["width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}})})),b.support.hrefNormalized||(b.each(["href","src","width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return null==r?t:r}})}),b.each(["href","src"],function(e,t){b.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),b.support.style||(b.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),b.support.optSelected||(b.propHooks.selected=b.extend(b.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),b.support.enctype||(b.propFix.enctype="encoding"),b.support.checkOn||b.each(["radio","checkbox"],function(){b.valHooks[this]={get:function(e){return null===e.getAttribute("value")?"on":e.value}}}),b.each(["radio","checkbox"],function(){b.valHooks[this]=b.extend(b.valHooks[this],{set:function(e,n){return b.isArray(n)?e.checked=b.inArray(b(e).val(),n)>=0:t}})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}b.event={global:{},add:function(e,n,r,o,a){var s,u,l,c,p,f,d,h,g,m,y,v=b._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=b.guid++),(u=v.events)||(u=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof b===i||e&&b.event.triggered===e.type?t:b.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(w)||[""],l=n.length;while(l--)s=rt.exec(n[l])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),p=b.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=b.event.special[g]||{},d=b.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&b.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=u[g])||(h=u[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),b.event.global[g]=!0;e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,p,f,d,h,g,m=b.hasData(e)&&b._data(e);if(m&&(c=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(s=rt.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=b.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),u=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));u&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||b.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)b.event.remove(e,d+t[l],n,r,!0);b.isEmptyObject(c)&&(delete m.handle,b._removeData(e,"events"))}},trigger:function(n,r,i,a){var s,u,l,c,p,f,d,h=[i||o],g=y.call(n,"type")?n.type:n,m=y.call(n,"namespace")?n.namespace.split("."):[];if(l=f=i=i||o,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+b.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),u=0>g.indexOf(":")&&"on"+g,n=n[b.expando]?n:new b.Event(g,"object"==typeof n&&n),n.isTrigger=!0,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:b.makeArray(r,[n]),p=b.event.special[g]||{},a||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!a&&!p.noBubble&&!b.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(l=l.parentNode);l;l=l.parentNode)h.push(l),f=l;f===(i.ownerDocument||o)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((l=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(b._data(l,"events")||{})[n.type]&&b._data(l,"handle"),s&&s.apply(l,r),s=u&&l[u],s&&b.acceptData(l)&&s.apply&&s.apply(l,r)===!1&&n.preventDefault();if(n.type=g,!(a||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||"click"===g&&b.nodeName(i,"a")||!b.acceptData(i)||!u||!i[g]||b.isWindow(i))){f=i[u],f&&(i[u]=null),b.event.triggered=g;try{i[g]()}catch(v){}b.event.triggered=t,f&&(i[u]=f)}return n.result}},dispatch:function(e){e=b.event.fix(e);var n,r,i,o,a,s=[],u=h.call(arguments),l=(b._data(this,"events")||{})[e.type]||[],c=b.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=b.event.handlers.call(this,e,l),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((b.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,u),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==e.type)){for(o=[],a=0;u>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?b(r,this).index(l)>=0:b.find(r,this,null,[l]).length),o[r]&&o.push(i);o.length&&s.push({elem:l,handlers:o})}return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[b.expando])return e;var t,n,r,i=e.type,a=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new b.Event(a),t=r.length;while(t--)n=r[t],e[n]=a[n];return e.target||(e.target=a.srcElement||o),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,a):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,a,s=n.button,u=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||o,a=i.documentElement,r=i.body,e.pageX=n.clientX+(a&&a.scrollLeft||r&&r.scrollLeft||0)-(a&&a.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(a&&a.scrollTop||r&&r.scrollTop||0)-(a&&a.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&u&&(e.relatedTarget=u===e.target?n.toElement:u),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){return b.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t}},focus:{trigger:function(){if(this!==o.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===o.activeElement&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=b.extend(new b.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?b.event.trigger(i,null,t):b.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},b.removeEvent=o.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},b.Event=function(e,n){return this instanceof b.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&b.extend(this,n),this.timeStamp=e&&e.timeStamp||b.now(),this[b.expando]=!0,t):new b.Event(e,n)},b.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},b.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){b.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;
return(!i||i!==r&&!b.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),b.support.submitBubbles||(b.event.special.submit={setup:function(){return b.nodeName(this,"form")?!1:(b.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=b.nodeName(n,"input")||b.nodeName(n,"button")?n.form:t;r&&!b._data(r,"submitBubbles")&&(b.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),b._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&b.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return b.nodeName(this,"form")?!1:(b.event.remove(this,"._submit"),t)}}),b.support.changeBubbles||(b.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(b.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),b.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),b.event.simulate("change",this,e,!0)})),!1):(b.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!b._data(t,"changeBubbles")&&(b.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||b.event.simulate("change",this.parentNode,e,!0)}),b._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return b.event.remove(this,"._change"),!Z.test(this.nodeName)}}),b.support.focusinBubbles||b.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){b.event.simulate(t,e.target,b.event.fix(e),!0)};b.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),b.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return b().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=b.guid++)),this.each(function(){b.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,b(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){b.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){b.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?b.event.trigger(e,n,r,!0):t}}),function(e,t){var n,r,i,o,a,s,u,l,c,p,f,d,h,g,m,y,v,x="sizzle"+-new Date,w=e.document,T={},N=0,C=0,k=it(),E=it(),S=it(),A=typeof t,j=1<<31,D=[],L=D.pop,H=D.push,q=D.slice,M=D.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},_="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=F.replace("w","w#"),B="([*^$|!~]?=)",P="\\["+_+"*("+F+")"+_+"*(?:"+B+_+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+O+")|)|)"+_+"*\\]",R=":("+F+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+P.replace(3,8)+")*)|.*)\\)|)",W=RegExp("^"+_+"+|((?:^|[^\\\\])(?:\\\\.)*)"+_+"+$","g"),$=RegExp("^"+_+"*,"+_+"*"),I=RegExp("^"+_+"*([\\x20\\t\\r\\n\\f>+~])"+_+"*"),z=RegExp(R),X=RegExp("^"+O+"$"),U={ID:RegExp("^#("+F+")"),CLASS:RegExp("^\\.("+F+")"),NAME:RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:RegExp("^("+F.replace("w","w*")+")"),ATTR:RegExp("^"+P),PSEUDO:RegExp("^"+R),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+_+"*(even|odd|(([+-]|)(\\d*)n|)"+_+"*(?:([+-]|)"+_+"*(\\d+)|))"+_+"*\\)|)","i"),needsContext:RegExp("^"+_+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+_+"*((?:-\\d)?\\d*)"+_+"*\\)|)(?=[^-]|$)","i")},V=/[\x20\t\r\n\f]*[+~]/,Y=/^[^{]+\{\s*\[native code/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,G=/^(?:input|select|textarea|button)$/i,Q=/^h\d$/i,K=/'|\\/g,Z=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,et=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,tt=function(e,t){var n="0x"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{q.call(w.documentElement.childNodes,0)[0].nodeType}catch(nt){q=function(e){var t,n=[];while(t=this[e++])n.push(t);return n}}function rt(e){return Y.test(e+"")}function it(){var e,t=[];return e=function(n,r){return t.push(n+=" ")>i.cacheLength&&delete e[t.shift()],e[n]=r}}function ot(e){return e[x]=!0,e}function at(e){var t=p.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}}function st(e,t,n,r){var i,o,a,s,u,l,f,g,m,v;if((t?t.ownerDocument||t:w)!==p&&c(t),t=t||p,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(!d&&!r){if(i=J.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&y(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return H.apply(n,q.call(t.getElementsByTagName(e),0)),n;if((a=i[3])&&T.getByClassName&&t.getElementsByClassName)return H.apply(n,q.call(t.getElementsByClassName(a),0)),n}if(T.qsa&&!h.test(e)){if(f=!0,g=x,m=t,v=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){l=ft(e),(f=t.getAttribute("id"))?g=f.replace(K,"\\$&"):t.setAttribute("id",g),g="[id='"+g+"'] ",u=l.length;while(u--)l[u]=g+dt(l[u]);m=V.test(e)&&t.parentNode||t,v=l.join(",")}if(v)try{return H.apply(n,q.call(m.querySelectorAll(v),0)),n}catch(b){}finally{f||t.removeAttribute("id")}}}return wt(e.replace(W,"$1"),t,n,r)}a=st.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},c=st.setDocument=function(e){var n=e?e.ownerDocument||e:w;return n!==p&&9===n.nodeType&&n.documentElement?(p=n,f=n.documentElement,d=a(n),T.tagNameNoComments=at(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),T.attributes=at(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return"boolean"!==t&&"string"!==t}),T.getByClassName=at(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",e.getElementsByClassName&&e.getElementsByClassName("e").length?(e.lastChild.className="e",2===e.getElementsByClassName("e").length):!1}),T.getByName=at(function(e){e.id=x+0,e.innerHTML="<a name='"+x+"'></a><div name='"+x+"'></div>",f.insertBefore(e,f.firstChild);var t=n.getElementsByName&&n.getElementsByName(x).length===2+n.getElementsByName(x+0).length;return T.getIdNotName=!n.getElementById(x),f.removeChild(e),t}),i.attrHandle=at(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==A&&"#"===e.firstChild.getAttribute("href")})?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},T.getIdNotName?(i.find.ID=function(e,t){if(typeof t.getElementById!==A&&!d){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){return e.getAttribute("id")===t}}):(i.find.ID=function(e,n){if(typeof n.getElementById!==A&&!d){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==A&&r.getAttributeNode("id").value===e?[r]:t:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){var n=typeof e.getAttributeNode!==A&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=T.tagNameNoComments?function(e,n){return typeof n.getElementsByTagName!==A?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.NAME=T.getByName&&function(e,n){return typeof n.getElementsByName!==A?n.getElementsByName(name):t},i.find.CLASS=T.getByClassName&&function(e,n){return typeof n.getElementsByClassName===A||d?t:n.getElementsByClassName(e)},g=[],h=[":focus"],(T.qsa=rt(n.querySelectorAll))&&(at(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||h.push("\\["+_+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||h.push(":checked")}),at(function(e){e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&h.push("[*^$]="+_+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||h.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),h.push(",.*:")})),(T.matchesSelector=rt(m=f.matchesSelector||f.mozMatchesSelector||f.webkitMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&at(function(e){T.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",R)}),h=RegExp(h.join("|")),g=RegExp(g.join("|")),y=rt(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},v=f.compareDocumentPosition?function(e,t){var r;return e===t?(u=!0,0):(r=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&r||e.parentNode&&11===e.parentNode.nodeType?e===n||y(w,e)?-1:t===n||y(w,t)?1:0:4&r?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return u=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:0;if(o===a)return ut(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?ut(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},u=!1,[0,0].sort(v),T.detectDuplicates=u,p):p},st.matches=function(e,t){return st(e,null,null,t)},st.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Z,"='$1']"),!(!T.matchesSelector||d||g&&g.test(t)||h.test(t)))try{var n=m.call(e,t);if(n||T.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return st(t,p,null,[e]).length>0},st.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},st.attr=function(e,t){var n;return(e.ownerDocument||e)!==p&&c(e),d||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):d||T.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},st.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},st.uniqueSort=function(e){var t,n=[],r=1,i=0;if(u=!T.detectDuplicates,e.sort(v),u){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e};function ut(e,t){var n=t&&e,r=n&&(~t.sourceIndex||j)-(~e.sourceIndex||j);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function lt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ct(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function pt(e){return ot(function(t){return t=+t,ot(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}o=st.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=st.selectors={cacheLength:50,createPseudo:ot,match:U,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(et,tt),e[3]=(e[4]||e[5]||"").replace(et,tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||st.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&st.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return U.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&z.test(n)&&(t=ft(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return"*"===e?function(){return!0}:(e=e.replace(et,tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[e+" "];return t||(t=RegExp("(^|"+_+")"+e+"("+_+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==A&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=st.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[x]||(m[x]={}),l=c[e]||[],d=l[0]===N&&l[1],f=l[0]===N&&l[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[N,d,f];break}}else if(v&&(l=(t[x]||(t[x]={}))[e])&&l[0]===N)f=l[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[x]||(p[x]={}))[e]=[N,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||st.error("unsupported pseudo: "+e);return r[x]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ot(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=M.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ot(function(e){var t=[],n=[],r=s(e.replace(W,"$1"));return r[x]?ot(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ot(function(e){return function(t){return st(e,t).length>0}}),contains:ot(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:ot(function(e){return X.test(e||"")||st.error("unsupported lang: "+e),e=e.replace(et,tt).toLowerCase(),function(t){var n;do if(n=d?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang)return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return Q.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:pt(function(){return[0]}),last:pt(function(e,t){return[t-1]}),eq:pt(function(e,t,n){return[0>n?n+t:n]}),even:pt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:pt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:pt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:pt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[n]=lt(n);for(n in{submit:!0,reset:!0})i.pseudos[n]=ct(n);function ft(e,t){var n,r,o,a,s,u,l,c=E[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=i.preFilter;while(s){(!n||(r=$.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(o=[])),n=!1,(r=I.exec(s))&&(n=r.shift(),o.push({value:n,type:r[0].replace(W," ")}),s=s.slice(n.length));for(a in i.filter)!(r=U[a].exec(s))||l[a]&&!(r=l[a](r))||(n=r.shift(),o.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?st.error(e):E(e,u).slice(0)}function dt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function ht(e,t,n){var i=t.dir,o=n&&"parentNode"===i,a=C++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,s){var u,l,c,p=N+" "+a;if(s){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[x]||(t[x]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,s)||r,l[1]===!0)return!0}}function gt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function mt(e,t,n,r,i){var o,a=[],s=0,u=e.length,l=null!=t;for(;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function yt(e,t,n,r,i,o){return r&&!r[x]&&(r=yt(r)),i&&!i[x]&&(i=yt(i,o)),ot(function(o,a,s,u){var l,c,p,f=[],d=[],h=a.length,g=o||xt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:mt(g,f,e,s,u),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,u),r){l=mt(y,d),r(l,[],s,u),c=l.length;while(c--)(p=l[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?M.call(o,p):f[c])>-1&&(o[l]=!(a[l]=p))}}else y=mt(y===a?y.splice(h,y.length):y),i?i(null,a,y,u):H.apply(a,y)})}function vt(e){var t,n,r,o=e.length,a=i.relative[e[0].type],s=a||i.relative[" "],u=a?1:0,c=ht(function(e){return e===t},s,!0),p=ht(function(e){return M.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>u;u++)if(n=i.relative[e[u].type])f=[ht(gt(f),n)];else{if(n=i.filter[e[u].type].apply(null,e[u].matches),n[x]){for(r=++u;o>r;r++)if(i.relative[e[r].type])break;return yt(u>1&&gt(f),u>1&&dt(e.slice(0,u-1)).replace(W,"$1"),n,r>u&&vt(e.slice(u,r)),o>r&&vt(e=e.slice(r)),o>r&&dt(e))}f.push(n)}return gt(f)}function bt(e,t){var n=0,o=t.length>0,a=e.length>0,s=function(s,u,c,f,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,T=l,C=s||a&&i.find.TAG("*",d&&u.parentNode||u),k=N+=null==T?1:Math.random()||.1;for(w&&(l=u!==p&&u,r=n);null!=(h=C[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,u,c)){f.push(h);break}w&&(N=k,r=++n)}o&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,o&&b!==v){g=0;while(m=t[g++])m(x,y,u,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=L.call(f));y=mt(y)}H.apply(f,y),w&&!s&&y.length>0&&v+t.length>1&&st.uniqueSort(f)}return w&&(N=k,l=T),x};return o?ot(s):s}s=st.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=ft(e)),n=t.length;while(n--)o=vt(t[n]),o[x]?r.push(o):i.push(o);o=S(e,bt(i,r))}return o};function xt(e,t,n){var r=0,i=t.length;for(;i>r;r++)st(e,t[r],n);return n}function wt(e,t,n,r){var o,a,u,l,c,p=ft(e);if(!r&&1===p.length){if(a=p[0]=p[0].slice(0),a.length>2&&"ID"===(u=a[0]).type&&9===t.nodeType&&!d&&i.relative[a[1].type]){if(t=i.find.ID(u.matches[0].replace(et,tt),t)[0],!t)return n;e=e.slice(a.shift().value.length)}o=U.needsContext.test(e)?0:a.length;while(o--){if(u=a[o],i.relative[l=u.type])break;if((c=i.find[l])&&(r=c(u.matches[0].replace(et,tt),V.test(a[0].type)&&t.parentNode||t))){if(a.splice(o,1),e=r.length&&dt(a),!e)return H.apply(n,q.call(r,0)),n;break}}}return s(e,p)(r,t,d,n,V.test(e)),n}i.pseudos.nth=i.pseudos.eq;function Tt(){}i.filters=Tt.prototype=i.pseudos,i.setFilters=new Tt,c(),st.attr=b.attr,b.find=st,b.expr=st.selectors,b.expr[":"]=b.expr.pseudos,b.unique=st.uniqueSort,b.text=st.getText,b.isXMLDoc=st.isXML,b.contains=st.contains}(e);var at=/Until$/,st=/^(?:parents|prev(?:Until|All))/,ut=/^.[^:#\[\.,]*$/,lt=b.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};b.fn.extend({find:function(e){var t,n,r,i=this.length;if("string"!=typeof e)return r=this,this.pushStack(b(e).filter(function(){for(t=0;i>t;t++)if(b.contains(r[t],this))return!0}));for(n=[],t=0;i>t;t++)b.find(e,this[t],n);return n=this.pushStack(i>1?b.unique(n):n),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t,n=b(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(b.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1))},filter:function(e){return this.pushStack(ft(this,e,!0))},is:function(e){return!!e&&("string"==typeof e?lt.test(e)?b(e,this.context).index(this[0])>=0:b.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,o=[],a=lt.test(e)||"string"!=typeof e?b(e,t||this.context):0;for(;i>r;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&11!==n.nodeType){if(a?a.index(n)>-1:b.find.matchesSelector(n,e)){o.push(n);break}n=n.parentNode}}return this.pushStack(o.length>1?b.unique(o):o)},index:function(e){return e?"string"==typeof e?b.inArray(this[0],b(e)):b.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?b(e,t):b.makeArray(e&&e.nodeType?[e]:e),r=b.merge(this.get(),n);return this.pushStack(b.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),b.fn.andSelf=b.fn.addBack;function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}b.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return b.dir(e,"parentNode")},parentsUntil:function(e,t,n){return b.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return b.dir(e,"nextSibling")},prevAll:function(e){return b.dir(e,"previousSibling")},nextUntil:function(e,t,n){return b.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return b.dir(e,"previousSibling",n)},siblings:function(e){return b.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return b.sibling(e.firstChild)},contents:function(e){return b.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:b.merge([],e.childNodes)}},function(e,t){b.fn[e]=function(n,r){var i=b.map(this,t,n);return at.test(e)||(r=n),r&&"string"==typeof r&&(i=b.filter(r,i)),i=this.length>1&&!ct[e]?b.unique(i):i,this.length>1&&st.test(e)&&(i=i.reverse()),this.pushStack(i)}}),b.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),1===t.length?b.find.matchesSelector(t[0],e)?[t[0]]:[]:b.find.matches(e,t)},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!b(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(t=t||0,b.isFunction(t))return b.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return b.grep(e,function(e){return e===t===n});if("string"==typeof t){var r=b.grep(e,function(e){return 1===e.nodeType});if(ut.test(t))return b.filter(t,r,!n);t=b.filter(t,r)}return b.grep(e,function(e){return b.inArray(e,t)>=0===n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Nt=/^(?:checkbox|radio)$/i,Ct=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:b.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(o),Dt=jt.appendChild(o.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,b.fn.extend({text:function(e){return b.access(this,function(e){return e===t?b.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(b.isFunction(e))return this.each(function(t){b(this).wrapAll(e.call(this,t))});if(this[0]){var t=b(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return b.isFunction(e)?this.each(function(t){b(this).wrapInner(e.call(this,t))}):this.each(function(){var t=b(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=b.isFunction(e);return this.each(function(n){b(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){b.nodeName(this,"body")||b(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=0;for(;null!=(n=this[r]);r++)(!e||b.filter(e,[n]).length>0)&&(t||1!==n.nodeType||b.cleanData(Ot(n)),n.parentNode&&(t&&b.contains(n.ownerDocument,n)&&Mt(Ot(n,"script")),n.parentNode.removeChild(n)));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&b.cleanData(Ot(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&b.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return b.clone(this,e,t)})},html:function(e){return b.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!b.support.htmlSerialize&&mt.test(e)||!b.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(b.cleanData(Ot(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=b.isFunction(e);return t||"string"==typeof e||(e=b(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;n&&(b(this).remove(),n.insertBefore(e,t))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=f.apply([],e);var i,o,a,s,u,l,c=0,p=this.length,d=this,h=p-1,g=e[0],m=b.isFunction(g);if(m||!(1>=p||"string"!=typeof g||b.support.checkClone)&&Ct.test(g))return this.each(function(i){var o=d.eq(i);m&&(e[0]=g.call(this,i,n?o.html():t)),o.domManip(e,n,r)});if(p&&(l=b.buildFragment(e,this[0].ownerDocument,!1,this),i=l.firstChild,1===l.childNodes.length&&(l=i),i)){for(n=n&&b.nodeName(i,"tr"),s=b.map(Ot(l,"script"),Ht),a=s.length;p>c;c++)o=l,c!==h&&(o=b.clone(o,!0,!0),a&&b.merge(s,Ot(o,"script"))),r.call(n&&b.nodeName(this[c],"table")?Lt(this[c],"tbody"):this[c],o,c);if(a)for(u=s[s.length-1].ownerDocument,b.map(s,qt),c=0;a>c;c++)o=s[c],kt.test(o.type||"")&&!b._data(o,"globalEval")&&b.contains(u,o)&&(o.src?b.ajax({url:o.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):b.globalEval((o.text||o.textContent||o.innerHTML||"").replace(St,"")));l=i=null}return this}});function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function Ht(e){var t=e.getAttributeNode("type");return e.type=(t&&t.specified)+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function Mt(e,t){var n,r=0;for(;null!=(n=e[r]);r++)b._data(n,"globalEval",!t||b._data(t[r],"globalEval"))}function _t(e,t){if(1===t.nodeType&&b.hasData(e)){var n,r,i,o=b._data(e),a=b._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)b.event.add(t,n,s[n][r])}a.data&&(a.data=b.extend({},a.data))}}function Ft(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!b.support.noCloneEvent&&t[b.expando]){i=b._data(t);for(r in i.events)b.removeEvent(t,r,i.handle);t.removeAttribute(b.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),b.support.html5Clone&&e.innerHTML&&!b.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Nt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}b.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){b.fn[e]=function(e){var n,r=0,i=[],o=b(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),b(o[r])[t](n),d.apply(i,n.get());return this.pushStack(i)}});function Ot(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||b.nodeName(o,n)?s.push(o):b.merge(s,Ot(o,n));return n===t||n&&b.nodeName(e,n)?b.merge([e],s):s}function Bt(e){Nt.test(e.type)&&(e.defaultChecked=e.checked)}b.extend({clone:function(e,t,n){var r,i,o,a,s,u=b.contains(e.ownerDocument,e);if(b.support.html5Clone||b.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(b.support.noCloneEvent&&b.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||b.isXMLDoc(e)))for(r=Ot(o),s=Ot(e),a=0;null!=(i=s[a]);++a)r[a]&&Ft(i,r[a]);if(t)if(n)for(s=s||Ot(e),r=r||Ot(o),a=0;null!=(i=s[a]);a++)_t(i,r[a]);else _t(e,o);return r=Ot(o,"script"),r.length>0&&Mt(r,!u&&Ot(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,u,l,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===b.type(o))b.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),u=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[u]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!b.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!b.support.tbody){o="table"!==u||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)b.nodeName(l=o.childNodes[i],"tbody")&&!l.childNodes.length&&o.removeChild(l)
}b.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),b.support.appendChecked||b.grep(Ot(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===b.inArray(o,r))&&(a=b.contains(o.ownerDocument,o),s=Ot(f.appendChild(o),"script"),a&&Mt(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,u=b.expando,l=b.cache,p=b.support.deleteExpando,f=b.event.special;for(;null!=(n=e[s]);s++)if((t||b.acceptData(n))&&(o=n[u],a=o&&l[o])){if(a.events)for(r in a.events)f[r]?b.event.remove(n,r):b.removeEvent(n,r,a.handle);l[o]&&(delete l[o],p?delete n[u]:typeof n.removeAttribute!==i?n.removeAttribute(u):n[u]=null,c.push(o))}}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+x+")(.*)$","i"),Yt=RegExp("^("+x+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+x+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===b.css(e,"display")||!b.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=b._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=b._data(r,"olddisplay",un(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&b._data(r,"olddisplay",i?n:b.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}b.fn.extend({css:function(e,n){return b.access(this,function(e,n,r){var i,o,a={},s=0;if(b.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=b.css(e,n[s],!1,o);return a}return r!==t?b.style(e,n,r):b.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:nn(this))?b(this).show():b(this).hide()})}}),b.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":b.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=b.camelCase(n),l=e.style;if(n=b.cssProps[u]||(b.cssProps[u]=tn(l,u)),s=b.cssHooks[n]||b.cssHooks[u],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(b.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||b.cssNumber[u]||(r+="px"),b.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=b.camelCase(n);return n=b.cssProps[u]||(b.cssProps[u]=tn(e.style,u)),s=b.cssHooks[n]||b.cssHooks[u],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||b.isNumeric(o)?o||0:a):a},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(""!==u||b.contains(e.ownerDocument,e)||(u=b.style(e,n)),Yt.test(u)&&Ut.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):o.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),Yt.test(u)&&!zt.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=b.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=b.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=b.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=b.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=b.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(b.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function un(e){var t=o,n=Gt[e];return n||(n=ln(e,t),"none"!==n&&n||(Pt=(Pt||b("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=ln(e,t),Pt.detach()),Gt[e]=n),n}function ln(e,t){var n=b(t.createElement(e)).appendTo(t.body),r=b.css(n[0],"display");return n.remove(),r}b.each(["height","width"],function(e,n){b.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(b.css(e,"display"))?b.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,i),i):0)}}}),b.support.opacity||(b.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=b.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===b.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),b(function(){b.support.reliableMarginRight||(b.cssHooks.marginRight={get:function(e,n){return n?b.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!b.support.pixelPosition&&b.fn.position&&b.each(["top","left"],function(e,n){b.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?b(e).position()[n]+"px":r):t}}})}),b.expr&&b.expr.filters&&(b.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!b.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||b.css(e,"display"))},b.expr.filters.visible=function(e){return!b.expr.filters.hidden(e)}),b.each({margin:"",padding:"",border:"Width"},function(e,t){b.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(b.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;b.fn.extend({serialize:function(){return b.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=b.prop(this,"elements");return e?b.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!b(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Nt.test(e))}).map(function(e,t){var n=b(this).val();return null==n?null:b.isArray(n)?b.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),b.param=function(e,n){var r,i=[],o=function(e,t){t=b.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=b.ajaxSettings&&b.ajaxSettings.traditional),b.isArray(e)||e.jquery&&!b.isPlainObject(e))b.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(b.isArray(t))b.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==b.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){b.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),b.fn.hover=function(e,t){return this.mouseenter(e).mouseleave(t||e)};var mn,yn,vn=b.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Nn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Cn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=b.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=a.href}catch(Ln){yn=o.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(b.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(u){var l;return o[u]=!0,b.each(e[u]||[],function(e,u){var c=u(n,r,i);return"string"!=typeof c||a||o[c]?a?!(l=c):t:(n.dataTypes.unshift(c),s(c),!1)}),l}return s(n.dataTypes[0])||!o["*"]&&s("*")}function Mn(e,n){var r,i,o=b.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&b.extend(!0,e,r),e}b.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(" ");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),b.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&b.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?b("<div>").append(b.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},b.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){b.fn[t]=function(e){return this.on(t,e)}}),b.each(["get","post"],function(e,n){b[n]=function(e,r,i,o){return b.isFunction(r)&&(o=o||i,i=r,r=t),b.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),b.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Nn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":b.parseJSON,"text xml":b.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Mn(Mn(e,b.ajaxSettings),t):Mn(b.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,u,l,c,p=b.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?b(f):b.event,h=b.Deferred(),g=b.Callbacks("once memory"),m=p.statusCode||{},y={},v={},x=0,T="canceled",N={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)m[t]=[m[t],e[t]];else N.always(e[N.status]);return this},abort:function(e){var t=e||T;return l&&l.abort(t),k(0,t),this}};if(h.promise(N).complete=g.add,N.success=N.done,N.error=N.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=b.trim(p.dataType||"*").toLowerCase().match(w)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?80:443))==(mn[3]||("http:"===mn[1]?80:443)))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=b.param(p.data,p.traditional)),qn(An,p,n,N),2===x)return N;u=p.global,u&&0===b.active++&&b.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Cn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(b.lastModified[o]&&N.setRequestHeader("If-Modified-Since",b.lastModified[o]),b.etag[o]&&N.setRequestHeader("If-None-Match",b.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&N.setRequestHeader("Content-Type",p.contentType),N.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)N.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,N,p)===!1||2===x))return N.abort();T="abort";for(i in{success:1,error:1,complete:1})N[i](p[i]);if(l=qn(jn,p,n,N)){N.readyState=1,u&&d.trigger("ajaxSend",[N,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){N.abort("timeout")},p.timeout));try{x=1,l.send(y,k)}catch(C){if(!(2>x))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,C=n;2!==x&&(x=2,s&&clearTimeout(s),l=t,a=i||"",N.readyState=e>0?4:0,r&&(w=_n(p,N,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=N.getResponseHeader("Last-Modified"),T&&(b.lastModified[o]=T),T=N.getResponseHeader("etag"),T&&(b.etag[o]=T)),204===e?(c=!0,C="nocontent"):304===e?(c=!0,C="notmodified"):(c=Fn(p,w),C=c.state,y=c.data,v=c.error,c=!v)):(v=C,(e||!C)&&(C="error",0>e&&(e=0))),N.status=e,N.statusText=(n||C)+"",c?h.resolveWith(f,[y,C,N]):h.rejectWith(f,[N,C,v]),N.statusCode(m),m=t,u&&d.trigger(c?"ajaxSuccess":"ajaxError",[N,p,c?y:v]),g.fireWith(f,[N,C]),u&&(d.trigger("ajaxComplete",[N,p]),--b.active||b.event.trigger("ajaxStop")))}return N},getScript:function(e,n){return b.get(e,t,n,"script")},getJSON:function(e,t,n){return b.get(e,t,n,"json")}});function _n(e,n,r){var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;for(s in c)s in r&&(n[c[s]]=r[s]);while("*"===l[0])l.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in u)if(u[s]&&u[s].test(o)){l.unshift(s);break}if(l[0]in r)a=l[0];else{for(s in r){if(!l[0]||e.converters[s+" "+l[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==l[0]&&l.unshift(a),r[a]):t}function Fn(e,t){var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1])for(i in e.converters)a[i.toLowerCase()]=e.converters[i];for(;r=u[++s];)if("*"!==r){if("*"!==l&&l!==r){if(i=a[l+" "+r]||a["* "+r],!i)for(n in a)if(o=n.split(" "),o[1]===r&&(i=a[l+" "+o[0]]||a["* "+o[0]])){i===!0?i=a[n]:a[n]!==!0&&(r=o[0],u.splice(s--,0,r));break}if(i!==!0)if(i&&e["throws"])t=i(t);else try{t=i(t)}catch(c){return{state:"parsererror",error:i?c:"No conversion from "+l+" to "+r}}}l=r}return{state:"success",data:t}}b.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return b.globalEval(e),e}}}),b.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),b.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=o.head||b("head")[0]||o.documentElement;return{send:function(t,i){n=o.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var On=[],Bn=/(=)\?(?=&|$)|\?\?/;b.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=On.pop()||b.expando+"_"+vn++;return this[e]=!0,e}}),b.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=b.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||b.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,On.push(o)),s&&b.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}b.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=b.ajaxSettings.xhr(),b.support.cors=!!Rn&&"withCredentials"in Rn,Rn=b.support.ajax=!!Rn,Rn&&b.ajaxTransport(function(n){if(!n.crossDomain||b.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,p;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=b.noop,$n&&delete Pn[a]),i)4!==u.readyState&&u.abort();else{p={},s=u.status,l=u.getAllResponseHeaders(),"string"==typeof u.responseText&&(p.text=u.responseText);try{c=u.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,l)},n.async?4===u.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},b(e).unload($n)),Pn[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+x+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n,r,i=this.createTween(e,t),o=Yn.exec(t),a=i.cur(),s=+a||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(b.cssNumber[e]?"":"px"),"px"!==r&&s){s=b.css(i.elem,e,!0)||n||1;do u=u||".5",s/=u,b.style(i.elem,e,s+r);while(u!==(u=i.cur()/a)&&1!==u&&--l)}i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n}return i}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=b.now()}function Zn(e,t){b.each(t,function(t,n){var r=(Qn[t]||[]).concat(Qn["*"]),i=0,o=r.length;for(;o>i;i++)if(r[i].call(e,t,n))return})}function er(e,t,n){var r,i,o=0,a=Gn.length,s=b.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;for(;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:b.extend({},t),opts:b.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=b.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(tr(c,l.opts.specialEasing);a>o;o++)if(r=Gn[o].call(l,e,c,l.opts))return r;return Zn(l,c),b.isFunction(l.opts.start)&&l.opts.start.call(e,l),b.fx.timer(b.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function tr(e,t){var n,r,i,o,a;for(i in e)if(r=b.camelCase(i),o=t[r],n=e[i],b.isArray(n)&&(o=n[1],n=e[i]=n[0]),i!==r&&(e[r]=n,delete e[i]),a=b.cssHooks[r],a&&"expand"in a){n=a.expand(n),delete e[r];for(i in n)i in e||(e[i]=n[i],t[i]=o)}else t[r]=o}b.Animation=b.extend(er,{tweener:function(e,t){b.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,u,l,c,p,f=this,d=e.style,h={},g=[],m=e.nodeType&&nn(e);n.queue||(c=b._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,p=c.empty.fire,c.empty.fire=function(){c.unqueued||p()}),c.unqueued++,f.always(function(){f.always(function(){c.unqueued--,b.queue(e,"fx").length||c.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],"inline"===b.css(e,"display")&&"none"===b.css(e,"float")&&(b.support.inlineBlockNeedsLayout&&"inline"!==un(e.nodeName)?d.zoom=1:d.display="inline-block")),n.overflow&&(d.overflow="hidden",b.support.shrinkWrapBlocks||f.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(i in t)if(a=t[i],Vn.exec(a)){if(delete t[i],u=u||"toggle"===a,a===(m?"hide":"show"))continue;g.push(i)}if(o=g.length){s=b._data(e,"fxshow")||b._data(e,"fxshow",{}),"hidden"in s&&(m=s.hidden),u&&(s.hidden=!m),m?b(e).show():f.done(function(){b(e).hide()}),f.done(function(){var t;b._removeData(e,"fxshow");for(t in h)b.style(e,t,h[t])});for(i=0;o>i;i++)r=g[i],l=f.createTween(r,m?s[r]:0),h[r]=s[r]||b.style(e,r),r in s||(s[r]=l.start,m&&(l.end=l.start,l.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}b.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(b.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?b.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=b.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){b.fx.step[e.prop]?b.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[b.cssProps[e.prop]]||b.cssHooks[e.prop])?b.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},b.each(["toggle","show","hide"],function(e,t){var n=b.fn[t];b.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),b.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=b.isEmptyObject(e),o=b.speed(t,n,r),a=function(){var t=er(this,b.extend({},e),o);a.finish=function(){t.stop(!0)},(i||b._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=b.timers,a=b._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&b.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=b._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=b.timers,a=r?r.length:0;for(n.finish=!0,b.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}b.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){b.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),b.speed=function(e,t,n){var r=e&&"object"==typeof e?b.extend({},e):{complete:n||!n&&t||b.isFunction(e)&&e,duration:e,easing:n&&t||t&&!b.isFunction(t)&&t};return r.duration=b.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in b.fx.speeds?b.fx.speeds[r.duration]:b.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){b.isFunction(r.old)&&r.old.call(this),r.queue&&b.dequeue(this,r.queue)},r},b.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},b.timers=[],b.fx=rr.prototype.init,b.fx.tick=function(){var e,n=b.timers,r=0;for(Xn=b.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||b.fx.stop(),Xn=t},b.fx.timer=function(e){e()&&b.timers.push(e)&&b.fx.start()},b.fx.interval=13,b.fx.start=function(){Un||(Un=setInterval(b.fx.tick,b.fx.interval))},b.fx.stop=function(){clearInterval(Un),Un=null},b.fx.speeds={slow:600,fast:200,_default:400},b.fx.step={},b.expr&&b.expr.filters&&(b.expr.filters.animated=function(e){return b.grep(b.timers,function(t){return e===t.elem}).length}),b.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){b.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,b.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},b.offset={setOffset:function(e,t,n){var r=b.css(e,"position");"static"===r&&(e.style.position="relative");var i=b(e),o=i.offset(),a=b.css(e,"top"),s=b.css(e,"left"),u=("absolute"===r||"fixed"===r)&&b.inArray("auto",[a,s])>-1,l={},c={},p,f;u?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),b.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(l.top=t.top-o.top+p),null!=t.left&&(l.left=t.left-o.left+f),"using"in t?t.using.call(e,l):i.css(l)}},b.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===b.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),b.nodeName(e[0],"html")||(n=e.offset()),n.top+=b.css(e[0],"borderTopWidth",!0),n.left+=b.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-b.css(r,"marginTop",!0),left:t.left-n.left-b.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||o.documentElement;while(e&&!b.nodeName(e,"html")&&"static"===b.css(e,"position"))e=e.offsetParent;return e||o.documentElement})}}),b.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);b.fn[e]=function(i){return b.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?b(a).scrollLeft():o,r?o:b(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return b.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}b.each({Height:"height",Width:"width"},function(e,n){b.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){b.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return b.access(this,function(n,r,i){var o;return b.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?b.css(n,r,s):b.style(n,r,i,s)},n,a?i:t,a,null)}})}),e.jQuery=e.$=b,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return b})})(window);


/*
 * File: http://d1topzp4nao5hp.cloudfront.net/uranium-upload/0.1.104/uranium-pretty.js
 */
(function () {
/**
  Basics
  ======
    
    xui is available as the global `x$` function. It accepts a CSS selector string or DOM element, or an array of a mix of these, as parameters,
    and returns the xui object. For example:
    
        var header = x$('#header'); // returns the element with id attribute equal to "header".
        
    For more information on CSS selectors, see the [W3C specification](http://www.w3.org/TR/CSS2/selector.html). Please note that there are
    different levels of CSS selector support (Levels 1, 2 and 3) and different browsers support each to different degrees. Be warned!
    
  The functions described in the docs are available on the xui object and often manipulate or retrieve information about the elements in the
  xui collection.

*/
var undefined,
    xui,
    window     = this,
    string     = new String('string'), // prevents Goog compiler from removing primative and subsidising out allowing us to compress further
    document   = window.document,      // obvious really
    simpleExpr = /^#?([\w-]+)$/,   // for situations of dire need. Symbian and the such        
    idExpr     = /^#/,
    tagExpr    = /<([\w:]+)/, // so you can create elements on the fly a la x$('<img href="/foo" /><strong>yay</strong>')
    slice      = function (e) { return [].slice.call(e, 0); };
    try { var a = slice(document.documentElement.childNodes)[0].nodeType; }
    catch(e){ slice = function (e) { var ret=[]; for (var i=0; e[i]; i++) ret.push(e[i]); return ret; }; }

window.x$ = window.xui = xui = function(q, context) {
    return new xui.fn.find(q, context);
};

// patch in forEach to help get the size down a little and avoid over the top currying on event.js and dom.js (shortcuts)
if (! [].forEach) {
    Array.prototype.forEach = function(fn) {
        var len = this.length || 0,
            i = 0,
            that = arguments[1]; // wait, what's that!? awwww rem. here I thought I knew ya!
                                 // @rem - that that is a hat tip to your thats :)

        if (typeof fn == 'function') {
            for (; i < len; i++) {
                fn.call(that, this[i], i, this);
            }
        }
    };
}
/*
 * Array Remove - By John Resig (MIT Licensed) 
 */
function removex(array, from, to) {
    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from: from;
    return array.push.apply(array, rest);
}

// converts all CSS style names to DOM style names, i.e. margin-left to marginLeft
function domstyle(name) {
  return name.replace(/\-[a-z]/g,function(m) { return m[1].toUpperCase(); });
}

// converts all DOM style names to CSS style names, i.e. marginLeft to margin-left
function cssstyle(name) {
  return name.replace(/[A-Z]/g, function(m) { return '-'+m.toLowerCase(); })
}

xui.fn = xui.prototype = {

/**
  extend
  ------

  Extends XUI's prototype with the members of another object.

  ### syntax ###

    xui.extend( object );

  ### arguments ###

  - object `Object` contains the members that will be added to XUI's prototype.
 
  ### example ###

  Given:

    var sugar = {
        first: function() { return this[0]; },
        last:  function() { return this[this.length - 1]; }
    }

  We can extend xui's prototype with members of `sugar` by using `extend`:

    xui.extend(sugar);

  Now we can use `first` and `last` in all instances of xui:

    var f = x$('.button').first();
    var l = x$('.notice').last();
*/
    extend: function(o) {
        for (var i in o) {
            xui.fn[i] = o[i];
        }
    },

/**
  find
  ----

  Find the elements that match a query string. `x$` is an alias for `find`.

  ### syntax ###

    x$( window ).find( selector, context );

  ### arguments ###

  - selector `String` is a CSS selector that will query for elements.
  - context `HTMLElement` is the parent element to search from _(optional)_.
 
  ### example ###

  Given the following markup:

    <ul id="first">
        <li id="one">1</li>
        <li id="two">2</li>
    </ul>
    <ul id="second">
        <li id="three">3</li>
        <li id="four">4</li>
    </ul>

  We can select list items using `find`:

    x$('li');                 // returns all four list item elements.
    x$('#second').find('li'); // returns list items "three" and "four"
*/
    find: function(q, context) {
        var ele = [], tempNode;
            
        if (!q) {
            return this;
        } else if (context == undefined && this.length) {
            ele = this.each(function(el) {
                ele = ele.concat(slice(xui(q, el)));
            }).reduce(ele);
        } else {
            context = context || document;
            // fast matching for pure ID selectors and simple element based selectors
            if (typeof q == string) {
              if (simpleExpr.test(q) && context.getElementById && context.getElementsByTagName) {
                  ele = idExpr.test(q) ? [context.getElementById(q.substr(1))] : context.getElementsByTagName(q);
                  // nuke failed selectors
                  if (ele[0] == null) { 
                    ele = [];
                  }
              // match for full html tags to create elements on the go
              } else if (tagExpr.test(q)) {
                  tempNode = document.createElement('i');
                  tempNode.innerHTML = q;
                  slice(tempNode.childNodes).forEach(function (el) {
                    ele.push(el);
                  });
              } else {
                  // one selector, check if Sizzle is available and use it instead of querySelectorAll.
                  if (window.Sizzle !== undefined) {
                    ele = Sizzle(q, context);
                  } else {
                    ele = context.querySelectorAll(q);
                  }
              }
              // blanket slice
              ele = slice(ele);
            } else if (q instanceof Array) {
                ele = q;
            } else if (q.nodeName || q === window) { // only allows nodes in
                // an element was passed in
                ele = [q];
            } else if (q.toString() == '[object NodeList]' ||
q.toString() == '[object HTMLCollection]' || typeof q.length == 'number') {
                ele = slice(q);
            }
        }
        // disabling the append style, could be a plugin (found in more/base):
        // xui.fn.add = function (q) { this.elements = this.elements.concat(this.reduce(xui(q).elements)); return this; }
        return this.set(ele);
    },

/**
  set
  ---

  Sets the objects in the xui collection.

  ### syntax ###

    x$( window ).set( array );
*/
    set: function(elements) {
        var ret = xui();
        ret.cache = slice(this.length ? this : []);
        ret.length = 0;
        [].push.apply(ret, elements);
        return ret;
    },

/**
  reduce
  ------

  Reduces the set of elements in the xui object to a unique set.

  ### syntax ###

    x$( window ).reduce( elements, index );

  ### arguments ###

  - elements `Array` is an array of elements to reduce _(optional)_.
  - index `Number` is the last array index to include in the reduction. If unspecified, it will reduce all elements _(optional)_.
*/
    reduce: function(elements, b) {
        var a = [],
        elements = elements || slice(this);
        elements.forEach(function(el) {
            // question the support of [].indexOf in older mobiles (RS will bring up 5800 to test)
            if (a.indexOf(el, 0, b) < 0)
            a.push(el);
        });

        return a;
    },

/**
  has
  ---

  Returns the elements that match a given CSS selector.

  ### syntax ###

    x$( window ).has( selector );

  ### arguments ###

  - selector `String` is a CSS selector that will match all children of the xui collection.

  ### example ###

  Given:

    <div>
        <div class="round">Item one</div>
        <div class="round">Item two</div>
    </div>
  
  We can use `has` to select specific objects:

    var divs    = x$('div');          // got all three divs.
    var rounded = divs.has('.round'); // got two divs with the class .round
*/
     has: function(q) {
         var list = xui(q);
         return this.filter(function () {
             var that = this;
             var found = null;
             list.each(function (el) {
                 found = (found || el == that);
             });
             return found;
         });
     },

/**
  filter
  ------

  Extend XUI with custom filters. This is an interal utility function, but is also useful to developers.

  ### syntax ###

    x$( window ).filter( fn );

  ### arguments ###

  - fn `Function` is called for each element in the XUI collection.

          // `index` is the array index of the current element
          function( index ) {
              // `this` is the element iterated on
              // return true to add element to new XUI collection
          }

  ### example ###

  Filter all the `<input />` elements that are disabled:

    x$('input').filter(function(index) {
        return this.checked;
    });
*/
    filter: function(fn) {
        var elements = [];
        return this.each(function(el, i) {
            if (fn.call(el, i)) elements.push(el);
        }).set(elements);
    },

/**
  not
  ---

  The opposite of `has`. It modifies the elements and returns all of the elements that do __not__ match a CSS query.

  ### syntax ###

    x$( window ).not( selector );

  ### arguments ###

  - selector `String` a CSS selector for the elements that should __not__ be matched.

  ### example ###

  Given:

    <div>
        <div class="round">Item one</div>
        <div class="round">Item two</div>
        <div class="square">Item three</div>
        <div class="shadow">Item four</div>
    </div>

  We can use `not` to select objects:

    var divs     = x$('div');          // got all four divs.
    var notRound = divs.not('.round'); // got two divs with classes .square and .shadow
*/
    not: function(q) {
        var list = slice(this),
            omittedNodes = xui(q);
        if (!omittedNodes.length) {
            return this;
        }
        return this.filter(function(i) {
            var found;
            omittedNodes.each(function(el) {
                return found = list[i] != el;
            });
            return found;
        });
    },

/**
  each
  ----

  Element iterator for an XUI collection.

  ### syntax ###

    x$( window ).each( fn )

  ### arguments ###

  - fn `Function` callback that is called once for each element.

        // `element` is the current element
        // `index` is the element index in the XUI collection
        // `xui` is the XUI collection.
        function( element, index, xui ) {
            // `this` is the current element
        }

  ### example ###

    x$('div').each(function(element, index, xui) {
        alert("Here's the " + index + " element: " + element);
    });
*/
    each: function(fn) {
        // we could compress this by using [].forEach.call - but we wouldn't be able to support
        // fn return false breaking the loop, a feature I quite like.
        for (var i = 0, len = this.length; i < len; ++i) {
            if (fn.call(this[i], this[i], i, this) === false)
            break;
        }
        return this;
    }
};

xui.fn.find.prototype = xui.fn;
xui.extend = xui.fn.extend;
/**
  DOM
  ===

  Set of methods for manipulating the Document Object Model (DOM).

*/
xui.extend({
/**
  html
  ----

  Manipulates HTML in the DOM. Also just returns the inner HTML of elements in the collection if called with no arguments.

  ### syntax ###

    x$( window ).html( location, html );

  or this method will accept just a HTML fragment with a default behavior of inner:

    x$( window ).html( html );

  or you can use shorthand syntax by using the location name argument as the function name:

    x$( window ).outer( html );
    x$( window ).before( html );
  
  or you can just retrieve the inner HTML of elements in the collection with:
  
      x$( document.body ).html();

  ### arguments ###

  - location `String` can be one of: _inner_, _outer_, _top_, _bottom_, _remove_, _before_ or _after_.
  - html `String` is a string of HTML markup or a `HTMLElement`.

  ### example ###

    x$('#foo').html('inner', '<strong>rock and roll</strong>');
    x$('#foo').html('outer', '<p>lock and load</p>');
    x$('#foo').html('top',   '<div>bangers and mash</div>');
    x$('#foo').html('bottom','<em>mean and clean</em>');
    x$('#foo').html('remove');
    x$('#foo').html('before', '<p>some warmup html</p>');
    x$('#foo').html('after',  '<p>more html!</p>');

  or

    x$('#foo').html('<p>sweet as honey</p>');
    x$('#foo').outer('<p>free as a bird</p>');
    x$('#foo').top('<b>top of the pops</b>');
    x$('#foo').bottom('<span>bottom of the barrel</span>');
    x$('#foo').before('<pre>first in line</pre>');
    x$('#foo').after('<marquee>better late than never</marquee>');
*/
    html: function(location, html) {
        clean(this);

        if (arguments.length == 0) {
            var i = [];
            this.each(function(el) {
                i.push(el.innerHTML);
            });
            return i;
        }
        if (arguments.length == 1 && arguments[0] != 'remove') {
            html = location;
            location = 'inner';
        }
        if (location != 'remove' && html && html.each !== undefined) {
            if (location == 'inner') {
                var d = document.createElement('p');
                html.each(function(el) {
                    d.appendChild(el);
                });
                this.each(function(el) {
                    el.innerHTML = d.innerHTML;
                });
            } else {
                var that = this;
                html.each(function(el){
                    that.html(location, el);
                });
            }
            return this;
        }
        return this.each(function(el) {
            var parent, 
                list, 
                len, 
                i = 0;
            if (location == "inner") { // .html
                if (typeof html == string || typeof html == "number") {
                    el.innerHTML = html;
                    list = el.getElementsByTagName('SCRIPT');
                    len = list.length;
                    for (; i < len; i++) {
                        eval(list[i].text);
                    }
                } else {
                    el.innerHTML = '';
                    el.appendChild(html);
                }
            } else {
              if (location == 'remove') {
                el.parentNode.removeChild(el);
              } else {
                var elArray = ['outer', 'top', 'bottom'],
                    wrappedE = wrapHelper(html, (elArray.indexOf(location) > -1 ? el : el.parentNode )),
                    children = wrappedE.childNodes;
                if (location == "outer") { // .replaceWith
                  el.parentNode.replaceChild(wrappedE, el);
                } else if (location == "top") { // .prependTo
                    el.insertBefore(wrappedE, el.firstChild);
                } else if (location == "bottom") { // .appendTo
                    el.insertBefore(wrappedE, null);
                } else if (location == "before") { // .insertBefore
                    el.parentNode.insertBefore(wrappedE, el);
                } else if (location == "after") { // .insertAfter
                    el.parentNode.insertBefore(wrappedE, el.nextSibling);
                }
                var parent = wrappedE.parentNode;
                while(children.length) {
                  parent.insertBefore(children[0], wrappedE);
                }
                parent.removeChild(wrappedE);
              }
            }
        });
    },

/**
  attr
  ----

  Gets or sets attributes on elements. If getting, returns an array of attributes matching the xui element collection's indices.

  ### syntax ###

    x$( window ).attr( attribute, value );

  ### arguments ###

  - attribute `String` is the name of HTML attribute to get or set.
  - value `Varies` is the value to set the attribute to. Do not use to get the value of attribute _(optional)_.

  ### example ###

  To get an attribute value, simply don't provide the optional second parameter:

    x$('.someClass').attr('class');

  To set an attribute, use both parameters:

    x$('.someClass').attr('disabled', 'disabled');
*/
    attr: function(attribute, val) {
        if (arguments.length == 2) {
            return this.each(function(el) {
                if (el.tagName && el.tagName.toLowerCase() == 'input' && attribute == 'value') el.value = val;
                else if (el.setAttribute) {
                  if (attribute == 'checked' && (val == '' || val == false || typeof val == "undefined")) el.removeAttribute(attribute);
                  else el.setAttribute(attribute, val);
                }
            });
        } else {
            var attrs = [];
            this.each(function(el) {
                if (el.tagName && el.tagName.toLowerCase() == 'input' && attribute == 'value') attrs.push(el.value);
                else if (el.getAttribute && el.getAttribute(attribute)) {
                    attrs.push(el.getAttribute(attribute));
                }
            });
            return attrs;
        }
    }
});
"inner outer top bottom remove before after".split(' ').forEach(function (method) {
  xui.fn[method] = function(where) { return function (html) { return this.html(where, html); }; }(method);
});
// private method for finding a dom element
function getTag(el) {
    return (el.firstChild === null) ? {'UL':'LI','DL':'DT','TR':'TD'}[el.tagName] || el.tagName : el.firstChild.tagName;
}

function wrapHelper(html, el) {
  if (typeof html == string) return wrap(html, getTag(el));
  else { var e = document.createElement('div'); e.appendChild(html); return e; }
}

// private method
// Wraps the HTML in a TAG, Tag is optional
// If the html starts with a Tag, it will wrap the context in that tag.
function wrap(xhtml, tag) {
  var e = document.createElement('div');
  e.innerHTML = xhtml;
  return e;
}

/*
* Removes all erronious nodes from the DOM.
* 
*/
function clean(collection) {
    var ns = /\S/;
    collection.each(function(el) {
        var d = el,
            n = d.firstChild,
            ni = -1,
            nx;
        while (n) {
            nx = n.nextSibling;
            if (n.nodeType == 3 && !ns.test(n.nodeValue)) {
                d.removeChild(n);
            } else {
                n.nodeIndex = ++ni; // FIXME not sure what this is for, and causes IE to bomb (the setter) - @rem
            }
            n = nx;
        }
    });
}
/**
  Event
  =====

  A good old fashioned events with new skool handling. Shortcuts exist for:

  - click
  - load
  - touchstart
  - touchmove
  - touchend
  - touchcancel
  - gesturestart
  - gesturechange
  - gestureend
  - orientationchange
  
*/
xui.events = {}; var cache = {};
xui.extend({

/**
  on
  --

  Registers a callback function to a DOM event on the element collection.

  ### syntax ###

    x$( 'button' ).on( type, fn );

  or

    x$( 'button' ).click( fn );

  ### arguments ###

  - type `String` is the event to subscribe (e.g. _load_, _click_, _touchstart_, etc).
  - fn `Function` is a callback function to execute when the event is fired.

  ### example ###

    x$( 'button' ).on( 'click', function(e) {
        alert('hey that tickles!');
    });

  or

    x$(window).load(function(e) {
      x$('.save').touchstart( function(evt) { alert('tee hee!'); }).css(background:'grey');
    });
*/
    on: function(type, fn, details) {
        return this.each(function (el) {
            if (xui.events[type]) {
                var id = _getEventID(el), 
                    responders = _getRespondersForEvent(id, type);
                
                details = details || {};
                details.handler = function (event, data) {
                    xui.fn.fire.call(xui(this), type, data);
                };
                
                // trigger the initialiser - only happens the first time around
                if (!responders.length) {
                    xui.events[type].call(el, details);
                }
            } 
            el.addEventListener(type, _createResponder(el, type, fn), false);
        });
    },

/**
  un
  --

  Unregisters a specific callback, or if no specific callback is passed in, 
  unregisters all event callbacks of a specific type.

  ### syntax ###

  Unregister the given function, for the given type, on all button elements:

    x$( 'button' ).un( type, fn );

  Unregisters all callbacks of the given type, on all button elements:

    x$( 'button' ).un( type );

  ### arguments ###

  - type `String` is the event to unsubscribe (e.g. _load_, _click_, _touchstart_, etc).
  - fn `Function` is the callback function to unsubscribe _(optional)_.

  ### example ###

    // First, create a click event that display an alert message
    x$('button').on('click', function() {
        alert('hi!');
    });
    
    // Now unsubscribe all functions that response to click on all button elements
    x$('button').un('click');

  or

    var greeting = function() { alert('yo!'); };
    
    x$('button').on('click', greeting);
    x$('button').on('click', function() {
        alert('hi!');
    });
    
    // When any button is clicked, the 'hi!' message will fire, but not the 'yo!' message.
    x$('button').un('click', greeting);
*/
    un: function(type, fn) {
        return this.each(function (el) {
            var id = _getEventID(el), responders = _getRespondersForEvent(id, type), i = responders.length;

            while (i--) {
                if (fn === undefined || fn.guid === responders[i].guid) {
                    el.removeEventListener(type, responders[i], false);
                    removex(cache[id][type], i, 1);
                }
            }

            if (cache[id][type].length === 0) delete cache[id][type];
            for (var t in cache[id]) {
                return;
            }
            delete cache[id];
        });
    },

/**
  fire
  ----

  Triggers a specific event on the xui collection.

  ### syntax ###

    x$( selector ).fire( type, data );

  ### arguments ###

  - type `String` is the event to fire (e.g. _load_, _click_, _touchstart_, etc).
  - data `Object` is a JSON object to use as the event's `data` property.

  ### example ###

    x$('button#reset').fire('click', { died:true });
    
    x$('.target').fire('touchstart');
*/
    fire: function (type, data) {
        return this.each(function (el) {
            if (el == document && !el.dispatchEvent)
                el = document.documentElement;

            var event = document.createEvent('HTMLEvents');
            event.initEvent(type, true, true);
            event.data = data || {};
            event.eventName = type;
          
            el.dispatchEvent(event);
        });
    }
});

"click load submit touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend orientationchange".split(' ').forEach(function (event) {
  xui.fn[event] = function(action) { return function (fn) { return fn ? this.on(action, fn) : this.fire(action); }; }(event);
});

// patched orientation support - Andriod 1 doesn't have native onorientationchange events
xui(window).on('load', function() {
    if (!('onorientationchange' in document.body)) {
      (function (w, h) {
        xui(window).on('resize', function () {
          var portraitSwitch = (window.innerWidth < w && window.innerHeight > h) && (window.innerWidth < window.innerHeight),
              landscapeSwitch = (window.innerWidth > w && window.innerHeight < h) && (window.innerWidth > window.innerHeight);
          if (portraitSwitch || landscapeSwitch) {
            window.orientation = portraitSwitch ? 0 : 90; // what about -90? Some support is better than none
            xui('body').fire('orientationchange'); // will this bubble up?
            w = window.innerWidth;
            h = window.innerHeight;
          }
        });
      })(window.innerWidth, window.innerHeight);
    }
});

// this doesn't belong on the prototype, it belongs as a property on the xui object
xui.touch = (function () {
  try{
    return !!(document.createEvent("TouchEvent").initTouchEvent)
  } catch(e) {
    return false;
  };
})();

/**
  ready
  ----

  Event handler for when the DOM is ready. Thank you [domready](http://www.github.com/ded/domready)!

  ### syntax ###

    x$.ready(handler);

  ### arguments ###

  - handler `Function` event handler to be attached to the "dom is ready" event.

  ### example ###

    x$.ready(function() {
      alert('mah doms are ready');
    });

    xui.ready(function() {
      console.log('ready, set, go!');
    });
*/
xui.ready = function(handler) {
  domReady(handler);
}

// lifted from Prototype's (big P) event model
function _getEventID(element) {
    if (element._xuiEventID) return element._xuiEventID;
    return element._xuiEventID = ++_getEventID.id;
}

_getEventID.id = 1;

function _getRespondersForEvent(id, eventName) {
    var c = cache[id] = cache[id] || {};
    return c[eventName] = c[eventName] || [];
}

function _createResponder(element, eventName, handler) {
    var id = _getEventID(element), r = _getRespondersForEvent(id, eventName);

    var responder = function(event) {
        if (handler.call(element, event) === false) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    
    responder.guid = handler.guid = handler.guid || ++_getEventID.id;
    responder.handler = handler;
    r.push(responder);
    return responder;
}
/**
  Fx
  ==

  Animations, transforms, and transitions for getting the most out of hardware accelerated CSS.

*/

xui.extend({

/**
  Tween
  -----

  Transforms a CSS property's value.

  ### syntax ###

    x$( selector ).tween( properties, callback );

  ### arguments ###

  - properties `Object` or `Array` of CSS properties to tween.
      - `Object` is a JSON object that defines the CSS properties.
      - `Array` is a `Object` set that is tweened sequentially.
  - callback `Function` to be called when the animation is complete. _(optional)_.

  ### properties ###

  A property can be any CSS style, referenced by the JavaScript notation.

  A property can also be an option from [emile.js](https://github.com/madrobby/emile):

  - duration `Number` of the animation in milliseconds.
  - after `Function` is called after the animation is finished.
  - easing `Function` allows for the overriding of the built-in animation function.

      // Receives one argument `pos` that indicates position
      // in time between animation's start and end.
      function(pos) {
          // return the new position
          return (-Math.cos(pos * Math.PI) / 2) + 0.5;
      }

  ### example ###

    // one JSON object
    x$('#box').tween({ left:'100px', backgroundColor:'blue' });
    x$('#box').tween({ left:'100px', backgroundColor:'blue' }, function() {
        alert('done!');
    });
    
    // array of two JSON objects
    x$('#box').tween([{left:'100px', backgroundColor:'green', duration:.2 }, { right:'100px' }]); 
*/
  tween: function( props, callback ) {

    // creates an options obj for emile
    var emileOpts = function(o) {
      var options = {};
      "duration after easing".split(' ').forEach( function(p) {
        if (props[p]) {
            options[p] = props[p];
            delete props[p];
        }
      });
      return options;
    }

    // serialize the properties into a string for emile
    var serialize = function(props) {
      var serialisedProps = [], key;
      if (typeof props != string) {
        for (key in props) {
          serialisedProps.push(cssstyle(key) + ':' + props[key]);
        }
        serialisedProps = serialisedProps.join(';');
      } else {
        serialisedProps = props;
      }
      return serialisedProps;
    };

    // queued animations
    /* wtf is this?
    if (props instanceof Array) {
        // animate each passing the next to the last callback to enqueue
        props.forEach(function(a){
          
        });
    }
    */
    // this branch means we're dealing with a single tween
    var opts = emileOpts(props);
    var prop = serialize(props);
    
    return this.each(function(e){
      emile(e, prop, opts, callback);
    });
  }
});
/**
  Style
  =====

  Everything related to appearance. Usually, this is CSS.

*/
function hasClass(el, className) {
    return getClassRegEx(className).test(el.className);
}

// Via jQuery - used to avoid el.className = ' foo';
// Used for trimming whitespace
var rtrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;

function trim(text) {
  return (text || "").replace( rtrim, "" );
}

xui.extend({
/**
  setStyle
  --------

  Sets the value of a single CSS property.

  ### syntax ###

    x$( selector ).setStyle( property, value );

  ### arguments ###

  - property `String` is the name of the property to modify.
  - value `String` is the new value of the property.

  ### example ###

    x$('.flash').setStyle('color', '#000');
    x$('.button').setStyle('backgroundColor', '#EFEFEF');
*/
    setStyle: function(prop, val) {
        prop = domstyle(prop);
        return this.each(function(el) {
            el.style[prop] = val;
        });
    },

/**
  getStyle
  --------

  Returns the value of a single CSS property. Can also invoke a callback to perform more specific processing tasks related to the property value.
  Please note that the return type is always an Array of strings. Each string corresponds to the CSS property value for the element with the same index in the xui collection.

  ### syntax ###

    x$( selector ).getStyle( property, callback );

  ### arguments ###

  - property `String` is the name of the CSS property to get.
  - callback `Function` is called on each element in the collection and passed the property _(optional)_.

  ### example ###
        <ul id="nav">
            <li class="trunk" style="font-size:12px;background-color:blue;">hi</li>
            <li style="font-size:14px;">there</li>
        </ul>
        
    x$('ul#nav li.trunk').getStyle('font-size'); // returns ['12px']
    x$('ul#nav li.trunk').getStyle('fontSize'); // returns ['12px']
    x$('ul#nav li').getStyle('font-size'); // returns ['12px', '14px']
    
    x$('ul#nav li.trunk').getStyle('backgroundColor', function(prop) {
        alert(prop); // alerts 'blue' 
    });
*/
    getStyle: function(prop, callback) {
        // shortcut getComputedStyle function
        var s = function(el, p) {
            // this *can* be written to be smaller - see below, but in fact it doesn't compress in gzip as well, the commented
            // out version actually *adds* 2 bytes.
            // return document.defaultView.getComputedStyle(el, "").getPropertyValue(p.replace(/([A-Z])/g, "-$1").toLowerCase());
            return document.defaultView.getComputedStyle(el, "").getPropertyValue(cssstyle(p));
        }
        if (callback === undefined) {
          var styles = [];
          this.each(function(el) {styles.push(s(el, prop))});
          return styles;
        } else return this.each(function(el) { callback(s(el, prop)); });
    },

/**
  addClass
  --------

  Adds a class to all of the elements in the collection.

  ### syntax ###

    x$( selector ).addClass( className );

  ### arguments ###

  - className `String` is the name of the CSS class to add.

  ### example ###

    x$('.foo').addClass('awesome');
*/
    addClass: function(className) {
        var cs = className.split(' ');
        return this.each(function(el) {
            cs.forEach(function(clazz) {
              if (hasClass(el, clazz) === false) {
                el.className = trim(el.className + ' ' + clazz);
              }
            });
        });
    },

/**
  hasClass
  --------

  Checks if the class is on _all_ elements in the xui collection.

  ### syntax ###

    x$( selector ).hasClass( className, fn );

  ### arguments ###

  - className `String` is the name of the CSS class to find.
  - fn `Function` is a called for each element found and passed the element _(optional)_.

      // `element` is the HTMLElement that has the class
      function(element) {
          console.log(element);
      }

  ### example ###
        <div id="foo" class="foo awesome"></div>
        <div class="foo awesome"></div>
        <div class="foo"></div>
        
    // returns true
    x$('#foo').hasClass('awesome');
    
    // returns false (not all elements with class 'foo' have class 'awesome'),
    // but the callback gets invoked with the elements that did match the 'awesome' class
    x$('.foo').hasClass('awesome', function(element) {
        console.log('Hey, I found: ' + element + ' with class "awesome"');
    });
    
    // returns true (all DIV elements have the 'foo' class)
    x$('div').hasClass('foo');
*/
    hasClass: function(className, callback) {
        var self = this,
            cs = className.split(' ');
        return this.length && (function() {
                var hasIt = true;
                self.each(function(el) {
                  cs.forEach(function(clazz) {
                    if (hasClass(el, clazz)) {
                        if (callback) callback(el);
                    } else hasIt = false;
                  });
                });
                return hasIt;
            })();
    },

/**
  removeClass
  -----------

  Removes the specified class from all elements in the collection. If no class is specified, removes all classes from the collection.

  ### syntax ###

    x$( selector ).removeClass( className );

  ### arguments ###

  - className `String` is the name of the CSS class to remove. If not specified, then removes all classes from the matched elements. _(optional)_

  ### example ###

    x$('.foo').removeClass('awesome');
*/
    removeClass: function(className) {
        if (className === undefined) this.each(function(el) { el.className = ''; });
        else {
          var cs = className.split(' ');
          this.each(function(el) {
            cs.forEach(function(clazz) {
              el.className = trim(el.className.replace(getClassRegEx(clazz), '$1'));
            });
          });
        }
        return this;
    },

/**
  toggleClass
  -----------

  Removes the specified class if it exists on the elements in the xui collection, otherwise adds it. 

  ### syntax ###

    x$( selector ).toggleClass( className );

  ### arguments ###

  - className `String` is the name of the CSS class to toggle.

  ### example ###
        <div class="foo awesome"></div>
        
    x$('.foo').toggleClass('awesome'); // div above loses its awesome class.
*/
    toggleClass: function(className) {
        var cs = className.split(' ');
        return this.each(function(el) {
            cs.forEach(function(clazz) {
              if (hasClass(el, clazz)) el.className = trim(el.className.replace(getClassRegEx(clazz), '$1'));
              else el.className = trim(el.className + ' ' + clazz);
            });
        });
    },
    
/**
  css
  ---

  Set multiple CSS properties at once.

  ### syntax ###

    x$( selector ).css( properties );

  ### arguments ###

  - properties `Object` is a JSON object that defines the property name/value pairs to set.

  ### example ###

    x$('.foo').css({ backgroundColor:'blue', color:'white', border:'2px solid red' });
*/
    css: function(o) {
        for (var prop in o) {
            this.setStyle(prop, o[prop]);
        }
        return this;
    }
});

// RS: now that I've moved these out, they'll compress better, however, do these variables
// need to be instance based - if it's regarding the DOM, I'm guessing it's better they're
// global within the scope of xui

// -- private methods -- //
var reClassNameCache = {},
    getClassRegEx = function(className) {
        var re = reClassNameCache[className];
        if (!re) {
            // Preserve any leading whitespace in the match, to be used when removing a class
            re = new RegExp('(^|\\s+)' + className + '(?:\\s+|$)');
            reClassNameCache[className] = re;
        }
        return re;
    };
/**
  XHR
  ===

  Everything related to remote network connections.

 */
xui.extend({  
/**
  xhr
  ---

  The classic `XMLHttpRequest` sometimes also known as the Greek hero: _Ajax_. Not to be confused with _AJAX_ the cleaning agent.

  ### detail ###

  This method has a few new tricks.

  It is always invoked on an element collection and uses the behaviour of `html`.

  If there is no callback, then the `responseText` will be inserted into the elements in the collection.

  ### syntax ###

    x$( selector ).xhr( location, url, options )

  or accept a url with a default behavior of inner:

    x$( selector ).xhr( url, options );

  or accept a url with a callback:
  
    x$( selector ).xhr( url, fn );

  ### arguments ###

  - location `String` is the location to insert the `responseText`. See `html` for values.
  - url `String` is where to send the request.
  - fn `Function` is called on status 200 (i.e. success callback).
  - options `Object` is a JSON object with one or more of the following:
    - method `String` can be _get_, _put_, _delete_, _post_. Default is _get_.
    - async `Boolean` enables an asynchronous request. Defaults to _false_.
    - data `String` is a url encoded string of parameters to send.
                - error `Function` is called on error or status that is not 200. (i.e. failure callback).
    - callback `Function` is called on status 200 (i.e. success callback).
    - headers `Object` is a JSON object with key:value pairs that get set in the request's header set.

  ### response ###

  - The response is available to the callback function as `this`.
  - The response is not passed into the callback.
  - `this.reponseText` will have the resulting data from the file.

  ### example ###

    x$('#status').xhr('inner', '/status.html');
    x$('#status').xhr('outer', '/status.html');
    x$('#status').xhr('top',   '/status.html');
    x$('#status').xhr('bottom','/status.html');
    x$('#status').xhr('before','/status.html');
    x$('#status').xhr('after', '/status.html');

  or

    // same as using 'inner'
    x$('#status').xhr('/status.html');

    // define a callback, enable async execution and add a request header
    x$('#left-panel').xhr('/panel', {
        async: true,
        callback: function() {
            alert("The response is " + this.responseText);
        },
        headers:{
            'Mobile':'true'
        }
    });

    // define a callback with the shorthand syntax
    x$('#left-panel').xhr('/panel', function() {
        alert("The response is " + this.responseText);
    });
*/
    xhr:function(location, url, options) {

      // this is to keep support for the old syntax (easy as that)
    if (!/^(inner|outer|top|bottom|before|after)$/.test(location)) {
            options = url;
            url = location;
            location = 'inner';
        }

        var o = options ? options : {};
        
        if (typeof options == "function") {
            // FIXME kill the console logging
            // console.log('we been passed a func ' + options);
            // console.log(this);
            o = {};
            o.callback = options;
        };
        
        var that   = this,
            req    = new XMLHttpRequest(),
            method = o.method || 'get',
            async  = (typeof o.async != 'undefined'?o.async:true),
            params = o.data || null,
            key;

        req.queryString = params;
        req.open(method, url, async);

        // Set "X-Requested-With" header
        req.setRequestHeader('X-Requested-With','XMLHttpRequest');

        if (method.toLowerCase() == 'post') req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

        for (key in o.headers) {
            if (o.headers.hasOwnProperty(key)) {
              req.setRequestHeader(key, o.headers[key]);
            }
        }

        req.handleResp = (o.callback != null) ? o.callback : function() { that.html(location, req.responseText); };
        req.handleError = (o.error && typeof o.error == 'function') ? o.error : function () {};
        function hdl(){
            if(req.readyState==4) {
                delete(that.xmlHttpRequest);
                if(req.status===0 || req.status==200) req.handleResp(); 
                if((/^[45]/).test(req.status)) req.handleError();
            }
        }
        if(async) {
            req.onreadystatechange = hdl;
            this.xmlHttpRequest = req;
        }
        req.send(params);
        if(!async) hdl();

        return this;
    }
});
// emile.js (c) 2009 Thomas Fuchs
// Licensed under the terms of the MIT license.

(function(emile, container){
  var parseEl = document.createElement('div'),
    props = ('backgroundColor borderBottomColor borderBottomWidth borderLeftColor borderLeftWidth '+
    'borderRightColor borderRightWidth borderSpacing borderTopColor borderTopWidth bottom color fontSize '+
    'fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop maxHeight '+
    'maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft '+
    'paddingRight paddingTop right textIndent top width wordSpacing zIndex').split(' ');

  function interpolate(source,target,pos){ return (source+(target-source)*pos).toFixed(3); }
  function s(str, p, c){ return str.substr(p,c||1); }
  function color(source,target,pos){
    var i = 2, j, c, tmp, v = [], r = [];
    while(j=3,c=arguments[i-1],i--)
      if(s(c,0)=='r') { c = c.match(/\d+/g); while(j--) v.push(~~c[j]); } else {
        if(c.length==4) c='#'+s(c,1)+s(c,1)+s(c,2)+s(c,2)+s(c,3)+s(c,3);
        while(j--) v.push(parseInt(s(c,1+j*2,2), 16)); }
    while(j--) { tmp = ~~(v[j+3]+(v[j]-v[j+3])*pos); r.push(tmp<0?0:tmp>255?255:tmp); }
    return 'rgb('+r.join(',')+')';
  }
  
  function parse(prop){
    var p = parseFloat(prop), q = prop.replace(/^[\-\d\.]+/,'');
    return isNaN(p) ? { v: q, f: color, u: ''} : { v: p, f: interpolate, u: q };
  }
  
  function normalize(style){
    var css, rules = {}, i = props.length, v;
    parseEl.innerHTML = '<div style="'+style+'"></div>';
    css = parseEl.childNodes[0].style;
    while(i--) if(v = css[props[i]]) rules[props[i]] = parse(v);
    return rules;
  }  
  
  container[emile] = function(el, style, opts, after){
    el = typeof el == 'string' ? document.getElementById(el) : el;
    opts = opts || {};
    var target = normalize(style), comp = el.currentStyle ? el.currentStyle : getComputedStyle(el, null),
      prop, current = {}, start = +new Date, dur = opts.duration||200, finish = start+dur, interval,
      easing = opts.easing || function(pos){ return (-Math.cos(pos*Math.PI)/2) + 0.5; };
    for(prop in target) current[prop] = parse(comp[prop]);
    interval = setInterval(function(){
      var time = +new Date, pos = time>finish ? 1 : (time-start)/dur;
      for(prop in target)
        el.style[prop] = target[prop].f(current[prop].v,target[prop].v,easing(pos)) + target[prop].u;
      if(time>finish) { clearInterval(interval); opts.after && opts.after(); after && setTimeout(after,1); }
    },10);
  }
})('emile', this);
!function (context, doc) {
  var fns = [], ol, fn, f = false,
      testEl = doc.documentElement,
      hack = testEl.doScroll,
      domContentLoaded = 'DOMContentLoaded',
      addEventListener = 'addEventListener',
      onreadystatechange = 'onreadystatechange',
      loaded = /^loade|c/.test(doc.readyState);

  function flush(i) {
    loaded = 1;
    while (i = fns.shift()) { i() }
  }
  doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
    doc.removeEventListener(domContentLoaded, fn, f);
    flush();
  }, f);


  hack && doc.attachEvent(onreadystatechange, (ol = function () {
    if (/^c/.test(doc.readyState)) {
      doc.detachEvent(onreadystatechange, ol);
      flush();
    }
  }));

  context['domReady'] = hack ?
    function (fn) {
      self != top ?
        loaded ? fn() : fns.push(fn) :
        function () {
          try {
            testEl.doScroll('left');
          } catch (e) {
            return setTimeout(function() { context['domReady'](fn) }, 50);
          }
          fn();
        }()
    } :
    function (fn) {
      loaded ? fn() : fns.push(fn);
    };

}(this, document);
})();

xui.extend({
	/**
	 * Adds more DOM nodes to the existing element list.
	 */
	add: function(q) {
	  [].push.apply(this, slice(xui(q)));
	  return this.set(this.reduce());
	},

	/**
	 * Pops the last selector from XUI
	 */
	end: function () {	
		return this.set(this.cache || []);	 	
	},
  /**
   * Sets the `display` CSS property to `block`.
   */
  show:function() {
    return this.setStyle('display','block');
  },
  /**
   * Sets the `display` CSS property to `none`.
   */
  hide:function() {
    return this.setStyle('display','none');
  }
});

xui.extend({
   fade:function(to, callback) {
       var target = 0;
       if (typeof to == 'string' && to == 'in') target = 1;
       else if (typeof to == 'number') target = to;
       return this.tween({opacity:target,duration:.2}, callback);
   } 
});

if(typeof(Ur) == "undefined") {
  Ur = {
    QuickLoaders: {},
    WindowLoaders: {},
    Widgets: {},
    onLoadCallbacks: [],
    // Make an easy function that initializes all widgets for a given fragment:
    setup: function(fragment) {
      // Hacky:
      Ur.initialize({type: "DOMContentLoaded"}, fragment);

      if(Ur.loaded) {
        // These widgets _cant_ be initialized till page load
        Ur.initialize({type: "load"}, fragment);
      } else {
        window.addEventListener("load", function(e) { Ur.initialize(e, fragment)}, false);
      }
    },
    initialize: function(event, fragment) {
      var Loaders = (event.type == "DOMContentLoaded") ? Ur.QuickLoaders : Ur.WindowLoaders;
      if(fragment === undefined) {
        fragment = document.body;
      }
      
      for(var name in Loaders) {
        var widget = new Loaders[name];
        widget.initialize(fragment);
      }

      if(event.type == "load") {
        Ur.loaded = true;
        Ur._onLoad();
      }
    },
    error: function(msg) {
      console.error("Uranium: " + msg);
    },
    warn: function(msg) {
      console.warn("Uranium: " + msg);
    },
    // TODO: Make private
    _onLoad: function() {
      //iterate through the callbacks
      x$().iterate(
        Ur.onLoadCallbacks,
        function(callback) {
          callback();
        }
      );
    },
    loaded: false
  };
}

// This event is compatible with FF/Webkit

window.addEventListener("load", Ur.initialize, false);
window.addEventListener("DOMContentLoaded", Ur.initialize, false);

// Do this? OR just initialize as widgets are defined (and have uranium included at the bottom --- but that has limitations in inline JS using all of our x$() mixins) --> I think thats reason enough to try this for now


// Here's an example of initializing a fragment manually:
// Ur.setup("div.test");
// You have to be careful what you select since it searches within for components -- if your selector just matches the components individually, this will fail

// Now, you can re-initialize html fragments like so (After I refactor the widget initializers to search within fragments)
// x$(elem).on('click', Ur.Loaders['zoom-preview'].intialize(fragment));
// or 
// x$(elem).on('click', Ur.initialize(fragment));

var mixins = {
  // Grabbed this from xui's forEach defn
  iterate: function(stuff, fn) {
    if (stuff === undefined) {
      return;
    }
    var len = stuff.length || 0,
    i = 0,
    that = arguments[1];

    if (typeof fn == "function") {
      for (; i < len; i++) {
        fn.call(that, stuff[i], i, stuff);
      }
    }
  },
  offset: function(elm) {
    if (elm == undefined)
      elm = this[0];
    
    var cumulative_top = 0, cumulative_left = 0;
    while (elm.offsetParent) {
      cumulative_top += elm.offsetTop;
      cumulative_left += elm.offsetLeft;
      elm = elm.offsetParent;
    }
    return {left: cumulative_left, top: cumulative_top};
  },
  
  // TODO: Make private:
  findNextAncestor: function(elem, type) {
    //check to make sure there's still a parent:
    if (elem.parentNode != window.document) {
      return x$().findSetAncestor(elem.parentNode, type);
    } else {
      return null;
    }
  },

  findSetAncestor: function(elem, type) {
    var set_name = x$(elem).attr("data-ur-set")[0];
    if (set_name !== undefined && (type == undefined || set_name == type))
      return elem;
    return x$().findNextAncestor(elem, type);
  },

  get_unique_uranium_id: (function() {
    var count = 0;
    return function get_id() {
      count += 1;
      return count;
    }
  })(),

  findElements: function(type, component_constructors) {
    var groups = {};

    this.each(
      (function(type, constructors, groups) {
        return function() {x$().helper_find(this, type, constructors, groups)};
      })(type, component_constructors, groups));

    return groups;
  },
  // TODO: Make helper_find() private since its just a helper function
  helper_find: function(fragment, type, component_constructors, groups) {
    var all_elements = x$(fragment).find("*[data-ur-" + type + "-component]");

    all_elements.each(function() {

      var valid_component = true;

      ///////// Resolve this component to its set ///////////

      // Check if this has the data-ur-id attribute
      var my_set_id = x$(this).attr("data-ur-id")[0];

      if (my_set_id !== undefined) {
        if ( groups[my_set_id] === undefined) {
          groups[my_set_id] = {};
        }
      }
      else {
        //Find any set ancestors
        var my_ancestor = x$().findSetAncestor(this, type);

        var widget_disabled = x$(my_ancestor).attr("data-ur-state")[0];
        if (widget_disabled === "disabled" && Ur.loaded == false) {
          return;
        }

        if (my_ancestor !== null) {
          // Check if the set has an id ... if not, 'set' it up -- HA

          my_set_id = x$(my_ancestor).attr("data-ur-id")[0];

          if (my_set_id === undefined) {
            //generate ID
            my_set_id = x$().get_unique_uranium_id();
            x$(my_ancestor).attr("data-ur-id", my_set_id);
          }

          if (groups[my_set_id] === undefined) {
            //setup group
            groups[my_set_id] = {};
          }
          
          groups[my_set_id]["set"] = my_ancestor;

        }
        else {
          // we're screwed ... report an error
          Ur.error("couldn't find associated ur-set for component:");
          console.log(this);
          valid_component = false;
        }
      }

      //////////// Add this component to its set /////////////

      var component_type = x$(this).attr("data-ur-" + type + "-component");

      if (component_type === undefined) {
        valid_component = false;
      }

      if (valid_component) {
        // This is widget specific behavior
        // -- For toggler, it makes sense for content to be multiple things
        // -- For select-lists, it doesn't
        if (component_constructors !== undefined && component_constructors[component_type] !== undefined)
          component_constructors[component_type](groups[my_set_id], this, component_type);
        else
          groups[my_set_id][component_type] = this;
      }
    });

    return groups;
  }
}

xui.extend(mixins);

/* Carousel  *
 * * * * * * *
 * The carousel is a widget to allow for horizontally scrolling
 * (with touch or buttons) between a set of items.
 *
 * The only assumption is about the items' style -- they must be
 * float: left; so that the real width can be accurately totalled.
 */

Ur.WindowLoaders["carousel"] = (function() {

  function Carousel(components) {
    var self = this;
    
    this.container = components["view_container"];
    this.items = components["scroll_container"];
    if (this.items.length == 0) {
      Ur.error("carousel missing item components");
      return false;
    }

    // Optionally:
    this.button = components["button"] === undefined ? {} : components["button"];
    this.count = components["count"];
    this.dots = components["dots"];

    this.flag = {
      click: false,
      increment: false,
      loop: false,
      lock: null,
      timeoutId: null,
      touched: false
    };

    this.options = {
      autoscroll: true,
      autoscrollDelay: 5000,
      autoscrollForward: true,
      center: true,
      cloneLength: 1,
      fill: 0,
      infinite: true,
      transform3d: true,
      touch: true,
      verticalScroll: true
    };
    
    this.itemIndex = 0;
    this.translate = 0;
    
    var $container = x$(this.container);
    var preCoords = {x: 0, y: 0};
    var startPos = {x: 0, y: 0}, endPos = {x: 0, y: 0};
    
    var oldWidth = 0, snapWidth = 0;
    
    var startingOffset = null;
    
    var translatePrefix = "translate3d(", translateSuffix = ", 0px)";
    
    function initialize() {
      // TODO:
      // add an internal event handler to handle all events on the container:
      // x$(self.container).on("event", self.handleEvent);

      readAttributes();

      if (self.options.infinite) {
        var items = x$(self.items).find("[data-ur-carousel-component='item']");
        self.realItemCount = items.length;
        self.itemIndex = self.options.cloneLength;
        for (var i = 0; i < self.options.cloneLength; i++) {
          var clone = items[i].cloneNode(true);
          x$(clone).attr("data-ur-clone", i).attr("data-ur-state", "inactive");
          items[items.length - 1].parentNode.appendChild(clone);
        }

        for (var i = items.length - self.options.cloneLength; i < items.length; i++) {
          var clone = items[i].cloneNode(true);
          x$(clone).attr("data-ur-clone", i).attr("data-ur-state", "inactive");
          items[0].parentNode.insertBefore(clone, items[0]);
        }
      }

      if (!self.options.transform3d) {
        translatePrefix = "translate(";
        translateSuffix = ")";
      }

      adjustSpacing();

      if (!self.options.infinite)
        self.realItemCount = self.itemCount;

      insertDots();

      updateIndex(self.options.infinite ? self.options.cloneLength : 0);

      if (self.options.touch) {
        var hasTouch = "ontouchstart" in window;
        var start = hasTouch ? "touchstart" : "mousedown";
        var move = hasTouch ? "touchmove" : "mousemove";
        var end = hasTouch ? "touchend" : "mouseup";

        x$(self.items).on(start, startSwipe);
        x$(self.items).on(move, continueSwipe);
        x$(self.items).on(end, finishSwipe);
        x$(self.items).click(function(e) {if (!self.flag.click) stifle(e);});
      }

      x$(self.button["prev"]).click(function(){self.moveTo(1);});
      x$(self.button["next"]).click(function(){self.moveTo(-1);});

      x$(window).orientationchange(resize);
      // orientationchange isn't supported on some androids
      x$(window).on("resize", function() {
        resize();
        setTimeout(resize, 100);
      });

      self.autoscrollStart();
    }

    function readAttributes() {
      
      // translate3d is disabled on Android by default because it often causes problems
      // however, on some pages translate3d will work fine so the data-ur-android3d
      // attribute can be set to "enabled" to use translate3d since it can be smoother
      // on some Android devices

      var oldAndroid = /Android [12]/.test(navigator.userAgent);
      if (oldAndroid && $container.attr("data-ur-android3d")[0] != "enabled")
        self.options.transform3d = false;

      self.options.verticalScroll = $container.attr("data-ur-vertical-scroll")[0] != "disabled";
      $container.attr("data-ur-vertical-scroll", self.options.verticalScroll ? "enabled" : "disabled");

      self.options.touch = $container.attr("data-ur-touch")[0] != "disabled";
      $container.attr("data-ur-touch", self.options.touch ? "enabled" : "disabled");

      self.options.infinite = $container.attr("data-ur-infinite")[0] != "disabled";
      if ($container.find("[data-ur-carousel-component='item']").length == 1)
        self.options.infinite = false;
      $container.attr("data-ur-infinite", self.options.infinite ? "enabled" : "disabled");

      self.options.center = $container.attr("data-ur-center")[0] == "enabled";
      $container.attr("data-ur-center", self.options.center ? "enabled" : "disabled");

      var fill = parseInt($container.attr("data-ur-fill"));
      if (fill > 0)
        self.options.fill = fill;
      $container.attr("data-ur-fill", self.options.fill);

      var cloneLength = parseInt($container.attr("data-ur-clones"));
      if (!self.options.infinite)
        cloneLength = 0;
      else if (isNaN(cloneLength) || cloneLength < self.options.fill)
        cloneLength = Math.max(1, self.options.fill);
      self.options.cloneLength = cloneLength;
      $container.attr("data-ur-clones", self.options.cloneLength);

      self.options.autoscroll = $container.attr("data-ur-autoscroll")[0] == "enabled";
      $container.attr("data-ur-autoscroll", self.options.autoscroll ? "enabled" : "disabled");

      var autoscrollDelay = parseInt($container.attr("data-ur-autoscroll-delay"));
      if (autoscrollDelay >= 0)
        self.options.autoscrollDelay = autoscrollDelay;
      $container.attr("data-ur-autoscroll-delay", self.options.autoscrollDelay);

      self.options.autoscrollForward = $container.attr("data-ur-autoscroll-dir")[0] != "prev";
      $container.attr("data-ur-autoscroll-dir", self.options.autoscrollForward ? "next" : "prev");
    }

    function insertDots() {
      if (self.dots) {
        var existing = x$(self.dots).find("[data-ur-carousel-component='dot']");
        for (var i = existing.length; i < self.realItemCount; i++) {
          var new_dot = document.createElement("div");
          x$(new_dot).attr("data-ur-carousel-component", "dot");
          if (i == 0)
            x$(new_dot).attr("data-ur-state", "active");
          self.dots.appendChild(new_dot);
        }
      }
    }

    function resize() {
      var offsetWidth = self.container.offsetWidth;
      if (snapWidth != offsetWidth && offsetWidth != 0)
        adjustSpacing();
    }

    function adjustSpacing() {
      // Will need to be called if the container's size changes --> orientation change
      var visibleWidth = self.container.offsetWidth;

      if (oldWidth !== undefined && oldWidth == visibleWidth)
        return;

      var oldSnapWidth = snapWidth;
      oldWidth = visibleWidth;

      var cumulativeOffset = 0;
      var items = x$(self.items).find("[data-ur-carousel-component='item']");
      self.itemCount = items.length;

      // Adjust the container to be the necessary width.
      var totalWidth = 0;

      var divisions = [];
      if (self.options.fill > 0) {
        var remainder = visibleWidth;
        for (var i = self.options.fill; i > 0; i--) {
          var length = Math.round(remainder/i);
          divisions.push(length);
          remainder -= length;
        }
      }

      for (var i = 0; i < items.length; i++) {
        if (self.options.fill > 0) {
          var length = divisions[i % self.options.fill];
          items[i].style.width = length + "px";
          totalWidth += length;
        }
        else
          totalWidth += items[i].offsetWidth;
      }

      self.items.style.width = totalWidth + "px";

      snapWidth = visibleWidth;

      self.lastIndex = self.itemCount - 1;

      self.itemIndex = (self.lastIndex < self.itemIndex) ? self.lastIndex : self.itemIndex;

      cumulativeOffset -= items[self.itemIndex].offsetLeft; // initial offset
      if (self.options.center) {
        var centerOffset = parseInt((snapWidth - items[self.itemIndex].offsetWidth)/2);
        cumulativeOffset += centerOffset; // CHECK
      }
      if (oldSnapWidth)
        self.destinationOffset = cumulativeOffset;

      translateX(cumulativeOffset);
    }

    this.autoscrollStart = function() {
      if (!self.options.autoscroll)
        return;

      self.flag.timeoutId = setTimeout(function() {
        if (self.container.offsetWidth != 0) {
          if (!self.options.infinite && self.itemIndex == self.lastIndex && self.options.autoscrollForward)
            self.jumpToIndex(0);
          else if (!self.options.infinite && self.itemIndex == 0 && !self.options.autoscrollForward)
            self.jumpToIndex(self.lastIndex);
          else
            self.moveTo(self.options.autoscrollForward ? -1 : 1);
        }
        else
          self.autoscrollStart();
      }, self.options.autoscrollDelay);
    };

    this.autoscrollStop = function() {
      clearTimeout(self.flag.timeoutId);
    };

    function getEventCoords(event) {
      if (event.touches && event.touches.length > 0)
        return {x: event.touches[0].clientX, y: event.touches[0].clientY};
      else if (event.clientX != undefined)
        return {x: event.clientX, y: event.clientY};
      return null;
    }

    function updateButtons() {
      x$(self.button["prev"]).attr("data-ur-state", self.itemIndex == 0 ? "disabled" : "enabled")
      x$(self.button["next"]).attr("data-ur-state", self.itemIndex == self.lastIndex ? "disabled" : "enabled")
    }

    function getNewIndex(direction) {
      var newIndex = self.itemIndex - direction;
      if (!self.options.infinite) {
        if (self.options.fill > 1 && newIndex > self.lastIndex - self.options.fill + 1)
          newIndex = self.lastIndex - self.options.fill + 1;
        else if (newIndex > self.lastIndex)
          newIndex = self.lastIndex;
        else if (newIndex < 0)
          newIndex = 0;
      }
      
      return newIndex;
    }

    function updateIndex(newIndex) {
      if (newIndex === undefined)
        return;

      self.itemIndex = newIndex;
      if (self.itemIndex < 0)
        self.itemIndex = 0;
      else if (self.itemIndex > self.lastIndex)
        self.itemIndex = self.lastIndex - 1;

      var realIndex = self.itemIndex;
      if (self.options.infinite)
        realIndex = (self.realItemCount + self.itemIndex - self.options.cloneLength) % self.realItemCount;
      if (self.count !== undefined)
        self.count.innerHTML = realIndex + 1 + " of " + self.realItemCount;

      x$(self.items).find("[data-ur-carousel-component='item'][data-ur-state='active']").attr("data-ur-state", "inactive");
      x$(x$(self.items).find("[data-ur-carousel-component='item']")[self.itemIndex]).attr("data-ur-state", "active");

      if (self.dots)
        x$(self.dots).find("[data-ur-carousel-component='dot']").attr("data-ur-state", "inactive")[realIndex].setAttribute("data-ur-state", "active");

      updateButtons();

      $container.fire("slidestart", {index: realIndex});
    }

    function startSwipe(e) {
      if (!self.options.verticalScroll)
        stifle(e);
      self.autoscrollStop();

      self.flag.touched = true; // For non-touch environments
      self.flag.lock = null;
      self.flag.loop = false;
      self.flag.click = true;
      var coords = getEventCoords(e);
      preCoords.x = coords.x;
      preCoords.y = coords.y;

      if (coords !== null) {
        var translate = getTranslateX();

        if (startingOffset == null)
          startingOffset = translate;
        else
          // Fast swipe
          startingOffset = self.destinationOffset; //Factor incomplete previous swipe
        
        startPos = endPos = coords;
      }
    }

    function continueSwipe(e) {
      if (!self.flag.touched) // For non-touch environments
        return;

      self.flag.click = false;

      var coords = getEventCoords(e);

      if (document.ontouchstart !== undefined && self.options.verticalScroll) {
        var slope = Math.abs((preCoords.y - coords.y)/(preCoords.x - coords.x));
        if (self.flag.lock) {
          if (self.flag.lock == "y")
            return;
        }
        else if (slope > 1.2) {
          self.flag.lock = "y";
          return;
        }
        else if (slope <= 1.2)
          self.flag.lock = "x";
        else
          return;
      }
      stifle(e);

      if (coords !== null) {
        endPos = coords;
        var dist = swipeDist() + startingOffset;

        if (self.options.infinite) {
          var items = x$(self.items).find("[data-ur-carousel-component='item']");
          var endLimit = items[self.lastIndex].offsetLeft + items[self.lastIndex].offsetWidth - self.container.offsetWidth;

          if (dist > 0) { // at the beginning of carousel
            var srcNode = items[self.realItemCount];
            var offset = srcNode.offsetLeft - items[0].offsetLeft;
            startingOffset -= offset;
            dist -= offset;
            self.flag.loop = !self.flag.loop;
          }
          else if (dist < -endLimit) {  // at the end of carousel
            var srcNode = items[self.lastIndex - self.realItemCount];
            var offset = srcNode.offsetLeft - items[self.lastIndex].offsetLeft;
            startingOffset -= offset;
            dist -= offset;
            self.flag.loop = !self.flag.loop;
          }
        }

        translateX(dist);
      }
    }

    function finishSwipe(e) {
      if (!self.flag.click || self.flag.lock)
        stifle(e);
      else if (e.target.tagName == "AREA")
        location.href = e.target.href;
      
      self.flag.touched = false; // For non-touch environments
      
      moveHelper(getDisplacementIndex());
    }
    
    function getDisplacementIndex() {
      var swipeDistance = swipeDist();
      var displacementIndex = zeroCeil(swipeDistance/x$(self.items).find("[data-ur-carousel-component='item']")[0].offsetWidth);
      return displacementIndex;
    }
    
    function snapTo(displacement) {
      self.destinationOffset = displacement + startingOffset;
      var maxOffset = -1*self.lastIndex*snapWidth;
      var minOffset = parseInt((snapWidth - x$(self.items).find("[data-ur-carousel-component='item']")[0].offsetWidth)/2);

      if (self.options.infinite)
        maxOffset = -self.items.offsetWidth;
      if (self.destinationOffset < maxOffset || self.destinationOffset > minOffset) {
        if (Math.abs(self.destinationOffset - maxOffset) < 1) {
          // Hacky -- but there are rounding errors
          // I see this when I'm in multi-mode and using the buttons
          // This only seems to happen on the desktop browser -- ideally its removed at compile time
          self.destinationOffset = maxOffset;
        } else
          self.destinationOffset = minOffset;
      }

      momentum();
    }

    this.moveTo = function(direction) {
      // The animation isnt done yet
      if (self.flag.increment)
        return;

      startingOffset = getTranslateX();
      moveHelper(direction);
    };

    function moveHelper(direction) {
      self.autoscrollStop();

      var newIndex = getNewIndex(direction);
      
      var items = x$(self.items).find("[data-ur-carousel-component='item']");

      if (self.options.infinite) {
        var oldTransform = getTranslateX();
        var altTransform = oldTransform;

        if (newIndex < self.options.cloneLength) { // at the beginning of carousel
          var offset = items[self.options.cloneLength].offsetLeft - items[self.itemCount - self.options.cloneLength].offsetLeft;
          if (!self.flag.loop) {
            altTransform += offset;
            translateX(altTransform);
            startingOffset += offset;
          }
          newIndex += self.realItemCount;
          self.itemIndex = newIndex + direction;
        }
        else if (newIndex > self.lastIndex - self.options.cloneLength) { // at the end of carousel
          var offset = items[self.itemCount - self.options.cloneLength].offsetLeft - items[self.options.cloneLength].offsetLeft;
          if (!self.flag.loop) {
            altTransform += offset;
            translateX(altTransform);
            startingOffset += offset;
          }
          newIndex -= self.realItemCount;
          self.itemIndex = newIndex + direction;
        }
      }
      var newItem = items[newIndex];
      var currentItem = items[self.itemIndex];
      var displacement = currentItem.offsetLeft - newItem.offsetLeft; // CHECK
      if (self.options.center)
        displacement += (currentItem.offsetWidth - newItem.offsetWidth) / 2;
      setTimeout(function() {
        snapTo(displacement);
        updateIndex(newIndex);
      }, 0);
    }

    this.jumpToIndex = function(index) {
      self.moveTo(self.itemIndex - index);
    };

    function momentum() {
      if (self.flag.touched)
        return;

      self.flag.increment = false;

      var translate = getTranslateX();
      var distance = self.destinationOffset - translate;
      var increment = distance - zeroFloor(distance / (self.options.transform3d ? 1.1 : 1.2));

      // Hacky -- this is for the desktop browser only -- to fix rounding errors
      // Ideally, this is removed at compile time
      if(Math.abs(increment) < 0.01)
        increment = 0;

      var newTransform = increment + translate;

      translateX(newTransform);

      if (increment != 0)
        self.flag.increment = true;

      if (self.flag.increment)
        setTimeout(momentum, 16);
      else {
        startingOffset = null;
        self.autoscrollStart();

        var itemIndex = self.itemIndex;
        x$(self.container).fire("slideend", {index: itemIndex});
      }
    }

    function swipeDist() {
      return endPos === undefined ? 0 : endPos.x - startPos.x;
    }
    
    function translateX(x) {
      self.translate = x;
      var items = self.items;
      items.style.webkitTransform = items.style.msTransform = items.style.OTransform = items.style.MozTransform = items.style.transform = translatePrefix + x + "px, 0px" + translateSuffix;
    }
    
    function getTranslateX() {
      return self.translate;
    }
    
    initialize();
  }

  // Private/Helper methods

  function zeroCeil(num) {
    return num <= 0 ? Math.floor(num) : Math.ceil(num);
  }

  function zeroFloor(num) {
    return num >= 0 ? Math.floor(num) : Math.ceil(num);
  }

  function stifle(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Private constructors
  var ComponentConstructors = {
    button: function(group, component, type) {
      if (group["button"] === undefined)
        group["button"] = {};

      var type = component.getAttribute("data-ur-carousel-button-type");

      // Declaration error
      if (type === undefined)
        Ur.error("malformed carousel button type on:" + component.outerHTML);

      group["button"][type] = component;

      // Maybe in the future I'll make it so any of the items can be the starting item
      x$(component).attr("data-ur-state", type == "prev" ? "disabled" : "enabled");
    }
  };
  function CarouselLoader(){}

  CarouselLoader.prototype.initialize = function(fragment) {
    var carousels = x$(fragment).findElements("carousel", ComponentConstructors);
    Ur.Widgets["carousel"] = {};
    for (var name in carousels) {
      var carousel = carousels[name];
      Ur.Widgets["carousel"][name] = new Carousel(carousel);
      x$(carousel["set"]).attr("data-ur-state", "enabled");
    }
  }

  return CarouselLoader;
})();

/* Flex Table *
 * * * * * *
 * The flex table widget will take a full-sized table and make it fit 
 * on a variety of different viewport sizes.  
 * 
 */

Ur.QuickLoaders['flex-table'] = (function(){
  
  // Add an enhanced class to the tables the we'll be modifying
  function addEnhancedClass(tbl) {
    x$(tbl).addClass("enhanced");
  }
  
  function flexTable(aTable, table_index) {
    // TODO :: Add the ability to pass in options
    this.options = {
      idprefix: 'col-',   // specify a prefix for the id/headers values
      persist: "persist", // specify a class assigned to column headers (th) that should always be present; the script not create a checkbox for these columns
      checkContainer: null // container element where the hide/show checkboxes will be inserted; if none specified, the script creates a menu
    };
    
    var self = this, 
        o = self.options,
        table = aTable.table,
        thead = aTable.head,
        tbody = aTable.body,
        hdrCols = x$(thead).find('th'),
        bodyRows = x$(tbody).find('tr'), 
        container = o.checkContainer ? x$(o.checkContainer) : x$('<div class="table-menu table-menu-hidden" ><ul /></div>');
        
    addEnhancedClass(table);
    
    hdrCols.each(function(elm, i){
      var th = x$(this),
          id = th.attr('id'),
          classes = th.attr('class');
      
      // assign an id to each header, if none is in the markup
      if (id.length === 0) {
        id = ( o.idprefix ? o.idprefix : "col-" ) + i;
        th.attr('id', id); 
      }
      
      // assign matching "headers" attributes to the associated cells
      // TEMP - needs to be edited to accommodate colspans
      bodyRows.each(function(e, j){
        var cells = x$(e).find("th, td");
        cells.each(function(cell, k) {
          if (cell.cellIndex == i) {
            x$(cell).attr('headers', id);
            if (classes.length !== 0) { x$(cell).addClass(classes[0]); };
          }
        });
      });
      
      // create the show/hide toggles
      if ( !th.hasClass(o.persist) ) {
        var toggle = x$('<li><input type="checkbox" name="toggle-cols" id="toggle-col-' +
                          i +  '-' + table_index +  '" value="' + id + '" /> <label for="toggle-col-' + i + '-' + table_index +  '">'
                          + th.html() +'</label></li>');
        container.find('ul').bottom(toggle);
        var tgl = toggle.find("input");
        
        tgl.on("change", function() {
          var input = x$(this),
              val = input.attr('value'),
              cols = x$("div[data-ur-id='" + table_index + "'] " + "#" + val[0] + ", " +
                        "div[data-ur-id='" + table_index + "'] " + "[headers=" + val[0] + "]");
          if (!this.checked) { 
            cols.addClass('ur_ft_hide'); 
            cols.removeClass("ur_ft_show"); }
          else { 
            cols.removeClass("ur_ft_hide"); 
            cols.addClass('ur_ft_show'); }
        });
        tgl.on("updateCheck", function(){
          if ( th.getStyle("display") == "table-cell" || th.getStyle("display") == "inline" ) {
            x$(this).attr("checked", true);
          }
          else {
            x$(this).attr("checked", false);
          }
        });
        tgl.fire("updateCheck");
      }
      
    }); // end hdrCols loop
    
    // Update the inputs' checked status
    x$(window).on('orientationchange', function() {
      container.find('input').fire('updateCheck');
    });
    x$(window).on('resize', function() {
      container.find('input').fire('updateCheck');
    });
    
    // Create a "Display" menu      
    if (!o.checkContainer) {
      var menuWrapper = x$('<div class="table-menu-wrapper"></div>'),
          popupBG = x$('<div class = "table-background-element"></div>'),
          menuBtn = x$('<a href="#" class="table-menu-btn" ><span class="table-menu-btn-icon"></span>Display</a>');
      menuBtn.click(function(){
        container.toggleClass("table-menu-hidden");
        x$(this).toggleClass("menu-btn-show");
        return false;
      });
      popupBG.click(function(){
        container.toggleClass("table-menu-hidden");
        menuBtn.toggleClass("menu-btn-show");
        return false;
      });
      container.bottom(popupBG);
      menuWrapper.bottom(menuBtn).bottom(container);
      x$(table).before(menuWrapper);
    };
  }
  
  function TableLoader () {}
  
  TableLoader.prototype.initialize = function(fragment) {
    var tables = x$(fragment).findElements('flex-table');
    Ur.Widgets["flex-table"] = {};

    for(var table in tables){
      Ur.Widgets["flex-table"][name] = new flexTable(tables[table], table);
    }
  }
  
  return TableLoader;
})();

/* Font Resizer
   ------------
   Font Resizer displays four components:
   (1) a button which, when pressed, increases the font size of some
       specified page elements
   (2) a button which, when pressed, decreases the font size of some
       specified page elements
   (3) a label which reports the current font size of the aforementioned
       page elements
   (4) a button which, when pressed, resets the contents to the original
       font size (optional component)
*/

Ur.QuickLoaders["font-resizer"] = (function() {

  var labelText = "Text Size: ";
  var up = 1, down = -1, reset = 0;
  var is_reset_enabled = "false";

  function FontResizer(components) {
    this.increase = components["increase"];
    this.decrease = components["decrease"];
    this.label = components["label"];
    this.content = components["content"];
    if (components["reset"]) {
      this.reset_size = components["reset"];
      is_reset_enabled = true;
    }
    this.initialize();
  }

  FontResizer.prototype.initialize = function() {
    var content = x$(this.content);
    this.min = parseInt(content.attr("data-ur-font-resizer-min")) || 100;
    this.max = parseInt(content.attr("data-ur-font-resizer-max")) || 200;
    this.delta = parseInt(content.attr("data-ur-font-resizer-delta")) || 20;
    this.size = parseInt(content.attr("data-ur-font-resizer-size")) || this.min;
    this.original_size = this.size;
    this.invert = content.attr("data-ur-font-resizer-invert") == "Bam!" ? true : false;

    x$(this.increase).click(function (obj) { return function() { obj.change(up); }; }(this));
    x$(this.decrease).click(function (obj) { return function() { obj.change(down); }; }(this));
    if (is_reset_enabled) {
      x$(this.reset_size).click(function (obj) { return function() { obj.change(reset); }; }(this));
    }

    if (this.invert) {
      this.size = this.min;
      this.controlSize = this.max;
      this.increase.style["font-size"] = this.controlSize + "%";
      this.decrease.style["font-size"] = this.controlSize + "%";
      this.label.style["font-size"] = this.controlSize + "%";
    }

    content[0].style["font-size"] = this.size + "%";
    x$(this.label).inner(labelText + this.size + "%");

  }

  FontResizer.prototype.change = function(direction) {
    if ((direction == down && this.size > this.min) ||
        (direction == up && this.size < this.max)) {
      this.size += direction * this.delta;
      this.content.style["font-size"] = this.size + "%";
      this.label.innerText = labelText + this.size + "%";

      if (this.invert) {
        this.controlSize += -direction * this.delta;
        this.increase.style["font-size"] = this.controlSize + "%";
        this.decrease.style["font-size"] = this.controlSize + "%";
        this.label.style["font-size"] = this.controlSize + "%";
      }
    } else if (direction == reset) {
      this.size = this.original_size;
      this.content.style["font-size"] = this.size + "%";
      this.label.innerText = labelText + this.size + "%";
    }
  }

  function FontResizerLoader() {}

  FontResizerLoader.prototype.initialize = function(fragment) {
    var font_resizers = x$(fragment).findElements('font-resizer');
    for (var name in font_resizers) new FontResizer(font_resizers[name]);
  }

  return FontResizerLoader;
})();

/* Geolocation  *
 * * * * * * * * *
 *
 *  The Geolocation widget is meant to
 *  reverse geocode a position to give back an address and then
 *  populate form fields
 *
 */
 
Ur.QuickLoaders["geocode"] = (function() {
  
  function Geocode(data) {
    this.elements = data;
    this.callback = x$(this.elements.set).attr("data-ur-callback")[0];
    this.errorCallback = x$(this.elements.set).attr("data-ur-error-callback")[0];

    UrGeocode = function(obj){return function(){obj.setup_callbacks();};}(this);
    var s = document.createElement('script');
    s.type = "text/javascript";
    s.src = "http://maps.googleapis.com/maps/api/js?sensor=true&callback=UrGeocode";
    x$('body').html('bottom', s);  
  }

  
  var geocoder;
  var geocodeObj;
  var currentObj;
  
  function selectHelper(elm, value) {
    for (var i=0,j=elm.length; i<j; i++) {
      if (elm[i].value === value.long_name || elm[i].value.toUpperCase() === value.short_name) {
        elm.selectedIndex = i;
      }
    }
  }
  
  function fieldHelper(elm, geoInfo, htmlElmType) {
    var index1 = 0;
    var index2 = null; // used for street address
    var need = null;
    var temp = null;
    switch(elm) {
      case 'rg-city':
        need = 'locality';
        break;
      case 'rg-street':
        need = 'street_number';
        break;
      case 'rg-zip': 
        need = 'postal_code';
        break;
      case 'rg-state':
        need = 'administrative_area_level_1';
        break;
      case 'rg-country':
        need = 'country';
        break;
    }
    temp=geoInfo[0];
    var myTemp = null;
    for (var i = temp.address_components.length, j=0; j<i; j++) {
      for (var k = temp.address_components[j].types.length, m=0; m<k; m++) {
        myTemp = temp.address_components[j].types[m];
        if (need == myTemp) {
          switch(myTemp) {
            case 'street_number':
              index1 = j;
              index2 = j+1; 
              break;
            case 'locality':
              index1 = j; 
              break;
            case 'postal_code':
              index1 = j;
              break;
            case 'administrative_area_level_1':
              index1 = j;
              break;
            case 'country':
              index1 = j;
          }
          break;
        }
      }
    }
    if (htmlElmType === "input") {
      if (index2 === null) {
        currentObj.elements[elm].value = geoInfo[0].address_components[index1].long_name;
      } else {
        currentObj.elements[elm].value = geoInfo[0].address_components[index1].long_name + " " + geoInfo[0].address_components[index2].long_name;
      }
    } else if (htmlElmType === "select") {
      selectHelper(currentObj.elements[elm], geoInfo[0].address_components[index1]);
    }
  }
  
  function populateFields (geoInfo) {
    var elements = currentObj.elements;
    for (elm in elements) {
      (elements[elm].localName === "input") ? fieldHelper(elm, geoInfo, "input") : fieldHelper(elm, geoInfo, "select");
    }
  }
  
  Geocode.prototype = {
    setup_callbacks: function() {
      currentObj = this;
      // Set up call back for button to trigger geocoding
      if (this.elements['rg-button']) {
        x$(this.elements['rg-button']).on(
          'click', 
          function(obj){
            return function() {
              obj.geocode();
            }
          }(this)
        );
      } else {
        console.warn("Ur warning -- no button for triggering reverse geocoding present");
        currentObj.geocode();
      }
    },
    geoSuccess: function(position){   
      var coords = {
        lat: position.coords.latitude, 
        lng: position.coords.longitude
      }

      this.codeLatLng(coords.lat, coords.lng);
    },
    
    geoError: function(error){
      console.error("Ur geolocation error -- Error Getting Your Coordinates!");
      switch(error.code) 
      {
        case error.TIMEOUT:
          console.error ('Ur geolocation error -- Timeout');
          break;
        case error.POSITION_UNAVAILABLE:
          console.error ('Ur geolocation error -- Position unavailable');
          break;
        case error.PERMISSION_DENIED:
          console.error ('Ur geolocation error -- Permission denied');
          break;
        case error.UNKNOWN_ERROR:
          console.error ('Ur geolocation error -- Unknown error');
          break;
      }
      if(this.errorCallback !== undefined) {
        eval(this.errorCallback);
      }
    },

    geoDenied: function(){
      console.error("Ur geolocation error -- User Denied Geolocation");
    },

    codeLatLng: function(lat, lng) {
      var latlng = new google.maps.LatLng(lat, lng);
      var self = this;

      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            geocodeObj = results;
            populateFields(geocodeObj);

            if(self.callback !== undefined) {
              eval(self.callback);
            }

            return results;
          } else {
            console.error("Geocoder failed due to: " + status);
          }
        }
      });
    },

    geocode: function(){
      if(navigator.geolocation){ //feature detect
        geocoder = new google.maps.Geocoder();
        navigator.geolocation.getCurrentPosition(
          function(obj){
            return function(position){
              obj.geoSuccess(position);
            };
          }(this), 
          function(obj) {
            return function(errors){
              obj.geoError(errors);
            };
          }(this),
          this.geoDenied
        );  
      }
    }
  }

  function GeocodeLoader() {
  }

  GeocodeLoader.prototype.initialize = function(fragment) {
    var my_geo = x$(fragment).findElements('reverse-geocode');
    
    Ur.Widgets["geocode"] = {}
    
    for (var name in my_geo){
      Ur.Widgets["geocode"][name] = new Geocode(my_geo[name]);
      break;
    }
    
  }

  return GeocodeLoader;
})();
/* Input Clear *
 * * * * * *
 * The input clear widget will provide a small X when a user focuses on a text input
 * that can be clicked to clear the field.
 * 
 * Customize the appearance of the X with CSS
 * 
 */
 
Ur.QuickLoaders['input-clear'] = (function(){
  
  function inputClear (input) {
    // XUIify the input we're working with
    var that = x$(input.input);
        
    // Create the X div
    var ex = x$('<div class="data-ur-input-clear-ex"></div>')
    // Hide it (even though this should be in CSS)
    ex.hide();
    // Inject it
    that.html('after', ex);

    // Use these when testing on desktop
    // ex.on('mousedown', function() {
    //   // remove text in the box
    //   that[0].value='';
    // });
    // ex.on('mouseup', function() {
    //   that[0].focus();
    // });
    
    // Touch Events
    ex.on('touchstart', function() {
      // remove text in the box
      that[0].value='';
    });
    ex.on('touchend', function() {
      // make sure the keyboard doesn't disappear
      that[0].focus();
    });
    
    that.on('focus', function() {
      if (that[0].value != '') {
        ex.show();
      }
    })
    that.on('keydown', function() {
      ex.show();
    });
    that.on('blur', function() {
      // Delay the hide so that the button can be clicked
      setTimeout(function() { ex.hide();}, 150);
    });
  }
  
  function InputClearLoader () {}
  
  InputClearLoader.prototype.initialize = function(fragment) {
    var inputs = x$(fragment).findElements('input-clear');
    e = inputs;
    
    Ur.Widgets["input-clear"] = {};
    
    for(var input in inputs){
      Ur.Widgets["input-clear"][input] = new inputClear(inputs[input]);
    }
  }
  
  return InputClearLoader;
})();



/*
 * lateload takes any element that has the data-ur-ll-src or
 * data-ur-ll-href attribute and then once requested, loads that
 * object
 */

(function () {
  
  function late_load (obj) {
    
    var self = this;
    var components = this.components = obj;
  }

  late_load.prototype.preferences = {threshold: 300};

  late_load.prototype.release_element = function (obj) {

    if (obj.hasAttribute("data-ur-ll-src")){
      var type = "src";
      var att = "data-ur-ll-src";
      var loc = obj.getAttribute(att);
    }else if (obj.hasAttribute("data-ur-ll-href")){
      var type = "href";
      var att = "data-ur-ll-href";
      var loc = obj.getAttribute();
    }else{
      //console.warn("Uranium Late Load: non-late-load element provided.");
      return
    }

    obj.removeAttribute(att);
    obj.setAttribute(type, loc);
  }

   late_load.prototype.components = {};

  late_load.prototype.release_group = function (hash) {
    for (var name in hash){
      if (hash[name][1] != "scroll"){
        late_load.prototype.release_element(hash[name][0]);
      }else if (scrollHelper(hash[name][0]) == true){
        late_load.prototype.release_element(hash[name][0]);
      }
    }
  }

  var scrollHelper = function (obj) {
    var fold = window.innerHeight + window.pageYOffset;

    var findPos = function(obj) {
      var curleft = curtop = 0;curtop;
      if (obj.offsetParent) {
        do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
      }
      return [curleft,curtop];
    }
    var pos = findPos(obj);
    return fold >= pos[1] - obj.offsetHeight - late_load.prototype.preferences.threshold;
  }

  var setEvents = function (obj) {
    var components = obj;

    for (var temp in components){

      switch(temp){
        case "scroll":
          x$(window).on(temp, function (e) {
            late_load.prototype.release_group(components["scroll"], "scroll");
          });
        break;
        case "load":
          x$(window).on(temp, function (e) {
            late_load.prototype.release_group(components["load"]);
          });
          break;
        case "DOMContentLoaded":
          late_load.prototype.release_group(components["DOMContentLoaded"]);
          break;
        case "click": case "touch":
          x$("html").on(temp, function (e) {
            var type = e.target.getAttribute("data-ur-ll-event")
            if (type == "click" || type == "touch") {
              late_load.prototype.release_element(e.target);
            }
          });
          break;
        default:
        break;
      }
    }
  }


  var find = function () {
    var obj = {};
    var temp = [];
    var group;

    x$(document).find('[data-ur-ll-href],[data-ur-ll-src]').each( function () {
      group = this.getAttribute("data-ur-ll-event")
      if (group === null){
        group = "DOMContentLoaded";
      }
      obj[group] = []
      temp.push([this, group]);
    });

    for (var element in temp){
      if (temp[element][1] === undefined) {}else{
        obj[temp[element][1]].push(temp[element]);
      }
    }

    return obj;
  }

  late_load.prototype.initialize = function() {
    var lateObj = find();
    var ll = new late_load(lateObj);
    setEvents(ll.components)
    Ur.Widgets["late_load"] = ll;
  }

  return Ur.QuickLoaders['late_load'] = late_load;
})();

/* Map *
 * * * *
 * The map creates a fully functional google map (API version 3) from addresses.
 * 
 * It (will) also support current location / custom icons and callbacks / getting directions.
 *
 */

Ur.QuickLoaders['map'] = (function(){

  // -- Private functions --

  function ThresholdCallback(threshold, callback) {
    this.threshold = threshold;
    this.count = 0;
    this.callbacks = [];
    if (callback !== undefined) {
      this.callbacks.push(callback);
    }
  }
  
  ThresholdCallback.prototype.finish = function() {
    this.count += 1;
    if (this.count == this.threshold) {
      var callback = this.callbacks.pop();
      while(callback) {
        callback();
        callback = this.callbacks.pop();
      }
    }
  }

  // -- End of Private functions -- 



  function Map(data){
    this.elements = data;
    this.fetch_map(); //This is async -- it calls initialize when done
  }

  // NOTE : All this map stuff is async. The execution path goes:
  // 
  // fetch_map() -> 
  // fetch_coordinates() -> 
  // setup_map() -> 
  //     add_coordinates()
  //     setup_user_location()

  Map.prototype = {
    marker_clicked: function(map_event, marker_index) {

      x$().iterate(
        this.elements["descriptions"],
        function(description, index) {
          if(index == marker_index) {
            x$(description).attr("data-ur-state","enabled");
          } else {
            x$(description).attr("data-ur-state","disabled");            
          }
        }
      );      
      
      // TODO: I probably want to add the ability to specify your own callback, which would get called here
    },

    fetch_coordinates: function(){
      this.coordinates = [];
      this.center = [0,0];
      this.lat_range = {};
      this.lng_range = {};

      var geocoder = new google.maps.Geocoder();
      var obj = this;
      var final_callback = new ThresholdCallback(
        this.elements["addresses"].length,
        function(obj){return function(){obj.setup_map();}}(this)
      );

      x$(this.elements["addresses"]).each(
        function(address, index) {
          address = address.innerText;
          var cleaned_address = address.match(/(\S.*\S)[$\s]/m)[1];
          
          if(cleaned_address == undefined){
            cleaned_address = address;
          }

          geocoder.geocode(
            {"address": cleaned_address},
            function(results, status) {
              var position = null; 

              if(status === google.maps.GeocoderStatus.OK) {
                position = results[0].geometry.location;
                obj.coordinates[index] = position;
                obj.center[0] += position.lat();
                obj.center[1] += position.lng();

                var ne = results[0].geometry.viewport.getNorthEast();
                var sw = results[0].geometry.viewport.getSouthWest();

                if ( (obj.lat_range["min"] && obj.lat_range["min"] > sw.lat()) || obj.lat_range["min"] === undefined) {
                  obj.lat_range["min"] = sw.lat();
                }

                if ( (obj.lat_range["max"] && obj.lat_range["max"] < sw.lat()) || obj.lat_range["max"] === undefined) {
                  obj.lat_range["max"] = ne.lat();
                }

                if ( (obj.lng_range["min"] && obj.lng_range["min"] > sw.lng()) || obj.lng_range["min"] === undefined) {
                  obj.lng_range["min"] = sw.lng();
                }

                if ( (obj.lng_range["max"] && obj.lng_range["max"] < sw.lng()) || obj.lng_range["max"] === undefined) {
                  obj.lng_range["max"] = ne.lng();
                }

                final_callback.finish();
              } else {
                console.error("Error geocoding address: " + address);
              }

            }
          );
        }
      );

    },

    add_coordinates: function() {
      var obj = this;
      var icon_url = x$(this.elements["icon"]).attr("data-ur-url")[0];

      var width = x$(this.elements["icon"]).attr("data-ur-width")[0];
      var height = x$(this.elements["icon"]).attr("data-ur-height")[0];

      var size = null;

      if(width !== undefined && height !== undefined){
        size = new google.maps.Size(parseInt(width), parseInt(height));
      }

      x$().iterate(
        obj.coordinates,
        function (point, index) {
          var icon_image = null;

          if (icon_url !== undefined) {
            icon_image = new google.maps.MarkerImage(icon_url, null, null, null, size);
          }

          var marker = new google.maps.Marker({
            position: point, 
            map: obj.map,
            icon: icon_image
          }); 

          google.maps.event.addListener(
            marker,
            'click',
            function(marker_index){
              return function(map_event){
                obj.marker_clicked(map_event, marker_index);
              };
            }(index)
          );

        }
      );
      
    },

    setup_user_location: function() {
      var user_location = this.elements["user_location"];
      this.user_location_marker = null;

      if(user_location === undefined) {
        return
      }

      // Add a listener on the button 

      var self = this;

      x$(user_location).on(
        'click',
        function(){self.toggle_user_location()}
      );

      // Now just determine if I should use it automatically or not

      if(x$(user_location).attr("data-ur-state")[0] === "enabled") {
        this.fetch_user_location();
      } 
      
    },

    fetch_user_location: function() {

      var success = function(obj){
        return function(position){
          obj.add_user_location(position);
        }
      }(this);

      var failure = function(){
          console.error("Ur : Error getting user location");
      };

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, failure);
      } else {
        console.error("Ur : Geolocation services not available");
      } 

    },

    add_user_location: function(point) {      
      var google_point = new google.maps.LatLng(point.coords.latitude, point.coords.longitude);

      this.user_location_marker = new google.maps.Marker({
        position: google_point, 
        map: this.map,
        icon: "//s3.amazonaws.com/moovweb-live-resources/map/dot-blue.png"
      }); 
      // TODO : Make this a real icon URL

      x$(this.elements["user_location"]).attr("data-ur-state","enabled");
    },

    toggle_user_location: function() {

      if(this.user_location_marker === null || this.user_location_marker === undefined) {
        this.fetch_user_location();
      } else {
        this.user_location_marker.setMap(null);
        delete this.user_location_marker;
        x$(this.elements["user_location"]).attr("data-ur-state","disabled");
      }

    },

    fetch_map: function() {
      var script = document.createElement("script");

      // Note:
      // - There can only be one map per page since I have to pass a global function name as
      //   the callback for the map code loading.
      // - The alternative is to generate unique global function names per instance ... but
      //   that requires eval() ... and "evals() are bad .... mkay?"

      // TODO: Can I at least hide it behind the Ur object?
      setup_uranium_map = function(obj){
        return function() {
          obj.fetch_coordinates();
        }
      }(this);

      script.src = "http://maps.googleapis.com/maps/api/js?sensor=true&callback=setup_uranium_map";

      this.elements["set"].appendChild(script);
    },

    setup_map: function() {
      
      this.center[0] /= this.elements["addresses"].length
      this.center[1] /= this.elements["addresses"].length

      var center = new google.maps.LatLng(this.center[0], this.center[1]);

      var options = {
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.elements["canvas"], options);

      var cumulative_sw = new google.maps.LatLng(this.lat_range["min"], this.lng_range["min"]);
      var cumulative_ne = new google.maps.LatLng(this.lat_range["max"], this.lng_range["max"]);

      var cumulative_bounds = new google.maps.LatLngBounds(cumulative_sw, cumulative_ne);

      this.map.fitBounds(cumulative_bounds);

      this.add_coordinates();
      this.setup_user_location();
    }

  }


  var ComponentConstructors = {
    "address" : function(group, component, type) {
      if (group["addresses"] === undefined) {
        group["addresses"] = [];
      }

      group["addresses"].push(component);
    },

    "description" : function(group, component, type) {
      if (group["descriptions"] === undefined) {
        group["descriptions"] = [];
      }

      group["descriptions"].push(component);      
    }
  }

  function MapLoader(){
  }

  MapLoader.prototype.initialize = function(fragment) {
    var maps = x$(fragment).findElements('map', ComponentConstructors);
    Ur.Widgets["map"] = {};

    for(var name in maps) {
      var map = maps[name];
      Ur.Widgets["map"][name] = new Map(map);
      break;
      // There can only be one for now ... 
      // TODO: As long as I make the script adding a singleton process, I can have multiple maps
    }

  }

  return MapLoader;
})();

/* Select Buttons  *
 * * * * * * * * * *
 * The select-button widget binds two buttons to a <select> to increment/decrement
 * the select's chosen value.
 * 
 */

Ur.QuickLoaders['select-buttons'] = (function(){

  function SelectButtons(components) {
    this.select = components["select"];
    this.increment = components["increment"];
    this.decrement = components["decrement"];
    this.initialize();
  }

  SelectButtons.prototype.initialize = function() {
    x$(this.increment).click(function(obj){return function(evt){obj.trigger_option(evt, 1)};}(this));
    x$(this.decrement).click(function(obj){return function(evt){obj.trigger_option(evt, -1)};}(this));
  }

  SelectButtons.prototype.trigger_option = function(event, direction) {
    var button = event.currentTarget;
    if (x$(button).attr("data-ur-state")[0] === "disabled") {
      return false;
    }
    var current_option = {};
    var value = this.select.value;
    var newValue = {"prev":null, "next":null};

    x$().iterate(
      this.select.children,
      function(option, index) {
        if(x$(option).attr("value")[0] == value) {
          current_option = {"element": option, "index": index};
        }

        if(typeof(current_option["index"]) == "undefined") {
          newValue["prev"] = x$(option).attr("value")[0];
        }

        if(index == current_option["index"] + 1) {
          newValue["next"] = x$(option).attr("value")[0];
        }
      }
    );

    var child_count = this.select.children.length;
    var new_index = current_option["index"] + direction;
    
    if (new_index == 0) {
      x$(this.decrement).attr("data-ur-state","disabled");
    } else {
      x$(this.decrement).attr("data-ur-state","enabled");
    }

    if (new_index == child_count - 1) {
      x$(this.increment).attr("data-ur-state","disabled");
    } else {
      x$(this.increment).attr("data-ur-state","enabled");
    }

    if (new_index < 0 || new_index == child_count) {
      return false;
    }

    direction = direction == 1 ? "next" : "prev";
    this.select.value = newValue[direction];

    return true;
  }



  // Potential bug: (not going to worry about it now)
  // This is a bit tricky since I need to update the classes on the buttons if they're on an extreme/edge
  // If the page can be loaded w any of the options selected, I can't apply these classes till onload
  // -- so the solution i guess is to add the disable classes to the html, and they'll be removed when initialized

  function SelectButtonsLoader(){
  }

  SelectButtonsLoader.prototype.initialize = function(fragment) {
    var select_buttons = x$(fragment).findElements('select-buttons');
    for (var name in select_buttons) {
      new SelectButtons(select_buttons[name]);
      x$(select_buttons[name]["set"]).attr("data-ur-state","enabled");
    }
  }

  return SelectButtonsLoader;
})();
/* Select List *
 * * * * * * * *
 * The select-list binds a set of uranium-elements to corresponding <option> 
 * elements of a <select>. Clicking the uranium-element sets the <select>'s 
 * value to match the corresponding <option> element.
 * 
 */

// A concern here is the initial state -- I think the default should be just
// that there is no initial state -- the user must click to update the state
// -- the reason is, if there is an initial state, the underlying selector's
// state may be different on render, and there will be a gap until onload 
// while the states mismatch -- if the user is fast enough to click a form 
// in that time, they will get unexpected results.

Ur.QuickLoaders['select-list'] = (function(){

  function SelectList(select_element, list_element){
    this.select = select_element;
    this.list = list_element;
    this.initialize();
  }

  SelectList.prototype.initialize = function() {
    x$(this.list).click(function(obj){return function(evt){obj.trigger_option(evt)}}(this));  
  }

  SelectList.prototype.trigger_option = function(event) {
    var selected_list_option = event.target;
    var self = this;
    var value = iterate(this, selected_list_option);
    //  x$(this.select).attr("value",value); //Odd - this doesn't work, but the following line does
    // -- I think 'value' is a special attribute ... its not in the attributes[] property of a node
    this.select.value = value;

    return true;
  }

  function iterate (obj, selected_obj) {
    var value = "";
    x$().iterate(
      obj.list.children,
      function(element, index){
        var val1 = element.getAttribute("value");
        var val2 = selected_obj.getAttribute("value");
        if(val1 == val2) {
          x$(element).attr("data-ur-state","enabled");
          value = x$(element).attr("value");
        } else {
          x$(element).attr("data-ur-state","disabled");
        }
      }
    );
    return value;
  }

  function matchSelected (obj) {
    var active = obj.select.children[obj.select.options.selectedIndex];
    iterate(obj, active);
  }

  function SelectListLoader(){
    this.SelectLists = {};
    // Keep instances here because we may need them in the future
    // - In v1 we had to listen for changes on the <select>'s and update appropriately
    // - Sometimes we had to listen for different events
  }


  SelectListLoader.prototype.initialize = function(fragment) {
    var select_lists = x$(fragment).findElements('select-list');
    var self = this;
    for (var name in select_lists) {
      var select_list = select_lists[name];
      self.SelectLists[name] = new SelectList(select_lists[name]["select"],select_lists[name]["content"]);
      x$(select_list["set"]).attr("data-ur-state","enabled");
      matchSelected(self.SelectLists[name])
    }
  }

  return SelectListLoader;
})();


/* 

basic structure of swipe toggler
you must define the swipe toggle name and one active element
from there this will create the swipe toggle ability.

show this off with a fade in and card deck carousel.

<div data-ur-swipe-toggle="my_name">
<span data-ur-state="active">item1</span><span>itme2</span><span>itme3</span>
</div>

*/

// this is a swipe toggler
Ur.QuickLoaders['SwipeToggle'] = (function () {

  function swipeToggleComponents (group, content_component) {
    // This is a 'collection' of components
    // -- if I see it again, I'll make this abstract
    if(group["slider"] === undefined) {
      group["slider"] = [];
    }
    group["slider"].push(content_component);
  }

  function SwipeToggle (swipe_element, name){
    var myName = name;
    var components = swipe_element;
    var self = this;
    var touch = {};

    var preferences = this.preferences = { dots: false, axis: "x", swipeUpdate: true, sensitivity: 10, loop: true,
                         touchbuffer: 20, tapActive: false,  touch: true, jump: 1, loop: true,
                         autoSpeed: 500 };
    

    this.flags = {touched: false, autoID: null}
    var flags = this.flags;

                                    
    var startPos = endPos = markerPos = {x: 0, y: 0, time: 0};

    var loadEvent = function (obj) {
      var event = document.createEvent("Event");
      event.initEvent("loaded", false, true);
      obj.dispatchEvent(event);
    }

    var autoScroll = function(mili_sec){
      name = setInterval(function (){
        console.log(name);
        var imageArray = slider.children.length;
        
        if(SwipeToggle.prototype.flags  == true){
          window.clearInterval(name);
          wipeToggle.prototype.flags  == false;
        }else{
          myCarousel.next(1);
        }
        
      },mili_sec);
    }

    var setTouch = function () {

      var pef_touch = self.preferences.touch;

      slider.addEventListener('touchstart', function (e){
        if (pef_touch == true){
          touch.start(e, this);
        }
      }, false);

      slider.addEventListener('touchmove', function (e){
        if (pef_touch == true){
          touch.move(e, this);
        }
      }, false);

      slider.addEventListener('touchend', function (e){
        if (pef_touch == true){
          touch.end(e, this);
        }
      }, false);
    }

    var swipeDirection = function (){

      if (preferences) {
        var buff = preferences.touchbuffer;
      }else{
        var buff = 0;
      }

      if(startPos[axis] < endPos[axis] - buff){
        return 1;//right or top >>
      }else if(startPos[axis] > endPos[axis] + buff){
        return 2;//left or bottom <<
      }else{
        return 3;//tap
      }
    }

    SwipeToggle.prototype.getActive = function (e) {
      var test = this.components.name;
      var active = x$('[data-ur-id="' + test + '"][data-ur-swipe-toggle-component="slider"] > [data-ur-state="active"]')[0];
      return active;
    }

    SwipeToggle.prototype.next = function () {

      var activeObj = this.getActive();
      var jump = this.preferences.jump;
      var children = activeObj.parentNode.children;

      for(var i = 0; i < jump; i++){
        if(lookAhead(activeObj) == true){
          var update = activeObj.nextElementSibling;
          activeObj = this.setActive(update);
        }else if(lookAhead(activeObj) == false && this.preferences.loop == true){
          this.setActive(children[0])
        } 
      }

      return activeObj;
    }

    SwipeToggle.prototype.prev = function () {
      var activeObj = this.getActive();
      var jump = this.preferences.jump;
      var children = activeObj.parentNode.children;
      var last = children.length -1;

      for(var i = 0; i < jump; i++){
        if(lookBehind(activeObj) == true){
          var update = activeObj.previousElementSibling;
          activeObj = this.setActive(update);
        }else if(lookBehind(activeObj) == false && this.preferences.loop == true){
          this.setActive(children[last])
        }
      }

      return activeObj;
    }

    var touch = {};

    touch.start = function (e) {
      flags.touched = true;

      markerPos = startPos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: e.timeStamp
      };

    }

    touch.move = function (e) {

      endPos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
      if(self.preferences.swipeUpdate == true){
        swipeUpdate(e);
      }

      var swipeDist =  endPos[axis] - startPos[axis];
    }

    touch.end = function (e) {
      endPos.time = e.timeStamp;

      touchMove(e)

      touch.clear();
    }

    touch.clear = function () {
      startPos = {};
      endPos = {};
      markerPos = {};
    }

    var swipeUpdate = function (e) {
      if(endPos[axis] + self.preferences.sensitivity < markerPos[axis]){
        self.next();
        markerPos = endPos;
        e.stopPropagation();
        e.preventDefault();
      }
      if(endPos[axis] - self.preferences.sensitivity > markerPos[axis]){
        self.prev();
        markerPos = endPos;
        e.stopPropagation();
        e.preventDefault();
      }
    }

    var touchMove = function (e) {
      var direction = swipeDirection();
      var target = e.target
      if (direction == 1) {
        self.prev()
      }else if (direction == 2){
        self.next()
      }else{
        if (target.parentNode == slider){
          self.setActive(target);
        }
      }
    }

    var activeIndex = function (Element){
      if (Element === undefined) {
        var obj = self.components.slider;
      } else {
        var obj = Element;
      }

      var length = obj.children.length;
      var i = 0;

      if (length > i) {
        for(i ; i < length; i++){
          if(obj.children[i].getAttribute('data-ur-state') == 'active'){
            break;
          }
        }
      }

      return i;
    }

    SwipeToggle.prototype.autoScroll = function (direction) {
      var imageArray = this.components.slider.children.length;
      var self = this;

      var autoID = name;

      window.clearInterval(this.flags.autoID);
       if (direction == "next" || direction == "prev"){}else{
        console.log("swipe_toggle: impropper autoScroll direction setting");
        direction = "next";
      }

     this.flags.autoID = autoID = window.setInterval(function (){
        var position = activeIndex();

        if((self.preferences.loop == false && position + 1 == imageArray) || flags.touched == true){
          window.clearInterval(self.flags.autoID);
        }else{
          self[direction]()
        }

      }, this.preferences.autoSpeed);
    }

    SwipeToggle.prototype.dots = function () {
      // create dots for the carousel
      
      var index = activeIndex(this.components.slider);
      var slider_name = this.components.name;
      var slider = this.components.slider;
      var imageLength = x$(slider)[0].children.length -1;
      var dotsDiv = document.createElement('div');
      var attributeName = "mw_swipe_toggle_dot"

      dotsDiv.setAttribute("class", "mw_" + slider_name + "_dots mw_swipe_dots")

      for(var i = 0; i < imageLength + 1; i++){
        tempDivHolder = document.createElement("div");
        tempDivHolder.id = 'mw_image_dot' + (i+1);
        dotsDiv.appendChild(tempDivHolder);
      }
      if (dotsDiv.children[0] === undefined){} else {
        dotsDiv.children[index].setAttribute(attributeName, "active");
      }
      x$(slider).after(dotsDiv);

      slider.addEventListener('update', function (e){
        // make new dot active
        var eventSlider = e.slider;
        var name = slider_name;
        var dots_name = "mw_" + slider_name + "_dots";

        var index = activeIndex(e.slider);

        for (var i = 0; i < imageLength + 1; i++) {
          dotsDiv.children[i].setAttribute(attributeName, "");
        }
        dotsDiv.children[index].setAttribute(attributeName, "active");
      });
    }

    SwipeToggle.prototype.autoPopulate = function (autoPopulateList, append) {
      var location = this.components.slider;
      if (autoPopulateList === undefined) {
        console.warn("Swipe Toggle: no items listed")
      }else if (append == "top" || append == "bottom"){
        for (var items in autoPopulateList) {
          x$(location)[append](autoPopulateList[items]);
        }
        this.setActive(this.components.slider.children[0]);
      }
    }

    if(components === undefined){}else{
      this.components = swipe_element;
      var slider = this.components.slider;

      x$(swipe_element['next']).on("click", function(e){
        Ur.Widgets.SwipeToggle[self.components.name].next(e);
      });
      x$(swipe_element['prev']).on("click", function(e){ 
        Ur.Widgets.SwipeToggle[self.components.name].prev(e);
      });

      if (this.components.slider.children[0] === undefined) {}else{
        this.setActive(this.getActive());
      }


      var axis = this.preferences.axis;
      if (axis == "x" || axis == "Y") {
      }else{
        Ur.error("incorrect axis set")
      }

      setTouch();

      if (this.preferences.dots == true) {
        this.dots()
      }
      loadEvent(this.components.slider);
    }
  }

  SwipeToggle.prototype.components = {}

  SwipeToggle.prototype.setActive = function (obj) {

    var activeChangeEvent = function (obj, parent) {
      var event = document.createEvent("Event");
      event.initEvent("update", false, true);
      event.active = obj;
      event.slider = obj.parentNode;
      event.activeElement = obj;
      parent.dispatchEvent(event);
    }

    var i;
    var slider = obj.parentNode;
    var siblings = slider.children.length;
    var previousSibling = obj.previousElementSibling;
    var nextSibling = obj.nextElementSibling;
    var nodeType = obj.nodeType;

    if (nodeType == 1 && slider == slider){
      obj.setAttribute("data-ur-state", "active");

      for(i=0; i<=siblings; i++){
        if(previousSibling === null || previousSibling === undefined){
          break;
        }else{
          previousSibling.setAttribute("data-ur-state", "prev" + (i+1));
          previousSibling = previousSibling.previousElementSibling;
        }
      }

      for(i=0; i<=siblings; i++){
        if(nextSibling === null || nextSibling === undefined){
          break;
        }else{
          nextSibling.setAttribute("data-ur-state", "next" + (i+1));
          nextSibling = nextSibling.nextElementSibling;
        }
      }
    }

    activeChangeEvent(obj, slider)

    return obj;
  }

  var lookAhead = function (obj) {
    if(obj.nextElementSibling === null){
      return false;
    }else{
      return true;
    }
  }

  var lookBehind = function (obj) {
    if(obj.previousElementSibling === null){
      return false;
    }else{
      return true;
    }
  }

  var find = function(fragment){
    var swipe_group = x$(fragment).findElements('swipe-toggle');

    for(var component_id in swipe_group) {
      var carousel_group = swipe_group[component_id];
      carousel_group.name = component_id;
      if (carousel_group["slider"] === undefined) {
        Ur.error("no slider found for toggler with id = " + component_id);
        continue;
      }else if (carousel_group["slider"].children[0] === undefined){
        Ur.warn("no children in slider: " + carousel_group )
      }else{
        carousel_group["slider"]["active"] = x$(carousel_group["slider"]).find("[data-ur-state='active']")[0];
        Ur.warn("no active element found for toggler with id = " + component_id);
        if (carousel_group["slider"]["active"] === undefined) {
          console.log("no active element in slider: " + component_id)
          carousel_group["slider"]["active"] = carousel_group["slider"].children[0];
          carousel_group["slider"]["active"].setAttribute("data-ur-state", "active")
          console.log("set active element")
          continue;
        }
      }
    }
    return swipe_group;
  }

  SwipeToggle.prototype.initialize = function (fragment) {
    var swipe_group = find(fragment);
    Ur.Widgets["SwipeToggle"] = {};

    var prefEvent = function (obj) {
      var event = document.createEvent("Event");
      event.initEvent("preferences", false, true);
      obj.components.slider.dispatchEvent(event);
    }


    for(var name in swipe_group){
      Ur.Widgets["SwipeToggle"][name] = new SwipeToggle(swipe_group[name]);
      prefEvent(Ur.Widgets["SwipeToggle"][name]);
    }

    return swipe_group;
  }

  return new SwipeToggle;
})



/* Tabs *
 * * * * * *
 * The tabs are like togglers with state. If one is opened, the others are closed
 * 
 * Question: Can I assume order is preserved? Ill use IDs for now
 */

Ur.QuickLoaders['tabs'] = (function(){
  function Tabs(data){
    this.elements = data;
    this.setup_callbacks();
  }

  Tabs.prototype.setup_callbacks = function() {
    var default_tab = null;

    for(var tab_id in this.elements["buttons"]) {

      var button = this.elements["buttons"][tab_id];
      var content = this.elements["contents"][tab_id];

      if (default_tab === null) {
        default_tab = tab_id;
      }

      if(content === undefined) {
        Ur.error("no matching tab content for tab button");
        return;
      }
      
      var state = x$(button).attr("data-ur-state")[0];
      if(state !== undefined && state == "enabled") {
        default_tab = -1;
      }
      
      var closeable = x$(this.elements["set"]).attr("data-ur-closeable")[0];
      closeable = (closeable !== undefined && closeable == "true") ? true : false;
      var self = this;
      x$(button).on(
        "click",
        function(evt) {
          var firstScrollTop = x$(evt.target).offset().top - window.pageYOffset;
          var this_tab_id = x$(evt.currentTarget).attr("data-ur-tab-id")[0];
          
          for(var tab_id in self.elements["buttons"]) {
            var button = self.elements["buttons"][tab_id];
            var content = self.elements["contents"][tab_id];

            if (tab_id !== this_tab_id) {
              x$(button).attr("data-ur-state","disabled");
              x$(content).attr("data-ur-state","disabled");
            }
            else {
              var new_state = "enabled";
              if (closeable) {
                var old_state = x$(button).attr("data-ur-state")[0];
                old_state = (old_state === undefined) ? "disabled" : old_state;
                new_state = (old_state == "enabled") ? "disabled" : "enabled";
              }
              x$(button).attr("data-ur-state", new_state);
              x$(content).attr("data-ur-state", new_state);
            }
          }
          var secondScrollTop = x$(evt.target).offset().top - window.pageYOffset;
          if ( secondScrollTop <= 0 ) {
            window.scrollBy(0, secondScrollTop - firstScrollTop);
          }
        }
      ); 
    }
  }
  
  var ComponentConstructors = {
    "button" : function(group, component, type) {
      if (group["buttons"] === undefined) {
        group["buttons"] = {}
      }
      
      var tab_id = x$(component).attr("data-ur-tab-id")[0];
      if (tab_id === undefined) {
        Ur.error("tab defined without a tab-id");
        return;
      }
      
      group["buttons"][tab_id] = component;
    },
    "content" : function(group, component, type) {
      if (group["contents"] === undefined) {
        group["contents"] = {}
      }
      
      var tab_id = x$(component).attr("data-ur-tab-id")[0];
      if (tab_id === undefined) {
        Ur.error("tab defined without a tab-id");
        return;
      }
      
      group["contents"][tab_id] = component;
    }
  }

  function TabsLoader(){
  }

  TabsLoader.prototype.initialize = function(fragment) {
    var tabs = x$(fragment).findElements('tabs', ComponentConstructors);
    Ur.Widgets["tabs"] = {};

    for(var name in tabs){
      var tab = tabs[name];
      Ur.Widgets["tabs"][name] = new Tabs(tabs[name]);
    }
  }

  return TabsLoader;
})();

/* Toggler *
* * * * * *
* The toggler alternates the state of all the content elements bound to the
* toggler button. 
* 
* If no initial state is provided, the default value 'disabled'
* is set upon initialization.
*/

Ur.QuickLoaders['toggler'] = (function(){
  function ToggleContentComponent (group, content_component) {
    // This is a 'collection' of components
    // -- if I see it again, I'll make this abstract
    if(group["content"] === undefined) {
      group["content"] = [];
    }
    group["content"].push(content_component);
  }

  function ToggleLoader(){
    this.component_constructors = {
      "content" : ToggleContentComponent
    };
  }

  ToggleLoader.prototype.find = function(fragment){
    var togglers = x$(fragment).findElements('toggler', this.component_constructors);
    var self=this;

    for(var toggler_id in togglers) {
      var toggler = togglers[toggler_id];

      if (toggler["button"] === undefined) {
        Ur.error("no button found for toggler with id=" + toggler_id);
        continue;
      }

      var toggler_state = x$(toggler["button"]).attr("data-ur-state")[0];
      if(toggler_state === undefined) {
        x$(toggler["button"]).attr("data-ur-state", 'disabled');
        toggler_state = "disabled";
      } 

      if (toggler["content"] === undefined) {
        Ur.error("no content found for toggler with id=" + toggler_id);
        continue;
      }

      // Make the content state match the button state
      x$().iterate(
        toggler["content"],
        function(content) {
          if (x$(content).attr("data-ur-state")[0] === undefined ) {
            x$(content).attr("data-ur-state", toggler_state)
          }
        }
      );

    }

    return togglers;
  }

  ToggleLoader.prototype.construct_button_callback = function(contents, set) {
    var self = this;
    return function(evt) { 
      var button = evt.currentTarget;
      var current_state = x$(button).attr("data-ur-state")[0];
      var new_state = current_state === "enabled" ? "disabled" : "enabled";

      x$(button).attr("data-ur-state", new_state);
      x$(set).attr("data-ur-state", new_state);

      x$().iterate(
        contents,
        function(content){
          var current_state = x$(content).attr("data-ur-state")[0];
          var new_state = current_state === "enabled" ? "disabled" : "enabled";
          x$(content).attr("data-ur-state", new_state);
        }
      );
    }
  }

  ToggleLoader.prototype.initialize = function(fragment) {
    var togglers = this.find(fragment);
    for(var name in togglers){
      var toggler = togglers[name];
      // if (togglers)
      x$(toggler["button"]).click(this.construct_button_callback(toggler["content"], toggler["set"]));
      x$(toggler["set"]).attr("data-ur-state","enabled");
    }
  }

  return ToggleLoader;
  })();

/* Zoom  *
 * * * * * * *
 * This is a zoom widget that zooms images to larger images
 * within the same container and allows for basic panning
 *
 */

Ur.WindowLoaders["zoom"] = (function() {

  function Zoom(components) {
    var self = this;
    
    this.container = components["view_container"];
    this.img = components["img"];
    this.prescale = false;
    this.width = this.height = 0;
    this.bigWidth = this.bigHeight = 0;
    this.canvasWidth = this.canvasHeight = 0;
    this.ratio = 1;
    this.state = "disabled";

    // Optionally:
    this.button = components["button"];
    this.idler = components["loading"];

    var $img = x$(this.img);
    var $idler = x$(this.idler);
    var $btn = x$(this.button);

    var boundX, boundY;
    var relX, relY;
    var offsetX = 0, offsetY = 0;
    var touchX = 0, touchY = 0;
    var mouseDown = false; // only used on non-touch browsers
    var mouseDrag = true;

    function initialize() {
      self.canvasWidth = self.canvasWidth || self.container.offsetWidth;
      self.canvasHeight = self.canvasHeight || self.container.offsetHeight;
      self.width = self.width || parseInt($img.attr("width")) || parseInt($img.getStyle("width")) || self.img.width;
      self.height = self.height || parseInt($img.attr("height")) || parseInt($img.getStyle("height")) || self.img.height;

      self.bigWidth = parseInt($img.attr("data-ur-width")) || self.img.naturalWidth;
      self.bigHeight = parseInt($img.attr("data-ur-height")) || self.img.naturalHeight;
      if ($img.attr("data-ur-width")[0] && $img.attr("data-ur-height")[0])
        self.prescale = true;

      self.ratio = self.bigWidth/self.width;

      boundX = (self.canvasWidth - self.bigWidth)/2;    // horizontal translation to view middle of image
      boundY = (self.canvasHeight - self.bigHeight)/2;  // vertical translation to view middle of image
    }

    function panStart(event) {
      if (event.target != self.img)
        return;
      mouseDrag = false;
      touchX = event.pageX;
      touchY = event.pageY;
      mouseDown = true;
      if (event.touches) {
        touchX = event.touches[0].pageX;
        touchY = event.touches[0].pageY;
      }

      var style = self.img.style;
      if (window.WebKitCSSMatrix) {
        var matrix = new WebKitCSSMatrix(style.webkitTransform);
        offsetX = matrix.m41;
        offsetY = matrix.m42;
      }
      else {
        var transform = style.MozTransform || style.OTransform || style.transform || "translate(0, 0)";
        transform = transform.replace(/.*?\(|\)/, "").split(",");

        offsetX = parseInt(transform[0]);
        offsetY = parseInt(transform[1]);
      }

      stifle(event);
    }

    function panMove(event) {
      if (!mouseDown || event.target != self.img) // NOTE: mouseDown should always be true on touch-enabled devices
        return;

      stifle(event);
      var x = event.pageX;
      var y = event.pageY;
      if (event.touches) {
        x = event.touches[0].pageX;
        y = event.touches[0].pageY;
      }
      var dx = x - touchX;
      var dy = y - touchY;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5)
        mouseDrag = true;
      var new_offsetX = bound(offsetX + dx, [-boundX, boundX]);
      var new_offsetY = bound(offsetY + dy, [-boundY, boundY]);
      transform(new_offsetX, new_offsetY, self.ratio);
    }

    function panEnd(event) {
      if (!mouseDrag)
        self.zoomOut();
      stifle(event);
      mouseDown = false;
      mouseDrag = true;
    }

    function transitionEnd() {
      if (self.state == "enabled-in") {
        $img.css({ webkitTransitionDelay: "", MozTransitionDelay: "", OTransitionDelay: "", transitionDelay: "" });
        
        self.img.src = $img.attr("data-ur-src")[0];
        if (loaded_imgs.indexOf(self.img.getAttribute("data-ur-src")) == -1) {
          setTimeout(function() {
            if (loaded_imgs.indexOf(self.img.getAttribute("data-ur-src")) == -1)
              $idler.attr("data-ur-state", "enabled");
          }, 16);
        }
        self.state = "enabled";
        self.container.setAttribute("data-ur-state", self.state);

        var touch = "ontouchstart" in window;
        var $container = x$(self.container);
        $container.on(touch ? "touchstart" : "mousedown", panStart);
        $container.on(touch ? "touchmove" : "mousemove", panMove);
        $container.on(touch ? "touchend" : "mouseup", panEnd);
      }
      else if (self.state == "enabled-out") {
        self.state = "disabled";
        self.container.setAttribute("data-ur-state", self.state);
        
        var touch = "ontouchstart" in window;
        var $container = x$(self.container);
        $container.un(touch ? "touchstart" : "mousedown", panStart);
        $container.un(touch ? "touchmove" : "mousemove", panMove);
        $container.un(touch ? "touchend" : "mouseup", panEnd);
      }
    }

    function zoomHelper(x, y) {
      $btn.attr("data-ur-state", "enabled");
      self.state = "enabled-in";
      self.container.setAttribute("data-ur-state", self.state);
      
      x = x ? x : 0;
      y = y ? y : 0;
      transform(x, y, self.ratio);
    }

    function transform(x, y, scale) {
      var t = "";
      if (x != undefined)
        t = translatePrefix + x + "px, " + y + "px" + translateSuffix;
      if (scale != undefined) {
        if (noScale3d)
          t += " scale(" + scale + ")";
        else
          t += " scale3d(" + scale + ", " + scale + ", 1)";
      }
      return $img.css({ webkitTransform: t, MozTransform: t, OTransform: t, transform: t });
    }

    // attempts to zoom in centering in on the area that was touched
    this.zoomIn = function(event) {
      if (self.state != "disabled")
        return;

      if (!self.width) {
        initialize();
        self.img.style.width = self.width + "px";
        self.img.style.height = self.height + "px";
      }

      var x = event.pageX, y = event.pageY;
      if (event.touches) {
        x = event.touches[0].pageX;
        y = event.touches[0].pageY;
      }

      // find touch location relative to image
      relX = event.offsetX;
      relY = event.offsetY;
      if (relX == undefined || relY == undefined) {
        var offset = self.img.getBoundingClientRect();
        relX = x - offset.left;
        relY = y - offset.top;
      }

      if (!self.prescale) {
        self.state = "enabled-in";
        self.img.src = $img.attr("data-ur-src")[0];
        setTimeout(function() {
          if (!self.prescale)
            $idler.attr("data-ur-state", "enabled");
        }, 0);
      }
      else {
        var translateX = bound(self.bigWidth/2 - self.ratio * relX, [-boundX, boundX]);
        var translateY = bound(self.bigHeight/2 - self.ratio * relY, [-boundY, boundY]);
        zoomHelper(translateX, translateY);
      }
    };

    this.zoomOut = function() {
      if (self.state != "enabled")
        return;
      $btn.attr("data-ur-state", "disabled");
      self.state = "enabled-out";
      self.container.setAttribute("data-ur-state", self.state);
      transform(0, 0, 1);
    };

    if (self.container.getAttribute("data-ur-touch") != "disabled")
      x$(self.container).click(self.zoomIn);

    $img.load(function() {
      if ($img.attr("src")[0] == $img.attr("data-ur-src")[0])
        loaded_imgs.push($img.attr("src")[0]);
      $idler.attr("data-ur-state", "disabled");
      if (!self.prescale && self.state == "enabled-in") {
        self.prescale = true;
        initialize();
        var translateX = bound(self.bigWidth/2 - self.ratio * relX, [-boundX, boundX]);
        var translateY = bound(self.bigHeight/2 - self.ratio * relY, [-boundY, boundY]);

        var delay = "0.3s";
        $img.css({ webkitTransitionDelay: delay, MozTransitionDelay: delay, OTransitionDelay: delay, transitionDelay: delay });

        zoomHelper(translateX, translateY);
      }
    });

    // zooms in to the center of the image
    this.zoom = function() {
      if (self.state == "disabled") {
        if (!self.width) {
          initialize();
          self.img.style.width = self.width + "px";
          self.img.style.height = self.height + "px";
        }

        if (self.prescale)
          zoomHelper(0, 0);
        else {
          self.state = "enabled-in";
          self.img.src = $img.attr("data-ur-src")[0];
          setTimeout(function() {
            // if prescale ?
            if (loaded_imgs.indexOf(self.img.getAttribute("data-ur-src")) == -1)
              $idler.attr("data-ur-state", "enabled");
          }, 0);
        }
      }
      else
        self.zoomOut();
    };

    // zoom in/out button, zooms in to the center of the image
    x$(self.button).click(self.zoom);

    x$.fn.iterate(["webkitTransitionEnd", "transitionend", "oTransitionEnd"], function(eventName) {
      $img.on(eventName, transitionEnd);
    });

    this.reset = function() {
      self.prescale = false;
      self.width = self.height = 0;
      $img.css({width: "", height: ""});
      transform();
      self.state = "enabled-out";
      transitionEnd();
      $idler.attr("data-ur-state", "disabled");
      $btn.attr("data-ur-state", "disabled");
    };
  }
  
  // Private shared variables
  
  var loaded_imgs = []; // sometimes the load event doesn't fire when the image src has been previously loaded
  
  var no3d = /Android [12]|Opera/.test(navigator.userAgent);

  var noTranslate3d = no3d;
  var noScale3d = no3d;

  var translatePrefix = noTranslate3d ? "translate(" : "translate3d(";
  var translateSuffix = noTranslate3d ? ")" : ", 0)";

  var scalePrefix = noScale3d ? " scale(" : " scale3d(";
  var scaleSuffix = noScale3d ? ")" : ", 1)";


  // Private shared methods

  function bound(num, range) {
    return Math.max(Math.min(range[0], num), range[1]);
  }

  function stifle(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Private constructors
  var ComponentConstructors = {
    
  };

  function ZoomLoader(){}

  ZoomLoader.prototype.initialize = function(fragment) {
    var zooms = x$(fragment).findElements("zoom", ComponentConstructors);
    Ur.Widgets["zoom"] = {};
    for (var name in zooms) {
      var zoom = zooms[name];
      Ur.Widgets["zoom"][name] = new Zoom(zoom);
    }
  }

  return ZoomLoader;
})();

/* Zoom Preview  *
 * * * * * * * * *
 * The zoom-preview widget provides a thumbnail button that when touched 
 * displays and translates the zoom-image.
 * 
 */

Ur.QuickLoaders['zoom-preview'] = (function(){

  function ZoomPreview(data){
    this.elements = data["elements"];
    this.modifier = {};
    
    if (data["modifier"] !== null) {
      this.modifier = data["modifier"];
    }
    this.dimensions = {};
    this.zoom = false;

    this.update();
    this.events = {"start": "touchstart", "move" : "touchmove", "end" : "touchend"};

    this.touch = xui.touch;

    // Would be cool to compile this out
    if (!this.touch)
      this.events = {"move" : "mousemove", "end" : "mouseout"};

    this.initialize();
    console.log("Zoom Preview Loaded");
  }

  ZoomPreview.prototype.rewrite_images = function(src, match, replace) {
    if(typeof(src) == "undefined")
      return false;

    if(match === undefined && replace === undefined) {
      match = this.modifier["zoom_image"]["match"];
      replace = this.modifier["zoom_image"]["replace"];
    }

    this.elements["zoom_image"].src = src.replace(match, replace);

    match = replace = null;

    if(this.modifier["button"]) {
      match = this.modifier["button"]["match"];
      replace = this.modifier["button"]["replace"];
    }

    if(match && replace) {
      this.elements["button"].src = this.elements["zoom_image"].src.replace(match, replace);
    } else {
      this.elements["button"].src = this.elements["zoom_image"].src;
    }

    var self = this;
    this.elements["zoom_image"].style.visibility = "hidden";
    x$(this.elements["zoom_image"]).on("load", function(){self.update()});  
    x$(this.elements["button"]).on("load", function(){x$(self.elements["button"]).addClass("loaded");});  
    // TODO: Make this callback add the 'loaded' state
  }

  ZoomPreview.prototype.update = function() {
    var self = this;
    x$().iterate(
      ["button","zoom_image","container"],
      function(elem) {
        self.dimensions[elem] = [self.elements[elem].offsetWidth, self.elements[elem].offsetHeight];
      }
    );  

    var offset = x$(this.elements["button"]).offset();
    var button_offset = [offset["left"], offset["top"]];

    this.button_center = [this.dimensions["button"][0]/2.0 + button_offset[0],
                          this.dimensions["button"][1]/2.0 + button_offset[1]];

    this.image_origin = [-1.0/2.0*this.dimensions["zoom_image"][0], -1.0/2.0*this.dimensions["zoom_image"][1]];
  }

  ZoomPreview.prototype.get_event_coordinates = function(event) {
    if (!this.touch){
      return [event.pageX, event.pageY];
    } else {
      if(event.touches.length == 1)
      {
        return [event.touches[0].pageX, event.touches[0].pageY];
      }
    }
  }

  ZoomPreview.prototype.initialize = function() {
    x$(this.elements["button"]).on(this.events["move"],function(obj){return function(evt){obj.scroll_zoom(evt)};}(this));
    x$(this.elements["button"]).on(this.events["end"],function(obj){return function(evt){obj.scroll_end(evt)};}(this));

    // To prevent scrolling:
    if(this.events["start"]) {
      x$(this.elements["button"]).on("touchstart",function(obj){return function(evt){evt.preventDefault()};}(this));
    }

    var self = this;
    x$(this.elements["thumbnails"]).click(
      function(obj) {
        return function(evt){
          if (evt.target.tagName != "IMG")
            return false;
          obj.rewrite_images(evt.target.src); //, obj.modifier["match"], obj.modifier["replace"]);
        };
      }(self)
    );

    // Setup the initial button/zoom image:
    this.normal_image_changed();

  }

  ZoomPreview.prototype.normal_image_changed = function(new_normal_image) {
    if (new_normal_image !== undefined) {
      this.elements["normal_image"] = new_normal_image;
    }

    img = x$(this.elements["normal_image"]);
    this.rewrite_images(img.attr("src")[0], this.modifier["normal_image"]["match"], this.modifier["normal_image"]["replace"]);
  }

  ZoomPreview.prototype.scroll_end = function(event) {
    this.elements["zoom_image"].style.visibility = "hidden";
  }

  ZoomPreview.prototype.scroll_zoom = function(event) {
    this.elements["zoom_image"].style.visibility = "visible";

    var position = this.get_event_coordinates(event);
    if (position === null) {return false};

    var percents = [(position[0] - this.button_center[0])/this.dimensions["button"][0],
                    (position[1] - this.button_center[1])/this.dimensions["button"][1]];

    var delta = [this.dimensions["zoom_image"][0] * percents[0],
                 this.dimensions["zoom_image"][1] * percents[1]];

    var translate = [this.image_origin[0] - delta[0],
                     this.image_origin[1] - delta[1]];
    
    translate = this.check_bounds(translate);
    this.elements["zoom_image"].style.webkitTransform = "translate3d(" + translate[0] + "px," + translate[1] + "px,0px)";
  }

  ZoomPreview.prototype.check_bounds = function(translate){
    var min = [this.dimensions["container"][0]-this.dimensions["zoom_image"][0], this.dimensions["container"][1]-this.dimensions["zoom_image"][1]];

    x$().iterate(
      [0,1],
      function(index){
        if (translate[index] >= 0)
          translate[index] = 0;
        if (translate[index] <= min[index])
          translate[index] = min[index];
      }
    );

    return translate;
  }

  var ComponentConstructors = {
    "_modifiers" : function(group, component, type, modifier_prefix) {
      if (group["modifier"] === undefined) {
        group["modifier"] = {};
      }
      
      var prefix = (modifier_prefix === undefined) ? "src" : "zoom";
      console.log("searching for modifier:", prefix, component);
      var match = x$(component).attr("data-ur-" + prefix + "-modifier-match")[0];
      var replace = x$(component).attr("data-ur-" + prefix + "-modifier-replace")[0];
      
      if(typeof(match) != "undefined" && typeof(replace) != "undefined") {
        console.log("found modifiers:",match,replace);
        group["modifier"][type] = {"match":new RegExp(match),"replace":replace};
      }
    },
    "_construct" : function(group, component, type, modifier_prefix) {
      if (group["elements"] === undefined) {
        group["elements"] = {};
      }
      group["elements"][type] = component;
      this._modifiers(group, component, type, modifier_prefix);
    },
    "normal_image" : function(group, component, type) {
      this._construct(group, component, type, "zoom");
    },
    "zoom_image" : function(group, component, type) {
      this._construct(group, component, type);
    },
    "button" : function(group, component, type) {
      this._construct(group, component, type);
    },  
    "container" : function(group, component, type) {
      this._construct(group, component, type);
    },  
    "thumbnails" : function(group, component, type) {
      this._construct(group, component, type);
    }  
  }

  function ZoomPreviewLoader(){
  }

  ZoomPreviewLoader.prototype.initialize = function(fragment) {
    this.zoom_previews = x$(fragment).findElements('zoom-preview', ComponentConstructors);
    Ur.Widgets["zoom-preview"] = {};
    for (var name in this.zoom_previews) {
      Ur.Widgets["zoom-preview"][name] = new ZoomPreview(this.zoom_previews[name]);
      x$(this.zoom_previews[name]["set"]).attr("data-ur-state","enabled");
    }
  }

  return ZoomPreviewLoader;
})();


/*
 * File: http://d1topzp4nao5hp.cloudfront.net/plutonium-upload/0.1.73/gsub.js
 */
/* Ruby style gsub / Sean Jezewski
 * * * * * * * * * 
 */

function single_split(big_string, delimiter) {
  var lower_boundary = big_string.indexOf(delimiter);
  var upper_boundary = lower_boundary + delimiter.length;
  return [big_string.substr(0, lower_boundary), big_string.substr(upper_boundary, big_string.length-1)];
}

function gsub(input, matcher, replace) {
  if(input === undefined) {
    // For example, applying passthrough to an attribute that doesn't exist
    // TODO: check to make sure downstream effects are ok
    console.error("gsub -- empty input:", arguments);
    return null;
  }
  if (matcher == "") {
    return input;
  }

  var captures = {};
  var match_data = null; 
  var head = "";
  var tail = input;
  var match = "";
  var is_string = (typeof(matcher) == 'string');

  var apply_matcher = function(tail) { return matcher.exec(tail); }

  if (is_string) {
    apply_matcher = function(tail) { return (tail.indexOf(matcher) == -1) ? null : [matcher];}
  }

  var counter = 0;

  //  while(match_data = matcher.exec(tail)) {
  while(match_data = apply_matcher(tail) ) {
    counter += 1;

    if(counter == 100) {
      return;
    }

    match = match_data[0];
    var parts = single_split(tail, match);

    head += parts[0];
    tail = parts[1];

    if(is_string) {
      head += replace;
    } else {

      x$().iterate(
        match_data,
        function(capture, index) {
          if (index == 0) {
            return;
          }
          captures[String(index)] = capture;
        }
      );

      // This is silly -- JS supports captures, but not yielding, so to support global replace w captures, I need implement it myself

      // Start replace string setup
      var head_replace_string = "";
      var tail_replace_string = replace;

      while(replace_data = /[\$\\]([\d])/.exec(tail_replace_string)) {
        var replacement_parts = single_split(tail_replace_string, replace_data[0]);

        head_replace_string += replacement_parts[0];
        tail_replace_string = replacement_parts[1];
        
        head_replace_string += captures[replace_data[1]];      
      }

      if(tail_replace_string.length > 0) {
        head_replace_string += tail_replace_string;
      }

      // End replace string setup

      head += head_replace_string;

    }

  }

  if(tail.length > 0) {
    head += tail;
  }

  return head;
}



/*
 * File: http://d1topzp4nao5hp.cloudfront.net/plutonium-upload/0.1.73/passthrough_ajax.js
 */
/* * * * * * * * * * * 
 * Tritium usage:
 * 1 - Add this script, and gsub script
 * 2 - Add an element on the page to configure the replacement:
 * 
     insert("div") {
       attribute("id", "mw_link_passthrough_config")
       attribute("rewrite_link_matcher", $rewrite_link_matcher)
       attribute("rewrite_link_replacement", $rewrite_link_replacement)
     }
 * 
 * 
 */

(function(){

    var matcher = null;
    var replace = null;

    function get_config(config_element) {
        var raw_matcher = config_element.getAttribute("rewrite_link_matcher");
				if (raw_matcher !== null) {
        	matcher = new RegExp(raw_matcher, "g");
				}

        replace = config_element.getAttribute("rewrite_link_replacement");
    }

		function normalize_host(host) {
			if (host[host.length-1] == "/") {
				host = host.slice(0,host.length-1);
			}
			return host;
		}	

		function split_schema_and_host(schema_and_host) {
			parts = schema_and_host.split("//");
			schema = parts[0];
			host = parts[1];
			return {
				"schema" : schema + "//",
				"host" : normalize_host(host)
			}
		}
			
		// Splits into schema / host / path			
		function url_components(url) {
			length = url.length;
			var previous = "";
			var found_slash = false;
			
			for(var i=0; i < length; i++) {
				if (url[i] == "/") {
					if (previous != "/" && found_slash) {
						path = url.slice(i+1, length);
						parts = split_schema_and_host(url.slice(0, i+1));

						return {
							"schema" : parts.schema,
							"host" : parts.host,							
							"path" : path							
						}
					} else {
						found_slash = false;
					}
					
					found_slash = true;					
				}
				previous = url[i];
			}
			
			// Never found the start of path ... the whole thing is the 'host' part
			parts = split_schema_and_host(url);
			
			return {
				"schema" : parts.schema,
				"host" : parts.host,							
				"path" : ""							
			}			
			
		}


    function passthrough_url(url) {
      var temp_url = url;
      var config_element = document.getElementById('mw_link_passthrough_config');  
			var use_host_map = false;


      if (config_element !== null) {
        if (!matcher && !replace) {
          get_config(config_element);
        }

				if (!matcher && !replace) {
					use_host_map = true;
				} else {
        	temp_url = gsub(url, matcher, replace);
				}
      } else {
				return mw.originURLToProxy(url);
			}
			
      return temp_url;
    }


    function hijack_open(method, url, some_boolean) {
        var new_url = passthrough_url(url);
        this._open(method, new_url, some_boolean);

        // Semi-standard header used by tritium to differentiate Ajax requests from regular page requests
        this.setRequestHeader("X-Requested-With", "XMLHttpRequest") 

    }

    if (XMLHttpRequest)
    {
        XMLHttpRequest.prototype._open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = hijack_open;
    } else if (ActiveXObject)
    {
        ActiveXObject.prototype._open = ActiveXObject.prototype.open;
        ActiveXObject.prototype.open = hijack_open;
    }

})();



/*
 * File: http://d1topzp4nao5hp.cloudfront.net/plutonium-upload/0.1.68/auto_scroll.js
 */
x$(window).on(
  'load',
  function(){setTimeout(function(){ if (window.pageYOffset < 50) {window.scrollTo(0,1);}},0);}
);
                  
x$(window).on(
  'load',
  function(){setTimeout(function(){ if (parent.window.pageYOffset < 50) {parent.window.scrollTo(0,1);}},0);}
);


/*
 * File: main/_touchSwipe.js
 */
(function(e){var o="left",n="right",d="up",v="down",c="in",w="out",l="none",r="auto",k="swipe",s="pinch",x="tap",i="doubletap",b="longtap",A="horizontal",t="vertical",h="all",q=10,f="start",j="move",g="end",p="cancel",a="ontouchstart" in window,y="TouchSwipe";var m={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"button, input, select, textarea, a, .noSwipe"};e.fn.swipe=function(D){var C=e(this),B=C.data(y);if(B&&typeof D==="string"){if(B[D]){return B[D].apply(this,Array.prototype.slice.call(arguments,1))}else{e.error("Method "+D+" does not exist on jQuery.swipe")}}else{if(!B&&(typeof D==="object"||!D)){return u.apply(this,arguments)}}return C};e.fn.swipe.defaults=m;e.fn.swipe.phases={PHASE_START:f,PHASE_MOVE:j,PHASE_END:g,PHASE_CANCEL:p};e.fn.swipe.directions={LEFT:o,RIGHT:n,UP:d,DOWN:v,IN:c,OUT:w};e.fn.swipe.pageScroll={NONE:l,HORIZONTAL:A,VERTICAL:t,AUTO:r};e.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:h};function u(B){if(B&&(B.allowPageScroll===undefined&&(B.swipe!==undefined||B.swipeStatus!==undefined))){B.allowPageScroll=l}if(B.click!==undefined&&B.tap===undefined){B.tap=B.click}if(!B){B={}}B=e.extend({},e.fn.swipe.defaults,B);return this.each(function(){var D=e(this);var C=D.data(y);if(!C){C=new z(this,B);D.data(y,C)}})}function z(a0,aq){var av=(a||!aq.fallbackToMouseEvents),G=av?"touchstart":"mousedown",au=av?"touchmove":"mousemove",R=av?"touchend":"mouseup",P=av?null:"mouseleave",az="touchcancel";var ac=0,aL=null,Y=0,aX=0,aV=0,D=1,am=0,aF=0,J=null;var aN=e(a0);var W="start";var T=0;var aM=null;var Q=0,aY=0,a1=0,aa=0,K=0;var aS=null;try{aN.bind(G,aJ);aN.bind(az,a5)}catch(ag){e.error("events not supported "+G+","+az+" on jQuery.swipe")}this.enable=function(){aN.bind(G,aJ);aN.bind(az,a5);return aN};this.disable=function(){aG();return aN};this.destroy=function(){aG();aN.data(y,null);return aN};this.option=function(a8,a7){if(aq[a8]!==undefined){if(a7===undefined){return aq[a8]}else{aq[a8]=a7}}else{e.error("Option "+a8+" does not exist on jQuery.swipe.options")}};function aJ(a9){if(ax()){return}if(e(a9.target).closest(aq.excludedElements,aN).length>0){return}var ba=a9.originalEvent?a9.originalEvent:a9;var a8,a7=a?ba.touches[0]:ba;W=f;if(a){T=ba.touches.length}else{a9.preventDefault()}ac=0;aL=null;aF=null;Y=0;aX=0;aV=0;D=1;am=0;aM=af();J=X();O();if(!a||(T===aq.fingers||aq.fingers===h)||aT()){ae(0,a7);Q=ao();if(T==2){ae(1,ba.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}if(aq.swipeStatus||aq.pinchStatus){a8=L(ba,W)}}else{a8=false}if(a8===false){W=p;L(ba,W);return a8}else{ak(true)}}function aZ(ba){var bd=ba.originalEvent?ba.originalEvent:ba;if(W===g||W===p||ai()){return}var a9,a8=a?bd.touches[0]:bd;var bb=aD(a8);aY=ao();if(a){T=bd.touches.length}W=j;if(T==2){if(aX==0){ae(1,bd.touches[1]);aX=aV=ap(aM[0].start,aM[1].start)}else{aD(bd.touches[1]);aV=ap(aM[0].end,aM[1].end);aF=an(aM[0].end,aM[1].end)}D=a3(aX,aV);am=Math.abs(aX-aV)}if((T===aq.fingers||aq.fingers===h)||!a||aT()){aL=aH(bb.start,bb.end);ah(ba,aL);ac=aO(bb.start,bb.end);Y=aI();aE(aL,ac);if(aq.swipeStatus||aq.pinchStatus){a9=L(bd,W)}if(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave){var a7=true;if(aq.triggerOnTouchLeave){var bc=aU(this);a7=B(bb.end,bc)}if(!aq.triggerOnTouchEnd&&a7){W=ay(j)}else{if(aq.triggerOnTouchLeave&&!a7){W=ay(g)}}if(W==p||W==g){L(bd,W)}}}else{W=p;L(bd,W)}if(a9===false){W=p;L(bd,W)}}function I(a7){var a8=a7.originalEvent;if(a){if(a8.touches.length>0){C();return true}}if(ai()){T=aa}a7.preventDefault();aY=ao();Y=aI();if(a6()){W=p;L(a8,W)}else{if(aq.triggerOnTouchEnd||(aq.triggerOnTouchEnd==false&&W===j)){W=g;L(a8,W)}else{if(!aq.triggerOnTouchEnd&&a2()){W=g;aB(a8,W,x)}else{if(W===j){W=p;L(a8,W)}}}}ak(false)}function a5(){T=0;aY=0;Q=0;aX=0;aV=0;D=1;O();ak(false)}function H(a7){var a8=a7.originalEvent;if(aq.triggerOnTouchLeave){W=ay(g);L(a8,W)}}function aG(){aN.unbind(G,aJ);aN.unbind(az,a5);aN.unbind(au,aZ);aN.unbind(R,I);if(P){aN.unbind(P,H)}ak(false)}function ay(bb){var ba=bb;var a9=aw();var a8=aj();var a7=a6();if(!a9||a7){ba=p}else{if(a8&&bb==j&&(!aq.triggerOnTouchEnd||aq.triggerOnTouchLeave)){ba=g}else{if(!a8&&bb==g&&aq.triggerOnTouchLeave){ba=p}}}return ba}function L(a9,a7){var a8=undefined;if(F()||S()){a8=aB(a9,a7,k)}else{if((M()||aT())&&a8!==false){a8=aB(a9,a7,s)}}if(aC()&&a8!==false){a8=aB(a9,a7,i)}else{if(al()&&a8!==false){a8=aB(a9,a7,b)}else{if(ad()&&a8!==false){a8=aB(a9,a7,x)}}}if(a7===p){a5(a9)}if(a7===g){if(a){if(a9.touches.length==0){a5(a9)}}else{a5(a9)}}return a8}function aB(ba,a7,a9){var a8=undefined;if(a9==k){aN.trigger("swipeStatus",[a7,aL||null,ac||0,Y||0,T]);if(aq.swipeStatus){a8=aq.swipeStatus.call(aN,ba,a7,aL||null,ac||0,Y||0,T);if(a8===false){return false}}if(a7==g&&aR()){aN.trigger("swipe",[aL,ac,Y,T]);if(aq.swipe){a8=aq.swipe.call(aN,ba,aL,ac,Y,T);if(a8===false){return false}}switch(aL){case o:aN.trigger("swipeLeft",[aL,ac,Y,T]);if(aq.swipeLeft){a8=aq.swipeLeft.call(aN,ba,aL,ac,Y,T)}break;case n:aN.trigger("swipeRight",[aL,ac,Y,T]);if(aq.swipeRight){a8=aq.swipeRight.call(aN,ba,aL,ac,Y,T)}break;case d:aN.trigger("swipeUp",[aL,ac,Y,T]);if(aq.swipeUp){a8=aq.swipeUp.call(aN,ba,aL,ac,Y,T)}break;case v:aN.trigger("swipeDown",[aL,ac,Y,T]);if(aq.swipeDown){a8=aq.swipeDown.call(aN,ba,aL,ac,Y,T)}break}}}if(a9==s){aN.trigger("pinchStatus",[a7,aF||null,am||0,Y||0,T,D]);if(aq.pinchStatus){a8=aq.pinchStatus.call(aN,ba,a7,aF||null,am||0,Y||0,T,D);if(a8===false){return false}}if(a7==g&&a4()){switch(aF){case c:aN.trigger("pinchIn",[aF||null,am||0,Y||0,T,D]);if(aq.pinchIn){a8=aq.pinchIn.call(aN,ba,aF||null,am||0,Y||0,T,D)}break;case w:aN.trigger("pinchOut",[aF||null,am||0,Y||0,T,D]);if(aq.pinchOut){a8=aq.pinchOut.call(aN,ba,aF||null,am||0,Y||0,T,D)}break}}}if(a9==x){if(a7===p||a7===g){clearTimeout(aS);if(V()&&!E()){K=ao();aS=setTimeout(e.proxy(function(){K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}},this),aq.doubleTapThreshold)}else{K=null;aN.trigger("tap",[ba.target]);if(aq.tap){a8=aq.tap.call(aN,ba,ba.target)}}}}else{if(a9==i){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("doubletap",[ba.target]);if(aq.doubleTap){a8=aq.doubleTap.call(aN,ba,ba.target)}}}else{if(a9==b){if(a7===p||a7===g){clearTimeout(aS);K=null;aN.trigger("longtap",[ba.target]);if(aq.longTap){a8=aq.longTap.call(aN,ba,ba.target)}}}}}return a8}function aj(){var a7=true;if(aq.threshold!==null){a7=ac>=aq.threshold}return a7}function a6(){var a7=false;if(aq.cancelThreshold!==null&&aL!==null){a7=(aP(aL)-ac)>=aq.cancelThreshold}return a7}function ab(){if(aq.pinchThreshold!==null){return am>=aq.pinchThreshold}return true}function aw(){var a7;if(aq.maxTimeThreshold){if(Y>=aq.maxTimeThreshold){a7=false}else{a7=true}}else{a7=true}return a7}function ah(a7,a8){if(aq.allowPageScroll===l||aT()){a7.preventDefault()}else{var a9=aq.allowPageScroll===r;switch(a8){case o:if((aq.swipeLeft&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case n:if((aq.swipeRight&&a9)||(!a9&&aq.allowPageScroll!=A)){a7.preventDefault()}break;case d:if((aq.swipeUp&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break;case v:if((aq.swipeDown&&a9)||(!a9&&aq.allowPageScroll!=t)){a7.preventDefault()}break}}}function a4(){var a8=aK();var a7=U();var a9=ab();return a8&&a7&&a9}function aT(){return !!(aq.pinchStatus||aq.pinchIn||aq.pinchOut)}function M(){return !!(a4()&&aT())}function aR(){var ba=aw();var bc=aj();var a9=aK();var a7=U();var a8=a6();var bb=!a8&&a7&&a9&&bc&&ba;return bb}function S(){return !!(aq.swipe||aq.swipeStatus||aq.swipeLeft||aq.swipeRight||aq.swipeUp||aq.swipeDown)}function F(){return !!(aR()&&S())}function aK(){return((T===aq.fingers||aq.fingers===h)||!a)}function U(){return aM[0].end.x!==0}function a2(){return !!(aq.tap)}function V(){return !!(aq.doubleTap)}function aQ(){return !!(aq.longTap)}function N(){if(K==null){return false}var a7=ao();return(V()&&((a7-K)<=aq.doubleTapThreshold))}function E(){return N()}function at(){return((T===1||!a)&&(isNaN(ac)||ac===0))}function aW(){return((Y>aq.longTapThreshold)&&(ac<q))}function ad(){return !!(at()&&a2())}function aC(){return !!(N()&&V())}function al(){return !!(aW()&&aQ())}function C(){a1=ao();aa=event.touches.length+1}function O(){a1=0;aa=0}function ai(){var a7=false;if(a1){var a8=ao()-a1;if(a8<=aq.fingerReleaseThreshold){a7=true}}return a7}function ax(){return !!(aN.data(y+"_intouch")===true)}function ak(a7){if(a7===true){aN.bind(au,aZ);aN.bind(R,I);if(P){aN.bind(P,H)}}else{aN.unbind(au,aZ,false);aN.unbind(R,I,false);if(P){aN.unbind(P,H,false)}}aN.data(y+"_intouch",a7===true)}function ae(a8,a7){var a9=a7.identifier!==undefined?a7.identifier:0;aM[a8].identifier=a9;aM[a8].start.x=aM[a8].end.x=a7.pageX||a7.clientX;aM[a8].start.y=aM[a8].end.y=a7.pageY||a7.clientY;return aM[a8]}function aD(a7){var a9=a7.identifier!==undefined?a7.identifier:0;var a8=Z(a9);a8.end.x=a7.pageX||a7.clientX;a8.end.y=a7.pageY||a7.clientY;return a8}function Z(a8){for(var a7=0;a7<aM.length;a7++){if(aM[a7].identifier==a8){return aM[a7]}}}function af(){var a7=[];for(var a8=0;a8<=5;a8++){a7.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return a7}function aE(a7,a8){a8=Math.max(a8,aP(a7));J[a7].distance=a8}function aP(a7){return J[a7].distance}function X(){var a7={};a7[o]=ar(o);a7[n]=ar(n);a7[d]=ar(d);a7[v]=ar(v);return a7}function ar(a7){return{direction:a7,distance:0}}function aI(){return aY-Q}function ap(ba,a9){var a8=Math.abs(ba.x-a9.x);var a7=Math.abs(ba.y-a9.y);return Math.round(Math.sqrt(a8*a8+a7*a7))}function a3(a7,a8){var a9=(a8/a7)*1;return a9.toFixed(2)}function an(){if(D<1){return w}else{return c}}function aO(a8,a7){return Math.round(Math.sqrt(Math.pow(a7.x-a8.x,2)+Math.pow(a7.y-a8.y,2)))}function aA(ba,a8){var a7=ba.x-a8.x;var bc=a8.y-ba.y;var a9=Math.atan2(bc,a7);var bb=Math.round(a9*180/Math.PI);if(bb<0){bb=360-Math.abs(bb)}return bb}function aH(a8,a7){var a9=aA(a8,a7);if((a9<=45)&&(a9>=0)){return o}else{if((a9<=360)&&(a9>=315)){return o}else{if((a9>=135)&&(a9<=225)){return n}else{if((a9>45)&&(a9<135)){return v}else{return d}}}}}function ao(){var a7=new Date();return a7.getTime()}function aU(a7){a7=e(a7);var a9=a7.offset();var a8={left:a9.left,right:a9.left+a7.outerWidth(),top:a9.top,bottom:a9.top+a7.outerHeight()};return a8}function B(a7,a8){return(a7.x>a8.left&&a7.x<a8.right&&a7.y>a8.top&&a7.y<a8.bottom)}}})(jQuery);


/*
 * File: main/misc.js
 */
function panes(new_lvl, specific) {
	$(".pane").removeClass("active faded");
	$(".pane[data-num='"+new_lvl+"']").addClass("active");
	
	$(".pane").each(function(){
		if($(this).attr("data-num") > new_lvl) $(this).addClass("faded");
	});

	if(specific) $(".pane:not('#"+specific+"')").removeClass("active");

	lvl = new_lvl;
}


var lvl = 3, ww,wh;
$(document).ready(function(){
	$("#_wrapper").swipe({
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			dir = $(".pane[data-num='"+lvl+"']").attr("data-dir");
			if( dir == "d") panes(lvl-1) 
		},swipeLeft:function(event, direction, distance, duration, fingerCount) {
			dir = $(".pane[data-num='"+lvl+"']").attr("data-dir");
			if( dir != "d") panes(lvl+1) 
		}
	});

	$(".menu_item a").on("click", function(e){
		if($(this).attr("href") == "#"){
			e.preventDefault();
			specific = $(this).parent().attr("data-id");
			new_lvl = parseInt($("#"+specific).attr("data-num"));
			panes(new_lvl, specific);
		}
	});

	$("._toggle_header").on("click", function(e) {
		e.stopPropagation();
		$(this).toggleClass("open");
	});
});
