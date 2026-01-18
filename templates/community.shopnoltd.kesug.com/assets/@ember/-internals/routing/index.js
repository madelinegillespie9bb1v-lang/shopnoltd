define("@ember/-internals/routing/index", ["exports", "@ember/routing/-internals"], function(_exports, _internals) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    Object.defineProperty(_exports, "RouterDSL", {
        enumerable: true,
        get: function() {
            return _internals.DSL;
        }
    });
    Object.defineProperty(_exports, "controllerFor", {
        enumerable: true,
        get: function() {
            return _internals.controllerFor;
        }
    });
    Object.defineProperty(_exports, "generateController", {
        enumerable: true,
        get: function() {
            return _internals.generateController;
        }
    });
    Object.defineProperty(_exports, "generateControllerFactory", {
        enumerable: true,
        get: function() {
            return _internals.generateControllerFactory;
        }
    });
});