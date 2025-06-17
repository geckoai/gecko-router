var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ConstantValueProvider, Module } from '@geckoai/gecko-core';
import { RouterService, useContainer } from './router-service';
import React, { createElement } from "react";
var ReactRouter = (function () {
    function ReactRouter() {
    }
    ReactRouter_1 = ReactRouter;
    ReactRouter.ProvideErrorBoundary = function (ErrorBoundary) {
        return ConstantValueProvider.create(ReactRouter_1.ErrorBoundary, ErrorBoundary);
    };
    ReactRouter.ProvideFallback = function (Fallback) {
        return ConstantValueProvider.create(ReactRouter_1.Fallback, Fallback);
    };
    ReactRouter.lazy = function (load) {
        return (function () {
            return createElement(function () {
                var container = useContainer();
                var isBoundFallback = container.isBound(ReactRouter_1.Fallback);
                return createElement(React.Suspense, {
                    fallback: isBoundFallback ? createElement(container.get(ReactRouter_1.Fallback)) : createElement('div', {
                        children: "Loading..."
                    }),
                    children: createElement(React.lazy(load))
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
        Module({
            providers: [RouterService],
            exports: [RouterService],
        })
    ], ReactRouter);
    return ReactRouter;
}());
export { ReactRouter };
