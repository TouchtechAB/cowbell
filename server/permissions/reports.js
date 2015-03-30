Reports.allow({
    insert: function (userId, doc) {
        return canInsertReport(userId, doc);
    },
    update: function (userId, doc) {
        return canUpdateReport(userId, doc);
    },
    remove: function (userId, doc) {
        return canRemoveReport(userId, doc);
    }
});