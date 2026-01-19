define("@ember/engine/instance", ["exports", "@ember/object", "@ember/-internals/runtime", "@ember/debug", "@ember/-internals/container", "@ember/-internals/utils", "@ember/engine/lib/engine-parent", "@ember/-internals/owner", "@ember/engine"], function(_exports, _object, _runtime, _debug, _container, _utils, _engineParent, _owner, _engine) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    /**
    @module @ember/engine
    */

    class EngineInstance extends _object.default.extend(_runtime.RegistryProxyMixin, _runtime.ContainerProxyMixin) {
        constructor() {
            super(...arguments);
            this._booted = false;
            this._bootPromise = null;
        }
        /**
         @private
         @method setupRegistry
         @param {Registry} registry
         @param {BootOptions} options
         */
        // This is effectively an "abstract" method: it defines the contract a
        // subclass (e.g. `ApplicationInstance`) must follow to implement this
        // behavior, but an `EngineInstance` has no behavior of its own here.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        static setupRegistry(_registry, _options) {}
        init(properties) {
            super.init(properties);
            // Ensure the guid gets setup for this instance
            (0, _utils.guidFor)(this);
            this.base ? ? = this.application;
            // Create a per-instance registry that will use the application's registry
            // as a fallback for resolving registrations.
            var registry = this.__registry__ = new _container.Registry({
                fallback: this.base.__registry__
            });
            // Create a per-instance container from the instance's registry
            this.__container__ = registry.container({
                owner: this
            });
            this._booted = false;
        }
        /**
          Initialize the `EngineInstance` and return a promise that resolves
          with the instance itself when the boot process is complete.
             The primary task here is to run any registered instance initializers.
             See the documentation on `BootOptions` for the options it takes.
             @public
          @method boot
          @param options {Object}
          @return {Promise<EngineInstance,Error>}
        */
        boot(options) {
            if (this._bootPromise) {
                return this._bootPromise;
            }
            this._bootPromise = new _runtime.RSVP.Promise(resolve => {
                resolve(this._bootSync(options));
            });
            return this._bootPromise;
        }
        /**
          Unfortunately, a lot of existing code assumes booting an instance is
          synchronous – specifically, a lot of tests assume the last call to
          `app.advanceReadiness()` or `app.reset()` will result in a new instance
          being fully-booted when the current runloop completes.
             We would like new code (like the `visit` API) to stop making this
          assumption, so we created the asynchronous version above that returns a
          promise. But until we have migrated all the code, we would have to expose
          this method for use *internally* in places where we need to boot an instance
          synchronously.
             @private
        */
        _bootSync(options) {
            if (this._booted) {
                return this;
            }
            (false && !((0, _engineParent.getEngineParent)(this)) && (0, _debug.assert)("An engine instance's parent must be set via `setEngineParent(engine, parent)` prior to calling `engine.boot()`.", (0, _engineParent.getEngineParent)(this)));
            this.cloneParentDependencies();
            this.setupRegistry(options);
            this.base.runInstanceInitializers(this);
            this._booted = true;
            return this;
        }
        setupRegistry(options) {
            if (options === void 0) {
                options = this.__container__.lookup('-environment:main');
            }
            this.constructor.setupRegistry(this.__registry__, options);
        }
        /**
         Unregister a factory.
            Overrides `RegistryProxy#unregister` in order to clear any cached instances
         of the unregistered factory.
            @public
         @method unregister
         @param {String} fullName
         */
        unregister(fullName) {
            this.__container__.reset(fullName);
            // We overwrote this method from RegistryProxyMixin.
            this.__registry__.unregister(fullName);
        }
        /**
          Build a new `EngineInstance` that's a child of this instance.
             Engines must be registered by name with their parent engine
          (or application).
             @private
          @method buildChildEngineInstance
          @param name {String} the registered name of the engine.
          @param options {Object} options provided to the engine instance.
          @return {EngineInstance,Error}
        */
        buildChildEngineInstance(name, options) {
            if (options === void 0) {
                options = {};
            }
            var ChildEngine = this.lookup(`engine:${name}`);
            if (!ChildEngine) {
                throw new Error(`You attempted to mount the engine '${name}', but it is not registered with its parent.`);
            }
            (false && !(ChildEngine instanceof _engine.default) && (0, _debug.assert)('expected an Engine', ChildEngine instanceof _engine.default));
            var engineInstance = ChildEngine.buildInstance(options);
            (0, _engineParent.setEngineParent)(engineInstance, this);
            return engineInstance;
        }
        /**
          Clone dependencies shared between an engine instance and its parent.
             @private
          @method cloneParentDependencies
        */
        cloneParentDependencies() {
            var parent = (0, _engineParent.getEngineParent)(this);
            (false && !(parent) && (0, _debug.assert)('expected parent', parent));
            var registrations = ['route:basic', 'service:-routing'];
            registrations.forEach(key => {
                var registration = parent.resolveRegistration(key);
                (false && !((0, _owner.isFactory)(registration)) && (0, _debug.assert)('expected registration to be a factory', (0, _owner.isFactory)(registration)));
                this.register(key, registration);
            });
            var env = parent.lookup('-environment:main');
            this.register('-environment:main', env, {
                instantiate: false
            });
            // The type annotation forces TS to (a) validate that these match and (b)
            // *notice* that they match, e.g. below on the `singletons.push()`.
            var singletons = ['router:main', (0, _container.privatize)
                `-bucket-cache:main`, '-view-registry:main', `renderer:-dom`, 'service:-document'
            ];
            if (env['isInteractive']) {
                singletons.push('event_dispatcher:main');
            }
            singletons.forEach(key => {
                // SAFETY: We already expect this to be a singleton
                var singleton = parent.lookup(key);
                this.register(key, singleton, {
                    instantiate: false
                });
            });
        }
    }
    var _default = _exports.default = EngineInstance;
});