Meteor.startup(function () {

  Meteor.Mandrill.config({
    username: Meteor.settings['notifications']['mandrill'].username,
    key: Meteor.settings['notifications']['mandrill'].key
  });

  updateRunners();
  updateScripts();
  ensureTests();
});

function ensureTests () {

  var tests = Tests.find({ nextRunAt: { $lt: new Date }});
  tests.forEach(function (test) {
    runTest(test._id);
  });

  Meteor.setTimeout(ensureTests, 10000);
}

function updateRunners () {

  var runners = [
    { title: "CasperJS", slug: "casperjs", command: "casperjs --ssl-protocol=any test" },
    { title: "Mocha", slug: "mocha", command: "mocha" }
  ];

  runners.forEach(function (runner) {
    Runners.upsert({ slug: runner.slug }, { $set: runner });
  });

  // TODO Sync back and remove runners from DB that are not in array
  var runnerCount = Runners.find().count();
  console.log("%s Runners updated", runnerCount);
}

function updateScripts () {

  var hashFiles = Meteor.npmRequire('hash-files');
  var readdir = Meteor.npmRequire('recursive-readdir');
  var runners = Runners.find();

  runners.forEach(function (runner) {

    try {
      var dir = './assets/app/tests/' + runner.slug;

      var files = Async.runSync(function (done) {
        readdir(dir, done);
      });

      if (files.error) {
        console.log(files.error);
      }
      else if (files.result && files.result.length) {
        files.result.forEach(function (file) {

          //noinspection Eslint
          var hash = hashFiles.sync({ files: [file] });

          Scripts.upsert({ path: file }, {
            $set: {
              runnerId: runner._id,
              file: file,
              path: file,
              hash: hash
            }
          });
        });
      }
    }
    catch (err) {
      console.log(err);
      console.log("Cannot update %s tests", runner.title);
    }
  });

  // TODO Sync back and remove runners from DB that are not in array
  var scriptCount = Scripts.find().count();
  console.log("%s Scripts updated", scriptCount);
}