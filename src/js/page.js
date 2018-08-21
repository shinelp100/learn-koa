/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* axios v0.18.0 | (c) 2018 by Matt Zabriskie */
!function (e, t) {
	"object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.axios = t() : e.axios = t();
}(undefined, function () {
	return function (e) {
		function t(r) {
			if (n[r]) return n[r].exports;var o = n[r] = { exports: {}, id: r, loaded: !1 };return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports;
		}var n = {};return t.m = e, t.c = n, t.p = "", t(0);
	}([function (e, t, n) {
		e.exports = n(1);
	}, function (e, t, n) {
		"use strict";
		function r(e) {
			var t = new s(e),
			    n = i(s.prototype.request, t);return o.extend(n, s.prototype, t), o.extend(n, t), n;
		}var o = n(2),
		    i = n(3),
		    s = n(5),
		    u = n(6),
		    a = r(u);a.Axios = s, a.create = function (e) {
			return r(o.merge(u, e));
		}, a.Cancel = n(23), a.CancelToken = n(24), a.isCancel = n(20), a.all = function (e) {
			return Promise.all(e);
		}, a.spread = n(25), e.exports = a, e.exports.default = a;
	}, function (e, t, n) {
		"use strict";
		function r(e) {
			return "[object Array]" === R.call(e);
		}function o(e) {
			return "[object ArrayBuffer]" === R.call(e);
		}function i(e) {
			return "undefined" != typeof FormData && e instanceof FormData;
		}function s(e) {
			var t;return t = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer;
		}function u(e) {
			return "string" == typeof e;
		}function a(e) {
			return "number" == typeof e;
		}function c(e) {
			return "undefined" == typeof e;
		}function f(e) {
			return null !== e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e));
		}function p(e) {
			return "[object Date]" === R.call(e);
		}function d(e) {
			return "[object File]" === R.call(e);
		}function l(e) {
			return "[object Blob]" === R.call(e);
		}function h(e) {
			return "[object Function]" === R.call(e);
		}function m(e) {
			return f(e) && h(e.pipe);
		}function y(e) {
			return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams;
		}function w(e) {
			return e.replace(/^\s*/, "").replace(/\s*$/, "");
		}function g() {
			return ("undefined" == typeof navigator || "ReactNative" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document;
		}function v(e, t) {
			if (null !== e && "undefined" != typeof e) if ("object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && (e = [e]), r(e)) for (var n = 0, o = e.length; n < o; n++) {
				t.call(null, e[n], n, e);
			} else for (var i in e) {
				Object.prototype.hasOwnProperty.call(e, i) && t.call(null, e[i], i, e);
			}
		}function x() {
			function e(e, n) {
				"object" == _typeof(t[n]) && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? t[n] = x(t[n], e) : t[n] = e;
			}for (var t = {}, n = 0, r = arguments.length; n < r; n++) {
				v(arguments[n], e);
			}return t;
		}function b(e, t, n) {
			return v(t, function (t, r) {
				n && "function" == typeof t ? e[r] = E(t, n) : e[r] = t;
			}), e;
		}var E = n(3),
		    C = n(4),
		    R = Object.prototype.toString;e.exports = { isArray: r, isArrayBuffer: o, isBuffer: C, isFormData: i, isArrayBufferView: s, isString: u, isNumber: a, isObject: f, isUndefined: c, isDate: p, isFile: d, isBlob: l, isFunction: h, isStream: m, isURLSearchParams: y, isStandardBrowserEnv: g, forEach: v, merge: x, extend: b, trim: w };
	}, function (e, t) {
		"use strict";
		e.exports = function (e, t) {
			return function () {
				for (var n = new Array(arguments.length), r = 0; r < n.length; r++) {
					n[r] = arguments[r];
				}return e.apply(t, n);
			};
		};
	}, function (e, t) {
		function n(e) {
			return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
		}function r(e) {
			return "function" == typeof e.readFloatLE && "function" == typeof e.slice && n(e.slice(0, 0));
		} /*!
    * Determine if an object is a Buffer
    *
    * @author   Feross Aboukhadijeh <https://feross.org>
    * @license  MIT
    */
		e.exports = function (e) {
			return null != e && (n(e) || r(e) || !!e._isBuffer);
		};
	}, function (e, t, n) {
		"use strict";
		function r(e) {
			this.defaults = e, this.interceptors = { request: new s(), response: new s() };
		}var o = n(6),
		    i = n(2),
		    s = n(17),
		    u = n(18);r.prototype.request = function (e) {
			"string" == typeof e && (e = i.merge({ url: arguments[0] }, arguments[1])), e = i.merge(o, { method: "get" }, this.defaults, e), e.method = e.method.toLowerCase();var t = [u, void 0],
			    n = Promise.resolve(e);for (this.interceptors.request.forEach(function (e) {
				t.unshift(e.fulfilled, e.rejected);
			}), this.interceptors.response.forEach(function (e) {
				t.push(e.fulfilled, e.rejected);
			}); t.length;) {
				n = n.then(t.shift(), t.shift());
			}return n;
		}, i.forEach(["delete", "get", "head", "options"], function (e) {
			r.prototype[e] = function (t, n) {
				return this.request(i.merge(n || {}, { method: e, url: t }));
			};
		}), i.forEach(["post", "put", "patch"], function (e) {
			r.prototype[e] = function (t, n, r) {
				return this.request(i.merge(r || {}, { method: e, url: t, data: n }));
			};
		}), e.exports = r;
	}, function (e, t, n) {
		"use strict";
		function r(e, t) {
			!i.isUndefined(e) && i.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
		}function o() {
			var e;return "undefined" != typeof XMLHttpRequest ? e = n(8) : "undefined" != typeof process && (e = n(8)), e;
		}var i = n(2),
		    s = n(7),
		    u = { "Content-Type": "application/x-www-form-urlencoded" },
		    a = { adapter: o(), transformRequest: [function (e, t) {
				return s(t, "Content-Type"), i.isFormData(e) || i.isArrayBuffer(e) || i.isBuffer(e) || i.isStream(e) || i.isFile(e) || i.isBlob(e) ? e : i.isArrayBufferView(e) ? e.buffer : i.isURLSearchParams(e) ? (r(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : i.isObject(e) ? (r(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e;
			}], transformResponse: [function (e) {
				if ("string" == typeof e) try {
					e = JSON.parse(e);
				} catch (e) {}return e;
			}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, validateStatus: function validateStatus(e) {
				return e >= 200 && e < 300;
			} };a.headers = { common: { Accept: "application/json, text/plain, */*" } }, i.forEach(["delete", "get", "head"], function (e) {
			a.headers[e] = {};
		}), i.forEach(["post", "put", "patch"], function (e) {
			a.headers[e] = i.merge(u);
		}), e.exports = a;
	}, function (e, t, n) {
		"use strict";
		var r = n(2);e.exports = function (e, t) {
			r.forEach(e, function (n, r) {
				r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r]);
			});
		};
	}, function (e, t, n) {
		"use strict";
		var r = n(2),
		    o = n(9),
		    i = n(12),
		    s = n(13),
		    u = n(14),
		    a = n(10),
		    c = "undefined" != typeof window && window.btoa && window.btoa.bind(window) || n(15);e.exports = function (e) {
			return new Promise(function (t, f) {
				var p = e.data,
				    d = e.headers;r.isFormData(p) && delete d["Content-Type"];var l = new XMLHttpRequest(),
				    h = "onreadystatechange",
				    m = !1;if ("undefined" == typeof window || !window.XDomainRequest || "withCredentials" in l || u(e.url) || (l = new window.XDomainRequest(), h = "onload", m = !0, l.onprogress = function () {}, l.ontimeout = function () {}), e.auth) {
					var y = e.auth.username || "",
					    w = e.auth.password || "";d.Authorization = "Basic " + c(y + ":" + w);
				}if (l.open(e.method.toUpperCase(), i(e.url, e.params, e.paramsSerializer), !0), l.timeout = e.timeout, l[h] = function () {
					if (l && (4 === l.readyState || m) && (0 !== l.status || l.responseURL && 0 === l.responseURL.indexOf("file:"))) {
						var n = "getAllResponseHeaders" in l ? s(l.getAllResponseHeaders()) : null,
						    r = e.responseType && "text" !== e.responseType ? l.response : l.responseText,
						    i = { data: r, status: 1223 === l.status ? 204 : l.status, statusText: 1223 === l.status ? "No Content" : l.statusText, headers: n, config: e, request: l };o(t, f, i), l = null;
					}
				}, l.onerror = function () {
					f(a("Network Error", e, null, l)), l = null;
				}, l.ontimeout = function () {
					f(a("timeout of " + e.timeout + "ms exceeded", e, "ECONNABORTED", l)), l = null;
				}, r.isStandardBrowserEnv()) {
					var g = n(16),
					    v = (e.withCredentials || u(e.url)) && e.xsrfCookieName ? g.read(e.xsrfCookieName) : void 0;v && (d[e.xsrfHeaderName] = v);
				}if ("setRequestHeader" in l && r.forEach(d, function (e, t) {
					"undefined" == typeof p && "content-type" === t.toLowerCase() ? delete d[t] : l.setRequestHeader(t, e);
				}), e.withCredentials && (l.withCredentials = !0), e.responseType) try {
					l.responseType = e.responseType;
				} catch (t) {
					if ("json" !== e.responseType) throw t;
				}"function" == typeof e.onDownloadProgress && l.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && l.upload && l.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then(function (e) {
					l && (l.abort(), f(e), l = null);
				}), void 0 === p && (p = null), l.send(p);
			});
		};
	}, function (e, t, n) {
		"use strict";
		var r = n(10);e.exports = function (e, t, n) {
			var o = n.config.validateStatus;n.status && o && !o(n.status) ? t(r("Request failed with status code " + n.status, n.config, null, n.request, n)) : e(n);
		};
	}, function (e, t, n) {
		"use strict";
		var r = n(11);e.exports = function (e, t, n, o, i) {
			var s = new Error(e);return r(s, t, n, o, i);
		};
	}, function (e, t) {
		"use strict";
		e.exports = function (e, t, n, r, o) {
			return e.config = t, n && (e.code = n), e.request = r, e.response = o, e;
		};
	}, function (e, t, n) {
		"use strict";
		function r(e) {
			return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
		}var o = n(2);e.exports = function (e, t, n) {
			if (!t) return e;var i;if (n) i = n(t);else if (o.isURLSearchParams(t)) i = t.toString();else {
				var s = [];o.forEach(t, function (e, t) {
					null !== e && "undefined" != typeof e && (o.isArray(e) ? t += "[]" : e = [e], o.forEach(e, function (e) {
						o.isDate(e) ? e = e.toISOString() : o.isObject(e) && (e = JSON.stringify(e)), s.push(r(t) + "=" + r(e));
					}));
				}), i = s.join("&");
			}return i && (e += (e.indexOf("?") === -1 ? "?" : "&") + i), e;
		};
	}, function (e, t, n) {
		"use strict";
		var r = n(2),
		    o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];e.exports = function (e) {
			var t,
			    n,
			    i,
			    s = {};return e ? (r.forEach(e.split("\n"), function (e) {
				if (i = e.indexOf(":"), t = r.trim(e.substr(0, i)).toLowerCase(), n = r.trim(e.substr(i + 1)), t) {
					if (s[t] && o.indexOf(t) >= 0) return;"set-cookie" === t ? s[t] = (s[t] ? s[t] : []).concat([n]) : s[t] = s[t] ? s[t] + ", " + n : n;
				}
			}), s) : s;
		};
	}, function (e, t, n) {
		"use strict";
		var r = n(2);e.exports = r.isStandardBrowserEnv() ? function () {
			function e(e) {
				var t = e;return n && (o.setAttribute("href", t), t = o.href), o.setAttribute("href", t), { href: o.href, protocol: o.protocol ? o.protocol.replace(/:$/, "") : "", host: o.host, search: o.search ? o.search.replace(/^\?/, "") : "", hash: o.hash ? o.hash.replace(/^#/, "") : "", hostname: o.hostname, port: o.port, pathname: "/" === o.pathname.charAt(0) ? o.pathname : "/" + o.pathname };
			}var t,
			    n = /(msie|trident)/i.test(navigator.userAgent),
			    o = document.createElement("a");return t = e(window.location.href), function (n) {
				var o = r.isString(n) ? e(n) : n;return o.protocol === t.protocol && o.host === t.host;
			};
		}() : function () {
			return function () {
				return !0;
			};
		}();
	}, function (e, t) {
		"use strict";
		function n() {
			this.message = "String contains an invalid character";
		}function r(e) {
			for (var t, r, i = String(e), s = "", u = 0, a = o; i.charAt(0 | u) || (a = "=", u % 1); s += a.charAt(63 & t >> 8 - u % 1 * 8)) {
				if (r = i.charCodeAt(u += .75), r > 255) throw new n();t = t << 8 | r;
			}return s;
		}var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.prototype = new Error(), n.prototype.code = 5, n.prototype.name = "InvalidCharacterError", e.exports = r;
	}, function (e, t, n) {
		"use strict";
		var r = n(2);e.exports = r.isStandardBrowserEnv() ? function () {
			return { write: function write(e, t, n, o, i, s) {
					var u = [];u.push(e + "=" + encodeURIComponent(t)), r.isNumber(n) && u.push("expires=" + new Date(n).toGMTString()), r.isString(o) && u.push("path=" + o), r.isString(i) && u.push("domain=" + i), s === !0 && u.push("secure"), document.cookie = u.join("; ");
				}, read: function read(e) {
					var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));return t ? decodeURIComponent(t[3]) : null;
				}, remove: function remove(e) {
					this.write(e, "", Date.now() - 864e5);
				} };
		}() : function () {
			return { write: function write() {}, read: function read() {
					return null;
				}, remove: function remove() {} };
		}();
	}, function (e, t, n) {
		"use strict";
		function r() {
			this.handlers = [];
		}var o = n(2);r.prototype.use = function (e, t) {
			return this.handlers.push({ fulfilled: e, rejected: t }), this.handlers.length - 1;
		}, r.prototype.eject = function (e) {
			this.handlers[e] && (this.handlers[e] = null);
		}, r.prototype.forEach = function (e) {
			o.forEach(this.handlers, function (t) {
				null !== t && e(t);
			});
		}, e.exports = r;
	}, function (e, t, n) {
		"use strict";
		function r(e) {
			e.cancelToken && e.cancelToken.throwIfRequested();
		}var o = n(2),
		    i = n(19),
		    s = n(20),
		    u = n(6),
		    a = n(21),
		    c = n(22);e.exports = function (e) {
			r(e), e.baseURL && !a(e.url) && (e.url = c(e.baseURL, e.url)), e.headers = e.headers || {}, e.data = i(e.data, e.headers, e.transformRequest), e.headers = o.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers || {}), o.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (t) {
				delete e.headers[t];
			});var t = e.adapter || u.adapter;return t(e).then(function (t) {
				return r(e), t.data = i(t.data, t.headers, e.transformResponse), t;
			}, function (t) {
				return s(t) || (r(e), t && t.response && (t.response.data = i(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t);
			});
		};
	}, function (e, t, n) {
		"use strict";
		var r = n(2);e.exports = function (e, t, n) {
			return r.forEach(n, function (n) {
				e = n(e, t);
			}), e;
		};
	}, function (e, t) {
		"use strict";
		e.exports = function (e) {
			return !(!e || !e.__CANCEL__);
		};
	}, function (e, t) {
		"use strict";
		e.exports = function (e) {
			return (/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
			);
		};
	}, function (e, t) {
		"use strict";
		e.exports = function (e, t) {
			return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
		};
	}, function (e, t) {
		"use strict";
		function n(e) {
			this.message = e;
		}n.prototype.toString = function () {
			return "Cancel" + (this.message ? ": " + this.message : "");
		}, n.prototype.__CANCEL__ = !0, e.exports = n;
	}, function (e, t, n) {
		"use strict";
		function r(e) {
			if ("function" != typeof e) throw new TypeError("executor must be a function.");var t;this.promise = new Promise(function (e) {
				t = e;
			});var n = this;e(function (e) {
				n.reason || (n.reason = new o(e), t(n.reason));
			});
		}var o = n(23);r.prototype.throwIfRequested = function () {
			if (this.reason) throw this.reason;
		}, r.source = function () {
			var e,
			    t = new r(function (t) {
				e = t;
			});return { token: t, cancel: e };
		}, e.exports = r;
	}, function (e, t) {
		"use strict";
		e.exports = function (e) {
			return function (t) {
				return e.apply(null, t);
			};
		};
	}]);
});
//# sourceMappingURL=axios.min.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(3)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Axios = __webpack_require__(2);
var wx = __webpack_require__(17);
var params = {
    appId: "wx9d7bb7be5fbd9b38",
    title: "shinelp100",
    des: "shinelp100 开始尝试分享啦!",
    link: location.href,
    imgUrl: "https://admin.hbctcf.com/upload/link/link1533804269965419.jpg"
};

Axios.get('/weixin/auth', { params: { url: location.href } }).then(function (response) {
    wx.config({
        // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: params.appId, // 必填，公众号的唯一标识
        timestamp: response.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
        signature: response.data.signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function () {
        wx.onMenuShareAppMessage({
            title: params.title, // 分享标题
            desc: params.des, // 分享描述
            link: params.link, // 分享链接
            imgUrl: params.imgUrl, // 分享图标
            success: function success() {
                alert("我是微信好友成功回调");
            },
            cancel: function cancel() {
                // 用户取消分享后执行的回调函数
                alert("我是微信好友取消分享回调");
            }
        });
        wx.onMenuShareTimeline({
            title: params.title, // 分享标题
            link: params.link, // 分享链接
            imgUrl: params.imgUrl, // 分享图标
            success: function success() {
                alert("我是微信朋友圈成功回调");
            },
            cancel: function cancel() {
                // 用户取消分享后执行的回调函数
                alert("我是微信朋友圈取消分享回调");
            }
        });
    });
    wx.error(function (res) {
        console.log(res);
    });
}).catch(function (error) {
    console.log(error);
});

/***/ }),
/* 17 */
/***/ (function(module, exports) {

! function (e, n) {
  module.exports = n(e)
}(window, function (e, n) {
  function i(n, i, t) {
    e.WeixinJSBridge ? WeixinJSBridge.invoke(n, o(i), function (e) {
      c(n, e, t)
    }) : u(n, t)
  }

  function t(n, i, t) {
    e.WeixinJSBridge ? WeixinJSBridge.on(n, function (e) {
      t && t.trigger && t.trigger(e), c(n, e, i)
    }) : t ? u(n, t) : u(n, i)
  }

  function o(e) {
    return e = e || {}, e.appId = C.appId, e.verifyAppId = C.appId, e.verifySignType = "sha1", e.verifyTimestamp = C.timestamp + "", e.verifyNonceStr = C.nonceStr, e.verifySignature = C.signature, e
  }

  function r(e) {
    return {
      timeStamp: e.timestamp + "",
      nonceStr: e.nonceStr,
      package: e.package,
      paySign: e.paySign,
      signType: e.signType || "SHA1"
    }
  }

  function a(e) {
    return e.postalCode = e.addressPostalCode, delete e.addressPostalCode, e.provinceName = e.proviceFirstStageName, delete e.proviceFirstStageName, e.cityName = e.addressCitySecondStageName, delete e.addressCitySecondStageName, e.countryName = e.addressCountiesThirdStageName, delete e.addressCountiesThirdStageName, e.detailInfo = e.addressDetailInfo, delete e.addressDetailInfo, e
  }

  function c(e, n, i) {
    "openEnterpriseChat" == e && (n.errCode = n.err_code), delete n.err_code, delete n.err_desc, delete n.err_detail;
    var t = n.errMsg;
    t || (t = n.err_msg, delete n.err_msg, t = s(e, t), n.errMsg = t), (i = i || {})._complete && (i._complete(n), delete i._complete), t = n.errMsg || "", C.debug && !i.isInnerInvoke && alert(JSON.stringify(n));
    var o = t.indexOf(":");
    switch (t.substring(o + 1)) {
      case "ok":
        i.success && i.success(n);
        break;
      case "cancel":
        i.cancel && i.cancel(n);
        break;
      default:
        i.fail && i.fail(n)
    }
    i.complete && i.complete(n)
  }

  function s(e, n) {
    var i = e,
      t = v[i];
    t && (i = t);
    var o = "ok";
    if (n) {
      var r = n.indexOf(":");
      "confirm" == (o = n.substring(r + 1)) && (o = "ok"), "failed" == o && (o = "fail"), -1 != o.indexOf("failed_") && (o = o.substring(7)), -1 != o.indexOf("fail_") && (o = o.substring(5)), "access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != o || (o = "permission denied"), "config" == i && "function not exist" == o && (o = "ok"), "" == o && (o = "fail")
    }
    return n = i + ":" + o
  }

  function d(e) {
    if (e) {
      for (var n = 0, i = e.length; n < i; ++n) {
        var t = e[n],
          o = h[t];
        o && (e[n] = o)
      }
      return e
    }
  }

  function u(e, n) {
    if (!(!C.debug || n && n.isInnerInvoke)) {
      var i = v[e];
      i && (e = i), n && n._complete && delete n._complete, console.log('"' + e + '",', n || "")
    }
  }

  function l(e) {
    if (!(w || T || C.debug || x < "6.0.2" || A.systemType < 0)) {
      var n = new Image;
      A.appId = C.appId, A.initTime = V.initEndTime - V.initStartTime, A.preVerifyTime = V.preVerifyEndTime - V.preVerifyStartTime, N.getNetworkType({
        isInnerInvoke: !0,
        success: function (e) {
          A.networkType = e.networkType;
          var i = "https://open.weixin.qq.com/sdk/report?v=" + A.version + "&o=" + A.isPreVerifyOk + "&s=" + A.systemType + "&c=" + A.clientVersion + "&a=" + A.appId + "&n=" + A.networkType + "&i=" + A.initTime + "&p=" + A.preVerifyTime + "&u=" + A.url;
          n.src = i
        }
      })
    }
  }

  function p() {
    return (new Date).getTime()
  }

  function f(n) {
    k && (e.WeixinJSBridge ? "preInject" === I.__wxjsjs__isPreInject ? I.addEventListener && I.addEventListener("WeixinJSBridgeReady", n, !1) : n() : I.addEventListener && I.addEventListener("WeixinJSBridgeReady", n, !1))
  }

  function m() {
    N.invoke || (N.invoke = function (n, i, t) {
      e.WeixinJSBridge && WeixinJSBridge.invoke(n, o(i), t)
    }, N.on = function (n, i) {
      e.WeixinJSBridge && WeixinJSBridge.on(n, i)
    })
  }

  function g(e) {
    if ("string" == typeof e && e.length > 0) {
      var n = e.split("?")[0],
        i = e.split("?")[1];
      return n += ".html", void 0 !== i ? n + "?" + i : n
    }
  }
  if (!e.jWeixin) {
    var h = {
        config: "preVerifyJSAPI",
        onMenuShareTimeline: "menu:share:timeline",
        onMenuShareAppMessage: "menu:share:appmessage",
        onMenuShareQQ: "menu:share:qq",
        onMenuShareWeibo: "menu:share:weiboApp",
        onMenuShareQZone: "menu:share:QZone",
        previewImage: "imagePreview",
        getLocation: "geoLocation",
        openProductSpecificView: "openProductViewWithPid",
        addCard: "batchAddCard",
        openCard: "batchViewCard",
        chooseWXPay: "getBrandWCPayRequest",
        openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
        startSearchBeacons: "startMonitoringBeacons",
        stopSearchBeacons: "stopMonitoringBeacons",
        onSearchBeacons: "onBeaconsInRange",
        consumeAndShareCard: "consumedShareCard",
        openAddress: "editAddress"
      },
      v = function () {
        var e = {};
        for (var n in h) e[h[n]] = n;
        return e
      }(),
      I = e.document,
      S = I.title,
      y = navigator.userAgent.toLowerCase(),
      _ = navigator.platform.toLowerCase(),
      w = !(!_.match("mac") && !_.match("win")),
      T = -1 != y.indexOf("wxdebugger"),
      k = -1 != y.indexOf("micromessenger"),
      M = -1 != y.indexOf("android"),
      P = -1 != y.indexOf("iphone") || -1 != y.indexOf("ipad"),
      x = function () {
        var e = y.match(/micromessenger\/(\d+\.\d+\.\d+)/) || y.match(/micromessenger\/(\d+\.\d+)/);
        return e ? e[1] : ""
      }(),
      V = {
        initStartTime: p(),
        initEndTime: 0,
        preVerifyStartTime: 0,
        preVerifyEndTime: 0
      },
      A = {
        version: 1,
        appId: "",
        initTime: 0,
        preVerifyTime: 0,
        networkType: "",
        isPreVerifyOk: 1,
        systemType: P ? 1 : M ? 2 : -1,
        clientVersion: x,
        url: encodeURIComponent(location.href)
      },
      C = {},
      L = {
        _completes: []
      },
      B = {
        state: 0,
        data: {}
      };
    f(function () {
      V.initEndTime = p()
    });
    var E = !1,
      O = [],
      N = {
        config: function (e) {
          C = e, u("config", e);
          var n = !1 !== C.check;
          f(function () {
            if (n) i(h.config, {
              verifyJsApiList: d(C.jsApiList)
            }, function () {
              L._complete = function (e) {
                V.preVerifyEndTime = p(), B.state = 1, B.data = e
              }, L.success = function (e) {
                A.isPreVerifyOk = 0
              }, L.fail = function (e) {
                L._fail ? L._fail(e) : B.state = -1
              };
              var e = L._completes;
              return e.push(function () {
                l()
              }), L.complete = function (n) {
                for (var i = 0, t = e.length; i < t; ++i) e[i]();
                L._completes = []
              }, L
            }()), V.preVerifyStartTime = p();
            else {
              B.state = 1;
              for (var e = L._completes, t = 0, o = e.length; t < o; ++t) e[t]();
              L._completes = []
            }
          }), m()
        },
        ready: function (e) {
          0 != B.state ? e() : (L._completes.push(e), !k && C.debug && e())
        },
        error: function (e) {
          x < "6.0.2" || (-1 == B.state ? e(B.data) : L._fail = e)
        },
        checkJsApi: function (e) {
          var n = function (e) {
            var n = e.checkResult;
            for (var i in n) {
              var t = v[i];
              t && (n[t] = n[i], delete n[i])
            }
            return e
          };
          i("checkJsApi", {
            jsApiList: d(e.jsApiList)
          }, (e._complete = function (e) {
            if (M) {
              var i = e.checkResult;
              i && (e.checkResult = JSON.parse(i))
            }
            e = n(e)
          }, e))
        },
        onMenuShareTimeline: function (e) {
          t(h.onMenuShareTimeline, {
            complete: function () {
              i("shareTimeline", {
                title: e.title || S,
                desc: e.title || S,
                img_url: e.imgUrl || "",
                link: e.link || location.href,
                type: e.type || "link",
                data_url: e.dataUrl || ""
              }, e)
            }
          }, e)
        },
        onMenuShareAppMessage: function (e) {
          t(h.onMenuShareAppMessage, {
            complete: function () {
              i("sendAppMessage", {
                title: e.title || S,
                desc: e.desc || "",
                link: e.link || location.href,
                img_url: e.imgUrl || "",
                type: e.type || "link",
                data_url: e.dataUrl || ""
              }, e)
            }
          }, e)
        },
        onMenuShareQQ: function (e) {
          t(h.onMenuShareQQ, {
            complete: function () {
              i("shareQQ", {
                title: e.title || S,
                desc: e.desc || "",
                img_url: e.imgUrl || "",
                link: e.link || location.href
              }, e)
            }
          }, e)
        },
        onMenuShareWeibo: function (e) {
          t(h.onMenuShareWeibo, {
            complete: function () {
              i("shareWeiboApp", {
                title: e.title || S,
                desc: e.desc || "",
                img_url: e.imgUrl || "",
                link: e.link || location.href
              }, e)
            }
          }, e)
        },
        onMenuShareQZone: function (e) {
          t(h.onMenuShareQZone, {
            complete: function () {
              i("shareQZone", {
                title: e.title || S,
                desc: e.desc || "",
                img_url: e.imgUrl || "",
                link: e.link || location.href
              }, e)
            }
          }, e)
        },
        startRecord: function (e) {
          i("startRecord", {}, e)
        },
        stopRecord: function (e) {
          i("stopRecord", {}, e)
        },
        onVoiceRecordEnd: function (e) {
          t("onVoiceRecordEnd", e)
        },
        playVoice: function (e) {
          i("playVoice", {
            localId: e.localId
          }, e)
        },
        pauseVoice: function (e) {
          i("pauseVoice", {
            localId: e.localId
          }, e)
        },
        stopVoice: function (e) {
          i("stopVoice", {
            localId: e.localId
          }, e)
        },
        onVoicePlayEnd: function (e) {
          t("onVoicePlayEnd", e)
        },
        uploadVoice: function (e) {
          i("uploadVoice", {
            localId: e.localId,
            isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
          }, e)
        },
        downloadVoice: function (e) {
          i("downloadVoice", {
            serverId: e.serverId,
            isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
          }, e)
        },
        translateVoice: function (e) {
          i("translateVoice", {
            localId: e.localId,
            isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
          }, e)
        },
        chooseImage: function (e) {
          i("chooseImage", {
            scene: "1|2",
            count: e.count || 9,
            sizeType: e.sizeType || ["original", "compressed"],
            sourceType: e.sourceType || ["album", "camera"]
          }, (e._complete = function (e) {
            if (M) {
              var n = e.localIds;
              n && (e.localIds = JSON.parse(n))
            }
          }, e))
        },
        getLocation: function (e) {},
        previewImage: function (e) {
          i(h.previewImage, {
            current: e.current,
            urls: e.urls
          }, e)
        },
        uploadImage: function (e) {
          i("uploadImage", {
            localId: e.localId,
            isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
          }, e)
        },
        downloadImage: function (e) {
          i("downloadImage", {
            serverId: e.serverId,
            isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
          }, e)
        },
        getLocalImgData: function (e) {
          !1 === E ? (E = !0, i("getLocalImgData", {
            localId: e.localId
          }, (e._complete = function (e) {
            if (E = !1, O.length > 0) {
              var n = O.shift();
              N.getLocalImgData(n)
            }
          }, e))) : O.push(e)
        },
        getNetworkType: function (e) {
          var n = function (e) {
            var n = e.errMsg;
            e.errMsg = "getNetworkType:ok";
            var i = e.subtype;
            if (delete e.subtype, i) e.networkType = i;
            else {
              var t = n.indexOf(":"),
                o = n.substring(t + 1);
              switch (o) {
                case "wifi":
                case "edge":
                case "wwan":
                  e.networkType = o;
                  break;
                default:
                  e.errMsg = "getNetworkType:fail"
              }
            }
            return e
          };
          i("getNetworkType", {}, (e._complete = function (e) {
            e = n(e)
          }, e))
        },
        openLocation: function (e) {
          i("openLocation", {
            latitude: e.latitude,
            longitude: e.longitude,
            name: e.name || "",
            address: e.address || "",
            scale: e.scale || 28,
            infoUrl: e.infoUrl || ""
          }, e)
        },
        getLocation: function (e) {
          e = e || {}, i(h.getLocation, {
            type: e.type || "wgs84"
          }, (e._complete = function (e) {
            delete e.type
          }, e))
        },
        hideOptionMenu: function (e) {
          i("hideOptionMenu", {}, e)
        },
        showOptionMenu: function (e) {
          i("showOptionMenu", {}, e)
        },
        closeWindow: function (e) {
          i("closeWindow", {}, e = e || {})
        },
        hideMenuItems: function (e) {
          i("hideMenuItems", {
            menuList: e.menuList
          }, e)
        },
        showMenuItems: function (e) {
          i("showMenuItems", {
            menuList: e.menuList
          }, e)
        },
        hideAllNonBaseMenuItem: function (e) {
          i("hideAllNonBaseMenuItem", {}, e)
        },
        showAllNonBaseMenuItem: function (e) {
          i("showAllNonBaseMenuItem", {}, e)
        },
        scanQRCode: function (e) {
          i("scanQRCode", {
            needResult: (e = e || {}).needResult || 0,
            scanType: e.scanType || ["qrCode", "barCode"]
          }, (e._complete = function (e) {
            if (P) {
              var n = e.resultStr;
              if (n) {
                var i = JSON.parse(n);
                e.resultStr = i && i.scan_code && i.scan_code.scan_result
              }
            }
          }, e))
        },
        openAddress: function (e) {
          i(h.openAddress, {}, (e._complete = function (e) {
            e = a(e)
          }, e))
        },
        openProductSpecificView: function (e) {
          i(h.openProductSpecificView, {
            pid: e.productId,
            view_type: e.viewType || 0,
            ext_info: e.extInfo
          }, e)
        },
        addCard: function (e) {
          for (var n = e.cardList, t = [], o = 0, r = n.length; o < r; ++o) {
            var a = n[o],
              c = {
                card_id: a.cardId,
                card_ext: a.cardExt
              };
            t.push(c)
          }
          i(h.addCard, {
            card_list: t
          }, (e._complete = function (e) {
            var n = e.card_list;
            if (n) {
              for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {
                var o = n[i];
                o.cardId = o.card_id, o.cardExt = o.card_ext, o.isSuccess = !!o.is_succ, delete o.card_id, delete o.card_ext, delete o.is_succ
              }
              e.cardList = n, delete e.card_list
            }
          }, e))
        },
        chooseCard: function (e) {
          i("chooseCard", {
            app_id: C.appId,
            location_id: e.shopId || "",
            sign_type: e.signType || "SHA1",
            card_id: e.cardId || "",
            card_type: e.cardType || "",
            card_sign: e.cardSign,
            time_stamp: e.timestamp + "",
            nonce_str: e.nonceStr
          }, (e._complete = function (e) {
            e.cardList = e.choose_card_info, delete e.choose_card_info
          }, e))
        },
        openCard: function (e) {
          for (var n = e.cardList, t = [], o = 0, r = n.length; o < r; ++o) {
            var a = n[o],
              c = {
                card_id: a.cardId,
                code: a.code
              };
            t.push(c)
          }
          i(h.openCard, {
            card_list: t
          }, e)
        },
        consumeAndShareCard: function (e) {
          i(h.consumeAndShareCard, {
            consumedCardId: e.cardId,
            consumedCode: e.code
          }, e)
        },
        chooseWXPay: function (e) {
          i(h.chooseWXPay, r(e), e)
        },
        openEnterpriseRedPacket: function (e) {
          i(h.openEnterpriseRedPacket, r(e), e)
        },
        startSearchBeacons: function (e) {
          i(h.startSearchBeacons, {
            ticket: e.ticket
          }, e)
        },
        stopSearchBeacons: function (e) {
          i(h.stopSearchBeacons, {}, e)
        },
        onSearchBeacons: function (e) {
          t(h.onSearchBeacons, e)
        },
        openEnterpriseChat: function (e) {
          i("openEnterpriseChat", {
            useridlist: e.userIds,
            chatname: e.groupName
          }, e)
        },
        launchMiniProgram: function (e) {
          i("launchMiniProgram", {
            targetAppId: e.targetAppId,
            path: g(e.path),
            envVersion: e.envVersion
          }, e)
        },
        miniProgram: {
          navigateBack: function (e) {
            e = e || {}, f(function () {
              i("invokeMiniProgramAPI", {
                name: "navigateBack",
                arg: {
                  delta: e.delta || 1
                }
              }, e)
            })
          },
          navigateTo: function (e) {
            f(function () {
              i("invokeMiniProgramAPI", {
                name: "navigateTo",
                arg: {
                  url: e.url
                }
              }, e)
            })
          },
          redirectTo: function (e) {
            f(function () {
              i("invokeMiniProgramAPI", {
                name: "redirectTo",
                arg: {
                  url: e.url
                }
              }, e)
            })
          },
          switchTab: function (e) {
            f(function () {
              i("invokeMiniProgramAPI", {
                name: "switchTab",
                arg: {
                  url: e.url
                }
              }, e)
            })
          },
          reLaunch: function (e) {
            f(function () {
              i("invokeMiniProgramAPI", {
                name: "reLaunch",
                arg: {
                  url: e.url
                }
              }, e)
            })
          },
          postMessage: function (e) {
            f(function () {
              i("invokeMiniProgramAPI", {
                name: "postMessage",
                arg: e.data || {}
              }, e)
            })
          },
          getEnv: function (n) {
            f(function () {
              n({
                miniprogram: "miniprogram" === e.__wxjs_environment
              })
            })
          }
        }
      },
      b = 1,
      R = {};
    return I.addEventListener("error", function (e) {
      if (!M) {
        var n = e.target,
          i = n.tagName,
          t = n.src;
        if (("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) && -1 != t.indexOf("wxlocalresource://")) {
          e.preventDefault(), e.stopPropagation();
          var o = n["wx-id"];
          if (o || (o = b++, n["wx-id"] = o), R[o]) return;
          R[o] = !0, N.ready(function () {
            N.getLocalImgData({
              localId: t,
              success: function (e) {
                n.src = e.localData
              }
            })
          })
        }
      }
    }, !0), I.addEventListener("load", function (e) {
      if (!M) {
        var n = e.target,
          i = n.tagName;
        n.src;
        if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {
          var t = n["wx-id"];
          t && (R[t] = !1)
        }
      }
    }, !0), n && (e.wx = e.jWeixin = N), N
  }
});

/***/ })
/******/ ]);