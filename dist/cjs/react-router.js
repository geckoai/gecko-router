"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactRouter = void 0;
var gecko_core_1 = require("@geckoai/gecko-core");
var router_service_1 = require("./router-service");
var react_1 = __importStar(require("react"));
var ReactRouter = (function () {
    function ReactRouter() {
    }
    ReactRouter_1 = ReactRouter;
    ReactRouter.ProvideErrorBoundary = function (ErrorBoundary) {
        return gecko_core_1.ConstantValueProvider.create(ReactRouter_1.ErrorBoundary, ErrorBoundary);
    };
    ReactRouter.ProvideFallback = function (Fallback) {
        return gecko_core_1.ConstantValueProvider.create(ReactRouter_1.Fallback, Fallback);
    };
    ReactRouter.lazy = function (load) {
        return (function () {
            return (0, react_1.createElement)(function () {
                var container = (0, router_service_1.useContainer)();
                var isBoundFallback = container.isBound(ReactRouter_1.Fallback);
                return (0, react_1.createElement)(react_1.default.Suspense, {
                    fallback: isBoundFallback ? (0, react_1.createElement)(container.get(ReactRouter_1.Fallback)) : (0, react_1.createElement)('div', {
                        children: "Loading..."
                    }),
                    children: (0, react_1.createElement)(react_1.default.lazy(load))
                });
            });
        });
    };
    var ReactRouter_1;
    ReactRouter.middleElements = Symbol.for("middleElements");
    ReactRouter.middleElement = Symbol.for("middleElement");
    ReactRouter.ErrorBoundary = Symbol.for("ErrorBoundary");
    ReactRouter.Fallback = Symbol.for("Fallback");
    ReactRouter.Route = Symbol.for("Route");
    ReactRouter = ReactRouter_1 = __decorate([
        (0, gecko_core_1.Module)({
            providers: [router_service_1.RouterService],
            exports: [router_service_1.RouterService],
        })
    ], ReactRouter);
    return ReactRouter;
}());
exports.ReactRouter = ReactRouter;
