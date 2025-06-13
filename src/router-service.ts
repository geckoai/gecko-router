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


import {ClassMirror} from "@geckoai/class-mirror";
import {Constants, Container, injectable} from "@geckoai/gecko-core";
import {
  createContext,
  createElement,
  FC,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useRef
} from "react";
import type {OptionalGetOptions, ServiceIdentifier} from 'inversify';
import {createBrowserRouter, createHashRouter, Outlet, RouteObject} from "react-router-dom";
import {
  GeckoBrowserRouterDecorate, GeckoErrorBoundaryDecorate, GeckoFallbackDecorate,
  GeckoHashRouterDecorate,
  GeckoMemoryRouterDecorate,
  GeckoRouteDecorate,
  GeckoRouterDecorate
} from "./decorators";
import {RouteModuleLifeCycle} from "./route-module-life-cycle";
import {ReactRouter} from "./react-router";

const Context = createContext<Container>(new Container());

export function useContainer() {
  return useContext(Context);
}

export function useService<T>(serviceIdentifier: ServiceIdentifier<any>, opts?: OptionalGetOptions): T {
  const ref = useRef<T | null>(null);

  try {
    ref.current = useContext(Context).get<T>(serviceIdentifier, opts)
  } catch (e) {
    if (ref.current && process.env.NODE_ENV === 'development') {
      window.location.reload();
    } else {
      throw e
    }
  }

  if (ref.current === null) {
    throw new Error("No service identifier provided");
  }

  return ref.current;


}

@injectable()
export class RouterService {
  constructor(private container: Container) { }

  private static middleElements(container: Container) {
    try {
      return container.get<FC<PropsWithChildren>[]>(ReactRouter.middleElements);
    } catch {
      return []
    }
  }

  private static toElement(elements: FC<PropsWithChildren>[], children: ReactNode) {
    return elements.reverse().reduce((c, a) => {
      return createElement(a, {children: c})
    }, children)
  }

  private static getRoutes(containers: Container[] = []): RouteObject[] {
    return containers.map(container => {
      const childrenContainers = container.get<Container[]>(Constants.children);
      const mirror = container.get(ClassMirror);
      const routes = mirror.getDecorates(GeckoRouteDecorate);
      const fallbacks = mirror.getDecorates(GeckoFallbackDecorate);
      const errorBoundarys = mirror.getDecorates(GeckoErrorBoundaryDecorate);

      if (!container.isBound(ReactRouter.ErrorBoundary) && errorBoundarys[0]) {
        container.bind(ReactRouter.ErrorBoundary).toConstantValue(errorBoundarys[0].metadata)
      }

      if (!container.isBound(ReactRouter.ErrorBoundary) && fallbacks[0]) {
        container.bind(ReactRouter.Fallback).toConstantValue(fallbacks[0].metadata)
      }

      if (routes && routes.length > 1) {
        console.warn('There are multiple @Route decorators, and only the latest one will be selected for execution during runtime.');
      }
      const [RouteDecorate] = routes;
      if (RouteDecorate?.metadata) {
        const {children, Component, ErrorBoundary, ...rest} = RouteDecorate.metadata;
        const list = children ? children.concat(this.getRoutes(childrenContainers)) : this.getRoutes(childrenContainers);
        const current = container.get<RouteModuleLifeCycle>(Constants.instance);
        current?.onInit?.();

        return {
          ...rest,
          ErrorBoundary: ErrorBoundary ?? (container.isBound(ReactRouter.ErrorBoundary) ? container.get(ReactRouter.ErrorBoundary) : undefined),
          element: createElement((() => {
            useEffect(() => {
              current?.onMount?.();
              return () => current.onUnmount()
            }, [])
            return createElement(Context.Provider, {
              value: container,
              children: this.toElement(RouterService.middleElements(container), Component ? createElement(Component) : createElement(Outlet))
            })
          }) as any),
          children: list.length > 0 ? list : undefined
        } as RouteObject;
      }
      return null;
    }).filter<RouteObject>(Boolean as any);
  }
  public getRouter() {
    const {container} = this;
    const mirror = container.get(ClassMirror);
    const decorates = mirror.getDecorates(GeckoRouterDecorate);
    const decorate = decorates[0];
    const containers = container.get<Container[]>(Constants.children);
    if (decorate instanceof GeckoBrowserRouterDecorate) {
      return createBrowserRouter(RouterService.getRoutes(containers), decorate.metadata)
    }
    if (decorate instanceof GeckoHashRouterDecorate) {
      return createHashRouter(
        RouterService.getRoutes(containers), decorate.metadata
      )
    }
    if (decorate instanceof GeckoMemoryRouterDecorate) {
      return createHashRouter(
        RouterService.getRoutes(containers), decorate.metadata
      )
    }
  }
}