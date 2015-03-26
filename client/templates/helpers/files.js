Template.registerHelper('canInsertFiles', function(test) {
    return canInsertFiles(Meteor.userId(), test);
});

Template.registerHelper('canUpdateFile', function(file) {
    return canUpdateFile(Meteor.userId(), file);
});

Template.registerHelper('canRemoveFile', function(file) {
    return canRemoveFile(Meteor.userId(), file);
});