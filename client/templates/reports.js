Template.registerHelper('canInsertReports', function() {
    return canInsertReports(Meteor.userId());
});

Template.registerHelper('canInsertReport', function(report) {
    return canInsertReport(Meteor.userId(), report);
});

Template.registerHelper('canUpdateReport', function(report) {
    return canUpdateReport(Meteor.userId(), report);
});

Template.registerHelper('canRemoveReport', function(report) {
    return canRemoveReport(Meteor.userId(), report);
});