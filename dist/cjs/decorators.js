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
import { ApplyClassDecorators, GeckoModule } from '@geckoai/gecko-core';
var GeckoRouteDecorate = (function (_super) {
    __extends(GeckoRouteDecorate, _super);
    function GeckoRouteDecorate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GeckoRouteDecorate;
}(ClassDecorate));
export { GeckoRouteDecorate };
export function GeckoRoute(metadata) {
    return ApplyClassDecorators(ClassMirror.createDecorator(new GeckoRouteDecorate(metadata)));
}
export function GeckoRouteModule(metadata, moduleMetadata, scope) {
    return ApplyClassDecorators(ClassMirror.createDecorator(new GeckoRouteDecorate(metadata)), moduleMetadata ? GeckoModule(moduleMetadata, scope) : GeckoModule);
}
