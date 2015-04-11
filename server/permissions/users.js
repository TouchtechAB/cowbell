Meteor.users.allow({
  insert: function (userId) {
    return isAdmin(userId);
  },
  update: function (userId, doc) {
    if (doc._id === userId) {
      return true;
    }
    return isAdmin(userId);
  }
});