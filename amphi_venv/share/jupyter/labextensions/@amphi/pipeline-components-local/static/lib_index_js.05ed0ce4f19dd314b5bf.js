"use strict";
(self["webpackChunk_amphi_pipeline_components_local"] = self["webpackChunk_amphi_pipeline_components_local"] || []).push([["lib_index_js"],{

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
            const nodeId = id;
            const internals = { nodeInternals, edges, nodeId, componentService };
            const handleElement = react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.renderHandle, {
                type: this._type,
                Handle: reactflow__WEBPACK_IMPORTED_MODULE_2__.Handle,
                Position: reactflow__WEBPACK_IMPORTED_MODULE_2__.Position,
                internals: internals
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
                commands.execute('pipeline-editor:run-incremental-pipeline-until', { nodeId: nodeId, context: context }).then(result => {
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
                ;
            };
            const [modalOpen, setModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
            let enableExecution = settings.get('enableExecution').composite;
            return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null,
                (0,_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.renderComponentUI)({
                    id: id,
                    data: data,
                    context: context,
                    manager: manager,
                    commands: commands,
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
                    showContent: showContent,
                    handle: handleElement,
                    deleteNode: deleteNode,
                    setViewport: setViewport,
                    handleChange,
                    isSelected
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

/***/ "./lib/components/inputs/system/SystemInformation.js"
/*!***********************************************************!*\
  !*** ./lib/components/inputs/system/SystemInformation.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SystemInformation: () => (/* binding */ SystemInformation)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../icons */ "./lib/icons.js");
/* harmony import */ var _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../BaseCoreComponent */ "./lib/components/BaseCoreComponent.js");
// Import necessary icons and the base component


// Main component definition
class SystemInformation extends _BaseCoreComponent__WEBPACK_IMPORTED_MODULE_1__.BaseCoreComponent {
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
                    id: "instructions",
                    text: "Available fields may depend on the Operating System",
                    advanced: false, // No expandable options
                },
            ],
        };
        // Tooltip description for the component in the menu
        // const description = "Information about your system";
        const description = "关于您系统的信息";
        // Call the parent class constructor with component details
        super(
        // "System Information", // Display name
        "系统信息", // Display name
        "system_informations", // Component ID
        description, // Description
        "pandas_df_input", // Component type
        [], // File drop (unused)
        "输入", // Category
        _icons__WEBPACK_IMPORTED_MODULE_0__.systemInformationIcon, // Component icon
        defaultConfig, // Default configuration
        form);
    }
    // List of additional Python package imports required for this component
    provideImports({ config }) {
        return [
            "import os",
            "import pandas as pd",
            "import platform",
            "import socket",
            "import psutil",
            "import datetime",
            "import sys",
            "import subprocess",
        ];
    }
    // Define the Python function to fetch system information
    provideFunctions({ config }) {
        var _a, _b;
        const prefix = (_b = (_a = config === null || config === void 0 ? void 0 : config.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
        const SystemInformationFunction = `
def get_gpu_info():
    """Retrieve GPU information based on the operating system."""
    try:
        if platform.system() == "Windows":
            output = subprocess.check_output("wmic path win32_VideoController get Name", shell=True).decode()
            gpus = [line.strip() for line in output.split('\\n') if line.strip() and "Name" not in line]
            return ', '.join(gpus) if gpus else "N/A"

        elif platform.system() == "Darwin":  # macOS
            output = subprocess.check_output("system_profiler SPDisplaysDataType | grep Chip", shell=True).decode()
            gpus = [line.split(":")[-1].strip() for line in output.split('\\n') if "Chip" in line]
            return ', '.join(gpus) if gpus else "N/A"

        elif platform.system() == "Linux":
            output = subprocess.check_output("lspci | grep VGA", shell=True).decode()
            gpus = [line.split(':')[-1].strip() for line in output.split('\\n') if line.strip()]
            return ', '.join(gpus) if gpus else "N/A"

    except Exception:
        return "N/A"

    return "N/A"

def system_informations():
    """Gather system information including OS, hardware, and network details."""

    # Operating System details
    os_name = platform.system()
    os_version = platform.version()
    os_release = platform.release()

    # User Account information
    user_account = os.getlogin() if hasattr(os, 'getlogin') else 'N/A'

    # Machine and Network details
    machine_name = socket.gethostname()
    domain = socket.getfqdn()

    # RAM details (in GB)
    total_ram = round(psutil.virtual_memory().total / (1024 ** 3), 2)
    free_ram = round(psutil.virtual_memory().available / (1024 ** 3), 2)

    # CPU details
    cpu_name = platform.processor() or "N/A"
    cpu_count = psutil.cpu_count(logical=True)

    # GPU details
    gpu_info = get_gpu_info()

    # UTC Offset
    utc_offset = datetime.datetime.now(datetime.timezone.utc).astimezone().utcoffset()

    # Current working directory
    current_directory = os.getcwd()

    # Convert information into a Pandas DataFrame
    result = ${prefix}.DataFrame([{
        "Operating System": f"{os_name} {os_release} (Version: {os_version})",
        "User Account": user_account,
        "Machine Name": machine_name,
        "Domain": domain,
        "Total RAM (GB)": total_ram,
        "Free RAM (GB)": free_ram,
        "CPU Name": cpu_name,
        "CPU Cores": cpu_count,
        "GPU": gpu_info,
        "UTC Offset": str(utc_offset),
        "Current Directory": current_directory
    }])

    # Convert string-based columns to a proper type
    cols_to_convert = [
        "Operating System", "User Account", "Machine Name",
        "Domain", "GPU", "UTC Offset", "Current Directory"
    ]
    result[cols_to_convert] = result[cols_to_convert].astype("string")

    return result
    `;
        return [SystemInformationFunction];
    }
    // Generate the Python execution script
    generateComponentCode({ config, outputName, }) {
        console.log("Generated outputName:", outputName); // Debugging output
        return `
# Execute the system information retrieval function
${outputName} = []
${outputName} = system_informations()
    `;
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
/* harmony export */   aiIcon: () => (/* binding */ aiIcon),
/* harmony export */   apiIcon: () => (/* binding */ apiIcon),
/* harmony export */   changeCircleIcon: () => (/* binding */ changeCircleIcon),
/* harmony export */   chromaIcon: () => (/* binding */ chromaIcon),
/* harmony export */   engineIcon: () => (/* binding */ engineIcon),
/* harmony export */   htmlLineIcon: () => (/* binding */ htmlLineIcon),
/* harmony export */   markdownIcon: () => (/* binding */ markdownIcon),
/* harmony export */   ollamaIcon: () => (/* binding */ ollamaIcon),
/* harmony export */   openAiIcon: () => (/* binding */ openAiIcon),
/* harmony export */   pineconeIcon: () => (/* binding */ pineconeIcon),
/* harmony export */   playCircleIcon: () => (/* binding */ playCircleIcon),
/* harmony export */   redditIcon: () => (/* binding */ redditIcon),
/* harmony export */   settingsIcon: () => (/* binding */ settingsIcon),
/* harmony export */   sortIcon: () => (/* binding */ sortIcon),
/* harmony export */   splitIcon: () => (/* binding */ splitIcon),
/* harmony export */   sqlIcon: () => (/* binding */ sqlIcon),
/* harmony export */   systemInformationIcon: () => (/* binding */ systemInformationIcon),
/* harmony export */   trinoIcon: () => (/* binding */ trinoIcon)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_icons_reddit_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/icons/reddit.svg */ "./style/icons/reddit.svg");
/* harmony import */ var _style_icons_trino_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/icons/trino.svg */ "./style/icons/trino.svg");
/* harmony import */ var _style_icons_chroma_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/icons/chroma.svg */ "./style/icons/chroma.svg");
/* harmony import */ var _style_icons_ollama_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/icons/ollama.svg */ "./style/icons/ollama.svg");
/* harmony import */ var _style_icons_pinecone_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/icons/pinecone.svg */ "./style/icons/pinecone.svg");
/* harmony import */ var _style_icons_change_circle_24_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style/icons/change-circle-24.svg */ "./style/icons/change-circle-24.svg");
/* harmony import */ var _style_icons_sort_desc_24_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/icons/sort-desc-24.svg */ "./style/icons/sort-desc-24.svg");
/* harmony import */ var _style_icons_markdown_fill_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../style/icons/markdown-fill.svg */ "./style/icons/markdown-fill.svg");
/* harmony import */ var _style_icons_openai_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../style/icons/openai.svg */ "./style/icons/openai.svg");
/* harmony import */ var _style_icons_html_line_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../style/icons/html-line.svg */ "./style/icons/html-line.svg");
/* harmony import */ var _style_icons_api_24_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../style/icons/api-24.svg */ "./style/icons/api-24.svg");
/* harmony import */ var _style_icons_scissors_24_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../style/icons/scissors-24.svg */ "./style/icons/scissors-24.svg");
/* harmony import */ var _style_icons_sql_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../style/icons/sql.svg */ "./style/icons/sql.svg");
/* harmony import */ var _style_icons_service_16_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../style/icons/service-16.svg */ "./style/icons/service-16.svg");
/* harmony import */ var _style_icons_settings_16_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../style/icons/settings-16.svg */ "./style/icons/settings-16.svg");
/* harmony import */ var _style_icons_play_circle_16_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../style/icons/play-circle-16.svg */ "./style/icons/play-circle-16.svg");
/* harmony import */ var _style_icons_system_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../style/icons/system.svg */ "./style/icons/system.svg");
/* harmony import */ var _style_icons_brain_svg__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../style/icons/brain.svg */ "./style/icons/brain.svg");



















const aiIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:ai-icon',
    svgstr: _style_icons_brain_svg__WEBPACK_IMPORTED_MODULE_18__
});
const apiIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:api-icon',
    svgstr: _style_icons_api_24_svg__WEBPACK_IMPORTED_MODULE_11__
});
const sortIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:sortIcon',
    svgstr: _style_icons_sort_desc_24_svg__WEBPACK_IMPORTED_MODULE_7__
});
const splitIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:splitIcon',
    svgstr: _style_icons_scissors_24_svg__WEBPACK_IMPORTED_MODULE_12__
});
const sqlIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:sql-icon',
    svgstr: _style_icons_sql_svg__WEBPACK_IMPORTED_MODULE_13__
});
const redditIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:redditIcon',
    svgstr: _style_icons_reddit_svg__WEBPACK_IMPORTED_MODULE_1__
});
const openAiIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:openAiIcon',
    svgstr: _style_icons_openai_svg__WEBPACK_IMPORTED_MODULE_9__
});
const settingsIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:settings-config-icon',
    svgstr: _style_icons_settings_16_svg__WEBPACK_IMPORTED_MODULE_15__
});
const pineconeIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:pinecone-icon',
    svgstr: _style_icons_pinecone_svg__WEBPACK_IMPORTED_MODULE_5__
});
const changeCircleIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:changeCircle-icon',
    svgstr: _style_icons_change_circle_24_svg__WEBPACK_IMPORTED_MODULE_6__
});
const markdownIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:markdown-icon',
    svgstr: _style_icons_markdown_fill_svg__WEBPACK_IMPORTED_MODULE_8__
});
const htmlLineIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:htmlLine-icon',
    svgstr: _style_icons_html_line_svg__WEBPACK_IMPORTED_MODULE_10__
});
const chromaIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:chroma-icon',
    svgstr: _style_icons_chroma_svg__WEBPACK_IMPORTED_MODULE_3__
});
const playCircleIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:play-circle-icon',
    svgstr: _style_icons_play_circle_16_svg__WEBPACK_IMPORTED_MODULE_16__
});
const trinoIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:trino-icon',
    svgstr: _style_icons_trino_svg__WEBPACK_IMPORTED_MODULE_2__
});
const engineIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:engine-icon',
    svgstr: _style_icons_service_16_svg__WEBPACK_IMPORTED_MODULE_14__
});
const ollamaIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:ollama-icon',
    svgstr: _style_icons_ollama_svg__WEBPACK_IMPORTED_MODULE_4__
});
const systemInformationIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:system-information-icon',
    svgstr: _style_icons_system_svg__WEBPACK_IMPORTED_MODULE_17__
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
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @amphi/pipeline-components-manager */ "webpack/sharing/consume/default/@amphi/pipeline-components-manager");
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ "./lib/components/inputs/system/SystemInformation.js");


