exec = Meteor.npmRequire('child_process').exec;

Meteor.methods({

    runTest: function(testId) {

        console.log("Manually executing test " + testId);
        return runTest(testId);
    }
});

runTest = function(testId) {

    // Get test
    var test = Tests.findOne({_id: testId});
    if(!test) {
        throw new Meteor.Error(500, "Test " + testId + " does not exist");
    }

    // Get test file
    var testFile = TestFiles.findOne({ testId: testId }, { sort: { uploadedAt: -1 }});
    if(!testFile) {
        console.log("No file for [testId %s]", testId);
        return;
    }

    // Execute test runner
    var filePath = Meteor.settings.storage.tests + "/" + testFile.copies.local.key;
    var command = test.runner + ' ' + filePath;

    var testRunner = Async.runSync(function(done) {

        exec(command, function(err, stdout, stderr) {

            done(null, {
                error: stderr ? stderr : null,
                isPassing: !err && !stderr,
                output: stdout ? stdout : null
            });
        });
    });

    // Update test
    Tests.update({ _id: test._id }, { $set: {
        lastRunAt: new Date(),
        isPassing: testRunner.result.isPassing
    }});

    return testRunner.result;
};

