canInsertServices = function (userId) {
  return isAdmin(userId);
};

//noinspection JSUnusedLocalSymbols
canInsertService = function (userId, doc) {
  return isAdmin(userId);
};

//noinspection JSUnusedLocalSymbols
canUpdateService = function (userId, doc) {
  return isAdmin(userId);
};

//noinspection JSUnusedLocalSymbols
canRemoveService = function (userId, doc) {
  return isAdmin(userId);
};