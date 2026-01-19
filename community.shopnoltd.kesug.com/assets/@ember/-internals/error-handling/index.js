define("@ember/-internals/error-handling/index", ["exports"], function(_exports) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.getDispatchOverride = getDispatchOverride;
    _exports.getOnerror = getOnerror;
    _exports.onErrorTarget = void 0;
    _exports.setDispatchOverride = setDispatchOverride;
    _exports.setOnerror = setOnerror;
    var onerror;
    var onErrorTarget = _exports.onErrorTarget = {
        get onerror() {
            return onerror;
        }
    };
    // Ember.onerror getter
    function getOnerror() {
        return onerror;
    }
    // Ember.onerror setter
    function setOnerror(handler) {
        onerror = handler;
    }
    var dispatchOverride = null;
    // allows testing adapter to override dispatch
    function getDispatchOverride() {
        return dispatchOverride;
    }

    function setDispatchOverride(handler) {
        dispatchOverride = handler;
    }
});