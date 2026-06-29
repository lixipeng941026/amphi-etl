"use strict";
(self["webpackChunk_amphi_pipeline_components_core"] = self["webpackChunk_amphi_pipeline_components_core"] || []).push([["lib_index_js"],{

/***/ "./lib/components/BaseCoreComponent.js"
/*!*********************************************!*\
  !*** ./lib/components/BaseCoreComponent.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseCoreComponent: () => (/* binding */ BaseCoreComponent)
/* harmony export */ });
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @amphi/pipeline-components-manager */ "webpack/sharing/consume/default/@amphi/pipeline-components-manager");
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reactflow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactflow */ "webpack/sharing/consume/default/reactflow/reactflow");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons */ "./lib/icons.js");
// BaseCoreComponent.tsx




class BaseCoreComponent extends (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.PipelineComponent)() {
    constructor(name, id, description, type, fileDrop, category, icon, defaultConfig, form) {
        super();
        this.UIComponent = ({ id, data, context, componentService, manager, commands, rendermimeRegistry, settings }) => {
            const { setNodes, deleteElements, setViewport } = (0,reactflow__WEBPACK_IMPORTED_MODULE_2__.useReactFlow)();
            const store = (0,reactflow__WEBPACK_IMPORTED_MODULE_2__.useStoreApi)();
            const deleteNode = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
                deleteElements({ nodes: [{ id }] });
            }, [id, deleteElements]);
            const zoomSelector = (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.createZoomSelector)();
            const showContent = (0,reactflow__WEBPACK_IMPORTED_MODULE_2__.useStore)(zoomSelector);
            const selector = (s) => ({
                nodeInternals: s.nodeInternals,
                edges: s.edges,
            });
            const { nodeInternals, edges } = (0,reactflow__WEBPACK_IMPORTED_MODULE_2__.useStore)(selector);
            const edgesKey = (0,reactflow__WEBPACK_IMPORTED_MODULE_2__.useStore)(s => s.edges.map(e => { var _a, _b; return `${e.id}:${e.source}:${(_a = e.sourceHandle) !== null && _a !== void 0 ? _a : ''}->${e.target}:${(_b = e.targetHandle) !== null && _b !== void 0 ? _b : ''}`; }).join('|'));
            const nodeId = id;
            const internals = { nodeInternals, edges, nodeId, componentService };
            const handleElement = react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.renderHandle, {
                key: edgesKey,
                type: this._type,
                Handle: reactflow__WEBPACK_IMPORTED_MODULE_2__.Handle,
                Position: reactflow__WEBPACK_IMPORTED_MODULE_2__.Position,
                internals
            });
            const handleChange = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((evtTargetValue, field) => {
                (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.onChange)({ evtTargetValue, field, nodeId, store, setNodes });
            }, [nodeId, store, setNodes]);
            // Selector to determine if the node is selected
            const isSelected = (0,reactflow__WEBPACK_IMPORTED_MODULE_2__.useStore)((state) => { var _a; return !!((_a = state.nodeInternals.get(id)) === null || _a === void 0 ? void 0 : _a.selected); });
            const executeUntilComponent = () => {
                const timestamp = Date.now();
                const flow = _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.PipelineService.filterPipeline(context.model.toString());
                // Get nodes to traverse and related data
                const { nodesToTraverse, nodesMap } = _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.computeNodesToTraverse(flow, nodeId, componentService);
                commands.execute('pipeline-editor:run-pipeline-until', { nodeId: nodeId, context: context }).then(result => {
                    setNodes(prevNodes => prevNodes.map(node => nodesToTraverse.includes(node.id)
                        ? { ...node, data: { ...node.data, lastExecuted: timestamp, successfulExecution: true } }
                        : node));
                })
                    .catch(reason => {
                    setNodes(prevNodes => prevNodes.map(node => nodesToTraverse.includes(node.id)
                        ? { ...node, data: { ...node.data, successfulExecution: null } }
                        : node));
                    console.error(`Error with pipeline, nodes not updated.'.\n${reason}`);
                });
            };
            const [modalOpen, setModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
            let enableExecution = settings.get('enableExecution').composite;
            return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null,
                (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.renderComponentUI)({
                    id,
                    data,
                    context,
                    manager,
                    commands,
                    name: this._name,
                    ConfigForm: BaseCoreComponent.ConfigForm,
                    configFormProps: {
                        nodeId: id,
                        data,
                        context,
                        componentService,
                        manager,
                        commands,
                        store,
                        setNodes,
                        type: this._type,
                        name: this._name,
                        defaultConfig: this._default,
                        form: this._form,
                        handleChange,
                        modalOpen,
                        setModalOpen
                    },
                    Icon: this._icon,
                    showContent,
                    handle: handleElement,
                    deleteNode,
                    setViewport,
                    handleChange,
                    isSelected,
                    handleVersion: edgesKey // ← NEW, makes MemoizedComponentUI re-render
                }),
                (showContent || isSelected) && (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(reactflow__WEBPACK_IMPORTED_MODULE_2__.NodeToolbar, { isVisible: true, position: reactflow__WEBPACK_IMPORTED_MODULE_2__.Position.Bottom },
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", { onClick: () => setModalOpen(true) },
                        react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_3__.settingsIcon.react, null)),
                    (this._type.includes('input') || this._type.includes('processor') || this._type.includes('output')) && (react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", { onClick: () => executeUntilComponent(), disabled: !enableExecution, style: { opacity: enableExecution ? 1 : 0.5, cursor: enableExecution ? 'pointer' : 'not-allowed' } },
                        react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_3__.playCircleIcon.react, null)))))));
        };
        this._name = name;
        this._id = id;
        this._description = description;
        this._type = type;
        this._fileDrop = fileDrop;
        this._category = category;
        this._icon = icon;
        this._default = defaultConfig;
        this._form = form;
    }
}
BaseCoreComponent.ConfigForm = ({ nodeId, data, context, componentService, manager, commands, store, setNodes, type, name, defaultConfig, form, handleChange, modalOpen, setModalOpen }) => {
    const handleSetDefaultConfig = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
        (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.setDefaultConfig)({ nodeId, store, setNodes, defaultConfig });
    }, [nodeId, store, setNodes, defaultConfig]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        handleSetDefaultConfig();
    }, [handleSetDefaultConfig]);
    return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.GenerateUIFormComponent, { nodeId: nodeId, type: type, name: name, form: form, data: data, context: context, componentService: componentService, manager: manager, commands: commands, handleChange: handleChange, modalOpen: modalOpen, setModalOpen: setModalOpen })));
};



/***/ },

/***/ "./lib/components/annotations/Annotation.js"
/*!**************************************************!*\
  !*** ./lib/components/annotations/Annotation.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Annotation: () => (/* binding */ Annotation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactflow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactflow */ "webpack/sharing/consume/default/reactflow/reactflow");
/* harmony import */ var react_remark__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-remark */ "webpack/sharing/consume/default/react-remark/react-remark");
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amphi/pipeline-components-manager */ "webpack/sharing/consume/default/@amphi/pipeline-components-manager");
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/QuestionCircleOutlined.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");
var _a;










class Annotation extends (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_3__.PipelineComponent)() {
    constructor() {
        super(...arguments);
        // public _name = "Annotation";
        this._name = "注释";
        this._id = "annotation";
        this._type = "annotation";
        this._icon = _icons__WEBPACK_IMPORTED_MODULE_6__.annotationIcon;
        this._category = _inputs_label__WEBPACK_IMPORTED_MODULE_7__.chineseLabel[2];
        // public _description = "Annotation";
        this._description = "注释";
        this._default = { content: "# Annotation", isLocked: false };
    }
    UIComponent({ id, data, context, componentService, manager, commands, rendermimeRegistry, settings, }) {
        const { setNodes, deleteElements, setViewport } = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.useReactFlow)();
        const store = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.useStoreApi)();
        const deleteNode = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            deleteElements({ nodes: [{ id }] });
        }, [id, deleteElements]);
        const isSelected = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.useStore)((state) => { var _b; return !!((_b = state.nodeInternals.get(id)) === null || _b === void 0 ? void 0 : _b.selected); });
        const handleChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((evtTargetValue, field) => {
            (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_3__.onChange)({ evtTargetValue, field, nodeId: id, store, setNodes });
        }, [id, store, setNodes]);
        const toggleLock = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            setNodes((nds) => nds.map((node) => {
                if (node.id === id) {
                    const newIsLocked = !node.data.isLocked;
                    node.data = {
                        ...node.data,
                        isLocked: newIsLocked,
                    };
                    node.draggable = !newIsLocked;
                }
                return node;
            }));
        }, [id, setNodes]);
        (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
            setNodes((nds) => nds.map((node) => {
                if (node.id === id) {
                    node.draggable = !data.isLocked;
                }
                return node;
            }));
        }, [data.isLocked, id, setNodes]);
        const shiftKeyPressed = (0,reactflow__WEBPACK_IMPORTED_MODULE_1__.useKeyPress)("Shift");
        const [modalOpen, setModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
        const backgroundColorStyle = data.backgroundColor || "transparent";
        const borderColorStyle = data.borderColor || "#42766D";
        const borderWidthStyle = data.borderWidth || 2;
        const textColorStyle = data.textColor || "rgba(0, 0, 0, 1)";
        const borderRadiusStyle = data.borderRadius || 0;
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
            isSelected && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.Popconfirm, { title: "Sure to delete?", placement: "right", onConfirm: deleteNode, icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__["default"], { style: { color: "red" } }) },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "deletebutton", style: {
                        position: "absolute",
                        top: "-20px",
                        right: "-20px",
                        cursor: "pointer",
                        zIndex: 10,
                    } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_6__.xIcon.react, { className: "group-hover:text-primary" })))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "annotation", style: {
                    height: "100%",
                    backgroundColor: backgroundColorStyle,
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    position: "relative",
                    zIndex: 0,
                    borderRadius: `${borderRadiusStyle}px`,
                    border: `${borderWidthStyle}px solid ${borderColorStyle}`,
                } },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(reactflow__WEBPACK_IMPORTED_MODULE_1__.NodeResizer, { keepAspectRatio: shiftKeyPressed, isVisible: isSelected, color: "#000000", minWidth: 50, minHeight: 50 }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { color: textColorStyle } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_remark__WEBPACK_IMPORTED_MODULE_2__.Remark, null, data.content)),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(reactflow__WEBPACK_IMPORTED_MODULE_1__.NodeToolbar, { isVisible: isSelected, position: reactflow__WEBPACK_IMPORTED_MODULE_1__.Position.Bottom },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { onClick: () => setModalOpen(true) },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_6__.settingsIcon.react, null)),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { onClick: toggleLock }, data.isLocked ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_6__.lockIcon.react, null) : react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_6__.unlockIcon.react, null)))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Annotation.ConfigForm, { nodeId: id, data: data, context: context, componentService: manager.componentService, manager: manager, commands: commands, store: store, setNodes: setNodes, handleChange: handleChange, modalOpen: modalOpen, setModalOpen: setModalOpen })));
    }
}
_a = Annotation;
Annotation.ConfigForm = ({ nodeId, data, context, componentService, manager, commands, store, setNodes, handleChange, modalOpen, setModalOpen, }) => {
    const handleColorChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((colorObj, setColor, field) => {
        const colorValue = colorObj.toRgbString();
        setColor(colorValue);
        handleChange(colorValue, field);
    }, [handleChange]);
    const handleBorderRadiusChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((newValue) => {
        setBorderRadius(newValue);
        handleChange(newValue, "borderRadius");
    }, [handleChange]);
    const handleBorderWidthChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((newValue) => {
        setBorderWidth(newValue);
        handleChange(newValue, "borderWidth");
    }, [handleChange]);
    const [content, setContent] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(data.content || "# Annotation");
    const [backgroundColor, setBackgroundColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(data.backgroundColor || "#fff");
    const [borderColor, setBorderColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(data.borderColor || "#42766D");
    const [borderWidth, setBorderWidth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(data.borderWidth || 5);
    const [textColor, setTextColor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(data.textColor || "#000");
    const [borderRadius, setBorderRadius] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(data.borderRadius || 5);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        setContent(data.content || "# Annotation");
    }, [data.content]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        handleChange(content, "content");
    }, [content]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.ConfigProvider, { theme: {
                token: {
                    colorPrimary: "#5F9B97",
                },
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.Modal, { title: _a.Name, centered: true, open: modalOpen, onOk: () => setModalOpen(false), onCancel: () => setModalOpen(false), width: 800, footer: (_, { OkBtn }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(OkBtn, null))) },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.Form, { layout: "vertical" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.Form.Item, { label: "Background Color" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.ColorPicker, { allowClear: true, placement: "topRight", defaultFormat: "hex", format: "hex", showText: true, value: backgroundColor, onChange: (color) => handleColorChange(color, setBackgroundColor, "backgroundColor") })),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.Form.Item, { label: "Border Color" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.ColorPicker, { placement: "topRight", defaultFormat: "hex", format: "hex", showText: true, value: borderColor, onChange: (color) => handleColorChange(color, setBorderColor, "borderColor") })),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.Form.Item, { label: "Border Width" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.Row, null,
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.Col, { span: 12 },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.Slider, { min: 0, max: 20, onChange: handleBorderWidthChange, value: typeof borderWidth === "number" ? borderWidth : 5 })),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.Col, { span: 4 },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.InputNumber, { min: 0, max: 20, style: { margin: "0 16px" }, value: borderWidth, onChange: handleBorderWidthChange })))),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.Form.Item, { label: "Text Color" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.ColorPicker, { placement: "topRight", defaultFormat: "hex", format: "hex", showText: true, value: textColor, onChange: (color) => handleColorChange(color, setTextColor, "textColor") })),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.Form.Item, { label: "Border Radius" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.Row, null,
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.Col, { span: 12 },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.Slider, { min: 0, max: 50, onChange: handleBorderRadiusChange, value: typeof borderRadius === "number" ? borderRadius : 5 })),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.Col, { span: 4 },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.InputNumber, { min: 0, max: 50, style: { margin: "0 16px" }, value: borderRadius, onChange: handleBorderRadiusChange })))),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_5__.Form.Item, { label: "Markdown Content" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_3__.CodeTextarea, { field: {
                                type: "code",
                                label: "Markdown Content",
                                id: "content",
                                placeholder: "Markdown",
                            }, handleChange: (value) => {
                                handleChange(value, "content");
                                setContent(value);
                            }, advanced: false, value: content, context: context, commands: commands, componentService: componentService, nodeId: nodeId })))))));
};



/***/ },

/***/ "./lib/components/common/FTPOptionsHandler.js"
/*!****************************************************!*\
  !*** ./lib/components/common/FTPOptionsHandler.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FTPOptionsHandler: () => (/* binding */ FTPOptionsHandler)
/* harmony export */ });
// FTPOptionsHandler.ts
class FTPOptionsHandler {
    // Static method to handle FTP-specific options
    static handleFTPSpecificOptions(config, storageOptions) {
        if (config.fileLocation === 'ftp') {
            const updatedStorageOptions = {
                ...storageOptions,
                username: config.ftpUsername,
                password: config.ftpPassword
            };
            return updatedStorageOptions;
        }
        return storageOptions;
    }
    static getFTPFields() {
        return [
            {
                type: "input",
                label: "Username",
                id: "ftpUsername",
                placeholder: "Enter FTP username",
                condition: { fileLocation: "ftp" },
                connection: "FTP",
                advanced: true
            },
            {
                type: "input",
                label: "Password",
                id: "ftpPassword",
                placeholder: "Enter FTP password",
                inputType: "password",
                condition: { fileLocation: "ftp" },
                connection: "FTP",
                advanced: true
            }
        ];
    }
}


/***/ },

/***/ "./lib/components/common/FileUtils.js"
/*!********************************************!*\
  !*** ./lib/components/common/FileUtils.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileUtils: () => (/* binding */ FileUtils)
/* harmony export */ });
class FileUtils {
    // Static method to generate file paths using glob for local files
    static getLocalFilePaths(filePath, outputName) {
        return `
${outputName}_file_paths = glob.glob("${filePath}")
if not ${outputName}_file_paths:
    raise FileNotFoundError("No files found matching the pattern.")
`;
    }
    // Static method to generate file paths using s3fs for S3 files
    static getS3FilePaths(filePath, storageOptionsString, outputName) {
        return `
${outputName}_fs = s3fs.S3FileSystem(**${storageOptionsString})
${outputName}_file_paths = ${outputName}_fs.glob("${filePath}")
if not ${outputName}_file_paths:
    raise FileNotFoundError("No files found matching the pattern.")
`;
    }
    // Static method to generate file paths using ftputil for FTP files
    static getFTPFilePaths(filePath, storageOptionsString, outputName) {
        return `
${outputName}_fs = ftputil.FTPHost(**${storageOptionsString})
${outputName}_file_paths = ${outputName}_fs.glob("${filePath}")
if not ${outputName}_file_paths:
    raise FileNotFoundError("No files found matching the pattern.")
`;
    }
    // Static method to generate the concatenation code
    static generateConcatCode(outputName, readMethod, optionsString, isS3) {
        const readFunction = isS3
            ? `pd.${readMethod}(${outputName}_fs.open(file, 'rb')${optionsString})`
            : `pd.${readMethod}(file${optionsString})`;
        return `
${outputName} = pd.concat([${readFunction} for file in ${outputName}_file_paths], ignore_index=True).convert_dtypes()
`;
    }
    static isWildcardInput(filePath) {
        return filePath.includes('*');
    }
}


/***/ },

/***/ "./lib/components/common/S3OptionsHandler.js"
/*!***************************************************!*\
  !*** ./lib/components/common/S3OptionsHandler.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S3OptionsHandler: () => (/* binding */ S3OptionsHandler)
/* harmony export */ });
// S3OptionsHandler.ts
class S3OptionsHandler {
    static getStorageOptions(config) {
        var _a;
        let storageOptions = ((_a = config.csvOptions) === null || _a === void 0 ? void 0 : _a.storage_options) || {};
        let finalOptions = {};
        // 1. Transform manual key-value UI array into a standard object
        if (Array.isArray(storageOptions)) {
            finalOptions = storageOptions.reduce((acc, item) => {
                if (item.key)
                    acc[item.key] = item.value;
                return acc;
            }, {});
        }
        else {
            finalOptions = { ...storageOptions };
        }
        // 2. Inject S3 Credentials if method is 'storage_options'
        if (config.fileLocation === 's3' && config.connectionMethod === 'storage_options') {
            finalOptions.key = config.awsAccessKey;
            finalOptions.secret = config.awsSecretKey;
            if (config.useCustomEndpoint && config.customEndpoint) {
                // Ensure client_kwargs exists and preserve existing sub-keys
                finalOptions.client_kwargs = {
                    ...(finalOptions.client_kwargs || {}),
                    endpoint_url: config.customEndpoint
                };
            }
        }
        return finalOptions;
    }
    // Static method to handle S3-specific options
    static handleS3SpecificOptions(config, storageOptions) {
        if (config.fileLocation === 's3' && config.connectionMethod === 'storage_options') {
            const updatedStorageOptions = {
                ...storageOptions,
                key: config.awsAccessKey,
                secret: config.awsSecretKey
            };
            if (config.useCustomEndpoint && config.customEndpoint) {
                updatedStorageOptions.client_kwargs = {
                    ...updatedStorageOptions.client_kwargs,
                    endpoint_url: config.customEndpoint
                };
            }
            return updatedStorageOptions;
        }
        return storageOptions;
    }
    static getAWSFields() {
        return [
            {
                type: "select",
                label: "Connection Method",
                id: "connectionMethod",
                options: [
                    { value: "env", label: "Environment Variables (Recommended)", tooltip: "Use AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY variables, using an Env. Variable File is recommended." },
                    { value: "storage_options", label: "Pass directly (storage_options)", tooltip: "You can pass credentials using the storage_options parameter. Using Environment Variables for this method is also recommended." }
                ],
                condition: { fileLocation: "s3" },
                connection: "AWS",
                ignoreConnection: true,
                advanced: true
            },
            {
                type: "input",
                label: "Access Key",
                id: "awsAccessKey",
                placeholder: "Enter Access Key",
                inputType: "password",
                connection: "AWS",
                connectionVariableName: "AWS_ACCESS_KEY_ID",
                condition: { fileLocation: "s3", connectionMethod: "storage_options" },
                advanced: true
            },
            {
                type: "input",
                label: "Secret Key",
                id: "awsSecretKey",
                placeholder: "Enter Secret Key",
                inputType: "password",
                connection: "AWS",
                connectionVariableName: "AWS_SECRET_ACCESS_KEY",
                condition: { fileLocation: "s3", connectionMethod: "storage_options" },
                advanced: true
            },
            {
                type: "boolean",
                label: "Use Custom Endpoint",
                id: "useCustomEndpoint",
                placeholder: "Use custom endpoint to connecto Minio for example",
                connection: "AWS",
                condition: { fileLocation: "s3", connectionMethod: "storage_options" },
                advanced: true
            },
            {
                type: "input",
                label: "Custom Endpoint",
                id: "customEndpoint",
                tooltip: "Connect to a Different SE-Compatible File System (e.g., Minio) Using a Custom Endpoint",
                placeholder: "http://localhost:9000",
                connection: "AWS",
                condition: { fileLocation: "s3", connectionMethod: "storage_options", useCustomEndpoint: true },
                advanced: true
            },
        ];
    }
}


/***/ },

/***/ "./lib/components/custom/CustomOutput.js"
/*!***********************************************!*\
  !*** ./lib/components/custom/CustomOutput.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomOutput: () => (/* binding */ CustomOutput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");

 // Adjust the import path

class CustomOutput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = { code: "input.to_csv('output.csv', index=False)" };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "info",
                    label: "Instructions",
                    id: "instructions",
                    text: "Write Python code with 'input', the input pandas dataframe of this component.",
                },
                {
                    type: "codeTextarea",
                    label: "Code",
                    tooltip: "Use the dataframe 'input' as input. For example, input.to_csv('output.csv', index=False).",
                    id: "code",
                    mode: "python",
                    height: "300px",
                    placeholder: "input.to_csv('output.csv', index=False)",
                    aiInstructions: "Generate a Pandas script that consumes the DataFrame named 'input' and outputs a DataFrame named 'output'. IMPORTANT: The code must not print or display anything. Include short comments for clarity. The data sample is provided for generating accurate code based on user instructions.",
                    aiGeneration: true,
                    aiPromptExamples: [
                        {
                            label: "Write to Excel file",
                            value: "Write data to an Excel file, the header should be in red color and can be sorted",
                        },
                        {
                            label: "Send data to API",
                            value: "Write code to send my data as JSON object to a dummy API",
                        },
                    ],
                    advanced: true,
                },
                {
                    type: "selectMultipleCustomizable",
                    label: "Install Libraries",
                    id: "librariesToInstall",
                    tooltip: "Amphi can use libraries installed in the same Python environment natively. If a library is not installed already, select or provide the library name.",
                    placeholder: "Select or add libs",
                    options: [
                        { value: "scikit-learn", label: "scikit-learn" },
                        { value: "scipy", label: "scipy" },
                        { value: "statsmodels", label: "statsmodels" },
                        { value: "pyjanitor", label: "pyjanitor" },
                    ],
                    advanced: true,
                },
            ],
        };
        // const description = "Use custom Python code to process or consume the input DataFrame named 'input'.";
        const description = "使用自定义的 Python 代码来处理或使用名为“input”的输入数据框。";
        super(
        // "Python Output",
        "Python输出", "customOutput", description, "pandas_df_output", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[3], _icons__WEBPACK_IMPORTED_MODULE_0__.pythonIcon, defaultConfig, form);
    }
    getEffectiveCode(config) {
        const rawValue = config.code;
        if (!rawValue)
            return "";
        // If already an object
        if (typeof rawValue === "object")
            return rawValue.code || "";
        try {
            const parsed = JSON.parse(rawValue);
            if (parsed && typeof parsed === "object" && "code" in parsed) {
                return parsed.code;
            }
        }
        catch (e) {
            // Backward compatibility: value is a plain Python string
            return rawValue;
        }
        return rawValue;
    }
    provideImports({ config }) {
        const imports = ["import pandas as pd"];
        // Extract real Python code for parsing imports
        const effectiveCode = this.getEffectiveCode(config);
        if (config.imports) {
            const importLinesFromImports = config.imports
                .split("\n")
                .map((line) => line.trim())
                .filter((line) => line.startsWith("import ") || line.startsWith("from "));
            imports.push(...importLinesFromImports);
        }
        if (effectiveCode) {
            const importLinesFromCode = effectiveCode
                .split("\n")
                .map((line) => line.trim())
                .filter((line) => line.startsWith("import ") || line.startsWith("from "));
            imports.push(...importLinesFromCode);
        }
        return imports;
    }
    provideDependencies({ config }) {
        return Array.isArray(config.librariesToInstall)
            ? config.librariesToInstall
            : [];
    }
    generateComponentCode({ config, inputName }) {
        // 1. Get the actual Python code from the JSON structure
        const effectiveCode = this.getEffectiveCode(config);
        // 2. Remove import lines from the user code
        let userCode = effectiveCode
            .split("\n")
            .filter((line) => {
            const trimmed = line.trim();
            return !(trimmed.startsWith("import ") || trimmed.startsWith("from "));
        })
            .join("\n");
        // 3. Replace 'input' with the dynamic variable name provided by the orchestrator
        const inputRegex = new RegExp("\\binput\\b", "g");
        userCode = userCode.replace(inputRegex, inputName);
        return `\n${userCode}`;
    }
}


/***/ },

/***/ "./lib/components/developer/DataframeDelete.js"
/*!*****************************************************!*\
  !*** ./lib/components/developer/DataframeDelete.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataframeDelete: () => (/* binding */ DataframeDelete)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class DataframeDelete extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            boolean_raise_error: true,
            boolean_output_result: false,
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "info",
                    id: "description",
                    text: "Delete listed dataframe",
                    advanced: false,
                },
                {
                    type: "valuesList",
                    label: "Dataframe(s) to delete",
                    id: "valuesList_dataframe",
                    placeholders: "Enter Dataframe names",
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Raise an error if failure",
                    id: "boolean_raise_error",
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Output the result (and not the input dataframe)",
                    id: "boolean_output_result",
                    advanced: true,
                },
            ],
        };
        // const description = "Delete intermediate or residual pandas dataframes";
        const description = "删除中间或残留的 pandas 数据框";
        super(
        // "Dataframe Delete",
        "数据框删除", "DataframeDelete", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[5], _icons__WEBPACK_IMPORTED_MODULE_0__.DataframeDeleteIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return ["import pandas as pd"];
    }
    provideFunctions({ config }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        // Function to list dataframes
        const DeleteDataframeFunction = `
def delete_dataframes(df_to_delete_names: list, scope: dict, raise_on_error: bool, output_delete_result: bool, default_input_df) -> pd.DataFrame:
    results = []
    df_deletion_failed = []

    for name in df_to_delete_names:
        try:
            if name in scope:
                del scope[name]
                results.append((name, 'success'))
            else:
                msg = 'failure: not found'
                results.append((name, msg))
                df_deletion_failed.append(f"{name}: not found")
        except Exception as e:
            err_msg = f'failure: {e}'
            results.append((name, err_msg))
            df_deletion_failed.append(f"{name}: {e}")

    if raise_on_error and len(df_deletion_failed) > 0:
        raise RuntimeError("One or more deletions failed:".join(df_deletion_failed))
    if output_delete_result:
       return pd.DataFrame(results, columns=['DataFrame', 'Status']).astype({
        "DataFrame": "string",
        "Status": "string"
    })
    else:
        return default_input_df
    `;
        return [DeleteDataframeFunction];
    }
    // Generate the Python execution script
    generateComponentCode({ config, inputName, outputName, }) {
        const raise_on_error = config.boolean_raise_error ? "True" : "False";
        //console.log(config.boolean_raise_error);
        const output_delete_result = config.boolean_output_result
            ? "True"
            : "False";
        //console.log(config.boolean_output_result);
        //create a typescript string coming from the typescript list
        const dataframe_to_delete = "[" + config.valuesList_dataframe.map((v) => `'${v}'`).join(",") + "]";
        console.log(config.valuesList_dataframe);
        return `
# Execute the function
#boolean : False/True, list ['toto']

${outputName} = delete_dataframes(${dataframe_to_delete}, globals(), ${raise_on_error},${output_delete_result},${inputName})
    `;
    }
}


/***/ },

/***/ "./lib/components/developer/DataframeList.js"
/*!***************************************************!*\
  !*** ./lib/components/developer/DataframeList.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataframeList: () => (/* binding */ DataframeList)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class DataframeList extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {};
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "info",
                    id: "description",
                    text: "List all existing pandas dataframes created before the tool",
                    advanced: false,
                },
            ],
        };
        // const description = "List all existing pandas dataframes created before the tool";
        const description = "列出在使用该工具之前创建的所有现有的 pandas 数据框。";
        super(
        //   "Dataframe List",
        "数据框列表", "DataframeList", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[5], _icons__WEBPACK_IMPORTED_MODULE_0__.DataframeIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return ["import pandas as pd", "import polars as pl", "import duckdb"];
    }
    provideFunctions({ config }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        // Function to list dataframes
        const ListExistingDataframesFunction = `
def list_existing_dataframes(scope, exclude=None):
    if exclude is None:
        exclude = []

    dataframe_summary = []
    
    for name, obj in scope.items():
        if name in exclude:
            continue
        
        # --- Pandas ---
        if isinstance(obj, pd.DataFrame):
            dataframe_summary.append({
                "dataframe_name": name,
                "engine": "pandas",
                "number_of_columns": obj.shape[1],
                "number_of_rows": obj.shape[0],
                "size_in_bytes": obj.memory_usage(deep=True).sum()
            })

        # --- Polars ---
        elif pl is not None and isinstance(obj, pl.DataFrame):
            dataframe_summary.append({
                "dataframe_name": name,
                "engine": "polars",
                "number_of_columns": obj.width,
                "number_of_rows": obj.height,
                "size_in_bytes": obj.estimated_size()
            })

        # --- DuckDB Relation/Table ---
        elif duckdb is not None and isinstance(obj, (duckdb.DuckDBPyRelation)):
            try:
                rows = obj.count("*").fetchone()[0]
            except Exception:
                rows = None
            try:
                cols = len(obj.columns)
            except Exception:
                cols = None
            dataframe_summary.append({
                "dataframe_name": name,
                "engine": "duckdb",
                "number_of_columns": cols,
                "number_of_rows": rows,
                "size_in_bytes": None
            })

    dataframe_summary_df = pd.DataFrame(dataframe_summary)
    if not dataframe_summary_df.empty:
        dataframe_summary_df = dataframe_summary_df.astype({
            "dataframe_name": "string",
            "engine": "string"
        })

    return dataframe_summary_df
    `;
        return [ListExistingDataframesFunction];
    }
    // Generate the Python execution script
    generateComponentCode({ config, inputName, outputName, }) {
        return `
# Execute the function
${outputName} = list_existing_dataframes(globals(), exclude=['df_summary'])
    `;
    }
}


/***/ },

/***/ "./lib/components/developer/FormExample.js"
/*!*************************************************!*\
  !*** ./lib/components/developer/FormExample.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormExample: () => (/* binding */ FormExample)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");
// Import necessary icons and the BaseCoreComponent class.
// Ensure the correct folder hierarchy is used (e.g., input/xx/yy...)



// Main class definition
class FormExample extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    // Constructor initializes the form structure
    constructor() {
        //this is here where you set the default values of form. but choose either default value or placeholder
        const defaultConfig = {
            with_default_value_inputNumber: "18",
            default_value_column: [],
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                // Form fields are displayed sequentially.
                // Each form has a type, label, tooltip, and additional properties.
                // Available form types are defined in:
                // amphi-etl\jupyterlab-amphi\packages\pipeline-components-manager\src\forms
                // For this example, id sometimes mention the  type of the component. Do not do that in real life, use a functional name.
                // Informational sections
                {
                    type: "info",
                    id: "description",
                    text: "This component serves as an example showcasing all types of data entry forms available with Amphi.⚠️It is not intended for use as part of a pipeline.",
                    advanced: false,
                },
                {
                    type: "info",
                    id: "misc_info",
                    text: "You can find the types in amphi-etl/jupyterlab-amphi/packages/pipeline-components-manager/src/configUtils.tsx",
                    advanced: true,
                },
                {
                    type: "info",
                    id: "instructions",
                    text: "1. Informational text to show in the component. File path (3), Separator (4) and sheet name (18) are mandatory to run, meaning you also need File Location (2) set to Local. An input is also required.",
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "2. File Location (radio)",
                    id: "fileLocation",
                    //options : value on the radio button
                    options: [
                        { value: "local", label: "Local" },
                        { value: "http", label: "HTTP" },
                        { value: "s3", label: "S3" },
                        { value: "option4", label: "Option 4" },
                    ],
                    advanced: true,
                },
                {
                    type: "file",
                    label: "3. File path (file)",
                    id: "filePath",
                    placeholder: "Type file name or use '*' for patterns",
                    tooltip: "Provide a single CSV file path or use '*' for matching multiple files. Extensions accepted: .csv, .tsv, .txt. Can also read CSV files compressed as .gz, .bz2, .zip, .xz, .zst.",
                    validation: "^(.*(\\.csv|\\.tsv|\\.txt))$|^(.*\\*)$",
                    advanced: true,
                },
                {
                    type: "selectCustomizable",
                    label: "4. Separator (selectCustomizable)",
                    id: "csvOptions.sep",
                    placeholder: "default: ,",
                    tooltip: "Select or provide a custom delimiter.",
                    options: [
                        { value: ",", label: "comma (,)" },
                        { value: ";", label: "semicolon (;)" },
                        { value: " ", label: "space" },
                        { value: "\\t", label: "tab" },
                        { value: "|", label: "pipe (|)" },
                        { value: "infer", label: "infer (tries to auto detect)" },
                    ],
                    advanced: true,
                },
                {
                    type: "inputNumber",
                    tooltip: "Number of rows of file to read. Useful for reading pieces of large files.",
                    label: "5. Rows number (inputNumber)",
                    id: "csvOptions.nrows",
                    placeholder: "Default: all",
                    min: 0,
                    advanced: true,
                },
                {
                    type: "selectTokenization",
                    tooltip: "Sequence of column labels to apply.",
                    label: "6. Column names (selectTokenization)",
                    id: "csvOptions.names",
                    placeholder: "Type header fields (ordered and comma-separated)",
                    options: [],
                    advanced: true,
                },
                {
                    type: "input",
                    label: "7. Wrapper Character (input)",
                    id: "csvOptions.quotechar",
                    tooltip: "Defines the character used to wrap fields containing special characters like the delimiter or newline.",
                    advanced: true,
                },
                {
                    type: "select",
                    label: "8. On Bad Lines (select)",
                    id: "csvOptions.on_bad_lines",
                    placeholder: "Error: raise an Exception when a bad line is encountered",
                    options: [
                        {
                            value: "error",
                            label: "Error",
                            tooltip: "Raise an Exception when a bad line is encountered",
                        },
                        {
                            value: "warn",
                            label: "Warn",
                            tooltip: "Raise a warning when a bad line is encountered and skip that line.",
                        },
                        {
                            value: "skip",
                            label: "Skip",
                            tooltip: "Skip bad lines without raising or warning when they are encountered.",
                        },
                    ],
                    advanced: true,
                },
                {
                    type: "keyvalue",
                    label: "9. Storage Options (keyvalue)",
                    id: "csvOptions.storage_options",
                    condition: { fileLocation: ["http", "s3"] },
                    advanced: true,
                },
                {
                    type: "transferData",
                    label: "10. Filter columns (transferData)",
                    id: "transferData_filtercolumn",
                    advanced: true,
                },
                {
                    type: "columns",
                    label: "11. Left Input Column(s) (columns)",
                    id: "leftKeyColumn",
                    placeholder: "Column name",
                    tooltip: "If you're joining by multiple columns, make sure the column lists are ordered to match the corresponding columns in the right dataset.",
                    inputNb: 1,
                    advanced: true,
                },
                {
                    type: "keyvalueColumns",
                    label: "12. Columns (keyvalueColumns)",
                    id: "keyvalueColumns_columns",
                    placeholders: { key: "column name", value: "new column name" },
                    advanced: true,
                },
                {
                    type: "codeTextarea",
                    label: "13. Imports (codeTextarea)",
                    id: "codeTextarea_import",
                    placeholder: "import langchain ...",
                    height: "50px",
                    advanced: true,
                },
                {
                    type: "textarea",
                    label: "14. Body (textarea)",
                    id: "textarea_body",
                    placeholder: "Write body in JSON",
                    advanced: true,
                },
                {
                    type: "table",
                    label: "15. Table Name (table)",
                    query: `SHOW TABLES;`,
                    id: "tableName",
                    placeholder: "Enter table name",
                    condition: { queryMethod: "table" },
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "16. Auto Commit (boolean)",
                    tooltip: "Setting autocommit True will cause the database to issue a commit after each SQL statement, otherwise database transactions will have to be explicity committed. As per the Python DB API, the default value is False (even though the ODBC default value is True). Typically, you will probably want to set autocommit True when creating a connection.",
                    id: "boolean_autoCommit",
                    advanced: true,
                },
                {
                    type: "valuesList",
                    label: "17. URLs (valuesList)",
                    id: "valuesList_urls",
                    placeholders: "Enter URLs",
                    advanced: true,
                },
                {
                    type: "sheets",
                    label: "18. Sheets (sheets)",
                    id: "excelOptions.sheet_name",
                    placeholder: "Default: 0 (first sheet)",
                    tooltip: "Select one or multiple sheets. If multiple sheets are selected, the sheets are concatenated to output a single dataset.",
                    condition: { fileLocation: "local" },
                    advanced: true,
                },
                {
                    type: "dataMapping",
                    label: "19. Mapping (dataMapping)",
                    id: "mapping",
                    tooltip: "By default, the mapping is inferred from the input data. By specifying a schema, you override the incoming schema.",
                    outputType: "relationalDatabase",
                    imports: ["pyodbc"],
                    drivers: "mssql",
                    query: `
SELECT 
    COLUMN_NAME AS "Field",
    DATA_TYPE AS "Type",
    IS_NULLABLE AS "Null",
    COLUMN_DEFAULT AS "Default",
    '' AS "Extra"
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = '{{table}}' AND TABLE_SCHEMA = 'dbo';
`,
                    typeOptions: [
                        { value: "INT", label: "INT" },
                        { value: "VARCHAR", label: "VARCHAR" },
                        { value: "NVARCHAR", label: "NVARCHAR" },
                        { value: "TEXT", label: "TEXT" },
                        { value: "DATETIME", label: "DATETIME" },
                        { value: "DATE", label: "DATE" },
                        { value: "FLOAT", label: "FLOAT" },
                        { value: "DECIMAL", label: "DECIMAL" },
                        { value: "BIT", label: "BIT" },
                        { value: "BIGINT", label: "BIGINT" },
                        { value: "SMALLINT", label: "SMALLINT" },
                        { value: "TINYINT", label: "TINYINT" },
                        { value: "CHAR", label: "CHAR" },
                        { value: "NCHAR", label: "NCHAR" },
                        { value: "NTEXT", label: "NTEXT" },
                        { value: "BINARY", label: "BINARY" },
                        { value: "VARBINARY", label: "VARBINARY" },
                        { value: "IMAGE", label: "IMAGE" },
                        { value: "UNIQUEIDENTIFIER", label: "UNIQUEIDENTIFIER" },
                        { value: "XML", label: "XML" },
                        { value: "TIME", label: "TIME" },
                        { value: "DATETIME2", label: "DATETIME2" },
                        { value: "DATETIMEOFFSET", label: "DATETIMEOFFSET" },
                        { value: "SMALLDATETIME", label: "SMALLDATETIME" },
                        { value: "REAL", label: "REAL" },
                        { value: "MONEY", label: "MONEY" },
                        { value: "SMALLMONEY", label: "SMALLMONEY" },
                    ],
                    advanced: true,
                },
                {
                    type: "cascader",
                    label: "20. Data Type to convert to (cascader)",
                    id: "dataType",
                    placeholder: "Select ...",
                    onlyLastValue: true,
                    options: [
                        {
                            value: "numeric",
                            label: "Numeric",
                            children: [
                                {
                                    value: "int",
                                    label: "Integer",
                                    children: [
                                        { value: "int64", label: "int64: Standard integer type." },
                                        {
                                            value: "int32",
                                            label: "int32: For optimized memory usage.",
                                        },
                                        {
                                            value: "int16",
                                            label: "int16: For more optimized memory usage.",
                                        },
                                        {
                                            value: "int8",
                                            label: "int8: For more optimized memory usage.",
                                        },
                                        {
                                            value: "uint64",
                                            label: "uint64: Unsigned integer (can only hold non-negative values)",
                                        },
                                        {
                                            value: "uint32",
                                            label: "uint32: For more optimized memory usage.",
                                        },
                                        {
                                            value: "uint16",
                                            label: "uint16: For more optimized memory usage.",
                                        },
                                        {
                                            value: "uint8",
                                            label: "uint8: For more optimized memory usage.",
                                        },
                                    ],
                                },
                                {
                                    value: "float",
                                    label: "Float",
                                    children: [
                                        {
                                            value: "float64",
                                            label: "float64: Standard floating-point type.",
                                        },
                                        {
                                            value: "float32",
                                            label: "float32: For optimized memory usage.",
                                        },
                                        {
                                            value: "float16",
                                            label: "float16: For optimized memory usage.",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            value: "text",
                            label: "Text",
                            children: [
                                {
                                    value: "string",
                                    label: "string: For string data. (recommended)",
                                },
                                {
                                    value: "object",
                                    label: "object: For generic objects (strings, timestamps, mixed types).",
                                },
                                {
                                    value: "category",
                                    label: "category: For categorical variables.",
                                },
                            ],
                        },
                        {
                            value: "datetime",
                            label: "Date & Time",
                            children: [
                                {
                                    value: "datetime64[ns]",
                                    label: "datetime64[ns]: For datetime values.",
                                },
                                {
                                    value: "datetime64[ms]",
                                    label: "datetime64[ms]: For datetime values in milliseconds.",
                                },
                                {
                                    value: "datetime64[s]",
                                    label: "datetime64[s]: For datetime values in seconds.",
                                },
                                {
                                    value: "datetime32[ns]",
                                    label: "datetime32[ns]: For compact datetime storage in nanoseconds.",
                                },
                                {
                                    value: "datetime32[ms]",
                                    label: "datetime32[ms]: For compact datetime storage in milliseconds.",
                                },
                                {
                                    value: "timedelta[ns]",
                                    label: "timedelta[ns]: For differences between two datetimes.",
                                },
                            ],
                        },
                        {
                            value: "boolean",
                            label: "Boolean",
                            children: [
                                {
                                    value: "bool",
                                    label: "bool: For boolean values (True or False).",
                                },
                            ],
                        },
                    ],
                    advanced: true,
                },
                {
                    type: "keyvalueColumnsRadio",
                    label: "21. Columns Sorting Order(keyvalueColumnsRadio)",
                    id: "columnAndOrder",
                    options: [
                        { value: "True", label: "Asc." },
                        { value: "False", label: "Desc." },
                    ],
                    advanced: true,
                },
                {
                    type: "selectMultipleCustomizable",
                    label: "22. Remove Unwanted Characters (selectMultipleCustomizable)",
                    id: "removeUnwantedCharacters",
                    options: [
                        { value: "whitespace", label: "Leading and Trailing Whitespace" },
                        { value: "tabs", label: "Tabs" },
                        { value: "Line breaks", label: "Line Breaks" },
                        { value: "allwhitespace", label: "All Whitespace" },
                        { value: "letters", label: "All Letters" },
                        { value: "numbers", label: "All Numbers" },
                        { value: "punctuation", label: "Punctuation" },
                    ],
                    advanced: true,
                },
                {
                    type: "keyvalueColumnsSelect",
                    label: "23. Operations (keyvalueColumnsSelect)",
                    id: "columnsOperations",
                    placeholder: "Select column",
                    options: [
                        {
                            value: "min",
                            label: "Min",
                            tooltip: "Returns the minimum value in the group.",
                        },
                        {
                            value: "max",
                            label: "Max",
                            tooltip: "Returns the maximum value in the group.",
                        },
                        {
                            value: "sum",
                            label: "Sum",
                            tooltip: "Returns the sum of all values in the group.",
                        },
                        {
                            value: "mean",
                            label: "Mean",
                            tooltip: "Returns the average value of the group.",
                        },
                        {
                            value: "count",
                            label: "Count",
                            tooltip: "Counts the number of non-null entries.",
                        },
                        {
                            value: "nunique",
                            label: "Distinct Count",
                            tooltip: "Returns the number of distinct elements.",
                        },
                        {
                            value: "first",
                            label: "First",
                            tooltip: "Returns the first value in the group.",
                        },
                        {
                            value: "last",
                            label: "Last",
                            tooltip: "Returns the last value in the group.",
                        },
                        {
                            value: "median",
                            label: "Median",
                            tooltip: "Returns the median value in the group.",
                        },
                        {
                            value: "std",
                            label: "Standard Deviation",
                            tooltip: "Returns the standard deviation of the group.",
                        },
                        {
                            value: "var",
                            label: "Variance",
                            tooltip: "Returns the variance of the group.",
                        },
                        {
                            value: "prod",
                            label: "Product",
                            tooltip: "Returns the product of all values in the group.",
                        },
                    ],
                    advanced: true,
                },
                {
                    type: "column",
                    label: "24. Select a single column (column)",
                    id: "column",
                    placeholder: "Column name",
                    advanced: true,
                },
                {
                    type: "column",
                    label: "25. Select a single column (column) restricted to specific types (string, bool)",
                    id: "type_restricted_column",
                    //types for allowedtype :
                    //            numeric:  /^(u?int|float|complex|decimal)\d*$/i,
                    //              datetime: /^(datetime|timedelta|period|datetimetz)/i,
                    //  bool:     /^bool/i,
                    //  string:   /^(object|string)$/i,
                    //  category: /^category
                    allowedTypes: ["string", "bool"],
                    placeholder: "Column name",
                    advanced: true,
                },
                {
                    type: "inputNumber",
                    tooltip: "Number of rows of file to read. Useful for reading pieces of large files.",
                    label: "26. Rows number with a default value (inputNumber)",
                    id: "with_default_value_inputNumber",
                    min: 0,
                    advanced: true,
                },
                {
                    type: "column",
                    label: "27. Select a single column with default value so that code can work when retrieving default_value_column.value even if not defined(column)",
                    id: "default_value_column",
                    placeholder: "Column name",
                    advanced: true,
                },
                {
                    type: "date",
                    label: "28. Select a Date (date)",
                    id: "date_picker",
                    advanced: true,
                },
                {
                    type: "codeTextarea",
                    label: "29. Code with AI (codeTextarea)",
                    tooltip: "Use the dataframe 'output' as output, and 'input' as input",
                    id: "code_with_ai",
                    mode: "python",
                    height: "300px",
                    placeholder: "your amazing code here",
                    aiInstructions: "Generate a Pandas script that return a DataFrame named 'output'. IMPORTANT: Ensure the code does not print or display anything. Include short comments for clarity.",
                    aiGeneration: true,
                    aiDataSample: false,
                    aiPromptExamples: [
                        {
                            label: "Create input with dummy data",
                            value: "Create a simple input with columns A,B,C and fill them with dummy data.",
                        },
                        {
                            label: "Size of my data",
                            value: "Give me the size of my 'input' dataframe",
                        },
                    ],
                    advanced: true,
                },
                {
                    type: "selectMultiple",
                    label: "30. Date type (selectMultiple)",
                    id: "datetype",
                    options: [
                        { value: "days", label: "Days" },
                        { value: "years", label: "Years" },
                        { value: "months", label: "Months" },
                    ],
                    advanced: true,
                },
            ],
        };
        // Component description for tooltips in the menu
        // const description = "Form examples";
        const description = "示例形式";
        // Super constructor call with necessary parameters
        // 1. Do not forget to add the icon in amphi-etl\jupyterlab-amphi\packages\pipeline-components-core\src\icons.ts and in amphi-etl\jupyterlab-amphi\packages\pipeline-components-core\style\icons.
        super(
        // "Form Example",
        "示例形式", "form_example", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[5], _icons__WEBPACK_IMPORTED_MODULE_0__.typescriptIcon, defaultConfig, form);
    }
    // List of additional Python packages required (if any)
    provideImports({ config }) {
        return [];
    }
    // Define the Python function. Not mandatory but can help.
    provideFunctions({ config }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        const ExampleTSFunction = `

def example_python_function(
    df: pd.DataFrame,
    example_kwarg_int: int, 
    example_kwarg_string: str = "mydefaultvalue",#here the default value of the function.In Python, arguments with default values must come after non-default arguments.
) -> pd.DataFrame:

    result_df = df.copy()  # avoid mutating original DataFrame
    result_df["new_int_column"] = example_kwarg_int
    result_df["new_string_column"] = example_kwarg_string
	#convert to string (else object)
    result_df["new_string_column"] = result_df["new_string_column"].astype("string")
    return result_df

    `;
        return [ExampleTSFunction];
    }
    // Generates the Python code for processing the form input
    //please note a few things :
    //-that typescript const/var will also be interpretated on commented lines
    //-you can use in your code config.column even if undefined but to use config.column.value, config.column has to be defined
    generateComponentCode({ config, inputName, outputName }) {
        //constant declaration
        const default_value_column_value = config.default_value_column.value;
        const constTswith_default_value_inputNumber = config.with_default_value_inputNumber;
        const constTsfileLocation = config.fileLocation;
        const tsConsdatetype = JSON.stringify(config.datetype);
        const tsConsremoveUnwantedCharacters = JSON.stringify(config.removeUnwantedCharacters);
        let columnsParam = "{";
        if (config.columns && config.columns.length > 0) {
            columnsParam += config.columns
                .map((column) => {
                if (column.key.named) {
                    return `"${column.key.value}": "${column.value}"`;
                }
                else {
                    return `${column.key.value}: "${column.value}"`;
                }
            })
                .join(", ");
            columnsParam += "}";
        }
        else {
            columnsParam = "{}"; // Ensure columnsParam is always initialized
        }
        // Template for outputting the input data. This is where you place your Python code.
        const code = `
print("example of print in Amphi console")
print("2 config.fileLocation : ")
print("${config.fileLocation}")
print("3 config.filePath : ")
print("${config.filePath}")
print("4 config.csvOptions.sep : ")
print("${config.csvOptions.sep}")
print("5 config.csvOptions.nrows : ")
print("${config.csvOptions.nrows}")
print("6 config.csvOptions.names : ")
print("${config.csvOptions.names}")
print("7 config.csvOptions.quotechar : ")
print("${config.csvOptions.quotechar}")
print("8 config.csvOptions.on_bad_lines : ")
print("${config.csvOptions.on_bad_lines}")
print("9 config.csvOptions.storage_options : ")
print("${config.csvOptions.storage_options}")
print("10 config.transferData_filtercolumn : ")
print("${config.transferData_filtercolumn}")
print("11 config.leftKeyColumn : ")
print("${config.leftKeyColumn}")
print("12 config.keyvalueColumns_columns : ")
print("${config.keyvalueColumns_columns}")
print("13 config.codeTextarea_import : ")
print("${config.csvOptions.nrows}")
print("14 config.textarea_body : ")
print("${config.textarea_body}")
print("14 config.textarea_body : ")
print("${config.textarea_body}")
print("15 config.tableName : ")
print("${config.tableName}")
print("16 config.boolean_autoCommit : ")
print("${config.boolean_autoCommit}")
print("17 config.valuesList_urls : ")
print("${config.valuesList_urls}")
print("18 config.excelOptions.sheet_name: ")
print("${config.excelOptions.sheet_name}")
print("19 config.mapping : ")
print("${config.mapping}")
print("20 config.dataType : ")
print("${config.dataType}")
print("21 columnAndOrder : ")
print("${config.columnAndOrder}")
print("22 config.removeUnwantedCharacters : ")
print("${config.removeUnwantedCharacters}")
print("${tsConsremoveUnwantedCharacters}")
print("23 config.columnsOperations : ")
print("${config.columnsOperations}")
print("24 config.column : ")
print("${config.column}")
print("25 config.type_restricted_column: ")
print("${config.type_restricted_column}")
print("26 config.with_default_value_inputNumber: ")
print("${config.with_default_value_inputNumber}")
print("27 config.default_value_column: ")
print("${config.default_value_column}")
print("27 config.default_value_column.value: ")
print("${config.default_value_column.value}")
print("27 default_value_column_value: ")
print("${default_value_column_value}")
print("${config.dataType}")
print("28 config.date_picker : ")
print("${config.date_picker}")
print("29. config.code_with_ai : ")
print("${config.code_with_ai}")
print("30.config.datetype : ")
print("${config.datetype}")
print("${tsConsdatetype}")


#A comment in Python. The code generator will replace outputName by the output real name, same for inputName.

#You can do without a python function however if your code is very simple.
#kwarg is for key word argument, it allows a more understandable syntax than just writing the argument.
#new line for each argument improve readability
${outputName} = example_python_function(
  df=${inputName},
  example_kwarg_int=${constTswith_default_value_inputNumber},
  example_kwarg_string='${constTsfileLocation}')
`;
        //test console : it will appear in your browser console. This is TypeScript code.
        console.log("2 config.fileLocation : ");
        console.log(config.fileLocation);
        console.log("3 config.filePath : ");
        console.log(config.filePath);
        console.log("4 config.csvOptions.sep : ");
        console.log(config.csvOptions.sep);
        console.log("5 config.csvOptions.nrows : ");
        console.log(config.csvOptions.nrows);
        console.log("6 config.csvOptions.names : ");
        console.log(config.csvOptions.names);
        console.log("7 config.csvOptions.quotechar : ");
        console.log(config.csvOptions.quotechar);
        console.log("8 config.csvOptions.on_bad_lines : ");
        console.log(config.csvOptions.on_bad_lines);
        console.log("9 config.csvOptions.storage_options : ");
        console.log(config.csvOptions.storage_options);
        console.log("10 config.transferData_filtercolumn : ");
        console.log(config.transferData_filtercolumn);
        console.log("11 config.leftKeyColumn : ");
        console.log(config.leftKeyColumn);
        console.log("12 config.keyvalueColumns_columns : ");
        console.log(config.keyvalueColumns_columns);
        console.log("13 config.codeTextarea_import : ");
        console.log(config.csvOptions.nrows);
        console.log("14 config.textarea_body : ");
        console.log(config.textarea_body);
        console.log("14 config.textarea_body : ");
        console.log(config.textarea_body);
        console.log("15 config.tableName : ");
        console.log(config.tableName);
        console.log("16 config.boolean_autoCommit : ");
        console.log(config.boolean_autoCommit);
        console.log("17 config.valuesList_urls : ");
        console.log(config.valuesList_urls);
        console.log("18 config.excelOptions.sheet_name: ");
        console.log(config.excelOptions.sheet_name);
        console.log("19 config.mapping : ");
        console.log(config.mapping);
        console.log("20 config.dataType : ");
        console.log(config.dataType);
        console.log("21 columnAndOrder : ");
        console.log(config.columnAndOrder);
        console.log("22 config.removeUnwantedCharacters : ");
        console.log(config.removeUnwantedCharacters);
        console.log(tsConsremoveUnwantedCharacters);
        console.log("23 config.columnsOperations : ");
        console.log(config.columnsOperations);
        console.log("24 config.column : ");
        console.log(config.column);
        console.log("25 config.type_restricted_column : ");
        console.log(config.type_restricted_column);
        console.log("26 config.with_default_value_inputNumber: ");
        console.log(config.with_default_value_inputNumber);
        console.log("27 config.default_value_column: ");
        console.log(config.default_value_column);
        console.log("27 config.default_value_column.value: ");
        console.log(config.default_value_column.value);
        console.log("27 default_value_column_value: ");
        console.log(default_value_column_value);
        console.log("28 config.date_picker: ");
        console.log(config.date_picker);
        console.log("29 config.code_with_ai: ");
        console.log(config.code_with_ai);
        console.log("30 config.datetype : ");
        console.log(config.datetype);
        console.log(tsConsdatetype);
        return code;
    }
}


/***/ },

/***/ "./lib/components/developer/PackagesList.js"
/*!**************************************************!*\
  !*** ./lib/components/developer/PackagesList.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PackagesList: () => (/* binding */ PackagesList)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");
// Import necessary icons and the base component



// Main component definition
class PackagesList extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    // Constructor to define the component's structure
    constructor() {
        const defaultConfig = {};
        // Define the form structure
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "info",
                    label: "Info",
                    id: "description",
                    text: "List of the installed python packages",
                    advanced: false, // No expandable options
                },
            ],
        };
        // Tooltip description for the component in the menu
        // const description = "List of the installed python packages";
        const description = "已安装的 Python 包列表";
        // Call the parent class constructor with component details
        super(
        // "Packages List", // Display name
        "包列表", // Display name
        "packages_list", // Component ID
        description, // Description
        "pandas_df_input", // Component type
        [], // File drop (unused)
        _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[5], _icons__WEBPACK_IMPORTED_MODULE_0__.PackagesListIcon, // Component icon
        defaultConfig, // Default configuration
        form);
    }
    // List of additional Python package imports required for this component
    provideImports({ config }) {
        return [
            "import pandas as pd",
            "import importlib.metadata",
            "import datetime",
            "import os",
            "import sys",
        ];
    }
    // Define the Python function
    provideFunctions({ config }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        const PackagesListFunction = `

def packages_list():
    rows = []
    for dist in importlib.metadata.distributions():
        name = dist.metadata.get("Name") or ""
        version = dist.version or ""

        # approximate install date as a datetime object
        try:
            location = dist.locate_file("")
            ts = os.path.getmtime(location)
            install_date = datetime.datetime.fromtimestamp(ts)
        except Exception:
            install_date = pd.NaT  # use pandas Not-a-Time for missing values

        # check if global or in venv
        try:
            scope = "venv" if str(location).startswith(sys.prefix) else "global"
        except Exception:
            scope = pd.NA

        rows.append((str(name), str(version), install_date, scope))

    result = pd.DataFrame(rows, columns=["Package", "Version", "InstallDate", "Scope"])

    # normalize and enforce string dtype for text columns
    for col in ["Package", "Version", "Scope"]:
        result[col] = result[col].astype("string").str.strip()

    # sort alphabetically by package
    result = (
        result.assign(_sort_key=result["Package"].str.lower())
              .sort_values("_sort_key")
              .drop(columns="_sort_key")
              .reset_index(drop=True)
    )
    return result

# Example usage
#output = packages_list()
    `;
        return [PackagesListFunction];
    }
    // Generate the Python execution script
    generateComponentCode({ config, outputName, }) {
        console.log("Generated outputName:", outputName); // Debugging output
        return `
# Execute the function
${outputName} = []
${outputName} = packages_list()
    `;
    }
}


/***/ },

/***/ "./lib/components/inputs/GenerateCalendar.js"
/*!***************************************************!*\
  !*** ./lib/components/inputs/GenerateCalendar.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GenerateCalendar: () => (/* binding */ GenerateCalendar)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./label */ "./lib/components/inputs/label.js");



class GenerateCalendar extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        // const description = 'Generate a Calendar';
        const description = "生成日历";
        const defaultConfig = {
            tsCFdateFromDate: "",
            tsCFbooleanFromToday: true,
            tsCFinputNumberFromXBack: "",
            tsCFselectFromWhatBack: "days",
            //tsCFcolumnFromColumn:"",
            tsCFdateToDate: "",
            tsCFbooleanToToday: true,
            tsCFinputNumberToXAhead: "",
            tsCFselectToWhatAhead: "days",
            //tsCFcolumnToColumn:"",
            tsCFselectMultipleCustomizableFieldsToInclude: ["date"],
            // tsCFSelectinputEngine:"pandas",
            tsCFSelectoutputEngine: "pandas",
        };
        const form = {
            idPrefix: "component__form_name_input_hello_df",
            fields: [
                {
                    type: "date",
                    label: "From Date",
                    id: "tsCFdateFromDate",
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "From Today",
                    id: "tsCFbooleanFromToday",
                    advanced: true,
                },
                {
                    type: "inputNumber",
                    label: "From X Back",
                    id: "tsCFinputNumberFromXBack",
                    advanced: true,
                },
                {
                    type: "select",
                    label: "From what back",
                    id: "tsCFselectFromWhatBack",
                    options: [
                        { value: "days", label: "Days" },
                        { value: "weeks", label: "Weeks" },
                        { value: "months", label: "Months" },
                        { value: "years", label: "Years" },
                    ],
                    advanced: true,
                },
                // {
                // type: "column",
                // label: "From Column",
                // id: "tsCFcolumnFromColumn",
                // advanced: true
                // },
                {
                    type: "date",
                    label: "To Date",
                    id: "tsCFdateToDate",
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "To Today",
                    id: "tsCFbooleanToToday",
                    advanced: true,
                },
                {
                    type: "inputNumber",
                    label: "To X Ahead",
                    id: "tsCFinputNumberToXAhead",
                    advanced: true,
                },
                {
                    type: "select",
                    label: "To What Ahead",
                    id: "tsCFselectToWhatAhead",
                    options: [
                        { value: "days", label: "Days" },
                        { value: "weeks", label: "Weeks" },
                        { value: "months", label: "Months" },
                        { value: "years", label: "Years" },
                    ],
                    advanced: true,
                },
                // {
                // type: "column",
                // label: "To Column",
                // id: "tsCFcolumnToColumn",
                // advanced: true
                // },
                {
                    type: "selectMultipleCustomizable",
                    label: "Fields to include",
                    id: "tsCFselectMultipleCustomizableFieldsToInclude",
                    options: [
                        { value: "date", label: "Date" },
                        { value: "year", label: "Year" },
                        { value: "month_name", label: "Month Name" },
                        { value: "month_number", label: " Month Number" },
                        { value: "weekday_name", label: "Weekday Name" },
                        { value: "weekday_number", label: "Weekday Number" },
                        { value: "week", label: "Week" },
                        { value: "weekend_flag", label: "Week-End Flag" },
                    ],
                    advanced: true,
                },
                // {
                // type: "select",
                // label: "Input Engine",
                // id: "tsCFSelectinputEngine",
                // options: [
                // { value: "pandas", label: "Pandas", tooltip: "Mature, easy-to-use, great for small-to-medium datasets." },
                // { value: "polars", label: "Polars", tooltip: "Fast, memory-efficient, great for large-scale in-memory analytics." },
                // { value: "duckdb", label: "DuckDB", tooltip: "SQL-based, excellent for large datasets" }
                // ],
                // advanced: true
                // },
                {
                    type: "select",
                    label: "Output Engine",
                    id: "tsCFSelectoutputEngine",
                    options: [
                        {
                            value: "pandas",
                            label: "Pandas",
                            tooltip: "Mature, easy-to-use, great for small-to-medium datasets.",
                        },
                        {
                            value: "polars",
                            label: "Polars",
                            tooltip: "Fast, memory-efficient, great for large-scale in-memory analytics.",
                        },
                        {
                            value: "duckdb",
                            label: "DuckDB",
                            tooltip: "SQL-based, excellent for large datasets",
                        },
                    ],
                    advanced: true,
                },
            ],
        };
        super(
        //   'Generate Calendar',
        "生成日历", "GenerateCalendar", description, "pandas_df_input", [], _label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[0], _icons__WEBPACK_IMPORTED_MODULE_0__.generateCalendarIcon, defaultConfig, form);
    }
    provideImports() {
        return [
            "from datetime import date, datetime",
            "from dateutil.relativedelta import relativedelta",
            "import pandas as pd",
            "import polars as pl",
            "import duckdb",
            "from typing import Optional, Union, Dict, Tuple, List",
        ];
    }
    provideFunctions({ config }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        const tsGenerateCalendarFunction = `
def py_fn_generate_calendar(
    py_arg_from_date: date = None,
    py_arg_from_today: bool = False,
    py_arg_from_x_back: int = None,
    py_arg_from_what_back: str = None,
    py_arg_from_dataframe: pd.DataFrame = None,
    py_arg_from_column: str = None,
    py_arg_to_date: date = None,
    py_arg_to_today: bool = False,
    py_arg_to_column: str = None,
    py_arg_to_x_ahead: int = None,
    py_arg_to_what_ahead: str = None,
    py_arg_to_dataframe: pd.DataFrame = None,
    py_arg_calendar_fields_to_include: List[str] = None,
    py_arg_input_engine: str = "pandas",
    py_arg_output_engine: str = "pandas"
):
    """
    Generate a calendar dataframe between a computed start date and end date.

    The start ("from") and end ("to") dates can be derived from:
    - Explicit dates
    - Today
    - Relative offsets (days, weeks, months, years)


    The output calendar can include optional date-related attributes such as
    year, month, weekday, week number, and weekend flag.

    Supported engines:
    - pandas
    - polars
    - duckdb (via pandas intermediary)

    Returns
    -------
    pandas.DataFrame | polars.DataFrame | duckdb relation
        Calendar dataframe in the requested output engine.
    """

    # -----------------------------
    # Helper: resolve base date
    # -----------------------------
    def py_fn_resolve_base_date(
        py_arg_date,
        py_arg_today,
        py_arg_dataframe,
        py_arg_column,
        py_arg_engine,
        py_arg_minmax,
    ):
        if py_arg_date is not None:
            return pd.to_datetime(py_arg_date).date()

        if py_arg_today:
            return date.today()

        raise ValueError("Unable to resolve base date")

    # -----------------------------
    # Helper: apply offset
    # -----------------------------
    def py_fn_apply_calendar_offset(
    py_arg_base_date,
    py_arg_x,
    py_arg_what,
    py_arg_direction
    ):
        if py_arg_x is None or py_arg_what is None:
            return py_arg_base_date

        py_var_multiplier = -1 if py_arg_direction == "back" else 1

        if py_arg_what == "days":
            return py_arg_base_date + relativedelta(days=py_var_multiplier * py_arg_x)
        if py_arg_what == "weeks":
            return py_arg_base_date + relativedelta(weeks=py_var_multiplier * py_arg_x)
        if py_arg_what == "months":
            return py_arg_base_date + relativedelta(months=py_var_multiplier * py_arg_x)
        if py_arg_what == "years":
            return py_arg_base_date + relativedelta(years=py_var_multiplier * py_arg_x)

        raise ValueError("Invalid offset unit")

    # -----------------------------
    # Resolve FROM date
    # -----------------------------
    py_var_from_base_date = py_fn_resolve_base_date(
        py_arg_from_date,
        py_arg_from_today,
        py_arg_from_dataframe,
        py_arg_from_column,
        py_arg_input_engine,
        py_arg_minmax="min",
    )

    py_var_from_date = py_fn_apply_calendar_offset(
        py_var_from_base_date,
        py_arg_from_x_back,
        py_arg_from_what_back,
        py_arg_direction="back",
    )

    # -----------------------------
    # Resolve TO date
    # -----------------------------
    py_var_to_base_date = py_fn_resolve_base_date(
        py_arg_to_date,
        py_arg_to_today,
        py_arg_to_dataframe,
        py_arg_to_column,
        py_arg_input_engine,
        py_arg_minmax="max",
    )

    py_var_to_date = py_fn_apply_calendar_offset(
        py_var_to_base_date,
        py_arg_to_x_ahead,
        py_arg_to_what_ahead,
        py_arg_direction="ahead",
    )

    if py_var_from_date > py_var_to_date:
        raise ValueError("py_var_from_date must be <= py_var_to_date")

    # -----------------------------
    # Generate calendar (pandas base)
    # -----------------------------
    py_df_calendar = pd.DataFrame(
        #{"calendar_date": pd.date_range(start=py_var_from_date, end=py_var_to_date, freq="D").date}
		{"calendar_date": pd.date_range(start=py_var_from_date, end=py_var_to_date, freq="D")}
    )
 
    # Use py_arg_calendar_fields_to_include to determine which fields to include
    if py_arg_calendar_fields_to_include is not None:
        if "year" in py_arg_calendar_fields_to_include:
            py_df_calendar["year"] = py_df_calendar["calendar_date"].dt.year
        if "month_number" in py_arg_calendar_fields_to_include:
            py_df_calendar["month_number"] = py_df_calendar["calendar_date"].dt.month
        if "month_name" in py_arg_calendar_fields_to_include:
            py_df_calendar["month_name"] = py_df_calendar["calendar_date"].dt.month_name().astype("string")
        if "weekday_number" in py_arg_calendar_fields_to_include:
            py_df_calendar["weekday_number"] = py_df_calendar["calendar_date"].dt.weekday + 1
        if "weekday_name" in py_arg_calendar_fields_to_include:
            py_df_calendar["weekday_name"] = py_df_calendar["calendar_date"].dt.day_name().astype("string")
        if "week" in py_arg_calendar_fields_to_include:
            py_df_calendar["week"] = py_df_calendar["calendar_date"].dt.isocalendar().week.astype(int)
        if "weekend_flag" in py_arg_calendar_fields_to_include:
            py_df_calendar["is_weekend"] = py_df_calendar["calendar_date"].dt.weekday >= 5
        if "date" not in py_arg_calendar_fields_to_include:
            py_df_calendar = py_df_calendar.drop(columns=["calendar_date"])
            #without calendar_date, you may have duplicates			
            py_df_calendar=py_df_calendar.drop_duplicates()
    else:
        # Default behavior if py_arg_calendar_fields_to_include is not provided
        py_df_calendar = py_df_calendar.drop(columns=["calendar_date"])
	
		
    # -----------------------------
    # Convert output engine
    # -----------------------------
    if py_arg_output_engine == "pandas":
        return py_df_calendar
    if py_arg_output_engine == "polars":
        return pl.from_pandas(py_df_calendar)
    if py_arg_output_engine == "duckdb":      
        return duckdb.from_df(py_df_calendar)
    raise ValueError("Unsupported output engine")
	    `;
        return [tsGenerateCalendarFunction];
    }
    generateComponentCode({ config, outputName }) {
        const tsConsFieldsToInclude = JSON.stringify(config.tsCFselectMultipleCustomizableFieldsToInclude);
        let tsConstFromDate = "None";
        if (config.tsCFdateFromDate && config.tsCFdateFromDate.trim() !== "") {
            tsConstFromDate = '"' + config.tsCFdateFromDate + '"';
        }
        let tsConstToDate = "None";
        if (config.tsCFdateToDate && config.tsCFdateToDate.trim() !== "") {
            tsConstToDate = '"' + config.tsCFdateToDate + '"';
        }
        let tsConstFromWhatBack = "None";
        if (config.tsCFselectFromWhatBack &&
            config.tsCFselectFromWhatBack.trim() !== "") {
            tsConstFromWhatBack = '"' + config.tsCFselectFromWhatBack + '"';
        }
        let tsConstToWhatAhead = "None";
        if (config.tsCFselectToWhatAhead &&
            config.tsCFselectToWhatAhead.trim() !== "") {
            tsConstToWhatAhead = '"' + config.tsCFselectToWhatAhead + '"';
        }
        let tsConstFromXBack = 0;
        if (config.tsCFinputNumberFromXBack) {
            tsConstFromXBack = config.tsCFinputNumberFromXBack;
        }
        let tsConstToXAhead = 0;
        if (config.tsCFinputNumberToXAhead) {
            tsConstToXAhead = config.tsCFinputNumberToXAhead;
        }
        let tsConstFromToday = config.tsCFbooleanFromToday ? "True" : "False";
        let tsConstToToday = config.tsCFbooleanToToday ? "True" : "False";
        return `
${outputName}=py_fn_generate_calendar(
    py_arg_from_date = ${tsConstFromDate},
    py_arg_from_today = ${tsConstFromToday},
    py_arg_from_x_back = ${tsConstFromXBack},
    py_arg_from_what_back = ${tsConstFromWhatBack},

    py_arg_to_date = ${tsConstToDate},
    py_arg_to_today = ${tsConstToToday},
    py_arg_to_x_ahead = ${tsConstToXAhead},
    py_arg_to_what_ahead = ${tsConstToWhatAhead},
    py_arg_calendar_fields_to_include = ${tsConsFieldsToInclude},
    #py_arg_input_engine = '${config.tsCFSelectoutputEngine}', #replace by input
    py_arg_output_engine = '${config.tsCFSelectoutputEngine}'
    )
`.trim();
    }
}


/***/ },

/***/ "./lib/components/inputs/InlineInput.js"
/*!**********************************************!*\
  !*** ./lib/components/inputs/InlineInput.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InlineInput: () => (/* binding */ InlineInput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./label */ "./lib/components/inputs/label.js");

// import { BaseCoreComponent } from '../BaseCoreComponent';


class InlineInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const inlineDataDefault = `First Name,Last Name,Age,🏅
John,Doe,28,🥇
Jane,Smith,34,🥈
Emily,Jones,45,🥉
Michael,Brown,22,🥉
Sarah,Wilson,30,🥇`;
        const defaultConfig = { inlineData: inlineDataDefault };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "codeTextarea",
                    label: "Inline Data",
                    id: "inlineData",
                    placeholder: "Enter your CSV data here",
                    tooltip: "Type your CSV-like data directly. First line is header. For example:\nID,brand,criteria,assesement\n123,abc,Q9,Y\n145,abc,Q9,Y",
                    aiInstructions: "Generate mock CSV-like data for demonstration purposes.\nIMPORTANT: Output only raw CSV text. Limit to 20 rows unless specified otherwise by the user.",
                    aiGeneration: true,
                    aiDataSample: false,
                    aiPromptExamples: [
                        {
                            label: "Fake user data",
                            value: "Generate fake user data with columns: id, name, email, signup_date.",
                        },
                        {
                            label: "Product inventory",
                            value: "Create product inventory with columns like product_id, name, quantity, and price.",
                        },
                        {
                            label: "Mock order data",
                            value: "Generate mock order data including order_id, user_id, product_id, quantity, and order_date.",
                        },
                        {
                            label: "Survey results",
                            value: "Generate fake survey results with respondent_id, question_id, and response.",
                        },
                    ],
                    advanced: true,
                },
            ],
        };
        const description = "使用内联输入功能，您可以以类似 CSV 的格式手动输入数据，以便在流程中使用这些数据。";
        super("内联输入", "inlineInput", description, "pandas_df_input", [], _label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[0], _icons__WEBPACK_IMPORTED_MODULE_0__.editIcon, defaultConfig, form);
    }
    getEffectiveData(config) {
        const rawValue = config.inlineData;
        if (!rawValue)
            return "";
        // If it's already an object
        if (typeof rawValue === "object")
            return rawValue.code || "";
        try {
            const parsed = JSON.parse(rawValue);
            // Even if the field ID is 'inlineData', CodeTextarea saves the text in 'code'
            if (parsed && typeof parsed === "object" && "code" in parsed) {
                return parsed.code;
            }
        }
        catch (e) {
            // Backward compatibility: value is just the raw CSV string
            return rawValue;
        }
        return rawValue;
    }
    provideImports({ config }) {
        return ["import pandas as pd", "from io import StringIO"];
    }
    generateComponentCode({ config, outputName }) {
        // 1. Extract the actual CSV content from the wrapper
        const effectiveData = this.getEffectiveData(config).trim();
        if (!effectiveData) {
            throw new Error("No inline data provided.");
        }
        // 2. Escape triple quotes in case the user's data contains them
        const escapedData = effectiveData.replace(/"""/g, '\\"""');
        // 3. Generate the Pandas loading code
        // We wrap the raw string in triple quotes and pass it to StringIO
        const code = `
${outputName}_data = """${escapedData}
"""
${outputName} = pd.read_csv(StringIO(${outputName}_data)).convert_dtypes()
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/inputs/cloud/GoogleSheetsInput.js"
/*!**********************************************************!*\
  !*** ./lib/components/inputs/cloud/GoogleSheetsInput.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GoogleSheetsInput: () => (/* binding */ GoogleSheetsInput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../label */ "./lib/components/inputs/label.js");

 // Adjust the import path

class GoogleSheetsInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            sheetOptions: { spreadsheetId: "", range: "Sheet1" },
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "file",
                    label: "Service Account Key",
                    id: "filePath",
                    placeholder: "Type file name",
                    validation: "\\.(json)$",
                    validationMessage: "This field expects a file with a .json extension such as your-service-account-file.json.",
                    advanced: true,
                    connection: "Google Sheet",
                },
                {
                    type: "input",
                    label: "Spreadsheet ID",
                    id: "sheetOptions.spreadsheetId",
                    placeholder: "Enter Google Sheets' name or ID",
                    validation: "^[a-zA-Z0-9-_]+$",
                    validationMessage: "Invalid Spreadsheet ID.",
                },
                {
                    type: "input",
                    label: "Range",
                    id: "sheetOptions.range",
                    placeholder: "e.g., Sheet1 or Sheet1!A1:D5",
                    validation: "^[a-zA-Z0-9-_!]+$",
                    validationMessage: "Invalid Range.",
                },
            ],
        };
        // const description = "Use Google Sheet Input to retrieve spreadsheet data from a Google Sheet using its ID.";
        const description = "使用“谷歌表单输入”功能，通过其 ID 从谷歌表格中获取电子表格数据。";
        super(
        // "G. Sheets Input",
        "G. 输入表单", "googleSheetsInput", description, "pandas_df_input", [], _label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[0], _icons__WEBPACK_IMPORTED_MODULE_0__.fileSpreadsheetIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        deps.push("gspread");
        return deps;
    }
    provideImports({ config }) {
        return [
            "import pandas as pd",
            "import gspread",
            "from oauth2client.service_account import ServiceAccountCredentials",
        ];
    }
    generateComponentCode({ config, outputName }) {
        // Initialize an object to modify without affecting the original config
        let sheetOptions = { ...config.sheetOptions };
        // Check if service account file path is provided and not empty
        const isServiceAccountProvided = !!config.filePath && config.filePath.trim() !== "";
        // Prepare options string for pd.read_gbq
        let optionsString = Object.entries(sheetOptions)
            .filter(([key, value]) => value !== null && value !== "")
            .map(([key, value]) => `${key}="${value}"`)
            .join(", ");
        // Unique variables for each instance
        const uniqueClientVar = `${outputName}Client`;
        const uniqueSheetVar = `${outputName}Sheet`;
        // Conditional code based on service account availability
        let authenticationCode = isServiceAccountProvided
            ? `# Authentication with service account
scope = ["https://spreadsheets.google.com/feeds","https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("${config.filePath}", scope)
${uniqueClientVar} = gspread.authorize(creds)
`
            : `# Accessing public sheet without authentication
${uniqueClientVar} = gspread.service_account()
`;
        // Generate the Python code for reading data from Google Sheets
        const code = `
# Reading data from Google Sheets
${authenticationCode}
# Open the spreadsheet
${uniqueSheetVar} = ${uniqueClientVar}.open_by_key(${sheetOptions.spreadsheetId ? `"${sheetOptions.spreadsheetId}"` : "None"}).worksheet(${sheetOptions.range ? `"${sheetOptions.range.split("!")[0]}"` : "None"})
  
# Convert to DataFrame
${outputName} = pd.DataFrame(${uniqueSheetVar}.get_all_records())
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/inputs/cloud/RestInput.js"
/*!**************************************************!*\
  !*** ./lib/components/inputs/cloud/RestInput.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RestInput: () => (/* binding */ RestInput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../label */ "./lib/components/inputs/label.js");

 // Adjust the import path

class RestInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = { method: "GET", headers: [] };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "input",
                    label: "URL",
                    id: "url",
                    placeholder: "Endpoint URL",
                },
                {
                    type: "radio",
                    label: "Method",
                    id: "method",
                    options: [
                        { value: "GET", label: "GET" },
                        { value: "PUT", label: "PUT" },
                        { value: "POST", label: "POST" },
                        { value: "DELETE", label: "DELETE" },
                    ],
                    advanced: true,
                },
                {
                    type: "keyvalue",
                    label: "Headers",
                    id: "headers",
                    advanced: true,
                },
                {
                    type: "textarea",
                    label: "Body",
                    id: "body",
                    placeholder: "Write body in JSON",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "JSON Path",
                    id: "jsonPath",
                    placeholder: "JSON Path to retrieve from response",
                    advanced: true,
                },
            ],
        };
        // const description = "Use REST Input to perform GET, PUT, POST, and DELETE requests on REST endpoints.";
        const description = "使用 REST 输入功能，可以对 REST 端点执行 GET、PUT、POST 和 DELETE 请求操作。";
        super(
        // "REST Input",
        "REST 输入", "restInput", description, "pandas_df_input", [], _label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[0], _icons__WEBPACK_IMPORTED_MODULE_0__.apiIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return [
            "import pandas as pd",
            "import json",
            "import requests",
            "from jsonpath_ng import parse",
        ];
    }
    provideDependencies({ config }) {
        let deps = [];
        deps.push("jsonpath_ng");
        return deps;
    }
    generateComponentCode({ config, outputName }) {
        let bodyParam = "";
        if (config.body && config.body.trim() !== "") {
            // JSON body as a Python dictionary
            bodyParam = `json=${config.body.trim()}, `;
        }
        let headersParam = "";
        if (config.headers && config.headers.length > 0) {
            headersParam =
                "headers={" +
                    config.headers
                        .map((header) => `"${header.key}": "${header.value}"`)
                        .join(", ") +
                    "}, ";
        }
        let jsonPathParam = "";
        if (config.jsonPath && config.jsonPath.trim() !== "") {
            jsonPathParam = `${outputName}_jsonpath_expr = parse('${config.jsonPath}')\nselected_data = [match.value for match in ${outputName}_jsonpath_expr.find(${outputName}_data)] if ${outputName}_jsonpath_expr.find(${outputName}_data) else []\n${outputName} = pd.DataFrame(selected_data).convert_dtypes() if selected_data else pd.DataFrame()\n`;
        }
        else {
            jsonPathParam = `${outputName} = pd.DataFrame([${outputName}_data]).convert_dtypes() if isinstance(${outputName}_data, dict) else pd.DataFrame(${outputName}_data).convert_dtypes()\n`;
        }
        const params = `${headersParam}${bodyParam}`;
        const trimmedParams = params.endsWith(", ") ? params.slice(0, -2) : params; // Remove trailing comma and space if present
        const code = `
${outputName}_response = requests.request(
  method="${config.method}",
  url="${config.url}"${trimmedParams ? ", " + trimmedParams : ""}
)
${outputName}_data = ${outputName}_response.json()
${jsonPathParam}
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/inputs/databases/DatabaseInput.js"
/*!**********************************************************!*\
  !*** ./lib/components/inputs/databases/DatabaseInput.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatabaseInput: () => (/* binding */ DatabaseInput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _MySQLInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MySQLInput */ "./lib/components/inputs/databases/MySQLInput.js");
/* harmony import */ var _PostgresInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PostgresInput */ "./lib/components/inputs/databases/PostgresInput.js");
/* harmony import */ var _ODBCInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ODBCInput */ "./lib/components/inputs/databases/ODBCInput.js");
/* harmony import */ var _SqlServerInput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SqlServerInput */ "./lib/components/inputs/databases/SqlServerInput.js");
/* harmony import */ var _SnowflakeInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SnowflakeInput */ "./lib/components/inputs/databases/SnowflakeInput.js");
/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../label */ "./lib/components/inputs/label.js");








class DatabaseInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = { provider: "postgres" };
        const mysql = new _MySQLInput__WEBPACK_IMPORTED_MODULE_2__.MySQLInput();
        const pg = new _PostgresInput__WEBPACK_IMPORTED_MODULE_3__.PostgresInput();
        const odbc = new _ODBCInput__WEBPACK_IMPORTED_MODULE_4__.ODBCInput();
        const mssql = new _SqlServerInput__WEBPACK_IMPORTED_MODULE_5__.SqlServerInput();
        const snowflake = new _SnowflakeInput__WEBPACK_IMPORTED_MODULE_6__.SnowflakeInput();
        const getFields = (comp) => {
            const form = comp._form;
            return Array.isArray(form === null || form === void 0 ? void 0 : form.fields) ? form.fields : [];
        };
        const wrapFields = (fields, provider) => fields.map((f) => ({
            ...f,
            condition: { provider: [provider], ...(f.condition || {}) },
        }));
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "select",
                    label: "数据库类型",
                    id: "provider",
                    options: [
                        { value: "postgres", label: "PostgreSQL" },
                        { value: "mysql", label: "MySQL" },
                        { value: "sqlserver", label: "SQL Server" },
                        { value: "snowflake", label: "Snowflake" },
                        { value: "odbc", label: "ODBC" },
                    ],
                },
                ...wrapFields(getFields(mysql), "mysql"),
                ...wrapFields(getFields(pg), "postgres"),
                ...wrapFields(getFields(mssql), "sqlserver"),
                ...wrapFields(getFields(odbc), "odbc"),
                ...wrapFields(getFields(snowflake), "snowflake"),
            ],
        };
        const description = "“数据库输入”功能允许您选择一个数据库，并通过表格或自定义 SQL 语句来加载数据框。";
        // const description =
        //   "Database Input lets you choose a database and load a DataFrame via table or custom SQL.";
        super(
        // "Database Input",
        "数据库 输入", "databaseInput", description, "pandas_df_input", [], _label__WEBPACK_IMPORTED_MODULE_7__.chineseLabel[0], _icons__WEBPACK_IMPORTED_MODULE_0__.databaseIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        switch (config.provider) {
            case "mysql":
                return new _MySQLInput__WEBPACK_IMPORTED_MODULE_2__.MySQLInput().provideDependencies({ config });
            case "postgres":
                return new _PostgresInput__WEBPACK_IMPORTED_MODULE_3__.PostgresInput().provideDependencies({ config });
            case "sqlserver":
                return new _SqlServerInput__WEBPACK_IMPORTED_MODULE_5__.SqlServerInput().provideDependencies({ config });
            case "odbc":
                return new _ODBCInput__WEBPACK_IMPORTED_MODULE_4__.ODBCInput().provideDependencies({ config });
            case "snowflake":
                return new _SnowflakeInput__WEBPACK_IMPORTED_MODULE_6__.SnowflakeInput().provideDependencies({ config });
            default:
                return [];
        }
    }
    provideImports({ config }) {
        const imports = config.provider === "mysql"
            ? new _MySQLInput__WEBPACK_IMPORTED_MODULE_2__.MySQLInput().provideImports({ config })
            : config.provider === "postgres"
                ? new _PostgresInput__WEBPACK_IMPORTED_MODULE_3__.PostgresInput().provideImports({ config })
                : config.provider === "sqlserver"
                    ? new _SqlServerInput__WEBPACK_IMPORTED_MODULE_5__.SqlServerInput().provideImports({ config })
                    : config.provider === "odbc"
                        ? new _ODBCInput__WEBPACK_IMPORTED_MODULE_4__.ODBCInput().provideImports({ config })
                        : config.provider === "snowflake"
                            ? new _SnowflakeInput__WEBPACK_IMPORTED_MODULE_6__.SnowflakeInput().provideImports({ config })
                            : [];
        const seen = new Set();
        return imports.filter((i) => (seen.has(i) ? false : (seen.add(i), true)));
    }
    generateDatabaseConnectionCode({ config, connectionName }) {
        switch (config.provider) {
            case "mysql":
                return new _MySQLInput__WEBPACK_IMPORTED_MODULE_2__.MySQLInput().generateDatabaseConnectionCode({
                    config,
                    connectionName,
                });
            case "postgres":
                return new _PostgresInput__WEBPACK_IMPORTED_MODULE_3__.PostgresInput().generateDatabaseConnectionCode({
                    config,
                    connectionName,
                });
            case "sqlserver":
                return new _SqlServerInput__WEBPACK_IMPORTED_MODULE_5__.SqlServerInput().generateDatabaseConnectionCode({
                    config,
                    connectionName,
                });
            case "snowflake":
                return new _SnowflakeInput__WEBPACK_IMPORTED_MODULE_6__.SnowflakeInput().generateDatabaseConnectionCode({
                    config,
                    connectionName,
                });
            default:
                return "";
        }
    }
    generateComponentCode({ config, outputName }) {
        switch (config.provider) {
            case "mysql":
                return new _MySQLInput__WEBPACK_IMPORTED_MODULE_2__.MySQLInput().generateComponentCode({ config, outputName });
            case "postgres":
                return new _PostgresInput__WEBPACK_IMPORTED_MODULE_3__.PostgresInput().generateComponentCode({
                    config,
                    outputName,
                });
            case "sqlserver":
                return new _SqlServerInput__WEBPACK_IMPORTED_MODULE_5__.SqlServerInput().generateComponentCode({
                    config,
                    outputName,
                });
            case "odbc":
                return new _ODBCInput__WEBPACK_IMPORTED_MODULE_4__.ODBCInput().generateComponentCode({ config, outputName });
            case "snowflake":
                return new _SnowflakeInput__WEBPACK_IMPORTED_MODULE_6__.SnowflakeInput().generateComponentCode({
                    config,
                    outputName,
                });
            default:
                return "";
        }
    }
}


/***/ },

/***/ "./lib/components/inputs/databases/MySQLInput.js"
/*!*******************************************************!*\
  !*** ./lib/components/inputs/databases/MySQLInput.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MySQLInput: () => (/* binding */ MySQLInput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");

 // Adjust the import path
class MySQLInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            host: "localhost",
            port: "3306",
            databaseName: "",
            username: "",
            password: "",
            tableName: "",
            queryMethod: "table",
        };
        const form = {
            fields: [
                {
                    type: "input",
                    label: "Host",
                    id: "host",
                    placeholder: "Enter database host",
                    connection: "Mysql",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Port",
                    id: "port",
                    placeholder: "Enter database port",
                    connection: "Mysql",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Database Name",
                    id: "databaseName",
                    placeholder: "Enter database name",
                    connection: "Mysql",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Username",
                    id: "username",
                    placeholder: "Enter username",
                    connection: "Mysql",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Password",
                    id: "password",
                    placeholder: "Enter password",
                    inputType: "password",
                    connection: "Mysql",
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "Query Method",
                    id: "queryMethod",
                    tooltip: "Select whether you want to specify the table name to retrieve data or use a custom SQL query for greater flexibility.",
                    options: [
                        { value: "table", label: "表名" },
                        // { value: "table", label: "Table Name" },
                        { value: "query", label: "SQL Query" },
                    ],
                    advanced: true,
                },
                {
                    type: "table",
                    label: "表名",
                    // label: "Table Name",
                    query: `SHOW TABLES;`,
                    id: "tableName",
                    placeholder: "输入表名",
                    condition: { queryMethod: "table" },
                },
                {
                    type: "codeTextarea",
                    label: "SQL Query",
                    height: "50px",
                    mode: "sql",
                    placeholder: "SELECT * FROM table_name",
                    id: "sqlQuery",
                    tooltip: "Optional. By default the SQL query is: SELECT * FROM table_name_provided. If specified, the SQL Query is used.",
                    advanced: true,
                    condition: { queryMethod: "query" },
                },
            ],
        };
        const description = "Use MySQL Input to retrieve data from MySQL by specifying either a table name or a custom SQL query.";
        super("MySQL Input", "mySQLInput", description, "pandas_df_input", [], "inputs.Databases", _icons__WEBPACK_IMPORTED_MODULE_0__.mySQLIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        deps.push("pymysql");
        return deps;
    }
    provideImports({ config }) {
        return ["import pandas as pd", "import sqlalchemy", "import pymysql"];
    }
    generateDatabaseConnectionCode({ config, connectionName }) {
        let connectionString = `mysql+pymysql://${config.username}:${config.password}@${config.host}:${config.port}/${config.databaseName}`;
        const connectionCode = `
# Connect to the MySQL database
${connectionName} = sqlalchemy.create_engine("${connectionString}")
`;
        return connectionCode;
    }
    generateComponentCode({ config, outputName }) {
        var _a, _b;
        const uniqueEngineName = `${outputName}_Engine`;
        // Build table reference if tableName exists
        const tableReference = ((_a = config.tableName) === null || _a === void 0 ? void 0 : _a.value) || null;
        let sqlQuery;
        if (config.queryMethod === "query" && config.sqlQuery) {
            try {
                const parsedQuery = JSON.parse(config.sqlQuery);
                sqlQuery = (_b = parsedQuery.code) === null || _b === void 0 ? void 0 : _b.trim();
                // Only fall back to table reference if it exists
                if (!sqlQuery) {
                    if (tableReference) {
                        sqlQuery = `SELECT * FROM ${tableReference}`;
                    }
                    else {
                        throw new Error("No SQL query provided and table name is missing");
                    }
                }
            }
            catch (e) {
                console.error("Failed to parse SQL query:", e);
                if (tableReference) {
                    sqlQuery = `SELECT * FROM ${tableReference}`;
                }
                else {
                    throw new Error("Invalid SQL query and no valid table name available");
                }
            }
        }
        else {
            // Default to table query
            if (!tableReference) {
                throw new Error("Table name is missing");
            }
            sqlQuery = `SELECT * FROM ${tableReference}`;
        }
        const connectionCode = this.generateDatabaseConnectionCode({
            config,
            connectionName: uniqueEngineName,
        });
        const code = `
${connectionCode}

# Execute SQL statement
try:
    with ${uniqueEngineName}.connect() as conn:
        ${outputName} = pd.read_sql(
            """
            ${sqlQuery}
            """,
            con=conn.connection
        ).convert_dtypes()
finally:
    ${uniqueEngineName}.dispose()
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/inputs/databases/ODBCInput.js"
/*!******************************************************!*\
  !*** ./lib/components/inputs/databases/ODBCInput.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ODBCInput: () => (/* binding */ ODBCInput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");

 // Adjust the import path
class ODBCInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            connectionString: "",
            queryMethod: "table",
            tableName: "",
            sqlQuery: "",
            autoCommit: true,
        };
        const form = {
            fields: [
                {
                    type: "input",
                    label: "Connection String",
                    id: "connectionString",
                    placeholder: "Enter ODBC connection string",
                    tooltip: "Provide the full ODBC connection string for your database. Reference: https://github.com/mkleehammer/pyodbc/wiki/Connecting-to-databases",
                    connection: "ODBC",
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Auto Commit",
                    tooltip: "Setting autocommit True will cause the database to issue a commit after each SQL statement, otherwise database transactions will have to be explicity committed. As per the Python DB API, the default value is False (even though the ODBC default value is True). Typically, you will probably want to set autocommit True when creating a connection.",
                    id: "autoCommit",
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "Query Method",
                    id: "queryMethod",
                    tooltip: "Select whether you want to specify the table name to retrieve data or use a custom SQL query for greater flexibility.",
                    options: [
                        { value: "table", label: "表名" },
                        // { value: "table", label: "Table Name" },
                        { value: "query", label: "SQL Query" },
                    ],
                    advanced: true,
                },
                {
                    type: "input",
                    label: "表名",
                    // label: "Table Name",
                    id: "tableName",
                    placeholder: "输入表名",
                    condition: { queryMethod: "table" },
                },
                {
                    type: "codeTextarea",
                    label: "SQL Query",
                    height: "50px",
                    mode: "sql",
                    placeholder: "SELECT * FROM table_name",
                    id: "sqlQuery",
                    tooltip: "Optional. By default the SQL query is: SELECT * FROM table_name_provided. If specified, the SQL Query is used.",
                    condition: { queryMethod: "query" },
                    advanced: true,
                },
            ],
        };
        const description = "Use ODBC Input to retrieve data from various databases using an ODBC connection string, along with either a table name or a custom SQL query.";
        super("ODBC Input", "odbcInput", description, "pandas_df_input", [], "inputs.Databases", _icons__WEBPACK_IMPORTED_MODULE_0__.databaseIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        return ["pyodbc"];
    }
    provideImports({ config }) {
        return ["import pandas as pd", "import pyodbc"];
    }
    generateComponentCode({ config, outputName }) {
        var _a;
        // Escape single quotes in the connection string
        const connectionString = config.connectionString.replace(/'/g, "\\'");
        const autoCommit = config.autoCommit;
        // Build table reference if tableName exists
        const tableReference = config.tableName || null;
        let sqlQuery;
        if (config.queryMethod === "query" && config.sqlQuery) {
            try {
                const parsedQuery = JSON.parse(config.sqlQuery);
                sqlQuery = (_a = parsedQuery.code) === null || _a === void 0 ? void 0 : _a.trim();
                // Only fall back to table reference if it exists
                if (!sqlQuery) {
                    if (tableReference) {
                        sqlQuery = `SELECT * FROM ${tableReference}`;
                    }
                    else {
                        throw new Error("No SQL query provided and table name is missing");
                    }
                }
            }
            catch (e) {
                console.error("Failed to parse SQL query:", e);
                if (tableReference) {
                    sqlQuery = `SELECT * FROM ${tableReference}`;
                }
                else {
                    throw new Error("Invalid SQL query and no valid table name available");
                }
            }
        }
        else {
            // Default to table query
            if (!tableReference) {
                throw new Error("Table name is missing");
            }
            sqlQuery = `SELECT * FROM ${tableReference}`;
        }
        const code = `
# Connect to the database using ODBC
conn = pyodbc.connect(f"""${connectionString}""", autocommit=${autoCommit ? "True" : "False"})

# Execute SQL statement
try:
    ${outputName} = pd.read_sql(
        """
        ${sqlQuery}
        """,
        conn
    ).convert_dtypes()
finally:
    conn.close()
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/inputs/databases/OracleInput.js"
/*!********************************************************!*\
  !*** ./lib/components/inputs/databases/OracleInput.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OracleInput: () => (/* binding */ OracleInput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");

 // Adjust the import path
class OracleInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            host: "localhost",
            port: "1521",
            databaseName: "",
            username: "",
            password: "",
            tableName: "",
            queryMethod: "table",
            dbapi: "oracledb",
        };
        const form = {
            fields: [
                {
                    type: "input",
                    label: "Host",
                    id: "host",
                    placeholder: "Enter database host",
                    connection: "Oracle DB",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Port",
                    id: "port",
                    placeholder: "Enter database port",
                    connection: "Oracle DB",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Database Name",
                    id: "databaseName",
                    placeholder: "Enter database name",
                    connection: "Oracle DB",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Username",
                    id: "username",
                    placeholder: "Enter username",
                    connection: "Oracle DB",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Password",
                    id: "password",
                    placeholder: "Enter password",
                    inputType: "password",
                    connection: "Oracle DB",
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "Query Method",
                    id: "queryMethod",
                    tooltip: "Select whether you want to specify the table name to retrieve data or use a custom SQL query for greater flexibility.",
                    options: [
                        { value: "table", label: "表名" },
                        // { value: "table", label: "Table Name" },
                        { value: "query", label: "SQL Query" },
                    ],
                    advanced: true,
                },
                {
                    type: "table",
                    label: "表名",
                    // label: "Table Name",
                    query: `SELECT table_name FROM user_tables;`,
                    id: "tableName",
                    condition: { queryMethod: "table" },
                    placeholder: "输入表名",
                },
                {
                    type: "codeTextarea",
                    label: "SQL Query",
                    height: "50px",
                    mode: "sql",
                    placeholder: "SELECT * FROM table_name",
                    id: "sqlQuery",
                    tooltip: "Optional. By default the SQL query is: SELECT * FROM table_name_provided. If specified, the SQL Query is used.",
                    condition: { queryMethod: "query" },
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Oracle Client Path (Optional)",
                    tooltip: "You might need to specify a different Oracle client path than the default one. To do this, use the option to point to the directory of the desired Oracle client.",
                    id: "oracleClient",
                    placeholder: "Specify oracle client path",
                    advanced: true,
                },
                {
                    type: "select",
                    label: "Database API (DBAPI)",
                    tooltip: "",
                    id: "dbapi",
                    options: [
                        { value: "cx_Oracle", label: "cx-Oracle" },
                        { value: "oracledb", label: "python-oracledb" },
                    ],
                    advanced: true,
                },
            ],
        };
        const description = "Use Oracle Input to retrieve data from an Oracle database by specifying either a table name or a custom SQL query.";
        super("Oracle Input", "oracleInput", description, "pandas_df_input", [], "inputs.Databases", _icons__WEBPACK_IMPORTED_MODULE_0__.oracleIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        if (config.dbapi === "cx_Oracle") {
            deps.push("cx_Oracle");
        }
        else if (config.dbapi === "oracledb") {
            deps.push("oracledb");
        }
        return deps;
    }
    provideImports({ config }) {
        const imports = ["import pandas as pd", "import sqlalchemy"];
        if (config.dbapi === "cx_Oracle") {
            imports.push("import cx_Oracle");
        }
        else if (config.dbapi === "oracledb") {
            imports.push("import oracledb");
        }
        return imports;
    }
    generateDatabaseConnectionCode({ config, connectionName }) {
        const dbapi = config.dbapi;
        // Initialize the Oracle client if oracleClient is provided
        const oracleClientInitialization = config.oracleClient && config.oracleClient.trim()
            ? `${dbapi}.init_oracle_client(lib_dir="${config.oracleClient}")\n`
            : "";
        let connectionString = `oracle+${dbapi}://${config.username}:${config.password}@${config.host}:${config.port}/?service_name=${config.databaseName}`;
        const connectionCode = `
# Connect to the Oracle database
${oracleClientInitialization}${connectionName} = sqlalchemy.create_engine("${connectionString}")
`;
        return connectionCode;
    }
    generateComponentCode({ config, outputName }) {
        const uniqueEngineName = `${outputName}_Engine`; // Unique engine name based on the outputName
        const sqlQuery = config.queryMethod === "query" &&
            config.sqlQuery &&
            config.sqlQuery.trim()
            ? config.sqlQuery
            : `SELECT * FROM ${config.tableName.value}`;
        const connectionCode = this.generateDatabaseConnectionCode({
            config,
            connectionName: uniqueEngineName,
        });
        const code = `
${connectionCode}

# Execute SQL statement
try:
    with ${uniqueEngineName}.connect() as conn:
        ${outputName} = pd.read_sql(
            """
            ${sqlQuery}
            """,
            con=conn.connection
        ).convert_dtypes()
finally:
    ${uniqueEngineName}.dispose()
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/inputs/databases/PostgresInput.js"
/*!**********************************************************!*\
  !*** ./lib/components/inputs/databases/PostgresInput.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PostgresInput: () => (/* binding */ PostgresInput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");

 // Adjust the import path
class PostgresInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            host: "localhost",
            port: "5432",
            databaseName: "",
            username: "",
            password: "",
            schema: "public",
            tableName: "",
            queryMethod: "table",
        };
        const form = {
            fields: [
                {
                    type: "input",
                    label: "Host",
                    id: "host",
                    placeholder: "Enter database host",
                    connection: "Postgres",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Port",
                    id: "port",
                    placeholder: "Enter database port",
                    connection: "Postgres",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Database Name",
                    id: "databaseName",
                    placeholder: "Enter database name",
                    connection: "Postgres",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Username",
                    id: "username",
                    placeholder: "Enter username",
                    connection: "Postgres",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Password",
                    id: "password",
                    placeholder: "Enter password",
                    connection: "Postgres",
                    inputType: "password",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Schema",
                    id: "schema",
                    placeholder: "Enter schema name",
                },
                {
                    type: "radio",
                    label: "Query Method",
                    id: "queryMethod",
                    tooltip: "Select whether you want to specify the table name to retrieve data or use a custom SQL query for greater flexibility.",
                    options: [
                        { value: "table", label: "表名" },
                        // { value: "table", label: "Table Name" },
                        { value: "query", label: "SQL Query" },
                    ],
                    advanced: true,
                },
                {
                    type: "table",
                    label: "表名",
                    // label: "Table Name",
                    query: `SELECT table_name FROM information_schema.tables WHERE table_schema = '{{schema}}';`,
                    id: "tableName",
                    placeholder: "输入表名",
                    condition: { queryMethod: "table" },
                },
                {
                    type: "codeTextarea",
                    label: "SQL Query",
                    height: "150px",
                    mode: "sql",
                    placeholder: "SELECT * FROM table_name",
                    id: "sqlQuery",
                    tooltip: "Optional. By default the SQL query is: SELECT * FROM table_name_provided. If specified, the SQL Query is used.",
                    condition: { queryMethod: "query" },
                    advanced: true,
                },
            ],
        };
        const description = "Use Postgres Input to retrieve data from Postgres by specifying either a table name or a custom SQL query.";
        super("Postgres Input", "postgresInput", description, "pandas_df_input", [], "inputs.Databases", _icons__WEBPACK_IMPORTED_MODULE_0__.postgresIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        deps.push("psycopg2-binary");
        return deps;
    }
    provideImports({ config }) {
        return ["import pandas as pd", "import sqlalchemy", "import psycopg2"];
    }
    generateDatabaseConnectionCode({ config, connectionName }) {
        let connectionString = `postgresql://${config.username}:${config.password}@${config.host}:${config.port}/${config.databaseName}`;
        const connectionCode = `
# Connect to the PostgreSQL database
${connectionName} = sqlalchemy.create_engine("${connectionString}")
`;
        return connectionCode;
    }
    generateComponentCode({ config, outputName }) {
        var _a, _b;
        const uniqueEngineName = `${outputName}_Engine`;
        // Build table reference only if both schema and tableName exist
        const tableReference = config.schema && ((_a = config.tableName) === null || _a === void 0 ? void 0 : _a.value)
            ? `"${config.schema}"."${config.tableName.value}"`
            : null;
        let sqlQuery;
        if (config.queryMethod === "query" && config.sqlQuery) {
            try {
                const parsedQuery = JSON.parse(config.sqlQuery);
                sqlQuery = (_b = parsedQuery.code) === null || _b === void 0 ? void 0 : _b.trim();
                // Only fall back to table reference if it exists
                if (!sqlQuery) {
                    if (tableReference) {
                        sqlQuery = `SELECT * FROM ${tableReference}`;
                    }
                    else {
                        throw new Error("No SQL query provided and table reference is incomplete");
                    }
                }
            }
            catch (e) {
                console.error("Failed to parse SQL query:", e);
                if (tableReference) {
                    sqlQuery = `SELECT * FROM ${tableReference}`;
                }
                else {
                    throw new Error("Invalid SQL query and no valid table reference available");
                }
            }
        }
        else {
            // Default to table query
            if (!tableReference) {
                throw new Error("Table reference is incomplete (missing schema or tableName)");
            }
            sqlQuery = `SELECT * FROM ${tableReference}`;
        }
        const connectionCode = this.generateDatabaseConnectionCode({
            config,
            connectionName: uniqueEngineName,
        });
        const code = `
${connectionCode}

# Execute SQL statement
try:
    with ${uniqueEngineName}.connect() as conn:
        ${outputName} = pd.read_sql(
            """
            ${sqlQuery}
            """,
            con=conn.connection
        ).convert_dtypes()
finally:
    ${uniqueEngineName}.dispose()
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/inputs/databases/SnowflakeInput.js"
/*!***********************************************************!*\
  !*** ./lib/components/inputs/databases/SnowflakeInput.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SnowflakeInput: () => (/* binding */ SnowflakeInput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");

 // Adjust the import path
class SnowflakeInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            schema: "PUBLIC",
            tableName: "",
            queryMethod: "table",
        };
        const form = {
            fields: [
                {
                    type: "input",
                    label: "Account",
                    id: "account",
                    placeholder: "Enter Account",
                    connection: "Snowflake",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Database Name",
                    id: "database",
                    connection: "Snowflake",
                    placeholder: "Enter database name",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Username",
                    id: "username",
                    placeholder: "Enter username",
                    connection: "Snowflake",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Password",
                    id: "password",
                    placeholder: "Enter password",
                    connection: "Snowflake",
                    inputType: "password",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Warehouse",
                    id: "warehouse",
                    placeholder: "Enter warehouse name",
                    connection: "Snowflake",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Schema",
                    id: "schema",
                    connection: "Snowflake",
                    placeholder: "Enter schema name",
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "Query Method",
                    id: "queryMethod",
                    tooltip: "Select whether you want to specify the table name to retrieve data or use a custom SQL query for greater flexibility.",
                    options: [
                        { value: "table", label: "表名" },
                        { value: "query", label: "SQL Query" },
                    ],
                    advanced: true,
                },
                {
                    type: "table",
                    label: "表名",
                    query: `SELECT table_name FROM information_schema.tables WHERE table_schema = '{{schema}}'`,
                    id: "tableName",
                    placeholder: "输入表名",
                    condition: { queryMethod: "table" },
                },
                {
                    type: "codeTextarea",
                    label: "SQL Query",
                    height: "50px",
                    mode: "sql",
                    placeholder: "SELECT * FROM table_name",
                    id: "sqlQuery",
                    tooltip: "Optional. By default the SQL query is: SELECT * FROM table_name_provided. If specified, the SQL Query is used.",
                    condition: { queryMethod: "query" },
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Role (Optional)",
                    id: "role",
                    placeholder: "Role name",
                    advanced: true,
                },
            ],
        };
        const description = "Use Snowflake Input to retrieve data from Snowflake by specifying either a table name or a custom SQL query.";
        super("Snowflake Input", "snowflakeInput", description, "pandas_df_input", [], "inputs.Databases", _icons__WEBPACK_IMPORTED_MODULE_0__.snowflakeIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        deps.push("snowflake-sqlalchemy");
        return deps;
    }
    provideImports({ config }) {
        return [
            "import pandas as pd",
            "import sqlalchemy",
            "import urllib.parse",
            "from snowflake.sqlalchemy import URL",
        ];
    }
    generateDatabaseConnectionCode({ config, connectionName }) {
        const connectionCode = `
# Connect to the Snowflake database
${connectionName} = sqlalchemy.create_engine(URL(
    account = '${config.account}',
    user = '${config.username}',
    password = urllib.parse.quote("${config.password}"),
    database = '${config.database}',
    schema = '${config.schema}',
    warehouse = '${config.warehouse}'
))
`;
        return connectionCode;
    }
    generateComponentCode({ config, outputName }) {
        var _a, _b;
        const uniqueEngineName = `${outputName}_Engine`;
        // Build table reference with optional schema
        const tableReference = ((_a = config.tableName) === null || _a === void 0 ? void 0 : _a.value)
            ? config.schema && config.schema.toLowerCase() !== "public"
                ? `"${config.schema}"."${config.tableName.value}"`
                : `"${config.tableName.value}"`
            : null;
        let sqlQuery;
        if (config.queryMethod === "query" && config.sqlQuery) {
            try {
                const parsedQuery = JSON.parse(config.sqlQuery);
                sqlQuery = (_b = parsedQuery.code) === null || _b === void 0 ? void 0 : _b.trim();
                // Only fall back to table reference if it exists
                if (!sqlQuery) {
                    if (tableReference) {
                        sqlQuery = `SELECT * FROM ${tableReference}`;
                    }
                    else {
                        throw new Error("No SQL query provided and table name is missing");
                    }
                }
            }
            catch (e) {
                console.error("Failed to parse SQL query:", e);
                if (tableReference) {
                    sqlQuery = `SELECT * FROM ${tableReference}`;
                }
                else {
                    throw new Error("Invalid SQL query and no valid table name available");
                }
            }
        }
        else {
            // Default to table query
            if (!tableReference) {
                throw new Error("Table name is missing");
            }
            sqlQuery = `SELECT * FROM ${tableReference}`;
        }
        const connectionCode = this.generateDatabaseConnectionCode({
            config,
            connectionName: uniqueEngineName,
        });
        const code = `
${connectionCode}

# Execute SQL statement
try:
    with ${uniqueEngineName}.connect() as conn:
        ${outputName} = pd.read_sql(
            """
            ${sqlQuery}
            """,
            con=conn.connection
        ).convert_dtypes()
finally:
    ${uniqueEngineName}.dispose()
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/inputs/databases/SqlServerInput.js"
/*!***********************************************************!*\
  !*** ./lib/components/inputs/databases/SqlServerInput.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SqlServerInput: () => (/* binding */ SqlServerInput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");

 // Adjust the import path
class SqlServerInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            host: "localhost",
            port: "1433",
            databaseName: "",
            username: "",
            password: "",
            tableName: "",
            queryMethod: "table",
        };
        const form = {
            fields: [
                {
                    type: "input",
                    label: "Host",
                    id: "host",
                    placeholder: "Enter database host",
                    connection: "SQL Server",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Port",
                    id: "port",
                    placeholder: "Enter database port",
                    connection: "SQL Server",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Database Name",
                    id: "databaseName",
                    placeholder: "Enter database name",
                    connection: "SQL Server",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Username",
                    id: "username",
                    placeholder: "Enter username",
                    connection: "SQL Server",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Password",
                    id: "password",
                    placeholder: "Enter password",
                    connection: "SQL Server",
                    inputType: "password",
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "Query Method",
                    id: "queryMethod",
                    tooltip: "Select whether you want to specify the table name to retrieve data or use a custom SQL query for greater flexibility.",
                    options: [
                        { value: "table", label: "表名" },
                        // { value: "table", label: "Table Name" },
                        { value: "query", label: "SQL Query" },
                    ],
                    advanced: true,
                },
                {
                    type: "table",
                    label: "表名",
                    query: `SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE';`,
                    id: "tableName",
                    condition: { queryMethod: "table" },
                    placeholder: "输入表名",
                },
                {
                    type: "codeTextarea",
                    label: "SQL Query",
                    height: "50px",
                    mode: "sql",
                    placeholder: "SELECT * FROM table_name",
                    id: "sqlQuery",
                    tooltip: "Optional. By default the SQL query is: SELECT * FROM table_name_provided. If specified, the SQL Query is used.",
                    condition: { queryMethod: "query" },
                    advanced: true,
                },
                {
                    type: "info",
                    label: "Drivers installation",
                    id: "driversInstallation",
                    text: "You may need to install additional drivers on your machine for this component to function. /n For Mac you need to install 'brew install unixodbc'",
                    advanced: true,
                },
            ],
        };
        const description = "Use SQL Server Input to retrieve data from SQL Server by specifying either a table name or a custom SQL query.";
        super("SQL Server Input", "sqlServerInput", description, "pandas_df_input", [], "inputs.Databases", _icons__WEBPACK_IMPORTED_MODULE_0__.sqlServerIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        deps.push("pyodbc");
        return deps;
    }
    provideImports({ config }) {
        return ["import pandas as pd", "import sqlalchemy", "import pyodbc"];
    }
    generateDatabaseConnectionCode({ config, connectionName }) {
        let connectionString = `mssql+pyodbc://${config.username}:${config.password}@${config.host}:${config.port}/${config.databaseName}?driver=ODBC+Driver+17+for+SQL+Server`;
        const connectionCode = `
# Connect to the SQL Server database
${connectionName} = sqlalchemy.create_engine("${connectionString}")
`;
        return connectionCode;
    }
    generateComponentCode({ config, outputName }) {
        var _a, _b;
        const uniqueEngineName = `${outputName}_Engine`;
        // Build table reference if tableName exists
        const tableReference = ((_a = config.tableName) === null || _a === void 0 ? void 0 : _a.value) || null;
        let sqlQuery;
        if (config.queryMethod === "query" && config.sqlQuery) {
            try {
                const parsedQuery = JSON.parse(config.sqlQuery);
                sqlQuery = (_b = parsedQuery.code) === null || _b === void 0 ? void 0 : _b.trim();
                // Only fall back to table reference if it exists
                if (!sqlQuery) {
                    if (tableReference) {
                        sqlQuery = `SELECT * FROM ${tableReference}`;
                    }
                    else {
                        throw new Error("No SQL query provided and table name is missing");
                    }
                }
            }
            catch (e) {
                console.error("Failed to parse SQL query:", e);
                if (tableReference) {
                    sqlQuery = `SELECT * FROM ${tableReference}`;
                }
                else {
                    throw new Error("Invalid SQL query and no valid table name available");
                }
            }
        }
        else {
            // Default to table query
            if (!tableReference) {
                throw new Error("Table name is missing");
            }
            sqlQuery = `SELECT * FROM ${tableReference}`;
        }
        const connectionCode = this.generateDatabaseConnectionCode({
            config,
            connectionName: uniqueEngineName,
        });
        const code = `
${connectionCode}

# Execute SQL statement
try:
    with ${uniqueEngineName}.connect() as conn:
        ${outputName} = pd.read_sql(
            """
            ${sqlQuery}
            """,
            con=conn.connection
        ).convert_dtypes()
finally:
    ${uniqueEngineName}.dispose()
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/inputs/files/CsvFileInput.js"
/*!*****************************************************!*\
  !*** ./lib/components/inputs/files/CsvFileInput.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CsvFileInput: () => (/* binding */ CsvFileInput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/S3OptionsHandler */ "./lib/components/common/S3OptionsHandler.js");
/* harmony import */ var _common_FileUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/FileUtils */ "./lib/components/common/FileUtils.js");
/* harmony import */ var _common_FTPOptionsHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/FTPOptionsHandler */ "./lib/components/common/FTPOptionsHandler.js");
/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../label */ "./lib/components/inputs/label.js");



 // Import the FileUtils class


class CsvFileInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            fileLocation: "local",
            connectionMethod: "env",
            csvOptions: {
                sep: ",",
            },
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "File Location",
                    id: "fileLocation",
                    options: [
                        { value: "local", label: "Local" },
                        { value: "http", label: "HTTP" },
                        { value: "s3", label: "S3" },
                        { value: "ftp", label: "FTP" },
                    ],
                    advanced: true,
                },
                ..._common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.getAWSFields(),
                ..._common_FTPOptionsHandler__WEBPACK_IMPORTED_MODULE_4__.FTPOptionsHandler.getFTPFields(),
                {
                    type: "file",
                    label: "File path",
                    id: "filePath",
                    placeholder: "Type file name or use '*' for patterns",
                    tooltip: "Provide a single CSV file path or use '*' for matching multiple files. Extensions accepted: .csv, .tsv, .txt. Can also read CSV files compressed as .gz, .bz2, .zip, .xz, .zst.",
                    validation: "^(.*(\\.csv|\\.tsv|\\.txt))$|^(.*\\*)$",
                    allowedExtensions: [
                        "csv",
                        "tsv",
                        "txt",
                        "gz",
                        "bz2",
                        "zip",
                        "xz",
                        "zst",
                    ],
                },
                {
                    type: "selectCustomizable",
                    label: "Separator",
                    id: "csvOptions.sep",
                    columnId: 1,
                    placeholder: "default: ,",
                    tooltip: "Select or provide a custom delimiter.",
                    options: [
                        { value: ",", label: "comma (,)" },
                        { value: ";", label: "semicolon (;)" },
                        { value: " ", label: "space" },
                        { value: "\\t", label: "tab" },
                        { value: "|", label: "pipe (|)" },
                        { value: "infer", label: "infer (tries to auto detect)" },
                    ],
                },
                {
                    type: "selectCustomizable",
                    label: "Encoding",
                    id: "csvOptions.encoding",
                    columnId: 1,
                    placeholder: "Default: utf-8",
                    tooltip: "Select the character encoding of the file.",
                    options: [
                        { value: "utf-8", label: "UTF-8" },
                        { value: "latin-1", label: "latin-1" },
                        { value: "iso-8859-1", label: "ISO-8859-1" },
                        { value: "cp1252", label: "cp1252" },
                        { value: "utf-16", label: "UTF-16" },
                        { value: "ascii", label: "ASCII" },
                        { value: "iso-8859-15", label: "ISO‑8859‑15" },
                        { value: "windows-1250", label: "Windows‑1250 (Central Europe)" },
                        { value: "windows-1251", label: "Windows‑1251 (Cyrillic)" },
                        { value: "koi8-r", label: "KOI8‑R (Russian Cyrillic)" },
                        { value: "koi8-u", label: "KOI8‑U (Ukrainian Cyrillic)" },
                        { value: "gbk", label: "GBK (Simplified Chinese)" },
                        { value: "big5", label: "Big5 (Traditional Chinese)" },
                        { value: "shift_jis", label: "Shift_JIS (Japanese)" },
                        { value: "euc-kr", label: "EUC‑KR (Korean)" },
                    ],
                    advanced: true,
                },
                {
                    type: "inputNumber",
                    tooltip: "Number of rows of file to read. Useful for reading pieces of large files.",
                    label: "Rows number",
                    id: "csvOptions.nrows",
                    columnId: 2,
                    placeholder: "Default: all",
                    min: 0,
                    advanced: true,
                },
                {
                    type: "selectCustomizable",
                    label: "Decimal separator",
                    id: "csvOptions.decimal",
                    columnId: 2,
                    placeholder: "Default: .",
                    tooltip: "Character to recognize as decimal point for parsing string columns to numeric. Note that this parameter is only necessary for columns stored as TEXT in Excel, any numeric columns will automatically be parsed, regardless of display format.(e.g. use , for European data).",
                    options: [
                        { value: ".", label: "." },
                        { value: ",", label: "," },
                    ],
                    advanced: true,
                },
                {
                    type: "selectTokenization",
                    tooltip: "Sequence of column labels to apply.",
                    label: "Column names",
                    id: "csvOptions.names",
                    placeholder: "Type header fields (ordered and comma-separated)",
                    options: [],
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Wrapper Character",
                    id: "csvOptions.quotechar",
                    columnId: 2,
                    tooltip: "Defines the character used to wrap fields containing special characters like the delimiter or newline.",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Escaped character",
                    id: "csvOptions.escapechar",
                    columnId: 2,
                    tooltip: "Character used to escape other characters.",
                    advanced: true,
                },
                {
                    type: "select",
                    label: "On Bad Lines",
                    id: "csvOptions.on_bad_lines",
                    placeholder: "Error: raise an Exception when a bad line is encountered",
                    options: [
                        {
                            value: "error",
                            label: "Error",
                            tooltip: "Raise an Exception when a bad line is encountered",
                        },
                        {
                            value: "warn",
                            label: "Warn",
                            tooltip: "Raise a warning when a bad line is encountered and skip that line.",
                        },
                        {
                            value: "skip",
                            label: "Skip",
                            tooltip: "Skip bad lines without raising or warning when they are encountered.",
                        },
                    ],
                    advanced: true,
                },
                {
                    type: "select",
                    label: "Engine",
                    id: "csvOptions.engine",
                    placeholder: "Select engine",
                    options: [
                        {
                            value: "python",
                            label: "python",
                            tooltip: "Python is more feature complete.",
                        },
                        { value: "c", label: "c", tooltip: "C is faster." },
                        {
                            value: "pyarrow",
                            label: "pyarrow",
                            tooltip: "The pyarrow engine was added as an experimental engine, and some features are unsupported, or may not work correctly, with this engine.",
                        },
                    ],
                    advanced: true,
                },
                {
                    type: "keyvalue",
                    label: "Storage Options",
                    id: "csvOptions.storage_options",
                    condition: { fileLocation: ["http", "s3", "ftp"] },
                    advanced: true,
                },
            ],
        };
        const description = "使用 CSV 文件输入功能，可以从本地或远程（通过 HTTP 或 S3）的 CSV 文件或多个 CSV 文件（使用通配符）中访问数据。";
        super("CSV 文件输入", "csvFileInput", description, "pandas_df_input", ["csv", "tsv"], _label__WEBPACK_IMPORTED_MODULE_5__.chineseLabel[0], _icons__WEBPACK_IMPORTED_MODULE_0__.fileCsvIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        if (config.csvOptions.engine === "pyarrow") {
            deps.push("pyarrow");
        }
        if (config.fileLocation === "s3") {
            deps.push("s3fs");
        }
        if (_common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.isWildcardInput(config.filePath)) {
            deps.push(config.fileLocation === "s3" ? "s3fs" : "glob");
        }
        return deps;
    }
    provideImports({ config }) {
        let imports = ["import pandas as pd"];
        if (_common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.isWildcardInput(config.filePath)) {
            if (config.fileLocation === "s3") {
                imports.push("import s3fs");
            }
            else {
                imports.push("import glob");
            }
        }
        return imports;
    }
    // Utility method to determine if input uses a wildcard
    // Main generation method
    generateComponentCode({ config, outputName }) {
        const optionsString = this.generateOptionsCode({ config });
        const storageOptionsString = config.csvOptions.storage_options
            ? JSON.stringify(config.csvOptions.storage_options)
            : "{}";
        let code = "";
        if (_common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.isWildcardInput(config.filePath)) {
            if (config.fileLocation === "s3") {
                code += _common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.getS3FilePaths(config.filePath, storageOptionsString, outputName);
                code += _common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.generateConcatCode(outputName, "read_csv", optionsString, true);
            }
            else if (config.fileLocation === "ftp") {
                code += _common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.getFTPFilePaths(config.filePath, storageOptionsString, outputName);
                code += _common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.generateConcatCode(outputName, "read_csv", optionsString, true);
            }
            else {
                code += _common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.getLocalFilePaths(config.filePath, outputName);
                code += _common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.generateConcatCode(outputName, "read_csv", optionsString, false);
            }
        }
        else {
            code = `
# Reading data from ${config.filePath}
${outputName} = pd.read_csv("${config.filePath}"${optionsString}).convert_dtypes()
      `;
        }
        return code.trim();
    }
    generateOptionsCode({ config }) {
        let csvOptions = { ...config.csvOptions };
        if (csvOptions.sep === "infer") {
            csvOptions.sep = "None";
            csvOptions.engine = "python";
        }
        if (config.header === "0" ||
            config.header === "1" ||
            config.header === "None") {
            csvOptions.header = config.header;
        }
        if (csvOptions.names && csvOptions.names.length > 0) {
            csvOptions.names = `['${csvOptions.names.join("', '")}']`;
            csvOptions.header = 0;
        }
        let storageOptions = csvOptions.storage_options || {};
        // Start with an empty object for final storage options
        let finalStorageOptions = {};
        // Step 1: Transform manual storage_options array if it exists
        if (Array.isArray(storageOptions)) {
            finalStorageOptions = storageOptions.reduce((acc, item) => {
                if (item.key) {
                    // Only add if key exists
                    acc[item.key] = item.value;
                }
                return acc;
            }, {});
        }
        else if (typeof storageOptions === "object") {
            // If it's already an object, use it as base
            finalStorageOptions = { ...storageOptions };
        }
        // Step 2: Always apply S3-specific options (these will override manual entries if needed)
        if (config.fileLocation === "s3") {
            const s3Options = _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.handleS3SpecificOptions(config, finalStorageOptions);
            finalStorageOptions = { ...finalStorageOptions, ...s3Options };
        }
        // Step 3: Always apply FTP-specific options (these will override manual entries if needed)
        if (config.fileLocation === "ftp") {
            const ftpOptions = _common_FTPOptionsHandler__WEBPACK_IMPORTED_MODULE_4__.FTPOptionsHandler.handleFTPSpecificOptions(config, finalStorageOptions);
            finalStorageOptions = { ...finalStorageOptions, ...ftpOptions };
        }
        // Update the storage_options in csvOptions only if there are actual options
        if (Object.keys(finalStorageOptions).length > 0) {
            csvOptions.storage_options = finalStorageOptions;
        }
        else {
            // Clean up - remove storage_options if empty
            delete csvOptions.storage_options;
        }
        const optionsEntries = Object.entries(csvOptions)
            .filter(([key, value]) => value !== null &&
            value !== "" &&
            !(key === "sep" && value === "None") &&
            (Array.isArray(value) ? value.length > 0 : true))
            .map(([key, value]) => {
            if (key === "header" &&
                (value === "0" || value === "1" || value === "None")) {
                return `${key}=${value}`;
            }
            else if (key === "names") {
                return `${key}=${value}`;
            }
            else if (key === "storage_options") {
                return `${key}=${JSON.stringify(value)}`;
            }
            else if (value == '"') {
                return `${key}='${value}'`;
            }
            else if (typeof value === "string" && value !== "None") {
                return `${key}="${value}"`;
            }
            else {
                return `${key}=${value}`;
            }
        });
        // Prepend a comma if there are options
        return optionsEntries.length > 0 ? `, ${optionsEntries.join(", ")}` : "";
    }
    generateSampledComponentCode({ config, outputName, nrows }) {
        config = {
            ...config,
            csvOptions: {
                ...config.csvOptions,
                nrows: nrows,
            },
        };
        return this.generateComponentCode({ config, outputName });
    }
}


/***/ },

/***/ "./lib/components/inputs/files/ExcelFileInput.js"
/*!*******************************************************!*\
  !*** ./lib/components/inputs/files/ExcelFileInput.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExcelFileInput: () => (/* binding */ ExcelFileInput)
/* harmony export */ });
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/S3OptionsHandler */ "./lib/components/common/S3OptionsHandler.js");
/* harmony import */ var _common_FileUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/FileUtils */ "./lib/components/common/FileUtils.js");
/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../label */ "./lib/components/inputs/label.js");



 // Import the FileUtils class

class ExcelFileInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_0__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            fileLocation: "local",
            connectionMethod: "env",
            excelOptions: { engine: "None", dtype_backend: "numpy_nullable" },
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "File Location",
                    id: "fileLocation",
                    options: [
                        { value: "local", label: "Local" },
                        { value: "http", label: "HTTP" },
                        { value: "s3", label: "S3" },
                    ],
                    advanced: true,
                },
                ..._common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.getAWSFields(),
                {
                    type: "file",
                    label: "File path",
                    id: "filePath",
                    placeholder: "Type file name or use '*' for patterns",
                    validation: "\\.(xlsx)$|^(.*\\*)$",
                    tooltip: "This field expects a file with an xlsx extension or a wildcard pattern such as input*.xlsx.",
                    allowedExtensions: ["xlsx", "xls", "ods"],
                },
                {
                    type: "sheets",
                    label: "Sheets",
                    id: "excelOptions.sheet_name",
                    placeholder: "Default: 0 (first sheet)",
                    tooltip: "Select one or multiple sheets. If multiple sheets are selected, the sheets are concatenated to output a single dataset.",
                    condition: { fileLocation: "local" },
                },
                {
                    type: "selectTokenization",
                    label: "Sheets",
                    id: "excelOptions.sheet_name",
                    placeholder: "Default: 0 (first sheet)",
                    tooltip: "Type the sheet names to read data from. If multiple sheets are provided, the sheets are concatenated to output a single dataset.",
                    options: [],
                    condition: { fileLocation: ["http", "s3"] },
                },
                {
                    type: "selectCustomizable",
                    label: "Header",
                    id: "excelOptions.header",
                    placeholder: "default: 0 (first row)",
                    options: [
                        { value: "0", label: "0 (1st row)" },
                        { value: "1", label: "1 (2nd row)" },
                        { value: "None", label: "None (No header)" },
                    ],
                    advanced: true,
                },
                {
                    type: "inputNumber",
                    tooltip: "Number of rows of file to read. Useful for reading pieces of large files.",
                    label: "Rows number",
                    min: 0,
                    id: "excelOptions.nrows",
                    placeholder: "Default: all",
                    advanced: true,
                },
                {
                    type: "inputNumber",
                    tooltip: "Number of rows to skip at the start of the file.",
                    label: "Skip rows at the start",
                    id: "excelOptions.skiprows",
                    min: 0,
                    advanced: true,
                },
                {
                    type: "selectCustomizable",
                    label: "Decimal separator",
                    id: "excelOptions.decimal",
                    placeholder: "Default: .",
                    tooltip: "Character to recognize as decimal point for parsing string columns to numeric. Note that this parameter is only necessary for columns stored as TEXT in Excel, any numeric columns will automatically be parsed, regardless of display format.(e.g. use , for European data).",
                    options: [
                        { value: ".", label: "." },
                        { value: ",", label: "," },
                    ],
                    advanced: true,
                },
                {
                    type: "select",
                    label: "Engine",
                    id: "excelOptions.engine",
                    tooltip: "Depending on the file format, different engines might be used.\nopenpyxl supports newer Excel file formats.\n calamine supports Excel (.xls, .xlsx, .xlsm, .xlsb) and OpenDocument (.ods) file formats.\n odf supports OpenDocument file formats (.odf, .ods, .odt).\n pyxlsb supports Binary Excel files.\n xlrd supports old-style Excel files (.xls).",
                    options: [
                        { value: "openpyxl", label: "openpyxl" },
                        { value: "calamine", label: "calamine" },
                        { value: "odf", label: "odf (for .ods files)" },
                        { value: "pyxlsb", label: "pyxlsb (for *.xlsb)" },
                        { value: "xlrd", label: "xlrd (for *.xls)" },
                        { value: "None", label: "Default" },
                    ],
                    advanced: true,
                },
                {
                    type: "select",
                    label: "Data type backend",
                    id: "excelOptions.dtype_backend",
                    tooltip: "Determines the backend used for data types. Leave default if you are unsure.",
                    options: [
                        { value: "numpy_nullable", label: "numpy (nullable)" },
                        { value: "pyarrow", label: "pyarrow" },
                        { value: "numpy", label: "numpy" },
                    ],
                    advanced: true,
                },
                {
                    type: "keyvalue",
                    label: "Storage Options",
                    id: "excelOptions.storage_options",
                    condition: { fileLocation: ["http", "s3"] },
                    advanced: true,
                },
            ],
        };
        const description = "使用 Excel 文件输入功能，可从本地或远程（通过 HTTP 或 S3 协议）访问 Excel 文件（例如 xlsx、xls、ods 格式）中的数据。";
        super("Excel/ODS 文件输入", "excelfileInput", description, "pandas_df_input", ["xlsx", "xls", "ods", "xlsb"], _label__WEBPACK_IMPORTED_MODULE_4__.chineseLabel[0], _icons__WEBPACK_IMPORTED_MODULE_1__.fileExcelIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        const engine = config.excelOptions.engine;
        if (engine === "None" || engine === "openpyxl") {
            deps.push("openpyxl");
        }
        else if (engine === "calamine") {
            deps.push("python-calamine");
        }
        else if (engine === "odf") {
            deps.push("odfpy");
        }
        else if (engine === "pyxlsb") {
            deps.push("pyxlsb");
        }
        else if (engine === "xlrd") {
            deps.push("xlrd");
        }
        else {
            deps.push(config.engine);
        }
        if (_common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.isWildcardInput(config.filePath)) {
            deps.push(config.fileLocation === "s3" ? "s3fs" : "");
        }
        return deps;
    }
    provideImports({ config }) {
        let imports = ["import pandas as pd"];
        if (_common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.isWildcardInput(config.filePath)) {
            if (config.fileLocation === "s3") {
                imports.push("import s3fs");
            }
            else {
                imports.push("import glob");
            }
        }
        return imports;
    }
    generateComponentCode({ config, outputName }) {
        const excelOptions = { ...config.excelOptions };
        const storageOptionsString = excelOptions.storage_options
            ? JSON.stringify(excelOptions.storage_options)
            : "{}";
        let optionsString = this.generateOptionsCode(config);
        let code = "";
        // Handle sheet_name dynamically
        if (excelOptions.sheet_name && excelOptions.sheet_name.length > 0) {
            if (excelOptions.sheet_name.length === 1) {
                optionsString += `, sheet_name='${excelOptions.sheet_name[0]}'`;
            }
            else {
                optionsString += `, sheet_name=${JSON.stringify(excelOptions.sheet_name)}`;
            }
        }
        // Check for wildcard input and generate appropriate code
        if (_common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.isWildcardInput(config.filePath)) {
            if (config.fileLocation === "s3") {
                code += _common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.getS3FilePaths(config.filePath, storageOptionsString, outputName);
                code += _common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.generateConcatCode(outputName, "read_excel", optionsString, true);
            }
            else {
                code += _common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.getLocalFilePaths(config.filePath, outputName);
                code += _common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.generateConcatCode(outputName, "read_excel", optionsString, false);
            }
        }
        else {
            // Simple file reading without wildcard
            if (excelOptions.sheet_name && excelOptions.sheet_name.length > 1) {
                // Multiple sheets: Concatenate DataFrames into a single output
                code += `${outputName}_dict = pd.read_excel("${config.filePath}"${optionsString})\n`;
                code += `${outputName} = pd.concat(${outputName}_dict.values(), ignore_index=True).convert_dtypes()\n`;
            }
            else {
                // Single sheet or no sheet_name specified
                code += `${outputName} = pd.read_excel("${config.filePath}"${optionsString}).convert_dtypes()\n`;
            }
        }
        return code;
    }
    generateOptionsCode(config) {
        let excelOptions = { ...config.excelOptions };
        let storageOptions = excelOptions.storage_options || {};
        // Start with an empty object for final storage options
        let finalStorageOptions = {};
        // Step 1: Transform manual storage_options array if it exists
        if (Array.isArray(storageOptions)) {
            finalStorageOptions = storageOptions.reduce((acc, item) => {
                if (item.key) {
                    // Only add if key exists
                    acc[item.key] = item.value;
                }
                return acc;
            }, {});
        }
        else if (typeof storageOptions === "object") {
            // If it's already an object, use it as base
            finalStorageOptions = { ...storageOptions };
        }
        // Step 2: Always apply S3-specific options (these will override manual entries if needed)
        if (config.fileLocation === "s3") {
            const s3Options = _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.handleS3SpecificOptions(config, finalStorageOptions);
            finalStorageOptions = { ...finalStorageOptions, ...s3Options };
        }
        // Update the storage_options in excelOptions only if there are actual options
        if (Object.keys(finalStorageOptions).length > 0) {
            excelOptions.storage_options = finalStorageOptions;
        }
        else {
            // Clean up - remove storage_options if empty
            delete excelOptions.storage_options;
        }
        const options = Object.entries(excelOptions)
            .filter(([key, value]) => value !== null && value !== "" && key !== "sheet_name") // Ignore sheet_name since it's handled separately
            .map(([key, value]) => {
            if (typeof value === "boolean") {
                return `${key}=${value ? "True" : "False"}`;
            }
            else if (value === "None") {
                return `${key}=None`;
            }
            else if (key === "storage_options") {
                return `${key}=${JSON.stringify(value)}`;
            }
            else if (/^\d+$/.test(value)) {
                return `${key}=${value}`;
            }
            else if (typeof value === "string" &&
                value.startsWith("[") &&
                value.endsWith("]")) {
                return `${key}=${value}`;
            }
            else {
                return `${key}='${value}'`;
            }
        });
        // Prepend a comma if there are options
        return options.length > 0 ? `, ${options.join(", ")}` : "";
    }
}


/***/ },

/***/ "./lib/components/inputs/files/HelloDate.js"
/*!**************************************************!*\
  !*** ./lib/components/inputs/files/HelloDate.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HelloDate: () => (/* binding */ HelloDate),
/* harmony export */   "default": () => (/* binding */ component)
/* harmony export */ });
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");

class HelloDate extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_0__.BaseCoreComponent {
    constructor() {
        const description = "Takes a date and outputs a pandas DataFrame with a message including that date.";
        const defaultConfig = { selectedDate: "" };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "date",
                    id: "selectedDate",
                    label: "Select a Date",
                    placeholder: "Choose a date",
                },
            ],
        };
        const icon = {
            name: "amphi-date-input-hello",
            svgstr: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 16H5V9h14v11Z"/><path d="M12 11h2v2h-2zM8 11h2v2H8zM16 11h2v2H8zM8 15h2v2H8zM12 15h2v2h-2zM16 15h2v2h-2z"/></svg>',
        };
        super("Hello Date", "helloDate", description, "pandas_df_input", [], "inputs", icon, defaultConfig, form);
    }
    provideImports() {
        return ["import pandas as pd"];
    }
    generateComponentCode({ config, outputName }) {
        var _a;
        const date = String((_a = config === null || config === void 0 ? void 0 : config.selectedDate) !== null && _a !== void 0 ? _a : "").trim() || "No Date Selected";
        return `
data = {
    'event': ['Date Selection'],
    'selected_date': ['${date}'],
    'message': ['The user selected the date: ${date}']
}
${outputName} = pd.DataFrame(data)
`;
    }
}
const component = new HelloDate();



/***/ },

/***/ "./lib/components/inputs/files/JsonFileInput.js"
/*!******************************************************!*\
  !*** ./lib/components/inputs/files/JsonFileInput.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonFileInput: () => (/* binding */ JsonFileInput)
/* harmony export */ });
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/S3OptionsHandler */ "./lib/components/common/S3OptionsHandler.js");
/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../label */ "./lib/components/inputs/label.js");




class JsonFileInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_0__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            fileLocation: "local",
            connectionMethod: "env",
            jsonOptions: {},
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "File Location",
                    id: "fileLocation",
                    options: [
                        { value: "local", label: "Local" },
                        { value: "http", label: "HTTP" },
                        { value: "s3", label: "S3" },
                    ],
                    advanced: true,
                },
                ..._common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.getAWSFields(),
                {
                    type: "file",
                    label: "File path",
                    id: "filePath",
                    placeholder: "Type file name",
                    validation: ".(json|jsonl)$",
                    validationMessage: "This field expects a file with a json extension such as input.json.",
                },
                {
                    type: "select",
                    label: "Orientation",
                    id: "jsonOptions.orient",
                    placeholder: "default: columns",
                    options: [
                        {
                            value: "columns",
                            label: "Columns - JSON object with column labels as keys",
                        },
                        {
                            value: "records",
                            label: "Records - List of rows as JSON objects",
                        },
                        { value: "index", label: "Index - Dict with index labels as keys" },
                        {
                            value: "split",
                            label: 'Split - Dict with "index", "columns", and "data" keys',
                        },
                        {
                            value: "table",
                            label: 'Table - Dict with "schema" and "data" keys, following the Table Schema',
                        },
                    ],
                },
                /*
                {
                  type: "input",
                  label: "JSON Path (Optional)",
                  id: "jsonPath",
                  placeholder: "Enter JSON path to extract specific data",
                  advanced: true
                },
                */
                {
                    type: "boolean",
                    label: "Infer Data Types",
                    id: "jsonOptions.dtype",
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Line-delimited",
                    id: "jsonOptions.lines",
                    advanced: true,
                },
                {
                    type: "keyvalue",
                    label: "Storage Options",
                    id: "jsonOptions.storage_options",
                    condition: { fileLocation: ["http", "s3"] },
                    advanced: true,
                },
            ],
        };
        // const description = "Use JSON File Input to access data from a JSON file locally or remotely (via HTTP or S3)."
        const description = "使用 JSON 文件输入功能，可从本地或远程（通过 HTTP 或 S3）的 JSON 文件中读取数据。";
        super(
        // "JSON File Input",
        "JSON 文件输入", "jsonFileInput", description, "pandas_df_input", ["json", "jsonl"], _label__WEBPACK_IMPORTED_MODULE_3__.chineseLabel[0], _icons__WEBPACK_IMPORTED_MODULE_1__.fileJsonIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return ["import pandas as pd"];
    }
    generateComponentCode({ config, outputName }) {
        // Generate the JSON options string using the separate function
        const optionsString = this.generateJsonOptionsCode({ config });
        // Generate the final Python code for reading JSON
        const code = `
${outputName} = pd.read_json("${config.filePath}"${optionsString}).convert_dtypes()
  `;
        return code.trim();
    }
    generateJsonOptionsCode({ config }) {
        let jsonOptions = { ...config.jsonOptions };
        let storageOptions = jsonOptions.storage_options || {};
        // Start with an empty object for final storage options
        let finalStorageOptions = {};
        // Step 1: Transform manual storage_options array if it exists
        if (Array.isArray(storageOptions)) {
            finalStorageOptions = storageOptions.reduce((acc, item) => {
                if (item.key) {
                    // Only add if key exists
                    acc[item.key] = item.value;
                }
                return acc;
            }, {});
        }
        else if (typeof storageOptions === "object") {
            // If it's already an object, use it as base
            finalStorageOptions = { ...storageOptions };
        }
        // Step 2: Always apply S3-specific options (these will override manual entries if needed)
        if (config.fileLocation === "s3") {
            const s3Options = _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.handleS3SpecificOptions(config, finalStorageOptions);
            finalStorageOptions = { ...finalStorageOptions, ...s3Options };
        }
        // Update the storage_options in jsonOptions only if there are actual options
        if (Object.keys(finalStorageOptions).length > 0) {
            jsonOptions.storage_options = finalStorageOptions;
        }
        else {
            // Clean up - remove storage_options if empty
            delete jsonOptions.storage_options;
        }
        // Helper function to convert JavaScript values to Python literals
        const toPythonLiteral = (value) => {
            if (typeof value === "boolean") {
                return value ? "True" : "False";
            }
            else if (typeof value === "string") {
                return `"${value}"`; // Handle strings with quotes
            }
            else if (Array.isArray(value)) {
                return JSON.stringify(value); // Convert arrays to JSON strings
            }
            else if (typeof value === "object" && value !== null) {
                return JSON.stringify(value); // Convert objects to JSON strings
            }
            else {
                return String(value); // Handle numbers and other types
            }
        };
        // Process jsonOptions into a string
        let optionsEntries = Object.entries(jsonOptions)
            .filter(([key, value]) => value !== null && value !== "")
            .map(([key, value]) => {
            if (key === "storage_options") {
                return `${key}=${toPythonLiteral(value)}`;
            }
            else {
                return `${key}=${toPythonLiteral(value)}`;
            }
        });
        return optionsEntries.length > 0 ? `, ${optionsEntries.join(", ")}` : "";
    }
}


/***/ },

/***/ "./lib/components/inputs/files/LocalFileInput.js"
/*!*******************************************************!*\
  !*** ./lib/components/inputs/files/LocalFileInput.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalFileInput: () => (/* binding */ LocalFileInput)
/* harmony export */ });
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _CsvFileInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CsvFileInput */ "./lib/components/inputs/files/CsvFileInput.js");
/* harmony import */ var _JsonFileInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./JsonFileInput */ "./lib/components/inputs/files/JsonFileInput.js");
/* harmony import */ var _ExcelFileInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ExcelFileInput */ "./lib/components/inputs/files/ExcelFileInput.js");
/* harmony import */ var _ParquetFileInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ParquetFileInput */ "./lib/components/inputs/files/ParquetFileInput.js");
/* harmony import */ var _XmlFileInput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./XmlFileInput */ "./lib/components/inputs/files/XmlFileInput.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");







class LocalFileInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_0__.BaseCoreComponent {
    constructor() {
        const defaultConfig = { fileType: "csv", fileLocation: "local" };
        const csvComponent = new _CsvFileInput__WEBPACK_IMPORTED_MODULE_1__.CsvFileInput();
        const jsonComponent = new _JsonFileInput__WEBPACK_IMPORTED_MODULE_2__.JsonFileInput();
        const excelComponent = new _ExcelFileInput__WEBPACK_IMPORTED_MODULE_3__.ExcelFileInput();
        const parquetComponent = new _ParquetFileInput__WEBPACK_IMPORTED_MODULE_4__.ParquetFileInput();
        const xmlComponent = new _XmlFileInput__WEBPACK_IMPORTED_MODULE_5__.XmlFileInput();
        const fieldsToRemove = ["fileLocation"]; // Fields to remove from all components
        const filteredCsvFields = csvComponent._form['fields'].filter(field => !fieldsToRemove.includes(field.id));
        const filteredJsonFields = jsonComponent._form['fields'].filter(field => !fieldsToRemove.includes(field.id));
        const filteredExcelFields = excelComponent._form['fields'].filter(field => !fieldsToRemove.includes(field.id));
        const filteredParquetFields = parquetComponent._form['fields'].filter(field => !fieldsToRemove.includes(field.id));
        const filteredXmlFields = xmlComponent._form['fields'].filter(field => !fieldsToRemove.includes(field.id));
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "File Type",
                    id: "fileType",
                    options: [
                        { value: "csv", label: "CSV" },
                        { value: "json", label: "JSON" },
                        { value: "excel", label: "Excel" },
                        { value: "parquet", label: "Parquet" },
                        { value: "xml", label: "XML" }
                    ]
                },
                // Conditionally display filtered fields based on selected file type
                ...filteredCsvFields.map(field => ({
                    ...field,
                    condition: { fileType: "csv", ...(field.condition || {}) }
                })),
                ...filteredJsonFields.map(field => ({
                    ...field,
                    condition: { fileType: "json", ...(field.condition || {}) }
                })),
                ...filteredExcelFields.map(field => ({
                    ...field,
                    condition: { fileType: "excel", ...(field.condition || {}) }
                })),
                ...filteredParquetFields.map(field => ({
                    ...field,
                    condition: { fileType: "parquet", ...(field.condition || {}) }
                })),
                ...filteredXmlFields.map(field => ({
                    ...field,
                    condition: { fileType: "xml", ...(field.condition || {}) }
                }))
            ]
        };
        const description = "Use File Input to read data from a local file. Supports CSV, JSON, Excel, Parquet, and XML formats.";
        super("File Input", "localFileInput", description, "pandas_df_input", [], "inputs", _icons__WEBPACK_IMPORTED_MODULE_6__.fileTextIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        return deps;
    }
    provideImports({ config }) {
        let imports = ["import pandas as pd"];
        return imports;
    }
    generateComponentCode({ config, outputName }) {
        if (config.fileType === "csv") {
            const csvComponent = new _CsvFileInput__WEBPACK_IMPORTED_MODULE_1__.CsvFileInput();
            return csvComponent.generateComponentCode({ config, outputName });
        }
        else if (config.fileType === "json") {
            const jsonComponent = new _JsonFileInput__WEBPACK_IMPORTED_MODULE_2__.JsonFileInput();
            return jsonComponent.generateComponentCode({ config, outputName });
        }
        else if (config.fileType === "excel") {
            const excelComponent = new _ExcelFileInput__WEBPACK_IMPORTED_MODULE_3__.ExcelFileInput();
            return excelComponent.generateComponentCode({ config, outputName });
        }
        else if (config.fileType === "parquet") {
            const parquetComponent = new _ParquetFileInput__WEBPACK_IMPORTED_MODULE_4__.ParquetFileInput();
            return parquetComponent.generateComponentCode({ config, outputName });
        }
        else if (config.fileType === "xml") {
            const xmlComponent = new _XmlFileInput__WEBPACK_IMPORTED_MODULE_5__.XmlFileInput();
            return xmlComponent.generateComponentCode({ config, outputName });
        }
        return '';
    }
}


/***/ },

/***/ "./lib/components/inputs/files/ParquetFileInput.js"
/*!*********************************************************!*\
  !*** ./lib/components/inputs/files/ParquetFileInput.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParquetFileInput: () => (/* binding */ ParquetFileInput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/S3OptionsHandler */ "./lib/components/common/S3OptionsHandler.js");
/* harmony import */ var _common_FileUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/FileUtils */ "./lib/components/common/FileUtils.js");
/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../label */ "./lib/components/inputs/label.js");



 // Import the FileUtils class

class ParquetFileInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = { fileLocation: "local", connectionMethod: "env" };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "File Location",
                    id: "fileLocation",
                    options: [
                        { value: "local", label: "Local" },
                        { value: "http", label: "HTTP" },
                        { value: "s3", label: "S3" },
                    ],
                    advanced: true,
                },
                ..._common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.getAWSFields(),
                {
                    type: "file",
                    label: "File path",
                    id: "filePath",
                    placeholder: "Type file name or use '*' for patterns",
                    validation: "\\.(parquet)$|^(.*\\*)$",
                    tooltip: "This field expects a file with a .parquet extension or a wildcard pattern such as input*.parquet.",
                },
                {
                    type: "select",
                    label: "Engine",
                    id: "parquetOptions.engine",
                    placeholder: "Select engine",
                    options: [
                        {
                            value: "auto",
                            label: "auto",
                            tooltip: "The default behavior is to try ‘pyarrow’, falling back to ‘fastparquet’ if ‘pyarrow’ is unavailable.",
                        },
                        { value: "pyarrow", label: "pyarrow" },
                        { value: "fastparquet", label: "fastparquet" },
                    ],
                    advanced: true,
                },
                {
                    type: "keyvalue",
                    label: "Storage Options",
                    id: "parquetOptions.storage_options",
                    condition: { fileLocation: ["http", "s3"] },
                    advanced: true,
                },
            ],
        };
        // const description = "Use Parquet File Input to access data from Parquet files locally or remotely (via HTTP or S3).";
        const description = "使用 Parquet 文件输入功能，可从本地或远程（通过 HTTP 或 S3 协议）访问 Parquet 文件中的数据。";
        super(
        // "Parquet File Input",
        "Parquet文件输入", "parquetFileInput", description, "pandas_df_input", ["parquet"], _label__WEBPACK_IMPORTED_MODULE_4__.chineseLabel[0], _icons__WEBPACK_IMPORTED_MODULE_0__.fileParquetIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        var _a;
        let deps = ["pyarrow"];
        if (((_a = config.parquetOptions) === null || _a === void 0 ? void 0 : _a.engine) === "fastparquet") {
            deps.push("fastparquet");
        }
        if (_common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.isWildcardInput(config.filePath)) {
            deps.push(config.fileLocation === "s3" ? "s3fs" : "glob");
        }
        return deps;
    }
    provideImports({ config }) {
        var _a;
        const imports = ["import pandas as pd"];
        if (((_a = config.parquetOptions) === null || _a === void 0 ? void 0 : _a.engine) === "fastparquet") {
            imports.push("import fastparquet");
        }
        if (_common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.isWildcardInput(config.filePath)) {
            if (config.fileLocation === "s3") {
                imports.push("import s3fs");
            }
            else {
                imports.push("import glob");
            }
        }
        return imports;
    }
    generateComponentCode({ config, outputName }) {
        const parquetOptions = { ...config.parquetOptions };
        const storageOptionsString = parquetOptions.storage_options
            ? JSON.stringify(parquetOptions.storage_options)
            : "{}";
        const optionsString = this.generateParquetOptionsCode({ config });
        let code = "";
        // Check for wildcard input and generate appropriate code
        if (_common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.isWildcardInput(config.filePath)) {
            if (config.fileLocation === "s3") {
                code += _common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.getS3FilePaths(config.filePath, storageOptionsString, outputName);
                code += _common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.generateConcatCode(outputName, "read_parquet", optionsString, true);
            }
            else {
                code += _common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.getLocalFilePaths(config.filePath, outputName);
                code += _common_FileUtils__WEBPACK_IMPORTED_MODULE_3__.FileUtils.generateConcatCode(outputName, "read_parquet", optionsString, false);
            }
        }
        else {
            // Simple file reading without wildcard
            code += `${outputName} = pd.read_parquet("${config.filePath}"${optionsString}).convert_dtypes()\n`;
        }
        return code.trim();
    }
    generateParquetOptionsCode({ config }) {
        let parquetOptions = { ...config.parquetOptions };
        let storageOptions = parquetOptions.storage_options || {};
        // Start with an empty object for final storage options
        let finalStorageOptions = {};
        // Step 1: Transform manual storage_options array if it exists
        if (Array.isArray(storageOptions)) {
            finalStorageOptions = storageOptions.reduce((acc, item) => {
                if (item.key) {
                    // Only add if key exists
                    acc[item.key] = item.value;
                }
                return acc;
            }, {});
        }
        else if (typeof storageOptions === "object") {
            // If it's already an object, use it as base
            finalStorageOptions = { ...storageOptions };
        }
        // Step 2: Always apply S3-specific options (these will override manual entries if needed)
        if (config.fileLocation === "s3") {
            const s3Options = _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.handleS3SpecificOptions(config, finalStorageOptions);
            finalStorageOptions = { ...finalStorageOptions, ...s3Options };
        }
        // Update the storage_options in parquetOptions only if there are actual options
        if (Object.keys(finalStorageOptions).length > 0) {
            parquetOptions.storage_options = finalStorageOptions;
        }
        else {
            // Clean up - remove storage_options if empty
            delete parquetOptions.storage_options;
        }
        const options = Object.entries(parquetOptions)
            .filter(([key, value]) => value !== null && value !== "")
            .map(([key, value]) => {
            if (key === "storage_options" && typeof value === "object") {
                return `${key}=${JSON.stringify(value)}`;
            }
            else if (typeof value === "string") {
                return `${key}="${value}"`;
            }
            else {
                return `${key}=${value}`;
            }
        });
        // Prepend a comma if there are options
        return options.length > 0 ? `, ${options.join(", ")}` : "";
    }
}


/***/ },

/***/ "./lib/components/inputs/files/PdfTablesInput.js"
/*!*******************************************************!*\
  !*** ./lib/components/inputs/files/PdfTablesInput.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PdfTablesInput: () => (/* binding */ PdfTablesInput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../label */ "./lib/components/inputs/label.js");



class PdfTablesInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = { pageNumber: 0, tableNumber: 0 };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "file",
                    label: "File path",
                    id: "filePath",
                    placeholder: "Type file name",
                    tooltip: "This field expects a file path with a csv, tsv or txt extension such as input.csv.",
                    validation: "\\.(pdf)$",
                },
                {
                    type: "inputNumber",
                    label: "Page number",
                    id: "pageNumber",
                    tooltip: "Page number where table is located starting at 0.",
                },
                {
                    type: "inputNumber",
                    label: "Table number",
                    id: "tableNumber",
                    tooltip: "If multiple tables are present on the page, specify the number starting at 0.",
                },
            ],
        };
        super(
        // "PDF Tables Input",
        "PDF 表格输入", "pdfTablesInput", "no desc", "pandas_df_input", ["pdf"], _label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[0], _icons__WEBPACK_IMPORTED_MODULE_0__.filePdfIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        deps.push("PyMuPDF");
        return deps;
    }
    provideImports({ config }) {
        return ["import fitz"];
    }
    generateComponentCode({ config, outputName }) {
        // Generate the Python code
        const code = `
# Extract tables from ${config.filePath}
${outputName}_doc = fitz.open("${config.filePath}")
${outputName}_tabs = ${outputName}_doc[${config.pageNumber}].find_tables() # detect the tables
${outputName} = ${outputName}_tabs[${config.tableNumber}].to_pandas()
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/inputs/files/S3FileInput.js"
/*!****************************************************!*\
  !*** ./lib/components/inputs/files/S3FileInput.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S3FileInput: () => (/* binding */ S3FileInput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _CsvFileInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CsvFileInput */ "./lib/components/inputs/files/CsvFileInput.js");
/* harmony import */ var _JsonFileInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./JsonFileInput */ "./lib/components/inputs/files/JsonFileInput.js");
/* harmony import */ var _ExcelFileInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ExcelFileInput */ "./lib/components/inputs/files/ExcelFileInput.js");
/* harmony import */ var _ParquetFileInput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ParquetFileInput */ "./lib/components/inputs/files/ParquetFileInput.js");
/* harmony import */ var _XmlFileInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./XmlFileInput */ "./lib/components/inputs/files/XmlFileInput.js");
/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../label */ "./lib/components/inputs/label.js");








class S3FileInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            fileType: "csv",
            fileLocation: "s3",
            connectionMethod: "env",
        };
        const csvComponent = new _CsvFileInput__WEBPACK_IMPORTED_MODULE_2__.CsvFileInput();
        const jsonComponent = new _JsonFileInput__WEBPACK_IMPORTED_MODULE_3__.JsonFileInput();
        const excelComponent = new _ExcelFileInput__WEBPACK_IMPORTED_MODULE_4__.ExcelFileInput();
        const parquetComponent = new _ParquetFileInput__WEBPACK_IMPORTED_MODULE_5__.ParquetFileInput();
        const xmlComponent = new _XmlFileInput__WEBPACK_IMPORTED_MODULE_6__.XmlFileInput();
        const fieldsToRemove = ["fileLocation"]; // Fields to remove from all components
        const filteredCsvFields = csvComponent._form["fields"].filter((field) => !fieldsToRemove.includes(field.id));
        const filteredJsonFields = jsonComponent._form["fields"].filter((field) => !fieldsToRemove.includes(field.id));
        const filteredExcelFields = excelComponent._form["fields"].filter((field) => !fieldsToRemove.includes(field.id));
        const filteredParquetFields = parquetComponent._form["fields"].filter((field) => !fieldsToRemove.includes(field.id));
        const filteredXmlFields = xmlComponent._form["fields"].filter((field) => !fieldsToRemove.includes(field.id));
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "File Type",
                    id: "fileType",
                    options: [
                        { value: "csv", label: "CSV" },
                        { value: "json", label: "JSON" },
                        { value: "excel", label: "Excel" },
                        { value: "parquet", label: "Parquet" },
                        { value: "xml", label: "XML" },
                    ],
                },
                // Conditionally display filtered fields based on selected file type
                ...filteredCsvFields.map((field) => ({
                    ...field,
                    condition: { fileType: ["csv"], ...(field.condition || {}) },
                })),
                ...filteredJsonFields.map((field) => ({
                    ...field,
                    condition: { fileType: ["json"], ...(field.condition || {}) },
                })),
                ...filteredExcelFields.map((field) => ({
                    ...field,
                    condition: { fileType: ["excel"], ...(field.condition || {}) },
                })),
                ...filteredParquetFields.map((field) => ({
                    ...field,
                    condition: { fileType: ["parquet"], ...(field.condition || {}) },
                })),
                ...filteredXmlFields.map((field) => ({
                    ...field,
                    condition: { fileType: ["xml"], ...(field.condition || {}) },
                })),
            ],
        };
        // const description = "Use File Input to read data from a file remotely (S3). Supports CSV, JSON, Excel, Parquet, and XML formats.";
        const description = "使用文件输入从远程文件（S3）读取数据。支持 CSV、JSON、Excel、Parquet 和 XML 格式。";
        super(
        // "S3 File Input",
        "S3 文件输入", "s3FileInput", description, "pandas_df_input", [], _label__WEBPACK_IMPORTED_MODULE_7__.chineseLabel[0], _icons__WEBPACK_IMPORTED_MODULE_0__.bucketIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        deps.push("s3fs");
        return deps;
    }
    provideImports({ config }) {
        let imports = ["import pandas as pd"];
        if (config.createFoldersIfNotExist) {
            imports.push("import os");
        }
        return imports;
    }
    generateComponentCode({ config, outputName }) {
        if (config.fileType === "csv") {
            const csvComponent = new _CsvFileInput__WEBPACK_IMPORTED_MODULE_2__.CsvFileInput();
            return csvComponent.generateComponentCode({ config, outputName });
        }
        else if (config.fileType === "json") {
            const jsonComponent = new _JsonFileInput__WEBPACK_IMPORTED_MODULE_3__.JsonFileInput();
            return jsonComponent.generateComponentCode({ config, outputName });
        }
        else if (config.fileType === "excel") {
            const excelComponent = new _ExcelFileInput__WEBPACK_IMPORTED_MODULE_4__.ExcelFileInput();
            return excelComponent.generateComponentCode({ config, outputName });
        }
        else if (config.fileType === "parquet") {
            const parquetComponent = new _ParquetFileInput__WEBPACK_IMPORTED_MODULE_5__.ParquetFileInput();
            return parquetComponent.generateComponentCode({ config, outputName });
        }
        else if (config.fileType === "xml") {
            const xmlComponent = new _XmlFileInput__WEBPACK_IMPORTED_MODULE_6__.XmlFileInput();
            return xmlComponent.generateComponentCode({ config, outputName });
        }
        return "";
    }
}


/***/ },

/***/ "./lib/components/inputs/files/XmlFileInput.js"
/*!*****************************************************!*\
  !*** ./lib/components/inputs/files/XmlFileInput.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XmlFileInput: () => (/* binding */ XmlFileInput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/S3OptionsHandler */ "./lib/components/common/S3OptionsHandler.js");
/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../label */ "./lib/components/inputs/label.js");




class XmlFileInput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            fileLocation: "local",
            connectionMethod: "env",
            xmlOptions: { xpath: "", parser: "lxml" },
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "File Location",
                    id: "fileLocation",
                    options: [
                        { value: "local", label: "Local" },
                        { value: "http", label: "HTTP" },
                        { value: "s3", label: "S3" },
                    ],
                    advanced: true,
                },
                ..._common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.getAWSFields(),
                {
                    type: "file",
                    label: "File path",
                    id: "filePath",
                    placeholder: "Type file name",
                    validation: "\\.xml$",
                    validationMessage: "This field expects a file with an xml extension such as input.xml.",
                },
                {
                    type: "text",
                    label: "XPath Expression",
                    id: "xmlOptions.xpath",
                    placeholder: "/root/child",
                },
                {
                    type: "select",
                    label: "Parser",
                    id: "xmlOptions.parser",
                    placeholder: "Select Parser",
                    options: [
                        { value: "lxml", label: "lxml" },
                        { value: "etree", label: "etree" },
                    ],
                    advanced: true,
                },
                {
                    type: "keyvalue",
                    label: "Storage Options",
                    id: "xmlOptions.storage_options",
                    condition: { fileLocation: ["http", "s3"] },
                    advanced: true,
                },
            ],
        };
        // const description = "Use XML File Input to access data from a XML file locally or remotely (via HTTP or S3)."
        const description = "Use XML File Input to access data from a XML file locally or remotely (via HTTP or S3).";
        super(
        // "XML File Input",
        "XML 文件输入", "xmlFileInput", description, "pandas_df_input", ["xml"], _label__WEBPACK_IMPORTED_MODULE_3__.chineseLabel[0], _icons__WEBPACK_IMPORTED_MODULE_0__.fileXmlIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        switch (config.parser) {
            case "lxml":
                deps.push("lxml");
                break;
            default:
        }
        return deps;
    }
    provideImports({ config }) {
        return ["import pandas as pd"]; // Adjust import based on XML parsing library
    }
    generateComponentCode({ config, outputName }) {
        let xmlOptions = { ...config.xmlOptions };
        // Initialize storage_options if not already present
        let storageOptions = xmlOptions.storage_options || {};
        storageOptions = _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.handleS3SpecificOptions(config, storageOptions);
        // Only add storage_options to csvOptions if it's not empty
        if (Object.keys(storageOptions).length > 0) {
            xmlOptions.storage_options = storageOptions;
        }
        let optionsString = Object.entries(xmlOptions || {})
            .filter(([key, value]) => value !== null && value !== "")
            .map(([key, value]) => {
            if (key === "storage_options") {
                return `${key}=${JSON.stringify(value)}`;
            }
            else {
                return `${key}="${value}"`; // Handle numbers and Python's None without quotes
            }
        })
            .join(", ");
        const optionsCode = optionsString ? `, ${optionsString}` : ""; // Only add optionsString if it exists
        const code = `
${outputName} = pd.read_xml("${config.filePath}"${optionsCode}).convert_dtypes()
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/inputs/label.js"
/*!****************************************!*\
  !*** ./lib/components/inputs/label.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chineseLabel: () => (/* binding */ chineseLabel)
/* harmony export */ });
//inputs transforms misc outputs configuration developer
const chineseLabel = ["输入", "转化", "杂项", "输出", "配置", "开发者"];


/***/ },

/***/ "./lib/components/outputs/Console.js"
/*!*******************************************!*\
  !*** ./lib/components/outputs/Console.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Console: () => (/* binding */ Console)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class Console extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = { type: "Data", dataFormat: "text" };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "select",
                    label: "Type",
                    id: "type",
                    placeholder: "Select type",
                    options: [
                        {
                            value: "Info",
                            label: "Info",
                            tooltip: "Display a regular message in console.",
                        },
                        // { value: "Warning", label: "Warning", tooltip: "Display a warning message in the console." },
                        {
                            value: "Error",
                            label: "Error",
                            tooltip: "Raise an error and display error message in console.",
                        },
                        {
                            value: "Data",
                            label: "Data",
                            tooltip: "Display data from input component.",
                        },
                        // { value: "Markdown", label: "Markdown", tooltip: "Display Markdown in the console. The markdown might not be rendered outside Amphi console." },
                        // { value: "HTML", label: "HTML", tooltip: "Display HTML in the console. The markdown might not be rendered outside HTML console." }
                    ],
                },
                {
                    type: "textarea",
                    label: "Message",
                    id: "message",
                    placeholder: "Write text message",
                    advanced: true,
                    condition: { type: ["Info", "Error"] },
                },
                {
                    type: "inputNumber",
                    label: "Records limit",
                    id: "limit",
                    placeholder: "Number of records to print in console",
                    min: 0,
                    condition: { type: "Data" },
                    advanced: true,
                },
                {
                    type: "select",
                    label: "Data Format",
                    id: "dataFormat",
                    options: [
                        {
                            value: "text",
                            label: "Text",
                            tooltip: "Display data as text in console.",
                        },
                        {
                            value: "csv",
                            label: "CSV",
                            tooltip: "Display data as a csv in console.",
                        },
                    ],
                    condition: { type: "Data" },
                    advanced: true,
                },
            ],
        };
        // const description = "Use Console Message to display a message (info, warning, error) or data into the Pipeline Console.";
        const description = "使用控制台消息功能将消息（信息、警告、错误）或数据显示在管道控制台中。";
        super(
        // "Console Message",
        "控制台消息", "console", description, "pandas_df_output", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[3], _icons__WEBPACK_IMPORTED_MODULE_0__.consoleIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        return deps;
    }
    provideImports({ config }) {
        const imports = ["import pandas as pd"];
        if (config.type === "Warning") {
            imports.push("import warnings");
        }
        if (config.type === "Markdown" || config.type === "HTML") {
            imports.push("from IPython.display import display, Markdown, HTML");
        }
        return imports;
    }
    generateComponentCode({ config, inputName }) {
        let code = "";
        switch (config.type) {
            case "Info":
                code += `print("Info: ${config.message || ""}")\n`;
                break;
            case "Warning":
                code += `warnings.warn("${config.message || ""}")\n`;
                break;
            case "Error":
                code += `raise Exception("Error: ${config.message || ""}")\n`;
                break;
            case "Data":
                if (config.limit) {
                    inputName += `.head(${config.limit})`;
                }
                // Handle different data formats
                switch (config.dataFormat) {
                    case "text":
                        code += `print(${inputName}.to_string(index=False))\n`;
                        break;
                    case "csv":
                        code += `print(${inputName}.to_csv(index=False))\n`;
                        break;
                    default:
                        code += `print(${inputName}.to_string(index=False))\n`; // Default to text output if format is not specified
                }
                break;
            case "Markdown":
                code += `display(Markdown("${config.message || ""}"))\n`;
                break;
            case "HTML":
                code += `display(HTML("${config.message || ""}"))\n`;
                break;
            default:
                code += `print(${inputName})\n`;
        }
        return code;
    }
}


/***/ },

/***/ "./lib/components/outputs/cloud/GoogleSheetsOutput.js"
/*!************************************************************!*\
  !*** ./lib/components/outputs/cloud/GoogleSheetsOutput.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GoogleSheetsOutput: () => (/* binding */ GoogleSheetsOutput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../inputs/label */ "./lib/components/inputs/label.js");



class GoogleSheetsOutput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            sheetOptions: { spreadsheetId: "", range: "Sheet1" },
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "file",
                    label: "Service Account Key",
                    id: "filePath",
                    placeholder: "Type file name",
                    validation: "\\.(json)$",
                    validationMessage: "This field expects a file with a .json extension such as your-service-account-file.json.",
                    connection: "Google Sheet",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Spreadsheet ID",
                    id: "sheetOptions.spreadsheetId",
                    placeholder: "Enter Google Sheets' name or ID",
                    validation: "^[a-zA-Z0-9-_]+$",
                    validationMessage: "Invalid Spreadsheet ID.",
                },
                {
                    type: "input",
                    label: "Range",
                    id: "sheetOptions.range",
                    placeholder: "e.g., Sheet1 or Sheet1!A1:D5",
                    validation: "^[a-zA-Z0-9-_!]+$",
                    validationMessage: "Invalid Range.",
                    advanced: true,
                },
            ],
        };
        super(
        // "G. Sheets Output",
        "G. 贴片输出", "googleSheetsOutput", 
        // "no desc",
        "无描述", "pandas_df_output", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[3], _icons__WEBPACK_IMPORTED_MODULE_0__.fileSpreadsheetIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return [
            "import pandas as pd",
            "import gspread",
            "from oauth2client.service_account import ServiceAccountCredentials",
        ];
    }
    generateComponentCode({ config, inputName }) {
        // Initialize an object to modify without affecting the original config
        let sheetOptions = { ...config.sheetOptions };
        // Validate and set the service account file path
        const serviceAccountFilePath = config.filePath
            ? `"${config.filePath}"`
            : "None";
        // Unique variables for each instance
        const uniqueClientVar = `${inputName}Client`;
        const uniqueSheetVar = `${inputName}Sheet`;
        // Generate the Python code for outputting data to Google Sheets
        const code = `
# Outputting data to Google Sheets
scope = ["https://spreadsheets.google.com/feeds","https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name(${serviceAccountFilePath}, scope)
${uniqueClientVar} = gspread.authorize(creds)

# Open the spreadsheet and select the right worksheet
${uniqueSheetVar} = ${uniqueClientVar}.open_by_key(${sheetOptions.spreadsheetId ? `"${sheetOptions.spreadsheetId}"` : "None"}).worksheet(${sheetOptions.range ? `"${sheetOptions.range.split("!")[0]}"` : "None"})

# Update the sheet with dataframe's data
${uniqueSheetVar}.update([${inputName}.columns.values.tolist()] + ${inputName}.values.tolist())
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/outputs/databases/DatabaseOutput.js"
/*!************************************************************!*\
  !*** ./lib/components/outputs/databases/DatabaseOutput.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatabaseOutput: () => (/* binding */ DatabaseOutput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _MySQLOutput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MySQLOutput */ "./lib/components/outputs/databases/MySQLOutput.js");
/* harmony import */ var _PostgresOutput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PostgresOutput */ "./lib/components/outputs/databases/PostgresOutput.js");
/* harmony import */ var _SqlServerOutput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SqlServerOutput */ "./lib/components/outputs/databases/SqlServerOutput.js");
/* harmony import */ var _SnowflakeOutput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SnowflakeOutput */ "./lib/components/outputs/databases/SnowflakeOutput.js");
/* harmony import */ var _OracleOutput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./OracleOutput */ "./lib/components/outputs/databases/OracleOutput.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../inputs/label */ "./lib/components/inputs/label.js");








class DatabaseOutput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = { provider: "mysql" };
        const mysql = new _MySQLOutput__WEBPACK_IMPORTED_MODULE_2__.MySQLOutput();
        const pg = new _PostgresOutput__WEBPACK_IMPORTED_MODULE_3__.PostgresOutput();
        const mssql = new _SqlServerOutput__WEBPACK_IMPORTED_MODULE_4__.SqlServerOutput();
        const snowflake = new _SnowflakeOutput__WEBPACK_IMPORTED_MODULE_5__.SnowflakeOutput();
        const oracle = new _OracleOutput__WEBPACK_IMPORTED_MODULE_6__.OracleOutput();
        const getFields = (comp) => {
            const form = comp._form;
            return Array.isArray(form === null || form === void 0 ? void 0 : form.fields) ? form.fields : [];
        };
        const wrapFields = (fields, provider) => fields.map((f) => ({
            ...f,
            condition: { provider: [provider], ...(f.condition || {}) },
        }));
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "select",
                    label: "数据库类型",
                    id: "provider",
                    options: [
                        { value: "mysql", label: "MySQL" },
                        { value: "postgres", label: "PostgreSQL" },
                        { value: "sqlserver", label: "SQL Server" },
                        { value: "snowflake", label: "Snowflake" },
                        { value: "oracle", label: "Oracle" },
                    ],
                },
                ...wrapFields(getFields(mysql), "mysql"),
                ...wrapFields(getFields(pg), "postgres"),
                ...wrapFields(getFields(mssql), "sqlserver"),
                ...wrapFields(getFields(snowflake), "snowflake"),
                ...wrapFields(getFields(oracle), "oracle"),
            ],
        };
        const description = "“数据库输出”功能允许您选择一个数据库，并通过表格或自定义映射的方式编写数据框。";
        // const description =
        //   "Database Output lets you choose a database and write a DataFrame using table or custom mapping.";
        super(
        // "Database Output",
        "数据库输出", "databaseOutput", description, "pandas_df_output", [], _inputs_label__WEBPACK_IMPORTED_MODULE_7__.chineseLabel[3], _icons__WEBPACK_IMPORTED_MODULE_0__.databaseIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        switch (config.provider) {
            case "mysql":
                return new _MySQLOutput__WEBPACK_IMPORTED_MODULE_2__.MySQLOutput().provideDependencies({ config });
            case "postgres":
                return new _PostgresOutput__WEBPACK_IMPORTED_MODULE_3__.PostgresOutput().provideDependencies({ config });
            case "sqlserver":
                return new _SqlServerOutput__WEBPACK_IMPORTED_MODULE_4__.SqlServerOutput().provideDependencies({ config });
            case "snowflake":
                return new _SnowflakeOutput__WEBPACK_IMPORTED_MODULE_5__.SnowflakeOutput().provideDependencies({ config });
            case "oracle":
                return new _OracleOutput__WEBPACK_IMPORTED_MODULE_6__.OracleOutput().provideDependencies({ config });
            default:
                return [];
        }
    }
    provideImports({ config }) {
        const imports = config.provider === "mysql"
            ? new _MySQLOutput__WEBPACK_IMPORTED_MODULE_2__.MySQLOutput().provideImports({ config })
            : config.provider === "postgres"
                ? new _PostgresOutput__WEBPACK_IMPORTED_MODULE_3__.PostgresOutput().provideImports({ config })
                : config.provider === "sqlserver"
                    ? new _SqlServerOutput__WEBPACK_IMPORTED_MODULE_4__.SqlServerOutput().provideImports({ config })
                    : config.provider === "snowflake"
                        ? new _SnowflakeOutput__WEBPACK_IMPORTED_MODULE_5__.SnowflakeOutput().provideImports({ config })
                        : config.provider === "oracle"
                            ? new _OracleOutput__WEBPACK_IMPORTED_MODULE_6__.OracleOutput().provideImports({ config })
                            : [];
        const seen = new Set();
        return imports.filter((i) => (seen.has(i) ? false : (seen.add(i), true)));
    }
    generateComponentCode({ config, inputName }) {
        switch (config.provider) {
            case "mysql":
                return new _MySQLOutput__WEBPACK_IMPORTED_MODULE_2__.MySQLOutput().generateComponentCode({ config, inputName });
            case "postgres":
                return new _PostgresOutput__WEBPACK_IMPORTED_MODULE_3__.PostgresOutput().generateComponentCode({
                    config,
                    inputName,
                });
            case "sqlserver":
                return new _SqlServerOutput__WEBPACK_IMPORTED_MODULE_4__.SqlServerOutput().generateComponentCode({
                    config,
                    inputName,
                });
            case "snowflake":
                return new _SnowflakeOutput__WEBPACK_IMPORTED_MODULE_5__.SnowflakeOutput().generateComponentCode({
                    config,
                    inputName,
                });
            case "oracle":
                return new _OracleOutput__WEBPACK_IMPORTED_MODULE_6__.OracleOutput().generateComponentCode({ config, inputName });
            default:
                return "";
        }
    }
}


/***/ },

/***/ "./lib/components/outputs/databases/MySQLOutput.js"
/*!*********************************************************!*\
  !*** ./lib/components/outputs/databases/MySQLOutput.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MySQLOutput: () => (/* binding */ MySQLOutput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");


class MySQLOutput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            host: "localhost",
            port: "3306",
            databaseName: "",
            tableName: "",
            username: "",
            password: "",
            ifTableExists: "fail",
            mode: "insert",
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "input",
                    label: "Host",
                    id: "host",
                    placeholder: "Enter database host",
                    connection: "Mysql",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Port",
                    id: "port",
                    placeholder: "Enter database port",
                    connection: "Mysql",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Database Name",
                    id: "databaseName",
                    connection: "Mysql",
                    placeholder: "Enter database name",
                },
                {
                    type: "table",
                    label: "表名",
                    // label: "Table Name",
                    query: `SHOW TABLES;`,
                    id: "tableName",
                    placeholder: "输入表名",
                },
                {
                    type: "input",
                    label: "Username",
                    id: "username",
                    connection: "Mysql",
                    placeholder: "Enter username",
                    advanced: true,
                },
                {
                    type: "input",
                    inputType: "password",
                    label: "Password",
                    id: "password",
                    connection: "Mysql",
                    placeholder: "Enter password",
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "If Table Exists",
                    id: "ifTableExists",
                    options: [
                        { value: "fail", label: "Fail" },
                        { value: "replace", label: "Replace" },
                        { value: "append", label: "Append" },
                    ],
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "Mode",
                    id: "mode",
                    options: [{ value: "insert", label: "INSERT" }],
                    advanced: true,
                },
                {
                    type: "dataMapping",
                    imports: ["pymysql"],
                    label: "Mapping",
                    id: "mapping",
                    tooltip: "By default the mapping is inferred from the input data. By specifying a schema you override the incoming schema.",
                    outputType: "relationalDatabase",
                    drivers: "mysql+pymysql",
                    query: "DESCRIBE {{table}}",
                    pythonExtraction: 'column_info = schema[["Field", "Type"]]\nformatted_output = ", ".join([f"{row[\'Field\']} ({row[\'Type\']})" for _, row in column_info.iterrows()])\nprint(formatted_output)',
                    typeOptions: [
                        { value: "INT", label: "INT" },
                        { value: "VARCHAR", label: "VARCHAR" },
                        { value: "TEXT", label: "TEXT" },
                        { value: "DATE", label: "DATE" },
                        { value: "DATETIME", label: "DATETIME" },
                        { value: "TIMESTAMP", label: "TIMESTAMP" },
                        { value: "TIME", label: "TIME" },
                        { value: "YEAR", label: "YEAR" },
                        { value: "BOOLEAN", label: "BOOLEAN" },
                        { value: "DECIMAL", label: "DECIMAL" },
                        { value: "FLOAT", label: "FLOAT" },
                        { value: "DOUBLE", label: "DOUBLE" },
                        { value: "BLOB", label: "BLOB" },
                        { value: "BIT", label: "BIT" },
                        { value: "ENUM", label: "ENUM" },
                        { value: "SET", label: "SET" },
                        { value: "JSON", label: "JSON" },
                    ],
                    advanced: true,
                },
            ],
        };
        const description = "Use MySQL Output to insert data into a MySQL table by specifying a data mapping between the incoming data and the existing table schema.";
        super("MySQL Output", "mySQLOutput", description, "pandas_df_output", [], "outputs.Databases", _icons__WEBPACK_IMPORTED_MODULE_0__.mySQLIcon, defaultConfig, form);
    }
    // https://stackoverflow.com/questions/63881687/how-to-upsert-pandas-dataframe-to-mysql-with-sqlalchemy
    provideDependencies({ config }) {
        let deps = [];
        deps.push("pymysql");
        return deps;
    }
    provideImports({ config }) {
        return ["import pandas as pd", "import sqlalchemy", "import pymysql"];
    }
    generateDatabaseConnectionCode({ config, connectionName }) {
        return `
# Connect to the MySQL database
${connectionName} = sqlalchemy.create_engine(
  "mysql+pymysql://${config.username}:${config.password}@${config.host}:${config.port}/${config.databaseName}"
)
`;
    }
    generateComponentCode({ config, inputName }) {
        const uniqueEngineName = `${inputName}Engine`;
        let mappingsCode = "";
        let columnsCode = "";
        if (config.mapping && config.mapping.length > 0) {
            const renameMap = config.mapping
                .filter((map) => map.input &&
                (map.input.value || typeof map.input.value === "number"))
                .map((map) => {
                if (map.input.value != map.value) {
                    if (map.input.named) {
                        return `"${map.input.value}": "${map.value}"`; // Handles named columns
                    }
                    else {
                        return `${map.input.value}: "${map.value}"`; // Handles numeric index
                    }
                }
                return undefined; // Explicitly return undefined for clarity
            })
                .filter((value) => value !== undefined);
            if (renameMap.length > 0) {
                mappingsCode = `
# Rename columns based on the mapping
${inputName} = ${inputName}.rename(columns={${renameMap.join(", ")}})
`;
            }
            const selectedColumns = config.mapping
                .filter((map) => map.value !== null && map.value !== undefined)
                .map((map) => `"${map.value}"`)
                .join(", ");
            if (selectedColumns) {
                columnsCode = `
# Only keep relevant columns
${inputName} = ${inputName}[[${selectedColumns}]]
`;
            }
        }
        const ifExistsAction = config.ifTableExists;
        const connectionCode = this.generateDatabaseConnectionCode({
            config,
            connectionName: uniqueEngineName,
        });
        return `
${connectionCode}
${mappingsCode}${columnsCode}
# Write DataFrame to MySQL
try:
    ${inputName}.to_sql(
        name="${config.tableName.value}",
        con=${uniqueEngineName},
        if_exists="${ifExistsAction}",
        index=False
    )
finally:
    ${uniqueEngineName}.dispose()
`;
    }
}


/***/ },

/***/ "./lib/components/outputs/databases/OracleOutput.js"
/*!**********************************************************!*\
  !*** ./lib/components/outputs/databases/OracleOutput.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OracleOutput: () => (/* binding */ OracleOutput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");

 // Adjust the import path
class OracleOutput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            host: "localhost",
            port: "1521",
            databaseName: "",
            schema: "",
            username: "",
            password: "",
            tableName: "",
            ifTableExists: "fail",
            mode: "insert",
            dbapi: "oracledb",
            oracleClient: "",
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "input",
                    label: "Host",
                    id: "host",
                    placeholder: "Enter database host",
                    connection: "Oracle DB",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Port",
                    id: "port",
                    placeholder: "Enter database port",
                    connection: "Oracle DB",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Database Name",
                    id: "databaseName",
                    placeholder: "Enter database name",
                    connection: "Oracle DB",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Schema",
                    id: "schema",
                    placeholder: "Enter schema name",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Username",
                    id: "username",
                    placeholder: "Enter username",
                    connection: "Oracle DB",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Password",
                    id: "password",
                    placeholder: "Enter password",
                    inputType: "password",
                    connection: "Oracle DB",
                    advanced: true,
                },
                {
                    type: "table",
                    label: "表名",
                    // label: "Table Name",
                    query: `SELECT table_name FROM user_tables;`,
                    id: "tableName",
                    placeholder: "输入表名",
                },
                {
                    type: "radio",
                    label: "If Table Exists",
                    id: "ifTableExists",
                    options: [
                        { value: "fail", label: "Fail" },
                        { value: "replace", label: "Replace" },
                        { value: "append", label: "Append" },
                    ],
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "Mode",
                    id: "mode",
                    options: [{ value: "insert", label: "INSERT" }],
                    advanced: true,
                },
                {
                    type: "dataMapping",
                    label: "Mapping",
                    id: "mapping",
                    tooltip: "By default, the mapping is inferred from the input data. By specifying a schema, you override the incoming schema.",
                    outputType: "relationalDatabase",
                    imports: ["cx_Oracle", "oracledb"],
                    drivers: "oracle",
                    query: "DESCRIBE {{table}}",
                    typeOptions: [
                        { value: "VARCHAR2", label: "VARCHAR2" },
                        { value: "NUMBER", label: "NUMBER" },
                        { value: "DATE", label: "DATE" },
                        { value: "TIMESTAMP", label: "TIMESTAMP" },
                        { value: "CHAR", label: "CHAR" },
                        { value: "NCHAR", label: "NCHAR" },
                        { value: "NVARCHAR2", label: "NVARCHAR2" },
                        { value: "CLOB", label: "CLOB" },
                        { value: "NCLOB", label: "NCLOB" },
                        { value: "BLOB", label: "BLOB" },
                        { value: "BFILE", label: "BFILE" },
                        { value: "RAW", label: "RAW" },
                        { value: "LONG RAW", label: "LONG RAW" },
                        { value: "LONG", label: "LONG" },
                        { value: "XMLTYPE", label: "XMLTYPE" },
                        { value: "ROWID", label: "ROWID" },
                        { value: "UROWID", label: "UROWID" },
                        { value: "FLOAT", label: "FLOAT" },
                        { value: "BINARY_FLOAT", label: "BINARY_FLOAT" },
                        { value: "BINARY_DOUBLE", label: "BINARY_DOUBLE" },
                    ],
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Oracle Client Path (Optional)",
                    tooltip: "Specify the directory of the desired Oracle client if needed.",
                    id: "oracleClient",
                    placeholder: "Specify oracle client path",
                    advanced: true,
                },
                {
                    type: "select",
                    label: "Database API (DBAPI)",
                    id: "dbapi",
                    options: [
                        { value: "cx_oracle", label: "cx-Oracle" },
                        { value: "oracledb", label: "python-oracledb" },
                    ],
                    advanced: true,
                },
            ],
        };
        const description = "Use Oracle Output to insert data into an Oracle database table by specifying a data mapping between the incoming data and the existing table schema.";
        super("Oracle Output", "oracleOutput", description, "pandas_df_output", [], "outputs.Databases", _icons__WEBPACK_IMPORTED_MODULE_0__.oracleIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        if (config.dbapi === "cx_oracle") {
            deps.push("cx_Oracle");
        }
        else if (config.dbapi === "oracledb") {
            deps.push("oracledb");
        }
        return deps;
    }
    provideImports({ config }) {
        const imports = ["import pandas as pd", "import sqlalchemy"];
        if (config.dbapi === "cx_oracle") {
            imports.push("import cx_Oracle");
        }
        else if (config.dbapi === "oracledb") {
            imports.push("import oracledb");
        }
        return imports;
    }
    generateComponentCode({ config, inputName }) {
        const dbapi = config.dbapi;
        const uniqueEngineName = `${inputName}_Engine`;
        // Build connection string
        let connectionString = `oracle+${dbapi}://${config.username}:${config.password}@${config.host}:${config.port}/?service_name=${config.databaseName}`;
        // Initialize the Oracle client if oracleClient is provided
        const oracleClientInitialization = config.oracleClient && config.oracleClient.trim()
            ? `${dbapi}.init_oracle_client(lib_dir="${config.oracleClient}")\n`
            : "";
        // Prepare mappings and columns code
        let mappingsCode = "";
        let columnsCode = "";
        if (config.mapping && config.mapping.length > 0) {
            const renameMap = config.mapping
                .filter((map) => map.input &&
                map.input.value !== undefined &&
                map.input.value !== null)
                .map((map) => {
                if (map.input.value != map.value) {
                    return `"${map.input.value}": "${map.value}"`;
                }
                return undefined;
            })
                .filter((value) => value !== undefined);
            if (renameMap.length > 0) {
                mappingsCode = `
# Rename columns based on the mapping
${inputName} = ${inputName}.rename(columns={${renameMap.join(", ")}})
`;
            }
            const selectedColumns = config.mapping
                .filter((map) => map.value !== null && map.value !== undefined)
                .map((map) => `"${map.value}"`)
                .join(", ");
            if (selectedColumns) {
                columnsCode = `
# Only keep relevant columns
${inputName} = ${inputName}[[${selectedColumns}]]
`;
            }
        }
        const ifExistsAction = config.ifTableExists;
        const schemaParam = config.schema && config.schema.trim()
            ? `,
        schema="${config.schema}"`
            : "";
        return `
# Connect to the Oracle database
${oracleClientInitialization}${uniqueEngineName} = sqlalchemy.create_engine("${connectionString}")
${mappingsCode}${columnsCode}
# Write DataFrame to Oracle
try:
    ${inputName}.to_sql(
        name="${config.tableName}",
        schema="${config.schema}",
        con=${uniqueEngineName},
        if_exists="${ifExistsAction}",
        index=False${schemaParam}
    )
finally:
    ${uniqueEngineName}.dispose()
`;
    }
}


/***/ },

/***/ "./lib/components/outputs/databases/PostgresOutput.js"
/*!************************************************************!*\
  !*** ./lib/components/outputs/databases/PostgresOutput.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PostgresOutput: () => (/* binding */ PostgresOutput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");


class PostgresOutput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            host: "localhost",
            port: "5432",
            databaseName: "",
            schema: "public",
            username: "",
            password: "",
            ifTableExists: "fail",
            mode: "insert",
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "input",
                    label: "Host",
                    id: "host",
                    placeholder: "Enter database host",
                    connection: "Postgres",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Port",
                    id: "port",
                    placeholder: "Enter database port",
                    connection: "Postgres",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Database Name",
                    id: "databaseName",
                    connection: "Postgres",
                    placeholder: "Enter database name",
                },
                {
                    type: "input",
                    label: "Schema",
                    id: "schema",
                    connection: "Postgres",
                    placeholder: "Enter schema name",
                },
                {
                    type: "table",
                    label: "表名",
                    // label: "Table Name",
                    query: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`,
                    id: "tableName",
                    placeholder: "输入表名",
                },
                {
                    type: "input",
                    label: "Username",
                    id: "username",
                    placeholder: "Enter username",
                    connection: "Postgres",
                    advanced: true,
                },
                {
                    type: "input",
                    inputType: "password",
                    label: "Password",
                    id: "password",
                    connection: "Postgres",
                    placeholder: "Enter password",
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "If Table Exists",
                    id: "ifTableExists",
                    options: [
                        { value: "fail", label: "Fail" },
                        { value: "replace", label: "Replace" },
                        { value: "append", label: "Append" },
                    ],
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "Mode",
                    id: "mode",
                    options: [{ value: "insert", label: "INSERT" }],
                    advanced: true,
                },
                {
                    type: "dataMapping",
                    label: "Mapping",
                    id: "mapping",
                    tooltip: "By default the mapping is inferred from the input data. By specifying a schema you override the incoming schema.",
                    outputType: "relationalDatabase",
                    imports: ["psycopg2-binary"],
                    drivers: "postgresql",
                    query: `
SELECT 
    column_name AS "Field",
    data_type AS "Type",
    is_nullable AS "Null",
    column_default AS "Default",
    CASE 
        WHEN character_maximum_length IS NOT NULL THEN character_maximum_length::text
        ELSE ''
    END AS "Extra"
FROM 
    information_schema.columns
WHERE 
    table_schema = '{{schema}}' AND
    table_name = '{{table}}';`,
                    pythonExtraction: `column_info = schema[[\"Field\", \"Type\"]]\nformatted_output = \", \".join([f\"{row['Field']} ({row['Type']})\" for _, row in column_info.iterrows()])\nprint(formatted_output)`,
                    typeOptions: [
                        { value: "SMALLINT", label: "SMALLINT" },
                        { value: "INTEGER", label: "INTEGER" },
                        { value: "BIGINT", label: "BIGINT" },
                        { value: "SERIAL", label: "SERIAL" },
                        { value: "BIGSERIAL", label: "BIGSERIAL" },
                        { value: "DECIMAL", label: "DECIMAL" },
                        { value: "NUMERIC", label: "NUMERIC" },
                        { value: "REAL", label: "REAL" },
                        { value: "DOUBLE PRECISION", label: "DOUBLE PRECISION" },
                        { value: "SMALLSERIAL", label: "SMALLSERIAL" },
                        { value: "MONEY", label: "MONEY" },
                        { value: "CHAR", label: "CHAR" },
                        { value: "VARCHAR", label: "VARCHAR" },
                        { value: "TEXT", label: "TEXT" },
                        { value: "BYTEA", label: "BYTEA" },
                        { value: "TIMESTAMP", label: "TIMESTAMP" },
                        { value: "DATE", label: "DATE" },
                        { value: "TIME", label: "TIME" },
                        { value: "INTERVAL", label: "INTERVAL" },
                        { value: "BOOLEAN", label: "BOOLEAN" },
                        { value: "UUID", label: "UUID" },
                        { value: "XML", label: "XML" },
                        { value: "JSON", label: "JSON" },
                        { value: "JSONB", label: "JSONB" },
                        { value: "ARRAY", label: "ARRAY" },
                        { value: "CIDR", label: "CIDR" },
                        { value: "INET", label: "INET" },
                        { value: "MACADDR", label: "MACADDR" },
                        { value: "BIT", label: "BIT" },
                        { value: "TSVECTOR", label: "TSVECTOR" },
                        { value: "TSQUERY", label: "TSQUERY" },
                    ],
                    advanced: true,
                },
            ],
        };
        const description = "Use Postgres Output to insert data into a Postgres table by specifying a data mapping between the incoming data and the existing table schema.";
        super("Postgres Output", "postgresOutput", description, "pandas_df_output", [], "outputs.Databases", _icons__WEBPACK_IMPORTED_MODULE_0__.postgresIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        deps.push("psycopg2-binary");
        return deps;
    }
    provideImports({ config }) {
        return ["import pandas as pd", "import sqlalchemy", "import psycopg2"];
    }
    generateDatabaseConnectionCode({ config, connectionName }) {
        return `
# Connect to the Postgres database
${connectionName} = sqlalchemy.create_engine(
  "postgresql://${config.username}:${config.password}@${config.host}:${config.port}/${config.databaseName}"
)
`;
    }
    generateComponentCode({ config, inputName }) {
        const uniqueEngineName = `${inputName}Engine`;
        let mappingsCode = "";
        let columnsCode = "";
        if (config.mapping && config.mapping.length > 0) {
            const renameMap = config.mapping
                .filter((map) => map.input &&
                (map.input.value || typeof map.input.value === "number"))
                .map((map) => {
                if (map.input.value != map.value) {
                    if (map.input.named) {
                        return `"${map.input.value}": "${map.value}"`; // Handles named columns
                    }
                    else {
                        return `${map.input.value}: "${map.value}"`; // Handles numeric index
                    }
                }
                return undefined; // Explicitly return undefined for clarity
            })
                .filter((value) => value !== undefined);
            if (renameMap.length > 0) {
                mappingsCode = `
# Rename columns based on the mapping
${inputName} = ${inputName}.rename(columns={${renameMap.join(", ")}})
`;
            }
            const selectedColumns = config.mapping
                .filter((map) => map.value !== null && map.value !== undefined)
                .map((map) => `"${map.value}"`)
                .join(", ");
            if (selectedColumns) {
                columnsCode = `
# Only keep relevant columns
${inputName} = ${inputName}[[${selectedColumns}]]
`;
            }
        }
        const ifExistsAction = config.ifTableExists;
        const schemaParam = config.schema && config.schema.toLowerCase() !== "public"
            ? `,
  schema="${config.schema}"`
            : "";
        const connectionCode = this.generateDatabaseConnectionCode({
            config,
            connectionName: uniqueEngineName,
        });
        return `
${connectionCode}
${mappingsCode}${columnsCode}
# Write DataFrame to Postgres
try:
    ${inputName}.to_sql(
        name="${config.tableName.value}",
        con=${uniqueEngineName},
        if_exists="${ifExistsAction}",
        index=False${schemaParam}
    )
finally:
    ${uniqueEngineName}.dispose()
`;
    }
}


/***/ },

/***/ "./lib/components/outputs/databases/SnowflakeOutput.js"
/*!*************************************************************!*\
  !*** ./lib/components/outputs/databases/SnowflakeOutput.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SnowflakeOutput: () => (/* binding */ SnowflakeOutput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");

 // Adjust the import path
class SnowflakeOutput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            account: "",
            database: "",
            schema: "PUBLIC",
            tableName: "",
            username: "",
            password: "",
            warehouse: "",
            role: "",
            ifTableExists: "fail",
            mode: "insert",
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "input",
                    label: "Account",
                    id: "account",
                    placeholder: "Enter Account",
                    connection: "Snowflake",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Database Name",
                    id: "database",
                    connection: "Snowflake",
                    placeholder: "Enter database name",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Username",
                    id: "username",
                    placeholder: "Enter username",
                    connection: "Snowflake",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Password",
                    id: "password",
                    placeholder: "Enter password",
                    connection: "Snowflake",
                    inputType: "password",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Warehouse",
                    id: "warehouse",
                    placeholder: "Enter warehouse name",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Schema",
                    id: "schema",
                    placeholder: "Enter schema name",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Role (Optional)",
                    id: "role",
                    placeholder: "Role name",
                    advanced: true,
                },
                {
                    type: "table",
                    label: "表名",
                    // label: "Table Name",
                    query: `SELECT table_name FROM information_schema.tables WHERE table_schema = '{{schema}}'`,
                    id: "tableName",
                    placeholder: "输入表名",
                },
                {
                    type: "radio",
                    label: "If Table Exists",
                    id: "ifTableExists",
                    options: [
                        { value: "fail", label: "Fail" },
                        { value: "replace", label: "Replace" },
                        { value: "append", label: "Append" },
                    ],
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "Mode",
                    id: "mode",
                    options: [{ value: "insert", label: "INSERT" }],
                    advanced: true,
                },
                {
                    type: "dataMapping",
                    label: "Mapping",
                    id: "mapping",
                    tooltip: "By default, the mapping is inferred from the input data. By specifying a schema, you override the incoming schema.",
                    outputType: "relationalDatabase",
                    imports: ["snowflake-sqlalchemy"],
                    drivers: "snowflake",
                    query: `DESCRIBE TABLE "{{schema}}"."{{table}}"`,
                    pythonExtraction: `columns_types = ', '.join(f"{row['name']} ({row['type']})" for _, row in schema.iterrows())\nprint(columns_types)`,
                    typeOptions: [
                        { value: "INTEGER", label: "INTEGER" },
                        { value: "FLOAT", label: "FLOAT" },
                        { value: "NUMBER", label: "NUMBER" },
                        { value: "VARCHAR", label: "VARCHAR" },
                        { value: "BOOLEAN", label: "BOOLEAN" },
                        { value: "DATE", label: "DATE" },
                        { value: "TIMESTAMP", label: "TIMESTAMP" },
                        { value: "VARIANT", label: "VARIANT" },
                        { value: "OBJECT", label: "OBJECT" },
                        { value: "ARRAY", label: "ARRAY" },
                    ],
                    advanced: true,
                },
            ],
        };
        const description = "Use Snowflake Output to insert data into a Snowflake table by specifying a data mapping between the incoming data and the existing table schema.";
        super("Snowflake Output", "snowflakeOutput", description, "pandas_df_output", [], "outputs.Databases", _icons__WEBPACK_IMPORTED_MODULE_0__.snowflakeIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        return ["snowflake-sqlalchemy"];
    }
    provideImports({ config }) {
        return [
            "import pandas as pd",
            "import sqlalchemy",
            "import urllib.parse",
            "from snowflake.sqlalchemy import URL",
        ];
    }
    generateDatabaseConnectionCode({ config, connectionName }) {
        const rolePart = config.role ? `, role='${config.role}'` : "";
        return `
# Connect to the Snowflake database
${connectionName} = sqlalchemy.create_engine(URL(
    account='${config.account}',
    user='${config.username}',
    password=urllib.parse.quote("${config.password}"),
    database='${config.database}',
    schema='${config.schema}',
    warehouse='${config.warehouse}'${rolePart}
))
`;
    }
    generateComponentCode({ config, inputName }) {
        const uniqueEngineName = `${inputName}Engine`;
        let mappingsCode = "";
        let columnsCode = "";
        if (config.mapping && config.mapping.length > 0) {
            const renameMap = config.mapping
                .filter((map) => map.input &&
                map.input.value !== undefined &&
                map.input.value !== null)
                .map((map) => {
                if (map.input.value != map.value) {
                    return `"${map.input.value}": "${map.value}"`;
                }
                return undefined;
            })
                .filter((value) => value !== undefined);
            if (renameMap.length > 0) {
                mappingsCode = `
# Rename columns based on the mapping
${inputName} = ${inputName}.rename(columns={${renameMap.join(", ")}})
`;
            }
            const selectedColumns = config.mapping
                .filter((map) => map.value !== null && map.value !== undefined)
                .map((map) => `"${map.value}"`)
                .join(", ");
            if (selectedColumns) {
                columnsCode = `
# Only keep relevant columns
${inputName} = ${inputName}[[${selectedColumns}]]
`;
            }
        }
        const ifExistsAction = config.ifTableExists;
        const schemaParam = config.schema && config.schema.toUpperCase() !== "PUBLIC"
            ? `,
    schema="${config.schema}"`
            : "";
        const connectionCode = this.generateDatabaseConnectionCode({
            config,
            connectionName: uniqueEngineName,
        });
        return `
${connectionCode}
${mappingsCode}${columnsCode}
# Write DataFrame to Snowflake
try:
    ${inputName}.to_sql(
        name="${config.tableName.value}",
        schema="${config.schema}",
        con=${uniqueEngineName},
        if_exists="${ifExistsAction}",
        index=False${schemaParam}
    )
finally:
    ${uniqueEngineName}.dispose()
`;
    }
}


/***/ },

/***/ "./lib/components/outputs/databases/SqlServerOutput.js"
/*!*************************************************************!*\
  !*** ./lib/components/outputs/databases/SqlServerOutput.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SqlServerOutput: () => (/* binding */ SqlServerOutput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");

 // Adjust the import path
class SqlServerOutput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            host: "localhost",
            port: "1433",
            databaseName: "",
            username: "",
            password: "",
            tableName: "",
            ifTableExists: "fail",
            mode: "insert",
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "input",
                    label: "Host",
                    id: "host",
                    placeholder: "Enter database host",
                    connection: "SQL Server",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Port",
                    id: "port",
                    placeholder: "Enter database port",
                    connection: "SQL Server",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Database Name",
                    id: "databaseName",
                    placeholder: "Enter database name",
                    connection: "SQL Server",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Username",
                    id: "username",
                    placeholder: "Enter username",
                    connection: "SQL Server",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Password",
                    id: "password",
                    placeholder: "Enter password",
                    connection: "SQL Server",
                    inputType: "password",
                    advanced: true,
                },
                {
                    type: "table",
                    label: "表名",
                    // label: "Table Name",
                    query: `SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE';`,
                    id: "tableName",
                    placeholder: "输入表名",
                },
                {
                    type: "radio",
                    label: "If Table Exists",
                    id: "ifTableExists",
                    options: [
                        { value: "fail", label: "Fail" },
                        { value: "replace", label: "Replace" },
                        { value: "append", label: "Append" },
                    ],
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "Mode",
                    id: "mode",
                    options: [{ value: "insert", label: "INSERT" }],
                    advanced: true,
                },
                {
                    type: "dataMapping",
                    label: "Mapping",
                    id: "mapping",
                    tooltip: "By default, the mapping is inferred from the input data. By specifying a schema, you override the incoming schema.",
                    outputType: "relationalDatabase",
                    imports: ["pyodbc"],
                    drivers: "mssql",
                    query: `
SELECT 
    COLUMN_NAME AS "Field",
    DATA_TYPE AS "Type",
    IS_NULLABLE AS "Null",
    COLUMN_DEFAULT AS "Default",
    '' AS "Extra"
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = '{{table}}' AND TABLE_SCHEMA = 'dbo';
`,
                    typeOptions: [
                        { value: "INT", label: "INT" },
                        { value: "VARCHAR", label: "VARCHAR" },
                        { value: "NVARCHAR", label: "NVARCHAR" },
                        { value: "TEXT", label: "TEXT" },
                        { value: "DATETIME", label: "DATETIME" },
                        { value: "DATE", label: "DATE" },
                        { value: "FLOAT", label: "FLOAT" },
                        { value: "DECIMAL", label: "DECIMAL" },
                        { value: "BIT", label: "BIT" },
                        { value: "BIGINT", label: "BIGINT" },
                        { value: "SMALLINT", label: "SMALLINT" },
                        { value: "TINYINT", label: "TINYINT" },
                        { value: "CHAR", label: "CHAR" },
                        { value: "NCHAR", label: "NCHAR" },
                        { value: "NTEXT", label: "NTEXT" },
                        { value: "BINARY", label: "BINARY" },
                        { value: "VARBINARY", label: "VARBINARY" },
                        { value: "IMAGE", label: "IMAGE" },
                        { value: "UNIQUEIDENTIFIER", label: "UNIQUEIDENTIFIER" },
                        { value: "XML", label: "XML" },
                        { value: "TIME", label: "TIME" },
                        { value: "DATETIME2", label: "DATETIME2" },
                        { value: "DATETIMEOFFSET", label: "DATETIMEOFFSET" },
                        { value: "SMALLDATETIME", label: "SMALLDATETIME" },
                        { value: "REAL", label: "REAL" },
                        { value: "MONEY", label: "MONEY" },
                        { value: "SMALLMONEY", label: "SMALLMONEY" },
                    ],
                    advanced: true,
                },
                {
                    type: "info",
                    label: "Drivers installation",
                    id: "driversInstallation",
                    text: "You may need to install additional drivers on your machine for this component to function.\nFor Mac you need to install 'brew install unixodbc'",
                    advanced: true,
                },
            ],
        };
        const description = "Use SQL Server Output to insert data into a SQL Server table by specifying a data mapping between the incoming data and the existing table schema.";
        super("SQL Server Output", "sqlServerOutput", description, "pandas_df_output", [], "outputs.Databases", _icons__WEBPACK_IMPORTED_MODULE_0__.sqlServerIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        return ["pyodbc"];
    }
    provideImports({ config }) {
        return ["import pandas as pd", "import sqlalchemy", "import pyodbc"];
    }
    generateDatabaseConnectionCode({ config, connectionName }) {
        return `
# Connect to the SQL Server database
${connectionName} = sqlalchemy.create_engine(
  "mssql+pyodbc://${config.username}:${config.password}@${config.host}:${config.port}/${config.databaseName}?driver=ODBC+Driver+17+for+SQL+Server"
)
`;
    }
    generateComponentCode({ config, inputName }) {
        const uniqueEngineName = `${inputName}_Engine`;
        let mappingsCode = "";
        let columnsCode = "";
        if (config.mapping && config.mapping.length > 0) {
            const renameMap = config.mapping
                .filter((map) => map.input &&
                map.input.value !== undefined &&
                map.input.value !== null)
                .map((map) => {
                if (map.input.value != map.value) {
                    return `"${map.input.value}": "${map.value}"`;
                }
                return undefined;
            })
                .filter((value) => value !== undefined);
            if (renameMap.length > 0) {
                mappingsCode = `
    # Rename columns based on the mapping
    ${inputName} = ${inputName}.rename(columns={${renameMap.join(", ")}})
    `;
            }
            const selectedColumns = config.mapping
                .filter((map) => map.value !== null && map.value !== undefined)
                .map((map) => `"${map.value}"`)
                .join(", ");
            if (selectedColumns) {
                columnsCode = `
    # Only keep relevant columns
    ${inputName} = ${inputName}[[${selectedColumns}]]
    `;
            }
        }
        const ifExistsAction = config.ifTableExists;
        const connectionCode = this.generateDatabaseConnectionCode({
            config,
            connectionName: uniqueEngineName,
        });
        return `
${connectionCode}
${mappingsCode}${columnsCode}
# Write DataFrame to SQL Server
try:
    ${inputName}.to_sql(
        name="${config.tableName}",
        con=${uniqueEngineName},
        if_exists="${ifExistsAction}",
        index=False,
        schema="dbo"
    )
finally:
    ${uniqueEngineName}.dispose()
`;
    }
}


/***/ },

/***/ "./lib/components/outputs/files/CsvFileOutput.js"
/*!*******************************************************!*\
  !*** ./lib/components/outputs/files/CsvFileOutput.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CsvFileOutput: () => (/* binding */ CsvFileOutput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/S3OptionsHandler */ "./lib/components/common/S3OptionsHandler.js");
/* harmony import */ var _common_FTPOptionsHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/FTPOptionsHandler */ "./lib/components/common/FTPOptionsHandler.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../inputs/label */ "./lib/components/inputs/label.js");





class CsvFileOutput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            fileLocation: "local",
            connectionMethod: "env",
            csvOptions: { sep: ",", header: true, index: false },
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "File Location",
                    id: "fileLocation",
                    options: [
                        { value: "local", label: "Local" },
                        { value: "s3", label: "S3" },
                        { value: "ftp", label: "FTP" },
                    ],
                    advanced: true,
                },
                ..._common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.getAWSFields(),
                ..._common_FTPOptionsHandler__WEBPACK_IMPORTED_MODULE_3__.FTPOptionsHandler.getFTPFields(),
                {
                    type: "file",
                    label: "File path",
                    id: "filePath",
                    placeholder: "Type file name",
                    validation: "\\.(csv|tsv|txt)$",
                    validationMessage: "This field expects a file with a csv, tsv or txt extension such as output.csv.",
                },
                {
                    type: "selectCustomizable",
                    label: "Separator",
                    id: "csvOptions.sep",
                    placeholder: "auto",
                    options: [
                        { value: ",", label: "comma (,)" },
                        { value: ";", label: "semicolon (;)" },
                        { value: " ", label: "space" },
                        { value: "  ", label: "tab" },
                        { value: "|", label: "pipe (|)" },
                    ],
                },
                {
                    type: "boolean",
                    label: "Create folders if don't exist",
                    id: "createFoldersIfNotExist",
                    condition: { fileLocation: ["local"] },
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "Mode",
                    id: "csvOptions.mode",
                    options: [
                        { value: "w", label: "Write" },
                        { value: "x", label: "Exclusive Creation" },
                        { value: "a", label: "Append" },
                    ],
                    advanced: true,
                },
                {
                    type: "selectCustomizable",
                    label: "Quoting",
                    id: "csvOptions.quoting",
                    placeholder: "Default: 0 (Minimal Quoting)",
                    tooltip: "Controls how special characters like commas, quotes, or newlines are handled in text fields when writing to or reading from a CSV file.",
                    options: [
                        {
                            value: "0",
                            label: "Minimal quoting",
                            tooltip: "Quotes only fields that contain special characters (commas, quotes, newlines).",
                        },
                        {
                            value: "1",
                            label: "Quote All",
                            tooltip: "Quotes all fields, regardless of content.",
                        },
                        {
                            value: "2",
                            label: "Quote All Non-Numeric",
                            tooltip: "Quotes all non-numeric fields. Numeric fields are written without quotes.",
                        },
                        {
                            value: "3",
                            label: "Quote None",
                            tooltip: "Disables quoting entirely. You should use an escape character for special characters.",
                        },
                    ],
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Header",
                    id: "csvOptions.header",
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Row index",
                    tooltip: "Write row names (index).",
                    id: "csvOptions.index",
                    advanced: true,
                },
                {
                    type: "keyvalue",
                    label: "Storage Options",
                    id: "csvOptions.storage_options",
                    condition: { fileLocation: ["s3"] },
                    advanced: true,
                },
            ],
        };
        // const description = "Use CSV File Output to write or append data to a CSV file locally or remotely (S3)."
        const description = "使用 CSV 文件输出功能，可以将数据写入或追加到本地或远程（如 S3）的 CSV 文件中。";
        super(
        // "CSV File Output",
        "CSV 文件输出", "csvFileOutput", description, "pandas_df_output", [], _inputs_label__WEBPACK_IMPORTED_MODULE_4__.chineseLabel[3], _icons__WEBPACK_IMPORTED_MODULE_0__.fileCsvIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        let imports = ["import pandas as pd"];
        if (config.createFoldersIfNotExist) {
            imports.push("import os");
        }
        return imports;
    }
    generateComponentCode({ config, inputName }) {
        const optionsString = this.generateOptionsCode(config);
        const createFoldersCode = config.createFoldersIfNotExist
            ? `os.makedirs(os.path.dirname("${config.filePath}"), exist_ok=True)\n`
            : "";
        const code = `
# Export to CSV file
${createFoldersCode}${inputName}.to_csv("${config.filePath}"${optionsString})
`;
        return code.trim();
    }
    generateOptionsCode(config) {
        let csvOptions = { ...config.csvOptions };
        // Handle storage options
        let storageOptions = csvOptions.storage_options || {};
        storageOptions = _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.handleS3SpecificOptions(config, storageOptions);
        storageOptions = _common_FTPOptionsHandler__WEBPACK_IMPORTED_MODULE_3__.FTPOptionsHandler.handleFTPSpecificOptions(config, storageOptions);
        if (Object.keys(storageOptions).length > 0) {
            csvOptions.storage_options = storageOptions;
        }
        // Generate options string
        let optionsEntries = Object.entries(csvOptions)
            .filter(([key, value]) => value !== null && value !== "")
            .map(([key, value]) => {
            if (typeof value === "boolean") {
                return `${key}=${value ? "True" : "False"}`;
            }
            else if (key === "storage_options") {
                return `${key}=${JSON.stringify(value)}`;
            }
            else if (key === "quoting") {
                return `${key}=${value}`;
            }
            return `${key}='${value}'`;
        });
        const optionsString = optionsEntries.join(", ");
        return optionsString ? `, ${optionsString}` : "";
    }
}


/***/ },

/***/ "./lib/components/outputs/files/ExcelFileOutput.js"
/*!*********************************************************!*\
  !*** ./lib/components/outputs/files/ExcelFileOutput.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExcelFileOutput: () => (/* binding */ ExcelFileOutput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/S3OptionsHandler */ "./lib/components/common/S3OptionsHandler.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../inputs/label */ "./lib/components/inputs/label.js");




class ExcelFileOutput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            fileLocation: "local",
            connectionMethod: "env",
            excelOptions: {
                header: true,
                index: false,
            },
            engine: "xlsxwriter",
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "File Location",
                    id: "fileLocation",
                    options: [
                        { value: "local", label: "Local" },
                        { value: "s3", label: "S3" },
                    ],
                    advanced: true,
                },
                ..._common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.getAWSFields(),
                {
                    type: "file",
                    label: "File path",
                    id: "filePath",
                    placeholder: "Type file name",
                    validation: "\\.(xlsx)$",
                    validationMessage: "This field expects a file with a xlsx extension such as output.xlsx.",
                },
                {
                    type: "input",
                    label: "Sheet",
                    id: "excelOptions.sheet_name",
                    placeholder: "default: Sheet1",
                },
                {
                    type: "boolean",
                    label: "Create folders if don't exist",
                    condition: { fileLocation: ["local"] },
                    id: "createFoldersIfNotExist",
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "Mode",
                    id: "mode",
                    options: [
                        { value: "write", label: "Write" },
                        { value: "append", label: "Append" },
                    ],
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Header",
                    id: "excelOptions.header",
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Row index",
                    tooltip: "Write row names (index).",
                    id: "excelOptions.index",
                    advanced: true,
                },
                {
                    type: "select",
                    label: "Engine",
                    id: "engine",
                    tooltip: "Depending on the file format, different engines might be used.\nopenpyxl supports newer Excel file formats.\n calamine supports Excel (.xls, .xlsx, .xlsm, .xlsb) and OpenDocument (.ods) file formats.\n odf supports OpenDocument file formats (.odf, .ods, .odt).\n pyxlsb supports Binary Excel files.\n xlrd supports old-style Excel files (.xls).",
                    options: [
                        { value: "openpyxl", label: "openpyxl" },
                        { value: "xlsxwriter", label: "xlsxwriter" },
                    ],
                    advanced: true,
                },
                {
                    type: "keyvalue",
                    label: "Storage Options",
                    id: "csvOptions.storage_options",
                    condition: { fileLocation: ["s3"] },
                    advanced: true,
                },
            ],
        };
        // const description = "Use Excel File Output to write or append data to an Excel file locally or remotely (S3)."
        const description = "使用 Excel 文件输出功能，可在本地或远程（如 S3）向 Excel 文件中写入或追加数据。";
        super(
        // "Excel File Output",
        "Excel 文件输出", "excelFileOutput", description, "pandas_df_output", [], _inputs_label__WEBPACK_IMPORTED_MODULE_3__.chineseLabel[3], _icons__WEBPACK_IMPORTED_MODULE_0__.fileExcelIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        const engine = config.engine;
        if (engine === "None" || engine === "openpyxl") {
            deps.push("openpyxl");
        }
        if (engine === "xlsxwriter") {
            deps.push("xlsxwriter");
        }
        return deps;
    }
    provideImports({ config }) {
        let imports = ["import pandas as pd"];
        if (config.createFoldersIfNotExist) {
            imports.push("import os");
        }
        return imports;
    }
    generateComponentCode({ config, inputName }) {
        const optionsString = this.generateOptionsCode(config);
        const createFoldersCode = config.createFoldersIfNotExist
            ? `os.makedirs(os.path.dirname("${config.filePath}"), exist_ok=True)\n`
            : "";
        const engine = config.engine !== "None" ? `'${config.engine}'` : config.engine;
        let code = "";
        if (config.excelOptions.mode === "append") {
            code = `
# Exporting to Excel (append mode)
with pd.ExcelWriter("${config.filePath}", mode="a", engine=${engine}) as writer:
    ${inputName}.to_excel(writer${optionsString})
`;
        }
        else {
            code = `
# Exporting to Excel
${inputName}.to_excel("${config.filePath}", engine=${engine}${optionsString})
`;
        }
        return `${createFoldersCode}${code.trim()}`;
    }
    generateOptionsCode(config) {
        let excelOptions = { ...config.excelOptions };
        // Handle storage options
        let storageOptions = excelOptions.storage_options || {};
        storageOptions = _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.handleS3SpecificOptions(config, storageOptions);
        if (Object.keys(storageOptions).length > 0) {
            excelOptions.storage_options = storageOptions;
        }
        // Generate options string
        let optionsEntries = Object.entries(excelOptions)
            .filter(([key, value]) => value !== null && value !== "")
            .map(([key, value]) => {
            if (typeof value === "boolean") {
                return `${key}=${value ? "True" : "False"}`;
            }
            else if (key === "storage_options") {
                return `${key}=${JSON.stringify(value)}`;
            }
            else if (value === "None") {
                return `${key}=None`;
            }
            return `${key}='${value}'`;
        });
        const optionsString = optionsEntries.join(", ");
        return optionsString ? `, ${optionsString}` : "";
    }
}


/***/ },

/***/ "./lib/components/outputs/files/JsonFileOutput.js"
/*!********************************************************!*\
  !*** ./lib/components/outputs/files/JsonFileOutput.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JsonFileOutput: () => (/* binding */ JsonFileOutput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/S3OptionsHandler */ "./lib/components/common/S3OptionsHandler.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../inputs/label */ "./lib/components/inputs/label.js");




class JsonFileOutput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            fileLocation: "local",
            connectionMethod: "env",
            jsonOptions: { orient: "records" },
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "File Location",
                    id: "fileLocation",
                    options: [
                        { value: "local", label: "Local" },
                        { value: "s3", label: "S3" },
                    ],
                    advanced: true,
                },
                ..._common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.getAWSFields(),
                {
                    type: "file",
                    label: "File path",
                    id: "filePath",
                    placeholder: "Type file name",
                    validation: ".(json|jsonl)$",
                    validationMessage: "This field expects a file with a json or jsonl extension such as output.json.",
                },
                {
                    type: "select",
                    label: "Orientation",
                    id: "jsonOptions.orient",
                    placeholder: "Select orientation",
                    options: [
                        {
                            value: "columns",
                            label: "columns (JSON object with column labels as keys)",
                        },
                        {
                            value: "records",
                            label: "records (List of rows as JSON objects)",
                        },
                        { value: "index", label: "index (Dict with index labels as keys)" },
                        {
                            value: "split",
                            label: "split (Dict with 'index', 'columns', and 'data' keys)",
                        },
                        {
                            value: "table",
                            label: "table (Dict with 'schema' and 'data' keys, following the Table Schema)",
                        },
                    ],
                },
                {
                    type: "boolean",
                    label: "Create folders if don't exist",
                    condition: { fileLocation: ["local"] },
                    id: "createFoldersIfNotExist",
                    advanced: true,
                },
                {
                    type: "keyvalue",
                    label: "Storage Options",
                    id: "csvOptions.storage_options",
                    condition: { fileLocation: ["s3"] },
                    advanced: true,
                },
            ],
        };
        // const description = "Use JSON File Output to write or append data to a JSON file locally or remotely (S3)."
        const description = "使用 JSON 文件输出功能，可在本地或远程（如 S3）向 JSON 文件中写入或追加数据。";
        super(
        // "JSON File Output",
        "JSON 文件输出", "jsonFileOutput", description, "pandas_df_output", [], _inputs_label__WEBPACK_IMPORTED_MODULE_3__.chineseLabel[3], _icons__WEBPACK_IMPORTED_MODULE_0__.fileJsonIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        let imports = ["import pandas as pd"];
        if (config.createFoldersIfNotExist) {
            imports.push("import os");
        }
        return imports;
    }
    generateComponentCode({ config, inputName }) {
        const optionsString = this.generateOptionsCode(config);
        const createFoldersCode = config.createFoldersIfNotExist
            ? `os.makedirs(os.path.dirname("${config.filePath}"), exist_ok=True)\n`
            : "";
        const code = `
# Export to JSON file
${createFoldersCode}${inputName}.to_json("${config.filePath}"${optionsString})
`;
        return code.trim();
    }
    generateOptionsCode(config) {
        let jsonOptions = { ...config.jsonOptions };
        // Handle storage options
        let storageOptions = jsonOptions.storage_options || {};
        storageOptions = _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.handleS3SpecificOptions(config, storageOptions);
        if (Object.keys(storageOptions).length > 0) {
            jsonOptions.storage_options = storageOptions;
        }
        // Generate options string
        let optionsEntries = Object.entries(jsonOptions)
            .filter(([key, value]) => value !== null && value !== "")
            .map(([key, value]) => {
            if (key === "storage_options") {
                return `${key}=${JSON.stringify(value)}`;
            }
            return `${key}="${value}"`;
        });
        const optionsString = optionsEntries.join(", ");
        return optionsString ? `, ${optionsString}` : "";
    }
}


/***/ },

/***/ "./lib/components/outputs/files/ParquetFileOutput.js"
/*!***********************************************************!*\
  !*** ./lib/components/outputs/files/ParquetFileOutput.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ParquetFileOutput: () => (/* binding */ ParquetFileOutput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/S3OptionsHandler */ "./lib/components/common/S3OptionsHandler.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../inputs/label */ "./lib/components/inputs/label.js");




class ParquetFileOutput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            fileLocation: "local",
            connectionMethod: "env",
            parquetOptions: { compression: "snappy" },
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "File Location",
                    id: "fileLocation",
                    options: [
                        { value: "local", label: "Local" },
                        { value: "s3", label: "S3" },
                    ],
                    advanced: true,
                },
                ..._common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.getAWSFields(),
                {
                    type: "file",
                    label: "File path",
                    id: "filePath",
                    placeholder: "Type file name",
                    validation: "\\.(parquet)$",
                    validationMessage: "This field expects a file with a .parquet extension such as output.parquet.",
                },
                {
                    type: "radio",
                    label: "Compression",
                    id: "parquetOptions.compression",
                    options: [
                        { value: "snappy", label: "Snappy" },
                        { value: "gzip", label: "GZip" },
                        { value: "brotli", label: "Brotli" },
                        { value: "None", label: "None" },
                    ],
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Create folders if don't exist",
                    condition: { fileLocation: ["local"] },
                    id: "createFoldersIfNotExist",
                    advanced: true,
                },
                {
                    type: "keyvalue",
                    label: "Storage Options",
                    id: "csvOptions.storage_options",
                    condition: { fileLocation: ["s3"] },
                    advanced: true,
                },
            ],
        };
        // const description = "Use Parquet File Output to write or append data to a Parquet file locally or remotely (S3)."
        const description = "使用 Parquet 文件输出功能，可在本地或远程（如 S3）向 Parquet 文件中写入或追加数据。";
        super(
        // "Parquet File Output",
        "Parquet 文件输出", "parquetFileOutput", "no desc", "pandas_df_output", [], _inputs_label__WEBPACK_IMPORTED_MODULE_3__.chineseLabel[3], _icons__WEBPACK_IMPORTED_MODULE_0__.fileParquetIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        deps.push("pyarrow");
        return deps;
    }
    provideImports({ config }) {
        let imports = ["import pandas as pd"];
        if (config.createFoldersIfNotExist) {
            imports.push("import os");
        }
        return imports;
    }
    generateComponentCode({ config, inputName }) {
        const optionsString = this.generateOptionsCode(config);
        const createFoldersCode = config.createFoldersIfNotExist
            ? `os.makedirs(os.path.dirname("${config.filePath}"), exist_ok=True)\n`
            : "";
        const code = `
# Export to Parquet file
${createFoldersCode}${inputName}.to_parquet("${config.filePath}"${optionsString})
`;
        return code.trim();
    }
    generateOptionsCode(config) {
        let parquetOptions = { ...config.parquetOptions };
        // Handle storage options
        let storageOptions = parquetOptions.storage_options || {};
        storageOptions = _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.handleS3SpecificOptions(config, storageOptions);
        if (Object.keys(storageOptions).length > 0) {
            parquetOptions.storage_options = storageOptions;
        }
        // Generate options string
        let optionsEntries = Object.entries(parquetOptions)
            .filter(([key, value]) => value !== null && value !== "")
            .map(([key, value]) => {
            if (key === "storage_options") {
                return `${key}=${JSON.stringify(value)}`;
            }
            else if (value === "None") {
                return `${key}=None`;
            }
            return `${key}="${value}"`;
        });
        const optionsString = optionsEntries.join(", ");
        return optionsString ? `, ${optionsString}` : "";
    }
}


/***/ },

/***/ "./lib/components/outputs/files/S3FileOutput.js"
/*!******************************************************!*\
  !*** ./lib/components/outputs/files/S3FileOutput.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S3FileOutput: () => (/* binding */ S3FileOutput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _CsvFileOutput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CsvFileOutput */ "./lib/components/outputs/files/CsvFileOutput.js");
/* harmony import */ var _JsonFileOutput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./JsonFileOutput */ "./lib/components/outputs/files/JsonFileOutput.js");
/* harmony import */ var _ExcelFileOutput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ExcelFileOutput */ "./lib/components/outputs/files/ExcelFileOutput.js");
/* harmony import */ var _ParquetFileOutput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ParquetFileOutput */ "./lib/components/outputs/files/ParquetFileOutput.js");
/* harmony import */ var _XmlFileOutput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./XmlFileOutput */ "./lib/components/outputs/files/XmlFileOutput.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../inputs/label */ "./lib/components/inputs/label.js");








class S3FileOutput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            fileType: "csv",
            fileLocation: "s3",
            connectionMethod: "env",
        };
        const csvComponent = new _CsvFileOutput__WEBPACK_IMPORTED_MODULE_2__.CsvFileOutput();
        const jsonComponent = new _JsonFileOutput__WEBPACK_IMPORTED_MODULE_3__.JsonFileOutput();
        const excelComponent = new _ExcelFileOutput__WEBPACK_IMPORTED_MODULE_4__.ExcelFileOutput();
        const parquetComponent = new _ParquetFileOutput__WEBPACK_IMPORTED_MODULE_5__.ParquetFileOutput();
        const xmlComponent = new _XmlFileOutput__WEBPACK_IMPORTED_MODULE_6__.XmlFileOutput();
        const fieldsToRemove = ["fileLocation"]; // Fields to remove from all components
        const filteredCsvFields = csvComponent._form["fields"].filter((field) => !fieldsToRemove.includes(field.id));
        const filteredJsonFields = jsonComponent._form["fields"].filter((field) => !fieldsToRemove.includes(field.id));
        const filteredExcelFields = excelComponent._form["fields"].filter((field) => !fieldsToRemove.includes(field.id));
        const filteredParquetFields = parquetComponent._form["fields"].filter((field) => !fieldsToRemove.includes(field.id));
        const filteredXmlFields = xmlComponent._form["fields"].filter((field) => !fieldsToRemove.includes(field.id));
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "File Type",
                    id: "fileType",
                    options: [
                        { value: "csv", label: "CSV" },
                        { value: "json", label: "JSON" },
                        { value: "excel", label: "Excel" },
                        { value: "parquet", label: "Parquet" },
                        { value: "xml", label: "XML" },
                    ],
                },
                // Conditionally display filtered fields based on selected file type
                ...filteredCsvFields.map((field) => ({
                    ...field,
                    condition: { fileType: ["csv"], ...(field.condition || {}) },
                })),
                ...filteredJsonFields.map((field) => ({
                    ...field,
                    condition: { fileType: ["json"], ...(field.condition || {}) },
                })),
                ...filteredExcelFields.map((field) => ({
                    ...field,
                    condition: { fileType: ["excel"], ...(field.condition || {}) },
                })),
                ...filteredParquetFields.map((field) => ({
                    ...field,
                    condition: { fileType: ["parquet"], ...(field.condition || {}) },
                })),
                ...filteredXmlFields.map((field) => ({
                    ...field,
                    condition: { fileType: ["xml"], ...(field.condition || {}) },
                })),
            ],
        };
        // const description = "Use File Output to write or append data to a file remotely (S3). Supports CSV, JSON, Excel, Parquet, and XML formats.";
        const description = "使用“文件输出”功能可将数据远程写入或追加到一个文件中（例如 S3）。支持 CSV、JSON、Excel、Parquet 和 XML 格式。";
        super(
        // "S3 File Output",
        "S3 文件输出", "fileOutput", description, "pandas_df_output", [], _inputs_label__WEBPACK_IMPORTED_MODULE_7__.chineseLabel[3], _icons__WEBPACK_IMPORTED_MODULE_0__.bucketIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        let imports = ["import pandas as pd"];
        if (config.createFoldersIfNotExist) {
            imports.push("import os");
        }
        return imports;
    }
    generateComponentCode({ config, inputName }) {
        if (config.fileType === "csv") {
            const csvComponent = new _CsvFileOutput__WEBPACK_IMPORTED_MODULE_2__.CsvFileOutput();
            return csvComponent.generateComponentCode({ config, inputName });
        }
        else if (config.fileType === "json") {
            const jsonComponent = new _JsonFileOutput__WEBPACK_IMPORTED_MODULE_3__.JsonFileOutput();
            return jsonComponent.generateComponentCode({ config, inputName });
        }
        else if (config.fileType === "excel") {
            const excelComponent = new _ExcelFileOutput__WEBPACK_IMPORTED_MODULE_4__.ExcelFileOutput();
            return excelComponent.generateComponentCode({ config, inputName });
        }
        else if (config.fileType === "parquet") {
            const parquetComponent = new _ParquetFileOutput__WEBPACK_IMPORTED_MODULE_5__.ParquetFileOutput();
            return parquetComponent.generateComponentCode({ config, inputName });
        }
        else if (config.fileType === "xml") {
            const xmlComponent = new _XmlFileOutput__WEBPACK_IMPORTED_MODULE_6__.XmlFileOutput();
            return xmlComponent.generateComponentCode({ config, inputName });
        }
        return "";
    }
}


/***/ },

/***/ "./lib/components/outputs/files/XmlFileOutput.js"
/*!*******************************************************!*\
  !*** ./lib/components/outputs/files/XmlFileOutput.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XmlFileOutput: () => (/* binding */ XmlFileOutput)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/S3OptionsHandler */ "./lib/components/common/S3OptionsHandler.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../inputs/label */ "./lib/components/inputs/label.js");




class XmlFileOutput extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = { fileLocation: "local", connectionMethod: "env" };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "File Location",
                    id: "fileLocation",
                    options: [
                        { value: "local", label: "Local" },
                        { value: "s3", label: "S3" },
                    ],
                    advanced: true,
                },
                ..._common_S3OptionsHandler__WEBPACK_IMPORTED_MODULE_2__.S3OptionsHandler.getAWSFields(),
                {
                    type: "file",
                    label: "File path",
                    id: "filePath",
                    placeholder: "Type file name",
                    validation: "\\.xml$",
                    validationMessage: "This field expects a file with an xml extension such as output.xml.",
                },
                {
                    type: "boolean",
                    label: "Create folders if don't exist",
                    condition: { fileLocation: ["local"] },
                    id: "createFoldersIfNotExist",
                    advanced: true,
                },
                {
                    type: "keyvalue",
                    label: "Storage Options",
                    id: "csvOptions.storage_options",
                    condition: { fileLocation: ["s3"] },
                    advanced: true,
                },
            ],
        };
        // const description = "Use XML File Output to write or append data to a XML file locally or remotely (S3)."
        const description = "使用 XML 文件输出功能，可在本地或远程（如 S3）向 XML 文件中写入或追加数据。";
        super(
        // "XML File Output",
        "XML 文件输出", "xmlFileOutput", description, "pandas_df_output", [], _inputs_label__WEBPACK_IMPORTED_MODULE_3__.chineseLabel[3], _icons__WEBPACK_IMPORTED_MODULE_0__.fileXmlIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        let deps = [];
        deps.push("lxml");
        return deps;
    }
    provideImports({ config }) {
        // Adjust this based on the XML library you choose to use for output
        let imports = ["import xml.etree.ElementTree as ET", "import pandas as pd"];
        if (config.createFoldersIfNotExist) {
            imports.push("import os");
        }
        return imports; // Adjust if pandas isn't required
    }
    generateComponentCode({ config, inputName }) {
        // Create unique variable names based on the inputName for the XML output
        const xmlOutputVar = `${inputName}_xml_output`;
        const fileVar = `${inputName}_file`;
        const createFoldersCode = config.createFoldersIfNotExist
            ? `os.makedirs(os.path.dirname("${config.filePath}"), exist_ok=True)\n`
            : "";
        const code = `
# Export to XML file
${createFoldersCode}${xmlOutputVar} = ${inputName}.to_xml()
with open("${config.filePath}", "w") as ${fileVar}:
    ${fileVar}.write(${xmlOutputVar})
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/settings/Connection.js"
/*!***********************************************!*\
  !*** ./lib/components/settings/Connection.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Connection: () => (/* binding */ Connection)
/* harmony export */ });
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @amphi/pipeline-components-manager */ "webpack/sharing/consume/default/@amphi/pipeline-components-manager");
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/CopyOutlined.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var reactflow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactflow */ "webpack/sharing/consume/default/reactflow/reactflow");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");
var _a;







class Connection extends (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.PipelineComponent)() {
    constructor() {
        super(...arguments);
        // public _name = "Connection";
        this._name = "连接";
        this._id = "connection";
        this._type = "connection";
        this._category = _inputs_label__WEBPACK_IMPORTED_MODULE_6__.chineseLabel[4];
        // public _description = `Use Connection to set up a connection (e.g., credentials, database parameters, configuration file)
        // once for the pipeline, and reuse it across different components. This approach ensures that no credentials are stored
        // in the pipeline, as they can be retrieved from environment variables or a configuration files.`;
        this._description = `通过“连接”功能可一次性设置连接（例如，凭证、数据库参数、配置文件），
然后在不同的组件之间重复使用该连接。这种方式确保了在管道中不会存储任何凭证，
因为这些凭证可以从环境变量或配置文件中获取。`;
        this._icon = _icons__WEBPACK_IMPORTED_MODULE_5__.keyIcon;
        this._default = {};
        this._form = {};
    }
    UIComponent({ id, data, context, componentService, manager, commands, rendermimeRegistry, }) {
        const { setNodes, deleteElements, setViewport } = (0,reactflow__WEBPACK_IMPORTED_MODULE_4__.useReactFlow)();
        const store = (0,reactflow__WEBPACK_IMPORTED_MODULE_4__.useStoreApi)();
        const deleteNode = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)(() => {
            deleteElements({ nodes: [{ id }] });
        }, [id, deleteElements]);
        const zoomSelector = (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.createZoomSelector)();
        const showContent = (0,reactflow__WEBPACK_IMPORTED_MODULE_4__.useStore)(zoomSelector);
        const selector = (s) => ({
            nodeInternals: s.nodeInternals,
            edges: s.edges,
        });
        const { nodeInternals, edges } = (0,reactflow__WEBPACK_IMPORTED_MODULE_4__.useStore)(selector);
        const nodeId = id;
        const internals = { nodeInternals, edges, nodeId, componentService };
        const handleElement = react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.renderHandle, {
            type: Connection.Type,
            Handle: reactflow__WEBPACK_IMPORTED_MODULE_4__.Handle,
            Position: reactflow__WEBPACK_IMPORTED_MODULE_4__.Position,
            internals: internals,
        });
        const handleChange = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((evtTargetValue, field) => {
            (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.onChange)({ evtTargetValue, field, nodeId, store, setNodes });
        }, [nodeId, store, setNodes]);
        const isSelected = (0,reactflow__WEBPACK_IMPORTED_MODULE_4__.useStore)((state) => { var _b; return !!((_b = state.nodeInternals.get(id)) === null || _b === void 0 ? void 0 : _b.selected); });
        const [modalOpen, setModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
        return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), null,
            (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.renderComponentUI)({
                id: id,
                data: data,
                context: context,
                manager: manager,
                commands: commands,
                name: Connection.Name,
                ConfigForm: Connection.ConfigForm,
                configFormProps: {
                    // Provide props separately
                    nodeId: id,
                    data,
                    context,
                    componentService,
                    manager,
                    commands,
                    store,
                    setNodes,
                    handleChange,
                    modalOpen,
                    setModalOpen,
                },
                Icon: Connection.Icon,
                showContent: showContent,
                handle: handleElement,
                deleteNode: deleteNode,
                setViewport: setViewport,
                handleChange,
                isSelected,
            }),
            showContent && (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(reactflow__WEBPACK_IMPORTED_MODULE_4__.NodeToolbar, { isVisible: true, position: reactflow__WEBPACK_IMPORTED_MODULE_4__.Position.Bottom },
                react__WEBPACK_IMPORTED_MODULE_3___default().createElement("button", { onClick: () => setModalOpen(true) },
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_5__.settingsIcon.react, null))))));
    }
    provideImports({ config }) {
        const imports = ["import os"];
        if (config.fetchMethod === "envFile") {
            imports.push("from dotenv import load_dotenv");
        }
        return imports;
    }
    provideDependencies({ config }) {
        let deps = [];
        deps.push("python-dotenv");
        // console.log("python-dotenv");
        return deps;
    }
    generateComponentCode({ config }) {
        let code = `# Connection constants for ${config.connectionType}\n`;
        // If the fetch method is "envFile", load the environment variables from the specified file
        if (config.fetchMethod === "envFile") {
            code += `load_dotenv(dotenv_path="${config.environmentVariableFile}")\n\n`;
        }
        // Define the variables based on the fetch method
        config.variables.forEach((variable) => {
            let varName = variable.name;
            if (config.fetchMethod === "clear") {
                code += `${varName} = "${variable.value}"\n`;
            }
            else if (config.fetchMethod === "envVars") {
                if (variable.default) {
                    code += `${varName} = os.getenv('${varName}', '${variable.default}')\n`;
                }
                else {
                    code += `${varName} = os.getenv('${varName}')\n`;
                }
            }
            else if (config.fetchMethod === "envFile") {
                if (variable.default) {
                    code += `${varName} = os.getenv('${varName}', '${variable.default}')\n`;
                }
                else {
                    code += `${varName} = os.getenv('${varName}')\n`;
                }
            }
        });
        code += "\n";
        return code;
    }
}
_a = Connection;
Connection.ConfigForm = ({ nodeId, data, context, componentService, manager, commands, store, setNodes, handleChange, modalOpen, setModalOpen, }) => {
    const EditableContext = react__WEBPACK_IMPORTED_MODULE_3___default().createContext(null);
    const EditableRow = ({ index, ...props }) => {
        const [form] = antd__WEBPACK_IMPORTED_MODULE_2__.Form.useForm();
        return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form, { form: form, component: false },
            react__WEBPACK_IMPORTED_MODULE_3___default().createElement(EditableContext.Provider, { value: form },
                react__WEBPACK_IMPORTED_MODULE_3___default().createElement("tr", { ...props }))));
    };
    const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, required, ...restProps }) => {
        const [editing, setEditing] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
        const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
        const form = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(EditableContext);
        (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
            var _b;
            if (editing) {
                (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.focus();
            }
        }, [editing]);
        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({ [dataIndex]: record[dataIndex] });
        };
        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({ ...record, ...values });
            }
            catch (errInfo) {
                console.error("Save failed:", errInfo);
            }
        };
        let childNode = children;
        if (editable) {
            childNode = editing ? (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, { style: { margin: 0 }, name: dataIndex, rules: required
                    ? [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]
                    : [] },
                react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Input, { ref: inputRef, onPressEnter: save, onBlur: save, onKeyDown: (e) => e.stopPropagation(), autoComplete: "off" }))) : (react__WEBPACK_IMPORTED_MODULE_3___default().createElement("div", { className: "editable-cell-value-wrap", style: {
                    paddingRight: 24,
                    minHeight: "20px",
                    width: "100%",
                    display: "inline-block",
                }, onClick: () => toggleEdit() }, children));
        }
        return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement("td", { ...restProps },
            react__WEBPACK_IMPORTED_MODULE_3___default().createElement("div", { onDoubleClick: (e) => e.stopPropagation() }, childNode)));
    };
    const [dataSource, setDataSource] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(data.variables || []);
    const [connections, setConnections] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const [selectedConnection, setSelectedConnection] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({
        label: data.connectionType,
        value: data.connectionType,
    });
    const [connectionName, setConnectionName] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(data.connectionName || "");
    // const [fetchMethod, setFetchMethod] = useState<Option>(data.fetchMethod || "clear" );
    const fetchMethod = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => data.fetchMethod || "clear", [data.fetchMethod]);
    if (!data.fetchMethod) {
        handleChange(fetchMethod, "fetchMethod");
    }
    const [envVarFile, setEnvVarFile] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(data.envVarFile || "");
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
        handleChange(dataSource, "variables");
    }, [dataSource]);
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const defaultColumns = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => [
        {
            title: (react__WEBPACK_IMPORTED_MODULE_3___default().createElement((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), null,
                "Name",
                dataSource.length > 0 && (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, { title: () => {
                        const variables = dataSource
                            .map((item) => `${item.name}=""\n`)
                            .join("");
                        return `Copy the following variables:\n${variables}`;
                    }, trigger: "hover" },
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__["default"], { style: { marginLeft: 8, cursor: "pointer" }, onClick: async () => {
                            const variables = dataSource
                                .map((item) => `${item.name}=""\n`)
                                .join("");
                            try {
                                await navigator.clipboard.writeText(variables);
                                // Temporarily change the tooltip to "Copied to clipboard"
                                document.querySelector(".ant-tooltip-inner").textContent = "Copied to clipboard";
                                setTimeout(() => {
                                    document.querySelector(".ant-tooltip-inner").textContent = `Copy the following variables:\n${variables}`;
                                }, 2000); // Change back after 2 seconds
                            }
                            catch (err) {
                                console.error("Could not copy text: ", err);
                            }
                        } }))))),
            dataIndex: "name",
            width: "30%",
            editable: true,
            required: true,
        },
        {
            title: "Value",
            dataIndex: "value",
            width: "40%",
            editable: true,
            required: false,
        },
        {
            title: "Default",
            dataIndex: "default",
            width: "30%",
            editable: true,
            required: false,
        },
        /*
      {
        title: '',
        dataIndex: 'operation',
        render: (_, record) =>
          dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <DeleteOutlined />
            </Popconfirm>
          ) : null,
      }
      */
    ], [dataSource]);
    const handleSave = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
    }, [dataSource]);
    const components = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => ({
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    }), []);
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                required: col.required,
                handleSave,
            }),
        };
    });
    const handleSelectChange = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((value) => {
        var _b;
        setSelectedConnection(value);
        const selectedConnectionFields = ((_b = connections.find((conn) => conn.value === value.value)) === null || _b === void 0 ? void 0 : _b.fields) || [];
        handleChange(value.value, "connectionType");
        if (!data.customTitle) {
            handleChange(value.value + " Connection", "customTitle");
        }
        handleChange(value.value, "connectionName");
        setConnectionName(value.value);
        setDataSource(selectedConnectionFields.map((field) => ({
            key: field.id,
            name: field.label.includes("_")
                ? field.label
                : _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.PipelineService.formatVarName(value.value + "_" + field.label),
            value: "",
            default: "",
        })));
    }, [connections, data.customTitle, handleChange]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
        const extractedConnections = extractConnections(componentService);
        setConnections(extractedConnections.map((conn) => ({
            label: conn.connection,
            value: conn.connection,
            fields: conn.fields,
        })));
    }, [componentService]);
    const extractConnections = (componentService) => {
        const components = componentService.getComponents();
        const connectionMap = {};
        components.forEach((component) => {
            if (component._form && component._form.fields) {
                component._form.fields.forEach((field) => {
                    if (field.connection && !field.ignoreConnection) {
                        if (!connectionMap[field.connection]) {
                            connectionMap[field.connection] = [];
                        }
                        const existingField = connectionMap[field.connection].find((f) => f.id === field.id);
                        if (!existingField) {
                            const newField = {
                                id: field.id,
                                label: field.connectionVariableName || field.label,
                            };
                            connectionMap[field.connection].push(newField);
                        }
                    }
                });
            }
        });
        return Object.keys(connectionMap).map((connection) => ({
            connection,
            fields: connectionMap[connection],
        }));
    };
    const connectionNameTooltip = "Provide a name to the connection to describe and differentiate it with other connections.";
    return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.ConfigProvider, { theme: {
                token: {
                    colorPrimary: "#5F9B97",
                },
            } },
            react__WEBPACK_IMPORTED_MODULE_3___default().createElement("div", { className: "flex justify-center mt-1 pt-1.5 space-x-4" },
                react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Space, { direction: "vertical", size: "middle" },
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Space.Compact, null,
                        react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, { label: "Connection Name", tooltip: connectionNameTooltip },
                            react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.InputRegular, { field: {
                                    type: "input",
                                    label: "Submission",
                                    id: "connectionName",
                                    placeholder: "Optional name",
                                }, handleChange: (value) => {
                                    handleChange(value, "connectionName");
                                    setConnectionName(value);
                                }, context: context, advanced: false, value: connectionName }))))),
            react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, { title: _a.Name, open: modalOpen, onOk: () => setModalOpen(false), onCancel: () => setModalOpen(false), width: 1000, footer: (_, { OkBtn }) => (react__WEBPACK_IMPORTED_MODULE_3___default().createElement((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), null,
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement(OkBtn, null))) },
                react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form, { layout: "vertical", size: "small" },
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, { label: "Select connection type" },
                        react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Select, { showSearch: true, labelInValue: true, className: "nodrag", onChange: handleSelectChange, value: selectedConnection, placeholder: "Select connection", options: connections.map((conn) => ({
                                label: conn.label,
                                value: conn.value,
                            })), size: "middle" })),
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement("br", null),
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, { label: "Connection Name", tooltip: connectionNameTooltip },
                        react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.InputRegular, { field: {
                                type: "input",
                                id: "connectionName",
                                placeholder: "Optional name",
                                label: "",
                            }, handleChange: (value) => {
                                handleChange(value, "connectionName");
                                setConnectionName(value);
                            }, context: context, advanced: true, value: connectionName })),
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement("br", null),
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, { label: "Values to fetch from", tooltip: "Select the method used to retrieve the connection information. When choosing from an environment variables file, please specify the file in the file input below." },
                        react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.SelectRegular, { field: {
                                type: "select",
                                id: "fetchMethod",
                                label: "Values to fetch from",
                                placeholder: "Select method",
                                options: [
                                    {
                                        value: "clear",
                                        label: "Values in clear (not recommended)",
                                    },
                                    {
                                        value: "envVars",
                                        label: "Environment Variables (provided using Env. Variables component)",
                                    },
                                    {
                                        value: "envFile",
                                        label: "Environment Variables from .env file (recommended)",
                                    },
                                ],
                            }, handleChange: (value) => {
                                handleChange(value, "fetchMethod");
                                if (value === "envVars" || value === "envFile") {
                                    setDataSource((prevDataSource) => prevDataSource.map((item) => ({
                                        ...item,
                                        value: `{os.getenv('${item.name}')}`,
                                    })));
                                }
                                else {
                                    setDataSource((prevDataSource) => prevDataSource.map((item) => ({
                                        ...item,
                                        value: "",
                                    })));
                                }
                            }, advanced: true, defaultValue: fetchMethod })),
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement("br", null),
                    data.fetchMethod === "envFile" && (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, { label: "Environment Variables File (.env)", tooltip: "If the environment file is the selected method, specify the file from which to extract the connection information. The file is a dot env (.env) file which consists of VARIABLE='value', one per line. You can use the helper to copy-paste the list of variable names below next to the Name column title." },
                        react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.InputFile, { field: {
                                type: "input",
                                id: "environmentVariableFile",
                                placeholder: "config.env",
                                label: "",
                            }, handleChange: handleChange, context: context, advanced: true, value: envVarFile, manager: manager }))),
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement("br", null),
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, { label: "Variables" },
                        react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Table, { components: components, rowClassName: () => "editable-row", bordered: true, dataSource: dataSource, columns: columns })))))));
};



/***/ },

/***/ "./lib/components/settings/EnvFile.js"
/*!********************************************!*\
  !*** ./lib/components/settings/EnvFile.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EnvFile: () => (/* binding */ EnvFile)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @amphi/pipeline-components-manager */ "webpack/sharing/consume/default/@amphi/pipeline-components-manager");
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reactflow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactflow */ "webpack/sharing/consume/default/reactflow/reactflow");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");
var _a;






class EnvFile extends (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_1__.PipelineComponent)() {
    constructor() {
        super(...arguments);
        // public _name = "Env. File";
        this._name = "环境文件";
        this._id = "envFile";
        this._type = "env_variables";
        this._category = _inputs_label__WEBPACK_IMPORTED_MODULE_5__.chineseLabel[4];
        // public _description = "Use Env. Variables to define environment variable names for use in the pipeline. You can also assign a value directly and set a default value. It is not recommended for credentials or sensitive data unless you fully understand the implications."
        this._description = "使用环境变量来定义在管道中使用的环境变量名称。您还可以直接指定一个值，并设置默认值。除非您完全了解其影响，否则不建议将凭证或敏感数据设置为默认值。";
        this._icon = _icons__WEBPACK_IMPORTED_MODULE_3__.fileVariableIcon;
        this._default = {};
        this._form = {};
    }
    UIComponent({ id, data, context, componentService, manager, commands, rendermimeRegistry, settings, }) {
        const { setNodes, deleteElements, setViewport } = (0,reactflow__WEBPACK_IMPORTED_MODULE_2__.useReactFlow)();
        const store = (0,reactflow__WEBPACK_IMPORTED_MODULE_2__.useStoreApi)();
        const deleteNode = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            deleteElements({ nodes: [{ id }] });
        }, [id, deleteElements]);
        const zoomSelector = (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_1__.createZoomSelector)();
        const showContent = (0,reactflow__WEBPACK_IMPORTED_MODULE_2__.useStore)(zoomSelector);
        const selector = (s) => ({
            nodeInternals: s.nodeInternals,
            edges: s.edges,
        });
        const { nodeInternals, edges } = (0,reactflow__WEBPACK_IMPORTED_MODULE_2__.useStore)(selector);
        const nodeId = id;
        const internals = { nodeInternals, edges, nodeId, componentService };
        // Create the handle element
        const handleElement = react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_1__.renderHandle, {
            type: EnvFile.Type,
            Handle: reactflow__WEBPACK_IMPORTED_MODULE_2__.Handle,
            Position: reactflow__WEBPACK_IMPORTED_MODULE_2__.Position,
            internals: internals,
        });
        const handleChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((evtTargetValue, field) => {
            (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_1__.onChange)({ evtTargetValue, field, nodeId, store, setNodes });
        }, [nodeId, store, setNodes]);
        // Selector to determine if the node is selected
        const isSelected = (0,reactflow__WEBPACK_IMPORTED_MODULE_2__.useStore)((state) => { var _b; return !!((_b = state.nodeInternals.get(id)) === null || _b === void 0 ? void 0 : _b.selected); });
        const [modalOpen, setModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
            (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_1__.renderComponentUI)({
                id: id,
                data: data,
                context: context,
                manager: manager,
                commands: commands,
                name: EnvFile.Name,
                ConfigForm: EnvFile.ConfigForm,
                configFormProps: {
                    // Provide props separately
                    nodeId: id,
                    data,
                    context,
                    componentService,
                    manager,
                    commands,
                    store,
                    setNodes,
                    handleChange,
                    modalOpen,
                    setModalOpen,
                },
                Icon: EnvFile.Icon,
                showContent: showContent,
                handle: handleElement,
                deleteNode: deleteNode,
                setViewport: setViewport,
                handleChange,
                isSelected,
            }),
            showContent && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(reactflow__WEBPACK_IMPORTED_MODULE_2__.NodeToolbar, { isVisible: true, position: reactflow__WEBPACK_IMPORTED_MODULE_2__.Position.Bottom },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { onClick: () => setModalOpen(true) },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_3__.settingsIcon.react, null))))));
    }
    provideImports({ config }) {
        return ["from dotenv import load_dotenv"];
    }
    provideDependencies({ config }) {
        let deps = [];
        deps.push("python-dotenv");
        return deps;
    }
    generateComponentCode({ config }) {
        let code = `
# Load environment variables from ${config.envVarFile}
load_dotenv(dotenv_path="${config.envVarFile}")
`;
        code += "\n";
        return code;
    }
}
_a = EnvFile;
EnvFile.ConfigForm = ({ nodeId, data, context, componentService, manager, commands, store, setNodes, handleChange, modalOpen, setModalOpen, }) => {
    // Define your default config
    const EditableContext = react__WEBPACK_IMPORTED_MODULE_0___default().createContext(null);
    const EditableRow = ({ index, ...props }) => {
        const [form] = antd__WEBPACK_IMPORTED_MODULE_4__.Form.useForm();
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.Form, { form: form, component: false },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(EditableContext.Provider, { value: form },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", { ...props }))));
    };
    const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, required, ...restProps }) => {
        const [editing, setEditing] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
        const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
        const form = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EditableContext);
        (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
            var _b;
            if (editing) {
                (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.focus();
            }
        }, [editing]);
        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({ [dataIndex]: record[dataIndex] });
        };
        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({ ...record, ...values });
            }
            catch (errInfo) {
                console.error("Save failed:", errInfo);
            }
        };
        let childNode = children;
        if (editable) {
            childNode = editing ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.Form.Item, { style: { margin: 0 }, name: dataIndex, rules: required
                    ? [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]
                    : [] },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.Input, { ref: inputRef, onPressEnter: save, onBlur: save, onKeyDown: (e) => e.stopPropagation(), autoComplete: "off" }))) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "editable-cell-value-wrap", style: {
                    paddingRight: 24,
                    minHeight: "20px",
                    width: "100%",
                    display: "inline-block",
                }, onClick: () => toggleEdit() }, children));
        }
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", { ...restProps },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { onDoubleClick: (e) => e.stopPropagation() }, childNode)));
    };
    const [dataSource, setDataSource] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(data.variables || []);
    const [envVarFile, setEnvVarFile] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(data.envVarFile || "");
    const [loadings, setLoadings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        handleChange(dataSource, "variables");
    }, [dataSource]);
    const [count, setCount] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(dataSource.length || 0);
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const defaultColumns = [
        {
            title: "Name",
            dataIndex: "name",
            width: "50%",
            editable: false,
            required: true,
        },
        {
            title: "Default",
            dataIndex: "default",
            width: "50%",
            editable: true,
            required: false,
        },
    ];
    const retrieveEnvVariablesFromFile = () => {
        setLoadings(true);
        // Define the request to retrieve environment variables
        const code = `
    !pip install --quiet python-dotenv --disable-pip-version-check
    from dotenv import dotenv_values
    
    env_vars = dotenv_values("${data.envVarFile || "config.env"}")
    formatted_output = ", ".join([f"{k} ({v})" for k, v in env_vars.items()])
    print(formatted_output)
    `;
        const future = context.sessionContext.session.kernel.requestExecute({
            code: code,
        });
        future.onReply = (reply) => {
            if (reply.content.status == "ok") {
                console.log("OK");
            }
            else {
                console.log("Error or abort");
                setLoadings(false);
            }
        };
        future.onIOPub = (msg) => {
            if (msg.header.msg_type === "stream") {
                const streamMsg = msg;
                const output = streamMsg.content.text;
                const regex = /([^\s,]+)\s+\(((?:[^()]+|\([^)]*\))*)\)/g;
                const newItems = [];
                let match;
                while ((match = regex.exec(output)) !== null) {
                    const [_, name, value] = match;
                    newItems.push({
                        key: name,
                        name: name,
                        value: value,
                    });
                }
                setDataSource((items) => {
                    const existingKeys = new Set(newItems.map((item) => item.key));
                    const filteredItems = items.filter((item) => existingKeys.has(item.key));
                    const uniqueItems = newItems.filter((newItem) => !filteredItems.some((item) => item.key === newItem.key));
                    return [...filteredItems, ...uniqueItems];
                });
                setLoadings(false);
            }
            else if (msg.header.msg_type === "error") {
                setLoadings(false);
                const errorMsg = msg;
                const errorOutput = errorMsg.content;
                console.error(`Received error: ${errorOutput.ename}: ${errorOutput.evalue}`);
            }
        };
    };
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                required: col.required,
                handleSave,
            }),
        };
    });
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.ConfigProvider, { theme: {
                token: {
                    // Seed Token
                    colorPrimary: "#5F9B97",
                },
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.Form, { layout: "vertical", size: "small" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.Form.Item, { label: "File (.env)" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_1__.InputFile, { field: {
                            type: "input",
                            id: "environmentVariableFile",
                            placeholder: "config.env",
                            label: "",
                        }, handleChange: (value) => {
                            handleChange(value, "envVarFile");
                            setEnvVarFile(value);
                        }, context: context, advanced: false, value: envVarFile, manager: manager })),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.Modal, { title: "Env. Variables File (.env)", centered: true, open: modalOpen, onOk: () => setModalOpen(false), onCancel: () => setModalOpen(false), width: 800, footer: (_, { OkBtn }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(OkBtn, null))) },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.Form, { layout: "vertical" },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.Form.Item, { label: "Environment Variables File (.env)", tooltip: "Specify the file from which to extract the connection information. The file is a dot env (.env) file which consists of VARIABLE='value', one per line. You can use the helper to copy-paste the list of variable names below next to the Name column title." },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_1__.InputFile, { field: {
                                        type: "input",
                                        id: "environmentVariableFile",
                                        placeholder: "config.env",
                                        label: "",
                                    }, handleChange: (value) => {
                                        handleChange(value, "envVarFile");
                                        setEnvVarFile(value);
                                    }, context: context, advanced: true, value: envVarFile, manager: manager })),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.Button, { onClick: retrieveEnvVariablesFromFile, type: "primary", loading: loadings, style: { marginBottom: 16 } }, "Retrieve Environment Variables from .env file"),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.Table, { components: components, rowClassName: () => "editable-row", bordered: true, dataSource: dataSource, columns: columns }))))))));
};



/***/ },

/***/ "./lib/components/settings/EnvVariables.js"
/*!*************************************************!*\
  !*** ./lib/components/settings/EnvVariables.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EnvVariables: () => (/* binding */ EnvVariables)
/* harmony export */ });
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @amphi/pipeline-components-manager */ "webpack/sharing/consume/default/@amphi/pipeline-components-manager");
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/DeleteOutlined.js");
/* harmony import */ var reactflow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactflow */ "webpack/sharing/consume/default/reactflow/reactflow");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");
var _a;







class EnvVariables extends (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.PipelineComponent)() {
    constructor() {
        super(...arguments);
        // public _name = "Env. Variables";
        this._name = "环境变量";
        this._id = "envVariables";
        this._type = "env_variables";
        this._category = _inputs_label__WEBPACK_IMPORTED_MODULE_6__.chineseLabel[4];
        // public _description = "Use Env. Variables File to retrieve environment variables from configuration files. This is the recommended approach for handling credentials or sensitive data that should not be exposed in plain text within the pipeline."
        this._description = "使用环境变量文件从配置文件中获取环境变量。这是处理不应以明文形式暴露在管道中的凭证或敏感数据的推荐方法。";
        this._icon = _icons__WEBPACK_IMPORTED_MODULE_5__.variableIcon;
        this._default = {};
        this._form = {};
    }
    UIComponent({ id, data, context, componentService, manager, commands, rendermimeRegistry, settings, }) {
        const { setNodes, deleteElements, setViewport } = (0,reactflow__WEBPACK_IMPORTED_MODULE_4__.useReactFlow)();
        const store = (0,reactflow__WEBPACK_IMPORTED_MODULE_4__.useStoreApi)();
        const deleteNode = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
            deleteElements({ nodes: [{ id }] });
        }, [id, deleteElements]);
        const zoomSelector = (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.createZoomSelector)();
        const showContent = (0,reactflow__WEBPACK_IMPORTED_MODULE_4__.useStore)(zoomSelector);
        const selector = (s) => ({
            nodeInternals: s.nodeInternals,
            edges: s.edges,
        });
        const { nodeInternals, edges } = (0,reactflow__WEBPACK_IMPORTED_MODULE_4__.useStore)(selector);
        const nodeId = id;
        const internals = { nodeInternals, edges, nodeId, componentService };
        // Create the handle element
        const handleElement = react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.renderHandle, {
            type: EnvVariables.Type,
            Handle: reactflow__WEBPACK_IMPORTED_MODULE_4__.Handle,
            Position: reactflow__WEBPACK_IMPORTED_MODULE_4__.Position,
            internals: internals,
        });
        const handleChange = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((evtTargetValue, field) => {
            (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.onChange)({ evtTargetValue, field, nodeId, store, setNodes });
        }, [nodeId, store, setNodes]);
        // Selector to determine if the node is selected
        const isSelected = (0,reactflow__WEBPACK_IMPORTED_MODULE_4__.useStore)((state) => { var _b; return !!((_b = state.nodeInternals.get(id)) === null || _b === void 0 ? void 0 : _b.selected); });
        const [modalOpen, setModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
        return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null,
            (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.renderComponentUI)({
                id: id,
                data: data,
                context: context,
                manager: manager,
                commands: commands,
                name: EnvVariables.Name,
                ConfigForm: EnvVariables.ConfigForm,
                configFormProps: {
                    // Provide props separately
                    nodeId: id,
                    data,
                    context,
                    componentService,
                    manager,
                    commands,
                    store,
                    setNodes,
                    handleChange,
                    modalOpen,
                    setModalOpen,
                },
                Icon: EnvVariables.Icon,
                showContent: showContent,
                handle: handleElement,
                deleteNode: deleteNode,
                setViewport: setViewport,
                handleChange,
                isSelected,
            }),
            showContent && (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(reactflow__WEBPACK_IMPORTED_MODULE_4__.NodeToolbar, { isVisible: true, position: reactflow__WEBPACK_IMPORTED_MODULE_4__.Position.Bottom },
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", { onClick: () => setModalOpen(true) },
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_5__.settingsIcon.react, null))))));
    }
    provideImports({ config }) {
        return ["import os"];
    }
    generateComponentCode({ config }) {
        let code = ``;
        config.variables.forEach((variable) => {
            // Initialize all environment variables to an empty string or the default value if provided
            if (variable.value) {
                code += `os.environ["${variable.name}"] = "${variable.value}"\n`;
            }
        });
        code += "\n";
        return code;
    }
}
_a = EnvVariables;
EnvVariables.ConfigForm = ({ nodeId, data, context, componentService, manager, commands, store, setNodes, handleChange, modalOpen, setModalOpen, }) => {
    // Define your default config
    const EditableContext = react__WEBPACK_IMPORTED_MODULE_1___default().createContext(null);
    const EditableRow = ({ index, ...props }) => {
        const [form] = antd__WEBPACK_IMPORTED_MODULE_2__.Form.useForm();
        return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form, { form: form, component: false },
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(EditableContext.Provider, { value: form },
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement("tr", { ...props }))));
    };
    const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, required, ...restProps }) => {
        const [editing, setEditing] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
        const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
        const form = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(EditableContext);
        (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            var _b;
            if (editing) {
                (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.focus();
            }
        }, [editing]);
        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({ [dataIndex]: record[dataIndex] });
        };
        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({ ...record, ...values });
            }
            catch (errInfo) {
                console.error("Save failed:", errInfo);
            }
        };
        let childNode = children;
        if (editable) {
            childNode = editing ? (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, { style: { margin: 0 }, name: dataIndex, rules: required
                    ? [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]
                    : [] },
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Input, { ref: inputRef, onPressEnter: save, onBlur: save, onKeyDown: (e) => e.stopPropagation(), autoComplete: "off" }))) : (react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "editable-cell-value-wrap", style: {
                    paddingRight: 24,
                    minHeight: "20px",
                    width: "100%",
                    display: "inline-block",
                }, onClick: () => toggleEdit() }, children));
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement("td", { ...restProps },
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { onDoubleClick: (e) => e.stopPropagation() }, childNode)));
    };
    const [dataSource, setDataSource] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(data.variables || []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        handleChange(dataSource, "variables");
    }, [dataSource]);
    const [count, setCount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(dataSource.length || 0);
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const defaultColumns = [
        {
            title: "Name",
            dataIndex: "name",
            width: "30%",
            editable: true,
            required: true,
        },
        {
            title: "Value",
            dataIndex: "value",
            width: "40%",
            editable: true,
            required: false,
        },
        {
            title: "Default",
            dataIndex: "default",
            width: "30%",
            editable: true,
            required: false,
        },
        {
            title: "",
            dataIndex: "operation",
            render: (_, record) => {
                const typedRecord = record; // ✅ Ensure TypeScript recognizes `key`
                return dataSource.length >= 1 ? (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Popconfirm, { title: "Sure to delete?", onConfirm: () => handleDelete(typedRecord.key) },
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__["default"], null))) : null;
            },
        },
    ];
    const handleAdd = () => {
        const newData = {
            key: count,
            name: `ENV_${count}`,
            value: "",
            default: ``,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                required: col.required,
                handleSave,
            }),
        };
    });
    const { Paragraph, Text } = antd__WEBPACK_IMPORTED_MODULE_2__.Typography;
    const info = (react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null,
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Text, null, "Use Env. Variables in components by clicking on the braces icon in inputs fields.")));
    return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.ConfigProvider, { theme: {
                token: {
                    // Seed Token
                    colorPrimary: "#5F9B97",
                },
            } },
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form, { layout: "vertical", size: "small" },
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "flex justify-center mt-1 pt-1.5 space-x-4" },
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Space, { direction: "vertical", size: "middle" },
                        react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Space.Compact, null,
                            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Paragraph, { style: { padding: "5px" } }, info)))),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, { title: _a.Name, centered: true, open: modalOpen, onOk: () => setModalOpen(false), onCancel: () => setModalOpen(false), width: 800, footer: (_, { OkBtn }) => (react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null,
                        react__WEBPACK_IMPORTED_MODULE_1___default().createElement(OkBtn, null))) },
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form, { layout: "vertical" },
                        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Paragraph, { style: { padding: "5px" } }, info),
                            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Button, { onClick: handleAdd, type: "primary", style: { marginBottom: 16 } }, "Add environment variable"),
                            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Table, { components: components, rowClassName: () => "editable-row", bordered: true, dataSource: dataSource, columns: columns }))))))));
};



/***/ },

/***/ "./lib/components/transforms/Aggregate.js"
/*!************************************************!*\
  !*** ./lib/components/transforms/Aggregate.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Aggregate: () => (/* binding */ Aggregate)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class Aggregate extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {};
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "columns",
                    label: "Group by",
                    id: "groupByColumns",
                    placeholder: "Default: all columns",
                },
                {
                    type: "keyvalueColumnsSelect",
                    label: "Operations",
                    id: "columnsOperations",
                    placeholder: "Select column",
                    options: [
                        {
                            value: "min",
                            label: "Min",
                            tooltip: "Returns the minimum value in the group.",
                        },
                        {
                            value: "max",
                            label: "Max",
                            tooltip: "Returns the maximum value in the group.",
                        },
                        {
                            value: "sum",
                            label: "Sum",
                            tooltip: "Returns the sum of all values in the group.",
                        },
                        {
                            value: "mean",
                            label: "Mean",
                            tooltip: "Returns the average value of the group.",
                        },
                        {
                            value: "count",
                            label: "Count",
                            tooltip: "Counts the number of non-null entries.",
                        },
                        {
                            value: "nunique",
                            label: "Distinct Count",
                            tooltip: "Returns the number of distinct elements.",
                        },
                        {
                            value: "first",
                            label: "First",
                            tooltip: "Returns the first value in the group.",
                        },
                        {
                            value: "last",
                            label: "Last",
                            tooltip: "Returns the last value in the group.",
                        },
                        {
                            value: "median",
                            label: "Median",
                            tooltip: "Returns the median value in the group.",
                        },
                        {
                            value: "std",
                            label: "Standard Deviation",
                            tooltip: "Returns the standard deviation of the group.",
                        },
                        {
                            value: "var",
                            label: "Variance",
                            tooltip: "Returns the variance of the group.",
                        },
                        {
                            value: "prod",
                            label: "Product",
                            tooltip: "Returns the product of all values in the group.",
                        },
                    ],
                },
            ],
        };
        // const description = "Use Aggregate to perform various summary calculations such as sum, count, min/max, average, mean/median, count and more.";
        const description = "使用“聚合”功能可以执行各种汇总计算，例如求和、计数、最小值/最大值、平均值、均值/中位数、计数等等。";
        super(
        // "Aggregate Rows",
        "聚合行", "aggregate", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.aggregateIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return [];
    }
    generateComponentCode({ config, inputName, outputName }) {
        var _a;
        //conditional because can be empty
        const groupColumns = ((_a = config.groupByColumns) === null || _a === void 0 ? void 0 : _a.map((col) => col.value)) || [];
        // Start constructing the aggregation arguments dynamically
        let aggArgs = "";
        if (config.columnsOperations && config.columnsOperations.length > 0) {
            config.columnsOperations.forEach((op, index) => {
                // Determine how to reference the column based on 'named'
                const columnReference = op.key.named
                    ? `'${op.key.value}'`
                    : op.key.value;
                const operation = op.value.value;
                const columnName = op.key.named ? op.key.value : `col${op.key.value}`;
                const operationName = `${columnName}_${operation}`;
                const sanitizeColumnName = (name) => name.replace(/[^a-zA-Z0-9_]/g, "_");
                const operationNameReference = sanitizeColumnName(operationName);
                // Construct each aggregation argument
                aggArgs += `${operationNameReference}=(${columnReference}, '${operation}')`;
                if (index < config.columnsOperations.length - 1) {
                    aggArgs += ", ";
                }
            });
        }
        // Generate groupby code
        let code = "";
        if (groupColumns.length > 0) {
            code += `
${outputName} = ${inputName}.groupby([`;
            // Add group columns
            groupColumns.forEach((col, index) => {
                code += `"${col}"`;
                if (index < groupColumns.length - 1) {
                    // Avoid trailing comma
                    code += ",";
                }
            });
            // Complete the aggregation function call
            code += `]).agg(${aggArgs}).reset_index()\n`;
        }
        else {
            // No grouping, apply named aggregations directly with an index and then destroy it
            code += `

# replace empty or none name
${inputName}.columns = [f"Unnamed_{i}" if col is None or col == "" else col for i, col in enumerate(${inputName}.columns)]
# generate dynamically the name based on the column list (so that we're sure it's not in the list)
column_name_concat = "_".join(${inputName}.columns)

# aggregation with the dummy index
${outputName} = ${inputName}.assign(**{column_name_concat: 0}).groupby(column_name_concat).agg(${aggArgs}).reset_index(drop=True)
`;
        }
        return code;
    }
}


/***/ },

/***/ "./lib/components/transforms/CompareDataframes.js"
/*!********************************************************!*\
  !*** ./lib/components/transforms/CompareDataframes.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CompareDataframes: () => (/* binding */ CompareDataframes)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class CompareDataframes extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            select_execution_engine: "pandas",
            select_comparison_mode: "data",
            select_column_mismatch: "intersect",
            boolean_index_data_for_compare: false,
            boolean_index_metadata_for_compare: true,
            boolean_check_forcount: true,
            selectTimestampDateTimeRound: "None",
            selectcol_key_fields: [],
            selectcol_ignore_fields: [],
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "select",
                    label: "Execution Engine",
                    id: "select_execution_engine",
                    //placeholder: "Default: Pandas", (no placeholder because defined in defaultConfig)
                    options: [
                        {
                            value: "pandas",
                            label: "Pandas",
                            tooltip: "Mature, easy-to-use, great for small-to-medium datasets.",
                        },
                        {
                            value: "polars",
                            label: "Polars",
                            tooltip: "Fast, memory-efficient, great for large-scale in-memory analytics.",
                        },
                        {
                            value: "duckdb",
                            label: "DuckDB",
                            tooltip: "SQL-based, excellent for large datasets",
                        },
                    ],
                    advanced: true,
                },
                {
                    type: "select",
                    label: "Comparison mode",
                    id: "select_comparison_mode",
                    //placeholder: "Default: Do nothing", (no placeholder because defined in defaultConfig)
                    options: [
                        {
                            value: "data",
                            label: "Compare rows of both inputs, output is row-level",
                            tooltip: "Compare rows of both inputs",
                        },
                        {
                            value: "count_data",
                            label: "Compare rows of both inputs, output the number of difference",
                            tooltip: "Compare rows of both inputs",
                        },
                        {
                            value: "field_data",
                            label: "Compare rows of both inputs, output fields with their data in difference",
                            tooltip: "Compare rows of both inputs (keys required)",
                        },
                        {
                            value: "differing_fields",
                            label: "Compare rows of both inputs, output list of fields where there is a difference",
                            tooltip: "Compare rows of both inputs (keys required)",
                        },
                        {
                            value: "metadata",
                            label: "Compare columns of both inputs, output one row by column with difference",
                            tooltip: "Compare columns of both inputs (name, type,...)",
                        },
                        {
                            value: "metadata+metrics",
                            label: "Compare columns of both inputs+metrics of each column, output one row by column with difference",
                            tooltip: "Compare columns of both inputs (name, type,min, etc...)",
                        },
                    ],
                    advanced: true,
                },
                {
                    type: "select",
                    label: "When columns differ in dataframe",
                    id: "select_column_mismatch",
                    //placeholder: "Default: suffix_right", (no placeholder because defined in defaultConfig)
                    options: [
                        {
                            value: "intersect",
                            label: "Take only common columns",
                            tooltip: "Take only common columns",
                        },
                        {
                            value: "strict",
                            label: "Raise an error",
                            tooltip: "Raise an error",
                        },
                    ],
                    advanced: true,
                },
                //for V2
                {
                    type: "columns",
                    label: "Key Fields",
                    id: "selectcol_key_fields",
                    placeholder: "Column name",
                    condition: {
                        select_comparison_mode: ["field_data", "differing_fields"],
                    },
                    inputNb: 1,
                    advanced: true,
                },
                {
                    type: "columns",
                    label: "Fields to be ignored",
                    id: "selectcol_ignore_fields",
                    placeholder: "Column name",
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Rows order to be considered",
                    id: "boolean_index_data_for_compare",
                    condition: {
                        select_comparison_mode: [
                            "data",
                            "count_data",
                            "field_data",
                            "differing_fields",
                        ],
                    },
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Columns order to be considered",
                    id: "boolean_index_metadata_for_compare",
                    condition: {
                        select_comparison_mode: ["metadata", "metadata+metrics"],
                    },
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Check for equal count",
                    id: "boolean_check_forcount",
                    condition: { select_comparison_mode: ["data", "count_data"] },
                    advanced: true,
                },
                {
                    type: "inputNumber",
                    tooltip: "Number of decimal for rounding (nothing=No rounding)",
                    label: "Decimal Rounding",
                    id: "inputNumberDecimalRound",
                    min: 0,
                    max: 20,
                    advanced: true,
                },
                {
                    type: "select",
                    label: "Timestamp/DateTime Rounding",
                    id: "selectTimestampDateTimeRound",
                    placeholder: "Error: raise an Exception when a bad line is encountered",
                    options: [
                        { value: "None", label: "None", tooltip: "No rounding" },
                        { value: "s", label: "Second", tooltip: "Rounding to second" },
                        {
                            value: "ms",
                            label: "Millisecond",
                            tooltip: "Rounding to millisecond",
                        },
                        {
                            value: "us",
                            label: "Microsecond",
                            tooltip: "Rounding to microsecond",
                        },
                        {
                            value: "ns",
                            label: "Nanosecond",
                            tooltip: "Rounding to nanosecond",
                        },
                    ],
                    advanced: true,
                },
            ],
        };
        // const description = "Compare dataframe of both inputs at several levels"
        const description = "在多个层面比较两个输入数据集的差异";
        super(
        //   "Compare Dataframes",
        "比较数据框", "CompareDataframes", description, "pandas_df_double_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[2], _icons__WEBPACK_IMPORTED_MODULE_0__.CompareDataframesIcon, defaultConfig, form);
    }
    //now always available through requirements.txt
    //    public provideDependencies({ config }): string[] {
    //        const engine = config?.selectExecutionEngine ?? "pandas";
    //        const deps: string[] = [];
    //
    //        if (engine === "polars") {
    //            deps.push("polars", "pyarrow");
    //        } else if (engine === "duckdb") {
    //            deps.push("duckdb", "pyarrow");
    //        }
    //        // pandas assumed available, no extra deps
    //        return deps;
    //    }
    //condition import does not work because there are functions.
    // public provideImports({ config }): string[] {
    // const engine = config?.selectExecutionEngine ?? "pandas";
    ////pandas always necessary, since output and input are still pandas df
    // const imports = ["import pandas as pd", "import typing", "from typing import *"];
    // if (engine === "polars") {
    // imports.push("import polars as pl", "import pyarrow");
    // } else if (engine === "duckdb") {
    // imports.push("import duckdb", "import pyarrow");
    // }
    // return imports;
    // }
    provideImports({ config }) {
        return [
            "import pandas as pd",
            "import polars as pl",
            "import pyarrow",
            "import duckdb",
            "import typing",
            "from typing import *",
        ];
    }
    provideFunctions({ config }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        // Function to compare data
        const CompareFunction = `
def pandas_align_dtypes(
    source: pd.DataFrame,
    target: pd.DataFrame,
    null_representation: str = "auto"
) -> pd.DataFrame:
    """
    Align the dtypes of 'target' to match those of 'source',
    only for columns that exist in both dataframes.

    Parameters
    ----------
    source : pd.DataFrame
        Reference dataframe (authoritative schema).
    target : pd.DataFrame
        Dataframe to be aligned.
    null_representation : {"auto", "pd.NA", "None"}, default "auto"
        - "auto": keep pandas defaults (current behavior).
        - "pd.NA": enforce pandas' scalar pd.NA for missing values.
        - "None": enforce Python None for missing values (works best for object/string).
    """
    result = target.copy()
    for col, dtype in source.dtypes.items():
        if col in result.columns:
            try:
                result[col] = result[col].astype(dtype)
            except Exception:
                # Handle problematic cases gracefully
                if pd.api.types.is_integer_dtype(dtype):
                    result[col] = result[col].astype("Int64")
                elif pd.api.types.is_string_dtype(dtype) or pd.api.types.is_object_dtype(dtype):
                    result[col] = result[col].astype("string")
                elif pd.api.types.is_datetime64_any_dtype(dtype):
                    result[col] = pd.to_datetime(result[col], errors="coerce")
                else:
                    pass

            # enforce null representation
            if null_representation == "pd.NA":
                result[col] = result[col].where(~result[col].isna(), pd.NA)
            elif null_representation == "None":
                result[col] = result[col].where(~result[col].isna(), None)

    return result
def get_safe_origin_column_name(columns, base_name="origin_data"):
    i = 0
    while True:
        candidate = f"{base_name}{i}" if i > 0 else base_name
        if candidate not in columns:
            return candidate
        i += 1
####pandas#########
def pandas_apply_rounding_by_type(
    df: pd.DataFrame,
    rounding: Optional[Dict[str, Union[int, str]]]
) -> pd.DataFrame:
    if not rounding:
        return df
    df = df.copy()

    for col in df.columns:
        if pd.api.types.is_numeric_dtype(df[col]) and "float" in rounding:
            df[col] = df[col].round(rounding["float"])
        elif pd.api.types.is_datetime64_any_dtype(df[col]) and "datetime" in rounding:
            df[col] = df[col].dt.round(rounding["datetime"])

    return df

def compare_pandas_data(
    df1: pd.DataFrame,
    df2: pd.DataFrame,
    column_mismatch: str = "intersect",  # or "strict"
    rounding: Optional[Dict[str, Union[int, str]]] = None,
    index_data_for_compare: bool = False,
    check_forcount: bool = True,
) -> pd.DataFrame:
    if index_data_for_compare:
        df1 = df1.reset_index(drop=True)
        df2 = df2.reset_index(drop=True)
        df1["_row_index_for_compare"] = df1.index
        df2["_row_index_for_compare"] = df2.index

    # Step 1: determine column set
    cols1 = set(df1.columns)
    cols2 = set(df2.columns)

    if column_mismatch == "strict":
        if cols1 != cols2:
            missing_1 = cols2 - cols1
            missing_2 = cols1 - cols2
            raise ValueError(
                f"Column mismatch: extra in df2={missing_1}, extra in df1={missing_2}"
            )
        common_cols = list(df1.columns)  # preserve order
    elif column_mismatch == "intersect":
        common_cols = [col for col in df1.columns if col in df2.columns]
    else:
        raise ValueError(f"Invalid column_mismatch value: {column_mismatch}")

    # Step 2: restrict to common columns and apply rounding
    df1 = pandas_apply_rounding_by_type(df1[common_cols].copy(), rounding)
    df2 = pandas_apply_rounding_by_type(df2[common_cols].copy(), rounding)

    # Step 3: assign origin + dynamic column names
    all_cols = set(df1.columns) | set(df2.columns)

    origin_col = get_safe_origin_column_name(all_cols, base_name="origin_data")
    row_count_col = get_safe_origin_column_name(all_cols | {origin_col}, base_name="row_count")
    diff_type_col = get_safe_origin_column_name(all_cols | {origin_col, row_count_col}, base_name="difference_type")
    total_diff_col = get_safe_origin_column_name(all_cols | {origin_col, row_count_col, diff_type_col}, base_name="total_count_diff")

    df1[origin_col] = "left"
    df2[origin_col] = "right"

    # Step 4: union + group counts
    combined = pd.concat([df1, df2], ignore_index=True)
    group_cols = [col for col in combined.columns if col != origin_col]

    grouped = (
        combined.groupby(group_cols + [origin_col], dropna=False)
        .size()
        .unstack(fill_value=0)
        .reset_index()
    )

    if "left" not in grouped:
        grouped["left"] = 0
    if "right" not in grouped:
        grouped["right"] = 0

    results = []

    # (a) rows only in one side
    only_one_side = grouped[(grouped["left"] == 0) | (grouped["right"] == 0)].copy()
    if not only_one_side.empty:
        for side in ["left", "right"]:
            side_part = only_one_side[group_cols].copy()
            side_part[origin_col] = side
            side_part[row_count_col] = only_one_side[side]
            side_part = side_part[side_part[row_count_col] > 0]
            if not side_part.empty:
                side_part[diff_type_col] = "row_differs"
                side_part[total_diff_col] = side_part[row_count_col]  # other side is 0
                results.append(side_part)

    # (b) rows present in both but with different counts
    if check_forcount:
        count_diff = grouped[
            (grouped["left"] > 0) & (grouped["right"] > 0) & (grouped["left"] != grouped["right"])
        ].copy()
        if not count_diff.empty:
            diff_val = (count_diff["left"] - count_diff["right"]).abs()
            for side in ["left", "right"]:
                side_part = count_diff[group_cols].copy()
                side_part[origin_col] = side
                side_part[row_count_col] = count_diff[side]
                side_part[diff_type_col] = "count_differs"
                side_part[total_diff_col] = diff_val
                results.append(side_part)

    if results:
        diff_rows = pd.concat(results, ignore_index=True)
    else:
        # ensure correct dtypes when empty
        empty_dict = {col: pd.Series(dtype=df1[col].dtype if col in df1.columns else "object") for col in group_cols}
        empty_dict.update({
        origin_col: pd.Series(dtype="object"),
        row_count_col: pd.Series(dtype="int64"),
        diff_type_col: pd.Series(dtype="object"),
        total_diff_col: pd.Series(dtype="int64"),
        })
        diff_rows = pd.DataFrame(empty_dict)

# Final step: enforce schema consistency with df1
    diff_rows = pandas_align_dtypes(df1, diff_rows,null_representation="pd.NA")


    return diff_rows
	
def compare_pandas_count_data(
    df1: pd.DataFrame,
    df2: pd.DataFrame,
    column_mismatch: str = "intersect",
    rounding: Optional[Dict[str, Union[int, str]]] = None,
    index_data_for_compare: bool = False,
    check_forcount: bool = True
) -> pd.DataFrame:
    # Reuse compare_pandas_data to get the differing rows
    diff_rows = compare_pandas_data(
        df1=df1,
        df2=df2,
        column_mismatch=column_mismatch,
        rounding=rounding,
        index_data_for_compare=index_data_for_compare,
        check_forcount=check_forcount
    )

    # Derive dynamic column name for row_count
    row_count_col = get_safe_origin_column_name(set(diff_rows.columns), base_name="row_count")

    # Return single-row, single-column DataFrame
    return pd.DataFrame({row_count_col: [len(diff_rows)]})
	
def get_metadata_as_df(df: pd.DataFrame, add_index: bool = False) -> pd.DataFrame:
    meta = [
        {"column": col, "type": str(dtype)}
        for col, dtype in df.dtypes.items()
    ]
    if add_index:
        for i, row in enumerate(meta):
            row["index"] = i
    return pd.DataFrame(meta)
    
def compare_pandas_metadata(df1: pd.DataFrame, df2: pd.DataFrame, index_metadata_for_compare: bool = False):
    meta1 = get_metadata_as_df(df1, add_index=index_metadata_for_compare)
    meta2 = get_metadata_as_df(df2, add_index=index_metadata_for_compare)
    return compare_pandas_data(meta1, meta2)

def get_metadata_metrics_as_df(df: pd.DataFrame, add_index: bool = False) -> pd.DataFrame:
    rows = []
    for i, col in enumerate(df.columns):
        dtype = str(df[col].dtype)
        col_data = df[col].dropna()

        base = {"column": col}
        if add_index:
            base["index"] = i

        rows.append({**base, "key": "type", "value": dtype})
        rows.append({**base, "key": "count", "value": len(col_data)})
        rows.append({**base, "key": "count_distinct", "value": col_data.nunique()})

        if pd.api.types.is_numeric_dtype(df[col]) or pd.api.types.is_datetime64_any_dtype(df[col]):
            rows.append({**base, "key": "min", "value": col_data.min()})
            rows.append({**base, "key": "max", "value": col_data.max()})

    return pd.DataFrame(rows)

def compare_pandas_metadata_and_metrics(df1: pd.DataFrame, df2: pd.DataFrame, index_metadata_for_compare: bool = False):
    meta1 = get_metadata_metrics_as_df(df1, add_index=index_metadata_for_compare).astype("string")
    meta2 = get_metadata_metrics_as_df(df2, add_index=index_metadata_for_compare).astype("string")
    return compare_pandas_data(meta1, meta2)

def compare_pandas_data_field(
    df1: pd.DataFrame,
    df2: pd.DataFrame,
    key_fields: list[str],
    column_mismatch: str = "intersect",
    rounding: Optional[Dict[str, Union[int, str]]] = None,
    index_data_for_compare: bool = False,
) -> pd.DataFrame:
    # Validate key fields
    if not key_fields:
        raise ValueError("key_fields must be provided")
        
    if index_data_for_compare:
        df1 = df1.reset_index(drop=True)
        df2 = df2.reset_index(drop=True)
        df1["_row_index_for_compare"] = df1.index
        df2["_row_index_for_compare"] = df2.index
        
    cols1 = set(df1.columns)
    cols2 = set(df2.columns)

    if column_mismatch == "strict":
        if cols1 != cols2:
            raise ValueError(f"Column mismatch: df1={cols1}, df2={cols2}")
        common_cols = list(cols1)
    elif column_mismatch == "intersect":
        common_cols = list(cols1 & cols2)
    else:
        raise ValueError(f"Invalid column_mismatch: {column_mismatch}")

    for k in key_fields:
        if k not in common_cols:
            raise ValueError(f"Key field {k} not in both datasets")

    value_fields = [col for col in common_cols if col not in key_fields]

    df1 = pandas_apply_rounding_by_type(df1[common_cols].copy(), rounding)
    df2 = pandas_apply_rounding_by_type(df2[common_cols].copy(), rounding)

    df1_keyed = df1.set_index(key_fields)
    df2_keyed = df2.set_index(key_fields)

    joined = df1_keyed.join(df2_keyed, lsuffix="__left", rsuffix="__right", how="outer")

    rows = []
    for field in value_fields:
        left_col = f"{field}__left"
        right_col = f"{field}__right"

        left_values = joined[left_col]
        right_values = joined[right_col]

        diff_mask = (left_values != right_values) | (
            left_values.isnull() ^ right_values.isnull()
        )

        differing = joined[diff_mask]
        for key_tuple, row in differing.iterrows():
            key_dict = (
                dict(zip(key_fields, [key_tuple]))
                if isinstance(key_tuple, (str, int))
                else dict(zip(key_fields, key_tuple))
            )
            if pd.notna(row[left_col]):
                rows.append({**key_dict, "Field": field, "Value": str(row[left_col]), "Origin": "left"})
            if pd.notna(row[right_col]):
                rows.append({**key_dict, "Field": field, "Value": str(row[right_col]), "Origin": "right"})

    return pd.DataFrame(rows)
    
def compare_pandas_differing_fields(
    df1: pd.DataFrame,
    df2: pd.DataFrame,
    key_fields: list[str],
    column_mismatch: str = "intersect",
    rounding: Optional[Dict[str, Union[int, str]]] = None,
    index_data_for_compare: bool = False,
) -> pd.DataFrame:
    diffs = compare_pandas_data_field(
        df1, df2, key_fields=key_fields,
        column_mismatch=column_mismatch,
        rounding=rounding,
        index_data_for_compare=index_data_for_compare
    )

    # Create a key tuple to count unique key combinations
    diffs["_key"] = diffs[key_fields].astype(str).agg("§".join, axis=1)

    summary = (
        diffs.groupby("Field")["_key"]
        .nunique()
        .reset_index()
        .rename(columns={"_key": "CountDistinctKeys"})
        .sort_values("Field")
        .reset_index(drop=True)
    )

    return summary
    
def compare_pandas(
    df1: pd.DataFrame,
    df2: pd.DataFrame,
    mode: str = "data",  # "data", "metadata", "metadata+metrics"
    column_mismatch: str = "intersect",
    rounding: Optional[Dict[str, Union[int, str]]] = None,
    key_fields: Optional[list[str]] = None,
    index_data_for_compare: bool = False,
    index_metadata_for_compare: bool = True,    
    ignore_fields: Optional[list[str]] = None,
    check_forcount: bool = True
) -> pd.DataFrame:
    
    if ignore_fields:
        df1 = df1.drop(columns=[f for f in ignore_fields if f in df1.columns])
        df2 = df2.drop(columns=[f for f in ignore_fields if f in df2.columns])


    if mode == "data":
        return compare_pandas_data(
            df1,
            df2,
            column_mismatch=column_mismatch,
            rounding=rounding,
            index_data_for_compare=index_data_for_compare,
			check_forcount=check_forcount
        )
    elif mode == "count_data":
        return compare_pandas_count_data(
            df1,
            df2,
            column_mismatch=column_mismatch,
            rounding=rounding,
            index_data_for_compare=index_data_for_compare,
			check_forcount=check_forcount
        )
    elif mode == "metadata":
        return compare_pandas_metadata(
            df1,
            df2,
            index_metadata_for_compare
        )
    elif mode == "metadata+metrics":
        return compare_pandas_metadata_and_metrics(
            df1,
            df2,
            index_metadata_for_compare
        )
    elif mode == "field_data":
        return compare_pandas_data_field(
            df1,
            df2,
            key_fields=key_fields,
            column_mismatch=column_mismatch,
            rounding=rounding,
            index_data_for_compare=index_data_for_compare,
        )
    elif mode == "differing_fields":
        return compare_pandas_differing_fields(
            df1,
            df2,
            key_fields=key_fields,
            column_mismatch=column_mismatch,
            rounding=rounding,
            index_data_for_compare=index_data_for_compare,
        )
    else:
        raise ValueError(f"Unsupported comparison mode: {mode}")

####polars#########
def polars_apply_rounding_by_type(
    df: pl.DataFrame,
    rounding: Optional[Dict[str, Union[int, str]]]
) -> pl.DataFrame:
    if not rounding:
        return df
    # Convert datetime shorthand ("s") into duration string ("1s")
    dt_round = None
    if "datetime" in rounding:
        val = rounding["datetime"]
        if isinstance(val, str):
            # If already looks like "1s" or "2ms", keep it
            if val[0].isdigit():
                dt_round_pl = val
            else:
                dt_round_pl = f"1{val}"
        else:
            dt_round_pl = val  # allow durations or other types
            
    for col in df.columns:
        dtype = df.schema[col]

        # Check for numeric types
        if isinstance(dtype, (pl.Float32, pl.Float64)) and "float" in rounding:
            df = df.with_columns(pl.col(col).round(rounding["float"]).alias(col))

        # Check for datetime types
        elif isinstance(dtype, (pl.Datetime, pl.Date, pl.Time)) and "datetime" in rounding:
            df = df.with_columns(pl.col(col).dt.round(dt_round_pl).alias(col))

    return df

def compare_polars_data(
    df1: pl.DataFrame,
    df2: pl.DataFrame,
    column_mismatch: str = "intersect",
    rounding: Optional[Dict[str, Union[int, str]]] = None,
    index_data_for_compare: bool = False,
    check_forcount: bool = True,
) -> pl.DataFrame:
    def get_safe_origin_column_name(columns, base_name="origin_data"):
        i = 0
        while True:
            candidate = f"{base_name}{i}" if i > 0 else base_name
            if candidate not in columns:
                return candidate
            i += 1

    if index_data_for_compare:
        df1 = df1.with_row_index("_row_index_for_compare")
        df2 = df2.with_row_index("_row_index_for_compare")

    cols1 = set(df1.columns)
    cols2 = set(df2.columns)

    if column_mismatch == "strict":
        if cols1 != cols2:
            raise ValueError(f"Column mismatch: df1={cols1}, df2={cols2}")
        common_cols = list(cols1)
    elif column_mismatch == "intersect":
        common_cols = list(cols1 & cols2)
    else:
        raise ValueError(f"Invalid column_mismatch: {column_mismatch}")

    # Ensure sets for safe name logic
    common_cols_set = set(common_cols)

    # Dynamic safe names
    origin_col = get_safe_origin_column_name(common_cols_set, "origin_data")
    row_count_col = get_safe_origin_column_name(common_cols_set | {origin_col}, "row_count")
    diff_type_col = get_safe_origin_column_name(common_cols_set | {origin_col, row_count_col}, "difference_type")
    total_diff_col = get_safe_origin_column_name(common_cols_set | {origin_col, row_count_col, diff_type_col}, "total_count_diff")


    df1 = df1.select(common_cols).with_columns(pl.lit("left").alias(origin_col))
    df2 = df2.select(common_cols).with_columns(pl.lit("right").alias(origin_col))

    df1 = polars_apply_rounding_by_type(df1, rounding)
    df2 = polars_apply_rounding_by_type(df2, rounding)

    combined = pl.concat([df1, df2], how="vertical_relaxed")

    if not check_forcount:
        # Simple row-diff mode
        grouped = (
            combined
            .group_by([col for col in combined.columns if col != origin_col])
            .agg([pl.col(origin_col).min().alias("min_origin"), pl.col(origin_col).max().alias("max_origin")])
            .filter(pl.col("min_origin") == pl.col("max_origin"))
            .with_columns(pl.col("min_origin").alias(origin_col))
            .drop(["min_origin", "max_origin"])
            .with_columns([
                pl.lit(1).alias(row_count_col),
                pl.lit("row_differs").alias(diff_type_col),
                pl.lit(1).alias(total_diff_col),
            ])
        )
        return grouped

    # Count-based mode
    per_origin_counts = (
        combined.group_by(common_cols + [origin_col]).agg(pl.len().alias("cnt"))
    )

    wide = (
        per_origin_counts.pivot(values="cnt", index=common_cols, on=origin_col)
        .fill_null(0)
    )

    left_count = pl.col("left")
    right_count = pl.col("right")

    only_one_side = (
        wide.filter((left_count == 0) | (right_count == 0))
        .with_columns([
            pl.when(left_count == 0).then(pl.lit("right")).otherwise(pl.lit("left")).alias(origin_col),
            pl.when(left_count == 0).then(right_count).otherwise(left_count).alias(row_count_col),
            pl.lit("row_differs").alias(diff_type_col),
            pl.when(left_count == 0).then(right_count).otherwise(left_count).alias(total_diff_col),
        ])
        .select([*common_cols, origin_col, row_count_col, diff_type_col, total_diff_col])
    )

    count_differs = (
        wide.filter((left_count > 0) & (right_count > 0) & (left_count != right_count))
        .pipe(lambda df: pl.concat([
            df.with_columns([
                pl.lit("left").alias(origin_col),
                left_count.alias(row_count_col),
                pl.lit("count_differs").alias(diff_type_col),
                (left_count.cast(pl.Int64) - right_count.cast(pl.Int64)).abs().alias(total_diff_col),
            ]),
            df.with_columns([
                pl.lit("right").alias(origin_col),
                right_count.alias(row_count_col),
                pl.lit("count_differs").alias(diff_type_col),
                (left_count.cast(pl.Int64) - right_count.cast(pl.Int64)).abs().alias(total_diff_col),
            ])
        ]))
        .select([*common_cols, origin_col, row_count_col, diff_type_col, total_diff_col])
    )

    result = pl.concat([only_one_side, count_differs], how="vertical_relaxed")
    return result
    
def compare_polars_count_data(
    df1: pl.DataFrame,
    df2: pl.DataFrame,
    column_mismatch: str = "intersect",
    rounding: Optional[Dict[str, Union[int, str]]] = None,
    index_data_for_compare: bool = False,
    check_forcount: bool = True
) -> pl.DataFrame:
    diff_rows = compare_polars_data(
        df1,
        df2,
        column_mismatch=column_mismatch,
        rounding=rounding,
        index_data_for_compare=index_data_for_compare,
    )
    return pl.DataFrame({"diff_count": [diff_rows.height]})


def compare_polars_data_field(
    df1: pl.DataFrame,
    df2: pl.DataFrame,
    key_fields: list[str],
    column_mismatch: str = "intersect",
    rounding: Optional[Dict[str, Union[int, str]]] = None,
    index_data_for_compare: bool = False,
) -> pl.DataFrame:
    if not key_fields:
        raise ValueError("key_fields must be provided")

    if index_data_for_compare:
        df1 = df1.with_row_index("_row_index_for_compare")
        df2 = df2.with_row_index("_row_index_for_compare")
        key_fields = ["_row_index_for_compare"] + key_fields

    cols1 = set(df1.columns)
    cols2 = set(df2.columns)

    if column_mismatch == "strict":
        if cols1 != cols2:
            raise ValueError(f"Column mismatch: df1={cols1}, df2={cols2}")
        common_cols = list(cols1)
    elif column_mismatch == "intersect":
        common_cols = list(cols1 & cols2)
    else:
        raise ValueError(f"Invalid column_mismatch: {column_mismatch}")

    for k in key_fields:
        if k not in common_cols:
            raise ValueError(f"Key field {k} not in both datasets")

    value_fields = [col for col in common_cols if col not in key_fields]
#rounding and common fields
    df1 = polars_apply_rounding_by_type(df1.select(common_cols), rounding)
    df2 = polars_apply_rounding_by_type(df2.select(common_cols), rounding)

    df1 = df1.with_columns(pl.lit("left").alias("origin"))
    df2 = df2.with_columns(pl.lit("right").alias("origin"))

    combined = pl.concat([df1, df2], how="vertical_relaxed")
	#melt is deprecated
    #melted = combined.melt(id_vars=key_fields + ["origin"], value_vars=value_fields, variable_name="Field", value_name="Value")
    melted = combined.unpivot(index=key_fields + ["origin"], on=value_fields, variable_name="Field", value_name="Value")
    pivoted = melted.pivot(
        values="Value",
        index=key_fields + ["Field"],
        on="origin"
    )

    # Keep rows where left and right differ
    result = pivoted.filter(
        (pl.col("left") != pl.col("right")) | (pl.col("left").is_null() ^ pl.col("right").is_null())
    )

    # Flatten back to left/right rows
    return pl.concat([
        result.select(key_fields + ["Field", pl.col("left").cast(str).alias("Value")]).with_columns(pl.lit("left").alias("Origin")),
        result.select(key_fields + ["Field", pl.col("right").cast(str).alias("Value")]).with_columns(pl.lit("right").alias("Origin")),
    ])
def compare_polars_differing_fields(
    df1: pl.DataFrame,
    df2: pl.DataFrame,
    key_fields: list[str],
    column_mismatch: str = "intersect",
    rounding: Optional[Dict[str, Union[int, str]]] = None,
    index_data_for_compare: bool = False,
) -> pl.DataFrame:
    diffs = compare_polars_data_field(
        df1, df2,
        key_fields=key_fields,
        column_mismatch=column_mismatch,
        rounding=rounding,
        index_data_for_compare=index_data_for_compare,
    )

    # Reconstruct key to group by Field
    if "_row_index_for_compare" in diffs.columns:
        key_fields = ["_row_index_for_compare"] + [k for k in key_fields if k != "_row_index_for_compare"]

    diffs = diffs.with_columns([
        pl.concat_str([pl.col(k).cast(str) for k in key_fields], separator="§").alias("_key")
    ])

    return (
        diffs.group_by("Field")
        .agg(pl.col("_key").n_unique().alias("CountDistinctKeys"))
        .sort("Field")
    )

def get_polars_metadata(df: pl.DataFrame, add_index: bool = False) -> pl.DataFrame:
    rows = []
    for idx, (col, dtype) in enumerate(df.schema.items()):
        row = {"column": col, "type": str(dtype)}
        if add_index:
            row["index"] = idx
        rows.append(row)
    return pl.DataFrame(rows)

def compare_polars_metadata(
    df1: pl.DataFrame,
    df2: pl.DataFrame,
    index_metadata_for_compare: bool = False
) -> pl.DataFrame:
    meta1 = get_polars_metadata(df1, add_index=index_metadata_for_compare)
    meta2 = get_polars_metadata(df2, add_index=index_metadata_for_compare)
    return compare_polars_data(meta1, meta2)

def get_polars_metadata_metrics(df: pl.DataFrame, add_index: bool = False) -> pl.DataFrame:
    rows = []
    for idx, col in enumerate(df.columns):
        dtype = str(df.schema[col])
        col_data = df.select(col).drop_nulls()

        base = {"column": col}
        if add_index:
            base["index"] = idx

        rows.append({**base, "key": "type", "value": str(dtype)})
        rows.append({**base, "key": "count", "value": str(col_data.height)})
        rows.append({**base, "key": "count_distinct", "value": str(col_data.select(pl.col(col).n_unique()).item())})

        if df.schema[col] in (pl.Float32, pl.Float64, pl.Int32, pl.Int64, pl.Datetime, pl.Date, pl.Time):
            stats = col_data.select([
              pl.col(col).min().alias("min_val"),
              pl.col(col).max().alias("max_val")
            ])
            rows.append({**base, "key": "min", "value": str(stats[0, "min_val"])})
            rows.append({**base, "key": "max", "value": str(stats[0, "max_val"])})

    return pl.DataFrame(rows)

    
def compare_polars_metadata_and_metrics(
    df1: pl.DataFrame,
    df2: pl.DataFrame,
    index_metadata_for_compare: bool = False
) -> pl.DataFrame:
    meta1 = get_polars_metadata_metrics(df1, add_index=index_metadata_for_compare)
    meta2 = get_polars_metadata_metrics(df2, add_index=index_metadata_for_compare)
    return compare_polars_data(meta1, meta2)
    
def compare_polars(
    df1: pl.DataFrame,
    df2: pl.DataFrame,
    mode: str = "data",
    column_mismatch: str = "intersect",
    rounding: Optional[Dict[str, Union[int, str]]] = None,
    key_fields: Optional[list[str]] = None,
    index_data_for_compare: bool = False,
    index_metadata_for_compare: bool = False,
    ignore_fields: Optional[list[str]] = None,
    check_forcount: bool = True
):
    if ignore_fields:
        df1 = df1.drop([f for f in ignore_fields if f in df1.columns])
        df2 = df2.drop([f for f in ignore_fields if f in df2.columns])
        
    if mode == "data":
        return compare_polars_data(df1, df2, column_mismatch, rounding, index_data_for_compare,check_forcount)
    elif mode == "count_data":
        return compare_polars_count_data(df1, df2, column_mismatch, rounding, index_data_for_compare,check_forcount)
    elif mode == "field_data":
        return compare_polars_data_field(df1, df2, key_fields=key_fields, column_mismatch=column_mismatch, rounding=rounding, index_data_for_compare=index_data_for_compare)
    elif mode == "differing_fields":
        return compare_polars_differing_fields(df1, df2, key_fields=key_fields, column_mismatch=column_mismatch, rounding=rounding, index_data_for_compare=index_data_for_compare)
    elif mode == "metadata":
        return compare_polars_metadata(df1, df2, index_metadata_for_compare=index_metadata_for_compare)
    elif mode == "metadata+metrics":
        return compare_polars_metadata_and_metrics(df1, df2, index_metadata_for_compare=index_metadata_for_compare)
    else:
        raise NotImplementedError(f"Polars mode '{mode}' not yet implemented")

####duckdb#########
def quote_identifier(col: str) -> str:
    #bs = chr(92)  # backslash
    #return bs + '"' + col + bs + '"'
    return '"' + col + '"'

#old version rounding in pandas
# def duckdb_apply_rounding_by_type(
    # df: pd.DataFrame,
    # rounding: Optional[Dict[str, Union[int, str]]]
    # ) -> pd.DataFrame:
    # if not rounding:
        # return df
    # df = df.copy()
    # for col in df.columns:
        # if pd.api.types.is_numeric_dtype(df[col]) and "float" in rounding:
            # df[col] = df[col].round(rounding["float"])
        # elif pd.api.types.is_datetime64_any_dtype(df[col]) and "datetime" in rounding:
            # df[col] = df[col].dt.round(rounding["datetime"])
    # return df

#newer version rounding directly in duckdb
def duckdb_apply_rounding_by_type(
    df: pd.DataFrame,
    rounding: Optional[Dict[str, Union[int, str]]],
) -> pd.DataFrame:
    if not rounding:
        return df

    conn = duckdb.connect()
    conn.register("df", df)

    select_exprs = []

    for col in df.columns:
        dtype = df[col].dtype

        # FLOAT / NUMERIC rounding
        if pd.api.types.is_float_dtype(dtype) and "float" in rounding:
            digits = rounding["float"]
            expr = f'round("{col}", {digits}) AS "{col}"'
            select_exprs.append(expr)

        # DATETIME rounding
        elif pd.api.types.is_datetime64_any_dtype(dtype) and "datetime" in rounding:
            unit = rounding["datetime"]  # use as given: "s", "ms", "month", etc.
            #expr = f"date_trunc('{unit}', \"{col}\") AS \"{col}\""
			#to avoid backslash issue when building the code
            expr = "date_trunc('" + unit + "', " + quote_identifier(col) + ") AS " + quote_identifier(col)
            select_exprs.append(expr)

        # NO CHANGE
        else:
            select_exprs.append(f'"{col}"')

    query = f"SELECT {', '.join(select_exprs)} FROM df"

    result = conn.execute(query).fetchdf()
    conn.close()
    return result
    
def compare_duckdb_data(
    df1: pd.DataFrame,
    df2: pd.DataFrame,
    column_mismatch: str = "intersect",
    rounding: Optional[Dict[str, Union[int, str]]] = None,
    index_data_for_compare: bool = False,
    check_forcount: bool = True
) -> pd.DataFrame:
    conn = duckdb.connect()

    if index_data_for_compare:
        df1 = df1.reset_index(drop=True)
        df2 = df2.reset_index(drop=True)
        df1["_row_index_for_compare"] = df1.index
        df2["_row_index_for_compare"] = df2.index

    cols1 = set(df1.columns)
    cols2 = set(df2.columns)

    if column_mismatch == "strict":
        if cols1 != cols2:
            raise ValueError(f"Column mismatch: df1={cols1}, df2={cols2}")
        common_cols = list(df1.columns)
    elif column_mismatch == "intersect":
        common_cols = [c for c in df1.columns if c in df2.columns]
    else:
        raise ValueError(f"Invalid column_mismatch: {column_mismatch}")

    # Apply rounding before analysis
    df1 = duckdb_apply_rounding_by_type(df1[common_cols].copy(), rounding)
    df2 = duckdb_apply_rounding_by_type(df2[common_cols].copy(), rounding)

    # Dynamic safe column names
    base_cols = set(df1.columns) | set(df2.columns)
    origin_col = get_safe_origin_column_name(base_cols, base_name="origin_data")
    row_count_col = get_safe_origin_column_name(base_cols | {origin_col}, base_name="row_count")
    diff_type_col = get_safe_origin_column_name(base_cols | {origin_col, row_count_col}, base_name="difference_type")
    total_diff_col = get_safe_origin_column_name(
        base_cols | {origin_col, row_count_col, diff_type_col}, base_name="total_count_diff"
    )

    df1[origin_col] = "left"
    df2[origin_col] = "right"

    conn.register("df1", df1)
    conn.register("df2", df2)

    quoted_cols = ", ".join(f'"{c}"' for c in common_cols)
    #⚠during dev, Amphi added a f right in the middle of the query so we split the  query in two strings
    query = f"""
        WITH unioned AS (
            SELECT {quoted_cols}, {origin_col} FROM df1
            UNION ALL
            SELECT {quoted_cols}, {origin_col} FROM df2
        ),
        per_origin AS (
            SELECT {quoted_cols}, {origin_col}, COUNT(*)::BIGINT AS cnt
            FROM unioned
            GROUP BY {quoted_cols}, {origin_col}
        ),
        pivoted AS (
            SELECT {quoted_cols},
                   COALESCE(MAX(CASE WHEN {origin_col}='left' THEN cnt END), 0) AS left_count,
                   COALESCE(MAX(CASE WHEN {origin_col}='right' THEN cnt END), 0) AS right_count
            FROM per_origin
            GROUP BY {quoted_cols}
        ),
        only_one_side AS (
            SELECT {quoted_cols},
                   CASE WHEN left_count=0 THEN 'right' ELSE 'left' END AS {origin_col},
                   CASE WHEN left_count=0 THEN right_count ELSE left_count END AS {row_count_col},
                   'row_differs' AS {diff_type_col},
                   CASE WHEN left_count=0 THEN right_count ELSE left_count END AS {total_diff_col}
            FROM pivoted
            WHERE left_count=0 OR right_count=0
        ),
        count_differs AS (
            SELECT {quoted_cols},
                   side.{origin_col},
                   CASE WHEN side.{origin_col}='left' THEN p.left_count ELSE p.right_count END AS {row_count_col},
                   'count_differs' AS {diff_type_col},
                   ABS(p.left_count - p.right_count) AS {total_diff_col}
            FROM pivoted p
            CROSS JOIN 
            (select"""+f""" 'left' AS {origin_col} UNION ALL SELECT 'right' AS {origin_col}) side
            WHERE p.left_count>0 AND p.right_count>0 AND p.left_count<>p.right_count
        )
        SELECT * FROM only_one_side
        UNION ALL
        SELECT * FROM count_differs
    """
    result = conn.execute(query).fetchdf()
    conn.close()

    # Enforce consistent column order
    ordered_cols = common_cols + [origin_col, row_count_col, diff_type_col, total_diff_col]
    result = result[ordered_cols]

    # Enforce consistent dtypes
    dtype_map = {
        origin_col: "string",
        row_count_col: "int64",
        diff_type_col: "string",
        total_diff_col: "int64",
    }
    for col, dtype in dtype_map.items():
        result[col] = result[col].astype(dtype)

    # Empty safeguard
    if result.empty:
        schema = {c: df1[c].dtype for c in common_cols}
        schema.update(dtype_map)
        return pd.DataFrame({col: pd.Series(dtype=dtype) for col, dtype in schema.items()})[ordered_cols]

    return result



def compare_duckdb_count_data(
    df1: pd.DataFrame,
    df2: pd.DataFrame,
    column_mismatch: str = "intersect",
    rounding: Optional[Dict[str, Union[int, str]]] = None,
    index_data_for_compare: bool = False,
    check_forcount: bool = True
) -> pd.DataFrame:
    diff_df = compare_duckdb_data(
        df1,
        df2,
        column_mismatch=column_mismatch,
        rounding=rounding,
        index_data_for_compare=index_data_for_compare,
		check_forcount=check_forcount
    )
    return pd.DataFrame({"diff_count": [len(diff_df)]})


def compare_duckdb_data_field(
    df1: pd.DataFrame,
    df2: pd.DataFrame,
    key_fields: list[str],
    column_mismatch: str = "intersect",
    rounding: Optional[Dict[str, Union[int, str]]] = None,
    index_data_for_compare: bool = False,
) -> pd.DataFrame:
    import duckdb

    if not key_fields:
        raise ValueError("key_fields must be provided")

    if index_data_for_compare:
        df1 = df1.reset_index(drop=True)
        df2 = df2.reset_index(drop=True)
        df1["_row_index_for_compare"] = df1.index
        df2["_row_index_for_compare"] = df2.index
        key_fields = ["_row_index_for_compare"] + key_fields

    cols1 = set(df1.columns)
    cols2 = set(df2.columns)

    if column_mismatch == "strict":
        if cols1 != cols2:
            raise ValueError(f"Column mismatch: df1={cols1}, df2={cols2}")
        common_cols = list(cols1)
    elif column_mismatch == "intersect":
        common_cols = list(cols1 & cols2)
    else:
        raise ValueError(f"Invalid column_mismatch: {column_mismatch}")

    # Apply rounding
    df1 = duckdb_apply_rounding_by_type(df1[list(common_cols)],rounding)
    df2 = duckdb_apply_rounding_by_type(df2[list(common_cols)],rounding)

    value_fields = [col for col in common_cols if col not in key_fields]

    # Rename left/right columns
    df1 = df1[key_fields + value_fields].copy()
    df2 = df2[key_fields + value_fields].copy()
    df1.columns = key_fields + [f"{col}__left" for col in value_fields]
    df2.columns = key_fields + [f"{col}__right" for col in value_fields]

    conn = duckdb.connect()
    conn.register("df1", df1)
    conn.register("df2", df2)

    key_expr = ", ".join(f'"{k}"' for k in key_fields)
    joined = conn.execute(f"""
        SELECT *
        FROM df1
        FULL OUTER JOIN df2
        USING ({key_expr})
    """).fetchdf()

    result_rows = []

    for field in value_fields:
        left_col = f"{field}__left"
        right_col = f"{field}__right"
        for _, row in joined.iterrows():
            key_vals = {k: row[k] for k in key_fields}
            left_val = row.get(left_col, None)
            right_val = row.get(right_col, None)
            if pd.isna(left_val) and pd.isna(right_val):
                continue
            if left_val != right_val:
                if pd.notna(left_val):
                    result_rows.append({**key_vals, "Field": field, "Value": str(left_val), "Origin": "left"})
                if pd.notna(right_val):
                    result_rows.append({**key_vals, "Field": field, "Value": str(right_val), "Origin": "right"})

    return pd.DataFrame(result_rows)


def compare_duckdb_differing_fields(
    df1: pd.DataFrame,
    df2: pd.DataFrame,
    key_fields: list[str],
    column_mismatch: str = "intersect",
    rounding: Optional[Dict[str, Union[int, str]]] = None,
    index_data_for_compare: bool = False,
) -> pd.DataFrame:
    diffs = compare_duckdb_data_field(
        df1,
        df2,
        key_fields=key_fields,
        column_mismatch=column_mismatch,
        rounding=rounding,
        index_data_for_compare=index_data_for_compare,
    )

    if "_row_index_for_compare" in diffs.columns:
        key_fields = ["_row_index_for_compare"] + [k for k in key_fields if k != "_row_index_for_compare"]

    diffs["_key"] = diffs[key_fields].astype(str).agg("§".join, axis=1)

    return (
        diffs.groupby("Field")["_key"]
        .nunique()
        .reset_index()
        .rename(columns={"_key": "CountDistinctKeys"})
        .sort_values("Field")
        .reset_index(drop=True)
    )

def compare_duckdb_metadata(
    df1: pd.DataFrame,
    df2: pd.DataFrame,
    index_metadata_for_compare: bool = False
) -> pd.DataFrame:
    meta1 = pd.DataFrame([
        {"column": col, "type": str(dtype), **({"index": i} if index_metadata_for_compare else {})}
        for i, (col, dtype) in enumerate(df1.dtypes.items())
    ])
    meta2 = pd.DataFrame([
        {"column": col, "type": str(dtype), **({"index": i} if index_metadata_for_compare else {})}
        for i, (col, dtype) in enumerate(df2.dtypes.items())
    ])
    return compare_duckdb_data(meta1, meta2, column_mismatch="intersect")


def compare_duckdb_metadata_and_metrics(
    df1: pd.DataFrame,
    df2: pd.DataFrame,
    rounding: Optional[Dict[str, Union[int, str]]] = None,
    index_metadata_for_compare: bool = False
) -> pd.DataFrame:
    def get_metadata_metrics(df: pd.DataFrame,rounding: Optional[Dict[str, Union[int, str]]] = None) -> pd.DataFrame:
        df = df.copy()

        if rounding:
            for col in df.columns:
                if pd.api.types.is_numeric_dtype(df[col]) and "float" in rounding:
                    df[col] = df[col].round(rounding["float"])
                elif pd.api.types.is_datetime64_any_dtype(df[col]) and "datetime" in rounding:
                    df[col] = df[col].dt.round(rounding["datetime"])

        rows = []
        for idx, col in enumerate(df.columns):
            dtype = str(df[col].dtype)
            col_data = df[col].dropna()

            base = {"column": col}
            if index_metadata_for_compare:
                base["index"] = idx

            rows.append({**base, "key": "type", "value": dtype})
            rows.append({**base, "key": "count", "value": len(col_data)})
            rows.append({**base, "key": "count_distinct", "value": col_data.nunique()})

            if pd.api.types.is_numeric_dtype(df[col]) or pd.api.types.is_datetime64_any_dtype(df[col]):
                rows.append({**base, "key": "min", "value": col_data.min()})
                rows.append({**base, "key": "max", "value": col_data.max()})

        return pd.DataFrame(rows)


    meta1 = get_metadata_metrics(df1)
    meta2 = get_metadata_metrics(df2)
    return compare_duckdb_data(meta1, meta2, column_mismatch="intersect")



def compare_duckdb(
    df1: pd.DataFrame,
    df2: pd.DataFrame,
    mode: str = "data",
    column_mismatch: str = "intersect",
    rounding: Optional[Dict[str, Union[int, str]]] = None,
    key_fields: Optional[list[str]] = None,
    index_data_for_compare: bool = False,
    index_metadata_for_compare: bool = False,
    ignore_fields: Optional[list[str]] = None,
    check_forcount: bool = True
) -> pd.DataFrame:
    if ignore_fields:
        df1 = df1.drop(columns=[f for f in ignore_fields if f in df1.columns])
        df2 = df2.drop(columns=[f for f in ignore_fields if f in df2.columns])
    if mode == "data":
        return compare_duckdb_data(df1, df2, column_mismatch, rounding,index_data_for_compare,check_forcount)
    elif mode == "count_data":
        return compare_duckdb_count_data(df1, df2, column_mismatch, rounding,index_data_for_compare,check_forcount)
    elif mode == "field_data":
        return compare_duckdb_data_field(df1, df2, key_fields, column_mismatch, rounding, index_data_for_compare)
    elif mode == "differing_fields":
        return compare_duckdb_differing_fields(df1, df2, key_fields, column_mismatch, rounding, index_data_for_compare)
    elif mode == "metadata":
        return compare_duckdb_metadata(df1, df2, index_metadata_for_compare)
    elif mode == "metadata+metrics":
        return compare_duckdb_metadata_and_metrics(df1, df2, index_metadata_for_compare)
    else:
        raise ValueError(f"Unsupported DuckDB mode: {mode}")
#########general function####################

def compare_datasets(
    df1,
    df2,
    execution_engine: str = "pandas",
    mode: str = "data",
    column_mismatch: str = "intersect",
    rounding: Optional[Dict[str, Union[int, str]]] = None,
    key_fields: Optional[list[str]] = None,
    index_data_for_compare: bool = False,
    index_metadata_for_compare: bool = True,
	check_forcount: bool = True,
    ignore_fields: Optional[list[str]] = None,
):
    #Parameters:
		#execution_engine : execution engine (pandas, polars, duckdb...)
        #df1, df2 (pd.DataFrame): DataFrames to join
        #mode : data, count_data,field_data,differing_fields,metadata,metadata+metrics
        #column_mismatch : intersect (common column), strict (raise error)
        #rounding : optional rounding for numeric value #rounding={"float": 4, "datetime": "s"}
        #key_fields (str or list of str): optional,  combination of fields that identify a row
        #index_data_for_compare : true if the order of data is relevant
        #index_metadata_for_compare : true if the order of columns is relevant
        #ignore fields : fields that won't be in comparison
        #check_forcount : add a check on count for duplicate rows

    #Returns:
        #pd.DataFrame: result of comparison result
	#empty list or None
    if key_fields is None or len(key_fields) == 0:
        key_fields = None
    if ignore_fields is None or len(ignore_fields) == 0:
        ignore_fields = None

		
    if execution_engine == "pandas":
        return compare_pandas(
            df1, df2, mode=mode,
            column_mismatch=column_mismatch,
            rounding=rounding,
            key_fields=key_fields,
            index_data_for_compare=index_data_for_compare,
            index_metadata_for_compare=index_metadata_for_compare,
            ignore_fields= ignore_fields,
            check_forcount=check_forcount
        )
    elif execution_engine == "polars":
		#Convert to polars dataframe both pandas dataframe
        df1_pl = pl.from_pandas(df1)
        df2_pl = pl.from_pandas(df2)
        diff_rows= compare_polars(
            df1_pl, df2_pl,
            mode=mode,
            column_mismatch=column_mismatch,
            rounding=rounding,
            key_fields=key_fields,
            index_data_for_compare=index_data_for_compare,
            index_metadata_for_compare=index_metadata_for_compare,
            ignore_fields= ignore_fields,
            check_forcount=check_forcount
        ).to_pandas()
        if mode=="data":
            return pandas_align_dtypes(df1, diff_rows,null_representation="pd.NA")
        else :
            return diff_rows
    elif execution_engine == "duckdb":
        diff_rows= compare_duckdb(
            df1, df2, mode=mode,
            column_mismatch=column_mismatch,
            rounding=rounding,
            key_fields=key_fields,
            index_data_for_compare=index_data_for_compare,
            index_metadata_for_compare=index_metadata_for_compare,
            ignore_fields= ignore_fields,
            check_forcount=check_forcount
        )
        if mode=="data":
            return pandas_align_dtypes(df1, diff_rows,null_representation="pd.NA")
        else :
            return diff_rows
    else:
        raise ValueError(f"Unsupported engine: {engine}")
    `;
        return [CompareFunction];
    }
    generateComponentCode({ config, inputName1, inputName2, outputName, }) {
        var _a, _b, _c, _d, _e;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        const const_ts_execution_engine = (_c = config.select_execution_engine) !== null && _c !== void 0 ? _c : "pandas";
        const const_ts_comparison_mode = (_d = config.select_comparison_mode) !== null && _d !== void 0 ? _d : "data";
        const const_ts_column_mismatch = (_e = config.select_column_mismatch) !== null && _e !== void 0 ? _e : "intersect";
        //for V2
        function buildRoundingString(selectTimestampDateTimeRound, // "None", "s", "ms"
        inputNumberDecimalRound) {
            // Case 1 : both aren't present or "None"
            if ((selectTimestampDateTimeRound === "None" ||
                selectTimestampDateTimeRound == null) &&
                (inputNumberDecimalRound === undefined ||
                    inputNumberDecimalRound == null)) {
                return "None";
            }
            // Construction dynamique de l'objet
            const rounding = {};
            if (inputNumberDecimalRound !== undefined &&
                inputNumberDecimalRound !== null) {
                rounding["float"] = inputNumberDecimalRound;
            }
            if (selectTimestampDateTimeRound !== "None" &&
                selectTimestampDateTimeRound != null) {
                rounding["datetime"] = selectTimestampDateTimeRound;
            }
            return JSON.stringify(rounding);
        }
        ////Exemple d’utilisation :
        // console.log(buildRoundingString("s", 4));       // '{"float":4,"datetime":"s"}'
        // console.log(buildRoundingString("None", 4));    // '{"float":4}'
        // console.log(buildRoundingString("s", undefined)); // '{"datetime":"s"}'
        // console.log(buildRoundingString("None", undefined)); // 'None'
        //	const const_ts_rounding = '{"float": 4, "datetime": "s"}'; //No UI right now
        const const_ts_rounding = buildRoundingString(config.selectTimestampDateTimeRound, config.inputNumberDecimalRound);
        const const_ts_key_fields = config.selectcol_key_fields.map((column) => column.named ? `"${column.value}"` : column.value);
        const const_ts_ignore_fields = config.selectcol_ignore_fields.map((column) => (column.named ? `"${column.value}"` : column.value));
        const const_ts_index_data_for_compare = config.boolean_index_data_for_compare ? "False" : "True";
        const const_ts_index_metadata_for_compare = config.boolean_index_metadata_for_compare ? "True" : "False";
        const const_ts_check_forcount = config.boolean_check_forcount
            ? "True"
            : "False";
        // Join the keys into a string for the Python code
        const const_ts_key_fieldsstr = `[${const_ts_key_fields.join(", ")}]`;
        const const_ts_ignore_fieldsstr = `[${const_ts_ignore_fields.join(", ")}]`;
        //Comment for Python
        let code = `# Compare ${inputName1} and ${inputName2}\n`;
        //code += `${outputName}=compare_datasets(execution_engine='${const_ts_execution_engine}',df1=${inputName1}, df2=${inputName2},mode='${const_ts_comparison_mode}',column_mismatch='${const_ts_column_mismatch}')`
        //for V2
        code += `${outputName}=compare_datasets(execution_engine='${const_ts_execution_engine}',
  df1=${inputName1},
  df2=${inputName2},
  mode='${const_ts_comparison_mode}',
  column_mismatch='${const_ts_column_mismatch}',
  rounding=${const_ts_rounding},
  key_fields=${const_ts_key_fieldsstr},
  ignore_fields=${const_ts_ignore_fieldsstr},
  index_data_for_compare=${const_ts_index_data_for_compare},
  index_metadata_for_compare=${const_ts_index_metadata_for_compare},
  check_forcount=${const_ts_check_forcount}
  )`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/transforms/CustomFilter.js"
/*!***************************************************!*\
  !*** ./lib/components/transforms/CustomFilter.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomFilter: () => (/* binding */ CustomFilter)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class CustomFilter extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = { filterType: "basic", condition: "==" };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "dataMapping2",
                    id: "mapping2",
                    advanced: true,
                },
            ],
        };
        // const description = "Use Filter Rows to select and output data that meets a specified condition.";
        const description = "";
        super(
        // "Filter Rows",
        "标准", "标准id", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.filterIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return [];
    }
    generateComponentCode({ config, inputName, outputName, }) {
        /* ---------- advanced mode ---------- */
        if (config.filterType === "advanced") {
            const expr = String(config.pythonExpression || "").replace(/"/g, '\\"');
            return `
# Advanced filter using pandas.DataFrame.query
${outputName} = ${inputName}.query("${expr}")
`;
        }
        /* ---------- basic mode ---------- */
        const columnName = config.column.value;
        const columnType = config.column.type;
        const columnIsNamed = config.column.named;
        const condition = config.condition;
        const conditionValue = config.conditionValue;
        const enforceString = config.enforceString;
        let code = `
# Filter rows based on condition
`;
        let queryExpression;
        let conditionValueReference;
        let columnReference;
        switch (condition) {
            case "==":
            case "!=":
            case ">":
            case "<":
            case ">=":
            case "<=":
                columnReference = `'${columnName}'`;
                conditionValueReference =
                    enforceString || ["string", "category", "object"].includes(columnType)
                        ? `'${conditionValue}'`
                        : `${conditionValue}`;
                code += `${outputName} = ${inputName}[${inputName}[${columnReference}] ${condition} ${conditionValueReference}]`;
                break;
            case "contains":
            case "not contains":
                columnReference = columnIsNamed ? `'${columnName}'` : columnName;
                if (["string", "object", "category"].includes(columnType)) {
                    const neg = condition === "not contains" ? "~" : "";
                    code += `${outputName} = ${inputName}[${neg}${inputName}[${columnReference}].str.contains("${conditionValue}", na=False)]`;
                }
                else {
                    throw new Error("Invalid operation for the data type");
                }
                break;
            case "startswith":
            case "endswith":
                columnReference = columnIsNamed ? `'${columnName}'` : columnName;
                if (["string", "object", "category"].includes(columnType)) {
                    code += `${outputName} = ${inputName}[${inputName}[${columnReference}].str.${condition}("${conditionValue}", na=False)]`;
                }
                else {
                    throw new Error("Invalid operation for the data type");
                }
                break;
            case "notnull":
                columnReference = columnIsNamed ? `'${columnName}'` : columnName;
                code += `${outputName} = ${inputName}.dropna(subset=[${columnReference}])`;
                break;
            case "isnull":
                columnReference = columnIsNamed ? `'${columnName}'` : columnName;
                code += `${outputName} = ${inputName}[${inputName}[${columnReference}].isna()]`;
                break;
            default: {
                // Quote column name with back‑ticks only if it contains non‑alphanumeric chars
                const needsBackticks = /[^a-zA-Z0-9_]/.test(columnName);
                columnReference = needsBackticks ? `\`${columnName}\`` : columnName;
                queryExpression = `${columnReference} ${condition} '${conditionValue}'`;
                code += `${outputName} = ${inputName}.query("${queryExpression}")`;
                break;
            }
        }
        console.log("====================================");
        console.log(code, "code111");
        console.log("====================================");
        return code + "\n";
    }
}


/***/ },

/***/ "./lib/components/transforms/DataCleansing.js"
/*!****************************************************!*\
  !*** ./lib/components/transforms/DataCleansing.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataCleansing: () => (/* binding */ DataCleansing)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");
 // Define this icon in your icons file


class DataCleansing extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            method: "value",
            value: 0,
            forward: false,
            backward: false,
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "boolean",
                    label: "Drop rows with NULL values",
                    id: "removeNullRows",
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "Drop rows if",
                    id: "removeRowsHow",
                    options: [
                        { value: "all", label: "All values are NULL" },
                        { value: "any", label: "Any values are NULL (at least one)" },
                    ],
                    condition: { removeNullRows: true },
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Drop columns with NULL values",
                    id: "removeNullColumns",
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "Drop rows if",
                    id: "removeColumnsHow",
                    options: [
                        { value: "all", label: "All values are NULL" },
                        { value: "any", label: "Any values are NULL (at least one)" },
                    ],
                    condition: { removeNullColumns: true },
                    advanced: true,
                },
                {
                    type: "columns",
                    label: "Apply cleansing to columns",
                    id: "columns",
                    tooltip: "Select the columns to apply the cleansing rules. If left blank, all columns will be selected by default.",
                    placeholder: "Default: All columns",
                    advanced: true,
                },
                {
                    type: "select",
                    label: "Replace missing values with",
                    id: "replaceMethod",
                    options: [
                        {
                            value: "blanks",
                            label: "Replace with blanks (for string fields)",
                        },
                        { value: "0", label: "Replace with 0 (for numeric fields)" },
                        { value: "custom", label: "Replace with custom value" },
                        { value: "median", label: "Fill with median (for numeric fields)" },
                        { value: "ffill", label: "Forward fill" },
                        { value: "bfill", label: "Backward fill" },
                    ],
                    selectionRemovable: true,
                },
                {
                    type: "input",
                    label: "Value",
                    id: "value",
                    condition: { replaceMethod: "custom" },
                    placeholder: "Enter value",
                },
                {
                    type: "selectMultipleCustomizable",
                    label: "Remove Unwanted Characters",
                    id: "removeUnwantedCharacters",
                    options: [
                        { value: "whitespace", label: "Leading and Trailing Whitespace" },
                        { value: "tabs", label: "Tabs" },
                        { value: "Line breaks", label: "Line Breaks" },
                        { value: "allwhitespace", label: "All Whitespace" },
                        { value: "letters", label: "All Letters" },
                        { value: "numbers", label: "All Numbers" },
                        { value: "punctuation", label: "Punctuation" },
                    ],
                },
                {
                    type: "select",
                    label: "Modify Case",
                    id: "case",
                    options: [
                        {
                            value: "lower",
                            label: "Lower Case",
                            tooltip: "Convert all characters to lowercase.",
                        },
                        {
                            value: "upper",
                            label: "Upper Case",
                            tooltip: "Convert all characters to uppercase.",
                        },
                        {
                            value: "capitalize",
                            label: "Capitalize",
                            tooltip: "Capitalize the first letter of the string and lowercase the rest.",
                        },
                        {
                            value: "swapcase",
                            label: "Swap Case",
                            tooltip: "Swap uppercase characters to lowercase and vice versa.",
                        },
                        {
                            value: "camelcase",
                            label: "Camel Case",
                            tooltip: "Convert to camel case, where the first letter is lowercase and subsequent words are capitalized without spaces.",
                        },
                        {
                            value: "snakecase",
                            label: "Snake Case",
                            tooltip: "Replace spaces with underscores and convert all characters to lowercase.",
                        },
                    ],
                    selectionRemovable: true,
                },
            ],
        };
        // const description = "Use Data Cleansing to clean and preprocess your data. It provides options to handle missing values, drop null rows or columns, modify string cases, and remove unwanted characters. You can apply these transformations to specific columns or the entire dataset.";
        const description = "使用数据清洗功能来清理和预处理您的数据。它提供了处理缺失值、删除空值行或列、修改字符串格式以及删除不必要字符等多种选项。您可以将这些转换应用于特定的列或整个数据集。";
        super(
        // "Data Cleansing",
        "数据清洗", "cleanDataCLeansing", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.washIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        const imports = [];
        // Import 're' only if unwanted characters are specified
        if (config.removeUnwantedCharacters &&
            config.removeUnwantedCharacters.length > 0) {
            imports.push("import re");
        }
        return imports;
    }
    generateComponentCode({ config, inputName, outputName }) {
        const code = [];
        const columns = config.columns;
        function getColumnReference(column) {
            return column.named ? `'${column.value}'` : `${column.value}`;
        }
        // Determine if specific columns are provided
        const columnsArray = columns && columns.length > 0 ? columns.map(getColumnReference) : null;
        const columnsList = columnsArray ? `[${columnsArray.join(", ")}]` : null;
        code.push(`${outputName} = ${inputName}.copy()`);
        // Handle missing value replacement
        if (config.replaceMethod) {
            let value;
            if (config.replaceMethod === "blanks") {
                value = "''";
            }
            else if (config.replaceMethod === "0") {
                value = "0";
            }
            else if (config.replaceMethod === "custom") {
                value = isNaN(Number(config.value))
                    ? `'${config.value}'`
                    : config.value;
            }
            if (["blanks", "0", "custom"].includes(config.replaceMethod)) {
                if (columnsList) {
                    code.push(`${outputName}[${columnsList}] = ${outputName}[${columnsList}].fillna(${value})`);
                }
                else {
                    code.push(`${outputName} = ${outputName}.fillna(${value})`);
                }
            }
            else if (config.replaceMethod === "median") {
                if (columnsList) {
                    code.push(`${outputName}[${columnsList}] = ${outputName}[${columnsList}].fillna(${outputName}[${columnsList}].median())`);
                }
                else {
                    code.push(`${outputName} = ${outputName}.fillna(${outputName}.median())`);
                }
            }
            else if (["ffill", "bfill"].includes(config.replaceMethod)) {
                if (columnsList) {
                    code.push(`${outputName}[${columnsList}] = ${outputName}[${columnsList}].fillna(method='${config.replaceMethod}')`);
                }
                else {
                    code.push(`${outputName} = ${outputName}.fillna(method='${config.replaceMethod}')`);
                }
            }
        }
        // Handle removal of unwanted characters and case modifications
        const unwantedCharacterMapping = {
            whitespace: { "^\\s+|\\s+$": "" },
            tabs: { "\\t": "" },
            "Line breaks": { "\\n": "", "\\r": "" },
            allwhitespace: { "\\s+": "" },
            letters: { "[A-Za-z]+": "" },
            numbers: { "\\d+": "" },
            punctuation: { "[^\\w\\s]+": "" },
        };
        const removeUnwantedChars = config.removeUnwantedCharacters || [];
        let replaceDict = {};
        removeUnwantedChars.forEach((char) => {
            const mappings = unwantedCharacterMapping[char];
            if (mappings) {
                replaceDict = { ...replaceDict, ...mappings };
            }
        });
        const caseMapping = {
            lower: ".lower()",
            upper: ".upper()",
            capitalize: ".capitalize()",
            swapcase: ".swapcase()",
            camelcase: ".title().replace(' ', '')",
            snakecase: ".replace(' ', '_').lower()",
        };
        // Determine case transformation
        const caseOption = config.case;
        const caseTransform = caseOption ? caseMapping[caseOption] : null;
        if (Object.keys(replaceDict).length > 0 || caseTransform) {
            if (columnsList) {
                code.push(`${outputName}[${columnsList}] = ${outputName}[${columnsList}].astype(str)`);
            }
            else {
                code.push(`${outputName} = ${outputName}.astype(str)`);
            }
            if (Object.keys(replaceDict).length > 0) {
                const regexFlag = "regex=True";
                const replaceStr = JSON.stringify(replaceDict).replace(/"/g, "'");
                if (columnsList) {
                    code.push(`${outputName}[${columnsList}] = ${outputName}[${columnsList}].replace(${replaceStr}, ${regexFlag})`);
                }
                else {
                    code.push(`${outputName} = ${outputName}.replace(${replaceStr}, ${regexFlag})`);
                }
            }
            if (caseTransform) {
                if (columnsArray) {
                    if (columnsArray.length === 1) {
                        const col = columnsArray[0];
                        code.push(`${outputName}[${col}] = ${outputName}[${col}].str${caseTransform}`);
                    }
                    else {
                        code.push(`for col in ${columnsList}:`);
                        code.push(`    ${outputName}[col] = ${outputName}[col].str${caseTransform}`);
                    }
                }
                else {
                    code.push(`for col in ${outputName}.columns:`);
                    code.push(`    ${outputName}[col] = ${outputName}[col].str${caseTransform}`);
                }
            }
        }
        // Handle removal of null rows
        if (config.removeNullRows) {
            if (columnsList) {
                code.push(`${outputName} = ${outputName}.dropna(axis=0, how='${config.removeRowsHow}', subset=${columnsList})`);
            }
            else {
                code.push(`${outputName} = ${outputName}.dropna(axis=0, how='${config.removeRowsHow}')`);
            }
        }
        // Handle removal of null columns
        if (config.removeNullColumns) {
            if (columnsList) {
                code.push(`${outputName} = ${outputName}.dropna(axis=1, how='${config.removeColumnsHow}', subset=${columnsList})`);
            }
            else {
                code.push(`${outputName} = ${outputName}.dropna(axis=1, how='${config.removeColumnsHow}')`);
            }
        }
        return code.join("\n");
    }
}


/***/ },

/***/ "./lib/components/transforms/DateTimeConverter.js"
/*!********************************************************!*\
  !*** ./lib/components/transforms/DateTimeConverter.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DateTimeConverter: () => (/* binding */ DateTimeConverter)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");

 // Adjust the import path

class DateTimeConverter extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            conversionType: "stringToDate",
            language: "en_US.UTF-8",
            dateTimeFormat: "auto",
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "Conversion Type",
                    id: "conversionType",
                    options: [
                        { value: "dateToString", label: "Date/Time to string" },
                        { value: "stringToDate", label: "String to Date/Time" },
                    ],
                },
                {
                    type: "column",
                    label: "Select column",
                    id: "dateTimeField",
                    placeholder: "Select column(s)",
                },
                {
                    type: "selectCustomizable",
                    label: "DateTime Language",
                    id: "language",
                    tooltip: "Select language or provide custom locale for your system, POSIX-style locale identifier (Linux/Mac) or Windows locale names (Windows)",
                    options: [
                        { value: "en_US.UTF-8", label: "English (US)" },
                        { value: "en_GB.UTF-8", label: "English (UK)" },
                        { value: "fr_FR.UTF-8", label: "French (France)" },
                        { value: "de_DE.UTF-8", label: "German (Germany)" },
                        { value: "es_ES.UTF-8", label: "Spanish (Spain)" },
                        { value: "it_IT.UTF-8", label: "Italian (Italy)" },
                        { value: "pt_PT.UTF-8", label: "Portuguese (Portugal)" },
                        { value: "pt_BR.UTF-8", label: "Portuguese (Brazil)" },
                        { value: "ja_JP.UTF-8", label: "Japanese" },
                        { value: "ko_KR.UTF-8", label: "Korean" },
                        { value: "zh_CN.UTF-8", label: "Chinese (Simplified, China)" },
                        { value: "zh_TW.UTF-8", label: "Chinese (Traditional, Taiwan)" },
                        { value: "nl_NL.UTF-8", label: "Dutch (Netherlands)" },
                        { value: "ru_RU.UTF-8", label: "Russian" },
                        { value: "sv_SE.UTF-8", label: "Swedish (Sweden)" },
                        { value: "da_DK.UTF-8", label: "Danish (Denmark)" },
                        { value: "fi_FI.UTF-8", label: "Finnish (Finland)" },
                        { value: "nb_NO.UTF-8", label: "Norwegian (Norway)" },
                        { value: "pl_PL.UTF-8", label: "Polish (Poland)" },
                        { value: "tr_TR.UTF-8", label: "Turkish (Turkey)" },
                        { value: "cs_CZ.UTF-8", label: "Czech (Czech Republic)" },
                        { value: "hu_HU.UTF-8", label: "Hungarian (Hungary)" },
                        { value: "el_GR.UTF-8", label: "Greek (Greece)" },
                    ],
                    advanced: true,
                },
                {
                    type: "selectCustomizable",
                    label: "Select the format",
                    id: "dateTimeFormat",
                    tooltip: "Select pre-defined format or provide a custom strftime format used for the conversion (in both orders)",
                    condition: { conversionType: "dateToString" },
                    options: [
                        { value: "%A, %B %d, %Y", label: "day, dd Month, yyyy" },
                        { value: "%d-%m-%Y", label: "dd-MM-yyyy" },
                        { value: "%d/%m/%Y", label: "dd/MM/yyyy" },
                        { value: "%Y-%m-%d", label: "yyyy-MM-dd" },
                        { value: "%Y/%m/%d", label: "yyyy/MM/dd" },
                        { value: "%B %d, %Y", label: "Month dd, yyyy" },
                        { value: "%m/%d/%Y", label: "MM/dd/yyyy" },
                        { value: "%m-%d-%Y", label: "MM-dd-yyyy" },
                        { value: "%d %b %Y", label: "dd Mon yyyy" },
                        { value: "%d %B %Y", label: "dd Month yyyy" },
                        { value: "%d.%m.%Y", label: "dd.MM.yyyy" },
                        { value: "%Y.%m.%d", label: "yyyy.MM.dd" },
                        { value: "%b %d, %Y", label: "Mon dd, yyyy" },
                        { value: "%a, %d %b %Y", label: "day, dd Mon yyyy" },
                        { value: "%A, %d %B %Y", label: "day, dd Month yyyy" },
                        { value: "%Y-%m-%d %H:%M:%S", label: "yyyy-MM-dd HH:mm:ss" },
                        { value: "%d/%m/%Y %H:%M", label: "dd/MM/yyyy HH:mm" },
                        { value: "%B %d, %Y %H:%M", label: "Month dd, yyyy HH:mm" },
                    ],
                },
                {
                    type: "selectCustomizable",
                    label: "Select the format",
                    id: "dateTimeFormat",
                    tooltip: "Select pre-defined format, Auto detect (selected by default) or provide a custom strftime format used for the conversion (in both orders)",
                    condition: { conversionType: "stringToDate" },
                    options: [
                        { value: "auto", label: "Auto detect" },
                        { value: "%A, %B %d, %Y", label: "day, dd Month, yyyy" },
                        { value: "%d-%m-%Y", label: "dd-MM-yyyy" },
                        { value: "%d/%m/%Y", label: "dd/MM/yyyy" },
                        { value: "%Y-%m-%d", label: "yyyy-MM-dd" },
                        { value: "%Y/%m/%d", label: "yyyy/MM/dd" },
                        { value: "%B %d, %Y", label: "Month dd, yyyy" },
                        { value: "%m/%d/%Y", label: "MM/dd/yyyy" },
                        { value: "%m-%d-%Y", label: "MM-dd-yyyy" },
                        { value: "%d %b %Y", label: "dd Mon yyyy" },
                        { value: "%d %B %Y", label: "dd Month yyyy" },
                        { value: "%d.%m.%Y", label: "dd.MM.yyyy" },
                        { value: "%Y.%m.%d", label: "yyyy.MM.dd" },
                        { value: "%b %d, %Y", label: "Mon dd, yyyy" },
                        { value: "%a, %d %b %Y", label: "day, dd Mon yyyy" },
                        { value: "%A, %d %B %Y", label: "day, dd Month yyyy" },
                        { value: "%Y-%m-%d %H:%M:%S", label: "yyyy-MM-dd HH:mm:ss" },
                        { value: "%d/%m/%Y %H:%M", label: "dd/MM/yyyy HH:mm" },
                        { value: "%B %d, %Y %H:%M", label: "Month dd, yyyy HH:mm" },
                    ],
                },
                {
                    type: "boolean",
                    label: "New Column",
                    id: "newColumn",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "New column name",
                    id: "newColumnName",
                    placeholder: "Type new column name",
                    condition: { newColumn: true },
                    advanced: true,
                },
            ],
        };
        // const description = "Use DateTime to convert between date/time formats and strings, allowing for custom formatting and language options.";
        const description = "使用 DateTime 类可以将日期/时间格式与字符串进行转换，同时支持自定义格式设置和语言选项。";
        super(
        //   "DateTime Converter",
        "日期时间转换器", "datetimeConverter", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.calendarIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return ["from datetime import datetime", "import locale"];
    }
    generateComponentCode({ config, inputName, outputName }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        const { conversionType, dateTimeField, language, dateTimeFormat, newColumn, } = config;
        // Extract column details
        const columnName = dateTimeField.value;
        const columnIsNamed = dateTimeField.named;
        const inputColumnReference = columnIsNamed ? `'${columnName}'` : columnName;
        // Determine the output column reference
        let outputColumnReference = inputColumnReference;
        if (newColumn) {
            const newColumnName = config.newColumnName && config.newColumnName.trim()
                ? config.newColumnName
                : `${columnName}_converted`;
            outputColumnReference = `'${newColumnName}'`;
        }
        // The locale depends on the OS
        // Use user agent for best guess, otherwise fall back to Linux/Mac
        const isWindows = navigator.userAgent.includes("Windows");
        // Equivalence table between Linux/macOS and Windows locales
        const localeMap = {
            "en_US.UTF-8": "English_United States",
            "en_GB.UTF-8": "English_United Kingdom",
            "fr_FR.UTF-8": "French_France",
            "de_DE.UTF-8": "German_Germany",
            "es_ES.UTF-8": "Spanish_Spain",
            "it_IT.UTF-8": "Italian_Italy",
            "pt_PT.UTF-8": "Portuguese_Portugal",
            "pt_BR.UTF-8": "Portuguese_Brazil",
            "ja_JP.UTF-8": "Japanese_Japan",
            "ko_KR.UTF-8": "Korean_Korea",
            "zh_CN.UTF-8": "Chinese_People's Republic of China",
            "zh_TW.UTF-8": "Chinese_Taiwan",
            "nl_NL.UTF-8": "Dutch_Netherlands",
            "ru_RU.UTF-8": "Russian_Russia",
            "sv_SE.UTF-8": "Swedish_Sweden",
            "da_DK.UTF-8": "Danish_Denmark",
            "fi_FI.UTF-8": "Finnish_Finland",
            "nb_NO.UTF-8": "Norwegian_Norway",
            "pl_PL.UTF-8": "Polish_Poland",
            "tr_TR.UTF-8": "Turkish_Turkey",
            "cs_CZ.UTF-8": "Czech_Czech Republic",
            "hu_HU.UTF-8": "Hungarian_Hungary",
            "el_GR.UTF-8": "Greek_Greece",
        };
        let code = "";
        // Only set locale if language is specified
        if (language) {
            let locale = language;
            // If Windows is detected, map the Linux locale to the equivalent Windows locale
            if (isWindows && localeMap[language]) {
                locale = localeMap[language];
            }
            code += `
# Set the locale for date parsing/formatting
locale.setlocale(locale.LC_TIME, '${locale}')
        `;
        }
        code += `
${outputName} = ${inputName}.copy()
`;
        if (conversionType === "dateToString") {
            code += `
# Convert date/time column to string with specified format
${outputName}[${outputColumnReference}] = ${outputName}[${inputColumnReference}].dt.strftime('${dateTimeFormat}').astype('string')
`;
        }
        else if (conversionType === "stringToDate") {
            if (dateTimeFormat === "auto") {
                code += `
# Convert string column to datetime with auto-detected format
${outputName}[${outputColumnReference}] = ${prefix}.to_datetime(${outputName}[${inputColumnReference}], infer_datetime_format=True)
`;
            }
            else {
                code += `
# Convert string column to datetime with specified format
${outputName}[${outputColumnReference}] = ${prefix}.to_datetime(${outputName}[${inputColumnReference}], format='${dateTimeFormat}')
`;
            }
        }
        return code;
    }
}


/***/ },

/***/ "./lib/components/transforms/Deduplicate.js"
/*!**************************************************!*\
  !*** ./lib/components/transforms/Deduplicate.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Deduplicate: () => (/* binding */ Deduplicate)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class Deduplicate extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = { keep: "first" };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "select",
                    label: "Keep (survivorship)",
                    id: "keep",
                    options: [
                        {
                            value: "first",
                            label: "First occurrence",
                            tooltip: "Drop duplicates except for the first occurrence",
                        },
                        {
                            value: "last",
                            label: "Last occurrence",
                            tooltip: "Drop duplicates except for the last occurrence",
                        },
                        {
                            value: "False",
                            label: "Drop all",
                            tooltip: "Drop all duplicates",
                        },
                    ],
                },
                {
                    type: "columns",
                    label: "Columns",
                    id: "subset",
                    placeholder: "All columns",
                    tooltip: "Columns considered for identifying duplicates. Leave empty to consider all columns.",
                },
            ],
        };
        // const description = "Use Deduplicate to remove duplicate rows based on values on one or more columns.";
        const description = "使用“去重”功能，可以根据一个或多个列中的值来删除重复的行。";
        super(
        // "Deduplicate Rows",
        "去重行", "deduplicateData", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.dedupIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return [];
    }
    generateComponentCode({ config, inputName, outputName }) {
        // Initializing code string
        let code = `
  # Deduplicate rows\n`;
        // Ensuring config.subset is defined and has a length property
        const subset = config.subset && Array.isArray(config.subset) ? config.subset : [];
        const columns = subset.length > 0
            ? `subset=[${subset
                .map((column) => column.named ? `"${column.value.trim()}"` : column.value)
                .join(", ")}]`
            : "";
        // Adjusting keep parameter based on config.keep value
        let keep;
        if (typeof config.keep === "boolean") {
            keep = config.keep ? `"first"` : "False";
        }
        else {
            keep = config.keep === "False" ? "False" : `"${config.keep}"`;
        }
        // Generating the code for deduplication
        code += `${outputName} = ${inputName}.drop_duplicates(${columns}${columns && keep
            ? `, keep=${keep}`
            : !columns && keep
                ? `keep=${keep}`
                : ""})\n`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/transforms/DynamicGenerateCalendar.js"
/*!**************************************************************!*\
  !*** ./lib/components/transforms/DynamicGenerateCalendar.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DynamicGenerateCalendar: () => (/* binding */ DynamicGenerateCalendar)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class DynamicGenerateCalendar extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        // const description = 'Generate a Calendar Dynamically';
        const description = "动态生成日历";
        const defaultConfig = {
            tsCFdateFromDate: "",
            tsCFbooleanFromToday: true,
            tsCFinputNumberFromXBack: "",
            tsCFselectFromWhatBack: "days",
            tsCFcolumnFromColumn: "",
            tsCFdateToDate: "",
            tsCFbooleanToToday: true,
            tsCFinputNumberToXAhead: "",
            tsCFselectToWhatAhead: "days",
            tsCFcolumnToColumn: "",
            tsCFselectMultipleCustomizableFieldsToInclude: ["date"],
            // tsCFSelectinputEngine:"pandas",
            tsCFSelectoutputEngine: "pandas",
        };
        const form = {
            idPrefix: "component__form_name_input_hello_df",
            fields: [
                {
                    type: "date",
                    label: "From Date",
                    id: "tsCFdateFromDate",
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "From Today",
                    id: "tsCFbooleanFromToday",
                    advanced: true,
                },
                {
                    type: "column",
                    label: "From Column",
                    id: "tsCFcolumnFromColumn",
                    advanced: true,
                },
                {
                    type: "inputNumber",
                    label: "From X Back",
                    id: "tsCFinputNumberFromXBack",
                    advanced: true,
                },
                {
                    type: "select",
                    label: "From what back",
                    id: "tsCFselectFromWhatBack",
                    options: [
                        { value: "days", label: "Days" },
                        { value: "weeks", label: "Weeks" },
                        { value: "months", label: "Months" },
                        { value: "years", label: "Years" },
                    ],
                    advanced: true,
                },
                {
                    type: "date",
                    label: "To Date",
                    id: "tsCFdateToDate",
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "To Today",
                    id: "tsCFbooleanToToday",
                    advanced: true,
                },
                {
                    type: "column",
                    label: "To Column",
                    id: "tsCFcolumnToColumn",
                    advanced: true,
                },
                {
                    type: "inputNumber",
                    label: "To X Ahead",
                    id: "tsCFinputNumberToXAhead",
                    advanced: true,
                },
                {
                    type: "select",
                    label: "To What Ahead",
                    id: "tsCFselectToWhatAhead",
                    options: [
                        { value: "days", label: "Days" },
                        { value: "weeks", label: "Weeks" },
                        { value: "months", label: "Months" },
                        { value: "years", label: "Years" },
                    ],
                    advanced: true,
                },
                {
                    type: "selectMultipleCustomizable",
                    label: "Fields to include",
                    id: "tsCFselectMultipleCustomizableFieldsToInclude",
                    options: [
                        { value: "date", label: "Date" },
                        { value: "year", label: "Year" },
                        { value: "month_name", label: "Month Name" },
                        { value: "month_number", label: " Month Number" },
                        { value: "weekday_name", label: "Weekday Name" },
                        { value: "weekday_number", label: "Weekday Number" },
                        { value: "week", label: "Week" },
                        { value: "weekend_flag", label: "Week-End Flag" },
                    ],
                    advanced: true,
                },
                // {
                // type: "select",
                // label: "Input Engine",
                // id: "tsCFSelectinputEngine",
                // options: [
                // { value: "pandas", label: "Pandas", tooltip: "Mature, easy-to-use, great for small-to-medium datasets." },
                // { value: "polars", label: "Polars", tooltip: "Fast, memory-efficient, great for large-scale in-memory analytics." },
                // { value: "duckdb", label: "DuckDB", tooltip: "SQL-based, excellent for large datasets" }
                // ],
                // advanced: true
                // },
                {
                    type: "select",
                    label: "Output Engine",
                    id: "tsCFSelectoutputEngine",
                    options: [
                        {
                            value: "pandas",
                            label: "Pandas",
                            tooltip: "Mature, easy-to-use, great for small-to-medium datasets.",
                        },
                        {
                            value: "polars",
                            label: "Polars",
                            tooltip: "Fast, memory-efficient, great for large-scale in-memory analytics.",
                        },
                        {
                            value: "duckdb",
                            label: "DuckDB",
                            tooltip: "SQL-based, excellent for large datasets",
                        },
                    ],
                    advanced: true,
                },
            ],
        };
        super(
        //   "Dynamic Calendar",
        "动态日历", "DynamicGenerateCalendar", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.dynamicGenerateCalendarIcon, defaultConfig, form);
    }
    provideImports() {
        return [
            "from datetime import date, datetime",
            "from dateutil.relativedelta import relativedelta",
            "import pandas as pd",
            "import polars as pl",
            "import duckdb",
            "from typing import Optional, Union, Dict, Tuple, List",
        ];
    }
    provideFunctions({ config }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        const tsDynamicGenerateCalendarFunction = `
def py_fn_dynamic_generate_calendar(
    py_arg_from_date: date = None,
    py_arg_from_today: bool = False,
    py_arg_from_x_back: int = None,
    py_arg_from_what_back: str = None,
    py_arg_from_dataframe: pd.DataFrame = None,
    py_arg_from_column: str = None,
    py_arg_to_date: date = None,
    py_arg_to_today: bool = False,
    py_arg_to_column: str = None,
    py_arg_to_x_ahead: int = None,
    py_arg_to_what_ahead: str = None,
    py_arg_to_dataframe: pd.DataFrame = None,
    py_arg_calendar_fields_to_include: List[str] = None,
    py_arg_input_engine: str = "pandas",
    py_arg_output_engine: str = "pandas"
):
    """
    Generate a calendar dataframe between a computed start date and end date.

    The start ("from") and end ("to") dates can be derived from:
    - Explicit dates
    - Today
    - Relative offsets (days, weeks, months, years)
    - Min / max values from a dataframe column

    The output calendar can include optional date-related attributes such as
    year, month, weekday, week number, and weekend flag.

    Supported engines:
    - pandas
    - polars
    - duckdb (via pandas intermediary)

    Returns
    -------
    pandas.DataFrame | polars.DataFrame | duckdb relation
        Calendar dataframe in the requested output engine.
    """

    # -----------------------------
    # Helper: resolve base date
    # -----------------------------
    def py_fn_resolve_base_date_dyn(
        py_arg_date,
        py_arg_today,
        py_arg_dataframe,
        py_arg_column,
        py_arg_engine,
        py_arg_minmax,
    ):
        if py_arg_date is not None:
            return pd.to_datetime(py_arg_date).date()

        if py_arg_today:
            return date.today()

        if py_arg_dataframe is not None and py_arg_column is not None:
            if py_arg_engine == "pandas":
                series = py_arg_dataframe[py_arg_column]
            elif py_arg_engine == "polars":
                series = py_arg_dataframe.select(py_arg_column).to_series().to_pandas()
            elif py_arg_engine == "duckdb":
                series = py_arg_dataframe.df()[py_arg_column]
            else:
                raise ValueError("Unsupported input engine")

            if py_arg_minmax == "min":
                return pd.to_datetime(series.min()).date()
            else:
                return pd.to_datetime(series.max()).date()

        raise ValueError("Unable to resolve base date")

    # -----------------------------
    # Helper: apply offset
    # -----------------------------
    def py_fn_apply_calendar_offset(
    py_arg_base_date,
    py_arg_x,
    py_arg_what,
    py_arg_direction
    ):
        if py_arg_x is None or py_arg_what is None:
            return py_arg_base_date

        py_var_multiplier = -1 if py_arg_direction == "back" else 1

        if py_arg_what == "days":
            return py_arg_base_date + relativedelta(days=py_var_multiplier * py_arg_x)
        if py_arg_what == "weeks":
            return py_arg_base_date + relativedelta(weeks=py_var_multiplier * py_arg_x)
        if py_arg_what == "months":
            return py_arg_base_date + relativedelta(months=py_var_multiplier * py_arg_x)
        if py_arg_what == "years":
            return py_arg_base_date + relativedelta(years=py_var_multiplier * py_arg_x)

        raise ValueError("Invalid offset unit")

    # -----------------------------
    # Resolve FROM date
    # -----------------------------
    py_var_from_base_date = py_fn_resolve_base_date_dyn(
        py_arg_from_date,
        py_arg_from_today,
        py_arg_from_dataframe,
        py_arg_from_column,
        py_arg_input_engine,
        py_arg_minmax="min",
    )

    py_var_from_date = py_fn_apply_calendar_offset(
        py_var_from_base_date,
        py_arg_from_x_back,
        py_arg_from_what_back,
        py_arg_direction="back",
    )

    # -----------------------------
    # Resolve TO date
    # -----------------------------
    py_var_to_base_date = py_fn_resolve_base_date_dyn(
        py_arg_to_date,
        py_arg_to_today,
        py_arg_to_dataframe,
        py_arg_to_column,
        py_arg_input_engine,
        py_arg_minmax="max",
    )

    py_var_to_date = py_fn_apply_calendar_offset(
        py_var_to_base_date,
        py_arg_to_x_ahead,
        py_arg_to_what_ahead,
        py_arg_direction="ahead",
    )

    if py_var_from_date > py_var_to_date:
        raise ValueError("py_var_from_date must be <= py_var_to_date")

    # -----------------------------
    # Generate calendar (pandas base)
    # -----------------------------
    py_df_calendar = pd.DataFrame(
        #{"calendar_date": pd.date_range(start=py_var_from_date, end=py_var_to_date, freq="D").date}
		{"calendar_date": pd.date_range(start=py_var_from_date, end=py_var_to_date, freq="D")}
    )
 
    # Use py_arg_calendar_fields_to_include to determine which fields to include
    if py_arg_calendar_fields_to_include is not None:
        if "year" in py_arg_calendar_fields_to_include:
            py_df_calendar["year"] = py_df_calendar["calendar_date"].dt.year
        if "month_number" in py_arg_calendar_fields_to_include:
            py_df_calendar["month_number"] = py_df_calendar["calendar_date"].dt.month
        if "month_name" in py_arg_calendar_fields_to_include:
            py_df_calendar["month_name"] = py_df_calendar["calendar_date"].dt.month_name().astype("string")
        if "weekday_number" in py_arg_calendar_fields_to_include:
            py_df_calendar["weekday_number"] = py_df_calendar["calendar_date"].dt.weekday + 1
        if "weekday_name" in py_arg_calendar_fields_to_include:
            py_df_calendar["weekday_name"] = py_df_calendar["calendar_date"].dt.day_name().astype("string")
        if "week" in py_arg_calendar_fields_to_include:
            py_df_calendar["week"] = py_df_calendar["calendar_date"].dt.isocalendar().week.astype(int)
        if "weekend_flag" in py_arg_calendar_fields_to_include:
            py_df_calendar["is_weekend"] = py_df_calendar["calendar_date"].dt.weekday >= 5
        if "date" not in py_arg_calendar_fields_to_include:
            py_df_calendar = py_df_calendar.drop(columns=["calendar_date"])
            #without calendar_date, you may have duplicates			
            py_df_calendar=py_df_calendar.drop_duplicates()
    else:
        # Default behavior if py_arg_calendar_fields_to_include is not provided
        py_df_calendar = py_df_calendar.drop(columns=["calendar_date"])
	
		
    # -----------------------------
    # Convert output engine
    # -----------------------------
    if py_arg_output_engine == "pandas":
        return py_df_calendar
    if py_arg_output_engine == "polars":
        return pl.from_pandas(py_df_calendar)
    if py_arg_output_engine == "duckdb":      
        return duckdb.from_df(py_df_calendar)
    raise ValueError("Unsupported output engine")
	    `;
        return [tsDynamicGenerateCalendarFunction];
    }
    generateComponentCode({ config, inputName, outputName }) {
        const tsConsFieldsToInclude = JSON.stringify(config.tsCFselectMultipleCustomizableFieldsToInclude);
        let tsConstFromDate = "None";
        if (config.tsCFdateFromDate && config.tsCFdateFromDate.trim() !== "") {
            tsConstFromDate = '"' + config.tsCFdateFromDate + '"';
        }
        let tsConstToDate = "None";
        if (config.tsCFdateToDate && config.tsCFdateToDate.trim() !== "") {
            tsConstToDate = '"' + config.tsCFdateToDate + '"';
        }
        let tsConstFromWhatBack = "None";
        if (config.tsCFselectFromWhatBack &&
            config.tsCFselectFromWhatBack.trim() !== "") {
            tsConstFromWhatBack = '"' + config.tsCFselectFromWhatBack + '"';
        }
        let tsConstToWhatAhead = "None";
        if (config.tsCFselectToWhatAhead &&
            config.tsCFselectToWhatAhead.trim() !== "") {
            tsConstToWhatAhead = '"' + config.tsCFselectToWhatAhead + '"';
        }
        let tsConstFromXBack = 0;
        if (config.tsCFinputNumberFromXBack) {
            tsConstFromXBack = config.tsCFinputNumberFromXBack;
        }
        let tsConstToXAhead = 0;
        if (config.tsCFinputNumberToXAhead) {
            tsConstToXAhead = config.tsCFinputNumberToXAhead;
        }
        let tsConstFromToday = config.tsCFbooleanFromToday ? "True" : "False";
        let tsConstToToday = config.tsCFbooleanToToday ? "True" : "False";
        let tsConstFromColumn = "None";
        if (config.tsCFcolumnFromColumn &&
            config.tsCFcolumnFromColumn.value.trim() !== "") {
            tsConstFromColumn = '"' + config.tsCFcolumnFromColumn.value + '"';
        }
        let tsConstToColumn = "None";
        if (config.tsCFcolumnToColumn &&
            config.tsCFcolumnToColumn.value.trim() !== "") {
            tsConstToColumn = '"' + config.tsCFcolumnToColumn.value + '"';
        }
        return `
${outputName}=py_fn_dynamic_generate_calendar(
    py_arg_from_date = ${tsConstFromDate},
    py_arg_from_today = ${tsConstFromToday},
    py_arg_from_x_back = ${tsConstFromXBack},
    py_arg_from_what_back = ${tsConstFromWhatBack},
    py_arg_from_dataframe = ${inputName},
    py_arg_from_column =  ${tsConstFromColumn},
    py_arg_to_date = ${tsConstToDate},
    py_arg_to_today = ${tsConstToToday},
    py_arg_to_x_ahead = ${tsConstToXAhead},
    py_arg_to_what_ahead = ${tsConstToWhatAhead},
    py_arg_to_dataframe =  ${inputName}, 
    py_arg_to_column =  ${tsConstToColumn}, 
    py_arg_calendar_fields_to_include = ${tsConsFieldsToInclude},
    #py_arg_input_engine = '${config.tsCFSelectoutputEngine}', #replace by input
    py_arg_output_engine = '${config.tsCFSelectoutputEngine}'
    )
`.trim();
    }
}


/***/ },

/***/ "./lib/components/transforms/Extract.js"
/*!**********************************************!*\
  !*** ./lib/components/transforms/Extract.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Extract: () => (/* binding */ Extract)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class Extract extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {};
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "column",
                    label: "Column name",
                    id: "column",
                    placeholder: "Column name",
                },
                {
                    type: "select",
                    label: "Regular Expression",
                    id: "regex",
                    tooltip: "Select a type of data or custom regex",
                    placeholder: "Select type or type regex",
                    options: [
                        //?: for non capturing groups, else all groups are sent. beware to escape backslach with doubling it. moreover for respect of dropdown menu, it must be in parenthesis
                        {
                            value: "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$)",
                            label: "Email",
                        },
                        {
                            value: "(^(?:(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\\\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\]))$)",
                            label: "Email - RFC 5322",
                        },
                        {
                            value: "(https?://(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b(?:[-a-zA-Z0-9@:%_\\+.~#?&//=]*))",
                            label: "URL",
                        },
                        {
                            value: "(\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b)",
                            label: "IPv4 Address",
                        },
                        {
                            value: "(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})",
                            label: "IPv6 Address",
                        },
                        {
                            value: "(\\b\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}\\b)",
                            label: "Credit Card",
                        },
                        { value: "(\\b\\d{3}-\\d{2}-\\d{4}\\b)", label: "SSN" },
                        { value: "(\\b\\d{1,3}(\\.\\d{1,2})?%\\b)", label: "Percentage" },
                        { value: '("([^"\\\\]*(\\\\.[^"\\\\]*)*))', label: "JSON String" },
                        { value: "(\\b\\d{3}-\\d{10}\\b)", label: "ISBN" },
                        {
                            value: "(^(?:\\d{4})[-](?:0[1-9]|1[1-2])[-](?:0[1-9]|[12][0-9]|3[01])$)",
                            label: "Date (YYYY-MM-DD)",
                        },
                        {
                            value: "(^(?:\\d{4})[/](?:0[1-9]|1[1-2])[/](?:0[1-9]|[12][0-9]|3[01])$)",
                            label: "Date (YYYY/MM/DD)",
                        },
                        {
                            value: "(^(?:\\d{4})[.](?:0[1-9]|1[1-2])[.](?:0[1-9]|[12][0-9]|3[01])$)",
                            label: "Date (YYYY.MM.DD)",
                        },
                        {
                            value: "(^(?:0[1-9]|[12][0-9]|3[01])[/](?:0[1-9]|1[1-2])[/](?:\\d{4})$)",
                            label: "Date (DD/MM/YYYY)",
                        },
                        {
                            value: "(^(?:0[1-9]|[12][0-9]|3[01])[-](?:0[1-9]|1[1-2])[-](?:\\d{4})$)",
                            label: "Date (DD-MM-YYYY)",
                        },
                        {
                            value: "(^(?:0[1-9]|[12][0-9]|3[01])[.](?:0[1-9]|1[1-2])[.](?:\\d{4})$)",
                            label: "Date (DD.MM.YYYY)",
                        },
                        {
                            value: "(^(?:0[1-9]|[12][0-9]|3[01])[/](?:0[1-9]|1[1-2])[/](?:\\d{2})$)",
                            label: "Date (DD/MM/YY)",
                        },
                        {
                            value: "(^(?:0[1-9]|[12][0-9]|3[01])[-](?:0[1-9]|1[1-2])[-](?:\\d{2})$)",
                            label: "Date (DD-MM-YY)",
                        },
                        {
                            value: "(^(?:0[1-9]|[12][0-9]|3[01])[.](?:0[1-9]|1[1-2])[.](?:\\d{2})$)",
                            label: "Date (DD.MM.YY)",
                        },
                        {
                            value: "(^(?:0[1-9]|1[1-2])[/](?:0[1-9]|[12][0-9]|3[01])[/](?:\\d{4})$)",
                            label: "Date (MM/DD/YYYY)",
                        },
                        {
                            value: "(^(?:0[1-9]|1[1-2])[-](?:0[1-9]|[12][0-9]|3[01])[-](?:\\d{4})$)",
                            label: "Date (MM-DD-YYYY)",
                        },
                        {
                            value: "(^(?:0[1-9]|1[1-2])[.](?:0[1-9]|[12][0-9]|3[01])[.](?:\\d{2})$)",
                            label: "Date (MM.DD.YYYY)",
                        },
                        {
                            value: "(^(?:0[1-9]|1[1-2])[/](?:0[1-9]|[12][0-9]|3[01])[/](?:\\d{2})$)",
                            label: "Date (MM/DD/YY)",
                        },
                        {
                            value: "(^(?:0[1-9]|1[1-2])[-](?:0[1-9]|[12][0-9]|3[01])[-](?:\\d{2})$)",
                            label: "Date (MM-DD-YY)",
                        },
                        {
                            value: "(^(?:0[1-9]|1[1-2])[.](?:0[1-9]|[12][0-9]|3[01])[.](?:\\d{2})$)",
                            label: "Date (MM.DD.YY)",
                        },
                        { value: "custom", label: "Custom RegEx" },
                    ],
                },
                {
                    type: "codeTextarea",
                    label: "Custom RegEx",
                    tooltip: "Write a custom regex (PCRE: Perl Compatible Regular Expressions)",
                    id: "customRegex",
                    mode: "python",
                    height: "300px",
                    placeholder: "^((?:0[1-9]|1[1-2])[.](?:0[1-9]|[12][0-9]|3[01])[.])$",
                    aiInstructions: "Generate only the raw regular expression pattern with at least one capturing group, no Python code, no quotes, and no prefix like r''. The regex should be compatible with pandas' .str.extract(). For example: ([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+)",
                    aiGeneration: true,
                    aiPromptExamples: [
                        {
                            label: "Extract French phone numbers",
                            value: "Write a RegEx to extract french phone numbers.",
                        },
                        {
                            label: "Extract dates",
                            value: "Extract dates that matches format like 12/31/2025 or 31-12-2025.",
                        },
                    ],
                    advanced: true,
                    condition: { regex: "custom" },
                },
                {
                    type: "select",
                    label: "Flags",
                    id: "flags",
                    placeholder: "Type or select",
                    tooltip: "Choose a flag to modify how the regular expression behaves when parsing data in pandas. These flags control case sensitivity, multiline handling, Unicode matching, and more.",
                    options: [
                        {
                            value: "IGNORECASE",
                            label: "Ignore Case",
                            tooltip: "Makes the match case-insensitive. For example, it will match both 'abc' and 'ABC'.",
                        },
                        {
                            value: "MULTILINE",
                            label: "Multiline",
                            tooltip: "Changes the behavior of ^ and $ to match the start and end of each line, not just the start and end of the whole string.",
                        },
                        {
                            value: "DOTALL",
                            label: "Dot All",
                            tooltip: "Makes the . match any character at all, including a newline; without this flag, . will match anything except a newline.",
                        },
                        {
                            value: "UNICODE",
                            label: "Unicode",
                            tooltip: "Makes \\w, \\W, \\b, \\B, \\d, \\D, \\s, and \\S sequences dependent on the Unicode character properties database. This is the default behavior in Python 3 for strings.",
                        },
                        {
                            value: "ASCII",
                            label: "ASCII",
                            tooltip: "Makes \\w, \\W, \\b, \\B, \\d, \\D, \\s, and \\S perform ASCII-only matching instead of full Unicode matching.",
                        },
                        {
                            value: "VERBOSE",
                            label: "Verbose",
                            tooltip: "Allows you to write regular expressions that are more readable by permitting whitespace and comments within the pattern string.",
                        },
                    ],
                    advanced: true,
                },
            ],
        };
        // const description = "Use Parse & Extract to parse data from columns based on a pattern (pre-defined RegEx or custom).";
        const description = "使用“解析与提取”功能，可以根据特定模式（预定义的正则表达式或自定义模式）从列中解析数据。";
        super(
        // "Parse & Extract",
        "解析与提取", "extract", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.extractIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return ["import re"];
    }
    generateComponentCode({ config, inputName, outputName }) {
        var _a;
        const columnName = config.column.value;
        const columnNamed = config.column.named;
        const columnAccess = columnNamed ? `'${columnName}'` : `${columnName}`;
        const isCustom = config.regex === "custom";
        const regex = isCustom && config.customRegex ? config.customRegex : config.regex;
        let flagsCode = "";
        if (config.flags && config.flags.trim() !== "") {
            const flags = config.flags
                .split(",")
                .filter((flag) => flag.trim() !== "")
                .map((flag) => `re.${flag}`)
                .join(" | ");
            flagsCode = `, flags=${flags}`;
        }
        const groupCount = ((_a = new RegExp(regex + "|").exec("")) === null || _a === void 0 ? void 0 : _a.length) - 1 || 1;
        const columnNames = Array.from({ length: groupCount }, (_, i) => `"${outputName}_${i + 1}"`).join(", ");
        const extractedVarName = `${outputName}_extracted`;
        const code = `
# Extract data using regex
${extractedVarName} = ${inputName}[${columnAccess}].str.extract(r"""${regex}"""${flagsCode})
${extractedVarName}.columns = [${columnNames}]
${outputName} = ${inputName}.join(${extractedVarName}, rsuffix="_extracted")
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/transforms/Filter.js"
/*!*********************************************!*\
  !*** ./lib/components/transforms/Filter.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Filter: () => (/* binding */ Filter)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class Filter extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = { filterType: "basic", condition: "==" };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "类型",
                    id: "filterType",
                    options: [
                        { value: "basic", label: "基础" },
                        { value: "advanced", label: "高级" },
                    ],
                    advanced: true,
                },
                {
                    type: "column",
                    label: "Column name",
                    id: "column",
                    placeholder: "Select column",
                    condition: { filterType: "basic" },
                },
                {
                    type: "select",
                    label: "Condition",
                    id: "condition",
                    placeholder: "Select condition",
                    options: [
                        { value: "==", label: "==" },
                        { value: "!=", label: "!=" },
                        { value: ">", label: ">" },
                        { value: "<", label: "<" },
                        { value: ">=", label: ">=" },
                        { value: "<=", label: "<=" },
                        { value: "notnull", label: "Not Null" },
                        { value: "isnull", label: "Is Null" },
                        { value: "notempty", label: "Not Empty" },
                        { value: "isempty", label: "Is Empty" },
                        { value: "contains", label: "Contains (string)" },
                        { value: "not contains", label: "Not contains (string)" },
                        { value: "startswith", label: "Starts With (string)" },
                        { value: "endswith", label: "Ends With (string)" },
                    ],
                    condition: { filterType: "basic" },
                },
                {
                    type: "input",
                    label: "Value",
                    id: "conditionValue",
                    placeholder: "Any string of characters (enforce numbers if needed)",
                    condition: { filterType: "basic" },
                },
                {
                    type: "boolean",
                    label: "Enforce value as string",
                    id: "enforceString",
                    condition: { filterType: "basic" },
                    advanced: true,
                },
                {
                    type: "codeTextarea",
                    label: "Python Expression",
                    mode: "python",
                    id: "pythonExpression",
                    tooltip: "Enter a valid pandas query expression. This should be combining column names, values, and logical operators (e.g., ==, and, or, notnull()). Do not include variable assignments, print statements, or comments.",
                    placeholder: "(firstName == 'Bob' or Lastname == 'SMITH') and Age > 50",
                    aiInstructions: "Generate only the Python expression to be used within the query attribute of a pandas filter.\nIMPORTANT: Return only the expression string, ensuring it is valid for pandas.DataFrame.query. Do not include display or print statements, variable assignments, or explanatory comments.",
                    aiGeneration: true,
                    aiPromptExamples: [
                        {
                            label: "Simple equality filter",
                            value: "Filter rows where BillingCountry is 'France'.",
                        },
                        {
                            label: "Multiple conditions",
                            value: "Filter rows where Industry is 'Technology' and CurrencyIsoCode is 'USD'.",
                        },
                        {
                            label: "Null check",
                            value: "Filter rows where BillingPostalCode is not null.",
                        },
                        {
                            label: "Date comparison",
                            value: "Filter rows where CreatedDate is on or after '2020-01-01'.",
                        },
                        {
                            label: "List membership",
                            value: "Filter rows where Industry is either 'Technology' or 'Healthcare'.",
                        },
                    ],
                    condition: { filterType: "advanced" },
                    advanced: true,
                },
            ],
        };
        // const description = "Use Filter Rows to select and output data that meets a specified condition.";
        const description = "使用“筛选行”功能来选择并输出符合指定条件的数据。";
        super(
        // "Filter Rows",
        "筛选行", "filter", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.filterIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return [];
    }
    generateComponentCode({ config, inputName, outputName, }) {
        /* ---------- advanced mode ---------- */
        if (config.filterType === "advanced") {
            const expr = String(config.pythonExpression || "").replace(/"/g, '\\"');
            return `
# Advanced filter using pandas.DataFrame.query
${outputName} = ${inputName}.query("${expr}")
`;
        }
        /* ---------- basic mode ---------- */
        const columnName = config.column.value;
        const columnType = config.column.type;
        const columnIsNamed = config.column.named;
        const condition = config.condition;
        const conditionValue = config.conditionValue;
        const enforceString = config.enforceString;
        let code = `
# Filter rows based on condition
`;
        let queryExpression;
        let conditionValueReference;
        let columnReference;
        switch (condition) {
            case "==":
            case "!=":
            case ">":
            case "<":
            case ">=":
            case "<=":
                columnReference = `'${columnName}'`;
                conditionValueReference =
                    enforceString || ["string", "category", "object"].includes(columnType)
                        ? `'${conditionValue}'`
                        : `${conditionValue}`;
                code += `${outputName} = ${inputName}[${inputName}[${columnReference}] ${condition} ${conditionValueReference}]`;
                break;
            case "contains":
            case "not contains":
                columnReference = columnIsNamed ? `'${columnName}'` : columnName;
                if (["string", "object", "category"].includes(columnType)) {
                    const neg = condition === "not contains" ? "~" : "";
                    code += `${outputName} = ${inputName}[${neg}${inputName}[${columnReference}].str.contains("${conditionValue}", na=False)]`;
                }
                else {
                    throw new Error("Invalid operation for the data type");
                }
                break;
            case "startswith":
            case "endswith":
                columnReference = columnIsNamed ? `'${columnName}'` : columnName;
                if (["string", "object", "category"].includes(columnType)) {
                    code += `${outputName} = ${inputName}[${inputName}[${columnReference}].str.${condition}("${conditionValue}", na=False)]`;
                }
                else {
                    throw new Error("Invalid operation for the data type");
                }
                break;
            case "notnull":
                columnReference = columnIsNamed ? `'${columnName}'` : columnName;
                code += `${outputName} = ${inputName}.dropna(subset=[${columnReference}])`;
                break;
            case "isnull":
                columnReference = columnIsNamed ? `'${columnName}'` : columnName;
                code += `${outputName} = ${inputName}[${inputName}[${columnReference}].isna()]`;
                break;
            default: {
                // Quote column name with back‑ticks only if it contains non‑alphanumeric chars
                const needsBackticks = /[^a-zA-Z0-9_]/.test(columnName);
                columnReference = needsBackticks ? `\`${columnName}\`` : columnName;
                queryExpression = `${columnReference} ${condition} '${conditionValue}'`;
                code += `${outputName} = ${inputName}.query("${queryExpression}")`;
                break;
            }
        }
        return code + "\n";
    }
}


/***/ },

/***/ "./lib/components/transforms/FilterColumns.js"
/*!****************************************************!*\
  !*** ./lib/components/transforms/FilterColumns.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FilterColumns: () => (/* binding */ FilterColumns)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class FilterColumns extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = { columns: { sourceData: [], targetKeys: [] } };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "info",
                    label: "Instructions",
                    id: "instructions",
                    text: "选择您想要保留的列，然后通过拖拽操作将它们重新排列顺序。",
                },
                {
                    type: "transferData",
                    label: "Filter columns",
                    id: "columns",
                    advanced: true,
                },
            ],
        };
        // const description = "Use Select Columns to select and reorder columns.";
        const description = "使用“选择列”功能来选择并重新排列列。";
        super(
        // "Select Columns",
        "选择列", "filterColumn", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.columnRemoveIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return [];
    }
    generateComponentCode({ config, inputName, outputName }) {
        const allColumns = config.columns.sourceData;
        const targetKeys = config.columns.targetKeys;
        // Prepare column references, handling named and unnamed columns
        const columnsToKeep = targetKeys
            .map((key) => {
            const column = allColumns.find((c) => c.value === key);
            return column && column.named ? `"${key.trim()}"` : `${key.trim()}`;
        })
            .join(", ");
        // Python code generation for DataFrame operation
        const code = `
# Filter and order columns
${outputName} = ${inputName}[[${columnsToKeep}]]
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/transforms/FrequencyAnalysis.js"
/*!********************************************************!*\
  !*** ./lib/components/transforms/FrequencyAnalysis.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FrequencyAnalysis: () => (/* binding */ FrequencyAnalysis)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class FrequencyAnalysis extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            columns: [],
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "columns",
                    label: "Columns to analyze",
                    id: "columns",
                    placeholder: "Leave blank to analyze all columns",
                },
            ],
        };
        // const description = "Turn selected columns into simple frequency tables. For every unique value you get the count, percent, and cumulative totals. The results are combined into one table.";
        const description = "将选定的列转换为简单的频率表。对于每一个唯一的值，都会显示其计数、百分比以及累计总和。所有结果会合并到一个表格中。";
        super(
        // "Frequency Analysis",
        "频率分析", "frequencyAnalysis", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[2], _icons__WEBPACK_IMPORTED_MODULE_0__.activityIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return ["import pandas as pd"];
    }
    provideFunctions({ config }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        // Function to perform frequency analysis
        const frequencyAnalysisFunction = `
# Function to perform frequency analysis
def frequency_analysis(df, column_name):
    # Frequency counts
    frequency = df[column_name].value_counts(dropna=False)
    percentage = df[column_name].value_counts(normalize=True, dropna=False) * 100
    
    # Cumulative frequency and percentage
    cumulative_frequency = frequency.cumsum()
    cumulative_percent = percentage.cumsum()

    # Combine all into a DataFrame
    result = ${prefix}.DataFrame({
        'Field Name': column_name,
        'Field Value': frequency.index,
        'Frequency': frequency.values,
        'Percent': percentage.values,
        'Cumulative Frequency': cumulative_frequency.values,
        'Cumulative Percent': cumulative_percent.values
    })
    return result
    `;
        return [frequencyAnalysisFunction];
    }
    generateComponentCode({ config, inputName, outputName, }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        const selectedColumns = config.columns;
        let code = `
# Perform frequency analysis on selected columns
${outputName}_results = []
`;
        // Helper function to get the correct column reference
        const getColumnReference = (column) => {
            return column.named ? `'${column.value}'` : column.value;
        };
        // Check if columns are selected; if not, analyze all columns
        if (selectedColumns && selectedColumns.length > 0) {
            code += selectedColumns
                .map((col) => {
                const columnRef = getColumnReference(col);
                return `
${outputName}_result_${col.value} = frequency_analysis(${inputName}, ${columnRef})
${outputName}_result_${col.value}['Field Name'] = '${col.value}'
${outputName}_results.append(${outputName}_result_${col.value})
`;
            })
                .join("");
            code += `${outputName} = ${prefix}.concat(${outputName}_results, ignore_index=True)\n`;
        }
        else {
            // If no columns are selected, analyze all columns
            code += `
for col in ${inputName}.columns:
    result = frequency_analysis(${inputName}, col)
    ${outputName}_results.append(result)
${outputName} = ${prefix}.concat(${outputName}_results, ignore_index=True)\n`;
        }
        return code + "\n";
    }
}


/***/ },

/***/ "./lib/components/transforms/GenerateIDColumn.js"
/*!*******************************************************!*\
  !*** ./lib/components/transforms/GenerateIDColumn.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GenerateIDColumn: () => (/* binding */ GenerateIDColumn)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");

 // Adjust the import path

class GenerateIDColumn extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            columnType: "int64",
            insertPosition: "first",
            startingValue: 1,
            rowIdName: "ID",
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "inputNumber",
                    label: "Starting Value",
                    id: "startingValue",
                    placeholder: "0",
                    min: 0,
                },
                {
                    type: "radio",
                    label: "Insert Position",
                    id: "insertPosition",
                    options: [
                        { value: "first", label: "First" },
                        { value: "last", label: "Last" },
                    ],
                },
                {
                    type: "input",
                    label: "Name",
                    id: "rowIdName",
                    placeholder: "default ID",
                    tooltip: "you may want to change that if you want a special name or no upper case, or id is already taken",
                    advanced: true,
                },
                {
                    type: "selectCustomizable",
                    label: "Column Type",
                    id: "columnType",
                    options: [
                        { value: "int64", label: "int64", tooltip: "Integer (int64)" },
                        { value: "float64", label: "float64", tooltip: "Float (float64)" },
                    ],
                    advanced: true,
                },
            ],
        };
        // const description = "Use Row ID to assign a unique identifier to each row in a dataset.";
        const description = "使用行标识来为数据集中的每一行分配一个唯一的标识符。";
        super(
        // "Row ID",
        "行标识", "generate_id_column", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.numberIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return ["import pandas as pd"];
    }
    generateComponentCode({ config, inputName, outputName }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        const startingValue = config.startingValue || 1;
        const columnType = config.columnType || "int64";
        const insertPosition = config.insertPosition || "last";
        //if null, undefined or empty
        const const_ts_rowidname = config.rowIdName && config.rowIdName.length > 0 ? config.rowIdName : "ID";
        const idColumn = `range(${startingValue}, ${startingValue} + len(${inputName}))`;
        const idColumnFirst = `['${const_ts_rowidname}'] + ${inputName}.columns.tolist()`;
        const idColumnLast = `${inputName}.columns.tolist() + ['${const_ts_rowidname}']`;
        const code = `
# Generate ID column
#copy the df
${outputName} = ${inputName}.copy()
#insert the new column with its type
${outputName}['${const_ts_rowidname}'] = ${prefix}.Series(${idColumn}, dtype='${columnType}')
#deal with the position
${outputName} = ${outputName}.reindex(columns=${insertPosition === "first" ? idColumnFirst : idColumnLast})
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/transforms/JSON/ExpandList.js"
/*!******************************************************!*\
  !*** ./lib/components/transforms/JSON/ExpandList.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExpandList: () => (/* binding */ ExpandList)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");


class ExpandList extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {};
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "column",
                    label: "Column",
                    id: "column",
                    placeholder: "Select column",
                }
            ]
        };
        const description = "Use Expand JSON List on columns containing JSON list into multiple columns.";
        super("Expand JSON List", "expandList", description, "pandas_df_processor", [], "transforms.JSON", _icons__WEBPACK_IMPORTED_MODULE_0__.expandJsonIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return ["import pandas as pd"];
    }
    generateComponentCode({ config, inputName, outputName }) {
        // Start generating the code string
        const columnName = config.column.value;
        const columnType = config.column.type;
        const columnIsNamed = config.column.named;
        let columnReference;
        columnReference = columnIsNamed ? `'${columnName}'` : columnName;
        let code = `# Expand the list in the specified column\n`;
        code += `${outputName} = ${inputName}[${columnReference}].apply(pd.Series)\n`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/transforms/JSON/FlattenJSON.js"
/*!*******************************************************!*\
  !*** ./lib/components/transforms/JSON/FlattenJSON.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlattenJSON: () => (/* binding */ FlattenJSON)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");


class FlattenJSON extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            boolean_keepColumns: true,
            boolean_alllevels: true,
            selectCustomizable_levelseparator: "."
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "column",
                    label: "Column",
                    id: "column",
                    placeholder: "Select column",
                },
                {
                    type: "boolean",
                    label: "Keep all columns",
                    id: "boolean_keepColumns",
                    advanced: true
                },
                {
                    type: "selectCustomizable",
                    label: "Level Separator",
                    id: "selectCustomizable_levelseparator",
                    placeholder: "default: .",
                    tooltip: "Select or provide a custom delimiter between levels.",
                    options: [
                        { value: ".", label: "point (.)" },
                        { value: "/", label: "slash (/)" },
                        { value: " ", label: "space" },
                        { value: "_", label: "underscore(_)" }
                    ],
                    advanced: true
                },
                {
                    type: "boolean",
                    label: "Flatten all levels",
                    id: "boolean_alllevels",
                    advanced: true
                },
                {
                    type: "inputNumber",
                    tooltip: "Max Level to flatten",
                    label: "Level (index 0)",
                    id: "inputnumber_maxlevel",
                    min: 0,
                    condition: { boolean_alllevels: [false] },
                    advanced: true
                },
            ]
        };
        const description = "Flatten JSON data in a specified column for easier export to CSV.";
        super("Flatten JSON", "flattenJSON", description, "pandas_df_processor", [], "transforms.JSON", _icons__WEBPACK_IMPORTED_MODULE_0__.expandIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return [
            "import pandas as pd",
            "from pandas import json_normalize"
        ];
    }
    generateComponentCode({ config, inputName, outputName }) {
        const columnName = config.column.value;
        const columnIsNamed = config.column.named;
        const const_ts_boolean_keepAll = config.boolean_keepColumns;
        const const_ts_boolean_alllevels = config.boolean_alllevels;
        const const_ts_inputnumber_maxlevel = config.boolean_alllevels ? "None" : config.inputnumber_maxlevel;
        const const_ts_levelseparator = config.selectCustomizable_levelseparator;
        const columnReference = columnIsNamed ? `'${columnName}'` : columnName;
        let code = `# Flatten JSON in the specified column\n`;
        if (const_ts_boolean_keepAll) {
            code += `${outputName} = ${inputName}.join(pd.json_normalize(${inputName}[${columnReference}],sep='${const_ts_levelseparator}',max_level=${const_ts_inputnumber_maxlevel}))\n`;
        }
        else {
            code += `${outputName} = pd.json_normalize(${inputName}[${columnReference}],sep='${const_ts_levelseparator}',max_level=${const_ts_inputnumber_maxlevel})\n`;
        }
        return code;
    }
}


/***/ },

/***/ "./lib/components/transforms/JSON/JSONTools.js"
/*!*****************************************************!*\
  !*** ./lib/components/transforms/JSON/JSONTools.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JSONTools: () => (/* binding */ JSONTools)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../inputs/label */ "./lib/components/inputs/label.js");
/* harmony import */ var _ExpandList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ExpandList */ "./lib/components/transforms/JSON/ExpandList.js");
/* harmony import */ var _FlattenJSON__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FlattenJSON */ "./lib/components/transforms/JSON/FlattenJSON.js");





class JSONTools extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            toolType: "expandList",
            boolean_keepColumns: true,
            boolean_alllevels: true,
            selectCustomizable_levelseparator: ".",
        };
        //this tool is actually linked to two components
        const expandListComponent = new _ExpandList__WEBPACK_IMPORTED_MODULE_3__.ExpandList();
        const flattenJSONComponent = new _FlattenJSON__WEBPACK_IMPORTED_MODULE_4__.FlattenJSON();
        const expandListFields = expandListComponent._form["fields"].map((field) => ({
            ...field,
            condition: { toolType: ["expandList"], ...(field.condition || {}) },
        }));
        const flattenJSONFields = flattenJSONComponent._form["fields"].map((field) => ({
            ...field,
            condition: { toolType: ["flattenJSON"], ...(field.condition || {}) },
        }));
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "JSON Tool",
                    id: "toolType",
                    options: [
                        { value: "expandList", label: "Expand JSON List" },
                        { value: "flattenJSON", label: "Flatten JSON" },
                    ],
                },
                ...expandListFields,
                ...flattenJSONFields,
            ],
        };
        // const description =
        //   "JSON Tools lets you choose between expanding a JSON list into columns or flattening a JSON object column.";
        const description = "JSON 工具允许您在以下两种操作之间进行选择：将 JSON 列展成多列，或者将 JSON 对象列展平。";
        super(
        // "JSON Tools",
        "JSON工具", "jsonTools", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.jsonIcon, defaultConfig, form);
    }
    provideDependencies({ config }) {
        // No extra runtime dependencies beyond those of the selected tool
        return [];
    }
    provideImports({ config }) {
        const tool = config.toolType;
        const importsSets = [];
        if (tool === "expandList") {
            const expand = new _ExpandList__WEBPACK_IMPORTED_MODULE_3__.ExpandList();
            importsSets.push(...expand.provideImports({ config }));
        }
        else if (tool === "flattenJSON") {
            const flatten = new _FlattenJSON__WEBPACK_IMPORTED_MODULE_4__.FlattenJSON();
            importsSets.push(...flatten.provideImports({ config }));
        }
        // Deduplicate while preserving order
        const seen = new Set();
        return importsSets.filter((i) => seen.has(i) ? false : (seen.add(i), true));
    }
    generateComponentCode({ config, inputName, outputName }) {
        const tool = config.toolType;
        if (tool === "expandList") {
            const expand = new _ExpandList__WEBPACK_IMPORTED_MODULE_3__.ExpandList();
            return expand.generateComponentCode({ config, inputName, outputName });
        }
        if (tool === "flattenJSON") {
            const flatten = new _FlattenJSON__WEBPACK_IMPORTED_MODULE_4__.FlattenJSON();
            return flatten.generateComponentCode({ config, inputName, outputName });
        }
        return "";
    }
}


/***/ },

/***/ "./lib/components/transforms/Pivot.js"
/*!********************************************!*\
  !*** ./lib/components/transforms/Pivot.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pivot: () => (/* binding */ Pivot)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");

 // Adjust the import path

class Pivot extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = { aggfunc: "none", fillValue: 0 };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "columns",
                    label: "Index Columns",
                    id: "indexColumns",
                    tooltip: "List of columns used as index for the pivot.",
                    placeholder: "Select columns",
                },
                {
                    type: "columns",
                    label: "Columns to pivot",
                    id: "columnsToPivot",
                    tooltip: "List of columns that are pivoted.",
                    placeholder: "Select columns",
                },
                {
                    type: "columns",
                    label: "Values",
                    id: "values",
                    tooltip: "Values used to fill in the pivot table.",
                    placeholder: "Select columns",
                },
                {
                    type: "select",
                    label: "Aggregation Function",
                    id: "aggfunc",
                    tooltip: "Aggregation used on the values to fill in the pivot table.",
                    options: [
                        { value: "none", label: "None (use pivot without aggregation)" },
                        { value: "sum", label: "Sum" },
                        { value: "mean", label: "Mean" },
                        { value: "min", label: "Min" },
                        { value: "max", label: "Max" },
                    ],
                    advanced: true,
                },
                {
                    type: "inputNumber",
                    label: "Fill missing values",
                    id: "fillValue",
                    placeholder: "0",
                    min: 0,
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Drop rows with missing values",
                    id: "dropna",
                    advanced: true,
                },
            ],
        };
        // const description = "Use Pivot Dataset to rearrange and aggregate data in a dataset. It allows you to organize your data into a new table by defining rows, columns, and the values to populate the table. If you're looking to simply swap rows and columns without aggregation, check out the Transpose Dataset component."
        const description = "使用“数据透视”功能可以对数据集中的数据进行重新排列和汇总。通过定义行、列以及填充表格的值，您可以将数据整理成一个新的表格。如果您只是想简单地交换行和列而无需进行汇总操作，可以查看“转置数据集”组件。";
        super(
        // "Pivot Dataset",
        "数据透视", "pivot", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.pivotIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return [];
    }
    generateComponentCode({ config, inputName, outputName }) {
        const formatColumns = (cols) => cols.length === 1
            ? `"${cols[0].value}"`
            : `[${cols.map((col) => `"${col.value}"`).join(", ")}]`;
        const indexColumns = formatColumns(config.indexColumns);
        const columnsToPivot = formatColumns(config.columnsToPivot);
        const values = formatColumns(config.values);
        if (config.aggfunc === "none") {
            let code = `
${outputName} = ${inputName}.pivot(
    index=${indexColumns},
    columns=${columnsToPivot},
    values=${values}
).reset_index()\n`;
            if (config.fillValue !== null &&
                config.fillValue !== undefined &&
                config.fillValue !== "") {
                code += `
${outputName} = ${outputName}.fillna(${config.fillValue})\n`;
            }
            return code;
        }
        else {
            const aggfunc = `"${config.aggfunc}"`;
            const fillValue = config.fillValue !== null &&
                config.fillValue !== undefined &&
                config.fillValue !== ""
                ? config.fillValue
                : 0;
            const dropna = config.dropna ? "True" : "False";
            let code = `
${outputName} = ${inputName}.pivot_table(
    index=${indexColumns},
    columns=${columnsToPivot},
    values=${values},
    aggfunc=${aggfunc},
    fill_value=${fillValue},
    dropna=${dropna}
).reset_index()\n`;
            return code;
        }
    }
}


/***/ },

/***/ "./lib/components/transforms/RenameColumns/DynamicRenameColumns.js"
/*!*************************************************************************!*\
  !*** ./lib/components/transforms/RenameColumns/DynamicRenameColumns.js ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DynamicRenameColumns: () => (/* binding */ DynamicRenameColumns)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");


class DynamicRenameColumns extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            columns: []
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "columns",
                    label: "Select Columns",
                    id: "combinationColumns",
                    placeholder: "Default: all columns",
                },
                {
                    type: "select",
                    label: "Global case operation",
                    id: "selectGlobalCaseOperation",
                    options: [
                        { value: "none", label: "None", tooltip: "Keep the text exactly as it is, with no changes to case or formatting." },
                        { value: "lower", label: "Lower case", tooltip: "Convert all letters to lowercase (e.g., 'Example Text' → 'example text')." },
                        { value: "upper", label: "Upper case", tooltip: "Convert all letters to uppercase (e.g., 'Example Text' → 'EXAMPLE TEXT')." },
                        { value: "camel_lower", label: "Lower camel case", tooltip: "Capitalize each word except the first, remove spaces (e.g., 'example text' → 'exampleText')." },
                        { value: "camel_upper", label: "Upper camel case", tooltip: "Capitalize each word including the first, remove spaces (e.g., 'example text' → 'ExampleText')." },
                        { value: "snake", label: "Snake case", tooltip: "Convert spaces to underscores and all letters to lowercase (e.g., 'Example Text' → 'example_text')." }
                    ],
                    advanced: true
                },
                {
                    type: "select",
                    label: "Action on special characters",
                    tooltip: "Define how to handle special characters in column names. (_ will be keeped if snake case is selected)",
                    id: "selectActionSpecialCharacters",
                    options: [
                        { value: "None", label: "None", tooltip: "No action on special characters" },
                        { value: "replace", label: "Replace", tooltip: "Replace all special characters" }
                    ],
                    advanced: true
                },
                {
                    type: "input",
                    label: "Replace special characters with",
                    id: "inputCharReplacement",
                    tooltip: "Defines the character used to replace special characters",
                    advanced: true,
                    condition: { selectActionSpecialCharacters: ["replace"] },
                },
                {
                    type: "input",
                    label: "Prefix to delete",
                    id: "inputPrefixDelete",
                    tooltip: "Prefix to delete",
                    advanced: true
                },
                {
                    type: "input",
                    label: "Prefix to add",
                    id: "inputPrefixAdd",
                    tooltip: "Prefix to add",
                    advanced: true
                },
                {
                    type: "input",
                    label: "Suffix to delete",
                    id: "inputSuffixDelete",
                    tooltip: "Suffix to delete",
                    advanced: true
                },
                {
                    type: "input",
                    label: "Suffix to add",
                    id: "inputSuffixAdd",
                    tooltip: "Suffix to add",
                    advanced: true
                },
            ],
        };
        const description = "Dynamically rename columns based on selected transformations such as case conversion, special character handling, and prefix/suffix modifications.";
        super("Dynamic Rename Columns", "DynamicRenameColumns", description, "pandas_df_processor", [], "transforms", _icons__WEBPACK_IMPORTED_MODULE_0__.renameIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return [
            "import pandas as pd",
            "from itertools import combinations"
        ];
    }
    provideFunctions({ config }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        // Function to perform frequency analysis
        const DynamicRenameColumnsFunction = `
def dynamic_rename_dataframe_columns(
    df: pd.DataFrame,
    columns=None,
    case: str = "none",
    special_chars: str = "none",
    replace_char: str = "_",
    prefix_to_delete: str = None,
    prefix_to_add: str = None,
    suffix_to_delete: str = None,
    suffix_to_add: str = None,
) -> pd.DataFrame:
    """
    Rename columns of a DataFrame according to specified transformations.

    Transformations are applied in this order:
    1. Case change
    2. Special character handling
    3. Prefix deletion
    4. Prefix addition
    5. Suffix deletion
    6. Suffix addition
    """

    def to_camel_case(s: str, upper_first: bool = False) -> str:
        parts = [p for p in re.split(r'[^a-zA-Z0-9]+', s) if p]
        if not parts:
            return s
        first = parts[0].lower()
        rest = ''.join(word.capitalize() for word in parts[1:])
        result = first + rest
        if upper_first:
            result = result[0].upper() + result[1:]
        return result

    def to_snake_case(s: str) -> str:
        # Keep underscores, but collapse multiple special characters into one underscore
        s = re.sub(r'[^a-zA-Z0-9_]+', '_', s)
        s = re.sub(r'_+', '_', s)  # collapse consecutive underscores
        return s.strip('_').lower()

    def transform(col: str) -> str:
        new_col = col

        # 1. Case conversion
        if case == "lower":
            new_col = new_col.lower()
        elif case == "upper":
            new_col = new_col.upper()
        elif case == "camel_lower":
            new_col = to_camel_case(new_col, upper_first=False)
        elif case == "camel_upper":
            new_col = to_camel_case(new_col, upper_first=True)
        elif case == "snake":
            new_col = to_snake_case(new_col)

        # 2. Special characters (skip for snake case since it already handles them)
        if case != "snake" and special_chars == "replace":
            new_col = re.sub(r'[^0-9a-zA-Z]+', replace_char, new_col)

        # 3. Prefix deletion
        if prefix_to_delete and new_col.startswith(prefix_to_delete):
            new_col = new_col[len(prefix_to_delete):]

        # 4. Prefix addition
        if prefix_to_add:
            new_col = f"{prefix_to_add}{new_col}"

        # 5. Suffix deletion
        if suffix_to_delete and new_col.endswith(suffix_to_delete):
            new_col = new_col[: -len(suffix_to_delete)]

        # 6. Suffix addition
        if suffix_to_add:
            new_col = f"{new_col}{suffix_to_add}"

        return new_col

    # Determine which columns to rename
    if columns is None:
        columns = df.columns.tolist()

    rename_map = {col: transform(col) for col in columns}
    return df.rename(columns=rename_map)

    `;
        return [DynamicRenameColumnsFunction];
    }
    // Generate the Python execution script
    generateComponentCode({ config, inputName, outputName }) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const combinationColumns_step1 = [];
        // If no columns are selected, pass None so that the Python function uses all columns(default).
        let combinationColumns = "None";
        if (((_a = config.combinationColumns) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            combinationColumns = `[${config.combinationColumns
                .map((item) => (item.named ? `"${item.value}"` : item.value))
                .join(", ")}]`;
        }
        const const_ts_global_case_operation = (_b = config.selectGlobalCaseOperation) !== null && _b !== void 0 ? _b : "none";
        const const_ts_action_special_characters = (_c = config.selectActionSpecialCharacters) !== null && _c !== void 0 ? _c : "";
        const const_ts_char_replacement = (_d = config.inputCharReplacement) !== null && _d !== void 0 ? _d : "";
        const const_ts_prefix_delete = (_e = config.inputPrefixDelete) !== null && _e !== void 0 ? _e : "";
        const const_ts_prefix_add = (_f = config.inputPrefixAdd) !== null && _f !== void 0 ? _f : "";
        const const_ts_suffix_delete = (_g = config.inputSuffixDelete) !== null && _g !== void 0 ? _g : "";
        const const_ts_suffix_add = (_h = config.inputSuffixAdd) !== null && _h !== void 0 ? _h : "";
        return `

${outputName} = dynamic_rename_dataframe_columns(df=${inputName},columns=${combinationColumns},case = '${const_ts_global_case_operation}', special_chars='${const_ts_action_special_characters}',replace_char='${const_ts_char_replacement}',prefix_to_delete='${const_ts_prefix_delete}', prefix_to_add='${const_ts_prefix_add}',suffix_to_delete='${const_ts_suffix_delete}', suffix_to_add='${const_ts_suffix_add}')
    `;
    }
}


/***/ },

/***/ "./lib/components/transforms/RenameColumns/ManualRenameColumns.js"
/*!************************************************************************!*\
  !*** ./lib/components/transforms/RenameColumns/ManualRenameColumns.js ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ManualRenameColumns: () => (/* binding */ ManualRenameColumns)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");


class ManualRenameColumns extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {};
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "keyvalueColumns",
                    label: "Columns",
                    id: "columns",
                    placeholders: { key: "column name", value: "new column name" },
                    advanced: true
                }
            ],
        };
        const description = "Use Rename Columns to rename one or more columns.";
        super("Manual Rename Columns", "manual rename", description, "pandas_df_processor", [], "transforms", _icons__WEBPACK_IMPORTED_MODULE_0__.renameIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return [];
    }
    generateComponentCode({ config, inputName, outputName }) {
        let columnsParam = "{";
        if (config.columns && config.columns.length > 0) {
            columnsParam += config.columns.map(column => {
                if (column.key.named) {
                    // Handle named columns as strings
                    return `"${column.key.value}": "${column.value}"`;
                }
                else {
                    // Handle unnamed (numeric index) columns, converting them to strings
                    return `${column.key.value}: "${column.value}"`;
                }
            }).join(", ");
            columnsParam += "}";
        }
        else {
            columnsParam = "{}"; // Ensure columnsParam is always initialized
        }
        // Template for the pandas rename columns code, explicitly setting axis='columns'
        const code = `
# Rename columns
${outputName} = ${inputName}.rename(columns=${columnsParam})
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/transforms/RenameColumns/RenameColumns.js"
/*!******************************************************************!*\
  !*** ./lib/components/transforms/RenameColumns/RenameColumns.js ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RenameColumns: () => (/* binding */ RenameColumns)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _ManualRenameColumns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ManualRenameColumns */ "./lib/components/transforms/RenameColumns/ManualRenameColumns.js");
/* harmony import */ var _DynamicRenameColumns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DynamicRenameColumns */ "./lib/components/transforms/RenameColumns/DynamicRenameColumns.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../inputs/label */ "./lib/components/inputs/label.js");


//real components behind it



class RenameColumns extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        //default active component
        const defaultConfig = { mode: "manual" };
        const manual = new _ManualRenameColumns__WEBPACK_IMPORTED_MODULE_2__.ManualRenameColumns();
        const dynamic = new _DynamicRenameColumns__WEBPACK_IMPORTED_MODULE_3__.DynamicRenameColumns();
        const getFields = (comp) => {
            const form = comp._form;
            return Array.isArray(form === null || form === void 0 ? void 0 : form.fields) ? form.fields : [];
        };
        const wrapFields = (fields, mode) => fields.map((f) => ({
            ...f,
            condition: { mode: [mode], ...(f.condition || {}) },
        }));
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "Rename type",
                    id: "mode",
                    options: [
                        { value: "manual", label: "Manual" },
                        { value: "dynamic", label: "Dynamic" },
                    ],
                    advanced: true,
                },
                ...wrapFields(getFields(manual), "manual"),
                ...wrapFields(getFields(dynamic), "dynamic"),
            ],
        };
        const description = "使用“重命名列”功能可以手动或动态地对一个或多个列进行重命名操作。";
        // const description =
        //   'Use Rename Columns to rename one or more columns, manually or dynamically.';
        super(
        // "Rename Columns",
        "重命名列", "rename", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_4__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.renameIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        const mode = config.mode;
        const imports = mode === "dynamic"
            ? new _DynamicRenameColumns__WEBPACK_IMPORTED_MODULE_3__.DynamicRenameColumns().provideImports({ config })
            : new _ManualRenameColumns__WEBPACK_IMPORTED_MODULE_2__.ManualRenameColumns().provideImports({ config });
        const seen = new Set();
        return imports.filter((i) => (seen.has(i) ? false : (seen.add(i), true)));
    }
    provideFunctions({ config }) {
        if (config.mode === "dynamic" &&
            typeof _DynamicRenameColumns__WEBPACK_IMPORTED_MODULE_3__.DynamicRenameColumns.prototype.provideFunctions ===
                "function") {
            return new _DynamicRenameColumns__WEBPACK_IMPORTED_MODULE_3__.DynamicRenameColumns().provideFunctions({ config });
        }
        return [];
    }
    generateComponentCode({ config, inputName, outputName }) {
        return config.mode === "dynamic"
            ? new _DynamicRenameColumns__WEBPACK_IMPORTED_MODULE_3__.DynamicRenameColumns().generateComponentCode({
                config,
                inputName,
                outputName,
            })
            : new _ManualRenameColumns__WEBPACK_IMPORTED_MODULE_2__.ManualRenameColumns().generateComponentCode({
                config,
                inputName,
                outputName,
            });
    }
}


/***/ },

/***/ "./lib/components/transforms/Sample.js"
/*!*********************************************!*\
  !*** ./lib/components/transforms/Sample.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sample: () => (/* binding */ Sample)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class Sample extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            numberType: "number",
            rows: 1,
            percentage: 1,
            mode: "random",
            groupBy: [],
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "Type",
                    id: "numberType",
                    options: [
                        { value: "number", label: "Fixed Number" },
                        { value: "percentage", label: "Percentage" },
                    ],
                    advanced: true,
                },
                {
                    type: "inputNumber",
                    label: "Rows number",
                    id: "rows",
                    placeholder: "0",
                    min: 0,
                    condition: { numberType: "number" },
                },
                {
                    type: "inputNumber",
                    label: "Percentage",
                    id: "percentage",
                    placeholder: "0",
                    min: 0,
                    max: 100,
                    condition: { numberType: "percentage" },
                },
                {
                    type: "radio",
                    label: "Mode",
                    id: "mode",
                    options: [
                        { value: "random", label: "Random" },
                        { value: "head", label: "First" },
                        { value: "tail", label: "Last" },
                    ],
                    advanced: true,
                },
                {
                    type: "columns",
                    label: "Group By Columns",
                    id: "groupBy",
                    selectAll: true,
                    advanced: true,
                },
            ],
        };
        // const description = "Use the Sample component to limit data by selecting a specified number of rows or percentage, either randomly, from the start, or from the end of the dataset. You can also group the sampling by one or more columns.";
        const description = "使用“样本”组件可以按照指定的行数或百分比来限制数据，这种限制可以是随机的，也可以是从数据集的开头或结尾选取。此外，您还可以根据一个或多个列对抽样进行分组。";
        super(
        // "Sample Datasets",
        "示例数据集", "sample", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.sampleIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return ["import pandas as pd"];
    }
    formatGroupByColumns(groupBy) {
        return groupBy
            .map((col) => (col.named ? `"${col.value}"` : col.value))
            .join(", ");
    }
    generateComponentCode({ config, inputName, outputName }) {
        let sampleCode = "";
        const groupByColumns = config.groupBy && config.groupBy.length > 0
            ? `[${this.formatGroupByColumns(config.groupBy)}]`
            : null;
        if (config.numberType === "number") {
            if (config.mode === "random") {
                if (groupByColumns) {
                    sampleCode = `${outputName} = ${inputName}.groupby(${groupByColumns}).sample(n=${config.rows})`;
                }
                else {
                    sampleCode = `${outputName} = ${inputName}.sample(n=${config.rows})`;
                }
            }
            else if (config.mode === "tail") {
                if (groupByColumns) {
                    sampleCode = `${outputName} = ${inputName}.groupby(${groupByColumns}).tail(${config.rows})`;
                }
                else {
                    sampleCode = `${outputName} = ${inputName}.tail(${config.rows})`;
                }
            }
            else if (config.mode === "head") {
                if (groupByColumns) {
                    sampleCode = `${outputName} = ${inputName}.groupby(${groupByColumns}).head(${config.rows})`;
                }
                else {
                    sampleCode = `${outputName} = ${inputName}.head(${config.rows})`;
                }
            }
        }
        else if (config.numberType === "percentage") {
            const frac = config.percentage / 100;
            if (config.mode === "random") {
                if (groupByColumns) {
                    sampleCode = `${outputName} = ${inputName}.groupby(${groupByColumns}).sample(frac=${frac})`;
                }
                else {
                    sampleCode = `${outputName} = ${inputName}.sample(frac=${frac})`;
                }
            }
            else if (config.mode === "tail") {
                if (groupByColumns) {
                    sampleCode = `${outputName} = ${inputName}.groupby(${groupByColumns}).apply(lambda x: x.tail(int(len(x) * ${frac}))).reset_index(drop=True)`;
                }
                else {
                    sampleCode = `${outputName} = ${inputName}.iloc[-int(len(${inputName}) * ${frac}):]`;
                }
            }
            else if (config.mode === "head") {
                if (groupByColumns) {
                    sampleCode = `${outputName} = ${inputName}.groupby(${groupByColumns}).apply(lambda x: x.head(int(len(x) * ${frac}))).reset_index(drop=True)`;
                }
                else {
                    sampleCode = `${outputName} = ${inputName}.iloc[:int(len(${inputName}) * ${frac})]`;
                }
            }
        }
        // Template for the pandas query code
        const code = `
${sampleCode}
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/transforms/Sort.js"
/*!*******************************************!*\
  !*** ./lib/components/transforms/Sort.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sort: () => (/* binding */ Sort)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class Sort extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = { columnAndOrder: [] };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "keyvalueColumnsRadio",
                    label: "Columns Sorting Order",
                    id: "columnAndOrder",
                    options: [
                        { value: "True", label: "Asc." },
                        { value: "False", label: "Desc." },
                    ],
                },
                {
                    type: "boolean",
                    label: "Ignore Index",
                    id: "ignoreIndex",
                    advanced: true,
                },
            ],
        };
        // const description = "Use Sort Rows to sort based on the values in columns. Values will be sorted by lexicographical order.";
        const description = "使用“按列排序”功能可依据列中的数值进行排序。排序方式将按照字母顺序进行。";
        super(
        // "Sort Rows",
        "按列排序", "sort", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.sortIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return [];
    }
    generateComponentCode({ config, inputName, outputName }) {
        const byColumns = `by=[${config.columnAndOrder
            .map((item) => (item.key.named ? `"${item.key.value}"` : item.key.value))
            .join(", ")}]`;
        const ascending = `ascending=[${config.columnAndOrder
            .map((item) => (item.value === "True" ? "True" : "False"))
            .join(", ")}]`;
        const ignoreIndex = config.ignoreIndex
            ? `, ignore_index=${config.ignoreIndex}`
            : "";
        const code = `
# Sort rows 
${outputName} = ${inputName}.sort_values(${byColumns}, ${ascending}${ignoreIndex})
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/transforms/SplitColumn.js"
/*!**************************************************!*\
  !*** ./lib/components/transforms/SplitColumn.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SplitColumn: () => (/* binding */ SplitColumn)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class SplitColumn extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            splitType: "columns",
            regex: false,
            keepOriginalColumn: false,
            selectConvertResult: "none",
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "Split Type",
                    id: "splitType",
                    options: [
                        { value: "columns", label: "Split to columns" },
                        { value: "rows", label: "Split to rows" },
                    ],
                    advanced: false,
                },
                {
                    type: "column",
                    label: "Column",
                    id: "column",
                    placeholder: "Type column name",
                },
                {
                    type: "selectCustomizable",
                    label: "Delimiter",
                    id: "delimiter",
                    placeholder: "Select or type delimiter",
                    options: [
                        { value: ",", label: "comma (,)" },
                        { value: ";", label: "semicolon (;)" },
                        { value: " ", label: "space" },
                        { value: "  ", label: "tab" },
                        { value: "|", label: "pipe (|)" },
                    ],
                    advanded: true,
                },
                {
                    type: "boolean",
                    label: "Is delimiter a regex?",
                    id: "regex",
                    advanced: true,
                },
                {
                    type: "inputNumber",
                    label: "Number of columns",
                    id: "numberColumns",
                    placeholder: "auto",
                    min: 1,
                    condition: { splitType: "columns" },
                },
                {
                    type: "input",
                    label: "Name of new column",
                    tooltip: "Mandatory if original column is kept",
                    id: "inputNameNewColumn",
                    condition: { splitType: "rows" },
                },
                {
                    type: "boolean",
                    label: "Keep original column",
                    id: "keepOriginalColumn",
                    advanced: true,
                },
                {
                    type: "selectCustomizable",
                    label: "Convert result",
                    id: "selectConvertResult",
                    options: [
                        { value: "none", label: "None" },
                        { value: "string", label: "string" },
                        { value: "auto", label: "auto (numeric or string)" },
                    ],
                    condition: { splitType: "rows" },
                    advanced: true,
                },
            ],
        };
        // const description = "Use Split Column to split the text from one column into multiple columns or multiple rows.";
        const description = "使用“拆分列”功能可将一个单元格中的文本拆分成多列或多行。";
        super(
        // "Split Column",
        "拆分列", "splitColumn", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.splitIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return ["import pandas as pd"];
    }
    provideFunctions({ config }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        // Function to compare data
        const Split_Column_To_Row_Function = `
def split_dataframe_to_rows(
    df: pd.DataFrame,
    column_to_split: str,
    new_column_name: str,
    split_delimiter: str,
    keep_original_column: bool = False,
    is_regex: bool = False,
    convert_result: str = "none",  # "none" | "string" | "auto"
) -> pd.DataFrame:
    """
    Splits a string column into multiple rows based on a delimiter (or regex).

    Parameters
    ----------
    df : pd.DataFrame
        Input DataFrame.
    column_to_split : str
        Name of the column to split (can contain spaces or special characters).
    new_column_name : str
        Name for the resulting exploded column.
    split_delimiter : str
        Delimiter or regex used to split the string.
    keep_original_column : bool, default False
        If True, keeps the original column. Otherwise drops it.
    is_regex : bool, default False
        If True, interpret split_delimiter as a regex.
    convert_result : none, string, auto, default none
        - none   → keep the exploded column as-is.
        - string → convert the exploded column to pandas string dtype.
        - auto   → run convert_dtypes() on the entire DataFrame.
    Returns
    -------
    pd.DataFrame
        A new DataFrame with one row per split value.
    """
    if convert_result not in {"none", "string", "auto"}:
        raise ValueError("convert_result must be one of: 'none', 'string', or 'auto'")
        
    # Make a copy to avoid modifying original data
    df = df.copy()

    # Perform the split safely (supports regex and handles missing values)
    split_col = df[column_to_split].astype("string").str.split(split_delimiter, regex=is_regex)

    # Add the split column
    df = df.assign(**{new_column_name: split_col})

    # Explode into multiple rows
    df = df.explode(new_column_name, ignore_index=True)

    # Handle type conversion modes
    if convert_result == "string":
        df[new_column_name] = df[new_column_name].astype("string")
    elif convert_result == "auto":
        # Try best-effort numeric conversion, fallback gracefully
        try:
            df[new_column_name] = pd.to_numeric(df[new_column_name])
        except Exception:
            df[new_column_name] = df[[new_column_name]].convert_dtypes()[new_column_name]
        
    # Drop the original column if requested
    if not keep_original_column and new_column_name != column_to_split:
        df = df.drop(columns=[column_to_split])

    return df
    `;
        if (config.splitType === "rows") {
            return [Split_Column_To_Row_Function];
        }
        else {
            return [];
        }
    }
    generateComponentCode({ config, inputName, outputName }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        const columnName = config.column.value; // name of the column
        const columnType = config.column.type; // current type of the column (e.g., 'int', 'string')
        const columnNamed = config.column.named; // boolean, true if column is named, false if index is used
        // Ensure unique variable names for intermediate dataframes
        const uniqueSplitVar = `${outputName}_split`;
        const uniqueCombinedVar = `${outputName}_combined`;
        // Start generating the code string
        let code = `\n# Create a new DataFrame from the split operation\n`;
        // Handling column access based on whether it's named or indexed
        const columnAccess = columnNamed ? `"${columnName}"` : columnName;
        // Convert column to string if it's not already
        if (columnType !== "string") {
            code += `${inputName}[${columnAccess}] = ${inputName}[${columnAccess}].astype("string")\n`;
        }
        // Determine whether to use regex in the split
        const regexOption = config.regex ? ", regex=True" : "";
        // Add the split logic based on splitType
        if (config.splitType === "columns") {
            // Split to columns
            code += `${uniqueSplitVar} = ${inputName}[${columnAccess}].str.split("${config.delimiter}"${regexOption}, expand=True)\n`;
            // Rename the new columns to avoid any potential overlap
            code += `${uniqueSplitVar}.columns  = [f"${columnName}_{i}" for i in range(${uniqueSplitVar}.shape[1])]\n`;
            // If numberColumns is specified, keep only the desired number of columns
            if (config.numberColumns > 0) {
                code += `${uniqueSplitVar} = ${uniqueSplitVar}.iloc[:, :${config.numberColumns}]\n`;
            }
            // Combine the original DataFrame with the new columns
            code += `${outputName} = ${prefix}.concat([${inputName}, ${uniqueSplitVar}], axis=1)\n`;
            // Check if the original column should be kept
            if (!config.keepOriginalColumn) {
                code += `\n# Remove the original column used for split\n`;
                code += `${outputName}.drop(columns=[${columnAccess}], inplace=True)\n`;
            }
        }
        else if (config.splitType === "rows") {
            // Split to rows. if we keep original column, we have to rename the new one. Moreover, assign only accept a kwarg like argument (so no quoted, so space..)
            const const_ts_column_to_split = columnNamed ? columnName : columnAccess; // Added to fix https://github.com/amphi-ai/amphi-etl/issues/235
            const const_ts_boolean_keepOriginalColumn = config.keepOriginalColumn
                ? "True"
                : "False";
            //if null, undefined or empty
            const const_ts_new_column_name = config.inputNameNewColumn && config.inputNameNewColumn.length > 0
                ? config.inputNameNewColumn
                : const_ts_column_to_split;
            const const_ts_split_delimiter = config.delimiter;
            const const_ts_boolean_is_regex = config.regex ? "False" : "True";
            const const_ts_convert_result = config.selectConvertResult;
            code += `${outputName}=split_dataframe_to_rows(df=${inputName},keep_original_column=${const_ts_boolean_keepOriginalColumn},column_to_split='${const_ts_column_to_split}',new_column_name='${const_ts_new_column_name}',split_delimiter='${const_ts_split_delimiter}',is_regex=${const_ts_boolean_is_regex},convert_result='${const_ts_convert_result}')\n`;
        }
        // Return the generated code
        return code;
    }
}


/***/ },

/***/ "./lib/components/transforms/Summary.js"
/*!**********************************************!*\
  !*** ./lib/components/transforms/Summary.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Summary: () => (/* binding */ Summary)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class Summary extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            statisticsType: "all",
            pivot: "rows", // Set default pivot to 'rows'
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "select",
                    label: "Apply to ",
                    id: "statisticsType",
                    placeholder: "Select statistics type",
                    options: [
                        { value: "all", label: "All columns" },
                        {
                            value: "numerical",
                            label: "Numerical columns",
                            tooltip: "Limit the result to numeric columns",
                        },
                        {
                            value: "categorical",
                            label: "Categorical columns",
                            tooltip: "Limit the result to categorical columns",
                        },
                        {
                            value: "select",
                            label: "Select columns (advanced)",
                            tooltip: "Limit the result to the selected columns",
                        },
                    ],
                },
                {
                    type: "columns",
                    label: "Columns",
                    id: "columns",
                    placeholder: "Select columns",
                    tooltip: "Select which columns to analyze",
                    condition: { statisticsType: "select" },
                    advanced: true,
                },
                {
                    type: "radio",
                    label: "Resulting Table Columns",
                    id: "pivot",
                    placeholder: "Select how should the resulting table be formatted",
                    options: [
                        { value: "rows", label: "As rows" },
                        { value: "columns", label: "As columns" },
                    ],
                },
            ],
        };
        // const description = "Use Summary Component to provide a statistical summary of the incoming data.";
        const description = "使用“汇总组件”来对输入数据进行统计汇总。";
        super(
        // "Summary",
        "汇总", "summary", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[2], _icons__WEBPACK_IMPORTED_MODULE_0__.eyeGlassesIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return ["import pandas as pd", "import numpy as np"];
    }
    provideFunctions({ config }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        // Functions to summary the dataframe
        const SummaryFunction = `
def describe_dataset(df, column_type='all', orientation='columns_as_row', selected_columns=None):
    if column_type == 'numerical':
        df = df.select_dtypes(include=[np.number])
    elif column_type == 'categorical':
        df = df.select_dtypes(include=['object', 'category'])
    elif column_type == 'select':
        if selected_columns is None:
            raise ValueError("You must provide 'selected_columns' when column_type is 'select'.")
        df = df[selected_columns]
    elif column_type != 'all':
        raise ValueError("Invalid value for column_type. Choose from 'all', 'numerical', 'categorical', 'select'.")

    summary = []
    expected_describe_columns = ['count', 'mean', 'std', 'min', '25%', '50%', '75%', 'max', 'unique', 'top', 'freq']
    base_summary = df.describe(include='all').transpose()
    base_summary.reset_index(inplace=True)
    base_summary.rename(columns={'index': 'field_name'}, inplace=True)
    for col in expected_describe_columns:
      if col not in base_summary.columns:
          base_summary[col] = pd.NA
    
    expected_custdescribe_columns = ['field_name', 'type', 'count', 'unique', 'most freq value', 'max freq', 'least freq value', 'min', 'max', 'mean', 'std','avg_length','min_length','max_length','shortest','longest']      
    for col in df.columns:
        dtype = df[col].dtype
        col_data = df[col].dropna()

        data = {
            'field_name': col,
            'type': str(dtype),
            'count': int(col_data.count()),
            'unique': int(col_data.nunique()),
            'most freq value': col_data.value_counts().idxmax() if not col_data.value_counts().empty else "",
            'max freq': int(col_data.value_counts().max() if not col_data.value_counts().empty else 0),
            'least freq value': col_data.value_counts().idxmin() if not col_data.value_counts().empty else "",
            'min': col_data.min(),
            'max': col_data.max(),

        }

        if pd.api.types.is_numeric_dtype(dtype) or pd.api.types.is_datetime64_dtype(dtype):
            data.update({
            'mean': col_data.mean(),
            'std': col_data.std()
            })
        elif pd.api.types.is_string_dtype(dtype) or isinstance(dtype, pd.CategoricalDtype):
            str_data = col_data.astype(str)
            lengths = str_data.map(len)
            if not str_data.empty:
                data.update({
                    'avg_length': lengths.mean(),
                    'min_length': lengths.min(),
                    'max_length': lengths.max(),
                    'shortest': str_data[lengths == lengths.min()].iloc[0],
                    'longest': str_data[lengths == lengths.max()].iloc[0]
                })

        summary.append(data)
        
    #force output column (shouldn't depend on types)
    result_df = pd.DataFrame(summary)
    for col in expected_custdescribe_columns:
      if col not in result_df.columns:
          result_df[col] = pd.NA
    result_df = result_df[expected_custdescribe_columns]
    
    # Set correct data types
    numeric_cols = ['count', 'unique', ' max freq', 'avg_length', 'min_length', 'max_length']
    for col in numeric_cols:
        if col in result_df.columns:
            result_df[col] = pd.to_numeric(result_df[col], errors='coerce')
            
    # Define columns to cast explicitly
    float_cols = ['avg_length']
    int_cols = ['count', 'unique', 'max freq', 'min_length', 'max_length']

    for col in float_cols:
       if col in result_df.columns:
            result_df[col] = pd.to_numeric(result_df[col], errors='coerce')

    for col in int_cols:
        if col in result_df.columns:
            result_df[col] = pd.to_numeric(result_df[col], errors='coerce').astype('Int64')
    
    conflicting_cols = ['count', 'unique', 'top', 'freq', 'min', 'max','mean','std']  
    base_summary = base_summary.drop(columns=[col for col in conflicting_cols if col in base_summary.columns])        
    result_df = pd.merge(result_df, base_summary, on='field_name', how='left')
    # Cast string columns. When potentially mixed result, set object. 
    result_df['field_name'] = result_df['field_name'].astype('string')
    result_df['type'] = result_df['type'].astype('string')
    result_df['most freq value'] = result_df['most freq value'].astype('object')
    result_df['least freq value'] = result_df['least freq value'].astype('object')
    result_df['shortest'] = result_df['shortest'].astype('object')
    result_df['longest'] = result_df['longest'].astype('object')
    result_df['min'] = result_df['min'].astype('object')
    result_df['max'] = result_df['max'].astype('object')
    result_df['mean'] = result_df['mean'].astype('object')
    result_df['std'] = result_df['std'].astype('object')
    result_df['25%'] = result_df['25%'].astype('object')
    result_df['50%'] = result_df['50%'].astype('object')
    result_df['75%'] = result_df['75%'].astype('object')
    if orientation == 'columns_as_column':
        result_df = result_df.set_index("field_name").transpose().reset_index().rename(columns={'index': 'stat'})
    return result_df
    `;
        return [SummaryFunction];
    }
    generateComponentCode({ config, inputName, outputName, }) {
        const statisticsType = config.statisticsType;
        const pivot = config.pivot;
        let orientation = "";
        let code = `# Generate summary statistics\n`;
        // Handle subset selection based on statisticsType.
        if (statisticsType === "select") {
            const selectedColumns = config.columns.map((col) => col.value);
            code += `df_subset = ${inputName}[${JSON.stringify(selectedColumns)}]\n`;
        }
        else if (statisticsType === "numerical") {
            code += `df_subset = ${inputName}.select_dtypes(include=['number'])\n`;
        }
        else if (statisticsType === "categorical") {
            code += `df_subset = ${inputName}.select_dtypes(include=['object', 'category'])\n`;
        }
        else {
            code += `df_subset = ${inputName}\n`;
        }
        // Apply pivot if specified.
        if (pivot === "rows") {
            //code += `${outputName} = ${outputName}.transpose()\n`;
            orientation = "columns_as_row";
        }
        else {
            orientation = "columns_as_column";
        }
        //execute the function
        code += `
# Execute the detect unique key function
${outputName} = []
${outputName} = describe_dataset(df_subset, 'all', '${orientation}')
del df_subset
    `;
        return code + "\n";
    }
}


/***/ },

/***/ "./lib/components/transforms/Transpose.js"
/*!************************************************!*\
  !*** ./lib/components/transforms/Transpose.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transpose: () => (/* binding */ Transpose)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class Transpose extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            inputVariableFieldName: "Column",
            inputValueFieldName: "Value",
            selectTypeVariableField: "type as string",
            selectTypeValueField: "do nothing",
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "info",
                    label: "Information",
                    id: "information",
                    text: "Transforms transposed columns into rows, replaced by a variable and value columns.",
                },
                {
                    type: "columns",
                    label: "ID columns (keep as-is)",
                    id: "columnsKeyTranspose",
                    selectAll: true,
                    advanced: true,
                    tooltip: "Columns that identify each row and should remain unchanged. These columns are repeated for each unpivoted value.",
                },
                {
                    type: "columns",
                    label: "Columns to unpivot",
                    id: "columnsColumnsToTranspose",
                    selectAll: true,
                    advanced: true,
                    tooltip: "Columns that will be converted into rows. If empty, all columns except the ID columns are unpivoted.",
                },
                {
                    type: "input",
                    label: "Output column for original column name",
                    id: "inputVariableFieldName",
                    advanced: true,
                    tooltip: "Name of the output column that stores the source column name (default: Column). Example values: Jan, Revenue, Cost.",
                },
                {
                    type: "input",
                    label: "Output column for values",
                    id: "inputValueFieldName",
                    advanced: true,
                    tooltip: "Name of the output column that stores the cell values from the unpivoted columns (default: Value).",
                },
                {
                    type: "select",
                    label: "Type for original column name column",
                    id: "selectTypeVariableField",
                    options: [
                        {
                            value: "type as string",
                            label: "String (recommended)",
                            tooltip: "Force the original column name output to be a string.",
                        },
                        {
                            value: "do nothing",
                            label: "Keep default",
                            tooltip: "Keep default behaviour.",
                        },
                    ],
                    advanced: true,
                    tooltip: "Controls how the output column containing original column names is typed.",
                },
                {
                    type: "select",
                    label: "Type for values column",
                    id: "selectTypeValueField",
                    options: [
                        {
                            value: "do nothing",
                            label: "Keep default (recommended)",
                            tooltip: "Keep default behaviour.",
                        },
                        {
                            value: "type as string",
                            label: "String",
                            tooltip: "Force all values to be strings.",
                        },
                        {
                            value: "infer numeric",
                            label: "Infer numeric",
                            tooltip: "Try to convert values to numbers when possible; non-numeric become NaN.",
                        },
                    ],
                    advanced: true,
                    tooltip: "Controls how the output values column is typed.",
                },
            ],
        };
        const description = "将选定的列转换为行（去重置列格式）。它会生成两个输出列：一个用于原始列名，另一个用于值。不会进行聚合操作。如需进行聚合操作，请使用“数据透视”功能。";
        // const description =
        //   "Convert selected columns into rows (unpivot). It creates two output columns: one for the original column name and one for the value. No aggregation is performed. For aggregation, use Pivot Dataset.";
        // Keep internal id "transpose" for backward compatibility, update display name for clarity.
        super(
        // "Transpose Dataset",
        "转置数据集", "transpose", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.transposeIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return ["import pandas as pd"];
    }
    provideFunctions({ config }) {
        const TSTransposeFunctionFunction = `
def pyfn_transpose_dataframe(
    df: pd.DataFrame,
    transpose_key_columns: list | None = None,
    transpose_value_columns: list | None = None,
    transpose_variable_name: str = "Column",
    transpose_value_name: str = "Value",
    transpose_variable_field_type: str = "type as string",  # options: "type as string", "do nothing"
    transpose_value_field_type: str = "do nothing"          # options: "type as string", "do nothing", "infer numeric" (or legacy: "infer type")
) -> pd.DataFrame:
    """
    Unpivot (melt) a pandas DataFrame with flexible options.

    Parameters
    ----------
    df : pd.DataFrame
        Input DataFrame.
    transpose_key_columns : list or None, optional
        Columns to keep as identifiers (like id_vars in pandas.melt).
    transpose_value_columns : list or None, optional
        Columns to unpivot (like value_vars in pandas.melt).
    transpose_variable_name : str, default "Column"
        Name for the output column that stores the original column name.
    transpose_value_name : str, default "Value"
        Name for the output column that stores the values.
    transpose_variable_field_type : str, default "type as string"
        - "type as string": force all values to str
        - "do nothing": keep as-is
    transpose_value_field_type : str, default "do nothing"
        - "type as string": force all values to str
        - "do nothing": keep as-is
        - "infer numeric" (or legacy "infer type"): convert to numeric where possible

    Returns
    -------
    pd.DataFrame
        Unpivoted DataFrame.
    """

    # Perform melt (unpivot)
    transposed = pd.melt(
        df,
        id_vars=transpose_key_columns,
        value_vars=transpose_value_columns,
        var_name=transpose_variable_name,
        value_name=transpose_value_name
    )

    # Variable column typing
    if transpose_variable_field_type == "type as string":
        transposed[transpose_variable_name] = transposed[transpose_variable_name].astype("string").fillna("None")

    # Value column typing
    if transpose_value_field_type == "type as string":
        transposed[transpose_value_name] = transposed[transpose_value_name].astype("string").fillna("None")
    elif transpose_value_field_type in ("infer numeric", "infer type"):
        transposed[transpose_value_name] = pd.to_numeric(transposed[transpose_value_name], errors="coerce")

    return transposed
    `;
        return [TSTransposeFunctionFunction];
    }
    generateComponentCode({ config, inputName, outputName }) {
        var _a, _b, _c, _d;
        const constTSVariableFieldName = ((_a = config.inputVariableFieldName) === null || _a === void 0 ? void 0 : _a.trim()) || "Column";
        const constTSValueFieldName = ((_b = config.inputValueFieldName) === null || _b === void 0 ? void 0 : _b.trim()) || "Value";
        const constTSTypeVariableField = config.selectTypeVariableField || "type as string";
        const constTSTypeValueField = config.selectTypeValueField || "do nothing";
        // note: None vs [] can differ for id_vars/value_vars; we preserve current behavior
        let vTSKeyColumns = "None";
        if (((_c = config.columnsKeyTranspose) === null || _c === void 0 ? void 0 : _c.length) > 0) {
            vTSKeyColumns = `[${config.columnsKeyTranspose
                .map((item) => (item.named ? `"${item.value}"` : item.value))
                .join(", ")}]`;
        }
        let vTSDataColumns = "None";
        if (((_d = config.columnsColumnsToTranspose) === null || _d === void 0 ? void 0 : _d.length) > 0) {
            vTSDataColumns = `[${config.columnsColumnsToTranspose
                .map((item) => (item.named ? `"${item.value}"` : item.value))
                .join(", ")}]`;
        }
        const code = `
# Unpivot (Columns to Rows) Component

${outputName} = pyfn_transpose_dataframe(
    df=${inputName},
    transpose_key_columns=${vTSKeyColumns},
    transpose_value_columns=${vTSDataColumns},
    transpose_variable_name='${constTSVariableFieldName}',
    transpose_value_name='${constTSValueFieldName}',
    transpose_variable_field_type='${constTSTypeVariableField}',
    transpose_value_field_type='${constTSTypeValueField}'
)
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/transforms/TypeConverter.js"
/*!****************************************************!*\
  !*** ./lib/components/transforms/TypeConverter.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TypeConverter: () => (/* binding */ TypeConverter)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class TypeConverter extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            tsCFcascaderDataTypePandas: "string",
            tsCFColumnsToConvert: [],
            tsCFselectErrorManagement: "warn_coerce",
            tsCFbooleanKeepInitial: false,
            inputPrefixForNewColumns: "",
            inputSuffixForNewColumns: "",
            tsCFbooleanConvertToDtype: false,
            tsCFselectDtypeBackend: "pyarrow",
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "columns",
                    label: "Columns to convert",
                    id: "tsCFColumnsToConvert",
                    placeholder: "Column name",
                },
                //specific to pandas, would require some change with polars and duckdb
                {
                    type: "cascader",
                    label: "Data Type to convert to",
                    id: "tsCFcascaderDataTypePandas",
                    placeholder: "Select ...",
                    onlyLastValue: true,
                    options: [
                        {
                            value: "numeric",
                            label: "Numeric",
                            children: [
                                {
                                    value: "int",
                                    label: "Integer",
                                    children: [
                                        { value: "int64", label: "int64: Standard integer type." },
                                        {
                                            value: "int32",
                                            label: "int32: For optimized memory usage.",
                                        },
                                        {
                                            value: "int16",
                                            label: "int16: For more optimized memory usage.",
                                        },
                                        {
                                            value: "int8",
                                            label: "int8: For more optimized memory usage.",
                                        },
                                        {
                                            value: "uint64",
                                            label: "uint64: Unsigned integer (can only hold non-negative values)",
                                        },
                                        {
                                            value: "uint32",
                                            label: "uint32: For more optimized memory usage.",
                                        },
                                        {
                                            value: "uint16",
                                            label: "uint16: For more optimized memory usage.",
                                        },
                                        {
                                            value: "uint8",
                                            label: "uint8: For more optimized memory usage.",
                                        },
                                        {
                                            value: "Int64",
                                            label: "Int64: Pandas standard integer type.",
                                        },
                                        {
                                            value: "Int32",
                                            label: "Int32: Pandas For optimized memory usage.",
                                        },
                                        {
                                            value: "Int16",
                                            label: "Int16: Pandas For more optimized memory usage.",
                                        },
                                        {
                                            value: "Int8",
                                            label: "Int8: Pandas For more optimized memory usage.",
                                        },
                                        {
                                            value: "UInt64",
                                            label: "UInt64: Pandas Unsigned integer (can only hold non-negative values)",
                                        },
                                        {
                                            value: "UInt32",
                                            label: "UInt32: Pandas For more optimized memory usage.",
                                        },
                                        {
                                            value: "UInt16",
                                            label: "UInt16: Pandas For more optimized memory usage.",
                                        },
                                        {
                                            value: "UInt8",
                                            label: "UInt8: Pandas For more optimized memory usage.",
                                        },
                                        {
                                            value: "int64[pyarrow]",
                                            label: "int64[pyarrow]: Pyarrow Standard integer type.",
                                        },
                                        {
                                            value: "int32[pyarrow]",
                                            label: "int32[pyarrow]: Pyarrow For optimized memory usage.",
                                        },
                                        {
                                            value: "int16[pyarrow]",
                                            label: "int16[pyarrow]: Pyarrow For more optimized memory usage.",
                                        },
                                        {
                                            value: "int8[pyarrow]",
                                            label: "int8[pyarrow]: Pyarrow For more optimized memory usage.",
                                        },
                                        {
                                            value: "uint64[pyarrow]",
                                            label: "uint64[pyarrow]: Pyarrow Unsigned integer (can only hold non-negative values)",
                                        },
                                        {
                                            value: "uint32[pyarrow]",
                                            label: "uint32[pyarrow]: Pyarrow For more optimized memory usage.",
                                        },
                                        {
                                            value: "uint16[pyarrow]",
                                            label: "uint16[pyarrow]: Pyarrow For more optimized memory usage.",
                                        },
                                        {
                                            value: "uint8[pyarrow]",
                                            label: "uint8[pyarrow]: Pyarrow For more optimized memory usage.",
                                        },
                                    ],
                                },
                                {
                                    value: "float",
                                    label: "Float",
                                    children: [
                                        {
                                            value: "float64",
                                            label: "float64: Standard floating-point type.",
                                        },
                                        {
                                            value: "float32",
                                            label: "float32: For optimized memory usage.",
                                        },
                                        {
                                            value: "float16",
                                            label: "float16: For optimized memory usage.",
                                        },
                                        {
                                            value: "Float64",
                                            label: "Float64: Pandas Standard floating-point type.",
                                        },
                                        {
                                            value: "Float32",
                                            label: "Float32: Pandas For optimized memory usage.",
                                        },
                                        //{ value: "Float16", label: "Float16: Pandas For optimized memory usage." }
                                        {
                                            value: "float[pyarrow]",
                                            label: "float[pyarrow]: Pyarrow float",
                                        },
                                        {
                                            value: "double[pyarrow]",
                                            label: "double[pyarrow]: Pyarrow double",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            value: "text",
                            label: "Text",
                            children: [
                                { value: "str", label: "str : For string data." },
                                {
                                    value: "string",
                                    label: "Pandas string: For string data. (recommended)",
                                },
                                {
                                    value: "object",
                                    label: "object: For generic objects (strings, timestamps, mixed types).",
                                },
                                {
                                    value: "category",
                                    label: "category: For categorical variables.",
                                },
                                {
                                    value: "string[pyarrow]",
                                    label: "Pyarrow string: For string data.",
                                },
                            ],
                        },
                        {
                            value: "datetime",
                            label: "Date & Time",
                            children: [
                                { value: "date", label: "date: For date values." },
                                //{ value: "Date", label: "Date: Pandas For date values." },
                                {
                                    value: "datetime64[ns]",
                                    label: "datetime64[ns]: For datetime values.",
                                },
                                {
                                    value: "datetime64[ms]",
                                    label: "datetime64[ms]: For datetime values in milliseconds.",
                                },
                                {
                                    value: "datetime64[s]",
                                    label: "datetime64[s]: For datetime values in seconds.",
                                },
                                {
                                    value: "datetime32[ns]",
                                    label: "datetime32[ns]: For compact datetime storage in nanoseconds.",
                                },
                                {
                                    value: "datetime32[ms]",
                                    label: "datetime32[ms]: For compact datetime storage in milliseconds.",
                                },
                                {
                                    value: "pa.timestamp[ns]",
                                    label: "pa.timestamp[ns]: Pyarrow timestamp (nanosecond).",
                                },
                                {
                                    value: "pa.timestamp[us]",
                                    label: "pa.timestamp[us]: Pyarrow timestamp (microsecond).",
                                },
                                {
                                    value: "pa.timestamp[ms]",
                                    label: "pa.timestamp[ms]: Pyarrow timestamp (millisecond).",
                                },
                                {
                                    value: "pa.timestamp[s]",
                                    label: "pa.timestamp[s]: Pyarrow timestamp (second).",
                                },
                                {
                                    value: "timedelta[ns]",
                                    label: "timedelta[ns]: For differences between two datetimes.",
                                },
                            ],
                        },
                        {
                            value: "boolean",
                            label: "Boolean",
                            children: [
                                {
                                    value: "bool",
                                    label: "bool: For boolean values (True or False).",
                                },
                                {
                                    value: "boolean",
                                    label: "boolean: Pandas For boolean values (True or False).",
                                },
                                {
                                    value: "bool[pyarrow]",
                                    label: "bool[pyarrow]: Pyarrow For boolean values (True or False).",
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "select",
                    label: "Error management",
                    id: "tsCFselectErrorManagement",
                    placeholder: "Select behavior",
                    options: [
                        { value: "raise", label: "Raise error and stop" },
                        { value: "warn_keep", label: "Warning and keep original values" },
                        { value: "warn_coerce", label: "Warning and coerce to NaN / NaT" },
                        { value: "keep", label: "Do nothing, keep original values" },
                        { value: "coerce", label: "Silently coerce to NaN / NaT" },
                    ],
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Keep Initial",
                    id: "tsCFbooleanKeepInitial",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Prefix for new columns",
                    id: "inputPrefixForNewColumns",
                    advanced: true,
                },
                {
                    type: "input",
                    label: "Suffix for new columns",
                    id: "inputSuffixForNewColumns",
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Convert to Dtype",
                    id: "tsCFbooleanConvertToDtype",
                    advanced: true,
                },
                {
                    type: "select",
                    label: "Dtype Backend",
                    id: "tsCFselectDtypeBackend",
                    options: [
                        { value: "pyarrow", label: "Pyarrow" },
                        { value: "numpy_nullable", label: "Numpy Nullable" },
                    ],
                    advanced: true,
                },
            ],
        };
        // const description = "Use Type Converter to change the data type of one or several columns to the specified type.";
        const description = "使用类型转换器可以将一个或多个列的数据类型更改为指定的类型。";
        super("类型转换器", "typeConverter", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.convertIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        //both import datetime and from datetime import datetime are necessary
        const imports = [
            "import pandas as pd",
            "import pyarrow as pa",
            "import datetime",
            "from datetime import datetime",
            "import warnings",
            "from typing import List, Union, Type",
        ];
        return imports;
    }
    provideFunctions({ config }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        const tsTypeConverterFunction = `
def py_fn_convert_columns_type(
    py_arg_df: pd.DataFrame,
    py_arg_columns: List[str],
    py_arg_target_type: Union[Type, str],
    py_arg_on_fail: str = "warn_keep",
    py_arg_keep_initial: bool = False,
    py_arg_prefix: str = "",
    py_arg_suffix: str = "",
    py_arg_convert_to_dtype: bool = False,
    py_arg_dtype_backend: str = "pyarrow"
) -> pd.DataFrame:
    """
    Convert the type of selected columns in a pandas DataFrame. Future release will have to deal with Polars/DuckDB

    Parameters
    ----------
    py_arg_df : pandas.DataFrame
        Input DataFrame.
    py_arg_columns : list[str]
        List of column names to convert.
    py_arg_target_type : type or str
        Target type to convert to (e.g. int, float, str, "datetime64[ns]").
    py_arg_on_fail : str, optional
        Error handling strategy:
        - "raise": raise error and stop
        - "warn_keep": warning and keep original values
        - "warn_coerce": warning and coerce to NaN / NaT
        - "keep": do nothing, keep original values
        - "coerce": silently coerce to NaN / NaT
    py_arg_keep_initial : bool, optional
        If True, keep the original column and create a new one.
    py_arg_prefix : str, optional
        Prefix for the new column name.
    py_arg_suffix : str, optional
        Suffix for the new column name.
    py_arg_convert_to_dtype : bool, optional
        If True, apply astype(py_arg_target_type) after initial conversion.
    py_arg_dtype_backend : str,optional
        backend for dtype, numpy_nullable or pyarrow
    Returns
    -------
    pandas.DataFrame
        DataFrame with converted columns.
    """
     # --- Arrow timestamp dtypes ---
    pa_type_timestampns = pd.ArrowDtype(pa.timestamp("ns"))
    pa_type_timestampus = pd.ArrowDtype(pa.timestamp("us"))
    pa_type_timestampms = pd.ArrowDtype(pa.timestamp("ms"))
    pa_type_timestamps = pd.ArrowDtype(pa.timestamp("s"))
    
    py_var_df = py_arg_df.copy()
    #misc checks
    py_var_on_fail = py_arg_on_fail.lower()
    py_var_allowed_modes = {
        "raise",
        "warn_keep",
        "warn_coerce",
        "keep",
        "coerce",
    }

    if py_var_on_fail not in py_var_allowed_modes:
        raise ValueError(
            f"py_arg_on_fail must be one of {sorted(py_var_allowed_modes)}"
        )

    #loop for each selected column
    for py_var_col in py_arg_columns:
        if py_var_col not in py_var_df.columns:
            raise KeyError(f"Column '{py_var_col}' not found in DataFrame")
        #dynamic built with prefix and suffix
        py_var_target_col = (
            f"{py_arg_prefix}{py_var_col}{py_arg_suffix}"
            if py_arg_keep_initial
            else py_var_col
        )

        py_var_series = py_var_df[py_var_col]

        try:
            # --- Primary conversion ---
            #numeric
            if py_arg_target_type in [int, float,"int64","int32","int16","int8","uint64","uint32","uint16","uint8","Int64","Int32","Int16","Int8","UInt64","UInt32","UInt16","UInt8","float64","float32","float16","Float64","Float32"] or py_arg_target_type == "numeric":
                py_var_converted = pd.to_numeric(
                    py_var_series,
                    errors="raise",
                ).astype(py_arg_target_type)
            #datetime
            elif py_arg_target_type in ["datetime", "datetime64[ns]","datetime64[s]"]:
                py_var_converted = pd.to_datetime(
                    py_var_series,
                    errors="raise",
                )
            #pyarrow timestamp    
            elif py_arg_target_type in ["pa.timestamp[ns]", "pa.timestamp[us]","pa.timestamp[ms]","pa.timestamp[s]"]:
                py_var_pyarrow_ts_unit = py_arg_target_type.replace("pa.timestamp[", "").replace("]", "")
                print(py_var_pyarrow_ts_unit)
                py_var_converted = pd.to_datetime(
                    py_var_series,
                    errors="raise",
                )
                if py_var_pyarrow_ts_unit == "ns":
                    py_var_converted = py_var_converted.astype(pa_type_timestampns)
                elif py_var_pyarrow_ts_unit == "us":
                    py_var_converted = py_var_converted.astype(pa_type_timestampus)
                elif py_var_pyarrow_ts_unit == "ms":
                    py_var_converted = py_var_converted.astype(pa_type_timestampms)
                elif py_var_pyarrow_ts_unit == "s":
                    py_var_converted = py_var_converted.astype(pa_type_timestamps)
                else:
                    raise ValueError(f"Unsupported timestamp unit: {unit}")

            else:
                py_var_converted = py_var_series.astype(py_arg_target_type)

            # --- Optional dtype enforcement ---
            if py_arg_convert_to_dtype:
                py_var_converted = py_var_converted.convert_dtypes(dtype_backend=py_arg_dtype_backend)

            py_var_df[py_var_target_col] = py_var_converted

        except Exception as py_var_exc:
            if py_var_on_fail == "raise":
                raise

            if py_var_on_fail in {"warn_keep", "warn_coerce"}:
                #warn
                warnings.warn(
                    f"Failed to convert column '{py_var_col}' to "
                    f"{py_arg_target_type}: {py_var_exc}",
                    RuntimeWarning,
                )

            if py_var_on_fail in {"warn_coerce", "coerce"}:
                #coerce
                #datetime
                if py_arg_target_type in ["datetime", "datetime64[ns]","datetime64[s]"]:
                    py_var_df[py_var_target_col] = pd.to_datetime(
                        py_var_series, errors="coerce"
                    )
                #pyarrow timestamp    
                elif py_arg_target_type in ["pa.timestamp[ns]", "pa.timestamp[us]","pa.timestamp[ms]","pa.timestamp[s]"]:
                    py_var_pyarrow_ts_unit = py_arg_target_type.replace("pa.timestamp[", "").replace("]", "")
                    print(py_var_pyarrow_ts_unit)
                    py_var_converted = pd.to_datetime(
                        py_var_series,
                        errors="coerce",
                    )
                    if py_var_pyarrow_ts_unit == "ns":
                        py_var_converted = py_var_converted.astype(pa_type_timestampns)
                    elif py_var_pyarrow_ts_unit == "us":
                        py_var_converted = py_var_converted.astype(pa_type_timestampus)
                    elif py_var_pyarrow_ts_unit == "ms":
                        py_var_converted = py_var_converted.astype(pa_type_timestampms)
                    elif py_var_pyarrow_ts_unit == "s":
                        py_var_converted = py_var_converted.astype(pa_type_timestamps)                
                else:
                    #de facto numeric types
                    py_var_df[py_var_target_col] = pd.to_numeric(
                        py_var_series, errors="coerce"
                    ).astype(py_arg_target_type)

            if py_var_on_fail in {"warn_keep", "keep"}:
                #do nothing
                if py_arg_keep_initial:
                    py_var_df[py_var_target_col] = py_var_series
    
            # --- Optional dtype enforcement ---
            if py_arg_convert_to_dtype:
                py_var_df[py_var_target_col] = py_var_df[py_var_target_col].convert_dtypes(dtype_backend=py_arg_dtype_backend)
    return py_var_df
	    `;
        return [tsTypeConverterFunction];
    }
    generateComponentCode({ config, inputName, outputName }) {
        var _a;
        const tsConstDataTypePandasStep1 = config.tsCFcascaderDataTypePandas[config.tsCFcascaderDataTypePandas.length - 1];
        let tsConstDataTypePandas = "None";
        if (tsConstDataTypePandasStep1 &&
            tsConstDataTypePandasStep1.trim() !== "") {
            tsConstDataTypePandas = '"' + tsConstDataTypePandasStep1 + '"';
        }
        let tsConstErrorManagement = "None";
        if (config.tsCFselectErrorManagement &&
            config.tsCFselectErrorManagement.trim() !== "") {
            tsConstErrorManagement = '"' + config.tsCFselectErrorManagement + '"';
        }
        let tsConstPrefixForNewColumns = "None";
        if (config.inputPrefixForNewColumns &&
            config.inputPrefixForNewColumns.trim() !== "") {
            tsConstPrefixForNewColumns = '"' + config.inputPrefixForNewColumns + '"';
        }
        let tsConstSuffixForNewColumns = "None";
        if (config.inputSuffixForNewColumns &&
            config.inputSuffixForNewColumns.trim() !== "") {
            tsConstSuffixForNewColumns = '"' + config.inputSuffixForNewColumns + '"';
        }
        let tsConstDtypeBackend = "None";
        if (config.tsCFselectDtypeBackend &&
            config.tsCFselectDtypeBackend.trim() !== "") {
            tsConstDtypeBackend = '"' + config.tsCFselectDtypeBackend + '"';
        }
        let tsConstKeepInitial = config.tsCFbooleanKeepInitial ? "True" : "False";
        let tsConstConvertToDtype = config.tsCFbooleanConvertToDtype
            ? "True"
            : "False";
        let tsConstColumnsToConvert = "None";
        if (((_a = config.tsCFColumnsToConvert) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            tsConstColumnsToConvert = `[${config.tsCFColumnsToConvert
                .map((item) => (item.named ? `"${item.value}"` : item.value))
                .join(", ")}]`;
        }
        return `
${outputName}=py_fn_convert_columns_type(	
    py_arg_df=${inputName},
    py_arg_columns=${tsConstColumnsToConvert},
    py_arg_target_type=${tsConstDataTypePandas},
    py_arg_on_fail=${tsConstErrorManagement},
    py_arg_keep_initial=${tsConstKeepInitial},
    py_arg_prefix=${tsConstPrefixForNewColumns},
    py_arg_suffix=${tsConstSuffixForNewColumns},
    py_arg_convert_to_dtype=${tsConstConvertToDtype},
    py_arg_dtype_backend=${tsConstDtypeBackend}
    )
`;
    }
}


/***/ },

/***/ "./lib/components/transforms/UniqueKeyDetector.js"
/*!********************************************************!*\
  !*** ./lib/components/transforms/UniqueKeyDetector.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UniqueKeyDetector: () => (/* binding */ UniqueKeyDetector)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class UniqueKeyDetector extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            columns: [],
            combination_nfield: 1,
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "columns",
                    label: "Select Columns",
                    id: "combination_columns",
                    placeholder: "Default: all columns",
                },
                {
                    type: "inputNumber",
                    tooltip: "Maximum Number of Fields in Combination",
                    label: "Maximum Number of Fields in Combination",
                    id: "combination_nfield",
                    placeholder: "Default: 1",
                    min: 1,
                    advanced: false,
                },
            ],
        };
        // const description = "Find combination of fields for unique key";
        const description = "找出构成唯一键的字段组合";
        super(
        // "Unique Key Detector",
        "唯一键检测器", "UniqueKeyDetector", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[2], _icons__WEBPACK_IMPORTED_MODULE_0__.UniqueKeyIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return ["import pandas as pd", "from itertools import combinations"];
    }
    provideFunctions({ config }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        // Function to perform frequency analysis
        const UniqueKeyDetectorFunction = `
def detect_unique_key(df, fields=None, max_combination=0):
    #Detect unique keys in a DataFrame based on field combinations.
    #Parameters:
    #df (pd.DataFrame): The DataFrame to analyze.
    #fields (list): List of fields to test for uniqueness.
    #max_combination (int): Maximum number of fields to combine (0 = no limit).
    #Returns:
    #result: A DataFrame with columns ['number_of_fields', 'field_combination'].
    if fields is None or len(fields) == 0:
        fields = list(df.columns)

    total_rows = len(df)
    max_combination = max_combination if max_combination > 0 else len(fields)

    result = []
    found_minimum = None

    for r in range(1, max_combination + 1):
        for combo in combinations(fields, r):
            combo = list(combo)
            unique_count = len(df.drop_duplicates(subset=combo))

            if unique_count == total_rows:
                if found_minimum is None:
                    found_minimum = r


                result.append({
                    "number_of_fields": r,
                    "field_combination": combo
                })
    #dataframe (no list) even if empty, and well typed
    result = pd.DataFrame(result, columns=["number_of_fields", "field_combination"])
    result = result.astype({
        "number_of_fields": "int",  # Integer type
        "field_combination": "object"  # Object (tuples)
    })

    return result

    `;
        return [UniqueKeyDetectorFunction];
    }
    // Generate the Python execution script
    generateComponentCode({ config, inputName, outputName, }) {
        var _a, _b;
        console.log("Generated outputName:", outputName); // Debugging output
        const combination_nfield = (_a = config.combination_nfield) !== null && _a !== void 0 ? _a : 1;
        const combination_columns_step1 = [];
        // If no columns are selected, pass None so that the Python function uses all columns(default).
        let combination_columns = "None";
        if (((_b = config.combination_columns) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            combination_columns = `[${config.combination_columns
                .map((item) => (item.named ? `"${item.value}"` : item.value))
                .join(", ")}]`;
        }
        return `
# Execute the detect unique key function
${outputName} = []
${outputName} = detect_unique_key(${inputName},${combination_columns},${combination_nfield})
    `;
    }
}


/***/ },

/***/ "./lib/components/transforms/Unite.js"
/*!********************************************!*\
  !*** ./lib/components/transforms/Unite.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Unite: () => (/* binding */ Unite)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inputs/label */ "./lib/components/inputs/label.js");



class Unite extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            ignoreIndex: true,
            sort: false,
            concatDirection: "horizontal",
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "Concatenation direction",
                    id: "concatDirection",
                    tooltip: "Select whether you want to concatenate the datasets vertically (stacking rows) or horizontally (side-by-side columns).",
                    options: [
                        { value: "horizontal", label: "Along columns (horizontal)" },
                        { value: "vertical", label: "Along rows (vertical)" },
                    ],
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Ignore Index",
                    tooltip: "Enable this option to reindex the combined dataset.",
                    id: "ignoreIndex",
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Sort",
                    tooltip: "Disable this option to prevent automatic sorting of columns.",
                    id: "sort",
                    advanced: true,
                },
            ],
        };
        // const description = "Use Concatenate to combine two or more datasets vertically (stacking rows) or horizontally (side-by-side columns)."
        const description = "使用“连接”功能可以将两个或多个数据集纵向（即堆叠行）或横向（即并列列）地进行组合。";
        super(
        // "Concatenate",
        "连接", "concat", description, "pandas_df_multi_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.concatIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return ["import pandas as pd"];
    }
    generateComponentCode({ config, inputNames, outputName }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        const ignoreIndex = config.ignoreIndex !== undefined
            ? `, ignore_index=${config.ignoreIndex ? "True" : "False"}`
            : "";
        const sort = config.sort !== undefined
            ? `, sort=${config.sort ? "True" : "False"}`
            : "";
        const concatDirection = config.concatDirection === "horizontal"
            ? ", axis=1"
            : config.concatDirection === "vertical"
                ? ", axis=0"
                : "";
        const dataframesList = inputNames.join(", ");
        const code = `
# Concatenate dataframes
${outputName} = ${prefix}.concat([${dataframesList}]${ignoreIndex}${sort}${concatDirection})
`;
        return code;
    }
}


/***/ },

/***/ "./lib/components/transforms/files/FileAction.js"
/*!*******************************************************!*\
  !*** ./lib/components/transforms/files/FileAction.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileAction: () => (/* binding */ FileAction)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../inputs/label */ "./lib/components/inputs/label.js");



class FileAction extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            action_on_file_all: "move",
            source_file_path: "",
            action_on_file: "",
            destination_path: "",
            file_new_name: "",
            overwrite_file_if_exists: "",
            retry_count: 0,
            boolean_raise_error: true,
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "Action on file",
                    id: "action_on_file_all",
                    options: [
                        { value: "move", label: "Move" },
                        { value: "delete", label: "Delete" },
                        { value: "rename", label: "Rename" },
                        { value: "copy", label: "Copy" },
                        { value: "zip", label: "Zip" },
                        { value: "create as empty", label: "Create as empty" },
                        { value: "", label: "From Field" },
                    ],
                    advanced: true,
                },
                {
                    type: "column",
                    label: "Source file path",
                    allowedTypes: ["string"],
                    id: "source_file_path",
                    placeholder: "Column name",
                    advanced: true,
                },
                {
                    type: "column",
                    label: "Action on file",
                    tooltip: "Action to perform: move, delete, copy, rename, zip,create as empty (string)",
                    allowedTypes: ["string"],
                    id: "action_on_file",
                    placeholder: "Column name",
                    condition: { action_on_file_all: "" },
                    advanced: true,
                },
                {
                    type: "column",
                    label: "Destination path",
                    tooltip: "Destination path such as C:/windows/result/file.txt or /your/destination/path",
                    allowedTypes: ["string"],
                    id: "destination_path",
                    placeholder: "/your/destination/path",
                    condition: { action_on_file_all: ["", "move", "copy"] },
                    advanced: true,
                },
                {
                    type: "column",
                    label: "New name",
                    tooltip: "New name for the file",
                    allowedTypes: ["string"],
                    id: "file_new_name",
                    placeholder: "Column name",
                    condition: { action_on_file_all: ["", "rename"] },
                    advanced: true,
                },
                {
                    type: "column",
                    label: "Overwrite if exists (boolean)",
                    id: "overwrite_file_if_exists",
                    placeholder: "Column name",
                    allowedTypes: ["bool"],
                    condition: {
                        action_on_file_all: ["", "move", "copy", "zip", "rename"],
                    },
                    advanced: true,
                },
                {
                    type: "column",
                    label: "Retry Count(integer)",
                    allowedTypes: ["numeric"],
                    id: "retry_count",
                    placeholder: "Column name",
                    advanced: true,
                },
                {
                    type: "boolean",
                    label: "Raise an error",
                    tooltip: "Raise an error and stop execution",
                    id: "boolean_raise_error",
                    advanced: true,
                },
            ],
        };
        // const description = "Delete, move, rename, zip.. files";
        const description = "删除、移动、重命名、压缩……文件";
        super(
        //   "File Action",
        "文件操作", "FileAction", description, "pandas_df_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_2__.chineseLabel[2], _icons__WEBPACK_IMPORTED_MODULE_0__.FileActionIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return [
            "import pandas as pd",
            "import os",
            "import shutil",
            "import zipfile",
        ];
    }
    provideFunctions({ config }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        // Functions to normalize and do the file action
        const FileActionFunction = `
def normalize_path(path):
    #Normalize a file path and replace backslashes with slashes for cross-platform consistency.
    #backslash is an escape character so we use the character number
    if pd.isna(path):
        return None
    return os.path.normpath(str(path)).replace(chr(92), "/")

def normalize_input_dataframe(
    input_df,
    file_path_col='file_path',
    destination_col='destination',
    action_col='action',
    new_name_col='new_name',
    overwrite_col='overwrite_if_exists',
    retry_count_col='retry_count',
    action_from_form=""
):

    allowed_actions = {'delete', 'move', 'copy', 'zip', 'rename', 'create as empty'}

    df = input_df.copy()

    # Normalize file paths
    df['normalized_file_path'] = df[file_path_col].apply(normalize_path)

    if destination_col in df.columns:
        df['normalized_destination'] = df[destination_col].apply(normalize_path)
    else:
        df['normalized_destination'] = ""

    # Normalize actions: trim, lowercase, validate, fallback to "unknown"
    if action_col == "":
        # fallback: use action_from_form directly
        action = str(action_from_form).strip().lower()
        df['normalized_action'] = action if action in allowed_actions else "unknown"
    else:
        # use action column + form as fallback
        def resolve_action(row_action):
            action = str(action_from_form).strip().lower() if action_from_form and str(action_from_form).strip().lower() != "undefined" else str(row_action).strip().lower()
            return action if action in allowed_actions else "unknown"

        df['normalized_action'] = df[action_col].apply(resolve_action)

    # Enforce string data type for normalized columns
    df = df.astype({
        'normalized_file_path': 'string',
        'normalized_destination': 'string',
        'normalized_action': 'string'
    })

    return df
#################################################################
def handle_file_safe(file_path, action, destination=None, new_name=None, overwrite=False, retry_count=0, raise_on_error=False):
    import pandas as pd
    import os, shutil, zipfile, time

    overwrite = False if (pd.isna(overwrite) or overwrite == '') else overwrite
    retry_count = 0 if (pd.isna(retry_count) or retry_count == '') else retry_count

    attempt = 0
    last_error_msg = ""
    while attempt <= retry_count:
        try:
            if action == 'delete':
                if pd.isna(file_path) or not os.path.exists(file_path):
                    raise FileNotFoundError(f"File not found: {file_path}")

                os.remove(file_path)
                return 'success', f"Deleted: {file_path}"

            elif action in ['move', 'copy']:
                if pd.isna(destination) or not os.path.exists(file_path):
                    raise FileNotFoundError(f"Source file not found or destination missing: {file_path}")

                dest_dir = os.path.dirname(destination)
                if not os.path.exists(dest_dir):
                    os.makedirs(dest_dir)

                if os.path.exists(destination) and not overwrite:
                    raise FileExistsError(f"Destination file already exists: {destination}")

                if action == 'move':
                    shutil.move(file_path, destination)
                else:
                    shutil.copy(file_path, destination)

                return 'success', f"{action.title()}d to {destination}"

            elif action == 'rename':
                if pd.isna(new_name) or pd.isna(file_path):
                    raise ValueError("new_name missing or file_path invalid for rename")

                new_path = os.path.join(os.path.dirname(file_path), new_name)
                if os.path.exists(new_path) and not overwrite:
                    raise FileExistsError(f"Target name already exists: {new_path}")

                os.rename(file_path, new_path)
                return 'success', f"Renamed to {new_path}"

            elif action == 'create as empty':
                if pd.isna(file_path):
                    raise ValueError("File path is missing for create as empty")

                dir_name = os.path.dirname(file_path)
                if dir_name and not os.path.exists(dir_name):
                    os.makedirs(dir_name)

                if os.path.exists(file_path) and not overwrite:
                    raise FileExistsError(f"File already exists: {file_path}")

                with open(file_path, 'w') as f:
                    pass
                return 'success', f"Empty file created: {file_path}"

            elif action == 'zip':
                if pd.isna(file_path) or not os.path.exists(file_path):
                    raise FileNotFoundError(f"File not found: {file_path}")

                zip_dest = destination if not (pd.isna(destination) or destination == '') else f"{file_path}.zip"
                zip_dir = os.path.dirname(zip_dest)

                if not (pd.isna(destination) or destination == '') and not os.path.exists(zip_dir):
                    os.makedirs(zip_dir)

                if os.path.exists(zip_dest) and not overwrite:
                    raise FileExistsError(f"Zip file already exists: {zip_dest}")

                with zipfile.ZipFile(zip_dest, 'w') as zipf:
                    zipf.write(file_path, os.path.basename(file_path))

                return 'success', f"Zipped to {zip_dest}"

            else:
                raise ValueError(f"Unknown action: {action}")

        except Exception as e:
            last_error_msg = str(e)
            if attempt < retry_count:
                time.sleep(1)
                attempt += 1
            else:
                if raise_on_error:
                    raise
                return 'failure', f"Exception after {attempt+1} attempt(s): {last_error_msg}"
    `;
        return [FileActionFunction];
    }
    // Generate the Python execution script
    generateComponentCode({ config, inputName, outputName, }) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const source_file_path_value = (_b = (_a = config.source_file_path) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "";
        console.log(source_file_path_value);
        const destination_path_value = (_d = (_c = config.destination_path) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : "";
        console.log(destination_path_value);
        const action_on_file_value = (_f = (_e = config.action_on_file) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : "";
        console.log(action_on_file_value);
        const file_new_name_value = (_h = (_g = config.file_new_name) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : "";
        console.log(file_new_name_value);
        const overwrite_file_if_exists_value = (_k = (_j = config.overwrite_file_if_exists) === null || _j === void 0 ? void 0 : _j.value) !== null && _k !== void 0 ? _k : "";
        console.log(overwrite_file_if_exists_value);
        const retry_count_value = (_m = (_l = config.retry_count) === null || _l === void 0 ? void 0 : _l.value) !== null && _m !== void 0 ? _m : "";
        console.log(retry_count_value);
        const action_on_file_all_value = (_o = config.action_on_file_all) !== null && _o !== void 0 ? _o : "";
        console.log(action_on_file_all_value);
        const raise_on_error = config.boolean_raise_error ? "True" : "False";
        return `
# Execute the file action function
${outputName} = []

normalized_input_dataframe=normalize_input_dataframe(
    input_df=${inputName},
    file_path_col='${source_file_path_value}',
    destination_col='${destination_path_value}',
    action_col='${action_on_file_value}',
    new_name_col='${file_new_name_value}',
    overwrite_col='${overwrite_file_if_exists_value}',
    retry_count_col='${retry_count_value}',
    action_from_form='${action_on_file_all_value}'
)
results = normalized_input_dataframe.apply(
    lambda row: handle_file_safe(
        file_path=row['normalized_file_path'],
        action=row['normalized_action'],
        destination=row.get('normalized_destination'),
        new_name=row.get('${file_new_name_value}', ''),
        overwrite = '' if '${overwrite_file_if_exists_value}' == '' else row.get('${overwrite_file_if_exists_value}'),
        retry_count = 0 if '${retry_count_value}' == '' else row.get('${retry_count_value}'),
        raise_on_error=${raise_on_error}
    ),
    axis=1
)

# Unpack results into 'status' and 'reason' columns as strings
normalized_input_dataframe['status'] = results.apply(lambda x: str(x[0]))  # Ensure status is a string
normalized_input_dataframe['reason'] = results.apply(lambda x: str(x[1]))  # Ensure reason is a string
normalized_input_dataframe=normalized_input_dataframe.astype({
        "status": "string",
        "reason": "string"
    })
# The output dataframe
${outputName} = normalized_input_dataframe.copy()
del normalized_input_dataframe
    `;
    }
}


/***/ },

/***/ "./lib/components/transforms/join/AdvancedJoin.js"
/*!********************************************************!*\
  !*** ./lib/components/transforms/join/AdvancedJoin.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdvancedJoin: () => (/* binding */ AdvancedJoin)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");


class AdvancedJoin extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            selectExecutionEngine: "pandas",
            selectJoinType: "left",
            selectActionIfCartesianProduct: "0",
            selectSameNameStrategy: "suffix_right",
        };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "select",
                    label: "连接类型",
                    id: "selectJoinType",
                    //placeholder: "Default: left", (no placeholder because defined in defaultConfig)
                    options: [
                        {
                            value: "inner",
                            label: "Inner",
                            tooltip: "Return only the rows with matching keys in both datasets (intersection).",
                        },
                        {
                            value: "left",
                            label: "Left",
                            tooltip: "Return all rows from the left dataset and matched rows from the right dataset (including NaN for no match).",
                        },
                        {
                            value: "right",
                            label: "Right",
                            tooltip: "Return all rows from the right dataset and matched rows from the left dataset (including NaN for no match).",
                        },
                        {
                            value: "outer",
                            label: "Outer",
                            tooltip: "Return all rows from both datasets, with matches where available and NaN for no match (union).",
                        },
                        {
                            value: "cross",
                            label: "Cross",
                            tooltip: "Creates the cartesian product from both datasets, preserves the order of the left keys.",
                        },
                        {
                            value: "anti-left",
                            label: "Anti Left",
                            tooltip: "Return rows from the left dataset that do not have matching rows in the right dataset.",
                        },
                        {
                            value: "anti-right",
                            label: "Anti Right",
                            tooltip: "Return rows from the right dataset that do not have matching rows in the left dataset.",
                        },
                    ],
                    advanced: true,
                },
                {
                    type: "columnOperationColumn",
                    label: "连接条件",
                    id: "joinConditions",
                    tooltip: "定义一个或多个左列、操作符和右列的连接条件。",
                    options: [
                        { value: "=", label: "=" },
                        { value: ">", label: ">" },
                        { value: "<", label: "<" },
                        { value: ">=", label: ">=" },
                        { value: "<=", label: "<=" },
                    ],
                    operatorControlFieldId: "selectExecutionEngine",
                    operatorLockedValues: ["pandas"],
                    operatorLockedWhenMissing: true,
                },
                {
                    type: "select",
                    label: "Cartesian Product",
                    tooltip: "If the join keys contain duplicates, the result may multiply rows (Cartesian product). Choose how to handle this situation: continue, raise an error, or raise a warning.",
                    id: "selectActionIfCartesianProduct",
                    columnId: 1,
                    options: [
                        {
                            value: "0",
                            label: "Default",
                            tooltip: "No action, execution of the join will continue.",
                        },
                        {
                            value: "2",
                            label: "Raise error if Cartesian product is detected",
                            tooltip: "Execution will be stopped.",
                        },
                        {
                            value: "3",
                            label: "Raise warning if Cartesian product is detected",
                            tooltip: "Execution will continue.",
                        },
                    ],
                    condition: {
                        selectJoinType: [
                            "inner",
                            "left",
                            "right",
                            "outer",
                            "anti-right",
                            "anti-left",
                        ],
                    },
                    advanced: true,
                },
                {
                    type: "select",
                    label: "Strategy for same names",
                    id: "selectSameNameStrategy",
                    columnId: 1,
                    options: [
                        {
                            value: "suffix_right",
                            label: "Add _right suffix",
                            tooltip: "If both datasets have columns with the same name, add '_right' to the columns from the right dataset.",
                        },
                        {
                            value: "suffix_both",
                            label: "Add _left and _right suffixes",
                            tooltip: "If both datasets have columns with the same name, add '_left' to the columns from the left dataset and '_right' to the columns from the right dataset.",
                        },
                        {
                            value: "coalesce",
                            label: "Coalesce",
                            tooltip: "If both datasets have columns with the same name, keep only one column. Fill missing values with data from the right dataset when the left one is empty.",
                        },
                    ],
                    condition: {
                        selectJoinType: ["inner", "left", "right", "outer", "cross"],
                    },
                    advanced: true,
                },
                {
                    type: "select",
                    label: "Execution Engine",
                    id: "selectExecutionEngine",
                    placeholder: "Default: Pandas",
                    options: [
                        {
                            value: "pandas",
                            label: "Pandas",
                            tooltip: "Mature, easy-to-use, great for small-to-medium datasets.",
                        },
                        {
                            value: "polars",
                            label: "Polars",
                            tooltip: "Fast, memory-efficient, great for large-scale in-memory analytics.",
                        },
                        {
                            value: "duckdb",
                            label: "DuckDB",
                            tooltip: "SQL-based, excellent for large datasets",
                        },
                    ],
                    advanced: true,
                },
            ],
        };
        const description = "Use Join Datasets to combine two datasets by one or more columns.";
        super("Join Datasets", "join", description, "pandas_df_double_processor", [], "transforms", _icons__WEBPACK_IMPORTED_MODULE_0__.joinIcon, defaultConfig, form);
    }
    //now always available through requirements.txt
    //    public provideDependencies({ config }): string[] {
    //        const engine = config?.selectExecutionEngine ?? "pandas";
    //        const deps: string[] = [];
    //
    //        if (engine === "polars") {
    //            deps.push("polars", "pyarrow");
    //        } else if (engine === "duckdb") {
    //            deps.push("duckdb", "pyarrow");
    //        }
    //        // pandas assumed available, no extra deps
    //        return deps;
    //    }
    provideImports({ config }) {
        var _a;
        const engine = (_a = config === null || config === void 0 ? void 0 : config.selectExecutionEngine) !== null && _a !== void 0 ? _a : "pandas";
        //pandas always necessary, since output and input are still pandas df
        const imports = ["import pandas as pd", "import warnings"];
        if (engine === "polars") {
            imports.push("import polars as pl", "import pyarrow");
        }
        else if (engine === "duckdb") {
            imports.push("import duckdb", "import pyarrow");
        }
        return imports;
    }
    provideFunctions({ config }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        // Function to perform frequency analysis
        const JoinFunction = `
# Quote identifiers safely for DuckDB
def quote_duckdb(col:str) -> str:           
  return f'"{col}"'

def check_cartesian_product(execution_engine, df1, df2, key_left, key_right):
    #Checks if a Cartesian product may result from the join based on key uniqueness.
	  #
    #Parameters:
		#execution_engine : execution engine (pandas, polars, duckdb...)
        #df1, df2 (pd.DataFrame): DataFrames to join
        #key_left, key_right (str or list of str): Join keys for each DataFrame

    #Returns:
        #bool: True if a Cartesian product is likely, False otherwise.
    if execution_engine == "pandas":
        num_rows_df1 = len(df1)
        num_rows_df2 = len(df2)
        num_duplicates_df1 = df1.duplicated(subset=key_left).sum()
        num_duplicates_df2 = df2.duplicated(subset=key_right).sum()

        print(f"df1: {num_rows_df1} rows, {num_duplicates_df1} duplicate key rows")
        print(f"df2: {num_rows_df2} rows, {num_duplicates_df2} duplicate key rows")

        is_df1_unique = not df1.duplicated(subset=key_left).any()
        is_df2_unique = not df2.duplicated(subset=key_right).any()

    elif execution_engine == "polars":
        pl_df1 = pl.from_pandas(df1)
        pl_df2 = pl.from_pandas(df2)

        num_rows_df1 = pl_df1.height
        num_rows_df2 = pl_df2.height
        num_duplicates_df1 = num_rows_df1 - pl_df1.select(pl.col(key_left)).unique().height
        num_duplicates_df2 = num_rows_df2 - pl_df2.select(pl.col(key_right)).unique().height

        print(f"df1: {num_rows_df1} rows, {num_duplicates_df1} duplicate key rows")
        print(f"df2: {num_rows_df2} rows, {num_duplicates_df2} duplicate key rows")

        is_df1_unique = (num_duplicates_df1 == 0)
        is_df2_unique = (num_duplicates_df2 == 0)

    elif execution_engine == "duckdb":
        duckdb.register("df1", df1)
        duckdb.register("df2", df2)

        num_rows_df1 = duckdb.query("SELECT COUNT(*) FROM df1").fetchone()[0]
        num_rows_df2 = duckdb.query("SELECT COUNT(*) FROM df2").fetchone()[0]

        if isinstance(key_left, str):
            key_left = [key_left]
        if isinstance(key_right, str):
            key_right = [key_right]
            
        # Quote keys before using them in SQL
        quoted_key_left = [quote_duckdb(c) for c in key_left]
        quoted_key_right = [quote_duckdb(c) for c in key_right]
        
        num_unique_df1 = duckdb.query(
            f"SELECT COUNT(DISTINCT {', '.join(quoted_key_left)}) FROM df1"
        ).fetchone()[0]
        num_unique_df2 = duckdb.query(
            f"SELECT COUNT(DISTINCT {', '.join(quoted_key_right)}) FROM df2"
        ).fetchone()[0]

        num_duplicates_df1 = num_rows_df1 - num_unique_df1
        num_duplicates_df2 = num_rows_df2 - num_unique_df2

        print(f"df1: {num_rows_df1} rows, {num_duplicates_df1} duplicate key rows")
        print(f"df2: {num_rows_df2} rows, {num_duplicates_df2} duplicate key rows")

        is_df1_unique = (num_duplicates_df1 == 0)
        is_df2_unique = (num_duplicates_df2 == 0)

    else:
        raise ValueError(f"Unsupported execution engine: {execution_engine}")

    return not (is_df1_unique or is_df2_unique)

def perform_join(execution_engine, df1, df2, key_left, key_right, join_type, same_name_strategy):
    
    #Performs the join operation based on the specified type.

    #Parameters:
        #execution_engine (str): 'pandas', 'polars', or 'duckdb'
        #df1, df2 (pd.DataFrame): DataFrames to join
        #key_left, key_right (str or list of str): Join keys for each DataFrame
        #join_type (str): Join type ('inner', 'left', 'right', 'outer', 'cross', 'anti-left', 'anti-right')
        #same_name_strategy (str): 'suffix_right', 'suffix_both', or 'coalesce'

    #Returns:
        #pd.DataFrame: Joined DataFrame with missing values as pd.NA
    

   # Normalize keys to list
    if isinstance(key_left, str):
        key_left = [key_left]
    if isinstance(key_right, str):
        key_right = [key_right]

    # Find overlaps including keys
    overlap_cols = set(df1.columns).intersection(df2.columns)

    # Strategy: suffix mapping
    if same_name_strategy == 'suffix_right':
        left_suffix, right_suffix = "", "_right"
    elif same_name_strategy == 'suffix_both':
        left_suffix, right_suffix = "_left", "_right"
    elif same_name_strategy == 'coalesce':
        # For coalesce we still join with suffixes internally
        left_suffix, right_suffix = "_left", "_right"
    else:
        raise ValueError(f"Unsupported same_name_strategy: {same_name_strategy}")

    if execution_engine == "pandas":
        if join_type in ['inner', 'left', 'right', 'outer']:
            result = pd.merge(
                df1, df2, 
                how=join_type, 
                left_on=key_left, 
                right_on=key_right,
                suffixes=(left_suffix, right_suffix)
            )
        elif join_type == 'cross':
            result = pd.merge(
                df1, df2,
                how='cross',
                suffixes=(left_suffix, right_suffix)
            )
        elif join_type == 'anti-left':
            merged = pd.merge(
                df1, df2, 
                how='left', 
                left_on=key_left, 
                right_on=key_right, 
                indicator=True, 
                suffixes=(left_suffix, right_suffix)
            )
            result = merged[merged['_merge'] == 'left_only'].drop(columns=['_merge'])
        elif join_type == 'anti-right':
            merged = pd.merge(
                df2, df1, 
                how='left', 
                left_on=key_right, 
                right_on=key_left, 
                indicator=True, 
                suffixes=(left_suffix, right_suffix)
            )
            result = merged[merged['_merge'] == 'left_only'].drop(columns=['_merge'])
        else:
            raise ValueError(f"Unsupported join type: {join_type}")

    elif execution_engine == "polars":
        pl_df1 = pl.from_pandas(df1)
        pl_df2 = pl.from_pandas(df2)

        # Identify overlap (including keys)
        overlap_cols = set(df1.columns).intersection(df2.columns)
				
		# Always initialize rename maps
        rename_map_left = {}
        rename_map_right = {}

        if same_name_strategy == 'suffix_right':
            # Only rename right overlaps
            rename_map_right = {c: f"{c}{right_suffix}" for c in pl_df2.columns if c in overlap_cols}
            pl_df2 = pl_df2.rename(rename_map_right)

        elif same_name_strategy == 'suffix_both':
            rename_map_left = {c: f"{c}{left_suffix}" for c in pl_df1.columns if c in overlap_cols}
            rename_map_right = {c: f"{c}{right_suffix}" for c in pl_df2.columns if c in overlap_cols}
            pl_df1 = pl_df1.rename(rename_map_left)
            pl_df2 = pl_df2.rename(rename_map_right)

        elif same_name_strategy == 'coalesce':
            # Rename both sides internally
            rename_map_left = {c: f"{c}{left_suffix}" for c in pl_df1.columns if c in overlap_cols}
            rename_map_right = {c: f"{c}{right_suffix}" for c in pl_df2.columns if c in overlap_cols}
            pl_df1 = pl_df1.rename(rename_map_left)
            pl_df2 = pl_df2.rename(rename_map_right)

        join_map_pandas_polars = {
            'inner': 'inner',
            'left': 'left',
            'right': 'right',
            'outer': 'full', #outer Deprecated in version 0.20.29
            'cross': 'cross'
        }

        if join_type == 'cross':
            result = pl_df1.join(pl_df2, how='cross')
        elif join_type in join_map_pandas_polars:
            result = pl_df1.join(pl_df2, left_on=[rename_map_left.get(k, k) for k in key_left],
                                 right_on=[rename_map_right.get(k, k) for k in key_right],
                                 how=join_map_pandas_polars[join_type])
        elif join_type == 'anti-left':
            result = pl_df1.join(pl_df2, left_on=[rename_map_left.get(k, k) for k in key_left],
                                 right_on=[rename_map_right.get(k, k) for k in key_right],
                                 how='anti')
        elif join_type == 'anti-right':
            result = pl_df2.join(pl_df1, left_on=[rename_map_right.get(k, k) for k in key_right],
                                 right_on=[rename_map_left.get(k, k) for k in key_left],
                                 how='anti')
        else:
            raise ValueError(f"Unsupported join type: {join_type}")

        # Handle coalesce merging in Polars
        if same_name_strategy == 'coalesce':
            for col in overlap_cols:
                left_col = f"{col}{left_suffix}"
                right_col = f"{col}{right_suffix}"
                if left_col in result.columns and right_col in result.columns:
                    result = result.with_columns(
                        pl.col(left_col).fill_null(pl.col(right_col)).alias(col)
                    ).drop([left_col, right_col])

        result = result.to_pandas()

    elif execution_engine == "duckdb":
        duckdb.register("df1", df1)
        duckdb.register("df2", df2)

        if same_name_strategy == 'suffix_right':
            left_cols = [f"df1.{quote_duckdb(c)}" for c in df1.columns]
            right_cols = [f"df2.{quote_duckdb(c)} AS {quote_duckdb(c+right_suffix)}" if c in overlap_cols else f"df2.{quote_duckdb(c)}" for c in df2.columns]
        elif same_name_strategy == 'suffix_both':
            left_cols = [f"df1.{quote_duckdb(c)} AS {quote_duckdb(c+left_suffix)}" if c in overlap_cols else f"df1.{quote_duckdb(c)}" for c in df1.columns]
            right_cols = [f"df2.{quote_duckdb(c)} AS {quote_duckdb(c+right_suffix)}" if c in overlap_cols else f"df2.{c}" for c in df2.columns]
        elif same_name_strategy == 'coalesce':
             # Build coalesced expressions for overlapping cols (including keys)
            left_cols = []
            right_cols = []
            for c in df1.columns:
              if c in overlap_cols:
                # coalesce(df1.c, df2.c) as c
                left_cols.append(f"COALESCE(df1.{quote_duckdb(c)}, df2.{quote_duckdb(c)}) AS {quote_duckdb(c)}")
              else:
                left_cols.append(f"df1.{quote_duckdb(c)}")
              for c in df2.columns:
                 if c not in overlap_cols:  # already handled in coalesce
                    right_cols.append(f"df2.{quote_duckdb(c)}")
        else:
            raise ValueError(f"Unsupported same_name_strategy: {same_name_strategy}")

        select_clause = ", ".join(left_cols + right_cols)
        key_pairs = " AND ".join(f"df1.{quote_duckdb(l)} = df2.{quote_duckdb(r)}" for l, r in zip(key_left, key_right))

        if join_type == 'cross':
            query = f"SELECT {select_clause} FROM df1 CROSS JOIN df2"
        elif join_type in ['inner', 'left', 'right', 'outer']:
            sql_how = "full outer" if join_type == "outer" else join_type
            query = f"SELECT {select_clause} FROM df1 {sql_how} JOIN df2 ON {key_pairs}"
        #for anti-left and right, we only retrieve one side in result so no need for name strategy    
        elif join_type == 'anti-left':
            query = f"""
                SELECT {', '.join(left_cols)}
                FROM df1
                LEFT JOIN df2 ON {key_pairs}
                WHERE df2.{quote_duckdb(key_right[0])} IS NULL
            """
        elif join_type == 'anti-right':
            query = f"""
                SELECT {', '.join(right_cols)}
                FROM df2
                LEFT JOIN df1 ON {key_pairs}
                WHERE df1.{quote_duckdb(key_left[0])} IS NULL
            """
        else:
            raise ValueError(f"Unsupported join type: {join_type}")

        result = duckdb.query(query).to_df()

    else:
        raise ValueError(f"Unsupported execution engine: {execution_engine}")

    # Apply coalesce if needed
    #if same_name_strategy == 'coalesce':
    #    for col in overlap_cols:
    #        left_col = f"{col}{left_suffix}"
    #        right_col = f"{col}{right_suffix}"
    #        if left_col in result.columns and right_col in result.columns:
    #            result[col] = result[left_col].combine_first(result[right_col])
    #           result.drop(columns=[left_col, right_col], inplace=True)

    # Normalize missing values
    result = result.convert_dtypes()

    return result

def advanced_join(execution_engine,df1, df2, key_left, key_right, join_type, action_if_cartesian_product=0,same_name_strategy='suffix_right'):
    #Main function to handle join logic with optional Cartesian product check.

    #Parameters:
		#execution_engine : execution engine (pandas, polars, duckdb...)
        #df1, df2 (pd.DataFrame): DataFrames to join
        #key_left, key_right (str or list of str): Join keys for each DataFrame
        #join_type (str): Join type (e.g. "inner", "left", "cross", etc.)
        #action_if_cartesian_product (int): 
            #0 - Do nothing
            #2 - Raise error if Cartesian product is detected
            #3 - Raise warning if Cartesian product is detected
        #same_name_strategy (str): 'suffix_right', 'suffix_both', or 'coalesce'
    #Returns:
        #pd.DataFrame: Joined result

    # Normalize key inputs to lists
    if isinstance(key_left, str):
        key_left = [key_left]
    if isinstance(key_right, str):
        key_right = [key_right]

    if join_type != 'cross' and action_if_cartesian_product in [2, 3]:
        is_cartesian = check_cartesian_product(execution_engine,df1, df2, key_left, key_right)
        if is_cartesian:
            if action_if_cartesian_product == 2:
                raise ValueError("Cartesian product detected and not allowed.")
            elif action_if_cartesian_product == 3:
                warnings.warn("Cartesian product detected.")

    return perform_join(execution_engine,df1, df2, key_left, key_right, join_type, same_name_strategy)

def advanced_join_with_operations(df1, df2, conditions, join_type='inner', same_name_strategy='suffix_right'):
    if same_name_strategy == 'suffix_right':
        left_suffix, right_suffix = "", "_right"
    elif same_name_strategy == 'suffix_both':
        left_suffix, right_suffix = "_left", "_right"
    elif same_name_strategy == 'coalesce':
        left_suffix, right_suffix = "_left", "_right"
    else:
        raise ValueError(f"Unsupported same_name_strategy: {same_name_strategy}")

    if join_type == "cross":
        result = pd.merge(df1, df2, how="cross", suffixes=(left_suffix, right_suffix))
        return result.convert_dtypes()

    if not conditions:
        raise ValueError("At least one join condition is required.")

    left_idx = "__amphi_left_idx__"
    right_idx = "__amphi_right_idx__"
    while left_idx in df1.columns:
        left_idx = f"_{left_idx}"
    while right_idx in df2.columns:
        right_idx = f"_{right_idx}"

    left = df1.copy()
    right = df2.copy()
    left[left_idx] = range(len(left))
    right[right_idx] = range(len(right))

    overlap_cols = set(df1.columns).intersection(df2.columns)
    left_renamed = {c: (f"{c}{left_suffix}" if c in overlap_cols and left_suffix else c) for c in df1.columns}
    right_renamed = {c: (f"{c}{right_suffix}" if c in overlap_cols else c) for c in df2.columns}

    cross = pd.merge(left, right, how="cross", suffixes=(left_suffix, right_suffix))
    output_cols = [c for c in cross.columns if c not in [left_idx, right_idx]]

    mask = pd.Series(True, index=cross.index)
    for cond in conditions:
        left_col = left_renamed.get(cond["left"], cond["left"])
        right_col = right_renamed.get(cond["right"], cond["right"])
        op = cond.get("op", "=")
        if op == "=":
            mask &= (cross[left_col] == cross[right_col])
        elif op == ">":
            mask &= (cross[left_col] > cross[right_col])
        elif op == "<":
            mask &= (cross[left_col] < cross[right_col])
        elif op == ">=":
            mask &= (cross[left_col] >= cross[right_col])
        elif op == "<=":
            mask &= (cross[left_col] <= cross[right_col])
        else:
            raise ValueError(f"Unsupported operator: {op}")

    matched = cross[mask].copy()
    matched_left = set(matched[left_idx].tolist()) if not matched.empty else set()
    matched_right = set(matched[right_idx].tolist()) if not matched.empty else set()

    def build_unmatched_rows(unmatched_df, side):
        frame = pd.DataFrame({col: [pd.NA] * len(unmatched_df) for col in output_cols})
        for c in df1.columns:
            target = left_renamed.get(c, c)
            if side == "left":
                frame[target] = unmatched_df[c].values
        for c in df2.columns:
            target = right_renamed.get(c, c)
            if side == "right":
                frame[target] = unmatched_df[c].values
        return frame

    if join_type == "inner":
        result = matched
    elif join_type == "left":
        unmatched_left = left[~left[left_idx].isin(matched_left)]
        result = pd.concat([matched, build_unmatched_rows(unmatched_left, "left")], ignore_index=True)
    elif join_type == "right":
        unmatched_right = right[~right[right_idx].isin(matched_right)]
        result = pd.concat([matched, build_unmatched_rows(unmatched_right, "right")], ignore_index=True)
    elif join_type == "outer":
        unmatched_left = left[~left[left_idx].isin(matched_left)]
        unmatched_right = right[~right[right_idx].isin(matched_right)]
        result = pd.concat(
            [matched, build_unmatched_rows(unmatched_left, "left"), build_unmatched_rows(unmatched_right, "right")],
            ignore_index=True
        )
    elif join_type == "anti-left":
        unmatched_left = left[~left[left_idx].isin(matched_left)]
        result = build_unmatched_rows(unmatched_left, "left")
    elif join_type == "anti-right":
        unmatched_right = right[~right[right_idx].isin(matched_right)]
        result = build_unmatched_rows(unmatched_right, "right")
    else:
        raise ValueError(f"Unsupported join type: {join_type}")

    result = result.drop(columns=[c for c in [left_idx, right_idx] if c in result.columns], errors="ignore")

    if same_name_strategy == "coalesce":
        for col in overlap_cols:
            left_col = f"{col}{left_suffix}"
            right_col = f"{col}{right_suffix}"
            if left_col in result.columns and right_col in result.columns:
                result[col] = result[left_col].combine_first(result[right_col])
                result = result.drop(columns=[left_col, right_col])

    return result.convert_dtypes()

    `;
        return [JoinFunction];
    }
    generateComponentCode({ config, inputName1, inputName2, outputName, }) {
        var _a, _b, _c, _d;
        const const_ts_execution_engine = (_a = config.selectExecutionEngine) !== null && _a !== void 0 ? _a : "pandas";
        const rawJoinConditions = config.joinConditions && config.joinConditions.length > 0
            ? config.joinConditions
            : (config.leftKeyColumn || []).map((leftColumn, index) => {
                var _a;
                return ({
                    leftColumn,
                    operation: "=",
                    rightColumn: (_a = config.rightKeyColumn) === null || _a === void 0 ? void 0 : _a[index],
                });
            });
        const joinConditions = rawJoinConditions.filter((condition) => { var _a, _b; return ((_a = condition === null || condition === void 0 ? void 0 : condition.leftColumn) === null || _a === void 0 ? void 0 : _a.value) && ((_b = condition === null || condition === void 0 ? void 0 : condition.rightColumn) === null || _b === void 0 ? void 0 : _b.value); });
        const hasNonEqualityOperation = joinConditions.some((condition) => (condition.operation || "=") !== "=");
        const formatColumnReference = (column) => (column === null || column === void 0 ? void 0 : column.named) === false ? `${column.value}` : `"${column.value}"`;
        const const_ts_leftKeys = joinConditions.map((condition) => formatColumnReference(condition.leftColumn));
        const const_ts_rightKeys = joinConditions.map((condition) => formatColumnReference(condition.rightColumn));
        const const_ts_joinType = (_b = config.selectJoinType) !== null && _b !== void 0 ? _b : "left";
        const const_ts_action_if_cartesian_product = (_c = config.selectActionIfCartesianProduct) !== null && _c !== void 0 ? _c : "0";
        const const_ts_selectSameNameStrategy = (_d = config.selectSameNameStrategy) !== null && _d !== void 0 ? _d : "suffix_right";
        const const_ts_leftKeysStr = `[${const_ts_leftKeys.join(", ")}]`;
        const const_ts_rightKeysStr = `[${const_ts_rightKeys.join(", ")}]`;
        const conditionsStr = `[${joinConditions
            .map((condition) => `{"left": ${formatColumnReference(condition.leftColumn)}, "op": "${condition.operation || "="}", "right": ${formatColumnReference(condition.rightColumn)}}`)
            .join(", ")}]`;
        let code = `# Join ${inputName1} and ${inputName2}\n`;
        if (const_ts_joinType !== "cross" && joinConditions.length === 0) {
            code += `raise ValueError("At least one join condition is required.")\n`;
        }
        else if (hasNonEqualityOperation) {
            code += `${outputName}=advanced_join_with_operations(df1=${inputName1}, df2=${inputName2}, conditions=${conditionsStr}, join_type='${const_ts_joinType}', same_name_strategy='${const_ts_selectSameNameStrategy}')`;
        }
        else {
            code += `${outputName}=advanced_join(execution_engine='${const_ts_execution_engine}',df1=${inputName1}, df2=${inputName2}, key_left=${const_ts_leftKeysStr}, key_right=${const_ts_rightKeysStr}, join_type='${const_ts_joinType}', action_if_cartesian_product=${const_ts_action_if_cartesian_product},same_name_strategy='${const_ts_selectSameNameStrategy}')`;
        }
        return code;
    }
}


/***/ },

/***/ "./lib/components/transforms/join/BasicJoin.js"
/*!*****************************************************!*\
  !*** ./lib/components/transforms/join/BasicJoin.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Join: () => (/* binding */ Join)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");


class Join extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = { selectJoinType: "left" };
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "select",
                    label: "连接类型",
                    id: "selectJoinType",
                    placeholder: "Default: Inner",
                    options: [
                        {
                            value: "inner",
                            label: "Inner",
                            tooltip: "Return only the rows with matching keys in both datasets (intersection).",
                        },
                        {
                            value: "left",
                            label: "Left",
                            tooltip: "Return all rows from the left dataset and matched rows from the right dataset (including NaN for no match).",
                        },
                        {
                            value: "right",
                            label: "Right",
                            tooltip: "Return all rows from the right dataset and matched rows from the left dataset (including NaN for no match).",
                        },
                        {
                            value: "outer",
                            label: "Outer",
                            tooltip: "Return all rows from both datasets, with matches where available and NaN for no match (union).",
                        },
                        {
                            value: "cross",
                            label: "Cross",
                            tooltip: "Creates the cartesian product from both datasets, preserves the order of the left keys.",
                        },
                        {
                            value: "anti-left",
                            label: "Anti Left",
                            tooltip: "Return rows from the left dataset that do not have matching rows in the right dataset.",
                        },
                        {
                            value: "anti-right",
                            label: "Anti Right",
                            tooltip: "Return rows from the right dataset that do not have matching rows in the left dataset.",
                        },
                    ],
                },
                {
                    type: "columnOperationColumn",
                    label: "连接条件",
                    id: "joinConditions",
                    tooltip: "定义一个或多个左列、操作符和右列的连接条件。",
                    options: [
                        { value: "=", label: "=" },
                        { value: ">", label: ">" },
                        { value: "<", label: "<" },
                        { value: ">=", label: ">=" },
                        { value: "<=", label: "<=" },
                    ],
                    operatorControlFieldId: "selectExecutionEngine",
                    operatorLockedValues: ["pandas"],
                    operatorLockedWhenMissing: true,
                    advanced: true,
                },
            ],
        };
        const description = "Use Join Datasets to combine two datasets by one or more columns.";
        super("Join Datasets", "join", description, "pandas_df_double_processor", [], "transforms", _icons__WEBPACK_IMPORTED_MODULE_0__.joinIcon, defaultConfig, form);
    }
    provideImports({ config }) {
        return ["import pandas as pd"];
    }
    provideFunctions({ config }) {
        const joinWithOperations = `
def join_with_column_operations(df_left, df_right, conditions, join_type="inner", left_suffix="", right_suffix="_right"):
    if join_type == "cross":
        result = pd.merge(df_left, df_right, how="cross", suffixes=(left_suffix, right_suffix))
        return result.convert_dtypes()

    if not conditions:
        raise ValueError("At least one join condition is required.")

    left_idx = "__amphi_left_idx__"
    right_idx = "__amphi_right_idx__"
    while left_idx in df_left.columns:
        left_idx = f"_{left_idx}"
    while right_idx in df_right.columns:
        right_idx = f"_{right_idx}"

    left = df_left.copy()
    right = df_right.copy()
    left[left_idx] = range(len(left))
    right[right_idx] = range(len(right))

    overlap_cols = set(df_left.columns).intersection(df_right.columns)
    left_renamed = {c: (f"{c}{left_suffix}" if c in overlap_cols and left_suffix else c) for c in df_left.columns}
    right_renamed = {c: (f"{c}{right_suffix}" if c in overlap_cols else c) for c in df_right.columns}

    cross = pd.merge(left, right, how="cross", suffixes=(left_suffix, right_suffix))
    output_cols = [c for c in cross.columns if c not in [left_idx, right_idx]]

    mask = pd.Series(True, index=cross.index)
    for cond in conditions:
        left_col = left_renamed.get(cond["left"], cond["left"])
        right_col = right_renamed.get(cond["right"], cond["right"])
        op = cond.get("op", "=")
        if op == "=":
            mask &= (cross[left_col] == cross[right_col])
        elif op == ">":
            mask &= (cross[left_col] > cross[right_col])
        elif op == "<":
            mask &= (cross[left_col] < cross[right_col])
        elif op == ">=":
            mask &= (cross[left_col] >= cross[right_col])
        elif op == "<=":
            mask &= (cross[left_col] <= cross[right_col])
        else:
            raise ValueError(f"Unsupported operator: {op}")

    matched = cross[mask].copy()
    matched_left = set(matched[left_idx].tolist()) if not matched.empty else set()
    matched_right = set(matched[right_idx].tolist()) if not matched.empty else set()

    def build_unmatched_rows(unmatched_df, side):
        frame = pd.DataFrame({col: [pd.NA] * len(unmatched_df) for col in output_cols})
        for c in df_left.columns:
            target = left_renamed.get(c, c)
            if side == "left":
                frame[target] = unmatched_df[c].values
        for c in df_right.columns:
            target = right_renamed.get(c, c)
            if side == "right":
                frame[target] = unmatched_df[c].values
        return frame

    if join_type == "inner":
        result = matched
    elif join_type == "left":
        unmatched_left = left[~left[left_idx].isin(matched_left)]
        result = pd.concat([matched, build_unmatched_rows(unmatched_left, "left")], ignore_index=True)
    elif join_type == "right":
        unmatched_right = right[~right[right_idx].isin(matched_right)]
        result = pd.concat([matched, build_unmatched_rows(unmatched_right, "right")], ignore_index=True)
    elif join_type == "outer":
        unmatched_left = left[~left[left_idx].isin(matched_left)]
        unmatched_right = right[~right[right_idx].isin(matched_right)]
        result = pd.concat(
            [matched, build_unmatched_rows(unmatched_left, "left"), build_unmatched_rows(unmatched_right, "right")],
            ignore_index=True
        )
    elif join_type == "anti-left":
        unmatched_left = left[~left[left_idx].isin(matched_left)]
        result = build_unmatched_rows(unmatched_left, "left")
    elif join_type == "anti-right":
        unmatched_right = right[~right[right_idx].isin(matched_right)]
        result = build_unmatched_rows(unmatched_right, "right")
    else:
        raise ValueError(f"Unsupported join type: {join_type}")

    result = result.drop(columns=[c for c in [left_idx, right_idx] if c in result.columns], errors="ignore")
    return result.convert_dtypes()
`;
        return [joinWithOperations];
    }
    generateComponentCode({ config, inputName1, inputName2, outputName, }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        const joinType = config.selectJoinType || "left";
        const rawJoinConditions = config.joinConditions && config.joinConditions.length > 0
            ? config.joinConditions
            : (config.leftKeyColumn || []).map((leftColumn, index) => {
                var _a;
                return ({
                    leftColumn,
                    operation: "=",
                    rightColumn: (_a = config.rightKeyColumn) === null || _a === void 0 ? void 0 : _a[index],
                });
            });
        const joinConditions = rawJoinConditions.filter((condition) => { var _a, _b; return ((_a = condition === null || condition === void 0 ? void 0 : condition.leftColumn) === null || _a === void 0 ? void 0 : _a.value) && ((_b = condition === null || condition === void 0 ? void 0 : condition.rightColumn) === null || _b === void 0 ? void 0 : _b.value); });
        const hasNonEqualityOperation = joinConditions.some((condition) => (condition.operation || "=") !== "=");
        const formatColumnReference = (column) => (column === null || column === void 0 ? void 0 : column.named) === false ? `${column.value}` : `"${column.value}"`;
        const leftKeys = joinConditions.map((condition) => formatColumnReference(condition.leftColumn));
        const rightKeys = joinConditions.map((condition) => formatColumnReference(condition.rightColumn));
        const leftKeysStr = `[${leftKeys.join(", ")}]`;
        const rightKeysStr = `[${rightKeys.join(", ")}]`;
        const conditionsStr = `[${joinConditions
            .map((condition) => `{"left": ${formatColumnReference(condition.leftColumn)}, "op": "${condition.operation || "="}", "right": ${formatColumnReference(condition.rightColumn)}}`)
            .join(", ")}]`;
        let code = `# Join ${inputName1} and ${inputName2}\n`;
        if (joinType !== "cross" && joinConditions.length === 0) {
            code += `raise ValueError("At least one join condition is required.")\n`;
        }
        else if (hasNonEqualityOperation) {
            code += `${outputName} = join_with_column_operations(${inputName1}, ${inputName2}, conditions=${conditionsStr}, join_type="${joinType}")\n`;
        }
        else if (joinType === "cross") {
            code += `${outputName} = ${prefix}.merge(${inputName1}, ${inputName2}, how="cross")\n`;
        }
        else if (joinType === "anti-left") {
            code += `${outputName} = ${prefix}.merge(${inputName1}, ${inputName2}, left_on=${leftKeysStr}, right_on=${rightKeysStr}, how="left", indicator=True)\n`;
            code += `${outputName} = ${outputName}[${outputName}["_merge"] == "left_only"].drop(columns=["_merge"])\n`;
        }
        else if (joinType === "anti-right") {
            code += `${outputName} = ${prefix}.merge(${inputName1}, ${inputName2}, left_on=${leftKeysStr}, right_on=${rightKeysStr}, how="right", indicator=True)\n`;
            code += `${outputName} = ${outputName}[${outputName}["_merge"] == "right_only"].drop(columns=["_merge"])\n`;
        }
        else {
            code += `${outputName} = ${prefix}.merge(${inputName1}, ${inputName2}, left_on=${leftKeysStr}, right_on=${rightKeysStr}, how="${joinType}")\n`;
        }
        return code;
    }
}


/***/ },

/***/ "./lib/components/transforms/join/Join.js"
/*!************************************************!*\
  !*** ./lib/components/transforms/join/Join.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CombinedJoin: () => (/* binding */ CombinedJoin)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _BasicJoin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BasicJoin */ "./lib/components/transforms/join/BasicJoin.js");
/* harmony import */ var _AdvancedJoin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AdvancedJoin */ "./lib/components/transforms/join/AdvancedJoin.js");
/* harmony import */ var _inputs_label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../inputs/label */ "./lib/components/inputs/label.js");





class CombinedJoin extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
    constructor() {
        const defaultConfig = {
            mode: "basic",
            selectJoinType: "left",
            selectActionIfCartesianProduct: "0",
            selectSameNameStrategy: "suffix_right",
        };
        const basic = new _BasicJoin__WEBPACK_IMPORTED_MODULE_2__.Join();
        const advanced = new _AdvancedJoin__WEBPACK_IMPORTED_MODULE_3__.AdvancedJoin();
        const getFields = (comp) => {
            const form = comp._form;
            return Array.isArray(form === null || form === void 0 ? void 0 : form.fields) ? form.fields : [];
        };
        const wrapFields = (fields, mode) => fields.map((f) => ({
            ...f,
            condition: { mode: [mode], ...(f.condition || {}) },
        }));
        const form = {
            idPrefix: "component__form",
            fields: [
                {
                    type: "radio",
                    label: "Type",
                    id: "mode",
                    options: [
                        { value: "basic", label: "Basic" },
                        { value: "advanced", label: "Advanced" },
                    ],
                    advanced: true,
                },
                ...wrapFields(getFields(basic), "basic"),
                ...wrapFields(getFields(advanced), "advanced"),
            ],
        };
        const description = "使用单个组件将数据集进行合并。通过复选框选择“基础”或“高级”模式。";
        // const description =
        //   "Join Datasets with a single component. Pick Basic or Advanced via radio.";
        super(
        // "Join Datasets",
        "合并数据集", "join", description, "pandas_df_double_processor", [], _inputs_label__WEBPACK_IMPORTED_MODULE_4__.chineseLabel[1], _icons__WEBPACK_IMPORTED_MODULE_0__.joinIcon, defaultConfig, form);
    }
    //no need now
    // public provideDependencies({ config }): string[] {
    //  Only AdvancedJoin exposes deps; basic mode returns none
    // if (config?.mode === "advanced") {
    // return new AdvancedJoin().provideDependencies?.({ config }) ?? [];
    // }
    // return [];
    // }
    provideImports({ config }) {
        const mode = config.mode;
        const imports = mode === "advanced"
            ? new _AdvancedJoin__WEBPACK_IMPORTED_MODULE_3__.AdvancedJoin().provideImports({ config })
            : new _BasicJoin__WEBPACK_IMPORTED_MODULE_2__.Join().provideImports({ config });
        const seen = new Set();
        return imports.filter((i) => (seen.has(i) ? false : (seen.add(i), true)));
    }
    provideFunctions({ config }) {
        if (config.mode === "advanced" &&
            typeof _AdvancedJoin__WEBPACK_IMPORTED_MODULE_3__.AdvancedJoin.prototype.provideFunctions === "function") {
            return new _AdvancedJoin__WEBPACK_IMPORTED_MODULE_3__.AdvancedJoin().provideFunctions({ config });
        }
        return [];
    }
    generateComponentCode({ config, inputName1, inputName2, outputName, }) {
        return config.mode === "advanced"
            ? new _AdvancedJoin__WEBPACK_IMPORTED_MODULE_3__.AdvancedJoin().generateComponentCode({
                config,
                inputName1,
                inputName2,
                outputName,
            })
            : new _BasicJoin__WEBPACK_IMPORTED_MODULE_2__.Join().generateComponentCode({
                config,
                inputName1,
                inputName2,
                outputName,
            });
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
/* harmony export */   CompareDataframesIcon: () => (/* binding */ CompareDataframesIcon),
/* harmony export */   DataframeDeleteIcon: () => (/* binding */ DataframeDeleteIcon),
/* harmony export */   DataframeIcon: () => (/* binding */ DataframeIcon),
/* harmony export */   FileActionIcon: () => (/* binding */ FileActionIcon),
/* harmony export */   PackagesListIcon: () => (/* binding */ PackagesListIcon),
/* harmony export */   UniqueKeyIcon: () => (/* binding */ UniqueKeyIcon),
/* harmony export */   activityIcon: () => (/* binding */ activityIcon),
/* harmony export */   aggregateIcon: () => (/* binding */ aggregateIcon),
/* harmony export */   annotationIcon: () => (/* binding */ annotationIcon),
/* harmony export */   apiIcon: () => (/* binding */ apiIcon),
/* harmony export */   bigQueryIcon: () => (/* binding */ bigQueryIcon),
/* harmony export */   boxIcon: () => (/* binding */ boxIcon),
/* harmony export */   bucketIcon: () => (/* binding */ bucketIcon),
/* harmony export */   calendarIcon: () => (/* binding */ calendarIcon),
/* harmony export */   changeCircleIcon: () => (/* binding */ changeCircleIcon),
/* harmony export */   chromaIcon: () => (/* binding */ chromaIcon),
/* harmony export */   codeIcon: () => (/* binding */ codeIcon),
/* harmony export */   columnRemoveIcon: () => (/* binding */ columnRemoveIcon),
/* harmony export */   concatIcon: () => (/* binding */ concatIcon),
/* harmony export */   consoleIcon: () => (/* binding */ consoleIcon),
/* harmony export */   convertIcon: () => (/* binding */ convertIcon),
/* harmony export */   databaseIcon: () => (/* binding */ databaseIcon),
/* harmony export */   dedupIcon: () => (/* binding */ dedupIcon),
/* harmony export */   dynamicGenerateCalendarIcon: () => (/* binding */ dynamicGenerateCalendarIcon),
/* harmony export */   editIcon: () => (/* binding */ editIcon),
/* harmony export */   engineIcon: () => (/* binding */ engineIcon),
/* harmony export */   expandIcon: () => (/* binding */ expandIcon),
/* harmony export */   expandJsonIcon: () => (/* binding */ expandJsonIcon),
/* harmony export */   extractIcon: () => (/* binding */ extractIcon),
/* harmony export */   eyeGlassesIcon: () => (/* binding */ eyeGlassesIcon),
/* harmony export */   fileCsvIcon: () => (/* binding */ fileCsvIcon),
/* harmony export */   fileExcelIcon: () => (/* binding */ fileExcelIcon),
/* harmony export */   fileJsonIcon: () => (/* binding */ fileJsonIcon),
/* harmony export */   fileParquetIcon: () => (/* binding */ fileParquetIcon),
/* harmony export */   filePdfIcon: () => (/* binding */ filePdfIcon),
/* harmony export */   filePlusIcon: () => (/* binding */ filePlusIcon),
/* harmony export */   fileSpreadsheetIcon: () => (/* binding */ fileSpreadsheetIcon),
/* harmony export */   fileTextIcon: () => (/* binding */ fileTextIcon),
/* harmony export */   fileVariableIcon: () => (/* binding */ fileVariableIcon),
/* harmony export */   fileXmlIcon: () => (/* binding */ fileXmlIcon),
/* harmony export */   filterIcon: () => (/* binding */ filterIcon),
/* harmony export */   formulaIcon: () => (/* binding */ formulaIcon),
/* harmony export */   generateCalendarIcon: () => (/* binding */ generateCalendarIcon),
/* harmony export */   globeIcon: () => (/* binding */ globeIcon),
/* harmony export */   hierarchyIcon: () => (/* binding */ hierarchyIcon),
/* harmony export */   htmlIcon: () => (/* binding */ htmlIcon),
/* harmony export */   htmlLineIcon: () => (/* binding */ htmlLineIcon),
/* harmony export */   joinIcon: () => (/* binding */ joinIcon),
/* harmony export */   jsonIcon: () => (/* binding */ jsonIcon),
/* harmony export */   keyIcon: () => (/* binding */ keyIcon),
/* harmony export */   lockIcon: () => (/* binding */ lockIcon),
/* harmony export */   markdownIcon: () => (/* binding */ markdownIcon),
/* harmony export */   mongodbIcon: () => (/* binding */ mongodbIcon),
/* harmony export */   mySQLIcon: () => (/* binding */ mySQLIcon),
/* harmony export */   numberIcon: () => (/* binding */ numberIcon),
/* harmony export */   openAiIcon: () => (/* binding */ openAiIcon),
/* harmony export */   oracleIcon: () => (/* binding */ oracleIcon),
/* harmony export */   pineconeIcon: () => (/* binding */ pineconeIcon),
/* harmony export */   pivotIcon: () => (/* binding */ pivotIcon),
/* harmony export */   playCircleIcon: () => (/* binding */ playCircleIcon),
/* harmony export */   plusCircleIcon: () => (/* binding */ plusCircleIcon),
/* harmony export */   postgresIcon: () => (/* binding */ postgresIcon),
/* harmony export */   pythonIcon: () => (/* binding */ pythonIcon),
/* harmony export */   redditIcon: () => (/* binding */ redditIcon),
/* harmony export */   renameIcon: () => (/* binding */ renameIcon),
/* harmony export */   s3Icon: () => (/* binding */ s3Icon),
/* harmony export */   sampleIcon: () => (/* binding */ sampleIcon),
/* harmony export */   settingsIcon: () => (/* binding */ settingsIcon),
/* harmony export */   snowflakeIcon: () => (/* binding */ snowflakeIcon),
/* harmony export */   sortIcon: () => (/* binding */ sortIcon),
/* harmony export */   splitIcon: () => (/* binding */ splitIcon),
/* harmony export */   sqlServerIcon: () => (/* binding */ sqlServerIcon),
/* harmony export */   transposeIcon: () => (/* binding */ transposeIcon),
/* harmony export */   trinoIcon: () => (/* binding */ trinoIcon),
/* harmony export */   typescriptIcon: () => (/* binding */ typescriptIcon),
/* harmony export */   unlockIcon: () => (/* binding */ unlockIcon),
/* harmony export */   variableIcon: () => (/* binding */ variableIcon),
/* harmony export */   washIcon: () => (/* binding */ washIcon),
/* harmony export */   xIcon: () => (/* binding */ xIcon)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_icons_file_txt_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/icons/file-txt.svg */ "./style/icons/file-txt.svg");
/* harmony import */ var _style_icons_file_plus_24_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/icons/file-plus-24.svg */ "./style/icons/file-plus-24.svg");
/* harmony import */ var _style_icons_console_message_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/icons/console-message.svg */ "./style/icons/console-message.svg");
/* harmony import */ var _style_icons_annotation_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/icons/annotation.svg */ "./style/icons/annotation.svg");
/* harmony import */ var _style_icons_api_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/icons/api.svg */ "./style/icons/api.svg");
/* harmony import */ var _style_icons_code_24_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style/icons/code-24.svg */ "./style/icons/code-24.svg");
/* harmony import */ var _style_icons_filter_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/icons/filter.svg */ "./style/icons/filter.svg");
/* harmony import */ var _style_icons_aggregate_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../style/icons/aggregate.svg */ "./style/icons/aggregate.svg");
/* harmony import */ var _style_icons_network_alt_24_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../style/icons/network-alt-24.svg */ "./style/icons/network-alt-24.svg");
/* harmony import */ var _style_icons_duplicate_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../style/icons/duplicate.svg */ "./style/icons/duplicate.svg");
/* harmony import */ var _style_icons_extract_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../style/icons/extract.svg */ "./style/icons/extract.svg");
/* harmony import */ var _style_icons_globe_24_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../style/icons/globe-24.svg */ "./style/icons/globe-24.svg");
/* harmony import */ var _style_icons_sort_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../style/icons/sort.svg */ "./style/icons/sort.svg");
/* harmony import */ var _style_icons_rename_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../style/icons/rename.svg */ "./style/icons/rename.svg");
/* harmony import */ var _style_icons_convert_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../style/icons/convert.svg */ "./style/icons/convert.svg");
/* harmony import */ var _style_icons_scissors_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../style/icons/scissors.svg */ "./style/icons/scissors.svg");
/* harmony import */ var _style_icons_mysql_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../style/icons/mysql.svg */ "./style/icons/mysql.svg");
/* harmony import */ var _style_icons_box_16_svg__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../style/icons/box-16.svg */ "./style/icons/box-16.svg");
/* harmony import */ var _style_icons_reddit_svg__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../style/icons/reddit.svg */ "./style/icons/reddit.svg");
/* harmony import */ var _style_icons_join_svg__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../style/icons/join.svg */ "./style/icons/join.svg");
/* harmony import */ var _style_icons_column_remove_svg__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../style/icons/column-remove.svg */ "./style/icons/column-remove.svg");
/* harmony import */ var _style_icons_sample_svg__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../style/icons/sample.svg */ "./style/icons/sample.svg");
/* harmony import */ var _style_icons_openai_svg__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../style/icons/openai.svg */ "./style/icons/openai.svg");
/* harmony import */ var _style_icons_postgres_svg__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../style/icons/postgres.svg */ "./style/icons/postgres.svg");
/* harmony import */ var _style_icons_pinecone_svg__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../style/icons/pinecone.svg */ "./style/icons/pinecone.svg");
/* harmony import */ var _style_icons_change_circle_24_svg__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../style/icons/change-circle-24.svg */ "./style/icons/change-circle-24.svg");
/* harmony import */ var _style_icons_variable_svg__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../style/icons/variable.svg */ "./style/icons/variable.svg");
/* harmony import */ var _style_icons_file_variable_svg__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../style/icons/file-variable.svg */ "./style/icons/file-variable.svg");
/* harmony import */ var _style_icons_html_svg__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../style/icons/html.svg */ "./style/icons/html.svg");
/* harmony import */ var _style_icons_markdown_fill_svg__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../style/icons/markdown-fill.svg */ "./style/icons/markdown-fill.svg");
/* harmony import */ var _style_icons_html_line_svg__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../style/icons/html-line.svg */ "./style/icons/html-line.svg");
/* harmony import */ var _style_icons_chroma_svg__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../style/icons/chroma.svg */ "./style/icons/chroma.svg");
/* harmony import */ var _style_icons_wash_svg__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../style/icons/wash.svg */ "./style/icons/wash.svg");
/* harmony import */ var _style_icons_plus_circle_24_svg__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../style/icons/plus-circle-24.svg */ "./style/icons/plus-circle-24.svg");
/* harmony import */ var _style_icons_number_svg__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../style/icons/number.svg */ "./style/icons/number.svg");
/* harmony import */ var _style_icons_oracle_svg__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../style/icons/oracle.svg */ "./style/icons/oracle.svg");
/* harmony import */ var _style_icons_sql_server_svg__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ../style/icons/sql-server.svg */ "./style/icons/sql-server.svg");
/* harmony import */ var _style_icons_play_circle_16_svg__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ../style/icons/play-circle-16.svg */ "./style/icons/play-circle-16.svg");
/* harmony import */ var _style_icons_settings_16_svg__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ../style/icons/settings-16.svg */ "./style/icons/settings-16.svg");
/* harmony import */ var _style_icons_key_svg__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ../style/icons/key.svg */ "./style/icons/key.svg");
/* harmony import */ var _style_icons_snowflake_svg__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ../style/icons/snowflake.svg */ "./style/icons/snowflake.svg");
/* harmony import */ var _style_icons_trino_svg__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ../style/icons/trino.svg */ "./style/icons/trino.svg");
/* harmony import */ var _style_icons_formula_svg__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ../style/icons/formula.svg */ "./style/icons/formula.svg");
/* harmony import */ var _style_icons_service_16_svg__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ../style/icons/service-16.svg */ "./style/icons/service-16.svg");
/* harmony import */ var _style_icons_s3_svg__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ../style/icons/s3.svg */ "./style/icons/s3.svg");
/* harmony import */ var _style_icons_bucket_svg__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ../style/icons/bucket.svg */ "./style/icons/bucket.svg");
/* harmony import */ var _style_icons_bigquery_svg__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ../style/icons/bigquery.svg */ "./style/icons/bigquery.svg");
/* harmony import */ var _style_icons_database_svg__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ../style/icons/database.svg */ "./style/icons/database.svg");
/* harmony import */ var _style_icons_x_16_svg__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ../style/icons/x-16.svg */ "./style/icons/x-16.svg");
/* harmony import */ var _style_icons_calendar_svg__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ../style/icons/calendar.svg */ "./style/icons/calendar.svg");
/* harmony import */ var _style_icons_corner_up_right_svg__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ../style/icons/corner-up-right.svg */ "./style/icons/corner-up-right.svg");
/* harmony import */ var _style_icons_corner_right_down_svg__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ../style/icons/corner-right-down.svg */ "./style/icons/corner-right-down.svg");
/* harmony import */ var _style_icons_eyeglass_svg__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ../style/icons/eyeglass.svg */ "./style/icons/eyeglass.svg");
/* harmony import */ var _style_icons_lock_16_svg__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ../style/icons/lock-16.svg */ "./style/icons/lock-16.svg");
/* harmony import */ var _style_icons_unlock_16_svg__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ../style/icons/unlock-16.svg */ "./style/icons/unlock-16.svg");
/* harmony import */ var _style_icons_sidebar_show_24_svg__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ../style/icons/sidebar-show-24.svg */ "./style/icons/sidebar-show-24.svg");
/* harmony import */ var _style_icons_file_csv_svg__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ../style/icons/file-csv.svg */ "./style/icons/file-csv.svg");
/* harmony import */ var _style_icons_file_pdf_svg__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ../style/icons/file-pdf.svg */ "./style/icons/file-pdf.svg");
/* harmony import */ var _style_icons_file_excel_svg__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ../style/icons/file-excel.svg */ "./style/icons/file-excel.svg");
/* harmony import */ var _style_icons_file_pqt_svg__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ../style/icons/file-pqt.svg */ "./style/icons/file-pqt.svg");
/* harmony import */ var _style_icons_file_json_svg__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ../style/icons/file-json.svg */ "./style/icons/file-json.svg");
/* harmony import */ var _style_icons_abacus_svg__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ../style/icons/abacus.svg */ "./style/icons/abacus.svg");
/* harmony import */ var _style_icons_typescript_svg__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ../style/icons/typescript.svg */ "./style/icons/typescript.svg");
/* harmony import */ var _style_icons_square_key_svg__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ../style/icons/square-key.svg */ "./style/icons/square-key.svg");
/* harmony import */ var _style_icons_file_settings_svg__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ../style/icons/file-settings.svg */ "./style/icons/file-settings.svg");
/* harmony import */ var _style_icons_dataframes_svg__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ../style/icons/dataframes.svg */ "./style/icons/dataframes.svg");
/* harmony import */ var _style_icons_dataframe_minus_svg__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ../style/icons/dataframe-minus.svg */ "./style/icons/dataframe-minus.svg");
/* harmony import */ var _style_icons_hierarchy_svg__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ../style/icons/hierarchy.svg */ "./style/icons/hierarchy.svg");
/* harmony import */ var _style_icons_input_spark_svg__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ../style/icons/input-spark.svg */ "./style/icons/input-spark.svg");
/* harmony import */ var _style_icons_json_svg__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ../style/icons/json.svg */ "./style/icons/json.svg");
/* harmony import */ var _style_icons_python_svg__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ../style/icons/python.svg */ "./style/icons/python.svg");
/* harmony import */ var _style_icons_concat_svg__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ../style/icons/concat.svg */ "./style/icons/concat.svg");
/* harmony import */ var _style_icons_file_xml_svg__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ../style/icons/file-xml.svg */ "./style/icons/file-xml.svg");
/* harmony import */ var _style_icons_file_spreadsheet_svg__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ../style/icons/file-spreadsheet.svg */ "./style/icons/file-spreadsheet.svg");
/* harmony import */ var _style_icons_mongodb_svg__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ../style/icons/mongodb.svg */ "./style/icons/mongodb.svg");
/* harmony import */ var _style_icons_package_svg__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ../style/icons/package.svg */ "./style/icons/package.svg");
/* harmony import */ var _style_icons_congruent_to_svg__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ../style/icons/congruent-to.svg */ "./style/icons/congruent-to.svg");
/* harmony import */ var _style_icons_generateCalendarIcon_svg__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ../style/icons/generateCalendarIcon.svg */ "./style/icons/generateCalendarIcon.svg");
/* harmony import */ var _style_icons_dynamicGenerateCalendarIcon_svg__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ../style/icons/dynamicGenerateCalendarIcon.svg */ "./style/icons/dynamicGenerateCalendarIcon.svg");
















































































const mongodbIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:mongodb-icon',
    svgstr: _style_icons_mongodb_svg__WEBPACK_IMPORTED_MODULE_75__
});
const expandJsonIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:expand-icon',
    svgstr: _style_icons_sidebar_show_24_svg__WEBPACK_IMPORTED_MODULE_56__
});
const fileXmlIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:file-xml-icon',
    svgstr: _style_icons_file_xml_svg__WEBPACK_IMPORTED_MODULE_73__
});
const fileSpreadsheetIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:file-spreadsheet-icon',
    svgstr: _style_icons_file_spreadsheet_svg__WEBPACK_IMPORTED_MODULE_74__
});
const editIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:edit-icon',
    svgstr: _style_icons_input_spark_svg__WEBPACK_IMPORTED_MODULE_69__
});
const fileTextIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:file-text-icon',
    svgstr: _style_icons_file_txt_svg__WEBPACK_IMPORTED_MODULE_1__
});
const filePlusIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:file-plus-icon',
    svgstr: _style_icons_file_plus_24_svg__WEBPACK_IMPORTED_MODULE_2__
});
const consoleIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:console-icon',
    svgstr: _style_icons_console_message_svg__WEBPACK_IMPORTED_MODULE_3__
});
const annotationIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:annotation-icon',
    svgstr: _style_icons_annotation_svg__WEBPACK_IMPORTED_MODULE_4__
});
const apiIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:api-rest-icon',
    svgstr: _style_icons_api_svg__WEBPACK_IMPORTED_MODULE_5__
});
const codeIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:code-icon',
    svgstr: _style_icons_code_24_svg__WEBPACK_IMPORTED_MODULE_6__
});
const filterIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:filter-icon',
    svgstr: _style_icons_filter_svg__WEBPACK_IMPORTED_MODULE_7__
});
const aggregateIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:aggregateIcon',
    svgstr: _style_icons_aggregate_svg__WEBPACK_IMPORTED_MODULE_8__
});
const joinIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:joinIcon',
    svgstr: _style_icons_join_svg__WEBPACK_IMPORTED_MODULE_20__
});
const expandIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:expandIcon',
    svgstr: _style_icons_network_alt_24_svg__WEBPACK_IMPORTED_MODULE_9__
});
const jsonIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:json-icon',
    svgstr: _style_icons_json_svg__WEBPACK_IMPORTED_MODULE_70__
});
const dedupIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:dedupIcon',
    svgstr: _style_icons_duplicate_svg__WEBPACK_IMPORTED_MODULE_10__
});
const globeIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:globeIcon',
    svgstr: _style_icons_globe_24_svg__WEBPACK_IMPORTED_MODULE_12__
});
const sortIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:sort-icon',
    svgstr: _style_icons_sort_svg__WEBPACK_IMPORTED_MODULE_13__
});
const renameIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:renameIcon',
    svgstr: _style_icons_rename_svg__WEBPACK_IMPORTED_MODULE_14__
});
const convertIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:convert-icon',
    svgstr: _style_icons_convert_svg__WEBPACK_IMPORTED_MODULE_15__
});
const extractIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:extractIcon',
    svgstr: _style_icons_extract_svg__WEBPACK_IMPORTED_MODULE_11__
});
const splitIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:split-icon',
    svgstr: _style_icons_scissors_svg__WEBPACK_IMPORTED_MODULE_16__
});
const mySQLIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:mySQLIcon',
    svgstr: _style_icons_mysql_svg__WEBPACK_IMPORTED_MODULE_17__
});
const boxIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:box-icon',
    svgstr: _style_icons_box_16_svg__WEBPACK_IMPORTED_MODULE_18__
});
const redditIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:redditIcon',
    svgstr: _style_icons_reddit_svg__WEBPACK_IMPORTED_MODULE_19__
});
const columnRemoveIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:column-remove-Icon',
    svgstr: _style_icons_column_remove_svg__WEBPACK_IMPORTED_MODULE_21__
});
const sampleIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:sampleIcon',
    svgstr: _style_icons_sample_svg__WEBPACK_IMPORTED_MODULE_22__
});
const openAiIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:openAiIcon',
    svgstr: _style_icons_openai_svg__WEBPACK_IMPORTED_MODULE_23__
});
const settingsIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:settings-config-icon',
    svgstr: _style_icons_settings_16_svg__WEBPACK_IMPORTED_MODULE_39__
});
const postgresIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:postgres-icon',
    svgstr: _style_icons_postgres_svg__WEBPACK_IMPORTED_MODULE_24__
});
const pineconeIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:pinecone-icon',
    svgstr: _style_icons_pinecone_svg__WEBPACK_IMPORTED_MODULE_25__
});
const changeCircleIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:changeCircle-icon',
    svgstr: _style_icons_change_circle_24_svg__WEBPACK_IMPORTED_MODULE_26__
});
const variableIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:variable-icon',
    svgstr: _style_icons_variable_svg__WEBPACK_IMPORTED_MODULE_27__
});
const fileVariableIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:file-variable-icon',
    svgstr: _style_icons_file_variable_svg__WEBPACK_IMPORTED_MODULE_28__
});
const htmlIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:html-icon',
    svgstr: _style_icons_html_svg__WEBPACK_IMPORTED_MODULE_29__
});
const markdownIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:markdown-icon',
    svgstr: _style_icons_markdown_fill_svg__WEBPACK_IMPORTED_MODULE_30__
});
const htmlLineIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:htmlLine-icon',
    svgstr: _style_icons_html_line_svg__WEBPACK_IMPORTED_MODULE_31__
});
const chromaIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:chroma-icon',
    svgstr: _style_icons_chroma_svg__WEBPACK_IMPORTED_MODULE_32__
});
const transposeIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:transpose-icon',
    svgstr: _style_icons_corner_right_down_svg__WEBPACK_IMPORTED_MODULE_52__
});
const pivotIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:pivot-icon',
    svgstr: _style_icons_corner_up_right_svg__WEBPACK_IMPORTED_MODULE_51__
});
const washIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:wash-icon',
    svgstr: _style_icons_wash_svg__WEBPACK_IMPORTED_MODULE_33__
});
const plusCircleIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:plus-circle-icon',
    svgstr: _style_icons_plus_circle_24_svg__WEBPACK_IMPORTED_MODULE_34__
});
const numberIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:number-icon',
    svgstr: _style_icons_number_svg__WEBPACK_IMPORTED_MODULE_35__
});
const oracleIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:oracle-icon',
    svgstr: _style_icons_oracle_svg__WEBPACK_IMPORTED_MODULE_36__
});
const sqlServerIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:sqlServer-icon',
    svgstr: _style_icons_sql_server_svg__WEBPACK_IMPORTED_MODULE_37__
});
const playCircleIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:play-circle-icon',
    svgstr: _style_icons_play_circle_16_svg__WEBPACK_IMPORTED_MODULE_38__
});
const keyIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:key-icon',
    svgstr: _style_icons_key_svg__WEBPACK_IMPORTED_MODULE_40__
});
const snowflakeIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:snowflake-icon',
    svgstr: _style_icons_snowflake_svg__WEBPACK_IMPORTED_MODULE_41__
});
const trinoIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:trino-icon',
    svgstr: _style_icons_trino_svg__WEBPACK_IMPORTED_MODULE_42__
});
const formulaIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:formula-icon',
    svgstr: _style_icons_formula_svg__WEBPACK_IMPORTED_MODULE_43__
});
const engineIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:engine-icon',
    svgstr: _style_icons_service_16_svg__WEBPACK_IMPORTED_MODULE_44__
});
const s3Icon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:s3-icon',
    svgstr: _style_icons_s3_svg__WEBPACK_IMPORTED_MODULE_45__
});
const bucketIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:bucket-icon',
    svgstr: _style_icons_bucket_svg__WEBPACK_IMPORTED_MODULE_46__
});
const bigQueryIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:bigQuery-icon',
    svgstr: _style_icons_bigquery_svg__WEBPACK_IMPORTED_MODULE_47__
});
const databaseIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:database-icon',
    svgstr: _style_icons_database_svg__WEBPACK_IMPORTED_MODULE_48__
});
const xIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:cog-icon',
    svgstr: _style_icons_x_16_svg__WEBPACK_IMPORTED_MODULE_49__
});
const calendarIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:calendar-icon',
    svgstr: _style_icons_calendar_svg__WEBPACK_IMPORTED_MODULE_50__
});
const eyeGlassesIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:eye-icon',
    svgstr: _style_icons_eyeglass_svg__WEBPACK_IMPORTED_MODULE_53__
});
const lockIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:lock-icon',
    svgstr: _style_icons_lock_16_svg__WEBPACK_IMPORTED_MODULE_54__
});
const unlockIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:unlock-icon',
    svgstr: _style_icons_unlock_16_svg__WEBPACK_IMPORTED_MODULE_55__
});
// Files
const fileCsvIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:file-csv-icon',
    svgstr: _style_icons_file_csv_svg__WEBPACK_IMPORTED_MODULE_57__
});
const filePdfIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:file-pdf-icon',
    svgstr: _style_icons_file_pdf_svg__WEBPACK_IMPORTED_MODULE_58__
});
const fileJsonIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:file-json-icon',
    svgstr: _style_icons_file_json_svg__WEBPACK_IMPORTED_MODULE_61__
});
const fileExcelIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:file-excel-icon',
    svgstr: _style_icons_file_excel_svg__WEBPACK_IMPORTED_MODULE_59__
});
const fileParquetIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:file-parquet-icon',
    svgstr: _style_icons_file_pqt_svg__WEBPACK_IMPORTED_MODULE_60__
});
const activityIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:activity-icon',
    svgstr: _style_icons_abacus_svg__WEBPACK_IMPORTED_MODULE_62__
});
const typescriptIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:typescript-icon',
    svgstr: _style_icons_typescript_svg__WEBPACK_IMPORTED_MODULE_63__
});
const UniqueKeyIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:unique-key-icon',
    svgstr: _style_icons_square_key_svg__WEBPACK_IMPORTED_MODULE_64__
});
const FileActionIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:file-action-icon',
    svgstr: _style_icons_file_settings_svg__WEBPACK_IMPORTED_MODULE_65__
});
const DataframeDeleteIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:dataframe-delete-icon',
    svgstr: _style_icons_dataframe_minus_svg__WEBPACK_IMPORTED_MODULE_67__
});
const DataframeIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:dataframe-list-icon',
    svgstr: _style_icons_dataframes_svg__WEBPACK_IMPORTED_MODULE_66__
});
const hierarchyIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:hierarchy-icon',
    svgstr: _style_icons_hierarchy_svg__WEBPACK_IMPORTED_MODULE_68__
});
const pythonIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:python-icon',
    svgstr: _style_icons_python_svg__WEBPACK_IMPORTED_MODULE_71__
});
const concatIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:concat-icon',
    svgstr: _style_icons_concat_svg__WEBPACK_IMPORTED_MODULE_72__
});
const PackagesListIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:packages-list-icon',
    svgstr: _style_icons_package_svg__WEBPACK_IMPORTED_MODULE_76__
});
const CompareDataframesIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:compare-dataframes-icon',
    svgstr: _style_icons_congruent_to_svg__WEBPACK_IMPORTED_MODULE_77__
});
const generateCalendarIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:generate-calendar-icon',
    svgstr: _style_icons_generateCalendarIcon_svg__WEBPACK_IMPORTED_MODULE_78__
});
const dynamicGenerateCalendarIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:dynamic-generate-calendar-icon',
    svgstr: _style_icons_dynamicGenerateCalendarIcon_svg__WEBPACK_IMPORTED_MODULE_79__
});


/***/ },

/***/ "./lib/index.js"
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Aggregate: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_26__.Aggregate),
/* harmony export */   Annotation: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_69__.Annotation),
/* harmony export */   CombinedJoin: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_40__.CombinedJoin),
/* harmony export */   CompareDataframes: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_51__.CompareDataframes),
/* harmony export */   Connection: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_68__.Connection),
/* harmony export */   Console: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_54__.Console),
/* harmony export */   CsvFileInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_2__.CsvFileInput),
/* harmony export */   CsvFileOutput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_53__.CsvFileOutput),
/* harmony export */   CustomOutput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_65__.CustomOutput),
/* harmony export */   DataCleansing: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_42__.DataCleansing),
/* harmony export */   DataframeDelete: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_72__.DataframeDelete),
/* harmony export */   DataframeList: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_71__.DataframeList),
/* harmony export */   DateTimeConverter: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_46__.DateTimeConverter),
/* harmony export */   Deduplicate: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_29__.Deduplicate),
/* harmony export */   DynamicGenerateCalendar: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_24__.DynamicGenerateCalendar),
/* harmony export */   EnvFile: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_66__.EnvFile),
/* harmony export */   EnvVariables: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_67__.EnvVariables),
/* harmony export */   ExcelFileInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_3__.ExcelFileInput),
/* harmony export */   ExcelFileOutput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_52__.ExcelFileOutput),
/* harmony export */   ExpandList: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_30__.ExpandList),
/* harmony export */   Extract: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_37__.Extract),
/* harmony export */   FileAction: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_50__.FileAction),
/* harmony export */   FileUtils: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_11__.FileUtils),
/* harmony export */   Filter: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_25__.Filter),
/* harmony export */   FilterColumns: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_38__.FilterColumns),
/* harmony export */   FlattenJSON: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_31__.FlattenJSON),
/* harmony export */   FormExample: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_70__.FormExample),
/* harmony export */   FrequencyAnalysis: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_48__.FrequencyAnalysis),
/* harmony export */   GenerateCalendar: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_23__.GenerateCalendar),
/* harmony export */   GenerateIDColumn: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_44__.GenerateIDColumn),
/* harmony export */   GoogleSheetsInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_14__.GoogleSheetsInput),
/* harmony export */   GoogleSheetsOutput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_56__.GoogleSheetsOutput),
/* harmony export */   HelloDate: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_12__.HelloDate),
/* harmony export */   InlineInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_7__.InlineInput),
/* harmony export */   Join: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_39__.Join),
/* harmony export */   JsonFileInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_5__.JsonFileInput),
/* harmony export */   JsonFileOutput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_55__.JsonFileOutput),
/* harmony export */   LocalFileInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_10__.LocalFileInput),
/* harmony export */   MySQLInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_15__.MySQLInput),
/* harmony export */   MySQLOutput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_60__.MySQLOutput),
/* harmony export */   ODBCInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_20__.ODBCInput),
/* harmony export */   OracleInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_17__.OracleInput),
/* harmony export */   OracleOutput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_63__.OracleOutput),
/* harmony export */   PackagesList: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_73__.PackagesList),
/* harmony export */   ParquetFileInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_4__.ParquetFileInput),
/* harmony export */   ParquetFileOutput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_57__.ParquetFileOutput),
/* harmony export */   PdfTablesInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_8__.PdfTablesInput),
/* harmony export */   Pivot: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_45__.Pivot),
/* harmony export */   PostgresInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_16__.PostgresInput),
/* harmony export */   PostgresOutput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_59__.PostgresOutput),
/* harmony export */   RenameColumns: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_35__.RenameColumns),
/* harmony export */   RestInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_13__.RestInput),
/* harmony export */   S3FileInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_9__.S3FileInput),
/* harmony export */   S3FileOutput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_64__.S3FileOutput),
/* harmony export */   Sample: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_33__.Sample),
/* harmony export */   SnowflakeInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_19__.SnowflakeInput),
/* harmony export */   SnowflakeOutput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_61__.SnowflakeOutput),
/* harmony export */   Sort: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_34__.Sort),
/* harmony export */   SplitColumn: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_28__.SplitColumn),
/* harmony export */   SqlServerInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_18__.SqlServerInput),
/* harmony export */   SqlServerOutput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_62__.SqlServerOutput),
/* harmony export */   Summary: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_47__.Summary),
/* harmony export */   Transpose: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_41__.Transpose),
/* harmony export */   TypeConverter: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_36__.TypeConverter),
/* harmony export */   UniqueKeyDetector: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_49__.UniqueKeyDetector),
/* harmony export */   Unite: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_43__.Unite),
/* harmony export */   XmlFileInput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_6__.XmlFileInput),
/* harmony export */   XmlFileOutput: () => (/* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_58__.XmlFileOutput),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @amphi/pipeline-components-manager */ "webpack/sharing/consume/default/@amphi/pipeline-components-manager");
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/files/CsvFileInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/files/ExcelFileInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/files/ParquetFileInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/files/JsonFileInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/files/XmlFileInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/InlineInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/files/PdfTablesInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/files/S3FileInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/files/LocalFileInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components */ "./lib/components/common/FileUtils.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/files/HelloDate.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/cloud/RestInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/cloud/GoogleSheetsInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/databases/MySQLInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/databases/PostgresInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/databases/OracleInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/databases/SqlServerInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/databases/SnowflakeInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/databases/ODBCInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/databases/DatabaseInput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components */ "./lib/components/outputs/databases/DatabaseOutput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/GenerateCalendar.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/DynamicGenerateCalendar.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/Filter.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/Aggregate.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/CustomFilter.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/SplitColumn.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/Deduplicate.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/JSON/ExpandList.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/JSON/FlattenJSON.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/JSON/JSONTools.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/Sample.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/Sort.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/RenameColumns/RenameColumns.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/TypeConverter.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/Extract.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/FilterColumns.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/join/BasicJoin.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/join/Join.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/Transpose.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/DataCleansing.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/Unite.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/GenerateIDColumn.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/Pivot.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/DateTimeConverter.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/Summary.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/FrequencyAnalysis.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/UniqueKeyDetector.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/files/FileAction.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./components */ "./lib/components/transforms/CompareDataframes.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./components */ "./lib/components/outputs/files/ExcelFileOutput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./components */ "./lib/components/outputs/files/CsvFileOutput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./components */ "./lib/components/outputs/Console.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./components */ "./lib/components/outputs/files/JsonFileOutput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./components */ "./lib/components/outputs/cloud/GoogleSheetsOutput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./components */ "./lib/components/outputs/files/ParquetFileOutput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./components */ "./lib/components/outputs/files/XmlFileOutput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./components */ "./lib/components/outputs/databases/PostgresOutput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./components */ "./lib/components/outputs/databases/MySQLOutput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./components */ "./lib/components/outputs/databases/SnowflakeOutput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./components */ "./lib/components/outputs/databases/SqlServerOutput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./components */ "./lib/components/outputs/databases/OracleOutput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./components */ "./lib/components/outputs/files/S3FileOutput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./components */ "./lib/components/custom/CustomOutput.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./components */ "./lib/components/settings/EnvFile.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./components */ "./lib/components/settings/EnvVariables.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./components */ "./lib/components/settings/Connection.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./components */ "./lib/components/annotations/Annotation.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./components */ "./lib/components/developer/FormExample.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./components */ "./lib/components/developer/DataframeList.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./components */ "./lib/components/developer/DataframeDelete.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./components */ "./lib/components/developer/PackagesList.js");


// Import allow to add the component to the palette

// Export allow the component to be used as a base component in different packages

const plugin = {
    id: "@amphi/pipeline-components-core",
    description: "Add components to Amphi",
    autoStart: true,
    requires: [_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.ComponentManager],
    activate: (app, componentService) => {
        console.log("Amphi extension pipeline-components-core is activated!");
        const g = globalThis;
        g.Amphi = g.Amphi || {};
        g.Amphi.BaseCoreComponent = _components_BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent;
        // Input
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_7__.InlineInput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_2__.CsvFileInput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_3__.ExcelFileInput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_4__.ParquetFileInput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_5__.JsonFileInput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_6__.XmlFileInput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_8__.PdfTablesInput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_9__.S3FileInput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_13__.RestInput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_14__.GoogleSheetsInput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_12__.HelloDate.getInstance());
        // componentService.addComponent(MySQLInput.getInstance())
        // componentService.addComponent(PostgresInput.getInstance())
        // componentService.addComponent(OracleInput.getInstance())
        // componentService.addComponent(SqlServerInput.getInstance())
        // componentService.addComponent(SnowflakeInput.getInstance())
        // componentService.addComponent(ODBCInput.getInstance())
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_21__.DatabaseInput.getInstance());
        // componentService.addComponent(CustomInput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_23__.GenerateCalendar.getInstance());
        // componentService.addComponent(PyGWalker.getInstance())
        // componentService.addComponent(Slider.getInstance())
        // Processors
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_35__.RenameColumns.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_38__.FilterColumns.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_25__.Filter.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_27__.CustomFilter.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_34__.Sort.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_28__.SplitColumn.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_37__.Extract.getInstance());
        // componentService.addComponent(FormulaRow.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_40__.CombinedJoin.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_43__.Unite.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_26__.Aggregate.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_45__.Pivot.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_41__.Transpose.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_29__.Deduplicate.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_36__.TypeConverter.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_46__.DateTimeConverter.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_42__.DataCleansing.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_33__.Sample.getInstance());
        // componentService.addComponent(CustomTransformations.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_44__.GenerateIDColumn.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_32__.JSONTools.getInstance());
        // componentService.addComponent(HierarchyPath.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_51__.CompareDataframes.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_24__.DynamicGenerateCalendar.getInstance());
        // Outputs
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_53__.CsvFileOutput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_55__.JsonFileOutput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_52__.ExcelFileOutput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_57__.ParquetFileOutput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_58__.XmlFileOutput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_56__.GoogleSheetsOutput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_64__.S3FileOutput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_22__.DatabaseOutput.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_54__.Console.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_65__.CustomOutput.getInstance());
        // Settings
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_67__.EnvVariables.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_66__.EnvFile.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_68__.Connection.getInstance());
        // Misc
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_47__.Summary.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_48__.FrequencyAnalysis.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_49__.UniqueKeyDetector.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_50__.FileAction.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_69__.Annotation.getInstance());
        // Settings
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_67__.EnvVariables.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_66__.EnvFile.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_68__.Connection.getInstance());
        // Developer
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_70__.FormExample.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_71__.DataframeList.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_72__.DataframeDelete.getInstance());
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_73__.PackagesList.getInstance());
    },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);


/***/ },

/***/ "./style/icons/abacus.svg"
/*!********************************!*\
  !*** ./style/icons/abacus.svg ***!
  \********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-abacus\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M5 3v18\" /><path d=\"M19 21v-18\" /><path d=\"M5 7h14\" /><path d=\"M5 15h14\" /><path d=\"M8 13v4\" /><path d=\"M11 13v4\" /><path d=\"M16 13v4\" /><path d=\"M14 5v4\" /><path d=\"M11 5v4\" /><path d=\"M8 5v4\" /><path d=\"M3 21h18\" /></svg>";

/***/ },

/***/ "./style/icons/aggregate.svg"
/*!***********************************!*\
  !*** ./style/icons/aggregate.svg ***!
  \***********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-chart-cohort\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M3 9h18v-6h-18v18h6v-18\" /><path d=\"M3 15h12v-12\" /></svg>";

/***/ },

/***/ "./style/icons/annotation.svg"
/*!************************************!*\
  !*** ./style/icons/annotation.svg ***!
  \************************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-sticker-2\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M6 4h12a2 2 0 0 1 2 2v7h-5a2 2 0 0 0 -2 2v5h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2z\" /><path d=\"M20 13v.172a2 2 0 0 1 -.586 1.414l-4.828 4.828a2 2 0 0 1 -1.414 .586h-.172\" /></svg>";

/***/ },

/***/ "./style/icons/api.svg"
/*!*****************************!*\
  !*** ./style/icons/api.svg ***!
  \*****************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-world-code\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M20.942 13.02a9 9 0 1 0 -9.47 7.964\" /><path d=\"M3.6 9h16.8\" /><path d=\"M3.6 15h9.9\" /><path d=\"M11.5 3a17 17 0 0 0 0 18\" /><path d=\"M12.5 3c2 3.206 2.837 6.913 2.508 10.537\" /><path d=\"M20 21l2 -2l-2 -2\" /><path d=\"M17 17l-2 2l2 2\" /></svg>";

/***/ },

/***/ "./style/icons/bigquery.svg"
/*!**********************************!*\
  !*** ./style/icons/bigquery.svg ***!
  \**********************************/
(module) {

module.exports = "<svg height=\"2500\" width=\"2500\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-1.633235433328256 7.0326093303156565 131.26574682416876 114.63439066968435\"><linearGradient id=\"a\" gradientUnits=\"userSpaceOnUse\" x1=\"64\" x2=\"64\" y1=\"7.034\" y2=\"120.789\"><stop offset=\"0\" stop-color=\"#4387fd\"/><stop offset=\"1\" stop-color=\"#4683ea\"/></linearGradient><path d=\"M27.79 115.217L1.54 69.749a11.499 11.499 0 0 1 0-11.499l26.25-45.467a11.5 11.5 0 0 1 9.96-5.75h52.5a11.5 11.5 0 0 1 9.959 5.75l26.25 45.467a11.499 11.499 0 0 1 0 11.5l-26.25 45.467a11.5 11.5 0 0 1-9.959 5.749h-52.5a11.499 11.499 0 0 1-9.96-5.75z\" fill=\"url(#a)\"/><path clip-path=\"url(#b)\" d=\"M119.229 86.48L80.625 47.874 64 43.425l-14.933 5.55L43.3 64l4.637 16.729 40.938 40.938 8.687-.386z\" opacity=\".07\"/><g fill=\"#fff\"><path d=\"M64 40.804c-12.81 0-23.195 10.385-23.195 23.196 0 12.81 10.385 23.195 23.195 23.195S87.194 76.81 87.194 64c0-12.811-10.385-23.196-23.194-23.196m0 40.795c-9.72 0-17.6-7.88-17.6-17.6S54.28 46.4 64 46.4 81.6 54.28 81.6 64 73.72 81.6 64 81.6\"/><path d=\"M52.99 63.104v7.21a12.794 12.794 0 0 0 4.38 4.475V63.104zM61.675 57.026v19.411c.745.137 1.507.22 2.29.22.714 0 1.41-.075 2.093-.189V57.026zM70.766 66.1v8.562a12.786 12.786 0 0 0 4.382-4.7v-3.861zM80.691 78.287l-2.403 2.405a1.088 1.088 0 0 0 0 1.537l9.115 9.112a1.088 1.088 0 0 0 1.537 0l2.403-2.402a1.092 1.092 0 0 0 0-1.536l-9.116-9.116a1.09 1.09 0 0 0-1.536 0\"/></g></svg>";

/***/ },

/***/ "./style/icons/box-16.svg"
/*!********************************!*\
  !*** ./style/icons/box-16.svg ***!
  \********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M6.98.678a2.25 2.25 0 012.04 0l5.297 2.696c.42.214.683.644.683 1.114v6.717c0 .658-.37 1.261-.956 1.56L9.02 15.322a2.25 2.25 0 01-2.042 0l-5.023-2.557A1.75 1.75 0 011 11.205V4.488c0-.47.264-.9.683-1.114L6.979.678zm1.36 1.337a.75.75 0 00-.68 0L3.224 4.273 8 6.661l4.776-2.388L8.34 2.015zm-5.84 9.19V5.588l4.75 2.375v5.814l-4.613-2.35a.25.25 0 01-.137-.222zm6.25 2.572l4.613-2.35a.25.25 0 00.137-.222V5.588L8.75 7.963v5.814z\" clip-rule=\"evenodd\"/></svg>";

/***/ },

/***/ "./style/icons/bucket.svg"
/*!********************************!*\
  !*** ./style/icons/bucket.svg ***!
  \********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-bucket\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 7m-8 0a8 4 0 1 0 16 0a8 4 0 1 0 -16 0\" /><path d=\"M4 7c0 .664 .088 1.324 .263 1.965l2.737 10.035c.5 1.5 2.239 2 5 2s4.5 -.5 5 -2c.333 -1 1.246 -4.345 2.737 -10.035a7.45 7.45 0 0 0 .263 -1.965\" /></svg>";

/***/ },

/***/ "./style/icons/calendar.svg"
/*!**********************************!*\
  !*** ./style/icons/calendar.svg ***!
  \**********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-calendar-event\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z\" /><path d=\"M16 3l0 4\" /><path d=\"M8 3l0 4\" /><path d=\"M4 11l16 0\" /><path d=\"M8 15h2v2h-2z\" /></svg>";

/***/ },

/***/ "./style/icons/change-circle-24.svg"
/*!******************************************!*\
  !*** ./style/icons/change-circle-24.svg ***!
  \******************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"><g fill=\"currentColor\"><path d=\"M7.071 12.486c.056-.065.116-.143.182-.229.284-.366.677-.874 1.264-1.128a1.5 1.5 0 011.117-.041c.46.152 1.064.539 1.795 1.398.84.988 1.66 1.583 2.465 1.85a2.998 2.998 0 002.185-.089c1.012-.438 1.715-1.388 1.933-1.682.028-.038.048-.066.06-.08a.75.75 0 00-1.143-.97 6.64 6.64 0 00-.182.227c-.284.367-.677.875-1.264 1.129a1.5 1.5 0 01-1.117.041c-.46-.152-1.064-.539-1.795-1.398-.84-.988-1.66-1.584-2.465-1.85a2.998 2.998 0 00-2.185.089c-1.012.438-1.715 1.388-1.933 1.682-.028.038-.048.066-.06.08a.75.75 0 101.143.97z\"/><path fill-rule=\"evenodd\" d=\"M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z\" clip-rule=\"evenodd\"/></g></svg>";

/***/ },

/***/ "./style/icons/chroma.svg"
/*!********************************!*\
  !*** ./style/icons/chroma.svg ***!
  \********************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<svg width=\"256px\" height=\"164px\" viewBox=\"0 0 256 164\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"  preserveAspectRatio=\"xMidYMid\">\r\n    <title>Chroma</title>\r\n    <g>\r\n        <ellipse fill=\"#FFDE2D\" cx=\"170.666795\" cy=\"81.9198362\" rx=\"85.3332053\" ry=\"81.9198362\"></ellipse>\r\n        <ellipse fill=\"#327EFF\" cx=\"85.3332053\" cy=\"81.9198362\" rx=\"85.3332053\" ry=\"81.9198362\"></ellipse>\r\n        <path d=\"M170.666795,81.9199642 C170.666795,127.163394 132.461431,163.83916 85.3330773,163.83916 L85.3330773,81.9199642 L170.666795,81.9199642 Z M85.3332053,81.9198362 C85.3332053,36.6767906 123.538185,8.95998209e-05 170.666795,8.95998209e-05 L170.666795,81.9198362 L85.3332053,81.9198362 Z\" fill=\"#FF6446\"></path>\r\n    </g>\r\n</svg>\r\n";

/***/ },

/***/ "./style/icons/code-24.svg"
/*!*********************************!*\
  !*** ./style/icons/code-24.svg ***!
  \*********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"><g fill=\"currentColor\"><path d=\"M14.447 3.026a.75.75 0 00-.92.527l-4.5 16.5a.75.75 0 001.447.394l4.5-16.5a.75.75 0 00-.527-.92zM16.207 6.232a.75.75 0 011.06-.025l5.5 5.25a.75.75 0 010 1.085l-5.5 5.25a.75.75 0 01-1.035-1.085L21.164 12l-4.932-4.707a.75.75 0 01-.024-1.06zM7.768 7.293a.75.75 0 00-1.036-1.086l-5.5 5.25a.75.75 0 000 1.085l5.5 5.25a.75.75 0 101.036-1.085L2.836 12l4.932-4.707z\"/></g></svg>";

/***/ },

/***/ "./style/icons/column-remove.svg"
/*!***************************************!*\
  !*** ./style/icons/column-remove.svg ***!
  \***************************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-column-remove\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M6 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1z\" /><path d=\"M16 10l4 4\" /><path d=\"M16 14l4 -4\" /></svg>";

/***/ },

/***/ "./style/icons/concat.svg"
/*!********************************!*\
  !*** ./style/icons/concat.svg ***!
  \********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-arrows-join-2\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M3 7h1.948c1.913 0 3.705 .933 4.802 2.5a5.861 5.861 0 0 0 4.802 2.5h6.448\" /><path d=\"M3 17h1.95a5.854 5.854 0 0 0 4.798 -2.5a5.854 5.854 0 0 1 4.798 -2.5h5.454\" /><path d=\"M18 15l3 -3l-3 -3\" /></svg>\r\n";

/***/ },

/***/ "./style/icons/congruent-to.svg"
/*!**************************************!*\
  !*** ./style/icons/congruent-to.svg ***!
  \**************************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-congruent-to\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M5 13h14\" /><path d=\"M5 17h14\" /><path d=\"M5 7.686c2.333 -2.624 4.667 -1.856 7 .064s4.667 2.688 7 .064\" /></svg>";

/***/ },

/***/ "./style/icons/console-message.svg"
/*!*****************************************!*\
  !*** ./style/icons/console-message.svg ***!
  \*****************************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-message-2-code\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M8 9h8\" /><path d=\"M8 13h6\" /><path d=\"M12 21l-1 -1l-2 -2h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6\" /><path d=\"M20 21l2 -2l-2 -2\" /><path d=\"M17 17l-2 2l2 2\" /></svg>";

/***/ },

/***/ "./style/icons/convert.svg"
/*!*********************************!*\
  !*** ./style/icons/convert.svg ***!
  \*********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-transform\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M3 6a3 3 0 1 0 6 0a3 3 0 0 0 -6 0\" /><path d=\"M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3\" /><path d=\"M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3\" /><path d=\"M15 18a3 3 0 1 0 6 0a3 3 0 0 0 -6 0\" /></svg>";

/***/ },

/***/ "./style/icons/corner-right-down.svg"
/*!*******************************************!*\
  !*** ./style/icons/corner-right-down.svg ***!
  \*******************************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-corner-right-down-double\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M5 4h6a3 3 0 0 1 3 3v7\" /><path d=\"M10 10l4 4l4 -4m-8 5l4 4l4 -4\" /></svg>";

/***/ },

/***/ "./style/icons/corner-up-right.svg"
/*!*****************************************!*\
  !*** ./style/icons/corner-up-right.svg ***!
  \*****************************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-corner-up-right-double\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M4 18v-6a3 3 0 0 1 3 -3h7\" /><path d=\"M10 13l4 -4l-4 -4m5 8l4 -4l-4 -4\" /></svg>";

/***/ },

/***/ "./style/icons/database.svg"
/*!**********************************!*\
  !*** ./style/icons/database.svg ***!
  \**********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-database\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 6m-8 0a8 3 0 1 0 16 0a8 3 0 1 0 -16 0\" /><path d=\"M4 6v6a8 3 0 0 0 16 0v-6\" /><path d=\"M4 12v6a8 3 0 0 0 16 0v-6\" /></svg>";

/***/ },

/***/ "./style/icons/dataframe-minus.svg"
/*!*****************************************!*\
  !*** ./style/icons/dataframe-minus.svg ***!
  \*****************************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-table-minus\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10\" /><path d=\"M3 10h18\" /><path d=\"M10 3v18\" /><path d=\"M16 19h6\" /></svg>";

/***/ },

/***/ "./style/icons/dataframes.svg"
/*!************************************!*\
  !*** ./style/icons/dataframes.svg ***!
  \************************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-table-options\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 21h-7a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7\" /><path d=\"M3 10h18\" /><path d=\"M10 3v18\" /><path d=\"M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /><path d=\"M19.001 15.5v1.5\" /><path d=\"M19.001 21v1.5\" /><path d=\"M22.032 17.25l-1.299 .75\" /><path d=\"M17.27 20l-1.3 .75\" /><path d=\"M15.97 17.25l1.3 .75\" /><path d=\"M20.733 20l1.3 .75\" /></svg>";

/***/ },

/***/ "./style/icons/duplicate.svg"
/*!***********************************!*\
  !*** ./style/icons/duplicate.svg ***!
  \***********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-copy-off\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M19.414 19.415a2 2 0 0 1 -1.414 .585h-8a2 2 0 0 1 -2 -2v-8c0 -.554 .225 -1.055 .589 -1.417m3.411 -.583h6a2 2 0 0 1 2 2v6\" /><path d=\"M16 8v-2a2 2 0 0 0 -2 -2h-6m-3.418 .59c-.36 .36 -.582 .86 -.582 1.41v8a2 2 0 0 0 2 2h2\" /><path d=\"M3 3l18 18\" /></svg>";

/***/ },

/***/ "./style/icons/dynamicGenerateCalendarIcon.svg"
/*!*****************************************************!*\
  !*** ./style/icons/dynamicGenerateCalendarIcon.svg ***!
  \*****************************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"currentColor\" class=\"icon icon-tabler icons-tabler-filled icon-tabler-calendar-week\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M16 2c.183 0 .355 .05 .502 .135l.033 .02c.28 .177 .465 .49 .465 .845v1h1a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h1v-1a1 1 0 0 1 .514 -.874l.093 -.046l.066 -.025l.1 -.029l.107 -.019l.12 -.007q .083 0 .161 .013l.122 .029l.04 .012l.06 .023c.328 .135 .568 .44 .61 .806l.007 .117v1h6v-1a1 1 0 0 1 1 -1m3 7h-14v9.625c0 .705 .386 1.286 .883 1.366l.117 .009h12c.513 0 .936 -.53 .993 -1.215l.007 -.16z\" /><path d=\"M9.015 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1\" /><path d=\"M13.015 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1\" /><path d=\"M17.02 13a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1\" /><path d=\"M12.02 15a1 1 0 0 1 0 2a1.001 1.001 0 1 1 -.005 -2z\" /><path d=\"M9.015 16a1 1 0 0 1 -1 1a1.001 1.001 0 1 1 -.005 -2c.557 0 1.005 .448 1.005 1\" /></svg>";

/***/ },

/***/ "./style/icons/extract.svg"
/*!*********************************!*\
  !*** ./style/icons/extract.svg ***!
  \*********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-text-recognition\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M4 8v-2a2 2 0 0 1 2 -2h2\" /><path d=\"M4 16v2a2 2 0 0 0 2 2h2\" /><path d=\"M16 4h2a2 2 0 0 1 2 2v2\" /><path d=\"M16 20h2a2 2 0 0 0 2 -2v-2\" /><path d=\"M12 16v-7\" /><path d=\"M9 9h6\" /></svg>";

/***/ },

/***/ "./style/icons/eyeglass.svg"
/*!**********************************!*\
  !*** ./style/icons/eyeglass.svg ***!
  \**********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-eyeglass\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M8 4h-2l-3 10\" /><path d=\"M16 4h2l3 10\" /><path d=\"M10 16l4 0\" /><path d=\"M21 16.5a3.5 3.5 0 0 1 -7 0v-2.5h7v2.5\" /><path d=\"M10 16.5a3.5 3.5 0 0 1 -7 0v-2.5h7v2.5\" /></svg>";

/***/ },

/***/ "./style/icons/file-csv.svg"
/*!**********************************!*\
  !*** ./style/icons/file-csv.svg ***!
  \**********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-file-type-csv\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /><path d=\"M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4\" /><path d=\"M7 16.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0\" /><path d=\"M10 20.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75\" /><path d=\"M16 15l2 6l2 -6\" /></svg>";

/***/ },

/***/ "./style/icons/file-excel.svg"
/*!************************************!*\
  !*** ./style/icons/file-excel.svg ***!
  \************************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-file-type-xls\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /><path d=\"M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4\" /><path d=\"M4 15l4 6\" /><path d=\"M4 21l4 -6\" /><path d=\"M17 20.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75\" /><path d=\"M11 15v6h3\" /></svg>";

/***/ },

/***/ "./style/icons/file-json.svg"
/*!***********************************!*\
  !*** ./style/icons/file-json.svg ***!
  \***********************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<svg\r\n   width=\"24\"\r\n   height=\"24\"\r\n   viewBox=\"0 0 24 24\"\r\n   fill=\"none\"\r\n   stroke=\"currentColor\"\r\n   stroke-width=\"2\"\r\n   stroke-linecap=\"round\"\r\n   stroke-linejoin=\"round\"\r\n   class=\"icon icon-tabler icons-tabler-outline icon-tabler-file-type-docx\"\r\n   version=\"1.1\"\r\n   id=\"svg8\"\r\n   sodipodi:docname=\"file-json-24.svg\"\r\n   xml:space=\"preserve\"\r\n   inkscape:version=\"1.3 (0e150ed, 2023-07-21)\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\"><defs\r\n     id=\"defs8\" /><sodipodi:namedview\r\n     id=\"namedview8\"\r\n     pagecolor=\"#505050\"\r\n     bordercolor=\"#eeeeee\"\r\n     borderopacity=\"1\"\r\n     inkscape:showpageshadow=\"0\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pagecheckerboard=\"0\"\r\n     inkscape:deskcolor=\"#505050\"\r\n     inkscape:zoom=\"9.8333333\"\r\n     inkscape:cx=\"11.949153\"\r\n     inkscape:cy=\"11.949153\"\r\n     inkscape:window-width=\"2560\"\r\n     inkscape:window-height=\"1412\"\r\n     inkscape:window-x=\"1512\"\r\n     inkscape:window-y=\"149\"\r\n     inkscape:window-maximized=\"1\"\r\n     inkscape:current-layer=\"g8\" /><path\r\n     stroke=\"none\"\r\n     d=\"M0 0h24v24H0z\"\r\n     fill=\"none\"\r\n     id=\"path1\" /><path\r\n     d=\"M14 3v4a1 1 0 0 0 1 1h4\"\r\n     id=\"path2\" /><path\r\n     d=\"M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4\"\r\n     id=\"path3\" /><g\r\n     style=\"fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round\"\r\n     id=\"g8\"\r\n     transform=\"translate(-0.05084746,-0.05084746)\"><path\r\n       stroke=\"none\"\r\n       d=\"M 0,0 H 24 V 24 H 0 Z\"\r\n       fill=\"none\"\r\n       id=\"path1-2\" /><path\r\n       d=\"m 19.856553,21.189917 v -6.278139 l 2.833382,6.278139 v -6.278139\"\r\n       id=\"path2-4\"\r\n       style=\"stroke-width:1.72186\" /><path\r\n       d=\"m 15.134243,14.911778 a 1.8889235,1.5695348 0 0 1 1.888925,1.569535 v 3.13907 a 1.888924,1.5695353 0 1 1 -3.777848,0 v -3.13907 a 1.8889235,1.5695348 0 0 1 1.888923,-1.569535 z\"\r\n       id=\"path3-8\"\r\n       style=\"stroke-width:1.72186\" /><path\r\n       d=\"m 1.9117778,14.911778 h 2.8333854 v 5.10099 a 1.416693,1.1771514 0 0 1 -2.8333854,0 v -0.392385\"\r\n       id=\"path4-3\"\r\n       style=\"stroke-width:1.72186\" /><path\r\n       d=\"m 7.5785486,20.405151 a 0.94446178,0.7847675 0 0 0 0.9444615,0.784766 h 0.944462 A 0.94446178,0.7847675 0 0 0 10.411934,20.405151 V 18.835614 A 0.94446178,0.7847675 0 0 0 9.4674721,18.050847 H 8.5230101 A 0.94446178,0.7847675 0 0 1 7.5785486,17.266079 v -1.569534 a 0.94446178,0.7847675 0 0 1 0.9444615,-0.784767 h 0.944462 a 0.94446178,0.7847675 0 0 1 0.9444619,0.784767\"\r\n       id=\"path5-9\"\r\n       style=\"stroke-width:1.72186\" /></g></svg>\r\n";

/***/ },

/***/ "./style/icons/file-pdf.svg"
/*!**********************************!*\
  !*** ./style/icons/file-pdf.svg ***!
  \**********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-file-type-pdf\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /><path d=\"M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4\" /><path d=\"M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6\" /><path d=\"M17 18h2\" /><path d=\"M20 15h-3v6\" /><path d=\"M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z\" /></svg>";

/***/ },

/***/ "./style/icons/file-plus-24.svg"
/*!**************************************!*\
  !*** ./style/icons/file-plus-24.svg ***!
  \**************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"><g fill=\"currentColor\"><path d=\"M11.75 10.75a.75.75 0 01.75.75V14H15a.75.75 0 010 1.5h-2.5V18a.75.75 0 01-1.5 0v-2.5H8.5a.75.75 0 010-1.5H11v-2.5a.75.75 0 01.75-.75z\"/><path fill-rule=\"evenodd\" d=\"M5.75 1A2.75 2.75 0 003 3.75v16.5A2.75 2.75 0 005.75 23h12.5A2.75 2.75 0 0021 20.25V8.664c0-.464-.184-.909-.513-1.237l-5.914-5.914A1.75 1.75 0 0013.336 1H5.75zM4.5 3.75c0-.69.56-1.25 1.25-1.25H13v5.75c0 .414.336.75.75.75h5.75v11.25c0 .69-.56 1.25-1.25 1.25H5.75c-.69 0-1.25-.56-1.25-1.25V3.75zM18.44 7.5L14.5 3.56V7.5h3.94z\" clip-rule=\"evenodd\"/></g></svg>";

/***/ },

/***/ "./style/icons/file-pqt.svg"
/*!**********************************!*\
  !*** ./style/icons/file-pqt.svg ***!
  \**********************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<svg\r\n   width=\"24\"\r\n   height=\"24\"\r\n   viewBox=\"0 0 24 24\"\r\n   fill=\"none\"\r\n   stroke=\"currentColor\"\r\n   stroke-width=\"2\"\r\n   stroke-linecap=\"round\"\r\n   stroke-linejoin=\"round\"\r\n   class=\"icon icon-tabler icons-tabler-outline icon-tabler-file-type-txt\"\r\n   version=\"1.1\"\r\n   id=\"svg10\"\r\n   sodipodi:docname=\"file-pqt.svg\"\r\n   xml:space=\"preserve\"\r\n   inkscape:version=\"1.3 (0e150ed, 2023-07-21)\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\"><defs\r\n     id=\"defs10\" /><sodipodi:namedview\r\n     id=\"namedview10\"\r\n     pagecolor=\"#505050\"\r\n     bordercolor=\"#eeeeee\"\r\n     borderopacity=\"1\"\r\n     inkscape:showpageshadow=\"0\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pagecheckerboard=\"0\"\r\n     inkscape:deskcolor=\"#505050\"\r\n     inkscape:zoom=\"13.906433\"\r\n     inkscape:cx=\"-6.723507\"\r\n     inkscape:cy=\"12.94365\"\r\n     inkscape:window-width=\"1512\"\r\n     inkscape:window-height=\"851\"\r\n     inkscape:window-x=\"0\"\r\n     inkscape:window-y=\"639\"\r\n     inkscape:window-maximized=\"1\"\r\n     inkscape:current-layer=\"g2\" /><g\r\n     style=\"fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round\"\r\n     id=\"g10\"\r\n     transform=\"translate(0,-0.05084746)\" /><g\r\n     id=\"g2\"\r\n     style=\"fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;fill-opacity:1\"\r\n     transform=\"translate(0,-0.05084746)\"><g\r\n       id=\"g1\"\r\n       style=\"fill:none;fill-opacity:1\"><path\r\n         stroke=\"none\"\r\n         d=\"M0 0h24v24H0z\"\r\n         fill=\"none\"\r\n         id=\"path1\"\r\n         transform=\"translate(0,0.05084746)\"\r\n         style=\"fill:none;fill-opacity:1\" /><path\r\n         d=\"M14 3v4a1 1 0 0 0 1 1h4\"\r\n         id=\"path2\"\r\n         transform=\"translate(0,0.05084746)\"\r\n         style=\"fill:none;fill-opacity:1\" /><path\r\n         d=\"M14 3v4a1 1 0 0 0 1 1h4\"\r\n         id=\"path3\"\r\n         transform=\"translate(0,0.05084746)\"\r\n         style=\"fill:none;fill-opacity:1\" /><path\r\n         d=\"M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4\"\r\n         id=\"path5\"\r\n         transform=\"translate(0,0.05084746)\"\r\n         style=\"fill:none;fill-opacity:1\" /><path\r\n         stroke=\"none\"\r\n         d=\"M 0,0 H 24 V 24 H 0 Z\"\r\n         fill=\"none\"\r\n         id=\"path1-7\"\r\n         style=\"fill:none;fill-opacity:1\" /><path\r\n         d=\"m 3.825425,21.225417 v -6.349143 h 1.7169656 a 1.7169661,1.5872861 0 1 1 0,3.174572 H 3.825425\"\r\n         id=\"path3-3-6\"\r\n         style=\"fill:none;stroke:currentColor;stroke-width:1.65085;stroke-linecap:round;stroke-linejoin:round;fill-opacity:1\" /><path\r\n         stroke=\"none\"\r\n         d=\"M 0,0 H 24 V 24 H 0 Z\"\r\n         fill=\"none\"\r\n         id=\"path1-4\"\r\n         style=\"stroke-width:2;stroke-linecap:round;stroke-linejoin:round;fill:none;fill-opacity:1\" /><g\r\n         id=\"g12\"\r\n         transform=\"matrix(0.9891281,0,0,0.78166992,-11.790416,3.9807888)\"\r\n         style=\"fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;fill-opacity:1\"><path\r\n           d=\"m 28,14 h 4\"\r\n           id=\"path2-91\"\r\n           style=\"fill:none;fill-opacity:1\" /><path\r\n           d=\"m 30,14 v 8\"\r\n           id=\"path3-7\"\r\n           style=\"fill:none;fill-opacity:1\" /></g><path\r\n         stroke=\"none\"\r\n         d=\"M 0,0 H 24 V 24 H 0 Z\"\r\n         fill=\"none\"\r\n         id=\"path1-5\"\r\n         style=\"stroke-width:2;stroke-linecap:round;stroke-linejoin:round;fill:none;fill-opacity:1\" /><g\r\n         id=\"g14\"\r\n         transform=\"matrix(0.9891281,0,0,0.78166992,-25.71363,8.6708083)\"\r\n         style=\"fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;fill-opacity:1\"><path\r\n           d=\"m 38,8 a 2,2 0 0 1 2,2 v 4 a 2,2 0 1 1 -4,0 v -4 a 2,2 0 0 1 2,-2 z\"\r\n           id=\"path2-5\"\r\n           style=\"fill:none;fill-opacity:1\" /><path\r\n           d=\"m 39,15 1,1\"\r\n           id=\"path3-5\"\r\n           style=\"fill:none;fill-opacity:1\" /></g></g></g></svg>\r\n";

/***/ },

/***/ "./style/icons/file-settings.svg"
/*!***************************************!*\
  !*** ./style/icons/file-settings.svg ***!
  \***************************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-file-settings\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /><path d=\"M12 10.5v1.5\" /><path d=\"M12 16v1.5\" /><path d=\"M15.031 12.25l-1.299 .75\" /><path d=\"M10.268 15l-1.3 .75\" /><path d=\"M15 15.803l-1.285 -.773\" /><path d=\"M10.285 12.97l-1.285 -.773\" /><path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /><path d=\"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z\" /></svg>";

/***/ },

/***/ "./style/icons/file-spreadsheet.svg"
/*!******************************************!*\
  !*** ./style/icons/file-spreadsheet.svg ***!
  \******************************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-file-spreadsheet\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /><path d=\"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z\" /><path d=\"M8 11h8v7h-8z\" /><path d=\"M8 15h8\" /><path d=\"M11 11v7\" /></svg>";

/***/ },

/***/ "./style/icons/file-txt.svg"
/*!**********************************!*\
  !*** ./style/icons/file-txt.svg ***!
  \**********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-file-type-txt\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /><path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /><path d=\"M16.5 15h3\" /><path d=\"M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4\" /><path d=\"M4.5 15h3\" /><path d=\"M6 15v6\" /><path d=\"M18 15v6\" /><path d=\"M10 15l4 6\" /><path d=\"M10 21l4 -6\" /></svg>";

/***/ },

/***/ "./style/icons/file-variable.svg"
/*!***************************************!*\
  !*** ./style/icons/file-variable.svg ***!
  \***************************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-file-code-2\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M10 12h-1v5h1\" /><path d=\"M14 12h1v5h-1\" /><path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /><path d=\"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z\" /></svg>";

/***/ },

/***/ "./style/icons/file-xml.svg"
/*!**********************************!*\
  !*** ./style/icons/file-xml.svg ***!
  \**********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-file-type-xml\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /><path d=\"M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4\" /><path d=\"M4 15l4 6\" /><path d=\"M4 21l4 -6\" /><path d=\"M19 15v6h3\" /><path d=\"M11 21v-6l2.5 3l2.5 -3v6\" /></svg>";

/***/ },

/***/ "./style/icons/filter.svg"
/*!********************************!*\
  !*** ./style/icons/filter.svg ***!
  \********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-filter\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z\" /></svg>";

/***/ },

/***/ "./style/icons/formula.svg"
/*!*********************************!*\
  !*** ./style/icons/formula.svg ***!
  \*********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-math-function\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M3 19a2 2 0 0 0 2 2c2 0 2 -4 3 -9s1 -9 3 -9a2 2 0 0 1 2 2\" /><path d=\"M5 12h6\" /><path d=\"M15 12l6 6\" /><path d=\"M15 18l6 -6\" /></svg>";

/***/ },

/***/ "./style/icons/generateCalendarIcon.svg"
/*!**********************************************!*\
  !*** ./style/icons/generateCalendarIcon.svg ***!
  \**********************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"icon icon-tabler icons-tabler-outline icon-tabler-calendar-week\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12\" /><path d=\"M16 3v4\" /><path d=\"M8 3v4\" /><path d=\"M4 11h16\" /><path d=\"M7 14h.013\" /><path d=\"M10.01 14h.005\" /><path d=\"M13.01 14h.005\" /><path d=\"M16.015 14h.005\" /><path d=\"M13.015 17h.005\" /><path d=\"M7.01 17h.005\" /><path d=\"M10.01 17h.005\" /></svg>";

/***/ },

/***/ "./style/icons/globe-24.svg"
/*!**********************************!*\
  !*** ./style/icons/globe-24.svg ***!
  \**********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm-1.673 1.647A9.506 9.506 0 002.552 11h4.747a16.673 16.673 0 013.028-8.353zm3.346 0A16.673 16.673 0 0116.701 11h4.747a9.506 9.506 0 00-7.775-8.353zM15.196 11A15.149 15.149 0 0012 2.916 15.149 15.149 0 008.804 11h6.392zm-6.427 1.5h6.462A15.16 15.16 0 0112 21.084 15.16 15.16 0 018.769 12.5zm-1.502 0H2.513c.23 4.45 3.525 8.091 7.814 8.853a16.683 16.683 0 01-3.06-8.853zm6.406 8.853a16.683 16.683 0 003.06-8.853h4.754c-.23 4.45-3.525 8.091-7.814 8.853z\" clip-rule=\"evenodd\"/></svg>";

/***/ },

/***/ "./style/icons/hierarchy.svg"
/*!***********************************!*\
  !*** ./style/icons/hierarchy.svg ***!
  \***********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-hierarchy-3\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /><path d=\"M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /><path d=\"M12 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /><path d=\"M20 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /><path d=\"M4 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /><path d=\"M16 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /><path d=\"M5 17l2 -3\" /><path d=\"M9 10l2 -3\" /><path d=\"M13 7l2 3\" /><path d=\"M17 14l2 3\" /><path d=\"M15 14l-2 3\" /><path d=\"M9 14l2 3\" /></svg>";

/***/ },

/***/ "./style/icons/html-line.svg"
/*!***********************************!*\
  !*** ./style/icons/html-line.svg ***!
  \***********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 18.1778L7.38083 16.9222L7.0517 13.3778H9.32156L9.48045 15.2222L12 15.8889L14.5195 15.2222L14.7806 12.3556H6.96091L6.32535 5.67778H17.6747L17.4477 7.88889H8.82219L9.02648 10.1444H17.2434L16.6192 16.9222L12 18.1778ZM3 2H21L19.377 20L12 22L4.62295 20L3 2ZM5.18844 4L6.48986 18.4339L12 19.9278L17.5101 18.4339L18.8116 4H5.18844Z\"></path></svg>";

/***/ },

/***/ "./style/icons/html.svg"
/*!******************************!*\
  !*** ./style/icons/html.svg ***!
  \******************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\">\r\n  <title>HTML5 Logo Badge</title>\r\n  <path fill=\"#E34F26\" d=\"M71,460 L30,0 481,0 440,460 255,512\"/>\r\n  <path fill=\"#EF652A\" d=\"M256,472 L405,431 440,37 256,37\"/>\r\n  <path fill=\"#EBEBEB\" d=\"M256,208 L181,208 176,150 256,150 256,94 255,94 114,94 115,109 129,265 256,265zM256,355 L255,355 192,338 188,293 158,293 132,293 139,382 255,414 256,414z\"/>\r\n  <path fill=\"#FFF\" d=\"M255,208 L255,265 325,265 318,338 255,355 255,414 371,382 372,372 385,223 387,208 371,208zM255,94 L255,129 255,150 255,150 392,150 392,150 392,150 393,138 396,109 397,94z\"/>\r\n</svg>\r\n";

/***/ },

/***/ "./style/icons/input-spark.svg"
/*!*************************************!*\
  !*** ./style/icons/input-spark.svg ***!
  \*************************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-input-spark\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M19 22.5a4.75 4.75 0 0 1 3.5 -3.5a4.75 4.75 0 0 1 -3.5 -3.5a4.75 4.75 0 0 1 -3.5 3.5a4.75 4.75 0 0 1 3.5 3.5\" /><path d=\"M20 11.5v-2.5a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v5a2 2 0 0 0 2 2h7\" /></svg>";

/***/ },

/***/ "./style/icons/join.svg"
/*!******************************!*\
  !*** ./style/icons/join.svg ***!
  \******************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-blend-mode\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M14.5 9.5m-6.5 0a6.5 6.5 0 1 0 13 0a6.5 6.5 0 1 0 -13 0\" /><path d=\"M9.5 14.5m-6.5 0a6.5 6.5 0 1 0 13 0a6.5 6.5 0 1 0 -13 0\" /></svg>";

/***/ },

/***/ "./style/icons/json.svg"
/*!******************************!*\
  !*** ./style/icons/json.svg ***!
  \******************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-json\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M20 16v-8l3 8v-8\" /><path d=\"M15 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2z\" /><path d=\"M1 8h3v6.5a1.5 1.5 0 0 1 -3 0v-.5\" /><path d=\"M7 15a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h1a1 1 0 0 1 1 1\" /></svg>";

/***/ },

/***/ "./style/icons/key.svg"
/*!*****************************!*\
  !*** ./style/icons/key.svg ***!
  \*****************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-circle-key\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M14 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /><path d=\"M21 12a9 9 0 1 1 -18 0a9 9 0 0 1 18 0z\" /><path d=\"M12.5 11.5l-4 4l1.5 1.5\" /><path d=\"M12 15l-1.5 -1.5\" /></svg>";

/***/ },

/***/ "./style/icons/lock-16.svg"
/*!*********************************!*\
  !*** ./style/icons/lock-16.svg ***!
  \*********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><g fill=\"currentColor\"><path d=\"M8 9.25a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1A.75.75 0 018 9.25z\"/><path fill-rule=\"evenodd\" d=\"M4 5.014v-.93c0-1.078.417-2.114 1.165-2.881A3.96 3.96 0 018 0a3.96 3.96 0 012.835 1.203A4.127 4.127 0 0112 4.083v.93a2.25 2.25 0 012 2.237v5.5A2.25 2.25 0 0111.75 15h-7.5A2.25 2.25 0 012 12.75v-5.5a2.25 2.25 0 012-2.236zM6.239 2.25A2.46 2.46 0 018 1.5c.657 0 1.29.267 1.761.75.471.483.739 1.142.739 1.833V5h-5v-.917c0-.69.268-1.35.739-1.833zM11.75 6.5a.75.75 0 01.75.75v5.5a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75v-5.5a.75.75 0 01.75-.75h7.5z\" clip-rule=\"evenodd\"/></g></svg>";

/***/ },

/***/ "./style/icons/markdown-fill.svg"
/*!***************************************!*\
  !*** ./style/icons/markdown-fill.svg ***!
  \***************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM7 15.5V11.5L9 13.5L11 11.5V15.5H13V8.5H11L9 10.5L7 8.5H5V15.5H7ZM18 12.5V8.5H16V12.5H14L17 15.5L20 12.5H18Z\"></path></svg>";

/***/ },

/***/ "./style/icons/mongodb.svg"
/*!*********************************!*\
  !*** ./style/icons/mongodb.svg ***!
  \*********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-brand-mongodb\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 3v19\" /><path d=\"M18 11.227c0 3.273 -1.812 4.77 -6 9.273c-4.188 -4.503 -6 -6 -6 -9.273c0 -4.454 3.071 -6.927 6 -9.227c2.929 2.3 6 4.773 6 9.227z\" /></svg>";

/***/ },

/***/ "./style/icons/mysql.svg"
/*!*******************************!*\
  !*** ./style/icons/mysql.svg ***!
  \*******************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"64\" height=\"64\" viewBox=\"0 0 25.6 25.6\"><path d=\"M179.076 94.886c-3.568-.1-6.336.268-8.656 1.25-.668.27-1.74.27-1.828 1.116.357.355.4.936.713 1.428.535.893 1.473 2.096 2.32 2.72l2.855 2.053c1.74 1.07 3.703 1.695 5.398 2.766.982.625 1.963 1.428 2.945 2.098.5.357.803.938 1.428 1.16v-.135c-.312-.4-.402-.98-.713-1.428l-1.34-1.293c-1.293-1.74-2.9-3.258-4.64-4.506-1.428-.982-4.55-2.32-5.13-3.97l-.088-.1c.98-.1 2.14-.447 3.078-.715 1.518-.4 2.9-.312 4.46-.713l2.143-.625v-.4c-.803-.803-1.383-1.874-2.23-2.632-2.275-1.963-4.775-3.882-7.363-5.488-1.383-.892-3.168-1.473-4.64-2.23-.537-.268-1.428-.402-1.74-.848-.805-.98-1.25-2.275-1.83-3.436l-3.658-7.763c-.803-1.74-1.295-3.48-2.275-5.086-4.596-7.585-9.594-12.18-17.268-16.687-1.65-.937-3.613-1.34-5.7-1.83l-3.346-.18c-.715-.312-1.428-1.16-2.053-1.562-2.543-1.606-9.102-5.086-10.977-.5-1.205 2.9 1.785 5.755 2.8 7.228.76 1.026 1.74 2.186 2.277 3.346.3.758.4 1.562.713 2.365.713 1.963 1.383 4.15 2.32 5.98.5.937 1.025 1.92 1.65 2.767.357.5.982.714 1.115 1.517-.625.893-.668 2.23-1.025 3.347-1.607 5.042-.982 11.288 1.293 15 .715 1.115 2.4 3.57 4.686 2.632 2.008-.803 1.56-3.346 2.14-5.577.135-.535.045-.892.312-1.25v.1l1.83 3.703c1.383 2.186 3.793 4.462 5.8 5.98 1.07.803 1.918 2.187 3.256 2.677v-.135h-.088c-.268-.4-.67-.58-1.027-.892-.803-.803-1.695-1.785-2.32-2.677-1.873-2.498-3.523-5.265-4.996-8.12-.715-1.383-1.34-2.9-1.918-4.283-.27-.536-.27-1.34-.715-1.606-.67.98-1.65 1.83-2.143 3.034-.848 1.918-.936 4.283-1.248 6.737-.18.045-.1 0-.18.1-1.426-.356-1.918-1.83-2.453-3.078-1.338-3.168-1.562-8.254-.402-11.913.312-.937 1.652-3.882 1.117-4.774-.27-.848-1.16-1.338-1.652-2.008-.58-.848-1.203-1.918-1.605-2.855-1.07-2.5-1.605-5.265-2.766-7.764-.537-1.16-1.473-2.365-2.232-3.435-.848-1.205-1.783-2.053-2.453-3.48-.223-.5-.535-1.294-.178-1.83.088-.357.268-.5.623-.58.58-.5 2.232.134 2.812.4 1.65.67 3.033 1.294 4.416 2.23.625.446 1.295 1.294 2.098 1.518h.938c1.428.312 3.033.1 4.37.5 2.365.76 4.506 1.874 6.426 3.08 5.844 3.703 10.664 8.968 13.92 15.26.535 1.026.758 1.963 1.25 3.034.938 2.187 2.098 4.417 3.033 6.56.938 2.097 1.83 4.24 3.168 5.98.67.937 3.346 1.427 4.55 1.918.893.4 2.275.76 3.08 1.25 1.516.937 3.033 2.008 4.46 3.034.713.534 2.945 1.65 3.078 2.54zm-45.5-38.772a7.09 7.09 0 0 0-1.828.223v.1h.088c.357.714.982 1.205 1.428 1.83l1.027 2.142.088-.1c.625-.446.938-1.16.938-2.23-.268-.312-.312-.625-.535-.937-.268-.446-.848-.67-1.206-1.026z\" transform=\"matrix(.390229 0 0 .38781 -46.300037 -16.856717)\" fill-rule=\"evenodd\" fill=\"#00678c\"/></svg>";

/***/ },

/***/ "./style/icons/network-alt-24.svg"
/*!****************************************!*\
  !*** ./style/icons/network-alt-24.svg ***!
  \****************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"><g fill=\"currentColor\"><path d=\"M23 12a.75.75 0 00-.232-.543l-5.5-5.25a.75.75 0 00-1.036 1.086L21.164 12l-4.932 4.707a.75.75 0 001.036 1.085l5.5-5.25A.75.75 0 0023 12zM1 12a.75.75 0 01.232-.543l5.5-5.25a.75.75 0 111.036 1.086L2.836 12l4.932 4.707a.75.75 0 01-1.036 1.085l-5.5-5.25A.75.75 0 011 12z\"/><path d=\"M8 11a1 1 0 100 2h.01a1 1 0 100-2H8zM11 12a1 1 0 011-1h.01a1 1 0 110 2H12a1 1 0 01-1-1zM16 11a1 1 0 100 2h.01a1 1 0 100-2H16z\"/></g></svg>";

/***/ },

/***/ "./style/icons/number.svg"
/*!********************************!*\
  !*** ./style/icons/number.svg ***!
  \********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-number\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M4 17v-10l7 10v-10\" /><path d=\"M15 17h5\" /><path d=\"M17.5 10m-2.5 0a2.5 3 0 1 0 5 0a2.5 3 0 1 0 -5 0\" /></svg>";

/***/ },

/***/ "./style/icons/openai.svg"
/*!********************************!*\
  !*** ./style/icons/openai.svg ***!
  \********************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\r\n<svg fill=\"#000000\" width=\"800px\" height=\"800px\" viewBox=\"0 0 24 24\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\"><title>OpenAI icon</title><path d=\"M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z\"/></svg>";

/***/ },

/***/ "./style/icons/oracle.svg"
/*!********************************!*\
  !*** ./style/icons/oracle.svg ***!
  \********************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<svg\r\n   width=\"24\"\r\n   height=\"24\"\r\n   version=\"1.1\"\r\n   id=\"svg1\"\r\n   viewBox=\"0 0 24 24\"\r\n   sodipodi:docname=\"oracle.svg\"\r\n   inkscape:version=\"1.3 (0e150ed, 2023-07-21)\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\">\r\n  <defs\r\n     id=\"defs1\" />\r\n  <sodipodi:namedview\r\n     id=\"namedview1\"\r\n     pagecolor=\"#505050\"\r\n     bordercolor=\"#eeeeee\"\r\n     borderopacity=\"1\"\r\n     inkscape:showpageshadow=\"0\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pagecheckerboard=\"0\"\r\n     inkscape:deskcolor=\"#505050\"\r\n     labelstyle=\"below\"\r\n     inkscape:zoom=\"11.8\"\r\n     inkscape:cx=\"16.016949\"\r\n     inkscape:cy=\"15.381356\"\r\n     inkscape:window-width=\"2560\"\r\n     inkscape:window-height=\"1412\"\r\n     inkscape:window-x=\"1512\"\r\n     inkscape:window-y=\"149\"\r\n     inkscape:window-maximized=\"1\"\r\n     inkscape:current-layer=\"svg1\" />\r\n  <path\r\n     fill=\"none\"\r\n     stroke=\"#c74634\"\r\n     stroke-width=\"2.9935\"\r\n     d=\"m 7.5677778,6.0126423 a 5.9866678,5.9873577 0 1 0 0,11.9747157 h 8.9800012 a 5.9866678,5.9873577 0 1 0 0,-11.9747157 z\"\r\n     id=\"path1\" />\r\n</svg>\r\n";

/***/ },

/***/ "./style/icons/package.svg"
/*!*********************************!*\
  !*** ./style/icons/package.svg ***!
  \*********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-package\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5\" /><path d=\"M12 12l8 -4.5\" /><path d=\"M12 12l0 9\" /><path d=\"M12 12l-8 -4.5\" /><path d=\"M16 5.25l-8 4.5\" /></svg>";

/***/ },

/***/ "./style/icons/pinecone.svg"
/*!**********************************!*\
  !*** ./style/icons/pinecone.svg ***!
  \**********************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<svg width=\"256px\" height=\"288px\" viewBox=\"0 0 256 288\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"  preserveAspectRatio=\"xMidYMid\">\r\n    <title>Pinecone</title>\r\n    <g>\r\n        <path d=\"M108.633615,254.43629 C117.713862,254.43629 125.074857,261.797284 125.074857,270.877532 C125.074857,279.957779 117.713862,287.318774 108.633615,287.318774 C99.5533677,287.318774 92.1923728,279.957779 92.1923728,270.877532 C92.1923728,261.797284 99.5533677,254.43629 108.633615,254.43629 Z M199.849665,224.438339 L216.09705,229.252379 L203.199913,272.780219 C202.072982,276.58361 198.458049,279.095992 194.500389,278.826397 L190.516677,278.552973 L190.419263,278.633409 L149.02918,275.728903 L150.180842,258.822508 L177.989056,260.709686 L159.783784,234.447622 L173.709616,224.792379 L191.938895,251.08702 L199.849665,224.438339 Z M23.0126771,194.347476 L39.9158866,195.544979 L37.935897,223.348728 L64.1501315,205.120082 L73.8271476,219.030793 L47.578736,237.278394 L74.3707554,245.173037 L69.5818063,261.427835 L25.8485266,248.543243 C22.0304448,247.418369 19.5101155,243.787479 19.7913963,239.817092 L23.0126771,194.347476 Z M132.151306,170.671396 L162.658679,207.503468 L148.909247,218.891886 L130.753266,196.972134 L124.866941,230.673893 L107.280249,227.599613 L113.172232,193.845272 L88.7296311,208.256891 L79.6674587,192.874434 L120.745504,168.674377 C124.522104,166.449492 129.355297,167.295726 132.151306,170.671396 Z M217.504528,145.960198 L232.744017,137.668804 L254.94482,178.473633 C256.889641,182.048192 256.088221,186.494171 253.017682,189.164674 L249.876622,191.878375 L217.826246,219.77131 L206.441034,206.680621 L227.988588,187.934494 L195.893546,182.152609 L198.972402,165.078949 L231.044844,170.857793 L217.504528,145.960198 Z M37.7821805,103.299272 L49.2622123,116.306888 L28.0106317,135.050179 L60.1668233,140.664193 L57.1863573,157.755303 L24.9947229,152.136967 L38.822104,177.134576 L23.6411026,185.532577 L1.08439616,144.756992 C-0.885025494,141.196884 -0.115545265,136.746375 2.93488097,134.054184 L37.7821805,103.299272 Z M146.476311,89.8796828 L176.88045,126.612847 L163.1271,137.996532 L144.975445,116.067101 L139.08912,149.778947 L121.502428,146.704666 L127.374238,113.081452 L103.025237,127.354817 L93.9976317,111.952048 L131.398812,90.0233663 L131.435631,89.880899 L131.600545,89.9023265 L135.085833,87.870141 C138.861877,85.6569913 143.68556,86.5079996 146.476311,89.8796828 Z M185.655786,71.8143168 L192.305535,55.7902703 L235.318239,73.6399229 C239.072486,75.1978811 241.2415,79.1537636 240.536356,83.1568091 L239.820231,87.1385839 L232.47517,128.919545 L215.389188,125.909819 L220.312646,97.9413879 L191.776157,113.7129 L183.390302,98.5251862 L211.981072,82.7408038 L185.655786,71.8143168 Z M103.71696,40.2373824 L104.456513,57.5706533 L76.0432671,58.785006 L97.4730368,83.2749086 L84.4165529,94.6993319 L62.9507932,70.1728358 L57.949673,98.1737132 L40.8716575,95.1191088 L49.0561498,49.3603563 C49.771444,45.3612115 53.1664633,42.3942036 57.2253811,42.2210231 L61.246149,42.0411642 L61.3363168,41.9758 L103.71696,40.2373824 Z M161.838155,3.27194826 L192.104824,40.2369789 L178.291207,51.5474574 L160.327329,29.6043227 L154.268381,63.2715157 L136.697231,60.1096121 L142.766468,26.3665075 L118.24002,40.7062765 L109.232678,25.2916494 L150.427675,1.21987397 C154.218286,-0.995121237 159.056796,-0.124957814 161.838155,3.27194826 Z\" fill=\"#201D1E\"></path>\r\n    </g>\r\n</svg>\r\n";

/***/ },

/***/ "./style/icons/play-circle-16.svg"
/*!****************************************!*\
  !*** ./style/icons/play-circle-16.svg ***!
  \****************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><g fill=\"currentColor\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"><path d=\"M7.421 4.356A1.25 1.25 0 005.5 5.411v5.178a1.25 1.25 0 001.921 1.055l4.069-2.59a1.25 1.25 0 000-2.109L7.42 4.356zM10.353 8L7 10.134V5.866L10.353 8z\"/><path d=\"M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z\"/></g></svg>";

/***/ },

/***/ "./style/icons/plus-circle-24.svg"
/*!****************************************!*\
  !*** ./style/icons/plus-circle-24.svg ***!
  \****************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"><g fill=\"currentColor\"><path d=\"M11.75 6.75a.75.75 0 01.75.75V11H16a.75.75 0 010 1.5h-3.5V16a.75.75 0 01-1.5 0v-3.5H7.5a.75.75 0 010-1.5H11V7.5a.75.75 0 01.75-.75z\"/><path fill-rule=\"evenodd\" d=\"M1 11.75C1 5.813 5.813 1 11.75 1S22.5 5.813 22.5 11.75 17.687 22.5 11.75 22.5 1 17.687 1 11.75zM11.75 2.5a9.25 9.25 0 100 18.5 9.25 9.25 0 000-18.5z\" clip-rule=\"evenodd\"/></g></svg>";

/***/ },

/***/ "./style/icons/postgres.svg"
/*!**********************************!*\
  !*** ./style/icons/postgres.svg ***!
  \**********************************/
(module) {

module.exports = "<?xml version=\"1.0\"?>\r\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\"\r\n  \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\r\n\r\n<svg width=\"432.071pt\" height=\"445.383pt\" viewBox=\"0 0 432.071 445.383\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\">\r\n<g id=\"orginal\" style=\"fill-rule:nonzero;clip-rule:nonzero;stroke:#000000;stroke-miterlimit:4;\">\r\n\t</g>\r\n<g id=\"Layer_x0020_3\" style=\"fill-rule:nonzero;clip-rule:nonzero;fill:none;stroke:#FFFFFF;stroke-width:12.4651;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;\">\r\n<path style=\"fill:#000000;stroke:#000000;stroke-width:37.3953;stroke-linecap:butt;stroke-linejoin:miter;\" d=\"M323.205,324.227c2.833-23.601,1.984-27.062,19.563-23.239l4.463,0.392c13.517,0.615,31.199-2.174,41.587-7c22.362-10.376,35.622-27.7,13.572-23.148c-50.297,10.376-53.755-6.655-53.755-6.655c53.111-78.803,75.313-178.836,56.149-203.322    C352.514-5.534,262.036,26.049,260.522,26.869l-0.482,0.089c-9.938-2.062-21.06-3.294-33.554-3.496c-22.761-0.374-40.032,5.967-53.133,15.904c0,0-161.408-66.498-153.899,83.628c1.597,31.936,45.777,241.655,98.47,178.31    c19.259-23.163,37.871-42.748,37.871-42.748c9.242,6.14,20.307,9.272,31.912,8.147l0.897-0.765c-0.281,2.876-0.157,5.689,0.359,9.019c-13.572,15.167-9.584,17.83-36.723,23.416c-27.457,5.659-11.326,15.734-0.797,18.367c12.768,3.193,42.305,7.716,62.268-20.224    l-0.795,3.188c5.325,4.26,4.965,30.619,5.72,49.452c0.756,18.834,2.017,36.409,5.856,46.771c3.839,10.36,8.369,37.05,44.036,29.406c29.809-6.388,52.6-15.582,54.677-101.107\"/>\r\n<path style=\"fill:#336791;stroke:none;\" d=\"M402.395,271.23c-50.302,10.376-53.76-6.655-53.76-6.655c53.111-78.808,75.313-178.843,56.153-203.326c-52.27-66.785-142.752-35.2-144.262-34.38l-0.486,0.087c-9.938-2.063-21.06-3.292-33.56-3.496c-22.761-0.373-40.026,5.967-53.127,15.902    c0,0-161.411-66.495-153.904,83.63c1.597,31.938,45.776,241.657,98.471,178.312c19.26-23.163,37.869-42.748,37.869-42.748c9.243,6.14,20.308,9.272,31.908,8.147l0.901-0.765c-0.28,2.876-0.152,5.689,0.361,9.019c-13.575,15.167-9.586,17.83-36.723,23.416    c-27.459,5.659-11.328,15.734-0.796,18.367c12.768,3.193,42.307,7.716,62.266-20.224l-0.796,3.188c5.319,4.26,9.054,27.711,8.428,48.969c-0.626,21.259-1.044,35.854,3.147,47.254c4.191,11.4,8.368,37.05,44.042,29.406c29.809-6.388,45.256-22.942,47.405-50.555    c1.525-19.631,4.976-16.729,5.194-34.28l2.768-8.309c3.192-26.611,0.507-35.196,18.872-31.203l4.463,0.392c13.517,0.615,31.208-2.174,41.591-7c22.358-10.376,35.618-27.7,13.573-23.148z\"/>\r\n<path d=\"M215.866,286.484c-1.385,49.516,0.348,99.377,5.193,111.495c4.848,12.118,15.223,35.688,50.9,28.045c29.806-6.39,40.651-18.756,45.357-46.051c3.466-20.082,10.148-75.854,11.005-87.281\"/>\r\n<path d=\"M173.104,38.256c0,0-161.521-66.016-154.012,84.109c1.597,31.938,45.779,241.664,98.473,178.316c19.256-23.166,36.671-41.335,36.671-41.335\"/>\r\n<path d=\"M260.349,26.207c-5.591,1.753,89.848-34.889,144.087,34.417c19.159,24.484-3.043,124.519-56.153,203.329\"/>\r\n<path style=\"stroke-linejoin:bevel;\" d=\"M348.282,263.953c0,0,3.461,17.036,53.764,6.653c22.04-4.552,8.776,12.774-13.577,23.155c-18.345,8.514-59.474,10.696-60.146-1.069c-1.729-30.355,21.647-21.133,19.96-28.739c-1.525-6.85-11.979-13.573-18.894-30.338    c-6.037-14.633-82.796-126.849,21.287-110.183c3.813-0.789-27.146-99.002-124.553-100.599c-97.385-1.597-94.19,119.762-94.19,119.762\"/>\r\n<path d=\"M188.604,274.334c-13.577,15.166-9.584,17.829-36.723,23.417c-27.459,5.66-11.326,15.733-0.797,18.365c12.768,3.195,42.307,7.718,62.266-20.229c6.078-8.509-0.036-22.086-8.385-25.547c-4.034-1.671-9.428-3.765-16.361,3.994z\"/>\r\n<path d=\"M187.715,274.069c-1.368-8.917,2.93-19.528,7.536-31.942c6.922-18.626,22.893-37.255,10.117-96.339c-9.523-44.029-73.396-9.163-73.436-3.193c-0.039,5.968,2.889,30.26-1.067,58.548c-5.162,36.913,23.488,68.132,56.479,64.938\"/>\r\n<path style=\"fill:#FFFFFF;stroke-width:4.155;stroke-linecap:butt;stroke-linejoin:miter;\" d=\"M172.517,141.7c-0.288,2.039,3.733,7.48,8.976,8.207c5.234,0.73,9.714-3.522,9.998-5.559c0.284-2.039-3.732-4.285-8.977-5.015c-5.237-0.731-9.719,0.333-9.996,2.367z\"/>\r\n<path style=\"fill:#FFFFFF;stroke-width:2.0775;stroke-linecap:butt;stroke-linejoin:miter;\" d=\"M331.941,137.543c0.284,2.039-3.732,7.48-8.976,8.207c-5.238,0.73-9.718-3.522-10.005-5.559c-0.277-2.039,3.74-4.285,8.979-5.015c5.239-0.73,9.718,0.333,10.002,2.368z\"/>\r\n<path d=\"M350.676,123.432c0.863,15.994-3.445,26.888-3.988,43.914c-0.804,24.748,11.799,53.074-7.191,81.435\"/>\r\n<path style=\"stroke-width:3;\" d=\"M0,60.232\"/>\r\n</g>\r\n</svg>";

/***/ },

/***/ "./style/icons/python.svg"
/*!********************************!*\
  !*** ./style/icons/python.svg ***!
  \********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-brand-python\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 9h-7a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h3\" /><path d=\"M12 15h7a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-3\" /><path d=\"M8 9v-4a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v5a2 2 0 0 1 -2 2h-4a2 2 0 0 0 -2 2v5a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4\" /><path d=\"M11 6l0 .01\" /><path d=\"M13 18l0 .01\" /></svg>";

/***/ },

/***/ "./style/icons/reddit.svg"
/*!********************************!*\
  !*** ./style/icons/reddit.svg ***!
  \********************************/
(module) {

module.exports = "<svg viewBox=\"0 0 800 800\" xmlns=\"http://www.w3.org/2000/svg\" width=\"2500\" height=\"2500\"><circle cx=\"400\" cy=\"400\" fill=\"#ff4500\" r=\"400\"/><path d=\"M666.8 400c.08 5.48-.6 10.95-2.04 16.24s-3.62 10.36-6.48 15.04c-2.85 4.68-6.35 8.94-10.39 12.65s-8.58 6.83-13.49 9.27c.11 1.46.2 2.93.25 4.4a107.268 107.268 0 0 1 0 8.8c-.05 1.47-.14 2.94-.25 4.4 0 89.6-104.4 162.4-233.2 162.4S168 560.4 168 470.8c-.11-1.46-.2-2.93-.25-4.4a107.268 107.268 0 0 1 0-8.8c.05-1.47.14-2.94.25-4.4a58.438 58.438 0 0 1-31.85-37.28 58.41 58.41 0 0 1 7.8-48.42 58.354 58.354 0 0 1 41.93-25.4 58.4 58.4 0 0 1 46.52 15.5 286.795 286.795 0 0 1 35.89-20.71c12.45-6.02 25.32-11.14 38.51-15.3s26.67-7.35 40.32-9.56 27.45-3.42 41.28-3.63L418 169.6c.33-1.61.98-3.13 1.91-4.49.92-1.35 2.11-2.51 3.48-3.4 1.38-.89 2.92-1.5 4.54-1.8 1.61-.29 3.27-.26 4.87.09l98 19.6c9.89-16.99 30.65-24.27 48.98-17.19s28.81 26.43 24.71 45.65c-4.09 19.22-21.55 32.62-41.17 31.61-19.63-1.01-35.62-16.13-37.72-35.67L440 186l-26 124.8c13.66.29 27.29 1.57 40.77 3.82a284.358 284.358 0 0 1 77.8 24.86A284.412 284.412 0 0 1 568 360a58.345 58.345 0 0 1 29.4-15.21 58.361 58.361 0 0 1 32.95 3.21 58.384 58.384 0 0 1 25.91 20.61A58.384 58.384 0 0 1 666.8 400zm-396.96 55.31c2.02 4.85 4.96 9.26 8.68 12.97 3.71 3.72 8.12 6.66 12.97 8.68A40.049 40.049 0 0 0 306.8 480c16.18 0 30.76-9.75 36.96-24.69 6.19-14.95 2.76-32.15-8.68-43.59s-28.64-14.87-43.59-8.68c-14.94 6.2-24.69 20.78-24.69 36.96 0 5.25 1.03 10.45 3.04 15.31zm229.1 96.02c2.05-2 3.22-4.73 3.26-7.59.04-2.87-1.07-5.63-3.07-7.68s-4.73-3.22-7.59-3.26c-2.87-.04-5.63 1.07-7.94 2.8a131.06 131.06 0 0 1-19.04 11.35 131.53 131.53 0 0 1-20.68 7.99c-7.1 2.07-14.37 3.54-21.72 4.39-7.36.85-14.77 1.07-22.16.67-7.38.33-14.78.03-22.11-.89a129.01 129.01 0 0 1-21.64-4.6c-7.08-2.14-13.95-4.88-20.56-8.18s-12.93-7.16-18.89-11.53c-2.07-1.7-4.7-2.57-7.38-2.44s-5.21 1.26-7.11 3.15c-1.89 1.9-3.02 4.43-3.15 7.11s.74 5.31 2.44 7.38c7.03 5.3 14.5 9.98 22.33 14s16 7.35 24.4 9.97 17.01 4.51 25.74 5.66c8.73 1.14 17.54 1.53 26.33 1.17 8.79.36 17.6-.03 26.33-1.17A153.961 153.961 0 0 0 476.87 564c7.83-4.02 15.3-8.7 22.33-14zm-7.34-68.13c5.42.06 10.8-.99 15.81-3.07 5.01-2.09 9.54-5.17 13.32-9.06s6.72-8.51 8.66-13.58A39.882 39.882 0 0 0 532 441.6c0-16.18-9.75-30.76-24.69-36.96-14.95-6.19-32.15-2.76-43.59 8.68s-14.87 28.64-8.68 43.59c6.2 14.94 20.78 24.69 36.96 24.69z\" fill=\"#fff\"/></svg>";

/***/ },

/***/ "./style/icons/rename.svg"
/*!********************************!*\
  !*** ./style/icons/rename.svg ***!
  \********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-pencil\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4\" /><path d=\"M13.5 6.5l4 4\" /></svg>";

/***/ },

/***/ "./style/icons/s3.svg"
/*!****************************!*\
  !*** ./style/icons/s3.svg ***!
  \****************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<svg\r\n   width=\"396\"\r\n   height=\"480\"\r\n   viewBox=\"0 0 396 480\"\r\n   version=\"1.1\"\r\n   id=\"svg13\"\r\n   sodipodi:docname=\"s3.svg\"\r\n   inkscape:version=\"1.3 (0e150ed, 2023-07-21)\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\">\r\n  <sodipodi:namedview\r\n     id=\"namedview13\"\r\n     pagecolor=\"#505050\"\r\n     bordercolor=\"#eeeeee\"\r\n     borderopacity=\"1\"\r\n     inkscape:showpageshadow=\"0\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pagecheckerboard=\"0\"\r\n     inkscape:deskcolor=\"#505050\"\r\n     inkscape:zoom=\"0.4609375\"\r\n     inkscape:cx=\"199.59322\"\r\n     inkscape:cy=\"251.66102\"\r\n     inkscape:window-width=\"1312\"\r\n     inkscape:window-height=\"449\"\r\n     inkscape:window-x=\"0\"\r\n     inkscape:window-y=\"32\"\r\n     inkscape:window-maximized=\"0\"\r\n     inkscape:current-layer=\"svg13\" />\r\n  <defs\r\n     id=\"defs1\">\r\n    <style\r\n       id=\"style1\">&#10;      .cls-1 {&#10;        fill: #e25444;&#10;      }&#10;&#10;      .cls-1, .cls-2, .cls-3 {&#10;        fill-rule: evenodd;&#10;      }&#10;&#10;      .cls-2 {&#10;        fill: #7b1d13;&#10;      }&#10;&#10;      .cls-3 {&#10;        fill: #58150d;&#10;      }&#10;    </style>\r\n  </defs>\r\n  <g\r\n     id=\"g13\"\r\n     transform=\"translate(-16,-16)\">\r\n    <path\r\n       class=\"cls-1\"\r\n       d=\"m 378,99 -83,158 83,158 34,-19 V 118 Z\"\r\n       id=\"path1\" />\r\n    <path\r\n       class=\"cls-2\"\r\n       d=\"M 378,99 212,118 127.5,257 212,396 378,415 Z\"\r\n       id=\"path2\" />\r\n    <path\r\n       class=\"cls-3\"\r\n       d=\"M 43,99 16,111 V 403 L 43,415 212,257 Z\"\r\n       id=\"path3\" />\r\n    <path\r\n       class=\"cls-1\"\r\n       d=\"m 42.637,98.667 169.587,47.111 V 372.444 L 42.637,415.111 Z\"\r\n       id=\"path4\" />\r\n    <path\r\n       class=\"cls-3\"\r\n       d=\"m 212.313,170.667 -72.008,-11.556 72.008,-81.778 71.83,81.778 z\"\r\n       id=\"path5\" />\r\n    <path\r\n       class=\"cls-3\"\r\n       d=\"m 284.143,159.111 -71.919,11.733 -71.919,-11.733 V 77.333\"\r\n       id=\"path6\" />\r\n    <path\r\n       class=\"cls-3\"\r\n       d=\"m 212.313,342.222 -72.008,13.334 72.008,70.222 71.83,-70.222 z\"\r\n       id=\"path7\" />\r\n    <path\r\n       class=\"cls-2\"\r\n       d=\"m 212,16 -72,38 v 105 l 72.224,-20.333 z\"\r\n       id=\"path8\" />\r\n    <path\r\n       class=\"cls-2\"\r\n       d=\"m 212.224,196.444 -71.919,7.823 v 104.838 l 71.919,8.228 z\"\r\n       id=\"path9\" />\r\n    <path\r\n       class=\"cls-2\"\r\n       d=\"M 212.224,373.333 140.305,355.3 V 458.363 L 212.224,496 Z\"\r\n       id=\"path10\" />\r\n    <path\r\n       class=\"cls-1\"\r\n       d=\"m 284.143,355.3 -71.919,18.038 V 496 l 71.919,-37.637 z\"\r\n       id=\"path11\" />\r\n    <path\r\n       class=\"cls-1\"\r\n       d=\"m 212.224,196.444 71.919,7.823 v 104.838 l -71.919,8.228 z\"\r\n       id=\"path12\" />\r\n    <path\r\n       class=\"cls-1\"\r\n       d=\"m 212,16 72,38 v 105 l -72,-20 z\"\r\n       id=\"path13\" />\r\n  </g>\r\n</svg>\r\n";

/***/ },

/***/ "./style/icons/sample.svg"
/*!********************************!*\
  !*** ./style/icons/sample.svg ***!
  \********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-test-pipe\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M20 8.04l-12.122 12.124a2.857 2.857 0 1 1 -4.041 -4.04l12.122 -12.124\" /><path d=\"M7 13h8\" /><path d=\"M19 15l1.5 1.6a2 2 0 1 1 -3 0l1.5 -1.6z\" /><path d=\"M15 3l6 6\" /></svg>";

/***/ },

/***/ "./style/icons/scissors.svg"
/*!**********************************!*\
  !*** ./style/icons/scissors.svg ***!
  \**********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-scissors\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M6 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0\" /><path d=\"M6 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0\" /><path d=\"M8.6 8.6l10.4 10.4\" /><path d=\"M8.6 15.4l10.4 -10.4\" /></svg>";

/***/ },

/***/ "./style/icons/service-16.svg"
/*!************************************!*\
  !*** ./style/icons/service-16.svg ***!
  \************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><g fill=\"currentColor\"><path d=\"M6.834.33a2.25 2.25 0 012.332 0l5.25 3.182A2.25 2.25 0 0115.5 5.436V6A.75.75 0 0114 6v-.564a.75.75 0 00-.361-.642l-5.25-3.181a.75.75 0 00-.778 0l-5.25 3.181A.75.75 0 002 5.436v5.128a.75.75 0 00.361.642l4.028 2.44a.75.75 0 11-.778 1.283l-4.027-2.44A2.25 2.25 0 01.5 10.563V5.436a2.25 2.25 0 011.084-1.924L6.834.33z\"/><path fill-rule=\"evenodd\" d=\"M11.749 7.325l.001-.042v-.286a.75.75 0 00-1.5 0v.286l.001.042a3.73 3.73 0 00-1.318.546.76.76 0 00-.03-.03l-.201-.203a.75.75 0 00-1.06 1.06l.201.203.03.028c-.26.394-.45.84-.547 1.319a.878.878 0 00-.04-.001H7a.75.75 0 000 1.5h.286l.038-.001c.097.48.286.926.547 1.32a.71.71 0 00-.028.027l-.202.202a.75.75 0 001.06 1.06l.203-.202a.695.695 0 00.025-.026c.395.261.842.45 1.322.548l-.001.036v.286a.75.75 0 001.5 0v-.286-.036c.48-.097.926-.287 1.32-.548l.026.026.202.203a.75.75 0 001.06-1.061l-.201-.202a.667.667 0 00-.028-.026c.261-.395.45-.842.547-1.321H15a.75.75 0 000-1.5h-.286l-.04.002a3.734 3.734 0 00-.547-1.319l.03-.028.202-.202a.75.75 0 00-1.06-1.061l-.203.202-.029.03a3.73 3.73 0 00-1.318-.545zM11 8.75A2.247 2.247 0 008.75 11 2.247 2.247 0 0011 13.25 2.247 2.247 0 0013.25 11 2.247 2.247 0 0011 8.75z\" clip-rule=\"evenodd\"/></g></svg>";

/***/ },

/***/ "./style/icons/settings-16.svg"
/*!*************************************!*\
  !*** ./style/icons/settings-16.svg ***!
  \*************************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<svg\r\n   width=\"16\"\r\n   height=\"16\"\r\n   fill=\"none\"\r\n   viewBox=\"0 0 16 16\"\r\n   version=\"1.1\"\r\n   id=\"svg2\"\r\n   sodipodi:docname=\"settings-16.svg\"\r\n   inkscape:version=\"1.3 (0e150ed, 2023-07-21)\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\">\r\n  <defs\r\n     id=\"defs2\" />\r\n  <sodipodi:namedview\r\n     id=\"namedview2\"\r\n     pagecolor=\"#505050\"\r\n     bordercolor=\"#eeeeee\"\r\n     borderopacity=\"1\"\r\n     inkscape:showpageshadow=\"0\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pagecheckerboard=\"0\"\r\n     inkscape:deskcolor=\"#505050\"\r\n     inkscape:zoom=\"34.875\"\r\n     inkscape:cx=\"8\"\r\n     inkscape:cy=\"7.9856631\"\r\n     inkscape:window-width=\"1392\"\r\n     inkscape:window-height=\"922\"\r\n     inkscape:window-x=\"0\"\r\n     inkscape:window-y=\"75\"\r\n     inkscape:window-maximized=\"0\"\r\n     inkscape:current-layer=\"svg2\" />\r\n  <g\r\n     fill=\"currentColor\"\r\n     fill-rule=\"evenodd\"\r\n     clip-rule=\"evenodd\"\r\n     id=\"g2\">\r\n    <path\r\n       d=\"M8 5a3 3 0 100 6 3 3 0 000-6zM6.5 8a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z\"\r\n       id=\"path1\" />\r\n    <path\r\n       d=\"M7.5 0a1.75 1.75 0 00-1.75 1.75v.15c-.16.06-.318.125-.472.196l-.106-.106a1.75 1.75 0 00-2.475 0l-.707.707a1.75 1.75 0 000 2.475l.106.106a6.46 6.46 0 00-.196.472h-.15A1.75 1.75 0 000 7.5v1c0 .966.784 1.75 1.75 1.75h.15c.06.16.125.318.196.472l-.106.107a1.75 1.75 0 000 2.474l.707.708a1.75 1.75 0 002.475 0l.106-.107c.154.071.312.137.472.196v.15c0 .966.784 1.75 1.75 1.75h1a1.75 1.75 0 001.75-1.75v-.15c.16-.06.318-.125.472-.196l.106.107a1.75 1.75 0 002.475 0l.707-.707a1.75 1.75 0 000-2.475l-.106-.107c.071-.154.137-.311.196-.472h.15A1.75 1.75 0 0016 8.5v-1a1.75 1.75 0 00-1.75-1.75h-.15a6.455 6.455 0 00-.196-.472l.106-.106a1.75 1.75 0 000-2.475l-.707-.707a1.75 1.75 0 00-2.475 0l-.106.106a6.46 6.46 0 00-.472-.196v-.15A1.75 1.75 0 008.5 0h-1zm-.25 1.75a.25.25 0 01.25-.25h1a.25.25 0 01.25.25v.698c0 .339.227.636.555.724.42.113.817.28 1.186.492a.75.75 0 00.905-.12l.493-.494a.25.25 0 01.354 0l.707.708a.25.25 0 010 .353l-.494.494a.75.75 0 00-.12.904c.213.369.38.767.492 1.186a.75.75 0 00.724.555h.698a.25.25 0 01.25.25v1a.25.25 0 01-.25.25h-.698a.75.75 0 00-.724.555c-.113.42-.28.817-.492 1.186a.75.75 0 00.12.905l.494.493a.25.25 0 010 .354l-.707.707a.25.25 0 01-.354 0l-.494-.494a.75.75 0 00-.904-.12 4.966 4.966 0 01-1.186.492.75.75 0 00-.555.724v.698a.25.25 0 01-.25.25h-1a.25.25 0 01-.25-.25v-.698a.75.75 0 00-.555-.724 4.966 4.966 0 01-1.186-.491.75.75 0 00-.904.12l-.494.493a.25.25 0 01-.354 0l-.707-.707a.25.25 0 010-.354l.494-.493a.75.75 0 00.12-.905 4.966 4.966 0 01-.492-1.186.75.75 0 00-.724-.555H1.75a.25.25 0 01-.25-.25v-1a.25.25 0 01.25-.25h.698a.75.75 0 00.724-.555c.113-.42.28-.817.491-1.186a.75.75 0 00-.12-.904L3.05 4.11a.25.25 0 010-.353l.707-.708a.25.25 0 01.354 0l.493.494c.24.24.611.289.905.12a4.965 4.965 0 011.186-.492.75.75 0 00.555-.724V1.75z\"\r\n       id=\"path2\" />\r\n  </g>\r\n</svg>\r\n";

/***/ },

/***/ "./style/icons/sidebar-show-24.svg"
/*!*****************************************!*\
  !*** ./style/icons/sidebar-show-24.svg ***!
  \*****************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"><g fill=\"currentColor\"><path d=\"M11.735 8.295a.75.75 0 011.03-1.09l4.5 4.25a.75.75 0 010 1.09l-4.5 4.25a.75.75 0 01-1.03-1.09L15.658 12l-3.923-3.705z\"/><path fill-rule=\"evenodd\" d=\"M2 4.75A2.75 2.75 0 014.75 2h14.5A2.75 2.75 0 0122 4.75v14.5A2.75 2.75 0 0119.25 22H4.75A2.75 2.75 0 012 19.25V4.75zM4.75 3.5c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25H7v-17H4.75zm14.5 17H8.5v-17h10.75c.69 0 1.25.56 1.25 1.25v14.5c0 .69-.56 1.25-1.25 1.25z\" clip-rule=\"evenodd\"/></g></svg>";

/***/ },

/***/ "./style/icons/snowflake.svg"
/*!***********************************!*\
  !*** ./style/icons/snowflake.svg ***!
  \***********************************/
(module) {

module.exports = "<svg id=\"Layer_1\" data-name=\"Layer 1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 146.36 139.16\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\r\n <defs>\r\n  <style>\r\n   .cls-1{fill:#29b5e8;fill-rule:evenodd;}\r\n  </style>\r\n </defs>\r\n <path class=\"cls-1\" d=\"M134.81,60.1l-16.47,9.49L134.81,79a8.65,8.65,0,1,1-8.67,15l-29.51-17a8.68,8.68,0,0,1-4.33-7.75,8.48,8.48,0,0,1,.31-2,8.68,8.68,0,0,1,4-5.19l29.51-16.94A8.69,8.69,0,0,1,138,48.31,8.58,8.58,0,0,1,134.81,60.1Zm-15.59,46L89.72,89.13a8.72,8.72,0,0,0-13.06,7.48v33.9a8.69,8.69,0,0,0,17.37,0v-19L110.54,121a8.66,8.66,0,1,0,8.68-15Zm-34-33.16L72.92,85.09a2.44,2.44,0,0,1-1.54.65H67.77a2.51,2.51,0,0,1-1.54-.65L54,72.9a2.45,2.45,0,0,1-.64-1.52v-3.6A2.5,2.5,0,0,1,54,66.25L66.23,54.06a2.5,2.5,0,0,1,1.54-.64h3.61a2.45,2.45,0,0,1,1.54.64L85.18,66.25a2.49,2.49,0,0,1,.63,1.53v3.6A2.44,2.44,0,0,1,85.18,72.9Zm-9.8-3.38A2.59,2.59,0,0,0,74.73,68l-3.55-3.51a2.51,2.51,0,0,0-1.54-.64h-.13a2.46,2.46,0,0,0-1.53.64L64.43,68a2.51,2.51,0,0,0-.63,1.55v.13a2.41,2.41,0,0,0,.63,1.52L68,74.7a2.48,2.48,0,0,0,1.53.64h.13a2.51,2.51,0,0,0,1.54-.64l3.55-3.53a2.49,2.49,0,0,0,.65-1.52ZM19.93,33.08,49.44,50a8.73,8.73,0,0,0,13.07-7.49V8.64a8.69,8.69,0,0,0-17.37,0v19l-16.53-9.5a8.65,8.65,0,1,0-8.68,15ZM84.69,51.16a8.64,8.64,0,0,0,5-1.13l29.5-17a8.65,8.65,0,1,0-8.68-15L94,27.61v-19a8.69,8.69,0,0,0-17.37,0v33.9A8.66,8.66,0,0,0,84.69,51.16ZM54.48,88a8.58,8.58,0,0,0-5,1.13L19.93,106.06a8.66,8.66,0,1,0,8.68,15l16.53-9.49v19a8.69,8.69,0,0,0,17.37,0V96.61A8.65,8.65,0,0,0,54.48,88Zm-8-15.87a8.61,8.61,0,0,0-4-10L13,45.14A8.69,8.69,0,0,0,1.17,48.31,8.59,8.59,0,0,0,4.35,60.1l16.47,9.49L4.35,79A8.65,8.65,0,1,0,13,94l29.48-17A8.59,8.59,0,0,0,46.47,72.13Zm93.15-56.22H138.3v1.63h1.32c.61,0,1-.28,1-.8S140.26,15.91,139.62,15.91Zm-2.94-1.5h3c1.62,0,2.7.89,2.7,2.27a2.16,2.16,0,0,1-1.08,1.9l1.17,1.68v.34h-1.69L139.62,19H138.3V20.6h-1.62Zm8.3,3.22a5.48,5.48,0,0,0-5.58-5.83c-3.31,0-5.51,2.39-5.51,5.83,0,3.28,2.2,5.82,5.51,5.82A5.47,5.47,0,0,0,145,17.63Zm1.38,0c0,3.89-2.6,7.14-7,7.14s-6.89-3.28-6.89-7.14,2.57-7.14,6.89-7.14S146.36,13.73,146.36,17.63Z\">\r\n </path>\r\n</svg>";

/***/ },

/***/ "./style/icons/sort.svg"
/*!******************************!*\
  !*** ./style/icons/sort.svg ***!
  \******************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-sort-ascending-shapes\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M4 15l3 3l3 -3\" /><path d=\"M7 6v12\" /><path d=\"M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-4z\" /><path d=\"M17 14l-3.5 6h7z\" /></svg>";

/***/ },

/***/ "./style/icons/sql-server.svg"
/*!************************************!*\
  !*** ./style/icons/sql-server.svg ***!
  \************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\"  viewBox=\"0 0 48 48\" width=\"48px\" height=\"48px\"><path fill=\"#cfd8dc\" d=\"M23.084,11.277c-1.633-2.449-1.986-5.722-2.063-7.067c-4.148,0.897-8.269,2.506-8.031,3.691 c0.03,0.149,0.218,0.328,0.53,0.502l-0.488,0.873c-0.596-0.334-0.931-0.719-1.022-1.179c-0.269-1.341,1.25-2.554,4.642-3.709 c2.316-0.789,4.652-1.26,4.751-1.279l0.597-0.12L22,3.6c0,0.042,0.026,4.288,1.916,7.123L23.084,11.277z\"/><path fill=\"#cfd8dc\" d=\"M24.751,43H24.5c-8.192,0-17.309-2.573-18.386-6.879c-0.657-2.63,1.492-5.536,6.214-8.401 l0.52,0.854c-4.249,2.579-6.296,5.172-5.763,7.305c0.935,3.738,9.575,6.068,17.153,6.12c0.901-1.347,5.742-9.26,2.979-19.873 l0.967-0.252c3.149,12.092-3.218,20.837-3.282,20.924L24.751,43z\"/><path fill=\"#cfd8dc\" d=\"M9.931,39.306c-0.539,0-0.806-0.059-0.85-0.07c-0.176-0.043-0.314-0.178-0.362-0.352 c-0.049-0.174,0.001-0.361,0.129-0.488c0.072-0.072,7.197-7.208,8.159-12.978l0.986,0.164c-0.827,4.964-5.715,10.623-7.656,12.707 c1.939-0.111,6.835-1.019,16.234-6.28c-7.335-0.804-8.495-6.676-8.507-6.739l0.983-0.181c0.047,0.246,1.226,6.011,9.244,6.011 c0.003,0,0.005,0,0.008,0l0,0c0.227,0,0.424,0.152,0.482,0.37c0.06,0.218-0.036,0.449-0.231,0.563 C17.315,38.542,11.867,39.305,9.931,39.306z\"/><path fill=\"#cfd8dc\" d=\"M14.524,41.7c-0.207,0-0.395-0.128-0.468-0.325c-0.079-0.211-0.007-0.45,0.177-0.582 c0.034-0.025,1.813-1.338,3.706-4.228c-0.728-0.322-1.465-0.698-2.196-1.137c-0.888-0.533-1.559-1.105-2.06-1.691 c-2.57,0.678-4.942,0.946-7.025,0.769l0.084-0.996c1.876,0.159,4.009-0.063,6.321-0.64c-1.573-2.688-0.129-5.356-0.109-5.392 l0.874,0.487c-0.067,0.122-1.265,2.37,0.249,4.633c2.201-0.632,4.549-1.567,6.979-2.782c0.559-1.835,0.996-3.922,1.225-6.276 c0.016-0.161,0.108-0.304,0.248-0.385s0.311-0.088,0.458-0.021c0.032,0.015,3.264,1.491,5.604,2.454 c0.17,0.07,0.288,0.228,0.307,0.411c0.02,0.183-0.063,0.361-0.216,0.465c-2.289,1.56-4.563,2.913-6.778,4.042 c-0.702,2.225-1.571,4.077-2.459,5.591c3.702,1.383,6.915,1.404,6.956,1.404c0.228,0,0.427,0.154,0.484,0.375 c0.057,0.221-0.042,0.452-0.241,0.563c-4.54,2.522-11.767,3.232-12.072,3.261C14.556,41.699,14.54,41.7,14.524,41.7z M18.909,36.967c-1.04,1.614-2.062,2.773-2.826,3.53c1.998-0.294,5.501-0.938,8.408-2.139 C23.099,38.187,21.084,37.807,18.909,36.967z M14.767,33.431c0.393,0.392,0.883,0.775,1.49,1.14 c0.736,0.442,1.483,0.817,2.22,1.135c0.754-1.264,1.501-2.781,2.142-4.568C18.598,32.1,16.636,32.868,14.767,33.431z M23.202,24.329c-0.205,1.768-0.521,3.381-0.913,4.85c1.66-0.885,3.354-1.896,5.062-3.026 C25.802,25.497,24.099,24.734,23.202,24.329z\"/><path fill=\"#cfd8dc\" d=\"M17.924,10.6c-0.117,0-0.233-0.042-0.325-0.12c-1.61-1.378-3.505-4.182-3.585-4.301 c-0.129-0.191-0.109-0.446,0.046-0.616c0.154-0.171,0.408-0.211,0.608-0.102c0.011,0.003,0.938,0.385,7.217,1.431 c0.181,0.03,0.33,0.156,0.39,0.328c0.061,0.172,0.022,0.364-0.1,0.5c-1.758,1.953-3.979,2.813-4.073,2.848 C18.044,10.589,17.983,10.6,17.924,10.6z M15.647,6.746c0.631,0.849,1.54,1.996,2.372,2.769c0.511-0.233,1.657-0.818,2.744-1.798 C18.18,7.276,16.604,6.962,15.647,6.746z\"/><path fill=\"#b71c1c\" d=\"M21.843,24.4c-0.068,0-0.137-0.014-0.201-0.042c-0.199-0.088-0.319-0.294-0.296-0.51 c0.292-2.749-3.926-3.852-3.969-3.862c-0.174-0.044-0.312-0.179-0.359-0.352s0.002-0.359,0.129-0.486 c0.207-0.207,5.139-5.098,11.327-7.784c0.173-0.075,0.369-0.047,0.515,0.07c0.145,0.118,0.212,0.307,0.174,0.489 c-1.186,5.744-6.71,12.044-6.944,12.309C22.12,24.341,21.982,24.4,21.843,24.4z M18.455,19.285 c1.184,0.445,3.258,1.475,3.783,3.356c1.449-1.808,4.542-5.973,5.697-9.934C23.548,14.817,19.854,17.999,18.455,19.285z\"/><path fill=\"#b71c1c\" d=\"M13.079,28.36l-0.475-0.88c1.883-1.015,4.04-2.883,5.807-5.054c-1.504,1.03-2.365,1.735-2.392,1.758 l-0.639-0.77c0.039-0.032,1.764-1.447,4.631-3.22c0.787-1.266,1.392-2.568,1.703-3.816c0.053-0.212,0.099-0.417,0.136-0.615 c-1.925-0.687-3.701-1.094-4.921-1.269c-0.185-0.026-0.339-0.153-0.401-0.328c-0.062-0.175-0.021-0.371,0.104-0.507 c0.085-0.092,2.116-2.268,4.654-3.463c0.197-0.093,0.433-0.047,0.581,0.114c0.067,0.073,1.44,1.615,1.091,4.805 c1.155,0.45,2.345,0.997,3.491,1.648c2.759-1.24,5.892-2.356,9.229-3.03c0.172-0.034,0.363,0.028,0.481,0.168 c0.117,0.14,0.149,0.333,0.083,0.503c-1.3,3.332-4.786,6.891-4.934,7.041c-0.101,0.102-0.239,0.153-0.383,0.148 c-0.143-0.008-0.275-0.076-0.365-0.188c-1.12-1.408-2.584-2.574-4.163-3.523c-2.175,1.004-4.101,2.078-5.684,3.049 C18.693,24.084,15.644,26.979,13.079,28.36z M27.492,17.396c1.29,0.832,2.491,1.81,3.484,2.948 c0.828-0.898,2.815-3.168,3.942-5.422C32.268,15.532,29.76,16.415,27.492,17.396z M22.799,16.122 c-0.033,0.163-0.071,0.33-0.113,0.5c-0.21,0.839-0.544,1.701-0.972,2.561c1.096-0.626,2.309-1.272,3.618-1.898 C24.494,16.841,23.639,16.455,22.799,16.122z M18.048,13.672c1.111,0.218,2.48,0.574,3.941,1.086 c0.152-1.843-0.346-2.972-0.647-3.472C19.966,12.004,18.761,13.014,18.048,13.672z\"/><path fill=\"#b71c1c\" d=\"M18.05,18.5c0,4.38-3.65,7.86-6.28,10.4c-0.44,0.43-1.93,0.5-1.93,0.5 c0.37-0.38,0.79-0.78,1.24-1.21c2.5-2.42,5.97-5.73,5.97-9.69c0-4.69-1.89-6.54-3.38-8.02c-0.66-0.67-1.22-1.31-1.56-2.09 l0.31-0.13c0.34,0.15,0.73,0.32,1.03,0.45c0.24,0.35,0.56,0.69,0.93,1.06C15.91,11.3,18.05,13.4,18.05,18.5z\"/><path fill=\"#b71c1c\" d=\"M42.935,19.794c0,0-0.605,0.086-0.775,0.106c-8.76,0.97-17.8,3.49-22.97,5.56 c-1.87,0.75-3.81,1.66-5.58,2.68c-0.01,0.01-0.02,0.01-0.04,0.02C12.53,28.76,10,30,7.95,31.09c3-3.19,8.62-5.65,10.86-6.55 c5.07-2.03,13.78-4.48,22.35-5.53c-1.01-1.18-3.48-3.68-8.34-5.54c-2.84-1.1-7.16-1.72-10.97-2.27c-6.06-0.87-9.51-1.45-9.84-3.1 c-0.07-0.33-0.02-0.66,0.13-0.98c0.33,0.54,0.8,0.92,1.11,1.14c0.15,0.1,0.26,0.16,0.3,0.18l0.01,0.01 c1.42,0.75,5.25,1.3,8.44,1.76c3.86,0.56,8.23,1.19,11.18,2.32c6.87,2.65,9.24,6.44,9.34,6.6 C42.61,19.28,42.935,19.794,42.935,19.794z\"/></svg>";

/***/ },

/***/ "./style/icons/square-key.svg"
/*!************************************!*\
  !*** ./style/icons/square-key.svg ***!
  \************************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-square-key\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M14 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /><path d=\"M12.5 11.5l-4 4l1.5 1.5\" /><path d=\"M12 15l-1.5 -1.5\" /><path d=\"M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z\" /></svg>";

/***/ },

/***/ "./style/icons/trino.svg"
/*!*******************************!*\
  !*** ./style/icons/trino.svg ***!
  \*******************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<svg\r\n   viewBox=\"-1 0 63.191998 63.192003\"\r\n   version=\"1.1\"\r\n   id=\"svg22\"\r\n   sodipodi:docname=\"trino.svg\"\r\n   width=\"63.192001\"\r\n   height=\"63.192001\"\r\n   inkscape:version=\"1.3 (0e150ed, 2023-07-21)\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\">\r\n  <sodipodi:namedview\r\n     id=\"namedview22\"\r\n     pagecolor=\"#505050\"\r\n     bordercolor=\"#eeeeee\"\r\n     borderopacity=\"1\"\r\n     inkscape:showpageshadow=\"0\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pagecheckerboard=\"0\"\r\n     inkscape:deskcolor=\"#505050\"\r\n     inkscape:zoom=\"2.5482452\"\r\n     inkscape:cx=\"66.90879\"\r\n     inkscape:cy=\"31.590367\"\r\n     inkscape:window-width=\"2560\"\r\n     inkscape:window-height=\"1412\"\r\n     inkscape:window-x=\"1512\"\r\n     inkscape:window-y=\"149\"\r\n     inkscape:window-maximized=\"1\"\r\n     inkscape:current-layer=\"Layer_3\" />\r\n  <defs\r\n     id=\"defs1\">\r\n    <style\r\n       id=\"style1\">.cls-1{fill:#cdcccc;}.cls-2{fill:#fff;}.cls-3{fill:#dd00a1;}.cls-4{fill:#f9d8d2;}.cls-5{fill:#10110e;}.cls-6{fill:#e5e5e5;}.cls-7{fill:#8accce;opacity:0.2;}.cls-8{fill:#515151;}</style>\r\n  </defs>\r\n  <g\r\n     id=\"Layer_2\"\r\n     data-name=\"Layer 2\"\r\n     transform=\"translate(0,0.0015663)\">\r\n    <g\r\n       id=\"Layer_3\"\r\n       data-name=\"Layer 3\">\r\n      <g\r\n         id=\"g22\"\r\n         transform=\"translate(9.150631,2.1751926e-4)\">\r\n        <path\r\n           class=\"cls-1\"\r\n           d=\"m 39.09,30.67 a 3,3 0 0 0 -6,0 2.76,2.76 0 0 0 1.91,2.55 v 4.57 a 15.27,15.27 0 0 0 -6.91,-7.85 c 0.46,-1 0.93,-1.86 1.38,-2.65 a 65.83,65.83 0 0 1 5.67,-7.24 c 1.13,-1.34 2.2,-2.6 3.07,-3.7 2.44,-3.06 5.12,-7.58 4.62,-10.26 A 2.56,2.56 0 0 0 41.58,4.28 c -3.39,-2 -8,4.5 -12.53,10.77 -3,4.14 -4.55,10 -5.26,13.29 a 19.86,19.86 0 0 0 -4.23,-0.46 18.63,18.63 0 0 0 -6.08,1 85.14,85.14 0 0 1 0.33,-11 c 1,-9.51 0.56,-15.09 -1.29,-17 A 2.43,2.43 0 0 0 10.56,0 C 5.1,0.27 5.72,16.58 5.81,18.44 c 0.22,4.46 2,9.88 3.08,12.88 A 15.44,15.44 0 0 0 3.64,39.13 H 3.25 a 3.11,3.11 0 0 0 -3.25,3 v 5.17 a 3.12,3.12 0 0 0 3.25,3 h 0.66 a 13.34,13.34 0 0 0 3.29,4.63 l -1,0.88 a 1.17,1.17 0 0 0 -0.13,1.64 c 3,3.65 7.91,5.74 13.42,5.74 5.51,0 10.44,-2.09 13.42,-5.74 a 1.17,1.17 0 0 0 -0.13,-1.64 l -1,-0.88 a 13.56,13.56 0 0 0 3.29,-4.71 h 0.75 a 3.12,3.12 0 0 0 3.25,-3 v -5.13 a 2.94,2.94 0 0 0 -1.91,-2.68 v -6.19 a 2.75,2.75 0 0 0 1.93,-2.55 z\"\r\n           id=\"path1\" />\r\n        <path\r\n           class=\"cls-2\"\r\n           d=\"m 14.62,55.74 c 0.92,-0.61 -1.5,-0.38 -1.7,-0.79 A 16.49,16.49 0 0 1 10.06,54.44 C 8.36,53.99 4.28,51.25 3.84,48.62 3.4,45.99 3.84,41 5.68,38 a 17.21,17.21 0 0 1 4.38,-4.7 c 0,0 -3.57,-8.49 -3.87,-14.9 -0.3,-6.41 0.2,-17.82 4.38,-18.02 4.18,-0.2 3.57,10.48 2.86,17.43 a 90.59,90.59 0 0 0 -0.2,13.88 19.73,19.73 0 0 1 5.5,-0.92 21.12,21.12 0 0 1 4.9,0.46 c 0,0 1.33,-9.84 5.71,-16 4.38,-6.16 9,-12.45 12,-10.66 3,1.79 -0.82,8.18 -3.47,11.51 -2.65,3.33 -7.24,8.33 -8.77,11 a 46.59,46.59 0 0 0 -2.65,5.51 14.93,14.93 0 0 1 6.39,6.32 C 35,43.22 35.16,48.52 34,50.77 a 8.08,8.08 0 0 1 -5.61,4 c -1.33,0.06 -6.92,1.45 -6.92,1.45 z\"\r\n           id=\"path2\" />\r\n        <path\r\n           class=\"cls-3\"\r\n           d=\"m 24.41,31.32 c 0,0 3.34,-8.71 6.33,-13.6 2.99,-4.89 7,-8.59 8.26,-7.84 1.26,0.75 -2.57,5.32 -5.93,9.81 a 113.44,113.44 0 0 0 -7.43,12.38 z\"\r\n           id=\"path3\" />\r\n        <path\r\n           class=\"cls-3\"\r\n           d=\"m 11,32.81 1,-0.74 c 0,0 -0.14,-8.71 0,-14 0.14,-5.29 0.41,-11.9 -1.36,-11.84 -1.77,0.06 -3,5.17 -2.31,12.38 A 87.47,87.47 0 0 0 11,32.81 Z\"\r\n           id=\"path4\" />\r\n        <circle\r\n           class=\"cls-4\"\r\n           cx=\"8.0200005\"\r\n           cy=\"49.540001\"\r\n           r=\"1.9400001\"\r\n           id=\"circle4\" />\r\n        <circle\r\n           class=\"cls-4\"\r\n           cx=\"30.950001\"\r\n           cy=\"49.540001\"\r\n           r=\"1.9400001\"\r\n           id=\"circle5\" />\r\n        <path\r\n           class=\"cls-5\"\r\n           d=\"m 22.7,49.38 a 0.18,0.18 0 0 0 -0.25,0.07 c 0,0 -0.58,1 -1.42,1.06 a 2.09,2.09 0 0 1 -1.5,-0.7 v -1.48 c 0.54,-0.3 1.41,-1.2 1.41,-1.51 a 1.41,1.41 0 0 0 -1.49,-1.09 c -1,0 -1.7,0.65 -1.7,1.19 0,0.54 1.1,1.24 1.41,1.44 v 1.46 a 1.82,1.82 0 0 1 -1.31,0.69 c -0.79,0 -1.39,-1.08 -1.4,-1.09 A 0.19,0.19 0 0 0 16.2,49.34 0.2,0.2 0 0 0 16.12,49.6 c 0,0 0.71,1.29 1.73,1.29 a 2.12,2.12 0 0 0 1.51,-0.73 2.37,2.37 0 0 0 1.58,0.73 h 0.12 a 2.49,2.49 0 0 0 1.71,-1.26 0.18,0.18 0 0 0 -0.07,-0.25 z\"\r\n           id=\"path5\" />\r\n        <path\r\n           class=\"cls-6\"\r\n           d=\"m 10.06,33.32 c 0,0 -2.77,-7 -3.3,-10.66 C 6.23,19 5.76,12.89 6.46,8.82 A 50,50 0 0 1 7.68,3.26 c 0,0 -1.29,9.49 -0.81,13.64 0.48,4.15 3.19,16.42 3.19,16.42 z\"\r\n           id=\"path6\" />\r\n        <path\r\n           class=\"cls-6\"\r\n           d=\"m 23.63,31.23 c 0,0 2,-10.59 4.91,-14.75 C 31.45,12.32 35.06,7.27 36.89,6 l 1.83,-1.28 c 0,0 -7.34,7.7 -10.18,14 -2.84,6.3 -4.91,12.51 -4.91,12.51 z\"\r\n           id=\"path7\" />\r\n        <path\r\n           class=\"cls-5\"\r\n           d=\"M 12,43.23 A 1.52,1.52 0 1 0 13.51,44.75 1.52,1.52 0 0 0 12,43.23 Z m 0.43,1.41 a 0.41,0.41 0 0 1 -0.41,-0.41 0.41,0.41 0 0 1 0.82,0 0.41,0.41 0 0 1 -0.43,0.41 z\"\r\n           id=\"path8\" />\r\n        <path\r\n           class=\"cls-5\"\r\n           d=\"m 26.92,43.23 a 1.52,1.52 0 1 0 1.52,1.52 1.52,1.52 0 0 0 -1.52,-1.52 z m 0.43,1.41 a 0.42,0.42 0 0 1 -0.41,-0.41 0.42,0.42 0 0 1 0.83,0 0.42,0.42 0 0 1 -0.42,0.41 z\"\r\n           id=\"path9\" />\r\n        <ellipse\r\n           class=\"cls-7\"\r\n           cx=\"19.73\"\r\n           cy=\"45.32\"\r\n           rx=\"14.1\"\r\n           ry=\"10.16\"\r\n           id=\"ellipse9\" />\r\n        <path\r\n           class=\"cls-2\"\r\n           d=\"M 36.8,39.67 V 33 a 2.45,2.45 0 0 0 1.92,-2.28 2.65,2.65 0 0 0 -5.27,0 2.44,2.44 0 0 0 1.91,2.28 v 6.5 H 35.17 C 33.17,32.56 27.26,28.25 19.55,28.25 11.84,28.25 5.89,32.52 3.92,39.5 H 3.25 a 2.75,2.75 0 0 0 -2.88,2.59 v 5.17 a 2.75,2.75 0 0 0 2.88,2.58 h 0.91 a 13.11,13.11 0 0 0 3.6,5.09 l -1.3,1.16 a 0.79,0.79 0 0 0 -0.09,1.12 c 2.92,3.53 7.71,5.6 13.13,5.6 5.42,0 10.21,-2 13.13,-5.6 a 0.79,0.79 0 0 0 -0.09,-1.12 l -1.3,-1.16 a 13.34,13.34 0 0 0 3.6,-5.09 h 1 a 2.75,2.75 0 0 0 2.88,-2.58 V 42.09 A 2.62,2.62 0 0 0 36.8,39.67 Z M 19.55,35.62 c 7.14,0 12.94,4.7 12.94,10.47 0,6.25 -6.52,9 -12.94,9 -6.42,0 -12.94,-2.8 -12.94,-9 0,-5.77 5.8,-10.47 12.94,-10.47 z\"\r\n           id=\"path10\" />\r\n        <path\r\n           class=\"cls-8\"\r\n           d=\"m 37.28,45.53 h -1.92 c 0,-0.3 0,-0.6 0,-0.94 a 19.35,19.35 0 0 0 -0.38,-3.8 h 0.81 a 1.35,1.35 0 0 1 1.44,1.3 z\"\r\n           id=\"path11\" />\r\n        <path\r\n           class=\"cls-8\"\r\n           d=\"m 35.84,48.55 h -1 a 16.69,16.69 0 0 0 0.43,-2.15 h 2 v 0.86 a 1.34,1.34 0 0 1 -1.43,1.29 z\"\r\n           id=\"path12\" />\r\n        <path\r\n           class=\"cls-8\"\r\n           d=\"m 19.55,61.48 c -4.8,0 -9.06,-1.73 -11.75,-4.79 l 1.35,-1.2 a 17.86,17.86 0 0 0 10.4,3 17.89,17.89 0 0 0 10.4,-3 l 1.34,1.2 c -2.68,3.06 -6.95,4.79 -11.74,4.79 z\"\r\n           id=\"path13\" />\r\n        <path\r\n           class=\"cls-8\"\r\n           d=\"m 3.25,40.79 h 0.86 a 19.66,19.66 0 0 0 -0.38,3.8 6.18,6.18 0 0 0 0,0.94 H 1.86 v -3.44 a 1.28,1.28 0 0 1 1.39,-1.3 z\"\r\n           id=\"path14\" />\r\n        <path\r\n           d=\"m 19.55,34.76 a 17.4,17.4 0 0 0 -4.8,0.69 v -5.21 a 17.14,17.14 0 0 1 4.8,-0.65 17.12,17.12 0 0 1 4.79,0.65 v 5.25 a 16,16 0 0 0 -4.79,-0.73 z\"\r\n           id=\"path15\" />\r\n        <path\r\n           class=\"cls-8\"\r\n           d=\"M 13.8,30.54 V 35.8 C 9,37.56 5.65,41.53 5.65,46.09 5.65,52 11.26,56 19.55,56 c 8.29,0 13.9,-4 13.9,-9.91 0,-4.56 -3.36,-8.53 -8.15,-10.29 v -5.26 c 5.61,2 9.11,7.19 9.11,14.09 0,7.76 -5.95,13 -14.86,13 -8.91,0 -14.86,-5.21 -14.86,-13 0,-6.9 3.5,-12.07 9.11,-14.09 z\"\r\n           id=\"path16\" />\r\n        <path\r\n           class=\"cls-8\"\r\n           d=\"m 1.81,46.4 h 2 a 15.15,15.15 0 0 0 0.43,2.15 h -1 A 1.35,1.35 0 0 1 1.8,47.26 Z\"\r\n           id=\"path17\" />\r\n        <ellipse\r\n           class=\"cls-8\"\r\n           cx=\"36.080002\"\r\n           cy=\"30.67\"\r\n           rx=\"1.2\"\r\n           ry=\"1.08\"\r\n           id=\"ellipse17\" />\r\n      </g>\r\n    </g>\r\n  </g>\r\n</svg>\r\n";

/***/ },

/***/ "./style/icons/typescript.svg"
/*!************************************!*\
  !*** ./style/icons/typescript.svg ***!
  \************************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-brand-typescript\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M15 17.5c.32 .32 .754 .5 1.207 .5h.543c.69 0 1.25 -.56 1.25 -1.25v-.25a1.5 1.5 0 0 0 -1.5 -1.5a1.5 1.5 0 0 1 -1.5 -1.5v-.25c0 -.69 .56 -1.25 1.25 -1.25h.543c.453 0 .887 .18 1.207 .5\" /><path d=\"M9 12h4\" /><path d=\"M11 12v6\" /><path d=\"M21 19v-14a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2z\" /></svg>";

/***/ },

/***/ "./style/icons/unlock-16.svg"
/*!***********************************!*\
  !*** ./style/icons/unlock-16.svg ***!
  \***********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M10.239 2.25A2.46 2.46 0 0112 1.5c.657 0 1.29.267 1.761.75.471.483.739 1.142.739 1.833a.75.75 0 001.5 0 4.127 4.127 0 00-1.165-2.88A3.96 3.96 0 0012 0a3.96 3.96 0 00-2.835 1.203A4.127 4.127 0 008 4.083V5H2.25A2.25 2.25 0 000 7.25v5.5A2.25 2.25 0 002.25 15h7.5A2.25 2.25 0 0012 12.75v-5.5A2.25 2.25 0 009.75 5H9.5v-.917c0-.69.268-1.35.739-1.833zm-8.739 5a.75.75 0 01.75-.75h7.5a.75.75 0 01.75.75v5.5a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75v-5.5z\" clip-rule=\"evenodd\"/></svg>";

/***/ },

/***/ "./style/icons/variable.svg"
/*!**********************************!*\
  !*** ./style/icons/variable.svg ***!
  \**********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-variable\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M5 4c-2.5 5 -2.5 10 0 16m14 -16c2.5 5 2.5 10 0 16m-10 -11h1c1 0 1 1 2.016 3.527c.984 2.473 .984 3.473 1.984 3.473h1\" /><path d=\"M8 16c1.5 0 3 -2 4 -3.5s2.5 -3.5 4 -3.5\" /></svg>";

/***/ },

/***/ "./style/icons/wash.svg"
/*!******************************!*\
  !*** ./style/icons/wash.svg ***!
  \******************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-hand-sanitizer\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M7 21h10v-10a3 3 0 0 0 -3 -3h-4a3 3 0 0 0 -3 3v10z\" /><path d=\"M15 3h-6a2 2 0 0 0 -2 2\" /><path d=\"M12 3v5\" /><path d=\"M12 11v4\" /><path d=\"M10 13h4\" /></svg>";

/***/ },

/***/ "./style/icons/x-16.svg"
/*!******************************!*\
  !*** ./style/icons/x-16.svg ***!
  \******************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" d=\"M12.78 4.28a.75.75 0 00-1.06-1.06L8 6.94 4.28 3.22a.75.75 0 00-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 101.06 1.06L8 9.06l3.72 3.72a.75.75 0 101.06-1.06L9.06 8l3.72-3.72z\"/></svg>";

/***/ }

}]);
//# sourceMappingURL=lib_index_js.878f083437ad1c2726ef.js.map