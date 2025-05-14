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

import { Constants, Container, injectable, Newable } from '@geckoai/gecko-core';
import { ClassMirror } from '@geckoai/class-mirror';
import { GeckoRouteDecorate } from './decorators';
import { Outlet, RouteObject } from 'react-router-dom';
import React, { createElement, useContext } from 'react';

const Context = React.createContext<Container | null>(null);

export function useContainer() {
  return useContext(Context);
}

export function useCurrentModule<T = unknown>(target: Newable<T>): T | null {
  return useContainer()?.get(target) || null;
}


@injectable()
export class RouterService {
  public route: RouteObject | null = null;

  public constructor(private container: Container) {
    this.route = RouterService.parse(RouterService.root(container));
  }

  private static parse(container: Container | null): RouteObject | null {
    if (container) {
      const mirror = container.get(ClassMirror);
      const decorates = mirror.getDecorates(GeckoRouteDecorate);
      const route = decorates[0];
      const containers = container.get<Container[]>(Constants.children);
      if (route) {
        const { children = [], Component, ...rest } = route.metadata;
        const concatChildren = children.concat(containers.map(c => RouterService.parse(c) as RouteObject).filter(Boolean));
        const routeObject: RouteObject = {
          ...rest as any,
          element: createElement<any>(Context.Provider, {
            value: container,
            children: Component ? createElement(Component) : createElement(Outlet)
          })
        };
        if (concatChildren.length) {
          routeObject.children = concatChildren;
        }
        return routeObject;
      } else {
        return {
          path: '',
          element: createElement(Context.Provider, {
            value: container,
            children: createElement(Outlet)
          }),
          children: containers.map(c => RouterService.parse(c) as RouteObject).filter(Boolean)
        };
      }
    }
    return null;
  }

  private static parents(container: Container): Container[] {
    if (container.isBound(Constants.parent)) {
      const c = container.get<Container>(Constants.parent);
      return [...RouterService.parents(c), c];
    }
    return [];
  }

  private static root(container: Container): Container | null {
    return RouterService.parents(container)[0] || null;
  }
}