define("@ember/-internals/owner/index", ["exports", "@glimmer/owner"], function(_exports, _owner) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.getOwner = getOwner;
    _exports.isFactory = isFactory;
    _exports.setOwner = setOwner;
    /**
      @private
      @method isFactory
      @param {Object} obj
      @return {Boolean}
      @static
     */
    function isFactory(obj) {
        return obj != null && typeof obj.create === 'function';
    }
    // NOTE: For docs, see the definition at the public API site in `@ember/owner`;
    // we document it there for the sake of public API docs and for TS consumption,
    // while having the richer `InternalOwner` representation for Ember itself.
    function getOwner(object) {
        return (0, _owner.getOwner)(object);
    }
    /**
      `setOwner` forces a new owner on a given object instance. This is primarily
      useful in some testing cases.
  
      @method setOwner
      @static
      @for @ember/owner
      @param {Object} object An object instance.
      @param {Owner} object The new owner object of the object instance.
      @since 2.3.0
      @public
    */
    function setOwner(object, owner) {
        (0, _owner.setOwner)(object, owner);
    }
});