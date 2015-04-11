canInsertTests = function (userId) {
  return isAdmin(userId);
};

//noinspection JSUnusedLocalSymbols
canInsertTest = function (userId, doc) {
  return isAdmin(userId);
};

//noinspection JSUnusedLocalSymbols
canUpdateTest = function (userId, doc) {
  return isAdmin(userId);
};

//noinspection JSUnusedLocalSymbols
canRemoveTest = function (userId, doc) {
  return isAdmin(userId);
};