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
let LazyService = class LazyService {
    current = Date.now();
    _vm = new Subject();
    constructor() {
        this._vm.next(this.current);
        this._vm.subscribe((v) => {
            this.current = v;
        });
    }
    next() {
        this._vm.next(Date.now());
    }
    asState() {
        const [state, setState] = useState(this.current);
        useEffect(() => {
            const subscribe = this._vm.subscribe(setState);
            return () => subscribe.unsubscribe();
        }, [state, setState]);
        return [state, (v) => this._vm.next(v)];
    }
};
LazyService = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], LazyService);
export { LazyService };
