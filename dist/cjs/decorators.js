"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryRouter = exports.HashRouter = exports.BrowserRouter = exports.ErrorBoundary = exports.Fallback = exports.Route = exports.GeckoErrorBoundaryDecorate = exports.GeckoFallbackDecorate = exports.GeckoMemoryRouterDecorate = exports.GeckoBrowserRouterDecorate = exports.GeckoHashRouterDecorate = exports.GeckoRouterDecorate = exports.GeckoRouteDecorate = void 0;
var class_mirror_1 = require("@geckoai/class-mirror");
var gecko_core_1 = require("@geckoai/gecko-core");
var GeckoRouteDecorate = (function (_super) {
    __extends(GeckoRouteDecorate, _super);
    function GeckoRouteDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GeckoRouteDecorate;
}(class_mirror_1.ClassDecorate));
exports.GeckoRouteDecorate = GeckoRouteDecorate;
var GeckoRouterDecorate = (function (_super) {
    __extends(GeckoRouterDecorate, _super);
    function GeckoRouterDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GeckoRouterDecorate;
}(class_mirror_1.ClassDecorate));
exports.GeckoRouterDecorate = GeckoRouterDecorate;
var GeckoHashRouterDecorate = (function (_super) {
    __extends(GeckoHashRouterDecorate, _super);
    function GeckoHashRouterDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GeckoHashRouterDecorate;
}(GeckoRouterDecorate));
exports.GeckoHashRouterDecorate = GeckoHashRouterDecorate;
var GeckoBrowserRouterDecorate = (function (_super) {
    __extends(GeckoBrowserRouterDecorate, _super);
    function GeckoBrowserRouterDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GeckoBrowserRouterDecorate;
}(GeckoRouterDecorate));
exports.GeckoBrowserRouterDecorate = GeckoBrowserRouterDecorate;
var GeckoMemoryRouterDecorate = (function (_super) {
    __extends(GeckoMemoryRouterDecorate, _super);
    function GeckoMemoryRouterDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GeckoMemoryRouterDecorate;
}(GeckoRouterDecorate));
exports.GeckoMemoryRouterDecorate = GeckoMemoryRouterDecorate;
var GeckoFallbackDecorate = (function (_super) {
    __extends(GeckoFallbackDecorate, _super);
    function GeckoFallbackDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GeckoFallbackDecorate;
}(class_mirror_1.ClassDecorate));
exports.GeckoFallbackDecorate = GeckoFallbackDecorate;
var GeckoErrorBoundaryDecorate = (function (_super) {
    __extends(GeckoErrorBoundaryDecorate, _super);
    function GeckoErrorBoundaryDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GeckoErrorBoundaryDecorate;
}(class_mirror_1.ClassDecorate));
exports.GeckoErrorBoundaryDecorate = GeckoErrorBoundaryDecorate;
function Route(arg) {
    switch (typeof arg) {
        case 'function':
            return class_mirror_1.ClassMirror.createDecorator(new GeckoRouteDecorate({ path: '' }))(arg);
        case 'string':
            return class_mirror_1.ClassMirror.createDecorator(new GeckoRouteDecorate({ path: arg }));
        default:
            return class_mirror_1.ClassMirror.createDecorator(new GeckoRouteDecorate(arg));
    }
}
exports.Route = Route;
function Fallback(component) {
    return class_mirror_1.ClassMirror.createDecorator(new GeckoFallbackDecorate(component));
}
exports.Fallback = Fallback;
function ErrorBoundary(component) {
    return class_mirror_1.ClassMirror.createDecorator(new GeckoErrorBoundaryDecorate(component));
}
exports.ErrorBoundary = ErrorBoundary;
function BrowserRouter(ops) {
    if (typeof ops === 'function') {
        return class_mirror_1.ClassMirror.createDecorator(new GeckoBrowserRouterDecorate(undefined))(ops);
    }
    return (0, gecko_core_1.ApplyClassDecorators)(class_mirror_1.ClassMirror.createDecorator(new GeckoBrowserRouterDecorate(ops)));
}
exports.BrowserRouter = BrowserRouter;
function HashRouter(ops) {
    if (typeof ops === 'function') {
        return class_mirror_1.ClassMirror.createDecorator(new GeckoHashRouterDecorate(undefined))(ops);
    }
    return (0, gecko_core_1.ApplyClassDecorators)(class_mirror_1.ClassMirror.createDecorator(new GeckoHashRouterDecorate(ops)));
}
exports.HashRouter = HashRouter;
function MemoryRouter(ops) {
    if (typeof ops === 'function') {
        return class_mirror_1.ClassMirror.createDecorator(new GeckoMemoryRouterDecorate(undefined))(ops);
    }
    return (0, gecko_core_1.ApplyClassDecorators)(class_mirror_1.ClassMirror.createDecorator(new GeckoMemoryRouterDecorate(ops)));
}
exports.MemoryRouter = MemoryRouter;
