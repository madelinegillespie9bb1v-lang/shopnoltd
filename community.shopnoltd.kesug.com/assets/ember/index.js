define("ember/index", ["exports", "require", "@ember/-internals/environment", "@ember/-internals/utils", "@ember/-internals/container", "@ember/instrumentation", "@ember/-internals/meta", "@ember/-internals/metal", "@ember/canary-features", "@ember/debug", "backburner.js", "@ember/controller", "@ember/service", "@ember/object", "@ember/object/-internals", "@ember/object/compat", "@ember/object/computed", "@ember/object/events", "@ember/-internals/runtime", "@ember/-internals/glimmer", "ember/version", "@ember/-internals/views", "@ember/debug/container-debug-adapter", "@ember/debug/data-adapter", "@ember/runloop", "@ember/-internals/error-handling", "@ember/array", "@ember/array/mutable", "@ember/array/proxy", "@ember/application", "@ember/application/instance", "@ember/application/namespace", "@ember/component", "@ember/component/helper", "@ember/engine", "@ember/engine/instance", "@ember/enumerable", "@ember/enumerable/mutable", "@ember/object/core", "@ember/object/evented", "@ember/object/mixin", "@ember/object/observable", "@ember/object/observers", "@ember/object/proxy", "@ember/object/promise-proxy-mixin", "@ember/routing/hash-location", "@ember/routing/history-location", "@ember/routing/none-location", "@ember/routing/route", "@ember/routing/router", "@ember/routing/-internals", "@ember/utils", "@glimmer/runtime", "@glimmer/manager", "@ember/destroyable"], function(_exports, _require, _environment, utils, _container, instrumentation, _meta, metal, _canaryFeatures, _debug, _backburner, _controller, _service, _object, _internals, _compat, _computed, _events, _runtime, _glimmer, _version, views, _containerDebugAdapter, _dataAdapter, _runloop, _errorHandling, _array, _mutable, _proxy, _application, _instance, _namespace, _component, _helper, _engine, _instance2, _enumerable, _mutable2, _core, _evented, _mixin, _observable, _observers, _proxy2, _promiseProxyMixin, _hashLocation, _historyLocation, _noneLocation, _route, _router, _internals2, _utils2, glimmerRuntime, _manager, _destroyable) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var EmberDebug = _debug;
    /**
    @module ember
    */

    // eslint-disable-next-line @typescript-eslint/no-namespace
    var Ember;
    (function(Ember) {
        Ember.isNamespace = true;

        function toString() {
            return 'Ember';
        }
        Ember.toString = toString;
        // ****@ember/-internals/container****
        Ember.Container = _container.Container;
        Ember.Registry = _container.Registry;
        // ****@ember/-internals/glimmer****
        // Partially re-exported from @glimmer/manager
        Ember._setComponentManager = _glimmer.setComponentManager;
        Ember._componentManagerCapabilities = _glimmer.componentCapabilities;
        Ember._modifierManagerCapabilities = _glimmer.modifierCapabilities;
        // ****@ember/-internals/meta****
        Ember.meta = _meta.meta;
        // ****@ember/-internals/metal****
        Ember._createCache = metal.createCache; // Also @glimmer/validator
        Ember._cacheGetValue = metal.getValue; // Also @glimmer/validator
        Ember._cacheIsConst = metal.isConst; // Also @glimmer/validator
        Ember._descriptor = metal.nativeDescDecorator;
        Ember._getPath = metal._getPath;
        Ember._setClassicDecorator = metal.setClassicDecorator;
        Ember._tracked = metal.tracked; // Also exported from @glimmer/tracking
        Ember.beginPropertyChanges = metal.beginPropertyChanges;
        Ember.changeProperties = metal.changeProperties;
        Ember.endPropertyChanges = metal.endPropertyChanges;
        Ember.hasListeners = metal.hasListeners;
        Ember.libraries = metal.libraries;
        // ****@ember/-internals/runtime****
        Ember._ContainerProxyMixin = _runtime.ContainerProxyMixin;
        Ember._ProxyMixin = _runtime._ProxyMixin;
        Ember._RegistryProxyMixin = _runtime.RegistryProxyMixin;
        Ember.ActionHandler = _runtime.ActionHandler;
        Ember.Comparable = _runtime.Comparable;
        // This syntax is namespace-specific: `import` in a namespace is aliasing one
        // namespace to another, while `export` marks the item public on the namespace
        // (as with the rest of the exported items).
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Ember.RSVP = _runtime.RSVP;
        // ****@ember/-internals/view****
        Ember.ComponentLookup = views.ComponentLookup;
        Ember.EventDispatcher = views.EventDispatcher;
        // ****@ember/-internals/utils****
        Ember._Cache = utils.Cache;
        Ember.GUID_KEY = utils.GUID_KEY;
        Ember.canInvoke = utils.canInvoke;
        Ember.generateGuid = utils.generateGuid;
        Ember.guidFor = utils.guidFor;
        Ember.uuid = utils.uuid;
        Ember.wrap = utils.wrap;
        // ****@ember/application****
        Ember.getOwner = _application.getOwner;
        Ember.onLoad = _application.onLoad;
        Ember.runLoadHooks = _application.runLoadHooks;
        Ember.setOwner = _application.setOwner;
        Ember.Application = _application.default;
        // ****@ember/application/instance****
        Ember.ApplicationInstance = _instance.default;
        // // ****@ember/application/namespace****
        Ember.Namespace = _namespace.default;
        // ****@ember/array****
        Ember.A = _array.A;
        Ember.Array = _array.default;
        Ember.NativeArray = _array.NativeArray;
        Ember.isArray = _array.isArray;
        Ember.makeArray = _array.makeArray;
        // ****@ember/array/mutable****
        Ember.MutableArray = _mutable.default;
        // ****@ember/array/proxy****
        Ember.ArrayProxy = _proxy.default;
        // ****@ember/canary-features****
        Ember.FEATURES = {
            isEnabled: _canaryFeatures.isEnabled,
            ..._canaryFeatures.FEATURES
        };
        // ****@ember/component****
        Ember._Input = _component.Input;
        Ember.Component = _component.default;
        // // ****@ember/component/helper****
        Ember.Helper = _helper.default;
        // ****@ember/controller****
        Ember.Controller = _controller.default;
        Ember.ControllerMixin = _controller.ControllerMixin;
        // ****@ember/debug****
        Ember._captureRenderTree = _debug.captureRenderTree;
        Ember.assert = EmberDebug.assert;
        Ember.warn = EmberDebug.warn;
        Ember.debug = EmberDebug.debug;
        Ember.deprecate = EmberDebug.deprecate;
        Ember.deprecateFunc = EmberDebug.deprecateFunc;
        Ember.runInDebug = EmberDebug.runInDebug;
        Ember.inspect = EmberDebug.inspect;
        Ember.Debug = {
            registerDeprecationHandler: EmberDebug.registerDeprecationHandler,
            registerWarnHandler: EmberDebug.registerWarnHandler,
            // ****@ember/-internals/metal****
            isComputed: metal.isComputed
        };
        // ****@ember/debug/container-debug-adapter****
        Ember.ContainerDebugAdapter = _containerDebugAdapter.default;
        // ****@ember/debug/data-adapter****
        Ember.DataAdapter = _dataAdapter.default;
        // ****@ember/destroyable****
        Ember._assertDestroyablesDestroyed = _destroyable.assertDestroyablesDestroyed;
        Ember._associateDestroyableChild = _destroyable.associateDestroyableChild;
        Ember._enableDestroyableTracking = _destroyable.enableDestroyableTracking;
        Ember._isDestroying = _destroyable.isDestroying;
        Ember._isDestroyed = _destroyable.isDestroyed;
        Ember._registerDestructor = _destroyable.registerDestructor;
        Ember._unregisterDestructor = _destroyable.unregisterDestructor;
        Ember.destroy = _destroyable.destroy;
        // ****@ember/engine****
        Ember.Engine = _engine.default;
        // ****@ember/engine/instance****
        Ember.EngineInstance = _instance2.default;
        // ****@ember/enumerable****
        Ember.Enumerable = _enumerable.default;
        // ****@ember/enumerable/mutable****
        Ember.MutableEnumerable = _mutable2.default;
        // ****@ember/instrumentation****
        /** @private */
        Ember.instrument = instrumentation.instrument;
        /** @private */
        Ember.subscribe = instrumentation.subscribe;
        /** @private */
        Ember.Instrumentation = {
            instrument: instrumentation.instrument,
            subscribe: instrumentation.subscribe,
            unsubscribe: instrumentation.unsubscribe,
            reset: instrumentation.reset
        };
        // ****@ember/object****
        Ember.Object = _object.default;
        Ember._action = _object.action;
        Ember.computed = _object.computed;
        Ember.defineProperty = _object.defineProperty;
        Ember.get = _object.get;
        Ember.getProperties = _object.getProperties;
        Ember.notifyPropertyChange = _object.notifyPropertyChange;
        Ember.observer = _object.observer;
        Ember.set = _object.set;
        Ember.trySet = _object.trySet;
        Ember.setProperties = _object.setProperties;
        // ****@ember/object/-internals****
        Ember.cacheFor = _internals.cacheFor;
        // ****@ember/object/compat****
        Ember._dependentKeyCompat = _compat.dependentKeyCompat;
        // ****@ember/object/computed****
        Ember.ComputedProperty = _computed.default;
        Ember.expandProperties = _computed.expandProperties;
        // ****@ember/object/core****
        Ember.CoreObject = _core.default;
        // ****@ember/object/evented****
        Ember.Evented = _evented.default;
        Ember.on = _evented.on;
        // ****@ember/object/events****
        Ember.addListener = _events.addListener;
        Ember.removeListener = _events.removeListener;
        Ember.sendEvent = _events.sendEvent;
        // ****@ember/object/mixin****
        Ember.Mixin = _mixin.default;
        Ember.mixin = _mixin.mixin;
        // ****@ember/object/observable****
        Ember.Observable = _observable.default;
        // ****@ember/object/observers****
        Ember.addObserver = _observers.addObserver;
        Ember.removeObserver = _observers.removeObserver;
        // ****@ember/object/promise-proxy-mixin****
        Ember.PromiseProxyMixin = _promiseProxyMixin.default;
        // ****@ember/object/proxy****
        Ember.ObjectProxy = _proxy2.default;
        // ****@ember/routing/-internals****
        Ember.RouterDSL = _internals2.DSL;
        Ember.controllerFor = _internals2.controllerFor;
        Ember.generateController = _internals2.generateController;
        Ember.generateControllerFactory = _internals2.generateControllerFactory;
        // ****@ember/routing/hash-location****
        Ember.HashLocation = _hashLocation.default;
        // ****@ember/routing/history-location****
        Ember.HistoryLocation = _historyLocation.default;
        // ****@ember/routing/none-location****
        Ember.NoneLocation = _noneLocation.default;
        // ****@ember/routing/route****
        Ember.Route = _route.default;
        // ****@ember/routing/router****
        Ember.Router = _router.default;
        // // ****@ember/runloop****
        Ember.run = _runloop.run;
        // // ****@ember/service****
        Ember.Service = _service.default;
        // ****@ember/utils****
        Ember.compare = _utils2.compare;
        Ember.isBlank = _utils2.isBlank;
        Ember.isEmpty = _utils2.isEmpty;
        Ember.isEqual = _utils2.isEqual;
        Ember.isNone = _utils2.isNone;
        Ember.isPresent = _utils2.isPresent;
        Ember.typeOf = _utils2.typeOf;
        // ****@ember/version****
        /**
          The semantic version
             @property VERSION
          @type String
          @public
        */
        Ember.VERSION = _version.default;
        Ember.ViewUtils = {
            // ****@ember/-internals/views****
            getChildViews: views.getChildViews,
            getElementView: views.getElementView,
            getRootViews: views.getRootViews,
            getViewBounds: views.getViewBounds,
            getViewBoundingClientRect: views.getViewBoundingClientRect,
            getViewClientRects: views.getViewClientRects,
            getViewElement: views.getViewElement,
            isSimpleClick: views.isSimpleClick,
            // ****@ember/-internals/glimmer****
            isSerializationFirstNode: _glimmer.isSerializationFirstNode
        };
        // ****@glimmer/manager****
        Ember._getComponentTemplate = _manager.getComponentTemplate;
        Ember._helperManagerCapabilities = _manager.helperCapabilities;
        Ember._setComponentTemplate = _manager.setComponentTemplate;
        Ember._setHelperManager = _manager.setHelperManager;
        Ember._setModifierManager = _manager.setModifierManager;
        // ****@glimmer/runtime****
        Ember._templateOnlyComponent = glimmerRuntime.templateOnlyComponent;
        Ember._invokeHelper = glimmerRuntime.invokeHelper;
        Ember._hash = glimmerRuntime.hash;
        Ember._array = glimmerRuntime.array;
        Ember._concat = glimmerRuntime.concat;
        Ember._get = glimmerRuntime.get;
        Ember._on = glimmerRuntime.on;
        Ember._fn = glimmerRuntime.fn;
        // Backburner
        Ember._Backburner = _backburner.default;
        // // ****@ember/controller, @ember/service****
        /**
          Namespace for injection helper methods.
             @class inject
          @namespace Ember
          @static
          @public
        */
        function inject() {
            // uses `globalThis` to avoid clobbering with `Ember.Object` in TS namespace
            (false && !(false) && (0, _debug.assert)(`Injected properties must be created through helpers, see '${globalThis.Object.keys(inject).map(k => `'inject.${k}'`).join(' or ')}'`));
        }
        Ember.inject = inject;
        // ****@ember/controller****
        inject.controller = _controller.inject;
        // ****@ember/service****
        inject.service = _service.service;
        Ember.__loader = {
            require: _require.default,
            define,
            // @ts-expect-error These properties don't appear as being defined
            registry: typeof requirejs !== 'undefined' ? requirejs.entries : _require.default.entries
        };
    })(Ember || (Ember = {}));
    Object.defineProperty(Ember, 'ENV', {
        get: _environment.getENV,
        enumerable: false
    });
    Object.defineProperty(Ember, 'lookup', {
        get: _environment.getLookup,
        set: _environment.setLookup,
        enumerable: false
    });
    Object.defineProperty(Ember, 'onerror', {
        get: _errorHandling.getOnerror,
        set: _errorHandling.setOnerror,
        enumerable: false
    });
    Object.defineProperty(Ember, 'testing', {
        get: EmberDebug.isTesting,
        set: EmberDebug.setTesting,
        enumerable: false
    });
    Object.defineProperty(Ember, 'BOOTED', {
        configurable: false,
        enumerable: false,
        get: metal.isNamespaceSearchDisabled,
        set: metal.setNamespaceSearchDisabled
    });
    Object.defineProperty(Ember, 'TEMPLATES', {
        get: _glimmer.getTemplates,
        set: _glimmer.setTemplates,
        configurable: false,
        enumerable: false
    });
    Object.defineProperty(Ember, 'TEMPLATES', {
        get: _glimmer.getTemplates,
        set: _glimmer.setTemplates,
        configurable: false,
        enumerable: false
    });
    // ****@ember/debug****
    Object.defineProperty(Ember, 'testing', {
        get: EmberDebug.isTesting,
        set: EmberDebug.setTesting,
        enumerable: false
    });
    (0, _application.runLoadHooks)('Ember.Application', _application.default);
    var EmberHandlebars = {
        template: _glimmer.template,
        Utils: {
            escapeExpression: _glimmer.escapeExpression
        }
    };
    var EmberHTMLBars = {
        template: _glimmer.template
    };

    function defineEmberTemplateCompilerLazyLoad(key) {
        Object.defineProperty(Ember, key, {
            configurable: true,
            enumerable: true,
            get() {
                if ((0, _require.has)('ember-template-compiler')) {
                    var templateCompiler = (0, _require.default)("ember-template-compiler");
                    EmberHTMLBars.precompile = EmberHandlebars.precompile = templateCompiler.precompile;
                    EmberHTMLBars.compile = EmberHandlebars.compile = templateCompiler.compile;
                    Object.defineProperty(Ember, 'HTMLBars', {
                        configurable: true,
                        writable: true,
                        enumerable: true,
                        value: EmberHTMLBars
                    });
                    Object.defineProperty(Ember, 'Handlebars', {
                        configurable: true,
                        writable: true,
                        enumerable: true,
                        value: EmberHandlebars
                    });
                }
                return key === 'Handlebars' ? EmberHandlebars : EmberHTMLBars;
            }
        });
    }
    defineEmberTemplateCompilerLazyLoad('HTMLBars');
    defineEmberTemplateCompilerLazyLoad('Handlebars');
    // do this to ensure that Ember.Test is defined properly on the global
    // if it is present.
    function defineEmberTestingLazyLoad(key) {
        Object.defineProperty(Ember, key, {
            configurable: true,
            enumerable: true,
            get() {
                if ((0, _require.has)('ember-testing')) {
                    var testing = (0, _require.default)("ember-testing");
                    var {
                        Test,
                        Adapter,
                        QUnitAdapter,
                        setupForTesting
                    } = testing;
                    // @ts-expect-error We should not do this
                    Test.Adapter = Adapter;
                    // @ts-expect-error We should not do this
                    Test.QUnitAdapter = QUnitAdapter;
                    Object.defineProperty(Ember, 'Test', {
                        configurable: true,
                        writable: true,
                        enumerable: true,
                        value: Test
                    });
                    Object.defineProperty(Ember, 'setupForTesting', {
                        configurable: true,
                        writable: true,
                        enumerable: true,
                        value: setupForTesting
                    });
                    return key === 'Test' ? Test : setupForTesting;
                }
                return undefined;
            }
        });
    }
    defineEmberTestingLazyLoad('Test');
    defineEmberTestingLazyLoad('setupForTesting');
    // @ts-expect-error Per types, runLoadHooks requires a second parameter. Should we loosen types?
    (0, _application.runLoadHooks)('Ember');
    var _default = _exports.default = Ember;
});