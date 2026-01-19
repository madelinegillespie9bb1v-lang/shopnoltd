define("@ember/-internals/browser-environment/index", ["exports"], function(_exports) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.window = _exports.userAgent = _exports.location = _exports.isFirefox = _exports.isChrome = _exports.history = _exports.hasDOM = void 0;
    // check if window exists and actually is the global
    var hasDom = _exports.hasDOM = typeof self === 'object' && self !== null && self.Object === Object && typeof Window !== 'undefined' && self.constructor === Window && typeof document === 'object' && document !== null && self.document === document && typeof location === 'object' && location !== null && self.location === location && typeof history === 'object' && history !== null && self.history === history && typeof navigator === 'object' && navigator !== null && self.navigator === navigator && typeof navigator.userAgent === 'string';
    var window = _exports.window = hasDom ? self : null;
    var location$1 = _exports.location = hasDom ? self.location : null;
    var history$1 = _exports.history = hasDom ? self.history : null;
    var userAgent = _exports.userAgent = hasDom ? self.navigator.userAgent : 'Lynx (textmode)';
    var isChrome = _exports.isChrome = hasDom ? typeof chrome === 'object' && !(typeof opera === 'object') : false;
    var isFirefox = _exports.isFirefox = hasDom ? /Firefox|FxiOS/.test(userAgent) : false;
});