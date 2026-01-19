define("@ember/utils/lib/is_none", ["exports"], function(_exports) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = isNone;
    /**
     @module @ember/utils
    */
    /**
      Returns true if the passed value is null or undefined. This avoids errors
      from JSLint complaining about use of ==, which can be technically
      confusing.
  
      ```javascript
      isNone(null);          // true
      isNone(undefined);     // true
      isNone('');            // false
      isNone([]);            // false
      isNone(function() {}); // false
      ```
  
      @method isNone
      @static
      @for @ember/utils
      @param {Object} obj Value to test
      @return {Boolean}
      @public
    */
    function isNone(obj) {
        return obj === null || obj === undefined;
    }
});