const plugin = {
    id: "@amphi/pipeline-components-local",
    description: "Adds a step counter/button (1 of 3 related examples). This extension holds the UI/interface",
    autoStart: true,
    requires: [_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_0__.ComponentManager],
    activate: (app, componentService) => {
        console.log("JupyterLab extension pipeline-components-local is activated!");
        // Processors
        // componentService.addComponent(SQLQuery.getInstance());
        // componentService.addComponent(AIPrompts.getInstance());
        // componentService.addComponent(OpenAILookUp.getInstance());
        // componentService.addComponent(OllamaLookUp.getInstance());
        // System
        componentService.addComponent(_components__WEBPACK_IMPORTED_MODULE_1__.SystemInformation.getInstance());
    },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);


/***/ },

/***/ "./style/icons/api-24.svg"
/*!********************************!*\
  !*** ./style/icons/api-24.svg ***!
  \********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M2 5a3 3 0 115.585 1.524l1.79 1.79.68-.68a2.75 2.75 0 013.89 0l.68.68 1.79-1.79a3 3 0 111.06 1.06l-1.79 1.791.681.68a2.75 2.75 0 010 3.89l-.68.68 1.79 1.79a3 3 0 11-1.06 1.06l-1.791-1.79-.68.681a2.75 2.75 0 01-3.89 0l-.68-.68-1.79 1.79a3 3 0 11-1.06-1.06l1.79-1.791-.681-.68a2.75 2.75 0 010-3.89l.68-.68-1.79-1.79A3 3 0 012 5zm3-1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0 14a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM17.5 19a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM19 3.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-7.884 5.195a1.25 1.25 0 011.768 0l2.421 2.421a1.25 1.25 0 010 1.768l-2.421 2.421a1.25 1.25 0 01-1.768 0l-2.421-2.421a1.25 1.25 0 010-1.768l2.421-2.421z\" clip-rule=\"evenodd\"/></svg>";

/***/ },

/***/ "./style/icons/brain.svg"
/*!*******************************!*\
  !*** ./style/icons/brain.svg ***!
  \*******************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-brain\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8\" /><path d=\"M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8\" /><path d=\"M17.5 16a3.5 3.5 0 0 0 0 -7h-.5\" /><path d=\"M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0\" /><path d=\"M6.5 16a3.5 3.5 0 0 1 0 -7h.5\" /><path d=\"M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10\" /></svg>";

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

/***/ "./style/icons/html-line.svg"
/*!***********************************!*\
  !*** ./style/icons/html-line.svg ***!
  \***********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 18.1778L7.38083 16.9222L7.0517 13.3778H9.32156L9.48045 15.2222L12 15.8889L14.5195 15.2222L14.7806 12.3556H6.96091L6.32535 5.67778H17.6747L17.4477 7.88889H8.82219L9.02648 10.1444H17.2434L16.6192 16.9222L12 18.1778ZM3 2H21L19.377 20L12 22L4.62295 20L3 2ZM5.18844 4L6.48986 18.4339L12 19.9278L17.5101 18.4339L18.8116 4H5.18844Z\"></path></svg>";

/***/ },

/***/ "./style/icons/markdown-fill.svg"
/*!***************************************!*\
  !*** ./style/icons/markdown-fill.svg ***!
  \***************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM7 15.5V11.5L9 13.5L11 11.5V15.5H13V8.5H11L9 10.5L7 8.5H5V15.5H7ZM18 12.5V8.5H16V12.5H14L17 15.5L20 12.5H18Z\"></path></svg>";

/***/ },

/***/ "./style/icons/ollama.svg"
/*!********************************!*\
  !*** ./style/icons/ollama.svg ***!
  \********************************/
