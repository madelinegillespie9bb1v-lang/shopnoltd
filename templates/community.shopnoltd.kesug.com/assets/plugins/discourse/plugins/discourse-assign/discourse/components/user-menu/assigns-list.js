define("discourse/plugins/discourse-assign/discourse/components/user-menu/assigns-list", ["exports", "@ember/object", "@ember/object/computed", "discourse/components/user-menu/notifications-list", "I18n", "discourse/plugins/discourse-assign/discourse/components/user-menu/assigns-list-empty-state"], function(_exports, _object, _computed, _notificationsList, _I18n, _assignsListEmptyState) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class UserMenuAssignNotificationsList extends _notificationsList.default {
        get dismissTypes() {
            return this.filterByTypes;
        }
        get showDismiss() {
            return this._unreadAssignedNotificationsCount > 0;
        }
        get dismissTitle() {
            return _I18n.default.t("user.dismiss_assigned_tooltip");
        }
        get showAllHref() {
            return `${this.currentUser.path}/activity/assigned`;
        }
        get showAllTitle() {
            return _I18n.default.t("user_menu.view_all_assigned");
        }
        get itemsCacheKey() {
            return "user-menu-assigns-tab";
        }
        get emptyStateComponent() {
            return _assignsListEmptyState.default;
        }
        get alwaysRenderDismissConfirmation() {
            return true;
        }
        get _unreadAssignedNotificationsCount() {
            const key = `grouped_unread_notifications.${this.site.notification_types.assigned}`;
            // we're retrieving the value with get() so that Ember tracks the property
            // and re-renders the UI when it changes.
            // we can stop using `get()` when the User model is refactored into native
            // class with @tracked properties.
            return this.currentUser.get(key) || 0;
        }
        get dismissConfirmationText() {
            return _I18n.default.t("notifications.dismiss_confirmation.body.assigns", {
                count: this._unreadAssignedNotificationsCount
            });
        }
        async fetchItems() {
            return new SortedItems(await super.fetchItems()).sortedItems;
        }
    }
    _exports.default = UserMenuAssignNotificationsList;
    class SortedItems {
        itemsSorting = ["notification.read", "notification.data.message:desc", "notification.created_at:desc"];
        static# _ = (() => dt7948.g(this.prototype, "sortedItems", [(0, _computed.sort)("items", "itemsSorting")]))();#
        sortedItems = (() => (dt7948.i(this, "sortedItems"), void 0))();
        constructor(items) {
            (0, _object.set)(this, "items", items);
        }
    }
});