define("@ember/array/-internals", ["exports", "@glimmer/util"], function(_exports, _util) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.isEmberArray = isEmberArray;
    _exports.setEmberArray = setEmberArray;
    var EMBER_ARRAYS = new _util._WeakSet();

    function setEmberArray(obj) {
        EMBER_ARRAYS.add(obj);
    }

    function isEmberArray(obj) {
        return EMBER_ARRAYS.has(obj);
    }
});