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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define(["require", "exports", "@geckoai/gecko-core", "@geckoai/class-mirror", "./decorators", "react-router-dom", "react"], function (require, exports, gecko_core_1, class_mirror_1, decorators_1, react_router_dom_1, react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RouterService = void 0;
    exports.useContainer = useContainer;
    exports.useCurrentModule = useCurrentModule;
    react_1 = __importStar(react_1);
    var Context = react_1.default.createContext(null);
    function useContainer() {
        return (0, react_1.useContext)(Context);
    }
    function useCurrentModule(target) {
        var _a;
        return ((_a = useContainer()) === null || _a === void 0 ? void 0 : _a.get(target)) || null;
    }
    var RouterService = (function () {
        function RouterService(container) {
            this.container = container;
            this.route = null;
            this.route = RouterService_1.parse(RouterService_1.root(container));
        }
        RouterService_1 = RouterService;
        RouterService.parse = function (container) {
            if (container) {
                var mirror = container.get(class_mirror_1.ClassMirror);
                var decorates = mirror.getDecorates(decorators_1.GeckoRouteDecorate);
                var route = decorates[0];
                var containers = container.get(gecko_core_1.Constants.children);
                if (route) {
                    var _a = route.metadata, _b = _a.children, children = _b === void 0 ? [] : _b, Component = _a.Component, rest = __rest(_a, ["children", "Component"]);
                    var concatChildren = children.concat(containers.map(function (c) { return RouterService_1.parse(c); }).filter(Boolean));
                    var routeObject = __assign(__assign({}, rest), { element: (0, react_1.createElement)(Context.Provider, {
                            value: container,
                            children: Component ? (0, react_1.createElement)(Component) : (0, react_1.createElement)(react_router_dom_1.Outlet)
                        }) });
                    if (concatChildren.length) {
                        routeObject.children = concatChildren;
                    }
                    return routeObject;
                }
                else {
                    return {
                        path: '',
                        element: (0, react_1.createElement)(Context.Provider, {
                            value: container,
                            children: (0, react_1.createElement)(react_router_dom_1.Outlet)
                        }),
                        children: containers.map(function (c) { return RouterService_1.parse(c); }).filter(Boolean)
                    };
                }
            }
            return null;
        };
        RouterService.parents = function (container) {
            if (container.isBound(gecko_core_1.Constants.parent)) {
                var c = container.get(gecko_core_1.Constants.parent);
                return __spreadArray(__spreadArray([], RouterService_1.parents(c), true), [c], false);
            }
            return [];
        };
        RouterService.root = function (container) {
            return RouterService_1.parents(container)[0] || null;
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
