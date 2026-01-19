define("@ember/object/proxy", ["exports", "@ember/object/-internals", "@ember/-internals/runtime"], function(_exports, _internals, _runtime) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    /**
    @module @ember/object/proxy
    */

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class ObjectProxy extends _internals.FrameworkObject {}
    ObjectProxy.PrototypeMixin.reopen(_runtime._ProxyMixin);
    var _default = _exports.default = ObjectProxy;
});