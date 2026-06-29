"use strict";
(self["webpackChunk_amphi_pipeline_editor"] = self["webpackChunk_amphi_pipeline_editor"] || []).push([["lib_index_js"],{

/***/ "./lib/AboutDialog.js"
/*!****************************!*\
  !*** ./lib/AboutDialog.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAboutDialog: () => (/* binding */ createAboutDialog)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function createAboutDialog(versionNumber) {
    const versionInfo = (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "jp-About-version-info" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "jp-About-version" },
            "v",
            versionNumber)));
    const title = (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "jp-About-header" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", { src: "https://amphi.ai/icons/amphi_logo_paths.svg", alt: "Amphi Logo", className: "amphi-logo", style: { height: '24px', marginRight: '10px', verticalAlign: 'middle' } }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "jp-About-header-info", style: { display: 'inline-block', textAlign: 'center' } }, versionInfo)));
    const websiteURL = 'https://amphi.ai';
    const githubURL = 'https://github.com/amphi-ai/amphi-etl';
    const externalLinks = (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "jp-About-externalLinks" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: websiteURL, target: "_blank", rel: "noopener noreferrer", className: "jp-Button-flat" }, "WEBSITE"),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: githubURL, target: "_blank", rel: "noopener noreferrer", className: "jp-Button-flat" }, "GITHUB")));
    const copyright = (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "jp-About-copyright" }, "\u00A9 2024-2026 Amphi"));
    const body = (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "jp-About-body" },
        externalLinks,
        copyright));
    return { title, body };
}


/***/ },

/***/ "./lib/CodeEditor.js"
/*!***************************!*\
  !*** ./lib/CodeEditor.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_ace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-ace */ "../../node_modules/react-ace/lib/index.js");



const handleAceLoad = (editor) => {
    const stop = (e) => e.stopPropagation();
    const el = editor.container;
    // Use capture so we intercept before parents
    el.addEventListener('keydown', stop, true);
    el.addEventListener('keypress', stop, true);
    el.addEventListener('keyup', stop, true);
    // Clean up when the editor is destroyed
    editor.on('destroy', () => {
        el.removeEventListener('keydown', stop, true);
        el.removeEventListener('keypress', stop, true);
        el.removeEventListener('keyup', stop, true);
    });
};
const CodeEditor = ({ code }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_ace__WEBPACK_IMPORTED_MODULE_1__["default"], { width: '100%%', height: '100%', mode: "python", theme: "xcode", name: "Code Export", fontSize: 14, lineHeight: 19, showPrintMargin: true, showGutter: true, highlightActiveLine: true, onLoad: handleAceLoad, value: code, setOptions: {
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
    } }));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CodeEditor);


/***/ },

/***/ "./lib/Commands.js"
/*!*************************!*\
  !*** ./lib/Commands.js ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useCopyPaste: () => (/* binding */ useCopyPaste),
/* harmony export */   useUndoRedo: () => (/* binding */ useUndoRedo)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactflow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactflow */ "webpack/sharing/consume/default/reactflow/reactflow");


const Format = "application/react-flow-format";
function isEditingTextTarget(el) {
    if (!el)
        return false;
    if (el.closest('.ace_editor, .ace_text-input'))
        return true;
    if (el.closest('input, textarea, [contenteditable="true"], [role="textbox"]'))
        return true;
    if (el.isContentEditable)
        return true;
    return false;
}
function useCopyPaste() {
    const mousePosRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({ x: 0, y: 0 });
    const rfDomNode = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.useStore)((state) => state.domNode);
    const { getNodes, setNodes, getEdges, setEdges, screenToFlowPosition } = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.useReactFlow)();
    const [bufferedNodes, setBufferedNodes] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [bufferedEdges, setBufferedEdges] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const events = ['cut', 'copy', 'paste'];
        if (rfDomNode) {
            const onMouseMove = (event) => {
                mousePosRef.current = {
                    x: event.clientX,
                    y: event.clientY,
                };
            };
            rfDomNode.addEventListener('mousemove', onMouseMove);
            return () => {
                rfDomNode.removeEventListener('mousemove', onMouseMove);
            };
        }
    }, [rfDomNode]);
    const copy = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
        const selectedNodes = getNodes().filter((node) => node.selected);
        const selectedEdges = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.getConnectedEdges)(selectedNodes, getEdges()).filter((edge) => {
            const isExternalSource = selectedNodes.every((n) => n.id !== edge.source);
            const isExternalTarget = selectedNodes.every((n) => n.id !== edge.target);
            return !(isExternalSource || isExternalTarget);
        });
        const data = JSON.stringify({
            type: 'nodes-and-edges',
            nodes: selectedNodes,
            edges: selectedEdges,
        });
        navigator.clipboard.writeText(data);
    }, [getNodes, getEdges]);
    const cut = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
        const selectedNodes = getNodes().filter((node) => node.selected);
        const selectedEdges = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.getConnectedEdges)(selectedNodes, getEdges()).filter((edge) => {
            const isExternalSource = selectedNodes.every((n) => n.id !== edge.source);
            const isExternalTarget = selectedNodes.every((n) => n.id !== edge.target);
            return !(isExternalSource || isExternalTarget);
        });
        const data = JSON.stringify({
            type: 'nodes-and-edges',
            nodes: selectedNodes,
            edges: selectedEdges,
        });
        navigator.clipboard.writeText(data);
        setNodes((nodes) => nodes.filter((node) => !node.selected));
        setEdges((edges) => edges.filter((edge) => !selectedEdges.includes(edge)));
    }, [getNodes, setNodes, getEdges, setEdges]);
    const paste = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
        const pastePos = screenToFlowPosition({
            x: mousePosRef.current.x,
            y: mousePosRef.current.y,
        });
        try {
            const text = await navigator.clipboard.readText();
            let parsedData;
            try {
                parsedData = JSON.parse(text);
            }
            catch (jsonError) {
                // If JSON parsing fails, it means it's plain text
                parsedData = null;
            }
            if (parsedData && parsedData.type === 'nodes-and-edges') {
                const { nodes: bufferedNodes, edges: bufferedEdges } = parsedData;
                const minX = Math.min(...bufferedNodes.map((s) => s.position.x));
                const minY = Math.min(...bufferedNodes.map((s) => s.position.y));
                const now = Date.now();
                const newNodes = bufferedNodes.map((node) => {
                    const id = `${node.id}-${now}`;
                    const x = pastePos.x + (node.position.x - minX);
                    const y = pastePos.y + (node.position.y - minY);
                    return { ...node, id, position: { x, y } };
                });
                const newEdges = bufferedEdges.map((edge) => {
                    const id = `${edge.id}-${now}`;
                    const source = `${edge.source}-${now}`;
                    const target = `${edge.target}-${now}`;
                    return { ...edge, id, source, target };
                });
                setNodes((nodes) => [
                    ...nodes.map((node) => ({ ...node, selected: false })),
                    ...newNodes,
                ]);
                setEdges((edges) => [
                    ...edges.map((edge) => ({ ...edge, selected: false })),
                    ...newEdges,
                ]);
            }
            else if (!parsedData) {
                // Handle plain text paste
                const activeElement = document.activeElement;
                if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
                    activeElement.value += text;
                    // Manually trigger input event to ensure React picks up the change
                    const event = new Event('input', { bubbles: true });
                    activeElement.dispatchEvent(event);
                }
                else {
                }
            }
            else {
                // Fallback to normal text paste if it's not nodes and edges
            }
        }
        catch (error) {
            console.error("Failed to read clipboard contents: ", error);
        }
    }, [screenToFlowPosition, setNodes, setEdges]);
    useShortcut(['Meta+x', 'Control+x'], cut);
    useShortcut(['Meta+c', 'Control+c'], copy);
    useShortcut(['Meta+v', 'Control+v'], paste);
    return { cut, copy, paste, bufferedNodes, bufferedEdges };
}
function useShortcut(keyCode, callback) {
    const [didRun, setDidRun] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const shouldRun = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.useKeyPress)(keyCode);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (shouldRun && !didRun) {
            callback();
            setDidRun(true);
        }
        else {
            setDidRun(shouldRun);
        }
    }, [shouldRun, didRun, callback]);
}
const defaultOptions = {
    maxHistorySize: 100,
    enableShortcuts: true,
};
// https://redux.js.org/usage/implementing-undo-history
const useUndoRedo = ({ maxHistorySize = defaultOptions.maxHistorySize, enableShortcuts = defaultOptions.enableShortcuts, } = defaultOptions) => {
    // the past and future arrays store the states that we can jump to
    const [past, setPast] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [future, setFuture] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const { setNodes, setEdges, getNodes, getEdges } = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.useReactFlow)();
    const takeSnapshot = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
        // push the current graph to the past state
        setPast((past) => [
            ...past.slice(past.length - maxHistorySize + 1, past.length),
            { nodes: getNodes(), edges: getEdges() },
        ]);
        // whenever we take a new snapshot, the redo operations need to be cleared to avoid state mismatches
        setFuture([]);
    }, [getNodes, getEdges, maxHistorySize]);
    const undo = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
        // get the last state that we want to go back to
        const pastState = past[past.length - 1];
        if (pastState) {
            // first we remove the state from the history
            setPast((past) => past.slice(0, past.length - 1));
            // we store the current graph for the redo operation
            setFuture((future) => [
                ...future,
                { nodes: getNodes(), edges: getEdges() },
            ]);
            // now we can set the graph to the past state
            setNodes(pastState.nodes);
            setEdges(pastState.edges);
        }
    }, [setNodes, setEdges, getNodes, getEdges, past]);
    const redo = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
        const futureState = future[future.length - 1];
        if (futureState) {
            setFuture((future) => future.slice(0, future.length - 1));
            setPast((past) => [...past, { nodes: getNodes(), edges: getEdges() }]);
            setNodes(futureState.nodes);
            setEdges(futureState.edges);
        }
    }, [setNodes, setEdges, getNodes, getEdges, future]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        // this effect is used to attach the global event handlers
        if (!enableShortcuts) {
            return;
        }
        const keyDownHandler = (event) => {
            if (isEditingTextTarget(event.target)) {
                return;
            }
            if (event.key === 'z' &&
                (event.ctrlKey || event.metaKey) &&
                event.shiftKey) {
                redo();
            }
            else if (event.key === 'z' && (event.ctrlKey || event.metaKey)) {
                undo();
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [undo, redo, enableShortcuts]);
    return {
        undo,
        redo,
        takeSnapshot,
        canUndo: !past.length,
        canRedo: !future.length,
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ useUndoRedo, useCopyPaste });


/***/ },

/***/ "./lib/Dropzone.js"
/*!*************************!*\
  !*** ./lib/Dropzone.js ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dropzone: () => (/* binding */ Dropzone),
/* harmony export */   useDropzone: () => (/* binding */ useDropzone)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useDropzone = (props) => {
    const rootRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const handleEvent = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((e) => {
        var _a, _b, _c, _d;
        e.preventDefault();
        e.stopPropagation();
        switch (e.type) {
            case 'lm-dragenter':
                (_a = props.onDragEnter) === null || _a === void 0 ? void 0 : _a.call(props, e);
                break;
            case 'lm-dragleave':
                (_b = props.onDragLeave) === null || _b === void 0 ? void 0 : _b.call(props, e);
                break;
            case 'lm-dragover':
                e.dropAction = e.proposedAction;
                (_c = props.onDragOver) === null || _c === void 0 ? void 0 : _c.call(props, e);
                break;
            case 'lm-drop':
                (_d = props.onDrop) === null || _d === void 0 ? void 0 : _d.call(props, e);
                break;
        }
    }, [props]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const node = rootRef.current;
        node === null || node === void 0 ? void 0 : node.addEventListener('lm-dragenter', handleEvent);
        node === null || node === void 0 ? void 0 : node.addEventListener('lm-dragleave', handleEvent);
        node === null || node === void 0 ? void 0 : node.addEventListener('lm-dragover', handleEvent);
        node === null || node === void 0 ? void 0 : node.addEventListener('lm-drop', handleEvent);
        return () => {
            node === null || node === void 0 ? void 0 : node.removeEventListener('lm-dragenter', handleEvent);
            node === null || node === void 0 ? void 0 : node.removeEventListener('lm-dragleave', handleEvent);
            node === null || node === void 0 ? void 0 : node.removeEventListener('lm-dragover', handleEvent);
            node === null || node === void 0 ? void 0 : node.removeEventListener('lm-drop', handleEvent);
        };
    }, [handleEvent]);
    return {
        getRootProps: () => ({
            ref: rootRef,
        }),
    };
};
const Dropzone = ({ children, ...rest }) => {
    const { getRootProps } = useDropzone(rest);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { height: '100%' }, ...getRootProps() }, children));
};


/***/ },

/***/ "./lib/ErrorModal.js"
/*!***************************!*\
  !*** ./lib/ErrorModal.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showErrorModal: () => (/* binding */ showErrorModal)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "webpack/sharing/consume/default/react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");



/**
 * Shows an error modal with detailed error information
 * @param error - The error object to display
 * @param context - Context about what operation failed
 */
function showErrorModal(error, context) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    function ErrorModal() {
        const handleClose = () => {
            react_dom__WEBPACK_IMPORTED_MODULE_1___default().unmountComponentAtNode(container);
            container.remove();
        };
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.ConfigProvider, { theme: { token: { colorPrimary: '#5F9B97' } } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, { title: "Code Generation Failed", visible: true, footer: [
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Button, { key: "close", type: "primary", onClick: handleClose }, "Close")
                ], width: "60%", onCancel: handleClose },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { marginBottom: '16px' } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Context:"),
                    " ",
                    context),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { marginBottom: '16px' } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Error Message:")),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: {
                        padding: '12px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                    } }, error.message),
                error.stack && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { marginTop: '16px', marginBottom: '8px' } },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("strong", null, "Stack Trace:")),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: {
                            padding: '12px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            fontSize: '11px',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            maxHeight: '200px',
                            overflow: 'auto'
                        } }, error.stack))))));
    }
    react_dom__WEBPACK_IMPORTED_MODULE_1___default().render(react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ErrorModal, null), container);
}


/***/ },

/***/ "./lib/ExecutionService.js"
/*!*********************************!*\
  !*** ./lib/ExecutionService.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PipelineExecutionService: () => (/* binding */ PipelineExecutionService)
/* harmony export */ });
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_0__);
// ExecutionService.ts
// Service for managing and broadcasting pipeline component execution status

/**
 * Implementation of the pipeline execution service
 * Manages execution state and broadcasts updates via signals
 */
class PipelineExecutionService {
    constructor() {
        this._executionUpdated = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal(this);
        this._executionCleared = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal(this);
    }
    /**
     * Signal emitted when any component's execution status changes
     */
    get executionUpdated() {
        return this._executionUpdated;
    }
    /**
     * Signal emitted when all execution data should be cleared
     */
    get executionCleared() {
        return this._executionCleared;
    }
    /**
     * Report an execution result
     * This will emit the executionUpdated signal
     */
    reportExecution(result) {
        console.log(`[ExecutionService] Reporting execution for ${result.nodeId}: ${result.status}`);
        this._executionUpdated.emit(result);
    }
    /**
     * Clear all execution data
     * Can be used when starting a new pipeline run
     */
    clearAllExecutionData() {
        console.log('[ExecutionService] Clearing all execution data');
        this._executionCleared.emit();
    }
}


/***/ },

/***/ "./lib/ExportToImage.js"
/*!******************************!*\
  !*** ./lib/ExportToImage.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactflow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactflow */ "webpack/sharing/consume/default/reactflow/reactflow");
/* harmony import */ var html_to_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! html-to-image */ "webpack/sharing/consume/default/html-to-image/html-to-image");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icons */ "./lib/icons.js");




function sanitizeFilename(filename) {
    return filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}
function downloadImage(dataUrl, pipelineName) {
    const sanitizedFilename = sanitizeFilename(pipelineName);
    const a = document.createElement('a');
    a.setAttribute('download', `${sanitizedFilename}.svg`);
    a.setAttribute('href', dataUrl);
    a.click();
}
function DownloadImageButton({ pipelineName, pipelineId }) {
    const { getNodes } = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.useReactFlow)();
    const onClick = () => {
        const nodesBounds = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.getNodesBounds)(getNodes());
        const viewportElement = document.querySelector(`.reactflow-wrapper[data-id="${pipelineId}"]`);
        if (viewportElement instanceof HTMLElement) {
            const { width, height } = viewportElement.getBoundingClientRect();
            // const transform = getTransformForBounds(nodesBounds, width, height, 0.5, 2);
            (0,html_to_image__WEBPACK_IMPORTED_MODULE_2__.toSvg)(viewportElement, {
                backgroundColor: '#ffffff',
                width: width,
                height: height
            }).then((dataUrl) => downloadImage(dataUrl, pipelineName));
        }
    };
    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(reactflow__WEBPACK_IMPORTED_MODULE_1__.ControlButton, { onClick: onClick },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_3__.exportIcon.react, null));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DownloadImageButton);


/***/ },

/***/ "./lib/Palette.js"
/*!************************!*\
  !*** ./lib/Palette.js ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/SearchOutlined.js");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons */ "./lib/icons.js");





// --- Icon Renderer (Same as Sidebar) ---
const renderIcon = (icon, size = 14) => {
    if (icon === null || icon === void 0 ? void 0 : icon.react) {
        const Icon = icon.react;
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "anticon" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Icon, { height: typeof size === 'number' ? `${size}px` : size, width: typeof size === 'number' ? `${size}px` : size })));
    }
    if (icon === null || icon === void 0 ? void 0 : icon.svgstr) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "anticon", style: { display: 'inline-flex', lineHeight: 0, verticalAlign: 'middle' }, dangerouslySetInnerHTML: {
                __html: icon.svgstr.replace('<svg', `<svg height="${size}" width="${size}"`)
            } }));
    }
    return null;
};
const ComponentPalette = ({ componentService, onRefreshed }) => {
    const [searchValue, setSearchValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const [activeTabKey, setActiveTabKey] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('0');
    const [components, setComponents] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    // --- Fetch Logic ---
    const fetchComponents = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (opts) => {
        const notify = !!(opts === null || opts === void 0 ? void 0 : opts.notify);
        setLoading(true);
        try {
            const next = await Promise.resolve(componentService.getComponents());
            const list = Array.isArray(next) ? [...next] : [];
            setComponents(list);
            onRefreshed === null || onRefreshed === void 0 ? void 0 : onRefreshed(list);
            if (notify)
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_3__.Notification.success('Components refreshed', { autoClose: 3000 });
        }
        catch (e) {
            if (notify)
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_3__.Notification.error('Failed to refresh components', { autoClose: 6000 });
        }
        finally {
            setLoading(false);
        }
    }, [componentService, onRefreshed]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        fetchComponents({ notify: false });
    }, [fetchComponents]);
    // --- Categorization Logic ---
    const categorizedComponents = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        const result = {};
        components.forEach(component => {
            let [category, subcategory] = String(component._category || '').split('.');
            if (!category)
                category = 'uncategorized';
            if (!result[category])
                result[category] = {};
            const targetSub = subcategory || '_';
            if (!result[category][targetSub])
                result[category][targetSub] = [];
            result[category][targetSub].push(component);
        });
        return result;
    }, [components]);
    // --- Filtering Logic ---
    const filterComponents = (data, term) => {
        const filtered = {};
        Object.keys(data).forEach(category => {
            const categoryData = data[category];
            const filteredCategoryData = {};
            Object.keys(categoryData).forEach(subCategory => {
                const filteredItems = categoryData[subCategory].filter(component => (component._name || '').toLowerCase().includes(term.toLowerCase()) ||
                    (component._description || '').toLowerCase().includes(term.toLowerCase()));
                if (filteredItems.length > 0)
                    filteredCategoryData[subCategory] = filteredItems;
            });
            if (Object.keys(filteredCategoryData).length > 0)
                filtered[category] = filteredCategoryData;
        });
        return filtered;
    };
    const filteredCategorizedComponents = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        if (searchValue && searchValue.trim()) {
            return filterComponents(categorizedComponents, searchValue);
        }
        return categorizedComponents;
    }, [searchValue, categorizedComponents]);
    // --- Drag Logic ---
    const onDragStart = (event, nodeType, config) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('additionalData', config);
        event.dataTransfer.effectAllowed = 'move';
    };
    // --- Render Single Card (Fixed Size) ---
    const renderComponentItem = (component, key) => {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Tooltip, { key: key, title: component._description || component._name, placement: "bottom", mouseEnterDelay: 0.5, overlayInnerStyle: { fontSize: '12px' } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { draggable: true, className: "palette-component-square", onDragStart: (event) => onDragStart(event, component._id, component._default ? JSON.stringify(component._default) : '{}'), style: {
                    // Layout
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // Dimensions (Fixed)
                    width: '70px',
                    height: '70px',
                    flex: '0 0 70px',
                    // Style
                    padding: '6px 2px 6px 2px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    cursor: 'move',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.2s ease',
                    marginRight: '8px'
                }, onMouseEnter: (e) => {
                    e.currentTarget.style.backgroundColor = '#F2F4F7';
                    e.currentTarget.style.borderColor = '#778899';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                }, onMouseLeave: (e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.borderColor = '#d9d9d9';
                    e.currentTarget.style.transform = 'translateY(0)';
                } },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { display: 'flex', justifyContent: 'center', marginTop: '8px', color: '#5E9B96' } }, renderIcon(component === null || component === void 0 ? void 0 : component._icon, 30)),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: {
                        fontSize: '10px',
                        textAlign: 'center',
                        lineHeight: '1.1',
                        color: '#595959',
                        fontWeight: '500',
                        wordBreak: 'break-word',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        maxWidth: '100%'
                    } }, component._name))));
    };
    // --- Render Tab Content (Horizontal Scroll Row) ---
    const renderTabContent = (categoryData) => {
        const subCategories = Object.keys(categoryData);
        let allComponents = [];
        subCategories.forEach(subCat => {
            allComponents = allComponents.concat(categoryData[subCat]);
        });
        if (allComponents.length === 0) {
            return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { padding: '16px', color: '#8c8c8c' } }, "No components found.");
        }
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                overflowX: 'auto',
                overflowY: 'hidden',
                alignItems: 'center',
                padding: '10px 4px 10px 4px',
                width: '100%',
                scrollbarWidth: 'thin', // Firefox
            }, className: "palette-horizontal-scroll" // Class for custom scrollbar styling if needed
         }, allComponents.map((component, index) => renderComponentItem(component, `comp-${index}`))));
    };
    // --- Tabs Configuration ---
    const tabItems = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        const categories = Object.keys(filteredCategorizedComponents);
        if (categories.length === 0)
            return [];
        return categories.map((category, index) => ({
            key: String(index),
            label: (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { style: { fontWeight: '600', fontSize: '13px', color: '#262626' } }, category.charAt(0).toUpperCase() + category.slice(1))),
            // The content is the scrollable row
            children: renderTabContent(filteredCategorizedComponents[category]),
        }));
    }, [filteredCategorizedComponents]);
    // Auto-select first tab
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (tabItems.length > 0 && activeTabKey === '0') {
            setActiveTabKey(tabItems[0].key);
        }
        if (tabItems.length === 0)
            setActiveTabKey('0');
    }, [tabItems.length]);
    // --- Render: Search Bar Control ---
    const searchControls = (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, { style: { marginRight: '16px', paddingLeft: '8px' } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Input, { placeholder: "Search components", onChange: (e) => setSearchValue(e.target.value), value: searchValue, style: { width: 200 }, size: "small", suffix: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["default"], { style: { color: 'rgba(0,0,0,.25)' } }), allowClear: true }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Tooltip, { title: "Refresh components" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { size: "small", onClick: () => fetchComponents({ notify: true }), loading: loading, icon: renderIcon(_icons__WEBPACK_IMPORTED_MODULE_4__.refreshIcon, 14) }))));
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "component-palette-horizontal", style: {
            width: '100%',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e8e8e8',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            zIndex: 100,
            position: 'relative'
        } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Tabs, { activeKey: activeTabKey, items: tabItems, onChange: setActiveTabKey, type: "line", size: "small", tabBarExtraContent: { left: searchControls }, tabBarStyle: { margin: 0, padding: '0 8px' }, destroyInactiveTabPane: true }),
        tabItems.length === 0 && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { padding: '16px', textAlign: 'center', color: '#8c8c8c', fontSize: '12px' } }, searchValue ? `No components match "${searchValue}"` : "No components available"))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ComponentPalette);


