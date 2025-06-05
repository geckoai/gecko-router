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

import { Constants, Container, GeckoModule, Newable } from '@geckoai/gecko-core';
import { ClassMirror } from '@geckoai/class-mirror';
import {
  GeckoBrowserRouterDecorate, GeckoFallbackDecorate,
  GeckoHashRouterDecorate,
  GeckoLazyTaskDecorate,
  GeckoMemoryRouterDecorate,
  GeckoRouteDecorate,
  GeckoRouterDecorate
} from './decorators';
import { createBrowserRouter, createHashRouter, createMemoryRouter, Outlet, RouteObject } from 'react-router-dom';
import { createContext, createElement, lazy, Suspense, useContext } from 'react';
import { FallbackNode } from './fallback-node';
import { LazyService } from './lazy-service';
import {ServiceIdentifier} from "inversify";
import {OptionalGetOptions} from "@inversifyjs/core";

const Context = createContext<Container>(new Container());

export function useContainer() {
  return useContext(Context);
}

export function useService<T>(serviceIdentifier: ServiceIdentifier<any>, opts?: OptionalGetOptions): T {
  return useContext(Context).get<T>(serviceIdentifier, opts);
}

@GeckoModule
export class ReactRouter {
  public static routes = Symbol.for('provider');
  public static options = Symbol.for('options');
  public static Router = Symbol.for('Router');

  constructor(private container: Container) {
    const mirror = container.get(ClassMirror);
    const decorates = mirror.getDecorates(GeckoRouterDecorate);
    const decorate = decorates[0];

    const containers = container.get<Container[]>(Constants.children);
    const routes = ReactRouter.getRoutes(containers);
    const parent = container.get<Container | undefined>(Constants.parent);
    parent?.bind(ReactRouter.routes).toConstantValue(routes);
    parent?.bind(ReactRouter.options).toConstantValue(decorate?.metadata);

    if (decorate instanceof GeckoBrowserRouterDecorate) {
      const router = createBrowserRouter(
        routes, decorate.metadata
      );
      parent?.bind(ReactRouter.Router).toConstantValue(router);
    }

    if (decorate instanceof GeckoHashRouterDecorate) {
      const router = createHashRouter(
        routes, decorate.metadata
      );
      parent?.bind(ReactRouter.Router).toConstantValue(router);
    }

    if (decorate instanceof GeckoMemoryRouterDecorate) {
      const router = createMemoryRouter(
        routes, decorate.metadata
      );
      parent?.bind(ReactRouter.Router).toConstantValue(router);
    }
  }

  private static getRoutes(containers: Container[] = []): RouteObject[] {
    return containers.map(container => {
      const childrenContainers = container.get<Container[]>(Constants.children);
      const mirror = container.get(ClassMirror);
      const routes = mirror.getDecorates(GeckoRouteDecorate);
      const tasks = mirror.getDecorates(GeckoLazyTaskDecorate);
      container.bind(LazyService).to(LazyService).inSingletonScope()
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
          const [Fallback] = mirror.getDecorates(GeckoFallbackDecorate);

          const laze = () => {
            const {vm} = container.get<LazyService>(LazyService);
            const [key] = vm.asState();
            return createElement(Suspense, {
              fallback: Fallback ? createElement(Fallback.metadata) : createElement(FallbackNode),
              children: createElement(lazy(async () => {
                await Promise.all(tasks.map(x => x.metadata(container)));
                return { default: Component ?? Outlet };
              }), {key})
            });
          }

          element = createElement(Context.Provider, {
            value: container,
            children: createElement(laze)
          });
        }

        return {
          ...rest,
          element,
          children: list.length > 0 ? list : undefined
        } as RouteObject;
      }
      return null;
    }).filter<RouteObject>(Boolean as any);
  }
}