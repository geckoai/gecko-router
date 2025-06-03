define(["require", "exports", "react"], function (require, exports, react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FallbackNode = void 0;
    function FallbackNode() {
        return (0, react_1.createElement)("div", {
            children: 'loading...'
        });
    }
    exports.FallbackNode = FallbackNode;
});
