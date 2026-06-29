"use strict";
(self["webpackChunk_amphi_components_panel"] = self["webpackChunk_amphi_components_panel"] || []).push([["lib_index_js"],{

/***/ "../../node_modules/css-loader/dist/cjs.js!./style/index.css"
/*!*******************************************************************!*\
  !*** ../../node_modules/css-loader/dist/cjs.js!./style/index.css ***!
  \*******************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./base.css */ "../../node_modules/css-loader/dist/cjs.js!./style/base.css");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_base_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `
`, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ "./lib/icons.js"
/*!**********************!*\
  !*** ./lib/icons.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   puzzleIcon: () => (/* binding */ puzzleIcon)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_icons_puzzle_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/icons/puzzle.svg */ "./style/icons/puzzle.svg");


const puzzleIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'amphi:puzzle-icon',
    svgstr: _style_icons_puzzle_svg__WEBPACK_IMPORTED_MODULE_1__
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
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/filebrowser */ "webpack/sharing/consume/default/@jupyterlab/filebrowser");
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @amphi/pipeline-components-manager */ "webpack/sharing/consume/default/@amphi/pipeline-components-manager");
/* harmony import */ var _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons */ "./lib/icons.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/CloseOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ant-design/icons */ "../../node_modules/@ant-design/icons/es/icons/ReloadOutlined.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! antd */ "webpack/sharing/consume/default/antd/antd");
/* harmony import */ var _style_index_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../style/index.css */ "./style/index.css");









const AMPHI_DIR_PATH = ".amphi";
const AMPHI_COMPONENTS_DIR = ".amphi/components";
/**
 * Normalize path for Jupyter's contents API.
 * Jupyter's contents API can handle hidden directories (starting with '.'),
 * but we need to ensure paths are clean and relative.
 */