/***/ },

/***/ "./lib/PipelineEditorWidget.js"
/*!*************************************!*\
  !*** ./lib/PipelineEditorWidget.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FitViewOptions: () => (/* binding */ FitViewOptions),
/* harmony export */   PipelineEditorFactory: () => (/* binding */ PipelineEditorFactory),
/* harmony export */   PipelineEditorWidget: () => (/* binding */ PipelineEditorWidget),
/* harmony export */   commandIDs: () => (/* binding */ commandIDs)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Commands__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Commands */ "./lib/Commands.js");
/* harmony import */ var _ExportToImage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ExportToImage */ "./lib/ExportToImage.js");
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Sidebar */ "./lib/Sidebar.js");
/* harmony import */ var _Palette__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Palette */ "./lib/Palette.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var reactflow__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! reactflow */ "webpack/sharing/consume/default/reactflow/reactflow");
/* harmony import */ var posthog_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! posthog-js */ "webpack/sharing/consume/default/posthog-js/posthog-js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/DownOutlined.js");
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @amphi/pipeline-components-manager */ "webpack/sharing/consume/default/@amphi/pipeline-components-manager");
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-dom */ "webpack/sharing/consume/default/react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _customEdge__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./customEdge */ "./lib/customEdge.js");
/* harmony import */ var _Dropzone__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Dropzone */ "./lib/Dropzone.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./icons */ "./lib/icons.js");
/* harmony import */ var _useCopyPaste__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./useCopyPaste */ "./lib/useCopyPaste.js");
/* harmony import */ var _CodeEditor__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./CodeEditor */ "./lib/CodeEditor.js");
/* harmony import */ var _ErrorModal__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./ErrorModal */ "./lib/ErrorModal.js");















// @ts-ignore







const PIPELINE_CLASS = "amphi-PipelineEditor";
const commandIDs = {
    openDocManager: "docmanager:open",
    newDocManager: "docmanager:new-untitled",
    saveDocManager: "docmanager:save",
};
const FitViewOptions = {
    padding: 10,
    maxZoom: 1.0,
};
const InlineIcon = ({ icon, height = "20px", width = "20px", className, color }) => {
    if (!icon)
        return null;
    const MaybeReact = icon.react;
    if (typeof MaybeReact === "function") {
        const R = MaybeReact;
        return react__WEBPACK_IMPORTED_MODULE_8___default().createElement(R, { height: height, width: width, color: color, className: className });
    }
    const svgstr = icon.svgstr;
    if (typeof svgstr === "string" && svgstr.trim()) {
        const sized = svgstr.replace("<svg", `<svg height="${parseInt(height)}" width="${parseInt(width)}"`);
        return react__WEBPACK_IMPORTED_MODULE_8___default().createElement("span", { className: className, dangerouslySetInnerHTML: { __html: sized } });
    }
    return null;
};
function maskedSensitiveParams(url) {
    try {
        const parsedUrl = new URL(url);
        return `${parsedUrl.protocol}//${parsedUrl.host}`;
    }
    catch (error) {
        // Return original URL if parsing fails
        return url;
    }
}
/**
 * Initialization: The class extends ReactWidget and initializes the pipeline editor widget. It sets up the initial properties and state for the widget.
 */
