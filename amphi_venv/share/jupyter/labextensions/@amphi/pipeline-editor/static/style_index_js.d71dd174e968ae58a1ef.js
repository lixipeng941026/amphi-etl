"use strict";
(self["webpackChunk_amphi_pipeline_editor"] = self["webpackChunk_amphi_pipeline_editor"] || []).push([["style_index_js"],{

/***/ "../../node_modules/css-loader/dist/cjs.js!./style/canvas.css"
/*!********************************************************************!*\
  !*** ../../node_modules/css-loader/dist/cjs.js!./style/canvas.css ***!
  \********************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*
Editor components styles
*/


.react-flow__node {
  z-index: 1000 !important;
}

.react-flow__node-annotation {
  z-index: 0 !important;
}
.react-flow__node-annotation.selected {
  z-index: 0 !important;
}

.react-flow__node.selected .handle-right,
.react-flow__node.selected .handle-left,
.react-flow__node.selected .handle-bottom {
  visibility: visible;
}

.react-flow__node.selected {
  border-color: 1px solid black;
}

.react-flow__node-toolbar {
  border-radius: 5px;
  box-shadow: var(--jp-elevation-z1);
  transition: 0.2s box-shadow;
}

.react-flow__node-toolbar div {
  margin: 0px;
  padding: 0px;
  height:16px;
}


.react-flow__node-toolbar button {
  border: 1px solid #eee;
  background: white;
  cursor: pointer;
  padding: 4px;
}


.react-flow__node-toolbar button:hover {
  background: #f5f5f6;
}

.react-flow__node-toolbar svg {
  color: #404040;
}

.react-flow__node-toolbar button:hover svg {
  color: #5F9B97;
  /* Change icon color on hover */
}

.react-flow__node-toolbar button:first-child {
  border-radius: 5px 0 0 5px;
  border-right: none;
}

.react-flow__node-toolbar button:last-child {
  border-radius: 0 5px 5px 0;
  border-left: none;
}

.component,
.component-card {
  position: relative;
  background-color: #F2F4F7;
  width: 180px;
  min-height: 120px;
  padding: 8px;
  border-color: #F0F5F7;
  border-radius: 3px;
  color: #161616;
  box-shadow: var(--jp-elevation-z1);
  transition: box-shadow 0.2s;
}

.component::before,
.component-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px; /* Thickness of the border */
  background-color: var(--border-color, #778899); /* Default color */
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.component .handle-right {
  position: absolute;
  top: 54px;
  right: -6px;
  width: 8px;
  height: 25px;
  border-radius: 2px;
  background-color: #778899;
}

.component .handle-left {
  position: absolute;
  top: 54px;
  left: -6px;
  width: 8px;
  height: 25px;
  border-radius: 2px;
  background-color: #778899;
}

.component .second-handle-left {
  position: absolute;
  top: 114px;
  left: -6px;
  width: 8px;
  height: 25px;
  border-radius: 2px;
  background-color: #778899;
}

.component .handle-bottom {
  position: absolute;
  bottom: -6px;
  width: 25px;
  height: 6px;
  border-radius: 2px;
  background-color: #c6cfd6;
}

.component_label {
  display: block;
  margin-top: 0.25rem; /* equivalent to mt-1 */
  font-size: 0.75rem; /* equivalent to text-xs */
  font-weight: 500; /* equivalent to font-medium */
  color: black;
}

.component__header {
  padding: 2px 0;
  border-bottom: 1px solid #e2e8f0;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.component__body {
  padding-bottom: 3px;
  padding-top: 3px;
}

.component--default {
  background-color: #F2F4F7;
}

.component__header--default {
  border-bottom-color: #e2e8f0;
}

/* Execution status styles */
.component--running {
  --border-color: #005DC8; /* Blue */
}

.component--success {
  --border-color: #1f883d; /* Green */
}

.component--failed {
  --border-color: #D1242F; /* Red */
}

.component__header--snowflake {
  background-color: #F6F6F7;
}

.component__header--success {
  /* Optional: additional styles for header when success */
  border-bottom: 2px solid #00FF00; /* Example: green bottom border */
}


/* Components delete button */
.component .deletebutton:hover {
  cursor: pointer;
}

.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  vertical-align: middle;
}

.placeholder svg {
  position: relative;
  top: 6px; /* Shift 10px below */
  height: 42px;
  width: 42px;
}

.ant-form-item {
  margin-bottom: 0px;
}

.ant-form-item-label {
  font-size: 16px;
  padding: 0 0 3px;
}

:global .ant-row .ant-form-item-row {
  margin-top: 5px;
}

/*
Components palette sidebar
*/

.canvas {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
}

.sidebar {
  border-right: 1px solid #eee;
  border-left: 1px solid #E0E0E0;
  font-size: 12px;
  background-color: white;
  position: relative;
  height: 100%;
  overflow-y: auto;
}

.sidebar .description {
  margin-right: 8px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.sidebar .draggable_component {
  height: 30px;
  padding: 4px;
  background-color: #F2F4F7;
  border: 1px solid var(--jp-border-color2);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: grab;
  line-height: 16px;
  border-radius: 3px;
}

.sidebar .ant-tree {
  font-size: 13px;
  font-family: var(--jp-ui-font-family);
}

.canvas .reactflow-wrapper {
  flex-grow: 1;
  height: 100%;
}

.canvas .selectall {
  margin-top: 10px;
}

@media screen and (min-width: 768px) {
  .canvas {
    display: flex;
    flex-direction: row;
  }

  .sidebar {
    top: 0;
    right: 0;
    height: 100%;
    /* width: 220px; */
    z-index: 10;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

.palette-component {
  position: relative;
  z-index: 300;
  /* Ensure the draggable elements are always on top */
  cursor: move;
  /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}

.palette-component-category {
  position: relative;
  z-index: 500;
  /* Ensure categories are on top but below components */
}

.sidebar .palette-component-category {
  font-weight: bold;
}

.sidebar .ant-tree-indent-unit {
  width: 8px;
}

/*
Edges 
*/

.temp .react-flow__edge-path {
  stroke: #bbb;
  stroke-dasharray: 5 5;
}


.edgebutton {
  width: 20px;
  height: 20px;
  background-color: #F2F4F7;
  border: 1px solid white;
  cursor: pointer;
  border-radius: 50%;
  font-size: 12px;
  line-height: 1; /* equivalent to leading-none */
}

.edgebutton:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1); /* equivalent to shadow-lg */
}


/*
Form inputs
*/

input:checked+label {
  border-color: black;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.component_select__input {
  outline: none;
}

.component_select__input:focus {
  box-shadow: none;
  border: none;
}

.form-indicator svg {
  display: block;
}


/* Single Input Selects */

.component_select__single-value {
  font-size: 1rem;
  line-height: 1.5;
}

.component_select__option {
  font-size: 1rem;
  line-height: 1.5;
}

.component_select__indicator-separator {
  height: 1.25rem;
}

/* Datagrid */

.lm-DataGrid {
  min-width: 64px;
  min-height: 64px;
  border: 1px solid #F0F0F0 !important;
  margin: 5px;
}

.lm-DataGrid-scrollBar {
  /* Reset custom scrollbar styles */
  width: auto;
  height: auto;
  position: static; /* or remove position if not necessary */
  overflow: auto;   /* Allow browser to handle scrollbar */
}

.lm-ScrollBar-thumb {
  /* Remove custom thumb styles to use browser default */
  transform: none;
  top: auto;
  height: auto;
}

.lm-ScrollBar-track,
.lm-ScrollBar-button {
  display: none; /* Hide custom buttons and tracks */
}`, "",{"version":3,"sources":["webpack://./style/canvas.css"],"names":[],"mappings":"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","sourcesContent":["/*\r\nEditor components styles\r\n*/\r\n\r\n\r\n.react-flow__node {\r\n  z-index: 1000 !important;\r\n}\r\n\r\n.react-flow__node-annotation {\r\n  z-index: 0 !important;\r\n}\r\n.react-flow__node-annotation.selected {\r\n  z-index: 0 !important;\r\n}\r\n\r\n.react-flow__node.selected .handle-right,\r\n.react-flow__node.selected .handle-left,\r\n.react-flow__node.selected .handle-bottom {\r\n  visibility: visible;\r\n}\r\n\r\n.react-flow__node.selected {\r\n  border-color: 1px solid black;\r\n}\r\n\r\n.react-flow__node-toolbar {\r\n  border-radius: 5px;\r\n  box-shadow: var(--jp-elevation-z1);\r\n  transition: 0.2s box-shadow;\r\n}\r\n\r\n.react-flow__node-toolbar div {\r\n  margin: 0px;\r\n  padding: 0px;\r\n  height:16px;\r\n}\r\n\r\n\r\n.react-flow__node-toolbar button {\r\n  border: 1px solid #eee;\r\n  background: white;\r\n  cursor: pointer;\r\n  padding: 4px;\r\n}\r\n\r\n\r\n.react-flow__node-toolbar button:hover {\r\n  background: #f5f5f6;\r\n}\r\n\r\n.react-flow__node-toolbar svg {\r\n  color: #404040;\r\n}\r\n\r\n.react-flow__node-toolbar button:hover svg {\r\n  color: #5F9B97;\r\n  /* Change icon color on hover */\r\n}\r\n\r\n.react-flow__node-toolbar button:first-child {\r\n  border-radius: 5px 0 0 5px;\r\n  border-right: none;\r\n}\r\n\r\n.react-flow__node-toolbar button:last-child {\r\n  border-radius: 0 5px 5px 0;\r\n  border-left: none;\r\n}\r\n\r\n.component,\r\n.component-card {\r\n  position: relative;\r\n  background-color: #F2F4F7;\r\n  width: 180px;\r\n  min-height: 120px;\r\n  padding: 8px;\r\n  border-color: #F0F5F7;\r\n  border-radius: 3px;\r\n  color: #161616;\r\n  box-shadow: var(--jp-elevation-z1);\r\n  transition: box-shadow 0.2s;\r\n}\r\n\r\n.component::before,\r\n.component-card::before {\r\n  content: '';\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  height: 4px; /* Thickness of the border */\r\n  background-color: var(--border-color, #778899); /* Default color */\r\n  border-top-left-radius: 3px;\r\n  border-top-right-radius: 3px;\r\n}\r\n\r\n.component .handle-right {\r\n  position: absolute;\r\n  top: 54px;\r\n  right: -6px;\r\n  width: 8px;\r\n  height: 25px;\r\n  border-radius: 2px;\r\n  background-color: #778899;\r\n}\r\n\r\n.component .handle-left {\r\n  position: absolute;\r\n  top: 54px;\r\n  left: -6px;\r\n  width: 8px;\r\n  height: 25px;\r\n  border-radius: 2px;\r\n  background-color: #778899;\r\n}\r\n\r\n.component .second-handle-left {\r\n  position: absolute;\r\n  top: 114px;\r\n  left: -6px;\r\n  width: 8px;\r\n  height: 25px;\r\n  border-radius: 2px;\r\n  background-color: #778899;\r\n}\r\n\r\n.component .handle-bottom {\r\n  position: absolute;\r\n  bottom: -6px;\r\n  width: 25px;\r\n  height: 6px;\r\n  border-radius: 2px;\r\n  background-color: #c6cfd6;\r\n}\r\n\r\n.component_label {\r\n  display: block;\r\n  margin-top: 0.25rem; /* equivalent to mt-1 */\r\n  font-size: 0.75rem; /* equivalent to text-xs */\r\n  font-weight: 500; /* equivalent to font-medium */\r\n  color: black;\r\n}\r\n\r\n.component__header {\r\n  padding: 2px 0;\r\n  border-bottom: 1px solid #e2e8f0;\r\n  font-weight: bold;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  font-size: 12px;\r\n}\r\n\r\n.component__body {\r\n  padding-bottom: 3px;\r\n  padding-top: 3px;\r\n}\r\n\r\n.component--default {\r\n  background-color: #F2F4F7;\r\n}\r\n\r\n.component__header--default {\r\n  border-bottom-color: #e2e8f0;\r\n}\r\n\r\n/* Execution status styles */\r\n.component--running {\r\n  --border-color: #005DC8; /* Blue */\r\n}\r\n\r\n.component--success {\r\n  --border-color: #1f883d; /* Green */\r\n}\r\n\r\n.component--failed {\r\n  --border-color: #D1242F; /* Red */\r\n}\r\n\r\n.component__header--snowflake {\r\n  background-color: #F6F6F7;\r\n}\r\n\r\n.component__header--success {\r\n  /* Optional: additional styles for header when success */\r\n  border-bottom: 2px solid #00FF00; /* Example: green bottom border */\r\n}\r\n\r\n\r\n/* Components delete button */\r\n.component .deletebutton:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n.placeholder {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  height: 80px;\r\n  vertical-align: middle;\r\n}\r\n\r\n.placeholder svg {\r\n  position: relative;\r\n  top: 6px; /* Shift 10px below */\r\n  height: 42px;\r\n  width: 42px;\r\n}\r\n\r\n.ant-form-item {\r\n  margin-bottom: 0px;\r\n}\r\n\r\n.ant-form-item-label {\r\n  font-size: 16px;\r\n  padding: 0 0 3px;\r\n}\r\n\r\n:global .ant-row .ant-form-item-row {\r\n  margin-top: 5px;\r\n}\r\n\r\n/*\r\nComponents palette sidebar\r\n*/\r\n\r\n.canvas {\r\n  display: flex;\r\n  flex-direction: column;\r\n  flex-grow: 1;\r\n  height: 100%;\r\n}\r\n\r\n.sidebar {\r\n  border-right: 1px solid #eee;\r\n  border-left: 1px solid #E0E0E0;\r\n  font-size: 12px;\r\n  background-color: white;\r\n  position: relative;\r\n  height: 100%;\r\n  overflow-y: auto;\r\n}\r\n\r\n.sidebar .description {\r\n  margin-right: 8px;\r\n  margin-bottom: 10px;\r\n  margin-top: 10px;\r\n}\r\n\r\n.sidebar .draggable_component {\r\n  height: 30px;\r\n  padding: 4px;\r\n  background-color: #F2F4F7;\r\n  border: 1px solid var(--jp-border-color2);\r\n  margin-bottom: 10px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: flex-start;\r\n  cursor: grab;\r\n  line-height: 16px;\r\n  border-radius: 3px;\r\n}\r\n\r\n.sidebar .ant-tree {\r\n  font-size: 13px;\r\n  font-family: var(--jp-ui-font-family);\r\n}\r\n\r\n.canvas .reactflow-wrapper {\r\n  flex-grow: 1;\r\n  height: 100%;\r\n}\r\n\r\n.canvas .selectall {\r\n  margin-top: 10px;\r\n}\r\n\r\n@media screen and (min-width: 768px) {\r\n  .canvas {\r\n    display: flex;\r\n    flex-direction: row;\r\n  }\r\n\r\n  .sidebar {\r\n    top: 0;\r\n    right: 0;\r\n    height: 100%;\r\n    /* width: 220px; */\r\n    z-index: 10;\r\n    overflow-x: hidden;\r\n    overflow-y: auto;\r\n  }\r\n}\r\n\r\n.palette-component {\r\n  position: relative;\r\n  z-index: 300;\r\n  /* Ensure the draggable elements are always on top */\r\n  cursor: move;\r\n  /* fallback if grab cursor is unsupported */\r\n  cursor: grab;\r\n  cursor: -moz-grab;\r\n  cursor: -webkit-grab;\r\n}\r\n\r\n.palette-component-category {\r\n  position: relative;\r\n  z-index: 500;\r\n  /* Ensure categories are on top but below components */\r\n}\r\n\r\n.sidebar .palette-component-category {\r\n  font-weight: bold;\r\n}\r\n\r\n.sidebar .ant-tree-indent-unit {\r\n  width: 8px;\r\n}\r\n\r\n/*\r\nEdges \r\n*/\r\n\r\n.temp .react-flow__edge-path {\r\n  stroke: #bbb;\r\n  stroke-dasharray: 5 5;\r\n}\r\n\r\n\r\n.edgebutton {\r\n  width: 20px;\r\n  height: 20px;\r\n  background-color: #F2F4F7;\r\n  border: 1px solid white;\r\n  cursor: pointer;\r\n  border-radius: 50%;\r\n  font-size: 12px;\r\n  line-height: 1; /* equivalent to leading-none */\r\n}\r\n\r\n.edgebutton:hover {\r\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1); /* equivalent to shadow-lg */\r\n}\r\n\r\n\r\n/*\r\nForm inputs\r\n*/\r\n\r\ninput:checked+label {\r\n  border-color: black;\r\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\r\n}\r\n\r\n.component_select__input {\r\n  outline: none;\r\n}\r\n\r\n.component_select__input:focus {\r\n  box-shadow: none;\r\n  border: none;\r\n}\r\n\r\n.form-indicator svg {\r\n  display: block;\r\n}\r\n\r\n\r\n/* Single Input Selects */\r\n\r\n.component_select__single-value {\r\n  font-size: 1rem;\r\n  line-height: 1.5;\r\n}\r\n\r\n.component_select__option {\r\n  font-size: 1rem;\r\n  line-height: 1.5;\r\n}\r\n\r\n.component_select__indicator-separator {\r\n  height: 1.25rem;\r\n}\r\n\r\n/* Datagrid */\r\n\r\n.lm-DataGrid {\r\n  min-width: 64px;\r\n  min-height: 64px;\r\n  border: 1px solid #F0F0F0 !important;\r\n  margin: 5px;\r\n}\r\n\r\n.lm-DataGrid-scrollBar {\r\n  /* Reset custom scrollbar styles */\r\n  width: auto;\r\n  height: auto;\r\n  position: static; /* or remove position if not necessary */\r\n  overflow: auto;   /* Allow browser to handle scrollbar */\r\n}\r\n\r\n.lm-ScrollBar-thumb {\r\n  /* Remove custom thumb styles to use browser default */\r\n  transform: none;\r\n  top: auto;\r\n  height: auto;\r\n}\r\n\r\n.lm-ScrollBar-track,\r\n.lm-ScrollBar-button {\r\n  display: none; /* Hide custom buttons and tracks */\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ "../../node_modules/css-loader/dist/runtime/api.js"
/*!*********************************************************!*\
  !*** ../../node_modules/css-loader/dist/runtime/api.js ***!
  \*********************************************************/
(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ },

/***/ "../../node_modules/css-loader/dist/runtime/sourceMaps.js"
/*!****************************************************************!*\
  !*** ../../node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \****************************************************************/
(module) {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ },

/***/ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"
/*!********************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \********************************************************************************/
(module) {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ },

/***/ "../../node_modules/style-loader/dist/runtime/insertBySelector.js"
/*!************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \************************************************************************/
(module) {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ },

/***/ "../../node_modules/style-loader/dist/runtime/insertStyleElement.js"
/*!**************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**************************************************************************/
(module) {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ },

/***/ "../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"
/*!**************************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**************************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ },

/***/ "../../node_modules/style-loader/dist/runtime/styleDomAPI.js"
/*!*******************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \*******************************************************************/
(module) {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ },

/***/ "../../node_modules/style-loader/dist/runtime/styleTagTransform.js"
/*!*************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*************************************************************************/
(module) {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ },

/***/ "./style/index.js"
/*!************************!*\
  !*** ./style/index.js ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _canvas_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas.css */ "./style/canvas.css");





/***/ },

/***/ "./style/canvas.css"
/*!**************************!*\
  !*** ./style/canvas.css ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_canvas_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./canvas.css */ "../../node_modules/css-loader/dist/cjs.js!./style/canvas.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_canvas_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_canvas_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_canvas_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_canvas_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }

}]);
//# sourceMappingURL=style_index_js.d71dd174e968ae58a1ef.js.map