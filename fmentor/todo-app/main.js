/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/funcs/addNewTodo.js":
/*!*********************************!*\
  !*** ./src/funcs/addNewTodo.js ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var updateTheLeftNumber = __webpack_require__(/*! ./updateTheLeftNumber */ \"./src/funcs/updateTheLeftNumber.js\");\n\nvar removeItem = __webpack_require__(/*! ./removeItem */ \"./src/funcs/removeItem.js\");\n\nvar _require = __webpack_require__(/*! ./updateTodos */ \"./src/funcs/updateTodos.js\"),\n    updateTodos = _require.updateTodos;\n\nvar _require2 = __webpack_require__(/*! ./bindDragEventsToItems.js */ \"./src/funcs/bindDragEventsToItems.js\"),\n    bindDragEventsToItems = _require2.bindDragEventsToItems;\n\nvar todoUL = document.getElementsByClassName(\"todo-ul\")[0];\n\nfunction toggleCheckBox(elem) {\n  var activeFilter = document.getElementsByClassName(\"active-filter\")[0].innerText.toLowerCase();\n  elem.classList.toggle(\"checked\");\n  elem.parentElement.classList.toggle(\"completed\"); // we have to update the list everytime we mark an item as completed\n  // because our list must be in sync with our filter. And we have to do\n  // it without changing the active filter, that's why we pass the \n  // current active filter as parameter.\n  // For Instance: we chose our filter as 'active', and then marked an item\n  // as completed, this item must be removed from the active list, otherwise\n  // it'd seem weird.\n\n  updateTodos(activeFilter);\n  updateTheLeftNumber();\n}\n\nfunction addNewTodo(todo) {\n  var activeFilter = document.getElementsByClassName(\"active-filter\")[0].innerText.toLowerCase();\n  /*\n    <p role=\"listitem\">\n      <span role=\"checkbox\" class=\"complete-checkbox\" tabindex=\"0\"></span>\n      <span>Finish the alSanaİş app</span>\n      <button>&times;</button>\n    </p>\n  */\n\n  var p = document.createElement(\"p\");\n  p.setAttribute(\"role\", \"listitem\");\n  p.setAttribute(\"class\", \"todo-item\");\n  p.draggable = \"true\";\n  var checkboxSpan = document.createElement(\"span\");\n  checkboxSpan.setAttribute(\"role\", \"checkbox\");\n  checkboxSpan.setAttribute(\"class\", \"complete-checkbox\");\n  checkboxSpan.setAttribute(\"tabindex\", \"0\");\n  checkboxSpan.addEventListener(\"click\", function () {\n    toggleCheckBox(this);\n  });\n  var textSpan = document.createElement(\"span\"); // we have to create the text node this way, adding a space up front\n  // to prevent the text from getting too close to checkbox\n\n  var text = document.createTextNode(\" \".concat(todo)); // add text to textSpan\n\n  textSpan.appendChild(text); // create button\n\n  var btn = document.createElement(\"button\");\n  btn.innerText = \"x\";\n  btn.addEventListener(\"click\", function () {\n    removeItem(p);\n  }); // add all of these to parent p element\n\n  p.appendChild(checkboxSpan);\n  p.appendChild(textSpan);\n  p.appendChild(btn); // add the p to the ul, as a first element at the top\n\n  todoUL.insertBefore(p, todoUL.firstElementChild); // update the left number\n\n  updateTheLeftNumber(); // when we add a new todo, if active filter is completed\n  // we are switching it to all because the new todo is\n  // being added to list even though filter is completed and\n  // that's not what we want.\n\n  if (activeFilter === \"tamamlanmış\") updateTodos(\"tümü\");\n  bindDragEventsToItems();\n}\n\nmodule.exports = {\n  addNewTodo: addNewTodo,\n  toggleCheckBox: toggleCheckBox\n};\n\n//# sourceURL=webpack://src/./src/funcs/addNewTodo.js?");

/***/ }),

/***/ "./src/funcs/bindDragEventsToItems.js":
/*!********************************************!*\
  !*** ./src/funcs/bindDragEventsToItems.js ***!
  \********************************************/
