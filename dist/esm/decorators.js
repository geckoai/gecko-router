import { ClassDecorate, ClassMirror } from '@geckoai/class-mirror';
import { ApplyClassDecorators, GeckoModule } from '@geckoai/gecko-core';
export class GeckoRouteDecorate extends ClassDecorate {
}
export function GeckoRouteModule(arg, module, scope) {
    return ApplyClassDecorators(ClassMirror.createDecorator(new GeckoRouteDecorate(typeof arg === 'string' ? { path: arg } : arg)), module ? GeckoModule(module, scope) : GeckoModule);
}