class PipelineEditorWidget extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget {
    // Constructor
    constructor(options) {
        super();
        this.app = options.app;
        this.browserFactory = options.browserFactory;
        this.defaultFileBrowser = options.defaultFileBrowser;
        this.shell = options.shell;
        this.toolbarRegistry = options.toolbarRegistry;
        this.commands = options.commands;
        this.rendermimeRegistry = options.rendermimeRegistry;
        this.context = options.context;
        this.settings = options.settings;
        this.componentService = options.componentService;
        this.executionService = options.executionService;
        let nullPipeline = this.context.model.toJSON() === null;
        this.context.model.contentChanged.connect(() => {
            if (nullPipeline) {
                nullPipeline = false;
                this.update();
            }
        });
    }
    /*
     * Rendering: The render() method is responsible for rendering the widget's UI.
     * It uses various components and elements to display the pipeline editor's interface.
     */
    render() {
        var _a;
        if (this.context.model.toJSON() === null) {
            return react__WEBPACK_IMPORTED_MODULE_8___default().createElement("div", { className: "amphi-loader" });
        }
        // 持续移除组件面板图标
        const removePanelIcon = () => {
            document.querySelectorAll('.lm-TabBar-tab[data-id="amphi-components-panel"]').forEach((tab) => {
                tab.remove();
            });
        };
        // 立即执行
        removePanelIcon();
        // 使用 MutationObserver 持续监听
        if (!window.__panelIconObserver) {
            const observer = new MutationObserver(removePanelIcon);
            observer.observe(document.querySelector(".lm-TabBar") || document.body, {
                childList: true,
                subtree: true,
            });
            window.__panelIconObserver = observer;
        }
        return (react__WEBPACK_IMPORTED_MODULE_8___default().createElement(PipelineWrapper, { app: this.app, context: this.context, browserFactory: this.browserFactory, defaultFileBrowser: this.defaultFileBrowser, shell: this.shell, toolbarRegistry: this.toolbarRegistry, commands: this.commands, rendermimeRegistry: this.rendermimeRegistry, widgetId: (_a = this.parent) === null || _a === void 0 ? void 0 : _a.id, settings: this.settings, componentService: this.componentService, executionService: this.executionService }));
    }
}
const PipelineWrapper = ({ app, context, browserFactory, defaultFileBrowser, shell, toolbarRegistry, commands, rendermimeRegistry, settings, widgetId, componentService, executionService, }) => {
    const manager = defaultFileBrowser.model.manager;
    // Add state for nodeTypes to make it reactive
    const [nodeTypes, setNodeTypes] = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)({});
    const [componentsRefreshKey, setComponentsRefreshKey] = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(0);
    const edgeTypes = {
        "custom-edge": _customEdge__WEBPACK_IMPORTED_MODULE_15__["default"],
    };
    // Update nodeTypes whenever components change
    (0,react__WEBPACK_IMPORTED_MODULE_8__.useEffect)(() => {
        const updateNodeTypes = () => {
            const newNodeTypes = {
                ...componentService.getComponents().reduce((acc, component) => {
                    const id = component._id;
                    const HasCustomUI = !!component && typeof component.UIComponent === "function";
                    // Safe wrapper: use component.UIComponent if present, otherwise a minimal fallback node
                    const NodeRenderer = (props) => {
                        var _a;
                        if (HasCustomUI) {
                            const UI = component.UIComponent;
                            return (react__WEBPACK_IMPORTED_MODULE_8___default().createElement(UI, { context: context, componentService: componentService, manager: manager, commands: commands, rendermimeRegistry: rendermimeRegistry, settings: settings, ...props }));
                        }
                        // Fallback node: no JSX from the blob needed; avoids invalid element type
                        return (react__WEBPACK_IMPORTED_MODULE_8___default().createElement("div", { className: "component component--fallback", style: {
                                padding: 8,
                                borderRadius: 8,
                                border: "1px solid #ddd",
                                background: "#fff",
                            } },
                            react__WEBPACK_IMPORTED_MODULE_8___default().createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                                react__WEBPACK_IMPORTED_MODULE_8___default().createElement(InlineIcon, { icon: component._icon, height: "20px", width: "20px" }),
                                react__WEBPACK_IMPORTED_MODULE_8___default().createElement("span", { style: { fontWeight: 500 } }, (_a = component._name) !== null && _a !== void 0 ? _a : id))));
                    };
                    acc[id] = NodeRenderer;
                    return acc;
                }, {}),
            };
            setNodeTypes(newNodeTypes);
        };
        updateNodeTypes();
    }, [componentService, context, manager, commands, rendermimeRegistry, settings, componentsRefreshKey]);
    // Callback to handle component refresh from Sidebar
    const handleComponentsRefresh = (0,react__WEBPACK_IMPORTED_MODULE_8__.useCallback)(() => {
        setComponentsRefreshKey((prev) => prev + 1);
    }, []);
    const getNodeId = () => `node_${+new Date()}`;
    let defaultEngineBackend = settings.get("defaultEngineBackend").composite;
    console.log(`Settings extension in PipelineEditor: defaultEngineBackend is set to '${defaultEngineBackend}'`);
    let enableTelemetry = settings.get("enableTelemetry").composite;
    if (enableTelemetry) {
        posthog_js__WEBPACK_IMPORTED_MODULE_10__["default"].init("phc_V56mYhYAQdzJl5tMM2RFedJWbXlbyxDnSj2KMbUX8x3", {
            api_host: "https://us.i.posthog.com",
            autocapture: false,
            person_profiles: "always",
            sanitize_properties: function (properties, _event) {
                // Sanitize current url
                if (properties[`$current_url`]) {
                    properties[`$current_url`] = maskedSensitiveParams(properties[`$current_url`]);
                }
                // Remove path name
                if (properties[`$path_name`]) {
                    properties[`$path_name`] = "";
                }
                return properties;
            },
        });
    }
    function PipelineFlow(context) {
        const model = context.context.model;
        const reactFlowWrapper = (0,react__WEBPACK_IMPORTED_MODULE_8__.useRef)(null);
        const [pipeline, setPipeline] = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(context.context.model.toJSON());
        const pipelineId = pipeline["id"];
        const initialNodes = pipeline["pipelines"][0]["flow"]["nodes"].map((node) => ({
            ...node,
            data: {
                ...node.data,
                lastUpdated: 0,
                lastExecuted: 0,
            },
        }));
        const initialEdges = pipeline["pipelines"][0]["flow"]["edges"];
        const initialViewport = pipeline["pipelines"][0]["flow"]["viewport"];
        const defaultViewport = { x: 0, y: 0, zoom: 1 };
        const [nodes, setNodes, onNodesChange] = (0,reactflow__WEBPACK_IMPORTED_MODULE_9__.useNodesState)(initialNodes);
        const [edges, setEdges, onEdgesChange] = (0,reactflow__WEBPACK_IMPORTED_MODULE_9__.useEdgesState)(initialEdges);
        const [reactFlowInstance, setRfInstance] = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(null);
        const { getViewport, setViewport } = (0,reactflow__WEBPACK_IMPORTED_MODULE_9__.useReactFlow)();
        const store = (0,reactflow__WEBPACK_IMPORTED_MODULE_9__.useStoreApi)();
        // Copy paste
        const { cut, copy, paste, bufferedNodes } = (0,_useCopyPaste__WEBPACK_IMPORTED_MODULE_18__["default"])();
        // Undo and Redo
        const { undo, redo, canUndo, canRedo, takeSnapshot } = (0,_Commands__WEBPACK_IMPORTED_MODULE_4__.useUndoRedo)();
        // Listen to execution updates and update node data
        (0,react__WEBPACK_IMPORTED_MODULE_8__.useEffect)(() => {
            if (!executionService)
                return;
            const updateNodeExecution = (sender, result) => {
                console.log(`[PipelineFlow] Received execution update for ${result.nodeId}: ${result.status}`);
                setNodes((nds) => nds.map((node) => node.id === result.nodeId
                    ? {
                        ...node,
                        data: {
                            ...node.data,
                            execution: {
                                status: result.status,
                                timestamp: result.timestamp,
                                executionTime: result.metadata.executionTime,
                                rowCount: result.metadata.rowCount,
                                columnCount: result.metadata.columnCount,
                                errorMessage: result.metadata.errorMessage,
                                errorType: result.metadata.errorType,
                            },
                        },
                    }
                    : node));
            };
            const clearAllExecutions = () => {
                console.log(`[PipelineFlow] Clearing all execution data from nodes`);
                setNodes((nds) => nds.map((node) => ({
                    ...node,
                    data: {
                        ...node.data,
                        execution: undefined,
                    },
                })));
            };
            executionService.executionUpdated.connect(updateNodeExecution);
            executionService.executionCleared.connect(clearAllExecutions);
            return () => {
                executionService.executionUpdated.disconnect(updateNodeExecution);
                executionService.executionCleared.disconnect(clearAllExecutions);
            };
        }, [executionService, setNodes]);
        const onNodeDragStart = (0,react__WEBPACK_IMPORTED_MODULE_8__.useCallback)(() => {
            // 👇 make dragging a node undoable
            takeSnapshot();
            // 👉 you can place your event handlers here
        }, [takeSnapshot]);
        const onSelectionDragStart = (0,react__WEBPACK_IMPORTED_MODULE_8__.useCallback)(() => {
            // 👇 make dragging a selection undoable
            takeSnapshot();
        }, [takeSnapshot]);
        const onEdgesDelete = (0,react__WEBPACK_IMPORTED_MODULE_8__.useCallback)(() => {
            // 👇 make deleting edges undoable
            takeSnapshot();
        }, [takeSnapshot]);
        const updatedPipeline = pipeline;
        // Filter out execution data before saving (runtime only, not persisted)
        const nodesToSave = nodes.map((node) => {
            const { execution, ...dataWithoutExecution } = node.data;
            return {
                ...node,
                data: dataWithoutExecution,
            };
        });
        updatedPipeline["pipelines"][0]["flow"]["nodes"] = nodesToSave;
        updatedPipeline["pipelines"][0]["flow"]["edges"] = edges;
        updatedPipeline["pipelines"][0]["flow"]["viewport"] = getViewport();
        // Save pipeline in current model
        // This means the file can then been save on "disk"
        context.context.model.fromJSON(updatedPipeline);
        // const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, type: 'custom-edge' }, eds)), [setEdges]);
        const onConnect = (0,react__WEBPACK_IMPORTED_MODULE_8__.useCallback)((connection) => {
            var _a;
            takeSnapshot();
            // Find source and target nodes
            const sourceNode = nodes.find((node) => node.id === connection.source);
            const targetNode = nodes.find((node) => node.id === connection.target);
            // Check if both sourceNode and targetNode exist
            if (sourceNode && targetNode) {
                // Check if source node has data.backend.engine
                const sourceBackend = (_a = sourceNode.data) === null || _a === void 0 ? void 0 : _a.backend;
                if (sourceBackend === null || sourceBackend === void 0 ? void 0 : sourceBackend.engine) {
                    setNodes((nds) => nds.map((node) => {
                        var _a, _b, _c, _d;
                        return node.id === targetNode.id
                            ? {
                                ...node,
                                data: {
                                    ...node.data,
                                    backend: {
                                        ...node.data.backend,
                                        engine: ((_b = (_a = node.data) === null || _a === void 0 ? void 0 : _a.backend) === null || _b === void 0 ? void 0 : _b.prefix) && node.data.backend.prefix !== sourceBackend.prefix
                                            ? node.data.backend.engine
                                            : sourceBackend.engine,
                                        prefix: ((_d = (_c = node.data) === null || _c === void 0 ? void 0 : _c.backend) === null || _d === void 0 ? void 0 : _d.prefix) && node.data.backend.prefix !== sourceBackend.prefix
                                            ? node.data.backend.prefix
                                            : sourceBackend.prefix,
                                    },
                                },
                            }
                            : node;
                    }));
                }
            }
            // Add the edge to the flow
            setEdges((edges) => (0,reactflow__WEBPACK_IMPORTED_MODULE_9__.addEdge)({ ...connection, type: "custom-edge" }, edges));
        }, [nodes, takeSnapshot]);
        const getCategory = (nodeId) => {
            const node = nodes.find((node) => node.id === nodeId);
            if (node) {
                return componentService.getComponent(node.type)._type;
            }
            return undefined;
        };
        const isValidConnection = (connection) => {
            const sourceCategory = getCategory(connection.source);
            const targetCategory = getCategory(connection.target);
            if (sourceCategory === "pandas_df_to_documents_processor") {
                return targetCategory.startsWith("documents");
            }
            else if (sourceCategory.startsWith("documents")) {
                return targetCategory.startsWith("documents");
            }
            else if (sourceCategory.startsWith("pandas_df")) {
                return targetCategory.startsWith("pandas_df");
            }
            else if (sourceCategory.startsWith("ibis_df")) {
                return targetCategory.startsWith("ibis_df");
            }
            else {
                return false;
            }
        };
        const onNodesDelete = (0,react__WEBPACK_IMPORTED_MODULE_8__.useCallback)((deleted) => {
            setEdges(deleted.reduce((acc, node) => {
                const incomers = (0,reactflow__WEBPACK_IMPORTED_MODULE_9__.getIncomers)(node, nodes, edges);
                const outgoers = (0,reactflow__WEBPACK_IMPORTED_MODULE_9__.getOutgoers)(node, nodes, edges);
                const connectedEdges = (0,reactflow__WEBPACK_IMPORTED_MODULE_9__.getConnectedEdges)([node], edges);
                const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));
                const createdEdges = incomers.flatMap(({ id: source }) => outgoers.map(({ id: target }) => ({
                    id: `${source}->${target}`,
                    source,
                    target,
                    type: "custom-edge",
                })));
                return [...remainingEdges, ...createdEdges];
            }, edges));
            takeSnapshot();
        }, [nodes, edges, takeSnapshot]);
        function generateUniqueNodeName(type, nodes) {
            // Filter nodes of the same type with a name
            const existingNodesOfType = nodes.filter((node) => { var _a; return node.type === type && ((_a = node.data) === null || _a === void 0 ? void 0 : _a.nameId); });
            // Extract numbers from the node names
            const numbers = existingNodesOfType.map((node) => {
                const regex = new RegExp(`^${type}(\\d+)$`);
                const match = node.data.nameId.match(regex);
                return match ? parseInt(match[1], 10) : 0;
            });
            const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;
            // Create a new name by incrementing the highest number
            const nameId = `${type}${maxNumber + 1}`;
            return nameId;
        }
        const handleAddFileToPipeline = (0,react__WEBPACK_IMPORTED_MODULE_8__.useCallback)((location) => {
            var _a;
            const fileBrowser = defaultFileBrowser;
            // Only add file to pipeline if it is currently in focus
            if (((_a = shell.currentWidget) === null || _a === void 0 ? void 0 : _a.id) !== widgetId) {
                return;
            }
            if (reactFlowInstance && location) {
                const { height, width, transform: [transformX, transformY, zoomLevel], } = store.getState();
                const zoomMultiplier = 1 / zoomLevel;
                // Calculate the adjusted position based on the transformation values and zoom level
                const adjustedPosition = {
                    x: (location.x - transformX) * zoomMultiplier,
                    y: (location.y - transformY) * zoomMultiplier,
                };
                Array.from(fileBrowser.selectedItems()).forEach(async (item) => {
                    const filePath = item.path;
                    const fileExtension = item.name.split(".").pop();
                    const fileName = item.name.split("/").pop();
                    if (fileExtension === "amcpn") {
                        const contentsManager = new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__.ContentsManager();
                        try {
                            const file = await contentsManager.get(filePath);
                            const content = file.content;
                            const fileData = JSON.parse(content);
                            const { type: nodeType, data: nodeData } = fileData.component;
                            if (nodeType && nodeData) {
                                const newNode = {
                                    id: getNodeId(),
                                    type: nodeType,
                                    position: adjustedPosition,
                                    data: {
                                        nameId: generateUniqueNodeName(nodeType, nodes),
                                        ...nodeData,
                                        lastUpdated: Date.now(),
                                    },
                                };
                                setNodes((nds) => nds.concat(newNode));
                            }
                            else {
                                (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                                    title: "Invalid Component",
                                    body: "The selected file does not contain valid component data.",
                                    buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton()],
                                });
                            }
                        }
                        catch (error) {
                            (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                                title: "Error Reading File",
                                body: `There was an error reading the file.`,
                                buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton()],
                            });
                        }
                        return;
                    }
                    const { id: nodeType, default: nodeDefaults } = _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_13__.PipelineService.getComponentIdForFileExtension(fileExtension, componentService, defaultEngineBackend);
                    const defaultConfig = componentService.getComponent(nodeType)["_default"];
                    // Check if nodeType exists
                    if (nodeType) {
                        const newNode = {
                            id: getNodeId(),
                            type: nodeType,
                            position: adjustedPosition,
                            data: {
                                ...defaultConfig,
                                nameId: generateUniqueNodeName(nodeType, nodes),
                                filePath: _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_13__.PipelineService.getRelativePath(context.context.sessionContext.path, filePath),
                                lastUpdated: Date.now(),
                                customTitle: fileName,
                                ...(nodeDefaults || {}), // Merge nodeDefaults into the data field
                            },
                        };
                        // Anonymous telemetry
                        if (enableTelemetry) {
                            posthog_js__WEBPACK_IMPORTED_MODULE_10__["default"].capture("component_drop", {
                                drag_type: "file browser",
                                node_type: nodeType,
                            });
                        }
                        // Add the new node to the pipeline
                        setNodes((nds) => nds.concat(newNode));
                    }
                    else {
                        // If nodeType doesn't exist, show the dialog
                        (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                            title: "Unsupported File(s)",
                            body: "Only supported files can be added to a pipeline.",
                            buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton()],
                        });
                    }
                });
            }
            return;
        }, [defaultFileBrowser, shell, widgetId, reactFlowInstance, nodes]);
        const handleFileDrop = async (e) => {
            takeSnapshot();
            handleAddFileToPipeline({ x: e.offsetX, y: e.offsetY });
        };
        const onDragOver = (0,react__WEBPACK_IMPORTED_MODULE_8__.useCallback)((event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        }, []);
        const onDrop = (0,react__WEBPACK_IMPORTED_MODULE_8__.useCallback)((event) => {
            takeSnapshot();
            event.preventDefault();
            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData("application/reactflow");
            const config = JSON.parse(event.dataTransfer.getData("additionalData"));
            const nodeId = getNodeId();
            const defaultConfig = componentService.getComponent(type)["_default"];
            // check if the dropped element is valid
            if (typeof type === "undefined" || !type) {
                return;
            }
            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: nodeId,
                type,
                position,
                data: {
                    ...defaultConfig,
                    nameId: generateUniqueNodeName(type, nodes),
                    ...config,
                    lastUpdated: Date.now(), // current timestamp in milliseconds
                },
            };
            setNodes((nds) => nds.concat(newNode));
            // Anonymous telemetry
            if (enableTelemetry) {
                posthog_js__WEBPACK_IMPORTED_MODULE_10__["default"].capture("component_drop", {
                    drag_type: "palette",
                    node_type: type,
                });
            }
        }, [reactFlowInstance, nodes]);
        const onViewportChange = (0,react__WEBPACK_IMPORTED_MODULE_8__.useCallback)((viewport) => {
            const updatedPipeline = { ...pipeline };
            updatedPipeline["pipelines"][0]["flow"]["viewport"] = viewport;
            context.context.model.fromJSON(updatedPipeline);
        }, [pipeline, context]);
        const proOptions = { hideAttribution: true };
        return (react__WEBPACK_IMPORTED_MODULE_8___default().createElement("div", { className: "reactflow-wrapper", "data-id": pipelineId, ref: reactFlowWrapper },
            react__WEBPACK_IMPORTED_MODULE_8___default().createElement(react__WEBPACK_IMPORTED_MODULE_8__.Profiler, { id: pipelineId, onRender: (id, phase, actualDuration) => {
                    console.log({ id, phase, actualDuration });
                } },
                react__WEBPACK_IMPORTED_MODULE_8___default().createElement(_Dropzone__WEBPACK_IMPORTED_MODULE_16__.Dropzone, { onDrop: handleFileDrop },
                    react__WEBPACK_IMPORTED_MODULE_8___default().createElement(reactflow__WEBPACK_IMPORTED_MODULE_9__["default"], { id: pipelineId, nodes: nodes, edges: edges, onNodesChange: onNodesChange, onNodesDelete: onNodesDelete, onEdgesDelete: onEdgesDelete, onEdgesChange: onEdgesChange, onConnect: onConnect, onNodeDragStart: onNodeDragStart, onSelectionDragStart: onSelectionDragStart, isValidConnection: isValidConnection, onDrop: onDrop, onDragOver: onDragOver, 
                        // onNodeDrag={onNodeDrag}
                        // onNodeDragStop={onNodeDragStop}
                        onInit: setRfInstance, edgeTypes: edgeTypes, nodeTypes: nodeTypes, snapToGrid: true, snapGrid: [15, 15], fitViewOptions: { minZoom: 0.5, maxZoom: 1.0, padding: 0.4 }, defaultViewport: initialViewport, 
                        // viewport={initialViewport}
                        // onViewportChange={onViewportChange}
                        deleteKeyCode: ["Delete", "Backspace"], proOptions: proOptions },
                        react__WEBPACK_IMPORTED_MODULE_8___default().createElement(reactflow__WEBPACK_IMPORTED_MODULE_9__.Controls, null,
                            react__WEBPACK_IMPORTED_MODULE_8___default().createElement(_ExportToImage__WEBPACK_IMPORTED_MODULE_5__["default"], { pipelineName: context.context.sessionContext.path, pipelineId: pipelineId })),
                        react__WEBPACK_IMPORTED_MODULE_8___default().createElement(reactflow__WEBPACK_IMPORTED_MODULE_9__.Background, { color: "#aaa", gap: 20 }))))));
    }
    const enableHorizontalPalette = settings.get("componentPalette").composite;
    return (react__WEBPACK_IMPORTED_MODULE_8___default().createElement("div", { className: "canvas", id: "pipeline-panel" },
        react__WEBPACK_IMPORTED_MODULE_8___default().createElement(antd__WEBPACK_IMPORTED_MODULE_11__.ConfigProvider, { theme: {
                token: {
                    // Seed Token
                    colorPrimary: "#5F9B97",
                },
            } },
            react__WEBPACK_IMPORTED_MODULE_8___default().createElement(reactflow__WEBPACK_IMPORTED_MODULE_9__.ReactFlowProvider, null, enableHorizontalPalette ? (
            // Horizontal Layout (Top Bar)
            react__WEBPACK_IMPORTED_MODULE_8___default().createElement("div", { style: {
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                } },
                react__WEBPACK_IMPORTED_MODULE_8___default().createElement(_Palette__WEBPACK_IMPORTED_MODULE_7__["default"], { componentService: componentService, onRefreshed: handleComponentsRefresh }),
                react__WEBPACK_IMPORTED_MODULE_8___default().createElement("div", { style: { flex: 1, position: "relative", overflow: "hidden" } },
                    react__WEBPACK_IMPORTED_MODULE_8___default().createElement(PipelineFlow, { context: context })))) : (react__WEBPACK_IMPORTED_MODULE_8___default().createElement(antd__WEBPACK_IMPORTED_MODULE_11__.Splitter, null,
                react__WEBPACK_IMPORTED_MODULE_8___default().createElement(antd__WEBPACK_IMPORTED_MODULE_11__.Splitter.Panel, { min: "50%" },
                    react__WEBPACK_IMPORTED_MODULE_8___default().createElement(PipelineFlow, { context: context })),
                react__WEBPACK_IMPORTED_MODULE_8___default().createElement(antd__WEBPACK_IMPORTED_MODULE_11__.Splitter.Panel, { collapsible: true, defaultSize: 327, min: 241 }, react__WEBPACK_IMPORTED_MODULE_8___default().createElement(_Sidebar__WEBPACK_IMPORTED_MODULE_6__["default"], { componentService: componentService, onRefreshed: handleComponentsRefresh }))))))));
};
class PipelineEditorFactory extends _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__.ABCWidgetFactory {
    constructor(options) {
        super(options);
        this.app = options.app;
        this.browserFactory = options.browserFactory;
        this.defaultFileBrowser = options.defaultFileBrowser;
        this.shell = options.app.shell;
        this.toolbarRegistry = options.toolbarRegistry;
        this.commands = options.app.commands;
        this.settings = options.settings;
        this.componentService = options.componentService;
        this.executionService = options.executionService;
    }
    createNewWidget(context) {
        // Creates a blank widget with a DocumentWidget wrapper
        const props = {
            app: this.app,
            shell: this.shell,
            toolbarRegistry: this.toolbarRegistry,
            commands: this.commands,
            browserFactory: this.browserFactory,
            defaultFileBrowser: this.defaultFileBrowser,
            context: context,
            settings: this.settings,
            componentService: this.componentService,
            executionService: this.executionService,
        };
        let enableExecution = this.settings.get("enableExecution").composite;
        console.log(`Settings extension in PipelineEditor: enableExecution is set to '${enableExecution}'`);
        if (enableExecution) {
            context.sessionContext.kernelPreference = {
                autoStartDefault: true,
                name: "python",
                shutdownOnDispose: false,
            };
        }
        else {
            context.sessionContext.kernelPreference = {
                shouldStart: false,
                canStart: false,
                shutdownOnDispose: true,
            };
        }
        let enableTelemetry = this.settings.get("enableTelemetry").composite;
        if (enableTelemetry) {
            posthog_js__WEBPACK_IMPORTED_MODULE_10__["default"].init("phc_V56mYhYAQdzJl5tMM2RFedJWbXlbyxDnSj2KMbUX8x3", {
                api_host: "https://us.i.posthog.com",
                autocapture: false,
                person_profiles: "always",
                sanitize_properties: function (properties, _event) {
                    // Sanitize current url
                    if (properties[`$current_url`]) {
                        properties[`$current_url`] = maskedSensitiveParams(properties[`$current_url`]);
                    }
                    // Remove path name
                    if (properties[`$path_name`]) {
                        properties[`$path_name`] = "";
                    }
                    return properties;
                },
            });
        }
        const content = new PipelineEditorWidget(props);
        const widget = new _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__.DocumentWidget({ content, context });
        // Add save button
        // const saveButton = DocToolbarItems.createSaveButton(this.commands, context.fileChanged);
        const saveButton = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
            // label: 'Save Pipeline', // Your desired label
            label: "保存流水线",
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.saveIcon,
            onClick: () => {
                this.commands.execute("docmanager:save");
            },
        });
        widget.toolbar.addItem("save", saveButton);
        async function showCodeModal(code, commands, componentService, isDagsterCode) {
            const container = document.createElement("div");
            document.body.appendChild(container);
            function CodeModal() {
                const [copyStatus, setCopyStatus] = react__WEBPACK_IMPORTED_MODULE_8___default().useState("idle");
                const handleClose = () => {
                    react_dom__WEBPACK_IMPORTED_MODULE_14___default().unmountComponentAtNode(container);
                    container.remove();
                };
                const handleCopyToClipboard = async () => {
                    try {
                        setCopyStatus("loading");
                        await navigator.clipboard.writeText(code);
                        setCopyStatus("copied");
                        setTimeout(() => setCopyStatus("idle"), 3000);
                    }
                    catch (error) {
                        console.error("Failed to copy code to clipboard:", error);
                        setCopyStatus("idle");
                    }
                };
                const handleOpenInNewFile = async (contents) => {
                    try {
                        const file = await commands.execute("docmanager:new-untitled", {
                            path: "/",
                            type: "file",
                            ext: ".py",
                        });
                        const doc = await commands.execute("docmanager:open", {
                            path: file.path,
                        });
                        doc.context.model.fromString(contents);
                    }
                    catch (error) {
                        console.error("Failed to open new file:", error);
                    }
                    handleClose();
                };
                const handleExportToDagster = async () => {
                    try {
                        const dagsterCode = _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_13__.CodeGeneratorDagster.generateDagsterCode(context.model.toString(), commands, componentService, true);
                        console.log(dagsterCode);
                        const file = await commands.execute("docmanager:new-untitled", {
                            path: "/",
                            type: "file",
                            ext: ".py",
                        });
                        const doc = await commands.execute("docmanager:open", {
                            path: file.path,
                        });
                        doc.context.model.fromString(dagsterCode);
                        handleClose();
                    }
                    catch (error) {
                        console.error("Failed to export to Dagster:", error);
                        handleClose();
                        (0,_ErrorModal__WEBPACK_IMPORTED_MODULE_20__.showErrorModal)(error, "Failed to generate Dagster code");
                    }
                };
                const menuItems = [
                    {
                        key: "1",
                        label: "Open in new file",
                        icon: react__WEBPACK_IMPORTED_MODULE_8___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_17__.filePlusIcon.react, { height: "14px", width: "14px;" }),
                        classname: "anticon",
                        onClick: () => handleOpenInNewFile(code),
                    },
                    {
                        key: "2",
                        label: "Export to Dagster (beta)",
                        icon: react__WEBPACK_IMPORTED_MODULE_8___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_17__.dagsterIcon.react, { height: "14px", width: "14px;" }),
                        classname: "anticon",
                        onClick: handleExportToDagster,
                    },
                ];
                const title = isDagsterCode ? "Generated Dagster Python Code" : "Generated Python Code";
                return (react__WEBPACK_IMPORTED_MODULE_8___default().createElement(antd__WEBPACK_IMPORTED_MODULE_11__.ConfigProvider, { theme: { token: { colorPrimary: "#5F9B97" } } },
                    react__WEBPACK_IMPORTED_MODULE_8___default().createElement(reactflow__WEBPACK_IMPORTED_MODULE_9__.ReactFlowProvider, null,
                        react__WEBPACK_IMPORTED_MODULE_8___default().createElement(antd__WEBPACK_IMPORTED_MODULE_11__.Modal, { title: react__WEBPACK_IMPORTED_MODULE_8___default().createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
                                react__WEBPACK_IMPORTED_MODULE_8___default().createElement("span", null, title)), visible: true, footer: null, width: "70%", onCancel: handleClose },
                            react__WEBPACK_IMPORTED_MODULE_8___default().createElement("div", { style: {
                                    position: "relative",
                                    width: "100%",
                                    height: "500px",
                                } },
                                react__WEBPACK_IMPORTED_MODULE_8___default().createElement(_CodeEditor__WEBPACK_IMPORTED_MODULE_19__["default"], { code: code }),
                                react__WEBPACK_IMPORTED_MODULE_8___default().createElement("div", { style: { position: "absolute", top: 0, right: 25 } },
                                    react__WEBPACK_IMPORTED_MODULE_8___default().createElement(antd__WEBPACK_IMPORTED_MODULE_11__.Dropdown.Button, { icon: react__WEBPACK_IMPORTED_MODULE_8___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_12__["default"], null), menu: {
                                            items: menuItems,
                                            style: { textAlign: "left", width: "220px" },
                                        }, onClick: handleCopyToClipboard, loading: copyStatus === "loading" }, copyStatus === "copied" ? "Copied!" : copyStatus === "loading" ? "Loading..." : "Copy to clipboard")))))));
            }
            react_dom__WEBPACK_IMPORTED_MODULE_14___default().render(react__WEBPACK_IMPORTED_MODULE_8___default().createElement(CodeModal, null), container);
        }
        // Add generate code button
        const generateCodeButton = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
            label: "导出Python代码",
            iconLabel: "Export to Python code",
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.codeIcon,
            onClick: async () => {
                try {
                    const code = await _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_13__.CodeGenerator.generateCode(context.model.toString(), this.commands, this.componentService, true);
                    showCodeModal(code, this.commands, this.componentService, false);
                }
                catch (error) {
                    console.error("Code generation failed:", error);
                    (0,_ErrorModal__WEBPACK_IMPORTED_MODULE_20__.showErrorModal)(error, "Failed to export pipeline to Python code");
                }
            },
        });
        widget.toolbar.addItem("generateCode", generateCodeButton);
        /*
      const generateDagsterCodeButton = new ToolbarButton({
        label: 'Export to Dagster Python code',
        iconLabel: 'Export to Dagster Python code',
        icon: codeIcon,
        onClick: async () => {
          try {
            const code = await CodeGeneratorDagster.generateDagsterCode(context.model.toString(), this.commands, this.componentService, true);
            showCodeModal(code, this.commands, true);
          } catch (error) {
            console.error('Some error occured.. Error generating Dagster code:', error);
          }
        }
      });
      widget.toolbar.addItem('generateDagsterCode', generateDagsterCodeButton);
      */
        // Capture class instance for use in modal
        const commands = this.commands;
        const componentService = this.componentService;
        // Function to show run mode selection modal
        const showRunModeModal = () => {
            const container = document.createElement("div");
            document.body.appendChild(container);
            function RunModeModal() {
                const [executionMode, setExecutionMode] = react__WEBPACK_IMPORTED_MODULE_8___default().useState("full");
                const handleClose = () => {
                    react_dom__WEBPACK_IMPORTED_MODULE_14___default().unmountComponentAtNode(container);
                    container.remove();
                };
                const handleRun = async () => {
                    handleClose();
                    try {
                        // First save document
                        await commands.execute("docmanager:save");
                        if (executionMode === "full") {
                            // Full pipeline execution
                            const code = _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_13__.CodeGenerator.generateCode(context.model.toString(), commands, componentService, true);
                            if (enableTelemetry) {
                                posthog_js__WEBPACK_IMPORTED_MODULE_10__["default"].capture("run_pipeline", {
                                    pipeline_metadata: context.model.toString(),
                                    run_type: "full_run",
                                });
                            }
                            commands.execute("pipeline-editor:run-pipeline", { code }).catch((reason) => {
                                console.error(`An error occurred during the execution of 'pipeline-editor:run-pipeline'.\n${reason}`);
                            });
                        }
                        else {
                            // Incremental execution
                            await commands.execute("pipeline-editor:run-incremental-pipeline", { context });
                        }
                    }
                    catch (error) {
                        console.error("Pipeline execution failed:", error);
                        (0,_ErrorModal__WEBPACK_IMPORTED_MODULE_20__.showErrorModal)(error, "Failed to generate code for pipeline execution");
                    }
                };
                const options = [
                    {
                        label: "Run Full Pipeline",
                        value: "full",
                        title: "Execute all components at once",
                    },
                    {
                        label: "Run Step-by-Step",
                        value: "incremental",
                        title: "Execute each component one by one.",
                    },
                ];
                return (react__WEBPACK_IMPORTED_MODULE_8___default().createElement(antd__WEBPACK_IMPORTED_MODULE_11__.ConfigProvider, { theme: { token: { colorPrimary: "#5F9B97" } } },
                    react__WEBPACK_IMPORTED_MODULE_8___default().createElement(antd__WEBPACK_IMPORTED_MODULE_11__.Modal, { title: "Run Pipeline", visible: true, onOk: handleRun, onCancel: handleClose, okText: "Run", cancelText: "Cancel", width: "500px" },
                        react__WEBPACK_IMPORTED_MODULE_8___default().createElement("div", { style: { marginBottom: "16px" } },
                            react__WEBPACK_IMPORTED_MODULE_8___default().createElement("strong", null, "Select execution mode:")),
                        react__WEBPACK_IMPORTED_MODULE_8___default().createElement(antd__WEBPACK_IMPORTED_MODULE_11__.Radio.Group, { options: options, onChange: (e) => setExecutionMode(e.target.value), value: executionMode, optionType: "button", buttonStyle: "solid", style: { width: "100%", display: "flex" } }),
                        react__WEBPACK_IMPORTED_MODULE_8___default().createElement("div", { style: { marginTop: "16px", fontSize: "13px", color: "#666" } }, executionMode === "full" ? (react__WEBPACK_IMPORTED_MODULE_8___default().createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_8___default().createElement("strong", null, "Full Pipeline:"),
                            " The entire pipeline executes at once.")) : (react__WEBPACK_IMPORTED_MODULE_8___default().createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_8___default().createElement("strong", null, "Step-by-Step:"),
                            " Each component executes one by one and shows results in the console. Easier to identify where errors occur."))))));
            }
            react_dom__WEBPACK_IMPORTED_MODULE_14___default().render(react__WEBPACK_IMPORTED_MODULE_8___default().createElement(RunModeModal, null), container);
        };
        // Add run button
        const runButton = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
            // label: "Run Pipeline",
            label: "运行流水线",
            iconLabel: "Run Pipeline",
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.runIcon,
            onClick: () => {
                showRunModeModal();
            },
            enabled: enableExecution,
        });
        widget.toolbar.addItem("runPipeline", runButton);
        // Add Metadata panel
        /*
      const previewPanel = new ToolbarButton({
        label: 'Metadata Panel',
        iconLabel: 'Metadata Panel',
        icon: inspectorIcon,
        onClick: async () => {
          // Call the command execution
          const command = 'metadatapanel:open';
          this.commands.execute(command, {}).catch(reason => {
            console.error(
              `An error occurred during the execution of ${command}.\n${reason}`
            );
          });
        }
      });
      widget.toolbar.addItem('openPreviewPanel', previewPanel);
      */
        // Add Log panel
        const logconsole = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
            // label: "Console",
            label: "日志",
            iconLabel: "Console",
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.listIcon,
            onClick: async () => {
                // Call the command execution
                const command = "pipeline-console:open";
                this.commands.execute(command, {}).catch((reason) => {
                    console.error(`An error occurred during the execution of ${command}.\n${reason}`);
                });
            },
            enabled: enableExecution,
        });
        widget.toolbar.addItem("openlogconsole", logconsole);
        const kernelName = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Toolbar.createKernelNameItem(props.context.sessionContext);
        const spacer = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.Toolbar.createSpacerItem();
        widget.toolbar.addItem("spacer", spacer);
        widget.toolbar.addItem("kernelName", kernelName);
        // Add restart kernel button
        const restartButton = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
            // label: "Restart Environment",
            label: "重新启动环境",
            iconLabel: "Restart Environment",
            icon: _icons__WEBPACK_IMPORTED_MODULE_17__.refreshIcon,
            onClick: async () => {
                // Call the command execution
                const command = "pipeline-editor:restart-kernel";
                this.commands.execute(command, {}).catch((reason) => {
                    console.error(`An error occurred during the execution of ${command}.\n${reason}`);
                });
            },
            enabled: enableExecution,
        });
        widget.toolbar.addItem("restartKernel", restartButton);
        widget.addClass(PIPELINE_CLASS);
        widget.title.icon = _icons__WEBPACK_IMPORTED_MODULE_17__.pipelineIcon;
        return widget;
    }
}


