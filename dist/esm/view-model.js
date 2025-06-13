var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Subject } from 'rxjs';
import { useEffect, useState } from "react";
var ViewModel = (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.asState = _this.asState.bind(_this);
        _this.next = _this.next.bind(_this);
        _this.next(value);
        return _this;
    }
    ViewModel.prototype.next = function (value) {
        this.value = value;
        _super.prototype.next.call(this, value);
    };
    ViewModel.prototype.asState = function () {
        var _this = this;
        var _a = useState(this.value), state = _a[0], setState = _a[1];
        useEffect(function () {
            var subscribe = _this.subscribe(setState);
            return function () { return subscribe.unsubscribe(); };
        }, [state, setState]);
        return [state, function (callback) {
                if (typeof callback === 'function') {
                    _this.next(callback(_this.value));
                }
                else {
                    _this.next(callback);
                }
            }];
    };
    ViewModel.for = function (value) {
        return new ViewModel(value);
    };
    return ViewModel;
}(Subject));
export { ViewModel };
