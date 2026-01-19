define("@ember/utils/lib/is_blank", ["exports", "@ember/utils/lib/is_empty"], function(_exports, _is_empty) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = isBlank;
    /**
     @module @ember/utils
    */
    /**
      A value is blank if it is empty or a whitespace string.
  
      ```javascript
      import { isBlank } from '@ember/utils';
  
      isBlank(null);            // true
      isBlank(undefined);       // true
      isBlank('');              // true
      isBlank([]);              // true
      isBlank('\n\t');          // true
      isBlank('  ');            // true
      isBlank({});              // false
      isBlank('\n\t Hello');    // false
      isBlank('Hello world');   // false
      isBlank([1,2,3]);         // false
      ```
  
      @method isBlank
      @static
      @for @ember/utils
      @param {Object} obj Value to test
      @return {Boolean}
      @since 1.5.0
      @public
    */
    function isBlank(obj) {
        return (0, _is_empty.default)(obj) || typeof obj === 'string' && /\S/.test(obj) === false;
    }
});