/***/ },

/***/ "./lib/RunService.js"
/*!***************************!*\
  !*** ./lib/RunService.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RunService: () => (/* binding */ RunService)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);

// RunService.ts
class RunService {
    static executeCommand(commands, commandId) {
        commands.execute(commandId, {}).catch(reason => {
            console.error(`An error occurred during the execution of ${commandId}.\n${reason}`);
        });
    }
    static showErrorNotification(Notification, message) {
        Notification.error(message, {
            actions: [
                {
                    label: 'Try to reload the application and run again.',
                    callback: () => location.reload()
                }
            ],
            autoClose: 6000
        });
    }
    static checkSessionAndKernel(Notification, current) {
        if (!current.context.sessionContext ||
            !current.context.sessionContext.session) {
            RunService.showErrorNotification(Notification, 'The pipeline cannot be run because the local Python engine cannot be found.');
            return false;
        }
        if (current.context.sessionContext.hasNoKernel) {
            RunService.showErrorNotification(Notification, 'The pipeline cannot be run because no processing engine can be found.');
            return false;
        }
        return true;
    }
    static async executeKernelCode(session, code) {
        const future = session.kernel.requestExecute({ code });
        future.onIOPub = (msg) => {
            if (msg.header.msg_type === 'stream') {
                // Handle stream messages if necessary
            }
            else if (msg.header.msg_type === 'error') {
                // Handle error messages
                const errorMsg = msg;
                const errorOutput = errorMsg.content;
                console.error(`Received error: ${errorOutput.ename}: ${errorOutput.evalue}`);
            }
        };
        return future.done;
    }
    static async executeKernelCodeWithNotifications(Notification, session, code, notificationOptions = {}) {
        const start = performance.now();
        const notificationPromise = new Promise((resolve, reject) => {
            const future = session.kernel.requestExecute({ code });
            future.onReply = (reply) => {
                const end = performance.now();
                const delay = end - start;
                const delayInSeconds = (delay / 1000).toFixed(1);
                if (reply.content.status === 'ok') {
                    resolve({ delayInSeconds });
                }
                else {
                    reject(new Error(`Execution failed: ${reply.content.status}`));
                }
            };
            future.onDone = () => {
                // This is a fallback in case onReply wasn't called
                const end = performance.now();
                const delay = end - start;
                const delayInSeconds = (delay / 1000).toFixed(1);
                resolve({ delayInSeconds });
            };
        });
        Notification.promise(notificationPromise, notificationOptions);
        return notificationPromise;
    }
    static extractDependencies(code) {
        const lines = code.split(/\r?\n/);
        const dependencyLine = lines[2];
        const dependencies = dependencyLine.startsWith('# Additional dependencies: ')
            ? dependencyLine
                .split(': ')[1]
                .split(',')
                .map(pkg => pkg.trim())
            : [];
        return dependencies;
    }
    static async executeMultipleKernelCodesWithNotifications(Notification, session, codes, notificationOptions = {}) {
        console.log('Starting execution of multiple kernel codes.');
        const delegate = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.PromiseDelegate();
        const start = performance.now();
        console.log('Notification promise setup initiated.');
        Notification.promise(delegate.promise, notificationOptions);
        try {
            for (const code of codes) {
                const future = session.kernel.requestExecute({ code });
                await new Promise((resolve, reject) => {
                    future.onReply = (reply) => {
                        if (reply.content.status !== 'ok') {
                            reject(new Error('Kernel execution error'));
                        }
                    };
                    future.onIOPub = (msg) => {
                        if (msg.header.msg_type === 'error') {
                            const errorMsg = msg;
                            const errorOutput = errorMsg.content;
                            console.error(`Received error: ${errorOutput.ename}: ${errorOutput.evalue}`);
                            reject(new Error(`Received error: ${errorOutput.ename}: ${errorOutput.evalue}`));
                        }
                    };
                    future.onDone = () => {
                        console.log('Kernel execution done for this code.');
                        resolve();
                    };
                });
            }
            const end = performance.now();
            const delay = end - start;
            const delayInSeconds = (delay / 1000).toFixed(1);
            console.log(`Execution finished successfully in ${delayInSeconds} seconds.`);
            delegate.resolve({ delayInSeconds });
        }
        catch (error) {
            const end = performance.now();
            const delay = end - start;
            const delayInSeconds = (delay / 1000).toFixed(1);
            console.error(`Execution failed after ${delayInSeconds} seconds.`, error);
            delegate.reject({ delayInSeconds, error });
        }
        console.log('Returning final delegate promise.');
        return delegate.promise;
    }
}


/***/ },

/***/ "./lib/Sidebar.js"
/*!************************!*\
  !*** ./lib/Sidebar.js ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/SearchOutlined.js");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons */ "./lib/icons.js");
// Sidebar.tsx
/**
 * This file defines a Sidebar component that displays a searchable and collapsible list of components.
 * Users can drag and drop these components into a pipeline editor. The sidebar fetches components from a service,
 * categorizes them, and allows for refreshing the list.
 */





const { Panel } = antd__WEBPACK_IMPORTED_MODULE_1__.Collapse;
const renderIcon = (icon, size = 14) => {
    if (icon === null || icon === void 0 ? void 0 : icon.react) {
        const Icon = icon.react;
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "anticon" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Icon, { height: typeof size === "number" ? `${size}px` : size, width: typeof size === "number" ? `${size}px` : size })));
    }
    if (icon === null || icon === void 0 ? void 0 : icon.svgstr) {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { className: "anticon", style: { display: "inline-flex", lineHeight: 0, verticalAlign: "middle" }, dangerouslySetInnerHTML: {
                __html: icon.svgstr.replace("<svg", `<svg height="${size}" width="${size}"`),
            } }));
    }
    return null;
};
const Sidebar = ({ componentService, onRefreshed }) => {
    const [searchValue, setSearchValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
    const [activeKeys, setActiveKeys] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [components, setComponents] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const fetchComponents = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (opts) => {
        const notify = !!(opts === null || opts === void 0 ? void 0 : opts.notify);
        setLoading(true);
        try {
            const next = await Promise.resolve(componentService.getComponents());
            const list = Array.isArray(next) ? [...next] : [];
            setComponents(list);
            onRefreshed === null || onRefreshed === void 0 ? void 0 : onRefreshed(list);
            if (notify) {
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_3__.Notification.success("Components refreshed", { autoClose: 3000 });
            }
        }
        catch (e) {
            if (notify) {
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_3__.Notification.error("Failed to refresh components", {
                    actions: [{ label: "Reload and try again", callback: () => location.reload() }],
                    autoClose: 6000,
                });
            }
        }
        finally {
            setLoading(false);
        }
    }, [componentService, onRefreshed]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        fetchComponents({ notify: false });
    }, [fetchComponents]);
    const categorizedComponents = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        const result = {};
        components.forEach((component) => {
            let [category, subcategory] = String(component._category || "").split(".");
            if (!category)
                category = "uncategorized";
            if (!result[category]) {
                result[category] = {};
            }
            if (subcategory) {
                if (!result[category][subcategory]) {
                    result[category][subcategory] = [];
                }
                result[category][subcategory].push(component);
            }
            else {
                if (!result[category]["_"]) {
                    result[category]["_"] = [];
                }
                result[category]["_"].push(component);
            }
        });
        return result;
    }, [components]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (components.length > 0) {
            const categories = Object.keys(categorizedComponents);
            setActiveKeys(categories.map((_, index) => `category-${index}`));
        }
    }, [categorizedComponents, components.length]);
    const onDragStart = (event, nodeType, config) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.setData("additionalData", config);
        event.dataTransfer.effectAllowed = "move";
    };
    const renderComponentGrid = (items, categoryKey) => {
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: {
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                padding: "8px",
            } }, items.map((component, index) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Tooltip, { key: `${categoryKey}-${index}`, title: component._description || component._name, placement: "bottom", mouseEnterDelay: 0.5, overlayInnerStyle: { fontSize: "12px" } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { draggable: true, className: "palette-component-square", onDragStart: (event) => onDragStart(event, component._id, component._default ? JSON.stringify(component._default) : "{}"), style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "6px 2px 6px 2px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "6px",
                    cursor: "grab",
                    backgroundColor: "#ffffff",
                    width: "70px",
                    height: "70px",
                    transition: "all 0.2s ease",
                }, onMouseEnter: (e) => {
                    e.currentTarget.style.backgroundColor = "#F2F4F7";
                    e.currentTarget.style.borderColor = "#778899";
                    e.currentTarget.style.transform = "translateY(-1px)";
                }, onMouseLeave: (e) => {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                    e.currentTarget.style.borderColor = "#d9d9d9";
                    e.currentTarget.style.transform = "translateY(0)";
                } },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { display: "flex", justifyContent: "center", marginTop: "8px", color: "#5E9B96" } }, renderIcon(component === null || component === void 0 ? void 0 : component._icon, 30)),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: {
                        fontSize: "10px",
                        textAlign: "center",
                        lineHeight: "1.1",
                        color: "#595959",
                        fontWeight: "500",
                        wordBreak: "break-word",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        maxWidth: "100%",
                    } }, component._name)))))));
    };
    const renderCategoryContent = (category, categoryData) => {
        const subCategories = Object.keys(categoryData);
        if (subCategories.length === 1 && subCategories[0] === "_") {
            return renderComponentGrid(categoryData["_"], category);
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, subCategories.map((subCat, subIndex) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { key: `${category}-${subIndex}`, style: { marginBottom: "16px" } },
                subCat !== "_" && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: {
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#8c8c8c",
                        marginBottom: "8px",
                        paddingLeft: "8px",
                    } }, subCat.charAt(0).toUpperCase() + subCat.slice(1))),
                renderComponentGrid(categoryData[subCat], `${category}-${subCat}`))))));
        }
    };
    const filterComponents = (data, term) => {
        const filtered = {};
        Object.keys(data).forEach((category) => {
            const categoryData = data[category];
            const filteredCategoryData = {};
            Object.keys(categoryData).forEach((subCategory) => {
                const filteredItems = categoryData[subCategory].filter((component) => (component._name || "").toLowerCase().includes(term.toLowerCase()) ||
                    (component._description || "").toLowerCase().includes(term.toLowerCase()));
                if (filteredItems.length > 0) {
                    filteredCategoryData[subCategory] = filteredItems;
                }
            });
            if (Object.keys(filteredCategoryData).length > 0) {
                filtered[category] = filteredCategoryData;
            }
        });
        return filtered;
    };
    const onSearch = (e) => {
        const { value } = e.target;
        setSearchValue(value);
        if (value.trim()) {
            const allKeys = Object.keys(categorizedComponents).map((_, index) => `category-${index}`);
            setActiveKeys(allKeys);
        }
    };
    const filteredCategorizedComponents = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        if (searchValue && searchValue.trim()) {
            return filterComponents(categorizedComponents, searchValue);
        }
        return categorizedComponents;
    }, [searchValue, categorizedComponents]);
    const onCollapseChange = (keys) => {
        setActiveKeys(Array.isArray(keys) ? keys : [keys]);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("aside", { className: "sidebar", title: "Components" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: {
                position: "sticky",
                top: 0,
                zIndex: 999,
                backgroundColor: "white",
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, { direction: "vertical", style: { marginTop: "10px", marginLeft: "10px", width: "90%", textAlign: "center" } },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { display: "flex", gap: 8 } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Input, { placeholder: "Search components", onChange: onSearch, value: searchValue, style: { marginBottom: 8, flex: 1 }, suffix: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["default"], { style: { color: "rgba(0,0,0,.25)" } }), allowClear: true }),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Tooltip, { title: "Refresh components" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { "aria-label": "Refresh components", onClick: () => fetchComponents({ notify: true }), loading: loading, type: "default", style: { minWidth: 36 }, icon: renderIcon(_icons__WEBPACK_IMPORTED_MODULE_4__.refreshIcon, 16) }))))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { padding: "0 4px" } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Collapse, { activeKey: activeKeys, onChange: onCollapseChange, ghost: true, size: "small", style: { backgroundColor: "transparent" }, items: Object.keys(filteredCategorizedComponents).map((category, index) => ({
                    key: `category-${index}`,
                    label: (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { style: {
                            fontWeight: "600",
                            fontSize: "13px",
                            color: "#262626",
                        } }, category.charAt(0).toUpperCase() + category.slice(1))),
                    children: renderCategoryContent(category, filteredCategorizedComponents[category]),
                    style: {
                        borderRadius: "6px",
                        marginBottom: "4px",
                        border: "1px solid #f0f0f0",
                        paddingLeft: "6px",
                        paddingRight: "6px",
                    },
                })) }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sidebar);


/***/ },

/***/ "./lib/ViewData.js"
/*!*************************!*\
  !*** ./lib/ViewData.js ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   viewData: () => (/* binding */ viewData)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amphi/pipeline-components-manager */ "webpack/sharing/consume/default/@amphi/pipeline-components-manager");
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "webpack/sharing/consume/default/react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons */ "./lib/icons.js");
/* harmony import */ var react_laag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-laag */ "../../node_modules/react-laag/dist/react-laag.esm.js");
/* harmony import */ var _glideapps_glide_data_grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @glideapps/glide-data-grid */ "../../node_modules/@glideapps/glide-data-grid/dist/esm/internal/data-grid/data-grid-types.js");
/* harmony import */ var _glideapps_glide_data_grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @glideapps/glide-data-grid */ "../../node_modules/@glideapps/glide-data-grid/dist/esm/data-editor-all.js");




 // Re-using your icon

// You can reuse the same "DataView" React component you already have,
// or simply include it inline below. For clarity, I'm showing an inline version.
// If you already have "DataView.tsx", just import it. We'll place it here for demonstration.


