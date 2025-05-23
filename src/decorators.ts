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

import {ClassDecorate, ClassMirror} from '@geckoai/class-mirror';
import {RouteObject} from 'react-router-dom';
import {ApplyClassDecorators, BindingScope, GeckoModule, GeckoModuleIml} from '@geckoai/gecko-core';

export class GeckoRouteDecorate extends ClassDecorate<Omit<RouteObject, "element">> {
}

export function GeckoRouteModule(path: string, module?: Partial<GeckoModuleIml>, scope?: BindingScope): ClassDecorator;
export function GeckoRouteModule(route: Omit<RouteObject, "element">, module?: Partial<GeckoModuleIml>, scope?: BindingScope): ClassDecorator;
export function GeckoRouteModule(arg: Omit<RouteObject, "element"> | string, module?: Partial<GeckoModuleIml>, scope?: BindingScope): ClassDecorator {
  return ApplyClassDecorators(
    ClassMirror.createDecorator(new GeckoRouteDecorate(
      typeof arg === 'string' ? {path: arg} : arg,
    )),
    module ? GeckoModule(module, scope) : GeckoModule
  );
}