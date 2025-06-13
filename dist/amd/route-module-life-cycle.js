define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RouteModuleLifeCycle = void 0;
    var RouteModuleLifeCycle = (function () {
        function RouteModuleLifeCycle() {
        }
        RouteModuleLifeCycle.prototype.onInit = function () { };
        RouteModuleLifeCycle.prototype.onMount = function () { };
        RouteModuleLifeCycle.prototype.onUnmount = function () { };
        return RouteModuleLifeCycle;
    }());
    exports.RouteModuleLifeCycle = RouteModuleLifeCycle;
});
