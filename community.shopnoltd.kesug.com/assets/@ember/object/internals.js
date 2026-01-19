define("@ember/object/internals", ["exports", "@ember/object/-internals"], function(_exports, _internals) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    Object.defineProperty(_exports, "cacheFor", {
        enumerable: true,
        get: function() {
            return _internals.cacheFor;
        }
    });
    Object.defineProperty(_exports, "guidFor", {
        enumerable: true,
        get: function() {
            return _internals.guidFor;
        }
    });
});