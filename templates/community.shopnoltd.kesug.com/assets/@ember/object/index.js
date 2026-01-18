define("@ember/object/index", ["exports", "@ember/debug", "@ember/-internals/environment", "@ember/-internals/metal", "@ember/-internals/container", "@ember/-internals/utils", "@ember/object/core", "@ember/object/observable"], function(_exports, _debug, _environment, _metal, _container, _utils, _core, _observable) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.action = action;
    Object.defineProperty(_exports, "computed", {
        enumerable: true,
        get: function() {
            return _metal.computed;
        }
    });
    _exports.default = void 0;
    Object.defineProperty(_exports, "defineProperty", {
        enumerable: true,
        get: function() {
            return _metal.defineProperty;
        }
    });
    Object.defineProperty(_exports, "get", {
        enumerable: true,
        get: function() {
            return _metal.get;
        }
    });
    Object.defineProperty(_exports, "getProperties", {
        enumerable: true,
        get: function() {
            return _metal.getProperties;
        }
    });
    Object.defineProperty(_exports, "notifyPropertyChange", {
        enumerable: true,
        get: function() {
            return _metal.notifyPropertyChange;
        }
    });
    _exports.observer = observer;
    Object.defineProperty(_exports, "set", {
        enumerable: true,
        get: function() {
            return _metal.set;
        }
    });
    Object.defineProperty(_exports, "setProperties", {
        enumerable: true,
        get: function() {
            return _metal.setProperties;
        }
    });
    Object.defineProperty(_exports, "trySet", {
        enumerable: true,
        get: function() {
            return _metal.trySet;
        }
    });
    class EmberObject extends _core.default.extend(_observable.default) {
        get _debugContainerKey() {
            var factory = (0, _container.getFactoryFor)(this);
            return factory !== undefined && factory.fullName;
        }
    }
    var _default = _exports.default = EmberObject;
    /**
      Decorator that turns the target function into an Action which can be accessed
      directly by reference.
  
      ```js
      import Component from '@ember/component';
      import { action, set } from '@ember/object';
  
      export default class Tooltip extends Component {
        @action
        toggleShowing() {
          set(this, 'isShowing', !this.isShowing);
        }
      }
      ```
      ```hbs
      <!-- template.hbs -->
      <button {{action this.toggleShowing}}>Show tooltip</button>
  
      {{#if isShowing}}
        <div class="tooltip">
          I'm a tooltip!
        </div>
      {{/if}}
      ```
  
      Decorated actions also interop with the string style template actions:
  
      ```hbs
      <!-- template.hbs -->
      <button {{action "toggleShowing"}}>Show tooltip</button>
  
      {{#if isShowing}}
        <div class="tooltip">
          I'm a tooltip!
        </div>
      {{/if}}
      ```
  
      It also binds the function directly to the instance, so it can be used in any
      context and will correctly refer to the class it came from:
  
      ```hbs
      <!-- template.hbs -->
      <button
        {{did-insert this.toggleShowing}}
        {{on "click" this.toggleShowing}}
      >
        Show tooltip
      </button>
  
      {{#if isShowing}}
        <div class="tooltip">
          I'm a tooltip!
        </div>
      {{/if}}
      ```
  
      This can also be used in JavaScript code directly:
  
      ```js
      import Component from '@ember/component';
      import { action, set } from '@ember/object';
  
      export default class Tooltip extends Component {
        constructor() {
          super(...arguments);
  
          // this.toggleShowing is still bound correctly when added to
          // the event listener
          document.addEventListener('click', this.toggleShowing);
        }
  
        @action
        toggleShowing() {
          set(this, 'isShowing', !this.isShowing);
        }
      }
      ```
  
      This is considered best practice, since it means that methods will be bound
      correctly no matter where they are used. By contrast, the `{{action}}` helper
      and modifier can also be used to bind context, but it will be required for
      every usage of the method:
  
      ```hbs
      <!-- template.hbs -->
      <button
        {{did-insert (action this.toggleShowing)}}
        {{on "click" (action this.toggleShowing)}}
      >
        Show tooltip
      </button>
  
      {{#if isShowing}}
        <div class="tooltip">
          I'm a tooltip!
        </div>
      {{/if}}
      ```
  
      They also do not have equivalents in JavaScript directly, so they cannot be
      used for other situations where binding would be useful.
  
      @public
      @method action
      @for @ember/object
      @static
      @param {Function|undefined} callback The function to turn into an action,
                                           when used in classic classes
      @return {PropertyDecorator} property decorator instance
    */
    var BINDINGS_MAP = new WeakMap();

    function hasProto(obj) {
        return obj != null && obj.constructor !== undefined && typeof obj.constructor.proto === 'function';
    }

    function setupAction(target, key, actionFn) {
        if (hasProto(target)) {
            target.constructor.proto();
        }
        if (!Object.prototype.hasOwnProperty.call(target, 'actions')) {
            var parentActions = target.actions;
            // we need to assign because of the way mixins copy actions down when inheriting
            target.actions = parentActions ? Object.assign({}, parentActions) : {};
        }
        (false && !(target.actions != null) && (0, _debug.assert)("[BUG] Somehow the target doesn't have actions!", target.actions != null));
        target.actions[key] = actionFn;
        return {
            get() {
                var bindings = BINDINGS_MAP.get(this);
                if (bindings === undefined) {
                    bindings = new Map();
                    BINDINGS_MAP.set(this, bindings);
                }
                var fn = bindings.get(actionFn);
                if (fn === undefined) {
                    fn = actionFn.bind(this);
                    bindings.set(actionFn, fn);
                }
                return fn;
            }
        };
    }

    function action() {
        var actionFn;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        if (!(0, _metal.isElementDescriptor)(args)) {
            actionFn = args[0];
            var decorator = function(target, key, _desc, _meta, isClassicDecorator) {
                (false && !(isClassicDecorator) && (0, _debug.assert)('The @action decorator may only be passed a method when used in classic classes. You should decorate methods directly in native classes', isClassicDecorator));
                (false && !(typeof actionFn === 'function') && (0, _debug.assert)('The action() decorator must be passed a method when used in classic classes', typeof actionFn === 'function'));
                return setupAction(target, key, actionFn);
            };
            (0, _metal.setClassicDecorator)(decorator);
            return decorator;
        }
        var [target, key, desc] = args;
        actionFn = desc ? .value;
        (false && !(typeof actionFn === 'function') && (0, _debug.assert)('The @action decorator must be applied to methods when used in native classes', typeof actionFn === 'function')); // SAFETY: TS types are weird with decorators. This should work.
        return setupAction(target, key, actionFn);
    }
    // SAFETY: TS types are weird with decorators. This should work.
    (0, _metal.setClassicDecorator)(action);
    /**
      Specify a method that observes property changes.
  
      ```javascript
      import EmberObject from '@ember/object';
      import { observer } from '@ember/object';
  
      export default EmberObject.extend({
        valueObserver: observer('value', function() {
          // Executes whenever the "value" property changes
        })
      });
      ```
  
      Also available as `Function.prototype.observes` if prototype extensions are
      enabled.
  
      @method observer
      @for @ember/object
      @param {String} propertyNames*
      @param {Function} func
      @return func
      @public
      @static
    */
    function observer() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }
        var funcOrDef = args.pop();
        (false && !(typeof funcOrDef === 'function' || typeof funcOrDef === 'object' && funcOrDef !== null) && (0, _debug.assert)('observer must be provided a function or an observer definition', typeof funcOrDef === 'function' || typeof funcOrDef === 'object' && funcOrDef !== null));
        var func;
        var dependentKeys;
        var sync;
        if (typeof funcOrDef === 'function') {
            func = funcOrDef;
            dependentKeys = args;
            sync = !_environment.ENV._DEFAULT_ASYNC_OBSERVERS;
        } else {
            func = funcOrDef.fn;
            dependentKeys = funcOrDef.dependentKeys;
            sync = funcOrDef.sync;
        }
        (false && !(typeof func === 'function') && (0, _debug.assert)('observer called without a function', typeof func === 'function'));
        (false && !(Array.isArray(dependentKeys) && dependentKeys.length > 0 && dependentKeys.every(p => typeof p === 'string' && Boolean(p.length))) && (0, _debug.assert)('observer called without valid path', Array.isArray(dependentKeys) && dependentKeys.length > 0 && dependentKeys.every(p => typeof p === 'string' && Boolean(p.length))));
        (false && !(typeof sync === 'boolean') && (0, _debug.assert)('observer called without sync', typeof sync === 'boolean'));
        var paths = [];
        for (var dependentKey of dependentKeys) {
            (0, _metal.expandProperties)(dependentKey, path => paths.push(path));
        }
        (0, _utils.setObservers)(func, {
            paths,
            sync
        });
        return func;
    }
});