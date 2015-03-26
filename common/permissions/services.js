canInsertServices = function(userId) {
    return isAdmin(userId);
};

canInsertService = function(userId, doc) {
    return isAdmin(userId);
};

canUpdateService = function(userId, doc) {
    return isAdmin(userId);
};

canRemoveService = function(userId, doc) {
    return isAdmin(userId);
};