var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ReactRouter_1;
import { ConstantValueProvider, Module } from '@geckoai/gecko-core';
import { RouterService } from './router-service';
let ReactRouter = ReactRouter_1 = class ReactRouter {
    static middleElements = Symbol.for("middleElements");
    static ErrorBoundary = Symbol.for("ErrorBoundary");
    static Fallback = Symbol.for("Fallback");
    static ProvideErrorBoundary(ErrorBoundary) {
        return ConstantValueProvider.create(ReactRouter_1.ErrorBoundary, ErrorBoundary);
    }
    static ProvideFallback(Fallback) {
        return ConstantValueProvider.create(ReactRouter_1.Fallback, Fallback);
    }
};
ReactRouter = ReactRouter_1 = __decorate([
    Module({
        providers: [RouterService],
        exports: [RouterService],
    })
], ReactRouter);
export { ReactRouter };
