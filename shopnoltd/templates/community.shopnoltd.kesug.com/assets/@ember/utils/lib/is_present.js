define("@ember/utils/lib/is_present", ["exports", "@ember/utils/lib/is_blank"], function(_exports, _is_blank) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = isPresent;
    /**
     @module @ember/utils
    */
    /**
      A value is present if it not `isBlank`.
  
      ```javascript
      isPresent(null);            // false
      isPresent(undefined);       // false
      isPresent('');              // false
      isPresent('  ');            // false
      isPresent('\n\t');          // false
      isPresent([]);              // false
      isPresent({ length: 0 });   // false
      isPresent(false);           // true
      isPresent(true);            // true
      isPresent('string');        // true
      isPresent(0);               // true
      isPresent(function() {});   // true
      isPresent({});              // true
      isPresent('\n\t Hello');    // true
      isPresent([1, 2, 3]);       // true
      ```
  
      @method isPresent
      @static
      @for @ember/utils
      @param {Object} obj Value to test
      @return {Boolean}
      @since 1.8.0
      @public
    */
    function isPresent(obj) {
        return !(0, _is_blank.default)(obj);
    }
});