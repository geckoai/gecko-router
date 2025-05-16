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
define(["require", "exports", "@geckoai/class-mirror", "@geckoai/gecko-core"], function (require, exports, class_mirror_1, gecko_core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GeckoRouteDecorate = void 0;
    exports.GeckoRouteModule = GeckoRouteModule;
    var GeckoRouteDecorate = (function (_super) {
        __extends(GeckoRouteDecorate, _super);
        function GeckoRouteDecorate() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GeckoRouteDecorate;
    }(class_mirror_1.ClassDecorate));
    exports.GeckoRouteDecorate = GeckoRouteDecorate;
    function GeckoRouteModule(arg, module, scope) {
        return (0, gecko_core_1.ApplyClassDecorators)(class_mirror_1.ClassMirror.createDecorator(new GeckoRouteDecorate(typeof arg === 'string' ? { path: arg } : arg)), module ? (0, gecko_core_1.GeckoModule)(module, scope) : gecko_core_1.GeckoModule);
    }
});
