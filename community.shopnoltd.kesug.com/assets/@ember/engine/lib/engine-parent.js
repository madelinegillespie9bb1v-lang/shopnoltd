define("@ember/engine/lib/engine-parent", ["exports"], function(_exports) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.ENGINE_PARENT = void 0;
    _exports.getEngineParent = getEngineParent;
    _exports.setEngineParent = setEngineParent;
    var ENGINE_PARENT = _exports.ENGINE_PARENT = Symbol('ENGINE_PARENT');
    /**
      `getEngineParent` retrieves an engine instance's parent instance.
  
      @method getEngineParent
      @param {EngineInstance} engine An engine instance.
      @return {EngineInstance} The parent engine instance.
      @for @ember/engine
      @static
      @private
    */
    function getEngineParent(engine) {
        return engine[ENGINE_PARENT];
    }
    /**
      `setEngineParent` sets an engine instance's parent instance.
  
      @method setEngineParent
      @param {EngineInstance} engine An engine instance.
      @param {EngineInstance} parent The parent engine instance.
      @private
    */
    function setEngineParent(engine, parent) {
        engine[ENGINE_PARENT] = parent;
    }
});