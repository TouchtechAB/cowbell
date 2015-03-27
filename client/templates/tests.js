Template.test.events({
    'click #test-run-button': function onTestRun(event, template) {
        event.preventDefault();
        Meteor.call("runTest", this.test._id, function onRunTest(err, res){
            if(err) {
                console.log(err);
            }
            else {
                console.log(res);
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