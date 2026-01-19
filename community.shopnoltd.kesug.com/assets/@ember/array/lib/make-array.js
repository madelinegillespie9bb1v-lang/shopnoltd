define("@ember/array/lib/make-array", ["exports"], function(_exports) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var {
        isArray
    } = Array;

    function makeArray(obj) {
        if (obj === null || obj === undefined) {
            return [];
        }
        return isArray(obj) ? obj : [obj];
    }
    var _default = _exports.default = makeArray;
});