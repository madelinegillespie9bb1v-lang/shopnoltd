define("@ember/-internals/glimmer/index", ["exports", "@glimmer/opcode-compiler", "@ember/-internals/browser-environment", "@ember/debug", "@ember/object", "@glimmer/reference", "@glimmer/validator", "@ember/-internals/metal", "@ember/-internals/owner", "@ember/-internals/utils", "@glimmer/manager", "@ember/-internals/views", "@ember/engine", "@ember/engine/instance", "@ember/instrumentation", "@ember/service", "@ember/-internals/runtime", "@glimmer/runtime", "@glimmer/util", "@ember/-internals/string", "@glimmer/destroyable", "@ember/runloop", "@ember/object/-internals", "@ember/-internals/container", "@ember/-internals/environment", "@glimmer/program", "rsvp", "@glimmer/node", "@glimmer/global-context", "@ember/array/-internals", "@ember/-internals/glimmer", "@ember/array", "@ember/routing/-internals"], function(_exports, _opcodeCompiler, _browserEnvironment, _debug, _object, _reference, _validator, _metal, _owner2, _utils, _manager2, _views, _engine, _instance, _instrumentation, _service, _runtime, _runtime2, _util, _string, _destroyable, _runloop, _internals, _container, _environment2, _program, _rsvp, _node, _globalContext, _internals2, _glimmer, _array, _internals3) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.Component = void 0;
    Object.defineProperty(_exports, "DOMChanges", {
        enumerable: true,
        get: function() {
            return _runtime2.DOMChanges;
        }
    });
    Object.defineProperty(_exports, "DOMTreeConstruction", {
        enumerable: true,
        get: function() {
            return _runtime2.DOMTreeConstruction;
        }
    });
    _exports.LinkTo = _exports.Input = _exports.Helper = void 0;
    Object.defineProperty(_exports, "NodeDOMTreeConstruction", {
        enumerable: true,
        get: function() {
            return _node.NodeDOMTreeConstruction;
        }
    });
    _exports.Textarea = _exports.SafeString = _exports.RootTemplate = _exports.Renderer = _exports.OutletView = void 0;
    _exports._resetRenderers = _resetRenderers;
    _exports.componentCapabilities = void 0;
    _exports.escapeExpression = escapeExpression;
    _exports.getTemplate = getTemplate;
    _exports.getTemplates = getTemplates;
    _exports.hasTemplate = hasTemplate;
    _exports.helper = helper;
    _exports.htmlSafe = htmlSafe;
    _exports.isHTMLSafe = isHTMLSafe;
    Object.defineProperty(_exports, "isSerializationFirstNode", {
        enumerable: true,
        get: function() {
            return _runtime2.isSerializationFirstNode;
        }
    });
    _exports.modifierCapabilities = void 0;
    _exports.renderSettled = renderSettled;
    _exports.setComponentManager = setComponentManager;
    _exports.setTemplate = setTemplate;
    _exports.setTemplates = setTemplates;
    _exports.setupApplicationRegistry = setupApplicationRegistry;
    _exports.setupEngineRegistry = setupEngineRegistry;
    Object.defineProperty(_exports, "template", {
        enumerable: true,
        get: function() {
            return _opcodeCompiler.templateFactory;
        }
    });
    Object.defineProperty(_exports, "templateCacheCounters", {
        enumerable: true,
        get: function() {
            return _opcodeCompiler.templateCacheCounters;
        }
    });
    _exports.uniqueId = uniqueId$1;
    var RootTemplate = _exports.RootTemplate = (0, _opcodeCompiler.templateFactory)({
        "id": "9BtKrod8",
        "block": "[[[46,[30,0],null,null,null]],[],false,[\"component\"]]",
        "moduleName": "packages/@ember/-internals/glimmer/lib/templates/root.hbs",
        "isStrictMode": false
    });
    var InputTemplate = (0, _opcodeCompiler.templateFactory)({
        "id": "OGSIkgXP",
        "block": "[[[11,\"input\"],[16,1,[30,0,[\"id\"]]],[16,0,[30,0,[\"class\"]]],[17,1],[16,4,[30,0,[\"type\"]]],[16,\"checked\",[30,0,[\"checked\"]]],[16,2,[30,0,[\"value\"]]],[4,[38,0],[\"change\",[30,0,[\"change\"]]],null],[4,[38,0],[\"input\",[30,0,[\"input\"]]],null],[4,[38,0],[\"keyup\",[30,0,[\"keyUp\"]]],null],[4,[38,0],[\"paste\",[30,0,[\"valueDidChange\"]]],null],[4,[38,0],[\"cut\",[30,0,[\"valueDidChange\"]]],null],[12],[13]],[\"&attrs\"],false,[\"on\"]]",
        "moduleName": "packages/@ember/-internals/glimmer/lib/templates/input.hbs",
        "isStrictMode": false
    });

    function NOOP() {}
    class InternalComponent {
        // Override this
        static toString() {
            return 'internal component';
        }
        constructor(owner, args, caller) {
            this.owner = owner;
            this.args = args;
            this.caller = caller;
            (0, _owner2.setOwner)(this, owner);
        }
        /**
         * The default HTML id attribute. We don't really _need_ one, this is just
         * added for compatibility as it's hard to tell if people rely on it being
         * present, and it doens't really hurt.
         *
         * However, don't rely on this internally, like passing it to `getElementId`.
         * This can be (and often is) overriden by passing an `id` attribute on the
         * invocation, which shadows this default id via `...attributes`.
         */
        get id() {
            return (0, _utils.guidFor)(this);
        }
        /**
         * The default HTML class attribute. Similar to the above, we don't _need_
         * them, they are just added for compatibility as it's similarly hard to tell
         * if people rely on it in their CSS etc, and it doens't really hurt.
         */
        get class() {
            return 'ember-view';
        }
        validateArguments() {
            for (var name of Object.keys(this.args.named)) {
                if (!this.isSupportedArgument(name)) {
                    this.onUnsupportedArgument(name);
                }
            }
        }
        named(name) {
            var ref = this.args.named[name];
            return ref ? (0, _reference.valueForRef)(ref) : undefined;
        }
        positional(index) {
            var ref = this.args.positional[index];
            return ref ? (0, _reference.valueForRef)(ref) : undefined;
        }
        listenerFor(name) {
            var listener = this.named(name);
            if (listener) {
                (false && !(typeof listener === 'function') && (0, _debug.assert)(`The \`@${name}\` argument to the <${this.constructor}> component must be a function`, typeof listener === 'function'));
                return listener;
            } else {
                return NOOP;
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        isSupportedArgument(_name) {
            return false;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onUnsupportedArgument(_name) {}
        toString() {
            return `<${this.constructor}:${(0, _utils.guidFor)(this)}>`;
        }
    }
    var OPAQUE_CONSTRUCTOR_MAP = new WeakMap();

    function opaquify(constructor, template) {
        var _opaque = {
            // Factory interface
            create() {
                throw (0, _debug.assert)('Use constructor instead of create');
            },
            toString() {
                return constructor.toString();
            }
        };
        var opaque = _opaque;
        OPAQUE_CONSTRUCTOR_MAP.set(opaque, constructor);
        (0, _manager2.setInternalComponentManager)(INTERNAL_COMPONENT_MANAGER, opaque);
        (0, _manager2.setComponentTemplate)(template, opaque);
        return opaque;
    }

    function deopaquify(opaque) {
        var constructor = OPAQUE_CONSTRUCTOR_MAP.get(opaque);
        (false && !(constructor) && (0, _debug.assert)(`[BUG] Invalid internal component constructor: ${opaque}`, constructor));
        return constructor;
    }
    var CAPABILITIES = {
        dynamicLayout: false,
        dynamicTag: false,
        prepareArgs: false,
        createArgs: true,
        attributeHook: false,
        elementHook: false,
        createCaller: true,
        dynamicScope: false,
        updateHook: false,
        createInstance: true,
        wrapped: false,
        willDestroy: false,
        hasSubOwner: false
    };
    class InternalManager {
        getCapabilities() {
            return CAPABILITIES;
        }
        create(owner, definition, args, _env, _dynamicScope, caller) {
            (false && !((0, _reference.isConstRef)(caller)) && (0, _debug.assert)('caller must be const', (0, _reference.isConstRef)(caller)));
            var ComponentClass = deopaquify(definition);
            var instance = new ComponentClass(owner, args.capture(), (0, _reference.valueForRef)(caller));
            (0, _validator.untrack)(instance['validateArguments'].bind(instance));
            return instance;
        }
        didCreate() {}
        didUpdate() {}
        didRenderLayout() {}
        didUpdateLayout() {}
        getDebugName(definition) {
            return definition.toString();
        }
        getSelf(instance) {
            return (0, _reference.createConstRef)(instance, 'this');
        }
        getDestroyable(instance) {
            return instance;
        }
    }
    var INTERNAL_COMPONENT_MANAGER = new InternalManager();
    var __decorate = undefined && undefined.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var UNINITIALIZED = Object.freeze({});

    function elementForEvent(event) {
        (false && !(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) && (0, _debug.assert)('[BUG] event target must be an <input> or <textarea> element', event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement));
        return event.target;
    }

    function valueForEvent(event) {
        return elementForEvent(event).value;
    }

    function devirtualize(callback) {
        return event => callback(valueForEvent(event), event);
    }

    function valueFrom(reference) {
        if (reference === undefined) {
            return new LocalValue(undefined);
        } else if ((0, _reference.isConstRef)(reference)) {
            return new LocalValue((0, _reference.valueForRef)(reference));
        } else if ((0, _reference.isUpdatableRef)(reference)) {
            return new UpstreamValue(reference);
        } else {
            return new ForkedValue(reference);
        }
    }
    class LocalValue {
        constructor(value) {
            this.value = value;
        }
        get() {
            return this.value;
        }
        set(value) {
            this.value = value;
        }
    }
    __decorate([_metal.tracked], LocalValue.prototype, "value", void 0);
    class UpstreamValue {
        constructor(reference) {
            this.reference = reference;
        }
        get() {
            return (0, _reference.valueForRef)(this.reference);
        }
        set(value) {
            (0, _reference.updateRef)(this.reference, value);
        }
    }
    class ForkedValue {
        constructor(reference) {
            this.lastUpstreamValue = UNINITIALIZED;
            this.upstream = new UpstreamValue(reference);
        }
        get() {
            var upstreamValue = this.upstream.get();
            if (upstreamValue !== this.lastUpstreamValue) {
                this.lastUpstreamValue = upstreamValue;
                this.local = new LocalValue(upstreamValue);
            }
            (false && !(this.local) && (0, _debug.assert)('[BUG] this.local must have been initialized at this point', this.local));
            return this.local.get();
        }
        set(value) {
            (false && !(this.local) && (0, _debug.assert)('[BUG] this.local must have been initialized at this point', this.local));
            this.local.set(value);
        }
    }
    class AbstractInput extends InternalComponent {
        constructor() {
            super(...arguments);
            this._value = valueFrom(this.args.named['value']);
        }
        validateArguments() {
            (false && !(this.args.positional.length === 0) && (0, _debug.assert)(`The ${this.constructor} component does not take any positional arguments`, this.args.positional.length === 0));
            super.validateArguments();
        }
        get value() {
            return this._value.get();
        }
        set value(value) {
            this._value.set(value);
        }
        valueDidChange(event) {
            this.value = valueForEvent(event);
        }
        /**
         * The `change` and `input` actions need to be overridden in the `Input`
         * subclass. Unfortunately, some ember-source builds currently uses babel
         * loose mode to transpile its classes. Having the `@action` decorator on the
         * super class creates a getter on the prototype, and when the subclass
         * overrides the method, the loose mode transpilation would emit something
         * like `Subclass.prototype['change'] = function change() { ... }`, which
         * fails because `prototype['change']` is getter-only/readonly. The correct
         * solution is to use `Object.defineProperty(prototype, 'change', ...)` but
         * that requires disabling loose mode. For now, the workaround is to add the
         * decorator only on the subclass. This is more of a configuration issue on
         * our own builds and doesn't really affect apps.
         */
        /* @action */
        change(event) {
            this.valueDidChange(event);
        }
        /* @action */
        input(event) {
            this.valueDidChange(event);
        }
        keyUp(event) {
            switch (event.key) {
                case 'Enter':
                    this.listenerFor('enter')(event);
                    this.listenerFor('insert-newline')(event);
                    break;
                case 'Escape':
                    this.listenerFor('escape-press')(event);
                    break;
            }
        }
        listenerFor(name) {
            var listener = super.listenerFor(name);
            if (this.isVirtualEventListener(name, listener)) {
                return devirtualize(listener);
            } else {
                return listener;
            }
        }
        isVirtualEventListener(name, _listener) {
            var virtualEvents = ['enter', 'insert-newline', 'escape-press'];
            return virtualEvents.indexOf(name) !== -1;
        }
    }
    __decorate([_object.action], AbstractInput.prototype, "valueDidChange", null);
    __decorate([_object.action], AbstractInput.prototype, "keyUp", null);
    var __decorate$1 = undefined && undefined.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var isValidInputType;
    if (_browserEnvironment.hasDOM) {
        var INPUT_TYPES = Object.create(null);
        var INPUT_ELEMENT = document.createElement('input');
        INPUT_TYPES[''] = false;
        INPUT_TYPES['text'] = true;
        INPUT_TYPES['checkbox'] = true;
        isValidInputType = type => {
            var isValid = INPUT_TYPES[type];
            if (isValid === undefined) {
                try {
                    INPUT_ELEMENT.type = type;
                    isValid = INPUT_ELEMENT.type === type;
                } catch (e) {
                    isValid = false;
                } finally {
                    INPUT_ELEMENT.type = 'text';
                }
                INPUT_TYPES[type] = isValid;
            }
            return isValid;
        };
    } else {
        isValidInputType = type => type !== '';
    }
    /**
      See [Ember.Templates.components.Input](/ember/release/classes/Ember.Templates.components/methods/Input?anchor=Input).
  
      @method input
      @for Ember.Templates.helpers
      @param {Hash} options
      @public
      */
    /**
      An opaque interface which can be imported and used in strict-mode
      templates to call <Input>.
  
      See [Ember.Templates.components.Input](/ember/release/classes/Ember.Templates.components/methods/Input?anchor=Input).
  
      @for @ember/component
      @method Input
      @see {Ember.Templates.components.Input}
      @public
    **/
    /**
      The `Input` component lets you create an HTML `<input>` element.
  
      ```handlebars
      <Input @value="987" />
      ```
  
      creates an `<input>` element with `type="text"` and value set to 987.
  
      ### Text field
  
      If no `type` argument is specified, a default of type 'text' is used.
  
      ```handlebars
      Search:
      <Input @value={{this.searchWord}} />
      ```
  
      In this example, the initial value in the `<input>` will be set to the value of
      `this.searchWord`. If the user changes the text, the value of `this.searchWord` will also be
      updated.
  
      ### Actions
  
      The `Input` component takes a number of arguments with callbacks that are invoked in response to
      user events.
  
      * `enter`
      * `insert-newline`
      * `escape-press`
      * `focus-in`
      * `focus-out`
      * `key-down`
      * `key-press`
      * `key-up`
  
      These callbacks are passed to `Input` like this:
  
      ```handlebars
      <Input @value={{this.searchWord}} @enter={{this.query}} />
      ```
  
      Starting with Ember Octane, we recommend using the `{{on}}` modifier to call actions
      on specific events, such as the input event.
  
      ```handlebars
      <label for="input-name">Name:</label>
      <Input
        @id="input-name"
        @value={{this.name}}
        {{on "input" this.validateName}}
      />
      ```
  
      The event name (e.g. `focusout`, `input`, `keydown`) always follows the casing
      that the HTML standard uses.
  
      ### `<input>` HTML Attributes to Avoid
  
      In most cases, if you want to pass an attribute to the underlying HTML `<input>` element, you
      can pass the attribute directly, just like any other Ember component.
  
      ```handlebars
      <Input @type="text" size="10" />
      ```
  
      In this example, the `size` attribute will be applied to the underlying `<input>` element in the
      outputted HTML.
  
      However, there are a few attributes where you **must** use the `@` version.
  
      * `@type`: This argument is used to control which Ember component is used under the hood
      * `@value`: The `@value` argument installs a two-way binding onto the element. If you wanted a
        one-way binding, use `<input>` with the `value` property and the `input` event instead.
      * `@checked` (for checkboxes): like `@value`, the `@checked` argument installs a two-way binding
        onto the element. If you wanted a one-way binding, use `<input type="checkbox">` with
        `checked` and the `input` event instead.
  
      ### Checkbox
  
      To create an `<input type="checkbox">`:
  
      ```handlebars
      Emberize Everything:
      <Input @type="checkbox" @checked={{this.isEmberized}} name="isEmberized" />
      ```
  
      This will bind the checked state of this checkbox to the value of `isEmberized` -- if either one
      changes, it will be reflected in the other.
  
      @method Input
      @for Ember.Templates.components
      @param {Hash} options
      @public
    */
    class _Input extends AbstractInput {
        constructor() {
            super(...arguments);
            this._checked = valueFrom(this.args.named['checked']);
        }
        static toString() {
            return 'Input';
        }
        /**
         * The HTML class attribute.
         */
        get class() {
            if (this.isCheckbox) {
                return 'ember-checkbox ember-view';
            } else {
                return 'ember-text-field ember-view';
            }
        }
        /**
         * The HTML type attribute.
         */
        get type() {
            var type = this.named('type');
            if (type === null || type === undefined) {
                return 'text';
            }
            (false && !(typeof type === 'string') && (0, _debug.assert)('The `@type` argument to the <Input> component must be a string', typeof type === 'string'));
            return isValidInputType(type) ? type : 'text';
        }
        get isCheckbox() {
            return this.named('type') === 'checkbox';
        }
        get checked() {
            if (this.isCheckbox) {
                (false && (0, _debug.warn)('`<Input @type="checkbox" />` reflects its checked state via the `@checked` argument. ' + 'You wrote `<Input @type="checkbox" @value={{...}} />` which is likely not what you intended. ' + 'Did you mean `<Input @type="checkbox" @checked={{...}} />`?', (0, _validator.untrack)(() => this.args.named['checked'] !== undefined || this.args.named['value'] === undefined || typeof(0, _reference.valueForRef)(this.args.named['value']) === 'string'), {
                    id: 'ember.built-in-components.input-checkbox-value'
                }));
                return this._checked.get();
            } else {
                return undefined;
            }
        }
        set checked(checked) {
            (false && (0, _debug.warn)('`<Input @type="checkbox" />` reflects its checked state via the `@checked` argument. ' + 'You wrote `<Input @type="checkbox" @value={{...}} />` which is likely not what you intended. ' + 'Did you mean `<Input @type="checkbox" @checked={{...}} />`?', (0, _validator.untrack)(() => this.args.named['checked'] !== undefined || this.args.named['value'] === undefined || typeof(0, _reference.valueForRef)(this.args.named['value']) === 'string'), {
                id: 'ember.built-in-components.input-checkbox-value'
            }));
            this._checked.set(checked);
        }
        change(event) {
            if (this.isCheckbox) {
                this.checkedDidChange(event);
            } else {
                super.change(event);
            }
        }
        input(event) {
            if (!this.isCheckbox) {
                super.input(event);
            }
        }
        checkedDidChange(event) {
            var element = event.target;
            (false && !(element instanceof HTMLInputElement) && (0, _debug.assert)('[BUG] element must be an <input>', element instanceof HTMLInputElement));
            this.checked = element.checked;
        }
        isSupportedArgument(name) {
            var supportedArguments = ['type', 'value', 'checked', 'enter', 'insert-newline', 'escape-press'];
            return supportedArguments.indexOf(name) !== -1 || super.isSupportedArgument(name);
        }
    }
    __decorate$1([_object.action], _Input.prototype, "change", null);
    __decorate$1([_object.action], _Input.prototype, "input", null);
    __decorate$1([_object.action], _Input.prototype, "checkedDidChange", null);
    var Input = _exports.Input = opaquify(_Input, InputTemplate);
    var LinkToTemplate = (0, _opcodeCompiler.templateFactory)({
        "id": "CVwkBtGh",
        "block": "[[[11,3],[16,1,[30,0,[\"id\"]]],[16,0,[30,0,[\"class\"]]],[16,\"role\",[30,0,[\"role\"]]],[16,\"title\",[30,0,[\"title\"]]],[16,\"rel\",[30,0,[\"rel\"]]],[16,\"tabindex\",[30,0,[\"tabindex\"]]],[16,\"target\",[30,0,[\"target\"]]],[17,1],[16,6,[30,0,[\"href\"]]],[4,[38,0],[\"click\",[30,0,[\"click\"]]],null],[12],[18,2,null],[13]],[\"&attrs\",\"&default\"],false,[\"on\",\"yield\"]]",
        "moduleName": "packages/@ember/-internals/glimmer/lib/templates/link-to.hbs",
        "isStrictMode": false
    });
    var __decorate$2 = undefined && undefined.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var EMPTY_ARRAY = [];
    var EMPTY_QUERY_PARAMS = {};
    (0, _debug.debugFreeze)(EMPTY_ARRAY);
    (0, _debug.debugFreeze)(EMPTY_QUERY_PARAMS);

    function isMissing(value) {
        return value === null || value === undefined;
    }

    function isPresent(value) {
        return !isMissing(value);
    }

    function isQueryParams(value) {
        return typeof value === 'object' && value !== null && value['isQueryParams'] === true;
    }
    /**
      The `LinkTo` component renders a link to the supplied `routeName` passing an optionally
      supplied model to the route as its `model` context of the route. The block for `LinkTo`
      becomes the contents of the rendered element:
  
      ```handlebars
      <LinkTo @route='photoGallery'>
        Great Hamster Photos
      </LinkTo>
      ```
  
      This will result in:
  
      ```html
      <a href="/hamster-photos">
        Great Hamster Photos
      </a>
      ```
  
      ### Disabling the `LinkTo` component
  
      The `LinkTo` component can be disabled by using the `disabled` argument. A disabled link
      doesn't result in a transition when activated, and adds the `disabled` class to the `<a>`
      element.
  
      (The class name to apply to the element can be overridden by using the `disabledClass`
      argument)
  
      ```handlebars
      <LinkTo @route='photoGallery' @disabled={{true}}>
        Great Hamster Photos
      </LinkTo>
      ```
  
      ### Handling `href`
  
      `<LinkTo>` will use your application's Router to fill the element's `href` property with a URL
      that matches the path to the supplied `routeName`.
  
      ### Handling current route
  
      The `LinkTo` component will apply a CSS class name of 'active' when the application's current
      route matches the supplied routeName. For example, if the application's current route is
      'photoGallery.recent', then the following invocation of `LinkTo`:
  
      ```handlebars
      <LinkTo @route='photoGallery.recent'>
        Great Hamster Photos
      </LinkTo>
      ```
  
      will result in
  
      ```html
      <a href="/hamster-photos/this-week" class="active">
        Great Hamster Photos
      </a>
      ```
  
      The CSS class used for active classes can be customized by passing an `activeClass` argument:
  
      ```handlebars
      <LinkTo @route='photoGallery.recent' @activeClass="current-url">
        Great Hamster Photos
      </LinkTo>
      ```
  
      ```html
      <a href="/hamster-photos/this-week" class="current-url">
        Great Hamster Photos
      </a>
      ```
  
      ### Keeping a link active for other routes
  
      If you need a link to be 'active' even when it doesn't match the current route, you can use the
      `current-when` argument.
  
      ```handlebars
      <LinkTo @route='photoGallery' @current-when='photos'>
        Photo Gallery
      </LinkTo>
      ```
  
      This may be helpful for keeping links active for:
  
      * non-nested routes that are logically related
      * some secondary menu approaches
      * 'top navigation' with 'sub navigation' scenarios
  
      A link will be active if `current-when` is `true` or the current
      route is the route this link would transition to.
  
      To match multiple routes 'space-separate' the routes:
  
      ```handlebars
      <LinkTo @route='gallery' @current-when='photos drawings paintings'>
        Art Gallery
      </LinkTo>
      ```
  
      ### Supplying a model
  
      An optional `model` argument can be used for routes whose
      paths contain dynamic segments. This argument will become
      the model context of the linked route:
  
      ```javascript
      Router.map(function() {
        this.route("photoGallery", {path: "hamster-photos/:photo_id"});
      });
      ```
  
      ```handlebars
      <LinkTo @route='photoGallery' @model={{this.aPhoto}}>
        {{aPhoto.title}}
      </LinkTo>
      ```
  
      ```html
      <a href="/hamster-photos/42">
        Tomster
      </a>
      ```
  
      ### Supplying multiple models
  
      For deep-linking to route paths that contain multiple
      dynamic segments, the `models` argument can be used.
  
      As the router transitions through the route path, each
      supplied model argument will become the context for the
      route with the dynamic segments:
  
      ```javascript
      Router.map(function() {
        this.route("photoGallery", { path: "hamster-photos/:photo_id" }, function() {
          this.route("comment", {path: "comments/:comment_id"});
        });
      });
      ```
  
      This argument will become the model context of the linked route:
  
      ```handlebars
      <LinkTo @route='photoGallery.comment' @models={{array this.aPhoto this.comment}}>
        {{comment.body}}
      </LinkTo>
      ```
  
      ```html
      <a href="/hamster-photos/42/comments/718">
        A+++ would snuggle again.
      </a>
      ```
  
      ### Supplying an explicit dynamic segment value
  
      If you don't have a model object available to pass to `LinkTo`,
      an optional string or integer argument can be passed for routes whose
      paths contain dynamic segments. This argument will become the value
      of the dynamic segment:
  
      ```javascript
      Router.map(function() {
        this.route("photoGallery", { path: "hamster-photos/:photo_id" });
      });
      ```
  
      ```handlebars
      <LinkTo @route='photoGallery' @model={{aPhotoId}}>
        {{this.aPhoto.title}}
      </LinkTo>
      ```
  
      ```html
      <a href="/hamster-photos/42">
        Tomster
      </a>
      ```
  
      When transitioning into the linked route, the `model` hook will
      be triggered with parameters including this passed identifier.
  
      ### Supplying query parameters
  
      If you need to add optional key-value pairs that appear to the right of the ? in a URL,
      you can use the `query` argument.
  
      ```handlebars
      <LinkTo @route='photoGallery' @query={{hash page=1 per_page=20}}>
        Great Hamster Photos
      </LinkTo>
      ```
  
      This will result in:
  
      ```html
      <a href="/hamster-photos?page=1&per_page=20">
        Great Hamster Photos
      </a>
      ```
  
      @for Ember.Templates.components
      @method LinkTo
      @public
    */
    /**
      @module @ember/routing
    */
    /**
      See [Ember.Templates.components.LinkTo](/ember/release/classes/Ember.Templates.components/methods/input?anchor=LinkTo).
  
      @for Ember.Templates.helpers
      @method link-to
      @see {Ember.Templates.components.LinkTo}
      @public
    **/
    /**
      An opaque interface which can be imported and used in strict-mode
      templates to call <LinkTo>.
  
      See [Ember.Templates.components.LinkTo](/ember/release/classes/Ember.Templates.components/methods/input?anchor=LinkTo).
  
      @for @ember/routing
      @method LinkTo
      @see {Ember.Templates.components.LinkTo}
      @public
    **/
    class _LinkTo extends InternalComponent {
        constructor() {
            super(...arguments);
            // GH #17963
            this.currentRouteCache = (0, _validator.createCache)(() => {
                (0, _validator.consumeTag)((0, _validator.tagFor)(this.routing, 'currentState'));
                return (0, _validator.untrack)(() => this.routing.currentRouteName);
            });
        }
        static toString() {
            return 'LinkTo';
        }
        validateArguments() {
            (false && !(!this.isEngine || this.engineMountPoint !== undefined) && (0, _debug.assert)('You attempted to use the <LinkTo> component within a routeless engine, this is not supported. ' + 'If you are using the ember-engines addon, use the <LinkToExternal> component instead. ' + 'See https://ember-engines.com/docs/links for more info.', !this.isEngine || this.engineMountPoint !== undefined));
            (false && !('route' in this.args.named || 'model' in this.args.named || 'models' in this.args.named || 'query' in this.args.named) && (0, _debug.assert)('You must provide at least one of the `@route`, `@model`, `@models` or `@query` arguments to `<LinkTo>`.', 'route' in this.args.named || 'model' in this.args.named || 'models' in this.args.named || 'query' in this.args.named));
            (false && !(!('model' in this.args.named && 'models' in this.args.named)) && (0, _debug.assert)('You cannot provide both the `@model` and `@models` arguments to the <LinkTo> component.', !('model' in this.args.named && 'models' in this.args.named)));
            super.validateArguments();
        }
        get class() {
            var classes = 'ember-view';
            if (this.isActive) {
                classes += this.classFor('active');
                if (this.willBeActive === false) {
                    classes += ' ember-transitioning-out';
                }
            } else if (this.willBeActive) {
                classes += ' ember-transitioning-in';
            }
            if (this.isLoading) {
                classes += this.classFor('loading');
            }
            if (this.isDisabled) {
                classes += this.classFor('disabled');
            }
            return classes;
        }
        get href() {
            if (this.isLoading) {
                return '#';
            }
            var {
                routing,
                route,
                models,
                query
            } = this;
            (false && !(isPresent(route)) && (0, _debug.assert)('[BUG] route can only be missing if isLoading is true', isPresent(route))); // consume the current router state so we invalidate when QP changes
            // TODO: can we narrow this down to QP changes only?
            (0, _validator.consumeTag)((0, _validator.tagFor)(routing, 'currentState'));
            if (false /* DEBUG */ ) {
                try {
                    return routing.generateURL(route, models, query);
                } catch (e) {
                    var details = e instanceof Error ? e.message : (0, _debug.inspect)(e);
                    var message = `While generating link to route "${route}": ${details}`;
                    if (e instanceof Error) {
                        e.message = message;
                        throw e;
                    } else {
                        throw message;
                    }
                }
            } else {
                return routing.generateURL(route, models, query);
            }
        }
        click(event) {
            if (!(0, _views.isSimpleClick)(event)) {
                return;
            }
            var element = event.currentTarget;
            (false && !(element instanceof HTMLAnchorElement) && (0, _debug.assert)('[BUG] must be an <a> element', element instanceof HTMLAnchorElement));
            var isSelf = element.target === '' || element.target === '_self';
            if (isSelf) {
                this.preventDefault(event);
            } else {
                return;
            }
            if (this.isDisabled) {
                return;
            }
            if (this.isLoading) {
                (false && (0, _debug.warn)('This link is in an inactive loading state because at least one of its models ' + 'currently has a null/undefined value, or the provided route name is invalid.', false, {
                    id: 'ember-glimmer.link-to.inactive-loading-state'
                }));
                return;
            }
            var {
                routing,
                route,
                models,
                query,
                replace
            } = this;
            var payload = {
                routeName: route,
                queryParams: query,
                transition: undefined
            };
            (0, _instrumentation.flaggedInstrument)('interaction.link-to', payload, () => {
                (false && !(isPresent(route)) && (0, _debug.assert)('[BUG] route can only be missing if isLoading is true', isPresent(route)));
                payload.transition = routing.transitionTo(route, models, query, replace);
            });
        }
        get route() {
            if ('route' in this.args.named) {
                var route = this.named('route');
                (false && !(isMissing(route) || typeof route === 'string') && (0, _debug.assert)('The `@route` argument to the <LinkTo> component must be a string', isMissing(route) || typeof route === 'string'));
                return route && this.namespaceRoute(route);
            } else {
                return this.currentRoute;
            }
        }
        get currentRoute() {
            return (0, _validator.getValue)(this.currentRouteCache);
        }
        // TODO: not sure why generateURL takes {}[] instead of unknown[]
        get models() {
            if ('models' in this.args.named) {
                var models = this.named('models');
                (false && !(Array.isArray(models)) && (0, _debug.assert)('The `@models` argument to the <LinkTo> component must be an array.', Array.isArray(models)));
                return models;
            } else if ('model' in this.args.named) {
                return [this.named('model')];
            } else {
                return EMPTY_ARRAY;
            }
        }
        get query() {
            if ('query' in this.args.named) {
                var query = this.named('query');
                (false && !(query !== null && typeof query === 'object') && (0, _debug.assert)('The `@query` argument to the <LinkTo> component must be an object.', query !== null && typeof query === 'object'));
                return {
                    ...query
                };
            } else {
                return EMPTY_QUERY_PARAMS;
            }
        }
        get replace() {
            return this.named('replace') === true;
        }
        get isActive() {
            return this.isActiveForState(this.routing.currentState);
        }
        get willBeActive() {
            var current = this.routing.currentState;
            var target = this.routing.targetState;
            if (current === target) {
                return null;
            } else {
                return this.isActiveForState(target);
            }
        }
        get isLoading() {
            return isMissing(this.route) || this.models.some(model => isMissing(model));
        }
        get isDisabled() {
            return Boolean(this.named('disabled'));
        }
        get isEngine() {
            var owner = this.owner;
            return owner instanceof _instance.default && (0, _engine.getEngineParent)(owner) !== undefined;
        }
        get engineMountPoint() {
            var owner = this.owner;
            return owner instanceof _instance.default ? owner.mountPoint : undefined;
        }
        classFor(state) {
            var className = this.named(`${state}Class`);
            (false && !(isMissing(className) || typeof className === 'string' || typeof className === 'boolean') && (0, _debug.assert)(`The \`@${state}Class\` argument to the <LinkTo> component must be a string or boolean`, isMissing(className) || typeof className === 'string' || typeof className === 'boolean'));
            if (className === true || isMissing(className)) {
                return ` ${state}`;
            } else if (className) {
                return ` ${className}`;
            } else {
                return '';
            }
        }
        namespaceRoute(route) {
            var {
                engineMountPoint
            } = this;
            if (engineMountPoint === undefined) {
                return route;
            } else if (route === 'application') {
                return engineMountPoint;
            } else {
                return `${engineMountPoint}.${route}`;
            }
        }
        isActiveForState(state) {
            if (!isPresent(state)) {
                return false;
            }
            if (this.isLoading) {
                return false;
            }
            var currentWhen = this.named('current-when');
            if (typeof currentWhen === 'boolean') {
                return currentWhen;
            } else if (typeof currentWhen === 'string') {
                var {
                    models,
                    routing
                } = this;
                return currentWhen.split(' ').some(route => routing.isActiveForRoute(models, undefined, this.namespaceRoute(route), state));
            } else {
                var {
                    route,
                    models: _models,
                    query,
                    routing: _routing
                } = this;
                (false && !(isPresent(route)) && (0, _debug.assert)('[BUG] route can only be missing if isLoading is true', isPresent(route)));
                return _routing.isActiveForRoute(_models, query, route, state);
            }
        }
        preventDefault(event) {
            event.preventDefault();
        }
        isSupportedArgument(name) {
            var supportedArguments = ['route', 'model', 'models', 'query', 'replace', 'disabled', 'current-when', 'activeClass', 'loadingClass', 'disabledClass'];
            return supportedArguments.indexOf(name) !== -1 || super.isSupportedArgument(name);
        }
    }
    __decorate$2([(0, _service.service)('-routing')], _LinkTo.prototype, "routing", void 0);
    __decorate$2([_object.action], _LinkTo.prototype, "click", null);
    var {
        prototype
    } = _LinkTo;
    var descriptorFor = (target, property) => {
        if (target) {
            return Object.getOwnPropertyDescriptor(target, property) || descriptorFor(Object.getPrototypeOf(target), property);
        } else {
            return null;
        }
    };
    // @href
    {
        var superOnUnsupportedArgument = prototype['onUnsupportedArgument'];
        Object.defineProperty(prototype, 'onUnsupportedArgument', {
            configurable: true,
            enumerable: false,
            value: function onUnsupportedArgument(name) {
                if (name === 'href') {
                    (false && !(false) && (0, _debug.assert)(`Passing the \`@href\` argument to <LinkTo> is not supported.`));
                } else {
                    superOnUnsupportedArgument.call(this, name);
                }
            }
        });
    }
    // QP
    {
        var superModelsDescriptor = descriptorFor(prototype, 'models');
        (false && !(superModelsDescriptor && typeof superModelsDescriptor.get === 'function') && (0, _debug.assert)(`[BUG] expecting models to be a getter on <LinkTo>`, superModelsDescriptor && typeof superModelsDescriptor.get === 'function'));
        var superModelsGetter = superModelsDescriptor.get;
        Object.defineProperty(prototype, 'models', {
            configurable: true,
            enumerable: false,
            get: function models() {
                var models = superModelsGetter.call(this);
                if (models.length > 0 && !('query' in this.args.named)) {
                    if (isQueryParams(models[models.length - 1])) {
                        models = models.slice(0, -1);
                    }
                }
                return models;
            }
        });
        var superQueryDescriptor = descriptorFor(prototype, 'query');
        (false && !(superQueryDescriptor && typeof superQueryDescriptor.get === 'function') && (0, _debug.assert)(`[BUG] expecting query to be a getter on <LinkTo>`, superQueryDescriptor && typeof superQueryDescriptor.get === 'function'));
        var superQueryGetter = superQueryDescriptor.get;
        Object.defineProperty(prototype, 'query', {
            configurable: true,
            enumerable: false,
            get: function query() {
                if ('query' in this.args.named) {
                    var qp = superQueryGetter.call(this);
                    if (isQueryParams(qp)) {
                        return qp.values ? ? EMPTY_QUERY_PARAMS;
                    } else {
                        return qp;
                    }
                } else {
                    var models = superModelsGetter.call(this);
                    if (models.length > 0) {
                        var _qp = models[models.length - 1];
                        if (isQueryParams(_qp) && _qp.values !== null) {
                            return _qp.values;
                        }
                    }
                    return EMPTY_QUERY_PARAMS;
                }
            }
        });
    }
    // Positional Arguments
    {
        var _superOnUnsupportedArgument = prototype['onUnsupportedArgument'];
        Object.defineProperty(prototype, 'onUnsupportedArgument', {
            configurable: true,
            enumerable: false,
            value: function onUnsupportedArgument(name) {
                if (name !== 'params') {
                    _superOnUnsupportedArgument.call(this, name);
                }
            }
        });
    }
    var LinkTo = _exports.LinkTo = opaquify(_LinkTo, LinkToTemplate);
    var TextareaTemplate = (0, _opcodeCompiler.templateFactory)({
        "id": "OpzctQXz",
        "block": "[[[11,\"textarea\"],[16,1,[30,0,[\"id\"]]],[16,0,[30,0,[\"class\"]]],[17,1],[16,2,[30,0,[\"value\"]]],[4,[38,0],[\"change\",[30,0,[\"change\"]]],null],[4,[38,0],[\"input\",[30,0,[\"input\"]]],null],[4,[38,0],[\"keyup\",[30,0,[\"keyUp\"]]],null],[4,[38,0],[\"paste\",[30,0,[\"valueDidChange\"]]],null],[4,[38,0],[\"cut\",[30,0,[\"valueDidChange\"]]],null],[12],[13]],[\"&attrs\"],false,[\"on\"]]",
        "moduleName": "packages/@ember/-internals/glimmer/lib/templates/textarea.hbs",
        "isStrictMode": false
    });
    var __decorate$3 = undefined && undefined.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    /**
      The `Textarea` component inserts a new instance of `<textarea>` tag into the template.
  
      The `@value` argument provides the content of the `<textarea>`.
  
      This template:
  
      ```handlebars
      <Textarea @value="A bunch of text" />
      ```
  
      Would result in the following HTML:
  
      ```html
      <textarea class="ember-text-area">
        A bunch of text
      </textarea>
      ```
  
      The `@value` argument is two-way bound. If the user types text into the textarea, the `@value`
      argument is updated. If the `@value` argument is updated, the text in the textarea is updated.
  
      In the following example, the `writtenWords` property on the component will be updated as the user
      types 'Lots of text' into the text area of their browser's window.
  
      ```app/components/word-editor.js
      import Component from '@glimmer/component';
      import { tracked } from '@glimmer/tracking';
  
      export default class WordEditorComponent extends Component {
        @tracked writtenWords = "Lots of text that IS bound";
      }
      ```
  
      ```handlebars
      <Textarea @value={{writtenWords}} />
      ```
  
      Would result in the following HTML:
  
      ```html
      <textarea class="ember-text-area">
        Lots of text that IS bound
      </textarea>
      ```
  
      If you wanted a one way binding, you could use the `<textarea>` element directly, and use the
      `value` DOM property and the `input` event.
  
      ### Actions
  
      The `Textarea` component takes a number of arguments with callbacks that are invoked in
      response to user events.
  
      * `enter`
      * `insert-newline`
      * `escape-press`
      * `focus-in`
      * `focus-out`
      * `key-press`
  
      These callbacks are passed to `Textarea` like this:
  
      ```handlebars
      <Textarea @value={{this.searchWord}} @enter={{this.query}} />
      ```
  
      ## Classic Invocation Syntax
  
      The `Textarea` component can also be invoked using curly braces, just like any other Ember
      component.
  
      For example, this is an invocation using angle-bracket notation:
  
      ```handlebars
      <Textarea @value={{this.searchWord}} @enter={{this.query}} />
      ```
  
      You could accomplish the same thing using classic invocation:
  
      ```handlebars
      {{textarea value=this.searchWord enter=this.query}}
      ```
  
      The main difference is that angle-bracket invocation supports any HTML attribute using HTML
      attribute syntax, because attributes and arguments have different syntax when using angle-bracket
      invocation. Curly brace invocation, on the other hand, only has a single syntax for arguments,
      and components must manually map attributes onto component arguments.
  
      When using classic invocation with `{{textarea}}`, only the following attributes are mapped onto
      arguments:
  
      * rows
      * cols
      * name
      * selectionEnd
      * selectionStart
      * autocomplete
      * wrap
      * lang
      * dir
      * value
  
      ## Classic `layout` and `layoutName` properties
  
      Because HTML `textarea` elements do not contain inner HTML the `layout` and
      `layoutName` properties will not be applied.
  
      @method Textarea
      @for Ember.Templates.components
      @public
    */
    /**
      See Ember.Templates.components.Textarea.
  
      @method textarea
      @for Ember.Templates.helpers
      @see {Ember.Templates.components.Textarea}
      @public
    */
    /**
      An opaque interface which can be imported and used in strict-mode
      templates to call <Textarea>.
  
      See [Ember.Templates.components.Textarea](/ember/release/classes/Ember.Templates.components/methods/Textarea?anchor=Input).
  
      @for @ember/component
      @method Textarea
      @see {Ember.Templates.components.Textarea}
      @public
    **/
    class _Textarea extends AbstractInput {
        static toString() {
            return 'Textarea';
        }
        get class() {
            return 'ember-text-area ember-view';
        }
        // See abstract-input.ts for why these are needed
        change(event) {
            super.change(event);
        }
        input(event) {
            super.input(event);
        }
        isSupportedArgument(name) {
            var supportedArguments = ['type', 'value', 'enter', 'insert-newline', 'escape-press'];
            return supportedArguments.indexOf(name) !== -1 || super.isSupportedArgument(name);
        }
    }
    __decorate$3([_object.action], _Textarea.prototype, "change", null);
    __decorate$3([_object.action], _Textarea.prototype, "input", null);
    var Textarea = _exports.Textarea = opaquify(_Textarea, TextareaTemplate);

    function isTemplateFactory(template) {
        return typeof template === 'function';
    }

    function referenceForParts(rootRef, parts) {
        var isAttrs = parts[0] === 'attrs';
        // TODO deprecate this
        if (isAttrs) {
            parts.shift();
            if (parts.length === 1) {
                return (0, _reference.childRefFor)(rootRef, parts[0]);
            }
        }
        return (0, _reference.childRefFromParts)(rootRef, parts);
    }

    function parseAttributeBinding(microsyntax) {
        var colonIndex = microsyntax.indexOf(':');
        if (colonIndex === -1) {
            (false && !(microsyntax !== 'class') && (0, _debug.assert)('You cannot use class as an attributeBinding, use classNameBindings instead.', microsyntax !== 'class'));
            return [microsyntax, microsyntax, true];
        } else {
            var prop = microsyntax.substring(0, colonIndex);
            var attribute = microsyntax.substring(colonIndex + 1);
            (false && !(attribute !== 'class') && (0, _debug.assert)('You cannot use class as an attributeBinding, use classNameBindings instead.', attribute !== 'class'));
            return [prop, attribute, false];
        }
    }

    function installAttributeBinding(component, rootRef, parsed, operations) {
        var [prop, attribute, isSimple] = parsed;
        if (attribute === 'id') {
            var elementId = (0, _metal.get)(component, prop);
            if (elementId === undefined || elementId === null) {
                elementId = component.elementId;
            }
            var elementIdRef = (0, _reference.createPrimitiveRef)(elementId);
            operations.setAttribute('id', elementIdRef, true, null);
            return;
        }
        var isPath = prop.indexOf('.') > -1;
        var reference = isPath ? referenceForParts(rootRef, prop.split('.')) : (0, _reference.childRefFor)(rootRef, prop);
        (false && !(!(isSimple && isPath)) && (0, _debug.assert)(`Illegal attributeBinding: '${prop}' is not a valid attribute name.`, !(isSimple && isPath)));
        operations.setAttribute(attribute, reference, false, null);
    }

    function createClassNameBindingRef(rootRef, microsyntax, operations) {
        var parts = microsyntax.split(':');
        var [prop, truthy, falsy] = parts;
        // NOTE: This could be an empty string
        (false && !(prop !== undefined) && (0, _debug.assert)('has prop', prop !== undefined)); // Will always have at least one part
        var isStatic = prop === '';
        if (isStatic) {
            operations.setAttribute('class', (0, _reference.createPrimitiveRef)(truthy), true, null);
        } else {
            var isPath = prop.indexOf('.') > -1;
            var _parts = isPath ? prop.split('.') : [];
            var value = isPath ? referenceForParts(rootRef, _parts) : (0, _reference.childRefFor)(rootRef, prop);
            var ref;
            if (truthy === undefined) {
                ref = createSimpleClassNameBindingRef(value, isPath ? _parts[_parts.length - 1] : prop);
            } else {
                ref = createColonClassNameBindingRef(value, truthy, falsy);
            }
            operations.setAttribute('class', ref, false, null);
        }
    }

    function createSimpleClassNameBindingRef(inner, path) {
        var dasherizedPath;
        return (0, _reference.createComputeRef)(() => {
            var value = (0, _reference.valueForRef)(inner);
            if (value === true) {
                (false && !(path !== undefined) && (0, _debug.assert)('You must pass a path when binding a to a class name using classNameBindings', path !== undefined));
                return dasherizedPath || (dasherizedPath = (0, _string.dasherize)(path));
            } else if (value || value === 0) {
                return String(value);
            } else {
                return null;
            }
        });
    }

    function createColonClassNameBindingRef(inner, truthy, falsy) {
        return (0, _reference.createComputeRef)(() => {
            return (0, _reference.valueForRef)(inner) ? truthy : falsy;
        });
    }

    function NOOP$1() {}
    /**
      @module ember
    */
    /**
      Represents the internal state of the component.
  
      @class ComponentStateBucket
      @private
    */
    class ComponentStateBucket {
        constructor(component, args, argsTag, finalizer, hasWrappedElement, isInteractive) {
            this.component = component;
            this.args = args;
            this.argsTag = argsTag;
            this.finalizer = finalizer;
            this.hasWrappedElement = hasWrappedElement;
            this.isInteractive = isInteractive;
            this.classRef = null;
            this.classRef = null;
            this.argsRevision = args === null ? 0 : (0, _validator.valueForTag)(argsTag);
            this.rootRef = (0, _reference.createConstRef)(component, 'this');
            (0, _destroyable.registerDestructor)(this, () => this.willDestroy(), true);
            (0, _destroyable.registerDestructor)(this, () => this.component.destroy());
        }
        willDestroy() {
            var {
                component,
                isInteractive
            } = this;
            if (isInteractive) {
                (0, _validator.beginUntrackFrame)();
                component.trigger('willDestroyElement');
                component.trigger('willClearRender');
                (0, _validator.endUntrackFrame)();
                var element = (0, _views.getViewElement)(component);
                if (element) {
                    (0, _views.clearElementView)(element);
                    (0, _views.clearViewElement)(component);
                }
            }
            component.renderer.unregister(component);
        }
        finalize() {
            var {
                finalizer
            } = this;
            finalizer();
            this.finalizer = NOOP$1;
        }
    }

    function internalHelper(helper) {
        return (0, _manager2.setInternalHelperManager)(helper, {});
    }

    /**
    @module ember
    */
    var ACTIONS = new _util._WeakSet();
    /**
      The `{{action}}` helper provides a way to pass triggers for behavior (usually
      just a function) between components, and into components from controllers.
  
      ### Passing functions with the action helper
  
      There are three contexts an action helper can be used in. The first two
      contexts to discuss are attribute context, and Handlebars value context.
  
      ```handlebars
      {{! An example of attribute context }}
      <div onclick={{action "save"}}></div>
      {{! Examples of Handlebars value context }}
      {{input on-input=(action "save")}}
      {{yield (action "refreshData") andAnotherParam}}
      ```
  
      In these contexts,
      the helper is called a "closure action" helper. Its behavior is simple:
      If passed a function name, read that function off the `actions` property
      of the current context. Once that function is read, or immediately if a function was
      passed, create a closure over that function and any arguments.
      The resulting value of an action helper used this way is simply a function.
  
      For example, in the attribute context:
  
      ```handlebars
      {{! An example of attribute context }}
      <div onclick={{action "save"}}></div>
      ```
  
      The resulting template render logic would be:
  
      ```js
      var div = document.createElement('div');
      var actionFunction = (function(context){
        return function() {
          return context.actions.save.apply(context, arguments);
        };
      })(context);
      div.onclick = actionFunction;
      ```
  
      Thus when the div is clicked, the action on that context is called.
      Because the `actionFunction` is just a function, closure actions can be
      passed between components and still execute in the correct context.
  
      Here is an example action handler on a component:
  
      ```app/components/my-component.js
      import Component from '@glimmer/component';
      import { action } from '@ember/object';
  
      export default class extends Component {
        @action
        save() {
          this.model.save();
        }
      }
      ```
  
      Actions are always looked up on the `actions` property of the current context.
      This avoids collisions in the naming of common actions, such as `destroy`.
      Two options can be passed to the `action` helper when it is used in this way.
  
      * `target=someProperty` will look to `someProperty` instead of the current
        context for the `actions` hash. This can be useful when targeting a
        service for actions.
      * `value="target.value"` will read the path `target.value` off the first
        argument to the action when it is called and rewrite the first argument
        to be that value. This is useful when attaching actions to event listeners.
  
      ### Invoking an action
  
      Closure actions curry both their scope and any arguments. When invoked, any
      additional arguments are added to the already curried list.
      Actions are presented in JavaScript as callbacks, and are
      invoked like any other JavaScript function.
  
      For example
  
      ```app/components/update-name.js
      import Component from '@glimmer/component';
      import { action } from '@ember/object';
  
      export default class extends Component {
        @action
        setName(model, name) {
          model.set('name', name);
        }
      }
      ```
  
      ```app/components/update-name.hbs
      {{input on-input=(action (action 'setName' @model) value="target.value")}}
      ```
  
      The first argument (`@model`) was curried over, and the run-time argument (`event`)
      becomes a second argument. Action calls can be nested this way because each simply
      returns a function. Any function can be passed to the `{{action}}` helper, including
      other actions.
  
      Actions invoked with `sendAction` have the same currying behavior as demonstrated
      with `on-input` above. For example:
  
      ```app/components/my-input.js
      import Component from '@glimmer/component';
      import { action } from '@ember/object';
  
      export default class extends Component {
        @action
        setName(model, name) {
          model.set('name', name);
        }
      }
      ```
  
      ```handlebars
      <MyInput @submit={{action 'setName' @model}} />
      ```
  
      or
  
      ```handlebars
      {{my-input submit=(action 'setName' @model)}}
      ```
  
      ```app/components/my-component.js
      import Component from '@ember/component';
  
      export default Component.extend({
        click() {
          // Note that model is not passed, it was curried in the template
          this.submit('bob');
        }
      });
      ```
  
      ### Attaching actions to DOM elements
  
      The third context of the `{{action}}` helper can be called "element space".
      For example:
  
      ```handlebars
      {{! An example of element space }}
      <div {{action "save"}}></div>
      ```
  
      Used this way, the `{{action}}` helper provides a useful shortcut for
      registering an HTML element in a template for a single DOM event and
      forwarding that interaction to the template's context (controller or component).
      If the context of a template is a controller, actions used this way will
      bubble to routes when the controller does not implement the specified action.
      Once an action hits a route, it will bubble through the route hierarchy.
  
      ### Event Propagation
  
      `{{action}}` helpers called in element space can control event bubbling. Note
      that the closure style actions cannot.
  
      Events triggered through the action helper will automatically have
      `.preventDefault()` called on them. You do not need to do so in your event
      handlers. If you need to allow event propagation (to handle file inputs for
      example) you can supply the `preventDefault=false` option to the `{{action}}` helper:
  
      ```handlebars
      <div {{action "sayHello" preventDefault=false}}>
        <input type="file" />
        <input type="checkbox" />
      </div>
      ```
  
      To disable bubbling, pass `bubbles=false` to the helper:
  
      ```handlebars
      <button {{action 'edit' post bubbles=false}}>Edit</button>
      ```
  
      To disable bubbling with closure style actions you must create your own
      wrapper helper that makes use of `event.stopPropagation()`:
  
      ```handlebars
      <div onclick={{disable-bubbling (action "sayHello")}}>Hello</div>
      ```
  
      ```app/helpers/disable-bubbling.js
      import { helper } from '@ember/component/helper';
  
      export function disableBubbling([action]) {
        return function(event) {
          event.stopPropagation();
          return action(event);
        };
      }
      export default helper(disableBubbling);
      ```
  
      If you need the default handler to trigger you should either register your
      own event handler, or use event methods on your view class. See
      ["Responding to Browser Events"](/ember/release/classes/Component)
      in the documentation for `Component` for more information.
  
      ### Specifying DOM event type
  
      `{{action}}` helpers called in element space can specify an event type.
      By default the `{{action}}` helper registers for DOM `click` events. You can
      supply an `on` option to the helper to specify a different DOM event name:
  
      ```handlebars
      <div {{action "anActionName" on="doubleClick"}}>
        click me
      </div>
      ```
  
      See ["Event Names"](/ember/release/classes/Component) for a list of
      acceptable DOM event names.
  
      ### Specifying whitelisted modifier keys
  
      `{{action}}` helpers called in element space can specify modifier keys.
      By default the `{{action}}` helper will ignore click events with pressed modifier
      keys. You can supply an `allowedKeys` option to specify which keys should not be ignored.
  
      ```handlebars
      <div {{action "anActionName" allowedKeys="alt"}}>
        click me
      </div>
      ```
  
      This way the action will fire when clicking with the alt key pressed down.
      Alternatively, supply "any" to the `allowedKeys` option to accept any combination of modifier keys.
  
      ```handlebars
      <div {{action "anActionName" allowedKeys="any"}}>
        click me with any key pressed
      </div>
      ```
  
      ### Specifying a Target
  
      A `target` option can be provided to the helper to change
      which object will receive the method call. This option must be a path
      to an object, accessible in the current context:
  
      ```app/templates/application.hbs
      <div {{action "anActionName" target=someService}}>
        click me
      </div>
      ```
  
      ```app/controllers/application.js
      import Controller from '@ember/controller';
      import { service } from '@ember/service';
  
      export default class extends Controller {
        @service someService;
      }
      ```
  
      @method action
      @for Ember.Templates.helpers
      @public
    */
    var action = internalHelper(args => {
        var {
            named,
            positional
        } = args;
        // The first two argument slots are reserved.
        // pos[0] is the context (or `this`)
        // pos[1] is the action name or function
        // Anything else is an action argument.
        var [context, action, ...restArgs] = positional;
        (false && !(context && action) && (0, _debug.assert)('hash position arguments', context && action));
        var debugKey = action.debugLabel;
        var target = 'target' in named ? named['target'] : context;
        var processArgs = makeArgsProcessor('value' in named && named['value'] || false, restArgs);
        var fn;
        if ((0, _reference.isInvokableRef)(action)) {
            fn = makeClosureAction(action, action, invokeRef, processArgs, debugKey);
        } else {
            fn = makeDynamicClosureAction((0, _reference.valueForRef)(context), target, action, processArgs, debugKey);
        }
        ACTIONS.add(fn);
        return (0, _reference.createUnboundRef)(fn, '(result of an `action` helper)');
    });

    function NOOP$2(args) {
        return args;
    }

    function makeArgsProcessor(valuePathRef, actionArgsRef) {
        var mergeArgs;
        if (actionArgsRef.length > 0) {
            mergeArgs = args => {
                return actionArgsRef.map(_reference.valueForRef).concat(args);
            };
        }
        var readValue;
        if (valuePathRef) {
            readValue = args => {
                var valuePath = (0, _reference.valueForRef)(valuePathRef);
                if (valuePath && args.length > 0) {
                    args[0] = (0, _metal.get)(args[0], valuePath);
                }
                return args;
            };
        }
        if (mergeArgs && readValue) {
            return args => {
                return readValue(mergeArgs(args));
            };
        } else {
            return mergeArgs || readValue || NOOP$2;
        }
    }

    function makeDynamicClosureAction(context, targetRef, actionRef, processArgs, debugKey) {
        // We don't allow undefined/null values, so this creates a throw-away action to trigger the assertions
        if (false /* DEBUG */ ) {
            makeClosureAction(context, (0, _reference.valueForRef)(targetRef), (0, _reference.valueForRef)(actionRef), processArgs, debugKey);
        }
        return function() {
            return makeClosureAction(context, (0, _reference.valueForRef)(targetRef), (0, _reference.valueForRef)(actionRef), processArgs, debugKey)(...arguments);
        };
    }

    function makeClosureAction(context, target, action, processArgs, debugKey) {
        var self;
        var fn;
        (false && !(action !== undefined && action !== null) && (0, _debug.assert)(`Action passed is null or undefined in (action) from ${target}.`, action !== undefined && action !== null));
        if (typeof action === 'string') {
            self = target;
            fn = target.actions && target.actions[action];
            (false && !(Boolean(fn)) && (0, _debug.assert)(`An action named '${action}' was not found in ${target}`, Boolean(fn)));
        } else if (typeof action === 'function') {
            self = context;
            fn = action;
        } else {
            (false && !(false) && (0, _debug.assert)(`An action could not be made for \`${debugKey || action}\` in ${target}. Please confirm that you are using either a quoted action name (i.e. \`(action '${debugKey || 'myAction'}')\`) or a function available in ${target}.`, false));
        }
        return function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            var payload = {
                target: self,
                args,
                label: '@glimmer/closure-action'
            };
            return (0, _instrumentation.flaggedInstrument)('interaction.ember-action', payload, () => {
                return (0, _runloop.join)(self, fn, ...processArgs(args));
            });
        };
    }
    // The code above:
    // 1. Finds an action function, usually on the `actions` hash
    // 2. Calls it with the target as the correct `this` context
    // Previously, `UPDATE_REFERENCED_VALUE` was a method on the reference itself,
    // so this made a bit more sense. Now, it isn't, and so we need to create a
    // function that can have `this` bound to it when called. This allows us to use
    // the same codepath to call `updateRef` on the reference.
    function invokeRef(value) {
        (0, _reference.updateRef)(this, value);
    }

    // ComponentArgs takes EvaluatedNamedArgs and converts them into the
    // inputs needed by CurlyComponents (attrs and props, with mutable
    // cells, etc).
    function processComponentArgs(namedArgs) {
        var attrs = Object.create(null);
        var props = Object.create(null);
        props[ARGS] = namedArgs;
        for (var name in namedArgs) {
            var ref = namedArgs[name];
            (false && !(ref) && (0, _debug.assert)('expected ref', ref));
            var value = (0, _reference.valueForRef)(ref);
            var isAction = typeof value === 'function' && ACTIONS.has(value);
            if ((0, _reference.isUpdatableRef)(ref) && !isAction) {
                attrs[name] = new MutableCell(ref, value);
            } else {
                attrs[name] = value;
            }
            props[name] = value;
        }
        props.attrs = attrs;
        return props;
    }
    var REF = Symbol('REF');
    class MutableCell {
        constructor(ref, value) {
            this[_views.MUTABLE_CELL] = true;
            this[REF] = ref;
            this.value = value;
        }
        update(val) {
            (0, _reference.updateRef)(this[REF], val);
        }
    }
    var ARGS = (0, _utils.enumerableSymbol)('ARGS');
    var HAS_BLOCK = (0, _utils.enumerableSymbol)('HAS_BLOCK');
    var DIRTY_TAG = Symbol('DIRTY_TAG');
    var IS_DISPATCHING_ATTRS = Symbol('IS_DISPATCHING_ATTRS');
    var BOUNDS = Symbol('BOUNDS');
    var EMBER_VIEW_REF = (0, _reference.createPrimitiveRef)('ember-view');

    function aliasIdToElementId(args, props) {
        if (args.named.has('id')) {
            (false && !(!args.named.has('elementId')) && (0, _debug.assert)(`You cannot invoke a component with both 'id' and 'elementId' at the same time.`, !args.named.has('elementId')));
            props.elementId = props.id;
        }
    }
    // We must traverse the attributeBindings in reverse keeping track of
    // what has already been applied. This is essentially refining the concatenated
    // properties applying right to left.
    function applyAttributeBindings(attributeBindings, component, rootRef, operations) {
        var seen = [];
        var i = attributeBindings.length - 1;
        while (i !== -1) {
            var binding = attributeBindings[i];
            (false && !(binding) && (0, _debug.assert)('has binding', binding));
            var parsed = parseAttributeBinding(binding);
            var attribute = parsed[1];
            if (seen.indexOf(attribute) === -1) {
                seen.push(attribute);
                installAttributeBinding(component, rootRef, parsed, operations);
            }
            i--;
        }
        if (seen.indexOf('id') === -1) {
            var id = component.elementId ? component.elementId : (0, _utils.guidFor)(component);
            operations.setAttribute('id', (0, _reference.createPrimitiveRef)(id), false, null);
        }
    }
    var EMPTY_POSITIONAL_ARGS = [];
    (0, _debug.debugFreeze)(EMPTY_POSITIONAL_ARGS);
    class CurlyComponentManager {
        templateFor(component) {
            var {
                layout,
                layoutName
            } = component;
            var owner = (0, _owner2.getOwner)(component);
            (false && !(owner) && (0, _debug.assert)('Component is unexpectedly missing an owner', owner));
            var factory;
            if (layout === undefined) {
                if (layoutName !== undefined) {
                    var _factory = owner.lookup(`template:${layoutName}`);
                    (false && !(_factory !== undefined) && (0, _debug.assert)(`Layout \`${layoutName}\` not found!`, _factory !== undefined));
                    factory = _factory;
                } else {
                    return null;
                }
            } else if (isTemplateFactory(layout)) {
                factory = layout;
            } else {
                // no layout was found, use the default layout
                return null;
            }
            return (0, _util.unwrapTemplate)(factory(owner)).asWrappedLayout();
        }
        getDynamicLayout(bucket) {
            return this.templateFor(bucket.component);
        }
        getTagName(state) {
            var {
                component,
                hasWrappedElement
            } = state;
            if (!hasWrappedElement) {
                return null;
            }
            return component && component.tagName || 'div';
        }
        getCapabilities() {
            return CURLY_CAPABILITIES;
        }
        prepareArgs(ComponentClass, args) {
            if (args.named.has('__ARGS__')) {
                (false && !(args.positional.length === 0) && (0, _debug.assert)('[BUG] cannot pass both __ARGS__ and positional arguments', args.positional.length === 0));
                var {
                    __ARGS__,
                    ...rest
                } = args.named.capture();
                (false && !(__ARGS__) && (0, _debug.assert)('[BUG] unexpectedly missing __ARGS__ after check', __ARGS__)); // does this need to be untracked?
                var __args__ = (0, _reference.valueForRef)(__ARGS__);
                var prepared = {
                    positional: __args__.positional,
                    named: {
                        ...rest,
                        ...__args__.named
                    }
                };
                return prepared;
            }
            var {
                positionalParams
            } = ComponentClass.class ? ? ComponentClass;
            // early exits
            if (positionalParams === undefined || positionalParams === null || args.positional.length === 0) {
                return null;
            }
            var named;
            if (typeof positionalParams === 'string') {
                (false && !(!args.named.has(positionalParams)) && (0, _debug.assert)(`You cannot specify positional parameters and the hash argument \`${positionalParams}\`.`, !args.named.has(positionalParams)));
                var captured = args.positional.capture();
                named = {
                    [positionalParams]: (0, _reference.createComputeRef)(() => (0, _runtime2.reifyPositional)(captured))
                };
                Object.assign(named, args.named.capture());
            } else if (Array.isArray(positionalParams) && positionalParams.length > 0) {
                var count = Math.min(positionalParams.length, args.positional.length);
                named = {};
                Object.assign(named, args.named.capture());
                for (var i = 0; i < count; i++) {
                    var name = positionalParams[i];
                    (false && !(name) && (0, _debug.assert)('Expected at least one positional param', name));
                    (false && !(!args.named.has(name)) && (0, _debug.assert)(`You cannot specify both a positional param (at position ${i}) and the hash argument \`${name}\`.`, !args.named.has(name)));
                    named[name] = args.positional.at(i);
                }
            } else {
                return null;
            }
            return {
                positional: _util.EMPTY_ARRAY,
                named
            };
        }
        /*
         * This hook is responsible for actually instantiating the component instance.
         * It also is where we perform additional bookkeeping to support legacy
         * features like exposed by view mixins like ChildViewSupport, ActionSupport,
         * etc.
         */
        create(owner, ComponentClass, args, _ref, dynamicScope, callerSelfRef, hasBlock) {
            var {
                isInteractive
            } = _ref;
            // Get the nearest concrete component instance from the scope. "Virtual"
            // components will be skipped.
            var parentView = dynamicScope.view;
            // Capture the arguments, which tells Glimmer to give us our own, stable
            // copy of the Arguments object that is safe to hold on to between renders.
            var capturedArgs = args.named.capture();
            (0, _validator.beginTrackFrame)();
            var props = processComponentArgs(capturedArgs);
            var argsTag = (0, _validator.endTrackFrame)();
            // Alias `id` argument to `elementId` property on the component instance.
            aliasIdToElementId(args, props);
            // Set component instance's parentView property to point to nearest concrete
            // component.
            props.parentView = parentView;
            // Set whether this component was invoked with a block
            // (`{{#my-component}}{{/my-component}}`) or without one
            // (`{{my-component}}`).
            props[HAS_BLOCK] = hasBlock;
            // Save the current `this` context of the template as the component's
            // `_target`, so bubbled actions are routed to the right place.
            props._target = (0, _reference.valueForRef)(callerSelfRef);
            (0, _owner2.setOwner)(props, owner);
            // caller:
            // <FaIcon @name="bug" />
            //
            // callee:
            // <i class="fa-{{@name}}"></i>
            // Now that we've built up all of the properties to set on the component instance,
            // actually create it.
            (0, _validator.beginUntrackFrame)();
            var component = ComponentClass.create(props);
            var finalizer = (0, _instrumentation._instrumentStart)('render.component', initialRenderInstrumentDetails, component);
            // We become the new parentView for downstream components, so save our
            // component off on the dynamic scope.
            dynamicScope.view = component;
            // Unless we're the root component, we need to add ourselves to our parent
            // component's childViews array.
            if (parentView !== null && parentView !== undefined) {
                (0, _views.addChildView)(parentView, component);
            }
            component.trigger('didReceiveAttrs');
            var hasWrappedElement = component.tagName !== '';
            // We usually do this in the `didCreateElement`, but that hook doesn't fire for tagless components
            if (!hasWrappedElement) {
                if (isInteractive) {
                    component.trigger('willRender');
                }
                component._transitionTo('hasElement');
                if (isInteractive) {
                    component.trigger('willInsertElement');
                }
            }
            // Track additional lifecycle metadata about this component in a state bucket.
            // Essentially we're saving off all the state we'll need in the future.
            var bucket = new ComponentStateBucket(component, capturedArgs, argsTag, finalizer, hasWrappedElement, isInteractive);
            if (args.named.has('class')) {
                bucket.classRef = args.named.get('class');
            }
            if (false /* DEBUG */ ) {
                processComponentInitializationAssertions(component, props);
            }
            if (isInteractive && hasWrappedElement) {
                component.trigger('willRender');
            }
            (0, _validator.endUntrackFrame)();
            // consume every argument so we always run again
            (0, _validator.consumeTag)(bucket.argsTag);
            (0, _validator.consumeTag)(component[DIRTY_TAG]);
            return bucket;
        }
        getDebugName(definition) {
            return definition.fullName || definition.normalizedName || definition.class ? .name || definition.name;
        }
        getSelf(_ref2) {
            var {
                rootRef
            } = _ref2;
            return rootRef;
        }
        didCreateElement(_ref3, element, operations) {
            var {
                component,
                classRef,
                isInteractive,
                rootRef
            } = _ref3;
            (0, _views.setViewElement)(component, element);
            (0, _views.setElementView)(element, component);
            var {
                attributeBindings,
                classNames,
                classNameBindings
            } = component;
            if (attributeBindings && attributeBindings.length) {
                applyAttributeBindings(attributeBindings, component, rootRef, operations);
            } else {
                var id = component.elementId ? component.elementId : (0, _utils.guidFor)(component);
                operations.setAttribute('id', (0, _reference.createPrimitiveRef)(id), false, null);
            }
            if (classRef) {
                var ref = createSimpleClassNameBindingRef(classRef);
                operations.setAttribute('class', ref, false, null);
            }
            if (classNames && classNames.length) {
                classNames.forEach(name => {
                    operations.setAttribute('class', (0, _reference.createPrimitiveRef)(name), false, null);
                });
            }
            if (classNameBindings && classNameBindings.length) {
                classNameBindings.forEach(binding => {
                    createClassNameBindingRef(rootRef, binding, operations);
                });
            }
            operations.setAttribute('class', EMBER_VIEW_REF, false, null);
            if ('ariaRole' in component) {
                operations.setAttribute('role', (0, _reference.childRefFor)(rootRef, 'ariaRole'), false, null);
            }
            component._transitionTo('hasElement');
            if (isInteractive) {
                (0, _validator.beginUntrackFrame)();
                component.trigger('willInsertElement');
                (0, _validator.endUntrackFrame)();
            }
        }
        didRenderLayout(bucket, bounds) {
            bucket.component[BOUNDS] = bounds;
            bucket.finalize();
        }
        didCreate(_ref4) {
            var {
                component,
                isInteractive
            } = _ref4;
            if (isInteractive) {
                component._transitionTo('inDOM');
                component.trigger('didInsertElement');
                component.trigger('didRender');
            }
        }
        update(bucket) {
            var {
                component,
                args,
                argsTag,
                argsRevision,
                isInteractive
            } = bucket;
            bucket.finalizer = (0, _instrumentation._instrumentStart)('render.component', rerenderInstrumentDetails, component);
            (0, _validator.beginUntrackFrame)();
            if (args !== null && !(0, _validator.validateTag)(argsTag, argsRevision)) {
                (0, _validator.beginTrackFrame)();
                var props = processComponentArgs(args);
                argsTag = bucket.argsTag = (0, _validator.endTrackFrame)();
                bucket.argsRevision = (0, _validator.valueForTag)(argsTag);
                component[IS_DISPATCHING_ATTRS] = true;
                component.setProperties(props);
                component[IS_DISPATCHING_ATTRS] = false;
                component.trigger('didUpdateAttrs');
                component.trigger('didReceiveAttrs');
            }
            if (isInteractive) {
                component.trigger('willUpdate');
                component.trigger('willRender');
            }
            (0, _validator.endUntrackFrame)();
            (0, _validator.consumeTag)(argsTag);
            (0, _validator.consumeTag)(component[DIRTY_TAG]);
        }
        didUpdateLayout(bucket) {
            bucket.finalize();
        }
        didUpdate(_ref5) {
            var {
                component,
                isInteractive
            } = _ref5;
            if (isInteractive) {
                component.trigger('didUpdate');
                component.trigger('didRender');
            }
        }
        getDestroyable(bucket) {
            return bucket;
        }
    }

    function processComponentInitializationAssertions(component, props) {
        (false && !((() => {
            var {
                classNameBindings
            } = component;
            for (var i = 0; i < classNameBindings.length; i++) {
                var binding = classNameBindings[i];
                if (typeof binding !== 'string' || binding.length === 0) {
                    return false;
                }
            }
            return true;
        })()) && (0, _debug.assert)(`classNameBindings must be non-empty strings: ${component}`, (() => {
            var {
                classNameBindings
            } = component;
            for (var i = 0; i < classNameBindings.length; i++) {
                var binding = classNameBindings[i];
                if (typeof binding !== 'string' || binding.length === 0) {
                    return false;
                }
            }
            return true;
        })()));
        (false && !((() => {
            var {
                classNameBindings
            } = component;
            for (var binding of classNameBindings) {
                if (binding.split(' ').length > 1) {
                    return false;
                }
            }
            return true;
        })()) && (0, _debug.assert)(`classNameBindings must not have spaces in them: ${component}`, (() => {
            var {
                classNameBindings
            } = component;
            for (var binding of classNameBindings) {
                if (binding.split(' ').length > 1) {
                    return false;
                }
            }
            return true;
        })()));
        (false && !(component.tagName !== '' || !component.classNameBindings || component.classNameBindings.length === 0) && (0, _debug.assert)(`You cannot use \`classNameBindings\` on a tag-less component: ${component}`, component.tagName !== '' || !component.classNameBindings || component.classNameBindings.length === 0));
        (false && !(component.tagName !== '' || props.id === component.elementId || !component.elementId && component.elementId !== '') && (0, _debug.assert)(`You cannot use \`elementId\` on a tag-less component: ${component}`, component.tagName !== '' || props.id === component.elementId || !component.elementId && component.elementId !== ''));
        (false && !(component.tagName !== '' || !component.attributeBindings || component.attributeBindings.length === 0) && (0, _debug.assert)(`You cannot use \`attributeBindings\` on a tag-less component: ${component}`, component.tagName !== '' || !component.attributeBindings || component.attributeBindings.length === 0));
    }

    function initialRenderInstrumentDetails(component) {
        return component.instrumentDetails({
            initialRender: true
        });
    }

    function rerenderInstrumentDetails(component) {
        return component.instrumentDetails({
            initialRender: false
        });
    }
    var CURLY_CAPABILITIES = {
        dynamicLayout: true,
        dynamicTag: true,
        prepareArgs: true,
        createArgs: true,
        attributeHook: true,
        elementHook: true,
        createCaller: true,
        dynamicScope: true,
        updateHook: true,
        createInstance: true,
        wrapped: true,
        willDestroy: true,
        hasSubOwner: false
    };
    var CURLY_COMPONENT_MANAGER = new CurlyComponentManager();

    function isCurlyManager(manager) {
        return manager === CURLY_COMPONENT_MANAGER;
    }

    // Keep track of which component classes have already been processed for lazy event setup.
    var lazyEventsProcessed = new WeakMap();
    class Component extends _views.CoreView.extend(_views.ChildViewsSupport, _views.ViewStateSupport, _views.ClassNamesSupport, _runtime.TargetActionSupport, _views.ActionSupport, _views.ViewMixin, {
        // These need to be overridable via extend/create but should still
        // have a default. Defining them here is the best way to achieve that.
        didReceiveAttrs() {},
        didRender() {},
        didUpdate() {},
        didUpdateAttrs() {},
        willRender() {},
        willUpdate() {}
    }) {
        constructor() {
            super(...arguments);
            this.isComponent = true;
        }
        init(properties) {
            super.init(properties);
            // Handle methods from ViewMixin.
            // The native class inheritance will not work for mixins. To work around this,
            // we copy the existing rerender method provided by the mixin and swap in the
            // new rerender method from our class.
            this._superRerender = this.rerender;
            this.rerender = this._rerender;
            this[IS_DISPATCHING_ATTRS] = false;
            this[DIRTY_TAG] = (0, _validator.createTag)();
            this[BOUNDS] = null;
            var eventDispatcher = this._dispatcher;
            if (eventDispatcher) {
                var lazyEventsProcessedForComponentClass = lazyEventsProcessed.get(eventDispatcher);
                if (!lazyEventsProcessedForComponentClass) {
                    lazyEventsProcessedForComponentClass = new WeakSet();
                    lazyEventsProcessed.set(eventDispatcher, lazyEventsProcessedForComponentClass);
                }
                var proto = Object.getPrototypeOf(this);
                if (!lazyEventsProcessedForComponentClass.has(proto)) {
                    var lazyEvents = eventDispatcher.lazyEvents;
                    lazyEvents.forEach((mappedEventName, event) => {
                        if (mappedEventName !== null && typeof this[mappedEventName] === 'function') {
                            eventDispatcher.setupHandlerForBrowserEvent(event);
                        }
                    });
                    lazyEventsProcessedForComponentClass.add(proto);
                }
            }
            if (false /* DEBUG */ && eventDispatcher && this.renderer._isInteractive && this.tagName === '') {
                var eventNames = [];
                var events = eventDispatcher.finalEventNameMapping;
                for (var key in events) {
                    var methodName = events[key];
                    if (methodName && typeof this[methodName] === 'function') {
                        eventNames.push(methodName);
                    }
                }
                // If in a tagless component, assert that no event handlers are defined
                (false && !(!eventNames.length) && (0, _debug.assert)(`You can not define \`${eventNames}\` function(s) to handle DOM event in the \`${this}\` tagless component since it doesn't have any DOM element.`, !eventNames.length));
            }
        }
        get _dispatcher() {
            if (this.__dispatcher === undefined) {
                var owner = (0, _owner2.getOwner)(this);
                (false && !(owner) && (0, _debug.assert)('Component is unexpectedly missing an owner', owner));
                if (owner.lookup('-environment:main').isInteractive) {
                    var dispatcher = owner.lookup('event_dispatcher:main');
                    (false && !(dispatcher instanceof _views.EventDispatcher) && (0, _debug.assert)('Expected dispatcher to be an EventDispatcher', dispatcher instanceof _views.EventDispatcher));
                    this.__dispatcher = dispatcher;
                } else {
                    // In FastBoot we have no EventDispatcher. Set to null to not try again to look it up.
                    this.__dispatcher = null;
                }
            }
            return this.__dispatcher;
        }
        on(name, target, method) {
            this._dispatcher ? .setupHandlerForEmberEvent(name);
            // The `on` method here comes from the Evented mixin. Since this mixin
            // is applied to the parent of this class, however, we are still able
            // to use `super`.
            return super.on(name, target, method);
        }
        // Changed to `rerender` on init
        _rerender() {
                (0, _validator.dirtyTag)(this[DIRTY_TAG]);
                this._superRerender();
            }
            [_metal.PROPERTY_DID_CHANGE](key, value) {
                if (this[IS_DISPATCHING_ATTRS]) {
                    return;
                }
                var args = this[ARGS];
                var reference = args !== undefined ? args[key] : undefined;
                if (reference !== undefined && (0, _reference.isUpdatableRef)(reference)) {
                    (0, _reference.updateRef)(reference, arguments.length === 2 ? value : (0, _metal.get)(this, key));
                }
            }
        getAttr(key) {
            // TODO Intimate API should be deprecated
            return this.get(key);
        }
        /**
          Normally, Ember's component model is "write-only". The component takes a
          bunch of attributes that it got passed in, and uses them to render its
          template.
             One nice thing about this model is that if you try to set a value to the
          same thing as last time, Ember (through HTMLBars) will avoid doing any
          work on the DOM.
             This is not just a performance optimization. If an attribute has not
          changed, it is important not to clobber the element's "hidden state".
          For example, if you set an input's `value` to the same value as before,
          it will clobber selection state and cursor position. In other words,
          setting an attribute is not **always** idempotent.
             This method provides a way to read an element's attribute and also
          update the last value Ember knows about at the same time. This makes
          setting an attribute idempotent.
             In particular, what this means is that if you get an `<input>` element's
          `value` attribute and then re-render the template with the same value,
          it will avoid clobbering the cursor and selection position.
          Since most attribute sets are idempotent in the browser, you typically
          can get away with reading attributes using jQuery, but the most reliable
          way to do so is through this method.
          @method readDOMAttr
             @param {String} name the name of the attribute
          @return String
          @public
          */
        readDOMAttr(name) {
            // TODO revisit this
            var _element = (0, _views.getViewElement)(this);
            (false && !(_element !== null) && (0, _debug.assert)(`Cannot call \`readDOMAttr\` on ${this} which does not have an element`, _element !== null));
            var element = _element;
            var isSVG = element.namespaceURI === "http://www.w3.org/2000/svg" /* Namespace.SVG */ ;
            var {
                type,
                normalized
            } = (0, _runtime2.normalizeProperty)(element, name);
            if (isSVG || type === 'attr') {
                return element.getAttribute(normalized);
            }
            return element[normalized];
        }
        static toString() {
            return '@ember/component';
        }
    }
    _exports.Component = Component;
    Component.isComponentFactory = true;
    // We continue to use reopenClass here so that positionalParams can be overridden with reopenClass in subclasses.
    Component.reopenClass({
        positionalParams: []
    });
    (0, _manager2.setInternalComponentManager)(CURLY_COMPONENT_MANAGER, Component);

    /**
    @module @ember/component
    */
    var _a;
    var RECOMPUTE_TAG = Symbol('RECOMPUTE_TAG');
    var IS_CLASSIC_HELPER = Symbol('IS_CLASSIC_HELPER');
    class Helper extends _internals.FrameworkObject {
        init(properties) {
            super.init(properties);
            this[RECOMPUTE_TAG] = (0, _validator.createTag)();
            (false && !(this.compute) && (0, _debug.assert)('expected compute to be defined', this.compute));
        }
        /**
          On a class-based helper, it may be useful to force a recomputation of that
          helpers value. This is akin to `rerender` on a component.
             For example, this component will rerender when the `currentUser` on a
          session service changes:
             ```app/helpers/current-user-email.js
          import Helper from '@ember/component/helper'
          import { service } from '@ember/service'
          import { observer } from '@ember/object'
             export default Helper.extend({
            session: service(),
               onNewUser: observer('session.currentUser', function() {
              this.recompute();
            }),
               compute() {
              return this.get('session.currentUser.email');
            }
          });
          ```
             @method recompute
          @public
          @since 1.13.0
        */
        recompute() {
            (0, _runloop.join)(() => (0, _validator.dirtyTag)(this[RECOMPUTE_TAG]));
        }
    }
    _exports.Helper = Helper;
    _a = IS_CLASSIC_HELPER;
    Helper.isHelperFactory = true;
    Helper[_a] = true;
    // `packages/ember/index.js` was setting `Helper.helper`. This seems like
    // a bad idea and probably not something we want. We've moved that definition
    // here, but it should definitely be reviewed and probably removed.
    /** @deprecated */
    Helper.helper = helper;
    /* eslint-enable import/export */
    function isClassicHelper(obj) {
        return obj[IS_CLASSIC_HELPER] === true;
    }
    class ClassicHelperManager {
        constructor(owner) {
            this.capabilities = (0, _manager2.helperCapabilities)('3.23', {
                hasValue: true,
                hasDestroyable: true
            });
            var ownerInjection = {};
            (0, _owner2.setOwner)(ownerInjection, owner);
            this.ownerInjection = ownerInjection;
        }
        createHelper(definition, args) {
            var instance = isFactoryManager(definition) ? definition.create() : definition.create(this.ownerInjection);
            (false && !(function(instance) {
                if (instance !== null && typeof instance === 'object') {
                    var cast = instance;
                    return typeof cast.compute === 'function' && typeof cast.destroy === 'function';
                }
                return false;
            }(instance)) && (0, _debug.assert)('expected HelperInstance', function(instance) {
                if (instance !== null && typeof instance === 'object') {
                    var cast = instance;
                    return typeof cast.compute === 'function' && typeof cast.destroy === 'function';
                }
                return false;
            }(instance)));
            return {
                instance,
                args
            };
        }
        getDestroyable(_ref6) {
            var {
                instance
            } = _ref6;
            return instance;
        }
        getValue(_ref7) {
            var {
                instance,
                args
            } = _ref7;
            var {
                positional,
                named
            } = args;
            var ret = instance.compute(positional, named);
            (0, _validator.consumeTag)(instance[RECOMPUTE_TAG]);
            return ret;
        }
        getDebugName(definition) {
            return (0, _utils.getDebugName)((definition.class || definition)['prototype']);
        }
    }

    function isFactoryManager(obj) {
        return obj != null && 'class' in obj;
    }
    (0, _manager2.setHelperManager)(owner => {
        return new ClassicHelperManager(owner);
    }, Helper);
    var CLASSIC_HELPER_MANAGER = (0, _manager2.getInternalHelperManager)(Helper);
    ///////////
    class Wrapper {
        constructor(compute) {
            this.compute = compute;
            this.isHelperFactory = true;
        }
        create() {
            // needs new instance or will leak containers
            return {
                compute: this.compute
            };
        }
    }
    class SimpleClassicHelperManager {
        constructor() {
            this.capabilities = (0, _manager2.helperCapabilities)('3.23', {
                hasValue: true
            });
        }
        createHelper(definition, args) {
            return () => definition.compute.call(null, args.positional, args.named);
        }
        getValue(fn) {
            return fn();
        }
        getDebugName(definition) {
            return (0, _utils.getDebugName)(definition.compute);
        }
    }
    var SIMPLE_CLASSIC_HELPER_MANAGER = new SimpleClassicHelperManager();
    (0, _manager2.setHelperManager)(() => SIMPLE_CLASSIC_HELPER_MANAGER, Wrapper.prototype);

    function helper(helperFn
        // At the implementation site, we don't care about the actual underlying type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) {
        // SAFETY: this is completely lies, in two ways:
        //
        // 1. `Wrapper` is a `Factory<SimpleHelper<S>>`, but from the perspective of
        //    any external callers (i.e. Ember *users*), it is quite important that
        //    the `Factory` relationship be hidden, because it is not public API for
        //    an end user to call `.create()` on a helper created this way. Instead,
        //    we provide them an `abstract new` signature (which means it cannot be
        //    directly constructed by calling `new` on it) and which does not have the
        //    `.create()` signature on it anymore.
        //
        // 2. The produced type here ends up being a subtype of `Helper`, which is not
        //    strictly true. This is necessary for the sake of Glint, which provides
        //    its information by way of a "declaration merge" with `Helper<S>` in the
        //    case of items produced by `helper()`.
        //
        // Long-term, this entire construct can go away in favor of deprecating the
        // `helper()` invocation in favor of using plain functions.
        return new Wrapper(helperFn);
    }

    /**
    @module @ember/template
    */
    /**
      A wrapper around a string that has been marked as safe ("trusted"). **When
      rendered in HTML, Ember will not perform any escaping.**
  
      Note:
  
      1. This does not *make* the string safe; it means that some code in your
         application has *marked* it as safe using the `htmlSafe()` function.
  
      2. The only public API for getting a `SafeString` is calling `htmlSafe()`. It
         is *not* user-constructible.
  
      If a string contains user inputs or other untrusted data, you must sanitize
      the string before using the `htmlSafe` method. Otherwise your code is
      vulnerable to [Cross-Site Scripting][xss]. There are many open source
      sanitization libraries to choose from, both for front end and server-side
      sanitization.
  
      [xss]: https://owasp.org/www-community/attacks/DOM_Based_XSS
  
      ```javascript
      import { htmlSafe } from '@ember/template';
  
      let someTrustedOrSanitizedString = "<div>Hello!</div>"
  
      htmlSafe(someTrustedorSanitizedString);
      ```
  
      @for @ember/template
      @class SafeString
      @since 4.12.0
      @public
     */
    class SafeString {
        constructor(string) {
            this.__string = string;
        }
        /**
          Get the string back to use as a string.
             @public
          @method toString
          @returns {String} The string marked as trusted
         */
        toString() {
            return `${this.__string}`;
        }
        /**
          Get the wrapped string as HTML to use without escaping.
             @public
          @method toHTML
          @returns {String} the trusted string, without any escaping applied
         */
        toHTML() {
            return this.toString();
        }
    }
    _exports.SafeString = SafeString;
    var escape = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    var possible = /[&<>"'`=]/;
    var badChars = /[&<>"'`=]/g;

    function escapeChar(chr) {
        return escape[chr];
    }

    function escapeExpression(string) {
        var s;
        if (typeof string !== 'string') {
            // don't escape SafeStrings, since they're already safe
            if (isHTMLSafe(string)) {
                return string.toHTML();
            } else if (string === null || string === undefined) {
                return '';
            } else if (!string) {
                return String(string);
            }
            // Force a string conversion as this will be done by the append regardless and
            // the regex test will do this transparently behind the scenes, causing issues if
            // an object's to string has escaped characters in it.
            s = String(string);
        } else {
            s = string;
        }
        if (!possible.test(s)) {
            return s;
        }
        // SAFETY: this is technically a lie, but it's a true lie as long as the
        // invariant it depends on is upheld: `escapeChar` will always return a string
        // as long as its input is one of the characters in `escape`, and it will only
        // be called if it matches one of the characters in the `badChar` regex, which
        // is hand-maintained to match the set escaped. (It would be nice if TS could
        // "see" into the regex to see how this works, but that'd be quite a lot of
        // extra fanciness.)
        return s.replace(badChars, escapeChar);
    }
    /**
      Use this method to indicate that a string should be rendered as HTML
      when the string is used in a template. To say this another way,
      strings marked with `htmlSafe` will not be HTML escaped.
  
      A word of warning -   The `htmlSafe` method does not make the string safe;
      it only tells the framework to treat the string as if it is safe to render
      as HTML. If a string contains user inputs or other untrusted
      data, you must sanitize the string before using the `htmlSafe` method.
      Otherwise your code is vulnerable to
      [Cross-Site Scripting](https://owasp.org/www-community/attacks/DOM_Based_XSS).
      There are many open source sanitization libraries to choose from,
      both for front end and server-side sanitization.
  
      ```javascript
      import { htmlSafe } from '@ember/template';
  
      const someTrustedOrSanitizedString = "<div>Hello!</div>"
  
      htmlSafe(someTrustedorSanitizedString)
      ```
  
      @method htmlSafe
      @for @ember/template
      @param str {String} The string to treat as trusted.
      @static
      @return {SafeString} A string that will not be HTML escaped by Handlebars.
      @public
    */
    function htmlSafe(str) {
        if (str === null || str === undefined) {
            str = '';
        } else if (typeof str !== 'string') {
            str = String(str);
        }
        return new SafeString(str);
    }
    /**
      Detects if a string was decorated using `htmlSafe`.
  
      ```javascript
      import { htmlSafe, isHTMLSafe } from '@ember/template';
  
      let plainString = 'plain string';
      let safeString = htmlSafe('<div>someValue</div>');
  
      isHTMLSafe(plainString); // false
      isHTMLSafe(safeString);  // true
      ```
  
      @method isHTMLSafe
      @for @ember/template
      @static
      @return {Boolean} `true` if the string was decorated with `htmlSafe`, `false` otherwise.
      @public
    */
    function isHTMLSafe(str) {
        return str !== null && typeof str === 'object' && 'toHTML' in str && typeof str.toHTML === 'function';
    }

    function instrumentationPayload(def) {
        return {
            object: `${def.name}:${def.outlet}`
        };
    }
    var CAPABILITIES$1 = {
        dynamicLayout: false,
        dynamicTag: false,
        prepareArgs: false,
        createArgs: false,
        attributeHook: false,
        elementHook: false,
        createCaller: false,
        dynamicScope: true,
        updateHook: false,
        createInstance: true,
        wrapped: false,
        willDestroy: false,
        hasSubOwner: false
    };
    class OutletComponentManager {
        create(_owner, definition, _args, env, dynamicScope) {
            var parentStateRef = dynamicScope.get('outletState');
            var currentStateRef = definition.ref;
            dynamicScope.set('outletState', currentStateRef);
            var state = {
                self: (0, _reference.createConstRef)(definition.controller, 'this'),
                finalize: (0, _instrumentation._instrumentStart)('render.outlet', instrumentationPayload, definition)
            };
            if (env.debugRenderTree !== undefined) {
                state.outlet = {
                    name: definition.outlet
                };
                var parentState = (0, _reference.valueForRef)(parentStateRef);
                var parentOwner = parentState && parentState.render && parentState.render.owner;
                var currentOwner = (0, _reference.valueForRef)(currentStateRef).render.owner;
                if (parentOwner && parentOwner !== currentOwner) {
                    (false && !(currentOwner instanceof _instance.default) && (0, _debug.assert)('Expected currentOwner to be an EngineInstance', currentOwner instanceof _instance.default));
                    var mountPoint = currentOwner.mountPoint;
                    state.engine = currentOwner;
                    if (mountPoint) {
                        state.engineBucket = {
                            mountPoint
                        };
                    }
                }
            }
            return state;
        }
        getDebugName(_ref8) {
            var {
                name
            } = _ref8;
            return name;
        }
        getDebugCustomRenderTree(definition, state, args) {
            var nodes = [];
            if (state.outlet) {
                nodes.push({
                    bucket: state.outlet,
                    type: 'outlet',
                    name: state.outlet.name,
                    args: _runtime2.EMPTY_ARGS,
                    instance: undefined,
                    template: undefined
                });
            }
            if (state.engineBucket) {
                nodes.push({
                    bucket: state.engineBucket,
                    type: 'engine',
                    name: state.engineBucket.mountPoint,
                    args: _runtime2.EMPTY_ARGS,
                    instance: state.engine,
                    template: undefined
                });
            }
            nodes.push({
                bucket: state,
                type: 'route-template',
                name: definition.name,
                args: args,
                instance: definition.controller,
                template: (0, _util.unwrapTemplate)(definition.template).moduleName
            });
            return nodes;
        }
        getCapabilities() {
            return CAPABILITIES$1;
        }
        getSelf(_ref9) {
            var {
                self
            } = _ref9;
            return self;
        }
        didCreate() {}
        didUpdate() {}
        didRenderLayout(state) {
            state.finalize();
        }
        didUpdateLayout() {}
        getDestroyable() {
            return null;
        }
    }
    var OUTLET_MANAGER = new OutletComponentManager();
    class OutletComponentDefinition {
        constructor(state, manager) {
            if (manager === void 0) {
                manager = OUTLET_MANAGER;
            }
            this.state = state;
            this.manager = manager;
            // handle is not used by this custom definition
            this.handle = -1;
            var capabilities = manager.getCapabilities();
            this.capabilities = (0, _manager2.capabilityFlagsFrom)(capabilities);
            this.compilable = capabilities.wrapped ? (0, _util.unwrapTemplate)(state.template).asWrappedLayout() : (0, _util.unwrapTemplate)(state.template).asLayout();
            this.resolvedName = state.name;
        }
    }

    function createRootOutlet(outletView) {
        if (_environment2.ENV._APPLICATION_TEMPLATE_WRAPPER) {
            var WRAPPED_CAPABILITIES = Object.assign({}, CAPABILITIES$1, {
                dynamicTag: true,
                elementHook: true,
                wrapped: true
            });
            var WrappedOutletComponentManager = class extends OutletComponentManager {
                getTagName() {
                    return 'div';
                }
                getCapabilities() {
                    return WRAPPED_CAPABILITIES;
                }
                didCreateElement(component, element) {
                    // to add GUID id and class
                    element.setAttribute('class', 'ember-view');
                    element.setAttribute('id', (0, _utils.guidFor)(component));
                }
            };
            var WRAPPED_OUTLET_MANAGER = new WrappedOutletComponentManager();
            return new OutletComponentDefinition(outletView.state, WRAPPED_OUTLET_MANAGER);
        } else {
            return new OutletComponentDefinition(outletView.state);
        }
    }
    class RootComponentManager extends CurlyComponentManager {
        constructor(component) {
            super();
            this.component = component;
        }
        create(_owner, _state, _args, _ref10, dynamicScope) {
            var {
                isInteractive
            } = _ref10;
            var component = this.component;
            var finalizer = (0, _instrumentation._instrumentStart)('render.component', initialRenderInstrumentDetails, component);
            dynamicScope.view = component;
            var hasWrappedElement = component.tagName !== '';
            // We usually do this in the `didCreateElement`, but that hook doesn't fire for tagless components
            if (!hasWrappedElement) {
                if (isInteractive) {
                    component.trigger('willRender');
                }
                component._transitionTo('hasElement');
                if (isInteractive) {
                    component.trigger('willInsertElement');
                }
            }
            if (false /* DEBUG */ ) {
                processComponentInitializationAssertions(component, {});
            }
            var bucket = new ComponentStateBucket(component, null, _validator.CONSTANT_TAG, finalizer, hasWrappedElement, isInteractive);
            (0, _validator.consumeTag)(component[DIRTY_TAG]);
            return bucket;
        }
    }
    // ROOT is the top-level template it has nothing but one yield.
    // it is supposed to have a dummy element
    var ROOT_CAPABILITIES = {
        dynamicLayout: true,
        dynamicTag: true,
        prepareArgs: false,
        createArgs: false,
        attributeHook: true,
        elementHook: true,
        createCaller: true,
        dynamicScope: true,
        updateHook: true,
        createInstance: true,
        wrapped: true,
        willDestroy: false,
        hasSubOwner: false
    };
    class RootComponentDefinition {
        constructor(component) {
            // handle is not used by this custom definition
            this.handle = -1;
            this.resolvedName = '-top-level';
            this.capabilities = (0, _manager2.capabilityFlagsFrom)(ROOT_CAPABILITIES);
            this.compilable = null;
            this.manager = new RootComponentManager(component);
            var factory = (0, _container.getFactoryFor)(component);
            (false && !(factory !== undefined) && (0, _debug.assert)('missing factory for component', factory !== undefined));
            this.state = factory;
        }
    }

    /**
    @module ember
    */
    /**
      The `{{#each}}` helper loops over elements in a collection. It is an extension
      of the base Handlebars `{{#each}}` helper.
  
      The default behavior of `{{#each}}` is to yield its inner block once for every
      item in an array passing the item as the first block parameter.
  
      Assuming the `@developers` argument contains this array:
  
      ```javascript
      [{ name: 'Yehuda' },{ name: 'Tom' }, { name: 'Paul' }];
      ```
  
      ```handlebars
      <ul>
        {{#each @developers as |person|}}
          <li>Hello, {{person.name}}!</li>
        {{/each}}
      </ul>
      ```
  
      The same rules apply to arrays of primitives.
  
      ```javascript
      ['Yehuda', 'Tom', 'Paul']
      ```
  
      ```handlebars
      <ul>
        {{#each @developerNames as |name|}}
          <li>Hello, {{name}}!</li>
        {{/each}}
      </ul>
      ```
  
      During iteration, the index of each item in the array is provided as a second block
      parameter.
  
      ```handlebars
      <ul>
        {{#each @developers as |person index|}}
          <li>Hello, {{person.name}}! You're number {{index}} in line</li>
        {{/each}}
      </ul>
      ```
  
      ### Specifying Keys
  
      In order to improve rendering speed, Ember will try to reuse the DOM elements
      where possible. Specifically, if the same item is present in the array both
      before and after the change, its DOM output will be reused.
  
      The `key` option is used to tell Ember how to determine if the items in the
      array being iterated over with `{{#each}}` has changed between renders. By
      default the item's object identity is used.
  
      This is usually sufficient, so in most cases, the `key` option is simply not
      needed. However, in some rare cases, the objects' identities may change even
      though they represent the same underlying data.
  
      For example:
  
      ```javascript
      people.map(person => {
        return { ...person, type: 'developer' };
      });
      ```
  
      In this case, each time the `people` array is `map`-ed over, it will produce
      an new array with completely different objects between renders. In these cases,
      you can help Ember determine how these objects related to each other with the
      `key` option:
  
      ```handlebars
      <ul>
        {{#each @developers key="name" as |person|}}
          <li>Hello, {{person.name}}!</li>
        {{/each}}
      </ul>
      ```
  
      By doing so, Ember will use the value of the property specified (`person.name`
      in the example) to find a "match" from the previous render. That is, if Ember
      has previously seen an object from the `@developers` array with a matching
      name, its DOM elements will be re-used.
  
      There are two special values for `key`:
  
        * `@index` - The index of the item in the array.
        * `@identity` - The item in the array itself.
  
      ### {{else}} condition
  
      `{{#each}}` can have a matching `{{else}}`. The contents of this block will render
      if the collection is empty.
  
      ```handlebars
      <ul>
        {{#each @developers as |person|}}
          <li>{{person.name}} is available!</li>
        {{else}}
          <li>Sorry, nobody is available for this task.</li>
        {{/each}}
      </ul>
      ```
  
      @method each
      @for Ember.Templates.helpers
      @public
     */
    /**
      The `{{each-in}}` helper loops over properties on an object.
  
      For example, given this component definition:
  
      ```app/components/developer-details.js
      import Component from '@glimmer/component';
      import { tracked } from '@glimmer/tracking';
  
      export default class extends Component {
        @tracked developer = {
          "name": "Shelly Sails",
          "age": 42
        };
      }
      ```
  
      This template would display all properties on the `developer`
      object in a list:
  
      ```app/components/developer-details.hbs
      <ul>
        {{#each-in this.developer as |key value|}}
          <li>{{key}}: {{value}}</li>
        {{/each-in}}
      </ul>
      ```
  
      Outputting their name and age:
  
      ```html
      <ul>
        <li>name: Shelly Sails</li>
        <li>age: 42</li>
      </ul>
      ```
  
      @method each-in
      @for Ember.Templates.helpers
      @public
      @since 2.1.0
    */
    class EachInWrapper {
        constructor(inner) {
            this.inner = inner;
        }
    }
    var eachIn = internalHelper(_ref11 => {
        var {
            positional
        } = _ref11;
        var inner = positional[0];
        (false && !(inner) && (0, _debug.assert)('expected at least one positional arg', inner));
        return (0, _reference.createComputeRef)(() => {
            var iterable = (0, _reference.valueForRef)(inner);
            (0, _validator.consumeTag)((0, _metal.tagForObject)(iterable));
            if ((0, _utils.isProxy)(iterable)) {
                // this is because the each-in doesn't actually get(proxy, 'key') but bypasses it
                // and the proxy's tag is lazy updated on access
                iterable = (0, _runtime._contentFor)(iterable);
            }
            return new EachInWrapper(iterable);
        });
    });

    function toIterator(iterable) {
        if (iterable instanceof EachInWrapper) {
            return toEachInIterator(iterable.inner);
        } else {
            return toEachIterator(iterable);
        }
    }

    function toEachInIterator(iterable) {
        if (!isIndexable(iterable)) {
            return null;
        }
        if (Array.isArray(iterable) || (0, _internals2.isEmberArray)(iterable)) {
            return ObjectIterator.fromIndexable(iterable);
        } else if (isNativeIterable(iterable)) {
            return MapLikeNativeIterator.from(iterable);
        } else if (hasForEach(iterable)) {
            return ObjectIterator.fromForEachable(iterable);
        } else {
            return ObjectIterator.fromIndexable(iterable);
        }
    }

    function toEachIterator(iterable) {
        if (!(0, _utils.isObject)(iterable)) {
            return null;
        }
        if (Array.isArray(iterable)) {
            return ArrayIterator.from(iterable);
        } else if ((0, _internals2.isEmberArray)(iterable)) {
            return EmberArrayIterator.from(iterable);
        } else if (isNativeIterable(iterable)) {
            return ArrayLikeNativeIterator.from(iterable);
        } else if (hasForEach(iterable)) {
            return ArrayIterator.fromForEachable(iterable);
        } else {
            return null;
        }
    }
    class BoundedIterator {
        constructor(length) {
            this.length = length;
            this.position = 0;
        }
        isEmpty() {
            return false;
        }
        memoFor(position) {
            return position;
        }
        next() {
            var {
                length,
                position
            } = this;
            if (position >= length) {
                return null;
            }
            var value = this.valueFor(position);
            var memo = this.memoFor(position);
            this.position++;
            return {
                value,
                memo
            };
        }
    }
    class ArrayIterator extends BoundedIterator {
        static from(iterable) {
            return iterable.length > 0 ? new this(iterable) : null;
        }
        static fromForEachable(object) {
            var array = [];
            object.forEach(item => array.push(item));
            return this.from(array);
        }
        constructor(array) {
            super(array.length);
            this.array = array;
        }
        valueFor(position) {
            return this.array[position];
        }
    }
    class EmberArrayIterator extends BoundedIterator {
        static from(iterable) {
            return iterable.length > 0 ? new this(iterable) : null;
        }
        constructor(array) {
            super(array.length);
            this.array = array;
        }
        valueFor(position) {
            return (0, _metal.objectAt)(this.array, position);
        }
    }
    class ObjectIterator extends BoundedIterator {
        static fromIndexable(obj) {
            var keys = Object.keys(obj);
            if (keys.length === 0) {
                return null;
            } else {
                var values = [];
                for (var key of keys) {
                    var value = void 0;
                    value = obj[key];
                    // Add the tag of the returned value if it is an array, since arrays
                    // should always cause updates if they are consumed and then changed
                    if ((0, _validator.isTracking)()) {
                        (0, _validator.consumeTag)((0, _validator.tagFor)(obj, key));
                        if (Array.isArray(value)) {
                            (0, _validator.consumeTag)((0, _validator.tagFor)(value, '[]'));
                        }
                    }
                    values.push(value);
                }
                return new this(keys, values);
            }
        }
        static fromForEachable(obj) {
            var keys = [];
            var values = [];
            var length = 0;
            var isMapLike = false;
            // Not using an arrow function here so we can get an accurate `arguments`
            obj.forEach(function(value, key) {
                isMapLike = isMapLike || arguments.length >= 2;
                if (isMapLike) {
                    keys.push(key);
                }
                values.push(value);
                length++;
            });
            if (length === 0) {
                return null;
            } else if (isMapLike) {
                return new this(keys, values);
            } else {
                return new ArrayIterator(values);
            }
        }
        constructor(keys, values) {
            super(values.length);
            this.keys = keys;
            this.values = values;
        }
        valueFor(position) {
            return this.values[position];
        }
        memoFor(position) {
            return this.keys[position];
        }
    }
    class NativeIterator {
        static from(iterable) {
            var iterator = iterable[Symbol.iterator]();
            var result = iterator.next();
            var {
                done
            } = result;
            if (done) {
                return null;
            } else {
                return new this(iterator, result);
            }
        }
        constructor(iterable, result) {
            this.iterable = iterable;
            this.result = result;
            this.position = 0;
        }
        isEmpty() {
            return false;
        }
        next() {
            var {
                iterable,
                result,
                position
            } = this;
            if (result.done) {
                return null;
            }
            var value = this.valueFor(result, position);
            var memo = this.memoFor(result, position);
            this.position++;
            this.result = iterable.next();
            return {
                value,
                memo
            };
        }
    }
    class ArrayLikeNativeIterator extends NativeIterator {
        valueFor(result) {
            return result.value;
        }
        memoFor(_result, position) {
            return position;
        }
    }
    class MapLikeNativeIterator extends NativeIterator {
        valueFor(result) {
            return result.value[1];
        }
        memoFor(result) {
            return result.value[0];
        }
    }

    function hasForEach(value) {
        return value != null && typeof value['forEach'] === 'function';
    }

    function isNativeIterable(value) {
        return value != null && typeof value[Symbol.iterator] === 'function';
    }

    function isIndexable(value) {
        return value !== null && (typeof value === 'object' || typeof value === 'function');
    }

    function toBool(predicate) {
        if ((0, _utils.isProxy)(predicate)) {
            (0, _validator.consumeTag)((0, _metal.tagForProperty)(predicate, 'content'));
            return Boolean((0, _metal.get)(predicate, 'isTruthy'));
        } else if ((0, _array.isArray)(predicate)) {
            (0, _validator.consumeTag)((0, _metal.tagForProperty)(predicate, '[]'));
            return predicate.length !== 0;
        } else if ((0, _glimmer.isHTMLSafe)(predicate)) {
            return Boolean(predicate.toString());
        } else {
            return Boolean(predicate);
        }
    }

    ///////////
    // Setup global context
    (0, _globalContext.default)({
        FEATURES: {
            DEFAULT_HELPER_MANAGER: true
        },
        scheduleRevalidate() {
            _runloop._backburner.ensureInstance();
        },
        toBool,
        toIterator,
        getProp: _metal._getProp,
        setProp: _metal._setProp,
        getPath: _metal.get,
        setPath: _metal.set,
        scheduleDestroy(destroyable, destructor) {
            (0, _runloop.schedule)('actions', null, destructor, destroyable);
        },
        scheduleDestroyed(finalizeDestructor) {
            (0, _runloop.schedule)('destroy', null, finalizeDestructor);
        },
        warnIfStyleNotTrusted(value) {
            (false && (0, _debug.warn)((0, _views.constructStyleDeprecationMessage)(String(value)), (() => {
                if (value === null || value === undefined || isHTMLSafe(value)) {
                    return true;
                }
                return false;
            })(), {
                id: 'ember-htmlbars.style-xss-warning'
            }));
        },
        assert(test, msg, options) {
            if (false /* DEBUG */ ) {
                var id = options ? .id;
                var override = VM_ASSERTION_OVERRIDES.filter(o => o.id === id)[0];
                (false && !(test) && (0, _debug.assert)(override ? .message ? ? msg, test));
            }
        },
        deprecate(msg, test, options) {
            if (false /* DEBUG */ ) {
                var {
                    id
                } = options;
                if (id === 'argument-less-helper-paren-less-invocation') {
                    throw new Error(`A resolved helper cannot be passed as a named argument as the syntax is ` + `ambiguously a pass-by-reference or invocation. Use the ` + `\`{{helper 'foo-helper}}\` helper to pass by reference or explicitly ` + `invoke the helper with parens: \`{{(fooHelper)}}\`.`);
                }
                var override = VM_DEPRECATION_OVERRIDES.filter(o => o.id === id)[0];
                if (!override) throw new Error(`deprecation override for ${id} not found`);
                // allow deprecations to be disabled in the VM_DEPRECATION_OVERRIDES array below
                if (!override.disabled) {
                    (true && !(Boolean(test)) && (0, _debug.deprecate)(override.message ? ? msg, Boolean(test), override));
                }
            }
        }
    });
    if (false /* DEBUG */ ) {
        (0, _validator.setTrackingTransactionEnv) ? .({
            debugMessage(obj, keyName) {
                var dirtyString = keyName ? `\`${keyName}\` on \`${(0, _utils.getDebugName)?.(obj)}\`` : `\`${(0, _utils.getDebugName)?.(obj)}\``;
                return `You attempted to update ${dirtyString}, but it had already been used previously in the same computation.  Attempting to update a value after using it in a computation can cause logical errors, infinite revalidation bugs, and performance issues, and is not supported.`;
            }
        });
    }
    ///////////
    // VM Assertion/Deprecation overrides
    var VM_DEPRECATION_OVERRIDES = [{
        id: 'setting-on-hash',
        until: '4.4.0',
        for: 'ember-source',
        since: {
            available: '3.28.0',
            enabled: '3.28.0'
        }
    }];
    var VM_ASSERTION_OVERRIDES = [];
    ///////////
    // Define environment delegate
    class EmberEnvironmentDelegate {
        constructor(owner, isInteractive) {
            this.owner = owner;
            this.isInteractive = isInteractive;
            this.enableDebugTooling = _environment2.ENV._DEBUG_RENDER_TREE;
        }
        onTransactionCommit() {}
    }

    /**
    @module ember
    */
    var disallowDynamicResolution = internalHelper(_ref12 => {
        var {
            positional,
            named
        } = _ref12;
        var nameOrValueRef = positional[0];
        (false && !(positional.length === 1 && nameOrValueRef) && (0, _debug.assert)(`[BUG] wrong number of positional arguments, expecting 1, got ${positional.length}`, positional.length === 1 && nameOrValueRef));
        var typeRef = named['type'];
        var locRef = named['loc'];
        var originalRef = named['original'];
        (false && !(typeRef) && (0, _debug.assert)(`[BUG] expecting \`type\` named argument`, typeRef));
        (false && !(locRef) && (0, _debug.assert)(`[BUG] expecting \`loc\` named argument`, locRef));
        (false && !(originalRef) && (0, _debug.assert)(`[BUG] expecting \`original\` named argument`, originalRef)); // Bug: why do these fail?
        // assert('[BUG] expecting a string literal for the `type` argument', isConstRef(typeRef));
        // assert('[BUG] expecting a string literal for the `loc` argument', isConstRef(locRef));
        // assert('[BUG] expecting a string literal for the `original` argument', isConstRef(originalRef));
        var type = (0, _reference.valueForRef)(typeRef);
        var loc = (0, _reference.valueForRef)(locRef);
        var original = (0, _reference.valueForRef)(originalRef);
        (false && !(typeof type === 'string') && (0, _debug.assert)('[BUG] expecting a string literal for the `type` argument', typeof type === 'string'));
        (false && !(typeof loc === 'string') && (0, _debug.assert)('[BUG] expecting a string literal for the `loc` argument', typeof loc === 'string'));
        (false && !(typeof original === 'string') && (0, _debug.assert)('[BUG] expecting a string literal for the `original` argument', typeof original === 'string'));
        return (0, _reference.createComputeRef)(() => {
            var nameOrValue = (0, _reference.valueForRef)(nameOrValueRef);
            (false && !(typeof nameOrValue !== 'string') && (0, _debug.assert)(`Passing a dynamic string to the \`(${type})\` keyword is disallowed. ` + `(You specified \`(${type} ${original})\` and \`${original}\` evaluated into "${nameOrValue}".) ` + `This ensures we can statically analyze the template and determine which ${type}s are used. ` + `If the ${type} name is always the same, use a string literal instead, i.e. \`(${type} "${nameOrValue}")\`. ` + `Otherwise, import the ${type}s into JavaScript and pass them directly. ` + 'See https://github.com/emberjs/rfcs/blob/master/text/0496-handlebars-strict-mode.md#4-no-dynamic-resolution for details. ' + loc, typeof nameOrValue !== 'string'));
            return nameOrValue;
        });
    });
    var helper$1;
    if (false /* DEBUG */ ) {
        helper$1 = args => {
            var inner = args.positional[0];
            (false && !(inner) && (0, _debug.assert)('expected at least one positional arg', inner));
            return (0, _reference.createComputeRef)(() => {
                var value = (0, _reference.valueForRef)(inner);
                (false && !(value !== null && value !== undefined) && (0, _debug.assert)('You cannot pass a null or undefined destination element to in-element', value !== null && value !== undefined));
                return value;
            });
        };
    } else {
        helper$1 = args => {
            var arg = args.positional[0];
            (false && !(arg) && (0, _debug.assert)('expected at least one positional arg', arg));
            return arg;
        };
    }
    var inElementNullCheckHelper = internalHelper(helper$1);
    var normalizeClassHelper = internalHelper(_ref13 => {
        var {
            positional
        } = _ref13;
        return (0, _reference.createComputeRef)(() => {
            var classNameArg = positional[0];
            var valueArg = positional[1];
            (false && !(classNameArg && valueArg) && (0, _debug.assert)('expected at least two positional args', classNameArg && valueArg));
            var classNameParts = (0, _reference.valueForRef)(classNameArg).split('.');
            var className = classNameParts[classNameParts.length - 1];
            (false && !(className) && (0, _debug.assert)('has className', className)); // Always at least one split result
            var value = (0, _reference.valueForRef)(valueArg);
            if (value === true) {
                return (0, _string.dasherize)(className);
            } else if (!value && value !== 0) {
                return '';
            } else {
                return String(value);
            }
        });
    });
    var resolve = internalHelper((_ref14, owner) => {
        var {
            positional
        } = _ref14;
        // why is this allowed to be undefined in the first place?
        (false && !(owner) && (0, _debug.assert)('[BUG] missing owner', owner));
        (false && !(positional.length === 1) && (0, _debug.assert)(`[BUG] wrong number of positional arguments, expecting 1, got ${positional.length}`, positional.length === 1));
        var fullNameRef = positional[0];
        (false && !(fullNameRef && (0, _reference.isConstRef)(fullNameRef)) && (0, _debug.assert)('[BUG] expecting a string literal as argument', fullNameRef && (0, _reference.isConstRef)(fullNameRef)));
        var fullName = (0, _reference.valueForRef)(fullNameRef);
        (false && !(typeof fullName === 'string') && (0, _debug.assert)('[BUG] expecting a string literal as argument', typeof fullName === 'string'));
        (false && !((s => s.split(':').length === 2)(fullName)) && (0, _debug.assert)('[BUG] expecting a valid full name', (s => s.split(':').length === 2)(fullName)));
        if (false /* DEBUG */ ) {
            var [type, name] = fullName.split(':');
            (false && !(owner.hasRegistration(fullName)) && (0, _debug.assert)(`Attempted to invoke \`(-resolve "${fullName}")\`, but ${name} was not a valid ${type} name.`, owner.hasRegistration(fullName)));
        }
        return (0, _reference.createConstRef)(owner.factoryFor(fullName) ? .class, `(-resolve "${fullName}")`);
    });

    /**
    @module ember
    */
    /**
      This reference is used to get the `[]` tag of iterables, so we can trigger
      updates to `{{each}}` when it changes. It is put into place by a template
      transform at build time, similar to the (-each-in) helper
    */
    var trackArray = internalHelper(_ref15 => {
        var {
            positional
        } = _ref15;
        var inner = positional[0];
        (false && !(inner) && (0, _debug.assert)('expected at least one positional arg', inner));
        return (0, _reference.createComputeRef)(() => {
            var iterable = (0, _reference.valueForRef)(inner);
            if ((0, _utils.isObject)(iterable)) {
                (0, _validator.consumeTag)((0, _metal.tagForProperty)(iterable, '[]'));
            }
            return iterable;
        });
    });

    /**
    @module ember
    */
    /**
      The `mut` helper lets you __clearly specify__ that a child `Component` can update the
      (mutable) value passed to it, which will __change the value of the parent component__.
  
      To specify that a parameter is mutable, when invoking the child `Component`:
  
      ```handlebars
      <MyChild @childClickCount={{fn (mut totalClicks)}} />
      ```
  
       or
  
      ```handlebars
      {{my-child childClickCount=(mut totalClicks)}}
      ```
  
      The child `Component` can then modify the parent's value just by modifying its own
      property:
  
      ```javascript
      // my-child.js
      export default Component.extend({
        click() {
          this.incrementProperty('childClickCount');
        }
      });
      ```
  
      Note that for curly components (`{{my-component}}`) the bindings are already mutable,
      making the `mut` unnecessary.
  
      Additionally, the `mut` helper can be combined with the `fn` helper to
      mutate a value. For example:
  
      ```handlebars
      <MyChild @childClickCount={{this.totalClicks}} @click-count-change={{fn (mut totalClicks))}} />
      ```
  
      or
  
      ```handlebars
      {{my-child childClickCount=totalClicks click-count-change=(fn (mut totalClicks))}}
      ```
  
      The child `Component` would invoke the function with the new click value:
  
      ```javascript
      // my-child.js
      export default Component.extend({
        click() {
          this.get('click-count-change')(this.get('childClickCount') + 1);
        }
      });
      ```
  
      The `mut` helper changes the `totalClicks` value to what was provided as the `fn` argument.
  
      The `mut` helper, when used with `fn`, will return a function that
      sets the value passed to `mut` to its first argument. As an example, we can create a
      button that increments a value passing the value directly to the `fn`:
  
      ```handlebars
      {{! inc helper is not provided by Ember }}
      <button onclick={{fn (mut count) (inc count)}}>
        Increment count
      </button>
      ```
  
      @method mut
      @param {Object} [attr] the "two-way" attribute that can be modified.
      @for Ember.Templates.helpers
      @public
    */
    var mut = internalHelper(_ref16 => {
        var {
            positional
        } = _ref16;
        var ref = positional[0];
        (false && !(ref) && (0, _debug.assert)('expected at least one positional arg', ref)); // TODO: Improve this error message. This covers at least two distinct
        // cases:
        //
        // 1. (mut "not a path") – passing a literal, result from a helper
        //    invocation, etc
        //
        // 2. (mut receivedValue) – passing a value received from the caller
        //    that was originally derived from a literal, result from a helper
        //    invocation, etc
        //
        // This message is alright for the first case, but could be quite
        // confusing for the second case.
        (false && !((0, _reference.isUpdatableRef)(ref)) && (0, _debug.assert)('You can only pass a path to mut', (0, _reference.isUpdatableRef)(ref)));
        return (0, _reference.createInvokableRef)(ref);
    });

    /**
      The `readonly` helper let's you specify that a binding is one-way only,
      instead of two-way.
      When you pass a `readonly` binding from an outer context (e.g. parent component),
      to to an inner context (e.g. child component), you are saying that changing that
      property in the inner context does not change the value in the outer context.
  
      To specify that a binding is read-only, when invoking the child `Component`:
  
      ```app/components/my-parent.js
      export default Component.extend({
        totalClicks: 3
      });
      ```
  
      ```app/templates/components/my-parent.hbs
      {{log totalClicks}} // -> 3
      <MyChild @childClickCount={{readonly totalClicks}} />
      ```
      ```
      {{my-child childClickCount=(readonly totalClicks)}}
      ```
  
      Now, when you update `childClickCount`:
  
      ```app/components/my-child.js
      export default Component.extend({
        click() {
          this.incrementProperty('childClickCount');
        }
      });
      ```
  
      The value updates in the child component, but not the parent component:
  
      ```app/templates/components/my-child.hbs
      {{log childClickCount}} //-> 4
      ```
  
      ```app/templates/components/my-parent.hbs
      {{log totalClicks}} //-> 3
      <MyChild @childClickCount={{readonly totalClicks}} />
      ```
      or
      ```app/templates/components/my-parent.hbs
      {{log totalClicks}} //-> 3
      {{my-child childClickCount=(readonly totalClicks)}}
      ```
  
      ### Objects and Arrays
  
      When passing a property that is a complex object (e.g. object, array) instead of a primitive object (e.g. number, string),
      only the reference to the object is protected using the readonly helper.
      This means that you can change properties of the object both on the parent component, as well as the child component.
      The `readonly` binding behaves similar to the `const` keyword in JavaScript.
  
      Let's look at an example:
  
      First let's set up the parent component:
  
      ```app/components/my-parent.js
      import Component from '@ember/component';
  
      export default Component.extend({
        clicks: null,
  
        init() {
          this._super(...arguments);
          this.set('clicks', { total: 3 });
        }
      });
      ```
  
      ```app/templates/components/my-parent.hbs
      {{log clicks.total}} //-> 3
      <MyChild @childClicks={{readonly clicks}} />
      ```
      ```app/templates/components/my-parent.hbs
      {{log clicks.total}} //-> 3
      {{my-child childClicks=(readonly clicks)}}
      ```
  
      Now, if you update the `total` property of `childClicks`:
  
      ```app/components/my-child.js
      import Component from '@ember/component';
  
      export default Component.extend({
        click() {
          this.get('clicks').incrementProperty('total');
        }
      });
      ```
  
      You will see the following happen:
  
      ```app/templates/components/my-parent.hbs
      {{log clicks.total}} //-> 4
      <MyChild @childClicks={{readonly clicks}} />
      ```
      or
      ```app/templates/components/my-parent.hbs
      {{log clicks.total}} //-> 4
      {{my-child childClicks=(readonly clicks)}}
      ```
  
      ```app/templates/components/my-child.hbs
      {{log childClicks.total}} //-> 4
      ```
  
      @method readonly
      @param {Object} [attr] the read-only attribute.
      @for Ember.Templates.helpers
      @private
    */
    var readonly = internalHelper(_ref17 => {
        var {
            positional
        } = _ref17;
        var firstArg = positional[0];
        (false && !(firstArg) && (0, _debug.assert)('has first arg', firstArg));
        return (0, _reference.createReadOnlyRef)(firstArg);
    });

    /**
    @module ember
    */
    /**
      The `{{unbound}}` helper disconnects the one-way binding of a property,
      essentially freezing its value at the moment of rendering. For example,
      in this example the display of the variable `name` will not change even
      if it is set with a new value:
  
      ```handlebars
      {{unbound this.name}}
      ```
  
      Like any helper, the `unbound` helper can accept a nested helper expression.
      This allows for custom helpers to be rendered unbound:
  
      ```handlebars
      {{unbound (some-custom-helper)}}
      {{unbound (capitalize this.name)}}
      {{! You can use any helper, including unbound, in a nested expression }}
      {{capitalize (unbound this.name)}}
      ```
  
      The `unbound` helper only accepts a single argument, and it return an
      unbound value.
  
      @method unbound
      @for Ember.Templates.helpers
      @public
    */
    var unbound = internalHelper(_ref18 => {
        var {
            positional,
            named
        } = _ref18;
        (false && !(positional.length === 1 && Object.keys(named).length === 0) && (0, _debug.assert)('unbound helper cannot be called with multiple params or hash params', positional.length === 1 && Object.keys(named).length === 0));
        return (0, _reference.createUnboundRef)((0, _reference.valueForRef)(positional[0]), '(result of an `unbound` helper)');
    });

    /**
    @module ember
    */
    var uniqueId = internalHelper(() => {
        return (0, _reference.createConstRef)(uniqueId$1(), 'unique-id');
    });
    // From https://gist.github.com/selfish/fef2c0ba6cdfe07af76e64cecd74888b
    //
    // This code should be reasonably fast, and provide a unique value every time
    // it's called, which is what we need here. It produces a string formatted as a
    // standard UUID, which avoids accidentally turning Ember-specific
    // implementation details into an intimate API. It also ensures that the UUID
    // always starts with a letter, to avoid creating invalid IDs with a numeric
    // digit at the start.
    function uniqueId$1() {
        // @ts-expect-error this one-liner abuses weird JavaScript semantics that
        // TypeScript (legitimately) doesn't like, but they're nonetheless valid and
        // specced.
        return ([3e7] + -1e3 + -4e3 + -2e3 + -1e11).replace(/[0-3]/g, a => (a * 4 ^ Math.random() * 16 >> (a & 2)).toString(16));
    }
    var MODIFIERS = ['alt', 'shift', 'meta', 'ctrl'];
    var POINTER_EVENT_TYPE_REGEX = /^click|mouse|touch/;

    function isAllowedEvent(event, allowedKeys) {
        if (allowedKeys === null || allowedKeys === undefined) {
            if (POINTER_EVENT_TYPE_REGEX.test(event.type)) {
                return (0, _views.isSimpleClick)(event);
            } else {
                allowedKeys = '';
            }
        }
        if (allowedKeys.indexOf('any') >= 0) {
            return true;
        }
        for (var i = 0; i < MODIFIERS.length; i++) {
            if (event[MODIFIERS[i] + 'Key'] && allowedKeys.indexOf(MODIFIERS[i]) === -1) {
                return false;
            }
        }
        return true;
    }
    var ActionHelper = {
        // registeredActions is re-exported for compatibility with older plugins
        // that were using this undocumented API.
        registeredActions: _views.ActionManager.registeredActions,
        registerAction(actionState) {
            var {
                actionId
            } = actionState;
            _views.ActionManager.registeredActions[actionId] = actionState;
            return actionId;
        },
        unregisterAction(actionState) {
            var {
                actionId
            } = actionState;
            delete _views.ActionManager.registeredActions[actionId];
        }
    };
    class ActionState {
        constructor(element, owner, actionId, actionArgs, namedArgs, positionalArgs) {
            this.tag = (0, _validator.createUpdatableTag)();
            this.element = element;
            this.owner = owner;
            this.actionId = actionId;
            this.actionArgs = actionArgs;
            this.namedArgs = namedArgs;
            this.positional = positionalArgs;
            this.eventName = this.getEventName();
            (0, _destroyable.registerDestructor)(this, () => ActionHelper.unregisterAction(this));
        }
        getEventName() {
            var {
                on
            } = this.namedArgs;
            return on !== undefined ? (0, _reference.valueForRef)(on) : 'click';
        }
        getActionArgs() {
            var result = new Array(this.actionArgs.length);
            for (var i = 0; i < this.actionArgs.length; i++) {
                result[i] = (0, _reference.valueForRef)(this.actionArgs[i]);
            }
            return result;
        }
        getTarget() {
            var {
                implicitTarget,
                namedArgs
            } = this;
            var {
                target
            } = namedArgs;
            return target !== undefined ? (0, _reference.valueForRef)(target) : (0, _reference.valueForRef)(implicitTarget);
        }
        handler(event) {
            var {
                actionName,
                namedArgs
            } = this;
            var {
                bubbles,
                preventDefault,
                allowedKeys
            } = namedArgs;
            var bubblesVal = bubbles !== undefined ? (0, _reference.valueForRef)(bubbles) : undefined;
            var preventDefaultVal = preventDefault !== undefined ? (0, _reference.valueForRef)(preventDefault) : undefined;
            var allowedKeysVal = allowedKeys !== undefined ? (0, _reference.valueForRef)(allowedKeys) : undefined;
            var target = this.getTarget();
            var shouldBubble = bubblesVal !== false;
            if (!isAllowedEvent(event, allowedKeysVal)) {
                return true;
            }
            if (preventDefaultVal !== false) {
                event.preventDefault();
            }
            if (!shouldBubble) {
                event.stopPropagation();
            }
            (0, _runloop.join)(() => {
                var args = this.getActionArgs();
                var payload = {
                    args,
                    target,
                    name: null
                };
                if ((0, _reference.isInvokableRef)(actionName)) {
                    (0, _instrumentation.flaggedInstrument)('interaction.ember-action', payload, () => {
                        (0, _reference.updateRef)(actionName, args[0]);
                    });
                    return;
                }
                if (typeof actionName === 'function') {
                    (0, _instrumentation.flaggedInstrument)('interaction.ember-action', payload, () => {
                        actionName.apply(target, args);
                    });
                    return;
                }
                payload.name = actionName;
                if (target.send) {
                    (0, _instrumentation.flaggedInstrument)('interaction.ember-action', payload, () => {
                        target.send.apply(target, [actionName, ...args]);
                    });
                } else {
                    (false && !(typeof target[actionName] === 'function') && (0, _debug.assert)(`The action '${actionName}' did not exist on ${target}`, typeof target[actionName] === 'function'));
                    (0, _instrumentation.flaggedInstrument)('interaction.ember-action', payload, () => {
                        target[actionName].apply(target, args);
                    });
                }
            });
            return shouldBubble;
        }
    }
    class ActionModifierManager {
        create(owner, element, _state, _ref19) {
            var {
                named,
                positional
            } = _ref19;
            var actionArgs = [];
            // The first two arguments are (1) `this` and (2) the action name.
            // Everything else is a param.
            for (var i = 2; i < positional.length; i++) {
                actionArgs.push(positional[i]);
            }
            var actionId = (0, _utils.uuid)();
            return new ActionState(element, owner, actionId, actionArgs, named, positional);
        }
        getDebugName() {
            return 'action';
        }
        install(actionState) {
            var {
                element,
                actionId,
                positional
            } = actionState;
            var actionName;
            var actionNameRef;
            var implicitTarget;
            if (positional.length > 1) {
                implicitTarget = positional[0];
                actionNameRef = positional[1];
                if ((0, _reference.isInvokableRef)(actionNameRef)) {
                    actionName = actionNameRef;
                } else {
                    actionName = (0, _reference.valueForRef)(actionNameRef);
                    if (false /* DEBUG */ ) {
                        var actionPath = actionNameRef.debugLabel;
                        var actionPathParts = actionPath.split('.');
                        var actionLabel = actionPathParts[actionPathParts.length - 1];
                        (false && !(typeof actionName === 'string' || typeof actionName === 'function') && (0, _debug.assert)('You specified a quoteless path, `' + actionPath + '`, to the ' + '{{action}} helper which did not resolve to an action name (a ' + 'string). Perhaps you meant to use a quoted actionName? (e.g. ' + '{{action "' + actionLabel + '"}}).', typeof actionName === 'string' || typeof actionName === 'function'));
                    }
                }
            }
            actionState.actionName = actionName;
            actionState.implicitTarget = implicitTarget;
            this.ensureEventSetup(actionState);
            ActionHelper.registerAction(actionState);
            element.setAttribute('data-ember-action', '');
            element.setAttribute(`data-ember-action-${actionId}`, String(actionId));
        }
        update(actionState) {
            var {
                positional
            } = actionState;
            var actionNameRef = positional[1];
            (false && !(actionNameRef) && (0, _debug.assert)('Expected at least one positional arg', actionNameRef));
            if (!(0, _reference.isInvokableRef)(actionNameRef)) {
                actionState.actionName = (0, _reference.valueForRef)(actionNameRef);
            }
            var newEventName = actionState.getEventName();
            if (newEventName !== actionState.eventName) {
                this.ensureEventSetup(actionState);
                actionState.eventName = actionState.getEventName();
            }
        }
        ensureEventSetup(actionState) {
            var dispatcher = actionState.owner.lookup('event_dispatcher:main');
            (false && !(dispatcher instanceof _views.EventDispatcher) && (0, _debug.assert)('Expected dispatcher to be an EventDispatcher', dispatcher instanceof _views.EventDispatcher));
            dispatcher ? .setupHandlerForEmberEvent(actionState.eventName);
        }
        getTag(actionState) {
            return actionState.tag;
        }
        getDestroyable(actionState) {
            return actionState;
        }
    }
    var ACTION_MODIFIER_MANAGER = new ActionModifierManager();
    var actionModifier = (0, _manager2.setInternalModifierManager)(ACTION_MODIFIER_MANAGER, {});
    var CAPABILITIES$2 = {
        dynamicLayout: true,
        dynamicTag: false,
        prepareArgs: false,
        createArgs: true,
        attributeHook: false,
        elementHook: false,
        createCaller: true,
        dynamicScope: true,
        updateHook: true,
        createInstance: true,
        wrapped: false,
        willDestroy: false,
        hasSubOwner: true
    };
    class MountManager {
        getDynamicLayout(state) {
            var templateFactory = state.engine.lookup('template:application');
            return (0, _util.unwrapTemplate)(templateFactory(state.engine)).asLayout();
        }
        getCapabilities() {
            return CAPABILITIES$2;
        }
        getOwner(state) {
            return state.engine;
        }
        create(owner, _ref20, args, env) {
            var {
                name
            } = _ref20;
            // TODO
            // mount is a runtime helper, this shouldn't use dynamic layout
            // we should resolve the engine app template in the helper
            // it also should use the owner that looked up the mount helper.
            (false && !(owner instanceof _instance.default) && (0, _debug.assert)('Expected owner to be an EngineInstance', owner instanceof _instance.default));
            var engine = owner.buildChildEngineInstance(name);
            engine.boot();
            var applicationFactory = engine.factoryFor(`controller:application`);
            var controllerFactory = applicationFactory || (0, _internals3.generateControllerFactory)(engine, 'application');
            var controller;
            var self;
            var bucket;
            var modelRef;
            if (args.named.has('model')) {
                modelRef = args.named.get('model');
            }
            if (modelRef === undefined) {
                controller = controllerFactory.create();
                self = (0, _reference.createConstRef)(controller, 'this');
                bucket = {
                    engine,
                    controller,
                    self,
                    modelRef
                };
            } else {
                var model = (0, _reference.valueForRef)(modelRef);
                controller = controllerFactory.create({
                    model
                });
                self = (0, _reference.createConstRef)(controller, 'this');
                bucket = {
                    engine,
                    controller,
                    self,
                    modelRef
                };
            }
            if (env.debugRenderTree) {
                (0, _destroyable.associateDestroyableChild)(engine, controller);
            }
            return bucket;
        }
        getDebugName(_ref21) {
            var {
                name
            } = _ref21;
            return name;
        }
        getDebugCustomRenderTree(definition, state, args, templateModuleName) {
            return [{
                bucket: state.engine,
                instance: state.engine,
                type: 'engine',
                name: definition.name,
                args
            }, {
                bucket: state.controller,
                instance: state.controller,
                type: 'route-template',
                name: 'application',
                args,
                template: templateModuleName
            }];
        }
        getSelf(_ref22) {
            var {
                self
            } = _ref22;
            return self;
        }
        getDestroyable(bucket) {
            return bucket.engine;
        }
        didCreate() {}
        didUpdate() {}
        didRenderLayout() {}
        didUpdateLayout() {}
        update(bucket) {
            var {
                controller,
                modelRef
            } = bucket;
            if (modelRef !== undefined) {
                controller.set('model', (0, _reference.valueForRef)(modelRef));
            }
        }
    }
    var MOUNT_MANAGER = new MountManager();
    class MountDefinition {
        constructor(resolvedName) {
            this.resolvedName = resolvedName;
            // handle is not used by this custom definition
            this.handle = -1;
            this.manager = MOUNT_MANAGER;
            this.compilable = null;
            this.capabilities = (0, _manager2.capabilityFlagsFrom)(CAPABILITIES$2);
            this.state = {
                name: resolvedName
            };
        }
    }

    /**
      The `{{mount}}` helper lets you embed a routeless engine in a template.
      Mounting an engine will cause an instance to be booted and its `application`
      template to be rendered.
  
      For example, the following template mounts the `ember-chat` engine:
  
      ```handlebars
      {{! application.hbs }}
      {{mount "ember-chat"}}
      ```
  
      Additionally, you can also pass in a `model` argument that will be
      set as the engines model. This can be an existing object:
  
      ```
      <div>
        {{mount 'admin' model=userSettings}}
      </div>
      ```
  
      Or an inline `hash`, and you can even pass components:
  
      ```
      <div>
        <h1>Application template!</h1>
        {{mount 'admin' model=(hash
            title='Secret Admin'
            signInButton=(component 'sign-in-button')
        )}}
      </div>
      ```
  
      @method mount
      @param {String} name Name of the engine to mount.
      @param {Object} [model] Object that will be set as
                              the model of the engine.
      @for Ember.Templates.helpers
      @public
    */
    var mountHelper = internalHelper((args, owner) => {
        (false && !(owner) && (0, _debug.assert)('{{mount}} must be used within a component that has an owner', owner));
        var nameRef = args.positional[0];
        var captured;
        (false && !(args.positional.length === 1) && (0, _debug.assert)('You can only pass a single positional argument to the {{mount}} helper, e.g. {{mount "chat-engine"}}.', args.positional.length === 1));
        if (false /* DEBUG */ && args.named) {
            var keys = Object.keys(args.named);
            var extra = keys.filter(k => k !== 'model');
            (false && !(extra.length === 0) && (0, _debug.assert)('You can only pass a `model` argument to the {{mount}} helper, ' + 'e.g. {{mount "profile-engine" model=this.profile}}. ' + `You passed ${extra.join(',')}.`, extra.length === 0));
        }
        captured = (0, _runtime2.createCapturedArgs)(args.named, _runtime2.EMPTY_POSITIONAL);
        var lastName, lastDef;
        return (0, _reference.createComputeRef)(() => {
            var name = (0, _reference.valueForRef)(nameRef);
            if (typeof name === 'string') {
                if (lastName === name) {
                    return lastDef;
                }
                (false && !(owner.hasRegistration(`engine:${name}`)) && (0, _debug.assert)(`You used \`{{mount '${name}'}}\`, but the engine '${name}' can not be found.`, owner.hasRegistration(`engine:${name}`)));
                lastName = name;
                lastDef = (0, _runtime2.curry)(0 /* CurriedType.Component */ , new MountDefinition(name), owner, captured, true);
                return lastDef;
            } else {
                (false && !(name === null || name === undefined) && (0, _debug.assert)(`Invalid engine name '${name}' specified, engine name must be either a string, null or undefined.`, name === null || name === undefined));
                lastDef = null;
                lastName = null;
                return null;
            }
        });
    });

    /**
      The `{{outlet}}` helper lets you specify where a child route will render in
      your template. An important use of the `{{outlet}}` helper is in your
      application's `application.hbs` file:
  
      ```app/templates/application.hbs
      <MyHeader />
  
      <div class="my-dynamic-content">
        <!-- this content will change based on the current route, which depends on the current URL -->
        {{outlet}}
      </div>
  
      <MyFooter />
      ```
  
      See the [routing guide](https://guides.emberjs.com/release/routing/rendering-a-template/) for more
      information on how your `route` interacts with the `{{outlet}}` helper.
      Note: Your content __will not render__ if there isn't an `{{outlet}}` for it.
  
      @method outlet
      @for Ember.Templates.helpers
      @public
    */
    var outletHelper = internalHelper((_args, owner, scope) => {
        (false && !(owner) && (0, _debug.assert)('Expected owner to be present, {{outlet}} requires an owner', owner));
        (false && !(scope) && (0, _debug.assert)('Expected dynamic scope to be present. You may have attempted to use the {{outlet}} keyword dynamically. This keyword cannot be used dynamically.', scope));
        var outletRef = (0, _reference.createComputeRef)(() => {
            var state = (0, _reference.valueForRef)(scope.get('outletState'));
            var outlets = state !== undefined ? state.outlets : undefined;
            return outlets !== undefined ? outlets['main'] : undefined;
        });
        var lastState = null;
        var definition = null;
        return (0, _reference.createComputeRef)(() => {
            var outletState = (0, _reference.valueForRef)(outletRef);
            var state = stateFor(outletRef, outletState);
            if (!validate(state, lastState)) {
                lastState = state;
                if (state !== null) {
                    var named = (0, _util.dict)();
                    // Create a ref for the model
                    var modelRef = (0, _reference.childRefFromParts)(outletRef, ['render', 'model']);
                    // Store the value of the model
                    var model = (0, _reference.valueForRef)(modelRef);
                    // Create a compute ref which we pass in as the `{{@model}}` reference
                    // for the outlet. This ref will update and return the value of the
                    // model _until_ the outlet itself changes. Once the outlet changes,
                    // dynamic scope also changes, and so the original model ref would not
                    // provide the correct updated value. So we stop updating and return
                    // the _last_ model value for that outlet.
                    named['model'] = (0, _reference.createComputeRef)(() => {
                        if (lastState === state) {
                            model = (0, _reference.valueForRef)(modelRef);
                        }
                        return model;
                    });
                    if (false /* DEBUG */ ) {
                        named['model'] = (0, _reference.createDebugAliasRef)('@model', named['model']);
                    }
                    var args = (0, _runtime2.createCapturedArgs)(named, _runtime2.EMPTY_POSITIONAL);
                    definition = (0, _runtime2.curry)(0 /* CurriedType.Component */ , new OutletComponentDefinition(state), outletState ? .render ? .owner ? ? owner, args, true);
                } else {
                    definition = null;
                }
            }
            return definition;
        });
    });

    function stateFor(ref, outlet) {
        if (outlet === undefined) return null;
        var render = outlet.render;
        if (render === undefined) return null;
        var template = render.template;
        if (template === undefined) return null;
        // this guard can be removed once @ember/test-helpers@1.6.0 has "aged out"
        // and is no longer considered supported
        if (isTemplateFactory(template)) {
            template = template(render.owner);
            if (false /* DEBUG */ ) {
                var message = 'The `template` property of `OutletState` should be a ' + '`Template` rather than a `TemplateFactory`. This is known to be a ' + "problem in older versions of `@ember/test-helpers`. If you haven't " + 'done so already, try upgrading to the latest version.\n\n';
                if (template.result === 'ok' && typeof template.moduleName === 'string') {
                    message += 'The offending template has a moduleName `' + template.moduleName + '`, which might be helpful for identifying ' + 'source of this issue.\n\n';
                }
                message += 'Please note that `OutletState` is a private API in Ember.js ' + "and not meant to be used outside of the framework's internal code.";
                (true && !(false) && (0, _debug.deprecate)(message, false, {
                    id: 'outlet-state-template-factory',
                    until: '5.9.0',
                    for: 'ember-source',
                    since: {
                        available: '5.5.0',
                        enabled: '5.5.0'
                    }
                }));
            }
        }
        return {
            ref,
            name: render.name,
            outlet: render.outlet,
            template,
            controller: render.controller,
            model: render.model
        };
    }

    function validate(state, lastState) {
        if (state === null) {
            return lastState === null;
        }
        if (lastState === null) {
            return false;
        }
        return state.template === lastState.template && state.controller === lastState.controller;
    }

    function instrumentationPayload$1(name) {
        return {
            object: `component:${name}`
        };
    }

    function componentFor(name, owner) {
        var fullName = `component:${name}`;
        return owner.factoryFor(fullName) || null;
    }

    function layoutFor(name, owner, options) {
        var templateFullName = `template:components/${name}`;
        return owner.lookup(templateFullName, options) || null;
    }

    function lookupComponentPair(owner, name, options) {
        var component = componentFor(name, owner);
        if ((0, _owner2.isFactory)(component) && component.class) {
            var _layout = (0, _manager2.getComponentTemplate)(component.class);
            if (_layout !== undefined) {
                return {
                    component,
                    layout: _layout
                };
            }
        }
        var layout = layoutFor(name, owner, options);
        if (component === null && layout === null) {
            return null;
        } else {
            return {
                component,
                layout
            };
        }
    }
    var BUILTIN_KEYWORD_HELPERS = {
        action,
        mut,
        readonly,
        unbound,
        '-hash': _runtime2.hash,
        '-each-in': eachIn,
        '-normalize-class': normalizeClassHelper,
        '-resolve': resolve,
        '-track-array': trackArray,
        '-mount': mountHelper,
        '-outlet': outletHelper,
        '-in-el-null': inElementNullCheckHelper
    };
    var BUILTIN_HELPERS = {
        ...BUILTIN_KEYWORD_HELPERS,
        array: _runtime2.array,
        concat: _runtime2.concat,
        fn: _runtime2.fn,
        get: _runtime2.get,
        hash: _runtime2.hash,
        'unique-id': uniqueId
    };
    if (false /* DEBUG */ ) {
        BUILTIN_HELPERS['-disallow-dynamic-resolution'] = disallowDynamicResolution;
    } else {
        // Bug: this may be a quirk of our test setup?
        // In prod builds, this is a no-op helper and is unused in practice. We shouldn't need
        // to add it at all, but the current test build doesn't produce a "prod compiler", so
        // we ended up running the debug-build for the template compliler in prod tests. Once
        // that is fixed, this can be removed. For now, this allows the test to work and does
        // not really harm anything, since it's just a no-op pass-through helper and the bytes
        // has to be included anyway. In the future, perhaps we can avoid the latter by using
        // `import(...)`?
        BUILTIN_HELPERS['-disallow-dynamic-resolution'] = disallowDynamicResolution;
    }
    var BUILTIN_KEYWORD_MODIFIERS = {
        action: actionModifier
    };
    var BUILTIN_MODIFIERS = {
        ...BUILTIN_KEYWORD_MODIFIERS,
        on: _runtime2.on
    };
    var CLASSIC_HELPER_MANAGER_ASSOCIATED = new _util._WeakSet();
    class ResolverImpl {
        constructor() {
            this.componentDefinitionCache = new Map();
        }
        lookupPartial() {
            return null;
        }
        lookupHelper(name, owner) {
            (false && !(!(BUILTIN_HELPERS[name] && owner.hasRegistration(`helper:${name}`))) && (0, _debug.assert)(`You attempted to overwrite the built-in helper "${name}" which is not allowed. Please rename the helper.`, !(BUILTIN_HELPERS[name] && owner.hasRegistration(`helper:${name}`))));
            var helper = BUILTIN_HELPERS[name];
            if (helper !== undefined) {
                return helper;
            }
            var factory = owner.factoryFor(`helper:${name}`);
            if (factory === undefined) {
                return null;
            }
            var definition = factory.class;
            if (definition === undefined) {
                return null;
            }
            if (typeof definition === 'function' && isClassicHelper(definition)) {
                // For classic class based helpers, we need to pass the factoryFor result itself rather
                // than the raw value (`factoryFor(...).class`). This is because injections are already
                // bound in the factoryFor result, including type-based injections
                if (false /* DEBUG */ ) {
                    // In DEBUG we need to only set the associated value once, otherwise
                    // we'll trigger an assertion
                    if (!CLASSIC_HELPER_MANAGER_ASSOCIATED.has(factory)) {
                        CLASSIC_HELPER_MANAGER_ASSOCIATED.add(factory);
                        (0, _manager2.setInternalHelperManager)(CLASSIC_HELPER_MANAGER, factory);
                    }
                } else {
                    (0, _manager2.setInternalHelperManager)(CLASSIC_HELPER_MANAGER, factory);
                }
                return factory;
            }
            return definition;
        }
        lookupBuiltInHelper(name) {
            return BUILTIN_KEYWORD_HELPERS[name] ? ? null;
        }
        lookupModifier(name, owner) {
            var builtin = BUILTIN_MODIFIERS[name];
            if (builtin !== undefined) {
                return builtin;
            }
            var modifier = owner.factoryFor(`modifier:${name}`);
            if (modifier === undefined) {
                return null;
            }
            return modifier.class || null;
        }
        lookupBuiltInModifier(name) {
            return BUILTIN_KEYWORD_MODIFIERS[name] ? ? null;
        }
        lookupComponent(name, owner) {
            var pair = lookupComponentPair(owner, name);
            if (pair === null) {
                (false && !(name !== 'text-area') && (0, _debug.assert)('Could not find component `<TextArea />` (did you mean `<Textarea />`?)', name !== 'text-area'));
                return null;
            }
            var template = null;
            var key;
            if (pair.component === null) {
                key = template = pair.layout(owner);
            } else {
                key = pair.component;
            }
            var cachedComponentDefinition = this.componentDefinitionCache.get(key);
            if (cachedComponentDefinition !== undefined) {
                return cachedComponentDefinition;
            }
            if (template === null && pair.layout !== null) {
                template = pair.layout(owner);
            }
            var finalizer = (0, _instrumentation._instrumentStart)('render.getComponentDefinition', instrumentationPayload$1, name);
            var definition = null;
            if (pair.component === null) {
                if (_environment2.ENV._TEMPLATE_ONLY_GLIMMER_COMPONENTS) {
                    definition = {
                        state: (0, _runtime2.templateOnlyComponent)(undefined, name),
                        manager: _runtime2.TEMPLATE_ONLY_COMPONENT_MANAGER,
                        template
                    };
                } else {
                    var factory = owner.factoryFor((0, _container.privatize)
                        `component:-default`);
                    var manager = (0, _manager2.getInternalComponentManager)(factory.class);
                    definition = {
                        state: factory,
                        manager,
                        template
                    };
                }
            } else {
                var _factory2 = pair.component;
                (false && !(_factory2.class !== undefined) && (0, _debug.assert)(`missing component class ${name}`, _factory2.class !== undefined));
                var ComponentClass = _factory2.class;
                var _manager = (0, _manager2.getInternalComponentManager)(ComponentClass);
                definition = {
                    state: isCurlyManager(_manager) ? _factory2 : ComponentClass,
                    manager: _manager,
                    template
                };
            }
            finalizer();
            this.componentDefinitionCache.set(key, definition);
            (false && !(!(definition === null && name === 'text-area')) && (0, _debug.assert)('Could not find component `<TextArea />` (did you mean `<Textarea />`?)', !(definition === null && name === 'text-area')));
            return definition;
        }
    }

    // We use the `InternalOwner` notion here because we actually need all of its
    var TOP_LEVEL_NAME = '-top-level';
    var TOP_LEVEL_OUTLET = 'main';
    class OutletView {
        static extend(injections) {
            return class extends OutletView {
                static create(options) {
                    if (options) {
                        return super.create(Object.assign({}, injections, options));
                    } else {
                        return super.create(injections);
                    }
                }
            };
        }
        static reopenClass(injections) {
            Object.assign(this, injections);
        }
        static create(options) {
            var {
                environment: _environment,
                application: namespace,
                template: templateFactory
            } = options;
            var owner = (0, _owner2.getOwner)(options);
            (false && !(owner) && (0, _debug.assert)('OutletView is unexpectedly missing an owner', owner));
            var template = templateFactory(owner);
            return new OutletView(_environment, owner, template, namespace);
        }
        constructor(_environment, owner, template, namespace) {
            this._environment = _environment;
            this.owner = owner;
            this.template = template;
            this.namespace = namespace;
            var outletStateTag = (0, _validator.createTag)();
            var outletState = {
                outlets: {
                    main: undefined
                },
                render: {
                    owner: owner,
                    into: undefined,
                    outlet: TOP_LEVEL_OUTLET,
                    name: TOP_LEVEL_NAME,
                    controller: undefined,
                    model: undefined,
                    template
                }
            };
            var ref = this.ref = (0, _reference.createComputeRef)(() => {
                (0, _validator.consumeTag)(outletStateTag);
                return outletState;
            }, state => {
                (0, _validator.dirtyTag)(outletStateTag);
                outletState.outlets['main'] = state;
            });
            this.state = {
                ref,
                name: TOP_LEVEL_NAME,
                outlet: TOP_LEVEL_OUTLET,
                template,
                controller: undefined,
                model: undefined
            };
        }
        appendTo(selector) {
            var target;
            if (this._environment.hasDOM) {
                target = typeof selector === 'string' ? document.querySelector(selector) : selector;
            } else {
                target = selector;
            }
            var renderer = this.owner.lookup('renderer:-dom');
            // SAFETY: It's not clear that this cast is safe.
            // The types for appendOutletView may be incorrect or this is a potential bug.
            (0, _runloop.schedule)('render', renderer, 'appendOutletView', this, target);
        }
        rerender() {
            /**/
        }
        setOutletState(state) {
            (0, _reference.updateRef)(this.ref, state);
        }
        destroy() {
            /**/
        }
    }
    _exports.OutletView = OutletView;
    class DynamicScope {
        constructor(view, outletState) {
            this.view = view;
            this.outletState = outletState;
        }
        child() {
            return new DynamicScope(this.view, this.outletState);
        }
        get(key) {
            (false && !(key === 'outletState') && (0, _debug.assert)(`Using \`-get-dynamic-scope\` is only supported for \`outletState\` (you used \`${key}\`).`, key === 'outletState'));
            return this.outletState;
        }
        set(key, value) {
            (false && !(key === 'outletState') && (0, _debug.assert)(`Using \`-with-dynamic-scope\` is only supported for \`outletState\` (you used \`${key}\`).`, key === 'outletState'));
            this.outletState = value;
            return value;
        }
    }
    var NO_OP = () => {};
    // This wrapper logic prevents us from rerendering in case of a hard failure
    // during render. This prevents infinite revalidation type loops from occuring,
    // and ensures that errors are not swallowed by subsequent follow on failures.
    function errorLoopTransaction(fn) {
        if (false /* DEBUG */ ) {
            return () => {
                var didError = true;
                try {
                    fn();
                    didError = false;
                } finally {
                    if (didError) {
                        // Noop the function so that we won't keep calling it and causing
                        // infinite looping failures;
                        fn = () => {
                            // eslint-disable-next-line no-console
                            console.warn('Attempted to rerender, but the Ember application has had an unrecoverable error occur during render. You should reload the application after fixing the cause of the error.');
                        };
                    }
                }
            };
        } else {
            return fn;
        }
    }
    class RootState {
        constructor(root, runtime, context, owner, template, self, parentElement, dynamicScope, builder) {
            this.root = root;
            this.runtime = runtime;
            (false && !(template !== undefined) && (0, _debug.assert)(`You cannot render \`${(0, _reference.valueForRef)(self)}\` without a template.`, template !== undefined));
            this.id = root instanceof OutletView ? (0, _utils.guidFor)(root) : (0, _views.getViewId)(root);
            this.result = undefined;
            this.destroyed = false;
            this.render = errorLoopTransaction(() => {
                var layout = (0, _util.unwrapTemplate)(template).asLayout();
                var iterator = (0, _runtime2.renderMain)(runtime, context, owner, self, builder(runtime.env, {
                    element: parentElement,
                    nextSibling: null
                }), layout, dynamicScope);
                var result = this.result = iterator.sync();
                // override .render function after initial render
                this.render = errorLoopTransaction(() => result.rerender({
                    alwaysRevalidate: false
                }));
            });
        }
        isFor(possibleRoot) {
            return this.root === possibleRoot;
        }
        destroy() {
            var {
                result,
                runtime: {
                    env
                }
            } = this;
            this.destroyed = true;
            this.runtime = undefined;
            this.root = null;
            this.result = undefined;
            this.render = undefined;
            if (result !== undefined) {
                /*
                 Handles these scenarios:
                        * When roots are removed during standard rendering process, a transaction exists already
                   `.begin()` / `.commit()` are not needed.
                 * When roots are being destroyed manually (`component.append(); component.destroy() case), no
                   transaction exists already.
                 * When roots are being destroyed during `Renderer#destroy`, no transaction exists
                        */
                (0, _runtime2.inTransaction)(env, () => (0, _destroyable.destroy)(result));
            }
        }
    }
    var renderers = [];

    function _resetRenderers() {
        renderers.length = 0;
    }

    function register(renderer) {
        (false && !(renderers.indexOf(renderer) === -1) && (0, _debug.assert)('Cannot register the same renderer twice', renderers.indexOf(renderer) === -1));
        renderers.push(renderer);
    }

    function deregister(renderer) {
        var index = renderers.indexOf(renderer);
        (false && !(index !== -1) && (0, _debug.assert)('Cannot deregister unknown unregistered renderer', index !== -1));
        renderers.splice(index, 1);
    }

    function loopBegin() {
        for (var renderer of renderers) {
            renderer._scheduleRevalidate();
        }
    }
    var renderSettledDeferred = null;
    /*
      Returns a promise which will resolve when rendering has settled. Settled in
      this context is defined as when all of the tags in use are "current" (e.g.
      `renderers.every(r => r._isValid())`). When this is checked at the _end_ of
      the run loop, this essentially guarantees that all rendering is completed.
  
      @method renderSettled
      @returns {Promise<void>} a promise which fulfills when rendering has settled
    */
    function renderSettled() {
        if (renderSettledDeferred === null) {
            renderSettledDeferred = _rsvp.default.defer();
            // if there is no current runloop, the promise created above will not have
            // a chance to resolve (because its resolved in backburner's "end" event)
            if (!(0, _runloop._getCurrentRunLoop)()) {
                // ensure a runloop has been kicked off
                _runloop._backburner.schedule('actions', null, NO_OP);
            }
        }
        return renderSettledDeferred.promise;
    }

    function resolveRenderPromise() {
        if (renderSettledDeferred !== null) {
            var _resolve = renderSettledDeferred.resolve;
            renderSettledDeferred = null;
            _runloop._backburner.join(null, _resolve);
        }
    }
    var loops = 0;

    function loopEnd() {
        for (var renderer of renderers) {
            if (!renderer._isValid()) {
                if (loops > _environment2.ENV._RERENDER_LOOP_LIMIT) {
                    loops = 0;
                    // TODO: do something better
                    renderer.destroy();
                    throw new Error('infinite rendering invalidation detected');
                }
                loops++;
                return _runloop._backburner.join(null, NO_OP);
            }
        }
        loops = 0;
        resolveRenderPromise();
    }
    _runloop._backburner.on('begin', loopBegin);
    _runloop._backburner.on('end', loopEnd);
    class Renderer {
        static create(props) {
            var {
                _viewRegistry
            } = props;
            var owner = (0, _owner2.getOwner)(props);
            (false && !(owner) && (0, _debug.assert)('Renderer is unexpectedly missing an owner', owner));
            var document = owner.lookup('service:-document');
            var env = owner.lookup('-environment:main');
            var rootTemplate = owner.lookup((0, _container.privatize)
                `template:-root`);
            var builder = owner.lookup('service:-dom-builder');
            return new this(owner, document, env, rootTemplate, _viewRegistry, builder);
        }
        constructor(owner, document, env, rootTemplate, viewRegistry, builder) {
            if (builder === void 0) {
                builder = _runtime2.clientBuilder;
            }
            this._inRenderTransaction = false;
            this._lastRevision = -1;
            this._destroyed = false;
            this._owner = owner;
            this._rootTemplate = rootTemplate(owner);
            this._viewRegistry = viewRegistry || owner.lookup('-view-registry:main');
            this._roots = [];
            this._removedRoots = [];
            this._builder = builder;
            this._isInteractive = env.isInteractive;
            // resolver is exposed for tests
            var resolver = this._runtimeResolver = new ResolverImpl();
            var sharedArtifacts = (0, _program.artifacts)();
            this._context = (0, _opcodeCompiler.programCompilationContext)(sharedArtifacts, resolver);
            var runtimeEnvironmentDelegate = new EmberEnvironmentDelegate(owner, env.isInteractive);
            this._runtime = (0, _runtime2.runtimeContext)({
                appendOperations: env.hasDOM ? new _runtime2.DOMTreeConstruction(document) : new _node.NodeDOMTreeConstruction(document),
                updateOperations: new _runtime2.DOMChanges(document)
            }, runtimeEnvironmentDelegate, sharedArtifacts, resolver);
        }
        get debugRenderTree() {
            var {
                debugRenderTree
            } = this._runtime.env;
            (false && !(debugRenderTree) && (0, _debug.assert)('Attempted to access the DebugRenderTree, but it did not exist. Is the Ember Inspector open?', debugRenderTree));
            return debugRenderTree;
        }
        // renderer HOOKS
        appendOutletView(view, target) {
            var definition = createRootOutlet(view);
            this._appendDefinition(view, (0, _runtime2.curry)(0 /* CurriedType.Component */ , definition, view.owner, null, true), target);
        }
        appendTo(view, target) {
            var definition = new RootComponentDefinition(view);
            this._appendDefinition(view, (0, _runtime2.curry)(0 /* CurriedType.Component */ , definition, this._owner, null, true), target);
        }
        _appendDefinition(root, definition, target) {
            var self = (0, _reference.createConstRef)(definition, 'this');
            var dynamicScope = new DynamicScope(null, _reference.UNDEFINED_REFERENCE);
            var rootState = new RootState(root, this._runtime, this._context, this._owner, this._rootTemplate, self, target, dynamicScope, this._builder);
            this._renderRoot(rootState);
        }
        rerender() {
            this._scheduleRevalidate();
        }
        register(view) {
            var id = (0, _views.getViewId)(view);
            (false && !(!this._viewRegistry[id]) && (0, _debug.assert)('Attempted to register a view with an id already in use: ' + id, !this._viewRegistry[id]));
            this._viewRegistry[id] = view;
        }
        unregister(view) {
            delete this._viewRegistry[(0, _views.getViewId)(view)];
        }
        remove(view) {
            view._transitionTo('destroying');
            this.cleanupRootFor(view);
            if (this._isInteractive) {
                view.trigger('didDestroyElement');
            }
        }
        cleanupRootFor(view) {
            // no need to cleanup roots if we have already been destroyed
            if (this._destroyed) {
                return;
            }
            var roots = this._roots;
            // traverse in reverse so we can remove items
            // without mucking up the index
            var i = this._roots.length;
            while (i--) {
                var root = roots[i];
                (false && !(root) && (0, _debug.assert)('has root', root));
                if (root.isFor(view)) {
                    root.destroy();
                    roots.splice(i, 1);
                }
            }
        }
        destroy() {
            if (this._destroyed) {
                return;
            }
            this._destroyed = true;
            this._clearAllRoots();
        }
        getElement(view) {
            if (this._isInteractive) {
                return (0, _views.getViewElement)(view);
            } else {
                throw new Error('Accessing `this.element` is not allowed in non-interactive environments (such as FastBoot).');
            }
        }
        getBounds(view) {
            var bounds = view[BOUNDS];
            (false && !(bounds) && (0, _debug.assert)('object passed to getBounds must have the BOUNDS symbol as a property', bounds));
            var parentElement = bounds.parentElement();
            var firstNode = bounds.firstNode();
            var lastNode = bounds.lastNode();
            return {
                parentElement,
                firstNode,
                lastNode
            };
        }
        createElement(tagName) {
            return this._runtime.env.getAppendOperations().createElement(tagName);
        }
        _renderRoot(root) {
            var {
                _roots: roots
            } = this;
            roots.push(root);
            if (roots.length === 1) {
                register(this);
            }
            this._renderRootsTransaction();
        }
        _renderRoots() {
            var {
                _roots: roots,
                _runtime: runtime,
                _removedRoots: removedRoots
            } = this;
            var initialRootsLength;
            do {
                initialRootsLength = roots.length;
                (0, _runtime2.inTransaction)(runtime.env, () => {
                    // ensure that for the first iteration of the loop
                    // each root is processed
                    for (var i = 0; i < roots.length; i++) {
                        var root = roots[i];
                        (false && !(root) && (0, _debug.assert)('has root', root));
                        if (root.destroyed) {
                            // add to the list of roots to be removed
                            // they will be removed from `this._roots` later
                            removedRoots.push(root);
                            // skip over roots that have been marked as destroyed
                            continue;
                        }
                        // when processing non-initial reflush loops,
                        // do not process more roots than needed
                        if (i >= initialRootsLength) {
                            continue;
                        }
                        root.render();
                    }
                    this._lastRevision = (0, _validator.valueForTag)(_validator.CURRENT_TAG);
                });
            } while (roots.length > initialRootsLength);
            // remove any roots that were destroyed during this transaction
            while (removedRoots.length) {
                var root = removedRoots.pop();
                var rootIndex = roots.indexOf(root);
                roots.splice(rootIndex, 1);
            }
            if (this._roots.length === 0) {
                deregister(this);
            }
        }
        _renderRootsTransaction() {
            if (this._inRenderTransaction) {
                // currently rendering roots, a new root was added and will
                // be processed by the existing _renderRoots invocation
                return;
            }
            // used to prevent calling _renderRoots again (see above)
            // while we are actively rendering roots
            this._inRenderTransaction = true;
            var completedWithoutError = false;
            try {
                this._renderRoots();
                completedWithoutError = true;
            } finally {
                if (!completedWithoutError) {
                    this._lastRevision = (0, _validator.valueForTag)(_validator.CURRENT_TAG);
                }
                this._inRenderTransaction = false;
            }
        }
        _clearAllRoots() {
            var roots = this._roots;
            for (var root of roots) {
                root.destroy();
            }
            this._removedRoots.length = 0;
            this._roots = [];
            // if roots were present before destroying
            // deregister this renderer instance
            if (roots.length) {
                deregister(this);
            }
        }
        _scheduleRevalidate() {
            _runloop._backburner.scheduleOnce('render', this, this._revalidate);
        }
        _isValid() {
            return this._destroyed || this._roots.length === 0 || (0, _validator.validateTag)(_validator.CURRENT_TAG, this._lastRevision);
        }
        _revalidate() {
            if (this._isValid()) {
                return;
            }
            this._renderRootsTransaction();
        }
    }
    _exports.Renderer = Renderer;
    var TEMPLATES = {};

    function setTemplates(templates) {
        TEMPLATES = templates;
    }

    function getTemplates() {
        return TEMPLATES;
    }

    function getTemplate(name) {
        if (Object.prototype.hasOwnProperty.call(TEMPLATES, name)) {
            return TEMPLATES[name];
        }
    }

    function hasTemplate(name) {
        return Object.prototype.hasOwnProperty.call(TEMPLATES, name);
    }

    function setTemplate(name, template) {
        return TEMPLATES[name] = template;
    }
    var OutletTemplate = (0, _opcodeCompiler.templateFactory)({
        "id": "3jT+eJpe",
        "block": "[[[46,[28,[37,1],null,null],null,null,null]],[],false,[\"component\",\"-outlet\"]]",
        "moduleName": "packages/@ember/-internals/glimmer/lib/templates/outlet.hbs",
        "isStrictMode": false
    });

    function setupApplicationRegistry(registry) {
        // because we are using injections we can't use instantiate false
        // we need to use bind() to copy the function so factory for
        // association won't leak
        registry.register('service:-dom-builder', {
            // Additionally, we *must* constrain this to require `props` on create, else
            // we *know* it cannot have an owner.
            create(props) {
                var owner = (0, _owner2.getOwner)(props);
                (false && !(owner) && (0, _debug.assert)('DomBuilderService is unexpectedly missing an owner', owner));
                var env = owner.lookup('-environment:main');
                switch (env._renderMode) {
                    case 'serialize':
                        return _node.serializeBuilder.bind(null);
                    case 'rehydrate':
                        return _runtime2.rehydrationBuilder.bind(null);
                    default:
                        return _runtime2.clientBuilder.bind(null);
                }
            }
        });
        registry.register((0, _container.privatize)
            `template:-root`, RootTemplate);
        registry.register('renderer:-dom', Renderer);
    }

    function setupEngineRegistry(registry) {
        registry.optionsForType('template', {
            instantiate: false
        });
        registry.register('view:-outlet', OutletView);
        registry.register('template:-outlet', OutletTemplate);
        registry.optionsForType('helper', {
            instantiate: false
        });
        registry.register('component:input', Input);
        registry.register('component:link-to', LinkTo);
        registry.register('component:textarea', Textarea);
        if (!_environment2.ENV._TEMPLATE_ONLY_GLIMMER_COMPONENTS) {
            registry.register((0, _container.privatize)
                `component:-default`, Component);
        }
    }

    /**
       Associate a class with a component manager (an object that is responsible for
       coordinating the lifecycle events that occurs when invoking, rendering and
       re-rendering a component).
  
       @method setComponentManager
       @param {Function} factory a function to create the owner for an object
       @param {Object} obj the object to associate with the componetn manager
       @return {Object} the same object passed in
       @public
      */
    function setComponentManager(manager, obj) {
        return (0, _manager2.setComponentManager)(manager, obj);
    }
    var componentCapabilities = _exports.componentCapabilities = _manager2.componentCapabilities;
    var modifierCapabilities = _exports.modifierCapabilities = _manager2.modifierCapabilities;
});