function normalizeForJupyter(path) {
    // Only strip './' prefix, but keep single '.' for hidden directories like '.amphi'
    if (path.startsWith("./")) {
        return path.slice(2);
    }
    return path;
}
function formatCategoryLabel(category) {
    return category
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase());
}
function isRemoteSource(source) {
    return /^https?:\/\//i.test(source.trim());
}
function toStoredSource(input) {
    const value = input.trim();
    if (isRemoteSource(value)) {
        return value;
    }
    if (value.startsWith("/")) {
        throw new Error("Please provide a relative path (for example: ./.amphi/components/my_component.tsx).");
    }
    return value.startsWith("./") ? value : `./${value.replace(/^\.\//, "")}`;
}
function toJupyterPath(source) {
    return source.replace(/^\.\//, "").replace(/^\/+/, "");
}
function normalizeWorkspaceRootPath(path) {
    const value = (path || "").trim();
    if (!value || value === "/" || value === ".") {
        return "";
    }
    return value.replace(/^\/+/, "").replace(/\/+$/, "");
}
function joinWorkspacePath(workspaceRootPath, relativePath) {
    const rel = relativePath.replace(/^\/+/, "");
    const root = normalizeWorkspaceRootPath(workspaceRootPath);
    if (!root) {
        return rel;
    }
    return _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.join(root, rel);
}
function toWorkspacePathFromSource(source, workspaceRootPath) {
    let jupyterPath = toJupyterPath(source);
    // If the path starts with 'components/', it's stored relative to .amphi/ directory
    // Convert it to be relative to workspace root: .amphi/components/...
    if (jupyterPath.startsWith("components/")) {
        jupyterPath = `.amphi/${jupyterPath}`;
    }
    return joinWorkspacePath(workspaceRootPath, jupyterPath);
}
function isManagedLocalSource(source, workspaceRootPath) {
    if (isRemoteSource(source)) {
        return false;
    }
    const localPath = toWorkspacePathFromSource(source, workspaceRootPath);
    const componentsRoot = joinWorkspacePath(workspaceRootPath, AMPHI_COMPONENTS_DIR);
    return localPath.startsWith(`${componentsRoot}/`) || localPath.startsWith(`${componentsRoot}\\`);
}
function extractSection(content, header) {
    const lines = content.split("\n");
    const headerRegex = new RegExp(`^\\s*\\[${header}\\]\\s*$`);
    let start = -1;
    for (let i = 0; i < lines.length; i++) {
        if (headerRegex.test(lines[i])) {
            start = i;
            break;
        }
    }
    if (start < 0) {
        return { before: content, section: "", after: "" };
    }
    let end = lines.length;
    for (let i = start + 1; i < lines.length; i++) {
        if (/^\s*\[[^\]]+\]\s*$/.test(lines[i])) {
            end = i;
            break;
        }
    }
    return {
        before: lines.slice(0, start).join("\n"),
        section: lines.slice(start, end).join("\n"),
        after: lines.slice(end).join("\n"),
    };
}
function readArrayBlock(section, key) {
    const keyRegex = new RegExp(`^\\s*${key}\\s*=\\s*\\[\\s*$`, "m");
    const match = keyRegex.exec(section);
    if (!match || match.index === undefined) {
        return [];
    }
    const start = section.indexOf("[", match.index);
    if (start < 0) {
        return [];
    }
    let inString = false;
    let escaped = false;
    let depth = 0;
    let end = -1;
    for (let i = start; i < section.length; i++) {
        const ch = section[i];
        if (inString) {
            if (escaped) {
                escaped = false;
            }
            else if (ch === "\\") {
                escaped = true;
            }
            else if (ch === '"') {
                inString = false;
            }
            continue;
        }
        if (ch === '"') {
            inString = true;
            continue;
        }
        if (ch === "[") {
            depth += 1;
            continue;
        }
        if (ch === "]") {
            depth -= 1;
            if (depth === 0) {
                end = i;
                break;
            }
        }
    }
    if (end < 0) {
        return [];
    }
    const body = section.slice(start + 1, end);
    const values = [];
    const stringRegex = /"((?:[^"\\]|\\.)*)"/g;
    let itemMatch;
    while ((itemMatch = stringRegex.exec(body)) !== null) {
        const raw = itemMatch[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\").trim();
        if (raw) {
            values.push(raw);
        }
    }
    return values;
}
function renderArrayBlock(key, values) {
    const escaped = values.map((value) => value.replace(/\\/g, "\\\\").replace(/"/g, '\\"'));
    const renderedItems = escaped.map((value) => `  "${value}",`).join("\n");
    return `${key} = [\n${renderedItems}${renderedItems ? "\n" : ""}]`;
}
function parseComponentsConfig(rawToml) {
    const { section } = extractSection(rawToml, "components");
    if (!section) {
        return { sources: [] };
    }
    return {
        sources: readArrayBlock(section, "sources"),
    };
}
function applyComponentsConfig(rawToml, config) {
    const normalizedSources = Array.from(new Set(config.sources.map((source) => source.trim()).filter(Boolean)));
    const nextSection = ["[components]", renderArrayBlock("sources", normalizedSources)].join("\n\n");
    const { before, section, after } = extractSection(rawToml, "components");
    if (!section) {
        const prefix = rawToml.trim();
        return `${prefix}${prefix ? "\n\n" : ""}${nextSection}\n`;
    }
    const beforeTrimmed = before.replace(/\s+$/, "");
    const afterTrimmed = after.replace(/^\s+/, "");
    const parts = [beforeTrimmed, nextSection, afterTrimmed].filter(Boolean);
    return `${parts.join("\n\n")}\n`;
}
const ComponentsPanel = ({ app, componentService, getCurrentBrowserPath, workspaceRootPath }) => {
    const [componentCatalog, setComponentCatalog] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(() => componentService.getComponents());
    const [registeredIds, setRegisteredIds] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(() => new Set(componentService.getComponents().map((component) => component._id)));
    const [componentSourceById, setComponentSourceById] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)({});
    const [isModalOpen, setIsModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false);
    const [sourceMode, setSourceMode] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)("code");
    const [codeValue, setCodeValue] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)("");
    const [linkValue, setLinkValue] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)("");
    const [isSubmitting, setIsSubmitting] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false);
    const stopKeyPropagation = (event) => {
        event.stopPropagation();
    };
    const stopClipboardPropagation = (event) => {
        event.stopPropagation();
    };
    const ensureDirectory = async (_path) => {
        // Backend (amphi-scheduler) creates .amphi and .amphi/components at startup
        // We trust it exists and don't verify, since Jupyter's contents API
        // may not expose hidden directories (starting with '.') even if they exist
        // on the filesystem. We'll just try to write files and handle errors there.
        return;
    };
    const readConfigToml = async () => {
        try {
            // Use backend API to read config.toml from .amphi directory
            const response = await fetch(`${app.serviceManager.serverSettings.baseUrl}pipeline-scheduler/components-config`, {
                method: "GET",
                headers: {
                    Authorization: `token ${app.serviceManager.serverSettings.token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                return data.content || "";
            }
            return "";
        }
        catch (_a) {
            return "";
        }
    };
    const writeConfigToml = async (config) => {
        await ensureDirectory(joinWorkspacePath(workspaceRootPath, AMPHI_DIR_PATH));
        const current = await readConfigToml();
        const next = applyComponentsConfig(current, config);
        // Use backend API to write config.toml to .amphi directory
        const response = await fetch(`${app.serviceManager.serverSettings.baseUrl}pipeline-scheduler/components-config`, {
            method: "POST",
            headers: {
                Authorization: `token ${app.serviceManager.serverSettings.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: next }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Failed to write config");
        }
    };
    const readConfig = async () => {
        const raw = await readConfigToml();
        return parseComponentsConfig(raw);
    };
    const syncFromService = (showNotification = false) => {
        const liveComponents = componentService.getComponents();
        const nextCatalogById = new Map(componentCatalog.map((component) => [component._id, component]));
        for (const component of liveComponents) {
            nextCatalogById.set(component._id, component);
        }
        setComponentCatalog(Array.from(nextCatalogById.values()));
        setRegisteredIds(new Set(liveComponents.map((component) => component._id)));
        if (showNotification) {
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.success("Components list refreshed.", { autoClose: 2500 });
        }
    };
    const registerLocalSource = async (storedSource) => {
        const path = normalizeForJupyter(toWorkspacePathFromSource(storedSource, workspaceRootPath));
        await app.commands.execute("@amphi/pipeline-components-manager:register-tsx", {
            path: path,
        });
    };
    const registerRemoteSource = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Could not load URL (${response.status}).`);
        }
        const source = await response.text();
        const currentPath = getCurrentBrowserPath();
        const fileName = `amphi_component_${Date.now()}.tsx`;
        const tempPath = currentPath ? _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.join(currentPath, fileName) : fileName;
        await app.serviceManager.contents.save(tempPath, {
            type: "file",
            format: "text",
            content: source,
        });
        try {
            await app.commands.execute("@amphi/pipeline-components-manager:register-tsx", {
                path: tempPath,
            });
        }
        finally {
            await app.serviceManager.contents.delete(tempPath).catch(() => undefined);
        }
    };
    const registerSource = async (storedSource) => {
        if (isRemoteSource(storedSource)) {
            await registerRemoteSource(storedSource);
        }
        else {
            await registerLocalSource(storedSource);
        }
    };
    const findComponentIdForSource = (beforeIds, source, previousSourceToId) => {
        const afterIds = new Set(componentService.getComponents().map((component) => component._id));
        const knownId = previousSourceToId.get(source);
        if (knownId && afterIds.has(knownId)) {
            return knownId;
        }
        const added = Array.from(afterIds).filter((id) => !beforeIds.has(id));
        if (added.length === 1) {
            return added[0];
        }
        return null;
    };
    const loadConfiguredComponents = async (showNotification = false) => {
        var _a;
        const config = await readConfig();
        const previousSourceToId = new Map();
        for (const [componentId, source] of Object.entries(componentSourceById)) {
            previousSourceToId.set(source, componentId);
        }
        const nextComponentSourceById = {};
        for (const storedSource of config.sources) {
            const knownComponentId = previousSourceToId.get(storedSource);
            if (knownComponentId && componentCatalog.some((component) => component._id === knownComponentId)) {
                nextComponentSourceById[knownComponentId] = storedSource;
                continue;
            }
            try {
                const beforeIds = new Set(componentService.getComponents().map((component) => component._id));
                await registerSource(storedSource);
                const componentId = findComponentIdForSource(beforeIds, storedSource, previousSourceToId);
                if (componentId) {
                    nextComponentSourceById[componentId] = storedSource;
                }
            }
            catch (error) {
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.warning(`Could not register configured component source: ${storedSource}. ${String((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error)}`, {
                    autoClose: 5000,
                });
            }
        }
        setComponentSourceById(nextComponentSourceById);
        syncFromService(showNotification);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
        void loadConfiguredComponents(false);
    }, []);
    const onCheck = (checkedKeysValue) => {
        const keys = Array.isArray(checkedKeysValue) ? checkedKeysValue : checkedKeysValue.checked;
        const nextCheckedComponentIds = new Set(keys.map((value) => String(value)).filter((value) => componentCatalog.some((component) => component._id === value)));
        const currentRegistered = new Set(componentService.getComponents().map((component) => component._id));
        const nextCatalogById = new Map(componentCatalog.map((component) => [component._id, component]));
        for (const componentId of nextCheckedComponentIds) {
            if (!currentRegistered.has(componentId)) {
                const component = nextCatalogById.get(componentId);
                if (component) {
                    componentService.addComponent(component);
                }
            }
        }
        for (const componentId of currentRegistered) {
            if (!nextCheckedComponentIds.has(componentId)) {
                componentService.removeComponent(componentId);
            }
        }
        setRegisteredIds(nextCheckedComponentIds);
    };
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSourceMode("code");
        setCodeValue("");
        setLinkValue("");
    };
    const removeConfiguredComponent = async (componentId) => {
        var _a;
        try {
            const source = componentSourceById[componentId];
            if (!source) {
                return;
            }
            const config = await readConfig();
            const nextConfig = {
                sources: config.sources.filter((item) => item !== source),
            };
            await writeConfigToml(nextConfig);
            if (isManagedLocalSource(source, workspaceRootPath)) {
                const localPath = toWorkspacePathFromSource(source, workspaceRootPath);
                // Extract filename from path
                const fileName = localPath.split("/").pop() || localPath.split("\\").pop();
                if (fileName) {
                    // Use backend API to delete component file
                    await fetch(`${app.serviceManager.serverSettings.baseUrl}pipeline-scheduler/components-file?filename=${encodeURIComponent(fileName)}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `token ${app.serviceManager.serverSettings.token}`,
                        },
                    }).catch(() => undefined);
                }
            }
            componentService.removeComponent(componentId);
            setComponentCatalog((prev) => prev.filter((component) => component._id !== componentId));
            setRegisteredIds((prev) => {
                const next = new Set(prev);
                next.delete(componentId);
                return next;
            });
            setComponentSourceById((prev) => {
                const next = { ...prev };
                delete next[componentId];
                return next;
            });
        }
        catch (error) {
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.error(String((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error), { autoClose: 5000 });
        }
    };
    const registerNewComponent = async () => {
        var _a;
        try {
            setIsSubmitting(true);
            const config = await readConfig();
            let storedSource = "";
            if (sourceMode === "code") {
                const code = codeValue.trim();
                if (!code) {
                    throw new Error("Please provide component code.");
                }
                await ensureDirectory(joinWorkspacePath(workspaceRootPath, AMPHI_DIR_PATH));
                await ensureDirectory(joinWorkspacePath(workspaceRootPath, AMPHI_COMPONENTS_DIR));
                const fileName = `amphi_component_${Date.now()}.tsx`;
                // Use backend API to save component file to .amphi/components/
                const response = await fetch(`${app.serviceManager.serverSettings.baseUrl}pipeline-scheduler/components-file`, {
                    method: "POST",
                    headers: {
                        Authorization: `token ${app.serviceManager.serverSettings.token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ filename: fileName, content: code }),
                });
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || "Failed to save component file");
                }
                // Path stored in config.toml (relative to .amphi/ where config.toml lives)
                storedSource = `./components/${fileName}`;
            }
            else {
                const raw = linkValue.trim();
                if (!raw) {
                    throw new Error("Please provide a component URL or relative path.");
                }
                if (!/\.tsx?(\?|#|$)/i.test(raw)) {
                    throw new Error("Source must reference a .ts or .tsx file.");
                }
                storedSource = toStoredSource(raw);
            }
            const nextConfig = {
                sources: Array.from(new Set([...config.sources, storedSource])),
            };
            await writeConfigToml(nextConfig);
            const beforeIds = new Set(componentService.getComponents().map((component) => component._id));
            await registerSource(storedSource);
            const componentId = findComponentIdForSource(beforeIds, storedSource, new Map());
            if (componentId) {
                setComponentSourceById((prev) => ({
                    ...prev,
                    [componentId]: storedSource,
                }));
            }
            syncFromService();
            closeModal();
        }
        catch (error) {
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.error(String((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error), { autoClose: 5000 });
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const treeData = (0,react__WEBPACK_IMPORTED_MODULE_5__.useMemo)(() => {
        const categories = new Map();
        for (const component of componentCatalog) {
            const category = component._category || "uncategorized";
            if (!categories.has(category)) {
                categories.set(category, []);
            }
            categories.get(category).push(component);
        }
        return Array.from(categories.entries()).map(([category, components]) => ({
            title: formatCategoryLabel(category),
            key: `category:${category}`,
            children: components.map((component) => {
                const source = componentSourceById[component._id];
                return {
                    title: (react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", { className: "amphi-ComponentsPanel__componentRow" },
                        react__WEBPACK_IMPORTED_MODULE_5___default().createElement("span", { className: "amphi-ComponentsPanel__componentName" }, component._name),
                        source ? (react__WEBPACK_IMPORTED_MODULE_5___default().createElement(antd__WEBPACK_IMPORTED_MODULE_9__.Button, { type: "text", size: "small", className: "amphi-ComponentsPanel__removeButton", icon: react__WEBPACK_IMPORTED_MODULE_5___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__["default"], null), onClick: (event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                void removeConfiguredComponent(component._id);
                            } })) : null)),
                    key: component._id,
                };
            }),
        }));
    }, [componentCatalog, componentSourceById]);
    return (react__WEBPACK_IMPORTED_MODULE_5___default().createElement(antd__WEBPACK_IMPORTED_MODULE_9__.ConfigProvider, { theme: {
            token: {
                colorPrimary: "#5F9B97",
            },
        } },
        react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", { className: "amphi-ComponentsPanel" },
            react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", { className: "amphi-ComponentsPanel__header" }),
            react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", { className: "amphi-ComponentsPanel__actions" },
                react__WEBPACK_IMPORTED_MODULE_5___default().createElement(antd__WEBPACK_IMPORTED_MODULE_9__.Button, { type: "primary", icon: react__WEBPACK_IMPORTED_MODULE_5___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_7__["default"], null), className: "amphi-ComponentsPanel__actionButton", onClick: openModal }, "\u6DFB\u52A0\u7EC4\u4EF6"),
                react__WEBPACK_IMPORTED_MODULE_5___default().createElement(antd__WEBPACK_IMPORTED_MODULE_9__.Button, { icon: react__WEBPACK_IMPORTED_MODULE_5___default().createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_8__["default"], null), className: "amphi-ComponentsPanel__actionButton", onClick: () => {
                        void loadConfiguredComponents(true);
                    } })),
            react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", { className: "amphi-ComponentsPanel__tree" }, componentCatalog.length === 0 ? (react__WEBPACK_IMPORTED_MODULE_5___default().createElement(antd__WEBPACK_IMPORTED_MODULE_9__.Empty, { description: "No components found" })) : (react__WEBPACK_IMPORTED_MODULE_5___default().createElement(antd__WEBPACK_IMPORTED_MODULE_9__.Tree, { checkable: true, defaultExpandAll: true, checkedKeys: Array.from(registeredIds), onCheck: onCheck, treeData: treeData }))),
            react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", { className: "amphi-ComponentsPanel__footer" }, "Browse components and enable/disable components."),
            react__WEBPACK_IMPORTED_MODULE_5___default().createElement(antd__WEBPACK_IMPORTED_MODULE_9__.Modal, { title: "Add Component", open: isModalOpen, onOk: registerNewComponent, okText: "Register", confirmLoading: isSubmitting, onCancel: closeModal, destroyOnClose: true },
                react__WEBPACK_IMPORTED_MODULE_5___default().createElement(antd__WEBPACK_IMPORTED_MODULE_9__.Radio.Group, { value: sourceMode, onChange: (event) => setSourceMode(event.target.value), style: { marginBottom: 12 } },
                    react__WEBPACK_IMPORTED_MODULE_5___default().createElement(antd__WEBPACK_IMPORTED_MODULE_9__.Radio.Button, { value: "code" }, "Code"),
                    react__WEBPACK_IMPORTED_MODULE_5___default().createElement(antd__WEBPACK_IMPORTED_MODULE_9__.Radio.Button, { value: "link" }, "URL / Relative path")),
                sourceMode === "code" ? (react__WEBPACK_IMPORTED_MODULE_5___default().createElement(antd__WEBPACK_IMPORTED_MODULE_9__.Input.TextArea, { value: codeValue, onChange: (event) => setCodeValue(event.target.value), onKeyDown: stopKeyPropagation, onCopy: stopClipboardPropagation, onCut: stopClipboardPropagation, onPaste: stopClipboardPropagation, rows: 12, placeholder: "Paste a component file (.ts or .tsx)." })) : (react__WEBPACK_IMPORTED_MODULE_5___default().createElement(antd__WEBPACK_IMPORTED_MODULE_9__.Input, { value: linkValue, onChange: (event) => setLinkValue(event.target.value), onKeyDown: stopKeyPropagation, onCopy: stopClipboardPropagation, onCut: stopClipboardPropagation, onPaste: stopClipboardPropagation, placeholder: "https://.../component.tsx or ./.amphi/components/component.tsx" }))))));
};
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.open = "components-panel:open";
})(CommandIDs || (CommandIDs = {}));
const plugin = {
    id: "@amphi/components-panel:plugin",
    autoStart: true,
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ICommandPalette, _amphi_pipeline_components_manager__WEBPACK_IMPORTED_MODULE_3__.ComponentManager, _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_2__.IDefaultFileBrowser],
    activate: (app, palette, componentService, defaultFileBrowser) => {
        const { commands, shell } = app;
        commands.addCommand(CommandIDs.open, {
            label: "Pipeline Components",
            caption: "Manage registered pipeline components",
            execute: () => {
                class ComponentsPanelWidget extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget {
                    constructor() {
                        super();
                        // Align with scheduler behavior: always root workspace `.amphi`.
                        this._workspaceRootPath = "";
                        this.id = "amphi-components-panel";
                        this.title.caption = "Pipeline Components";
                        this.title.icon = _icons__WEBPACK_IMPORTED_MODULE_4__.puzzleIcon;
                        this.title.closable = true;
                    }
                    render() {
                        // return (
                        //    <ComponentsPanel
                        //       app={app}
                        //       componentService={componentService}
                        //       getCurrentBrowserPath={() => defaultFileBrowser.model.path}
                        //       workspaceRootPath={this._workspaceRootPath}
                        //    />
                        // );
                        return null;
                    }
                }
                let widget;
                for (const item of shell.widgets("left")) {
                    if (item.id === "amphi-components-panel") {
                        widget = item;
                        break;
                    }
                }
                if (!widget || widget.isDisposed) {
                    widget = new ComponentsPanelWidget();
                }
                if (!widget.isAttached) {
                    shell.add(widget, "left");
                }
                shell.activateById(widget.id);
            },
        });
        palette.addItem({ command: CommandIDs.open, category: "Amphi" });
        commands.execute(CommandIDs.open);
    },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);


/***/ },

/***/ "./style/index.css"
/*!*************************!*\
  !*** ./style/index.css ***!
  \*************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./index.css */ "../../node_modules/css-loader/dist/cjs.js!./style/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ },

/***/ "./style/icons/puzzle.svg"
/*!********************************!*\
  !*** ./style/icons/puzzle.svg ***!
  \********************************/
(module) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"icon icon-tabler icons-tabler-outline icon-tabler-puzzle\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1\" /></svg>";

/***/ }

}]);
//# sourceMappingURL=lib_index_js.2e854cfbd7de935f0293.js.map