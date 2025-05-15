var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { GeckoModule } from '@geckoai/gecko-core';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createElement, useMemo } from 'react';
import { RouterService } from './router-service';
var ReactRouter = (function () {
    function ReactRouter() {
    }
    ReactRouter.Provider = function (_a) {
        var module = _a.module;
        var service = module.container.get(RouterService);
        var routes = useMemo(function () {
            return (service === null || service === void 0 ? void 0 : service.route) ? [service.route] : [];
        }, []);
        var router = createBrowserRouter(routes);
        return createElement(RouterProvider, { router: router });
    };
    ;
    ReactRouter = __decorate([
        GeckoModule({
            providers: [RouterService],
            exports: [RouterService]
        })
    ], ReactRouter);
    return ReactRouter;
}());
export { ReactRouter };