function DataView({ htmlData }) {
    const [pixelRatio, setPixelRatio] = react__WEBPACK_IMPORTED_MODULE_2___default().useState(() => window.devicePixelRatio);
    const [rowsData, setRowsData] = react__WEBPACK_IMPORTED_MODULE_2___default().useState([]);
    const [gridColumns, setGridColumns] = react__WEBPACK_IMPORTED_MODULE_2___default().useState([]);
    const [originalHeaders, setOriginalHeaders] = react__WEBPACK_IMPORTED_MODULE_2___default().useState([]);
    const zeroBounds = { left: 0, top: 0, width: 0, height: 0, right: 0, bottom: 0 };
    const [tooltip, setTooltip] = react__WEBPACK_IMPORTED_MODULE_2___default().useState();
    const timeoutRef = react__WEBPACK_IMPORTED_MODULE_2___default().useRef(0);
    // clear pending timeout on unmount
    react__WEBPACK_IMPORTED_MODULE_2___default().useEffect(() => () => window.clearTimeout(timeoutRef.current), []);
    react__WEBPACK_IMPORTED_MODULE_2___default().useEffect(() => {
        const handleResize = () => {
            if (window.devicePixelRatio !== pixelRatio) {
                setPixelRatio(window.devicePixelRatio);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [pixelRatio]);
    const getOptimalColumnWidth = (title) => {
        // Approximate width (8px per char + 40px padding)
        return Math.min(Math.max(title.length * 8 + 40, 80), 200);
    };
    react__WEBPACK_IMPORTED_MODULE_2___default().useEffect(() => {
        const { data, headers } = htmlToJson(htmlData);
        setOriginalHeaders(headers);
        // Clean up "<NA>"
        const cleanedData = data.map(row => {
            const cleanRow = { ...row };
            Object.keys(cleanRow).forEach(key => {
                if (cleanRow[key] === "<NA>" || cleanRow[key] === "null") {
                    cleanRow[key] = "";
                }
            });
            return cleanRow;
        });
        const updatedColumns = headers.map((header) => {
            if (!header.trim()) {
                return { title: header, width: getOptimalColumnWidth(header) };
            }
            // Attempt to parse for "ColumnName (Type)"
            const match = header.match(/^(.*?)\s*\((.*?)\)\s*$/);
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
    const onColumnResize = react__WEBPACK_IMPORTED_MODULE_2___default().useCallback((_column, newSize, colIndex) => {
        setGridColumns((prev) => {
            const updated = [...prev];
            updated[colIndex] = { ...updated[colIndex], width: newSize };
            return updated;
        });
    }, []);
    const getCellContent = react__WEBPACK_IMPORTED_MODULE_2___default().useCallback(([col, row]) => {
        var _a;
        if (row >= rowsData.length || col >= gridColumns.length) {
            return { kind: _glideapps_glide_data_grid__WEBPACK_IMPORTED_MODULE_6__.GridCellKind.Text, data: "", displayData: "", allowOverlay: false };
        }
        const columnKey = originalHeaders[col];
        const value = (_a = rowsData[row][columnKey]) !== null && _a !== void 0 ? _a : "";
        return {
            kind: _glideapps_glide_data_grid__WEBPACK_IMPORTED_MODULE_6__.GridCellKind.Text,
            data: value,
            displayData: value,
            allowOverlay: false
        };
    }, [gridColumns, rowsData, originalHeaders]);
    const onItemHovered = react__WEBPACK_IMPORTED_MODULE_2___default().useCallback((args) => {
        if (args.kind !== "header") {
            window.clearTimeout(timeoutRef.current);
            setTooltip(undefined);
            return;
        }
        window.clearTimeout(timeoutRef.current);
        setTooltip(undefined);
        const col = args.location[0];
        timeoutRef.current = window.setTimeout(() => {
            var _a, _b;
            if (col >= gridColumns.length)
                return;
            const raw = originalHeaders[col];
            const type = (_b = (_a = raw.match(/\((.+?)\)/)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : "string";
            const { x, y, width, height } = args.bounds;
            setTooltip({
                val: type,
                bounds: { left: x, top: y, width, height, right: x + width, bottom: y + height }
            });
        }, 800); // delay (ms)
    }, [gridColumns, originalHeaders]);
    // Create icons for header
    const headerIcons = react__WEBPACK_IMPORTED_MODULE_2___default().useMemo(() => {
        return {
            string: (p) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="${p.bgColor}" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 16v-6a2 2 0 1 1 4 0v6" />
          <path d="M3 13h4" />
          <path d="M10 8v6a2 2 0 1 0 4 0v-1a2 2 0 1 0 -4 0v1" />
          <path d="M20.732 12a2 2 0 0 0 -3.732 1v1a2 2 0 0 0 3.726 1.01" />
        </svg>`,
            number: (p) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="${p.bgColor}" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 10l2 -2v8" />
          <path d="M9 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2
          a1 1 0 0 0 1 1h3" />
          <path d="M17 8h2.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1 -1.5 1.5h-1.5
          h1.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1 -1.5 1.5h-2.5" />
        </svg>`,
            decimal: (p) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="${p.bgColor}" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M17 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2z" />
          <path d="M10 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2z" />
          <path d="M5 16h.01" />
        </svg>`,
            datetime: (p) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="${p.bgColor}" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2
          2 0 0 1 2 2v4" />
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
    const { renderLayer, layerProps } = (0,react_laag__WEBPACK_IMPORTED_MODULE_5__.useLayer)({
        isOpen: !!tooltip,
        triggerOffset: 8,
        placement: "top-center",
        auto: true,
        trigger: { getBounds: () => { var _a; return (_a = tooltip === null || tooltip === void 0 ? void 0 : tooltip.bounds) !== null && _a !== void 0 ? _a : zeroBounds; } }
    });
    return (react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { style: { position: "relative", width: "100%", height: "100%" } },
        react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_glideapps_glide_data_grid__WEBPACK_IMPORTED_MODULE_7__.DataEditorAll, { key: pixelRatio, columns: gridColumns, minColumnWidth: 100, getCellContent: getCellContent, onItemHovered: onItemHovered, rows: rowsData.length, rowMarkers: "both", onColumnResize: onColumnResize, smoothScrollX: false, smoothScrollY: false, experimental: { strict: false, renderStrategy: "direct" }, headerIcons: headerIcons, getCellsForSelection: true, theme: react__WEBPACK_IMPORTED_MODULE_2___default().useMemo(() => ({
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
        tooltip &&
            renderLayer(react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", { ...layerProps, style: {
                    ...layerProps.style,
                    padding: "8px 12px",
                    color: "#fff",
                    background: "rgba(0,0,0,0.85)",
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
                    borderRadius: 7,
                    maxWidth: 280,
                    zIndex: 9999,
                    whiteSpace: "pre-wrap"
                } }, tooltip.val))));
}
// Utility to parse HTML table into JSON rows & headers
function htmlToJson(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    // Get all header cells and remove the first (index) column
    const allHeaderCells = Array.from(doc.querySelectorAll("table thead th"));
    const headers = allHeaderCells.slice(1).map(th => { var _a, _b; return (_b = (_a = th.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : ""; });
    // Process each row, skipping the first cell (index column)
    const rows = doc.querySelectorAll("table tbody tr");
    const data = Array.from(rows, (row) => {
        const cells = row.querySelectorAll("th, td");
        const rowObj = {};
        headers.forEach((header, idx) => {
            var _a, _b, _c;
            // Corresponding cell index is offset by 1 to skip the index column
            rowObj[header] = (_c = (_b = (_a = cells[idx + 1]) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : "";
        });
        return rowObj;
    });
    return { data, headers };
}
// Build a small lumino panel that renders the React DataView component
class DataViewPanel extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.StackedPanel {
    constructor(htmlData) {
        super();
        this.id = 'datagrid-viewer';
        this.title.label = 'Data Browser';
        this.title.closable = true;
        this.title.icon = _icons__WEBPACK_IMPORTED_MODULE_4__.gridAltIcon;
        // Render the React component into this panel's DOM node
        react_dom__WEBPACK_IMPORTED_MODULE_3___default().render(react__WEBPACK_IMPORTED_MODULE_2___default().createElement(DataView, { htmlData: htmlData }), this.node);
    }
}
// Convert the "table" oriented JSON to an HTML string so our existing DataView can parse it
function modelToHTMLTable(jsonModel) {
    // The "table" orient JSON has a "schema" and "data" array
    const fields = jsonModel.schema.fields; // typed column objects
    const tableRows = jsonModel.data; // array of row objects
    // Construct <thead> with typed columns
    let thead = '<thead><tr>';
    for (const field of fields) {
        const headerTitle = field.name || '';
        thead += `<th>${headerTitle}</th>`;
    }
    thead += '</tr></thead>';
    // Construct <tbody>
    let tbody = '<tbody>';
    for (const row of tableRows) {
        tbody += '<tr>';
        for (const field of fields) {
            const colName = field.name;
            tbody += `<td>${row[colName] !== undefined ? row[colName] : ''}</td>`;
        }
        tbody += '</tr>';
    }
    tbody += '</tbody>';
    return `<table>${thead}${tbody}</table>`;
}
/**
 * Main entry point to view data with glide-data-grid
 */
async function viewData(nodeId, context, commands, app) {
    var _a;
    try {
        // Run pipeline until the node
        await commands.execute('pipeline-editor:run-pipeline-until', {
            nodeId: nodeId,
            context: context
        });
        // Retrieve node info
        const nodeJson = _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_1__.PipelineService.getNodeById(context.model.toString(), nodeId);
        const varName = nodeJson.data.nameId;
        if (!varName) {
            console.error('Variable name not found for the selected component.');
            return;
        }
        const kernel = (_a = context.sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel;
        if (!kernel) {
            console.error('Kernel is not available.');
            return;
        }
        // Execute in kernel to get JSON "table" data
        const code = `_amphi_metadatapanel_getmatrixcontent(${varName}, 10000)`;
        const future = kernel.requestExecute({ code, stop_on_error: false, store_history: false });
        future.onIOPub = (msg) => {
            const msgType = msg.header.msg_type;
            if (msgType === 'execute_result') {
                const payload = msg.content;
                let content = payload.data['text/plain'];
                // Clean up the escaping
                content = content.replace(/^'|'$/g, '');
                content = content.replace(/\\"/g, '"');
                // Parse as JSON
                const modelOptions = JSON.parse(content);
                // Convert that to an HTML table with typed columns
                const htmlData = modelToHTMLTable(modelOptions);
                // Build and attach a React-based panel
                const panel = new DataViewPanel(htmlData);
                const logConsoleId = 'amphi-logConsole';
                let logConsolePanel = null;
                for (const widget of app.shell.widgets('main')) {
                    if (widget.id === logConsoleId) {
                        logConsolePanel = widget;
                        break;
                    }
                }
                // If console panel is open, show the panel as tab-after
                if (logConsolePanel && logConsolePanel.isAttached) {
                    if (!panel.isAttached) {
                        app.shell.add(panel, 'main', { ref: logConsolePanel.id, mode: 'tab-after' });
                    }
                }
                else {
                    // Otherwise, split-bottom
                    if (!panel.isAttached) {
                        app.shell.add(panel, 'main', { mode: 'split-bottom' });
                    }
                }
                app.shell.activateById(panel.id);
            }
            else if (msgType === 'error') {
                console.error("Kernel error on 'matrixQuery' call!");
            }
        };
        future.onReply = (_msg) => { };
        future.onDone = () => { };
    }
    catch (error) {
        console.error('Error viewing data:', error);
    }
}


/***/ },

/***/ "./lib/customEdge.js"
/*!***************************!*\
  !*** ./lib/customEdge.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CustomEdge)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactflow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactflow */ "webpack/sharing/consume/default/reactflow/reactflow");


const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
    alert(`remove ${id}`);
};
function CustomEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd, }) {
    const { setEdges } = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.useReactFlow)();
    const [edgePath, labelX, labelY] = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.getBezierPath)({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const onEdgeClick = () => {
        setEdges((edges) => edges.filter((edge) => edge.id !== id));
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(reactflow__WEBPACK_IMPORTED_MODULE_1__.BaseEdge, { path: edgePath, markerEnd: markerEnd, style: style }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(reactflow__WEBPACK_IMPORTED_MODULE_1__.EdgeLabelRenderer, null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: {
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    fontSize: 12,
                    // everything inside EdgeLabelRenderer has no pointer events by default
                    // if you have an interactive element, set pointer-events: all
                    pointerEvents: 'all',
                }, className: "nodrag nopan" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "edgebutton", onClick: onEdgeClick }, "\u00D7")))));
}


/***/ },

/***/ "./lib/icons.js"
/*!**********************!*\
  !*** ./lib/icons.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alignIcon: () => (/* binding */ alignIcon),
/* harmony export */   apiIcon: () => (/* binding */ apiIcon),
/* harmony export */   componentIcon: () => (/* binding */ componentIcon),
/* harmony export */   dagsterIcon: () => (/* binding */ dagsterIcon),
/* harmony export */   exportIcon: () => (/* binding */ exportIcon),
/* harmony export */   filePlusIcon: () => (/* binding */ filePlusIcon),
/* harmony export */   fileTextIcon: () => (/* binding */ fileTextIcon),
/* harmony export */   gridAltIcon: () => (/* binding */ gridAltIcon),
/* harmony export */   monitorIcon: () => (/* binding */ monitorIcon),
/* harmony export */   pipelineBrandIcon: () => (/* binding */ pipelineBrandIcon),
/* harmony export */   pipelineCategoryIcon: () => (/* binding */ pipelineCategoryIcon),
/* harmony export */   pipelineIcon: () => (/* binding */ pipelineIcon),
/* harmony export */   refreshIcon: () => (/* binding */ refreshIcon)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_icons_file_text_24_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/icons/file-text-24.svg */ "./style/icons/file-text-24.svg");
/* harmony import */ var _style_icons_file_plus_24_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/icons/file-plus-24.svg */ "./style/icons/file-plus-24.svg");
/* harmony import */ var _style_icons_monitor_24_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/icons/monitor-24.svg */ "./style/icons/monitor-24.svg");
/* harmony import */ var _style_icons_api_24_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/icons/api-24.svg */ "./style/icons/api-24.svg");
/* harmony import */ var _style_icons_pipeline_brand_24_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/icons/pipeline-brand-24.svg */ "./style/icons/pipeline-brand-24.svg");
/* harmony import */ var _style_icons_pipeline_brand_16_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style/icons/pipeline-brand-16.svg */ "./style/icons/pipeline-brand-16.svg");
/* harmony import */ var _style_icons_node_24_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/icons/node-24.svg */ "./style/icons/node-24.svg");
/* harmony import */ var _style_icons_align_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../style/icons/align.svg */ "./style/icons/align.svg");
/* harmony import */ var _style_icons_export_svg_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../style/icons/export-svg.svg */ "./style/icons/export-svg.svg");
/* harmony import */ var _style_icons_grid_alt_24_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../style/icons/grid-alt-24.svg */ "./style/icons/grid-alt-24.svg");
/* harmony import */ var _style_icons_dagster_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../style/icons/dagster.svg */ "./style/icons/dagster.svg");
/* harmony import */ var _style_icons_refresh_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../style/icons/refresh.svg */ "./style/icons/refresh.svg");













const refreshIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:refresh',
    svgstr: _style_icons_refresh_svg__WEBPACK_IMPORTED_MODULE_12__
});
const fileTextIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:file-text-icon',
    svgstr: _style_icons_file_text_24_svg__WEBPACK_IMPORTED_MODULE_1__
});
const filePlusIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:file-plus-icon',
    svgstr: _style_icons_file_plus_24_svg__WEBPACK_IMPORTED_MODULE_2__
});
const monitorIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:monitor-icon',
    svgstr: _style_icons_monitor_24_svg__WEBPACK_IMPORTED_MODULE_3__
});
const apiIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:api-icon',
    svgstr: _style_icons_api_24_svg__WEBPACK_IMPORTED_MODULE_4__
});
const pipelineIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:pipeline-icon',
    svgstr: _style_icons_pipeline_brand_16_svg__WEBPACK_IMPORTED_MODULE_6__
});
const componentIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:component-icon',
    svgstr: _style_icons_node_24_svg__WEBPACK_IMPORTED_MODULE_7__
});
const pipelineBrandIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:pipelinenegative-icon',
    svgstr: _style_icons_pipeline_brand_16_svg__WEBPACK_IMPORTED_MODULE_6__
});
const pipelineCategoryIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:pipelineCategory-icon',
    svgstr: _style_icons_pipeline_brand_24_svg__WEBPACK_IMPORTED_MODULE_5__
});
const alignIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:align-icon',
    svgstr: _style_icons_align_svg__WEBPACK_IMPORTED_MODULE_8__
});
const exportIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:export-svg-icon',
    svgstr: _style_icons_export_svg_svg__WEBPACK_IMPORTED_MODULE_9__
});
const gridAltIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:grid-alt-icon',
    svgstr: _style_icons_grid_alt_24_svg__WEBPACK_IMPORTED_MODULE_10__
});
const dagsterIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:dagster-icon',
    svgstr: _style_icons_dagster_svg__WEBPACK_IMPORTED_MODULE_11__
});


/***/ },

/***/ "./lib/index.js"
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IPipelineTracker: () => (/* binding */ IPipelineTracker),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/mainmenu */ "webpack/sharing/consume/default/@jupyterlab/mainmenu");
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/launcher */ "webpack/sharing/consume/default/@jupyterlab/launcher");
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/filebrowser */ "webpack/sharing/consume/default/@jupyterlab/filebrowser");
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jupyterlab/statusbar */ "webpack/sharing/consume/default/@jupyterlab/statusbar");
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jupyterlab/docmanager */ "webpack/sharing/consume/default/@jupyterlab/docmanager");
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./version */ "./lib/version.js");
/* harmony import */ var _AboutDialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./AboutDialog */ "./lib/AboutDialog.js");
/* harmony import */ var _RunService__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./RunService */ "./lib/RunService.js");
/* harmony import */ var _ViewData__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ViewData */ "./lib/ViewData.js");
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @amphi/pipeline-components-manager */ "webpack/sharing/consume/default/@amphi/pipeline-components-manager");
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./icons */ "./lib/icons.js");
/* harmony import */ var _PipelineEditorWidget__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./PipelineEditorWidget */ "./lib/PipelineEditorWidget.js");
/* harmony import */ var _ErrorModal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ErrorModal */ "./lib/ErrorModal.js");
/* harmony import */ var _ExecutionService__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ExecutionService */ "./lib/ExecutionService.js");
/* harmony import */ var posthog_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! posthog-js */ "webpack/sharing/consume/default/posthog-js/posthog-js");





















/**
 * The command IDs used by the Amphi pipeline editor plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.create = "pipeline-editor:create-new";
    CommandIDs.restartPipelineKernel = "pipeline-editor:restart-kernel";
    CommandIDs.runPipeline = "pipeline-editor:run-pipeline";
    CommandIDs.runPipelineUntil = "pipeline-editor:run-pipeline-until";
    CommandIDs.runIncrementalPipeline = "pipeline-editor:run-incremental-pipeline";
    CommandIDs.runIncrementalPipelineUntil = "pipeline-editor:run-incremental-pipeline-until";
    CommandIDs.generateCode = "pipeline-editor:generate-code";
})(CommandIDs || (CommandIDs = {}));
const PIPELINE_FACTORY = "Pipeline Editor";
const PIPELINE = "amphi-pipeline";
const PIPELINE_EDITOR_NAMESPACE = "amphi-pipeline-editor";
const EXTENSION_ID = "@amphi/pipeline-editor:extension";
const EXTENSION_TRACKER = "pipeline-editor-tracker";
// Export a token so other extensions can require it
const IPipelineTracker = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_8__.Token(EXTENSION_TRACKER);
/**
 * Initialization data for the Pipeline Editor (DocumentWidget) extension.
 */
const pipelineEditor = {
    id: EXTENSION_ID,
    autoStart: true,
    requires: [
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette,
        _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_6__.IRenderMimeRegistry,
        _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_4__.ILauncher,
        _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_5__.IFileBrowserFactory,
        _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_5__.IDefaultFileBrowser,
        _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_7__.IStatusBar,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer,
        _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_2__.IMainMenu,
        _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__.ISettingRegistry,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IToolbarWidgetRegistry,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ISessionContextDialogs,
        _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_9__.IDocumentManager,
        _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_14__.ComponentManager,
        _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_14__.IPipelineExecutionToken,
    ],
    provides: IPipelineTracker,
    activate: (app, palette, rendermimeRegistry, launcher, browserFactory, defaultFileBrowser, statusBar, restorer, menu, settings, toolbarRegistry, sessionDialogs, manager, componentService, executionService) => {
        console.log("Amphi Pipeline Extension activation...");
        // 立即隐藏组件面板图标
        const hideComponentsPanel = () => {
            document.querySelectorAll('.lm-TabBar-tab[data-id="amphi-components-panel"]').forEach((tab) => {
                tab.style.cssText =
                    "display: none !important; visibility: hidden !important; width: 0 !important; height: 0 !important; padding: 0 !important; margin: 0 !important; border: none !important;";
            });
        };
        // 立即执行
        hideComponentsPanel();
        // DOM 加载完成后再次执行
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", hideComponentsPanel);
        }
        else {
            hideComponentsPanel();
        }
        // 持续监听
        const observer = new MutationObserver(hideComponentsPanel);
        observer.observe(document.documentElement, { childList: true, subtree: true });
        // 原有代码继续...
        console.log("Amphi Pipeline Extension activation...");
        // Get app commands and define create-pipeline command
        const { commands } = app;
        const command = CommandIDs.create;
        // Pipeline Tracker
        const pipelineEditortracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
            namespace: PIPELINE_EDITOR_NAMESPACE,
        });
        let enableExecution;
        let enableDebugMode;
        let enableTelemetry;
        let defaultEngineBackend;
        // Fetch the initial state of the settings.
        function loadSetting(setting) {
            // Read the settings and convert to the correct type
            enableExecution = setting.get("enableExecution").composite;
            console.log(`Settings extension: enableExecution is set to '${enableExecution}'`);
            enableDebugMode = setting.get("enableDebugMode").composite;
            console.log(`Settings extension: enableDebugMode is set to '${enableDebugMode}'`);
            defaultEngineBackend = setting.get("defaultEngineBackend").composite;
            console.log(`Settings extension: defaultEngineBackend is set to '${defaultEngineBackend}'`);
            enableTelemetry = setting.get("enableTelemetry").composite;
            console.log(`Settings extension: enableTelemetry is set to '${enableTelemetry}'`);
        }
        function maskedSensitiveParams(url) {
            try {
                const parsedUrl = new URL(url);
                return `${parsedUrl.protocol}//${parsedUrl.host}`;
            }
            catch (error) {
                // Return original URL if parsing fails
                return url;
            }
        }
        Promise.all([app.restored, settings.load(EXTENSION_ID)])
            .then(([, settings]) => {
            // Read the settings
            loadSetting(settings);
            // Listen for your plugin setting changes using Signal
            settings.changed.connect(loadSetting);
            let componentPalette = settings.get("componentPalette").composite;
            console.log(`Settings extension: componentPalette is set to '${componentPalette}'`);
            let enableTelemetry = settings.get("enableTelemetry").composite;
            if (enableTelemetry) {
                posthog_js__WEBPACK_IMPORTED_MODULE_19__["default"].init("phc_V56mYhYAQdzJl5tMM2RFedJWbXlbyxDnSj2KMbUX8x3", {
                    api_host: "https://us.i.posthog.com",
                    autocapture: false,
                    person_profiles: "always",
                    sanitize_properties: function (properties, _event) {
                        // Sanitize current url
                        if (properties[`$current_url`]) {
                            properties[`$current_url`] = maskedSensitiveParams(properties[`$current_url`]);
                        }
                        // Remove path name
                        if (properties[`$path_name`]) {
                            properties[`$path_name`] = "";
                        }
                        return properties;
                    },
                });
            }
            // Set up new widget Factory for .ampln files
            const pipelineEditorFactory = new _PipelineEditorWidget__WEBPACK_IMPORTED_MODULE_16__.PipelineEditorFactory({
                app: app,
                name: PIPELINE_FACTORY,
                fileTypes: [PIPELINE],
                defaultFor: [PIPELINE],
                canStartKernel: true,
                preferKernel: true,
                shutdownOnClose: true,
                // shell: app.shell,
                toolbarRegistry: toolbarRegistry,
                // commands: app.commands,
                rendermime: rendermimeRegistry,
                browserFactory: browserFactory,
                defaultFileBrowser: defaultFileBrowser,
                // serviceManager: app.serviceManager,
                settings: settings,
                componentService: componentService,
                executionService: executionService,
            });
            // Add the widget to the tracker when it's created
            pipelineEditorFactory.widgetCreated.connect((sender, widget) => {
                pipelineEditortracker.add(widget);
                // Notify the widget tracker if restore data needs to update
                widget.context.pathChanged.connect(() => {
                    pipelineEditortracker.save(widget);
                });
            });
            // Add the default behavior of opening the widget for .ampln files
            // First the Pipeline and then JSON (available)
            app.docRegistry.addFileType({
                name: "amphi-pipeline",
                displayName: "pipeline",
                extensions: [".ampln"],
                icon: _icons__WEBPACK_IMPORTED_MODULE_15__.pipelineBrandIcon,
                fileFormat: "text",
            }, [PIPELINE_FACTORY, "JSON"]);
            app.docRegistry.addWidgetFactory(pipelineEditorFactory);
            app.docRegistry.addFileType({
                name: "amphi-component",
                displayName: "component",
                extensions: [".amcpn"],
                icon: _icons__WEBPACK_IMPORTED_MODULE_15__.componentIcon,
                fileFormat: "text",
            }, ["JSON"]);
            app.docRegistry.addFileType({
                name: "amphi-component",
                displayName: "component",
                extensions: [".amcpn"],
                icon: _icons__WEBPACK_IMPORTED_MODULE_15__.componentIcon,
                fileFormat: "text",
            }, ["JSON"]);
            // Add command to create new Pipeline
            commands.addCommand(command, {
                label: (args) => (args["isPalette"] || args["isContextMenu"] ? "New Pipeline" : "New Pipeline"),
                caption: "Create a new pipeline",
                icon: (args) => (args["isPalette"] ? null : _icons__WEBPACK_IMPORTED_MODULE_15__.pipelineCategoryIcon),
                execute: async (args) => {
                    return commands
                        .execute(_PipelineEditorWidget__WEBPACK_IMPORTED_MODULE_16__.commandIDs.newDocManager, {
                        type: "file",
                        path: defaultFileBrowser.model.path,
                        ext: ".ampln",
                    })
                        .then(async (model) => {
                        const runtime_type = "LOCAL";
                        const getPipelineId = () => `pipeline_${+new Date()}`;
                        const pipelineJson = {
                            doc_type: "Amphi Pipeline",
                            version: "1",
                            id: getPipelineId(),
                            pipelines: [
                                {
                                    id: "primary",
                                    flow: {
                                        nodes: [],
                                        edges: [],
                                        viewport: {
                                            x: 0,
                                            y: 0,
                                            zoom: 1,
                                        },
                                    },
                                    app_data: {
                                        ui_data: {
                                            comments: [],
                                        },
                                        version: 1,
                                        runtime_type,
                                    },
                                    runtime_ref: "python",
                                },
                            ],
                        };
                        // Open Pipeline using Pipeline EditorFactory
                        const newWidget = await app.commands.execute(_PipelineEditorWidget__WEBPACK_IMPORTED_MODULE_16__.commandIDs.openDocManager, {
                            path: model.path,
                            factory: PIPELINE_FACTORY, // Use PipelineEditorFactory
                        });
                        // Assign to the new widget context the pipeline JSON from above
                        newWidget.context.ready.then(() => {
                            newWidget.context.model.fromJSON(pipelineJson);
                            // Save this in the file
                            app.commands.execute(_PipelineEditorWidget__WEBPACK_IMPORTED_MODULE_16__.commandIDs.saveDocManager, {
                                path: model.path,
                            });
                        });
                    });
                },
            });
            // Get the current widget and activate unless the args specify otherwise.
            function getCurrent(args) {
                const widget = pipelineEditortracker.currentWidget;
                const activate = args["activate"] !== false;
                if (activate && widget) {
                    app.shell.activateById(widget.id);
                }
                return widget !== null && widget !== void 0 ? widget : null;
            }
            function isEnabled() {
                return pipelineEditortracker.currentWidget !== null && pipelineEditortracker.currentWidget === app.shell.currentWidget;
            }
            /**
             * Restart the Pipeline Kernel linked to the current Editor
             */
            commands.addCommand(CommandIDs.restartPipelineKernel, {
                label: "Restart Runtime…",
                execute: async (args) => {
                    const current = getCurrent({ activate: false, ...args });
                    if (!current) {
                        return;
                    }
                    // Show pending notification
                    const notificationId = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification.emit("Restarting environment...", "in-progress", { autoClose: false });
                    try {
                        await current.context.sessionContext.restartKernel();
                        // Dismiss pending notification
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification.dismiss(notificationId);
                        // Show success notification
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification.success("Environment restarted successfully.", {
                            autoClose: 3000,
                        });
                    }
                    catch (error) {
                        console.error("Failed to restart runtime: ", error);
                        // Dismiss pending notification
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification.dismiss(notificationId);
                        // Show error notification
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification.error("Failed to restart environment.", {
                            autoClose: 5000,
                        });
                    }
                },
                isEnabled,
            });
            commands.addCommand(CommandIDs.generateCode, {
                label: "Generate Code",
                /**
                 * Args: { json: string } – `json` is the JSON description of the pipeline.
                 * Returns the generated code string.
                 */
                execute: async (args) => {
                    const json = args.json;
                    if (!json) {
                        console.error('generateCode requires a "json" argument.');
                        return;
                    }
                    try {
                        const code = _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_14__.CodeGenerator.generateCode(json, commands, componentService, false);
                        return code; // callers can handle the resulting code as needed
                    }
                    catch (err) {
                        console.error("Failed to generate code:", err);
                    }
                },
            });
            /**
             * Run Pipeline on Kernel linked to the current Editor
             */
            // Command Registration
            commands.addCommand(CommandIDs.runPipeline, {
                label: "Run Pipeline",
                execute: async (args) => {
                    // Make the execute function async
                    try {
                        // Main Execution Flow
                        if (args.datapanel) {
                            _RunService__WEBPACK_IMPORTED_MODULE_12__.RunService.executeCommand(commands, "metadatapanel:open");
                        }
                        else {
                            _RunService__WEBPACK_IMPORTED_MODULE_12__.RunService.executeCommand(commands, "pipeline-console:open");
                        }
                        const current = getCurrent(args);
                        if (!current) {
                            return;
                        }
                        if (!_RunService__WEBPACK_IMPORTED_MODULE_12__.RunService.checkSessionAndKernel(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification, current)) {
                            return;
                        }
                        // Install dependencies if needed
                        await current.context.sessionContext.ready; // Await the readiness
                        const code = args.code.toString();
                        const packages = _RunService__WEBPACK_IMPORTED_MODULE_12__.RunService.extractDependencies(code);
                        if (packages.length > 0 && packages[0] !== "") {
                            const pips_code = _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_14__.PipelineService.getInstallCommandsFromPackageNames(packages).join("\n");
                            const enableDebugMode = settings.get("enableDebugMode").composite;
                            if (enableDebugMode) {
                                console.log("Dependencies to be installed: %o", pips_code);
                            }
                            await _RunService__WEBPACK_IMPORTED_MODULE_12__.RunService.executeKernelCode(current.context.sessionContext.session, pips_code);
                        }
                        // Run pipeline code
                        const pythonCodeWithSleep = `
import time
time.sleep(0.25)
${args.code}
`;
                        const notificationOptions = {
                            pending: { message: "Running...", options: { autoClose: false } },
                            success: {
                                message: (result) => `Pipeline execution successful after ${result.delayInSeconds} seconds.`,
                                options: {
                                    autoClose: 3000,
                                },
                            },
                            error: {
                                message: () => "Pipeline execution failed. Check error messages in the Log Console.",
                                options: {
                                    actions: [
                                        {
                                            label: "Log Console",
                                            callback: () => {
                                                _RunService__WEBPACK_IMPORTED_MODULE_12__.RunService.executeCommand(commands, "pipeline-console:open");
                                            },
                                        },
                                    ],
                                    autoClose: 5000,
                                },
                            },
                        };
                        await _RunService__WEBPACK_IMPORTED_MODULE_12__.RunService.executeKernelCodeWithNotifications(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification, current.context.sessionContext.session, pythonCodeWithSleep, notificationOptions);
                    }
                    catch (error) {
                        console.error("Error in runPipeline command:", error);
                        throw error; // Propagate the error to allow .catch() to handle it
                    }
                },
                isEnabled,
            });
            commands.addCommand(CommandIDs.runPipelineUntil, {
                label: "Run pipeline until ...",
                execute: async (args) => {
                    const current = getCurrent(args);
                    if (!current) {
                        throw new Error("No current context available.");
                    }
                    const nodeId = args.nodeId.toString();
                    const context = args.context;
                    let codeList;
                    let code;
                    // Only catch code generation errors for the error modal
                    try {
                        codeList = _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_14__.CodeGenerator.generateCodeUntil(current.context.model.toString(), commands, componentService, nodeId, false, false);
                        code = codeList.join("\n");
                    }
                    catch (error) {
                        console.error(`Code generation failed:`, error);
                        (0,_ErrorModal__WEBPACK_IMPORTED_MODULE_17__.showErrorModal)(error, "Failed to generate code for running pipeline until selected component");
                        throw error;
                    }
                    // Execute the pipeline (runtime errors will be shown via notifications, not error modal)
                    await commands.execute("pipeline-editor:run-pipeline", { code });
                    if (enableTelemetry) {
                        posthog_js__WEBPACK_IMPORTED_MODULE_19__["default"].capture("run_pipeline", {
                            pipeline_metadata: current.context.model.toString(),
                            run_type: "until_node",
                        });
                    }
                    console.log("Pipeline executed successfully");
                },
            });
            commands.addCommand(CommandIDs.runIncrementalPipelineUntil, {
                label: "Run incremental pipeline until ...",
                execute: async (args) => {
                    const current = getCurrent(args);
                    if (!current) {
                        return;
                    }
                    const nodeId = args.nodeId.toString();
                    const context = args.context;
                    let incrementalCodeList;
                    try {
                        // Generate the incremental list of code to run
                        incrementalCodeList = _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_14__.CodeGenerator.generateCodeUntil(current.context.model.toString(), commands, componentService, nodeId, true, false);
                    }
                    catch (error) {
                        console.error("Code generation failed for incremental pipeline execution:", error);
                        (0,_ErrorModal__WEBPACK_IMPORTED_MODULE_17__.showErrorModal)(error, "Failed to generate code for running incremental pipeline until selected component");
                        return;
                    }
                    // Notification options
                    const notificationOptions = {
                        pending: { message: "Running incremental code...", options: { autoClose: false } },
                        success: { message: "Code block executed successfully.", options: { autoClose: 3000 } },
                        error: {
                            message: () => "Execution failed. Stopping pipeline.",
                            options: {
                                actions: [
                                    {
                                        label: "Log Console",
                                        callback: () => _RunService__WEBPACK_IMPORTED_MODULE_12__.RunService.executeCommand(commands, "pipeline-console:open"),
                                    },
                                ],
                                autoClose: 5000,
                            },
                        },
                    };
                    // Iterate over each incremental code block and execute
                    for (const codeBlock of incrementalCodeList) {
                        const code = codeBlock.code;
                        const pythonCodeWithSleep = `
import time
time.sleep(0.25)
${code}
`;
                        try {
                            await _RunService__WEBPACK_IMPORTED_MODULE_12__.RunService.executeKernelCodeWithNotifications(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification, current.context.sessionContext.session, pythonCodeWithSleep, notificationOptions);
                            const nodeId = codeBlock.nodeId;
                        }
                        catch (error) {
                            console.error(`Execution failed for code block: ${pythonCodeWithSleep}`, error);
                            // Stop execution if a block fails
                            break;
                        }
                    }
                },
            });
            commands.addCommand(CommandIDs.runIncrementalPipeline, {
                label: "Run Incremental Pipeline",
                execute: async (args) => {
                    const current = getCurrent(args);
                    if (!current) {
                        return;
                    }
                    // Clear all execution badges before starting
                    executionService.clearAllExecutionData();
                    // Open console to show progress
                    _RunService__WEBPACK_IMPORTED_MODULE_12__.RunService.executeCommand(commands, "pipeline-console:open");
                    // Get all nodes in the pipeline
                    const flow = _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_14__.PipelineService.filterPipeline(current.context.model.toString());
                    const { nodesToTraverse } = _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_14__.CodeGenerator.computeNodesToTraverse(flow, "none", // 'none' means all nodes
                    componentService);
                    // Track total components and current progress
                    const totalComponents = nodesToTraverse.length;
                    let currentComponent = 0;
                    let executionFailed = false;
                    // Iterate over each node and execute it
                    for (const nodeId of nodesToTraverse) {
                        currentComponent++;
                        console.log(`[${currentComponent}/${totalComponents}] Executing component: ${nodeId}`);
                        // Report that execution is starting
                        executionService.reportExecution({
                            nodeId,
                            status: "running",
                            timestamp: Date.now(),
                            metadata: {},
                        });
                        let code;
                        try {
                            // Generate code up to this node (like runPipelineUntil does)
                            const codeList = _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_14__.CodeGenerator.generateCodeUntil(current.context.model.toString(), commands, componentService, nodeId, false, false);
                            code = codeList.join("\n");
                        }
                        catch (error) {
                            console.error(`[${currentComponent}/${totalComponents}] Code generation failed for component ${nodeId}:`, error);
                            const errorMessage = error.message || String(error) || "Code generation failed";
                            // Report failure
                            executionService.reportExecution({
                                nodeId,
                                status: "failed",
                                timestamp: Date.now(),
                                metadata: {
                                    errorMessage,
                                    errorType: "CodeGenerationError",
                                },
                            });
                            (0,_ErrorModal__WEBPACK_IMPORTED_MODULE_17__.showErrorModal)(error, `Failed to generate code for component ${currentComponent}/${totalComponents}`);
                            executionFailed = true;
                            break;
                        }
                        const startTime = Date.now();
                        try {
                            // Execute the component using the same mechanism as runPipeline
                            await commands.execute("pipeline-editor:run-pipeline", { code, datapanel: false });
                            const executionTime = (Date.now() - startTime) / 1000;
                            console.log(`[${currentComponent}/${totalComponents}] Component ${nodeId} executed successfully in ${executionTime.toFixed(2)}s`);
                            // Report success with execution time
                            executionService.reportExecution({
                                nodeId,
                                status: "success",
                                timestamp: Date.now(),
                                metadata: {
                                    executionTime,
                                },
                            });
                        }
                        catch (error) {
                            const executionTime = (Date.now() - startTime) / 1000;
                            console.error(`[${currentComponent}/${totalComponents}] Execution failed for component ${nodeId}:`, error);
                            const errorMessage = error.message || String(error) || "Execution failed";
                            // Report failure
                            executionService.reportExecution({
                                nodeId,
                                status: "failed",
                                timestamp: Date.now(),
                                metadata: {
                                    errorMessage,
                                    errorType: "ExecutionError",
                                    executionTime,
                                },
                            });
                            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification.error(`Pipeline stopped at component ${currentComponent}/${totalComponents}`, {
                                actions: [
                                    {
                                        label: "View Console",
                                        callback: () => _RunService__WEBPACK_IMPORTED_MODULE_12__.RunService.executeCommand(commands, "pipeline-console:open"),
                                    },
                                ],
                                autoClose: 8000,
                            });
                            executionFailed = true;
                            break;
                        }
                    }
                    // Show completion notification if all components executed successfully
                    if (!executionFailed && currentComponent === totalComponents) {
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification.success(`Pipeline completed: ${totalComponents} components executed successfully`, {
                            autoClose: 5000,
                        });
                    }
                    // Anonymous telemetry
                    if (enableTelemetry) {
                        posthog_js__WEBPACK_IMPORTED_MODULE_19__["default"].capture("run_pipeline", {
                            pipeline_metadata: current.context.model.toString(),
                            run_type: "incremental_full",
                            total_components: totalComponents,
                            executed_components: currentComponent,
                            success: !executionFailed,
                        });
                    }
                },
                isEnabled,
            });
            commands.addCommand("pipeline-editor:version", {
                label: "About Amphi",
                execute: () => {
                    const { title, body } = (0,_AboutDialog__WEBPACK_IMPORTED_MODULE_11__.createAboutDialog)(_version__WEBPACK_IMPORTED_MODULE_10__.LIB_VERSION);
                    return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                        title,
                        body,
                        buttons: [
                            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.createButton({
                                label: "Close",
                                className: "jp-About-button jp-mod-reject jp-mod-styled",
                            }),
                        ],
                    });
                },
            });
            // Add the command to the context menu
            app.contextMenu.addItem({
                command: CommandIDs.create,
                selector: ".jp-DirListing-content",
                rank: 100,
            });
            // Add to palette
            palette.addItem({
                command: CommandIDs.create,
                category: "Pipeline",
                args: { isPalette: true },
            });
            palette.addItem({
                command: "pipeline-editor:version",
                category: "Help",
                args: { isPalette: true },
            });
            palette.addItem({
                command: CommandIDs.generateCode,
                category: "Pipeline",
                args: { isPalette: true },
            });
            // Components //
            // ----
            // ----
            // Copy Paste
            //const { cut, copy, paste, bufferedNodes } = useCopyPaste();
            // const canCopy = nodes.some(({ selected }) => selected);
            // const canPaste = bufferedNodes.length > 0;
            commands.addCommand("pipeline-editor-component:save-as-file", {
                execute: async (args) => {
                    const current = getCurrent(args);
                    if (!current) {
                        return;
                    }
                    const contextNode = app.contextMenuHitTest((node) => !!node.dataset.id);
                    if (contextNode) {
                        const nodeId = contextNode.dataset.id; // Extract the node ID
                        // Assuming PipelineService.getNodeById is available
                        const nodeJson = _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_14__.PipelineService.getNodeById(current.context.model.toString(), nodeId);
                        // Extract data and type attributes
                        const { data, type } = nodeJson;
                        const { lastUpdated, lastExecuted, ...filteredData } = data;
                        const componentJson = JSON.stringify({ component: { data: filteredData, type } });
                        const file = await commands.execute("docmanager:new-untitled", { path: "/", type: "file", ext: ".amcpn" });
                        const doc = await commands.execute("docmanager:open", { path: file.path });
                        // Ensure the document context model is loaded
                        await doc.context.ready;
                        // Save componentJson string to the file
                        doc.context.model.fromString(componentJson);
                        await doc.context.save();
                        await commands.execute("docmanager:reload", { path: file.path });
                        await commands.execute("docmanager:rename");
                        // await commands.execute('docmanager:save', { path: file.path });
                    }
                },
                label: "Save component",
            });
            commands.addCommand("pipeline-editor-component:view-data", {
                execute: async (args) => {
                    const current = getCurrent(args);
                    if (!current) {
                        return;
                    }
                    const contextNode = app.contextMenuHitTest((node) => !!node.dataset.id);
                    if (contextNode) {
                        const nodeId = contextNode.dataset.id; // Extract the node ID
                        await (0,_ViewData__WEBPACK_IMPORTED_MODULE_13__.viewData)(nodeId, current.context, commands, app);
                    }
                    if (current.nodeId) {
                        await (0,_ViewData__WEBPACK_IMPORTED_MODULE_13__.viewData)(current.nodeId, current.context, commands, app);
                    }
                },
                label: "Browse Data",
            });
            commands.addCommand("pipeline-editor-component:override", {
                execute: async (args) => {
                    const contextNode = app.contextMenuHitTest((node) => !!node.dataset.id);
                    console.log("contextNode: %o", contextNode);
                    /*
              if (contextNode) {
                const nodeId = contextNode.dataset.id; // Extract the node ID
                const codeList = CodeGenerator.generateCodeUntil(
                  context.model.toString(),
                  commands,
                  componentService,
                  nodeId,
                  false,
                  false
                );
                    
              }
              */
                },
                label: "Override Code",
            });
            commands.addCommand("pipeline-editor-component:generate-ibis-code", {
                execute: async (args) => {
                    const current = getCurrent(args);
                    if (!current) {
                        return;
                    }
                    const contextNode = app.contextMenuHitTest((node) => !!node.dataset.id);
                    if (contextNode) {
                        const nodeId = contextNode.dataset.id; // Extract the node ID
                        commands
                            .execute("pipeline-editor:run-pipeline-until", { nodeId: nodeId, context: current.context })
                            .then((result) => {
                            const flow = _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_14__.PipelineService.filterPipeline(current.context.model.toString());
                            const { nodesToTraverse, nodesMap } = _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_14__.CodeGenerator.computeNodesToTraverse(flow, nodeId, componentService);
                            if (!nodesMap.has(nodeId)) {
                                console.error(`Node with ID ${nodeId} not found in nodesMap`);
                            }
                            else {
                                const targetNode = nodesMap[nodeId];
                                // const namedId = targetNode.data.namedId;
                            }
                            /*
                 RunService.executeKernelCode(
                   current.context.sessionContext.session,
                   `print(sql_code := ${namedId}.compile())`
                 );
                 */
                        })
                            .catch((reason) => {
                            console.error(`Error with pipeline, nodes not updated.'.\n${reason}`);
                        });
                    }
                },
                label: "Generate SQL code",
            });
            const contextMenuItems = [
                {
                    command: "pipeline-editor-component:save-as-file",
                    selector: ".component",
                    rank: 3,
                },
                {
                    command: "pipeline-editor-component:view-data",
                    selector: ".component",
                    rank: 4,
                },
                {
                    command: "pipeline-editor-component:generate-ibis-code",
                    selector: ".ibis",
                    rank: 7,
                },
            ];
            // Add each context menu item with the args function
            contextMenuItems.forEach((item) => {
                app.contextMenu.addItem({
                    command: item.command,
                    selector: item.selector,
                    rank: item.rank,
                });
            });
            // ----
            // ----
            // Add launcher
            if (launcher) {
                launcher.add({
                    command: CommandIDs.create,
                    category: "Amphi",
                    rank: 3,
                });
            }
        })
            .catch((reason) => {
            console.error(`Something went wrong when reading the settings.\n${reason}`);
        });
        // Handle state restoration.
        if (restorer) {
            // When restoring the app, if the document was open, reopen it
            restorer.restore(pipelineEditortracker, {
                command: "docmanager:open",
                args: (widget) => ({ path: widget.context.path, factory: PIPELINE_FACTORY }),
                name: (widget) => widget.context.path,
            });
        }
        return pipelineEditortracker;
    },
};
/**
 * Plugin that provides the execution service for tracking component execution status
 */
const executionServicePlugin = {
    id: "@amphi/pipeline-editor:execution-service",
    autoStart: true,
    provides: _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_14__.IPipelineExecutionToken,
    activate: (app) => {
        console.log("Pipeline Execution Service activated");
        const executionService = new _ExecutionService__WEBPACK_IMPORTED_MODULE_18__.PipelineExecutionService();
        return executionService;
    },
};
/**
 * Export the plugins as default.
 */
const extensions = [pipelineEditor, executionServicePlugin];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extensions);


/***/ },

/***/ "./lib/useCopyPaste.js"
/*!*****************************!*\
  !*** ./lib/useCopyPaste.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useCopyPaste: () => (/* binding */ useCopyPaste)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactflow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactflow */ "webpack/sharing/consume/default/reactflow/reactflow");
// src/useCopyPaste.ts


// are we currently typing in something that should get normal keyboard behavior
function isEditingText() {
    const el = document.activeElement;
    if (!el)
        return false;
    // Ace can focus different internal elements depending on browser/runtime.
    if (el.closest('.ace_editor, .ace_text-input'))
        return true;
    if (el.closest('input, textarea, [contenteditable="true"], [role="textbox"]'))
        return true;
    if (el.isContentEditable)
        return true;
    return false;
}
// check if focus is within the React Flow canvas or canvas-related
function isFocusInCanvas(rfDomNode) {
    if (!rfDomNode)
        return false;
    const activeEl = document.activeElement;
    if (!activeEl)
        return false;
    // check if the active element is the canvas itself or a descendant of it
    return rfDomNode === activeEl || rfDomNode.contains(activeEl);
}
// check if we should allow canvas operations based on context
function shouldAllowCanvasOperation(rfDomNode, mousePos) {
    // if editing text, never allow
    if (isEditingText())
        return false;
    // if focus is explicitly in the canvas, always allow
    if (isFocusInCanvas(rfDomNode))
        return true;
    // if mouse is over the canvas, allow (for paste after clicking background)
    if (rfDomNode) {
        const rect = rfDomNode.getBoundingClientRect();
        const isMouseOverCanvas = mousePos.x >= rect.left &&
            mousePos.x <= rect.right &&
            mousePos.y >= rect.top &&
            mousePos.y <= rect.bottom;
        if (isMouseOverCanvas)
            return true;
    }
    // otherwise, don't allow (mouse and focus are both outside canvas)
    return false;
}
/**
 * Copy / Cut / Paste for React Flow canvas
 * - Cmd/Ctrl + C/X/V clones graph selections when interacting with canvas
 * - Inputs, textareas, code editors keep native clipboard 100 percent
 * - Other panels and UI elements are unaffected
 *
 * Smart context detection:
 * - Operations work when focus is in the canvas OR mouse is over the canvas
 * - This allows paste to work after clicking canvas background
 * - Text fields always get native behavior regardless of mouse position
 * - Operations are blocked when both mouse and focus are outside canvas
 */
function useCopyPaste() {
    const mousePosRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({ x: 0, y: 0 });
    // React Flow root dom node (for mouse tracking and focus detection)
    const rfDomNode = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.useStore)((state) => state.domNode);
    // React Flow API
    const { getNodes, setNodes, getEdges, setEdges, screenToFlowPosition } = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.useReactFlow)();
    // clipboard buffers
    const [bufferedNodes, setBufferedNodes] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [bufferedEdges, setBufferedEdges] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    // track mouse position so paste goes where the cursor is
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (!rfDomNode)
            return;
        const onMouseMove = (event) => {
            mousePosRef.current = {
                x: event.clientX,
                y: event.clientY
            };
        };
        rfDomNode.addEventListener('mousemove', onMouseMove);
        return () => {
            rfDomNode.removeEventListener('mousemove', onMouseMove);
        };
    }, [rfDomNode]);
    // build list of selected nodes and all edges fully inside that selection
    const getSelectionSnapshot = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
        const allNodes = getNodes();
        const selectedNodes = allNodes.filter((n) => n.selected);
        const internalEdges = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.getConnectedEdges)(selectedNodes, getEdges()).filter((edge) => {
            const isExternalSource = selectedNodes.every((n) => n.id !== edge.source);
            const isExternalTarget = selectedNodes.every((n) => n.id !== edge.target);
            return !(isExternalSource || isExternalTarget);
        });
        return { selectedNodes, internalEdges };
    }, [getNodes, getEdges]);
    // COPY
    const copy = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
        if (!shouldAllowCanvasOperation(rfDomNode, mousePosRef.current))
            return;
        const { selectedNodes, internalEdges } = getSelectionSnapshot();
        setBufferedNodes(selectedNodes);
        setBufferedEdges(internalEdges);
    }, [getSelectionSnapshot, rfDomNode]);
    // CUT
    const cut = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
        if (!shouldAllowCanvasOperation(rfDomNode, mousePosRef.current))
            return;
        const { selectedNodes, internalEdges } = getSelectionSnapshot();
        setBufferedNodes(selectedNodes);
        setBufferedEdges(internalEdges);
        // remove them from the graph
        setNodes((nodes) => nodes.filter((node) => !node.selected));
        setEdges((edges) => edges.filter((edge) => !internalEdges.includes(edge)));
    }, [getSelectionSnapshot, setNodes, setEdges, rfDomNode]);
    // PASTE
    const paste = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(({ x: pasteX, y: pasteY } = screenToFlowPosition({
        x: mousePosRef.current.x,
        y: mousePosRef.current.y
    })) => {
        if (!shouldAllowCanvasOperation(rfDomNode, mousePosRef.current))
            return;
        if (!bufferedNodes.length)
            return;
        // anchor = top-left of copied selection
        const minX = Math.min(...bufferedNodes.map((n) => n.position.x));
        const minY = Math.min(...bufferedNodes.map((n) => n.position.y));
        const now = Date.now().toString();
        // clone nodes with new ids and shifted positions
        const newNodes = bufferedNodes.map((node) => {
            const newId = `${node.id}-${now}`;
            const x = pasteX + (node.position.x - minX);
            const y = pasteY + (node.position.y - minY);
            return {
                ...node,
                id: newId,
                position: { x, y },
                selected: true
            };
        });
        // clone edges and rewire to new node ids
        const newEdges = bufferedEdges.map((edge) => {
            const newId = `${edge.id}-${now}`;
            const newSource = `${edge.source}-${now}`;
            const newTarget = `${edge.target}-${now}`;
            return {
                ...edge,
                id: newId,
                source: newSource,
                target: newTarget,
                selected: true
            };
        });
        // unselect old graph, then append new
        setNodes((nodes) => [
            ...nodes.map((n) => ({ ...n, selected: false })),
            ...newNodes
        ]);
        setEdges((edges) => [
            ...edges.map((e) => ({ ...e, selected: false })),
            ...newEdges
        ]);
    }, [bufferedNodes, bufferedEdges, screenToFlowPosition, setNodes, setEdges, rfDomNode]);
    // bind Cmd/Ctrl + X / C / V
    useShortcut(['Meta+x', 'Control+x'], cut);
    useShortcut(['Meta+c', 'Control+c'], copy);
    useShortcut(['Meta+v', 'Control+v'], paste);
    return { cut, copy, paste, bufferedNodes, bufferedEdges };
}
// run callback once per physical keydown combo.
// if focus is in an input/textarea/etc, we do nothing and let browser/native clipboard win.
// eslint-disable-next-line @typescript-eslint/ban-types
function useShortcut(keyCode, callback) {
    const [didRun, setDidRun] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const pressed = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.useKeyPress)(keyCode);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (pressed && !didRun) {
            if (!isEditingText()) {
                callback();
            }
            setDidRun(true);
        }
        else {
            setDidRun(pressed);
        }
    }, [pressed, didRun, callback]);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useCopyPaste);


