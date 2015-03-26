canInsertFile = function(userId, doc) {
    return isAdmin(userId);
};

canUpdateFile = function(userId, doc) {
    return isAdmin(userId);
};

canRemoveFile = function(userId, doc) {
    return isAdmin(userId);
};

canDownloadFile = function(userId, doc) {
    return isAdmin(userId);
};