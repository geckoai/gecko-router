var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Constants, Container, injectable } from '@geckoai/gecko-core';
import { ClassMirror } from '@geckoai/class-mirror';
import { GeckoRouteDecorate } from './decorators';
import { Outlet } from 'react-router-dom';
import React, { createElement, useContext } from 'react';
var Context = React.createContext(null);
export function useContainer() {
    return useContext(Context);
}
export function useCurrentModule(target) {
    var _a;
    return ((_a = useContainer()) === null || _a === void 0 ? void 0 : _a.get(target)) || null;
}
var RouterService = (function () {
    function RouterService(container) {
        this.container = container;
        this.route = null;
        this.route = RouterService_1.parse(RouterService_1.root(container));
    }
    RouterService_1 = RouterService;
    RouterService.parse = function (container) {
        if (container) {
            var mirror = container.get(ClassMirror);
            var decorates = mirror.getDecorates(GeckoRouteDecorate);
            var route = decorates[0];
            var containers = container.get(Constants.children);
            if (route) {
                var _a = route.metadata, _b = _a.children, children = _b === void 0 ? [] : _b, Component = _a.Component, rest = __rest(_a, ["children", "Component"]);
                var concatChildren = children.concat(containers.map(function (c) { return RouterService_1.parse(c); }).filter(Boolean));
                var routeObject = __assign(__assign({}, rest), { element: createElement(Context.Provider, {
                        value: container,
                        children: Component ? createElement(Component) : createElement(Outlet)
                    }) });
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
                    children: containers.map(function (c) { return RouterService_1.parse(c); }).filter(Boolean)
                };
            }
        }
        return null;
    };
    RouterService.parents = function (container) {
        if (container.isBound(Constants.parent)) {
            var c = container.get(Constants.parent);
            return __spreadArray(__spreadArray([], RouterService_1.parents(c), true), [c], false);
        }
        return [];
    };
    RouterService.root = function (container) {
        return RouterService_1.parents(container)[0] || null;
    };
    var RouterService_1;
    RouterService = RouterService_1 = __decorate([
        injectable(),
        __metadata("design:paramtypes", [Container])
    ], RouterService);
    return RouterService;
}());
export { RouterService };