/***/ },

/***/ "./lib/version.js"
/*!************************!*\
  !*** ./lib/version.js ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LIB_VERSION: () => (/* binding */ LIB_VERSION)
/* harmony export */ });
const LIB_VERSION = "0.9.5";


/***/ },

/***/ "./style/icons/align.svg"
/*!*******************************!*\
  !*** ./style/icons/align.svg ***!
  \*******************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\r\n\r\n<svg\r\n   width=\"800px\"\r\n   height=\"800px\"\r\n   viewBox=\"0 0 24 24\"\r\n   fill=\"none\"\r\n   version=\"1.1\"\r\n   id=\"svg1\"\r\n   sodipodi:docname=\"align.svg\"\r\n   inkscape:version=\"1.3 (0e150ed, 2023-07-21)\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\">\r\n  <defs\r\n     id=\"defs1\" />\r\n  <sodipodi:namedview\r\n     id=\"namedview1\"\r\n     pagecolor=\"#505050\"\r\n     bordercolor=\"#eeeeee\"\r\n     borderopacity=\"1\"\r\n     inkscape:showpageshadow=\"0\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pagecheckerboard=\"0\"\r\n     inkscape:deskcolor=\"#505050\"\r\n     inkscape:zoom=\"0.295\"\r\n     inkscape:cx=\"400\"\r\n     inkscape:cy=\"401.69492\"\r\n     inkscape:window-width=\"1504\"\r\n     inkscape:window-height=\"780\"\r\n     inkscape:window-x=\"2301\"\r\n     inkscape:window-y=\"549\"\r\n     inkscape:window-maximized=\"0\"\r\n     inkscape:current-layer=\"svg1\" />\r\n  <path\r\n     d=\"M 22.81921,12 H 1.3615819 M 16.262712,6.0395476 v 0 c -0.329136,0 -0.596045,0.2668614 -0.596045,0.5960451 V 17.364407 c 0,0.329137 0.266909,0.596046 0.596045,0.596046 v 0 c 0.329137,0 0.596046,-0.266909 0.596046,-0.596046 V 6.6355928 c 0,-0.3291838 -0.266909,-0.5960452 -0.596046,-0.5960452 z M 7.918079,2.4632765 v 0 c -0.3291838,0 -0.5960452,0.2668613 -0.5960452,0.5960452 V 20.940679 c 0,0.329136 0.2668614,0.596045 0.5960452,0.596045 v 0 c 0.3291839,0 0.5960452,-0.266909 0.5960452,-0.596045 V 3.0593217 c 0,-0.3291839 -0.2668613,-0.5960452 -0.5960452,-0.5960452 z\"\r\n     stroke=\"#000000\"\r\n     stroke-width=\"2.38418\"\r\n     stroke-linecap=\"round\"\r\n     stroke-linejoin=\"round\"\r\n     id=\"path1\" />\r\n</svg>\r\n";

/***/ },

