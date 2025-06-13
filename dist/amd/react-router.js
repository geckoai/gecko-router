var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@geckoai/gecko-core", "./router-service"], function (require, exports, gecko_core_1, router_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReactRouter = void 0;
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
        var ReactRouter_1;
        ReactRouter.middleElements = Symbol.for("middleElements");
        ReactRouter.ErrorBoundary = Symbol.for("ErrorBoundary");
        ReactRouter.Fallback = Symbol.for("Fallback");
        ReactRouter = ReactRouter_1 = __decorate([
            (0, gecko_core_1.Module)({
                providers: [router_service_1.RouterService],
                exports: [router_service_1.RouterService],
            })
        ], ReactRouter);
        return ReactRouter;
    }());
    exports.ReactRouter = ReactRouter;
});