(module) {

module.exports = "<svg width=\"646\" height=\"854\" viewBox=\"0 0 646 854\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n<path d=\"M140.629 0.239929C132.66 1.52725 123.097 5.69568 116.354 10.845C95.941 26.3541 80.1253 59.2728 73.4435 100.283C70.9302 115.792 69.2138 137.309 69.2138 153.738C69.2138 173.109 71.4819 197.874 74.7309 214.977C75.4665 218.778 75.8343 222.15 75.5278 222.395C75.2826 222.64 72.2788 225.092 68.9072 227.789C57.3827 236.984 44.2029 251.145 35.1304 264.08C17.7209 288.784 6.44151 316.86 1.72133 347.265C-0.117698 359.28 -0.608106 383.555 0.863118 395.57C4.11207 423.278 12.449 446.695 26.7321 468.151L31.391 475.078L30.0424 477.346C20.4794 493.407 12.3264 516.64 8.52575 538.953C5.522 556.608 5.15419 561.328 5.15419 584.99C5.15419 608.837 5.4607 613.557 8.28054 630.047C11.6521 649.786 18.5178 670.689 26.1804 684.605C28.6938 689.141 34.8239 698.581 35.5595 699.072C35.8047 699.194 35.0691 701.462 33.9044 704.098C25.077 723.408 17.537 749.093 14.4106 770.733C12.2038 785.567 11.8973 790.349 11.8973 805.981C11.8973 825.903 13.0007 835.589 17.1692 851.466L17.7822 853.795H44.019H70.3172L68.6007 850.546C57.9957 830.93 57.0149 794.517 66.1487 758.166C70.3172 741.369 75.0374 729.048 83.8647 712.067L89.1366 701.769V695.455C89.1366 689.57 89.014 688.896 87.1137 685.034C85.6424 682.091 83.6808 679.578 80.1866 676.145C74.2404 670.383 69.9494 664.314 66.5165 656.835C51.4365 624.1 48.494 575.489 59.0991 534.049C63.5128 516.762 70.8076 501.376 78.4702 492.978C83.6808 487.215 86.378 480.779 86.378 474.097C86.378 467.17 83.926 461.469 78.4089 455.523C62.5932 438.604 52.8464 418.006 49.3522 394.038C44.3868 359.893 53.3981 322.683 73.8726 293.198C93.9181 264.263 122.055 245.689 153.503 240.724C160.552 239.559 173.732 239.743 181.088 241.092C189.119 242.502 194.145 242.072 199.295 239.62C205.67 236.617 208.858 232.877 212.597 224.295C215.907 216.633 218.482 212.464 225.409 203.821C233.746 193.461 241.776 186.411 254.649 177.89C269.362 168.266 286.097 161.278 302.771 157.906C308.839 156.68 311.659 156.496 323 156.496C334.341 156.496 337.161 156.68 343.229 157.906C367.688 162.872 391.964 175.5 411.335 193.399C415.503 197.261 425.495 209.644 428.683 214.794C429.909 216.816 432.055 221.108 433.403 224.295C437.142 232.877 440.33 236.617 446.705 239.62C451.671 242.011 456.881 242.502 464.605 241.214C476.804 239.13 486.183 239.314 498.137 241.766C538.841 249.98 574.273 283.512 589.966 328.446C603.636 367.862 599.774 409.118 579.422 440.626C575.989 445.96 572.556 450.251 567.591 455.523C556.863 466.986 556.863 481.208 567.53 492.978C585.062 512.165 596.035 559.367 592.724 600.99C590.518 628.453 583.468 653.035 573.782 666.95C572.066 669.402 568.511 673.57 565.813 676.145C562.319 679.578 560.358 682.091 558.886 685.034C556.986 688.896 556.863 689.57 556.863 695.455V701.769L562.135 712.067C570.963 729.048 575.683 741.369 579.851 758.166C588.863 794.027 588.066 829.704 577.767 849.995C576.909 851.711 576.173 853.305 576.173 853.489C576.173 853.673 587.882 853.795 602.226 853.795H628.218L628.892 851.159C629.26 849.75 629.873 847.604 630.179 846.378C630.854 843.681 632.202 835.712 633.306 828.049C634.348 820.325 634.348 791.881 633.306 783.299C629.383 752.158 622.823 727.454 612.096 704.098C610.931 701.462 610.195 699.194 610.44 699.072C610.747 698.888 612.463 696.436 614.302 693.677C627.666 673.448 635.88 648.008 640.049 614.415C641.152 605.158 641.152 565.374 640.049 556.485C637.106 533.559 633.551 517.988 627.666 502.234C625.214 495.675 618.716 481.821 615.958 477.346L614.609 475.078L619.268 468.151C633.551 446.695 641.888 423.278 645.137 395.57C646.608 383.555 646.118 359.28 644.279 347.265C639.497 316.798 628.279 288.845 610.87 264.08C601.797 251.145 588.617 236.984 577.093 227.789C573.721 225.092 570.717 222.64 570.472 222.395C570.166 222.15 570.534 218.778 571.269 214.977C578.687 176.296 578.441 128.053 570.656 90.3524C563.913 57.4951 551.653 31.3808 535.837 16.3008C523.209 4.28578 510.336 -0.863507 494.888 0.11731C459.456 2.20154 430.89 42.9667 419.61 107.21C417.771 117.57 416.178 129.708 416.178 133.018C416.178 134.305 415.932 135.347 415.626 135.347C415.319 135.347 412.929 134.121 410.354 132.589C383.014 116.405 352.608 107.762 323 107.762C293.392 107.762 262.986 116.405 235.646 132.589C233.071 134.121 230.681 135.347 230.374 135.347C230.068 135.347 229.822 134.305 229.822 133.018C229.822 129.585 228.167 117.08 226.39 107.21C216.152 49.5259 192.674 11.3354 161.472 1.71112C157.181 0.423799 144.982 -0.434382 140.629 0.239929ZM151.051 50.139C159.878 57.1273 169.686 77.1114 175.326 99.4863C176.368 103.532 177.471 108.191 177.778 109.907C178.023 111.563 178.697 115.302 179.249 118.183C181.64 131.179 182.743 145.217 182.866 162.32L182.927 179.178L178.697 185.43L174.468 191.744H164.598C153.074 191.744 141.61 193.216 130.637 196.158C126.714 197.139 122.913 198.12 122.178 198.304C121.013 198.549 120.829 198.181 120.155 193.154C116.538 165.875 116.722 135.654 120.707 110.52C125.12 82.5059 135.419 57.1273 145.472 49.6486C147.863 47.8708 148.292 47.9321 151.051 50.139ZM500.589 49.7098C506.658 54.1848 513.34 66.0772 518.305 81.2798C528.297 111.685 531.117 153.431 525.845 193.154C525.171 198.181 524.987 198.549 523.822 198.304C523.087 198.12 519.286 197.139 515.363 196.158C504.39 193.216 492.926 191.744 481.402 191.744H471.532L467.303 185.43L463.073 179.178L463.134 162.32C463.257 138.535 465.464 119.961 470.735 99.3024C476.314 77.1114 486.183 57.1273 494.949 50.139C497.708 47.9321 498.137 47.8708 500.589 49.7098Z\" fill=\"black\"/>\r\n<path d=\"M313.498 358.237C300.195 359.525 296.579 360.015 290.203 361.303C279.843 363.448 265.989 368.23 256.365 372.95C222.895 389.317 199.846 416.596 192.796 448.166C191.386 454.419 191.202 456.503 191.202 467.047C191.202 477.468 191.386 479.736 192.735 485.682C202.114 526.938 240.12 557.405 289.284 562.983C299.95 564.148 346.049 564.148 356.715 562.983C396.193 558.508 430.154 537.114 445.418 507.076C449.463 499.046 451.425 493.835 453.264 485.682C454.613 479.736 454.797 477.468 454.797 467.047C454.797 456.503 454.613 454.419 453.203 448.166C442.965 402.313 398.461 366.207 343.903 359.341C336.792 358.483 318.157 357.747 313.498 358.237ZM336.424 391.585C354.631 393.547 372.96 400.045 387.672 409.853C395.58 415.125 406.737 426.159 411.518 433.393C417.403 442.342 420.774 451.476 422.307 462.572C422.981 467.66 422.614 471.522 420.774 479.736C417.893 491.996 408.943 504.808 396.867 513.758C391.227 517.865 379.519 523.812 372.347 526.141C358.738 530.493 349.849 531.29 318.095 531.045C297.376 530.861 293.697 530.677 287.751 529.574C267.461 525.773 251.4 517.681 239.753 505.36C230.312 495.429 226.021 486.357 223.692 471.706C222.65 464.901 224.611 453.622 228.596 444.12C233.439 432.534 245.944 418.129 258.327 409.853C272.671 400.29 291.552 393.486 308.9 391.647C315.582 390.911 329.742 390.911 336.424 391.585Z\" fill=\"black\"/>\r\n<path d=\"M299.584 436.336C294.925 438.849 291.676 445.224 292.657 449.944C293.76 455.032 298.235 460.182 305.223 464.412C308.963 466.68 309.208 466.986 309.392 469.254C309.514 470.603 309.024 474.465 308.35 477.898C307.614 481.269 307.062 484.825 307.062 485.806C307.124 488.442 309.576 492.733 312.15 494.817C314.419 496.656 314.848 496.717 321.223 496.901C327.047 497.085 328.273 496.962 330.602 495.859C336.61 492.916 338.142 487.522 335.935 477.162C334.096 468.519 334.464 467.17 339.062 464.534C343.904 461.714 349.054 456.749 350.586 453.377C353.529 446.941 350.831 439.646 344.333 436.274C342.74 435.477 340.778 435.11 337.897 435.11C333.422 435.11 330.541 436.152 325.269 439.523L322.265 441.424L320.365 440.259C312.58 435.661 311.17 435.11 306.449 435.171C303.078 435.171 301.239 435.477 299.584 436.336Z\" fill=\"black\"/>\r\n<path d=\"M150.744 365.165C139.894 368.598 131.802 376.567 127.634 387.908C125.611 393.303 124.63 401.824 125.488 406.421C127.511 417.394 136.522 427.386 146.76 430.145C159.633 433.516 169.257 431.309 177.778 422.85C182.743 418.007 185.441 413.777 188.138 406.911C190.099 402.069 190.222 401.211 190.222 394.345L190.283 386.989L187.709 381.717C183.601 373.38 176.184 367.188 167.602 364.92C162.759 363.694 154.974 363.756 150.744 365.165Z\" fill=\"black\"/>\r\n<path d=\"M478.153 364.982C469.755 367.25 462.276 373.502 458.291 381.717L455.717 386.989L455.778 394.345C455.778 401.211 455.901 402.069 457.862 406.911C460.56 413.777 463.257 418.007 468.222 422.85C476.743 431.309 486.367 433.516 499.241 430.145C506.658 428.183 514.075 421.93 517.631 414.635C520.696 408.444 521.431 403.969 520.451 396.919C518.183 380.797 508.742 369.089 494.704 364.982C490.597 363.756 482.628 363.756 478.153 364.982Z\" fill=\"black\"/>\r\n</svg>\r\n";

/***/ },

