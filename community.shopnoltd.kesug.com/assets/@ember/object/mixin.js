define("@ember/object/mixin", ["exports", "@ember/-internals/container", "@ember/-internals/meta", "@ember/-internals/utils", "@ember/debug", "@glimmer/util", "@ember/-internals/metal", "@ember/object/events"], function(_exports, _container, _meta, _utils, _debug, _util, _metal, _events) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.applyMixin = applyMixin;
    _exports.default = void 0;
    _exports.mixin = mixin;
    /**
    @module @ember/object/mixin
    */

    var a_concat = Array.prototype.concat;
    var {
        isArray
    } = Array;

    function extractAccessors(properties) {
        if (properties !== undefined) {
            for (var key of Object.keys(properties)) {
                var desc = Object.getOwnPropertyDescriptor(properties, key);
                if (desc.get !== undefined || desc.set !== undefined) {
                    Object.defineProperty(properties, key, {
                        value: (0, _metal.nativeDescDecorator)(desc)
                    });
                }
            }
        }
        return properties;
    }

    function concatenatedMixinProperties(concatProp, props, values, base) {
        // reset before adding each new mixin to pickup concats from previous
        var concats = values[concatProp] || base[concatProp];
        if (props[concatProp]) {
            concats = concats ? a_concat.call(concats, props[concatProp]) : props[concatProp];
        }
        return concats;
    }

    function giveDecoratorSuper(key, decorator, property, descs) {
        if (property === true) {
            return decorator;
        }
        var originalGetter = property._getter;
        if (originalGetter === undefined) {
            return decorator;
        }
        var superDesc = descs[key];
        // Check to see if the super property is a decorator first, if so load its descriptor
        var superProperty = typeof superDesc === 'function' ? (0, _metal.descriptorForDecorator)(superDesc) : superDesc;
        if (superProperty === undefined || superProperty === true) {
            return decorator;
        }
        var superGetter = superProperty._getter;
        if (superGetter === undefined) {
            return decorator;
        }
        var get = (0, _utils.wrap)(originalGetter, superGetter);
        var set;
        var originalSetter = property._setter;
        var superSetter = superProperty._setter;
        if (superSetter !== undefined) {
            if (originalSetter !== undefined) {
                set = (0, _utils.wrap)(originalSetter, superSetter);
            } else {
                // If the super property has a setter, we default to using it no matter what.
                // This is clearly very broken and weird, but it's what was here so we have
                // to keep it until the next major at least.
                //
                // TODO: Add a deprecation here.
                set = superSetter;
            }
        } else {
            set = originalSetter;
        }
        // only create a new CP if we must
        if (get !== originalGetter || set !== originalSetter) {
            // Since multiple mixins may inherit from the same parent, we need
            // to clone the computed property so that other mixins do not receive
            // the wrapped version.
            var dependentKeys = property._dependentKeys || [];
            var newProperty = new _metal.ComputedProperty([...dependentKeys, {
                get,
                set
            }]);
            newProperty._readOnly = property._readOnly;
            newProperty._meta = property._meta;
            newProperty.enumerable = property.enumerable;
            // SAFETY: We passed in the impl for this class
            return (0, _metal.makeComputedDecorator)(newProperty, _metal.ComputedProperty);
        }
        return decorator;
    }

    function giveMethodSuper(key, method, values, descs) {
        // Methods overwrite computed properties, and do not call super to them.
        if (descs[key] !== undefined) {
            return method;
        }
        // Find the original method in a parent mixin
        var superMethod = values[key];
        // Only wrap the new method if the original method was a function
        if (typeof superMethod === 'function') {
            return (0, _utils.wrap)(method, superMethod);
        }
        return method;
    }

    function simpleMakeArray(value) {
        if (!value) {
            return [];
        } else if (!Array.isArray(value)) {
            return [value];
        } else {
            return value;
        }
    }

    function applyConcatenatedProperties(key, value, values) {
        var baseValue = values[key];
        var ret = simpleMakeArray(baseValue).concat(simpleMakeArray(value));
        if (false /* DEBUG */ ) {
            // it is possible to use concatenatedProperties with strings (which cannot be frozen)
            // only freeze objects...
            if (typeof ret === 'object' && ret !== null) {
                // prevent mutating `concatenatedProperties` array after it is applied
                Object.freeze(ret);
            }
        }
        return ret;
    }

    function applyMergedProperties(key, value, values) {
        var baseValue = values[key];
        (false && !(!isArray(value)) && (0, _debug.assert)(`You passed in \`${JSON.stringify(value)}\` as the value for \`${key}\` but \`${key}\` cannot be an Array`, !isArray(value)));
        if (!baseValue) {
            return value;
        }
        var newBase = Object.assign({}, baseValue);
        var hasFunction = false;
        var props = Object.keys(value);
        for (var prop of props) {
            var propValue = value[prop];
            if (typeof propValue === 'function') {
                hasFunction = true;
                newBase[prop] = giveMethodSuper(prop, propValue, baseValue, {});
            } else {
                newBase[prop] = propValue;
            }
        }
        if (hasFunction) {
            newBase._super = _utils.ROOT;
        }
        return newBase;
    }

    function mergeMixins(mixins, meta, descs, values, base, keys, keysWithSuper) {
        var currentMixin;
        for (var i = 0; i < mixins.length; i++) {
            currentMixin = mixins[i];
            (false && !(typeof currentMixin === 'object' && currentMixin !== null && Object.prototype.toString.call(currentMixin) !== '[object Array]') && (0, _debug.assert)(`Expected hash or Mixin instance, got ${Object.prototype.toString.call(currentMixin)}`, typeof currentMixin === 'object' && currentMixin !== null && Object.prototype.toString.call(currentMixin) !== '[object Array]'));
            if (MIXINS.has(currentMixin)) {
                if (meta.hasMixin(currentMixin)) {
                    continue;
                }
                meta.addMixin(currentMixin);
                var {
                    properties,
                    mixins: _mixins
                } = currentMixin;
                if (properties !== undefined) {
                    mergeProps(meta, properties, descs, values, base, keys, keysWithSuper);
                } else if (_mixins !== undefined) {
                    mergeMixins(_mixins, meta, descs, values, base, keys, keysWithSuper);
                    if (currentMixin instanceof Mixin && currentMixin._without !== undefined) {
                        currentMixin._without.forEach(keyName => {
                            // deleting the key means we won't process the value
                            var index = keys.indexOf(keyName);
                            if (index !== -1) {
                                keys.splice(index, 1);
                            }
                        });
                    }
                }
            } else {
                mergeProps(meta, currentMixin, descs, values, base, keys, keysWithSuper);
            }
        }
    }

    function mergeProps(meta, props, descs, values, base, keys, keysWithSuper) {
        var concats = concatenatedMixinProperties('concatenatedProperties', props, values, base);
        var mergings = concatenatedMixinProperties('mergedProperties', props, values, base);
        var propKeys = Object.keys(props);
        for (var key of propKeys) {
            var value = props[key];
            if (value === undefined) continue;
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                var desc = meta.peekDescriptors(key);
                if (desc === undefined) {
                    // If the value is a classic decorator, we don't want to actually
                    // access it, because that will execute the decorator while we're
                    // building the class.
                    if (!(0, _metal.isClassicDecorator)(value)) {
                        // The superclass did not have a CP, which means it may have
                        // observers or listeners on that property.
                        var prev = values[key] = base[key];
                        if (typeof prev === 'function') {
                            updateObserversAndListeners(base, key, prev, false);
                        }
                    }
                } else {
                    descs[key] = desc;
                    // The super desc will be overwritten on descs, so save off the fact that
                    // there was a super so we know to Object.defineProperty when writing
                    // the value
                    keysWithSuper.push(key);
                    desc.teardown(base, key, meta);
                }
            }
            var isFunction = typeof value === 'function';
            if (isFunction) {
                var _desc = (0, _metal.descriptorForDecorator)(value);
                if (_desc !== undefined) {
                    // Wrap descriptor function to implement _super() if needed
                    descs[key] = giveDecoratorSuper(key, value, _desc, descs);
                    values[key] = undefined;
                    continue;
                }
            }
            if (concats && concats.indexOf(key) >= 0 || key === 'concatenatedProperties' || key === 'mergedProperties') {
                value = applyConcatenatedProperties(key, value, values);
            } else if (mergings && mergings.indexOf(key) > -1) {
                value = applyMergedProperties(key, value, values);
            } else if (isFunction) {
                value = giveMethodSuper(key, value, values, descs);
            }
            values[key] = value;
            descs[key] = undefined;
        }
    }

    function updateObserversAndListeners(obj, key, fn, add) {
        var meta = (0, _utils.observerListenerMetaFor)(fn);
        if (meta === undefined) return;
        var {
            observers,
            listeners
        } = meta;
        if (observers !== undefined) {
            var updateObserver = add ? _metal.addObserver : _metal.removeObserver;
            for (var path of observers.paths) {
                updateObserver(obj, path, null, key, observers.sync);
            }
        }
        if (listeners !== undefined) {
            var updateListener = add ? _events.addListener : _events.removeListener;
            for (var listener of listeners) {
                updateListener(obj, listener, null, key);
            }
        }
    }

    function applyMixin(obj, mixins, _hideKeys) {
        if (_hideKeys === void 0) {
            _hideKeys = false;
        }
        var descs = Object.create(null);
        var values = Object.create(null);
        var meta = (0, _meta.meta)(obj);
        var keys = [];
        var keysWithSuper = [];
        obj._super = _utils.ROOT;
        // Go through all mixins and hashes passed in, and:
        //
        // * Handle concatenated properties
        // * Handle merged properties
        // * Set up _super wrapping if necessary
        // * Set up computed property descriptors
        // * Copying `toString` in broken browsers
        mergeMixins(mixins, meta, descs, values, obj, keys, keysWithSuper);
        for (var key of keys) {
            var value = values[key];
            var desc = descs[key];
            if (value !== undefined) {
                if (typeof value === 'function') {
                    updateObserversAndListeners(obj, key, value, true);
                }
                (0, _metal.defineValue)(obj, key, value, keysWithSuper.indexOf(key) !== -1, !_hideKeys);
            } else if (desc !== undefined) {
                (0, _metal.defineDecorator)(obj, key, desc, meta);
            }
        }
        if (!meta.isPrototypeMeta(obj)) {
            (0, _metal.revalidateObservers)(obj);
        }
        return obj;
    }
    /**
      @method mixin
      @param obj
      @param mixins*
      @return obj
      @private
    */
    function mixin(obj) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }
        applyMixin(obj, args);
        return obj;
    }
    var MIXINS = new _util._WeakSet();
    /**
      The `Mixin` class allows you to create mixins, whose properties can be
      added to other classes. For instance,
  
      ```javascript
      import Mixin from '@ember/object/mixin';
  
      const EditableMixin = Mixin.create({
        edit() {
          console.log('starting to edit');
          this.set('isEditing', true);
        },
        isEditing: false
      });
      ```
  
      ```javascript
      import EmberObject from '@ember/object';
      import EditableMixin from '../mixins/editable';
  
      // Mix mixins into classes by passing them as the first arguments to
      // `.extend.`
      const Comment = EmberObject.extend(EditableMixin, {
        post: null
      });
  
      let comment = Comment.create({
        post: somePost
      });
  
      comment.edit(); // outputs 'starting to edit'
      ```
  
      Note that Mixins are created with `Mixin.create`, not
      `Mixin.extend`.
  
      Note that mixins extend a constructor's prototype so arrays and object literals
      defined as properties will be shared amongst objects that implement the mixin.
      If you want to define a property in a mixin that is not shared, you can define
      it either as a computed property or have it be created on initialization of the object.
  
      ```javascript
      // filters array will be shared amongst any object implementing mixin
      import Mixin from '@ember/object/mixin';
      import { A } from '@ember/array';
  
      const FilterableMixin = Mixin.create({
        filters: A()
      });
      ```
  
      ```javascript
      import Mixin from '@ember/object/mixin';
      import { A } from '@ember/array';
      import { computed } from '@ember/object';
  
      // filters will be a separate array for every object implementing the mixin
      const FilterableMixin = Mixin.create({
        filters: computed(function() {
          return A();
        })
      });
      ```
  
      ```javascript
      import Mixin from '@ember/object/mixin';
      import { A } from '@ember/array';
  
      // filters will be created as a separate array during the object's initialization
      const Filterable = Mixin.create({
        filters: null,
  
        init() {
          this._super(...arguments);
          this.set("filters", A());
        }
      });
      ```
  
      @class Mixin
      @public
    */
    class Mixin {
        /** @internal */
        constructor(mixins, properties) {
            MIXINS.add(this);
            this.properties = extractAccessors(properties);
            this.mixins = buildMixinsArray(mixins);
            this.ownerConstructor = undefined;
            this._without = undefined;
            if (false /* DEBUG */ ) {
                // Eagerly add INIT_FACTORY to avoid issues in DEBUG as a result of Object.seal(mixin)
                this[_container.INIT_FACTORY] = null;
                /*
                  In debug builds, we seal mixins to help avoid performance pitfalls.
                         In IE11 there is a quirk that prevents sealed objects from being added
                  to a WeakMap. Unfortunately, the mixin system currently relies on
                  weak maps in `guidFor`, so we need to prime the guid cache weak map.
                */
                (0, _utils.guidFor)(this);
                if (Mixin._disableDebugSeal !== true) {
                    Object.seal(this);
                }
            }
        }
        /**
          @method create
          @for @ember/object/mixin
          @static
          @param arguments*
          @public
        */
        static create() {
            (0, _metal.setUnprocessedMixins)();
            var M = this;
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }
            return new M(args, undefined);
        }
        // returns the mixins currently applied to the specified object
        // TODO: Make `mixin`
        /** @internal */
        static mixins(obj) {
            var meta = (0, _meta.peekMeta)(obj);
            var ret = [];
            if (meta === null) {
                return ret;
            }
            meta.forEachMixins(currentMixin => {
                // skip primitive mixins since these are always anonymous
                if (!currentMixin.properties) {
                    ret.push(currentMixin);
                }
            });
            return ret;
        }
        /**
          @method reopen
          @param arguments*
          @private
          @internal
        */
        reopen() {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }
            if (args.length === 0) {
                return this;
            }
            if (this.properties) {
                var currentMixin = new Mixin(undefined, this.properties);
                this.properties = undefined;
                this.mixins = [currentMixin];
            } else if (!this.mixins) {
                this.mixins = [];
            }
            this.mixins = this.mixins.concat(buildMixinsArray(args));
            return this;
        }
        /**
          @method apply
          @param obj
          @return applied object
          @private
          @internal
        */
        apply(obj, _hideKeys) {
            if (_hideKeys === void 0) {
                _hideKeys = false;
            }
            // Ember.NativeArray is a normal Ember.Mixin that we mix into `Array.prototype` when prototype extensions are enabled
            // mutating a native object prototype like this should _not_ result in enumerable properties being added (or we have significant
            // issues with things like deep equality checks from test frameworks, or things like jQuery.extend(true, [], [])).
            //
            // _hideKeys disables enumerablity when applying the mixin. This is a hack, and we should stop mutating the array prototype by default 😫
            return applyMixin(obj, [this], _hideKeys);
        }
        /** @internal */
        applyPartial(obj) {
            return applyMixin(obj, [this]);
        }
        /**
          @method detect
          @param obj
          @return {Boolean}
          @private
          @internal
        */
        detect(obj) {
            if (typeof obj !== 'object' || obj === null) {
                return false;
            }
            if (MIXINS.has(obj)) {
                return _detect(obj, this);
            }
            var meta = (0, _meta.peekMeta)(obj);
            if (meta === null) {
                return false;
            }
            return meta.hasMixin(this);
        }
        /** @internal */
        without() {
            var ret = new Mixin([this]);
            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }
            ret._without = args;
            return ret;
        }
        /** @internal */
        keys() {
            var keys = _keys(this);
            (false && !(keys) && (0, _debug.assert)('[BUG] Missing keys for mixin!', keys));
            return keys;
        }
        /** @internal */
        toString() {
            return '(unknown mixin)';
        }
    }
    _exports.default = Mixin;
    if (false /* DEBUG */ ) {
        Object.defineProperty(Mixin, '_disableDebugSeal', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: false
        });
    }

    function buildMixinsArray(mixins) {
        var length = mixins && mixins.length || 0;
        var m = undefined;
        if (length > 0) {
            m = new Array(length);
            for (var i = 0; i < length; i++) {
                var x = mixins[i];
                (false && !(typeof x === 'object' && x !== null && Object.prototype.toString.call(x) !== '[object Array]') && (0, _debug.assert)(`Expected hash or Mixin instance, got ${Object.prototype.toString.call(x)}`, typeof x === 'object' && x !== null && Object.prototype.toString.call(x) !== '[object Array]'));
                if (MIXINS.has(x)) {
                    m[i] = x;
                } else {
                    m[i] = new Mixin(undefined, x);
                }
            }
        }
        return m;
    }
    if (false /* DEBUG */ ) {
        Object.seal(Mixin.prototype);
    }

    function _detect(curMixin, targetMixin, seen) {
        if (seen === void 0) {
            seen = new Set();
        }
        if (seen.has(curMixin)) {
            return false;
        }
        seen.add(curMixin);
        if (curMixin === targetMixin) {
            return true;
        }
        var mixins = curMixin.mixins;
        if (mixins) {
            return mixins.some(mixin => _detect(mixin, targetMixin, seen));
        }
        return false;
    }

    function _keys(mixin, ret, seen) {
        if (ret === void 0) {
            ret = new Set();
        }
        if (seen === void 0) {
            seen = new Set();
        }
        if (seen.has(mixin)) {
            return;
        }
        seen.add(mixin);
        if (mixin.properties) {
            var props = Object.keys(mixin.properties);
            for (var prop of props) {
                ret.add(prop);
            }
        } else if (mixin.mixins) {
            mixin.mixins.forEach(x => _keys(x, ret, seen));
        }
        return ret;
    }
});