/***/ (function(module) {

eval("var todoUL = document.getElementsByClassName(\"todo-ul\")[0];\n\nfunction bindDragEventsToItems() {\n  var items = [].slice.call(document.getElementsByClassName(\"todo-item\"));\n  items.forEach(function (item) {\n    // eslint-disable-next-line\n    item.addEventListener(\"dragstart\", function (e) {\n      item.classList.add(\"dragging\");\n    }); // eslint-disable-next-line\n\n    item.addEventListener(\"dragend\", function (e) {\n      item.classList.remove(\"dragging\");\n    });\n    item.addEventListener(\"dragover\", function (e) {\n      e.preventDefault();\n    });\n    item.addEventListener(\"drop\", function (e) {\n      e.preventDefault();\n      var dragging = document.getElementsByClassName(\"dragging\")[0];\n      var afterElement = getDragAfterElement(e.clientY);\n\n      if (afterElement == null) {\n        todoUL.appendChild(dragging);\n      } else {\n        todoUL.insertBefore(dragging, afterElement);\n      }\n    });\n  });\n}\n\nfunction getDragAfterElement(y) {\n  var items = [].slice.call(document.querySelectorAll(\".todo-item:not(.dragging)\"));\n  return items.reduce(function (closest, child) {\n    var box = child.getBoundingClientRect();\n    var boxOffset = y - box.top - box.height / 2;\n\n    if (boxOffset < 0 && boxOffset > closest.offset) {\n      return {\n        offset: boxOffset,\n        element: child\n      };\n    } else return closest;\n  }, {\n    offset: Number.NEGATIVE_INFINITY\n  }).element;\n}\n\nmodule.exports = {\n  bindDragEventsToItems: bindDragEventsToItems\n};\n\n//# sourceURL=webpack://src/./src/funcs/bindDragEventsToItems.js?");

/***/ }),

/***/ "./src/funcs/bindEventToCheckBoxes.js":
/*!********************************************!*\
  !*** ./src/funcs/bindEventToCheckBoxes.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var updateTheLeftNumber = __webpack_require__(/*! ./updateTheLeftNumber.js */ \"./src/funcs/updateTheLeftNumber.js\");\n\nvar _require = __webpack_require__(/*! ./addNewTodo.js */ \"./src/funcs/addNewTodo.js\"),\n    toggleCheckBox = _require.toggleCheckBox;\n\nmodule.exports = function () {\n  var allCheckBoxes = [].slice.call(document.getElementsByClassName(\"complete-checkbox\"));\n  allCheckBoxes.forEach(function (cbox) {\n    cbox.addEventListener(\"click\", function () {\n      toggleCheckBox(this);\n      updateTheLeftNumber();\n    });\n  });\n};\n\n//# sourceURL=webpack://src/./src/funcs/bindEventToCheckBoxes.js?");

/***/ }),

/***/ "./src/funcs/bindEventToRemoveBtns.js":
/*!********************************************!*\
  !*** ./src/funcs/bindEventToRemoveBtns.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var removeItem = __webpack_require__(/*! ./removeItem */ \"./src/funcs/removeItem.js\");\n\nmodule.exports = function () {\n  var rmvBtns = [].slice.call(document.getElementsByClassName(\"rmv-btn\"));\n  rmvBtns.forEach(function (rmvBtn) {\n    rmvBtn.addEventListener(\"click\", function () {\n      removeItem(rmvBtn.parentElement);\n    });\n  });\n};\n\n//# sourceURL=webpack://src/./src/funcs/bindEventToRemoveBtns.js?");

/***/ }),

/***/ "./src/funcs/clearCompletedAll.js":
/*!****************************************!*\
  !*** ./src/funcs/clearCompletedAll.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var updateTheLeftNumber = __webpack_require__(/*! ./updateTheLeftNumber.js */ \"./src/funcs/updateTheLeftNumber.js\");\n\nvar _require = __webpack_require__(/*! ./updateTodos.js */ \"./src/funcs/updateTodos.js\"),\n    updateTodos = _require.updateTodos;\n\nmodule.exports = function () {\n  var activeFilter = document.getElementsByClassName(\"active-filter\")[0].innerText;\n  var checkedBoxes = [].slice.call(document.getElementsByClassName(\"checked\"));\n\n  if (checkedBoxes.length > 0) {\n    checkedBoxes.forEach(function (cbox) {\n      cbox.parentElement.remove();\n      updateTheLeftNumber(); // switch to all filter after cleaning all completed todos\n\n      if (activeFilter.toLowerCase() === \"tamamlanmış\") updateTodos(\"tümü\");\n    });\n  }\n};\n\n//# sourceURL=webpack://src/./src/funcs/clearCompletedAll.js?");

/***/ }),

/***/ "./src/funcs/removeItem.js":
/*!*********************************!*\
  !*** ./src/funcs/removeItem.js ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var updateTheLeftNumber = __webpack_require__(/*! ./updateTheLeftNumber.js */ \"./src/funcs/updateTheLeftNumber.js\");\n\nmodule.exports = function (elem) {\n  elem.remove();\n  updateTheLeftNumber();\n};\n\n//# sourceURL=webpack://src/./src/funcs/removeItem.js?");

