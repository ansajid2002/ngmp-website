"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./src/app/globals.css":
/*!*****************************!*\
  !*** ./src/app/globals.css ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"db7caa9d83a4\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZ2xvYmFscy5jc3MiLCJtYXBwaW5ncyI6IjtBQUFBLCtEQUFlLGNBQWM7QUFDN0IsSUFBSSxJQUFVLElBQUksaUJBQWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvZ2xvYmFscy5jc3M/ZjA1MyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBcImRiN2NhYTlkODNhNFwiXG5pZiAobW9kdWxlLmhvdCkgeyBtb2R1bGUuaG90LmFjY2VwdCgpIH1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/components/SectionHero/SectionHero2.tsx":
/*!*****************************************************!*\
  !*** ./src/components/SectionHero/SectionHero2.tsx ***!
  \*****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _shared_NextPrev_Next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/shared/NextPrev/Next */ \"(app-pages-browser)/./src/shared/NextPrev/Next.tsx\");\n/* harmony import */ var _shared_NextPrev_Prev__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/shared/NextPrev/Prev */ \"(app-pages-browser)/./src/shared/NextPrev/Prev.tsx\");\n/* harmony import */ var react_use_lib_useInterval__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-use/lib/useInterval */ \"(app-pages-browser)/./node_modules/react-use/lib/useInterval.js\");\n/* harmony import */ var react_use_lib_useBoolean__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-use/lib/useBoolean */ \"(app-pages-browser)/./node_modules/react-use/lib/useBoolean.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _app_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/app/layout */ \"(app-pages-browser)/./src/app/layout.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nlet TIME_OUT = null;\nconst SectionHero2 = (param)=>{\n    let { className = \"\", data } = param;\n    _s();\n    if (!data || data.length === 0) {\n        return null; // Or render a loading state or default content when data is not available\n    }\n    // ================= \n    const [indexActive, setIndexActive] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    const [isRunning, toggleIsRunning] = (0,react_use_lib_useBoolean__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(true);\n    (0,react_use_lib_useInterval__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(()=>{\n        handleAutoNext();\n    }, isRunning ? 1000000 : null);\n    //\n    const handleAutoNext = ()=>{\n        setIndexActive((state)=>{\n            if (state >= data.length - 1) {\n                return 0;\n            }\n            return state + 1;\n        });\n    };\n    const handleClickNext = ()=>{\n        setIndexActive((state)=>{\n            if (state >= data.length - 1) {\n                return 0;\n            }\n            return state + 1;\n        });\n        handleAfterClick();\n    };\n    const handleClickPrev = ()=>{\n        setIndexActive((state)=>{\n            if (state === 0) {\n                return data.length - 1;\n            }\n            return state - 1;\n        });\n        handleAfterClick();\n    };\n    const handleAfterClick = ()=>{\n        toggleIsRunning(false);\n        if (TIME_OUT) {\n            clearTimeout(TIME_OUT);\n        }\n        TIME_OUT = setTimeout(()=>{\n            toggleIsRunning(true);\n        }, 1000);\n    };\n    // =================\n    const renderItem = (index)=>{\n        const isActive = indexActive === index;\n        const item = data[index];\n        if (!isActive) {\n            return null;\n        }\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"  bg-gray-200 nc-SectionHero2Item nc-SectionHero2Item--animation flex flex-col-reverse lg:flex-col relative overflow-hidden \".concat(className),\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"absolute bottom-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-20 flex justify-center\",\n                    children: data.map((_, index)=>{\n                        const isActive = indexActive === index;\n                        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            onClick: ()=>{\n                                setIndexActive(index);\n                                handleAfterClick();\n                            },\n                            className: \"relative px-1 py-1.5 cursor-pointer\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"relative w-20 h-1 shadow-sm rounded-md bg-white\",\n                                children: isActive && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"nc-SectionHero2Item__dot absolute inset-0 bg-slate-900 rounded-md \".concat(isActive ? \" \" : \" \")\n                                }, void 0, false, {\n                                    fileName: \"E:\\\\cisecogit\\\\ciseco\\\\src\\\\components\\\\SectionHero\\\\SectionHero2.tsx\",\n                                    lineNumber: 105,\n                                    columnNumber: 21\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"E:\\\\cisecogit\\\\ciseco\\\\src\\\\components\\\\SectionHero\\\\SectionHero2.tsx\",\n                                lineNumber: 101,\n                                columnNumber: 17\n                            }, undefined)\n                        }, index, false, {\n                            fileName: \"E:\\\\cisecogit\\\\ciseco\\\\src\\\\components\\\\SectionHero\\\\SectionHero2.tsx\",\n                            lineNumber: 93,\n                            columnNumber: 15\n                        }, undefined);\n                    })\n                }, void 0, false, {\n                    fileName: \"E:\\\\cisecogit\\\\ciseco\\\\src\\\\components\\\\SectionHero\\\\SectionHero2.tsx\",\n                    lineNumber: 89,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_shared_NextPrev_Prev__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    className: \"absolute start-1 sm:start-5 top-3/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-900  rounded-md\",\n                    btnClassName: \"w-14 h-14 hover:border-slate-400 dark:hover:border-slate-400 bg-[#fb7701]\",\n                    svgSize: \"w-8 h-8\",\n                    onClickPrev: handleClickPrev\n                }, void 0, false, {\n                    fileName: \"E:\\\\cisecogit\\\\ciseco\\\\src\\\\components\\\\SectionHero\\\\SectionHero2.tsx\",\n                    lineNumber: 116,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_shared_NextPrev_Next__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                    className: \"absolute end-1 sm:end-5 top-3/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-900 rounded-md\",\n                    btnClassName: \"w-14 h-14 hover:border-slate-400 dark:hover:border-slate-400 bg-[#fb7701] \",\n                    svgSize: \"w-8 h-8\",\n                    onClickNext: handleClickNext\n                }, void 0, false, {\n                    fileName: \"E:\\\\cisecogit\\\\ciseco\\\\src\\\\components\\\\SectionHero\\\\SectionHero2.tsx\",\n                    lineNumber: 122,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"relative pb-0 pt-14 sm:pt-20 lg:py-44\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"relative z-[1] w-full max-w-3xl space-y-8 sm:space-y-14 nc-SectionHero2Item__left\"\n                        }, void 0, false, {\n                            fileName: \"E:\\\\cisecogit\\\\ciseco\\\\src\\\\components\\\\SectionHero\\\\SectionHero2.tsx\",\n                            lineNumber: 132,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"h-[250px]\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                href: item.link,\n                                target: \"_blank\",\n                                rel: \"noopener noreferrer\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {\n                                    fill: true,\n                                    // sizes=\"(max-width: 768px) 100vw, 50vw\"\n                                    className: \"w-full h-full object-cover nc-SectionHero2Item__image\",\n                                    src: \"\".concat(_app_layout__WEBPACK_IMPORTED_MODULE_5__.AdminUrl, \"/uploads/Banners\").concat(item.banner_url.startsWith(\"/\") ? \"\" : \"/\").concat(item.banner_url),\n                                    alt: \"home banner\",\n                                    priority: true\n                                }, void 0, false, {\n                                    fileName: \"E:\\\\cisecogit\\\\ciseco\\\\src\\\\components\\\\SectionHero\\\\SectionHero2.tsx\",\n                                    lineNumber: 139,\n                                    columnNumber: 15\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"E:\\\\cisecogit\\\\ciseco\\\\src\\\\components\\\\SectionHero\\\\SectionHero2.tsx\",\n                                lineNumber: 138,\n                                columnNumber: 13\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"E:\\\\cisecogit\\\\ciseco\\\\src\\\\components\\\\SectionHero\\\\SectionHero2.tsx\",\n                            lineNumber: 137,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"E:\\\\cisecogit\\\\ciseco\\\\src\\\\components\\\\SectionHero\\\\SectionHero2.tsx\",\n                    lineNumber: 131,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, index, true, {\n            fileName: \"E:\\\\cisecogit\\\\ciseco\\\\src\\\\components\\\\SectionHero\\\\SectionHero2.tsx\",\n            lineNumber: 85,\n            columnNumber: 7\n        }, undefined);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: data.map((_, index)=>renderItem(index))\n    }, void 0, false);\n};\n_s(SectionHero2, \"76sj0x8/ea1d+z6sIG3E6SqSH2E=\", false, function() {\n    return [\n        react_use_lib_useBoolean__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n        react_use_lib_useInterval__WEBPACK_IMPORTED_MODULE_7__[\"default\"]\n    ];\n});\n_c = SectionHero2;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SectionHero2);\nvar _c;\n$RefreshReg$(_c, \"SectionHero2\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb25IZXJvL1NlY3Rpb25IZXJvMi50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUU0QztBQUdGO0FBQ0E7QUFDVTtBQUNGO0FBQ25CO0FBR1M7QUFPeEMsSUFBSVEsV0FBa0M7QUFFdEMsTUFBTUMsZUFBc0M7UUFBQyxFQUFFQyxZQUFZLEVBQUUsRUFBRUMsSUFBSSxFQUFFOztJQUNuRSxJQUFJLENBQUNBLFFBQVFBLEtBQUtDLE1BQU0sS0FBSyxHQUFHO1FBQzlCLE9BQU8sTUFBTSwwRUFBMEU7SUFDekY7SUFDQSxxQkFBcUI7SUFDckIsTUFBTSxDQUFDQyxhQUFhQyxlQUFlLEdBQUdiLCtDQUFRQSxDQUFDO0lBQy9DLE1BQU0sQ0FBQ2MsV0FBV0MsZ0JBQWdCLEdBQUdYLG9FQUFVQSxDQUFDO0lBRWhERCxxRUFBV0EsQ0FDVDtRQUNFYTtJQUNGLEdBQ0FGLFlBQVksVUFBVTtJQUV4QixFQUFFO0lBRUYsTUFBTUUsaUJBQWlCO1FBQ3JCSCxlQUFlLENBQUNJO1lBQ2QsSUFBSUEsU0FBU1AsS0FBS0MsTUFBTSxHQUFHLEdBQUc7Z0JBQzVCLE9BQU87WUFDVDtZQUNBLE9BQU9NLFFBQVE7UUFDakI7SUFDRjtJQUVBLE1BQU1DLGtCQUFrQjtRQUN0QkwsZUFBZSxDQUFDSTtZQUNkLElBQUlBLFNBQVNQLEtBQUtDLE1BQU0sR0FBRyxHQUFHO2dCQUM1QixPQUFPO1lBQ1Q7WUFDQSxPQUFPTSxRQUFRO1FBQ2pCO1FBQ0FFO0lBQ0Y7SUFFQSxNQUFNQyxrQkFBa0I7UUFDdEJQLGVBQWUsQ0FBQ0k7WUFDZCxJQUFJQSxVQUFVLEdBQUc7Z0JBQ2YsT0FBT1AsS0FBS0MsTUFBTSxHQUFHO1lBQ3ZCO1lBQ0EsT0FBT00sUUFBUTtRQUNqQjtRQUNBRTtJQUNGO0lBRUEsTUFBTUEsbUJBQW1CO1FBQ3ZCSixnQkFBZ0I7UUFDaEIsSUFBSVIsVUFBVTtZQUNaYyxhQUFhZDtRQUNmO1FBQ0FBLFdBQVdlLFdBQVc7WUFDcEJQLGdCQUFnQjtRQUNsQixHQUFHO0lBQ0w7SUFDQSxvQkFBb0I7SUFFcEIsTUFBTVEsYUFBYSxDQUFDQztRQUNsQixNQUFNQyxXQUFXYixnQkFBZ0JZO1FBQ2pDLE1BQU1FLE9BQU9oQixJQUFJLENBQUNjLE1BQU07UUFDeEIsSUFBSSxDQUFDQyxVQUFVO1lBQ2IsT0FBTztRQUNUO1FBQ0EscUJBQ0UsOERBQUNFO1lBQ0NsQixXQUFXLCtIQUF5SSxPQUFWQTs7OEJBRzFJLDhEQUFDa0I7b0JBQUlsQixXQUFVOzhCQUNaQyxLQUFLa0IsR0FBRyxDQUFDLENBQUNDLEdBQUdMO3dCQUNaLE1BQU1DLFdBQVdiLGdCQUFnQlk7d0JBQ2pDLHFCQUNFLDhEQUFDRzs0QkFFQ0csU0FBUztnQ0FDUGpCLGVBQWVXO2dDQUNmTDs0QkFDRjs0QkFDQVYsV0FBWTtzQ0FFWiw0RUFBQ2tCO2dDQUNDbEIsV0FBWTswQ0FFWGdCLDBCQUNDLDhEQUFDRTtvQ0FDQ2xCLFdBQVcscUVBQ1IsT0FENkVnQixXQUFXLE1BQU07Ozs7Ozs7Ozs7OzJCQVpsR0Q7Ozs7O29CQW1CWDs7Ozs7OzhCQUdGLDhEQUFDdEIsNkRBQUlBO29CQUNITyxXQUFVO29CQUNWc0IsY0FBYTtvQkFDYkMsU0FBUTtvQkFDUkMsYUFBYWI7Ozs7Ozs4QkFFZiw4REFBQ25CLDZEQUFJQTtvQkFDSFEsV0FBVTtvQkFDVnNCLGNBQWE7b0JBQ2JDLFNBQVE7b0JBQ1JFLGFBQWFoQjs7Ozs7OzhCQUtmLDhEQUFDUztvQkFBSWxCLFdBQVU7O3NDQUNiLDhEQUFDa0I7NEJBQ0NsQixXQUFZOzs7Ozs7c0NBSWQsOERBQUNrQjs0QkFBSWxCLFdBQVU7c0NBQ2IsNEVBQUMwQjtnQ0FBRUMsTUFBTVYsS0FBS1csSUFBSTtnQ0FBRUMsUUFBTztnQ0FBU0MsS0FBSTswQ0FDdEMsNEVBQUNsQyxtREFBS0E7b0NBQ0ptQyxJQUFJO29DQUNKLHlDQUF5QztvQ0FDekMvQixXQUFVO29DQUNWZ0MsS0FBSyxHQUE4QmYsT0FBM0JwQixpREFBUUEsRUFBQyxvQkFBK0RvQixPQUE3Q0EsS0FBS2dCLFVBQVUsQ0FBQ0MsVUFBVSxDQUFDLE9BQU8sS0FBSyxLQUFzQixPQUFoQmpCLEtBQUtnQixVQUFVO29DQUMvRkUsS0FBSTtvQ0FDSkMsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0ExRFhyQjs7Ozs7SUFpRVg7SUFFQSxxQkFBTztrQkFBR2QsS0FBS2tCLEdBQUcsQ0FBQyxDQUFDQyxHQUFHTCxRQUFVRCxXQUFXQzs7QUFDOUM7R0FySU1oQjs7UUFNaUNKLGdFQUFVQTtRQUUvQ0QsaUVBQVdBOzs7S0FSUEs7QUF1SU4sK0RBQWVBLFlBQVlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbkhlcm8vU2VjdGlvbkhlcm8yLnRzeD9lYTZjIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IEZDLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgYmFja2dyb3VuZExpbmVTdmcgZnJvbSBcIkAvaW1hZ2VzL01vb24uc3ZnXCI7XHJcbmltcG9ydCBCdXR0b25QcmltYXJ5IGZyb20gXCJAL3NoYXJlZC9CdXR0b24vQnV0dG9uUHJpbWFyeVwiO1xyXG5pbXBvcnQgTmV4dCBmcm9tIFwiQC9zaGFyZWQvTmV4dFByZXYvTmV4dFwiO1xyXG5pbXBvcnQgUHJldiBmcm9tIFwiQC9zaGFyZWQvTmV4dFByZXYvUHJldlwiO1xyXG5pbXBvcnQgdXNlSW50ZXJ2YWwgZnJvbSBcInJlYWN0LXVzZS9saWIvdXNlSW50ZXJ2YWxcIjtcclxuaW1wb3J0IHVzZUJvb2xlYW4gZnJvbSBcInJlYWN0LXVzZS9saWIvdXNlQm9vbGVhblwiO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIm5leHQvaW1hZ2VcIjtcclxuLy8gaW1wb3J0IHsgSEVSTzJfREVNT19EQVRBIGFzIERBVEEgfSBmcm9tIFwiLi9kYXRhXCI7XHJcbmltcG9ydCB7IGJhbm5lckRhdGEgfSBmcm9tIFwiQC9kYXRhL2RhdGFcIjtcclxuaW1wb3J0IHsgQWRtaW5VcmwgfSBmcm9tIFwiQC9hcHAvbGF5b3V0XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNlY3Rpb25IZXJvMlByb3BzIHtcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgZGF0YT86IGJhbm5lckRhdGFbXTtcclxufVxyXG5cclxubGV0IFRJTUVfT1VUOiBOb2RlSlMuVGltZW91dCB8IG51bGwgPSBudWxsO1xyXG5cclxuY29uc3QgU2VjdGlvbkhlcm8yOiBGQzxTZWN0aW9uSGVybzJQcm9wcz4gPSAoeyBjbGFzc05hbWUgPSBcIlwiLCBkYXRhIH0pID0+IHtcclxuICBpZiAoIWRhdGEgfHwgZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybiBudWxsOyAvLyBPciByZW5kZXIgYSBsb2FkaW5nIHN0YXRlIG9yIGRlZmF1bHQgY29udGVudCB3aGVuIGRhdGEgaXMgbm90IGF2YWlsYWJsZVxyXG4gIH1cclxuICAvLyA9PT09PT09PT09PT09PT09PSBcclxuICBjb25zdCBbaW5kZXhBY3RpdmUsIHNldEluZGV4QWN0aXZlXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtpc1J1bm5pbmcsIHRvZ2dsZUlzUnVubmluZ10gPSB1c2VCb29sZWFuKHRydWUpO1xyXG5cclxuICB1c2VJbnRlcnZhbChcclxuICAgICgpID0+IHtcclxuICAgICAgaGFuZGxlQXV0b05leHQoKTtcclxuICAgIH0sXHJcbiAgICBpc1J1bm5pbmcgPyAxMDAwMDAwIDogbnVsbFxyXG4gICk7XHJcbiAgLy9cclxuXHJcbiAgY29uc3QgaGFuZGxlQXV0b05leHQgPSAoKSA9PiB7XHJcbiAgICBzZXRJbmRleEFjdGl2ZSgoc3RhdGUpID0+IHtcclxuICAgICAgaWYgKHN0YXRlID49IGRhdGEubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdGF0ZSArIDE7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGlja05leHQgPSAoKSA9PiB7XHJcbiAgICBzZXRJbmRleEFjdGl2ZSgoc3RhdGUpID0+IHtcclxuICAgICAgaWYgKHN0YXRlID49IGRhdGEubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdGF0ZSArIDE7XHJcbiAgICB9KTtcclxuICAgIGhhbmRsZUFmdGVyQ2xpY2soKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGlja1ByZXYgPSAoKSA9PiB7XHJcbiAgICBzZXRJbmRleEFjdGl2ZSgoc3RhdGUpID0+IHtcclxuICAgICAgaWYgKHN0YXRlID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEubGVuZ3RoIC0gMTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3RhdGUgLSAxO1xyXG4gICAgfSk7XHJcbiAgICBoYW5kbGVBZnRlckNsaWNrKCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQWZ0ZXJDbGljayA9ICgpID0+IHtcclxuICAgIHRvZ2dsZUlzUnVubmluZyhmYWxzZSk7XHJcbiAgICBpZiAoVElNRV9PVVQpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KFRJTUVfT1VUKTtcclxuICAgIH1cclxuICAgIFRJTUVfT1VUID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRvZ2dsZUlzUnVubmluZyh0cnVlKTtcclxuICAgIH0sIDEwMDApO1xyXG4gIH07XHJcbiAgLy8gPT09PT09PT09PT09PT09PT1cclxuXHJcbiAgY29uc3QgcmVuZGVySXRlbSA9IChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCBpc0FjdGl2ZSA9IGluZGV4QWN0aXZlID09PSBpbmRleDtcclxuICAgIGNvbnN0IGl0ZW0gPSBkYXRhW2luZGV4XTtcclxuICAgIGlmICghaXNBY3RpdmUpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPXtgICBiZy1ncmF5LTIwMCBuYy1TZWN0aW9uSGVybzJJdGVtIG5jLVNlY3Rpb25IZXJvMkl0ZW0tLWFuaW1hdGlvbiBmbGV4IGZsZXgtY29sLXJldmVyc2UgbGc6ZmxleC1jb2wgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuICR7Y2xhc3NOYW1lfWB9XHJcbiAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTQgc3RhcnQtMS8yIC10cmFuc2xhdGUteC0xLzIgcnRsOnRyYW5zbGF0ZS14LTEvMiB6LTIwIGZsZXgganVzdGlmeS1jZW50ZXJcIj5cclxuICAgICAgICAgIHtkYXRhLm1hcCgoXywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpbmRleEFjdGl2ZSA9PT0gaW5kZXg7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAga2V5PXtpbmRleH1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgc2V0SW5kZXhBY3RpdmUoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICBoYW5kbGVBZnRlckNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcmVsYXRpdmUgcHgtMSBweS0xLjUgY3Vyc29yLXBvaW50ZXJgfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcmVsYXRpdmUgdy0yMCBoLTEgc2hhZG93LXNtIHJvdW5kZWQtbWQgYmctd2hpdGVgfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7aXNBY3RpdmUgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YG5jLVNlY3Rpb25IZXJvMkl0ZW1fX2RvdCBhYnNvbHV0ZSBpbnNldC0wIGJnLXNsYXRlLTkwMCByb3VuZGVkLW1kICR7aXNBY3RpdmUgPyBcIiBcIiA6IFwiIFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxyXG4gICAgICAgICAgICAgICAgICAgID48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxQcmV2XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBzdGFydC0xIHNtOnN0YXJ0LTUgdG9wLTMvNCBzbTp0b3AtMS8yIHNtOi10cmFuc2xhdGUteS0xLzIgei0xMCAhdGV4dC1zbGF0ZS05MDAgIHJvdW5kZWQtbWRcIlxyXG4gICAgICAgICAgYnRuQ2xhc3NOYW1lPVwidy0xNCBoLTE0IGhvdmVyOmJvcmRlci1zbGF0ZS00MDAgZGFyazpob3Zlcjpib3JkZXItc2xhdGUtNDAwIGJnLVsjZmI3NzAxXVwiXHJcbiAgICAgICAgICBzdmdTaXplPVwidy04IGgtOFwiXHJcbiAgICAgICAgICBvbkNsaWNrUHJldj17aGFuZGxlQ2xpY2tQcmV2fVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPE5leHRcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGVuZC0xIHNtOmVuZC01IHRvcC0zLzQgc206dG9wLTEvMiBzbTotdHJhbnNsYXRlLXktMS8yIHotMTAgIXRleHQtc2xhdGUtOTAwIHJvdW5kZWQtbWRcIlxyXG4gICAgICAgICAgYnRuQ2xhc3NOYW1lPVwidy0xNCBoLTE0IGhvdmVyOmJvcmRlci1zbGF0ZS00MDAgZGFyazpob3Zlcjpib3JkZXItc2xhdGUtNDAwIGJnLVsjZmI3NzAxXSBcIlxyXG4gICAgICAgICAgc3ZnU2l6ZT1cInctOCBoLThcIlxyXG4gICAgICAgICAgb25DbGlja05leHQ9e2hhbmRsZUNsaWNrTmV4dH1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICB7LyogQkcgKi99XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgcGItMCBwdC0xNCBzbTpwdC0yMCBsZzpweS00NFwiPlxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2ByZWxhdGl2ZSB6LVsxXSB3LWZ1bGwgbWF4LXctM3hsIHNwYWNlLXktOCBzbTpzcGFjZS15LTE0IG5jLVNlY3Rpb25IZXJvMkl0ZW1fX2xlZnRgfVxyXG4gICAgICAgICAgPlxyXG5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLVsyNTBweF1cIj5cclxuICAgICAgICAgICAgPGEgaHJlZj17aXRlbS5saW5rfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+XHJcbiAgICAgICAgICAgICAgPEltYWdlXHJcbiAgICAgICAgICAgICAgICBmaWxsXHJcbiAgICAgICAgICAgICAgICAvLyBzaXplcz1cIihtYXgtd2lkdGg6IDc2OHB4KSAxMDB2dywgNTB2d1wiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlciBuYy1TZWN0aW9uSGVybzJJdGVtX19pbWFnZVwiXHJcbiAgICAgICAgICAgICAgICBzcmM9e2Ake0FkbWluVXJsfS91cGxvYWRzL0Jhbm5lcnMke2l0ZW0uYmFubmVyX3VybC5zdGFydHNXaXRoKCcvJykgPyAnJyA6ICcvJ30ke2l0ZW0uYmFubmVyX3VybH1gfVxyXG4gICAgICAgICAgICAgICAgYWx0PVwiaG9tZSBiYW5uZXJcIlxyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHlcclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiA8PntkYXRhLm1hcCgoXywgaW5kZXgpID0+IHJlbmRlckl0ZW0oaW5kZXgpKX08Lz47XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uSGVybzI7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwiTmV4dCIsIlByZXYiLCJ1c2VJbnRlcnZhbCIsInVzZUJvb2xlYW4iLCJJbWFnZSIsIkFkbWluVXJsIiwiVElNRV9PVVQiLCJTZWN0aW9uSGVybzIiLCJjbGFzc05hbWUiLCJkYXRhIiwibGVuZ3RoIiwiaW5kZXhBY3RpdmUiLCJzZXRJbmRleEFjdGl2ZSIsImlzUnVubmluZyIsInRvZ2dsZUlzUnVubmluZyIsImhhbmRsZUF1dG9OZXh0Iiwic3RhdGUiLCJoYW5kbGVDbGlja05leHQiLCJoYW5kbGVBZnRlckNsaWNrIiwiaGFuZGxlQ2xpY2tQcmV2IiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInJlbmRlckl0ZW0iLCJpbmRleCIsImlzQWN0aXZlIiwiaXRlbSIsImRpdiIsIm1hcCIsIl8iLCJvbkNsaWNrIiwiYnRuQ2xhc3NOYW1lIiwic3ZnU2l6ZSIsIm9uQ2xpY2tQcmV2Iiwib25DbGlja05leHQiLCJhIiwiaHJlZiIsImxpbmsiLCJ0YXJnZXQiLCJyZWwiLCJmaWxsIiwic3JjIiwiYmFubmVyX3VybCIsInN0YXJ0c1dpdGgiLCJhbHQiLCJwcmlvcml0eSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/SectionHero/SectionHero2.tsx\n"));

/***/ })

});