define("@ember/-internals/views/lib/views/states", ["exports", "@ember/-internals/utils", "@ember/debug", "@ember/instrumentation", "@ember/runloop"], function(_exports, _utils, _debug, _instrumentation, _runloop) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var DEFAULT = Object.freeze({
        // appendChild is only legal while rendering the buffer.
        appendChild() {
            throw new Error("You can't use appendChild outside of the rendering process");
        },
        // Handle events from `Ember.EventDispatcher`
        handleEvent() {
            return true; // continue event propagation
        },
        rerender() {},
        destroy() {}
    });
    var PRE_RENDER = Object.freeze({
        ...DEFAULT
    });
    var HAS_ELEMENT = Object.freeze({
        ...DEFAULT,
        rerender(view) {
            view.renderer.rerender();
        },
        destroy(view) {
            view.renderer.remove(view);
        },
        // Handle events from `Ember.EventDispatcher`
        handleEvent(view, eventName, event) {
            if (view.has(eventName)) {
                // Handler should be able to re-dispatch events, so we don't
                // preventDefault or stopPropagation.
                return (0, _instrumentation.flaggedInstrument)(`interaction.${eventName}`, {
                    event,
                    view
                }, () => {
                    return (0, _runloop.join)(view, view.trigger, eventName, event);
                });
            } else {
                return true; // continue event propagation
            }
        }
    });
    var IN_DOM = Object.freeze({
        ...HAS_ELEMENT,
        enter(view) {
            // Register the view for event handling. This hash is used by
            // Ember.EventDispatcher to dispatch incoming events.
            view.renderer.register(view);
            if (false /* DEBUG */ ) {
                var elementId = view.elementId;
                (false && !(_utils.teardownMandatorySetter) && (0, _debug.assert)('[BUG] Expected teardownMandatorySetter to be set in DEBUG mode', teardownMandatorySetter));
                (0, _utils.teardownMandatorySetter)(view, 'elementId');
                Object.defineProperty(view, 'elementId', {
                    configurable: true,
                    enumerable: true,
                    get() {
                        return elementId;
                    },
                    set(value) {
                        if (value !== elementId) {
                            throw new Error("Changing a view's elementId after creation is not allowed");
                        }
                    }
                });
            }
        }
    });
    var DESTROYING = Object.freeze({
        ...DEFAULT,
        appendChild() {
            throw new Error("You can't call appendChild on a view being destroyed");
        },
        rerender() {
            throw new Error("You can't call rerender on a view being destroyed");
        }
    });
    /*
      Describe how the specified actions should behave in the various
      states that a view can exist in. Possible states:
  
      * preRender: when a view is first instantiated, and after its
        element was destroyed, it is in the preRender state
      * hasElement: the DOM representation of the view is created,
        and is ready to be inserted
      * inDOM: once a view has been inserted into the DOM it is in
        the inDOM state. A view spends the vast majority of its
        existence in this state.
      * destroyed: once a view has been destroyed (using the destroy
        method), it is in this state. No further actions can be invoked
        on a destroyed view.
    */
    var states = Object.freeze({
        preRender: PRE_RENDER,
        inDOM: IN_DOM,
        hasElement: HAS_ELEMENT,
        destroying: DESTROYING
    });
    var _default = _exports.default = states;
});