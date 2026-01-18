define("@ember/-internals/runtime/lib/mixins/registry_proxy", ["exports", "@ember/debug", "@ember/object/mixin"], function(_exports, _debug, _mixin) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    /**
    @module ember
    */

    var RegistryProxyMixin = _mixin.default.create({
        __registry__: null,
        resolveRegistration(fullName) {
            (false && !(this.__registry__.isValidFullName(fullName)) && (0, _debug.assert)('fullName must be a proper full name', this.__registry__.isValidFullName(fullName)));
            return this.__registry__.resolve(fullName);
        },
        register: registryAlias('register'),
        unregister: registryAlias('unregister'),
        hasRegistration: registryAlias('has'),
        registeredOption: registryAlias('getOption'),
        registerOptions: registryAlias('options'),
        registeredOptions: registryAlias('getOptions'),
        registerOptionsForType: registryAlias('optionsForType'),
        registeredOptionsForType: registryAlias('getOptionsForType')
    });

    function registryAlias(name) {
        return function() {
            // We need this cast because `Parameters` is deferred so that it is not
            // possible for TS to see it will always produce the right type. However,
            // since `AnyFn` has a rest type, it is allowed. See discussion on [this
            // issue](https://github.com/microsoft/TypeScript/issues/47615).
            return this.__registry__[name](...arguments);
        };
    }
    var _default = _exports.default = RegistryProxyMixin;
});