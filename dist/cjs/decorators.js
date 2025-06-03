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
import { ClassDecorate, ClassMirror } from '@geckoai/class-mirror';
import { ApplyClassDecorators } from '@geckoai/gecko-core';
var GeckoLazyTaskDecorate = (function (_super) {
    __extends(GeckoLazyTaskDecorate, _super);
    function GeckoLazyTaskDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GeckoLazyTaskDecorate;
}(ClassDecorate));
export { GeckoLazyTaskDecorate };
var GeckoRouteDecorate = (function (_super) {
    __extends(GeckoRouteDecorate, _super);
    function GeckoRouteDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GeckoRouteDecorate;
}(ClassDecorate));
export { GeckoRouteDecorate };
var GeckoRouterDecorate = (function (_super) {
    __extends(GeckoRouterDecorate, _super);
    function GeckoRouterDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GeckoRouterDecorate;
}(ClassDecorate));
export { GeckoRouterDecorate };
var GeckoHashRouterDecorate = (function (_super) {
    __extends(GeckoHashRouterDecorate, _super);
    function GeckoHashRouterDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GeckoHashRouterDecorate;
}(GeckoRouterDecorate));
export { GeckoHashRouterDecorate };
var GeckoBrowserRouterDecorate = (function (_super) {
    __extends(GeckoBrowserRouterDecorate, _super);
    function GeckoBrowserRouterDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GeckoBrowserRouterDecorate;
}(GeckoRouterDecorate));
export { GeckoBrowserRouterDecorate };
var GeckoMemoryRouterDecorate = (function (_super) {
    __extends(GeckoMemoryRouterDecorate, _super);
    function GeckoMemoryRouterDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GeckoMemoryRouterDecorate;
}(GeckoRouterDecorate));
export { GeckoMemoryRouterDecorate };
var GeckoFallbackDecorate = (function (_super) {
    __extends(GeckoFallbackDecorate, _super);
    function GeckoFallbackDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GeckoFallbackDecorate;
}(ClassDecorate));
export { GeckoFallbackDecorate };
export function Route(arg) {
    switch (typeof arg) {
        case 'function':
            return ClassMirror.createDecorator(new GeckoRouteDecorate({ path: '' }))(arg);
        case 'string':
            return ClassMirror.createDecorator(new GeckoRouteDecorate({ path: arg }));
        default:
            return ClassMirror.createDecorator(new GeckoRouteDecorate(arg));
    }
}
export function Fallback(component) {
    return ClassMirror.createDecorator(new GeckoFallbackDecorate(component));
}
export function BrowserRouter(ops) {
    if (typeof ops === 'function') {
        return ClassMirror.createDecorator(new GeckoBrowserRouterDecorate(undefined))(ops);
    }
    return ApplyClassDecorators(ClassMirror.createDecorator(new GeckoBrowserRouterDecorate(ops)));
}
export function HashRouter(ops) {
    if (typeof ops === 'function') {
        return ClassMirror.createDecorator(new GeckoHashRouterDecorate(undefined))(ops);
    }
    return ApplyClassDecorators(ClassMirror.createDecorator(new GeckoHashRouterDecorate(ops)));
}
export function MemoryRouter(ops) {
    if (typeof ops === 'function') {
        return ClassMirror.createDecorator(new GeckoMemoryRouterDecorate(undefined))(ops);
    }
    return ApplyClassDecorators(ClassMirror.createDecorator(new GeckoMemoryRouterDecorate(ops)));
}
