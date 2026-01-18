define("@ember/object/observable", ["exports", "@ember/-internals/meta", "@ember/-internals/metal", "@ember/object", "@ember/object/mixin", "@ember/debug"], function(_exports, _meta, _metal, _object, _mixin, _debug) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    /**
    @module @ember/object/observable
    */

    var Observable = _mixin.default.create({
        get(keyName) {
            return (0, _object.get)(this, keyName);
        },
        getProperties() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            return (0, _object.getProperties)(this, ...args);
        },
        set(keyName, value) {
            return (0, _object.set)(this, keyName, value);
        },
        setProperties(hash) {
            return (0, _object.setProperties)(this, hash);
        },
        /**
          Begins a grouping of property changes.
             You can use this method to group property changes so that notifications
          will not be sent until the changes are finished. If you plan to make a
          large number of changes to an object at one time, you should call this
          method at the beginning of the changes to begin deferring change
          notifications. When you are done making changes, call
          `endPropertyChanges()` to deliver the deferred change notifications and end
          deferring.
             @method beginPropertyChanges
          @return {Observable}
          @private
        */
        beginPropertyChanges() {
            (0, _metal.beginPropertyChanges)();
            return this;
        },
        /**
          Ends a grouping of property changes.
             You can use this method to group property changes so that notifications
          will not be sent until the changes are finished. If you plan to make a
          large number of changes to an object at one time, you should call
          `beginPropertyChanges()` at the beginning of the changes to defer change
          notifications. When you are done making changes, call this method to
          deliver the deferred change notifications and end deferring.
             @method endPropertyChanges
          @return {Observable}
          @private
        */
        endPropertyChanges() {
            (0, _metal.endPropertyChanges)();
            return this;
        },
        notifyPropertyChange(keyName) {
            (0, _metal.notifyPropertyChange)(this, keyName);
            return this;
        },
        addObserver(key, target, method, sync) {
            (0, _metal.addObserver)(this, key, target, method, sync);
            return this;
        },
        removeObserver(key, target, method, sync) {
            (0, _metal.removeObserver)(this, key, target, method, sync);
            return this;
        },
        /**
          Returns `true` if the object currently has observers registered for a
          particular key. You can use this method to potentially defer performing
          an expensive action until someone begins observing a particular property
          on the object.
             @method hasObserverFor
          @param {String} key Key to check
          @return {Boolean}
          @private
        */
        hasObserverFor(key) {
            return (0, _metal.hasListeners)(this, `${key}:change`);
        },
        incrementProperty(keyName, increment) {
            if (increment === void 0) {
                increment = 1;
            }
            (false && !(!isNaN(parseFloat(String(increment))) && isFinite(increment)) && (0, _debug.assert)('Must pass a numeric value to incrementProperty', !isNaN(parseFloat(String(increment))) && isFinite(increment)));
            return (0, _object.set)(this, keyName, (parseFloat((0, _object.get)(this, keyName)) || 0) + increment);
        },
        decrementProperty(keyName, decrement) {
            if (decrement === void 0) {
                decrement = 1;
            }
            (false && !((typeof decrement === 'number' || !isNaN(parseFloat(decrement))) && isFinite(decrement)) && (0, _debug.assert)('Must pass a numeric value to decrementProperty', (typeof decrement === 'number' || !isNaN(parseFloat(decrement))) && isFinite(decrement)));
            return (0, _object.set)(this, keyName, ((0, _object.get)(this, keyName) || 0) - decrement);
        },
        toggleProperty(keyName) {
            return (0, _object.set)(this, keyName, !(0, _object.get)(this, keyName));
        },
        cacheFor(keyName) {
            var meta = (0, _meta.peekMeta)(this);
            return meta !== null ? meta.valueFor(keyName) : undefined;
        }
    });
    var _default = _exports.default = Observable;
});