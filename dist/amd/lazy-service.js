var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@geckoai/gecko-core"], function (require, exports, gecko_core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LazyService = void 0;
    var LazyService = (function () {
        function LazyService() {
            this.vm = gecko_core_1.ViewModel.for(Date.now());
        }
        LazyService = __decorate([
            (0, gecko_core_1.injectable)()
        ], LazyService);
        return LazyService;
    }());
    exports.LazyService = LazyService;
});
