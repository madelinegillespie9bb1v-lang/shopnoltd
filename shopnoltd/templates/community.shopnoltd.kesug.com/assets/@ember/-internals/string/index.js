define("@ember/-internals/string/index", ["exports", "@ember/-internals/utils"], function(_exports, _utils) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.classify = classify;
    _exports.dasherize = dasherize;
    /*
      This module exists to separate the @ember/string methods used
      internally in ember-source, from those public methods that are
      now deprecated and to be removed.
    */

    var STRING_DASHERIZE_REGEXP = /[ _]/g;
    var STRING_DASHERIZE_CACHE = new _utils.Cache(1000, key => decamelize(key).replace(STRING_DASHERIZE_REGEXP, '-'));
    var STRING_CLASSIFY_REGEXP_1 = /^(-|_)+(.)?/;
    var STRING_CLASSIFY_REGEXP_2 = /(.)(-|_|\.|\s)+(.)?/g;
    var STRING_CLASSIFY_REGEXP_3 = /(^|\/|\.)([a-z])/g;
    var CLASSIFY_CACHE = new _utils.Cache(1000, str => {
        var replace1 = (_match, _separator, chr) => chr ? `_${chr.toUpperCase()}` : '';
        var replace2 = (_match, initialChar, _separator, chr) => initialChar + (chr ? chr.toUpperCase() : '');
        var parts = str.split('/');
        for (var i = 0; i < parts.length; i++) {
            parts[i] = parts[i].replace(STRING_CLASSIFY_REGEXP_1, replace1).replace(STRING_CLASSIFY_REGEXP_2, replace2);
        }
        return parts.join('/').replace(STRING_CLASSIFY_REGEXP_3, (match /*, separator, chr */ ) => match.toUpperCase());
    });
    var STRING_DECAMELIZE_REGEXP = /([a-z\d])([A-Z])/g;
    var DECAMELIZE_CACHE = new _utils.Cache(1000, str => str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase());
    /**
     Defines string helper methods used internally in ember-source.
  
     @class String
     @private
     */
    /**
     Replaces underscores, spaces, or camelCase with dashes.
  
     ```javascript
     import { dasherize } from '@ember/-internals/string';
  
     dasherize('innerHTML');                // 'inner-html'
     dasherize('action_name');              // 'action-name'
     dasherize('css-class-name');           // 'css-class-name'
     dasherize('my favorite items');        // 'my-favorite-items'
     dasherize('privateDocs/ownerInvoice';  // 'private-docs/owner-invoice'
     ```
  
     @method dasherize
     @param {String} str The string to dasherize.
     @return {String} the dasherized string.
     @private
     */
    function dasherize(str) {
        return STRING_DASHERIZE_CACHE.get(str);
    }
    /**
     Returns the UpperCamelCase form of a string.
  
     ```javascript
     import { classify } from '@ember/string';
  
     classify('innerHTML');                   // 'InnerHTML'
     classify('action_name');                 // 'ActionName'
     classify('css-class-name');              // 'CssClassName'
     classify('my favorite items');           // 'MyFavoriteItems'
     classify('private-docs/owner-invoice');  // 'PrivateDocs/OwnerInvoice'
     ```
  
     @method classify
     @param {String} str the string to classify
     @return {String} the classified string
     @private
     */
    function classify(str) {
        return CLASSIFY_CACHE.get(str);
    }
    /**
     Converts a camelized string into all lower case separated by underscores.
  
     ```javascript
     decamelize('innerHTML');          // 'inner_html'
     decamelize('action_name');        // 'action_name'
     decamelize('css-class-name');     // 'css-class-name'
     decamelize('my favorite items');  // 'my favorite items'
     ```
     */
    function decamelize(str) {
        return DECAMELIZE_CACHE.get(str);
    }
});