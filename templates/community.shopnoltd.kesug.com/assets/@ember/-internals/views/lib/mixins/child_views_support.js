define("@ember/-internals/views/lib/mixins/child_views_support", ["exports", "@ember/-internals/metal", "@ember/object/mixin", "@ember/-internals/views/lib/system/utils"], function(_exports, _metal, _mixin, _utils) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var ChildViewsSupport = _mixin.default.create({
        /**
          Array of child views. You should never edit this array directly.
             @property childViews
          @type Array
          @default []
          @private
        */
        childViews: (0, _metal.nativeDescDecorator)({
            configurable: false,
            enumerable: false,
            get() {
                return (0, _utils.getChildViews)(this);
            }
        }),
        appendChild(view) {
            (0, _utils.addChildView)(this, view);
        }
    });
    var _default = _exports.default = ChildViewsSupport;
});