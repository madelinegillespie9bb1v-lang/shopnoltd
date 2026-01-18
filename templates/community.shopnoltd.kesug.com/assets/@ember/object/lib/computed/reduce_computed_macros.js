define("@ember/object/lib/computed/reduce_computed_macros", ["exports", "@ember/debug", "@ember/-internals/metal", "@ember/object", "@ember/utils", "@ember/array"], function(_exports, _debug, _metal, _object, _utils, _array) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.collect = collect;
    _exports.filter = filter;
    _exports.filterBy = filterBy;
    _exports.intersect = intersect;
    _exports.map = map;
    _exports.mapBy = mapBy;
    _exports.max = max;
    _exports.min = min;
    _exports.setDiff = setDiff;
    _exports.sort = sort;
    _exports.sum = sum;
    _exports.union = void 0;
    _exports.uniq = uniq;
    _exports.uniqBy = uniqBy;
    /**
    @module @ember/object
    */

    function isNativeOrEmberArray(obj) {
        return Array.isArray(obj) || _array.default.detect(obj);
    }

    function reduceMacro(dependentKey, callback, initialValue, name) {
        (false && !(!/[[\]{}]/g.test(dependentKey)) && (0, _debug.assert)(`Dependent key passed to \`${name}\` computed macro shouldn't contain brace expanding pattern.`, !/[[\]{}]/g.test(dependentKey)));
        return (0, _object.computed)(`${dependentKey}.[]`, function() {
            var arr = (0, _object.get)(this, dependentKey);
            if (arr === null || typeof arr !== 'object') {
                return initialValue;
            }
            return arr.reduce(callback, initialValue, this);
        }).readOnly();
    }

    function arrayMacro(dependentKey, additionalDependentKeys, callback) {
        // This is a bit ugly
        var propertyName;
        if (/@each/.test(dependentKey)) {
            propertyName = dependentKey.replace(/\.@each.*$/, '');
        } else {
            propertyName = dependentKey;
            dependentKey += '.[]';
        }
        return (0, _object.computed)(dependentKey, ...additionalDependentKeys, function() {
            var value = (0, _object.get)(this, propertyName);
            if (isNativeOrEmberArray(value)) {
                return (0, _array.A)(callback.call(this, value));
            } else {
                return (0, _array.A)();
            }
        }).readOnly();
    }

    function multiArrayMacro(_dependentKeys, callback, name) {
        (false && !(_dependentKeys.every(dependentKey => !/[[\]{}]/g.test(dependentKey))) && (0, _debug.assert)(`Dependent keys passed to \`${name}\` computed macro shouldn't contain brace expanding pattern.`, _dependentKeys.every(dependentKey => !/[[\]{}]/g.test(dependentKey))));
        var dependentKeys = _dependentKeys.map(key => `${key}.[]`);
        return (0, _object.computed)(...dependentKeys, function() {
            return (0, _array.A)(callback.call(this, _dependentKeys));
        }).readOnly();
    }
    /**
      A computed property that returns the sum of the values in the dependent array.
  
      Example:
  
      ```javascript
      import { sum } from '@ember/object/computed';
  
      class Invoice {
        lineItems = [1.00, 2.50, 9.99];
  
        @sum('lineItems') total;
      }
  
      let invoice = new Invoice();
  
      invoice.total; // 13.49
      ```
  
      @method sum
      @for @ember/object/computed
      @static
      @param {String} dependentKey
      @return {ComputedProperty} computes the sum of all values in the
      dependentKey's array
      @since 1.4.0
      @public
    */
    function sum(dependentKey) {
        (false && !(!(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))) && (0, _debug.assert)('You attempted to use @sum as a decorator directly, but it requires a `dependentKey` parameter', !(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))));
        return reduceMacro(dependentKey, (sum, item) => sum + item, 0, 'sum');
    }
    /**
      A computed property that calculates the maximum value in the dependent array.
      This will return `-Infinity` when the dependent array is empty.
  
      Example:
  
      ```javascript
      import { set } from '@ember/object';
      import { mapBy, max } from '@ember/object/computed';
  
      class Person {
        children = [];
  
        @mapBy('children', 'age') childAges;
        @max('childAges') maxChildAge;
      }
  
      let lordByron = new Person();
  
      lordByron.maxChildAge; // -Infinity
  
      set(lordByron, 'children', [
        {
          name: 'Augusta Ada Byron',
          age: 7
        }
      ]);
      lordByron.maxChildAge; // 7
  
      set(lordByron, 'children', [
        ...lordByron.children,
        {
          name: 'Allegra Byron',
          age: 5
        }, {
          name: 'Elizabeth Medora Leigh',
          age: 8
        }
      ]);
      lordByron.maxChildAge; // 8
      ```
  
      If the types of the arguments are not numbers, they will be converted to
      numbers and the type of the return value will always be `Number`. For example,
      the max of a list of Date objects will be the highest timestamp as a `Number`.
      This behavior is consistent with `Math.max`.
  
      @method max
      @for @ember/object/computed
      @static
      @param {String} dependentKey
      @return {ComputedProperty} computes the largest value in the dependentKey's
      array
      @public
    */
    function max(dependentKey) {
        (false && !(!(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))) && (0, _debug.assert)('You attempted to use @max as a decorator directly, but it requires a `dependentKey` parameter', !(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))));
        return reduceMacro(dependentKey, (max, item) => Math.max(max, item), -Infinity, 'max');
    }
    /**
      A computed property that calculates the minimum value in the dependent array.
      This will return `Infinity` when the dependent array is empty.
  
      Example:
  
      ```javascript
      import { set } from '@ember/object';
      import { mapBy, min } from '@ember/object/computed';
  
      class Person {
        children = [];
  
        @mapBy('children', 'age') childAges;
        @min('childAges') minChildAge;
      }
  
      let lordByron = Person.create({ children: [] });
  
      lordByron.minChildAge; // Infinity
  
      set(lordByron, 'children', [
        {
          name: 'Augusta Ada Byron',
          age: 7
        }
      ]);
      lordByron.minChildAge; // 7
  
      set(lordByron, 'children', [
        ...lordByron.children,
        {
          name: 'Allegra Byron',
          age: 5
        }, {
          name: 'Elizabeth Medora Leigh',
          age: 8
        }
      ]);
      lordByron.minChildAge; // 5
      ```
  
      If the types of the arguments are not numbers, they will be converted to
      numbers and the type of the return value will always be `Number`. For example,
      the min of a list of Date objects will be the lowest timestamp as a `Number`.
      This behavior is consistent with `Math.min`.
  
      @method min
      @for @ember/object/computed
      @static
      @param {String} dependentKey
      @return {ComputedProperty} computes the smallest value in the dependentKey's array
      @public
    */
    function min(dependentKey) {
        (false && !(!(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))) && (0, _debug.assert)('You attempted to use @min as a decorator directly, but it requires a `dependentKey` parameter', !(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))));
        return reduceMacro(dependentKey, (min, item) => Math.min(min, item), Infinity, 'min');
    }

    function map(dependentKey, additionalDependentKeysOrCallback, callback) {
        (false && !(!(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))) && (0, _debug.assert)('You attempted to use @map as a decorator directly, but it requires atleast `dependentKey` and `callback` parameters', !(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))));
        (false && !(typeof callback === 'function' || callback === undefined && typeof additionalDependentKeysOrCallback === 'function') && (0, _debug.assert)('The final parameter provided to map must be a callback function', typeof callback === 'function' || callback === undefined && typeof additionalDependentKeysOrCallback === 'function'));
        (false && !(Array.isArray(additionalDependentKeysOrCallback) || typeof additionalDependentKeysOrCallback === 'function') && (0, _debug.assert)('The second parameter provided to map must either be the callback or an array of additional dependent keys', Array.isArray(additionalDependentKeysOrCallback) || typeof additionalDependentKeysOrCallback === 'function'));
        var additionalDependentKeys;
        if (typeof additionalDependentKeysOrCallback === 'function') {
            callback = additionalDependentKeysOrCallback;
            additionalDependentKeys = [];
        } else {
            additionalDependentKeys = additionalDependentKeysOrCallback;
        }
        var cCallback = callback;
        (false && !(cCallback) && (0, _debug.assert)('[BUG] Missing callback', cCallback));
        return arrayMacro(dependentKey, additionalDependentKeys, function(value) {
            // This is so dumb...
            return Array.isArray(value) ? value.map(cCallback, this) : value.map(cCallback, this);
        });
    }
    /**
      Returns an array mapped to the specified key.
  
      Example:
  
      ```javascript
      import { set } from '@ember/object';
      import { mapBy } from '@ember/object/computed';
  
      class Person {
        children = [];
  
        @mapBy('children', 'age') childAges;
      }
  
      let lordByron = new Person();
  
      lordByron.childAges; // []
  
      set(lordByron, 'children', [
        {
          name: 'Augusta Ada Byron',
          age: 7
        }
      ]);
      lordByron.childAges; // [7]
  
      set(lordByron, 'children', [
        ...lordByron.children,
        {
          name: 'Allegra Byron',
          age: 5
        }, {
          name: 'Elizabeth Medora Leigh',
          age: 8
        }
      ]);
      lordByron.childAges; // [7, 5, 8]
      ```
  
      @method mapBy
      @for @ember/object/computed
      @static
      @param {String} dependentKey
      @param {String} propertyKey
      @return {ComputedProperty} an array mapped to the specified key
      @public
    */
    function mapBy(dependentKey, propertyKey) {
        (false && !(!(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))) && (0, _debug.assert)('You attempted to use @mapBy as a decorator directly, but it requires `dependentKey` and `propertyKey` parameters', !(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))));
        (false && !(typeof propertyKey === 'string') && (0, _debug.assert)('`mapBy` computed macro expects a property string for its second argument, ' + 'perhaps you meant to use "map"', typeof propertyKey === 'string'));
        (false && !(!/[[\]{}]/g.test(dependentKey)) && (0, _debug.assert)(`Dependent key passed to \`mapBy\` computed macro shouldn't contain brace expanding pattern.`, !/[[\]{}]/g.test(dependentKey)));
        return map(`${dependentKey}.@each.${propertyKey}`, item => (0, _object.get)(item, propertyKey));
    }

    function filter(dependentKey, additionalDependentKeysOrCallback, callback) {
        (false && !(!(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))) && (0, _debug.assert)('You attempted to use @filter as a decorator directly, but it requires atleast `dependentKey` and `callback` parameters', !(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))));
        (false && !(typeof callback === 'function' || callback === undefined && typeof additionalDependentKeysOrCallback === 'function') && (0, _debug.assert)('The final parameter provided to filter must be a callback function', typeof callback === 'function' || callback === undefined && typeof additionalDependentKeysOrCallback === 'function'));
        (false && !(Array.isArray(additionalDependentKeysOrCallback) || typeof additionalDependentKeysOrCallback === 'function') && (0, _debug.assert)('The second parameter provided to filter must either be the callback or an array of additional dependent keys', Array.isArray(additionalDependentKeysOrCallback) || typeof additionalDependentKeysOrCallback === 'function'));
        var additionalDependentKeys;
        if (typeof additionalDependentKeysOrCallback === 'function') {
            callback = additionalDependentKeysOrCallback;
            additionalDependentKeys = [];
        } else {
            additionalDependentKeys = additionalDependentKeysOrCallback;
        }
        var cCallback = callback;
        return arrayMacro(dependentKey, additionalDependentKeys, function(value) {
            // This is a really silly way to keep TS happy
            return Array.isArray(value) ? value.filter(cCallback, this) : value.filter(cCallback, this);
        });
    }
    /**
      Filters the array by the property and value.
  
      Example:
  
      ```javascript
      import { set } from '@ember/object';
      import { filterBy } from '@ember/object/computed';
  
      class Hamster {
        constructor(chores) {
          set(this, 'chores', chores);
        }
  
        @filterBy('chores', 'done', false) remainingChores;
      }
  
      let hamster = new Hamster([
        { name: 'cook', done: true },
        { name: 'clean', done: true },
        { name: 'write more unit tests', done: false }
      ]);
  
      hamster.remainingChores; // [{ name: 'write more unit tests', done: false }]
      ```
  
      @method filterBy
      @for @ember/object/computed
      @static
      @param {String} dependentKey
      @param {String} propertyKey
      @param {*} value
      @return {ComputedProperty} the filtered array
      @public
    */
    function filterBy(dependentKey, propertyKey, value) {
        (false && !(!(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))) && (0, _debug.assert)('You attempted to use @filterBy as a decorator directly, but it requires atleast `dependentKey` and `propertyKey` parameters', !(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))));
        (false && !(!/[[\]{}]/g.test(dependentKey)) && (0, _debug.assert)(`Dependent key passed to \`filterBy\` computed macro shouldn't contain brace expanding pattern.`, !/[[\]{}]/g.test(dependentKey)));
        var callback;
        if (arguments.length === 2) {
            callback = item => (0, _object.get)(item, propertyKey);
        } else {
            callback = item => (0, _object.get)(item, propertyKey) === value;
        }
        return filter(`${dependentKey}.@each.${propertyKey}`, callback);
    }
    /**
      A computed property which returns a new array with all the unique elements
      from one or more dependent arrays.
  
      Example:
  
      ```javascript
      import { set } from '@ember/object';
      import { uniq } from '@ember/object/computed';
  
      class Hamster {
        constructor(fruits) {
          set(this, 'fruits', fruits);
        }
  
        @uniq('fruits') uniqueFruits;
      }
  
      let hamster = new Hamster([
        'banana',
        'grape',
        'kale',
        'banana'
      ]);
  
      hamster.uniqueFruits; // ['banana', 'grape', 'kale']
      ```
  
      @method uniq
      @for @ember/object/computed
      @static
      @param {String} propertyKey*
      @return {ComputedProperty} computes a new array with all the
      unique elements from the dependent array
      @public
    */
    function uniq(dependentKey) {
        for (var _len = arguments.length, additionalDependentKeys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            additionalDependentKeys[_key - 1] = arguments[_key];
        }
        (false && !(!(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))) && (0, _debug.assert)('You attempted to use @uniq/@union as a decorator directly, but it requires atleast one dependent key parameter', !(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))));
        var args = [dependentKey, ...additionalDependentKeys];
        return multiArrayMacro(args, function(dependentKeys) {
            var uniq = (0, _array.A)();
            var seen = new Set();
            dependentKeys.forEach(dependentKey => {
                var value = (0, _object.get)(this, dependentKey);
                if (isNativeOrEmberArray(value)) {
                    value.forEach(item => {
                        if (!seen.has(item)) {
                            seen.add(item);
                            uniq.push(item);
                        }
                    });
                }
            });
            return uniq;
        }, 'uniq');
    }
    /**
      A computed property which returns a new array with all the unique elements
      from an array, with uniqueness determined by specific key.
  
      Example:
  
      ```javascript
      import { set } from '@ember/object';
      import { uniqBy } from '@ember/object/computed';
  
      class Hamster {
        constructor(fruits) {
          set(this, 'fruits', fruits);
        }
  
        @uniqBy('fruits', 'id') uniqueFruits;
      }
  
      let hamster = new Hamster([
        { id: 1, 'banana' },
        { id: 2, 'grape' },
        { id: 3, 'peach' },
        { id: 1, 'banana' }
      ]);
  
      hamster.uniqueFruits; // [ { id: 1, 'banana' }, { id: 2, 'grape' }, { id: 3, 'peach' }]
      ```
  
      @method uniqBy
      @for @ember/object/computed
      @static
      @param {String} dependentKey
      @param {String} propertyKey
      @return {ComputedProperty} computes a new array with all the
      unique elements from the dependent array
      @public
    */
    function uniqBy(dependentKey, propertyKey) {
        (false && !(!(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))) && (0, _debug.assert)('You attempted to use @uniqBy as a decorator directly, but it requires `dependentKey` and `propertyKey` parameters', !(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))));
        (false && !(!/[[\]{}]/g.test(dependentKey)) && (0, _debug.assert)(`Dependent key passed to \`uniqBy\` computed macro shouldn't contain brace expanding pattern.`, !/[[\]{}]/g.test(dependentKey)));
        return (0, _object.computed)(`${dependentKey}.[]`, function() {
            var list = (0, _object.get)(this, dependentKey);
            return isNativeOrEmberArray(list) ? (0, _array.uniqBy)(list, propertyKey) : (0, _array.A)();
        }).readOnly();
    }
    /**
      A computed property which returns a new array with all the unique elements
      from one or more dependent arrays.
  
      Example:
  
      ```javascript
      import { set } from '@ember/object';
      import { union } from '@ember/object/computed';
  
      class Hamster {
        constructor(fruits, vegetables) {
          set(this, 'fruits', fruits);
          set(this, 'vegetables', vegetables);
        }
  
        @union('fruits', 'vegetables') uniqueFruits;
      });
  
      let hamster = new, Hamster(
        [
          'banana',
          'grape',
          'kale',
          'banana',
          'tomato'
        ],
        [
          'tomato',
          'carrot',
          'lettuce'
        ]
      );
  
      hamster.uniqueFruits; // ['banana', 'grape', 'kale', 'tomato', 'carrot', 'lettuce']
      ```
  
      @method union
      @for @ember/object/computed
      @static
      @param {String} propertyKey*
      @return {ComputedProperty} computes a new array with all the unique elements
      from one or more dependent arrays.
      @public
    */
    var union = _exports.union = uniq;
    /**
      A computed property which returns a new array with all the elements
      two or more dependent arrays have in common.
  
      Example:
  
      ```javascript
      import { set } from '@ember/object';
      import { intersect } from '@ember/object/computed';
  
      class FriendGroups {
        constructor(adaFriends, charlesFriends) {
          set(this, 'adaFriends', adaFriends);
          set(this, 'charlesFriends', charlesFriends);
        }
  
        @intersect('adaFriends', 'charlesFriends') friendsInCommon;
      }
  
      let groups = new FriendGroups(
        ['Charles Babbage', 'John Hobhouse', 'William King', 'Mary Somerville'],
        ['William King', 'Mary Somerville', 'Ada Lovelace', 'George Peacock']
      );
  
      groups.friendsInCommon; // ['William King', 'Mary Somerville']
      ```
  
      @method intersect
      @for @ember/object/computed
      @static
      @param {String} propertyKey*
      @return {ComputedProperty} computes a new array with all the duplicated
      elements from the dependent arrays
      @public
    */
    function intersect(dependentKey) {
        for (var _len2 = arguments.length, additionalDependentKeys = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            additionalDependentKeys[_key2 - 1] = arguments[_key2];
        }
        (false && !(!(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))) && (0, _debug.assert)('You attempted to use @intersect as a decorator directly, but it requires atleast one dependent key parameter', !(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))));
        var args = [dependentKey, ...additionalDependentKeys];
        return multiArrayMacro(args, function(dependentKeys) {
            var arrays = dependentKeys.map(dependentKey => {
                var array = (0, _object.get)(this, dependentKey);
                return Array.isArray(array) ? array : [];
            });
            var firstArray = arrays.pop();
            (false && !(firstArray) && (0, _debug.assert)('Attempted to apply multiArrayMacro for intersect without any dependentKeys', firstArray));
            var results = firstArray.filter(candidate => {
                for (var array of arrays) {
                    var found = false;
                    for (var item of array) {
                        if (item === candidate) {
                            found = true;
                            break;
                        }
                    }
                    if (found === false) {
                        return false;
                    }
                }
                return true;
            });
            return (0, _array.A)(results);
        }, 'intersect');
    }
    /**
      A computed property which returns a new array with all the properties from the
      first dependent array that are not in the second dependent array.
  
      Example:
  
      ```javascript
      import { set } from '@ember/object';
      import { setDiff } from '@ember/object/computed';
  
      class Hamster {
        constructor(likes, fruits) {
          set(this, 'likes', likes);
          set(this, 'fruits', fruits);
        }
  
        @setDiff('likes', 'fruits') wants;
      }
  
      let hamster = new Hamster(
        [
          'banana',
          'grape',
          'kale'
        ],
        [
          'grape',
          'kale',
        ]
      );
  
      hamster.wants; // ['banana']
      ```
  
      @method setDiff
      @for @ember/object/computed
      @static
      @param {String} setAProperty
      @param {String} setBProperty
      @return {ComputedProperty} computes a new array with all the items from the
      first dependent array that are not in the second dependent array
      @public
    */
    function setDiff(setAProperty, setBProperty) {
        (false && !(!(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))) && (0, _debug.assert)('You attempted to use @setDiff as a decorator directly, but it requires atleast one dependent key parameter', !(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))));
        (false && !(arguments.length === 2) && (0, _debug.assert)('`setDiff` computed macro requires exactly two dependent arrays.', arguments.length === 2));
        (false && !(!/[[\]{}]/g.test(setAProperty) && !/[[\]{}]/g.test(setBProperty)) && (0, _debug.assert)(`Dependent keys passed to \`setDiff\` computed macro shouldn't contain brace expanding pattern.`, !/[[\]{}]/g.test(setAProperty) && !/[[\]{}]/g.test(setBProperty)));
        return (0, _object.computed)(`${setAProperty}.[]`, `${setBProperty}.[]`, function() {
            var setA = (0, _object.get)(this, setAProperty);
            var setB = (0, _object.get)(this, setBProperty);
            if (!isNativeOrEmberArray(setA)) {
                return (0, _array.A)();
            }
            if (!isNativeOrEmberArray(setB)) {
                return setA;
            }
            return setA.filter(x => setB.indexOf(x) === -1);
        }).readOnly();
    }
    /**
      A computed property that returns the array of values for the provided
      dependent properties.
  
      Example:
  
      ```javascript
      import { set } from '@ember/object';
      import { collect } from '@ember/object/computed';
  
      class Hamster {
        @collect('hat', 'shirt') clothes;
      }
  
      let hamster = new Hamster();
  
      hamster.clothes; // [null, null]
  
      set(hamster, 'hat', 'Camp Hat');
      set(hamster, 'shirt', 'Camp Shirt');
      hamster.clothes; // ['Camp Hat', 'Camp Shirt']
      ```
  
      @method collect
      @for @ember/object/computed
      @static
      @param {String} dependentKey*
      @return {ComputedProperty} computed property which maps values of all passed
      in properties to an array.
      @public
    */
    function collect(dependentKey) {
        for (var _len3 = arguments.length, additionalDependentKeys = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            additionalDependentKeys[_key3 - 1] = arguments[_key3];
        }
        (false && !(!(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))) && (0, _debug.assert)('You attempted to use @collect as a decorator directly, but it requires atleast one dependent key parameter', !(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))));
        var dependentKeys = [dependentKey, ...additionalDependentKeys];
        return multiArrayMacro(dependentKeys, function() {
            var res = dependentKeys.map(key => {
                var val = (0, _object.get)(this, key);
                return val === undefined ? null : val;
            });
            return (0, _array.A)(res);
        }, 'collect');
    }

    function sort(itemsKey, additionalDependentKeysOrDefinition, sortDefinition) {
        (false && !(!(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))) && (0, _debug.assert)('You attempted to use @sort as a decorator directly, but it requires atleast an `itemsKey` parameter', !(0, _metal.isElementDescriptor)(Array.prototype.slice.call(arguments))));
        if (false /* DEBUG */ ) {
            var argumentsValid = false;
            if (arguments.length === 2) {
                argumentsValid = typeof itemsKey === 'string' && (typeof additionalDependentKeysOrDefinition === 'string' || typeof additionalDependentKeysOrDefinition === 'function');
            }
            if (arguments.length === 3) {
                argumentsValid = typeof itemsKey === 'string' && Array.isArray(additionalDependentKeysOrDefinition) && typeof sortDefinition === 'function';
            }
            (false && !(argumentsValid) && (0, _debug.assert)('The `sort` computed macro can either be used with an array of sort properties or with a sort function. If used with an array of sort properties, it must receive exactly two arguments: the key of the array to sort, and the key of the array of sort properties. If used with a sort function, it may receive up to three arguments: the key of the array to sort, an optional additional array of dependent keys for the computed property, and the sort function.', argumentsValid));
        }
        var additionalDependentKeys;
        var sortDefinitionOrString;
        if (Array.isArray(additionalDependentKeysOrDefinition)) {
            additionalDependentKeys = additionalDependentKeysOrDefinition;
            sortDefinitionOrString = sortDefinition;
        } else {
            additionalDependentKeys = [];
            sortDefinitionOrString = additionalDependentKeysOrDefinition;
        }
        if (typeof sortDefinitionOrString === 'function') {
            return customSort(itemsKey, additionalDependentKeys, sortDefinitionOrString);
        } else {
            return propertySort(itemsKey, sortDefinitionOrString);
        }
    }

    function customSort(itemsKey, additionalDependentKeys, comparator) {
        return arrayMacro(itemsKey, additionalDependentKeys, function(value) {
            return value.slice().sort((x, y) => comparator.call(this, x, y));
        });
    }
    // This one needs to dynamically set up and tear down observers on the itemsKey
    // depending on the sortProperties
    function propertySort(itemsKey, sortPropertiesKey) {
        var cp = (0, _metal.autoComputed)(function(key) {
            var sortProperties = (0, _object.get)(this, sortPropertiesKey);
            (false && !(function(arr) {
                return isNativeOrEmberArray(arr) && arr.every(s => typeof s === 'string');
            }(sortProperties)) && (0, _debug.assert)(`The sort definition for '${key}' on ${this} must be a function or an array of strings`, function(arr) {
                return isNativeOrEmberArray(arr) && arr.every(s => typeof s === 'string');
            }(sortProperties)));
            var itemsKeyIsAtThis = itemsKey === '@this';
            var normalizedSortProperties = normalizeSortProperties(sortProperties);
            var items = itemsKeyIsAtThis ? this : (0, _object.get)(this, itemsKey);
            if (!isNativeOrEmberArray(items)) {
                return (0, _array.A)();
            }
            if (normalizedSortProperties.length === 0) {
                return (0, _array.A)(items.slice());
            } else {
                return sortByNormalizedSortProperties(items, normalizedSortProperties);
            }
        }).readOnly();
        return cp;
    }

    function normalizeSortProperties(sortProperties) {
        var callback = p => {
            var [prop, direction] = p.split(':');
            direction = direction || 'asc';
            // SAFETY: There will always be at least one value returned by split
            return [prop, direction];
        };
        // This nonsense is necessary since technically the two map implementations diverge.
        return Array.isArray(sortProperties) ? sortProperties.map(callback) : sortProperties.map(callback);
    }

    function sortByNormalizedSortProperties(items, normalizedSortProperties) {
        return (0, _array.A)(items.slice().sort((itemA, itemB) => {
            for (var [prop, direction] of normalizedSortProperties) {
                var result = (0, _utils.compare)((0, _object.get)(itemA, prop), (0, _object.get)(itemB, prop));
                if (result !== 0) {
                    return direction === 'desc' ? -1 * result : result;
                }
            }
            return 0;
        }));
    }
});