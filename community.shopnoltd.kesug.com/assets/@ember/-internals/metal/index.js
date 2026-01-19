define("@ember/-internals/metal/index", ["exports", "@ember/-internals/meta", "@ember/-internals/utils", "@ember/debug", "@glimmer/destroyable", "@glimmer/validator", "@glimmer/util", "@ember/-internals/environment", "@ember/runloop", "@glimmer/manager", "@ember/array/-internals", "ember/version", "@ember/-internals/owner"], function(_exports, _meta3, _utils, _debug, _destroyable, _validator, _util, _environment, _runloop, _manager, _internals, _version, _owner) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.TrackedDescriptor = _exports.SYNC_OBSERVERS = _exports.PROXY_CONTENT = _exports.PROPERTY_DID_CHANGE = _exports.NAMESPACES_BY_ID = _exports.NAMESPACES = _exports.Libraries = _exports.DEBUG_INJECTION_FUNCTIONS = _exports.ComputedProperty = _exports.ComputedDescriptor = _exports.ASYNC_OBSERVERS = void 0;
    _exports._getPath = _getPath;
    _exports._getProp = _getProp;
    _exports._setProp = _setProp;
    _exports.activateObserver = activateObserver;
    _exports.addArrayObserver = addArrayObserver;
    _exports.addListener = addListener;
    _exports.addNamespace = addNamespace;
    _exports.addObserver = addObserver;
    _exports.alias = alias;
    _exports.arrayContentDidChange = arrayContentDidChange;
    _exports.arrayContentWillChange = arrayContentWillChange;
    _exports.autoComputed = autoComputed;
    _exports.beginPropertyChanges = beginPropertyChanges;
    _exports.cached = void 0;
    _exports.changeProperties = changeProperties;
    _exports.computed = computed;
    Object.defineProperty(_exports, "createCache", {
        enumerable: true,
        get: function() {
            return _validator.createCache;
        }
    });
    _exports.defineDecorator = defineDecorator;
    _exports.defineProperty = defineProperty;
    _exports.defineValue = defineValue;
    _exports.deprecateProperty = deprecateProperty;
    _exports.descriptorForDecorator = descriptorForDecorator;
    _exports.descriptorForProperty = descriptorForProperty;
    _exports.eachProxyArrayDidChange = eachProxyArrayDidChange;
    _exports.eachProxyArrayWillChange = eachProxyArrayWillChange;
    _exports.endPropertyChanges = endPropertyChanges;
    _exports.expandProperties = expandProperties;
    _exports.findNamespace = findNamespace;
    _exports.findNamespaces = findNamespaces;
    _exports.flushAsyncObservers = flushAsyncObservers;
    _exports.get = get;
    _exports.getCachedValueFor = getCachedValueFor;
    _exports.getProperties = getProperties;
    Object.defineProperty(_exports, "getValue", {
        enumerable: true,
        get: function() {
            return _validator.getValue;
        }
    });
    _exports.hasListeners = hasListeners;
    _exports.hasUnknownProperty = hasUnknownProperty;
    _exports.inject = inject;
    _exports.isClassicDecorator = isClassicDecorator;
    _exports.isComputed = isComputed;
    Object.defineProperty(_exports, "isConst", {
        enumerable: true,
        get: function() {
            return _validator.isConst;
        }
    });
    _exports.isElementDescriptor = isElementDescriptor;
    _exports.isNamespaceSearchDisabled = isSearchDisabled;
    _exports.libraries = void 0;
    _exports.makeComputedDecorator = makeComputedDecorator;
    _exports.markObjectAsDirty = markObjectAsDirty;
    _exports.nativeDescDecorator = nativeDescDecorator;
    _exports.notifyPropertyChange = notifyPropertyChange;
    _exports.objectAt = objectAt;
    _exports.on = on;
    _exports.processAllNamespaces = processAllNamespaces;
    _exports.processNamespace = processNamespace;
    _exports.removeArrayObserver = removeArrayObserver;
    _exports.removeListener = removeListener;
    _exports.removeNamespace = removeNamespace;
    _exports.removeObserver = removeObserver;
    _exports.replace = replace;
    _exports.replaceInNativeArray = replaceInNativeArray;
    _exports.revalidateObservers = revalidateObservers;
    _exports.sendEvent = sendEvent;
    _exports.set = set;
    _exports.setClassicDecorator = setClassicDecorator;
    _exports.setNamespaceSearchDisabled = setSearchDisabled;
    _exports.setProperties = setProperties;
    _exports.setUnprocessedMixins = setUnprocessedMixins;
    _exports.tagForObject = tagForObject;
    _exports.tagForProperty = tagForProperty;
    _exports.tracked = tracked;
    _exports.trySet = trySet;
    /*
      The event system uses a series of nested hashes to store listeners on an
      object. When a listener is registered, or when an event arrives, these
      hashes are consulted to determine which target and action pair to invoke.
  
      The hashes are stored in the object's meta hash, and look like this:
  
          // Object's meta hash
          {
            listeners: {       // variable name: `listenerSet`
              "foo:change": [ // variable name: `actions`
                target, method, once
              ]
            }
          }
  
    */
    /**
      Add an event listener
  
      @method addListener
      @static
      @for @ember/object/events
      @param obj
      @param {String} eventName
      @param {Object|Function} target A target object or a function
      @param {Function|String} method A function or the name of a function to be called on `target`
      @param {Boolean} once A flag whether a function should only be called once
      @public
    */
    function addListener(obj, eventName, target, method, once, sync) {
        if (sync === void 0) {
            sync = true;
        }
        (false && !(Boolean(obj) && Boolean(eventName)) && (0, _debug.assert)('You must pass at least an object and event name to addListener', Boolean(obj) && Boolean(eventName)));
        if (!method && 'function' === typeof target) {
            method = target;
            target = null;
        }
        (0, _meta3.meta)(obj).addToListeners(eventName, target, method, once === true, sync);
    }
    /**
      Remove an event listener
  
      Arguments should match those passed to `addListener`.
  
      @method removeListener
      @static
      @for @ember/object/events
      @param obj
      @param {String} eventName
      @param {Object|Function} target A target object or a function
      @param {Function|String} method A function or the name of a function to be called on `target`
      @public
    */
    function removeListener(obj, eventName, targetOrFunction, functionOrName) {
        (false && !(Boolean(obj) && Boolean(eventName) && (typeof targetOrFunction === 'function' || typeof targetOrFunction === 'object' && Boolean(functionOrName))) && (0, _debug.assert)('You must pass at least an object, event name, and method or target and method/method name to removeListener', Boolean(obj) && Boolean(eventName) && (typeof targetOrFunction === 'function' || typeof targetOrFunction === 'object' && Boolean(functionOrName))));
        var target, method;
        if (typeof targetOrFunction === 'object') {
            target = targetOrFunction;
            method = functionOrName;
        } else {
            target = null;
            method = targetOrFunction;
        }
        var m = (0, _meta3.meta)(obj);
        m.removeFromListeners(eventName, target, method);
    }
    /**
      Send an event. The execution of suspended listeners
      is skipped, and once listeners are removed. A listener without
      a target is executed on the passed object. If an array of actions
      is not passed, the actions stored on the passed object are invoked.
  
      @method sendEvent
      @static
      @for @ember/object/events
      @param obj
      @param {String} eventName
      @param {Array} params Optional parameters for each listener.
      @return {Boolean} if the event was delivered to one or more actions
      @public
    */
    function sendEvent(obj, eventName, params, actions, _meta) {
        if (actions === undefined) {
            var _meta2 = _meta === undefined ? (0, _meta3.peekMeta)(obj) : _meta;
            actions = _meta2 !== null ? _meta2.matchingListeners(eventName) : undefined;
        }
        if (actions === undefined || actions.length === 0) {
            return false;
        }
        for (var i = actions.length - 3; i >= 0; i -= 3) {
            // looping in reverse for once listeners
            var target = actions[i];
            var method = actions[i + 1];
            var once = actions[i + 2];
            if (!method) {
                continue;
            }
            if (once) {
                removeListener(obj, eventName, target, method);
            }
            if (!target) {
                target = obj;
            }
            var type = typeof method;
            if (type === 'string' || type === 'symbol') {
                method = target[method];
            }
            method.apply(target, params);
        }
        return true;
    }
    /**
      @public
      @method hasListeners
      @static
      @for @ember/object/events
      @param obj
      @param {String} eventName
      @return {Boolean} if `obj` has listeners for event `eventName`
    */
    function hasListeners(obj, eventName) {
        var meta = (0, _meta3.peekMeta)(obj);
        if (meta === null) {
            return false;
        }
        var matched = meta.matchingListeners(eventName);
        return matched !== undefined && matched.length > 0;
    }
    /**
      Define a property as a function that should be executed when
      a specified event or events are triggered.
  
      ``` javascript
      import EmberObject from '@ember/object';
      import { on } from '@ember/object/evented';
      import { sendEvent } from '@ember/object/events';
  
      let Job = EmberObject.extend({
        logCompleted: on('completed', function() {
          console.log('Job completed!');
        })
      });
  
      let job = Job.create();
  
      sendEvent(job, 'completed'); // Logs 'Job completed!'
     ```
  
      @method on
      @static
      @for @ember/object/evented
      @param {String} eventNames*
      @param {Function} func
      @return {Function} the listener function, passed as last argument to on(...)
      @public
    */
    function on() {
        for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
            args[_key2] = arguments[_key2];
        }
        var func = args.pop();
        var events = args;
        (false && !(typeof func === 'function') && (0, _debug.assert)('on expects function as last argument', typeof func === 'function'));
        (false && !(events.length > 0 && events.every(p => typeof p === 'string' && p.length > 0)) && (0, _debug.assert)('on called without valid event names', events.length > 0 && events.every(p => typeof p === 'string' && p.length > 0)));
        (0, _utils.setListeners)(func, events);
        return func;
    }
    var AFTER_OBSERVERS = ':change';

    function changeEvent(keyName) {
        return keyName + AFTER_OBSERVERS;
    }
    var SYNC_DEFAULT = !_environment.ENV._DEFAULT_ASYNC_OBSERVERS;
    var SYNC_OBSERVERS = _exports.SYNC_OBSERVERS = new Map();
    var ASYNC_OBSERVERS = _exports.ASYNC_OBSERVERS = new Map();
    /**
    @module @ember/object
    */
    /**
      @method addObserver
      @static
      @for @ember/object/observers
      @param obj
      @param {String} path
      @param {Object|Function} target
      @param {Function|String} [method]
      @public
    */
    function addObserver(obj, path, target, method, sync) {
        if (sync === void 0) {
            sync = SYNC_DEFAULT;
        }
        var eventName = changeEvent(path);
        addListener(obj, eventName, target, method, false, sync);
        var meta = (0, _meta3.peekMeta)(obj);
        if (meta === null || !(meta.isPrototypeMeta(obj) || meta.isInitializing())) {
            activateObserver(obj, eventName, sync);
        }
    }
    /**
      @method removeObserver
      @static
      @for @ember/object/observers
      @param obj
      @param {String} path
      @param {Object|Function} target
      @param {Function|String} [method]
      @public
    */
    function removeObserver(obj, path, target, method, sync) {
        if (sync === void 0) {
            sync = SYNC_DEFAULT;
        }
        var eventName = changeEvent(path);
        var meta = (0, _meta3.peekMeta)(obj);
        if (meta === null || !(meta.isPrototypeMeta(obj) || meta.isInitializing())) {
            deactivateObserver(obj, eventName, sync);
        }
        removeListener(obj, eventName, target, method);
    }

    function getOrCreateActiveObserversFor(target, sync) {
        var observerMap = sync === true ? SYNC_OBSERVERS : ASYNC_OBSERVERS;
        if (!observerMap.has(target)) {
            observerMap.set(target, new Map());
            (0, _destroyable.registerDestructor)(target, () => destroyObservers(target), true);
        }
        return observerMap.get(target);
    }

    function activateObserver(target, eventName, sync) {
        if (sync === void 0) {
            sync = false;
        }
        var activeObservers = getOrCreateActiveObserversFor(target, sync);
        if (activeObservers.has(eventName)) {
            activeObservers.get(eventName).count++;
        } else {
            var path = eventName.substring(0, eventName.lastIndexOf(':'));
            var tag = getChainTagsForKey(target, path, (0, _validator.tagMetaFor)(target), (0, _meta3.peekMeta)(target));
            activeObservers.set(eventName, {
                count: 1,
                path,
                tag,
                lastRevision: (0, _validator.valueForTag)(tag),
                suspended: false
            });
        }
    }
    var DEACTIVATE_SUSPENDED = false;
    var SCHEDULED_DEACTIVATE = [];

    function deactivateObserver(target, eventName, sync) {
        if (sync === void 0) {
            sync = false;
        }
        if (DEACTIVATE_SUSPENDED === true) {
            SCHEDULED_DEACTIVATE.push([target, eventName, sync]);
            return;
        }
        var observerMap = sync === true ? SYNC_OBSERVERS : ASYNC_OBSERVERS;
        var activeObservers = observerMap.get(target);
        if (activeObservers !== undefined) {
            var observer = activeObservers.get(eventName);
            observer.count--;
            if (observer.count === 0) {
                activeObservers.delete(eventName);
                if (activeObservers.size === 0) {
                    observerMap.delete(target);
                }
            }
        }
    }

    function suspendedObserverDeactivation() {
        DEACTIVATE_SUSPENDED = true;
    }

    function resumeObserverDeactivation() {
        DEACTIVATE_SUSPENDED = false;
        for (var [target, eventName, sync] of SCHEDULED_DEACTIVATE) {
            deactivateObserver(target, eventName, sync);
        }
        SCHEDULED_DEACTIVATE = [];
    }
    /**
     * Primarily used for cases where we are redefining a class, e.g. mixins/reopen
     * being applied later. Revalidates all the observers, resetting their tags.
     *
     * @private
     * @param target
     */
    function revalidateObservers(target) {
        if (ASYNC_OBSERVERS.has(target)) {
            ASYNC_OBSERVERS.get(target).forEach(observer => {
                observer.tag = getChainTagsForKey(target, observer.path, (0, _validator.tagMetaFor)(target), (0, _meta3.peekMeta)(target));
                observer.lastRevision = (0, _validator.valueForTag)(observer.tag);
            });
        }
        if (SYNC_OBSERVERS.has(target)) {
            SYNC_OBSERVERS.get(target).forEach(observer => {
                observer.tag = getChainTagsForKey(target, observer.path, (0, _validator.tagMetaFor)(target), (0, _meta3.peekMeta)(target));
                observer.lastRevision = (0, _validator.valueForTag)(observer.tag);
            });
        }
    }
    var lastKnownRevision = 0;

    function flushAsyncObservers(shouldSchedule) {
        if (shouldSchedule === void 0) {
            shouldSchedule = true;
        }
        var currentRevision = (0, _validator.valueForTag)(_validator.CURRENT_TAG);
        if (lastKnownRevision === currentRevision) {
            return;
        }
        lastKnownRevision = currentRevision;
        ASYNC_OBSERVERS.forEach((activeObservers, target) => {
            var meta = (0, _meta3.peekMeta)(target);
            activeObservers.forEach((observer, eventName) => {
                if (!(0, _validator.validateTag)(observer.tag, observer.lastRevision)) {
                    var sendObserver = () => {
                        try {
                            sendEvent(target, eventName, [target, observer.path], undefined, meta);
                        } finally {
                            observer.tag = getChainTagsForKey(target, observer.path, (0, _validator.tagMetaFor)(target), (0, _meta3.peekMeta)(target));
                            observer.lastRevision = (0, _validator.valueForTag)(observer.tag);
                        }
                    };
                    if (shouldSchedule) {
                        (0, _runloop.schedule)('actions', sendObserver);
                    } else {
                        sendObserver();
                    }
                }
            });
        });
    }

    function flushSyncObservers() {
        // When flushing synchronous observers, we know that something has changed (we
        // only do this during a notifyPropertyChange), so there's no reason to check
        // a global revision.
        SYNC_OBSERVERS.forEach((activeObservers, target) => {
            var meta = (0, _meta3.peekMeta)(target);
            activeObservers.forEach((observer, eventName) => {
                if (!observer.suspended && !(0, _validator.validateTag)(observer.tag, observer.lastRevision)) {
                    try {
                        observer.suspended = true;
                        sendEvent(target, eventName, [target, observer.path], undefined, meta);
                    } finally {
                        observer.tag = getChainTagsForKey(target, observer.path, (0, _validator.tagMetaFor)(target), (0, _meta3.peekMeta)(target));
                        observer.lastRevision = (0, _validator.valueForTag)(observer.tag);
                        observer.suspended = false;
                    }
                }
            });
        });
    }

    function setObserverSuspended(target, property, suspended) {
        var activeObservers = SYNC_OBSERVERS.get(target);
        if (!activeObservers) {
            return;
        }
        var observer = activeObservers.get(changeEvent(property));
        if (observer) {
            observer.suspended = suspended;
        }
    }

    function destroyObservers(target) {
        if (SYNC_OBSERVERS.size > 0) SYNC_OBSERVERS.delete(target);
        if (ASYNC_OBSERVERS.size > 0) ASYNC_OBSERVERS.delete(target);
    }

    // This is exported for `@tracked`, but should otherwise be avoided. Use `tagForObject`.
    var SELF_TAG = (0, _utils.symbol)('SELF_TAG');

    function tagForProperty(obj, propertyKey, addMandatorySetter, meta) {
        if (addMandatorySetter === void 0) {
            addMandatorySetter = false;
        }
        var customTagFor = (0, _manager.getCustomTagFor)(obj);
        if (customTagFor !== undefined) {
            return customTagFor(obj, propertyKey, addMandatorySetter);
        }
        var tag = (0, _validator.tagFor)(obj, propertyKey, meta);
        if (false /* DEBUG */ && addMandatorySetter) {
            (0, _utils.setupMandatorySetter)(tag, obj, propertyKey);
        }
        return tag;
    }

    function tagForObject(obj) {
        if ((0, _utils.isObject)(obj)) {
            if (false /* DEBUG */ ) {
                (false && !(!(0, _destroyable.isDestroyed)(obj)) && (0, _debug.assert)((0, _destroyable.isDestroyed)(obj) ? `Cannot create a new tag for \`${(0, _utils.toString)(obj)}\` after it has been destroyed.` : '', !(0, _destroyable.isDestroyed)(obj)));
            }
            return (0, _validator.tagFor)(obj, SELF_TAG);
        }
        return _validator.CONSTANT_TAG;
    }

    function markObjectAsDirty(obj, propertyKey) {
        (0, _validator.dirtyTagFor)(obj, propertyKey);
        (0, _validator.dirtyTagFor)(obj, SELF_TAG);
    }

    /**
     @module ember
     @private
     */
    var PROPERTY_DID_CHANGE = _exports.PROPERTY_DID_CHANGE = Symbol('PROPERTY_DID_CHANGE');

    function hasPropertyDidChange(obj) {
        return obj != null && typeof obj === 'object' && typeof obj[PROPERTY_DID_CHANGE] === 'function';
    }
    var deferred = 0;
    /**
      This function is called just after an object property has changed.
      It will notify any observers and clear caches among other things.
  
      Normally you will not need to call this method directly but if for some
      reason you can't directly watch a property you can invoke this method
      manually.
  
      @method notifyPropertyChange
      @for @ember/object
      @param {Object} obj The object with the property that will change
      @param {String} keyName The property key (or path) that will change.
      @param {Meta} [_meta] The objects meta.
      @param {unknown} [value] The new value to set for the property
      @return {void}
      @since 3.1.0
      @public
    */
    function notifyPropertyChange(obj, keyName, _meta, value) {
        var meta = _meta === undefined ? (0, _meta3.peekMeta)(obj) : _meta;
        if (meta !== null && (meta.isInitializing() || meta.isPrototypeMeta(obj))) {
            return;
        }
        markObjectAsDirty(obj, keyName);
        if (deferred <= 0) {
            flushSyncObservers();
        }
        if (PROPERTY_DID_CHANGE in obj) {
            // It's redundant to do this here, but we don't want to check above so we can avoid an extra function call in prod.
            (false && !(hasPropertyDidChange(obj)) && (0, _debug.assert)('property did change hook is invalid', hasPropertyDidChange(obj))); // we need to check the arguments length here; there's a check in Component's `PROPERTY_DID_CHANGE`
            // that checks its arguments length, so we have to explicitly not call this with `value`
            // if it is not passed to `notifyPropertyChange`
            if (arguments.length === 4) {
                obj[PROPERTY_DID_CHANGE](keyName, value);
            } else {
                obj[PROPERTY_DID_CHANGE](keyName);
            }
        }
    }
    /**
      @method beginPropertyChanges
      @chainable
      @private
    */
    function beginPropertyChanges() {
        deferred++;
        suspendedObserverDeactivation();
    }
    /**
      @method endPropertyChanges
      @private
    */
    function endPropertyChanges() {
        deferred--;
        if (deferred <= 0) {
            flushSyncObservers();
            resumeObserverDeactivation();
        }
    }
    /**
      Make a series of property changes together in an
      exception-safe way.
  
      ```javascript
      Ember.changeProperties(function() {
        obj1.set('foo', mayBlowUpWhenSet);
        obj2.set('bar', baz);
      });
      ```
  
      @method changeProperties
      @param {Function} callback
      @private
    */
    function changeProperties(callback) {
        beginPropertyChanges();
        try {
            callback();
        } finally {
            endPropertyChanges();
        }
    }

    function arrayContentWillChange(array, startIdx, removeAmt, addAmt) {
        // if no args are passed assume everything changes
        if (startIdx === undefined) {
            startIdx = 0;
            removeAmt = addAmt = -1;
        } else {
            if (removeAmt === undefined) {
                removeAmt = -1;
            }
            if (addAmt === undefined) {
                addAmt = -1;
            }
        }
        sendEvent(array, '@array:before', [array, startIdx, removeAmt, addAmt]);
        return array;
    }

    function arrayContentDidChange(array, startIdx, removeAmt, addAmt, notify) {
        if (notify === void 0) {
            notify = true;
        }
        // if no args are passed assume everything changes
        if (startIdx === undefined) {
            startIdx = 0;
            removeAmt = addAmt = -1;
        } else {
            if (removeAmt === undefined) {
                removeAmt = -1;
            }
            if (addAmt === undefined) {
                addAmt = -1;
            }
        }
        var meta = (0, _meta3.peekMeta)(array);
        if (notify) {
            if (addAmt < 0 || removeAmt < 0 || addAmt - removeAmt !== 0) {
                notifyPropertyChange(array, 'length', meta);
            }
            notifyPropertyChange(array, '[]', meta);
        }
        sendEvent(array, '@array:change', [array, startIdx, removeAmt, addAmt]);
        if (meta !== null) {
            var length = array.length;
            var addedAmount = addAmt === -1 ? 0 : addAmt;
            var removedAmount = removeAmt === -1 ? 0 : removeAmt;
            var delta = addedAmount - removedAmount;
            var previousLength = length - delta;
            var normalStartIdx = startIdx < 0 ? previousLength + startIdx : startIdx;
            if (meta.revisionFor('firstObject') !== undefined && normalStartIdx === 0) {
                notifyPropertyChange(array, 'firstObject', meta);
            }
            if (meta.revisionFor('lastObject') !== undefined) {
                var previousLastIndex = previousLength - 1;
                var lastAffectedIndex = normalStartIdx + removedAmount;
                if (previousLastIndex < lastAffectedIndex) {
                    notifyPropertyChange(array, 'lastObject', meta);
                }
            }
        }
        return array;
    }
    var EMPTY_ARRAY = Object.freeze([]);

    function objectAt(array, index) {
        if (Array.isArray(array)) {
            return array[index];
        } else {
            return array.objectAt(index);
        }
    }
    // Ideally, we'd use MutableArray.detect but for unknown reasons this causes
    // the node tests to fail strangely.
    function isMutableArray(obj) {
        return obj != null && typeof obj.replace === 'function';
    }

    function replace(array, start, deleteCount, items) {
        if (items === void 0) {
            items = EMPTY_ARRAY;
        }
        if (isMutableArray(array)) {
            array.replace(start, deleteCount, items);
        } else {
            (false && !(Array.isArray(array)) && (0, _debug.assert)('Can only replace content of a native array or MutableArray', Array.isArray(array)));
            replaceInNativeArray(array, start, deleteCount, items);
        }
    }
    var CHUNK_SIZE = 60000;
    // To avoid overflowing the stack, we splice up to CHUNK_SIZE items at a time.
    // See https://code.google.com/p/chromium/issues/detail?id=56588 for more details.
    function replaceInNativeArray(array, start, deleteCount, items) {
        arrayContentWillChange(array, start, deleteCount, items.length);
        if (items.length <= CHUNK_SIZE) {
            array.splice(start, deleteCount, ...items);
        } else {
            array.splice(start, deleteCount);
            for (var i = 0; i < items.length; i += CHUNK_SIZE) {
                var chunk = items.slice(i, i + CHUNK_SIZE);
                array.splice(start + i, 0, ...chunk);
            }
        }
        arrayContentDidChange(array, start, deleteCount, items.length);
    }

    function arrayObserversHelper(obj, target, opts, operation) {
        var {
            willChange,
            didChange
        } = opts;
        operation(obj, '@array:before', target, willChange);
        operation(obj, '@array:change', target, didChange);
        /*
         * Array proxies have a `_revalidate` method which must be called to set
         * up their internal array observation systems.
         */
        obj._revalidate ? .();
        return obj;
    }

    function addArrayObserver(array, target, opts) {
        return arrayObserversHelper(array, target, opts, addListener);
    }

    function removeArrayObserver(array, target, opts) {
        return arrayObserversHelper(array, target, opts, removeListener);
    }
    var CHAIN_PASS_THROUGH = new _util._WeakSet();

    function finishLazyChains(meta, key, value) {
        var lazyTags = meta.readableLazyChainsFor(key);
        if (lazyTags === undefined) {
            return;
        }
        if ((0, _utils.isObject)(value)) {
            for (var [tag, deps] of lazyTags) {
                (0, _validator.updateTag)(tag, getChainTagsForKey(value, deps, (0, _validator.tagMetaFor)(value), (0, _meta3.peekMeta)(value)));
            }
        }
        lazyTags.length = 0;
    }

    function getChainTagsForKeys(obj, keys, tagMeta, meta) {
        var tags = [];
        for (var key of keys) {
            getChainTags(tags, obj, key, tagMeta, meta);
        }
        return (0, _validator.combine)(tags);
    }

    function getChainTagsForKey(obj, key, tagMeta, meta) {
        return (0, _validator.combine)(getChainTags([], obj, key, tagMeta, meta));
    }

    function getChainTags(chainTags, obj, path, tagMeta, meta$1) {
        var current = obj;
        var currentTagMeta = tagMeta;
        var currentMeta = meta$1;
        var pathLength = path.length;
        var segmentEnd = -1;
        // prevent closures
        var segment, descriptor;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            var lastSegmentEnd = segmentEnd + 1;
            segmentEnd = path.indexOf('.', lastSegmentEnd);
            if (segmentEnd === -1) {
                segmentEnd = pathLength;
            }
            segment = path.slice(lastSegmentEnd, segmentEnd);
            // If the segment is an @each, we can process it and then break
            if (segment === '@each' && segmentEnd !== pathLength) {
                lastSegmentEnd = segmentEnd + 1;
                segmentEnd = path.indexOf('.', lastSegmentEnd);
                var arrLength = current.length;
                if (typeof arrLength !== 'number' ||
                    // TODO: should the second test be `isEmberArray` instead?
                    !(Array.isArray(current) || 'objectAt' in current)) {
                    // If the current object isn't an array, there's nothing else to do,
                    // we don't watch individual properties. Break out of the loop.
                    break;
                } else if (arrLength === 0) {
                    // Fast path for empty arrays
                    chainTags.push(tagForProperty(current, '[]'));
                    break;
                }
                if (segmentEnd === -1) {
                    segment = path.slice(lastSegmentEnd);
                } else {
                    // Deprecated, remove once we turn the deprecation into an assertion
                    segment = path.slice(lastSegmentEnd, segmentEnd);
                }
                // Push the tags for each item's property
                for (var i = 0; i < arrLength; i++) {
                    var item = objectAt(current, i);
                    if (item) {
                        (false && !(typeof item === 'object') && (0, _debug.assert)(`When using @each to observe the array \`${current.toString()}\`, the items in the array must be objects`, typeof item === 'object'));
                        chainTags.push(tagForProperty(item, segment, true));
                        currentMeta = (0, _meta3.peekMeta)(item);
                        descriptor = currentMeta !== null ? currentMeta.peekDescriptors(segment) : undefined;
                        // If the key is an alias, we need to bootstrap it
                        if (descriptor !== undefined && typeof descriptor.altKey === 'string') {
                            item[segment];
                        }
                    }
                }
                // Push the tag for the array length itself
                chainTags.push(tagForProperty(current, '[]', true, currentTagMeta));
                break;
            }
            var propertyTag = tagForProperty(current, segment, true, currentTagMeta);
            descriptor = currentMeta !== null ? currentMeta.peekDescriptors(segment) : undefined;
            chainTags.push(propertyTag);
            // If we're at the end of the path, processing the last segment, and it's
            // not an alias, we should _not_ get the last value, since we already have
            // its tag. There's no reason to access it and do more work.
            if (segmentEnd === pathLength) {
                // If the key was an alias, we should always get the next value in order to
                // bootstrap the alias. This is because aliases, unlike other CPs, should
                // always be in sync with the aliased value.
                if (CHAIN_PASS_THROUGH.has(descriptor)) {
                    current[segment];
                }
                break;
            }
            if (descriptor === undefined) {
                // If the descriptor is undefined, then its a normal property, so we should
                // lookup the value to chain off of like normal.
                if (!(segment in current) && typeof current.unknownProperty === 'function') {
                    current = current.unknownProperty(segment);
                } else {
                    current = current[segment];
                }
            } else if (CHAIN_PASS_THROUGH.has(descriptor)) {
                current = current[segment];
            } else {
                // If the descriptor is defined, then its a normal CP (not an alias, which
                // would have been handled earlier). We get the last revision to check if
                // the CP is still valid, and if so we use the cached value. If not, then
                // we create a lazy chain lookup, and the next time the CP is calculated,
                // it will update that lazy chain.
                var instanceMeta = currentMeta.source === current ? currentMeta : (0, _meta3.meta)(current);
                var lastRevision = instanceMeta.revisionFor(segment);
                if (lastRevision !== undefined && (0, _validator.validateTag)(propertyTag, lastRevision)) {
                    current = instanceMeta.valueFor(segment);
                } else {
                    // use metaFor here to ensure we have the meta for the instance
                    var lazyChains = instanceMeta.writableLazyChainsFor(segment);
                    var rest = path.substring(segmentEnd + 1);
                    var placeholderTag = (0, _validator.createUpdatableTag)();
                    lazyChains.push([placeholderTag, rest]);
                    chainTags.push(placeholderTag);
                    break;
                }
            }
            if (!(0, _utils.isObject)(current)) {
                // we've hit the end of the chain for now, break out
                break;
            }
            currentTagMeta = (0, _validator.tagMetaFor)(current);
            currentMeta = (0, _meta3.peekMeta)(current);
        }
        return chainTags;
    }

    function isElementDescriptor(args) {
        var [maybeTarget, maybeKey, maybeDesc] = args;
        return (
            // Ensure we have the right number of args
            args.length === 3 && (
                // Make sure the target is a class or object (prototype)
                typeof maybeTarget === 'function' || typeof maybeTarget === 'object' && maybeTarget !== null) &&
            // Make sure the key is a string
            typeof maybeKey === 'string' && (
                // Make sure the descriptor is the right shape
                typeof maybeDesc === 'object' && maybeDesc !== null || maybeDesc === undefined)
        );
    }

    function nativeDescDecorator(propertyDesc) {
        var decorator = function() {
            return propertyDesc;
        };
        setClassicDecorator(decorator);
        return decorator;
    }
    /**
      Objects of this type can implement an interface to respond to requests to
      get and set. The default implementation handles simple properties.
  
      @class Descriptor
      @private
    */
    class ComputedDescriptor {
        constructor() {
            this.enumerable = true;
            this.configurable = true;
            this._dependentKeys = undefined;
            this._meta = undefined;
        }
        setup(_obj, keyName, _propertyDesc, meta) {
            meta.writeDescriptors(keyName, this);
        }
        teardown(_obj, keyName, meta) {
            meta.removeDescriptors(keyName);
        }
    }
    _exports.ComputedDescriptor = ComputedDescriptor;
    var COMPUTED_GETTERS;
    if (false /* DEBUG */ ) {
        COMPUTED_GETTERS = new _util._WeakSet();
    }

    function DESCRIPTOR_GETTER_FUNCTION(name, descriptor) {
        function getter() {
            return descriptor.get(this, name);
        }
        if (false /* DEBUG */ ) {
            COMPUTED_GETTERS.add(getter);
        }
        return getter;
    }

    function DESCRIPTOR_SETTER_FUNCTION(name, descriptor) {
        var set = function CPSETTER_FUNCTION(value) {
            return descriptor.set(this, name, value);
        };
        COMPUTED_SETTERS.add(set);
        return set;
    }
    var COMPUTED_SETTERS = new _util._WeakSet();

    function makeComputedDecorator(desc, DecoratorClass) {
        var decorator = function COMPUTED_DECORATOR(target, key, propertyDesc, maybeMeta, isClassicDecorator) {
            (false && !(isClassicDecorator || !propertyDesc || !propertyDesc.get || !COMPUTED_GETTERS.has(propertyDesc.get)) && (0, _debug.assert)(`Only one computed property decorator can be applied to a class field or accessor, but '${key}' was decorated twice. You may have added the decorator to both a getter and setter, which is unnecessary.`, isClassicDecorator || !propertyDesc || !propertyDesc.get || !COMPUTED_GETTERS.has(propertyDesc.get)));
            var meta$1 = arguments.length === 3 ? (0, _meta3.meta)(target) : maybeMeta;
            desc.setup(target, key, propertyDesc, meta$1);
            var computedDesc = {
                enumerable: desc.enumerable,
                configurable: desc.configurable,
                get: DESCRIPTOR_GETTER_FUNCTION(key, desc),
                set: DESCRIPTOR_SETTER_FUNCTION(key, desc)
            };
            return computedDesc;
        };
        setClassicDecorator(decorator, desc);
        Object.setPrototypeOf(decorator, DecoratorClass.prototype);
        return decorator;
    }
    /////////////
    var DECORATOR_DESCRIPTOR_MAP = new WeakMap();
    /**
      Returns the CP descriptor associated with `obj` and `keyName`, if any.
  
      @method descriptorForProperty
      @param {Object} obj the object to check
      @param {String} keyName the key to check
      @return {Descriptor}
      @private
    */
    function descriptorForProperty(obj, keyName, _meta) {
        (false && !(obj !== null) && (0, _debug.assert)('Cannot call `descriptorForProperty` on null', obj !== null));
        (false && !(obj !== undefined) && (0, _debug.assert)('Cannot call `descriptorForProperty` on undefined', obj !== undefined));
        (false && !(typeof obj === 'object' || typeof obj === 'function') && (0, _debug.assert)(`Cannot call \`descriptorForProperty\` on ${typeof obj}`, typeof obj === 'object' || typeof obj === 'function'));
        var meta = _meta === undefined ? (0, _meta3.peekMeta)(obj) : _meta;
        if (meta !== null) {
            return meta.peekDescriptors(keyName);
        }
    }

    function descriptorForDecorator(dec) {
        return DECORATOR_DESCRIPTOR_MAP.get(dec);
    }
    /**
      Check whether a value is a decorator
  
      @method isClassicDecorator
      @param {any} possibleDesc the value to check
      @return {boolean}
      @private
    */
    function isClassicDecorator(dec) {
        return typeof dec === 'function' && DECORATOR_DESCRIPTOR_MAP.has(dec);
    }
    /**
      Set a value as a decorator
  
      @method setClassicDecorator
      @param {function} decorator the value to mark as a decorator
      @private
    */
    function setClassicDecorator(dec, value) {
        if (value === void 0) {
            value = true;
        }
        DECORATOR_DESCRIPTOR_MAP.set(dec, value);
    }

    /**
    @module @ember/object
    */
    var END_WITH_EACH_REGEX = /\.@each$/;
    /**
      Expands `pattern`, invoking `callback` for each expansion.
  
      The only pattern supported is brace-expansion, anything else will be passed
      once to `callback` directly.
  
      Example
  
      ```js
      import { expandProperties } from '@ember/object/computed';
  
      function echo(arg){ console.log(arg); }
  
      expandProperties('foo.bar', echo);              //=> 'foo.bar'
      expandProperties('{foo,bar}', echo);            //=> 'foo', 'bar'
      expandProperties('foo.{bar,baz}', echo);        //=> 'foo.bar', 'foo.baz'
      expandProperties('{foo,bar}.baz', echo);        //=> 'foo.baz', 'bar.baz'
      expandProperties('foo.{bar,baz}.[]', echo)      //=> 'foo.bar.[]', 'foo.baz.[]'
      expandProperties('{foo,bar}.{spam,eggs}', echo) //=> 'foo.spam', 'foo.eggs', 'bar.spam', 'bar.eggs'
      expandProperties('{foo}.bar.{baz}')             //=> 'foo.bar.baz'
      ```
  
      @method expandProperties
      @static
      @for @ember/object/computed
      @public
      @param {String} pattern The property pattern to expand.
      @param {Function} callback The callback to invoke.  It is invoked once per
      expansion, and is passed the expansion.
    */
    function expandProperties(pattern, callback) {
        (false && !(typeof pattern === 'string') && (0, _debug.assert)(`A computed property key must be a string, you passed ${typeof pattern} ${pattern}`, typeof pattern === 'string'));
        (false && !(pattern.indexOf(' ') === -1) && (0, _debug.assert)('Brace expanded properties cannot contain spaces, e.g. "user.{firstName, lastName}" should be "user.{firstName,lastName}"', pattern.indexOf(' ') === -1)); // regex to look for double open, double close, or unclosed braces
        (false && !(pattern.match(/\{[^}{]*\{|\}[^}{]*\}|\{[^}]*$/g) === null) && (0, _debug.assert)(`Brace expanded properties have to be balanced and cannot be nested, pattern: ${pattern}`, pattern.match(/\{[^}{]*\{|\}[^}{]*\}|\{[^}]*$/g) === null));
        var start = pattern.indexOf('{');
        if (start < 0) {
            callback(pattern.replace(END_WITH_EACH_REGEX, '.[]'));
        } else {
            dive('', pattern, start, callback);
        }
    }

    function dive(prefix, pattern, start, callback) {
        var end = pattern.indexOf('}'),
            i = 0,
            newStart,
            arrayLength;
        var tempArr = pattern.substring(start + 1, end).split(',');
        var after = pattern.substring(end + 1);
        prefix = prefix + pattern.substring(0, start);
        arrayLength = tempArr.length;
        while (i < arrayLength) {
            newStart = after.indexOf('{');
            if (newStart < 0) {
                callback((prefix + tempArr[i++] + after).replace(END_WITH_EACH_REGEX, '.[]'));
            } else {
                dive(prefix + tempArr[i++], after, newStart, callback);
            }
        }
    }

    /**
    @module @ember/object
    */
    var DEEP_EACH_REGEX = /\.@each\.[^.]+\./;

    function noop() {}
    /**
      `@computed` is a decorator that turns a JavaScript getter and setter into a
      computed property, which is a _cached, trackable value_. By default the getter
      will only be called once and the result will be cached. You can specify
      various properties that your computed property depends on. This will force the
      cached result to be cleared if the dependencies are modified, and lazily recomputed the next time something asks for it.
  
      In the following example we decorate a getter - `fullName` -  by calling
      `computed` with the property dependencies (`firstName` and `lastName`) as
      arguments. The `fullName` getter will be called once (regardless of how many
      times it is accessed) as long as its dependencies do not change. Once
      `firstName` or `lastName` are updated any future calls to `fullName` will
      incorporate the new values, and any watchers of the value such as templates
      will be updated:
  
      ```javascript
      import { computed, set } from '@ember/object';
  
      class Person {
        constructor(firstName, lastName) {
          set(this, 'firstName', firstName);
          set(this, 'lastName', lastName);
        }
  
        @computed('firstName', 'lastName')
        get fullName() {
          return `${this.firstName} ${this.lastName}`;
        }
      });
  
      let tom = new Person('Tom', 'Dale');
  
      tom.fullName; // 'Tom Dale'
      ```
  
      You can also provide a setter, which will be used when updating the computed
      property. Ember's `set` function must be used to update the property
      since it will also notify observers of the property:
  
      ```javascript
      import { computed, set } from '@ember/object';
  
      class Person {
        constructor(firstName, lastName) {
          set(this, 'firstName', firstName);
          set(this, 'lastName', lastName);
        }
  
        @computed('firstName', 'lastName')
        get fullName() {
          return `${this.firstName} ${this.lastName}`;
        }
  
        set fullName(value) {
          let [firstName, lastName] = value.split(' ');
  
          set(this, 'firstName', firstName);
          set(this, 'lastName', lastName);
        }
      });
  
      let person = new Person();
  
      set(person, 'fullName', 'Peter Wagenet');
      person.firstName; // 'Peter'
      person.lastName;  // 'Wagenet'
      ```
  
      You can also pass a getter function or object with `get` and `set` functions
      as the last argument to the computed decorator. This allows you to define
      computed property _macros_:
  
      ```js
      import { computed } from '@ember/object';
  
      function join(...keys) {
        return computed(...keys, function() {
          return keys.map(key => this[key]).join(' ');
        });
      }
  
      class Person {
        @join('firstName', 'lastName')
        fullName;
      }
      ```
  
      Note that when defined this way, getters and setters receive the _key_ of the
      property they are decorating as the first argument. Setters receive the value
      they are setting to as the second argument instead. Additionally, setters must
      _return_ the value that should be cached:
  
      ```javascript
      import { computed, set } from '@ember/object';
  
      function fullNameMacro(firstNameKey, lastNameKey) {
        return computed(firstNameKey, lastNameKey, {
          get() {
            return `${this[firstNameKey]} ${this[lastNameKey]}`;
          }
  
          set(key, value) {
            let [firstName, lastName] = value.split(' ');
  
            set(this, firstNameKey, firstName);
            set(this, lastNameKey, lastName);
  
            return value;
          }
        });
      }
  
      class Person {
        constructor(firstName, lastName) {
          set(this, 'firstName', firstName);
          set(this, 'lastName', lastName);
        }
  
        @fullNameMacro('firstName', 'lastName') fullName;
      });
  
      let person = new Person();
  
      set(person, 'fullName', 'Peter Wagenet');
      person.firstName; // 'Peter'
      person.lastName;  // 'Wagenet'
      ```
  
      Computed properties can also be used in classic classes. To do this, we
      provide the getter and setter as the last argument like we would for a macro,
      and we assign it to a property on the class definition. This is an _anonymous_
      computed macro:
  
      ```javascript
      import EmberObject, { computed, set } from '@ember/object';
  
      let Person = EmberObject.extend({
        // these will be supplied by `create`
        firstName: null,
        lastName: null,
  
        fullName: computed('firstName', 'lastName', {
          get() {
            return `${this.firstName} ${this.lastName}`;
          }
  
          set(key, value) {
            let [firstName, lastName] = value.split(' ');
  
            set(this, 'firstName', firstName);
            set(this, 'lastName', lastName);
  
            return value;
          }
        })
      });
  
      let tom = Person.create({
        firstName: 'Tom',
        lastName: 'Dale'
      });
  
      tom.get('fullName') // 'Tom Dale'
      ```
  
      You can overwrite computed property without setters with a normal property (no
      longer computed) that won't change if dependencies change. You can also mark
      computed property as `.readOnly()` and block all attempts to set it.
  
      ```javascript
      import { computed, set } from '@ember/object';
  
      class Person {
        constructor(firstName, lastName) {
          set(this, 'firstName', firstName);
          set(this, 'lastName', lastName);
        }
  
        @computed('firstName', 'lastName').readOnly()
        get fullName() {
          return `${this.firstName} ${this.lastName}`;
        }
      });
  
      let person = new Person();
      person.set('fullName', 'Peter Wagenet'); // Uncaught Error: Cannot set read-only property "fullName" on object: <(...):emberXXX>
      ```
  
      Additional resources:
      - [Decorators RFC](https://github.com/emberjs/rfcs/blob/master/text/0408-decorators.md)
      - [New CP syntax RFC](https://github.com/emberjs/rfcs/blob/master/text/0011-improved-cp-syntax.md)
      - [New computed syntax explained in "Ember 1.12 released" ](https://emberjs.com/blog/2015/05/13/ember-1-12-released.html#toc_new-computed-syntax)
  
      @class ComputedProperty
      @public
    */
    class ComputedProperty extends ComputedDescriptor {
        constructor(args) {
            super();
            this._readOnly = false;
            this._hasConfig = false;
            this._getter = undefined;
            this._setter = undefined;
            var maybeConfig = args[args.length - 1];
            if (typeof maybeConfig === 'function' || maybeConfig !== null && typeof maybeConfig === 'object') {
                this._hasConfig = true;
                var config = args.pop();
                if (typeof config === 'function') {
                    (false && !(!isClassicDecorator(config)) && (0, _debug.assert)(`You attempted to pass a computed property instance to computed(). Computed property instances are decorator functions, and cannot be passed to computed() because they cannot be turned into decorators twice`, !isClassicDecorator(config)));
                    this._getter = config;
                } else {
                    var objectConfig = config;
                    (false && !(typeof objectConfig === 'object' && !Array.isArray(objectConfig)) && (0, _debug.assert)('computed expects a function or an object as last argument.', typeof objectConfig === 'object' && !Array.isArray(objectConfig)));
                    (false && !(Object.keys(objectConfig).every(key => key === 'get' || key === 'set')) && (0, _debug.assert)('Config object passed to computed can only contain `get` and `set` keys.', Object.keys(objectConfig).every(key => key === 'get' || key === 'set')));
                    (false && !(Boolean(objectConfig.get) || Boolean(objectConfig.set)) && (0, _debug.assert)('Computed properties must receive a getter or a setter, you passed none.', Boolean(objectConfig.get) || Boolean(objectConfig.set)));
                    this._getter = objectConfig.get || noop;
                    this._setter = objectConfig.set;
                }
            }
            if (args.length > 0) {
                this._property(...args);
            }
        }
        setup(obj, keyName, propertyDesc, meta) {
            super.setup(obj, keyName, propertyDesc, meta);
            (false && !(!(propertyDesc && typeof propertyDesc.value === 'function')) && (0, _debug.assert)(`@computed can only be used on accessors or fields, attempted to use it with ${keyName} but that was a method. Try converting it to a getter (e.g. \`get ${keyName}() {}\`)`, !(propertyDesc && typeof propertyDesc.value === 'function')));
            (false && !(!propertyDesc || !propertyDesc.initializer) && (0, _debug.assert)(`@computed can only be used on empty fields. ${keyName} has an initial value (e.g. \`${keyName} = someValue\`)`, !propertyDesc || !propertyDesc.initializer));
            (false && !(!(this._hasConfig && propertyDesc && (typeof propertyDesc.get === 'function' || typeof propertyDesc.set === 'function'))) && (0, _debug.assert)(`Attempted to apply a computed property that already has a getter/setter to a ${keyName}, but it is a method or an accessor. If you passed @computed a function or getter/setter (e.g. \`@computed({ get() { ... } })\`), then it must be applied to a field`, !(this._hasConfig && propertyDesc && (typeof propertyDesc.get === 'function' || typeof propertyDesc.set === 'function'))));
            if (this._hasConfig === false) {
                (false && !(propertyDesc && (typeof propertyDesc.get === 'function' || typeof propertyDesc.set === 'function')) && (0, _debug.assert)(`Attempted to use @computed on ${keyName}, but it did not have a getter or a setter. You must either pass a get a function or getter/setter to @computed directly (e.g. \`@computed({ get() { ... } })\`) or apply @computed directly to a getter/setter`, propertyDesc && (typeof propertyDesc.get === 'function' || typeof propertyDesc.set === 'function')));
                var {
                    get: _get2,
                    set: _set2
                } = propertyDesc;
                if (_get2 !== undefined) {
                    this._getter = _get2;
                }
                if (_set2 !== undefined) {
                    this._setter = function setterWrapper(_key, value) {
                        var ret = _set2.call(this, value);
                        if (_get2 !== undefined) {
                            return typeof ret === 'undefined' ? _get2.call(this) : ret;
                        }
                        return ret;
                    };
                }
            }
        }
        _property() {
            var args = [];

            function addArg(property) {
                (false && !(DEEP_EACH_REGEX.test(property) === false) && (0, _debug.assert)(`Dependent keys containing @each only work one level deep. ` + `You used the key "${property}" which is invalid. ` + `Please create an intermediary computed property or ` + `switch to using tracked properties.`, DEEP_EACH_REGEX.test(property) === false));
                args.push(property);
            }
            for (var _len2 = arguments.length, passedArgs = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
                passedArgs[_key3] = arguments[_key3];
            }
            for (var arg of passedArgs) {
                expandProperties(arg, addArg);
            }
            this._dependentKeys = args;
        }
        get(obj, keyName) {
            var meta$1 = (0, _meta3.meta)(obj);
            var tagMeta = (0, _validator.tagMetaFor)(obj);
            var propertyTag = (0, _validator.tagFor)(obj, keyName, tagMeta);
            var ret;
            var revision = meta$1.revisionFor(keyName);
            if (revision !== undefined && (0, _validator.validateTag)(propertyTag, revision)) {
                ret = meta$1.valueFor(keyName);
            } else {
                // For backwards compatibility, we only throw if the CP has any dependencies. CPs without dependencies
                // should be allowed, even after the object has been destroyed, which is why we check _dependentKeys.
                (false && !(this._dependentKeys === undefined || !(0, _destroyable.isDestroyed)(obj)) && (0, _debug.assert)(`Attempted to access the computed ${obj}.${keyName} on a destroyed object, which is not allowed`, this._dependentKeys === undefined || !(0, _destroyable.isDestroyed)(obj)));
                var {
                    _getter,
                    _dependentKeys
                } = this;
                // Create a tracker that absorbs any trackable actions inside the CP
                (0, _validator.untrack)(() => {
                    ret = _getter.call(obj, keyName);
                });
                if (_dependentKeys !== undefined) {
                    (0, _validator.updateTag)(propertyTag, getChainTagsForKeys(obj, _dependentKeys, tagMeta, meta$1));
                    if (false /* DEBUG */ ) {
                        _validator.ALLOW_CYCLES.set(propertyTag, true);
                    }
                }
                meta$1.setValueFor(keyName, ret);
                meta$1.setRevisionFor(keyName, (0, _validator.valueForTag)(propertyTag));
                finishLazyChains(meta$1, keyName, ret);
            }
            (0, _validator.consumeTag)(propertyTag);
            // Add the tag of the returned value if it is an array, since arrays
            // should always cause updates if they are consumed and then changed
            if (Array.isArray(ret)) {
                (0, _validator.consumeTag)((0, _validator.tagFor)(ret, '[]'));
            }
            return ret;
        }
        set(obj, keyName, value) {
            if (this._readOnly) {
                this._throwReadOnlyError(obj, keyName);
            }
            (false && !(this._setter !== undefined) && (0, _debug.assert)(`Cannot override the computed property \`${keyName}\` on ${(0, _utils.toString)(obj)}.`, this._setter !== undefined));
            var meta$1 = (0, _meta3.meta)(obj);
            // ensure two way binding works when the component has defined a computed
            // property with both a setter and dependent keys, in that scenario without
            // the sync observer added below the caller's value will never be updated
            //
            // See GH#18147 / GH#19028 for details.
            if (
                // ensure that we only run this once, while the component is being instantiated
                meta$1.isInitializing() && this._dependentKeys !== undefined && this._dependentKeys.length > 0 && typeof obj[PROPERTY_DID_CHANGE] === 'function' && obj.isComponent) {
                // It's redundant to do this here, but we don't want to check above so we can avoid an extra function call in prod.
                (false && !(hasPropertyDidChange(obj)) && (0, _debug.assert)('property did change hook is invalid', hasPropertyDidChange(obj)));
                addObserver(obj, keyName, () => {
                    obj[PROPERTY_DID_CHANGE](keyName);
                }, undefined, true);
            }
            var ret;
            try {
                beginPropertyChanges();
                ret = this._set(obj, keyName, value, meta$1);
                finishLazyChains(meta$1, keyName, ret);
                var tagMeta = (0, _validator.tagMetaFor)(obj);
                var propertyTag = (0, _validator.tagFor)(obj, keyName, tagMeta);
                var {
                    _dependentKeys
                } = this;
                if (_dependentKeys !== undefined) {
                    (0, _validator.updateTag)(propertyTag, getChainTagsForKeys(obj, _dependentKeys, tagMeta, meta$1));
                    if (false /* DEBUG */ ) {
                        _validator.ALLOW_CYCLES.set(propertyTag, true);
                    }
                }
                meta$1.setRevisionFor(keyName, (0, _validator.valueForTag)(propertyTag));
            } finally {
                endPropertyChanges();
            }
            return ret;
        }
        _throwReadOnlyError(obj, keyName) {
            throw new Error(`Cannot set read-only property "${keyName}" on object: ${(0, _debug.inspect)(obj)}`);
        }
        _set(obj, keyName, value, meta) {
            var hadCachedValue = meta.revisionFor(keyName) !== undefined;
            var cachedValue = meta.valueFor(keyName);
            var ret;
            var {
                _setter
            } = this;
            setObserverSuspended(obj, keyName, true);
            try {
                ret = _setter.call(obj, keyName, value, cachedValue);
            } finally {
                setObserverSuspended(obj, keyName, false);
            }
            // allows setter to return the same value that is cached already
            if (hadCachedValue && cachedValue === ret) {
                return ret;
            }
            meta.setValueFor(keyName, ret);
            notifyPropertyChange(obj, keyName, meta, value);
            return ret;
        }
        /* called before property is overridden */
        teardown(obj, keyName, meta) {
            if (meta.revisionFor(keyName) !== undefined) {
                meta.setRevisionFor(keyName, undefined);
                meta.setValueFor(keyName, undefined);
            }
            super.teardown(obj, keyName, meta);
        }
    }
    _exports.ComputedProperty = ComputedProperty;
    class AutoComputedProperty extends ComputedProperty {
        get(obj, keyName) {
            var meta$1 = (0, _meta3.meta)(obj);
            var tagMeta = (0, _validator.tagMetaFor)(obj);
            var propertyTag = (0, _validator.tagFor)(obj, keyName, tagMeta);
            var ret;
            var revision = meta$1.revisionFor(keyName);
            if (revision !== undefined && (0, _validator.validateTag)(propertyTag, revision)) {
                ret = meta$1.valueFor(keyName);
            } else {
                (false && !(!(0, _destroyable.isDestroyed)(obj)) && (0, _debug.assert)(`Attempted to access the computed ${obj}.${keyName} on a destroyed object, which is not allowed`, !(0, _destroyable.isDestroyed)(obj)));
                var {
                    _getter
                } = this;
                // Create a tracker that absorbs any trackable actions inside the CP
                var tag = (0, _validator.track)(() => {
                    ret = _getter.call(obj, keyName);
                });
                (0, _validator.updateTag)(propertyTag, tag);
                meta$1.setValueFor(keyName, ret);
                meta$1.setRevisionFor(keyName, (0, _validator.valueForTag)(propertyTag));
                finishLazyChains(meta$1, keyName, ret);
            }
            (0, _validator.consumeTag)(propertyTag);
            // Add the tag of the returned value if it is an array, since arrays
            // should always cause updates if they are consumed and then changed
            if (Array.isArray(ret)) {
                (0, _validator.consumeTag)((0, _validator.tagFor)(ret, '[]', tagMeta));
            }
            return ret;
        }
    }
    // TODO: This class can be svelted once `meta` has been deprecated
    class ComputedDecoratorImpl extends Function {
        /**
          Call on a computed property to set it into read-only mode. When in this
          mode the computed property will throw an error when set.
             Example:
             ```javascript
          import { computed, set } from '@ember/object';
             class Person {
            @computed().readOnly()
            get guid() {
              return 'guid-guid-guid';
            }
          }
             let person = new Person();
          set(person, 'guid', 'new-guid'); // will throw an exception
          ```
             Classic Class Example:
             ```javascript
          import EmberObject, { computed } from '@ember/object';
             let Person = EmberObject.extend({
            guid: computed(function() {
              return 'guid-guid-guid';
            }).readOnly()
          });
             let person = Person.create();
          person.set('guid', 'new-guid'); // will throw an exception
          ```
             @method readOnly
          @return {ComputedProperty} this
          @chainable
          @public
        */
        readOnly() {
            var desc = descriptorForDecorator(this);
            (false && !(!(desc._setter && desc._setter !== desc._getter)) && (0, _debug.assert)('Computed properties that define a setter using the new syntax cannot be read-only', !(desc._setter && desc._setter !== desc._getter)));
            desc._readOnly = true;
            return this;
        }
        meta(meta) {
            var prop = descriptorForDecorator(this);
            if (arguments.length === 0) {
                return prop._meta || {};
            } else {
                prop._meta = meta;
                return this;
            }
        }
        // TODO: Remove this when we can provide alternatives in the ecosystem to
        // addons such as ember-macro-helpers that use it.
        /** @internal */
        get _getter() {
            return descriptorForDecorator(this)._getter;
        }
        // TODO: Refactor this, this is an internal API only
        /** @internal */
        set enumerable(value) {
            descriptorForDecorator(this).enumerable = value;
        }
    }

    function computed() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
            args[_key4] = arguments[_key4];
        }
        (false && !(!(isElementDescriptor(args.slice(0, 3)) && args.length === 5 && args[4] === true)) && (0, _debug.assert)(`@computed can only be used directly as a native decorator. If you're using tracked in classic classes, add parenthesis to call it like a function: computed()`, !(isElementDescriptor(args.slice(0, 3)) && args.length === 5 && args[4] === true)));
        if (isElementDescriptor(args)) {
            // SAFETY: We passed in the impl for this class
            var decorator = makeComputedDecorator(new ComputedProperty([]), ComputedDecoratorImpl);
            return decorator(args[0], args[1], args[2]);
        }
        // SAFETY: We passed in the impl for this class
        return makeComputedDecorator(new ComputedProperty(args), ComputedDecoratorImpl);
    }

    function autoComputed() {
        for (var _len4 = arguments.length, config = new Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
            config[_key5] = arguments[_key5];
        }
        // SAFETY: We passed in the impl for this class
        return makeComputedDecorator(new AutoComputedProperty(config), ComputedDecoratorImpl);
    }
    /**
      Allows checking if a given property on an object is a computed property. For the most part,
      this doesn't matter (you would normally just access the property directly and use its value),
      but for some tooling specific scenarios (e.g. the ember-inspector) it is important to
      differentiate if a property is a computed property or a "normal" property.
  
      This will work on either a class's prototype or an instance itself.
  
      @static
      @method isComputed
      @for @ember/debug
      @private
     */
    function isComputed(obj, key) {
        return Boolean(descriptorForProperty(obj, key));
    }

    function getCachedValueFor(obj, key) {
        var meta = (0, _meta3.peekMeta)(obj);
        if (meta) {
            return meta.valueFor(key);
        } else {
            return undefined;
        }
    }

    /**
    @module @ember/object
    */
    /**
      NOTE: This is a low-level method used by other parts of the API. You almost
      never want to call this method directly. Instead you should use
      `mixin()` to define new properties.
  
      Defines a property on an object. This method works much like the ES5
      `Object.defineProperty()` method except that it can also accept computed
      properties and other special descriptors.
  
      Normally this method takes only three parameters. However if you pass an
      instance of `Descriptor` as the third param then you can pass an
      optional value as the fourth parameter. This is often more efficient than
      creating new descriptor hashes for each property.
  
      ## Examples
  
      ```javascript
      import { defineProperty, computed } from '@ember/object';
  
      // ES5 compatible mode
      defineProperty(contact, 'firstName', {
        writable: true,
        configurable: false,
        enumerable: true,
        value: 'Charles'
      });
  
      // define a simple property
      defineProperty(contact, 'lastName', undefined, 'Jolley');
  
      // define a computed property
      defineProperty(contact, 'fullName', computed('firstName', 'lastName', function() {
        return this.firstName+' '+this.lastName;
      }));
      ```
  
      @public
      @method defineProperty
      @static
      @for @ember/object
      @param {Object} obj the object to define this property on. This may be a prototype.
      @param {String} keyName the name of the property
      @param {Descriptor} [desc] an instance of `Descriptor` (typically a
        computed property) or an ES5 descriptor.
        You must provide this or `data` but not both.
      @param {*} [data] something other than a descriptor, that will
        become the explicit value of this property.
    */
    function defineProperty(obj, keyName, desc, data, _meta) {
        var meta$1 = _meta === undefined ? (0, _meta3.meta)(obj) : _meta;
        var previousDesc = descriptorForProperty(obj, keyName, meta$1);
        var wasDescriptor = previousDesc !== undefined;
        if (wasDescriptor) {
            previousDesc.teardown(obj, keyName, meta$1);
        }
        if (isClassicDecorator(desc)) {
            defineDecorator(obj, keyName, desc, meta$1);
        } else if (desc === null || desc === undefined) {
            defineValue(obj, keyName, data, wasDescriptor, true);
        } else {
            // fallback to ES5
            Object.defineProperty(obj, keyName, desc);
        }
        // if key is being watched, override chains that
        // were initialized with the prototype
        if (!meta$1.isPrototypeMeta(obj)) {
            revalidateObservers(obj);
        }
    }

    function defineDecorator(obj, keyName, desc, meta) {
        var propertyDesc;
        if (false /* DEBUG */ ) {
            propertyDesc = desc(obj, keyName, undefined, meta, true);
        } else {
            propertyDesc = desc(obj, keyName, undefined, meta);
        }
        Object.defineProperty(obj, keyName, propertyDesc);
        // pass the decorator function forward for backwards compat
        return desc;
    }

    function defineValue(obj, keyName, value, wasDescriptor, enumerable) {
        if (enumerable === void 0) {
            enumerable = true;
        }
        if (wasDescriptor === true || enumerable === false) {
            Object.defineProperty(obj, keyName, {
                configurable: true,
                enumerable,
                writable: true,
                value
            });
        } else {
            if (false /* DEBUG */ ) {
                (0, _utils.setWithMandatorySetter)(obj, keyName, value);
            } else {
                obj[keyName] = value;
            }
        }
        return value;
    }
    var firstDotIndexCache = new _utils.Cache(1000, key => key.indexOf('.'));

    function isPath(path) {
        return typeof path === 'string' && firstDotIndexCache.get(path) !== -1;
    }
    var PROXY_CONTENT = _exports.PROXY_CONTENT = (0, _utils.symbol)('PROXY_CONTENT');
    var getPossibleMandatoryProxyValue;
    if (false /* DEBUG */ ) {
        getPossibleMandatoryProxyValue = function getPossibleMandatoryProxyValue(obj, keyName) {
            var content = obj[PROXY_CONTENT];
            if (content === undefined) {
                return obj[keyName];
            } else {
                /* global Reflect */
                return Reflect.get(content, keyName, obj);
            }
        };
    }

    function hasUnknownProperty(val) {
        return typeof val === 'object' && val !== null && typeof val.unknownProperty === 'function';
    }

    function get(obj, keyName) {
        (false && !(arguments.length === 2) && (0, _debug.assert)(`Get must be called with two arguments; an object and a property key`, arguments.length === 2));
        (false && !(obj !== undefined && obj !== null) && (0, _debug.assert)(`Cannot call get with '${keyName}' on an undefined object.`, obj !== undefined && obj !== null));
        (false && !(typeof keyName === 'string' || typeof keyName === 'number' && !isNaN(keyName)) && (0, _debug.assert)(`The key provided to get must be a string or number, you passed ${keyName}`, typeof keyName === 'string' || typeof keyName === 'number' && !isNaN(keyName)));
        (false && !(typeof keyName !== 'string' || keyName.lastIndexOf('this.', 0) !== 0) && (0, _debug.assert)(`'this' in paths is not supported`, typeof keyName !== 'string' || keyName.lastIndexOf('this.', 0) !== 0));
        return isPath(keyName) ? _getPath(obj, keyName) : _getProp(obj, keyName);
    }

    function _getProp(obj, keyName) {
        if (obj == null) {
            return;
        }
        var value;
        if (typeof obj === 'object' || typeof obj === 'function') {
            if (false /* DEBUG */ ) {
                value = getPossibleMandatoryProxyValue(obj, keyName);
            } else {
                value = obj[keyName];
            }
            if (value === undefined && typeof obj === 'object' && !(keyName in obj) && hasUnknownProperty(obj)) {
                value = obj.unknownProperty(keyName);
            }
            if ((0, _validator.isTracking)()) {
                (0, _validator.consumeTag)((0, _validator.tagFor)(obj, keyName));
                if (Array.isArray(value) || (0, _internals.isEmberArray)(value)) {
                    // Add the tag of the returned value if it is an array, since arrays
                    // should always cause updates if they are consumed and then changed
                    (0, _validator.consumeTag)((0, _validator.tagFor)(value, '[]'));
                }
            }
        } else {
            // SAFETY: It should be ok to access properties on any non-nullish value
            value = obj[keyName];
        }
        return value;
    }

    function _getPath(obj, path, forSet) {
        var parts = typeof path === 'string' ? path.split('.') : path;
        for (var part of parts) {
            if (obj === undefined || obj === null || obj.isDestroyed) {
                return undefined;
            }
            if (forSet && (part === '__proto__' || part === 'constructor')) {
                return;
            }
            obj = _getProp(obj, part);
        }
        return obj;
    }
    // Warm it up
    _getProp('foo', 'a');
    _getProp('foo', 1);
    _getProp({}, 'a');
    _getProp({}, 1);
    _getProp({
        unknownProperty() {}
    }, 'a');
    _getProp({
        unknownProperty() {}
    }, 1);
    get({}, 'foo');
    get({}, 'foo.bar');
    var fakeProxy = {};
    (0, _utils.setProxy)(fakeProxy);
    (0, _validator.track)(() => _getProp({}, 'a'));
    (0, _validator.track)(() => _getProp({}, 1));
    (0, _validator.track)(() => _getProp({
        a: []
    }, 'a'));
    (0, _validator.track)(() => _getProp({
        a: fakeProxy
    }, 'a'));

    /**
     @module @ember/object
    */
    /**
      Sets the value of a property on an object, respecting computed properties
      and notifying observers and other listeners of the change.
      If the specified property is not defined on the object and the object
      implements the `setUnknownProperty` method, then instead of setting the
      value of the property on the object, its `setUnknownProperty` handler
      will be invoked with the two parameters `keyName` and `value`.
  
      ```javascript
      import { set } from '@ember/object';
      set(obj, "name", value);
      ```
  
      @method set
      @static
      @for @ember/object
      @param {Object} obj The object to modify.
      @param {String} keyName The property key to set
      @param {Object} value The value to set
      @return {Object} the passed value.
      @public
    */
    function set(obj, keyName, value, tolerant) {
        (false && !(arguments.length === 3 || arguments.length === 4) && (0, _debug.assert)(`Set must be called with three or four arguments; an object, a property key, a value and tolerant true/false`, arguments.length === 3 || arguments.length === 4));
        (false && !(obj && typeof obj === 'object' || typeof obj === 'function') && (0, _debug.assert)(`Cannot call set with '${keyName}' on an undefined object.`, obj && typeof obj === 'object' || typeof obj === 'function'));
        (false && !(typeof keyName === 'string' || typeof keyName === 'number' && !isNaN(keyName)) && (0, _debug.assert)(`The key provided to set must be a string or number, you passed ${keyName}`, typeof keyName === 'string' || typeof keyName === 'number' && !isNaN(keyName)));
        (false && !(typeof keyName !== 'string' || keyName.lastIndexOf('this.', 0) !== 0) && (0, _debug.assert)(`'this' in paths is not supported`, typeof keyName !== 'string' || keyName.lastIndexOf('this.', 0) !== 0));
        if (obj.isDestroyed) {
            (false && !(tolerant) && (0, _debug.assert)(`calling set on destroyed object: ${(0, _utils.toString)(obj)}.${keyName} = ${(0, _utils.toString)(value)}`, tolerant));
            return value;
        }
        return isPath(keyName) ? _setPath(obj, keyName, value, tolerant) : _setProp(obj, keyName, value);
    }

    function _setProp(obj, keyName, value) {
        var descriptor = (0, _utils.lookupDescriptor)(obj, keyName);
        if (descriptor !== null && COMPUTED_SETTERS.has(descriptor.set)) {
            obj[keyName] = value;
            return value;
        }
        var currentValue;
        if (false /* DEBUG */ ) {
            currentValue = getPossibleMandatoryProxyValue(obj, keyName);
        } else {
            currentValue = obj[keyName];
        }
        if (currentValue === undefined && 'object' === typeof obj && !(keyName in obj) && typeof obj.setUnknownProperty === 'function') {
            /* unknown property */
            obj.setUnknownProperty(keyName, value);
        } else {
            if (false /* DEBUG */ ) {
                (0, _utils.setWithMandatorySetter)(obj, keyName, value);
            } else {
                obj[keyName] = value;
            }
            if (currentValue !== value) {
                notifyPropertyChange(obj, keyName);
            }
        }
        return value;
    }

    function _setPath(root, path, value, tolerant) {
        var parts = path.split('.');
        var keyName = parts.pop();
        (false && !(keyName.trim().length > 0) && (0, _debug.assert)('Property set failed: You passed an empty path', keyName.trim().length > 0));
        var newRoot = _getPath(root, parts, true);
        if (newRoot !== null && newRoot !== undefined) {
            return set(newRoot, keyName, value);
        } else if (!tolerant) {
            throw new Error(`Property set failed: object in path "${parts.join('.')}" could not be found.`);
        }
    }
    /**
      Error-tolerant form of `set`. Will not blow up if any part of the
      chain is `undefined`, `null`, or destroyed.
  
      This is primarily used when syncing bindings, which may try to update after
      an object has been destroyed.
  
      ```javascript
      import { trySet } from '@ember/object';
  
      let obj = { name: "Zoey" };
      trySet(obj, "contacts.twitter", "@emberjs");
      ```
  
      @method trySet
      @static
      @for @ember/object
      @param {Object} root The object to modify.
      @param {String} path The property path to set
      @param {Object} value The value to set
      @public
    */
    function trySet(root, path, value) {
        return set(root, path, value, true);
    }

    function alias(altKey) {
        (false && !(!isElementDescriptor(Array.prototype.slice.call(arguments))) && (0, _debug.assert)('You attempted to use @alias as a decorator directly, but it requires a `altKey` parameter', !isElementDescriptor(Array.prototype.slice.call(arguments)))); // SAFETY: We passed in the impl for this class
        return makeComputedDecorator(new AliasedProperty(altKey), AliasDecoratorImpl);
    }
    // TODO: This class can be svelted once `meta` has been deprecated
    class AliasDecoratorImpl extends Function {
        readOnly() {
            descriptorForDecorator(this).readOnly();
            return this;
        }
        oneWay() {
            descriptorForDecorator(this).oneWay();
            return this;
        }
        meta(meta) {
            var prop = descriptorForDecorator(this);
            if (arguments.length === 0) {
                return prop._meta || {};
            } else {
                prop._meta = meta;
            }
        }
    }
    class AliasedProperty extends ComputedDescriptor {
        constructor(altKey) {
            super();
            this.altKey = altKey;
        }
        setup(obj, keyName, propertyDesc, meta) {
            (false && !(this.altKey !== keyName) && (0, _debug.assert)(`Setting alias '${keyName}' on self`, this.altKey !== keyName));
            super.setup(obj, keyName, propertyDesc, meta);
            CHAIN_PASS_THROUGH.add(this);
        }
        get(obj, keyName) {
            var ret;
            var meta$1 = (0, _meta3.meta)(obj);
            var tagMeta = (0, _validator.tagMetaFor)(obj);
            var propertyTag = (0, _validator.tagFor)(obj, keyName, tagMeta);
            // We don't use the tag since CPs are not automatic, we just want to avoid
            // anything tracking while we get the altKey
            (0, _validator.untrack)(() => {
                ret = get(obj, this.altKey);
            });
            var lastRevision = meta$1.revisionFor(keyName);
            if (lastRevision === undefined || !(0, _validator.validateTag)(propertyTag, lastRevision)) {
                (0, _validator.updateTag)(propertyTag, getChainTagsForKey(obj, this.altKey, tagMeta, meta$1));
                meta$1.setRevisionFor(keyName, (0, _validator.valueForTag)(propertyTag));
                finishLazyChains(meta$1, keyName, ret);
            }
            (0, _validator.consumeTag)(propertyTag);
            return ret;
        }
        set(obj, _keyName, value) {
            return set(obj, this.altKey, value);
        }
        readOnly() {
            this.set = AliasedProperty_readOnlySet;
        }
        oneWay() {
            this.set = AliasedProperty_oneWaySet;
        }
    }

    function AliasedProperty_readOnlySet(obj, keyName) {
        throw new Error(`Cannot set read-only property '${keyName}' on object: ${(0, _debug.inspect)(obj)}`);
    }

    function AliasedProperty_oneWaySet(obj, keyName, value) {
        defineProperty(obj, keyName, null);
        return set(obj, keyName, value);
    }

    /**
    @module ember
    */
    /**
      Used internally to allow changing properties in a backwards compatible way, and print a helpful
      deprecation warning.
  
      @method deprecateProperty
      @param {Object} object The object to add the deprecated property to.
      @param {String} deprecatedKey The property to add (and print deprecation warnings upon accessing).
      @param {String} newKey The property that will be aliased.
      @private
      @since 1.7.0
    */
    function deprecateProperty(object, deprecatedKey, newKey, options) {
        function _deprecate() {
            (true && !(false) && (0, _debug.deprecate)(`Usage of \`${deprecatedKey}\` is deprecated, use \`${newKey}\` instead.`, false, options));
        }
        Object.defineProperty(object, deprecatedKey, {
            configurable: true,
            enumerable: false,
            set(value) {
                _deprecate();
                set(this, newKey, value);
            },
            get() {
                _deprecate();
                return get(this, newKey);
            }
        });
    }
    var EACH_PROXIES = new WeakMap();

    function eachProxyArrayWillChange(array, idx, removedCnt, addedCnt) {
        var eachProxy = EACH_PROXIES.get(array);
        if (eachProxy !== undefined) {
            eachProxy.arrayWillChange(array, idx, removedCnt, addedCnt);
        }
    }

    function eachProxyArrayDidChange(array, idx, removedCnt, addedCnt) {
        var eachProxy = EACH_PROXIES.get(array);
        if (eachProxy !== undefined) {
            eachProxy.arrayDidChange(array, idx, removedCnt, addedCnt);
        }
    }

    /**
     @module ember
    */
    /**
      Helper class that allows you to register your library with Ember.
  
      Singleton created at `Ember.libraries`.
  
      @class Libraries
      @constructor
      @private
    */
    class Libraries {
        constructor() {
            this._registry = [];
            this._coreLibIndex = 0;
        }
        _getLibraryByName(name) {
            var libs = this._registry;
            for (var lib of libs) {
                if (lib.name === name) {
                    return lib;
                }
            }
            return undefined;
        }
        register(name, version, isCoreLibrary) {
            var index = this._registry.length;
            if (!this._getLibraryByName(name)) {
                if (isCoreLibrary) {
                    index = this._coreLibIndex++;
                }
                this._registry.splice(index, 0, {
                    name,
                    version
                });
            } else {
                (false && (0, _debug.warn)(`Library "${name}" is already registered with Ember.`, false, {
                    id: 'ember-metal.libraries-register'
                }));
            }
        }
        registerCoreLibrary(name, version) {
            this.register(name, version, true);
        }
        deRegister(name) {
            var lib = this._getLibraryByName(name);
            var index;
            if (lib) {
                index = this._registry.indexOf(lib);
                this._registry.splice(index, 1);
            }
        }
    }
    _exports.Libraries = Libraries;
    if (false /* DEBUG */ ) {
        Libraries.prototype.logVersions = function() {
            var libs = this._registry;
            var nameLengths = libs.map(item => get(item, 'name.length'));
            (false && !(nameLengths instanceof Array && nameLengths.every(n => typeof n === 'number')) && (0, _debug.assert)('nameLengths is number array', nameLengths instanceof Array && nameLengths.every(n => typeof n === 'number')));
            var maxNameLength = Math.max.apply(null, nameLengths);
            (0, _debug.debug)('-------------------------------');
            for (var lib of libs) {
                var spaces = new Array(maxNameLength - lib.name.length + 1).join(' ');
                (0, _debug.debug)([lib.name, spaces, ' : ', lib.version].join(''));
            }
            (0, _debug.debug)('-------------------------------');
        };
    }
    var LIBRARIES = _exports.libraries = new Libraries();
    LIBRARIES.registerCoreLibrary('Ember', _version.default);

    function getProperties(obj, keys) {
        var ret = {};
        var propertyNames;
        var i = 1;
        if (arguments.length === 2 && Array.isArray(keys)) {
            i = 0;
            propertyNames = arguments[1];
        } else {
            propertyNames = Array.from(arguments);
        }
        for (; i < propertyNames.length; i++) {
            // SAFETY: we are just walking the list of property names, so we know the
            // index access never produces `undefined`.
            var name = propertyNames[i];
            ret[name] = get(obj, name);
        }
        return ret;
    }

    function setProperties(obj, properties) {
        if (properties === null || typeof properties !== 'object') {
            return properties;
        }
        changeProperties(() => {
            var props = Object.keys(properties);
            for (var propertyName of props) {
                // SAFETY: casting `properties` this way is safe because any object in JS
                // can be indexed this way, and the result will be `unknown`, making it
                // safe for callers.
                set(obj, propertyName, properties[propertyName]);
            }
        });
        return properties;
    }
    var DEBUG_INJECTION_FUNCTIONS;
    if (false /* DEBUG */ ) {
        _exports.DEBUG_INJECTION_FUNCTIONS = DEBUG_INJECTION_FUNCTIONS = new WeakMap();
    }

    function inject(type) {
        (false && !(typeof type === 'string') && (0, _debug.assert)('a string type must be provided to inject', typeof type === 'string'));
        var elementDescriptor;
        var name;
        for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key6 = 1; _key6 < _len5; _key6++) {
            args[_key6 - 1] = arguments[_key6];
        }
        if (isElementDescriptor(args)) {
            elementDescriptor = args;
        } else if (typeof args[0] === 'string') {
            name = args[0];
        }
        var getInjection = function(propertyName) {
            var owner = (0, _owner.getOwner)(this) || this.container; // fallback to `container` for backwards compat
            (false && !(Boolean(owner)) && (0, _debug.assert)(`Attempting to lookup an injected property on an object without a container, ensure that the object was instantiated via a container.`, Boolean(owner)));
            return owner.lookup(`${type}:${name || propertyName}`);
        };
        if (false /* DEBUG */ ) {
            DEBUG_INJECTION_FUNCTIONS.set(getInjection, {
                type,
                name
            });
        }
        var decorator = computed({
            get: getInjection,
            set(keyName, value) {
                defineProperty(this, keyName, null, value);
            }
        });
        if (elementDescriptor) {
            return decorator(elementDescriptor[0], elementDescriptor[1], elementDescriptor[2]);
        } else {
            return decorator;
        }
    }

    function tracked() {
        for (var _len6 = arguments.length, args = new Array(_len6), _key7 = 0; _key7 < _len6; _key7++) {
            args[_key7] = arguments[_key7];
        }
        (false && !(!(isElementDescriptor(args.slice(0, 3)) && args.length === 5 && args[4] === true)) && (0, _debug.assert)(`@tracked can only be used directly as a native decorator. If you're using tracked in classic classes, add parenthesis to call it like a function: tracked()`, !(isElementDescriptor(args.slice(0, 3)) && args.length === 5 && args[4] === true)));
        if (!isElementDescriptor(args)) {
            var propertyDesc = args[0];
            (false && !(args.length === 0 || typeof propertyDesc === 'object' && propertyDesc !== null) && (0, _debug.assert)(`tracked() may only receive an options object containing 'value' or 'initializer', received ${propertyDesc}`, args.length === 0 || typeof propertyDesc === 'object' && propertyDesc !== null));
            if (false /* DEBUG */ && propertyDesc) {
                var keys = Object.keys(propertyDesc);
                (false && !(keys.length <= 1 && (keys[0] === undefined || keys[0] === 'value' || keys[0] === 'initializer')) && (0, _debug.assert)(`The options object passed to tracked() may only contain a 'value' or 'initializer' property, not both. Received: [${keys}]`, keys.length <= 1 && (keys[0] === undefined || keys[0] === 'value' || keys[0] === 'initializer')));
                (false && !(!('initializer' in propertyDesc) || typeof propertyDesc.initializer === 'function') && (0, _debug.assert)(`The initializer passed to tracked must be a function. Received ${propertyDesc.initializer}`, !('initializer' in propertyDesc) || typeof propertyDesc.initializer === 'function'));
            }
            var initializer = propertyDesc ? propertyDesc.initializer : undefined;
            var value = propertyDesc ? propertyDesc.value : undefined;
            var decorator = function(target, key, _desc, _meta, isClassicDecorator) {
                (false && !(isClassicDecorator) && (0, _debug.assert)(`You attempted to set a default value for ${key} with the @tracked({ value: 'default' }) syntax. You can only use this syntax with classic classes. For native classes, you can use class initializers: @tracked field = 'default';`, isClassicDecorator));
                var fieldDesc = {
                    initializer: initializer || (() => value)
                };
                return descriptorForField([target, key, fieldDesc]);
            };
            setClassicDecorator(decorator);
            return decorator;
        }
        return descriptorForField(args);
    }
    if (false /* DEBUG */ ) {
        // Normally this isn't a classic decorator, but we want to throw a helpful
        // error in development so we need it to treat it like one
        setClassicDecorator(tracked);
    }

    function descriptorForField(_ref) {
        var [target, key, desc] = _ref;
        (false && !(!desc || !desc.value && !desc.get && !desc.set) && (0, _debug.assert)(`You attempted to use @tracked on ${key}, but that element is not a class field. @tracked is only usable on class fields. Native getters and setters will autotrack add any tracked fields they encounter, so there is no need mark getters and setters with @tracked.`, !desc || !desc.value && !desc.get && !desc.set));
        var {
            getter,
            setter
        } = (0, _validator.trackedData)(key, desc ? desc.initializer : undefined);

        function get() {
            var value = getter(this);
            // Add the tag of the returned value if it is an array, since arrays
            // should always cause updates if they are consumed and then changed
            if (Array.isArray(value) || (0, _internals.isEmberArray)(value)) {
                (0, _validator.consumeTag)((0, _validator.tagFor)(value, '[]'));
            }
            return value;
        }

        function set(newValue) {
            setter(this, newValue);
            (0, _validator.dirtyTagFor)(this, SELF_TAG);
        }
        var newDesc = {
            enumerable: true,
            configurable: true,
            isTracked: true,
            get,
            set
        };
        COMPUTED_SETTERS.add(set);
        (0, _meta3.meta)(target).writeDescriptors(key, new TrackedDescriptor(get, set));
        return newDesc;
    }
    class TrackedDescriptor {
        constructor(_get, _set) {
            this._get = _get;
            this._set = _set;
            CHAIN_PASS_THROUGH.add(this);
        }
        get(obj) {
            return this._get.call(obj);
        }
        set(obj, _key, value) {
            this._set.call(obj, value);
        }
    }

    // NOTE: copied from: https://github.com/glimmerjs/glimmer.js/pull/358
    /**
     * @decorator
     *
      Gives the getter a caching behavior. The return value of the getter
      will be cached until any of the properties it is entangled with
      are invalidated. This is useful when a getter is expensive and
      used very often.
  
      For instance, in this `GuestList` class, we have the `sortedGuests`
      getter that sorts the guests alphabetically:
  
      ```javascript
        import { tracked } from '@glimmer/tracking';
  
        class GuestList {
          @tracked guests = ['Zoey', 'Tomster'];
  
          get sortedGuests() {
            return this.guests.slice().sort()
          }
        }
      ```
  
      Every time `sortedGuests` is accessed, a new array will be created and sorted,
      because JavaScript getters do not cache by default. When the guest list
      is small, like the one in the example, this is not a problem. However, if
      the guest list were to grow very large, it would mean that we would be doing
      a large amount of work each time we accessed `sortedGuests`. With `@cached`,
      we can cache the value instead:
  
      ```javascript
        import { tracked, cached } from '@glimmer/tracking';
  
        class GuestList {
          @tracked guests = ['Zoey', 'Tomster'];
  
          @cached
          get sortedGuests() {
            return this.guests.slice().sort()
          }
        }
      ```
  
      Now the `sortedGuests` getter will be cached based on autotracking.
      It will only rerun and create a new sorted array when the guests tracked
      property is updated.
  
  
      ### Tradeoffs
  
      Overuse is discouraged.
  
      In general, you should avoid using `@cached` unless you have confirmed that
      the getter you are decorating is computationally expensive, since `@cached`
      adds a small amount of overhead to the getter.
      While the individual costs are small, a systematic use of the `@cached`
      decorator can add up to a large impact overall in your app.
      Many getters and tracked properties are only accessed once during rendering,
      and then never rerendered, so adding `@cached` when unnecessary can
      negatively impact performance.
  
      Also, `@cached` may rerun even if the values themselves have not changed,
      since tracked properties will always invalidate.
      For example updating an integer value from `5` to an other `5` will trigger
      a rerun of the cached properties building from this integer.
  
      Avoiding a cache invalidation in this case is not something that can
      be achieved on the `@cached` decorator itself, but rather when updating
      the underlying tracked values, by applying some diff checking mechanisms:
  
      ```javascript
      if (nextValue !== this.trackedProp) {
        this.trackedProp = nextValue;
      }
      ```
  
      Here equal values won't update the property, therefore not triggering
      the subsequent cache invalidations of the `@cached` properties who were
      using this `trackedProp`.
  
      Remember that setting tracked data should only be done during initialization,
      or as the result of a user action. Setting tracked data during render
      (such as in a getter), is not supported.
  
      @method cached
      @static
      @for @glimmer/tracking
      @public
     */
    _exports.TrackedDescriptor = TrackedDescriptor;
    var cached = function() {
        for (var _len7 = arguments.length, args = new Array(_len7), _key8 = 0; _key8 < _len7; _key8++) {
            args[_key8] = arguments[_key8];
        }
        var [target, key, descriptor] = args;
        // Error on `@cached()`, `@cached(...args)`, and `@cached propName = value;`
        if (false /* DEBUG */ && target === undefined) throwCachedExtraneousParens();
        if (false /* DEBUG */ && (typeof target !== 'object' || typeof key !== 'string' || typeof descriptor !== 'object' || args.length !== 3)) {
            throwCachedInvalidArgsError(args);
        }
        if (false /* DEBUG */ && (!('get' in descriptor) || typeof descriptor.get !== 'function')) {
            throwCachedGetterOnlyError(key);
        }
        var caches = new WeakMap();
        var getter = descriptor.get;
        descriptor.get = function() {
            if (!caches.has(this)) {
                caches.set(this, (0, _validator.createCache)(getter.bind(this)));
            }
            return (0, _validator.getValue)(caches.get(this));
        };
    };
    _exports.cached = cached;

    function throwCachedExtraneousParens() {
        throw new Error('You attempted to use @cached(), which is not necessary nor supported. Remove the parentheses and you will be good to go!');
    }

    function throwCachedGetterOnlyError(key) {
        throw new Error(`The @cached decorator must be applied to getters. '${key}' is not a getter.`);
    }

    function throwCachedInvalidArgsError(args) {
        if (args === void 0) {
            args = [];
        }
        throw new Error(`You attempted to use @cached on with ${args.length > 1 ? 'arguments' : 'an argument'} ( @cached(${args.map(d => `'${d}'`).join(', ')}), which is not supported. Dependencies are automatically tracked, so you can just use ${'`@cached`'}`);
    }
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var searchDisabled = false;
    var flags = {
        _set: 0,
        _unprocessedNamespaces: false,
        get unprocessedNamespaces() {
            return this._unprocessedNamespaces;
        },
        set unprocessedNamespaces(v) {
            this._set++;
            this._unprocessedNamespaces = v;
        }
    };
    var unprocessedMixins = false;
    var NAMESPACES = _exports.NAMESPACES = [];
    var NAMESPACES_BY_ID = _exports.NAMESPACES_BY_ID = Object.create(null);

    function addNamespace(namespace) {
        flags.unprocessedNamespaces = true;
        NAMESPACES.push(namespace);
    }

    function removeNamespace(namespace) {
        var name = (0, _utils.getName)(namespace);
        delete NAMESPACES_BY_ID[name];
        NAMESPACES.splice(NAMESPACES.indexOf(namespace), 1);
        if (name in _environment.context.lookup && namespace === _environment.context.lookup[name]) {
            _environment.context.lookup[name] = undefined;
        }
    }

    function findNamespaces() {
        if (!flags.unprocessedNamespaces) {
            return;
        }
        var lookup = _environment.context.lookup;
        var keys = Object.keys(lookup);
        for (var key of keys) {
            // Only process entities that start with uppercase A-Z
            if (!isUppercase(key.charCodeAt(0))) {
                continue;
            }
            var obj = tryIsNamespace(lookup, key);
            if (obj) {
                (0, _utils.setName)(obj, key);
            }
        }
    }

    function findNamespace(name) {
        if (!searchDisabled) {
            processAllNamespaces();
        }
        return NAMESPACES_BY_ID[name];
    }

    function processNamespace(namespace) {
        _processNamespace([namespace.toString()], namespace, new Set());
    }

    function processAllNamespaces() {
        var unprocessedNamespaces = flags.unprocessedNamespaces;
        if (unprocessedNamespaces) {
            findNamespaces();
            flags.unprocessedNamespaces = false;
        }
        if (unprocessedNamespaces || unprocessedMixins) {
            var namespaces = NAMESPACES;
            for (var namespace of namespaces) {
                processNamespace(namespace);
            }
            unprocessedMixins = false;
        }
    }

    function isSearchDisabled() {
        return searchDisabled;
    }

    function setSearchDisabled(flag) {
        searchDisabled = Boolean(flag);
    }

    function setUnprocessedMixins() {
        unprocessedMixins = true;
    }

    function _processNamespace(paths, root, seen) {
        var idx = paths.length;
        var id = paths.join('.');
        NAMESPACES_BY_ID[id] = root;
        (0, _utils.setName)(root, id);
        // Loop over all of the keys in the namespace, looking for classes
        for (var key in root) {
            if (!hasOwnProperty.call(root, key)) {
                continue;
            }
            var obj = root[key];
            // If we are processing the `Ember` namespace, for example, the
            // `paths` will start with `["Ember"]`. Every iteration through
            // the loop will update the **second** element of this list with
            // the key, so processing `Ember.View` will make the Array
            // `['Ember', 'View']`.
            paths[idx] = key;
            // If we have found an unprocessed class
            if (obj && (0, _utils.getName)(obj) === void 0) {
                // Replace the class' `toString` with the dot-separated path
                (0, _utils.setName)(obj, paths.join('.'));
                // Support nested namespaces
            } else if (obj && isNamespace(obj)) {
                // Skip aliased namespaces
                if (seen.has(obj)) {
                    continue;
                }
                seen.add(obj);
                // Process the child namespace
                _processNamespace(paths, obj, seen);
            }
        }
        paths.length = idx; // cut out last item
    }

    function isNamespace(obj) {
        return obj != null && typeof obj === 'object' && obj.isNamespace;
    }

    function isUppercase(code) {
        return code >= 65 && code <= 90 // A
        ; // Z
    }

    function tryIsNamespace(lookup, prop) {
        try {
            var obj = lookup[prop];
            return (obj !== null && typeof obj === 'object' || typeof obj === 'function') && obj.isNamespace && obj;
        } catch (e) {
            // continue
        }
    }
});