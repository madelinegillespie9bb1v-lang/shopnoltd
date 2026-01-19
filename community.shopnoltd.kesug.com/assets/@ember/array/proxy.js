define("@ember/array/proxy", ["exports", "@ember/-internals/metal", "@ember/object", "@ember/-internals/utils", "@ember/array", "@ember/array/mutable", "@ember/debug", "@glimmer/manager", "@glimmer/validator"], function(_exports, _metal, _object, _utils, _array, _mutable, _debug, _manager, _validator) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    /**
    @module @ember/array/proxy
    */

    function isMutable(obj) {
        return Array.isArray(obj) || typeof obj.replace === 'function';
    }
    var ARRAY_OBSERVER_MAPPING = {
        willChange: '_arrangedContentArrayWillChange',
        didChange: '_arrangedContentArrayDidChange'
    };

    function customTagForArrayProxy(proxy, key) {
        (false && !(proxy instanceof ArrayProxy) && (0, _debug.assert)('[BUG] Expected a proxy', proxy instanceof ArrayProxy));
        if (key === '[]') {
            proxy._revalidate();
            return proxy._arrTag;
        } else if (key === 'length') {
            proxy._revalidate();
            return proxy._lengthTag;
        }
        return (0, _validator.tagFor)(proxy, key);
    }
    class ArrayProxy extends _object.default {
        constructor() {
            super(...arguments);
            /*
              `this._objectsDirtyIndex` determines which indexes in the `this._objects`
              cache are dirty.
                     If `this._objectsDirtyIndex === -1` then no indexes are dirty.
              Otherwise, an index `i` is dirty if `i >= this._objectsDirtyIndex`.
                     Calling `objectAt` with a dirty index will cause the `this._objects`
              cache to be recomputed.
            */
            /** @internal */
            this._objectsDirtyIndex = 0;
            /** @internal */
            this._objects = null;
            /** @internal */
            this._lengthDirty = true;
            /** @internal */
            this._length = 0;
            /** @internal */
            this._arrangedContent = null;
            /** @internal */
            this._arrangedContentIsUpdating = false;
            /** @internal */
            this._arrangedContentTag = null;
            /** @internal */
            this._arrangedContentRevision = null;
            /** @internal */
            this._lengthTag = null;
            /** @internal */
            this._arrTag = null;
        }
        init(props) {
                super.init(props);
                (0, _manager.setCustomTagFor)(this, customTagForArrayProxy);
            }
            [_metal.PROPERTY_DID_CHANGE]() {
                this._revalidate();
            }
        willDestroy() {
            this._removeArrangedContentArrayObserver();
        }
        objectAtContent(idx) {
            var arrangedContent = (0, _object.get)(this, 'arrangedContent');
            (false && !(arrangedContent) && (0, _debug.assert)('[BUG] Called objectAtContent without content', arrangedContent));
            return (0, _metal.objectAt)(arrangedContent, idx);
        }
        // See additional docs for `replace` from `MutableArray`:
        // https://api.emberjs.com/ember/release/classes/MutableArray/methods/replace?anchor=replace
        replace(idx, amt, objects) {
            (false && !((0, _object.get)(this, 'arrangedContent') === (0, _object.get)(this, 'content')) && (0, _debug.assert)('Mutating an arranged ArrayProxy is not allowed', (0, _object.get)(this, 'arrangedContent') === (0, _object.get)(this, 'content')));
            this.replaceContent(idx, amt, objects);
        }
        replaceContent(idx, amt, objects) {
            var content = (0, _object.get)(this, 'content');
            (false && !(content) && (0, _debug.assert)('[BUG] Called replaceContent without content', content));
            (false && !(isMutable(content)) && (0, _debug.assert)('Mutating a non-mutable array is not allowed', isMutable(content)));
            (0, _metal.replace)(content, idx, amt, objects);
        }
        // Overriding objectAt is not supported.
        objectAt(idx) {
            this._revalidate();
            if (this._objects === null) {
                this._objects = [];
            }
            if (this._objectsDirtyIndex !== -1 && idx >= this._objectsDirtyIndex) {
                var arrangedContent = (0, _object.get)(this, 'arrangedContent');
                if (arrangedContent) {
                    var length = this._objects.length = (0, _object.get)(arrangedContent, 'length');
                    for (var i = this._objectsDirtyIndex; i < length; i++) {
                        // SAFETY: This is expected to only ever return an instance of T. In other words, there should
                        // be no gaps in the array. Unfortunately, we can't actually assert for it since T could include
                        // any types, including null or undefined.
                        this._objects[i] = this.objectAtContent(i);
                    }
                } else {
                    this._objects.length = 0;
                }
                this._objectsDirtyIndex = -1;
            }
            return this._objects[idx];
        }
        // Overriding length is not supported.
        get length() {
            this._revalidate();
            if (this._lengthDirty) {
                var arrangedContent = (0, _object.get)(this, 'arrangedContent');
                this._length = arrangedContent ? (0, _object.get)(arrangedContent, 'length') : 0;
                this._lengthDirty = false;
            }
            (false && !(this._lengthTag) && (0, _debug.assert)('[BUG] _lengthTag is not set', this._lengthTag));
            (0, _validator.consumeTag)(this._lengthTag);
            return this._length;
        }
        set length(value) {
            var length = this.length;
            var removedCount = length - value;
            var added;
            if (removedCount === 0) {
                return;
            } else if (removedCount < 0) {
                added = new Array(-removedCount);
                removedCount = 0;
            }
            var content = (0, _object.get)(this, 'content');
            if (content) {
                (false && !(isMutable(content)) && (0, _debug.assert)('Mutating a non-mutable array is not allowed', isMutable(content)));
                (0, _metal.replace)(content, value, removedCount, added);
                this._invalidate();
            }
        }
        _updateArrangedContentArray(arrangedContent) {
            var oldLength = this._objects === null ? 0 : this._objects.length;
            var newLength = arrangedContent ? (0, _object.get)(arrangedContent, 'length') : 0;
            this._removeArrangedContentArrayObserver();
            (0, _metal.arrayContentWillChange)(this, 0, oldLength, newLength);
            this._invalidate();
            (0, _metal.arrayContentDidChange)(this, 0, oldLength, newLength, false);
            this._addArrangedContentArrayObserver(arrangedContent);
        }
        _addArrangedContentArrayObserver(arrangedContent) {
            if (arrangedContent && !arrangedContent.isDestroyed) {
                (false && !(arrangedContent !== this) && (0, _debug.assert)("Can't set ArrayProxy's content to itself", arrangedContent !== this));
                (false && !(function(arr) {
                    return Array.isArray(arr) || _array.default.detect(arr);
                }(arrangedContent)) && (0, _debug.assert)(`ArrayProxy expects a native Array, EmberArray, or ArrayProxy, but you passed ${typeof arrangedContent}`, function(arr) {
                    return Array.isArray(arr) || _array.default.detect(arr);
                }(arrangedContent)));
                (false && !(!arrangedContent.isDestroyed) && (0, _debug.assert)('ArrayProxy expected its contents to not be destroyed', !arrangedContent.isDestroyed));
                (0, _metal.addArrayObserver)(arrangedContent, this, ARRAY_OBSERVER_MAPPING);
                this._arrangedContent = arrangedContent;
            }
        }
        _removeArrangedContentArrayObserver() {
            if (this._arrangedContent) {
                (0, _metal.removeArrayObserver)(this._arrangedContent, this, ARRAY_OBSERVER_MAPPING);
            }
        }
        _arrangedContentArrayWillChange() {}
        _arrangedContentArrayDidChange(_proxy, idx, removedCnt, addedCnt) {
            (0, _metal.arrayContentWillChange)(this, idx, removedCnt, addedCnt);
            var dirtyIndex = idx;
            if (dirtyIndex < 0) {
                var length = (0, _object.get)(this._arrangedContent, 'length');
                dirtyIndex += length + removedCnt - addedCnt;
            }
            if (this._objectsDirtyIndex === -1 || this._objectsDirtyIndex > dirtyIndex) {
                this._objectsDirtyIndex = dirtyIndex;
            }
            this._lengthDirty = true;
            (0, _metal.arrayContentDidChange)(this, idx, removedCnt, addedCnt, false);
        }
        _invalidate() {
            this._objectsDirtyIndex = 0;
            this._lengthDirty = true;
        }
        _revalidate() {
            if (this._arrangedContentIsUpdating === true) return;
            if (this._arrangedContentTag === null || !(0, _validator.validateTag)(this._arrangedContentTag, this._arrangedContentRevision)) {
                var arrangedContent = this.get('arrangedContent');
                if (this._arrangedContentTag === null) {
                    // This is the first time the proxy has been setup, only add the observer
                    // don't trigger any events
                    this._addArrangedContentArrayObserver(arrangedContent);
                } else {
                    this._arrangedContentIsUpdating = true;
                    this._updateArrangedContentArray(arrangedContent);
                    this._arrangedContentIsUpdating = false;
                }
                var arrangedContentTag = this._arrangedContentTag = (0, _validator.tagFor)(this, 'arrangedContent');
                this._arrangedContentRevision = (0, _validator.valueForTag)(this._arrangedContentTag);
                if ((0, _utils.isObject)(arrangedContent)) {
                    this._lengthTag = (0, _validator.combine)([arrangedContentTag, (0, _metal.tagForProperty)(arrangedContent, 'length')]);
                    this._arrTag = (0, _validator.combine)([arrangedContentTag, (0, _metal.tagForProperty)(arrangedContent, '[]')]);
                } else {
                    this._lengthTag = this._arrTag = arrangedContentTag;
                }
            }
        }
    }
    ArrayProxy.reopen(_mutable.default, {
        arrangedContent: (0, _metal.alias)('content')
    });
    var _default = _exports.default = ArrayProxy;
});