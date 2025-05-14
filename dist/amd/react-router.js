var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@geckoai/gecko-core", "react-router-dom", "react", "./router-service"], function (require, exports, gecko_core_1, react_router_dom_1, react_1, router_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReactRouter = void 0;
    var ReactRouter = (function () {
        function ReactRouter() {
        }
        ReactRouter.Provider = function (_a) {
            var module = _a.module;
            var service = module.container.get(router_service_1.RouterService);
            var routes = (0, react_1.useMemo)(function () {
                return (service === null || service === void 0 ? void 0 : service.route) ? [service.route] : [];
            }, []);
            var router = (0, react_router_dom_1.createBrowserRouter)(routes);
            return (0, react_1.createElement)(react_router_dom_1.RouterProvider, { router: router });
        };
        ;
        ReactRouter = __decorate([
            (0, gecko_core_1.GeckoModule)({
                providers: [router_service_1.RouterService],
                exports: [router_service_1.RouterService]
            })
        ], ReactRouter);
        return ReactRouter;
    }());
    exports.ReactRouter = ReactRouter;
});
