//noinspection JSUnusedLocalSymbols
canInsertUser = function (userId, doc) {
  return isAdmin(userId);
};

//noinspection JSUnusedLocalSymbols
canUpdateUser = function (userId, doc) {
  return isAdmin(userId);
};

//noinspection JSUnusedLocalSymbols
canRemoveUser = function (userId, doc) {
  return isAdmin(userId);
};