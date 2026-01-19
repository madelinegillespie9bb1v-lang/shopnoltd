define("@ember/object/-internals", ["exports", "@ember/-internals/metal", "@ember/-internals/utils", "@ember/debug", "@ember/object"], function(_exports, _metal, _utils, _debug, _object) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.FrameworkObject = void 0;
    Object.defineProperty(_exports, "cacheFor", {
        enumerable: true,
        get: function() {
            return _metal.getCachedValueFor;
        }
    });
    Object.defineProperty(_exports, "guidFor", {
        enumerable: true,
        get: function() {
            return _utils.guidFor;
        }
    });
    var _a;
    var FrameworkObject = _exports.FrameworkObject = class FrameworkObject extends _object.default {};
    if (false /* DEBUG */ ) {
        var INIT_WAS_CALLED = Symbol('INIT_WAS_CALLED');
        var ASSERT_INIT_WAS_CALLED = (0, _utils.symbol)('ASSERT_INIT_WAS_CALLED');
        _exports.FrameworkObject = FrameworkObject = class DebugFrameworkObject extends _object.default {
            constructor() {
                super(...arguments);
                this[_a] = false;
            }
            init(properties) {
                    super.init(properties);
                    this[INIT_WAS_CALLED] = true;
                }
                [(_a = INIT_WAS_CALLED, ASSERT_INIT_WAS_CALLED)]() {
                    (false && !(this[INIT_WAS_CALLED]) && (0, _debug.assert)(`You must call \`super.init(...arguments);\` or \`this._super(...arguments)\` when overriding \`init\` on a framework object. Please update ${this} to call \`super.init(...arguments);\` from \`init\` when using native classes or \`this._super(...arguments)\` when using \`EmberObject.extend()\`.`, this[INIT_WAS_CALLED]));
                }
        };
        (0, _metal.addListener)(FrameworkObject.prototype, 'init', null, ASSERT_INIT_WAS_CALLED);
    }
});