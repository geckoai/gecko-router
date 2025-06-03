var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { injectable } from '@geckoai/gecko-core';
import { Subject } from 'rxjs';
import { useEffect, useState } from 'react';
var LazyService = (function () {
    function LazyService() {
        var _this = this;
        this.current = Date.now();
        this._vm = new Subject();
        this._vm.next(this.current);
        this._vm.subscribe(function (v) {
            _this.current = v;
        });
    }
    LazyService.prototype.next = function () {
        this._vm.next(Date.now());
    };
    LazyService.prototype.asState = function () {
        var _this = this;
        var _a = useState(this.current), state = _a[0], setState = _a[1];
        useEffect(function () {
            var subscribe = _this._vm.subscribe(setState);
            return function () { return subscribe.unsubscribe(); };
        }, [state, setState]);
        return [state, function (v) { return _this._vm.next(v); }];
    };
    LazyService = __decorate([
        injectable(),
        __metadata("design:paramtypes", [])
    ], LazyService);
    return LazyService;
}());
export { LazyService };
