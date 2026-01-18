define("@ember/-internals/views/lib/mixins/view_state_support", ["exports", "@ember/object/mixin"], function(_exports, _mixin) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    /**
    @module ember
    */

    var ViewStateSupport = _mixin.default.create({
        _transitionTo(state) {
            var priorState = this._currentState;
            var currentState = this._currentState = this._states[state];
            this._state = state;
            if (priorState && priorState.exit) {
                priorState.exit(this);
            }
            if (currentState.enter) {
                currentState.enter(this);
            }
        }
    });
    var _default = _exports.default = ViewStateSupport;
});