/***/ "./style/icons/openai.svg"
/*!********************************!*\
  !*** ./style/icons/openai.svg ***!
  \********************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->\r\n<svg fill=\"#000000\" width=\"800px\" height=\"800px\" viewBox=\"0 0 24 24\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\"><title>OpenAI icon</title><path d=\"M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z\"/></svg>";

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

/***/ "./style/icons/reddit.svg"
/*!********************************!*\
  !*** ./style/icons/reddit.svg ***!
  \********************************/
(module) {

module.exports = "<svg viewBox=\"0 0 800 800\" xmlns=\"http://www.w3.org/2000/svg\" width=\"2500\" height=\"2500\"><circle cx=\"400\" cy=\"400\" fill=\"#ff4500\" r=\"400\"/><path d=\"M666.8 400c.08 5.48-.6 10.95-2.04 16.24s-3.62 10.36-6.48 15.04c-2.85 4.68-6.35 8.94-10.39 12.65s-8.58 6.83-13.49 9.27c.11 1.46.2 2.93.25 4.4a107.268 107.268 0 0 1 0 8.8c-.05 1.47-.14 2.94-.25 4.4 0 89.6-104.4 162.4-233.2 162.4S168 560.4 168 470.8c-.11-1.46-.2-2.93-.25-4.4a107.268 107.268 0 0 1 0-8.8c.05-1.47.14-2.94.25-4.4a58.438 58.438 0 0 1-31.85-37.28 58.41 58.41 0 0 1 7.8-48.42 58.354 58.354 0 0 1 41.93-25.4 58.4 58.4 0 0 1 46.52 15.5 286.795 286.795 0 0 1 35.89-20.71c12.45-6.02 25.32-11.14 38.51-15.3s26.67-7.35 40.32-9.56 27.45-3.42 41.28-3.63L418 169.6c.33-1.61.98-3.13 1.91-4.49.92-1.35 2.11-2.51 3.48-3.4 1.38-.89 2.92-1.5 4.54-1.8 1.61-.29 3.27-.26 4.87.09l98 19.6c9.89-16.99 30.65-24.27 48.98-17.19s28.81 26.43 24.71 45.65c-4.09 19.22-21.55 32.62-41.17 31.61-19.63-1.01-35.62-16.13-37.72-35.67L440 186l-26 124.8c13.66.29 27.29 1.57 40.77 3.82a284.358 284.358 0 0 1 77.8 24.86A284.412 284.412 0 0 1 568 360a58.345 58.345 0 0 1 29.4-15.21 58.361 58.361 0 0 1 32.95 3.21 58.384 58.384 0 0 1 25.91 20.61A58.384 58.384 0 0 1 666.8 400zm-396.96 55.31c2.02 4.85 4.96 9.26 8.68 12.97 3.71 3.72 8.12 6.66 12.97 8.68A40.049 40.049 0 0 0 306.8 480c16.18 0 30.76-9.75 36.96-24.69 6.19-14.95 2.76-32.15-8.68-43.59s-28.64-14.87-43.59-8.68c-14.94 6.2-24.69 20.78-24.69 36.96 0 5.25 1.03 10.45 3.04 15.31zm229.1 96.02c2.05-2 3.22-4.73 3.26-7.59.04-2.87-1.07-5.63-3.07-7.68s-4.73-3.22-7.59-3.26c-2.87-.04-5.63 1.07-7.94 2.8a131.06 131.06 0 0 1-19.04 11.35 131.53 131.53 0 0 1-20.68 7.99c-7.1 2.07-14.37 3.54-21.72 4.39-7.36.85-14.77 1.07-22.16.67-7.38.33-14.78.03-22.11-.89a129.01 129.01 0 0 1-21.64-4.6c-7.08-2.14-13.95-4.88-20.56-8.18s-12.93-7.16-18.89-11.53c-2.07-1.7-4.7-2.57-7.38-2.44s-5.21 1.26-7.11 3.15c-1.89 1.9-3.02 4.43-3.15 7.11s.74 5.31 2.44 7.38c7.03 5.3 14.5 9.98 22.33 14s16 7.35 24.4 9.97 17.01 4.51 25.74 5.66c8.73 1.14 17.54 1.53 26.33 1.17 8.79.36 17.6-.03 26.33-1.17A153.961 153.961 0 0 0 476.87 564c7.83-4.02 15.3-8.7 22.33-14zm-7.34-68.13c5.42.06 10.8-.99 15.81-3.07 5.01-2.09 9.54-5.17 13.32-9.06s6.72-8.51 8.66-13.58A39.882 39.882 0 0 0 532 441.6c0-16.18-9.75-30.76-24.69-36.96-14.95-6.19-32.15-2.76-43.59 8.68s-14.87 28.64-8.68 43.59c6.2 14.94 20.78 24.69 36.96 24.69z\" fill=\"#fff\"/></svg>";

/***/ },

