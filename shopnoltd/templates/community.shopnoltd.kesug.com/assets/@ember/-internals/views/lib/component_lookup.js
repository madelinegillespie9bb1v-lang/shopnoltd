define("@ember/-internals/views/lib/component_lookup", ["exports", "@ember/object"], function(_exports, _object) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = _object.default.extend({
        componentFor(name, owner) {
            var fullName = `component:${name}`;
            return owner.factoryFor(fullName);
        },
        layoutFor(name, owner, options) {
            var templateFullName = `template:components/${name}`;
            return owner.lookup(templateFullName, options);
        }
    });
});