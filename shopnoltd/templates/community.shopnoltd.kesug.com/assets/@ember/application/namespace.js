define("@ember/application/namespace", ["exports", "@ember/-internals/metal", "@ember/object", "@ember/-internals/utils", "@ember/debug"], function(_exports, _metal, _object, _utils, _debug) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    /**
    @module @ember/application/namespace
    */
    // Preloaded into namespaces

    /**
      A Namespace is an object usually used to contain other objects or methods
      such as an application or framework. Create a namespace anytime you want
      to define one of these new containers.
  
      # Example Usage
  
      ```javascript
      MyFramework = Ember.Namespace.create({
        VERSION: '1.0.0'
      });
      ```
  
      @class Namespace
      @extends EmberObject
      @public
    */
    class Namespace extends _object.default {
        init(properties) {
            super.init(properties);
            (0, _metal.addNamespace)(this);
        }
        toString() {
            var existing_name = (0, _object.get)(this, 'name') || (0, _object.get)(this, 'modulePrefix');
            if (existing_name) {
                (false && !(typeof existing_name === 'string') && (0, _debug.assert)("name wasn't a string", typeof existing_name === 'string'));
                return existing_name;
            }
            (0, _metal.findNamespaces)();
            var name = (0, _utils.getName)(this);
            if (name === undefined) {
                name = (0, _utils.guidFor)(this);
                (0, _utils.setName)(this, name);
            }
            return name;
        }
        nameClasses() {
            (0, _metal.processNamespace)(this);
        }
        destroy() {
            (0, _metal.removeNamespace)(this);
            return super.destroy();
        }
    }
    Namespace.NAMESPACES = _metal.NAMESPACES;
    Namespace.NAMESPACES_BY_ID = _metal.NAMESPACES_BY_ID;
    Namespace.processAll = _metal.processAllNamespaces;
    Namespace.byName = _metal.findNamespace;
    // Declare on the prototype to have a single shared value.
    Namespace.prototype.isNamespace = true;
    var _default = _exports.default = Namespace;
});