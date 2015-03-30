Template.registerHelper('canInsertTests', function() {
    return canInsertTests(Meteor.userId());
});

Template.registerHelper('canInsertTest', function(test) {
    return canInsertTest(Meteor.userId(), test);
});

Template.registerHelper('canUpdateTest', function(test) {
    return canUpdateTest(Meteor.userId(), test);
});

Template.registerHelper('canRemoveTest', function(test) {
    return canRemoveTest(Meteor.userId(), test);
});

Template.registerHelper('testScriptOptions', function() {

    var options = [];

    Scripts.find().forEach(function(script) {
        var runner = Runners.findOne({ _id: script.runnerId });
        options.push({
            label: runner.title + " - " + script.file,
            value: script._id
        });
    });

    return options;
});

Template.registerHelper('testIntervalOptions', function() {
    return [
        {label: "1 min", value: 1},
        {label: "5 min", value: 5},
        {label: "15 min", value: 15},
        {label: "30 min", value: 30},
        {label: "1 hour", value: 60},
        {label: "6 hours", value: 360},
        {label: "12 hours", value: 720},
        {label: "1 day", value: 1440}
    ];
});

Template.test.events({
    'click #test-run-button': function onTestRun(event, template) {
        event.preventDefault();
        Meteor.call("runTest", this.test._id, function onRunTest(err, res){
            if(err) {
                console.log(err);
            }
        });
    }
});

Template.test.events({
    'click #test-remove-button': function onItemRemove(event, template) {
        event.preventDefault();
        Tests.remove({ _id: this.test._id});
    }
});