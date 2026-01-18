define("@ember/object/promise-proxy-mixin", ["exports", "@ember/object", "@ember/object/mixin"], function(_exports, _object, _mixin) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    /**
      @module @ember/object/promise-proxy-mixin
    */
    function tap(proxy, promise) {
        (0, _object.setProperties)(proxy, {
            isFulfilled: false,
            isRejected: false
        });
        return promise.then(value => {
            if (!proxy.isDestroyed && !proxy.isDestroying) {
                (0, _object.setProperties)(proxy, {
                    content: value,
                    isFulfilled: true
                });
            }
            return value;
        }, reason => {
            if (!proxy.isDestroyed && !proxy.isDestroying) {
                (0, _object.setProperties)(proxy, {
                    reason,
                    isRejected: true
                });
            }
            throw reason;
        }, 'Ember: PromiseProxy');
    }
    var PromiseProxyMixin = _mixin.default.create({
        reason: null,
        isPending: (0, _object.computed)('isSettled', function() {
            return !(0, _object.get)(this, 'isSettled');
        }).readOnly(),
        isSettled: (0, _object.computed)('isRejected', 'isFulfilled', function() {
            return (0, _object.get)(this, 'isRejected') || (0, _object.get)(this, 'isFulfilled');
        }).readOnly(),
        isRejected: false,
        isFulfilled: false,
        promise: (0, _object.computed)({
            get() {
                throw new Error("PromiseProxy's promise must be set");
            },
            set(_key, promise) {
                return tap(this, promise);
            }
        }),
        then: promiseAlias('then'),
        catch: promiseAlias('catch'),
        finally: promiseAlias('finally')
    });

    function promiseAlias(name) {
        return function() {
            var promise = (0, _object.get)(this, 'promise');
            // We need this cast because `Parameters` is deferred so that it is not
            // possible for TS to see it will always produce the right type. However,
            // since `AnyFn` has a rest type, it is allowed. See discussion on [this
            // issue](https://github.com/microsoft/TypeScript/issues/47615).
            return promise[name](...arguments);
        };
    }
    var _default = _exports.default = PromiseProxyMixin;
});