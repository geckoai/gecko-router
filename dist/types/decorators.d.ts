/**
 * MIT License
 *
 * Copyright (c) 2021 @geckoai/gecko-platform-browser RanYunLong<549510622@qq.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { ClassDecorate } from '@geckoai/class-mirror';
import { RouteObject } from 'react-router-dom';
import { Container } from '@geckoai/gecko-core';
import { DOMRouterOpts } from 'react-router';
import { ComponentType } from 'react';
export declare class GeckoLazyTaskDecorate extends ClassDecorate<(container: Container) => Promise<void>> {
}
export declare class GeckoRouteDecorate extends ClassDecorate<Omit<RouteObject, 'element'>> {
}
export declare class GeckoRouterDecorate<T> extends ClassDecorate<T> {
}
export declare class GeckoHashRouterDecorate extends GeckoRouterDecorate<DOMRouterOpts | undefined> {
}
export declare class GeckoBrowserRouterDecorate extends GeckoRouterDecorate<DOMRouterOpts | undefined> {
}
export declare class GeckoMemoryRouterDecorate extends GeckoRouterDecorate<DOMRouterOpts | undefined> {
}
export declare class GeckoFallbackDecorate extends ClassDecorate<ComponentType> {
}
export declare function Route<TFunction extends Function>(target: TFunction): TFunction | void;
export declare function Route(path: string): ClassDecorator;
export declare function Route(route: Omit<RouteObject, 'element'>): ClassDecorator;
export declare function Fallback(component: ComponentType<any>): ClassDecorator;
export declare function BrowserRouter<TFunction extends Function>(target: TFunction): TFunction | void;
export declare function BrowserRouter(ops?: DOMRouterOpts): ClassDecorator;
export declare function HashRouter<TFunction extends Function>(target: TFunction): TFunction | void;
export declare function HashRouter(ops?: DOMRouterOpts): ClassDecorator;
export declare function MemoryRouter<TFunction extends Function>(target: TFunction): TFunction | void;
export declare function MemoryRouter(ops?: DOMRouterOpts): ClassDecorator;
