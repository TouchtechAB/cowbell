canInsertReports = function (userId) {
  return isAdmin(userId);
};

canInsertReport = function (userId) {
  return isAdmin(userId);
};

canUpdateReport = function (userId) {
  return isAdmin(userId);
};

canRemoveReport = function (userId) {
  return isAdmin(userId);
};