/***/ }),

/***/ "./src/funcs/updateTheLeftNumber.js":
/*!******************************************!*\
  !*** ./src/funcs/updateTheLeftNumber.js ***!
  \******************************************/
/***/ (function(module) {

eval("module.exports = function () {\n  var completeCheckBoxes = [].slice.call(document.getElementsByClassName(\"complete-checkbox\"));\n  var numSpan = document.getElementById(\"item-left\");\n  var checkedBoxes = [].slice.call(document.getElementsByClassName(\"checked\"));\n  var left = completeCheckBoxes.length - checkedBoxes.length;\n  numSpan.innerText = left;\n};\n\n//# sourceURL=webpack://src/./src/funcs/updateTheLeftNumber.js?");

/***/ }),

/***/ "./src/funcs/updateTodos.js":
/*!**********************************!*\
  !*** ./src/funcs/updateTodos.js ***!
  \**********************************/
/***/ (function(module) {

eval("var filterWords = [].slice.call(document.getElementsByClassName(\"filter\"));\n\nfunction updateTodos(filter) {\n  var todoItems = [].slice.call(document.getElementsByClassName(\"todo-item\"));\n  var completedTodosLen = document.getElementsByClassName(\"completed\").length;\n  var activeTodosLen = todoItems.length - completedTodosLen; // if the filter is completed/active and\n  // if there's no completed todo, then immediately\n  // switch to filter 'all' so UI looks good.\n  // for instance; if we don't apply this control flow,\n  // when we click on the filter active and then mark an\n  // item as completed, the view the client sees is a completed\n  // item in an active todos list.\n\n  if (filter === \"tamamlanmış\" && completedTodosLen === 0 || filter === \"aktif\" && activeTodosLen === 0) filter = \"tümü\";\n\n  if (filter === \"tümü\") {\n    todoItems.forEach(function (item) {\n      item.classList.remove(\"d-none\");\n    });\n  } else if (filter === \"tamamlanmış\") {\n    todoItems.forEach(function (item) {\n      if (item.classList.contains(\"completed\")) {\n        item.classList.remove(\"d-none\");\n      } else {\n        item.classList.add(\"d-none\");\n      }\n    });\n  } else {\n    todoItems.forEach(function (item) {\n      if (!item.classList.contains(\"completed\")) {\n        item.classList.remove(\"d-none\");\n      } else {\n        item.classList.add(\"d-none\");\n      }\n    });\n  }\n\n  updateFilterClass(filter);\n}\n\nfunction updateFilterClass(filtWord) {\n  filterWords.forEach(function (filterSpan) {\n    if (filterSpan.innerText.toLowerCase() === filtWord) {\n      filterSpan.classList.add(\"active-filter\");\n    } else {\n      filterSpan.classList.remove(\"active-filter\");\n    }\n  });\n} // function translate(\"\")\n\n\nmodule.exports = {\n  updateTodos: updateTodos\n};\n\n//# sourceURL=webpack://src/./src/funcs/updateTodos.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("/* ####### Polyfills for ... ####### */\n__webpack_require__(/*! ./polyfills.js */ \"./src/polyfills.js\");\n/* ####### ... -you guessed it right!- for IE ####### */\n\n\nvar bindEventToCheckBoxes = __webpack_require__(/*! ./funcs/bindEventToCheckBoxes.js */ \"./src/funcs/bindEventToCheckBoxes.js\");\n\nvar bindEventToRemoveBtns = __webpack_require__(/*! ./funcs/bindEventToRemoveBtns.js */ \"./src/funcs/bindEventToRemoveBtns.js\");\n\nvar updateTheLeftNumber = __webpack_require__(/*! ./funcs/updateTheLeftNumber.js */ \"./src/funcs/updateTheLeftNumber.js\");\n\nvar clearCompletedAll = __webpack_require__(/*! ./funcs/clearCompletedAll.js */ \"./src/funcs/clearCompletedAll.js\");\n\nvar _require = __webpack_require__(/*! ./funcs/addNewTodo.js */ \"./src/funcs/addNewTodo.js\"),\n    addNewTodo = _require.addNewTodo;\n\nvar _require2 = __webpack_require__(/*! ./funcs/updateTodos.js */ \"./src/funcs/updateTodos.js\"),\n    updateTodos = _require2.updateTodos;\n\nvar _require3 = __webpack_require__(/*! ./funcs/bindDragEventsToItems.js */ \"./src/funcs/bindDragEventsToItems.js\"),\n    bindDragEventsToItems = _require3.bindDragEventsToItems;\n\nvar modeBtn = document.querySelector(\".mode\"),\n    addCheckbox = document.getElementById(\"add-checkbox\"),\n    newTodo = document.getElementById(\"new-todo\"),\n    clearCompletedBtn = document.getElementsByClassName(\"clear-completed\")[0],\n    filterWords = [].slice.call(document.getElementsByClassName(\"filter\"));\nclearCompletedBtn.addEventListener(\"click\", clearCompletedAll);\n/* ###### BG mode... ###### */\n\nmodeBtn.addEventListener(\"click\", function () {\n  var bodyClassList = [].slice.call(document.body.classList);\n\n  if (bodyClassList.indexOf(\"dark\") > -1) {\n    document.body.classList.remove(\"dark\");\n    document.querySelector(\".mode > img\").src = \"./images/icon-moon.svg\";\n  } else {\n    document.body.classList.add(\"dark\");\n    document.querySelector(\".mode > img\").src = \"./images/icon-sun.svg\";\n  }\n});\n/* ###### ...BG mode ###### */\n\nfilterWords.forEach(function (filt) {\n  filt.addEventListener(\"click\", function () {\n    var filterWord = this.innerText.toLowerCase();\n    updateTodos(filterWord);\n  });\n});\nnewTodo.addEventListener(\"keydown\", function (e) {\n  if (e.keyCode === 13) {\n    validateInp();\n  }\n});\naddCheckbox.addEventListener(\"click\", validateInp);\n\nfunction validateInp() {\n  var val = newTodo.value;\n\n  if (val && val.trim() !== \"\") {\n    addNewTodo(val);\n    newTodo.value = \"\";\n    return;\n  }\n\n  alert(\"Girdi alananını boş bıraktınız;\");\n}\n\nfunction updateUI() {\n  bindEventToCheckBoxes();\n  bindEventToRemoveBtns();\n  bindDragEventsToItems();\n  updateTheLeftNumber();\n} // DOMContentLoaded may fire before the script has a chance to run\n// so it is wise to check before adding a listener.\n\n\nif (document.readyState === \"loading\") {\n  document.addEventListener(\"DOMContentLoaded\", updateUI);\n} else {\n  updateUI();\n}\n\n//# sourceURL=webpack://src/./src/main.js?");

/***/ }),

/***/ "./src/polyfills.js":
/*!**************************!*\
  !*** ./src/polyfills.js ***!
  \**************************/
/***/ (function() {

eval("Element.prototype.remove = Element.prototype.remove || function () {\n  this.parentElement && this.parentElement.removeChild(this);\n}; // Production steps of ECMA-262, Edition 5, 15.4.4.21\n// Reference: https://es5.github.io/#x15.4.4.21\n// https://tc39.github.io/ecma262/#sec-array.prototype.reduce\n\n\nif (!Array.prototype.reduce) {\n  Object.defineProperty(Array.prototype, \"reduce\", {\n    value: function value(callback\n    /*, initialValue*/\n    ) {\n      if (this === null) {\n        throw new TypeError(\"Array.prototype.reduce \" + \"called on null or undefined\");\n      }\n\n      if (typeof callback !== \"function\") {\n        throw new TypeError(callback + \" is not a function\");\n      } // 1. Let O be ? ToObject(this value).\n\n\n      var o = Object(this); // 2. Let len be ? ToLength(? Get(O, \"length\")).\n\n      var len = o.length >>> 0; // Steps 3, 4, 5, 6, 7\n\n      var k = 0;\n      var value;\n\n      if (arguments.length >= 2) {\n        value = arguments[1];\n      } else {\n        while (k < len && !(k in o)) {\n          k++;\n        } // 3. If len is 0 and initialValue is not present,\n        //    throw a TypeError exception.\n\n\n        if (k >= len) {\n          throw new TypeError(\"Reduce of empty array \" + \"with no initial value\");\n        }\n\n        value = o[k++];\n      } // 8. Repeat, while k < len\n\n\n      while (k < len) {\n        // a. Let Pk be ! ToString(k).\n        // b. Let kPresent be ? HasProperty(O, Pk).\n        // c. If kPresent is true, then\n        //    i.  Let kValue be ? Get(O, Pk).\n        //    ii. Let accumulator be ? Call(\n        //          callbackfn, undefined,\n        //          « accumulator, kValue, k, O »).\n        if (k in o) {\n          value = callback(value, o[k], k, o);\n        } // d. Increase k by 1.\n\n\n        k++;\n      } // 9. Return accumulator.\n\n\n      return value;\n    }\n  });\n}\n\n//# sourceURL=webpack://src/./src/polyfills.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;