/***/ "./style/icons/scissors-24.svg"
/*!*************************************!*\
  !*** ./style/icons/scissors-24.svg ***!
  \*************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"><g fill=\"currentColor\"><path fill-rule=\"evenodd\" d=\"M5.5 2a3.5 3.5 0 101.99 6.38l3.346 3.12-3.346 3.12a3.5 3.5 0 101.023 1.097l3.93-3.664.009-.008 8.31-7.746A.75.75 0 0019.739 3.2l-7.803 7.274-3.424-3.192A3.5 3.5 0 005.5 2zm-2 3.5a2 2 0 114 0 2 2 0 01-4 0zm0 12a2 2 0 114 0 2 2 0 01-4 0z\" clip-rule=\"evenodd\"/><path d=\"M20.763 18.703a.75.75 0 01-1.026 1.095l-5.5-5.15a.75.75 0 011.026-1.095l5.5 5.15z\"/></g></svg>";

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

/***/ "./style/icons/sort-desc-24.svg"
/*!**************************************!*\
  !*** ./style/icons/sort-desc-24.svg ***!
  \**************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"none\" viewBox=\"0 0 24 24\"><g fill=\"currentColor\"><path d=\"M3 5.75A.75.75 0 013.75 5h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 5.75zM3.75 9a.75.75 0 000 1.5h9.5a.75.75 0 000-1.5h-9.5zM16.963 20.443a.747.747 0 00.817-.163l4-4a.75.75 0 10-1.06-1.06L18 17.94V9.75a.75.75 0 00-1.5 0v8.19l-2.72-2.72a.75.75 0 10-1.06 1.06l4 4a.748.748 0 00.243.163zM3.75 13a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5zM3 17.75a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75z\"/></g></svg>";

/***/ },

/***/ "./style/icons/sql.svg"
/*!*****************************!*\
  !*** ./style/icons/sql.svg ***!
  \*****************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-sql\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 8a2 2 0 0 1 2 2v4a2 2 0 1 1 -4 0v-4a2 2 0 0 1 2 -2z\" /><path d=\"M17 8v8h4\" /><path d=\"M13 15l1 1\" /><path d=\"M3 15a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-2a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1\" /></svg>";

/***/ },

/***/ "./style/icons/system.svg"
/*!********************************!*\
  !*** ./style/icons/system.svg ***!
  \********************************/
(module) {

module.exports = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"24\"  height=\"24\"  viewBox=\"0 0 24 24\"  fill=\"none\"  stroke=\"currentColor\"  stroke-width=\"2\"  stroke-linecap=\"round\"  stroke-linejoin=\"round\"  class=\"icon icon-tabler icons-tabler-outline icon-tabler-devices-2\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M10 15h-6a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h6\" /><path d=\"M13 4m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z\" /><path d=\"M7 19l3 0\" /><path d=\"M17 8l0 .01\" /><path d=\"M17 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" /><path d=\"M9 15l0 4\" /></svg>";

/***/ },

