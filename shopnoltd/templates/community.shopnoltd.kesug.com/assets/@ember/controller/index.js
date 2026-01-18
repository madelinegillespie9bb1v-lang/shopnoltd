define("@ember/controller/index", ["exports", "@ember/-internals/owner", "@ember/object", "@ember/object/-internals", "@ember/-internals/metal", "@ember/object/mixin", "@ember/-internals/runtime", "@ember/-internals/utils"], function(_exports, _owner, _object, _internals, _metal, _mixin, _runtime, _utils) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = _exports.ControllerMixin = void 0;
    _exports.inject = inject;
    // This is imported from -internals to avoid circularity

    var MODEL = (0, _utils.symbol)('MODEL');
    var ControllerMixin = _exports.ControllerMixin = _mixin.default.create(_runtime.ActionHandler, {
        /* ducktype as a controller */
        isController: true,
        concatenatedProperties: ['queryParams'],
        target: null,
        store: null,
        init() {
            this._super(...arguments);
            var owner = (0, _owner.getOwner)(this);
            if (owner) {
                this.namespace = owner.lookup('application:main');
                this.target = owner.lookup('router:main');
            }
        },
        model: (0, _object.computed)({
            get() {
                return this[MODEL];
            },
            set(_key, value) {
                return this[MODEL] = value;
            }
        }),
        queryParams: null,
        /**
         This property is updated to various different callback functions depending on
         the current "state" of the backing route. It is used by
         `Controller.prototype._qpChanged`.
            The methods backing each state can be found in the `Route.prototype._qp` computed
         property return value (the `.states` property). The current values are listed here for
         the sanity of future travelers:
            * `inactive` - This state is used when this controller instance is not part of the active
           route hierarchy. Set in `Route.prototype._reset` (a `router.js` microlib hook) and
           `Route.prototype.actions.finalizeQueryParamChange`.
         * `active` - This state is used when this controller instance is part of the active
           route hierarchy. Set in `Route.prototype.actions.finalizeQueryParamChange`.
         * `allowOverrides` - This state is used in `Route.prototype.setup` (`route.js` microlib hook).
             @method _qpDelegate
          @private
        */
        _qpDelegate: null,
        /**
         During `Route#setup` observers are created to invoke this method
         when any of the query params declared in `Controller#queryParams` property
         are changed.
            When invoked this method uses the currently active query param update delegate
         (see `Controller.prototype._qpDelegate` for details) and invokes it with
         the QP key/value being changed.
             @method _qpChanged
          @private
        */
        _qpChanged(controller, _prop) {
            var dotIndex = _prop.indexOf('.[]');
            var prop = dotIndex === -1 ? _prop : _prop.slice(0, dotIndex);
            var delegate = controller._qpDelegate;
            var value = (0, _object.get)(controller, prop);
            delegate(prop, value);
        }
    });
    class Controller extends _internals.FrameworkObject.extend(ControllerMixin) {}
    _exports.default = Controller;

    function inject() {
        for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
            args[_key2] = arguments[_key2];
        }
        return (0, _metal.inject)('controller', ...args);
    }
});