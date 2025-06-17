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

import {ConstantValueProvider, Module} from '@geckoai/gecko-core';
import {RouterService, useContainer} from './router-service';
import React, {ComponentType, createElement} from "react";


/**
 * `ReactRouter` module
 */
@Module({
  providers: [RouterService],
  exports: [RouterService],
})
export class ReactRouter {
  /**
   * @deprecated
   * Please use
   * ServiceIdentifier for route middle elements.
   */
  public static middleElements = Symbol.for("middleElements");

  /**
   * ServiceIdentifier for route middle elements.
   */
  public static middleElement = Symbol.for("middleElement");

  /**
   * ServiceIdentifier for `ErrorBoundary` element.
   */
  public static ErrorBoundary = Symbol.for("ErrorBoundary");

  /**
   * ServiceIdentifier for `Fallback` element.
   */
  public static Fallback = Symbol.for("Fallback");

  /**
   * ServiceIdentifier current
   */
  public static Route = Symbol.for("Route");

  /**
   * Provide `ErrorBoundary` Element
   * @param ErrorBoundary
   * @constructor
   */
  public static ProvideErrorBoundary(ErrorBoundary: ComponentType) {
    return ConstantValueProvider.create(ReactRouter.ErrorBoundary, ErrorBoundary)
  }

  /**
   * Provide `Fallback` Element
   * @param Fallback
   * @constructor
   */
  public static ProvideFallback(Fallback: ComponentType) {
    return ConstantValueProvider.create(ReactRouter.Fallback, Fallback)
  }

  /**
   * Create a lazy component.
   * The method `lazy` included `React.Suspense`, You don't need to use it.
   * @param load
   */
  public static lazy(
    load: () => Promise<{ default: ComponentType<any> }>,
  ): ComponentType<any> {
    return (() => {
      return createElement(() => {
        const container = useContainer();
        const isBoundFallback = container.isBound(ReactRouter.Fallback);
        return createElement(React.Suspense, {
          fallback: isBoundFallback ? createElement(container.get(ReactRouter.Fallback)) : createElement('div', {
            children: "Loading..."
          }),
          children: createElement(React.lazy(load))
        })
      })
    }) as ComponentType<any>;
  }
}