/***/ "./style/icons/api-24.svg"
/*!********************************!*\
  !*** ./style/icons/api-24.svg ***!
  \********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M2 5a3 3 0 115.585 1.524l1.79 1.79.68-.68a2.75 2.75 0 013.89 0l.68.68 1.79-1.79a3 3 0 111.06 1.06l-1.79 1.791.681.68a2.75 2.75 0 010 3.89l-.68.68 1.79 1.79a3 3 0 11-1.06 1.06l-1.791-1.79-.68.681a2.75 2.75 0 01-3.89 0l-.68-.68-1.79 1.79a3 3 0 11-1.06-1.06l1.79-1.791-.681-.68a2.75 2.75 0 010-3.89l.68-.68-1.79-1.79A3 3 0 012 5zm3-1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0 14a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM17.5 19a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM19 3.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-7.884 5.195a1.25 1.25 0 011.768 0l2.421 2.421a1.25 1.25 0 010 1.768l-2.421 2.421a1.25 1.25 0 01-1.768 0l-2.421-2.421a1.25 1.25 0 010-1.768l2.421-2.421z\" clip-rule=\"evenodd\"/></svg>";

/***/ },

/***/ "./style/icons/dagster.svg"
/*!*********************************!*\
  !*** ./style/icons/dagster.svg ***!
  \*********************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<svg\r\n   width=\"16\"\r\n   height=\"16\"\r\n   viewBox=\"0 0 16 16\"\r\n   fill=\"none\"\r\n   version=\"1.1\"\r\n   id=\"svg9\"\r\n   sodipodi:docname=\"dagster.svg\"\r\n   inkscape:version=\"1.3 (0e150ed, 2023-07-21)\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\">\r\n  <defs\r\n     id=\"defs9\">\r\n    <filter\r\n       style=\"color-interpolation-filters:sRGB\"\r\n       inkscape:label=\"Fade to Black or White\"\r\n       id=\"filter307\"\r\n       x=\"0\"\r\n       y=\"0\"\r\n       width=\"1\"\r\n       height=\"1\">\r\n      <feColorMatrix\r\n         values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0\"\r\n         id=\"feColorMatrix307\" />\r\n    </filter>\r\n    <filter\r\n       style=\"color-interpolation-filters:sRGB\"\r\n       inkscape:label=\"Fade to Black or White\"\r\n       id=\"filter308\"\r\n       x=\"0\"\r\n       y=\"0\"\r\n       width=\"1\"\r\n       height=\"1\">\r\n      <feColorMatrix\r\n         values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0\"\r\n         id=\"feColorMatrix308\" />\r\n    </filter>\r\n    <filter\r\n       style=\"color-interpolation-filters:sRGB\"\r\n       inkscape:label=\"Fade to Black or White\"\r\n       id=\"filter309\"\r\n       x=\"0\"\r\n       y=\"0\"\r\n       width=\"1\"\r\n       height=\"1\">\r\n      <feColorMatrix\r\n         values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0\"\r\n         id=\"feColorMatrix309\" />\r\n    </filter>\r\n    <filter\r\n       style=\"color-interpolation-filters:sRGB\"\r\n       inkscape:label=\"Fade to Black or White\"\r\n       id=\"filter310\"\r\n       x=\"0\"\r\n       y=\"0\"\r\n       width=\"1\"\r\n       height=\"1\">\r\n      <feColorMatrix\r\n         values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0\"\r\n         id=\"feColorMatrix310\" />\r\n    </filter>\r\n    <filter\r\n       style=\"color-interpolation-filters:sRGB\"\r\n       inkscape:label=\"Fade to Black or White\"\r\n       id=\"filter311\"\r\n       x=\"0\"\r\n       y=\"0\"\r\n       width=\"1\"\r\n       height=\"1\">\r\n      <feColorMatrix\r\n         values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0\"\r\n         id=\"feColorMatrix311\" />\r\n    </filter>\r\n    <filter\r\n       style=\"color-interpolation-filters:sRGB\"\r\n       inkscape:label=\"Fade to Black or White\"\r\n       id=\"filter312\"\r\n       x=\"0\"\r\n       y=\"0\"\r\n       width=\"1\"\r\n       height=\"1\">\r\n      <feColorMatrix\r\n         values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0\"\r\n         id=\"feColorMatrix312\" />\r\n    </filter>\r\n    <filter\r\n       style=\"color-interpolation-filters:sRGB\"\r\n       inkscape:label=\"Fade to Black or White\"\r\n       id=\"filter313\"\r\n       x=\"0\"\r\n       y=\"0\"\r\n       width=\"1\"\r\n       height=\"1\">\r\n      <feColorMatrix\r\n         values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0\"\r\n         id=\"feColorMatrix313\" />\r\n    </filter>\r\n    <filter\r\n       style=\"color-interpolation-filters:sRGB\"\r\n       inkscape:label=\"Fade to Black or White\"\r\n       id=\"filter314\"\r\n       x=\"0\"\r\n       y=\"0\"\r\n       width=\"1\"\r\n       height=\"1\">\r\n      <feColorMatrix\r\n         values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0\"\r\n         id=\"feColorMatrix314\" />\r\n    </filter>\r\n    <filter\r\n       style=\"color-interpolation-filters:sRGB\"\r\n       inkscape:label=\"Fade to Black or White\"\r\n       id=\"filter315\"\r\n       x=\"0\"\r\n       y=\"0\"\r\n       width=\"1\"\r\n       height=\"1\">\r\n      <feColorMatrix\r\n         values=\"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0\"\r\n         id=\"feColorMatrix315\" />\r\n    </filter>\r\n  </defs>\r\n  <sodipodi:namedview\r\n     id=\"namedview9\"\r\n     pagecolor=\"#505050\"\r\n     bordercolor=\"#eeeeee\"\r\n     borderopacity=\"1\"\r\n     inkscape:showpageshadow=\"0\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pagecheckerboard=\"0\"\r\n     inkscape:deskcolor=\"#505050\"\r\n     inkscape:zoom=\"12.451758\"\r\n     inkscape:cx=\"16.262764\"\r\n     inkscape:cy=\"23.570969\"\r\n     inkscape:window-width=\"1512\"\r\n     inkscape:window-height=\"922\"\r\n     inkscape:window-x=\"0\"\r\n     inkscape:window-y=\"639\"\r\n     inkscape:window-maximized=\"1\"\r\n     inkscape:current-layer=\"svg9\" />\r\n  <path\r\n     d=\"m 116.556,335.815 c 0.006,1.956 0.414,3.889 1.201,5.679 0.786,1.791 1.932,3.4 3.368,4.727 1.435,1.327 3.129,2.344 4.975,2.987 1.846,0.643 3.805,0.899 5.754,0.751 74.087,-5.304 144.059,-57.735 166.398,-139.627 1.174,-4.71 4.708,-7.072 9.417,-7.072 2.413,0.097 4.691,1.142 6.34,2.908 1.649,1.765 2.536,4.11 2.468,6.526 0,18.259 -23.471,65.98 -57.035,93.674 -1.711,1.439 -3.075,3.246 -3.99,5.286 -0.916,2.04 -1.36,4.26 -1.298,6.495 0.034,1.818 0.426,3.611 1.154,5.276 0.728,1.666 1.778,3.171 3.089,4.43 1.311,1.259 2.857,2.246 4.551,2.906 1.693,0.66 3.5,0.978 5.316,0.938 2.941,0 7.649,-1.768 13.531,-7.072 C 305.266,303.412 350,243.909 350,178.508 350,82.624 275.872,0 172.418,0 80.106,0 0.138,75.414 0.138,162.611 c 0,57.734 45.866,101.326 106.422,101.326 46.459,0 89.385,-32.984 101.148,-78.357 1.173,-4.71 4.694,-7.072 9.402,-7.072 2.415,0.098 4.694,1.142 6.345,2.907 1.651,1.766 2.541,4.11 2.478,6.527 0,20.622 -38.811,92.542 -117.606,92.542 -18.818,0 -42.331,-5.304 -58.803,-14.738 -2.205,-1.069 -4.607,-1.671 -7.055,-1.768 -1.875,-0.072 -3.744,0.245 -5.49,0.931 -1.747,0.685 -3.332,1.725 -4.658,3.053 -1.325,1.329 -2.361,2.917 -3.043,4.665 -0.682,1.749 -0.995,3.62 -0.919,5.495 0.076,2.402 0.764,4.745 1.998,6.807 1.235,2.062 2.975,3.774 5.057,4.975 21.759,12.43 47.633,18.853 74.087,18.853 65.858,0 125.834,-44.779 143.479,-110.76 1.174,-4.71 4.708,-7.071 9.403,-7.071 2.414,0.097 4.694,1.141 6.345,2.906 1.651,1.766 2.541,4.111 2.477,6.527 0,27.1 -48.213,114.296 -141.118,121.368 -3.595,0.267 -6.964,1.852 -9.462,4.453 -2.497,2.6 -3.946,6.031 -4.069,9.635 z\"\r\n     fill=\"#4f43dd\"\r\n     id=\"path1\"\r\n     style=\"filter:url(#filter307)\"\r\n     transform=\"scale(0.04584212)\" />\r\n  <path\r\n     d=\"m 208.62,110.178 c 12.681,-0.095 25.128,3.411 35.897,10.11 1.088,-5.958 1.689,-11.996 1.795,-18.052 0,-27.97 -21.317,-53.025 -47.274,-53.025 -20.185,0 -32.805,16.726 -32.805,37.389 -0.096,11.163 3.824,21.988 11.046,30.498 9.783,-4.667 20.503,-7.034 31.341,-6.92 z\"\r\n     fill=\"#ffffff\"\r\n     id=\"path2\"\r\n     style=\"filter:url(#filter308)\"\r\n     transform=\"scale(0.04584212)\" />\r\n  <path\r\n     d=\"m 269.439,211.505 c 3.603,-12.32 5.191,-20.87 5.191,-26.422 -0.11,-2.398 -1.137,-4.662 -2.869,-6.323 -1.733,-1.661 -4.037,-2.592 -6.436,-2.6 -2.236,0.042 -4.393,0.83 -6.129,2.239 -1.736,1.409 -2.952,3.358 -3.453,5.537 -0.981,4.047 -3.079,15.014 -5.15,21.976 0.856,-2.606 1.638,-5.254 2.347,-7.942 1.174,-4.724 4.708,-7.072 9.402,-7.072 2.414,0.093 4.693,1.135 6.345,2.898 1.651,1.763 2.541,4.106 2.478,6.522 -0.111,3.797 -0.719,7.563 -1.809,11.201 z\"\r\n     fill=\"#352d8e\"\r\n     id=\"path3\"\r\n     style=\"filter:url(#filter309)\"\r\n     transform=\"scale(0.04584212)\" />\r\n  <path\r\n     d=\"m 319.418,198.632 c -0.113,-2.395 -1.14,-4.655 -2.868,-6.315 -1.729,-1.659 -4.028,-2.593 -6.424,-2.608 -2.233,0.045 -4.387,0.834 -6.12,2.243 -1.734,1.408 -2.947,3.356 -3.448,5.533 -0.994,4.144 -3.134,15.276 -5.233,22.224 h 0.097 c 1.022,-3.094 1.974,-6.229 2.761,-9.42 1.174,-4.724 4.708,-7.072 9.416,-7.072 2.413,0.094 4.691,1.136 6.34,2.899 1.649,1.764 2.536,4.107 2.469,6.521 -0.067,2.932 -0.47,5.848 -1.201,8.688 2.927,-10.276 4.211,-17.707 4.211,-22.693 z\"\r\n     fill=\"#352d8e\"\r\n     id=\"path4\"\r\n     style=\"filter:url(#filter310)\"\r\n     transform=\"scale(0.04584212)\" />\r\n  <path\r\n     d=\"m 208.619,110.178 c 6.302,-0.012 12.577,0.829 18.653,2.5 3.19,-4.352 4.784,-9.67 4.514,-15.06 -0.27,-5.39 -2.388,-10.523 -5.997,-14.534 -3.609,-4.011 -8.489,-6.656 -13.819,-7.49 -5.33,-0.833 -10.785,0.195 -15.446,2.913 l 9.665,15.912 -18.1,-7.832 c -2.452,3.958 -3.682,8.552 -3.534,13.206 0.147,4.653 1.665,9.16 4.362,12.954 6.423,-1.731 13.05,-2.595 19.702,-2.569 z\"\r\n     fill=\"#030615\"\r\n     id=\"path5\"\r\n     style=\"filter:url(#filter311)\"\r\n     transform=\"scale(0.04584212)\" />\r\n  <path\r\n     d=\"m 69.172,212.583 c 7.625,0 13.807,-6.184 13.807,-13.812 0,-7.628 -6.182,-13.812 -13.807,-13.812 -7.625,0 -13.807,6.184 -13.807,13.812 0,7.628 6.182,13.812 13.807,13.812 z\"\r\n     fill=\"#352d8e\"\r\n     id=\"path6\"\r\n     style=\"filter:url(#filter312)\"\r\n     transform=\"scale(0.04584212)\" />\r\n  <path\r\n     d=\"m 69.172,157.335 c 7.625,0 13.807,-6.184 13.807,-13.812 0,-7.628 -6.182,-13.812 -13.807,-13.812 -7.625,0 -13.807,6.184 -13.807,13.812 0,7.628 6.182,13.812 13.807,13.812 z\"\r\n     fill=\"#352d8e\"\r\n     id=\"path7\"\r\n     style=\"filter:url(#filter313)\"\r\n     transform=\"scale(0.04584212)\" />\r\n  <path\r\n     d=\"m 41.558,184.958 c 7.625,0 13.806,-6.184 13.806,-13.812 0,-7.628 -6.181,-13.812 -13.806,-13.812 -7.626,0 -13.807,6.184 -13.807,13.812 0,7.628 6.181,13.812 13.807,13.812 z\"\r\n     fill=\"#352d8e\"\r\n     id=\"path8\"\r\n     style=\"filter:url(#filter314)\"\r\n     transform=\"scale(0.04584212)\" />\r\n  <path\r\n     d=\"m 103.688,263.91 h 2.762 c 46.459,0 89.385,-32.983 101.148,-78.356 1.173,-4.71 4.694,-7.072 9.402,-7.072 2.415,0.097 4.694,1.142 6.345,2.907 1.651,1.766 2.541,4.11 2.478,6.527 -0.211,4.821 -1.301,9.563 -3.217,13.992 0.333,-0.515 0.624,-1.055 0.87,-1.616 3.493,-7.988 5.298,-16.613 5.301,-25.332 0,-13.55 -9.416,-22.389 -22.933,-22.389 -23.568,0 -28.29,20.58 -38.23,42.583 -10.314,22.845 -29.257,47.555 -77.028,47.555 -49.635,0 -100.6373,-34.765 -88.197,-105.456 0.151,-0.884 0.276,-1.671 0.372,-2.403 C 0.939,143.982 0.014,153.272 0,162.584 0.138,219.491 44.582,262.585 103.688,263.91 Z\"\r\n     fill=\"#352d8e\"\r\n     id=\"path9\"\r\n     style=\"filter:url(#filter315)\"\r\n     transform=\"scale(0.04584212)\" />\r\n</svg>\r\n";

/***/ },

