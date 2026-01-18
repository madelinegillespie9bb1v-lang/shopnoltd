define("@ember/-internals/runtime/lib/mixins/-proxy", ["exports", "@ember/-internals/meta", "@ember/object/mixin", "@ember/-internals/metal", "@ember/-internals/utils", "@ember/debug", "@glimmer/manager", "@glimmer/validator"], function(_exports, _meta, _mixin, _metal, _utils, _debug, _manager, _validator) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.contentFor = contentFor;
    _exports.default = void 0;
    /**
    @module ember
    */

    function contentFor(proxy) {
        var content = (0, _metal.get)(proxy, 'content');
        // SAFETY: Ideally we'd assert instead of casting, but @glimmer/validator doesn't give us
        // sufficient public types for this. Previously this code was .js and worked correctly so
        // hopefully this is sufficiently reliable.
        (0, _validator.updateTag)((0, _metal.tagForObject)(proxy), (0, _metal.tagForObject)(content));
        return content;
    }

    function customTagForProxy(proxy, key, addMandatorySetter) {
        (false && !((0, _utils.isProxy)(proxy)) && (0, _debug.assert)('Expected a proxy', (0, _utils.isProxy)(proxy)));
        var meta = (0, _validator.tagMetaFor)(proxy);
        var tag = (0, _validator.tagFor)(proxy, key, meta);
        if (false /* DEBUG */ ) {
            // TODO: Replace this with something more first class for tracking tags in DEBUG
            // SAFETY: This is not an officially supported property but setting shouldn't cause issues.
            tag._propertyKey = key;
        }
        if (key in proxy) {
            if (false /* DEBUG */ && addMandatorySetter) {
                (false && !(_utils.setupMandatorySetter) && (0, _debug.assert)('[BUG] setupMandatorySetter should be set when debugging', setupMandatorySetter));
                (0, _utils.setupMandatorySetter)(tag, proxy, key);
            }
            return tag;
        } else {
            var tags = [tag, (0, _validator.tagFor)(proxy, 'content', meta)];
            var content = contentFor(proxy);
            if ((0, _utils.isObject)(content)) {
                tags.push((0, _metal.tagForProperty)(content, key, addMandatorySetter));
            }
            return (0, _validator.combine)(tags);
        }
    }
    var ProxyMixin = _mixin.default.create({
        /**
          The object whose properties will be forwarded.
             @property content
          @type {unknown}
          @default null
          @public
        */
        content: null,
        init() {
            this._super(...arguments);
            (0, _utils.setProxy)(this);
            (0, _metal.tagForObject)(this);
            (0, _manager.setCustomTagFor)(this, customTagForProxy);
        },
        willDestroy() {
            this.set('content', null);
            this._super(...arguments);
        },
        isTruthy: (0, _metal.computed)('content', function() {
            return Boolean((0, _metal.get)(this, 'content'));
        }),
        unknownProperty(key) {
            var content = contentFor(this);
            return content ? (0, _metal.get)(content, key) : undefined;
        },
        setUnknownProperty(key, value) {
            var m = (0, _meta.meta)(this);
            if (m.isInitializing() || m.isPrototypeMeta(this)) {
                // if marked as prototype or object is initializing then just
                // defineProperty rather than delegate
                (0, _metal.defineProperty)(this, key, null, value);
                return value;
            }
            var content = contentFor(this);
            (false && !(content) && (0, _debug.assert)(`Cannot delegate set('${key}', ${value}) to the 'content' property of object proxy ${this}: its 'content' is undefined.`, content)); // SAFETY: We don't actually guarantee that this is an object, so this isn't necessarily safe :(
            return (0, _metal.set)(content, key, value);
        }
    });
    var _default = _exports.default = ProxyMixin;
});