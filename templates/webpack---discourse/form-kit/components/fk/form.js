import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    tracked
} from "@glimmer/tracking";
import {
    array,
    hash
} from "@ember/helper";
import {
    on
} from "@ember/modifier";
import {
    action
} from "@ember/object";
import {
    service
} from "@ember/service";
import DButton from "discourse/components/d-button";
import FKAlert from "discourse/form-kit/components/fk/alert";
import FKCheckboxGroup from "discourse/form-kit/components/fk/checkbox-group";
import FKCollection from "discourse/form-kit/components/fk/collection";
import FKContainer from "discourse/form-kit/components/fk/container";
import FKControlConditionalContent from "discourse/form-kit/components/fk/control/conditional-content";
import FKErrorsSummary from "discourse/form-kit/components/fk/errors-summary";
import FKField from "discourse/form-kit/components/fk/field";
import FKFieldset from "discourse/form-kit/components/fk/fieldset";
import FKInputGroup from "discourse/form-kit/components/fk/input-group";
import Row from "discourse/form-kit/components/fk/row";
import FKSection from "discourse/form-kit/components/fk/section";
import FKSubmit from "discourse/form-kit/components/fk/submit";
import {
    VALIDATION_TYPES
} from "discourse/form-kit/lib/constants";
import FKFieldData from "discourse/form-kit/lib/fk-field-data";
import FKFormData from "discourse/form-kit/lib/fk-form-data";
import I18n from "discourse-i18n";
let FKForm = class FKForm extends Component {
    @service
    dialog;
    @service
    router;
    @tracked
    isValidating = false;
    @tracked
    isSubmitting = false;
    fields = new Map();
    formData = new FKFormData(this.args.data ? ? {});
    constructor() {
        super(...arguments);
        this.args.onRegisterApi ? .({
            set: this.set,
            setProperties: this.setProperties,
            submit: this.onSubmit,
            reset: this.onReset,
            addError: this.addError,
            removeError: this.removeError
        });
        this.router.on("routeWillChange", this.checkIsDirty);
    }
    willDestroy() {
        super.willDestroy();
        this.router.off("routeWillChange", this.checkIsDirty);
    }
    @action
    async checkIsDirty(transition1) {
        if (this.formData.isDirty && !transition1.isAborted && !transition1.queryParamsOnly) {
            transition1.abort();
            this.dialog.yesNoConfirm({
                message: I18n.t("form_kit.dirty_form"),
                didConfirm: async () => {
                    await this.onReset();
                    transition1.retry();
                }
            });
        }
    }
    get validateOn() {
        return this.args.validateOn ? ? VALIDATION_TYPES.submit;
    }
    get fieldValidationEvent() {
        const {
            validateOn: validateOn1
        } = this;
        if (validateOn1 === VALIDATION_TYPES.submit) {
            return undefined;
        }
        return validateOn1;
    }
    @action
    addError(name1, {
        title: title1,
        message: message1
    }) {
        this.formData.addError(name1, {
            title: title1,
            message: message1
        });
    }
    @action
    removeError(name1) {
        this.formData.removeError(name1);
    }
    @action
    async addItemToCollection(name1, value1 = {}) {
        const current1 = this.formData.get(name1) ? ? [];
        this.formData.set(name1, current1.concat(value1));
    }
    @action
    async remove(name1, index1) {
        const current1 = this.formData.get(name1) ? ? [];
        this.formData.set(name1, current1.filter((_1, i1) => i1 !== index1));
        Object.keys(this.formData.errors).forEach((key1) => {
            if (key1.startsWith(`${name1}.${index1}.`)) {
                this.formData.removeError(key1);
            }
        });
    }
    @action
    async set(name1, value1) {
        this.formData.set(name1, value1);
        if (this.fieldValidationEvent === VALIDATION_TYPES.change) {
            await this.triggerRevalidationFor(name1);
        }
    }
    @action
    async setProperties(object1) {
        for (const [name1, value1] of Object.entries(object1)) {
            await this.set(name1, value1);
        }
    }
    @action
    registerField(name1, field1) {
        if (!name1) {
            throw new Error("@name is required on `<form.Field />`.");
        }
        if (this.fields.has(name1)) {
            throw new Error(`@name="${name1}", is already in use. Names of \`<form.Field />\` must be unique!`);
        }
        const fieldModel1 = new FKFieldData(name1, field1);
        this.fields.set(name1, fieldModel1);
        return fieldModel1;
    }
    @action
    unregisterField(name1) {
        this.fields.delete(name1);
    }
    @action
    async onSubmit(event1) {
        event1 ? .preventDefault();
        if (this.isSubmitting) {
            return;
        }
        try {
            this.isSubmitting = true;
            await this.validate(this.fields.values());
            if (this.formData.isValid) {
                this.formData.save();
                await this.args.onSubmit ? .(this.formData.draftData);
            }
        } finally {
            this.isSubmitting = false;
        }
    }
    @action
    async onReset(event1) {
        event1 ? .preventDefault();
        this.formData.removeErrors();
        await this.formData.rollback();
        await this.args.onReset ? .(this.formData.draftData);
    }
    @action
    async triggerRevalidationFor(name1) {
        const field1 = this.fields.get(name1);
        if (!field1) {
            return;
        }
        if (this.formData.errors[name1]) {
            await this.validate([
                field1
            ]);
        }
    }
    async validate(fields1) {
        if (this.isValidating) {
            return;
        }
        this.isValidating = true;
        try {
            for (const field1 of fields1) {
                this.formData.removeError(field1.name);
                await field1.validate ? .(field1.name, this.formData.get(field1.name), this.formData.draftData);
            }
            await this.args.validate ? .(this.formData.draftData, {
                addError: this.addError,
                removeError: this.removeError
            });
        } finally {
            this.isValidating = false;
        }
    }
    static {
        template(`
    <form
      novalidate
      class="form-kit"
      ...attributes
      {{on "submit" this.onSubmit}}
      {{on "reset" this.onReset}}
    >
      <FKErrorsSummary @errors={{this.formData.errors}} />

      {{yield
        (hash
          Row=Row
          Section=FKSection
          Fieldset=FKFieldset
          ConditionalContent=(component FKControlConditionalContent)
          Container=FKContainer
          Actions=(component FKSection class="form-kit__actions")
          Button=(component DButton class="form-kit__button")
          Alert=FKAlert
          Submit=(component
            FKSubmit
            action=this.onSubmit
            forwardEvent=true
            class="btn-primary form-kit__button"
            type="submit"
            isLoading=this.isSubmitting
          )
          Reset=(component
            DButton
            action=this.onReset
            forwardEvent=true
            class="form-kit__button"
            label="form_kit.reset"
          )
          Field=(component
            FKField
            errors=this.formData.errors
            addError=this.addError
            data=this.formData
            set=this.set
            registerField=this.registerField
            unregisterField=this.unregisterField
            triggerRevalidationFor=this.triggerRevalidationFor
          )
          Collection=(component
            FKCollection
            errors=this.formData.errors
            addError=this.addError
            data=this.formData
            set=this.set
            remove=this.remove
            registerField=this.registerField
            unregisterField=this.unregisterField
            triggerRevalidationFor=this.triggerRevalidationFor
          )
          InputGroup=(component
            FKInputGroup
            errors=this.formData.errors
            addError=this.addError
            data=this.formData
            set=this.set
            remove=this.remove
            registerField=this.registerField
            unregisterField=this.unregisterField
            triggerRevalidationFor=this.triggerRevalidationFor
          )
          CheckboxGroup=(component
            FKCheckboxGroup
            errors=this.formData.errors
            addError=this.addError
            data=this.formData
            set=this.set
            remove=this.remove
            registerField=this.registerField
            unregisterField=this.unregisterField
            triggerRevalidationFor=this.triggerRevalidationFor
          )
          set=this.set
          setProperties=this.setProperties
          addItemToCollection=this.addItemToCollection
        )
        this.formData.draftData
      }}
    </form>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
};
const Form = template(`
  {{#each (array @data) as |data|}}
    <FKForm
      @data={{data}}
      @onSubmit={{@onSubmit}}
      @validate={{@validate}}
      @validateOn={{@validateOn}}
      @onRegisterApi={{@onRegisterApi}}
      @onReset={{@onReset}}
      ...attributes
      as |components draftData|
    >
      {{yield components draftData}}
    </FKForm>
  {{/each}}
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default Form;