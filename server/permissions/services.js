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