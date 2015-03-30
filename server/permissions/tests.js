Tests.allow({
    insert: function (userId, doc) {
        return canInsertTest(userId, doc);
    },
    update: function (userId, doc) {
        return canUpdateTest(userId, doc);
    },
    remove: function (userId, doc) {
        return canRemoveTest(userId, doc);
    }
});