import { ClassDecorate, ClassMirror } from '@geckoai/class-mirror';
import { ApplyClassDecorators } from '@geckoai/gecko-core';
export class GeckoRouteDecorate extends ClassDecorate {
}
export class GeckoRouterDecorate extends ClassDecorate {
}
export class GeckoHashRouterDecorate extends GeckoRouterDecorate {
}
export class GeckoBrowserRouterDecorate extends GeckoRouterDecorate {
}
export class GeckoMemoryRouterDecorate extends GeckoRouterDecorate {
}
export class GeckoFallbackDecorate extends ClassDecorate {
}
export function Route(arg) {
    switch (typeof arg) {
        case 'function':
            return ClassMirror.createDecorator(new GeckoRouteDecorate({ path: '' }))(arg);
        case 'string':
            return ClassMirror.createDecorator(new GeckoRouteDecorate({ path: arg }));
        default:
            return ClassMirror.createDecorator(new GeckoRouteDecorate(arg));
    }
}
export function Fallback(component) {
    return ClassMirror.createDecorator(new GeckoFallbackDecorate(component));
}
export function BrowserRouter(ops) {
    if (typeof ops === 'function') {
        return ClassMirror.createDecorator(new GeckoBrowserRouterDecorate(undefined))(ops);
    }
    return ApplyClassDecorators(ClassMirror.createDecorator(new GeckoBrowserRouterDecorate(ops)));
}
export function HashRouter(ops) {
    if (typeof ops === 'function') {
        return ClassMirror.createDecorator(new GeckoHashRouterDecorate(undefined))(ops);
    }
    return ApplyClassDecorators(ClassMirror.createDecorator(new GeckoHashRouterDecorate(ops)));
}
export function MemoryRouter(ops) {
    if (typeof ops === 'function') {
        return ClassMirror.createDecorator(new GeckoMemoryRouterDecorate(undefined))(ops);
    }
    return ApplyClassDecorators(ClassMirror.createDecorator(new GeckoMemoryRouterDecorate(ops)));
}
