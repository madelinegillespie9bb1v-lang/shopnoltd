define("@ember/-internals/runtime/lib/mixins/container_proxy", ["exports", "@ember/runloop", "@ember/object/mixin"], function(_exports, _runloop, _mixin) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var ContainerProxyMixin = _mixin.default.create({
        /**
         The container stores state.
            @private
         @property {Ember.Container} __container__
         */
        __container__: null,
        ownerInjection() {
            return this.__container__.ownerInjection();
        },
        lookup(fullName, options) {
            return this.__container__.lookup(fullName, options);
        },
        destroy() {
            var container = this.__container__;
            if (container) {
                (0, _runloop.join)(() => {
                    container.destroy();
                    (0, _runloop.schedule)('destroy', container, 'finalizeDestroy');
                });
            }
            this._super();
        },
        factoryFor(fullName) {
            return this.__container__.factoryFor(fullName);
        }
    });
    var _default = _exports.default = ContainerProxyMixin;
});