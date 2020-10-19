(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(11)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VuerSingle__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__to_js__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  components: { VuerSingle: __WEBPACK_IMPORTED_MODULE_0__VuerSingle__["a" /* default */] },
  data() {
    return {
      backgroundColor: "#FFF",
      imgList: [],
      isSingle: false,
      isShow: false,
      isIndexShow: true,
      useCloseButton: false,
      preload: true,
      allowSwipe: false,
      currentIndex: 0,
      title: "",
      desc: [],
      /**
       * 从允许swipe开始纪录swipe位移
       * handleTouchEnd时位移小于100（意味着无法触发swipe），清零
       * 大于100必定触发handleSwipe，
       * 修改currentIndex后清零
       */
      swipeDelta: 0,
      swipeThreshold: 100
    };
  },
  beforeRouteLeave(to, from, next) {
    // 路由跳转时关闭图片预览
    vm.isShow = false;
    next();
  },
  computed: {
    maxIndex() {
      return this.imgList.length - 1;
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        // 使用 history 处理安卓物理返回键关闭图片
        if (/android/i.test(navigator.userAgent)) {
          history.pushState(null, null, location.href);
          window.addEventListener("popstate", this.closeGallery);
        }
        document.querySelector(".prevent-pass-through").className = "prevent-pass-through prevent-pass-through-show";
        document.querySelector(".slider").className = "slider open";
      } else {
        window.removeEventListener("popstate", this.closeGallery);
        setTimeout(() => document.querySelector(".prevent-pass-through").className = "prevent-pass-through", 400);
        document.querySelector(".slider").className = "slider close";
      }
    },
    currentIndex() {
      // 图片未加载成功时无宽度 ，加载完成后先显示第一张后跳到当前
      let el = document.querySelector(".item-wrapper");
      el.translateX = -this.currentIndex * el.getBoundingClientRect().width;
      if (!this.preload) {
        this.$nextTick(() => {
          this.$refs.img[this.currentIndex].imgInit();
        });
      }
    },
    imgList() {
      let el = document.querySelector(".item-wrapper");
      el.translateX = -this.currentIndex * el.getBoundingClientRect().width;
      if (!this.preload) {
        this.$nextTick(() => {
          this.$refs.img[this.currentIndex].imgInit();
        });
      }
    }
  },
  methods: {
    handleTapClose(e, el, fromCloseButton) {
      if (this.useCloseButton && !fromCloseButton) return;
      if (/android/i.test(navigator.userAgent)) {
        history.back();
      }
      this.closeGallery();
    },
    closeGallery() {
      this.isShow = false;
      this.$refs.img[this.currentIndex].reset();
    },
    handlePressMove(e, el) {
      e.preventDefault();
      if (this.allowSwipe === false || this.isSingle) return;
      el.translateX += e.deltaX;
      this.swipeDelta += e.deltaX;
    },
    handleTouchStart() {
      __WEBPACK_IMPORTED_MODULE_1__to_js__["a" /* default */].stopAll();
    },
    handleTouchEnd(e, el) {
      // touchmove太短无法触发swipe时用于复位
      if (Math.abs(this.swipeDelta) < this.swipeThreshold) {
        this.swipeDelta = 0;
        let width = el.getBoundingClientRect().width;
        new __WEBPACK_IMPORTED_MODULE_1__to_js__["a" /* default */](el, "translateX", -this.currentIndex * width, 200, this.ease);
      }
    },
    handleSwipe(evt, el) {
      // swipeDelta小于swipeThreshold不触发翻页
      if (Math.abs(this.swipeDelta) < this.swipeThreshold) {
        // 借 handleTouchEnd 复位
        return;
      }
      let width = el.getBoundingClientRect().width;
      if (evt.direction === "Left" && this.currentIndex < this.maxIndex) {
        this.$refs.img[this.currentIndex].reset();
        this.currentIndex += 1;
      } else if (evt.direction === "Right" && this.currentIndex > 0) {
        this.$refs.img[this.currentIndex].reset();
        this.currentIndex -= 1;
      }
      new __WEBPACK_IMPORTED_MODULE_1__to_js__["a" /* default */](el, "translateX", -this.currentIndex * width, 200, this.ease);
      this.swipeDelta = 0;
    },
    next() {
      let el = document.querySelector(".item-wrapper");
      let width = el.getBoundingClientRect().width;
      this.currentIndex += 1;
      new __WEBPACK_IMPORTED_MODULE_1__to_js__["a" /* default */](el, "translateX", -this.currentIndex * width, 200, this.ease);
    },
    prev() {
      let el = document.querySelector(".item-wrapper");
      let width = el.getBoundingClientRect().width;
      this.currentIndex -= 1;
      new __WEBPACK_IMPORTED_MODULE_1__to_js__["a" /* default */](el, "translateX", -this.currentIndex * width, 200, this.ease);
    }
  }
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__to_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loader_DoubleBounce__ = __webpack_require__(15);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  props: ['src'],
  components: { Loader: __WEBPACK_IMPORTED_MODULE_1__loader_DoubleBounce__["a" /* default */] },
  data() {
    return {
      imgEl: null,
      loading: true,
      initialScale: 1,
      currentScale: 1,
      isSmall: false,
      srcDelay: '',
      isInited: false
    };
  },
  mounted() {
    if (!this.src) return false;
    this.$emit('disableSwipe');
    if (this.$root.preload) {
      this.imgInit();
    }
  },
  methods: {
    imgInit(onload) {
      if (this.isInited && this.srcDelay === this.src) return;
      console.log('preload', this.$root.preload);
      console.log('load img', this.src);

      let vm = this;
      vm.srcDelay = vm.src;
      vm.isInited = true;

      let img = new Image();
      let imgEl = this.$el.lastChild.firstChild;
      img.onload = function () {
        let h = this.height;
        let w = this.width;
        vm.imgEl = imgEl;
        vm.imgHeight = h;
        vm.imgWidth = w;
        imgEl.style.left = (window.innerWidth - w) / 2 + 'px';
        imgEl.style.top = (window.innerHeight - h) / 2 + 'px';
        imgEl.parentNode.style.display = 'block';
        if (w < window.innerWidth && h < window.innerHeight) {
          vm.isSmall = true;
        } else if (window.innerWidth / window.innerHeight < w / h) {
          vm.initialScale = window.innerWidth / w;
          imgEl.scaleX = imgEl.scaleY = vm.initialScale;
        } else {
          vm.initialScale = window.innerHeight / h;
          imgEl.scaleX = imgEl.scaleY = vm.initialScale;
        }
        vm.loading = false;

        img.onload = null;
        img = null;
      };
      img.src = this.src;
    },
    getCriticalX(scale) {
      // 获取横向临界值
      return (this.imgWidth * scale - window.innerWidth) / 2;
    },
    getCriticalY(scale) {
      // 获取纵向临界值
      return (this.imgHeight * scale - window.innerHeight) / 2;
    },
    handleMultipointStart(e) {
      this.currentScale = this.imgEl.scaleX;
    },
    handlePressMove(e) {
      let el = this.imgEl;
      e.preventDefault();
      if (this.isSmall) {
        el.translateX += e.deltaX / 3;
        el.translateY += e.deltaY / 3;
        this.$emit('enableSwipe');
        return;
      }

      if (el.scaleX / this.initialScale < 1.2 && el.scaleX / this.initialScale > 0.8) {
        this.$emit('enableSwipe');
        el.translateX += e.deltaX / 3;
        return;
      }

      let criticalX = this.getCriticalX(el.scaleX);
      let criticalY = this.getCriticalY(el.scaleY);

      // 实现超过临界值移动速度减缓
      let slowX = el.translateX > criticalX || el.translateX < -criticalX;
      let slowY = el.translateY > criticalY || el.translateY < -criticalY;

      this.$emit('disableSwipe');
      if (slowX) {
        el.translateX += e.deltaX / 3;
        this.$emit('enableSwipe');
      } else el.translateX += e.deltaX;
      if (slowY) {
        el.translateY += e.deltaY / 3;
      } else el.translateY += e.deltaY;
    },
    handleTouchEnd(e) {
      let el = this.imgEl;
      if (this.isSmall || el.scaleX / this.initialScale < 1) {
        this.reset();
        return;
      }

      if (el.scaleX / this.initialScale > 6) {
        new __WEBPACK_IMPORTED_MODULE_0__to_js__["a" /* default */](el, 'scaleX', this.initialScale * 6, 500, this.ease);
        new __WEBPACK_IMPORTED_MODULE_0__to_js__["a" /* default */](el, 'scaleY', this.initialScale * 6, 500, this.ease);
      }
      let criticalX = this.getCriticalX(el.scaleX);
      let criticalY = this.getCriticalY(el.scaleY);

      if (window.innerHeight >= this.imgHeight * el.scaleX) {
        new __WEBPACK_IMPORTED_MODULE_0__to_js__["a" /* default */](el, 'translateY', 0, 500, this.ease);
      } else {
        if (el.translateY > criticalY) {
          new __WEBPACK_IMPORTED_MODULE_0__to_js__["a" /* default */](el, 'translateY', criticalY, 500, this.ease);
        } else if (el.translateY < -criticalY) {
          new __WEBPACK_IMPORTED_MODULE_0__to_js__["a" /* default */](el, 'translateY', -criticalY, 500, this.ease);
        }
      }

      if (window.innerWidth >= this.imgWidth * el.scaleY) {
        new __WEBPACK_IMPORTED_MODULE_0__to_js__["a" /* default */](el, 'translateX', 0, 500, this.ease);
      } else {
        if (el.translateX > criticalX) {
          new __WEBPACK_IMPORTED_MODULE_0__to_js__["a" /* default */](el, 'translateX', criticalX, 500, this.ease);
        } else if (el.translateX < -criticalX) {
          new __WEBPACK_IMPORTED_MODULE_0__to_js__["a" /* default */](el, 'translateX', -criticalX, 500, this.ease);
        }
      }
    },
    handleDoubleTap(e) {
      let el = this.imgEl;
      if (this.isSmall) return;

      this.$emit('disableSwipe');
      if (this.imgEl.scaleX !== this.initialScale) {
        this.reset();
      } else {
        let box = el.getBoundingClientRect();
        let y = window.innerHeight / 2 - e.changedTouches[0].clientY;
        let x = window.innerWidth / 2 - e.changedTouches[0].clientX;
        new __WEBPACK_IMPORTED_MODULE_0__to_js__["a" /* default */](el, 'scaleX', this.initialScale * 2, 500, this.ease);
        new __WEBPACK_IMPORTED_MODULE_0__to_js__["a" /* default */](el, 'scaleY', this.initialScale * 2, 500, this.ease);
        new __WEBPACK_IMPORTED_MODULE_0__to_js__["a" /* default */](el, 'translateX', x, 500, this.ease);
        new __WEBPACK_IMPORTED_MODULE_0__to_js__["a" /* default */](el, 'translateY', y, 500, this.ease);
        console.dir(el);
      }
    },
    handlePinch(e, el) {
      this.$emit('disableSwipe');
      this.imgEl.scaleX = this.imgEl.scaleY = this.currentScale * e.zoom;
    },
    reset() {
      if (!this.imgEl) return;
      new __WEBPACK_IMPORTED_MODULE_0__to_js__["a" /* default */](this.imgEl, 'scaleX', this.initialScale, 500, this.ease);
      new __WEBPACK_IMPORTED_MODULE_0__to_js__["a" /* default */](this.imgEl, 'scaleY', this.initialScale, 500, this.ease);
      new __WEBPACK_IMPORTED_MODULE_0__to_js__["a" /* default */](this.imgEl, 'translateX', 0, 500, this.ease);
      new __WEBPACK_IMPORTED_MODULE_0__to_js__["a" /* default */](this.imgEl, 'translateY', 0, 500, this.ease);
    },
    ease(x) {
      return Math.sqrt(1 - Math.pow(x - 1, 2));
    }
  }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// alloy 的补间函数
