var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
define(["require", "exports", "./decorators", "./react-router", "./fallback-node", "./lazy-service"], function (require, exports, decorators_1, react_router_1, fallback_node_1, lazy_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(decorators_1, exports);
    __exportStar(react_router_1, exports);
    __exportStar(fallback_node_1, exports);
    __exportStar(lazy_service_1, exports);
});
