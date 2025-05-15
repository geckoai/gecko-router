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
exports.GeckoRouteModule = exports.GeckoRoute = exports.GeckoRouteDecorate = void 0;
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
function GeckoRoute(metadata) {
    return (0, gecko_core_1.ApplyClassDecorators)(class_mirror_1.ClassMirror.createDecorator(new GeckoRouteDecorate(metadata)));
}
exports.GeckoRoute = GeckoRoute;
function GeckoRouteModule(metadata, moduleMetadata, scope) {
    return (0, gecko_core_1.ApplyClassDecorators)(class_mirror_1.ClassMirror.createDecorator(new GeckoRouteDecorate(metadata)), moduleMetadata ? (0, gecko_core_1.GeckoModule)(moduleMetadata, scope) : gecko_core_1.GeckoModule);
}
exports.GeckoRouteModule = GeckoRouteModule;
