define("@ember/-internals/views/lib/views/core_view", ["exports", "@ember/-internals/metal", "@ember/-internals/runtime", "@ember/object/evented", "@ember/object/-internals", "@ember/-internals/views/lib/views/states"], function(_exports, _metal, _runtime, _evented, _internals, _states) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var __decorate = void 0 && (void 0).__decorate || function(decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    class CoreView extends _internals.FrameworkObject.extend(_evented.default, _runtime.ActionHandler) {
        constructor() {
            super(...arguments);
            this.isView = true;
        }
        init(properties) {
            super.init(properties);
            // Handle methods from Evented
            // The native class inheritance will not work for mixins. To work around this,
            // we copy the existing trigger and has methods provided by the mixin and swap in the
            // new ones from our class.
            this._superTrigger = this.trigger;
            this.trigger = this._trigger;
            this._superHas = this.has;
            this.has = this._has;
            this.parentView ? ? = null;
            this._state = 'preRender';
            this._currentState = this._states.preRender;
        }
        instrumentDetails(hash) {
            hash['object'] = this.toString();
            hash['containerKey'] = this._debugContainerKey;
            hash['view'] = this;
            return hash;
        }
        /**
          Override the default event firing from `Evented` to
          also call methods with the given name.
             @method trigger
          @param name {String}
          @private
        */
        // Changed to `trigger` on init
        _trigger(name) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }
            this._superTrigger(name, ...args);
            var method = this[name];
            if (typeof method === 'function') {
                return method.apply(this, args);
            }
        }
        // Changed to `has` on init
        _has(name) {
            return typeof this[name] === 'function' || this._superHas(name);
        }
    }
    CoreView.isViewFactory = true;
    __decorate([(0, _metal.inject)('renderer', '-dom')], CoreView.prototype, "renderer", void 0);
    // Declare on the prototype to have a single shared value.
    CoreView.prototype._states = _states.default;
    var _default = _exports.default = CoreView;
});