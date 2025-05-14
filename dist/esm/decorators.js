import { ClassDecorate, ClassMirror } from '@geckoai/class-mirror';
import { ApplyClassDecorators, GeckoModule } from '@geckoai/gecko-core';
export class GeckoRouteDecorate extends ClassDecorate {
}
export function GeckoRoute(metadata) {
    return ApplyClassDecorators(ClassMirror.createDecorator(new GeckoRouteDecorate(metadata)));
}
export function GeckoRouteModule(metadata, moduleMetadata, scope) {
    return ApplyClassDecorators(ClassMirror.createDecorator(new GeckoRouteDecorate(metadata)), moduleMetadata ? GeckoModule(moduleMetadata, scope) : GeckoModule);
}
