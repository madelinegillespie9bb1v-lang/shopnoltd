define("@ember/object/compat", ["exports", "@ember/-internals/metal", "@ember/debug", "@glimmer/validator"], function(_exports, _metal, _debug, _validator) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.dependentKeyCompat = dependentKeyCompat;
    var wrapGetterSetter = function(target, key, desc) {
        var {
            get: originalGet
        } = desc;
        (false && !((0, _metal.descriptorForProperty)(target, key) === undefined) && (0, _debug.assert)('You attempted to use @dependentKeyCompat on a property that already has been decorated with either @computed or @tracked. @dependentKeyCompat is only necessary for native getters that are not decorated with @computed.', (0, _metal.descriptorForProperty)(target, key) === undefined));
        if (originalGet !== undefined) {
            desc.get = function() {
                var propertyTag = (0, _validator.tagFor)(this, key);
                var ret;
                var tag = (0, _validator.track)(() => {
                    ret = originalGet.call(this);
                });
                (0, _validator.updateTag)(propertyTag, tag);
                (0, _validator.consumeTag)(tag);
                return ret;
            };
        }
        return desc;
    };

    function dependentKeyCompat() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        if ((0, _metal.isElementDescriptor)(args)) {
            var [target, key, desc] = args;
            (false && !(desc != null && (typeof desc.get === 'function' || typeof desc.set === 'function')) && (0, _debug.assert)('The @dependentKeyCompat decorator must be applied to getters/setters when used in native classes', desc != null && (typeof desc.get === 'function' || typeof desc.set === 'function')));
            return wrapGetterSetter(target, key, desc);
        } else {
            var _desc2 = args[0];
            (false && !((value => {
                if (value && typeof value === 'object') {
                    var cast = value;
                    return (cast.configurable === undefined || cast.configurable === false || cast.configurable === true) && (cast.enumerable === undefined || cast.enumerable === false || cast.enumerable === true) && (cast.writable === undefined || cast.writable === false || cast.writable === true) && (cast.get === undefined || typeof cast.get === 'function') && (cast.set === undefined || typeof cast.set === 'function');
                }
                return false;
            })(_desc2)) && (0, _debug.assert)('expected valid PropertyDescriptor', (value => {
                if (value && typeof value === 'object') {
                    var cast = value;
                    return (cast.configurable === undefined || cast.configurable === false || cast.configurable === true) && (cast.enumerable === undefined || cast.enumerable === false || cast.enumerable === true) && (cast.writable === undefined || cast.writable === false || cast.writable === true) && (cast.get === undefined || typeof cast.get === 'function') && (cast.set === undefined || typeof cast.set === 'function');
                }
                return false;
            })(_desc2)));
            var decorator = function(target, key, _desc, _meta, isClassicDecorator) {
                (false && !(isClassicDecorator) && (0, _debug.assert)('The @dependentKeyCompat decorator may only be passed a method when used in classic classes. You should decorate getters/setters directly in native classes', isClassicDecorator));
                (false && !(typeof _desc2.get === 'function' || typeof _desc2.set === 'function') && (0, _debug.assert)('The dependentKeyCompat() decorator must be passed a getter or setter when used in classic classes', typeof _desc2.get === 'function' || typeof _desc2.set === 'function'));
                return wrapGetterSetter(target, key, _desc2);
            };
            (0, _metal.setClassicDecorator)(decorator);
            return decorator;
        }
    }
    (0, _metal.setClassicDecorator)(dependentKeyCompat);
});