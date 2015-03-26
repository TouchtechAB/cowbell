canInsertTests = function(userId) {
    return isAdmin(userId);
};

canInsertTest = function(userId, doc) {
    return isAdmin(userId);
};

canUpdateTest = function(userId, doc) {
    return isAdmin(userId);
};

canRemoveTest = function(userId, doc) {
    return isAdmin(userId);
};