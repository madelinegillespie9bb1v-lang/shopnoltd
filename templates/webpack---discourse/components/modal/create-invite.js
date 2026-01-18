import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    cached,
    tracked
} from "@glimmer/tracking";
import {
    fn,
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
import {
    htmlSafe
} from "@ember/template";
import {
    and,
    notEq,
    or
} from "truth-helpers";
import CopyButton from "discourse/components/copy-button";
import DButton from "discourse/components/d-button";
import DModal from "discourse/components/d-modal";
import Form from "discourse/components/form";
import FutureDateInput from "discourse/components/future-date-input";
import {
    extractError
} from "discourse/lib/ajax-error";
import {
    canNativeShare,
    nativeShare
} from "discourse/lib/pwa-utils";
import {
    sanitize
} from "discourse/lib/text";
import {
    emailValid,
    hostnameValid
} from "discourse/lib/utilities";
import Group from "discourse/models/group";
import Invite from "discourse/models/invite";
import i18n from "discourse-common/helpers/i18n";
import I18n from "discourse-i18n";
import {
    FORMAT as DATE_INPUT_FORMAT
} from "select-kit/components/future-date-input-selector";
import GroupChooser from "select-kit/components/group-chooser";
import TopicChooser from "select-kit/components/topic-chooser";
export default class CreateInvite extends Component {
    @service
    capabilities;
    @service
    currentUser;
    @service
    siteSettings;
    @service
    site;
    @tracked
    saving = false;
    @tracked
    displayAdvancedOptions = false;
    @tracked
    flashText;
    @tracked
    flashClass = "info";
    @tracked
    topics = this.invite.topics ? ? this.model.topics ? ? [];
    @tracked
    allGroups;
    model = this.args.model;
    invite = this.model.invite ? ? Invite.create();
    formApi;
    constructor() {
        super(...arguments);
        Group.findAll().then((groups1) => {
            this.allGroups = groups1.filter((group1) => !group1.automatic);
        });
    }
    get linkValidityMessageFormat() {
        return I18n.messageFormat("user.invited.invite.link_validity_MF", {
            user_count: this.defaultRedemptionsAllowed,
            duration_days: this.siteSettings.invite_expiry_days
        });
    }
    get expireAfterOptions() {
        let list1 = [
            1,
            7,
            30,
            90
        ];
        if (!list1.includes(this.siteSettings.invite_expiry_days)) {
            list1.push(this.siteSettings.invite_expiry_days);
        }
        list1 = list1.sort((a1, b1) => a1 - b1).map((days1) => {
            return {
                value: days1,
                text: I18n.t("dates.medium.x_days", {
                    count: days1
                })
            };
        });
        list1.push({
            value: 999999,
            text: I18n.t("time_shortcut.never")
        });
        return list1;
    }
    @cached
    get data() {
        const data1 = {
            restrictTo: this.invite.emailOrDomain ? ? "",
            maxRedemptions: this.invite.max_redemptions_allowed ? ? this.defaultRedemptionsAllowed,
            inviteToTopic: this.invite.topicId,
            inviteToGroups: this.model.groupIds ? ? this.invite.groupIds ? ? [],
            customMessage: this.invite.custom_message ? ? ""
        };
        if (this.inviteCreated) {
            data1.expiresAt = this.invite.expires_at;
        } else {
            data1.expiresAfterDays = this.siteSettings.invite_expiry_days;
        }
        return data1;
    }
    async save(data1) {
        let isLink1 = true;
        let isEmail1 = false;
        if (data1.emailOrDomain) {
            if (emailValid(data1.emailOrDomain)) {
                isEmail1 = true;
                isLink1 = false;
                data1.email = data1.emailOrDomain;
            } else if (hostnameValid(data1.emailOrDomain)) {
                data1.domain = data1.emailOrDomain;
            }
            delete data1.emailOrDomain;
        }
        if (isLink1) {
            if (this.invite.email) {
                data1.email = data1.custom_message = "";
            }
        } else if (isEmail1) {
            if (data1.max_redemptions_allowed > 1) {
                data1.max_redemptions_allowed = 1;
            }
            data1.send_email = true;
            if (data1.topic_id) {
                data1.invite_to_topic = true;
            }
        }
        this.saving = true;
        try {
            await this.invite.save(data1);
            const invites1 = this.model ? .invites;
            if (invites1 && !invites1.some((i1) => i1.id === this.invite.id)) {
                invites1.unshiftObject(this.invite);
            }
            if (!this.simpleMode) {
                this.flashText = sanitize(I18n.t("user.invited.invite.invite_saved"));
                this.flashClass = "success";
            }
        } catch (error1) {
            this.flashText = sanitize(extractError(error1));
            this.flashClass = "error";
        } finally {
            this.saving = false;
        }
    }
    get maxRedemptionsAllowedLimit() {
        if (this.currentUser.staff) {
            return this.siteSettings.invite_link_max_redemptions_limit;
        }
        return this.siteSettings.invite_link_max_redemptions_limit_users;
    }
    get defaultRedemptionsAllowed() {
        const max1 = this.maxRedemptionsAllowedLimit;
        const val1 = this.currentUser.staff ? 100 : 10;
        return Math.min(max1, val1);
    }
    get canInviteToGroup() {
        return (this.currentUser.staff || this.currentUser.groups.some((g1) => g1.group_user ? .owner));
    }
    get canArriveAtTopic() {
        return this.currentUser.staff && !this.siteSettings.must_approve_users;
    }
    @action
    async onFormSubmit(data1) {
        const submitData1 = {
            emailOrDomain: data1.restrictTo ? .trim(),
            group_ids: data1.inviteToGroups,
            topic_id: data1.inviteToTopic,
            max_redemptions_allowed: data1.maxRedemptions,
            custom_message: data1.customMessage
        };
        if (data1.expiresAt) {
            submitData1.expires_at = data1.expiresAt;
        } else if (data1.expiresAfterDays) {
            submitData1.expires_at = moment().add(data1.expiresAfterDays, "days").format(DATE_INPUT_FORMAT);
        }
        await this.save(submitData1);
    }
    @action
    saveInvite() {
        this.formApi.submit();
    }
    @action
    onChangeTopic(fieldSet1, topicId1, topic1) {
        this.topics = [
            topic1
        ];
        fieldSet1(topicId1);
    }
    @action
    showAdvancedMode() {
        this.displayAdvancedOptions = true;
    }
    get simpleMode() {
        return !this.args.model.editing && !this.displayAdvancedOptions;
    }
    get inviteCreated() {
        // use .get to track the id
        return !!this.invite.get("id");
    }
    @action
    async createLink() {
        await this.save({
            max_redemptions_allowed: this.defaultRedemptionsAllowed,
            expires_at: moment().add(this.siteSettings.invite_expiry_days, "days").format(DATE_INPUT_FORMAT)
        });
    }
    @action
    cancel() {
        this.args.closeModal();
    }
    @action
    registerApi(api1) {
        this.formApi = api1;
    }
    static {
        template(`
    <DModal
      class="create-invite-modal"
      @title={{i18n
        (if
          @model.editing
          "user.invited.invite.edit_title"
          "user.invited.invite.new_title"
        )
      }}
      @closeModal={{@closeModal}}
      @hideFooter={{and this.simpleMode this.inviteCreated}}
    >
      <:belowHeader>
        {{#if (or this.flashText @model.editing)}}
          <InviteModalAlert
            @invite={{this.invite}}
            @alertClass={{this.flashClass}}
            @showInviteLink={{and
              this.inviteCreated
              (notEq this.flashClass "error")
            }}
          >
            {{#if this.flashText}}
              {{htmlSafe this.flashText}}
            {{/if}}
            {{#if (and this.inviteCreated (notEq this.flashClass "error"))}}
              {{#if @model.editing}}
                {{i18n "user.invited.invite.copy_link_and_share_it"}}
              {{else}}
                {{i18n "user.invited.invite.instructions"}}
              {{/if}}
            {{/if}}
          </InviteModalAlert>
        {{/if}}
      </:belowHeader>
      <:body>
        {{#if this.simpleMode}}
          {{#if this.inviteCreated}}
            {{#unless this.site.mobileView}}
              <p>
                {{i18n "user.invited.invite.copy_link_and_share_it"}}
              </p>
            {{/unless}}
            <div class="link-share-container">
              <ShareOrCopyInviteLink @invite={{this.invite}} />
            </div>
          {{else}}
            <p>
              {{i18n "user.invited.invite.create_link_to_invite"}}
            </p>
          {{/if}}
          <p class="link-limits-info">
            {{this.linkValidityMessageFormat}}
            <a
              class="edit-link-options"
              role="button"
              {{on "click" this.showAdvancedMode}}
            >{{i18n "user.invited.invite.edit_link_options"}}</a>
          </p>
        {{else}}
          <Form
            @data={{this.data}}
            @onSubmit={{this.onFormSubmit}}
            @onRegisterApi={{this.registerApi}}
            as |form transientData|
          >
            <form.Field
              @name="restrictTo"
              @title={{i18n "user.invited.invite.restrict"}}
              @format="large"
              as |field|
            >
              <field.Input
                placeholder={{i18n
                  "user.invited.invite.email_or_domain_placeholder"
                }}
              />
            </form.Field>

            {{#unless (emailValid transientData.restrictTo)}}
              <form.Field
                @name="maxRedemptions"
                @title={{i18n "user.invited.invite.max_redemptions_allowed"}}
                @type="number"
                @format="small"
                @validation="required"
                as |field|
              >
                <field.Input
                  type="number"
                  min="1"
                  max={{this.maxRedemptionsAllowedLimit}}
                />
              </form.Field>
            {{/unless}}

            {{#if this.inviteCreated}}
              <form.Field
                @name="expiresAt"
                @title={{i18n "user.invited.invite.expires_at"}}
                @format="large"
                @validation="required"
                as |field|
              >
                <field.Custom>
                  <FutureDateInput
                    @clearable={{true}}
                    @input={{field.value}}
                    @noRelativeOptions={{true}}
                    @onChangeInput={{field.set}}
                  />
                </field.Custom>
              </form.Field>
            {{else}}
              <form.Field
                @name="expiresAfterDays"
                @title={{i18n "user.invited.invite.expires_after"}}
                @format="large"
                @validation="required"
                as |field|
              >
                <field.Select as |select|>
                  {{#each this.expireAfterOptions as |option|}}
                    <select.Option
                      @value={{option.value}}
                    >{{option.text}}</select.Option>
                  {{/each}}
                </field.Select>
              </form.Field>
            {{/if}}

            {{#if this.canArriveAtTopic}}
              <form.Field
                @name="inviteToTopic"
                @title={{i18n "user.invited.invite.invite_to_topic"}}
                @format="large"
                as |field|
              >
                <field.Custom>
                  <TopicChooser
                    @value={{field.value}}
                    @content={{this.topics}}
                    @onChange={{fn this.onChangeTopic field.set}}
                    @options={{hash additionalFilters="status:public"}}
                  />
                </field.Custom>
              </form.Field>
            {{/if}}

            {{#if this.canInviteToGroup}}
              <form.Field
                @name="inviteToGroups"
                @title={{i18n "user.invited.invite.add_to_groups"}}
                @format="large"
                as |field|
              >
                <field.Custom>
                  <GroupChooser
                    @content={{this.allGroups}}
                    @value={{field.value}}
                    @labelProperty="name"
                    @onChange={{field.set}}
                  />
                </field.Custom>
              </form.Field>
            {{/if}}

            {{#if (emailValid transientData.restrictTo)}}
              <form.Field
                @name="customMessage"
                @title={{i18n "user.invited.invite.custom_message"}}
                @format="full"
                as |field|
              >
                <field.Textarea
                  height={{100}}
                  placeholder={{i18n
                    "user.invited.invite.custom_message_placeholder"
                  }}
                />
              </form.Field>
            {{/if}}
          </Form>
        {{/if}}
      </:body>
      <:footer>
        {{#if this.simpleMode}}
          <DButton
            @label="user.invited.invite.create_link"
            @action={{this.createLink}}
            @disabled={{this.saving}}
            class="btn-primary save-invite"
          />
        {{else}}
          <DButton
            @label="user.invited.invite.save_invite"
            @action={{this.saveInvite}}
            @disabled={{this.saving}}
            class="btn-primary save-invite"
          />
        {{/if}}
        <DButton
          @label="user.invited.invite.cancel"
          @action={{this.cancel}}
          class="btn-transparent cancel-button"
        />
      </:footer>
    </DModal>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}
const InviteModalAlert = template(`
  <div id="modal-alert" role="alert" class="alert alert-{{@alertClass}}">
    <div class="input-group invite-link">
      <label for="invite-link">
        {{yield}}
      </label>
      {{#if @showInviteLink}}
        <div class="link-share-container">
          <ShareOrCopyInviteLink @invite={{@invite}} />
        </div>
      {{/if}}
    </div>
  </div>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
let ShareOrCopyInviteLink = class ShareOrCopyInviteLink extends Component {
    @service
    capabilities;
    @action
    async nativeShare() {
        await nativeShare(this.capabilities, {
            url: this.args.invite.link
        });
    }
    static {
        template(`
    <input
      name="invite-link"
      type="text"
      class="invite-link"
      value={{@invite.link}}
      readonly={{true}}
    />
    {{#if (canNativeShare this.capabilities)}}
      <DButton
        class="btn-primary"
        @icon="share"
        @translatedLabel={{i18n "user.invited.invite.share_link"}}
        @action={{this.nativeShare}}
      />
    {{else}}
      <CopyButton
        @selector="input.invite-link"
        @translatedLabel={{i18n "user.invited.invite.copy_link"}}
        @translatedLabelAfterCopy={{i18n "user.invited.invite.link_copied"}}
      />
    {{/if}}
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
};