"use strict";
(self["webpackChunk_amphi_pipeline_log_console"] = self["webpackChunk_amphi_pipeline_log_console"] || []).push([["lib_index_js"],{

/***/ "./lib/DataView.js"
/*!*************************!*\
  !*** ./lib/DataView.js ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glideapps_glide_data_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @glideapps/glide-data-grid */ "../../node_modules/@glideapps/glide-data-grid/dist/esm/internal/data-grid/data-grid-types.js");
/* harmony import */ var _glideapps_glide_data_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @glideapps/glide-data-grid */ "../../node_modules/@glideapps/glide-data-grid/dist/esm/data-editor-all.js");
/* harmony import */ var react_laag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-laag */ "../../node_modules/react-laag/dist/react-laag.esm.js");




// Empty bounds for initialization
const zeroBounds = {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    right: 0,
    bottom: 0
};
const DataView = ({ htmlData }) => {
    const [pixelRatio, setPixelRatio] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => window.devicePixelRatio);
    const [rowsData, setRowsData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [gridColumns, setGridColumns] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [originalHeaders, setOriginalHeaders] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    // Tooltip state
    const [tooltip, setTooltip] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    const timeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
    const gridContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const handleResize = () => {
            if (window.devicePixelRatio !== pixelRatio) {
                setPixelRatio(window.devicePixelRatio);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [pixelRatio]);
    // Clean up tooltip timeout on unmount
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        return () => window.clearTimeout(timeoutRef.current);
    }, []);
    // Calculate optimal column width based on header content
    const getOptimalColumnWidth = (title) => {
        // Approximate width calculation - each character is roughly 8px wide in standard font
        // Add 40px for padding and icon
        const estimatedWidth = Math.min(Math.max(title.length * 8 + 40, 100), 200);
        return estimatedWidth;
    };
    // Convert HTML table to JSON
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const { data, headers } = htmlToJson(htmlData);
        setOriginalHeaders(headers);
        // Clean up "<NA>" values
        const cleanedData = data.map(row => {
            const cleanRow = { ...row };
            Object.keys(cleanRow).forEach(key => {
                if (cleanRow[key] === "<NA>") {
                    cleanRow[key] = "";
                }
            });
            return cleanRow;
        });
        // Build columns, extracting only the column name part and guessing icons from type
        const updatedColumns = headers.map((header) => {
            // If header is empty, return no icon
            if (!header.trim()) {
                return {
                    title: header,
                    width: getOptimalColumnWidth(header)
                };
            }
            const match = header.match(/^(.*?)\s*\((.*?)\)\s*$/);
            // Extract clean column name (without type) and type for the icon
            let cleanColumnName = header;
            let dataType = "string";
            if (match) {
                cleanColumnName = match[1].trim();
                const colType = match[2].trim().toLowerCase();
                if (colType.includes("int"))
                    dataType = "number";
                else if (colType.includes("float") || colType.includes("decimal"))
                    dataType = "decimal";
                else if (colType.includes("date") || colType.includes("time"))
                    dataType = "datetime";
                else if (colType.includes("bool"))
                    dataType = "boolean";
            }
            return {
                title: cleanColumnName,
                id: header,
                icon: dataType,
                width: getOptimalColumnWidth(cleanColumnName)
            };
        });
        setGridColumns(updatedColumns);
        setRowsData(cleanedData);
    }, [htmlData]);
    const onColumnResize = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((_column, newSize, colIndex) => {
        setGridColumns((prev) => {
            const updated = [...prev];
            updated[colIndex] = { ...updated[colIndex], width: newSize };
            return updated;
        });
    }, []);
    const getCellContent = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(([col, row]) => {
        var _a;
        if (row >= rowsData.length || col >= gridColumns.length) {
            return {
                kind: _glideapps_glide_data_grid__WEBPACK_IMPORTED_MODULE_1__.GridCellKind.Text,
                data: "",
                displayData: "",
                allowOverlay: false
            };
        }
        // Use the original header (with type) to access the data
        const columnKey = originalHeaders[col];
        const value = (_a = rowsData[row][columnKey]) !== null && _a !== void 0 ? _a : "";
        return {
            kind: _glideapps_glide_data_grid__WEBPACK_IMPORTED_MODULE_1__.GridCellKind.Text,
            data: value,
            displayData: value,
            allowOverlay: false
        };
    }, [gridColumns, rowsData, originalHeaders]);
    // Function to get accurate bounds relative to viewport
    const getAbsoluteBounds = (bounds) => {
        return {
            left: bounds.left,
            top: bounds.top,
            width: bounds.width,
            height: bounds.height,
            right: bounds.left + bounds.width,
            bottom: bounds.top + bounds.height
        };
    };
    // Tooltip handler for cell hover with fixed positioning
    const onItemHovered = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((args) => {
        if (args.kind !== "header") {
            window.clearTimeout(timeoutRef.current);
            setTooltip(undefined);
            return;
        }
        window.clearTimeout(timeoutRef.current);
        setTooltip(undefined);
        const col = args.location[0]; // column index
        timeoutRef.current = window.setTimeout(() => {
            if (col >= gridColumns.length)
                return;
            const rawHeader = originalHeaders[col]; // e.g. "price (decimal32)"
            const typeMatch = rawHeader.match(/\((.+?)\)/);
            const fullType = typeMatch ? typeMatch[1] : "string";
            const { x, y, width, height } = args.bounds; // header bounds
            setTooltip({
                val: fullType,
                bounds: {
                    left: x,
                    top: y,
                    width,
                    height,
                    right: x + width,
                    bottom: y + height
                }
            });
        }, 1000); // quicker reveal
    }, [gridColumns, originalHeaders]);
    // Create icons using bgColor and fgColor properties
    const headerIcons = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        return {
            string: (p) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${p.bgColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 16v-6a2 2 0 1 1 4 0v6" />
        <path d="M3 13h4" />
        <path d="M10 8v6a2 2 0 1 0 4 0v-1a2 2 0 1 0 -4 0v1" />
        <path d="M20.732 12a2 2 0 0 0 -3.732 1v1a2 2 0 0 0 3.726 1.01" />
      </svg>`,
            number: (p) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${p.bgColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 10l2 -2v8" />
        <path d="M9 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h3" />
        <path d="M17 8h2.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1 -1.5 1.5h-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1 -1.5 1.5h-2.5" />
      </svg>`,
            decimal: (p) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${p.bgColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M17 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2z" />
        <path d="M10 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2z" />
        <path d="M5 16h.01" />
      </svg>`,
            datetime: (p) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${p.bgColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" />
        <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M15 3v4" />
        <path d="M7 3v4" />
        <path d="M3 11h16" />
        <path d="M18 16.496v1.504l1 1" />
      </svg>`,
            boolean: (p) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
      viewBox="0 0 24 24" fill="none" stroke="${p.bgColor}" stroke-width="2" 
      stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 3v18" />
        <path d="M12 14l7 -7" />
        <path d="M12 19l8.5 -8.5" />
        <path d="M12 9l4.5 -4.5" />
      </svg>`
        };
    }, []);
    // Set up react-laag for tooltip rendering with improved positioning
    const isOpen = tooltip !== undefined;
    const { renderLayer, layerProps } = (0,react_laag__WEBPACK_IMPORTED_MODULE_3__.useLayer)({
        isOpen: tooltip !== undefined,
        triggerOffset: 8,
        placement: "top-center",
        possiblePlacements: ["top-center", "bottom-center", "left-center", "right-center"],
        auto: true,
        containerOffset: 16,
        trigger: {
            getBounds: () => { var _a; return (_a = tooltip === null || tooltip === void 0 ? void 0 : tooltip.bounds) !== null && _a !== void 0 ? _a : zeroBounds; }
        }
    });
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { ref: gridContainerRef, style: { position: "relative", width: "100%", height: "100%" } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_glideapps_glide_data_grid__WEBPACK_IMPORTED_MODULE_2__.DataEditorAll, { key: pixelRatio, columns: gridColumns, minColumnWidth: 100, getCellContent: getCellContent, rows: rowsData.length, rowMarkers: "none", onColumnResize: onColumnResize, onItemHovered: onItemHovered, smoothScrollX: false, smoothScrollY: false, experimental: { strict: false, renderStrategy: "direct" }, headerIcons: headerIcons, getCellsForSelection: true, theme: (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
                baseFontStyle: "0.8125rem",
                headerFontStyle: "600 0.8125rem",
                editorFontSize: "0.8125rem",
                accentColor: "#5f9b97",
                accentLight: "#edf4f3",
                bgHeaderHovered: "#edf4f3",
                bgBubbleSelected: "#edf4f3",
                bgHeader: "#fafafa",
                bgIconHeader: "#5F9B97"
            }), []) }),
        isOpen &&
            renderLayer(react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { ...layerProps, style: {
                    ...layerProps.style,
                    padding: "8px 12px",
                    color: "white",
                    font: "500 13px Inter",
                    backgroundColor: "rgba(0, 0, 0, 0.85)",
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
                    borderRadius: 7,
                    maxWidth: "300px",
                    wordBreak: "break-word",
                    zIndex: 9999
                } }, tooltip === null || tooltip === void 0 ? void 0 : tooltip.val))));
};
function htmlToJson(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    // Get all headers (don't skip the index column anymore)
    const allHeaderCells = Array.from(doc.querySelectorAll("table thead th"));
    const headers = allHeaderCells.map((th) => { var _a, _b; return (_b = (_a = th.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : ""; });
    const dataHeaders = headers;
    // For each row in <tbody>, map cells to headers, skipping the first cell (index)
    const rows = doc.querySelectorAll("table tbody tr");
    const data = Array.from(rows, (row) => {
        const cells = row.querySelectorAll("th, td");
        const rowObj = {};
        // Map each header to its corresponding cell, skip the first cell (index)
        dataHeaders.forEach((header, idx) => {
            var _a, _b, _c;
            rowObj[header] = (_c = (_b = (_a = cells[idx]) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : "";
        });
        return rowObj;
    });
    return { data, headers: dataHeaders };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataView);


/***/ },

/***/ "./lib/DocumentView.js"
/*!*****************************!*\
  !*** ./lib/DocumentView.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "../../node_modules/antd/es/tree/index.js");


const parseHTMLToJSON = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const documentElements = doc.querySelectorAll('#documents > div._amphi_document');
    const documents = [];
    documentElements.forEach((element) => {
        var _a, _b, _c;
        const nbElement = element.querySelector('div._amphi_nb');
        const pageContentElement = element.querySelector('div._amphi_page_content');
        const metadataElement = element.querySelector('div._amphi_metadata');
        if (nbElement && pageContentElement && metadataElement) {
            const nb = ((_a = nbElement.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
            const pageContent = ((_b = pageContentElement.innerHTML) === null || _b === void 0 ? void 0 : _b.replace('<strong>Document Content:</strong>', '').trim()) || '';
            let metadataText = ((_c = metadataElement.textContent) === null || _c === void 0 ? void 0 : _c.replace('Metadata:', '').trim()) || '';
            let metadata;
            try {
                metadataText = metadataText.replace(/'/g, '"'); // Replace single quotes with double quotes
                metadata = JSON.parse(metadataText);
            }
            catch (e) {
                console.error("Error parsing metadata:", e);
                metadata = metadataText; // Fall back to raw text if parsing fails
            }
            documents.push({ nb, page_content: pageContent, metadata: metadata });
        }
    });
    return documents;
};
const createTreeData = (documents) => {
    return documents.map((doc, index) => ({
        title: doc.nb,
        key: `doc-${index}`,
        children: [
            {
                title: (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("pre", { style: { userSelect: 'text', cursor: 'text' } }, doc.page_content)),
                key: `doc-${index}-page-content`
            },
            {
                title: 'Metadata',
                key: `doc-${index}-metadata`,
                children: Object.entries(doc.metadata).map(([key, value]) => ({
                    title: `${key}: ${value}`,
                    key: `doc-${index}-metadata-${key}`
                }))
            }
        ]
    }));
};
const DocumentView = ({ htmlData }) => {
    const documents = parseHTMLToJSON(htmlData);
    const treeData = createTreeData(documents);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__["default"], { defaultExpandedKeys: treeData.map(node => node.key), defaultSelectedKeys: treeData.map(node => node.key), defaultCheckedKeys: treeData.map(node => node.key), treeData: treeData }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DocumentView);


/***/ },

/***/ "./lib/handler.js"
/*!************************!*\
  !*** ./lib/handler.js ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PipelineConsoleHandler: () => (/* binding */ PipelineConsoleHandler)
/* harmony export */ });
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_0__);

class AbstractHandler {
    constructor(connector) {
        this._isDisposed = false;
        this._disposed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal(this);
        this._rendermime = null;
        this._connector = connector;
    }
    get disposed() {
        return this._disposed;
    }
    get isDisposed() {
        return this._isDisposed;
    }
    get rendermime() {
        return this._rendermime;
    }
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        this._disposed.emit();
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal.clearData(this);
    }
}
/**
 * An object that handles code inspection.
 */
class PipelineConsoleHandler extends AbstractHandler {
    constructor(options) {
        var _a;
        super(options.connector);
        this._id = options.id;
        this._rendermime = (_a = options.rendermime) !== null && _a !== void 0 ? _a : null;
        this._ready = this._connector.ready;
        this._connector.kernelRestarted.connect((sender, kernelReady) => {
            const title = {
                contextName: '<b>Restarting kernel...</b> '
            };
            this._ready = this._connector.ready;
        });
    }
    get id() {
        return this._id;
    }
    get ready() {
        return this._ready;
    }
}


/***/ },

/***/ "./lib/icons.js"
/*!**********************!*\
  !*** ./lib/icons.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clockIcon: () => (/* binding */ clockIcon),
/* harmony export */   cpuIcon: () => (/* binding */ cpuIcon),
/* harmony export */   dateTimeIcon: () => (/* binding */ dateTimeIcon),
/* harmony export */   decimalIcon: () => (/* binding */ decimalIcon),
/* harmony export */   gridIcon: () => (/* binding */ gridIcon),
/* harmony export */   labelIcon: () => (/* binding */ labelIcon),
/* harmony export */   numberIcon: () => (/* binding */ numberIcon),
/* harmony export */   pipelineIcon: () => (/* binding */ pipelineIcon),
/* harmony export */   stringIcon: () => (/* binding */ stringIcon)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_icons_clock_16_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/icons/clock-16.svg */ "./style/icons/clock-16.svg");
/* harmony import */ var _style_icons_grid_16_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/icons/grid-16.svg */ "./style/icons/grid-16.svg");
/* harmony import */ var _style_icons_cpu_16_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/icons/cpu-16.svg */ "./style/icons/cpu-16.svg");
/* harmony import */ var _style_icons_pipeline_16_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/icons/pipeline-16.svg */ "./style/icons/pipeline-16.svg");
/* harmony import */ var _style_icons_calendar_time_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/icons/calendar-time.svg */ "./style/icons/calendar-time.svg");
/* harmony import */ var _style_icons_number_123_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style/icons/number-123.svg */ "./style/icons/number-123.svg");
/* harmony import */ var _style_icons_decimal_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/icons/decimal.svg */ "./style/icons/decimal.svg");
/* harmony import */ var _style_icons_abc_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../style/icons/abc.svg */ "./style/icons/abc.svg");
/* harmony import */ var _style_icons_label_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../style/icons/label.svg */ "./style/icons/label.svg");










const labelIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:label-icon',
    svgstr: _style_icons_label_svg__WEBPACK_IMPORTED_MODULE_9__
});
const clockIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:clock-icon',
    svgstr: _style_icons_clock_16_svg__WEBPACK_IMPORTED_MODULE_1__
});
const pipelineIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:pipeline-console-icon',
    svgstr: _style_icons_pipeline_16_svg__WEBPACK_IMPORTED_MODULE_4__
});
const gridIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:grid-console-icon',
    svgstr: _style_icons_grid_16_svg__WEBPACK_IMPORTED_MODULE_2__
});
const cpuIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:cpu-icon',
    svgstr: _style_icons_cpu_16_svg__WEBPACK_IMPORTED_MODULE_3__
});
const dateTimeIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:date-time-icon',
    svgstr: _style_icons_calendar_time_svg__WEBPACK_IMPORTED_MODULE_5__
});
const numberIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:number-icon',
    svgstr: _style_icons_number_123_svg__WEBPACK_IMPORTED_MODULE_6__
});
const decimalIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:decimal-icon',
    svgstr: _style_icons_decimal_svg__WEBPACK_IMPORTED_MODULE_7__
});
const stringIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:string-icon',
    svgstr: _style_icons_abc_svg__WEBPACK_IMPORTED_MODULE_8__
});


/***/ },

/***/ "./lib/index.js"
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _amphi_pipeline_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @amphi/pipeline-editor */ "webpack/sharing/consume/default/@amphi/pipeline-editor");
/* harmony import */ var _amphi_pipeline_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_amphi_pipeline_editor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./handler */ "./lib/handler.js");
/* harmony import */ var _kernelconnector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./kernelconnector */ "./lib/kernelconnector.js");
/* harmony import */ var _logconsole__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./logconsole */ "./lib/logconsole.js");
/* harmony import */ var _manager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./manager */ "./lib/manager.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./tokens */ "./lib/tokens.js");
// index.ts












var CommandIDs;
(function (CommandIDs) {
    CommandIDs.open = 'pipeline-console:open';
})(CommandIDs || (CommandIDs = {}));
/**
 * A service providing variable introspection.
 */
const logsconsole = {
    id: '@amphi/pipeline-log-console:extension',
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ICommandPalette, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_1__.ILayoutRestorer, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_1__.ILabShell, _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4__.ISettingRegistry, _amphi_pipeline_editor__WEBPACK_IMPORTED_MODULE_5__.IPipelineTracker],
    provides: _tokens__WEBPACK_IMPORTED_MODULE_10__.IPipelineConsoleManager,
    autoStart: true,
    activate: (app, palette, restorer, labShell, settings, pipelines) => {
        const manager = new _manager__WEBPACK_IMPORTED_MODULE_9__.LogConsoleManager();
        const category = 'Pipeline Console';
        const command = CommandIDs.open;
        const label = 'Pipeline Console';
        const namespace = 'pipeline-console';
        const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.WidgetTracker({ namespace });
        let maxPreview = 80;
        function loadSetting(setting) {
            // Read the settings and convert to the correct type
            maxPreview = setting.get('maxPreview').composite;
            console.log(`Settings Example extension: maxPreview is set to '${maxPreview}'`);
        }
        Promise.all([app.restored, settings.load('@amphi/pipeline-log-console:extension')])
            .then(([, setting]) => {
            // Read the settings
            loadSetting(setting);
            // Listen for your plugin setting changes using Signal
            setting.changed.connect(loadSetting);
            /**
             * Create and track a new inspector.
             */
            function newPanel() {
                // Get the current widget from the lab shell
                const currentWidget = labShell.currentWidget;
                // Ensure the current widget is a pipeline and has a context
                if (!currentWidget || !pipelines.has(currentWidget)) {
                    console.warn('No active pipeline to provide context.');
                    return;
                }
                const pipelinePanel = currentWidget;
                const context = pipelinePanel.context;
                const panel = new _logconsole__WEBPACK_IMPORTED_MODULE_8__.PipelineConsolePanel(app, app.commands, context);
                panel.id = 'amphi-logConsole';
                panel.title.label = 'Pipeline Console';
                panel.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.listIcon;
                panel.title.closable = true;
                panel.disposed.connect(() => {
                    if (manager.panel === panel) {
                        manager.panel = null;
                    }
                });
                // Track the inspector panel
                tracker.add(panel);
                return panel;
            }
            // Add command to palette
            app.commands.addCommand(command, {
                label,
                execute: () => {
                    const metadataPanelId = 'amphi-metadataPanel'; // Using the provided log console panel ID
                    let metadataPanel = null;
                    // Iterate over each widget in the 'main' area to find the log console
                    for (const widget of app.shell.widgets('main')) {
                        if (widget.id === metadataPanelId) {
                            metadataPanel = widget;
                            break;
                        }
                    }
                    if (!manager.panel || manager.panel.isDisposed) {
                        manager.panel = newPanel();
                    }
                    // Check if the metadata panel is found and is attached
                    if (metadataPanel && metadataPanel.isAttached) {
                        // If log console panel is open, add the preview panel as a tab next to it
                        if (!manager.panel.isAttached) {
                            app.shell.add(manager.panel, 'main', { ref: metadataPanel.id, mode: 'tab-after' });
                        }
                    }
                    else {
                        // If log console panel is not open, open the preview panel in split-bottom mode
                        if (!manager.panel.isAttached) {
                            app.shell.add(manager.panel, 'main', { mode: 'split-bottom' });
                        }
                    }
                    app.shell.activateById(manager.panel.id);
                }
            });
            palette.addItem({ command, category });
            app.commands.addCommand('pipeline-console:clear', {
                execute: () => {
                    manager.panel.clearLogs();
                },
                label: 'Clear Console'
            });
            app.commands.addCommand('pipeline-console:settings', {
                execute: () => {
                },
                label: 'Console Settings'
            });
            app.contextMenu.addItem({
                command: 'pipeline-console:clear',
                selector: '.amphi-Console',
                rank: 1
            });
        })
            .catch(reason => {
            console.error(`Something went wrong when reading the settings.\n${reason}`);
        });
        // Enable state restoration
        restorer.restore(tracker, {
            command,
            args: () => ({}),
            name: () => 'amphi-logConsole'
        });
        console.log('JupyterLab extension @amphi/pipeline-log-console is activated!');
        return manager;
    }
};
/**
 * An extension that registers pipelines for variable inspection.
 */
const pipelines = {
    id: '@amphi/pipeline-log-console:pipelines',
    requires: [_tokens__WEBPACK_IMPORTED_MODULE_10__.IPipelineConsoleManager, _amphi_pipeline_editor__WEBPACK_IMPORTED_MODULE_5__.IPipelineTracker, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_1__.ILabShell],
    autoStart: true,
    activate: (app, manager, pipelines, labShell) => {
        const handlers = {};
        function formatLogDate(date) {
            const dateObj = new Date(date);
            return `${dateObj.toLocaleDateString()}\n${dateObj.toLocaleTimeString()}`;
        }
        /**
         * Subscribes to the creation of new pipelines. If a new pipeline is created, build a new handler for the pipelines.
         * Adds a promise for a instanced handler to the 'handlers' collection.
         */
        // Function that handles the type of data from the kernel that is displayed in the console and how
        pipelines.widgetAdded.connect((sender, pipelinePanel) => {
            if (manager.hasHandler(pipelinePanel.context.sessionContext.path)) {
                handlers[pipelinePanel.id] = new Promise(resolve => {
                    resolve(manager.getHandler(pipelinePanel.context.sessionContext.path));
                });
            }
            else {
                handlers[pipelinePanel.id] = new Promise(resolve => {
                    const session = pipelinePanel.context.sessionContext;
                    const connector = new _kernelconnector__WEBPACK_IMPORTED_MODULE_7__.KernelConnector({ session });
                    const options = {
                        connector,
                        id: session.path
                    };
                    const handler = new _handler__WEBPACK_IMPORTED_MODULE_6__.PipelineConsoleHandler(options);
                    manager.addHandler(handler);
                    pipelinePanel.disposed.connect(() => {
                        delete handlers[pipelinePanel.id];
                        handler.dispose();
                    });
                    handler.ready.then(() => {
                        resolve(handler);
                        connector.ready.then(async () => {
                            session.session.kernel.anyMessage.connect((sender, args) => {
                                var _a, _b, _c, _d;
                                if (!manager.panel)
                                    return;
                                if (args.direction !== 'recv')
                                    return;
                                const { msg } = args;
                                const type = msg.header.msg_type;
                                // Only render when we have HTML tables or images
                                if (type === 'execute_result' || type === 'display_data') {
                                    const content = msg.content;
                                    const data = content.data;
                                    // HTML tables or custom HTML blocks
                                    if (data['text/html']) {
                                        manager.panel.onNewLog(formatLogDate(msg.header.date), session.name, 'data', data['text/html'], content.metadata);
                                        return;
                                    }
                                    else if (data['image/png']) {
                                        const b64 = data['image/png'];
                                        const html = `<img alt="plot" style="max-width:100%;height:auto;" src="data:image/png;base64,${b64}" />`;
                                        manager.panel.onNewLog(formatLogDate(msg.header.date), session.name, 'rich', html, content.metadata);
                                        return;
                                    }
                                    if (data['image/svg+xml']) {
                                        const svgRaw = data['image/svg+xml'];
                                        const svg = typeof svgRaw === 'string' ? svgRaw : svgRaw.join('\n');
                                        manager.panel.onNewLog(formatLogDate(msg.header.date), session.name, 'rich', svg, content.metadata);
                                        return;
                                    }
                                    // Ignore text/plain or other mime types on purpose
                                    return;
                                }
                                if (type === 'stream') {
                                    const streamMsg = msg;
                                    const text = (_b = (_a = streamMsg.content) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : '';
                                    if (!text || text === '\n')
                                        return;
                                    const level = streamMsg.content.name === 'stderr' ? 'warning' : 'info';
                                    const html = `<div>${text.replace(/\n/g, '<br>')}</div>`;
                                    manager.panel.onNewLog(formatLogDate(msg.header.date), session.name, level, html, null);
                                    return;
                                }
                                // Still show errors with traceback
                                if (type === 'error') {
                                    const errorMsg = msg;
                                    const traceback = (_d = (_c = errorMsg.content.traceback) === null || _c === void 0 ? void 0 : _c.join('\n')) !== null && _d !== void 0 ? _d : '';
                                    const errorId = `traceback-${Date.now()}`;
                                    const errorContainer = document.createElement('div');
                                    const errorMessageText = `${errorMsg.content.evalue}`;
                                    errorContainer.innerHTML = `<pre><span>${errorMessageText}</span><br><a href="#" style="text-decoration: underline; color: grey;" id="link-${errorId}" onClick="document.getElementById('${errorId}').style.display = document.getElementById('${errorId}').style.display === 'none' ? 'block' : 'none'; return false;">Show Traceback</a></pre>`;
                                    const tracebackContainer = document.createElement('pre');
                                    tracebackContainer.id = errorId;
                                    tracebackContainer.style.display = 'none';
                                    errorContainer.appendChild(tracebackContainer);
                                    const options = {
                                        host: tracebackContainer,
                                        source: traceback,
                                        sanitizer: new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Sanitizer()
                                    };
                                    (0,_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__.renderText)(options).then(() => {
                                        const errorHTML = errorContainer.outerHTML;
                                        manager.panel.onNewLog(formatLogDate(errorMsg.header.date), session.name, 'error', errorHTML, null);
                                    });
                                }
                            });
                        });
                    });
                });
            }
            setSource(labShell);
        });
        const setSource = (sender, args) => {
            var _a;
            const widget = (_a = args === null || args === void 0 ? void 0 : args.newValue) !== null && _a !== void 0 ? _a : sender.currentWidget;
            if (!widget || !pipelines.has(widget)) {
                return;
            }
            const future = handlers[widget.id];
            future.then((source) => {
                if (source) {
                    manager.source = source;
                    // manager.source.performInspection();
                }
            });
        };
        /**
         * If focus window changes, checks whether new focus widget is a console.
         * In that case, retrieves the handler associated to the console after it has been
         * initialized and updates the manager with it.
         */
        setSource(labShell);
        labShell.currentChanged.connect(setSource);
    }
};
/**
 * Export the plugins as default.
 */
const plugins = [
    logsconsole,
    pipelines
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);


/***/ },

/***/ "./lib/kernelconnector.js"
/*!********************************!*\
  !*** ./lib/kernelconnector.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KernelConnector: () => (/* binding */ KernelConnector)
/* harmony export */ });
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Connector class that handles execute request to a kernel
 */
class KernelConnector {
    constructor(options) {
        this._kernelRestarted = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal(this);
        this._session = options.session;
        this._session.statusChanged.connect((sender, newStatus) => {
            switch (newStatus) {
                case 'restarting':
                    this._kernelRestarted.emit(this._session.ready);
                    break;
                case 'autorestarting':
                    this._kernelRestarted.emit(this._session.ready);
                    break;
                default:
                    break;
            }
        });
    }
    get kernelRestarted() {
        return this._kernelRestarted;
    }
    get kernelLanguage() {
        var _a;
        if (!((_a = this._session.session) === null || _a === void 0 ? void 0 : _a.kernel)) {
            return Promise.resolve('');
        }
        return this._session.session.kernel.info.then(infoReply => {
            return infoReply.language_info.name;
        });
    }
    get kernelName() {
        return this._session.kernelDisplayName;
    }
    /**
     *  A Promise that is fulfilled when the session associated w/ the connector is ready.
     */
    get ready() {
        return this._session.ready;
    }
    /**
     *  A signal emitted for iopub messages of the kernel associated with the kernel.
     */
    get iopubMessage() {
        return this._session.iopubMessage;
    }
    execute(content) {
        var _a;
        if (!((_a = this._session.session) === null || _a === void 0 ? void 0 : _a.kernel)) {
            throw new Error('No session available.');
        }
        return this._session.session.kernel.requestExecute(content);
    }
}


/***/ },

/***/ "./lib/logconsole.js"
/*!***************************!*\
  !*** ./lib/logconsole.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PipelineConsolePanel: () => (/* binding */ PipelineConsolePanel)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "webpack/sharing/consume/default/react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DataView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DataView */ "./lib/DataView.js");
/* harmony import */ var _DocumentView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DocumentView */ "./lib/DocumentView.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd */ "../../node_modules/antd/es/alert/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! antd */ "../../node_modules/antd/es/divider/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! antd */ "../../node_modules/antd/es/tag/index.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./icons */ "./lib/icons.js");
// logconsole.tsx







const TITLE_CLASS = 'amphi-Console-title';
const PANEL_CLASS = 'amphi-Console';
const TABLE_CLASS = 'amphi-Console-table';
const TABLE_BODY_CLASS = 'amphi-Console-content';
const TABLE_ROW_CLASS = 'amphi-Console-table-row';
const SINGLE_COLUMN_CLASS = 'amphi-Console-single-column'; // New class for single column
/**
 * A panel that renders the pipeline logs
 */
class PipelineConsolePanel extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor(app, commands, context) {
        super();
        this._source = null;
        this._unbind = null;
        this._app = app;
        this._commands = commands;
        this._context = context;
        this.addClass(PANEL_CLASS);
        const portalDiv = document.createElement('div');
        portalDiv.id = 'portal';
        portalDiv.style.position = 'absolute';
        portalDiv.style.left = '0';
        portalDiv.style.top = '0';
        portalDiv.style.width = '100%';
        portalDiv.style.height = '100%';
        portalDiv.style.zIndex = '9999';
        this._title = Private.createTitle();
        this._title.className = TITLE_CLASS;
        this._console = Private.createConsole();
        this._console.className = TABLE_CLASS;
        portalDiv.appendChild(this._title);
        portalDiv.appendChild(this._console);
        this.node.appendChild(portalDiv);
    }
    onAfterAttach(msg) {
        super.onAfterAttach(msg);
        const stop = (e) => e.stopPropagation();
        // Allow copy if there's a text selection in the console
        const handleCopy = (e) => {
            const selection = window.getSelection();
            if (selection && selection.toString().length > 0) {
                // There's a text selection, allow the copy event to proceed
                return;
            }
            // No selection, stop propagation to prevent conflict with visual editor
            e.stopPropagation();
        };
        // capture phase so it wins over higher-level listeners
        this.node.addEventListener('keydown', stop, true);
        this.node.addEventListener('copy', handleCopy, true);
        this.node.addEventListener('paste', stop, true);
        this._unbind = () => {
            this.node.removeEventListener('keydown', stop, true);
            this.node.removeEventListener('copy', handleCopy, true);
            this.node.removeEventListener('paste', stop, true);
        };
    }
    onBeforeDetach(msg) {
        if (this._unbind) {
            this._unbind();
            this._unbind = null;
        }
        super.onBeforeDetach(msg);
    }
    get source() {
        return this._source;
    }
    set source(source) {
        if (this._source === source) {
            return;
        }
        // Remove old subscriptions
        if (this._source) {
            this._source.disposed.disconnect(this.onSourceDisposed, this);
        }
        this._source = source;
        // Subscribe to new object
        if (this._source) {
            this._source.disposed.connect(this.onSourceDisposed, this);
        }
    }
    /**
     * Dispose resources
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this.source = null;
        super.dispose();
    }
    onNewLog(date, pipelineName, level, content, metadata) {
        if (!this.isAttached) {
            return;
        }
        // Ensure the table footer exists
        if (!this._console.tFoot) {
            this._console.createTFoot();
            this._console.tFoot.className = TABLE_BODY_CLASS;
        }
        // Insert a new row at the beginning of the table footer
        let row = this._console.tFoot.insertRow(0);
        row.className = `${TABLE_ROW_CLASS} ${SINGLE_COLUMN_CLASS}`; // Add single column class
        // Add a single cell to the new row
        let singleCell = row.insertCell(0);
        singleCell.style.padding = "5px";
        singleCell.className = SINGLE_COLUMN_CLASS;
        let dateTag;
        let pipelineNameTag = react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_7__["default"], { bordered: false, icon: react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_8__.pipelineIcon.react, { className: "anticon amphi-Console-icon-size" }), style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, pipelineName);
        let dataframeSizeTag = null;
        let dfNameTag = null;
        let runtimeTag = null;
        let contentComponent;
        let viewData = null;
        switch (level) {
            case "info":
                dateTag = react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_7__["default"], { bordered: false, icon: react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_8__.clockIcon.react, { className: "anticon" }), style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, date);
                contentComponent = (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__["default"], { showIcon: true, banner: true, message: react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { dangerouslySetInnerHTML: { __html: content } }), type: /SUCCESS/i.test(content) ? "success" : /ERROR|WARNING/i.test(content) ? "warning" : "info" }));
                break;
            case "error":
                dateTag = react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_7__["default"], { bordered: false, icon: react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_8__.clockIcon.react, { className: "anticon amphi-Console-icon-size" }), style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, date);
                contentComponent = (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__["default"], { message: "Error", banner: true, showIcon: true, description: react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { dangerouslySetInnerHTML: { __html: content.replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;') } }), type: "error" }));
                break;
            case "warning":
                dateTag = react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_7__["default"], { bordered: false, icon: react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_8__.clockIcon.react, { className: "anticon amphi-Console-icon-size" }), style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, date);
                // Extract just the warning message, removing file path and warning type
                let warningMessage = content;
                // Try to extract text after "UserWarning:" or similar warning types
                const typeMatch = content.match(/:\s*(\w+Warning|Warning):\s*(.+?)(?:\s*warnings\.warn\(|$)/s);
                if (typeMatch) {
                    warningMessage = typeMatch[2].trim();
                }
                contentComponent = (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__["default"], { message: "Warning", banner: true, showIcon: true, description: react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { dangerouslySetInnerHTML: { __html: warningMessage.replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;') } }), type: "warning" }));
                break;
            case "data":
                dateTag = react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_7__["default"], { bordered: false, icon: react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_8__.clockIcon.react, { className: "anticon amphi-Console-icon-size" }), style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, date);
                dfNameTag = react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_7__["default"], { bordered: false, icon: react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_8__.labelIcon.react, { className: "anticon amphi-Console-icon-size" }), style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, metadata.dfName);
                runtimeTag = react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_7__["default"], { bordered: false, icon: react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_8__.cpuIcon.react, { className: "anticon amphi-Console-icon-size" }), style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, metadata.runtime);
                viewData = (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_7__["default"], { bordered: false, onClick: () => this._commands.execute('pipeline-editor-component:view-data', { nodeId: metadata.nodeId, context: this._context }), icon: react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_8__.clockIcon.react, { className: "anticon amphi-Console-icon-size" }), color: "#44776D", style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, "View data"));
                const parser = new DOMParser();
                const doc = parser.parseFromString(content, 'text/html');
                console.log(doc);
                const firstDiv = doc.querySelector('div');
                if (firstDiv && firstDiv.id === 'documents') {
                    contentComponent = react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_DocumentView__WEBPACK_IMPORTED_MODULE_4__["default"], { htmlData: content });
                }
                else {
                    // Extract dataframe size from the last paragraph if it exists
                    const sizeElement = doc.querySelector('p:last-of-type');
                    let dataframeSize = null;
                    if (sizeElement && sizeElement.textContent.includes('rows ×')) {
                        dataframeSize = sizeElement.textContent.trim();
                    }
                    else {
                        // If no size paragraph found, calculate from the HTML table
                        const table = doc.querySelector('table');
                        if (table) {
                            const tbody = table.querySelector('tbody');
                            const thead = table.querySelector('thead');
                            if (tbody && thead) {
                                const numRows = tbody.querySelectorAll('tr').length;
                                const headerRow = thead.querySelector('tr');
                                // Subtract 1 to exclude the index column
                                const numCols = headerRow ? headerRow.querySelectorAll('th').length - 1 : 0;
                                dataframeSize = `${numRows} rows × ${numCols} columns`;
                            }
                        }
                    }
                    if (dataframeSize) {
                        dataframeSizeTag = react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_7__["default"], { bordered: false, icon: react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_8__.gridIcon.react, { className: "anticon amphi-Console-icon-size" }), style: { whiteSpace: 'normal', wordWrap: 'break-word' } }, dataframeSize);
                    }
                    contentComponent = (react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null,
                        react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_DataView__WEBPACK_IMPORTED_MODULE_3__["default"], { htmlData: content })));
                }
                break;
            case 'rich':
                dateTag = react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_7__["default"], { bordered: false, icon: react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_8__.clockIcon.react, { className: "anticon amphi-Console-icon-size" }) }, date);
                contentComponent = react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { dangerouslySetInnerHTML: { __html: content } });
                break;
            default:
                dateTag = react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_7__["default"], { bordered: false }, date);
                contentComponent = react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, content);
        }
        // Render tags and content inside the single cell
        react_dom__WEBPACK_IMPORTED_MODULE_2___default().render(react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0px', marginBottom: '2px', overflow: 'hidden', textOverflow: 'clip' } },
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 } },
                    dateTag,
                    pipelineNameTag,
                    dfNameTag,
                    dataframeSizeTag,
                    runtimeTag),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null)),
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, contentComponent),
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_6__["default"], { style: { margin: '6px 0' } })), singleCell);
        // Scroll to the top
        this._console.parentElement.scrollTop = 0;
    }
    clearLogs() {
        // Check if table footer exists and remove all its rows
        if (this._console.tFoot) {
            while (this._console.tFoot.rows.length > 0) {
                this._console.tFoot.deleteRow(0);
            }
        }
    }
    /**
     * Handle source disposed signals.
     */
    onSourceDisposed(sender, args) {
        this.source = null;
    }
}
var Private;
(function (Private) {
    const entityMap = new Map(Object.entries({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
    }));
    function escapeHtml(source) {
        return String(source).replace(/[&<>"'/]/g, (s) => entityMap.get(s));
    }
    Private.escapeHtml = escapeHtml;
    function createConsole() {
        const table = document.createElement('table');
        return table;
    }
    Private.createConsole = createConsole;
    function createTitle(header = '') {
        const title = document.createElement('p');
        title.innerHTML = header;
        return title;
    }
    Private.createTitle = createTitle;
})(Private || (Private = {}));


/***/ },

/***/ "./lib/manager.js"
/*!************************!*\
  !*** ./lib/manager.js ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogConsoleManager: () => (/* binding */ LogConsoleManager)
/* harmony export */ });
/**
 * A class that manages variable inspector widget instances and offers persistent
 * `IMetadataPanel` instance that other plugins can communicate with.
 */
class LogConsoleManager {
    constructor() {
        this._source = null;
        this._panel = null;
        this._handlers = {};
    }
    hasHandler(id) {
        if (this._handlers[id]) {
            return true;
        }
        else {
            return false;
        }
    }
    getHandler(id) {
        return this._handlers[id];
    }
    addHandler(handler) {
        this._handlers[handler.id] = handler;
    }
    /**
     * The current console panel.
     */
    get panel() {
        return this._panel;
    }
    set panel(panel) {
        if (this.panel === panel) {
            return;
        }
        this._panel = panel;
        if (panel && !panel.source) {
            panel.source = this._source;
        }
    }
    /**
     * The source of events the inspector panel listens for.
     */
    get source() {
        return this._source;
    }
    set source(source) {
        if (this._source === source) {
            return;
        }
        // remove subscriptions
        if (this._source) {
            this._source.disposed.disconnect(this._onSourceDisposed, this);
        }
        this._source = source;
        if (this._panel && !this._panel.isDisposed) {
            this._panel.source = this._source;
        }
        // Subscribe to new source
        if (this._source) {
            this._source.disposed.connect(this._onSourceDisposed, this);
        }
    }
    _onSourceDisposed() {
        this._source = null;
    }
}


/***/ },

/***/ "./lib/tokens.js"
/*!***********************!*\
  !*** ./lib/tokens.js ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IPipelineConsole: () => (/* binding */ IPipelineConsole),
/* harmony export */   IPipelineConsoleManager: () => (/* binding */ IPipelineConsoleManager)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);

const IPipelineConsoleManager = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('jupyterlab_extension/logconsole:IPipelineConsoleManager');
/**
 * The inspector panel token.
 */
const IPipelineConsole = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('jupyterlab_extension/logconsole:IPipelineConsole');


/***/ },

/***/ "./style/icons/abc.svg"
/*!*****************************!*\
  !*** ./style/icons/abc.svg ***!
  \*****************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-abc\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M3 16v-6a2 2 0 1 1 4 0v6\" /><path d=\"M3 13h4\" /><path d=\"M10 8v6a2 2 0 1 0 4 0v-1a2 2 0 1 0 -4 0v1\" /><path d=\"M20.732 12a2 2 0 0 0 -3.732 1v1a2 2 0 0 0 3.726 1.01\" /></svg>";

/***/ },

/***/ "./style/icons/calendar-time.svg"
/*!***************************************!*\
  !*** ./style/icons/calendar-time.svg ***!
  \***************************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-calendar-time\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4\" /><path d=\"M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0\" /><path d=\"M15 3v4\" /><path d=\"M7 3v4\" /><path d=\"M3 11h16\" /><path d=\"M18 16.496v1.504l1 1\" /></svg>";

/***/ },

/***/ "./style/icons/clock-16.svg"
/*!**********************************!*\
  !*** ./style/icons/clock-16.svg ***!
  \**********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><g fill=\"currentColor\"><path d=\"M8.5 3.75a.75.75 0 00-1.5 0V8c0 .284.16.544.415.67l2.5 1.25a.75.75 0 10.67-1.34L8.5 7.535V3.75z\"/><path fill-rule=\"evenodd\" d=\"M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z\" clip-rule=\"evenodd\"/></g></svg>";

/***/ },

/***/ "./style/icons/cpu-16.svg"
/*!********************************!*\
  !*** ./style/icons/cpu-16.svg ***!
  \********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><g fill=\"currentColor\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"><path d=\"M6.25 5C5.56 5 5 5.56 5 6.25v3.5c0 .69.56 1.25 1.25 1.25h3.5c.69 0 1.25-.56 1.25-1.25v-3.5C11 5.56 10.44 5 9.75 5h-3.5zm.25 4.5v-3h3v3h-3z\"/><path d=\"M6.25.05a.7.7 0 01.7.7V2h2.1V.75a.7.7 0 111.4 0V2h1.3A2.25 2.25 0 0114 4.25v1.3h1.25a.7.7 0 110 1.4H14v2.1h1.25a.7.7 0 110 1.4H14v1.3A2.25 2.25 0 0111.75 14h-1.3v1.25a.7.7 0 11-1.4 0V14h-2.1v1.25a.7.7 0 11-1.4 0V14h-1.3A2.25 2.25 0 012 11.75v-1.3H.75a.7.7 0 110-1.4H2v-2.1H.75a.7.7 0 110-1.4H2v-1.3A2.25 2.25 0 014.25 2h1.3V.75a.7.7 0 01.7-.7zM3.5 4.25a.75.75 0 01.75-.75h7.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75v-7.5z\"/></g></svg>";

/***/ },

/***/ "./style/icons/decimal.svg"
/*!*********************************!*\
  !*** ./style/icons/decimal.svg ***!
  \*********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-decimal\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M17 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2z\" /><path d=\"M10 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2z\" /><path d=\"M5 16h.01\" /></svg>";

/***/ },

/***/ "./style/icons/grid-16.svg"
/*!*********************************!*\
  !*** ./style/icons/grid-16.svg ***!
  \*********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><g fill=\"currentColor\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"><path d=\"M2.25 1C1.56 1 1 1.56 1 2.25v3.5C1 6.44 1.56 7 2.25 7h3.5C6.44 7 7 6.44 7 5.75v-3.5C7 1.56 6.44 1 5.75 1h-3.5zm.25 4.5v-3h3v3h-3zM10.25 1C9.56 1 9 1.56 9 2.25v3.5C9 6.44 9.56 7 10.25 7h3.5C14.44 7 15 6.44 15 5.75v-3.5C15 1.56 14.44 1 13.75 1h-3.5zm.25 4.5v-3h3v3h-3zM9 10.25C9 9.56 9.56 9 10.25 9h3.5c.69 0 1.25.56 1.25 1.25v3.5c0 .69-.56 1.25-1.25 1.25h-3.5C9.56 15 9 14.44 9 13.75v-3.5zm1.5.25v3h3v-3h-3zM2.25 9C1.56 9 1 9.56 1 10.25v3.5c0 .69.56 1.25 1.25 1.25h3.5C6.44 15 7 14.44 7 13.75v-3.5C7 9.56 6.44 9 5.75 9h-3.5zm.25 4.5v-3h3v3h-3z\"/></g></svg>";

/***/ },

/***/ "./style/icons/label.svg"
/*!*******************************!*\
  !*** ./style/icons/label.svg ***!
  \*******************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><g fill=\"currentColor\"><path d=\"M5 4a1 1 0 000 2h.006a1 1 0 000-2H5z\"/><path fill-rule=\"evenodd\" d=\"M2.25 1C1.56 1 1 1.56 1 2.25v5.246c0 .596.237 1.169.659 1.59l5.383 5.384a2.25 2.25 0 003.182 0l4.246-4.246a2.25 2.25 0 000-3.182L9.087 1.66A2.25 2.25 0 007.496 1H2.25zm.25 6.496V2.5h4.996a.75.75 0 01.53.22l5.383 5.383a.75.75 0 010 1.06L9.163 13.41a.75.75 0 01-1.06 0L2.72 8.026a.75.75 0 01-.22-.53z\" clip-rule=\"evenodd\"/></g></svg>";

/***/ },

/***/ "./style/icons/number-123.svg"
/*!************************************!*\
  !*** ./style/icons/number-123.svg ***!
  \************************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-number-123\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M3 10l2 -2v8\" /><path d=\"M9 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h3\" /><path d=\"M17 8h2.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1 -1.5 1.5h-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1 -1.5 1.5h-2.5\" /></svg>";

/***/ },

/***/ "./style/icons/pipeline-16.svg"
/*!*************************************!*\
  !*** ./style/icons/pipeline-16.svg ***!
  \*************************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<svg\r\n   width=\"16\"\r\n   height=\"16\"\r\n   fill=\"none\"\r\n   viewBox=\"0 0 16 16\"\r\n   version=\"1.1\"\r\n   id=\"svg1\"\r\n   sodipodi:docname=\"pipeline-16.svg\"\r\n   inkscape:version=\"1.3 (0e150ed, 2023-07-21)\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\">\r\n  <defs\r\n     id=\"defs1\" />\r\n  <sodipodi:namedview\r\n     id=\"namedview1\"\r\n     pagecolor=\"#505050\"\r\n     bordercolor=\"#eeeeee\"\r\n     borderopacity=\"1\"\r\n     inkscape:showpageshadow=\"0\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pagecheckerboard=\"0\"\r\n     inkscape:deskcolor=\"#505050\"\r\n     inkscape:zoom=\"14.75\"\r\n     inkscape:cx=\"8\"\r\n     inkscape:cy=\"8\"\r\n     inkscape:window-width=\"1312\"\r\n     inkscape:window-height=\"449\"\r\n     inkscape:window-x=\"0\"\r\n     inkscape:window-y=\"639\"\r\n     inkscape:window-maximized=\"0\"\r\n     inkscape:current-layer=\"svg1\" />\r\n  <path\r\n     fill=\"currentColor\"\r\n     fill-rule=\"evenodd\"\r\n     d=\"M2.75 2.5A1.75 1.75 0 001 4.25v1C1 6.216 1.784 7 2.75 7h1a1.75 1.75 0 001.732-1.5H6.5a.75.75 0 01.75.75v3.5A2.25 2.25 0 009.5 12h1.018c.121.848.85 1.5 1.732 1.5h1A1.75 1.75 0 0015 11.75v-1A1.75 1.75 0 0013.25 9h-1a1.75 1.75 0 00-1.732 1.5H9.5a.75.75 0 01-.75-.75v-3.5A2.25 2.25 0 006.5 4H5.482A1.75 1.75 0 003.75 2.5h-1zM2.5 4.25A.25.25 0 012.75 4h1a.25.25 0 01.25.25v1a.25.25 0 01-.25.25h-1a.25.25 0 01-.25-.25v-1zm9.75 6.25a.25.25 0 00-.25.25v1c0 .138.112.25.25.25h1a.25.25 0 00.25-.25v-1a.25.25 0 00-.25-.25h-1z\"\r\n     clip-rule=\"evenodd\"\r\n     id=\"path1\"\r\n     style=\"fill:#000000;fill-opacity:1\" />\r\n</svg>\r\n";

/***/ }

}]);
//# sourceMappingURL=lib_index_js.147cb77ed1bff02fab46.js.map