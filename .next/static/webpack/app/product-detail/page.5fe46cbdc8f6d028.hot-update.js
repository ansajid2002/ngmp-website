"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/product-detail/page",{

/***/ "(app-pages-browser)/./src/app/globals.css":
/*!*****************************!*\
  !*** ./src/app/globals.css ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"8f5e25820af1\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZ2xvYmFscy5jc3MiLCJtYXBwaW5ncyI6IjtBQUFBLCtEQUFlLGNBQWM7QUFDN0IsSUFBSSxJQUFVLElBQUksaUJBQWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvZ2xvYmFscy5jc3M/ZjA1MyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcIjhmNWUyNTgyMGFmMVwiXG5pZiAobW9kdWxlLmhvdCkgeyBtb2R1bGUuaG90LmFjY2VwdCgpIH1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/shared/Navigation/Navigation.tsx":
/*!**********************************************!*\
  !*** ./src/shared/Navigation/Navigation.tsx ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _NavigationItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NavigationItem */ \"(app-pages-browser)/./src/shared/Navigation/NavigationItem.tsx\");\n/* harmony import */ var _data_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/data/navigation */ \"(app-pages-browser)/./src/data/navigation.ts\");\n/* harmony import */ var _app_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/app/page */ \"(app-pages-browser)/./src/app/page.tsx\");\n/* harmony import */ var _redux_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/redux/store */ \"(app-pages-browser)/./src/redux/store.ts\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n// Replace \"yourFilePath\" with the actual path to your data fetching function\nfunction Navigation() {\n    _s();\n    const [navigationData, setNavigationData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const { availablelanguages } = (0,_redux_store__WEBPACK_IMPORTED_MODULE_5__.useAppSelector)((store)=>store.languagesReducer);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchAndSetData = async ()=>{\n            const updatedNavigation = await Promise.all(_data_navigation__WEBPACK_IMPORTED_MODULE_3__.NAVIGATION_DEMO_2.map(async (item)=>{\n                if (item.type === \"megaMenu\") {\n                    const childrenData = await (0,_app_page__WEBPACK_IMPORTED_MODULE_4__.fetchCategoriesAndSubcategories)();\n                    return {\n                        ...item,\n                        children: childrenData || []\n                    };\n                } else if (item.type === \"dropdown\") {\n                    const childrenData = availablelanguages;\n                    return {\n                        ...item,\n                        children: childrenData || []\n                    };\n                }\n                return item;\n            }));\n            setNavigationData(updatedNavigation);\n        };\n        fetchAndSetData();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n        className: \"nc-Navigation flex items-center\",\n        children: navigationData.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_NavigationItem__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                menuItem: item\n            }, item.id, false, {\n                fileName: \"E:\\\\cisecogit\\\\ciseco\\\\src\\\\shared\\\\Navigation\\\\Navigation.tsx\",\n                lineNumber: 44,\n                columnNumber: 9\n            }, this))\n    }, void 0, false, {\n        fileName: \"E:\\\\cisecogit\\\\ciseco\\\\src\\\\shared\\\\Navigation\\\\Navigation.tsx\",\n        lineNumber: 42,\n        columnNumber: 5\n    }, this);\n}\n_s(Navigation, \"fs+Omu8tdLHCZku/ZIBBirFtKzc=\", false, function() {\n    return [\n        _redux_store__WEBPACK_IMPORTED_MODULE_5__.useAppSelector\n    ];\n});\n_c = Navigation;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Navigation);\nvar _c;\n$RefreshReg$(_c, \"Navigation\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9zaGFyZWQvTmF2aWdhdGlvbi9OYXZpZ2F0aW9uLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQW1EO0FBQ0w7QUFDUTtBQUNPO0FBQ2Q7QUFFOUMsNkVBQTZFO0FBRTlFLFNBQVNPOztJQUNQLE1BQU0sQ0FBQ0MsZ0JBQWdCQyxrQkFBa0IsR0FBR1IsK0NBQVFBLENBQUMsRUFBRTtJQUN2RCxNQUFNLEVBQUNTLGtCQUFrQixFQUFDLEdBQUdKLDREQUFjQSxDQUFDLENBQUNLLFFBQVVBLE1BQU1DLGdCQUFnQjtJQUc3RVYsZ0RBQVNBLENBQUM7UUFDUixNQUFNVyxrQkFBa0I7WUFDdEIsTUFBTUMsb0JBQXdCLE1BQU1DLFFBQVFDLEdBQUcsQ0FDN0NaLCtEQUFpQkEsQ0FBQ2EsR0FBRyxDQUFDLE9BQU9DO2dCQUMzQixJQUFJQSxLQUFLQyxJQUFJLEtBQUssWUFBWTtvQkFDNUIsTUFBTUMsZUFBZSxNQUFNZiwwRUFBK0JBO29CQUMxRCxPQUFPO3dCQUNMLEdBQUdhLElBQUk7d0JBQ1BHLFVBQVVELGdCQUFnQixFQUFFO29CQUM5QjtnQkFDRixPQUNLLElBQUlGLEtBQUtDLElBQUksS0FBSyxZQUFZO29CQUNqQyxNQUFNQyxlQUFlVjtvQkFDckIsT0FBTzt3QkFDTCxHQUFHUSxJQUFJO3dCQUNQRyxVQUFVRCxnQkFBZ0IsRUFBRTtvQkFDOUI7Z0JBQ0Y7Z0JBQ0EsT0FBT0Y7WUFDVDtZQUVGVCxrQkFBa0JLO1FBQ3BCO1FBRUFEO0lBQ0YsR0FBRyxFQUFFO0lBRUwscUJBQ0UsOERBQUNTO1FBQUdDLFdBQVU7a0JBQ1hmLGVBQWVTLEdBQUcsQ0FBQyxDQUFDQyxxQkFDbkIsOERBQUNmLHVEQUFjQTtnQkFBZXFCLFVBQVVOO2VBQW5CQSxLQUFLTyxFQUFFOzs7Ozs7Ozs7O0FBSXBDO0dBdkNTbEI7O1FBRXNCRCx3REFBY0E7OztLQUZwQ0M7QUF5Q1QsK0RBQWVBLFVBQVVBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3NoYXJlZC9OYXZpZ2F0aW9uL05hdmlnYXRpb24udHN4Pzg1NDMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IE5hdmlnYXRpb25JdGVtIGZyb20gXCIuL05hdmlnYXRpb25JdGVtXCI7XHJcbmltcG9ydCB7IE5BVklHQVRJT05fREVNT18yIH0gZnJvbSBcIkAvZGF0YS9uYXZpZ2F0aW9uXCI7XHJcbmltcG9ydCB7IGZldGNoQ2F0ZWdvcmllc0FuZFN1YmNhdGVnb3JpZXMgfSBmcm9tIFwiQC9hcHAvcGFnZVwiO1xyXG5pbXBvcnQgeyB1c2VBcHBTZWxlY3RvciB9IGZyb20gXCJAL3JlZHV4L3N0b3JlXCI7XHJcblxyXG4gLy8gUmVwbGFjZSBcInlvdXJGaWxlUGF0aFwiIHdpdGggdGhlIGFjdHVhbCBwYXRoIHRvIHlvdXIgZGF0YSBmZXRjaGluZyBmdW5jdGlvblxyXG5cclxuZnVuY3Rpb24gTmF2aWdhdGlvbigpIHtcclxuICBjb25zdCBbbmF2aWdhdGlvbkRhdGEsIHNldE5hdmlnYXRpb25EYXRhXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCB7YXZhaWxhYmxlbGFuZ3VhZ2VzfSA9IHVzZUFwcFNlbGVjdG9yKChzdG9yZSkgPT4gc3RvcmUubGFuZ3VhZ2VzUmVkdWNlcilcclxuXHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBmZXRjaEFuZFNldERhdGEgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHVwZGF0ZWROYXZpZ2F0aW9uOmFueSA9IGF3YWl0IFByb21pc2UuYWxsKFxyXG4gICAgICAgIE5BVklHQVRJT05fREVNT18yLm1hcChhc3luYyAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gXCJtZWdhTWVudVwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuRGF0YSA9IGF3YWl0IGZldGNoQ2F0ZWdvcmllc0FuZFN1YmNhdGVnb3JpZXMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAuLi5pdGVtLFxyXG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBjaGlsZHJlbkRhdGEgfHwgW10sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIGlmIChpdGVtLnR5cGUgPT09IFwiZHJvcGRvd25cIikge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbkRhdGEgPSBhdmFpbGFibGVsYW5ndWFnZXM7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgLi4uaXRlbSxcclxuICAgICAgICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW5EYXRhIHx8IFtdLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgICAgc2V0TmF2aWdhdGlvbkRhdGEodXBkYXRlZE5hdmlnYXRpb24pO1xyXG4gICAgfTtcclxuXHJcbiAgICBmZXRjaEFuZFNldERhdGEoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8dWwgY2xhc3NOYW1lPVwibmMtTmF2aWdhdGlvbiBmbGV4IGl0ZW1zLWNlbnRlclwiPlxyXG4gICAgICB7bmF2aWdhdGlvbkRhdGEubWFwKChpdGVtKSA9PiAoXHJcbiAgICAgICAgPE5hdmlnYXRpb25JdGVtIGtleT17aXRlbS5pZH0gbWVudUl0ZW09e2l0ZW19IC8+XHJcbiAgICAgICkpfVxyXG4gICAgPC91bD5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOYXZpZ2F0aW9uO1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIk5hdmlnYXRpb25JdGVtIiwiTkFWSUdBVElPTl9ERU1PXzIiLCJmZXRjaENhdGVnb3JpZXNBbmRTdWJjYXRlZ29yaWVzIiwidXNlQXBwU2VsZWN0b3IiLCJOYXZpZ2F0aW9uIiwibmF2aWdhdGlvbkRhdGEiLCJzZXROYXZpZ2F0aW9uRGF0YSIsImF2YWlsYWJsZWxhbmd1YWdlcyIsInN0b3JlIiwibGFuZ3VhZ2VzUmVkdWNlciIsImZldGNoQW5kU2V0RGF0YSIsInVwZGF0ZWROYXZpZ2F0aW9uIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsIml0ZW0iLCJ0eXBlIiwiY2hpbGRyZW5EYXRhIiwiY2hpbGRyZW4iLCJ1bCIsImNsYXNzTmFtZSIsIm1lbnVJdGVtIiwiaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/shared/Navigation/Navigation.tsx\n"));

/***/ })

});