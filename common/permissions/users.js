canInsertUser = function(userId, doc) {
    return isAdmin(userId);
};

canUpdateUser = function(userId, doc) {
    return isAdmin(userId);
};

canRemoveUser = function(userId, doc) {
    return isAdmin(userId);
};