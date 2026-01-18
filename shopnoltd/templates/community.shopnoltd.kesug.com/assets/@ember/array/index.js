define("@ember/array/index", ["exports", "@ember/-internals/metal", "@ember/object", "@ember/object/mixin", "@ember/debug", "@ember/enumerable", "@ember/enumerable/mutable", "@ember/utils", "@ember/-internals/environment", "@ember/object/observable", "@ember/array/-internals", "@ember/array/lib/make-array"], function(_exports, _metal, _object, _mixin, _debug, _enumerable, _mutable, _utils, _environment, _observable, _internals, _makeArray) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = _exports.NativeArray = _exports.MutableArray = _exports.A = void 0;
    _exports.isArray = isArray;
    Object.defineProperty(_exports, "makeArray", {
        enumerable: true,
        get: function() {
            return _makeArray.default;
        }
    });
    _exports.removeAt = removeAt;
    _exports.uniqBy = uniqBy;
    /**
    @module @ember/array
    */

    var EMPTY_ARRAY = Object.freeze([]);
    var identityFunction = item => item;

    function uniqBy(array, keyOrFunc) {
        if (keyOrFunc === void 0) {
            keyOrFunc = identityFunction;
        }
        (false && !(isArray(array)) && (0, _debug.assert)(`first argument passed to \`uniqBy\` should be array`, isArray(array)));
        var ret = A();
        var seen = new Set();
        var getter = typeof keyOrFunc === 'function' ? keyOrFunc : item => (0, _object.get)(item, keyOrFunc);
        array.forEach(item => {
            var val = getter(item);
            if (!seen.has(val)) {
                seen.add(val);
                ret.push(item);
            }
        });
        return ret;
    }

    function iter() {
        for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
            args[_key2] = arguments[_key2];
        }
        var valueProvided = args.length === 2;
        var [key, value] = args;
        return valueProvided ? item => value === (0, _object.get)(item, key) : item => Boolean((0, _object.get)(item, key));
    }

    function findIndex(array, predicate, startAt) {
        var len = array.length;
        for (var index = startAt; index < len; index++) {
            // SAFETY: Because we're checking the index this value should always be set.
            var item = (0, _metal.objectAt)(array, index);
            if (predicate(item, index, array)) {
                return index;
            }
        }
        return -1;
    }

    function find(array, callback, target) {
        if (target === void 0) {
            target = null;
        }
        var predicate = callback.bind(target);
        var index = findIndex(array, predicate, 0);
        return index === -1 ? undefined : (0, _metal.objectAt)(array, index);
    }

    function any(array, callback, target) {
        if (target === void 0) {
            target = null;
        }
        var predicate = callback.bind(target);
        return findIndex(array, predicate, 0) !== -1;
    }

    function every(array, callback, target) {
        if (target === void 0) {
            target = null;
        }
        var cb = callback.bind(target);
        var predicate = (item, index, array) => !cb(item, index, array);
        return findIndex(array, predicate, 0) === -1;
    }

    function indexOf(array, val, startAt, withNaNCheck) {
        if (startAt === void 0) {
            startAt = 0;
        }
        var len = array.length;
        if (startAt < 0) {
            startAt += len;
        }
        // SameValueZero comparison (NaN !== NaN)
        var predicate = withNaNCheck && val !== val ? item => item !== item : item => item === val;
        return findIndex(array, predicate, startAt);
    }

    function removeAt(array, index, len) {
        (false && !(index > -1 && index < array.length) && (0, _debug.assert)(`\`removeAt\` index provided is out of range`, index > -1 && index < array.length));
        (0, _metal.replace)(array, index, len ? ? 1, EMPTY_ARRAY);
        return array;
    }

    function insertAt(array, index, item) {
        (false && !(index > -1 && index <= array.length) && (0, _debug.assert)(`\`insertAt\` index provided is out of range`, index > -1 && index <= array.length));
        (0, _metal.replace)(array, index, 0, [item]);
        return item;
    }
    /**
      Returns true if the passed object is an array or Array-like.
  
      Objects are considered Array-like if any of the following are true:
  
        - the object is a native Array
        - the object has an objectAt property
        - the object is an Object, and has a length property
  
      Unlike `typeOf` this method returns true even if the passed object is
      not formally an array but appears to be array-like (i.e. implements `Array`)
  
      ```javascript
      import { isArray } from '@ember/array';
      import ArrayProxy from '@ember/array/proxy';
  
      isArray();                                      // false
      isArray([]);                                    // true
      isArray(ArrayProxy.create({ content: [] }));    // true
      ```
  
      @method isArray
      @static
      @for @ember/array
      @param {Object} obj The object to test
      @return {Boolean} true if the passed object is an array or Array-like
      @public
    */
    function isArray(obj) {
        if (false /* DEBUG */ && typeof obj === 'object' && obj !== null) {
            // SAFETY: Property read checks are safe if it's an object
            var possibleProxyContent = obj[_metal.PROXY_CONTENT];
            if (possibleProxyContent !== undefined) {
                obj = possibleProxyContent;
            }
        }
        // SAFETY: Property read checks are safe if it's an object
        if (!obj || obj.setInterval) {
            return false;
        }
        if (Array.isArray(obj) || EmberArray.detect(obj)) {
            return true;
        }
        var type = (0, _utils.typeOf)(obj);
        if ('array' === type) {
            return true;
        }
        // SAFETY: Property read checks are safe if it's an object
        var length = obj.length;
        if (typeof length === 'number' && length === length && 'object' === type) {
            return true;
        }
        return false;
    }
    /*
      This allows us to define computed properties that are not enumerable.
      The primary reason this is important is that when `NativeArray` is
      applied to `Array.prototype` we need to ensure that we do not add _any_
      new enumerable properties.
    */
    function nonEnumerableComputed(callback) {
        var property = (0, _metal.computed)(callback);
        property.enumerable = false;
        return property;
    }

    function mapBy(key) {
        return this.map(next => (0, _object.get)(next, key));
    }
    var EmberArray = _mixin.default.create(_enumerable.default, {
        init() {
            this._super(...arguments);
            (0, _internals.setEmberArray)(this);
        },
        objectsAt(indexes) {
            return indexes.map(idx => (0, _metal.objectAt)(this, idx));
        },
        '[]': nonEnumerableComputed({
            get() {
                return this;
            },
            set(_key, value) {
                this.replace(0, this.length, value);
                return this;
            }
        }),
        firstObject: nonEnumerableComputed(function() {
            return (0, _metal.objectAt)(this, 0);
        }).readOnly(),
        lastObject: nonEnumerableComputed(function() {
            return (0, _metal.objectAt)(this, this.length - 1);
        }).readOnly(),
        // Add any extra methods to EmberArray that are native to the built-in Array.
        slice(beginIndex, endIndex) {
            if (beginIndex === void 0) {
                beginIndex = 0;
            }
            var ret = A();
            var length = this.length;
            if (beginIndex < 0) {
                beginIndex = length + beginIndex;
            }
            var validatedEndIndex;
            if (endIndex === undefined || endIndex > length) {
                validatedEndIndex = length;
            } else if (endIndex < 0) {
                validatedEndIndex = length + endIndex;
            } else {
                validatedEndIndex = endIndex;
            }
            while (beginIndex < validatedEndIndex) {
                ret[ret.length] = (0, _metal.objectAt)(this, beginIndex++);
            }
            return ret;
        },
        indexOf(object, startAt) {
            return indexOf(this, object, startAt, false);
        },
        lastIndexOf(object, startAt) {
            var len = this.length;
            if (startAt === undefined || startAt >= len) {
                startAt = len - 1;
            }
            if (startAt < 0) {
                startAt += len;
            }
            for (var idx = startAt; idx >= 0; idx--) {
                if ((0, _metal.objectAt)(this, idx) === object) {
                    return idx;
                }
            }
            return -1;
        },
        forEach(callback, target) {
            if (target === void 0) {
                target = null;
            }
            (false && !(typeof callback === 'function') && (0, _debug.assert)('`forEach` expects a function as first argument.', typeof callback === 'function'));
            var length = this.length;
            for (var index = 0; index < length; index++) {
                var item = this.objectAt(index);
                callback.call(target, item, index, this);
            }
            return this;
        },
        getEach: mapBy,
        setEach(key, value) {
            return this.forEach(item => (0, _object.set)(item, key, value));
        },
        map(callback, target) {
            if (target === void 0) {
                target = null;
            }
            (false && !(typeof callback === 'function') && (0, _debug.assert)('`map` expects a function as first argument.', typeof callback === 'function'));
            var ret = A();
            this.forEach((x, idx, i) => ret[idx] = callback.call(target, x, idx, i));
            return ret;
        },
        mapBy,
        filter(callback, target) {
            if (target === void 0) {
                target = null;
            }
            (false && !(typeof callback === 'function') && (0, _debug.assert)('`filter` expects a function as first argument.', typeof callback === 'function'));
            var ret = A();
            this.forEach((x, idx, i) => {
                if (callback.call(target, x, idx, i)) {
                    ret.push(x);
                }
            });
            return ret;
        },
        reject(callback, target) {
            if (target === void 0) {
                target = null;
            }
            (false && !(typeof callback === 'function') && (0, _debug.assert)('`reject` expects a function as first argument.', typeof callback === 'function'));
            return this.filter(function() {
                // @ts-expect-error TS doesn't like us using arguments like this
                return !callback.apply(target, arguments);
            });
        },
        filterBy() {
            // @ts-expect-error TS doesn't like the ...arguments spread here.
            return this.filter(iter(...arguments));
        },
        rejectBy() {
            // @ts-expect-error TS doesn't like the ...arguments spread here.
            return this.reject(iter(...arguments));
        },
        find(callback, target) {
            if (target === void 0) {
                target = null;
            }
            (false && !(typeof callback === 'function') && (0, _debug.assert)('`find` expects a function as first argument.', typeof callback === 'function'));
            return find(this, callback, target);
        },
        findBy() {
            // @ts-expect-error TS doesn't like the ...arguments spread here.
            var callback = iter(...arguments);
            return find(this, callback);
        },
        every(callback, target) {
            if (target === void 0) {
                target = null;
            }
            (false && !(typeof callback === 'function') && (0, _debug.assert)('`every` expects a function as first argument.', typeof callback === 'function'));
            return every(this, callback, target);
        },
        isEvery() {
            // @ts-expect-error TS doesn't like the ...arguments spread here.
            var callback = iter(...arguments);
            return every(this, callback);
        },
        any(callback, target) {
            if (target === void 0) {
                target = null;
            }
            (false && !(typeof callback === 'function') && (0, _debug.assert)('`any` expects a function as first argument.', typeof callback === 'function'));
            return any(this, callback, target);
        },
        isAny() {
            // @ts-expect-error TS doesn't like us using arguments like this
            var callback = iter(...arguments);
            return any(this, callback);
        },
        // FIXME: When called without initialValue, behavior does not match native behavior
        reduce(callback, initialValue) {
            (false && !(typeof callback === 'function') && (0, _debug.assert)('`reduce` expects a function as first argument.', typeof callback === 'function'));
            var ret = initialValue;
            this.forEach(function(item, i) {
                ret = callback(ret, item, i, this);
            }, this);
            return ret;
        },
        invoke(methodName) {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++) {
                args[_key3 - 1] = arguments[_key3];
            }
            var ret = A();
            // SAFETY: This is not entirely safe and the code will not work with Ember proxies
            this.forEach(item => ret.push(item[methodName] ? .(...args)));
            return ret;
        },
        toArray() {
            return this.map(item => item);
        },
        compact() {
            return this.filter(value => value != null);
        },
        includes(object, startAt) {
            return indexOf(this, object, startAt, true) !== -1;
        },
        sortBy() {
            var sortKeys = arguments;
            return this.toArray().sort((a, b) => {
                for (var i = 0; i < sortKeys.length; i++) {
                    var key = sortKeys[i];
                    var propA = (0, _object.get)(a, key);
                    var propB = (0, _object.get)(b, key);
                    // return 1 or -1 else continue to the next sortKey
                    var compareValue = (0, _utils.compare)(propA, propB);
                    if (compareValue) {
                        return compareValue;
                    }
                }
                return 0;
            });
        },
        uniq() {
            return uniqBy(this);
        },
        uniqBy(key) {
            return uniqBy(this, key);
        },
        without(value) {
            if (!this.includes(value)) {
                return this; // nothing to do
            }
            // SameValueZero comparison (NaN !== NaN)
            var predicate = value === value ? item => item !== value : item => item === item;
            return this.filter(predicate);
        }
    });
    var MutableArray = _exports.MutableArray = _mixin.default.create(EmberArray, _mutable.default, {
        clear() {
            var len = this.length;
            if (len === 0) {
                return this;
            }
            this.replace(0, len, EMPTY_ARRAY);
            return this;
        },
        insertAt(idx, object) {
            insertAt(this, idx, object);
            return this;
        },
        removeAt(start, len) {
            return removeAt(this, start, len);
        },
        pushObject(obj) {
            return insertAt(this, this.length, obj);
        },
        pushObjects(objects) {
            this.replace(this.length, 0, objects);
            return this;
        },
        popObject() {
            var len = this.length;
            if (len === 0) {
                return null;
            }
            var ret = (0, _metal.objectAt)(this, len - 1);
            this.removeAt(len - 1, 1);
            return ret;
        },
        shiftObject() {
            if (this.length === 0) {
                return null;
            }
            var ret = (0, _metal.objectAt)(this, 0);
            this.removeAt(0);
            return ret;
        },
        unshiftObject(obj) {
            return insertAt(this, 0, obj);
        },
        unshiftObjects(objects) {
            this.replace(0, 0, objects);
            return this;
        },
        reverseObjects() {
            var len = this.length;
            if (len === 0) {
                return this;
            }
            var objects = this.toArray().reverse();
            this.replace(0, len, objects);
            return this;
        },
        setObjects(objects) {
            if (objects.length === 0) {
                return this.clear();
            }
            var len = this.length;
            this.replace(0, len, objects);
            return this;
        },
        removeObject(obj) {
            var loc = this.length || 0;
            while (--loc >= 0) {
                var curObject = (0, _metal.objectAt)(this, loc);
                if (curObject === obj) {
                    this.removeAt(loc);
                }
            }
            return this;
        },
        removeObjects(objects) {
            (0, _metal.beginPropertyChanges)();
            for (var i = objects.length - 1; i >= 0; i--) {
                // SAFETY: Due to the loop structure we know this will always exist.
                this.removeObject(objects[i]);
            }
            (0, _metal.endPropertyChanges)();
            return this;
        },
        addObject(obj) {
            var included = this.includes(obj);
            if (!included) {
                this.pushObject(obj);
            }
            return this;
        },
        addObjects(objects) {
            (0, _metal.beginPropertyChanges)();
            objects.forEach(obj => this.addObject(obj));
            (0, _metal.endPropertyChanges)();
            return this;
        }
    });
    var NativeArray = _exports.NativeArray = _mixin.default.create(MutableArray, _observable.default, {
        objectAt(idx) {
            return this[idx];
        },
        // primitive for array support.
        replace(start, deleteCount, items) {
            if (items === void 0) {
                items = EMPTY_ARRAY;
            }
            (false && !(Array.isArray(items)) && (0, _debug.assert)('The third argument to replace needs to be an array.', Array.isArray(items)));
            (0, _metal.replaceInNativeArray)(this, start, deleteCount, items);
            return this;
        }
    });
    // Remove any methods implemented natively so we don't override them
    var ignore = ['length'];
    NativeArray.keys().forEach(methodName => {
        // SAFETY: It's safe to read unknown properties from an object
        if (Array.prototype[methodName]) {
            ignore.push(methodName);
        }
    });
    _exports.NativeArray = NativeArray = NativeArray.without(...ignore);
    var A;
    if (_environment.ENV.EXTEND_PROTOTYPES.Array) {
        NativeArray.apply(Array.prototype, true);
        _exports.A = A = function(arr) {
            (false && !(!(this instanceof A)) && (0, _debug.assert)('You cannot create an Ember Array with `new A()`, please update to calling A as a function: `A()`', !(this instanceof A))); // SAFTEY: Since we are extending prototypes all true native arrays are Ember NativeArrays
            return arr || [];
        };
    } else {
        _exports.A = A = function(arr) {
            (false && !(!(this instanceof A)) && (0, _debug.assert)('You cannot create an Ember Array with `new A()`, please update to calling A as a function: `A()`', !(this instanceof A)));
            if ((0, _internals.isEmberArray)(arr)) {
                // SAFETY: If it's a true native array and it is also an EmberArray then it should be an Ember NativeArray
                return arr;
            } else {
                // SAFETY: This will return an NativeArray but TS can't infer that.
                return NativeArray.apply(arr ? ? []);
            }
        };
    }
    var _default = _exports.default = EmberArray;
});