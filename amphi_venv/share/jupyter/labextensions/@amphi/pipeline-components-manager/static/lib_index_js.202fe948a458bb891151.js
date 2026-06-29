"use strict";
(self["webpackChunk_amphi_pipeline_components_manager"] = self["webpackChunk_amphi_pipeline_components_manager"] || []).push([["lib_index_js"],{

/***/ "./lib/BaseCodeGenerator.js"
/*!**********************************!*\
  !*** ./lib/BaseCodeGenerator.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseCodeGenerator: () => (/* binding */ BaseCodeGenerator)
/* harmony export */ });
/* harmony import */ var _PipelineService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PipelineService */ "./lib/PipelineService.js");
// ================================================
// BaseCodeGenerator.ts
// ================================================

class BaseCodeGenerator {
    // Common or shared methods go here
    static computeNodesToTraverse(flow, targetNodeId, componentService) {
        const nodesMap = new Map();
        const nodeDependencies = new Map();
        const sortedNodes = [];
        flow.nodes.forEach(node => {
            const type = componentService.getComponent(node.type)._type;
            if (!['annotation', 'logger', 'env_variables', 'env_file', 'connection'].includes(type)) {
                nodesMap.set(node.id, node);
            }
        });
        const visited = new Set();
        const nodePaths = new Map();
        const topologicalSortWithPathTracking = (nodeId, path) => {
            if (visited.has(nodeId)) {
                const existingPath = nodePaths.get(nodeId) || new Set();
                nodePaths.set(nodeId, new Set([...existingPath, ...path]));
                return;
            }
            visited.add(nodeId);
            const dependencies = flow.edges
                .filter(edge => edge.target === nodeId)
                .map(edge => edge.source);
            nodeDependencies.set(nodeId, dependencies);
            const currentPath = new Set([...path, nodeId]);
            nodePaths.set(nodeId, currentPath);
            dependencies.forEach(dep => {
                topologicalSortWithPathTracking(dep, currentPath);
            });
            sortedNodes.push(nodeId);
        };
        flow.nodes.forEach(node => {
            if (!visited.has(node.id)) {
                topologicalSortWithPathTracking(node.id, new Set());
            }
        });
        let nodesToTraverse = [];
        if (targetNodeId !== 'none') {
            const nodesToConsider = new Set([targetNodeId]);
            const pathToTarget = new Set();
            while (nodesToConsider.size > 0) {
                const nextNodesToConsider = new Set();
                nodesToConsider.forEach(nodeId => {
                    pathToTarget.add(nodeId);
                    const dependencies = nodeDependencies.get(nodeId) || [];
                    dependencies.forEach(dep => {
                        if (!pathToTarget.has(dep)) {
                            nextNodesToConsider.add(dep);
                        }
                    });
                });
                nodesToConsider.clear();
                nextNodesToConsider.forEach(nodeId => nodesToConsider.add(nodeId));
            }
            nodesToTraverse = sortedNodes.filter(nodeId => pathToTarget.has(nodeId));
        }
        else {
            nodesToTraverse = sortedNodes;
        }
        return { nodesToTraverse, nodesMap, nodeDependencies, sortedNodes };
    }
    static createNodeObjects(flow, componentService, nodesToTraverse, nodesMap, variablesAutoNaming) {
        var _a;
        const nodeObjects = [];
        const counters = new Map();
        const nodeOutputs = new Map();
        function incrementCounter(key) {
            const count = counters.get(key) || 0;
            counters.set(key, count + 1);
            return count + 1;
        }
        function getInputName(nodeId, context) {
            const name = nodeOutputs.get(nodeId);
            if (!name) {
                throw new Error(`Input name is undefined for node ${nodeId} in context: ${context}`);
            }
            return name;
        }
        function getOutputName(node, componentId, autoNaming) {
            if (autoNaming) {
                return `${node.type}${incrementCounter(componentId)}`;
            }
            return node.data.nameId || `${node.type}${incrementCounter(componentId)}`;
        }
        for (const nodeId of nodesToTraverse) {
            const node = nodesMap.get(nodeId);
            if (!node) {
                console.error(`Node with id ${nodeId} not found.`);
                continue;
            }
            const config = node.data || {};
            const component = componentService.getComponent(node.type);
            const componentType = component._type;
            const componentId = component._id;
            const imports = component.provideImports({ config });
            const dependencies = typeof component.provideDependencies === 'function'
                ? component.provideDependencies({ config })
                : [];
            const functions = typeof component.provideFunctions === 'function'
                ? component.provideFunctions({ config })
                : [];
            let code = '';
            let inputName = '';
            let outputName = '';
            if (config.customTitle) {
                const generatedCode = component.generateComponentCode({ config });
                const needsNewLine = !generatedCode.startsWith('\n');
                code += `\n# ${config.customTitle}${needsNewLine ? '\n' : ''}`;
            }
            try {
                switch (componentType) {
                    case 'pandas_df_processor':
                    case 'pandas_df_to_documents_processor':
                    case 'ibis_df_processor':
                    case 'documents_processor': {
                        const previousNodeId = _PipelineService__WEBPACK_IMPORTED_MODULE_0__.PipelineService.findPreviousNodeId(flow, nodeId);
                        inputName = getInputName(previousNodeId, componentType);
                        outputName = getOutputName(node, componentId, variablesAutoNaming);
                        nodeOutputs.set(nodeId, outputName);
                        code += component.generateComponentCode({ config, inputName, outputName });
                        break;
                    }
                    case 'ibis_df_double_processor':
                    case 'pandas_df_double_processor': {
                        const [input1Id, input2Id] = _PipelineService__WEBPACK_IMPORTED_MODULE_0__.PipelineService.findMultiplePreviousNodeIds(flow, nodeId);
                        const inputName1 = getInputName(input1Id, componentType);
                        const inputName2 = getInputName(input2Id, componentType);
                        outputName = getOutputName(node, componentId, variablesAutoNaming);
                        nodeOutputs.set(nodeId, outputName);
                        code += component.generateComponentCode({ config, inputName1, inputName2, outputName });
                        break;
                    }
                    case 'ibis_df_multi_processor':
                    case 'pandas_df_multi_processor': {
                        const inputIds = _PipelineService__WEBPACK_IMPORTED_MODULE_0__.PipelineService.findMultiplePreviousNodeIds(flow, nodeId);
                        const inputNames = inputIds.map(id => getInputName(id, componentType));
                        outputName = getOutputName(node, componentId, variablesAutoNaming);
                        nodeOutputs.set(nodeId, outputName);
                        code += component.generateComponentCode({ config, inputNames, outputName });
                        break;
                    }
                    case 'pandas_df_input':
                    case 'documents_input': {
                        outputName = getOutputName(node, componentId, variablesAutoNaming);
                        nodeOutputs.set(nodeId, outputName);
                        code += component.generateComponentCode({ config, outputName });
                        break;
                    }
                    case 'ibis_df_input': {
                        outputName = getOutputName(node, componentId, variablesAutoNaming);
                        nodeOutputs.set(nodeId, outputName);
                        // Find the nodes that follow this input node
                        const nextNodeIds = _PipelineService__WEBPACK_IMPORTED_MODULE_0__.PipelineService.findNextNodeIds(flow, nodeId);
                        let uniqueEngineName = undefined;
                        for (const nextNodeId of nextNodeIds) {
                            const nextNode = nodesMap.get(nextNodeId);
                            if (nextNode) {
                                const nextComponent = componentService.getComponent(nextNode.type);
                                const nextComponentType = nextComponent._type;
                                if (nextComponentType === 'ibis_df_double_processor') {
                                    // Get previous nodes connected to the join node
                                    const previousNodeIds = _PipelineService__WEBPACK_IMPORTED_MODULE_0__.PipelineService.findMultiplePreviousNodeIds(flow, nextNodeId);
                                    if (previousNodeIds.length > 1) {
                                        // Find the other input node ID (excluding current node)
                                        const otherNodeId = previousNodeIds.find(id => id !== nodeId);
                                        if (otherNodeId && nodeOutputs.has(otherNodeId)) {
                                            const otherOutputName = getInputName(otherNodeId, 'ibis_df_double_processor');
                                            uniqueEngineName = `${otherOutputName}_backend`;
                                            break; // Stop after finding the first matching join node
                                        }
                                    }
                                }
                            }
                        }
                        // Generate code with or without uniqueEngineName
                        if (uniqueEngineName) {
                            code += component.generateComponentCode({ config, outputName, uniqueEngineName });
                        }
                        else {
                            code += component.generateComponentCode({ config, outputName });
                        }
                        break;
                    }
                    case 'ibis_df_output':
                    case 'pandas_df_output':
                    case 'documents_output': {
                        const previousNodeId = _PipelineService__WEBPACK_IMPORTED_MODULE_0__.PipelineService.findPreviousNodeId(flow, nodeId);
                        inputName = getInputName(previousNodeId, componentType);
                        code += component.generateComponentCode({ config, inputName });
                        break;
                    }
                    default:
                        throw new Error(`Pipeline Configuration Error: ${componentType} for node ${nodeId}`);
                }
                nodeObjects.push({
                    id: nodeId,
                    title: config.customTitle || node.type,
                    imports,
                    dependencies,
                    type: componentType,
                    code,
                    outputName: nodeOutputs.get(nodeId) || '',
                    functions,
                    lastUpdated: config.lastUpdated || 0,
                    lastExecuted: config.lastExecuted || 0,
                    runtime: ((_a = config.backend) === null || _a === void 0 ? void 0 : _a.engine) || 'local'
                });
            }
            catch (error) {
                console.error(`Error processing node ${nodeId}:`, error);
                throw error;
            }
        }
        return nodeObjects;
    }
    static formatVariables(code) {
        const lines = code.split('\n');
        const transformed = lines.map(line => {
            if (/r(['"]).*\1/.test(line) || /f(['"])/.test(line) || /f("""|''')/.test(line)) {
                return line;
            }
            return line
                .replace(/(['"])\{(os\.[^}]+)\}\1/g, '$2')
                .replace(/(['"])\{(\w+)\}\1/g, '$2')
                .replace(/(['"])(.*\{.*\}.*)\1/g, 'f$1$2$1')
                .replace(/(f?"""\s*)(.*\{.*\}.*)(\s*""")/g, 'f"""$2"""');
        });
        let result = transformed.join('\n');
        //    Extra narrow pass: only fix plain strings containing {os.getenv(...)}
        //    even if they are on a line that already has another f-string
        result = result.replace(/(?<![fr])(['"])([^'"\n]*\{os\.getenv\([^}]+\)\}[^'"\n]*)\1/g, 'f$1$2$1');
        //    Handle multi-line triple-quoted strings containing Python expressions
        //    This catches cases like SQL queries with {os.getenv(...)} or {variable} across multiple lines
        result = result.replace(/(?<![fr])("""[\s\S]*?\{[\s\S]*?\}[\s\S]*?""")/g, 'f$1');
        return result;
    }
    static getEnvironmentVariableCode(pipelineJson, componentService) {
        const flow = _PipelineService__WEBPACK_IMPORTED_MODULE_0__.PipelineService.filterPipeline(pipelineJson);
        const envVariablesMap = new Map();
        const uniqueImports = new Set();
        flow.nodes.forEach(node => {
            const type = componentService.getComponent(node.type)._type;
            if (type === 'env_variables' || type === 'env_file') {
                envVariablesMap.set(node.id, node);
            }
        });
        if (envVariablesMap.size === 0) {
            return '# No environment variable components found.';
        }
        let codeAccumulator = '';
        envVariablesMap.forEach(node => {
            const component = componentService.getComponent(node.type);
            const config = node.data;
            component.provideImports({ config }).forEach(imp => uniqueImports.add(imp));
            codeAccumulator += component.generateComponentCode({ config });
        });
        const importsCode = Array.from(uniqueImports).join('\n');
        return `${importsCode}\n\n${codeAccumulator}`;
    }
    static getConnectionCode(pipelineJson, componentService) {
        const flow = _PipelineService__WEBPACK_IMPORTED_MODULE_0__.PipelineService.filterPipeline(pipelineJson);
        const connectionsMap = new Map();
        const uniqueImports = new Set();
        flow.nodes.forEach(node => {
            const type = componentService.getComponent(node.type)._type;
            if (type === 'connection') {
                connectionsMap.set(node.id, node);
            }
        });
        if (connectionsMap.size === 0) {
            return '# No connection components found.';
        }
        let codeAccumulator = '';
        connectionsMap.forEach(node => {
            const component = componentService.getComponent(node.type);
            const config = node.data;
            component.provideImports({ config }).forEach(imp => uniqueImports.add(imp));
            codeAccumulator += component.generateComponentCode({ config });
        });
        const importsCode = Array.from(uniqueImports).join('\n');
        return `${importsCode}\n\n${codeAccumulator}`;
    }
    static getComponentAndDataForNode(nodeId, componentService, pipelineJson) {
        const flow = _PipelineService__WEBPACK_IMPORTED_MODULE_0__.PipelineService.filterPipeline(pipelineJson);
        const node = flow.nodes.find((n) => n.id === nodeId);
        if (!node) {
            console.error(`Node with id ${nodeId} not found.`);
            return null;
        }
        const component = componentService.getComponent(node.type);
        if (!component) {
            console.error(`Component for node type ${node.type} not found.`);
            return null;
        }
        return { component, data: node.data };
    }
    // Subclasses will often override or extend these methods:
    static generateCodeForNodes(flow, componentService, targetNodeId, fromStart, variablesAutoNaming) {
        throw new Error('generateCodeForNodes should be implemented by subclass');
    }
    static generateCode(pipelineJson, commands, componentService, variablesAutoNaming) {
        throw new Error('generateCode should be implemented by subclass');
    }
    static generateCodeUntil(pipelineJson, commands, componentService, targetNode, incremental, variablesAutoNaming) {
        throw new Error('generateCodeUntil should be implemented by subclass');
    }
}


/***/ },

/***/ "./lib/BrowseFileDialog.js"
/*!*********************************!*\
  !*** ./lib/BrowseFileDialog.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showBrowseFileDialog: () => (/* binding */ showBrowseFileDialog)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "webpack/sharing/consume/default/react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/filebrowser */ "webpack/sharing/consume/default/@jupyterlab/filebrowser");
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_5__);






const BROWSE_FILE_CLASS = 'amphi-browseFileDialog';
const BROWSE_FILE_OPEN_CLASS = 'amphi-browseFileDialog-open';
const { Text } = antd__WEBPACK_IMPORTED_MODULE_2__.Typography;
/* ───────────────────────── breadcrumbs ───────────────────────── */
class BrowseFileDialogBreadcrumbs extends _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.BreadCrumbs {
    constructor(options) {
        super(options);
        this.model = options.model;
        this.rootPath = options.rootPath;
    }
    onUpdateRequest(msg) {
        super.onUpdateRequest(msg);
        const contents = this.model.manager.services.contents;
        const localPath = contents.localPath(this.model.path);
        if (localPath && this.rootPath && localPath.indexOf(this.rootPath) === 0) {
            const crumbs = document.querySelectorAll(`.${BROWSE_FILE_CLASS} .jp-BreadCrumbs > span[title]`);
            crumbs.forEach(c => {
                var _a;
                const s = c;
                if (s.title.indexOf((_a = this.rootPath) !== null && _a !== void 0 ? _a : '') === 0) {
                    s.className = s.className.replace('amphi-BreadCrumbs-disabled', '').trim();
                }
                else if (s.className.indexOf('amphi-BreadCrumbs-disabled') === -1) {
                    s.className += ' amphi-BreadCrumbs-disabled';
                }
            });
        }
    }
}
/* ─────────────────────── main widget ─────────────────────────── */
class BrowseFileDialog extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.Widget {
    constructor(props) {
        var _a;
        super(props);
        this.switchWidget = null;
        this.showAll = false;
        /* filter definitions */
        this.baseFilter = props.filter || (() => true);
        // The extFilter checks file extensions
        this.extFilter =
            props.extensions && props.extensions.length
                ? (m) => {
                    if (m.type === 'directory')
                        return true; // Always show directories
                    const ext = `.${m.name.split('.').pop().toLowerCase()}`;
                    return props.extensions.includes(ext);
                }
                : (() => true); // If no extensions are provided, show everything
        // Initialize the model with the extension filter
        this.model = new _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.FilterFileBrowserModel({
            manager: props.manager,
            filter: BrowseFileDialog.boolToScore((m) => {
                // Apply base filter first (user-provided filter)
                if (!this.baseFilter(m))
                    return false;
                // Then apply extension filter if not showing all
                if (!this.showAll && m.type !== 'directory') {
                    const ext = `.${m.name.split('.').pop().toLowerCase()}`;
                    return props.extensions && props.extensions.length ?
                        props.extensions.includes(ext) : true;
                }
                return true;
            })
        });
        const layout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.PanelLayout());
        /* breadcrumbs */
        this.breadCrumbs = new BrowseFileDialogBreadcrumbs({
            model: this.model,
            rootPath: props.rootPath
        });
        layout.addWidget(this.breadCrumbs);
        /* toggle switch + label */
        if (props.extensions && props.extensions.length) {
            const container = document.createElement('div');
            // Create a render function that can be called to update the UI
            const renderSwitchUI = (showAllFiles) => {
                react_dom__WEBPACK_IMPORTED_MODULE_1___default().render(react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { marginBottom: '10px' } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.ConfigProvider, { theme: {
                            token: {
                                // Seed Token
                                colorPrimary: '#5F9B97',
                            },
                        } },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { style: { flexShrink: 0 } },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Switch, { checked: showAllFiles, size: "small", style: {
                                        width: '28px',
                                        minWidth: '28px',
                                        height: '16px',
                                        lineHeight: '16px'
                                    }, onChange: (checked) => {
                                        this.showAll = checked;
                                        // Update the filter based on the switch state
                                        this.model.setFilter(BrowseFileDialog.boolToScore((m) => {
                                            // Always apply base filter
                                            if (!this.baseFilter(m))
                                                return false;
                                            // Apply extension filter only when showAll is false and it's a file
                                            if (!checked && m.type !== 'directory') {
                                                const ext = `.${m.name.split('.').pop().toLowerCase()}`;
                                                return props.extensions && props.extensions.length ?
                                                    props.extensions.includes(ext) : true;
                                            }
                                            return true;
                                        }));
                                        // Re-render with the new state
                                        renderSwitchUI(checked);
                                        void this.model.refresh();
                                    } })),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { style: { fontSize: '14px' } }, showAllFiles ? "Show all files" : "Only show relevant files")))), container);
            };
            // Initial render
            renderSwitchUI(this.showAll);
            this.switchWidget = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.Widget({ node: container });
            layout.insertWidget(1, this.switchWidget); // directly under breadcrumbs
        }
        /* directory listing */
        this.directoryListing = new _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.DirListing({ model: this.model });
        this.acceptFileOnDblClick = (_a = props.acceptFileOnDblClick) !== null && _a !== void 0 ? _a : true;
        this.multiselect = !!props.multiselect;
        this.includeDir = !!props.includeDir;
        this.dirListingHandleEvent = this.directoryListing.handleEvent;
        this.directoryListing.handleEvent = (e) => { this.handleEvent(e); };
        layout.addWidget(this.directoryListing);
    }
    /* factory */
    static async init(options) {
        const dlg = new BrowseFileDialog({
            manager: options.manager,
            extensions: options.extensions,
            filter: options.filter || (() => true),
            multiselect: options.multiselect,
            includeDir: options.includeDir,
            rootPath: options.rootPath,
            startPath: options.startPath,
            acceptFileOnDblClick: options.acceptFileOnDblClick
        });
        if (options.startPath) {
            if (!options.rootPath || options.startPath.indexOf(options.rootPath) === 0) {
                await dlg.model.cd(options.startPath);
            }
        }
        else if (options.rootPath) {
            await dlg.model.cd(options.rootPath);
        }
        return dlg;
    }
    /* result */
    getValue() {
        const selected = [];
        for (const item of this.directoryListing.selectedItems()) {
            if (this.includeDir || item.type !== 'directory')
                selected.push(item);
        }
        return selected;
    }
    /* event proxy */
    handleEvent(event) {
        var _a;
        let modifierKey = false;
        if (event instanceof MouseEvent || event instanceof KeyboardEvent) {
            modifierKey = event.shiftKey || event.metaKey;
        }
        switch (event.type) {
            case 'keydown':
            case 'keyup':
            case 'mousedown':
            case 'mouseup':
            case 'click':
                if (this.multiselect || !modifierKey) {
                    this.dirListingHandleEvent.call(this.directoryListing, event);
                }
                break;
            case 'dblclick': {
                const clicked = this.directoryListing.modelForClick(event);
                if ((clicked === null || clicked === void 0 ? void 0 : clicked.type) === 'directory') {
                    this.dirListingHandleEvent.call(this.directoryListing, event);
                }
                else {
                    event.preventDefault();
                    event.stopPropagation();
                    if (this.acceptFileOnDblClick) {
                        (_a = document.querySelector(`.${BROWSE_FILE_OPEN_CLASS} .jp-mod-accept`)) === null || _a === void 0 ? void 0 : _a.click();
                    }
                }
                break;
            }
            default:
                this.dirListingHandleEvent.call(this.directoryListing, event);
                break;
        }
    }
}
/**
 * Helper function to convert a boolean predicate to a score function that the FileBrowserModel accepts
 */
BrowseFileDialog.boolToScore = (pred) => (m) => (pred(m) ? {} : null);
/* ───────────────────────── helper ───────────────────────────── */
const showBrowseFileDialog = async (manager, options) => {
    const body = await BrowseFileDialog.init({
        manager,
        extensions: options.extensions,
        filter: options.filter,
        multiselect: options.multiselect,
        includeDir: options.includeDir,
        rootPath: options.rootPath,
        startPath: options.startPath,
        acceptFileOnDblClick: Object.prototype.hasOwnProperty.call(options, 'acceptFileOnDblClick')
            ? options.acceptFileOnDblClick
            : true
    });
    const dialog = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_3__.Dialog({
        title: 'Select a file',
        body,
        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_3__.Dialog.cancelButton(), _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_3__.Dialog.okButton({ label: 'Select' })]
    });
    dialog.addClass(BROWSE_FILE_CLASS);
    document.body.className += ` ${BROWSE_FILE_OPEN_CLASS}`;
    return dialog.launch().then(result => {
        document.body.className = document.body.className
            .replace(BROWSE_FILE_OPEN_CLASS, '')
            .trim();
        if (options.rootPath && result.button.accept && result.value.length) {
            const root = options.rootPath.endsWith('/') ? options.rootPath : `${options.rootPath}/`;
            result.value.forEach((v) => { v.path = v.path.replace(root, ''); });
        }
        return result;
    });
};


/***/ },

/***/ "./lib/CodeGenerator.js"
/*!******************************!*\
  !*** ./lib/CodeGenerator.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CodeGenerator: () => (/* binding */ CodeGenerator)
/* harmony export */ });
/* harmony import */ var _PipelineService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PipelineService */ "./lib/PipelineService.js");
/* harmony import */ var _BaseCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseCodeGenerator */ "./lib/BaseCodeGenerator.js");
// ================================================
// CodeGenerator.ts
// ================================================


class CodeGenerator extends _BaseCodeGenerator__WEBPACK_IMPORTED_MODULE_1__.BaseCodeGenerator {
    static generateCodeForNodes(flow, componentService, targetNodeId, fromStart, variablesAutoNaming) {
        // Similar logic as your original "generateCodeForNodes" method:
        const codeList = [];
        const incrementalCodeList = [];
        const executedNodes = new Set();
        const uniqueImports = new Set();
        const uniqueDependencies = new Set();
        const functions = new Set();
        const envMap = new Map();
        const connMap = new Map();
        const { nodesToTraverse, nodesMap } = this.computeNodesToTraverse(flow, targetNodeId, componentService);
        // Identify special nodes
        flow.nodes.forEach(node => {
            const type = componentService.getComponent(node.type)._type;
            if (['env_variables', 'env_file'].includes(type)) {
                envMap.set(node.id, node);
            }
            else if (type === 'connection') {
                connMap.set(node.id, node);
            }
        });
        // Build node objects
        const nodeObjects = this.createNodeObjects(flow, componentService, nodesToTraverse, nodesMap, variablesAutoNaming);
        // Process
        for (const nodeObj of nodeObjects) {
            nodeObj.imports.forEach(i => uniqueImports.add(i));
            nodeObj.dependencies.forEach(d => uniqueDependencies.add(d));
            nodeObj.functions.forEach(f => functions.add(f));
            const nodeCode = [
                ...nodeObj.imports,
                ...nodeObj.functions,
                nodeObj.code
            ].join('\n');
            incrementalCodeList.push({ code: nodeCode, nodeId: nodeObj.id });
            codeList.push(nodeObj.code);
            executedNodes.add(nodeObj.id);
            // If it's the target node, handle display code or final try-catch
            if (nodeObj.id === targetNodeId) {
                let displayCode = '';
                if (nodeObj.type.includes('processor') || nodeObj.type.includes('input')) {
                    if (nodeObj.type.includes('documents')) {
                        if (!fromStart) {
                            codeList.length = 0;
                            codeList.push(nodeObj.code);
                            executedNodes.clear();
                            executedNodes.add(nodeObj.id);
                        }
                        displayCode = `\n_amphi_display_documents_as_html(${nodeObj.outputName})`;
                    }
                    else {
                        if (!fromStart) {
                            codeList.length = 0;
                            codeList.push(nodeObj.code);
                            executedNodes.clear();
                            executedNodes.add(nodeObj.id);
                        }
                        displayCode = `\__amphi_display(${nodeObj.outputName}, dfName="${nodeObj.outputName}", nodeId="${targetNodeId}"${nodeObj.runtime !== "local" ? `, runtime="${nodeObj.runtime}"` : ''})`;
                    }
                    codeList.push(displayCode);
                    if (incrementalCodeList.length > 0) {
                        incrementalCodeList[incrementalCodeList.length - 1].code += displayCode;
                    }
                }
                else if (nodeObj.type.includes('output')) {
                    // Wrap code
                    const combined = codeList.join('\n');
                    const indented = combined.split('\n').map(x => `    ${x}`).join('\n');
                    codeList.length = 0;
                    codeList.push('try:\n' + indented);
                    codeList.push('    print("Execution has been successful")\n');
                    codeList.push('except Exception as e:\n');
                    codeList.push('    print(f"Execution failed with error {e}")\n');
                    codeList.push('    raise\n');
                }
            }
        }
        // Handle env/connection code
        let envVariablesCode = '';
        envMap.forEach(node => {
            const comp = componentService.getComponent(node.type);
            const config = node.data;
            envVariablesCode += comp.generateComponentCode({ config });
            comp.provideImports({ config }).forEach(i => uniqueImports.add(i));
        });
        let connectionsCode = '';
        connMap.forEach(node => {
            const comp = componentService.getComponent(node.type);
            const config = node.data;
            connectionsCode += comp.generateComponentCode({ config });
            comp.provideImports({ config }).forEach(i => uniqueImports.add(i));
        });
        // Final build
        const now = new Date();
        const dateString = now.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const dateComment = `# Source code generated by Amphi\n# Date: ${dateString}`;
        const additionalImports = `# Additional dependencies: ${Array.from(uniqueDependencies).join(', ')}`;
        const finalList = [
            dateComment,
            additionalImports,
            ...Array.from(uniqueImports),
            envVariablesCode,
            connectionsCode,
            ...Array.from(functions),
            ...codeList
        ].filter(Boolean);
        const formatted = finalList.map(code => this.formatVariables(code));
        return {
            codeList: formatted,
            incrementalCodeList,
            executedNodes
        };
    }
    static generateCode(pipelineJson, commands, componentService, variablesAutoNaming) {
        const { codeList } = this.generateCodeForNodes(_PipelineService__WEBPACK_IMPORTED_MODULE_0__.PipelineService.filterPipeline(pipelineJson), componentService, 'none', true, variablesAutoNaming);
        return codeList.join('\n');
    }
    static generateCodeUntil(pipelineJson, commands, componentService, targetNode, incremental, variablesAutoNaming) {
        var _a;
        const flow = _PipelineService__WEBPACK_IMPORTED_MODULE_0__.PipelineService.filterPipeline(pipelineJson);
        if (flow.nodes.some(n => !n.data.nameId)) {
            variablesAutoNaming = true;
        }
        const { nodesToTraverse, nodesMap } = this.computeNodesToTraverse(flow, targetNode, componentService);
        let fromStart = false;
        let maxLastUpdated = 0;
        for (const nodeId of nodesToTraverse) {
            if (nodeId === targetNode)
                continue;
            const node = nodesMap.get(nodeId);
            if (!node)
                continue;
            const data = node.data || {};
            const lastUpdated = data.lastUpdated || 0;
            const lastExecuted = data.lastExecuted || 0;
            if (lastUpdated > maxLastUpdated) {
                maxLastUpdated = lastUpdated;
            }
            if (lastUpdated >= lastExecuted) {
                fromStart = true;
                break;
            }
        }
        if (variablesAutoNaming) {
            fromStart = true;
        }
        const { codeList, incrementalCodeList, executedNodes } = this
            .generateCodeForNodes(flow, componentService, targetNode, fromStart, variablesAutoNaming);
        if (fromStart) {
            console.log("Generating code from start (fromStart: true).");
            const command = 'pipeline-metadata-panel:delete-all';
            commands.execute(command, {}).catch(reason => {
                console.error(`Error executing ${command}. Reason: ${reason}`);
            });
        }
        else {
            console.log("No updates in previous nodes. Generating code for target node only.");
        }
        const now = Date.now();
        executedNodes.forEach(id => {
            const node = nodesMap.get(id);
            if (node && node.data) {
                node.data.lastExecuted = now;
            }
        });
        const targetData = (_a = nodesMap.get(targetNode)) === null || _a === void 0 ? void 0 : _a.data;
        if (targetData) {
            targetData.lastExecuted = now;
        }
        return incremental ? incrementalCodeList : codeList;
    }
}


/***/ },

/***/ "./lib/CodeGeneratorDagster.js"
/*!*************************************!*\
  !*** ./lib/CodeGeneratorDagster.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CodeGeneratorDagster: () => (/* binding */ CodeGeneratorDagster)
/* harmony export */ });
/* harmony import */ var _PipelineService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PipelineService */ "./lib/PipelineService.js");
/* harmony import */ var _BaseCodeGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseCodeGenerator */ "./lib/BaseCodeGenerator.js");
// ================================================
// CodeGeneratorDagster.ts
// ================================================


class CodeGeneratorDagster extends _BaseCodeGenerator__WEBPACK_IMPORTED_MODULE_1__.BaseCodeGenerator {
    static generateDagsterCode(pipelineJson, commands, componentService, variablesAutoNaming) {
        console.log("Inside generateDagsterCode method");
        const flow = _PipelineService__WEBPACK_IMPORTED_MODULE_0__.PipelineService.filterPipeline(pipelineJson);
        const { nodesToTraverse, nodesMap, nodeDependencies } = this.computeNodesToTraverse(flow, 'none', componentService);
        const dagsterImports = [
            'import dagster',
            'from dagster import op, job, Out, In, Nothing'
        ];
        const envVariablesCode = this.getEnvironmentVariableCode(pipelineJson, componentService);
        const connectionsCode = this.getConnectionCode(pipelineJson, componentService);
        const opDefinitions = [];
        const uniqueImports = new Set();
        const uniqueDependencies = new Set();
        const uniqueFunctions = new Set();
        // Collect
        for (const nodeId of nodesToTraverse) {
            const node = nodesMap.get(nodeId);
            if (!node)
                continue;
            const config = node.data;
            const component = componentService.getComponent(node.type);
            component.provideImports({ config }).forEach(imp => uniqueImports.add(imp));
            if (typeof component.provideDependencies === 'function') {
                component.provideDependencies({ config }).forEach(d => uniqueDependencies.add(d));
            }
            if (typeof component.provideFunctions === 'function') {
                component.provideFunctions({ config }).forEach(f => uniqueFunctions.add(f));
            }
        }
        // Create ops (naive example)
        for (const nodeId of nodesToTraverse) {
            const node = nodesMap.get(nodeId);
            if (!node)
                continue;
            const config = node.data;
            const component = componentService.getComponent(node.type);
            const componentType = component._type;
            let opName = this.generateReadableName(config.customTitle || node.type);
            let opInputs = [];
            let opOutputs = [];
            let opCode = '';
            // Very naive logic (expand as needed)
            if (/processor/.test(componentType) || componentType.includes('to_documents')) {
                opInputs.push('input_data');
                opOutputs.push('result');
                const originalCode = component.generateComponentCode({
                    config,
                    inputName: 'input_data',
                    outputName: 'result'
                });
                opCode = originalCode;
            }
            else if (componentType.includes('input')) {
                opOutputs.push('result');
                const originalCode = component.generateComponentCode({
                    config,
                    outputName: 'result'
                });
                opCode = originalCode;
            }
            else if (componentType.includes('output')) {
                opInputs.push('input_data');
                const originalCode = component.generateComponentCode({
                    config,
                    inputName: 'input_data'
                });
                opCode = originalCode;
            }
            // Build the definition
            const opDef = `
@op
def ${opName}(${opInputs.join(', ')}):
    """ ${config.customTitle || node.type} """
    ${opCode.split('\n').join('\n    ')}
    ${opOutputs.length > 0 ? 'return result' : 'return'}
`;
            opDefinitions.push(opDef);
        }
        // Build job definition
        const jobDefinition = this.generateDagsterJobDefinition(flow, nodesMap, nodeDependencies, nodesToTraverse);
        // Combine
        const now = new Date();
        const dateString = now.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const dateComment = `# Source code generated by Amphi for Dagster\n# Date: ${dateString}\n`;
        const additionalDeps = `# Additional dependencies: dagster, ${Array.from(uniqueDependencies).join(', ')}\n`;
        const dagsterCode = [
            dateComment,
            additionalDeps,
            dagsterImports.join('\n'),
            '\n',
            Array.from(uniqueImports).join('\n'),
            '\n',
            envVariablesCode,
            '\n',
            connectionsCode,
            ...Array.from(uniqueFunctions),
            ...opDefinitions,
            jobDefinition
        ].join('');
        return this.formatVariables(dagsterCode);
    }
    static generateDagsterJobDefinition(flow, nodesMap, nodeDependencies, nodesToTraverse) {
        const nodeToOp = new Map();
        const processedNodes = new Set();
        const resultVar = new Map();
        for (const nodeId of nodesToTraverse) {
            const node = nodesMap.get(nodeId);
            if (!node)
                continue;
            const config = node.data;
            const opName = this.generateReadableName(config.customTitle || node.type);
            nodeToOp.set(nodeId, opName);
            const rVar = opName.replace('Op', 'Result');
            resultVar.set(nodeId, rVar);
        }
        let jobCode = '\n\n@job\ndef dagster_pipeline():\n';
        const dependencyGraph = new Map();
        for (const edge of flow.edges) {
            if (!nodeToOp.has(edge.source) || !nodeToOp.has(edge.target))
                continue;
            if (!dependencyGraph.has(edge.target)) {
                dependencyGraph.set(edge.target, []);
            }
            dependencyGraph.get(edge.target).push(edge.source);
        }
        const startingNodes = nodesToTraverse.filter(id => !dependencyGraph.has(id) || dependencyGraph.get(id).length === 0);
        for (const nodeId of startingNodes) {
            const op = nodeToOp.get(nodeId);
            const r = resultVar.get(nodeId);
            if (!op || !r)
                continue;
            jobCode += `    ${r} = ${op}()\n`;
            processedNodes.add(nodeId);
        }
        for (const nodeId of nodesToTraverse) {
            if (processedNodes.has(nodeId))
                continue;
            const op = nodeToOp.get(nodeId);
            const r = resultVar.get(nodeId);
            const deps = dependencyGraph.get(nodeId) || [];
            if (!op)
                continue;
            if (deps.length === 0) {
                jobCode += `    ${r} = ${op}()\n`;
            }
            else if (deps.length === 1) {
                const src = resultVar.get(deps[0]);
                jobCode += `    ${r} = ${op}(${src})\n`;
            }
            else {
                const srcList = deps.map(d => resultVar.get(d)).join(', ');
                jobCode += `    ${r} = ${op}(${srcList})\n`;
            }
            processedNodes.add(nodeId);
        }
        return jobCode;
    }
    static generateReadableName(rawName) {
        const camelCaseName = rawName
            .split(/(?=[A-Z])/)
            .map((word, index) => index === 0
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');
        return camelCaseName + 'Op';
    }
}


/***/ },

/***/ "./lib/DndProviderWrapper.js"
/*!***********************************!*\
  !*** ./lib/DndProviderWrapper.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dnd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dnd */ "webpack/sharing/consume/default/react-dnd/react-dnd");
/* harmony import */ var react_dnd_html5_backend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dnd-html5-backend */ "webpack/sharing/consume/default/react-dnd-html5-backend/react-dnd-html5-backend");
// DndProviderWrapper.tsx



const DndProviderWrapper = ({ children }) => {
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [isReady, setIsReady] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        // Ensure the ref is attached before initializing DndProvider
        if (containerRef.current) {
            setIsReady(true);
        }
    }, []);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { ref: containerRef }, isReady && containerRef.current && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_dnd__WEBPACK_IMPORTED_MODULE_1__.DndProvider, { backend: react_dnd_html5_backend__WEBPACK_IMPORTED_MODULE_2__.HTML5Backend, options: { rootElement: containerRef.current } }, children))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DndProviderWrapper);


/***/ },

/***/ "./lib/ExecutionBadge.js"
/*!*******************************!*\
  !*** ./lib/ExecutionBadge.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExecutionBadge: () => (/* binding */ ExecutionBadge)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
// ExecutionBadge.tsx
// Visual badge component to display execution status on pipeline components


/**
 * Badge component that displays execution status with colored dots
 */
const ExecutionBadge = ({ execution }) => {
    if (!execution || execution.status === 'idle') {
        return null;
    }
    const getStatusConfig = () => {
        switch (execution.status) {
            case 'running':
                return { status: 'processing', color: '#1890ff' };
            case 'success':
                return { status: 'success', color: '#52c41a' };
            case 'failed':
                return { status: 'error', color: '#ff4d4f' };
            default:
                return { status: 'default', color: '#d9d9d9' };
        }
    };
    const { status, color } = getStatusConfig();
    console.log(`[ExecutionBadge] Rendering badge for status: ${execution.status}, using badge status: ${status}, color: ${color}`);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Badge, { status: status, color: color }));
};


/***/ },

/***/ "./lib/ExecutionToken.js"
/*!*******************************!*\
  !*** ./lib/ExecutionToken.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IPipelineExecutionToken: () => (/* binding */ IPipelineExecutionToken)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// ExecutionToken.ts
// Token for pipeline execution service communication

/**
 * Token for the pipeline execution service
 */
const IPipelineExecutionToken = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@amphi/pipeline:execution-service');


/***/ },

/***/ "./lib/PipelineComponent.js"
/*!**********************************!*\
  !*** ./lib/PipelineComponent.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PipelineComponent: () => (/* binding */ PipelineComponent)
/* harmony export */ });
function PipelineComponent() {
    return class {
        constructor() { }
        static getInstance() {
            if (!this.instance) {
                this.instance = new this();
            }
            return this.instance;
        }
        static get Name() {
            const instance = this.getInstance();
            return instance._name;
        }
        static get Type() {
            const instance = this.getInstance();
            return instance._type;
        }
        // Static getter for the icon
        static get Icon() {
            const instance = this.getInstance();
            return instance._icon;
        }
        // Static getter for the default config
        static get Default() {
            const instance = this.getInstance();
            return instance._default;
        }
        // Static getter for the default config
        static get Form() {
            const instance = this.getInstance();
            return instance._form;
        }
        // Static method to update the type
        static updateType(newType) {
            const instance = this.getInstance();
            instance._type = newType;
        }
    };
}


/***/ },

/***/ "./lib/PipelineService.js"
/*!********************************!*\
  !*** ./lib/PipelineService.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PipelineService: () => (/* binding */ PipelineService)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);

class PipelineService {
    static filterPipeline(pipelineJson) {
        const pipeline = JSON.parse(pipelineJson);
        const pipelineFlow = pipeline.pipelines[0].flow;
        const filteredNodes = pipelineFlow.nodes.map(({ id, type, data }) => ({ id, type, data }));
        const filteredEdges = pipelineFlow.edges.map(({ id, source, target, targetHandle }) => ({ id, source, target, targetHandle }));
        const flow = {
            "nodes": filteredNodes,
            "edges": filteredEdges
        };
        return flow;
    }
    // Function to retrieve the names of packages
    static extractPackageNames(imports) {
        const standardLibraries = new Set(['json', 'pandas']);
        return imports.map((imp) => {
            let packageName = "";
            if (imp.startsWith("import ")) {
                packageName = imp.split(" ")[1].split(" as ")[0]; // For "import packageName" format
            }
            else if (imp.startsWith("from ")) {
                packageName = imp.split(" ")[1]; // For "from packageName import something" format
            }
            else {
                packageName = imp; // Assuming direct package name
            }
            if (!standardLibraries.has(packageName)) {
                return packageName;
            }
            return ""; // Return an empty string for packages in the standardLibraries set
        }).filter((pkgName, index, self) => pkgName && self.indexOf(pkgName) === index); // Removing empty strings, duplicates
    }
    static findNextNodeIds(flow, nodeId) {
        return flow.edges
            .filter(edge => edge.source === nodeId)
            .map(edge => edge.target);
    }
    // Function to generate pip install commands from a list of package names
    static getInstallCommandsFromPackageNames(packageNames) {
        return packageNames
            .filter(pkgName => pkgName.trim() !== '')
            .map(pkgName => {
            if (pkgName.includes('[')) {
                // Direct pip install for packages with extras (e.g., `ibis-framework[snowflake]`)
                return `!pip install ${pkgName} -q -q`;
            }
            else {
                // Standard check for regular packages
                return `
try:
    __import__("${pkgName}")
    print('${pkgName} is already installed')
except ImportError:
    !pip install ${pkgName} -q -q`;
            }
        });
    }
    static extractPythonImportPackages(code) {
        // Regular expression to match Python import statements
        const importRegex = /^(import .+|from .+? import .+)/gm;
        let matches = code.match(importRegex) || [];
        // Process each match to format correctly
        return matches.map((importStatement) => {
            if (importStatement.startsWith('from')) {
                // If the statement starts with 'from', extract the package part before the first dot
                return importStatement.split(' ')[1].split('.')[0];
            }
            else {
                // Otherwise, it's a regular import, extract everything after 'import '
                return importStatement.split(' ')[1];
            }
        });
    }
    /**
     * Check if a given file is allowed to be added to the pipeline
     * @param item
     */
    static getPipelineRelativeNodePath(pipelinePath, nodePath) {
        const relativePath = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.relative(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.dirname(pipelinePath), nodePath);
        return relativePath;
    }
    static getComponentIdForFileExtension(fileExtension, componentService, defaultEngineBackend) {
        var _a, _b, _c, _d;
        // Extract file extension from item.name
        if (!fileExtension)
            return { id: null, default: null }; // Return nulls if there is no file extension
        // Retrieve all components
        const components = componentService.getComponents();
        // List to store matching components
        const matchingComponents = [];
        // Iterate through all components
        for (const component of components) {
            // Check if the component has the _fileDrop attribute and it contains the file extension
            if (component._fileDrop && component._fileDrop.includes(fileExtension.toLowerCase())) {
                // Store the component in the list if the file extension matches
                matchingComponents.push(component);
            }
        }
        if (matchingComponents.length === 1) {
            const component = matchingComponents[0];
            return { id: component._id, default: component._default || null };
        }
        // If multiple matching components are found, check for the one with backend.engine matching defaultEngineBackend
        for (const component of matchingComponents) {
            console.log("Component._default?.backend?.engine: %o", (_b = (_a = component._default) === null || _a === void 0 ? void 0 : _a.backend) === null || _b === void 0 ? void 0 : _b.engine);
            if (((_d = (_c = component._default) === null || _c === void 0 ? void 0 : _c.backend) === null || _d === void 0 ? void 0 : _d.engine) === defaultEngineBackend) {
                return { id: component._id, default: component._default || null };
            }
        }
        // If no match is found for defaultEngineBackend, return the first matching component
        if (matchingComponents.length > 0) {
            const component = matchingComponents[0];
            return { id: component._id, default: component._default || null };
        }
        // Return nulls if no matching component is found
        return { id: null, default: null };
    }
    static getLastUpdatedInPath(flow, targetId) {
        const visited = new Set();
        const lastUpdatedList = [];
        const findNodesInPath = (nodeId) => {
            if (visited.has(nodeId)) {
                return;
            }
            visited.add(nodeId);
            const node = flow.nodes.find(n => n.id === nodeId);
            if (node && node.data && node.data.lastUpdated) {
                lastUpdatedList.push(node.data.lastUpdated);
            }
            const dependencies = flow.edges
                .filter(edge => edge.target === nodeId)
                .map(edge => edge.source);
            dependencies.forEach(dependency => {
                findNodesInPath(dependency);
            });
        };
        findNodesInPath(targetId);
        return lastUpdatedList;
    }
    static getRelativePath(pipelinePath, selectedFilePath) {
        const pipelineDir = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.dirname(pipelinePath);
        const relativePath = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.relative(pipelineDir, selectedFilePath);
        return relativePath;
    }
    static getEnvironmentVariables(pipelineJson) {
        const flow = PipelineService.filterPipeline(pipelineJson);
        const envNodes = flow.nodes.filter(node => node.type === 'envVariables' || node.type === 'envFile');
        const variablesList = envNodes.reduce((acc, node) => {
            const variables = node.data.variables || [];
            return acc.concat(variables.map(variable => variable.name));
        }, []);
        return variablesList;
    }
    static getConnections(pipelineJson) {
        const flow = PipelineService.filterPipeline(pipelineJson);
        const connectionsNodes = flow.nodes.filter(node => node.type === 'connection');
        const connectionsList = connectionsNodes.reduce((acc, node) => {
            return acc.concat(node.data || []);
        }, []);
        // const envFileNodes = flow.nodes.filter(node => node.type === 'envFile' );
        return connectionsList;
    }
    static extractConnections(componentService) {
        const components = componentService.getComponents();
        const connectionMap = {};
        components.forEach(component => {
            if (component._form && component._form.fields) {
                component._form.fields.forEach(field => {
                    if (field.connection && !field.ignoreConnection) {
                        if (!connectionMap[field.connection]) {
                            connectionMap[field.connection] = [];
                        }
                        const existingField = connectionMap[field.connection].find(f => f.id === field.id);
                        if (!existingField) {
                            connectionMap[field.connection].push({ id: field.id, label: field.label });
                        }
                    }
                });
            }
        });
        return Object.keys(connectionMap).map(connection => ({
            connection,
            fields: connectionMap[connection]
        }));
    }
}
PipelineService.findStartNode = (flow, componentService) => {
    const targetMap = new Set();
    flow.edges.forEach(edge => targetMap.add(edge.target));
    for (const node of flow.nodes) {
        const nodeType = componentService.getComponent(node.type)._type;
        if (!targetMap.has(node.id) && (nodeType === "pandas_df_input" || nodeType === "ibis_df_input")) {
            return node.id;
        }
    }
    return null;
};
PipelineService.getNodeById = (pipelineJson, nodeId) => {
    const pipeline = JSON.parse(pipelineJson);
    const pipelineFlow = pipeline.pipelines[0].flow;
    const node = pipelineFlow.nodes.find((n) => n.id === nodeId);
    if (!node) {
        return null; // Return null if the node is not found
    }
    return node;
};
PipelineService.findStartNodes = (flow, componentService) => {
    const targetMap = new Set();
    flow.edges.forEach(edge => targetMap.add(edge.target));
    const startNodes = [];
    for (const node of flow.nodes) {
        const nodeType = componentService.getComponent(node.type)._type;
        if (!targetMap.has(node.id) && nodeType === "pandas_df_input") {
            startNodes.push(node.id);
            if (startNodes.length === 2) {
                // If we've found two start nodes, assume it's the double processor case
                return startNodes;
            }
        }
    }
    if (startNodes.length === 1) {
        // If there's only one start node, return it as an array
        return startNodes;
    }
    // If no start nodes are found, return an empty array
    return [];
};
PipelineService.findPreviousNodeId = (flow, nodeId) => {
    // Find the ID of the previous node
    let previousNodeId = '';
    flow.edges.forEach(edge => {
        if (edge.target === nodeId) {
            previousNodeId = edge.source;
        }
    });
    return previousNodeId;
};
PipelineService.findMultiplePreviousNodeIds = (flow, nodeId) => {
    const previousNodesMap = new Map();
    // Group incoming edges by targetHandle
    flow.edges.forEach(edge => {
        if (edge.target === nodeId) {
            const handle = edge.targetHandle || 'default'; // Fallback to 'default' if no handle
            if (!previousNodesMap.has(handle)) {
                previousNodesMap.set(handle, []);
            }
            previousNodesMap.get(handle).push(edge.source);
        }
    });
    // Sort the map by targetHandle and flatten the result
    const sortedPreviousNodeIds = Array.from(previousNodesMap.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([_, nodeIds]) => nodeIds)
        .reduce((acc, val) => acc.concat(val), []);
    return sortedPreviousNodeIds;
};
PipelineService.findTwoPreviousNodeIds = (flow, nodeId) => {
    let previousNodeIds = [];
    flow.edges.forEach(edge => {
        if (edge.target === nodeId) {
            previousNodeIds.push(edge.source);
        }
    });
    if (previousNodeIds.length !== 2) {
        throw new Error("Exactly two previous nodes are not found.");
    }
    return previousNodeIds;
};
PipelineService.formatVarName = (input) => {
    return input.replace(/([a-z])([A-Z])/g, '$1_$2') // Add underscore before capital letters
        .toUpperCase() // Convert to uppercase
        .replace(/\s+/g, '_') // Replace spaces with underscore
        .replace(/\./g, '_'); // Replace dots with underscore
};


/***/ },

/***/ "./lib/RequestService.js"
/*!*******************************!*\
  !*** ./lib/RequestService.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RequestService: () => (/* binding */ RequestService)
/* harmony export */ });
/* harmony import */ var _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CodeGenerator */ "./lib/CodeGenerator.js");
/* harmony import */ var _PipelineService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PipelineService */ "./lib/PipelineService.js");


class RequestService {
    static retrieveDataframeColumns(event, context, commands, componentService, setItems, setLoadings, nodeId, inputNb, previousNodes) {
        setLoadings(true);
        const flow = _PipelineService__WEBPACK_IMPORTED_MODULE_1__.PipelineService.filterPipeline(context.model.toString());
        let codeList;
        let code = '';
        try {
            // Determine the reference node to use
            let refNodeId = previousNodes ? _PipelineService__WEBPACK_IMPORTED_MODULE_1__.PipelineService.findMultiplePreviousNodeIds(flow, nodeId)[inputNb] : nodeId;
            const nodesMap = new Map(flow.nodes.map(node => [node.id, node]));
            // Check if the previous node has already been executed recently
            const refNode = nodesMap.get(refNodeId);
            if (refNode) {
                const { lastUpdated, lastExecuted, nameId } = refNode.data || {};
                // If the node has been executed after its last update, skip code generation
                // console.log("lastExecuted %o, type: %s", lastExecuted, typeof lastExecuted);
                // console.log("lastUpdated %o, type: %s", lastUpdated, typeof lastUpdated);
                if (lastExecuted >= lastUpdated) {
                    console.log("Skip generation");
                    const dataframeVar = nameId || refNodeId;
                    const codeToFetchContent = `print(_amphi_metadatapanel_getcontentof(${dataframeVar}))`;
                    const future = context.sessionContext.session.kernel.requestExecute({ code: codeToFetchContent });
                    future.onIOPub = msg => {
                        if (msg.header.msg_type === 'stream') {
                            const streamMsg = msg;
                            const output = streamMsg.content.text;
                            const regex = /([^,]+)\s+\(([^,]+(?:\[[^\]]+\])?),\s*(named|unnamed)\)/g;
                            const newItems = [];
                            let match;
                            while ((match = regex.exec(output)) !== null) {
                                const [_, name, type, namedStatus] = match;
                                newItems.push({
                                    value: name.trim(),
                                    label: name.trim(),
                                    type: type.trim(),
                                    named: namedStatus.trim() === 'named'
                                });
                            }
                            setItems(items => {
                                const itemSet = new Set(items.map(item => item.value));
                                const uniqueItems = newItems.filter(newItem => !itemSet.has(newItem.value));
                                return [...items, ...uniqueItems];
                            });
                            setLoadings(false);
                        }
                        else if (msg.header.msg_type === 'error') {
                            setLoadings(false);
                            const errorMsg = msg;
                            console.error(`Received error: ${errorMsg.content.ename}: ${errorMsg.content.evalue}`);
                        }
                    };
                    console.log("return");
                    return; // Skip further processing since data was fetched from cache
                }
            }
            // If not recently executed, generate code
            codeList = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.generateCodeUntil(context.model.toString(), commands, componentService, refNodeId, false, false);
            code = codeList.join('\n');
        }
        catch (error) {
            console.error("Error generating code.", error);
            code = null;
            setLoadings(false);
        }
        const lines = code.split('\n');
        let output_df = lines.pop();
        const match = output_df.match(/__amphi_display\(([^,]*)/);
        output_df = match ? match[1] : null;
        if (output_df && output_df.trim() && output_df.trim().split(' ').length === 1) {
            code = lines.join('\n');
            const future = context.sessionContext.session.kernel.requestExecute({ code: code });
            future.onReply = reply => {
                if (reply.content.status == "ok") {
                    const future2 = context.sessionContext.session.kernel.requestExecute({ code: `print(_amphi_metadatapanel_getcontentof(${output_df}))` });
                    future2.onIOPub = msg => {
                        if (msg.header.msg_type === 'stream') {
                            const streamMsg = msg;
                            const output = streamMsg.content.text;
                            const regex = /([^,]+)\s+\(([^,]+),\s*(named|unnamed)\)/g;
                            const newItems = [];
                            let match;
                            while ((match = regex.exec(output)) !== null) {
                                const [_, name, type, namedStatus] = match;
                                newItems.push({
                                    value: name.trim(),
                                    label: name.trim(),
                                    type: type.trim(),
                                    named: namedStatus.trim() === 'named'
                                });
                            }
                            setItems(items => {
                                const itemSet = new Set(items.map(item => item.value));
                                const uniqueItems = newItems.filter(newItem => !itemSet.has(newItem.value));
                                return [...items, ...uniqueItems];
                            });
                            setLoadings(false);
                        }
                        else if (msg.header.msg_type === 'error') {
                            setLoadings(false);
                            const errorMsg = msg;
                            console.error(`Received error: ${errorMsg.content.ename}: ${errorMsg.content.evalue}`);
                        }
                    };
                }
                else {
                    setLoadings(false);
                }
            };
        }
        else {
            setLoadings(false);
        }
    }
    ;
    static retrieveDataSample(context, setLoadings, commands, setSample, componentService, nodeId, inputNb, previousNodes) {
        setLoadings(true);
        const flow = _PipelineService__WEBPACK_IMPORTED_MODULE_1__.PipelineService.filterPipeline(context.model.toString());
        let codeList;
        let code = '';
        // Retrieve the previous nodes
        const prevNodesList = _PipelineService__WEBPACK_IMPORTED_MODULE_1__.PipelineService.findMultiplePreviousNodeIds(flow, nodeId);
        const prevNodes = prevNodesList[inputNb];
        if (prevNodes == null) {
            console.log("No previous nodes found.");
            setSample('No inputs');
            setLoadings(false);
            return;
        }
        try {
            let refNodeId = previousNodes ? prevNodes : nodeId;
            codeList = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.generateCodeUntil(context.model.toString(), commands, componentService, refNodeId, false, false);
            code = codeList.join('\n');
            console.log("Generated code:", code);
        }
        catch (error) {
            console.error('Error generating code.', error);
            setSample("No sample available.");
            setLoadings(false);
            return;
        }
        // Helper function to convert HTML table to CSV
        const tableToCSV = (tableElement) => {
            const rows = tableElement.querySelectorAll('tr');
            const csvRows = [];
            rows.forEach((row) => {
                const cells = row.querySelectorAll('th, td');
                const rowData = [];
                cells.forEach((cell) => {
                    rowData.push((cell.textContent || '').trim().replace(/\r?\n|\r/g, ''));
                });
                csvRows.push(rowData.join(','));
            });
            return csvRows.join('\n');
        };
        console.log("Executing code in Jupyter Kernel...");
        const future = context.sessionContext.session.kernel.requestExecute({ code });
        future.onIOPub = (msg) => {
            if (msg.header.msg_type === 'stream') {
                console.log("Stream output received");
            }
            else if (msg.header.msg_type === 'execute_result' || msg.header.msg_type === 'display_data') {
                const content = msg.content;
                if (content.data['text/html']) {
                    let htmlContent;
                    if (Array.isArray(content.data['text/html'])) {
                        htmlContent = content.data['text/html'].join('');
                    }
                    else if (typeof content.data['text/html'] === 'string') {
                        htmlContent = content.data['text/html'];
                    }
                    else {
                        console.error('Invalid content format received.');
                        setSample("No sample available.");
                        return;
                    }
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlContent, 'text/html');
                    const tableElement = doc.querySelector('table');
                    if (tableElement) {
                        const csvData = tableToCSV(tableElement);
                        setSample(csvData);
                        console.log("Retrieved Data Sample (CSV):", csvData);
                    }
                    else {
                        setSample("No sample available.");
                    }
                }
                else {
                    setSample("No sample available.");
                }
            }
            else if (msg.header.msg_type === 'error') {
                const errorMsg = msg;
                console.error(`Execution error: ${errorMsg.content.ename}: ${errorMsg.content.evalue}`);
                setSample("Error retrieving data sample.");
            }
        };
        future.onDone = () => {
            setLoadings(false);
        };
    }
    static executePythonCode(code, context, setItems, setLoading) {
        setLoading(true);
        // Execute the provided Python code
        const future = context.sessionContext.session.kernel.requestExecute({ code: code });
        future.onIOPub = msg => {
            if (msg.header.msg_type === 'stream') {
                // Handle standard output from print statements
                const streamMsg = msg;
                const output = streamMsg.content.text;
                // Assume the output is a comma-separated list
                const itemsArray = output.split(',').map(item => item.trim());
                const newItems = itemsArray.map((item) => ({
                    value: item,
                    label: item,
                    type: 'python',
                    named: false,
                }));
                setItems(newItems);
                setLoading(false);
            }
            else if (msg.header.msg_type === 'execute_result' || msg.header.msg_type === 'display_data') {
                // Handle output from the last expression in the code cell
                const dataMsg = msg;
                const data = dataMsg.content.data['text/plain'];
                // Clean the data string and parse it
                const cleanedData = data.replace(/['"\[\]]/g, '');
                const itemsArray = cleanedData.split(',').map(item => item.trim());
                const newItems = itemsArray.map((item) => ({
                    value: item,
                    label: item,
                    type: 'python',
                    named: false,
                }));
                setItems(newItems);
                setLoading(false);
            }
            else if (msg.header.msg_type === 'error') {
                // Handle execution errors
                setLoading(false);
                const errorMsg = msg;
                const errorOutput = errorMsg.content;
                console.error(`Received error: ${errorOutput.ename}: ${errorOutput.evalue}`);
            }
        };
        future.onReply = reply => {
            if (reply.content.status !== 'ok') {
                setLoading(false);
            }
        };
    }
    static retrieveTableList(event, schemaName, query, context, componentService, setList, setLoadings, nodeId) {
        setLoadings(true);
        // Escape and replace schema in the query
        let escapedQuery = query.replace(/"/g, '\\"');
        escapedQuery = escapedQuery.replace(/{{schema}}/g, schemaName);
        // Get environment and connection code
        const envVariableCode = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.getEnvironmentVariableCode(context.model.toString(), componentService);
        const connectionCode = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.getConnectionCode(context.model.toString(), componentService);
        // Get component and data for the node
        const { component, data } = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.getComponentAndDataForNode(nodeId, componentService, context.model.toString());
        if (!component) {
            console.error("Component or data not found.");
            setLoadings(false);
            return;
        }
        // Get the dependencies and imports from the component
        const dependencies = component.provideDependencies({ config: data });
        const imports = component.provideImports({ config: data });
        // Generate the dependencies string
        const dependencyString = dependencies.join(' ');
        // Generate the import statements string (one per line)
        const importStatements = imports.map((imp) => `${imp}`).join('\n');
        // Build the Python code string
        let code = `
!pip install --quiet ${dependencyString} --disable-pip-version-check
${importStatements}
${envVariableCode}
${connectionCode}

query = """
${escapedQuery}
"""
${component.generateDatabaseConnectionCode({ config: data, connectionName: "engine" })}

tables = pd.read_sql(query, con=engine)
tables.iloc[:, 0] = tables.iloc[:, 0].str.strip()  # Strip leading/trailing spaces
formatted_output = ", ".join(tables.iloc[:, 0].tolist())
print(formatted_output)
`;
        // Format any remaining variables in the code
        code = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.formatVariables(code);
        const future = context.sessionContext.session.kernel.requestExecute({ code: code });
        future.onReply = reply => {
            if (reply.content.status == "ok") {
            }
            else if (reply.content.status == "error") {
                setLoadings(false);
            }
            else if (reply.content.status == "abort") {
                setLoadings(false);
            }
            else {
                setLoadings(false);
            }
        };
        future.onIOPub = msg => {
            if (msg.header.msg_type === 'stream') {
                const streamMsg = msg;
                // Check if the stream message is from 'stdout'
                if (streamMsg.content.name === 'stdout') {
                    const output = streamMsg.content.text;
                    const tables = output.split(', ');
                    const newItems = tables.map(tableName => {
                        const trimmedTableName = tableName.trim(); // Trim leading/trailing spaces
                        return {
                            input: {},
                            value: trimmedTableName,
                            key: trimmedTableName,
                            label: trimmedTableName,
                            type: 'table'
                        };
                    });
                    setList((items) => {
                        const existingKeys = new Set(items.map((item) => item.key));
                        const uniqueItems = newItems.filter(newItem => !existingKeys.has(newItem.key));
                        return [...items, ...uniqueItems];
                    });
                    setLoadings(false);
                }
            }
            else if (msg.header.msg_type === 'error') {
                setLoadings(false);
                const errorMsg = msg;
                const errorOutput = errorMsg.content;
                console.error(`Received error: ${errorOutput.ename}: ${errorOutput.evalue}`);
            }
        };
    }
    ;
    static retrieveTableColumns(event, schemaName, tableName, query, pythonExtraction, context, componentService, setDataSource, setLoadings, nodeId) {
        setLoadings(true);
        // Escape and replace schema and table in the query
        let escapedQuery = query.replace(/"/g, '\\"');
        escapedQuery = escapedQuery
            .replace(/{{schema}}/g, schemaName)
            .replace(/{{table}}/g, tableName);
        // Get environment and connection code
        const envVariableCode = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.getEnvironmentVariableCode(context.model.toString(), componentService);
        const connectionCode = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.getConnectionCode(context.model.toString(), componentService);
        // Get the component and data for the node
        const { component, data } = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.getComponentAndDataForNode(nodeId, componentService, context.model.toString());
        if (!component) {
            console.error('Component or data not found.');
            setLoadings(false);
            return;
        }
        // Get the dependencies and imports from the component
        const dependencies = component.provideDependencies({ config: data });
        const imports = component.provideImports({ config: data });
        // Generate the dependencies string
        const dependencyString = dependencies.join(' ');
        // Generate the import statements string (one per line)
        const importStatements = imports.map((imp) => `${imp}`).join('\n');
        // Build the Python code string
        let code = `
!pip install --quiet ${dependencyString} --disable-pip-version-check
${importStatements}
${envVariableCode}
${connectionCode}
  
query = """
${escapedQuery}
"""
${component.generateDatabaseConnectionCode({ config: data, connectionName: 'engine' })}
schema = pd.read_sql(query, con=engine)

${pythonExtraction}
`;
        // Format any remaining variables in the code
        code = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.formatVariables(code);
        const future = context.sessionContext.session.kernel.requestExecute({ code: code });
        future.onReply = (reply) => {
            if (reply.content.status == 'ok') {
                // Execution was successful
            }
            else {
                setLoadings(false);
            }
        };
        future.onIOPub = (msg) => {
            if (msg.header.msg_type === 'stream') {
                const streamMsg = msg;
                // Check if the stream message is from 'stdout'
                if (streamMsg.content.name === 'stdout') {
                    const output = streamMsg.content.text;
                    const regex = /([^\s,]+)\s+\(((?:[^()]+|\([^)]*\))*)\)/g;
                    const newItems = [];
                    let match;
                    while ((match = regex.exec(output)) !== null) {
                        const [_, name, type] = match;
                        newItems.push({
                            input: {},
                            value: name,
                            key: name,
                            type: type.toUpperCase(),
                        });
                    }
                    setDataSource((items) => {
                        // Create a set of existing item keys
                        const existingKeys = new Set(items.map((item) => item.key));
                        // Filter newItems to ensure unique keys
                        const uniqueItems = newItems.filter((newItem) => !existingKeys.has(newItem.key));
                        return [...items, ...uniqueItems];
                    });
                    setLoadings(false);
                }
            }
            else if (msg.header.msg_type === 'error') {
                setLoadings(false);
                const errorMsg = msg;
                const errorOutput = errorMsg.content;
                console.error(`Received error: ${errorOutput.ename}: ${errorOutput.evalue}`);
            }
        };
    }
    static retrieveSheetNames(event, context, componentService, setList, setLoadings, nodeId) {
        var _a, _b;
        setLoadings(true);
        try {
            // Get environment and connection code
            const envVariableCode = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.getEnvironmentVariableCode(context.model.toString(), componentService);
            // Get component and data for the node
            const { component, data } = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.getComponentAndDataForNode(nodeId, componentService, context.model.toString());
            if (!component) {
                throw new Error("Component or data not found.");
            }
            // Check if filePath exists
            if (!data.filePath) {
                throw new Error("filePath is missing in the node data.");
            }
            // Determine the backend prefix
            const backendPrefix = (_b = (_a = data.backend) === null || _a === void 0 ? void 0 : _a.prefix) !== null && _b !== void 0 ? _b : "pd";
            // Generate Python code using the component
            const generatedCode = component.generateComponentCode({
                config: { ...data },
                outputName: "excel_file",
            });
            // Get the dependencies and imports from the component
            const dependencies = component.provideDependencies({ config: data });
            const imports = component.provideImports({ config: data });
            const excelOptions = { ...data.excelOptions };
            const optionsString = component.generateOptionsCode(excelOptions);
            let filteredOptions = optionsString
                .split(",")
                .filter(option => option.trim().startsWith("engine"))
                .join(",");
            // Build the Python code string
            let code = `
!pip install --quiet ${dependencies.join(" ")} --disable-pip-version-check
${imports.map((imp) => `${imp}`).join("\n")}
${envVariableCode}

excel_obj = pd.ExcelFile("${data.filePath}"${filteredOptions ? `, ${filteredOptions}` : ''})
sheet_names = excel_obj.sheet_names
print(", ".join(sheet_names))
`;
            // Format variables in the code
            code = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.formatVariables(code);
            const future = context.sessionContext.session.kernel.requestExecute({ code });
            // Handle response onReply
            future.onReply = (reply) => {
                if (reply.content.status !== "ok") {
                    setLoadings(false);
                    console.error("Execution failed:", reply.content);
                    return;
                }
            };
            // Handle output messages
            future.onIOPub = (msg) => {
                if (msg.header.msg_type === "stream") {
                    const streamMsg = msg;
                    if (streamMsg.content.name === "stdout") {
                        const output = streamMsg.content.text;
                        const sheets = output.split(", ");
                        const newItems = sheets.map((sheetName) => ({
                            input: {},
                            value: sheetName.trim(),
                            key: sheetName.trim(),
                            label: sheetName.trim(),
                            type: "sheet",
                        }));
                        setList((items) => {
                            const existingKeys = new Set(items.map((item) => item.key));
                            const uniqueItems = newItems.filter((newItem) => !existingKeys.has(newItem.key));
                            return [...items, ...uniqueItems];
                        });
                        setLoadings(false);
                    }
                }
                else if (msg.header.msg_type === "error") {
                    setLoadings(false);
                    const errorMsg = msg.content.evalue;
                    console.error(`Error: ${errorMsg}`);
                }
            };
            // Ensure loading stops in case of any unforeseen issue
            future.onDone = () => {
                setLoadings(false);
            };
        }
        catch (error) {
            console.error("Error in retrieveSheetNames:", error);
            setLoadings(false);
        }
    }
    static retrieveEnvVariables(context, setDataSource, setLoadings, nodeId) {
        setLoadings(true);
        let code = `
!pip install --quiet python-dotenv --disable-pip-version-check
from dotenv import dotenv_values
  
env_vars = dotenv_values(".env")
formatted_output = ", ".join([f"{k} ({v})" for k, v in env_vars.items()])
print(formatted_output)
`;
        // Replace connection string
        code = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.formatVariables(code);
        const future = context.sessionContext.session.kernel.requestExecute({ code: code });
        future.onReply = reply => {
            if (reply.content.status == "ok") {
            }
            else if (reply.content.status == "error") {
                setLoadings(false);
            }
            else if (reply.content.status == "abort") {
                setLoadings(false);
            }
            else {
                setLoadings(false);
            }
        };
        future.onIOPub = msg => {
            if (msg.header.msg_type === 'stream') {
                const streamMsg = msg;
                const output = streamMsg.content.text;
                const regex = /([^\s,]+)\s+\(((?:[^()]+|\([^)]*\))*)\)/g;
                const newItems = [];
                let match;
                while ((match = regex.exec(output)) !== null) {
                    const [_, name, value] = match;
                    newItems.push({
                        input: {},
                        value: name,
                        key: name,
                        type: value
                    });
                }
                setDataSource((items) => {
                    const existingKeys = new Set(items.map((item) => item.key));
                    const uniqueItems = newItems.filter((newItem) => !existingKeys.has(newItem.key));
                    return [...items, ...uniqueItems];
                });
                setLoadings(false);
            }
            else if (msg.header.msg_type === 'error') {
                setLoadings(false);
                const errorMsg = msg;
                const errorOutput = errorMsg.content;
                console.error(`Received error: ${errorOutput.ename}: ${errorOutput.evalue}`);
            }
        };
    }
    ;
    static retrieveCollectionsList(event, schemaName, query, context, componentService, setList, setLoadings, nodeId) {
        setLoadings(true);
        // Prepare query as a regex filter; default to match all
        const rawQuery = query !== null && query !== void 0 ? query : ".*";
        let escapedQuery = rawQuery.replace(/"/g, '\\"');
        escapedQuery = escapedQuery.replace(/{{schema}}/g, schemaName);
        // Get environment and connection code
        const envVariableCode = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.getEnvironmentVariableCode(context.model.toString(), componentService);
        const connectionCode = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.getConnectionCode(context.model.toString(), componentService);
        // Get the component and data for the node
        const { component, data } = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.getComponentAndDataForNode(nodeId, componentService, context.model.toString());
        if (!component) {
            console.error("Component or data not found.");
            setLoadings(false);
            return;
        }
        // Get dependencies and imports from the component
        const dependencies = component.provideDependencies(data);
        const imports = component.provideImports(data);
        // Generate strings
        const dependencyString = dependencies.join(" ");
        const importStatements = imports.map((imp) => `${imp}`).join("\n");
        // Build the Python code string for MongoDB-like databases
        let code = `
!pip install --quiet ${dependencyString} --disable-pip-version-check
${importStatements}
${envVariableCode}
${connectionCode}

import re

database_name = """${schemaName}"""
pattern = re.compile(r"""${escapedQuery}""")

${component.generateDatabaseConnectionCode({ config: data, connectionName: "client" })}

# Prefer an existing 'db' if generated by the component; otherwise derive from 'client'
try:
    db  # type: ignore # noqa
except NameError:
    db = client[database_name]  # type: ignore # noqa

collections = db.list_collection_names()
filtered = [c.strip() for c in collections if pattern.search(c)]
print(", ".join(filtered))
`;
        // Format remaining variables in the code
        code = _CodeGenerator__WEBPACK_IMPORTED_MODULE_0__.CodeGenerator.formatVariables(code);
        const future = context.sessionContext.session.kernel.requestExecute({ code });
        future.onReply = (reply) => {
            if (reply.content.status === "ok") {
            }
            else {
                setLoadings(false);
            }
        };
        future.onIOPub = (msg) => {
            if (msg.header.msg_type === "stream") {
                const streamMsg = msg;
                if (streamMsg.content.name === "stdout") {
                    const output = streamMsg.content.text;
                    const collections = output.split(", ").filter(Boolean);
                    const newItems = collections.map((name) => {
                        const trimmed = name.trim();
                        return {
                            input: {},
                            value: trimmed,
                            key: trimmed,
                            label: trimmed,
                            type: "collection",
                        };
                    });
                    setList((items) => {
                        const existingKeys = new Set(items.map((item) => item.key));
                        const uniqueItems = newItems.filter((n) => !existingKeys.has(n.key));
                        return [...items, ...uniqueItems];
                    });
                    setLoadings(false);
                }
            }
            else if (msg.header.msg_type === "error") {
                setLoadings(false);
                const errorMsg = msg;
                const errorOutput = errorMsg.content;
                console.error(`Received error: \${errorOutput.ename}: \${errorOutput.evalue}`);
            }
        };
    }
}


/***/ },

/***/ "./lib/configUtils.js"
/*!****************************!*\
  !*** ./lib/configUtils.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GenerateUIFormComponent: () => (/* binding */ GenerateUIFormComponent),
/* harmony export */   GenerateUIInputs: () => (/* binding */ GenerateUIInputs),
/* harmony export */   "default": () => (/* binding */ ConfigModal),
/* harmony export */   onChange: () => (/* binding */ onChange),
/* harmony export */   setDefaultConfig: () => (/* binding */ setDefaultConfig)
/* harmony export */ });
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/CheckOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/CloseOutlined.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _formUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./formUtils */ "./lib/formUtils.js");
/* harmony import */ var _forms_CodeTextarea__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./forms/CodeTextarea */ "./lib/forms/CodeTextarea.js");
/* harmony import */ var _forms_InputFile__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./forms/InputFile */ "./lib/forms/InputFile.js");
/* harmony import */ var _forms_InputFiles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./forms/InputFiles */ "./lib/forms/InputFiles.js");
/* harmony import */ var _forms_InputQuantity__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./forms/InputQuantity */ "./lib/forms/InputQuantity.js");
/* harmony import */ var _forms_InputRegular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./forms/InputRegular */ "./lib/forms/InputRegular.js");
/* harmony import */ var _forms_TextareaRegular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./forms/TextareaRegular */ "./lib/forms/TextareaRegular.js");
/* harmony import */ var _forms_dataMapping__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./forms/dataMapping */ "./lib/forms/dataMapping.js");
/* harmony import */ var _forms_keyValueColumns__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./forms/keyValueColumns */ "./lib/forms/keyValueColumns.js");
/* harmony import */ var _forms_keyValueColumnsSelect__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./forms/keyValueColumnsSelect */ "./lib/forms/keyValueColumnsSelect.js");
/* harmony import */ var _forms_keyValueColumnsRadio__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./forms/keyValueColumnsRadio */ "./lib/forms/keyValueColumnsRadio.js");
/* harmony import */ var _forms_ColumnOperationColumn__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./forms/ColumnOperationColumn */ "./lib/forms/ColumnOperationColumn.js");
/* harmony import */ var _forms_keyValueForm__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./forms/keyValueForm */ "./lib/forms/keyValueForm.js");
/* harmony import */ var _forms_selectColumn__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./forms/selectColumn */ "./lib/forms/selectColumn.js");
/* harmony import */ var _forms_selectColumns__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./forms/selectColumns */ "./lib/forms/selectColumns.js");
/* harmony import */ var _forms_selectFromSQLQuery__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./forms/selectFromSQLQuery */ "./lib/forms/selectFromSQLQuery.js");
/* harmony import */ var _forms_selectFromPythonQuery__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./forms/selectFromPythonQuery */ "./lib/forms/selectFromPythonQuery.js");
/* harmony import */ var _forms_selectCustomizable__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./forms/selectCustomizable */ "./lib/forms/selectCustomizable.js");
/* harmony import */ var _forms_selectMultipleCustomizable__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./forms/selectMultipleCustomizable */ "./lib/forms/selectMultipleCustomizable.js");
/* harmony import */ var _forms_selectRegular__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./forms/selectRegular */ "./lib/forms/selectRegular.js");
/* harmony import */ var _forms_selectTokenization__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./forms/selectTokenization */ "./lib/forms/selectTokenization.js");
/* harmony import */ var _forms_transferData__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./forms/transferData */ "./lib/forms/transferData.js");
/* harmony import */ var _forms_valuesListForm__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./forms/valuesListForm */ "./lib/forms/valuesListForm.js");
/* harmony import */ var _forms_FormulaColumns__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./forms/FormulaColumns */ "./lib/forms/FormulaColumns.js");
/* harmony import */ var _forms_DatePickerForm__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./forms/DatePickerForm */ "./lib/forms/DatePickerForm.js");
/* harmony import */ var _PipelineService__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./PipelineService */ "./lib/PipelineService.js");
/* harmony import */ var _forms_selectSheetFromExcel__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./forms/selectSheetFromExcel */ "./lib/forms/selectSheetFromExcel.js");
/* harmony import */ var _forms_dataMapping2__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./forms/dataMapping2 */ "./lib/forms/dataMapping2.js");































// Set default options to component if specified
const setDefaultConfig = ({ nodeId, store, setNodes, defaultConfig, }) => {
    const { nodeInternals } = store.getState();
    setNodes(Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId && Object.keys(node.data).length === 1) {
            node.data = {
                ...defaultConfig,
                lastUpdated: null,
                lastExecuted: null,
            };
        }
        return node;
    }));
};
const onChange = ({ evtTargetValue, field, nodeId, store, setNodes, }) => {
    const newValue = evtTargetValue;
    const { nodeInternals } = store.getState();
    const currentTimestamp = Date.now(); // Current timestamp in milliseconds since Unix epoch
    setNodes(Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
            let fieldParts = field.split(".");
            // Set or update the main field
            if (fieldParts.length === 1) {
                // Top-level field
                node.data = { ...node.data, [field]: newValue };
            }
            else {
                // Nested field
                const [outerField, innerField] = fieldParts;
                node.data = {
                    ...node.data,
                    [outerField]: {
                        ...node.data[outerField],
                        [innerField]: newValue,
                    },
                };
            }
            // Set or update the lastUpdated field with the current timestamp
            if (field !== "lastExecuted") {
                node.data = { ...node.data, lastUpdated: currentTimestamp };
            }
            else {
                node.data = { ...node.data };
            }
        }
        return node;
    }));
};
const GenerateUIFormComponent = react__WEBPACK_IMPORTED_MODULE_3___default().memo(({ nodeId, type, name, form, data, context, componentService, manager, commands, handleChange, modalOpen, setModalOpen, }) => {
    const stopPropagation = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((e) => {
        e.stopPropagation();
    }, []);
    const [fieldsForm] = antd__WEBPACK_IMPORTED_MODULE_2__.Form.useForm();
    const [formValues, setFormValues] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(fieldsForm.getFieldsValue());
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
        setFormValues(fieldsForm.getFieldsValue());
    }, [fieldsForm]);
    return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement("div", { onDoubleClick: stopPropagation },
        react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form, { form: fieldsForm, layout: "vertical", size: "small", onValuesChange: (_, values) => {
                setFormValues(values);
            } },
            react__WEBPACK_IMPORTED_MODULE_3___default().createElement(GenerateUIInputs, { name: name, nodeId: nodeId, form: form, data: data, context: context, componentService: componentService, manager: manager, commands: commands, handleChange: handleChange, advanced: false, formValues: formValues }),
            react__WEBPACK_IMPORTED_MODULE_3___default().createElement(ConfigModal, { modalOpen: modalOpen, setModalOpen: setModalOpen, name: name, nodeId: nodeId, form: form, data: data, context: context, componentService: componentService, manager: manager, commands: commands, handleChange: handleChange, advanced: true }))));
});
const GenerateUIInputs = react__WEBPACK_IMPORTED_MODULE_3___default().memo(({ name, nodeId, form, data, context, componentService, manager, commands, handleChange, advanced, formValues, }) => {
    const [connections, setConnections] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const [optionsConnections, setOptionsConnections] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({});
    const fetchConnections = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)(() => {
        const allConnections = _PipelineService__WEBPACK_IMPORTED_MODULE_29__.PipelineService.getConnections(context.model.toString());
        setConnections(allConnections);
        const connectionsByType = allConnections.reduce((acc, connection) => {
            const connectionType = connection.connectionType;
            if (!acc[connectionType]) {
                acc[connectionType] = [];
            }
            acc[connectionType].push(renderItem(connection.connectionName));
            return acc;
        }, {});
        setOptionsConnections(connectionsByType);
    }, [context]);
    // Function to check if a field should be displayed based on its condition
    const shouldDisplayField = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((field, values) => {
        if (!field.condition) {
            return true;
        }
        const checkCondition = (condition, obj) => {
            return Object.keys(condition).every((key) => {
                const conditionValue = condition[key];
                const fieldValue = obj[key];
                if (typeof conditionValue === "object" &&
                    !Array.isArray(conditionValue) &&
                    fieldValue !== undefined) {
                    return checkCondition(conditionValue, fieldValue);
                }
                const result = Array.isArray(conditionValue)
                    ? conditionValue.includes(fieldValue)
                    : fieldValue === conditionValue;
                return result;
            });
        };
        const finalResult = checkCondition(field.condition, values);
        return finalResult;
    }, [data]);
    const renderItem = (title) => ({
        value: title,
        label: (react__WEBPACK_IMPORTED_MODULE_3___default().createElement("div", { style: {
                display: "flex",
                justifyContent: "space-between",
            } }, title)),
    });
    const handleSelectConnection = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((connectionName, attributeId) => {
        const selectedConnection = connections.find((conn) => conn.connectionName === connectionName);
        if (selectedConnection) {
            selectedConnection.variables.forEach((variable) => {
                const { key, name } = variable;
                const VarName = name;
                const fieldId = `${key}`;
                handleChange("{" + `${VarName}` + "}", fieldId);
            });
            handleChange(connectionName, attributeId);
        }
    }, [connections, handleChange]);
    const handleRemoveConnection = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((attributeId) => {
        const connectionName = data[attributeId];
        const selectedConnection = connections.find((conn) => conn.connectionName === connectionName);
        if (selectedConnection) {
            selectedConnection.variables.forEach((variable) => {
                const { key } = variable;
                const fieldId = `${key}`;
                handleChange("", fieldId);
            });
            handleChange("", attributeId);
        }
    }, [connections, data, handleChange]);
    const groupedFields = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => form.fields.reduce((acc, field) => {
        const connection = field.connection || "default";
        if (!acc[connection]) {
            acc[connection] = [];
        }
        acc[connection].push(field);
        return acc;
    }, {}), [form.fields]);
    const groupFieldsIntoRows = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((fields) => {
        const rows = [];
        const rowByColumnId = new Map();
        fields.forEach((field) => {
            if (field.columnId === undefined || field.columnId === null) {
                rows.push([field]);
                return;
            }
            const existingRow = rowByColumnId.get(field.columnId);
            if (existingRow) {
                existingRow.push(field);
                return;
            }
            const newRow = [field];
            rowByColumnId.set(field.columnId, newRow);
            rows.push(newRow);
        });
        return rows;
    }, []);
    const renderField = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((field, index) => {
        if (!advanced && field.advanced) {
            return null;
        }
        // Directly check if the field should be displayed
        if (!shouldDisplayField(field, data)) {
            return null;
        }
        let value;
        let values = [];
        const fieldParts = field.id.split(".");
        if (Array.isArray(data[field.id])) {
            values = data[field.id];
        }
        else if (fieldParts.length === 1) {
            if (data[field.id] !== undefined) {
                value = data[field.id];
            }
        }
        else {
            const [outerField, innerField] = fieldParts;
            if (data[outerField] && data[outerField][innerField] !== undefined) {
                value = data[outerField][innerField];
            }
        }
        /*
    const validateInput = (value: any) => {
      if (field.validation) {
        const pattern = new RegExp(field.validation, "i");
        setIsInvalid(!pattern.test(value));
      } else {
        setIsInvalid(false);
      }
    };

    const [isInvalid, setIsInvalid] = useState(false);
    useEffect(() => {
      validateInput(value);
    }, [value]);
    */
        const commonProps = { field, handleChange, context, advanced };
        switch (field.type) {
            case "input":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_InputRegular__WEBPACK_IMPORTED_MODULE_9__["default"], { ...commonProps, value: value }));
            case "radio":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Flex, { vertical: true, gap: "middle" },
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Radio.Group, { defaultValue: value, size: advanced ? "middle" : "small", onChange: (e) => handleChange(e.target.value, field.id), buttonStyle: "solid" }, field.options.map((option) => (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Radio.Button, { value: option.value }, option.label))))));
            case "file":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_InputFile__WEBPACK_IMPORTED_MODULE_6__["default"], { ...commonProps, value: value, manager: manager }));
            case "files":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_InputFiles__WEBPACK_IMPORTED_MODULE_7__["default"], { ...commonProps, values: values, manager: manager }));
            case "columns":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_selectColumns__WEBPACK_IMPORTED_MODULE_18__["default"], { ...commonProps, defaultValues: values, componentService: componentService, commands: commands, nodeId: nodeId }));
            case "column":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_selectColumn__WEBPACK_IMPORTED_MODULE_17__["default"], { ...commonProps, defaultValue: value, componentService: componentService, commands: commands, nodeId: nodeId }));
            case "table":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_selectFromSQLQuery__WEBPACK_IMPORTED_MODULE_19__["default"], { ...commonProps, data: data, defaultValue: value, componentService: componentService, commands: commands, nodeId: nodeId }));
            case "collection":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_selectFromPythonQuery__WEBPACK_IMPORTED_MODULE_20__["default"], { ...commonProps, data: data, defaultValue: value, componentService: componentService, commands: commands, nodeId: nodeId }));
            case "sheets":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_selectSheetFromExcel__WEBPACK_IMPORTED_MODULE_30__["default"], { ...commonProps, data: data, defaultValue: value, componentService: componentService, commands: commands, nodeId: nodeId }));
            case "selectCustomizable":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_selectCustomizable__WEBPACK_IMPORTED_MODULE_21__["default"], { ...commonProps, defaultValue: value }));
            case "selectMultipleCustomizable":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_selectMultipleCustomizable__WEBPACK_IMPORTED_MODULE_22__["default"], { ...commonProps, defaultValues: values }));
            case "selectTokenization":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_selectTokenization__WEBPACK_IMPORTED_MODULE_24__["default"], { ...commonProps, defaultValue: value }));
            case "select":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_selectRegular__WEBPACK_IMPORTED_MODULE_23__["default"], { ...commonProps, defaultValue: value }));
            case "textarea":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_TextareaRegular__WEBPACK_IMPORTED_MODULE_10__["default"], { ...commonProps, value: value, rows: field.rows }));
            case "codeTextarea":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_CodeTextarea__WEBPACK_IMPORTED_MODULE_5__["default"], { ...commonProps, value: value, componentService: componentService, commands: commands, nodeId: nodeId }));
            case "boolean":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Switch, { onChange: (checked) => handleChange(checked, field.id), checkedChildren: react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__["default"], null), unCheckedChildren: react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__["default"], null), defaultChecked: value === true }));
            case "cascader":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Cascader, { value: values, placeholder: field.placeholder, options: field.options, ...(field.onlyLastValue
                        ? {
                            displayRender: (labels) => labels[labels.length - 1],
                        }
                        : {}), onChange: (value) => handleChange(value, field.id) }));
            case "keyvalue":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_keyValueForm__WEBPACK_IMPORTED_MODULE_16__["default"], { ...commonProps, initialValues: values }));
            case "keyvalueColumns":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_keyValueColumns__WEBPACK_IMPORTED_MODULE_12__["default"], { ...commonProps, initialValues: values, componentService: componentService, commands: commands, nodeId: nodeId }));
            case "keyvalueColumnsSelect":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_keyValueColumnsSelect__WEBPACK_IMPORTED_MODULE_13__["default"], { ...commonProps, initialValues: values, componentService: componentService, commands: commands, nodeId: nodeId }));
            case "columnOperationColumn":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_ColumnOperationColumn__WEBPACK_IMPORTED_MODULE_15__["default"], { ...commonProps, initialValues: values, data: { ...data, ...(formValues || {}) }, componentService: componentService, commands: commands, nodeId: nodeId }));
            case "keyvalueColumnsRadio":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_keyValueColumnsRadio__WEBPACK_IMPORTED_MODULE_14__["default"], { ...commonProps, initialValues: values, componentService: componentService, commands: commands, nodeId: nodeId }));
            case "valuesList":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_valuesListForm__WEBPACK_IMPORTED_MODULE_26__["default"], { ...commonProps, initialValues: values }));
            case "inputNumber":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_InputQuantity__WEBPACK_IMPORTED_MODULE_8__["default"], { ...commonProps, value: value }));
            case "transferData":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_transferData__WEBPACK_IMPORTED_MODULE_25__["default"], { ...commonProps, defaultValue: value, componentService: componentService, commands: commands, nodeId: nodeId }));
            case "dataMapping":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_dataMapping__WEBPACK_IMPORTED_MODULE_11__["default"], { data: data, ...commonProps, defaultValue: values, componentService: componentService, commands: commands, nodeId: nodeId }));
            case "dataMapping2":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_dataMapping2__WEBPACK_IMPORTED_MODULE_31__["default"], null));
            case "formulaColumns":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_FormulaColumns__WEBPACK_IMPORTED_MODULE_27__["default"], { ...commonProps, defaultValue: value, componentService: componentService, commands: commands, nodeId: nodeId }));
            case "date":
                return (0,_formUtils__WEBPACK_IMPORTED_MODULE_4__.renderFormItem)(field, react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_forms_DatePickerForm__WEBPACK_IMPORTED_MODULE_28__["default"], { ...commonProps, value: value }));
            case "info":
                return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Typography.Paragraph, { style: { padding: "5px" } }, field.text));
            default:
                return null;
        }
    }, [
        data,
        formValues,
        handleChange,
        componentService,
        commands,
        manager,
        advanced,
    ]);
    const renderFieldRows = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((fields, groupKeyPrefix) => {
        const rows = groupFieldsIntoRows(fields);
        return rows.map((rowFields, rowIndex) => {
            const renderedFields = rowFields
                .map((field, fieldIndex) => ({
                field,
                content: renderField(field, fieldIndex),
            }))
                .filter((item) => item.content !== null);
            if (renderedFields.length === 0) {
                return null;
            }
            if (renderedFields.length === 1) {
                return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), { key: `${groupKeyPrefix}-row-${rowIndex}` }, renderedFields[0].content));
            }
            return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Row, { key: `${groupKeyPrefix}-row-${rowIndex}`, gutter: 8, align: "top", wrap: true }, renderedFields.map(({ field, content }) => (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Col, { key: `${groupKeyPrefix}-${field.id}`, flex: "1 1 0" }, content)))));
        });
    }, [groupFieldsIntoRows, renderField]);
    // Helper function to check if any field in a connection should be displayed
    const shouldDisplayConnection = (fields) => {
        return fields.some((field) => shouldDisplayField(field, data));
    };
    return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), null,
        Object.entries(groupedFields).map(([connection, fields], groupIndex) => {
            if (connection === "default" ||
                (!advanced &&
                    fields.some((field) => field.advanced)))
                return null;
            const connectionFields = fields;
            // Check if the connection card should be displayed
            if (!shouldDisplayConnection(connectionFields)) {
                return null;
            }
            const connectionDataId = `${connection}-${groupIndex}`;
            const selectedConnectionName = data[connectionDataId] || "";
            const selectConnection = (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Select, { placeholder: "Select Connection", style: { minWidth: 200 }, onClick: fetchConnections, options: optionsConnections[connection] || [], value: selectedConnectionName || undefined, onChange: (value) => handleSelectConnection(value, connectionDataId), dropdownRender: (menu) => (react__WEBPACK_IMPORTED_MODULE_3___default().createElement((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), null,
                    menu,
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Divider, { style: { margin: "8px 0" } }),
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Space, { style: { padding: "0 4px 4px" } },
                        react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Button, { type: "text", icon: react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__["default"], null), onClick: () => handleRemoveConnection(connectionDataId) }, "Remove Connection")))) }));
            return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Card, { size: "small", title: `${connection} Connection`, key: `${connection}-${groupIndex}`, style: { marginTop: "10px", marginBottom: "10px" }, extra: selectConnection, type: "inner" }, renderFieldRows(connectionFields, `connection-${connection}-${groupIndex}`)));
        }),
        groupedFields.default &&
            renderFieldRows(groupedFields.default, "default")));
});
function ConfigModal({ name, nodeId, form, data, context, componentService, manager, commands, handleChange, advanced, modalOpen, setModalOpen, }) {
    const componentName = (data === null || data === void 0 ? void 0 : data.customTitle) || name;
    const stopPropagation = (e) => {
        e.stopPropagation();
    };
    const [fieldsForm] = antd__WEBPACK_IMPORTED_MODULE_2__.Form.useForm();
    const [formValues, setFormValues] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(fieldsForm.getFieldsValue());
    const width = form["fields"].some((field) => field.type === "codeTextarea")
        ? "80%"
        : 800;
    return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, { title: componentName, centered: true, open: modalOpen, onOk: () => setModalOpen(false), onCancel: () => setModalOpen(false), width: width, footer: (_, { OkBtn }) => (react__WEBPACK_IMPORTED_MODULE_3___default().createElement((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), null,
                react__WEBPACK_IMPORTED_MODULE_3___default().createElement(OkBtn, null))) },
            react__WEBPACK_IMPORTED_MODULE_3___default().createElement("div", { onDoubleClick: stopPropagation },
                react__WEBPACK_IMPORTED_MODULE_3___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form, { form: fieldsForm, layout: "vertical", onValuesChange: (_, values) => {
                        setFormValues(values);
                    } },
                    react__WEBPACK_IMPORTED_MODULE_3___default().createElement(GenerateUIInputs, { name: name, nodeId: nodeId, form: form, data: data, context: context, componentService: componentService, manager: manager, commands: commands, handleChange: handleChange, advanced: true, formValues: formValues }))))));
}


/***/ },

/***/ "./lib/formUtils.js"
/*!**************************!*\
  !*** ./lib/formUtils.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   onInputKeyDown: () => (/* binding */ onInputKeyDown),
/* harmony export */   renderFormItem: () => (/* binding */ renderFormItem)
/* harmony export */ });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const renderFormItem = (field, content) => {
    return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_0__.Form.Item, { style: { marginTop: "5px", padding: "0 0 2px" }, label: field.label, className: "nodrag", ...(field.required ? { required: field.required } : {}), ...(field.tooltip ? { tooltip: field.tooltip } : {}) }, content));
};
/**
 * Stops copy/paste/cut key events from bubbling up from text inputs.
 * This allows native text editing to work while preventing the
 * React Flow canvas's custom copy/paste from firing.
 */
const onInputKeyDown = (event) => {
    // Check for copy, paste, or cut shortcuts
    if (event.key === 'c' || event.key === 'v' || event.key === 'x') {
        // Check if Ctrl (for Windows/Linux) or Meta (for Mac) is pressed
        if (event.ctrlKey || event.metaKey) {
            // Stop the event from bubbling up to the React Flow pane and document
            event.stopPropagation();
        }
    }
};


/***/ },

/***/ "./lib/forms/AddNewColumn.js"
/*!***********************************!*\
  !*** ./lib/forms/AddNewColumn.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddNewColumn: () => (/* binding */ AddNewColumn),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/QuestionCircleOutlined.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");



const AddNewColumn = ({ items, setItems, setSelectedOption }) => {
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const [type, setType] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('string');
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, { value: name, label: name, type: type, named: true }]);
        setName('');
        setTimeout(() => {
            var _a;
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }, 0);
    };
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const onTypeChange = (value) => {
        setType(value);
    };
    const optionRenderItems = (option) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Space, null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, option.label),
        option.tooltip && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Tooltip, { title: option.tooltip },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["default"], null)))));
    const typesOptions = [
        {
            value: "numeric",
            label: "Numeric",
            children: [
                {
                    value: "int",
                    label: "Integer",
                    children: [
                        { value: "int64", label: "int64", tooltip: "Standard integer type." },
                        { value: "int32", label: "int32", tooltip: "For optimized memory usage." },
                        { value: "int16", label: "int16", tooltip: "For more optimized memory usage." },
                        { value: "int8", label: "int8", tooltip: "For more optimized memory usage." },
                        { value: "uint64", label: "uint64", tooltip: "Unsigned integer (can only hold non-negative values)" },
                        { value: "uint32", label: "uint32", tooltip: "For more optimized memory usage." },
                        { value: "uint16", label: "uint16", tooltip: "For more optimized memory usage." },
                        { value: "uint8", label: "uint8", tooltip: "For more optimized memory usage." }
                    ]
                },
                {
                    value: "float",
                    label: "Float",
                    children: [
                        { value: "float64", label: "float64", tooltip: "Standard floating-point type." },
                        { value: "float32", label: "float32", tooltip: "For optimized memory usage." },
                        { value: "float16", label: "float16", tooltip: "For more optimized memory usage." }
                    ]
                }
            ]
        },
        {
            value: "text",
            label: "Text",
            children: [
                { value: "string", label: "string", tooltip: "For string data. (recommended)" },
                { value: "object", label: "object", tooltip: "For generic objects (strings, timestamps, mixed types)." },
                { value: "category", label: "category", tooltip: "For categorical variables." }
            ]
        },
        {
            value: "datetime",
            label: "Date & Time",
            children: [
                { value: "datetime64[ns]", label: "datetime64[ns]", tooltip: "For datetime values." },
                { value: "datetime64[ms]", label: "datetime64[ms]", tooltip: "For datetime values in milliseconds." },
                { value: "datetime64[s]", label: "datetime64[s]", tooltip: "For datetime values in seconds." },
                { value: "datetime32[ns]", label: "datetime32[ns]", tooltip: "For compact datetime storage in nanoseconds." },
                { value: "datetime32[ms]", label: "datetime32[ms]", tooltip: "For compact datetime storage in milliseconds." },
                { value: "timedelta[ns]", label: "timedelta[ns]", tooltip: "For differences between two datetimes." }
            ]
        },
        {
            value: "boolean",
            label: "Boolean",
            children: [
                { value: "bool", label: "bool", tooltip: "For boolean values (True or False)." }
            ]
        }
    ];
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Space, { style: { padding: '0 4px 4px' } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Row, { gutter: 8 },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Col, { span: 12 },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Input, { placeholder: "New column", ref: inputRef, value: name, onChange: onNameChange, onKeyDown: (e) => e.stopPropagation() })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Col, { span: 10 },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Cascader, { autoFocus: true, style: { width: '100%' }, allowClear: false, options: typesOptions, defaultValue: ['text', 'string'], placement: 'topLeft', displayRender: (labels) => labels[labels.length - 1], onChange: onTypeChange, optionRender: optionRenderItems, getPopupContainer: triggerNode => {
                        // Find the closest parent dropdown element
                        let parentElement = triggerNode.parentElement;
                        while (parentElement && !parentElement.classList.contains('ant-dropdown')) {
                            parentElement = parentElement.parentElement;
                        }
                        // Return the first dropdown's parent container or default to the current triggerNode's parent
                        return parentElement || triggerNode.parentNode;
                    } })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Col, { span: 2 },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Button, { type: "text", icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__["default"], null), onClick: addItem }, "Add")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddNewColumn);


/***/ },

/***/ "./lib/forms/CodeTextarea.js"
/*!***********************************!*\
  !*** ./lib/forms/CodeTextarea.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CodeTextarea: () => (/* binding */ CodeTextarea),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/DownOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/LoadingOutlined.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../icons */ "./lib/icons.js");
/* harmony import */ var react_ace__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-ace */ "webpack/sharing/consume/default/react-ace/react-ace");
/* harmony import */ var _RequestService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../RequestService */ "./lib/RequestService.js");
/* harmony import */ var antd_es_input_TextArea__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! antd/es/input/TextArea */ "../../node_modules/antd/es/input/TextArea.js");











const CodeTextarea = ({ field, value, handleChange, advanced, context, commands, componentService, nodeId }) => {
    var _a, _b;
    const getInitialValues = () => {
        try {
            if (!value)
                return { code: '', instructions: '' };
            const parsed = JSON.parse(value);
            // If it's a JSON object, return its parts
            if (parsed && typeof parsed === 'object') {
                return {
                    code: parsed.code || '',
                    instructions: parsed.instructions || ''
                };
            }
        }
        catch (e) {
            // Fallback: if value is just a plain string (legacy code), treat it as code
            return { code: value, instructions: '' };
        }
        return { code: '', instructions: '' };
    };
    const initialValues = getInitialValues();
    const [code, setCode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValues.code);
    const [instructions, setInstructions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValues.instructions);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [sampleData, setSampleData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [includeSample, setIncludeSample] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const [copyStatus, setCopyStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('idle');
    const [activeOpenKey, setActiveOpenKey] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const updated = getInitialValues();
        setCode(updated.code);
        setInstructions(updated.instructions);
    }, [value]);
    const triggerUpdate = (newCode, newInstructions) => {
        const combined = JSON.stringify({
            code: newCode,
            instructions: newInstructions
        });
        handleChange(combined, field.id);
    };
    const handleCodeChange = (val) => {
        setCode(val);
        triggerUpdate(val, instructions);
    };
    const handleInstructionsChange = (val) => {
        setInstructions(val);
        triggerUpdate(code, val);
    };
    const retrieveSample = async () => {
        if (loading)
            return sampleData || '';
        // If aiDataSample is explicitly set to false, don't retrieve sample
        if (field.aiDataSample === false)
            return '';
        setLoading(true);
        return new Promise((resolve) => {
            _RequestService__WEBPACK_IMPORTED_MODULE_6__.RequestService.retrieveDataSample(context, (isLoading) => {
                setLoading(isLoading);
            }, commands, (data) => {
                setSampleData(data);
                setLoading(false);
                resolve(data);
            }, componentService, nodeId, 0, true);
        });
    };
    const generatePrompt = (dataFromRetrieve) => {
        // Only include sample data if aiDataSample is not false and includeSample is true
        const shouldIncludeSample = field.aiDataSample !== false && includeSample && dataFromRetrieve;
        return `${field.aiInstructions || 'Generate '}
${shouldIncludeSample ? `<Sample Data>\n${dataFromRetrieve}\n</Sample Data>` : ''}

<User Instructions>
${instructions || 'No specific instructions provided'}
</User Instructions>`.trim();
    };
    const handleCopyPrompt = async () => {
        try {
            setCopyStatus('loading');
            const retrievedData = await retrieveSample();
            const prompt = generatePrompt(retrievedData);
            navigator.clipboard.writeText(prompt);
            console.log("Prompt copied to clipboard:", prompt);
            setCopyStatus('copied');
            setTimeout(() => {
                setCopyStatus('idle');
            }, 3000);
        }
        catch (error) {
            setCopyStatus('idle');
        }
    };
    const handleOpenAI = async (url, key) => {
        try {
            setActiveOpenKey(key);
            const retrievedData = await retrieveSample();
            const prompt = encodeURIComponent(generatePrompt(retrievedData));
            window.open(`${url}?q=${prompt}`, '_blank');
        }
        finally {
            setActiveOpenKey(null);
        }
    };
    const menuItems = [
        {
            key: '1',
            label: 'Open in ChatGPT',
            icon: activeOpenKey === '1' ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__["default"], null) : react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_4__.openaiIcon.react, null),
            className: "anticon",
            onClick: () => handleOpenAI('https://chat.openai.com', '1')
        },
        {
            key: '2',
            label: 'Open in Claude',
            icon: activeOpenKey === '2' ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__["default"], null) : react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_4__.claudeIcon.react, null),
            className: "anticon",
            onClick: () => handleOpenAI('https://claude.ai/new', '2')
        },
        {
            key: '3',
            label: 'Open in Mistral',
            icon: activeOpenKey === '3' ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__["default"], null) : react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_4__.mistralIcon.react, null),
            className: "anticon",
            onClick: () => handleOpenAI('https://chat.mistral.ai/chat', '3')
        },
    ];
    const handleAceLoad = (editor) => {
        var _a, _b;
        const stopClipboardShortcutBubble = (e) => {
            if (!(e.ctrlKey || e.metaKey))
                return;
            const key = e.key.toLowerCase();
            if (key === 'c' || key === 'v' || key === 'x') {
                // Keep native Ace/browser clipboard behavior, only block parent shortcuts.
                e.stopPropagation();
            }
        };
        const stopClipboardEventBubble = (e) => {
            e.stopPropagation();
        };
        const el = editor.container;
        const aceInputEl = (_b = (_a = editor === null || editor === void 0 ? void 0 : editor.textInput) === null || _a === void 0 ? void 0 : _a.getElement) === null || _b === void 0 ? void 0 : _b.call(_a);
        el.addEventListener('keydown', stopClipboardShortcutBubble);
        aceInputEl === null || aceInputEl === void 0 ? void 0 : aceInputEl.addEventListener('keydown', stopClipboardShortcutBubble);
        el.addEventListener('copy', stopClipboardEventBubble);
        el.addEventListener('cut', stopClipboardEventBubble);
        el.addEventListener('paste', stopClipboardEventBubble);
        aceInputEl === null || aceInputEl === void 0 ? void 0 : aceInputEl.addEventListener('copy', stopClipboardEventBubble);
        aceInputEl === null || aceInputEl === void 0 ? void 0 : aceInputEl.addEventListener('cut', stopClipboardEventBubble);
        aceInputEl === null || aceInputEl === void 0 ? void 0 : aceInputEl.addEventListener('paste', stopClipboardEventBubble);
        editor.on('destroy', () => {
            el.removeEventListener('keydown', stopClipboardShortcutBubble);
            aceInputEl === null || aceInputEl === void 0 ? void 0 : aceInputEl.removeEventListener('keydown', stopClipboardShortcutBubble);
            el.removeEventListener('copy', stopClipboardEventBubble);
            el.removeEventListener('cut', stopClipboardEventBubble);
            el.removeEventListener('paste', stopClipboardEventBubble);
            aceInputEl === null || aceInputEl === void 0 ? void 0 : aceInputEl.removeEventListener('copy', stopClipboardEventBubble);
            aceInputEl === null || aceInputEl === void 0 ? void 0 : aceInputEl.removeEventListener('cut', stopClipboardEventBubble);
            aceInputEl === null || aceInputEl === void 0 ? void 0 : aceInputEl.removeEventListener('paste', stopClipboardEventBubble);
        });
    };
    // Only show the sample data checkbox if aiDataSample is not explicitly false
    const showSampleCheckbox = field.aiDataSample !== false;
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Flex, { style: { height: field.height || 400 } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Splitter, { style: { width: '100%' } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Splitter.Panel, { min: "50%", className: "nodrag nopan nowheel" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_ace__WEBPACK_IMPORTED_MODULE_5__["default"], { width: "100%", height: "100%", placeholder: field.placeholder, mode: field.mode, theme: "xcode", name: field.id, onChange: handleCodeChange, onLoad: handleAceLoad, fontSize: 14, lineHeight: 19, showPrintMargin: true, showGutter: true, highlightActiveLine: true, value: code, setOptions: {
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                    } })),
            field.aiGeneration && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Splitter.Panel, { min: "20%", collapsible: true },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Divider, null, "AI-Assisted Code Generation \uD83E\uDE84"),
                ((_a = field.aiPromptExamples) === null || _a === void 0 ? void 0 : _a.length) > 0 && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { padding: '0 16px 8px' } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { marginBottom: 8 } }, "Copy a prompt for generating accurate code using the conversational AI tool of your choice."))),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: {
                        border: '1px solid #d9d9d9',
                        borderRadius: 6,
                        padding: '8px 12px 0px 12px',
                        background: '#fff',
                        transition: 'all 0.2s',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
                        boxSizing: 'border-box',
                        overflow: 'hidden',
                        marginLeft: 12,
                    } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd_es_input_TextArea__WEBPACK_IMPORTED_MODULE_7__["default"], { value: instructions, onChange: (e) => handleInstructionsChange(e.target.value), autoSize: { minRows: 2, maxRows: 8 }, placeholder: "Enter instructions here", bordered: false, onKeyDown: (e) => e.stopPropagation(), style: {
                            resize: 'none',
                            boxShadow: 'none',
                            outline: 'none',
                            background: 'transparent'
                        } }),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, { style: {
                            marginTop: 8,
                            padding: '8px 0',
                            width: '100%',
                            justifyContent: 'flex-end',
                            display: 'flex'
                        }, size: "middle" },
                        showSampleCheckbox && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Checkbox, { checked: includeSample, onChange: (e) => setIncludeSample(e.target.checked) }, "Include data sample")),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Dropdown.Button, { icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["default"], null), loading: copyStatus === 'loading', menu: { items: menuItems, style: { textAlign: 'left', width: '220px' } }, onClick: handleCopyPrompt, disabled: !instructions.trim() }, copyStatus === 'copied' ? 'Copied!' : copyStatus === 'loading' ? 'Loading...' : 'Copy Prompt'))),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, { wrap: true, style: {
                        marginTop: 16,
                        justifyContent: 'center',
                        display: 'flex',
                        maxWidth: '80%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    } }, (_b = field.aiPromptExamples) === null || _b === void 0 ? void 0 : _b.map((example, idx) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { key: idx, size: "small", onClick: () => setInstructions(example.value) },
                    example.label,
                    " ",
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { style: { color: '#43766C' } }, "\u2191"))))))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CodeTextarea);


/***/ },

/***/ "./lib/forms/CodeTextareaMirror.js"
/*!*****************************************!*\
  !*** ./lib/forms/CodeTextareaMirror.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CodeTextareaMirror: () => (/* binding */ CodeTextareaMirror),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/codemirror */ "webpack/sharing/consume/default/@jupyterlab/codemirror");
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyter_ydoc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyter/ydoc */ "webpack/sharing/consume/default/@jupyter/ydoc");
/* harmony import */ var _jupyter_ydoc__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyter_ydoc__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _codemirror_lang_python__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @codemirror/lang-python */ "webpack/sharing/consume/default/@codemirror/lang-python/@codemirror/lang-python");
/* harmony import */ var _codemirror_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @codemirror/view */ "webpack/sharing/consume/default/@codemirror/view");
/* harmony import */ var _codemirror_view__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_codemirror_view__WEBPACK_IMPORTED_MODULE_5__);






const INPUT_AREA_EDITOR_CLASS = 'jp-InputArea-editor';
const CodeTextareaMirror = ({ field, value, handleChange, advanced, }) => {
    const editorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const editorWrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const sharedModelRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (editorRef.current && !editorWrapperRef.current) {
            // Initialize shared model and editor
            const sharedModel = new _jupyter_ydoc__WEBPACK_IMPORTED_MODULE_3__.YFile();
            sharedModelRef.current = sharedModel;
            const model = new _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditor.Model({ sharedModel, mimeType: 'text/x-python' });
            const factory = (options) => {
                var _a;
                const mergedOptions = {
                    ...options,
                    extensions: [
                        ...((_a = options.extensions) !== null && _a !== void 0 ? _a : []),
                        (0,_jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_2__.ybinding)({ ytext: sharedModel.ysource }),
                        (0,_codemirror_lang_python__WEBPACK_IMPORTED_MODULE_4__.python)(),
                        (0,_codemirror_view__WEBPACK_IMPORTED_MODULE_5__.lineNumbers)() // Add line numbers
                    ]
                };
                return new _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_2__.CodeMirrorEditor(mergedOptions);
            };
            // Create the editor wrapper instance
            editorWrapperRef.current = new _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditorWrapper({
                factory,
                model,
                editorOptions: {
                    config: { readOnly: true }
                }
            });
            editorWrapperRef.current.addClass(INPUT_AREA_EDITOR_CLASS);
            // Attach the editor wrapper to the DOM
            editorRef.current.appendChild(editorWrapperRef.current.node);
            // Insert initial value only if `value` is not empty
            if (sharedModel.ysource && value) {
                sharedModel.ysource.insert(0, value);
            }
            else {
            }
            // Set initial value in the editor
            if (sharedModel.ysource && value) {
                sharedModel.ysource.insert(0, value);
            }
            // Sync editor changes to parent component
            sharedModel.ysource.observe(() => {
                const newValue = sharedModel.ysource.toString();
                if (newValue !== value) {
                    handleChange(newValue, field.id);
                }
            });
        }
    }, [field.id, value, handleChange]);
    // Update `ysource` only if `value` is non-empty and different from the current value
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (sharedModelRef.current && sharedModelRef.current.ysource) {
            const currentValue = sharedModelRef.current.ysource.toString();
            if (value && value !== currentValue) {
                sharedModelRef.current.ysource.delete(0, currentValue.length);
                sharedModelRef.current.ysource.insert(0, value);
            }
        }
        else {
            console.error("ysource is not initialized correctly during update.");
        }
    }, [value]);
    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { ref: editorRef, style: { height: '100%', width: '100%' } });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CodeTextareaMirror);


/***/ },

/***/ "./lib/forms/ColumnOperationColumn.js"
/*!********************************************!*\
  !*** ./lib/forms/ColumnOperationColumn.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColumnOperationColumn: () => (/* binding */ ColumnOperationColumn),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/MinusCircleOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _selectColumn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./selectColumn */ "./lib/forms/selectColumn.js");




const DEFAULT_OPERATION = {
    leftColumn: undefined,
    operation: "=",
    rightColumn: undefined,
};
const buildInitialConditions = (initialValues) => {
    if (!initialValues || initialValues.length === 0) {
        return [DEFAULT_OPERATION];
    }
    return initialValues.map((cond) => {
        var _a, _b, _c;
        return ({
            leftColumn: (_a = cond === null || cond === void 0 ? void 0 : cond.leftColumn) !== null && _a !== void 0 ? _a : undefined,
            operation: (_b = cond === null || cond === void 0 ? void 0 : cond.operation) !== null && _b !== void 0 ? _b : "=",
            rightColumn: (_c = cond === null || cond === void 0 ? void 0 : cond.rightColumn) !== null && _c !== void 0 ? _c : undefined,
        });
    });
};
const ColumnOperationColumn = ({ field, handleChange, initialValues, data, context, componentService, commands, nodeId, advanced, }) => {
    var _a;
    const [conditions, setConditions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(buildInitialConditions(initialValues));
    const operationOptions = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => (field.options && field.options.length > 0
        ? field.options
        : [
            { value: "=", label: "=" },
            { value: ">", label: ">" },
            { value: "<", label: "<" },
            { value: ">=", label: ">=" },
            { value: "<=", label: "<=" },
        ]).map((option) => ({
        value: option.value,
        label: option.label,
    })), [field.options]);
    const operatorControlFieldId = field.operatorControlFieldId || "selectExecutionEngine";
    const operatorLockedValues = field.operatorLockedValues || ["pandas"];
    const operatorLockedWhenMissing = (_a = field.operatorLockedWhenMissing) !== null && _a !== void 0 ? _a : true;
    const operatorControlValue = data === null || data === void 0 ? void 0 : data[operatorControlFieldId];
    const isOperatorLocked = (operatorControlValue === undefined || operatorControlValue === null
        ? operatorLockedWhenMissing
        : false) || operatorLockedValues.includes(operatorControlValue);
    const updateConditions = (nextConditions) => {
        setConditions(nextConditions);
        handleChange(nextConditions, field.id);
    };
    const handleAddCondition = () => {
        updateConditions([...conditions, { ...DEFAULT_OPERATION }]);
    };
    const handleRemoveCondition = (index) => {
        if (conditions.length <= 1) {
            return;
        }
        const nextConditions = [...conditions];
        nextConditions.splice(index, 1);
        updateConditions(nextConditions);
    };
    const handleLeftColumnChange = (selection, index) => {
        var _a;
        const nextConditions = [...conditions];
        nextConditions[index] = {
            ...nextConditions[index],
            leftColumn: (selection === null || selection === void 0 ? void 0 : selection.value)
                ? { ...selection, label: (_a = selection.label) !== null && _a !== void 0 ? _a : selection.value }
                : undefined,
        };
        updateConditions(nextConditions);
    };
    const handleRightColumnChange = (selection, index) => {
        var _a;
        const nextConditions = [...conditions];
        nextConditions[index] = {
            ...nextConditions[index],
            rightColumn: (selection === null || selection === void 0 ? void 0 : selection.value)
                ? { ...selection, label: (_a = selection.label) !== null && _a !== void 0 ? _a : selection.value }
                : undefined,
        };
        updateConditions(nextConditions);
    };
    const handleOperationChange = (operation, index) => {
        const nextConditions = [...conditions];
        nextConditions[index] = {
            ...nextConditions[index],
            operation: operation || "=",
        };
        updateConditions(nextConditions);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (!isOperatorLocked) {
            return;
        }
        const hasNonEquality = conditions.some((condition) => (condition.operation || "=") !== "=");
        if (!hasNonEquality) {
            return;
        }
        updateConditions(conditions.map((condition) => ({
            ...condition,
            operation: "=",
        })));
    }, [isOperatorLocked, conditions]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Form.List, { name: field.id }, () => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Form.Item, null, conditions.map((condition, index) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { key: `${field.id}-${index}`, style: {
                display: "flex",
                width: "100%",
                marginBottom: 8,
                gap: 8,
                alignItems: "baseline",
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { flex: 1, minWidth: 0 } },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_selectColumn__WEBPACK_IMPORTED_MODULE_4__["default"], { field: {
                        ...field,
                        id: `${field.id}_leftColumn`,
                        placeholder: "左列",
                        inputNb: 1,
                    }, handleChange: (value) => handleLeftColumnChange(value, index), defaultValue: condition.leftColumn, context: context, componentService: componentService, commands: commands, nodeId: nodeId, advanced: advanced })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Select, { size: advanced ? "middle" : "small", className: "nodrag", style: { width: 72, minWidth: 72 }, value: isOperatorLocked ? "=" : condition.operation || "=", onChange: (value) => handleOperationChange(value, index), options: operationOptions, disabled: isOperatorLocked }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { flex: 1, minWidth: 0 } },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_selectColumn__WEBPACK_IMPORTED_MODULE_4__["default"], { field: {
                        ...field,
                        id: `${field.id}_rightColumn`,
                        placeholder: "右列",
                        inputNb: 2,
                    }, handleChange: (value) => handleRightColumnChange(value, index), defaultValue: condition.rightColumn, context: context, componentService: componentService, commands: commands, nodeId: nodeId, advanced: advanced })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__["default"], { onClick: () => handleRemoveCondition(index), style: {
                    color: conditions.length > 1 ? undefined : "#d9d9d9",
                } }))))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Form.Item, null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Button, { type: "dashed", onClick: handleAddCondition, block: true, icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["default"], null) },
                "Add ",
                field.elementName ? field.elementName : "condition"))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(ColumnOperationColumn));


/***/ },

/***/ "./lib/forms/DatePickerForm.js"
/*!*************************************!*\
  !*** ./lib/forms/DatePickerForm.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DatePickerForm: () => (/* binding */ DatePickerForm),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs */ "../../node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dayjs_plugin_weekday__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dayjs/plugin/weekday */ "../../node_modules/dayjs/plugin/weekday.js");
/* harmony import */ var dayjs_plugin_weekday__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_weekday__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var dayjs_plugin_localeData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dayjs/plugin/localeData */ "../../node_modules/dayjs/plugin/localeData.js");
/* harmony import */ var dayjs_plugin_localeData__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_localeData__WEBPACK_IMPORTED_MODULE_4__);





dayjs__WEBPACK_IMPORTED_MODULE_2___default().extend((dayjs_plugin_weekday__WEBPACK_IMPORTED_MODULE_3___default()));
dayjs__WEBPACK_IMPORTED_MODULE_2___default().extend((dayjs_plugin_localeData__WEBPACK_IMPORTED_MODULE_4___default()));
// Convert stored string ("YYYY-MM-DD") to Dayjs for AntD
const normalizeValue = (value) => {
    console.log('[DatePickerForm] normalizeValue input:', value);
    if (!value)
        return null;
    const parsed = dayjs__WEBPACK_IMPORTED_MODULE_2___default()(value, 'YYYY-MM-DD', true);
    if (!parsed.isValid()) {
        console.warn('[DatePickerForm] invalid date string:', value);
        return null;
    }
    return parsed;
};
const DatePickerForm = ({ field, value, handleChange, context, advanced, }) => {
    // Local state so the picker always updates visually
    const [internalValue, setInternalValue] = react__WEBPACK_IMPORTED_MODULE_0___default().useState(value || '');
    // Sync when parent actually changes the value (e.g. load defaults / reset)
    react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(() => {
        setInternalValue(value || '');
    }, [value]);
    const onChange = (date) => {
        if (date) {
            const formatted = date.format('YYYY-MM-DD');
            setInternalValue(formatted);
            handleChange(formatted, field.id);
        }
        else {
            setInternalValue('');
            handleChange('', field.id);
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.DatePicker, { id: field.id, placeholder: field.placeholder, size: advanced ? 'middle' : 'small', style: { width: '100%' }, value: normalizeValue(internalValue), onChange: onChange, format: "YYYY-MM-DD", onKeyDown: (e) => e.stopPropagation() }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(DatePickerForm));


/***/ },

/***/ "./lib/forms/FormulaColumns.js"
/*!*************************************!*\
  !*** ./lib/forms/FormulaColumns.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormulaColumns: () => (/* binding */ FormulaColumns),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/CloseOutlined.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _selectColumns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selectColumns */ "./lib/forms/selectColumns.js");
/* harmony import */ var _CodeTextarea__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CodeTextarea */ "./lib/forms/CodeTextarea.js");





const FormulaColumns = ({ field, handleChange, defaultValue, context, componentService, commands, nodeId, advanced }) => {
    const [form] = antd__WEBPACK_IMPORTED_MODULE_2__.Form.useForm();
    const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultValue || {});
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        form.setFieldsValue(value);
    }, [value]);
    const onValuesChange = (changedValues, allValues) => {
        setValue(allValues);
        handleChange(allValues, field.id);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form.List, { name: "items" }, (fields, { add, remove }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { display: 'flex', rowGap: 16, flexDirection: 'column' } },
        fields.map((field) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Card, { size: "small", title: `Item ${field.name + 1}`, key: field.key, extra: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__["default"], { onClick: () => {
                    remove(field.name);
                } }) },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, { label: "Name", name: [field.name, 'name'] },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_selectColumns__WEBPACK_IMPORTED_MODULE_3__.SelectColumns, { field: {
                        type: 'columns',
                        id: "columns",
                        label: "Columns",
                        placeholder: "Select columns or add new",
                    }, handleChange: null, defaultValues: [], context: context, commands: commands, componentService: componentService, nodeId: nodeId, advanced: true })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, { label: "Formula", name: [field.name, 'formula'] },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CodeTextarea__WEBPACK_IMPORTED_MODULE_4__.CodeTextarea, { field: {
                        type: "codeTextarea",
                        id: "formula",
                        label: "Python Formula",
                        placeholder: "row['column1'] + row['column2']",
                    }, handleChange: null, advanced: true, value: "", context: context, commands: commands, componentService: componentService, nodeId: nodeId }))))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Button, { type: "dashed", onClick: () => add(), block: true }, "+ Add Formula")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(FormulaColumns));


/***/ },

/***/ "./lib/forms/InputFile.js"
/*!********************************!*\
  !*** ./lib/forms/InputFile.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputFile: () => (/* binding */ InputFile),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/SearchOutlined.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _PipelineService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../PipelineService */ "./lib/PipelineService.js");
/* harmony import */ var _BrowseFileDialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../BrowseFileDialog */ "./lib/BrowseFileDialog.js");
/* harmony import */ var _variablesUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../variablesUtils */ "./lib/variablesUtils.js");






const InputFile = ({ field, value, handleChange, context, advanced, manager }) => {
    const allowedExts = Array.isArray(field.allowedExtensions) && field.allowedExtensions.length
        ? field.allowedExtensions.map(e => e.startsWith('.') ? e.toLowerCase() : `.${e.toLowerCase()}`)
        : undefined;
    const { inputValue, inputRef, openValue, setOpenValue, optionsVariables, handleInputChange, handleSelect, filterOptions, suffix, } = (0,_variablesUtils__WEBPACK_IMPORTED_MODULE_5__.useVariableAutoComplete)({ field, value, handleChange, context, advanced });
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Space.Compact, { style: { width: '100%' } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.AutoComplete, { ref: inputRef, id: field.id, options: optionsVariables, filterOption: filterOptions, size: advanced ? "middle" : "small", open: openValue, onBlur: () => setOpenValue(false), defaultOpen: false, value: inputValue, onChange: handleInputChange, onSelect: handleSelect },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Input
            // {...(field.connection && field.advanced && { addonBefore: selectBefore })}
            , { 
                // {...(field.connection && field.advanced && { addonBefore: selectBefore })}
                placeholder: field.placeholder, ref: inputRef, id: field.id, size: advanced ? "middle" : "small", name: field.id, autoComplete: "off", suffix: suffix, onKeyDown: (e) => e.stopPropagation() })),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Button, { type: "primary", size: advanced ? "middle" : "small", onClick: async () => {
                // TODO, there is something wrong here
                const res = await (0,_BrowseFileDialog__WEBPACK_IMPORTED_MODULE_4__.showBrowseFileDialog)(manager, {
                    multiselect: false,
                    includeDir: true,
                    extensions: allowedExts,
                    filter: (model) => {
                        return model.path !== context.path;
                    }
                });
                // Get relative path
                handleInputChange(_PipelineService__WEBPACK_IMPORTED_MODULE_3__.PipelineService.getRelativePath(context.path, res.value[0].path));
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__["default"], null))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(InputFile));


/***/ },

/***/ "./lib/forms/InputFiles.js"
/*!*********************************!*\
  !*** ./lib/forms/InputFiles.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputFiles: () => (/* binding */ InputFiles),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/SearchOutlined.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _PipelineService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../PipelineService */ "./lib/PipelineService.js");
/* harmony import */ var _BrowseFileDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../BrowseFileDialog */ "./lib/BrowseFileDialog.js");





const InputFiles = ({ field, values, handleChange, context, advanced, manager }) => {
    // Initialize selectedFiles as array of { label, value } objects
    const [selectedFiles, setSelectedFiles] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)((values || []).map(value => ({ label: value, value })));
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const inputSelectRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (values) {
            setSelectedFiles(values.map(value => ({ label: value, value })));
        }
    }, [values]);
    const addItem = (e) => {
        e.preventDefault();
        if (name && !selectedFiles.find(file => file.value === name)) {
            const newItem = { label: name, value: name };
            const updatedSelectedFiles = [...selectedFiles, newItem];
            setSelectedFiles(updatedSelectedFiles);
            handleChange(updatedSelectedFiles.map(f => f.value), field.id);
            setName('');
            setTimeout(() => {
                var _a;
                (_a = inputSelectRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }, 0);
        }
    };
    const handleSelectChange = (selectedItems) => {
        setSelectedFiles(selectedItems);
        handleChange(selectedItems.map(item => item.value), field.id);
    };
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const handleBrowseFiles = async () => {
        try {
            const res = await (0,_BrowseFileDialog__WEBPACK_IMPORTED_MODULE_5__.showBrowseFileDialog)(manager, {
                multiselect: true,
                includeDir: true,
                filter: (model) => model.path !== context.path,
            });
            if (res.value && res.value.length > 0) {
                const relativePaths = res.value.map(file => _PipelineService__WEBPACK_IMPORTED_MODULE_4__.PipelineService.getRelativePath(context.path, file.path));
                const newSelectedFiles = relativePaths.map(path => ({ label: path, value: path }));
                const updatedSelectedFiles = [...selectedFiles, ...newSelectedFiles].filter((file, index, self) => index === self.findIndex(f => f.value === file.value));
                setSelectedFiles(updatedSelectedFiles);
                handleChange(updatedSelectedFiles.map(f => f.value), field.id);
            }
        }
        catch (error) {
            console.error("Error selecting files:", error);
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Space.Compact, { style: { width: '100%' } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Select, { mode: "multiple", labelInValue: true, size: advanced ? "middle" : "small", style: { width: '100%' }, className: "nodrag", onChange: handleSelectChange, value: selectedFiles, placeholder: field.placeholder || 'Select files', ...(field.required ? { required: field.required } : {}), ...(field.tooltip ? { tooltip: field.tooltip } : {}), dropdownRender: (menu) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                menu,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Divider, { style: { margin: '8px 0' } }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Space, { style: { padding: '0 8px 4px' } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Input, { placeholder: "Add file", ref: inputSelectRef, value: name, onChange: onNameChange, onKeyDown: (e) => {
                            // 1. Run the copy/paste/cut protection first (stops propagation)
                            e.stopPropagation();
                            // 2. Run the existing 'Enter' key submission logic
                            if (e.key === 'Enter') {
                                addItem(e);
                            }
                        } }),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Button, { type: "text", icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__["default"], null), onClick: addItem }, "Add")))), options: selectedFiles }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Button, { type: "primary", size: advanced ? "middle" : "small", onClick: handleBrowseFiles },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["default"], null))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(InputFiles));


/***/ },

/***/ "./lib/forms/InputQuantity.js"
/*!************************************!*\
  !*** ./lib/forms/InputQuantity.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputQuantity: () => (/* binding */ InputQuantity),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");


const InputQuantity = ({ field, value, handleChange, context, advanced }) => {
    const [isChecked, setIsChecked] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const onChange = (e) => {
        setIsChecked(e.target.checked);
        if (e.target.checked) {
            handleChange('None', field.id); // Update field value to None
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { display: 'flex', width: '100%', alignItems: 'center', gap: 8 } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.InputNumber, { ...(field.min !== undefined ? { min: field.min } : {}), ...(field.max !== undefined ? { max: field.max } : {}), id: field.id, name: field.id, value: isChecked ? undefined : value, onChange: value => handleChange(value, field.id), onKeyDown: (e) => e.stopPropagation(), size: advanced ? "middle" : "small", changeOnWheel: true, style: { flex: 1, width: '100%' } }),
        field.noneOption && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Checkbox, { checked: isChecked, onChange: onChange }, "None"))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(InputQuantity));


/***/ },

/***/ "./lib/forms/InputRegular.js"
/*!***********************************!*\
  !*** ./lib/forms/InputRegular.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputRegular: () => (/* binding */ InputRegular),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _variablesUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../variablesUtils */ "./lib/variablesUtils.js");



const InputRegular = ({ field, value, handleChange, context, advanced }) => {
    const { inputValue, inputRef, openValue, setOpenValue, optionsVariables, handleInputChange, handleSelect, filterOptions, suffix, } = (0,_variablesUtils__WEBPACK_IMPORTED_MODULE_2__.useVariableAutoComplete)({ field, value, handleChange, context, advanced });
    return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_0__.AutoComplete, { ref: inputRef, id: field.id, 
        // popupClassName="certain-category-search-dropdown"
        options: optionsVariables, filterOption: filterOptions, size: advanced ? "middle" : "small", open: openValue, onBlur: () => setOpenValue(false), defaultOpen: false, value: inputValue, onChange: handleInputChange, onSelect: handleSelect }, field.inputType === 'password' ? (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_0__.Input.Password
    // {...(field.connection && field.advanced && { addonBefore: selectBefore })}
    , { 
        // {...(field.connection && field.advanced && { addonBefore: selectBefore })}
        placeholder: field.placeholder, ref: inputRef, id: field.id, size: advanced ? "middle" : "small", name: field.id, autoComplete: "off", 
        // iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        value: inputValue, suffix: suffix, onKeyDown: (e) => e.stopPropagation() })) : (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_0__.Input
    // {...(field.connection && field.advanced && { addonBefore: selectBefore })}
    , { 
        // {...(field.connection && field.advanced && { addonBefore: selectBefore })}
        placeholder: field.placeholder, ref: inputRef, id: field.id, size: advanced ? "middle" : "small", name: field.id, autoComplete: "off", suffix: suffix, onKeyDown: (e) => e.stopPropagation() }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_1___default().memo(InputRegular));


/***/ },

/***/ "./lib/forms/TextareaRegular.js"
/*!**************************************!*\
  !*** ./lib/forms/TextareaRegular.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextareaRegular: () => (/* binding */ TextareaRegular),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");


const { TextArea } = antd__WEBPACK_IMPORTED_MODULE_1__.Input;
const TextareaRegular = ({ field, value, handleChange, advanced, rows }) => {
    const [inputValue, setInputValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value);
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        setInputValue(value); // Update inputValue when value prop changes
    }, [value]);
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        const cursorPosition = e.target.selectionStart; // Save the cursor position
        setInputValue(newValue);
        handleChange(newValue, field.id);
        // Reset cursor position after the state updates
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.selectionStart = cursorPosition;
                inputRef.current.selectionEnd = cursorPosition;
            }
        }, 0);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TextArea, { ref: inputRef, id: field.id, size: advanced ? "middle" : "small", name: field.id, placeholder: field.placeholder, onChange: handleInputChange, onKeyDown: (e) => e.stopPropagation(), value: inputValue, autoComplete: "off", rows: rows }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(TextareaRegular));


/***/ },

/***/ "./lib/forms/dataMapping.js"
/*!**********************************!*\
  !*** ./lib/forms/dataMapping.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataMapping: () => (/* binding */ DataMapping),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/DeleteOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var _RequestService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../RequestService */ "./lib/RequestService.js");




const DataMapping = ({ data, field, handleChange, defaultValue, context, componentService, commands, nodeId, advanced, }) => {
    const EditableContext = react__WEBPACK_IMPORTED_MODULE_0___default().createContext(null);
    const [loadingsInput, setLoadingsInput] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    const [loadingsOutput, setLoadingsOutput] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const EditableRow = ({ index, ...props }) => {
        const [form] = antd__WEBPACK_IMPORTED_MODULE_1__.Form.useForm();
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form, { form: form, component: false },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(EditableContext.Provider, { value: form },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", { ...props }))));
    };
    const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
        var _a, _b;
        const form = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(EditableContext);
        const [editing, setEditing] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
        const handleSelectChange = (selection, record) => {
            const value = selection.value;
            const input = items.find((item) => item.value === value); // Finds the item where value matches
            record.input = input; // Assigns the found item to record.input
            handleSave(record); // Save the updated record
        };
        let childNode = children;
        if (editable) {
            childNode = (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, { style: { margin: 0 }, name: dataIndex, rules: [
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ] },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.ConfigProvider, { renderEmpty: customizeRenderEmpty },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Select, { showSearch: true, labelInValue: true, size: advanced ? "middle" : "small", style: { width: "100%" }, className: "nodrag", onChange: (value) => {
                            handleSelectChange(value, record);
                        }, value: (_b = (_a = record.input) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "", placeholder: "Select column ...", ...(field.required ? { required: field.required } : {}), ...(field.tooltip ? { tooltip: field.tooltip } : {}), dropdownRender: (menu) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                            menu,
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Divider, { style: { margin: "8px 0" } }),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, { style: {
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "0 2px 2px",
                                } },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "primary", onClick: (event) => {
                                        _RequestService__WEBPACK_IMPORTED_MODULE_4__.RequestService.retrieveDataframeColumns(event, context, commands, componentService, setItems, setLoadingsInput, nodeId, 0, true);
                                    }, loading: loadingsInput }, "Retrieve columns")))), options: items.map((item) => ({
                            label: item.label,
                            value: item.value,
                            type: item.type,
                            named: item.named,
                        })), optionRender: (option) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, null,
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null,
                                " ",
                                option.data.label),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Tag, null, option.data.type))) }))));
        }
        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", { ...restProps }, childNode);
    };
    const [dataSource, setDataSource] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultValue || []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        handleChange(dataSource, field.id);
    }, [dataSource]);
    const customizeRenderEmpty = () => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { textAlign: "center" } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Empty, { image: antd__WEBPACK_IMPORTED_MODULE_1__.Empty.PRESENTED_IMAGE_SIMPLE })));
    const defaultColumns = [
        {
            title: "Input Columns",
            dataIndex: "input",
            width: "50%",
            editable: true,
        },
        {
            title: "Output Schema",
            dataIndex: "value",
            width: "50%",
            editable: false,
            render: (_, record) => {
                const typedRecord = record; // ✅ Type assertion
                return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, null,
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, typedRecord.value),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Tag, null, typedRecord.type))));
            },
        },
        {
            title: "",
            dataIndex: "operation",
            render: (_, record) => {
                const typedRecord = record; // ✅ Type assertion
                return dataSource.length >= 1 ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Popconfirm, { title: "Sure to delete?", onConfirm: () => handleDelete(typedRecord.key) },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["default"], null))) : null;
            },
        },
    ];
    const [form] = antd__WEBPACK_IMPORTED_MODULE_1__.Form.useForm(); // Step 1: Create form instance
    const handleAdd = () => {
        const values = form.getFieldsValue();
        console.log(values); // Do something with the form data
        console.log("Received values from form: ", values);
        const newData = {
            input: {},
            key: values.field.name,
            value: values.field.name,
            type: values.field.type,
        };
        setDataSource([...dataSource, newData]);
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
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
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
                handleSave,
            }),
        };
    });
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
            field.outputType === "relationalDatabase" ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "primary", size: "small", style: { marginBottom: 16 }, onClick: (event) => {
                    var _a;
                    setDataSource([]);
                    _RequestService__WEBPACK_IMPORTED_MODULE_4__.RequestService.retrieveTableColumns(event, `${(_a = data.schema) !== null && _a !== void 0 ? _a : "public"}`, `${data.tableName.value}`, `${field.query}`, `${field.pythonExtraction}`, context, componentService, setDataSource, setLoadingsOutput, nodeId);
                }, loading: loadingsOutput }, "Retrieve schema")) : null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Table, { components: components, rowClassName: () => "editable-row", bordered: true, dataSource: dataSource, columns: columns }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form, { style: { marginTop: 16 }, name: "Add field row", layout: "inline", form: form },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, { name: "field" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(FieldValueInput, { field: field })),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { onClick: handleAdd }, "Add a field"))))));
};
const FieldValueInput = ({ field, value = {}, onChange, }) => {
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
    const [type, setType] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
    const [nameType, setNameType] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(field.typeOptions);
    const triggerChange = (changedValue) => {
        onChange === null || onChange === void 0 ? void 0 : onChange({ name, type, ...value, ...changedValue });
    };
    const onNameChange = (e) => {
        const newName = e.target.value || "";
        setName(newName);
        triggerChange({ name: newName });
    };
    const onTypeChange = (newType) => {
        setType(newType);
        triggerChange({ type: newType });
    };
    const onNameTypeChange = (event) => {
        setNameType(event.target.value);
    };
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, { value: nameType, label: nameType }]);
        setName("");
        setTimeout(() => {
            var _a;
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }, 0);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Input, { type: "text", value: name, placeholder: "Field name", onChange: onNameChange, style: { width: 150 } }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Select, { value: type, style: { width: 220, margin: "0 8px" }, className: "nodrag", onChange: onTypeChange, dropdownRender: (menu) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                menu,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Divider, { style: { margin: "8px 0" } }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, { style: { padding: "0 8px 4px" } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Input, { placeholder: "Custom", ref: inputRef, value: nameType, onChange: onNameTypeChange, onKeyDown: (e) => e.stopPropagation() }),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "text", icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__["default"], null), onClick: addItem }, "Add type")))), options: items.map((item) => ({
                label: item.value,
                value: item.value,
            })) })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataMapping);


/***/ },

/***/ "./lib/forms/dataMapping2.js"
/*!***********************************!*\
  !*** ./lib/forms/dataMapping2.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DataMapping2: () => (/* binding */ DataMapping2),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "../../node_modules/axios/lib/axios.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dayjs */ "../../node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);





const DataMapping2 = ({}) => {
    const [form] = antd__WEBPACK_IMPORTED_MODULE_1__.Form.useForm();
    const [tableData, setTableData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]); //表格数据
    const [loading, setloading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [tableTotal, setTableTotal] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0); //表格总数
    const [selectedRowKeys, setSelectRowKeys] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]); //表格勾选的key
    //勾选
    const changeSelect = (selectedRowKeys) => {
        setSelectRowKeys(selectedRowKeys);
    };
    const getTableData = async () => {
        try {
            setloading(true);
            const { data } = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].post("http://10.151.40.16/api/dataQuality/standardRef/getStandardsApi", 
            // { ...searchValue, ...params },
            {});
            if (data.code === 200) {
                setTableData(data.data);
                setTableTotal(data.data.length);
            }
            else {
                setTableData([]);
                setTableTotal(0);
            }
        }
        catch (error) {
            antd__WEBPACK_IMPORTED_MODULE_1__.message.error(error.message);
        }
        finally {
            setloading(false);
        }
    };
    const columns = [
        { title: "标准编码", dataIndex: "standardCode", width: 200 },
        { title: "标准名称", dataIndex: "chineseName", width: 200 },
        { title: "规则类型", dataIndex: "typeCode", width: 150 },
        { title: "描述说明", dataIndex: "description", width: 150 },
        { title: "值域范围", dataIndex: "valueRange", width: 150 },
        {
            title: "创建日期",
            dataIndex: "createdDate",
            width: 200,
            render: (text) => {
                return text ? dayjs__WEBPACK_IMPORTED_MODULE_3___default()(text).format("YYYY-MM-DD HH:mm:ss") : "";
            },
        },
    ];
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        getTableData();
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        var _a, _b;
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(selectedRowKeys)) {
            const filterData = tableData.filter((item) => item.standardCode === selectedRowKeys[0]);
            if (!(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(filterData)) {
                if (!(0,lodash__WEBPACK_IMPORTED_MODULE_4__.isEmpty)((_a = filterData[0]) === null || _a === void 0 ? void 0 : _a.valueRange)) {
                    const mapData = (_b = filterData[0]) === null || _b === void 0 ? void 0 : _b.valueRange.split("-");
                    form.setFieldsValue({ min: mapData[0], max: mapData[1] });
                }
                else {
                    form.setFieldsValue({ min: undefined, max: undefined });
                }
            }
        }
        else {
            form.setFieldsValue({ min: undefined, max: undefined });
        }
    }, [JSON.stringify(selectedRowKeys), JSON.stringify(tableData)]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Table, { rowKey: "standardCode", columns: columns, dataSource: tableData, loading: loading, rowSelection: {
                selectedRowKeys,
                onChange: changeSelect,
                type: "radio",
            } }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form, { form: form },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Row, null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Col, { span: 4 },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, { label: "\u6700\u5C0F\u503C", name: "min", rules: [{ required: true }] },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Input, { disabled: true }))),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Col, { span: 4 },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, { label: "\u6700\u5927\u503C", name: "max", rules: [{ required: true }] },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Input, { disabled: true })))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataMapping2);


/***/ },

/***/ "./lib/forms/keyValueColumns.js"
/*!**************************************!*\
  !*** ./lib/forms/keyValueColumns.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeyValueColumns: () => (/* binding */ KeyValueColumns),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/MinusCircleOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var _RequestService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../RequestService */ "./lib/RequestService.js");




const KeyValueColumns = ({ field, handleChange, initialValues, context, componentService, commands, nodeId, advanced }) => {
    const [keyValuePairs, setKeyValuePairs] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValues || [{ key: { value: '', type: '', named: true }, value: '' }]);
    const [loadings, setLoadings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const handleAddPair = () => {
        setKeyValuePairs([...keyValuePairs, { key: '', value: '' }]);
        handleChange(keyValuePairs, field.id);
    };
    const handleRemovePair = (index) => {
        const pairs = [...keyValuePairs];
        pairs.splice(index, 1);
        setKeyValuePairs(pairs);
        handleChange(pairs, field.id);
    };
    const handleChangeKV = (e, index, property) => {
        const updatedKeyValuePairs = [...keyValuePairs];
        updatedKeyValuePairs[index] = {
            ...updatedKeyValuePairs[index],
            [property]: e.target.value
        };
        setKeyValuePairs(updatedKeyValuePairs);
        handleChange(updatedKeyValuePairs, field.id);
    };
    const getAvailableItems = (index) => {
        const selectedKeys = keyValuePairs.map(pair => pair.key).filter((_, idx) => idx !== index);
        return items ? items.filter(item => !selectedKeys.includes(item.value)) : [];
    };
    const getTypeNamedByValue = (items, value) => {
        const item = items.find(item => item.value === value);
        if (item) {
            return { type: item.type, named: item.named };
        }
        return undefined;
    };
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const handleSelectChange = (selection, index) => {
        const value = selection.value;
        const { type, named } = getTypeNamedByValue(items, value);
        const updatedKeyValuePairs = [...keyValuePairs];
        updatedKeyValuePairs[index] = {
            ...updatedKeyValuePairs[index],
            key: { value: value, type: type, named: named }
        };
        setKeyValuePairs(updatedKeyValuePairs);
        handleChange(updatedKeyValuePairs, field.id);
    };
    const customizeRenderEmpty = () => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { textAlign: 'center' } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Empty, { image: antd__WEBPACK_IMPORTED_MODULE_1__.Empty.PRESENTED_IMAGE_SIMPLE }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "primary", onClick: (event) => _RequestService__WEBPACK_IMPORTED_MODULE_4__.RequestService.retrieveDataframeColumns(event, context, commands, componentService, setItems, setLoadings, nodeId, 0, true), loading: loadings }, "Retrieve columns")));
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, { value: name, label: name }]);
        setName('');
        setTimeout(() => {
            var _a;
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }, 0);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.List, { name: "keyValue" }, (fields, { add, remove }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, null, keyValuePairs.map((pair, index) => {
            var _a;
            return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, { style: { display: 'flex', width: '100%', marginBottom: 8 }, align: "baseline" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.ConfigProvider, { renderEmpty: customizeRenderEmpty },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Select, { labelInValue: true, size: advanced ? "middle" : "small", style: { width: '100%', minWidth: '250px' }, className: "nodrag", onChange: (value) => { handleSelectChange(value, index); }, value: pair.key, options: getAvailableItems(index).map(item => ({ label: item.label, value: item.value })), placeholder: field.placeholder || 'Select ...', ...(field.required ? { required: field.required } : {}), ...(field.tooltip ? { tooltip: field.tooltip } : {}), dropdownRender: (menu) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                            menu,
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Divider, { style: { margin: '8px 0' } }),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, { style: { padding: '0 8px 4px' } },
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Input, { size: advanced ? "middle" : "small", placeholder: "Custom", ref: inputRef, value: name, onChange: onNameChange, onKeyDown: (e) => e.stopPropagation() }),
                                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "text", icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__["default"], null), onClick: addItem }, "Add item")))) })),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Input, { size: advanced ? "middle" : "small", name: `${field.id}_value_${index}`, placeholder: ((_a = field.placeholder) === null || _a === void 0 ? void 0 : _a.value) || 'value', id: `${field.id}_value_${index}`, value: pair.value, onChange: (e) => handleChangeKV(e, index, 'value'), autoComplete: "off" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["default"], { onClick: () => handleRemovePair(index) })));
        })),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "dashed", onClick: handleAddPair, block: true, icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__["default"], null) },
                "Add ",
                field.elementName ? field.elementName : 'item'))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(KeyValueColumns));


/***/ },

/***/ "./lib/forms/keyValueColumnsRadio.js"
/*!*******************************************!*\
  !*** ./lib/forms/keyValueColumnsRadio.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeyValueColumnsRadio: () => (/* binding */ KeyValueColumnsRadio),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/MinusCircleOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var _RequestService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../RequestService */ "./lib/RequestService.js");




const KeyValueColumnsRadio = ({ field, handleChange, initialValues, context, componentService, commands, nodeId, advanced }) => {
    const [keyValuePairs, setKeyValuePairs] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValues || [{ key: { value: '', type: '', named: true }, value: '' }]);
    const [loadings, setLoadings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [options, setOptions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(field.options);
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const findOptionByValue = (value) => {
        return field.options.find(option => option.value === value) || { value: value, label: value };
    };
    const handleAddPair = () => {
        setKeyValuePairs([...keyValuePairs, { key: '', value: '' }]);
        handleChange(keyValuePairs, field.id);
    };
    const handleRemovePair = (index) => {
        const pairs = [...keyValuePairs];
        pairs.splice(index, 1);
        setKeyValuePairs(pairs);
        handleChange(pairs, field.id);
    };
    const handleChangeKV = (newValue, index, property) => {
        const updatedKeyValuePairs = [...keyValuePairs];
        updatedKeyValuePairs[index] = {
            ...updatedKeyValuePairs[index],
            [property]: newValue
        };
        setKeyValuePairs(updatedKeyValuePairs);
        handleChange(updatedKeyValuePairs, field.id);
    };
    const getAvailableItems = (index) => {
        const selectedKeys = keyValuePairs.map(pair => pair.key).filter((_, idx) => idx !== index);
        return items ? items.filter(item => !selectedKeys.includes(item.value)) : [];
    };
    const getTypeNamedByValue = (items, value) => {
        const item = items.find(item => item.value === value);
        if (item) {
            return { type: item.type, named: item.named };
        }
        return undefined;
    };
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const handleSelectColumnChange = (selection, index) => {
        const value = selection.value;
        const { type, named } = getTypeNamedByValue(items, value);
        const updatedKeyValuePairs = [...keyValuePairs];
        updatedKeyValuePairs[index] = {
            ...updatedKeyValuePairs[index],
            key: { value: value, type: type, named: named }
        };
        setKeyValuePairs(updatedKeyValuePairs);
        handleChange(updatedKeyValuePairs, field.id);
    };
    const customizeRenderEmpty = () => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { textAlign: 'center' } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Empty, { image: antd__WEBPACK_IMPORTED_MODULE_1__.Empty.PRESENTED_IMAGE_SIMPLE }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "primary", onClick: (event) => _RequestService__WEBPACK_IMPORTED_MODULE_4__.RequestService.retrieveDataframeColumns(event, context, commands, componentService, setItems, setLoadings, nodeId, 0, true), loading: loadings }, "Retrieve columns")));
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, { value: name, label: name }]);
        setName('');
        setTimeout(() => {
            var _a;
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }, 0);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.List, { name: "keyValue" }, (fields, { add, remove }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, null, keyValuePairs.map((pair, index) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, { direction: "vertical", style: { display: 'flex', width: '100%', marginBottom: 8 } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.ConfigProvider, { renderEmpty: customizeRenderEmpty },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Select, { labelInValue: true, size: advanced ? "middle" : "small", className: "nodrag", onChange: (value) => { handleSelectColumnChange(value, index); }, value: pair.key, options: getAvailableItems(index).map(item => ({ label: item.label, value: item.value })), placeholder: 'Select ...', ...(field.required ? { required: field.required } : {}), ...(field.tooltip ? { tooltip: field.tooltip } : {}), dropdownRender: (menu) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                        menu,
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Divider, { style: { margin: '8px 0' } }),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, { style: { padding: '0 8px 4px' } },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Input, { size: advanced ? "middle" : "small", placeholder: "Custom", ref: inputRef, value: name, onChange: onNameChange, onKeyDown: (e) => e.stopPropagation() }),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "text", icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__["default"], null), onClick: addItem }, "Add item")))) })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Flex, { vertical: true, gap: "middle" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Radio.Group, { value: pair.value, onChange: (e) => handleChangeKV(e.target.value, index, 'value'), buttonStyle: "solid" }, options.map((option) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Radio.Button, { value: option.value }, option.label))))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["default"], { onClick: () => handleRemovePair(index) }))))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "dashed", onClick: handleAddPair, block: true, icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__["default"], null) },
                "Add ",
                field.elementName ? field.elementName : 'item'))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(KeyValueColumnsRadio));


/***/ },

/***/ "./lib/forms/keyValueColumnsSelect.js"
/*!********************************************!*\
  !*** ./lib/forms/keyValueColumnsSelect.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeyValueColumnsSelect: () => (/* binding */ KeyValueColumnsSelect),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/MinusCircleOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var _RequestService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../RequestService */ "./lib/RequestService.js");




const KeyValueColumnsSelect = ({ field, handleChange, initialValues, context, componentService, commands, nodeId, advanced }) => {
    const [keyValuePairs, setKeyValuePairs] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValues || [{ key: { value: '', type: '', named: true }, value: '' }]);
    const [loadings, setLoadings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [options, setOptions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(field.options);
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const findOptionByValue = (value) => {
        return field.options.find(option => option.value === value) || { value: value, label: value };
    };
    const handleAddPair = () => {
        setKeyValuePairs([...keyValuePairs, { key: '', value: '' }]);
        handleChange(keyValuePairs, field.id);
    };
    const handleRemovePair = (index) => {
        const pairs = [...keyValuePairs];
        pairs.splice(index, 1);
        setKeyValuePairs(pairs);
        handleChange(pairs, field.id);
    };
    const handleChangeKV = (newValue, index, property) => {
        const updatedKeyValuePairs = [...keyValuePairs];
        updatedKeyValuePairs[index] = {
            ...updatedKeyValuePairs[index],
            [property]: newValue
        };
        setKeyValuePairs(updatedKeyValuePairs);
        handleChange(updatedKeyValuePairs, field.id);
    };
    const getAvailableItems = (index) => {
        const selectedKeys = keyValuePairs.map(pair => pair.key).filter((_, idx) => idx !== index);
        return items ? items.filter(item => !selectedKeys.includes(item.value)) : [];
    };
    const getTypeNamedByValue = (items, value) => {
        const item = items.find(item => item.value === value);
        if (item) {
            return { type: item.type, named: item.named };
        }
        return undefined;
    };
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const handleSelectColumnChange = (selection, index) => {
        const value = selection.value;
        const { type, named } = getTypeNamedByValue(items, value);
        const updatedKeyValuePairs = [...keyValuePairs];
        updatedKeyValuePairs[index] = {
            ...updatedKeyValuePairs[index],
            key: { value: value, type: type, named: named }
        };
        setKeyValuePairs(updatedKeyValuePairs);
        handleChange(updatedKeyValuePairs, field.id);
    };
    const customizeRenderEmpty = () => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { textAlign: 'center' } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Empty, { image: antd__WEBPACK_IMPORTED_MODULE_1__.Empty.PRESENTED_IMAGE_SIMPLE }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "primary", onClick: (event) => _RequestService__WEBPACK_IMPORTED_MODULE_4__.RequestService.retrieveDataframeColumns(event, context, commands, componentService, setItems, setLoadings, nodeId, 0, true), loading: loadings }, "Retrieve columns")));
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, { value: name, label: name }]);
        setName('');
        setTimeout(() => {
            var _a;
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }, 0);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.List, { name: "keyValue" }, (fields, { add, remove }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, null, keyValuePairs.map((pair, index) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, { direction: "vertical", style: { display: 'flex', width: '100%', marginBottom: 8 } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.ConfigProvider, { renderEmpty: customizeRenderEmpty },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Select, { labelInValue: true, size: advanced ? "middle" : "small", className: "nodrag", onChange: (value) => { handleSelectColumnChange(value, index); }, value: pair.key, options: getAvailableItems(index).map(item => ({ label: item.label, value: item.value })), placeholder: 'Select ...', ...(field.required ? { required: field.required } : {}), ...(field.tooltip ? { tooltip: field.tooltip } : {}), dropdownRender: (menu) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                        menu,
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Divider, { style: { margin: '8px 0' } }),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, { style: { padding: '0 8px 4px' } },
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Input, { size: advanced ? "middle" : "small", placeholder: "Custom", ref: inputRef, value: name, onChange: onNameChange, onKeyDown: (e) => e.stopPropagation() }),
                            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "text", icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__["default"], null), onClick: addItem }, "Add item")))) })),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Select, { labelInValue: true, size: advanced ? "middle" : "small", id: `${field.id}_value_${index}`, className: "nodrag", onChange: (value) => handleChangeKV(value, index, 'value'), value: pair.value, placeholder: "Select ...", ...(field.required ? { required: field.required } : {}), ...(field.tooltip ? { tooltip: field.tooltip } : {}), options: options.map(option => ({
                    label: option.label,
                    value: option.value
                })) }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["default"], { onClick: () => handleRemovePair(index) }))))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "dashed", onClick: handleAddPair, block: true, icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__["default"], null) },
                "Add ",
                field.elementName ? field.elementName : 'item'))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(KeyValueColumnsSelect));


/***/ },

/***/ "./lib/forms/keyValueForm.js"
/*!***********************************!*\
  !*** ./lib/forms/keyValueForm.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeyValueForm: () => (/* binding */ KeyValueForm),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/MinusCircleOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/PlusOutlined.js");



const KeyValueForm = ({ field, handleChange, initialValues }) => {
    const [keyValuePairs, setKeyValuePairs] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValues || [{ key: '', value: '' }]);
    const handleAddPair = () => {
        setKeyValuePairs([...keyValuePairs, { key: '', value: '' }]);
        handleChange(keyValuePairs, field.id);
    };
    const handleRemovePair = (index) => {
        const pairs = [...keyValuePairs];
        pairs.splice(index, 1);
        setKeyValuePairs(pairs);
        handleChange(pairs, field.id);
    };
    const handleChangeKV = (e, index, property) => {
        const updatedKeyValuePairs = [...keyValuePairs];
        updatedKeyValuePairs[index] = {
            ...updatedKeyValuePairs[index],
            [property]: e.target.value
        };
        setKeyValuePairs(updatedKeyValuePairs);
        handleChange(updatedKeyValuePairs, field.id);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.List, { name: "keyValue" }, (fields, { add, remove }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, null, keyValuePairs.map((pair, index) => {
            var _a, _b;
            return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, { style: { display: 'flex', marginBottom: 8 }, align: "baseline" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Input, { name: `${field.id}_key_${index}`, placeholder: ((_a = field.placeholder) === null || _a === void 0 ? void 0 : _a.key) || 'key', id: `${field.id}_key_${index}`, value: pair.key, onChange: (e) => handleChangeKV(e, index, 'key'), onKeyDown: (e) => e.stopPropagation(), autoComplete: "off" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Input, { name: `${field.id}_value_${index}`, placeholder: ((_b = field.placeholder) === null || _b === void 0 ? void 0 : _b.value) || 'value', id: `${field.id}_value_${index}`, value: pair.value, onChange: (e) => handleChangeKV(e, index, 'value'), onKeyDown: (e) => e.stopPropagation(), autoComplete: "off" }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["default"], { onClick: () => handleRemovePair(index) })));
        })),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "dashed", onClick: handleAddPair, block: true, icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__["default"], null) },
                "Add ",
                field.elementName ? field.elementName : 'item'))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(KeyValueForm));


/***/ },

/***/ "./lib/forms/selectColumn.js"
/*!***********************************!*\
  !*** ./lib/forms/selectColumn.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectColumn: () => (/* binding */ SelectColumn),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _AddNewColumn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AddNewColumn */ "./lib/forms/AddNewColumn.js");
/* harmony import */ var _RequestService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../RequestService */ "./lib/RequestService.js");





const TYPE_GROUPS = {
    numeric: /^(u?int|float|complex|decimal)\d*$/i,
    datetime: /^(datetime|timedelta|period|datetimetz)/i,
    bool: /^bool/i,
    string: /^(object|string)$/i,
    category: /^category$/i,
};
const SelectColumn = ({ field, handleChange, defaultValue, context, componentService, commands, nodeId, advanced }) => {
    var _a;
    let allowedTypes = (_a = field.allowedTypes) !== null && _a !== void 0 ? _a : [];
    const matchers = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => allowedTypes.map(k => TYPE_GROUPS[k]).filter(Boolean), [allowedTypes]);
    const matchesAllowedType = (t) => !matchers.length || matchers.some(rx => rx.test(t));
    const byAllowedTypes = (opts) => opts.filter(o => matchesAllowedType(o.type));
    const findOptionByValue = (value) => {
        if (value === undefined) {
            return undefined;
        }
        else {
            return items.find(option => option.value === value.value) || { value: value.value, label: value.value };
        }
    };
    const getTypeNamedByValue = (items, value) => {
        const item = items.find(item => item.value === value);
        if (item) {
            return { type: item.type, named: item.named };
        }
        return undefined;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        setSelectedOption(findOptionByValue(defaultValue));
    }, [defaultValue, field.options]);
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(findOptionByValue(defaultValue));
    const [loadings, setLoadings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    const inputNb = field.inputNb ? field.inputNb - 1 : 0;
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, { value: name, label: name, type: 'object', named: true }]);
        setName('');
        setTimeout(() => {
            var _a;
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }, 0);
    };
    const handleSelectChange = (selection, option) => {
        const value = selection.value;
        const selectedOption = findOptionByValue(value);
        setSelectedOption(selectedOption);
        const { type, named } = getTypeNamedByValue(items, value);
        handleChange({ value, type, named }, field.id);
    };
    const customizeRenderEmpty = () => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { textAlign: 'center' } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Empty, { image: antd__WEBPACK_IMPORTED_MODULE_1__.Empty.PRESENTED_IMAGE_SIMPLE })));
    const displayItems = byAllowedTypes(items);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.ConfigProvider, { renderEmpty: customizeRenderEmpty },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Select, { showSearch: true, labelInValue: true, size: advanced ? "middle" : "small", style: { width: '100%' }, className: "nodrag", onChange: (value, option) => handleSelectChange(value, option), value: selectedOption, placeholder: field.placeholder || 'Select ...', ...(field.required ? { required: field.required } : {}), ...(field.tooltip ? { tooltip: field.tooltip } : {}), dropdownRender: (menu) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                menu,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Divider, { style: { margin: '8px 0' } }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 2px 4px' } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "primary", onClick: (event) => _RequestService__WEBPACK_IMPORTED_MODULE_3__.RequestService.retrieveDataframeColumns(event, context, commands, componentService, setItems, setLoadings, nodeId, inputNb, true), loading: loadings }, "Retrieve columns")),
                advanced && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Divider, { style: { margin: '8px 0' } }),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, { style: { padding: '0 8px 4px' } },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AddNewColumn__WEBPACK_IMPORTED_MODULE_2__.AddNewColumn, { items: items, setItems: setItems, setSelectedOption: setSelectedOption })))))), options: displayItems.map((item) => ({ label: item.label, value: item.value, type: item.type, named: item.named })), optionRender: (option) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null,
                    " ",
                    option.data.label),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Tag, null, option.data.type))) })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(SelectColumn));


/***/ },

/***/ "./lib/forms/selectColumns.js"
/*!************************************!*\
  !*** ./lib/forms/selectColumns.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectColumns: () => (/* binding */ SelectColumns),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _RequestService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../RequestService */ "./lib/RequestService.js");
/* harmony import */ var _AddNewColumn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AddNewColumn */ "./lib/forms/AddNewColumn.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");




const SelectColumns = ({ field, handleChange, defaultValues, context, componentService, commands, nodeId, advanced }) => {
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(field.options || []);
    const [selectedOptions, setSelectedOptions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultValues);
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [loadings, setLoadings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    const inputNb = field.inputNb ? field.inputNb - 1 : 0;
    const getTypeNamedByValue = (items, value) => {
        const item = items.find(item => item.value === value);
        if (item) {
            return { type: item.type, named: item.named };
        }
        return undefined;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        setSelectedOptions(defaultValues);
    }, [defaultValues]);
    const handleSelectChange = (selectedItems) => {
        setSelectedOptions(selectedItems);
        const options = selectedItems.map(item => ({
            ...getTypeNamedByValue(items, item.value),
            value: item.value
        }));
        handleChange(options, field.id);
    };
    const customizeRenderEmpty = () => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { textAlign: 'center' } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Empty, { image: antd__WEBPACK_IMPORTED_MODULE_3__.Empty.PRESENTED_IMAGE_SIMPLE })));
    const retrieveColumns = (event) => {
        _RequestService__WEBPACK_IMPORTED_MODULE_1__.RequestService.retrieveDataframeColumns(event, context, commands, componentService, setItems, setLoadings, nodeId, inputNb, true);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.ConfigProvider, { renderEmpty: customizeRenderEmpty },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Select, { showSearch: true, mode: "multiple", labelInValue: true, size: advanced ? "middle" : "small", style: { width: '100%' }, className: "nodrag", onChange: handleSelectChange, value: selectedOptions, placeholder: field.placeholder || 'Select ...', ...(field.required ? { required: field.required } : {}), ...(field.tooltip ? { tooltip: field.tooltip } : {}), dropdownRender: (menu) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                menu,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Divider, { style: { margin: '8px 0' } }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Space, { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 2px 2px' } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Button, { type: "primary", onClick: (event) => _RequestService__WEBPACK_IMPORTED_MODULE_1__.RequestService.retrieveDataframeColumns(event, context, commands, componentService, setItems, setLoadings, nodeId, inputNb, true), loading: loadings }, "Retrieve columns")),
                advanced && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Divider, { style: { margin: '8px 0' } }),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Space, { style: { padding: '0 8px 4px' } },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_AddNewColumn__WEBPACK_IMPORTED_MODULE_2__.AddNewColumn, { items: items, setItems: setItems, setSelectedOption: setSelectedOptions })))))), options: items.map((item) => ({ label: item.label, value: item.value, type: item.type })), optionRender: (option) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Space, null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null,
                    " ",
                    option.data.label),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_3__.Tag, null, option.data.type))) })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(SelectColumns));


/***/ },

/***/ "./lib/forms/selectCustomizable.js"
/*!*****************************************!*\
  !*** ./lib/forms/selectCustomizable.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectCustomizable: () => (/* binding */ SelectCustomizable),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");



const SelectCustomizable = ({ field, handleChange, defaultValue, advanced }) => {
    const findOptionByValue = (value) => {
        if (!value)
            return undefined; // Fix: return undefined instead of an object
        return field.options.find(option => option.value === value) || { value, label: value };
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        setSelectedOption(findOptionByValue(defaultValue));
    }, [defaultValue, field.options]);
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(field.options);
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(findOptionByValue(defaultValue));
    let index = 0;
    const addItem = (e) => {
        e.preventDefault();
        if (!name.trim())
            return; // Prevent adding empty or whitespace-only values
        setItems([...items, { value: name, label: name }]);
        setName('');
        setTimeout(() => {
            var _a;
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }, 0);
    };
    const handleSelectChange = (option) => {
        setSelectedOption(option);
        handleChange(option === null || option === void 0 ? void 0 : option.value, field.id);
    };
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Select, { labelInValue: true, size: advanced ? "middle" : "small", style: { width: '100%' }, className: "nodrag", onChange: handleSelectChange, value: selectedOption || undefined, placeholder: field.placeholder || 'Select ...', ...(field.required ? { required: field.required } : {}), ...(field.tooltip ? { tooltip: field.tooltip } : {}), dropdownRender: (menu) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
            menu,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Divider, { style: { margin: '8px 0' } }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Space, { style: { padding: '0 8px 4px' } },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Input, { placeholder: "Custom", ref: inputRef, value: name, onChange: onNameChange, onKeyDown: (e) => e.stopPropagation() }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Button, { type: "text", icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__["default"], null), onClick: addItem }, field.addItemLabel || "Add item")))), options: items.map((item) => ({ label: item.label, value: item.value })) }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(SelectCustomizable));


/***/ },

/***/ "./lib/forms/selectFromPythonQuery.js"
/*!********************************************!*\
  !*** ./lib/forms/selectFromPythonQuery.js ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectFromPythonCode: () => (/* binding */ SelectFromPythonCode),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _RequestService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../RequestService */ "./lib/RequestService.js");




const SelectFromPythonCode = ({ data, field, handleChange, defaultValue, context, componentService, commands, nodeId, advanced, }) => {
    const findOptionByValue = (value) => {
        if (value === undefined) {
            return {};
        }
        else {
            return items.find((option) => option.value === value.value) || { value: value.value, label: value.value };
        }
    };
    const getTypeNamedByValue = (items, value) => {
        const item = items.find((item) => item.value === value);
        if (item) {
            return { type: item.type, named: item.named };
        }
        return undefined;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        setSelectedOption(findOptionByValue(defaultValue));
    }, [defaultValue, field.options]);
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(findOptionByValue(defaultValue));
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, { value: name, label: name, type: 'custom', named: true }]);
        setName('');
        setTimeout(() => {
            var _a;
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }, 0);
    };
    const handleSelectChange = (selection, option) => {
        const value = selection.value;
        const selectedOption = findOptionByValue(value);
        setSelectedOption(selectedOption);
        const { type, named } = getTypeNamedByValue(items, value) || { type: '', named: false };
        handleChange({ value, type, named }, field.id);
    };
    const customizeRenderEmpty = () => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { textAlign: 'center' } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Empty, { image: antd__WEBPACK_IMPORTED_MODULE_2__.Empty.PRESENTED_IMAGE_SIMPLE })));
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const retrieveOptions = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const code = field.query; // The Python code to execute
            const response = await _RequestService__WEBPACK_IMPORTED_MODULE_3__.RequestService.executePythonCode(code, context, setItems, setLoading); // Implement this method
            const result = response.data;
            const optionsArray = result.split(',').map((item) => item.trim());
            const newOptions = optionsArray.map((item) => ({
                value: item,
                label: item,
                type: 'python',
                named: false,
            }));
            setItems(newOptions);
        }
        catch (error) {
            console.error('Error executing Python code:', error);
        }
        finally {
            setLoading(false);
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.ConfigProvider, { renderEmpty: customizeRenderEmpty },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Select, { showSearch: true, labelInValue: true, size: advanced ? 'middle' : 'small', style: { width: '100%' }, className: "nodrag", onChange: (value, option) => handleSelectChange(value, option), value: selectedOption, placeholder: field.placeholder || 'Select ...', ...(field.required ? { required: field.required } : {}), ...(field.tooltip ? { tooltip: field.tooltip } : {}), dropdownRender: (menu) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                menu,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Divider, { style: { margin: '8px 0' } }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Space, { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 2px 4px' } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Button, { type: "primary", onClick: retrieveOptions, loading: loading }, "Retrieve")),
                advanced && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Divider, { style: { margin: '8px 0' } }),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Space, { style: { padding: '0 8px 4px' } },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Input, { placeholder: "Custom", ref: inputRef, value: name, onChange: onNameChange, onKeyDown: (e) => e.stopPropagation() }),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Button, { type: "text", icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__["default"], null), onClick: addItem }, "Add")))))), options: items.map((item) => ({
                label: item.label,
                value: item.value,
                type: item.type,
                named: item.named,
            })), optionRender: (option) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Space, null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, option.data.label),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Tag, null, option.data.type))) })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(SelectFromPythonCode));


/***/ },

/***/ "./lib/forms/selectFromSQLQuery.js"
/*!*****************************************!*\
  !*** ./lib/forms/selectFromSQLQuery.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectFromSQLQuery: () => (/* binding */ SelectFromSQLQuery),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _RequestService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../RequestService */ "./lib/RequestService.js");




const SelectFromSQLQuery = ({ data, field, handleChange, defaultValue, context, componentService, commands, nodeId, advanced, }) => {
    const findOptionByValue = (value) => {
        if (value === undefined) {
            return {};
        }
        else {
            return items.find((option) => option.value === value.value) || { value: value.value, label: value.value };
        }
    };
    const getTypeNamedByValue = (items, value) => {
        const item = items.find((item) => item.value === value);
        if (item) {
            return { type: item.type, named: item.named };
        }
        return undefined;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        setSelectedOption(findOptionByValue(defaultValue));
    }, [defaultValue, field.options]);
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(findOptionByValue(defaultValue));
    const [loadings, setLoadings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const inputNb = field.inputNb ? field.inputNb - 1 : 0;
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, { value: name, label: name, type: 'table', named: true }]);
        setName('');
        setTimeout(() => {
            var _a;
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }, 0);
    };
    const handleSelectChange = (selection, option) => {
        const value = selection.value;
        const selectedOption = findOptionByValue(value);
        setSelectedOption(selectedOption);
        const { type, named } = getTypeNamedByValue(items, value) || { type: '', named: false };
        handleChange({ value, type, named }, field.id);
    };
    const customizeRenderEmpty = () => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { textAlign: 'center' } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Empty, { image: antd__WEBPACK_IMPORTED_MODULE_2__.Empty.PRESENTED_IMAGE_SIMPLE })));
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.ConfigProvider, { renderEmpty: customizeRenderEmpty },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Select, { showSearch: true, labelInValue: true, size: advanced ? 'middle' : 'small', style: { width: '100%' }, className: "nodrag", onChange: (value, option) => handleSelectChange(value, option), value: selectedOption, placeholder: field.placeholder || 'Select ...', ...(field.required ? { required: field.required } : {}), ...(field.tooltip ? { tooltip: field.tooltip } : {}), dropdownRender: (menu) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                menu,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Divider, { style: { margin: '8px 0' } }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Space, { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 2px 4px' } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Button, { type: "primary", onClick: (event) => {
                            var _a;
                            return _RequestService__WEBPACK_IMPORTED_MODULE_3__.RequestService.retrieveTableList(event, `${(_a = data.schema) !== null && _a !== void 0 ? _a : 'public'}`, field.query, context, componentService, setItems, setLoadings, nodeId);
                        }, loading: loadings }, "Retrieve")),
                advanced && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Divider, { style: { margin: '8px 0' } }),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Space, { style: { padding: '0 8px 4px' } },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Input, { placeholder: "Custom", ref: inputRef, value: name, onChange: onNameChange, onKeyDown: (e) => e.stopPropagation() }),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Button, { type: "text", icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__["default"], null), onClick: addItem }, "Add")))))), options: items.map((item) => ({
                label: item.label,
                value: item.value,
                type: item.type,
                named: item.named,
            })), optionRender: (option) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Space, null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null,
                    " ",
                    option.data.label),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Tag, null, option.data.type))) })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(SelectFromSQLQuery));


/***/ },

/***/ "./lib/forms/selectMultipleCustomizable.js"
/*!*************************************************!*\
  !*** ./lib/forms/selectMultipleCustomizable.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectMultipleCustomizable: () => (/* binding */ SelectMultipleCustomizable),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");



const SelectMultipleCustomizable = ({ field, handleChange, defaultValues, advanced }) => {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        setSelectedOptions(defaultValues);
    }, [defaultValues]);
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(field.options);
    const [name, setName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [selectedOptions, setSelectedOptions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultValues);
    let index = 0;
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, { value: name, label: name }]);
        setName('');
        setTimeout(() => {
            var _a;
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }, 0);
    };
    const handleSelectChange = (selectedItems) => {
        setSelectedOptions(selectedItems);
        handleChange(selectedItems.map(item => item.value), field.id);
    };
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Select, { mode: "multiple", labelInValue: true, size: advanced ? "middle" : "small", style: { width: '100%' }, className: "nodrag", onChange: handleSelectChange, value: selectedOptions, placeholder: field.placeholder || 'Select ...', ...(field.required ? { required: field.required } : {}), ...(field.tooltip ? { tooltip: field.tooltip } : {}), dropdownRender: (menu) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
            menu,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Divider, { style: { margin: '8px 0' } }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Space, { style: { padding: '0 8px 4px' } },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Input, { placeholder: "Custom", ref: inputRef, value: name, onChange: onNameChange, onKeyDown: (e) => e.stopPropagation() }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Button, { type: "text", icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__["default"], null), onClick: addItem }, "Add")))), options: items.map((item) => ({ label: item.label, value: item.value })) }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(SelectMultipleCustomizable));


/***/ },

/***/ "./lib/forms/selectRegular.js"
/*!************************************!*\
  !*** ./lib/forms/selectRegular.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectRegular: () => (/* binding */ SelectRegular),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/CloseOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/QuestionCircleOutlined.js");



const SelectRegular = ({ field, handleChange, defaultValue, advanced }) => {
    const findOptionByValue = (value) => {
        if (!value)
            return undefined; // Fix: return undefined instead of an object
        return field.options.find(option => option.value === value) || { value, label: value };
    };
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(field.options);
    const [selectedOption, setSelectedOption] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultValue ? findOptionByValue(defaultValue) : undefined);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        setSelectedOption(findOptionByValue(defaultValue));
    }, [defaultValue, field.options]);
    // If "field.selectionRemovable" is true, remove selection on button click
    const handleRemoveSelection = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
        setSelectedOption(undefined);
        handleChange('', field.id);
    }, [handleChange, field.id]);
    const handleSelectChange = (option) => {
        setSelectedOption(option);
        handleChange(option === null || option === void 0 ? void 0 : option.value, field.id);
    };
    const optionRenderItems = (option) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", null, option.data.label),
        option.data.tooltip && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Tooltip, { title: option.data.tooltip },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__["default"], null)))));
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Select, { labelInValue: true, size: advanced ? "middle" : "small", style: { width: '100%' }, className: "nodrag", onChange: handleSelectChange, value: selectedOption || null, placeholder: field.placeholder || 'Select ...', ...(field.required ? { required: field.required } : {}), ...(field.tooltip ? { tooltip: field.tooltip } : {}), options: items.map(item => ({
            label: item.label,
            value: item.value,
            tooltip: item.tooltip
        })), optionRender: optionRenderItems, 
        // Conditionally render a "Remove Selection" button in the dropdown footer
        dropdownRender: (menu) => field.selectionRemovable ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
            menu,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Divider, { style: { margin: '8px 0' } }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, { style: { padding: '0 4px 4px' } },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "text", icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["default"], null), onClick: handleRemoveSelection }, "Remove Selection")))) : (menu) }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(SelectRegular));


/***/ },

/***/ "./lib/forms/selectSheetFromExcel.js"
/*!*******************************************!*\
  !*** ./lib/forms/selectSheetFromExcel.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectSheetFromExcel: () => (/* binding */ SelectSheetFromExcel),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _RequestService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../RequestService */ "./lib/RequestService.js");




const SelectSheetFromExcel = ({ data, field, handleChange, defaultValue, context, componentService, commands, nodeId, advanced, }) => {
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [selectedOptions, setSelectedOptions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultValue);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [customName, setCustomName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const findOptionByValue = (value) => items.find((option) => option.value === value) || { label: value, value };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (defaultValue) {
            setSelectedOptions(defaultValue);
        }
    }, [defaultValue]);
    const retrieveSheets = (event) => {
        _RequestService__WEBPACK_IMPORTED_MODULE_3__.RequestService.retrieveSheetNames(event, context, componentService, setItems, setLoading, nodeId);
    };
    const handleSelectChange = (selectedItems) => {
        setSelectedOptions(selectedItems);
        handleChange(selectedItems.map((item) => item.value), field.id);
    };
    const addItem = () => {
        const newItem = { value: customName, label: customName };
        setItems([...items, newItem]);
        setSelectedOptions([...selectedOptions, newItem]);
        handleChange([...selectedOptions.map((item) => item.value), customName], field.id);
        setCustomName('');
        setTimeout(() => { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }, 0);
    };
    const customizeRenderEmpty = () => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { textAlign: 'center' } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Empty, { image: antd__WEBPACK_IMPORTED_MODULE_2__.Empty.PRESENTED_IMAGE_SIMPLE, description: "No sheets available" })));
    const onNameChange = (event) => {
        setCustomName(event.target.value);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.ConfigProvider, { renderEmpty: customizeRenderEmpty },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Select, { mode: "multiple", labelInValue: true, size: advanced ? 'middle' : 'small', style: { width: '100%' }, value: selectedOptions, onChange: handleSelectChange, placeholder: field.placeholder || 'Select sheets', dropdownRender: (menu) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                menu,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Divider, { style: { margin: '8px 0' } }),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Space, { style: { display: 'flex', justifyContent: 'center', padding: '0 8px 4px' } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Button, { type: "primary", onClick: retrieveSheets, loading: loading }, "Retrieve Sheets")),
                advanced && (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Divider, { style: { margin: '8px 0' } }),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Space, { style: { padding: '0 8px 4px' } },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Input, { placeholder: "Custom Sheet", ref: inputRef, value: customName, onChange: onNameChange, onKeyDown: (e) => e.stopPropagation() }),
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_2__.Button, { type: "text", icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_1__["default"], null), onClick: addItem }, "Add")))))), options: items.map((item) => ({
                label: item.label,
                value: item.value,
            })) })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(SelectSheetFromExcel));


/***/ },

/***/ "./lib/forms/selectTokenization.js"
/*!*****************************************!*\
  !*** ./lib/forms/selectTokenization.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectTokenization: () => (/* binding */ SelectTokenization),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");


const SelectTokenization = ({ field, handleChange, defaultValue, advanced }) => {
    // Assuming defaultValues are already in the correct format
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        setSelectedOptions(defaultValue);
    }, [defaultValue]);
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(field.options);
    const [selectedOptions, setSelectedOptions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultValue);
    const handleSelectChange = (selectedItems) => {
        setSelectedOptions(selectedItems);
        handleChange(selectedItems.map(item => item.value), field.id);
    };
    const customizeRenderEmpty = () => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { style: { display: 'none' } }));
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.ConfigProvider, { renderEmpty: customizeRenderEmpty },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Select, { mode: "tags", labelInValue: true, size: advanced ? "middle" : "small", style: { width: '100%' }, className: "nodrag", onChange: handleSelectChange, value: selectedOptions, tokenSeparators: [','], placeholder: field.placeholder || 'Select ...', ...(field.required ? { required: field.required } : {}), ...(field.tooltip ? { tooltip: field.tooltip } : {}), options: items.map(item => ({
                label: item.label,
                value: item.value
            })) })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(SelectTokenization));


/***/ },

/***/ "./lib/forms/transferData.js"
/*!***********************************!*\
  !*** ./lib/forms/transferData.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransferData: () => (/* binding */ TransferData),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dnd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dnd */ "webpack/sharing/consume/default/react-dnd/react-dnd");
/* harmony import */ var _RequestService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../RequestService */ "./lib/RequestService.js");
/* harmony import */ var _DndProviderWrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../DndProviderWrapper */ "./lib/DndProviderWrapper.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");





const TransferData = ({ field, handleChange, defaultValue, context, componentService, commands, nodeId, advanced }) => {
    const DragableBodyRow = ({ index, rowDrop, className, style, ...restProps }) => {
        const ref = react__WEBPACK_IMPORTED_MODULE_0___default().useRef();
        const [{ isOver, canDrop, dropPosition }, drop] = (0,react_dnd__WEBPACK_IMPORTED_MODULE_1__.useDrop)({
            accept: 'DragableBodyRow',
            canDrop: (item) => item.index !== index,
            collect: (monitor) => {
                const item = monitor.getItem();
                if (!item || item.index === index) {
                    return { isOver: false, canDrop: false, dropPosition: null };
                }
                return {
                    isOver: monitor.isOver({ shallow: true }),
                    canDrop: monitor.canDrop(),
                    dropPosition: item.index < index ? 'below' : 'above',
                };
            },
            drop: (item) => {
                if (item.index !== index) {
                    rowDrop(item.index, index);
                }
            },
        });
        const [{ isDragging }, drag] = (0,react_dnd__WEBPACK_IMPORTED_MODULE_1__.useDrag)({
            type: 'DragableBodyRow',
            item: { type: 'DragableBodyRow', index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });
        drag(drop(ref));
        // Create more visible styles based on drop position
        const dropIndicatorStyle = isOver && canDrop ? {
            boxShadow: dropPosition === 'above'
                ? 'inset 0 3px 0 0 #5f9b97'
                : 'inset 0 -3px 0 0 #5f9b97',
            backgroundColor: 'rgba(95, 155, 151, 0.05)',
        } : {};
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", { ref: ref, className: `${className} draggable`, style: {
                cursor: 'move',
                opacity: isDragging ? 0.3 : 1,
                transition: 'opacity 0.2s ease',
                ...dropIndicatorStyle,
                ...style
            }, ...restProps }));
    };
    // Customize Table Transfer
    const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.Transfer, { ...restProps }, ({ direction, filteredItems, onItemSelect, onItemSelectAll, selectedKeys: listSelectedKeys, disabled: listDisabled, }) => {
        const columns = direction === 'left' ? leftColumns : rightColumns;
        const displayType = direction === 'right' ? 'target' : 'source';
        const rowSelection = {
            getCheckboxProps: () => ({ disabled: listDisabled }),
            onChange(selectedRowKeys) {
                onItemSelectAll(selectedRowKeys, 'replace');
            },
            selectedRowKeys: listSelectedKeys,
            selections: [antd__WEBPACK_IMPORTED_MODULE_4__.Table.SELECTION_ALL, antd__WEBPACK_IMPORTED_MODULE_4__.Table.SELECTION_INVERT, antd__WEBPACK_IMPORTED_MODULE_4__.Table.SELECTION_NONE],
        };
        if (displayType === 'source') {
            return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.Table, { rowSelection: rowSelection, columns: columns, dataSource: filteredItems, size: "small", className: "always-show-scrollbar", style: { pointerEvents: listDisabled ? 'none' : undefined }, pagination: false, scroll: { y: 400 }, onRow: ({ key, disabled: itemDisabled }) => ({
                    onClick: () => {
                        if (itemDisabled || listDisabled) {
                            return;
                        }
                        onItemSelect(key, !listSelectedKeys.includes(key));
                    },
                }) }));
        }
        else {
            const rowDrop = (dragIndex, hoverIndex) => {
                // Ensure the indices are valid
                if (dragIndex === undefined || hoverIndex === undefined) {
                    console.error("Invalid drag or hover index");
                    return;
                }
                // Create a copy of the target keys with all properties intact
                let newKeys = [...targetKeys];
                // Extract the dragged item and re-insert at the hover index
                const dragRow = newKeys.splice(dragIndex, 1)[0]; // Ensure correct extraction
                newKeys.splice(hoverIndex, 0, dragRow); // Insert at the correct position
                setTargetKeys(newKeys);
                const savedSchema = { sourceData: sourceData, targetKeys: newKeys };
                handleChange(savedSchema, field.id);
            };
            return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_DndProviderWrapper__WEBPACK_IMPORTED_MODULE_3__["default"], null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.Table, { rowSelection: rowSelection, columns: columns, dataSource: filteredItems, components: {
                        body: {
                            row: DragableBodyRow,
                        },
                    }, size: "small", className: "always-show-scrollbar", style: { pointerEvents: listDisabled ? 'none' : undefined }, pagination: false, scroll: { y: 400 }, onRow: (record, idx) => ({
                        index: idx,
                        rowDrop,
                        onClick: () => {
                            if (record.disabled) {
                                return;
                            }
                            onItemSelect(record.key, !listSelectedKeys.includes(record.key)); // Toggle selection
                        },
                    }) })));
        }
    }));
    const [items, setItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [sourceData, setSourceData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [targetKeys, setTargetKeys] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [loadings, setLoadings] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const newSourceData = items.map(item => ({
            ...item,
            key: item.value,
            title: item.value
        }));
        setSourceData(newSourceData);
        // Update targetKeys to only include keys that exist in the new source data
        setTargetKeys(prevTargetKeys => prevTargetKeys.filter(key => newSourceData.some(item => item.key === key)));
    }, [items]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (defaultValue && defaultValue.sourceData && defaultValue.targetKeys) {
            setSourceData(defaultValue.sourceData);
            setTargetKeys(defaultValue.targetKeys);
        }
        else {
            // Provide default initialization for sourceData and targetKeys if defaultValue doesn't exist
            setSourceData([]);
            setTargetKeys([]);
        }
    }, [defaultValue]);
    const columns = [
        {
            dataIndex: 'value',
            title: 'Column',
        },
        {
            dataIndex: 'type',
            title: 'Type',
            render: (type) => react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.Tag, null, type),
        }
    ];
    const onChange = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
        const savedSchema = { sourceData: sourceData, targetKeys: nextTargetKeys };
        handleChange(savedSchema, field.id);
    };
    const renderFooter = (_, info) => {
        if ((info === null || info === void 0 ? void 0 : info.direction) === 'left') {
            return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.Button, { type: "primary", size: "small", style: { float: 'left', margin: 5 }, onClick: (event) => {
                    setItems([]);
                    _RequestService__WEBPACK_IMPORTED_MODULE_2__.RequestService.retrieveDataframeColumns(event, context, commands, componentService, setItems, setLoadings, nodeId, 0, true);
                }, loading: loadings }, "Retrieve columns"));
        }
        return;
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TableTransfer, { dataSource: sourceData, targetKeys: targetKeys, showSearch: true, onChange: onChange, operations: ['include', 'exclude'], filterOption: (inputValue, item) => item.key.indexOf(inputValue) !== -1 || item.type.indexOf(inputValue) !== -1, leftColumns: columns, rightColumns: columns, footer: renderFooter }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.Space, { style: { marginTop: 16 } })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(TransferData));


/***/ },

/***/ "./lib/forms/valuesListForm.js"
/*!*************************************!*\
  !*** ./lib/forms/valuesListForm.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ValuesListForm: () => (/* binding */ ValuesListForm),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/MinusCircleOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/PlusOutlined.js");



const ValuesListForm = ({ field, handleChange, initialValues }) => {
    const [values, setValues] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValues || ['']);
    const handleAddValue = () => {
        setValues([...values, '']);
        handleChange(values, field.id);
    };
    const handleRemoveValue = (index) => {
        const updatedValues = [...values];
        updatedValues.splice(index, 1);
        setValues(updatedValues);
        handleChange(updatedValues, field.id);
    };
    const handleChangeValue = (e, index) => {
        const updatedValues = [...values];
        updatedValues[index] = e.target.value;
        setValues(updatedValues);
        handleChange(updatedValues, field.id);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.List, { name: "values" }, (fields, { add, remove }) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, null, values.map((value, index) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Space, { key: index, style: { display: 'flex', marginBottom: 8 }, align: "baseline" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Input, { name: `${field.id}_value_${index}`, placeholder: "Value", id: `${field.id}_value_${index}`, value: value, onChange: (e) => handleChangeValue(e, index), onKeyDown: (e) => e.stopPropagation(), autoComplete: "off" }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["default"], { onClick: () => handleRemoveValue(index) }))))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Form.Item, null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "dashed", onClick: handleAddValue, block: true, icon: react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__["default"], null) }, "Add Value"))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0___default().memo(ValuesListForm));


/***/ },

/***/ "./lib/icons.js"
/*!**********************!*\
  !*** ./lib/icons.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bracesIcon: () => (/* binding */ bracesIcon),
/* harmony export */   claudeIcon: () => (/* binding */ claudeIcon),
/* harmony export */   crosshairIcon: () => (/* binding */ crosshairIcon),
/* harmony export */   minusIcon: () => (/* binding */ minusIcon),
/* harmony export */   mistralIcon: () => (/* binding */ mistralIcon),
/* harmony export */   openaiIcon: () => (/* binding */ openaiIcon),
/* harmony export */   playCircleIcon: () => (/* binding */ playCircleIcon),
/* harmony export */   playIcon: () => (/* binding */ playIcon),
/* harmony export */   plusIcon: () => (/* binding */ plusIcon),
/* harmony export */   searchIcon: () => (/* binding */ searchIcon),
/* harmony export */   settingsIcon: () => (/* binding */ settingsIcon),
/* harmony export */   trashIcon: () => (/* binding */ trashIcon),
/* harmony export */   wandIcon: () => (/* binding */ wandIcon),
/* harmony export */   warningIcon: () => (/* binding */ warningIcon),
/* harmony export */   xIcon: () => (/* binding */ xIcon)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_icons_trash_16_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/icons/trash-16.svg */ "./style/icons/trash-16.svg");
/* harmony import */ var _style_icons_x_16_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/icons/x-16.svg */ "./style/icons/x-16.svg");
/* harmony import */ var _style_icons_search_16_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/icons/search-16.svg */ "./style/icons/search-16.svg");
/* harmony import */ var _style_icons_crosshair_16_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/icons/crosshair-16.svg */ "./style/icons/crosshair-16.svg");
/* harmony import */ var _style_icons_minus_16_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/icons/minus-16.svg */ "./style/icons/minus-16.svg");
/* harmony import */ var _style_icons_plus_16_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style/icons/plus-16.svg */ "./style/icons/plus-16.svg");
/* harmony import */ var _style_icons_play_16_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/icons/play-16.svg */ "./style/icons/play-16.svg");
/* harmony import */ var _style_icons_play_circle_16_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../style/icons/play-circle-16.svg */ "./style/icons/play-circle-16.svg");
/* harmony import */ var _style_icons_settings_16_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../style/icons/settings-16.svg */ "./style/icons/settings-16.svg");
/* harmony import */ var _style_icons_braces_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../style/icons/braces.svg */ "./style/icons/braces.svg");
/* harmony import */ var _style_icons_alert_triangle_fill_16_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../style/icons/alert-triangle-fill-16.svg */ "./style/icons/alert-triangle-fill-16.svg");
/* harmony import */ var _style_icons_wand_16_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../style/icons/wand-16.svg */ "./style/icons/wand-16.svg");
/* harmony import */ var _style_icons_openai_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../style/icons/openai.svg */ "./style/icons/openai.svg");
/* harmony import */ var _style_icons_claude_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../style/icons/claude.svg */ "./style/icons/claude.svg");
/* harmony import */ var _style_icons_mistral_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../style/icons/mistral.svg */ "./style/icons/mistral.svg");
















const trashIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:trash-icon',
    svgstr: _style_icons_trash_16_svg__WEBPACK_IMPORTED_MODULE_1__
});
const xIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:cog-icon',
    svgstr: _style_icons_x_16_svg__WEBPACK_IMPORTED_MODULE_2__
});
const settingsIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:settings-icon',
    svgstr: _style_icons_settings_16_svg__WEBPACK_IMPORTED_MODULE_9__
});
const searchIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:search-icon',
    svgstr: _style_icons_search_16_svg__WEBPACK_IMPORTED_MODULE_3__
});
const minusIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:minus-icon',
    svgstr: _style_icons_minus_16_svg__WEBPACK_IMPORTED_MODULE_5__
});
const plusIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:plus-icon',
    svgstr: _style_icons_plus_16_svg__WEBPACK_IMPORTED_MODULE_6__
});
const playIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:play-icon',
    svgstr: _style_icons_play_16_svg__WEBPACK_IMPORTED_MODULE_7__
});
const playCircleIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:play-circle-icon',
    svgstr: _style_icons_play_circle_16_svg__WEBPACK_IMPORTED_MODULE_8__
});
const crosshairIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:crosshair-icon',
    svgstr: _style_icons_crosshair_16_svg__WEBPACK_IMPORTED_MODULE_4__
});
const warningIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:warning-icon',
    svgstr: _style_icons_alert_triangle_fill_16_svg__WEBPACK_IMPORTED_MODULE_11__
});
const bracesIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:braces-icon',
    svgstr: _style_icons_braces_svg__WEBPACK_IMPORTED_MODULE_10__
});
const wandIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:wand-icon',
    svgstr: _style_icons_wand_16_svg__WEBPACK_IMPORTED_MODULE_12__
});
const openaiIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:openai-icon',
    svgstr: _style_icons_openai_svg__WEBPACK_IMPORTED_MODULE_13__
});
const claudeIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:claude-icon',
    svgstr: _style_icons_claude_svg__WEBPACK_IMPORTED_MODULE_14__
});
const mistralIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:mistral-icon',
    svgstr: _style_icons_mistral_svg__WEBPACK_IMPORTED_MODULE_15__
});


/***/ },

/***/ "./lib/index.js"
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CodeGenerator: () => (/* reexport safe */ _CodeGenerator__WEBPACK_IMPORTED_MODULE_6__.CodeGenerator),
/* harmony export */   CodeGeneratorDagster: () => (/* reexport safe */ _CodeGeneratorDagster__WEBPACK_IMPORTED_MODULE_7__.CodeGeneratorDagster),
/* harmony export */   CodeTextarea: () => (/* reexport safe */ _forms__WEBPACK_IMPORTED_MODULE_14__.CodeTextarea),
/* harmony export */   CodeTextareaMirror: () => (/* reexport safe */ _forms__WEBPACK_IMPORTED_MODULE_15__.CodeTextareaMirror),
/* harmony export */   ComponentManager: () => (/* binding */ ComponentManager),
/* harmony export */   ExecutionBadge: () => (/* reexport safe */ _ExecutionBadge__WEBPACK_IMPORTED_MODULE_17__.ExecutionBadge),
/* harmony export */   GenerateUIFormComponent: () => (/* reexport safe */ _configUtils__WEBPACK_IMPORTED_MODULE_3__.GenerateUIFormComponent),
/* harmony export */   IPipelineExecutionToken: () => (/* reexport safe */ _ExecutionToken__WEBPACK_IMPORTED_MODULE_16__.IPipelineExecutionToken),
/* harmony export */   InputFile: () => (/* reexport safe */ _forms__WEBPACK_IMPORTED_MODULE_10__.InputFile),
/* harmony export */   InputRegular: () => (/* reexport safe */ _forms__WEBPACK_IMPORTED_MODULE_11__.InputRegular),
/* harmony export */   PipelineComponent: () => (/* reexport safe */ _PipelineComponent__WEBPACK_IMPORTED_MODULE_5__.PipelineComponent),
/* harmony export */   PipelineService: () => (/* reexport safe */ _PipelineService__WEBPACK_IMPORTED_MODULE_8__.PipelineService),
/* harmony export */   RequestService: () => (/* reexport safe */ _RequestService__WEBPACK_IMPORTED_MODULE_9__.RequestService),
/* harmony export */   SelectColumns: () => (/* reexport safe */ _forms__WEBPACK_IMPORTED_MODULE_13__.SelectColumns),
/* harmony export */   SelectRegular: () => (/* reexport safe */ _forms__WEBPACK_IMPORTED_MODULE_12__.SelectRegular),
/* harmony export */   createZoomSelector: () => (/* reexport safe */ _rendererUtils__WEBPACK_IMPORTED_MODULE_4__.createZoomSelector),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   onChange: () => (/* reexport safe */ _configUtils__WEBPACK_IMPORTED_MODULE_3__.onChange),
/* harmony export */   renderComponentUI: () => (/* reexport safe */ _rendererUtils__WEBPACK_IMPORTED_MODULE_4__.renderComponentUI),
/* harmony export */   renderHandle: () => (/* reexport safe */ _rendererUtils__WEBPACK_IMPORTED_MODULE_4__.renderHandle),
/* harmony export */   setDefaultConfig: () => (/* reexport safe */ _configUtils__WEBPACK_IMPORTED_MODULE_3__.setDefaultConfig)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/filebrowser */ "webpack/sharing/consume/default/@jupyterlab/filebrowser");
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _configUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./configUtils */ "./lib/configUtils.js");
/* harmony import */ var _rendererUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rendererUtils */ "./lib/rendererUtils.js");
/* harmony import */ var _PipelineComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PipelineComponent */ "./lib/PipelineComponent.js");
/* harmony import */ var _CodeGenerator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CodeGenerator */ "./lib/CodeGenerator.js");
/* harmony import */ var _CodeGeneratorDagster__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CodeGeneratorDagster */ "./lib/CodeGeneratorDagster.js");
/* harmony import */ var _PipelineService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PipelineService */ "./lib/PipelineService.js");
/* harmony import */ var _RequestService__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./RequestService */ "./lib/RequestService.js");
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./forms */ "./lib/forms/InputFile.js");
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./forms */ "./lib/forms/InputRegular.js");
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./forms */ "./lib/forms/selectRegular.js");
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./forms */ "./lib/forms/selectColumns.js");
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./forms */ "./lib/forms/CodeTextarea.js");
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./forms */ "./lib/forms/CodeTextareaMirror.js");
/* harmony import */ var _ExecutionToken__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./ExecutionToken */ "./lib/ExecutionToken.js");
/* harmony import */ var _ExecutionBadge__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ExecutionBadge */ "./lib/ExecutionBadge.js");
// index.ts — working provider + TS/TSX registrator with safe path handling and icon support



// === Public re-exports (keep as you had) ===










const ComponentManager = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@amphi/pipeline-components-manager:provider');
// === Service ===
class ComponentService {
    constructor() {
        this._components = [];
    }
    getComponents() { return this._components; }
    getComponent(id) { return this._components.find(c => c._id === id); }
    addComponent(newComponent) {
        const idx = this._components.findIndex(c => c._id === newComponent._id);
        if (idx >= 0) {
            this._components[idx] = newComponent;
            console.info(`[Amphi] Replaced component with id "${newComponent._id}".`);
        }
        else {
            this._components.push(newComponent);
        }
    }
    getComponentCount() { return this._components.length; }
    removeComponent(id) { this._components = this._components.filter(c => c._id !== id); }
}
// === Provider plugin ===
const managerPlugin = {
    id: '@amphi/pipeline-components-manager:plugin',
    description: 'Provider plugin for the pipeline editor "component" service object.',
    autoStart: true,
    provides: ComponentManager,
    activate: () => {
        console.log('JupyterLab extension (@amphi/pipeline-components-manager/provider) activated');
        return new ComponentService();
    }
};
// Remove imports and JSX to keep blob-import self-contained
function sanitizeSource(src) {
    // 1) Disallow any import statements
    if (/\bimport\s+.*from\s+['"][^'"]+['"]\s*;?/.test(src) || /\bimport\s*['"][^'"]+['"]\s*;?/.test(src)) {
        throw new Error('[Amphi] External imports are not allowed in dynamically registered files.');
    }
    // 2) Strip comments
    const withoutBlockComments = src.replace(/\/\*[\s\S]*?\*\//g, '');
    const withoutLineComments = withoutBlockComments.replace(/(^|[^:])\/\/.*$/gm, '$1'); // keep "http://"
    // 3) Strip string literals before JSX detection to avoid false positives
    //    Single quotes, double quotes, and template literals
    const stripSingles = withoutLineComments.replace(/'(?:\\.|[^'\\])*'/g, "''");
    const stripDoubles = stripSingles.replace(/"(?:\\.|[^"\\])*"/g, '""');
    // Replace template contents with empty template to keep line numbers roughly stable
    const strippedForJsxCheck = stripDoubles.replace(/`(?:\\.|[^\\`]|\\`|\$\{[^}]*\})*`/g, '``');
    // 4) Basic JSX detection on stripped source
    //    This catches real JSX like <Div ...> but ignores anything that was in strings/comments
    if (/<[A-Za-z][\w:-]*(\s[^>]*)?>/.test(strippedForJsxCheck)) {
        throw new Error('[Amphi] JSX is not allowed. Export a plain object or functions.');
    }
    // 5) Strip type-only exports and convert exported declarations to local
    let out = withoutLineComments.replace(/\bexport\s+type\s+[^;]+;?/g, '');
    out = out.replace(/\bexport\s+(?=(const|let|var|class|function)\b)/g, '');
    return out;
}
// Turn {svgstr} into a LabIcon if available (works without static imports)
async function maybeWrapAsLabIcon(icon) {
    var _a;
    if (!icon || typeof icon === 'function' || (icon === null || icon === void 0 ? void 0 : icon.react))
        return icon;
    if (!(icon === null || icon === void 0 ? void 0 : icon.svgstr))
        return icon;
    try {
        const w = globalThis || window;
        const ui = (w === null || w === void 0 ? void 0 : w.require) ? w.require('@jupyterlab/ui-components') : null;
        const LabIcon = (_a = ui === null || ui === void 0 ? void 0 : ui.LabIcon) !== null && _a !== void 0 ? _a : (await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components", 23))).LabIcon;
        if (LabIcon) {
            return new LabIcon({ name: icon.name || 'amphi-inline', svgstr: icon.svgstr });
        }
    }
    catch (_b) {
        // fallback: leave as inline svgstr; the UI supports it
    }
    return icon;
}
// Normalize minimal component shape
async function normalizeComponent(candidate) {
    var _a, _b, _c, _d, _e, _f, _g;
    const g = globalThis;
    const Base = (_a = g === null || g === void 0 ? void 0 : g.Amphi) === null || _a === void 0 ? void 0 : _a.BaseCoreComponent;
    const inst = typeof (candidate === null || candidate === void 0 ? void 0 : candidate.getInstance) === 'function' ? candidate.getInstance() : candidate;
    if (!inst || typeof inst !== 'object')
        return null;
    // If it’s really a BaseCoreComponent instance, keep it intact
    if (Base && inst instanceof Base) {
        if (inst._icon)
            inst._icon = await maybeWrapAsLabIcon(inst._icon);
        // ensure required fields exist
        inst._type = String(inst._type || 'uncategorized');
        inst._category = String(inst._category || inst._type || 'uncategorized');
        inst._default = (_b = inst._default) !== null && _b !== void 0 ? _b : {};
        inst._form = (_c = inst._form) !== null && _c !== void 0 ? _c : {};
        inst._description = (_d = inst._description) !== null && _d !== void 0 ? _d : '';
        return inst;
    }
    // Fallback: plain-object path (legacy)
    if (!inst._id || !inst._name)
        return null;
    return {
        _id: String(inst._id),
        _name: String(inst._name),
        _type: String(inst._type || 'uncategorized'),
        _category: String(inst._category || inst._type || 'uncategorized'),
        _icon: await maybeWrapAsLabIcon(inst._icon),
        _default: (_e = inst._default) !== null && _e !== void 0 ? _e : {},
        _form: (_f = inst._form) !== null && _f !== void 0 ? _f : {},
        _description: (_g = inst._description) !== null && _g !== void 0 ? _g : '',
        provideImports: inst.provideImports,
        generateComponentCode: inst.generateComponentCode,
        getInstance: undefined
    };
}
// === Command plugin: register TS/TSX component ===
const addTsxComponentPlugin = {
    id: '@amphi/pipeline-components-manager:add-tsx-component',
    autoStart: true,
    requires: [ComponentManager, _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_2__.IFileBrowserFactory, _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_2__.IDefaultFileBrowser, _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette],
    activate: async (app, componentService, _browserFactory, defaultFileBrowser, palette) => {
        console.log('JupyterLab extension (@amphi/pipeline-components-manager/add-tsx-component) activated');
        const command = '@amphi/pipeline-components-manager:register-tsx';
        app.commands.addCommand(command, {
            label: () => 'Add Component',
            caption: 'Transpile and register this TS/TSX file as an Amphi component',
            execute: async (args) => {
                var _a, _b, _c, _d, _e, _f, _g;
                try {
                    // Resolve a string path
                    let path = typeof args['path'] === 'string' ? args['path'] : '';
                    if (!path) {
                        const it = defaultFileBrowser.selectedItems().next();
                        if (!it || it.done || !it.value) {
                            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification.error('No file selected in the file browser.', {
                                actions: [{ label: 'Reload and try again', callback: () => location.reload() }],
                                autoClose: 6000
                            });
                            return;
                        }
                        path = (_a = it.value.path) !== null && _a !== void 0 ? _a : '';
                    }
                    if (!path || typeof path !== 'string') {
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification.error('Could not resolve a valid string path.', {
                            actions: [{ label: 'Reload and try again', callback: () => location.reload() }],
                            autoClose: 6000
                        });
                        return;
                    }
                    if (!/\.(ts|tsx)$/i.test(path)) {
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification.error('Please select a .ts or .tsx file.', { autoClose: 6000 });
                        return;
                    }
                    // Load file text
                    const model = await app.serviceManager.contents.get(path, { content: true });
                    const raw = model.content;
                    if (typeof raw !== 'string') {
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification.error('File content is not text.', { autoClose: 6000 });
                        return;
                    }
                    // Sanitize before transpile
                    let source;
                    try {
                        source = sanitizeSource(raw);
                    }
                    catch (e) {
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification.error(String((_b = e === null || e === void 0 ? void 0 : e.message) !== null && _b !== void 0 ? _b : e), {
                            actions: [{ label: 'Reload and try again', callback: () => location.reload() }],
                            autoClose: 8000
                        });
                        return;
                    }
                    // Transpile
                    const ts = await __webpack_require__.e(/*! import() */ "webpack_sharing_consume_default_typescript_typescript").then(__webpack_require__.t.bind(__webpack_require__, /*! typescript */ "webpack/sharing/consume/default/typescript/typescript", 23));
                    const transpiled = ts.transpileModule(source, {
                        compilerOptions: {
                            target: ts.ScriptTarget.ES2020,
                            module: ts.ModuleKind.ES2020,
                            esModuleInterop: false,
                            jsx: ts.JsxEmit.Preserve
                        }
                    });
                    if ((_c = transpiled.diagnostics) === null || _c === void 0 ? void 0 : _c.length) {
                        console.warn('[Amphi] Diagnostics:', transpiled.diagnostics);
                    }
                    // Import from blob
                    const blob = new Blob([transpiled.outputText], { type: 'text/javascript' });
                    const url = URL.createObjectURL(blob);
                    try {
                        const mod = await import(/* webpackIgnore: true */ url);
                        const candidate = (_e = (_d = mod === null || mod === void 0 ? void 0 : mod.default) !== null && _d !== void 0 ? _d : mod === null || mod === void 0 ? void 0 : mod.Component) !== null && _e !== void 0 ? _e : mod;
                        const normalized = await normalizeComponent(candidate);
                        if (!normalized) {
                            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification.error('No valid component export found. Expect default export with {_id, _name}.', {
                                autoClose: 7000
                            });
                            return;
                        }
                        // Ensure required fields
                        if (!normalized._category)
                            normalized._category = normalized._type || 'uncategorized';
                        const existed = !!componentService.getComponent(normalized._id);
                        componentService.addComponent(normalized);
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification.success(existed
                            ? `Component "${normalized._name}" (${normalized._id}) updated successfully.`
                            : `Component "${normalized._name}" (${normalized._id}) added successfully.`, { autoClose: 4000 });
                        console.log('[Amphi] Component registered:', normalized._id, normalized);
                    }
                    catch (err) {
                        console.error('[Amphi] Failed to import transpiled module', err);
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification.error(`Failed to import transpiled module. ${String((_f = err === null || err === void 0 ? void 0 : err.message) !== null && _f !== void 0 ? _f : err)}`, {
                            actions: [{ label: 'Reload and try again', callback: () => location.reload() }],
                            autoClose: 8000
                        });
                    }
                    finally {
                        URL.revokeObjectURL(url);
                    }
                }
                catch (err) {
                    console.error('[Amphi] Unexpected error while processing file', err);
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Notification.error(`Unexpected error while processing file. ${String((_g = err === null || err === void 0 ? void 0 : err.message) !== null && _g !== void 0 ? _g : err)}`, {
                        actions: [{ label: 'Reload and try again', callback: () => location.reload() }],
                        autoClose: 8000
                    });
                }
            }
        });
        // Palette and context menu
        palette.addItem({ command, category: 'Pipeline', args: { isPalette: true } });
        app.contextMenu.addItem({ command, selector: '.jp-DirListing-item', rank: 100 });
        palette.addItem({ command, category: 'Amphi' });
    }
};
const plugins = [managerPlugin, addTsxComponentPlugin];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);


/***/ },

/***/ "./lib/rendererUtils.js"
/*!******************************!*\
  !*** ./lib/rendererUtils.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createZoomSelector: () => (/* binding */ createZoomSelector),
/* harmony export */   renderComponentUI: () => (/* binding */ renderComponentUI),
/* harmony export */   renderHandle: () => (/* binding */ renderHandle)
/* harmony export */ });
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons */ "./lib/icons.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/EditOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/QuestionCircleOutlined.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
// renderUtils.tsx





const renderHandle = ({ type, Handle, Position, internals }) => {
    const { nodeInternals, edges, nodeId } = internals;
    const LimitedInputHandle = (props) => {
        const node = nodeInternals.get(nodeId);
        const connectedEdges = edges.filter(e => e.target === nodeId && e.targetHandle === props.id);
        let connectable = props.isConnectable;
        if (typeof connectable === 'function') {
            connectable = connectable({ node, connectedEdges });
        }
        else if (typeof connectable === 'number') {
            connectable = connectedEdges.length < connectable;
        }
        return react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Handle, { ...props, isConnectable: !!connectable });
    };
    switch (type) {
        case "ibis_df_input":
        case "pandas_df_input":
        case "documents_input":
            return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Handle, { className: "handle-right", type: "source", position: Position.Right, id: "out" }));
        case "ibis_df_output":
        case "pandas_df_output":
        case "documents_output":
            return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(LimitedInputHandle, { type: "target", position: Position.Left, isConnectable: 1, className: "handle-left", id: "in" }));
        case "ibis_df_processor":
        case "pandas_df_processor":
        case 'pandas_df_to_documents_processor':
        case 'documents_processor':
            return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null,
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(LimitedInputHandle, { type: "target", position: Position.Left, isConnectable: 1, className: "handle-left", id: "in" }),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Handle, { className: "handle-right", type: "source", position: Position.Right, id: "out" })));
        case 'ibis_df_multi_processor':
        case 'pandas_df_multi_processor':
            return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null,
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(LimitedInputHandle, { type: "target", position: Position.Left, isConnectable: true, className: "handle-left", id: "in" }),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Handle, { className: "handle-right", type: "source", position: Position.Right, id: "out" })));
        case "ibis_df_double_processor":
        case "pandas_df_double_processor":
            return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null,
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(LimitedInputHandle, { type: "target", position: Position.Left, isConnectable: 1, className: "handle-left", id: "in1" }),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(LimitedInputHandle, { type: "target", position: Position.Left, isConnectable: 1, className: "second-handle-left", id: "in2" }),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Handle, { className: "handle-right", type: "source", position: Position.Right, id: "out" })));
        default:
            return null;
    }
};
const MemoizedComponentUI = react__WEBPACK_IMPORTED_MODULE_1___default().memo(({ id, data, context, manager, commands, name, ConfigForm, configFormProps, Icon, showContent, handle, deleteNode, setViewport, handleChange, isSelected, variant = 'hybrid', // <--- NEW prop with default
 }) => {
    // Track form values and updates
    const [formState, setFormState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(data);
    // Update formState when data changes
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        setFormState(data);
    }, [data]);
    const colorPrimary = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        return '#5F9B97'; // Default teal - execution status only affects top border
    }, []);
    const executionStatusClass = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        if (data.execution) {
            switch (data.execution.status) {
                case 'running':
                    return 'component--running';
                case 'success':
                    return 'component--success';
                case 'failed':
                    return 'component--failed';
                default:
                    return '';
            }
        }
        return '';
    }, [data.execution]);
    const modifier = '--default';
    const isIbis = false;
    const handleDoubleClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
        setViewport({ zoom: 1.1, duration: 500 });
    }, [setViewport]);
    const stopPropagation = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((event) => {
        event.stopPropagation();
    }, []);
    const disableDrag = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((event) => {
        event.preventDefault();
    }, []);
    const [titleName, setTitleName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((data === null || data === void 0 ? void 0 : data.customTitle) || name);
    const onTitleChange = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((newTitle) => {
        setTitleName(newTitle);
        handleChange(newTitle, 'customTitle');
    }, [handleChange]);
    // Modified ConfigForm props to include formState and update handler
    const enhancedConfigFormProps = {
        ...configFormProps,
        data: formState,
        onValueChange: (newValue, fieldId) => {
            setFormState(prev => {
                const newState = {
                    ...prev,
                    [fieldId]: newValue
                };
                handleChange(newValue, fieldId);
                return newState;
            });
        }
    };
    const theme = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
        token: {
            colorPrimary: colorPrimary,
        },
    }), [colorPrimary]);
    const componentClassName = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        const baseClass = variant === 'card'
            ? `component-card component${modifier} ${isIbis ? "ibis" : ""}`
            : `component component${modifier} ${isIbis ? "ibis" : ""}`;
        return executionStatusClass
            ? `${baseClass} ${executionStatusClass}`.trim()
            : baseClass;
    }, [modifier, isIbis, variant, executionStatusClass]);
    const { Text } = antd__WEBPACK_IMPORTED_MODULE_4__.Typography;
    /* --------------------------------------------------------------------------------------------------
     * UI RENDERING
     * ------------------------------------------------------------------------------------------------*/
    // SIMPLE CARD VARIANT – emphasises icon + title (no in-place form)
    if (variant === 'card') {
        return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.ConfigProvider, { theme: theme },
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: componentClassName, onDoubleClick: handleDoubleClick },
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "component-card__inner", onDoubleClick: stopPropagation, onDragStart: disableDrag },
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Icon.react, { height: "36px", width: "36px", color: colorPrimary, marginRight: 8 }),
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Text, { editable: isSelected ? {
                            onChange: onTitleChange,
                            tooltip: false,
                            icon: react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["default"], { style: { color: '#5F9B97' } })
                        } : undefined }, titleName)),
                handle)));
    }
    // DEFAULT HYBRID VARIANT (existing behaviour)
    return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.ConfigProvider, { theme: theme },
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: componentClassName, onDoubleClick: handleDoubleClick },
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "component__header" },
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Text, { onDoubleClick: stopPropagation, onDragStart: disableDrag, editable: isSelected
                        ? {
                            onChange: onTitleChange,
                            tooltip: false,
                            icon: react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__["default"], { style: { color: '#5F9B97' } })
                        }
                        : undefined, className: "ant-select-sm" }, titleName),
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(antd__WEBPACK_IMPORTED_MODULE_4__.Popconfirm, { title: "Sure to delete?", placement: "right", onConfirm: deleteNode, icon: react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__["default"], { style: { color: 'red' } }) },
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "deletebutton" },
                        react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_icons__WEBPACK_IMPORTED_MODULE_0__.xIcon.react, { className: "group-hover:text-primary" })))),
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "component__body" },
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { style: { display: showContent ? 'block' : 'none' } },
                        react__WEBPACK_IMPORTED_MODULE_1___default().createElement(ConfigForm, { ...enhancedConfigFormProps })),
                    !showContent && (react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "placeholder" },
                        react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Icon.react, { height: "42px", width: "42px", color: colorPrimary, verticalAlign: "middle" }))))),
            handle)));
}, (prevProps, nextProps) => {
    return (prevProps.id === nextProps.id &&
        prevProps.showContent === nextProps.showContent &&
        prevProps.isSelected === nextProps.isSelected &&
        JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
        prevProps.name === nextProps.name &&
        prevProps.configFormProps.modalOpen === nextProps.configFormProps.modalOpen &&
        prevProps.variant === nextProps.variant &&
        prevProps.handleVersion === nextProps.handleVersion);
});
// Export the function that creates the memoized component
const renderComponentUI = (props) => {
    return react__WEBPACK_IMPORTED_MODULE_1___default().createElement(MemoizedComponentUI, { ...props });
};
const createZoomSelector = () => {
    return (s) => s.transform[2] >= 0.75;
};


/***/ },

/***/ "./lib/variablesUtils.js"
/*!*******************************!*\
  !*** ./lib/variablesUtils.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BracesIcon: () => (/* binding */ BracesIcon),
/* harmony export */   BracesSvg: () => (/* binding */ BracesSvg),
/* harmony export */   useVariableAutoComplete: () => (/* binding */ useVariableAutoComplete)
/* harmony export */ });
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/components/Icon.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PipelineService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PipelineService */ "./lib/PipelineService.js");



const BracesSvg = () => (react__WEBPACK_IMPORTED_MODULE_1___default().createElement("svg", { width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "currentColor" },
    react__WEBPACK_IMPORTED_MODULE_1___default().createElement("path", { d: "M4 18V14.3C4 13.4716 3.32843 12.8 2.5 12.8H2V11.2H2.5C3.32843 11.2 4 10.5284 4 9.7V6C4 4.34315 5.34315 3 7 3H8V5H7C6.44772 5 6 5.44772 6 6V10.1C6 10.9858 5.42408 11.7372 4.62623 12C5.42408 12.2628 6 13.0142 6 13.9V18C6 18.5523 6.44772 19 7 19H8V21H7C5.34315 21 4 19.6569 4 18ZM20 14.3V18C20 19.6569 18.6569 21 17 21H16V19H17C17.5523 19 18 18.5523 18 18V13.9C18 13.0142 18.5759 12.2628 19.3738 12C18.5759 11.7372 18 10.9858 18 10.1V6C18 5.44772 17.5523 5 17 5H16V3H17C18.6569 3 20 4.34315 20 6V9.7C20 10.5284 20.6716 11.2 21.5 11.2H22V12.8H21.5C20.6716 12.8 20 13.4716 20 14.3Z" })));
const BracesIcon = (props) => (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__["default"], { component: BracesSvg, ...props }));
const useVariableAutoComplete = ({ field, value, handleChange, context, advanced }) => {
    const [inputValue, setInputValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(value);
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [openValue, setOpenValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [optionsVariables, setOptionsVariables] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [isHidden, setIsHidden] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        if (inputValue) {
            setIsHidden(true);
        }
        else {
            setIsHidden(false);
        }
    }, [inputValue]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
        setInputValue(value); // Update inputValue when value prop changes
    }, [value]);
    const handleInputChange = (value) => {
        setInputValue(value);
        handleChange(value, field.id);
    };
    const handleSelect = (value, option) => {
        const newValue = `{os.getenv('${value}')}`;
        handleInputChange(newValue);
    };
    const filterOptions = (inputValue, option) => {
        if (!option || option.value === undefined) {
            return false;
        }
    };
    const renderTitle = (title) => react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null, title);
    const renderItem = (title) => ({
        value: title,
        label: (react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { style: { display: 'flex', justifyContent: 'space-between' } }, title)),
    });
    const suffix = (inputValue ? react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null) : (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(BracesIcon, { style: {
            color: 'grey',
            transition: 'color 0.3s'
        }, onMouseEnter: (e) => (e.currentTarget.style.color = '#43786E'), onMouseLeave: (e) => (e.currentTarget.style.color = 'grey'), onClick: () => {
            if (!openValue) {
                setOptionsVariables([
                    {
                        label: renderTitle('Environment Variables'),
                        options: _PipelineService__WEBPACK_IMPORTED_MODULE_2__.PipelineService.getEnvironmentVariables(context.model.toString()).map(variableName => renderItem(variableName)),
                    }
                ]);
            }
            setOpenValue((prev) => !prev);
        } })));
    return {
        inputValue,
        inputRef,
        openValue,
        setOpenValue,
        optionsVariables,
        handleInputChange,
        handleSelect,
        filterOptions,
        suffix,
    };
};


/***/ },

/***/ "./style/icons/alert-triangle-fill-16.svg"
/*!************************************************!*\
  !*** ./style/icons/alert-triangle-fill-16.svg ***!
  \************************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M8 1a2.143 2.143 0 00-1.827 1.024l-5.88 9.768a2.125 2.125 0 00.762 2.915c.322.188.687.289 1.06.293h11.77a2.143 2.143 0 001.834-1.074 2.126 2.126 0 00-.006-2.124L9.829 2.028A2.149 2.149 0 008 1zM7 11a1 1 0 011-1h.007a1 1 0 110 2H8a1 1 0 01-1-1zm1.75-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z\" clip-rule=\"evenodd\"/></svg>";

/***/ },

/***/ "./style/icons/braces.svg"
/*!********************************!*\
  !*** ./style/icons/braces.svg ***!
  \********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M4 18V14.3C4 13.4716 3.32843 12.8 2.5 12.8H2V11.2H2.5C3.32843 11.2 4 10.5284 4 9.7V6C4 4.34315 5.34315 3 7 3H8V5H7C6.44772 5 6 5.44772 6 6V10.1C6 10.9858 5.42408 11.7372 4.62623 12C5.42408 12.2628 6 13.0142 6 13.9V18C6 18.5523 6.44772 19 7 19H8V21H7C5.34315 21 4 19.6569 4 18ZM20 14.3V18C20 19.6569 18.6569 21 17 21H16V19H17C17.5523 19 18 18.5523 18 18V13.9C18 13.0142 18.5759 12.2628 19.3738 12C18.5759 11.7372 18 10.9858 18 10.1V6C18 5.44772 17.5523 5 17 5H16V3H17C18.6569 3 20 4.34315 20 6V9.7C20 10.5284 20.6716 11.2 21.5 11.2H22V12.8H21.5C20.6716 12.8 20 13.4716 20 14.3Z\"></path></svg>";

/***/ },

/***/ "./style/icons/claude.svg"
/*!********************************!*\
  !*** ./style/icons/claude.svg ***!
  \********************************/
(module) {

module.exports = "<svg fill=\"currentColor\" fill-rule=\"evenodd\" height=\"1em\" style=\"flex:none;line-height:1\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><title>Claude</title><path d=\"M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z\"></path></svg>";

/***/ },

/***/ "./style/icons/crosshair-16.svg"
/*!**************************************!*\
  !*** ./style/icons/crosshair-16.svg ***!
  \**************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M0 8a8 8 0 1116 0A8 8 0 010 8zm8.75 6.457V12.75a.75.75 0 00-1.5 0v1.707A6.503 6.503 0 011.543 8.75H3.25a.75.75 0 000-1.5H1.543A6.503 6.503 0 017.25 1.543V3.25a.75.75 0 001.5 0V1.543a6.503 6.503 0 015.707 5.707H12.75a.75.75 0 000 1.5h1.707a6.503 6.503 0 01-5.707 5.707z\" clip-rule=\"evenodd\"/></svg>";

/***/ },

/***/ "./style/icons/minus-16.svg"
/*!**********************************!*\
  !*** ./style/icons/minus-16.svg ***!
  \**********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M3.5 7.75A.75.75 0 014.25 7h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75z\" clip-rule=\"evenodd\"/></svg>";

/***/ },

/***/ "./style/icons/mistral.svg"
/*!*********************************!*\
  !*** ./style/icons/mistral.svg ***!
  \*********************************/
(module) {

module.exports = "<svg fill=\"currentColor\" fill-rule=\"evenodd\" height=\"1em\" style=\"flex:none;line-height:1\" viewBox=\"0 0 24 24\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><title>Mistral</title><path clip-rule=\"evenodd\" d=\"M3.428 3.4h3.429v3.428h3.429v3.429h-.002 3.431V6.828h3.427V3.4h3.43v13.714H24v3.429H13.714v-3.428h-3.428v-3.429h-3.43v3.428h3.43v3.429H0v-3.429h3.428V3.4zm10.286 13.715h3.428v-3.429h-3.427v3.429z\"></path></svg>";

/***/ },

/***/ "./style/icons/openai.svg"
/*!********************************!*\
  !*** ./style/icons/openai.svg ***!
  \********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\"><path d=\"M44.559 19.646a11.957 11.957 0 0 0-1.028-9.822 12.094 12.094 0 0 0-13.026-5.802A11.962 11.962 0 0 0 21.485 0 12.097 12.097 0 0 0 9.95 8.373a11.964 11.964 0 0 0-7.997 5.8A12.097 12.097 0 0 0 3.44 28.356a11.957 11.957 0 0 0 1.028 9.822 12.094 12.094 0 0 0 13.026 5.802 11.953 11.953 0 0 0 9.02 4.02 12.096 12.096 0 0 0 11.54-8.379 11.964 11.964 0 0 0 7.997-5.8 12.099 12.099 0 0 0-1.491-14.177zM26.517 44.863a8.966 8.966 0 0 1-5.759-2.082 6.85 6.85 0 0 0 .284-.16L30.6 37.1c.49-.278.79-.799.786-1.361V22.265l4.04 2.332a.141.141 0 0 1 .078.111v11.16a9.006 9.006 0 0 1-8.987 8.995zM7.191 36.608a8.957 8.957 0 0 1-1.073-6.027c.071.042.195.119.284.17l9.558 5.52a1.556 1.556 0 0 0 1.57 0l11.67-6.738v4.665a.15.15 0 0 1-.057.124l-9.662 5.579a9.006 9.006 0 0 1-12.288-3.293zM4.675 15.744a8.966 8.966 0 0 1 4.682-3.943c0 .082-.005.228-.005.33v11.042a1.555 1.555 0 0 0 .785 1.359l11.669 6.736-4.04 2.333a.143.143 0 0 1-.136.012L7.967 28.03a9.006 9.006 0 0 1-3.293-12.284zm33.19 7.724L26.196 16.73l4.04-2.331a.143.143 0 0 1 .136-.012l9.664 5.579c4.302 2.485 5.776 7.989 3.29 12.29a8.991 8.991 0 0 1-4.68 3.943V24.827a1.553 1.553 0 0 0-.78-1.36zm4.02-6.051c-.07-.044-.195-.119-.283-.17l-9.558-5.52a1.556 1.556 0 0 0-1.57 0l-11.67 6.738V13.8a.15.15 0 0 1 .057-.124l9.662-5.574a8.995 8.995 0 0 1 13.36 9.315zm-25.277 8.315-4.04-2.333a.141.141 0 0 1-.079-.11v-11.16a8.997 8.997 0 0 1 14.753-6.91c-.073.04-.2.11-.283.161L17.4 10.9a1.552 1.552 0 0 0-.786 1.36l-.006 13.469zM18.803 21l5.198-3.002 5.197 3V27l-5.197 3-5.198-3z\"/></svg>";

/***/ },

/***/ "./style/icons/play-16.svg"
/*!*********************************!*\
  !*** ./style/icons/play-16.svg ***!
  \*********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M3 3.814C3 2.436 4.52 1.6 5.684 2.334l6.628 4.186a1.75 1.75 0 010 2.96l-6.628 4.185C4.52 14.401 3 13.564 3 12.185v-8.37zm1.883-.211a.25.25 0 00-.383.211v8.372a.25.25 0 00.383.211l6.628-4.186a.25.25 0 000-.422L4.884 3.603z\" clip-rule=\"evenodd\"/></svg>";

/***/ },

/***/ "./style/icons/play-circle-16.svg"
/*!****************************************!*\
  !*** ./style/icons/play-circle-16.svg ***!
  \****************************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><g fill=\"currentColor\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"><path d=\"M7.421 4.356A1.25 1.25 0 005.5 5.411v5.178a1.25 1.25 0 001.921 1.055l4.069-2.59a1.25 1.25 0 000-2.109L7.42 4.356zM10.353 8L7 10.134V5.866L10.353 8z\"/><path d=\"M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z\"/></g></svg>";

/***/ },

/***/ "./style/icons/plus-16.svg"
/*!*********************************!*\
  !*** ./style/icons/plus-16.svg ***!
  \*********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" d=\"M9 3.5a.75.75 0 00-1.5 0V7H4a.75.75 0 000 1.5h3.5V12A.75.75 0 009 12V8.5h3.5a.75.75 0 000-1.5H9V3.5z\"/></svg>";

/***/ },

/***/ "./style/icons/search-16.svg"
/*!***********************************!*\
  !*** ./style/icons/search-16.svg ***!
  \***********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M7.25 2a5.25 5.25 0 103.144 9.455l2.326 2.325a.75.75 0 101.06-1.06l-2.325-2.326A5.25 5.25 0 007.25 2zM3.5 7.25a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z\" clip-rule=\"evenodd\"/></svg>";

/***/ },

/***/ "./style/icons/settings-16.svg"
/*!*************************************!*\
  !*** ./style/icons/settings-16.svg ***!
  \*************************************/
(module) {

module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<svg\r\n   width=\"16\"\r\n   height=\"16\"\r\n   fill=\"none\"\r\n   viewBox=\"0 0 16 16\"\r\n   version=\"1.1\"\r\n   id=\"svg2\"\r\n   sodipodi:docname=\"settings-16.svg\"\r\n   inkscape:version=\"1.3 (0e150ed, 2023-07-21)\"\r\n   xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\r\n   xmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\"\r\n   xmlns=\"http://www.w3.org/2000/svg\"\r\n   xmlns:svg=\"http://www.w3.org/2000/svg\">\r\n  <defs\r\n     id=\"defs2\" />\r\n  <sodipodi:namedview\r\n     id=\"namedview2\"\r\n     pagecolor=\"#505050\"\r\n     bordercolor=\"#eeeeee\"\r\n     borderopacity=\"1\"\r\n     inkscape:showpageshadow=\"0\"\r\n     inkscape:pageopacity=\"0\"\r\n     inkscape:pagecheckerboard=\"0\"\r\n     inkscape:deskcolor=\"#505050\"\r\n     inkscape:zoom=\"34.875\"\r\n     inkscape:cx=\"8\"\r\n     inkscape:cy=\"7.9856631\"\r\n     inkscape:window-width=\"1392\"\r\n     inkscape:window-height=\"922\"\r\n     inkscape:window-x=\"0\"\r\n     inkscape:window-y=\"75\"\r\n     inkscape:window-maximized=\"0\"\r\n     inkscape:current-layer=\"svg2\" />\r\n  <g\r\n     fill=\"currentColor\"\r\n     fill-rule=\"evenodd\"\r\n     clip-rule=\"evenodd\"\r\n     id=\"g2\">\r\n    <path\r\n       d=\"M8 5a3 3 0 100 6 3 3 0 000-6zM6.5 8a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z\"\r\n       id=\"path1\" />\r\n    <path\r\n       d=\"M7.5 0a1.75 1.75 0 00-1.75 1.75v.15c-.16.06-.318.125-.472.196l-.106-.106a1.75 1.75 0 00-2.475 0l-.707.707a1.75 1.75 0 000 2.475l.106.106a6.46 6.46 0 00-.196.472h-.15A1.75 1.75 0 000 7.5v1c0 .966.784 1.75 1.75 1.75h.15c.06.16.125.318.196.472l-.106.107a1.75 1.75 0 000 2.474l.707.708a1.75 1.75 0 002.475 0l.106-.107c.154.071.312.137.472.196v.15c0 .966.784 1.75 1.75 1.75h1a1.75 1.75 0 001.75-1.75v-.15c.16-.06.318-.125.472-.196l.106.107a1.75 1.75 0 002.475 0l.707-.707a1.75 1.75 0 000-2.475l-.106-.107c.071-.154.137-.311.196-.472h.15A1.75 1.75 0 0016 8.5v-1a1.75 1.75 0 00-1.75-1.75h-.15a6.455 6.455 0 00-.196-.472l.106-.106a1.75 1.75 0 000-2.475l-.707-.707a1.75 1.75 0 00-2.475 0l-.106.106a6.46 6.46 0 00-.472-.196v-.15A1.75 1.75 0 008.5 0h-1zm-.25 1.75a.25.25 0 01.25-.25h1a.25.25 0 01.25.25v.698c0 .339.227.636.555.724.42.113.817.28 1.186.492a.75.75 0 00.905-.12l.493-.494a.25.25 0 01.354 0l.707.708a.25.25 0 010 .353l-.494.494a.75.75 0 00-.12.904c.213.369.38.767.492 1.186a.75.75 0 00.724.555h.698a.25.25 0 01.25.25v1a.25.25 0 01-.25.25h-.698a.75.75 0 00-.724.555c-.113.42-.28.817-.492 1.186a.75.75 0 00.12.905l.494.493a.25.25 0 010 .354l-.707.707a.25.25 0 01-.354 0l-.494-.494a.75.75 0 00-.904-.12 4.966 4.966 0 01-1.186.492.75.75 0 00-.555.724v.698a.25.25 0 01-.25.25h-1a.25.25 0 01-.25-.25v-.698a.75.75 0 00-.555-.724 4.966 4.966 0 01-1.186-.491.75.75 0 00-.904.12l-.494.493a.25.25 0 01-.354 0l-.707-.707a.25.25 0 010-.354l.494-.493a.75.75 0 00.12-.905 4.966 4.966 0 01-.492-1.186.75.75 0 00-.724-.555H1.75a.25.25 0 01-.25-.25v-1a.25.25 0 01.25-.25h.698a.75.75 0 00.724-.555c.113-.42.28-.817.491-1.186a.75.75 0 00-.12-.904L3.05 4.11a.25.25 0 010-.353l.707-.708a.25.25 0 01.354 0l.493.494c.24.24.611.289.905.12a4.965 4.965 0 011.186-.492.75.75 0 00.555-.724V1.75z\"\r\n       id=\"path2\" />\r\n  </g>\r\n</svg>\r\n";

/***/ },

/***/ "./style/icons/trash-16.svg"
/*!**********************************!*\
  !*** ./style/icons/trash-16.svg ***!
  \**********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><g fill=\"currentColor\"><path d=\"M6.25 6a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5A.75.75 0 016.25 6zM10.5 6.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5z\"/><path fill-rule=\"evenodd\" d=\"M4 3v-.75A2.25 2.25 0 016.25 0h3.5A2.25 2.25 0 0112 2.25V3h2.25a.75.75 0 010 1.5H14v9.25A2.25 2.25 0 0111.75 16h-7.5A2.25 2.25 0 012 13.75V4.5h-.25a.75.75 0 010-1.5H4zm1.5-.75a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75V3h-5v-.75zm-2 2.25v9.25c0 .414.336.75.75.75h7.5a.75.75 0 00.75-.75V4.5h-9z\" clip-rule=\"evenodd\"/></g></svg>";

/***/ },

/***/ "./style/icons/wand-16.svg"
/*!*********************************!*\
  !*** ./style/icons/wand-16.svg ***!
  \*********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><g fill=\"currentColor\"><path d=\"M4.083.183a.5.5 0 00-.65.65l.393.981a.5.5 0 010 .371l-.393.982a.5.5 0 00.65.65l.981-.393a.5.5 0 01.372 0l.98.392a.5.5 0 00.65-.65l-.392-.98a.5.5 0 010-.372l.393-.981a.5.5 0 00-.65-.65l-.981.392a.5.5 0 01-.372 0l-.98-.392z\"/><path fill-rule=\"evenodd\" d=\"M11.414 4.104a2 2 0 00-2.828 0L.808 11.882a2 2 0 002.828 2.828l7.778-7.778a2 2 0 000-2.828zm-1.768 1.06a.5.5 0 11.707.707l-.883.884-.707-.707.883-.884zM7.702 7.11l.707.707-5.834 5.834a.5.5 0 11-.707-.707l5.834-5.834z\" clip-rule=\"evenodd\"/><path d=\"M10.572 11.21a.5.5 0 010-.92l1.219-.522a.5.5 0 00.263-.262l.522-1.22a.5.5 0 01.92 0l.521 1.22a.5.5 0 00.263.262l1.219.522a.5.5 0 010 .92l-1.219.522a.5.5 0 00-.263.263l-.522 1.218a.5.5 0 01-.919 0l-.522-1.218a.5.5 0 00-.263-.263l-1.219-.522zM12.833.183a.5.5 0 00-.65.65l.293.731a.5.5 0 010 .371l-.293.732a.5.5 0 00.65.65l.731-.293a.5.5 0 01.372 0l.73.292a.5.5 0 00.65-.65l-.292-.73a.5.5 0 010-.372l.293-.731a.5.5 0 00-.65-.65l-.731.292a.5.5 0 01-.372 0l-.73-.292z\"/></g></svg>";

/***/ },

/***/ "./style/icons/x-16.svg"
/*!******************************!*\
  !*** ./style/icons/x-16.svg ***!
  \******************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"none\" viewBox=\"0 0 16 16\"><path fill=\"currentColor\" d=\"M12.78 4.28a.75.75 0 00-1.06-1.06L8 6.94 4.28 3.22a.75.75 0 00-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 101.06 1.06L8 9.06l3.72 3.72a.75.75 0 101.06-1.06L9.06 8l3.72-3.72z\"/></svg>";

/***/ }

}]);
//# sourceMappingURL=lib_index_js.202fe948a458bb891151.js.map