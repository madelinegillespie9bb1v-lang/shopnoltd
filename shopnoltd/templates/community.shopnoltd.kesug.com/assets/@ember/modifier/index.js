define("@ember/modifier/index", ["exports", "@glimmer/runtime", "@glimmer/manager", "@ember/-internals/glimmer"], function(_exports, _runtime, _manager, _glimmer) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    Object.defineProperty(_exports, "capabilities", {
        enumerable: true,
        get: function() {
            return _glimmer.modifierCapabilities;
        }
    });
    _exports.setModifierManager = _exports.on = void 0;
    // SAFETY: at the time of writing, the cast here is from `{}` to `OnModifier`,
    // which makes it strictly safer to use outside this module because it is not
    // usable as "any non-null item", which is what `{}` means, without loss of any
    // information from the type itself.
    var on = _exports.on = _runtime.on;
    // NOTE: this uses assignment to *require* that the `glimmerSetModifierManager`
    // is legally assignable to this type, i.e. that variance is properly upheld.
    var setModifierManager = _exports.setModifierManager = _manager.setModifierManager;
});