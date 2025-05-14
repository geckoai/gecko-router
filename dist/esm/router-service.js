var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RouterService_1;
import { Constants, Container, injectable } from '@geckoai/gecko-core';
import { ClassMirror } from '@geckoai/class-mirror';
import { GeckoRouteDecorate } from './decorators';
import { Outlet } from 'react-router-dom';
import React, { createElement, useContext } from 'react';
const Context = React.createContext(null);
export function useContainer() {
    return useContext(Context);
}
export function useCurrentModule(target) {
    return useContainer()?.get(target) || null;
}
let RouterService = RouterService_1 = class RouterService {
    container;
    route = null;
    constructor(container) {
        this.container = container;
        this.route = RouterService_1.parse(RouterService_1.root(container));
    }
    static parse(container) {
        if (container) {
            const mirror = container.get(ClassMirror);
            const decorates = mirror.getDecorates(GeckoRouteDecorate);
            const route = decorates[0];
            const containers = container.get(Constants.children);
            if (route) {
                const { children = [], Component, ...rest } = route.metadata;
                const concatChildren = children.concat(containers.map(c => RouterService_1.parse(c)).filter(Boolean));
                const routeObject = {
                    ...rest,
                    element: createElement(Context.Provider, {
                        value: container,
                        children: Component ? createElement(Component) : createElement(Outlet)
                    })
                };
                if (concatChildren.length) {
                    routeObject.children = concatChildren;
                }
                return routeObject;
            }
            else {
                return {
                    path: '',
                    element: createElement(Context.Provider, {
                        value: container,
                        children: createElement(Outlet)
                    }),
                    children: containers.map(c => RouterService_1.parse(c)).filter(Boolean)
                };
            }
        }
        return null;
    }
    static parents(container) {
        if (container.isBound(Constants.parent)) {
            const c = container.get(Constants.parent);
            return [...RouterService_1.parents(c), c];
        }
        return [];
    }
    static root(container) {
        return RouterService_1.parents(container)[0] || null;
    }
};
RouterService = RouterService_1 = __decorate([
    injectable(),
    __metadata("design:paramtypes", [Container])
], RouterService);
export { RouterService };
