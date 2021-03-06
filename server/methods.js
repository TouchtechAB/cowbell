fs = Meteor.npmRequire('fs');
exec = Meteor.npmRequire('child_process').exec;

Meteor.methods({

  runTest: function (testId) {

    console.log("Manually executing test " + testId);
    return runTest(testId);
  }
});

runTest = function (testId) {

  var result;

  // Get test
  var test = Tests.findOne({ _id: testId });
  if (!test) {
    throw Meteor.Error(500, "Test " + testId + " does not exist");
  }

  // Get test script
  var script = Scripts.findOne({ _id: test.scriptId });
  if (!script) {
    console.log("No script for [testId %s]", testId);
    return;
  }

  // Get test runner
  var runner = Runners.findOne({ _id: script.runnerId });
  if (!runner) {
    console.log("No runner for [scriptId %s]", script._id);
    return;
  }

  // Execute test runner
  try {
    var command = runner.command + ' ' + fs.realpathSync(script.path);
    var testRunner = Async.runSync(function (done) {

      exec(command, function (err, stdout, stderr) {

        done(null, {
          error: stderr ? stderr : null,
          isPassing: !err && !stderr,
          output: stdout ? stdout : null
        });
      });
    });

    // Update test
    Tests.update({ _id: test._id }, {
      $set: {
        lastRunAt: new Date(),
        isPassing: testRunner.result.isPassing
      }
    });

    // Insert report
    Reports.insert({
      testId: test._id,
      output: testRunner.result.output,
      isPassing: testRunner.result.isPassing
    });

    result = testRunner.result;
  }
  catch (err) {
    console.log(err);
  }

  return result;
};

