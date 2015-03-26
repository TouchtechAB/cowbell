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

Services.allow({
    insert: function (userId, doc) {
        return canInsertService(userId, doc);
    },
    update: function (userId, doc) {
        return canUpdateService(userId, doc);
    },
    remove: function (userId, doc) {
        return canRemoveService(userId, doc);
    }
});

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

TestFiles.allow({
    insert: function (userId, doc) {
        return canInsertFile(userId, doc)
    },
    update: function (userId, doc) {
        return canUpdateFile(userId, doc)
    },
    remove: function (userId, doc) {
        return canRemoveFile(userId, doc)
    },
    download: function (userId, doc) {
        return canDownloadFile(userId, doc)
    },
    fetch: null
});

Meteor.users.allow({
    insert: function (userId, doc) {
        return isAdmin(userId);
    },
    update: function (userId, doc) {
        if (doc._id === userId) {
            return true;
        }
        return isAdmin(userId);
    }
});