Template.registerHelper('canInsertServices', function () {
  return canInsertServices(Meteor.userId());
});

Template.registerHelper('canInsertService', function (service) {
  return canInsertService(Meteor.userId(), service);
});

Template.registerHelper('canUpdateService', function (service) {
  return canUpdateService(Meteor.userId(), service);
});

Template.registerHelper('canRemoveService', function (service) {
  return canRemoveService(Meteor.userId(), service);
});