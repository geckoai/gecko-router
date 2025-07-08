/**
 * MIT License
 *
 * Copyright (c) 2021 @geckoai/platform-react RanYunLong<549510622@qq.com>
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
interface Future {
}
type MiddlewareEnabled = Future extends {
    unstable_middleware: infer T extends boolean;
} ? T : false;
interface unstable_RouterContext<T = unknown> {
    defaultValue?: T;
}
declare class unstable_RouterContextProvider {
    get<T>(context: unstable_RouterContext<T>): T;
    set<C extends unstable_RouterContext>(context: C, value: C extends unstable_RouterContext<infer T> ? T : never): void;
}
type DefaultContext = MiddlewareEnabled extends true ? unstable_RouterContextProvider : any;
type Params<Key extends string = string> = {
    readonly [key in Key]: string | undefined;
};
interface DataFunctionArgs<Context> {
    /** A {@link https://developer.mozilla.org/en-US/docs/Web/API/Request Fetch Request instance} which you can use to read headers (like cookies, and {@link https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams URLSearchParams} from the request. */
    request: Request;
    /**
     * {@link https://reactrouter.com/start/framework/routing#dynamic-segments Dynamic route params} for the current route.
     * @example
     * // app/routes.ts
     * route("teams/:teamId", "./team.tsx"),
     *
     * // app/team.tsx
     * export function loader({
     *   params,
     * }: Route.LoaderArgs) {
     *   params.teamId;
     *   //        ^ string
     * }
     **/
    params: Params;
    /**
     * This is the context passed in to your server adapter's getLoadContext() function.
     * It's a way to bridge the gap between the adapter's request/response API with your React Router app.
     * It is only applicable if you are using a custom server adapter.
     */
    context: Context;
}
interface ActionFunctionArgs<Context = DefaultContext> extends DataFunctionArgs<Context> {
}
type MaybePromise<T> = T | Promise<T>;
type DataFunctionValue = unknown;
type DataFunctionReturnValue = MaybePromise<DataFunctionValue>;
interface ActionFunction<Context = DefaultContext> {
    (args: ActionFunctionArgs<Context>, handlerCtx?: unknown): DataFunctionReturnValue;
}
interface LoaderFunctionArgs<Context = DefaultContext> extends DataFunctionArgs<Context> {
}
type LoaderFunction<Context = DefaultContext> = {
    (args: LoaderFunctionArgs<Context>, container: Container, handlerCtx?: unknown): DataFunctionReturnValue;
} & {
    hydrate?: boolean;
};
interface ActionFunction<Context = DefaultContext> {
    (args: ActionFunctionArgs<Context>, container: Container, handlerCtx?: unknown): DataFunctionReturnValue;
}
export interface GeckoRouteMetadata extends Omit<RouteObject, 'element' | 'loader' | 'action'> {
    loader?: LoaderFunction | boolean;
    action?: ActionFunction | boolean;
}
export declare class GeckoRouteDecorate extends ClassDecorate<GeckoRouteMetadata> {
}
export declare class GeckoRouterDecorate<T> extends ClassDecorate<T> {
}
export declare class GeckoHashRouterDecorate extends GeckoRouterDecorate<DOMRouterOpts | undefined> {
}
export declare class GeckoBrowserRouterDecorate extends GeckoRouterDecorate<DOMRouterOpts | undefined> {
}
export declare class GeckoMemoryRouterDecorate extends GeckoRouterDecorate<DOMRouterOpts | undefined> {
}
export declare class GeckoFallbackDecorate extends ClassDecorate<ComponentType<any>> {
}
export declare class GeckoErrorBoundaryDecorate extends ClassDecorate<ComponentType<any>> {
}
/**
 * Decorator metadata for react-router route `RouteObject`
 * @param target
 * @constructor
 */
export declare function Route<TFunction extends Function>(target: TFunction): TFunction | void;
export declare function Route(path: string): ClassDecorator;
export declare function Route(route: Omit<GeckoRouteMetadata, 'element'>): ClassDecorator;
/**
 * Decorator metadata for React.Suspense `fallback` element.
 * @param component
 * @constructor
 */
export declare function Fallback(component: ComponentType<any>): ClassDecorator;
/**
 * Decorator metadata react `RouteObject` prop of `ErrorBoundary` element.
 * @param component
 * @constructor
 */
export declare function ErrorBoundary(component: ComponentType<any>): ClassDecorator;
/**
 * Decorator metadata for react-router mode `BrowserRouter`.
 * @param target
 * @constructor
 */
export declare function BrowserRouter<TFunction extends Function>(target: TFunction): TFunction | void;
export declare function BrowserRouter(ops?: DOMRouterOpts): ClassDecorator;
/**
 * Decorator metadata for react-router mode `HashRouter`.
 * @param target
 * @constructor
 */
export declare function HashRouter<TFunction extends Function>(target: TFunction): TFunction | void;
export declare function HashRouter(ops?: DOMRouterOpts): ClassDecorator;
/**
 * Decorator metadata for react-router mode `MemoryRouter`.
 * @param target
 * @constructor
 */
export declare function MemoryRouter<TFunction extends Function>(target: TFunction): TFunction | void;
export declare function MemoryRouter(ops?: DOMRouterOpts): ClassDecorator;
export {};
