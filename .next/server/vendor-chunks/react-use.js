"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-use";
exports.ids = ["vendor-chunks/react-use"];
exports.modules = {

/***/ "(ssr)/./node_modules/react-use/lib/useBoolean.js":
/*!**************************************************!*\
  !*** ./node_modules/react-use/lib/useBoolean.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar tslib_1 = __webpack_require__(/*! tslib */ \"(ssr)/./node_modules/tslib/tslib.es6.js\");\nvar useToggle_1 = tslib_1.__importDefault(__webpack_require__(/*! ./useToggle */ \"(ssr)/./node_modules/react-use/lib/useToggle.js\"));\nexports[\"default\"] = useToggle_1.default;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtdXNlL2xpYi91c2VCb29sZWFuLmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGNBQWMsbUJBQU8sQ0FBQyxzREFBTztBQUM3QiwwQ0FBMEMsbUJBQU8sQ0FBQyxvRUFBYTtBQUMvRCxrQkFBZSIsInNvdXJjZXMiOlsid2VicGFjazovL2Npc2Vjby1uZXh0anMvLi9ub2RlX21vZHVsZXMvcmVhY3QtdXNlL2xpYi91c2VCb29sZWFuLmpzPzBkYTUiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdHNsaWJfMSA9IHJlcXVpcmUoXCJ0c2xpYlwiKTtcbnZhciB1c2VUb2dnbGVfMSA9IHRzbGliXzEuX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3VzZVRvZ2dsZVwiKSk7XG5leHBvcnRzLmRlZmF1bHQgPSB1c2VUb2dnbGVfMS5kZWZhdWx0O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-use/lib/useBoolean.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/react-use/lib/useInterval.js":
/*!***************************************************!*\
  !*** ./node_modules/react-use/lib/useInterval.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar react_1 = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\nvar useInterval = function (callback, delay) {\n    var savedCallback = react_1.useRef(function () { });\n    react_1.useEffect(function () {\n        savedCallback.current = callback;\n    });\n    react_1.useEffect(function () {\n        if (delay !== null) {\n            var interval_1 = setInterval(function () { return savedCallback.current(); }, delay || 0);\n            return function () { return clearInterval(interval_1); };\n        }\n        return undefined;\n    }, [delay]);\n};\nexports[\"default\"] = useInterval;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtdXNlL2xpYi91c2VJbnRlcnZhbC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxjQUFjLG1CQUFPLENBQUMsd0dBQU87QUFDN0I7QUFDQSxzREFBc0Q7QUFDdEQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsdURBQXVELGlDQUFpQztBQUN4RixpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGtCQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2lzZWNvLW5leHRqcy8uL25vZGVfbW9kdWxlcy9yZWFjdC11c2UvbGliL3VzZUludGVydmFsLmpzP2Q4OGEiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcmVhY3RfMSA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbnZhciB1c2VJbnRlcnZhbCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgZGVsYXkpIHtcbiAgICB2YXIgc2F2ZWRDYWxsYmFjayA9IHJlYWN0XzEudXNlUmVmKGZ1bmN0aW9uICgpIHsgfSk7XG4gICAgcmVhY3RfMS51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBzYXZlZENhbGxiYWNrLmN1cnJlbnQgPSBjYWxsYmFjaztcbiAgICB9KTtcbiAgICByZWFjdF8xLnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChkZWxheSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGludGVydmFsXzEgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7IHJldHVybiBzYXZlZENhbGxiYWNrLmN1cnJlbnQoKTsgfSwgZGVsYXkgfHwgMCk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbF8xKTsgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0sIFtkZWxheV0pO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IHVzZUludGVydmFsO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-use/lib/useInterval.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/react-use/lib/useToggle.js":
/*!*************************************************!*\
  !*** ./node_modules/react-use/lib/useToggle.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar react_1 = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\nvar toggleReducer = function (state, nextValue) {\n    return typeof nextValue === 'boolean' ? nextValue : !state;\n};\nvar useToggle = function (initialValue) {\n    return react_1.useReducer(toggleReducer, initialValue);\n};\nexports[\"default\"] = useToggle;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtdXNlL2xpYi91c2VUb2dnbGUuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsY0FBYyxtQkFBTyxDQUFDLHdHQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2lzZWNvLW5leHRqcy8uL25vZGVfbW9kdWxlcy9yZWFjdC11c2UvbGliL3VzZVRvZ2dsZS5qcz9hYTQxIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJlYWN0XzEgPSByZXF1aXJlKFwicmVhY3RcIik7XG52YXIgdG9nZ2xlUmVkdWNlciA9IGZ1bmN0aW9uIChzdGF0ZSwgbmV4dFZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBuZXh0VmFsdWUgPT09ICdib29sZWFuJyA/IG5leHRWYWx1ZSA6ICFzdGF0ZTtcbn07XG52YXIgdXNlVG9nZ2xlID0gZnVuY3Rpb24gKGluaXRpYWxWYWx1ZSkge1xuICAgIHJldHVybiByZWFjdF8xLnVzZVJlZHVjZXIodG9nZ2xlUmVkdWNlciwgaW5pdGlhbFZhbHVlKTtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSB1c2VUb2dnbGU7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-use/lib/useToggle.js\n");

/***/ })

};
;