/***/ "./style/icons/trino.svg"
/*!*******************************!*\
  !*** ./style/icons/trino.svg ***!
  \*******************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<svg\r\n   viewBox=\"-1 0 63.191998 63.192003\"\r\n   version=\"1.1\"\r\n   id=\"svg22\"\r\n   sodipodi:docname=\"trino.svg\"\r\n   width=\"63.192001\"\r\n   height=\"63.192001\"\r\n   inkscape:version=\"1.3 (0e150ed, 2023-07-21)\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\">\r\n  <sodipodi:namedview\r\n     id=\"namedview22\"\r\n     pagecolor=\"#505050\"\r\n     bordercolor=\"#eeeeee\"\r\n     borderopacity=\"1\"\r\n     inkscape:showpageshadow=\"0\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pagecheckerboard=\"0\"\r\n     inkscape:deskcolor=\"#505050\"\r\n     inkscape:zoom=\"2.5482452\"\r\n     inkscape:cx=\"66.90879\"\r\n     inkscape:cy=\"31.590367\"\r\n     inkscape:window-width=\"2560\"\r\n     inkscape:window-height=\"1412\"\r\n     inkscape:window-x=\"1512\"\r\n     inkscape:window-y=\"149\"\r\n     inkscape:window-maximized=\"1\"\r\n     inkscape:current-layer=\"Layer_3\" />\r\n  <defs\r\n     id=\"defs1\">\r\n    <style\r\n       id=\"style1\">.cls-1{fill:#cdcccc;}.cls-2{fill:#fff;}.cls-3{fill:#dd00a1;}.cls-4{fill:#f9d8d2;}.cls-5{fill:#10110e;}.cls-6{fill:#e5e5e5;}.cls-7{fill:#8accce;opacity:0.2;}.cls-8{fill:#515151;}</style>\r\n  </defs>\r\n  <g\r\n     id=\"Layer_2\"\r\n     data-name=\"Layer 2\"\r\n     transform=\"translate(0,0.0015663)\">\r\n    <g\r\n       id=\"Layer_3\"\r\n       data-name=\"Layer 3\">\r\n      <g\r\n         id=\"g22\"\r\n         transform=\"translate(9.150631,2.1751926e-4)\">\r\n        <path\r\n           class=\"cls-1\"\r\n           d=\"m 39.09,30.67 a 3,3 0 0 0 -6,0 2.76,2.76 0 0 0 1.91,2.55 v 4.57 a 15.27,15.27 0 0 0 -6.91,-7.85 c 0.46,-1 0.93,-1.86 1.38,-2.65 a 65.83,65.83 0 0 1 5.67,-7.24 c 1.13,-1.34 2.2,-2.6 3.07,-3.7 2.44,-3.06 5.12,-7.58 4.62,-10.26 A 2.56,2.56 0 0 0 41.58,4.28 c -3.39,-2 -8,4.5 -12.53,10.77 -3,4.14 -4.55,10 -5.26,13.29 a 19.86,19.86 0 0 0 -4.23,-0.46 18.63,18.63 0 0 0 -6.08,1 85.14,85.14 0 0 1 0.33,-11 c 1,-9.51 0.56,-15.09 -1.29,-17 A 2.43,2.43 0 0 0 10.56,0 C 5.1,0.27 5.72,16.58 5.81,18.44 c 0.22,4.46 2,9.88 3.08,12.88 A 15.44,15.44 0 0 0 3.64,39.13 H 3.25 a 3.11,3.11 0 0 0 -3.25,3 v 5.17 a 3.12,3.12 0 0 0 3.25,3 h 0.66 a 13.34,13.34 0 0 0 3.29,4.63 l -1,0.88 a 1.17,1.17 0 0 0 -0.13,1.64 c 3,3.65 7.91,5.74 13.42,5.74 5.51,0 10.44,-2.09 13.42,-5.74 a 1.17,1.17 0 0 0 -0.13,-1.64 l -1,-0.88 a 13.56,13.56 0 0 0 3.29,-4.71 h 0.75 a 3.12,3.12 0 0 0 3.25,-3 v -5.13 a 2.94,2.94 0 0 0 -1.91,-2.68 v -6.19 a 2.75,2.75 0 0 0 1.93,-2.55 z\"\r\n           id=\"path1\" />\r\n        <path\r\n           class=\"cls-2\"\r\n           d=\"m 14.62,55.74 c 0.92,-0.61 -1.5,-0.38 -1.7,-0.79 A 16.49,16.49 0 0 1 10.06,54.44 C 8.36,53.99 4.28,51.25 3.84,48.62 3.4,45.99 3.84,41 5.68,38 a 17.21,17.21 0 0 1 4.38,-4.7 c 0,0 -3.57,-8.49 -3.87,-14.9 -0.3,-6.41 0.2,-17.82 4.38,-18.02 4.18,-0.2 3.57,10.48 2.86,17.43 a 90.59,90.59 0 0 0 -0.2,13.88 19.73,19.73 0 0 1 5.5,-0.92 21.12,21.12 0 0 1 4.9,0.46 c 0,0 1.33,-9.84 5.71,-16 4.38,-6.16 9,-12.45 12,-10.66 3,1.79 -0.82,8.18 -3.47,11.51 -2.65,3.33 -7.24,8.33 -8.77,11 a 46.59,46.59 0 0 0 -2.65,5.51 14.93,14.93 0 0 1 6.39,6.32 C 35,43.22 35.16,48.52 34,50.77 a 8.08,8.08 0 0 1 -5.61,4 c -1.33,0.06 -6.92,1.45 -6.92,1.45 z\"\r\n           id=\"path2\" />\r\n        <path\r\n           class=\"cls-3\"\r\n           d=\"m 24.41,31.32 c 0,0 3.34,-8.71 6.33,-13.6 2.99,-4.89 7,-8.59 8.26,-7.84 1.26,0.75 -2.57,5.32 -5.93,9.81 a 113.44,113.44 0 0 0 -7.43,12.38 z\"\r\n           id=\"path3\" />\r\n        <path\r\n           class=\"cls-3\"\r\n           d=\"m 11,32.81 1,-0.74 c 0,0 -0.14,-8.71 0,-14 0.14,-5.29 0.41,-11.9 -1.36,-11.84 -1.77,0.06 -3,5.17 -2.31,12.38 A 87.47,87.47 0 0 0 11,32.81 Z\"\r\n           id=\"path4\" />\r\n        <circle\r\n           class=\"cls-4\"\r\n           cx=\"8.0200005\"\r\n           cy=\"49.540001\"\r\n           r=\"1.9400001\"\r\n           id=\"circle4\" />\r\n        <circle\r\n           class=\"cls-4\"\r\n           cx=\"30.950001\"\r\n           cy=\"49.540001\"\r\n           r=\"1.9400001\"\r\n           id=\"circle5\" />\r\n        <path\r\n           class=\"cls-5\"\r\n           d=\"m 22.7,49.38 a 0.18,0.18 0 0 0 -0.25,0.07 c 0,0 -0.58,1 -1.42,1.06 a 2.09,2.09 0 0 1 -1.5,-0.7 v -1.48 c 0.54,-0.3 1.41,-1.2 1.41,-1.51 a 1.41,1.41 0 0 0 -1.49,-1.09 c -1,0 -1.7,0.65 -1.7,1.19 0,0.54 1.1,1.24 1.41,1.44 v 1.46 a 1.82,1.82 0 0 1 -1.31,0.69 c -0.79,0 -1.39,-1.08 -1.4,-1.09 A 0.19,0.19 0 0 0 16.2,49.34 0.2,0.2 0 0 0 16.12,49.6 c 0,0 0.71,1.29 1.73,1.29 a 2.12,2.12 0 0 0 1.51,-0.73 2.37,2.37 0 0 0 1.58,0.73 h 0.12 a 2.49,2.49 0 0 0 1.71,-1.26 0.18,0.18 0 0 0 -0.07,-0.25 z\"\r\n           id=\"path5\" />\r\n        <path\r\n           class=\"cls-6\"\r\n           d=\"m 10.06,33.32 c 0,0 -2.77,-7 -3.3,-10.66 C 6.23,19 5.76,12.89 6.46,8.82 A 50,50 0 0 1 7.68,3.26 c 0,0 -1.29,9.49 -0.81,13.64 0.48,4.15 3.19,16.42 3.19,16.42 z\"\r\n           id=\"path6\" />\r\n        <path\r\n           class=\"cls-6\"\r\n           d=\"m 23.63,31.23 c 0,0 2,-10.59 4.91,-14.75 C 31.45,12.32 35.06,7.27 36.89,6 l 1.83,-1.28 c 0,0 -7.34,7.7 -10.18,14 -2.84,6.3 -4.91,12.51 -4.91,12.51 z\"\r\n           id=\"path7\" />\r\n        <path\r\n           class=\"cls-5\"\r\n           d=\"M 12,43.23 A 1.52,1.52 0 1 0 13.51,44.75 1.52,1.52 0 0 0 12,43.23 Z m 0.43,1.41 a 0.41,0.41 0 0 1 -0.41,-0.41 0.41,0.41 0 0 1 0.82,0 0.41,0.41 0 0 1 -0.43,0.41 z\"\r\n           id=\"path8\" />\r\n        <path\r\n           class=\"cls-5\"\r\n           d=\"m 26.92,43.23 a 1.52,1.52 0 1 0 1.52,1.52 1.52,1.52 0 0 0 -1.52,-1.52 z m 0.43,1.41 a 0.42,0.42 0 0 1 -0.41,-0.41 0.42,0.42 0 0 1 0.83,0 0.42,0.42 0 0 1 -0.42,0.41 z\"\r\n           id=\"path9\" />\r\n        <ellipse\r\n           class=\"cls-7\"\r\n           cx=\"19.73\"\r\n           cy=\"45.32\"\r\n           rx=\"14.1\"\r\n           ry=\"10.16\"\r\n           id=\"ellipse9\" />\r\n        <path\r\n           class=\"cls-2\"\r\n           d=\"M 36.8,39.67 V 33 a 2.45,2.45 0 0 0 1.92,-2.28 2.65,2.65 0 0 0 -5.27,0 2.44,2.44 0 0 0 1.91,2.28 v 6.5 H 35.17 C 33.17,32.56 27.26,28.25 19.55,28.25 11.84,28.25 5.89,32.52 3.92,39.5 H 3.25 a 2.75,2.75 0 0 0 -2.88,2.59 v 5.17 a 2.75,2.75 0 0 0 2.88,2.58 h 0.91 a 13.11,13.11 0 0 0 3.6,5.09 l -1.3,1.16 a 0.79,0.79 0 0 0 -0.09,1.12 c 2.92,3.53 7.71,5.6 13.13,5.6 5.42,0 10.21,-2 13.13,-5.6 a 0.79,0.79 0 0 0 -0.09,-1.12 l -1.3,-1.16 a 13.34,13.34 0 0 0 3.6,-5.09 h 1 a 2.75,2.75 0 0 0 2.88,-2.58 V 42.09 A 2.62,2.62 0 0 0 36.8,39.67 Z M 19.55,35.62 c 7.14,0 12.94,4.7 12.94,10.47 0,6.25 -6.52,9 -12.94,9 -6.42,0 -12.94,-2.8 -12.94,-9 0,-5.77 5.8,-10.47 12.94,-10.47 z\"\r\n           id=\"path10\" />\r\n        <path\r\n           class=\"cls-8\"\r\n           d=\"m 37.28,45.53 h -1.92 c 0,-0.3 0,-0.6 0,-0.94 a 19.35,19.35 0 0 0 -0.38,-3.8 h 0.81 a 1.35,1.35 0 0 1 1.44,1.3 z\"\r\n           id=\"path11\" />\r\n        <path\r\n           class=\"cls-8\"\r\n           d=\"m 35.84,48.55 h -1 a 16.69,16.69 0 0 0 0.43,-2.15 h 2 v 0.86 a 1.34,1.34 0 0 1 -1.43,1.29 z\"\r\n           id=\"path12\" />\r\n        <path\r\n           class=\"cls-8\"\r\n           d=\"m 19.55,61.48 c -4.8,0 -9.06,-1.73 -11.75,-4.79 l 1.35,-1.2 a 17.86,17.86 0 0 0 10.4,3 17.89,17.89 0 0 0 10.4,-3 l 1.34,1.2 c -2.68,3.06 -6.95,4.79 -11.74,4.79 z\"\r\n           id=\"path13\" />\r\n        <path\r\n           class=\"cls-8\"\r\n           d=\"m 3.25,40.79 h 0.86 a 19.66,19.66 0 0 0 -0.38,3.8 6.18,6.18 0 0 0 0,0.94 H 1.86 v -3.44 a 1.28,1.28 0 0 1 1.39,-1.3 z\"\r\n           id=\"path14\" />\r\n        <path\r\n           d=\"m 19.55,34.76 a 17.4,17.4 0 0 0 -4.8,0.69 v -5.21 a 17.14,17.14 0 0 1 4.8,-0.65 17.12,17.12 0 0 1 4.79,0.65 v 5.25 a 16,16 0 0 0 -4.79,-0.73 z\"\r\n           id=\"path15\" />\r\n        <path\r\n           class=\"cls-8\"\r\n           d=\"M 13.8,30.54 V 35.8 C 9,37.56 5.65,41.53 5.65,46.09 5.65,52 11.26,56 19.55,56 c 8.29,0 13.9,-4 13.9,-9.91 0,-4.56 -3.36,-8.53 -8.15,-10.29 v -5.26 c 5.61,2 9.11,7.19 9.11,14.09 0,7.76 -5.95,13 -14.86,13 -8.91,0 -14.86,-5.21 -14.86,-13 0,-6.9 3.5,-12.07 9.11,-14.09 z\"\r\n           id=\"path16\" />\r\n        <path\r\n           class=\"cls-8\"\r\n           d=\"m 1.81,46.4 h 2 a 15.15,15.15 0 0 0 0.43,2.15 h -1 A 1.35,1.35 0 0 1 1.8,47.26 Z\"\r\n           id=\"path17\" />\r\n        <ellipse\r\n           class=\"cls-8\"\r\n           cx=\"36.080002\"\r\n           cy=\"30.67\"\r\n           rx=\"1.2\"\r\n           ry=\"1.08\"\r\n           id=\"ellipse17\" />\r\n      </g>\r\n    </g>\r\n  </g>\r\n</svg>\r\n";

/***/ }

}]);
//# sourceMappingURL=lib_index_js.05ed0ce4f19dd314b5bf.js.map