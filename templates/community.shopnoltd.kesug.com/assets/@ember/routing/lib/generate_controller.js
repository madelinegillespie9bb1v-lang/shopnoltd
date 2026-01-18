define("@ember/routing/lib/generate_controller", ["exports", "@ember/-internals/metal", "@ember/controller", "@ember/debug"], function(_exports, _metal, _controller, _debug) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = generateController;
    _exports.generateControllerFactory = generateControllerFactory;
    /**
     @module @ember/routing
    */
    /**
      Generates a controller factory
  
      @for Ember
      @method generateControllerFactory
      @private
    */
    function generateControllerFactory(owner, controllerName) {
        var factoryManager = owner.factoryFor('controller:basic');
        (false && !(factoryManager !== undefined) && (0, _debug.assert)('[BUG] unexpectedly missing a factoryManager for `controller:basic`', factoryManager !== undefined)); // SAFETY: This is *not* safe, and the cast should be removed in favor of the
        // `assert()` below after altering *tests*. It is left in this state for the
        // moment in the interest of keeping type-only changes separate from changes
        // to the runtime behavior of the system, even for tests.
        var Factory = factoryManager.class;
        // assert(
        //   '[BUG] factory for `controller:main` is unexpectedly not a Controller',
        //   ((factory): factory is typeof Controller => factory === Controller)(Factory)
        // );
        Factory = Factory.extend({
            toString() {
                return `(generated ${controllerName} controller)`;
            }
        });
        var fullName = `controller:${controllerName}`;
        owner.register(fullName, Factory);
        return owner.factoryFor(fullName);
    }
    /**
      Generates and instantiates a controller extending from `controller:basic`
      if present, or `Controller` if not.
  
      @for Ember
      @method generateController
      @private
      @since 1.3.0
    */
    function generateController(owner, controllerName) {
        generateControllerFactory(owner, controllerName);
        var fullName = `controller:${controllerName}`;
        var instance = owner.lookup(fullName);
        (false && !(instance instanceof _controller.default) && (0, _debug.assert)('Expected an instance of controller', instance instanceof _controller.default));
        if (false /* DEBUG */ ) {
            if ((0, _metal.get)(instance, 'namespace.LOG_ACTIVE_GENERATION')) {
                (0, _debug.info)(`generated -> ${fullName}`, {
                    fullName
                });
            }
        }
        return instance;
    }
});