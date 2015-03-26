Template.testFileUploadForm.events({
    'change .fileInput': function(event, template) {

        var testId = this.test._id;
        if(!testId){
            console.log("Could not store file - No testId");
        }

        FS.Utility.eachFile(event, function(file) {

            // Create reference to item
            var testFile = new FS.File(file);
            testFile.userId = Meteor.userId();
            testFile.testId = testId;

            TestFiles.insert(testFile, function (err, fileObj) {

                if(err) {
                    console.log(err);
                }
            });
        });
    }
});

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