var To = function (el, property, value, time, ease, onEnd, onChange) {
  var current = el[property];
  var dv = value - current;
  var beginTime = new Date();
  var self = this;
  var currentEase = ease || function (a) {
    return a;
  };
  this.tickID = null;
  var toTick = function () {
    var dt = new Date() - beginTime;
    if (dt >= time) {
      el[property] = value;
      onChange && onChange(value);
      onEnd && onEnd(value);
      cancelAnimationFrame(self.tickID);
      self.toTick = null;
      return;
    }
    el[property] = dv * currentEase(dt / time) + current;
    self.tickID = requestAnimationFrame(toTick);
    onChange && onChange(el[property]);
  };
  toTick();
  To.List.push(this);
};

To.List = [];

To.stopAll = function () {
  for (var i = 0, len = To.List.length; i < len; i++) {
    cancelAnimationFrame(To.List[i].tickID);
  }
  To.List.length = 0;
};

To.stop = function (to) {
  cancelAnimationFrame(to.tickID);
};

/* harmony default export */ __webpack_exports__["a"] = (To);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  // from http://tobiasahlin.com/spinkit/
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vuer_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_v_finger_mk42__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_v_finger_mk42___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_v_finger_mk42__);



// 有写大图属性就取大图
const getImgSrc = el => el.dataset.large || el.src;

