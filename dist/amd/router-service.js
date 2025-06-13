var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
define(["require", "exports", "@geckoai/class-mirror", "@geckoai/gecko-core", "react", "react-router-dom", "./decorators", "./react-router"], function (require, exports, class_mirror_1, gecko_core_1, react_1, react_router_dom_1, decorators_1, react_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RouterService = exports.useService = exports.useContainer = void 0;
    var Context = (0, react_1.createContext)(new gecko_core_1.Container());
    function useContainer() {
        return (0, react_1.useContext)(Context);
    }
    exports.useContainer = useContainer;
    function useService(serviceIdentifier, opts) {
        var ref = (0, react_1.useRef)(null);
        try {
            ref.current = (0, react_1.useContext)(Context).get(serviceIdentifier, opts);
        }
        catch (e) {
            if (ref.current && process.env.NODE_ENV === 'development') {
                window.location.reload();
            }
            else {
                throw e;
            }
        }
        if (ref.current === null) {
            throw new Error("No service identifier provided");
        }
        return ref.current;
    }
    exports.useService = useService;
    var RouterService = (function () {
        function RouterService(container) {
            this.container = container;
        }
        RouterService_1 = RouterService;
        RouterService.middleElements = function (container) {
            try {
                return container.get(react_router_1.ReactRouter.middleElements);
            }
            catch (_a) {
                return [];
            }
        };
        RouterService.toElement = function (elements, children) {
            return elements.reverse().reduce(function (c, a) {
                return (0, react_1.createElement)(a, { children: c });
            }, children);
        };
        RouterService.getRoutes = function (containers) {
            var _this = this;
            if (containers === void 0) { containers = []; }
            return containers.map(function (container) {
                var _a;
                var childrenContainers = container.get(gecko_core_1.Constants.children);
                var mirror = container.get(class_mirror_1.ClassMirror);
                var routes = mirror.getDecorates(decorators_1.GeckoRouteDecorate);
                var fallbacks = mirror.getDecorates(decorators_1.GeckoFallbackDecorate);
                var errorBoundarys = mirror.getDecorates(decorators_1.GeckoErrorBoundaryDecorate);
                if (!container.isBound(react_router_1.ReactRouter.ErrorBoundary) && errorBoundarys[0]) {
                    container.bind(react_router_1.ReactRouter.ErrorBoundary).toConstantValue(errorBoundarys[0].metadata);
                }
                if (!container.isBound(react_router_1.ReactRouter.ErrorBoundary) && fallbacks[0]) {
                    container.bind(react_router_1.ReactRouter.Fallback).toConstantValue(fallbacks[0].metadata);
                }
                if (routes && routes.length > 1) {
                    console.warn('There are multiple @Route decorators, and only the latest one will be selected for execution during runtime.');
                }
                var RouteDecorate = routes[0];
                if (RouteDecorate === null || RouteDecorate === void 0 ? void 0 : RouteDecorate.metadata) {
                    var _b = RouteDecorate.metadata, children = _b.children, Component_1 = _b.Component, ErrorBoundary = _b.ErrorBoundary, rest = __rest(_b, ["children", "Component", "ErrorBoundary"]);
                    var list = children ? children.concat(_this.getRoutes(childrenContainers)) : _this.getRoutes(childrenContainers);
                    var current_1 = container.get(gecko_core_1.Constants.instance);
                    (_a = current_1 === null || current_1 === void 0 ? void 0 : current_1.onInit) === null || _a === void 0 ? void 0 : _a.call(current_1);
                    return __assign(__assign({}, rest), { ErrorBoundary: ErrorBoundary !== null && ErrorBoundary !== void 0 ? ErrorBoundary : (container.isBound(react_router_1.ReactRouter.ErrorBoundary) ? container.get(react_router_1.ReactRouter.ErrorBoundary) : undefined), element: (0, react_1.createElement)((function () {
                            (0, react_1.useEffect)(function () {
                                var _a;
                                (_a = current_1 === null || current_1 === void 0 ? void 0 : current_1.onMount) === null || _a === void 0 ? void 0 : _a.call(current_1);
                                return function () { var _a; return (_a = current_1 === null || current_1 === void 0 ? void 0 : current_1.onUnmount) === null || _a === void 0 ? void 0 : _a.call(current_1); };
                            }, []);
                            return (0, react_1.createElement)(Context.Provider, {
                                value: container,
                                children: _this.toElement(RouterService_1.middleElements(container), Component_1 ? (0, react_1.createElement)(Component_1) : (0, react_1.createElement)(react_router_dom_1.Outlet))
                            });
                        })), children: list.length > 0 ? list : undefined });
                }
                return null;
            }).filter(Boolean);
        };
        RouterService.prototype.getRouter = function () {
            var container = this.container;
            var mirror = container.get(class_mirror_1.ClassMirror);
            var decorates = mirror.getDecorates(decorators_1.GeckoRouterDecorate);
            var decorate = decorates[0];
            var containers = container.get(gecko_core_1.Constants.children);
            if (decorate instanceof decorators_1.GeckoBrowserRouterDecorate) {
                return (0, react_router_dom_1.createBrowserRouter)(RouterService_1.getRoutes(containers), decorate.metadata);
            }
            if (decorate instanceof decorators_1.GeckoHashRouterDecorate) {
                return (0, react_router_dom_1.createHashRouter)(RouterService_1.getRoutes(containers), decorate.metadata);
            }
            if (decorate instanceof decorators_1.GeckoMemoryRouterDecorate) {
                return (0, react_router_dom_1.createHashRouter)(RouterService_1.getRoutes(containers), decorate.metadata);
            }
        };
        var RouterService_1;
        RouterService = RouterService_1 = __decorate([
            (0, gecko_core_1.injectable)(),
            __metadata("design:paramtypes", [gecko_core_1.Container])
        ], RouterService);
        return RouterService;
    }());
    exports.RouterService = RouterService;
});
