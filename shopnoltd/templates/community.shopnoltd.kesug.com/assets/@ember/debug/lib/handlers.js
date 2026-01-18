define("@ember/debug/lib/handlers", ["exports"], function(_exports) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.registerHandler = _exports.invoke = _exports.HANDLERS = void 0;
    var HANDLERS = _exports.HANDLERS = {};
    var registerHandler = _exports.registerHandler = function registerHandler(_type, _callback) {};
    var invoke = () => {};
    _exports.invoke = invoke;
    if (false /* DEBUG */ ) {
        _exports.registerHandler = registerHandler = function registerHandler(type, callback) {
            var nextHandler = HANDLERS[type] || (() => {});
            HANDLERS[type] = (message, options) => {
                callback(message, options, nextHandler);
            };
        };
        _exports.invoke = invoke = function invoke(type, message, test, options) {
            if (test) {
                return;
            }
            var handlerForType = HANDLERS[type];
            if (handlerForType) {
                handlerForType(message, options);
            }
        };
    }
});