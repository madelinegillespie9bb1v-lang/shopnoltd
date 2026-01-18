define("@ember/-internals/runtime/lib/mixins/comparable", ["exports", "@ember/object/mixin"], function(_exports, _mixin) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var Comparable = _mixin.default.create({
        /**
          __Required.__ You must implement this method to apply this mixin.
             Override to return the result of the comparison of the two parameters. The
          compare method should return:
             - `-1` if `a < b`
          - `0` if `a == b`
          - `1` if `a > b`
             Default implementation raises an exception.
             @method compare
          @param a {Object} the first object to compare
          @param b {Object} the second object to compare
          @return {Number} the result of the comparison
          @private
        */
        compare: null
    });
    var _default = _exports.default = Comparable;
});