const gallery = {
  install(Vue, options = {}) {
    Vue.use(__WEBPACK_IMPORTED_MODULE_1_v_finger_mk42___default.a);
    // 所有图片地址储存位置
    let imgList = {};
    let VuerE = Vue.extend(__WEBPACK_IMPORTED_MODULE_0__Vuer_vue__["a" /* default */]);
    // 新建实例并挂载
    let vm = new VuerE().$mount();
    // 如果没有提供 $mount 的参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
    document.querySelector("body").appendChild(vm.$el);

    vm.swipeThreshold = options.swipeThreshold || 100;

    vm.isIndexShow = options.isIndexShow === undefined ? true : options.isIndexShow;

    vm.useCloseButton = options.useCloseButton === undefined ? true : options.useCloseButton;

    vm.preload = options.preload === undefined ? true : options.preload;

    options.loadingStyle; // TODO
    let openVuer = (el, group) => e => {
      let imgSrc = getImgSrc(el);
      if (group || group === 0) {
        vm.isSingle = false;
        vm.imgList = imgList[group];
        vm.isShow = true;
        vm.currentIndex = Number(e.currentTarget.dataset.index) || vm.imgList.indexOf(imgSrc);
        vm.title = e.currentTarget.dataset.title;
        vm.desc = e.currentTarget.dataset.desc || [];
      } else {
        vm.isSingle = true;
        vm.imgList = [imgSrc];
        vm.isShow = true;
        vm.currentIndex = 0;
      }
    };
    Vue.prototype.$imgVuer = {
      close() {
        vm.closeGallery.call(vm);
      },
      onIndexChange(cb) {
        // 0.16.0
        vm.$watch("currentIndex", cb);
      },
      onToggle(cb) {
        // 0.16.0
        vm.$watch("isShow", cb);
      },
      changeBGColor(color) {
        // 0.16.1
        vm.backgroundColor = color;
      },
      next() {
        // 0.16.2
        vm.next.call(vm);
      },
      prev() {
        // 0.16.2
        vm.prev.call(vm);
      },
      getCurrentIndex() {
        // 0.16.2
        return vm.currentIndex;
      }
    };
    Vue.directive("gallery", {
      bind(el) {
        if (!el.src) throw "<img /> missing src";
      },
      // add update
      inserted(el, binding) {
        // 同时兼容arg和value传分组名称
        // 加 String() 防止 0 捣乱
        let group = binding.arg || binding.value;
        el.addEventListener("click", openVuer(el, group));
        let imgSrc = getImgSrc(el);
        if (group) {
          let imgGroup = imgList[group];
          // 有分组
          if (imgGroup) {
            // 分组已定义
            imgGroup.push(imgSrc);
          } else {
            imgList[group] = [imgSrc];
          }
        } else {
          // 无分组（单张）
          // 无需储存，直接用imgSrc打开
        }
      },
      unbind(el, binding) {
        // 调查keep alive后跳转是否触发unbind
        vm.isShow = false;
        let imgSrc = getImgSrc(el);
        let group = binding.arg || binding.value;
        el.removeEventListener("click", openVuer(el, group));
        if (group || group === 0) {
          let imgGroup = imgList[group];
          let index = imgGroup.indexOf(imgSrc);
          imgGroup.splice(index, 1);
        }
      }
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (gallery);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Vuer_vue__ = __webpack_require__(3);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0585a91a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Vuer_vue__ = __webpack_require__(20);
function injectStyle (ssrContext) {
  __webpack_require__(9)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0585a91a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Vuer_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0585a91a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Vuer_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("c3908aaa", content, true, {});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".prevent-pass-through[data-v-0585a91a]{position:fixed;height:100%;width:100%;z-index:9;display:none}.prevent-pass-through-show[data-v-0585a91a]{display:block}.words[data-v-0585a91a]{position:absolute;text-align:center;font-size:12px;font-weight:700;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-.15px;color:#2b3743}.index[data-v-0585a91a]{bottom:20px;width:100%}.close-btn[data-v-0585a91a]{top:16px;left:24px;padding:0;font-size:26px}.title[data-v-0585a91a]{font-size:14px;font-weight:700;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:-.18px;text-align:center;color:#2b3743;top:27px;width:100%}.slider[data-v-0585a91a]{position:fixed;top:100%;width:100%;left:0;height:100%;overflow:hidden;z-index:1000;opacity:0;-webkit-touch-callout:none;user-select:none}.item-wrapper[data-v-0585a91a]{display:flex;justify-content:flex-start;height:100%}.item[data-v-0585a91a]{height:100%;flex-basis:100%;flex-shrink:0}.z1[data-v-0585a91a]{z-index:21}.open[data-v-0585a91a]{animation:open-data-v-0585a91a .3s;animation-fill-mode:forwards}@keyframes open-data-v-0585a91a{0%{opacity:0;transform:translateY(0)}to{opacity:1;transform:translateY(-100%)}}.close[data-v-0585a91a]{animation:close-data-v-0585a91a .3s;animation-fill-mode:forwards}@keyframes close-data-v-0585a91a{0%{opacity:1;transform:translateY(-100%)}to{opacity:0;transform:translateY(0)}}", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VuerSingle_vue__ = __webpack_require__(4);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_580b2bea_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_VuerSingle_vue__ = __webpack_require__(19);
function injectStyle (ssrContext) {
  __webpack_require__(13)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-580b2bea"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_VuerSingle_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_580b2bea_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_VuerSingle_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("677d0642", content, true, {});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".img-vuer[data-v-580b2bea]{position:relative;width:100%;height:100%;display:none}", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DoubleBounce_vue__ = __webpack_require__(6);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_70adc34c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DoubleBounce_vue__ = __webpack_require__(18);
function injectStyle (ssrContext) {
  __webpack_require__(16)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-70adc34c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_DoubleBounce_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_70adc34c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_DoubleBounce_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("1a42df79", content, true, {});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".spinner[data-v-70adc34c]{width:40px;height:40px;margin:calc(50vh - 20px) auto;position:relative}.double-bounce1[data-v-70adc34c],.double-bounce2[data-v-70adc34c]{width:100%;height:100%;border-radius:50%;background-color:#ccc;opacity:.6;position:absolute;top:0;left:0;-webkit-animation:sk-bounce-data-v-70adc34c 2s infinite ease-in-out;animation:sk-bounce-data-v-70adc34c 2s infinite ease-in-out}.double-bounce2[data-v-70adc34c]{-webkit-animation-delay:-1s;animation-delay:-1s}@-webkit-keyframes sk-bounce-data-v-70adc34c{0%,to{-webkit-transform:scale(0)}50%{-webkit-transform:scale(1)}}@keyframes sk-bounce-data-v-70adc34c{0%,to{transform:scale(0);-webkit-transform:scale(0)}50%{transform:scale(1);-webkit-transform:scale(1)}}", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"spinner"},[_c('div',{staticClass:"double-bounce1"}),_vm._v(" "),_c('div',{staticClass:"double-bounce2"})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.loading)?_c('loader'):_vm._e(),_vm._v(" "),_c('div',{directives:[{name:"transform",rawName:"v-transform"},{name:"finger",rawName:"v-finger:pinch",value:(_vm.handlePinch),expression:"handlePinch",arg:"pinch"},{name:"finger",rawName:"v-finger:doubleTap",value:(_vm.handleDoubleTap),expression:"handleDoubleTap",arg:"doubleTap"},{name:"finger",rawName:"v-finger:multipointStart",value:(_vm.handleMultipointStart),expression:"handleMultipointStart",arg:"multipointStart"},{name:"finger",rawName:"v-finger:pressMove",value:(_vm.handlePressMove),expression:"handlePressMove",arg:"pressMove"},{name:"finger",rawName:"v-finger:touchEnd",value:(_vm.handleTouchEnd),expression:"handleTouchEnd",arg:"touchEnd"}],staticClass:"img-vuer"},[_c('img',{directives:[{name:"transform",rawName:"v-transform"}],staticStyle:{"position":"absolute"},attrs:{"src":_vm.srcDelay}})])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"prevent-pass-through"}),_vm._v(" "),_c('div',{directives:[{name:"finger",rawName:"v-finger:singleTap",value:(_vm.handleTapClose),expression:"handleTapClose",arg:"singleTap"}],staticClass:"slider",style:({ 'background-color': _vm.backgroundColor })},[_c('div',{directives:[{name:"transform",rawName:"v-transform"},{name:"finger",rawName:"v-finger:pressMove",value:(_vm.handlePressMove),expression:"handlePressMove",arg:"pressMove"},{name:"finger",rawName:"v-finger:touchStart",value:(_vm.handleTouchStart),expression:"handleTouchStart",arg:"touchStart"},{name:"finger",rawName:"v-finger:touchEnd",value:(_vm.handleTouchEnd),expression:"handleTouchEnd",arg:"touchEnd"},{name:"finger",rawName:"v-finger:swipe",value:(_vm.handleSwipe),expression:"handleSwipe",arg:"swipe"}],staticClass:"item-wrapper"},_vm._l((_vm.imgList),function(src,index){return _c('VuerSingle',{key:src + index,ref:"img",refInFor:true,staticClass:"item",class:{ z1: _vm.currentIndex === index },attrs:{"src":src},on:{"disableSwipe":function($event){_vm.allowSwipe = false},"enableSwipe":function($event){_vm.allowSwipe = true}}})}),1),_vm._v(" "),_c('div',{staticClass:"words title"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),(_vm.useCloseButton)?_c('div',{staticClass:"words close-btn",on:{"click":function($event){return _vm.handleTapClose(null, null, true)}}},[_vm._v("\n      ×\n    ")]):_vm._e(),_vm._v(" "),(_vm.isIndexShow)?_c('div',{staticClass:"words index"},[_vm._v("\n      "+_vm._s(_vm.currentIndex + 1 + "/" + _vm.imgList.length)+"\n      "),_c('br'),_vm._v("\n      "+_vm._s(_vm.desc.length >= _vm.currentIndex ? _vm.desc[_vm.currentIndex] : "")+"\n    ")]):_vm._e()])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define(e):t["v-finger"]=e()}(this,function(){"use strict";function t(t){return Math.sqrt(t.x*t.x+t.y*t.y)}function e(e,i){var s=function(e,i){var s=t(e)*t(i);if(0===s)return 0;var n=function(t,e){return t.x*e.x+t.y*e.y}(e,i)/s;return n>1&&(n=1),Math.acos(n)}(e,i);return function(t,e){return t.x*e.y-e.x*t.y}(e,i)>0&&(s*=-1),180*s/Math.PI}var i=function(t){this.handlers=[],this.el=t};function s(t,e){var s=new i(t);return s.add(e),s}i.prototype.add=function(t){this.handlers.push(t)},i.prototype.del=function(t){t||(this.handlers=[]);for(var e=this.handlers.length;e>=0;e--)this.handlers[e]===t&&this.handlers.splice(e,1)},i.prototype.dispatch=function(){for(var t=0,e=this.handlers.length;t<e;t++){var i=this.handlers[t];"function"==typeof i&&i.apply(this.el,arguments)}};var n=function(t,e){if(this.element="string"==typeof t?document.querySelector(t):t,this.start=this.start.bind(this),this.move=this.move.bind(this),this.end=this.end.bind(this),this.cancel=this.cancel.bind(this),function(){for(var t=navigator.userAgent,e=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],i=!0,s=0;s<e.length;s++)if(t.indexOf(e[s])>0){i=!1;break}return i}()){var i=this,n=!1;this.element.addEventListener("mousedown",function(t){t.preventDefault(),n=!0,t.touches=[{pageX:t.pageX,pageY:t.pageY}],i.start(t)},!1),this.element.addEventListener("mousemove",function(t){t.preventDefault(),!0===n&&(t.touches=[{pageX:t.pageX,pageY:t.pageY}],i.move(t))},!1),this.element.addEventListener("mouseup",function(t){t.preventDefault(),n=!1,t.touches=[{pageX:t.pageX,pageY:t.pageY}],t.changedTouches=[{pageX:t.pageX,pageY:t.pageY}],i.end(t)},!1),this.element.addEventListener("mouseout",function(t){t.preventDefault(),t.touches=[{pageX:t.pageX,pageY:t.pageY}],i.cancel(t)},!1)}else this.element.addEventListener("touchstart",this.start,!1),this.element.addEventListener("touchmove",this.move,!1),this.element.addEventListener("touchend",this.end,!1),this.element.addEventListener("touchcancel",this.cancel,!1);this.preV={x:null,y:null},this.pinchStartLen=null,this.zoom=1,this.isDoubleTap=!1;var h=function(){};this.rotate=s(this.element,e.rotate||h),this.touchStart=s(this.element,e.touchStart||h),this.multipointStart=s(this.element,e.multipointStart||h),this.multipointEnd=s(this.element,e.multipointEnd||h),this.pinch=s(this.element,e.pinch||h),this.swipe=s(this.element,e.swipe||h),this.tap=s(this.element,e.tap||h),this.doubleTap=s(this.element,e.doubleTap||h),this.longTap=s(this.element,e.longTap||h),this.singleTap=s(this.element,e.singleTap||h),this.pressMove=s(this.element,e.pressMove||h),this.twoFingerPressMove=s(this.element,e.twoFingerPressMove||h),this.touchMove=s(this.element,e.touchMove||h),this.touchEnd=s(this.element,e.touchEnd||h),this.touchCancel=s(this.element,e.touchCancel||h),this._cancelAllHandler=this.cancelAll.bind(this),window.removeEventListener("scroll",this._cancelAllHandler),window.addEventListener("scroll",this._cancelAllHandler),this.delta=null,this.last=null,this.now=null,this.tapTimeout=null,this.singleTapTimeout=null,this.longTapTimeout=null,this.swipeTimeout=null,this.x1=this.x2=this.y1=this.y2=null,this.preTapPosition={x:null,y:null}};n.prototype={start:function(e){if(e.touches){this.now=Date.now(),this.x1=e.touches[0].pageX,this.y1=e.touches[0].pageY,this.delta=this.now-(this.last||this.now),this.touchStart.dispatch(e,this.element),null!==this.preTapPosition.x&&(this.isDoubleTap=this.delta>0&&this.delta<=250&&Math.abs(this.preTapPosition.x-this.x1)<30&&Math.abs(this.preTapPosition.y-this.y1)<30),this.preTapPosition.x=this.x1,this.preTapPosition.y=this.y1,this.last=this.now;var i=this.preV;if(e.touches.length>1){this._cancelLongTap(),this._cancelSingleTap();var s={x:e.touches[1].pageX-this.x1,y:e.touches[1].pageY-this.y1};i.x=s.x,i.y=s.y,this.pinchStartLen=t(i),this.multipointStart.dispatch(e,this.element)}this._preventTap=!1,this.longTapTimeout=setTimeout(function(){this.longTap.dispatch(e,this.element),this._preventTap=!0}.bind(this),750)}},move:function(i){if(i.touches){var s=this.preV,n=i.touches.length,h=i.touches[0].pageX,a=i.touches[0].pageY;if(this.isDoubleTap=!1,n>1){var o=i.touches[1].pageX,r=i.touches[1].pageY,l={x:i.touches[1].pageX-h,y:i.touches[1].pageY-a};null!==s.x&&(this.pinchStartLen>0&&(i.zoom=t(l)/this.pinchStartLen,this.pinch.dispatch(i,this.element)),i.angle=e(l,s),this.rotate.dispatch(i,this.element)),s.x=l.x,s.y=l.y,null!==this.x2&&null!==this.sx2?(i.deltaX=(h-this.x2+o-this.sx2)/2,i.deltaY=(a-this.y2+r-this.sy2)/2):(i.deltaX=0,i.deltaY=0),this.twoFingerPressMove.dispatch(i,this.element),this.sx2=o,this.sy2=r}else null!==this.x2?(i.deltaX=h-this.x2,i.deltaY=a-this.y2):(i.deltaX=0,i.deltaY=0),this.pressMove.dispatch(i,this.element);this.touchMove.dispatch(i,this.element),this._cancelLongTap(),this.x2=h,this.y2=a,n>1&&i.preventDefault()}},end:function(t){if(t.changedTouches){this._cancelLongTap();var e=this;t.touches.length<2&&(this.multipointEnd.dispatch(t,this.element),this.sx2=this.sy2=null),this.x2&&Math.abs(this.x1-this.x2)>30||this.y2&&Math.abs(this.y1-this.y2)>30?(t.direction=this._swipeDirection(this.x1,this.x2,this.y1,this.y2),this.swipeTimeout=setTimeout(function(){e.swipe.dispatch(t,e.element)},0)):(this.tapTimeout=setTimeout(function(){e._preventTap||e.tap.dispatch(t,e.element),e.isDoubleTap&&(e.doubleTap.dispatch(t,e.element),clearTimeout(e.singleTapTimeout),e.isDoubleTap=!1)},0),e.isDoubleTap||(e.singleTapTimeout=setTimeout(function(){e.singleTap.dispatch(t,e.element)},250))),this.touchEnd.dispatch(t,this.element),this.preV.x=0,this.preV.y=0,this.zoom=1,this.pinchStartLen=null,this.x1=this.x2=this.y1=this.y2=null}},cancelAll:function(){this._preventTap=!0,clearTimeout(this.singleTapTimeout),clearTimeout(this.tapTimeout),clearTimeout(this.longTapTimeout),clearTimeout(this.swipeTimeout)},cancel:function(t){this.cancelAll(),this.touchCancel.dispatch(t,this.element)},_cancelLongTap:function(){clearTimeout(this.longTapTimeout)},_cancelSingleTap:function(){clearTimeout(this.singleTapTimeout)},_swipeDirection:function(t,e,i,s){return Math.abs(t-e)>=Math.abs(i-s)?t-e>0?"Left":"Right":i-s>0?"Up":"Down"},on:function(t,e){this[t]&&this[t].add(e)},off:function(t,e){this[t]&&this[t].del(e)},destroy:function(){return this.singleTapTimeout&&clearTimeout(this.singleTapTimeout),this.tapTimeout&&clearTimeout(this.tapTimeout),this.longTapTimeout&&clearTimeout(this.longTapTimeout),this.swipeTimeout&&clearTimeout(this.swipeTimeout),this.element.removeEventListener("touchstart",this.start),this.element.removeEventListener("touchmove",this.move),this.element.removeEventListener("touchend",this.end),this.element.removeEventListener("touchcancel",this.cancel),this.rotate.del(),this.touchStart.del(),this.multipointStart.del(),this.multipointEnd.del(),this.pinch.del(),this.swipe.del(),this.tap.del(),this.doubleTap.del(),this.longTap.del(),this.singleTap.del(),this.pressMove.del(),this.twoFingerPressMove.del(),this.touchMove.del(),this.touchEnd.del(),this.touchCancel.del(),this.preV=this.pinchStartLen=this.zoom=this.isDoubleTap=this.delta=this.last=this.now=this.tapTimeout=this.singleTapTimeout=this.longTapTimeout=this.swipeTimeout=this.x1=this.x2=this.y1=this.y2=this.preTapPosition=this.rotate=this.touchStart=this.multipointStart=this.multipointEnd=this.pinch=this.swipe=this.tap=this.doubleTap=this.longTap=this.singleTap=this.pressMove=this.touchMove=this.touchEnd=this.touchCancel=this.twoFingerPressMove=null,null}};var h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=.017453292519943295,o=function(t,e,i,s,n,h,a,o,r,l,u,c,p,d,m,f){this.elements=window.Float32Array?new Float32Array(16):[];var T=this.elements;T[0]=void 0!==t?t:1,T[4]=e||0,T[8]=i||0,T[12]=s||0,T[1]=n||0,T[5]=void 0!==h?h:1,T[9]=a||0,T[13]=o||0,T[2]=r||0,T[6]=l||0,T[10]=void 0!==u?u:1,T[14]=c||0,T[3]=p||0,T[7]=d||0,T[11]=m||0,T[15]=void 0!==f?f:1};o.prototype={set:function(t,e,i,s,n,h,a,o,r,l,u,c,p,d,m,f){var T=this.elements;return T[0]=t,T[4]=e,T[8]=i,T[12]=s,T[1]=n,T[5]=h,T[9]=a,T[13]=o,T[2]=r,T[6]=l,T[10]=u,T[14]=c,T[3]=p,T[7]=d,T[11]=m,T[15]=f,this},identity:function(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this},multiplyMatrices:function(t,e){var i=t.elements,s=this.elements,n=i[0],h=i[4],a=i[8],o=i[12],r=i[1],l=i[5],u=i[9],c=i[13],p=i[2],d=i[6],m=i[10],f=i[14],T=i[3],g=i[7],y=i[11],v=i[15],w=e[0],x=e[1],M=e[2],X=e[3],Y=e[4],b=e[5],_=e[6],S=e[7],L=e[8],E=e[9],P=e[10],Z=e[11],D=e[12],k=e[13],A=e[14],F=e[15];return s[0]=n*w+h*Y+a*L+o*D,s[4]=n*x+h*b+a*E+o*k,s[8]=n*M+h*_+a*P+o*A,s[12]=n*X+h*S+a*Z+o*F,s[1]=r*w+l*Y+u*L+c*D,s[5]=r*x+l*b+u*E+c*k,s[9]=r*M+l*_+u*P+c*A,s[13]=r*X+l*S+u*Z+c*F,s[2]=p*w+d*Y+m*L+f*D,s[6]=p*x+d*b+m*E+f*k,s[10]=p*M+d*_+m*P+f*A,s[14]=p*X+d*S+m*Z+f*F,s[3]=T*w+g*Y+y*L+v*D,s[7]=T*x+g*b+y*E+v*k,s[11]=T*M+g*_+y*P+v*A,s[15]=T*X+g*S+y*Z+v*F,this},_rounded:function(t,e){return e=Math.pow(10,e||15),Math.round(t*e)/e},_arrayWrap:function(t){return window.Float32Array?new Float32Array(t):t},appendTransform:function(t,e,i,s,n,h,o,r,l,u,c,p,d,m){var f=o*a,T=this._rounded(Math.cos(f)),g=this._rounded(Math.sin(f)),y=r*a,v=this._rounded(Math.cos(y)),w=this._rounded(Math.sin(y)),x=l*a,M=this._rounded(Math.cos(-1*x)),X=this._rounded(Math.sin(-1*x));return this.multiplyMatrices(this,this._arrayWrap([1,0,0,t,0,T,g,e,0,-g,T,i,0,0,0,1])),this.multiplyMatrices(this,this._arrayWrap([v,0,w,0,0,1,0,0,-w,0,v,0,0,0,0,1])),this.multiplyMatrices(this,this._arrayWrap([M*s,X*n,0,0,-X*s,M*n,0,0,0,0,1*h,0,0,0,0,1])),(u||c)&&this.multiplyMatrices(this,this._arrayWrap([this._rounded(Math.cos(u*a)),this._rounded(Math.sin(u*a)),0,0,-1*this._rounded(Math.sin(c*a)),this._rounded(Math.cos(c*a)),0,0,0,0,1,0,0,0,0,1])),(p||d||m)&&(this.elements[12]-=p*this.elements[0]+d*this.elements[4]+m*this.elements[8],this.elements[13]-=p*this.elements[1]+d*this.elements[5]+m*this.elements[9],this.elements[14]-=p*this.elements[2]+d*this.elements[6]+m*this.elements[10]),this}};var r=function(t,e,i,s,n,h){return this.a=null==t?1:t,this.b=e||0,this.c=i||0,this.d=null==s?1:s,this.tx=n||0,this.ty=h||0,this};function l(t,e,i){Object.defineProperty(t,e,{get:function(){return this["_"+e]},set:function(t){this["_"+e]=t,i()}})}function u(t,e){if(!t.___mixCSS3Transform){var i,s=["translateX","translateY","translateZ","scaleX","scaleY","scaleZ","rotateX","rotateY","rotateZ","skewX","skewY","originX","originY","originZ"],n=(i=t,"object"===("undefined"==typeof HTMLElement?"undefined":h(HTMLElement))?i instanceof HTMLElement:i&&"object"===(void 0===i?"undefined":h(i))&&null!==i&&1===i.nodeType&&"string"==typeof i.nodeName);e||s.push("perspective"),t.___mixCSS3Transform=!0,function(t,e,i){for(var s=0,n=e.length;s<n;s++)l(t,e[s],i)}(t,s,function(){var i=t.matrix3d.identity().appendTransform(t.translateX,t.translateY,t.translateZ,t.scaleX,t.scaleY,t.scaleZ,t.rotateX,t.rotateY,t.rotateZ,t.skewX,t.skewY,t.originX,t.originY,t.originZ),s=(e?"":"perspective("+t.perspective+"px) ")+"matrix3d("+Array.prototype.slice.call(i.elements).join(",")+")";n?t.style.transform=t.style.msTransform=t.style.OTransform=t.style.MozTransform=t.style.webkitTransform=s:t.transform=s}),t.matrix3d=new o,e||(t.perspective=500),t.scaleX=t.scaleY=t.scaleZ=1,t.translateX=t.translateY=t.translateZ=t.rotateX=t.rotateY=t.rotateZ=t.skewX=t.skewY=t.originX=t.originY=t.originZ=0}}return r.prototype={identity:function(){return this.a=this.d=1,this.b=this.c=this.tx=this.ty=0,this},appendTransform:function(t,e,i,s,n,h,o,r,l){if(n%360)var u=n*a,c=Math.cos(u),p=Math.sin(u);else c=1,p=0;return h||o?(h*=a,o*=a,this.append(Math.cos(o),Math.sin(o),-Math.sin(h),Math.cos(h),t,e),this.append(c*i,p*i,-p*s,c*s,0,0)):this.append(c*i,p*i,-p*s,c*s,t,e),(r||l)&&(this.tx-=r*this.a+l*this.c,this.ty-=r*this.b+l*this.d),this},append:function(t,e,i,s,n,h){var a=this.a,o=this.b,r=this.c,l=this.d;return this.a=t*a+e*r,this.b=t*o+e*l,this.c=i*a+s*r,this.d=i*o+s*l,this.tx=n*a+h*r+this.tx,this.ty=n*o+h*l+this.ty,this},initialize:function(t,e,i,s,n,h){return this.a=t,this.b=e,this.c=i,this.d=s,this.tx=n,this.ty=h,this},setValues:function(t,e,i,s,n,h){return this.a=null==t?1:t,this.b=e||0,this.c=i||0,this.d=null==s?1:s,this.tx=n||0,this.ty=h||0,this},copy:function(t){return this.setValues(t.a,t.b,t.c,t.d,t.tx,t.ty)}},u.getMatrix3D=function(t){var e={translateX:0,translateY:0,translateZ:0,rotateX:0,rotateY:0,rotateZ:0,skewX:0,skewY:0,originX:0,originY:0,originZ:0,scaleX:1,scaleY:1,scaleZ:1};for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);return(new o).identity().appendTransform(e.translateX,e.translateY,e.translateZ,e.scaleX,e.scaleY,e.scaleZ,e.rotateX,e.rotateY,e.rotateZ,e.skewX,e.skewY,e.originX,e.originY,e.originZ).elements},u.getMatrix2D=function(t){var e={translateX:0,translateY:0,rotation:0,skewX:0,skewY:0,originX:0,originY:0,scaleX:1,scaleY:1};for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);return(new r).identity().appendTransform(e.translateX,e.translateY,e.scaleX,e.scaleY,e.rotation,e.skewX,e.skewY,e.originX,e.originY)},{install:function(t,e){t.prototype.toJSON=function(){},t.directive("finger-test",{inserted:function(t){console.log("vFingerMK42 added")}}),t.directive("transform",{inserted:function(t){u(t)}});var i=new Map;t.directive("finger",{inserted:function(t,e){var s,h,a,o=i.get(t);void 0===o?i.set(t,new n(t,(s={},h=e.arg,a=function(t,i){return e.value(t,i)},h in s?Object.defineProperty(s,h,{value:a,enumerable:!0,configurable:!0,writable:!0}):s[h]=a,s))):o.on(e.arg,function(t,i){return e.value(t,i)})}})}}});


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map