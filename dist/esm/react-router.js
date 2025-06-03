var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ReactRouter_1;
import { Constants, Container, GeckoModule } from '@geckoai/gecko-core';
import { ClassMirror } from '@geckoai/class-mirror';
import { GeckoBrowserRouterDecorate, GeckoFallbackDecorate, GeckoHashRouterDecorate, GeckoLazyTaskDecorate, GeckoMemoryRouterDecorate, GeckoRouteDecorate, GeckoRouterDecorate } from './decorators';
import { createBrowserRouter, createHashRouter, createMemoryRouter, Outlet } from 'react-router-dom';
import { createContext, createElement, lazy, Suspense, useContext } from 'react';
import { FallbackNode } from './fallback-node';
const Context = createContext(null);
export function useContainer() {
    return useContext(Context);
}
export function useCurrentModule(target) {
    return useContainer()?.get(target) || null;
}
let ReactRouter = ReactRouter_1 = class ReactRouter {
    container;
    static routes = Symbol.for('provider');
    static options = Symbol.for('options');
    static Router = Symbol.for('Router');
    constructor(container) {
        this.container = container;
        const mirror = container.get(ClassMirror);
        const decorates = mirror.getDecorates(GeckoRouterDecorate);
        const decorate = decorates[0];
        const containers = container.get(Constants.children);
        const routes = ReactRouter_1.getRoutes(containers);
        const parent = container.get(Constants.parent);
        parent?.bind(ReactRouter_1.routes).toConstantValue(routes);
        parent?.bind(ReactRouter_1.options).toConstantValue(decorate?.metadata);
        if (decorate instanceof GeckoBrowserRouterDecorate) {
            const router = createBrowserRouter(routes, decorate.metadata);
            parent?.bind(ReactRouter_1.Router).toConstantValue(router);
        }
        if (decorate instanceof GeckoHashRouterDecorate) {
            const router = createHashRouter(routes, decorate.metadata);
            parent?.bind(ReactRouter_1.Router).toConstantValue(router);
        }
        if (decorate instanceof GeckoMemoryRouterDecorate) {
            const router = createMemoryRouter(routes, decorate.metadata);
            parent?.bind(ReactRouter_1.Router).toConstantValue(router);
        }
    }
    static getRoutes(containers = []) {
        return containers.map(container => {
            const childrenContainers = container.get(Constants.children);
            const mirror = container.get(ClassMirror);
            const routes = mirror.getDecorates(GeckoRouteDecorate);
            const tasks = mirror.getDecorates(GeckoLazyTaskDecorate);
            if (routes && routes.length > 1) {
                console.warn('There are multiple @Route decorators, and only the latest one will be selected for execution during runtime.');
            }
            const [RouteDecorate] = routes;
            if (RouteDecorate?.metadata) {
                const { children, Component, ...rest } = RouteDecorate.metadata;
                const list = children ? children.concat(this.getRoutes(childrenContainers)) : this.getRoutes(childrenContainers);
                let element = createElement(Context.Provider, {
                    value: container,
                    children: Component ? createElement(Component) : createElement(Outlet)
                });
                if (tasks && tasks.length > 1) {
                    const LazyComponent = lazy(async () => {
                        await Promise.all(tasks.map(x => x.metadata(container)));
                        return { default: Component ?? Outlet };
                    });
                    const [Fallback] = mirror.getDecorates(GeckoFallbackDecorate);
                    element = createElement(Context.Provider, {
                        value: container,
                        children: createElement(Suspense, {
                            fallback: Fallback ? createElement(Fallback.metadata) : createElement(FallbackNode),
                            children: createElement(LazyComponent)
                        })
                    });
                }
                return {
                    ...rest,
                    element,
                    children: list.length > 0 ? list : undefined
                };
            }
            return null;
        }).filter(Boolean);
    }
};
ReactRouter = ReactRouter_1 = __decorate([
    GeckoModule({
        providers: [],
        exports: []
    }),
    __metadata("design:paramtypes", [Container])
], ReactRouter);
export { ReactRouter };