/***/ "./style/icons/export-svg.svg"
/*!************************************!*\
  !*** ./style/icons/export-svg.svg ***!
  \************************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\r\n\r\n<svg\r\n   fill=\"#000000\"\r\n   width=\"800px\"\r\n   height=\"800px\"\r\n   viewBox=\"0 0 24 24\"\r\n   id=\"export-2\"\r\n   data-name=\"Flat Line\"\r\n   class=\"icon flat-line\"\r\n   version=\"1.1\"\r\n   sodipodi:docname=\"export-svg.svg\"\r\n   inkscape:version=\"1.3 (0e150ed, 2023-07-21)\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\">\r\n  <defs\r\n     id=\"defs1\" />\r\n  <sodipodi:namedview\r\n     id=\"namedview1\"\r\n     pagecolor=\"#505050\"\r\n     bordercolor=\"#eeeeee\"\r\n     borderopacity=\"1\"\r\n     inkscape:showpageshadow=\"0\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pagecheckerboard=\"0\"\r\n     inkscape:deskcolor=\"#505050\"\r\n     inkscape:zoom=\"0.295\"\r\n     inkscape:cx=\"400\"\r\n     inkscape:cy=\"400\"\r\n     inkscape:window-width=\"2560\"\r\n     inkscape:window-height=\"1343\"\r\n     inkscape:window-x=\"1512\"\r\n     inkscape:window-y=\"149\"\r\n     inkscape:window-maximized=\"1\"\r\n     inkscape:current-layer=\"export-2\" />\r\n  <g\r\n     id=\"g1\"\r\n     transform=\"matrix(1.1983051,0,0,1.1983051,-2.3288136,-2.3288136)\">\r\n    <polyline\r\n       id=\"primary\"\r\n       points=\"15 3 21 3 21 9\"\r\n       style=\"fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round\" />\r\n    <line\r\n       id=\"primary-2\"\r\n       data-name=\"primary\"\r\n       x1=\"11\"\r\n       y1=\"13\"\r\n       x2=\"21\"\r\n       y2=\"3\"\r\n       style=\"fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round\" />\r\n    <path\r\n       id=\"primary-3\"\r\n       data-name=\"primary\"\r\n       d=\"m 21,13 v 7 a 1,1 0 0 1 -1,1 H 4 A 1,1 0 0 1 3,20 V 4 A 1,1 0 0 1 4,3 h 7\"\r\n       style=\"fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round\" />\r\n  </g>\r\n</svg>\r\n";

/***/ },

/***/ "./style/icons/file-plus-24.svg"
/*!**************************************!*\
  !*** ./style/icons/file-plus-24.svg ***!
  \**************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"><g fill=\"currentColor\"><path d=\"M11.75 10.75a.75.75 0 01.75.75V14H15a.75.75 0 010 1.5h-2.5V18a.75.75 0 01-1.5 0v-2.5H8.5a.75.75 0 010-1.5H11v-2.5a.75.75 0 01.75-.75z\"/><path fill-rule=\"evenodd\" d=\"M5.75 1A2.75 2.75 0 003 3.75v16.5A2.75 2.75 0 005.75 23h12.5A2.75 2.75 0 0021 20.25V8.664c0-.464-.184-.909-.513-1.237l-5.914-5.914A1.75 1.75 0 0013.336 1H5.75zM4.5 3.75c0-.69.56-1.25 1.25-1.25H13v5.75c0 .414.336.75.75.75h5.75v11.25c0 .69-.56 1.25-1.25 1.25H5.75c-.69 0-1.25-.56-1.25-1.25V3.75zM18.44 7.5L14.5 3.56V7.5h3.94z\" clip-rule=\"evenodd\"/></g></svg>";

/***/ },

/***/ "./style/icons/file-text-24.svg"
/*!**************************************!*\
  !*** ./style/icons/file-text-24.svg ***!
  \**************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"><g fill=\"currentColor\"><path d=\"M7.75 12a.75.75 0 000 1.5h8a.75.75 0 000-1.5h-8zM7 16.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zM7.75 8a.75.75 0 000 1.5h2a.75.75 0 000-1.5h-2z\"/><path fill-rule=\"evenodd\" d=\"M3 3.75A2.75 2.75 0 015.75 1h7.586c.464 0 .909.184 1.237.513l5.914 5.914c.329.328.513.773.513 1.237V20.25A2.75 2.75 0 0118.25 23H5.75A2.75 2.75 0 013 20.25V3.75zM5.75 2.5c-.69 0-1.25.56-1.25 1.25v16.5c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V9h-5.75a.75.75 0 01-.75-.75V2.5H5.75zm8.75 1.06l3.94 3.94H14.5V3.56z\" clip-rule=\"evenodd\"/></g></svg>";

/***/ },

/***/ "./style/icons/grid-alt-24.svg"
/*!*************************************!*\
  !*** ./style/icons/grid-alt-24.svg ***!
  \*************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"><g fill=\"currentColor\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"><path d=\"M1 2.25C1 1.56 1.56 1 2.25 1h3.5C6.44 1 7 1.56 7 2.25v3.5C7 6.44 6.44 7 5.75 7h-3.5C1.56 7 1 6.44 1 5.75v-3.5zm1.5.25v3h3v-3h-3zM9 2.25C9 1.56 9.56 1 10.25 1h3.5c.69 0 1.25.56 1.25 1.25v3.5C15 6.44 14.44 7 13.75 7h-3.5C9.56 7 9 6.44 9 5.75v-3.5zm1.5.25v3h3v-3h-3zM18.25 1C17.56 1 17 1.56 17 2.25v3.5c0 .69.56 1.25 1.25 1.25h3.5C22.44 7 23 6.44 23 5.75v-3.5C23 1.56 22.44 1 21.75 1h-3.5zm.25 4.5v-3h3v3h-3zM1 10.25C1 9.56 1.56 9 2.25 9h3.5C6.44 9 7 9.56 7 10.25v3.5C7 14.44 6.44 15 5.75 15h-3.5C1.56 15 1 14.44 1 13.75v-3.5zm1.5.25v3h3v-3h-3zM10.25 9C9.56 9 9 9.56 9 10.25v3.5c0 .69.56 1.25 1.25 1.25h3.5c.69 0 1.25-.56 1.25-1.25v-3.5C15 9.56 14.44 9 13.75 9h-3.5zm.25 4.5v-3h3v3h-3zM17 10.25c0-.69.56-1.25 1.25-1.25h3.5c.69 0 1.25.56 1.25 1.25v3.5c0 .69-.56 1.25-1.25 1.25h-3.5c-.69 0-1.25-.56-1.25-1.25v-3.5zm1.5.25v3h3v-3h-3zM2.25 17C1.56 17 1 17.56 1 18.25v3.5c0 .69.56 1.25 1.25 1.25h3.5C6.44 23 7 22.44 7 21.75v-3.5C7 17.56 6.44 17 5.75 17h-3.5zm.25 4.5v-3h3v3h-3zM9 18.25c0-.69.56-1.25 1.25-1.25h3.5c.69 0 1.25.56 1.25 1.25v3.5c0 .69-.56 1.25-1.25 1.25h-3.5C9.56 23 9 22.44 9 21.75v-3.5zm1.5.25v3h3v-3h-3zM18.25 17c-.69 0-1.25.56-1.25 1.25v3.5c0 .69.56 1.25 1.25 1.25h3.5c.69 0 1.25-.56 1.25-1.25v-3.5c0-.69-.56-1.25-1.25-1.25h-3.5zm.25 4.5v-3h3v3h-3z\"/></g></svg>";

/***/ },

/***/ "./style/icons/monitor-24.svg"
/*!************************************!*\
  !*** ./style/icons/monitor-24.svg ***!
  \************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M1 4.75A2.75 2.75 0 013.75 2h16.5A2.75 2.75 0 0123 4.75v10.5A2.75 2.75 0 0120.25 18H12.5v2.5H16a.75.75 0 010 1.5H8a.75.75 0 010-1.5h3V18H3.75A2.75 2.75 0 011 15.25V4.75zM20.25 16.5c.69 0 1.25-.56 1.25-1.25V4.75c0-.69-.56-1.25-1.25-1.25H3.75c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h16.5z\" clip-rule=\"evenodd\"/></svg>";

/***/ },

/***/ "./style/icons/node-24.svg"
/*!*********************************!*\
  !*** ./style/icons/node-24.svg ***!
  \*********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M7 9.25A2.75 2.75 0 019.75 6.5h5a2.75 2.75 0 012.75 2.75V11h4.75a.75.75 0 010 1.5H17.5v1.75A2.75 2.75 0 0114.75 17h-5A2.75 2.75 0 017 14.25V12.5H2.25a.75.75 0 010-1.5H7V9.25zm9 0C16 8.56 15.44 8 14.75 8h-5c-.69 0-1.25.56-1.25 1.25v5c0 .69.56 1.25 1.25 1.25h5c.69 0 1.25-.56 1.25-1.25v-5z\" clip-rule=\"evenodd\"/></svg>";

/***/ },

/***/ "./style/icons/pipeline-brand-16.svg"
/*!*******************************************!*\
  !*** ./style/icons/pipeline-brand-16.svg ***!
  \*******************************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<svg\r\n   width=\"16\"\r\n   height=\"16\"\r\n   fill=\"none\"\r\n   viewBox=\"0 0 16 16\"\r\n   version=\"1.1\"\r\n   id=\"svg1\"\r\n   sodipodi:docname=\"pipeline-brand-16.svg\"\r\n   inkscape:version=\"1.3 (0e150ed, 2023-07-21)\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\">\r\n  <defs\r\n     id=\"defs1\" />\r\n  <sodipodi:namedview\r\n     id=\"namedview1\"\r\n     pagecolor=\"#505050\"\r\n     bordercolor=\"#eeeeee\"\r\n     borderopacity=\"1\"\r\n     inkscape:showpageshadow=\"0\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pagecheckerboard=\"0\"\r\n     inkscape:deskcolor=\"#505050\"\r\n     inkscape:zoom=\"14.75\"\r\n     inkscape:cx=\"8\"\r\n     inkscape:cy=\"7.9661017\"\r\n     inkscape:window-width=\"1512\"\r\n     inkscape:window-height=\"874\"\r\n     inkscape:window-x=\"0\"\r\n     inkscape:window-y=\"32\"\r\n     inkscape:window-maximized=\"1\"\r\n     inkscape:current-layer=\"svg1\" />\r\n  <path\r\n     fill=\"currentColor\"\r\n     fill-rule=\"evenodd\"\r\n     d=\"M2.75 2.5A1.75 1.75 0 001 4.25v1C1 6.216 1.784 7 2.75 7h1a1.75 1.75 0 001.732-1.5H6.5a.75.75 0 01.75.75v3.5A2.25 2.25 0 009.5 12h1.018c.121.848.85 1.5 1.732 1.5h1A1.75 1.75 0 0015 11.75v-1A1.75 1.75 0 0013.25 9h-1a1.75 1.75 0 00-1.732 1.5H9.5a.75.75 0 01-.75-.75v-3.5A2.25 2.25 0 006.5 4H5.482A1.75 1.75 0 003.75 2.5h-1zM2.5 4.25A.25.25 0 012.75 4h1a.25.25 0 01.25.25v1a.25.25 0 01-.25.25h-1a.25.25 0 01-.25-.25v-1zm9.75 6.25a.25.25 0 00-.25.25v1c0 .138.112.25.25.25h1a.25.25 0 00.25-.25v-1a.25.25 0 00-.25-.25h-1z\"\r\n     clip-rule=\"evenodd\"\r\n     id=\"path1\"\r\n     style=\"fill:#5a8f7b;fill-opacity:1\" />\r\n</svg>\r\n";

/***/ },

/***/ "./style/icons/pipeline-brand-24.svg"
/*!*******************************************!*\
  !*** ./style/icons/pipeline-brand-24.svg ***!
  \*******************************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<svg\r\n   width=\"24\"\r\n   height=\"24\"\r\n   fill=\"none\"\r\n   viewBox=\"0 0 24 24\"\r\n   version=\"1.1\"\r\n   id=\"svg1\"\r\n   sodipodi:docname=\"pipeline-brand-24.svg\"\r\n   inkscape:version=\"1.3 (0e150ed, 2023-07-21)\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\">\r\n  <defs\r\n     id=\"defs1\" />\r\n  <sodipodi:namedview\r\n     id=\"namedview1\"\r\n     pagecolor=\"#505050\"\r\n     bordercolor=\"#eeeeee\"\r\n     borderopacity=\"1\"\r\n     inkscape:showpageshadow=\"0\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pagecheckerboard=\"0\"\r\n     inkscape:deskcolor=\"#505050\"\r\n     inkscape:zoom=\"9.8333333\"\r\n     inkscape:cx=\"12\"\r\n     inkscape:cy=\"11.949153\"\r\n     inkscape:window-width=\"1512\"\r\n     inkscape:window-height=\"874\"\r\n     inkscape:window-x=\"0\"\r\n     inkscape:window-y=\"32\"\r\n     inkscape:window-maximized=\"1\"\r\n     inkscape:current-layer=\"svg1\" />\r\n  <path\r\n     fill=\"currentColor\"\r\n     fill-rule=\"evenodd\"\r\n     d=\"M4.75 4.5A2.25 2.25 0 002.5 6.75v1A2.25 2.25 0 004.75 10h1a2.25 2.25 0 002.236-2H9.82c.967 0 1.75.784 1.75 1.75v4.5a3.25 3.25 0 003.25 3.25h1.195a2.25 2.25 0 002.236 2h1a2.25 2.25 0 002.25-2.25v-1A2.25 2.25 0 0019.25 14h-1a2.25 2.25 0 00-2.236 2h-1.195a1.75 1.75 0 01-1.75-1.75v-4.5A3.25 3.25 0 009.82 6.5H7.986a2.25 2.25 0 00-2.236-2h-1zM4 6.75A.75.75 0 014.75 6h1a.75.75 0 01.75.75v1a.75.75 0 01-.75.75h-1A.75.75 0 014 7.75v-1zm14.25 8.75a.75.75 0 00-.75.75v1c0 .414.336.75.75.75h1a.75.75 0 00.75-.75v-1a.75.75 0 00-.75-.75h-1z\"\r\n     clip-rule=\"evenodd\"\r\n     id=\"path1\"\r\n     style=\"fill:#5a8f7b;fill-opacity:1\" />\r\n</svg>\r\n";

/***/ },

/***/ "./style/icons/refresh.svg"
/*!*********************************!*\
  !*** ./style/icons/refresh.svg ***!
  \*********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-refresh\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4\" /><path d=\"M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4\" /></svg>";

/***/ }

}]);
//# sourceMappingURL=lib_index_js.ef413c03d8cd65b4d21b.js.map