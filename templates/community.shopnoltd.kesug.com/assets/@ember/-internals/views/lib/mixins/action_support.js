define("@ember/-internals/views/lib/mixins/action_support", ["exports", "@ember/-internals/metal", "@ember/object/mixin", "@ember/debug"], function(_exports, _metal, _mixin, _debug) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    /**
     @module ember
    */

    var ActionSupport = _mixin.default.create({
        send(actionName) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }
            (false && !(!this.isDestroying && !this.isDestroyed) && (0, _debug.assert)(`Attempted to call .send() with the action '${actionName}' on the destroyed object '${this}'.`, !this.isDestroying && !this.isDestroyed));
            var action = this.actions && this.actions[actionName];
            if (action) {
                var shouldBubble = action.apply(this, args) === true;
                if (!shouldBubble) {
                    return;
                }
            }
            var target = (0, _metal.get)(this, 'target');
            if (target) {
                (false && !(typeof target.send === 'function') && (0, _debug.assert)(`The \`target\` for ${this} (${target}) does not have a \`send\` method`, typeof target.send === 'function'));
                target.send(...arguments);
            } else {
                (false && !(action) && (0, _debug.assert)(`${(0, _debug.inspect)(this)} had no action handler for: ${actionName}`, action));
            }
        }
    });
    var _default = _exports.default = ActionSupport;
});