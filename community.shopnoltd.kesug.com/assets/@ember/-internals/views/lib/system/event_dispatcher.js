define("@ember/-internals/views/lib/system/event_dispatcher", ["exports", "@ember/-internals/owner", "@ember/debug", "@ember/-internals/metal", "@ember/object", "@ember/-internals/views", "@ember/-internals/views/lib/system/action_manager"], function(_exports, _owner, _debug, _metal, _object, _views, _action_manager) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    /**
    @module ember
    */
    var ROOT_ELEMENT_CLASS = 'ember-application';
    var ROOT_ELEMENT_SELECTOR = `.${ROOT_ELEMENT_CLASS}`;
    /**
      `Ember.EventDispatcher` handles delegating browser events to their
      corresponding `Ember.Views.` For example, when you click on a view,
      `Ember.EventDispatcher` ensures that that view's `mouseDown` method gets
      called.
  
      @class EventDispatcher
      @namespace Ember
      @private
      @extends EmberObject
    */
    class EventDispatcher extends _object.default {
        constructor() {
            super(...arguments);
            /**
              The set of events names (and associated handler function names) to be setup
              and dispatched by the `EventDispatcher`. Modifications to this list can be done
              at setup time, generally via the `Application.customEvents` hash.
                     To add new events to be listened to:
                     ```javascript
              import Application from '@ember/application';
                     let App = Application.create({
                customEvents: {
                  paste: 'paste'
                }
              });
              ```
                     To prevent default events from being listened to:
                     ```javascript
              import Application from '@ember/application';
                     let App = Application.create({
                customEvents: {
                  mouseenter: null,
                  mouseleave: null
                }
              });
              ```
              @property events
              @type Object
              @private
            */
            this.events = {
                touchstart: 'touchStart',
                touchmove: 'touchMove',
                touchend: 'touchEnd',
                touchcancel: 'touchCancel',
                keydown: 'keyDown',
                keyup: 'keyUp',
                keypress: 'keyPress',
                mousedown: 'mouseDown',
                mouseup: 'mouseUp',
                contextmenu: 'contextMenu',
                click: 'click',
                dblclick: 'doubleClick',
                focusin: 'focusIn',
                focusout: 'focusOut',
                submit: 'submit',
                input: 'input',
                change: 'change',
                dragstart: 'dragStart',
                drag: 'drag',
                dragenter: 'dragEnter',
                dragleave: 'dragLeave',
                dragover: 'dragOver',
                drop: 'drop',
                dragend: 'dragEnd'
            };
            /**
              The root DOM element to which event listeners should be attached. Event
              listeners will be attached to the document unless this is overridden.
                     Can be specified as a DOMElement or a selector string.
                     The default body is a string since this may be evaluated before document.body
              exists in the DOM.
                     @private
              @property rootElement
              @type DOMElement
              @default 'body'
            */
            this.rootElement = 'body';
            this._eventHandlers = Object.create(null);
            this._didSetup = false;
            this.finalEventNameMapping = null;
            this._sanitizedRootElement = null;
            this.lazyEvents = new Map();
            this._reverseEventNameMapping = null;
        }
        /**
          Sets up event listeners for standard browser events.
             This will be called after the browser sends a `DOMContentReady` event. By
          default, it will set up all of the listeners on the document body. If you
          would like to register the listeners on a different element, set the event
          dispatcher's `root` property.
             @private
          @method setup
          @param addedEvents {Object}
        */
        setup(addedEvents, _rootElement) {
            (false && !((() => {
                var owner = (0, _owner.getOwner)(this);
                (false && !(owner) && (0, _debug.assert)('[BUG] Missing owner', owner)); // SAFETY: This is not guaranteed to be safe, but this is what we expect to be returned.
                var environment = owner.lookup('-environment:main');
                return environment.isInteractive;
            })()) && (0, _debug.assert)('EventDispatcher should never be setup in fastboot mode. Please report this as an Ember bug.', (() => {
                var owner = (0, _owner.getOwner)(this);
                (false && !(owner) && (0, _debug.assert)('[BUG] Missing owner', owner));
                var environment = owner.lookup('-environment:main');
                return environment.isInteractive;
            })()));
            var events = this.finalEventNameMapping = {
                ...(0, _metal.get)(this, 'events'),
                ...addedEvents
            };
            this._reverseEventNameMapping = Object.keys(events).reduce((result, key) => {
                var eventName = events[key];
                return eventName ? {
                    ...result,
                    [eventName]: key
                } : result;
            }, {});
            var lazyEvents = this.lazyEvents;
            if (_rootElement !== undefined && _rootElement !== null) {
                (0, _metal.set)(this, 'rootElement', _rootElement);
            }
            var specifiedRootElement = (0, _metal.get)(this, 'rootElement');
            var rootElement = typeof specifiedRootElement !== 'string' ? specifiedRootElement : document.querySelector(specifiedRootElement);
            (false && !(rootElement) && (0, _debug.assert)(`Could not find rootElement (${specifiedRootElement})`, rootElement));
            (false && !(!rootElement.classList.contains(ROOT_ELEMENT_CLASS)) && (0, _debug.assert)(`You cannot use the same root element (${specifiedRootElement}) multiple times in an Ember.Application`, !rootElement.classList.contains(ROOT_ELEMENT_CLASS)));
            (false && !((() => {
                var target = rootElement.parentNode;
                while (target instanceof Element) {
                    if (target.classList.contains(ROOT_ELEMENT_CLASS)) {
                        return false;
                    }
                    target = target.parentNode;
                }
                return true;
            })()) && (0, _debug.assert)('You cannot make a new Ember.Application using a root element that is a descendent of an existing Ember.Application', (() => {
                var target = rootElement.parentNode;
                while (target instanceof Element) {
                    if (target.classList.contains(ROOT_ELEMENT_CLASS)) {
                        return false;
                    }
                    target = target.parentNode;
                }
                return true;
            })()));
            (false && !(!rootElement.querySelector(ROOT_ELEMENT_SELECTOR)) && (0, _debug.assert)('You cannot make a new Ember.Application using a root element that is an ancestor of an existing Ember.Application', !rootElement.querySelector(ROOT_ELEMENT_SELECTOR)));
            rootElement.classList.add(ROOT_ELEMENT_CLASS);
            (false && !(rootElement.classList.contains(ROOT_ELEMENT_CLASS)) && (0, _debug.assert)(`Unable to add '${ROOT_ELEMENT_CLASS}' class to root element (${(0, _metal.get)(this, 'rootElement') || rootElement.tagName}). Make sure you set rootElement to the body or an element in the body.`, rootElement.classList.contains(ROOT_ELEMENT_CLASS))); // save off the final sanitized root element (for usage in setupHandler)
            this._sanitizedRootElement = rootElement;
            // setup event listeners for the non-lazily setup events
            for (var event in events) {
                if (Object.prototype.hasOwnProperty.call(events, event)) {
                    lazyEvents.set(event, events[event] ? ? null);
                }
            }
            this._didSetup = true;
        }
        /**
          Setup event listeners for the given browser event name
             @private
          @method setupHandlerForBrowserEvent
          @param event the name of the event in the browser
        */
        setupHandlerForBrowserEvent(event) {
            (false && !(this.finalEventNameMapping) && (0, _debug.assert)('[BUG] Expected finalEventNameMapping to be set', this.finalEventNameMapping));
            (false && !(this._sanitizedRootElement) && (0, _debug.assert)('[BUG] Expected _santizedRootElement to be set', this._sanitizedRootElement));
            this.setupHandler(this._sanitizedRootElement, event, this.finalEventNameMapping[event] ? ? null);
        }
        /**
          Setup event listeners for the given Ember event name (camel case)
             @private
          @method setupHandlerForEmberEvent
          @param eventName
        */
        setupHandlerForEmberEvent(eventName) {
            (false && !(this._sanitizedRootElement) && (0, _debug.assert)('[BUG] Expected _sanitizedRootElement to be set', this._sanitizedRootElement));
            var event = this._reverseEventNameMapping ? .[eventName];
            if (event) {
                this.setupHandler(this._sanitizedRootElement, event, eventName);
            }
        }
        /**
          Registers an event listener on the rootElement. If the given event is
          triggered, the provided event handler will be triggered on the target view.
             If the target view does not implement the event handler, or if the handler
          returns `false`, the parent view will be called. The event will continue to
          bubble to each successive parent view until it reaches the top.
             @private
          @method setupHandler
          @param {Element} rootElement
          @param {String} event the name of the event in the browser
          @param {String} eventName the name of the method to call on the view
        */
        setupHandler(rootElement, event, eventName) {
            if (eventName === null || !this.lazyEvents.has(event)) {
                return; // nothing to do
            }
            var viewHandler = (target, event) => {
                var view = (0, _views.getElementView)(target);
                var result = true;
                if (view) {
                    // SAFETY: As currently written, this is not safe. Though it seems to always be true.
                    result = view.handleEvent(eventName, event);
                }
                return result;
            };
            var actionHandler = (target, event) => {
                var actionId = target.getAttribute('data-ember-action');
                var actions;
                // In Glimmer2 this attribute is set to an empty string and an additional
                // attribute it set for each action on a given element. In this case, the
                // attributes need to be read so that a proper set of action handlers can
                // be coalesced.
                if (actionId === '') {
                    actions = [];
                    for (var attr of target.attributes) {
                        var attrName = attr.name;
                        if (attrName.indexOf('data-ember-action-') === 0) {
                            var action = _action_manager.default.registeredActions[attr.value];
                            (false && !(action) && (0, _debug.assert)('[BUG] Missing action', action));
                            actions.push(action);
                        }
                    }
                } else if (actionId) {
                    // FIXME: This branch is never called in tests. Improve tests or remove
                    var actionState = _action_manager.default.registeredActions[actionId];
                    if (actionState) {
                        actions = [actionState];
                    }
                }
                // We have to check for actions here since in some cases, jQuery will trigger
                // an event on `removeChild` (i.e. focusout) after we've already torn down the
                // action handlers for the view.
                if (!actions) {
                    // FIXME: This branch is never called in tests. Improve tests or remove
                    return;
                }
                var result = true;
                for (var index = 0; index < actions.length; index++) {
                    var _action = actions[index];
                    if (_action && _action.eventName === eventName) {
                        // return false if any of the action handlers returns false
                        result = _action.handler(event) && result;
                    }
                }
                return result;
            };
            var handleEvent = this._eventHandlers[event] = event => {
                var target = event.target;
                (false && !(target instanceof Element) && (0, _debug.assert)(`[BUG] Received event without an Element target: ${event.type}, ${target}`, target instanceof Element));
                do {
                    if ((0, _views.getElementView)(target)) {
                        if (viewHandler(target, event) === false) {
                            event.preventDefault();
                            event.stopPropagation();
                            break;
                        } else if (event.cancelBubble === true) {
                            break;
                        }
                    } else if (typeof target.hasAttribute === 'function' && target.hasAttribute('data-ember-action')) {
                        if (actionHandler(target, event) === false) {
                            break;
                        }
                    }
                    target = target.parentNode;
                } while (target instanceof Element);
            };
            rootElement.addEventListener(event, handleEvent);
            this.lazyEvents.delete(event);
        }
        destroy() {
            if (this._didSetup === false) {
                return;
            }
            var rootElement = this._sanitizedRootElement;
            if (!rootElement) {
                return;
            }
            for (var event in this._eventHandlers) {
                rootElement.removeEventListener(event, this._eventHandlers[event]);
            }
            rootElement.classList.remove(ROOT_ELEMENT_CLASS);
            return this._super(...arguments);
        }
        toString() {
            return '(EventDispatcher)';
        }
    }
    _exports.default = EventDispatcher;
});