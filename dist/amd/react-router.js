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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
define(["require", "exports", "@geckoai/gecko-core", "@geckoai/class-mirror", "./decorators", "react-router-dom", "react", "./fallback-node"], function (require, exports, gecko_core_1, class_mirror_1, decorators_1, react_router_dom_1, react_1, fallback_node_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReactRouter = exports.useCurrentModule = exports.useContainer = void 0;
    var Context = (0, react_1.createContext)(null);
    function useContainer() {
        return (0, react_1.useContext)(Context);
    }
    exports.useContainer = useContainer;
    function useCurrentModule(target) {
        var _a;
        return ((_a = useContainer()) === null || _a === void 0 ? void 0 : _a.get(target)) || null;
    }
    exports.useCurrentModule = useCurrentModule;
    var ReactRouter = (function () {
        function ReactRouter(container) {
            this.container = container;
            var mirror = container.get(class_mirror_1.ClassMirror);
            var decorates = mirror.getDecorates(decorators_1.GeckoRouterDecorate);
            var decorate = decorates[0];
            var containers = container.get(gecko_core_1.Constants.children);
            var routes = ReactRouter_1.getRoutes(containers);
            var parent = container.get(gecko_core_1.Constants.parent);
            parent === null || parent === void 0 ? void 0 : parent.bind(ReactRouter_1.routes).toConstantValue(routes);
            parent === null || parent === void 0 ? void 0 : parent.bind(ReactRouter_1.options).toConstantValue(decorate === null || decorate === void 0 ? void 0 : decorate.metadata);
            if (decorate instanceof decorators_1.GeckoBrowserRouterDecorate) {
                var router = (0, react_router_dom_1.createBrowserRouter)(routes, decorate.metadata);
                parent === null || parent === void 0 ? void 0 : parent.bind(ReactRouter_1.Router).toConstantValue(router);
            }
            if (decorate instanceof decorators_1.GeckoHashRouterDecorate) {
                var router = (0, react_router_dom_1.createHashRouter)(routes, decorate.metadata);
                parent === null || parent === void 0 ? void 0 : parent.bind(ReactRouter_1.Router).toConstantValue(router);
            }
            if (decorate instanceof decorators_1.GeckoMemoryRouterDecorate) {
                var router = (0, react_router_dom_1.createMemoryRouter)(routes, decorate.metadata);
                parent === null || parent === void 0 ? void 0 : parent.bind(ReactRouter_1.Router).toConstantValue(router);
            }
        }
        ReactRouter_1 = ReactRouter;
        ReactRouter.getRoutes = function (containers) {
            var _this = this;
            if (containers === void 0) { containers = []; }
            return containers.map(function (container) {
                var childrenContainers = container.get(gecko_core_1.Constants.children);
                var mirror = container.get(class_mirror_1.ClassMirror);
                var routes = mirror.getDecorates(decorators_1.GeckoRouteDecorate);
                var tasks = mirror.getDecorates(decorators_1.GeckoLazyTaskDecorate);
                if (routes && routes.length > 1) {
                    console.warn('There are multiple @Route decorators, and only the latest one will be selected for execution during runtime.');
                }
                var RouteDecorate = routes[0];
                if (RouteDecorate === null || RouteDecorate === void 0 ? void 0 : RouteDecorate.metadata) {
                    var _a = RouteDecorate.metadata, children = _a.children, Component_1 = _a.Component, rest = __rest(_a, ["children", "Component"]);
                    var list = children ? children.concat(_this.getRoutes(childrenContainers)) : _this.getRoutes(childrenContainers);
                    var element = (0, react_1.createElement)(Context.Provider, {
                        value: container,
                        children: Component_1 ? (0, react_1.createElement)(Component_1) : (0, react_1.createElement)(react_router_dom_1.Outlet)
                    });
                    if (tasks && tasks.length > 1) {
                        var LazyComponent = (0, react_1.lazy)(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, Promise.all(tasks.map(function (x) { return x.metadata(container); }))];
                                    case 1:
                                        _a.sent();
                                        return [2, { default: Component_1 !== null && Component_1 !== void 0 ? Component_1 : react_router_dom_1.Outlet }];
                                }
                            });
                        }); });
                        var Fallback = mirror.getDecorates(decorators_1.GeckoFallbackDecorate)[0];
                        element = (0, react_1.createElement)(Context.Provider, {
                            value: container,
                            children: (0, react_1.createElement)(react_1.Suspense, {
                                fallback: Fallback ? (0, react_1.createElement)(Fallback.metadata) : (0, react_1.createElement)(fallback_node_1.FallbackNode),
                                children: (0, react_1.createElement)(LazyComponent)
                            })
                        });
                    }
                    return __assign(__assign({}, rest), { element: element, children: list.length > 0 ? list : undefined });
                }
                return null;
            }).filter(Boolean);
        };
        var ReactRouter_1;
        ReactRouter.routes = Symbol.for('provider');
        ReactRouter.options = Symbol.for('options');
        ReactRouter.Router = Symbol.for('Router');
        ReactRouter = ReactRouter_1 = __decorate([
            (0, gecko_core_1.GeckoModule)({
                providers: [],
                exports: []
            }),
            __metadata("design:paramtypes", [gecko_core_1.Container])
        ], ReactRouter);
        return ReactRouter;
    }());
    exports.ReactRouter = ReactRouter;
});
