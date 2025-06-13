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

import { ClassDecorate, ClassMirror } from '@geckoai/class-mirror';
import { RouteObject } from 'react-router-dom';
import { ApplyClassDecorators } from '@geckoai/gecko-core';
import { DOMRouterOpts } from 'react-router';
import { ComponentType } from 'react';

export class GeckoRouteDecorate extends ClassDecorate<Omit<RouteObject, 'element'>> {}
export class GeckoRouterDecorate<T> extends ClassDecorate<T> {}
export class GeckoHashRouterDecorate extends GeckoRouterDecorate<DOMRouterOpts | undefined> {}
export class GeckoBrowserRouterDecorate extends GeckoRouterDecorate<DOMRouterOpts | undefined> {}
export class GeckoMemoryRouterDecorate extends GeckoRouterDecorate<DOMRouterOpts | undefined> {}
export class GeckoFallbackDecorate extends ClassDecorate<ComponentType> {}


/**
 * Decorator metadata for react-router route `RouteObject`
 * @param target
 * @constructor
 */
export function Route<TFunction extends Function>(target: TFunction): TFunction | void;
export function Route(path: string): ClassDecorator;
export function Route(route: Omit<RouteObject, 'element'>): ClassDecorator;
export function Route<TFunction extends Function>(arg: Omit<RouteObject, 'element'> | string | TFunction): ClassDecorator | (TFunction | void) {
  switch (typeof arg) {
    case 'function':
      return ClassMirror.createDecorator(new GeckoRouteDecorate(
        { path: '' }
      ))(arg);
    case 'string':
      return ClassMirror.createDecorator(new GeckoRouteDecorate(
        { path: arg }
      ));
    default:
      return ClassMirror.createDecorator(new GeckoRouteDecorate(
        arg
      ));
  }
}

/**
 * Decorator metadata for React.Suspense `fallback` element.
 * @param component
 * @constructor
 */
export function Fallback(component: ComponentType<any>) {
  return ClassMirror.createDecorator(new GeckoFallbackDecorate(component));
}


/**
 * Decorator metadata for react-router mode `BrowserRouter`.
 * @param target
 * @constructor
 */
export function BrowserRouter<TFunction extends Function>(target: TFunction): TFunction | void;
export function BrowserRouter(ops?: DOMRouterOpts): ClassDecorator;
export function BrowserRouter<TFunction extends Function>(ops?: DOMRouterOpts | TFunction): ClassDecorator | (TFunction | void) {
  if (typeof ops === 'function') {
    return ClassMirror.createDecorator(new GeckoBrowserRouterDecorate(undefined))(ops);
  }
  return ApplyClassDecorators(
    ClassMirror.createDecorator(new GeckoBrowserRouterDecorate(ops))
  );
}


/**
 * Decorator metadata for react-router mode `HashRouter`.
 * @param target
 * @constructor
 */
export function HashRouter<TFunction extends Function>(target: TFunction): TFunction | void;
export function HashRouter(ops?: DOMRouterOpts): ClassDecorator;
export function HashRouter<TFunction extends Function>(ops?: DOMRouterOpts | TFunction): ClassDecorator | (TFunction | void) {
  if (typeof ops === 'function') {
    return ClassMirror.createDecorator(new GeckoHashRouterDecorate(undefined))(ops);
  }
  return ApplyClassDecorators(
    ClassMirror.createDecorator(new GeckoHashRouterDecorate(ops))
  );
}


/**
 * Decorator metadata for react-router mode `MemoryRouter`.
 * @param target
 * @constructor
 */
export function MemoryRouter<TFunction extends Function>(target: TFunction): TFunction | void;
export function MemoryRouter(ops?: DOMRouterOpts): ClassDecorator;
export function MemoryRouter<TFunction extends Function>(ops?: DOMRouterOpts | TFunction): ClassDecorator | (TFunction | void) {
  if (typeof ops === 'function') {
    return ClassMirror.createDecorator(new GeckoMemoryRouterDecorate(undefined))(ops);
  }
  return ApplyClassDecorators(
    ClassMirror.createDecorator(new GeckoMemoryRouterDecorate(ops))
  );
}
