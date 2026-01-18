define("@ember/object/evented", ["exports", "@ember/-internals/metal", "@ember/object/mixin"], function(_exports, _metal, _mixin) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    Object.defineProperty(_exports, "on", {
        enumerable: true,
        get: function() {
            return _metal.on;
        }
    });
    var Evented = _mixin.default.create({
        on(name, target, method) {
            (0, _metal.addListener)(this, name, target, method);
            return this;
        },
        one(name, target, method) {
            (0, _metal.addListener)(this, name, target, method, true);
            return this;
        },
        trigger(name) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }
            (0, _metal.sendEvent)(this, name, args);
        },
        off(name, target, method) {
            (0, _metal.removeListener)(this, name, target, method);
            return this;
        },
        has(name) {
            return (0, _metal.hasListeners)(this, name);
        }
    });
    var _default = _exports.default = Evented;
});