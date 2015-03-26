canInsertReports = function(userId) {
    return isAdmin(userId);
};

canInsertReport = function(userId, doc) {
    return isAdmin(userId);
};

canUpdateReport = function(userId, doc) {
    return isAdmin(userId);
};

canRemoveReport = function(userId, doc) {
    return isAdmin(userId);
};